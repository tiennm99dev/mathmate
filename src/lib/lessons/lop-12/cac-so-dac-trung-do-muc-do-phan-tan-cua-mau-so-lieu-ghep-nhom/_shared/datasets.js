/**
 * Raw samples the review lesson groups, sorted ascending so a learner can
 * check a count by eye.
 */

/**
 * @typedef {object} RawSample
 * @property {string} id
 * @property {string} label short name on the switch
 * @property {string} title what was measured
 * @property {string} unit the unit of a value ('cm', 'giây')
 * @property {number[]} values
 * @property {number} start the left end of the first group, at most the smallest value
 * @property {number[]} widths group lengths worth trying; the middle one is
 *   the one to start with
 */

/** @type {RawSample} */
export const HEIGHTS = {
  id: 'chieu-cao',
  label: 'Chiều cao',
  title: 'Chiều cao (cm) của 40 học sinh lớp 12',
  unit: 'cm',
  values: [
    148, 152, 154, 155, 156, 157, 158, 158, 159, 160, 160, 161, 161, 162, 162, 163, 163, 164, 164,
    164, 165, 165, 166, 166, 167, 167, 168, 168, 169, 170, 170, 171, 172, 173, 174, 175, 176, 178,
    180, 183,
  ],
  start: 145,
  widths: [4, 5, 10],
};

/** @type {RawSample} */
export const SPRINT = {
  id: 'chay-100m',
  label: 'Chạy 100 m',
  title: 'Thời gian chạy 100 m (giây) của 30 học sinh nam',
  unit: 'giây',
  values: [
    12.6, 13, 13.2, 13.4, 13.5, 13.7, 13.8, 13.9, 14, 14.1, 14.2, 14.2, 14.3, 14.4, 14.5, 14.5,
    14.6, 14.7, 14.8, 14.9, 15, 15.1, 15.3, 15.4, 15.6, 15.8, 16, 16.3, 16.9, 17.4,
  ],
  start: 12.5,
  widths: [0.5, 1, 1.5],
};

export const SAMPLES = [HEIGHTS, SPRINT];
