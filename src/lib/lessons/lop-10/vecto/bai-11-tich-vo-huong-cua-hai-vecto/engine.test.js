import { describe, expect, it } from 'vitest';
import { angleTex, dotLines, dotNote, kindOf, projection, work } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('dot product board', () => {
  it('reads the sign of the dot product from the angle', () => {
    expect(kindOf(p(4, 1), p(2, 3))).toBe('acute');
    expect(kindOf(p(3, 1), p(-1, 3))).toBe('right');
    expect(kindOf(p(4, 1), p(-3, 2))).toBe('obtuse');
    expect(kindOf(p(0, 0), p(-3, 2))).toBe('zero');
    expect(dotNote(p(3, 1), p(-1, 3))).toContain('\\perp');
  });

  it('works the dot product out both ways', () => {
    const [byCoords, angle, byAngle] = dotLines(p(1, 2), p(-3, 1), ['\\vec a', '\\vec b']);
    expect(byCoords).toBe('\\vec a \\cdot \\vec b = 1 \\cdot (-3) + 2 \\cdot 1 = -1');
    expect(angle).toBe('(\\vec a, \\vec b) \\approx 98{,}1^\\circ');
    expect(byAngle).toContain('\\sqrt{5} \\cdot \\sqrt{10}');
    expect(byAngle).toMatch(/= -1$/);
    expect(dotLines(p(0, 0), p(1, 1), ['\\vec a', '\\vec b'])).toHaveLength(1);
    expect(angleTex(45)).toBe('= 45^\\circ');
  });

  it('projects b on the line of a', () => {
    expect(projection(p(4, 0), p(2, 3))).toEqual(p(2, 0));
    expect(projection(p(4, 0), p(-3, 2))).toEqual(p(-3, 0));
    expect(projection(p(0, 0), p(2, 3))).toBeNull();
  });

  it('gives the work of a force in joules', () => {
    expect(work(p(5, 0), p(3, 4)).A).toBe(150);
    expect(work(p(5, 0), p(3, 4)).note).toContain('công phát động');
    expect(work(p(5, 0), p(-1, 1)).note).toContain('công cản');
    expect(work(p(5, 0), p(0, 2)).note).toContain('không sinh công');
    expect(work(p(5, 0), p(3, 4)).note).toContain('= 50$ N');
  });
});
