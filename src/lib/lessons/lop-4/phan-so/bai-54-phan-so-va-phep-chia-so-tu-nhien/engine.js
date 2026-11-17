/**
 * Sharing cakes fairly. Each of the `cakes` round cakes is cut into as many
 * equal parts as there are friends, and every friend takes one part of every
 * cake, so each friend gets cakes/friends of a cake: the quotient cakes :
 * friends written as a fraction. Gathering one friend's parts shows when that
 * share is less than, equal to or more than one whole cake. Pure and DOM-free.
 */
import { fracRich, fracTex, versusOne } from '../_shared/fractions.js';

export const MIN_CAKES = 1;
export const MAX_CAKES = 8;
export const MIN_FRIENDS = 2;
export const MAX_FRIENDS = 6;

/** One colour per friend, so a friend's parts are easy to follow. */
export const FRIEND_COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#ef4444'];

/** The friends' names, in order. */
export const FRIEND_NAMES = ['Mai', 'Nam', 'Hà', 'Việt', 'Lan', 'Minh'];

/**
 * The shares to make, as [cakes, friends].
 * @type {ReadonlyArray<readonly [number, number]>}
 */
export const GOALS = [
  [3, 4],
  [2, 5],
  [5, 3],
  [4, 4],
  [6, 3],
  [1, 6],
];

/**
 * The parts of every cake, coloured by the friend who takes each part.
 * @param {number} cakes
 * @param {number} friends
 * @returns {string[][]}
 */
export const cakeFills = (cakes, friends) =>
  Array.from({ length: cakes }, () => FRIEND_COLORS.slice(0, friends));

/**
 * The first friend's parts gathered into whole cakes: as many cakes as needed,
 * each cut into `friends` parts, the first `cakes` parts coloured.
 * @param {number} cakes
 * @param {number} friends
 * @returns {Array<Array<string | null>>}
 */
export function shareFills(cakes, friends) {
  const wholes = Math.ceil(cakes / friends);
  return Array.from({ length: wholes }, (_, w) =>
    Array.from({ length: friends }, (_, k) => (w * friends + k < cakes ? FRIEND_COLORS[0] : null)),
  );
}

/**
 * The sentence comparing one friend's share with one cake.
 * @param {number} cakes
 * @param {number} friends
 */
export function versusOneText(cakes, friends) {
  const f = fracRich(cakes, friends);
  const side = versusOne(cakes, friends);
  if (side === '<') {
    return `Tử số bé hơn mẫu số: ${f} cái bánh ít hơn 1 cái bánh, $${fracTex(cakes, friends)} < 1$.`;
  }
  if (side === '=') {
    return `Tử số bằng mẫu số: $${fracTex(cakes, friends)} = 1$, mỗi bạn được đúng 1 cái bánh.`;
  }
  const whole =
    cakes % friends === 0
      ? ` Ở đây $${fracTex(cakes, friends)} = ${cakes / friends}$, mỗi bạn được ${cakes / friends} cái bánh.`
      : '';
  return `Tử số lớn hơn mẫu số: ${f} cái bánh nhiều hơn 1 cái bánh, $${fracTex(cakes, friends)} > 1$.${whole}`;
}

/**
 * The live sentence for a share, checked against the goal.
 * @param {number} cakes
 * @param {number} friends
 * @param {readonly [number, number]} goal
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function shareNote(cakes, friends, goal) {
  const met = cakes === goal[0] && friends === goal[1];
  const share = `Chia đều ${cakes} cái bánh cho ${friends} bạn: $${cakes} : ${friends} = ${fracTex(cakes, friends)}$. Mỗi bạn được ${fracRich(cakes, friends)} cái bánh. ${versusOneText(cakes, friends)}`;
  return { tone: met ? 'ok' : 'info', text: met ? `Đúng rồi! ${share}` : share };
}
