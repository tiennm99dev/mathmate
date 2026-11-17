/**
 * Logic of the probability tree for two independent events: two shooters
 * fire at a target independently, A = "the first hits", B = "the second
 * hits". The tree multiplies along each branch, an event adds the leaves it
 * is made of, and seeded simulations check the products against relative
 * frequencies.
 */

import { numTex, tidy } from '#lib/core/number-format.js';
import { runTrials } from '../_shared/probability.js';

/** @typedef {'AB' | 'AnB' | 'nAB' | 'nAnB'} Leaf A hits or not, then B hits or not */

/** @type {Array<{ id: Leaf, tex: string, a: boolean, b: boolean }>} */
export const LEAVES = [
  { id: 'AB', tex: 'AB', a: true, b: true },
  { id: 'AnB', tex: 'A\\overline{B}', a: true, b: false },
  { id: 'nAB', tex: '\\overline{A}B', a: false, b: true },
  { id: 'nAnB', tex: '\\overline{A}\\,\\overline{B}', a: false, b: false },
];

/**
 * The probability of each leaf: the product of the two branches on its path.
 * @param {number} p P(A)
 * @param {number} q P(B)
 * @returns {Record<Leaf, number>}
 */
export function leafProbs(p, q) {
  return {
    AB: tidy(p * q),
    AnB: tidy(p * (1 - q)),
    nAB: tidy((1 - p) * q),
    nAnB: tidy((1 - p) * (1 - q)),
  };
}

/**
 * The branch product of a leaf in TeX: '0{,}8 \cdot 0{,}3 = 0{,}24'.
 * @param {Leaf} leaf
 * @param {number} p
 * @param {number} q
 */
export function leafTex(leaf, p, q) {
  const l = LEAVES.find((x) => x.id === leaf) ?? LEAVES[0];
  const pa = numTex(tidy(l.a ? p : 1 - p));
  const pb = numTex(tidy(l.b ? q : 1 - q));
  return `${pa} \\cdot ${pb} = ${numTex(leafProbs(p, q)[leaf])}`;
}

/** @typedef {'both' | 'atLeastOne' | 'exactlyOne' | 'none'} Target */

/** @type {Array<{ value: Target, label: string, word: string, tex: string, leaves: Leaf[] }>} */
export const TARGETS = [
  {
    value: 'both',
    label: 'Cả hai trúng',
    word: 'cả hai xạ thủ bắn trúng',
    tex: 'AB',
    leaves: ['AB'],
  },
  {
    value: 'exactlyOne',
    label: 'Đúng một người trúng',
    word: 'có đúng một xạ thủ bắn trúng',
    tex: 'A\\overline{B} \\cup \\overline{A}B',
    leaves: ['AnB', 'nAB'],
  },
  {
    value: 'atLeastOne',
    label: 'Ít nhất một người trúng',
    word: 'có ít nhất một xạ thủ bắn trúng',
    tex: 'A \\cup B',
    leaves: ['AB', 'AnB', 'nAB'],
  },
  {
    value: 'none',
    label: 'Cả hai trượt',
    word: 'cả hai xạ thủ bắn trượt',
    tex: '\\overline{A}\\,\\overline{B}',
    leaves: ['nAnB'],
  },
];

/**
 * The probability of a target event and how to read it off the tree, as
 * rich text.
 * @param {Target} target
 * @param {number} p
 * @param {number} q
 */
export function targetText(target, p, q) {
  const t = TARGETS.find((x) => x.value === target) ?? TARGETS[0];
  const probs = leafProbs(p, q);
  const sum = tidy(t.leaves.reduce((s, l) => s + probs[l], 0));
  const parts = t.leaves.map((l) => numTex(probs[l]));
  const how =
    t.leaves.length === 1
      ? `nhân dọc nhánh: $${leafTex(t.leaves[0], p, q)}$`
      : `cộng các lá xung khắc: $${parts.join(' + ')} = ${numTex(sum)}$`;
  const extra =
    target === 'atLeastOne'
      ? ` Cách khác: $1 - P(\\overline{A}\\,\\overline{B}) = 1 - ${numTex(probs.nAnB)} = ${numTex(sum)}$.`
      : '';
  return `$P(${t.tex})$, xác suất ${t.word}: ${how}.${extra}`;
}

/**
 * One shot of each shooter: which leaf it lands on.
 * @param {() => number} rand
 * @param {number} p
 * @param {number} q
 * @returns {Leaf}
 */
export function shoot(rand, p, q) {
  const a = rand() < p;
  const b = rand() < q;
  return a ? (b ? 'AB' : 'AnB') : b ? 'nAB' : 'nAnB';
}

/**
 * Leaf counts of `trials` simulated rounds.
 * @param {() => number} rand
 * @param {number} trials
 * @param {number} p
 * @param {number} q
 * @returns {Record<Leaf, number>}
 */
export function simulate(rand, trials, p, q) {
  const m = runTrials(rand, trials, (r) => shoot(r, p, q));
  return {
    AB: m.get('AB') ?? 0,
    AnB: m.get('AnB') ?? 0,
    nAB: m.get('nAB') ?? 0,
    nAnB: m.get('nAnB') ?? 0,
  };
}
