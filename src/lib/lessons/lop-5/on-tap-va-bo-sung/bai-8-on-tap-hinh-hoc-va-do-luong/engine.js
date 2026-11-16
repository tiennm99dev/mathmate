/**
 * The adaptive review of geometry and measures at the start of grade 5:
 * tấn, tạ, yến and kilograms; hours, minutes, seconds and centuries;
 * acute, right, obtuse and straight angles; reading a protractor; parallel
 * and perpendicular lines; parallelograms, rhombuses, rectangles and
 * squares; the area and perimeter of a rectangle; and a part of a mass
 * given by a fraction. Pure and DOM-free; each skill is a `KidSkill` for
 * `adaptive-quiz.svelte`.
 */
import { int, pick, retryMake } from '#lib/core/drill.js';
import { slipOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';

/** @typedef {'binh-hanh' | 'thoi' | 'chu-nhat' | 'vuong'} ShapeKind */
/** @typedef {'song-song' | 'vuong-goc' | 'cat-nhau'} LinePair */

/**
 * What a question draws.
 * @typedef {(
 *   | { type: 'angle', deg: number, turn: number }
 *   | { type: 'protractor', deg: number }
 *   | { type: 'lines', pair: LinePair, turn: number }
 *   | { type: 'shape', kind: ShapeKind }
 *   | { type: 'rect', w: number, h: number }
 * )} Visual
 */
/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion<Visual>} Question */
/** @typedef {import('#lib/core/kid/quiz.js').KidSkill<Visual>} ReviewSkill */

/** Mass units in kilograms, the book's order. */
export const MASS_UNITS = /** @type {const} */ ({ tấn: 1000, tạ: 100, yến: 10, kg: 1 });

/** @typedef {keyof typeof MASS_UNITS} MassUnit */

/** The conversions asked, from a bigger unit to a smaller one. */
const MASS_PAIRS = /** @type {const} */ ([
  ['yến', 'kg'],
  ['tạ', 'kg'],
  ['tấn', 'kg'],
  ['tấn', 'tạ'],
  ['tấn', 'yến'],
  ['tạ', 'yến'],
]);

/**
 * A mass in kilograms written the book's way: '1 tấn 250 kg', '800 kg'.
 * @param {number} kg
 */
export function massText(kg) {
  const t = Math.floor(kg / 1000);
  const rest = kg % 1000;
  if (t === 0) return `${fmt(rest)} kg`;
  return rest === 0 ? `${t} tấn` : `${t} tấn ${rest} kg`;
}

/** @type {ReviewSkill} */
const massSkill = {
  id: 'khoi-luong',
  label: 'Tấn, tạ, yến, ki-lô-gam',
  make(rand) {
    if (rand() < 0.3) {
      const t = int(rand, 1, 5);
      const kg = int(rand, 1, 19) * 50;
      const right = t * 1000 + kg;
      return {
        prompt: `${t} tấn ${kg} kg = ? kg`,
        ...slipOptions(right, [t * 100 + kg, t + kg, t * 1000 + kg * 10], {
          near: [100, -100, 1000],
          min: 1,
          unit: 'kg',
        }),
        hint: '1 tấn = 1 000 kg. Em đổi số tấn ra ki-lô-gam rồi cộng thêm số ki-lô-gam.',
        solution: `${t} tấn = ${fmt(t * 1000)} kg, nên ${t} tấn ${kg} kg = ${fmt(t * 1000)} kg + ${kg} kg = ${fmt(right)} kg.`,
      };
    }
    const [big, small] = pick(rand, MASS_PAIRS);
    const k = int(rand, 2, 9);
    const rate = MASS_UNITS[big] / MASS_UNITS[small];
    const right = k * rate;
    return {
      prompt: `${k} ${big} = ? ${small}`,
      ...slipOptions(right, [k * rate * 10, rate === 10 ? k * 100 : k * (rate / 10)], {
        near: [rate, -rate],
        min: 1,
        unit: small,
      }),
      hint: `Em nhớ: 1 ${big} = ${fmt(rate)} ${small}.`,
      solution: `1 ${big} = ${fmt(rate)} ${small}, nên ${k} ${big} = ${k} × ${fmt(rate)} = ${fmt(right)} ${small}.`,
    };
  },
};

/** Parts of an hour or a century, as the book writes them. */
const PARTS = /** @type {const} */ ([
  { text: '1/2 giờ', of: 'giờ', right: 30 },
  { text: '1/4 giờ', of: 'giờ', right: 15 },
  { text: '1/10 giờ', of: 'giờ', right: 6 },
  { text: '1/4 thế kỉ', of: 'thế kỉ', right: 25 },
  { text: '7/100 thế kỉ', of: 'thế kỉ', right: 7 },
]);

/** @type {ReviewSkill} */
const timeSkill = {
  id: 'thoi-gian',
  label: 'Giờ, phút, giây, thế kỉ',
  make(rand) {
    const form = pick(rand, ['gio', 'phut', 'the-ki', 'gio-phut', 'phut-giay', 'phan']);
    if (form === 'phan') {
      const p = pick(rand, PARTS);
      const unit = p.of === 'giờ' ? 'phút' : 'năm';
      const whole = p.of === 'giờ' ? 60 : 100;
      return {
        prompt: `${p.text} = ? ${unit}`,
        ...slipOptions(p.right, p.of === 'giờ' ? [100 / (60 / p.right), 10] : [70, 4], {
          near: [5, -5, 10],
          min: 1,
          unit,
        }),
        hint: `1 ${p.of} = ${whole} ${unit}. Em tìm phân số đó của ${whole}.`,
        solution: `1 ${p.of} = ${whole} ${unit}, nên ${p.text} = ${p.right} ${unit}.`,
      };
    }
    if (form === 'gio-phut' || form === 'phut-giay') {
      const [big, small] = form === 'gio-phut' ? ['giờ', 'phút'] : ['phút', 'giây'];
      const a = int(rand, 1, 4);
      const b = int(rand, 1, 11) * 5;
      const right = a * 60 + b;
      return {
        prompt: `${a} ${big} ${b} ${small} = ? ${small}`,
        ...slipOptions(right, [a * 100 + b, a + b], { near: [60, -10, 10], min: 1, unit: small }),
        hint: `1 ${big} = 60 ${small}.`,
        solution: `${a} ${big} = ${a * 60} ${small}, nên ${a} ${big} ${b} ${small} = ${a * 60} + ${b} = ${right} ${small}.`,
      };
    }
    const k = int(rand, 2, 9);
    const [big, small, rate] =
      form === 'gio'
        ? ['giờ', 'phút', 60]
        : form === 'phut'
          ? ['phút', 'giây', 60]
          : ['thế kỉ', 'năm', 100];
    const right = k * rate;
    return {
      prompt: `${k} ${big} = ? ${small}`,
      ...slipOptions(right, rate === 60 ? [k * 100, k * 10] : [k * 10, k * 1000], {
        near: [rate, -rate],
        min: 1,
        unit: small,
      }),
      hint: `1 ${big} = ${rate} ${small}.`,
      solution: `${k} ${big} = ${k} × ${rate} = ${fmt(right)} ${small}.`,
    };
  },
};

/** The four kinds of angle, the book's names. */
export const ANGLE_KINDS = /** @type {const} */ (['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt']);

/** The kind of an angle of `deg` degrees, 0 < deg ≤ 180. @param {number} deg */
export function angleKind(deg) {
  if (deg < 90) return 0;
  if (deg === 90) return 1;
  if (deg < 180) return 2;
  return 3;
}

/** @type {ReviewSkill} */
const angleSkill = {
  id: 'loai-goc',
  label: 'Góc nhọn, vuông, tù, bẹt',
  make(rand) {
    const deg = pick(rand, [30, 45, 60, 75, 90, 90, 110, 120, 135, 150, 180]);
    const turn = deg === 180 ? 0 : pick(rand, [0, 15, 30]);
    const kind = angleKind(deg);
    const why = [
      'bé hơn góc vuông',
      'bằng 90°',
      'lớn hơn góc vuông và bé hơn góc bẹt',
      'hai cạnh nằm trên một đường thẳng, bằng 180°',
    ][kind];
    return {
      prompt: 'Góc này là góc gì?',
      options: [...ANGLE_KINDS],
      answer: kind,
      visual: { type: 'angle', deg, turn },
      hint: 'Em so sánh góc với góc vuông (90°) và góc bẹt (180°).',
      solution: `Góc này bằng ${deg}°, ${why}. Đó là ${ANGLE_KINDS[kind].toLowerCase()}.`,
    };
  },
};

/** @type {ReviewSkill} */
const protractorSkill = {
  id: 'do-goc',
  label: 'Đo góc bằng thước đo góc',
  make(rand) {
    const deg = int(rand, 2, 16) * 10;
    const values = [
      ...new Set([deg, 180 - deg, deg + 10, deg - 10, deg + 20].filter((v) => v > 0 && v < 180)),
    ]
      .slice(0, 4)
      .sort((x, y) => x - y);
    return {
      prompt: 'Góc này bằng bao nhiêu độ?',
      options: values.map((v) => `${v}°`),
      answer: values.indexOf(deg),
      optionLabels: values.map((v) => `${v} độ`),
      visual: { type: 'protractor', deg },
      hint: 'Một cạnh của góc đi qua vạch 0 bên phải. Em đọc số đo trên vòng số đỏ, bắt đầu từ 0 ở bên phải.',
      solution: `Đọc trên vòng số bắt đầu từ 0 ở bên phải, cạnh kia của góc đi qua vạch ${deg}. Góc bằng ${deg}°.`,
    };
  },
};

/** How a pair of lines is said. */
export const PAIR_TEXT = /** @type {const} */ ({
  'song-song': 'Song song với nhau',
  'vuong-goc': 'Vuông góc với nhau',
  'cat-nhau': 'Cắt nhau, không vuông góc',
});

/** @type {ReviewSkill} */
const linesSkill = {
  id: 'song-song',
  label: 'Song song, vuông góc',
  make(rand) {
    /** @type {LinePair} */
    const pair = pick(rand, /** @type {const} */ (['song-song', 'vuong-goc', 'cat-nhau']));
    const turn = pick(rand, [0, 20, 45, 70, 90, 120, 160]);
    const keys = /** @type {LinePair[]} */ (Object.keys(PAIR_TEXT));
    const why = {
      'song-song': 'Hai đường thẳng kéo dài mãi cũng không cắt nhau, nên chúng song song với nhau.',
      'vuong-goc': 'Hai đường thẳng cắt nhau tạo thành góc vuông, nên chúng vuông góc với nhau.',
      'cat-nhau': 'Hai đường thẳng cắt nhau nhưng góc tạo thành không phải góc vuông.',
    }[pair];
    return {
      prompt: 'Hai đường thẳng màu đỏ thế nào với nhau?',
      options: keys.map((k) => PAIR_TEXT[k]),
      answer: keys.indexOf(pair),
      visual: { type: 'lines', pair, turn },
      hint: 'Hai đường thẳng có cắt nhau không? Nếu cắt nhau, góc tạo thành có phải góc vuông không?',
      solution: why,
    };
  },
};

/** The shapes, the book's names. */
export const SHAPE_NAMES = /** @type {const} */ ({
  'binh-hanh': 'Hình bình hành',
  thoi: 'Hình thoi',
  'chu-nhat': 'Hình chữ nhật',
  vuong: 'Hình vuông',
});

const SHAPE_WHY = /** @type {const} */ ({
  'binh-hanh':
    'Hai cặp cạnh đối diện song song và bằng nhau, các góc không vuông, hai cạnh kề không bằng nhau: đó là hình bình hành.',
  thoi: 'Hai cặp cạnh đối diện song song và bốn cạnh bằng nhau, các góc không vuông: đó là hình thoi.',
  'chu-nhat':
    'Bốn góc vuông, hai chiều dài bằng nhau, hai chiều rộng bằng nhau: đó là hình chữ nhật.',
  vuong: 'Bốn góc vuông và bốn cạnh bằng nhau: đó là hình vuông.',
});

/** @type {ReviewSkill} */
const shapeSkill = {
  id: 'hinh-phang',
  label: 'Hình bình hành, hình thoi',
  make(rand) {
    const keys = /** @type {ShapeKind[]} */ (Object.keys(SHAPE_NAMES));
    const kind = pick(rand, keys);
    return {
      prompt: 'Đây là hình gì?',
      options: keys.map((k) => SHAPE_NAMES[k]),
      answer: keys.indexOf(kind),
      visual: { type: 'shape', kind },
      hint: 'Em xem các góc có vuông không, và các cạnh có bằng nhau không.',
      solution: SHAPE_WHY[kind],
    };
  },
};

/** @type {ReviewSkill} */
const rectSkill = {
  id: 'dien-tich',
  label: 'Chu vi, diện tích hình chữ nhật',
  make: (rand) =>
    retryMake(() => {
      const w = int(rand, 6, 15);
      const h = int(rand, 3, w - 1);
      const area = w * h;
      const around = (w + h) * 2;
      if (area === around) return null;
      if (rand() < 0.5) {
        return {
          prompt: `Mảnh đất hình chữ nhật dài ${w} m, rộng ${h} m. Diện tích mảnh đất là bao nhiêu?`,
          ...slipOptions(area, [around, w + h], { near: [w, -h], min: 1, unit: 'm²' }),
          visual: { type: 'rect', w, h },
          hint: 'Diện tích hình chữ nhật = chiều dài × chiều rộng.',
          solution: `Diện tích: ${w} × ${h} = ${area} (m²).`,
        };
      }
      return {
        prompt: `Mảnh đất hình chữ nhật dài ${w} m, rộng ${h} m. Chu vi mảnh đất là bao nhiêu?`,
        ...slipOptions(around, [area, w + h], { near: [2, -2], min: 1, unit: 'm' }),
        visual: { type: 'rect', w, h },
        hint: 'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.',
        solution: `Chu vi: (${w} + ${h}) × 2 = ${around} (m).`,
      };
    }),
};

/** The harvests and the parts of them; only the parts that come to whole kilograms are asked. */
const HARVESTS = [1250, 1200, 1500, 2000, 800, 600];
const SHARES = /** @type {const} */ ([
  [3, 10],
  [1, 4],
  [2, 5],
  [3, 5],
  [3, 4],
  [7, 10],
]);

/** @type {ReviewSkill} */
const shareSkill = {
  id: 'bai-toan',
  label: 'Bài toán về khối lượng',
  make(rand) {
    const total = pick(rand, HARVESTS);
    const [p, q] = pick(
      rand,
      SHARES.filter(([a, b]) => (total * a) % b === 0),
    );
    const first = (total * p) / q;
    const second = total - first;
    const askSecond = rand() < 0.5;
    const right = askSecond ? second : first;
    const where = total >= 1000 ? `${massText(total)} = ${fmt(total)} kg. ` : '';
    return {
      prompt: `Bác Năm thu hoạch được ${massText(total)} cam. Cam loại I chiếm ${p}/${q} số cam, còn lại là cam loại II. Có bao nhiêu ki-lô-gam cam loại ${askSecond ? 'II' : 'I'}?`,
      ...slipOptions(right, [askSecond ? first : second, total / q], {
        near: [total / q, -total / q],
        min: 1,
        unit: 'kg',
      }),
      hint: askSecond
        ? `Em tìm số cam loại I bằng cách lấy số cam nhân với ${p}/${q}, rồi lấy tổng trừ đi.`
        : `Em lấy số cam nhân với ${p}/${q}. Nhớ đổi ra ki-lô-gam trước.`,
      solution: `${where}Cam loại I: ${fmt(total)} × ${p}/${q} = ${fmt(first)} (kg). Cam loại II: ${fmt(total)} − ${fmt(first)} = ${fmt(second)} (kg).`,
    };
  },
};

/** Every part of the review, in the book's order. */
export const SKILLS = [
  massSkill,
  timeSkill,
  angleSkill,
  protractorSkill,
  linesSkill,
  shapeSkill,
  rectSkill,
  shareSkill,
];
