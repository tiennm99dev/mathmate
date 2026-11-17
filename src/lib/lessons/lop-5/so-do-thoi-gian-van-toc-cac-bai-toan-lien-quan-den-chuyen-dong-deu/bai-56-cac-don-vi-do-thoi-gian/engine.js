/**
 * The conversion ladder of time units: thế kỉ, năm, tháng on one ladder and
 * tuần, ngày, giờ, phút, giây on the other. A task changes a measure into
 * another unit one rung at a time; at each rung the child picks the
 * operation, multiplying to go to a smaller unit and dividing to go to a
 * bigger one. The numbers between the rungs stay hidden until found. Pure
 * and DOM-free.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/** Neighbouring units, big first, and how many small ones make one big one. */
export const LINKS = /** @type {const} */ ([
  ['thế kỉ', 'năm', 100],
  ['năm', 'tháng', 12],
  ['tuần', 'ngày', 7],
  ['ngày', 'giờ', 24],
  ['giờ', 'phút', 60],
  ['phút', 'giây', 60],
]);

/** The two ladders the widget draws, big units first. */
export const LADDERS = [
  ['thế kỉ', 'năm', 'tháng'],
  ['tuần', 'ngày', 'giờ', 'phút', 'giây'],
];

/** Every number between two neighbouring units. */
const FACTORS = [...new Set(LINKS.map((l) => l[2]))].sort((x, y) => x - y);

/**
 * A measure to change: `value` in `path[0]`, through each unit of `path`.
 * @typedef {{ value: number, path: string[] }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { value: 2, path: ['giờ', 'phút'] },
  { value: 3, path: ['phút', 'giây'] },
  { value: 2, path: ['tuần', 'ngày'] },
  { value: 3, path: ['năm', 'tháng'] },
  { value: 1.5, path: ['giờ', 'phút'] },
  { value: 2, path: ['thế kỉ', 'năm'] },
  { value: 180, path: ['phút', 'giờ'] },
  { value: 0.5, path: ['ngày', 'giờ'] },
  { value: 240, path: ['giây', 'phút'] },
  { value: 1, path: ['ngày', 'giờ', 'phút'] },
];

/**
 * The link between two neighbouring units and whether the move goes down to
 * the smaller one.
 * @param {string} from
 * @param {string} to
 * @returns {{ factor: number, down: boolean }}
 */
export function linkOf(from, to) {
  const down = LINKS.find(([b, s]) => b === from && s === to);
  if (down) return { factor: down[2], down: true };
  const up = LINKS.find(([b, s]) => b === to && s === from);
  if (up) return { factor: up[2], down: false };
  throw new Error(`${from} and ${to} are not neighbours`);
}

/** @typedef {{ down: boolean, factor: number }} Move */

/**
 * The label of a move: '× 60' or ': 60'.
 * @param {Move} m
 */
export const moveText = (m) => `${m.down ? '×' : ':'} ${m.factor}`;

/**
 * The four moves offered between two units: the right one, the opposite
 * operation, and the same operation with two other numbers of the ladder,
 * in a fixed order.
 * @param {string} from
 * @param {string} to
 * @returns {Move[]}
 */
export function movesFor(from, to) {
  const right = linkOf(from, to);
  const near = FACTORS.filter((f) => f !== right.factor)
    .sort((x, y) => Math.abs(x - right.factor) - Math.abs(y - right.factor))
    .slice(0, 2);
  return [
    right,
    { down: !right.down, factor: right.factor },
    ...near.map((factor) => ({ down: right.down, factor })),
  ].sort((x, y) => x.factor - y.factor || Number(y.down) - Number(x.down));
}

/**
 * The value after each rung of a task: [value, …, answer].
 * @param {Task} task
 */
export function valuesOf(task) {
  /** @type {number[]} */
  const out = [task.value];
  for (let i = 1; i < task.path.length; i++) {
    const { factor, down } = linkOf(task.path[i - 1], task.path[i]);
    const v = out[i - 1];
    out.push(tidy(down ? v * factor : v / factor));
  }
  return out;
}

/**
 * A measure in words: '1,5 giờ'.
 * @param {number} v
 * @param {string} unit
 */
export const amount = (v, unit) => `${formatNumber(v)} ${unit}`;

/**
 * What the task asks: '1,5 giờ = ? phút'.
 * @param {Task} task
 */
export const taskText = (task) => `${amount(task.value, task.path[0])} = ? ${task.path.at(-1)}`;

/**
 * The sentence after a right move: '1,5 giờ = 1,5 × 60 phút = 90 phút'.
 * @param {Task} task
 * @param {number} rung index of the unit just reached
 */
export function stepText(task, rung) {
  const values = valuesOf(task);
  const from = task.path[rung - 1];
  const to = task.path[rung];
  const { factor, down } = linkOf(from, to);
  const v = formatNumber(values[rung - 1]);
  return `${amount(values[rung - 1], from)} = ${v} ${down ? '×' : ':'} ${factor} ${to} = ${amount(values[rung], to)}.`;
}

/**
 * The line shown after a wrong move.
 * @param {string} from
 * @param {string} to
 * @param {Move} move
 */
export function slipText(from, to, move) {
  const right = linkOf(from, to);
  if (move.down !== right.down) {
    return right.down
      ? `${to} là đơn vị bé hơn ${from}, nên số đo phải lớn lên. Em dùng phép nhân.`
      : `${to} là đơn vị lớn hơn ${from}, nên số đo phải bé đi. Em dùng phép chia.`;
  }
  const [big, small] = right.down ? [from, to] : [to, from];
  return `1 ${big} không bằng ${move.factor} ${small}. Em nhớ lại bảng đơn vị đo thời gian.`;
}

/**
 * The link label between two rungs of a ladder: the number once found, '?'
 * before.
 * @param {string} big
 * @param {string} small
 * @param {ReadonlySet<string>} found
 */
export function linkLabel(big, small, found) {
  const f = linkOf(big, small).factor;
  return found.has(`${big}-${small}`) ? `1 ${big} = ${f} ${small}` : '?';
}

/**
 * The key under which a found link is kept, whatever the move's direction.
 * @param {string} from
 * @param {string} to
 */
export function linkKey(from, to) {
  return linkOf(from, to).down ? `${from}-${to}` : `${to}-${from}`;
}
