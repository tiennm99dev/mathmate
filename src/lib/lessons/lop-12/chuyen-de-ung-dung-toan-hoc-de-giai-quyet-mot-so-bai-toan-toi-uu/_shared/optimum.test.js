import { describe, expect, it } from 'vitest';
import { tidy } from '#lib/core/number-format.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  BOX,
  CAN,
  FISHER,
  MOTORBIKE,
  WINDOW,
  atBest,
  canHeight,
  readout,
  samples,
  slopeVerdict,
} from './optimum.js';

const ALL = [CAN, FISHER, MOTORBIKE, BOX, WINDOW];

/** @param {import('./optimum.js').OptProblem} pr */
const grid = (pr) => {
  const out = [];
  const n = Math.round((pr.domain[1] - pr.domain[0]) / pr.step);
  for (let i = 0; i <= n; i++) out.push(tidy(pr.domain[0] + i * pr.step, 6));
  return out;
};

describe('optimisation with the derivative', () => {
  it('has the book optimum values', () => {
    expect(CAN.best).toBeCloseTo(3.745, 3);
    expect(CAN.fn(CAN.best)).toBeCloseTo(264.4, 1);
    expect(canHeight(CAN.best)).toBeCloseTo(2 * CAN.best, 9);
    expect(FISHER.fn(1.5)).toBeCloseTo(26 / 15, 12);
    expect(MOTORBIKE.fn(0.5)).toBe(2450);
    expect(BOX.fn(10)).toBe(16000);
    expect(WINDOW.fn(WINDOW.best)).toBeCloseTo(8 / (4 + Math.PI), 12);
  });

  it('has derivatives that match the functions and vanish at the optimum', () => {
    const bad = [];
    for (const pr of ALL) {
      if (Math.abs(pr.dfn(pr.best)) > 1e-9) bad.push(`${pr.id} f'(best)`);
      for (const p of samples(pr, 20)) {
        const h = 1e-6;
        const num = (pr.fn(p.x + h) - pr.fn(p.x - h)) / (2 * h);
        if (Math.abs(num - pr.dfn(p.x)) > 1e-3 * (1 + Math.abs(num))) bad.push(`${pr.id} ${p.x}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('marks exactly one slider value, the best one on the grid', () => {
    const bad = [];
    for (const pr of ALL) {
      const xs = grid(pr);
      const marked = xs.filter((x) => atBest(pr, x));
      const sign = pr.goal === 'max' ? 1 : -1;
      const top = xs.reduce((b, x) => (sign * pr.fn(x) > sign * pr.fn(b) ? x : b), xs[0]);
      if (marked.length !== 1 || marked[0] !== top) bad.push(`${pr.id} ${marked} ${top}`);
      if (!xs.includes(pr.start) || atBest(pr, pr.start)) bad.push(`${pr.id} start`);
      const ys = samples(pr).map((p) => p.y);
      if (Math.min(...ys) < pr.yRange[0] - 1e-9 && pr.goal === 'min') bad.push(`${pr.id} y`);
      if (Math.max(...ys) > pr.yRange[1] + 1e-9) bad.push(`${pr.id} y`);
    }
    expect(bad).toEqual([]);
  });

  it('tells which way to move', () => {
    expect(slopeVerdict(CAN, 2.5).text).toContain('tăng $r$');
    expect(slopeVerdict(CAN, 6).text).toContain('giảm $r$');
    expect(slopeVerdict(MOTORBIKE, 2).text).toContain('giảm $x$');
    expect(slopeVerdict(BOX, 5).text).toContain('tăng $x$');
    expect(slopeVerdict(CAN, 3.74).tone).toBe('ok');
    expect(readout(MOTORBIKE, 0.5)).toBe(
      "$x = 0{,}5$ triệu đồng; $P = 2\\,450$ triệu đồng; $P'(x) = 0$.",
    );
  });

  it('writes valid TeX', () => {
    const texts = [];
    for (const pr of ALL) {
      texts.push(pr.story, pr.meaning, `$${pr.fTex}$`, `$${pr.dfTex}$`);
      for (const x of grid(pr).filter((_, i) => i % 7 === 0)) {
        texts.push(readout(pr, x), slopeVerdict(pr, x).text);
      }
    }
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
