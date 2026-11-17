/**
 * Two cars racing on a road for whole hours. The blue car keeps a speed the
 * child does not see; after each hour the child sees how far it has gone and
 * sets the red car's speed so the two stay side by side, that is, finds the
 * blue car's speed as distance : time. Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** The blue car's speed in km/giờ, one per round. */
export const ROUNDS = [45, 36, 52, 60, 40];

/** The race lasts at most this many hours. */
export const MAX_HOURS = 4;

/** The red car's speed range, in km/giờ. */
export const MIN_SPEED = 10;
export const MAX_SPEED = 75;

/** The road drawn, in km: room for the fastest car for the whole race. */
export const ROAD_KM = MAX_SPEED * MAX_HOURS;

/**
 * A speed kept within the range of the red car.
 * @param {number} v
 */
export const clampSpeed = (v) => Math.min(MAX_SPEED, Math.max(MIN_SPEED, Math.round(v)));

/**
 * The distance gone at a steady speed: s = v × t.
 * @param {number} v km/giờ
 * @param {number} t giờ
 */
export const distance = (v, t) => v * t;

/**
 * The live line under the road.
 * @param {number} blue the blue car's speed
 * @param {number} red the red car's speed
 * @param {number} t whole hours gone
 * @returns {{ tone: 'ok' | 'info' | 'warn', text: string }}
 */
export function noteFor(blue, red, t) {
  if (t === 0) {
    return {
      tone: 'info',
      text: 'Em bấm "Chạy 1 giờ" để hai xe cùng chạy, rồi xem xe xanh đi được bao xa.',
    };
  }
  const sb = distance(blue, t);
  const sr = distance(red, t);
  if (red === blue) {
    return {
      tone: 'ok',
      text: `Hai xe luôn ngang nhau! Vận tốc xe xanh là ${fmt(sb)} : ${t} = ${blue} km/giờ: mỗi giờ xe đi được ${blue} km.`,
    };
  }
  return {
    tone: 'warn',
    text: `Sau ${t} giờ, xe xanh đi được ${fmt(sb)} km, xe đỏ đi được ${fmt(sr)} km. Xe đỏ ${red < blue ? 'chậm hơn' : 'nhanh hơn'}. Em tính ${fmt(sb)} : ${t} để biết mỗi giờ xe xanh đi được bao nhiêu ki-lô-mét.`,
  };
}

/**
 * The distances after each whole hour, for the table under the road.
 * @param {number} v
 * @param {number} t
 */
export const hourly = (v, t) => Array.from({ length: t }, (_, i) => distance(v, i + 1));

/**
 * What a screen reader hears for the road.
 * @param {number} blue
 * @param {number} red
 * @param {number} t
 * @param {boolean} solved whether the blue car's speed may be told
 */
export function roadLabel(blue, red, t, solved) {
  const speed = solved ? `${blue} km/giờ` : 'chưa biết vận tốc';
  return `Sau ${t} giờ: xe xanh, ${speed}, đi được ${fmt(distance(blue, t))} km; xe đỏ, ${red} km/giờ, đi được ${fmt(distance(red, t))} km.`;
}
