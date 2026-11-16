/**
 * Rounding a decimal on a zoomed number line between two rounding marks
 * (mốc): whole numbers, tenths or hundredths. The child drags a number
 * between the marks, by steps of the next place, and sees it go to the
 * nearer mark, the halfway point going up; then answers rounds that ask which
 * mark a number rounds to. Values are integers scaled by a power of ten so
 * nothing drifts. Pure and DOM-free.
 */
import {
  ROUND_TARGETS,
  decText,
  roundDecimal,
  roundWhy,
  toScaled,
  trimZeros,
} from '../_shared/decimals.js';

/** The three roundings of the book: to a whole number, to tenths, to hundredths. */
export const ROUNDINGS = /** @type {const} */ ([
  { places: 0, label: 'Số tự nhiên' },
  { places: 1, label: 'Phần mười' },
  { places: 2, label: 'Phần trăm' },
]);

/** Left marks of the stretches the child can drag on, scaled by 10^places. */
export const STRETCHES = /** @type {Record<number, readonly number[]>} */ ({
  0: [3, 12, 7, 0],
  1: [34, 6, 121, 29],
  2: [12, 407, 199, 350],
});

/** Numbers of the quiz for each rounding. */
export const QUIZ = /** @type {Record<number, readonly string[]>} */ ({
  0: ['12,6', '3,49', '7,5', '0,8', '25,38', '9,09'],
  1: ['3,47', '8,62', '0,35', '12,94', '2,96', '5,051'],
  2: ['4,135', '0,128', '7,042', '1,996', '3,4051', '0,555'],
});

/**
 * The two marks around a number for a rounding: the mark just below (or
 * at) it and the next one, written with exactly `places` digits.
 * @param {string} text
 * @param {number} places
 */
export function marksAround(text, places) {
  const { scaled, places: have } = toScaled(text);
  const low =
    have <= places ? scaled * 10 ** (places - have) : Math.floor(scaled / 10 ** (have - places));
  return { low: decText(low, places), high: decText(low + 1, places) };
}

/**
 * A point of the drag line as text: `fine` is scaled by 10^(places + 1).
 * @param {number} fine
 * @param {number} places
 */
export const fineText = (fine, places) => trimZeros(decText(fine, places + 1));

/**
 * What the line says about a number: where it sits between the marks and
 * what it rounds to.
 * @param {string} text
 * @param {number} places
 */
export function roundNote(text, places) {
  const target = roundDecimal(text, places);
  const { low, high } = marksAround(text, places);
  const { scaled, places: have } = toScaled(text);
  const onMark = have <= places;
  if (onMark) return `${text} nằm đúng mốc ${target}, làm tròn vẫn được ${target}.`;
  const halfway = have === places + 1 && scaled % 10 === 5;
  const where = halfway ? `${text} ở chính giữa ${low} và ${high}.` : `${text} gần ${target} hơn.`;
  return `${where} ${roundWhy(text, places)}`;
}

/**
 * Checks the mark the child picked for a number of the quiz.
 * @param {string} text
 * @param {number} places
 * @param {'low' | 'high'} pick
 * @returns {{ ok: boolean, text: string }}
 */
export function checkPick(text, places, pick) {
  const { low, high } = marksAround(text, places);
  const chosen = pick === 'low' ? low : high;
  if (chosen === roundDecimal(text, places)) {
    return { ok: true, text: `Đúng rồi! ${roundWhy(text, places)}` };
  }
  const look =
    places === 0 ? 'hàng phần mười' : places === 1 ? 'hàng phần trăm' : 'hàng phần nghìn';
  return {
    ok: false,
    text: `Chưa đúng. Làm tròn đến ${ROUND_TARGETS[places]}, em nhìn chữ số ${look} rồi so sánh với 5.`,
  };
}
