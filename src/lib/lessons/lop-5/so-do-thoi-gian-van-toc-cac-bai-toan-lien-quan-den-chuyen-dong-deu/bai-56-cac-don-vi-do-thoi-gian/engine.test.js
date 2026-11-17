import { describe, expect, it } from 'vitest';
import {
  LADDERS,
  TASKS,
  linkKey,
  linkLabel,
  linkOf,
  moveText,
  movesFor,
  slipText,
  stepText,
  taskText,
  valuesOf,
} from './engine.js';

describe('the time unit ladder', () => {
  it('knows the table of time units', () => {
    expect(linkOf('thế kỉ', 'năm')).toEqual({ factor: 100, down: true });
    expect(linkOf('năm', 'tháng')).toEqual({ factor: 12, down: true });
    expect(linkOf('ngày', 'tuần')).toEqual({ factor: 7, down: false });
    expect(linkOf('ngày', 'giờ')).toEqual({ factor: 24, down: true });
    expect(linkOf('giây', 'phút')).toEqual({ factor: 60, down: false });
    expect(() => linkOf('giờ', 'giây')).toThrow();
  });

  it('works every task out rung by rung', () => {
    expect(TASKS.map((t) => valuesOf(t).at(-1))).toEqual([
      120, 180, 14, 36, 90, 200, 3, 12, 4, 1440,
    ]);
    expect(valuesOf(TASKS[9])).toEqual([1, 24, 1440]);
  });

  it('keeps every task on a ladder with neighbouring units', () => {
    const bad = TASKS.filter((t) =>
      t.path.slice(1).some((u, i) => {
        try {
          linkOf(t.path[i], u);
          return !LADDERS.some((l) => l.includes(u) && l.includes(t.path[i]));
        } catch {
          return true;
        }
      }),
    );
    expect(bad).toEqual([]);
  });

  it('offers four distinct moves with the right one among them', () => {
    const bad = [];
    for (const t of TASKS) {
      for (let i = 1; i < t.path.length; i++) {
        const moves = movesFor(t.path[i - 1], t.path[i]).map(moveText);
        const right = linkOf(t.path[i - 1], t.path[i]);
        if (new Set(moves).size !== 4 || !moves.includes(moveText(right))) bad.push(moves);
      }
    }
    expect(bad).toEqual([]);
    expect(movesFor('giờ', 'phút').map(moveText)).toEqual(['× 24', '× 60', ': 60', '× 100']);
  });

  it('writes the steps and the slips', () => {
    expect(taskText(TASKS[4])).toBe('1,5 giờ = ? phút');
    expect(stepText(TASKS[4], 1)).toBe('1,5 giờ = 1,5 × 60 phút = 90 phút.');
    expect(stepText(TASKS[6], 1)).toBe('180 phút = 180 : 60 giờ = 3 giờ.');
    expect(slipText('giờ', 'phút', { down: false, factor: 60 })).toContain('phép nhân');
    expect(slipText('giây', 'phút', { down: true, factor: 60 })).toContain('phép chia');
    expect(slipText('giờ', 'phút', { down: true, factor: 24 })).toBe(
      '1 giờ không bằng 24 phút. Em nhớ lại bảng đơn vị đo thời gian.',
    );
  });

  it('shows a link once it is found, whichever way', () => {
    const found = new Set([linkKey('phút', 'giờ')]);
    expect(linkLabel('giờ', 'phút', found)).toBe('1 giờ = 60 phút');
    expect(linkLabel('ngày', 'giờ', found)).toBe('?');
  });
});
