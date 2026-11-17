/**
 * The adaptive review of uniform motion at the end of grade 5: speed,
 * distance and time (v = s : t, s = v × t, t = s : v), changing the unit of a
 * speed, comparing two speeds given in different units, the time of arrival
 * and the distance still to go. Times are whole minutes and speeds are drawn
 * so that every answer is a whole number or an exact decimal. Pure and
 * DOM-free.
 */
import { int, pick } from '#lib/core/drill.js';
import { capitalize, mixOptions } from '#lib/core/kid/quiz.js';
import { fmt, tidy } from '#lib/core/number-format.js';
import { hoursMinutes } from './measure-skills.js';
import { num, valueOptions } from './values.js';

/** @typedef {import('./visual.js').ReviewSkill} Skill */

/** Vehicles of the stories, with a believable speed range in km/giờ. */
const VEHICLES = /** @type {const} */ ([
  { who: 'Một người đi xe đạp', short: 'người đi xe đạp', lo: 10, hi: 18 },
  { who: 'Một xe máy', short: 'xe máy', lo: 30, hi: 46 },
  { who: 'Một ô tô', short: 'ô tô', lo: 40, hi: 60 },
]);

/** Travel times in minutes whose value in hours is an exact decimal. */
const TRIP_MINUTES = [45, 75, 90, 105, 120, 135, 150, 180];

/**
 * A speed in km/giờ that is a multiple of 4 inside the vehicle's range, so
 * that it times any quarter of an hour is a whole number of kilometres.
 * @param {() => number} rand
 * @param {{ lo: number, hi: number }} vehicle
 */
function quarterSpeed(rand, vehicle) {
  return 4 * int(rand, Math.ceil(vehicle.lo / 4), Math.floor(vehicle.hi / 4));
}

/**
 * Minutes as hours written as a decimal: 90 → '1,5'.
 * @param {number} minutes
 */
const hoursText = (minutes) => num(minutes / 60);

/**
 * The slip of reading the decimal part of hours as minutes: 1,5 giờ read as
 * 1 giờ 50 phút, 1,25 giờ as 1 giờ 25 phút. Null when the time is whole hours.
 * @param {number} minutes
 */
function decimalSlip(minutes) {
  const h = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) return null;
  const digits = String(tidy(rest / 60)).split('.')[1] ?? '';
  return h * 60 + Number(digits.slice(0, 2).padEnd(2, '0'));
}

/**
 * Time options: the right duration and up to three slips, each as "a giờ b
 * phút", all different as lengths of time.
 * @param {() => number} rand
 * @param {number} right minutes
 * @param {(number | null)[]} slips minutes
 */
function timeOptions(rand, right, slips) {
  const seen = new Set([right]);
  /** @type {string[]} */
  const wrong = [];
  for (const m of slips) {
    if (m === null || m <= 0 || seen.has(m) || wrong.length >= 3) continue;
    seen.add(m);
    wrong.push(hoursMinutes(m));
  }
  return mixOptions(rand, hoursMinutes(right), wrong);
}

/** @type {Skill} */
export const speedSkill = {
  id: 'van-toc',
  label: 'Tính vận tốc',
  make(rand) {
    if (rand() < 0.35) {
      const v = int(rand, 5, 9);
      const t = pick(rand, [12, 15, 20, 25, 40, 50]);
      const s = v * t;
      return {
        prompt: `Một vận động viên chạy ${fmt(s)} m hết ${t} giây. Tính vận tốc chạy của vận động viên đó.`,
        ...valueOptions(v, [s * t, s - t, v + 2], { unit: 'm/giây' }),
        hint: 'Vận tốc = quãng đường : thời gian.',
        solution: `Vận tốc là: ${fmt(s)} : ${t} = ${v} (m/giây). Vận động viên chạy với vận tốc ${v} m/giây.`,
      };
    }
    const vehicle = pick(rand, VEHICLES);
    const minutes = pick(rand, [90, 120, 150, 180]);
    const v =
      minutes % 60
        ? 2 * int(rand, vehicle.lo / 2, vehicle.hi / 2)
        : int(rand, vehicle.lo, vehicle.hi);
    const s = (v * minutes) / 60;
    const convert =
      minutes % 60 ? `Đổi: ${hoursMinutes(minutes)} = ${hoursText(minutes)} giờ. ` : '';
    return {
      prompt: `${vehicle.who} đi được ${num(s)} km trong ${hoursMinutes(minutes)}. Tính vận tốc của ${vehicle.short}.`,
      ...valueOptions(v, [s * (minutes / 60), s - minutes / 60, (s * 60) / minutes / 2], {
        near: [5],
        unit: 'km/giờ',
      }),
      hint:
        minutes % 60
          ? 'Em đổi thời gian ra giờ (30 phút = 0,5 giờ), rồi lấy quãng đường chia cho thời gian.'
          : 'Vận tốc = quãng đường : thời gian.',
      solution: `${convert}Vận tốc là: ${num(s)} : ${hoursText(minutes)} = ${v} (km/giờ). Vận tốc của ${vehicle.short} là ${v} km/giờ.`,
    };
  },
};

/** @type {Skill} */
export const distanceSkill = {
  id: 'quang-duong',
  label: 'Tính quãng đường',
  make(rand) {
    if (rand() < 0.35) {
      const v = 5 * int(rand, 12, 18);
      const t = int(rand, 8, 25);
      const s = v * t;
      return {
        prompt: `Một người đi bộ với vận tốc ${v} m/phút. Tính quãng đường người đó đi được trong ${t} phút.`,
        ...valueOptions(s, [v + t, s / 10, s + v], { unit: 'm' }),
        hint: 'Quãng đường = vận tốc × thời gian.',
        solution: `Quãng đường là: ${v} × ${t} = ${fmt(s)} (m). Người đó đi được ${fmt(s)} m.`,
      };
    }
    const vehicle = pick(rand, VEHICLES);
    const v = quarterSpeed(rand, vehicle);
    const minutes = pick(rand, [15, 30, 45, ...TRIP_MINUTES]);
    const s = (v * minutes) / 60;
    // Reading 1 giờ 15 phút as 1,15 giờ.
    const misread = Math.floor(minutes / 60) + (minutes % 60) / 100;
    return {
      prompt: `${vehicle.who} đi với vận tốc ${v} km/giờ. Tính quãng đường ${vehicle.short} đi được trong ${hoursMinutes(minutes)}.`,
      ...valueOptions(s, [v * minutes, minutes % 60 ? v * misread : s * 2, s * 2], {
        near: [v / 2],
        unit: 'km',
      }),
      hint: 'Em đổi thời gian ra giờ, rồi lấy vận tốc nhân với thời gian.',
      solution: `Đổi: ${hoursMinutes(minutes)} = ${hoursText(minutes)} giờ. Quãng đường là: ${v} × ${hoursText(minutes)} = ${num(s)} (km). ${capitalize(vehicle.short)} đi được ${num(s)} km.`,
    };
  },
};

/** @type {Skill} */
export const timeSkill = {
  id: 'thoi-gian-di',
  label: 'Tính thời gian đi',
  make(rand) {
    const vehicle = pick(rand, VEHICLES);
    const v = quarterSpeed(rand, vehicle);
    const minutes = pick(rand, TRIP_MINUTES);
    const s = (v * minutes) / 60;
    return {
      prompt: `Quãng đường AB dài ${num(s)} km. ${vehicle.who} đi từ A đến B với vận tốc ${v} km/giờ. Hỏi ${vehicle.short} đi hết bao lâu?`,
      ...timeOptions(rand, minutes, [
        decimalSlip(minutes),
        minutes + 60,
        minutes + 30,
        minutes - 15,
      ]),
      hint: 'Thời gian = quãng đường : vận tốc. Kết quả tính theo giờ, em đổi phần lẻ ra phút.',
      solution: `Thời gian ${vehicle.short} đi là: ${num(s)} : ${v} = ${hoursText(minutes)} (giờ). ${hoursText(minutes)} giờ = ${hoursMinutes(minutes)}. ${capitalize(vehicle.short)} đi hết ${hoursMinutes(minutes)}.`,
    };
  },
};

/** @type {Skill} */
export const speedUnitSkill = {
  id: 'doi-don-vi-van-toc',
  label: 'Đổi đơn vị đo vận tốc',
  make(rand) {
    if (rand() < 0.5) {
      const k = int(rand, 4, 20);
      const v = 3 * k;
      const right = 50 * k;
      return {
        prompt: `${v} km/giờ = ? m/phút`,
        ...valueOptions(right, [v * 1000, v * 60, right + 50], { unit: 'm/phút' }),
        hint: '1 km = 1 000 m và 1 giờ = 60 phút. Em đổi ki-lô-mét ra mét rồi chia cho 60.',
        solution: `${v} km = ${fmt(v * 1000)} m; ${fmt(v * 1000)} : 60 = ${fmt(right)}. Vậy ${v} km/giờ = ${fmt(right)} m/phút.`,
      };
    }
    const x = int(rand, 4, 25);
    const right = tidy(x * 3.6);
    return {
      prompt: `${x} m/giây = ? km/giờ`,
      ...valueOptions(right, [x * 60, x * 36, x * 3600], { unit: 'km/giờ' }),
      hint: '1 giờ = 3 600 giây. Em tìm quãng đường đi trong 1 giờ (theo mét), rồi đổi ra ki-lô-mét.',
      solution: `Trong 1 giờ đi được: ${x} × 3 600 = ${fmt(x * 3600)} (m) = ${num(right)} km. Vậy ${x} m/giây = ${num(right)} km/giờ.`,
    };
  },
};

/** Two riders of a race, named as the book names them. */
const RIDERS = /** @type {const} */ ([
  ['anh Hùng', 'anh Dũng'],
  ['anh Minh', 'anh Quân'],
  ['chị Lan', 'chị Hoa'],
]);

/** @type {Skill} */
export const compareSpeedSkill = {
  id: 'so-sanh-van-toc',
  label: 'So sánh hai vận tốc',
  make(rand) {
    const [one, two] = pick(rand, RIDERS);
    const both = one.startsWith('anh') ? 'Hai anh' : 'Hai chị';
    const ms = pick(rand, [5, 6, 7, 8, 9, 10]);
    const kmh = tidy(ms * 3.6);
    const offset = pick(rand, [-4, -2, 2, 4, 0]);
    // An equal pair only when the speed in km/giờ is a whole number.
    const first = Number.isInteger(kmh) ? kmh + offset : Math.round(kmh) + (offset || 2);
    const options = [
      `${capitalize(one)} nhanh hơn`,
      `${capitalize(two)} nhanh hơn`,
      `${both} nhanh như nhau`,
    ];
    const answer = first > kmh ? 0 : first < kmh ? 1 : 2;
    const sign = first > kmh ? '>' : first < kmh ? '<' : '=';
    const verdict =
      answer === 2
        ? `${both.toLowerCase()} nhanh như nhau`
        : `${answer === 0 ? one : two} nhanh hơn`;
    return {
      prompt: `Trong cuộc đua xe đạp, ${one} đi với vận tốc ${first} km/giờ, ${two} đi với vận tốc ${ms} m/giây. Ai đi nhanh hơn?`,
      options,
      answer,
      hint: 'Em đổi hai vận tốc về cùng đơn vị km/giờ rồi so sánh. 1 m/giây = 3,6 km/giờ.',
      solution: `Đổi: ${ms} m/giây = ${ms} × 3,6 = ${num(kmh)} (km/giờ). Vì ${first} ${sign} ${num(kmh)} nên ${verdict}.`,
    };
  },
};

/** @type {Skill} */
export const arrivalSkill = {
  id: 'gio-den',
  label: 'Tính giờ đến nơi',
  make(rand) {
    const vehicle = pick(rand, VEHICLES.slice(1));
    const v = quarterSpeed(rand, vehicle);
    const minutes = pick(rand, TRIP_MINUTES);
    const s = (v * minutes) / 60;
    const start = int(rand, 6, 9) * 60 + pick(rand, [0, 15, 30, 45]);
    const rest = rand() < 0.4 ? pick(rand, [15, 30]) : 0;
    const right = start + minutes + rest;
    const restText = rest ? ` Dọc đường, ${vehicle.short} nghỉ ${rest} phút.` : '';
    const slip = decimalSlip(minutes);
    return {
      prompt: `${vehicle.who} khởi hành từ A lúc ${hoursMinutes(start)}, đi đến B với vận tốc ${v} km/giờ. Quãng đường AB dài ${num(s)} km.${restText} Hỏi ${vehicle.short} đến B lúc mấy giờ?`,
      ...timeOptions(rand, right, [
        rest ? start + minutes : right + 30,
        slip === null ? right - 30 : start + slip + rest,
        right + 60,
        right - 15,
      ]),
      hint: `Em tìm thời gian đi = quãng đường : vận tốc, rồi cộng vào giờ khởi hành${rest ? ' và cộng cả thời gian nghỉ' : ''}.`,
      solution: `Thời gian ${vehicle.short} đi là: ${num(s)} : ${v} = ${hoursText(minutes)} (giờ) = ${hoursMinutes(minutes)}. ${capitalize(vehicle.short)} đến B lúc: ${hoursMinutes(start)} + ${hoursMinutes(minutes)}${rest ? ` + ${rest} phút` : ''} = ${hoursMinutes(right)}.`,
    };
  },
};

/** @type {Skill} */
export const remainingSkill = {
  id: 'quang-duong-con-lai',
  label: 'Quãng đường còn lại',
  make(rand) {
    const v = 5 * int(rand, 10, 16);
    const t = int(rand, 5, 15);
    const walked = v * t;
    const left = 10 * int(rand, Math.max(20, Math.ceil((1000 - walked) / 10)), 150);
    const total = walked + left;
    return {
      prompt: `Quãng đường từ nhà Nam đến trường dài ${num(total / 1000)} km. Nam đi bộ với vận tốc ${v} m/phút. Sau ${t} phút, Nam còn cách trường bao nhiêu mét?`,
      ...valueOptions(left, [walked, left + 100, left + v], { unit: 'm' }),
      hint: 'Em đổi quãng đường ra mét, tìm quãng đường Nam đã đi (vận tốc × thời gian), rồi lấy cả quãng đường trừ đi.',
      solution: `Đổi: ${num(total / 1000)} km = ${fmt(total)} m. Nam đã đi được: ${v} × ${t} = ${fmt(walked)} (m). Nam còn cách trường: ${fmt(total)} − ${fmt(walked)} = ${fmt(left)} (m).`,
    };
  },
};

/** @type {Skill[]} */
export const MOTION_SKILLS = [
  speedSkill,
  distanceSkill,
  timeSkill,
  speedUnitSkill,
  compareSpeedSkill,
  arrivalSkill,
  remainingSkill,
];
