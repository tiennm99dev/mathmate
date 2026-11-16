import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { approxText, makeGroups } from '../_shared/grouped.js';
import { MEASURES, PRESETS, viewOf } from './engine.js';

const study = makeGroups(PRESETS[0].start, PRESETS[0].width, PRESETS[0].counts);

describe('what the measures widget shows', () => {
  it('marks the study-time measures', () => {
    expect(viewOf(study, 'mean').markers[0].label).toBe('x̄ = 49,5');
    expect(viewOf(study, 'median')).toMatchObject({
      highlight: 2,
      shade: { index: 2, fraction: 0.5 },
    });
    expect(viewOf(study, 'q1').markers[0].label).toBe('Q₁ ≈ 31,11');
    expect(viewOf(study, 'q3').markers[0].x).toBe(68);
    expect(viewOf(study, 'mode')).toMatchObject({ highlight: 2, modeIndex: 2 });
    expect(viewOf(study, 'mode').markers[0].x).toBe(52);
  });

  it('warns on an empty sample and a flat top', () => {
    expect(viewOf(makeGroups(0, 1, [0, 0, 0]), 'median').tone).toBe('warn');
    const flat = viewOf(makeGroups(0, 1, [3, 3, 3]), 'mode');
    expect(flat.markers.map((m) => m.x)).toEqual([1, 2]);
    expect(viewOf(makeGroups(0, 1, [1, 3, 3, 3, 1]), 'mode').markers).toHaveLength(2);
  });

  it('writes numbers the book way', () => {
    expect(approxText(53.4375)).toBe('≈ 53,44');
    expect(approxText(7.5)).toBe('= 7,5');
  });

  it('renders every formula and note in KaTeX for many tables', () => {
    const bad = [];
    for (const p of PRESETS) {
      for (let shift = 0; shift < 6; shift++) {
        const counts = p.counts.map((c, i) => (c + shift * i) % 13);
        const groups = makeGroups(p.start, p.width, counts);
        for (const { value } of MEASURES) {
          const v = viewOf(groups, value);
          const notes = [...v.tex, ...[...v.note.matchAll(/\$([^$]+)\$/g)].map((m) => m[1])];
          for (const t of notes) {
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
