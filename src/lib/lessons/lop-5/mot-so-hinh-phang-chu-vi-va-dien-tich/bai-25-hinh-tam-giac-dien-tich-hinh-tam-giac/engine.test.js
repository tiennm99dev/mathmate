import { describe, expect, it } from 'vitest';
import {
  BASE_ROW,
  B_COL,
  CELL,
  GOALS,
  START,
  areaOf,
  boardLabel,
  footOf,
  goalNote,
  kindOf,
  nextTrail,
  snapA,
  snapC,
} from './engine.js';

/** @param {number} ax @param {number} ay @param {number} c */
const tri = (ax, ay, c) => ({ ax, ay, c });

describe('triangle board', () => {
  it('keeps A above the base and C on it', () => {
    expect(snapA({ x: 7.4 * CELL, y: 0 })).toEqual({ x: 7 * CELL, y: 2 * CELL });
    expect(snapA({ x: -50, y: 20 * CELL })).toEqual({ x: 0, y: (BASE_ROW - 1) * CELL });
    expect(snapC({ x: 0, y: 0 })).toEqual({ x: (B_COL + 2) * CELL, y: BASE_ROW * CELL });
    expect(snapC({ x: 99 * CELL, y: 0 }).x).toBe((B_COL + 10) * CELL);
  });

  it('works out the area as base times height over 2', () => {
    expect(areaOf(START)).toBe((6 * 4) / 2);
    expect(areaOf(tri(0, 4, 7))).toBe(12.5);
  });

  it('keeps the area when A slides along the parallel line', () => {
    const areas = [0, 3, 5, 8, 14].map((ax) => areaOf(tri(ax, 5, 8)));
    expect(new Set(areas).size).toBe(1);
  });

  it('names the kind and where the foot of the height falls', () => {
    expect(kindOf(tri(5, 5, 8))).toBe('nhon');
    expect(kindOf(tri(2, 5, 8))).toBe('vuong');
    expect(kindOf(tri(12, 5, 8))).toBe('tu');
    expect(footOf(tri(5, 5, 8))).toBe('trong');
    expect(footOf(tri(8, 5, 8))).toBe('dau');
    expect(footOf(tri(12, 5, 8))).toBe('ngoai');
    expect(boardLabel(tri(12, 5, 8))).toContain('phần kéo dài');
  });

  it('counts the places A visited on one parallel line', () => {
    let trail = nextTrail({ key: '', cols: [] }, tri(5, 5, 8));
    trail = nextTrail(trail, tri(6, 5, 8));
    trail = nextTrail(trail, tri(6, 5, 8));
    trail = nextTrail(trail, tri(9, 5, 8));
    expect(trail.cols).toEqual([5, 6, 9]);
    expect(nextTrail(trail, tri(9, 4, 8)).cols).toEqual([9]);
    expect(goalNote(GOALS[0], tri(9, 5, 8), 3).tone).toBe('ok');
    expect(goalNote(GOALS[0], tri(9, 5, 8), 2).tone).toBe('info');
  });

  it('can reach every challenge on the board', () => {
    const misses = [];
    for (const goal of GOALS) {
      if (goal.id === 'ngang') continue;
      let found = false;
      for (let ax = 0; ax <= 14 && !found; ax++)
        for (let ay = 2; ay <= 8 && !found; ay++)
          for (let c = 4; c <= 12 && !found; c++)
            found = goalNote(goal, tri(ax, ay, c), 1).tone === 'ok';
      if (!found) misses.push(goal);
    }
    expect(misses).toEqual([]);
  });
});
