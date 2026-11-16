import { describe, expect, it } from 'vitest';
import {
  START,
  diagonalText,
  factsOf,
  goalMessage,
  kindOf,
  shapeText,
  snapPoint,
} from './engine.js';

/**
 * @param {number[]} xy four corners as x, y pairs in grid steps of 20
 * @returns {import('./engine.js').Quad}
 */
function quad(xy) {
  const [ax, ay, bx, by, cx, cy, dx, dy] = xy.map((v) => v * 20);
  return { A: { x: ax, y: ay }, B: { x: bx, y: by }, C: { x: cx, y: cy }, D: { x: dx, y: dy } };
}

const PARALLELOGRAM = quad([2, 10, 10, 10, 13, 4, 5, 4]);
const RHOMBUS = quad([5, 13, 9, 10, 13, 13, 9, 16]);
const SLANT_RHOMBUS = quad([2, 10, 7, 10, 10, 6, 5, 6]);
const RECTANGLE = quad([2, 10, 12, 10, 12, 4, 2, 4]);
const SQUARE = quad([2, 10, 8, 10, 8, 4, 2, 4]);
const TRAPEZOID = quad([2, 10, 14, 10, 10, 4, 5, 4]);
const CROSSED = quad([2, 10, 10, 4, 10, 10, 2, 4]);

describe('naming a quadrilateral by its sides', () => {
  it('tells the kinds apart exactly', () => {
    expect(
      [PARALLELOGRAM, RHOMBUS, SLANT_RHOMBUS, RECTANGLE, SQUARE, TRAPEZOID, CROSSED, START].map(
        (q) => kindOf(factsOf(q)),
      ),
    ).toEqual(['binh-hanh', 'thoi', 'thoi', 'binh-hanh', 'thoi', 'mot-cap', 'loi', 'tu-giac']);
  });

  it('finds equal opposite sides in a parallelogram', () => {
    const f = factsOf(PARALLELOGRAM);
    expect([f.abDc, f.adBc, f.abEqDc, f.adEqBc, f.allEqual]).toEqual([
      true,
      true,
      true,
      true,
      false,
    ]);
  });

  it('names the special cases', () => {
    expect(shapeText(factsOf(RECTANGLE))).toContain('hình chữ nhật');
    expect(shapeText(factsOf(SQUARE))).toContain('hình vuông');
    expect(shapeText(factsOf(TRAPEZOID))).toContain('AB và DC');
  });

  it('meets the goals', () => {
    expect(goalMessage(factsOf(PARALLELOGRAM), 'binh-hanh').done).toBe(true);
    expect(goalMessage(factsOf(RHOMBUS), 'binh-hanh').done).toBe(true);
    expect(goalMessage(factsOf(PARALLELOGRAM), 'thoi')).toEqual({
      done: false,
      text: expect.stringContaining('bốn cạnh bằng nhau'),
    });
    expect(goalMessage(factsOf(SLANT_RHOMBUS), 'thoi').done).toBe(true);
    expect(goalMessage(factsOf(TRAPEZOID), 'binh-hanh').done).toBe(false);
    expect(goalMessage(factsOf(START), 'thoi').done).toBe(false);
  });

  it('checks the diagonals', () => {
    expect(diagonalText(factsOf(RHOMBUS))).toContain('vuông góc với nhau');
    expect(diagonalText(factsOf(SLANT_RHOMBUS))).toContain('vuông góc với nhau');
    expect(diagonalText(factsOf(PARALLELOGRAM))).toContain('không');
    expect(diagonalText(factsOf(CROSSED))).toBe('');
  });

  it('snaps corners to the grid', () => {
    expect(snapPoint({ x: 33, y: 7 })).toEqual({ x: 40, y: 20 });
  });
});
