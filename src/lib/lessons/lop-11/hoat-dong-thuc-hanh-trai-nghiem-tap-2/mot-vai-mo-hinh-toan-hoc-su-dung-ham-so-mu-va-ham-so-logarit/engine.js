/**
 * Exponential and logarithmic models of the grade 11 KNTT activity: growth
 * and decay A(t) = A₀·e^(rt), fitting r from data through ln A, the half-life
 * rate, and the three logarithmic scales (pH, Richter magnitude, sound level
 * in decibels).
 */

/**
 * The exponential model A(t) = A₀·e^(rt): growth when r > 0, decay when r < 0.
 * @param {number} a0 @param {number} r @param {number} t
 */
export function growth(a0, r, t) {
  return a0 * Math.exp(r * t);
}

/**
 * The rate r through two measurements: A₂/A₁ = e^(r(t₂ − t₁)), so
 * r = ln(A₂/A₁)/(t₂ − t₁).
 * @param {number} t1 @param {number} a1 @param {number} t2 @param {number} a2
 */
export function rateFromTwo(t1, a1, t2, a2) {
  return Math.log(a2 / a1) / (t2 - t1);
}

/**
 * The decay rate of a substance with half-life T: e^(kT) = 1/2, k = −ln 2 / T.
 * @param {number} halfLife
 */
export function halfLifeRate(halfLife) {
  return -Math.LN2 / halfLife;
}

/**
 * The time at which A₀·e^(rt) reaches `a`: t = ln(a/A₀)/r.
 * @param {number} a0 @param {number} r @param {number} a
 */
export function timeToReach(a0, r, a) {
  return Math.log(a / a0) / r;
}

/** @typedef {{ t: number, a: number }} Point */

/**
 * The model that fits the data best on the ln scale: ln A = ln A₀ + r·t is a
 * line, fitted by least squares.
 * @param {readonly Point[]} data
 * @returns {{ a0: number, r: number }}
 */
export function bestFit(data) {
  const n = data.length;
  const mt = data.reduce((s, p) => s + p.t, 0) / n;
  const ml = data.reduce((s, p) => s + Math.log(p.a), 0) / n;
  let num = 0;
  let den = 0;
  for (const p of data) {
    num += (p.t - mt) * (Math.log(p.a) - ml);
    den += (p.t - mt) ** 2;
  }
  const r = num / den;
  return { a0: Math.exp(ml - r * mt), r };
}

/**
 * How far a model is from the data: the mean of |model − data| / data, as a
 * percentage.
 * @param {readonly Point[]} data @param {number} a0 @param {number} r
 */
export function fitError(data, a0, r) {
  const sum = data.reduce((s, p) => s + Math.abs(growth(a0, r, p.t) - p.a) / p.a, 0);
  return (sum / data.length) * 100;
}

/**
 * @typedef {object} Dataset
 * @property {string} id
 * @property {string} label the choice button
 * @property {string} title what is measured
 * @property {string} tName the time unit
 * @property {string} aName the unit of A
 * @property {Point[]} data
 * @property {{ min: number, max: number, step: number }} a0Range
 */

/** @type {readonly Dataset[]} */
export const DATASETS = [
  {
    id: 'vi-khuan',
    label: 'Vi khuẩn',
    title: 'Số vi khuẩn trong một mẫu nuôi cấy',
    tName: 'giờ',
    aName: 'nghìn con',
    data: [
      { t: 0, a: 2 },
      { t: 1, a: 2.9 },
      { t: 2, a: 4 },
      { t: 3, a: 5.6 },
      { t: 4, a: 8.2 },
      { t: 5, a: 11.4 },
      { t: 6, a: 16.5 },
    ],
    a0Range: { min: 0.5, max: 5, step: 0.1 },
  },
  {
    id: 'thuoc',
    label: 'Thuốc trong máu',
    title: 'Nồng độ một loại thuốc trong máu',
    tName: 'giờ',
    aName: 'mg/l',
    data: [
      { t: 0, a: 20 },
      { t: 1, a: 16.5 },
      { t: 2, a: 13.3 },
      { t: 3, a: 11.1 },
      { t: 4, a: 8.9 },
      { t: 5, a: 7.4 },
      { t: 6, a: 6 },
    ],
    a0Range: { min: 10, max: 30, step: 0.5 },
  },
  {
    id: 'c14',
    label: 'Carbon-14',
    title: 'Phần trăm carbon-14 còn lại trong một mẫu gỗ',
    tName: 'nghìn năm',
    aName: '%',
    data: [
      { t: 0, a: 100 },
      { t: 5, a: 54.6 },
      { t: 10, a: 29.8 },
      { t: 15, a: 16.3 },
      { t: 20, a: 8.9 },
      { t: 25, a: 4.9 },
      { t: 30, a: 2.7 },
    ],
    a0Range: { min: 50, max: 150, step: 1 },
  },
];

/**
 * The verdict on a fit: good under 5 % mean error, close under 15 %.
 * @param {number} error mean relative error in percent
 * @returns {'tot' | 'gan' | 'xa'}
 */
export function fitLevel(error) {
  if (error < 5) return 'tot';
  if (error < 15) return 'gan';
  return 'xa';
}

/** The book's threshold of hearing I₀ = 10⁻¹² W/m². */
export const I0 = 1e-12;

/**
 * pH = −log[H⁺], with [H⁺] in mol/l.
 * @param {number} h
 */
export function pH(h) {
  return -Math.log10(h);
}

/**
 * Richter magnitude M = log(A/A₀) = log A − log A₀.
 * @param {number} ratio A/A₀
 */
export function richter(ratio) {
  return Math.log10(ratio);
}

/**
 * Sound level L = 10·log(I/I₀) in decibels.
 * @param {number} intensity in W/m²
 */
export function decibel(intensity) {
  return 10 * Math.log10(intensity / I0);
}

/**
 * @typedef {object} Scale
 * @property {'ph' | 'richter' | 'db'} id
 * @property {string} label
 * @property {string} quantity the measured quantity, plain text
 * @property {string} unit unit of the quantity
 * @property {string} scaleName the name of the scale value
 * @property {number} lo lowest exponent of the quantity (log₁₀)
 * @property {number} hi highest exponent
 * @property {number} start starting exponent
 * @property {(e: number) => number} value the scale value from the exponent
 * @property {number} perDecade change of the scale when the quantity is ×10
 * @property {Array<{ at: number, name: string }>} marks landmarks on the scale
 */

/** @type {readonly Scale[]} */
export const SCALES = [
  {
    id: 'ph',
    label: 'Độ pH',
    quantity: 'Nồng độ ion hydrogen [H⁺]',
    unit: 'mol/l',
    scaleName: 'pH',
    lo: -14,
    hi: 0,
    start: -7,
    value: (e) => -e,
    perDecade: -1,
    marks: [
      { at: 2.3, name: 'nước chanh' },
      { at: 7, name: 'nước cất' },
    ],
  },
  {
    id: 'richter',
    label: 'Độ Richter',
    quantity: 'Biên độ so với biên độ chuẩn A/A₀',
    unit: '',
    scaleName: 'M',
    lo: 0,
    hi: 9.5,
    start: 5,
    value: (e) => e,
    perDecade: 1,
    marks: [{ at: 8.3, name: 'San Francisco 1906' }],
  },
  {
    id: 'db',
    label: 'Decibel',
    quantity: 'Cường độ âm I',
    unit: 'W/m²',
    scaleName: 'L',
    lo: -12,
    hi: 1,
    start: -6,
    value: (e) => 10 * (e + 12),
    perDecade: 10,
    marks: [
      { at: 0, name: 'ngưỡng nghe' },
      { at: 73, name: 'giao thông' },
    ],
  },
];

/**
 * A positive number as m × 10^k with 1 ≤ m < 10, m rounded to `digits`
 * decimals; m = 10 after rounding moves to the next power.
 * @param {number} exponent log₁₀ of the number
 * @param {number} [digits]
 * @returns {{ m: number, k: number }}
 */
export function scientific(exponent, digits = 1) {
  let k = Math.floor(exponent + 1e-9);
  let m = Math.round(10 ** (exponent - k) * 10 ** digits) / 10 ** digits;
  if (m >= 10) {
    m /= 10;
    k += 1;
  }
  return { m, k };
}
