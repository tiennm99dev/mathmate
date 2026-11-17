/**
 * The adaptive general review of the whole year: one part per area of the
 * book, each asking a question from a part of that area's own review, so a
 * weak area is asked again with another kind of question. Pure and
 * DOM-free.
 */
import { pick } from '#lib/core/drill.js';
import { FRACTION_OP_SKILLS } from './fraction-op-skills.js';
import { FRACTION_SKILLS } from './fraction-skills.js';
import { GEOMETRY_MEASURE_SKILLS } from './geometry-measure-skills.js';
import { NUMBER_SKILLS } from './number-skills.js';
import { OPERATION_SKILLS } from './operation-skills.js';
import { STATS_SKILLS } from './stats-skills.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/**
 * One area of the book as a single part of the review.
 * @param {string} id
 * @param {string} label
 * @param {Skill[]} parts the parts of that area's own review
 * @returns {Skill}
 */
export function areaSkill(id, label, parts) {
  return { id, label, make: (rand) => pick(rand, parts).make(rand) };
}

/** The areas of the book, in book order. */
export const GENERAL_SKILLS = [
  areaSkill('so-tu-nhien', 'Số tự nhiên', NUMBER_SKILLS),
  areaSkill('phep-tinh', 'Phép tính với số tự nhiên', OPERATION_SKILLS),
  areaSkill('phan-so', 'Phân số', FRACTION_SKILLS),
  areaSkill('phep-tinh-phan-so', 'Phép tính với phân số', FRACTION_OP_SKILLS),
  areaSkill('hinh-hoc-do-luong', 'Hình học và đo lường', GEOMETRY_MEASURE_SKILLS),
  areaSkill('thong-ke-xac-suat', 'Thống kê và xác suất', STATS_SKILLS),
];
