/**
 * The bảng biến thiên of a function, as data: the x row, the sign row of y′
 * and the y row with its arrows. A table is given by its nodes (the ends of
 * the domain, the zeros of y′ and the points where y is undefined) and the
 * sign of y′ on each interval between two nodes; the height of every value in
 * the y row follows from those signs, the way it is drawn by hand.
 */

/**
 * @typedef {'+' | '-'} Sign
 * @typedef {'top' | 'mid' | 'bottom'} Level
 * @typedef {object} Node
 * @property {string} x the x value as plain text ('−∞', '−1', '≈ 0,33')
 * @property {'end' | 'zero' | 'point' | 'pole'} kind an end of the domain,
 *   a zero of y′, any other point, or a point where y is undefined
 * @property {string} [y] the value of y there (a limit at an end)
 * @property {string} [yl] at a pole, the limit from the left (none at the left end of the domain)
 * @property {string} [yr] at a pole, the limit from the right (none at the right end)
 * @typedef {Node & { mark: '' | '0' | '||', level?: Level, levelL?: Level, levelR?: Level }} Cell
 * @typedef {{ cells: Cell[], signs: Sign[], arrows: Array<{ from: Level, to: Level }> }} Variation
 */

/**
 * @param {Sign | undefined} left the sign of y′ just before the node
 * @param {Sign | undefined} right the sign just after
 * @returns {Level}
 */
function levelAt(left, right) {
  if (left && right) {
    if (left === right) return 'mid';
    return left === '+' ? 'top' : 'bottom';
  }
  if (right) return right === '+' ? 'bottom' : 'top';
  return left === '+' ? 'top' : 'bottom';
}

/**
 * Lays out a bảng biến thiên.
 * @param {Node[]} nodes from left to right
 * @param {Sign[]} signs one per interval, `nodes.length - 1` of them
 * @returns {Variation}
 */
export function variationOf(nodes, signs) {
  if (signs.length !== nodes.length - 1) throw new Error('one sign per interval');
  const cells = nodes.map((n, i) => {
    const left = i > 0 ? signs[i - 1] : undefined;
    const right = i < signs.length ? signs[i] : undefined;
    /** @type {Cell} */
    const cell = { ...n, mark: n.kind === 'zero' ? '0' : n.kind === 'pole' ? '||' : '' };
    if (n.kind === 'pole') {
      if (left) cell.levelL = left === '+' ? 'top' : 'bottom';
      if (right) cell.levelR = right === '+' ? 'bottom' : 'top';
    } else {
      cell.level = levelAt(left, right);
    }
    return cell;
  });
  const arrows = signs.map((s, i) => ({
    from: /** @type {Level} */ (cells[i].levelR ?? cells[i].level),
    to: /** @type {Level} */ (cells[i + 1].levelL ?? cells[i + 1].level),
  }));
  return { cells, signs, arrows };
}

/**
 * The table read aloud, interval by interval, for the drawing's label:
 * "Trên khoảng từ −∞ đến −1, y′ dương, hàm số đồng biến; …".
 * @param {Variation} v
 */
export function variationText(v) {
  const parts = v.signs.map((s, i) => {
    const a = v.cells[i].x;
    const b = v.cells[i + 1].x;
    return `từ ${a} đến ${b}: y′ ${s === '+' ? 'dương, hàm số đồng biến' : 'âm, hàm số nghịch biến'}`;
  });
  const values = v.cells
    .filter((c) => c.kind !== 'pole' && c.y !== undefined)
    .map((c) => `tại x = ${c.x}, y = ${c.y}`);
  return `Bảng biến thiên. ${parts.join('; ')}.${values.length ? ` Giá trị: ${values.join('; ')}.` : ''}`;
}

/**
 * The extrema a table shows: a node where y′ changes from + to − is a cực
 * đại, from − to + a cực tiểu.
 * @param {Variation} v
 * @returns {Array<{ index: number, kind: 'max' | 'min' }>}
 */
export function extremaOf(v) {
  const out = [];
  for (let i = 1; i < v.cells.length - 1; i++) {
    const c = v.cells[i];
    if (c.kind === 'pole') continue;
    if (v.signs[i - 1] === '+' && v.signs[i] === '-') out.push({ index: i, kind: 'max' });
    if (v.signs[i - 1] === '-' && v.signs[i] === '+') out.push({ index: i, kind: 'min' });
  }
  return /** @type {Array<{ index: number, kind: 'max' | 'min' }>} */ (out);
}
