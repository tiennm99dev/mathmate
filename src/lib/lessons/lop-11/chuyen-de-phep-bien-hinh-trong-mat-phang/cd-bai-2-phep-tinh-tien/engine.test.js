import { describe, expect, it } from 'vitest';
import {
  LINE,
  alongLine,
  circleTex,
  pointLineTex,
  translateLine,
  translationNote,
  workTex,
} from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('translation board', () => {
  it('writes the image of a point with its working', () => {
    expect(pointLineTex(p(-1, 1), p(3, -2), 'C')).toBe(
      "C'\\big(-1 + 3;\\ 1 + (-2)\\big) = C'(2;\\ -1)",
    );
  });

  it('translates a line by changing only its constant term', () => {
    expect(translateLine({ a: 2, b: -1, c: 1 }, p(1, 0))).toEqual({ a: 2, b: -1, c: -1 });
    expect(translateLine(LINE, p(2, 1))).toEqual(LINE);
    expect(alongLine(LINE, p(-2, -1))).toBe(true);
    expect(alongLine(LINE, p(1, 1))).toBe(false);
  });

  it('writes circle equations the book way', () => {
    expect(circleTex(p(1, -2), 5)).toBe('(x - 1)^2 + (y + 2)^2 = 25');
    expect(circleTex(p(0, 3), 2)).toBe('x^2 + (y - 3)^2 = 4');
  });

  it('shows the image equation and the right remark for each figure', () => {
    expect(workTex('duong-tron', p(3, 1)).at(-1)).toBe("(C'):\\ (x - 2)^2 + (y - 1)^2 = 4");
    expect(workTex('duong-thang', p(1, 0)).at(-1)).toBe("d':\\ x - 2y + 1 = 0");
    expect(workTex('tam-giac', p(0, 0))).toHaveLength(4);
    expect(translationNote('duong-thang', p(2, 1))).toContain('trùng');
    expect(translationNote('duong-thang', p(1, 1))).toContain('song song');
    expect(translationNote('tam-giac', p(0, 0))).toContain('đồng nhất');
  });
});
