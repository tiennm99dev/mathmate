<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import RegionLayer from '../_shared/region-layer.svelte';
  import { exactText, ineqTex, ineqText, pointText } from '../_shared/half-plane.js';
  import { DEFAULT_PLAN, judgePick, spanOf, systemOf, verticesOf } from './engine.js';

  const COLORS = ['#64748b', '#64748b', '#0f766e', '#4f46e5'];

  let plan = $state({ ...DEFAULT_PLAN });
  /** @type {number | null} */
  let picked = $state(null);

  const span = $derived(spanOf(plan));
  const plane = $derived(planeScale({ xMin: -1, xMax: span, yMin: -1, yMax: span }));
  const labelEvery = $derived(span > 14 ? 5 : span > 7 ? 2 : 1);
  const system = $derived(systemOf(plan));
  const items = $derived(system.map((ineq, i) => ({ ineq, color: COLORS[i] })));
  const vertices = $derived(verticesOf(plan));
  const verdict = $derived(picked === null ? null : judgePick(plan, picked));

  function changed() {
    picked = null;
  }

  function restore() {
    plan = { ...DEFAULT_PLAN };
    picked = null;
  }

  /** @type {Array<{ key: 'a1' | 'b1' | 'c1' | 'a2' | 'b2' | 'c2' | 'p' | 'q', label: string, min: number, max: number }>} */
  const MACHINE_1 = [
    { key: 'a1', label: 'Mỗi sản phẩm A cần (giờ trên máy I)', min: 1, max: 5 },
    { key: 'b1', label: 'Mỗi sản phẩm B cần (giờ trên máy I)', min: 1, max: 5 },
    { key: 'c1', label: 'Máy I chạy tối đa (giờ)', min: 1, max: 20 },
  ];
  /** @type {typeof MACHINE_1} */
  const MACHINE_2 = [
    { key: 'a2', label: 'Mỗi sản phẩm A cần (giờ trên máy II)', min: 1, max: 5 },
    { key: 'b2', label: 'Mỗi sản phẩm B cần (giờ trên máy II)', min: 1, max: 5 },
    { key: 'c2', label: 'Máy II chạy tối đa (giờ)', min: 1, max: 20 },
  ];
  /** @type {typeof MACHINE_1} */
  const PROFIT = [
    { key: 'p', label: 'Lãi mỗi sản phẩm A (triệu đồng)', min: 1, max: 9 },
    { key: 'q', label: 'Lãi mỗi sản phẩm B (triệu đồng)', min: 1, max: 9 },
  ];

  const fTex = $derived(`F = ${plan.p}x + ${plan.q}y`);
  const plotLabel = $derived(
    `Miền nghiệm của hệ x ≥ 0, y ≥ 0, ${ineqText(system[2])}, ${ineqText(system[3])}: đa giác ${vertices.map((v) => `${v.name}${pointText(v.pt)}`).join(', ')}.`,
  );
</script>

{#snippet group(
  /** @type {string} */ title,
  /** @type {typeof MACHINE_1} */ fields,
  /** @type {string} */ tex,
)}
  <fieldset class="min-w-0 space-y-2 rounded-lg border border-slate-200 bg-white p-3">
    <legend class="px-1 text-sm font-semibold text-slate-700">{title}</legend>
    {#each fields as f (f.key)}
      <Stepper
        label={f.label}
        bind:value={plan[f.key]}
        min={f.min}
        max={f.max}
        onchange={changed}
      />
    {/each}
    <p class="text-center"><Tex math={tex} /></p>
  </fieldset>
{/snippet}

<div class="space-y-4">
  <p class="text-sm text-slate-700">
    Một xưởng làm <i>x</i> sản phẩm A và <i>y</i> sản phẩm B mỗi ngày trên hai máy. Nhập số liệu, xem
    miền nghiệm của hệ rồi chọn đỉnh em nghĩ cho tiền lãi lớn nhất.
  </p>
  <div class="grid gap-3 sm:grid-cols-3">
    {@render group('Máy I', MACHINE_1, ineqTex(system[2]))}
    {@render group('Máy II', MACHINE_2, ineqTex(system[3]))}
    {@render group('Tiền lãi', PROFIT, fTex)}
  </div>
  <button type="button" class={button.quiet} onclick={restore}>Về số liệu ban đầu</button>

  <CoordinatePlane {plane} {labelEvery} label={plotLabel} interactive={false}>
    {#snippet children(pl)}
      <RegionLayer plane={pl} {items} region={vertices.map((v) => v.pt)} />
      {#each vertices as v, i (v.name)}
        {@const best = verdict?.best.includes(i)}
        <circle
          cx={pl.mx(v.pt.x)}
          cy={pl.my(v.pt.y)}
          r={best || picked === i ? 6 : 4}
          fill={best ? '#059669' : picked === i ? '#e11d48' : '#0f172a'}
        />
        <text
          x={pl.mx(v.pt.x) + 6}
          y={pl.my(v.pt.y) - 6}
          font-size="12"
          font-weight="700"
          fill="#0f172a"
          style="pointer-events:none">{v.name}</text
        >
      {/each}
    {/snippet}
  </CoordinatePlane>

  <fieldset class="min-w-0">
    <legend class="mb-1 text-sm font-semibold text-slate-700">
      Đỉnh nào cho tiền lãi lớn nhất?
    </legend>
    <div class="flex flex-wrap gap-2">
      {#each vertices as v, i (v.name)}
        <button
          type="button"
          class="min-h-11 rounded-lg border px-3 py-1 font-semibold {focusRing} {picked === i
            ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}"
          aria-pressed={picked === i}
          onclick={() => (picked = i)}
        >
          {v.name}{pointText(v.pt)}
        </button>
      {/each}
    </div>
  </fieldset>

  {#if verdict}
    <FeedbackNote tone={verdict.tone} text={verdict.text} />
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <caption class="mb-1 text-left text-slate-600">Tiền lãi F (triệu đồng) tại các đỉnh</caption
        >
        <thead>
          <tr class="border-b border-slate-300 text-left">
            <th class="py-1 pr-3">Đỉnh</th>
            <th class="py-1">F</th>
          </tr>
        </thead>
        <tbody>
          {#each vertices as v, i (v.name)}
            <tr
              class="border-b border-slate-100 {verdict.best.includes(i)
                ? 'font-semibold text-emerald-800'
                : ''}"
            >
              <td class="py-1 pr-3">{v.name}{pointText(v.pt)}</td>
              <td class="py-1 tabular-nums">{exactText(verdict.values[i])}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <FeedbackNote
      tone="info"
      text="Phần không bị gạch là miền nghiệm. Chọn một đỉnh để kiểm tra."
    />
  {/if}
</div>
