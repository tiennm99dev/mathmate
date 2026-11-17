import { describe, expect, it } from 'vitest';
import { optionText } from '#lib/core/kid/quiz.js';
import { allShow } from '../_shared/cubes.js';
import { KIND_LABELS, buildRound } from './engine.js';

const FACTORS = { 'm³': 1e6, 'dm³': 1e3, 'cm³': 1 };

/** @param {string} text '2 650' or '0,25' with any spaces */
const read = (text) => Number(text.replace(/\s/g, '').replace(',', '.'));

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const rounds = SEEDS.map((s) => buildRound(s));

describe('chapter practice round', () => {
  it('asks one question of each part', () => {
    const bad = rounds.filter(
      (r) =>
        r.length !== Object.keys(KIND_LABELS).length ||
        new Set(r.map((q) => q.kind)).size !== r.length,
    );
    expect(bad).toEqual([]);
  });

  it('gives distinct options with the answer among them', () => {
    const bad = rounds.flat().filter((q) => {
      const texts = q.options.map(optionText);
      return (
        new Set(texts).size !== texts.length ||
        texts.length < 2 ||
        !(q.answer >= 0 && q.answer < texts.length)
      );
    });
    expect(bad.map((q) => q.prompt)).toEqual([]);
  });

  it('converts every measure right', () => {
    const bad = rounds
      .flat()
      .filter((q) => /^[\d\s,]+ (m³|dm³|cm³) = \? (m³|dm³|cm³)$/u.test(q.prompt))
      .filter((q) => {
        const m = /^([\d\s,]+) (\S+) = \? (\S+)$/u.exec(q.prompt);
        if (!m) return true;
        const [, value, from, to] = m;
        const want =
          (read(value) * FACTORS[/** @type {'m³'} */ (from)]) / FACTORS[/** @type {'m³'} */ (to)];
        const got = optionText(q.options[q.answer]);
        return Math.abs(read(got.replace(` ${to}`, '')) - want) > 1e-9 || !got.endsWith(to);
      })
      .map((q) => q.prompt);
    expect(bad).toEqual([]);
  });

  it('counts the cubes of the shapes it draws', () => {
    const bad = rounds
      .flat()
      .filter((q) => q.kind === 'so-sanh-hinh' || q.kind === 'dem-khoi')
      .filter((q) => {
        const shapes = q.visual?.shapes ?? [];
        if (q.kind === 'dem-khoi') {
          return (
            read(optionText(q.options[q.answer]).replace(' cm³', '')) !== shapes[0].cubes.length
          );
        }
        const [a, b] = shapes.map((s) => s.cubes.length);
        const want = a > b ? 0 : a < b ? 1 : 2;
        return q.answer !== want || !shapes.every((s) => allShow(s.cubes));
      });
    expect(bad.map((q) => q.solution)).toEqual([]);
  });

  it('works out the crate problem', () => {
    const bad = rounds
      .flat()
      .filter((q) => q.kind === 'bai-toan')
      .filter((q) => {
        const [a, b, c] = [...q.prompt.matchAll(/(\d+) dm,?/g)].map((m) => Number(m[1]));
        return read(optionText(q.options[q.answer]).replace(' hộp', '')) !== a * b * c;
      });
    expect(bad).toEqual([]);
  });

  it('builds the same first round every time', () => {
    expect(buildRound(1)).toEqual(buildRound(1));
  });
});
