<script>
  import { niceAxis } from '#lib/stats-engine/ticks.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { groupText } from '#lib/stats-engine/grouped.js';

  /**
   * The frequency chart of a grouped sample: one column per group, standing
   * side by side over its interval on a number axis, so a value inside a
   * group has a place along the bottom.
   *
   * - `groups`: the groups and their frequencies.
   * - `title`: what the chart shows, the start of its accessible name.
   * - `unit`: the unit of the values, written after the axis ('cm').
   * - `highlight`: index of a group drawn in the accent colour.
   * - `shade`: `{ index, fraction }` darkens the left `fraction` of a column,
   *   the part of the group's values that lies below a quartile.
   * - `markers`: `{ x, label, color }` vertical lines at estimated values;
   *   `label` is the whole caption, such as 'Mₑ ≈ 53,44'.
   * - `modeIndex`: draws the two crossing lines inside that column whose
   *   meeting point is the mode.
   * - `midpoints`: a dot at the middle of each column top (giá trị đại diện).
   * @type {{
   *   groups: import('#lib/stats-engine/grouped.js').Group[];
   *   title: string;
   *   unit?: string;
   *   highlight?: number | null;
   *   shade?: { index: number, fraction: number } | null;
   *   markers?: Array<{ x: number, label: string, color: string }>;
   *   modeIndex?: number | null;
   *   midpoints?: boolean;
   * }}
   */
  let {
    groups,
    title,
    unit = '',
    highlight = null,
    shade = null,
    markers = [],
    modeIndex = null,
    midpoints = false,
  } = $props();

  const W = 360;
  const H = 240;
  const LEFT = 34;
  const RIGHT = 14;
  const BOTTOM = 40;
  const TOP = $derived(20 + 14 * Math.max(0, markers.length - 1));

  const lo = $derived(groups[0]?.lo ?? 0);
  const hi = $derived(groups.at(-1)?.hi ?? 1);
  const axis = $derived(niceAxis(0, Math.max(4, ...groups.map((g) => g.count)), 4));
  const sx = $derived(linear(lo, hi, LEFT, W - RIGHT));
  const sy = $derived(linear(0, axis.max, H - BOTTOM, TOP));
  /** @param {number} v */
  const x = (v) => sx.map(v);
  /** @param {number} v */
  const y = (v) => sy.map(v);
  const every = $derived(groups.length > 12 ? 3 : groups.length > 7 ? 2 : 1);

  const label = $derived(
    `${title}. ` +
      groups.map((g) => `Nhóm ${groupText(g)}: tần số ${g.count}`).join('; ') +
      (markers.length ? `. ${markers.map((m) => m.label).join('; ')}` : ''),
  );

  const mode = $derived.by(() => {
    if (modeIndex === null || !groups[modeIndex]) return null;
    const g = groups[modeIndex];
    const prev = groups[modeIndex - 1]?.count ?? 0;
    const next = groups[modeIndex + 1]?.count ?? 0;
    return [
      { x1: x(g.hi), y1: y(g.count), x2: x(g.lo), y2: y(prev) },
      { x1: x(g.lo), y1: y(g.count), x2: x(g.hi), y2: y(next) },
    ];
  });
</script>

<svg
  viewBox="0 0 {W} {H}"
  class="block w-full select-none rounded-lg border border-slate-200 bg-white"
  role="img"
  aria-label={label}
>
  {#each axis.ticks as t (t)}
    <line x1={LEFT} y1={y(t)} x2={W - RIGHT} y2={y(t)} stroke="#e2e8f0" />
    <text x={LEFT - 5} y={y(t) + 4} font-size="12" text-anchor="end" fill="#475569">{t}</text>
  {/each}

  {#each groups as g, i (i)}
    {@const on = i === highlight}
    <rect
      x={x(g.lo)}
      y={y(g.count)}
      width={Math.max(0, x(g.hi) - x(g.lo))}
      height={Math.max(0, y(0) - y(g.count))}
      fill={on ? '#fde68a' : '#c7d2fe'}
      stroke={on ? '#b45309' : '#4f46e5'}
      stroke-width={on ? 2 : 1}
    />
    {#if shade && shade.index === i && g.count > 0}
      <rect
        x={x(g.lo)}
        y={y(g.count)}
        width={Math.max(0, (x(g.hi) - x(g.lo)) * shade.fraction)}
        height={Math.max(0, y(0) - y(g.count))}
        fill="#f59e0b"
        opacity="0.55"
      />
    {/if}
    {#if g.count > 0}
      <text
        x={(x(g.lo) + x(g.hi)) / 2}
        y={y(g.count) - 4}
        font-size="12"
        text-anchor="middle"
        fill="#1e293b">{g.count}</text
      >
    {/if}
    {#if midpoints && g.count > 0}
      <circle cx={(x(g.lo) + x(g.hi)) / 2} cy={y(0)} r="4" fill="#0f766e" />
    {/if}
  {/each}

  {#if mode}
    {#each mode as l, i (i)}
      <line {...l} stroke="#be123c" stroke-width="1.6" />
    {/each}
  {/if}

  <line x1={LEFT} y1={y(0)} x2={W - RIGHT} y2={y(0)} stroke="#475569" stroke-width="1.5" />
  {#each groups as g, i (i)}
    {#if i % every === 0}
      <text x={x(g.lo)} y={y(0) + 15} font-size="12" text-anchor="middle" fill="#475569"
        >{formatNumber(g.lo)}</text
      >
    {/if}
  {/each}
  {#if groups.length % every === 0}
    <text x={x(hi)} y={y(0) + 15} font-size="12" text-anchor="middle" fill="#475569"
      >{formatNumber(hi)}</text
    >
  {/if}
  {#if unit}
    <text x={W - RIGHT} y={H - 6} font-size="12" text-anchor="end" fill="#64748b">({unit})</text>
  {/if}

  {#each markers as m, i (i)}
    <line
      x1={x(m.x)}
      y1={y(0)}
      x2={x(m.x)}
      y2={10 + 14 * i}
      stroke={m.color}
      stroke-width="2"
      stroke-dasharray="5 3"
    />
    {@const flip = x(m.x) > W / 2}
    <text
      x={x(m.x) + (flip ? -4 : 4)}
      y={12 + 14 * i}
      font-size="12"
      font-weight="600"
      text-anchor={flip ? 'end' : 'start'}
      fill={m.color}>{m.label}</text
    >
  {/each}
</svg>
