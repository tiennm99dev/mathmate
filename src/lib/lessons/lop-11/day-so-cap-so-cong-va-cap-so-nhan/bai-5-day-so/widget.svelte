<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import TermChart from '../_shared/term-chart.svelte';
  import { eqTex, generalTerms, recursiveTerms, termText, trend } from '../_shared/sequence.js';
  import { PRESETS, evaluate, formulaTex, parseFormula } from './engine.js';

  let mode = $state(/** @type {'general' | 'recursive'} */ ('general'));
  let general = $state('n/(n+1)');
  let first = $state('1');
  let step = $state('2u + 1');
  let count = $state(8);
  let pickedTerm = $state(1);
  const helpId = $props.id();

  const parsed = $derived(
    mode === 'general' ? parseFormula(general, ['n']) : parseFormula(step, ['u', 'n']),
  );
  const firstParsed = $derived(parseFormula(first, []));
  const error = $derived(
    !parsed.ok
      ? parsed.error
      : mode === 'recursive' && !firstParsed.ok
        ? `Số hạng đầu: ${firstParsed.error}`
        : '',
  );

  const terms = $derived.by(() => {
    if (!parsed.ok) return [];
    const node = parsed.node;
    if (mode === 'general') return generalTerms((n) => evaluate(node, { n }), count);
    if (!firstParsed.ok) return [];
    const u1 = evaluate(firstParsed.node, {});
    return recursiveTerms(u1, (u, n) => evaluate(node, { u, n }), count);
  });

  const k = $derived(Math.min(pickedTerm, count));
  const definitionTex = $derived.by(() => {
    if (!parsed.ok) return '';
    if (mode === 'general') return `u_n = ${formulaTex(parsed.node)}`;
    const u1 = firstParsed.ok ? formulaTex(firstParsed.node) : '?';
    return `\\begin{cases} u_1 = ${u1} \\\\ u_n = ${formulaTex(parsed.node)} \\ (n \\ge 2) \\end{cases}`;
  });
  const termLine = $derived.by(() => {
    if (!terms.length) return '';
    const t = terms[k - 1];
    if (mode === 'general' && parsed.ok) {
      return `$u_{${k}}$: thay $n = ${k}$ vào công thức, được $u_{${k}} ${eqTex(t)}$.`;
    }
    if (k === 1) return `$u_1 ${eqTex(t)}$ là số hạng đầu đã cho.`;
    return `$u_{${k}}$ tính từ $u_{${k - 1}} ${eqTex(terms[k - 2])}$ với $n = ${k}$: $u_{${k}} ${eqTex(t)}$.`;
  });

  const values = $derived(/** @type {number[]} */ (terms.filter((t) => t !== null)));
  const verdict = $derived.by(() => {
    if (error) return '';
    const tr = trend(terms);
    const shown = `Trong ${count} số hạng đầu`;
    if (tr === 'undefined')
      return `${shown} có số hạng không tính được (chia cho $0$, căn bậc hai của số âm, hoặc quá lớn để vẽ). Nếu công thức không xác định tại một số nguyên dương $n$ nào đó thì nó không cho một dãy số trên toàn bộ $\\mathbb{N}^*$.`;
    const lo = formatNumber(Math.min(...values), 3);
    const hi = formatNumber(Math.max(...values), 3);
    const range = `các số hạng nằm giữa ${lo} và ${hi}.`;
    if (tr === 'increasing')
      return `${shown}, số hạng sau luôn lớn hơn số hạng trước ($u_{n+1} - u_n > 0$): dãy có vẻ tăng; ${range} Muốn khẳng định, cần chứng minh $u_{n+1} > u_n$ với mọi $n$.`;
    if (tr === 'decreasing')
      return `${shown}, số hạng sau luôn nhỏ hơn số hạng trước ($u_{n+1} - u_n < 0$): dãy có vẻ giảm; ${range} Muốn khẳng định, cần chứng minh $u_{n+1} < u_n$ với mọi $n$.`;
    if (tr === 'constant') return `${shown}, mọi số hạng bằng nhau; ${range}`;
    return `${shown}, có lúc số hạng sau lớn hơn, có lúc nhỏ hơn số hạng trước: dãy không tăng cũng không giảm; ${range}`;
  });

  /** @param {{ text: string, first?: string }} p */
  function usePreset(p) {
    if (mode === 'general') general = p.text;
    else {
      step = p.text;
      first = p.first ?? '1';
    }
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cách cho dãy số"
    options={[
      { value: 'general', label: 'Công thức số hạng tổng quát' },
      { value: 'recursive', label: 'Hệ thức truy hồi' },
    ]}
    bind:value={mode}
  />

  {#if mode === 'general'}
    <label class="block">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Công thức của uₙ theo n</span>
      <input
        class={textInput}
        bind:value={general}
        autocomplete="off"
        spellcheck="false"
        aria-describedby={helpId}
      />
    </label>
  {:else}
    <div class="grid gap-3 sm:grid-cols-[8rem_1fr]">
      <label class="block">
        <span class="mb-1 block text-sm font-semibold text-slate-700">Số hạng đầu u₁</span>
        <input class={textInput} bind:value={first} autocomplete="off" spellcheck="false" />
      </label>
      <label class="block">
        <span class="mb-1 block text-sm font-semibold text-slate-700"
          >Công thức của uₙ theo u (tức uₙ₋₁) và n</span
        >
        <input
          class={textInput}
          bind:value={step}
          autocomplete="off"
          spellcheck="false"
          aria-describedby={helpId}
        />
      </label>
    </div>
  {/if}
  <p id={helpId} class="text-sm text-slate-600">
    Dùng + − * / ^, dấu ngoặc và sqrt( ); có thể viết gọn 2n hay 3(n + 1).
    {mode === 'recursive' ? 'Chữ u chỉ số hạng đứng ngay trước.' : ''}
  </p>

  <div class="flex flex-wrap gap-2" role="group" aria-label="Ví dụ có sẵn">
    {#each PRESETS[mode] as p (p.text)}
      <button type="button" class={button.quiet} onclick={() => usePreset(p)}>{p.label}</button>
    {/each}
  </div>

  {#if error}
    <FeedbackNote tone="warn" text={error} />
  {:else}
    <div class="overflow-x-auto text-center"><Tex math={definitionTex} display /></div>
    <TermChart {terms} title="Các số hạng đầu của dãy số" highlight={k - 1} />
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="Số số hạng hiện" bind:value={count} min={3} max={15} />
      <SliderField label="Xem số hạng thứ" bind:value={pickedTerm} min={1} max={count} />
    </div>
    <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums text-slate-700">
      {#each terms as t, i (i)}
        <span class={i === k - 1 ? 'font-semibold text-rose-700' : ''}
          ><Tex
            math={`u_{${i + 1}} ${eqTex(t)}`}
            ariaLabel={`u ${i + 1} bằng ${termText(t)}`}
          /></span
        >
      {/each}
    </div>
    <FeedbackNote tone="info" text={termLine} />
    <FeedbackNote tone="ok" text={verdict} />
  {/if}
</div>
