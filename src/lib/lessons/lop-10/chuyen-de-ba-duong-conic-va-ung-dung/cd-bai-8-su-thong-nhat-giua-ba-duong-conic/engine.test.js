import { describe, expect, it } from 'vitest';
import {
  ALPHA,
  branchesOf,
  equationTex,
  kindNote,
  readout,
  sectionEccentricity,
  sectionKind,
  sectionNote,
  sectionShape,
  sideView,
} from './engine.js';

describe('focus-directrix board', () => {
  it('writes MF² = e²·d(M, Δ)²', () => {
    expect(equationTex(0.6, 3)).toBe('x^2 + y^2 = 0{,}36(x + 3)^2');
    expect(equationTex(1, 2)).toBe('x^2 + y^2 = (x + 2)^2');
  });

  it('draws one closed curve for an ellipse and two branches for a hyperbola', () => {
    expect(branchesOf(0.5, 3)).toHaveLength(1);
    expect(branchesOf(1, 3)).toHaveLength(1);
    expect(branchesOf(2, 3)).toHaveLength(2);
    // e moved by the slider in steps of 0.05 lands on 1 with float noise.
    expect(branchesOf(0.25 + 15 * 0.05, 3)).toHaveLength(1);
  });

  it('reads the ratio at a point of the curve', () => {
    const M = branchesOf(0.6, 3)[0][0];
    const lines = readout(0.6, 3, M);
    expect(lines[1]).toBe('\\dfrac{MF}{d(M, \\Delta)} = e = 0{,}6');
    expect(kindNote(0.6)).toContain('elip');
    expect(kindNote(1)).toContain('parabol');
    expect(kindNote(1.5)).toContain('hypebol');
  });
});

describe('cut cone', () => {
  it('classifies the section by the tilt', () => {
    expect([0, 30, 59, 60, 61, 85].map((phi) => sectionKind(phi))).toEqual([
      'duong-tron',
      'elip',
      'elip',
      'parabol',
      'hypebol',
      'hypebol',
    ]);
    expect(sectionEccentricity(0)).toBe(0);
    expect(sectionEccentricity(90 - ALPHA)).toBe(1);
    expect(sectionEccentricity(85)).toBeGreaterThan(1);
  });

  it('meets the generators on the right nappes', () => {
    const apex = { x: 150, y: 150 };
    const at = (/** @type {number} */ phi) =>
      sideView(phi, { apex, depth: 60 }).hits.map((h) => (h === null ? null : Math.sign(h.t)));
    expect(at(30)).toEqual([1, 1]);
    expect(at(60)).toEqual([null, 1]);
    expect(at(70)).toEqual([-1, 1]);
  });

  it('pictures and explains each kind', () => {
    expect(sectionShape(0.5)).toHaveLength(1);
    expect(sectionShape(1)).toHaveLength(1);
    expect(sectionShape(1.1)).toHaveLength(2);
    expect(sectionNote(0)).toContain('đường tròn');
    expect(sectionNote(60)).toContain('parabol');
    expect(sectionNote(75)).toContain('hypebol');
  });
});
