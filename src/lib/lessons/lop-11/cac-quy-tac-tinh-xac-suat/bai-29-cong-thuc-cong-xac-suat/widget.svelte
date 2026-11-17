<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { N, cells, checkUnion, fitOverlap, formulaText, overlapRange } from './engine.js';

  let nA = $state(70);
  let nB = $state(50);
  let nAB = $state(30);
  let doubled = $state(false);
  let typed = $state('');
  let checked = $state(false);
  let shown = $state(false);
  const inputId = $props.id();

  const range = $derived(overlapRange(nA, nB));
  const grid = $derived(cells(nA, nB, nAB));
  const union = $derived(nA + nB - nAB);
  const feedback = $derived(checkUnion(typed, nA, nB, nAB));

  function changed() {
    nAB = fitOverlap(nA, nB, nAB);
    checked = false;
    shown = false;
  }

  const FILL = {
    onlyA: 'bg-sky-300',
    both: 'bg-violet-400',
    onlyB: 'bg-amber-300',
    neither: 'bg-slate-100',
  };

  /** @param {number} k */
  const pct = (k) => formatNumber(k / N);
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-600">
    Một khu phố có {N} gia đình; chọn ngẫu nhiên một gia đình. <i>A</i>: "Gia đình có ti vi",
    <i>B</i>: "Gia đình có máy vi tính". Mỗi ô là một gia đình, nên xác suất của một biến cố bằng số
    ô của nó chia cho {N}: diện tích tỉ lệ với xác suất.
  </p>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Số gia đình có ti vi, n(A)"
      bind:value={nA}
      min={0}
      max={N}
      oninput={(v) => {
        nA = v;
        changed();
      }}
    />
    <SliderField
      label="Số gia đình có máy vi tính, n(B)"
      bind:value={nB}
      min={0}
      max={N}
      oninput={(v) => {
        nB = v;
        changed();
      }}
    />
    <SliderField
      label="Số gia đình có cả hai, n(AB)"
      bind:value={nAB}
      min={range.min}
      max={range.max}
      oninput={() => {
        checked = false;
        shown = false;
      }}
    />
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      aria-pressed={doubled}
      onclick={() => (doubled = !doubled)}
    >
      {doubled ? 'Ẩn cách đếm P(A) + P(B)' : 'Đếm P(A) + P(B)'}
    </button>
    <button
      type="button"
      class={button.quiet}
      disabled={range.min > 0 || nAB === 0}
      onclick={() => {
        nAB = 0;
        checked = false;
        shown = false;
      }}
    >
      Cho A, B xung khắc
    </button>
  </div>

  <div
    class="mx-auto grid max-w-sm grid-cols-10 gap-0.5 rounded-lg border border-slate-200 bg-white p-1"
    role="img"
    aria-label="{N} gia đình: {nA - nAB} chỉ có ti vi, {nAB} có cả hai, {nB -
      nAB} chỉ có máy vi tính, {N - union} không có thứ nào"
  >
    {#each grid as r, i (i)}
      <div
        class="flex aspect-square items-center justify-center rounded-sm text-[0.65rem] font-bold text-violet-950 {FILL[
          r
        ]}"
      >
        {doubled && r === 'both' ? '2' : ''}
      </div>
    {/each}
  </div>
  <p class="flex flex-wrap justify-center gap-3 text-xs text-slate-600">
    <span><span class="inline-block size-3 rounded bg-sky-300"></span> chỉ có ti vi</span>
    <span
      ><span class="inline-block size-3 rounded bg-violet-400"></span> có cả hai (<i>AB</i>)</span
    >
    <span><span class="inline-block size-3 rounded bg-amber-300"></span> chỉ có máy vi tính</span>
    <span><span class="inline-block size-3 rounded bg-slate-100"></span> không có thứ nào</span>
  </p>

  <div class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-lg bg-sky-50 px-2 py-2">
      P(A) = <strong class="tabular-nums">{pct(nA)}</strong>
    </div>
    <div class="rounded-lg bg-amber-50 px-2 py-2">
      P(B) = <strong class="tabular-nums">{pct(nB)}</strong>
    </div>
    <div class="rounded-lg bg-violet-50 px-2 py-2">
      P(AB) = <strong class="tabular-nums">{pct(nAB)}</strong>
    </div>
  </div>
  {#if doubled}
    <p class="rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-900" aria-live="polite">
      <LiveRichText
        text={`Đếm các ô của $A$ rồi các ô của $B$: được $${nA} + ${nB} = ${nA + nB}$ ô, nhưng $${nAB}$ ô tím (đánh số $2$) bị đếm hai lần. Số ô thuộc $A \\cup B$ là $${nA} + ${nB} - ${nAB} = ${union}$.`}
      />
    </p>
  {/if}

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      checked = true;
    }}
  >
    <label for={inputId} class="w-full text-sm font-semibold text-slate-700">
      Em hãy tính P(A ∪ B), xác suất gia đình được chọn có ti vi hoặc có máy vi tính:
    </label>
    <input
      id={inputId}
      class="{textInput} max-w-40"
      inputmode="decimal"
      autocomplete="off"
      bind:value={typed}
      oninput={() => (checked = false)}
    />
    <button type="submit" class={button.primary}>Kiểm tra</button>
    <button
      type="button"
      class="{button.secondary} {focusRing}"
      onclick={() => (shown = !shown)}
      aria-expanded={shown}
    >
      {shown ? 'Ẩn công thức' : 'Xem công thức'}
    </button>
  </form>
  {#if checked}
    <FeedbackNote tone={feedback.tone} text={feedback.text} />
  {/if}
  {#if shown}
    <FeedbackNote tone="info" text={formulaText(nA, nB, nAB)} />
  {/if}
</div>
