import { describe, expect, it } from 'vitest';
import { BOX, noteFor, rayAt, readout, reflectionAngles, yLimit } from './engine.js';

describe('parabola mirror', () => {
  it('reflects each ray through the focus with equal angles', () => {
    const bad = [];
    for (let p = 1; p <= 4; p += 1)
      for (let y = -yLimit(p); y <= yLimit(p); y += 0.25) {
        const r = rayAt(p, y);
        const toF = { x: p / 2 - r.M.x, y: -r.M.y };
        if (Math.abs(r.dir.x * toF.y - r.dir.y * toF.x) > 1e-9) bad.push(['line', p, y]);
        const [alpha, beta] = reflectionAngles(p, y);
        if (Math.abs(alpha - beta) > 1e-6) bad.push(['angle', p, y]);
        if (r.M.x > BOX.xMax) bad.push(['board', p, y]);
      }
    expect(bad).toEqual([]);
  });

  it('keeps the drag range on the board', () => {
    expect(yLimit(1)).toBe(4.5);
    expect(yLimit(4)).toBe(6.5);
  });

  it('reads the focal radius at M', () => {
    const lines = readout(2, 4);
    expect(lines[0]).toBe('$y^2 = 4x$, $F\\left(1; 0\\right)$, $\\Delta: x = -1$');
    expect(lines[1]).toBe('$M\\left(4; 4\\right)$, $MF = x + \\dfrac{p}{2} = 5 = d(M, \\Delta)$');
    expect(lines[2]).toMatch(/tia tới \$(.+)\^\\circ\$, tia phản xạ \$\1\^\\circ\$/);
    expect(readout(3, 0)[0]).toContain('\\dfrac{3}{2}');
  });

  it('explains both directions of light', () => {
    expect(noteFor('anten', 2, 4)).toContain('hội tụ');
    expect(noteFor('den-pha', 2, 4)).toContain('song song');
  });
});
