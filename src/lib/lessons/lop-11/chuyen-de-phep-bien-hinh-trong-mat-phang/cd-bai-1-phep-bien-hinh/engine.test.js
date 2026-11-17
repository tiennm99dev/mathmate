import { describe, expect, it } from 'vitest';
import { RULES, imageNote, ruleOf } from './engine.js';

const p = (/** @type {number} */ x, /** @type {number} */ y) => ({ x, y });

describe('transformation rules', () => {
  it('sends a point to the image its coordinate rule gives', () => {
    expect(ruleOf('dich').map(p(2, -3))).toEqual(p(4, -2));
    expect(ruleOf('trung-diem').map(p(3, -2))).toEqual(p(-1, 6));
    expect(ruleOf('oy').map(p(2, 5))).toEqual(p(-2, 5));
    expect(ruleOf('oy').map(p(0, 5))).toEqual(p(0, 5));
    expect(ruleOf('chieu').map(p(2, 5))).toEqual(p(2, 0));
    expect(ruleOf('gap-doi').map(p(-1, 3))).toEqual(p(-2, 6));
    expect(ruleOf('nope')).toBe(RULES[0]);
  });

  it('keeps every image of the small board on the plane', () => {
    const bad = [];
    for (const r of RULES)
      for (let x = -3; x <= 3; x++)
        for (let y = -3; y <= 3; y++) {
          const q = r.map(p(x, y));
          if (Math.abs(q.x) > 6 || Math.abs(q.y) > 7) bad.push([r.id, x, y]);
        }
    expect(bad).toEqual([]);
  });

  it('says when a point is its own image and when images are shared', () => {
    expect(imageNote(ruleOf('trung-diem'), p(1, 2))).toContain('biến thành chính nó');
    expect(imageNote(ruleOf('chieu'), p(-2, 3))).toContain('$x = -2$');
    expect(imageNote(ruleOf('dich'), p(0, 0))).toBe("Ảnh của $M(0;\\ 0)$ là $M'(2;\\ 1)$.");
  });
});
