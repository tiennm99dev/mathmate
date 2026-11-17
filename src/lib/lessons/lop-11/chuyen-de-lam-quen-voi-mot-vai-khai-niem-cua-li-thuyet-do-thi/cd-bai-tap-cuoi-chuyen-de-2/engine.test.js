import { describe, expect, it } from 'vitest';
import { eulerKind, isConnected, isSimple } from '../_shared/graph.js';
import {
  checkDistance,
  checkEuler,
  distanceSolution,
  eulerSolution,
  makeGraph,
  readable,
} from './engine.js';

describe('random graph practice', () => {
  it('draws connected, simple, readable graphs with every Euler answer', () => {
    const bad = [];
    const kinds = new Set();
    for (let seed = 1; seed <= 60; seed++) {
      const g = makeGraph(seed);
      if (!isConnected(g.n, g.edges) || !isSimple(g.edges) || !readable(g)) bad.push(seed);
      if (g.edges.some((e) => !e.w || e.w < 1 || e.w > 9)) bad.push(seed);
      kinds.add(eulerKind(g.n, g.edges));
    }
    expect(bad).toEqual([]);
    expect([...kinds].sort()).toEqual(['cycle', 'none', 'path']);
    expect(makeGraph(7)).toEqual(makeGraph(7));
  });

  it('checks the Euler question with a worked answer', () => {
    const g = {
      n: 5,
      edges: [
        { a: 0, b: 1, w: 1 },
        { a: 1, b: 2, w: 2 },
        { a: 2, b: 0, w: 4 },
        { a: 2, b: 3, w: 1 },
        { a: 3, b: 4, w: 1 },
        { a: 4, b: 2, w: 5 },
      ],
    };
    expect(checkEuler(g, 'cycle').ok).toBe(true);
    expect(checkEuler(g, 'path').text).toContain('Chưa đúng');
    expect(eulerSolution(g)).toContain('\\deg(C) = 4');
    const sol = distanceSolution(g);
    expect(sol.length).toBe(5);
    expect(sol.text).toContain('$ABCDE$');
    expect(checkDistance(g, '5')?.ok).toBe(true);
    expect(checkDistance(g, '6')?.ok).toBe(false);
    expect(checkDistance(g, 'năm')).toBeNull();
  });
});
