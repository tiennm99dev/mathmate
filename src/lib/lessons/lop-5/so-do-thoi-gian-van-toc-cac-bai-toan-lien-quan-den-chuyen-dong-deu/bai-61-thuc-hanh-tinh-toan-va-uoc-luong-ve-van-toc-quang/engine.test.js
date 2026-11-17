import { describe, expect, it } from 'vitest';
import {
  RUNS,
  compareText,
  readTime,
  resultFrom,
  resultOptions,
  timingNote,
  trueTime,
  workText,
} from './engine.js';

const MODES = /** @type {const} */ (['van-toc', 'quang-duong']);

describe('pretend stopwatch', () => {
  it('keeps every run short enough to time by hand', () => {
    const bad = MODES.flatMap((m) => RUNS[m]).filter((r) => trueTime(r) < 8 || trueTime(r) > 15);
    expect(bad).toEqual([]);
  });

  it('reads the watch to a tenth of a second', () => {
    expect(readTime(10.26)).toBe(10.3);
    expect(readTime(9.94)).toBe(9.9);
  });

  it('works out the speed rounded to a tenth and the lap exactly', () => {
    const an = RUNS['van-toc'][0];
    expect(resultFrom('van-toc', an, 10)).toBe(5);
    expect(resultFrom('van-toc', an, 10.3)).toBe(4.9);
    expect(workText('van-toc', an, 10.3)).toBe('v = s : t = 50 : 10,3 ≈ 4,9 (m/giây)');
    expect(workText('van-toc', an, 10)).toBe('v = s : t = 50 : 10 = 5 (m/giây)');
    const lan = RUNS['quang-duong'][0];
    expect(resultFrom('quang-duong', lan, 14)).toBe(84);
    expect(resultFrom('quang-duong', lan, 13.7)).toBe(82.2);
    expect(workText('quang-duong', lan, 13.7)).toBe('s = v × t = 6 × 13,7 = 82,2 (m)');
  });

  it('gives the true result when the watch is stopped on the line', () => {
    const bad = MODES.flatMap((m) =>
      RUNS[m].filter((r) => resultFrom(m, r, trueTime(r)) !== (m === 'van-toc' ? r.v : r.s)),
    );
    expect(bad).toEqual([]);
  });

  it('offers four distinct options with the right one marked', () => {
    const bad = [];
    for (const m of MODES) {
      for (const r of RUNS[m]) {
        for (let t = trueTime(r) - 2; t <= trueTime(r) + 3; t += 0.1) {
          const read = readTime(t);
          const { options, answer } = resultOptions(m, r, read);
          const right = resultFrom(m, r, read);
          const shown = Number(options[answer].split(' ')[0].replace(/\s/g, '').replace(',', '.'));
          if (new Set(options).size !== 4 || shown !== right) bad.push(`${m} ${r.who} ${read}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('judges how well the watch was stopped', () => {
    const an = RUNS['van-toc'][0];
    expect(timingNote(an, 10.1).tone).toBe('ok');
    expect(timingNote(an, 9.5).text).toContain('sớm');
    expect(timingNote(an, 10.6).text).toContain('muộn');
    expect(compareText('van-toc', an, 10)).toContain('rất gần');
  });
});
