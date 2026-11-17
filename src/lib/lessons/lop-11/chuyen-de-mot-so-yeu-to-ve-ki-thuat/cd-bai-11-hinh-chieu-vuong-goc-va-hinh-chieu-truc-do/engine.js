/**
 * Logic of the projection bench: the views the learner can snap to, which
 * view the current direction of sight matches, the axis angles and
 * distortion coefficients written in TeX, and the feedback line.
 */

import { formatNumber, numTex } from '#lib/core/number-format.js';
import { ISOMETRIC, axisInfo } from '../_shared/voxel.js';

/** @typedef {import('#lib/geom-engine/solid.js').View} View */
/** @typedef {'front' | 'top' | 'side' | 'iso'} Snap */

/** The directions of sight the buttons snap to. */
export const SNAPS = /** @type {Record<Snap, View>} */ ({
  front: { yaw: 0, pitch: 0 },
  top: { yaw: 0, pitch: 90 },
  side: { yaw: 90, pitch: 0 },
  iso: ISOMETRIC,
});

/** The snaps in the order of their buttons. */
export const SNAP_KEYS = /** @type {Snap[]} */ (['front', 'top', 'side', 'iso']);

/** Button labels of the snaps. */
export const SNAP_LABELS = /** @type {Record<Snap, string>} */ ({
  front: 'Nhìn từ trước',
  top: 'Nhìn từ trên',
  side: 'Nhìn từ trái',
  iso: 'Trục đo vuông góc đều',
});

/** The tilt range of the turning view: from level to straight down. */
export const TURN = { minPitch: 0, maxPitch: 90, yawRate: 0.6 };

/**
 * The snap the view matches within half a degree, or ''. Looking straight
 * down matches the top view only when the front of the object is at the
 * bottom, as the top view is drawn.
 * @param {View} view
 * @returns {Snap | ''}
 */
export function matchedSnap(view) {
  const near = (/** @type {number} */ a, /** @type {number} */ b) => Math.abs(a - b) < 0.5;
  for (const [key, v] of Object.entries(SNAPS))
    if (near(view.yaw, v.yaw) && near(view.pitch, v.pitch)) return /** @type {Snap} */ (key);
  return '';
}

/** @param {number | null} deg */
const angleTex = (deg) => (deg === null ? '\\text{—}' : `${numTex(Math.round(deg))}^\\circ`);

/**
 * The distortion coefficients and the axis angles of the view, as two lines
 * of TeX.
 * @param {View} view
 */
export function axisTex(view) {
  const a = axisInfo(view);
  const c = (/** @type {number} */ v) => numTex(v, 2);
  return {
    coefficients: `p \\approx ${c(a.p)},\\quad q \\approx ${c(a.q)},\\quad r \\approx ${c(a.r)}`,
    angles:
      `\\widehat{x'O'y'} = ${angleTex(a.xy)},\\ \\widehat{y'O'z'} = ${angleTex(a.yz)},\\ ` +
      `\\widehat{z'O'x'} = ${angleTex(a.zx)}`,
  };
}

/**
 * The same facts read aloud.
 * @param {View} view
 */
export function axisWords(view) {
  const a = axisInfo(view);
  const n = (/** @type {number} */ v) => formatNumber(v, 2);
  const g = (/** @type {number | null} */ v) =>
    v === null ? 'không xác định' : `${Math.round(v)} độ`;
  return `Hệ số biến dạng p khoảng ${n(a.p)}, q khoảng ${n(a.q)}, r khoảng ${n(a.r)}. Góc x'O'y' ${g(a.xy)}, góc y'O'z' ${g(a.yz)}, góc z'O'x' ${g(a.zx)}.`;
}

const AXES = ['Ox', 'Oy', 'Oz'];

/**
 * The feedback line under the bench.
 * @param {View} view
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function viewNote(view) {
  const snap = matchedSnap(view);
  if (snap === 'front')
    return {
      tone: 'ok',
      text: 'Hướng nhìn từ trước ra sau là hướng chiếu đứng: hình em thấy chính là hình chiếu đứng (khung tô màu). Trục $Oy$ vuông góc với mặt phẳng chiếu nên chiếu thành một điểm, chiều rộng của vật không còn thấy được.',
    };
  if (snap === 'top')
    return {
      tone: 'ok',
      text: 'Hướng nhìn từ trên xuống là hướng chiếu bằng: hình em thấy chính là hình chiếu bằng, đặt dưới hình chiếu đứng. Trục $Oz$ chiếu thành một điểm nên chiều cao bị mất.',
    };
  if (snap === 'side')
    return {
      tone: 'ok',
      text: 'Hướng nhìn từ trái sang phải là hướng chiếu cạnh: hình em thấy chính là hình chiếu cạnh, đặt bên phải hình chiếu đứng. Trục $Ox$ chiếu thành một điểm nên chiều dài bị mất.',
    };
  if (snap === 'iso')
    return {
      tone: 'ok',
      text: 'Ba trục tạo với mặt phẳng chiếu các góc bằng nhau: ba góc trục đo đều bằng $120^\\circ$ và $p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$. Đây là hình chiếu trục đo vuông góc đều; khi vẽ, người ta lấy $p = q = r = 1$.',
    };
  const a = axisInfo(view);
  const flat = [a.p, a.q, a.r].findIndex((v) => v < 0.1);
  if (flat >= 0)
    return {
      tone: 'warn',
      text: `Phương nhìn gần song song với trục $${AXES[flat]}$: trục này gần như chiếu thành một điểm, hình nhận được gần với một hình chiếu vuông góc và khó hình dung vật thể. Hình chiếu trục đo chọn phương chiếu không song song với trục toạ độ nào.`,
    };
  return {
    tone: 'info',
    text: 'Phép chiếu vuông góc theo phương này cho một hình chiếu trục đo vuông góc: thấy được cả ba chiều của vật, nhưng mỗi trục có một hệ số biến dạng riêng. Kéo để ba hệ số bằng nhau, hoặc chọn "Trục đo vuông góc đều".',
  };
}
