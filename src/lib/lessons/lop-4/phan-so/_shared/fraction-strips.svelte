<script>
  /**
   * Fraction strips stacked to compare: every whole has the same length, cut
   * into `d` equal parts, and `n` parts are shaded. A fraction greater than 1
   * takes more than one whole, so 9/7 shows as a full strip and 2 parts of a
   * second one, and its shading runs past the line marked 1. Equal lengths
   * of shading mean equal fractions.
   * @type {{
   *   rows: Array<{ n: number, d: number, text: string, color?: string }>;
   *   label: string;
   * }}
   */
  let { rows, label } = $props();

  const W = 400;
  const LEFT = 8;
  const LABEL_ROOM = 72;
  const ROW = 44;
  const GAP = 18;
  const COLORS = ['#6366f1', '#f59e0b'];

  const wholes = $derived(Math.max(1, ...rows.map((r) => Math.ceil(r.n / r.d))));
  const unit = $derived((W - LEFT - LABEL_ROOM) / wholes);
  const height = $derived(rows.length * ROW + (rows.length - 1) * GAP + 28);
  const rowY = (/** @type {number} */ i) => 4 + i * (ROW + GAP);
</script>

<svg viewBox="0 0 {W} {height}" class="mx-auto block w-full max-w-md" role="img" aria-label={label}>
  {#each rows as row, i (i)}
    {@const y = rowY(i)}
    {@const count = Math.max(1, Math.ceil(row.n / row.d))}
    {@const part = unit / row.d}
    {#each { length: count * row.d } as _, k (k)}
      <rect
        x={LEFT + k * part}
        {y}
        width={part}
        height={ROW}
        fill={k < row.n ? (row.color ?? COLORS[i % COLORS.length]) : '#ffffff'}
        fill-opacity={k < row.n ? 0.85 : 1}
        stroke="#334155"
        stroke-width="1.5"
      />
    {/each}
    {#each { length: count } as _, w (w)}
      <rect
        x={LEFT + w * unit}
        {y}
        width={unit}
        height={ROW}
        fill="none"
        stroke="#0f172a"
        stroke-width="3.5"
      />
    {/each}
    <text
      x={W - LABEL_ROOM + 10}
      y={y + ROW / 2 + 8}
      font-size="22"
      font-weight="700"
      fill="#1e293b">{row.text}</text
    >
  {/each}
  {#each { length: wholes + 1 } as _, w (w)}
    {@const x = LEFT + w * unit}
    <line
      x1={x}
      x2={x}
      y1="0"
      y2={height - 22}
      stroke="#dc2626"
      stroke-width="2"
      stroke-dasharray="5 4"
    />
    <text {x} y={height - 4} font-size="18" font-weight="700" text-anchor="middle" fill="#dc2626"
      >{w}</text
    >
  {/each}
</svg>
