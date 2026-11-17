import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { rng } from '#lib/core/drill.js';
import { richParts } from '#lib/core/rich-parts.js';
import {
  CHAPTER_SKILLS,
  centroid,
  combination,
  crossProduct,
  distance,
  dotProduct,
  perpendicular,
  vectorCoords,
} from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill */
function sample(skill, count = 200) {
  const r = rng(2027);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * The coordinate triples written in a prompt, in order.
 * @param {string} text
 */
function triples(text) {
  return [...text.matchAll(/\((-?\d+|m); (-?\d+); (-?\d+)\)/g)].map((m) =>
    m.slice(1).map((v) => (v === 'm' ? NaN : Number(v))),
  );
}

/** @param {string} text */
const coordIndex = (text) => ['hoành độ', 'tung độ', 'cao độ'].findIndex((n) => text.includes(n));

describe('chapter skills', () => {
  it('give finite answers and TeX that renders', () => {
    const bad = [];
    for (const skill of CHAPTER_SKILLS) {
      for (const q of sample(skill, 120)) {
        if (!Number.isFinite(q.answer) || Object.is(q.answer, -0)) bad.push([skill.id, q.prompt]);
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

  it('store answers that match the numbers in the prompt', () => {
    const bad = [];
    for (const q of sample(vectorCoords)) {
      const [a, b] = triples(q.prompt);
      const i = coordIndex(q.prompt);
      if (b[i] - a[i] !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(dotProduct)) {
      const [u, v] = triples(q.prompt);
      if (u[0] * v[0] + u[1] * v[1] + u[2] * v[2] !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(distance)) {
      const [a, b] = triples(q.prompt);
      const d2 = a.reduce((s, x, i) => s + (b[i] - x) ** 2, 0);
      if (d2 !== q.answer ** 2) bad.push(q.prompt);
    }
    for (const q of sample(perpendicular)) {
      const [u, v] = triples(q.prompt);
      const dot = q.answer * v[0] + u[1] * v[1] + u[2] * v[2];
      if (Math.abs(dot) > 1e-9) bad.push(q.prompt);
    }
    for (const q of sample(centroid)) {
      const [a, b, c] = triples(q.prompt);
      const i = coordIndex(q.prompt);
      if ((a[i] + b[i] + c[i]) / 3 !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(crossProduct)) {
      const [u, v] = triples(q.prompt);
      const w = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      if (w[coordIndex(q.prompt)] !== q.answer) bad.push(q.prompt);
    }
    for (const q of sample(combination)) {
      const [u, v] = triples(q.prompt);
      const m = q.prompt.match(/\\vec\{w\} = (-?\d*)\\vec\{u\} ([+-]) (\d*)\\vec\{v\}/);
      if (!m) {
        bad.push(q.prompt);
        continue;
      }
      /** @param {string} s */
      const coef = (s) => (s === '' ? 1 : s === '-' ? -1 : Number(s));
      const h = coef(m[1]);
      const k = (m[2] === '-' ? -1 : 1) * coef(m[3]);
      const i = coordIndex(q.prompt);
      if (h * u[i] + k * v[i] !== q.answer) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
