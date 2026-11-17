/**
 * The rules of the "apply a rule" board: each one sends every point M(x; y)
 * of the plane to exactly one point M', so each is a transformation.
 */
import { halfTurn, ptTex, samePoint } from '../_shared/transform.js';

/** @typedef {import('../_shared/transform.js').Pt} Pt */

/** The fixed point of the "midpoint" rule, as in the book's exercise. */
export const I = { x: 1, y: 2 };

/**
 * @typedef {{
 *   id: string,
 *   label: string,
 *   ruleTex: string,
 *   map: (p: Pt) => Pt,
 *   about: string,
 * }} Rule
 */

/** @type {Rule[]} */
export const RULES = [
  {
    id: 'dich',
    label: '(x + 2; y + 1)',
    ruleTex: "M(x;\\ y) \\mapsto M'(x + 2;\\ y + 1)",
    map: (p) => ({ x: p.x + 2, y: p.y + 1 }),
    about:
      'Mọi điểm cùng dịch sang phải $2$ đơn vị và lên trên $1$ đơn vị: tam giác trượt đi mà giữ nguyên hình dạng.',
  },
  {
    id: 'trung-diem',
    label: 'Đối xứng qua I',
    ruleTex: "M(x;\\ y) \\mapsto M'(2 - x;\\ 4 - y)",
    map: (p) => halfTurn(p, I),
    about:
      "$I(1;\\ 2)$ biến thành chính nó, mỗi điểm $M$ khác $I$ biến thành $M'$ sao cho $I$ là trung điểm của $MM'$.",
  },
  {
    id: 'oy',
    label: '(−x; y)',
    ruleTex: "M(x;\\ y) \\mapsto M'(-x;\\ y)",
    map: (p) => ({ x: p.x === 0 ? 0 : -p.x, y: p.y }),
    about: 'Hoành độ đổi dấu, tung độ giữ nguyên: hình bị "lật" sang phía bên kia trục $Oy$.',
  },
  {
    id: 'chieu',
    label: '(x; 0)',
    ruleTex: "M(x;\\ y) \\mapsto M'(x;\\ 0)",
    map: (p) => ({ x: p.x, y: 0 }),
    about:
      'Mỗi điểm biến thành hình chiếu của nó trên $Ox$. Mọi điểm cùng hoành độ có chung một ảnh, và tam giác biến thành một đoạn thẳng.',
  },
  {
    id: 'gap-doi',
    label: '(2x; 2y)',
    ruleTex: "M(x;\\ y) \\mapsto M'(2x;\\ 2y)",
    map: (p) => ({ x: 2 * p.x, y: 2 * p.y }),
    about: 'Toạ độ nhân đôi: ảnh của tam giác có hình dạng như cũ nhưng mỗi cạnh dài gấp đôi.',
  },
];

/**
 * The rule with this id, or the first one.
 * @param {string} id
 */
export function ruleOf(id) {
  return RULES.find((r) => r.id === id) ?? RULES[0];
}

/**
 * The live sentence under the board: the image of M, and what is special
 * about it under this rule.
 * @param {Rule} rule
 * @param {Pt} m
 */
export function imageNote(rule, m) {
  const img = rule.map(m);
  const head = `Ảnh của $M${ptTex(m)}$ là $M'${ptTex(img)}$.`;
  if (samePoint(img, m)) return `${head} Điểm $M$ biến thành chính nó.`;
  if (rule.id === 'chieu')
    return `${head} Mọi điểm trên đường thẳng $x = ${m.x < 0 ? `-${-m.x}` : m.x}$ đều có ảnh là $M'$.`;
  return head;
}

/**
 * Vertices of the triangle ABC used on the board.
 * @type {Pt[]}
 */
export const TRIANGLE = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 1, y: 2 },
];
