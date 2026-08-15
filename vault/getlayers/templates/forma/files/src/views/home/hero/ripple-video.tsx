"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";

import { useLoop } from "@/hooks/animation/use-render-loop";

/** Concurrent ripples. Must match `MAX_RIPPLES` in the fragment shader. */
const MAX_RIPPLES = 14;
/** Minimum pointer travel (CSS px) between two spawns. */
const SPAWN_DISTANCE = 26;
/** Ripple lifetime (s). Keep in sync with `LIFE` in the fragment shader. */
const RIPPLE_LIFE = 1.5;
/** Far enough in the past that an unused slot is always expired. */
const NEVER = -1000;

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

/**
 * Each ripple is an expanding ring. Inside a gaussian envelope that travels
 * outward at SPEED, texels are pushed along the radius by a sine — so the
 * distortion reads as a wave crossing the surface rather than a bulge. Rings
 * accumulate, which is what makes a moving pointer leave a wake.
 */
const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  #define MAX_RIPPLES ${MAX_RIPPLES}

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uMedia;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uRipples[MAX_RIPPLES];

  const float SPEED = 340.0;
  const float LIFE = ${RIPPLE_LIFE.toFixed(1)};
  const float WIDTH = 90.0;
  const float AMPLITUDE = 24.0;
  const float FREQ = 0.055;

  /** Maps screen uv onto the texture the way CSS \`object-fit: cover\` would. */
  vec2 coverUv(vec2 uv) {
    float canvasAspect = uResolution.x / uResolution.y;
    float mediaAspect = uMedia.x / uMedia.y;
    vec2 scale = canvasAspect > mediaAspect
      ? vec2(1.0, mediaAspect / canvasAspect)
      : vec2(canvasAspect / mediaAspect, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  /**
   * Clamps a texture lookup to the interior, skipping the outermost texels.
   * Encoders routinely leave garbage in the last row/column — this file's
   * footage has a green final column — and CLAMP_TO_EDGE would smear it across
   * everything a ripple pushes past the border.
   */
  vec2 safeUv(vec2 uv) {
    vec2 guard = 1.5 / uMedia;
    return clamp(uv, guard, 1.0 - guard);
  }

  void main() {
    vec2 fragment = vUv * uResolution;
    vec2 offset = vec2(0.0);

    for (int i = 0; i < MAX_RIPPLES; i++) {
      vec3 ripple = uRipples[i];
      float age = uTime - ripple.z;
      if (age < 0.0 || age > LIFE) continue;

      vec2 delta = fragment - ripple.xy;
      float dist = length(delta);
      if (dist < 0.001) continue;

      float radius = age * SPEED;
      float envelope = exp(-pow((dist - radius) / WIDTH, 2.0));
      float decay = 1.0 - age / LIFE;
      float wave = sin((dist - radius) * FREQ);

      offset += (delta / dist) * wave * envelope * decay * decay * AMPLITUDE;
    }

    vec2 uv = coverUv(vUv + (offset * uIntensity) / uResolution);
    gl_FragColor = texture2D(uTexture, safeUv(uv));
  }
`;

const compile = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[ripple-video] shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

interface Scene {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  texture: WebGLTexture;
  buffer: WebGLBuffer;
  uniforms: {
    texture: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    media: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    intensity: WebGLUniformLocation | null;
    ripples: WebGLUniformLocation | null;
  };
}

const createScene = (canvas: HTMLCanvasElement): Scene | null => {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[ripple-video] link:", gl.getProgramInfoLog(program));
    return null;
  }

  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!buffer || !texture) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Seed with one opaque texel so the texture is *complete* from the very
  // first draw. Sampling a texture that has never been uploaded to returns
  // driver garbage — on this stack a green wash.
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    1,
    1,
    0,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0]),
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  return {
    gl,
    program,
    texture,
    buffer,
    uniforms: {
      texture: gl.getUniformLocation(program, "uTexture"),
      resolution: gl.getUniformLocation(program, "uResolution"),
      media: gl.getUniformLocation(program, "uMedia"),
      time: gl.getUniformLocation(program, "uTime"),
      intensity: gl.getUniformLocation(program, "uIntensity"),
      ripples: gl.getUniformLocation(program, "uRipples"),
    },
  };
};

export interface RippleVideoProps {
  src: string;
  /** Describes the footage for assistive technology. */
  label: string;
  className?: string;
}

/**
 * Looping video with a pointer-driven ripple distortion.
 *
 * The video element stays in the DOM and keeps playing — it is the WebGL
 * texture source, and it is also the fallback: the canvas is painted over it,
 * so if WebGL is unavailable or the context is lost the plain video is what
 * shows. Reduced-motion users get the video with no canvas at all.
 */
export const RippleVideo = ({
  src,
  label,
  className = "",
}: RippleVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const ripplesRef = useRef(new Float32Array(MAX_RIPPLES * 3));
  const cursorRef = useRef({ x: 0, y: 0, index: 0 });
  const sizeRef = useRef({ width: 0, height: 0 });
  const startRef = useRef(0);
  const frameRef = useRef({ ready: false, width: 0, height: 0, lastTime: -1 });

  const [enabled, setEnabled] = useState(false);
  // Keeps the canvas transparent until it has something real to show, so the
  // plain <video> underneath covers the first frames.
  const [hasFrame, setHasFrame] = useState(false);

  const [isPointerOver, setIsPointerOver] = useState(false);

  // Spring-smoothed so the distortion eases in and out with the pointer rather
  // than snapping — the reveal itself stays spring-driven (hard rule #1).
  //
  // Declarative, driven by state: react-spring re-applies a hook's declared
  // props on re-render, so the imperative form would have reset the distortion
  // to zero whenever `setHasFrame` fired mid-hover. Declaring the *current*
  // target makes that re-application a no-op. Same trap as the preloader's
  // counter.
  const { intensity } = useSpring({
    intensity: isPointerOver ? 1 : 0,
    config: { tension: 120, friction: 26 },
  });

  /**
   * One frame, callable on demand so `resize` can repaint synchronously:
   * setting `canvas.width` wipes the drawing buffer, and with `alpha: false` an
   * empty buffer composites as opaque black — waiting for the next tick to
   * redraw flashed a black rectangle whenever the panel changed size.
   *
   * Stable across renders (every dependency is a ref or a stable spring), so
   * the setup effect below can depend on it without rebuilding the scene.
   */
  const draw = useCallback(() => {
    const scene = sceneRef.current;
    const video = videoRef.current;
    if (!scene || !video) return;
    const { width, height } = sizeRef.current;
    if (!width || !height) return;

    const { gl, program, uniforms } = scene;
    const frame = frameRef.current;

    // Upload only a genuinely new, decodable frame. `readyState` dips below
    // HAVE_CURRENT_DATA for a tick as the loop wraps; uploading then pushes a
    // half-decoded frame, and recomputing the cover mapping from a
    // momentarily-zero video size snapped the crop for one frame — together
    // that was the periodic blink.
    const decodable =
      video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0;

    gl.useProgram(program);

    if (decodable && (!frame.ready || video.currentTime !== frame.lastTime)) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      frame.lastTime = video.currentTime;
      frame.width = video.videoWidth;
      frame.height = video.videoHeight;
      if (!frame.ready) {
        frame.ready = true;
        setHasFrame(true);
      }
    }

    // Never draw before a real frame exists, and keep the last known media
    // size so the crop can't flip mid-playback.
    if (!frame.ready) return;

    gl.uniform2f(uniforms.media, frame.width, frame.height);
    gl.uniform1i(uniforms.texture, 0);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.time, (performance.now() - startRef.current) / 1000);
    gl.uniform1f(uniforms.intensity, intensity.get());
    gl.uniform3fv(uniforms.ripples, ripplesRef.current);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [intensity]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const scene = createScene(canvas);
    if (!scene) {
      setEnabled(false);
      return;
    }
    sceneRef.current = scene;
    startRef.current = performance.now();
    frameRef.current = { ready: false, width: 0, height: 0, lastTime: -1 };

    ripplesRef.current.fill(0);
    for (let i = 0; i < MAX_RIPPLES; i++) ripplesRef.current[i * 3 + 2] = NEVER;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      sizeRef.current = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      scene.gl.viewport(0, 0, canvas.width, canvas.height);
      // Repaint in the same tick — the resize just wiped the buffer.
      draw();
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const onLost = (event: Event) => {
      event.preventDefault();
      setEnabled(false);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      const { gl, program, buffer, texture } = scene;
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      sceneRef.current = null;
    };
  }, [enabled, draw]);

  const spawn = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container || !sceneRef.current) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    // Shader space is y-up, matching gl_FragCoord.
    const y = rect.height - (clientY - rect.top);

    const cursor = cursorRef.current;
    if (Math.hypot(x - cursor.x, y - cursor.y) < SPAWN_DISTANCE) return;

    cursor.x = x;
    cursor.y = y;

    const slot = cursor.index % MAX_RIPPLES;
    cursor.index += 1;
    const ripples = ripplesRef.current;
    ripples[slot * 3] = x;
    ripples[slot * 3 + 1] = y;
    ripples[slot * 3 + 2] = (performance.now() - startRef.current) / 1000;
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      // Movement also counts as being over the panel. `pointerenter` only fires
      // on a *crossing*, so a reload with the cursor already inside the panel
      // left the effect dead until the pointer left and came back.
      setIsPointerOver(true);
      spawn(event.clientX, event.clientY);
    },
    [spawn],
  );

  const handleEnter = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        cursorRef.current.x = event.clientX - rect.left;
        cursorRef.current.y = rect.height - (event.clientY - rect.top);
      }
      setIsPointerOver(true);
    },
    [],
  );

  const handleLeave = useCallback(() => {
    setIsPointerOver(false);
  }, []);

  useLoop(() => draw(), { framerate: 0 });

  return (
    <div
      ref={containerRef}
      className={`relative size-full ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 size-full"
          style={{ opacity: hasFrame ? 1 : 0 }}
        />
      )}
    </div>
  );
};
