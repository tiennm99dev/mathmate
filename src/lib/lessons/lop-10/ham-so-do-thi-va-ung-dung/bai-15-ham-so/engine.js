/**
 * The function machine of the lesson "Hàm số": a few functions with their
 * domain, range and intervals of increase and decrease, and the sentences
 * the widget says as the learner moves x along the axis.
 */

import { formatNumber } from '#lib/core/number-format.js';
import { clean, valText } from '../_shared/quadratic.js';

/**
 * @typedef {{ from: number, to: number, up: boolean }} Run
 * @typedef {{
 *   id: string,
 *   label: string,
 *   tex: string,
 *   text: string,
 *   f: (x: number) => number,
 *   lo: number,
 *   hi: number,
 *   domainTex: string,
 *   domainText: string,
 *   rangeTex: string,
 *   runs: Run[],
 *   edges: number[],
 * }} Fn
 */

/** The functions the machine offers; x moves in steps of 0,5 from lo to hi. */
export const FUNCTIONS = /** @type {Fn[]} */ ([
  {
    id: 'linear',
    label: 'y = 2x − 1',
    tex: 'f(x) = 2x - 1',
    text: 'f(x) = 2x − 1',
    f: (x) => 2 * x - 1,
    lo: -1.5,
    hi: 3.5,
    domainTex: 'D = \\mathbb{R}',
    domainText: 'D = ℝ',
    rangeTex: '\\mathbb{R}',
    runs: [{ from: -Infinity, to: Infinity, up: true }],
    edges: [],
  },
  {
    id: 'square',
    label: 'y = x² − 3',
    tex: 'f(x) = x^2 - 3',
    text: 'f(x) = x² − 3',
    f: (x) => x * x - 3,
    lo: -3,
    hi: 3,
    domainTex: 'D = \\mathbb{R}',
    domainText: 'D = ℝ',
    rangeTex: '[-3; +\\infty)',
    runs: [
      { from: -Infinity, to: 0, up: false },
      { from: 0, to: Infinity, up: true },
    ],
    edges: [],
  },
  {
    id: 'root',
    label: 'y = √(x + 1)',
    tex: 'f(x) = \\sqrt{x + 1}',
    text: 'f(x) = √(x + 1)',
    f: (x) => (x >= -1 ? Math.sqrt(x + 1) : NaN),
    lo: -4,
    hi: 4,
    domainTex: 'D = [-1; +\\infty)',
    domainText: 'D = [−1; +∞)',
    rangeTex: '[0; +\\infty)',
    runs: [{ from: -1, to: Infinity, up: true }],
    edges: [-1],
  },
  {
    id: 'inverse',
    label: 'y = 2/x',
    tex: 'f(x) = \\dfrac{2}{x}',
    text: 'f(x) = 2/x',
    f: (x) => (x === 0 ? NaN : 2 / x),
    lo: -4,
    hi: 4,
    domainTex: 'D = \\mathbb{R} \\setminus \\{0\\}',
    domainText: 'D = ℝ \\ {0}',
    rangeTex: '\\mathbb{R} \\setminus \\{0\\}',
    runs: [
      { from: -Infinity, to: 0, up: false },
      { from: 0, to: Infinity, up: false },
    ],
    edges: [],
  },
]);

/**
 * f(x), or null when x is outside the domain.
 * @param {Fn} fn
 * @param {number} x
 */
export function valueOf(fn, x) {
  const y = fn.f(x);
  return Number.isFinite(y) ? clean(y) : null;
}

/**
 * '= 2' or '≈ 1,22', to follow f(x).
 * @param {number} v
 */
export function eqText(v) {
  const t = valText(v);
  return t.startsWith('≈') ? t : `= ${t}`;
}

/**
 * An interval end as text.
 * @param {number} v
 */
function endText(v) {
  return v === -Infinity ? '−∞' : v === Infinity ? '+∞' : formatNumber(v);
}

/**
 * An open interval as text: '(−∞; 0)', or 'ℝ' for the whole line.
 * @param {Run} run
 */
export function runText(run) {
  if (run.from === -Infinity && run.to === Infinity) return 'ℝ';
  return `(${endText(run.from)}; ${endText(run.to)})`;
}

/**
 * The run of increase or decrease that holds x inside it, or null at an end
 * of a run (where it changes) or outside the domain.
 * @param {Fn} fn
 * @param {number} x
 */
export function runAt(fn, x) {
  return fn.runs.find((r) => x > r.from && x < r.to) ?? null;
}

/**
 * What the machine says about the point at x.
 * @param {Fn} fn
 * @param {number} x
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function pointSentence(fn, x) {
  const xs = formatNumber(x);
  const y = valueOf(fn, x);
  if (y === null) {
    return {
      tone: 'warn',
      text: `x = ${xs} không thuộc tập xác định ${fn.domainText}: không tính được f(${xs}), nên đồ thị không có điểm nào có hoành độ ${xs}.`,
    };
  }
  const point = `f(${xs}) ${eqText(y)}, điểm M(${xs}; ${valText(y).replace('≈ ', '')}) thuộc đồ thị.`;
  const run = runAt(fn, x);
  if (!run) {
    const after = fn.runs.find((r) => r.from === x);
    const before = fn.runs.find((r) => r.to === x);
    if (before && after && before.up !== after.up) {
      return {
        tone: 'info',
        text: `${point} Tại x = ${xs} hàm số chuyển từ ${before.up ? 'đồng biến' : 'nghịch biến'} sang ${after.up ? 'đồng biến' : 'nghịch biến'}.`,
      };
    }
    return { tone: 'info', text: `${point} Đây là đầu mút của tập xác định.` };
  }
  return {
    tone: 'ok',
    text: `${point} Trên khoảng ${runText(run)} hàm số ${run.up ? 'đồng biến: kéo x sang phải thì M đi lên' : 'nghịch biến: kéo x sang phải thì M đi xuống'}.`,
  };
}

/**
 * Compares two values of the function the way the definition of increasing
 * and decreasing does: x₁ < x₂ and the order of f(x₁), f(x₂). Returns null
 * when a point is outside the domain or the two x are equal.
 * @param {Fn} fn
 * @param {number} p one x
 * @param {number} q another x
 */
export function compareSentence(fn, p, q) {
  if (p === q) return null;
  const [x1, x2] = p < q ? [p, q] : [q, p];
  const y1 = valueOf(fn, x1);
  const y2 = valueOf(fn, x2);
  if (y1 === null || y2 === null) return null;
  const rel = y1 < y2 ? '<' : y1 > y2 ? '>' : '=';
  const sameRun = fn.runs.find((r) => x1 >= r.from && x2 <= r.to);
  const head = `x₁ = ${formatNumber(x1)} < x₂ = ${formatNumber(x2)} và f(x₁) ${rel} f(x₂)`;
  if (!sameRun) {
    return `${head}. Hai điểm không cùng nằm trong một khoảng đồng biến hay nghịch biến, nên không kết luận gì từ cặp này.`;
  }
  return `${head}: đúng như hàm số ${sameRun.up ? 'đồng biến' : 'nghịch biến'} trên ${runText(sameRun)}.`;
}
