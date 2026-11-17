<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import Calculator from '../_shared/calculator.svelte';
  import { off, press, screenReading, start } from '../_shared/calc.js';
  import { TASKS, guide, nextText } from './engine.js';

  let mode = $state(/** @type {string | number} */ ('guide'));
  let taskIndex = $state(0);
  let done = $state(0);
  let calc = $state(off());
  let message = $state(nextText(TASKS[0], 0));
  let tone = $state(/** @type {'ok' | 'warn' | 'info'} */ ('info'));

  const guided = $derived(mode === 'guide');
  const t = $derived(TASKS[taskIndex]);
  const finished = $derived(done >= t.keys.length);
  const target = $derived(guided && !finished ? t.keys[done] : null);

  /** @param {import('../_shared/calc.js').Key} key */
  function onpress(key) {
    if (!guided) {
      calc = press(calc, key);
      tone = 'info';
      message = screenReading(calc);
      return;
    }
    const step = guide(t, done, key);
    if (step.take) calc = press(calc, key);
    done = step.done;
    tone = step.finished ? 'ok' : step.take ? 'info' : 'warn';
    message = step.text;
  }

  /** @param {number} i */
  function openTask(i) {
    taskIndex = i;
    done = 0;
    calc = off();
    tone = 'info';
    message = nextText(TASKS[i], 0);
  }

  /** @param {string | number} v */
  function switchMode(v) {
    if (v === 'guide') openTask(taskIndex);
    else {
      calc = start();
      tone = 'info';
      message = 'Em bấm tự do. Thử bấm 5 + 2 × 3 = xem máy hiện số mấy nhé.';
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    hideLabel
    options={[
      { value: 'guide', label: 'Bấm theo hướng dẫn' },
      { value: 'free', label: 'Bấm tự do' },
    ]}
    bind:value={mode}
    onchange={switchMode}
  />

  {#if guided}
    <div class="flex flex-wrap items-center justify-between gap-2">
      <p class="text-xl font-semibold text-slate-900">
        Bài {taskIndex + 1}/{TASKS.length}: {t.title}
      </p>
      <p class="font-mono text-lg text-slate-600" aria-label="Các phím đã bấm">
        {t.keys.slice(0, done).join(' ') || '…'}
      </p>
    </div>
  {/if}

  <Calculator {calc} {onpress} {target} />

  <KidNote {tone} text={message} />

  {#if guided}
    <div class="flex flex-wrap justify-center gap-2">
      <button
        type="button"
        class="min-h-12 text-lg {button.quiet}"
        onclick={() => openTask(taskIndex)}>Làm lại</button
      >
      <button
        type="button"
        class="min-h-12 text-lg {finished ? button.primary : button.quiet}"
        onclick={() => openTask((taskIndex + 1) % TASKS.length)}>Bài tiếp theo</button
      >
    </div>
  {/if}
</div>
