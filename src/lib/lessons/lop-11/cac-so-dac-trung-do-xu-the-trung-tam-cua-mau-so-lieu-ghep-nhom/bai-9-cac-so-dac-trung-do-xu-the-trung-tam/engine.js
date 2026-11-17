/**
 * What the measures widget shows for each centre measure of a grouped
 * sample: the group to light up, the part of it to shade, the marker on the
 * axis, the formula with its numbers, and a sentence on how it was found.
 */

import { numTex } from '#lib/core/number-format.js';
import {
  approxText,
  cumulative,
  groupTex,
  groupedMean,
  groupedModes,
  groupedQuartile,
  meanTex,
  modeTex,
  quartileTex,
  sampleSize,
} from '#lib/stats-engine/grouped.js';

/** @typedef {import('#lib/stats-engine/grouped.js').Group} Group */
/** @typedef {'mean' | 'median' | 'q1' | 'q3' | 'mode'} Measure */

/**
 * @typedef {object} Preset
 * @property {string} id
 * @property {string} title
 * @property {string} unit
 * @property {number} start
 * @property {number} width
 * @property {number[]} counts
 */

/** @type {Preset[]} */
export const PRESETS = [
  {
    id: 'tu-hoc',
    title: 'Thời gian tự học mỗi ngày (phút) của 40 học sinh',
    unit: 'phút',
    start: 0,
    width: 20,
    counts: [5, 9, 12, 10, 4],
  },
  {
    id: 'can-nang',
    title: 'Cân nặng (kg) của 50 học sinh',
    unit: 'kg',
    start: 40,
    width: 5,
    counts: [4, 10, 16, 12, 8],
  },
];

/** @type {Array<{ value: Measure, label: string }>} */
export const MEASURES = [
  { value: 'mean', label: 'Số trung bình' },
  { value: 'median', label: 'Trung vị' },
  { value: 'q1', label: 'Q₁' },
  { value: 'q3', label: 'Q₃' },
  { value: 'mode', label: 'Mốt' },
];

/**
 * @typedef {object} View
 * @property {number | null} highlight
 * @property {{ index: number, fraction: number } | null} shade
 * @property {Array<{ x: number, label: string, color: string }>} markers
 * @property {number | null} modeIndex
 * @property {boolean} midpoints
 * @property {string[]} tex formulas with numbers, as TeX
 * @property {string} note rich text
 * @property {'ok' | 'warn' | 'info'} tone
 */

const COLOR = {
  mean: '#0f766e',
  median: '#b45309',
  q1: '#7c3aed',
  q3: '#7c3aed',
  mode: '#be123c',
};

/**
 * @param {readonly Group[]} groups
 * @param {Measure} measure
 * @returns {View}
 */
export function viewOf(groups, measure) {
  /** @type {View} */
  const view = {
    highlight: null,
    shade: null,
    markers: [],
    modeIndex: null,
    midpoints: false,
    tex: [],
    note: '',
    tone: 'info',
  };
  const n = sampleSize(groups);
  if (n === 0) {
    return {
      ...view,
      tone: 'warn',
      note: 'Mẫu chưa có số liệu nào: hãy tăng tần số của ít nhất một nhóm.',
    };
  }

  if (measure === 'mean') {
    const m = groupedMean(groups);
    return {
      ...view,
      midpoints: true,
      markers: [{ x: m, label: `x̄ ${approxText(m)}`, color: COLOR.mean }],
      tex: [meanTex(groups)],
      note: 'Mỗi nhóm được thay bằng giá trị đại diện của nó, điểm giữa $x_i = \\dfrac{a_i + a_{i+1}}{2}$ (chấm xanh dưới mỗi cột), rồi lấy trung bình với trọng số là tần số. Kết quả xấp xỉ số trung bình của mẫu gốc.',
    };
  }

  if (measure === 'mode') {
    const modes = groupedModes(groups);
    const first = modes[0];
    /** @type {View['markers']} */
    const markers = [];
    for (const m of modes) {
      if (m.value !== null) {
        markers.push({ x: m.value, label: `Mₒ ${approxText(m.value)}`, color: COLOR.mode });
      }
    }
    const many =
      modes.length > 1
        ? ` Mẫu có ${modes.length} nhóm cùng tần số lớn nhất nên có thể có nhiều mốt; hình vẽ cách tìm mốt trong nhóm đầu tiên.`
        : '';
    const broken =
      first.value === null
        ? ' Hai nhóm kề cũng có tần số bằng nhóm này nên công thức không dùng được (mẫu số bằng $0$).'
        : '';
    return {
      ...view,
      highlight: first.index,
      modeIndex: first.index,
      markers,
      tex: modes.map((m) => modeTex(m)),
      tone: first.value === null ? 'warn' : 'info',
      note: `Nhóm chứa mốt là nhóm có tần số lớn nhất, $${groupTex(groups[first.index])}$ với $m_j = ${first.count}$. Mốt lệch về phía nhóm kề có tần số lớn hơn: $m_{j-1} = ${first.prev}$, $m_{j+1} = ${first.next}$. Hai đoạn thẳng đỏ nối đỉnh cột với đỉnh hai cột kề cắt nhau đúng tại mốt.${many}${broken}`,
    };
  }

  const k = measure === 'q1' ? 1 : measure === 'q3' ? 3 : 2;
  const q = groupedQuartile(groups, k);
  const cum = cumulative(groups);
  const name = k === 2 ? 'M_e' : `Q_${k}`;
  const share = k === 2 ? '\\dfrac{n}{2}' : k === 1 ? '\\dfrac{n}{4}' : '\\dfrac{3n}{4}';
  const label = k === 2 ? 'Mₑ' : k === 1 ? 'Q₁' : 'Q₃';
  const need = q.target - q.before;
  return {
    ...view,
    highlight: q.index,
    shade: { index: q.index, fraction: need / q.count },
    markers: [{ x: q.value, label: `${label} ${approxText(q.value)}`, color: COLOR[measure] }],
    tex: [quartileTex(q, k)],
    note: `Cỡ mẫu $n = ${n}$ nên $${share} = ${numTex(q.target)}$. Tần số tích luỹ đến hết nhóm trước là $C = ${q.before}$, đến hết nhóm $${groupTex(groups[q.index])}$ là $${cum[q.index]} \\ge ${numTex(q.target)}$: nhóm này chứa $${name}$. Coi $${q.count}$ giá trị của nhóm rải đều trên nhóm, cần thêm $${numTex(q.target)} - ${q.before} = ${numTex(need)}$ giá trị, tức là $\\dfrac{${numTex(need)}}{${q.count}}$ độ dài nhóm (phần tô đậm).`,
  };
}
