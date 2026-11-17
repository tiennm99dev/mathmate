import { describe, expect, it } from 'vitest';
import { applyChain, chainRatio, chainTex, lands, moveTex, moveText } from './moves.js';

/** @typedef {import('./moves.js').Move} Move */
const tri = [
  { x: 2, y: 2 },
  { x: 6, y: 2 },
  { x: 2, y: 4 },
];

describe('chains of transformations', () => {
  it('applies the moves in order', () => {
    /** @type {Move[]} */
    const chain = [
      { kind: 'hom', k: 0.5 },
      { kind: 't', u: { x: -5, y: -4 } },
    ];
    expect(applyChain(tri, chain)).toEqual([
      { x: -4, y: -3 },
      { x: -2, y: -3 },
      { x: -4, y: -2 },
    ]);
    expect(lands(tri, [{ kind: 'half' }], applyChain(tri, [{ kind: 'hom', k: -1 }]))).toBe(true);
  });

  it('multiplies the ratios of the homotheties only', () => {
    expect(
      chainRatio([
        { kind: 'hom', k: -2 },
        { kind: 'rot', deg: 90 },
        { kind: 'hom', k: 0.5 },
      ]),
    ).toBe(1);
    expect(
      chainRatio([
        { kind: 'hom', k: -0.5 },
        { kind: 'axis', axis: 'Ox' },
      ]),
    ).toBe(0.5);
  });

  it('writes each move the book way', () => {
    expect(moveTex({ kind: 'hom', k: -0.5 })).toBe('V_{(O,\\ -\\frac{1}{2})}');
    expect(moveTex({ kind: 'axis', axis: 'y=x' })).toBe('\\text{Đ}_d\\ (d: y = x)');
    expect(moveText({ kind: 'rot', deg: -90 })).toBe('Quay \u221290° quanh O');
    expect(chainTex([{ kind: 'half' }, { kind: 'rot', deg: 90 }])).toBe(
      '\\text{Đ}_O \\;\\to\\; Q_{(O,\\ 90^\\circ)}',
    );
  });
});
