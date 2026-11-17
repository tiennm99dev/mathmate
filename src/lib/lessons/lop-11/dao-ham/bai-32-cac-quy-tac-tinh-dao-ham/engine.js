/**
 * A small derivative calculator that works the way the book does: it reads
 * an expression tree, names the rule used at each step (the table of basic
 * derivatives, a constant factor, a sum or difference, a product, a
 * quotient or the chain rule for a composite function), writes each step
 * as TeX with the parts still to be differentiated left as (u)', and builds
 * the derivative itself, lightly simplified (no factor 1, no term 0,
 * numbers multiplied out).
 */

/**
 * @typedef {'sin' | 'cos' | 'tan' | 'cot' | 'exp' | 'ln'} FnName
 * @typedef {{ t: 'num', v: number }
 *   | { t: 'x' }
 *   | { t: 'add', a: Node, b: Node }
 *   | { t: 'sub', a: Node, b: Node }
 *   | { t: 'mul', a: Node, b: Node }
 *   | { t: 'div', a: Node, b: Node }
 *   | { t: 'pow', a: Node, n: number }
 *   | { t: 'sqrt', a: Node }
 *   | { t: 'fn', name: FnName, a: Node }
 *   | { t: 'apow', base: number, a: Node }
 *   | { t: 'log', base: number, a: Node }
 *   | { t: 'lnc', base: number }} Node
 * `lnc` is the constant ln a that the derivatives of aˣ and logₐ x carry.
 */

/** @typedef {'basic' | 'const' | 'sum' | 'product' | 'quotient' | 'chain'} RuleId */

/**
 * @typedef {object} Step
 * @property {RuleId} rule
 * @property {string} target TeX of the expression differentiated, as (…)'
 * @property {string} tex TeX of the whole step, target = result
 * @property {string} [note] TeX naming y = f(u) and u, for the chain rule
 */

// ---------- building expressions ----------

export const X = /** @type {Node} */ ({ t: 'x' });
/** @param {number} v @returns {Node} */
export const num = (v) => ({ t: 'num', v });
/** @param {Node} a @param {Node} b @returns {Node} */
export const add = (a, b) => ({ t: 'add', a, b });
/** @param {Node} a @param {Node} b @returns {Node} */
export const sub = (a, b) => ({ t: 'sub', a, b });
/** @param {Node} a @param {Node} b @returns {Node} */
export const mul = (a, b) => ({ t: 'mul', a, b });
/** @param {Node} a @param {Node} b @returns {Node} */
export const div = (a, b) => ({ t: 'div', a, b });
/** @param {Node} a @param {number} n @returns {Node} */
export const pow = (a, n) => ({ t: 'pow', a, n });
/** @param {Node} a @returns {Node} */
export const sqrt = (a) => ({ t: 'sqrt', a });
/** @param {FnName} name @param {Node} a @returns {Node} */
export const fn = (name, a) => ({ t: 'fn', name, a });
/** @param {number} base @param {Node} a @returns {Node} */
export const apow = (base, a) => ({ t: 'apow', base, a });
/** @param {number} base @param {Node} a @returns {Node} */
export const log = (base, a) => ({ t: 'log', base, a });
/** @param {number} k a number times x */
const kx = (k) => mul(num(k), X);

// ---------- simplifying builders, used for derivatives ----------

/**
 * The number and the other factors of a product.
 * @param {Node} n @returns {{ k: number, fs: Node[] }}
 */
function factorsOf(n) {
  if (n.t === 'num') return { k: n.v, fs: [] };
  if (n.t === 'mul') {
    const a = factorsOf(n.a);
    const b = factorsOf(n.b);
    return { k: a.k * b.k, fs: [...a.fs, ...b.fs] };
  }
  return { k: 1, fs: [n] };
}

/** @param {number} k @param {Node[]} fs @returns {Node} */
function product(k, fs) {
  if (k === 0) return num(0);
  if (fs.length === 0) return num(k);
  const rest = fs.reduce((acc, f) => mul(acc, f));
  return k === 1 ? rest : mul(num(k), rest);
}

/** @param {Node} a @param {Node} b @returns {Node} */
export function times(a, b) {
  const p = factorsOf(a);
  const q = factorsOf(b);
  return product(p.k * q.k, [...p.fs, ...q.fs]);
}

/** @param {Node} a @param {Node} b @returns {Node} */
function plus(a, b) {
  if (a.t === 'num' && b.t === 'num') return num(a.v + b.v);
  if (a.t === 'num' && a.v === 0) return b;
  if (b.t === 'num' && b.v === 0) return a;
  return add(a, b);
}

/** @param {Node} a @param {Node} b @returns {Node} */
function minus(a, b) {
  if (a.t === 'num' && b.t === 'num') return num(a.v - b.v);
  if (b.t === 'num' && b.v === 0) return a;
  if (a.t === 'num' && a.v === 0) return times(num(-1), b);
  return sub(a, b);
}

/** @param {Node} a @param {Node} b @returns {Node} */
function over(a, b) {
  if (a.t === 'num' && a.v === 0) return num(0);
  if (b.t === 'num' && b.v === 1) return a;
  return div(a, b);
}

/** @param {Node} a @param {number} n @returns {Node} */
function power(a, n) {
  if (n === 0) return num(1);
  if (n === 1) return a;
  return pow(a, n);
}

// ---------- derivative ----------

/**
 * The derivative with respect to x, lightly simplified.
 * @param {Node} n @returns {Node}
 */
export function derive(n) {
  switch (n.t) {
    case 'num':
    case 'lnc':
      return num(0);
    case 'x':
      return num(1);
    case 'add':
      return plus(derive(n.a), derive(n.b));
    case 'sub':
      return minus(derive(n.a), derive(n.b));
    case 'mul':
      if (n.a.t === 'num') return times(n.a, derive(n.b));
      return plus(times(derive(n.a), n.b), times(n.a, derive(n.b)));
    case 'div':
      return over(minus(times(derive(n.a), n.b), times(n.a, derive(n.b))), power(n.b, 2));
    case 'pow':
      return times(times(num(n.n), derive(n.a)), power(n.a, n.n - 1));
    case 'sqrt':
      return over(derive(n.a), times(num(2), n));
    case 'apow':
      return times(times(derive(n.a), n), { t: 'lnc', base: n.base });
    case 'log':
      return over(derive(n.a), times(n.a, { t: 'lnc', base: n.base }));
    case 'fn': {
      const du = derive(n.a);
      switch (n.name) {
        case 'sin':
          return times(du, fn('cos', n.a));
        case 'cos':
          return times(num(-1), times(du, fn('sin', n.a)));
        case 'tan':
          return over(du, power(fn('cos', n.a), 2));
        case 'cot':
          return times(num(-1), over(du, power(fn('sin', n.a), 2)));
        case 'exp':
          return times(du, n);
        case 'ln':
          return over(du, n.a);
      }
    }
  }
  throw new Error('unknown node');
}

/**
 * The value of an expression at x.
 * @param {Node} n @param {number} x @returns {number}
 */
export function evaluate(n, x) {
  switch (n.t) {
    case 'num':
      return n.v;
    case 'x':
      return x;
    case 'lnc':
      return Math.log(n.base);
    case 'add':
      return evaluate(n.a, x) + evaluate(n.b, x);
    case 'sub':
      return evaluate(n.a, x) - evaluate(n.b, x);
    case 'mul':
      return evaluate(n.a, x) * evaluate(n.b, x);
    case 'div':
      return evaluate(n.a, x) / evaluate(n.b, x);
    case 'pow':
      return evaluate(n.a, x) ** n.n;
    case 'sqrt':
      return Math.sqrt(evaluate(n.a, x));
    case 'apow':
      return n.base ** evaluate(n.a, x);
    case 'log':
      return Math.log(evaluate(n.a, x)) / Math.log(n.base);
    case 'fn': {
      const u = evaluate(n.a, x);
      const f = { sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log };
      return n.name === 'cot' ? 1 / Math.tan(u) : f[n.name](u);
    }
  }
  throw new Error('unknown node');
}

// ---------- TeX ----------

/** @param {number} v */
const numText = (v) => String(v).replace('.', '{,}');

/**
 * The positive form of a term that starts with a minus sign, else null.
 * @param {Node} n @returns {Node | null}
 */
function positive(n) {
  if (n.t === 'num' && n.v < 0) return num(-n.v);
  if (n.t === 'mul') {
    const { k, fs } = factorsOf(n);
    if (k < 0) return product(-k, fs);
  }
  return null;
}

/** @param {Node} n whether a function name may stand before it with no brackets */
const bare = (n) => n.t === 'x' || (n.t === 'mul' && n.a.t === 'num' && n.b.t === 'x');

/** @param {Node} n */
const isSum = (n) => n.t === 'add' || n.t === 'sub';

/** @param {Node} n */
const isFn = (n) =>
  (n.t === 'fn' && n.name !== 'exp') ||
  n.t === 'log' ||
  n.t === 'lnc' ||
  (n.t === 'pow' && n.a.t === 'fn' && n.a.name !== 'exp');

/** @param {string} s */
const paren = (s) => `\\left(${s}\\right)`;

/** @param {Node} n the argument of a named function */
const arg = (n) => (bare(n) ? ` ${tex(n)}` : paren(tex(n)));

/**
 * TeX of an expression, the way the book writes it.
 * @param {Node} n @returns {string}
 */
export function tex(n) {
  switch (n.t) {
    case 'num':
      return n.v < 0 ? `-${numText(-n.v)}` : numText(n.v);
    case 'x':
      return 'x';
    case 'lnc':
      return `\\ln ${n.base}`;
    case 'add': {
      const p = positive(n.b);
      return p ? `${tex(n.a)} - ${side(p)}` : `${tex(n.a)} + ${tex(n.b)}`;
    }
    case 'sub': {
      const p = positive(n.b);
      return p ? `${tex(n.a)} + ${tex(p)}` : `${tex(n.a)} - ${side(n.b)}`;
    }
    case 'mul':
      return mulTex(n);
    case 'div':
      return `\\dfrac{${tex(n.a)}}{${tex(n.b)}}`;
    case 'pow': {
      if (n.a.t === 'x') return `x^${n.n}`;
      if (n.a.t === 'fn' && n.a.name !== 'exp') return `\\${n.a.name}^${n.n}${arg(n.a.a)}`;
      return `${paren(tex(n.a))}^${n.n}`;
    }
    case 'sqrt':
      return `\\sqrt{${tex(n.a)}}`;
    case 'apow':
      return `${n.base}^{${tex(n.a)}}`;
    case 'log':
      return `\\log_${n.base}${arg(n.a)}`;
    case 'fn':
      if (n.name === 'exp') return `e^{${tex(n.a)}}`;
      return `\\${n.name}${arg(n.a)}`;
  }
  throw new Error('unknown node');
}

/** @param {Node} n the right side of a difference: brackets for a sum */
const side = (n) => (isSum(n) ? paren(tex(n)) : tex(n));

/** @param {Node} n a product @returns {string} */
function mulTex(n) {
  const { k, fs } = factorsOf(n);
  let out = '';
  /** @type {Node | null} */
  let prev = null;
  for (const f of fs) {
    const t = isSum(f) ? paren(tex(f)) : tex(f);
    if (prev === null) out = t;
    else if (isFn(prev) || f.t === 'num' || f.t === 'sqrt' || f.t === 'div') out += ` \\cdot ${t}`;
    else out += t;
    prev = f;
  }
  if (fs.length === 0) return tex(num(k));
  const size = Math.abs(k);
  const head = size === 1 ? '' : numText(size);
  const glue = head !== '' && /^\d/.test(out) ? ' \\cdot ' : '';
  return `${k < 0 ? '-' : ''}${head}${glue}${out}`;
}

// ---------- steps ----------

/** @param {Node} n the derivative still to find, as (…)' */
const prime = (n) => `\\left(${tex(n)}\\right)'`;

/**
 * Whether an expression is in the table of basic derivatives as it stands:
 * a constant, x, xⁿ, √x, a function of x itself, aˣ or logₐ x.
 * @param {Node} n
 */
export function isBasic(n) {
  if (n.t === 'num' || n.t === 'x' || n.t === 'lnc') return true;
  if (n.t === 'pow' || n.t === 'sqrt' || n.t === 'fn' || n.t === 'apow' || n.t === 'log') {
    return n.a.t === 'x';
  }
  return false;
}

/**
 * Puts `inner` wherever x stands.
 * @param {Node} n @param {Node} inner @returns {Node}
 */
function substitute(n, inner) {
  switch (n.t) {
    case 'x':
      return inner;
    case 'num':
    case 'lnc':
      return n;
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
      return { t: n.t, a: substitute(n.a, inner), b: substitute(n.b, inner) };
    case 'pow':
      return pow(substitute(n.a, inner), n.n);
    case 'sqrt':
      return sqrt(substitute(n.a, inner));
    case 'fn':
      return fn(n.name, substitute(n.a, inner));
    case 'apow':
      return apow(n.base, substitute(n.a, inner));
    case 'log':
      return log(n.base, substitute(n.a, inner));
  }
  throw new Error('unknown node');
}

/**
 * The outer function of a composite y = f(u), written in u, and its
 * derivative f'(u) written back in x: for sin 3x they are 'sin u' and
 * cos 3x.
 * @param {Node} n
 * @returns {{ outer: string, outside: Node }}
 */
function outerOf(n) {
  /** @type {Node} */
  let shell;
  if (n.t === 'pow') shell = pow(X, n.n);
  else if (n.t === 'sqrt') shell = sqrt(X);
  else if (n.t === 'apow') shell = apow(n.base, X);
  else if (n.t === 'log') shell = log(n.base, X);
  else if (n.t === 'fn') shell = fn(n.name, X);
  else throw new Error('not a composite');
  const inner = /** @type {{ a: Node }} */ (n).a;
  return {
    outer: tex(shell).replace(/x/g, 'u'),
    outside: substitute(derive(shell), inner),
  };
}

/**
 * The steps that differentiate an expression, outermost rule first.
 * @param {Node} n @returns {Step[]}
 */
export function stepsOf(n) {
  /** @type {Step[]} */
  const out = [];
  /** @param {Node} e */
  const walk = (e) => {
    const target = prime(e);
    if (isBasic(e)) {
      out.push({ rule: 'basic', target, tex: `${target} = ${tex(derive(e))}` });
      return;
    }
    if (e.t === 'add' || e.t === 'sub') {
      /** @type {Array<{ sign: string, term: Node }>} */
      const terms = [];
      /** @param {Node} s @param {string} sign */
      const collect = (s, sign) => {
        if (s.t === 'add' || s.t === 'sub') {
          collect(s.a, sign);
          collect(s.b, s.t === 'sub' ? (sign === '+' ? '-' : '+') : sign);
        } else terms.push({ sign, term: s });
      };
      collect(e, '+');
      const rhs = terms
        .map(
          ({ sign, term }, i) =>
            `${i === 0 ? (sign === '-' ? '-' : '') : ` ${sign} `}${prime(term)}`,
        )
        .join('');
      out.push({ rule: 'sum', target, tex: `${target} = ${rhs}` });
      for (const { term } of terms) walk(term);
      return;
    }
    if (e.t === 'mul' && e.a.t === 'num') {
      if (isBasic(e.b)) {
        out.push({
          rule: 'const',
          target,
          tex: `${target} = ${tex(e.a)}${prime(e.b)} = ${tex(derive(e))}`,
        });
        return;
      }
      out.push({ rule: 'const', target, tex: `${target} = ${tex(e.a)}${prime(e.b)}` });
      walk(e.b);
      return;
    }
    if (e.t === 'mul') {
      out.push({
        rule: 'product',
        target,
        tex: `${target} = ${prime(e.a)} \\cdot ${side(e.b)} + ${side(e.a)} \\cdot ${prime(e.b)}`,
      });
      walk(e.a);
      walk(e.b);
      return;
    }
    if (e.t === 'div') {
      out.push({
        rule: 'quotient',
        target,
        tex: `${target} = \\dfrac{${prime(e.a)} \\cdot ${side(e.b)} - ${side(e.a)} \\cdot ${prime(e.b)}}{${tex(power(e.b, 2))}}`,
      });
      walk(e.a);
      walk(e.b);
      return;
    }
    if (e.t === 'pow' || e.t === 'sqrt' || e.t === 'fn' || e.t === 'apow' || e.t === 'log') {
      const { outer, outside } = outerOf(e);
      out.push({
        rule: 'chain',
        target,
        tex: `${target} = ${side(outside)} \\cdot ${prime(e.a)}`,
        note: `y = ${outer}, \\quad u = ${tex(e.a)}`,
      });
      walk(e.a);
      return;
    }
    throw new Error('no rule');
  };
  walk(n);
  return out;
}

// ---------- the rules and the worked expressions ----------

/** @type {Array<{ id: RuleId, name: string, tex: string }>} */
export const RULES = [
  { id: 'basic', name: 'Bảng đạo hàm', tex: "(x^n)' = nx^{n-1},\\ (\\sin x)' = \\cos x, \\ldots" },
  { id: 'const', name: 'Hằng số nhân', tex: "(ku)' = ku'" },
  { id: 'sum', name: 'Tổng, hiệu', tex: "(u \\pm v)' = u' \\pm v'" },
  { id: 'product', name: 'Tích', tex: "(uv)' = u'v + uv'" },
  {
    id: 'quotient',
    name: 'Thương',
    tex: "\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}",
  },
  { id: 'chain', name: 'Hàm hợp', tex: "y'_x = y'_u \\cdot u'_x" },
];

/** Why a rule fits, shown after a wrong pick. */
/** @type {Record<RuleId, string>} */
export const WHY = {
  basic: 'Biểu thức này có ngay trong bảng đạo hàm của các hàm số sơ cấp cơ bản (biến là $x$).',
  const: 'Biểu thức là một hằng số nhân với một hàm số: đưa hằng số ra ngoài.',
  sum: 'Phép toán cuối cùng là phép cộng hoặc trừ: tách thành đạo hàm từng số hạng.',
  product: 'Phép toán cuối cùng là phép nhân hai hàm số của $x$.',
  quotient: 'Phép toán cuối cùng là phép chia hai hàm số của $x$.',
  chain: 'Đây là hàm số của một biểu thức $u$ khác $x$: dùng quy tắc hàm hợp.',
};

/**
 * @typedef {object} Preset
 * @property {string} id
 * @property {string} label plain text for the switch
 * @property {Node} expr
 * @property {string} final the derivative after simplifying, as TeX
 * @property {(x: number) => number} check the same derivative, for tests
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    id: 'poly',
    label: 'Đa thức',
    expr: sub(add(sub(mul(num(2), pow(X, 3)), mul(num(3), pow(X, 2))), kx(5)), num(1)),
    final: '6x^2 - 6x + 5',
    check: (x) => 6 * x * x - 6 * x + 5,
  },
  {
    id: 'product',
    label: 'Tích',
    expr: mul(pow(X, 2), fn('sin', X)),
    final: '2x\\sin x + x^2\\cos x',
    check: (x) => 2 * x * Math.sin(x) + x * x * Math.cos(x),
  },
  {
    id: 'quotient',
    label: 'Thương',
    expr: div(sub(kx(2), num(1)), add(X, num(1))),
    final: '\\dfrac{3}{(x + 1)^2}',
    check: (x) => 3 / (x + 1) ** 2,
  },
  {
    id: 'power',
    label: 'Luỹ thừa của u',
    expr: pow(add(pow(X, 2), X), 8),
    final: '8(2x + 1)(x^2 + x)^7',
    check: (x) => 8 * (2 * x + 1) * (x * x + x) ** 7,
  },
  {
    id: 'root',
    label: 'Căn của u',
    expr: sqrt(add(pow(X, 2), num(1))),
    final: '\\dfrac{x}{\\sqrt{x^2 + 1}}',
    check: (x) => x / Math.sqrt(x * x + 1),
  },
  {
    id: 'trig',
    label: 'Lượng giác',
    expr: pow(fn('cos', kx(3)), 3),
    final: '-9\\cos^2 3x \\sin 3x',
    check: (x) => -9 * Math.cos(3 * x) ** 2 * Math.sin(3 * x),
  },
  {
    id: 'exp',
    label: 'Mũ nhân lôgarit',
    expr: mul(fn('exp', kx(2)), fn('ln', X)),
    final: '2e^{2x}\\ln x + \\dfrac{e^{2x}}{x}',
    check: (x) => 2 * Math.exp(2 * x) * Math.log(x) + Math.exp(2 * x) / x,
  },
  {
    id: 'log',
    label: 'Lôgarit của u',
    expr: log(2, add(add(pow(X, 2), kx(2)), num(3))),
    final: '\\dfrac{2x + 2}{(x^2 + 2x + 3)\\ln 2}',
    check: (x) => (2 * x + 2) / ((x * x + 2 * x + 3) * Math.log(2)),
  },
];
