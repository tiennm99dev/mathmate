<script>
  import { formatNumber, tidy } from '#lib/core/number-format.js';
  import { LEAVES } from './conditional.js';

  /**
   * The two-level probability tree of a hypothesis A and an observation B:
   * the first branches carry P(A) and P(Ā), the second P(B|A), P(B̄|A),
   * P(B|Ā) and P(B̄|Ā), and each leaf the product along its path. A branch
   * given as null shows "?" and its leaves stay blank, so a learner can fill
   * the tree in step by step. Leaves in `marked` are shaded.
   * @type {{
   *   pA: number | null;
   *   pBA: number | null;
   *   pBnA: number | null;
   *   marked?: import('./conditional.js').Leaf[];
   *   format?: (p: number) => string;
   * }}
   */
  let { pA, pBA, pBnA, marked = [], format = (p) => formatNumber(tidy(p, 9), 6) } = $props();

  const show = (/** @type {number | null} */ p) => (p === null ? '?' : format(p));
  const comp = (/** @type {number | null} */ p) => (p === null ? null : tidy(1 - p, 12));

  const root = { x: 16, y: 115 };
  const mids = $derived([
    { x: 118, y: 60, label: 'A', p: pA, given: pBA },
    { x: 118, y: 170, label: 'Ā', p: comp(pA), given: pBnA },
  ]);
  const leafY = [25, 85, 145, 205];

  /** Branch labels: about 13 px on screen even when the tree is 390 px wide. */
  const LABEL_SIZE = 15;

  /**
   * Where a branch label goes: ending at `x`, just clear of its line, above a
   * line that rises to the right and below one that falls, so the text never
   * sits on the line.
   * @param {{ x: number; y: number }} from
   * @param {{ x: number; y: number }} to
   * @param {number} x
   */
  function labelAt(from, to, x) {
    const y = from.y + ((to.y - from.y) * (x - from.x)) / (to.x - from.x);
    return { x, y: to.y < from.y ? y - 4 : y + LABEL_SIZE + 2 };
  }
  const shaded = $derived(new Set(marked));

  /**
   * @param {number | null} first
   * @param {number | null} second
   */
  const product = (first, second) =>
    first === null || second === null ? null : tidy(first * second, 12);

  const leaves = $derived(
    LEAVES.map((l, k) => {
      const m = mids[l.a ? 0 : 1];
      const branch = l.b ? m.given : comp(m.given);
      return { ...l, y: leafY[k], branch, p: product(m.p, branch), from: m };
    }),
  );

  const label = $derived(
    `Sơ đồ cây. Nhánh A: ${show(pA)}, nhánh Ā: ${show(comp(pA))}. ` +
      leaves
        .map(
          (l) =>
            `Lá ${l.text}: nhánh ${l.b ? 'B' : 'B̄'} ${show(l.branch)}, xác suất ${show(l.p)}${shaded.has(l.id) ? ', được tô' : ''}`,
        )
        .join('; ') +
      '.',
  );
</script>

<svg
  viewBox="0 0 360 230"
  class="mx-auto block w-full max-w-md rounded-lg border border-slate-200 bg-white"
  role="img"
  aria-label={label}
>
  {#each mids as m (m.label)}
    <line x1={root.x} y1={root.y} x2={m.x} y2={m.y} stroke="#475569" stroke-width="1.5" />
    {@const at = labelAt(root, m, m.x - 20)}
    <text x={at.x} y={at.y} font-size={LABEL_SIZE} fill="#0369a1" text-anchor="end"
      >{show(m.p)}</text
    >
    <circle cx={m.x} cy={m.y} r="13" fill="#e0f2fe" stroke="#0369a1" />
    <text x={m.x} y={m.y + 5} font-size="14" font-weight="700" text-anchor="middle" fill="#0c4a6e"
      >{m.label}</text
    >
  {/each}
  {#each leaves as l (l.id)}
    <line
      x1={l.from.x + 13}
      y1={l.from.y}
      x2="226"
      y2={l.y}
      stroke={shaded.has(l.id) ? '#059669' : '#94a3b8'}
      stroke-width={shaded.has(l.id) ? 2.5 : 1.5}
    />
    {@const at = labelAt({ x: l.from.x + 13, y: l.from.y }, { x: 226, y: l.y }, 222)}
    <text x={at.x} y={at.y} font-size={LABEL_SIZE} fill="#b45309" text-anchor="end"
      >{l.b ? 'B' : 'B̄'} {show(l.branch)}</text
    >
    <rect
      x="228"
      y={l.y - 14}
      width="128"
      height="28"
      rx="6"
      fill={shaded.has(l.id) ? '#a7f3d0' : '#f1f5f9'}
      stroke={shaded.has(l.id) ? '#059669' : '#cbd5e1'}
    />
    <text x="235" y={l.y + 5} font-size={LABEL_SIZE} font-weight="700" fill="#1e293b">{l.text}</text
    >
    <text x="350" y={l.y + 5} font-size={LABEL_SIZE} text-anchor="end" fill="#1e293b"
      >{show(l.p)}</text
    >
  {/each}
  <circle cx={root.x} cy={root.y} r="5" fill="#334155" />
</svg>
