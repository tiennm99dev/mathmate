<script>
  import { tick } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button } from '#lib/core/ui.js';
  import { PROOFS, blanksOf, progressText } from './proofs.js';

  let id = $state(PROOFS[0].id);
  /** Line indices whose blank is filled right. @type {number[]} */
  let solved = $state([]);
  /** @type {{ line: number, option: number } | null} */
  let wrong = $state(null);

  const proof = $derived(PROOFS.find((p) => p.id === id) ?? PROOFS[0]);
  const total = $derived(blanksOf(proof).length);
  /** The first line whose blank is still open, or the line count when all are filled. */
  const open = $derived.by(() => {
    const i = proof.lines.findIndex((line, j) => 'options' in line && !solved.includes(j));
    return i < 0 ? proof.lines.length : i;
  });
  const shown = $derived(proof.lines.slice(0, Math.min(open + 1, proof.lines.length)));

  function reset() {
    solved = [];
    wrong = null;
  }

  /** @type {HTMLElement | undefined} */
  let root = $state();

  /** Keeps keyboard focus in the proof once the pressed option is gone. */
  async function focusNext() {
    await tick();
    const next = root?.querySelector('[data-next]');
    if (next instanceof HTMLElement) next.focus();
  }

  /** @param {number} line @param {number} option */
  function choose(line, option) {
    const l = proof.lines[line];
    if (!('options' in l)) return;
    if (option === l.answer) {
      solved = [...solved, line];
      wrong = null;
      focusNext();
    } else {
      wrong = { line, option };
    }
  }
</script>

<div class="space-y-4" bind:this={root}>
  <SegmentedControl
    label="Chọn bài chứng minh"
    options={PROOFS.map((p) => ({ value: p.id, label: p.label }))}
    bind:value={id}
    onchange={reset}
  />

  <p class="rounded-xl bg-slate-50 px-3 py-2 font-semibold text-slate-800">
    <LiveRichText text={proof.statement} />
  </p>

  <ol class="space-y-3">
    {#each shown as line, i (proof.id + i)}
      <li class="rounded-xl border border-slate-200 p-3 text-slate-800">
        {#if 'options' in line}
          <p><LiveRichText text={line.lead} /></p>
          {#if solved.includes(i)}
            <p class="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900">
              <LiveRichText text={line.options[line.answer]} />
            </p>
          {:else}
            <div
              class="mt-2 flex flex-col gap-2"
              role="group"
              aria-label="Chọn nội dung điền vào chỗ trống"
            >
              {#each line.options as option, o (o)}
                <button
                  type="button"
                  class="{button.quiet} justify-start text-left {wrong?.line === i &&
                  wrong.option === o
                    ? 'border-amber-400 bg-amber-50'
                    : ''}"
                  data-next={o === 0 ? '' : undefined}
                  onclick={() => choose(i, o)}
                >
                  <span><LiveRichText text={option} /></span>
                </button>
              {/each}
            </div>
          {/if}
        {:else}
          <p><LiveRichText text={line.text} /></p>
        {/if}
      </li>
    {/each}
  </ol>

  {#if wrong}
    {@const l = proof.lines[wrong.line]}
    {#if 'options' in l}
      <FeedbackNote tone="warn" text={`Chưa đúng. ${l.why}`} />
    {/if}
  {/if}
  <FeedbackNote
    tone={solved.length === total ? 'ok' : 'info'}
    text={progressText(solved.length, total)}
  />
  {#if solved.length === total}
    <button type="button" class={button.secondary} data-next="" onclick={reset}>Làm lại</button>
  {/if}
</div>
