import { describe, expect, it } from 'vitest';
import { SHAPES, START_PATH, axesOf, huntNote, mirrorPath, penNote } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });
const shape = (/** @type {string} */ id) => SHAPES.find((s) => s.id === id) ?? SHAPES[0];

describe('mirror board', () => {
  it('mirrors the drawn half into the other side of the axis', () => {
    const tree = mirrorPath(START_PATH, 'Oy');
    expect(tree[1]).toEqual(p(-3, 2));
    expect(tree[0]).toEqual(p(0, 5));
    expect(mirrorPath([p(2, -3)], 'y=-x')).toEqual([p(3, -2)]);
  });

  it('describes the pen point and its image', () => {
    expect(penNote(p(0, 4), 'Oy')).toContain('biến thành chính nó');
    expect(penNote(p(2, 1), 'Ox')).toBe(
      "$M(2;\\ 1)$ có ảnh $M'(2;\\ -1)$: $d: Ox$ là đường trung trực của đoạn $MM'$.",
    );
  });
});

describe('axes of symmetry among the lines through O', () => {
  it('finds the book’s axes for each figure', () => {
    expect(axesOf(shape('vuong'))).toEqual(['Ox', 'Oy', 'y=x', 'y=-x']);
    expect(axesOf(shape('chu-nhat'))).toEqual(['Ox', 'Oy']);
    expect(axesOf(shape('thoi'))).toEqual(['Ox', 'Oy']);
    expect(axesOf(shape('tam-giac-can'))).toEqual(['Oy']);
    expect(axesOf(shape('binh-hanh'))).toEqual([]);
    expect(axesOf(shape('thang-can'))).toEqual(['Oy']);
    expect(huntNote(shape('vuong'), 'y=x')).toContain('là một trục đối xứng của hình vuông');
    expect(huntNote(shape('binh-hanh'), 'Ox')).toContain('không phải');
  });
});
