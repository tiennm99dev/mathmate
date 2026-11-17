import { describe, expect, it } from 'vitest';
import {
  FULL,
  GROUND_Y,
  RADII,
  SCALE,
  SLICES,
  START_X,
  WHEEL_W,
  diametersInTurn,
  rowSize,
  sliceNote,
  slicePlaces,
  trueTurn,
  turnBetween,
  turnFromX,
  wheelAt,
  wheelNote,
} from './engine.js';

describe('rolling the wheel', () => {
  it('starts with the paint dot on the ground and ends one turn later on it again', () => {
    for (const r of RADII) {
      const start = wheelAt(r, 0);
      expect(start.dot.x).toBeCloseTo(START_X);
      expect(start.dot.y).toBeCloseTo(GROUND_Y);
      const end = wheelAt(r, 1);
      expect(end.trace).toBeCloseTo(trueTurn(r) * SCALE);
      expect(end.dot.x).toBeCloseTo(START_X + end.trace);
      expect(end.dot.y).toBeCloseTo(GROUND_Y);
    }
  });

  it('lifts the dot up behind the wheel as it rolls to the right', () => {
    const quarter = wheelAt(2, 0.25);
    expect(quarter.dot.x).toBeCloseTo(quarter.cx - quarter.R);
    expect(quarter.dot.y).toBeCloseTo(quarter.cy);
  });

  it('keeps the biggest wheel on the board for the whole turn', () => {
    const r = Math.max(...RADII);
    const end = wheelAt(r, 1);
    expect(START_X - r * SCALE).toBeGreaterThanOrEqual(0);
    expect(end.cx + end.R).toBeLessThanOrEqual(WHEEL_W);
  });

  it('turns a dragged centre into a part of a turn, kept from 0 to 1', () => {
    expect(turnFromX(2, START_X - 50)).toBe(0);
    expect(turnFromX(2, START_X + trueTurn(2) * SCALE * 2)).toBe(1);
    expect(turnFromX(2, START_X + (trueTurn(2) * SCALE) / 2)).toBeCloseTo(0.5);
  });

  it('gives the circumference with 3,14 after one turn', () => {
    expect(wheelNote(2, 1).tone).toBe('ok');
    expect(wheelNote(2, 1).text).toContain('4 × 3,14 = 12,56');
    expect(wheelNote(1.5, FULL).text).toContain('3 × 3,14 = 9,42');
    expect(wheelNote(2, 0.5).tone).toBe('info');
  });

  it('fits three diameters and a bit into one turn', () => {
    expect(diametersInTurn(2)).toEqual({ whole: 3, rest: 0.56 });
    expect(diametersInTurn(2.5)).toEqual({ whole: 3, rest: 0.7 });
  });
});

describe('cutting the circle into slices', () => {
  it('lays the slices side by side with no gap along the bottom line', () => {
    const bad = [];
    const R = 60;
    for (const n of SLICES) {
      const chord = 2 * R * Math.sin(Math.PI / n);
      for (let k = 0; k < n / 2; k++) {
        const up = slicePlaces(n, R, k).row;
        const down = slicePlaces(n, R, n / 2 + k).row;
        if (Math.abs(up.x - k * chord) > 1e-9 || up.rot !== 0) bad.push([n, k, 'up']);
        if (Math.abs(down.x - up.x - chord / 2) > 1e-9 || down.rot !== 180)
          bad.push([n, k, 'down']);
      }
      if (Math.abs(rowSize(n, R).length - (n / 2 + 0.5) * chord) > 1e-9) bad.push([n, 'size']);
    }
    expect(bad).toEqual([]);
  });

  it('comes close to half the circumference with many slices', () => {
    expect(rowSize(32, 60).length).toBeGreaterThan(Math.PI * 60);
    expect(rowSize(32, 60).length).toBeLessThan(Math.PI * 60 + 7);
  });

  it('turns each slice the short way round', () => {
    expect(turnBetween(350, 0, 1)).toBeCloseTo(360);
    expect(turnBetween(90, 0, 0.5)).toBeCloseTo(45);
    expect(turnBetween(200, 180, 1)).toBeCloseTo(180);
  });

  it('gives the area only once the slices make a near rectangle', () => {
    expect(sliceNote(16, 3, false).tone).toBe('info');
    expect(sliceNote(4, 3, true).tone).toBe('info');
    const done = sliceNote(32, 3, true);
    expect(done.tone).toBe('ok');
    expect(done.text).toContain('3 × 3,14 = 9,42');
    expect(done.text).toContain('3 × 3 × 3,14 = 28,26');
  });
});
