import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { numberText, readNumber } from '#lib/core/decimal.js';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, capSoCong, capSoNhan, daySo, linearTex } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 300) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/** Value of a TeX number the generators write: '-5', '-\dfrac{1}{2}', '0{,}5'. */
function texValue(/** @type {string} */ tex) {
  const t = tex.trim();
  const sign = t.startsWith('-') ? -1 : 1;
  const m = /^-?\\dfrac\{(\d+)\}\{(\d+)\}$/.exec(t);
  if (m) return (sign * Number(m[1])) / Number(m[2]);
  return Number(t.replace('{,}', '.'));
}

/** Coefficients a, b of a·v + b written by `linearTex`. */
function linear(/** @type {string} */ tex, v = 'n') {
  const esc = v.replace(/[\\{}]/g, (c) => `\\${c}`);
  const m = new RegExp(`^(-?\\d*)${esc}(?: ([+-]) (\\d+))?$`).exec(tex.trim());
  if (!m) throw new Error(`not linear: ${tex}`);
  const a = m[1] === '' ? 1 : m[1] === '-' ? -1 : Number(m[1]);
  const b = m[2] ? (m[2] === '-' ? -1 : 1) * Number(m[3]) : 0;
  return [a, b];
}

/**
 * Recomputes an answer from the prompt alone, by brute force where it can.
 * @param {string} p
 * @returns {number | null}
 */
function solve(p) {
  let m = /u_n = \\dfrac\{(.+?)\}\{(.+?)\}\$\. Tính \$u_\{(\d+)\}\$/.exec(p);
  if (m) {
    const [a, b] = linear(m[1]);
    const [c, d] = linear(m[2]);
    const k = Number(m[3]);
    return (a * k + b) / (c * k + d);
  }
  m = /u_1 = (-?\d+)\$ và \$u_n = (.+?)\$ với \$n \\ge 2\$\. Tính \$u_\{(\d+)\}\$/.exec(p);
  if (m) {
    const [a, b] = linear(m[2], 'u_{n-1}');
    let u = Number(m[1]);
    for (let n = 2; n <= Number(m[3]); n++) u = a * u + b;
    return u;
  }
  m = /u_n = n\^2 ([+-]) (\d+)n ([+-]) (\d+)\$/.exec(p);
  if (m) {
    const b = (m[1] === '-' ? -1 : 1) * Number(m[2]);
    const c = (m[3] === '-' ? -1 : 1) * Number(m[4]);
    let best = Infinity;
    for (let n = 1; n <= 200; n++) best = Math.min(best, n * n + b * n + c);
    return best;
  }
  m =
    /cấp số cộng \$\(u_n\)\$ có \$u_1 = (-?\d+)\$ và công sai \$d = (-?\d+)\$\. Tính \$u_\{(\d+)\}\$/.exec(
      p,
    );
  if (m) {
    let u = Number(m[1]);
    for (let n = 2; n <= Number(m[3]); n++) u += Number(m[2]);
    return u;
  }
  m = /Cấp số cộng \$\(u_n\)\$ có \$u_\{(\d+)\} = (-?\d+)\$ và \$u_\{(\d+)\} = (-?\d+)\$/.exec(p);
  if (m) {
    const d = (Number(m[4]) - Number(m[2])) / (Number(m[3]) - Number(m[1]));
    return Number(m[2]) - (Number(m[1]) - 1) * d;
  }
  m =
    /Tính tổng \$(\d+)\$ số hạng đầu của cấp số (cộng|nhân) có \$u_1 = (-?\d+)\$ và \$(d|q) = (-?\d+)\$/.exec(
      p,
    );
  if (m) {
    let u = Number(m[3]);
    let s = 0;
    for (let n = 1; n <= Number(m[1]); n++) {
      s += u;
      u = m[2] === 'cộng' ? u + Number(m[5]) : u * Number(m[5]);
    }
    return s;
  }
  m = /Ba số \$x\$, \$(-?\d+)\$, \$(-?\d+)\$ theo thứ tự đó lập thành một cấp số (cộng|nhân)/.exec(
    p,
  );
  if (m) {
    const y = Number(m[1]);
    const z = Number(m[2]);
    return m[3] === 'cộng' ? 2 * y - z : (y * y) / z;
  }
  m =
    /cấp số nhân \$\(u_n\)\$ có \$u_1 = (-?\d+)\$ và công bội \$q = (.+?)\$\. Tính \$u_\{(\d+)\}\$/.exec(
      p,
    );
  if (m) {
    let u = Number(m[1]);
    for (let n = 2; n <= Number(m[3]); n++) u *= texValue(m[2]);
    return u;
  }
  m = /Cấp số nhân \$\(u_n\)\$ có \$u_\{(\d+)\} = (-?\d+)\$ và \$u_\{(\d+)\} = (-?\d+)\$/.exec(p);
  if (m) {
    const gap = Number(m[3]) - Number(m[1]);
    const ratio = Number(m[4]) / Number(m[2]);
    const roots = [];
    for (let q = -10; q <= 10; q++) if (q !== 0 && q ** gap === ratio) roots.push(q);
    return roots.length === 1 ? roots[0] : NaN;
  }
  return null;
}

describe('chapter drill skills', () => {
  it('recomputes every answer from its prompt', () => {
    const fails = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        const v = solve(q.prompt);
        if (v === null || Math.abs(v - q.answer) > 1e-9)
          fails.push(`${q.prompt} → ${q.answer} (${v})`);
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes answers the board can read back', () => {
    const fails = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill)) {
        if (readNumber(numberText(q.answer)) !== q.answer) fails.push(q.prompt);
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes valid TeX in prompts and steps', () => {
    const fails = [];
    for (const skill of [daySo, capSoCong, capSoNhan]) {
      for (const q of sample(skill, 120)) {
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          for (const [, tex] of text.matchAll(/\$([^$]+)\$/g)) {
            try {
              katex.renderToString(tex, { throwOnError: true, strict: 'error' });
            } catch {
              fails.push(tex);
            }
          }
        }
      }
    }
    expect(fails).toEqual([]);
  });

  it('writes linear expressions the book way', () => {
    expect(linearTex(3, -2)).toBe('3n - 2');
    expect(linearTex(-1, 5)).toBe('-n + 5');
    expect(linearTex(2, 0)).toBe('2n');
    expect(linearTex(1, 3, 'u_{n-1}')).toBe('u_{n-1} + 3');
  });
});
