/**
 * Logic of the virtual clinometer: two surveying tasks solved with the law of
 * sines, from readings rounded to the whole degree as a school clinometer
 * gives them.
 *
 * - Tower: from A, then from B a distance d closer, the top C is seen at
 *   angles α < β above the ground. In triangle ABC the angle at C is β − α,
 *   so BC = d·sin α / sin(β − α) and the height is h = BC·sin β.
 * - River: from A and B on this bank, d apart, the tree C on the far bank
 *   makes angles CAB and CBA; then AC = d·sin B / sin(A + B).
 */
import { readNumber } from '#lib/core/decimal.js';
import { formatFixed, formatNumber } from '#lib/core/number-format.js';
import { sinDeg } from '../_shared/trig.js';

/** The tower's real height, in metres. */
export const TOWER_HEIGHT = 45;

/** The tree on the far bank, in metres from the left end of this bank. */
export const TREE = { x: 45, y: 40 };

/** @param {number} rad */
const deg = (rad) => (rad * 180) / Math.PI;

/**
 * The readings of the tower task, with A and B at `far` and `near` metres
 * from the foot of the tower.
 * @param {number} far @param {number} near
 */
export function towerReadings(far, near) {
  return {
    d: far - near,
    alpha: Math.round(deg(Math.atan2(TOWER_HEIGHT, far))),
    beta: Math.round(deg(Math.atan2(TOWER_HEIGHT, near))),
  };
}

/**
 * The height worked out from the readings.
 * @param {{ d: number, alpha: number, beta: number }} r
 */
export function towerHeight(r) {
  return (r.d * sinDeg(r.alpha) * sinDeg(r.beta)) / sinDeg(r.beta - r.alpha);
}

/**
 * The readings of the river task, with A and B at `xa` < `xb` metres along
 * this bank.
 * @param {number} xa @param {number} xb
 */
export function riverReadings(xa, xb) {
  return {
    d: xb - xa,
    angA: Math.round(deg(Math.atan2(TREE.y, TREE.x - xa))),
    angB: Math.round(deg(Math.atan2(TREE.y, xb - TREE.x))),
  };
}

/**
 * AC worked out from the readings.
 * @param {{ d: number, angA: number, angB: number }} r
 */
export function riverDistance(r) {
  return (r.d * sinDeg(r.angB)) / sinDeg(r.angA + r.angB);
}

/** The real distance from A to the tree. @param {number} xa */
export const realDistance = (xa) => Math.hypot(TREE.x - xa, TREE.y);

/**
 * The verdict on a typed answer to one decimal.
 * @param {string} typed
 * @param {number} expected the value from the readings
 * @param {number} real the true value
 * @param {string} name what was asked, such as 'chiều cao h'
 * @param {string} method how to get it, as rich text
 * @returns {{ tone: 'ok' | 'warn', text: string }}
 */
export function judge(typed, expected, real, name, method) {
  const v = readNumber(typed);
  if (v === null)
    return {
      tone: 'warn',
      text: 'Hãy nhập một số, dùng dấu phẩy cho phần thập phân (ví dụ 44,8).',
    };
  if (Math.abs(v - expected) <= 0.1 + 1e-9) {
    const gap = Math.abs(expected - real);
    return {
      tone: 'ok',
      text: `Đúng! Từ số đo, ${name} ≈ ${formatFixed(expected, 1)} m. Giá trị thật là ${formatNumber(real, 1)} m, lệch ${formatFixed(gap, 1)} m vì giác kế chỉ đọc góc đến độ.`,
    };
  }
  return { tone: 'warn', text: `Chưa đúng. ${method}` };
}
