/**
 * One-variable optimisation problems solved with the derivative: the
 * objective function on its domain, its derivative, and the point where it
 * reaches its optimum. The board moves x along the graph and reads the sign
 * of the derivative, the way the book's variation table does. Pure logic.
 */
import { numTex, tidy } from '#lib/core/number-format.js';

/**
 * @typedef {object} OptProblem
 * @property {string} id
 * @property {string} label the switch label
 * @property {string} story the problem, rich text
 * @property {string} x the variable's TeX name, e.g. 'r'
 * @property {string} xUnit plain text unit of x, '' for none
 * @property {string} f the function's TeX name, e.g. 'S'
 * @property {string} fUnit plain text unit of f(x)
 * @property {string} fTex TeX of the objective, 'S(r) = …'
 * @property {string} dfTex TeX of its derivative, "S'(r) = …"
 * @property {[number, number]} domain what the slider covers
 * @property {[number, number]} yRange the graph's value axis
 * @property {number} step slider step
 * @property {number} start first value of x
 * @property {number} digits decimals shown for f(x)
 * @property {'min' | 'max'} goal
 * @property {(x: number) => number} fn
 * @property {(x: number) => number} dfn
 * @property {number} best exact x of the optimum
 * @property {string} meaning what the optimum means in the story, rich text
 * @property {'can'} [picture] draw the can for the current x
 */

/** Volume of the can, cm³. */
export const CAN_VOLUME = 330;

/** Height of a can of volume `CAN_VOLUME` and radius r. @param {number} r */
export const canHeight = (r) => CAN_VOLUME / (Math.PI * r * r);

/** @type {OptProblem} */
export const CAN = {
  id: 'lon-nuoc',
  label: 'Lon nước',
  story:
    'Lon nước ngọt hình trụ có nắp, thể tích $330$ cm³. Chọn bán kính đáy $r$ để tốn ít vật liệu nhất, tức diện tích toàn phần $S$ nhỏ nhất. Từ $\\pi r^2h = 330$ có $h = \\dfrac{330}{\\pi r^2}$.',
  x: 'r',
  xUnit: 'cm',
  f: 'S',
  fUnit: 'cm²',
  fTex: 'S(r) = 2\\pi r^2 + 2\\pi rh = 2\\pi r^2 + \\dfrac{660}{r}',
  dfTex: "S'(r) = 4\\pi r - \\dfrac{660}{r^2}",
  domain: [2, 7],
  yRange: [240, 420],
  step: 0.01,
  start: 2.5,
  digits: 1,
  goal: 'min',
  fn: (r) => 2 * Math.PI * r * r + (2 * CAN_VOLUME) / r,
  dfn: (r) => 4 * Math.PI * r - (2 * CAN_VOLUME) / (r * r),
  best: Math.cbrt(CAN_VOLUME / (2 * Math.PI)),
  meaning:
    "$S'(r) = 0 \\Leftrightarrow r^3 = \\dfrac{165}{\\pi}$, $r \\approx 3{,}74$ cm. Khi đó $h = 2r \\approx 7{,}49$ cm: lon tốn ít vật liệu nhất có chiều cao bằng đường kính đáy.",
  picture: 'can',
};

/** @type {OptProblem} */
export const FISHER = {
  id: 'danh-ca',
  label: 'Người đánh cá',
  story:
    'Thuyền ở $A$ cách bờ $AP = 2$ km, nhà ở $B$ trên bờ, $PB = 6$ km. Người đánh cá chèo thuyền ($3$ km/h) tới điểm $Q$ trên bờ, $PQ = x$, rồi đi bộ ($5$ km/h) về $B$. Chọn $x$ để thời gian $T$ (giờ) ngắn nhất.',
  x: 'x',
  xUnit: 'km',
  f: 'T',
  fUnit: 'giờ',
  fTex: 'T(x) = \\dfrac{\\sqrt{x^2 + 4}}{3} + \\dfrac{6 - x}{5}',
  dfTex: "T'(x) = \\dfrac{x}{3\\sqrt{x^2 + 4}} - \\dfrac{1}{5}",
  domain: [0, 6],
  yRange: [1.6, 2.2],
  step: 0.05,
  start: 5,
  digits: 3,
  goal: 'min',
  fn: (x) => Math.sqrt(x * x + 4) / 3 + (6 - x) / 5,
  dfn: (x) => x / (3 * Math.sqrt(x * x + 4)) - 1 / 5,
  best: 1.5,
  meaning:
    "$T'(x) = 0 \\Leftrightarrow 5x = 3\\sqrt{x^2 + 4} \\Leftrightarrow x = 1{,}5$. Thời gian ngắn nhất $T(1{,}5) = \\dfrac{26}{15}$ giờ, khoảng $1$ giờ $44$ phút.",
};

/** @type {OptProblem} */
export const MOTORBIKE = {
  id: 'xe-may',
  label: 'Giá bán xe',
  story:
    'Cửa hàng nhập xe giá $27$ triệu đồng/chiếc, bán $31$ triệu đồng/chiếc thì mỗi năm bán được $600$ chiếc; cứ giảm giá $1$ triệu đồng thì bán thêm $200$ chiếc. Giảm giá $x$ triệu đồng, lợi nhuận một năm là $P(x)$ triệu đồng.',
  x: 'x',
  xUnit: 'triệu đồng',
  f: 'P',
  fUnit: 'triệu đồng',
  fTex: 'P(x) = (600 + 200x)(4 - x) = -200x^2 + 200x + 2\\,400',
  dfTex: "P'(x) = -400x + 200",
  domain: [0, 3],
  yRange: [1000, 2600],
  step: 0.05,
  start: 2,
  digits: 0,
  goal: 'max',
  fn: (x) => -200 * x * x + 200 * x + 2400,
  dfn: (x) => -400 * x + 200,
  best: 0.5,
  meaning:
    'Giảm giá $0{,}5$ triệu đồng, tức bán $30{,}5$ triệu đồng/chiếc: bán được $700$ chiếc, lợi nhuận lớn nhất $2\\,450$ triệu đồng.',
};

/** @type {OptProblem} */
export const BOX = {
  id: 'hop-ton',
  label: 'Hộp không nắp',
  story:
    'Từ tấm tôn hình vuông cạnh $60$ cm, cắt ở bốn góc bốn hình vuông cạnh $x$ cm rồi gập lên thành chiếc hộp không nắp. Chọn $x$ để hộp có thể tích $V$ lớn nhất.',
  x: 'x',
  xUnit: 'cm',
  f: 'V',
  fUnit: 'cm³',
  fTex: 'V(x) = x(60 - 2x)^2,\\ 0 < x < 30',
  dfTex: "V'(x) = (60 - 2x)(60 - 6x)",
  domain: [0.5, 29.5],
  yRange: [0, 18000],
  step: 0.5,
  start: 22,
  digits: 0,
  goal: 'max',
  fn: (x) => x * (60 - 2 * x) ** 2,
  dfn: (x) => (60 - 2 * x) * (60 - 6 * x),
  best: 10,
  meaning: 'Cắt các hình vuông cạnh $10$ cm, hộp có thể tích lớn nhất $16\\,000$ cm³.',
};

/** @type {OptProblem} */
export const WINDOW = {
  id: 'cua-so',
  label: 'Cửa sổ',
  story:
    'Cửa sổ gồm hình chữ nhật phía dưới và nửa hình tròn bán kính $r$ (m) phía trên, chu vi cả cửa sổ là $4$ m. Chọn $r$ để diện tích $A$ (lấy sáng) lớn nhất. Chiều cao phần chữ nhật là $h = \\dfrac{4 - 2r - \\pi r}{2}$.',
  x: 'r',
  xUnit: 'm',
  f: 'A',
  fUnit: 'm²',
  fTex: 'A(r) = 2rh + \\dfrac{\\pi r^2}{2} = 4r - \\left(2 + \\dfrac{\\pi}{2}\\right)r^2',
  dfTex: "A'(r) = 4 - (4 + \\pi)r",
  domain: [0.1, 0.77],
  yRange: [0, 1.2],
  step: 0.01,
  start: 0.2,
  digits: 3,
  goal: 'max',
  fn: (r) => 4 * r - (2 + Math.PI / 2) * r * r,
  dfn: (r) => 4 - (4 + Math.PI) * r,
  best: 4 / (4 + Math.PI),
  meaning:
    "$A'(r) = 0 \\Leftrightarrow r = \\dfrac{4}{4 + \\pi} \\approx 0{,}56$ m. Diện tích lớn nhất là $\\dfrac{8}{4 + \\pi} \\approx 1{,}12$ m².",
};

/**
 * Whether x is the slider value nearest the optimum.
 * @param {OptProblem} pr @param {number} x
 */
export const atBest = (pr, x) => Math.abs(x - pr.best) <= pr.step / 2 + 1e-9;

/**
 * Points of the graph, for an SVG polyline.
 * @param {OptProblem} pr @param {number} [n]
 * @returns {{ x: number, y: number }[]}
 */
export function samples(pr, n = 160) {
  const [a, b] = pr.domain;
  return Array.from({ length: n + 1 }, (_, i) => {
    const x = a + ((b - a) * i) / n;
    return { x, y: pr.fn(x) };
  });
}

/**
 * The live readout: x, f(x) and f′(x), rich text.
 * @param {OptProblem} pr @param {number} x
 */
export function readout(pr, x) {
  const xu = pr.xUnit ? ` ${pr.xUnit}` : '';
  const v = pr.fn(x);
  const vr = tidy(v, pr.digits);
  const d = tidy(pr.dfn(x), 3);
  return `$${pr.x} = ${numTex(tidy(x, 2))}$${xu}; $${pr.f} ${vr === tidy(v, 9) ? '=' : '\\approx'} ${numTex(vr)}$ ${pr.fUnit}; $${pr.f}'(${pr.x}) ${d === tidy(pr.dfn(x), 9) ? '=' : '\\approx'} ${numTex(d)}$.`;
}

/**
 * The sign of the derivative and where to move, rich text.
 * @param {OptProblem} pr @param {number} x
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function slopeVerdict(pr, x) {
  const word = pr.goal === 'min' ? 'nhỏ nhất' : 'lớn nhất';
  const name = `${pr.f}'(${pr.x})`;
  if (atBest(pr, x)) {
    return {
      tone: 'ok',
      text: `$${name} \\approx 0$: tiếp tuyến nằm ngang, $${pr.f}'$ đổi dấu tại đây nên $${pr.f}$ đạt giá trị ${word}. ${pr.meaning}`,
    };
  }
  const d = pr.dfn(x);
  const rising = d > 0;
  const toward = rising === (pr.goal === 'max') ? 'tăng' : 'giảm';
  return {
    tone: 'info',
    text: `$${name} ${rising ? '>' : '<'} 0$: $${pr.f}$ đang ${rising ? 'đồng biến' : 'nghịch biến'}, nên muốn $${pr.f}$ ${pr.goal === 'min' ? 'nhỏ hơn' : 'lớn hơn'} thì ${toward} $${pr.x}$.`,
  };
}
