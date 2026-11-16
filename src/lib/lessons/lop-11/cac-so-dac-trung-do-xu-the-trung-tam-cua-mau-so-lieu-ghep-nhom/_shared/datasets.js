/**
 * Raw samples the chapter groups in its widgets, sorted ascending so a
 * learner can check a count by eye.
 */

/**
 * @typedef {object} RawSample
 * @property {string} id
 * @property {string} title what was measured, for labels
 * @property {string} unit the unit of a value ('cm', 'điểm')
 * @property {number[]} values
 * @property {number} start the left end of the first group to start with
 * @property {{ min: number, max: number, step: number }} starts left ends a
 *   learner may pick; `max` is the smallest value
 * @property {number[]} widths group lengths worth trying; the middle one
 *   is the one to start with
 */

/** @type {RawSample} */
export const HEIGHTS = {
  id: 'chieu-cao',
  title: 'Chiều cao (cm) của 40 học sinh lớp 11',
  unit: 'cm',
  values: [
    152, 155, 157, 158, 159, 160, 160, 161, 162, 162, 163, 163, 164, 164, 165, 165, 165, 166, 166,
    167, 167, 168, 168, 168, 168, 169, 170, 170, 171, 171, 172, 172, 173, 174, 175, 175, 176, 177,
    178, 180,
  ],
  start: 150,
  starts: { min: 145, max: 152, step: 1 },
  widths: [2, 3, 4, 5, 6, 8, 10],
};

/** @type {RawSample} */
export const SCORES = {
  id: 'diem-thi',
  title: 'Điểm kiểm tra môn Toán của 40 học sinh',
  unit: 'điểm',
  values: [
    3.5, 4, 4.5, 5, 5, 5.5, 5.5, 6, 6, 6, 6, 6.5, 6.5, 6.5, 7, 7, 7, 7, 7, 7.5, 7.5, 7.5, 7.5, 7.5,
    8, 8, 8, 8, 8, 8, 8.5, 8.5, 8.5, 8.5, 9, 9, 9, 9.5, 9.5, 10,
  ],
  start: 3,
  starts: { min: 2, max: 3.5, step: 0.5 },
  widths: [0.5, 1, 2],
};

export const SAMPLES = [HEIGHTS, SCORES];
