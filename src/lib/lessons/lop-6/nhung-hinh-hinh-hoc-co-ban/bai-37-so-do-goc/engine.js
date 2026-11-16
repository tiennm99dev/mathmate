/**
 * Logic of the virtual protractor: which way the ray Oy points for a given
 * measure (`#lib/core/visuals/protractor.js`), how a typed reading is judged,
 * and new angles to read.
 */

/**
 * Judges a reading typed by the learner.
 * @param {number} m the true measure, in degrees
 * @param {number | null} typed
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeReading(m, typed) {
  if (typed === null || !Number.isFinite(typed))
    return { ok: false, text: 'Hãy nhập số đo góc là một số từ 0 đến 180.' };
  if (typed === m) return { ok: true, text: `Đúng rồi! Góc xOy có số đo ${m}°.` };
  if (typed === 180 - m)
    return {
      ok: false,
      text: 'Em đọc nhầm thang chia. Hãy đọc trên thang có vạch 0 nằm ở cạnh Ox.',
    };
  if (Math.abs(typed - m) <= 2)
    return {
      ok: false,
      text: 'Gần đúng rồi. Nhìn kĩ vạch chia nhỏ (mỗi vạch 1°) mà cạnh Oy đi qua.',
    };
  return {
    ok: false,
    text: 'Chưa đúng. Đếm từ vạch 0 ở cạnh Ox theo chiều tới cạnh Oy, đọc số ở vạch cạnh Oy đi qua.',
  };
}

/**
 * Reads a typed measure: a whole number, optionally followed by a degree
 * sign or the word "độ".
 * @param {string} text
 * @returns {number | null}
 */
export function readDegrees(text) {
  const t = text.trim().replace(/\s*(°|độ|do)$/i, '');
  return /^\d{1,3}$/.test(t) ? Number(t) : null;
}

/**
 * A new whole-degree measure from 5° to 175° to read, different from `avoid`.
 * @param {() => number} rand @param {number} avoid
 */
export function newMeasure(rand, avoid) {
  for (;;) {
    const m = 5 + Math.floor(rand() * 171);
    if (m !== avoid) return m;
  }
}
