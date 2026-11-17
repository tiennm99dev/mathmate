/**
 * The four operations on decimals the grade 5 way, kept exact as digit
 * strings and scaled integers: column addition and subtraction lined up at
 * the comma (with the zeros written to fill a minuend), where the comma of a
 * product goes, moving the comma for 10, 100, 1 000 or 0,1, 0,01, 0,001, and
 * the book's long division with the comma written into the quotient.
 * Numbers are written with a decimal comma ('45,08'). Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';
import { decText, partsOf, toScaled, trimZeros } from '#lib/core/kid/decimals.js';

export { decText, partsOf, toScaled, trimZeros };

/**
 * How many digits a decimal has after its comma.
 * @param {string} text
 */
export const fracLength = (text) => partsOf(text).frac.length;

/**
 * A decimal written the book's way, its whole part grouped by threes:
 * '3333,2' gives '3 333,2' (narrow space).
 * @param {string} text
 */
export function grouped(text) {
  const { whole, frac } = partsOf(text);
  const head = fmt(Number(whole));
  return frac === '' ? head : `${head},${frac}`;
}

/**
 * The decimal scaled to `places` digits after the comma (places ≥ its own).
 * @param {string} text
 * @param {number} places
 */
export function scaledTo(text, places) {
  const { scaled, places: have } = toScaled(text);
  return scaled * 10 ** (places - have);
}

/**
 * The digit of a decimal in the place 10^exp (exp −1 for tenths), or null
 * when the decimal has no digit written there.
 * @param {string} text
 * @param {number} exp
 * @returns {number | null}
 */
export function digitAt(text, exp) {
  const { whole, frac } = partsOf(text);
  if (exp >= 0) {
    const i = whole.length - 1 - exp;
    return i >= 0 ? Number(whole[i]) : null;
  }
  const i = -exp - 1;
  return i < frac.length ? Number(frac[i]) : null;
}

/**
 * The exact result of a + b or a − b, written with as many digits after the
 * comma as the longer of the two ('45,08' + '24,7' gives '69,78').
 * @param {string} a
 * @param {string} b
 * @param {'+' | '-'} op
 */
export function addSub(a, b, op) {
  const places = Math.max(fracLength(a), fracLength(b));
  const x = scaledTo(a, places);
  const y = scaledTo(b, places);
  return decText(op === '+' ? x + y : x - y, places);
}

/**
 * One column of a decimal addition or subtraction, the last place first.
 * @typedef {object} ColumnStep
 * @property {number} exp the place, 10^exp
 * @property {number | null} top the digit of the first number (a written 0 too)
 * @property {number | null} bottom the digit of the second number
 * @property {boolean} padded `top` is a 0 written to fill the minuend
 * @property {number} carryIn
 * @property {number} carryOut
 * @property {boolean} borrow
 * @property {string} write what is written under the line ('' for a leading 0)
 * @property {string} say how the book says it, without the final full stop
 */

/**
 * A column calculation set out the book's way: the numbers lined up at the
 * comma, for a subtraction the minuend filled with zeros to as many decimal
 * digits as the subtrahend, then each column worked from the right like
 * natural numbers. `a ≥ b` for a subtraction.
 * @param {string} a
 * @param {string} b
 * @param {'+' | '-'} op
 */
export function columnPlan(a, b, op) {
  const places = Math.max(fracLength(a), fracLength(b));
  const wholeLen = Math.max(partsOf(a).whole.length, partsOf(b).whole.length);
  const result = addSub(a, b, op);
  const resultWhole = partsOf(result).whole.length;
  const top = op === '-' ? decText(scaledTo(a, places), places) : a;
  /** @type {ColumnStep[]} */
  const steps = [];
  let carryIn = 0;
  for (let exp = -places; exp < wholeLen; exp++) {
    const t = digitAt(top, exp);
    const bt = digitAt(b, exp);
    const padded = op === '-' && exp < 0 && -exp > fracLength(a);
    const last = exp === wholeLen - 1;
    if (op === '+') {
      const plain = (t ?? 0) + (bt ?? 0);
      const total = plain + carryIn;
      const write = last ? String(total) : String(total % 10);
      const carryOut = last ? 0 : Math.floor(total / 10);
      const tail = `, viết ${write}${carryOut > 0 ? `, nhớ ${carryOut}` : ''}`;
      let say;
      if (t === null || bt === null) {
        const one = /** @type {number} */ (t ?? bt);
        say =
          carryIn > 0 ? `${one} thêm ${carryIn} bằng ${total}${tail}` : `Hạ ${one}, viết ${one}`;
      } else {
        const added = carryIn > 0 ? `, thêm ${carryIn} bằng ${total}` : '';
        say = `${t} cộng ${bt} bằng ${plain}${added}${tail}`;
      }
      steps.push({ exp, top: t, bottom: bt, padded, carryIn, carryOut, borrow: false, write, say });
      carryIn = carryOut;
    } else {
      const td = /** @type {number} */ (t);
      const need = (bt ?? 0) + carryIn;
      const borrow = td < need;
      const d = td + (borrow ? 10 : 0) - need;
      const blank = exp > 0 && exp >= resultWhole && d === 0;
      const added = carryIn > 0 && bt !== null ? `${bt} thêm ${carryIn} bằng ${need}, ` : '';
      let say;
      if (bt === null && carryIn === 0) say = `Hạ ${td}, viết ${td}`;
      else if (borrow) {
        say = `${added}${td} không trừ được ${need}, lấy ${td + 10} trừ ${need} bằng ${d}, viết ${d}, nhớ 1`;
      } else {
        say = `${added}${td} trừ ${need} bằng ${d}${blank ? ', không cần viết' : `, viết ${d}`}`;
      }
      steps.push({
        exp,
        top: td,
        bottom: bt,
        padded,
        carryIn,
        carryOut: borrow ? 1 : 0,
        borrow,
        write: blank ? '' : String(d),
        say,
      });
      carryIn = borrow ? 1 : 0;
    }
  }
  return { top, bottom: b, places, wholeLen, result, steps };
}

/**
 * The digit to write in each column, read from the step: a sum's last column
 * may write two digits; the child writes its last one first, then the rest.
 * @param {ColumnStep} step
 */
export const writtenDigits = (step) => step.write.split('').map(Number);

/**
 * The result digits with the comma put after `left` of them: ('6978', 2)
 * gives '69,78'; with `left` equal to the length, no comma.
 * @param {string} digits
 * @param {number} left
 */
export function withComma(digits, left) {
  if (left >= digits.length) return digits;
  return `${digits.slice(0, left)},${digits.slice(left)}`;
}

/**
 * Where the comma of a result could go: the right place and the places one
 * digit to either side, as texts, the right one first. The comma always
 * keeps at least one digit on its left.
 * @param {string} result
 */
export function commaOptions(result) {
  const { whole, frac } = partsOf(result);
  const digits = whole + frac;
  const right = whole.length;
  /** @type {string[]} */
  const options = [result];
  for (const left of [right - 1, right + 1, right + 2, right - 2]) {
    if (left < 1 || left > digits.length) continue;
    const text = withComma(digits, left);
    if (!options.includes(text) && options.length < 3) options.push(text);
  }
  return options;
}

/**
 * A decimal's digits with the comma left out, as a natural number ('2,5'
 * gives 25, '0,07' gives 7).
 * @param {string} text
 */
export const naturalOf = (text) => toScaled(text).scaled;

/**
 * The book's multiplication of decimals: multiply as natural numbers, then
 * count the digits after the comma in both factors and split that many
 * digits off the product from the right (writing zeros on the left when the
 * product is too short). `product` drops the zeros at the end, as the book
 * writes the answer.
 * @param {string} a
 * @param {string} b
 */
export function productPlan(a, b) {
  const x = naturalOf(a);
  const y = naturalOf(b);
  const natural = x * y;
  const places = fracLength(a) + fracLength(b);
  const full = decText(natural, places);
  return { x, y, natural, places, full, product: trimZeros(full) };
}

/**
 * How the comma of a product is found, in the book's words.
 * @param {string} a
 * @param {string} b
 */
export function productWhy(a, b) {
  const { x, y, natural, places, full } = productPlan(a, b);
  const fa = fracLength(a);
  const fb = fracLength(b);
  const count =
    fa > 0 && fb > 0
      ? `Hai thừa số có tất cả ${fa} + ${fb} = ${places} chữ số ở phần thập phân`
      : `Thừa số ${fa > 0 ? a : b} có ${places} chữ số ở phần thập phân`;
  return `Nhân như số tự nhiên: ${fmt(x)} × ${fmt(y)} = ${fmt(natural)}. ${count}, nên dùng dấu phẩy tách ra ${places} chữ số kể từ phải sang trái: ${a} × ${b} = ${full}.`;
}

/**
 * Moves the comma of a decimal `shift` places to the right (to the left when
 * negative), writing zeros where digits run out, and writes the result
 * without useless zeros: ('4,3', −2) → '0,043', ('6,3', 2) → '630'.
 * @param {string} text
 * @param {number} shift
 */
export function shiftComma(text, shift) {
  const { scaled, places } = toScaled(text);
  const left = places - shift;
  if (left <= 0) return String(scaled * 10 ** -left);
  return trimZeros(decText(scaled, left));
}

/** The numbers of the lesson on moving the comma, as the book writes them. */
export const FACTORS = /** @type {const} */ (['10', '100', '1 000', '0,1', '0,01', '0,001']);

/**
 * How many places the comma moves to the right (negative: to the left) when
 * multiplying or dividing by one of `FACTORS`.
 * @param {'×' | ':'} op
 * @param {string} factor
 */
export function shiftOf(op, factor) {
  const index = FACTORS.indexOf(/** @type {(typeof FACTORS)[number]} */ (factor));
  if (index < 0) throw new Error(`not a factor of the lesson: ${factor}`);
  const places = (index % 3) + 1;
  const big = index < 3;
  return (op === '×') === big ? places : -places;
}

/**
 * The book's rule for one operation: "Nhân với 100: chuyển dấu phẩy sang
 * bên phải hai chữ số."
 * @param {'×' | ':'} op
 * @param {string} factor
 */
export function shiftRule(op, factor) {
  const shift = shiftOf(op, factor);
  const words = ['một', 'hai', 'ba'][Math.abs(shift) - 1];
  const verb = op === '×' ? 'Nhân với' : 'Chia cho';
  return `${verb} ${factor}: chuyển dấu phẩy sang bên ${shift > 0 ? 'phải' : 'trái'} ${words} chữ số.`;
}

/**
 * A decimal laid out on a strip of digits with `pad` zeros on each side and
 * the comma after `comma` digits, so the comma can slide along it.
 * @param {string} text
 * @param {number} pad
 */
export function stripOf(text, pad) {
  const { whole, frac } = partsOf(text);
  const zeros = '0'.repeat(pad);
  return { digits: `${zeros}${whole}${frac}${zeros}`, comma: pad + whole.length };
}

/**
 * Reads a strip with its comma after `comma` digits as a decimal, with no
 * zero in front (but one before the comma) and none at the end.
 * @param {string} digits
 * @param {number} comma
 */
export function readStrip(digits, comma) {
  const whole = digits.slice(0, comma).replace(/^0+/, '') || '0';
  return trimZeros(`${whole},${digits.slice(comma)}`);
}

/**
 * Which digits of a strip are written in the number it reads as: from the
 * first digit that is not 0 (or the units) to the last digit that is not 0
 * after the comma. Returns [first, last] indices.
 * @param {string} digits
 * @param {number} comma
 * @returns {[number, number]}
 */
export function writtenSpan(digits, comma) {
  const text = readStrip(digits, comma);
  const { whole, frac } = partsOf(text);
  return [comma - whole.length, comma + frac.length - 1];
}

/**
 * Turns a division by a decimal into one by a natural number, the book's
 * way: count the digits after the divisor's comma, move the dividend's comma
 * that many places to the right (writing zeros if needed) and drop the
 * divisor's comma.
 * @param {string} a dividend
 * @param {string} b divisor
 */
export function shiftDivision(a, b) {
  const k = fracLength(b);
  const dividend = shiftComma(a, k);
  const divisor = naturalOf(b);
  const words = ['', 'một', 'hai', 'ba'][k];
  let say;
  if (k === 0) say = `Số chia ${b} là số tự nhiên, chia luôn.`;
  else if (fracLength(a) === 0) {
    say = `Số chia ${b} có ${words} chữ số ở phần thập phân. Viết thêm ${words} chữ số 0 vào bên phải ${a} được ${grouped(dividend)}. Bỏ dấu phẩy ở ${b} được ${divisor}.`;
  } else {
    say = `Số chia ${b} có ${words} chữ số ở phần thập phân. Chuyển dấu phẩy ở ${a} sang bên phải ${words} chữ số được ${grouped(dividend)}. Bỏ dấu phẩy ở ${b} được ${divisor}.`;
  }
  return { dividend, divisor, shift: k, say };
}

/**
 * One action of the long division: write a quotient digit, or the comma.
 * @typedef {object} DivAction
 * @property {'digit' | 'comma'} kind
 * @property {number} digit the quotient digit (−1 for the comma)
 * @property {number} cur the number divided at this step
 * @property {number} rest the remainder after it
 * @property {number} col index of the last dividend digit used (past the
 *   dividend's own digits for a 0 written after a remainder)
 * @property {string} row what this step writes under the dividend ('' for
 *   the first step and the comma): the remainder with the digit brought down
 * @property {boolean} zero a 0 was written after the remainder
 * @property {string} say how the book says it
 */

/**
 * The book's long division of a decimal (or natural number) by a natural
 * number: divide the whole part, write the comma in the quotient before
 * bringing down the first digit after the comma, go on with those digits,
 * then, while a remainder is left, write a 0 after it and divide again (at
 * most `maxZeros` times).
 * @param {string} dividend
 * @param {number} divisor
 * @param {number} [maxZeros]
 */
export function longDivision(dividend, divisor, maxZeros = 3) {
  const { whole, frac } = partsOf(dividend);
  const digits = (whole + frac).split('').map(Number);
  /** @type {DivAction[]} */
  const actions = [];
  let quotient = '';

  /**
   * @param {number} cur
   * @param {number} col
   * @param {string} row
   * @param {boolean} zero
   * @param {string} lead
   */
  function divide(cur, col, row, zero, lead) {
    const q = Math.floor(cur / divisor);
    const rest = cur - q * divisor;
    quotient += String(q);
    const say = `${lead}${cur} chia ${divisor} được ${q}, viết ${q}; ${q} nhân ${divisor} bằng ${q * divisor}; ${cur} trừ ${q * divisor} bằng ${rest}.`;
    actions.push({ kind: 'digit', digit: q, cur, rest, col, row, zero, say });
    return rest;
  }

  let i = 0;
  let cur = 0;
  while (i < whole.length) {
    cur = cur * 10 + digits[i];
    i += 1;
    if (cur >= divisor) break;
  }
  let rest = divide(cur, i - 1, '', false, '');
  for (; i < digits.length; i++) {
    if (i === whole.length) {
      actions.push(commaAction(quotient, rest, frac[0], i - 1));
      quotient += ',';
    }
    const next = rest * 10 + digits[i];
    rest = divide(next, i, `${rest}${digits[i]}`, false, `Hạ ${digits[i]} được ${next}. `);
  }
  let zeros = 0;
  if (rest !== 0 && frac.length === 0) {
    actions.push(commaAction(quotient, rest, undefined, digits.length - 1));
    quotient += ',';
  }
  while (rest !== 0 && zeros < maxZeros) {
    const next = rest * 10;
    const lead = `Viết thêm chữ số 0 vào bên phải số dư ${rest} được ${next}. `;
    rest = divide(next, digits.length + zeros, `${rest}0`, true, lead);
    zeros += 1;
  }
  return {
    actions,
    quotient,
    rest,
    zeros,
    wholeLen: whole.length,
    fracLen: frac.length,
    digits,
  };
}

/**
 * The step that writes the comma in the quotient.
 * @param {string} quotient
 * @param {number} rest
 * @param {string | undefined} nextDigit the first digit after the dividend's comma
 * @param {number} col
 * @returns {DivAction}
 */
function commaAction(quotient, rest, nextDigit, col) {
  const say =
    nextDigit === undefined
      ? `Còn dư ${rest}, chia tiếp: viết dấu phẩy vào bên phải ${quotient} ở thương.`
      : `Hết phần nguyên. Viết dấu phẩy vào bên phải ${quotient} ở thương trước khi lấy chữ số ${nextDigit} ở phần thập phân để chia tiếp.`;
  return { kind: 'comma', digit: -1, cur: rest, rest, col, row: '', zero: false, say };
}

/**
 * The rows written under the dividend after `done` actions, each placed so
 * its last digit sits under the column `col`, and the last remainder once
 * the division is finished.
 * @param {DivAction[]} actions
 * @param {number} done
 */
export function divisionRows(actions, done) {
  const shown = actions.slice(0, done);
  /** @type {Array<{ text: string, col: number }>} */
  const rows = shown.filter((a) => a.row !== '').map((a) => ({ text: a.row, col: a.col }));
  if (done === actions.length && actions.length > 0) {
    const last = actions[actions.length - 1];
    rows.push({ text: String(last.rest), col: last.col });
  }
  return rows;
}
