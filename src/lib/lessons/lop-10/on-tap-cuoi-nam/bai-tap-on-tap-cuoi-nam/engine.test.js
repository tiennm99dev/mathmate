import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, questionUnit, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  COS120,
  COS60,
  HERON,
  REVIEW_SKILLS,
  choose,
  arrange,
  frac,
  heBatPhuongTrinh,
  heThucLuong,
  hamSoBacHai,
  integersIn,
  join,
  lineText,
  meet,
  quadText,
  ratio,
  soDacTrung,
  tapHop,
  toHop,
  toaDo,
  valueShow,
  vecto,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 400) {
  const r = rng(2030);
  return Array.from({ length: count }, () => skill.make(r));
}

/** The integers in a text, with the book's minus undone. */
const ints = (/** @type {string} */ text) =>
  [...text.replace(/−/g, '-').matchAll(/-?\d+/g)].map((m) => Number(m[0]));

/** @param {import('#lib/fraction-engine/fraction.js').Fraction} f */
const value = (f) => f.n / f.d;

/** @param {number} a @param {number} b */
const close = (a, b) => Math.abs(a - b) < 1e-9;

/**
 * Coefficients of a polynomial written by `quadText` or `lineText`, read back
 * by monomial: { 'x²': 2, x: −6, y: 0, '': 4 }.
 * @param {string} text
 */
function coefficients(text) {
  /** @type {Record<string, number>} */
  const out = {};
  const s = text.replace(/−/g, '-').replace(/\s+/g, '');
  for (const m of s.matchAll(/([+-]?)(\d*)(x²|y²|x|y)?/g)) {
    if (m[0] === '') continue;
    const mag = m[2] === '' ? 1 : Number(m[2]);
    out[m[3] ?? ''] = (out[m[3] ?? ''] ?? 0) + (m[1] === '-' ? -mag : mag);
  }
  return out;
}

describe('text helpers', () => {
  it('write expressions the way the book does', () => {
    expect(quadText(2, -6, 4)).toBe('2x² − 6x + 4');
    expect(quadText(-1, 0, 9)).toBe('−x² + 9');
    expect(quadText(1, 5, 0)).toBe('x² + 5x');
    expect(lineText(3, -4, 2)).toBe('3x − 4y + 2 = 0');
    expect(lineText(0, 2, -5)).toBe('2y − 5 = 0');
    expect(lineText(-1, 1, 0)).toBe('−x + y = 0');
    expect(valueShow(frac(15, 2))).toBe('7,5');
    expect(valueShow(frac(-1, 4))).toBe('−0,25');
    expect(valueShow(frac(13, 6))).toBe('13/6');
    expect(ratio(9, 36)).toBe('9/36 = 1/4');
    expect(ratio(3, 10)).toBe('3/10');
    expect(ratio(12, 8, valueShow)).toBe('12/8 = 1,5');
  });

  it('count subsets and arrangements', () => {
    expect(choose(10, 3)).toBe(120);
    expect(choose(5, 0)).toBe(1);
    expect(choose(3, 4)).toBe(0);
    expect(arrange(8, 3)).toBe(336);
  });

  it('meet and join intervals', () => {
    const A = { lo: -2, hi: 3, loIn: false, hiIn: false };
    const B = { lo: 0, hi: 3, loIn: true, hiIn: true };
    expect(meet(A, B)).toEqual({ lo: 0, hi: 3, loIn: true, hiIn: false });
    expect(join(A, B)).toEqual({ lo: -2, hi: 3, loIn: false, hiIn: true });
    expect(integersIn({ lo: -2, hi: 3, loIn: false, hiIn: true })).toBe(5);
    expect(meet(A, { lo: 3, hi: 5, loIn: true, hiIn: true })).toBeNull();
  });

  it('keep the whole-number triangles whole', () => {
    const bad = [];
    for (const [b, c, a] of COS60) if (b * b + c * c - b * c !== a * a) bad.push([b, c, a]);
    for (const [b, c, a] of COS120) if (b * b + c * c + b * c !== a * a) bad.push([b, c, a]);
    for (const [a, b, c, S] of HERON) {
      const p = (a + b + c) / 2;
      if (p * (p - a) * (p - b) * (p - c) !== S * S) bad.push([a, b, c, S]);
    }
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
          !/undefined|NaN|Infinity|\d\.\d|--|\+ -|\+ 0x|(^|[^\d/])1[xya]|[\d)xy²³] [+−·:] −|\b0x/.test(
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
        if (!ok) bad.push(q.prompt);
      }
      expect(bad).toEqual([]);
    });

    it(`${skill.id} varies its questions and names no stray unit`, () => {
      const qs = sample(skill, 200);
      expect(new Set(qs.map((q) => q.prompt)).size).toBeGreaterThan(40);
      const units = new Set(qs.map((q) => questionUnit(q)));
      units.delete(null);
      expect([...units].every((u) => u === '°' || u === 'cm²')).toBe(true);
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('sets and intervals', () => {
    const bad = [];
    for (const q of sample(tapHop)) {
      const sub = /\{1; 2; …; (\d+)\}.*thoả mãn \{([\d; ]+)\}/.exec(q.prompt);
      let want;
      if (sub) {
        const n = Number(sub[1]);
        const k = sub[2].split(';').length;
        want = 2 ** (n - k);
      } else {
        const m = /A = ([[(])(.+?); (.+?)([\])]) và B = ([[(])(.+?); (.+?)([\])])\. Tập A (.)/.exec(
          q.prompt,
        );
        if (!m) {
          bad.push(q.prompt);
          continue;
        }
        const num = (/** @type {string} */ t) => Number(t.replace('−', '-'));
        const inA = (/** @type {number} */ x) =>
          (m[1] === '[' ? x >= num(m[2]) : x > num(m[2])) &&
          (m[4] === ']' ? x <= num(m[3]) : x < num(m[3]));
        const inB = (/** @type {number} */ x) =>
          (m[5] === '[' ? x >= num(m[6]) : x > num(m[6])) &&
          (m[8] === ']' ? x <= num(m[7]) : x < num(m[7]));
        want = 0;
        for (let x = -20; x <= 20; x += 1) {
          if (m[9] === '∩' ? inA(x) && inB(x) : inA(x) || inB(x)) want += 1;
        }
        if (want === 0) bad.push(q.prompt);
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('extreme values over the region of a system, by brute force on a fine grid', () => {
    const bad = [];
    for (const q of sample(heBatPhuongTrinh, 150)) {
      const m = /F\(x; y\) = (.+) trên .*x \+ y ≤ (\d+), x ≤ (\d+)\./.exec(q.prompt);
      if (!m) {
        bad.push(q.prompt);
        continue;
      }
      const c = coefficients(m[1]);
      const [s, t] = [Number(m[2]), Number(m[3])];
      let best = q.prompt.includes('lớn nhất') ? -Infinity : Infinity;
      for (let x = 0; x <= t; x += 0.5)
        for (let y = 0; x + y <= s; y += 0.5) {
          const F = (c.x ?? 0) * x + (c.y ?? 0) * y;
          best = q.prompt.includes('lớn nhất') ? Math.max(best, F) : Math.min(best, F);
        }
      if (!close(value(q.answer), best)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('the triangle: law of cosines, area, Heron, R and r', () => {
    const bad = [];
    for (const q of sample(heThucLuong)) {
      const [first, second, third] = ints(q.prompt);
      let want;
      if (q.prompt.includes('Tính BC')) {
        const A = (third * Math.PI) / 180;
        want = Math.sqrt(first ** 2 + second ** 2 - 2 * first * second * Math.cos(A));
      } else if (q.prompt.includes('diện tích tam giác ABC')) {
        want = 0.5 * first * second * Math.sin((third * Math.PI) / 180);
      } else {
        const p = (first + second + third) / 2;
        const S = Math.sqrt(p * (p - first) * (p - second) * (p - third));
        want = q.prompt.includes('ngoại tiếp')
          ? (first * second * third) / (4 * S)
          : q.prompt.includes('nội tiếp')
            ? S / p
            : S;
      }
      if (Math.abs(value(q.answer) - want) > 1e-6) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('vectors: dot product, combinations and the cosine of the angle', () => {
    const bad = [];
    for (const q of sample(vecto)) {
      const n = ints(q.prompt.replace(/cos\(a, b\)/, ''));
      const [a1, a2, b1, b2] = n;
      let want;
      if (q.prompt.includes('tích vô hướng')) want = a1 * b1 + a2 * b2;
      else if (q.prompt.includes('cos')) {
        want = (a1 * b1 + a2 * b2) / (Math.hypot(a1, a2) * Math.hypot(b1, b2));
      } else {
        const u = /u = (−?\d*)a ([+−]) (\d*)b/.exec(q.prompt);
        if (!u) {
          bad.push(q.prompt);
          continue;
        }
        const m = u[1] === '' ? 1 : u[1] === '−' ? -1 : Number(u[1].replace('−', '-'));
        const k = (u[2] === '−' ? -1 : 1) * (u[3] === '' ? 1 : Number(u[3]));
        want = q.prompt.includes('hoành độ') ? m * a1 + k * b1 : m * a2 + k * b2;
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('mean, median and variance of the sample', () => {
    const bad = [];
    for (const q of sample(soDacTrung)) {
      const data = /: ([\d; ]+)\./.exec(q.prompt)?.[1].split('; ').map(Number) ?? [];
      const n = data.length;
      const mean = data.reduce((s, x) => s + x, 0) / n;
      const sorted = [...data].sort((x, y) => x - y);
      const want = q.prompt.includes('trung bình')
        ? mean
        : q.prompt.includes('trung vị')
          ? n % 2
            ? sorted[(n - 1) / 2]
            : (sorted[n / 2 - 1] + sorted[n / 2]) / 2
          : data.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
      if (n < 5 || !close(value(q.answer), want) || q.display.includes('/')) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('quadratic functions, trinomial signs and the root equation', () => {
    const bad = [];
    for (const q of sample(hamSoBacHai)) {
      if (q.prompt.startsWith('Tìm giá trị')) {
        const c = coefficients(/y = (.+)\.$/.exec(q.prompt)?.[1] ?? '');
        const [a, b, k] = [c['x²'], c.x ?? 0, c[''] ?? 0];
        const h = -b / (2 * a);
        const top = a * h * h + b * h + k;
        const right = q.prompt.includes(a > 0 ? 'nhỏ nhất' : 'lớn nhất');
        if (!right || !close(value(q.answer), top)) bad.push(q.prompt);
      } else if (q.prompt.startsWith('Bất phương trình')) {
        const m = /trình (.+) ([<>≤≥]) 0/.exec(q.prompt);
        const c = coefficients(m?.[1] ?? '');
        const f = (/** @type {number} */ x) => c['x²'] * x * x + (c.x ?? 0) * x + (c[''] ?? 0);
        const sign = m?.[2] ?? '';
        const test = (/** @type {number} */ v) =>
          sign === '<' ? v < 0 : sign === '>' ? v > 0 : sign === '≤' ? v <= 0 : v >= 0;
        let count = 0;
        for (let x = -50; x <= 50; x += 1) if (test(f(x))) count += 1;
        if (!close(value(q.answer), count)) bad.push(q.prompt);
      } else {
        const m = /√\((.+)\) = (.+)\. Nhập/.exec(q.prompt);
        const c = coefficients(m?.[1] ?? '');
        const r = coefficients(m?.[2] ?? '');
        const roots = [];
        for (let x = -30; x <= 30; x += 1) {
          const inside = c['x²'] * x * x + (c.x ?? 0) * x + (c[''] ?? 0);
          const rhs = (r.x ?? 0) * x + (r[''] ?? 0);
          if (inside >= 0 && close(Math.sqrt(inside), rhs)) roots.push(x);
        }
        if (roots.length !== 1 || !close(value(q.answer), roots[0])) bad.push(q.prompt);
      }
    }
    expect(bad).toEqual([]);
  });

  it('coordinates: distance, circle radius and the angle between lines', () => {
    const bad = [];
    for (const q of sample(toaDo)) {
      let want;
      if (q.prompt.includes('khoảng cách')) {
        const [x0, y0] = ints(/M(\(.+?\))/.exec(q.prompt)?.[1] ?? '');
        const c = coefficients(/Δ: (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        const [a, b, k] = [c.x ?? 0, c.y ?? 0, c[''] ?? 0];
        want = Math.abs(a * x0 + b * y0 + k) / Math.hypot(a, b);
      } else if (q.prompt.includes('bán kính')) {
        const c = coefficients(/tròn (.+) = 0/.exec(q.prompt)?.[1] ?? '');
        const [a, b] = [-(c.x ?? 0) / 2, -(c.y ?? 0) / 2];
        want = Math.sqrt(a * a + b * b - (c[''] ?? 0));
      } else {
        const m = /thẳng (.+) = 0 và (.+) = 0/.exec(q.prompt);
        const l1 = coefficients(m?.[1] ?? '');
        const l2 = coefficients(m?.[2] ?? '');
        const n1 = [l1.x ?? 0, l1.y ?? 0];
        const n2 = [l2.x ?? 0, l2.y ?? 0];
        const cos =
          Math.abs(n1[0] * n2[0] + n1[1] * n2[1]) /
          (Math.hypot(n1[0], n1[1]) * Math.hypot(n2[0], n2[1]));
        want = (Math.acos(Math.min(1, cos)) * 180) / Math.PI;
      }
      if (Math.abs(value(q.answer) - want) > 1e-6) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('counting, recounted by listing', () => {
    const bad = [];
    for (const q of sample(toHop)) {
      const n = ints(q.prompt);
      let want;
      if (q.prompt.includes('trực nhật')) want = choose(n[0], n[1]);
      else if (q.prompt.includes('ứng viên'))
        want = arrange(n[0], q.prompt.includes('bí thư') ? 3 : 2);
      else if (q.prompt.includes('cả nam và nữ')) {
        const [boys, girls] = n;
        want = 0;
        const people = boys + girls;
        for (let i = 0; i < people; i += 1)
          for (let j = i + 1; j < people; j += 1)
            for (let k = j + 1; k < people; k += 1) {
              const b = [i, j, k].filter((p) => p < boys).length;
              if (b > 0 && b < 3) want += 1;
            }
      } else {
        // Expand (ax + b)^n by repeated multiplication and read the coefficient.
        const m = /x(.) trong khai triển \((\d*)x ([+−]) (\d+)\)(.)/.exec(q.prompt);
        const supers = '⁰¹²³⁴⁵⁶⁷⁸⁹';
        const k = supers.indexOf(m?.[1] ?? '');
        const a = m?.[2] ? Number(m[2]) : 1;
        const b = (m?.[3] === '−' ? -1 : 1) * Number(m?.[4]);
        const power = supers.indexOf(m?.[5] ?? '');
        let poly = [1];
        for (let i = 0; i < power; i += 1) {
          const next = Array(poly.length + 1).fill(0);
          poly.forEach((c, d) => {
            next[d] += c * b;
            next[d + 1] += c * a;
          });
          poly = next;
        }
        want = poly[k];
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('probability, recounted over the whole sample space', () => {
    const bad = [];
    for (const q of sample(xacSuat)) {
      const n = ints(q.prompt);
      let good = 0;
      let all = 0;
      if (q.prompt.includes('xúc xắc')) {
        const s = n.at(-1) ?? 0;
        for (let a = 1; a <= 6; a += 1)
          for (let b = 1; b <= 6; b += 1) {
            all += 1;
            const t = a + b;
            if (
              q.prompt.includes('bằng') && !q.prompt.includes('ít nhất')
                ? t === s
                : q.prompt.includes('không vượt quá')
                  ? t <= s
                  : t >= s
            )
              good += 1;
          }
      } else {
        const [red, blue, take] = [n[0], n[1], n[2]];
        const balls = [...Array(red).fill('R'), ...Array(blue).fill('B')];
        /** @param {number} from @param {string[]} picked */
        const walk = (from, picked) => {
          if (picked.length === take) {
            all += 1;
            const reds = picked.filter((c) => c === 'R').length;
            const hit = q.prompt.includes('khác màu')
              ? reds === 1
              : q.prompt.includes('đều màu đỏ')
                ? reds === 2
                : reds < take;
            if (hit) good += 1;
            return;
          }
          for (let i = from; i < balls.length; i += 1) walk(i + 1, [...picked, balls[i]]);
        };
        walk(0, []);
      }
      if (!close(value(q.answer), good / all)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
