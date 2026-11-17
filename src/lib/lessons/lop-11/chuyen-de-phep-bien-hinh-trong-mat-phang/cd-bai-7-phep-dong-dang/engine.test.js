import { describe, expect, it } from 'vitest';
import { chainRatio, lands } from '../_shared/moves.js';
import { PUZZLES, START, targetRatio } from './engine.js';

/** @typedef {import('../_shared/moves.js').Move} Move */

/** A chain that solves each puzzle, in order. @type {Move[][]} */
const ANSWERS = [
  [{ kind: 'hom', k: 0.5 }],
  [
    { kind: 'hom', k: 0.5 },
    { kind: 't', u: { x: -5, y: -4 } },
  ],
  [{ kind: 'hom', k: -0.5 }],
  [
    { kind: 'axis', axis: 'Ox' },
    { kind: 'hom', k: 0.5 },
    { kind: 't', u: { x: 3, y: 0 } },
  ],
  [
    { kind: 'rot', deg: 90 },
    { kind: 'hom', k: 0.5 },
    { kind: 't', u: { x: -3, y: 2 } },
  ],
  [
    { kind: 't', u: { x: -4, y: -3 } },
    { kind: 'hom', k: 2 },
  ],
];

describe('similarity puzzles', () => {
  it('can solve every puzzle with the chain its hint suggests', () => {
    const misses = PUZZLES.filter((p, i) => !lands(START, ANSWERS[i], p.target));
    expect(misses).toEqual([]);
  });

  it('gives each target the ratio of its solving chain', () => {
    expect(PUZZLES.map((p) => targetRatio(p.target))).toEqual(ANSWERS.map(chainRatio));
  });

  it('does not count the start triangle as solved', () => {
    expect(PUZZLES.filter((p) => lands(START, [], p.target))).toEqual([]);
  });
});
