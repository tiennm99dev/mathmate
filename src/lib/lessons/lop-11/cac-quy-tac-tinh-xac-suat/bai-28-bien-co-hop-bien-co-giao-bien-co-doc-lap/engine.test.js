import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { richParts } from '#lib/core/rich-parts.js';
import {
  OMEGA,
  PRESETS,
  VIEWS,
  presetSet,
  regionCounts,
  toggled,
  verdict,
  viewText,
} from './engine.js';

/** @param {string} text */
function texErrors(text) {
  const bad = [];
  for (const part of richParts(text)) {
    if (part.kind !== 'tex') continue;
    try {
      katex.renderToString(part.tex, { throwOnError: true });
    } catch {
      bad.push(part.tex);
    }
  }
  return bad;
}

describe('the two-roll sample space', () => {
  it('has 36 outcomes and the preset sizes of the book', () => {
    expect(OMEGA).toHaveLength(36);
    const sizes = Object.fromEntries(PRESETS.map((p) => [p.id, presetSet(p.id).size]));
    expect(sizes).toEqual({
      'chan-1': 18,
      'chia3-2': 12,
      'tong-7': 6,
      'sau-1': 6,
      'bang-nhau': 6,
      'tong-chan': 18,
      'tong-10': 6,
      'tong-4': 6,
      'co-6': 11,
    });
  });

  it('counts the Venn regions', () => {
    expect(regionCounts(presetSet('chan-1'), presetSet('chia3-2'))).toEqual({
      onlyA: 12,
      both: 6,
      onlyB: 6,
      neither: 12,
    });
  });
});

describe('mutually exclusive and independent events', () => {
  it('finds independent pairs', () => {
    for (const [a, b] of [
      ['chan-1', 'chia3-2'],
      ['tong-7', 'sau-1'],
      ['tong-7', 'chan-1'],
    ]) {
      expect(verdict(presetSet(a), presetSet(b))).toMatchObject({
        independent: true,
        disjoint: false,
        tone: 'ok',
      });
    }
  });

  it('finds dependent and mutually exclusive pairs', () => {
    expect(verdict(presetSet('bang-nhau'), presetSet('tong-chan')).independent).toBe(false);
    expect(verdict(presetSet('tong-10'), presetSet('sau-1')).independent).toBe(false);
    const clash = verdict(presetSet('tong-7'), presetSet('bang-nhau'));
    expect(clash).toMatchObject({ disjoint: true, independent: false });
  });

  it('does not judge independence for an empty or a certain event', () => {
    expect(verdict(new Set(), presetSet('tong-7')).independent).toBeNull();
    expect(verdict(new Set(OMEGA.map((_, i) => i)), presetSet('tong-7')).independent).toBeNull();
  });

  it('reads the shaded event', () => {
    const A = presetSet('chan-1');
    const B = presetSet('chia3-2');
    expect(viewText(A, B, 'union')).toContain('$24$ kết quả');
    expect(viewText(A, B, 'inter')).toContain('\\dfrac{6}{36} = \\dfrac{1}{6}');
    expect(viewText(A, B, 'notA')).toContain('$18$ kết quả');
  });

  it('writes valid TeX for every pair and view', () => {
    const bad = [];
    for (const a of PRESETS) {
      for (const b of PRESETS) {
        const A = presetSet(a.id);
        const B = presetSet(b.id);
        bad.push(...texErrors(verdict(A, B).text));
        for (const v of VIEWS) bad.push(...texErrors(viewText(A, B, v.value)));
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('editing an event by hand', () => {
  it('adds and removes one outcome without touching the original', () => {
    const A = presetSet('tong-7');
    const more = toggled(A, 0);
    expect(more.size).toBe(7);
    expect(toggled(more, 0).size).toBe(6);
    expect(A.size).toBe(6);
  });
});
