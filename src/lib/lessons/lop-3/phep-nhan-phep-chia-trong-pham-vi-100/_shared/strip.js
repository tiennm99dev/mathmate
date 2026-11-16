/**
 * What the paper-strip lessons of this chapter share: the colours of a strip
 * and when a piece is wide enough to print its number. Pure and
 * DOM-free.
 */

/** @typedef {'main' | 'copy' | 'extra' | 'plus' | 'faded'} StripTone */

/** The smallest share of a strip that still holds its number at 390 px wide. */
const MIN_LABELLED_SHARE = 0.06;

/**
 * Whether a piece is wide enough to print its number. A narrower piece stays to
 * scale and goes unlabelled, since half a digit would read as another number.
 * @param {number} size
 * @param {number} scale
 */
export const holdsText = (size, scale) => size / scale >= MIN_LABELLED_SHARE;
