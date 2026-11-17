/**
 * The trapezoid board of the lesson "Hình thang. Diện tích hình thang": a
 * trapezoid ABCD on a 1 cm grid as the book draws it, the long base DC on one
 * grid line and the short base AB above it. The child drags A, B and C to change the two
 * bases, the height and the slant, and can join a second, equal trapezoid
 * (turned half a turn about the midpoint of BC) to make a parallelogram with
 * base a + b and the same height: half of it is the trapezoid, so its area is
 * (a + b) × h : 2. Everything is in grid cells. Pure and DOM-free.
 */
import { num, trapezoidArea } from '../_shared/figures.js';

/** SVG units per grid cell (1 cm). */
export const CELL = 24;
export const COLS = 18;
export const ROWS = 11;
export const W = COLS * CELL;
export const H = ROWS * CELL;
/** The grid line of the long base, and the column of D. */
export const BASE_ROW = 10;
export const D_COL = 1;

/**
 * The trapezoid in cells: long base `a`, short base `b`, height `h`, and how
 * far A sits right of D (`dx`; 0 makes AD perpendicular to the bases).
 * @typedef {{ a: number, b: number, h: number, dx: number }} Trap
 */

/** @typedef {{ x: number, y: number }} Pt */

/** @type {Trap} */
export const START = { a: 8, b: 4, h: 4, dx: 2 };

/**
 * @param {number} v
 * @param {number} lo
 * @param {number} hi
 */
const clampInt = (v, lo, hi) => Math.min(hi, Math.max(lo, Math.round(v)));

/**
 * A trapezoid kept on the board with room for the joined copy: long base 3 to
 * 8 cm, short base 1 cm up to one less than the long one, height 1 to 7 cm.
 * @param {Trap} t
 * @returns {Trap}
 */
export function normalize(t) {
  const a = clampInt(t.a, 3, 8);
  const b = clampInt(t.b, 1, a - 1);
  const h = clampInt(t.h, 1, 7);
  const dx = clampInt(t.dx, -1, COLS - 2 - D_COL - a - b);
  return { a, b, h, dx };
}

/**
 * The four corners in cells: A, B on the short base, C, D on the long one.
 * @param {Trap} t
 * @returns {{ A: Pt, B: Pt, C: Pt, D: Pt }}
 */
export function cornersOf(t) {
  const top = BASE_ROW - t.h;
  return {
    A: { x: D_COL + t.dx, y: top },
    B: { x: D_COL + t.dx + t.b, y: top },
    C: { x: D_COL + t.a, y: BASE_ROW },
    D: { x: D_COL, y: BASE_ROW },
  };
}

/**
 * The trapezoid after a corner is dragged to a grid point (in cells).
 * @param {Trap} t
 * @param {'A' | 'B' | 'C'} corner
 * @param {Pt} p
 */
export function dragTo(t, corner, p) {
  if (corner === 'C') return normalize({ ...t, a: p.x - D_COL });
  if (corner === 'B') return normalize({ ...t, b: p.x - D_COL - t.dx });
  return normalize({ ...t, dx: p.x - D_COL, h: BASE_ROW - p.y });
}

/**
 * The second trapezoid, turned half a turn about the midpoint of BC: its
 * corners A′ and D′ (B′ = C, C′ = B). With the first one it makes
 * the parallelogram D A′ D′ A, whose base DA′ is a + b.
 * @param {Trap} t
 */
export function copyOf(t) {
  const { A, B, C, D } = cornersOf(t);
  /** @param {Pt} P */
  const turn = (P) => ({ x: B.x + C.x - P.x, y: B.y + C.y - P.y });
  return { A: turn(A), B: C, C: B, D: turn(D) };
}

/**
 * Whether one leg is perpendicular to the bases: a right trapezoid.
 * @param {Trap} t
 */
export const isRight = (t) => t.dx === 0 || t.dx + t.b === t.a;

/** @param {Trap} t */
export const areaOf = (t) => trapezoidArea(t.a, t.b, t.h);

/**
 * A challenge: join the two trapezoids, make a right trapezoid, or make an area.
 * @typedef {{ id: 'ghep' } | { id: 'vuong' } | { id: 'area', area: number }} Goal
 */

/** @type {readonly Goal[]} */
export const GOALS = [
  { id: 'ghep' },
  { id: 'vuong' },
  { id: 'area', area: 18 },
  { id: 'area', area: 15 },
  { id: 'area', area: 10 },
];

/**
 * What the challenge asks.
 * @param {Goal} goal
 */
export function goalText(goal) {
  if (goal.id === 'ghep') {
    return 'Em bấm "Ghép thêm một hình thang" để ghép hai hình thang giống nhau thành một hình mới.';
  }
  if (goal.id === 'vuong') return 'Em kéo A hoặc B để được hình thang vuông.';
  return `Em kéo A, B, C để được hình thang có diện tích ${goal.area} cm².`;
}

/**
 * The live line for a challenge.
 * @param {Goal} goal
 * @param {Trap} t
 * @param {boolean} joined whether the copy is in place
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function goalNote(goal, t, joined) {
  if (goal.id === 'ghep') {
    if (joined) {
      return {
        tone: 'ok',
        text: `Đúng rồi! Hai hình thang ghép thành hình bình hành có đáy ${t.a} + ${t.b} = ${t.a + t.b} (cm) và chiều cao ${t.h} cm. Mỗi hình thang bằng một nửa hình bình hành.`,
      };
    }
    return { tone: 'info', text: 'Hình thứ hai giống hệt hình thang ABCD, chỉ xoay ngược lại.' };
  }
  if (goal.id === 'vuong') {
    if (isRight(t)) {
      const leg = t.dx === 0 ? 'AD' : 'BC';
      return {
        tone: 'ok',
        text: `Đúng rồi! Cạnh bên ${leg} vuông góc với hai đáy: đây là hình thang vuông. ${leg} cũng là chiều cao.`,
      };
    }
    return {
      tone: 'info',
      text: 'Hình thang vuông có một cạnh bên vuông góc với hai đáy. Thử đặt A thẳng phía trên D.',
    };
  }
  const s = areaOf(t);
  if (s === goal.area) {
    return {
      tone: 'ok',
      text: `Đúng rồi! (${t.a} + ${t.b}) × ${t.h} : 2 = ${goal.area} (cm²).`,
    };
  }
  return {
    tone: s > goal.area ? 'warn' : 'info',
    text: `Diện tích đang là ${num(s)} cm². Muốn có ${goal.area} cm² thì tổng hai đáy nhân chiều cao phải bằng ${goal.area * 2}.`,
  };
}

/**
 * What the board is read as.
 * @param {Trap} t
 * @param {boolean} joined
 */
export function boardLabel(t, joined) {
  const kind = isRight(t) ? 'Hình thang vuông' : 'Hình thang';
  const copy = joined
    ? ` Ghép thêm một hình thang như thế thành hình bình hành có đáy ${t.a + t.b} cm, chiều cao ${t.h} cm.`
    : '';
  return `${kind} ABCD trên lưới ô vuông 1 cm: đáy lớn DC ${t.a} cm, đáy bé AB ${t.b} cm, chiều cao ${t.h} cm.${copy}`;
}
