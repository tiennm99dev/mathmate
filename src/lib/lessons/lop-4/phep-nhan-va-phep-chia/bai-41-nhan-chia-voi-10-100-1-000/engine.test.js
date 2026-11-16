import { describe, expect, it } from 'vitest';
import { GROUP } from '#lib/core/number-format.js';
import {
  MOVES,
  PUZZLES,
  TITLES,
  apply,
  cellsOf,
  fewestMoves,
  goalText,
  moveText,
} from './engine.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('the place table', () => {
  it('runs from hàng triệu to hàng đơn vị', () => {
    expect(TITLES[0]).toBe('Triệu');
    expect(TITLES.at(-1)).toBe('Đơn vị');
    expect(cellsOf(3600)).toEqual(['', '', '', '3', '6', '0', '0']);
  });

  it('writes the moves', () => {
    expect(MOVES.map((m) => plain(moveText(m)))).toEqual([
      '× 10',
      '× 100',
      '× 1 000',
      ': 10',
      ': 100',
      ': 1 000',
    ]);
  });
});

describe('the moves', () => {
  it('adds zeros when multiplying', () => {
    const r = apply(36, { op: '×', zeros: 2 });
    expect(r.ok && r.value).toBe(3600);
    expect(plain(r.text)).toBe(
      '36 × 100 = 3 600. Mỗi chữ số dịch sang trái 2 hàng: em viết thêm hai chữ số 0 vào bên phải.',
    );
  });

  it('drops zeros when dividing a round number', () => {
    const r = apply(36000, { op: ':', zeros: 3 });
    expect(r.ok && r.value).toBe(36);
    expect(plain(r.text)).toContain('em bớt đi ba chữ số 0 ở bên phải.');
  });

  it('refuses what the lesson cannot do', () => {
    expect(apply(4536, { op: ':', zeros: 1 })).toEqual({
      ok: false,
      text: `4${GROUP}536 không phải số tròn chục, em chưa chia nhẩm cho 10 được.`,
    });
    expect(apply(45000, { op: '×', zeros: 3 }).ok).toBe(false);
  });

  it('can solve every puzzle within the table', () => {
    expect(PUZZLES.map((p) => fewestMoves(p.start, p.goal))).toEqual([1, 1, 1, 2, 2, 1]);
  });

  it('points the way to the goal', () => {
    expect(plain(goalText(36, 3600))).toBe('Em cần được 3 600. Bây giờ là 36: em thử nhân nhé.');
    expect(goalText(45, 45)).toBe('Đúng rồi! Em đã được 45.');
  });
});
