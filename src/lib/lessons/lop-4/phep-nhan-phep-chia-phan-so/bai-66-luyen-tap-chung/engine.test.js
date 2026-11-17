import { describe, expect, it } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import { KIND_LABELS, STORIES, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */
/** @typedef {{ n: number, d: number }} Frac */

/** @param {unknown} o */
const fracOf = (o) =>
  /** @type {Frac | undefined} */ (
    typeof o === 'object' && o !== null && 'fracs' in o
      ? /** @type {any} */ (o).fracs[0]
      : undefined
  );

/** @param {Frac} f @param {Frac} g */
const same = (f, g) => f.n * g.d === g.n * f.d;

/**
 * The true value a question asks for, worked out from what it shows.
 * @param {Question} q
 * @returns {Frac | null}
 */
function truthOf(q) {
  const v = q.visual;
  if (v?.type !== 'line') return null;
  const it = v.items;
  /** @param {Frac | string} x @returns {Frac} */
  const f = (x) => (typeof x === 'string' ? { n: Number(x), d: 1 } : x);
  if (q.kind === 'dao-nguoc') return { n: f(it[0]).d, d: f(it[0]).n };
  if (q.kind === 'thua-so') {
    const g = f(it[2]);
    const h = f(it[4]);
    return { n: h.n * g.d, d: h.d * g.n };
  }
  if (q.kind === 'phan-so-cua-mot-so') {
    const p = f(it[0]);
    return { n: Number(it[2]) * p.n, d: p.d };
  }
  const a = f(it[0]);
  const b = f(it[2]);
  if (it[1] === '×') return { n: a.n * b.n, d: a.d * b.d };
  return { n: a.n * b.d, d: a.d * b.n };
}

/** @param {Question} q */
function problems(q) {
  const out = [];
  const texts = q.options.map((o) => (typeof o === 'string' ? o : o.label));
  if (texts.length < 3 || new Set(texts).size !== texts.length) out.push('options');
  if (q.answer < 0 || q.answer >= texts.length) out.push('answer index');
  if (q.optionLabels && q.optionLabels.length !== texts.length) out.push('labels');
  if (q.kind === 'bai-toan') return out;
  const truth = truthOf(q);
  if (!truth) return [...out, 'visual'];
  if (q.kind === 'phan-so-cua-mot-so') {
    const values = texts.map((s) => Number(s));
    if (values[q.answer] * truth.d !== truth.n) out.push('wrong answer');
    if (values.filter((x) => x * truth.d === truth.n).length !== 1) out.push('twin');
    return out;
  }
  const fracs = q.options.map(fracOf);
  if (fracs.some((x) => !x || x.n < 1 || x.d < 1)) return [...out, 'fractions'];
  const right = /** @type {Frac} */ (fracs[q.answer]);
  if (!same(right, truth)) out.push('wrong answer');
  if (gcd(right.n, right.d) !== 1) out.push('not lowest');
  if (fracs.filter((x) => same(/** @type {Frac} */ (x), truth)).length !== 1) out.push('twin');
  return out;
}

describe('the mixed multiplying and dividing practice round', () => {
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

  it('answers every story right, with one right option', () => {
    const [road, age, order, screws, banana, jar] = STORIES;
    expect(road.answer).toBe(45 - (45 * 2) / 3);
    expect(age.answer).toBe(72 / 8);
    expect(order.answer).toBe(1000 / 4);
    expect(screws.answer).toBe(800 / 4);
    expect(banana.answer).toBe(100 / 5);
    expect(jar.answer).toBe(15 - (8 * 3) / 4);
    const bad = STORIES.filter((s) =>
      /** @type {readonly number[]} */ (s.slips).includes(s.answer),
    );
    expect(bad).toEqual([]);
  });
});
