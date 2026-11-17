import { describe, expect, it } from 'vitest';
import { commonDivisors, fracWords, isSimplest, stepTex, versusOne } from '../_shared/fractions.js';
import { TASKS, askText, countOn, shadeNote, toggle } from './engine.js';

describe('reading fractions', () => {
  it('reads them the way the book does', () => {
    expect(fracWords(5, 6)).toBe('năm phần sáu');
    expect(fracWords(3, 4)).toBe('ba phần tư');
    expect(fracWords(4, 7)).toBe('bốn phần bảy');
    expect(fracWords(21, 25)).toBe('hai mươi mốt phần hai mươi lăm');
    expect(fracWords(7, 24)).toBe('bảy phần hai mươi tư');
    expect(fracWords(1, 100)).toBe('một phần một trăm');
  });

  it('compares with 1, finds table divisors and writes a step', () => {
    expect([versusOne(3, 4), versusOne(4, 4), versusOne(5, 4)]).toEqual(['<', '=', '>']);
    expect(isSimplest(3, 4)).toBe(true);
    expect(isSimplest(6, 8)).toBe(false);
    expect(commonDivisors(18, 24)).toEqual([2, 3, 6]);
    expect(commonDivisors(13, 26)).toEqual([]);
    expect(stepTex(3, 4, 2, '×')).toBe(
      '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}',
    );
    expect(stepTex(6, 8, 2, ':')).toBe('\\dfrac{6}{8} = \\dfrac{6 : 2}{8 : 2} = \\dfrac{3}{4}');
  });
});

describe('colouring a fraction', () => {
  it('has tasks a child can do', () => {
    const bad = TASKS.filter(
      (t) =>
        t.want < 1 || t.want > t.parts || (t.shape === 'grid' && t.parts % (t.cols ?? 1) !== 0),
    );
    expect(bad).toEqual([]);
  });

  it('asks in digits or words', () => {
    expect(askText(TASKS[0])).toBe('Tô màu $\\dfrac{5}{6}$ hình tròn.');
    expect(askText(TASKS[1])).toBe('Tô màu ba phần tư băng giấy.');
  });

  it('toggles parts and says how far the child is', () => {
    const task = TASKS[0];
    let shaded = Array(task.parts).fill(false);
    expect(shadeNote(task, 0).tone).toBe('info');
    for (const i of [0, 1, 2, 3, 4]) shaded = toggle(shaded, i);
    expect(countOn(shaded)).toBe(5);
    const ok = shadeNote(task, 5);
    expect(ok.tone).toBe('ok');
    expect(ok.text).toContain('năm phần sáu');
    shaded = toggle(shaded, 5);
    expect(shadeNote(task, countOn(shaded)).tone).toBe('warn');
    shaded = toggle(shaded, 5);
    shaded = toggle(shaded, 0);
    expect(shadeNote(task, countOn(shaded))).toEqual({
      tone: 'info',
      text: 'Em đã tô 4 phần: $\\dfrac{4}{6}$, đọc là bốn phần sáu. Em tô tiếp nhé.',
    });
  });
});
