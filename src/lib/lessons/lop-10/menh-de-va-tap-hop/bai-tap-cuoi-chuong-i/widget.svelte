<script>
  import { tick } from 'svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import RealLine from '../_shared/real-line.svelte';
  import Venn from '../_shared/venn.svelte';
  import { QUESTIONS, optionOrder } from './engine.js';

  const ROW_COLORS = ['#be123c', '#0f766e', '#4f46e5'];

  let index = $state(0);
  /** @type {number | null} */
  let picked = $state(null);
  let score = $state(0);
  let finished = $state(false);
  /** @type {HTMLElement | undefined} */
  let promptEl = $state();

  const q = $derived(QUESTIONS[index]);
  const order = $derived(optionOrder(q, index));
  const right = $derived(picked === q.answer);

  /** @param {number} i */
  function pick(i) {
    if (picked !== null) return;
    picked = i;
    if (i === q.answer) score += 1;
  }

  async function next() {
    if (index + 1 >= QUESTIONS.length) finished = true;
    else {
      index += 1;
      picked = null;
    }
    await tick();
    promptEl?.focus();
  }

  async function restart() {
    index = 0;
    picked = null;
    score = 0;
    finished = false;
    await tick();
    promptEl?.focus();
  }

  /** @param {number} i */
  function optionClass(i) {
    const base = `w-full min-h-11 rounded-lg border px-3 py-2 text-left ${focusRing}`;
    if (picked === null) return `${base} border-slate-300 bg-white hover:bg-slate-50`;
    if (i === q.answer) return `${base} border-emerald-400 bg-emerald-50 text-emerald-900`;
    if (i === picked) return `${base} border-rose-400 bg-rose-50 text-rose-900`;
    return `${base} border-slate-200 bg-white text-slate-500`;
  }
</script>

<div class="space-y-4">
  {#if finished}
    <div class="space-y-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite">
      <p class="font-semibold text-indigo-900" tabindex="-1" bind:this={promptEl}>
        Em trả lời đúng {score}/{QUESTIONS.length} câu.
      </p>
      <p class="text-sm text-indigo-900">
        {score === QUESTIONS.length
          ? 'Tuyệt vời! Em đã nắm chắc mệnh đề và tập hợp.'
          : 'Xem lại những câu sai, nhất là các điểm mút của khoảng, rồi làm lại nhé.'}
      </p>
      <button type="button" class={button.primary} onclick={restart}>Làm lại</button>
    </div>
  {:else}
    <p class="text-sm text-slate-600">Câu {index + 1}/{QUESTIONS.length} · Đúng: {score}</p>
    <p class="font-semibold text-slate-900" tabindex="-1" bind:this={promptEl}>
      <LiveRichText text={q.prompt} />
    </p>
    <ul class="space-y-2">
      {#each order as i (i)}
        <li>
          <button
            type="button"
            class={optionClass(i)}
            aria-disabled={picked !== null}
            onclick={() => pick(i)}><LiveRichText text={q.options[i]} /></button
          >
        </li>
      {/each}
    </ul>

    {#if picked !== null}
      <FeedbackNote
        tone={right ? 'ok' : 'warn'}
        text={`${right ? 'Đúng rồi!' : `Chưa đúng. Đáp án: ${q.options[q.answer]}.`} ${q.why}`}
      />
      <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p class="mb-2 text-sm font-semibold text-slate-700">Minh hoạ</p>
        {#if q.visual.kind === 'line'}
          <div class="space-y-1">
            {#each q.visual.rows as row, r (row.name)}
              <RealLine set={row.set} name={row.name} color={ROW_COLORS[r % ROW_COLORS.length]} />
            {/each}
          </div>
        {:else}
          <Venn
            shade={q.visual.shade}
            names={q.visual.names}
            nested={q.visual.nested}
            items={q.visual.items}
            label={q.visual.label}
          />
        {/if}
      </div>
      <button type="button" class={button.primary} onclick={next}>
        {index + 1 >= QUESTIONS.length ? 'Xem kết quả' : 'Câu tiếp theo'}
      </button>
    {/if}
  {/if}
</div>
