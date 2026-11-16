<script>
  import { tick } from 'svelte';
  import BarChart from '#lib/core/visuals/bar-chart.svelte';
  import ChoiceQuestion from '#lib/core/kid/choice-question.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { tapOption } from '#lib/core/kid/quiz.js';
  import { rng } from '#lib/core/drill.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import { CHARTS, chartQuestions, drawMessage, rightBars, startBars } from '../_shared/charts.js';

  let pick = $state(0);
  let bars = $state(startBars(CHARTS[0]));
  let stage = $state(/** @type {'draw' | 'ask' | 'done'} */ ('draw'));
  let round = $state(1);
  let index = $state(0);
  /** @type {number[]} */
  let wrong = $state([]);
  let phase = $state(/** @type {import('#lib/core/kid/quiz.js').Phase} */ ('ask'));
  /** @type {ReturnType<typeof ChoiceQuestion> | undefined} */
  let question = $state();

  const chart = $derived(CHARTS[pick]);
  const right = $derived(rightBars(chart, bars));
  const done = $derived(right.every(Boolean));
  const questions = $derived(chartQuestions(chart, rng(round * 11 + pick)));

  /** @param {number} i */
  function choose(i) {
    pick = i;
    bars = startBars(CHARTS[i]);
    stage = 'draw';
  }

  async function startQuestions() {
    stage = 'ask';
    index = 0;
    wrong = [];
    phase = 'ask';
    await tick();
    question?.focus();
  }

  /** @param {number} option */
  function answer(option) {
    const step = tapOption({ phase, wrong }, option, questions[index].answer);
    phase = step.phase;
    wrong = step.wrong;
  }

  async function next() {
    wrong = [];
    phase = 'ask';
    if (index + 1 >= questions.length) {
      stage = 'done';
      round += 1;
      return;
    }
    index += 1;
    await tick();
    question?.focus();
  }

  const cell = 'border-2 border-slate-300 px-2 py-2 text-center';
</script>

<div class="space-y-5">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn biểu đồ">
    {#each CHARTS as c, i (c.id)}
      <button
        type="button"
        class="min-h-12 text-base {pick === i ? button.primary : button.quiet}"
        aria-pressed={pick === i}
        onclick={() => choose(i)}>{c.title}</button
      >
    {/each}
  </div>

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600"
        >Bảng số liệu: {chart.title}</caption
      >
      <tbody>
        <tr>
          <th scope="row" class="{cell} bg-sky-100 text-left font-bold">{chart.head}</th>
          {#each chart.labels as label, i (i)}
            <th scope="col" class="{cell} bg-sky-50 text-base font-semibold">{label}</th>
          {/each}
        </tr>
        <tr>
          <th scope="row" class="{cell} bg-amber-100 text-left font-bold">{chart.unit}</th>
          {#each chart.values as v, i (i)}
            <td
              class="{cell} text-xl font-bold tabular-nums {right[i]
                ? 'bg-emerald-50 text-emerald-900'
                : ''}"
              >{fmt(v)}{#if right[i]}<span class="sr-only">, cột đã đúng</span>{/if}</td
            >
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rounded-2xl bg-sky-50 p-2">
    <p class="px-2 pt-1 text-base font-semibold text-slate-600">
      Kéo đỉnh mỗi cột (hoặc chọn cột rồi bấm phím mũi tên lên, xuống) cho cột cao đúng bằng số
      trong bảng.
    </p>
    {#key pick}
      <BarChart
        bind:data={bars}
        interactive={stage === 'draw'}
        max={chart.max}
        step={chart.step}
        unit={chart.unit}
        title="Biểu đồ cột: {chart.title}"
      />
    {/key}
  </div>

  {#if stage === 'ask'}
    <ChoiceQuestion
      bind:this={question}
      q={questions[index]}
      {phase}
      {wrong}
      onchoose={answer}
      onnext={next}
      nextLabel={index + 1 < questions.length ? 'Câu tiếp' : 'Xong'}
    />
  {:else}
    <KidNote
      tone={done ? 'ok' : 'info'}
      text={stage === 'done'
        ? 'Giỏi lắm! Em đã vẽ thêm cột và đọc được biểu đồ cột.'
        : drawMessage(chart, bars)}
    />
  {/if}

  <div class="flex flex-wrap gap-3">
    {#if done && stage !== 'ask'}
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={startQuestions}
        >Đọc biểu đồ</button
      >
    {/if}
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={() => choose(pick)}
      >Vẽ lại</button
    >
  </div>
</div>
