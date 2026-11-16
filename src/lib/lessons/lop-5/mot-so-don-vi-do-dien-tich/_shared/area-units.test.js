import { describe, expect, it } from 'vitest';
import { AREA_UNITS, convertSteps, convertText, shiftText } from './area-units.js';

/** @param {string} s */
const g = (s) => s.replace(/(\d) (?=\d{3})/g, '$1 ');

describe('area units', () => {
  it('lists the units of the book, biggest first', () => {
    expect(AREA_UNITS.map((u) => u.symbol)).toEqual(['km²', 'ha', 'm²', 'dm²', 'cm²', 'mm²']);
  });

  it('writes shifted numbers exactly', () => {
    expect(shiftText(54, -4)).toBe('0,0054');
    expect(shiftText(6, 6)).toBe(g('6 000 000'));
    expect(shiftText(2500, -2)).toBe('25');
    expect(shiftText(30, -2)).toBe('0,3');
    expect(shiftText(271, -4)).toBe('0,0271');
    expect(shiftText(1205, -2)).toBe('12,05');
    expect(shiftText(0, 4)).toBe('0');
  });

  it('converts between units', () => {
    expect(convertText(5, 'km²', 'ha')).toBe('500');
    expect(convertText(600, 'ha', 'km²')).toBe('6');
    expect(convertText(3, 'ha', 'm²')).toBe(g('30 000'));
    expect(convertText(1, 'km²', 'm²')).toBe(g('1 000 000'));
    expect(convertText(54, 'm²', 'ha')).toBe('0,0054');
    expect(convertText(271, 'mm²', 'dm²')).toBe('0,0271');
    expect(convertText(1250, 'ha', 'km²', -2)).toBe('0,125');
  });

  it('lists the steps one column at a time', () => {
    expect(convertSteps(3, 'ha', 'm²')).toEqual([
      { unit: 'm²', value: g('30 000'), op: g('× 10 000') },
    ]);
    expect(convertSteps(1, 'km²', 'm²')).toEqual([
      { unit: 'ha', value: '100', op: '× 100' },
      { unit: 'm²', value: g('1 000 000'), op: g('× 10 000') },
    ]);
    expect(convertSteps(900, 'cm²', 'dm²')).toEqual([{ unit: 'dm²', value: '9', op: ': 100' }]);
    expect(convertSteps(54, 'm²', 'ha')).toEqual([
      { unit: 'ha', value: '0,0054', op: g(': 10 000') },
    ]);
    expect(convertSteps(4, 'm²', 'm²')).toEqual([]);
  });
});
