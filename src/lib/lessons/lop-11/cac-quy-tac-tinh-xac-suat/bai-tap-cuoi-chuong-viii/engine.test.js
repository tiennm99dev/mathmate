import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { richParts } from '#lib/core/rich-parts.js';
import { PROBLEMS, checkTyped, runProblem } from './engine.js';

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

describe('review problems', () => {
  it('simulate close to the computed probability', () => {
    const n = 20000;
    const far = PROBLEMS.filter((p) => Math.abs(runProblem(p, rng(7), n) / n - p.answer) > 0.015);
    expect(far.map((p) => p.id)).toEqual([]);
  });

  it('check typed answers as decimals or fractions', () => {
    const [shooters, six] = PROBLEMS;
    expect(checkTyped('0,94', shooters.answer)).toBe('ok');
    expect(checkTyped('47/50', shooters.answer)).toBe('ok');
    expect(checkTyped('0,56', shooters.answer)).toBe('wrong');
    expect(checkTyped('11/36', six.answer)).toBe('ok');
    expect(checkTyped('22/72', six.answer)).toBe('ok');
    expect(checkTyped('', six.answer)).toBe('empty');
    expect(checkTyped('x', six.answer)).toBe('invalid');
  });

  it('write valid TeX', () => {
    const bad = PROBLEMS.flatMap((p) => [p.text, ...p.steps].flatMap(texErrors));
    expect(bad).toEqual([]);
  });
});
