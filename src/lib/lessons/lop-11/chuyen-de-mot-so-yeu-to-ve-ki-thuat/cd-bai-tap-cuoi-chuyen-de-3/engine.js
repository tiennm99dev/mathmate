/**
 * The matching game of the chapter review: three orthographic views are
 * given and the learner picks the solid they belong to among four, the
 * others sharing one or two of its views. A wrong pick is told which views
 * differ.
 */

import { OBJECTS, VIEW_NAMES, makeSolid, orthoView } from '../_shared/voxel.js';

/** @typedef {import('../_shared/voxel.js').Solid} Solid */
/** @typedef {import('../_shared/voxel.js').ViewKind} ViewKind */

/** The solids of the game, each with a description for screen readers. */
export const CATALOG = /** @type {Record<string, { solid: Solid, desc: string }>} */ ({
  lDung: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [0, 0, 1], [1, 2, 2]],
      ],
    ),
    desc: 'tấm đế có thành đứng bên trái chạy suốt từ trước ra sau',
  },
  lSau: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [0, 1, 1], [1, 2, 2]],
      ],
    ),
    desc: 'tấm đế có một khối vuông ở góc trái phía sau',
  },
  lTruoc: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [0, 0, 1], [1, 1, 2]],
      ],
    ),
    desc: 'tấm đế có một khối vuông ở góc trái phía trước',
  },
  lPhai: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [2, 0, 1], [3, 2, 2]],
      ],
    ),
    desc: 'tấm đế có thành đứng bên phải chạy suốt từ trước ra sau',
  },
  uSuot: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 2]],
        ['-', [1, 0, 1], [2, 2, 2]],
      ],
    ),
    desc: 'khối chữ U, rãnh giữa chạy suốt từ trước ra sau',
  },
  uTruoc: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 2]],
        ['-', [1, 0, 1], [2, 1, 2]],
      ],
    ),
    desc: 'khối hộp có hốc khoét ở giữa nửa trước mặt trên',
  },
  uSau: {
    solid: makeSolid(
      [3, 2, 2],
      [
        ['+', [0, 0, 0], [3, 2, 2]],
        ['-', [1, 1, 1], [2, 2, 2]],
      ],
    ),
    desc: 'khối hộp có hốc khoét ở giữa nửa sau mặt trên',
  },
  hop: {
    solid: makeSolid([4, 3, 2], [['+', [0, 0, 0], [4, 3, 2]]]),
    desc: 'khối hộp chữ nhật đặc',
  },
  ranhSau: { solid: OBJECTS.ranhSau, desc: 'khối hộp có rãnh khoét suốt chiều cao ở giữa mặt sau' },
  ranhTruoc: {
    solid: makeSolid(
      [4, 3, 2],
      [
        ['+', [0, 0, 0], [4, 3, 2]],
        ['-', [1, 0, 0], [3, 1, 2]],
      ],
    ),
    desc: 'khối hộp có rãnh khoét suốt chiều cao ở giữa mặt trước',
  },
  lo: {
    solid: makeSolid(
      [4, 3, 2],
      [
        ['+', [0, 0, 0], [4, 3, 2]],
        ['-', [1, 1, 0], [3, 2, 2]],
      ],
    ),
    desc: 'khối hộp có lỗ vuông xuyên từ trên xuống ở giữa',
  },
  bacThang: { solid: OBJECTS.bacThang, desc: 'bậc thang ba bậc cao dần về bên trái' },
  bacPhai: {
    solid: makeSolid(
      [3, 2, 3],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [1, 0, 1], [3, 2, 2]],
        ['+', [2, 0, 2], [3, 2, 3]],
      ],
    ),
    desc: 'bậc thang ba bậc cao dần về bên phải',
  },
  bacSau: {
    solid: makeSolid(
      [3, 2, 3],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [0, 1, 1], [2, 2, 2]],
        ['+', [0, 1, 2], [1, 2, 3]],
      ],
    ),
    desc: 'tấm đế, phía sau có các bậc cao dần về bên trái',
  },
  bacHai: {
    solid: makeSolid(
      [3, 2, 3],
      [
        ['+', [0, 0, 0], [3, 2, 1]],
        ['+', [0, 0, 1], [1, 2, 3]],
        ['+', [1, 0, 1], [2, 2, 2]],
      ],
    ),
    desc: 'bậc thang có cột cao bên trái và một bậc ở giữa',
  },
});

/** The rounds: the solid whose views are shown and the four choices. */
export const ROUNDS = [
  { target: 'lSau', options: ['lDung', 'lTruoc', 'lSau', 'lPhai'] },
  { target: 'uTruoc', options: ['uSuot', 'uTruoc', 'uSau', 'lDung'] },
  { target: 'ranhSau', options: ['ranhTruoc', 'hop', 'lo', 'ranhSau'] },
  { target: 'bacSau', options: ['bacSau', 'bacThang', 'bacPhai', 'bacHai'] },
  { target: 'uSuot', options: ['uSau', 'lPhai', 'uSuot', 'uTruoc'] },
];

export const KINDS = /** @type {ViewKind[]} */ (['front', 'top', 'side']);

/**
 * A view as a comparable text: its size and its lines cut into unit
 * segments, with (`styled`) or without telling visible from hidden lines.
 * @param {Solid} s
 * @param {ViewKind} kind
 * @param {boolean} [styled]
 */
export function viewKey(s, kind, styled = true) {
  const v = orthoView(s, kind);
  const units = [];
  for (const l of v.lines) {
    const n = Math.abs(l.u2 - l.u1) + Math.abs(l.v2 - l.v1);
    const du = Math.sign(l.u2 - l.u1);
    const dv = Math.sign(l.v2 - l.v1);
    for (let i = 0; i < n; i++)
      units.push(`${styled && l.hidden ? 'h' : 'v'}${l.u1 + du * i},${l.v1 + dv * i},${du},${dv}`);
  }
  return `${v.width}x${v.height}:${units.sort().join(' ')}`;
}

/**
 * The views in which solid `pick` differs from solid `target`.
 * @param {string} pick
 * @param {string} target
 * @returns {ViewKind[]}
 */
export function differingViews(pick, target) {
  const a = CATALOG[pick].solid;
  const b = CATALOG[target].solid;
  return KINDS.filter((k) => viewKey(a, k) !== viewKey(b, k));
}

/**
 * The verdict on a pick. A wrong pick is told which views match, which
 * differ only in what is hidden (nét đứt) and which differ in shape.
 * @param {string} pick
 * @param {string} target
 * @returns {{ ok: boolean, text: string }}
 */
export function judgePick(pick, target) {
  const diff = differingViews(pick, target);
  if (!diff.length)
    return {
      ok: true,
      text: 'Đúng: cả ba hình chiếu của vật thể này trùng với ba hình chiếu đã cho.',
    };
  const a = CATALOG[pick].solid;
  const b = CATALOG[target].solid;
  const dashes = diff.filter((k) => viewKey(a, k, false) === viewKey(b, k, false));
  const shape = diff.filter((k) => !dashes.includes(k));
  const same = KINDS.filter((k) => !diff.includes(k));
  const names = (/** @type {ViewKind[]} */ ks) =>
    ks.map((k) => VIEW_NAMES[k].toLowerCase()).join(', ');
  const parts = ['Chưa đúng.'];
  if (same.length) parts.push(`Vật thể này có ${names(same)} giống hình đã cho.`);
  if (dashes.length)
    parts.push(
      `Ở ${names(dashes)}, các nét giống nhau về vị trí nhưng nét nào thấy, nét nào khuất (nét đứt) lại khác.`,
    );
  if (shape.length)
    parts.push(`${names(shape)[0].toUpperCase()}${names(shape).slice(1)} có nét khác hình đã cho.`);
  return { ok: false, text: parts.join(' ') };
}

/**
 * The three views in words for screen readers: the size of each view in
 * cells and how many visible and hidden lines it has.
 * @param {Solid} s
 */
export function viewsWords(s) {
  return KINDS.map((k) => {
    const v = orthoView(s, k);
    const hidden = v.lines.filter((l) => l.hidden).length;
    return `${VIEW_NAMES[k]} rộng ${v.width} ô, cao ${v.height} ô, có ${v.lines.length - hidden} nét liền và ${hidden} nét đứt`;
  }).join('; ');
}
