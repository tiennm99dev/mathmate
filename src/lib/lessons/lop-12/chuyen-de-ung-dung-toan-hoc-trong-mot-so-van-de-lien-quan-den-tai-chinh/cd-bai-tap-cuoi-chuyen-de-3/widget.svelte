<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { SCENARIOS, compareText, judge, winner } from './engine.js';

  let id = $state(SCENARIOS[0].id);
  /** @type {0 | 1 | null} */
  let pick = $state(null);
  let x = $state(SCENARIOS[0].param.start);

  const s = $derived(SCENARIOS.find((c) => c.id === id) ?? SCENARIOS[0]);
  const outcomes = $derived(s.compute(x));
  const best = $derived(winner(s, x));
  const verdict = $derived(pick === null ? null : judge(s, pick));

  /** @param {string | number} value */
  function choose(value) {
    const next = SCENARIOS.find((c) => c.id === value) ?? SCENARIOS[0];
    pick = null;
    x = next.param.start;
  }

  /** @param {0 | 1} k */
  function answer(k) {
    pick = k;
    x = s.param.start;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    bind:value={id}
    onchange={choose}
    options={SCENARIOS.map((c) => ({ value: c.id, label: c.label }))}
  />
  <p class="text-sm text-slate-700"><LiveRichText text={s.story} /></p>
  <p class="text-sm font-semibold text-slate-800">
    <LiveRichText text={`Phương án nào có lợi hơn (so sánh ${s.measure})?`} />
  </p>

  <div class="grid gap-3 sm:grid-cols-2">
    {#each s.options as option, k (k)}
      {@const kk = k === 0 ? 0 : 1}
      <button
        type="button"
        class="min-h-11 rounded-xl border-2 p-3 text-left text-sm transition {focusRing} {pick ===
        kk
          ? 'border-indigo-600 bg-indigo-50'
          : 'border-slate-200 bg-white hover:border-indigo-300'}"
        aria-pressed={pick === kk}
        onclick={() => answer(kk)}
      >
        <LiveRichText text={option} />
        {#if pick !== null}
          <span class="mt-2 block border-t border-slate-200 pt-2 text-slate-700">
            <LiveRichText text={`${outcomes[k].tex} (triệu đồng)`} />
          </span>
          {#if best === kk}
            <span class="mt-1 block font-semibold text-emerald-700">Có lợi hơn</span>
          {/if}
        {/if}
      </button>
    {/each}
  </div>

  {#if verdict}
    <FeedbackNote tone={verdict.tone} text={verdict.text} />
    <SliderField
      label={s.param.label}
      bind:value={x}
      min={s.param.min}
      max={s.param.max}
      step={s.param.step}
      unit={s.param.unit}
      format={(v) => formatNumber(v, 2)}
    />
    <p class="text-sm text-slate-700" aria-live="polite">
      <LiveRichText text={`Thử kéo thanh trượt. ${compareText(s, x)}`} />
    </p>
  {:else}
    <p class="text-sm text-slate-500">Chọn một phương án để xem lời giải.</p>
  {/if}
</div>
