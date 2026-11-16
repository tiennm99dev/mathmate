import { describe, expect, it } from 'vitest';
import { TASKS, checkMove, checkShift, kindOf, planOf, shiftStrip } from './engine.js';

describe('division board', () => {
  it('ends every task with no remainder and the right quotient', () => {
    const quotients = TASKS.map(([a, b]) => planOf(a, b));
    expect(quotients.filter((p) => p.division.rest !== 0)).toEqual([]);
    expect(quotients.map((p) => p.quotient)).toEqual([
      '2,1',
      '0,17',
      '5,75',
      '2',
      '13,8',
      '64,1',
      '2,4',
      '13',
    ]);
  });

  it('names the four kinds', () => {
    expect(kindOf('8,4', '4')).toBe('Chia số thập phân cho số tự nhiên');
    expect(kindOf('7', '3,5')).toBe('Chia số tự nhiên cho số thập phân');
  });

  it('slides the dividend comma', () => {
    expect(shiftStrip('48,3', 1)).toEqual({ digits: '4830', from: 2, to: 3 });
    expect(shiftStrip('7', 1)).toEqual({ digits: '70', from: 1, to: 2 });
  });

  it('checks the moves', () => {
    expect(checkShift('3,5', 1).ok).toBe(true);
    expect(checkShift('0,52', 1).ok).toBe(false);
    const plan = planOf('8,4', '4');
    const [first, comma] = plan.division.actions;
    expect(checkMove(first, 2, 4, 0).ok).toBe(true);
    expect(checkMove(first, 'comma', 4, 0).ok).toBe(false);
    expect(checkMove(first, 3, 4, 0).text).toContain('8 chia 4 được mấy');
    expect(checkMove(comma, 'comma', 4, 0).ok).toBe(true);
    expect(checkMove(comma, 1, 4, 0).ok).toBe(false);
    const after = plan.division.actions[2];
    expect(checkMove(after, 'comma', 4, 0, true).text).toContain('đã có dấu phẩy');
  });

  it('gives every task the quotient of the two numbers', () => {
    const num = (/** @type {string} */ t) => Number(t.replace(',', '.'));
    const wrong = TASKS.filter(
      ([a, b]) => Math.abs(num(planOf(a, b).quotient) - num(a) / num(b)) > 1e-9,
    );
    expect(wrong).toEqual([]);
  });
});
