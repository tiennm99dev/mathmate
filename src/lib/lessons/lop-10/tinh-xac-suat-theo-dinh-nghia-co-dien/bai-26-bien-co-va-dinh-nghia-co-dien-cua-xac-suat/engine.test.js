import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { EXPERIMENTS, checkMarks, favourableKeys, summaryText, trialText } from './engine.js';

/** @param {string} id */
const exp = (id) => EXPERIMENTS.find((e) => e.id === id) ?? EXPERIMENTS[0];
/** @param {string} expId @param {string} id */
const ev = (expId, id) => exp(expId).events.find((e) => e.id === id) ?? exp(expId).events[0];

describe('sample-space board', () => {
  it('has the right sample spaces', () => {
    expect(exp('xuc-xac').outcomes).toHaveLength(36);
    expect(exp('the-so').outcomes).toHaveLength(20);
    expect(exp('dong-xu').outcomes).toHaveLength(8);
  });

  it('counts the favourable outcomes', () => {
    /** @type {Array<[string, string, number]>} */
    const cases = [
      ['xuc-xac', 'tong-7', 6],
      ['xuc-xac', 'bang-nhau', 6],
      ['xuc-xac', 'co-mat-6', 11],
      ['xuc-xac', 'tich-chan', 27],
      ['xuc-xac', 'tong-nho-13', 36],
      ['xuc-xac', 'tong-13', 0],
      ['the-so', 'chia-het-3', 6],
      ['the-so', 'nguyen-to', 8],
      ['the-so', 'chinh-phuong', 4],
      ['the-so', 'lon-hon-14', 6],
      ['dong-xu', 'dung-hai-ngua', 3],
      ['dong-xu', 'it-nhat-mot-ngua', 7],
      ['dong-xu', 'cung-mat', 2],
    ];
    const bad = cases.filter(
      ([e, id, k]) =>
        favourableKeys(exp(e), ev(e, id), false).length !== k ||
        favourableKeys(exp(e), ev(e, id), true).length !== exp(e).outcomes.length - k,
    );
    expect(bad).toEqual([]);
  });

  it('judges the marks', () => {
    const dice = exp('xuc-xac');
    const seven = ev('xuc-xac', 'tong-7');
    const right = favourableKeys(dice, seven, false);
    expect(checkMarks(dice, seven, false, right).ok).toBe(true);
    expect(checkMarks(dice, seven, false, right).text).toContain('\\dfrac{6}{36} = \\dfrac{1}{6}');
    const wrong = checkMarks(dice, seven, false, [...right.slice(1), '1,1']);
    expect(wrong.ok).toBe(false);
    expect(wrong.text).toContain('có 1 kết quả đã tô không thuận lợi');
    expect(wrong.text).toContain('còn thiếu 1 kết quả');
  });

  it('names the certain and the impossible event', () => {
    const dice = exp('xuc-xac');
    expect(summaryText(dice, ev('xuc-xac', 'tong-nho-13'), false)).toContain('chắc chắn');
    expect(summaryText(dice, ev('xuc-xac', 'tong-13'), false)).toContain('không thể');
    expect(summaryText(dice, ev('xuc-xac', 'tong-13'), true)).toContain('chắc chắn');
  });

  it('tells whether a trial made the event happen', () => {
    const coins = exp('dong-xu');
    const sss = coins.outcomes[0];
    expect(trialText(ev('dong-xu', 'it-nhat-mot-ngua'), false, sss)).toContain('không xảy ra');
    expect(trialText(ev('dong-xu', 'it-nhat-mot-ngua'), true, sss)).toContain(': biến cố');
  });

  it('writes valid TeX', () => {
    const texts = EXPERIMENTS.flatMap((e) => [
      e.prompt,
      e.omega,
      ...e.events.flatMap((x) => [
        x.text,
        x.opposite,
        summaryText(e, x, false),
        summaryText(e, x, true),
      ]),
    ]);
    expect(strictTexFailures(texts)).toEqual([]);
  });
});
