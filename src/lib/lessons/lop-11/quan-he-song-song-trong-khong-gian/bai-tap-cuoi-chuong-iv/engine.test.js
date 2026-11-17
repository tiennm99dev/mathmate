import { describe, expect, it } from 'vitest';
import { add3, sub3 } from '#lib/geom-engine/solid.js';
import { onPlane, planeThrough } from '#lib/geom-engine/space.js';
import { PRESETS, PYRAMID, judge, meetEdge, sectionOf, shapeOf } from './engine.js';

const preset = (/** @type {string} */ id) =>
  /** @type {import('./engine.js').Preset} */ (PRESETS.find((p) => p.id === id));

describe('the pyramid S.ABCD', () => {
  it('has a parallelogram base', () => {
    const { A, B, C, D } = PYRAMID;
    expect(add3(A, C)).toEqual(add3(B, D));
  });
});

describe('sections of the pyramid', () => {
  it('keeps every vertex of a section on the plane and on the pyramid', () => {
    const wrong = [];
    for (const p of PRESETS) {
      for (const t of [0.1, 0.3, 0.5, 0.7, 0.9]) {
        const s = sectionOf(
          p,
          p.given.map(() => t),
        );
        if (s.vertices.length < 3 || s.vertices.some((v) => !onPlane(v.point, s.plane)))
          wrong.push([p.id, t]);
        if (s.sides.some((x) => x.face === '')) wrong.push([p.id, t, 'side']);
      }
    }
    expect(wrong).toEqual([]);
  });

  it('cuts by a plane parallel to the base in a parallelogram', () => {
    const s = sectionOf(preset('song-song-day'), [0.4]);
    expect(s.shape).toBe('hinh-binh-hanh');
    expect(s.vertices.map((v) => v.name).join('')).toBe('MNPQ');
    expect(s.hits.filter((h) => h.hit === 'cut').map((h) => h.edge)).toEqual([
      'SA',
      'SB',
      'SC',
      'SD',
    ]);
  });

  it('cuts by a plane through M on AB parallel to SA and BC in a trapezoid', () => {
    const s = sectionOf(preset('song-song-sa-bc'), [0.4]);
    expect(s.shape).toBe('hinh-thang');
    expect(s.vertices.map((v) => `${v.name}:${v.edges[0]}`)).toEqual([
      'M:AB',
      'N:CD',
      'P:SC',
      'Q:SB',
    ]);
    expect(
      s.hits
        .filter((h) => h.hit === 'cut')
        .map((h) => h.edge)
        .sort(),
    ).toEqual(['AB', 'CD', 'SB', 'SC']);
  });

  it('gives a pentagon when two points lie on the base', () => {
    const s = sectionOf(preset('hai-diem-tren-day'), [0.4, 0.5, 0.5]);
    expect(s.shape).toBe('ngu-giac');
    expect(s.sides.map((x) => x.face).sort()).toEqual(['ABCD', 'SAB', 'SBC', 'SCD', 'SDA']);
  });

  it('gives a parallelogram when M, N, P cut the side edges in one ratio', () => {
    expect(sectionOf(preset('ba-diem-canh-ben'), [0.3, 0.3, 0.3]).shape).toBe('hinh-binh-hanh');
    expect(sectionOf(preset('ba-diem-canh-ben'), [0.5, 0.7, 0.4]).shape).toBe('tu-giac');
  });
});

describe('edges met by a plane', () => {
  it('tells a cut, a vertex and a miss apart', () => {
    const { S, A, B, D } = PYRAMID;
    const plane = /** @type {import('#lib/geom-engine/space.js').Plane} */ (
      planeThrough(D, add3(B, sub3(S, B)), add3(A, { x: 0, y: 0.5, z: 0 }))
    );
    expect(meetEdge('SD', plane).hit).toBe('vertex');
    expect(meetEdge('SB', plane).hit).toBe('vertex');
    expect(['cut', 'none']).toContain(meetEdge('AB', plane).hit);
  });

  it('judges the picked edges, letting a vertex edge be either way', () => {
    /** @type {{ edge: string, hit: import('./engine.js').EdgeHit }[]} */
    const hits = [
      { edge: 'SA', hit: 'cut' },
      { edge: 'SB', hit: 'vertex' },
      { edge: 'AB', hit: 'none' },
    ];
    expect(judge(new Set(['SA']), hits).ok).toBe(true);
    expect(judge(new Set(['SA', 'SB']), hits).ok).toBe(true);
    expect(judge(new Set(['SB']), hits)).toEqual({ ok: false, missing: ['SA'], extra: [] });
    expect(judge(new Set(['SA', 'AB']), hits).extra).toEqual(['AB']);
  });

  it('names the shape of a section', () => {
    const sq = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 1, z: 0 },
    ];
    expect(shapeOf(sq)).toBe('hinh-binh-hanh');
    expect(shapeOf([sq[0], sq[1], { x: 0.7, y: 1, z: 0 }, sq[3]])).toBe('hinh-thang');
    expect(shapeOf([sq[0], sq[1], { x: 0.7, y: 1.3, z: 0 }, sq[3]])).toBe('tu-giac');
    expect(shapeOf(sq.slice(0, 3))).toBe('tam-giac');
  });
});
