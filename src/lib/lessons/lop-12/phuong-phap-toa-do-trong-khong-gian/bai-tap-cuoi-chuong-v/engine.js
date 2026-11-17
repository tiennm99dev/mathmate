import { P, add3, dot3, mul3, planeValue, sub3 } from '../_shared/space.js';

/** @typedef {import('../_shared/space.js').P3} P3 */

/**
 * A drone takes off from A and flies straight with velocity v (km per
 * minute): M(t) = A + t·v. A radar at I watches the ball of radius R around
 * it, and a no-fly zone begins at the plane (P): n · X + D = 0. Unit: km.
 */
export const START = P(-4, -4, 0);
export const VELOCITY = P(2, 2, 1);
export const RADAR = P(0, 0, 2);
export const RADIUS = 3;
export const NORMAL = P(0, 1, 2);
export const D = -6;
export const T_MAX = 4;
export const T_STEP = 0.25;

/** @param {number} t minutes after take-off */
export const position = (t) => add3(START, mul3(VELOCITY, t));

/** IM² for the drone at time t. @param {number} t */
export function radarSquare(t) {
  const d = sub3(position(t), RADAR);
  return dot3(d, d);
}

/** n · M + D for the drone at time t: 0 on (P), negative before it. @param {number} t */
export const planeSide = (t) => planeValue(NORMAL, D, position(t));

/**
 * The moments the learner is asked to find, each with the condition that
 * holds then.
 */
export const EVENTS = /** @type {const} */ ([
  {
    id: 'vao',
    label: 'Drone bắt đầu vào vùng ra-đa',
    test: (/** @type {number} */ t) =>
      radarSquare(t) === RADIUS * RADIUS && dot3(sub3(position(t), RADAR), VELOCITY) < 0,
  },
  {
    id: 'cham',
    label: 'Drone chạm mặt phẳng (P)',
    test: (/** @type {number} */ t) => planeSide(t) === 0,
  },
  {
    id: 'ra',
    label: 'Drone rời khỏi vùng ra-đa',
    test: (/** @type {number} */ t) =>
      radarSquare(t) === RADIUS * RADIUS && dot3(sub3(position(t), RADAR), VELOCITY) > 0,
  },
]);

/** The times on the slider's grid when each event happens. */
export function eventTimes() {
  const out = /** @type {Record<string, number[]>} */ ({});
  for (const e of EVENTS) out[e.id] = [];
  for (let k = 0; k * T_STEP <= T_MAX; k++) {
    const t = k * T_STEP;
    for (const e of EVENTS) if (e.test(t)) out[e.id].push(t);
  }
  return out;
}
