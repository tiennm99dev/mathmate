import { describe, expect, it } from 'vitest';
import { OPS, PAIRS, SORT_BINS, SORT_CARDS, sentenceOf, tableOf, truthOf } from './engine.js';

describe('compound propositions', () => {
  it('follows the book: P ⇒ Q is false only when P is true and Q false', () => {
    expect([
      truthOf('imp', true, true),
      truthOf('imp', true, false),
      truthOf('imp', false, true),
      truthOf('imp', false, false),
    ]).toEqual([true, false, true, true]);
    expect([
      truthOf('equiv', true, true),
      truthOf('equiv', true, false),
      truthOf('equiv', false, false),
    ]).toEqual([true, false, true]);
    expect(truthOf('conv', false, true)).toBe(false);
    expect(truthOf('notP', true, true)).toBe(false);
  });

  it('marks exactly one current row whose cells match the pair', () => {
    const bad = [];
    for (const pair of PAIRS)
      for (const { value } of OPS) {
        const t = tableOf(value, pair);
        const cur = t.rows.filter((r) => r.current);
        if (cur.length !== 1) bad.push(`${pair.id} ${value}`);
        const last = cur[0]?.cells.at(-1);
        if (last !== (truthOf(value, pair.pTrue, pair.qTrue) ? 'Đ' : 'S'))
          bad.push(`${pair.id} ${value} value`);
      }
    expect(bad).toEqual([]);
  });

  it('covers every truth combination of P and Q', () => {
    const combos = new Set(PAIRS.map((p) => `${p.pTrue}${p.qTrue}`));
    expect(combos.size).toBe(4);
  });

  it('writes the sentences the book way', () => {
    expect(sentenceOf(PAIRS[0], 'imp')).toBe('Nếu $2$ là số nguyên tố thì $2$ là số lẻ.');
    expect(sentenceOf(PAIRS[0], 'equiv')).toContain('khi và chỉ khi');
  });

  it('sorts every card into an existing bin', () => {
    const bins = new Set(SORT_BINS.map((b) => b.id));
    expect(SORT_CARDS.filter((c) => !bins.has(c.bin))).toEqual([]);
  });
});
