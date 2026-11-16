import { describe, it, expect } from 'vitest';
import { angleSentence, signsOf, spiralPath, spiralTip, splitTurns } from './engine.js';
import { trigValue } from '../_shared/trig.js';

const C = { x: 100, y: 100 };

describe('unit circle widget logic', () => {
  it('draws no spiral for a zero angle and ends the spiral at the angle', () => {
    expect(spiralPath(C, 0)).toBe('');
    const path = spiralPath(C, 450);
    const last = path.split(' L ').at(-1)?.split(' ').map(Number) ?? [];
    const { tip } = spiralTip(C, 450);
    expect(last[0]).toBeCloseTo(tip.x, 1);
    expect(last[1]).toBeCloseTo(tip.y, 1);
    // 450° ends straight above the centre, one turn further out.
    expect(tip.x).toBeCloseTo(100);
    expect(tip.y).toBeCloseTo(100 - 22 - 9 * 1.25);
  });

  it('splits an angle into a measure and whole turns', () => {
    expect(splitTurns(390)).toEqual({ base: 30, k: 1 });
    expect(splitTurns(-390)).toEqual({ base: -30, k: -1 });
    expect(splitTurns(540)).toEqual({ base: 180, k: 1 });
    expect(splitTurns(0)).toEqual({ base: 0, k: 0 });
  });

  it('describes the angle', () => {
    expect(angleSentence(30)).toBe(
      'Góc $30^\\circ = \\dfrac{\\pi}{6}$ (rad), quay theo chiều dương. Điểm M thuộc góc phần tư thứ I.',
    );
    expect(angleSentence(-720)).toContain('quay đúng 2 vòng');
    expect(angleSentence(-750)).toContain('góc phần tư thứ IV');
    expect(angleSentence(-750)).toContain('quay 2 vòng rồi thêm một phần vòng');
    expect(angleSentence(50)).toContain('\\approx 0{,}873');
  });

  it('gives the signs that match the values in every quadrant', () => {
    const fails = [];
    for (const [q, deg] of [
      [1, 40],
      [2, 130],
      [3, 220],
      [4, 310],
    ]) {
      const s = signsOf(q);
      for (const name of /** @type {const} */ (['sin', 'cos', 'tan', 'cot'])) {
        const sign = trigValue(name, deg) > 0 ? '+' : '−';
        if (s[name] !== sign) fails.push(`${name} ${q}`);
      }
    }
    expect(fails).toEqual([]);
  });
});
