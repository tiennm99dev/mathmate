<script>
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    CELL,
    COLS,
    GROUND,
    PARTS,
    PIC_H,
    PIC_W,
    ROWS,
    START,
    TASKS,
    layout,
    pictureLabel,
    setMeasure,
    taskNote,
    totalWork,
    workOf,
  } from './engine.js';

  let house = $state(START);
  let task = $state(0);
  let part = $state(/** @type {import('./engine.js').Part} */ (TASKS[0].part));

  const want = $derived(TASKS[task % TASKS.length]);
  const note = $derived(taskNote(want, house));
  const place = $derived(layout(house));
  const work = $derived(workOf(house));

  /** @param {{ x: number, y: number }} p */
  const px = (p) => ({ x: p.x * CELL, y: p.y * CELL });

  const gridX = Array.from({ length: COLS - 1 }, (_, i) => (i + 1) * CELL);
  const gridY = Array.from({ length: ROWS - 1 }, (_, i) => (i + 1) * CELL);
  const partOptions = Object.entries(PARTS).map(([value, p]) => ({ value, label: p.title }));

  function nextTask() {
    task += 1;
    part = TASKS[task % TASKS.length].part;
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">{want.text}</p>

  <GeometryBoard width={PIC_W} height={PIC_H} maxWidth="max-w-xl" label={pictureLabel(house)}>
    {#each gridX as x (x)}
      <line x1={x} y1="0" x2={x} y2={PIC_H} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    {#each gridY as y (y)}
      <line x1="0" y1={y} x2={PIC_W} y2={y} stroke="#E2E8F0" stroke-width="1" />
    {/each}
    <line
      x1="0"
      y1={GROUND * CELL}
      x2={PIC_W}
      y2={GROUND * CELL}
      stroke="#65A30D"
      stroke-width="3"
    />

    <polygon
      points={pointsAttr(place.hill.map(px))}
      fill="#86EFAC"
      stroke="#15803D"
      stroke-width={part === 'hill' ? 4 : 2}
    />
    <circle
      cx={place.sun.x * CELL}
      cy={place.sun.y * CELL}
      r={place.sun.r * CELL}
      fill="#FDE047"
      stroke="#CA8A04"
      stroke-width={part === 'sun' ? 4 : 2}
    />
    <rect
      x={place.wall.x * CELL}
      y={place.wall.y * CELL}
      width={place.wall.w * CELL}
      height={place.wall.h * CELL}
      fill="#BFDBFE"
      stroke="#1D4ED8"
      stroke-width={part === 'wall' ? 4 : 2}
    />
    <polygon
      points={pointsAttr(place.roof.map(px))}
      fill="#FCA5A5"
      stroke="#B91C1C"
      stroke-width={part === 'roof' ? 4 : 2}
    />
  </GeometryBoard>

  <SegmentedControl
    label="Em chọn phần để đo và sửa"
    options={partOptions}
    value={part}
    onchange={(v) => (part = /** @type {import('./engine.js').Part} */ (v))}
  />

  <div class="grid gap-3 sm:grid-cols-3">
    {#each PARTS[part].measures as m (m.key)}
      <div class="rounded-2xl bg-slate-50 px-3 py-2 text-center">
        <p class="text-lg text-slate-700">{m.name}</p>
        <p class="text-2xl font-bold text-slate-900">{house[m.key]} cm</p>
        <CountStepper
          name="xăng-ti-mét {m.name}"
          value={house[m.key]}
          min={m.min(house)}
          max={m.max(house)}
          onchange={(v) => (house = setMeasure(house, m.key, v))}
        />
      </div>
    {/each}
  </div>

  <div class="space-y-1 rounded-2xl bg-indigo-50 px-4 py-3 text-lg text-slate-800">
    <p><strong class="text-red-700">Mái nhà:</strong> {work.roof}</p>
    <p><strong class="text-blue-700">Thân nhà:</strong> {work.wall}</p>
    <p><strong class="text-green-700">Ngọn núi:</strong> {work.hill}</p>
    <p><strong class="text-yellow-700">Mặt trời:</strong> {work.sun}</p>
    <p class="pt-1 text-xl font-bold">Giấy màu cần dùng: {totalWork(house)}</p>
  </div>

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-3">
    <button
      type="button"
      class="min-h-12 text-lg {note.tone === 'ok' ? button.primary : button.secondary}"
      onclick={nextTask}>Thử thách khác</button
    >
  </div>
</div>
