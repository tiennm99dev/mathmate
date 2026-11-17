/**
 * The tree diagram of the counting rules. With the multiplication rule each
 * stage (áo, quần, giày) branches every path again; with the addition rule
 * the root splits into separate options whose ways are simply added.
 */

/**
 * @typedef {object} Stage
 * @property {string} name heading of the stage, 'Áo'
 * @property {string} noun lower-case noun for sentences, 'áo'
 * @property {string[]} items the choices, as many as the stage can offer
 */

/**
 * The outfit of the multiplication rule: a shirt, trousers, then shoes.
 * @type {Stage[]}
 */
export const OUTFIT = [
  { name: 'Áo', noun: 'áo', items: ['trắng', 'xanh', 'hồng', 'kẻ'] },
  { name: 'Quần', noun: 'quần', items: ['đen', 'xám', 'bò'] },
  { name: 'Giày', noun: 'giày', items: ['thể thao', 'da'] },
];

/**
 * The two options of the addition rule: a book or a pen as a present.
 * @type {Stage[]}
 */
export const GIFTS = [
  { name: 'Sách', noun: 'sách', items: ['Toán', 'Văn', 'Anh', 'Sử'] },
  { name: 'Bút', noun: 'bút', items: ['bi', 'chì', 'máy', 'dạ'] },
];

/** @typedef {{ label: string, children: TreeNode[] }} TreeNode */

/**
 * Every path through the stages: one level per stage, each node branching
 * into the first `counts[d]` items of the next stage.
 * @param {Stage[]} stages @param {number[]} counts
 * @returns {TreeNode}
 */
export function productTree(stages, counts) {
  /** @param {number} d @returns {TreeNode[]} */
  const level = (d) =>
    d === stages.length
      ? []
      : stages[d].items.slice(0, counts[d]).map((label) => ({ label, children: level(d + 1) }));
  return { label: '', children: level(0) };
}

/**
 * The root splits into the options, each listing its own items.
 * @param {Stage[]} groups @param {number[]} counts
 * @returns {TreeNode}
 */
export function sumTree(groups, counts) {
  return {
    label: '',
    children: groups.map((g, i) => ({
      label: g.name,
      children: g.items.slice(0, counts[i]).map((label) => ({ label, children: [] })),
    })),
  };
}

/**
 * @typedef {object} Placed
 * @property {number} depth column, 0 at the root
 * @property {number} row leaf rows count from 0; inner nodes sit midway
 * @property {string} label
 * @property {number[]} path child indices from the root
 * @property {boolean} leaf
 */
/** @typedef {{ from: Placed, to: Placed }} Edge */

/**
 * Lays a tree out from left to right: leaves on consecutive rows, every inner
 * node midway between its first and last child.
 * @param {TreeNode} root
 * @returns {{ nodes: Placed[], edges: Edge[], leaves: number, depth: number }}
 */
export function placeTree(root) {
  /** @type {Placed[]} */
  const nodes = [];
  /** @type {Edge[]} */
  const edges = [];
  let leaves = 0;
  let depth = 0;
  /** @param {TreeNode} node @param {number} d @param {number[]} path @returns {Placed} */
  function walk(node, d, path) {
    depth = Math.max(depth, d);
    if (node.children.length === 0) {
      const placed = { depth: d, row: leaves++, label: node.label, path, leaf: true };
      nodes.push(placed);
      return placed;
    }
    const kids = node.children.map((child, i) => walk(child, d + 1, [...path, i]));
    const placed = {
      depth: d,
      row: (kids[0].row + kids[kids.length - 1].row) / 2,
      label: node.label,
      path,
      leaf: false,
    };
    nodes.push(placed);
    for (const to of kids) edges.push({ from: placed, to });
    return placed;
  }
  walk(root, 0, []);
  return { nodes, edges, leaves, depth };
}

/**
 * Whether the node at `path` lies on the chosen path.
 * @param {number[]} path @param {number[]} chosen
 */
export function onPath(path, chosen) {
  return path.length <= chosen.length && path.every((p, i) => p === chosen[i]);
}

/**
 * Position (from 1) of a full pick among the leaves of a product tree.
 * @param {number[]} counts @param {number[]} picks
 */
export function productIndex(counts, picks) {
  return picks.reduce((acc, p, d) => acc * counts[d] + p, 0) + 1;
}

/**
 * The live sentence under the multiplication tree.
 * @param {Stage[]} stages @param {number[]} counts @param {number[]} picks
 */
export function productText(stages, counts, picks) {
  const total = counts.reduce((a, b) => a * b, 1);
  const chosen = stages.map((s, d) => `${s.noun} ${s.items[picks[d]]}`).join(', ');
  const steps = stages
    .map((s, d) =>
      d === 0
        ? `chọn ${s.noun} có $${counts[d]}$ cách`
        : `ứng với mỗi cách đó có $${counts[d]}$ cách chọn ${s.noun}`,
    )
    .join(', ');
  const product = counts.join(' \\cdot ');
  return `Bộ thứ ${productIndex(counts, picks)} trên sơ đồ: ${chosen}. Theo quy tắc nhân: ${steps}, nên có $${product} = ${total}$ bộ khác nhau.`;
}

/**
 * The live sentence under the addition tree.
 * @param {Stage[]} groups @param {number[]} counts @param {number} group @param {number} item
 */
export function sumText(groups, counts, group, item) {
  const total = counts.reduce((a, b) => a + b, 0);
  const index = counts.slice(0, group).reduce((a, b) => a + b, 0) + item + 1;
  const ways = groups.map((g, i) => `chọn ${g.noun} có $${counts[i]}$ cách`).join(', ');
  return `Cách thứ ${index} trên sơ đồ: ${groups[group].noun} ${groups[group].items[item]}. Theo quy tắc cộng: ${ways}, không cách nào trùng nhau, nên có $${counts.join(' + ')} = ${total}$ cách chọn một món quà.`;
}
