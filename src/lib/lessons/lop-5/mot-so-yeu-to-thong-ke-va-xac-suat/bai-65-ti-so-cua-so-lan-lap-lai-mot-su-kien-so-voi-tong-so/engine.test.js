import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import {
  EXPERIMENTS,
  MAX_TRIALS,
  SOCKS,
  drawTwo,
  ratioMessage,
  rowText,
  runTrials,
} from './engine.js';

const byId = (/** @type {string} */ id) => {
  const exp = EXPERIMENTS.find((e) => e.id === id);
  if (!exp) throw new Error(id);
  return exp;
};

describe('the experiments', () => {
  it('counts every trial once and stops at the table size', () => {
    const bad = [];
    for (const exp of EXPERIMENTS) {
      const zero = exp.outcomes.map(() => 0);
      const a = runTrials(exp, zero, 30, rng(5));
      if (a.counts.reduce((s, c) => s + c, 0) !== 30) bad.push([exp.id, 'count']);
      const b = runTrials(exp, a.counts, 5000, rng(6));
      if (b.counts.reduce((s, c) => s + c, 0) !== MAX_TRIALS) bad.push([exp.id, 'max']);
      if (runTrials(exp, b.counts, 1, rng(7)).last !== null) bad.push([exp.id, 'full']);
    }
    expect(bad).toEqual([]);
  });

  it('draws two different socks, the same colour one time in three', () => {
    const rand = rng(11);
    let same = 0;
    const bad = [];
    for (let k = 0; k < 3000; k++) {
      const [a, b] = drawTwo(rand);
      if (a === b || a < 0 || b < 0 || a > 3 || b > 3) bad.push([a, b]);
      if (SOCKS[a] === SOCKS[b]) same += 1;
    }
    expect(bad).toEqual([]);
    expect(Math.abs(same / 3000 - 1 / 3)).toBeLessThan(0.04);
  });

  it('gives the right outcome for each face', () => {
    const dice = byId('chan-le');
    const bad = [];
    const rand = rng(3);
    for (let k = 0; k < 200; k++) {
      const t = dice.trial(rand);
      if ((t.face[0] % 2 === 0 ? 0 : 1) !== t.outcome || t.face[0] < 1 || t.face[0] > 6)
        bad.push(t);
    }
    const wheel = byId('vong-quay');
    for (let k = 0; k < 200; k++) {
      const t = wheel.trial(rand);
      const want = t.face[0] < 180 ? 0 : t.face[0] < 270 ? 1 : 2;
      if (want !== t.outcome) bad.push(t);
    }
    expect(bad).toEqual([]);
  });
});

describe('the sentences', () => {
  it('writes the ratio unsimplified, as the book does', () => {
    const coin = byId('dong-xu');
    expect(ratioMessage(coin, [0, 0], null)).toContain('tung lần đầu tiên');
    expect(ratioMessage(coin, [9, 11], 0)).toBe(
      'Lần 20: xuất hiện mặt sấp. Tỉ số của số lần xuất hiện mặt sấp so với tổng số lần tung là 9/20.',
    );
    expect(ratioMessage(byId('lay-tat'), [9, 5], 1)).toContain('là 5/14');
    expect(rowText(8, 30)).toBe('8 lần trong 30 lần, tỉ số 8/30');
  });
});
