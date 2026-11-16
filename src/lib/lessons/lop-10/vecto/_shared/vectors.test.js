import { describe, expect, it } from 'vitest';
import {
  angleDeg,
  coordTex,
  coordText,
  lengthTex,
  lengthText,
  oneLine,
  relation,
  relationText,
  rootTex,
  vecTex,
} from './vectors.js';

const v = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('vector relations', () => {
  it('tells parallel, same, opposite and equal vectors apart', () => {
    expect(relation(v(3, 1), v(6, 2))).toEqual({
      parallel: true,
      same: true,
      opposite: false,
      equalLength: false,
      equal: false,
    });
    expect(relation(v(3, 1), v(-3, -1))).toMatchObject({
      opposite: true,
      equalLength: true,
      equal: false,
    });
    expect(relation(v(3, 1), v(3, 1)).equal).toBe(true);
    expect(relation(v(3, 1), v(1, 3)).parallel).toBe(false);
  });

  it('treats the zero vector as parallel and same-way with every vector', () => {
    expect(relation(v(0, 0), v(2, 5))).toMatchObject({ parallel: true, same: true, equal: false });
    expect(relation(v(0, 0), v(0, 0)).equal).toBe(true);
  });

  it('knows when two supports are one line', () => {
    expect(oneLine(v(0, 0), v(2, 1), v(4, 2))).toBe(true);
    expect(oneLine(v(0, 0), v(2, 1), v(4, 3))).toBe(false);
  });

  it('names the angle between two vectors', () => {
    expect(angleDeg(v(1, 0), v(0, 2))).toBe(90);
    expect(angleDeg(v(1, 1), v(-1, -1))).toBe(180);
    expect(angleDeg(v(0, 0), v(1, 0))).toBeNull();
  });
});

describe('vector writing', () => {
  it('writes names, coordinates and lengths the book way', () => {
    expect(vecTex('a')).toBe('\\vec{a}');
    expect(vecTex('AB')).toBe('\\overrightarrow{AB}');
    expect(coordText(2, -1.5)).toBe('(2; −1,5)');
    expect(coordTex(2, -1.5)).toBe('(2;\\ -1{,}5)');
    expect(lengthText(5)).toBe('5');
    expect(lengthText(Math.sqrt(13))).toBe('≈ 3,61');
    expect(lengthTex(Math.sqrt(13))).toBe('\\approx 3{,}61');
    expect(lengthTex(2.5)).toBe('= 2{,}5');
    expect(rootTex(v(3, 4))).toBe('5');
    expect(rootTex(v(2, 3))).toBe('\\sqrt{13}');
  });

  it('says how two vectors relate', () => {
    expect(relationText('a', 'b', v(1, 2), v(1, 2))).toContain('$=$');
    expect(relationText('a', 'b', v(1, 2), v(-2, -4))).toContain('ngược hướng');
    expect(relationText('a', 'b', v(1, 2), v(2, 1))).toContain('không cùng phương');
    expect(relationText('a', 'b', v(0, 0), v(2, 1))).toContain('vectơ-không');
  });
});
