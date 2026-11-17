import { describe, it, expect } from 'vitest';
import {
  BOX_EDGES,
  CHALLENGE_W,
  P,
  boxCorners,
  chain,
  challengeText,
  coordText,
  ggbVector,
  lengthText,
  mixed,
  same3,
  sceneFrame,
  sum3,
} from './engine.js';

const u = P(1, 2, 0);
const v = P(0, 1, 3);
const w = P(2, -1, 1);

describe('sum of three vectors', () => {
  it('adds coordinates and writes them the book way', () => {
    const s = sum3(u, v, w);
    expect(s).toEqual(P(3, 2, 4));
    expect(coordText(P(1, -2, 3))).toBe('(1; −2; 3)');
    expect(lengthText(s)).toBe('√29');
    expect(lengthText(P(2, 3, 6))).toBe('7');
    expect(lengthText(P(2, 2, 4))).toBe('2√6');
    expect(ggbVector('u', P(1, -2, 3))).toBe('u = Vector((1, -2, 3))');
  });

  it('ends the chain and the box diagonal at the same point', () => {
    const cases = [
      [u, v, w],
      [P(2, 0, 0), P(1, 3, 0), P(0, 1, 2)],
      [P(-3, 1, 2), P(0, 0, 0), P(1, 1, 1)],
    ];
    const bad = cases.filter(
      ([a, b, c]) =>
        !same3(chain(a, b, c)[3], sum3(a, b, c)) ||
        !same3(boxCorners(a, b, c)["C'"], sum3(a, b, c)),
    );
    expect(bad).toEqual([]);
  });

  it('builds a parallelepiped: opposite edges are equal vectors', () => {
    const k = boxCorners(P(2, 0, 0), P(1, 3, 0), P(0, 1, 2));
    expect(k["C'"]).toEqual(P(3, 4, 2));
    expect(BOX_EDGES).toHaveLength(12);
    /** @param {string} a @param {string} b */
    const d = (a, b) => P(k[b].x - k[a].x, k[b].y - k[a].y, k[b].z - k[a].z);
    expect([d('B', 'C'), d("A'", "D'"), d("B'", "C'")]).toEqual([
      d('A', 'D'),
      d('A', 'D'),
      d('A', 'D'),
    ]);
  });

  it('detects coplanar vectors', () => {
    expect(mixed(P(1, 0, 0), P(0, 1, 0), P(0, 0, 1))).toBe(1);
    expect(mixed(P(1, 2, 0), P(2, -1, 0), P(3, 3, 0))).toBe(0);
  });

  it('keeps every challenge w inside the steppers and says when the target is hit', () => {
    expect(CHALLENGE_W.filter((c) => [c.x, c.y, c.z].some((t) => Math.abs(t) > 3))).toEqual([]);
    expect(challengeText(P(1, 1, 1), P(1, 1, 1))).toContain('Đúng rồi');
    expect(challengeText(P(1, 1, 1), P(2, 0, 1))).toContain('(1; −1; 0)');
  });

  it('frames the scene around the origin and the points', () => {
    const f = sceneFrame([P(4, 0, 0), P(0, 2, 0), P(0, 0, -2)]);
    expect(f.centre).toEqual(P(2, 1, -1));
    expect(f.radius).toBeCloseTo(Math.sqrt(24) / 2 + 0.4, 9);
    expect(sceneFrame([]).radius).toBe(2);
  });
});
