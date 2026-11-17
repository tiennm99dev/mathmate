/**
 * Two models of the chapter review: population growth S(t) = A·e^(rt) and
 * radioactive decay m(t) = m₀·(1/2)^(t/T). The time to reach a target comes
 * from a logarithm: the doubling time ln 2 / r, and the time T·log₂(100/p)
 * for the mass to fall to p% of m₀.
 */

/**
 * @typedef {object} Model
 * @property {string} id
 * @property {string} label
 */

/** The models the widget switches between. */
export const MODELS = [
  { id: 'growth', label: 'Tăng dân số' },
  { id: 'decay', label: 'Phân rã phóng xạ' },
];

/**
 * Population after t years: S(t) = A·e^(rt), r as a fraction per year.
 * @param {number} A @param {number} r @param {number} t
 */
export const population = (A, r, t) => A * Math.exp(r * t);

/**
 * Years for the population to reach k times its start: t = ln k / r.
 * @param {number} r @param {number} k
 */
export const timeToGrow = (r, k) => Math.log(k) / r;

/**
 * Mass left after t years: m(t) = m₀·(1/2)^(t/T), T the half-life.
 * @param {number} m0 @param {number} T @param {number} t
 */
export const mass = (m0, T, t) => m0 * 0.5 ** (t / T);

/**
 * Years for the mass to fall to p% of m₀: (1/2)^(t/T) = p/100, so
 * t = T·log₂(100/p).
 * @param {number} T @param {number} p
 */
export const timeToFall = (T, p) => T * Math.log2(100 / p);
