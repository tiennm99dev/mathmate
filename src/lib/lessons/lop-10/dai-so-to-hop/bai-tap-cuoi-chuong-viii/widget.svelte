<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { readNatural } from '#lib/core/number-format.js';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { PROBLEMS, judge, listText } from './engine.js';

  let index = $state(0);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let verdict = $state({ tone: 'info', text: 'Nhập đáp số rồi bấm "Kiểm tra".' });
  /** @type {string[] | null} */
  let listed = $state(null);

  const problem = $derived(PROBLEMS[index]);
  const inputId = $props.id();

  function choose() {
    typed = '';
    listed = null;
    verdict = { tone: 'info', text: 'Nhập đáp số rồi bấm "Kiểm tra".' };
  }

  function check() {
    verdict = judge(problem, readNatural(typed));
  }

  function list() {
    listed = problem.list();
    verdict = { tone: 'info', text: listText(problem) };
  }
</script>

<div class="space-y-4">
  <label class="block">
    <span class="mb-1 block text-sm font-semibold text-slate-700">Bài toán</span>
    <select
      class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 {focusRing}"
      bind:value={index}
      onchange={choose}
    >
      {#each PROBLEMS as p, i (p.id)}
        <option value={i}>{i + 1}. {p.title}</option>
      {/each}
    </select>
  </label>

  <p class="font-semibold text-slate-800"><LiveRichText text={problem.prompt} /></p>

  <form
    class="flex flex-wrap items-end gap-3"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0 flex-1" for={inputId}>
      <span class="mb-1 block text-sm font-semibold text-slate-700">Đáp số (số cách)</span>
      <input
        id={inputId}
        class={textInput}
        inputmode="numeric"
        autocomplete="off"
        bind:value={typed}
      />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={list}>Liệt kê</button>
  </form>

  <FeedbackNote tone={verdict.tone} text={verdict.text} />

  {#if listed}
    <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p class="mb-2 text-sm font-semibold text-slate-700">
        Tất cả {listed.length} cách, đánh số lần lượt:
      </p>
      <ol class="flex max-h-64 flex-wrap gap-1 overflow-y-auto" aria-label="Danh sách liệt kê">
        {#each listed as way, i (way)}
          <li class="rounded bg-white px-2 py-0.5 text-xs text-slate-700 ring-1 ring-slate-200">
            <span class="text-slate-400">{i + 1}.</span>
            {way}
          </li>
        {/each}
      </ol>
    </div>
  {/if}
</div>
