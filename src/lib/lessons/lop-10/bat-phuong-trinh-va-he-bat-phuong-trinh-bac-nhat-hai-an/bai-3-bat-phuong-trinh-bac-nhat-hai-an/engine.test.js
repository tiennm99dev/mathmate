import { describe, expect, it } from 'vitest';
import { decides, record, verdict } from './engine.js';

const Q = /** @type {const} */ ({ a: 2, b: -1, c: 4, op: '<' });

describe('half-plane widget', () => {
  it('records tests and replaces a repeated point', () => {
    let tried = record([], Q, { x: 0, y: 0 });
    tried = record(tried, Q, { x: 4, y: 0 });
    tried = record(tried, Q, { x: 0, y: 0 });
    expect(tried).toEqual([
      { x: 4, y: 0, ok: false },
      { x: 0, y: 0, ok: true },
    ]);
  });

  it('decides only from points off the border line', () => {
    expect(decides(Q, { x: 2, y: 0 })).toBe(false);
    expect(decides(Q, { x: 0, y: 0 })).toBe(true);
    expect(verdict(Q, { x: 2, y: 0 }).tone).toBe('warn');
  });

  it('gives the book conclusion', () => {
    expect(verdict(Q, { x: 0, y: 0 }).text).toBe(
      'Thay M(0; 0): 2 · 0 − 0 = 0 < 4 (đúng). Miền nghiệm là nửa mặt phẳng bờ d chứa điểm M, không kể đường thẳng d.',
    );
    expect(verdict({ ...Q, op: '>=' }, { x: 0, y: 0 }).text).toContain(
      'không chứa điểm M, kể cả đường thẳng d',
    );
    expect(verdict({ a: 0, b: 0, c: 1, op: '<' }, { x: 0, y: 0 }).tone).toBe('warn');
  });
});
