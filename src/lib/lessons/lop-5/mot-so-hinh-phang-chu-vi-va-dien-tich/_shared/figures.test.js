import { describe, expect, it } from 'vitest';
import {
  circleArea,
  circleAreaWork,
  circumference,
  circumferenceWork,
  num,
  trapezoidArea,
  trapezoidWork,
  triangleArea,
  triangleKind,
  triangleWork,
} from './figures.js';

describe('plane figure formulas', () => {
  it('works out the areas and the circumference with 3,14', () => {
    expect(triangleArea(6, 4)).toBe(12);
    expect(triangleArea(5, 3)).toBe(7.5);
    expect(trapezoidArea(8, 4, 3)).toBe(18);
    expect(trapezoidArea(12, 6, 3)).toBe(27);
    expect(circumference(4)).toBe(12.56);
    expect(circumference(0.5)).toBe(1.57);
    expect(circleArea(3)).toBe(28.26);
    expect(circleArea(10)).toBe(314);
  });

  it('writes the working with a decimal comma', () => {
    expect(num(7.5)).toBe('7,5');
    expect(triangleWork(5, 3)).toBe('5 × 3 : 2 = 7,5');
    expect(trapezoidWork(8, 4, 3)).toBe('(8 + 4) × 3 : 2 = 18');
    expect(circumferenceWork(4)).toBe('4 × 3,14 = 12,56');
    expect(circleAreaWork(3)).toBe('3 × 3 × 3,14 = 28,26');
  });

  it('tells acute, right and obtuse triangles apart', () => {
    const B = { x: 0, y: 0 };
    const C = { x: 6, y: 0 };
    expect(triangleKind({ x: 3, y: 4 }, B, C)).toBe('nhon');
    expect(triangleKind({ x: 0, y: 4 }, B, C)).toBe('vuong');
    expect(triangleKind({ x: 3, y: 3 }, B, C)).toBe('vuong');
    expect(triangleKind({ x: -2, y: 3 }, B, C)).toBe('tu');
    expect(triangleKind({ x: 3, y: 2 }, B, C)).toBe('tu');
    expect(triangleKind({ x: 9, y: 0 }, B, C)).toBeNull();
  });
});
