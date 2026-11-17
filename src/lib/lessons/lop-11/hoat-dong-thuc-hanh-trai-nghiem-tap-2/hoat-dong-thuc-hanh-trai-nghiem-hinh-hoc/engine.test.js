import { describe, expect, it } from 'vitest';
import {
  CARD,
  KNOBS,
  SOLIDS,
  SUN_TIMES,
  bestCut,
  foldedFaces,
  heron,
  measures,
  minSlant,
  shadowCm,
  shapeOf,
  sunAngle,
} from './engine.js';

/**
 * The largest distance between corners of neighbouring side faces that
 * must be glued together once folded.
 * @param {import('./engine.js').Shape} s
 */
function seamGap(s) {
  const f = foldedFaces(s, 1);
  let gap = 0;
  for (let i = 0; i < s.n; i++) {
    const a = f[1 + i].pts[2];
    const nextPts = f[1 + ((i + 1) % s.n)].pts;
    const b = nextPts[nextPts.length - 1];
    gap = Math.max(gap, Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z));
  }
  return gap;
}

describe('folding nets', () => {
  it('closes every seam when fully folded, for every slider value', () => {
    const bad = [];
    for (const solid of SOLIDS) {
      const [k1, k2] = KNOBS[solid.id];
      for (let p = k1.min; p <= k1.max; p += k1.step) {
        const qs = k2 ? [k2.min, k2.max, Math.max(k2.min, minSlant(solid.id, p))] : [0];
        for (const q of qs) {
          const s = shapeOf(solid.id, p, q);
          if (!measures(s) || seamGap(s) > 1e-9) bad.push({ id: solid.id, p, q });
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('lies flat on the ground before folding', () => {
    const faces = foldedFaces(shapeOf('chop', 6, 5), 0);
    expect(faces.every((f) => f.pts.every((p) => Math.abs(p.z) < 1e-12))).toBe(true);
  });

  it('measures a regular square pyramid', () => {
    const m = measures({ n: 4, b: 6, c: 0, d: 5 });
    expect(m?.h).toBeCloseTo(4, 12);
    expect(m?.volume).toBeCloseTo(48, 12);
    expect(m?.phi).toBeCloseTo(53.1301, 4);
  });

  it('measures a regular tetrahedron and a frustum', () => {
    const t = measures(shapeOf('tu-dien', 6, 0));
    expect(t?.volume).toBeCloseTo(18 * Math.SQRT2, 9);
    expect(t?.edge).toBeCloseTo(6, 12);
    expect(measures({ n: 4, b: 8, c: 4, d: Math.sqrt(13) })?.volume).toBeCloseTo(112, 9);
  });

  it('finds the largest open box from the card', () => {
    const volume = (/** @type {number} */ x) => measures(shapeOf('hop', x, 0))?.volume ?? 0;
    expect(bestCut(CARD)).toBe(2);
    expect(volume(2)).toBeCloseTo(128, 9);
    const steps = KNOBS.hop[0];
    const others = [];
    for (let x = steps.min; x <= steps.max; x += steps.step) if (x !== 2) others.push(volume(x));
    expect(others.filter((v) => v >= 128)).toEqual([]);
  });

  it('refuses side faces too short to meet', () => {
    expect(measures({ n: 4, b: 6, c: 0, d: 3 })).toBeNull();
    expect(shapeOf('chop', 8, 2).d).toBe(4.5);
  });
});

describe('measuring outdoors', () => {
  it('finds the sun angle from the shadow', () => {
    expect(sunAngle(1, 1.6)).toBeCloseTo(32.0054, 4);
    const off = SUN_TIMES.filter((t) => Math.abs(sunAngle(100, shadowCm(t.deg)) - t.deg) > 0.3);
    expect(off).toEqual([]);
  });

  it('gives the area of a triangle by Heron', () => {
    expect(heron(3, 4, 5)).toBeCloseTo(6, 12);
    expect((2 * heron(1.3, 1.5, 1.4)) / 1.4).toBeCloseTo(1.2, 12);
  });
});
