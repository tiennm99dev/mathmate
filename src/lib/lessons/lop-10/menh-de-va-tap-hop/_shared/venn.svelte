<script>
  /**
   * A Venn diagram of two sets inside a universe, with chosen regions shaded.
   *
   * - `shade`: which regions are coloured: `a` (only in A), `both`, `b`
   *   (only in B) and `out` (in neither).
   * - `names`: the two set names and the universe's (`['A', 'B', 'E']`).
   * - `nested`: draw A inside B (A ⊂ B); `a` and `out` keep their meaning
   *   and `b` is the ring of B outside A.
   * - `items`: elements written in each region, for finite sets.
   * - `label`: what screen readers hear.
   * @type {{
   *   shade: { a?: boolean, both?: boolean, b?: boolean, out?: boolean };
   *   names?: [string, string, string];
   *   nested?: boolean;
   *   items?: { a?: string[], both?: string[], b?: string[], out?: string[] };
   *   label: string;
   * }}
   */
  let { shade, names = ['A', 'B', 'E'], nested = false, items = {}, label } = $props();

  const uid = $props.id();
  /** @type {Array<'a' | 'both' | 'b' | 'out'>} */
  const KEYS = ['a', 'both', 'b', 'out'];
  const FILL = '#6366f1';
  const W = 320;
  const H = 190;
  const A = $derived(nested ? { cx: 160, cy: 104, r: 44 } : { cx: 128, cy: 98, r: 62 });
  const B = $derived(nested ? { cx: 160, cy: 98, r: 78 } : { cx: 204, cy: 98, r: 62 });
  /** Where each region's elements are written. */
  const spots = $derived(
    nested
      ? { a: [160, 108], both: [160, 108], b: [160, 42], out: [30, 176] }
      : { a: [98, 102], both: [166, 102], b: [234, 102], out: [30, 176] },
  );
</script>

<svg viewBox="0 0 {W} {H}" class="mx-auto block w-full max-w-sm" role="img" aria-label={label}>
  <defs>
    <clipPath id="{uid}-a"><circle cx={A.cx} cy={A.cy} r={A.r} /></clipPath>
    <mask id="{uid}-not-b">
      <rect width={W} height={H} fill="white" /><circle cx={B.cx} cy={B.cy} r={B.r} fill="black" />
    </mask>
    <mask id="{uid}-not-a">
      <rect width={W} height={H} fill="white" /><circle cx={A.cx} cy={A.cy} r={A.r} fill="black" />
    </mask>
    <mask id="{uid}-out">
      <rect width={W} height={H} fill="white" />
      <circle cx={A.cx} cy={A.cy} r={A.r} fill="black" />
      <circle cx={B.cx} cy={B.cy} r={B.r} fill="black" />
    </mask>
  </defs>
  <rect x="4" y="4" width={W - 8} height={H - 8} rx="10" fill="#f8fafc" stroke="#64748b" />
  {#if shade.out}
    <rect
      x="4"
      y="4"
      width={W - 8}
      height={H - 8}
      rx="10"
      fill={FILL}
      fill-opacity="0.35"
      mask="url(#{uid}-out)"
    />
  {/if}
  {#if shade.a && !nested}
    <circle cx={A.cx} cy={A.cy} r={A.r} fill={FILL} fill-opacity="0.45" mask="url(#{uid}-not-b)" />
  {/if}
  {#if shade.both || (nested && shade.a)}
    <circle cx={B.cx} cy={B.cy} r={B.r} fill={FILL} fill-opacity="0.6" clip-path="url(#{uid}-a)" />
  {/if}
  {#if shade.b}
    <circle cx={B.cx} cy={B.cy} r={B.r} fill={FILL} fill-opacity="0.45" mask="url(#{uid}-not-a)" />
  {/if}
  <circle cx={A.cx} cy={A.cy} r={A.r} fill="none" stroke="#be123c" stroke-width="2.5" />
  <circle cx={B.cx} cy={B.cy} r={B.r} fill="none" stroke="#0f766e" stroke-width="2.5" />
  <text
    x={nested ? A.cx - 8 : A.cx - A.r + 4}
    y={nested ? A.cy - A.r + 26 : 30}
    font-size="17"
    font-weight="700"
    fill="#be123c">{names[0]}</text
  >
  <text
    x={nested ? B.cx + B.r - 22 : B.cx + B.r - 18}
    y="30"
    font-size="17"
    font-weight="700"
    fill="#0f766e">{names[1]}</text
  >
  <text x={W - 26} y={H - 14} font-size="17" font-weight="700" fill="#334155">{names[2]}</text>
  {#each KEYS as key (key)}
    {#if items[key]?.length}
      <text
        x={spots[key][0]}
        y={spots[key][1]}
        text-anchor={key === 'out' ? 'start' : 'middle'}
        font-size="16"
        fill="#0f172a">{items[key]?.join('; ')}</text
      >
    {/if}
  {/each}
</svg>
