/**
 * Systems of three linear equations in three unknowns, the way the KNTT
 * chuyên đề writes and solves them. A row is the four numbers of
 * `ax + by + cz = d`. Gauss elimination works on exact fractions, so every
 * step the learner takes stays exact; the substitution check works on plain
 * numbers, so decimal coefficients (`0,1x`) are fine there.
 */
import { fraction, add, mul, div, toTex } from '#lib/fraction-engine/index.js';
import { numTex, tidy } from '#lib/core/number-format.js';
import { isShortDecimal } from '#lib/core/algebra-text.js';

/** @typedef {import('#lib/fraction-engine/fraction.js').Fraction} Fraction */
/** @typedef {ReadonlyArray<Fraction>} Row four fractions a, b, c, d */
/** @typedef {ReadonlyArray<Row>} System three rows */

/**
 * One elementary transformation of a system.
 * @typedef {{ op: 'swap', i: number, j: number }
 *   | { op: 'scale', i: number, k: Fraction }
 *   | { op: 'add', target: number, source: number, k: Fraction }} Step
 */

/**
 * What a system's solution set is.
 * @typedef {{ kind: 'unique', values: Fraction[] }
 *   | { kind: 'none' }
 *   | { kind: 'infinite', rref: Fraction[][], pivots: number[] }} Solution
 */

export const NAMES = /** @type {const} */ (['x', 'y', 'z']);

const ZERO = fraction(0);

/** @param {Fraction} f */
export const isZero = (f) => f.n === 0;

/** @param {Fraction} f */
const neg = (f) => fraction(-f.n, f.d);

/**
 * A system from integer rows `[a, b, c, d]`.
 * @param {number[][]} rows
 * @returns {System}
 */
export function systemOf(rows) {
  return rows.map((r) => r.map((v) => fraction(v)));
}

/**
 * @param {System} sys
 * @param {number} i
 * @param {number} j
 * @returns {System}
 */
export function swapRows(sys, i, j) {
  return sys.map((r, n) => (n === i ? sys[j] : n === j ? sys[i] : r));
}

/**
 * Both sides of row `i` times a non-zero `k`.
 * @param {System} sys
 * @param {number} i
 * @param {Fraction} k
 * @returns {System}
 */
export function scaleRow(sys, i, k) {
  if (isZero(k)) throw new Error('a row may only be multiplied by a non-zero number');
  return sys.map((r, n) => (n === i ? r.map((v) => mul(v, k)) : r));
}

/**
 * Row `target` plus `k` times row `source`.
 * @param {System} sys
 * @param {number} target
 * @param {number} source
 * @param {Fraction} k
 * @returns {System}
 */
export function addMultiple(sys, target, source, k) {
  if (target === source) throw new Error('add a multiple of another row');
  return sys.map((r, n) => (n === target ? r.map((v, c) => add(v, mul(k, sys[source][c]))) : r));
}

/**
 * @param {System} sys
 * @param {Step} step
 * @returns {System}
 */
export function applyStep(sys, step) {
  if (step.op === 'swap') return swapRows(sys, step.i, step.j);
  if (step.op === 'scale') return scaleRow(sys, step.i, step.k);
  return addMultiple(sys, step.target, step.source, step.k);
}

/**
 * Triangular form (dạng tam giác): x is gone from rows 2 and 3, y from row 3.
 * @param {System} sys
 */
export function isTriangular(sys) {
  return isZero(sys[1][0]) && isZero(sys[2][0]) && isZero(sys[2][1]);
}

/**
 * The next Gauss step towards triangular form, or null once the system is
 * triangular: bring a row with the unknown to the pivot place, then clear
 * that unknown from the rows below by adding a multiple of the pivot row.
 * @param {System} sys
 * @returns {Step | null}
 */
export function nextStep(sys) {
  if (isTriangular(sys)) return null;
  let pivotRow = 0;
  for (let col = 0; col < 2 && pivotRow < 3; col++) {
    let found = -1;
    for (let r = pivotRow; r < 3; r++) {
      if (!isZero(sys[r][col])) {
        found = r;
        break;
      }
    }
    if (found < 0) continue;
    if (found !== pivotRow) return { op: 'swap', i: pivotRow, j: found };
    for (let r = pivotRow + 1; r < 3; r++) {
      if (!isZero(sys[r][col])) {
        return {
          op: 'add',
          target: r,
          source: pivotRow,
          k: neg(div(sys[r][col], sys[pivotRow][col])),
        };
      }
    }
    pivotRow++;
  }
  return null;
}

/**
 * A step in words, with TeX numbers.
 * @param {Step} step
 */
export function stepText(step) {
  if (step.op === 'swap') return `Đổi chỗ phương trình (${step.i + 1}) và (${step.j + 1}).`;
  if (step.op === 'scale') {
    return `Nhân hai vế của phương trình (${step.i + 1}) với $${toTex(step.k)}$.`;
  }
  const k = step.k;
  const times = k.n === 1 && k.d === 1 ? '' : ` $${k.n < 0 ? `(${toTex(k)})` : toTex(k)}$ lần`;
  return `Cộng phương trình (${step.target + 1}) với${times} phương trình (${step.source + 1}).`;
}

/**
 * Reduced row echelon form, exact.
 * @param {System} sys
 * @returns {{ rows: Fraction[][], pivots: number[] }}
 */
function reduce(sys) {
  const m = sys.map((r) => [...r]);
  /** @type {number[]} */
  const pivots = [];
  let r = 0;
  for (let c = 0; c < 3 && r < 3; c++) {
    let p = -1;
    for (let i = r; i < 3; i++) {
      if (!isZero(m[i][c])) {
        p = i;
        break;
      }
    }
    if (p < 0) continue;
    [m[r], m[p]] = [m[p], m[r]];
    const lead = m[r][c];
    m[r] = m[r].map((v) => div(v, lead));
    for (let i = 0; i < 3; i++) {
      if (i !== r && !isZero(m[i][c])) {
        const f = m[i][c];
        m[i] = m[i].map((v, j) => add(v, neg(mul(f, m[r][j]))));
      }
    }
    pivots.push(c);
    r++;
  }
  return { rows: m, pivots };
}

/**
 * Whether the system has one solution, none or infinitely many.
 * @param {System} sys
 * @returns {Solution}
 */
export function classify(sys) {
  const { rows, pivots } = reduce(sys);
  for (let i = pivots.length; i < 3; i++) {
    if (!isZero(rows[i][3])) return { kind: 'none' };
  }
  if (pivots.length === 3) return { kind: 'unique', values: rows.map((r) => r[3]) };
  return { kind: 'infinite', rref: rows, pivots };
}

/**
 * Terms of `a₁x₁ + a₂x₂ + …` as TeX, each coefficient given by its sign and
 * the TeX of its absolute value ('' for 1). Zero terms are left out.
 * @param {Array<{ sign: number, abs: string }>} terms
 * @param {ReadonlyArray<string>} names
 */
function termsTex(terms, names) {
  let out = '';
  terms.forEach((t, i) => {
    if (t.sign === 0) return;
    const body = `${t.abs}${names[i]}`;
    if (!out) out = t.sign < 0 ? `-${body}` : body;
    else out += t.sign < 0 ? ` - ${body}` : ` + ${body}`;
  });
  return out;
}

/** @param {Fraction} f */
function fracTerm(f) {
  const abs = fraction(Math.abs(f.n), f.d);
  return { sign: Math.sign(f.n), abs: abs.n === 1 && abs.d === 1 ? '' : toTex(abs) };
}

/**
 * One equation as TeX: 'x + y - 2z = 3'. A row with every coefficient zero
 * is written '0z = d', the equation that tells whether the system has no
 * solution or infinitely many.
 * @param {Row} row
 * @param {ReadonlyArray<string>} [names]
 */
export function rowTex(row, names = NAMES) {
  const left = termsTex(row.slice(0, 3).map(fracTerm), names);
  return `${left || `0${names[2]}`} = ${toTex(row[3])}`;
}

/**
 * The whole system as a TeX `cases` block.
 * @param {System} sys
 * @param {ReadonlyArray<string>} [names]
 */
export function systemTex(sys, names = NAMES) {
  return `\\begin{cases} ${sys.map((r) => rowTex(r, names)).join(' \\\\ ')} \\end{cases}`;
}

/**
 * Back substitution on a triangular system with a non-zero diagonal, as
 * rich-text lines: z from (3), then y from (2), then x from (1).
 * @param {System} sys
 * @returns {{ lines: string[], values: Fraction[] } | null}
 */
export function backSolve(sys) {
  if (!isTriangular(sys) || [0, 1, 2].some((i) => isZero(sys[i][i]))) return null;
  /** @type {Fraction[]} */
  const values = [ZERO, ZERO, ZERO];
  /** @type {string[]} */
  const lines = [];
  for (let i = 2; i >= 0; i--) {
    let rest = sys[i][3];
    for (let j = i + 1; j < 3; j++) rest = add(rest, neg(mul(sys[i][j], values[j])));
    values[i] = div(rest, sys[i][i]);
    const from = i === 2 ? 'Từ phương trình (3)' : `Thay vào phương trình (${i + 1})`;
    lines.push(`${from}: $${NAMES[i]} = ${toTex(values[i])}$.`);
  }
  return { lines, values };
}

/**
 * The general solution when z is free and x, y are pivots, as TeX
 * '(z - 1; 3 - 2z; z)', the z term first when it is positive; null for any other shape.
 * @param {Solution} sol
 */
export function generalTex(sol) {
  if (sol.kind !== 'infinite' || sol.pivots.join() !== '0,1') return null;
  /** @param {Fraction[]} row */
  const part = (row) => {
    const c = row[3];
    const k = neg(row[2]);
    const t = fracTerm(k);
    const zTerm = t.sign === 0 ? '' : `${t.abs}z`;
    if (isZero(c)) return t.sign === 0 ? '0' : `${t.sign < 0 ? '-' : ''}${zTerm}`;
    if (t.sign === 0) return toTex(c);
    if (t.sign > 0) return `${zTerm} ${c.n < 0 ? '-' : '+'} ${toTex(fraction(Math.abs(c.n), c.d))}`;
    return `${toTex(c)} - ${zTerm}`;
  };
  return `(${part(sol.rref[0])}; ${part(sol.rref[1])}; z)`;
}

/** A Vietnamese tuple of fractions: '(-1; 6; 1)' in TeX. @param {Fraction[]} v */
export const tupleTex = (v) => `(${v.map(toTex).join('; ')})`;

// Plain-number systems, for setting up and checking solutions.

/**
 * One equation with number coefficients as TeX: '0{,}1x + 0{,}3y = 32'.
 * @param {number[]} coeffs
 * @param {number} rhs
 * @param {ReadonlyArray<string>} [names]
 */
export function equationTex(coeffs, rhs, names = NAMES) {
  const terms = coeffs.map((c) => ({
    sign: Math.sign(c),
    abs: Math.abs(c) === 1 ? '' : numTex(Math.abs(c)),
  }));
  return `${termsTex(terms, names) || '0'} = ${numTex(rhs)}`;
}

/**
 * The left side of an equation at given values, binary noise removed.
 * @param {number[]} coeffs
 * @param {number[]} values
 */
export function leftValue(coeffs, values) {
  return tidy(coeffs.reduce((s, c, i) => s + c * values[i], 0));
}

/**
 * A typed or computed value as TeX: a short decimal as it is ('2{,}5'),
 * otherwise the nearest fraction with a small denominator ('-\\frac{1}{3}').
 * @param {number} v
 */
export function valueTex(v) {
  if (isShortDecimal(v, 4)) return numTex(tidy(v, 4));
  for (let d = 2; d <= 1000; d++) {
    const n = Math.round(v * d);
    if (Math.abs(n / d - v) < 1e-9) {
      const f = fraction(n, d);
      return toTex(f);
    }
  }
  return numTex(v, 4);
}

/**
 * The substitution written out as TeX: '2 \cdot 1 + 3 - (-1)' for
 * 2x + y − z at (1; 3; −1).
 * @param {number[]} coeffs
 * @param {number[]} values
 */
export function substitutionTex(coeffs, values) {
  /** @type {string[]} */
  const parts = [];
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const v = values[i] < 0 ? `\\left(${valueTex(values[i])}\\right)` : valueTex(values[i]);
    const a = Math.abs(c);
    const body = a === 1 ? v : `${numTex(a)} \\cdot ${v}`;
    if (!parts.length) parts.push(c < 0 ? `-${body}` : body);
    else parts.push(c < 0 ? `- ${body}` : `+ ${body}`);
  });
  return parts.join(' ') || '0';
}

/**
 * Substitutes values into every equation of a number system.
 * @param {Array<{ coeffs: number[], rhs: number }>} equations
 * @param {number[]} values
 */
export function checkValues(equations, values) {
  return equations.map((e) => {
    const left = leftValue(e.coeffs, values);
    return { left, rhs: e.rhs, ok: left === tidy(e.rhs) };
  });
}
