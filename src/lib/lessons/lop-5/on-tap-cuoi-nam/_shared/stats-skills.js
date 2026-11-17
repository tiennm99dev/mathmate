/**
 * The adaptive review of statistics and chance at the end of grade 5:
 * sorting collected data, reading a table of counts, reading a pie chart
 * (biểu đồ hình quạt tròn) and finding the count a part stands for or the
 * missing percentage, the percentage of a count in a total, the ratio of the
 * number of times an event happened to the number of tries, and the book's
 * three words for chance (chắc chắn, có thể, không thể). Pure and DOM-free.
 */
import { int, pick, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';
import { fmt } from '#lib/core/number-format.js';
import { num, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */
/** @typedef {import('./visual.js').PiePart} PiePart */

const NAMES = ['Mai', 'Nam', 'Việt', 'Rô-bốt', 'Lan', 'Minh'];

/** @type {Skill} */
export const sortDataSkill = {
  id: 'sap-xep-so-lieu',
  label: 'Sắp xếp số liệu',
  make(rand) {
    const names = shuffle(rand, NAMES).slice(0, 4);
    const tall = rand() < 0.5;
    /** @type {number[]} */
    const values = [];
    while (values.length < 4) {
      // Heights from 1,25 m to 1,55 m; masses from 28 kg to 40 kg by halves.
      const v = tall ? int(rand, 125, 155) / 100 : int(rand, 56, 80) / 2;
      if (!values.includes(v)) values.push(v);
    }
    const unit = tall ? 'm' : 'kg';
    const most = rand() < 0.5;
    const pickIndex = values.indexOf(most ? Math.max(...values) : Math.min(...values));
    const word = tall ? (most ? 'cao nhất' : 'thấp nhất') : most ? 'nặng nhất' : 'nhẹ nhất';
    const sorted = [...values].sort((a, b) => (most ? b - a : a - b));
    const list = names.map((n, i) => `${n}: ${num(values[i])} ${unit}`).join('; ');
    return {
      prompt: `${tall ? 'Chiều cao' : 'Cân nặng'} của bốn bạn: ${list}. Bạn nào ${word}?`,
      options: names,
      answer: pickIndex,
      hint: 'Em so sánh các số thập phân: phần nguyên trước, rồi đến hàng phần mười, hàng phần trăm.',
      solution: `${sorted.map((v) => `${num(v)} ${unit}`).join(most ? ' > ' : ' < ')}. Bạn ${names[pickIndex]} ${word}.`,
    };
  },
};

/** @type {Skill} */
export const tableSkill = {
  id: 'doc-bang-so-lieu',
  label: 'Đọc bảng số liệu',
  make(rand) {
    // Counts of the six faces with one biggest and one smallest.
    /** @type {number[]} */
    let counts = [];
    do {
      counts = Array.from({ length: 6 }, () => int(rand, 2, 9));
    } while (
      counts.filter((c) => c === Math.max(...counts)).length > 1 ||
      counts.filter((c) => c === Math.min(...counts)).length > 1
    );
    const total = counts.reduce((a, b) => a + b, 0);
    const rows = counts.map((c, i) => [`Mặt ${i + 1} chấm`, String(c)]);
    const visual = /** @type {const} */ ({
      type: 'table',
      head: ['Mặt xúc xắc', 'Số lần'],
      rows,
      alt: `Bảng kết quả gieo xúc xắc: ${counts.map((c, i) => `mặt ${i + 1} chấm ${c} lần`).join(', ')}.`,
    });
    const intro = 'Việt gieo một con xúc xắc nhiều lần và ghi kết quả vào bảng.';
    const way = int(rand, 0, 2);
    if (way === 0) {
      const most = rand() < 0.5;
      const target = counts.indexOf(most ? Math.max(...counts) : Math.min(...counts));
      const others = shuffle(
        rand,
        [0, 1, 2, 3, 4, 5].filter((i) => i !== target),
      ).slice(0, 3);
      const word = most ? 'nhiều nhất' : 'ít nhất';
      return {
        prompt: `${intro} Mặt nào xuất hiện ${word}?`,
        ...mixOptions(
          rand,
          `Mặt ${target + 1} chấm`,
          others.map((i) => `Mặt ${i + 1} chấm`),
        ),
        hint: `Em tìm số ${most ? 'lớn' : 'bé'} nhất ở cột "Số lần".`,
        solution: `Số ${most ? 'lớn' : 'bé'} nhất ở cột "Số lần" là ${counts[target]}, nên mặt ${target + 1} chấm xuất hiện ${word}.`,
        visual,
      };
    }
    if (way === 1) {
      const face = int(rand, 0, 5);
      const c = counts[face];
      return {
        prompt: `${intro} Mặt ${face + 1} chấm xuất hiện bao nhiêu lần?`,
        ...valueOptions(
          c,
          counts.filter((_, i) => i !== face),
          { unit: 'lần' },
        ),
        hint: `Em tìm dòng "Mặt ${face + 1} chấm" trong bảng.`,
        solution: `Dòng "Mặt ${face + 1} chấm" ghi ${c}. Mặt ${face + 1} chấm xuất hiện ${c} lần.`,
        visual,
      };
    }
    return {
      prompt: `${intro} Việt đã gieo xúc xắc tất cả bao nhiêu lần?`,
      ...valueOptions(total, [total - counts[0], 6, total + 10], { unit: 'lần' }),
      hint: 'Em cộng số lần của cả sáu mặt.',
      solution: `${counts.join(' + ')} = ${total}. Việt đã gieo xúc xắc ${total} lần.`,
      visual,
    };
  },
};

/**
 * Surveys for a pie chart: what was asked, who answered and the categories.
 */
const SURVEYS = /** @type {const} */ ([
  {
    topic: 'môn thể thao yêu thích',
    who: 'bạn',
    verb: 'chọn',
    parts: ['Bóng đá', 'Cầu lông', 'Bơi', 'Cờ vua'],
  },
  {
    topic: 'loại quả yêu thích',
    who: 'bạn',
    verb: 'chọn',
    parts: ['Cam', 'Xoài', 'Chuối', 'Dưa hấu'],
  },
  {
    topic: 'phương tiện đi học',
    who: 'học sinh',
    verb: 'đi học bằng',
    parts: ['Xe buýt', 'Xe đạp', 'Xe máy', 'Ô tô'],
  },
]);

/** Percentages of the four parts, each with one biggest part. */
const SPLITS = [
  [40, 25, 20, 15],
  [50, 25, 15, 10],
  [35, 30, 20, 15],
  [45, 25, 20, 10],
  [30, 25, 25, 20],
  [55, 20, 15, 10],
];

/**
 * A pie chart of a survey with shuffled percentages.
 * @param {() => number} rand
 */
function survey(rand) {
  const s = pick(rand, SURVEYS);
  const split = shuffle(rand, pick(rand, SPLITS));
  return { ...s, percents: split };
}

/**
 * The visual of a pie chart, with part `hide` shown as '?'.
 * @param {{ topic: string, parts: readonly string[], percents: number[] }} s
 * @param {number} [hide]
 * @returns {import('./visual.js').Visual}
 */
function pieVisual(s, hide = -1) {
  /** @type {PiePart[]} */
  const parts = s.parts.map((label, i) => ({
    label,
    percent: s.percents[i],
    ...(i === hide ? { hidden: true } : {}),
  }));
  const said = parts
    .map((p) => `${p.label} ${p.hidden ? 'chưa biết' : `${p.percent}%`}`)
    .join(', ');
  return { type: 'pie', parts, alt: `Biểu đồ hình quạt tròn về ${s.topic}: ${said}.` };
}

/** @type {Skill} */
export const pieSkill = {
  id: 'bieu-do-quat',
  label: 'Đọc biểu đồ hình quạt tròn',
  make(rand) {
    const s = survey(rand);
    const visual = pieVisual(s);
    if (rand() < 0.35) {
      const top = s.percents.indexOf(Math.max(...s.percents));
      return {
        prompt: `Biểu đồ cho biết ${s.topic} của các ${s.who} khối 5. Phần nào có nhiều ${s.who} nhất?`,
        options: [...s.parts],
        answer: top,
        hint: 'Hình quạt nào to nhất, có tỉ số phần trăm lớn nhất?',
        solution: `Tỉ số phần trăm lớn nhất là ${s.percents[top]}%, nên phần ${s.parts[top].toLowerCase()} có nhiều ${s.who} nhất.`,
        visual,
      };
    }
    const total = 20 * int(rand, 2, 20);
    const i = int(rand, 0, 3);
    const p = s.percents[i];
    const right = (total * p) / 100;
    return {
      prompt: `Khối 5 có ${fmt(total)} ${s.who}. Biểu đồ cho biết ${s.topic} của các ${s.who}. Có bao nhiêu ${s.who} ${s.verb} ${s.parts[i].toLowerCase()}?`,
      ...valueOptions(right, [p, total - right, right * 2, right + 5], { unit: s.who }),
      hint: `Số ${s.who} = Tổng số ${s.who} × Tỉ số phần trăm : 100.`,
      solution: `${s.parts[i]} chiếm ${p}%. Số ${s.who} là: ${fmt(total)} × ${p} : 100 = ${fmt(right)} (${s.who}). Có ${fmt(right)} ${s.who}.`,
      visual,
    };
  },
};

/** @type {Skill} */
export const missingPartSkill = {
  id: 'phan-con-lai',
  label: 'Tìm tỉ số phần trăm còn thiếu',
  make(rand) {
    const s = survey(rand);
    const hide = int(rand, 0, 3);
    const right = s.percents[hide];
    const known = s.percents.filter((_, i) => i !== hide);
    const sum = known.reduce((a, b) => a + b, 0);
    return {
      prompt: `Biểu đồ cho biết ${s.topic} của các ${s.who} khối 5. Phần ${s.parts[hide].toLowerCase()} chiếm bao nhiêu phần trăm?`,
      ...valueOptions(right, [sum, right + 10, right - 5], { unit: '%' }),
      hint: 'Cả hình tròn ứng với 100%. Em lấy 100% trừ đi các phần đã biết.',
      solution: `100% − ${known.map((k) => `${k}%`).join(' − ')} = ${right}%. Phần ${s.parts[hide].toLowerCase()} chiếm ${right}%.`,
      visual: pieVisual(s, hide),
    };
  },
};

/** Totals and the counts out of them that make a whole percentage. */
const PERCENT_TOTALS = [20, 25, 40, 50];

/** @type {Skill} */
export const countPercentSkill = {
  id: 'phan-tram-so-lieu',
  label: 'Tỉ số phần trăm từ số liệu',
  make(rand) {
    const total = pick(rand, PERCENT_TOTALS);
    const step = 100 / total;
    let c = int(rand, 2, total - 2);
    if (c * step === 50) c += 1;
    const right = c * step;
    const sport = pick(rand, ['cờ vua', 'bơi', 'chạy', 'nhảy dây']);
    return {
      prompt: `Đội tuyển của trường có ${total} bạn thi Hội khoẻ Phù Đổng, trong đó ${c} bạn thi ${sport}. Số bạn thi ${sport} chiếm bao nhiêu phần trăm số bạn của đội?`,
      ...valueOptions(right, [c, 100 - right, total - c], { near: [10], unit: '%' }),
      hint: `Em tìm thương ${c} : ${total}, rồi nhân thương đó với 100 và viết thêm kí hiệu %.`,
      solution: `${c} : ${total} = ${num(c / total)} = ${num(right)}%. Số bạn thi ${sport} chiếm ${num(right)}%.`,
    };
  },
};

/**
 * Things tried many times, how a story says it was done `n` times, and the
 * two results of each try.
 */
const TRIES = /** @type {const} */ ([
  {
    story: (/** @type {string} */ name, /** @type {number} */ n) =>
      `${name} tung một đồng xu ${n} lần`,
    total: 'tổng số lần tung',
    a: 'được mặt sấp',
    b: 'được mặt ngửa',
  },
  {
    story: (/** @type {string} */ name, /** @type {number} */ n) =>
      `Hộp có bóng xanh và bóng đỏ. ${name} lấy ra 1 quả rồi trả lại hộp, làm như vậy ${n} lần`,
    total: 'tổng số lần lấy',
    a: 'lấy được bóng xanh',
    b: 'lấy được bóng đỏ',
  },
  {
    story: (/** @type {string} */ name, /** @type {number} */ n) =>
      `${name} gieo một con xúc xắc ${n} lần`,
    total: 'tổng số lần gieo',
    a: 'được mặt có số chấm chẵn',
    b: 'được mặt có số chấm lẻ',
  },
]);

/** @type {Skill} */
export const repeatRatioSkill = {
  id: 'ti-so-lap-lai',
  label: 'Tỉ số của số lần lặp lại một sự kiện',
  make(rand) {
    const t = pick(rand, TRIES);
    const n = int(rand, 20, 40);
    let a = int(rand, 5, n - 5);
    if (2 * a === n) a += 1;
    const b = n - a;
    const askOther = rand() < 0.5;
    const [count, word] = askOther ? [b, t.b] : [a, t.a];
    const other = askOther ? a : b;
    const name = pick(rand, ['Mai', 'Nam', 'Việt']);
    return {
      prompt: `${t.story(name, n)}, có ${a} lần ${t.a}. Viết tỉ số của số lần ${word} so với ${t.total}.`,
      ...mixOptions(rand, `${count}/${n}`, [`${other}/${n}`, `${count}/${other}`, `${n}/${count}`]),
      hint: `Tử số là số lần ${word}, mẫu số là ${t.total}.`,
      solution: askOther
        ? `Số lần ${word} là: ${n} − ${a} = ${b}. Tỉ số là ${b} : ${n} hay ${b}/${n}.`
        : `Có ${a} lần ${word} trong ${n} lần. Tỉ số là ${a} : ${n} hay ${a}/${n}.`,
    };
  },
};

/** The book's three words for how likely an event is. */
const CHANCE_OPTIONS = ['Chắc chắn', 'Có thể', 'Không thể'];

/**
 * Events with their chance: 0 chắc chắn, 1 có thể, 2 không thể, and why.
 * @param {() => number} rand
 * @returns {{ setting: string, event: string, chance: number, why: string }}
 */
function chanceEvent(rand) {
  const way = int(rand, 0, 2);
  if (way === 0) {
    const ev = pick(rand, [
      {
        event: 'tổng số chấm là số lẻ',
        chance: 1,
        why: 'Tổng có thể là 3 (1 và 2), cũng có thể là 2 (1 và 1)',
      },
      {
        event: 'tổng số chấm là 1',
        chance: 2,
        why: 'Mỗi con xúc xắc có ít nhất 1 chấm, nên tổng ít nhất là 2',
      },
      {
        event: 'tổng số chấm lớn hơn 1 và bé hơn 13',
        chance: 0,
        why: 'Tổng bé nhất là 2, lớn nhất là 12',
      },
      { event: 'tổng số chấm là 13', chance: 2, why: 'Tổng lớn nhất là 6 + 6 = 12' },
      {
        event: 'tổng số chấm là 7',
        chance: 1,
        why: 'Tổng có thể là 7 (3 và 4), cũng có thể khác 7',
      },
    ]);
    return { setting: 'Gieo hai con xúc xắc cùng lúc.', ...ev };
  }
  const red = int(rand, 1, 4);
  const yellow = int(rand, 1, 4);
  const k = int(rand, 2, Math.min(3, red + yellow));
  const setting = `Hộp có ${red} quả bóng đỏ và ${yellow} quả bóng vàng. Lấy ra cùng lúc ${k} quả.`;
  if (way === 1) {
    if (rand() < 0.3) {
      return {
        setting,
        event: 'có quả bóng màu xanh',
        chance: 2,
        why: 'Trong hộp không có quả bóng xanh nào',
      };
    }
    return red >= k
      ? {
          setting,
          event: `cả ${k} quả đều màu đỏ`,
          chance: 1,
          why: `Hộp có ${red} quả đỏ nên có thể lấy được ${k} quả đỏ, nhưng cũng có thể lấy phải quả vàng`,
        }
      : {
          setting,
          event: `cả ${k} quả đều màu đỏ`,
          chance: 2,
          why: `Hộp chỉ có ${red} quả đỏ, không đủ ${k} quả`,
        };
  }
  return red < k
    ? {
        setting,
        event: 'có ít nhất 1 quả màu vàng',
        chance: 0,
        why: `Hộp chỉ có ${red} quả đỏ, lấy ${k} quả thì phải có quả vàng`,
      }
    : {
        setting,
        event: 'có ít nhất 1 quả màu vàng',
        chance: 1,
        why: `Có thể lấy được ${k} quả đỏ, cũng có thể lấy được quả vàng`,
      };
}

/** @type {Skill} */
export const chanceSkill = {
  id: 'kha-nang',
  label: 'Chắc chắn, có thể, không thể',
  make(rand) {
    const { setting, event, chance, why } = chanceEvent(rand);
    return {
      prompt: `${setting} Sự kiện "${event}" xảy ra như thế nào?`,
      options: [...CHANCE_OPTIONS],
      answer: chance,
      hint: 'Em thử nghĩ: sự kiện đó luôn xảy ra, lúc xảy ra lúc không, hay không bao giờ xảy ra?',
      solution: `${why}. Vậy sự kiện "${event}" ${CHANCE_OPTIONS[chance].toLowerCase()} xảy ra.`,
    };
  },
};

/** @type {Skill[]} */
export const STATS_SKILLS = [
  sortDataSkill,
  tableSkill,
  pieSkill,
  missingPartSkill,
  countPercentSkill,
  repeatRatioSkill,
  chanceSkill,
];
