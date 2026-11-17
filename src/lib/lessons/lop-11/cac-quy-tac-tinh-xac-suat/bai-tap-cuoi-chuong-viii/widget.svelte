<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, focusRing, textInput } from '#lib/core/ui.js';
  import { rng } from '#lib/core/drill.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { percentText, probText } from '../_shared/probability.js';
  import { PROBLEMS, checkTyped, runProblem } from './engine.js';

  let index = $state(0);
  let typed = $state('');
  let checked = $state(false);
  let showSteps = $state(false);
  let seed = $state(1);
  let trials = $state(0);
  let hits = $state(0);
  const inputId = $props.id();

  const problem = $derived(PROBLEMS[index]);
  const verdict = $derived(checkTyped(typed, problem.answer));

  /** @param {number} i */
  function choose(i) {
    index = i;
    typed = '';
    checked = false;
    showSteps = false;
    trials = 0;
    hits = 0;
  }

  /** @param {number} n */
  function run(n) {
    hits += runProblem(problem, rng(seed * 104729 + index), n);
    trials += n;
    seed += 1;
  }

  const CHECK = {
    ok: {
      tone: /** @type {const} */ ('ok'),
      text: 'Đúng! Hãy chạy mô phỏng để thấy tần số tương đối tiến gần đến kết quả này.',
    },
    wrong: {
      tone: /** @type {const} */ ('warn'),
      text: 'Chưa đúng. Xác định các biến cố, xem chúng xung khắc hay độc lập, rồi chọn công thức cộng hay công thức nhân. Mô phỏng cũng gợi ý kết quả gần đúng.',
    },
    empty: {
      tone: /** @type {const} */ ('info'),
      text: 'Hãy nhập xác suất, ví dụ $0{,}25$ hoặc $1/4$.',
    },
    invalid: {
      tone: /** @type {const} */ ('warn'),
      text: 'Không đọc được số này. Viết như $0{,}25$ hoặc $1/4$.',
    },
  };

  const simText = $derived(
    trials === 0
      ? 'Chưa có lượt mô phỏng nào.'
      : `Sau ${fmt(trials)} lần thử, biến cố xảy ra ${fmt(hits)} lần: tần số tương đối ${percentText(hits, trials)}.` +
          (checked && verdict === 'ok'
            ? ` Xác suất em tính được là ${probText(problem.answer)} ≈ ${formatNumber(problem.answer * 100, 1)}%.`
            : ''),
  );
</script>

<div class="space-y-4">
  <label class="block text-sm font-semibold text-slate-700">
    Bài toán
    <select
      class="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 {focusRing}"
      value={index}
      onchange={(e) => choose(Number(e.currentTarget.value))}
    >
      {#each PROBLEMS as p, i (p.id)}
        <option value={i}>{p.label}</option>
      {/each}
    </select>
  </label>
  <p class="rounded-xl bg-slate-50 px-4 py-3 text-slate-800">
    <LiveRichText text={problem.text} />
  </p>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      checked = true;
    }}
  >
    <label for={inputId} class="w-full text-sm font-semibold text-slate-700">
      Xác suất em tính được (số thập phân hoặc phân số a/b)
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
      class={button.secondary}
      aria-expanded={showSteps}
      onclick={() => (showSteps = !showSteps)}
    >
      {showSteps ? 'Ẩn lời giải' : 'Xem lời giải'}
    </button>
  </form>
  {#if checked}
    <FeedbackNote tone={CHECK[verdict].tone} text={CHECK[verdict].text} />
  {/if}
  {#if showSteps}
    <ol
      class="list-decimal space-y-1 rounded-xl bg-indigo-50 py-3 pr-4 pl-8 text-sm text-indigo-950"
    >
      {#each problem.steps as s, i (i)}
        <li><LiveRichText text={s} /></li>
      {/each}
    </ol>
  {/if}

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} onclick={() => run(100)}>Thử 100 lần</button>
    <button type="button" class={button.secondary} onclick={() => run(10000)}
      >Thử {fmt(10000)} lần</button
    >
    <button
      type="button"
      class={button.quiet}
      disabled={trials === 0}
      onclick={() => {
        trials = 0;
        hits = 0;
      }}
    >
      Xoá
    </button>
  </div>
  <div class="h-4 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
    <div
      class="h-full bg-emerald-500 transition-[width] motion-reduce:transition-none"
      style="width: {trials ? (hits / trials) * 100 : 0}%"
    ></div>
  </div>
  <FeedbackNote tone="info" text={simText} />
</div>
