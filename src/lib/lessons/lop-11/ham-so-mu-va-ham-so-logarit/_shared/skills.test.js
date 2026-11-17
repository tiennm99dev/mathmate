import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { numberText, readNumber } from '#lib/core/decimal.js';
import {
  CHAPTER_SKILLS,
  hamso,
  linTex,
  logarit,
  luythua,
  phuongtrinh,
  valueTex,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 300) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** @param {string} tex '8', '-2', '\\dfrac{1}{8}' */
function value(tex) {
  const f = /^(-?)\\dfrac\{(\d+)\}\{(\d+)\}$/.exec(tex);
  if (f) return (f[1] ? -1 : 1) * (Number(f[2]) / Number(f[3]));
  return Number(tex);
}

/** @param {string} tex 'x', '-x', '2x - 3' → [p, q] */
function lin(tex) {
  const m = /^(-?\d*)x(?: ([+-]) (\d+))?$/.exec(tex);
  if (!m) throw new Error(`not linear: ${tex}`);
  const p = m[1] === '' ? 1 : m[1] === '-' ? -1 : Number(m[1]);
  const q = m[2] ? (m[2] === '-' ? -1 : 1) * Number(m[3]) : 0;
  return [p, q];
}

/**
 * Whether the stored answer solves the question, recomputed from the prompt.
 * @param {string} p @param {number} ans
 */
function solves(p, ans) {
  const close = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 1e-9;
  let m = /^Tính \$(\d+)\^\{(-?)\\frac\{(\d+)\}\{(\d+)\}\}\$/.exec(p);
  if (m) return close(Number(m[1]) ** (((m[2] ? -1 : 1) * Number(m[3])) / Number(m[4])), ans);
  m = /\\dfrac\{2\^\{(-?\d+)\} \\cdot 2\^\{(-?\d+)\}\}\{2\^\{(-?\d+)\}\}/.exec(p);
  if (m) return close(2 ** (Number(m[1]) + Number(m[2]) - Number(m[3])), ans);
  m = /^Tính \$\\log_6 (\d+) \+ \\log_6 (\d+)\$/.exec(p);
  if (m) return close(6 ** ans, Number(m[1]) * Number(m[2]));
  m = /^Tính \$\\log_\{(\d+)\} (.+?)\$/.exec(p);
  if (m) return close(Number(m[1]) ** ans, value(m[2]));
  m = /y = a\^x.*\$\((\d+); (\d+)\)\$/.exec(p);
  if (m) return ans > 0 && close(ans ** Number(m[1]), Number(m[2]));
  m = /y = \\log_a x.*\$\((\d+); (\d+)\)\$/.exec(p);
  if (m) return ans > 0 && close(ans ** Number(m[2]), Number(m[1]));
  m = /y = \\log_2 \((.+?)\)\$/.exec(p);
  if (m) {
    const [a, b] = lin(m[1]);
    return a > 0 && close(a * ans + b, 0);
  }
  m = /^Giải phương trình \$(\d)\^\{(.+?)\} = (.+?)\$/.exec(p);
  if (m) {
    const [a, b] = lin(m[2]);
    return close(Number(m[1]) ** (a * ans + b), value(m[3]));
  }
  m = /^Giải phương trình \$\\log_\{(\d)\} \((.+?)\) = (\d+)\$/.exec(p);
  if (m) {
    const [a, b] = lin(m[2]);
    const u = a * ans + b;
    return u > 0 && close(Math.log(u) / Math.log(Number(m[1])), Number(m[3]));
  }
  m = /\\right\)\^x > (\d+)\$/.exec(p);
  if (m) {
    const b = Number(m[1]);
    return Number.isInteger(ans) && 0.5 ** ans > b && !(0.5 ** (ans + 1) > b);
  }
  throw new Error(`unknown prompt: ${p}`);
}

describe('chapter skills', () => {
  it('store answers that solve their questions', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) if (!solves(q.prompt, q.answer)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('give answers a learner can type back', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 120)) {
        if (readNumber(numberText(q.answer).replace('−', '-')) !== q.answer) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('write TeX that KaTeX accepts in strict mode', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 60)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          for (const [, tex] of text.matchAll(/\$([^$]+)\$/g)) {
            try {
              katex.renderToString(tex, {
                strict: (/** @type {string} */ code) =>
                  code === 'unicodeTextInMathMode' ? 'ignore' : 'error',
                throwOnError: true,
              });
            } catch (e) {
              bad.push(`${tex}: ${/** @type {Error} */ (e).message}`);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('cover every variant', () => {
    const kinds = (
      /** @type {import('#lib/core/drill.js').Skill} */ s,
      /** @type {RegExp[]} */ res,
    ) => res.map((re) => sample(s).some((q) => re.test(q.prompt)));
    expect(kinds(luythua, [/\\frac/, /\\cdot/])).toEqual([true, true]);
    expect(kinds(logarit, [/\\log_\{[235]\}/, /\\log_6/, /\\log_\{(4|8|9|27)\}/])).toEqual([
      true,
      true,
      true,
    ]);
    expect(kinds(hamso, [/a\^x/, /\\log_a x/, /Tập xác định/])).toEqual([true, true, true]);
    expect(kinds(phuongtrinh, [/\$\d\^\{/, /\\log_\{/, /lớn nhất/])).toEqual([true, true, true]);
  });
});

describe('TeX helpers', () => {
  it('write linear expressions and values the book way', () => {
    expect(linTex(2, -3)).toBe('2x - 3');
    expect(linTex(1, 4)).toBe('x + 4');
    expect(linTex(-1, 0)).toBe('-x');
    expect(valueTex(1 / 27)).toBe('\\dfrac{1}{27}');
    expect(valueTex(-1.5)).toBe('-\\dfrac{3}{2}');
  });
});
