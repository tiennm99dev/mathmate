import { describe, expect, it } from 'vitest';
import {
  KEY_ROWS,
  KEY_WORDS,
  keysOf,
  press,
  run,
  screenReading,
  screenText,
  start,
} from './calc.js';

describe('pocket calculator', () => {
  it('works the book key sequences', () => {
    /** @type {Array<[string, string]>} */
    const cases = [
      ['1975+2025=', '4000'],
      ['3871−189=', '3682'],
      ['475×81=', '38475'],
      ['51÷6=', '8.5'],
      ['5+2×3=', '21'],
      ['35×8%', '2.8'],
      ['4×32%', '1.28'],
      ['16÷80%', '20'],
      ['38÷125%', '30.4'],
      ['250000000×8%=', '20000000'],
      ['7÷40%', '17.5'],
      ['56×34%', '19.04'],
      ['0.1+0.2=', '0.3'],
      ['1÷3=', '0.333333333'],
      ['2×3+', '6'],
      ['100+10%', '110'],
      ['450000−20%', '360000'],
      ['12.5×2=', '25'],
    ];
    const bad = cases.filter(([keys, want]) => run(keys).entry !== want);
    expect(bad).toEqual([]);
  });

  it('clears, turns off and shows E on a division by zero', () => {
    expect(run('5÷0=').error).toBe(true);
    expect(run('5÷0=+3=').entry).toBe('E');
    expect(run('5÷0=ON/C').entry).toBe('0');
    expect(run('12+7CE5=').entry).toBe('17');
    expect(run('OFF3').on).toBe(false);
    expect(run('OFF3ON/C4').entry).toBe('4');
    expect(run('99999×99999×99999=').error).toBe(true);
  });

  it('keeps ten digits and one decimal point', () => {
    expect(run('12345678901').entry).toBe('1234567890');
    expect(run('1..5').entry).toBe('1.5');
    expect(run('.5').entry).toBe('0.5');
    expect(screenText(2 / 3)).toBe('0.666666667');
    expect(screenText(-4)).toBe('-4');
  });

  it('reads the screen with a decimal comma', () => {
    expect(screenReading(run('35×8%'))).toBe('Màn hình hiện 2.8, đọc là 2,8.');
    expect(screenReading(start())).toBe('Màn hình hiện 0.');
    expect(screenReading(press(start(), 'OFF'))).toBe('Máy đang tắt.');
  });

  it('splits key strings and names every key', () => {
    expect(keysOf('ON/C 35×8%')).toEqual(['ON/C', '3', '5', '×', '8', '%']);
    const missing = KEY_ROWS.flat().filter((k) => !KEY_WORDS[k]);
    expect(missing).toEqual([]);
  });
});
