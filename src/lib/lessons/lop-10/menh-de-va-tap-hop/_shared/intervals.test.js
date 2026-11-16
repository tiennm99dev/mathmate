import { describe, expect, it } from 'vitest';
import { combine, has, interval, kindOf, sameSet, setTex, setText } from './intervals.js';

const A = [interval(-1, 3, true, false)]; // [-1; 3)
const B = [interval(2, Infinity, true, false)]; // [2; +∞)

describe('interval sets', () => {
  it('tests membership at open and closed ends', () => {
    expect([has(A, -1), has(A, 3), has(A, 2.9), has(B, 1000)]).toEqual([true, false, true, true]);
  });

  it('combines two intervals the book way', () => {
    expect(setTex(combine(A, B, 'cap'))).toBe('[2;\\ 3)');
    expect(setTex(combine(A, B, 'cup'))).toBe('[-1;\\ +\\infty)');
    expect(setTex(combine(A, B, 'diff'))).toBe('[-1;\\ 2)');
    expect(setTex(combine(A, B, 'rdiff'))).toBe('[3;\\ +\\infty)');
    expect(setTex(combine(A, B, 'comp'))).toBe('(-\\infty;\\ -1) \\cup [3;\\ +\\infty)');
  });

  it('keeps single points and empty results', () => {
    const C = [interval(0, 2, true, true)];
    const D = [interval(2, 5, true, false)];
    expect(setTex(combine(C, D, 'cap'))).toBe('\\{2\\}');
    expect(setTex(combine(C, [interval(3, 4, false, false)], 'cap'))).toBe('\\varnothing');
    expect(setTex(combine([interval(-Infinity, Infinity, false, false)], [], 'comp'))).toBe(
      '\\varnothing',
    );
    expect(setTex(combine([], [], 'comp'))).toBe('\\mathbb{R}');
  });

  it('removes an inner point', () => {
    const C = [interval(0, 4, true, true)];
    expect(setText(combine(C, [interval(2, 2, true, true)], 'diff'))).toBe('[0; 2) ∪ (2; 4]');
  });

  it('names the interval kinds and compares sets', () => {
    expect(A.map(kindOf)).toEqual(['nửa khoảng']);
    expect(kindOf(interval(-Infinity, 1, false, false))).toBe('khoảng');
    expect(kindOf(interval(0, 1, true, true))).toBe('đoạn');
    expect(
      sameSet(
        [interval(0, 1, true, true), interval(1, 2, true, false)],
        [interval(0, 2, true, false)],
      ),
    ).toBe(true);
    expect(setText(B)).toBe('[2; +∞)');
  });
});
