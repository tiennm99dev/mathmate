import { describe, it, expect } from 'vitest';
import { frameOf, graphPath, tickText, ticksIn } from './plot.js';

const win = { xMin: -2, xMax: 2, yMin: -3, yMax: 3 };

describe('graph board drawing', () => {
  it('maps the window corners to the box and back', () => {
    const fr = frameOf(win);
    expect([fr.sx(-2), fr.sx(2), fr.sy(-3), fr.sy(3)]).toEqual([
      fr.left,
      fr.right,
      fr.bottom,
      fr.top,
    ]);
    expect(fr.ix(fr.sx(1.25))).toBeCloseTo(1.25, 12);
  });

  it('picks round ticks written with a decimal comma', () => {
    expect(ticksIn(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    expect(tickText(-0.5)).toBe('−0,5');
  });

  it('lifts the pen at an asymptote and draws a polynomial in one stroke', () => {
    const fr = frameOf(win);
    expect(graphPath((x) => 1 / x, win, fr, { breaks: [0] }).match(/M/g)?.length).toBe(2);
    expect(graphPath((x) => x * x - 1, win, fr).match(/M/g)?.length).toBe(1);
  });
});
