import { describe, expect, it } from 'vitest';
import { vertexOf } from '../_shared/quadratic.js';
import {
  A_VALUES,
  CHALLENGES,
  challengeFeedback,
  describe as say,
  flight,
  keyPoints,
} from './engine.js';

describe('parabola y = ax² + bx + c', () => {
  it('finds the key points', () => {
    const k = keyPoints(1, -4, 3);
    expect(k.s).toEqual({ x: 2, y: -1 });
    expect(k.yCut).toEqual({ x: 0, y: 3 });
    expect(k.mirror).toEqual({ x: 4, y: 3 });
    expect(k.roots).toEqual([
      { x: 1, y: 0 },
      { x: 3, y: 0 },
    ]);
    expect(keyPoints(1, 0, 1).roots).toEqual([]);
  });

  it('describes the shape and the variation', () => {
    const up = say(1, -4, 3);
    expect(up.shape).toContain('quay lên');
    expect(up.extreme).toContain('nhỏ nhất của hàm số là −1, đạt tại x = 2');
    expect(up.variation).toBe('Hàm số nghịch biến trên (−∞; 2) và đồng biến trên (2; +∞).');
    expect(say(-2, 4, 1).variation).toContain('đồng biến trên (−∞; 1)');
  });

  it('keeps every vertex of the sliders on the plane', () => {
    const off = [];
    for (const a of A_VALUES)
      for (let b = -3; b <= 3; b++)
        for (let c = -3; c <= 3; c++) {
          const s = vertexOf(a, b, c);
          if (Math.abs(s.x) > 6 || Math.abs(s.y) > 8) off.push([a, b, c]);
        }
    expect(off).toEqual([]);
  });

  it('every challenge is solved by its own coefficients only', () => {
    const bad = [];
    for (const g of CHALLENGES) {
      if (!challengeFeedback(g.a, g.b, g.c, g).done) bad.push(g);
      if (!A_VALUES.includes(g.a) || Math.abs(g.b) > 3 || Math.abs(g.c) > 3) bad.push(g);
      if (challengeFeedback(g.a, g.b, g.c + 1, g).done) bad.push(g);
    }
    expect(bad).toEqual([]);
    expect(challengeFeedback(1, 0, 0, CHALLENGES[0]).text).toContain('S(0; 0)');
  });
});

describe('thrown ball', () => {
  it('matches the book example h = −4,9t² + 12,2t + 1,2', () => {
    const f = flight(12.2, 1.2);
    expect(f.at(1)).toBe(8.5);
    expect(f.at(2)).toBe(6);
    expect(f.peakT).toBeCloseTo(1.244898, 5);
    expect(f.peakH).toBeCloseTo(8.794, 3);
    expect(f.at(f.land)).toBeCloseTo(0, 6);
  });
});
