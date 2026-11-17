<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { ROUNDS, checkArea } from './engine.js';

  let index = $state(0);
  /** @type {number | null} */
  let chosen = $state(null);
  let formulaOk = $state(false);
  let typed = $state('');
  /** @type {boolean | null | undefined} */
  let areaOk = $state(undefined);
  let score = $state(0);
  let firstTry = $state(true);

  const inputId = $props.id();
  const round = $derived(ROUNDS[index]);
  // Show the options in a different order each round.
  const order = $derived(round.options.map((_, i) => (i + index) % round.options.length));
  const regions = $derived([
    { f: round.f, g: round.g, from: round.from, to: round.to, color: '#10b981', opacity: 0.35 },
  ]);
  const curves = $derived([
    { f: round.f, color: '#4338ca' },
    ...(round.g ? [{ f: round.g, color: '#db2777' }] : []),
  ]);

  /** @param {number} i */
  function choose(i) {
    if (formulaOk) return;
    chosen = i;
    if (i === round.correct) {
      formulaOk = true;
    } else {
      firstTry = false;
    }
  }
  function submitArea() {
    areaOk = checkArea(round, typed);
    if (areaOk === false) firstTry = false;
    if (areaOk && firstTry) score += 1;
  }
  function next() {
    index = (index + 1) % ROUNDS.length;
    if (index === 0) score = 0;
    chosen = null;
    formulaOk = false;
    typed = '';
    areaOk = undefined;
    firstTry = true;
  }

  const formulaNote = $derived(
    chosen === null
      ? 'Chọn tích phân cho đúng diện tích miền tô màu xanh.'
      : formulaOk
        ? `Đúng. ${round.why} Bây giờ hãy tính diện tích.`
        : 'Chưa đúng. Xem lại miền tô màu: phần nào nằm dưới trục hoành, đường nào nằm trên, và hai cận là giao điểm nào?',
  );
  const areaNote = $derived(
    areaOk === undefined
      ? ''
      : areaOk === null
        ? 'Hãy nhập một số nguyên, phân số (ví dụ 7/3) hoặc số thập phân.'
        : areaOk
          ? `Chính xác: ${round.steps}`
          : 'Chưa đúng. Tìm một nguyên hàm rồi dùng công thức Newton – Leibniz trên từng đoạn.',
  );
</script>

<div class="space-y-4">
  <p class="text-sm font-semibold text-slate-700">
    Miền {index + 1}/{ROUNDS.length} · Đúng ngay lần đầu: {score}
  </p>
  <div class="overflow-x-auto text-center">
    <span class="text-sm text-slate-600">Hình phẳng giới hạn bởi</span>
    <Tex display math={round.tex} />
  </div>
  <GraphBox
    win={round.win}
    label="Miền phẳng tô màu xanh giới hạn bởi các đường đã cho."
    {regions}
    {curves}
  />

  <div role="group" aria-label="Chọn công thức tính diện tích" class="grid gap-2 sm:grid-cols-3">
    {#each order as i (i)}
      <button
        type="button"
        class="{button.quiet} min-h-14 {chosen === i
          ? i === round.correct
            ? 'border-emerald-500! bg-emerald-50!'
            : 'border-rose-400! bg-rose-50!'
          : ''}"
        aria-pressed={chosen === i}
        disabled={formulaOk && i !== round.correct}
        onclick={() => choose(i)}
      >
        <Tex math={`S = \\displaystyle ${round.options[i]}`} />
      </button>
    {/each}
  </div>
  <FeedbackNote tone={chosen === null ? 'info' : formulaOk ? 'ok' : 'warn'} text={formulaNote} />

  {#if formulaOk}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        submitArea();
      }}
    >
      <div class="min-w-0 flex-1">
        <label for={inputId} class="mb-1 block text-sm font-semibold text-slate-700"
          >Diện tích S bằng</label
        >
        <input
          id={inputId}
          class={textInput}
          inputmode="text"
          autocomplete="off"
          bind:value={typed}
          disabled={areaOk === true}
        />
      </div>
      <button type="submit" class={button.primary} disabled={areaOk === true}>Kiểm tra</button>
    </form>
    {#if areaNote}
      <FeedbackNote tone={areaOk ? 'ok' : 'warn'} text={areaNote} />
    {/if}
  {/if}

  <button type="button" class={button.secondary} onclick={next}>
    {index + 1 === ROUNDS.length ? 'Làm lại từ đầu' : 'Miền tiếp theo'}
  </button>
</div>
