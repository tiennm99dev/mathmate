<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatFixed, formatNumber, numTex, texNumber } from '#lib/core/number-format.js';
  import { DECADE, ruleX, scaleMarks, slide } from './engine.js';

  const X0 = 30;
  const FIXED = scaleMarks(2);
  const MOVING = scaleMarks(1);
  const A_COLOR = '#2563eb';
  const B_COLOR = '#ea580c';
  // Labelled marks: the rest are too close together to number at 390 px.
  const LABELS = new Set([1, 2, 3, 5, 10, 20, 30, 50, 100]);

  let a = $state(2);
  let b = $state(3);

  const s = $derived(slide(a, b));
  /** @param {number} v */
  const markText = (v) => formatNumber(v);
  /** @param {number} v a logarithm to four decimals, zeros kept: 0,3010 */
  const four = (v) => texNumber(formatFixed(v, 4));

  const sum = $derived(
    `$\\log ${numTex(a)} \\approx ${four(Math.log10(a))}$, $\\log ${numTex(b)} \\approx ${four(Math.log10(b))}$ và $\\log ${numTex(a)} + \\log ${numTex(b)} = \\log (${numTex(a)} \\cdot ${numTex(b)}) = \\log ${numTex(s.product)} \\approx ${four(Math.log10(s.product))}$.`,
  );
  const read = $derived(
    `Vạch $${numTex(b)}$ của thước trượt đứng trên vạch $${numTex(s.product)}$ của thước cố định: $${numTex(a)} \\cdot ${numTex(b)} = ${numTex(s.product)}$. Thước đo độ dài bằng lôgarit, nên ghép hai đoạn dài $\\log a$ và $\\log b$ được đoạn dài $\\log(ab)$.`,
  );
  const label = $derived(
    `Thước lôgarit: số 1 của thước trượt đặt trên vạch ${markText(a)} của thước cố định; vạch ${markText(b)} của thước trượt chỉ vạch ${markText(s.product)}.`,
  );
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 400 150"
    class="block w-full select-none rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={label}
  >
    <!-- moving scale -->
    <g transform="translate({X0 + s.start} 0)">
      <rect x="0" y="14" width={DECADE} height="40" rx="4" fill="#fef3c7" stroke="#d97706" />
      {#each MOVING as m (m.v)}
        <line x1={ruleX(m.v)} y1="54" x2={ruleX(m.v)} y2={m.major ? 40 : 46} stroke="#92400e" />
        {#if LABELS.has(m.v)}
          <text x={ruleX(m.v)} y="34" font-size="11" text-anchor="middle" fill="#92400e"
            >{markText(m.v)}</text
          >
        {/if}
      {/each}
      <line x1={ruleX(b)} y1="10" x2={ruleX(b)} y2="104" stroke={B_COLOR} stroke-width="2" />
    </g>
    <!-- fixed scale -->
    <rect x={X0} y="56" width={2 * DECADE} height="40" rx="4" fill="#eef2ff" stroke="#4f46e5" />
    {#each FIXED as m (m.v)}
      <line
        x1={X0 + ruleX(m.v)}
        y1="56"
        x2={X0 + ruleX(m.v)}
        y2={m.major ? 70 : 64}
        stroke="#3730a3"
      />
      {#if LABELS.has(m.v)}
        <text x={X0 + ruleX(m.v)} y="86" font-size="11" text-anchor="middle" fill="#3730a3"
          >{markText(m.v)}</text
        >
      {/if}
    {/each}
    <!-- lengths log a and log b -->
    <rect x={X0} y="112" width={s.start} height="10" fill={A_COLOR} />
    <rect x={X0 + s.start} y="112" width={s.at - s.start} height="10" fill={B_COLOR} />
    <text x={X0 + s.start / 2} y="140" font-size="12" text-anchor="middle" fill={A_COLOR}
      >log a</text
    >
    <text x={X0 + (s.start + s.at) / 2} y="140" font-size="12" text-anchor="middle" fill={B_COLOR}
      >log b</text
    >
  </svg>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Số a (đặt số 1 của thước trượt)"
      bind:value={a}
      min={1}
      max={10}
      step={0.5}
    />
    <SliderField label="Số b (đọc trên thước trượt)" bind:value={b} min={1} max={10} step={0.5} />
  </div>

  <FeedbackNote tone="info" text={sum} />
  <FeedbackNote tone="ok" text={read} />
</div>
