/**
 * A box of length a, width b and height c drawn to scale in a fixed frame,
 * the way `stack.js` draws a box (front, top and right faces), with the three
 * edges a child measures: the length along the bottom front, the width along
 * the bottom right (going away) and the height up the front left. A ruler
 * laid along an edge shows how far it reaches. Pure and DOM-free.
 */
import { DEPTH, boxFaces, project } from './stack.js';

/** @typedef {'length' | 'width' | 'height'} Edge */
/** @typedef {{ x: number, y: number }} Point */

/** The edges in the order the book gives the measures. */
export const EDGES = /** @type {const} */ (['length', 'width', 'height']);

/** What each edge is called, for labels and sentences. */
export const EDGE_NAMES = { length: 'chiều dài', width: 'chiều rộng', height: 'chiều cao' };

/** How far a ruler or a label sits from its edge, in screen units. */
const GAP = 16;

/**
 * The frame and the drawing of a box that fits in `width` × `height` screen
 * units, with `pad` round it for rulers and labels.
 * @param {number} a length
 * @param {number} b width
 * @param {number} c height
 * @param {{ width?: number, height?: number, pad?: number }} [frame]
 */
export function boxLayout(a, b, c, { width = 260, height = 170, pad = 40 } = {}) {
  const cell = Math.min(width / (a + DEPTH * b), height / (c + DEPTH * b));
  const w = (a + DEPTH * b) * cell + 2 * pad;
  const h = (c + DEPTH * b) * cell + 2 * pad;
  /**
   * The screen point of a model point.
   * @param {number} x @param {number} y @param {number} z
   * @returns {Point}
   */
  const at = (x, y, z) => {
    const p = project(x, y, z);
    return { x: pad + p.x * cell, y: h - pad + p.y * cell };
  };
  const faces = boxFaces({ x0: 0, x1: a, y0: 0, y1: b, z0: 0, z1: c }).map((f) => ({
    kind: f.kind,
    pts: f.pts.map((p) => ({ x: pad + p.x * cell, y: h - pad + p.y * cell })),
  }));
  const diag = GAP / Math.SQRT2;
  /** @type {Record<Edge, { from: Point, step: Point, offset: Point, size: number }>} */
  const edges = {
    length: { from: at(0, 0, 0), step: { x: cell, y: 0 }, offset: { x: 0, y: GAP }, size: a },
    width: {
      from: at(a, 0, 0),
      step: { x: DEPTH * cell, y: -DEPTH * cell },
      offset: { x: diag, y: diag },
      size: b,
    },
    height: { from: at(0, 0, 0), step: { x: 0, y: -cell }, offset: { x: -GAP, y: 0 }, size: c },
  };
  return { cell, width: w, height: h, faces, edges };
}

/**
 * The gap between two numbered ticks of a ruler that reaches up to `max`.
 * @param {number} max
 */
export function tickStep(max) {
  if (max <= 12) return 1;
  if (max <= 40) return 5;
  return 10;
}

/**
 * A ruler of `m` units laid along an edge, beside it: where it starts and
 * ends, and its ticks every `step` units (a long tick at each end).
 * @param {{ from: Point, step: Point, offset: Point }} edge
 * @param {number} m
 * @param {number} step
 */
export function rulerOn(edge, m, step) {
  const { from, step: u, offset } = edge;
  const len = Math.hypot(offset.x, offset.y) || 1;
  const n = { x: offset.x / len, y: offset.y / len };
  /** @param {number} t @param {number} k */
  const point = (t, k) => ({
    x: from.x + u.x * t + offset.x + n.x * k,
    y: from.y + u.y * t + offset.y + n.y * k,
  });
  const ticks = [];
  for (let t = 0; t <= m; t += step) {
    const long = t === 0;
    ticks.push({ p: point(t, long ? -6 : -4), q: point(t, long ? 6 : 4) });
  }
  return {
    start: point(0, 0),
    end: point(m, 0),
    ends: { p: point(m, -6), q: point(m, 6) },
    label: point(m, 14),
    ticks,
  };
}

/**
 * Where an edge's label goes: beside the middle of the edge, past its ruler.
 * @param {{ from: Point, step: Point, offset: Point, size: number }} edge
 */
export function labelSpot(edge) {
  return {
    x: edge.from.x + (edge.step.x * edge.size) / 2 + edge.offset.x * 1.4,
    y: edge.from.y + (edge.step.y * edge.size) / 2 + edge.offset.y * 1.4,
  };
}
