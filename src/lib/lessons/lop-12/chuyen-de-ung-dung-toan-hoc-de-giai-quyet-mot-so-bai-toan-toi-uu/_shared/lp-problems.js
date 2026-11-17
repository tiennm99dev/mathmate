/**
 * The linear programming problems the level-line board solves: a story, the
 * constraints with x ≥ 0, y ≥ 0, the objective F = p·x + q·y and its goal,
 * and the drawing box.
 */

/**
 * @typedef {object} LpProblem
 * @property {string} id
 * @property {string} label the switch label
 * @property {string} story the problem and its unknowns, rich text
 * @property {import('./lp.js').Constraint[]} constraints
 * @property {number} p @property {number} q F = p·x + q·y
 * @property {import('./lp.js').Goal} goal
 * @property {import('./lp.js').Box} box drawing box, larger than every vertex
 * @property {number} labelEvery number every n-th grid line
 * @property {number} kStep slider step of k; the optimum is a multiple of it
 * @property {string} unit unit of F
 * @property {string} meaning what the optimum means in the story, rich text
 */

/** @type {import('./lp.js').Constraint[]} */
const NONNEG = [
  { a: 1, b: 0, c: 0, op: '>=' },
  { a: 0, b: 1, c: 0, op: '>=' },
];

/** @type {LpProblem} */
export const FACTORY = {
  id: 'san-xuat',
  label: 'Sản xuất',
  story:
    'Mỗi kilôgam sản phẩm loại I cần $2$ kg nguyên liệu và $30$ giờ làm, lãi $40$ nghìn đồng; mỗi kilôgam sản phẩm loại II cần $4$ kg nguyên liệu và $15$ giờ làm, lãi $30$ nghìn đồng. Xưởng có $200$ kg nguyên liệu và $1\\,200$ giờ làm. Sản xuất $x$ kg loại I và $y$ kg loại II.',
  constraints: [{ a: 1, b: 2, c: 100, op: '<=' }, { a: 2, b: 1, c: 80, op: '<=' }, ...NONNEG],
  p: 40,
  q: 30,
  goal: 'max',
  box: { xMin: -5, xMax: 60, yMin: -5, yMax: 60 },
  labelEvery: 10,
  kStep: 50,
  unit: 'nghìn đồng',
  meaning: 'Xưởng nên sản xuất $20$ kg loại I và $40$ kg loại II, lãi $2$ triệu đồng.',
};

/** @type {LpProblem} */
export const DIET = {
  id: 'khau-phan',
  label: 'Khẩu phần',
  story:
    'Mỗi kilôgam thức ăn I chứa $1$ đơn vị chất đạm và $1$ đơn vị vitamin, giá $30$ nghìn đồng; mỗi kilôgam thức ăn II chứa $1$ đơn vị chất đạm và $2$ đơn vị vitamin, giá $40$ nghìn đồng. Khẩu phần cần ít nhất $3$ đơn vị chất đạm và $4$ đơn vị vitamin. Mua $x$ kg thức ăn I và $y$ kg thức ăn II.',
  constraints: [{ a: 1, b: 1, c: 3, op: '>=' }, { a: 1, b: 2, c: 4, op: '>=' }, ...NONNEG],
  p: 30,
  q: 40,
  goal: 'min',
  box: { xMin: -1, xMax: 7, yMin: -1, yMax: 6 },
  labelEvery: 1,
  kStep: 10,
  unit: 'nghìn đồng',
  meaning:
    'Mua $2$ kg thức ăn I và $1$ kg thức ăn II là rẻ nhất. Miền không bị chặn nên chi phí không có giá trị lớn nhất, nhưng vẫn có giá trị nhỏ nhất.',
};

/** @type {LpProblem} */
export const RENTAL = {
  id: 'thue-xe',
  label: 'Thuê xe',
  story:
    'Cần chở $140$ người và $9$ tấn hàng. Mỗi xe loại A chở $20$ người và $0{,}6$ tấn hàng, giá thuê $4$ triệu đồng; mỗi xe loại B chở $10$ người và $1{,}5$ tấn hàng, giá thuê $3$ triệu đồng. Chỉ có $10$ xe loại A và $9$ xe loại B. Thuê $x$ xe loại A và $y$ xe loại B.',
  constraints: [
    { a: 2, b: 1, c: 14, op: '>=' },
    { a: 2, b: 5, c: 30, op: '>=' },
    { a: 1, b: 0, c: 10, op: '<=' },
    { a: 0, b: 1, c: 9, op: '<=' },
    ...NONNEG,
  ],
  p: 4,
  q: 3,
  goal: 'min',
  box: { xMin: -1, xMax: 12, yMin: -1, yMax: 11 },
  labelEvery: 2,
  kStep: 1,
  unit: 'triệu đồng',
  meaning: 'Thuê $5$ xe loại A và $4$ xe loại B, chi phí thấp nhất là $32$ triệu đồng.',
};

/** @type {LpProblem} */
export const MACHINES = {
  id: 'ba-may',
  label: 'Ba máy',
  story:
    'Mỗi sản phẩm loại I cần $1$ giờ trên máy A, $1$ giờ trên máy B và $2$ giờ trên máy C, lãi $3$ triệu đồng; mỗi sản phẩm loại II cần $1$ giờ trên máy A, $3$ giờ trên máy B và $1$ giờ trên máy C, lãi $5$ triệu đồng. Trong ngày, máy A chạy tối đa $8$ giờ, máy B $18$ giờ, máy C $14$ giờ. Làm $x$ sản phẩm loại I và $y$ sản phẩm loại II.',
  constraints: [
    { a: 1, b: 1, c: 8, op: '<=' },
    { a: 1, b: 3, c: 18, op: '<=' },
    { a: 2, b: 1, c: 14, op: '<=' },
    ...NONNEG,
  ],
  p: 3,
  q: 5,
  goal: 'max',
  box: { xMin: -1, xMax: 10, yMin: -1, yMax: 9 },
  labelEvery: 2,
  kStep: 1,
  unit: 'triệu đồng',
  meaning: 'Làm $3$ sản phẩm loại I và $5$ sản phẩm loại II, lãi nhiều nhất $34$ triệu đồng.',
};
