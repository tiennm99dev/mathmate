<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import OrthoViews from '../_shared/ortho-views.svelte';
  import SolidPicture from '../_shared/solid-picture.svelte';
  import { OBJECTS, axisInfo, turnQuarter } from '../_shared/voxel.js';
  import {
    SNAPS,
    SNAP_KEYS,
    SNAP_LABELS,
    TURN,
    axisTex,
    axisWords,
    matchedSnap,
    viewNote,
  } from './engine.js';

  const CHOICES = [
    { value: 'chuL', label: 'Khối chữ L' },
    { value: 'bacThang', label: 'Bậc thang' },
    { value: 'giaChuU', label: 'Giá chữ U' },
    { value: 'ranhSau', label: 'Khối có rãnh sau' },
  ];

  let pick = $state('giaChuU');
  let turns = $state(0);
  let view = $state({ ...SNAPS.iso });
  let said = $state('');

  const solid = $derived.by(() => {
    let s = OBJECTS[/** @type {keyof typeof OBJECTS} */ (pick)];
    for (let i = 0; i < turns; i++) s = turnQuarter(s);
    return s;
  });
  const snap = $derived(matchedSnap(view));
  const note = $derived(viewNote(view));
  const axes = $derived({ ...axisInfo(view), tex: axisTex(view) });
  const name = $derived(CHOICES.find((c) => c.value === pick)?.label ?? '');

  function turnObject() {
    turns = (turns + 1) % 4;
    said = `Đã quay ${name.toLowerCase()} ${turns * 90} độ quanh trục thẳng đứng: ba hình chiếu vẽ lại theo vị trí mới.`;
  }

  /** @param {keyof typeof SNAPS} key */
  function snapTo(key) {
    view = { ...SNAPS[key] };
    said = SNAP_LABELS[key];
  }

  const TRIAD = 34;
  const AXIS_NAMES = ["x'", "y'", "z'"];
  const AXIS_COLORS = ['#dc2626', '#16a34a', '#2563eb'];
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Vật thể"
    options={CHOICES}
    bind:value={pick}
    onchange={() => ((turns = 0), (said = ''))}
  />

  <div class="grid gap-4 md:grid-cols-2">
    <div class="space-y-2">
      <div
        role="slider"
        tabindex="0"
        aria-label="{name} nhìn theo phương chiếu đang chọn. Kéo hoặc dùng phím mũi tên để đổi phương nhìn"
        aria-valuemin={-180}
        aria-valuemax={180}
        aria-valuenow={Math.round(view.yaw)}
        aria-valuetext="Quay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(
          view.pitch,
        )} độ"
        class="relative cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
        use:turnSolid={{ view: () => view, onturn: (v) => (view = v), options: TURN }}
      >
        <SolidPicture {solid} {view} width={360} height={260} />
        <svg
          viewBox="0 0 {TRIAD * 2 + 16} {TRIAD * 2 + 16}"
          class="absolute bottom-1 left-1 w-20"
          aria-hidden="true"
        >
          {#each axes.images as d, i (i)}
            {@const x = TRIAD + 8 + d.x * TRIAD * 0.8}
            {@const y = TRIAD + 8 + d.y * TRIAD * 0.8}
            <line
              x1={TRIAD + 8}
              y1={TRIAD + 8}
              x2={x}
              y2={y}
              stroke={AXIS_COLORS[i]}
              stroke-width="2.5"
              stroke-linecap="round"
            />
            {#if Math.hypot(d.x, d.y) > 0.15}
              <text
                x={TRIAD + 8 + d.x * TRIAD * 1.02}
                y={TRIAD + 12 + d.y * TRIAD * 1.02}
                text-anchor="middle"
                font-size="12"
                font-weight="700"
                fill={AXIS_COLORS[i]}>{AXIS_NAMES[i]}</text
              >
            {/if}
          {/each}
          <circle cx={TRIAD + 8} cy={TRIAD + 8} r="2.5" fill="#0f172a" />
        </svg>
      </div>
      <div class="flex flex-wrap gap-2">
        {#each SNAP_KEYS as key (key)}
          <button
            type="button"
            class={snap === key ? button.secondary : button.quiet}
            aria-pressed={snap === key}
            onclick={() => snapTo(key)}>{SNAP_LABELS[key]}</button
          >
        {/each}
        <button type="button" class={button.quiet} onclick={turnObject}>Quay vật thể 90°</button>
      </div>
    </div>

    <div class="space-y-2">
      <p class="text-sm font-semibold text-slate-700">
        Ba hình chiếu vuông góc (phương pháp chiếu góc thứ nhất)
      </p>
      <OrthoViews
        {solid}
        links
        highlight={snap === 'iso' ? '' : snap}
        label="Ba hình chiếu của {name.toLowerCase()}: hình chiếu đứng ở trên, hình chiếu bằng ở dưới, hình chiếu cạnh bên phải hình chiếu đứng. Nét liền đậm là cạnh thấy, nét đứt là cạnh khuất."
      />
      <p class="text-xs text-slate-500">
        Nét liền đậm: cạnh thấy. Nét đứt: cạnh khuất. Nét mảnh nối các hình: đường dóng.
      </p>
    </div>
  </div>

  <div class="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3" aria-hidden="true">
    <div class="space-y-1">
      <div><Tex math={axes.tex.coefficients} /></div>
      <div><Tex math={axes.tex.angles} /></div>
    </div>
  </div>
  <p class="sr-only">{axisWords(view)}</p>
  <FeedbackNote tone={note.tone} text={note.text} />
  <p class="sr-only" aria-live="polite">{said}</p>
</div>
