import { describe, it, expect } from 'vitest';
import { bacteriaText, lengthText, minutesText, paperText } from './engine.js';

describe('growth stories', () => {
  it('doubles the layers of a folded sheet', () => {
    expect(paperText(1)).toBe(
      'Sau $1$ lần gấp, tờ giấy có $u_{1} = 2^{1} = 2$ lớp, dày khoảng 0,2 mm.',
    );
    expect(paperText(10)).toBe(
      'Sau $10$ lần gấp, tờ giấy có $u_{10} = 2^{10} = 1\\,024$ lớp, dày khoảng 10,24 cm.',
    );
  });

  it('counts bacteria after each doubling', () => {
    expect(bacteriaText(1)).toBe(
      'Sau 20 phút ($1$ lần nhân đôi) có $u_{1} = 1\\,000 \\cdot 2^{0} = 1\\,000$ con vi khuẩn.',
    );
    expect(bacteriaText(3)).toContain('Sau 1 giờ (');
    expect(bacteriaText(3)).toContain('= 4\\,000$');
  });

  it('says minutes and lengths in a handy unit', () => {
    expect(minutesText(40)).toBe('40 phút');
    expect(minutesText(120)).toBe('2 giờ');
    expect(minutesText(80)).toBe('1 giờ 20 phút');
    expect(lengthText(0.4)).toBe('0,4 mm');
    expect(lengthText(256)).toBe('25,6 cm');
    expect(lengthText(1638.4)).toBe('1,64 m');
  });
});
