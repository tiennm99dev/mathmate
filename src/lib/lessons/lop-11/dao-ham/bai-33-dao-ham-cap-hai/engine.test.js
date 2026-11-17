import { describe, it, expect } from 'vitest';
import { MOTIONS, motionState } from './engine.js';

/** @param {(t: number) => number} f @param {number} t */
const slope = (f, t) => (f(t + 1e-5) - f(t - 1e-5)) / 2e-5;

describe('motions', () => {
  it('have v = s′ and a = v′ everywhere on the time range', () => {
    const bad = [];
    for (const m of MOTIONS) {
      for (let i = 1; i < 40; i++) {
        const t = (m.tMax * i) / 40;
        if (Math.abs(slope(m.s, t) - m.v(t)) > 1e-4) bad.push(`${m.id} v at ${t}`);
        if (Math.abs(slope(m.v, t) - m.a(t)) > 1e-4) bad.push(`${m.id} a at ${t}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('keep the three graphs inside their windows', () => {
    const bad = [];
    for (const m of MOTIONS) {
      for (let i = 0; i <= 80; i++) {
        const t = (m.tMax * i) / 80;
        for (const [f, r, name] of /** @type {const} */ ([
          [m.s, m.sRange, 's'],
          [m.v, m.vRange, 'v'],
          [m.a, m.aRange, 'a'],
        ])) {
          const y = f(t);
          if (!(y > r[0] && y < r[1])) bad.push(`${m.id} ${name} at ${t}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('tell speeding up from slowing down', () => {
    const cubic = MOTIONS[0];
    expect(motionState(cubic, 0.5)).toMatchObject({ direction: 'duong', change: 'cham' });
    expect(motionState(cubic, 1)).toMatchObject({ direction: 'dung', change: 'dung' });
    expect(motionState(cubic, 1.5)).toMatchObject({ direction: 'am', change: 'nhanh' });
    expect(motionState(cubic, 2.5)).toMatchObject({ direction: 'am', change: 'cham' });
    expect(motionState(cubic, 3.5)).toMatchObject({ direction: 'duong', change: 'nhanh' });
    expect(motionState(MOTIONS[1], 1)).toMatchObject({ direction: 'duong', change: 'nhanh' });
  });
});
