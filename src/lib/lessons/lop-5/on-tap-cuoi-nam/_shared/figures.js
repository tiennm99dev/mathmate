/**
 * The drawings of `figure-picture.svelte`, on a 240 × 170 board: the corners
 * of each plane shape to name, the shapes with their given lengths and the
 * two solids (a box and a cube) drawn with their front, top and side faces.
 * Pure data.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ x: number, y: number, r: number }} Circle
 * @typedef {{ x: number, y: number, anchor: 'start' | 'middle' | 'end' }} Spot
 */

/** @type {Record<import('./visual.js').Shape, { pts: Pt[], marks: string[] }>} */
export const SHAPE_POINTS = {
  'tam-giac-nhon': {
    pts: [
      { x: 130, y: 30 },
      { x: 40, y: 140 },
      { x: 200, y: 140 },
    ],
    marks: [],
  },
  'tam-giac-vuong': {
    pts: [
      { x: 50, y: 40 },
      { x: 50, y: 140 },
      { x: 200, y: 140 },
    ],
    marks: ['M 50 126 H 64 V 140'],
  },
  'tam-giac-tu': {
    pts: [
      { x: 215, y: 45 },
      { x: 25, y: 140 },
      { x: 150, y: 140 },
    ],
    marks: [],
  },
  'hinh-thang': {
    pts: [
      { x: 70, y: 40 },
      { x: 165, y: 40 },
      { x: 215, y: 135 },
      { x: 25, y: 135 },
    ],
    marks: [],
  },
  'hinh-binh-hanh': {
    pts: [
      { x: 75, y: 40 },
      { x: 215, y: 40 },
      { x: 165, y: 135 },
      { x: 25, y: 135 },
    ],
    marks: [],
  },
  'hinh-thoi': {
    pts: [
      { x: 120, y: 22 },
      { x: 208, y: 85 },
      { x: 120, y: 148 },
      { x: 32, y: 85 },
    ],
    marks: [],
  },
  'hinh-chu-nhat': {
    pts: [
      { x: 35, y: 40 },
      { x: 205, y: 40 },
      { x: 205, y: 130 },
      { x: 35, y: 130 },
    ],
    marks: ['M 35 54 H 49 V 40', 'M 205 116 H 191 V 130'],
  },
  'hinh-vuong': {
    pts: [
      { x: 75, y: 35 },
      { x: 165, y: 35 },
      { x: 165, y: 125 },
      { x: 75, y: 125 },
    ],
    marks: ['M 75 49 H 89 V 35', 'M 165 111 H 151 V 125'],
  },
};

/**
 * Shapes with their given lengths: the outline, the extra lines (a dashed
 * height, a radius or a diameter), the right-angle marks and where each label
 * goes, in the order the labels are given.
 * @type {Record<import('./visual.js').MeasuredShape, {
 *   pts: Pt[],
 *   circle?: Circle,
 *   lines: { from: Pt, to: Pt, dashed: boolean }[],
 *   marks: string[],
 *   labelAt: Spot[],
 * }>}
 */
export const MEASURED = {
  'tam-giac': {
    pts: [
      { x: 90, y: 25 },
      { x: 30, y: 125 },
      { x: 210, y: 125 },
    ],
    lines: [{ from: { x: 90, y: 25 }, to: { x: 90, y: 125 }, dashed: true }],
    marks: ['M 90 113 H 102 V 125'],
    labelAt: [
      { x: 120, y: 147, anchor: 'middle' },
      { x: 84, y: 78, anchor: 'end' },
    ],
  },
  'hinh-thang': {
    pts: [
      { x: 75, y: 35 },
      { x: 165, y: 35 },
      { x: 215, y: 120 },
      { x: 25, y: 120 },
    ],
    lines: [{ from: { x: 75, y: 35 }, to: { x: 75, y: 120 }, dashed: true }],
    marks: ['M 75 108 H 87 V 120'],
    labelAt: [
      { x: 120, y: 142, anchor: 'middle' },
      { x: 120, y: 22, anchor: 'middle' },
      { x: 69, y: 80, anchor: 'end' },
    ],
  },
  'hinh-chu-nhat': {
    pts: [
      { x: 35, y: 40 },
      { x: 205, y: 40 },
      { x: 205, y: 125 },
      { x: 35, y: 125 },
    ],
    lines: [],
    marks: [],
    labelAt: [
      { x: 120, y: 147, anchor: 'middle' },
      { x: 211, y: 83, anchor: 'start' },
    ],
  },
  'hinh-vuong': {
    pts: [
      { x: 75, y: 30 },
      { x: 165, y: 30 },
      { x: 165, y: 120 },
      { x: 75, y: 120 },
    ],
    lines: [],
    marks: [],
    labelAt: [{ x: 120, y: 142, anchor: 'middle' }],
  },
  'ban-kinh': {
    pts: [],
    circle: { x: 120, y: 85, r: 62 },
    lines: [{ from: { x: 120, y: 85 }, to: { x: 182, y: 85 }, dashed: false }],
    marks: [],
    labelAt: [{ x: 151, y: 73, anchor: 'middle' }],
  },
  'duong-kinh': {
    pts: [],
    circle: { x: 120, y: 85, r: 62 },
    lines: [{ from: { x: 58, y: 85 }, to: { x: 182, y: 85 }, dashed: false }],
    marks: [],
    labelAt: [{ x: 120, y: 73, anchor: 'middle' }],
  },
};

/**
 * The solids: the front face, the depth step to the back face, and where
 * each label goes (box: length, width, height; cube: edge).
 * @type {Record<import('./visual.js').SolidShape, {
 *   front: { x: number, y: number, w: number, h: number },
 *   depth: Pt,
 *   labelAt: Spot[],
 * }>}
 */
export const SOLIDS = {
  hop: {
    front: { x: 52, y: 62, w: 120, h: 78 },
    depth: { x: 38, y: -32 },
    labelAt: [
      { x: 112, y: 157, anchor: 'middle' },
      { x: 197, y: 132, anchor: 'start' },
      { x: 46, y: 101, anchor: 'end' },
    ],
  },
  'lap-phuong': {
    front: { x: 62, y: 58, w: 88, h: 88 },
    depth: { x: 36, y: -30 },
    labelAt: [{ x: 106, y: 162, anchor: 'middle' }],
  },
};

/**
 * The three visible faces of a solid as point lists: front, top and side.
 * @param {import('./visual.js').SolidShape} shape
 * @returns {Pt[][]}
 */
export function solidFaces(shape) {
  const { front: f, depth: d } = SOLIDS[shape];
  const a = { x: f.x, y: f.y };
  const b = { x: f.x + f.w, y: f.y };
  const c = { x: f.x + f.w, y: f.y + f.h };
  const e = { x: f.x, y: f.y + f.h };
  /** @param {Pt} p */
  const back = (p) => ({ x: p.x + d.x, y: p.y + d.y });
  return [
    [a, b, c, e],
    [a, b, back(b), back(a)],
    [b, c, back(c), back(b)],
  ];
}
