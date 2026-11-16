import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import {
  SEQUENCES,
  isOrdered,
  listText,
  moveCard,
  sequenceQuestions,
  sortMessage,
  sortedValues,
  swapCards,
  wrongPairs,
} from './sequence.js';
import { CHARTS, chartQuestions, drawMessage, rightBars, startBars } from './charts.js';
import { EXPERIMENTS, MAX_TRIALS, runTrials, tallyText, trial } from './experiments.js';

/** @param {import('#lib/core/kid/quiz.js').KidQuestion} q */
const said = (q) => String(q.options[q.answer]);

describe('data sequences', () => {
  it('tells an ordered row from an unordered one, equal neighbours allowed', () => {
    expect(isOrdered([1, 2, 2, 2, 3], 'tang')).toBe(true);
    expect(isOrdered([13, 8, 5, 4, 1], 'giam')).toBe(true);
    expect(isOrdered([5, 13, 1, 8, 4], 'tang')).toBe(false);
    expect(wrongPairs([5, 13, 1, 8, 4], 'tang')).toBe(2);
    expect(sortedValues([5, 13, 1, 8, 4], 'tang')).toEqual([1, 4, 5, 8, 13]);
    expect(listText(sortedValues([5, 13, 1, 8, 4], 'giam'))).toBe('13, 8, 5, 4, 1');
  });

  it('moves and swaps cards', () => {
    expect(moveCard([0, 1, 2, 3], 0, 2)).toEqual([1, 2, 0, 3]);
    expect(moveCard([0, 1, 2, 3], 3, 0)).toEqual([3, 0, 1, 2]);
    expect(moveCard([0, 1, 2], 1, 1)).toEqual([0, 1, 2]);
    expect(swapCards([0, 1, 2], 0, 2)).toEqual([2, 1, 0]);
  });

  it('says when a row is sorted', () => {
    expect(sortMessage([1, 4, 5, 8, 13], 'tang')).toContain('Đúng rồi');
    expect(sortMessage([4, 1], 'tang')).toContain('Còn 1 chỗ');
  });

  it('stores the true answers to the questions on every sequence', () => {
    const bad = [];
    for (const seq of SEQUENCES) {
      for (let seed = 1; seed <= 30; seed++) {
        const qs = sequenceQuestions(seq, rng(seed));
        const v = seq.values;
        const k = Number(/Số thứ (\d+)/.exec(qs[1].prompt)?.[1]);
        const t = Number(/lớn hơn (\d+)/.exec(qs[4].prompt)?.[1]);
        if (said(qs[0]) !== String(v.length)) bad.push([seq.id, seed, 'count']);
        if (said(qs[1]) !== String(v[k - 1])) bad.push([seq.id, seed, 'k-th']);
        if (said(qs[2]) !== String(Math.max(...v))) bad.push([seq.id, seed, 'max']);
        if (said(qs[3]) !== String(Math.min(...v))) bad.push([seq.id, seed, 'min']);
        const above = v.filter((x) => x > t).length;
        if (said(qs[4]) !== String(above) || above === 0) bad.push([seq.id, seed, 'above']);
        for (const q of qs) {
          if (q.options.length < 2 || new Set(q.options.map(String)).size !== q.options.length) {
            bad.push([seq.id, seed, 'options', q.prompt]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('column charts', () => {
  it('starts with the given columns drawn and checks every column', () => {
    const chart = CHARTS[1];
    const bars = startBars(chart);
    expect(bars.map((b) => b.value)).toEqual([35, 50, 0, 0, 0]);
    expect(rightBars(chart, bars)).toEqual([true, true, false, false, false]);
    expect(drawMessage(chart, bars)).toContain('Còn 3 cột');
    const full = chart.values.map((value, i) => ({ label: chart.labels[i], value }));
    expect(drawMessage(chart, full)).toContain('Đúng rồi');
  });

  it('keeps every value on the step and under the axis top', () => {
    const bad = CHARTS.filter((c) => c.values.some((v) => v % c.step !== 0 || v > c.max));
    expect(bad).toEqual([]);
  });

  it('stores the true answers to the questions on every chart', () => {
    const bad = [];
    for (const chart of CHARTS) {
      for (let seed = 1; seed <= 20; seed++) {
        const qs = chartQuestions(chart, rng(seed));
        const v = chart.values;
        const i = chart.labels.findIndex((l) => qs[0].prompt.includes(`Cột ${l} `));
        const max = Math.max(...v);
        const min = Math.min(...v);
        if (said(qs[0]).replaceAll(GROUP, '') !== String(v[i])) bad.push([chart.id, 'value']);
        if (v[chart.labels.indexOf(said(qs[1]))] !== max) bad.push([chart.id, 'most']);
        if (v[chart.labels.indexOf(said(qs[2]))] !== min) bad.push([chart.id, 'least']);
        if (said(qs[3]).replaceAll(GROUP, '') !== String(max - min)) bad.push([chart.id, 'diff']);
        if (chart.per) {
          const avg = v.reduce((s, x) => s + x, 0) / v.length;
          if (said(qs[4]).replaceAll(GROUP, '') !== String(avg)) bad.push([chart.id, 'average']);
        }
        for (const q of qs) {
          if (new Set(q.options.map(String)).size !== q.options.length) {
            bad.push([chart.id, 'options', q.prompt]);
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });
});

describe('chance experiments', () => {
  it('draws each outcome by its weight', () => {
    const balls = EXPERIMENTS.find((e) => e.id === 'hop-bong');
    if (!balls) throw new Error('missing');
    expect(trial(balls, 0)).toBe(0);
    expect(trial(balls, 0.74)).toBe(0);
    expect(trial(balls, 0.76)).toBe(1);
  });

  it('counts the trials and stops at the table limit', () => {
    const coin = EXPERIMENTS[0];
    const once = runTrials(coin, [0, 0], 10, rng(4));
    expect(once.counts.reduce((s, c) => s + c, 0)).toBe(10);
    const full = runTrials(coin, once.counts, 500, rng(5));
    expect(full.counts.reduce((s, c) => s + c, 0)).toBe(MAX_TRIALS);
    expect(runTrials(coin, full.counts, 1, rng(6)).last).toBe(null);
  });

  it('reads the tally', () => {
    const coin = EXPERIMENTS[0];
    expect(tallyText(coin, [0, 0])).toContain('mặt sấp hoặc mặt ngửa');
    expect(tallyText(coin, [9, 11])).toBe(
      'Đã tung 20 lần. Số lần xuất hiện: mặt sấp 9 lần, mặt ngửa 11 lần. Sự kiện mặt ngửa xuất hiện nhiều lần hơn.',
    );
    expect(tallyText(coin, [5, 5])).toContain('bằng nhau');
  });
});
