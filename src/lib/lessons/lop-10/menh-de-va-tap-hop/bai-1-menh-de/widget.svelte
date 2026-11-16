<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { OPS, PAIRS, reasonOf, sentenceOf, tableOf, truthOf } from './engine.js';

  let pairIndex = $state(0);
  /** @type {import('./engine.js').Op} */
  let op = $state('imp');
  /** @type {boolean | null} */
  let guess = $state(null);

  const pair = $derived(PAIRS[pairIndex]);
  const truth = $derived(truthOf(op, pair.pTrue, pair.qTrue));
  const table = $derived(tableOf(op, pair));
  const answered = $derived(guess !== null);
  const opTex = $derived(OPS.find((o) => o.value === op)?.tex ?? '');

  const pairOptions = PAIRS.map((_, i) => ({ value: i, label: `Cặp ${i + 1}` }));

  function reset() {
    guess = null;
  }

  const feedback = $derived(
    guess === null
      ? {
          tone: /** @type {const} */ ('info'),
          text: `Mệnh đề $${opTex}$ đúng hay sai? Hãy xét $P$, $Q$ đúng hay sai rồi chọn.`,
        }
      : guess === truth
        ? { tone: /** @type {const} */ ('ok'), text: `Chính xác! ${reasonOf(pair, op)}` }
        : { tone: /** @type {const} */ ('warn'), text: `Chưa đúng. ${reasonOf(pair, op)}` },
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Cặp mệnh đề"
      options={pairOptions}
      bind:value={pairIndex}
      onchange={reset}
    />
    <SegmentedControl label="Mệnh đề lập được" options={OPS} bind:value={op} onchange={reset} />
  </div>

  <div class="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-800">
    <p>
      <span class="font-semibold text-rose-700">P:</span> “<LiveRichText text={pair.p} />”
      {#if answered}<span class="ml-1 rounded bg-white px-2 text-sm font-semibold"
          >{pair.pTrue ? 'đúng' : 'sai'}</span
        >{/if}
    </p>
    <p>
      <span class="font-semibold text-teal-700">Q:</span> “<LiveRichText text={pair.q} />”
      {#if answered}<span class="ml-1 rounded bg-white px-2 text-sm font-semibold"
          >{pair.qTrue ? 'đúng' : 'sai'}</span
        >{/if}
    </p>
    <p class="border-t border-slate-200 pt-2">
      <span class="font-semibold text-indigo-700"><Tex math={opTex} />:</span>
      “<LiveRichText text={sentenceOf(pair, op)} />”
    </p>
  </div>

  <div class="flex flex-wrap gap-3" role="group" aria-label="Dự đoán tính đúng sai">
    <button
      type="button"
      class={guess === true ? button.primary : button.secondary}
      aria-pressed={guess === true}
      onclick={() => (guess = true)}>Mệnh đề đúng</button
    >
    <button
      type="button"
      class={guess === false ? button.primary : button.secondary}
      aria-pressed={guess === false}
      onclick={() => (guess = false)}>Mệnh đề sai</button
    >
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <table class="mx-auto w-full max-w-sm border-collapse text-center tabular-nums">
    <caption class="pb-1 text-sm text-slate-600">Bảng chân trị (Đ: đúng, S: sai)</caption>
    <thead>
      <tr>
        {#each table.head as h (h)}
          <th scope="col" class="border border-slate-300 bg-slate-100 px-2 py-1"
            ><Tex math={h} /></th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each table.rows as row, i (i)}
        <tr class={answered && row.current ? 'bg-amber-100 font-bold text-amber-950' : ''}>
          {#each row.cells as cell, j (j)}
            <td class="border border-slate-300 px-2 py-1">{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
  {#if answered}
    <p class="text-center text-sm text-slate-600">Dòng tô vàng ứng với cặp mệnh đề đang xét.</p>
  {/if}
</div>
