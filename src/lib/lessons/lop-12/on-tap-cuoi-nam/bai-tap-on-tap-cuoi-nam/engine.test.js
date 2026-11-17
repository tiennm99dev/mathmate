import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, questionUnit, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  ANGLE_PAIRS,
  QUADRUPLES,
  REVIEW_SKILLS,
  cucTri,
  formText,
  frac,
  gtlnTiemCan,
  lineText,
  matCauGoc,
  matPhang,
  paramText,
  phanTan,
  polyText,
  pt3,
  tichPhan,
  valueShow,
  vecto,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 400) {
  const r = rng(2032);
  return Array.from({ length: count }, () => skill.make(r));
}

/** A number written the book's way ('−3', '0,8', '1 458') as a JS number. */
const num = (/** @type {string} */ t) =>
  Number(
    t
      .replace(/−/g, '-')
      .replace(/[\s\u202f]/g, '')
      .replace(',', '.'),
  );

/** @param {import('#lib/fraction-engine/fraction.js').Fraction} f */
const value = (f) => f.n / f.d;

/** @param {number} a @param {number} b */
const close = (a, b, eps = 1e-6) => Math.abs(a - b) < eps;

/** Every point or vector '(1; −2; 3)' of a text, in order. @param {string} t */
const triples = (t) =>
  [...t.matchAll(/\((−?\d+); (−?\d+); (−?\d+)\)/g)].map((m) => [m[1], m[2], m[3]].map(num));

/** @param {number[]} u @param {number[]} v */
const dot = (u, v) => u.reduce((s, c, i) => s + c * v[i], 0);

const POWERS = { '': 1, '²': 2, '³': 3 };

/**
 * The coefficients of a polynomial written by `polyText`, highest power
 * first, read back term by term.
 * @param {string} text
 */
function readPoly(text) {
  const c = [0, 0, 0, 0];
  const s = text.replace(/−/g, '-').replace(/\s+/g, '');
  for (const m of s.matchAll(/([+-]?)(\d*)(x([²³]?))?/g)) {
    if (m[0] === '') continue;
    const mag = m[2] === '' ? 1 : Number(m[2]);
    const power = m[3] ? POWERS[/** @type {'' | '²' | '³'} */ (m[4])] : 0;
    c[3 - power] += m[1] === '-' ? -mag : mag;
  }
  return c;
}

/** @param {number[]} c @param {number} x */
const polyValue = (c, x) => c.reduce((acc, k) => acc * x + k, 0);

/**
 * A linear form in x, y, z written by `formText`: [a, b, c, d].
 * @param {string} text
 */
function readForm(text) {
  const out = [0, 0, 0, 0];
  const s = text.replace(/−/g, '-').replace(/\s+/g, '');
  for (const m of s.matchAll(/([+-]?)(\d*)([xyz]?)/g)) {
    if (m[0] === '') continue;
    const mag = m[2] === '' ? 1 : Number(m[2]);
    out[m[3] ? 'xyz'.indexOf(m[3]) : 3] += m[1] === '-' ? -mag : mag;
  }
  return out;
}

/**
 * A line written by `lineText`: its point at t = 0 and its direction.
 * @param {string} text
 */
function readLine(text) {
  const parts = /x = (.+?), y = (.+?), z = (.+?)(?: và| cắt|$)/.exec(text);
  if (!parts) throw new Error(text);
  const A = [];
  const u = [];
  for (const p of parts.slice(1, 4)) {
    const s = p.replace(/−/g, '-').replace(/\s+/g, '');
    let a0 = 0;
    let k = 0;
    for (const m of s.matchAll(/([+-]?)(\d*)(t?)/g)) {
      if (m[0] === '') continue;
      const mag = m[2] === '' ? 1 : Number(m[2]);
      if (m[3]) k += m[1] === '-' ? -mag : mag;
      else a0 += m[1] === '-' ? -mag : mag;
    }
    A.push(a0);
    u.push(k);
  }
  return { A, u };
}

/** Simpson's rule on [a; b]. @param {(x: number) => number} f @param {number} a @param {number} b */
function integrate(f, a, b, steps = 2000) {
  const h = (b - a) / steps;
  let s = f(a) + f(b);
  for (let i = 1; i < steps; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

describe('text helpers', () => {
  it('write expressions the way the book does', () => {
    expect(polyText([1, -3, 0, 2])).toBe('x³ − 3x² + 2');
    expect(formText([2, 0, -1], 3)).toBe('2x − z + 3');
    expect(formText([0, -1, 0], -4)).toBe('−y − 4');
    expect(paramText(1, 2)).toBe('1 + 2t');
    expect(paramText(-3, -1)).toBe('−3 − t');
    expect(paramText(0, -2)).toBe('−2t');
    expect(paramText(4, 0)).toBe('4');
    expect(lineText([1, 0, -2], [2, -1, 0])).toBe('x = 1 + 2t, y = −t, z = −2');
    expect(pt3([1, -2, 0])).toBe('(1; −2; 0)');
    expect(valueShow(frac(-1, 4))).toBe('−0,25');
    expect(valueShow(frac(46, 1000))).toBe('0,046');
    expect(valueShow(frac(13, 6))).toBe('13/6');
  });

  it('keep the vector tables true', () => {
    expect(QUADRUPLES.every(([a, b, c, d]) => a * a + b * b + c * c === d * d)).toBe(true);
    const bad = ANGLE_PAIRS.filter(({ u, v, deg }) => {
      const cos = Math.abs(dot(u, v)) / Math.sqrt(dot(u, u) * dot(v, v));
      return !close((Math.acos(cos) * 180) / Math.PI, deg);
    });
    expect(bad).toEqual([]);
  });
});

describe('every review skill', () => {
  for (const skill of REVIEW_SKILLS) {
    it(`${skill.id} writes its answer the way it checks it`, () => {
      const bad = [];
      for (const q of sample(skill)) {
        const all = [q.prompt, q.display, ...q.steps, ...q.hints].join(' ');
        const shown = readValue(q.display);
        const ok =
          !/undefined|NaN|Infinity|\d\.\d|--|\+ -|\+ 0[xyztn]|(^|[^\d/,])1[xyztn]\b|[\d)xyzt²³] [+−·:] −|\b0[xyztn]/.test(
            all,
          ) &&
          shown !== null &&
          sameValue(shown, q.answer) &&
          (q.steps.at(-1) ?? '').includes(q.display) &&
          !/\b(\d+)\/(\d+) = \1\/\2\b/.test(all) &&
          q.hints.length > 0 &&
          (q.simplest === true) === q.prompt.includes('phân số tối giản') &&
          (!q.simplest || inLowestTerms(q.display)) &&
          q.hints.every((h) => !h.includes(`= ${q.display}.`));
        if (!ok) bad.push(`${q.prompt} | ${q.display} | ${q.steps.join(' | ')}`);
      }
      expect(bad).toEqual([]);
    });

    it(`${skill.id} varies its questions and names no stray unit`, () => {
      const qs = sample(skill, 200);
      expect(new Set(qs.map((q) => q.prompt)).size).toBeGreaterThan(40);
      const units = new Set(qs.map((q) => questionUnit(q)));
      units.delete(null);
      expect([...units].every((u) => u === '°')).toBe(true);
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('extrema and monotonicity, by sampling the derivative', () => {
    const bad = [];
    for (const q of sample(cucTri)) {
      const c = readPoly(/y = (.+?)(?:\.| \S*biến)/.exec(q.prompt)?.[1] ?? '');
      const d = [3 * c[0], 2 * c[1], c[2]];
      const slope = (/** @type {number} */ x) => polyValue(d, x);
      const ans = value(q.answer);
      let ok;
      if (q.prompt.includes('giá trị cực đại')) {
        const xs = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter(
          (x) => slope(x - 0.01) > 0 && slope(x + 0.01) < 0,
        );
        ok = xs.length === 1 && polyValue(c, xs[0]) === ans;
      } else if (q.prompt.includes('điểm cực tiểu')) {
        ok = slope(ans - 0.01) < 0 && slope(ans + 0.01) > 0 && close(slope(ans), 0);
      } else {
        const want = q.prompt.includes('nghịch biến') ? -1 : 1;
        let count = 0;
        for (let x = -10; x <= 10; x++) if (Math.sign(slope(x)) === want) count++;
        ok = count === ans;
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('extreme values on a closed interval and asymptotes, numerically', () => {
    const bad = [];
    for (const q of sample(gtlnTiemCan)) {
      const ans = value(q.answer);
      let ok;
      const range = /y = (.+) trên đoạn \[(−?\d+); (−?\d+)\]/.exec(q.prompt);
      if (range) {
        const c = readPoly(range[1]);
        const [lo, hi] = [num(range[2]), num(range[3])];
        let best = q.prompt.includes('lớn nhất') ? -Infinity : Infinity;
        for (let i = 0; i <= 1000 * (hi - lo); i++) {
          const y = polyValue(c, lo + i / 1000);
          best = q.prompt.includes('lớn nhất') ? Math.max(best, y) : Math.min(best, y);
        }
        ok = close(best, ans, 1e-6);
      } else {
        const m = /y = \((.+?)\)\/\((.+?)\)/.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        const top = readPoly(m[1]);
        const bottom = readPoly(m[2]);
        const y = (/** @type {number} */ x) => polyValue(top, x) / polyValue(bottom, x);
        if (q.prompt.includes('tiệm cận đứng'))
          ok = close(polyValue(bottom, ans), 0) && Math.abs(polyValue(top, ans)) > 1e-9;
        else if (q.prompt.includes('tiệm cận ngang')) ok = close(y(1e7), ans, 1e-5);
        else ok = close(y(1e7) - 1e7, ans, 1e-4) && close(y(-1e7) + 1e7, ans, 1e-4);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('vectors and points in space by their coordinates', () => {
    const bad = [];
    for (const q of sample(vecto)) {
      const t = triples(q.prompt);
      const ans = value(q.answer);
      const i = ['hoành độ', 'tung độ', 'cao độ'].findIndex((w) => q.prompt.includes(`Tìm ${w}`));
      let ok;
      if (q.prompt.includes('tích vô hướng')) ok = dot(t[0], t[1]) === ans;
      else if (q.prompt.includes('độ dài'))
        ok = close(Math.hypot(...t[1].map((c, k) => c - t[0][k])), ans);
      else if (q.prompt.includes('trọng tâm')) ok = (t[0][i] + t[1][i] + t[2][i]) / 3 === ans;
      else if (q.prompt.includes('hình bình hành')) ok = t[0][i] + t[2][i] - t[1][i] === ans;
      else {
        const m = /vectơ b = \((−?\d+); (−?\d+); m\)/.exec(q.prompt);
        if (!m) throw new Error(q.prompt);
        ok = close(dot(t[0], [num(m[1]), num(m[2]), ans]), 0);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('spread of a grouped sample from the listed groups', () => {
    const bad = [];
    for (const q of sample(phanTan)) {
      const ends = [...q.prompt.matchAll(/\[(\d+); (\d+)\)/g)].map((m) => [num(m[1]), num(m[2])]);
      const counts = /lần lượt là ([\d; ]+)\./.exec(q.prompt)?.[1].split('; ').map(num) ?? [];
      const n = counts.reduce((s, c) => s + c, 0);
      const ans = value(q.answer);
      let ok;
      if (q.prompt.includes('khoảng biến thiên')) ok = ends.at(-1)[1] - ends[0][0] === ans;
      else if (q.prompt.includes('tứ phân vị')) {
        const quart = (/** @type {number} */ target) => {
          let cum = 0;
          for (let k = 0; k < counts.length; k++) {
            if (cum + counts[k] >= target)
              return ends[k][0] + ((target - cum) / counts[k]) * (ends[k][1] - ends[k][0]);
            cum += counts[k];
          }
          return NaN;
        };
        ok = close(quart((3 * n) / 4) - quart(n / 4), ans);
      } else {
        const mids = ends.map(([a, b]) => (a + b) / 2);
        const mean = counts.reduce((s, c, k) => s + c * mids[k], 0) / n;
        const variance = counts.reduce((s, c, k) => s + c * (mids[k] - mean) ** 2, 0) / n;
        ok = close(variance, ans);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('integrals, antiderivatives, areas and volumes by numerical integration', () => {
    const bad = [];
    for (const q of sample(tichPhan)) {
      const ans = value(q.answer);
      let ok;
      const def = /từ (−?\d+) đến (−?\d+) của \((.+)\) dx/.exec(q.prompt);
      const anti = /f\(x\) = (.+) và F\((\d)\) = (−?\d+)\. Giá trị của F\((−?\d+)\)/.exec(q.prompt);
      const area = /parabol y = (.+) và trục hoành/.exec(q.prompt);
      const ln = /từ 1 đến e(\S*) của (\d+)\/x dx/.exec(q.prompt);
      if (def) {
        const c = readPoly(def[3]);
        ok = close(
          integrate((x) => polyValue(c, x), num(def[1]), num(def[2])),
          ans,
        );
      } else if (anti) {
        const c = readPoly(anti[1]);
        const value0 = num(anti[3]);
        ok = close(value0 + integrate((x) => polyValue(c, x), num(anti[2]), num(anti[4])), ans);
      } else if (area) {
        const c = readPoly(area[1]).slice(1);
        const disc = Math.sqrt(c[1] * c[1] - 4 * c[0] * c[2]);
        const roots = [(-c[1] - disc) / (2 * c[0]), (-c[1] + disc) / (2 * c[0])].sort(
          (a, b) => a - b,
        );
        ok = close(
          integrate((x) => Math.abs(polyValue(c, x)), roots[0], roots[1]),
          ans,
        );
      } else if (ln) {
        const k = ln[1] === '' ? 1 : '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(ln[1]);
        ok = close(
          integrate((x) => num(ln[2]) / x, 1, Math.E ** k, 20000),
          ans,
        );
      } else {
        const b = num(/x = (\d+)\./.exec(q.prompt)?.[1] ?? '');
        const m = /y = (\d*)x,/.exec(q.prompt);
        const f = q.prompt.includes('√x')
          ? (/** @type {number} */ x) => x
          : (/** @type {number} */ x) => (num(m?.[1] || '1') * x) ** 2;
        ok = close(integrate(f, 0, b), ans);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('planes and lines by substituting coordinates', () => {
    const bad = [];
    for (const q of sample(matPhang)) {
      const ans = value(q.answer);
      const t = triples(q.prompt);
      let ok;
      if (q.prompt.includes('+ D = 0')) ok = dot(t[1], t[0]) + ans === 0;
      else if (q.prompt.includes('khoảng cách')) {
        const [a, b, c, d] = readForm(/\(P\): (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        ok = close(Math.abs(dot([a, b, c], t[0]) + d) / Math.hypot(a, b, c), ans);
      } else if (q.prompt.includes('cắt mặt phẳng')) {
        const { A, u } = readLine(q.prompt);
        const [a, b, c, d] = readForm(/\(P\): (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        const s = -(dot([a, b, c], A) + d) / dot([a, b, c], u);
        const i = ['hoành độ', 'tung độ', 'cao độ'].findIndex((w) => q.prompt.includes(`Tìm ${w}`));
        ok = close(A[i] + s * u[i], ans);
      } else {
        const p = readForm((/\(P\): (.+) = 0 và/.exec(q.prompt)?.[1] ?? '').replace('m', '0'));
        const qn = readForm(/\(Q\): (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        ok = close(p[0] * qn[0] + p[1] * qn[1] + ans * qn[2], 0);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('spheres and angles from the equations', () => {
    const bad = [];
    const deg = (/** @type {number} */ r) => (r * 180) / Math.PI;
    for (const q of sample(matCauGoc)) {
      const ans = value(q.answer);
      let ok;
      if (q.prompt.includes('x² + y² + z²')) {
        const [a, b, c, d] = readForm(/z² (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        ok = close(Math.sqrt((a * a + b * b + c * c) / 4 - d), ans);
      } else if (q.prompt.includes('đi qua điểm')) {
        const [I, A] = triples(q.prompt);
        ok = close(Math.hypot(...A.map((x, k) => x - I[k])), ans);
      } else if (q.prompt.includes('hai mặt phẳng')) {
        const p = readForm(/\(P\): (.+?) = 0/.exec(q.prompt)?.[1] ?? '').slice(0, 3);
        const r = readForm(/\(Q\): (.+?) = 0/.exec(q.prompt)?.[1] ?? '').slice(0, 3);
        ok = close(deg(Math.acos(Math.abs(dot(p, r)) / Math.sqrt(dot(p, p) * dot(r, r)))), ans);
      } else {
        const { u } = readLine(q.prompt);
        const n = readForm(/\(P\): (.+?) = 0/.exec(q.prompt)?.[1] ?? '').slice(0, 3);
        ok = close(deg(Math.asin(Math.abs(dot(u, n)) / Math.sqrt(dot(u, u) * dot(n, n)))), ans);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('conditional probability, total probability and Bayes from the stated numbers', () => {
    const bad = [];
    for (const q of sample(xacSuat)) {
      const ans = value(q.answer);
      const nums = [...q.prompt.matchAll(/= (\d,\d+)/g)].map((m) => num(m[1]));
      const pct = [...q.prompt.matchAll(/(\d+)%/g)].map((m) => num(m[1]) / 100);
      let ok;
      if (q.prompt.includes('Tính P(A | B)')) ok = close(nums[1] / nums[0], ans);
      else if (q.prompt.includes('biến cố AB')) ok = close(nums[0] * nums[1], ans);
      else {
        const [h1, h2, r1, r2] = pct;
        const total = h1 * r1 + h2 * r2;
        ok = q.prompt.includes('Biết sản phẩm')
          ? close((h1 * r1) / total, ans)
          : close(total, ans) && close(h1 + h2, 1);
      }
      if (!ok) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
