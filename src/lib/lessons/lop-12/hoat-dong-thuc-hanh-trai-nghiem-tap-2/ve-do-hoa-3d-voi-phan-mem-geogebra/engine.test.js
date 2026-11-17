import { describe, expect, it } from 'vitest';
import { P } from '../_shared/space.js';
import {
  lineInput,
  linePlane,
  lineSphere,
  planeInput,
  planeSphere,
  sphereInput,
} from './engine.js';

describe('line and plane', () => {
  it('finds the intersection point', () => {
    const r = linePlane(P(1, 1, 1), -6, P(1, -2, 3), P(2, 1, -1));
    expect(r).toEqual({ kind: 'cut', t: 2, point: P(5, 0, 1) });
  });
  it('tells a parallel line from a line in the plane', () => {
    expect(linePlane(P(1, -1, -1), 0, P(1, 0, -1), P(2, 1, 1)).kind).toBe('parallel');
    expect(linePlane(P(1, -1, -1), 0, P(1, 1, 0), P(2, 1, 1)).kind).toBe('inside');
  });
  it('has no answer for a zero vector', () => {
    expect(linePlane(P(), 1, P(), P(1, 0, 0)).kind).toBe('none');
    expect(linePlane(P(0, 0, 1), 0, P(), P()).kind).toBe('none');
  });
});

describe('plane and sphere', () => {
  it('finds a tangent plane and its point of contact', () => {
    const r = planeSphere(P(2, -1, 2), -1, P(1, -2, 3), 3);
    expect(r.kind).toBe('tangent');
    expect(r.d).toBe(3);
    expect(r.centre).toEqual(P(-1, -1, 1));
  });
  it('finds the circle of a cut', () => {
    const r = planeSphere(P(0, 0, 1), -3, P(), 5);
    expect(r.kind).toBe('circle');
    expect(r.r).toBeCloseTo(4, 12);
    expect(r.centre).toEqual(P(0, 0, 3));
  });
  it('sees a plane apart from the sphere', () => {
    expect(planeSphere(P(2, -1, 2), 1, P(1, -2, 3), 3).kind).toBe('apart');
  });
});

describe('line and sphere', () => {
  it('counts the common points', () => {
    expect(lineSphere(P(), P(1, 0, 0), P(2, 1, 0), 2).kind).toBe('two');
    expect(lineSphere(P(3, 0, 0), P(0, 1, 0), P(), 3)).toMatchObject({
      kind: 'tangent',
      points: [P(3, 0, 0)],
    });
    expect(lineSphere(P(3, -2, 1), P(0, 1, 1), P(0, 0, 2), 3).kind).toBe('apart');
  });
  it('puts both points on the sphere', () => {
    const { points } = lineSphere(P(), P(1, 0, 0), P(2, 1, 0), 2);
    for (const p of points) expect((p.x - 2) ** 2 + (p.y - 1) ** 2 + p.z ** 2).toBeCloseTo(4, 9);
  });
});

describe('GeoGebra input', () => {
  it('writes the objects as typed', () => {
    expect(planeInput(P(2, -1, 0), -5)).toBe('2x - y - 5 = 0');
    expect(planeInput(P(0, 0, -1), 0)).toBe('-z = 0');
    expect(lineInput(P(1, -2, 3), P(2, 1, -1))).toBe('Line((1, -2, 3), Vector((2, 1, -1)))');
    expect(sphereInput(P(-0, 0, 2), 3)).toBe('Sphere((0, 0, 2), 3)');
  });
});
