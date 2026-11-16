import { describe, expect, it } from 'vitest';
import { cosDeg, cotDeg, sinDeg, tanDeg } from '../_shared/trig.js';

/** @param {number | null} v @param {number} w */
const near = (v, w) => v !== null && Math.abs(v - w) < 1e-9;
import {
  SPECIAL,
  TASKS,
  angleOfPoint,
  exactAt,
  readout,
  signNote,
  taskNote,
  valuesAt,
} from './engine.js';

/** @param {string | null} tex */
function evalTex(tex) {
  if (tex === null) return null;
  const sign = tex.startsWith('-') ? -1 : 1;
  const body = tex.replace(/^-/, '');
  const frac = body.match(/^\\dfrac\{(.+)\}\{(\d+)\}$/);
  /** @param {string} t */
  const num = (t) => (t.startsWith('\\sqrt') ? Math.sqrt(Number(t.match(/\d+/)?.[0])) : Number(t));
  return sign * (frac ? num(frac[1]) / Number(frac[2]) : num(body));
}

describe('unit half-circle values', () => {
  it('matches the exact table with the computed values at every special angle', () => {
    const wrong = [];
    for (const a of SPECIAL) {
      const exact = exactAt(a);
      const values = valuesAt(a);
      for (const fn of /** @type {const} */ (['sin', 'cos', 'tan', 'cot'])) {
        const e = evalTex(exact?.[fn] ?? null);
        const v = values[fn];
        if ((e === null) !== (v === null) || (e !== null && v !== null && Math.abs(e - v) > 1e-9))
          wrong.push(`${fn} ${a}`);
      }
    }
    expect(wrong).toEqual([]);
    expect(exactAt(40)).toBeNull();
  });

  it('writes the readout exactly or rounded', () => {
    expect(readout(120).map((l) => l.tex)).toEqual([
      '\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}',
      '\\cos 120^\\circ = -\\dfrac{1}{2}',
      '\\tan 120^\\circ = -\\sqrt{3}',
      '\\cot 120^\\circ = -\\dfrac{\\sqrt{3}}{3}',
    ]);
    expect(readout(90)[2]).toMatchObject({ defined: false });
    expect(readout(40)[0].tex).toBe('\\sin 40^\\circ \\approx 0{,}6428');
  });

  it('reads the angle of a dragged point', () => {
    expect(angleOfPoint({ x: 0.5, y: Math.sqrt(3) / 2 })).toBe(60);
    expect(angleOfPoint({ x: -1, y: 0.001 })).toBe(180);
    expect(angleOfPoint({ x: 0.3, y: -0.2 })).toBe(0);
    expect(angleOfPoint({ x: -0.3, y: -0.2 })).toBe(180);
  });

  it('notes the signs', () => {
    expect(signNote(130)).toContain('Góc tù');
    expect(signNote(90)).toContain('không xác định');
  });

  it('has tasks whose stored angle is the only one from 0° to 180°', () => {
    const holds = [
      (/** @type {number} */ a) => near(cosDeg(a), -0.5),
      (/** @type {number} */ a) => near(sinDeg(a), 0.5) && a > 90,
      (/** @type {number} */ a) => near(tanDeg(a), -1),
      (/** @type {number} */ a) => near(cotDeg(a), Math.sqrt(3)),
      (/** @type {number} */ a) => near(cosDeg(a), -1),
      (/** @type {number} */ a) => near(tanDeg(a), Math.sqrt(3)),
      (/** @type {number} */ a) => near(cosDeg(a), 0),
    ];
    expect(holds).toHaveLength(TASKS.length);
    const found = holds.map((h) => Array.from({ length: 181 }, (_, a) => a).filter(h));
    expect(found).toEqual(TASKS.map((t) => [t.answer]));
    expect(taskNote(0, 120).tone).toBe('ok');
    expect(taskNote(0, 118).text).toContain('Gần rồi');
  });
});
