import { describe, expect, it } from 'vitest';
import {
  clipLine,
  lineAngle,
  paramsOf,
  pointAt,
  relationOf,
  setSquare,
  slideWay,
  snapSlide,
} from './lines.js';

/** @param {{ x: number, y: number }} p */
const round = (p) => ({ x: Math.round(p.x), y: Math.round(p.y) });

describe('lines on a board', () => {
  it('clips a line to the board', () => {
    expect(clipLine({ x: 50, y: 40 }, 0, 400, 300)?.map(round)).toEqual([
      { x: 0, y: 40 },
      { x: 400, y: 40 },
    ]);
    expect(clipLine({ x: 50, y: 40 }, 90, 400, 300, 5)?.map(round)).toEqual([
      { x: 50, y: 295 },
      { x: 50, y: 5 },
    ]);
    expect(clipLine({ x: 0, y: 0 }, 45, 100, 100)?.map(round)).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ]);
    expect(clipLine({ x: -10, y: 50 }, 90, 100, 100)).toBeNull();
  });

  it('measures the angle between two lines', () => {
    expect([lineAngle(0, 90), lineAngle(20, 200), lineAngle(10, 150), lineAngle(350, 80)]).toEqual([
      90, 0, 40, 90,
    ]);
    expect([relationOf(0, 90), relationOf(30, 210), relationOf(30, 100)]).toEqual([
      'vuong-goc',
      'song-song',
      'cat',
    ]);
  });
});

describe('the sliding set square', () => {
  const base = { o: { x: 50, y: 250 }, deg: 20 };

  it('finds a point again from its place along and across the base', () => {
    const p = pointAt(base, 120, -70);
    const back = paramsOf(base, p);
    expect([Math.round(back.s), Math.round(back.h)]).toEqual([120, -70]);
  });

  it('stands perpendicular to the base on the asked side', () => {
    const sq = setSquare(base, 60, -1);
    const back = paramsOf(base, sq.tip);
    expect([Math.round(back.s), Math.round(back.h)]).toEqual([60, -150]);
    expect(sq.legDeg).toBe(290);
    expect(lineAngle(sq.legDeg, base.deg)).toBe(90);
  });

  it('snaps and says which way to slide', () => {
    expect([
      snapSlide(43, 10, 0, 200),
      snapSlide(-30, 10, 0, 200),
      snapSlide(260, 10, 0, 200),
    ]).toEqual([40, 0, 200]);
    expect(slideWay(40, 120, ['A', 'B'])).toBe('về phía B');
    expect(slideWay(160, 120, ['A', 'B'])).toBe('về phía A');
    expect(slideWay(120, 120, ['A', 'B'])).toBe('');
  });
});
