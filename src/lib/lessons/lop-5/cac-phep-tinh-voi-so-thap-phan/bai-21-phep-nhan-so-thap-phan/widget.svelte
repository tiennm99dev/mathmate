<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import AreaGrid from '#lib/core/visuals/area-grid.svelte';
  import { button } from '#lib/core/ui.js';
  import { AREA_QUIZ, areaNote, areaOptions, sideText } from './engine.js';

  let mode = $state(/** @type {string | number} */ ('drag'));
  let cols = $state(3);
  let rows = $state(7);
  let quizIndex = $state(0);
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const goal = $derived(AREA_QUIZ[quizIndex % AREA_QUIZ.length]);
  const built = $derived(cols === goal[0] && rows === goal[1]);
  const options = $derived.by(() => {
    const list = areaOptions(goal[0], goal[1]);
    const turn = quizIndex % list.length;
    return [...list.slice(turn), ...list.slice(0, turn)];
  });
  const question = $derived(`${sideText(goal[0])} × ${sideText(goal[1])}`);

  const note = $derived.by(() => {
    if (mode === 'drag') return { tone: /** @type {const} */ ('info'), text: areaNote(cols, rows) };
    if (result)
      return {
        tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: result.text,
      };
    if (!built) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Em kéo góc để được hình chữ nhật ${sideText(goal[0])} m × ${sideText(goal[1])} m. Bây giờ là ${sideText(cols)} m × ${sideText(rows)} m.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đúng hình rồi! Đếm ô nhỏ rồi chọn kết quả của ${question}.`,
    };
  });

  /** @param {string} pick */
  function choose(pick) {
    if (result?.ok) return;
    const right = areaOptions(goal[0], goal[1])[0];
    result =
      pick === right
        ? { ok: true, text: `Đúng rồi! ${areaNote(goal[0], goal[1])}` }
        : {
            ok: false,
            text: `Chưa đúng. Có ${goal[0] * goal[1]} ô nhỏ, mỗi ô là 0,01 m². ${goal[0] * goal[1]} phần trăm viết thế nào?`,
          };
  }

  /** @type {HTMLDivElement | undefined} */
  let area = $state();

  async function nextQuiz() {
    quizIndex += 1;
    result = null;
    cols = 1;
    rows = 1;
    await tick();
    /** @type {SVGElement | null | undefined} */ (area?.querySelector('.drag-handle'))?.focus();
  }

  function changeMode() {
    result = null;
    if (mode === 'quiz') {
      cols = 1;
      rows = 1;
    }
  }
</script>

<div class="space-y-4" bind:this={area}>
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'drag', label: 'Kéo hình' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
    onchange={changeMode}
  />

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {#if mode === 'drag'}
      {sideText(cols)} × {sideText(rows)}
    {:else}
      {question} = ?
    {/if}
  </p>

  <AreaGrid
    maxCols={10}
    maxRows={10}
    bind:cols
    bind:rows
    unit="ô nhỏ"
    showCaption={false}
    label="Hình vuông cạnh 1 m chia thành 100 ô nhỏ. Hình chữ nhật tô màu: {sideText(
      cols,
    )} m × {sideText(rows)} m."
  />
  <p class="text-center text-base text-slate-600">
    Hình vuông cạnh 1 m. Mỗi cột rộng 0,1 m, mỗi hàng cao 0,1 m.
  </p>

  {#if mode === 'quiz' && built}
    <div class="grid grid-cols-3 gap-2" role="group" aria-label="Chọn kết quả của {question}">
      {#each options as option (option)}
        <button
          type="button"
          class="min-h-14 px-1 text-2xl tabular-nums {button.quiet}"
          onclick={() => choose(option)}>{option}</button
        >
      {/each}
    </div>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  {#if mode === 'quiz' && result?.ok}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextQuiz}>
        Hình khác
      </button>
    </div>
  {/if}
</div>
