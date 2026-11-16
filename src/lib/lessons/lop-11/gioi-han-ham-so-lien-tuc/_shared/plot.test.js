import { describe, it, expect } from 'vitest';
import {
  ZOOM_STEPS,
  approach,
  frameOf,
  graphPath,
  ticksIn,
  valueCell,
  zoomAround,
} from './plot.js';

const win = { xMin: -2, xMax: 2, yMin: -3, yMax: 3 };

describe('frame and ticks', () => {
  it('maps the window corners to the box', () => {
    const fr = frameOf(win);
    expect(fr.sx(-2)).toBe(fr.left);
    expect(fr.sx(2)).toBe(fr.right);
    expect(fr.sy(-3)).toBe(fr.bottom);
    expect(fr.sy(3)).toBe(fr.top);
  });

  it('picks round ticks, also for a tiny window', () => {
    expect(ticksIn(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
    expect(ticksIn(0.998, 1.002, 4)).toEqual([0.998, 0.999, 1, 1.001, 1.002]);
  });
});

describe('graph path', () => {
  const fr = frameOf(win);
  it('lifts the pen at a break', () => {
    const d = graphPath((x) => (x < 0 ? -1 : 1), win, fr, { breaks: [0] });
    expect(d.match(/M/g)?.length).toBe(2);
  });

  it('lifts the pen where f is undefined or far off', () => {
    const d = graphPath((x) => 1 / x, win, fr);
    expect(d.match(/M/g)?.length).toBe(2);
  });

  it('draws one stroke for a continuous function, up to `to`', () => {
    const d = graphPath((x) => x, win, fr, { to: 0 });
    expect(d.match(/M/g)?.length).toBe(1);
    expect(d.endsWith(`${fr.sx(0).toFixed(2)} ${fr.sy(0).toFixed(2)}`)).toBe(true);
  });
});

describe('approaching a point', () => {
  it('tabulates both sides', () => {
    const rows = approach((x) => (x * x - 1) / (x - 1), 1, [0.1, 0.01]);
    expect(rows.map((r) => [valueCell(r.left), valueCell(r.right)])).toEqual([
      ['1,9', '2,1'],
      ['1,99', '2,01'],
    ]);
    expect(valueCell(null)).toBe('không xác định');
  });

  it('zooms to a window holding both sides', () => {
    const bad = [];
    const f = (/** @type {number} */ x) => (Math.sqrt(1 + x) - 1) / x;
    for (const h of ZOOM_STEPS) {
      const w = zoomAround(f, 0, h);
      for (const x of [-h, h]) if (!(f(x) > w.yMin && f(x) < w.yMax)) bad.push(h);
    }
    expect(bad).toEqual([]);
  });
});
