/**
 * Drawing a graph in SVG units: edge paths (parallel edges bent apart, a loop
 * as a small circle above its vertex) and the spot for a vertex badge.
 */

/** @typedef {{ x: number, y: number }} Pt */

/** How far apart (SVG units) two parallel edges bulge at their middle. */
export const BEND = 30;

/**
 * The SVG path of every edge and the point at its middle (for a weight).
 * @param {Pt[]} pos @param {Array<{ a: number, b: number }>} edges
 * @returns {Array<{ d: string, mid: Pt }>}
 */
export function edgeShapes(pos, edges) {
  /** @type {Map<string, number[]>} */
  const groups = new Map();
  edges.forEach(({ a, b }, i) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    groups.set(key, [...(groups.get(key) ?? []), i]);
  });
  return edges.map(({ a, b }, i) => {
    const p = pos[a];
    const q = pos[b];
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    const group = /** @type {number[]} */ (groups.get(key));
    if (a === b) {
      const r = 12 + 8 * group.indexOf(i);
      return {
        d: `M ${f(p.x - 6)} ${f(p.y - 13)} A ${r} ${r} 0 1 1 ${f(p.x + 6)} ${f(p.y - 13)}`,
        mid: { x: p.x, y: p.y - 13 - 2 * r },
      };
    }
    // Bend relative to the edge drawn from the smaller index, so two parallel
    // edges a–b and b–a still bulge to different sides.
    const [s, t] = a < b ? [p, q] : [q, p];
    const k = group.indexOf(i) - (group.length - 1) / 2;
    const dx = t.x - s.x;
    const dy = t.y - s.y;
    const len = Math.hypot(dx, dy) || 1;
    const off = k * BEND;
    const mid = { x: (s.x + t.x) / 2 - (dy / len) * off, y: (s.y + t.y) / 2 + (dx / len) * off };
    if (off === 0) return { d: `M ${f(p.x)} ${f(p.y)} L ${f(q.x)} ${f(q.y)}`, mid };
    // A quadratic curve reaches half its control offset at t = 1/2.
    const c = {
      x: (s.x + t.x) / 2 - (dy / len) * off * 2,
      y: (s.y + t.y) / 2 + (dx / len) * off * 2,
    };
    return { d: `M ${f(p.x)} ${f(p.y)} Q ${f(c.x)} ${f(c.y)} ${f(q.x)} ${f(q.y)}`, mid };
  });
}

/**
 * Where to write a badge for vertex v: above the vertex, or beside it (on the
 * side away from the middle) when the vertex sits near the top or the bottom
 * of the drawing; always kept inside it.
 * @param {Pt[]} pos @param {number} v @param {number} width @param {number} height
 */
export function badgeSpot(pos, v, width, height) {
  const p = pos[v];
  const nearEdge = p.y < 50 || p.y > height / 2 + 60;
  const x = nearEdge ? p.x + (p.x >= width / 2 ? 38 : -38) : p.x;
  const y = nearEdge ? p.y : p.y - 26;
  return { x: Math.min(width - 20, Math.max(20, x)), y };
}

/**
 * Points on an ellipse around the middle of the drawing, the first at the top.
 * @param {number} n @param {number} width @param {number} height
 * @returns {Pt[]}
 */
export function ringLayout(n, width, height) {
  const rx = width / 2 - 44;
  const ry = height / 2 - 40;
  return Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: width / 2 + rx * Math.cos(t), y: height / 2 + ry * Math.sin(t) };
  });
}

/** @param {number} v */
function f(v) {
  return Math.round(v * 10) / 10;
}
