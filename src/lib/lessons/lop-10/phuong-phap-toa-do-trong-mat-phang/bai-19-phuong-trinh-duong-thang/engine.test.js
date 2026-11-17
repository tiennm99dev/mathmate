import { describe, expect, it } from 'vitest';
import { lineInfo, panelTex, pointNormalTex, slopeTex, specialText } from './engine.js';

const v = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('the line through two points', () => {
  it('gives a direction vector, a normal vector and the equations', () => {
    const { u, n, line } = lineInfo(v(1, 2), v(3, 6));
    expect(u).toEqual(v(2, 4));
    expect(n).toEqual(v(4, -2));
    expect(line).toEqual({ a: 2, b: -1, c: 0 });
    const tex = panelTex(v(-1, 3), v(2, 1));
    expect(tex.param).toBe('\\begin{cases} x = -1 + 3t \\\\ y = 3 - 2t \\end{cases}');
    expect(tex.general).toEqual(['-2(x + 1) - 3(y - 3) = 0', '\\Leftrightarrow 2x + 3y - 7 = 0']);
    expect(tex.slope).toBe('y = -\\frac{2}{3}x + \\frac{7}{3}');
  });

  it('writes the point-normal form with zero coordinates left plain', () => {
    expect(pointNormalTex(v(0, -2), v(3, 1))).toBe('3x + (y + 2) = 0');
  });

  it('writes y = kx + m except for upright lines', () => {
    expect(slopeTex({ a: 1, b: -1, c: 0 })).toBe('y = x');
    expect(slopeTex({ a: 0, b: 1, c: -2 })).toBe('y = 2');
    expect(slopeTex({ a: 1, b: 0, c: -2 })).toBeNull();
  });

  it('names the special positions', () => {
    expect(specialText({ a: 1, b: 0, c: -2 })).toContain('song song với trục $Oy$');
    expect(specialText({ a: 0, b: 1, c: 0 })).toContain('là trục $Ox$');
    expect(specialText({ a: 2, b: -1, c: 0 })).toContain('gốc toạ độ');
  });
});
