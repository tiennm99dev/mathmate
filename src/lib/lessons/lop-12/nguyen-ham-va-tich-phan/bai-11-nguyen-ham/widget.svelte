<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { approxTex, approxText } from '../_shared/plot.js';
  import { CASES, FAMILY, passesTarget } from './engine.js';

  const MAIN = '#4f46e5';
  const FAINT = '#a5b4fc';
  const TANGENT = '#d97706';
  const TARGET = '#e11d48';

  let id = $state('linear');
  let C = $state(0);
  let x = $state(0.5);

  const c = $derived(CASES.find((k) => k.id === id) ?? CASES[0]);
  const slope = $derived(c.f(x));
  const hit = $derived(passesTarget(c, C));

  /** @param {string | number} next */
  function choose(next) {
    const k = CASES.find((v) => v.id === next) ?? CASES[0];
    C = 0;
    x = Math.round(((k.lo + k.hi) / 2 + 0.5) * 10) / 10;
  }

  const curves = $derived([
    ...FAMILY.filter((k) => k !== C).map((k) => ({
      f: (/** @type {number} */ t) => c.F(t) + k,
      color: FAINT,
      width: 1.5,
    })),
    { f: (/** @type {number} */ t) => c.F(t) + C, color: MAIN, width: 3 },
  ]);

  /**
   * A short tangent segment of fixed screen length at (x; y) with the given
   * slope, in page coordinates.
   * @param {import('../_shared/plot.js').Frame} fr
   * @param {number} y @param {number} k
   */
  function tangent(fr, y, k) {
    const px = fr.sx(x);
    const py = fr.sy(y);
    const dx = fr.sx(x + 1) - fr.sx(x);
    const dy = fr.sy(y + k) - fr.sy(y);
    const len = Math.hypot(dx, dy) || 1;
    const u = (26 * dx) / len;
    const v = (26 * dy) / len;
    return { x1: px - u, y1: py - v, x2: px + u, y2: py + v };
  }

  const CTex = $derived(C === 0 ? '' : C > 0 ? ` + ${numTex(C)}` : ` - ${numTex(-C)}`);
  const note = $derived(
    `Tại $x = ${numTex(x)}$, mọi đường cong $y = ${c.FTex} + C$ có tiếp tuyến với cùng hệ số góc $(${c.FTex} + C)' = ${c.fTex} ${approxTex(slope, 2)}$: các tiếp tuyến màu cam song song với nhau. Đổi $C$ chỉ tịnh tiến đồ thị theo phương thẳng đứng.`,
  );
  const goal = $derived(
    hit
      ? `Đúng rồi! Với $C = ${numTex(C)}$, đồ thị của $F(x) = ${c.FTex}${CTex}$ đi qua $M(${c.target.xTex}; ${numTex(c.target.y)})$. Đây là nguyên hàm duy nhất của $f$ thoả mãn $F(${c.target.xTex}) = ${numTex(c.target.y)}$.`
      : `Thử thách: kéo thanh $C$ để đồ thị màu tím đi qua điểm $M(${c.target.xTex}; ${numTex(c.target.y)})$. Hiện tại $F(${c.target.xTex}) ${approxTex(c.F(c.target.x) + C, 2)}$.`,
  );
  const label = $derived(
    `Họ đồ thị y = F(x) + C của các nguyên hàm của ${c.label}; đường đậm ứng với C = ${formatNumber(C)}. Tại x = ${formatNumber(x)} các tiếp tuyến cùng hệ số góc ${approxText(slope, 2)}.`,
  );
  const dlabel = $derived(
    `Đồ thị của ${c.label}; tại x = ${formatNumber(x)}, f(x) = ${approxText(slope, 2)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số f"
    options={CASES.map((k) => ({ value: k.id, label: k.label }))}
    bind:value={id}
    onchange={choose}
  />
  <div class="overflow-x-auto text-center">
    <Tex display math={c.ruleTex} />
  </div>
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Hằng số C" bind:value={C} min={-3} max={3} step={0.5} />
    <SliderField label="Hoành độ x" bind:value={x} min={c.lo} max={c.hi} step={0.1} />
  </div>

  <div class="grid gap-3 lg:grid-cols-2">
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">Họ nguyên hàm y = F(x) + C</p>
      <GraphBox
        win={c.win}
        {label}
        {curves}
        lines={[{ c: x, vertical: true, color: '#94a3b8' }]}
        points={[{ x: c.target.x, y: c.target.y, color: TARGET, r: 6, name: 'M' }]}
      >
        {#snippet children(fr)}
          {#each FAMILY.includes(C) ? FAMILY : [...FAMILY, C] as k (k)}
            {@const y = c.F(x) + k}
            {#if y >= c.win.yMin && y <= c.win.yMax}
              <line
                {...tangent(fr, y, slope)}
                stroke={TANGENT}
                stroke-width={k === C ? 3 : 2}
                stroke-linecap="round"
              />
              <circle
                cx={fr.sx(x)}
                cy={fr.sy(y)}
                r={k === C ? 4.5 : 3}
                fill={k === C ? MAIN : FAINT}
              />
            {/if}
          {/each}
        {/snippet}
      </GraphBox>
    </div>
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">Đồ thị của f: f(x) là hệ số góc</p>
      <GraphBox
        win={c.dwin}
        label={dlabel}
        curves={[{ f: c.f, color: '#334155' }]}
        lines={[{ c: x, vertical: true, color: '#94a3b8' }]}
        points={[{ x, y: slope, color: TANGENT, r: 6 }]}
      />
    </div>
  </div>

  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone={hit ? 'ok' : 'info'} text={goal} />
</div>
