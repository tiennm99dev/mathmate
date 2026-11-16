import { describe, it, expect } from 'vitest';
import { asymptotes, graphPath, piText } from './graph.js';

const id = (/** @type {number} */ v) => v;

describe('graph drawing', () => {
  it('draws sin as one unbroken line', () => {
    const d = graphPath('sin', -360, 360, id, id);
    expect(d.match(/M/g)).toHaveLength(1);
    expect(d.startsWith('M -360.00 0.00')).toBe(true);
  });

  it('breaks tan at each asymptote', () => {
    const d = graphPath('tan', -180, 180, id, id);
    // Pieces: (−180; −90), (−90; 90), (90; 180).
    expect(d.match(/M/g)).toHaveLength(3);
  });

  it('lists the asymptotes', () => {
    expect(asymptotes('tan', -360, 360)).toEqual([-270, -90, 90, 270]);
    expect(asymptotes('cot', -360, 360)).toEqual([-360, -180, 0, 180, 360]);
  });

  it('writes radians as multiples of π', () => {
    expect(piText(150)).toBe('5π/6');
    expect(piText(-180)).toBe('−π');
    expect(piText(0)).toBe('0');
    expect(piText(360)).toBe('2π');
    expect(piText(-45)).toBe('−π/4');
  });
});
