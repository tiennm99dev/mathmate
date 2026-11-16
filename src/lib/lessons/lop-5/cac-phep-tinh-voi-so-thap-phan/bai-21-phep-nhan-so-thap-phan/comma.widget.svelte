<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import CommaStrip from '../_shared/comma-strip.svelte';
  import { COMMA_TASKS, checkComma, commaTask } from './engine.js';

  let index = $state(0);
  let gap = $state(/** @type {number | null} */ (null));
  let result = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));

  const pair = $derived(COMMA_TASKS[index % COMMA_TASKS.length]);
  const task = $derived(commaTask(pair[0], pair[1]));

  /** @param {number} g */
  function pick(g) {
    if (result?.ok) return;
    gap = g;
    result = checkComma(pair[0], pair[1], g);
  }

  /** @type {HTMLDivElement | undefined} */
  let box = $state();

  async function next() {
    index += 1;
    gap = null;
    result = null;
    await tick();
    box?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4" bind:this={box}>
  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums">
    {pair[0]} × {pair[1]} = {result?.ok ? task.full : '?'}
  </p>
  <p class="text-center text-lg text-slate-700">
    Nhân như số tự nhiên: {task.x} × {task.y} = {task.natural}. Em chạm vào chỗ đặt dấu phẩy.
  </p>
  <CommaStrip
    digits={task.digits}
    comma={gap}
    label="Tích {task.natural}{gap === null
      ? ', chưa có dấu phẩy'
      : `, dấu phẩy sau chữ số thứ ${gap}`}"
    onpick={pick}
  />
  <KidNote
    tone={result === null ? 'info' : result.ok ? 'ok' : 'warn'}
    text={result?.text ?? 'Đếm các chữ số ở phần thập phân của cả hai thừa số.'}
  />
  {#if result?.ok}
    <div class="flex justify-center">
      <button type="button" class="min-h-12 text-lg {button.primary}" onclick={next}>
        Phép nhân khác
      </button>
    </div>
  {/if}
</div>
