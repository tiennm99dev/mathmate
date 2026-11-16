/**
 * The mixed practice of the grade 4 chapter on perpendicular and parallel
 * lines: telling how two lines lie, finding the parallel or perpendicular
 * side of a drawn quadrilateral, judging a statement about its sides true or
 * false, the sides of a parallelogram and a rhombus, picking a parallelogram
 * or a rhombus among shapes, the hands of a clock at right angles and the
 * set-square steps of the drawings. One round of ten questions in a shuffled
 * order. Every side fact is computed exactly from grid corners. Pure and
 * DOM-free.
 *
 * @typedef {import('../_shared/lines.js').Pt} Pt
 * @typedef {'chu-nhat' | 'thang-vuong' | 'thang-vuong-phai' | 'thang' | 'binh-hanh' | 'thoi' | 'tu-giac'} Shape
 * @typedef {readonly [string, string, string, string]} Names
 * @typedef {{ type: 'lines', a: number, b: number }
 *   | { type: 'quad', shape: Shape, names: Names }
 *   | { type: 'clock', minutes: number }
 *   | { type: 'none' }} Visual
 * @typedef {{ label: string, shape: Shape }} ShapeOption
 * @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { RELATION_WORDS, lineAngle, relationOf } from '../_shared/lines.js';

/** What each part of the round practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'hai-duong-thang': 'Nhận ra hai đường thẳng vuông góc, song song',
  'canh-song-song': 'Tìm cạnh song song trên hình',
  'canh-vuong-goc': 'Tìm cạnh vuông góc trên hình',
  'dung-sai': 'Đúng hay sai: cạnh song song, cạnh vuông góc',
  'binh-hanh': 'Cạnh của hình bình hành',
  'hinh-thoi': 'Cạnh của hình thoi',
  'nhan-hinh': 'Nhận ra hình bình hành, hình thoi',
  'dong-ho': 'Hai kim đồng hồ vuông góc',
  've-hinh': 'Vẽ bằng ê ke',
});

/**
 * The corners A, B, C, D of each shape on a grid (grid units, y pointing
 * down, A at the bottom left, going round). Exact grid points keep every
 * parallel and right-angle test exact.
 * @type {Record<Shape, readonly [Pt, Pt, Pt, Pt]>}
 */
export const SHAPES = {
  'chu-nhat': [
    { x: 1, y: 6 },
    { x: 9, y: 6 },
    { x: 9, y: 2 },
    { x: 1, y: 2 },
  ],
  'thang-vuong': [
    { x: 1, y: 6 },
    { x: 9, y: 6 },
    { x: 6, y: 2 },
    { x: 1, y: 2 },
  ],
  'thang-vuong-phai': [
    { x: 1, y: 6 },
    { x: 9, y: 6 },
    { x: 9, y: 2 },
    { x: 4, y: 2 },
  ],
  thang: [
    { x: 1, y: 6 },
    { x: 9, y: 6 },
    { x: 7, y: 2 },
    { x: 3, y: 2 },
  ],
  'binh-hanh': [
    { x: 1, y: 6 },
    { x: 7, y: 6 },
    { x: 9, y: 2 },
    { x: 3, y: 2 },
  ],
  thoi: [
    { x: 1, y: 6 },
    { x: 6, y: 6 },
    { x: 9, y: 2 },
    { x: 4, y: 2 },
  ],
  'tu-giac': [
    { x: 1, y: 6 },
    { x: 8, y: 7 },
    { x: 7, y: 1 },
    { x: 2, y: 2 },
  ],
};

/** What a screen reader hears for a shape among picture options; never its name. */
export const SHAPE_FEATURES = /** @type {Record<Shape, string>} */ ({
  'chu-nhat': 'Tứ giác có bốn góc vuông, hai cạnh dài, hai cạnh ngắn',
  'thang-vuong': 'Tứ giác chỉ có một cặp cạnh đối diện song song, có góc vuông',
  'thang-vuong-phai': 'Tứ giác chỉ có một cặp cạnh đối diện song song, có góc vuông',
  thang: 'Tứ giác chỉ có một cặp cạnh đối diện song song',
  'binh-hanh': 'Tứ giác có hai cặp cạnh đối diện song song, hai cạnh kề không bằng nhau',
  thoi: 'Tứ giác có hai cặp cạnh đối diện song song, bốn cạnh bằng nhau',
  'tu-giac': 'Tứ giác không có cặp cạnh đối diện nào song song',
});

/** Grid size of the drawing (grid units). */
export const BOARD = { w: 10, h: 8 };

/** Vertex names the book uses, in the order A, B, C, D. */
export const NAME_SETS = /** @type {readonly Names[]} */ ([
  ['A', 'B', 'C', 'D'],
  ['M', 'N', 'P', 'Q'],
  ['E', 'G', 'H', 'K'],
]);

/** The four sides as corner index pairs: AB, BC, DC, AD (the book's spelling). */
export const SIDES = /** @type {const} */ ([
  [0, 1],
  [1, 2],
  [3, 2],
  [0, 3],
]);

/**
 * The name of side `i` of `SIDES`.
 * @param {Names} names @param {number} i
 */
export const sideName = (names, i) => names[SIDES[i][0]] + names[SIDES[i][1]];

/**
 * The vector of side `i` of a shape.
 * @param {Shape} shape @param {number} i
 */
function sideVec(shape, i) {
  const [p, q] = SIDES[i].map((k) => SHAPES[shape][k]);
  return { x: q.x - p.x, y: q.y - p.y };
}

/**
 * How sides `i` and `j` of a shape lie: parallel, perpendicular or neither.
 * @param {Shape} shape @param {number} i @param {number} j
 * @returns {'song-song' | 'vuong-goc' | 'khac'}
 */
export function sideRelation(shape, i, j) {
  const u = sideVec(shape, i);
  const v = sideVec(shape, j);
  if (u.x * v.y - u.y * v.x === 0) return 'song-song';
  return u.x * v.x + u.y * v.y === 0 ? 'vuong-goc' : 'khac';
}

/**
 * The squared length of side `i` of a shape.
 * @param {Shape} shape @param {number} i
 */
export function sideSquare(shape, i) {
  const v = sideVec(shape, i);
  return v.x * v.x + v.y * v.y;
}

/**
 * What a screen reader hears for a drawn quadrilateral: each side as the
 * grid shows it (lying flat, standing upright, or slanting so many squares
 * across and up or down), never whether two sides are parallel or
 * perpendicular, so a blind learner reads the grid as a sighted one does.
 * @param {Shape} shape @param {Names} names
 */
export function quadText(shape, names) {
  const sides = SIDES.map(([p, q], i) => {
    const v = sideVec(shape, i);
    const name = `cạnh ${names[p]}${names[q]}`;
    if (v.y === 0) return `${name} nằm ngang, dài ${Math.abs(v.x)} ô`;
    if (v.x === 0) return `${name} thẳng đứng, dài ${Math.abs(v.y)} ô`;
    const across = `${Math.abs(v.x)} ô sang ${v.x > 0 ? 'phải' : 'trái'}`;
    const upDown = `${Math.abs(v.y)} ô ${v.y < 0 ? 'lên trên' : 'xuống dưới'}`;
    return `${name} nằm nghiêng, từ ${names[p]} đi ${across} và ${upDown} tới ${names[q]}`;
  });
  return `Tứ giác ${names.join('')} trên lưới ô vuông: ${sides.join('; ')}.`;
}

/**
 * What a screen reader hears for two drawn lines: whether they meet in the
 * picture and, when they cross, the angle at the crossing, which a sighted
 * learner checks with the set square.
 * @param {number} a @param {number} b directions in degrees
 */
export function linesText(a, b) {
  const m = lineAngle(a, b);
  return m === 0
    ? 'Hai đường thẳng màu tím và màu xanh nằm hai bên, cách đều nhau và không gặp nhau trong hình.'
    : `Hai đường thẳng màu tím và màu xanh cắt nhau ở giữa hình. Góc nhỏ ở chỗ cắt là ${m} độ.`;
}

/** The three answers for two lines, in the book's words. */
export const RELATION_OPTIONS = [
  capitalize(RELATION_WORDS['vuong-goc']),
  capitalize(RELATION_WORDS['song-song']),
  capitalize(RELATION_WORDS.cat),
];
const RELATIONS = /** @type {const} */ (['vuong-goc', 'song-song', 'cat']);

/**
 * How two lines drawn in the picture lie. A crossing that is not a right
 * angle is at least 35° away from one, so the eye can tell.
 * @param {() => number} rand
 * @param {(typeof RELATIONS)[number]} relation
 * @returns {Question}
 */
export function twoLines(rand, relation) {
  const a = int(rand, 0, 11) * 15;
  const turn = { 'vuong-goc': 90, 'song-song': 0, cat: pick(rand, [35, 45, 55, 125, 135, 145]) };
  const b = a + turn[relation];
  const solutions = {
    'vuong-goc':
      'Hai đường thẳng cắt nhau và tạo thành góc vuông, nên chúng vuông góc với nhau. Em kiểm tra bằng góc vuông của ê ke.',
    'song-song':
      'Kéo dài mãi về hai phía, hai đường thẳng không cắt nhau: chúng song song với nhau.',
    cat: 'Hai đường thẳng cắt nhau, nhưng góc ở chỗ cắt không phải góc vuông: chúng không vuông góc.',
  };
  return {
    prompt: 'Hai đường thẳng trong hình thế nào với nhau?',
    options: [...RELATION_OPTIONS],
    answer: RELATIONS.indexOf(relationOf(a, b)),
    hint: 'Em tưởng tượng kéo dài hai đường thẳng. Chúng có cắt nhau không? Nếu cắt nhau, em đặt góc vuông của ê ke vào chỗ cắt.',
    solution: solutions[relation],
    visual: { type: 'lines', a, b },
  };
}

/**
 * Which side of a drawn quadrilateral is parallel to a given side.
 * @param {() => number} rand
 * @returns {Question}
 */
export function parallelSide(rand) {
  const names = pick(rand, NAME_SETS);
  const shape = /** @type {Shape} */ (
    pick(rand, ['chu-nhat', 'thang', 'thang-vuong', 'binh-hanh'])
  );
  const sides = shape === 'chu-nhat' || shape === 'binh-hanh' ? [0, 1, 2, 3] : [0, 2];
  const ask = pick(rand, sides);
  const twin = [0, 1, 2, 3].find((j) => j !== ask && sideRelation(shape, ask, j) === 'song-song');
  const right = sideName(names, /** @type {number} */ (twin));
  const others = [0, 1, 2, 3].filter((j) => j !== ask && j !== twin).map((j) => sideName(names, j));
  const asked = sideName(names, ask);
  return {
    prompt: `Em nhìn hình. Cạnh nào song song với cạnh ${asked}?`,
    ...mixOptions(rand, right, others),
    hint: `Cạnh song song với ${asked} là cạnh đối diện, kéo dài mãi cũng không cắt ${asked}.`,
    solution: `Cạnh ${right} đối diện với cạnh ${asked} và song song với ${asked}. Hai cạnh còn lại chung một đỉnh với ${asked}, nên cắt ${asked}.`,
    visual: { type: 'quad', shape, names },
  };
}

/**
 * Which side of a right trapezoid is perpendicular to its bottom or top
 * side: the one upright side, since the slanted side is not.
 * @param {() => number} rand
 * @returns {Question}
 */
export function perpendicularSide(rand) {
  const names = pick(rand, NAME_SETS);
  const shape = /** @type {Shape} */ (pick(rand, ['thang-vuong', 'thang-vuong-phai']));
  const ask = pick(rand, [0, 2]);
  const upright = [1, 3].find((j) => sideRelation(shape, ask, j) === 'vuong-goc');
  const right = sideName(names, /** @type {number} */ (upright));
  const others = [0, 1, 2, 3]
    .filter((j) => j !== ask && j !== upright)
    .map((j) => sideName(names, j));
  const asked = sideName(names, ask);
  const slanted = sideName(names, upright === 1 ? 3 : 1);
  return {
    prompt: `Em nhìn hình. Cạnh nào vuông góc với cạnh ${asked}?`,
    ...mixOptions(rand, right, others),
    hint: `Em đặt góc vuông của ê ke vào từng đỉnh của cạnh ${asked}, một cạnh ê ke nằm trên ${asked}.`,
    solution: `Cạnh ${right} tạo với cạnh ${asked} một góc vuông, nên ${right} vuông góc với ${asked}. Cạnh ${slanted} nằm nghiêng, không tạo góc vuông với ${asked}.`,
    visual: { type: 'quad', shape, names },
  };
}

/**
 * A statement about two sides of a drawn quadrilateral, true or false, as
 * in the book's "Đ, S" exercise.
 * @param {() => number} rand
 * @returns {Question}
 */
export function trueOrFalse(rand) {
  const names = pick(rand, NAME_SETS);
  const want = rand() < 0.5;
  for (;;) {
    const shape = /** @type {Shape} */ (
      pick(rand, ['chu-nhat', 'thang-vuong', 'thang-vuong-phai', 'thang', 'binh-hanh'])
    );
    const i = int(rand, 0, 3);
    const j = pick(
      rand,
      [0, 1, 2, 3].filter((k) => k !== i),
    );
    const claim = pick(rand, /** @type {const} */ (['song-song', 'vuong-goc']));
    const fact = sideRelation(shape, i, j);
    if ((fact === claim) !== want) continue;
    const [p, q] = [sideName(names, i), sideName(names, j)];
    const word = claim === 'song-song' ? 'song song' : 'vuông góc';
    const truth = {
      'song-song': `${p} và ${q} kéo dài mãi cũng không cắt nhau: chúng song song với nhau.`,
      'vuong-goc': `${p} và ${q} tạo thành một góc vuông: chúng vuông góc với nhau.`,
      khac: `${p} và ${q} kéo dài thì cắt nhau, nhưng không tạo thành góc vuông.`,
    };
    return {
      prompt: `Cạnh ${p} ${word} với cạnh ${q}. Đúng hay sai?`,
      options: ['Đúng', 'Sai'],
      answer: want ? 0 : 1,
      hint:
        claim === 'song-song'
          ? `Em tưởng tượng kéo dài hai cạnh ${p} và ${q}. Chúng có cắt nhau không?`
          : `Em đặt góc vuông của ê ke vào chỗ hai cạnh ${p} và ${q} gặp nhau.`,
      solution: `${want ? 'Đúng' : 'Sai'}. ${truth[fact]}`,
      visual: { type: 'quad', shape, names },
    };
  }
}

/**
 * Lengths in centimetres as options, the right one among the slips.
 * @param {() => number} rand @param {number} right @param {number[]} slips
 */
function cmOptions(rand, right, slips) {
  return mixOptions(
    rand,
    `${right} cm`,
    slips.map((v) => `${v} cm`),
  );
}

/**
 * A side of a parallelogram from the two sides given.
 * @param {() => number} rand
 * @returns {Question}
 */
export function parallelogramSide(rand) {
  const names = pick(rand, NAME_SETS);
  const [A, B, C, D] = names;
  const ab = int(rand, 4, 9);
  const ad = int(rand, 2, ab - 1);
  const askDc = rand() < 0.5;
  const right = askDc ? ab : ad;
  const asked = askDc ? `${D}${C}` : `${B}${C}`;
  const twin = askDc ? `${A}${B}` : `${A}${D}`;
  const { options, answer } = cmOptions(rand, right, [askDc ? ad : ab, ab + ad, right - 1]);
  return {
    prompt: `Hình bình hành ${names.join('')} có ${A}${B} = ${ab} cm, ${A}${D} = ${ad} cm. Cạnh ${asked} dài bao nhiêu xăng-ti-mét?`,
    options,
    answer,
    hint: `Cạnh ${asked} đối diện với cạnh nào? Hình bình hành có hai cặp cạnh đối diện bằng nhau.`,
    solution: `Cạnh ${asked} đối diện với cạnh ${twin}, nên ${asked} = ${twin} = ${right} cm.`,
    visual: { type: 'quad', shape: 'binh-hanh', names },
  };
}

/**
 * A rhombus from one side: another side, or the four sides together.
 * @param {() => number} rand
 * @returns {Question}
 */
export function rhombusSide(rand) {
  const names = pick(rand, NAME_SETS);
  const [A, B, C, D] = names;
  const a = int(rand, 2, 9);
  const total = rand() < 0.5;
  const shape = names.join('');
  if (total) {
    const right = 4 * a;
    const { options, answer } = cmOptions(rand, right, [2 * a, 3 * a, a + 4]);
    return {
      prompt: `Hình thoi ${shape} có cạnh ${A}${B} = ${a} cm. Tổng độ dài bốn cạnh là bao nhiêu xăng-ti-mét?`,
      options,
      answer,
      hint: 'Hình thoi có bốn cạnh bằng nhau. Em cộng độ dài bốn cạnh.',
      solution: `Bốn cạnh đều dài ${a} cm: ${a} + ${a} + ${a} + ${a} = ${right} (cm).`,
      visual: { type: 'quad', shape: 'thoi', names },
    };
  }
  const asked = pick(rand, [`${B}${C}`, `${D}${C}`, `${A}${D}`]);
  const { options, answer } = cmOptions(rand, a, [a + 1, a - 1, 2 * a]);
  return {
    prompt: `Hình thoi ${shape} có cạnh ${A}${B} = ${a} cm. Cạnh ${asked} dài bao nhiêu xăng-ti-mét?`,
    options,
    answer,
    hint: 'Các cạnh của hình thoi dài thế nào so với nhau?',
    solution: `Hình thoi có bốn cạnh bằng nhau, nên ${asked} = ${A}${B} = ${a} cm.`,
    visual: { type: 'quad', shape: 'thoi', names },
  };
}

/**
 * Picking the parallelogram or the rhombus among three shapes. Wrong
 * options are never also the asked shape: a rhombus is also a
 * parallelogram, so it is not a wrong option when a parallelogram is asked.
 * @param {() => number} rand
 * @returns {Question}
 */
export function pickShape(rand) {
  const rhombus = rand() < 0.5;
  /** @type {Shape} */
  const right = rhombus ? 'thoi' : 'binh-hanh';
  /** @type {Shape[]} */
  const wrongs = rhombus
    ? [pick(rand, ['chu-nhat', 'binh-hanh']), pick(rand, ['thang', 'tu-giac'])]
    : [pick(rand, ['thang', 'thang-vuong']), 'tu-giac'];
  const shapes = shuffle(rand, [right, ...wrongs]);
  /** @type {ShapeOption[]} */
  const options = shapes.map((shape, i) => ({ label: `Hình ${i + 1}`, shape }));
  const name = rhombus ? 'hình thoi' : 'hình bình hành';
  return {
    prompt: `Hình nào là ${name}?`,
    options,
    answer: shapes.indexOf(right),
    optionLabels: shapes.map((s, i) => `Hình ${i + 1}: ${SHAPE_FEATURES[s]}`),
    hint: rhombus
      ? 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.'
      : 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.',
    solution: `Hình ${shapes.indexOf(right) + 1} là ${name}: ${SHAPE_FEATURES[right].replace('Tứ giác có', 'nó có')}.`,
    visual: { type: 'none' },
  };
}

/** Whole hours at which the hands of a clock are at right angles. */
export const RIGHT_HOURS = [3, 9];

/**
 * The other whole hour at which the clock's hands are perpendicular.
 * @param {() => number} rand
 * @returns {Question}
 */
export function clockHands(rand) {
  const shown = pick(rand, RIGHT_HOURS);
  const right = shown === 3 ? 9 : 3;
  const others = shuffle(rand, [1, 2, 4, 5, 6, 7, 8, 10, 11, 12]).slice(0, 3);
  const { options, answer } = mixOptions(
    rand,
    `${right} giờ`,
    others.map((h) => `${h} giờ`),
  );
  return {
    prompt: `Lúc ${shown} giờ, hai kim đồng hồ vuông góc với nhau. Lúc mấy giờ hai kim cũng vuông góc với nhau?`,
    options,
    answer,
    hint: `Kim phút chỉ số 12. Kim giờ phải chỉ số nào để hai kim tạo thành góc vuông, ở phía bên kia?`,
    solution: `Lúc ${right} giờ, kim phút chỉ số 12, kim giờ chỉ số ${right}: hai kim tạo thành góc vuông, nên vuông góc với nhau.`,
    visual: { type: 'clock', minutes: shown * 60 },
  };
}

/**
 * The set-square steps of drawing a line through H perpendicular or
 * parallel to AB, as in the two drawing lessons.
 * @param {() => number} rand
 * @returns {Question}
 */
export function drawingSteps(rand) {
  if (rand() < 0.5) {
    return {
      prompt:
        'Em vẽ đường thẳng đi qua điểm H và vuông góc với đường thẳng AB. Em đặt ê ke thế nào?',
      ...mixOptions(rand, 'Một cạnh góc vuông của ê ke nằm trên AB, cạnh góc vuông kia đi qua H.', [
        'Cạnh dài nhất của ê ke nằm trên AB, rồi vẽ theo cạnh đó.',
        'Đỉnh góc vuông của ê ke đặt ở H, không cần chạm AB.',
      ]),
      hint: 'Góc vuông của ê ke phải nằm ở chỗ đường thẳng mới gặp AB.',
      solution:
        'Đặt một cạnh góc vuông của ê ke trên AB, trượt ê ke cho cạnh góc vuông kia gặp H, rồi vẽ theo cạnh đó.',
      visual: { type: 'none' },
    };
  }
  return {
    prompt: 'Em vẽ đường thẳng CD đi qua điểm H và song song với đường thẳng AB. Em làm thế nào?',
    ...mixOptions(
      rand,
      'Vẽ đường thẳng MN qua H vuông góc với AB, rồi vẽ CD qua H vuông góc với MN.',
      ['Vẽ đường thẳng MN qua H vuông góc với AB là xong.', 'Nối điểm H với điểm A rồi kéo dài.'],
    ),
    hint: 'Hai đường thẳng cùng vuông góc với một đường thẳng thì song song với nhau.',
    solution:
      'Vẽ MN qua H vuông góc với AB, rồi vẽ CD qua H vuông góc với MN. AB và CD cùng vuông góc với MN nên song song với nhau.',
    visual: { type: 'none' },
  };
}

/**
 * A round of ten questions, shuffled: two pairs of lines (one of them
 * perpendicular or parallel, the other crossing), each kind of side
 * question, a parallelogram, a rhombus, a shape to pick, the clock and a
 * drawing step.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const first = pick(rand, /** @type {const} */ (['vuong-goc', 'song-song']));
  const second = pick(
    rand,
    /** @type {const} */ ([first === 'vuong-goc' ? 'song-song' : 'vuong-goc', 'cat']),
  );
  /** @type {Question[]} */
  const round = [
    { ...twoLines(rand, first), kind: 'hai-duong-thang' },
    { ...twoLines(rand, second), kind: 'hai-duong-thang' },
    { ...parallelSide(rand), kind: 'canh-song-song' },
    { ...perpendicularSide(rand), kind: 'canh-vuong-goc' },
    { ...trueOrFalse(rand), kind: 'dung-sai' },
    { ...parallelogramSide(rand), kind: 'binh-hanh' },
    { ...rhombusSide(rand), kind: 'hinh-thoi' },
    { ...pickShape(rand), kind: 'nhan-hinh' },
    { ...clockHands(rand), kind: 'dong-ho' },
    { ...drawingSteps(rand), kind: 've-hinh' },
  ];
  return shuffle(rand, round);
}
