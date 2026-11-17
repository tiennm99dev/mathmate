/**
 * Numbers for the year-end review of grade 5, written the book's way: a
 * decimal comma, thousands grouped by a narrow space ('12 345,5'), and the
 * options of a tap-the-answer question built from the right value and the
 * slips a child makes. Pure and DOM-free.
 */
import { lowestTerms } from '#lib/core/fractions.js';
export { num, readScaled as readDecimal, valueOptions } from '#lib/core/kid/decimals.js';

/**
 * A fraction in lowest terms as the book writes it: (6, 8) → '3/4', (8, 4)
 * → '2'.
 * @param {number} p
 * @param {number} q
 */
export function simplest(p, q) {
  const [a, b] = lowestTerms(p, q);
  return b === 1 ? String(a) : `${a}/${b}`;
}
