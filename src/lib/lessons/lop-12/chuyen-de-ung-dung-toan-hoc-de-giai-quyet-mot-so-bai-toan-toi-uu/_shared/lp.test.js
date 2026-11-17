import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  constraintTex,
  constraintText,
  isBounded,
  levelSegment,
  levelVerdict,
  namedVertices,
  objectiveTex,
  optimum,
  pointText,
  regionPolygon,
} from './lp.js';
import { DIET, FACTORY, MACHINES, RENTAL } from './lp-problems.js';

/** @param {import('./lp-problems.js').LpProblem} pr */
const verticesOf = (pr) =>
  namedVertices(pr.constraints, pr.box, pr.p, pr.q).map(
    (v) => `${v.name}${pointText(v.pt)}=${v.value}`,
  );

/** @param {import('./lp-problems.js').LpProblem} pr */
const bestOf = (pr) => optimum(pr.constraints, pr.box, pr.p, pr.q, pr.goal);

describe('linear programming by the level line', () => {
  it('names the vertices of a polygon region and finds the optimum', () => {
    expect(verticesOf(FACTORY)).toEqual([
      'O(0; 0)=0',
      'A(40; 0)=1600',
      'B(20; 40)=2000',
      'C(0; 50)=1500',
    ]);
    expect(bestOf(FACTORY)?.value).toBe(2000);
    expect(bestOf(FACTORY)?.at.map((v) => v.name)).toEqual(['B']);
    expect(isBounded(FACTORY.constraints, FACTORY.box)).toBe(true);

    expect(verticesOf(RENTAL)).toEqual([
      'A(10; 2)=46',
      'B(10; 9)=67',
      'C(2,5; 9)=37',
      'D(5; 4)=32',
    ]);
    expect(bestOf(RENTAL)?.value).toBe(32);

    expect(verticesOf(MACHINES)).toEqual([
      'O(0; 0)=0',
      'A(7; 0)=21',
      'B(6; 2)=28',
      'C(3; 5)=34',
      'D(0; 6)=30',
    ]);
    expect(bestOf(MACHINES)?.value).toBe(34);
  });

  it('handles an unbounded region: a minimum but no maximum', () => {
    expect(isBounded(DIET.constraints, DIET.box)).toBe(false);
    expect(verticesOf(DIET)).toEqual(['A(0; 3)=120', 'B(2; 1)=100', 'C(4; 0)=120']);
    expect(bestOf(DIET)?.value).toBe(100);
    expect(optimum(DIET.constraints, DIET.box, DIET.p, DIET.q, 'max')).toBeNull();
  });

  it('every optimum is a multiple of the slider step', () => {
    const bad = [FACTORY, DIET, RENTAL, MACHINES].filter((pr) => {
      const v = bestOf(pr)?.value ?? NaN;
      return Math.abs(v / pr.kStep - Math.round(v / pr.kStep)) > 1e-9;
    });
    expect(bad).toEqual([]);
  });

  it('cuts the level line with the region and judges it', () => {
    const poly = regionPolygon(FACTORY.constraints, FACTORY.box);
    expect(levelSegment(poly, 40, 30, 2500)).toBeNull();
    const seg = levelSegment(poly, 40, 30, 1200);
    expect(seg?.map(pointText)).toEqual(['(30; 0)', '(0; 40)']);
    const at = (/** @type {number} */ k) =>
      levelVerdict(FACTORY.constraints, FACTORY.box, 40, 30, 'max', k).tone;
    expect([at(1200), at(2000), at(2050)]).toEqual(['info', 'ok', 'warn']);
    const diet = (/** @type {number} */ k) =>
      levelVerdict(DIET.constraints, DIET.box, 30, 40, 'min', k).tone;
    expect([diet(90), diet(100), diet(200), diet(600)]).toEqual(['warn', 'ok', 'info', 'info']);
    // Past the drawing the unbounded region still meets the level line.
    expect(levelVerdict(DIET.constraints, DIET.box, 30, 40, 'min', 600).text).toContain(
      'ngoài khung hình',
    );
    expect(levelVerdict(DIET.constraints, DIET.box, 30, 40, 'min', 200).text).not.toContain(
      'ngoài khung hình',
    );
    const rental = (/** @type {number} */ k) =>
      levelVerdict(RENTAL.constraints, RENTAL.box, 4, 3, 'min', k).tone;
    expect([rental(31), rental(32), rental(50), rental(68)]).toEqual([
      'warn',
      'ok',
      'info',
      'warn',
    ]);
  });

  it('writes constraints and verdicts as valid TeX', () => {
    expect(constraintText(FACTORY.constraints[0])).toBe('x + 2y ≤ 100');
    expect(constraintTex(DIET.constraints[1])).toBe('x + 2y \\ge 4');
    expect(objectiveTex(40, 30)).toBe('F = 40x + 30y');
    const texts = [];
    for (const pr of [FACTORY, DIET, RENTAL, MACHINES]) {
      texts.push(pr.story, pr.meaning, `$${objectiveTex(pr.p, pr.q)}$`);
      texts.push(...pr.constraints.map((c) => `$${constraintTex(c)}$`));
      for (const k of [0, bestOf(pr)?.value ?? 0, 15, 1000]) {
        texts.push(levelVerdict(pr.constraints, pr.box, pr.p, pr.q, pr.goal, k).text);
      }
    }
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
