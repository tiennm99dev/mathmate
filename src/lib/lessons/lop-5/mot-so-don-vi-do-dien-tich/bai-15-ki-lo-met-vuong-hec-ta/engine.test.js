import { describe, expect, it } from 'vitest';
import { TASKS, coverBy, coverNote, haText, mapLabel } from './engine.js';

/** @param {string} s */
const g = (s) => s.replace(/(\d) (?=\d{3})/g, '$1\u202f');

describe('héc-ta map', () => {
  it('gives each place the right number of héc-ta', () => {
    // 1 ha = 10 000 m², 1 km² = 100 ha.
    expect(TASKS.map((t) => t.ha)).toEqual([1, 12, 50_000 / 10_000, 35, 200_000 / 10_000, 50, 100]);
  });

  it('keeps the cover from 0 to 100', () => {
    expect(coverBy(95, 10)).toBe(100);
    expect(coverBy(3, -10)).toBe(0);
    expect(coverBy(12, 1)).toBe(13);
  });

  it('says the area in ha, m² and km²', () => {
    expect(haText(12)).toBe(g('12 ha = 120 000 m²'));
    expect(coverNote(TASKS[6], 100).text).toBe(
      g('Đúng rồi! Cả khu đất rộng 100 ha = 1 000 000 m² = 1 km².'),
    );
    expect(coverNote(TASKS[1], 20).tone).toBe('warn');
    expect(coverNote(TASKS[1], 2).tone).toBe('info');
    expect(mapLabel(23)).toBe(
      'Bản đồ 1 km² gồm 100 ô vuông 1 ha, mỗi hàng 10 ô; đã phủ 2 hàng đầy và 3 ô lẻ',
    );
  });
});
