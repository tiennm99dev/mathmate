import { describe, expect, it } from 'vitest';
import { CATALOG, ROUNDS, differingViews, judgePick } from './engine.js';

describe('ROUNDS', () => {
  it('has exactly one choice whose three views match the given ones', () => {
    const bad = [];
    for (const r of ROUNDS) {
      const matches = r.options.filter((o) => differingViews(o, r.target).length === 0);
      if (matches.length !== 1 || matches[0] !== r.target) bad.push({ r, matches });
    }
    expect(bad).toEqual([]);
  });

  it('gives four different choices from the catalogue', () => {
    const bad = [];
    for (const r of ROUNDS) {
      if (new Set(r.options).size !== 4 || !r.options.includes(r.target)) bad.push(r.target);
      for (const o of r.options) if (!(o in CATALOG)) bad.push(o);
    }
    expect(bad).toEqual([]);
  });
});

describe('judgePick', () => {
  it('names the views that differ', () => {
    expect(judgePick('lSau', 'lSau').ok).toBe(true);
    const wrong = judgePick('lo', 'ranhSau');
    expect(wrong.ok).toBe(false);
    expect(wrong.text).toContain('có hình chiếu đứng giống');
    expect(wrong.text).toContain('Hình chiếu bằng, hình chiếu cạnh có nét khác');
    expect(judgePick('lSau', 'lTruoc').text).toContain('nét đứt');
  });
});
