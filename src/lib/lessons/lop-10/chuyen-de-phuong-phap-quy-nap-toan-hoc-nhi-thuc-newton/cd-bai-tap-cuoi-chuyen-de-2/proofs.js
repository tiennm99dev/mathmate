/**
 * Induction proofs with blanks for the fill-in widget. Each line is plain
 * rich text, or a lead-in followed by a blank the learner fills from a few
 * options; `answer` is the index of the right option and `why` explains a
 * wrong pick. `holds(n)` checks the statement itself for one n, so the tests
 * can confirm every proof proves something true.
 */

/**
 * @typedef {{ text: string } | { lead: string, options: string[], answer: number, why: string }} ProofLine
 */

/**
 * @typedef {object} Proof
 * @property {string} id
 * @property {string} label
 * @property {string} statement rich text
 * @property {number} start the first n of the claim
 * @property {(n: number) => boolean} holds
 * @property {ProofLine[]} lines
 */

/** @type {Proof[]} */
export const PROOFS = [
  {
    id: 'tong-tich',
    label: 'Đẳng thức',
    statement:
      'Chứng minh $1 \\cdot 2 + 2 \\cdot 3 + \\dots + n(n + 1) = \\dfrac{n(n + 1)(n + 2)}{3}$ với mọi $n \\ge 1$.',
    start: 1,
    holds: (n) => {
      let s = 0;
      for (let i = 1; i <= n; i += 1) s += i * (i + 1);
      return 3 * s === n * (n + 1) * (n + 2);
    },
    lines: [
      {
        lead: 'Bước 1. Với $n = 1$: vế phải bằng $\\dfrac{1 \\cdot 2 \\cdot 3}{3} = 2$, vế trái bằng',
        options: ['$1 \\cdot 2 = 2$', '$1$', '$2 \\cdot 3 = 6$'],
        answer: 0,
        why: 'Với $n = 1$, vế trái chỉ có một số hạng $1 \\cdot (1 + 1)$.',
      },
      {
        lead: 'Bước 2. Giả sử đẳng thức đúng với',
        options: [
          'mọi $n \\ge 1$',
          '$n = k$ ($k \\ge 1$): $1 \\cdot 2 + \\dots + k(k + 1) = \\dfrac{k(k + 1)(k + 2)}{3}$',
          '$n = k + 1$',
        ],
        answer: 1,
        why: 'Giả thiết quy nạp chỉ nói về một giá trị $n = k$; giả sử đúng với mọi $n$ hay với $n = k + 1$ là giả sử điều cần chứng minh.',
      },
      {
        lead: 'Ta cần chứng minh $1 \\cdot 2 + \\dots + k(k + 1) + (k + 1)(k + 2)$ bằng',
        options: [
          '$\\dfrac{k(k + 1)(k + 2)}{3}$',
          '$\\dfrac{(k + 1)(k + 2)}{3}$',
          '$\\dfrac{(k + 1)(k + 2)(k + 3)}{3}$',
        ],
        answer: 2,
        why: 'Thay $n$ bằng $k + 1$ ở mọi chỗ trong vế phải $\\dfrac{n(n + 1)(n + 2)}{3}$.',
      },
      {
        lead: 'Theo giả thiết quy nạp, vế trái bằng',
        options: [
          '$\\dfrac{k(k + 1)(k + 2)}{3} + (k + 1)(k + 2)$',
          '$\\dfrac{k(k + 1)(k + 2)}{3} + k(k + 1)$',
          '$\\dfrac{k(k + 1)(k + 2)}{3} \\cdot (k + 1)(k + 2)$',
        ],
        answer: 0,
        why: 'Tổng $k$ số hạng đầu thay bằng $\\dfrac{k(k + 1)(k + 2)}{3}$, rồi cộng thêm số hạng cuối $(k + 1)(k + 2)$.',
      },
      {
        lead: 'Đặt nhân tử chung $(k + 1)(k + 2)$, vế trái bằng',
        options: [
          '$(k + 1)(k + 2)\\left(\\dfrac{k}{3} + 1\\right) = \\dfrac{(k + 1)(k + 2)(k + 3)}{3}$',
          '$(k + 1)(k + 2) \\cdot \\dfrac{k}{3} = \\dfrac{k(k + 1)(k + 2)}{3}$',
          '$(k + 1)(k + 2)(k + 1) = (k + 1)^2(k + 2)$',
        ],
        answer: 0,
        why: 'Hai số hạng đều có nhân tử $(k + 1)(k + 2)$; phần còn lại là $\\dfrac{k}{3}$ và $1$.',
      },
      { text: 'Vậy đẳng thức đúng với $n = k + 1$, do đó đúng với mọi $n \\ge 1$.' },
    ],
  },
  {
    id: 'chia-het',
    label: 'Chia hết',
    statement: 'Chứng minh $5^n - 1$ chia hết cho $4$ với mọi $n \\ge 1$.',
    start: 1,
    holds: (n) => {
      let r = 1;
      for (let i = 0; i < n; i += 1) r = (r * 5) % 4;
      return (r - 1 + 4) % 4 === 0;
    },
    lines: [
      {
        lead: 'Bước 1. Với $n = 1$:',
        options: [
          '$5^0 - 1 = 0$ chia hết cho $4$',
          '$5^1 - 1 = 4$ chia hết cho $4$',
          '$5^1 = 5$ chia hết cho $4$',
        ],
        answer: 1,
        why: 'Thay đúng $n = 1$ vào biểu thức $5^n - 1$.',
      },
      {
        lead: 'Bước 2. Giả sử $5^k - 1$ chia hết cho $4$ ($k \\ge 1$). Ta viết $5^{k + 1} - 1$ thành',
        options: ['$5(5^k - 1) + 4$', '$5(5^k - 1) + 1$', '$(5^k - 1) + 5$'],
        answer: 0,
        why: '$5(5^k - 1) = 5^{k + 1} - 5$, nên phải cộng thêm $4$ để được $5^{k + 1} - 1$.',
      },
      {
        lead: 'Kết luận bước quy nạp:',
        options: [
          '$5(5^k - 1)$ chia hết cho $4$ theo giả thiết quy nạp và $4$ chia hết cho $4$, nên $5^{k + 1} - 1$ chia hết cho $4$',
          '$5^{k + 1}$ chia hết cho $4$ nên $5^{k + 1} - 1$ chia hết cho $4$',
          'chỉ cần $5$ là số lẻ',
        ],
        answer: 0,
        why: 'Một tổng chia hết cho $4$ khi mỗi số hạng của nó chia hết cho $4$; $5^{k + 1}$ không chia hết cho $4$.',
      },
      { text: 'Vậy $5^n - 1$ chia hết cho $4$ với mọi $n \\ge 1$.' },
    ],
  },
  {
    id: 'bat-dang-thuc',
    label: 'Bất đẳng thức',
    statement: 'Chứng minh $3^n > 2n + 3$ với mọi số tự nhiên $n \\ge 2$.',
    start: 2,
    holds: (n) => 3 ** n > 2 * n + 3,
    lines: [
      {
        lead: 'Bước 1. Bước cơ sở kiểm tra với',
        options: ['$n = 1$: $3 > 5$', '$n = 2$: $9 > 7$', '$n = 0$: $1 > 3$'],
        answer: 1,
        why: 'Mệnh đề chỉ khẳng định với $n \\ge 2$, nên bước cơ sở là $n = 2$ (với $n = 1$ bất đẳng thức sai).',
      },
      {
        lead: 'Bước 2. Giả sử $3^k > 2k + 3$ với $k \\ge 2$. Nhân hai vế với $3$:',
        options: ['$3^{k + 1} > 6k + 9$', '$3^{k + 1} > 2k + 9$', '$3^{k + 1} > 6k + 3$'],
        answer: 0,
        why: 'Nhân cả hai số hạng $2k$ và $3$ với $3$.',
      },
      {
        lead: 'Cần chứng minh $3^{k + 1} > 2(k + 1) + 3 = 2k + 5$. Điều này đúng vì',
        options: ['$6k + 9 > 2k + 5$ với mọi $k \\ge 2$', '$6k + 9 = 2k + 5$', '$3^{k + 1} > 3^k$'],
        answer: 0,
        why: 'Cần một bất đẳng thức nối $6k + 9$ với $2k + 5$: hiệu của chúng là $4k + 4 > 0$.',
      },
      { text: 'Vậy $3^n > 2n + 3$ với mọi $n \\ge 2$.' },
    ],
  },
];

/**
 * The blanks of a proof, in order.
 * @param {Proof} proof
 */
export function blanksOf(proof) {
  return proof.lines.filter((line) => 'options' in line);
}

/**
 * The live sentence under a proof.
 * @param {number} filled right answers so far
 * @param {number} total blanks in the proof
 */
export function progressText(filled, total) {
  if (filled === total) return `Đã điền đúng cả ${total} chỗ trống: chứng minh hoàn chỉnh.`;
  return `Đã điền đúng ${filled}/${total} chỗ trống.`;
}
