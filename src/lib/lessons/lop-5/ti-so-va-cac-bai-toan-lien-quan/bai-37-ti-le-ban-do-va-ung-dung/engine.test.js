import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { GROUP } from '#lib/core/number-format.js';
import { FIRST_QUIZ, PLACES, drawQuiz, lengthText, mapCm, mapNote, realLine } from './engine.js';

/** @param {string} text */
const plain = (text) => text.replaceAll(GROUP, ' ');

describe('map scale', () => {
  it('writes a length in a fitting unit', () => {
    expect(lengthText(150000)).toBe('1,5 km');
    expect(lengthText(2500)).toBe('25 m');
    expect(lengthText(50)).toBe('50 cm');
    expect(plain(lengthText(50000000))).toBe('500 km');
  });

  it('multiplies the map length by the scale', () => {
    expect(plain(realLine(6, 1000))).toBe('6 × 1 000 = 6 000 (cm) = 60 m');
    expect(plain(realLine(4.5, 1000000))).toBe('4,5 × 1 000 000 = 4 500 000 (cm) = 45 km');
    expect(mapCm(0, 2)).toBe(4);
    expect(plain(mapNote(1, 3, 10000))).toBe(
      'Từ Trường học đến Bưu điện: trên bản đồ dài 4 cm. Tỉ lệ 1 : 10 000, nên độ dài thật là 4 × 10 000 = 40 000 (cm) = 400 m.',
    );
  });

  it('asks questions with four distinct options and the right one among them', () => {
    const rand = rng(11);
    const bad = [];
    for (const q of [FIRST_QUIZ]) {
      if (q.options[q.answer] !== lengthText(mapCm(q.a, q.b) * q.scale)) bad.push('first');
    }
    for (let t = 0; t < 200; t++) {
      const q = drawQuiz(rand);
      const right = lengthText(mapCm(q.a, q.b) * q.scale);
      if (q.a === q.b || q.a >= PLACES.length || q.b >= PLACES.length) bad.push(JSON.stringify(q));
      if (q.options.length !== 4 || new Set(q.options).size !== 4 || q.options[q.answer] !== right)
        bad.push(JSON.stringify(q));
    }
    expect(bad).toEqual([]);
  });
});
