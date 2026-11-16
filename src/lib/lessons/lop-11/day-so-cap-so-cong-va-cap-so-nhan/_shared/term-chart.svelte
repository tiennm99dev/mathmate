<script>
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { termText } from './sequence.js';

  /**
   * The first terms of a sequence drawn two ways at once: a column from 0 up
   * (or down) to each term, and the point (n; u_n) at its top. Terms may be
   * negative; an undefined term leaves a gap marked with a cross.
   *
   * - `terms`: u_1, u_2, … (null where undefined).
   * - `title`: what the chart shows, the start of its accessible name.
   * - `highlight`: index (from 0) of a term drawn in the accent colour.
   * - `color`, `accent`: column and point colours.
   * @type {{
   *   terms: Array<number | null>;
   *   title: string;
   *   highlight?: number | null;
   *   color?: string;
   *   accent?: string;
   * }}
   */
  let { terms, title, highlight = null, color = '#4f46e5', accent = '#e11d48' } = $props();

  const W = 420;
  const H = 230;
  const TOP = 14;
  const BOTTOM = 26;
  const RIGHT = 10;

  const values = $derived(/** @type {number[]} */ (terms.filter((t) => t !== null)));
  const axis = $derived(niceAxis(Math.min(0, ...values), Math.max(0, ...values), 4));
  const tickLabels = $derived(axis.ticks.map((t) => formatNumber(t, 3)));
  const left = $derived(14 + 7.5 * Math.max(...tickLabels.map((s) => s.length)));
  const scale = $derived(linear(axis.min, axis.max, H - BOTTOM, TOP));
  /** @param {number} v */
  const y = (v) => scale.map(v);
  const slot = $derived((W - left - RIGHT) / Math.max(1, terms.length));
  const colW = $derived(Math.min(26, slot * 0.55));
  const every = $derived(terms.length > 16 ? 2 : 1);
  /** @param {number} i */
  const cx = (i) => left + slot * (i + 0.5);

  const label = $derived(
    `${title}: ` +
      terms
        .map(
          (t, i) => `số hạng thứ ${i + 1} ${t === null ? 'không xác định' : `bằng ${termText(t)}`}`,
        )
        .join('; '),
  );
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="block w-full select-none rounded-lg border border-slate-200 bg-white"
  role="img"
  aria-label={label}
>
  {#each axis.ticks as t, i (t)}
    <line
      x1={left}
      y1={y(t)}
      x2={W - RIGHT}
      y2={y(t)}
      stroke={t === 0 ? '#64748b' : '#e2e8f0'}
      stroke-width={t === 0 ? 1.5 : 1}
    />
    <text x={left - 6} y={y(t) + 4} font-size="13" text-anchor="end" fill="#475569"
      >{tickLabels[i]}</text
    >
  {/each}
  {#each terms as t, i (i)}
    {@const c = i === highlight ? accent : color}
    {#if t === null}
      <text x={cx(i)} y={y(0) - 6} font-size="14" text-anchor="middle" fill="#94a3b8">×</text>
    {:else}
      <rect
        x={cx(i) - colW / 2}
        y={Math.min(y(t), y(0))}
        width={colW}
        height={Math.max(1, Math.abs(y(t) - y(0)))}
        fill={c}
        opacity="0.25"
        rx="2"
      />
      <circle cx={cx(i)} cy={y(t)} r={i === highlight ? 6 : 4.5} fill={c} />
    {/if}
    {#if i % every === 0 || i === highlight}
      <text x={cx(i)} y={H - 8} font-size="13" text-anchor="middle" fill="#475569">{i + 1}</text>
    {/if}
  {/each}
</svg>
