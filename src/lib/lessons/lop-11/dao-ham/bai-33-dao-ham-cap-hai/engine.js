/**
 * Motions for the position, velocity and acceleration graphs: each one has
 * its equation of motion s(t), the velocity v(t) = s'(t) and the
 * acceleration a(t) = v'(t) = s''(t), with windows for the three graphs.
 * `motionState` reads the motion at a moment: the values, the direction of
 * travel and whether it is speeding up or slowing down.
 */

/**
 * @typedef {{ xMin: number, xMax: number, yMin: number, yMax: number }} Window
 * @typedef {object} Motion
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {string} unit the unit of position: 'm' or 'cm'
 * @property {string} sTex @property {string} vTex @property {string} aTex the three formulas as TeX
 * @property {(t: number) => number} s
 * @property {(t: number) => number} v
 * @property {(t: number) => number} a
 * @property {number} tMax time runs from 0 to tMax seconds
 * @property {[number, number]} sRange @property {[number, number]} vRange @property {[number, number]} aRange
 */

const PI = Math.PI;

/** @type {Motion[]} */
export const MOTIONS = [
  {
    id: 'cubic',
    label: 'Đi rồi quay lại',
    unit: 'm',
    sTex: 's(t) = t^3 - 6t^2 + 9t',
    vTex: "v(t) = s'(t) = 3t^2 - 12t + 9",
    aTex: "a(t) = s''(t) = 6t - 12",
    s: (t) => t ** 3 - 6 * t * t + 9 * t,
    v: (t) => 3 * t * t - 12 * t + 9,
    a: (t) => 6 * t - 12,
    tMax: 4,
    sRange: [-1, 5],
    vRange: [-4, 10],
    aRange: [-13, 13],
  },
  {
    id: 'fall',
    label: 'Rơi tự do',
    unit: 'm',
    sTex: 's(t) = 4{,}9t^2',
    vTex: "v(t) = s'(t) = 9{,}8t",
    aTex: "a(t) = s''(t) = 9{,}8",
    s: (t) => 4.9 * t * t,
    v: (t) => 9.8 * t,
    a: () => 9.8,
    tMax: 3,
    sRange: [-3, 48],
    vRange: [-2, 32],
    aRange: [-2, 12],
  },
  {
    id: 'spring',
    label: 'Dao động điều hoà',
    unit: 'cm',
    sTex: 'x(t) = 2\\cos(\\pi t)',
    vTex: "v(t) = x'(t) = -2\\pi \\sin(\\pi t)",
    aTex: "a(t) = x''(t) = -2\\pi^2 \\cos(\\pi t)",
    s: (t) => 2 * Math.cos(PI * t),
    v: (t) => -2 * PI * Math.sin(PI * t),
    a: (t) => -2 * PI * PI * Math.cos(PI * t),
    tMax: 2,
    sRange: [-2.6, 2.6],
    vRange: [-7.5, 7.5],
    aRange: [-23, 23],
  },
];

/**
 * The window of one of the three graphs.
 * @param {Motion} m @param {[number, number]} range
 * @returns {Window}
 */
export function windowOf(m, range) {
  return { xMin: 0, xMax: m.tMax, yMin: range[0], yMax: range[1] };
}

/** Values closer to 0 than this count as 0 (a turning point, a pause). */
const EPS = 1e-9;

/**
 * The motion at time t.
 * @param {Motion} m @param {number} t
 * @returns {{ s: number, v: number, a: number,
 *   direction: 'duong' | 'am' | 'dung', change: 'nhanh' | 'cham' | 'deu' | 'dung' }}
 *   direction: along the positive axis, against it, or at rest for an
 *   instant; change: speeding up (v and a of the same sign), slowing down
 *   (opposite signs), steady (a = 0) or at rest (v = 0)
 */
export function motionState(m, t) {
  const s = m.s(t);
  const v = m.v(t);
  const a = m.a(t);
  const sv = Math.abs(v) < EPS ? 0 : Math.sign(v);
  const sa = Math.abs(a) < EPS ? 0 : Math.sign(a);
  const direction = sv > 0 ? 'duong' : sv < 0 ? 'am' : 'dung';
  const change = sv === 0 ? 'dung' : sa === 0 ? 'deu' : sv === sa ? 'nhanh' : 'cham';
  return { s, v, a, direction, change };
}
