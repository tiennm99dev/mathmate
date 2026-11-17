<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { MODELS, atHit, mass, population, timeToFall, timeToGrow, yearsShown } from './engine.js';

  const CURVE = '#4f46e5';
  const TARGET = '#059669';
  const NOW = '#e11d48';
  const A = 100;
  const M0 = 100;
  const YEARS = 80;

  let model = $state('growth');
  let rate = $state(1.5);
  let k = $state(2);
  let half = $state(10);
  let p = $state(25);
  let t = $state(20);

  const growth = $derived(model === 'growth');
  const r = $derived(rate / 100);
  const level = $derived(growth ? k * A : (M0 * p) / 100);
  const hit = $derived(growth ? timeToGrow(r, k) : timeToFall(half, p));
  const tMax = $derived(growth ? yearsShown(hit, YEARS) : 5 * half);
  const step = $derived(growth ? 1 : 0.5);
  const f = $derived(
    growth
      ? (/** @type {number} */ x) => population(A, r, x)
      : (/** @type {number} */ x) => mass(M0, half, x),
  );
  const win = $derived({
    xMin: 0,
    xMax: tMax,
    yMin: 0,
    yMax: growth ? Math.max(population(A, r, tMax), level) * 1.08 : M0 * 1.08,
  });
  const now = $derived(Math.min(t, tMax));

  const curves = $derived([
    { f, color: CURVE },
    { f: () => level, color: TARGET, width: 2, dashed: true },
  ]);
  const points = $derived([
    { x: hit, y: level, color: TARGET, r: 6 },
    { x: now, y: f(now), color: NOW, r: 7 },
  ]);
  const guides = $derived([
    { x1: hit, y1: 0, x2: hit, y2: level, color: TARGET },
    { x1: now, y1: 0, x2: now, y2: f(now), color: NOW },
  ]);

  const formula = $derived(
    growth
      ? `S(t) = ${A} \\cdot e^{${numTex(r, 4)}t}`
      : `m(t) = ${M0} \\cdot \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{${half}}}`,
  );
  const reading = $derived(
    growth
      ? `Sau $t = ${numTex(now)}$ năm: $S \\approx ${numTex(f(now), 1)}$ triệu người.`
      : `Sau $t = ${numTex(now)}$ năm: $m \\approx ${numTex(f(now), 2)}$ g.`,
  );
  const solved = $derived(
    growth
      ? `$${A} \\cdot e^{${numTex(r, 4)}t} = ${numTex(level)} \\iff e^{${numTex(r, 4)}t} = ${numTex(k)} \\iff t = \\dfrac{\\ln ${numTex(k)}}{${numTex(r, 4)}} \\approx ${numTex(hit, 1)}$ năm.`
      : `$${M0} \\cdot \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{${half}}} = ${numTex(level)} \\iff \\dfrac{t}{${half}} = \\log_{\\frac{1}{2}} ${numTex(p / 100)} \\iff t = ${half} \\log_2 \\dfrac{100}{${p}} \\approx ${numTex(hit, 1)}$ năm.`,
  );
  const compare = $derived(
    atHit(now, hit, step)
      ? 'Điểm đỏ đã chạm giao điểm (sai khác không quá nửa bước kéo): đây là thời điểm cần tìm.'
      : growth
        ? `Kéo $t$ đến khi $S(t)$ chạm đường $y = ${numTex(level)}$; hiện ${now < hit ? 'chưa tới' : 'đã vượt'}.`
        : `Kéo $t$ đến khi $m(t)$ chạm đường $y = ${numTex(level)}$; hiện ${now < hit ? 'chưa xuống tới' : 'đã xuống dưới'}.`,
  );
  const label = $derived(
    growth
      ? `Đồ thị dân số S theo năm t với tỉ lệ tăng ${formatNumber(rate)}% một năm; đạt ${formatNumber(level)} triệu người sau khoảng ${formatNumber(hit, 1)} năm.`
      : `Đồ thị khối lượng chất phóng xạ theo năm t với chu kì bán rã ${half} năm; còn ${p}% sau khoảng ${formatNumber(hit, 1)} năm.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mô hình"
    options={MODELS.map((m) => ({ value: m.id, label: m.label }))}
    bind:value={model}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={formula} />
  </div>

  {#if growth}
    <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <SliderField
        label="Tỉ lệ tăng dân số r"
        bind:value={rate}
        min={0.5}
        max={3}
        step={0.1}
        format={(v) => `${formatNumber(v)}% một năm`}
      />
      <SegmentedControl
        label="Mục tiêu (gấp k lần)"
        options={[1.5, 2, 3].map((v) => ({ value: v, label: `${formatNumber(v)} lần` }))}
        bind:value={k}
      />
    </div>
  {:else}
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="Chu kì bán rã T" bind:value={half} min={2} max={20} unit="năm" />
      <SliderField label="Còn lại p" bind:value={p} min={5} max={90} step={5} unit="%" />
    </div>
  {/if}

  <GraphBox {win} {label} {curves} {points} {guides} />

  <SliderField label="Thời gian t" bind:value={t} min={0} max={tMax} {step} unit="năm" />

  <FeedbackNote tone="info" text={reading} />
  <FeedbackNote tone="ok" text={solved} />
  <FeedbackNote tone="info" text={compare} />
</div>
