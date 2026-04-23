// Pure-Node PNG icon generator — no external deps.
// Run from the workshop-app root:
//   node scripts/generate-pwa-icons.mjs
//
// Emits placeholder brand icons into public/:
//   - icon-192.png (standard)
//   - icon-512.png (standard)
//   - icon-maskable-512.png (safe-area padded for Android adaptive icons)
//   - apple-icon.png (180x180 — iOS home screen)
//
// These are placeholders. For a real launch, replace with designed assets
// generated from a single master (e.g. realfavicongenerator.net).

import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { Buffer } from "node:buffer";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");
mkdirSync(publicDir, { recursive: true });

// --- Minimal PNG encoder (truecolor + alpha, no filter) ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crcBuf]);
}

function encodePng(size, pixelFn) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); // width
  ihdr.writeUInt32BE(size, 4); // height
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const raw = Buffer.alloc(size * (1 + size * 4));
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filter byte per scanline: none
    for (let x = 0; x < size; x++) {
      const { r, g, b, a } = pixelFn(x, y);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
      raw[p++] = a;
    }
  }

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- Brand palette (mirrors app/globals.css) ---
const abyss = { r: 0, g: 13, b: 26 };
const deepOcean = { r: 0, g: 24, b: 51 };
const flame = { r: 255, g: 107, b: 26 };
const ember = { r: 255, g: 140, b: 66 };
const lightning = { r: 0, g: 212, b: 255 };

function mix(a, b, t) {
  const k = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(a.r + (b.r - a.r) * k),
    g: Math.round(a.g + (b.g - a.g) * k),
    b: Math.round(a.b + (b.b - a.b) * k),
  };
}

/**
 * Brand glyph: radial ocean → abyss background, thin lightning ring,
 * soft ember core glow. `inset` (0..1) pads the glyph inside the canvas
 * so maskable icons stay safe when cropped to a circle.
 */
function brandPixel(size, inset = 0) {
  const cx = size / 2;
  const cy = size / 2;
  const usable = size * (1 - inset);
  const maxR = usable * 0.5;
  const ringR = maxR * 0.85;
  const ringW = Math.max(1, size * 0.01);
  const coreR = maxR * 0.35;
  const glowR = maxR * 0.72;

  return (x, y) => {
    const dx = x - cx + 0.5;
    const dy = y - cy + 0.5;
    const d = Math.sqrt(dx * dx + dy * dy);

    // Outside usable radius: solid abyss (for maskable safe area)
    if (d > maxR) return { ...abyss, a: 255 };

    // Background: radial deep-ocean → abyss
    let c = mix(deepOcean, abyss, d / maxR);

    // Ember glow falloff
    if (d < glowR) {
      const g = 1 - d / glowR;
      c = mix(c, flame, Math.pow(g, 1.8) * 0.75);
    }

    // Solid ember core
    if (d < coreR) {
      c = mix(c, ember, 1 - (d / coreR) * 0.4);
    }

    // Lightning ring (anti-aliased)
    const ringD = Math.abs(d - ringR);
    if (ringD < ringW * 2) {
      const alpha = 1 - ringD / (ringW * 2);
      c = mix(c, lightning, alpha * 0.7);
    }

    return { ...c, a: 255 };
  };
}

const targets = [
  { file: "icon-192.png", size: 192, inset: 0 },
  { file: "icon-512.png", size: 512, inset: 0 },
  // Maskable: pad to leave ~10% safe area on each side so crop to circle looks right
  { file: "icon-maskable-512.png", size: 512, inset: 0.2 },
  // Apple Touch Icon — dimensions recommended by Apple HIG
  { file: "apple-icon.png", size: 180, inset: 0 },
];

for (const { file, size, inset } of targets) {
  const buf = encodePng(size, brandPixel(size, inset));
  writeFileSync(resolve(publicDir, file), buf);
  console.log(`wrote public/${file} (${size}x${size}, ${buf.length} bytes)`);
}
