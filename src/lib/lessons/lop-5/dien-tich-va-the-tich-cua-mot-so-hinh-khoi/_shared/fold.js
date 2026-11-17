/**
 * Nets (hình khai triển) that fold into a cube, a box or a cylinder.
 *
 * A net is a tree of flat pieces in the plane z = 0. The root piece lies on
 * the table; every other piece hangs off its parent along a fold line (the
 * hinge) and turns up about it, towards +z, by `t · angle`: t = 0 is the
 * flat net and t = 1 the folded solid. Every piece turns to the same side,
 * so the side of the net facing up ends inside the solid. Pure and DOM-free.
 */
import { add3, cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';

/** @typedef {{ x: number, y: number }} P2 */
/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {'xung-quanh' | 'day'} Role a lateral face, or a base (mặt đáy) */
/**
 * @typedef {object} Piece
 * @property {string} id
 * @property {Role} role
 * @property {P2[]} pts corners in the flat net, counter-clockwise (y up)
 * @property {string | null} parent id of the piece it hangs off
 * @property {[P2, P2] | null} hinge the fold line, shared with the parent
 * @property {number} angle how far it turns when fully folded, in radians
 * @property {[P2, P2][]} lines unit grid lines drawn on the piece
 * @property {[P2, P2][]} [edges] the only edges to outline, for a narrow
 *   strip of a bent face whose seams should not show
 */
/** @typedef {{ id: string, role: Role, pts: P3[], lines: [P3, P3][], edges: [P3, P3][] | null }} Placed */

const RIGHT = Math.PI / 2;

/** @param {P2} p @returns {P3} */
const lift = (p) => ({ x: p.x, y: p.y, z: 0 });

/**
 * The corners of a rectangle, counter-clockwise.
 * @param {number} x0 @param {number} y0 @param {number} x1 @param {number} y1
 * @returns {P2[]}
 */
export const rect = (x0, y0, x1, y1) => [
  { x: x0, y: y0 },
  { x: x1, y: y0 },
  { x: x1, y: y1 },
  { x: x0, y: y1 },
];

/**
 * The unit grid lines inside a rectangle with whole-number corners.
 * @param {number} x0 @param {number} y0 @param {number} x1 @param {number} y1
 * @returns {[P2, P2][]}
 */
export function rectLines(x0, y0, x1, y1) {
  /** @type {[P2, P2][]} */
  const lines = [];
  for (let x = Math.ceil(x0 + 1e-9); x < x1 - 1e-9; x++) {
    lines.push([
      { x, y: y0 },
      { x, y: y1 },
    ]);
  }
  for (let y = Math.ceil(y0 + 1e-9); y < y1 - 1e-9; y++) {
    lines.push([
      { x: x0, y },
      { x: x1, y },
    ]);
  }
  return lines;
}

/**
 * Turns p about the line through o with unit direction u by `th` radians.
 * @param {P3} p @param {P3} o @param {P3} u @param {number} th
 * @returns {P3}
 */
function turn(p, o, u, th) {
  const v = sub3(p, o);
  const c = Math.cos(th);
  const s = Math.sin(th);
  return add3(o, add3(add3(mul3(v, c), mul3(cross3(u, v), s)), mul3(u, dot3(u, v) * (1 - c))));
}

/**
 * Where every piece is once the net is folded by `t` (0 flat, 1 closed).
 * @param {readonly Piece[]} pieces
 * @param {number} t
 * @returns {Placed[]}
 */
export function placePieces(pieces, t) {
  const byId = new Map(pieces.map((p) => [p.id, p]));
  /** @type {Map<string, (p: P3) => P3>} */
  const worlds = new Map();

  /** @param {Piece} piece @returns {(p: P3) => P3} */
  function worldOf(piece) {
    const known = worlds.get(piece.id);
    if (known) return known;
    /** @type {(p: P3) => P3} */
    let world = (p) => p;
    const parent = piece.parent ? byId.get(piece.parent) : undefined;
    if (parent && piece.hinge) {
      const o = lift(piece.hinge[0]);
      const d = sub3(lift(piece.hinge[1]), o);
      const len = Math.hypot(d.x, d.y);
      let u = mul3(d, 1 / len);
      // Turn the piece up (+z): its middle must go the way of u × w.
      const mid = piece.pts.reduce((s, q) => ({ x: s.x + q.x, y: s.y + q.y }), { x: 0, y: 0 });
      const w = sub3(lift({ x: mid.x / piece.pts.length, y: mid.y / piece.pts.length }), o);
      if (cross3(u, w).z < 0) u = mul3(u, -1);
      const th = t * piece.angle;
      const up = worldOf(parent);
      world = (p) => up(turn(p, o, u, th));
    }
    worlds.set(piece.id, world);
    return world;
  }

  return pieces.map((piece) => {
    const world = worldOf(piece);
    /** @param {P2} a @param {P2} b @returns {[P3, P3]} */
    const segment = (a, b) => [world(lift(a)), world(lift(b))];
    return {
      id: piece.id,
      role: piece.role,
      pts: piece.pts.map((p) => world(lift(p))),
      lines: piece.lines.map(([a, b]) => segment(a, b)),
      edges: piece.edges ? piece.edges.map(([a, b]) => segment(a, b)) : null,
    };
  });
}

/**
 * The net of a box of length a, width b and height c (a = b = c gives a
 * cube): the four lateral faces in one strip of length 2 × (a + b) and
 * height c, with the bottom base under the first face and the top base
 * over it, the net the book draws.
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @param {boolean} [grid] draw the unit squares on every face
 * @returns {Piece[]}
 */
export function boxPieces(a, b, c, grid = false) {
  const xs = [0, a, a + b, 2 * a + b, 2 * a + 2 * b];
  const ids = ['truoc', 'phai', 'sau', 'trai'];
  /**
   * @param {number} x0 @param {number} y0 @param {number} x1 @param {number} y1
   */
  const lines = (x0, y0, x1, y1) => (grid ? rectLines(x0, y0, x1, y1) : []);
  /** @type {Piece[]} */
  const pieces = [
    {
      id: 'day-duoi',
      role: 'day',
      pts: rect(0, -b, a, 0),
      parent: null,
      hinge: null,
      angle: 0,
      lines: lines(0, -b, a, 0),
    },
  ];
  ids.forEach((id, i) => {
    pieces.push({
      id,
      role: 'xung-quanh',
      pts: rect(xs[i], 0, xs[i + 1], c),
      parent: i === 0 ? 'day-duoi' : ids[i - 1],
      hinge:
        i === 0
          ? [
              { x: 0, y: 0 },
              { x: a, y: 0 },
            ]
          : [
              { x: xs[i], y: 0 },
              { x: xs[i], y: c },
            ],
      angle: RIGHT,
      lines: lines(xs[i], 0, xs[i + 1], c),
    });
  });
  pieces.push({
    id: 'day-tren',
    role: 'day',
    pts: rect(0, c, a, c + b),
    parent: 'truoc',
    hinge: [
      { x: 0, y: c },
      { x: a, y: c },
    ],
    angle: RIGHT,
    lines: lines(0, c, a, c + b),
  });
  return pieces;
}

/**
 * A circle as a polygon, counter-clockwise.
 * @param {P2} centre @param {number} r @param {number} [n]
 * @returns {P2[]}
 */
function circle(centre, r, n = 36) {
  return Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n - Math.PI / 2;
    return { x: centre.x + r * Math.cos(a), y: centre.y + r * Math.sin(a) };
  });
}

/** Strips the rolled side of a cylinder is cut into (odd, so one is in the middle). */
export const STRIPS = 25;

/**
 * The net of a cylinder of radius r and height h: a rectangle of length
 * 2 × π × r (it rolls up into the side) and two circles touching its long
 * sides, the bases. The rectangle is cut into narrow strips so it can bend.
 * Folded, the cylinder lies on its side.
 * @param {number} r
 * @param {number} h
 * @returns {Piece[]}
 */
export function cylinderPieces(r, h) {
  const n = STRIPS;
  const w = (2 * Math.PI * r) / n;
  const m = (n - 1) / 2;
  /** @type {Piece[]} */
  const pieces = [];
  for (let i = 0; i < n; i++) {
    const edge = i > m ? i * w : (i + 1) * w;
    pieces.push({
      id: `dai-${i}`,
      role: 'xung-quanh',
      pts: rect(i * w, 0, (i + 1) * w, h),
      parent: i === m ? null : `dai-${i > m ? i - 1 : i + 1}`,
      hinge:
        i === m
          ? null
          : [
              { x: edge, y: 0 },
              { x: edge, y: h },
            ],
      angle: (2 * Math.PI) / n,
      lines: [],
      edges: [
        [
          { x: i * w, y: 0 },
          { x: (i + 1) * w, y: 0 },
        ],
        [
          { x: i * w, y: h },
          { x: (i + 1) * w, y: h },
        ],
        ...(i === 0 || i === n - 1
          ? [
              /** @type {[P2, P2]} */ ([
                { x: i === 0 ? 0 : n * w, y: 0 },
                { x: i === 0 ? 0 : n * w, y: h },
              ]),
            ]
          : []),
      ],
    });
  }
  const mid = (m + 0.5) * w;
  pieces.push({
    id: 'day-duoi',
    role: 'day',
    pts: circle({ x: mid, y: -r }, r),
    parent: `dai-${m}`,
    hinge: [
      { x: m * w, y: 0 },
      { x: (m + 1) * w, y: 0 },
    ],
    angle: RIGHT,
    lines: [],
  });
  pieces.push({
    id: 'day-tren',
    role: 'day',
    pts: circle({ x: mid, y: h + r }, r),
    parent: `dai-${m}`,
    hinge: [
      { x: m * w, y: h },
      { x: (m + 1) * w, y: h },
    ],
    angle: RIGHT,
    lines: [],
  });
  return pieces;
}

/** @typedef {[number, number]} Cell a unit square by column and row (rows go down) */

/**
 * A net of unit squares folded at right angles, hinged along a spanning tree
 * found from the first cell, each square of side `size`.
 * @param {readonly Cell[]} cells
 * @param {number} [size]
 * @returns {Piece[]}
 */
export function gridPieces(cells, size = 1) {
  const key = (/** @type {Cell} */ c) => `${c[0]},${c[1]}`;
  const index = new Map(cells.map((c, i) => [key(c), i]));
  /** @type {(Piece | null)[]} */
  const pieces = cells.map(() => null);
  /** @param {number} i @param {number | null} parent @param {[P2, P2] | null} hinge */
  const make = (i, parent, hinge) => {
    const [col, row] = cells[i];
    const x0 = col * size;
    const y0 = -(row + 1) * size;
    return /** @type {Piece} */ ({
      id: `o-${i}`,
      role: 'xung-quanh',
      pts: rect(x0, y0, x0 + size, y0 + size),
      parent: parent === null ? null : `o-${parent}`,
      hinge,
      angle: parent === null ? 0 : RIGHT,
      lines: [],
    });
  };
  pieces[0] = make(0, null, null);
  const queue = [0];
  while (queue.length) {
    const i = /** @type {number} */ (queue.shift());
    const [col, row] = cells[i];
    /** @type {[number, number, P2, P2][]} */
    const around = [
      [col + 1, row, { x: col + 1, y: -row - 1 }, { x: col + 1, y: -row }],
      [col - 1, row, { x: col, y: -row - 1 }, { x: col, y: -row }],
      [col, row + 1, { x: col, y: -row - 1 }, { x: col + 1, y: -row - 1 }],
      [col, row - 1, { x: col, y: -row }, { x: col + 1, y: -row }],
    ];
    for (const [c, r, p, q] of around) {
      const j = index.get(`${c},${r}`);
      if (j === undefined || pieces[j]) continue;
      pieces[j] = make(j, i, [
        { x: p.x * size, y: p.y * size },
        { x: q.x * size, y: q.y * size },
      ]);
      queue.push(j);
    }
  }
  return /** @type {Piece[]} */ (pieces.filter(Boolean));
}

/**
 * How many squares land on a face another square already covers once the
 * squares are folded at right angles: 0 when no two squares overlap.
 * @param {readonly Cell[]} cells
 */
export function overlapsOf(cells) {
  const spots = placePieces(gridPieces(cells), 1).map((p) => {
    const c = p.pts.reduce((s, q) => add3(s, q), { x: 0, y: 0, z: 0 });
    return [c.x, c.y, c.z].map((v) => Math.round((v / p.pts.length) * 2)).join(',');
  });
  return spots.length - new Set(spots).size;
}

/**
 * Whether six connected unit squares fold into a cube: once folded, the six
 * squares sit on six different faces and none lands on another.
 * @param {readonly Cell[]} cells
 */
export function foldsToCube(cells) {
  return cells.length === 6 && gridPieces(cells).length === 6 && overlapsOf(cells) === 0;
}
