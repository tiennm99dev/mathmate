<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { BASES, powerBase } from '../_shared/plot.js';
  import {
    DENOMINATORS,
    DIGITS_MAX,
    IRRATIONALS,
    M_MAX,
    M_MIN,
    N_MAX,
    N_MIN,
    approximations,
    integerTex,
    rationalTex,
    windowFor,
  } from './engine.js';

  const CURVE = '#94a3b8';
  const DOT = '#4f46e5';
  const NOW = '#e11d48';
  const CHOICES = [BASES[2], BASES[3], BASES.half];

  let baseId = $state('2');
  let mode = $state('int');
  let n = $state(2);
  let m = $state(3);
  let q = $state(2);
  let alphaId = $state('sqrt2');
  let k = $state(1);

  const base = $derived(CHOICES.find((b) => b.id === baseId) ?? CHOICES[0]);
  const a = $derived(base.value);
  const win = $derived(windowFor(base));
  const alpha = $derived(IRRATIONALS.find((x) => x.id === alphaId) ?? IRRATIONALS[0]);
  const steps = $derived(approximations(base, alpha.value, k));

  /** The exponents the current mode can reach, as dots on the graph. */
  const reach = $derived.by(() => {
    if (mode === 'int') {
      return Array.from({ length: N_MAX - N_MIN + 1 }, (_, i) => N_MIN + i);
    }
    if (mode === 'rat') {
      const out = [];
      for (let p = Math.ceil(win.xMin * q); p <= Math.floor(win.xMax * q); p++) out.push(p / q);
      return out;
    }
    return steps.map((s) => s.r);
  });
  const current = $derived(mode === 'int' ? n : mode === 'rat' ? m / q : steps[steps.length - 1].r);
  const points = $derived([
    ...reach.map((x) => ({ x, y: a ** x, color: DOT, r: 3.5 })),
    ...(mode === 'real'
      ? [{ x: alpha.value, y: a ** alpha.value, color: NOW, hollow: true, r: 7 }]
      : []),
    { x: current, y: a ** current, color: NOW, r: 6 },
  ]);
  const curves = $derived([
    { f: (/** @type {number} */ x) => a ** x, color: CURVE, width: 2, dashed: mode !== 'real' },
  ]);

  const formula = $derived(
    mode === 'int'
      ? integerTex(base, n)
      : mode === 'rat'
        ? rationalTex(base, m, q)
        : `${powerBase(base)}^{${numTex(current)}} \\approx ${numTex(a ** current, 6)}`,
  );

  const note = $derived.by(() => {
    if (mode === 'int')
      return n < 0
        ? `Số mũ nguyên âm: $a^{-n} = \\dfrac{1}{a^n}$. Với số mũ nguyên, ta chỉ có các điểm rời rạc trên đồ thị.`
        : `Số mũ nguyên dương là tích của $n$ thừa số $a$; quy ước $a^0 = 1$. Các điểm còn rời rạc: giữa hai số nguyên chưa có luỹ thừa nào.`;
    if (mode === 'rat')
      return `Với mẫu $n = ${q}$, các số mũ $\\dfrac{m}{${q}}$ lấp thêm điểm vào giữa: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$ (cần $a > 0$). Tăng mẫu, các điểm ngày càng dày.`;
    const target = a ** alpha.value;
    const gap = Math.abs(target - a ** current);
    return `$r_{${k}} = ${numTex(current)}$ là số hữu tỉ gần $${alpha.tex}$; $${powerBase(base)}^{r_{${k}}}$ cách $${powerBase(base)}^{${alpha.tex}} \\approx ${numTex(target, 6)}$ khoảng $${numTex(gap, 6)}$. Khi $r_k \\to ${alpha.tex}$ thì $${powerBase(base)}^{r_k} \\to ${powerBase(base)}^{${alpha.tex}}$.`;
  });
  const monotone = $derived(
    a > 1
      ? `Cơ số $a = ${base.tex} > 1$: số mũ càng lớn thì luỹ thừa càng lớn.`
      : `Cơ số $0 < a = ${base.tex} < 1$: số mũ càng lớn thì luỹ thừa càng nhỏ.`,
  );
  const label = $derived(
    `Đồ thị các luỹ thừa của ${base.text} với số mũ ${
      mode === 'int' ? 'nguyên' : mode === 'rat' ? `có mẫu ${q}` : 'xấp xỉ số vô tỉ'
    }; điểm đang chọn có số mũ ${formatNumber(current, 6)}, giá trị khoảng ${formatNumber(a ** current, 4)}.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Cơ số a"
      options={CHOICES.map((b) => ({ value: b.id, label: b.text }))}
      bind:value={baseId}
    />
    <SegmentedControl
      label="Loại số mũ"
      options={[
        { value: 'int', label: 'Nguyên' },
        { value: 'rat', label: 'Hữu tỉ' },
        { value: 'real', label: 'Thực' },
      ]}
      bind:value={mode}
    />
  </div>

  {#if mode === 'int'}
    <SliderField label="Số mũ nguyên n" bind:value={n} min={N_MIN} max={N_MAX} />
  {:else if mode === 'rat'}
    <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <SliderField label="Tử số m" bind:value={m} min={M_MIN} max={M_MAX} />
      <SegmentedControl
        label="Mẫu số n"
        options={DENOMINATORS.map((d) => ({ value: d, label: String(d) }))}
        bind:value={q}
      />
    </div>
  {:else}
    <div class="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-end">
      <SegmentedControl
        label="Số mũ vô tỉ α"
        options={IRRATIONALS.map((x) => ({ value: x.id, label: x.id === 'pi' ? 'π' : '√2' }))}
        bind:value={alphaId}
      />
      <SliderField label="Số chữ số thập phân của rₖ" bind:value={k} min={0} max={DIGITS_MAX} />
    </div>
  {/if}

  <div class="overflow-x-auto text-center">
    <Tex display math={formula} />
  </div>

  <GraphBox {win} {label} {curves} {points} />

  {#if mode === 'real'}
    <div class="overflow-x-auto">
      <table class="w-full min-w-72 text-sm tabular-nums">
        <thead>
          <tr class="text-slate-600">
            <th class="px-2 py-1 text-left font-semibold">r<sub>k</sub></th>
            <th class="px-2 py-1 text-left font-semibold"
              >{base.value < 1 ? `(${base.text})` : base.text}<sup>r<sub>k</sub></sup></th
            >
          </tr>
        </thead>
        <tbody>
          {#each steps as s, i (i)}
            <tr class="border-t border-slate-100">
              <td class="px-2 py-1">{formatNumber(s.r, 6)}</td>
              <td class="px-2 py-1">{formatNumber(s.value, 6)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone="ok" text={monotone} />
</div>
