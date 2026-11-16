/**
 * A small formula reader for the sequence explorer: the learner types a
 * general term in n ("n/(n+1)", "(-1)^n/n", "2n - 1") or a recurrence step in
 * u, standing for u_{n−1}, and n ("2u + 1"). It reads + − × ÷ ^, brackets,
 * sqrt( ), a decimal comma or point and implicit products such as 2n or
 * 3(n + 1), and returns the formula as a function and as TeX.
 */

import { numTex } from '#lib/core/number-format.js';

/**
 * @typedef {{ kind: 'num', value: number }
 *   | { kind: 'var', name: string }
 *   | { kind: 'neg', arg: Node }
 *   | { kind: 'sqrt', arg: Node }
 *   | { kind: 'bin', op: '+' | '-' | '*' | '/' | '^', left: Node, right: Node }} Node
 */

/** @typedef {{ type: 'num', value: number } | { type: 'name', name: string } | { type: 'op', op: string }} Token */

/**
 * @param {string} text
 * @param {string[]} vars
 * @returns {Token[]}
 */
function tokenize(text, vars) {
  const s = text
    .replace(/[−–—]/g, '-')
    .replace(/[×·]/g, '*')
    .replace(/[:÷]/g, '/')
    .replace(/√/g, 'sqrt');
  /** @type {Token[]} */
  const out = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    const num = /^\d+(?:[.,]\d+)?/.exec(s.slice(i));
    if (num) {
      out.push({ type: 'num', value: Number(num[0].replace(',', '.')) });
      i += num[0].length;
      continue;
    }
    if (s.startsWith('sqrt', i)) {
      out.push({ type: 'name', name: 'sqrt' });
      i += 4;
      continue;
    }
    if (vars.includes(c)) {
      out.push({ type: 'name', name: c });
      i++;
      continue;
    }
    if ('+-*/^()'.includes(c)) {
      out.push({ type: 'op', op: c });
      i++;
      continue;
    }
    throw new Error(`Không đọc được kí tự "${c}".`);
  }
  return out;
}

/**
 * Reads a formula in the given variables.
 * @param {string} text
 * @param {string[]} vars one-letter variable names, such as ['n'] or ['u', 'n']
 * @returns {{ ok: true, node: Node } | { ok: false, error: string }}
 */
export function parseFormula(text, vars) {
  /** @type {Token[]} */
  let tokens;
  try {
    tokens = tokenize(text, vars);
  } catch (e) {
    return { ok: false, error: /** @type {Error} */ (e).message };
  }
  if (tokens.length === 0) return { ok: false, error: 'Hãy nhập một công thức.' };
  let pos = 0;
  const peek = () => tokens[pos];
  /** @param {string} op */
  const isOp = (op) => {
    const t = peek();
    return t !== undefined && t.type === 'op' && t.op === op;
  };
  /** @param {string} op */
  const expect = (op) => {
    if (!isOp(op)) throw new Error(op === ')' ? 'Thiếu dấu ngoặc đóng ")".' : `Thiếu "${op}".`);
    pos++;
  };

  /** @returns {Node} */
  function expr() {
    let left = term();
    while (isOp('+') || isOp('-')) {
      const op = /** @type {'+' | '-'} */ (/** @type {{ op: string }} */ (tokens[pos++]).op);
      left = { kind: 'bin', op, left, right: term() };
    }
    return left;
  }
  /** @returns {Node} */
  function term() {
    let left = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = /** @type {'*' | '/'} */ (/** @type {{ op: string }} */ (tokens[pos++]).op);
        left = { kind: 'bin', op, left, right: unary() };
        continue;
      }
      const t = peek();
      // An implicit product: 2n, 3(n + 1), n sqrt(n). A number right after
      // something else (n2) is not read as one.
      if (t && (t.type === 'name' || (t.type === 'op' && t.op === '('))) {
        left = { kind: 'bin', op: '*', left, right: power() };
        continue;
      }
      return left;
    }
  }
  /** @returns {Node} */
  function unary() {
    if (isOp('-')) {
      pos++;
      return { kind: 'neg', arg: unary() };
    }
    if (isOp('+')) {
      pos++;
      return unary();
    }
    return power();
  }
  /** @returns {Node} */
  function power() {
    const base = atom();
    if (isOp('^')) {
      pos++;
      return { kind: 'bin', op: '^', left: base, right: unary() };
    }
    return base;
  }
  /** @returns {Node} */
  function atom() {
    const t = peek();
    if (!t) throw new Error('Công thức còn thiếu ở cuối.');
    pos++;
    if (t.type === 'num') return { kind: 'num', value: t.value };
    if (t.type === 'name' && t.name === 'sqrt') {
      expect('(');
      const arg = expr();
      expect(')');
      return { kind: 'sqrt', arg };
    }
    if (t.type === 'name') return { kind: 'var', name: t.name };
    if (t.op === '(') {
      const inner = expr();
      expect(')');
      return inner;
    }
    throw new Error(`Dấu "${t.op}" đặt chưa đúng chỗ.`);
  }

  try {
    const node = expr();
    if (pos < tokens.length) {
      const t = tokens[pos];
      throw new Error(
        t.type === 'op' && t.op === ')' ? 'Thừa dấu ngoặc đóng ")".' : 'Công thức có phần thừa.',
      );
    }
    return { ok: true, node };
  } catch (e) {
    return { ok: false, error: /** @type {Error} */ (e).message };
  }
}

/**
 * The value of a formula for the given variables (NaN or ±Infinity where it
 * is undefined).
 * @param {Node} node
 * @param {Record<string, number>} env
 * @returns {number}
 */
export function evaluate(node, env) {
  switch (node.kind) {
    case 'num':
      return node.value;
    case 'var':
      return env[node.name];
    case 'neg':
      return -evaluate(node.arg, env);
    case 'sqrt': {
      const v = evaluate(node.arg, env);
      return v < 0 ? NaN : Math.sqrt(v);
    }
    case 'bin': {
      const a = evaluate(node.left, env);
      const b = evaluate(node.right, env);
      if (node.op === '+') return a + b;
      if (node.op === '-') return a - b;
      if (node.op === '*') return a * b;
      if (node.op === '/') return b === 0 ? NaN : a / b;
      return a ** b;
    }
  }
}

/** @param {Node} node */
const isSum = (node) => node.kind === 'bin' && (node.op === '+' || node.op === '-');

/** @param {string} tex */
const paren = (tex) => `\\left(${tex}\\right)`;

/**
 * TeX of a formula, with `u` written as u_{n−1}: "2n - 1", "\dfrac{n}{n + 1}",
 * "(-1)^{n}", "2u_{n-1} + 1".
 * @param {Node} node
 * @returns {string}
 */
export function formulaTex(node) {
  switch (node.kind) {
    case 'num':
      return numTex(node.value);
    case 'var':
      return node.name === 'u' ? 'u_{n-1}' : node.name;
    case 'neg':
      return `-${isSum(node.arg) ? paren(formulaTex(node.arg)) : formulaTex(node.arg)}`;
    case 'sqrt':
      return `\\sqrt{${formulaTex(node.arg)}}`;
    case 'bin': {
      const { op, left, right } = node;
      if (op === '/') return `\\dfrac{${formulaTex(left)}}{${formulaTex(right)}}`;
      if (op === '^') {
        const simple = left.kind === 'var' || (left.kind === 'num' && left.value >= 0);
        const base = simple ? formulaTex(left) : paren(formulaTex(left));
        return `${base}^{${formulaTex(right)}}`;
      }
      if (op === '+' || op === '-') {
        const r = formulaTex(right);
        const wrap = right.kind === 'neg' || (op === '-' && isSum(right));
        return `${formulaTex(left)} ${op} ${wrap ? paren(r) : r}`;
      }
      // a product: 2n, 3\left(n + 1\right), n \cdot 2
      const l = isSum(left) || left.kind === 'neg' ? paren(formulaTex(left)) : formulaTex(left);
      const rightBare = right.kind === 'var' || right.kind === 'sqrt' || isSum(right);
      const r = isSum(right) || right.kind === 'neg' ? paren(formulaTex(right)) : formulaTex(right);
      const implicit = (left.kind === 'num' && rightBare) || isSum(right);
      return implicit ? `${l}${r}` : `${l} \\cdot ${r}`;
    }
  }
}

/**
 * Ready-made examples for the explorer: general terms and recurrences.
 * @type {{
 *   general: Array<{ text: string, label: string }>,
 *   recursive: Array<{ first: string, text: string, label: string }>,
 * }}
 */
export const PRESETS = {
  general: [
    { text: '2n - 1', label: 'Số lẻ' },
    { text: '1/n', label: '1/n' },
    { text: 'n/(n+1)', label: 'n/(n + 1)' },
    { text: '(-1)^n', label: '(−1)ⁿ' },
    { text: 'n^2 - 6n', label: 'n² − 6n' },
  ],
  recursive: [
    { first: '1', text: 'u + 3', label: 'Cộng 3' },
    { first: '3', text: '2u', label: 'Nhân 2' },
    { first: '1', text: '2u + 1', label: '2u + 1' },
    { first: '16', text: 'u/2', label: 'Chia đôi' },
    { first: '1', text: 'u + n', label: 'Cộng n' },
  ],
};
