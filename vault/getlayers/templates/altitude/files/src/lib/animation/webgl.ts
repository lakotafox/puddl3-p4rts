/**
 * Minimal WebGL2 helpers for full-screen fragment-shader effects.
 *
 * Deliberately tiny and dependency-free: the only GPU work this project does is
 * "draw one fullscreen triangle with a fragment shader", so a full 3D library
 * would be several hundred kilobytes for a single draw call.
 *
 * Compilation failures return `null` rather than throwing — a decorative shader
 * must never take the page down with it; callers fall back to no effect.
 *
 * 📖 Docs: obsidian/frontend/animation-system.md
 */

const compileShader = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[webgl] shader compile failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

/** Link a vertex/fragment pair into a program, or return `null` on failure. */
export const createProgram = (
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null => {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  // The shaders are owned by the program once linked.
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[webgl] program link failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
};

/**
 * Size a canvas' drawing buffer to its CSS box, capped at `maxPixelRatio`.
 *
 * Returns `true` when the buffer actually changed, so callers can skip a
 * redundant `gl.viewport` call.
 */
export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  maxPixelRatio = 1.5,
): boolean => {
  const ratio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
  const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
  const height = Math.max(1, Math.round(canvas.clientHeight * ratio));

  if (canvas.width === width && canvas.height === height) return false;

  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, width, height);

  return true;
};
