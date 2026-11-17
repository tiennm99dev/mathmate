import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { richParts } from '#lib/core/rich-parts.js';
import { LEAVES, TARGETS, leafProbs, leafTex, simulate, targetText } from './engine.js';

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

describe('the probability tree', () => {
  it('multiplies along each branch', () => {
    expect(leafProbs(0.8, 0.7)).toEqual({ AB: 0.56, AnB: 0.24, nAB: 0.14, nAnB: 0.06 });
    expect(leafTex('AnB', 0.8, 0.7)).toBe('0{,}8 \\cdot 0{,}3 = 0{,}24');
  });

  it('adds the leaves of an event', () => {
    expect(targetText('atLeastOne', 0.8, 0.7)).toContain('= 0{,}94');
    expect(targetText('exactlyOne', 0.8, 0.7)).toContain('0{,}24 + 0{,}14 = 0{,}38');
    expect(targetText('none', 0.8, 0.7)).toContain('0{,}2 \\cdot 0{,}3 = 0{,}06');
  });

  it('writes valid TeX for every setting', () => {
    const bad = [];
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j <= 20; j += 5) {
        for (const t of TARGETS) bad.push(...texErrors(targetText(t.value, i / 20, j / 20)));
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('the simulation', () => {
  it('lands near the tree probabilities', () => {
    const n = 20000;
    const c = simulate(rng(42), n, 0.8, 0.7);
    const probs = leafProbs(0.8, 0.7);
    const far = LEAVES.filter((l) => Math.abs(c[l.id] / n - probs[l.id]) > 0.015);
    expect(far).toEqual([]);
    expect(c.AB + c.AnB + c.nAB + c.nAnB).toBe(n);
  });

  it('never hits with probability 0', () => {
    expect(simulate(rng(1), 500, 0, 1)).toEqual({ AB: 0, AnB: 0, nAB: 500, nAnB: 0 });
  });
});
