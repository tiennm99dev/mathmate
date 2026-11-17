import { describe, expect, it } from 'vitest';
import { buildSet, rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS } from './skills.js';

/**
 * Reads ax² + bx + c back from the TeX the skills write.
 * @param {string} tex
 */
function readQuad(tex) {
  const s = tex.replace(/\s+/g, '').replace('x^{2}', 'X');
  const m = /^(-?\d*)X(?:([+-]\d*)x)?([+-]\d+)?$/.exec(s);
  if (!m) throw new Error(`cannot read ${tex}`);
  const num = (/** @type {string | undefined} */ t, /** @type {number} */ dflt) =>
    t === undefined ? dflt : t === '' || t === '+' ? 1 : t === '-' ? -1 : Number(t);
  return [
    num(m[1], 1),
    m[2] === undefined ? 0 : num(m[2], 0),
    m[3] === undefined ? 0 : Number(m[3]),
  ];
}

/**
 * The arguments of every \sqrt{...} in a prompt, braces balanced.
 * @param {string} text
 */
function sqrtArgs(text) {
  const out = [];
  let i = text.indexOf('\\sqrt{');
  while (i >= 0) {
    let depth = 0;
    let j = i + 5;
    for (; j < text.length; j++) {
      if (text[j] === '{') depth++;
      else if (text[j] === '}' && --depth === 0) break;
    }
    out.push(text.slice(i + 6, j));
    i = text.indexOf('\\sqrt{', j);
  }
  return out;
}

/** @param {number[]} q @param {number} x */
const val = (q, x) => q[0] * x * x + q[1] * x + q[2];

describe('chapter drill skills', () => {
  it('every answer checks out by brute force', () => {
    const wrong = [];
    for (let seed = 1; seed <= 300; seed++) {
      const rand = rng(seed);
      for (const skill of CHAPTER_SKILLS) {
        const q = skill.make(rand);
        let ok = Number.isInteger(q.answer);
        if (skill.id === 'tap-xac-dinh') {
          const inner = sqrtArgs(q.prompt)[0] ?? '';
          const m = /^(\d*)x(?:\s*([+-])\s*(\d+))?$/.exec(inner);
          const k = m && m[1] ? Number(m[1]) : 1;
          const c = m && m[3] ? Number(m[3]) * (m[2] === '-' ? -1 : 1) : 0;
          ok = ok && k * q.answer + c === 0;
        } else if (skill.id === 'dinh-parabol' || skill.id === 'gia-tri-lon-nhat-nho-nhat') {
          const p = readQuad(/y = (.+?)\$/.exec(q.prompt)?.[1] ?? '');
          const h = -p[1] / (2 * p[0]);
          ok = ok && (skill.id === 'dinh-parabol' ? h === q.answer : val(p, h) === q.answer);
          if (skill.id === 'gia-tri-lon-nhat-nho-nhat') {
            ok = ok && q.prompt.includes(p[0] > 0 ? 'nhỏ nhất' : 'lớn nhất');
          }
        } else if (skill.id === 'bat-phuong-trinh-bac-hai') {
          const m = /\$(.+?) (<|>|\\le|\\ge) 0\$/.exec(q.prompt);
          const p = readQuad(m?.[1] ?? '');
          const rel = m?.[2];
          let count = 0;
          for (let x = -50; x <= 50; x++) {
            const v = val(p, x);
            if (rel === '<' ? v < 0 : rel === '>' ? v > 0 : rel === '\\le' ? v <= 0 : v >= 0)
              count++;
          }
          ok = ok && count === q.answer;
        } else {
          const sides = sqrtArgs(q.prompt).map(readQuad);
          const right = /\} = ([^\\{}]+?)\$/.exec(q.prompt)?.[1];
          /** @param {number} x */
          const solves = (x) => {
            const l = val(sides[0], x);
            if (l < 0) return false;
            if (sides.length === 2) return Math.abs(l - val(sides[1], x)) < 1e-9;
            const e = Number((right ?? '').replace(/\s/g, '').replace('x', '') || 0);
            return x + e >= 0 && Math.abs(Math.sqrt(l) - (x + e)) < 1e-9;
          };
          const sols = [];
          for (let x = -60; x <= 60; x++) if (solves(x)) sols.push(x);
          ok = ok && sols.length === 1 && sols[0] === q.answer;
        }
        if (!ok) wrong.push(`${skill.id} ${seed}: ${q.prompt} → ${q.answer}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('builds a full set without repeats', () => {
    const set = buildSet(CHAPTER_SKILLS, 2, 7);
    expect(set).toHaveLength(12);
    expect(new Set(set.map((q) => q.prompt)).size).toBe(12);
  });
});
