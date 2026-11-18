import { describe, it, expect } from 'vitest';
import { CUBE, CUBE_EDGES, cubeDot, cubeVector } from './cube.js';

describe('the cube of edge 1', () => {
  it("puts A at the origin and C' at (1; 1; 1)", () => {
    expect(CUBE.A).toEqual({ x: 0, y: 0, z: 0 });
    expect(CUBE["C'"]).toEqual({ x: 1, y: 1, z: 1 });
    expect(CUBE_EDGES).toHaveLength(12);
  });

  it('computes dot products in the cube of edge a', () => {
    const d = cubeDot(cubeVector('A', 'B'), cubeVector("A'", "C'"));
    expect(d.k).toBe(1);
    expect(d.cos).toBe('\\dfrac{\\sqrt{2}}{2}');
    expect(d.lenV).toBe('a\\sqrt{2}');
    expect(d.product).toBe('a^2');
    expect(d.angle).toBeCloseTo(45);
    expect(cubeDot(cubeVector('A', 'C'), cubeVector('C', 'A')).product).toBe('-2a^2');
  });
});
