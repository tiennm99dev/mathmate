import { add3, cross3, dot3, mul3, sub3 } from '#lib/geom-engine/solid.js';
import { isZero3, parallel3 } from '#lib/geom-engine/space.js';
import { coordTex } from '#lib/geom-engine/space-tex.js';

/** @typedef {import('#lib/geom-engine/space.js').P3} P3 */
/** @typedef {'trung' | 'song-song' | 'cat' | 'cheo'} Relation */

/** Largest coordinate a stepper of the widget reaches. */
export const LIMIT = 2;

/** How the book names each relative position. @type {Record<Relation, string>} */
export const RELATION_NAMES = {
  trung: 'trùng nhau',
  'song-song': 'song song',
  cat: 'cắt nhau',
  cheo: 'chéo nhau',
};

/**
 * The relative position of the line Δ through m with direction u and the
 * line Δ' through m2 with direction u2, the book's way: compare u and u'
 * first, then the sign of [u, u'] · MM'. Returns null when a direction is
 * the zero vector. For crossing lines `meet` is the common point.
 * @param {P3} m @param {P3} u @param {P3} m2 @param {P3} u2
 */
export function relate(m, u, m2, u2) {
  if (isZero3(u) || isZero3(u2)) return null;
  const mm = sub3(m2, m);
  const c = cross3(u, u2);
  const mix = dot3(c, mm);
  /** @type {Relation} */
  let relation;
  /** @type {P3 | null} */
  let meet = null;
  if (isZero3(c)) {
    relation = parallel3(mm, u) ? 'trung' : 'song-song';
  } else if (mix === 0) {
    relation = 'cat';
    // M + t·u = M' + s·u'  ⇒  t = ((MM' × u') · (u × u')) / |u × u'|².
    const t = dot3(cross3(mm, u2), c) / dot3(c, c);
    meet = add3(m, mul3(u, t));
  } else {
    relation = 'cheo';
  }
  return {
    relation,
    meet,
    mix,
    perpendicular: dot3(u, u2) === 0,
    cross: c,
    mm,
    crossTex: `[\\vec{u}, \\vec{u}'] = ${coordTex(c)}`,
    mmTex: `\\overrightarrow{MM'} = ${coordTex(mm)}`,
    mixTex: `[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = ${mix}`,
  };
}

/** Ready-made pairs, one for each position: Δ' as { m, u }. */
export const PRESETS = /** @type {Record<Relation, { m: P3, u: P3 }>} */ ({
  'song-song': { m: { x: 0, y: 2, z: 0 }, u: { x: 2, y: 0, z: 2 } },
  cat: { m: { x: 1, y: -2, z: 0 }, u: { x: 0, y: 2, z: 1 } },
  cheo: { m: { x: 0, y: -1, z: 2 }, u: { x: 0, y: 2, z: 0 } },
  trung: { m: { x: 2, y: 0, z: 2 }, u: { x: -1, y: 0, z: -1 } },
});
