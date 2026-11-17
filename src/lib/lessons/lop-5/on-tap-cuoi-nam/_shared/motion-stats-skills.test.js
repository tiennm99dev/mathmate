import { describe, expect, it } from 'vitest';
import { rng } from '#lib/core/drill.js';
import { optionText } from '#lib/core/kid/quiz.js';
import { GENERAL_SKILLS } from './general-skills.js';
import { MOTION_SKILLS } from './motion-skills.js';
import { STATS_SKILLS } from './stats-skills.js';

/** @typedef {import('./visual.js').ReviewQuestion} Question */

/** @param {Question} q */
const rightText = (q) => optionText(q.options[q.answer]);

/**
 * A number written the book's way read back: '12 345,5' → 12345.5.
 * @param {string} text
 */
const value = (text) => Number(text.replace(/[\s\u202f]/g, '').replace(',', '.'));

/**
 * Minutes written "a giờ b phút" (or one of the two) read back.
 * @param {string} t
 */
const minutesOf = (t) =>
  Number(/(\d+) giờ/.exec(t)?.[1] ?? 0) * 60 + Number(/(\d+) phút/.exec(t)?.[1] ?? 0);

/** @param {number} x */
const round6 = (x) => Number(x.toFixed(6));

const NUM = '([\\d\\u202f,]+)';
const TIME = '(\\d+ giờ(?: \\d+ phút)?|\\d+ phút)';

/**
 * Runs a skill over many seeds and lists the questions whose stored answer
 * differs from the one `expected` works out from the prompt.
 * @param {import('./visual.js').ReviewSkill[]} set
 * @param {string} id
 * @param {(q: Question) => number | string | null} expected
 * @param {(text: string) => number | string} read
 */
function mismatches(set, id, expected, read) {
  const skill = set.find((s) => s.id === id);
  if (!skill) return [['missing skill', id]];
  const bad = [];
  for (let seed = 1; seed <= 200; seed++) {
    const q = skill.make(rng(seed));
    const want = expected(q);
    if (want === null) bad.push(['unparsed', q.prompt]);
    else if (read(rightText(q)) !== want) bad.push([q.prompt, rightText(q), want]);
  }
  return bad;
}

/** @param {string} t */
const firstNumber = (t) => value(t.split(' ')[0]);

describe('motion', () => {
  it('finds speed, distance and time with the three formulas', () => {
    const bad = [
      ...mismatches(
        MOTION_SKILLS,
        'van-toc',
        (q) => {
          const km = new RegExp(`được ${NUM} km trong ${TIME}`).exec(q.prompt);
          if (km) return round6(value(km[1]) / (minutesOf(km[2]) / 60));
          const m = new RegExp(`chạy ${NUM} m hết (\\d+) giây`).exec(q.prompt);
          return m ? value(m[1]) / Number(m[2]) : null;
        },
        firstNumber,
      ),
      ...mismatches(
        MOTION_SKILLS,
        'quang-duong',
        (q) => {
          const m = new RegExp(`vận tốc (\\d+) (km/giờ|m/phút)\\. .* trong ${TIME}`).exec(q.prompt);
          if (!m) return null;
          const time = m[2] === 'km/giờ' ? minutesOf(m[3]) / 60 : minutesOf(m[3]);
          return round6(Number(m[1]) * time);
        },
        firstNumber,
      ),
      ...mismatches(
        MOTION_SKILLS,
        'thoi-gian-di',
        (q) => {
          const m = new RegExp(`dài ${NUM} km\\. .* vận tốc (\\d+) km/giờ`).exec(q.prompt);
          return m ? Math.round((value(m[1]) / Number(m[2])) * 60) : null;
        },
        minutesOf,
      ),
    ];
    expect(bad).toEqual([]);
  });

  it('changes speed units and compares speeds', () => {
    const bad = [
      ...mismatches(
        MOTION_SKILLS,
        'doi-don-vi-van-toc',
        (q) => {
          const a = /^(\d+) km\/giờ = \? m\/phút$/.exec(q.prompt);
          if (a) return (Number(a[1]) * 1000) / 60;
          const b = /^(\d+) m\/giây = \? km\/giờ$/.exec(q.prompt);
          return b ? round6(Number(b[1]) * 3.6) : null;
        },
        firstNumber,
      ),
      ...mismatches(
        MOTION_SKILLS,
        'so-sanh-van-toc',
        (q) => {
          const m = /, (.+?) đi với vận tốc (\d+) km\/giờ, (.+?) đi với vận tốc (\d+) m\/giây/.exec(
            q.prompt,
          );
          if (!m) return null;
          const d = Number(m[2]) - Number(m[4]) * 3.6;
          if (Math.abs(d) < 1e-9) return 'equal';
          return (d > 0 ? m[1] : m[3]).toLowerCase();
        },
        (t) => (t.includes('như nhau') ? 'equal' : t.replace(' nhanh hơn', '').toLowerCase()),
      ),
    ];
    expect(bad).toEqual([]);
  });

  it('finds the time of arrival and the distance still to go', () => {
    const bad = [
      ...mismatches(
        MOTION_SKILLS,
        'gio-den',
        (q) => {
          const m = new RegExp(`lúc ${TIME}, .* vận tốc (\\d+) km/giờ\\. .* dài ${NUM} km`).exec(
            q.prompt,
          );
          if (!m) return null;
          const rest = Number(/nghỉ (\d+) phút/.exec(q.prompt)?.[1] ?? 0);
          return minutesOf(m[1]) + Math.round((value(m[3]) / Number(m[2])) * 60) + rest;
        },
        minutesOf,
      ),
      ...mismatches(
        MOTION_SKILLS,
        'quang-duong-con-lai',
        (q) => {
          const m = new RegExp(`dài ${NUM} km\\. .* vận tốc (\\d+) m/phút\\. Sau (\\d+) phút`).exec(
            q.prompt,
          );
          return m ? Math.round(value(m[1]) * 1000) - Number(m[2]) * Number(m[3]) : null;
        },
        firstNumber,
      ),
    ];
    expect(bad).toEqual([]);
  });
});

describe('statistics and chance', () => {
  it('draws pie charts whose parts make 100% and answers from them', () => {
    const bad = [];
    for (const id of ['bieu-do-quat', 'phan-con-lai']) {
      const skill = STATS_SKILLS.find((s) => s.id === id);
      for (let seed = 1; seed <= 200; seed++) {
        const q = skill?.make(rng(seed));
        if (!q || q.visual?.type !== 'pie') {
          bad.push([id, 'no pie']);
          continue;
        }
        const parts = q.visual.parts;
        if (parts.reduce((a, p) => a + p.percent, 0) !== 100) bad.push([id, parts]);
        const right = rightText(q);
        if (id === 'phan-con-lai') {
          const hidden = parts.filter((p) => p.hidden);
          if (hidden.length !== 1 || value(right.replace('%', '')) !== hidden[0].percent)
            bad.push([id, right]);
          continue;
        }
        const total = /có ([\d\u202f]+) (bạn|học sinh)/.exec(q.prompt);
        if (!total) {
          const top = parts.reduce((a, p) => (p.percent > a.percent ? p : a));
          if (right !== top.label) bad.push([id, right, parts]);
          continue;
        }
        const part = parts.find((p) => q.prompt.endsWith(` ${p.label.toLowerCase()}?`));
        const want = part ? (value(total[1]) * part.percent) / 100 : NaN;
        if (firstNumber(right) !== want) bad.push([id, q.prompt, right]);
      }
    }
    expect(bad).toEqual([]);
  });

  it('reads tables, percentages and ratios of repeats', () => {
    const bad = [
      ...mismatches(
        STATS_SKILLS,
        'doc-bang-so-lieu',
        (q) => {
          if (q.visual?.type !== 'table') return null;
          const counts = q.visual.rows.map((r) => Number(r[1]));
          const face = /Mặt (\d) chấm xuất hiện bao nhiêu/.exec(q.prompt);
          if (face) return `${counts[Number(face[1]) - 1]} lần`;
          if (/tất cả/.test(q.prompt)) return `${counts.reduce((a, b) => a + b, 0)} lần`;
          const c = /nhiều nhất/.test(q.prompt) ? Math.max(...counts) : Math.min(...counts);
          return `Mặt ${counts.indexOf(c) + 1} chấm`;
        },
        (t) => t,
      ),
      ...mismatches(
        STATS_SKILLS,
        'phan-tram-so-lieu',
        (q) => {
          const m = /có (\d+) bạn .* trong đó (\d+) bạn/.exec(q.prompt);
          return m ? round6((Number(m[2]) / Number(m[1])) * 100) : null;
        },
        (t) => value(t.replace('%', '')),
      ),
      ...mismatches(
        STATS_SKILLS,
        'ti-so-lap-lai',
        (q) => {
          const m = /(\d+) lần, có (\d+) lần (.+?)\. Viết tỉ số của số lần (.+?) so với/.exec(
            q.prompt,
          );
          if (!m) return null;
          const [n, a] = [Number(m[1]), Number(m[2])];
          return m[3] === m[4] ? `${a}/${n}` : `${n - a}/${n}`;
        },
        (t) => t,
      ),
    ];
    expect(bad).toEqual([]);
  });

  it('sorts collected data', () => {
    const bad = mismatches(
      STATS_SKILLS,
      'sap-xep-so-lieu',
      (q) => {
        const rows = [...q.prompt.matchAll(/([A-ZÀ-Ỹ][\p{L}-]*): ([\d,]+) (?:m|kg)/gu)];
        if (rows.length !== 4) return null;
        const values = rows.map((r) => value(r[2]));
        const most = /(cao|nặng) nhất/.test(q.prompt);
        const v = most ? Math.max(...values) : Math.min(...values);
        return rows[values.indexOf(v)][1];
      },
      (t) => t,
    );
    expect(bad).toEqual([]);
  });

  it('judges boxes of balls and two dice by listing every case', () => {
    /** @type {number[]} */
    const sums = [];
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) sums.push(a + b);
    /** @type {Record<string, (s: number) => boolean>} */
    const events = {
      'tổng số chấm là số lẻ': (s) => s % 2 === 1,
      'tổng số chấm là 1': (s) => s === 1,
      'tổng số chấm lớn hơn 1 và bé hơn 13': (s) => s > 1 && s < 13,
      'tổng số chấm là 13': (s) => s === 13,
      'tổng số chấm là 7': (s) => s === 7,
    };
    /**
     * The book's word for an event that holds in `yes` of `all` cases.
     * @param {number} yes
     * @param {number} all
     */
    const word = (yes, all) => (yes === all ? 'Chắc chắn' : yes === 0 ? 'Không thể' : 'Có thể');
    let dice = 0;
    const bad = mismatches(
      STATS_SKILLS,
      'kha-nang',
      (q) => {
        const ev = /Sự kiện "(.+)"/.exec(q.prompt)?.[1] ?? '';
        if (q.prompt.startsWith('Gieo hai con xúc xắc')) {
          dice += 1;
          return events[ev] ? word(sums.filter(events[ev]).length, 36) : null;
        }
        const box = /Hộp có (\d) quả bóng đỏ và (\d) quả bóng vàng\. Lấy ra cùng lúc (\d) quả/.exec(
          q.prompt,
        );
        if (!box) return null;
        const [red, yellow, k] = box.slice(1).map(Number);
        // Every possible number of red balls among the k drawn.
        const reds = [];
        for (let r = Math.max(0, k - yellow); r <= Math.min(red, k); r++) reds.push(r);
        if (ev === 'có quả bóng màu xanh') return 'Không thể';
        if (ev === `cả ${k} quả đều màu đỏ`)
          return word(reds.filter((r) => r === k).length, reds.length);
        if (ev === 'có ít nhất 1 quả màu vàng')
          return word(reds.filter((r) => r < k).length, reds.length);
        return null;
      },
      (t) => t,
    );
    expect(dice).toBeGreaterThan(20);
    expect(bad).toEqual([]);
  });
});

describe('the general review', () => {
  it('takes parts from every strand with distinct ids', () => {
    expect(GENERAL_SKILLS.length).toBe(12);
    expect(new Set(GENERAL_SKILLS.map((s) => s.id)).size).toBe(12);
  });
});
