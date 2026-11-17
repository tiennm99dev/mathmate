<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import {
    FIRST_QUIZ,
    PLACES,
    RULER_CM,
    SCALES,
    drawQuiz,
    mapCm,
    mapNote,
    realLine,
    scaleText,
  } from './engine.js';

  const U = 34;
  const X0 = 20;
  const ROAD_Y = 64;
  const RULER_Y = 118;

  let mode = $state(/** @type {string | number} */ ('measure'));
  let scale = $state(/** @type {string | number} */ (1000));
  let from = $state(/** @type {string | number} */ (1));
  let to = $state(/** @type {string | number} */ (3));
  let quiz = $state(FIRST_QUIZ);
  let tries = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  const asking = $derived(mode === 'quiz');
  const a = $derived(asking ? quiz.a : Number(from));
  const b = $derived(asking ? quiz.b : Number(to));
  const s = $derived(asking ? quiz.scale : Number(scale));
  const lo = $derived(Math.min(PLACES[a].at, PLACES[b].at));
  const hi = $derived(Math.max(PLACES[a].at, PLACES[b].at));

  const note = $derived.by(() => {
    if (!asking) return { tone: /** @type {const} */ ('info'), text: mapNote(a, b, s) };
    if (result)
      return {
        tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: result.text,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đo trên thước rồi nhân với ${formatNumber(s)}.`,
    };
  });

  /** @param {number} cm */
  const xOf = (cm) => X0 + cm * U;

  const placeOptions = PLACES.map((p, i) => ({ value: i, label: p.name }));

  /** @param {number} i */
  async function choose(i) {
    if (result?.ok) return;
    if (i === quiz.answer) {
      result = { ok: true, text: `Đúng rồi! ${realLine(mapCm(quiz.a, quiz.b), quiz.scale)}.` };
      await tick();
      nextButton?.focus();
      return;
    }
    tries += 1;
    result = {
      ok: false,
      text:
        tries >= 2
          ? `Em xem nhé: ${realLine(mapCm(quiz.a, quiz.b), quiz.scale)}.`
          : 'Chưa đúng. Em đếm kĩ số chữ số 0 khi nhân rồi đổi đơn vị: 100 cm = 1 m, 100 000 cm = 1 km.',
    };
  }

  function another() {
    quiz = drawQuiz(Math.random, quiz);
    tries = 0;
    result = null;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'measure', label: 'Đo và tính' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
  />

  {#if !asking}
    <SegmentedControl
      label="Tỉ lệ bản đồ"
      options={SCALES.map((v) => ({ value: v, label: scaleText(v) }))}
      bind:value={scale}
    />
    <SegmentedControl label="Từ" options={placeOptions} bind:value={from} />
    <SegmentedControl label="Đến" options={placeOptions} bind:value={to} />
  {/if}

  <svg
    viewBox="0 0 {X0 * 2 + RULER_CM * U} 160"
    class="w-full max-w-xl"
    role="img"
    aria-label="Bản đồ tỉ lệ {scaleText(s)}. Con đường có {PLACES.map(
      (p) => `${p.name} ở vạch ${formatNumber(p.at)} cm`,
    ).join(', ')}. Đoạn từ {PLACES[a].name} đến {PLACES[b].name} được tô màu, dài {formatNumber(
      hi - lo,
    )} cm trên thước."
  >
    <rect x="0" y="0" width={X0 * 2 + RULER_CM * U} height="104" rx="8" class="fill-emerald-50" />
    <text x="8" y="16" class="fill-slate-700 text-[12px] font-bold">Tỉ lệ {scaleText(s)}</text>
    <line
      x1={X0 - 10}
      y1={ROAD_Y}
      x2={xOf(RULER_CM) + 10}
      y2={ROAD_Y}
      class="stroke-slate-400"
      stroke-width="8"
      stroke-linecap="round"
    />
    {#if a !== b}
      <line
        x1={xOf(lo)}
        y1={ROAD_Y}
        x2={xOf(hi)}
        y2={ROAD_Y}
        class="stroke-rose-500"
        stroke-width="8"
      />
    {/if}
    {#each PLACES as p, i (p.name)}
      <circle
        cx={xOf(p.at)}
        cy={ROAD_Y}
        r="6"
        class={i === a || i === b ? 'fill-rose-700' : 'fill-white stroke-slate-700'}
        stroke-width="2"
      />
      <text
        x={xOf(p.at)}
        y={i % 2 === 0 ? ROAD_Y - 14 : ROAD_Y + 26}
        text-anchor="middle"
        class="text-[13px] font-semibold {i === a || i === b ? 'fill-rose-800' : 'fill-slate-700'}"
        >{p.name}</text
      >
    {/each}

    <rect
      x={X0 - 8}
      y={RULER_Y}
      width={RULER_CM * U + 16}
      height="36"
      rx="4"
      class="fill-amber-100 stroke-amber-500"
    />
    {#if a !== b}
      <rect x={xOf(lo)} y={RULER_Y} width={(hi - lo) * U} height="10" class="fill-rose-300" />
    {/if}
    {#each { length: RULER_CM * 2 + 1 } as _, h (h)}
      <line
        x1={xOf(h / 2)}
        y1={RULER_Y}
        x2={xOf(h / 2)}
        y2={RULER_Y + (h % 2 === 0 ? 14 : 8)}
        class="stroke-slate-700"
        stroke-width="1.2"
      />
      {#if h % 2 === 0}
        <text
          x={xOf(h / 2)}
          y={RULER_Y + 28}
          text-anchor="middle"
          class="fill-slate-800 text-[12px] font-semibold">{h / 2}</text
        >
      {/if}
    {/each}
    <text x={xOf(RULER_CM) + 2} y={RULER_Y - 4} class="fill-slate-600 text-[10px]">cm</text>
  </svg>

  {#if asking}
    <p class="text-lg font-semibold text-slate-900">
      Trên bản đồ tỉ lệ {scaleText(quiz.scale)}, quãng đường thật từ {PLACES[quiz.a].name} đến
      {PLACES[quiz.b].name} dài bao nhiêu?
    </p>
    <div class="grid grid-cols-2 gap-2" role="group" aria-label="Chọn độ dài thật">
      {#each quiz.options as opt, i (opt)}
        <button
          type="button"
          class="min-h-14 text-xl tabular-nums {button.quiet}"
          disabled={result?.ok}
          onclick={() => choose(i)}>{opt}</button
        >
      {/each}
    </div>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if asking}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {result?.ok ? button.primary : button.quiet}"
        bind:this={nextButton}
        onclick={another}>Câu khác</button
      >
    </div>
  {/if}
</div>
