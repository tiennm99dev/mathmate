import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, buildRound } from './engine.js';
import { readDecimal } from '../_shared/decimals.js';

/** @typedef {import('./engine.js').Question} Question */

/** The decimal value of a text such as '8,56 m' or '0,07'. @param {string} text */
const valueOf = (text) => Number(text.replace(/\s.*$/, '').replace(',', '.'));

/** Decimals in a text, as numbers. @param {string} text */
const decimalsIn = (text) => [...text.matchAll(/\d+,\d+/g)].map((m) => valueOf(m[0]));

/**
 * The right option worked out again without the engine's helpers.
 * @param {Question} q
 * @returns {string | number | null}
 */
function expected(q) {
  switch (q.kind) {
    case 'doc-so':
      return readDecimal(/** @type {RegExpMatchArray} */ (q.prompt.match(/\d+,\d+/))[0]);
    case 'phan-so': {
      const v = /** @type {NonNullable<Question['visual']>} */ (q.visual);
      return v.n / v.d;
    }
    case 'so-sanh': {
      const [a, b] = decimalsIn(q.prompt);
      return a > b ? '>' : a < b ? '<' : '=';
    }
    case 'lon-nhat':
      return Math.max(...q.options.map((o) => valueOf(optionText(o))));
    case 'doi-don-vi': {
      const m = /** @type {RegExpMatchArray} */ (q.prompt.match(/^(\d+) (\S+) (\d+) (\S+) =/));
      /** @type {Record<string, number>} */
      const PER = {
        'm cm': 100,
        'm dm': 10,
        'kg g': 1000,
        'tấn kg': 1000,
        'km m': 1000,
        'm² dm²': 100,
      };
      const per = PER[`${m[2]} ${m[4]}`];
      return Number(m[1]) + Number(m[3]) / /** @type {number} */ (per);
    }
    case 'lam-tron': {
      const t = /** @type {RegExpMatchArray} */ (q.prompt.match(/\d+,\d+/))[0];
      const places = q.prompt.includes('số tự nhiên') ? 0 : q.prompt.includes('phần mười') ? 1 : 2;
      // Exact: work on the digits scaled to integers.
      const [w, f] = t.split(',');
      const scaled = Number(w + f);
      const factor = 10 ** (f.length - places);
      const next = Math.floor((scaled % factor) / (factor / 10));
      return (Math.floor(scaled / factor) + (next >= 5 ? 1 : 0)) / 10 ** places;
    }
    case 'bai-toan': {
      const times = [...q.prompt.matchAll(/(An|Bình|Chi) (\d+,\d+) giây/g)];
      const best = times.reduce((m, t) => (valueOf(t[2]) < valueOf(m[2]) ? t : m));
      return best[1];
    }
    default:
      return null;
  }
}

describe('mixed practice of the decimals chapter', () => {
  it('asks one question of each part with a single right answer', () => {
    const bad = [];
    for (let seed = 1; seed <= 60; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) bad.push(seed);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (texts.length < 3 || new Set(texts).size !== texts.length)
          bad.push([seed, q.kind, texts]);
        if (q.answer < 0 || q.answer >= texts.length) bad.push([seed, q.kind, 'answer']);
        if (!q.hint || !q.solution) bad.push([seed, q.kind, 'text']);
        const want = expected(q);
        if (want === null) continue;
        const right = texts[q.answer];
        const ok =
          typeof want === 'number'
            ? Math.abs(valueOf(right) - want) < 1e-9 &&
              texts.filter((t) => Math.abs(valueOf(t) - want) < 1e-9).length === 1
            : right === want;
        if (!ok) bad.push([seed, q.kind, q.prompt, texts, q.answer, want]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('gives the same first round every time', () => {
    expect(buildRound(1).map((q) => q.prompt)).toEqual(buildRound(1).map((q) => q.prompt));
  });
});
