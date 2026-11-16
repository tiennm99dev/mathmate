import { describe, expect, it } from 'vitest';
import { readWhole, roundTo, sumText } from '#lib/core/kid/whole-numbers.js';
import {
  CHALLENGES,
  challengeNote,
  classHeads,
  clear,
  digitsFor,
  emptyFor,
  facts,
  numberOf,
  parityText,
  place,
  reading,
} from './engine.js';

describe('natural numbers of the millions class', () => {
  it('reads the book numbers', () => {
    expect(readWhole(20112024)).toBe(
      'hai mươi triệu một trăm mười hai nghìn không trăm hai mươi tư',
    );
    expect(readWhole(26400500)).toBe('hai mươi sáu triệu bốn trăm nghìn năm trăm');
    expect(readWhole(1730539)).toBe('một triệu bảy trăm ba mươi nghìn năm trăm ba mươi chín');
  });

  it('splits into places and rounds to hundred thousands', () => {
    expect(sumText(1730539)).toBe('1 730 539 = 1 000 000 + 700 000 + 30 000 + 500 + 30 + 9');
    expect(roundTo(2545000, 100000)).toBe(2500000);
    expect(roundTo(2545000, 10000)).toBe(2550000);
    expect(roundTo(26450000, 100000)).toBe(26500000);
  });

  it('tells even and odd', () => {
    expect(parityText(968743)).toBe('Chữ số hàng đơn vị là 3, nên 968 743 là số lẻ.');
    expect(parityText(2030)).toBe('Chữ số hàng đơn vị là 0, nên 2 030 là số chẵn.');
  });
});

describe('the table', () => {
  it('groups columns by class', () => {
    expect(classHeads(1730539)).toEqual([
      { cls: 2, name: 'Lớp triệu', span: 1 },
      { cls: 1, name: 'Lớp nghìn', span: 3 },
      { cls: 0, name: 'Lớp đơn vị', span: 3 },
    ]);
    expect(classHeads(504842).map((h) => h.span)).toEqual([3, 3]);
  });

  it('places, replaces and takes out cards', () => {
    const empty = emptyFor(504842);
    const one = place(empty, 0, 4);
    expect(one[0]).toBe(4);
    expect(place(one, 0, 5)[0]).toBe(5);
    expect(clear(one, 0)).toEqual(empty);
    expect(place(empty, 6, 1)).toEqual(empty);
  });

  it('writes a number only when every column is filled and the first is not 0', () => {
    expect(numberOf([0, 0, 4, 8, 4, 2])).toBeNull();
    expect(reading([0, 0, 4, 8, 4, 2])).toMatch(/phải khác 0/);
    expect(numberOf([5, 0, 4, 8, 4, 2])).toBe(504842);
    expect(reading([5, 0, 4, 8, 4, 2])).toBe(
      '504 842 đọc là: năm trăm linh bốn nghìn tám trăm bốn mươi hai.',
    );
  });

  it('tells the facts of a full table', () => {
    expect(facts(digitsFor(863749))).toEqual([
      '863 749 = 800 000 + 60 000 + 3 000 + 700 + 40 + 9',
      'Chữ số hàng đơn vị là 9, nên 863 749 là số lẻ.',
      'Chữ số hàng chục nghìn của 863 749 là 6, 6 > 5 nên làm tròn lên. Làm tròn 863 749 đến hàng trăm nghìn được 900 000.',
    ]);
    expect(facts([1, null])).toEqual([]);
  });

  it('checks every challenge without giving a digit away', () => {
    const wrong = [];
    for (const n of CHALLENGES) {
      if (challengeNote(digitsFor(n), n).tone !== 'ok') wrong.push(n);
    }
    expect(wrong).toEqual([]);
    const slots = place(emptyFor(20112024), 1, 1);
    expect(challengeNote(slots, 20112024).text).toBe(
      'Thẻ ở cột Triệu chưa đúng. Em nghe lại tên số nhé.',
    );
  });
});
