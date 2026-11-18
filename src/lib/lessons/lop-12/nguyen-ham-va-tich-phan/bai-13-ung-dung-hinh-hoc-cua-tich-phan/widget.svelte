<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import GraphBox from '#lib/core/visuals/graph-box.svelte';
  import { approxTex, approxText } from '#lib/core/visuals/plot.js';
  import {
    SOLIDS,
    arcAt,
    meridian,
    regionAt,
    samples,
    sectionArea,
    sliceAt,
    turned,
  } from './engine.js';

  /** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */

  const W = 380;
  const H = 300;
  const REGION = '#6366f1';
  const SLICE = '#f59e0b';

  let id = $state('sqrt');
  let angle = $state(90);
  let cut = $state(2);
  let view = $state({ yaw: -28, pitch: 18 });

  const s = $derived(SOLIDS.find((k) => k.id === id) ?? SOLIDS[0]);
  const r = $derived(s.f(cut));
  const area = $derived(sectionArea(s, cut));

  /** @param {string | number} next */
  function choose(next) {
    const k = SOLIDS.find((v) => v.id === next) ?? SOLIDS[0];
    cut = Math.round(((k.a + k.b) / 2) * 10) / 10;
  }

  const reach = $derived(
    Math.max((s.b - s.a) / 2 + 0.8, Math.max(...samples(s.a, s.b, 40).map(s.f))),
  );
  const scale = $derived((Math.min(W, H) / 2 - 18) / reach);
  const mid = $derived(viewPoint({ x: (s.a + s.b) / 2, y: 0, z: 0 }, view));
  /** @param {P3} p */
  const at = (p) => {
    const v = viewPoint(p, view);
    return { x: W / 2 + scale * (v.x - mid.x), y: H / 2 + scale * (v.y - mid.y) };
  };
  /** @param {P3[]} pts */
  const line = (pts) => pointsAttr(pts.map(at));

  const rings = $derived(samples(s.a, s.b, 8).map((x) => line(arcAt(s, x, angle))));
  const meridians = $derived(
    Array.from({ length: Math.floor(angle / 30) + 1 }, (_, i) => line(meridian(s, i * 30))),
  );
  const axisFrom = $derived(at({ x: s.a - 0.7, y: 0, z: 0 }));
  const axisTo = $derived(at({ x: s.b + 0.9, y: 0, z: 0 }));
  const radiusEnd = $derived(at(turned(cut, r, angle)));
  const cutCentre = $derived(at({ x: cut, y: 0, z: 0 }));

  const full = $derived(angle >= 360);
  const note = $derived(
    full
      ? `Quay đủ một vòng, miền phẳng tạo thành ${s.name}. Mặt phẳng vuông góc với $Ox$ tại $x = ${numTex(cut)}$ cắt khối theo hình tròn bán kính $f(${numTex(cut)}) ${approxTex(r)}$, diện tích $S(x) = \\pi f^2(x) ${approxTex(area)}$. Cộng các lát mỏng: $V = \\pi\\displaystyle\\int_{${numTex(s.a)}}^{${numTex(s.b)}} ${s.squareTex}\\,\\mathrm{d}x = ${s.valueTex} ${approxTex(s.volume)}$.`
      : `Miền phẳng đã quay được $${formatNumber(angle)}^\\circ$. Mỗi điểm của đồ thị vạch nên một cung tròn tâm trên trục $Ox$; điểm ở hoành độ $x = ${numTex(cut)}$ cách trục $f(${numTex(cut)}) ${approxTex(r)}$. Kéo thanh góc quay tới $360^\\circ$ để được khối tròn xoay.`,
  );
  const label = $derived(
    `Khối tròn xoay sinh ra khi quay miền dưới đồ thị ${s.label} trên đoạn từ ${formatNumber(s.a)} đến ${formatNumber(s.b)} quanh trục Ox, đã quay ${formatNumber(angle)} độ; lát cắt tại x = ${formatNumber(cut)} có bán kính ${approxText(r)}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Miền phẳng dưới đồ thị"
    options={SOLIDS.map((k) => ({ value: k.id, label: k.label }))}
    bind:value={id}
    onchange={choose}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Góc quay quanh Ox"
      bind:value={angle}
      min={0}
      max={360}
      step={15}
      format={(v) => `${formatNumber(v)}°`}
    />
    <SliderField label="Vị trí lát cắt x" bind:value={cut} min={s.a} max={s.b} step={0.1} />
  </div>

  <div class="grid gap-3 lg:grid-cols-2">
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">Trong không gian (kéo để xoay hình)</p>
      <div
        role="slider"
        tabindex="0"
        aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay hình"
        aria-valuemin={-180}
        aria-valuemax={180}
        aria-valuenow={Math.round(view.yaw)}
        aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(
          view.pitch,
        )} độ"
        class="cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
        use:turnSolid={{
          view: () => view,
          onturn: (v) => (view = v),
          options: { yawRate: 0.6, minPitch: -30 },
        }}
      >
        <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
          <polygon points={line(regionAt(s, 0))} fill={REGION} fill-opacity="0.12" stroke="none" />
          {#each meridians as m, i (i)}
            <polyline points={m} fill="none" stroke="#a5b4fc" stroke-width="1.2" />
          {/each}
          {#each rings as ring, i (i)}
            <polyline points={ring} fill="none" stroke="#818cf8" stroke-width="1.2" />
          {/each}
          <polygon
            points={line(sliceAt(s, cut, angle))}
            fill={SLICE}
            fill-opacity="0.45"
            stroke="#b45309"
            stroke-width="1.5"
          />
          <polygon
            points={line(regionAt(s, angle))}
            fill={REGION}
            fill-opacity="0.35"
            stroke={REGION}
            stroke-width="2"
          />
          <line
            x1={axisFrom.x}
            y1={axisFrom.y}
            x2={axisTo.x}
            y2={axisTo.y}
            stroke="#334155"
            stroke-width="1.6"
          />
          <text x={axisTo.x + 6} y={axisTo.y + 5} font-size="15" font-style="italic" fill="#334155"
            >x</text
          >
          <line
            x1={cutCentre.x}
            y1={cutCentre.y}
            x2={radiusEnd.x}
            y2={radiusEnd.y}
            stroke="#b45309"
            stroke-width="2.5"
          />
          <circle cx={radiusEnd.x} cy={radiusEnd.y} r="4" fill="#b45309" />
        </svg>
      </div>
    </div>
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">Miền phẳng ban đầu và lát cắt</p>
      <GraphBox
        labelPoints
        left={40}
        xTicks={6}
        win={{ xMin: s.a - 0.5, xMax: s.b + 0.5, yMin: -0.5, yMax: 2.5 }}
        label="Miền phẳng giới hạn bởi đồ thị {s.label}, trục hoành và hai đường thẳng x = {formatNumber(
          s.a,
        )}, x = {formatNumber(s.b)}; đường thẳng x = {formatNumber(cut)} là vị trí lát cắt."
        regions={[{ f: s.f, from: s.a, to: s.b, color: REGION, opacity: 0.25 }]}
        curves={[{ f: s.f, color: '#4338ca', from: s.a, to: s.b }]}
        lines={[{ c: cut, vertical: true, color: SLICE }]}
        points={[{ x: cut, y: r, color: '#b45309' }]}
      />
    </div>
  </div>

  <div class="overflow-x-auto text-center">
    <Tex
      display
      math={`V = \\pi\\int_{${numTex(s.a)}}^{${numTex(s.b)}} \\left(${s.fTex}\\right)^2\\mathrm{d}x = ${s.valueTex}`}
    />
  </div>
  <FeedbackNote tone={full ? 'ok' : 'info'} text={note} />
</div>
