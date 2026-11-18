import { dot3 } from '#lib/geom-engine/solid.js';
import { P, same3 } from '#lib/geom-engine/space.js';
import { sqrtTex } from '#lib/geom-engine/space-tex.js';

/**
 * A classroom placed in the system Oxyz, one metre a unit: the origin O at a
 * floor corner, the length along Ox, the width along Oy and the height along
 * Oz. Objects in the room have whole coordinates to find.
 */

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */

export const ROOM = { length: 8, width: 6, height: 4 };

/** The eight corners of the room and its twelve edges. */
export const ROOM_CORNERS = [0, 1, 2, 3, 4, 5, 6, 7].map((m) =>
  P(m & 1 ? ROOM.length : 0, m & 2 ? ROOM.width : 0, m & 4 ? ROOM.height : 0),
);

export const ROOM_EDGES = /** @type {[number, number][]} */ (
  [0, 1, 2, 3, 4, 5, 6, 7].flatMap((m) =>
    [1, 2, 4].filter((bit) => !(m & bit)).map((bit) => [m, m | bit]),
  )
);

/**
 * The objects to locate, with where they are in words.
 * @type {{ id: string, name: string, where: string, at: P3 }[]}
 */
export const OBJECTS = [
  {
    id: 'den',
    name: 'Bóng đèn',
    where: 'gắn ở tâm của trần nhà',
    at: P(4, 3, 4),
  },
  {
    id: 'goc-tran',
    name: 'Thiết bị báo cháy',
    where: 'ở góc trần đối diện với góc $O$',
    at: P(8, 6, 4),
  },
  {
    id: 'o-dien',
    name: 'Ổ điện',
    where: 'trên bức tường thuộc mặt phẳng $(Ozx)$, cao $1$ m',
    at: P(5, 0, 1),
  },
  {
    id: 'dong-ho',
    name: 'Đồng hồ treo tường',
    where: 'trên bức tường thuộc mặt phẳng $(Oyz)$, ở chính giữa chiều rộng, cao $3$ m',
    at: P(0, 3, 3),
  },
  {
    id: 'ban',
    name: 'Góc bàn giáo viên',
    where:
      'là góc mặt bàn (cao $1$ m) xa bức tường thuộc mặt phẳng $(Oyz)$ nhất và gần bức tường đối diện với mặt phẳng $(Ozx)$ nhất',
    at: P(3, 5, 1),
  },
  {
    id: 'camera',
    name: 'Camera',
    where: 'gắn ở mép trần, ngay trên trục $Ox$',
    at: P(6, 0, 4),
  },
  {
    id: 'tam-san',
    name: 'Tâm sàn nhà',
    where: 'là giao điểm hai đường chéo của sàn',
    at: P(4, 3, 0),
  },
];

/** The teacher's desk drawn in the room: a box from DESK_LOW to DESK_HIGH. */
export const DESK_LOW = P(1, 4, 0);
export const DESK_HIGH = P(3, 5, 1);

/**
 * The edges of a box between two opposite corners, as pairs of points.
 * @param {P3} lo @param {P3} hi
 */
export function boxLines(lo, hi) {
  /** @param {number} m */
  const c = (m) => P(m & 1 ? hi.x : lo.x, m & 2 ? hi.y : lo.y, m & 4 ? hi.z : lo.z);
  return ROOM_EDGES.map(([a, b]) => ({ key: `${a}-${b}`, from: c(a), to: c(b) }));
}

/**
 * The distance from O to a point, exactly: the TeX of the working and the
 * value in metres.
 * @param {P3} p
 */
export function distanceFromO(p) {
  const n = dot3(p, p);
  return {
    tex: `OM = \\sqrt{${p.x}^2 + ${p.y}^2 + ${p.z}^2} = ${n === 0 ? '0' : sqrtTex(n) === `\\sqrt{${n}}` ? `\\sqrt{${n}}` : `\\sqrt{${n}} = ${sqrtTex(n)}`}`,
    value: Math.sqrt(n),
  };
}

/**
 * The coordinates the learner set that are wrong, by name.
 * @param {P3} m @param {P3} t
 */
export function wrongNames(m, t) {
  if (same3(m, t)) return [];
  return [
    m.x !== t.x ? 'hoành độ' : null,
    m.y !== t.y ? 'tung độ' : null,
    m.z !== t.z ? 'cao độ' : null,
  ].filter((s) => s !== null);
}
