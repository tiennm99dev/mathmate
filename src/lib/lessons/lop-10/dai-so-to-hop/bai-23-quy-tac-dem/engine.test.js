import { describe, expect, it } from 'vitest';
import {
  GIFTS,
  OUTFIT,
  onPath,
  placeTree,
  productIndex,
  productText,
  productTree,
  sumText,
  sumTree,
} from './engine.js';

describe('counting tree', () => {
  it('has as many leaves as the multiplication rule says', () => {
    const bad = [];
    for (let a = 1; a <= 4; a++)
      for (let b = 1; b <= 3; b++)
        for (let c = 1; c <= 2; c++) {
          const t = placeTree(productTree(OUTFIT, [a, b, c]));
          if (t.leaves !== a * b * c || t.depth !== 3) bad.push([a, b, c]);
        }
    expect(bad).toEqual([]);
  });

  it('has as many leaves as the addition rule says', () => {
    const t = placeTree(sumTree(GIFTS, [3, 2]));
    expect(t.leaves).toBe(5);
    expect(t.depth).toBe(2);
    expect(t.edges).toHaveLength(2 + 5);
  });

  it('puts every inner node between its children', () => {
    const t = placeTree(productTree(OUTFIT.slice(0, 2), [2, 3]));
    const root = t.nodes.find((n) => n.depth === 0);
    expect(root?.row).toBe(2.5);
    const first = t.nodes.find((n) => n.depth === 1 && n.path[0] === 0);
    expect(first?.row).toBe(1);
  });

  it('numbers a pick the way the leaves are drawn', () => {
    expect(productIndex([4, 3, 2], [0, 0, 0])).toBe(1);
    expect(productIndex([4, 3, 2], [3, 2, 1])).toBe(24);
    expect(productIndex([4, 3, 2], [1, 0, 1])).toBe(8);
    const t = placeTree(productTree(OUTFIT, [4, 3, 2]));
    const leaf = t.nodes.find((n) => n.leaf && n.path.join() === '1,0,1');
    expect(leaf?.row).toBe(7);
  });

  it('marks the nodes on the chosen path', () => {
    expect(onPath([], [1, 2])).toBe(true);
    expect(onPath([1], [1, 2])).toBe(true);
    expect(onPath([2], [1, 2])).toBe(false);
    expect(onPath([1, 2, 0], [1, 2])).toBe(false);
  });

  it('explains the count in words', () => {
    const text = productText(OUTFIT, [4, 3, 2], [0, 2, 1]);
    expect(text).toContain('áo trắng, quần bò, giày da');
    expect(text).toContain('4 \\cdot 3 \\cdot 2 = 24');
    expect(sumText(GIFTS, [4, 3], 1, 2)).toContain('Cách thứ 7');
    expect(sumText(GIFTS, [4, 3], 1, 2)).toContain('4 + 3 = 7');
  });
});
