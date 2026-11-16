import { describe, expect, it } from 'vitest';
import { PRESETS, deviationRows, spreadOf } from './engine.js';

const preset = (/** @type {string} */ id) => {
  const p = PRESETS.find((x) => x.id === id);
  if (!p) throw new Error(id);
  return p.values;
};

describe('spread of a sample', () => {
  it('writes the newborn weights the way the book works them', () => {
    const { s, lines, fences } = spreadOf(preset('can-nang'));
    expect(lines[0]).toBe('R = 4{,}1 - 2{,}5 = 1{,}6');
    expect(lines[1]).toBe('\\Delta_Q = Q_3 - Q_1 = 3{,}3 - 2{,}8 = 0{,}5');
    expect(lines[2]).toBe('\\overline{x} = 3{,}13');
    expect(lines[3]).toContain('\\dfrac{1{,}821}{10} = 0{,}1821');
    expect(lines[4]).toBe('s = \\sqrt{s^2} \\approx 0{,}4267');
    expect(s.outliers).toEqual([4.1]);
    expect(fences.lines[1]).toContain('= 4{,}05');
  });

  it('finds the outliers of the calcium sample', () => {
    const { fences } = spreadOf(preset('canxi'));
    expect(fences.lines[0]).toBe('Q_1 - 1{,}5\\Delta_Q = 13{,}5 - 1{,}5 \\cdot 6{,}5 = 3{,}75');
    expect(fences.lines[1]).toBe('Q_3 + 1{,}5\\Delta_Q = 20 + 1{,}5 \\cdot 6{,}5 = 29{,}75');
    expect(fences.tone).toBe('warn');
    expect(fences.text).toContain('$0$, $34$');
  });

  it('lists squared deviations that add up to n times the variance', () => {
    const { s } = spreadOf(preset('ghe'));
    const rows = deviationRows(s);
    expect(rows).toHaveLength(9);
    expect(rows[0][0]).toBe('0');
    const total = s.sorted.reduce((a, x) => a + (x - s.mean) ** 2, 0);
    expect(total / s.n).toBeCloseTo(s.variance, 9);
  });
});

describe('a sample with no outlier', () => {
  it('says so', () => {
    const { fences } = spreadOf(preset('ghe'));
    expect(fences.tone).toBe('ok');
    expect(fences.text).toContain('[-16{,}25; 37{,}75]');
  });
});
