import { describe, expect, it } from 'vitest';
import { setTex } from '../_shared/intervals.js';
import { SHADE, endSymbol, moveEnd, resultOf, switchEnd, toSet } from './engine.js';

/** @type {import('./engine.js').EditableInterval} */
const A = { lo: -1, hi: 3, loMode: 'closed', hiMode: 'open' };
/** @type {import('./engine.js').EditableInterval} */
const B = { lo: 1, hi: 5, loMode: 'open', hiMode: 'closed' };

describe('interval editor', () => {
  it('reads the ends as brackets and infinity', () => {
    expect(setTex(toSet(A))).toBe('[-1;\\ 3)');
    expect(setTex(toSet({ ...B, hiMode: 'infinite' }))).toBe('(1;\\ +\\infty)');
    expect([
      endSymbol('closed', 'lo'),
      endSymbol('open', 'hi'),
      endSymbol('infinite', 'lo'),
    ]).toEqual(['[', ')', '−∞']);
    const cycled = switchEnd(switchEnd(switchEnd(A, 'hi'), 'hi'), 'hi');
    expect(cycled.hiMode).toBe('open');
  });

  it('keeps the ends on ticks, inside the line and apart', () => {
    expect(moveEnd(A, 'lo', 3.4).lo).toBe(2);
    expect(moveEnd(A, 'hi', 9).hi).toBe(6);
    expect(moveEnd(A, 'lo', -20).lo).toBe(-6);
    expect(moveEnd(A, 'hi', -3).hi).toBe(0);
  });

  it('lets an end move freely while the other end is infinite', () => {
    /** @type {import('./engine.js').EditableInterval} */
    const ray = { ...A, hiMode: 'infinite' };
    expect(moveEnd(ray, 'lo', 6).lo).toBe(6);
    expect(moveEnd({ ...A, loMode: 'infinite' }, 'hi', -6).hi).toBe(-6);
  });

  it('moves a returning end so the interval keeps its order', () => {
    /** @type {import('./engine.js').EditableInterval} */
    const ray = { lo: 6, hi: 3, loMode: 'closed', hiMode: 'infinite' };
    const back = switchEnd(ray, 'hi');
    expect(back.hiMode).toBe('closed');
    expect(back.lo).toBeLessThan(back.hi);
    expect([back.lo, back.hi]).toEqual([5, 6]);
    /** @type {import('./engine.js').EditableInterval} */
    const left = { lo: 2, hi: -6, loMode: 'infinite', hiMode: 'closed' };
    expect(switchEnd(left, 'lo')).toMatchObject({ lo: -6, hi: -5, loMode: 'closed' });
  });

  it('works out the worked example of the lesson', () => {
    const got = ['cap', 'cup', 'diff', 'rdiff', 'comp'].map((op) =>
      setTex(resultOf(A, B, /** @type {any} */ (op)).set),
    );
    expect(got).toEqual([
      '(1;\\ 3)',
      '[-1;\\ 5]',
      '[-1;\\ 1]',
      '[3;\\ 5]',
      '(-\\infty;\\ -1) \\cup [3;\\ +\\infty)',
    ]);
    expect(resultOf(A, B, 'cap').text).toContain('khoảng');
  });

  it('says when the result is empty', () => {
    /** @type {import('./engine.js').EditableInterval} */
    const far = { lo: 4, hi: 6, loMode: 'closed', hiMode: 'closed' };
    expect(resultOf(A, far, 'cap').text).toContain('tập rỗng');
  });

  it('shades the complement outside A only', () => {
    expect(SHADE.comp).toEqual({ a: false, both: false, b: true, out: true });
  });
});
