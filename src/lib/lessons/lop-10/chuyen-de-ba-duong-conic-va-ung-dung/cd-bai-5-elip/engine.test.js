import { describe, expect, it } from 'vitest';
import { BOX, cMax, ellipseAC, equationTex, readout, shapeNote } from './engine.js';

describe('ellipse board', () => {
  it('writes the canonical equation from a and c', () => {
    expect(equationTex(5, 3)).toBe('\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1');
    expect(equationTex(6, 2.5)).toBe('\\dfrac{x^2}{36} + \\dfrac{y^2}{29{,}75} = 1');
    expect(equationTex(4, 0)).toBe('x^2 + y^2 = 16');
  });

  it('keeps every ellipse inside the board', () => {
    const bad = [];
    for (let a = 3; a <= 6; a += 1)
      for (let c = 0; c <= cMax(a); c += 0.5) {
        const E = ellipseAC(a, c);
        if (E.b > BOX.yMax || a > BOX.xMax || E.e >= 1) bad.push([a, c]);
      }
    expect(bad).toEqual([]);
  });

  it('reads the focal radii and the directrix ratio at a vertex', () => {
    const lines = readout(5, 3, { x: 5, y: 0 }, true);
    expect(lines[1]).toBe('e = \\dfrac{c}{a} = 0{,}6');
    expect(lines[2]).toBe('MF_1 = a + ex = 8,\\ MF_2 = a - ex = 2');
    expect(lines[3]).toBe('MF_1 + MF_2 = 10 = 2a');
    expect(lines[5]).toBe('\\dfrac{MF_2}{d(M, \\Delta_2)} = e = 0{,}6');
    expect(readout(5, 0, { x: 5, y: 0 }, true)).toHaveLength(4);
  });

  it('describes the shape by the eccentricity', () => {
    expect(shapeNote(5, 0)).toContain('đường tròn');
    expect(shapeNote(6, 1)).toContain('gần giống đường tròn');
    expect(shapeNote(5, 4.5)).toContain('rất dẹt');
  });
});
