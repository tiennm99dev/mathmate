import { describe, it, expect } from 'vitest';
import { ZOOM_STEPS, approach, valueCell, zoomAround } from './approach.js';

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
