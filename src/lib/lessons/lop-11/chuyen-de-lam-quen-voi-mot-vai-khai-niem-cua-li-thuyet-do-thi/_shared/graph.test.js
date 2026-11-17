import { describe, expect, it } from 'vitest';
import {
  componentLists,
  degrees,
  dijkstraSteps,
  eulerKind,
  eulerTrail,
  findCycle,
  hamilton,
  isConnected,
  isSimple,
  oddVertices,
  postman,
  shortest,
  walkLength,
  walkText,
} from './graph.js';

/** @param {string} list e.g. 'AB AC BC' @param {number[]} [w] */
const E = (list, w = []) =>
  list.split(' ').map((p, i) => ({
    a: p.charCodeAt(0) - 65,
    b: p.charCodeAt(1) - 65,
    ...(w.length ? { w: w[i] } : {}),
  }));

const KONIGSBERG = E('AB AB AC AC AD BD CD');
const ENVELOPE = E('AB AC BC BD CE DE BE CD');

describe('degrees and connectivity', () => {
  it('counts degrees, a loop twice, and the sum is twice the edge count', () => {
    expect(degrees(4, KONIGSBERG)).toEqual([5, 3, 3, 3]);
    expect(degrees(2, E('AA AB'))).toEqual([3, 1]);
    const sum = degrees(5, ENVELOPE).reduce((s, d) => s + d, 0);
    expect(sum).toBe(2 * ENVELOPE.length);
  });

  it('finds components and simple graphs', () => {
    expect(componentLists(6, E('AB BC DE'))).toEqual([[0, 1, 2], [3, 4], [5]]);
    expect(isConnected(4, KONIGSBERG)).toBe(true);
    expect(isConnected(3, E('AB'))).toBe(false);
    expect(isSimple(KONIGSBERG)).toBe(false);
    expect(isSimple(ENVELOPE)).toBe(true);
  });

  it('finds an elementary cycle only when there is one', () => {
    expect(findCycle(4, E('AB BC CD'))).toBeNull();
    const c = /** @type {number[]} */ (findCycle(5, E('AB BC CD DB DE')));
    expect(walkText(c)).toBe('DCBD');
    const bad = [];
    for (const g of [E('AB BC CA'), ENVELOPE, E('AB CD DE EC')]) {
      const cyc = findCycle(5, g);
      if (!cyc || cyc[0] !== cyc[cyc.length - 1] || new Set(cyc).size !== cyc.length - 1)
        bad.push(g);
      else
        for (let i = 1; i < cyc.length; i++)
          if (
            !g.some(
              (e) =>
                (e.a === cyc[i - 1] && e.b === cyc[i]) || (e.b === cyc[i - 1] && e.a === cyc[i]),
            )
          )
            bad.push(g);
    }
    expect(bad).toEqual([]);
  });
});

describe('Euler and Hamilton', () => {
  it('applies Euler theorem', () => {
    expect(eulerKind(4, KONIGSBERG)).toBe('none');
    expect(eulerKind(5, ENVELOPE)).toBe('path');
    expect(oddVertices(5, ENVELOPE)).toEqual([3, 4]);
    expect(eulerKind(3, E('AB BC CA'))).toBe('cycle');
    expect(eulerKind(4, E('AB AB CD CD'))).toBe('none');
  });

  it('builds an Euler trail that uses every edge once', () => {
    const trail = /** @type {number[]} */ (eulerTrail(5, ENVELOPE));
    expect(trail).toHaveLength(ENVELOPE.length + 1);
    expect([trail[0], trail.at(-1)].sort()).toEqual([3, 4]);
    const left = [...ENVELOPE];
    for (let i = 1; i < trail.length; i++) {
      const k = left.findIndex(
        (e) =>
          (e.a === trail[i - 1] && e.b === trail[i]) || (e.b === trail[i - 1] && e.a === trail[i]),
      );
      expect(k).not.toBe(-1);
      left.splice(k, 1);
    }
    expect(eulerTrail(5, ENVELOPE, 0)).toBeNull();
  });

  it('finds Hamilton cycles and paths', () => {
    const bowtie = E('AB AC BC AD AE DE');
    expect(hamilton(5, bowtie, true)).toBeNull();
    expect(hamilton(5, bowtie, false)).not.toBeNull();
    expect(walkText(/** @type {number[]} */ (hamilton(5, ENVELOPE, true)))).toMatch(/^A.{4}A$/);
  });
});

describe('weighted graphs', () => {
  const CITY = E('AB AC BC BD CD CE DE DF EF', [4, 2, 1, 5, 8, 10, 2, 6, 3]);

  it('runs the labelling algorithm step by step', () => {
    const steps = dijkstraSteps(6, CITY, 0);
    expect(steps.map((s) => walkText([s.fixed]))).toEqual(['A', 'C', 'B', 'D', 'E', 'F']);
    expect(steps.at(-1)?.label).toEqual([0, 3, 2, 8, 10, 13]);
    expect(steps[1].changed).toEqual([1, 3, 4]);
    const s = shortest(6, CITY, 0, 5);
    expect(s.length).toBe(13);
    expect(walkText(/** @type {number[]} */ (s.path))).toBe('ACBDEF');
    expect(walkLength(CITY, /** @type {number[]} */ (s.path))).toBe(13);
  });

  it('solves the postman problem with two odd vertices', () => {
    // Every vertex even except B and C.
    const g = E('AB AC BC BD CD', [3, 4, 2, 5, 6]);
    const tour = /** @type {NonNullable<ReturnType<typeof postman>>} */ (postman(4, g));
    expect(tour.extra).toBe(2);
    expect(tour.total).toBe(22);
    expect(postman(3, E('AB BC CA', [1, 2, 3]))?.total).toBe(6);
  });
});
