import { describe, expect, it } from 'vitest';
import { countOrProbabilityText, readProbability } from '#lib/core/fractions.js';
import { rng } from '#lib/core/drill.js';
import { strictTexFailures } from '#lib/core/tex-check.js';
import { CHAPTER_SKILLS } from './skills.js';

/** @param {import('#lib/core/drill.js').Skill} skill @param {number} [count] */
function sample(skill, count = 400) {
  const r = rng(2026);
  return Array.from({ length: count }, () => skill.make(r));
}

/**
 * Every k-subset of 0..n−1, as arrays.
 * @param {number} n @param {number} k
 * @returns {number[][]}
 */
function subsets(n, k) {
  if (k === 0) return [[]];
  if (n < k) return [];
  return [...subsets(n - 1, k - 1).map((s) => [...s, n - 1]), ...subsets(n - 1, k)];
}

/**
 * The answer recomputed from the prompt alone, by listing outcomes.
 * @param {string} p
 */
function solve(p) {
  let m = /^Tung một đồng xu \$(\d)\$ lần liên tiếp\. Không gian mẫu/.exec(p);
  if (m) return 2 ** Number(m[1]);
  m = /^Gieo \$(\d)\$ con xúc xắc\. Không gian mẫu/.exec(p);
  if (m) return 6 ** Number(m[1]);
  m =
    /^Một hộp có \$(\d+)\$ viên bi khác nhau\. Lấy ngẫu nhiên đồng thời \$(\d)\$ viên bi\. Không gian mẫu/.exec(
      p,
    );
  if (m) return subsets(Number(m[1]), Number(m[2])).length;
  m = /^Gieo hai con xúc xắc cân đối\. .+ bằng \$(\d+)\$"\.$/.exec(p);
  if (m) {
    let k = 0;
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === Number(m[1])) k++;
    return k / 36;
  }
  m =
    /^Một hộp có \$(\d+)\$ tấm thẻ đánh số từ \$1\$ đến \$\d+\$\. .+ chia hết cho \$(\d)\$\.$/.exec(
      p,
    );
  if (m) {
    const n = Number(m[1]);
    const d = Number(m[2]);
    return Array.from({ length: n }, (_, i) => i + 1).filter((x) => x % d === 0).length / n;
  }
  m =
    /^Một hộp có \$(\d)\$ viên bi đỏ và \$(\d)\$ viên bi xanh\. Lấy ngẫu nhiên đồng thời \$(\d)\$ viên bi\. Tính xác suất (.+)$/.exec(
      p,
    );
  if (m) {
    const red = Number(m[1]);
    const all = subsets(red + Number(m[2]), Number(m[3]));
    const reds = (/** @type {number[]} */ s) => s.filter((i) => i < red).length;
    const ask = m[4];
    /** @type {(s: number[]) => boolean} */
    let test;
    if (ask === 'để cả hai viên bi đều màu đỏ.') test = (s) => reds(s) === 2;
    else if (ask === 'để lấy được hai viên bi khác màu.') test = (s) => reds(s) === 1;
    else if (ask === 'để có ít nhất $1$ viên bi đỏ.') test = (s) => reds(s) >= 1;
    else throw new Error(`unknown ball event: ${ask}`);
    return all.filter(test).length / all.length;
  }
  m =
    /^Tung một đồng xu cân đối \$(\d)\$ lần liên tiếp\. .+"Có ít nhất một lần xuất hiện mặt ngửa"\.$/.exec(
      p,
    );
  if (m) {
    /** @type {string[]} */
    let words = [''];
    for (let t = 0; t < Number(m[1]); t++) words = words.flatMap((w) => [`${w}S`, `${w}N`]);
    return words.filter((w) => w.includes('N')).length / words.length;
  }
  throw new Error(`unknown prompt: ${p}`);
}

describe('chapter skills', () => {
  for (const skill of CHAPTER_SKILLS) {
    it(`${skill.id}: answers match a brute-force solution of the prompt`, () => {
      const bad = sample(skill)
        .filter((q) => Math.abs(q.answer - solve(q.prompt)) > 1e-12)
        .map((q) => q.prompt);
      expect(bad).toEqual([]);
    });

    it(`${skill.id}: answers survive being typed back`, () => {
      const bad = sample(skill, 300).filter((q) => {
        const typed = countOrProbabilityText(q.answer);
        const read = q.read ?? readProbability;
        const proper = Number.isInteger(q.answer) ? q.answer > 0 : q.answer > 0 && q.answer < 1;
        return read(typed) !== q.answer || !proper;
      });
      expect(bad.map((q) => q.prompt)).toEqual([]);
    });

    it(`${skill.id}: TeX parses in strict mode`, () => {
      const texts = sample(skill, 200).flatMap((q) => [q.prompt, ...q.steps, ...(q.hints ?? [])]);
      expect(texts.filter((text) => text.split('$').length % 2 !== 1)).toEqual([]);
      expect(strictTexFailures(texts)).toEqual([]);
    });
  }

  it('has distinct skill ids', () => {
    expect(new Set(CHAPTER_SKILLS.map((s) => s.id)).size).toBe(CHAPTER_SKILLS.length);
  });
});
