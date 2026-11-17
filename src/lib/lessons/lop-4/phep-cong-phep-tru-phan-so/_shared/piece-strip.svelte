<script>
  /**
   * Fraction strips laid one under another, every whole the same length so
   * lengths compare. A row is cut into `d` equal pieces per whole and its
   * shading is a list of coloured runs laid end to end, so a sum shows the
   * pieces of both addends joined on one strip. The last `crossed` shaded
   * pieces of a row are struck through (gạch bớt). A row longer than one
   * whole takes more wholes; the dashed red lines mark 0, 1, 2…
   * @type {{
   *   rows: Array<{
   *     d: number;
   *     runs: Array<{ count: number, color: string }>;
   *     crossed?: number;
   *     text: string;
   *   }>;
   *   label: string;
   * }}
   */
  let { rows, label } = $props();

  const W = 400;
  const LEFT = 8;
  const LABEL_ROOM = 80;
  const ROW = 44;
  const GAP = 18;

  /** @param {{ runs: Array<{ count: number }> }} row */
  const shaded = (row) => row.runs.reduce((s, r) => s + r.count, 0);

  const wholes = $derived(Math.max(1, ...rows.map((r) => Math.ceil(shaded(r) / r.d))));
  const unit = $derived((W - LEFT - LABEL_ROOM) / wholes);
  const height = $derived(rows.length * ROW + (rows.length - 1) * GAP + 28);
  const rowY = (/** @type {number} */ i) => 4 + i * (ROW + GAP);

  /**
   * The colour of piece k of a row, or null when it is not shaded.
   * @param {{ runs: Array<{ count: number, color: string }> }} row
   * @param {number} k
   */
  function colorOf(row, k) {
    let end = 0;
    for (const run of row.runs) {
      end += run.count;
      if (k < end) return run.color;
    }
    return null;
  }
</script>

<svg viewBox="0 0 {W} {height}" class="mx-auto block w-full max-w-md" role="img" aria-label={label}>
  {#each rows as row, i (i)}
    {@const y = rowY(i)}
    {@const total = shaded(row)}
    {@const part = unit / row.d}
    {@const crossFrom = total - (row.crossed ?? 0)}
    {#each { length: wholes * row.d } as _, k (k)}
      {@const color = colorOf(row, k)}
      {@const struck = color !== null && k >= crossFrom}
      <rect
        x={LEFT + k * part}
        {y}
        width={part}
        height={ROW}
        fill={color ?? '#ffffff'}
        fill-opacity={color === null ? 1 : struck ? 0.3 : 0.85}
        stroke="#334155"
        stroke-width="1.5"
      />
      {#if struck}
        <line
          x1={LEFT + k * part + 2}
          y1={y + ROW - 4}
          x2={LEFT + (k + 1) * part - 2}
          y2={y + 4}
          stroke="#b91c1c"
          stroke-width="3"
          stroke-linecap="round"
        />
      {/if}
    {/each}
    {#each { length: wholes } as _, w (w)}
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
