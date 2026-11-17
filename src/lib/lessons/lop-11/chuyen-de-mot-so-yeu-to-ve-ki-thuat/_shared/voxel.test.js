import { describe, expect, it } from 'vitest';
import {
  ISOMETRIC,
  OBJECTS,
  axisInfo,
  has,
  makeSolid,
  orthoView,
  sameSolid,
  solidFaces,
  turnQuarter,
  volume,
} from './voxel.js';

/** @param {ReturnType<typeof orthoView>} v */
const text = (v) =>
  v.lines
    .map((l) => `${l.hidden ? 'H' : 'V'}${l.u1},${l.v1}-${l.u2},${l.v2}`)
    .sort()
    .join(' ');

describe('makeSolid', () => {
  it('adds and cuts boxes in order', () => {
    expect(volume(OBJECTS.giaChuU)).toBe(60 - 18);
    expect(has(OBJECTS.giaChuU, 2, 1, 3)).toBe(false);
    expect(has(OBJECTS.giaChuU, 0, 1, 3)).toBe(true);
    expect(has(OBJECTS.giaChuU, -1, 0, 0)).toBe(false);
  });
});

describe('orthoView', () => {
  it('draws the U stand: no hidden line in front, the channel floor hidden from the left', () => {
    const front = orthoView(OBJECTS.giaChuU, 'front');
    expect(front.lines.some((l) => l.hidden)).toBe(false);
    expect(text(front)).toBe(
      [
        'V0,0-0,4',
        'V0,0-5,0',
        'V0,4-1,4',
        'V1,2-1,4',
        'V1,2-4,2',
        'V4,2-4,4',
        'V4,4-5,4',
        'V5,0-5,4',
      ]
        .sort()
        .join(' '),
    );
    const side = orthoView(OBJECTS.giaChuU, 'side');
    expect(side.lines.filter((l) => l.hidden)).toEqual([
      { u1: 0, v1: 2, u2: 3, v2: 2, hidden: true },
    ]);
    const top = orthoView(OBJECTS.giaChuU, 'top');
    expect(top.width).toBe(5);
    expect(top.height).toBe(3);
    expect(top.lines.filter((l) => !l.hidden && l.u1 === l.u2).map((l) => l.u1)).toEqual([
      0, 1, 4, 5,
    ]);
  });

  it('shows a slot cut into the back as hidden lines in the front view', () => {
    const front = orthoView(OBJECTS.ranhSau, 'front');
    expect(front.lines.filter((l) => l.hidden).map((l) => l.u1)).toEqual([1, 3]);
    const top = orthoView(OBJECTS.ranhSau, 'top');
    expect(top.lines.some((l) => l.hidden)).toBe(false);
  });

  it('keeps the three views in step: length, height and width agree', () => {
    for (const s of Object.values(OBJECTS)) {
      const f = orthoView(s, 'front');
      const t = orthoView(s, 'top');
      const c = orthoView(s, 'side');
      expect([f.width, f.height, t.width, t.height, c.width, c.height]).toEqual([
        s.nx,
        s.nz,
        s.nx,
        s.ny,
        s.ny,
        s.nz,
      ]);
    }
  });

  it('draws a single cube as three unit squares', () => {
    const cube = makeSolid([1, 1, 1], [['+', [0, 0, 0], [1, 1, 1]]]);
    for (const k of /** @type {const} */ (['front', 'top', 'side']))
      expect(orthoView(cube, k).lines).toHaveLength(4);
  });
});

describe('turnQuarter', () => {
  it('brings the right side to the front and comes back after four turns', () => {
    const s = OBJECTS.chuL;
    const t = turnQuarter(s);
    expect([t.nx, t.ny, t.nz]).toEqual([3, 4, 3]);
    expect(text(orthoView(t, 'front'))).not.toBe(text(orthoView(s, 'front')));
    expect(sameSolid(turnQuarter(turnQuarter(turnQuarter(t))), s)).toBe(true);
  });
});

describe('axisInfo', () => {
  it('gives the isometric view equal angles of 120° and p = q = r = √6/3', () => {
    const a = axisInfo(ISOMETRIC);
    for (const k of /** @type {const} */ (['p', 'q', 'r']))
      expect(a[k]).toBeCloseTo(Math.sqrt(6) / 3, 9);
    for (const k of /** @type {const} */ (['xy', 'yz', 'zx'])) expect(a[k]).toBeCloseTo(120, 9);
  });

  it('flattens the depth axis to a point in the front view', () => {
    const a = axisInfo({ yaw: 0, pitch: 0 });
    expect(a.q).toBeCloseTo(0, 9);
    expect(a.xy).toBeNull();
    expect(a.zx).toBeCloseTo(90, 9);
  });

  it('keeps the three angles adding up to 360° in any oblique view', () => {
    const bad = [];
    for (const view of [
      { yaw: 30, pitch: 20 },
      { yaw: -60, pitch: 50 },
      { yaw: 120, pitch: 10 },
    ]) {
      const a = axisInfo(view);
      const sum = (a.xy ?? 0) + (a.yz ?? 0) + (a.zx ?? 0);
      if (Math.abs(sum - 360) > 1e-6) bad.push({ view, sum });
    }
    expect(bad).toEqual([]);
  });
});

describe('solidFaces', () => {
  it('shows three faces of a lone cube seen from front, left and above', () => {
    const cube = makeSolid([1, 1, 1], [['+', [0, 0, 0], [1, 1, 1]]]);
    expect(
      solidFaces(cube, ISOMETRIC)
        .map((f) => f.tone)
        .sort(),
    ).toEqual(['front', 'left', 'top']);
  });

  it('skips the faces glued between cubes', () => {
    const bar = makeSolid([2, 1, 1], [['+', [0, 0, 0], [2, 1, 1]]]);
    expect(solidFaces(bar, ISOMETRIC)).toHaveLength(5);
  });
});
