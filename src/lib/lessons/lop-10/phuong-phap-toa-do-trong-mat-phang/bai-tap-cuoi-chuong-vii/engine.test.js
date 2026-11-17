import { describe, expect, it } from 'vitest';
import { latticeOnCircle } from '../_shared/coords.js';
import { BOX, KINDS, builtText, isBuilt, makeRound, onBoard } from './engine.js';

/** Every grid point of the board. @type {{ x: number, y: number }[]} */
const GRID = [];
for (let x = BOX.xMin; x <= BOX.xMax; x++) {
  for (let y = BOX.yMin; y <= BOX.yMax; y++) GRID.push({ x, y });
}

/**
 * Two grid points that build the round, or null.
 * @param {import('./engine.js').Round} round
 */
function solve(round) {
  if (round.kind === 'circle') {
    const R = latticeOnCircle(round.I, round.r2).find(onBoard);
    return R ? [round.I, R] : null;
  }
  const t = round.target;
  const on = GRID.filter((p) => t.a * p.x + t.b * p.y + t.c === 0);
  return on.length >= 2 ? [on[0], on[1]] : null;
}

describe('the construction rounds', () => {
  it('can always be built exactly on the board', () => {
    const unsolved = [];
    for (let seed = 0; seed < 210; seed++) {
      const round = makeRound(seed);
      const s = solve(round);
      if (!s || !isBuilt(round, s[0], s[1])) unsolved.push(seed);
    }
    expect(unsolved).toEqual([]);
  });

  it('takes the kinds in turn and is the same for a seed', () => {
    expect(makeRound(3)).toEqual(makeRound(3));
    const kinds = Array.from({ length: KINDS }, (_, i) => makeRound(i).prompt.slice(0, 20));
    expect(new Set(kinds).size).toBeGreaterThan(3);
  });

  it('keeps the given point off the given line', () => {
    const bad = [];
    for (let seed = 2; seed < 210; seed += KINDS) {
      for (const s of [seed, seed + 1]) {
        const r = makeRound(s);
        if (r.kind !== 'line' || !r.given.line || !r.given.point) continue;
        const { line, point } = r.given;
        if (line.a * point.x + line.b * point.y + line.c === 0) bad.push(s);
      }
    }
    expect(bad).toEqual([]);
  });

  it('checks and describes what was built', () => {
    const circle = makeRound(5);
    if (circle.kind !== 'circle') throw new Error('round 5 is a circle');
    const R = latticeOnCircle(circle.I, circle.r2)[0];
    expect(isBuilt(circle, circle.I, R)).toBe(true);
    expect(isBuilt(circle, R, circle.I)).toBe(false);
    expect(builtText(circle, { x: 0, y: 0 }, { x: 3, y: 4 })).toContain('x^2 + y^2 = 25');
    expect(builtText(circle, { x: 1, y: 1 }, { x: 1, y: 1 })).toContain('trùng nhau');
  });
});
