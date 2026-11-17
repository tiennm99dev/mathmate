<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { num } from '../_shared/figures.js';
  import {
    SLICES,
    areaLine,
    rowSize,
    sliceNote,
    slicePath,
    slicePlaces,
    turnBetween,
  } from './engine.js';

  /** The radius of the cut circle, in cm, and its size on the board. */
  const RADIUS = 3;
  const R = 60;
  const W = 300;
  const H = 185;
  const CENTER = { x: 150, y: 80 };
  const ROW = { x: 60, y: 150 };

  let n = $state(16);
  let progress = $state(0);

  const u = $derived(progress / 100);
  const theta = $derived((2 * Math.PI) / n);
  const path = $derived(slicePath(R, theta));
  const chord = $derived(2 * R * Math.sin(theta / 2));
  const size = $derived(rowSize(n, R));
  const laid = $derived(progress === 100);
  const note = $derived(sliceNote(n, RADIUS, laid));

  const slices = $derived(
    Array.from({ length: n }, (_, i) => {
      const p = slicePlaces(n, R, i);
      const x = CENTER.x + (ROW.x + p.row.x - CENTER.x) * u;
      const y = CENTER.y + (ROW.y + p.row.y - CENTER.y) * u;
      return { i, x, y, rot: turnBetween(p.circle.rot, p.row.rot, u), up: p.up };
    }),
  );

  const label = $derived(
    laid
      ? `${n} phần của hình tròn bán kính ${num(RADIUS)} cm được ghép thành một hàng, gần giống hình chữ nhật: chiều dài bằng nửa chu vi, chiều rộng bằng bán kính.`
      : `Hình tròn bán kính ${num(RADIUS)} cm được cắt thành ${n} phần bằng nhau, nửa bên phải màu xanh, nửa bên trái màu cam.`,
  );

  const options = SLICES.map((v) => ({ value: v, label: `${v} phần` }));

  /** @param {number} v */
  const stage = (v) => (v === 0 ? 'Hình tròn' : v === 100 ? 'Đã ghép xong' : 'Đang ghép');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cắt hình tròn thành"
    {options}
    value={n}
    onchange={(v) => (n = Number(v))}
  />

  <GeometryBoard width={W} height={H} maxWidth="max-w-xl" {label}>
    {#each slices as s (s.i)}
      <path
        d={path}
        transform="translate({s.x} {s.y}) rotate({s.rot})"
        fill={s.up ? '#93C5FD' : '#FDBA74'}
        stroke="#1E293B"
        stroke-width="1"
        stroke-linejoin="round"
      />
    {/each}
    {#if progress === 0}
      <circle cx={CENTER.x} cy={CENTER.y} r="4" fill="#1E293B" />
      <line
        x1={CENTER.x}
        y1={CENTER.y}
        x2={CENTER.x + R}
        y2={CENTER.y}
        stroke="#047857"
        stroke-width="3"
      />
      <text
        x={CENTER.x + R / 2}
        y={CENTER.y - 6}
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill="#047857">r</text
      >
    {/if}
    {#if laid}
      <rect
        x={ROW.x - chord / 2}
        y={ROW.y - R}
        width={size.length}
        height={R}
        fill="none"
        stroke="#DC2626"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
      <text
        x={ROW.x - chord / 2 + size.length / 2}
        y={ROW.y + 24}
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill="#DC2626">≈ nửa chu vi = r × 3,14</text
      >
      <text
        x={ROW.x - chord / 2 - 6}
        y={ROW.y - R / 2 + 5}
        text-anchor="end"
        font-size="17"
        font-weight="700"
        fill="#047857">r</text
      >
    {/if}
  </GeometryBoard>

  <SliderField
    label="Cắt và ghép"
    bind:value={progress}
    min={0}
    max={100}
    step={5}
    format={stage}
  />

  <div class="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-xl text-slate-800">
    <p>Bán kính <strong class="text-emerald-700">r = {num(RADIUS)} cm</strong></p>
    <p class="mt-1 font-bold">{areaLine(RADIUS)}</p>
  </div>

  <KidNote tone={note.tone} text={note.text} />
</div>
