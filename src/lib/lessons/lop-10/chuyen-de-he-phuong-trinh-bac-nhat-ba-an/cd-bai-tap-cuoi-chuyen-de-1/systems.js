/**
 * The systems of the self-check widget, taken from this lesson's exercises.
 * `solution` is each system's only solution (the tests check it); the
 * widget never shows it, it only substitutes what the learner types.
 */

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   context: string,
 *   names: string[],
 *   equations: Array<{ coeffs: number[], rhs: number }>,
 *   solution: number[],
 * }} CheckSystem
 */

/** @type {CheckSystem[]} */
export const SYSTEMS = [
  {
    id: 'he',
    label: 'Hệ số',
    context: 'Giải hệ phương trình.',
    names: ['x', 'y', 'z'],
    equations: [
      { coeffs: [1, 1, 1], rhs: 6 },
      { coeffs: [1, 2, 3], rhs: 14 },
      { coeffs: [3, -2, -1], rhs: -4 },
    ],
    solution: [1, 2, 3],
  },
  {
    id: 'parabol',
    label: 'Parabol',
    context:
      'Parabol $y = ax^2 + bx + c$ đi qua $A(2; -1)$, $B(4; 3)$, $C(-1; 8)$: thay toạ độ từng điểm được một phương trình với ẩn $a$, $b$, $c$.',
    names: ['a', 'b', 'c'],
    equations: [
      { coeffs: [4, 2, 1], rhs: -1 },
      { coeffs: [16, 4, 1], rhs: 3 },
      { coeffs: [1, -1, 1], rhs: 8 },
    ],
    solution: [1, -4, 3],
  },
  {
    id: 'duong-tron',
    label: 'Đường tròn',
    context:
      'Đường tròn $x^2 + y^2 - 2ax - 2by + c = 0$ đi qua $A(0; 1)$, $B(2; 3)$, $C(4; 1)$: mỗi điểm cho một phương trình với ẩn $a$, $b$, $c$.',
    names: ['a', 'b', 'c'],
    equations: [
      { coeffs: [0, -2, 1], rhs: -1 },
      { coeffs: [-4, -6, 1], rhs: -13 },
      { coeffs: [-8, -2, 1], rhs: -17 },
    ],
    solution: [2, 1, 1],
  },
  {
    id: 'doan-xe',
    label: 'Đoàn xe',
    context:
      'Đoàn $36$ xe chở $255$ tấn gạo, gồm $x$ xe loại $5$ tấn, $y$ xe loại $7$ tấn, $z$ xe loại $10$ tấn; xe loại $7$ tấn nhiều hơn xe loại $5$ tấn $3$ chiếc.',
    names: ['x', 'y', 'z'],
    equations: [
      { coeffs: [1, 1, 1], rhs: 36 },
      { coeffs: [5, 7, 10], rhs: 255 },
      { coeffs: [-1, 1, 0], rhs: 3 },
    ],
    solution: [12, 15, 9],
  },
  {
    id: 'phan-thuc',
    label: 'Phân thức',
    context:
      'Đồng nhất hệ số của $1 = A(x^2 - x + 1) + (Bx + C)(x + 1)$: hệ số của $x^2$, của $x$ và hệ số tự do. Có thể nhập phân số dạng $a/b$.',
    names: ['A', 'B', 'C'],
    equations: [
      { coeffs: [1, 1, 0], rhs: 0 },
      { coeffs: [-1, 1, 1], rhs: 0 },
      { coeffs: [1, 0, 1], rhs: 1 },
    ],
    solution: [1 / 3, -1 / 3, 2 / 3],
  },
];
