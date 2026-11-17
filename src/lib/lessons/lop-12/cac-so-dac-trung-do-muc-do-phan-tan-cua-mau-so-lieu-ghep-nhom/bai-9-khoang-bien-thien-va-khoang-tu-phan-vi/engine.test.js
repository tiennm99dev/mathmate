import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { PRESETS, groupsOf, outlierNote, spreadView } from './engine.js';

/** @param {string} text */
const texParts = (text) => [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

describe('what the spread widget shows', () => {
  it('marks the range and the quartiles of the travel-time table', () => {
    const v = spreadView(groupsOf(PRESETS[0], PRESETS[0].counts, false));
    expect(v.range).toBe(25);
    expect(v.span).toEqual({ from: 0, to: 25, label: 'R = 25' });
    expect(v.markers.map((m) => m.label)).toEqual(['Q₁ ≈ 6,43', 'Q₃ = 15']);
    expect(v.highlight).toEqual([1, 2]);
    expect(v.shades).toEqual([
      { index: 1, fraction: 4 / 14 },
      { index: 2, fraction: 1 },
    ]);
    expect(v.band?.label).toBe('ΔQ ≈ 8,57');
  });

  it('shows the range jump and the steady interquartile range with a far value', () => {
    const p = PRESETS[1];
    const before = spreadView(groupsOf(p, p.counts, false));
    const after = spreadView(groupsOf(p, p.counts, true));
    expect([before.range, after.range]).toEqual([30, 45]);
    expect(before.iqr).toBe(9);
    expect(after.iqr).toBeCloseTo(9.27, 2);
    expect(outlierNote(before, after, p.unit)).toContain('$R$ tăng từ $30$ lên $45$ cm');
  });

  it('warns on an empty sample', () => {
    const v = spreadView(groupsOf(PRESETS[0], [0, 0, 0, 0, 0], false));
    expect(v.empty).toBe(true);
    expect(v.band).toBeNull();
  });

  it('renders every formula and note in KaTeX for many tables', () => {
    const bad = [];
    for (const p of PRESETS) {
      for (let shift = 0; shift < 6; shift++) {
        const counts = p.counts.map((c, i) => (c + shift * i) % 13);
        for (const outlier of [false, true]) {
          const v = spreadView(groupsOf(p, counts, outlier));
          const plain = spreadView(groupsOf(p, counts, false));
          for (const t of [
            ...v.tex,
            ...texParts(v.note),
            ...texParts(outlierNote(plain, v, p.unit)),
          ]) {
            try {
              katex.renderToString(t, { strict: 'error', throwOnError: true });
            } catch {
              bad.push(t);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
