import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import {
  KIND_LABELS,
  RELATION_OPTIONS,
  RIGHT_HOURS,
  SHAPES,
  SIDES,
  buildRound,
  clockHands,
  parallelSide,
  parallelogramSide,
  perpendicularSide,
  pickShape,
  rhombusSide,
  sideName,
  sideRelation,
  sideSquare,
  trueOrFalse,
  twoLines,
} from './engine.js';

/** @typedef {import('./engine.js').Question} Question */
/** @typedef {import('./engine.js').Shape} Shape */

/**
 * The shape and names of a question drawn as a quadrilateral.
 * @param {Question} q
 */
function quadOf(q) {
  if (q.visual?.type !== 'quad') throw new Error('not a quad');
  return q.visual;
}

/**
 * The index in `SIDES` of the side written `text`.
 * @param {import('./engine.js').Names} names @param {string} text
 */
const sideIndex = (names, text) => SIDES.findIndex((_, i) => sideName(names, i) === text);

/** @param {Question} q */
const answerText = (q) => optionText(q.options[q.answer]);

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);

describe('shapes', () => {
  it('have the side facts their names promise', () => {
    /** @param {Shape} s @param {number} i @param {number} j */
    const rel = (s, i, j) => sideRelation(s, i, j);
    expect([rel('binh-hanh', 0, 2), rel('binh-hanh', 1, 3)]).toEqual(['song-song', 'song-song']);
    expect(sideSquare('binh-hanh', 0)).toBe(sideSquare('binh-hanh', 2));
    expect(sideSquare('binh-hanh', 0)).not.toBe(sideSquare('binh-hanh', 3));
    expect([0, 1, 2, 3].map((i) => sideSquare('thoi', i))).toEqual([25, 25, 25, 25]);
    expect(rel('thoi', 0, 2)).toBe('song-song');
    expect(rel('thoi', 0, 3)).toBe('khac');
    for (const s of /** @type {Shape[]} */ (['thang', 'thang-vuong', 'thang-vuong-phai'])) {
      expect([rel(s, 0, 2), rel(s, 1, 3)]).toEqual(['song-song', 'khac']);
    }
    expect(rel('thang-vuong', 0, 3)).toBe('vuong-goc');
    expect(rel('thang-vuong-phai', 0, 1)).toBe('vuong-goc');
    expect(rel('chu-nhat', 0, 1)).toBe('vuong-goc');
    expect([rel('tu-giac', 0, 2), rel('tu-giac', 1, 3)]).toEqual(['khac', 'khac']);
    expect(Object.keys(SHAPES)).toHaveLength(7);
  });
});

describe('mixed practice', () => {
  it('names how two lines lie', () => {
    const bad = [];
    for (const seed of SEEDS)
      for (const r of /** @type {const} */ (['vuong-goc', 'song-song', 'cat'])) {
        const q = twoLines(rng(seed), r);
        const want = { 'vuong-goc': 0, 'song-song': 1, cat: 2 }[r];
        if (q.answer !== want || q.options.length !== RELATION_OPTIONS.length) bad.push([seed, r]);
      }
    expect(bad).toEqual([]);
  });

  it('finds the one side parallel to the asked side', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = parallelSide(rng(seed));
      const { shape, names } = quadOf(q);
      const asked = sideIndex(names, /Cạnh nào song song với cạnh (\w+)/.exec(q.prompt)?.[1] ?? '');
      const parallel = q.options.filter(
        (o) => sideRelation(shape, asked, sideIndex(names, optionText(o))) === 'song-song',
      );
      if (parallel.length !== 1 || optionText(parallel[0]) !== answerText(q)) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('finds the one side perpendicular to the asked side', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = perpendicularSide(rng(seed));
      const { shape, names } = quadOf(q);
      const asked = sideIndex(names, /Cạnh nào vuông góc với cạnh (\w+)/.exec(q.prompt)?.[1] ?? '');
      const right = q.options.filter(
        (o) => sideRelation(shape, asked, sideIndex(names, optionText(o))) === 'vuong-goc',
      );
      if (right.length !== 1 || optionText(right[0]) !== answerText(q)) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('judges a statement about two sides by the drawn corners', () => {
    const bad = [];
    const answers = new Set();
    for (const seed of SEEDS) {
      const q = trueOrFalse(rng(seed));
      const { shape, names } = quadOf(q);
      const m = /Cạnh (\w+) (song song|vuông góc) với cạnh (\w+)/.exec(q.prompt);
      if (!m) {
        bad.push(seed);
        continue;
      }
      const fact = sideRelation(shape, sideIndex(names, m[1]), sideIndex(names, m[3]));
      const claim = m[2] === 'song song' ? 'song-song' : 'vuong-goc';
      if ((fact === claim) !== (q.answer === 0)) bad.push(seed);
      answers.add(q.answer);
    }
    expect(bad).toEqual([]);
    expect([...answers].sort()).toEqual([0, 1]);
  });

  it('gives the opposite side of a parallelogram', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = parallelogramSide(rng(seed));
      const [, ab, ad] = /có \w+ = (\d+) cm, \w+ = (\d+) cm/.exec(q.prompt) ?? [];
      const asked = /Cạnh (\w+) dài/.exec(q.prompt)?.[1] ?? '';
      const { names } = quadOf(q);
      const want = asked === names[3] + names[2] ? ab : ad;
      if (answerText(q) !== `${want} cm` || new Set(q.options).size !== q.options.length)
        bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('gives a side or the four sides of a rhombus', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = rhombusSide(rng(seed));
      const a = Number(/= (\d+) cm/.exec(q.prompt)?.[1]);
      const want = q.prompt.includes('bốn cạnh') ? 4 * a : a;
      if (answerText(q) !== `${want} cm` || new Set(q.options).size !== q.options.length)
        bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('picks the asked shape, with no wrong option that is also one', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = pickShape(rng(seed));
      const shapes = q.options.map((o) => (typeof o === 'string' ? '' : o.shape));
      const rhombus = q.prompt.includes('hình thoi');
      const fits = shapes.filter((s) =>
        rhombus ? s === 'thoi' : s === 'binh-hanh' || s === 'thoi',
      );
      if (fits.length !== 1 || shapes[q.answer] !== (rhombus ? 'thoi' : 'binh-hanh'))
        bad.push(seed);
      if (q.optionLabels?.some((l) => /hình (thoi|bình hành)/i.test(l))) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('finds the other whole hour with the clock hands at right angles', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const q = clockHands(rng(seed));
      const shown = q.visual?.type === 'clock' ? q.visual.minutes / 60 : 0;
      const hours = q.options.map((o) => Number.parseInt(optionText(o), 10));
      const right = hours.filter((h) => RIGHT_HOURS.includes(h));
      if (right.length !== 1 || right[0] === shown || hours[q.answer] !== right[0]) bad.push(seed);
    }
    expect(bad).toEqual([]);
  });

  it('builds rounds of ten that cover every part, with sound answers', () => {
    const bad = [];
    for (const seed of SEEDS) {
      const round = buildRound(seed);
      const kinds = new Set(round.map((q) => q.kind));
      const texts = round.map((q) => q.options.map(optionText));
      if (round.length !== 10 || kinds.size !== Object.keys(KIND_LABELS).length) bad.push(seed);
      if (
        round.some(
          (q, i) =>
            q.answer < 0 ||
            q.answer >= q.options.length ||
            new Set(texts[i]).size !== texts[i].length,
        )
      )
        bad.push(seed);
    }
    expect(bad).toEqual([]);
    expect(buildRound(7)).toEqual(buildRound(7));
  });
});
