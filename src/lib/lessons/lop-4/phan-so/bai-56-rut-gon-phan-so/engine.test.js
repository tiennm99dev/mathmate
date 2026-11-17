import { describe, expect, it } from 'vitest';
import { gcd } from '#lib/numtheory-engine/index.js';
import {
  TASKS,
  chainTex,
  current,
  hintDivisors,
  isDone,
  missWhy,
  reduceNote,
  startState,
  tryDivide,
} from './engine.js';

describe('reducing a fraction step by step', () => {
  it('can reduce every task with the numbers from 2 to 9', () => {
    const bad = [];
    for (const t of TASKS) {
      let s = startState(t);
      if (isDone(s)) bad.push(`${t.n}/${t.d} starts in lowest terms`);
      for (let i = 0; i < 10 && !isDone(s); i += 1) {
        const hint = hintDivisors(s);
        if (hint.length === 0) bad.push(`${t.n}/${t.d} has no hint`);
        s = tryDivide(s, hint[0] ?? 2);
      }
      const g = gcd(t.n, t.d);
      const f = current(s);
      if (!isDone(s) || f.n !== t.n / g || f.d !== t.d / g)
        bad.push(`${t.n}/${t.d} ends at ${f.n}/${f.d}`);
    }
    expect(bad).toEqual([]);
  });

  it('divides both terms or marks a miss', () => {
    let s = startState({ n: 12, d: 18 });
    s = tryDivide(s, 4);
    expect(s.chain).toHaveLength(1);
    expect(s.misses).toEqual([4]);
    expect(reduceNote(s)).toEqual({
      tone: 'warn',
      text: 'Không chia được: mẫu số 18 không chia hết cho 4. Em chọn số khác nhé.',
    });
    s = tryDivide(s, 2);
    expect(current(s)).toEqual({ n: 6, d: 9 });
    expect(s.misses).toEqual([]);
    expect(reduceNote(s).tone).toBe('info');
    s = tryDivide(s, 3);
    expect(chainTex(s)).toBe('\\dfrac{12}{18} = \\dfrac{6}{9} = \\dfrac{2}{3}');
    expect(reduceNote(s).tone).toBe('ok');
    expect(tryDivide(s, 2)).toBe(s);
  });

  it('names every term that does not divide', () => {
    expect(missWhy({ n: 9, d: 21 }, 2)).toBe('tử số 9 và mẫu số 21 không chia hết cho 2');
    expect(missWhy({ n: 10, d: 15 }, 2)).toBe('mẫu số 15 không chia hết cho 2');
  });
});
