import { describe, expect, it } from 'vitest';
import { CELLS, TARGETS, checkPaint, gridNote, readPercent, tapCell } from './engine.js';

describe('the hundred-square grid', () => {
  it('colours up to the tapped square and takes the last one back', () => {
    expect(tapCell(0, 24)).toBe(25);
    expect(tapCell(25, 9)).toBe(10);
    expect(tapCell(25, 24)).toBe(24);
  });

  it('writes the ratios and the percentage', () => {
    expect(gridNote(25)).toBe(
      'Tô 25 ô trong 100 ô. Tỉ số của số ô tô màu và số ô cả lưới là 25 : 100 = 25%. Tỉ số của số ô tô màu và số ô chưa tô là 25 : 75.',
    );
    expect(gridNote(100)).toBe(
      'Tô 100 ô trong 100 ô. Tỉ số của số ô tô màu và số ô cả lưới là 100 : 100 = 100%. Không còn ô nào chưa tô.',
    );
    expect(readPercent(25)).toBe('hai mươi lăm phần trăm');
    expect(readPercent(100)).toBe('một trăm phần trăm');
  });

  it('accepts only the asked count', () => {
    const bad = TARGETS.filter(
      (t) => !checkPaint(t, t).ok || checkPaint(t - 1, t).ok || t > CELLS || t < 1,
    );
    expect(bad).toEqual([]);
    expect(checkPaint(20, 25).text).toContain('cần tô thêm 5 ô');
    expect(checkPaint(30, 25).text).toContain('cần tô bớt 5 ô');
  });
});
