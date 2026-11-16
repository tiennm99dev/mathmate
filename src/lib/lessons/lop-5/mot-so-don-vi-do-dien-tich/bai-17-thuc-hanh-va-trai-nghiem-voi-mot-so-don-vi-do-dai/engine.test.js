import { describe, expect, it } from 'vitest';
import { PLACES, areaOf, measureText, nearest, verdict } from './engine.js';

/** @param {string} s */
const g = (s) => s.replace(/(\d) (?=\d{3})/g, '$1 ');

describe('area estimating challenge', () => {
  it('computes each real area and its nearest estimate', () => {
    expect(PLACES.map(areaOf)).toEqual([60, 6, 494, 2, 48, 2000, 7140]);
    expect(PLACES.map((p) => p.estimates[nearest(p)].text)).toEqual(
      ['60 dm²', '6 cm²', '500 cm²', '2 m²', '50 m²', '2 000 m²', '7 000 m²'].map(g),
    );
  });

  it('checks the estimate with the measures', () => {
    const room = PLACES[4];
    expect(measureText(room)).toBe('Dài 8 m, rộng 6 m. Diện tích: 8 × 6 = 48 (m²).');
    expect(verdict(room, nearest(room)).tone).toBe('ok');
    expect(verdict(PLACES[0], 0).text).toBe(
      'Chưa sát rồi. Diện tích thật là 60 dm². Mặt bàn học chưa rộng tới 1 m² = 100 dm².',
    );
    expect(verdict(room, 0)).toEqual({
      tone: 'warn',
      text: 'Chưa sát rồi. Diện tích thật là 48 m², gần 50 m² nhất. Nền lớp học rộng khoảng 50 m².',
    });
  });
});
