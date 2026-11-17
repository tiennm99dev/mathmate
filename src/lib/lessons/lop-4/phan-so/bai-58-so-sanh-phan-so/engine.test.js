import { describe, expect, it } from 'vitest';
import { TASKS, compareNote, regroup, regroupTex, signOf, stripsOf, whyText } from './engine.js';

describe('comparing two fractions on stacked strips', () => {
  it('gives the right sign to every task', () => {
    expect(TASKS.map(signOf)).toEqual(['>', '<', '<', '>', '=', '>', '<', '=', '>', '>', '=', '<']);
  });

  it('keeps every task inside its case', () => {
    const bad = TASKS.filter((t) => {
      if (t.kind === 'cung-mau') return t.b !== t.d;
      if (t.kind === 'voi-1') return t.c !== 1 || t.d !== 1;
      const big = Math.max(t.b, t.d);
      const small = Math.min(t.b, t.d);
      return t.b === t.d || big % small !== 0;
    });
    expect(bad).toEqual([]);
  });

  it('brings different denominators to the larger one without changing values', () => {
    const bad = TASKS.filter((t) => t.kind === 'khac-mau').filter((t) => {
      const f = regroup(t);
      return f.b !== f.d || f.a * t.b !== t.a * f.b || f.c * t.d !== t.c * f.d;
    });
    expect(bad).toEqual([]);
    expect(regroupTex(TASKS[5])).toBe(
      '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}',
    );
    expect(stripsOf(TASKS[5], true).map((r) => r.text)).toEqual(['6/8', '5/8']);
  });

  it('draws 1 as a whole strip', () => {
    expect(stripsOf(TASKS[3], false)).toEqual([
      { n: 9, d: 7, text: '9/7' },
      { n: 7, d: 7, text: '1' },
    ]);
  });

  it('explains the sign and answers a wrong tap', () => {
    expect(whyText(TASKS[0])).toBe(
      'Hai phân số cùng mẫu số 7. Tử số: 5 lớn hơn 4. Vậy $\\dfrac{5}{7}$ > $\\dfrac{4}{7}$.',
    );
    expect(whyText(TASKS[2])).toContain('Tử số 12 bé hơn mẫu số 15');
    expect(whyText(TASKS[8])).toContain('tử số 13 lớn hơn 12');
    expect(compareNote(TASKS[0], '>', false).tone).toBe('ok');
    expect(compareNote(TASKS[0], '<', false).tone).toBe('warn');
    expect(compareNote(TASKS[5], null, false).text).toContain('Quy đồng mẫu số');
  });
});
