import { describe, it, expect } from 'vitest';
import { PRESETS, evaluate, formulaTex, parseFormula } from './engine.js';

/** @param {string} text @param {string[]} [vars] */
function read(text, vars = ['n']) {
  const r = parseFormula(text, vars);
  if (!r.ok) throw new Error(r.error);
  return r.node;
}

describe('formula reader', () => {
  it('evaluates general terms with the usual precedence', () => {
    const cases = /** @type {Array<[string, number, number]>} */ ([
      ['2n - 1', 5, 9],
      ['n/(n+1)', 3, 0.75],
      ['(-1)^n', 3, -1],
      ['(−1)^n/n', 4, 0.25],
      ['-n^2', 3, -9],
      ['n^2 - 6n', 2, -8],
      ['3(n + 1)', 2, 9],
      ['n(n+1)/2', 4, 10],
      ['2^n', 10, 1024],
      ['2^-n', 1, 0.5],
      ['0,5n + 1', 4, 3],
      ['sqrt(n)', 9, 3],
      ['√(n+7)', 2, 3],
      ['2 × n : 4', 6, 3],
    ]);
    const fails = cases.filter(([t, n, v]) => Math.abs(evaluate(read(t), { n }) - v) > 1e-12);
    expect(fails).toEqual([]);
  });

  it('reads a recurrence step in u and n', () => {
    const node = read('2u + n', ['u', 'n']);
    expect(evaluate(node, { u: 5, n: 3 })).toBe(13);
  });

  it('reports what is wrong with a formula', () => {
    expect(parseFormula('', ['n'])).toEqual({ ok: false, error: 'Hãy nhập một công thức.' });
    expect(parseFormula('(n + 1', ['n'])).toMatchObject({
      ok: false,
      error: 'Thiếu dấu ngoặc đóng ")".',
    });
    expect(parseFormula('n + 1)', ['n'])).toMatchObject({ ok: false });
    expect(parseFormula('x + 1', ['n'])).toMatchObject({
      ok: false,
      error: 'Không đọc được kí tự "x".',
    });
    expect(parseFormula('n +', ['n'])).toMatchObject({ ok: false });
    expect(parseFormula('u + 1', ['n'])).toMatchObject({ ok: false });
  });

  it('leaves undefined values undefined', () => {
    expect(Number.isFinite(evaluate(read('1/(n - 2)'), { n: 2 }))).toBe(false);
    expect(Number.isNaN(evaluate(read('sqrt(n - 5)'), { n: 1 }))).toBe(true);
  });

  it('writes formulas as the book does', () => {
    expect(formulaTex(read('2n - 1'))).toBe('2n - 1');
    expect(formulaTex(read('n/(n+1)'))).toBe('\\dfrac{n}{n + 1}');
    expect(formulaTex(read('(-1)^n'))).toBe('\\left(-1\\right)^{n}');
    expect(formulaTex(read('n(n+1)'))).toBe('n\\left(n + 1\\right)');
    expect(formulaTex(read('2u + 1', ['u', 'n']))).toBe('2u_{n-1} + 1');
    expect(formulaTex(read('n - (n - 1)'))).toBe('n - \\left(n - 1\\right)');
    expect(formulaTex(read('0,5n'))).toBe('0{,}5n');
  });

  it('reads every preset', () => {
    const bad = [
      ...PRESETS.general.filter((p) => !parseFormula(p.text, ['n']).ok),
      ...PRESETS.recursive.filter((p) => !parseFormula(p.text, ['u', 'n']).ok),
    ];
    expect(bad).toEqual([]);
  });
});
