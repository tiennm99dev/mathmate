import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { KIND_LABELS, UNIT_BANK, buildRound } from './engine.js';

/** @typedef {import('./engine.js').Question} Question */

/** A number written the book's way, as a value: '1 200' → 1200, '3,07' → 3.07. @param {string} t */
const num = (t) => Number(t.replace(/\u202f/g, '').replace(',', '.'));

/** Size of each unit in mm². */
/** @type {Record<string, number>} */
const MM2 = { 'km²': 1e12, ha: 1e10, 'm²': 1e6, 'dm²': 1e4, 'cm²': 100, 'mm²': 1 };

/**
 * The value of an option such as '1 200 dm²' in mm².
 * @param {string} t
 */
function measure(t) {
  const m = /** @type {RegExpMatchArray} */ (t.match(/^([\d\u202f,]+) (\S+)$/));
  return num(m[1]) * MM2[m[2]];
}

/**
 * Whether the stored answer of a question is right, worked out from its
 * prompt without the engine's helpers.
 * @param {Question} q
 */
function check(q) {
  const right = optionText(q.options[q.answer]);
  const p = q.prompt;
  switch (q.kind) {
    case 'km2-ha':
    case 'ha-m2': {
      const m = /** @type {RegExpMatchArray} */ (p.match(/^([\d\u202f]+) (\S+) = \? (\S+)$/));
      return Math.abs(measure(right) - num(m[1]) * MM2[m[2]]) < 1e-6;
    }
    case 'hai-don-vi':
    case 'thap-phan': {
      const m = /** @type {RegExpMatchArray} */ (p.match(/^(\d+) (\S+) (\d+) (\S+) = \? (\S+)$/));
      const total = Number(m[1]) * MM2[m[2]] + Number(m[3]) * MM2[m[4]];
      return Math.abs(measure(right) - total) / total < 1e-9 && right.endsWith(` ${m[5]}`);
    }
    case 'so-sanh': {
      const m = /** @type {RegExpMatchArray} */ (p.match(/^(\d+) ha \? ([\d\u202f]+) m²$/));
      const a = Number(m[1]) * 10000;
      const b = num(m[2]);
      return right === (a > b ? '>' : a < b ? '<' : '=');
    }
    case 'chon-don-vi': {
      const item = UNIT_BANK.find((i) => p.startsWith(i.prompt));
      return item?.unit === right;
    }
    case 'bai-toan': {
      const m = /** @type {RegExpMatchArray} */ (p.match(/dài (\d+) m, rộng (\d+) m/));
      return measure(right) === Number(m[1]) * Number(m[2]) * MM2['m²'];
    }
    default:
      return false;
  }
}

describe('chapter practice round', () => {
  it('has one question of each part with a right stored answer', () => {
    /** @type {string[]} */
    const failures = [];
    for (let seed = 1; seed <= 300; seed++) {
      const round = buildRound(seed);
      const kinds = round.map((q) => q.kind).sort();
      if (kinds.join() !== Object.keys(KIND_LABELS).sort().join()) failures.push(`${seed}: kinds`);
      for (const q of round) {
        const texts = q.options.map(optionText);
        if (!check(q)) failures.push(`${seed} ${q.kind}: ${q.prompt} → ${texts[q.answer]}`);
        if (new Set(texts).size !== texts.length || texts.length < 3) {
          failures.push(`${seed} ${q.kind}: options ${texts.join(' | ')}`);
        }
        if (q.kind !== 'so-sanh' && q.kind !== 'chon-don-vi') {
          const values = texts.map(measure);
          if (new Set(values).size !== values.length) {
            failures.push(`${seed} ${q.kind}: equal values ${texts.join(' | ')}`);
          }
        }
      }
    }
    expect(failures).toEqual([]);
  });

  it('builds the same first round every time', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
