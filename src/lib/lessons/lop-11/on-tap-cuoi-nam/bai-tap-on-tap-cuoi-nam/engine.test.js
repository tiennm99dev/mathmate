import { describe, it, expect } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { inLowestTerms, questionUnit, readValue, sameValue } from '#lib/core/adaptive.js';
import {
  QUADRANTS,
  REVIEW_SKILLS,
  daoHam,
  daySo,
  derive,
  frac,
  ghepNhom,
  gioiHan,
  groupedStats,
  luongGiac,
  muLogarit,
  polyAt,
  polyText,
  ratio,
  songSong,
  substituted,
  supText,
  valueShow,
  vuongGoc,
  xacSuat,
} from './engine.js';

/** @param {import('#lib/core/adaptive.js').ReviewSkill} skill */
function sample(skill, count = 400) {
  const r = rng(2031);
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

/** A fraction or number ('−3/5', '4') as a JS number. */
const fracNum = (/** @type {string} */ t) => {
  const [p, q] = t.split('/');
  return q === undefined ? num(p) : num(p) / num(q);
};

/** @param {import('#lib/fraction-engine/fraction.js').Fraction} f */
const value = (f) => f.n / f.d;

/** @param {number} a @param {number} b */
const close = (a, b, eps = 1e-6) => Math.abs(a - b) < eps;

const SUPERS = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };

/**
 * Coefficients of a one-variable polynomial written by `polyText`, read back
 * by power: '−x³ + 4x² − x + 6' → { 3: −1, 2: 4, 1: −1, 0: 6 }.
 * @param {string} text
 * @param {string} v
 */
function coefficients(text, v = 'x') {
  /** @type {Record<number, number>} */
  const out = {};
  const s = text.replace(/−/g, '-').replace(/\s+/g, '');
  const re = new RegExp(`([+-]?)(\\d*)(${v}[²³⁴]?)?`, 'g');
  for (const m of s.matchAll(re)) {
    if (m[0] === '') continue;
    const mag = m[2] === '' ? 1 : Number(m[2]);
    const power = m[3] ? (m[3].length > 1 ? SUPERS[/** @type {'²'} */ (m[3][1])] : 1) : 0;
    out[power] = (out[power] ?? 0) + (m[1] === '-' ? -mag : mag);
  }
  return out;
}

/** @param {Record<number, number>} c @param {number} x */
const evalCoeffs = (c, x) => Object.entries(c).reduce((s, [p, k]) => s + k * x ** Number(p), 0);

describe('text helpers', () => {
  it('write expressions the way the book does', () => {
    expect(polyText([2, 0, -3, 1])).toBe('2x³ − 3x + 1');
    expect(polyText([-1, 4, -1, 6])).toBe('−x³ + 4x² − x + 6');
    expect(polyText([1, -3, 5, 0], 't')).toBe('t³ − 3t² + 5t');
    expect(derive([2, 0, -3, 1])).toEqual([6, 0, -3]);
    expect(polyAt([6, 0, -3], -1)).toBe(3);
    expect(substituted([6, -4, 1], -1)).toBe('6 · (−1)² − 4 · (−1) + 1');
    expect(supText('x − 1')).toBe('ˣ⁻¹');
    expect(supText('x + 12')).toBe('ˣ⁺¹²');
    expect(valueShow(frac(15, 2))).toBe('7,5');
    expect(valueShow(frac(-1, 4))).toBe('−0,25');
    expect(valueShow(frac(26, 3))).toBe('26/3');
    expect(ratio(28, 38, (f) => `${f.n}/${f.d}`)).toBe('28/38 = 14/19');
    expect(ratio(26, 3)).toBe('26/3');
    expect(ratio(-5, 1)).toBe('−5');
  });

  it('find the mean, median and mode of a grouped sample', () => {
    // The book's example shape: [40; 50) … with frequencies 3; 8; 12; 9; 8.
    const s = groupedStats(40, 10, [3, 8, 12, 9, 8]);
    expect(s.n).toBe(40);
    expect(value(s.mean)).toBe((45 * 3 + 55 * 8 + 65 * 12 + 75 * 9 + 85 * 8) / 40);
    // n/2 = 20, cumulative 3; 11; 23 → group [60; 70), C = 11.
    expect(value(s.median)).toBeCloseTo(60 + ((20 - 11) / 12) * 10, 9);
    expect(value(s.mode)).toBeCloseTo(60 + (4 / (4 + 3)) * 10, 9);
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
          !/undefined|NaN|Infinity|\d\.\d|--|\+ -|\+ 0[xtn]|(^|[^\d/,])1[xtn]\b|[\d)xt²³] [+−·:] −|\b0[xtn]/.test(
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
        if (!ok) bad.push(`${q.prompt} | ${q.steps.join(' | ')}`);
      }
      expect(bad).toEqual([]);
    });

    it(`${skill.id} varies its questions and names no stray unit`, () => {
      const qs = sample(skill, 200);
      expect(new Set(qs.map((q) => q.prompt)).size).toBeGreaterThan(40);
      const units = new Set(qs.map((q) => questionUnit(q)));
      units.delete(null);
      expect(
        [...units].every((u) => u !== null && ['°', 'cm', 'cm²', 'cm³', 'm/s', 'm/s²'].includes(u)),
      ).toBe(true);
    });
  }
});

describe('answers recomputed from the prompt', () => {
  it('trigonometry: radians, values from one ratio, extreme values', () => {
    const bad = [];
    for (const q of sample(luongGiac)) {
      let want;
      const rad = /Đổi số đo (−?)(\d*)π\/(\d+) rad/.exec(q.prompt);
      const ratioQ = /Cho (sin|cos) α = (.+?) với (.+?)\. Tính (tan α|sin 2α|cos 2α)\./.exec(
        q.prompt,
      );
      const ext =
        /giá trị (lớn|nhỏ) nhất của hàm số y = (−?)(\d*)(sin|cos) x(?: ([+−]) (\d+))?\./.exec(
          q.prompt,
        );
      if (rad) {
        want = ((rad[1] ? -1 : 1) * (rad[2] === '' ? 1 : Number(rad[2])) * 180) / Number(rad[3]);
      } else if (ratioQ) {
        const Q = QUADRANTS.find((x) => x.text === ratioQ[3]);
        if (!Q) {
          bad.push(q.prompt);
          continue;
        }
        const g = fracNum(ratioQ[2]);
        const o = (ratioQ[1] === 'sin' ? Q.cos : Q.sin) * Math.sqrt(1 - g * g);
        const [s, c] = ratioQ[1] === 'sin' ? [g, o] : [o, g];
        if (Math.sign(s) !== Q.sin || Math.sign(c) !== Q.cos) bad.push(q.prompt);
        want = ratioQ[4] === 'tan α' ? s / c : ratioQ[4] === 'sin 2α' ? 2 * s * c : c * c - s * s;
      } else if (ext) {
        const k = (ext[2] ? -1 : 1) * (ext[3] === '' ? 1 : Number(ext[3]));
        const b = ext[5] ? (ext[5] === '−' ? -1 : 1) * Number(ext[6]) : 0;
        const f = ext[4] === 'sin' ? Math.sin : Math.cos;
        const ys = Array.from({ length: 3601 }, (_, i) => k * f((i * Math.PI) / 1800) + b);
        want = ext[1] === 'lớn' ? Math.max(...ys) : Math.min(...ys);
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want, 1e-6)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('sequences: terms and sums by listing them', () => {
    const bad = [];
    const sub = (/** @type {string} */ t) =>
      Number([...t].map((ch) => '₀₁₂₃₄₅₆₇₈₉'.indexOf(ch)).join(''));
    for (const q of sample(daySo)) {
      let want;
      const first =
        /(cộng|nhân) \(uₙ\) có u₁ = (\S+) và công (?:sai d|bội q) = (\S+)\. (?:Tìm u|Tính tổng \d+ số hạng đầu S)([₀-₉]+)\./.exec(
          q.prompt,
        );
      const two =
        /có u([₀-₉]+) = (\S+) và u([₀-₉]+) = (\S+)\. Tìm (công sai d|số hạng đầu u₁)\./.exec(
          q.prompt,
        );
      if (first) {
        const [u1, step, n] = [num(first[2]), num(first[3]), sub(first[4])];
        const terms = [u1];
        while (terms.length < n)
          terms.push(
            first[1] === 'cộng' ? terms[terms.length - 1] + step : terms[terms.length - 1] * step,
          );
        want = q.prompt.includes('Tính tổng')
          ? terms.reduce((s, t) => s + t, 0)
          : terms[terms.length - 1];
      } else if (two) {
        const [m, um, k, uk] = [sub(two[1]), num(two[2]), sub(two[3]), num(two[4])];
        const d = (uk - um) / (k - m);
        want = two[5] === 'công sai d' ? d : um - (m - 1) * d;
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('grouped data: mean, median and mode from the listed values', () => {
    const bad = [];
    for (const q of sample(ghepNhom)) {
      const groups = [...q.prompt.matchAll(/\[(\d+); (\d+)\)/g)].map((m) => [
        Number(m[1]),
        Number(m[2]),
      ]);
      const counts = /lần lượt là ([\d; ]+)\./.exec(q.prompt)?.[1].split('; ').map(Number) ?? [];
      if (groups.length !== 5 || counts.length !== 5) {
        bad.push(q.prompt);
        continue;
      }
      const n = counts.reduce((s, m) => s + m, 0);
      const h = groups[0][1] - groups[0][0];
      let want;
      if (q.prompt.includes('số trung bình')) {
        want = groups.reduce((s, [a, b], i) => s + ((a + b) / 2) * counts[i], 0) / n;
      } else if (q.prompt.includes('trung vị')) {
        let cum = 0;
        let p = 0;
        for (; p < 5; p += 1) {
          if (cum + counts[p] >= n / 2) break;
          cum += counts[p];
        }
        want = groups[p][0] + ((n / 2 - cum) / counts[p]) * h;
        // The median lies inside its group.
        if (want < groups[p][0] || want > groups[p][1]) bad.push(q.prompt);
      } else {
        const j = counts.indexOf(Math.max(...counts));
        const d1 = counts[j] - (counts[j - 1] ?? 0);
        const d2 = counts[j] - (counts[j + 1] ?? 0);
        want = groups[j][0] + (d1 / (d1 + d2)) * h;
        if (counts.filter((m) => m === counts[j]).length !== 1) bad.push(q.prompt);
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('parallel planes: lengths and areas by coordinates', () => {
    const bad = [];
    for (const q of sample(songSong)) {
      const [k] = /(?:AM = |SM = )(\d)/.exec(q.prompt)?.slice(1).map(Number) ?? [1];
      const t = k / (k + 1);
      let want;
      if (q.prompt.includes('G₁G₂')) {
        const cd = Number(/CD = (\d+)/.exec(q.prompt)?.[1]);
        // Coordinates: A, B, C, D in space; centroids of ABC and ABD.
        const [A, B, C, D] = [
          [0, 0, 0],
          [4, 1, 0],
          [1, 5, 2],
          [1 + cd, 5, 2],
        ];
        const g = (/** @type {number[][]} */ ps) =>
          [0, 1, 2].map((i) => (ps[0][i] + ps[1][i] + ps[2][i]) / 3);
        const [g1, g2] = [g([A, B, C]), g([A, B, D])];
        want = Math.hypot(g1[0] - g2[0], g1[1] - g2[1], g1[2] - g2[2]);
      } else if (q.prompt.includes('NP')) {
        const cd = Number(/CD = (\d+)/.exec(q.prompt)?.[1]);
        // A at the origin, the plane through M parallel to (BCD) scales C and D by AM/AB.
        want = t * cd;
      } else {
        const [ab, ad] = [/AB = (\d+)/, /AD = (\d+)/].map((re) => Number(re.exec(q.prompt)?.[1]));
        want = t * ab * t * ad;
      }
      if (!close(value(q.answer), want)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('limits and continuity, by evaluating close to the point', () => {
    const bad = [];
    for (const q of sample(gioiHan)) {
      let want;
      const seq = /uₙ = \((.+)\)\/\((.+)\) khi n/.exec(q.prompt);
      const fn = /của \((.+)\)\/\(x ([+−]) (\d+)\) khi x → (−?\d+)\./.exec(q.prompt);
      const series = /u₁ = (\S+) và công bội q = (\S+)\./.exec(q.prompt);
      const cont =
        /\(x² − (\d+)\)\/\(x − (\d+)\) khi x ≠ \d+ và f\(\d+\) = m(?: ([+−]) (\d+))?\./.exec(
          q.prompt,
        );
      if (seq) {
        const [top, bottom] = [coefficients(seq[1], 'n'), coefficients(seq[2], 'n')];
        const N = 1e7;
        want = evalCoeffs(top, N) / evalCoeffs(bottom, N);
        for (let n = 1; n < 30; n += 1) if (evalCoeffs(bottom, n) === 0) bad.push(q.prompt);
        if (!close(value(q.answer), want, 1e-5)) bad.push(q.prompt);
        continue;
      } else if (fn) {
        const top = coefficients(fn[1]);
        const c = (fn[2] === '−' ? 1 : -1) * Number(fn[3]);
        const x = num(fn[4]) + 1e-7;
        if (c !== num(fn[4]) || !close(evalCoeffs(top, num(fn[4])), 0)) bad.push(q.prompt);
        want = evalCoeffs(top, x) / (x - c);
        if (!close(value(q.answer), want, 1e-5)) bad.push(q.prompt);
        continue;
      } else if (series) {
        const [u1, r] = [num(series[1]), fracNum(series[2])];
        want = 0;
        for (let i = 0, t = u1; i < 400; i += 1, t *= r) want += t;
      } else if (cont) {
        const r = Number(cont[2]);
        if (r * r !== Number(cont[1])) bad.push(q.prompt);
        const shift = cont[3] ? (cont[3] === '−' ? -1 : 1) * Number(cont[4]) : 0;
        const x = r + 1e-7;
        want = (x * x - r * r) / (x - r) - shift;
        if (!close(value(q.answer), want, 1e-5)) bad.push(q.prompt);
        continue;
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want, 1e-6)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('exponents and logarithms: values, equations and integer solutions', () => {
    const bad = [];
    for (const q of sample(muLogarit)) {
      let want;
      const diff = /Tính log[₀-₉]+ ([\d\u202f]+) − log[₀-₉]+ (\d+)\./.exec(q.prompt);
      const base = /Tính log([₀-₉]+) ([\d\u202f]+)\.$/.exec(q.prompt);
      const eq = /Giải phương trình (\d+)ˣ([⁺⁻][⁰¹²³⁴⁵⁶⁷⁸⁹]+)? = (\S+)\./.exec(q.prompt);
      const ineq = /Bất phương trình log([₂₃])(?:\((x(?: [+−] \d+)?)\)| x) ([<≤]) (\d+)/.exec(
        q.prompt,
      );
      const a = diff ? Number('₀₁₂₃₄₅₆₇₈₉'.indexOf(q.prompt[8])) : 0;
      if (diff) {
        want = Math.log(num(diff[1]) / num(diff[2])) / Math.log(a);
      } else if (base) {
        const b = Number([...base[1]].map((ch) => '₀₁₂₃₄₅₆₇₈₉'.indexOf(ch)).join(''));
        want = Math.log(num(base[2])) / Math.log(b);
      } else if (eq) {
        const shift = eq[2]
          ? (eq[2][0] === '⁻' ? -1 : 1) *
            Number([...eq[2].slice(1)].map((ch) => SUPERS[/** @type {'²'} */ (ch)]).join(''))
          : 0;
        const x = value(q.answer);
        if (!close(Number(eq[1]) ** (x + shift), num(eq[3]), 1e-6)) bad.push(q.prompt);
        continue;
      } else if (ineq) {
        const b = '₀₁₂₃₄₅₆₇₈₉'.indexOf(ineq[1]);
        const c = ineq[2] ? (coefficients(ineq[2])[0] ?? 0) : 0;
        want = 0;
        for (let x = -60; x <= 200; x += 1) {
          if (x + c <= 0) continue;
          const L = Math.log(x + c) / Math.log(b);
          if (ineq[3] === '<' ? L < Number(ineq[4]) - 1e-9 : L <= Number(ineq[4]) + 1e-9) want += 1;
        }
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want, 1e-9)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('perpendicularity: volumes, angles and distances by coordinates', () => {
    const bad = [];
    /** @type {Record<string, number>} */
    const SA = {
      'a√3/3': Math.sqrt(3) / 3,
      a: 1,
      'a√3': Math.sqrt(3),
      'a√6/3': Math.sqrt(6) / 3,
      'a√2': Math.SQRT2,
      'a√6': Math.sqrt(6),
      'a√6/6': Math.sqrt(6) / 6,
      'a√2/2': Math.SQRT2 / 2,
      'a√6/2': Math.sqrt(6) / 2,
    };
    const deg = (/** @type {number} */ r) => (r * 180) / Math.PI;
    for (const q of sample(vuongGoc)) {
      let want;
      const nums = (/** @type {RegExp} */ re) => Number(re.exec(q.prompt)?.[1]);
      if (q.prompt.includes('thể tích khối chóp')) {
        want = (nums(/AB = (\d+)/) * nums(/AD = (\d+)/) * nums(/SA = (\d+)/)) / 3;
      } else if (q.prompt.includes('lăng trụ')) {
        want = (nums(/AB = (\d+)/) * nums(/AC = (\d+)/) * nums(/AA' = (\d+)/)) / 2;
      } else if (q.prompt.includes('khoảng cách')) {
        // A at the origin, B = (ab, 0, 0), C = (ab, ab, 0), S = (0, 0, sa).
        const [ab, sa] = [nums(/AB = (\d+)/), nums(/SA = (\d+)/)];
        // Normal of (SBC): (SB) × (BC) with SB = (ab, 0, −sa), BC = (0, ab, 0).
        const nrm = [sa * ab, 0, ab * ab];
        want = Math.abs(nrm[0] * ab) / Math.hypot(...nrm);
      } else {
        const h = SA[/SA = (\S+)\./.exec(q.prompt)?.[1] ?? ''];
        if (h === undefined) {
          bad.push(q.prompt);
          continue;
        }
        // Square ABCD of side 1 with A at the origin, S = (0, 0, h).
        if (q.prompt.includes('SB')) want = deg(Math.atan2(h, 1));
        else if (q.prompt.includes('SC')) want = deg(Math.atan2(h, Math.SQRT2));
        else want = deg(Math.atan2(h, Math.SQRT2 / 2));
      }
      if (!close(value(q.answer), want, 1e-6)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('probability: listing the outcomes of two independent shots, or counting a class', () => {
    const bad = [];
    for (const q of sample(xacSuat)) {
      let want;
      const shots = /An là (\S+), của Bình là (\S+)\. Tính xác suất để (.+)\./.exec(q.prompt);
      const cls = /có (\d+) học sinh, trong đó (\d+) bạn .+?, (\d+) bạn .+? và (\d+) bạn/.exec(
        q.prompt,
      );
      if (shots) {
        const [p, r] = [num(shots[1]), num(shots[2])];
        want = 0;
        for (const a of [true, false])
          for (const b of [true, false]) {
            const P = (a ? p : 1 - p) * (b ? r : 1 - r);
            const hits = Number(a) + Number(b);
            const ok = {
              'cả hai người đều bắn trúng': hits === 2,
              'có ít nhất một người bắn trúng': hits >= 1,
              'có đúng một người bắn trúng': hits === 1,
              'cả hai người đều bắn trượt': hits === 0,
            }[shots[3]];
            if (ok === undefined) bad.push(q.prompt);
            if (ok) want += P;
          }
      } else if (cls) {
        const [n, x, y, z] = cls.slice(1).map(Number);
        // Build the class: z like both, x − z football only, y − z badminton only.
        const pupils = Array.from({ length: n }, (_, i) => i < x || (i >= x - z && i < x - z + y));
        want = pupils.filter(Boolean).length / n;
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want, 1e-9)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });

  it('derivatives: by difference quotients on the polynomial in the prompt', () => {
    const bad = [];
    const dh = 1e-4;
    for (const q of sample(daoHam)) {
      let want;
      const poly = /Tính (f'{1,2})\((−?\d+)\), biết f\(x\) = ([^√]+)\.$/.exec(q.prompt);
      const root = /Tính f'\((−?\d+)\), biết f\(x\) = √\((.+)\)\./.exec(q.prompt);
      const tan = /y = f\(x\) = (.+) tại điểm có hoành độ x₀ = (−?\d+)/.exec(q.prompt);
      const move = /s\(t\) = (.+), trong đó .* Tính (gia tốc|vận tốc) .* t = (\d+) s\./.exec(
        q.prompt,
      );
      if (root) {
        const c = coefficients(root[2]);
        const x = num(root[1]);
        const f = (/** @type {number} */ t) => Math.sqrt(evalCoeffs(c, t));
        want = (f(x + dh) - f(x - dh)) / (2 * dh);
      } else if (poly) {
        const c = coefficients(poly[3]);
        const f = (/** @type {number} */ t) => evalCoeffs(c, t);
        const x = num(poly[2]);
        want =
          poly[1] === "f'"
            ? (f(x + dh) - f(x - dh)) / (2 * dh)
            : (f(x + dh) - 2 * f(x) + f(x - dh)) / (dh * dh);
      } else if (tan) {
        const c = coefficients(tan[1]);
        const f = (/** @type {number} */ t) => evalCoeffs(c, t);
        const x = num(tan[2]);
        const k = (f(x + dh) - f(x - dh)) / (2 * dh);
        want = f(x) - k * x;
      } else if (move) {
        const c = coefficients(move[1], 't');
        const f = (/** @type {number} */ t) => evalCoeffs(c, t);
        const t = num(move[3]);
        want =
          move[2] === 'vận tốc'
            ? (f(t + dh) - f(t - dh)) / (2 * dh)
            : (f(t + dh) - 2 * f(t) + f(t - dh)) / (dh * dh);
      } else {
        bad.push(q.prompt);
        continue;
      }
      if (!close(value(q.answer), want, 1e-3)) bad.push(q.prompt);
    }
    expect(bad).toEqual([]);
  });
});
