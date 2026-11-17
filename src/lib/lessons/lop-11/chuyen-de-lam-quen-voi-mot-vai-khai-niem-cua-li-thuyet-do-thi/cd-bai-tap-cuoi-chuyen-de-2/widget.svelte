<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { NAMES } from '../_shared/graph.js';
  import GraphFigure from '../_shared/graph-figure.svelte';
  import { ringLayout } from '../_shared/layout.js';
  import { KINDS, checkDistance, checkEuler, makeGraph, targetOf } from './engine.js';

  const W = 360;
  const H = 270;

  let seed = $state(1);
  /** @type {{ ok: boolean, text: string } | null} */
  let euler = $state(null);
  /** @type {{ ok: boolean, text: string } | null} */
  let distance = $state(null);
  let typed = $state('');
  let invalid = $state(false);
  let right = $state(0);
  let asked = $state(0);

  const g = $derived(makeGraph(seed));
  const pos = $derived(ringLayout(g.n, W, H));
  const names = $derived(NAMES.slice(0, g.n));
  const target = $derived(NAMES[targetOf(g)]);

  /** @param {{ ok: boolean }} r */
  function score(r) {
    asked += 1;
    if (r.ok) right += 1;
  }

  /** @param {import('./engine.js').Kind} k */
  function answerEuler(k) {
    if (euler) return;
    euler = checkEuler(g, k);
    score(euler);
  }

  function answerDistance() {
    if (distance) return;
    const r = checkDistance(g, typed);
    invalid = r === null;
    if (r) {
      distance = r;
      score(r);
    }
  }

  function next() {
    seed += 1;
    euler = null;
    distance = null;
    typed = '';
    invalid = false;
  }

  const label = $derived(
    `Đồ thị có ${g.n} đỉnh và ${g.edges.length} cạnh có trọng số: ` +
      g.edges.map((e) => `${NAMES[e.a]}${NAMES[e.b]} = ${e.w}`).join(', ') +
      '.',
  );
</script>

<div class="space-y-4">
  <GraphFigure {pos} {names} edges={g.edges} {label} width={W} height={H} weights />

  <section class="space-y-2" aria-labelledby="euler-q">
    <h3 id="euler-q" class="font-semibold text-slate-800">
      1. Đồ thị (không xét trọng số) có chu trình Euler, đường đi Euler hay không có?
    </h3>
    <div class="flex flex-wrap gap-2">
      {#each KINDS as k (k.value)}
        <button
          type="button"
          class={button.quiet}
          disabled={euler !== null}
          onclick={() => answerEuler(k.value)}>{k.label}</button
        >
      {/each}
    </div>
    {#if euler}<FeedbackNote tone={euler.ok ? 'ok' : 'warn'} text={euler.text} />{/if}
  </section>

  <section class="space-y-2" aria-labelledby="dist-q">
    <h3 id="dist-q" class="font-semibold text-slate-800">
      2. Độ dài đường đi ngắn nhất từ A đến {target} là bao nhiêu?
    </h3>
    <form
      class="flex flex-wrap gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        answerDistance();
      }}
    >
      <input
        class="{textInput} max-w-32"
        inputmode="numeric"
        aria-label="Độ dài đường đi ngắn nhất từ A đến {target}"
        bind:value={typed}
        disabled={distance !== null}
      />
      <button type="submit" class={button.primary} disabled={distance !== null || !typed.trim()}>
        Kiểm tra
      </button>
    </form>
    {#if invalid}<FeedbackNote tone="warn" text="Hãy nhập một số tự nhiên." />{/if}
    {#if distance}<FeedbackNote tone={distance.ok ? 'ok' : 'warn'} text={distance.text} />{/if}
  </section>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.secondary} onclick={next}>Đồ thị mới</button>
    <p class="text-sm text-slate-600" aria-live="polite">Đúng {right}/{asked} câu.</p>
  </div>
</div>
