import { describe, expect, it } from 'vitest';
import { summarize } from '../_shared/sample.js';
import { START, centreLines, centreNote, clampValue, modeText, stackRanks } from './engine.js';

describe('dot plot of the centre measures', () => {
  it('stacks equal values', () => {
    expect(stackRanks([3, 5, 3, 3, 5])).toEqual([0, 0, 1, 2, 1]);
  });

  it('keeps values whole and on the axis', () => {
    expect(clampValue(12.6)).toBe(13);
    expect(clampValue(-4)).toBe(0);
    expect(clampValue(99)).toBe(60);
  });

  it('writes the centre measures of the starting sample', () => {
    const { s, lines } = centreLines(START);
    expect([s.median, s.q1, s.q3]).toEqual([20, 15, 22]);
    expect(lines[0]).toBe('\\overline{x} = \\dfrac{205}{11} \\approx 18{,}64');
    expect(lines[1]).toBe('M_e = x_{6} = 20');
    expect(modeText(s)).toContain('M_o = 20');
  });

  it('averages the two middle values when n is even', () => {
    const { s, lines } = centreLines([1, 2, 3, 4, 5, 6]);
    expect(s.median).toBe(3.5);
    expect(lines[1]).toBe('M_e = \\dfrac{x_{3} + x_{4}}{2} = 3{,}5');
  });

  it('warns when a far value pulls the mean', () => {
    const moved = [...START.slice(0, -1), 60];
    const note = centreNote(summarize(moved));
    expect(note.tone).toBe('warn');
    expect(note.text).toContain('lớn hơn hẳn');
    expect(centreNote(summarize([4, 5, 6, 5])).tone).toBe('ok');
  });

  it('tells samples with no mode or several modes', () => {
    expect(modeText(summarize([1, 2, 3]))).toContain('không có mốt');
    expect(modeText(summarize([1, 1, 2, 3, 3]))).toContain('2 mốt: 1 và 3');
  });
});
