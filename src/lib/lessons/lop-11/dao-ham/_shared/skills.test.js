import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { CHAPTER_SKILLS, polyAt, polyDerive, polyTex, valueTex } from './skills.js';

/**
 * Turns the TeX of a function written by the skills into a JS function of x.
 * @param {string} tex @param {string} v the variable, x or t
 * @returns {(x: number) => number}
 */
function toFn(tex, v) {
  let js = tex.replaceAll(v, 'x');
  js = js.replace(/\\dfrac\{(.+?)\}\{(.+?)\}/, '(($1)/($2))');
  js = js.replace(/\^(\d)/g, '**$1');
  js = js.replace(/x\*\*(\d)/g, '(x**$1)');
  js = js.replace(/(\d)\s*([x(])/g, '$1*$2');
  js = js.replace(/\)\s*\(/g, ')*(');
  return /** @type {(x: number) => number} */ (Function('x', `return ${js};`));
}

/**
 * Recomputes an answer numerically from the prompt alone.
 * @param {string} p
 */
function solve(p) {
  const m = /\$(f\(x\)|s\(t\)) = (.+?)\$/.exec(p);
  if (!m) return null;
  const f = toFn(m[2], m[1] === 's(t)' ? 't' : 'x');
  const at = /(?:x_0 = |t = |f'\(|f''\()(-?\d+)/.exec(p);
  if (!at) return null;
  const x = Number(at[1]);
  const h = 1e-4;
  const d1 = (f(x + h) - f(x - h)) / (2 * h);
  if (p.includes("f''(") || p.includes('gia tốc'))
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  if (p.includes('Tính $b$')) return f(x) - d1 * x;
  return d1;
}

/** @param {string} text rich text: every $...$ part must render */
function renders(text) {
  for (const part of text.match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(part.slice(1, -1), { throwOnError: true, strict: 'ignore' });
  }
  return true;
}

describe('chapter skills', () => {
  it('store answers that match a numeric recomputation from the prompt', () => {
    const bad = [];
    const r = rng(2026);
    for (const skill of CHAPTER_SKILLS) {
      for (let i = 0; i < 300; i++) {
        const q = skill.make(r);
        const got = solve(q.prompt);
        if (got === null || Math.abs(got - q.answer) > 1e-3 * Math.max(1, Math.abs(q.answer))) {
          bad.push(`${skill.id}: ${q.prompt} → ${q.answer} vs ${got}`);
        }
      }
    }
    expect(bad.slice(0, 5)).toEqual([]);
  });

  it('write prompts, hints and steps as valid TeX, with exact answers', () => {
    const bad = [];
    const r = rng(7);
    for (const skill of CHAPTER_SKILLS) {
      for (let i = 0; i < 100; i++) {
        const q = skill.make(r);
        try {
          [q.prompt, ...(q.hints ?? []), ...q.steps].forEach(renders);
        } catch (e) {
          bad.push(`${skill.id}: ${String(e)}`);
        }
        if (!Number.isFinite(q.answer)) bad.push(`${skill.id}: ${q.answer}`);
        valueTex(q.answer);
      }
    }
    expect(bad.slice(0, 5)).toEqual([]);
  });

  it('handle polynomials', () => {
    expect(polyTex([1, -3, 0, 2])).toBe('x^3 - 3x^2 + 2');
    expect(polyDerive([1, -3, 0, 2])).toEqual([3, -6, 0]);
    expect(polyAt([1, -3, 0, 2], 2)).toBe(-2);
    expect(polyDerive([5])).toEqual([0]);
  });
});
