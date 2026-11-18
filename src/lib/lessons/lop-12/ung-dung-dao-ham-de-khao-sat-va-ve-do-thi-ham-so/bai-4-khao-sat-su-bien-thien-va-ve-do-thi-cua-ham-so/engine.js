/**
 * The step-by-step survey of the three families the book studies:
 * y = ax³ + bx² + cx + d, y = (ax + b)/(cx + d) and
 * y = (ax² + bx + c)/(mx + n), with integer coefficients. For chosen
 * coefficients it writes each step of the sơ đồ khảo sát (domain,
 * derivative and its zeros, limits and asymptotes, bảng biến thiên,
 * conclusions, special points) and gives what the graph needs.
 */

import { gcd } from '#lib/numtheory-engine/index.js';
import { variationOf } from '../_shared/variation.js';
import { num, polyTex, polyText, quadRoots, rel, shown } from './numbers.js';

/**
 * @typedef {'cubic' | 'linear' | 'quad'} FamilyId
 * @typedef {object} Family
 * @property {FamilyId} id
 * @property {string} label
 * @property {string} general the general formula, as TeX
 * @property {string[]} names coefficient names
 * @property {number[]} start
 * @property {Array<[number, number]>} ranges min and max of each coefficient
 */

/** @type {Family[]} */
export const FAMILIES = [
  {
    id: 'cubic',
    label: 'Bậc ba',
    general: 'y = ax^3 + bx^2 + cx + d \\; (a \\ne 0)',
    names: ['a', 'b', 'c', 'd'],
    start: [1, -3, 0, 2],
    ranges: [
      [-3, 3],
      [-6, 6],
      [-9, 9],
      [-5, 5],
    ],
  },
  {
    id: 'linear',
    label: 'Bậc nhất / bậc nhất',
    general: 'y = \\dfrac{ax + b}{cx + d} \\; (c \\ne 0,\\; ad - bc \\ne 0)',
    names: ['a', 'b', 'c', 'd'],
    start: [2, -1, 1, 1],
    ranges: [
      [-4, 4],
      [-4, 4],
      [-4, 4],
      [-4, 4],
    ],
  },
  {
    id: 'quad',
    label: 'Bậc hai / bậc nhất',
    general: 'y = \\dfrac{ax^2 + bx + c}{mx + n} \\; (a \\ne 0,\\; m \\ne 0)',
    names: ['a', 'b', 'c', 'm', 'n'],
    start: [1, 1, 1, 1, -1],
    ranges: [
      [-3, 3],
      [-6, 6],
      [-6, 6],
      [-3, 3],
      [-4, 4],
    ],
  },
];

/**
 * @typedef {{ x: number, y: number, kind: 'max' | 'min' | 'center' | 'oy' | 'ox' }} Special
 * @typedef {object} Survey
 * @property {boolean} ok
 * @property {string} [problem] rich text: why these coefficients do not give the family
 * @property {string} tex the function, as TeX
 * @property {string} text the function, as plain text
 * @property {(x: number) => number} f
 * @property {string[]} steps rich text of the five steps: domain, derivative, limits and asymptotes, conclusions, graph
 * @property {import('../_shared/variation.js').Variation} table
 * @property {number[]} poles
 * @property {Array<{ a?: number, b?: number, c?: number, vertical?: boolean }>} asymptotes
 * @property {Special[]} specials
 * @property {import('#lib/core/visuals/plot.js').Window} win
 */

const INF = { pos: '+∞', neg: '−∞' };

/**
 * x → x₀ from one side, as TeX: '-1^-', or '\left(\frac{1}{2}\right)^+'.
 * @param {string} x0 @param {'-' | '+'} dir
 */
const side = (x0, dir) => (/^-?\d+$/.test(x0) ? `${x0}^${dir}` : `\\left(${x0}\\right)^${dir}`);

const TEX_INF = { pos: '+\\infty', neg: '-\\infty' };

/**
 * An open interval as TeX.
 * @param {string} a @param {string} b
 */
const iv = (a, b) => `(${a}; ${b})`;

/**
 * "đồng biến trên …, nghịch biến trên …" from the nodes and signs of a table.
 * @param {string[]} xs TeX of the nodes
 * @param {Array<'+' | '-'>} signs
 */
function monotony(xs, signs) {
  /** @type {Record<string, string[]>} */
  const by = { '+': [], '-': [] };
  signs.forEach((s, i) => by[s].push(`$${iv(xs[i], xs[i + 1])}$`));
  const parts = [];
  if (by['+'].length)
    parts.push(
      `đồng biến trên ${by['+'].length > 1 ? 'mỗi khoảng ' : 'khoảng '}${by['+'].join(' và ')}`,
    );
  if (by['-'].length)
    parts.push(
      `nghịch biến trên ${by['-'].length > 1 ? 'mỗi khoảng ' : 'khoảng '}${by['-'].join(' và ')}`,
    );
  return `Hàm số ${parts.join(', ')}.`;
}

/**
 * The x-axis crossings of f inside [lo, hi], by sign changes on a grid and
 * bisection; a crossing next to a pole (a sign change through ∞) is skipped.
 * @param {(x: number) => number} f
 * @param {number} lo @param {number} hi
 * @param {number[]} poles
 */
export function crossings(f, lo, hi, poles) {
  const out = [];
  const n = 400;
  let px = lo;
  let py = f(lo);
  for (let i = 1; i <= n; i++) {
    const x = lo + ((hi - lo) * i) / n;
    const y = f(x);
    if (y === 0) out.push(x);
    else if (py * y < 0 && Number.isFinite(py * y) && !poles.some((p) => p >= px && p <= x)) {
      let a = px;
      let b = x;
      for (let k = 0; k < 60; k++) {
        const m = (a + b) / 2;
        if (f(a) * f(m) <= 0) b = m;
        else a = m;
      }
      out.push((a + b) / 2);
    }
    px = x;
    py = y;
  }
  return out;
}

/**
 * A window holding the interesting points with some room.
 * @param {number[]} xs @param {number[]} ys
 * @returns {import('#lib/core/visuals/plot.js').Window}
 */
export function windowFor(xs, ys) {
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const hx = Math.max(3, (x1 - x0) / 2 + 2);
  const hy = Math.max(3, (y1 - y0) / 2 + 2);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return { xMin: cx - hx, xMax: cx + hx, yMin: cy - hy, yMax: cy + hy };
}

/**
 * @param {number[]} k
 * @returns {Survey}
 */
function cubic([a, b, c, d]) {
  const coefs = [a, b, c, d];
  const f = (/** @type {number} */ x) => ((a * x + b) * x + c) * x + d;
  const tex = `y = ${polyTex(coefs)}`;
  const text = `y = ${polyText(coefs)}`;
  if (a === 0) {
    return blank(
      tex,
      text,
      f,
      'Với $a = 0$, hàm số không còn là hàm số bậc ba. Hãy chọn $a \\ne 0$.',
    );
  }
  const dTex = polyTex([3 * a, 2 * b, c]);
  const roots = quadRoots(3 * a, 2 * b, c);
  const up = a > 0 ? '+' : '-';
  const down = a > 0 ? '-' : '+';
  /** @type {Array<'+' | '-'>} */
  let signs;
  if (roots.length === 2) signs = [up, down, up];
  else if (roots.length === 1) signs = [up, up];
  else signs = [up];
  const ends = a > 0 ? [INF.neg, INF.pos] : [INF.pos, INF.neg];
  const vals = roots.map((r) => num(f(r.value)));
  const table = variationOf(
    [
      { x: '−∞', kind: 'end', y: ends[0] },
      ...roots.map((r, i) => ({
        x: shownRoot(r),
        kind: /** @type {const} */ ('zero'),
        y: shown(vals[i]),
      })),
      { x: '+∞', kind: 'end', y: ends[1] },
    ],
    signs,
  );
  const xs = ['-\\infty', ...roots.map((r) => r.tex), '+\\infty'];
  let deriv = `$y' = ${dTex}$; `;
  const disc = 4 * b * b - 12 * a * c;
  if (roots.length === 2) {
    deriv += `$y' = 0 \\Leftrightarrow x = ${roots[0].tex}$ hoặc $x = ${roots[1].tex}$.`;
  } else if (roots.length === 1) {
    deriv += `$y' = 0 \\Leftrightarrow x = ${roots[0].tex}$ (nghiệm kép), $y' ${a > 0 ? '\\ge' : '\\le'} 0$ với mọi $x$.`;
  } else {
    deriv += `$y'$ là tam thức bậc hai có biệt thức $\\Delta = ${disc} < 0$, nên $y' ${a > 0 ? '>' : '<'} 0$ với mọi $x$.`;
  }
  const limits = `$\\lim\\limits_{x \\to -\\infty} y = ${a > 0 ? TEX_INF.neg : TEX_INF.pos}$, $\\lim\\limits_{x \\to +\\infty} y = ${a > 0 ? TEX_INF.pos : TEX_INF.neg}$. Đồ thị hàm số bậc ba không có tiệm cận.`;
  const sx = -b / (3 * a);
  const center = { x: sx, y: f(sx) };
  const cx = num(sx);
  const cy = num(center.y);
  /** @type {Special[]} */
  const specials = extremaPoints(table, roots, vals);
  let concl =
    roots.length <= 1
      ? `Hàm số ${a > 0 ? 'đồng biến' : 'nghịch biến'} trên $\\mathbb{R}$.`
      : monotony(xs, signs);
  concl += extremaSentence(table, roots, vals);
  const win = windowFor(
    [...roots.map((r) => r.value), sx, 0],
    [...vals.map((v) => v.value), center.y, d],
  );
  specials.push({ x: center.x, y: center.y, kind: 'center' });
  specials.push({ x: 0, y: d, kind: 'oy' });
  for (const x of crossings(f, win.xMin, win.xMax, [])) specials.push({ x, y: 0, kind: 'ox' });
  const graph = `Đồ thị cắt trục $Oy$ tại điểm $(0; ${d})$ và nhận điểm $I\\left(${cx.tex}; ${cy.tex}\\right)$ làm tâm đối xứng${cx.exact && cy.exact ? '' : ' (toạ độ làm tròn)'}.`;
  return {
    ok: true,
    tex,
    text,
    f,
    steps: ['Tập xác định: $D = \\mathbb{R}$.', deriv, limits, concl, graph],
    table,
    poles: [],
    asymptotes: [],
    specials,
    win,
  };
}

/**
 * @param {number[]} k
 * @returns {Survey}
 */
function linear([a, b, c, d]) {
  const f = (/** @type {number} */ x) => (c * x + d === 0 ? NaN : (a * x + b) / (c * x + d));
  const tex = `y = \\dfrac{${polyTex([a, b])}}{${polyTex([c, d])}}`;
  const text = `y = (${polyText([a, b])})/(${polyText([c, d])})`;
  if (c === 0)
    return blank(
      tex,
      text,
      f,
      'Với $c = 0$, hàm số không phải phân thức bậc nhất trên bậc nhất. Hãy chọn $c \\ne 0$.',
    );
  const det = a * d - b * c;
  if (det === 0) {
    return blank(
      tex,
      text,
      f,
      `Với $ad - bc = 0$, tử và mẫu tỉ lệ: $y$ là hằng số trên tập xác định. Hãy đổi hệ số để $ad - bc \\ne 0$.`,
    );
  }
  const x0 = num(-d / c);
  const yh = num(a / c);
  const s = det > 0 ? '+' : '-';
  const table = variationOf(
    [
      { x: '−∞', kind: 'end', y: yh.text },
      {
        x: x0.text,
        kind: 'pole',
        yl: det > 0 ? INF.pos : INF.neg,
        yr: det > 0 ? INF.neg : INF.pos,
      },
      { x: '+∞', kind: 'end', y: yh.text },
    ],
    [s, s],
  );
  const deriv = `$y' = \\dfrac{${det}}{(${polyTex([c, d])})^2}$ ${det > 0 ? '> 0' : '< 0'} với mọi $x \\ne ${x0.tex}$.`;
  const left = det > 0 ? TEX_INF.pos : TEX_INF.neg;
  const right = det > 0 ? TEX_INF.neg : TEX_INF.pos;
  const limits = `$\\lim\\limits_{x \\to \\pm\\infty} y = ${yh.tex}$ nên tiệm cận ngang là $y = ${yh.tex}$; $\\lim\\limits_{x \\to ${side(x0.tex, '-')}} y = ${left}$, $\\lim\\limits_{x \\to ${side(x0.tex, '+')}} y = ${right}$ nên tiệm cận đứng là $x = ${x0.tex}$.`;
  const concl = `Hàm số ${det > 0 ? 'đồng biến' : 'nghịch biến'} trên mỗi khoảng $${iv('-\\infty', x0.tex)}$ và $${iv(x0.tex, '+\\infty')}$; hàm số không có cực trị.`;
  /** @type {Special[]} */
  const specials = [{ x: x0.value, y: yh.value, kind: 'center' }];
  const oy = d !== 0 ? num(b / d) : null;
  if (oy) specials.push({ x: 0, y: oy.value, kind: 'oy' });
  const ox = a !== 0 ? num(-b / a) : null;
  if (ox) specials.push({ x: ox.value, y: 0, kind: 'ox' });
  const cuts = [
    oy ? `cắt trục $Oy$ tại $(0; ${oy.tex})$` : '',
    ox ? `cắt trục $Ox$ tại $(${ox.tex}; 0)$` : '',
  ].filter(Boolean);
  const graph = `Đồ thị ${cuts.length ? `${cuts.join(', ')} và ` : ''}nhận giao điểm $I(${x0.tex}; ${yh.tex})$ của hai tiệm cận làm tâm đối xứng.`;
  return {
    ok: true,
    tex,
    text,
    f,
    steps: [
      `Tập xác định: $D = \\mathbb{R} \\setminus \\{${x0.tex}\\}$.`,
      deriv,
      limits,
      concl,
      graph,
    ],
    table,
    poles: [x0.value],
    asymptotes: [
      { c: x0.value, vertical: true },
      { a: 0, b: yh.value },
    ],
    specials,
    win: windowFor([x0.value, 0, ...(ox ? [ox.value] : [])], [yh.value, ...(oy ? [oy.value] : [])]),
  };
}

/**
 * @param {number[]} k
 * @returns {Survey}
 */
function quad([a, b, c, m, n]) {
  const f = (/** @type {number} */ x) =>
    m * x + n === 0 ? NaN : ((a * x + b) * x + c) / (m * x + n);
  const tex = `y = \\dfrac{${polyTex([a, b, c])}}{${polyTex([m, n])}}`;
  const text = `y = (${polyText([a, b, c])})/(${polyText([m, n])})`;
  if (a === 0)
    return blank(tex, text, f, 'Với $a = 0$, tử không còn là bậc hai. Hãy chọn $a \\ne 0$.');
  if (m === 0)
    return blank(tex, text, f, 'Với $m = 0$, mẫu không còn là bậc nhất. Hãy chọn $m \\ne 0$.');
  // a·n² − b·m·n + c·m² = m²·N(−n/m): zero when the numerator has the factor mx + n.
  const key = a * n * n - b * m * n + c * m * m;
  if (key === 0) {
    return blank(
      tex,
      text,
      f,
      `Với các hệ số này, tử chia hết cho $${polyTex([m, n])}$: rút gọn được, $y$ là hàm bậc nhất (bỏ đi một điểm). Hãy đổi hệ số.`,
    );
  }
  const x0 = num(-n / m);
  // y = px + q + r / (mx + n)
  const p = num(a / m);
  const q = num((b * m - a * n) / (m * m));
  const top = [a * m, 2 * a * n, b * n - c * m];
  const roots = quadRoots(top[0], top[1], top[2]);
  const am = a * m > 0 ? '+' : '-';
  const anti = a * m > 0 ? '-' : '+';
  /** @type {import('../_shared/variation.js').Node[]} */
  const nodes = [];
  /** @type {Array<'+' | '-'>} */
  let signs;
  const vals = roots.map((r) => num(f(r.value)));
  const endL = am === '+' ? INF.neg : INF.pos;
  const endR = am === '+' ? INF.pos : INF.neg;
  if (roots.length === 2) {
    signs = [am, anti, anti, am];
    nodes.push(
      { x: '−∞', kind: 'end', y: endL },
      { x: shownRoot(roots[0]), kind: 'zero', y: shown(vals[0]) },
      {
        x: x0.text,
        kind: 'pole',
        yl: anti === '+' ? INF.pos : INF.neg,
        yr: anti === '+' ? INF.neg : INF.pos,
      },
      { x: shownRoot(roots[1]), kind: 'zero', y: shown(vals[1]) },
      { x: '+∞', kind: 'end', y: endR },
    );
  } else {
    signs = [am, am];
    nodes.push(
      { x: '−∞', kind: 'end', y: endL },
      {
        x: x0.text,
        kind: 'pole',
        yl: am === '+' ? INF.pos : INF.neg,
        yr: am === '+' ? INF.neg : INF.pos,
      },
      { x: '+∞', kind: 'end', y: endR },
    );
  }
  const table = variationOf(nodes, signs);
  const denom = `(${polyTex([m, n])})^2`;
  let deriv = `$y' = \\dfrac{${polyTex(top)}}{${denom}}$; `;
  if (roots.length === 2) {
    deriv += `$y' = 0 \\Leftrightarrow x = ${roots[0].tex}$ hoặc $x = ${roots[1].tex}$.`;
  } else {
    deriv += `tử số luôn ${am === '+' ? 'dương' : 'âm'} nên $y' ${am === '+' ? '>' : '<'} 0$ với mọi $x \\ne ${x0.tex}$.`;
  }
  const slant = polyTexFrac(p, q);
  // The remainder of the division is r = key / m², never 0 here; write
  // r / (mx + n) as one fraction with an integer numerator.
  const g = gcd(Math.abs(key), m * m);
  const restDen = (m * m) / g === 1 ? polyTex([m, n]) : `${(m * m) / g}(${polyTex([m, n])})`;
  const restTex = `${key < 0 ? '-' : '+'} \\dfrac{${Math.abs(key) / g}}{${restDen}}`;
  const limits = `Chia tử cho mẫu: $y = ${slant} ${restTex}$, nên $\\lim\\limits_{x \\to \\pm\\infty} [y - (${slant})] = 0$: tiệm cận xiên là $y = ${slant}$. Giới hạn của $y$ khi $x \\to ${side(x0.tex, '-')}$ và $x \\to ${side(x0.tex, '+')}$ là vô cực nên tiệm cận đứng là $x = ${x0.tex}$.`;
  const xs =
    roots.length === 2
      ? ['-\\infty', roots[0].tex, x0.tex, roots[1].tex, '+\\infty']
      : ['-\\infty', x0.tex, '+\\infty'];
  let concl = monotony(xs, signs);
  if (roots.length === 2)
    concl += extremaSentence(table, [roots[0], x0, roots[1]], [vals[0], x0, vals[1]]);
  else concl += ' Hàm số không có cực trị.';
  const cy = num(p.value * x0.value + q.value);
  /** @type {Special[]} */
  const specials =
    roots.length === 2
      ? extremaPoints(table, [roots[0], x0, roots[1]], [vals[0], x0, vals[1]])
      : [];
  specials.push({ x: x0.value, y: cy.value, kind: 'center' });
  const oy = n !== 0 ? num(c / n) : null;
  if (oy) specials.push({ x: 0, y: oy.value, kind: 'oy' });
  const win = windowFor(
    [x0.value, 0, ...roots.map((r) => r.value)],
    [cy.value, ...vals.map((v) => v.value), ...(oy ? [oy.value] : [])],
  );
  for (const x of crossings(f, win.xMin, win.xMax, [x0.value]))
    specials.push({ x, y: 0, kind: 'ox' });
  const graph = `Đồ thị ${oy ? `cắt trục $Oy$ tại $(0; ${oy.tex})$ và ` : ''}nhận giao điểm $I(${x0.tex}; ${cy.tex})$ của hai tiệm cận làm tâm đối xứng.`;
  return {
    ok: true,
    tex,
    text,
    f,
    steps: [
      `Tập xác định: $D = \\mathbb{R} \\setminus \\{${x0.tex}\\}$.`,
      deriv,
      limits,
      concl,
      graph,
    ],
    table,
    poles: [x0.value],
    asymptotes: [
      { c: x0.value, vertical: true },
      { a: p.value, b: q.value },
    ],
    specials,
    win,
  };
}

/**
 * px + q as TeX with exact coefficients.
 * @param {import('./numbers.js').Num} p @param {import('./numbers.js').Num} q
 */
function polyTexFrac(p, q) {
  const one = p.value === 1 ? '' : p.value === -1 ? '-' : p.tex;
  const lead = `${one}x`;
  if (q.value === 0) return lead;
  return q.value > 0 ? `${lead} + ${q.tex}` : `${lead} - ${q.tex.replace(/^-/, '')}`;
}

/**
 * A root as the x of a table cell: exact when it is short, else rounded.
 * @param {import('./numbers.js').Num} r
 */
function shownRoot(r) {
  return r.text.includes('√') ? `≈ ${num(r.value).text}` : r.text;
}

/**
 * The extrema of a table as points to mark on the graph.
 * @param {import('../_shared/variation.js').Variation} table
 * @param {import('./numbers.js').Num[]} xs the inner nodes
 * @param {import('./numbers.js').Num[]} ys their values
 * @returns {Special[]}
 */
function extremaPoints(table, xs, ys) {
  /** @type {Special[]} */
  const out = [];
  for (let i = 1; i < table.cells.length - 1; i++) {
    const s0 = table.signs[i - 1];
    const s1 = table.signs[i];
    if (table.cells[i].kind !== 'zero' || s0 === s1) continue;
    out.push({ x: xs[i - 1].value, y: ys[i - 1].value, kind: s0 === '+' ? 'max' : 'min' });
  }
  return out;
}

/**
 * " Hàm số đạt cực đại tại …; đạt cực tiểu tại …" for the extrema of a table.
 * @param {import('../_shared/variation.js').Variation} table
 * @param {import('./numbers.js').Num[]} xs
 * @param {import('./numbers.js').Num[]} ys
 */
function extremaSentence(table, xs, ys) {
  const parts = extremaPoints(table, xs, ys).map((pt) => {
    const i = xs.findIndex((x) => x.value === pt.x);
    const y = ys[i];
    const max = pt.kind === 'max';
    return `đạt cực ${max ? 'đại' : 'tiểu'} tại $x = ${xs[i].tex}$, $y_{\\text{${max ? 'CĐ' : 'CT'}}} ${rel(y)} ${y.tex}$`;
  });
  if (!parts.length) return ' Hàm số không có cực trị.';
  return ` Hàm số ${parts.join('; ')}.`;
}

/**
 * A survey that stops at the coefficients.
 * @param {string} tex @param {string} text
 * @param {(x: number) => number} f
 * @param {string} problem
 * @returns {Survey}
 */
function blank(tex, text, f, problem) {
  return {
    ok: false,
    problem,
    tex,
    text,
    f,
    steps: [],
    table: variationOf(
      [
        { x: '−∞', kind: 'end' },
        { x: '+∞', kind: 'end' },
      ],
      ['+'],
    ),
    poles: [],
    asymptotes: [],
    specials: [],
    win: { xMin: -4, xMax: 4, yMin: -3, yMax: 3 },
  };
}

/**
 * Surveys the function of a family with the given coefficients.
 * @param {FamilyId} id
 * @param {number[]} coefs
 * @returns {Survey}
 */
export function survey(id, coefs) {
  if (id === 'cubic') return cubic(coefs);
  if (id === 'linear') return linear(coefs);
  return quad(coefs);
}

/** The headings of the five steps. */
export const STEP_TITLES = [
  'Tìm tập xác định',
  'Tính đạo hàm, tìm các điểm y′ = 0',
  'Tìm giới hạn và tiệm cận',
  'Lập bảng biến thiên, kết luận',
  'Vẽ đồ thị',
];
