<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import CommaStrip from '../_shared/comma-strip.svelte';
  import { FACTORS, grouped, readStrip, stripOf, writtenSpan } from '../_shared/decimal-ops.js';
  import { NUMBERS, PAD, QUIZ, checkComma, opText, resultNote, target } from './engine.js';

  let mode = $state(/** @type {string | number} */ ('try'));
  let numberIndex = $state(0);
  let op = $state(/** @type {string | number} */ ('×'));
  let factor = $state(/** @type {string | number} */ ('10'));
  let quizIndex = $state(0);
  let moved = $state(/** @type {number | null} */ (null));
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const question = $derived(QUIZ[quizIndex % QUIZ.length]);
  const text = $derived(mode === 'try' ? NUMBERS[numberIndex % NUMBERS.length] : question[0]);
  const curOp = $derived(/** @type {'×' | ':'} */ (mode === 'try' ? op : question[1]));
  const curFactor = $derived(String(mode === 'try' ? factor : question[2]));
  const strip = $derived(stripOf(text, PAD));
  const comma = $derived(moved ?? strip.comma);
  const shown = $derived(grouped(readStrip(strip.digits, comma)));
  const done = $derived(mode === 'try' && moved !== null);

  const note = $derived.by(() => {
    if (mode === 'try') {
      return done
        ? { tone: /** @type {const} */ ('ok'), text: resultNote(text, curOp, curFactor) }
        : {
            tone: /** @type {const} */ ('info'),
            text: `Em bấm "Thực hiện" để xem dấu phẩy của ${text} trượt khi tính ${opText(text, curOp, curFactor)}.`,
          };
    }
    if (result)
      return {
        tone: result.ok ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
        text: result.text,
      };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Em dời dấu phẩy bằng hai nút mũi tên rồi bấm "Kiểm tra". Bây giờ số là ${shown}.`,
    };
  });

  function clear() {
    moved = null;
    result = null;
  }

  function run() {
    moved = target(text, curOp, curFactor);
  }

  function otherNumber() {
    numberIndex += 1;
    clear();
  }

  /** @param {number} step */
  function slide(step) {
    if (result?.ok) return;
    const next = comma + step;
    if (next < 1 || next > strip.digits.length) return;
    moved = next;
    result = null;
  }

  function check() {
    result = checkComma(text, curOp, curFactor, comma);
  }

  /** @type {HTMLDivElement | undefined} */
  let controls = $state();

  async function nextQuiz() {
    quizIndex += 1;
    clear();
    await tick();
    controls?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'try', label: 'Thử xem' },
      { value: 'quiz', label: 'Đố em' },
    ]}
    bind:value={mode}
    onchange={clear}
  />

  {#if mode === 'try'}
    <SegmentedControl
      label="Phép tính"
      options={[
        { value: '×', label: 'Nhân ×' },
        { value: ':', label: 'Chia :' },
      ]}
      bind:value={op}
      onchange={clear}
    />
    <SegmentedControl
      label="Với số"
      options={FACTORS.map((f) => ({ value: f, label: f }))}
      bind:value={factor}
      onchange={clear}
    />
  {/if}

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {opText(text, curOp, curFactor)} = {done || result?.ok ? shown : '?'}
  </p>

  <CommaStrip
    digits={strip.digits}
    {comma}
    span={writtenSpan(strip.digits, comma)}
    label="Dãy chữ số, dấu phẩy đang ở vị trí đọc thành {shown}"
  />
  <p class="text-center text-base text-slate-600">
    Các chữ số đứng yên, dấu phẩy trượt. Chữ số 0 mờ là chữ số chưa cần viết.
  </p>

  <div bind:this={controls}>
    {#if mode === 'try'}
      <div class="grid grid-cols-2 gap-2">
        <button type="button" class="min-h-14 text-lg {button.primary}" onclick={run}>
          Thực hiện
        </button>
        <button
          type="button"
          class="min-h-14 text-lg {button.quiet}"
          onclick={done ? clear : otherNumber}
        >
          {done ? 'Về số ban đầu' : 'Số khác'}
        </button>
      </div>
    {:else if result?.ok}
      <div class="flex justify-center">
        <button type="button" class="min-h-12 text-lg {button.primary}" onclick={nextQuiz}>
          Câu khác
        </button>
      </div>
    {:else}
      <div class="grid grid-cols-3 gap-2">
        <button type="button" class="min-h-14 text-lg {button.quiet}" onclick={() => slide(-1)}
          >← Sang trái</button
        >
        <button type="button" class="min-h-14 text-lg {button.quiet}" onclick={() => slide(1)}
          >Sang phải →</button
        >
        <button type="button" class="min-h-14 text-lg {button.primary}" onclick={check}>
          Kiểm tra
        </button>
      </div>
    {/if}
  </div>

  <KidNote tone={note.tone} text={note.text} />
</div>
