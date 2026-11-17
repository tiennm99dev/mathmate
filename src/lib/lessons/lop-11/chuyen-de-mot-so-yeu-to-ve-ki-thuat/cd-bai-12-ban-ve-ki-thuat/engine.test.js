import { describe, expect, it } from 'vitest';
import { DIMS, ELEMENTS, START_DIMS, TYPE_ORDER, checkDims, judgeLine } from './engine.js';

describe('ELEMENTS', () => {
  it('numbers the lines 1, 2, 3, … and uses every line type', () => {
    expect(ELEMENTS.map((e) => e.n)).toEqual(ELEMENTS.map((_, i) => i + 1));
    expect(new Set(ELEMENTS.map((e) => e.type))).toEqual(new Set(TYPE_ORDER));
  });

  it('keeps the views in step: front and top equally long, front and side equally high', () => {
    const xs = (/** @type {number} */ n) => ELEMENTS[n - 1].lines.flatMap(([x1, , x2]) => [x1, x2]);
    const ys = (/** @type {number} */ n) =>
      ELEMENTS[n - 1].lines.flatMap(([, y1, , y2]) => [y1, y2]);
    expect([Math.min(...xs(1)), Math.max(...xs(1))]).toEqual([
      Math.min(...xs(4)),
      Math.max(...xs(4)),
    ]);
    expect([Math.min(...ys(1)), Math.max(...ys(1))]).toEqual([
      Math.min(...ys(7)),
      Math.max(...ys(7)),
    ]);
  });
});

describe('judgeLine', () => {
  it('accepts the right line type and explains a wrong one', () => {
    expect(judgeLine(2, 'dashed').ok).toBe(true);
    const wrong = judgeLine(2, 'thick');
    expect(wrong.ok).toBe(false);
    expect(wrong.text).toContain('che khuất');
    const bad = [];
    for (const e of ELEMENTS) if (!judgeLine(e.n, e.type).ok) bad.push(e.n);
    expect(bad).toEqual([]);
  });
});

describe('checkDims', () => {
  const needed = DIMS.filter((d) => d.need).map((d) => d.id);

  it('passes exactly the needed dimensions', () => {
    expect(checkDims(needed)).toMatchObject({ tone: 'ok', complete: true });
  });

  it('names what is missing, repeated or derivable', () => {
    const start = checkDims(START_DIMS);
    expect(start.complete).toBe(false);
    expect(start.text).toContain('chiều cao của gối');
    expect(start.text).toContain('mỗi kích thước chỉ ghi một lần');
    expect(start.text).toContain('suy ra được');
    expect(checkDims([...needed, 'thanh']).complete).toBe(false);
    expect(checkDims(needed.slice(1)).text).toContain('chiều dài');
  });
});
