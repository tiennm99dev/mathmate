import { add3, dot3, mul3 } from '#lib/geom-engine/solid.js';
import { numTex } from '#lib/core/number-format.js';
import {
  angle3,
  dist3,
  lineRelation,
  mid3,
  planeThrough,
  projectAlong,
} from '#lib/geom-engine/space.js';

/**
 * Parallel projection of a flat figure (a square, an equilateral triangle or a
 * circle) held in a tilted plane above the ground plane (P): z = 0, along a
 * direction l given by its turn and its slope. The facts list what the
 * projection keeps (parallel lines, ratios on one line or on parallel lines,
 * midpoints) and what it changes (angles, the ratio of two sides that are not
 * parallel, lengths).
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {'vuong' | 'tam-giac' | 'tron'} Shape */
/** @typedef {{ text: string, kept: boolean }} Fact */

export const SHAPES = /** @type {const} */ ([
  { id: 'vuong', label: 'Hình vuông' },
  { id: 'tam-giac', label: 'Tam giác đều' },
  { id: 'tron', label: 'Đường tròn' },
]);

/** The tilt of the figure's plane above the ground, in degrees. */
const TILT = 50;
const CENTRE = { x: 0, y: 0, z: 2.6 };
const U = { x: 1, y: 0, z: 0 };
const W = { x: 0, y: Math.cos((TILT * Math.PI) / 180), z: Math.sin((TILT * Math.PI) / 180) };
/** Unit normal of the figure's plane. */
export const NORMAL = { x: 0, y: -W.z, z: W.y };

export const GROUND = /** @type {import('#lib/geom-engine/space.js').Plane} */ (
  planeThrough({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 })
);

/** @param {number} a @param {number} b */
const at = (a, b) => add3(CENTRE, add3(mul3(U, a), mul3(W, b)));

/**
 * The named points of a figure, its outline (closed) and its inner segments.
 * @param {Shape} shape
 * @returns {{ points: Record<string, P3>, outline: string[], segments: [string, string][], names: string[] }}
 */
export function figure(shape) {
  if (shape === 'vuong') {
    const h = 1.5;
    return {
      points: { A: at(-h, -h), B: at(h, -h), C: at(h, h), D: at(-h, h), M: at(0, -h) },
      outline: ['A', 'B', 'C', 'D'],
      segments: [],
      names: ['A', 'B', 'C', 'D', 'M'],
    };
  }
  if (shape === 'tam-giac') {
    const s = 3.4;
    const r = s / Math.sqrt(3);
    /** @type {Record<string, P3>} */
    const points = { A: at(0, r), B: at(-s / 2, -r / 2), C: at(s / 2, -r / 2) };
    points.M = mid3(points.B, points.C);
    return {
      points,
      outline: ['A', 'B', 'C'],
      segments: [['A', 'M']],
      names: ['A', 'B', 'C', 'M'],
    };
  }
  const r = 1.6;
  /** @type {Record<string, P3>} */
  // The diameter PQ runs up the tilted plane, so its image changes length.
  const points = { O: at(0, 0), P: at(0, -r), Q: at(0, r) };
  const outline = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * 2 * Math.PI;
    points[`c${i}`] = at(r * Math.cos(a), r * Math.sin(a));
    outline.push(`c${i}`);
  }
  return { points, outline, segments: [['P', 'Q']], names: ['O', 'P', 'Q'] };
}

/**
 * The image of every named point of a figure along the direction l.
 * @param {Record<string, P3>} points
 * @param {P3} dir not parallel to the ground
 * @returns {Record<string, P3>}
 */
export function project(points, dir) {
  /** @type {Record<string, P3>} */
  const out = {};
  for (const [k, p] of Object.entries(points)) {
    out[k] = /** @type {P3} */ (projectAlong(p, dir, GROUND));
  }
  return out;
}

/**
 * True when l is (nearly) parallel to the figure's plane: the image then
 * flattens towards a segment.
 * @param {P3} dir a unit vector
 */
export const flattens = (dir) => Math.abs(dot3(dir, NORMAL)) < 0.08;

/** @param {number} v */
const deg = (v) => `${numTex(v, 0)}^\\circ`;
/** @param {number} v */
const ratioTex = (v) => numTex(v, 2);
const NEAR = 0.5;

/**
 * The fact about the right angle ABC of the square.
 * @param {number} angle the angle A'B'C' in degrees
 * @returns {Fact}
 */
function angleFact(angle) {
  const kept = Math.abs(angle - 90) < NEAR;
  return {
    text: kept
      ? `$\\widehat{A'B'C'} \\approx 90^\\circ$: ở phương chiếu này góc vuông tình cờ được giữ, nhưng nói chung phép chiếu song song không giữ nguyên góc.`
      : `$\\widehat{A'B'C'} \\approx ${deg(angle)}$, trong khi $\\widehat{ABC} = 90^\\circ$: góc không được giữ nguyên.`,
    kept,
  };
}

/**
 * The fact about the sides AB, BC of the square, which are not parallel.
 * @param {number} ratio A'B' / B'C'
 * @returns {Fact}
 */
function sidesFact(ratio) {
  const kept = Math.abs(ratio - 1) < 0.005;
  return {
    text: kept
      ? `$\\dfrac{A'B'}{B'C'} \\approx 1$: tình cờ bằng $\\dfrac{AB}{BC}$, nhưng nói chung tỉ số hai đoạn không song song thay đổi.`
      : `$\\dfrac{A'B'}{B'C'} \\approx ${ratioTex(ratio)}$, trong khi $\\dfrac{AB}{BC} = 1$: tỉ số hai đoạn không song song thay đổi.`,
    kept,
  };
}

/**
 * The fact about the angles of the image of the equilateral triangle.
 * @param {number[]} angles
 * @returns {Fact}
 */
function triangleFact(angles) {
  const kept = angles.every((a) => Math.abs(a - 60) < NEAR);
  const list = angles.map(deg).join('$, $');
  return {
    text: kept
      ? `Các góc của tam giác $A'B'C'$ đều xấp xỉ $60^\\circ$: ở phương chiếu này ảnh tình cờ vẫn là tam giác đều.`
      : `Các góc của tam giác $A'B'C'$ xấp xỉ $${list}$, không còn cùng bằng $60^\\circ$: ảnh của tam giác đều có thể là một tam giác bất kì.`,
    kept,
  };
}

/**
 * What the projection keeps and what it changes, for the figure and its image.
 * @param {Shape} shape
 * @param {Record<string, P3>} o the figure
 * @param {Record<string, P3>} i its image
 * @returns {Fact[]}
 */
export function facts(shape, o, i) {
  if (shape === 'vuong') {
    return [
      {
        text: `$A'B' \\parallel D'C'$ và $A'D' \\parallel B'C'$: ảnh của hình vuông là một hình bình hành.`,
        kept:
          lineRelation(i.A, i.B, i.D, i.C) === 'song-song' &&
          lineRelation(i.A, i.D, i.B, i.C) === 'song-song',
      },
      {
        text: `$\\dfrac{A'M'}{M'B'} = ${ratioTex(dist3(i.A, i.M) / dist3(i.M, i.B))}$, giữ nguyên $\\dfrac{AM}{MB} = 1$: $M'$ là trung điểm của $A'B'$.`,
        kept: true,
      },
      {
        text: `$\\dfrac{A'B'}{D'C'} = ${ratioTex(dist3(i.A, i.B) / dist3(i.D, i.C))}$, giữ nguyên $\\dfrac{AB}{DC} = 1$ (hai đoạn thẳng song song).`,
        kept: true,
      },
      angleFact(angle3(i.A, i.B, i.C)),
      sidesFact(dist3(i.A, i.B) / dist3(i.B, i.C)),
    ];
  }
  if (shape === 'tam-giac') {
    return [
      {
        text: `$\\dfrac{B'M'}{M'C'} = ${ratioTex(dist3(i.B, i.M) / dist3(i.M, i.C))}$: $M'$ vẫn là trung điểm của $B'C'$, nên $A'M'$ vẫn là đường trung tuyến.`,
        kept: true,
      },
      triangleFact([angle3(i.B, i.A, i.C), angle3(i.A, i.B, i.C), angle3(i.A, i.C, i.B)]),
    ];
  }
  const d = dist3(i.P, i.Q);
  const same = Math.abs(d - dist3(o.P, o.Q)) < 0.005;
  return [
    {
      text: `$\\dfrac{P'O'}{O'Q'} = ${ratioTex(dist3(i.P, i.O) / dist3(i.O, i.Q))}$: ảnh $O'$ của tâm là trung điểm của $P'Q'$.`,
      kept: true,
    },
    {
      text: same
        ? `Đường kính $PQ = ${ratioTex(dist3(o.P, o.Q))}$ có ảnh dài đúng bằng nó, nhưng các dây khác bị co giãn: ảnh của đường tròn là một đường elip.`
        : `Đường kính $PQ = ${ratioTex(dist3(o.P, o.Q))}$ có ảnh $P'Q' \\approx ${ratioTex(d)}$: độ dài thay đổi; ảnh của đường tròn là một đường elip.`,
      kept: same,
    },
  ];
}
