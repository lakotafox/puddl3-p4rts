/**
 * Bake `rotten-brain.glb` down to the only thing the scene actually reads: its
 * geometry.
 *
 * The GLB is 4.67 MB, but 4.5 MB of that is three PBR texture images the brain
 * shader never touches — it samples the surface for point positions and derives
 * its own geometric normals. The mesh itself is 2,605 vertices / 4,850 triangles.
 *
 * This script parses the GLB container by hand (no three.js, no DOM), flattens
 * every mesh to world space, normalises it the way the old runtime path did —
 * recenter on the area-weighted sample centroid, scale to a unit bounding radius
 * — and writes an indexed, quantised triangle mesh:
 *
 *   magic   'VBRN'   u32
 *   version 1        u32
 *   vertexCount      u32
 *   indexCount       u32
 *   positions        i16 × vertexCount × 3   (unit sphere → ÷ 32767)
 *   indices          u16 × indexCount
 *
 * Positions are normalised to radius 1, so `BRAIN_CONFIG.radius` stays a live
 * tunable at runtime rather than being frozen into the asset.
 *
 * Run: node scripts/bake-brain.mjs <input.glb> <output.bin>
 */

import { readFileSync, writeFileSync } from "node:fs";

const COMPONENT = {
  5120: { array: Int8Array, size: 1 },
  5121: { array: Uint8Array, size: 1 },
  5122: { array: Int16Array, size: 2 },
  5123: { array: Uint16Array, size: 2 },
  5125: { array: Uint32Array, size: 4 },
  5126: { array: Float32Array, size: 4 },
};

const COMPONENTS_PER_TYPE = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT4: 16,
};

/** Split a GLB into its JSON chunk and its binary chunk. */
const parseGlb = (buffer) => {
  if (buffer.readUInt32LE(0) !== 0x46546c67) throw new Error("not a GLB");
  const total = buffer.readUInt32LE(8);

  let json = null;
  let bin = null;
  let offset = 12;
  while (offset < total) {
    const length = buffer.readUInt32LE(offset);
    const type = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (type === 0x4e4f534a) {
      json = JSON.parse(buffer.subarray(start, start + length).toString("utf8"));
    } else if (type === 0x004e4942) {
      bin = buffer.subarray(start, start + length);
    }
    offset = start + length;
  }
  if (!json || !bin) throw new Error("GLB is missing its JSON or BIN chunk");
  return { json, bin };
};

/** Read one glTF accessor into a plain JS array of tuples. */
const readAccessor = (json, bin, index) => {
  const accessor = json.accessors[index];
  const view = json.bufferViews[accessor.bufferView];
  const { array: Ctor, size } = COMPONENT[accessor.componentType];
  const components = COMPONENTS_PER_TYPE[accessor.type];

  const base = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
  const stride = view.byteStride ?? components * size;

  const out = new Float64Array(accessor.count * components);
  for (let i = 0; i < accessor.count; i++) {
    // A fresh view per element — accessors may be interleaved, and the byte
    // offset is not guaranteed to be aligned to the component size.
    const element = new Ctor(
      bin.buffer.slice(
        bin.byteOffset + base + i * stride,
        bin.byteOffset + base + i * stride + components * size,
      ),
    );
    for (let c = 0; c < components; c++) out[i * components + c] = element[c];
  }
  return { data: out, count: accessor.count, components };
};

/** Column-major 4×4 multiply, matching glTF's matrix convention. */
const multiply = (a, b) => {
  const out = new Float64Array(16);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] =
        a[r] * b[c * 4] +
        a[4 + r] * b[c * 4 + 1] +
        a[8 + r] * b[c * 4 + 2] +
        a[12 + r] * b[c * 4 + 3];
    }
  }
  return out;
};

const IDENTITY = new Float64Array([
  1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
]);

/** A node's local transform: an explicit `matrix`, or its TRS triple. */
const localMatrix = (node) => {
  if (node.matrix) return new Float64Array(node.matrix);

  const [tx, ty, tz] = node.translation ?? [0, 0, 0];
  const [qx, qy, qz, qw] = node.rotation ?? [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale ?? [1, 1, 1];

  const x2 = qx + qx;
  const y2 = qy + qy;
  const z2 = qz + qz;
  const xx = qx * x2;
  const xy = qx * y2;
  const xz = qx * z2;
  const yy = qy * y2;
  const yz = qy * z2;
  const zz = qz * z2;
  const wx = qw * x2;
  const wy = qw * y2;
  const wz = qw * z2;

  return new Float64Array([
    (1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0,
    (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0,
    (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0,
    tx, ty, tz, 1,
  ]);
};

const applyMatrix = (m, x, y, z) => [
  m[0] * x + m[4] * y + m[8] * z + m[12],
  m[1] * x + m[5] * y + m[9] * z + m[13],
  m[2] * x + m[6] * y + m[10] * z + m[14],
  m[3] * x + m[7] * y + m[11] * z + m[15],
];

/**
 * Walk the scene graph and flatten every primitive into one world-space,
 * indexed mesh. Vertices are deduplicated by exact position — the source model
 * splits them for UV/normal seams, which we do not care about.
 */
const flattenScene = (json, bin) => {
  const positions = [];
  const indices = [];
  const seen = new Map();

  const pushVertex = (x, y, z) => {
    // 5 decimals ≈ 1e-5 world units — far below the quantisation floor, so this
    // never merges vertices the shader could tell apart.
    const key = `${x.toFixed(5)},${y.toFixed(5)},${z.toFixed(5)}`;
    const hit = seen.get(key);
    if (hit !== undefined) return hit;
    const index = positions.length / 3;
    positions.push(x, y, z);
    seen.set(key, index);
    return index;
  };

  const visit = (nodeIndex, parent) => {
    const node = json.nodes[nodeIndex];
    const world = multiply(parent, localMatrix(node));

    if (node.mesh !== undefined) {
      for (const primitive of json.meshes[node.mesh].primitives) {
        // Only triangle lists (glTF mode 4, the default).
        if (primitive.mode !== undefined && primitive.mode !== 4) continue;

        const pos = readAccessor(json, bin, primitive.attributes.POSITION);
        const local = [];
        for (let i = 0; i < pos.count; i++) {
          const [x, y, z] = applyMatrix(
            world,
            pos.data[i * 3],
            pos.data[i * 3 + 1],
            pos.data[i * 3 + 2],
          );
          local.push(pushVertex(x, y, z));
        }

        if (primitive.indices !== undefined) {
          const idx = readAccessor(json, bin, primitive.indices);
          for (let i = 0; i < idx.count; i++) indices.push(local[idx.data[i]]);
        } else {
          for (let i = 0; i < pos.count; i++) indices.push(local[i]);
        }
      }
    }

    for (const child of node.children ?? []) visit(child, world);
  };

  const scene = json.scenes[json.scene ?? 0];
  for (const root of scene.nodes) visit(root, IDENTITY);

  return { positions, indices };
};

/**
 * The normalisation the old runtime path applied: area-weighted-sample the
 * surface, then recenter on the sample centroid and scale so the furthest
 * sample sits at radius 1.
 *
 * It has to be done from samples rather than from vertices, or the transform
 * shifts: the model's vertex density is not uniform over its area, so the vertex
 * centroid and the surface centroid are different points.
 */
const normalise = (positions, indices, sampleCount) => {
  const triangleCount = indices.length / 3;

  const areas = new Float64Array(triangleCount);
  let totalArea = 0;
  for (let t = 0; t < triangleCount; t++) {
    const a = indices[t * 3] * 3;
    const b = indices[t * 3 + 1] * 3;
    const c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a];
    const uy = positions[b + 1] - positions[a + 1];
    const uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a];
    const vy = positions[c + 1] - positions[a + 1];
    const vz = positions[c + 2] - positions[a + 2];
    const cx = uy * vz - uz * vy;
    const cy = uz * vx - ux * vz;
    const cz = ux * vy - uy * vx;
    areas[t] = Math.hypot(cx, cy, cz) * 0.5;
    totalArea += areas[t];
  }

  const cdf = new Float64Array(triangleCount);
  let acc = 0;
  for (let t = 0; t < triangleCount; t++) {
    acc += areas[t] / totalArea;
    cdf[t] = acc;
  }

  const samples = new Float64Array(sampleCount * 3);
  for (let s = 0; s < sampleCount; s++) {
    const r = Math.random();
    let lo = 0;
    let hi = triangleCount - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    const a = indices[lo * 3] * 3;
    const b = indices[lo * 3 + 1] * 3;
    const c = indices[lo * 3 + 2] * 3;

    let su = Math.random();
    let sv = Math.random();
    if (su + sv > 1) {
      su = 1 - su;
      sv = 1 - sv;
    }
    const sw = 1 - su - sv;
    for (let k = 0; k < 3; k++) {
      samples[s * 3 + k] =
        sw * positions[a + k] + su * positions[b + k] + sv * positions[c + k];
    }
  }

  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (let s = 0; s < sampleCount; s++) {
    cx += samples[s * 3];
    cy += samples[s * 3 + 1];
    cz += samples[s * 3 + 2];
  }
  cx /= sampleCount;
  cy /= sampleCount;
  cz /= sampleCount;

  let maxRadius = 0;
  for (let s = 0; s < sampleCount; s++) {
    const r = Math.hypot(
      samples[s * 3] - cx,
      samples[s * 3 + 1] - cy,
      samples[s * 3 + 2] - cz,
    );
    if (r > maxRadius) maxRadius = r;
  }

  const scale = 1 / Math.max(1e-6, maxRadius);
  const out = new Float64Array(positions.length);
  for (let i = 0; i < positions.length / 3; i++) {
    out[i * 3] = (positions[i * 3] - cx) * scale;
    out[i * 3 + 1] = (positions[i * 3 + 1] - cy) * scale;
    out[i * 3 + 2] = (positions[i * 3 + 2] - cz) * scale;
  }

  // A vertex can sit marginally outside the sample hull (a triangle corner the
  // sampler never landed exactly on). Clamping keeps the quantiser in range.
  for (let i = 0; i < out.length; i++) out[i] = Math.max(-1, Math.min(1, out[i]));

  return out;
};

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("usage: node scripts/bake-brain.mjs <input.glb> <output.bin>");
  process.exit(1);
}

const source = readFileSync(inputPath);
const { json, bin } = parseGlb(source);
const { positions, indices } = flattenScene(json, bin);

const vertexCount = positions.length / 3;
const indexCount = indices.length;
if (vertexCount > 65535) {
  throw new Error(`${vertexCount} vertices exceeds the u16 index format`);
}

const unit = normalise(positions, indices, 200000);

const header = 16;
const out = Buffer.alloc(header + vertexCount * 3 * 2 + indexCount * 2);
out.write("VBRN", 0, "ascii");
out.writeUInt32LE(1, 4);
out.writeUInt32LE(vertexCount, 8);
out.writeUInt32LE(indexCount, 12);

for (let i = 0; i < vertexCount * 3; i++) {
  out.writeInt16LE(Math.round(unit[i] * 32767), header + i * 2);
}
const indexBase = header + vertexCount * 3 * 2;
for (let i = 0; i < indexCount; i++) {
  out.writeUInt16LE(indices[i], indexBase + i * 2);
}

writeFileSync(outputPath, out);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
console.log(`  source   ${inputPath}  ${kb(source.length)}`);
console.log(`  vertices ${vertexCount}`);
console.log(`  indices  ${indexCount}  (${indexCount / 3} triangles)`);
console.log(`  baked    ${outputPath}  ${kb(out.length)}`);
