/**
 * The three situations of the set-up-and-check widget. Each equation keeps
 * its coefficients and right side as numbers (for checking) and a sentence
 * saying what it counts. `solution` is the system's only solution, which the
 * tests check against every equation.
 */

/**
 * @typedef {{ name: string, label: string, unit: string, min: number, max: number, step: number, start: number }} Unknown
 * @typedef {{ coeffs: number[], rhs: number, meaning: string }} Equation
 * @typedef {{
 *   id: string,
 *   label: string,
 *   story: string,
 *   unknowns: Unknown[],
 *   equations: Equation[],
 *   solution: number[],
 *   done: string,
 * }} Scenario
 */

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'mua-hang',
    label: 'Mua hàng',
    story:
      'Hà mua $2$ kg thịt lợn, $1$ kg thịt bò, $1$ kg thịt gà hết $580$ nghìn đồng. Lan mua $1$ kg thịt lợn, $2$ kg thịt bò, $1$ kg thịt gà hết $710$ nghìn đồng. Minh mua $1$ kg thịt lợn, $1$ kg thịt bò, $3$ kg thịt gà hết $640$ nghìn đồng. Gọi $x$, $y$, $z$ (nghìn đồng) là giá $1$ kg thịt lợn, thịt bò, thịt gà.',
    unknowns: [
      {
        name: 'x',
        label: 'Giá 1 kg thịt lợn x',
        unit: 'nghìn đồng',
        min: 0,
        max: 300,
        step: 10,
        start: 100,
      },
      {
        name: 'y',
        label: 'Giá 1 kg thịt bò y',
        unit: 'nghìn đồng',
        min: 0,
        max: 300,
        step: 10,
        start: 200,
      },
      {
        name: 'z',
        label: 'Giá 1 kg thịt gà z',
        unit: 'nghìn đồng',
        min: 0,
        max: 300,
        step: 10,
        start: 100,
      },
    ],
    equations: [
      { coeffs: [2, 1, 1], rhs: 580, meaning: 'Số tiền Hà trả' },
      { coeffs: [1, 2, 1], rhs: 710, meaning: 'Số tiền Lan trả' },
      { coeffs: [1, 1, 3], rhs: 640, meaning: 'Số tiền Minh trả' },
    ],
    solution: [120, 250, 90],
    done: 'Thịt lợn $120$ nghìn đồng/kg, thịt bò $250$ nghìn đồng/kg, thịt gà $90$ nghìn đồng/kg.',
  },
  {
    id: 'pha-tron',
    label: 'Pha trộn',
    story:
      'Mai có ba lọ dung dịch acid: lọ A nồng độ $10\\%$, lọ B $30\\%$, lọ C $50\\%$. Mai cần $100$ ml dung dịch chứa $32$ ml acid nguyên chất, trong đó lượng lấy từ lọ C gấp đôi lượng lấy từ lọ A. Gọi $x$, $y$, $z$ (ml) là lượng dung dịch lấy từ lọ A, B, C.',
    unknowns: [
      { name: 'x', label: 'Lấy từ lọ A (10%) x', unit: 'ml', min: 0, max: 100, step: 5, start: 30 },
      { name: 'y', label: 'Lấy từ lọ B (30%) y', unit: 'ml', min: 0, max: 100, step: 5, start: 30 },
      { name: 'z', label: 'Lấy từ lọ C (50%) z', unit: 'ml', min: 0, max: 100, step: 5, start: 40 },
    ],
    equations: [
      { coeffs: [1, 1, 1], rhs: 100, meaning: 'Thể tích dung dịch (ml)' },
      { coeffs: [0.1, 0.3, 0.5], rhs: 32, meaning: 'Lượng acid nguyên chất (ml)' },
      { coeffs: [2, 0, -1], rhs: 0, meaning: 'Lọ C gấp đôi lọ A: $z = 2x$' },
    ],
    solution: [10, 70, 20],
    done: 'Lấy $10$ ml từ lọ A, $70$ ml từ lọ B và $20$ ml từ lọ C.',
  },
  {
    id: 'phan-ung',
    label: 'Cân bằng phản ứng',
    story:
      'Cân bằng phản ứng đốt cháy propane $\\mathrm{C_3H_8} + y\\,\\mathrm{O_2} \\to z\\,\\mathrm{CO_2} + t\\,\\mathrm{H_2O}$ (đã chọn hệ số của $\\mathrm{C_3H_8}$ bằng $1$). Số nguyên tử mỗi nguyên tố ở hai vế phải bằng nhau.',
    unknowns: [
      { name: 'y', label: 'Hệ số của O₂ là y', unit: '', min: 1, max: 10, step: 1, start: 1 },
      { name: 'z', label: 'Hệ số của CO₂ là z', unit: '', min: 1, max: 10, step: 1, start: 1 },
      { name: 't', label: 'Hệ số của H₂O là t', unit: '', min: 1, max: 10, step: 1, start: 1 },
    ],
    equations: [
      { coeffs: [0, 1, 0], rhs: 3, meaning: 'Nguyên tố C: vế trái $3$, vế phải $z$' },
      { coeffs: [0, 0, 2], rhs: 8, meaning: 'Nguyên tố H: vế trái $8$, vế phải $2t$' },
      { coeffs: [2, -2, -1], rhs: 0, meaning: 'Nguyên tố O: vế trái $2y$, vế phải $2z + t$' },
    ],
    solution: [5, 3, 4],
    done: 'Phương trình đã cân bằng: $\\mathrm{C_3H_8} + 5\\mathrm{O_2} \\to 3\\mathrm{CO_2} + 4\\mathrm{H_2O}$.',
  },
];
