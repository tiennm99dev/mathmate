import { P, direction, lineAngle } from '../_shared/space.js';

/**
 * A flagpole d standing at the point O of a flat yard (P). Two lines a and b
 * of the yard pass through O, b turned by `beta` from a, and a third line c
 * of the yard checks the result. The learner tilts the pole and turns b: the
 * pole is perpendicular to the yard only when it is perpendicular to two
 * lines of the yard that cut each other, and then to every line of the yard.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

/** The direction of the check line c in the yard, from a. */
export const C_TURN = 125;

/**
 * The pole's direction: tilted `tilt` degrees from upright, towards the
 * direction `turn` degrees from a.
 * @param {number} tilt @param {number} turn
 */
export const poleDir = (tilt, turn) => direction(turn, 90 - tilt);

/**
 * The direction of a line of the yard turned `deg` from a.
 * @param {number} deg
 * @returns {P3}
 */
export const yardDir = (deg) =>
  P(Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180), 0);

/** @param {number} deg */
const isRight = (deg) => Math.abs(deg - 90) < 0.5;

/**
 * The angles the pole makes with a, b and c, and what can be concluded.
 * @param {number} tilt @param {number} turn @param {number} beta
 */
export function check(tilt, turn, beta) {
  const d = poleDir(tilt, turn);
  const angles = {
    a: lineAngle(d, yardDir(0)),
    b: lineAngle(d, yardDir(beta)),
    c: lineAngle(d, yardDir(C_TURN)),
  };
  const same = beta % 180 === 0;
  const both = isRight(angles.a) && isRight(angles.b);
  /** @type {'vuong-goc' | 'chua-du' | 'chua'} */
  const status = both ? (same ? 'chua-du' : 'vuong-goc') : 'chua';
  return { angles, same, both, upright: tilt === 0, status, cRight: isRight(angles.c) };
}

/**
 * The sentence under the yard: what the angles show.
 * @param {ReturnType<typeof check>} r
 */
export function verdict(r) {
  const c = `$(d, c) = ${texDeg(r.angles.c)}$`;
  if (r.status === 'vuong-goc') {
    return `$d \\perp a$, $d \\perp b$ và $a$, $b$ là hai đường thẳng cắt nhau tại $O$ nằm trong $(P)$, nên $d \\perp (P)$. Kiểm tra: đường thẳng $c$ bất kì của sân cũng vuông góc với $d$: ${c}.`;
  }
  if (r.status === 'chua-du') {
    return r.upright
      ? `Cột cờ đang dựng thẳng, nhưng $a$ và $b$ trùng nhau nên chỉ biết $d$ vuông góc với một đường thẳng của sân. Muốn kết luận $d \\perp (P)$ cần hai đường thẳng cắt nhau: hãy xoay $b$.`
      : `$d \\perp a$ và $d \\perp b$, nhưng $a$, $b$ trùng nhau nên chưa đủ: cột cờ vẫn nghiêng, ${c}. Cần hai đường thẳng cắt nhau.`;
  }
  const off = /** @type {const} */ (['a', 'b'])
    .filter((k) => !isRight(r.angles[k]))
    .map((k) => `$${k}$`)
    .join(' và ');
  return `$d$ chưa vuông góc với ${off}, nên chưa vuông góc với sân.`;
}

/** @param {number} deg */
export function texDeg(deg) {
  return `${Math.round(deg)}^\\circ`;
}
