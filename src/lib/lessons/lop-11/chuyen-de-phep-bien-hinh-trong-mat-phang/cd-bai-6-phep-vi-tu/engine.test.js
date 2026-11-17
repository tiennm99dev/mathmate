import { describe, expect, it } from 'vitest';
import { K_VALUES, homothetyNote, scaled } from './engine.js';

describe('homothety board', () => {
  it('never offers the ratio 0', () => {
    expect(K_VALUES.includes(0)).toBe(false);
  });

  it('scales every vertex from the centre', () => {
    expect(scaled({ x: 0, y: 0 }, 2)).toEqual([
      { x: 2, y: 2 },
      { x: 6, y: 2 },
      { x: 2, y: 6 },
    ]);
    expect(scaled({ x: 1, y: 1 }, -0.5)).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 0 },
    ]);
  });

  it('states the length and area of the image', () => {
    expect(homothetyNote(-3)).toContain("A'B' = |k| \\cdot AB = 3 \\cdot 2 = 6");
    expect(homothetyNote(-3)).toContain('tia đối');
    expect(homothetyNote(0.5)).toContain('thu nhỏ');
    expect(homothetyNote(0.5)).toContain('k^2 = \\frac{1}{4}');
    expect(homothetyNote(-1)).toContain('đối xứng tâm');
    expect(homothetyNote(1)).toContain('đồng nhất');
  });

  it("does not call A'B' parallel to AB when the centre lies on line AB", () => {
    expect(homothetyNote(2, { x: 1, y: 1 })).toContain("A' = A");
    expect(homothetyNote(2, { x: -2, y: 1 })).toContain('nằm trên đường thẳng $AB$');
    expect(homothetyNote(2, { x: -2, y: 1 })).not.toContain('\\parallel');
    expect(homothetyNote(2, { x: 0, y: 0 })).toContain("A'B' \\parallel AB");
  });
});
