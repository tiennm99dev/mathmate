<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { MAX_SHIFT, STATEMENTS, WINDOW, dominoState, fallsTo, verdict } from './engine.js';

  let id = $state(STATEMENTS[0].id);
  let baseShown = $state(false);
  let stepShown = $state(false);
  let pushed = $state(false);
  let from = $state(1);
  /** @type {number | null} */
  let picked = $state(null);

  const s = $derived(STATEMENTS.find((x) => x.id === id) ?? STATEMENTS[0]);
  const ns = $derived(Array.from({ length: WINDOW }, (_, i) => from + i));
  const verdictTone = $derived(!pushed ? 'info' : fallsTo(s) === Infinity ? 'ok' : 'warn');
  const pickedCheck = $derived(picked === null ? null : s.check(picked));

  function reset() {
    baseShown = false;
    stepShown = false;
    pushed = false;
    from = 1;
    picked = null;
  }

  /** @param {'before' | 'down' | 'up'} state */
  const stateWord = (state) =>
    state === 'before' ? 'nằm ngoài mệnh đề' : state === 'down' ? 'đã đổ' : 'đang đứng';
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mệnh đề P(n)"
    options={STATEMENTS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={reset}
  />

  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
    <Tex math={`P(n):\\ ${s.tex}`} display />
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div class="space-y-2 rounded-xl border border-slate-200 p-3">
      <p class="text-sm font-semibold text-slate-700">Bước 1. Bước cơ sở: n = {s.start}</p>
      {#if baseShown}
        <p class="text-sm text-slate-800" aria-live="polite"><LiveRichText text={s.base} /></p>
      {:else}
        <button type="button" class={button.secondary} onclick={() => (baseShown = true)}>
          Kiểm tra P({s.start})
        </button>
      {/if}
    </div>
    <div class="space-y-2 rounded-xl border border-slate-200 p-3">
      <p class="text-sm font-semibold text-slate-700">Bước 2. Bước quy nạp: P(k) ⇒ P(k + 1)</p>
      {#if stepShown}
        <p class="text-sm text-slate-800" aria-live="polite"><LiveRichText text={s.step} /></p>
      {:else}
        <button type="button" class={button.secondary} onclick={() => (stepShown = true)}>
          Xem bước quy nạp
        </button>
      {/if}
    </div>
  </div>

  <div class="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <Stepper
        label="Khung bắt đầu từ quân số"
        bind:value={from}
        min={1}
        max={s.start + MAX_SHIFT}
      />
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class={button.primary}
          disabled={pushed}
          onclick={() => (pushed = true)}
        >
          Đẩy quân số {s.start}
        </button>
        <button type="button" class={button.quiet} onclick={() => (pushed = false)}>
          Dựng lại
        </button>
      </div>
    </div>

    <div
      class="flex items-end justify-center gap-1 pt-2"
      role="group"
      aria-label="Dây domino, quân số {from} đến {from + WINDOW - 1}"
    >
      {#each ns as n, i (n)}
        {@const state = dominoState(s, n, pushed)}
        <button
          type="button"
          class="flex h-28 w-11 shrink-0 flex-col items-center justify-end rounded-lg {picked === n
            ? 'bg-indigo-50'
            : ''} {focusRing}"
          aria-pressed={picked === n}
          aria-label="Quân domino số {n}, {stateWord(state)}"
          onclick={() => (picked = n)}
        >
          <span
            class="pointer-events-none block h-16 w-4 origin-bottom-right rounded-sm border-2 transition-transform duration-300 motion-reduce:transition-none {state ===
            'before'
              ? 'border-dashed border-slate-300 bg-slate-100'
              : state === 'down'
                ? 'rotate-[70deg] border-emerald-700 bg-emerald-500'
                : 'border-indigo-800 bg-indigo-600'}"
            style="transition-delay: {state === 'down' ? i * 120 : 0}ms"
            aria-hidden="true"
          ></span>
          <span class="mt-2 text-sm font-semibold tabular-nums text-slate-700">{n}</span>
        </button>
      {/each}
      <span class="pb-6 text-lg font-bold text-slate-500" aria-hidden="true">…</span>
    </div>
    <p class="text-xs text-slate-600">
      Chạm vào một quân để kiểm tra P(n) với số n đó. Quân viền đứt nằm trước n₀ nên không thuộc
      mệnh đề.
    </p>
  </div>

  {#if picked !== null && pickedCheck}
    <FeedbackNote
      tone={pickedCheck.ok ? 'ok' : 'warn'}
      text={`$P(${picked})$: ${pickedCheck.text}. ${pickedCheck.ok ? 'Đúng.' : 'Sai.'}`}
    />
  {/if}
  <FeedbackNote tone={verdictTone} text={verdict(s, pushed)} />
</div>
