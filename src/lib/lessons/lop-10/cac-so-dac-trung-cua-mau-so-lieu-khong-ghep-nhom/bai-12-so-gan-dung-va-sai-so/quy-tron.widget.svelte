<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { button, textInput } from '#lib/core/ui.js';
  import { digitCells, placeFor, placeName, roundingSteps } from './engine.js';

  const PRESETS = [
    { a: '2 841 675', d: '300' },
    { a: '3,1463', d: '0,001' },
    { a: '9,78', d: '0,2' },
    { a: '1 236,4', d: '5' },
  ];

  let aText = $state(PRESETS[0].a);
  let dText = $state(PRESETS[0].d);

  const a = $derived(readNumber(aText));
  const d = $derived(readNumber(dText));

  const result = $derived.by(() => {
    if (a === null || a <= 0) return { error: 'Hãy nhập số gần đúng $a$ là một số dương.' };
    if (a >= 1e9) return { error: 'Hãy nhập số gần đúng nhỏ hơn một tỉ.' };
    if (d === null || d <= 0) return { error: 'Hãy nhập độ chính xác $d$ là một số dương.' };
    const k = placeFor(d);
    if (k < -3 || k > 3) {
      return { error: 'Hãy chọn độ chính xác $d$ từ $0{,}0001$ đến dưới $1\\,000$.' };
    }
    return roundingSteps(a, d);
  });

  const cells = $derived(
    'error' in result || a === null ? [] : digitCells(formatNumber(a, 6), result.k),
  );
</script>

<div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
  <p class="font-semibold text-slate-800">Thực hành quy tròn số gần đúng</p>
  <div class="grid gap-3 sm:grid-cols-2">
    <label class="block">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Số gần đúng a</span>
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={aText} />
    </label>
    <label class="block">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Độ chính xác d</span>
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={dText} />
    </label>
  </div>
  <div class="flex flex-wrap gap-2">
    {#each PRESETS as p, i (i)}
      <button
        type="button"
        class={button.quiet}
        onclick={() => {
          aText = p.a;
          dText = p.d;
        }}>{p.a} ± {p.d}</button
      >
    {/each}
  </div>

  {#if 'error' in result}
    <FeedbackNote tone="warn" text={result.error} />
  {:else}
    <p
      class="overflow-x-auto font-mono text-2xl tracking-wide"
      aria-label="Chữ số được tô đậm ở {placeName(result.k)}, chữ số gạch chân ngay sau nó"
    >
      {#each cells as c, i (i)}<span
          class={c.role === 'place'
            ? 'rounded bg-indigo-600 px-0.5 text-white'
            : c.role === 'next'
              ? 'underline decoration-amber-500 decoration-4 underline-offset-4'
              : c.role === 'drop'
                ? 'text-slate-400'
                : ''}>{c.ch}</span
        >{/each}
    </p>
    <ol class="list-decimal space-y-1 pl-5 text-sm text-slate-700">
      {#each result.lines as line, i (i)}
        <li><LiveRichText text={line} /></li>
      {/each}
    </ol>
    <FeedbackNote tone="ok" text="Số quy tròn của $a$ là ${numTex(result.rounded)}$." />
  {/if}
</div>
