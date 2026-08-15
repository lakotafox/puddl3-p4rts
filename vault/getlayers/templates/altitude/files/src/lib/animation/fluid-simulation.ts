/**
 * WebGL2 fluid solver — vendored from Pavel Dobryakov's WebGL-Fluid-Simulation
 * (MIT licence), ported to TypeScript and trimmed to what this project needs.
 *
 * Removed from the original: bloom, the dithering texture, the checkerboard
 * "transparent" background, the WebGL1 fallback path, the engine's own
 * `requestAnimationFrame` loop, and its window pointer listeners. Frames are
 * driven by the caller (through the shared ticker — ADR-0009), and ink enters
 * only through `splat()`, so the caller owns the motion entirely.
 *
 * Returns `null` when WebGL2 or the float render targets are unavailable — a
 * decorative effect must never take the page down (ADR-0016).
 *
 * 📖 Docs: obsidian/frontend/animation-system.md
 */

export interface FluidConfig {
  /** Velocity/pressure grid resolution (short edge). */
  simResolution: number;
  /** Dye (colour) grid resolution (short edge). */
  dyeResolution: number;
  /** Per-step survival of the dye — lower fades trails faster. */
  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  pressureIterations: number;
  /** Vorticity confinement — the swirl of the marbling. */
  curl: number;
  splatRadius: number;
}

export interface FluidColor {
  r: number;
  g: number;
  b: number;
}

export interface RenderOptions {
  /**
   * The background frame to warp. `null` clears the canvas to transparent, so
   * whatever sits underneath (the plain `<video>`) shows through untouched.
   */
  source: TexImageSource | null;
  /** Source's own width / height, for the object-fit: cover mapping. */
  sourceAspect: number;
  /** How far the flow drags the picture. 0 disables the warp. */
  warp: number;
  /** Colour split along the displacement, as a fraction of it. */
  aberration: number;
}

export interface FluidSimulation {
  /** Match the drawing buffer to the CSS box; rebuilds targets when it changes. */
  resize(): void;
  step(dt: number): void;
  render(options: RenderOptions): void;
  splat(x: number, y: number, dx: number, dy: number, color: FluidColor): void;
  destroy(): void;
}

interface Framebuffer {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach(id: number): number;
}

interface DoubleFramebuffer {
  read: Framebuffer;
  write: Framebuffer;
  swap(): void;
}

interface TextureFormat {
  internalFormat: number;
  format: number;
}

type Uniforms = Record<string, WebGLUniformLocation | null>;

interface Program {
  program: WebGLProgram;
  uniforms: Uniforms;
  bind(): void;
}

const VERTEX_SHADER = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_HEADER = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
`;

const CLEAR_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uTexture;
uniform float value;
void main () { fragColor = value * texture(uTexture, vUv); }
`;

/**
 * Final composite — this is the one shader that is *not* from the original
 * engine. It draws the background media itself, displaced by the fluid's own
 * velocity field, and lays the ink over the top:
 *
 * - **Warp:** each pixel samples the video at `uv + velocity`, so the picture
 *   drags where the fluid is moving and sits still where it is not.
 * - **Aberration:** R and B are sampled a little further along that same
 *   displacement than G, which splits the colour like a lens at the edges of the
 *   swirl — strongest where the flow is fastest, absent when it is still.
 * - **Saturation push** on the warped area, so it reads as refraction.
 * - The dye is then added with the original engine's fake gradient lighting.
 */
const COMPOSITE_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uDye;
uniform sampler2D uVideo;
uniform sampler2D uVelocity;
uniform vec2 texelSize;
uniform vec2 uSimTexel;
uniform vec2 uVideoScale;
uniform vec2 uVideoOffset;
uniform float uWarp;
uniform float uAberration;

/** Replicates CSS object-fit: cover for the video texture. */
vec2 cover (vec2 uv) { return uv * uVideoScale + uVideoOffset; }

/** Longest displacement allowed, in uv. Past this the picture just shreds. */
const float MAX_DISPLACEMENT = 0.035;

void main () {
  vec3 dye = texture(uDye, vUv).rgb;

  // Gate the whole effect on where the ink actually is. The velocity field is
  // non-zero almost everywhere once the fluid has been stirred, so warping by it
  // directly tears up the entire frame instead of just the vortex.
  // Smoothstep, not a hard clamp: a sharp mask edge turns the colour split into
  // visible red/green threads instead of a soft refraction.
  float mask = smoothstep(0.015, 0.32, max(dye.r, max(dye.g, dye.b)));

  vec2 flow = texture(uVelocity, vUv).xy * uSimTexel * uWarp;
  float distance = length(flow);
  if (distance > MAX_DISPLACEMENT) flow *= MAX_DISPLACEMENT / distance;

  vec2 displacement = flow * mask;
  float strength = clamp(length(displacement) / MAX_DISPLACEMENT, 0.0, 1.0);
  vec2 shift = displacement * uAberration;

  vec3 media;
  media.r = texture(uVideo, cover(vUv + displacement + shift)).r;
  media.g = texture(uVideo, cover(vUv + displacement)).g;
  media.b = texture(uVideo, cover(vUv + displacement - shift)).b;

  float luminance = dot(media, vec3(0.299, 0.587, 0.114));
  media += (media - vec3(luminance)) * strength * 0.55;

  vec3 L = texture(uDye, vL).rgb;
  vec3 R = texture(uDye, vR).rgb;
  vec3 T = texture(uDye, vT).rgb;
  vec3 B = texture(uDye, vB).rgb;
  vec3 C = dye;
  float dx = length(R) - length(L);
  float dy = length(T) - length(B);
  vec3 n = normalize(vec3(dx, dy, length(texelSize)));
  float diffuse = clamp(dot(n, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
  C *= diffuse;

  fragColor = vec4(media + C, 1.0);
}
`;

const SPLAT_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}
`;

const ADVECTION_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  fragColor = dissipation * texture(uSource, coord);
  fragColor.a = 1.0;
}
`;

const ADVECTION_MANUAL_FILTERING_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main () {
  vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
  fragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
  fragColor.a = 1.0;
}
`;

const DIVERGENCE_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}
`;

const CURL_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}
`;

const VORTICITY_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy;
  fragColor = vec4(vel + force * dt, 0.0, 1.0);
}
`;

const PRESSURE_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}
`;

const GRADIENT_SUBTRACT_SHADER = FRAGMENT_HEADER + /* glsl */ `
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}
`;

export const createFluidSimulation = (
  canvas: HTMLCanvasElement,
  config: FluidConfig,
): FluidSimulation | null => {
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;

  // Float render targets are what the solver stores velocity and dye in.
  if (!gl.getExtension("EXT_color_buffer_float")) return null;
  const supportsLinearFiltering = !!gl.getExtension("OES_texture_float_linear");

  const compile = (type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("[fluid] shader compile failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
  if (!vertexShader) return null;

  let failed = false;

  const createProgram = (fragmentSource: string): Program => {
    const program = gl.createProgram() as WebGLProgram;
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);

    gl.attachShader(program, vertexShader);
    if (fragmentShader) gl.attachShader(program, fragmentShader);
    gl.bindAttribLocation(program, 0, "aPosition");
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[fluid] program link failed:", gl.getProgramInfoLog(program));
      failed = true;
    }

    const uniforms: Uniforms = {};
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }

    return {
      program,
      uniforms,
      bind: () => gl.useProgram(program),
    };
  };

  const clearProgram = createProgram(CLEAR_SHADER);
  const compositeProgram = createProgram(COMPOSITE_SHADER);
  const splatProgram = createProgram(SPLAT_SHADER);
  const advectionProgram = createProgram(
    supportsLinearFiltering ? ADVECTION_SHADER : ADVECTION_MANUAL_FILTERING_SHADER,
  );
  const divergenceProgram = createProgram(DIVERGENCE_SHADER);
  const curlProgram = createProgram(CURL_SHADER);
  const vorticityProgram = createProgram(VORTICITY_SHADER);
  const pressureProgram = createProgram(PRESSURE_SHADER);
  const gradientSubtractProgram = createProgram(GRADIENT_SUBTRACT_SHADER);

  if (failed) return null;

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const blit = (destination: WebGLFramebuffer | null): void => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  const rgba: TextureFormat = { internalFormat: gl.RGBA16F, format: gl.RGBA };
  const rg: TextureFormat = { internalFormat: gl.RG16F, format: gl.RG };
  const r: TextureFormat = { internalFormat: gl.R16F, format: gl.RED };
  const texType = gl.HALF_FLOAT;
  const filtering = supportsLinearFiltering ? gl.LINEAR : gl.NEAREST;

  const createFBO = (
    w: number,
    h: number,
    format: TextureFormat,
    param: number,
  ): Framebuffer => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture() as WebGLTexture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, format.internalFormat, w, h, 0, format.format, texType, null);

    const fbo = gl.createFramebuffer() as WebGLFramebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  };

  const createDoubleFBO = (
    w: number,
    h: number,
    format: TextureFormat,
    param: number,
  ): DoubleFramebuffer => {
    let first = createFBO(w, h, format, param);
    let second = createFBO(w, h, format, param);
    return {
      get read() {
        return first;
      },
      set read(value: Framebuffer) {
        first = value;
      },
      get write() {
        return second;
      },
      set write(value: Framebuffer) {
        second = value;
      },
      swap() {
        const temp = first;
        first = second;
        second = temp;
      },
    };
  };

  const getResolution = (resolution: number) => {
    let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspect < 1) aspect = 1 / aspect;
    const max = Math.round(resolution * aspect);
    const min = Math.round(resolution);
    return gl.drawingBufferWidth > gl.drawingBufferHeight
      ? { width: max, height: min }
      : { width: min, height: max };
  };

  let simWidth = 0;
  let simHeight = 0;
  let dyeWidth = 0;
  let dyeHeight = 0;
  let density: DoubleFramebuffer;
  let velocity: DoubleFramebuffer;
  let divergence: Framebuffer;
  let curl: Framebuffer;
  let pressure: DoubleFramebuffer;

  const initFramebuffers = (): void => {
    const simRes = getResolution(config.simResolution);
    const dyeRes = getResolution(config.dyeResolution);
    simWidth = simRes.width;
    simHeight = simRes.height;
    dyeWidth = dyeRes.width;
    dyeHeight = dyeRes.height;

    density = createDoubleFBO(dyeWidth, dyeHeight, rgba, filtering);
    velocity = createDoubleFBO(simWidth, simHeight, rg, filtering);
    divergence = createFBO(simWidth, simHeight, r, gl.NEAREST);
    curl = createFBO(simWidth, simHeight, r, gl.NEAREST);
    pressure = createDoubleFBO(simWidth, simHeight, r, gl.NEAREST);
  };

  initFramebuffers();

  const resize = (): void => {
    if (canvas.width === canvas.clientWidth && canvas.height === canvas.clientHeight) return;
    canvas.width = Math.max(1, canvas.clientWidth);
    canvas.height = Math.max(1, canvas.clientHeight);
    initFramebuffers();
  };

  const splat = (x: number, y: number, dx: number, dy: number, color: FluidColor): void => {
    gl.viewport(0, 0, simWidth, simHeight);
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1 - y / canvas.height);
    gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1);
    gl.uniform1f(splatProgram.uniforms.radius, config.splatRadius / 100);
    blit(velocity.write.fbo);
    velocity.swap();

    gl.viewport(0, 0, dyeWidth, dyeHeight);
    gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(density.write.fbo);
    density.swap();
  };

  const step = (dt: number): void => {
    gl.disable(gl.BLEND);
    gl.viewport(0, 0, simWidth, simHeight);

    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl.fbo);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.curl);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write.fbo);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence.fbo);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.pressureDissipation);
    blit(pressure.write.fbo);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.pressureIterations; i++) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write.fbo);
      pressure.swap();
    }

    gradientSubtractProgram.bind();
    gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write.fbo);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, 1 / simWidth, 1 / simHeight);
    if (!supportsLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1 / simWidth, 1 / simHeight);
    }
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.velocityDissipation);
    blit(velocity.write.fbo);
    velocity.swap();

    gl.viewport(0, 0, dyeWidth, dyeHeight);
    if (!supportsLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1 / dyeWidth, 1 / dyeHeight);
    }
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.densityDissipation);
    blit(density.write.fbo);
    density.swap();
  };

  let videoTexture: WebGLTexture | null = null;

  const uploadSource = (source: TexImageSource): number => {
    if (!videoTexture) {
      videoTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, videoTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    // vUv runs y-up, the video frame arrives y-down.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    return 2;
  };

  const render = ({ source, sourceAspect, warp, aberration }: RenderOptions): void => {
    gl.disable(gl.BLEND);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    if (!source) {
      // Nothing to composite yet — stay out of the way of the plain <video>.
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return;
    }

    const sourceId = uploadSource(source);

    // object-fit: cover — crop the overflowing axis, centred.
    const canvasAspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const scaleX = sourceAspect > canvasAspect ? canvasAspect / sourceAspect : 1;
    const scaleY = sourceAspect > canvasAspect ? 1 : sourceAspect / canvasAspect;

    compositeProgram.bind();
    gl.uniform2f(
      compositeProgram.uniforms.texelSize,
      1 / gl.drawingBufferWidth,
      1 / gl.drawingBufferHeight,
    );
    gl.uniform2f(compositeProgram.uniforms.uSimTexel, 1 / simWidth, 1 / simHeight);
    gl.uniform2f(compositeProgram.uniforms.uVideoScale, scaleX, scaleY);
    gl.uniform2f(
      compositeProgram.uniforms.uVideoOffset,
      (1 - scaleX) / 2,
      (1 - scaleY) / 2,
    );
    gl.uniform1f(compositeProgram.uniforms.uWarp, warp);
    gl.uniform1f(compositeProgram.uniforms.uAberration, aberration);
    gl.uniform1i(compositeProgram.uniforms.uDye, density.read.attach(0));
    gl.uniform1i(compositeProgram.uniforms.uVelocity, velocity.read.attach(1));
    gl.uniform1i(compositeProgram.uniforms.uVideo, sourceId);
    blit(null);
  };

  const destroy = (): void => {
    for (const program of [
      clearProgram,
      compositeProgram,
      splatProgram,
      advectionProgram,
      divergenceProgram,
      curlProgram,
      vorticityProgram,
      pressureProgram,
      gradientSubtractProgram,
    ]) {
      gl.deleteProgram(program.program);
    }
    gl.deleteBuffer(vertexBuffer);
    gl.deleteBuffer(indexBuffer);
    if (videoTexture) gl.deleteTexture(videoTexture);
  };

  return { resize, step, render, splat, destroy };
};
