import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { FIRST_DIV, drawDivision, drawMul, isDivKind } from './columns.js';
import { carriesOf } from '#lib/core/kid/column-steps.js';
import {
  quotientText,
  roundLines,
  sheetRows,
  stageMessage,
  stepsOf,
  wrongMessage,
} from './division.js';

/** @param {import('./division.js').Row[]} rows */
const shown = (rows) => rows.map((r) => r.cells.join(''));

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('the division steps', () => {
  it('takes two digits when the first is too small', () => {
    const task = FIRST_DIV.exact;
    expect(stageMessage(task, 0)).toBe('1 bé hơn 6, nên em lấy 12 để chia. 12 chia 6 được mấy?');
    expect(quotientText(task, stepsOf(task).length)).toBe('21412');
  });

  it('ends on the sentence with the remainder and a check', () => {
    const task = FIRST_DIV.rest;
    const end = plain(stageMessage(task, stepsOf(task).length));
    expect(end).toContain('230 859 : 5 = 46 171 (dư 4).');
    expect(end).toContain('Thử lại: 46 171 × 5 = 230 855, 230 855 + 4 = 230 859.');
  });

  it('says why a 0 goes in the quotient', () => {
    const task = FIRST_DIV.zero;
    const steps = stepsOf(task);
    expect(quotientText(task, steps.length)).toBe('70053');
    const zero = steps.findIndex((s) => s.kind === 'digit' && s.digit === 0);
    expect(stageMessage(task, zero + 1)).toContain('Chữ số 0 giữ chỗ hàng nghìn.');
  });

  it('guides a wrong number', () => {
    const task = FIRST_DIV.exact;
    expect(wrongMessage(task, 0, 3, 1)).toContain('Em thử số bé hơn');
    expect(wrongMessage(task, 0, 1, 1)).toContain('Em thử số lớn hơn');
    expect(wrongMessage(task, 1, 3, 1)).toBe('Chưa đúng. Em trừ lại: 12 − 12.');
    expect(wrongMessage(task, 0, 3, 2)).toContain('viết 2');
  });

  it('explains each round by its place', () => {
    const task = FIRST_DIV.rest;
    expect(roundLines(task, stepsOf(task).length)).toEqual([
      '23 chục nghìn : 5 = 4 chục nghìn, còn 3 chục nghìn',
      '30 nghìn : 5 = 6 nghìn',
      '8 trăm : 5 = 1 trăm, còn 3 trăm',
      '35 chục : 5 = 7 chục',
      '9 đơn vị : 5 = 1 đơn vị, còn 4 đơn vị',
    ]);
  });
});

describe('the division sheet', () => {
  it('prints the rounds of 128 472 : 6 in columns', () => {
    const task = FIRST_DIV.exact;
    expect(shown(sheetRows(task, stepsOf(task).length))).toEqual([
      '128472',
      '12',
      '08',
      '6',
      '24',
      '24',
      '07',
      '6',
      '12',
      '12',
      '0',
    ]);
  });

  it('adds up for drawn tasks', () => {
    const rand = rng(38);
    const bad = [];
    for (const kind of /** @type {const} */ (['exact', 'rest', 'zero'])) {
      for (let i = 0; i < 40; i++) {
        const task = drawDivision(rand, kind);
        if (!isDivKind(task.n, task.d, kind)) bad.push(task);
        const steps = stepsOf(task);
        if (Number(quotientText(task, steps.length)) !== Math.floor(task.n / task.d)) {
          bad.push(task);
        }
        if (steps.some((s) => s.answer < 0 || s.answer > 9)) bad.push(task);
        const rows = sheetRows(task, steps.length);
        if (rows.some((r) => r.cells.length !== 6)) bad.push(task);
        if (Number(rows.at(-1)?.cells.join('')) !== task.n % task.d) bad.push(task);
        for (let stage = 0; stage <= steps.length; stage++) {
          if (stageMessage(task, stage).includes('undefined')) bad.push(task);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('drawn multiplications', () => {
  it('keep the product on the board and the carries of their kind', () => {
    const rand = rng(7);
    const bad = [];
    for (const [kind, lo, hi] of /** @type {const} */ ([
      ['plain', 0, 0],
      ['one', 1, 1],
      ['many', 2, 5],
    ])) {
      for (let i = 0; i < 40; i++) {
        const { a, b } = drawMul(rand, kind);
        const carries = carriesOf(a, b, '×');
        if (a * b > 999999 || carries < lo || carries > hi) bad.push({ a, b, kind });
      }
    }
    expect(bad).toEqual([]);
  });
});
