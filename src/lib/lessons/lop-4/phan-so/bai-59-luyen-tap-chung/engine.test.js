import { describe, expect, it } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import { KIND_LABELS, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/** @param {unknown} o */
const fracsOf = (o) =>
  /** @type {Array<{ n: number, d: number }>} */ (
    typeof o === 'object' && o !== null && 'fracs' in o ? o.fracs : []
  );

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {number} d
 */
const sign = (a, b, c, d) => (a * d === c * b ? '=' : a * d > c * b ? '>' : '<');

/** @param {Question} q */
function isRight(q) {
  const said = q.options[q.answer];
  const f = fracsOf(said);
  const v = q.visual;
  if (q.kind === 'hinh' && v?.type === 'shape') {
    return f[0].n === v.filled && f[0].d === v.parts;
  }
  if (q.kind === 'thuong') {
    const [, a, b] = /Chia đều (\d+) cái bánh cho (\d+) bạn/.exec(q.prompt) ?? [];
    return f[0].n === Number(a) && f[0].d === Number(b);
  }
  if (v?.type !== 'line' && v?.type !== 'people') return false;
  if (q.kind === 'bang-nhau' && v.type === 'line') {
    const [from, , to] = /** @type {Array<{ n: number, d: number }>} */ (v.items);
    return Number(said) * from.d === from.n * to.d && to.d % from.d === 0;
  }
  if (q.kind === 'rut-gon' && v.type === 'line') {
    const from = /** @type {{ n: number, d: number }} */ (v.items[0]);
    const others = q.options.filter((_, i) => i !== q.answer).map((o) => fracsOf(o)[0]);
    const simplestEqual = (/** @type {{ n: number, d: number }} */ g) =>
      gcd(g.n, g.d) === 1 && g.n * from.d === from.n * g.d;
    return simplestEqual(f[0]) && !others.some(simplestEqual) && from.n !== f[0].n;
  }
  if (q.kind === 'quy-dong' && v.type === 'line') {
    const [a, , b] = /** @type {Array<{ n: number, d: number }>} */ (v.items);
    const [x, y] = f;
    return (
      x.d === y.d &&
      x.d === Math.max(a.d, b.d) &&
      x.n * a.d === a.n * x.d &&
      y.n * b.d === b.n * y.d &&
      q.options.filter((o) => {
        const [p, r] = fracsOf(o);
        return p.d === r.d && p.n * a.d === a.n * p.d && r.n * b.d === b.n * r.d;
      }).length === 1
    );
  }
  if (['cung-mau', 'voi-1', 'khac-mau'].includes(q.kind ?? '') && v.type === 'line') {
    const [l, , r] = v.items;
    const left = /** @type {{ n: number, d: number }} */ (l);
    const right = r === '1' ? { n: 1, d: 1 } : /** @type {{ n: number, d: number }} */ (r);
    if (q.kind === 'cung-mau' && left.d !== right.d) return false;
    if (
      q.kind === 'khac-mau' &&
      (left.d === right.d || Math.max(left.d, right.d) % Math.min(left.d, right.d) !== 0)
    )
      return false;
    return said === sign(left.n, left.d, right.n, right.d);
  }
  if (q.kind === 'nhieu-nhat' && v.type === 'people') {
    const values = v.rows.map((r) => r.n / r.d);
    const want = q.prompt.includes('nhiều nhất') ? Math.max(...values) : Math.min(...values);
    return new Set(values).size === 3 && v.rows[values.indexOf(want)].name === said;
  }
  return false;
}

describe('the mixed fraction practice round', () => {
  it('asks one question of each part with distinct options', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push([seed, 'kinds']);
      for (const q of round) {
        const texts = q.options.map((o) => (typeof o === 'string' ? o : o.label));
        if (texts.length < 2 || new Set(texts).size !== texts.length)
          bad.push([seed, q.kind, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
        const fracs = q.options.flatMap(fracsOf);
        if (
          fracs.some((f) => !Number.isInteger(f.n) || !Number.isInteger(f.d) || f.n < 1 || f.d < 2)
        )
          bad.push([seed, q.kind, 'whole terms']);
        if (q.optionLabels && q.optionLabels.length !== texts.length)
          bad.push([seed, q.kind, 'labels']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the true answer to every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        if (!isRight(q)) bad.push([seed, q.kind, q.prompt, q.options[q.answer]]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('never gives a wrong option equal in value to the right one', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        if (q.kind !== 'hinh' && q.kind !== 'thuong') continue;
        const values = q.options.map((o) => {
          const [f] = fracsOf(o);
          return f.n / f.d;
        });
        if (values.filter((x) => x === values[q.answer]).length !== 1) bad.push([seed, q.kind]);
      }
    }
    expect(bad).toEqual([]);
  });
});
