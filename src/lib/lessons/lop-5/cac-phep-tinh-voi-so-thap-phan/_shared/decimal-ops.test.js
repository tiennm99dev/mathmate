import { describe, expect, it } from 'vitest';
import {
  addSub,
  columnPlan,
  commaOptions,
  divisionRows,
  grouped,
  longDivision,
  productPlan,
  productWhy,
  readStrip,
  shiftComma,
  shiftDivision,
  shiftOf,
  shiftRule,
  stripOf,
  trimZeros,
  writtenSpan,
} from './decimal-ops.js';

describe('column addition and subtraction', () => {
  it('adds and subtracts exactly at the comma', () => {
    expect(addSub('45,08', '24,7', '+')).toBe('69,78');
    expect(addSub('0,1', '0,2', '+')).toBe('0,3');
    expect(addSub('45,8', '19,26', '-')).toBe('26,54');
    expect(addSub('7', '2,35', '-')).toBe('4,65');
  });

  it('works each column the book way', () => {
    const plan = columnPlan('45,08', '24,7', '+');
    expect(plan.steps.map((s) => s.say)).toEqual([
      'Hạ 8, viết 8',
      '0 cộng 7 bằng 7, viết 7',
      '5 cộng 4 bằng 9, viết 9',
      '4 cộng 2 bằng 6, viết 6',
    ]);
    const carry = columnPlan('8,75', '6,5', '+');
    expect(carry.steps.map((s) => s.write).join('')).toBe('5215');
    expect(carry.result).toBe('15,25');
  });

  it('fills the minuend with zeros and borrows', () => {
    const plan = columnPlan('7', '2,35', '-');
    expect(plan.top).toBe('7,00');
    expect(plan.steps.map((s) => s.padded)).toEqual([true, true, false]);
    expect(plan.steps[0].say).toBe('0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1');
    expect(plan.steps.map((s) => s.write).join('')).toBe('564');
    const lead = columnPlan('12,5', '9,8', '-');
    expect(lead.result).toBe('2,7');
    expect(lead.steps.at(-1)?.write).toBe('');
  });

  it('offers the comma one place off as mistakes', () => {
    expect(commaOptions('69,78')).toEqual(['69,78', '6,978', '697,8']);
    expect(commaOptions('0,3')[0]).toBe('0,3');
  });
});

describe('multiplication', () => {
  it('splits off the digits after the comma of both factors', () => {
    expect(productPlan('2,5', '1,3').full).toBe('3,25');
    expect(productPlan('0,3', '0,7').full).toBe('0,21');
    expect(productPlan('1,25', '4').product).toBe('5');
    expect(productPlan('12,6', '3').product).toBe('37,8');
    expect(productWhy('2,5', '1,3')).toContain('1 + 1 = 2');
    expect(productWhy('3,05', '2,1')).toContain('305 × 21 = 6\u202f405');
  });
});

describe('moving the comma', () => {
  it('moves it by the factor', () => {
    expect(shiftOf('×', '100')).toBe(2);
    expect(shiftOf('×', '0,01')).toBe(-2);
    expect(shiftOf(':', '1 000')).toBe(-3);
    expect(shiftOf(':', '0,1')).toBe(1);
    expect(shiftComma('5,73', 1)).toBe('57,3');
    expect(shiftComma('0,94', 2)).toBe('94');
    expect(shiftComma('4,3', -2)).toBe('0,043');
    expect(shiftComma('6,3', 2)).toBe('630');
    expect(shiftRule('×', '100')).toBe('Nhân với 100: chuyển dấu phẩy sang bên phải hai chữ số.');
  });

  it('reads a strip with its comma anywhere', () => {
    const strip = stripOf('4,3', 3);
    expect(strip).toEqual({ digits: '00043000', comma: 4 });
    expect(readStrip(strip.digits, strip.comma)).toBe('4,3');
    expect(readStrip(strip.digits, 2)).toBe('0,043');
    expect(readStrip(strip.digits, 7)).toBe('4300');
    expect(writtenSpan(strip.digits, 2)).toEqual([1, 4]);
    const failures = [];
    for (const text of ['4,3', '57,25', '0,6', '128,05']) {
      for (let s = -3; s <= 3; s++) {
        const { digits, comma } = stripOf(text, 3);
        if (readStrip(digits, comma + s) !== shiftComma(text, s)) failures.push([text, s]);
      }
    }
    expect(failures).toEqual([]);
  });
});

describe('long division', () => {
  it('divides a decimal by a natural number', () => {
    const d = longDivision('8,4', 4);
    expect(d.quotient).toBe('2,1');
    expect(d.actions.map((a) => a.kind)).toEqual(['digit', 'comma', 'digit']);
    expect(divisionRows(d.actions, d.actions.length)).toEqual([
      { text: '04', col: 1 },
      { text: '0', col: 1 },
    ]);
  });

  it('writes zeros after the remainder', () => {
    const d = longDivision('23', 4);
    expect(d.quotient).toBe('5,75');
    expect(d.zeros).toBe(2);
    expect(d.rest).toBe(0);
    expect(d.actions[1].say).toBe('Còn dư 3, chia tiếp: viết dấu phẩy vào bên phải 5 ở thương.');
  });

  it('starts with 0 when the whole part is too small', () => {
    expect(longDivision('0,85', 5).quotient).toBe('0,17');
    expect(longDivision('3,5', 7).quotient).toBe('0,5');
  });

  it('turns a decimal divisor into a natural number first', () => {
    const a = shiftDivision('7', '3,5');
    expect([a.dividend, a.divisor]).toEqual(['70', 35]);
    expect(longDivision(a.dividend, a.divisor).quotient).toBe('2');
    const b = shiftDivision('48,3', '3,5');
    expect([b.dividend, b.divisor]).toEqual(['483', 35]);
    expect(longDivision(b.dividend, b.divisor).quotient).toBe('13,8');
    const c = shiftDivision('33,332', '0,52');
    expect([c.dividend, c.divisor]).toEqual(['3333,2', 52]);
    expect(longDivision(c.dividend, c.divisor).quotient).toBe('64,1');
  });

  it('trims the zeros at the end', () => {
    expect(trimZeros('10,0')).toBe('10');
  });
});

describe('grouping', () => {
  it('groups the whole part by threes', () => {
    expect(grouped('3333,2')).toBe('3 333,2');
    expect(grouped('630')).toBe('630');
    expect(shiftDivision('33,332', '0,52').say).toContain('được 3 333,2.');
  });
});
