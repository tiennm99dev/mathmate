import { describe, expect, it } from 'vitest';
import {
  ascending,
  decimalSign,
  decimalWhy,
  firstDiffPlace,
  readDecimal,
  roundDecimal,
  roundWhy,
  toScaled,
  trimZeros,
} from './decimals.js';

describe('decimal helpers', () => {
  it('reads decimals the book way', () => {
    expect(readDecimal('2,47')).toBe('hai phẩy bốn mươi bảy');
    expect(readDecimal('0,05')).toBe('không phẩy không năm');
    expect(readDecimal('0,001')).toBe('không phẩy không không một');
    expect(readDecimal('105,5')).toBe('một trăm linh năm phẩy năm');
    expect(readDecimal('7')).toBe('bảy');
  });

  it('keeps decimals exact', () => {
    expect(toScaled('2,47')).toEqual({ scaled: 247, places: 2 });
    expect(trimZeros('2,500')).toBe('2,5');
    expect(trimZeros('3,00')).toBe('3');
  });

  it('compares decimals lined up at the comma', () => {
    const cases = [
      ['2,47', '3,1', '<', 0],
      ['8,7', '8,65', '>', 1],
      ['0,5', '0,50', '=', null],
      ['12,304', '12,31', '<', 2],
      ['5,07', '5,7', '<', 1],
    ];
    const wrong = cases.filter(
      ([a, b, s, p]) =>
        decimalSign(String(a), String(b)) !== s || firstDiffPlace(String(a), String(b)) !== p,
    );
    expect(wrong).toEqual([]);
    expect(decimalWhy('8,7', '8,65')).toContain('Hàng phần mười: 7 lớn hơn 6');
    expect(ascending(['5,7', '5,07', '5,17', '4,9'])).toEqual(['4,9', '5,07', '5,17', '5,7']);
  });

  it('rounds by the next digit', () => {
    const cases = [
      ['3,47', 1, '3,5'],
      ['3,44', 1, '3,4'],
      ['2,96', 1, '3,0'],
      ['12,5', 0, '13'],
      ['12,49', 0, '12'],
      ['0,125', 2, '0,13'],
      ['4,9', 0, '5'],
      ['7,045', 2, '7,05'],
    ];
    const wrong = cases.filter(([t, p, r]) => roundDecimal(String(t), Number(p)) !== r);
    expect(wrong).toEqual([]);
    expect(roundWhy('3,47', 1)).toBe(
      'Chữ số hàng phần trăm của 3,47 là 7, 7 > 5 nên làm tròn lên. Làm tròn 3,47 đến hàng phần mười được 3,5.',
    );
  });
});
