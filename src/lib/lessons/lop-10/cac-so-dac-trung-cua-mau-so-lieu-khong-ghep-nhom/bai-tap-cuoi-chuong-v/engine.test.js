import { describe, expect, it } from 'vitest';
import { PAIRS, ROWS, comparePair } from './engine.js';

const pair = (/** @type {string} */ id) => {
  const p = PAIRS.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p;
};

describe('comparing two classes', () => {
  it('finds the even class among the test scores', () => {
    const p = pair('diem');
    const r = comparePair(p.a, p.b, p.names);
    expect(r.a.outliers).toEqual([]);
    expect(r.b.outliers).toEqual([]);
    expect(r.a.mean).toBeCloseTo(115 / 15, 9);
    expect(r.b.mean).toBeCloseTo(113 / 15, 9);
    expect(r.a.sd).toBeLessThan(r.b.sd);
    expect(r.lines[0]).toContain('Lớp 10A có số trung bình cao hơn');
    expect(r.lines[1]).toContain('lớp 10A đồng đều hơn');
  });

  it('compares by median and interquartile range when there is an outlier', () => {
    const p = pair('tu-hoc');
    const r = comparePair(p.a, p.b, p.names);
    expect(r.a.outliers).toEqual([24]);
    expect([r.a.median, r.b.median]).toEqual([8, 8]);
    expect([r.a.iqr, r.b.iqr]).toEqual([3.5, 2.5]);
    expect(r.lines[0]).toContain('trung vị bằng nhau');
    expect(r.lines[1]).toContain('lớp 10D đồng đều hơn');
    expect(r.lines[2]).toContain('Lớp 10C có giá trị bất thường 24');
  });

  it('reads every row from a summary', () => {
    const p = pair('diem');
    const r = comparePair(p.a, p.b, p.names);
    expect(ROWS.map((row) => row.get(r.a))).toHaveLength(7);
  });

  it('says when two samples are alike', () => {
    const r = comparePair([1, 2, 3], [1, 2, 3], ['X', 'Y']);
    expect(r.lines[0]).toContain('bằng nhau');
    expect(r.lines[1]).toContain('bằng nhau');
  });
});
