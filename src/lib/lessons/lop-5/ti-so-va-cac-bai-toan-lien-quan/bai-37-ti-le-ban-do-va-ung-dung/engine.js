import { fmt, formatNumber, tidy } from '#lib/core/number-format.js';
import { int, pick, shuffle } from '#lib/core/drill.js';

/** The scales the child can pick: 1 cm on the map is this many cm for real. */
export const SCALES = [1000, 10000, 100000, 1000000];

/** The places along the road of the map, at their distance in cm from the left end. */
export const PLACES = [
  { name: 'Nhà An', at: 0.5 },
  { name: 'Trường học', at: 3 },
  { name: 'Chợ', at: 4.5 },
  { name: 'Bưu điện', at: 7 },
  { name: 'Công viên', at: 9.5 },
];

/** The ruler under the map is this many cm long. */
export const RULER_CM = 10;

/** @param {number} scale */
export const scaleText = (scale) => `1 : ${fmt(scale)}`;

/**
 * A length given in cm, written in the largest unit that reads well: km from
 * 1 km, m from 1 m, cm below that. 150 000 cm → '1,5 km', 2 500 cm → '25 m'.
 * @param {number} cm
 */
export function lengthText(cm) {
  if (cm >= 100000) return `${formatNumber(tidy(cm / 100000))} km`;
  if (cm >= 100) return `${formatNumber(tidy(cm / 100))} m`;
  return `${formatNumber(tidy(cm))} cm`;
}

/**
 * The map distance between two places, in cm.
 * @param {number} a place index
 * @param {number} b place index
 */
export const mapCm = (a, b) => tidy(Math.abs(PLACES[a].at - PLACES[b].at));

/**
 * The working for a real distance: "4,5 × 1 000 = 4 500 (cm) = 45 m".
 * @param {number} cm map distance
 * @param {number} scale
 */
export function realLine(cm, scale) {
  const real = tidy(cm * scale);
  const unit = lengthText(real);
  const tail = unit.endsWith(' cm') ? '' : ` = ${unit}`;
  return `${formatNumber(cm)} × ${fmt(scale)} = ${fmt(real)} (cm)${tail}`;
}

/**
 * The sentence under the map.
 * @param {number} a
 * @param {number} b
 * @param {number} scale
 */
export function mapNote(a, b, scale) {
  if (a === b) return 'Em chọn hai địa điểm khác nhau.';
  const cm = mapCm(a, b);
  return `Từ ${PLACES[a].name} đến ${PLACES[b].name}: trên bản đồ dài ${formatNumber(cm)} cm. Tỉ lệ ${scaleText(scale)}, nên độ dài thật là ${realLine(cm, scale)}.`;
}

/**
 * @typedef {{ a: number, b: number, scale: number, options: string[], answer: number }} MapQuiz
 */

/**
 * The first question: Nhà An to Chợ at 1 : 100 000.
 * @type {MapQuiz}
 */
export const FIRST_QUIZ = {
  a: 0,
  b: 2,
  scale: 100000,
  options: ['40 km', '4 km', '400 m', '400 km'],
  answer: 1,
};

/**
 * A question: the real distance between two places at a scale, among the
 * slips of writing one zero too many or too few, or two zeros too many,
 * when multiplying by the scale or changing cm to m or km.
 * @param {() => number} rand
 * @param {MapQuiz} [previous]
 * @returns {MapQuiz}
 */
export function drawQuiz(rand, previous) {
  for (;;) {
    const a = int(rand, 0, PLACES.length - 2);
    const b = int(rand, a + 1, PLACES.length - 1);
    const scale = pick(rand, SCALES);
    if (previous && previous.a === a && previous.b === b && previous.scale === scale) continue;
    const real = tidy(mapCm(a, b) * scale);
    const right = lengthText(real);
    const slips = [lengthText(real * 10), lengthText(real / 10), lengthText(real * 100)];
    const options = shuffle(rand, [...new Set([right, ...slips])].slice(0, 4));
    return { a, b, scale, options, answer: options.indexOf(right) };
  }
}
