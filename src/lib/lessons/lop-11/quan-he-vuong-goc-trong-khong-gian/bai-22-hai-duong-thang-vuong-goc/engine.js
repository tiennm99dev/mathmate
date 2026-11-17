import { add3, dot3, sub3 } from '#lib/geom-engine/solid.js';
import { pick } from '#lib/core/drill.js';
import { cube, dist3, lineAngle, lineRelation, meetLines } from '#lib/geom-engine/space.js';

/**
 * Pairs of lines through the vertices of the cube ABCD.A'B'C'D' (its 12
 * edges and 12 face diagonals) and the angle between them. To find the angle
 * the book moves one line parallel to itself until it cuts the other: here
 * that is a line of the cube parallel to b that cuts a (or parallel to a that
 * cuts b), so the angle shows at a vertex or at the centre of a face.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {[string, string]} Seg */

export const SIDE = 3;
const BUILT = cube(SIDE);
/** @type {Record<string, P3>} */
export const CUBE = BUILT.points;
export const FACES = BUILT.faces;
export const EDGES = BUILT.edges;

/** @type {Seg[]} */
const DIAGONALS = FACES.flatMap((f) => [
  /** @type {Seg} */ ([f[0], f[2]]),
  /** @type {Seg} */ ([f[1], f[3]]),
]);

export const LINES = [...EDGES, ...DIAGONALS];

/** The answers the widget offers: every angle two such lines can make. */
export const ANGLES = [0, 45, 60, 90];

/** @param {Seg} s */
export const segName = (s) => `${s[0]}${s[1]}`;

/** @param {Seg} s */
const dirOf = (s) => sub3(CUBE[s[1]], CUBE[s[0]]);

/**
 * The angle between two lines of the cube, in whole degrees.
 * @param {Seg} s @param {Seg} t
 */
export const angleOf = (s, t) => Math.round(lineAngle(dirOf(s), dirOf(t)));

/** @param {Seg} s @param {Seg} t */
const relation = (s, t) => lineRelation(CUBE[s[0]], CUBE[s[1]], CUBE[t[0]], CUBE[t[1]]);

/** Every pair of different lines, grouped by the angle between them. */
export const BY_ANGLE = (() => {
  /** @type {Record<number, [Seg, Seg][]>} */
  const groups = Object.fromEntries(ANGLES.map((a) => [a, []]));
  for (let i = 0; i < LINES.length; i++) {
    for (let j = i + 1; j < LINES.length; j++) {
      if (relation(LINES[i], LINES[j]) === 'trung') continue;
      groups[angleOf(LINES[i], LINES[j])].push([LINES[i], LINES[j]]);
    }
  }
  return groups;
})();

/** How often a question is a pair of parallel lines, which need no moving. */
export const PARALLEL_SHARE = 0.1;

/**
 * A question: a pair of lines, mostly skew lines at 45°, 60° or 90°, since
 * those are the ones that need moving, and now and then a parallel pair.
 * @param {() => number} rand
 * @param {{ parallel?: boolean }} [options] `parallel: false` never draws a parallel pair
 * @returns {[Seg, Seg]}
 */
export function makePair(rand, { parallel = true } = {}) {
  const angle =
    parallel && rand() < PARALLEL_SHARE
      ? 0
      : pick(
          rand,
          ANGLES.filter((a) => a !== 0),
        );
  const all = BY_ANGLE[angle];
  const skew = all.filter(([s, t]) => relation(s, t) === 'cheo');
  const pool = skew.length && rand() < 0.75 ? skew : all;
  const [s, t] = pick(rand, pool);
  return rand() < 0.5 ? [s, t] : [t, s];
}

/**
 * The name of the point where two crossing lines of the cube meet: a vertex,
 * or O for the centre of a face.
 * @param {P3} p
 */
function pointName(p) {
  return Object.keys(CUBE).find((k) => dist3(CUBE[k], p) < 1e-6) ?? 'O';
}

/**
 * How to see the angle between a and b: a line u of the cube with u ∥ b (or
 * u = b) that cuts a at O, or the same with the roles swapped, and the two
 * rays from O that make the angle (0° to 90°). Null for parallel lines.
 * @param {Seg} a @param {Seg} b
 * @returns {{ fixed: Seg, moved: Seg, onto: Seg, at: P3, name: string, rays: [P3, P3] } | null}
 */
export function translation(a, b) {
  if (relation(a, b) === 'song-song') return null;
  for (const [fixed, moved] of [
    [a, b],
    [b, a],
  ]) {
    const options = [moved, ...LINES.filter((u) => relation(u, moved) === 'song-song')];
    for (const onto of options) {
      const at = meetLines(CUBE[fixed[0]], CUBE[fixed[1]], CUBE[onto[0]], CUBE[onto[1]]);
      if (!at) continue;
      const u = dirOf(fixed);
      let v = dirOf(onto);
      if (dot3(u, v) < 0) v = { x: -v.x, y: -v.y, z: -v.z };
      return { fixed, moved, onto, at, name: pointName(at), rays: [u, v] };
    }
  }
  return null;
}

/**
 * Why the angle is what it is, as a sentence with TeX.
 * @param {Seg} a @param {Seg} b
 */
export function explain(a, b) {
  const x = segName(a);
  const y = segName(b);
  const angle = angleOf(a, b);
  if (angle === 0) return `$${x} \\parallel ${y}$ nên góc giữa chúng bằng $0^\\circ$.`;
  const move = /** @type {NonNullable<ReturnType<typeof translation>>} */ (translation(a, b));
  const o = segName(move.onto);
  const why = reason(move.fixed, move.onto, move.name, angle);
  if (o === segName(move.moved)) {
    return `$${x}$ và $${y}$ cắt nhau tại $${move.name}$, nên góc giữa chúng là góc không tù tạo bởi hai đường thẳng tại $${move.name}$: $(${x}, ${y}) = ${angle}^\\circ$ ${why}.`;
  }
  const pair = move.fixed === a ? `(${x}, ${o})` : `(${o}, ${y})`;
  return `$${o} \\parallel ${segName(move.moved)}$ và $${o}$ cắt $${segName(move.fixed)}$ tại $${move.name}$, nên $(${x}, ${y}) = ${pair} = ${angle}^\\circ$ ${why}.`;
}

/** @param {Seg} s */
const isEdge = (s) => EDGES.some((e) => e.includes(s[0]) && e.includes(s[1]));

/**
 * Why two lines of the cube meeting at a point make their angle, in brackets.
 * @param {Seg} f @param {Seg} g @param {string} o the meeting point's name
 * @param {number} angle
 */
function reason(f, g, o, angle) {
  if (o === 'O') return '(hai đường chéo của một hình vuông vuông góc với nhau)';
  const p = f[0] === o ? f[1] : f[0];
  const q = g[0] === o ? g[1] : g[0];
  if (isEdge(f) && isEdge(g)) return `(hai cạnh kề nhau của một hình vuông có đỉnh $${o}$)`;
  if (angle === 45) return '(đường chéo của một hình vuông tạo với cạnh của nó góc $45^\\circ$)';
  if (angle === 60) {
    return `(tam giác $${o}${p}${q}$ đều vì ba cạnh của nó là đường chéo của ba mặt)`;
  }
  const r = sub3(add3(CUBE[p], CUBE[q]), CUBE[o]);
  return `(vì $${o}${p}${pointName(r)}${q}$ là hình chữ nhật)`;
}
