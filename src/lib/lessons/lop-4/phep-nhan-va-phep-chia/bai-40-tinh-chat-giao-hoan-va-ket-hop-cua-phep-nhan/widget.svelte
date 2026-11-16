<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { SIDE, boxLabel, countOf, totalOf, turnText, turned } from './engine.js';

  /** One colour per row, for counting row by row across the trays. */
  const ROW_COLORS = [
    'bg-rose-500',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-violet-500',
  ];

  let rows = $state(2);
  let cols = $state(3);
  let layers = $state(4);
  let grouping = $state(/** @type {import('./engine.js').Grouping} */ ('tray'));
  /** The sentence about the last turn, cleared when anything else changes. */
  let turnNote = $state('');

  const box = $derived({ rows, cols, layers });
  const count = $derived(countOf(box, grouping));
  const other = $derived(countOf(box, grouping === 'tray' ? 'row' : 'tray'));
  const message = $derived(
    turnNote || `${count.lines.join(' ')} Đếm cách kia: ${other.expression}. Hai cách bằng nhau!`,
  );

  function turn() {
    const before = { rows, cols, layers };
    const next = turned(before);
    rows = next.rows;
    cols = next.cols;
    turnNote = turnText(before);
  }

  function changed() {
    turnNote = '';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cách đếm số chấm"
    bind:value={grouping}
    options={[
      { value: 'tray', label: 'Đếm từng tầng' },
      { value: 'row', label: 'Đếm từng hàng màu' },
    ]}
    onchange={changed}
  />

  <div
    class="flex flex-wrap justify-center gap-3 rounded-2xl bg-slate-50 p-3"
    role="img"
    aria-label={boxLabel(box)}
  >
    {#each { length: layers } as _, l (l)}
      <div
        class="flex flex-col gap-1.5 rounded-xl border-4 p-2 {grouping === 'tray'
          ? 'border-indigo-400 bg-white'
          : 'border-slate-200 bg-white'}"
      >
        {#each { length: rows } as _, r (r)}
          <div
            class="flex gap-1.5 rounded-full {grouping === 'row' ? 'ring-2 ring-slate-300' : ''}"
          >
            {#each { length: cols } as _, c (c)}
              <span
                class="block h-4 w-4 rounded-full {grouping === 'row'
                  ? ROW_COLORS[r]
                  : 'bg-indigo-500'}"
              ></span>
            {/each}
          </div>
        {/each}
        <span class="text-center text-sm font-semibold text-slate-600">Tầng {l + 1}</span>
      </div>
    {/each}
  </div>

  <p class="text-center text-2xl font-bold tabular-nums text-slate-900">
    {count.expression}
  </p>

  <KidNote tone="info" text={message} />

  <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
    <Stepper label="Số hàng" bind:value={rows} min={SIDE.min} max={SIDE.max} onchange={changed} />
    <Stepper label="Số cột" bind:value={cols} min={SIDE.min} max={SIDE.max} onchange={changed} />
    <Stepper label="Số tầng" bind:value={layers} min={SIDE.min} max={SIDE.max} onchange={changed} />
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={turn}
      >Xoay các tầng</button
    >
    <span class="text-base text-slate-600">Tất cả có {totalOf(box)} chấm.</span>
  </div>
</div>
