import { describe, expect, it } from 'vitest';
import { SNAPS, axisTex, axisWords, matchedSnap, viewNote } from './engine.js';

describe('matchedSnap', () => {
  it('recognises every snap and nothing in between', () => {
    expect(Object.entries(SNAPS).map(([k, v]) => [k, matchedSnap(v)])).toEqual([
      ['front', 'front'],
      ['top', 'top'],
      ['side', 'side'],
      ['iso', 'iso'],
    ]);
    expect(matchedSnap({ yaw: 30, pitch: 20 })).toBe('');
    expect(matchedSnap({ yaw: 40, pitch: 90 })).toBe('');
  });
});

describe('axisTex', () => {
  it('writes the isometric coefficients and angles the book way', () => {
    expect(axisTex(SNAPS.iso)).toEqual({
      coefficients: 'p \\approx 0{,}82,\\quad q \\approx 0{,}82,\\quad r \\approx 0{,}82',
      angles:
        "\\widehat{x'O'y'} = 120^\\circ,\\ \\widehat{y'O'z'} = 120^\\circ,\\ \\widehat{z'O'x'} = 120^\\circ",
    });
    expect(axisWords(SNAPS.iso)).toContain('p khoảng 0,82');
  });

  it('leaves the angles of a vanished axis undefined', () => {
    expect(axisTex(SNAPS.front).coefficients).toContain('q \\approx 0,');
    expect(axisTex(SNAPS.front).angles).toContain("\\widehat{z'O'x'} = 90^\\circ");
    expect(axisWords(SNAPS.front)).toContain('không xác định');
  });
});

describe('viewNote', () => {
  it('praises the snapped views and warns near an axis', () => {
    expect(viewNote(SNAPS.front).tone).toBe('ok');
    expect(viewNote(SNAPS.iso).text).toContain('120^\\circ');
    expect(viewNote({ yaw: 3, pitch: 2 }).tone).toBe('warn');
    expect(viewNote({ yaw: 30, pitch: 25 }).tone).toBe('info');
  });
});
