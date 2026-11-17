/**
 * A simple pocket calculator (máy tính cầm tay) like the one in the grade 5
 * book: ten digits on the screen, a decimal point shown as '.', and the
 * operations done one after another from left to right, so 5 + 2 × 3 = gives
 * 21. The % key finishes a percentage: a × b % is b% of a, a ÷ b % is the
 * percentage of a and b. Pure and DOM-free; every key press gives a new state.
 */
import { formatNumber, tidy } from '#lib/core/number-format.js';

/** @typedef {'+' | '−' | '×' | '÷'} Op */

/**
 * @typedef {object} Calc
 * @property {boolean} on
 * @property {string} entry what the screen shows, with '.' as the decimal mark
 * @property {number | null} acc the number waiting for the pending operation
 * @property {Op | null} op
 * @property {boolean} fresh the next digit starts a new number
 * @property {boolean} error the screen shows E until ON/C
 */

/** Digits the screen holds. */
export const LIMIT = 10;

/** The keys in the order they sit on the keypad, row by row. */
export const KEY_ROWS = /** @type {const} */ ([
  ['ON/C', 'OFF', 'CE', '%'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['0', '.', '=', '+'],
]);

/** @typedef {(typeof KEY_ROWS)[number][number]} Key */

/** What each key is called, for screen readers and hints. */
export const KEY_WORDS = /** @type {Record<Key, string>} */ ({
  'ON/C': 'phím ON/C (bật máy, xoá hết)',
  OFF: 'phím OFF (tắt máy)',
  CE: 'phím CE (xoá số vừa nhập)',
  '%': 'phím phần trăm',
  '÷': 'phím chia',
  '×': 'phím nhân',
  '−': 'phím trừ',
  '+': 'phím cộng',
  '=': 'phím bằng',
  '.': 'phím dấu chấm (dùng làm dấu phẩy)',
  0: 'phím 0',
  1: 'phím 1',
  2: 'phím 2',
  3: 'phím 3',
  4: 'phím 4',
  5: 'phím 5',
  6: 'phím 6',
  7: 'phím 7',
  8: 'phím 8',
  9: 'phím 9',
});

const OPS = ['+', '−', '×', '÷'];

/** The calculator just turned on. @returns {Calc} */
export function start() {
  return { on: true, entry: '0', acc: null, op: null, fresh: true, error: false };
}

/** The calculator turned off. @returns {Calc} */
export function off() {
  return { ...start(), on: false };
}

/** @param {Calc} s */
const failed = (s) => ({ ...s, entry: 'E', acc: null, op: null, fresh: true, error: true });

/**
 * A result as the screen writes it: at most ten digits, '.' as the decimal
 * mark, no trailing zeros; null when it does not fit.
 * @param {number} value
 * @returns {string | null}
 */
export function screenText(value) {
  if (!Number.isFinite(value)) return null;
  const v = tidy(value, 9);
  const whole = String(Math.trunc(Math.abs(v)));
  if (whole.length > LIMIT) return null;
  const places = LIMIT - whole.length;
  let text = Math.abs(v).toFixed(places);
  if (text.includes('.')) text = text.replace(/0+$/, '').replace(/\.$/, '');
  if (text === '0') return '0';
  return v < 0 ? `-${text}` : text;
}

/**
 * @param {number} a
 * @param {Op} op
 * @param {number} b
 */
function apply(a, op, b) {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '×') return a * b;
  return b === 0 ? NaN : a / b;
}

/**
 * The screen after a result: the number, or E when it does not fit.
 * @param {Calc} s
 * @param {number} value
 * @param {Partial<Calc>} rest
 * @returns {Calc}
 */
function show(s, value, rest) {
  const text = screenText(value);
  if (text === null) return failed(s);
  return { ...s, entry: text, fresh: true, ...rest };
}

/**
 * The calculator after one key press.
 * @param {Calc} s
 * @param {Key} key
 * @returns {Calc}
 */
export function press(s, key) {
  if (key === 'ON/C') return start();
  if (key === 'OFF') return off();
  if (!s.on || s.error) return s;
  if (key === 'CE') return { ...s, entry: '0', fresh: true };
  if (/^\d$/.test(key)) {
    if (s.fresh) return { ...s, entry: key, fresh: false };
    if (s.entry.replace(/\D/g, '').length >= LIMIT) return s;
    return { ...s, entry: s.entry === '0' ? key : s.entry + key };
  }
  if (key === '.') {
    if (s.fresh) return { ...s, entry: '0.', fresh: false };
    return s.entry.includes('.') ? s : { ...s, entry: `${s.entry}.` };
  }
  const b = Number(s.entry);
  if (OPS.includes(key)) {
    const op = /** @type {Op} */ (key);
    if (s.op !== null && s.acc !== null && !s.fresh) {
      const value = apply(s.acc, s.op, b);
      const next = show(s, value, { op });
      return next.error ? next : { ...next, acc: Number(next.entry) };
    }
    return { ...s, acc: b, op, fresh: true };
  }
  if (key === '=') {
    if (s.op === null || s.acc === null) return { ...s, fresh: true };
    return show(s, apply(s.acc, s.op, b), { acc: null, op: null });
  }
  // key === '%'
  if (s.op === null || s.acc === null) return show(s, b / 100, {});
  const a = s.acc;
  const value =
    s.op === '×'
      ? (a * b) / 100
      : s.op === '÷'
        ? b === 0
          ? NaN
          : (a / b) * 100
        : s.op === '+'
          ? a + (a * b) / 100
          : a - (a * b) / 100;
  return show(s, value, { acc: null, op: null });
}

/**
 * The keys of a sequence written as one string: '35×8%' or 'ON/C 1.5+2='.
 * @param {string} text
 * @returns {Key[]}
 */
export function keysOf(text) {
  /** @type {Key[]} */
  const keys = [];
  let rest = text.replace(/\s+/g, '');
  while (rest) {
    const word = ['ON/C', 'OFF', 'CE'].find((w) => rest.startsWith(w));
    const key = /** @type {Key} */ (word ?? rest[0]);
    keys.push(key);
    rest = rest.slice(key.length);
  }
  return keys;
}

/**
 * The calculator after a sequence of keys, from a fresh start.
 * @param {string | Key[]} keys
 */
export function run(keys) {
  const list = typeof keys === 'string' ? keysOf(keys) : keys;
  return list.reduce(press, start());
}

/**
 * The number on the screen written the Vietnamese way: '2.8' is read 2,8.
 * @param {Calc} s
 */
export function screenReading(s) {
  if (!s.on) return 'Máy đang tắt.';
  if (s.error) return 'Màn hình hiện E: phép tính bị lỗi. Em bấm ON/C để làm lại.';
  const value = formatNumber(Number(s.entry), 9);
  return s.entry.includes('.') && s.entry !== `${value}`
    ? `Màn hình hiện ${s.entry}, đọc là ${value}.`
    : `Màn hình hiện ${value}.`;
}

/**
 * The number on the screen, or null when there is none to read.
 * @param {Calc} s
 */
export function screenValue(s) {
  return s.on && !s.error ? Number(s.entry) : null;
}
