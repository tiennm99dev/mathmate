/**
 * Counting the book's way: n!, the numbers of permutations $P_n$,
 * arrangements $A_n^k$ and combinations $C_n^k$, the lists they count, the
 * rows of Pascal's triangle and the expansion of $(px + q)^n$.
 */

/**
 * n! = 1 · 2 · … · n, with 0! = 1.
 * @param {number} n
 */
export function factorial(n) {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/**
 * $A_n^k = n(n − 1)…(n − k + 1)$, the number of ordered picks of k out of n.
 * @param {number} n @param {number} k
 */
export function arrangeCount(n, k) {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

/**
 * $C_n^k = \dfrac{n!}{k!(n − k)!}$, the number of k-element subsets of n.
 * @param {number} n @param {number} k
 */
export function chooseCount(n, k) {
  if (k < 0 || k > n) return 0;
  return arrangeCount(n, k) / factorial(k);
}

/**
 * Every ordered pick of k items (no repeats), in lexicographic order of the
 * item positions.
 * @template T
 * @param {readonly T[]} items @param {number} k
 * @returns {T[][]}
 */
export function arrangements(items, k) {
  if (k === 0) return [[]];
  /** @type {T[][]} */
  const out = [];
  items.forEach((first, i) => {
    const rest = items.filter((_, j) => j !== i);
    for (const tail of arrangements(rest, k - 1)) out.push([first, ...tail]);
  });
  return out;
}

/**
 * Every k-element subset, each listed in the order of `items`.
 * @template T
 * @param {readonly T[]} items @param {number} k
 * @returns {T[][]}
 */
export function combinations(items, k) {
  if (k === 0) return [[]];
  if (items.length < k) return [];
  const [first, ...rest] = items;
  return [...combinations(rest, k - 1).map((c) => [first, ...c]), ...combinations(rest, k)];
}

/**
 * Row n of Pascal's triangle: $C_n^0, C_n^1, …, C_n^n$.
 * @param {number} n
 */
export function pascalRow(n) {
  return Array.from({ length: n + 1 }, (_, k) => chooseCount(n, k));
}

/**
 * The product written out for TeX, falling factors joined by a centred dot:
 * `5 \cdot 4 \cdot 3`.
 * @param {number} from first factor @param {number} count how many factors
 */
export function fallingTex(from, count) {
  return Array.from({ length: count }, (_, i) => from - i).join(' \\cdot ');
}

/**
 * The coefficients of $(px + q)^n$, highest power of x first: entry k is the
 * coefficient of $x^{n-k}$, that is $C_n^k p^{n-k} q^k$.
 * @param {number} n @param {number} p @param {number} q
 */
export function expandCoefficients(n, p, q) {
  return pascalRow(n).map((c, k) => c * p ** (n - k) * q ** k);
}

/**
 * A polynomial in x from its coefficients, highest power first, as TeX:
 * `x^4 - 8x^3 + 24x^2 - 32x + 16`. Zero terms are left out.
 * @param {number[]} coefs
 * @param {string} [v] the variable
 */
export function polyTex(coefs, v = 'x') {
  const n = coefs.length - 1;
  let out = '';
  coefs.forEach((c, k) => {
    if (c === 0) return;
    const power = n - k;
    const abs = Math.abs(c);
    const body =
      power === 0 ? String(abs) : `${abs === 1 ? '' : abs}${v}${power === 1 ? '' : `^${power}`}`;
    if (out === '') out = c < 0 ? `-${body}` : body;
    else out += c < 0 ? ` - ${body}` : ` + ${body}`;
  });
  return out === '' ? '0' : out;
}

/**
 * A power of a letter for a term of the expansion: '' for power 0, `a` for
 * 1, `a^3` otherwise.
 * @param {string} base @param {number} power
 */
export function powerTex(base, power) {
  if (power === 0) return '';
  return power === 1 ? base : `${base}^${power}`;
}

/**
 * $(a + b)^n$ expanded with its numbers: `a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4`.
 * @param {number} n
 */
export function symbolicTex(n) {
  return pascalRow(n)
    .map((c, k) => `${c === 1 ? '' : c}${powerTex('a', n - k)}${powerTex('b', k)}` || '1')
    .join(' + ');
}

/**
 * $(a + b)^n$ expanded with the combination numbers: `C_4^0a^4 + C_4^1a^3b + …`.
 * @param {number} n
 */
export function combinationTex(n) {
  return pascalRow(n)
    .map((_, k) => `C_{${n}}^{${k}}${powerTex('a', n - k)}${powerTex('b', k)}`)
    .join(' + ');
}
