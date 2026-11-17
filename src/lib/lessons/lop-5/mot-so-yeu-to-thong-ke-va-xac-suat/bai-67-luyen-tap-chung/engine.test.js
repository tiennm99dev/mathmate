import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound, pieShares } from './engine.js';

/** @param {string} text */
const num = (text) => Number(text.replaceAll(GROUP, '').replace('%', '').replace(',', '.'));
/** @param {string} text */
const list = (text) => text.split('; ').map(num);

describe('the pie shares', () => {
  it('gives different multiples of 5 adding up to 100', () => {
    const bad = [];
    const rand = rng(9);
    for (let k = 0; k < 200; k++) {
      const parts = pieShares(rand, k % 2 ? 3 : 4);
      const ok =
        parts.reduce((a, b) => a + b, 0) === 100 &&
        new Set(parts).size === parts.length &&
        parts.every((p) => p > 0 && p % 5 === 0);
      if (!ok) bad.push(parts);
    }
    expect(bad).toEqual([]);
  });
});

describe('the mixed practice round', () => {
  it('asks one question of each part with distinct options', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      const round = buildRound(seed);
      if (
        round
          .map((q) => q.kind)
          .sort()
          .join() !== Object.keys(KIND_LABELS).sort().join()
      ) {
        bad.push([seed, 'kinds']);
      }
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts.length < 2 || new Set(texts).size !== texts.length)
          bad.push([seed, q.kind, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
      }
    }
    expect(bad).toEqual([]);
  });

  it('stores the true answer to every question', () => {
    const bad = [];
    for (let seed = 1; seed <= 80; seed++) {
      for (const q of buildRound(seed)) {
        const said = optionText(q.options[q.answer]);
        const v = q.visual;
        if (q.kind === 'sap-xep' && v?.type === 'seq') {
          const up = q.prompt.includes('từ bé đến lớn');
          const want = [...v.values].sort((a, b) => (up ? a - b : b - a));
          if (list(said).join() !== want.join()) bad.push([seed, q.kind]);
        }
        if (q.kind === 'phan-loai' && v?.type === 'seq') {
          const cut = num(/dưới ([\d,]+)/.exec(q.prompt)?.[1] ?? 'x');
          const n = v.values.filter((x) => x < cut).length;
          if (num(said) !== n || n === 0 || n === v.values.length) bad.push([seed, q.kind]);
        }
        if (q.kind === 'doc-quat' && v?.type === 'pie') {
          const values = v.data.map((d) => d.value);
          const target = q.prompt.includes('nhiều') ? Math.max(...values) : Math.min(...values);
          if (v.data.find((d) => d.label === said)?.value !== target) bad.push([seed, q.kind]);
        }
        if (q.kind === 'phan-con-lai' && v?.type === 'parts') {
          const known = v.rows.filter((r) => r.text !== '?').reduce((a, r) => a + num(r.text), 0);
          if (num(said) !== 100 - known) bad.push([seed, q.kind]);
        }
        if (q.kind === 'tinh-so' && v?.type === 'pie') {
          const m = /Có tất cả ([\d\s\u202f]+) .*\. (.+) có bao nhiêu/.exec(q.prompt);
          const total = num(m?.[1]?.trim() ?? 'x');
          const share = v.data.find((d) => d.label === m?.[2])?.value ?? NaN;
          const want = (total * share) / 100;
          if (num(said) !== want || !Number.isInteger(want)) bad.push([seed, q.kind, q.prompt]);
        }
        if (q.kind === 'ti-so' && v?.type === 'table') {
          const label = /"(.+)"/.exec(q.prompt)?.[1];
          const total = v.rows.reduce((a, r) => a + r.count, 0);
          const count = v.rows.find((r) => r.label === label)?.count;
          if (said !== `${count}/${total}`) bad.push([seed, q.kind]);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
