import { describe, expect, it } from 'vitest';
import { fraction } from '#lib/fraction-engine/index.js';
import {
  addMultiple,
  applyStep,
  backSolve,
  checkValues,
  classify,
  equationTex,
  generalTex,
  isTriangular,
  nextStep,
  rowTex,
  scaleRow,
  stepText,
  substitutionTex,
  swapRows,
  systemOf,
  systemTex,
  tupleTex,
  valueTex,
} from './system3.js';

const unique = systemOf([
  [1, 1, -2, 3],
  [-1, 1, 6, 13],
  [2, 1, -9, -5],
]);
const none = systemOf([
  [1, 1, 1, 1],
  [2, 3, 1, 4],
  [3, 4, 2, 7],
]);
const infinite = systemOf([
  [1, 1, 1, 2],
  [1, 2, 3, 5],
  [2, 3, 4, 7],
]);

/** Runs the suggested steps until the system is triangular. @param {any} sys */
function eliminate(sys) {
  let s = sys;
  for (let n = 0; n < 10; n++) {
    const step = nextStep(s);
    if (!step) return s;
    s = applyStep(s, step);
  }
  throw new Error('elimination did not finish');
}

describe('row operations', () => {
  it('adds a multiple of one row to another', () => {
    const s = addMultiple(unique, 1, 0, fraction(1));
    expect(rowTex(s[1])).toBe('2y + 4z = 16');
  });

  it('scales and swaps rows', () => {
    const s = scaleRow(unique, 0, fraction(1, 2));
    expect(rowTex(s[0])).toBe('\\frac{1}{2}x + \\frac{1}{2}y - z = \\frac{3}{2}');
    expect(swapRows(unique, 0, 2)[0]).toBe(unique[2]);
    expect(() => scaleRow(unique, 0, fraction(0))).toThrow();
  });

  it('writes an all-zero row as 0z = d', () => {
    expect(rowTex(systemOf([[0, 0, 0, 2]])[0])).toBe('0z = 2');
  });

  it('writes the system as cases', () => {
    expect(systemTex(unique)).toBe(
      '\\begin{cases} x + y - 2z = 3 \\\\ -x + y + 6z = 13 \\\\ 2x + y - 9z = -5 \\end{cases}',
    );
  });
});

describe('Gauss elimination', () => {
  it('suggests clearing x first, with the multiplier in words', () => {
    const step = nextStep(unique);
    expect(step).toEqual({ op: 'add', target: 1, source: 0, k: fraction(1) });
    expect(stepText(/** @type {any} */ (step))).toBe('Cộng phương trình (2) với phương trình (1).');
    expect(stepText({ op: 'add', target: 2, source: 0, k: fraction(-2) })).toBe(
      'Cộng phương trình (3) với $(-2)$ lần phương trình (1).',
    );
  });

  it('swaps when the pivot is missing', () => {
    const s = systemOf([
      [0, 1, 1, 7],
      [1, 1, -2, 3],
      [0, 0, 2, 4],
    ]);
    expect(nextStep(s)).toEqual({ op: 'swap', i: 0, j: 1 });
  });

  it('reaches triangular form and back-solves to (-1; 6; 1)', () => {
    const t = eliminate(unique);
    expect(isTriangular(t)).toBe(true);
    const back = backSolve(t);
    expect(back?.values).toEqual([fraction(-1), fraction(6), fraction(1)]);
    expect(back?.lines[0]).toBe('Từ phương trình (3): $z = 1$.');
  });

  it('solves a triangular system directly', () => {
    const t = systemOf([
      [1, 1, -2, 3],
      [0, 1, 1, 7],
      [0, 0, 2, 4],
    ]);
    expect(nextStep(t)).toBeNull();
    expect(backSolve(t)?.values).toEqual([fraction(2), fraction(5), fraction(2)]);
  });

  it('classifies the three cases', () => {
    const u = classify(unique);
    expect(u.kind).toBe('unique');
    expect(u.kind === 'unique' && tupleTex(u.values)).toBe('(-1; 6; 1)');
    expect(classify(none).kind).toBe('none');
    const inf = classify(infinite);
    expect(inf.kind).toBe('infinite');
    expect(generalTex(inf)).toBe('(-1 + z; 3 - 2z; z)');
  });

  it('leaves 0z = 2 after elimination of a system with no solution', () => {
    const t = eliminate(none);
    expect(rowTex(t[2])).toBe('0z = 2');
    expect(backSolve(t)).toBeNull();
  });

  it('solves the textbook-style systems', () => {
    const cases = [
      [
        [
          [2, 1, -3, 3],
          [1, 1, 3, 2],
          [3, -2, 1, 1],
        ],
        '(1; 1; 0)',
      ],
      [
        [
          [1, 1, 1, 6],
          [1, 2, 3, 14],
          [3, -2, -1, -4],
        ],
        '(1; 2; 3)',
      ],
      [
        [
          [4, 2, 1, -1],
          [16, 4, 1, 3],
          [1, -1, 1, 8],
        ],
        '(1; -4; 3)',
      ],
    ];
    for (const [rows, want] of cases) {
      const sol = classify(systemOf(/** @type {number[][]} */ (rows)));
      expect(sol.kind === 'unique' && tupleTex(sol.values)).toBe(want);
    }
  });
});

describe('checking by substitution', () => {
  const mix = [
    { coeffs: [1, 1, 1], rhs: 100 },
    { coeffs: [0.1, 0.3, 0.5], rhs: 32 },
    { coeffs: [2, 0, -1], rhs: 0 },
  ];

  it('accepts the solution despite decimal coefficients', () => {
    expect(checkValues(mix, [10, 70, 20]).every((r) => r.ok)).toBe(true);
    expect(checkValues(mix, [20, 60, 20]).map((r) => r.ok)).toEqual([true, false, false]);
  });

  it('writes equations and substitutions in TeX', () => {
    expect(equationTex([0.1, 0.3, 0.5], 32)).toBe('0{,}1x + 0{,}3y + 0{,}5z = 32');
    expect(equationTex([2, 0, -1], 0)).toBe('2x - z = 0');
    expect(substitutionTex([2, 1, -1], [1, 3, -1])).toBe('2 \\cdot 1 + 3 - \\left(-1\\right)');
    expect(valueTex(-1 / 3)).toBe('-\\frac{1}{3}');
    expect(valueTex(2.5)).toBe('2{,}5');
    expect(valueTex(1 / 3 + 1 / 3)).toBe('\\frac{2}{3}');
  });
});
