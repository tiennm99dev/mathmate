/**
 * Objects built from unit cubes, and the drawings of technical drawing made
 * from them: the three orthographic views of the first-angle method (hình
 * chiếu đứng, bằng, cạnh) with visible and hidden lines, the faces of a
 * parallel (axonometric) view, and the axis angles and distortion
 * coefficients of such a view.
 *
 * Model space: x runs left to right (chiều dài), y from front to back (chiều
 * rộng), z upwards (chiều cao); a cell (x, y, z) is the unit cube
 * [x, x + 1] × [y, y + 1] × [z, z + 1].
 */

import { viewPoint } from '#lib/geom-engine/solid.js';

/**
 * @typedef {object} Solid
 * @property {number} nx length in cells
 * @property {number} ny width in cells
 * @property {number} nz height in cells
 * @property {Uint8Array} cells 1 where a cube is, indexed by `index`
 */

/**
 * @typedef {['+' | '-', [number, number, number], [number, number, number]]} BoxOp
 * A box [x0, x1) × [y0, y1) × [z0, z1) added or cut away.
 */

/** @param {Solid} s @param {number} x @param {number} y @param {number} z */
const index = (s, x, y, z) => (z * s.ny + y) * s.nx + x;

/**
 * True when cell (x, y, z) holds a cube; cells outside the bounding box are
 * empty.
 * @param {Solid} s
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export function has(s, x, y, z) {
  if (x < 0 || y < 0 || z < 0 || x >= s.nx || y >= s.ny || z >= s.nz) return false;
  return s.cells[index(s, x, y, z)] === 1;
}

/**
 * A solid of size nx × ny × nz made by adding and cutting boxes in order.
 * @param {[number, number, number]} size
 * @param {BoxOp[]} ops
 * @returns {Solid}
 */
export function makeSolid([nx, ny, nz], ops) {
  const s = { nx, ny, nz, cells: new Uint8Array(nx * ny * nz) };
  for (const [sign, [x0, y0, z0], [x1, y1, z1]] of ops) {
    for (let z = z0; z < z1; z++)
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) s.cells[index(s, x, y, z)] = sign === '+' ? 1 : 0;
  }
  return s;
}

/** @param {Solid} s */
export function volume(s) {
  return s.cells.reduce((sum, c) => sum + c, 0);
}

/**
 * The solid turned a quarter turn about the vertical axis, anticlockwise
 * seen from above: the right side comes to the front.
 * @param {Solid} s
 * @returns {Solid}
 */
export function turnQuarter(s) {
  const t = { nx: s.ny, ny: s.nx, nz: s.nz, cells: new Uint8Array(s.cells.length) };
  for (let z = 0; z < s.nz; z++)
    for (let y = 0; y < s.ny; y++)
      for (let x = 0; x < s.nx; x++) if (has(s, x, y, z)) t.cells[index(t, s.ny - 1 - y, x, z)] = 1;
  return t;
}

/** True when two solids hold the same cubes. @param {Solid} a @param {Solid} b */
export function sameSolid(a, b) {
  return (
    a.nx === b.nx && a.ny === b.ny && a.nz === b.nz && a.cells.every((c, i) => c === b.cells[i])
  );
}

/** @typedef {'front' | 'top' | 'side'} ViewKind */

/** The three views and their names in the book. */
export const VIEW_NAMES = /** @type {Record<ViewKind, string>} */ ({
  front: 'Hình chiếu đứng',
  top: 'Hình chiếu bằng',
  side: 'Hình chiếu cạnh',
});

/**
 * One line of a view in view units: u to the right, v upwards.
 * @typedef {{ u1: number, v1: number, u2: number, v2: number, hidden: boolean }} Line
 */

/**
 * How a view reads the solid: its width A and height B in cells, its depth D
 * (cells along the direction of projection), and the cell seen at column a,
 * depth d (0 nearest the viewer) and row b (0 at the bottom of the view).
 * - front: looking from the front towards the back; u = x, v = z.
 * - top: looking down; u = x, v = y, so the back of the object lies next to
 *   the front view above it and the front at the bottom.
 * - side: looking from the left towards the right; v = z and the front of
 *   the object on the right, as the view placed right of the front view.
 * @param {Solid} s
 * @param {ViewKind} kind
 * @returns {{ A: number, B: number, D: number, cell: (a: number, d: number, b: number) => boolean }}
 */
function frame(s, kind) {
  if (kind === 'front') return { A: s.nx, B: s.nz, D: s.ny, cell: (a, d, b) => has(s, a, d, b) };
  if (kind === 'top')
    return { A: s.nx, B: s.ny, D: s.nz, cell: (a, d, b) => has(s, a, b, s.nz - 1 - d) };
  return { A: s.ny, B: s.nz, D: s.nx, cell: (a, d, b) => has(s, d, s.ny - 1 - a, b) };
}

/**
 * Whether the 3D line between four cells is an edge of the solid: the cells
 * around it, in the 2 × 2 pattern [near, far] × [one side, other side], do
 * not form a single flat face or nothing at all.
 * @param {boolean} p near, one side
 * @param {boolean} q near, other side
 * @param {boolean} r far, one side
 * @param {boolean} t far, other side
 */
function isEdge(p, q, r, t) {
  const count = +p + +q + +r + +t;
  if (count % 2 === 1) return true;
  return count === 2 && ((p && t) || (q && r));
}

/**
 * The lines of one orthographic view: every edge of the solid projects onto
 * a unit segment of the view grid; a segment is drawn as a visible line
 * (nét liền đậm) when one of its edges can be seen, as a hidden line (nét
 * đứt) when all its edges are hidden, and collinear segments of the same kind
 * are joined.
 * @param {Solid} s
 * @param {ViewKind} kind
 * @returns {{ width: number, height: number, lines: Line[] }}
 */
export function orthoView(s, kind) {
  const { A, B, D, cell } = frame(s, kind);
  /**
   * True when the ray on one side meets no cube before depth j.
   * @param {(d: number) => boolean} open
   * @param {number} j
   */
  const clearTo = (open, j) => {
    for (let d = 0; d < j; d++) if (open(d)) return false;
    return true;
  };
  /**
   * Kind of a unit segment: 0 none, 1 hidden, 2 visible.
   * @param {(d: number, side: 0 | 1) => boolean} at cell at depth d on side 0 or 1
   */
  const segment = (at) => {
    let kindOf = 0;
    for (let j = 0; j <= D; j++) {
      if (!isEdge(at(j - 1, 0), at(j - 1, 1), at(j, 0), at(j, 1))) continue;
      const seen = clearTo((d) => at(d, 0), j) || clearTo((d) => at(d, 1), j);
      kindOf = Math.max(kindOf, seen ? 2 : 1);
      if (kindOf === 2) break;
    }
    return kindOf;
  };

  /** @type {Line[]} */
  const lines = [];
  /**
   * Joins runs of equal unit segments along one grid line.
   * @param {number[]} kinds
   * @param {(from: number, to: number, hidden: boolean) => void} push
   */
  const runs = (kinds, push) => {
    let start = 0;
    for (let i = 1; i <= kinds.length; i++) {
      if (i < kinds.length && kinds[i] === kinds[start]) continue;
      if (kinds[start] > 0) push(start, i, kinds[start] === 1);
      start = i;
    }
  };
  for (let k = 0; k <= B; k++) {
    const kinds = Array.from({ length: A }, (_, i) =>
      segment((d, side) => cell(i, d, k - 1 + side)),
    );
    runs(kinds, (from, to, hidden) => lines.push({ u1: from, v1: k, u2: to, v2: k, hidden }));
  }
  for (let k = 0; k <= A; k++) {
    const kinds = Array.from({ length: B }, (_, i) =>
      segment((d, side) => cell(k - 1 + side, d, i)),
    );
    runs(kinds, (from, to, hidden) => lines.push({ u1: k, v1: from, u2: k, v2: to, hidden }));
  }
  return { width: A, height: B, lines };
}

/** @typedef {{ x: number, y: number, z: number }} P3 */

/**
 * The six faces of a unit cube, each with its outward normal and its corners
 * counter-clockwise seen from outside.
 * @type {{ n: P3, tone: 'top' | 'front' | 'left' | 'other', c: [number, number, number][] }[]}
 */
const CUBE_FACES = [
  {
    n: { x: 0, y: 0, z: 1 },
    tone: 'top',
    c: [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
  },
  {
    n: { x: 0, y: 0, z: -1 },
    tone: 'other',
    c: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
  },
  {
    n: { x: 0, y: -1, z: 0 },
    tone: 'front',
    c: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
  },
  {
    n: { x: 0, y: 1, z: 0 },
    tone: 'other',
    c: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
    ],
  },
  {
    n: { x: -1, y: 0, z: 0 },
    tone: 'left',
    c: [
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
    ],
  },
  {
    n: { x: 1, y: 0, z: 0 },
    tone: 'other',
    c: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
];

/**
 * The direction towards the viewer of an orthographic view, in model space.
 * @param {import('#lib/geom-engine/solid.js').View} view
 * @returns {P3}
 */
export function towardsViewer(view) {
  const a = (view.yaw * Math.PI) / 180;
  const b = (view.pitch * Math.PI) / 180;
  return { x: -Math.sin(a) * Math.cos(b), y: -Math.cos(a) * Math.cos(b), z: Math.sin(b) };
}

/**
 * The faces of the solid that can show in a view, far to near: the faces of
 * cubes not glued to a neighbour and turned towards the viewer, cube by cube
 * from the farthest, so drawing them in order hides what lies behind. Each
 * face comes as screen points (y down, unit = one cell, origin at the
 * solid's centre) and the tone of the face it lies in.
 * @param {Solid} s
 * @param {import('#lib/geom-engine/solid.js').View} view
 */
export function solidFaces(s, view) {
  const w = towardsViewer(view);
  const centre = { x: s.nx / 2, y: s.ny / 2, z: s.nz / 2 };
  /** @type {{ depth: number, x: number, y: number, z: number }[]} */
  const cubes = [];
  for (let z = 0; z < s.nz; z++)
    for (let y = 0; y < s.ny; y++)
      for (let x = 0; x < s.nx; x++)
        if (has(s, x, y, z))
          cubes.push({ x, y, z, depth: (x + 0.5) * w.x + (y + 0.5) * w.y + (z + 0.5) * w.z });
  cubes.sort((p, q) => p.depth - q.depth);
  /** @type {{ pts: { x: number, y: number }[], tone: string }[]} */
  const out = [];
  for (const c of cubes) {
    for (const f of CUBE_FACES) {
      if (f.n.x * w.x + f.n.y * w.y + f.n.z * w.z <= 1e-9) continue;
      if (has(s, c.x + f.n.x, c.y + f.n.y, c.z + f.n.z)) continue;
      const pts = f.c.map(([dx, dy, dz]) => {
        const v = viewPoint(
          { x: c.x + dx - centre.x, y: c.y + dy - centre.y, z: c.z + dz - centre.z },
          view,
        );
        return { x: v.x, y: v.y };
      });
      out.push({ pts, tone: f.tone });
    }
  }
  return out;
}

/** The view of the orthographic isometric projection (hình chiếu trục đo vuông góc đều), seen from the front, left and above. */
export const ISOMETRIC = { yaw: 45, pitch: (Math.atan(1 / Math.SQRT2) * 180) / Math.PI };

/**
 * The axis angles and distortion coefficients of an orthographic view of the
 * axes Ox, Oy, Oz: p, q, r are the lengths of the images of unit segments on
 * Ox, Oy, Oz, and the angles x'O'y', y'O'z', z'O'x' are in degrees (null when
 * an axis projects to a point). As in a corner of a box seen from outside,
 * each axis is taken in the direction towards the viewer, so the axes look
 * like the book's figures (z' upwards when seen from above) and the three
 * angles add up to 360°. `images` holds the
 * screen images (y down) of the unit segments on the three axes.
 * @param {import('#lib/geom-engine/solid.js').View} view
 */
export function axisInfo(view) {
  const w = towardsViewer(view);
  /** @param {number} c */
  const toward = (c) => (c < -1e-9 ? -1 : 1);
  const o = viewPoint({ x: 0, y: 0, z: 0 }, view);
  const img = [
    { x: toward(w.x), y: 0, z: 0 },
    { x: 0, y: toward(w.y), z: 0 },
    { x: 0, y: 0, z: toward(w.z) },
  ].map((p) => {
    const v = viewPoint(p, view);
    return { x: v.x - o.x, y: v.y - o.y };
  });
  const len = img.map((v) => Math.hypot(v.x, v.y));
  /** @param {number} i @param {number} j */
  const angle = (i, j) => {
    if (len[i] < 1e-6 || len[j] < 1e-6) return null;
    const c = (img[i].x * img[j].x + img[i].y * img[j].y) / (len[i] * len[j]);
    return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
  };
  return {
    p: len[0],
    q: len[1],
    r: len[2],
    xy: angle(0, 1),
    yz: angle(1, 2),
    zx: angle(2, 0),
    images: img,
  };
}

/** The objects of this chapter's widgets, built from unit cubes. */
export const OBJECTS = {
  /** Khối chữ L: a plate with an upright at the left. */
  chuL: makeSolid(
    [4, 3, 3],
    [
      ['+', [0, 0, 0], [4, 3, 1]],
      ['+', [0, 0, 1], [1, 3, 3]],
    ],
  ),
  /** Bậc thang: three steps rising to the left. */
  bacThang: makeSolid(
    [3, 2, 3],
    [
      ['+', [0, 0, 0], [3, 2, 1]],
      ['+', [0, 0, 1], [2, 2, 2]],
      ['+', [0, 0, 2], [1, 2, 3]],
    ],
  ),
  /** Giá chữ U: a 5 × 3 × 4 block with a 3 × 3 × 2 channel cut from the top. */
  giaChuU: makeSolid(
    [5, 3, 4],
    [
      ['+', [0, 0, 0], [5, 3, 4]],
      ['-', [1, 0, 2], [4, 3, 4]],
    ],
  ),
  /** Khối có rãnh sau: a block with a slot cut into its back face. */
  ranhSau: makeSolid(
    [4, 3, 2],
    [
      ['+', [0, 0, 0], [4, 3, 2]],
      ['-', [1, 2, 0], [3, 3, 2]],
    ],
  ),
};
