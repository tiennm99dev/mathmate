import { describe, expect, it } from 'vitest';
import {
  BINS,
  MAX,
  MIN,
  clampTurn,
  fourAngles,
  sortCards,
  squareMessage,
  turnMessage,
} from './engine.js';

describe('turning line CD', () => {
  it('keeps the angle on whole steps within the board', () => {
    expect([clampTurn(3), clampTurn(88), clampTurn(92.6), clampTurn(179)]).toEqual([
      MIN,
      90,
      95,
      MAX,
    ]);
  });

  it('makes four angles that add up to a full turn', () => {
    expect(fourAngles(60)).toEqual([60, 120, 60, 120]);
    expect(fourAngles(90)).toEqual([90, 90, 90, 90]);
  });

  it('says perpendicular only at a right angle', () => {
    const bad = [];
    for (let m = MIN; m <= MAX; m += 5) if (turnMessage(m).done !== (m === 90)) bad.push(m);
    expect(bad).toEqual([]);
    expect(turnMessage(90).text).toContain('4 góc vuông');
    expect(turnMessage(40).text).toContain('ra xa');
    expect(turnMessage(140).text).toContain('lại gần');
  });

  it('reads the set square', () => {
    expect(squareMessage(90)).toContain('trùng');
    expect(squareMessage(50)).toContain('trong');
    expect(squareMessage(130)).toContain('ngoài');
  });
});

describe('line pair cards', () => {
  it('fill both bins with distinct cards', () => {
    const cards = sortCards();
    expect(new Set(cards.map((c) => c.bin))).toEqual(new Set(BINS.map((b) => b.id)));
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
    expect(cards.filter((c) => c.bin === 'vuong').length).toBe(4);
  });
});
