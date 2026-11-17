/**
 * The mixed practice of the chapter "Số đo thời gian. Vận tốc. Các bài toán
 * liên quan đến chuyển động đều": changing time units, the four operations on
 * time measures, speed, distance and time of a steady motion, changing the
 * unit of a speed and the time of arrival. One question of each part in a
 * shuffled order, the wrong options being the slips children make. Pure and
 * DOM-free.
 */
import { int, pick, rng, shuffle } from '#lib/core/drill.js';
import { fmt, formatNumber } from '#lib/core/number-format.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import {
  PAIRS,
  divWorking,
  inSmall,
  measureText,
  mulWorking,
  normalize,
  subWorking,
} from '../_shared/time-measure.js';

/** @typedef {'car' | 'motorbike' | 'bicycle'} MoverKind */
/**
 * What the widget draws above a motion question: the mover on its road with
 * the speed, distance and time it knows, the unknown one as '?'.
 * @typedef {{ mover: string, kind: MoverKind, v: string, s: string, t: string }} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */
/** @typedef {import('../_shared/time-measure.js').Measure} Measure */
/** @typedef {import('../_shared/time-measure.js').Pair} Pair */

/** What each part of the round practises, in the book's order. */
export const KIND_LABELS = /** @type {const} */ ({
  'doi-don-vi': 'Đổi đơn vị đo thời gian',
  'cong-tru': 'Cộng, trừ số đo thời gian',
  'nhan-chia': 'Nhân, chia số đo thời gian với một số',
  'van-toc': 'Tính vận tốc',
  'doi-van-toc': 'Đổi đơn vị đo vận tốc',
  'quang-duong': 'Tính quãng đường',
  'thoi-gian': 'Tính thời gian',
  'gio-den': 'Tính giờ đến nơi',
});

/** @typedef {keyof typeof KIND_LABELS} Kind */

/**
 * Who moves in a motion question, the picture drawn for it and its speed
 * range in km/giờ.
 * @type {{ mover: string, kind: MoverKind, min: number, max: number }[]}
 */
const MOVERS = [
  { mover: 'Ô tô', kind: 'car', min: 36, max: 60 },
  { mover: 'Xe máy', kind: 'motorbike', min: 24, max: 48 },
  { mover: 'Người đi xe đạp', kind: 'bicycle', min: 12, max: 18 },
];

/**
 * Up to four measures as options in increasing order: the right one and the
 * slips, then measures near it, keeping only well-written ones (the small
 * unit below the base, not empty).
 * @param {Measure} right
 * @param {Measure[]} slips
 * @param {Pair} pair
 * @returns {{ options: string[], answer: number }}
 */
export function measureOptions(right, slips, pair) {
  const near = [
    { big: right.big + 1, small: right.small },
    { big: right.big, small: right.small + 10 },
    { big: right.big, small: right.small - 10 },
    { big: right.big - 1, small: right.small },
    { big: right.big + 2, small: right.small },
  ];
  const ok = (/** @type {Measure} */ m) =>
    m.big >= 0 && m.small >= 0 && m.small < pair.base && m.big + m.small > 0;
  /** @type {Measure[]} */
  const values = [right];
  const seen = new Set([measureText(right, pair)]);
  for (const m of [...slips, ...near]) {
    const text = measureText(m, pair);
    if (values.length < 4 && ok(m) && !seen.has(text)) {
      seen.add(text);
      values.push(m);
    }
  }
  values.sort((x, y) => inSmall(x, pair) - inSmall(y, pair));
  return {
    options: values.map((m) => measureText(m, pair)),
    answer: values.findIndex((m) => m === right),
  };
}

/** @type {Record<Kind, (rand: () => number) => Omit<Question, 'kind'>>} */
const MAKERS = {
  'doi-don-vi'(rand) {
    if (rand() < 0.5) {
      // Hours as a decimal to minutes: 1,5 giờ = 90 phút.
      const h = pick(rand, [0.25, 0.5, 0.75, 1.25, 1.5, 2.5, 3.5, 1.75, 2.25]);
      const right = h * 60;
      const whole = Math.floor(h);
      const slip = whole * 60 + Math.round((h - whole) * 100);
      return {
        prompt: `${formatNumber(h)} giờ = ? phút`,
        ...slipOptions(right, [slip, Math.round(h * 100), right + 10], {
          near: [15, -15, 30],
          min: 1,
          unit: 'phút',
        }),
        hint: '1 giờ = 60 phút. Em nhân số giờ với 60.',
        solution: `${formatNumber(h)} giờ = ${formatNumber(h)} × 60 phút = ${fmt(right)} phút.`,
      };
    }
    // Hours and minutes to minutes: 2 giờ 15 phút = 135 phút.
    const m = { big: int(rand, 1, 4), small: pick(rand, [5, 10, 15, 20, 25, 30, 40, 45, 50]) };
    const pair = PAIRS.gioPhut;
    const right = inSmall(m, pair);
    return {
      prompt: `${measureText(m, pair)} = ? phút`,
      ...slipOptions(right, [m.big * 100 + m.small, m.big * 60, m.big + m.small], {
        near: [10, -10, 60],
        min: 1,
        unit: 'phút',
      }),
      hint: '1 giờ = 60 phút. Em đổi số giờ ra phút rồi cộng thêm số phút.',
      solution: `${m.big} giờ = ${fmt(m.big * 60)} phút. ${fmt(m.big * 60)} phút + ${m.small} phút = ${fmt(right)} phút.`,
    };
  },
  'cong-tru'(rand) {
    const pair = rand() < 0.5 ? PAIRS.gioPhut : PAIRS.phutGiay;
    const { big, small, base } = pair;
    if (rand() < 0.5) {
      const a = { big: int(rand, 1, 9), small: int(rand, 25, 55) };
      const b = { big: int(rand, 1, 9), small: int(rand, 15, 50) };
      const raw = { big: a.big + b.big, small: a.small + b.small };
      const right = normalize(raw, pair);
      const carried = raw.small >= base;
      return {
        prompt: `${measureText(a, pair)} + ${measureText(b, pair)} = ?`,
        ...measureOptions(right, carried ? [{ big: raw.big, small: right.small }] : [], pair),
        hint: `Em cộng số ${small} với nhau, số ${big} với nhau. Số ${small} từ ${base} trở lên thì đổi ra ${big}.`,
        solution: carried
          ? `${measureText(a, pair)} + ${measureText(b, pair)} = ${raw.big} ${big} ${raw.small} ${small}. ${raw.small} ${small} = 1 ${big} ${right.small} ${small}, nên kết quả là ${measureText(right, pair)}.`
          : `${measureText(a, pair)} + ${measureText(b, pair)} = ${measureText(right, pair)}.`,
      };
    }
    const a = { big: int(rand, 4, 9), small: int(rand, 5, 40) };
    const b = { big: int(rand, 1, a.big - 1), small: int(rand, a.small + 5, 55) };
    const w = subWorking(a, b, pair);
    const right = w.result;
    return {
      prompt: `${measureText(a, pair)} − ${measureText(b, pair)} = ?`,
      ...measureOptions(
        right,
        [
          { big: a.big - b.big, small: b.small - a.small },
          { big: a.big - b.big, small: right.small },
        ],
        pair,
      ),
      hint: `${a.small} ${small} bé hơn ${b.small} ${small}: em đổi 1 ${big} = ${base} ${small} rồi mới trừ.`,
      solution: `${measureText(a, pair)} = ${a.big - 1} ${big} ${a.small + base} ${small}. ${a.big - 1} ${big} ${a.small + base} ${small} − ${measureText(b, pair)} = ${measureText(right, pair)}.`,
    };
  },
  'nhan-chia'(rand) {
    const pair = rand() < 0.5 ? PAIRS.gioPhut : PAIRS.phutGiay;
    const { big, small, base } = pair;
    if (rand() < 0.5) {
      const a = { big: int(rand, 1, 5), small: int(rand, 15, 45) };
      const n = int(rand, 2, 5);
      const right = mulWorking(a, n, pair).result;
      const raw = { big: a.big * n, small: a.small * n };
      return {
        prompt: `${measureText(a, pair)} × ${n} = ?`,
        ...measureOptions(right, [{ big: raw.big, small: raw.small % base }], pair),
        hint: `Em nhân số ${big}, số ${small} với ${n}. Số ${small} từ ${base} trở lên thì đổi ra ${big}.`,
        solution:
          raw.small >= base
            ? `${measureText(a, pair)} × ${n} = ${raw.big} ${big} ${raw.small} ${small} = ${measureText(right, pair)}.`
            : `${measureText(a, pair)} × ${n} = ${measureText(right, pair)}.`,
      };
    }
    // Divide a measure built as quotient × n, so it comes out exactly and the
    // big unit leaves a remainder.
    const n = int(rand, 2, 5);
    const q = { big: int(rand, 1, 4), small: int(rand, 5, 55) };
    const a = normalize({ big: q.big * n, small: q.small * n }, pair);
    const right = divWorking(a, n, pair).result;
    const r = a.big % n;
    return {
      prompt: `${measureText(a, pair)} : ${n} = ?`,
      ...measureOptions(
        right,
        [{ big: Math.floor(a.big / n), small: Math.floor(a.small / n) }],
        pair,
      ),
      hint:
        r > 0
          ? `Chia số ${big} còn dư ${r} ${big}: em đổi ra ${small}, cộng với ${a.small} ${small} rồi chia tiếp.`
          : `Em chia số ${big} cho ${n}, rồi chia số ${small} cho ${n}.`,
      solution:
        r > 0
          ? `${a.big} ${big} : ${n} = ${Math.floor(a.big / n)} ${big}, dư ${r} ${big} = ${r * base} ${small}. ${r * base} ${small} + ${a.small} ${small} = ${r * base + a.small} ${small}; ${r * base + a.small} : ${n} = ${right.small} ${small}. Kết quả: ${measureText(right, pair)}.`
          : `${a.big} ${big} : ${n} = ${right.big} ${big}; ${a.small} ${small} : ${n} = ${right.small} ${small}. Kết quả: ${measureText(right, pair)}.`,
    };
  },
  'van-toc'(rand) {
    const { mover, kind, min, max } = pick(rand, MOVERS);
    const v = int(rand, min, max);
    const t = int(rand, 2, 5);
    const s = v * t;
    return {
      prompt: `${mover} đi được ${fmt(s)} km trong ${t} giờ. Vận tốc là bao nhiêu?`,
      ...slipOptions(v, [s - t, v + t, v * 2], { near: [5, -5, 10], min: 1, unit: 'km/giờ' }),
      hint: 'Vận tốc = quãng đường : thời gian.',
      solution: `Vận tốc là: ${fmt(s)} : ${t} = ${v} (km/giờ).`,
      visual: { mover, kind, v: '? km/giờ', s: `${fmt(s)} km`, t: `${t} giờ` },
    };
  },
  'doi-van-toc'(rand) {
    if (rand() < 0.5) {
      const v = pick(rand, [18, 36, 54, 72, 90]);
      const right = (v * 5) / 18;
      return {
        prompt: `${v} km/giờ = ? m/giây`,
        ...slipOptions(right, [(v * 1000) / 60, v * 10, right * 10], {
          near: [5, -5, 10],
          min: 1,
          unit: 'm/giây',
        }),
        hint: '1 giờ = 3 600 giây, 1 km = 1 000 m. Em đổi số ki-lô-mét ra mét rồi chia cho 3 600.',
        solution: `${v} km = ${fmt(v * 1000)} m. ${fmt(v * 1000)} : 3 600 = ${right}. Vậy ${v} km/giờ = ${right} m/giây.`,
      };
    }
    const v = pick(rand, [6, 12, 18, 24, 30, 36, 42, 48]);
    const right = (v * 1000) / 60;
    return {
      prompt: `${v} km/giờ = ? m/phút`,
      ...slipOptions(right, [v * 60, (v * 1000) / 3600, right * 10], {
        near: [100, -100, 50],
        min: 1,
        unit: 'm/phút',
      }),
      hint: '1 giờ = 60 phút, 1 km = 1 000 m. Em đổi số ki-lô-mét ra mét rồi chia cho 60.',
      solution: `${v} km = ${fmt(v * 1000)} m. ${fmt(v * 1000)} : 60 = ${fmt(right)}. Vậy ${v} km/giờ = ${fmt(right)} m/phút.`,
    };
  },
  'quang-duong'(rand) {
    const { mover, kind, min, max } = pick(rand, MOVERS);
    const v = 4 * int(rand, Math.ceil(min / 4), Math.floor(max / 4));
    const m = pick(rand, [15, 30, 45]);
    const s = (v * m) / 60;
    return {
      prompt: `${mover} đi với vận tốc ${v} km/giờ trong ${m} phút. Quãng đường đi được là bao nhiêu?`,
      ...slipOptions(s, [v * m, v, s * 2], { near: [2, -2, 4], min: 1, unit: 'km' }),
      hint: `Em đổi ${m} phút ra giờ trước: ${m} phút = ${formatNumber(m / 60)} giờ.`,
      solution: `${m} phút = ${formatNumber(m / 60)} giờ. Quãng đường là: ${v} × ${formatNumber(m / 60)} = ${s} (km).`,
      visual: { mover, kind, v: `${v} km/giờ`, s: '? km', t: `${m} phút` },
    };
  },
  'thoi-gian'(rand) {
    const { mover, kind, min, max } = pick(rand, MOVERS);
    const v = 12 * int(rand, Math.ceil(min / 12), Math.floor(max / 12));
    const t = { big: int(rand, 1, 3), small: pick(rand, [15, 30, 45]) };
    const hours = t.big + t.small / 60;
    const s = (v * (t.big * 60 + t.small)) / 60;
    const pair = PAIRS.gioPhut;
    // Reading the decimal part of the hours as minutes: 2,25 giờ as 2 giờ 25 phút.
    const frac = Math.round((hours - t.big) * 100);
    return {
      prompt: `${mover} đi quãng đường ${fmt(s)} km với vận tốc ${v} km/giờ. ${mover} đi hết bao lâu?`,
      ...measureOptions(t, frac !== t.small ? [{ big: t.big, small: frac }] : [], pair),
      hint: 'Thời gian = quãng đường : vận tốc. Phần thập phân của số giờ em nhân với 60 để ra phút.',
      solution: `Thời gian là: ${fmt(s)} : ${v} = ${formatNumber(hours, 6)} (giờ) = ${measureText(t, pair)}.`,
      visual: { mover, kind, v: `${v} km/giờ`, s: `${fmt(s)} km`, t: '?' },
    };
  },
  'gio-den'(rand) {
    const { mover, kind, min, max } = pick(rand, MOVERS);
    const v = 12 * int(rand, Math.ceil(min / 12), Math.floor(max / 12));
    const t = { big: int(rand, 1, 3), small: pick(rand, [15, 30, 45]) };
    const s = (v * (t.big * 60 + t.small)) / 60;
    const start = { big: int(rand, 6, 9), small: pick(rand, [0, 15, 30, 45]) };
    const pair = PAIRS.gioPhut;
    const raw = { big: start.big + t.big, small: start.small + t.small };
    const right = normalize(raw, pair);
    const startText = measureText(start, pair);
    return {
      prompt: `${mover} khởi hành lúc ${startText}, đi quãng đường ${fmt(s)} km với vận tốc ${v} km/giờ. ${mover} đến nơi lúc mấy giờ?`,
      ...measureOptions(
        right,
        [
          { big: raw.big, small: right.small },
          { big: start.big + t.big, small: Math.abs(start.small - t.small) },
        ],
        pair,
      ),
      hint: 'Em tính thời gian đi trước: thời gian = quãng đường : vận tốc. Rồi em cộng với giờ khởi hành.',
      solution: `Thời gian đi là: ${fmt(s)} : ${v} = ${formatNumber(s / v, 6)} (giờ) = ${measureText(t, pair)}. Giờ đến nơi: ${startText} + ${measureText(t, pair)} = ${measureText(right, pair)}.`,
      visual: { mover, kind, v: `${v} km/giờ`, s: `${fmt(s)} km`, t: '?' },
    };
  },
};

/**
 * One question of each part, in a shuffled order.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {Kind[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => ({ ...MAKERS[kind](rand), kind }));
}
