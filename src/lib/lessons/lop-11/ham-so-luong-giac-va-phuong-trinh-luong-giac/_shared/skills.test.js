import { describe, it, expect } from 'vitest';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, congThuc, goc, hamSo, phuongTrinh } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

const RAD = Math.PI / 180;
/** @type {Record<string, (x: number) => number>} */
const F = {
  sin: (x) => Math.sin(x * RAD),
  cos: (x) => Math.cos(x * RAD),
  tan: (x) => Math.tan(x * RAD),
  cot: (x) => 1 / Math.tan(x * RAD),
};

/** Value of a TeX number the generators write: '-\dfrac{3}{5}', '\sqrt{3}', '0{,}5'. */
function texValue(/** @type {string} */ tex) {
  const sign = tex.trim().startsWith('-') ? -1 : 1;
  const t = tex.trim().replace(/^-/, '');
  let m = /^\\dfrac\{(\\sqrt\{(\d+)\}|\d+)\}\{(\d+)\}$/.exec(t);
  if (m) return (sign * (m[2] ? Math.sqrt(Number(m[2])) : Number(m[1]))) / Number(m[3]);
  m = /^\\sqrt\{(\d+)\}$/.exec(t);
  if (m) return sign * Math.sqrt(Number(m[1]));
  return sign * Number(t.replace('{,}', '.'));
}

/** Solutions of name(c·x) = m in [0°; 360°), found on a half-degree grid. */
function scan(/** @type {string} */ name, /** @type {number} */ c, /** @type {number} */ m) {
  const out = [];
  for (let x = 0; x < 360; x += 0.5) {
    const v = F[name](c * x);
    if (Number.isFinite(v) && Math.abs(v) < 1e6 && Math.abs(v - m) < 1e-9) out.push(x);
  }
  return out;
}

/**
 * Recomputes an answer from the prompt alone, independently of the
 * generators. Returns null for prompts this checker does not read.
 * @param {string} p
 * @returns {number | null}
 */
function solve(p) {
  let m = /Phương trình \$\\(sin|cos|tan|cot) (\d?)x = (.+?)\$ có bao nhiêu nghiệm/.exec(p);
  if (m) return scan(m[1], Number(m[2] || 1), texValue(m[3])).length;
  m = /nghiệm dương nhỏ nhất của phương trình \$\\(sin|cos|tan|cot) (\d?)x = (.+?)\$/.exec(p);
  if (m) return scan(m[1], Number(m[2] || 1), texValue(m[3])).filter((x) => x > 0)[0];
  m = /tổng các nghiệm .* phương trình \$\\(sin|cos|tan|cot) (\d?)x = (.+?)\$/.exec(p);
  if (m) return scan(m[1], Number(m[2] || 1), texValue(m[3])).reduce((s, x) => s + x, 0);
  m = /^Số đo theo radian của góc \$(\d+)\^\\circ\$/.exec(p);
  if (m) return Number(m[1]) / 180;
  m = /^Cho \$\\(sin|cos)\\alpha = (.+?)\$ với \$(.+?)\$\. Tính \$\\(sin|cos|tan)\\alpha\$/.exec(p);
  if (m) {
    const quads = [
      '0 < \\alpha < \\dfrac{\\pi}{2}',
      '\\dfrac{\\pi}{2} < \\alpha < \\pi',
      '\\pi < \\alpha < \\dfrac{3\\pi}{2}',
      '\\dfrac{3\\pi}{2} < \\alpha < 2\\pi',
    ];
    const q = quads.indexOf(m[3]);
    const v = texValue(m[2]);
    // The angle in that quadrant with the given value.
    let a;
    if (m[1] === 'sin')
      a = [
        Math.asin(v),
        Math.PI - Math.asin(v),
        Math.PI - Math.asin(v),
        2 * Math.PI + Math.asin(v),
      ][q];
    else
      a = [Math.acos(v), Math.acos(v), 2 * Math.PI - Math.acos(v), 2 * Math.PI - Math.acos(v)][q];
    return F[m[4]](a / RAD);
  }
  m = /^Cho \$\\tan a = (-?\d+)\$ và \$\\tan b = (-?\d+)\$\. Tính \$\\tan\(a ([+-]) b\)\$/.exec(p);
  if (m) {
    const a = Math.atan(Number(m[1]));
    const b = Math.atan(Number(m[2]));
    return Math.tan(m[3] === '+' ? a + b : a - b);
  }
  m = /^Chu kì của hàm số \$y = \\(sin|cos|tan|cot) (\d)x\$/.exec(p);
  if (m) return (m[1] === 'sin' || m[1] === 'cos' ? 2 : 1) / Number(m[2]);
  m = /^Đổi \$(.+?)\$ rad sang độ/.exec(p);
  if (m) {
    const t = m[1].replace('\\pi', '');
    const f = /^\\dfrac\{(\d*)\}\{(\d+)\}$/.exec(t);
    return f ? (180 * Number(f[1] || 1)) / Number(f[2]) : 180 * Number(t || 1);
  }
  return null;
}

describe('chapter drill skills', () => {
  it('gives answers that the board reads back exactly', () => {
    const fails = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (!Number.isFinite(q.answer)) fails.push(`${skill.id}: ${q.prompt}`);
        else if (readNumber(numberText(q.answer).replace('−', '-')) !== q.answer) {
          fails.push(`${skill.id}: ${q.answer}`);
        }
        if (q.steps.length === 0) fails.push(`${skill.id}: no steps`);
      }
    }
    expect(fails).toEqual([]);
  });

  it('has answers that match an independent computation', () => {
    const fails = [];
    let checked = 0;
    for (const skill of [goc, congThuc, hamSo, phuongTrinh]) {
      for (const q of sample(skill)) {
        const want = solve(q.prompt);
        if (want === null) continue;
        checked += 1;
        if (Math.abs(want - q.answer) > 1e-9) fails.push(`${q.prompt} → ${q.answer} ≠ ${want}`);
      }
    }
    expect(fails).toEqual([]);
    expect(checked).toBeGreaterThan(800);
  });

  it('computes sin(a ± b), cos 2a and extreme values right', () => {
    const fails = [];
    for (const q of [...sample(congThuc), ...sample(hamSo)]) {
      let m = /^Cho \$\\sin a = (.+?)\$, \$\\cos b = (.+?)\$ .* Tính \$\\sin\(a ([+-]) b\)\$/.exec(
        q.prompt,
      );
      if (m) {
        const a = Math.asin(texValue(m[1]));
        const b = Math.acos(texValue(m[2]));
        const want = Math.sin(m[3] === '+' ? a + b : a - b);
        if (Math.abs(want - q.answer) > 1e-9) fails.push(q.prompt);
        continue;
      }
      m = /^Cho \$\\sin a = (.+?)\$ với .* Tính \$\\(sin|cos) 2a\$/.exec(q.prompt);
      if (m) {
        const a = Math.asin(texValue(m[1]));
        const want = m[2] === 'sin' ? Math.sin(2 * a) : Math.cos(2 * a);
        if (Math.abs(want - q.answer) > 1e-9) fails.push(q.prompt);
        continue;
      }
      m = /^Cho \$\\cos a = (.+?)\$\. Tính \$\\cos 2a\$/.exec(q.prompt);
      if (m) {
        const want = Math.cos(2 * Math.acos(texValue(m[1])));
        if (Math.abs(want - q.answer) > 1e-9) fails.push(q.prompt);
        continue;
      }
      m = /^Tìm giá trị (lớn nhất|nhỏ nhất) của hàm số \$y = (.*?)\\(sin|cos) x(.*)\$\.$/.exec(
        q.prompt,
      );
      if (m) {
        const A = m[2] === '' ? 1 : m[2] === '-' ? -1 : Number(m[2]);
        const B = m[4] === '' ? 0 : Number(m[4].replace(/\s/g, ''));
        let best = m[1] === 'lớn nhất' ? -Infinity : Infinity;
        for (let x = 0; x < 360; x += 1) {
          const y = A * F[m[3]](x) + B;
          best = m[1] === 'lớn nhất' ? Math.max(best, y) : Math.min(best, y);
        }
        if (Math.abs(best - q.answer) > 1e-9) fails.push(q.prompt);
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes steps that agree with the given values', () => {
    const fails = [];
    for (const q of [...sample(goc), ...sample(congThuc)]) {
      // 1 − (given)² written as a fraction in the first step.
      let m = /^Cho \$\\(?:sin|cos)\\alpha = (.+?)\$/.exec(q.prompt);
      if (m) {
        const s = /= \\dfrac\{(\d+)\}\{(\d+)\}\$\.$/.exec(q.steps[0]);
        const given = texValue(m[1]);
        if (!s || Math.abs(Number(s[1]) / Number(s[2]) - (1 - given * given)) > 1e-9) {
          fails.push(`${q.prompt} | ${q.steps[0]}`);
        }
        continue;
      }
      // A negative tangent is bracketed after a sign.
      m = /^Cho \$\\tan a = /.exec(q.prompt);
      if (m && /[+-] -\d/.test(q.steps[0])) fails.push(q.steps[0]);
    }
    expect(fails).toEqual([]);
  });
});
