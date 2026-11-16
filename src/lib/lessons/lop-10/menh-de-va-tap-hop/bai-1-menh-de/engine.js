/**
 * Compound propositions for the "Mệnh đề" lesson: pairs of concrete
 * statements P and Q with known truth values, the compounds the book builds
 * from them (phủ định, kéo theo, đảo, tương đương) and their truth tables.
 */

/**
 * @typedef {{
 *   id: string,
 *   p: string, q: string,
 *   notP: string, notQ: string,
 *   pTrue: boolean, qTrue: boolean,
 * }} Pair
 * Statements are rich text without a final full stop.
 */
/** @typedef {'notP' | 'notQ' | 'imp' | 'conv' | 'equiv'} Op */

/** @type {Pair[]} */
export const PAIRS = [
  {
    id: 'so-2',
    p: '$2$ là số nguyên tố',
    q: '$2$ là số lẻ',
    notP: '$2$ không là số nguyên tố',
    notQ: '$2$ không là số lẻ',
    pTrue: true,
    qTrue: false,
  },
  {
    id: 'so-12',
    p: '$12$ chia hết cho $6$',
    q: '$12$ chia hết cho $3$',
    notP: '$12$ không chia hết cho $6$',
    notQ: '$12$ không chia hết cho $3$',
    pTrue: true,
    qTrue: true,
  },
  {
    id: 'can-2',
    p: '$\\sqrt{2}$ là số hữu tỉ',
    q: '$\\sqrt{2}$ là số nguyên',
    notP: '$\\sqrt{2}$ không là số hữu tỉ',
    notQ: '$\\sqrt{2}$ không là số nguyên',
    pTrue: false,
    qTrue: false,
  },
  {
    id: 'am-3',
    p: '$-3 > -2$',
    q: '$(-3)^2 > (-2)^2$',
    notP: '$-3 \\le -2$',
    notQ: '$(-3)^2 \\le (-2)^2$',
    pTrue: false,
    qTrue: true,
  },
  {
    id: 'so-2023',
    p: '$2023$ chia hết cho $7$',
    q: '$2023$ là số nguyên tố',
    notP: '$2023$ không chia hết cho $7$',
    notQ: '$2023$ không là số nguyên tố',
    pTrue: true,
    qTrue: false,
  },
];

/** @type {Array<{ value: Op, label: string, tex: string }>} */
export const OPS = [
  { value: 'notP', label: 'Phủ định P', tex: '\\overline{P}' },
  { value: 'imp', label: 'P ⇒ Q', tex: 'P \\Rightarrow Q' },
  { value: 'conv', label: 'Đảo: Q ⇒ P', tex: 'Q \\Rightarrow P' },
  { value: 'equiv', label: 'P ⇔ Q', tex: 'P \\Leftrightarrow Q' },
];

/**
 * Truth of a compound from the truth of P and Q.
 * @param {Op} op @param {boolean} p @param {boolean} q
 */
export function truthOf(op, p, q) {
  switch (op) {
    case 'notP':
      return !p;
    case 'notQ':
      return !q;
    case 'imp':
      return !p || q;
    case 'conv':
      return !q || p;
    default:
      return p === q;
  }
}

/**
 * The compound written as a sentence, the way the book reads it.
 * @param {Pair} pair @param {Op} op
 */
export function sentenceOf(pair, op) {
  switch (op) {
    case 'notP':
      return `${pair.notP}.`;
    case 'notQ':
      return `${pair.notQ}.`;
    case 'imp':
      return `Nếu ${pair.p} thì ${pair.q}.`;
    case 'conv':
      return `Nếu ${pair.q} thì ${pair.p}.`;
    default:
      return `${pair.p} khi và chỉ khi ${pair.q}.`;
  }
}

/** @param {boolean} t */
export const truthWord = (t) => (t ? 'Đ' : 'S');

/**
 * The truth table of a compound: a negation has two rows (P, then P̄), the
 * other compounds four (P, Q, then the compound). `current` marks the row of
 * the pair's own truth values.
 * @param {Op} op @param {Pair} pair
 * @returns {{ head: string[], rows: Array<{ cells: string[], current: boolean }> }}
 */
export function tableOf(op, pair) {
  const tex = OPS.find((o) => o.value === op)?.tex ?? '';
  if (op === 'notP' || op === 'notQ') {
    const name = op === 'notP' ? 'P' : 'Q';
    const own = op === 'notP' ? pair.pTrue : pair.qTrue;
    return {
      head: [name, op === 'notP' ? '\\overline{P}' : '\\overline{Q}'],
      rows: [true, false].map((v) => ({
        cells: [truthWord(v), truthWord(!v)],
        current: v === own,
      })),
    };
  }
  /** @type {Array<[boolean, boolean]>} */
  const combos = [
    [true, true],
    [true, false],
    [false, true],
    [false, false],
  ];
  return {
    head: ['P', 'Q', tex],
    rows: combos.map(([p, q]) => ({
      cells: [truthWord(p), truthWord(q), truthWord(truthOf(op, p, q))],
      current: p === pair.pTrue && q === pair.qTrue,
    })),
  };
}

/**
 * Why the compound has its truth value, in one line.
 * @param {Pair} pair @param {Op} op
 */
export function reasonOf(pair, op) {
  const P = pair.pTrue ? 'đúng' : 'sai';
  const Q = pair.qTrue ? 'đúng' : 'sai';
  const t = truthOf(op, pair.pTrue, pair.qTrue);
  switch (op) {
    case 'notP':
      return `$P$ ${P} nên $\\overline{P}$ ${t ? 'đúng' : 'sai'}.`;
    case 'notQ':
      return `$Q$ ${Q} nên $\\overline{Q}$ ${t ? 'đúng' : 'sai'}.`;
    case 'imp':
      return t
        ? `$P$ ${P}, $Q$ ${Q}: không rơi vào trường hợp "$P$ đúng mà $Q$ sai", nên $P \\Rightarrow Q$ đúng.`
        : '$P$ đúng mà $Q$ sai, đây là trường hợp duy nhất làm $P \\Rightarrow Q$ sai.';
    case 'conv':
      return t
        ? `$Q$ ${Q}, $P$ ${P}: không rơi vào trường hợp "$Q$ đúng mà $P$ sai", nên $Q \\Rightarrow P$ đúng.`
        : '$Q$ đúng mà $P$ sai, nên mệnh đề đảo $Q \\Rightarrow P$ sai.';
    default:
      return t
        ? `$P$ và $Q$ cùng ${P}, nên $P \\Leftrightarrow Q$ đúng.`
        : `$P$ ${P} còn $Q$ ${Q}, nên $P \\Leftrightarrow Q$ sai.`;
  }
}

/** Cards for sorting sentences into true, false and non-propositions. */
export const SORT_BINS = [
  { id: 'dung', label: 'Mệnh đề đúng' },
  { id: 'sai', label: 'Mệnh đề sai' },
  { id: 'khong', label: 'Không là mệnh đề' },
];

/** @type {import('#lib/core/card-sorter.js').SortCard[]} */
export const SORT_CARDS = [
  {
    id: 'ha-noi',
    label: 'Hà Nội là thủ đô của Việt Nam.',
    bin: 'dung',
    why: 'Đây là câu khẳng định đúng.',
  },
  {
    id: 'so-7',
    label: '$7$ là số nguyên tố.',
    bin: 'dung',
    why: '$7$ chỉ có hai ước là $1$ và $7$.',
  },
  {
    id: 'moi-n',
    label: 'Mọi số tự nhiên đều là số nguyên.',
    bin: 'dung',
    why: 'Ta có $\\mathbb{N} \\subset \\mathbb{Z}$.',
  },
  { id: 'cong', label: '$2 + 3 = 6$.', bin: 'sai', why: 'Câu khẳng định, nhưng $2 + 3 = 5$.' },
  {
    id: 'pi',
    label: 'Số $\\pi$ là số hữu tỉ.',
    bin: 'sai',
    why: 'Câu khẳng định sai: $\\pi$ là số vô tỉ.',
  },
  {
    id: 'am',
    label: 'Có số thực $x$ mà $x^2 < 0$.',
    bin: 'sai',
    why: 'Câu khẳng định sai: mọi số thực đều có $x^2 \\ge 0$.',
  },
  {
    id: 'cam-than',
    label: 'Hôm nay trời đẹp quá!',
    bin: 'khong',
    why: 'Câu cảm thán, không khẳng định điều gì đúng hay sai.',
  },
  {
    id: 'cau-hoi',
    label: 'Bạn đã làm bài tập chưa?',
    bin: 'khong',
    why: 'Câu hỏi không phải là mệnh đề.',
  },
  {
    id: 'chua-bien',
    label: '$x + 1 > 3$.',
    bin: 'khong',
    why: 'Mệnh đề chứa biến: đúng hay sai còn tuỳ giá trị của $x$.',
  },
];
