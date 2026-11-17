import { describe, expect, it } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */
/** @typedef {{ n: number, d: number }} Frac */

/** @param {unknown} o */
const fracOf = (o) =>
  /** @type {Frac | undefined} */ (
    typeof o === 'object' && o !== null && 'fracs' in o
      ? /** @type {any} */ (o).fracs[0]
      : undefined
  );

/**
 * The exact value of a line 'x op y op z = …' as [numerator, denominator].
 * @param {Array<Frac | string>} items
 */
function valueOf(items) {
  const end = items.indexOf('=');
  let n = 0;
  let d = 1;
  let sign = 1;
  for (const item of items.slice(0, end)) {
    if (item === '+') sign = 1;
    else if (item === '−') sign = -1;
    else {
      const f = typeof item === 'string' ? { n: Number(item), d: 1 } : item;
      n = n * f.d + sign * f.n * d;
      d *= f.d;
    }
  }
  return { n, d };
}

/** @param {Frac} f @param {Frac} g */
const same = (f, g) => f.n * g.d === g.n * f.d;

/** @param {Question} q */
function problems(q) {
  const out = [];
  const texts = q.options.map((o) => (typeof o === 'string' ? o : o.label));
  if (texts.length < 2 || new Set(texts).size !== texts.length) out.push('options');
  if (q.answer < 0 || q.answer >= texts.length) out.push('answer index');
  if (q.optionLabels && q.optionLabels.length !== texts.length) out.push('labels');
  const v = q.visual;
  /** @type {Frac | null} */
  let truth = null;
  if (v?.type === 'line') truth = valueOf(v.items);
  if (v?.type === 'facts') {
    const [p, r] = v.rows;
    const plus = v.op === '+';
    truth = { n: p.n * r.d + (plus ? 1 : -1) * r.n * p.d, d: p.d * r.d };
  }
  if (!truth) return [...out, 'visual'];
  if (truth.n <= 0) out.push('not positive');
  if (q.kind === 'dung-sai' && v?.type === 'line') {
    const shown = /** @type {Frac} */ (v.items[v.items.length - 1]);
    if (q.options[q.answer] !== (same(shown, truth) ? 'Đúng' : 'Sai')) out.push('verdict');
    return out;
  }
  const fracs = q.options.map(fracOf);
  if (fracs.some((f) => !f || f.n < 1 || f.d < 1)) return [...out, 'fractions'];
  const right = /** @type {Frac} */ (fracs[q.answer]);
  if (!same(right, truth)) out.push('wrong answer');
  if (gcd(right.n, right.d) !== 1) out.push('not lowest');
  if (fracs.filter((f) => same(/** @type {Frac} */ (f), truth)).length !== 1) out.push('twin');
  return out;
}

describe('the mixed adding and subtracting practice round', () => {
  it('asks one question of each part', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const kinds = buildRound(seed)
        .map((q) => q.kind)
        .sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('stores the true answer, in lowest terms, with no twin among the options', () => {
    const bad = [];
    for (let seed = 1; seed <= 200; seed++) {
      for (const q of buildRound(seed)) {
        const p = problems(q);
        if (p.length) bad.push([seed, q.kind, p, q.solution]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keeps different denominators where one divides the other', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'cong-khac-mau' && q.kind !== 'tru-khac-mau') continue;
        const v = q.visual;
        if (v?.type !== 'line') continue;
        const [f, , g] = /** @type {Frac[]} */ (v.items);
        const big = Math.max(f.d, g.d);
        if (f.d === g.d || big % f.d !== 0 || big % g.d !== 0 || big > 24) bad.push([seed, f, g]);
      }
    }
    expect(bad).toEqual([]);
  });
});
