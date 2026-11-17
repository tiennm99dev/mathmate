import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { SCENARIOS, compareText, judge, winner } from './engine.js';

/** @param {string} id */
const get = (id) => SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0];

describe('financial scenarios', () => {
  it('picks the book answers at the starting values', () => {
    const got = SCENARIOS.map((s) => [s.id, winner(s, s.param.start)]);
    expect(got).toEqual([
      ['vay-ngan-han', 1],
      ['gui-tiet-kiem', 0],
      ['tra-gop', 0],
      ['nhan-thuong', 1],
    ]);
  });

  it('switches the better option somewhere on each slider', () => {
    const flat = SCENARIOS.filter((s) => winner(s, s.param.min) === winner(s, s.param.max));
    expect(flat.map((s) => s.id)).toEqual([]);
  });

  it('judges a pick', () => {
    expect(judge(get('nhan-thuong'), 1).tone).toBe('ok');
    expect(judge(get('nhan-thuong'), 0).tone).toBe('warn');
    expect(compareText(get('nhan-thuong'), 3)).toContain('phương án B');
    expect(compareText(get('nhan-thuong'), 9)).toContain('phương án A');
  });

  it('writes valid TeX', () => {
    const texts = SCENARIOS.flatMap((s) => [
      s.story,
      ...s.options,
      s.measure,
      ...s.compute(s.param.min).map((o) => o.tex),
      ...s.compute(s.param.max).map((o) => o.tex),
      judge(s, 0).text,
      judge(s, 1).text,
    ]);
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
