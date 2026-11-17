import { describe, expect, it } from 'vitest';
import {
  FRIEND_COLORS,
  GOALS,
  MAX_CAKES,
  MAX_FRIENDS,
  MIN_CAKES,
  MIN_FRIENDS,
  cakeFills,
  shareFills,
  shareNote,
  versusOneText,
} from './engine.js';

describe('sharing cakes', () => {
  it('cuts every cake into one part per friend', () => {
    const fills = cakeFills(3, 4);
    expect(fills).toHaveLength(3);
    expect(fills[2]).toEqual(FRIEND_COLORS.slice(0, 4));
  });

  it('gathers one share into wholes', () => {
    const one = FRIEND_COLORS[0];
    expect(shareFills(3, 4)).toEqual([[one, one, one, null]]);
    expect(shareFills(5, 3)).toEqual([
      [one, one, one],
      [one, one, null],
    ]);
    expect(shareFills(6, 3).flat().filter(Boolean)).toHaveLength(6);
  });

  it('says how the share compares with one cake', () => {
    expect(versusOneText(3, 4)).toContain('< 1');
    expect(versusOneText(4, 4)).toContain('= 1');
    expect(versusOneText(5, 3)).toContain('> 1');
    expect(versusOneText(6, 3)).toContain('= 2$, mỗi bạn được 2 cái bánh');
  });

  it('writes the quotient as a fraction and spots the goal', () => {
    const note = shareNote(3, 4, [3, 4]);
    expect(note.tone).toBe('ok');
    expect(note.text).toContain('$3 : 4 = \\dfrac{3}{4}$');
    expect(shareNote(2, 4, [3, 4]).tone).toBe('info');
  });

  it('only sets goals the steppers can reach', () => {
    const bad = GOALS.filter(
      ([c, f]) => c < MIN_CAKES || c > MAX_CAKES || f < MIN_FRIENDS || f > MAX_FRIENDS,
    );
    expect(bad).toEqual([]);
    expect(FRIEND_COLORS.length).toBeGreaterThanOrEqual(MAX_FRIENDS);
  });
});
