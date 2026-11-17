import { numTex } from '#lib/core/number-format.js';
import { sub3 } from '#lib/geom-engine/solid.js';
import { P, angleFan, footOnLine, mid3 } from '#lib/geom-engine/space.js';

/**
 * A set of review questions on one pyramid that turns on the screen:
 * S.ABCD with a square base of side a (cm) and SA ⊥ (ABCD), SA = h (cm).
 * Each question asks for an angle, a distance or the volume, checks the
 * typed answer and, on demand, draws the line, angle or face the solution
 * uses.
 */

/** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
/** @typedef {'goc-sc' | 'nhi-dien' | 'd-a-sbc' | 'd-sa-bd' | 'the-tich'} QuestionId */

/** The pyramids the set cycles through, as [a, h] in cm. */
/** @type {[number, number][]} */
export const CASES = [
  [3, 4],
  [2, 2],
  [4, 3],
  [2, 3],
  [6, 3],
];

/** @type {{ id: QuestionId, label: string }[]} */
export const QUESTIONS = [
  { id: 'goc-sc', label: 'Góc SC và đáy' },
  { id: 'nhi-dien', label: 'Góc nhị diện' },
  { id: 'd-a-sbc', label: 'd(A, (SBC))' },
  { id: 'd-sa-bd', label: 'd(SA, BD)' },
  { id: 'the-tich', label: 'Thể tích' },
];

const DEG = 180 / Math.PI;
/** The side of the base in the drawing. */
const DRAW = 3;

/**
 * The pyramid drawn with its base side 3 units: the vertices, the centre O
 * of the base and the foot H of the perpendicular from A to SB.
 * @param {number} a @param {number} h
 * @returns {Record<string, P3>}
 */
export function figure(a, h) {
  const k = DRAW / a;
  const pts = {
    A: P(0, 0, 0),
    B: P(DRAW, 0, 0),
    C: P(DRAW, DRAW, 0),
    D: P(0, DRAW, 0),
    S: P(0, 0, h * k),
  };
  return { ...pts, O: mid3(pts.A, pts.C), H: footOnLine(pts.A, pts.S, pts.B) };
}

export const FACES = [
  ['A', 'B', 'C', 'D'],
  ['S', 'A', 'B'],
  ['S', 'B', 'C'],
  ['S', 'C', 'D'],
  ['S', 'D', 'A'],
];

/** @type {[string, string][]} */
export const EDGES = [
  ['A', 'B'],
  ['B', 'C'],
  ['C', 'D'],
  ['D', 'A'],
  ['S', 'A'],
  ['S', 'B'],
  ['S', 'C'],
  ['S', 'D'],
];

/**
 * The exact answer and the rounding the question asks for (places after
 * the comma; angles in whole degrees).
 * @param {QuestionId} id @param {number} a @param {number} h
 */
export function answerOf(id, a, h) {
  switch (id) {
    case 'goc-sc':
      return { value: Math.atan(h / (a * Math.SQRT2)) * DEG, places: 0, unit: '°' };
    case 'nhi-dien':
      return { value: Math.atan(h / a) * DEG, places: 0, unit: '°' };
    case 'd-a-sbc':
      return { value: (a * h) / Math.hypot(a, h), places: 2, unit: 'cm' };
    case 'd-sa-bd':
      return { value: (a * Math.SQRT2) / 2, places: 2, unit: 'cm' };
    default:
      return { value: (a * a * h) / 3, places: 2, unit: 'cm³' };
  }
}

/** @param {number} v @param {number} places */
const round = (v, places) => numTex(Math.round(v * 10 ** places) / 10 ** places, places);

/**
 * `= v` when v is exact to the rounding, else `≈ v`.
 * @param {number} v @param {number} places
 */
const approx = (v, places) =>
  `${Math.abs(v * 10 ** places - Math.round(v * 10 ** places)) < 1e-9 ? '=' : '\\approx'} ${round(v, places)}`;

/**
 * The question as rich text.
 * @param {QuestionId} id @param {number} a @param {number} h
 */
export function promptOf(id, a, h) {
  const given = `Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $${a}$ cm, $SA \\perp (ABCD)$, $SA = ${h}$ cm.`;
  switch (id) {
    case 'goc-sc':
      return `${given} Tính góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ (làm tròn đến độ).`;
    case 'nhi-dien':
      return `${given} Tính số đo của góc nhị diện $[S, BC, A]$ (làm tròn đến độ).`;
    case 'd-a-sbc':
      return `${given} Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$ (theo cm, làm tròn đến hàng phần trăm).`;
    case 'd-sa-bd':
      return `${given} Tính khoảng cách giữa hai đường thẳng $SA$ và $BD$ (theo cm, làm tròn đến hàng phần trăm).`;
    default:
      return `${given} Tính thể tích khối chóp $S.ABCD$ (theo cm³, làm tròn đến hàng phần trăm).`;
  }
}

/**
 * A nudge towards the method, never the answer.
 * @param {QuestionId} id
 */
export function hintOf(id) {
  switch (id) {
    case 'goc-sc':
      return 'Hình chiếu của $SC$ trên $(ABCD)$ là $AC$, nên góc cần tìm là $\\widehat{SCA}$. Xét tam giác $SAC$ vuông tại $A$.';
    case 'nhi-dien':
      return '$BC \\perp AB$ và $BC \\perp SA$ nên $BC \\perp SB$. Góc phẳng nhị diện là $\\widehat{SBA}$.';
    case 'd-a-sbc':
      return '$BC \\perp (SAB)$. Kẻ $AH \\perp SB$ thì $AH \\perp (SBC)$; dùng $\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AB^2}$.';
    case 'd-sa-bd':
      return 'Gọi $O$ là tâm của đáy. $AO$ có vuông góc với cả $SA$ và $BD$ không?';
    default:
      return 'Chiều cao là $SA$, đáy là hình vuông: $V = \\dfrac{1}{3}S_{ABCD} \\cdot SA$.';
  }
}

/**
 * The full working, with this pyramid's numbers.
 * @param {QuestionId} id @param {number} a @param {number} h
 */
export function solutionOf(id, a, h) {
  const { value, places } = answerOf(id, a, h);
  const v = approx(value, places);
  switch (id) {
    case 'goc-sc':
      return `$AC = ${a}\\sqrt{2}$ cm. Góc giữa $SC$ và đáy là $\\widehat{SCA}$ với $\\tan\\widehat{SCA} = \\dfrac{SA}{AC} = \\dfrac{${h}}{${a}\\sqrt{2}}$, nên $\\widehat{SCA} ${v}^\\circ$.`;
    case 'nhi-dien':
      return `$AB \\perp BC$, $SB \\perp BC$ nên góc phẳng nhị diện $[S, BC, A]$ là $\\widehat{SBA}$; $\\tan\\widehat{SBA} = \\dfrac{SA}{AB} = \\dfrac{${h}}{${a}}$, nên $\\widehat{SBA} ${v}^\\circ$.`;
    case 'd-a-sbc':
      return `Kẻ $AH \\perp SB$ thì $AH \\perp (SBC)$. $AH = \\dfrac{SA \\cdot AB}{\\sqrt{SA^2 + AB^2}} = \\dfrac{${h} \\cdot ${a}}{\\sqrt{${h * h + a * a}}} ${v}$ cm.`;
    case 'd-sa-bd':
      return `$AO \\perp BD$ (đường chéo hình vuông) và $AO \\perp SA$ (vì $SA \\perp (ABCD)$), nên $AO$ là đoạn vuông góc chung: $d(SA, BD) = AO = \\dfrac{${a}\\sqrt{2}}{2} ${v}$ cm.`;
    default:
      return `$V = \\dfrac{1}{3} \\cdot ${a}^2 \\cdot ${h} = \\dfrac{${a * a * h}}{3} ${v}$ cm³.`;
  }
}

/**
 * Whether a typed number answers the question: within half a unit of the
 * last place asked for.
 * @param {QuestionId} id @param {number} a @param {number} h @param {number} x
 */
export function isRight(id, a, h, x) {
  const { value, places } = answerOf(id, a, h);
  return Math.abs(x - value) <= 0.5 * 10 ** -places + 1e-9;
}

/**
 * What to draw to show the solution of a question on the figure.
 * @param {QuestionId} id @param {Record<string, P3>} f
 * @returns {{ lines: [string, string][], fan: P3[], face: string[], dots: string[] }}
 */
export function guideOf(id, f) {
  switch (id) {
    case 'goc-sc':
      return {
        lines: [
          ['S', 'C'],
          ['A', 'C'],
        ],
        fan: angleFan(f.C, sub3(f.S, f.C), sub3(f.A, f.C), 0.8),
        face: [],
        dots: [],
      };
    case 'nhi-dien':
      return {
        lines: [
          ['S', 'B'],
          ['A', 'B'],
          ['B', 'C'],
        ],
        fan: angleFan(f.B, sub3(f.S, f.B), sub3(f.A, f.B), 0.8),
        face: [],
        dots: [],
      };
    case 'd-a-sbc':
      return { lines: [['A', 'H']], fan: [], face: ['S', 'B', 'C'], dots: ['H'] };
    case 'd-sa-bd':
      return {
        lines: [
          ['A', 'O'],
          ['B', 'D'],
          ['S', 'A'],
        ],
        fan: [],
        face: [],
        dots: ['O'],
      };
    default:
      return { lines: [['S', 'A']], fan: [], face: ['A', 'B', 'C', 'D'], dots: [] };
  }
}
