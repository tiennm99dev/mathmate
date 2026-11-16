import { describe, expect, it } from 'vitest';
import { ROUNDS, evaluate, pickValue, pickWay, valueOptions } from './engine.js';

describe('the fastest-way game', () => {
  it('stores the right value for every round', () => {
    const wrong = ROUNDS.filter((r) => evaluate(r.expr) !== r.value).map((r) => r.expr);
    expect(wrong).toEqual([]);
  });

  it('has exactly one fast way and three different values per round', () => {
    const bad = ROUNDS.filter(
      (r) => r.ways.filter((w) => w.fast).length !== 1 || new Set(valueOptions(r)).size !== 3,
    ).map((r) => r.expr);
    expect(bad).toEqual([]);
  });

  it('accepts the fast way and explains the others', () => {
    const round = ROUNDS[0];
    const fast = round.ways.findIndex((w) => w.fast);
    expect(pickWay(round, fast).ok).toBe(true);
    const slow = pickWay(round, (fast + 1) % 3);
    expect(slow.ok).toBe(false);
    expect(slow.text).toMatch(/Em thử cách khác/);
  });

  it('checks the value', () => {
    expect(pickValue(ROUNDS[0], 9900).ok).toBe(true);
    expect(pickValue(ROUNDS[0], 990).ok).toBe(false);
  });
});
