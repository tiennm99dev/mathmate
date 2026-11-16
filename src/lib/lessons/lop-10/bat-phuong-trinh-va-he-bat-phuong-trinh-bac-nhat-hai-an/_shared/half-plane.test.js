import { describe, expect, it } from 'vitest';
import {
  checkText,
  conclusion,
  excludedPolygon,
  holds,
  ineqTex,
  ineqText,
  optimize,
  pointText,
  regionPolygon,
  testPoint,
} from './half-plane.js';

const BOX = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };

describe('linear inequalities in two unknowns', () => {
  it('writes an inequality the book way', () => {
    expect(ineqText({ a: 2, b: -1, c: 4, op: '<=' })).toBe('2x − y ≤ 4');
    expect(ineqTex({ a: 1, b: 2, c: -3, op: '>' })).toBe('x + 2y > -3');
  });

  it('tests points, strict and not strict on the border', () => {
    const q = /** @type {const} */ ({ a: 2, b: -1, c: 4, op: '<' });
    expect(holds(q, { x: 0, y: 0 })).toBe(true);
    expect(holds(q, { x: 2, y: 0 })).toBe(false);
    expect(holds({ ...q, op: '<=' }, { x: 2, y: 0 })).toBe(true);
    expect(checkText(q, { x: 3, y: 1 })).toBe('2 · 3 − 1 = 5 < 4 (sai)');
  });

  it('picks the test point of the book', () => {
    expect(testPoint({ a: 1, b: 1, c: 3, op: '<' })).toEqual({ x: 0, y: 0 });
    expect(testPoint({ a: 1, b: -2, c: 0, op: '<' })).toEqual({ x: 1, y: 0 });
    expect(testPoint({ a: 0, b: 1, c: 0, op: '>' })).toEqual({ x: 0, y: 1 });
  });

  it('states the conclusion with the border rule', () => {
    const q = /** @type {const} */ ({ a: 3, b: 1, c: 6, op: '<=' });
    expect(conclusion(q, { x: 0, y: 0 }, 'O')).toBe(
      'Miền nghiệm là nửa mặt phẳng bờ d chứa điểm O, kể cả đường thẳng d.',
    );
    expect(conclusion({ ...q, op: '>' }, { x: 0, y: 0 }, 'O')).toContain('không chứa điểm O');
  });

  it('cuts away the half-plane where the inequality fails', () => {
    const cut = excludedPolygon({ a: 1, b: 0, c: 2, op: '<=' }, BOX);
    expect(cut).toEqual([
      { x: 2, y: -6 },
      { x: 6, y: -6 },
      { x: 6, y: 6 },
      { x: 2, y: 6 },
    ]);
  });

  it('finds the polygon of a system and optimises on its vertices', () => {
    const system = /** @type {const} */ ([
      { a: 1, b: 0, c: 0, op: '>=' },
      { a: 0, b: 1, c: 0, op: '>=' },
      { a: 1, b: 1, c: 5, op: '<=' },
      { a: 1, b: 2, c: 8, op: '<=' },
    ]);
    const poly = regionPolygon([...system], { xMin: -1, xMax: 9, yMin: -1, yMax: 9 });
    expect(poly.map(pointText).sort()).toEqual(['(0; 0)', '(0; 4)', '(2; 3)', '(5; 0)']);
    const best = optimize(poly, 3, 4);
    expect(best.max).toBe(18);
    expect(pointText(poly[best.argMax[0]])).toBe('(2; 3)');
    expect(best.min).toBe(0);
  });

  it('reports an empty region and tied vertices', () => {
    const none = regionPolygon(
      [
        { a: 1, b: 1, c: 1, op: '<=' },
        { a: 1, b: 1, c: 3, op: '>=' },
      ],
      BOX,
    );
    expect(none).toEqual([]);
    const tie = optimize(
      [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 4 },
      ],
      1,
      1,
    );
    expect(tie.argMax).toEqual([1, 2]);
  });
});
