/**
 * Two-variable linear programming solved the book's geometric way: the
 * feasible region (miền chấp nhận được) cut out of a drawing box by closed
 * half-planes, its vertices, the objective F = p·x + q·y at each vertex, and
 * the level line F = k swept across the region. Pure logic, no DOM.
 *
 * The box only frames the drawing. A region that runs off the box is
 * unbounded (không là miền đa giác): the corners the box adds are not
 * vertices, and an optimum the box would put on such a corner does not exist.
 */
import { eqTex, eqText } from '#lib/core/algebra-text.js';
import { fracText } from '#lib/core/fractions.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {'<=' | '>='} Op
 * @typedef {{ a: number, b: number, c: number, op: Op }} Constraint
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Box
 * @typedef {'max' | 'min'} Goal
 * @typedef {{ name: string, pt: Pt, value: number }} Vertex
 */

const EPS = 1e-7;

/** @param {Constraint} k @param {Pt} p */
const slack = (k, p) =>
  k.op === '<=' ? k.c - (k.a * p.x + k.b * p.y) : k.a * p.x + k.b * p.y - k.c;

/** @param {Constraint} k @param {Pt} p */
export const satisfies = (k, p) => slack(k, p) >= -EPS;

/** @param {Constraint[]} ks @param {Pt} p */
export const isFeasible = (ks, p) => ks.every((k) => satisfies(k, p));

/** @param {Constraint} k @param {Pt} p */
const tight = (k, p) => Math.abs(slack(k, p)) < 1e-6;

/** Plain text: '2x + y ≤ 80'. @param {Constraint} k */
export function constraintText(k) {
  return eqText(k.a, k.b, k.c).replace(' = ', k.op === '<=' ? ' ≤ ' : ' ≥ ');
}

/** TeX source: '2x + y \le 80'. @param {Constraint} k */
export function constraintTex(k) {
  return eqTex(k.a, k.b, k.c).replace(' = ', k.op === '<=' ? ' \\le ' : ' \\ge ');
}

/** TeX source of the objective: 'F = 40x + 30y'. @param {number} p @param {number} q */
export function objectiveTex(p, q) {
  return `F = ${eqTex(p, q, 0).replace(' = 0', '')}`;
}

/**
 * A coordinate written exactly: '2,5', else a fraction ('15/7').
 * @param {number} v
 */
export function coordText(v) {
  const t = tidy(v);
  if (Math.abs(t * 100 - Math.round(t * 100)) < 1e-6) return formatNumber(t, 2);
  for (let d = 3; d <= 1000; d++) {
    const n = Math.round(t * d);
    if (Math.abs(n / d - t) < 1e-7) return fracText(n, d);
  }
  return `≈ ${formatNumber(t, 2)}`;
}

/** '(20; 40)'. @param {Pt} p */
export const pointText = (p) => `(${coordText(p.x)}; ${coordText(p.y)})`;

/** TeX of a point: '(2{,}5; 9)'. @param {Pt} p */
export const pointTex = (p) => `(${numTex(p.x, 4)};\\ ${numTex(p.y, 4)})`;

/**
 * Clips a convex polygon by the closed half-plane of `k` (Sutherland–Hodgman).
 * @param {Pt[]} poly @param {Constraint} k @returns {Pt[]}
 */
function clip(poly, k) {
  /** @type {Pt[]} */
  const out = [];
  const push = (/** @type {Pt} */ p) => {
    const pt = { x: tidy(p.x), y: tidy(p.y) };
    const last = out[out.length - 1];
    if (!last || Math.abs(last.x - pt.x) > EPS || Math.abs(last.y - pt.y) > EPS) out.push(pt);
  };
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const n = poly[(i + 1) % poly.length];
    const sp = slack(k, p);
    const sn = slack(k, n);
    if (sp >= -EPS) push(p);
    if ((sp > EPS && sn < -EPS) || (sp < -EPS && sn > EPS)) {
      const t = sp / (sp - sn);
      push({ x: p.x + t * (n.x - p.x), y: p.y + t * (n.y - p.y) });
    }
  }
  if (out.length > 1) {
    const a = out[0];
    const z = out[out.length - 1];
    if (Math.abs(a.x - z.x) < EPS && Math.abs(a.y - z.y) < EPS) out.pop();
  }
  return out.length >= 3 ? out : [];
}

/**
 * The part of the box the constraints leave, anticlockwise.
 * @param {Constraint[]} ks @param {Box} box @returns {Pt[]}
 */
export function regionPolygon(ks, box) {
  /** @type {Pt[]} */
  const start = [
    { x: box.xMin, y: box.yMin },
    { x: box.xMax, y: box.yMin },
    { x: box.xMax, y: box.yMax },
    { x: box.xMin, y: box.yMax },
  ];
  return ks.reduce((poly, k) => (poly.length ? clip(poly, k) : poly), start);
}

/**
 * Whether a corner of the drawn polygon is a real vertex of the region: two
 * constraint borders meet there. Corners added by the box are not.
 * @param {Constraint[]} ks @param {Pt} p
 */
export const isVertex = (ks, p) => ks.filter((k) => tight(k, p)).length >= 2;

/**
 * Whether the region is a polygon (bounded): every drawn corner is a vertex.
 * @param {Constraint[]} ks @param {Box} box
 */
export function isBounded(ks, box) {
  const poly = regionPolygon(ks, box);
  return poly.length > 0 && poly.every((p) => isVertex(ks, p));
}

/**
 * The vertices with the book's names, in order along the border: O for the
 * origin, then A, B, C, … A polygon starts at its lowest (then leftmost)
 * vertex; an unbounded region starts where its border comes in from the box.
 * @param {Constraint[]} ks @param {Box} box @param {number} p @param {number} q
 * @returns {Vertex[]}
 */
export function namedVertices(ks, box, p, q) {
  const poly = regionPolygon(ks, box);
  const real = poly.map((pt) => isVertex(ks, pt));
  let start = 0;
  if (real.every(Boolean)) {
    poly.forEach((pt, i) => {
      const s = poly[start];
      if (pt.y < s.y - EPS || (Math.abs(pt.y - s.y) < EPS && pt.x < s.x)) start = i;
    });
  } else {
    start = real.findIndex((r, i) => r && !real[(i - 1 + real.length) % real.length]);
  }
  const ordered = [...poly.slice(start), ...poly.slice(0, start)].filter((pt) => isVertex(ks, pt));
  let letter = 0;
  return ordered.map((pt) => {
    const value = tidy(p * pt.x + q * pt.y);
    if (pt.x === 0 && pt.y === 0) return { name: 'O', pt, value };
    const name = String.fromCharCode(65 + letter);
    letter += 1;
    return { name, pt, value };
  });
}

/**
 * Range of F over the drawn polygon (box corners included).
 * @param {Pt[]} poly @param {number} p @param {number} q
 */
export function valueRange(poly, p, q) {
  const vs = poly.map((pt) => tidy(p * pt.x + q * pt.y));
  return { min: Math.min(...vs), max: Math.max(...vs) };
}

/**
 * The optimum of F on the region: its value and the vertices that reach it,
 * or null when F is unbounded that way on an unbounded region.
 * @param {Constraint[]} ks @param {Box} box @param {number} p @param {number} q @param {Goal} goal
 * @returns {{ value: number, at: Vertex[] } | null}
 */
export function optimum(ks, box, p, q, goal) {
  const poly = regionPolygon(ks, box);
  if (!poly.length) return null;
  const vs = namedVertices(ks, box, p, q);
  if (!vs.length) return null;
  const sign = goal === 'max' ? 1 : -1;
  const best = Math.max(...vs.map((v) => sign * v.value));
  const range = valueRange(poly, p, q);
  const drawnBest = goal === 'max' ? range.max : -range.min;
  if (drawnBest > best + 1e-6) return null;
  return { value: sign * best, at: vs.filter((v) => Math.abs(sign * v.value - best) < 1e-6) };
}

/**
 * Where the level line F = k crosses the drawn polygon, as a segment, or
 * null when it misses it.
 * @param {Pt[]} poly @param {number} p @param {number} q @param {number} k
 * @returns {[Pt, Pt] | null}
 */
export function levelSegment(poly, p, q, k) {
  /** @type {Pt[]} */
  const hits = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const fa = p * a.x + q * a.y - k;
    const fb = p * b.x + q * b.y - k;
    if (Math.abs(fa) < 1e-9) hits.push(a);
    if ((fa < -1e-9 && fb > 1e-9) || (fa > 1e-9 && fb < -1e-9)) {
      const t = fa / (fa - fb);
      hits.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) });
    }
  }
  if (!hits.length) return null;
  // Farthest pair along the line's direction (−q, p).
  const along = (/** @type {Pt} */ h) => -q * h.x + p * h.y;
  const sorted = [...hits].sort((u, v) => along(u) - along(v));
  return [sorted[0], sorted[sorted.length - 1]];
}

/**
 * The live sentence under the level-line slider.
 * @param {Constraint[]} ks @param {Box} box @param {number} p @param {number} q
 * @param {Goal} goal @param {number} k
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function levelVerdict(ks, box, p, q, goal, k) {
  const poly = regionPolygon(ks, box);
  const range = valueRange(poly, p, q);
  const best = optimum(ks, box, p, q, goal);
  const kt = numTex(k);
  const word = goal === 'max' ? 'lớn nhất' : 'nhỏ nhất';
  if (best && Math.abs(k - best.value) < 1e-6) {
    const names = best.at.map((v) => `$${v.name}${pointTex(v.pt)}$`).join(' và ');
    const where = best.at.length > 1 ? `cả cạnh nối ${names}` : `đỉnh ${names}`;
    return {
      tone: 'ok',
      text: `Đường mức $F = ${kt}$ chỉ còn chạm miền chấp nhận được tại ${where}. Đi tiếp theo hướng đó thì đường mức rời khỏi miền, nên giá trị ${word} của $F$ là $${kt}$.`,
    };
  }
  // F takes every value between its least and greatest value on the region
  // (convex), and every value past a side where the region is unbounded.
  const top = goal === 'max' ? best : optimum(ks, box, p, q, 'max');
  const bottom = goal === 'min' ? best : optimum(ks, box, p, q, 'min');
  const fMax = top ? top.value : Infinity;
  const fMin = bottom ? bottom.value : -Infinity;
  if (k > fMax + EPS || k < fMin - EPS) {
    return {
      tone: 'warn',
      text: `Đường mức $F = ${kt}$ không cắt miền chấp nhận được: không có phương án nào cho $F = ${kt}$. Kéo $k$ quay lại.`,
    };
  }
  const offBoard =
    k > range.max + EPS || k < range.min - EPS
      ? ' (phần đó nằm ngoài khung hình vì miền không bị chặn)'
      : '';
  const dir = goal === 'max' ? 'Tăng' : 'Giảm';
  const tail = best
    ? `${dir} $k$ dần cho tới khi đường mức chỉ còn chạm miền.`
    : `Miền không bị chặn theo hướng này: ${goal === 'max' ? 'tăng' : 'giảm'} $k$ mãi đường mức vẫn cắt miền, nên $F$ không có giá trị ${word}.`;
  return {
    tone: 'info',
    text: `Đường mức $F = ${kt}$ cắt miền chấp nhận được${offBoard}: mọi điểm trên phần nằm trong miền là phương án cho $F = ${kt}$. ${tail}`,
  };
}
