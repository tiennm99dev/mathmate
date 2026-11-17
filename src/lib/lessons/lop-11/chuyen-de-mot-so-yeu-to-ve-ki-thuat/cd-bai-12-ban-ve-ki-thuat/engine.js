/**
 * The drawing board of a U-shaped bearing block (gối đỡ chữ U): its three
 * views drawn by the first-angle method in millimetres of paper (y down),
 * the line types of TCVN drawings, which line type each line of the drawing
 * takes, and the check of which dimensions a complete drawing needs.
 *
 * The block is 50 mm long, 30 mm wide and 40 mm high; a channel 30 mm wide
 * and 20 mm deep runs from front to back in the middle of its top, and a
 * hole of diameter 10 mm goes through the base in the middle of the channel.
 */

/** @typedef {'thick' | 'dashed' | 'center' | 'thin'} LineType */

/** The line types of a technical drawing, as the book names and uses them. */
export const LINE_TYPES = /** @type {Record<LineType, { name: string, use: string }>} */ ({
  thick: { name: 'Nét liền đậm', use: 'đường bao thấy, cạnh thấy' },
  dashed: { name: 'Nét đứt mảnh', use: 'đường bao khuất, cạnh khuất' },
  center: { name: 'Nét gạch dài – chấm – mảnh', use: 'đường tâm, trục đối xứng' },
  thin: { name: 'Nét liền mảnh', use: 'đường kích thước, đường gióng' },
});

export const TYPE_ORDER = /** @type {LineType[]} */ (['thick', 'dashed', 'center', 'thin']);

/**
 * @typedef {object} Element
 * @property {number} n number shown on the drawing
 * @property {LineType} type the right line type
 * @property {[number, number, number, number][]} lines segments x1, y1, x2, y2
 * @property {[number, number, number][]} circles cx, cy, r
 * @property {[number, number]} mark where the number is written
 * @property {string} what what the line shows, the hint after a wrong choice
 */

/** The lines of the drawing the learner gives a line type. */
export const ELEMENTS = /** @type {Element[]} */ ([
  {
    n: 1,
    type: 'thick',
    lines: [
      [20, 60, 70, 60],
      [70, 60, 70, 20],
      [70, 20, 60, 20],
      [60, 20, 60, 40],
      [60, 40, 30, 40],
      [30, 40, 30, 20],
      [30, 20, 20, 20],
      [20, 20, 20, 60],
    ],
    circles: [],
    mark: [76, 24],
    what: 'Nét 1 là đường bao của hình chiếu đứng, nhìn thấy được từ phía trước.',
  },
  {
    n: 2,
    type: 'dashed',
    lines: [
      [40, 40, 40, 60],
      [50, 40, 50, 60],
    ],
    circles: [],
    mark: [35, 51],
    what: 'Nét 2 là thành lỗ trên hình chiếu đứng; lỗ nằm bên trong đáy nên nhìn từ trước bị che khuất.',
  },
  {
    n: 3,
    type: 'center',
    lines: [[45, 35, 45, 65]],
    circles: [],
    mark: [45, 70],
    what: 'Nét 3 là trục của lỗ tròn, cũng là trục đối xứng của hình chiếu đứng.',
  },
  {
    n: 4,
    type: 'thick',
    lines: [
      [20, 85, 70, 85],
      [70, 85, 70, 115],
      [70, 115, 20, 115],
      [20, 115, 20, 85],
      [30, 85, 30, 115],
      [60, 85, 60, 115],
    ],
    circles: [],
    mark: [15, 89],
    what: 'Nét 4 là đường bao và mép trên hai thành rãnh, nhìn thấy được từ trên xuống.',
  },
  {
    n: 5,
    type: 'thick',
    lines: [],
    circles: [[45, 100, 5]],
    mark: [54, 108],
    what: 'Nét 5 là miệng lỗ ở đáy rãnh; nhìn từ trên xuống, không có gì che nó.',
  },
  {
    n: 6,
    type: 'center',
    lines: [
      [37, 100, 53, 100],
      [45, 92, 45, 108],
    ],
    circles: [],
    mark: [57, 100],
    what: 'Nét 6 là hai đường tâm của lỗ tròn trên hình chiếu bằng.',
  },
  {
    n: 7,
    type: 'thick',
    lines: [
      [95, 20, 125, 20],
      [125, 20, 125, 60],
      [125, 60, 95, 60],
      [95, 60, 95, 20],
    ],
    circles: [],
    mark: [130, 24],
    what: 'Nét 7 là đường bao của hình chiếu cạnh, nhìn thấy được từ bên trái.',
  },
  {
    n: 8,
    type: 'dashed',
    lines: [[95, 40, 125, 40]],
    circles: [],
    mark: [100, 35],
    what: 'Nét 8 là đáy rãnh; nhìn từ bên trái, thành bên trái che mất đáy rãnh.',
  },
  {
    n: 9,
    type: 'dashed',
    lines: [
      [105, 40, 105, 60],
      [115, 40, 115, 60],
    ],
    circles: [],
    mark: [100, 51],
    what: 'Nét 9 là thành lỗ trên hình chiếu cạnh; lỗ nằm trong đáy nên bị che khuất.',
  },
  {
    n: 10,
    type: 'center',
    lines: [[110, 35, 110, 65]],
    circles: [],
    mark: [110, 70],
    what: 'Nét 10 là trục của lỗ trên hình chiếu cạnh.',
  },
  {
    n: 11,
    type: 'thin',
    lines: [
      [20, 117, 20, 126],
      [70, 117, 70, 126],
      [20, 124, 70, 124],
    ],
    circles: [],
    mark: [76, 124],
    what: 'Nét 11 gồm đường kích thước và hai đường gióng của kích thước chiều dài.',
  },
]);

/**
 * The verdict on giving element `n` the line type `type`.
 * @param {number} n
 * @param {LineType} type
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeLine(n, type) {
  const e = ELEMENTS.find((x) => x.n === n);
  if (!e) return { ok: false, text: '' };
  if (e.type === type)
    return {
      ok: true,
      text: `Đúng: nét ${n} vẽ bằng ${LINE_TYPES[type].name.toLowerCase()} (${LINE_TYPES[type].use}).`,
    };
  return {
    ok: false,
    text: `Chưa đúng: ${LINE_TYPES[type].name.toLowerCase()} dùng cho ${LINE_TYPES[type].use}. ${e.what}`,
  };
}

/**
 * @typedef {object} Dim
 * @property {string} id
 * @property {string} text the dimension figure, in millimetres
 * @property {string} label the toggle button's label
 * @property {'h' | 'v' | 'dia'} kind horizontal, vertical or diameter
 * @property {number[]} at h: [x1, x2, y, yFrom]; v: [y1, y2, x, xFrom]; dia: the leader
 * @property {string} need what the dimension fixes, or '' for one not needed
 * @property {string} why why a dimension not needed should go
 */

/** The dimensions the learner may put on the drawing. */
export const DIMS = /** @type {Dim[]} */ ([
  {
    id: 'dai',
    text: '50',
    label: '50: chiều dài',
    kind: 'h',
    at: [20, 70, 124, 115],
    need: 'chiều dài của gối',
    why: '',
  },
  {
    id: 'cao',
    text: '40',
    label: '40: chiều cao (hình chiếu đứng)',
    kind: 'v',
    at: [20, 60, 10, 20],
    need: 'chiều cao của gối',
    why: '',
  },
  {
    id: 'rong',
    text: '30',
    label: '30: chiều rộng',
    kind: 'v',
    at: [85, 115, 10, 20],
    need: 'chiều rộng của gối',
    why: '',
  },
  {
    id: 'ranh',
    text: '30',
    label: '30: chiều rộng rãnh',
    kind: 'h',
    at: [30, 60, 12, 20],
    need: 'chiều rộng của rãnh',
    why: '',
  },
  {
    id: 'sau',
    text: '20',
    label: '20: chiều sâu rãnh',
    kind: 'v',
    at: [20, 40, 36, 30],
    need: 'chiều sâu của rãnh',
    why: '',
  },
  {
    id: 'lo',
    text: 'Ø10',
    label: 'Ø10: đường kính lỗ',
    kind: 'dia',
    at: [45, 100, 5],
    need: 'đường kính của lỗ',
    why: '',
  },
  {
    id: 'caoLap',
    text: '40',
    label: '40: chiều cao (hình chiếu cạnh)',
    kind: 'v',
    at: [20, 60, 133, 125],
    need: '',
    why: 'Chiều cao $40$ ghi lại lần thứ hai trên hình chiếu cạnh: mỗi kích thước chỉ ghi một lần trên bản vẽ.',
  },
  {
    id: 'thanh',
    text: '10',
    label: '10: bề dày thành rãnh',
    kind: 'h',
    at: [20, 30, 12, 20],
    need: '',
    why: 'Bề dày thành $10$ suy ra được: rãnh nằm chính giữa nên mỗi thành dày $(50 - 30) : 2 = 10$; không ghi kích thước thừa.',
  },
]);

/** The dimensions shown when the board opens: an incomplete, cluttered start. */
export const START_DIMS = ['dai', 'caoLap', 'thanh'];

/**
 * Checks a set of dimensions: every needed size must be there, none twice
 * and none that follows from the others.
 * @param {string[]} chosen dimension ids
 * @returns {{ tone: 'ok' | 'warn', text: string, complete: boolean }}
 */
export function checkDims(chosen) {
  const set = new Set(chosen);
  const missing = DIMS.filter((d) => d.need && !set.has(d.id)).map((d) => d.need);
  const extra = DIMS.filter((d) => !d.need && set.has(d.id)).map((d) => d.why);
  const parts = [];
  if (missing.length) parts.push(`Chưa đầy đủ: bản vẽ chưa cho biết ${missing.join(', ')}.`);
  parts.push(...extra);
  if (!parts.length)
    return {
      tone: 'ok',
      text: 'Bản vẽ đáp ứng nguyên tắc đầy đủ: đọc được mọi kích thước của gối đỡ, mỗi kích thước ghi đúng một lần.',
      complete: true,
    };
  return { tone: 'warn', text: parts.join(' '), complete: false };
}
