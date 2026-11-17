/**
 * The two boards of the lesson "Đường tròn. Chu vi và diện tích hình tròn".
 *
 * The wheel: a wheel of radius r cm with a paint dot where it touches the
 * ground rolls along a ruler. The dot leaves a painted trace; after exactly
 * one turn the trace is as long as the circumference, d × 3,14, a little more
 * than 3 diameters. The drawing uses the true π; every number the child
 * reads uses 3,14, as the book does.
 *
 * The cut circle: a circle of radius r cut into n equal slices, the slices of
 * one half laid point down and those of the other half point up, side by
 * side. The more slices, the closer the shape is to a rectangle with length
 * half the circumference, r × 3,14, and width r: so S = r × r × 3,14.
 * Pure and DOM-free.
 */
import { tidy } from '#lib/core/number-format.js';
import { circleAreaWork, circumference, circumferenceWork, num } from '../_shared/figures.js';

/* ------------------------------------------------------------------ wheel */

/** SVG units per centimetre on the wheel board. */
export const SCALE = 22;
/** The radii the child can pick, in cm. */
export const RADII = [1, 1.5, 2, 2.5];
/** Where the ruler starts (cm 0), in SVG units from the left. */
export const START_X = 60;
/** The ground line, in SVG units from the top. */
export const GROUND_Y = 135;
export const WHEEL_W = 480;
export const WHEEL_H = 215;

/**
 * The true length of one turn, in cm, used only for drawing.
 * @param {number} r
 */
export const trueTurn = (r) => 2 * Math.PI * r;

/**
 * The distance rolled after a part `t` of one turn, as the child reads it: a
 * share of the circumference d × 3,14 printed on the board, so a full turn is
 * exactly that circumference. For the slider's spoken value.
 * @param {number} r
 * @param {number} t
 */
export const rolledShown = (r, t) => tidy(circumference(tidy(r * 2)) * t, 2);

/**
 * The wheel after rolling a part `t` of one turn (0 to 1): the centre, the
 * angle it turned (degrees, clockwise on screen) and the paint dot.
 * @param {number} r radius in cm
 * @param {number} t part of a turn, 0 to 1
 */
export function wheelAt(r, t) {
  const R = r * SCALE;
  const rolled = trueTurn(r) * t * SCALE;
  const cx = START_X + rolled;
  const cy = GROUND_Y - R;
  // The dot starts at the bottom and turns clockwise with the wheel.
  const a = 2 * Math.PI * t;
  return {
    cx,
    cy,
    R,
    angle: 360 * t,
    dot: { x: cx - R * Math.sin(a), y: cy + R * Math.cos(a) },
    trace: rolled,
  };
}

/**
 * The part of a turn for a wheel centre dragged to `x` (SVG units).
 * @param {number} r
 * @param {number} x
 */
export function turnFromX(r, x) {
  const t = (x - START_X) / (trueTurn(r) * SCALE);
  return Math.min(1, Math.max(0, t));
}

/** A rolled distance close enough to one full turn counts as one turn. */
export const FULL = 0.995;

/**
 * The live sentence under the wheel.
 * @param {number} r
 * @param {number} t
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function wheelNote(r, t) {
  const d = tidy(r * 2);
  if (t >= FULL) {
    return {
      tone: 'ok',
      text: `Đúng một vòng! Vết sơn dài bằng chu vi bánh xe: ${circumferenceWork(d)} (cm). Chu vi dài hơn 3 lần đường kính một chút.`,
    };
  }
  if (t === 0) {
    return {
      tone: 'info',
      text: `Bánh xe có bán kính ${num(r)} cm, đường kính ${num(d)} cm. Em kéo bánh xe lăn sang phải đúng một vòng nhé.`,
    };
  }
  return {
    tone: 'info',
    text: `Bánh xe đã lăn được khoảng ${num(tidy(trueTurn(r) * t, 1))} cm. Chấm đỏ chưa quay lại chạm đất, em lăn tiếp nhé.`,
  };
}

/**
 * How many whole diameters fit along the trace of one turn, and the
 * leftover, for the diameter bars under the ruler.
 * @param {number} r
 */
export function diametersInTurn(r) {
  const d = 2 * r;
  const whole = Math.floor(trueTurn(r) / d);
  return { whole, rest: tidy(circumference(d) - whole * d, 2) };
}

/**
 * What the wheel board is read as.
 * @param {number} r
 * @param {number} t
 */
export function wheelLabel(r, t) {
  const d = tidy(r * 2);
  return `Bánh xe tâm O, bán kính ${num(r)} cm, đường kính ${num(d)} cm, đặt trên thước. Bánh xe đã lăn khoảng ${num(tidy(trueTurn(r) * t, 1))} cm, vết sơn đỏ dài bằng đoạn đó. Chu vi bánh xe là ${num(circumference(d))} cm.`;
}

/* ------------------------------------------------------------ cut circle */

/** The numbers of slices the child can pick. */
export const SLICES = [4, 8, 16, 32];

/**
 * A slice of angle `theta` (radians) and radius R, drawn with its tip at the
 * origin and its arc above it (y up the screen is negative), centred on the
 * vertical: an SVG path.
 * @param {number} R
 * @param {number} theta
 */
export function slicePath(R, theta) {
  const sx = R * Math.sin(theta / 2);
  const sy = -R * Math.cos(theta / 2);
  const large = theta > Math.PI ? 1 : 0;
  return `M 0 0 L ${tidy(-sx, 3)} ${tidy(sy, 3)} A ${R} ${R} 0 ${large} 1 ${tidy(sx, 3)} ${tidy(sy, 3)} Z`;
}

/**
 * Where slice `i` of `n` sits: in the circle (tip at the centre, turned
 * i × 360/n degrees) and in the row (the first half point down, tips on the
 * bottom line; the second half point up, tips on the top line).
 * @param {number} n
 * @param {number} R
 * @param {number} i
 */
export function slicePlaces(n, R, i) {
  const theta = (2 * Math.PI) / n;
  const chord = 2 * R * Math.sin(theta / 2);
  const rise = R * Math.cos(theta / 2);
  const half = n / 2;
  const up = i < half;
  const k = up ? i : i - half;
  return {
    circle: { x: 0, y: 0, rot: (360 / n) * i },
    row: up ? { x: k * chord, y: 0, rot: 0 } : { x: k * chord + chord / 2, y: -rise, rot: 180 },
    up,
  };
}

/**
 * The turn of slice `i` part way (`u` from 0 to 1) from the circle to the
 * row, going the short way round.
 * @param {number} from degrees
 * @param {number} to degrees
 * @param {number} u
 */
export function turnBetween(from, to, u) {
  let delta = ((((to - from) % 360) + 540) % 360) - 180;
  if (delta === -180) delta = 180;
  return from + delta * u;
}

/**
 * The size of the row of `n` slices of radius R: its length along the bottom
 * line and its height (the tips to the arcs).
 * @param {number} n
 * @param {number} R
 */
export function rowSize(n, R) {
  const theta = (2 * Math.PI) / n;
  const chord = 2 * R * Math.sin(theta / 2);
  return { length: (n / 2) * chord + chord / 2, height: R };
}

/**
 * The live sentence under the cut circle.
 * @param {number} n slices
 * @param {number} r radius in cm
 * @param {boolean} laid whether the slices are in a row
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function sliceNote(n, r, laid) {
  if (!laid) {
    return {
      tone: 'info',
      text: `Hình tròn bán kính ${num(r)} cm được cắt thành ${n} phần bằng nhau. Em kéo thanh trượt để ghép các phần thành một hàng.`,
    };
  }
  const half = num(tidy(r * 3.14));
  if (n < 16) {
    return {
      tone: 'info',
      text: 'Hình ghép còn gồ ghề. Em cắt thành nhiều phần hơn để hình gần giống hình chữ nhật hơn nhé.',
    };
  }
  return {
    tone: 'ok',
    text: `Hình ghép gần giống hình chữ nhật: chiều dài bằng nửa chu vi, ${num(r)} × 3,14 = ${half} (cm); chiều rộng bằng bán kính, ${num(r)} cm. Diện tích: ${circleAreaWork(r)} (cm²).`,
  };
}

/**
 * The area of the circle on the cut board, worked out.
 * @param {number} r
 */
export const areaLine = (r) => `S = ${circleAreaWork(r)} (cm²)`;
