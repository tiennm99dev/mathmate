import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, cubicWithCriticalPoints } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 300) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * A polynomial written by `polyTex` as a JS function.
 * @param {string} tex @param {string} [v]
 * @returns {(x: number) => number}
 */
function poly(tex, v = 'x') {
  const js = tex
    .replace(/\\,/g, '')
    .replace(new RegExp(`${v}\\^\\{?(\\d+)\\}?`, 'g'), `Math.pow(${v}, $1)`)
    .replace(new RegExp(`(\\d)(Math|${v})`, 'g'), '$1*$2');
  return /** @type {(x: number) => number} */ (Function(v, `return ${js};`));
}

/**
 * Extremes of f on [lo, hi] on a 0.001 grid, which holds every whole number.
 * @param {(x: number) => number} f @param {number} lo @param {number} hi
 */
function extremes(f, lo, hi) {
  let max = -Infinity;
  let min = Infinity;
  for (let i = Math.round(lo * 1000); i <= Math.round(hi * 1000); i++) {
    const y = f(i / 1000);
    max = Math.max(max, y);
    min = Math.min(min, y);
  }
  return { max, min };
}

/**
 * The local maxima and minima of f on [−20, 20], at whole x.
 * @param {(x: number) => number} f
 */
function turns(f) {
  const out = [];
  for (let x = -20; x <= 20; x++) {
    const y = f(x);
    if (y > f(x - 0.01) && y > f(x + 0.01)) out.push({ x, y, kind: 'max' });
    if (y < f(x - 0.01) && y < f(x + 0.01)) out.push({ x, y, kind: 'min' });
  }
  return out;
}

/**
 * Distinct real roots of f on [−30, 30]: exact zeros on a grid holding every
 * whole number, plus sign changes between grid points.
 * @param {(x: number) => number} f
 */
function rootCount(f) {
  let count = 0;
  let prev = f(-30);
  if (prev === 0) count++;
  for (let i = -29999; i <= 30000; i++) {
    const y = f(i / 1000);
    if (y === 0) count++;
    else if (prev !== 0 && Math.sign(y) !== Math.sign(prev)) count++;
    prev = y;
  }
  return count;
}

/**
 * Recomputes an answer from the prompt alone.
 * @param {string} p
 * @returns {number | null}
 */
function solve(p) {
  let m = /^Tìm điểm cực đại .*\$y = (.+)\$\.$/.exec(p);
  if (m) return turns(poly(m[1])).find((t) => t.kind === 'max')?.x ?? null;
  m = /^Tìm giá trị cực (đại|tiểu) .*\$y = (.+)\$\.$/.exec(p);
  if (m) {
    const kind = m[1] === 'đại' ? 'max' : 'min';
    return turns(poly(m[2])).find((t) => t.kind === kind)?.y ?? null;
  }
  m = /^Tìm giá trị (lớn|nhỏ) nhất .*\$y = (.+)\$ trên đoạn \$\[(-?\d+); (-?\d+)\]\$/.exec(p);
  if (m) {
    const e = extremes(poly(m[2]), Number(m[3]), Number(m[4]));
    return m[1] === 'lớn' ? e.max : e.min;
  }
  m = /\$y = \\dfrac\{(.+?)\}\{(.+?)\}\$ có tiệm cận (ngang|đứng|xiên)/.exec(p);
  if (m) {
    const top = poly(m[1]);
    const bottom = poly(m[2]);
    if (m[3] === 'ngang') return top(1e9) / bottom(1e9);
    if (m[3] === 'xiên') return top(1e7) / bottom(1e7) - 1e7;
    const b0 = bottom(0);
    return -b0 / (bottom(1) - b0);
  }
  m = /\$y = \\dfrac\{(.+?)\}\{(.+?)\}\$ có tâm đối xứng/.exec(p);
  if (m) {
    const top = poly(m[1]);
    const bottom = poly(m[2]);
    const x0 = -bottom(0) / (bottom(1) - bottom(0));
    return x0 + top(1e9) / bottom(1e9);
  }
  m = /^Phương trình \$(.+) = (-?\d+)\$ có bao nhiêu/.exec(p);
  if (m) {
    const f = poly(m[1]);
    const k = Number(m[2]);
    return rootCount((x) => f(x) - k);
  }
  m = /hình vuông cạnh \$(\d+)\$ cm.*(Thể tích lớn nhất|Tìm \$x\$)/.exec(p);
  if (m) {
    const a = Number(m[1]);
    let best = { x: 0, v: -Infinity };
    for (let i = 1; i < a * 500; i++) {
      const x = i / 1000;
      const v = x * (a - 2 * x) ** 2;
      if (v > best.v) best = { x, v };
    }
    return m[2] === 'Tìm $x$' ? best.x : best.v;
  }
  m = /\$s\(t\) = (.+?)\$.*Trong \$(\d+)\$ giây/.exec(p);
  if (m) {
    const s = poly(m[1], 't');
    const v = (/** @type {number} */ t) => (s(t + 1e-4) - s(t - 1e-4)) / 2e-4;
    return extremes(v, 0, Number(m[2])).max;
  }
  m = /\$C\(x\) = x\^2 \+ (\d+)x \+ (.+?)\$.*(bao nhiêu sản phẩm|nhỏ nhất cho mỗi)/.exec(p);
  if (m) {
    const b = Number(m[1]);
    const c = Number(m[2].replace(/\\,/g, ''));
    let best = { x: 0, v: Infinity };
    for (let x = 1; x <= 1000; x++) {
      const v = x + b + c / x;
      if (v < best.v) best = { x, v };
    }
    return m[3] === 'bao nhiêu sản phẩm' ? best.x : best.v;
  }
  return null;
}

describe('chapter review skills', () => {
  it('builds cubics whose critical points are where y′ vanishes', () => {
    const r = rng(7);
    const bad = [];
    for (let i = 0; i < 200; i++) {
      const c = cubicWithCriticalPoints(r);
      if (!c.coefs.every(Number.isInteger)) bad.push(`coefs ${c.coefs}`);
      const slope = (/** @type {number} */ x) => (c.f(x + 1e-6) - c.f(x - 1e-6)) / 2e-6;
      if (Math.abs(slope(c.p)) > 1e-3 || Math.abs(slope(c.q)) > 1e-3) bad.push(`roots ${c.coefs}`);
      if (!(c.yMax > c.yMin)) bad.push(`values ${c.coefs}`);
    }
    expect(bad).toEqual([]);
  });

  it('stores answers that match the prompt', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const want = solve(q.prompt);
        if (want === null) bad.push(`unparsed: ${q.prompt}`);
        else if (Math.abs(want - q.answer) > 1e-3)
          bad.push(`${q.prompt} → ${q.answer}, not ${want}`);
      }
    }
    expect(bad.slice(0, 5)).toEqual([]);
  });

  it('writes every formula as valid TeX', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 60)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          for (const [, tex] of text.matchAll(/\$([^$]+)\$/g)) {
            try {
              katex.renderToString(tex, { strict: 'error', throwOnError: true });
            } catch {
              bad.push(tex);
            }
          }
        }
      }
    }
    expect(bad.slice(0, 5)).toEqual([]);
  });

  it('writes steps with no missing values', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 1000)) {
        const text = [q.prompt, ...q.steps, ...(q.hints ?? [])].join(' ');
        if (/undefined|NaN|Infinity/.test(text)) bad.push(text);
      }
    }
    expect(bad.slice(0, 3)).toEqual([]);
  });

  it('draws every kind of question', () => {
    const prompts = CHAPTER_SKILLS.flatMap((s) => sample(s, 80).map((q) => q.prompt)).join('\n');
    for (const bit of [
      'điểm cực đại',
      'giá trị cực tiểu',
      'trên đoạn',
      'tiệm cận ngang',
      'tiệm cận đứng',
      'tiệm cận xiên',
      'tâm đối xứng',
      'bao nhiêu nghiệm',
      'hình vuông cạnh',
      'chất điểm',
      'Chi phí sản xuất',
    ]) {
      expect(prompts).toContain(bit);
    }
  });
});
