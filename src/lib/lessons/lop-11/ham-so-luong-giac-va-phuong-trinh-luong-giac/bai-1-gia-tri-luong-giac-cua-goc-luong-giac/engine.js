/**
 * Logic of the unit-circle widget: the spiral that shows how far a
 * trigonometric angle has turned, and the sentences that describe it.
 */

import { circlePoint, degTex, mod, QUADRANT_NAMES, quadrantOf, radTex } from '../_shared/trig.js';

/** The widget keeps the turning angle within three turns each way. */
export const MAX_TURN = 1080;

/**
 * SVG path of the spiral from 0° to `deg` around `c`: its radius grows from
 * `r0` by `grow` per turn, so several turns stay apart. Empty for 0°.
 * @param {{ x: number, y: number }} c
 * @param {number} deg
 * @param {number} [r0]
 * @param {number} [grow]
 */
export function spiralPath(c, deg, r0 = 22, grow = 9) {
  if (deg === 0) return '';
  const steps = Math.max(2, Math.ceil(Math.abs(deg) / 5));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = (deg * i) / steps;
    pts.push(circlePoint(c, r0 + (grow * Math.abs(t)) / 360, t));
  }
  return pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
}

/**
 * The tip of the spiral and the direction it is heading (degrees, SVG
 * screen angle of the tangent), for an arrow head.
 * @param {{ x: number, y: number }} c @param {number} deg
 * @param {number} [r0] @param {number} [grow]
 */
export function spiralTip(c, deg, r0 = 22, grow = 9) {
  const tip = circlePoint(c, r0 + (grow * Math.abs(deg)) / 360, deg);
  // Heading: counter-clockwise for a positive angle, clockwise otherwise.
  const heading = deg >= 0 ? deg + 90 : deg - 90;
  return { tip, heading };
}

/**
 * The angle written as the book does: one measure plus whole turns,
 * `deg = base + k·360°` with base in (−180°; 180°].
 * @param {number} deg
 */
export function splitTurns(deg) {
  let base = mod(deg, 360);
  if (base > 180) base -= 360;
  return { base, k: Math.round((deg - base) / 360) };
}

/**
 * Rich text describing the angle: its measure in degrees and radians and
 * where its end point M lies.
 * @param {number} deg
 */
export function angleSentence(deg) {
  const q = quadrantOf(deg);
  const turns = Math.trunc(Math.abs(deg) / 360);
  const way = deg > 0 ? 'theo chiều dương' : deg < 0 ? 'theo chiều âm' : '';
  const exactTurns = Math.abs(deg) === turns * 360;
  let turnText = '';
  if (turns > 0) {
    turnText = exactTurns
      ? `, quay đúng ${turns} vòng`
      : `, quay ${turns} vòng rồi thêm một phần vòng`;
  }
  const where =
    q === 0
      ? 'Điểm M nằm trên một trục toạ độ.'
      : `Điểm M thuộc góc phần tư thứ ${QUADRANT_NAMES[q]}.`;
  const rad = radTex(deg);
  const radPart = rad.startsWith('\\approx') ? `${rad}` : `= ${rad}`;
  return `Góc $${degTex(deg)} ${radPart}$ (rad)${way ? `, quay ${way}` : ''}${turnText}. ${where}`;
}

/**
 * The signs of sin, cos, tan and cot in quadrant `q` (1 to 4).
 * @param {number} q
 */
export function signsOf(q) {
  const sin = q === 1 || q === 2 ? '+' : '−';
  const cos = q === 1 || q === 4 ? '+' : '−';
  const tan = q === 1 || q === 3 ? '+' : '−';
  return { sin, cos, tan, cot: tan };
}
