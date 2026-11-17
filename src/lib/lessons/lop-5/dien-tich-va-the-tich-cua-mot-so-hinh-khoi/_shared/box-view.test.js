import { describe, expect, it } from 'vitest';
import { boxLayout, rulerOn, tickStep } from './box-view.js';

describe('box drawn to scale', () => {
  it('keeps the box inside its frame', () => {
    const sizes = [
      [20, 8, 4],
      [60, 30, 40],
      [1, 1, 1],
      [30, 3, 2],
    ];
    const bad = sizes.filter(([a, b, c]) => {
      const v = boxLayout(a, b, c);
      const pts = v.faces.flatMap((f) => f.pts);
      return pts.some(
        (p) => p.x < 39.99 || p.y < 39.99 || p.x > v.width - 39.99 || p.y > v.height - 39.99,
      );
    });
    expect(bad).toEqual([]);
  });

  it('lays a ruler as long as its edge when it measures the edge', () => {
    const v = boxLayout(8, 6, 4);
    const bad = /** @type {const} */ (['length', 'width', 'height']).filter((name) => {
      const edge = v.edges[name];
      const r = rulerOn(edge, edge.size, 1);
      const along = Math.hypot(r.end.x - r.start.x, r.end.y - r.start.y);
      const want = Math.hypot(edge.step.x, edge.step.y) * edge.size;
      return Math.abs(along - want) > 1e-9 || r.ticks.length !== edge.size + 1;
    });
    expect(bad).toEqual([]);
  });

  it('spaces the ticks by the size of the ruler', () => {
    expect([8, 30, 80].map(tickStep)).toEqual([1, 5, 10]);
  });
});
