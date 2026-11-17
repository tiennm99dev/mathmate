/**
 * The drawings of `figure-picture.svelte`, on a 240 × 170 board: the corners
 * of each plane shape, the triangles with a height and the shapes with their
 * given lengths. Vertices are listed in the order their names are given
 * (A, B, C, D going round the shape). Pure data.
 *
 * @typedef {{ x: number, y: number }} Pt
 * @typedef {{ x: number, y: number, r: number }} Circle
 * @typedef {{ x: number, y: number, anchor: 'start' | 'middle' | 'end' }} Spot
 */

/**
 * @type {Record<import('./visual.js').Shape, { pts: Pt[], circle?: Circle, marks: string[] }>}
 */
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
  'tam-giac-deu': {
    pts: [
      { x: 120, y: 24 },
      { x: 50, y: 145 },
      { x: 190, y: 145 },
    ],
    marks: ['M 79.8 81.5 L 90.2 87.5', 'M 160.2 81.5 L 149.8 87.5', 'M 120 139 V 151'],
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
  'hinh-thang-vuong': {
    pts: [
      { x: 45, y: 40 },
      { x: 150, y: 40 },
      { x: 210, y: 135 },
      { x: 45, y: 135 },
    ],
    marks: ['M 45 54 H 59 V 40', 'M 45 121 H 59 V 135'],
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
      { x: 120, y: 18 },
      { x: 190, y: 85 },
      { x: 120, y: 152 },
      { x: 50, y: 85 },
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
  'hinh-tron': { pts: [], circle: { x: 120, y: 85, r: 62 }, marks: [] },
};

/**
 * Triangles with a height: the apex first, then the two ends of the base,
 * the foot of the height, its right-angle mark and where each name goes.
 * @type {Record<'nhon' | 'vuong', { pts: Pt[], foot: Pt | null, mark: string, labelAt: Pt[] }>}
 */
export const HEIGHT_POINTS = {
  nhon: {
    pts: [
      { x: 85, y: 30 },
      { x: 30, y: 140 },
      { x: 210, y: 140 },
    ],
    foot: { x: 85, y: 140 },
    mark: 'M 85 128 H 97 V 140',
    labelAt: [
      { x: 85, y: 16 },
      { x: 20, y: 152 },
      { x: 222, y: 152 },
      { x: 85, y: 157 },
    ],
  },
  vuong: {
    pts: [
      { x: 50, y: 30 },
      { x: 50, y: 140 },
      { x: 205, y: 140 },
    ],
    foot: null,
    mark: 'M 50 126 H 64 V 140',
    labelAt: [
      { x: 50, y: 16 },
      { x: 38, y: 154 },
      { x: 217, y: 152 },
    ],
  },
};

/**
 * Shapes with their given lengths: the outline, the extra lines (a dashed
 * height, a radius or a diameter), the right-angle marks and where each label
 * goes, in the order the labels are given.
 * @type {Record<import('./visual.js').MeasuredShape, {
 *   pts: Pt[],
 *   circle?: Circle,
 *   half?: boolean,
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
  'nua-tron': {
    pts: [],
    circle: { x: 120, y: 125, r: 95 },
    half: true,
    lines: [{ from: { x: 120, y: 125 }, to: { x: 215, y: 125 }, dashed: false }],
    marks: [],
    labelAt: [{ x: 167, y: 145, anchor: 'middle' }],
  },
};
