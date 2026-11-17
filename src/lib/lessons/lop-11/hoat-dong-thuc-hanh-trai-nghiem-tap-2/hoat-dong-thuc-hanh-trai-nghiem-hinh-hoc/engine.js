/**
 * Nets of the open solids folded from card in the grade 11 KNTT geometry
 * activity, and their measures. Every solid here has a regular n-gon base of
 * side `b` and n equal side faces hinged on the base edges: an isosceles
 * trapezoid with the base edge b, the top edge c and the height (slant) d.
 * c = b gives a prism or open box, c = 0 a pyramid, 0 < c < b a frustum.
 * Folding turns every side face about its base edge by the same angle; fully
 * folded, it makes the dihedral angle φ with the base, where
 * cos φ = (r_b − r_c)/d and r is the inradius of the base or the top.
 */

/** @typedef {{ x: number, y: number, z: number }} P3 */

/**
 * The inradius of a regular n-gon of side s.
 * @param {number} n @param {number} s
 */
export function inradius(n, s) {
  return s / (2 * Math.tan(Math.PI / n));
}

/**
 * The area of a regular n-gon of side s.
 * @param {number} n @param {number} s
 */
export function polygonAreaOf(n, s) {
  return (n * s * inradius(n, s)) / 2;
}

/**
 * @typedef {object} Shape
 * @property {number} n sides of the base
 * @property {number} b base side
 * @property {number} c top side (0 for a pyramid)
 * @property {number} d slant height of a side face
 */

/**
 * Measures of the folded solid: dihedral angle φ (degrees) between a side
 * face and the base, height h, lateral edge, base and top areas, volume
 * h/3·(B + B′ + √(BB′)), and the area of card the net uses.
 * Returns null when the side faces cannot meet (d ≤ r_b − r_c).
 * @param {Shape} s
 */
export function measures(s) {
  const gap = inradius(s.n, s.b) - inradius(s.n, s.c);
  if (s.d <= gap + 1e-9) return null;
  const h = Math.sqrt(s.d ** 2 - gap ** 2);
  const phi = (Math.acos(gap / s.d) * 180) / Math.PI;
  const edge = Math.sqrt(s.d ** 2 + ((s.b - s.c) / 2) ** 2);
  const base = polygonAreaOf(s.n, s.b);
  const top = polygonAreaOf(s.n, s.c);
  const volume = (h / 3) * (base + top + Math.sqrt(base * top));
  const side = ((s.b + s.c) / 2) * s.d;
  return { phi, h, edge, base, top, volume, net: base + s.n * side };
}

/**
 * @typedef {object} NetFace
 * @property {string} id
 * @property {'base' | 'side'} kind
 * @property {P3[]} pts
 */

/**
 * The faces of the net folded by `progress` (0 flat, 1 closed). The base
 * lies on z = 0, centred at the origin, with one edge parallel to the x-axis.
 * @param {Shape} s
 * @param {number} progress
 * @returns {NetFace[]}
 */
export function foldedFaces(s, progress) {
  const m = measures(s);
  const phi = m ? (m.phi * Math.PI) / 180 : Math.PI / 2;
  const alpha = progress * (Math.PI - phi);
  const R = s.b / (2 * Math.sin(Math.PI / s.n));
  const start = -Math.PI / 2 - Math.PI / s.n;
  /** @type {P3[]} */
  const corners = Array.from({ length: s.n }, (_, i) => {
    const a = start + (2 * Math.PI * i) / s.n;
    return { x: R * Math.cos(a), y: R * Math.sin(a), z: 0 };
  });
  /** @type {NetFace[]} */
  const faces = [{ id: 'base', kind: 'base', pts: corners }];
  const local =
    s.c > 1e-9
      ? [
          [0, 0],
          [s.b, 0],
          [(s.b + s.c) / 2, s.d],
          [(s.b - s.c) / 2, s.d],
        ]
      : [
          [0, 0],
          [s.b, 0],
          [s.b / 2, s.d],
        ];
  for (let i = 0; i < s.n; i++) {
    const p = corners[i];
    const q = corners[(i + 1) % s.n];
    const ex = (q.x - p.x) / s.b;
    const ey = (q.y - p.y) / s.b;
    // Outward in the plane: the base is counter-clockwise, so turn right.
    const nx = ey;
    const ny = -ex;
    const ox = Math.cos(alpha) * nx;
    const oy = Math.cos(alpha) * ny;
    const oz = Math.sin(alpha);
    faces.push({
      id: `side-${i}`,
      kind: 'side',
      pts: local.map(([u, v]) => ({
        x: p.x + u * ex + v * ox,
        y: p.y + u * ey + v * oy,
        z: v * oz,
      })),
    });
  }
  return faces;
}

/**
 * @typedef {object} SolidKind
 * @property {string} id
 * @property {string} label
 * @property {string} name the solid in a sentence
 * @property {number} n
 */

/** The solids of the activity, folded from a card. */
export const SOLIDS = /** @type {const} */ ([
  { id: 'hop', label: 'Hộp không nắp', name: 'hình hộp chữ nhật không nắp', n: 4 },
  {
    id: 'luc-giac',
    label: 'Lăng trụ lục giác',
    name: 'hình lăng trụ lục giác đều không nắp',
    n: 6,
  },
  { id: 'chop', label: 'Chóp tứ giác đều', name: 'hình chóp tứ giác đều', n: 4 },
  { id: 'tu-dien', label: 'Tứ diện đều', name: 'hình tứ diện đều', n: 3 },
  { id: 'chop-cut', label: 'Chóp cụt', name: 'hình chóp cụt tứ giác đều không nắp', n: 4 },
]);

/**
 * The open box cut from a square card of side a: squares of side x are cut
 * from the corners and the flaps folded up. Base side a − 2x, height x,
 * volume x(a − 2x)².
 * @param {number} a @param {number} x
 * @returns {Shape}
 */
export function boxFromCard(a, x) {
  const b = a - 2 * x;
  return { n: 4, b, c: b, d: x };
}

/** The side of the square card the open box is cut from, in cm. */
export const CARD = 12;

/**
 * The cut x in (0; a/2) that gives the largest open box from a square card
 * of side a: x(a − 2x)² is largest at x = a/6.
 * @param {number} a
 */
export function bestCut(a) {
  return a / 6;
}

/**
 * @typedef {object} Knob
 * @property {string} label
 * @property {number} min
 * @property {number} max
 * @property {number} step
 * @property {number} start
 */

/**
 * The sliders of each solid (lengths in cm): the first sets the base side
 * (or the cut of the box), the second the slant or the height.
 * @type {Record<string, Knob[]>}
 */
export const KNOBS = {
  hop: [{ label: 'Cạnh hình vuông cắt ở góc x', min: 0.5, max: 5.5, step: 0.5, start: 1 }],
  'luc-giac': [
    { label: 'Cạnh đáy', min: 2, max: 5, step: 0.5, start: 3 },
    { label: 'Chiều cao', min: 1, max: 8, step: 0.5, start: 5 },
  ],
  chop: [
    { label: 'Cạnh đáy', min: 3, max: 8, step: 0.5, start: 6 },
    { label: 'Trung đoạn', min: 2, max: 10, step: 0.5, start: 5 },
  ],
  'tu-dien': [{ label: 'Cạnh', min: 3, max: 9, step: 0.5, start: 6 }],
  'chop-cut': [
    { label: 'Cạnh đáy nhỏ', min: 1, max: 6, step: 0.5, start: 4 },
    { label: 'Chiều cao mặt bên', min: 2, max: 8, step: 0.5, start: 4 },
  ],
};

/** The bigger base side of the frustum, in cm. */
export const FRUSTUM_BASE = 8;

/**
 * The shortest slant on the half-centimetre grid for which the side faces of
 * a pyramid or frustum still meet: strictly more than r_b − r_c. Other
 * solids have no such limit (0).
 * @param {string} kind
 * @param {number} p first slider
 */
export function minSlant(kind, p) {
  if (kind !== 'chop' && kind !== 'chop-cut') return 0;
  const gap = kind === 'chop' ? p / 2 : (FRUSTUM_BASE - p) / 2;
  return Math.floor(gap * 2 + 1) / 2;
}

/**
 * The shape of a solid from its slider values; a slant too short is raised
 * to `minSlant`, so the net always folds.
 * @param {string} kind
 * @param {number} p first slider
 * @param {number} q second slider
 * @returns {Shape}
 */
export function shapeOf(kind, p, q) {
  if (kind === 'hop') return boxFromCard(CARD, p);
  if (kind === 'luc-giac') return { n: 6, b: p, c: p, d: q };
  if (kind === 'tu-dien') return { n: 3, b: p, c: 0, d: (p * Math.sqrt(3)) / 2 };
  const d = Math.max(q, minSlant(kind, p));
  return kind === 'chop' ? { n: 4, b: p, c: 0, d } : { n: 4, b: FRUSTUM_BASE, c: p, d };
}

/**
 * The angle of elevation of the sun (degrees) from a vertical stick and its
 * shadow on level ground: tan α = stick / shadow.
 * @param {number} stick @param {number} shadow
 */
export function sunAngle(stick, shadow) {
  return (Math.atan2(stick, shadow) * 180) / Math.PI;
}

/**
 * The shadow of a vertical stick when the sun is `deg` degrees above the
 * horizon.
 * @param {number} stick @param {number} deg
 */
export function shadowOf(stick, deg) {
  return stick / Math.tan((deg * Math.PI) / 180);
}

/**
 * Heron's formula: the area of a triangle from its three sides.
 * @param {number} a @param {number} b @param {number} c
 */
export function heron(a, b, c) {
  const p = (a + b + c) / 2;
  return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

/**
 * Moments of one morning to measure the sun from, with the sun's elevation
 * in degrees.
 */
export const SUN_TIMES = /** @type {const} */ ([
  { clock: '7 giờ 30', deg: 25 },
  { clock: '8 giờ', deg: 32 },
  { clock: '8 giờ 30', deg: 40 },
  { clock: '9 giờ', deg: 48 },
  { clock: '9 giờ 30', deg: 57 },
  { clock: '10 giờ', deg: 65 },
]);

/**
 * The shadow of the 1 m stick in whole centimetres, as read on the tape.
 * @param {number} deg
 */
export function shadowCm(deg) {
  return Math.round(shadowOf(100, deg));
}
