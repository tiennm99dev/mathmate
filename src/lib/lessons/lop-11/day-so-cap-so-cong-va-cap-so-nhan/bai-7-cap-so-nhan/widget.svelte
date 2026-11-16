<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import TermChart from '../_shared/term-chart.svelte';
  import { geometricSum, geometricTerm, termTex } from '../_shared/sequence.js';
  import { RATIOS, bacteriaText, paperText } from './engine.js';

  const MAX_STEPS = 12;

  let story = $state(/** @type {'paper' | 'bacteria' | 'free'} */ ('paper'));
  let n = $state(4);
  let first = $state(3);
  let ratio = $state('1');

  const q = $derived.by(() => {
    if (story !== 'free') return 2;
    const [a, b] = RATIOS[Number(ratio)];
    return a / b;
  });
  const u1 = $derived(story === 'paper' ? 2 : story === 'bacteria' ? 1000 : first);
  const qTex = $derived(termTex(q));
  /** @param {number} v a number as TeX, in brackets when negative or a fraction */
  const wrap = (v) => (v < 0 || !Number.isInteger(v) ? `\\left(${termTex(v)}\\right)` : termTex(v));
  const terms = $derived(Array.from({ length: n }, (_, i) => geometricTerm(u1, q, i + 1)));
  const un = $derived(terms[n - 1]);
  const sum = $derived(geometricSum(u1, q, n));

  const storyLine = $derived(
    story === 'paper'
      ? paperText(n)
      : story === 'bacteria'
        ? bacteriaText(n)
        : `$u_{${n}} = ${termTex(u1)} \\cdot ${wrap(q)}^{${n - 1}} = ${termTex(un)}$.`,
  );
  const ratioLine = $derived(
    n === 1
      ? 'Bấm "Thêm một bước" để xem số hạng tiếp theo.'
      : `Mỗi số hạng bằng số hạng đứng trước nhân với $q = ${qTex}$: $u_{${n}} = u_{${n - 1}} \\cdot q = ${wrap(terms[n - 2])} \\cdot ${wrap(q)} = ${termTex(un)}$. ${
          q < 0
            ? 'Vì $q < 0$, các số hạng đổi dấu liên tiếp.'
            : Math.abs(q) < 1
              ? 'Vì $0 < q < 1$, các số hạng nhỏ dần về gần $0$.'
              : 'Vì $q > 1$, mỗi bước tăng gấp $q$ lần: dãy tăng rất nhanh.'
        }`,
  );
  const ratioOptions = RATIOS.map(([a, b], i) => ({
    value: String(i),
    label: `q = ${a < 0 ? '−' : ''}${Math.abs(a)}${b === 1 ? '' : `/${b}`}`,
  }));
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    options={[
      { value: 'paper', label: 'Gấp giấy' },
      { value: 'bacteria', label: 'Vi khuẩn' },
      { value: 'free', label: 'Tự chọn' },
    ]}
    bind:value={story}
  />

  {#if story === 'free'}
    <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <SliderField label="Số hạng đầu u₁" bind:value={first} min={1} max={6} />
      <SegmentedControl label="Công bội" options={ratioOptions} bind:value={ratio} />
    </div>
  {:else}
    <p class="text-sm text-slate-700">
      {story === 'paper'
        ? 'Một tờ giấy dày 0,1 mm. Mỗi lần gấp đôi, số lớp giấy tăng gấp đôi: uₙ là số lớp sau n lần gấp.'
        : 'Ban đầu có 500 con vi khuẩn, cứ 20 phút số lượng tăng gấp đôi: uₙ là số vi khuẩn sau n lần nhân đôi.'}
    </p>
  {/if}

  <TermChart
    {terms}
    title={story === 'paper'
      ? 'Số lớp giấy sau mỗi lần gấp'
      : story === 'bacteria'
        ? 'Số vi khuẩn sau mỗi lần nhân đôi'
        : 'Các số hạng của cấp số nhân'}
    highlight={n - 1}
    color="#059669"
  />

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField label="Số bước n" bind:value={n} min={1} max={MAX_STEPS} />
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.primary}
        disabled={n >= MAX_STEPS}
        onclick={() => (n = Math.min(MAX_STEPS, n + 1))}>Thêm một bước</button
      >
      <button type="button" class={button.quiet} onclick={() => (n = 1)}>Về bước 1</button>
    </div>
  </div>

  <FeedbackNote tone="info" text={storyLine} />
  <FeedbackNote tone="ok" text={ratioLine} />

  <div class="overflow-x-auto text-center">
    <Tex display math={'u_n = u_1 q^{n-1}'} />
    <Tex
      display
      math={`S_{${n}} =${q === 1 ? `${n}u_1` : `\\dfrac{u_1(1 - q^{${n}})}{1 - q}`} = ${termTex(sum)}`}
    />
  </div>
</div>
