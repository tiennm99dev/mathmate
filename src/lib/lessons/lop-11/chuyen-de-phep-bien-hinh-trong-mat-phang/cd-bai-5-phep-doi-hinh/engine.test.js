import { describe, expect, it } from 'vitest';
import { PUZZLES, START, applyChain, chainTex, sideTexts, solved } from './engine.js';

/** @typedef {import('./engine.js').Step} Step */

/** A chain that solves each puzzle, in order. @type {Step[][]} */
const ANSWERS = [
  [{ kind: 't', u: { x: -5, y: -5 } }],
  [{ kind: 'oy' }, { kind: 't', u: { x: 0, y: -4 } }],
  [{ kind: 'q90' }, { kind: 't', u: { x: 1, y: -5 } }],
  [{ kind: 'do' }, { kind: 't', u: { x: 2, y: 0 } }],
  [{ kind: 'ox' }, { kind: 'q90' }],
];

describe('overlay puzzles', () => {
  it('can solve every puzzle with the chain its hint suggests', () => {
    const misses = PUZZLES.filter((p, i) => !solved(applyChain(START, ANSWERS[i]), p));
    expect(misses).toEqual([]);
  });

  it('does not count the start triangle as solved', () => {
    expect(PUZZLES.filter((p) => solved(START, p))).toEqual([]);
  });

  it('knows that two quarter turns make the half turn, and Ox then Oy too', () => {
    const tri = applyChain(START, [{ kind: 'q90' }, { kind: 'q90' }]);
    expect(tri).toEqual(applyChain(START, [{ kind: 'do' }]));
    expect(applyChain(START, [{ kind: 'ox' }, { kind: 'oy' }])).toEqual(tri);
  });

  it('keeps the side lengths along any chain', () => {
    const moved = applyChain(START, [
      { kind: 'q-90' },
      { kind: 'oy' },
      { kind: 't', u: { x: 3, y: -2 } },
    ]);
    expect(sideTexts(moved)).toEqual(sideTexts(START));
    expect(sideTexts(START)).toEqual(['3', '\\sqrt{13}', '2']);
  });

  it('writes the chain in the order it was done', () => {
    expect(chainTex([{ kind: 'ox' }, { kind: 't', u: { x: 2, y: 0 } }])).toBe(
      '\\text{Đ}_{Ox} \\;\\to\\; T_{\\vec u},\\ \\vec u = (2;\\ 0)',
    );
  });
});
