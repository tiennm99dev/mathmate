import { dot3, sub3 } from '#lib/geom-engine/solid.js';
import { pick } from '#lib/core/drill.js';
import { lineRelation, meetLines, meetPlane, onPlane, planeThrough } from '../_shared/space.js';

/**
 * Two lines through the vertices of the box ABCD.A'B'C'D' (hình hộp chữ
 * nhật): its 12 edges and 12 face diagonals. The widget asks how two of them
 * lie (cắt nhau, song song, chéo nhau) and explains with the plane that holds
 * both, or why no plane does.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {[string, string]} Seg */

const P = (x = 0, y = 0, z = 0) => ({ x, y, z });
const L = 4;
const Wd = 3;
const Ht = 2.5;

/** @type {Record<string, P3>} */
export const BOX = {
  A: P(0, 0, 0),
  B: P(L, 0, 0),
  C: P(L, Wd, 0),
  D: P(0, Wd, 0),
  "A'": P(0, 0, Ht),
  "B'": P(L, 0, Ht),
  "C'": P(L, Wd, Ht),
  "D'": P(0, Wd, Ht),
};

/** The six faces, each by its corners in order and by its name. */
export const FACES = [
  ['A', 'B', 'C', 'D'],
  ["A'", "B'", "C'", "D'"],
  ['A', 'B', "B'", "A'"],
  ['B', 'C', "C'", "B'"],
  ['C', 'D', "D'", "C'"],
  ['D', 'A', "A'", "D'"],
];

/** @type {Seg[]} */
export const EDGES = [
  ['A', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'A'],
  ["A'", "B'"],
  ["B'", "C'"],
  ["C'", "D'"],
  ["D'", "A'"],
  ['A', "A'"],
  ['B', "B'"],
  ['C', "C'"],
  ['D', "D'"],
];

/** @type {Seg[]} */
export const DIAGONALS = FACES.flatMap((f) => [
  /** @type {Seg} */ ([f[0], f[2]]),
  /** @type {Seg} */ ([f[1], f[3]]),
]);

export const LINES = [...EDGES, ...DIAGONALS];

/** @param {Seg} s */
export const segName = (s) => `${s[0]}${s[1]}`;

/** @param {string[]} names */
const planeName = (names) => `(${names.join('')})`;

/**
 * How the two lines lie.
 * @param {Seg} s @param {Seg} t
 */
export function classify(s, t) {
  return lineRelation(BOX[s[0]], BOX[s[1]], BOX[t[0]], BOX[t[1]]);
}

/** Every pair of different lines, grouped by how they lie. */
export const PAIRS = (() => {
  /** @type {Record<'cat' | 'song-song' | 'cheo', [Seg, Seg][]>} */
  const groups = { cat: [], 'song-song': [], cheo: [] };
  for (let i = 0; i < LINES.length; i++) {
    for (let j = i + 1; j < LINES.length; j++) {
      const r = classify(LINES[i], LINES[j]);
      if (r !== 'trung') groups[r].push([LINES[i], LINES[j]]);
    }
  }
  return groups;
})();

export const RELATIONS = /** @type {const} */ ([
  { id: 'cat', label: 'Cắt nhau' },
  { id: 'song-song', label: 'Song song' },
  { id: 'cheo', label: 'Chéo nhau' },
]);

/**
 * A question: a pair of lines, the three answers drawn about equally often.
 * @param {() => number} rand
 * @returns {[Seg, Seg]}
 */
export function makePair(rand) {
  const r = pick(rand, RELATIONS).id;
  const [s, t] = pick(rand, PAIRS[r]);
  return rand() < 0.5 ? [s, t] : [t, s];
}

/**
 * The corners of the plane that holds two lines in one plane, in order around
 * it, or null for two skew lines.
 * @param {Seg} s @param {Seg} t
 * @returns {string[] | null}
 */
export function commonPlane(s, t) {
  const r = classify(s, t);
  if (r === 'cheo') return null;
  const shared = s.find((k) => t.includes(k));
  if (shared) {
    return [s.find((k) => k !== shared), shared, t.find((k) => k !== shared)].map(String);
  }
  if (r === 'song-song') {
    const same = dot3(sub3(BOX[s[1]], BOX[s[0]]), sub3(BOX[t[1]], BOX[t[0]])) > 0;
    return same ? [s[0], s[1], t[1], t[0]] : [s[0], s[1], t[0], t[1]];
  }
  // Two crossing diagonals of one face.
  return [s[0], t[0], s[1], t[1]];
}

/**
 * The face whose plane holds a line, if any.
 * @param {Seg} s
 */
function faceHolding(s) {
  return FACES.filter((f) => {
    const pl = planeThrough(BOX[f[0]], BOX[f[1]], BOX[f[2]]);
    return pl && onPlane(BOX[s[0]], pl) && onPlane(BOX[s[1]], pl);
  });
}

/**
 * The vertex of the box at a point, if any.
 * @param {P3} p
 */
function vertexAt(p) {
  return Object.keys(BOX).find(
    (k) => Math.hypot(BOX[k].x - p.x, BOX[k].y - p.y, BOX[k].z - p.z) < 1e-6,
  );
}

/**
 * Why the two lines lie as they do, as a sentence with TeX.
 * @param {Seg} s @param {Seg} t
 */
export function explain(s, t) {
  const a = segName(s);
  const b = segName(t);
  const r = classify(s, t);
  const plane = commonPlane(s, t);
  if (r === 'song-song' && plane) {
    return `$${a}$ và $${b}$ cùng nằm trong mặt phẳng $${planeName(plane)}$ và không có điểm chung, nên $${a} \\parallel ${b}$.`;
  }
  if (r === 'cat' && plane) {
    const shared = s.find((k) => t.includes(k));
    const where = shared
      ? `có điểm chung $${shared}$`
      : `là hai đường chéo của hình chữ nhật $${plane.join('')}$, cắt nhau tại tâm của nó`;
    return `$${a}$ và $${b}$ cùng nằm trong mặt phẳng $${planeName(plane)}$ và ${where}: hai đường thẳng cắt nhau.`;
  }
  for (const [u, v] of [
    [s, t],
    [t, s],
  ]) {
    const x = segName(u);
    const y = segName(v);
    for (const f of faceHolding(u)) {
      const pl = planeThrough(BOX[f[0]], BOX[f[1]], BOX[f[2]]);
      const hit = pl && meetPlane(BOX[v[0]], BOX[v[1]], pl);
      const name = hit && vertexAt(hit.point);
      if (!name) continue;
      return `$${x} \\subset ${planeName(f)}$, còn $${y}$ cắt $${planeName(f)}$ tại $${name} \\notin ${x}$. Mặt phẳng nào chứa cả $${x}$ và $${y}$ cũng chứa $${x}$ và điểm $${name}$, nên phải là $${planeName(f)}$; nhưng $${y}$ không nằm trong $${planeName(f)}$. Vậy $${a}$ và $${b}$ chéo nhau.`;
    }
  }
  const [fa] = faceHolding(s);
  const [fb] = faceHolding(t);
  return `$${a}$ nằm trong mặt $${planeName(fa)}$, $${b}$ nằm trong mặt đối diện $${planeName(fb)}$; hai mặt này không có điểm chung nên hai đường thẳng không cắt nhau. Chúng cũng không cùng phương nên không song song. Vậy $${a}$ và $${b}$ chéo nhau.`;
}

/**
 * Where two crossing lines meet (for a dot on the drawing), or null.
 * @param {Seg} s @param {Seg} t
 */
export function meetPoint(s, t) {
  return meetLines(BOX[s[0]], BOX[s[1]], BOX[t[0]], BOX[t[1]]);
}
