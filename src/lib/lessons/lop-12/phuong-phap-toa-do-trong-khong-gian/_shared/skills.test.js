import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { richParts } from '#lib/core/rich-parts.js';
import {
  CHAPTER_SKILLS,
  angleSkill,
  linePlaneMeet,
  perpendicularPlanes,
  planeThroughPoint,
  pointOnLine,
  pointPlaneDistance,
  sphereCentre,
  sphereRadius,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 150) {
  const r = rng(2028);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * The coefficients of a linear sum such as '2x - y + 3z - 5' (names x, y,
 * z, m, t; '' for the constant).
 * @param {string} tex
 */
function linear(tex) {
  /** @type {Record<string, number>} */
  const out = { x: 0, y: 0, z: 0, m: 0, t: 0, '': 0 };
  const s = tex.replace(/\s+/g, '').replace(/\{,\}/g, '.');
  for (const m of s.matchAll(/([+-]?)(\d*)([xyzmt]?)/g)) {
    if (!m[0]) continue;
    const mag = m[2] === '' ? 1 : Number(m[2]);
    out[m[3]] += (m[1] === '-' ? -1 : 1) * mag;
  }
  return out;
}

/** The coordinate triples in a text, in order. @param {string} text */
const triples = (text) =>
  [...text.matchAll(/\((-?\d+); (-?\d+); (-?\d+)\)/g)].map((m) => m.slice(1).map(Number));

/** The equation after a name such as '(P): ' up to ' = 0'. @param {string} text @param {string} name */
function equation(text, name) {
  const at = text.indexOf(`${name}: `);
  const rest = text.slice(at + name.length + 2);
  return linear(rest.slice(0, rest.indexOf(' = 0')));
}

/** The rows x = …, y = …, z = … of a cases block, as { start, step }. @param {string} text */
function cases(text) {
  const body = /\\begin\{cases\}(.*?)\\end\{cases\}/.exec(text)?.[1] ?? '';
  return body.split('\\\\').map((row) => {
    const l = linear(row.split('=')[1]);
    return { start: l[''], step: l.t };
  });
}

describe('chapter skills', () => {
  it('give whole answers and TeX that renders', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 100)) {
        if (!Number.isInteger(q.answer) || Object.is(q.answer, -0)) bad.push([skill.id, q.prompt]);
        for (const text of [q.prompt, ...q.steps, ...(q.hints ?? [])]) {
          for (const part of richParts(text)) {
            if (part.kind !== 'tex') continue;
            try {
              katex.renderToString(part.tex, { strict: 'error', throwOnError: true });
            } catch {
              bad.push([skill.id, part.tex]);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('store answers that solve the printed question', () => {
    const bad = [];
    for (const q of sample(planeThroughPoint)) {
      const [m, n] = triples(q.prompt);
      if (n[0] * m[0] + n[1] * m[1] + n[2] * m[2] + q.answer !== 0) bad.push(q.prompt);
    }
    for (const q of sample(pointPlaneDistance)) {
      const [m] = triples(q.prompt);
      const p = equation(q.prompt, '(P)');
      const d = Math.abs(p.x * m[0] + p.y * m[1] + p.z * m[2] + p['']) / Math.hypot(p.x, p.y, p.z);
      if (Math.abs(d - q.answer) > 1e-9) bad.push(q.prompt);
    }
    for (const q of sample(perpendicularPlanes)) {
      const p = equation(q.prompt, '(P)');
      const r = equation(q.prompt, '(Q)');
      const np = ['x', 'y', 'z'].map((k) => (q.prompt.includes(`m${k}`) ? q.answer : p[k]));
      if (np[0] * r.x + np[1] * r.y + np[2] * r.z !== 0) bad.push(q.prompt);
    }
    for (const q of sample(pointOnLine)) {
      const rows = cases(q.prompt);
      const names = ['hoành độ', 'tung độ', 'cao độ'];
      const known = names.findIndex((n) => q.prompt.includes(`${n} bằng`));
      const ask = names.findIndex((n) => q.prompt.includes(`Tìm ${n}`));
      const value = Number(/bằng \$(-?\d+)\$/.exec(q.prompt)?.[1]);
      const t = (value - rows[known].start) / rows[known].step;
      if (rows[ask].start + rows[ask].step * t !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(linePlaneMeet)) {
      const rows = cases(q.prompt);
      const p = equation(q.prompt, '(P)');
      const keys = /** @type {const} */ (['x', 'y', 'z']);
      const a = keys.reduce((s, k, i) => s + p[k] * rows[i].start, p['']);
      const b = keys.reduce((s, k, i) => s + p[k] * rows[i].step, 0);
      const t = -a / b;
      const i = ['hoành độ', 'tung độ', 'cao độ'].findIndex((n) => q.prompt.includes(`Tìm ${n}`));
      if (rows[i].start + rows[i].step * t !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(angleSkill)) {
      const [u, v] = triples(q.prompt);
      const c =
        Math.abs(u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / Math.hypot(...u) / Math.hypot(...v);
      const linePlane = q.prompt.includes('và mặt phẳng có vectơ pháp tuyến');
      const deg =
        ((linePlane ? Math.asin(Math.min(1, c)) : Math.acos(Math.min(1, c))) * 180) / Math.PI;
      if (Math.abs(deg - q.answer) > 1e-6) bad.push(q.prompt);
    }
    for (const q of [...sample(sphereRadius), ...sample(sphereCentre)]) {
      const tex = /z\^2(.*?) = 0/.exec(q.prompt)?.[1] ?? '';
      const l = linear(tex);
      const centre = [l.x / -2, l.y / -2, l.z / -2];
      const r2 = centre[0] ** 2 + centre[1] ** 2 + centre[2] ** 2 - l[''];
      const want = q.prompt.includes('bán kính')
        ? Math.sqrt(r2)
        : centre[['hoành độ', 'tung độ', 'cao độ'].findIndex((n) => q.prompt.includes(`Tìm ${n}`))];
      if (want !== q.answer || r2 <= 0) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
