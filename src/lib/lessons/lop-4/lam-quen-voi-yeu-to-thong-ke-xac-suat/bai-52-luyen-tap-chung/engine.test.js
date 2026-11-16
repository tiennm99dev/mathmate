import { describe, expect, it } from 'vitest';
import { KIND_LABELS, buildRound } from './engine.js';
import { GROUP } from '#lib/core/number-format.js';

/** @param {string} text */
const num = (text) => Number(text.replaceAll(GROUP, ''));
/** @param {string} text */
const list = (text) => text.split(', ').map(num);

describe('the mixed practice round', () => {
  it('asks one question of each part with distinct options', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push([seed, 'kinds']);
      for (const q of round) {
        const texts = q.options.map(String);
        if (texts.length < 2 || new Set(texts).size !== texts.length) bad.push([seed, q.kind]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the true answer to every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      for (const q of buildRound(seed)) {
        const said = String(q.options[q.answer]);
        const v = q.visual;
        if (q.kind === 'doc-day' && v?.type === 'seq') {
          const k = Number(/Số thứ (\d+)/.exec(q.prompt)?.[1]);
          if (num(said) !== v.values[k - 1]) bad.push([seed, q.kind]);
        }
        if (q.kind === 'sap-xep' && v?.type === 'seq') {
          const up = q.prompt.includes('từ bé đến lớn');
          const want = [...v.values].sort((a, b) => (up ? a - b : b - a));
          if (list(said).join() !== want.join()) bad.push([seed, q.kind]);
        }
        if (q.kind === 'nhieu-hon' && v?.type === 'seq') {
          const n = v.values.filter((x) => x > 100000).length;
          if (num(said) !== n || n === 0 || n === v.values.length) bad.push([seed, q.kind]);
        }
        if (q.kind === 'trung-binh' && v?.type === 'seq') {
          const mean = v.values.reduce((s, x) => s + x, 0) / v.values.length;
          if (num(said) !== mean || v.values.some((x) => x < 1)) bad.push([seed, q.kind]);
        }
        if (q.kind === 'bieu-do' && v?.type === 'chart') {
          const m = /Cột (.+) biểu diễn nhiều hơn cột (.+) bao nhiêu/.exec(q.prompt);
          const a = v.data.find((d) => d.label === m?.[1])?.value ?? NaN;
          const b = v.data.find((d) => d.label === m?.[2])?.value ?? NaN;
          if (num(said) !== a - b || !(a > b)) bad.push([seed, q.kind]);
        }
        if (q.kind === 'cot-cao' && v?.type === 'chart') {
          const values = v.data.map((d) => d.value);
          const target = q.prompt.includes('nhiều') ? Math.max(...values) : Math.min(...values);
          if (v.data.find((d) => d.label === said)?.value !== target) bad.push([seed, q.kind]);
        }
        if (q.kind === 'kiem-dem' && v?.type === 'tally') {
          const row = v.rows.find((r) => q.prompt.includes(`"${r.label}"`));
          if (num(said) !== row?.count) bad.push([seed, q.kind]);
        }
        if (q.kind === 'su-kien') {
          const color = q.prompt.split('. ')[0].split(' ').pop() ?? '?';
          if (!said.endsWith(` ${color}`)) bad.push([seed, q.kind, q.prompt, said]);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
