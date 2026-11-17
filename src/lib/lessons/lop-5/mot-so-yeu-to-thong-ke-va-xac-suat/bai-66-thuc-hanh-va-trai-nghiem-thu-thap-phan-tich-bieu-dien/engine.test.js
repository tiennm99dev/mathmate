import { describe, expect, it } from 'vitest';
import { MAX_PER_ANSWER, SURVEYS, averageScore, findings, shareText, tapAnswer } from './engine.js';

describe('the survey sheet', () => {
  it('has one sample count per answer', () => {
    const bad = SURVEYS.filter(
      (s) =>
        s.sample.length !== s.labels.length || (s.points && s.points.length !== s.labels.length),
    ).map((s) => s.id);
    expect(bad).toEqual([]);
  });

  it('adds and takes back sheets within the limits', () => {
    expect(tapAnswer([0, 2], 0, -1)).toEqual([0, 2]);
    expect(tapAnswer([0, 2], 1, 1)).toEqual([0, 3]);
    expect(tapAnswer([MAX_PER_ANSWER, 0], 0, 1)).toEqual([MAX_PER_ANSWER, 0]);
  });

  it('finds the average score the book way', () => {
    const s = SURVEYS[1];
    expect(averageScore(s, s.sample)).toEqual({ sum: 65, total: 16, exact: true, average: 4.0625 });
    expect(averageScore(s, [0, 0, 1, 1, 1])).toEqual({
      sum: 12,
      total: 3,
      exact: true,
      average: 4,
    });
    expect(averageScore(s, [0, 0, 0, 2, 1])?.exact).toBe(false);
    expect(averageScore(SURVEYS[0], SURVEYS[0].sample)).toBeNull();
  });

  it('writes what the sample survey shows', () => {
    const lines = findings(SURVEYS[0], SURVEYS[0].sample);
    expect(lines[0]).toBe('Có 25 phiếu.');
    expect(lines[1]).toBe('Thầy cô được chọn nhiều nhất: 9 phiếu.');
    expect(lines[2]).toContain('9/25');
    expect(lines[2]).toContain('9 : 25 = 0,36 = 36%');
    expect(findings(SURVEYS[1], SURVEYS[1].sample)[3]).toBe(
      'Điểm trung bình: 65 : 16 = 4,0625 (điểm).',
    );
    expect(findings(SURVEYS[1], [0, 0, 0, 2, 1])[3]).toBe('Điểm trung bình: 13 : 3 ≈ 4,33 (điểm).');
    expect(shareText(1, 3)).toBe('Tỉ số phần trăm: khoảng 33,3%.');
    expect(findings(SURVEYS[2], [0, 0, 0, 0, 0, 0])).toHaveLength(1);
  });
});
