import { describe, expect, it } from 'vitest';
import { PAIRS, checkColumn, checkSign, columnsOf } from './engine.js';
import { decimalSign, firstDiffPlace } from '../_shared/decimals.js';

describe('comparing at the comma', () => {
  it('lines the digits up with faded zeros', () => {
    const cols = columnsOf('8,7', '8,65');
    expect(cols.map((c) => c.title)).toEqual(['Phần nguyên', 'Phần mười', 'Phần trăm']);
    expect(cols[2]).toMatchObject({ top: '0', topAdded: true, bottom: '5', bottomAdded: false });
  });

  it('accepts only the first differing column and the right sign', () => {
    const bad = [];
    for (const [a, b] of PAIRS) {
      const right = firstDiffPlace(a, b);
      const places = [null, ...columnsOf(a, b).map((c) => c.place)];
      const ok = places.filter((p) => checkColumn(a, b, p).ok);
      if (ok.length !== 1 || ok[0] !== right) bad.push(`${a} ${b}`);
      const signs = /** @type {const} */ (['>', '<', '=']).filter((s) => checkSign(a, b, s).ok);
      if (signs.length !== 1 || signs[0] !== decimalSign(a, b)) bad.push(`${a} ${b} sign`);
    }
    expect(bad).toEqual([]);
    expect(decimalSign('2001,2', '1999,7')).toBe('>');
    expect(decimalSign('78,469', '78,5')).toBe('<');
    expect(decimalSign('630,72', '630,70')).toBe('>');
    expect(decimalSign('0,7', '0,65')).toBe('>');
  });
});
