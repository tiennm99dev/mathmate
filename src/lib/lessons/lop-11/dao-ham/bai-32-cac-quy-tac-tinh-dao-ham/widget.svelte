<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { PRESETS, RULES, WHY, derive, stepsOf, tex } from './engine.js';

  /** @typedef {import('./engine.js').RuleId} RuleId */

  /** Tailwind colours per rule: the tag on a step and the lit rule card. */
  /** @type {Record<RuleId, { tag: string, card: string }>} */
  const TONE = {
    basic: { tag: 'bg-teal-100 text-teal-900', card: 'border-teal-500 bg-teal-50' },
    const: { tag: 'bg-violet-100 text-violet-900', card: 'border-violet-500 bg-violet-50' },
    sum: { tag: 'bg-blue-100 text-blue-900', card: 'border-blue-500 bg-blue-50' },
    product: { tag: 'bg-orange-100 text-orange-900', card: 'border-orange-500 bg-orange-50' },
    quotient: { tag: 'bg-pink-100 text-pink-900', card: 'border-pink-500 bg-pink-50' },
    chain: { tag: 'bg-emerald-100 text-emerald-900', card: 'border-emerald-500 bg-emerald-50' },
  };
  const NAME = /** @type {Record<RuleId, string>} */ (
    Object.fromEntries(RULES.map((r) => [r.id, r.name]))
  );

  let id = $state('poly');
  let shown = $state(0);
  let picked = $state(/** @type {RuleId | null} */ (null));
  let score = $state(0);

  const preset = $derived(PRESETS.find((p) => p.id === id) ?? PRESETS[0]);
  const steps = $derived(stepsOf(preset.expr));
  const current = $derived(shown < steps.length ? steps[shown] : null);
  const lit = $derived(shown > 0 ? steps[shown - 1].rule : null);
  const raw = $derived(tex(derive(preset.expr)));

  const message = $derived.by(() => {
    if (current === null)
      return `Xong! Em chọn đúng quy tắc ngay lần đầu ở ${score}/${steps.length} bước. Thay các kết quả vào và rút gọn để được đạo hàm.`;
    if (picked === null)
      return `Cần tính $${current.target}$. Phép toán (hay hàm số) nào nằm ngoài cùng? Chọn quy tắc phù hợp.`;
    return `Chưa đúng: "${NAME[picked]}" không áp dụng ở đây. ${WHY[current.rule]}`;
  });
  const tone = $derived(current === null ? 'ok' : picked === null ? 'info' : 'warn');

  /** @param {RuleId} rule */
  function choose(rule) {
    if (current === null) return;
    if (rule === current.rule) {
      if (picked === null) score += 1;
      picked = null;
      shown += 1;
    } else picked = rule;
  }

  function reveal() {
    if (current === null) return;
    picked = null;
    shown += 1;
  }

  function reset() {
    shown = 0;
    picked = null;
    score = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số cần tính đạo hàm"
    options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
    bind:value={id}
    onchange={reset}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={`y = ${tex(preset.expr)}`} />
  </div>

  <fieldset>
    <legend class="mb-1 text-sm font-semibold text-slate-700">Quy tắc áp dụng ở bước này</legend>
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {#each RULES as r (r.id)}
        <button
          type="button"
          class="flex min-h-11 flex-col items-start gap-1 rounded-xl border-2 px-3 py-2 text-left transition {focusRing} {lit ===
          r.id
            ? TONE[r.id].card
            : 'border-slate-200 bg-white hover:border-slate-400'}"
          aria-pressed={lit === r.id}
          disabled={current === null}
          onclick={() => choose(r.id)}
        >
          <span class="text-sm font-semibold text-slate-800">{r.name}</span>
          <span class="max-w-full overflow-x-auto text-sm"><Tex math={r.tex} /></span>
        </button>
      {/each}
    </div>
  </fieldset>

  <FeedbackNote {tone} text={message} />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} disabled={current === null} onclick={reveal}>
      Xem bước tiếp theo
    </button>
    <button type="button" class={button.quiet} disabled={shown === 0} onclick={reset}>
      Làm lại
    </button>
  </div>

  {#if shown > 0}
    <ol class="space-y-2">
      {#each steps.slice(0, shown) as s, i (i)}
        <li class="rounded-xl border border-slate-200 bg-white px-3 py-2">
          <div class="mb-1 flex items-center gap-2 text-xs font-semibold">
            <span class="text-slate-500">Bước {i + 1}</span>
            <span class="rounded-full px-2 py-0.5 {TONE[s.rule].tag}">{NAME[s.rule]}</span>
          </div>
          <div class="overflow-x-auto"><Tex math={s.tex} /></div>
          {#if s.note}
            <div class="mt-1 overflow-x-auto text-sm text-slate-600">
              Đặt <Tex math={s.note} />.
            </div>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}

  {#if current === null}
    <div class="overflow-x-auto rounded-xl bg-emerald-50 px-3 py-2">
      <Tex display math={raw === preset.final ? `y' = ${raw}` : `y' = ${raw} = ${preset.final}`} />
    </div>
  {/if}
</div>
