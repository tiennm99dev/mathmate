/**
 * Logic of the lesson "Phương trình quy về phương trình bậc hai": the two
 * kinds of equation with a square root, squaring both sides into a quadratic
 * equation, and checking each candidate in the original equation so the
 * extraneous ones are thrown out.
 */

import { linTex } from '#lib/core/algebra-text.js';
import { formatNumber } from '#lib/core/number-format.js';
import { quadAt, quadTex, rootsOf } from '../_shared/quadratic.js';

/**
 * @typedef {[number, number, number]} Quad a, b, c of ax² + bx + c
 * @typedef {{
 *   id: string,
 *   kind: 'sqrt-sqrt' | 'sqrt-line',
 *   f: Quad,
 *   g?: Quad,
 *   line?: [number, number],
 *   view: { xMin: number, xMax: number, yMin: number, yMax: number },
 * }} Equation
 */

/** The equations of the widget, in the book's two forms. */
export const EQUATIONS = /** @type {Equation[]} */ ([
  {
    id: 'ss-1',
    kind: 'sqrt-sqrt',
    f: [2, -4, -2],
    g: [1, -1, -2],
    view: { xMin: -3, xMax: 5, yMin: -4, yMax: 6 },
  },
  {
    id: 'ss-2',
    kind: 'sqrt-sqrt',
    f: [1, 0, -1],
    g: [2, -1, -3],
    view: { xMin: -4, xMax: 4, yMin: -4, yMax: 6 },
  },
  {
    id: 'sl-1',
    kind: 'sqrt-line',
    f: [2, -5, -9],
    line: [1, -1],
    view: { xMin: -3, xMax: 7, yMin: -5, yMax: 7 },
  },
  {
    id: 'sl-2',
    kind: 'sqrt-line',
    f: [2, -3, 5],
    line: [1, 1],
    view: { xMin: -3, xMax: 6, yMin: -4, yMax: 7 },
  },
  {
    id: 'sl-3',
    kind: 'sqrt-line',
    f: [2, -9, 11],
    line: [1, -3],
    view: { xMin: -2, xMax: 6, yMin: -4, yMax: 6 },
  },
]);

/**
 * The value of a quadratic given as [a, b, c].
 * @param {Quad} q
 * @param {number} x
 */
export const at = (q, x) => quadAt(q[0], q[1], q[2], x);

/**
 * The right side of the equation at x: √g(x) or dx + e; NaN where √g is
 * undefined.
 * @param {Equation} eq
 * @param {number} x
 */
export function rightAt(eq, x) {
  if (eq.kind === 'sqrt-sqrt') {
    const v = at(/** @type {Quad} */ (eq.g), x);
    return v > -1e-6 ? Math.sqrt(Math.max(0, v)) : NaN;
  }
  const [d, e] = /** @type {[number, number]} */ (eq.line);
  return d * x + e;
}

/**
 * The left side √f(x), NaN where it is undefined.
 * @param {Equation} eq
 * @param {number} x
 */
export function leftAt(eq, x) {
  const v = at(eq.f, x);
  return v > -1e-6 ? Math.sqrt(Math.max(0, v)) : NaN;
}

/**
 * The equation as TeX.
 * @param {Equation} eq
 */
export function equationTex(eq) {
  const left = `\\sqrt{${quadTex(...eq.f)}}`;
  if (eq.kind === 'sqrt-sqrt') return `${left} = \\sqrt{${quadTex(.../** @type {Quad} */ (eq.g))}}`;
  const [d, e] = /** @type {[number, number]} */ (eq.line);
  return `${left} = ${linTex(d, e)}`;
}

/**
 * The equation after squaring both sides, as written straight away and as
 * collected into Ax² + Bx + C = 0 with A > 0.
 * @param {Equation} eq
 * @returns {{ raw: string, poly: Quad, tex: string }}
 */
export function squared(eq) {
  const [a, b, c] = eq.f;
  /** @type {Quad} */
  let poly;
  let raw;
  if (eq.kind === 'sqrt-sqrt') {
    const [d, e, f] = /** @type {Quad} */ (eq.g);
    poly = [a - d, b - e, c - f];
    raw = `${quadTex(a, b, c)} = ${quadTex(d, e, f)}`;
  } else {
    const [d, e] = /** @type {[number, number]} */ (eq.line);
    poly = [a - d * d, b - 2 * d * e, c - e * e];
    raw = `${quadTex(a, b, c)} = (${linTex(d, e)})^2`;
  }
  if (poly[0] < 0) poly = /** @type {Quad} */ (poly.map((k) => -k));
  return { raw, poly, tex: `${quadTex(...poly)} = 0` };
}

/**
 * The candidates: the roots of the squared equation, in increasing order.
 * @param {Equation} eq
 */
export function candidates(eq) {
  const [a, b, c] = squared(eq).poly;
  if (a === 0) return b === 0 ? [] : [-c / b];
  return rootsOf(a, b, c);
}

/**
 * Checks a candidate in the original equation.
 * @param {Equation} eq
 * @param {number} x
 * @returns {{ ok: boolean, text: string }}
 */
export function check(eq, x) {
  const xs = formatNumber(x);
  const fv = at(eq.f, x);
  if (eq.kind === 'sqrt-sqrt') {
    if (fv < 0) {
      return {
        ok: false,
        text: `x = ${xs}: hai biểu thức dưới dấu căn cùng bằng ${formatNumber(fv)} < 0, căn bậc hai không xác định. Loại.`,
      };
    }
    const r = formatNumber(Math.sqrt(fv), 3);
    return {
      ok: true,
      text: `x = ${xs}: hai vế cùng bằng √${formatNumber(fv)}${Number.isInteger(Math.sqrt(fv)) ? ` = ${r}` : ''}. Nhận.`,
    };
  }
  const rv = rightAt(eq, x);
  const lv = formatNumber(Math.sqrt(fv), 3);
  if (rv < 0) {
    return {
      ok: false,
      text: `x = ${xs}: vế trái √${formatNumber(fv)} = ${lv} nhưng vế phải bằng ${formatNumber(rv)} < 0. Loại.`,
    };
  }
  return {
    ok: true,
    text: `x = ${xs}: vế trái √${formatNumber(fv)} = ${lv}, vế phải cũng bằng ${formatNumber(rv)}. Nhận.`,
  };
}

/**
 * The conclusion after checking every candidate.
 * @param {Equation} eq
 */
export function conclusion(eq) {
  const good = candidates(eq).filter((x) => check(eq, x).ok);
  if (good.length === 0) return 'Không có giá trị nào thoả mãn: phương trình vô nghiệm.';
  if (good.length === 1) return `Phương trình có nghiệm duy nhất x = ${formatNumber(good[0])}.`;
  return `Phương trình có hai nghiệm x = ${good.map((x) => formatNumber(x)).join(' và x = ')}.`;
}
