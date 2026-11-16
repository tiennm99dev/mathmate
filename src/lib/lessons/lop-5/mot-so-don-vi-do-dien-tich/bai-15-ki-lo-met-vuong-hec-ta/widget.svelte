<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button } from '#lib/core/ui.js';
  import { FULL, TASKS, coverBy, coverNote, mapLabel } from './engine.js';

  const CELL = 30;
  const LEFT = 34;
  const TOP = 34;
  const SIDE = CELL * 10;
  const cells = Array.from({ length: FULL }, (_, i) => i);
  const STEPS = [
    { change: -10, text: '− 10 ha', label: 'Bớt 10 ha, một hàng' },
    { change: -1, text: '− 1 ha', label: 'Bớt 1 ha' },
    { change: 1, text: '+ 1 ha', label: 'Phủ thêm 1 ha' },
    { change: 10, text: '+ 10 ha', label: 'Phủ thêm 10 ha, một hàng' },
  ];

  let index = $state(0);
  let ha = $state(0);

  const task = $derived(TASKS[index % TASKS.length]);
  const note = $derived(coverNote(task, ha));

  /** @type {HTMLElement | undefined} */
  let controls = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  /** @param {number} change */
  async function cover(change) {
    ha = coverBy(ha, change);
    await tick();
    const buttons = controls?.querySelectorAll('button');
    if (ha === task.ha) nextButton?.focus();
    else if (ha === 0) buttons?.[2]?.focus();
    else if (ha === FULL) buttons?.[1]?.focus();
  }

  async function next() {
    index += 1;
    ha = 0;
    await tick();
    controls?.querySelectorAll('button')[2]?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    {task.place} rộng <span class="font-bold text-emerald-700">{task.given}</span>. Em phủ bao nhiêu
    ô 1 ha lên bản đồ?
  </p>

  <svg
    viewBox="0 0 {LEFT + SIDE + 6} {TOP + SIDE + 6}"
    class="mx-auto block w-full max-w-sm"
    role="img"
    aria-label={mapLabel(ha)}
  >
    <text x={LEFT + SIDE / 2} y="14" text-anchor="middle" font-size="15" fill="#334155"
      >1 km = 1 000 m</text
    >
    <line x1={LEFT} y1="22" x2={LEFT + SIDE} y2="22" stroke="#334155" stroke-width="2" />
    <line x1={LEFT} y1="17" x2={LEFT} y2="27" stroke="#334155" stroke-width="2" />
    <line x1={LEFT + SIDE} y1="17" x2={LEFT + SIDE} y2="27" stroke="#334155" stroke-width="2" />
    <text
      x="14"
      y={TOP + CELL / 2 + 5}
      text-anchor="middle"
      font-size="12"
      fill="#047857"
      transform="rotate(-90 14 {TOP + CELL / 2})">100 m</text
    >
    {#each cells as i (i)}
      <rect
        x={LEFT + (i % 10) * CELL}
        y={TOP + Math.floor(i / 10) * CELL}
        width={CELL}
        height={CELL}
        fill={i < ha ? '#34d399' : '#f0fdf4'}
        stroke="#94a3b8"
        stroke-width="1"
      />
    {/each}
    <rect
      x={LEFT}
      y={TOP}
      width={SIDE}
      height={SIDE}
      fill="none"
      stroke="#334155"
      stroke-width="2.5"
    />
    <rect
      x={LEFT}
      y={TOP}
      width={CELL}
      height={CELL}
      fill="none"
      stroke="#b45309"
      stroke-width="2.5"
    />
  </svg>

  <p class="text-center text-base text-slate-600">
    Mỗi ô vuông cạnh 100 m là 1 ha = 10 000 m². Cả bản đồ có 100 ô, là 1 km².
  </p>

  <p class="text-center text-3xl font-bold text-slate-900 tabular-nums" aria-hidden="true">
    {ha} ha
  </p>

  <div class="grid grid-cols-4 gap-2" role="group" aria-label="Phủ ô héc-ta" bind:this={controls}>
    {#each STEPS as s (s.change)}
      <button
        type="button"
        class="min-h-14 px-0 text-lg whitespace-nowrap {button.secondary}"
        aria-label={s.label}
        disabled={(s.change < 0 && ha === 0) || (s.change > 0 && ha === FULL)}
        onclick={() => cover(s.change)}>{s.text}</button
      >
    {/each}
  </div>

  <KidNote tone={note.tone} text={note.text} />

  {#if note.tone === 'ok'}
    <div class="flex justify-center">
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Nơi khác</button
      >
    </div>
  {/if}
</div>
