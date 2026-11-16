import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { toFraction } from '#lib/core/fractions.js';
import { CHAPTER_SKILLS, dayso, hamso, lientuc, polyTex, valueTex } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 300) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Evaluates a polynomial written by `polyTex` at a number.
 * @param {string} tex @param {string} v @param {number} x
 */
function evalPoly(tex, v, x) {
  const js = tex
    .replace(/(\d)([a-z])/g, '$1*$2')
    .replace(/\^(\d)/g, '**$1')
    .replaceAll(v, `(${x})`)
    .replace(/\(([^()]+)\)\*\*(\d)/g, 'Math.pow($1, $2)');
  return Function(`return ${js};`)();
}

/**
 * Recomputes an answer numerically from the prompt alone.
 * @param {string} p
 * @returns {number | null}
 */
function solve(p) {
  let m = /^Tính \$\\lim \\dfrac\{(.+?)\}\{(.+?)\}\$/.exec(p);
  if (m) return evalPoly(m[1], 'n', 1e7) / evalPoly(m[2], 'n', 1e7);
  m = /u_1 = (\d+)\$ và công bội \$q = (-?)\\dfrac\{1\}\{(\d+)\}\$/.exec(p);
  if (m) {
    const q = (m[2] ? -1 : 1) / Number(m[3]);
    let s = 0;
    for (let n = 0; n < 200; n++) s += Number(m[1]) * q ** n;
    return s;
  }
  m = /0\{,\}\((\d\d)\)/.exec(p);
  if (m) return Number(`0.${m[1].repeat(8)}`);
  m = /x \\to (-?\d+)\} \\dfrac\{(.+?)\}\{(.+?)\}\$/.exec(p);
  if (m) {
    const x = Number(m[1]) + 1e-7;
    return evalPoly(m[2], 'x', x) / evalPoly(m[3], 'x', x);
  }
  m = /x \\to \+\\infty\} \\dfrac\{(.+?)\}\{(.+?)\}\$/.exec(p);
  if (m) return evalPoly(m[1], 'x', 1e8) / evalPoly(m[2], 'x', 1e8);
  m = /cases\} (.+?) & \\text\{nếu \} x < (-?\d+) \\\\ (.+?) & .*x \\to -?\d+\^([+-])\}/.exec(p);
  if (m) {
    const x0 = Number(m[2]);
    return m[4] === '-' ? evalPoly(m[1], 'x', x0 - 1e-9) : evalPoly(m[3], 'x', x0 + 1e-9);
  }
  m = /cases\} ax(.*?) & \\text\{nếu \} x \\le (-?\d+) \\\\ (.+?) & /.exec(p);
  if (m) {
    const x0 = Number(m[2]);
    const b = m[1] === '' ? 0 : Number(m[1].replace(/\s/g, ''));
    return (evalPoly(m[3], 'x', x0) - b) / x0;
  }
  m = /cases\} \\dfrac\{(.+?)\}\{(.+?)\} & \\text\{nếu \} x \\ne (-?\d+)/.exec(p);
  if (m) {
    const x = Number(m[3]) + 1e-7;
    return evalPoly(m[1], 'x', x) / evalPoly(m[2], 'x', x);
  }
  return null;
}

describe('chapter skills', () => {
  it('give answers that recompute from the prompt', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const v = solve(q.prompt);
        if (v === null) bad.push(`unread: ${q.prompt}`);
        else if (Math.abs(v - q.answer) > 1e-4) bad.push(`${q.prompt} → ${q.answer}, got ${v}`);
        if (!toFraction(q.answer)) bad.push(`not a fraction: ${q.answer}`);
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
    expect(kinds(dayso, [/\\lim \\dfrac/, /lùi vô hạn/, /tuần hoàn/])).toEqual([true, true, true]);
    expect(kinds(hamso, [/x \\to -?\d+\} \\dfrac/, /\+\\infty/, /\^[+-]\}/])).toEqual([
      true,
      true,
      true,
    ]);
    expect(kinds(lientuc, [/Tìm \$a\$/, /Tìm \$m\$/])).toEqual([true, true]);
  });
});

describe('TeX helpers', () => {
  it('write polynomials and values the book way', () => {
    expect(polyTex([2, -1, 0])).toBe('2x^2 - x');
    expect(polyTex([-1, 0, 4], 'n')).toBe('-n^2 + 4');
    expect(polyTex([1, 3])).toBe('x + 3');
    expect(valueTex(-0.25)).toBe('-\\dfrac{1}{4}');
    expect(valueTex(3)).toBe('3');
  });
});
