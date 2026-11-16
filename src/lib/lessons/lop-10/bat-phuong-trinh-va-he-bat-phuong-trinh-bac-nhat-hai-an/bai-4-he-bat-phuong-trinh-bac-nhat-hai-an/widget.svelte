<script>
  import { clipToBox } from '#lib/algebra-engine/system.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { eqTex } from '#lib/core/algebra-text.js';
  import { formatNumber, intText } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import RegionLayer from '../_shared/region-layer.svelte';
  import { ineqTex, ineqText, optimize, pointText } from '../_shared/half-plane.js';
  import { BOX, PRESETS, levelRange, levelVerdict, namedVertices } from './engine.js';

  const plane = planeScale({ ...BOX, width: 440 });
  const { mx, my } = plane;
  const LEVEL = '#ea580c';

  let presetIndex = $state(0);
  const preset = $derived(PRESETS[presetIndex]);
  let shown = $state(PRESETS[0].items.map(() => true));
  let p = $state(PRESETS[0].p);
  let q = $state(PRESETS[0].q);
  let k = $state(0);
  let showTable = $state(false);

  const allShown = $derived(shown.every(Boolean));
  const vertices = $derived(namedVertices(preset.items.map((it) => it.ineq)));
  const range = $derived(levelRange(p, q));
  const levelSeg = $derived(
    p === 0 && q === 0
      ? null
      : clipToBox({ a: p, b: q, c: k }, BOX.xMin, BOX.xMax, BOX.yMin, BOX.yMax),
  );
  const best = $derived(
    optimize(
      vertices.map((v) => v.pt),
      p,
      q,
    ),
  );
  const feedback = $derived(
    allShown
      ? levelVerdict(vertices, p, q, k)
      : {
          tone: /** @type {const} */ ('info'),
          text: 'Bật đủ các bất phương trình để thấy miền nghiệm của cả hệ (phần không bị gạch).',
        },
  );

  /** @param {string | number} value */
  function choosePreset(value) {
    const next = PRESETS[Number(value)];
    shown = next.items.map(() => true);
    p = next.p;
    q = next.q;
    k = 0;
    showTable = false;
  }

  /** @param {number} i */
  function toggle(i) {
    shown = shown.map((s, j) => (j === i ? !s : s));
  }

  function clampK() {
    k = Math.min(range.max, Math.max(range.min, k));
    showTable = false;
  }

  const fTex = $derived(`F = ${eqTex(p, q, 0).replace(' = 0', '')}`);
  const visible = $derived(preset.items.filter((_, i) => shown[i]));
  const plotLabel = $derived(
    `Mặt phẳng toạ độ: ${visible.map((it) => ineqText(it.ineq)).join('; ') || 'chưa bật bất phương trình nào'}${allShown && vertices.length ? `. Miền nghiệm là đa giác ${vertices.map((v) => `${v.name}${pointText(v.pt)}`).join(', ')}` : ''}. Đường mức F = ${formatNumber(k)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hệ bất phương trình"
    bind:value={presetIndex}
    onchange={choosePreset}
    options={PRESETS.map((pr, i) => ({ value: i, label: pr.name }))}
  />

  <fieldset class="min-w-0 rounded-lg border border-slate-200 bg-white p-3">
    <legend class="px-1 text-sm font-semibold text-slate-700">
      Bấm để chồng từng nửa mặt phẳng nghiệm
    </legend>
    <div class="flex flex-wrap gap-2">
      {#each preset.items as it, i (i)}
        <button
          type="button"
          class="min-h-11 rounded-lg border-2 px-3 py-1 {focusRing} {shown[i]
            ? 'bg-white'
            : 'bg-slate-100 opacity-60'}"
          style:border-color={it.color}
          aria-pressed={shown[i]}
          onclick={() => toggle(i)}
        >
          <Tex math={ineqTex(it.ineq)} ariaLabel={ineqText(it.ineq)} />
        </button>
      {/each}
    </div>
  </fieldset>

  <CoordinatePlane {plane} label={plotLabel} interactive={false}>
    {#snippet children(pl)}
      <RegionLayer plane={pl} items={visible} region={allShown ? vertices.map((v) => v.pt) : []} />
      {#if levelSeg}
        <line
          x1={mx(levelSeg[0].x)}
          y1={my(levelSeg[0].y)}
          x2={mx(levelSeg[1].x)}
          y2={my(levelSeg[1].y)}
          stroke={LEVEL}
          stroke-width="3"
          stroke-linecap="round"
        />
      {/if}
      {#if allShown}
        {#each vertices as v, i (v.name)}
          {@const top = best.argMax.includes(i) || best.argMin.includes(i)}
          <circle
            cx={mx(v.pt.x)}
            cy={my(v.pt.y)}
            r={showTable && top ? 6 : 4}
            fill={showTable && top ? LEVEL : '#0f172a'}
          />
          <text
            x={mx(v.pt.x) + 6}
            y={my(v.pt.y) - 6}
            font-size="12"
            font-weight="700"
            fill="#0f172a"
            style="pointer-events:none">{v.name}</text
          >
        {/each}
      {/if}
    {/snippet}
  </CoordinatePlane>

  <div class="grid gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 sm:grid-cols-2">
    <div class="min-w-0 space-y-2">
      <p class="text-center text-lg"><Tex math={fTex} /></p>
      <Stepper label="p" bind:value={p} min={-5} max={5} format={intText} onchange={clampK} />
      <Stepper label="q" bind:value={q} min={-5} max={5} format={intText} onchange={clampK} />
    </div>
    <div class="min-w-0">
      <SliderField
        label="Đường mức F = k, kéo k"
        bind:value={k}
        min={range.min}
        max={range.max}
        step={0.5}
        oninput={() => (showTable = false)}
      />
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if allShown && vertices.length && !(p === 0 && q === 0)}
    <button type="button" class={button.secondary} onclick={() => (showTable = !showTable)}>
      {showTable ? 'Ẩn bảng giá trị' : 'Tính F tại các đỉnh'}
    </button>
    {#if showTable}
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <caption class="mb-1 text-left text-slate-600"
            >Giá trị của F tại các đỉnh của miền nghiệm</caption
          >
          <thead>
            <tr class="border-b border-slate-300 text-left">
              <th class="py-1 pr-3">Đỉnh</th>
              <th class="py-1 pr-3">F</th>
              <th class="py-1">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {#each vertices as v, i (v.name)}
              <tr class="border-b border-slate-100">
                <td class="py-1 pr-3">{v.name}{pointText(v.pt)}</td>
                <td class="py-1 pr-3 tabular-nums">{formatNumber(best.values[i])}</td>
                <td class="py-1 font-semibold text-orange-700">
                  {best.argMax.includes(i) ? 'lớn nhất' : ''}{best.argMin.includes(i)
                    ? 'nhỏ nhất'
                    : ''}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/if}
</div>
