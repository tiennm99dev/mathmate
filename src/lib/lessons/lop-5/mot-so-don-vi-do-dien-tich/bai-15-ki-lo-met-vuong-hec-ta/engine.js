/**
 * The map of the héc-ta lesson: a square of 1 km² cut into 100 squares of
 * 1 ha (each 100 m by 100 m). A task names a place by its area; the child
 * covers that many héc-ta on the map and the live line says the area in ha,
 * in m² and, at 100 ha, in km². Pure and DOM-free.
 */
import { fmt } from '#lib/core/number-format.js';

/** Squares of 1 ha in 1 km². */
export const FULL = 100;

/**
 * A place to cover: what it is, how its area is given and its area in ha.
 * @typedef {{ place: string, given: string, ha: number }} Task
 */

/** @type {readonly Task[]} */
export const TASKS = [
  { place: 'Một mảnh ruộng', given: '1 ha', ha: 1 },
  { place: 'Hồ Gươm', given: 'khoảng 12 ha', ha: 12 },
  { place: 'Khu vườn cây ăn quả', given: '50 000 m²', ha: 5 },
  { place: 'Một trang trại', given: '35 ha', ha: 35 },
  { place: 'Cánh đồng lúa', given: '200 000 m²', ha: 20 },
  { place: 'Khu rừng', given: 'nửa ki-lô-mét vuông', ha: 50 },
  { place: 'Cả khu đất', given: '1 km²', ha: 100 },
];

/**
 * The covered area in ha and m²: 12 → '12 ha = 120 000 m²'.
 * @param {number} ha
 */
export const haText = (ha) => `${fmt(ha)} ha = ${fmt(ha * 10_000)} m²`;

/**
 * The covered area after a press of ±1 or ±10, kept from 0 to 100.
 * @param {number} ha
 * @param {number} change
 */
export const coverBy = (ha, change) => Math.min(FULL, Math.max(0, ha + change));

/**
 * The live line for the covered area against the task.
 * @param {Task} task
 * @param {number} ha
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function coverNote(task, ha) {
  const covered = ha === FULL ? `${haText(ha)} = 1 km²` : haText(ha);
  if (ha === task.ha) {
    return { tone: 'ok', text: `Đúng rồi! ${task.place} rộng ${covered}.` };
  }
  if (ha === 0) {
    return { tone: 'info', text: 'Mỗi ô vuông là 1 ha. Em bấm nút để phủ ô lên bản đồ.' };
  }
  const way = ha < task.ha ? 'Em phủ thêm ô nhé.' : 'Em phủ nhiều quá, bớt ô đi nhé.';
  return { tone: ha > task.ha ? 'warn' : 'info', text: `Em đã phủ ${covered}. ${way}` };
}

/**
 * What the map is read as: how many squares are covered, row by row.
 * @param {number} ha
 */
export function mapLabel(ha) {
  const rows = Math.floor(ha / 10);
  const rest = ha % 10;
  const parts = [];
  if (rows) parts.push(`${rows} hàng đầy`);
  if (rest) parts.push(`${rest} ô lẻ`);
  const covered = parts.length ? `đã phủ ${parts.join(' và ')}` : 'chưa phủ ô nào';
  return `Bản đồ 1 km² gồm 100 ô vuông 1 ha, mỗi hàng 10 ô; ${covered}`;
}
