import { describe, expect, it } from 'vitest';
import { pointText } from '../_shared/half-plane.js';
import { BOX, PRESETS, levelRange, levelVerdict, namedVertices } from './engine.js';

/** @param {import('./engine.js').Preset} preset */
const verticesOf = (preset) => namedVertices(preset.items.map((it) => it.ineq));

describe('system widget', () => {
  it('names the vertices of each preset polygon', () => {
    const named = PRESETS.map((p) => verticesOf(p).map((v) => `${v.name}${pointText(v.pt)}`));
    expect(named[0]).toEqual(['O(0; 0)', 'A(5; 0)', 'B(2; 3)', 'C(0; 4)']);
    expect([...named[1]].map((s) => s.slice(1)).sort()).toEqual([
      '(1; 1)',
      '(1; 5)',
      '(3,5; 1)',
      '(4; 2)',
    ]);
    expect(named[2]).toEqual(['A(−2; 0)', 'B(4; 0)', 'C(4; 3)']);
  });

  it('keeps every preset polygon inside the box', () => {
    const outside = PRESETS.flatMap((p) =>
      verticesOf(p).filter(
        ({ pt }) => pt.x <= BOX.xMin || pt.x >= BOX.xMax || pt.y <= BOX.yMin || pt.y >= BOX.yMax,
      ),
    );
    expect(outside).toEqual([]);
  });

  it('reads the level line against the polygon', () => {
    const v = verticesOf(PRESETS[0]);
    expect(levelVerdict(v, 3, 4, 18).text).toContain('tại B(2; 3): F lớn nhất bằng 18');
    expect(levelVerdict(v, 3, 4, 0).text).toContain('F nhỏ nhất bằng 0');
    expect(levelVerdict(v, 3, 4, 20).text).toContain('không cắt');
    expect(levelVerdict(v, 3, 4, 9).text).toContain('cắt miền nghiệm');
    expect(levelVerdict(v, 0, 0, 1).tone).toBe('warn');
    // F = x + y is constant along the edge from A(5; 0) to B(2; 3).
    expect(levelVerdict(v, 1, 1, 5).text).toContain('dọc cạnh nối A(5; 0) và B(2; 3)');
  });

  it('spans the box with the slider', () => {
    expect(levelRange(3, 4)).toEqual({ min: -17, max: 52 });
  });
});
