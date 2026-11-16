import { describe, expect, it } from 'vitest';
import {
  RULERS,
  THINGS,
  digitAt,
  digitCells,
  leadingPlace,
  measureReport,
  percent,
  placeFor,
  placeName,
  roundAt,
  roundingSteps,
  snapReading,
} from './engine.js';

describe('measuring with a ruler', () => {
  it('snaps a position to the divisions', () => {
    expect(snapReading(13.72, 1)).toBe(14);
    expect(snapReading(13.72, 0.5)).toBe(13.5);
    expect(snapReading(13.72, 0.1)).toBe(13.7);
    expect(snapReading(4.36, 0.1)).toBe(4.4);
  });

  it('keeps the nearest reading within half a division of every thing', () => {
    const bad = [];
    for (const t of THINGS) {
      for (const r of RULERS) {
        const report = measureReport(t.length, snapReading(t.length, r.h), r.h);
        if (!report.nearest || !report.within) bad.push([t.id, r.id]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reports the errors of a reading', () => {
    const r = measureReport(13.72, 13.7, 0.1);
    expect(r.d).toBe(0.05);
    expect(r.abs).toBe(0.02);
    expect(percent(r.relative)).toBe('0,15%');
    const off = measureReport(13.72, 13, 1);
    expect(off.nearest).toBe(false);
    expect(off.within).toBe(false);
  });
});

describe('rounding with a given accuracy', () => {
  it('finds the place the book rounds to', () => {
    expect(placeFor(300)).toBe(3);
    expect(placeFor(0.001)).toBe(-2);
    expect(placeFor(0.2)).toBe(0);
    expect(placeFor(7.5)).toBe(1);
    expect(placeFor(5)).toBe(1);
    expect(placeFor(1)).toBe(1);
    expect(placeFor(0.01)).toBe(-1);
    expect(leadingPlace(300)).toBe(2);
    expect(placeName(-2)).toBe('hàng phần trăm');
  });

  it('rounds half up at any place', () => {
    expect(roundAt(2841675, 3)).toBe(2842000);
    expect(roundAt(3.1463, -2)).toBe(3.15);
    expect(roundAt(9.78, 0)).toBe(10);
    expect(roundAt(1.245, -2)).toBe(1.25);
    expect(roundAt(2.675, -2)).toBe(2.68);
    expect(roundAt(1234.4, 1)).toBe(1230);
    expect(digitAt(3.1463, -3)).toBe(6);
  });

  it('writes the steps of the book example', () => {
    const s = roundingSteps(2841675, 300);
    expect(s.rounded).toBe(2842000);
    expect(s.lines[0]).toContain('hàng trăm');
    expect(s.lines[1]).toContain('hàng nghìn');
    expect(s.lines[3]).toContain('500');
  });
});

describe('digit cells', () => {
  it('marks the rounding place and the deciding digit', () => {
    const roles = (/** @type {string} */ t, /** @type {number} */ k) =>
      digitCells(t, k)
        .map((c) => c.role[0] ?? '.')
        .join('');
    expect(roles('3,1463', -2)).toBe('...pnd');
    expect(roles('2 841 675', 3)).toBe('....p.ndd');
  });
});
