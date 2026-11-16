import { describe, expect, it } from 'vitest';
import {
  BINS,
  FAR,
  inView,
  layMessage,
  layOf,
  meetPoint,
  meetsGoal,
  snapPoint,
  sortCards,
} from './engine.js';

const A = { x: 60, y: 80 };
const B = { x: 340, y: 80 };

describe('two lines through grid points', () => {
  it('snaps to the grid inside the board', () => {
    expect(snapPoint({ x: 3, y: 155 })).toEqual({ x: 20, y: 160 });
    expect(snapPoint({ x: 399, y: 300 })).toEqual({ x: 380, y: 280 });
  });

  it('tells parallel, perpendicular, crossing and the same line apart', () => {
    expect(layOf(A, B, { x: 40, y: 200 }, { x: 360, y: 200 })).toBe('song-song');
    expect(layOf(A, B, { x: 200, y: 40 }, { x: 200, y: 260 })).toBe('vuong-goc');
    expect(layOf(A, B, { x: 40, y: 200 }, { x: 360, y: 180 })).toBe('cat');
    expect(layOf(A, B, { x: 20, y: 80 }, { x: 100, y: 80 })).toBe('trung');
    expect(layOf(A, B, { x: 20, y: 80 }, { x: 20, y: 80 })).toBe('diem');
    expect(layOf({ x: 20, y: 20 }, { x: 60, y: 40 }, { x: 100, y: 200 }, { x: 180, y: 240 })).toBe(
      'song-song',
    );
  });

  it('finds where the lines meet, near or far', () => {
    expect(meetPoint(A, B, { x: 200, y: 40 }, { x: 200, y: 260 })).toEqual({ x: 200, y: 80 });
    const far = meetPoint(A, B, { x: 40, y: 200 }, { x: 360, y: 180 });
    expect(far).toEqual({ x: 1960, y: 80 });
    expect(inView(/** @type {{x:number,y:number}} */ (far), 1)).toBe(false);
    expect(inView(/** @type {{x:number,y:number}} */ (far), 1 / FAR)).toBe(false);
    expect(meetPoint(A, B, { x: 40, y: 200 }, { x: 360, y: 200 })).toBeNull();
  });

  it('speaks about the lay', () => {
    expect(layMessage(A, B, { x: 40, y: 200 }, { x: 360, y: 200 }, false).tone).toBe('ok');
    expect(layMessage(A, B, { x: 200, y: 40 }, { x: 200, y: 260 }, false).text).toContain(
      'vuông góc',
    );
    const near = layMessage(A, B, { x: 40, y: 200 }, { x: 360, y: 160 }, false).text;
    expect(near).toContain('Nhìn ra xa');
    expect(layMessage(A, B, { x: 40, y: 200 }, { x: 360, y: 160 }, true).text).toContain(
      'cắt nhau tại',
    );
    expect(layMessage(A, B, { x: 40, y: 200 }, { x: 360, y: 180 }, true).text).toContain('rất xa');
  });

  it('counts a right angle as crossing', () => {
    expect([
      meetsGoal('vuong-goc', 'cat'),
      meetsGoal('cat', 'vuong-goc'),
      meetsGoal('trung', 'song-song'),
    ]).toEqual([true, false, false]);
  });
});

describe('line pair cards', () => {
  it('fill every bin with distinct cards', () => {
    const cards = sortCards();
    expect(new Set(cards.map((c) => c.bin))).toEqual(new Set(BINS.map((b) => b.id)));
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
  });
});
