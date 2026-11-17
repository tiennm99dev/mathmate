/**
 * The two boards of the practical lesson "Thực hành và trải nghiệm đo, vẽ,
 * lắp ghép, tạo hình".
 *
 * The picture: a house made, as in the book, of a trapezoid roof, a
 * rectangle wall, a triangle mountain and a round sun, drawn on paper ruled
 * in 1 cm squares. The child changes the measures of each part and reads its
 * area, the wall's perimeter, the sun's circumference and the paper needed
 * for the whole picture, the sum of the parts.
 *
 * The puzzles: pieces cut from the shapes of the chapter, put together into
 * a new shape whose area is the sum of the pieces and also given by its own
 * formula. Pure and DOM-free.
 */
import { tidy } from '#lib/core/number-format.js';
import {
  circleArea,
  circleAreaWork,
  circumference,
  circumferenceWork,
  num,
  trapezoidArea,
  trapezoidWork,
  triangleArea,
  triangleWork,
} from '../_shared/figures.js';

/* --------------------------------------------------------------- picture */

/** SVG units per 1 cm square of the paper. */
export const CELL = 20;
export const COLS = 22;
export const ROWS = 16;
export const PIC_W = COLS * CELL;
export const PIC_H = ROWS * CELL;
/** The ground line, the middle of the house, the centre of the sun (cells). */
export const GROUND = 15;
export const HOUSE_X = 14;
export const SUN = { x: 3.5, y: 3.5 };

/**
 * The measures of the picture, in cm.
 * @typedef {{
 *   roofA: number, roofB: number, roofH: number,
 *   wallW: number, wallH: number,
 *   hillA: number, hillH: number,
 *   sunR: number,
 * }} House
 */

/** @type {House} */
export const START = {
  roofA: 10,
  roofB: 4,
  roofH: 3,
  wallW: 8,
  wallH: 6,
  hillA: 6,
  hillH: 5,
  sunR: 1,
};

/**
 * One measure the child can change: its part, name, range and unit.
 * @typedef {{ key: keyof House, name: string, min: (h: House) => number, max: (h: House) => number }} Measure
 */

/**
 * The parts of the picture and the measures of each.
 * @type {Readonly<Record<'roof' | 'wall' | 'hill' | 'sun', { title: string, measures: Measure[] }>>}
 */
export const PARTS = {
  roof: {
    title: 'Mái nhà (hình thang)',
    measures: [
      {
        key: 'roofA',
        name: 'đáy lớn',
        min: (h) => Math.max(h.wallW, h.roofB + 1, 4),
        max: () => 14,
      },
      { key: 'roofB', name: 'đáy bé', min: () => 1, max: (h) => h.roofA - 1 },
      { key: 'roofH', name: 'chiều cao', min: () => 1, max: () => 5 },
    ],
  },
  wall: {
    title: 'Thân nhà (hình chữ nhật)',
    measures: [
      { key: 'wallW', name: 'chiều ngang', min: () => 2, max: (h) => h.roofA },
      { key: 'wallH', name: 'chiều cao', min: () => 2, max: () => 7 },
    ],
  },
  hill: {
    title: 'Ngọn núi (hình tam giác)',
    measures: [
      { key: 'hillA', name: 'đáy', min: () => 2, max: () => 8 },
      { key: 'hillH', name: 'chiều cao', min: () => 1, max: () => 7 },
    ],
  },
  sun: {
    title: 'Mặt trời (hình tròn)',
    measures: [{ key: 'sunR', name: 'bán kính', min: () => 1, max: () => 3 }],
  },
};

/** @typedef {keyof typeof PARTS} Part */

/**
 * The picture with one measure changed, kept in the range the other
 * measures allow, so the wall never gets wider than the roof.
 * @param {House} h
 * @param {keyof House} key
 * @param {number} value
 * @returns {House}
 */
export function setMeasure(h, key, value) {
  const m = Object.values(PARTS)
    .flatMap((p) => p.measures)
    .find((q) => q.key === key);
  if (!m) return h;
  return { ...h, [key]: Math.min(m.max(h), Math.max(m.min(h), Math.round(value))) };
}

/**
 * Where each part sits on the paper, in cells.
 * @param {House} h
 */
export function layout(h) {
  const wallTop = GROUND - h.wallH;
  const roofTop = wallTop - h.roofH;
  return {
    wall: { x: HOUSE_X - h.wallW / 2, y: wallTop, w: h.wallW, h: h.wallH },
    roof: [
      { x: HOUSE_X - h.roofA / 2, y: wallTop },
      { x: HOUSE_X + h.roofA / 2, y: wallTop },
      { x: HOUSE_X + h.roofB / 2, y: roofTop },
      { x: HOUSE_X - h.roofB / 2, y: roofTop },
    ],
    hill: [
      { x: 1, y: GROUND },
      { x: 1 + h.hillA, y: GROUND },
      { x: 1 + h.hillA / 2, y: GROUND - h.hillH },
    ],
    sun: { x: SUN.x, y: SUN.y, r: h.sunR },
  };
}

/**
 * The areas of the parts and of the whole picture, in cm².
 * @param {House} h
 */
export function areasOf(h) {
  const roof = trapezoidArea(h.roofA, h.roofB, h.roofH);
  const wall = h.wallW * h.wallH;
  const hill = triangleArea(h.hillA, h.hillH);
  const sun = circleArea(h.sunR);
  return { roof, wall, hill, sun, total: tidy(roof + wall + hill + sun) };
}

/**
 * The working shown for each part.
 * @param {House} h
 * @returns {Record<Part, string>}
 */
export function workOf(h) {
  return {
    roof: `S = ${trapezoidWork(h.roofA, h.roofB, h.roofH)} (cm²)`,
    wall: `S = ${h.wallW} × ${h.wallH} = ${h.wallW * h.wallH} (cm²); chu vi (${h.wallW} + ${h.wallH}) × 2 = ${(h.wallW + h.wallH) * 2} (cm)`,
    hill: `S = ${triangleWork(h.hillA, h.hillH)} (cm²)`,
    sun: `S = ${circleAreaWork(h.sunR)} (cm²); chu vi ${circumferenceWork(h.sunR * 2)} (cm)`,
  };
}

/**
 * The paper needed for the whole picture: the sum of the parts.
 * @param {House} h
 */
export function totalWork(h) {
  const a = areasOf(h);
  return `${num(a.roof)} + ${num(a.wall)} + ${num(a.hill)} + ${num(a.sun)} = ${num(a.total)} (cm²)`;
}

/**
 * A challenge for the picture.
 * @typedef {{ part: Part, text: string, done: (h: House) => boolean, tip: string }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  {
    part: 'roof',
    text: 'Em làm mái nhà như trong sách: đáy bé 6 cm, đáy lớn 12 cm, chiều cao 3 cm.',
    done: (h) => h.roofA === 12 && h.roofB === 6 && h.roofH === 3,
    tip: 'Mái nhà như trong sách có diện tích (12 + 6) × 3 : 2 = 27 (cm²).',
  },
  {
    part: 'roof',
    text: 'Em làm mái nhà hình thang có diện tích 20 cm².',
    done: (h) => areasOf(h).roof === 20,
    tip: 'Tổng hai đáy nhân chiều cao phải bằng 40, chẳng hạn (12 + 8) × 2 hoặc (8 + 2) × 4.',
  },
  {
    part: 'wall',
    text: 'Em làm thân nhà có chu vi 24 cm và diện tích 32 cm².',
    done: (h) => (h.wallW + h.wallH) * 2 === 24 && h.wallW * h.wallH === 32,
    tip: 'Chiều ngang cộng chiều cao bằng 12, chiều ngang nhân chiều cao bằng 32.',
  },
  {
    part: 'hill',
    text: 'Em làm ngọn núi hình tam giác có diện tích 12 cm².',
    done: (h) => areasOf(h).hill === 12,
    tip: 'Đáy nhân chiều cao phải bằng 24, chẳng hạn 6 × 4 hoặc 8 × 3.',
  },
  {
    part: 'sun',
    text: 'Em làm mặt trời có chu vi 12,56 cm.',
    done: (h) => circumference(h.sunR * 2) === 12.56,
    tip: 'C = d × 3,14. Đường kính bằng bao nhiêu thì chu vi là 12,56 cm?',
  },
];

/**
 * The live line for a challenge.
 * @param {Task} task
 * @param {House} h
 * @returns {{ tone: 'ok' | 'info', text: string }}
 */
export function taskNote(task, h) {
  if (task.done(h)) return { tone: 'ok', text: `Đúng rồi! ${workOf(h)[task.part]}.` };
  return { tone: 'info', text: task.tip };
}

/**
 * What the picture is read as.
 * @param {House} h
 */
export function pictureLabel(h) {
  return `Bức tranh trên giấy kẻ ô vuông 1 cm. Mái nhà hình thang: đáy lớn ${h.roofA} cm, đáy bé ${h.roofB} cm, chiều cao ${h.roofH} cm. Thân nhà hình chữ nhật ${h.wallW} cm × ${h.wallH} cm. Ngọn núi hình tam giác: đáy ${h.hillA} cm, chiều cao ${h.hillH} cm. Mặt trời hình tròn bán kính ${h.sunR} cm.`;
}

/* --------------------------------------------------------------- puzzles */

/** @type {readonly import('#lib/core/kid/tangram.js').Puzzle[]} */
export const PUZZLES = [
  {
    id: 'hinh-thang',
    title: 'Hình thang',
    goal: 'Ghép 2 hình tam giác vuông và 1 hình vuông thành hình thang. Mỗi ô vuông là 1 cm².',
    done: 'Diện tích hình thang bằng tổng diện tích các mảnh: 2 + 4 + 2 = 8 (cm²). Tính theo công thức: (6 + 2) × 2 : 2 = 8 (cm²).',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 0 },
        { x: 6, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f87171', rot: 0 },
      { shape: 'square', color: '#fbbf24', rot: 0 },
      { shape: 'tri2', color: '#60a5fa', rot: 1 },
    ],
  },
  {
    id: 'hinh-thang-vuong',
    title: 'Hình thang vuông',
    goal: 'Ghép 1 hình vuông và 1 hình tam giác vuông thành hình thang vuông.',
    done: 'Diện tích: 4 + 2 = 6 (cm²). Tính theo công thức: (4 + 2) × 2 : 2 = 6 (cm²).',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#34d399', rot: 0 },
      { shape: 'square', color: '#a78bfa', rot: 0 },
    ],
  },
  {
    id: 'tam-giac',
    title: 'Tam giác to',
    goal: 'Ghép 2 hình tam giác vuông bằng nhau thành một hình tam giác to.',
    done: 'Diện tích: 2 + 2 = 4 (cm²). Tam giác to có đáy 4 cm, chiều cao 2 cm: 4 × 2 : 2 = 4 (cm²).',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f472b6', rot: 0 },
      { shape: 'tri2', color: '#fbbf24', rot: 0 },
    ],
  },
  {
    id: 'hinh-vuong',
    title: 'Hình vuông',
    goal: 'Ghép 2 hình tam giác vuông bằng nhau thành hình vuông.',
    done: 'Diện tích: 2 + 2 = 4 (cm²), đúng bằng 2 × 2 = 4 (cm²). Chu vi hình vuông: 2 × 4 = 8 (cm).',
    target: [
      [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#60a5fa', rot: 1 },
      { shape: 'tri2', color: '#f87171', rot: 1 },
    ],
  },
  {
    id: 'binh-hanh',
    title: 'Hình bình hành',
    goal: 'Ghép 2 hình tam giác vuông và 1 hình vuông thành hình bình hành.',
    done: 'Diện tích: 2 + 4 + 2 = 8 (cm²). Hình bình hành có đáy 4 cm, chiều cao 2 cm: 4 × 2 = 8 (cm²).',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 6, y: 0 },
        { x: 4, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#34d399', rot: 2 },
      { shape: 'square', color: '#fbbf24', rot: 0 },
      { shape: 'tri2', color: '#f472b6', rot: 3 },
    ],
  },
  {
    id: 'ngoi-nha',
    title: 'Ngôi nhà',
    goal: 'Ghép 2 hình tam giác vuông làm mái và 1 hình vuông làm thân nhà.',
    done: 'Mái nhà là tam giác đáy 4 cm, cao 2 cm: 4 × 2 : 2 = 4 (cm²). Thân nhà: 2 × 2 = 4 (cm²). Cả ngôi nhà: 4 + 4 = 8 (cm²).',
    target: [
      [
        { x: 0, y: 2 },
        { x: 2, y: 0 },
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 3, y: 4 },
        { x: 1, y: 4 },
        { x: 1, y: 2 },
      ],
    ],
    pieces: [
      { shape: 'tri2', color: '#f87171', rot: 1 },
      { shape: 'square', color: '#fde68a', rot: 0 },
      { shape: 'tri2', color: '#f87171', rot: 3 },
    ],
  },
];
