import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { lineAngle } from '../_shared/space.js';
import { ANGLES, BY_ANGLE, angleOf, explain, makePair, segName, translation } from './engine.js';

const all = Object.values(BY_ANGLE).flat();

describe('angles between lines of a cube', () => {
  it('finds only the angles 0°, 45°, 60° and 90°, each many times', () => {
    expect(all.length).toBe((24 * 23) / 2);
    for (const a of ANGLES) expect(BY_ANGLE[a].length).toBeGreaterThan(5);
    expect(angleOf(['A', 'B'], ['C', "C'"])).toBe(90);
    expect(angleOf(["A'", "C'"], ["B'", 'C'])).toBe(60);
    expect(angleOf(['A', 'C'], ["A'", "D'"])).toBe(45);
    expect(angleOf(['A', 'C'], ["B'", "D'"])).toBe(90);
  });

  it('moves one line onto a line of the cube that cuts the other, keeping the angle', () => {
    const wrong = [];
    for (const [s, t] of all) {
      if (angleOf(s, t) === 0) continue;
      const move = translation(s, t);
      if (!move) {
        wrong.push(`none ${segName(s)} ${segName(t)}`);
        continue;
      }
      const ends = [...move.fixed, ...move.onto];
      if (move.name !== 'O' && ends.filter((k) => k === move.name).length !== 2)
        wrong.push(`meets off the ends ${segName(s)} ${segName(t)}`);
      if (Math.abs(lineAngle(move.rays[0], move.rays[1]) - angleOf(s, t)) > 1e-6)
        wrong.push(`angle ${segName(s)} ${segName(t)}`);
    }
    expect(wrong).toEqual([]);
  });

  it('explains every pair without gaps', () => {
    const wrong = [];
    for (const [s, t] of all) {
      const text = explain(s, t);
      if (text.includes('undefined') || !text.includes(`${angleOf(s, t)}^\\circ`)) wrong.push(text);
    }
    expect(wrong).toEqual([]);
    expect(explain(['A', 'B'], ['C', "C'"])).toContain("(AB, AA') = 90^\\circ");
    expect(explain(['A', 'C'], ["B'", "D'"])).toContain('vuông góc với nhau');
  });

  it('draws questions of all four angles', () => {
    const rand = rng(11);
    const seen = new Set();
    for (let i = 0; i < 40; i++) seen.add(angleOf(...makePair(rand)));
    expect([...seen].sort((a, b) => a - b)).toEqual(ANGLES);
  });
});
