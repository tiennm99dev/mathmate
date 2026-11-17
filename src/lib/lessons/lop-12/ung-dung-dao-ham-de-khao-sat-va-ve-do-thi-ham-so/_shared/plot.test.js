import { describe, it, expect } from 'vitest';
import { approxTex, approxText, frameOf, graphPath, snapX, ticksIn } from './plot.js';

const win = { xMin: -2, xMax: 2, yMin: -3, yMax: 3 };

describe('frame and ticks', () => {
  it('maps the window corners to the box and back', () => {
    const fr = frameOf(win);
    expect(fr.sx(-2)).toBe(fr.left);
    expect(fr.sx(2)).toBe(fr.right);
    expect(fr.sy(-3)).toBe(fr.bottom);
    expect(fr.sy(3)).toBe(fr.top);
    expect(fr.ix(fr.sx(1.25))).toBeCloseTo(1.25, 12);
  });

  it('picks round ticks', () => {
    expect(ticksIn(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
  });
});

describe('graph path', () => {
  const fr = frameOf(win);
  it('lifts the pen at an asymptote', () => {
    const d = graphPath((x) => 1 / x, win, fr, { breaks: [0] });
    expect(d.match(/M/g)?.length).toBe(2);
  });

  it('draws one stroke for a polynomial between from and to', () => {
    const d = graphPath((x) => x * x - 1, win, fr, { from: -1, to: 1 });
    expect(d.match(/M/g)?.length).toBe(1);
    expect(d.startsWith(`M ${fr.sx(-1).toFixed(2)}`)).toBe(true);
  });
});

describe('snapping and approximate values', () => {
  it('snaps to the grid, to special values and to the ends', () => {
    const opts = { lo: -2, hi: 2, step: 0.1, snaps: [2 / 3] };
    expect(snapX(0.34, opts)).toBe(0.3);
    expect(snapX(0.68, opts)).toBe(2 / 3);
    expect(snapX(5, opts)).toBe(2);
  });

  it('marks rounded values with ≈', () => {
    expect(approxText(2.5)).toBe('2,5');
    expect(approxText(1 / 3)).toBe('≈ 0,33');
    expect(approxText(-4)).toBe('−4');
    expect(approxTex(1 / 3)).toBe('\\approx 0{,}33');
    expect(approxTex(-1.5)).toBe('= -1{,}5');
  });
});
