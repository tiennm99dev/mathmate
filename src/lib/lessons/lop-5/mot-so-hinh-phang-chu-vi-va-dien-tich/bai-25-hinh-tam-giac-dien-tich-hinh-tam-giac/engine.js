/**
 * The triangle board of the lesson "Hình tam giác. Diện tích hình tam giác":
 * a triangle ABC on a 1 cm grid with its base BC on one grid line. The child
 * drags vertex A (and C, to change the base) and sees the height AH, the kind
 * of triangle and the area a × h : 2. A run of challenges asks for a kind of
 * triangle, an area, or for A to slide along the line parallel to BC, where
 * the area never changes. Everything is in grid cells; the widget turns
 * cells into SVG units. Pure and DOM-free.
 */
import { TRIANGLE_NAMES, num, triangleArea, triangleKind } from '../_shared/figures.js';

/** SVG units per grid cell (1 cm). */
export const CELL = 30;
export const COLS = 14;
export const ROWS = 10;
export const W = COLS * CELL;
export const H = ROWS * CELL;
/** The grid line the base BC lies on, and the column of B. */
export const BASE_ROW = 9;
export const B_COL = 2;

/**
 * The board in grid cells: A at column `ax`, row `ay`; C at column `c` on the
 * base line.
 * @typedef {{ ax: number, ay: number, c: number }} Tri
 */

/** @type {Tri} */
export const START = { ax: 5, ay: 5, c: 8 };

/**
 * @param {number} v
 * @param {number} lo
 * @param {number} hi
 */
const clampInt = (v, lo, hi) => Math.min(hi, Math.max(lo, Math.round(v)));

/**
 * A on the grid, above the base: column 0 to 14, row 2 to 8 (height 1 to 7 cm).
 * @param {{ x: number, y: number }} p in SVG units
 */
export const snapA = (p) => ({
  x: clampInt(p.x / CELL, 0, COLS) * CELL,
  y: clampInt(p.y / CELL, 2, BASE_ROW - 1) * CELL,
});

/**
 * C on the base line: base BC from 2 to 10 cm.
 * @param {{ x: number, y: number }} p in SVG units
 */
export const snapC = (p) => ({
  x: clampInt(p.x / CELL, B_COL + 2, B_COL + 10) * CELL,
  y: BASE_ROW * CELL,
});

/** @param {Tri} t */
export const baseOf = (t) => t.c - B_COL;
/** @param {Tri} t */
export const heightOf = (t) => BASE_ROW - t.ay;
/** @param {Tri} t */
export const areaOf = (t) => triangleArea(baseOf(t), heightOf(t));

/**
 * The kind of the triangle on the board.
 * @param {Tri} t
 */
export const kindOf = (t) =>
  /** @type {import('../_shared/figures.js').TriangleKind} */ (
    triangleKind({ x: t.ax, y: t.ay }, { x: B_COL, y: BASE_ROW }, { x: t.c, y: BASE_ROW })
  );

/**
 * Where the height from A meets line BC: inside the base, at an end (a right
 * angle at B or C), or outside, on BC extended.
 * @param {Tri} t
 * @returns {'trong' | 'dau' | 'ngoai'}
 */
export function footOf(t) {
  if (t.ax === B_COL || t.ax === t.c) return 'dau';
  return t.ax > B_COL && t.ax < t.c ? 'trong' : 'ngoai';
}

/**
 * A challenge: slide A along the parallel line, make a kind of triangle, or
 * make a given area.
 * @typedef {{ id: 'ngang' } | { id: 'kind', kind: import('../_shared/figures.js').TriangleKind } | { id: 'area', area: number }} Goal
 */

/** @type {readonly Goal[]} */
export const GOALS = [
  { id: 'ngang' },
  { id: 'kind', kind: 'vuong' },
  { id: 'kind', kind: 'tu' },
  { id: 'kind', kind: 'nhon' },
  { id: 'area', area: 12 },
  { id: 'area', area: 7 },
  { id: 'area', area: 15 },
];

/** How many places A must visit on one parallel line. */
export const SLIDES = 3;

/**
 * What the challenge asks, as a sentence.
 * @param {Goal} goal
 */
export function goalText(goal) {
  if (goal.id === 'ngang') {
    return `Em kéo A sang ngang, giữ A trên đường kẻ đứt, đặt A ở ${SLIDES} chỗ khác nhau. Diện tích có đổi không?`;
  }
  if (goal.id === 'kind') return `Em kéo đỉnh A để được ${TRIANGLE_NAMES[goal.kind]}.`;
  return `Em kéo A và C để được tam giác có diện tích ${goal.area} cm².`;
}

/** @type {Readonly<Record<import('../_shared/figures.js').TriangleKind, string>>} */
const KIND_WHY = {
  nhon: 'ba góc đều là góc nhọn',
  vuong: 'có một góc vuông',
  tu: 'có một góc tù',
};

/** @type {Readonly<Record<import('../_shared/figures.js').TriangleKind, string>>} */
const KIND_TIP = {
  vuong: 'Thử đặt A thẳng phía trên B hoặc thẳng phía trên C.',
  tu: 'Thử kéo A ra xa, lệch hẳn ra ngoài đáy BC.',
  nhon: 'Thử đặt A cao, ở khoảng giữa đáy BC.',
};

/**
 * The kind of the triangle with its reason: 'tam giác tù: có một góc tù'.
 * @param {Tri} t
 */
export function kindText(t) {
  const kind = kindOf(t);
  return `Đây là ${TRIANGLE_NAMES[kind]}, vì ${KIND_WHY[kind]}.`;
}

/**
 * The live line for a challenge.
 * @param {Goal} goal
 * @param {Tri} t
 * @param {number} tried places A visited on the current parallel line
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function goalNote(goal, t, tried) {
  const s = num(areaOf(t));
  const h = heightOf(t);
  if (goal.id === 'ngang') {
    if (tried >= SLIDES) {
      return {
        tone: 'ok',
        text: `Đúng rồi! A chạy trên đường song song với BC nên chiều cao luôn là ${h} cm. Đáy không đổi, chiều cao không đổi: diện tích luôn là ${s} cm².`,
      };
    }
    return {
      tone: 'info',
      text: `Em đã đặt A ở ${tried} chỗ trên đường kẻ đứt. Diện tích: ${s} cm². Kéo A sang ngang tiếp nhé.`,
    };
  }
  if (goal.id === 'kind') {
    const kind = kindOf(t);
    if (kind === goal.kind) return { tone: 'ok', text: `Đúng rồi! ${kindText(t)}` };
    return {
      tone: 'info',
      text: `Bây giờ là ${TRIANGLE_NAMES[kind]}. ${KIND_TIP[goal.kind]}`,
    };
  }
  if (areaOf(t) === goal.area) {
    return {
      tone: 'ok',
      text: `Đúng rồi! Đáy ${baseOf(t)} cm, chiều cao ${h} cm: ${baseOf(t)} × ${h} : 2 = ${goal.area} (cm²).`,
    };
  }
  return {
    tone: areaOf(t) > goal.area ? 'warn' : 'info',
    text: `Diện tích đang là ${s} cm². Muốn có ${goal.area} cm² thì đáy nhân chiều cao phải bằng ${goal.area * 2}.`,
  };
}

/**
 * The places A visited on one parallel line, kept while the height and the
 * base stay the same and started again when either changes.
 * @param {{ key: string, cols: number[] }} trail
 * @param {Tri} t
 */
export function nextTrail(trail, t) {
  const key = `${t.ay},${t.c}`;
  if (key !== trail.key) return { key, cols: [t.ax] };
  return trail.cols.includes(t.ax) ? trail : { key, cols: [...trail.cols, t.ax] };
}

/**
 * What the board is read as.
 * @param {Tri} t
 */
export function boardLabel(t) {
  const foot = footOf(t);
  const where =
    foot === 'trong'
      ? 'Chân đường cao H nằm trên đáy BC.'
      : foot === 'dau'
        ? `Đường cao AH trùng với cạnh ${t.ax === B_COL ? 'AB' : 'AC'}.`
        : 'Chân đường cao H nằm trên phần kéo dài của đáy BC.';
  return `Tam giác ABC trên lưới ô vuông 1 cm. Đáy BC dài ${baseOf(t)} cm, chiều cao AH ${heightOf(t)} cm. ${where} ${kindText(t)}`;
}
