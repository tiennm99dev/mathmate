import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { ROUNDS, check, extremaOf, graphText, summaryText, tableOf } from './engine.js';

/** @param {(x: number) => number} f @param {number} x */
const slope = (f, x) => (f(x + 1e-6) - f(x - 1e-6)) / 2e-6;

/**
 * Does f near x come close to the value v (a number, or ±∞ as a big value
 * of that sign)?
 * @param {number} y @param {number} v
 */
const near = (y, v) =>
  Number.isFinite(v) ? Math.abs(y - v) < 1e-3 : Math.sign(y) === Math.sign(v) && Math.abs(y) > 1e3;

describe('matching sets', () => {
  it('give every function a table that matches its derivative and limits', () => {
    const bad = [];
    for (const round of ROUNDS) {
      for (const item of round.items) {
        const { f, nodes, signs } = item;
        if (signs.length !== nodes.length - 1) bad.push(`${item.text}: signs`);
        signs.forEach((s, i) => {
          const a = nodes[i][1];
          const b = nodes[i + 1][1];
          const lo = Number.isFinite(a) ? a : Number.isFinite(b) ? b - 50 : -25;
          const hi = Number.isFinite(b) ? b : Number.isFinite(a) ? a + 50 : 25;
          for (let k = 1; k < 10; k++) {
            const x = lo + ((hi - lo) * k) / 10;
            if (Math.sign(slope(f, x)) !== (s === '+' ? 1 : -1))
              bad.push(`${item.text}: sign at ${x}`);
          }
        });
        for (const n of nodes) {
          if (n[0] === 'zero') {
            if (Math.abs(slope(f, n[1])) > 1e-4) bad.push(`${item.text}: y' at ${n[1]}`);
            if (f(n[1]) !== n[2]) bad.push(`${item.text}: y at ${n[1]}`);
          } else if (n[0] === 'end') {
            const x = n[1] > 0 ? 1e7 : -1e7;
            if (!near(f(x), n[2])) bad.push(`${item.text}: limit at ${n[1]}`);
          } else {
            if (!near(f(n[1] - 1e-7), n[2])) bad.push(`${item.text}: left of ${n[1]}`);
            if (!near(f(n[1] + 1e-7), n[3])) bad.push(`${item.text}: right of ${n[1]}`);
            if (!item.asymptotes.some((l) => l.vertical && l.c === n[1])) {
              bad.push(`${item.text}: asymptote x = ${n[1]}`);
            }
          }
        }
        for (const l of item.asymptotes.filter((v) => !v.vertical)) {
          const gap = f(1e6) - ((l.a ?? 0) * 1e6 + (l.b ?? 0));
          if (Math.abs(gap) > 1e-3) bad.push(`${item.text}: asymptote y = ${l.a}x + ${l.b}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('render every formula with KaTeX', () => {
    const bad = [];
    for (const round of ROUNDS) {
      for (const item of round.items) {
        try {
          katex.renderToString(item.tex, { strict: 'error', throwOnError: true });
        } catch {
          bad.push(item.tex);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('keep the three tables of a set different and every letter in use once', () => {
    const bad = [];
    for (const round of ROUNDS) {
      const texts = round.items.map((it) => JSON.stringify(tableOf(it)));
      if (new Set(texts).size !== 3) bad.push(`${round.label}: tables`);
      for (const order of [round.formulas, round.tables]) {
        if ([...order].sort().join() !== '0,1,2') bad.push(`${round.label}: order`);
        if (order.every((v, i) => v === i)) bad.push(`${round.label}: unshuffled`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('marks extrema where y′ changes sign only', () => {
    const [cubic] = ROUNDS[1].items;
    expect(extremaOf(cubic)).toEqual([]);
    expect(extremaOf(ROUNDS[0].items[2])).toEqual([
      { x: -1, y: 3, kind: 'max' },
      { x: 1, y: -1, kind: 'min' },
    ]);
  });

  it('describes a graph without its formula', () => {
    const text = graphText(ROUNDS[2].items[0], 1);
    expect(text).toContain('tiệm cận đứng x = −1');
    expect(text).toContain('tiệm cận ngang y = 1');
    expect(text).not.toContain('/');
  });

  it('checks the picks graph by graph', () => {
    const round = ROUNDS[0];
    const right = round.items.map((_, i) => ({
      formula: round.formulas.indexOf(i),
      table: round.tables.indexOf(i),
    }));
    expect(check(round, right).every((r) => r.formula && r.table)).toBe(true);
    expect(summaryText(check(round, right))).toContain('6/6');
    const none = round.items.map(() => ({ formula: -1, table: -1 }));
    expect(check(round, none).some((r) => r.formula || r.table)).toBe(false);
    const swapped = [right[1], right[0], right[2]];
    expect(summaryText(check(round, swapped))).toContain('Đúng 2/6');
  });
});
