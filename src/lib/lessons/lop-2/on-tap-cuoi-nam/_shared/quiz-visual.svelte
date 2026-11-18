<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import NumberChain from '#lib/core/kid/number-chain.svelte';
  import RulerSegment from '#lib/core/kid/ruler-segment.svelte';
  import { pictures } from '#lib/core/kid/pictures/index.js';
  import { countLabel } from '#lib/core/kid/quiz.js';
  import { resultOf } from '#lib/core/kid/column.js';
  import ColumnBoard from '#lib/core/kid/place-column-board.svelte';
  import { onesDigits } from '#lib/core/kid/column-steps.js';
  import Figure from '#lib/core/kid/plane-figure.svelte';
  import Block from '#lib/core/kid/block.svelte';
  import SolidFigure from './solid-figure.svelte';
  import { SOLID_LOOKS } from './solids.js';
  import MeasureSurveyVisual from './measure-survey-visual.svelte';

  /**
   * The picture above a review question (`Visual` in `visual.js`). Numbers the
   * child has to work out stay hidden until the question ends; screen readers
   * hear the same facts the picture shows.
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();

  const LETTERS = ['A', 'B', 'C', 'D'];
  const SOLID_COLORS = ['#60a5fa', '#f87171', '#fbbf24', '#a78bfa'];

  /**
   * The blocks of a number as lists a screen reader can count.
   * @param {{ hundreds: number, tens: number, ones: number }} b
   */
  const blocksLabel = (b) =>
    /** @type {Array<[string, number]>} */ ([
      ['tấm trăm', b.hundreds],
      ['thanh chục', b.tens],
      ['khối đơn vị', b.ones],
    ])
      .filter(([, n]) => n > 0)
      .map(([noun, n]) => countLabel(noun, n, settled))
      .join('. ');
</script>

{#if visual.type === 'column'}
  {@const result = visual.shown ?? (settled ? resultOf(visual.a, visual.b, visual.op) : null)}
  <div class="flex justify-center">
    <ColumnBoard
      a={visual.a}
      b={visual.b}
      op={visual.op}
      written={result === null ? [] : onesDigits(result)}
    />
  </div>
{:else if visual.type === 'chain'}
  <NumberChain start={visual.start} steps={visual.steps} {settled} />
{:else if visual.type === 'sequence'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Dãy số: {visual.items
      .map((n, i) => (i === visual.blank && !settled ? 'dấu hỏi' : n))
      .join(', ')}."
  >
    {#each visual.items as n, i (i)}
      {#if i === visual.blank}
        <span
          class="inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-4 border-dashed border-indigo-400 bg-white px-2 text-indigo-600"
          >{settled ? n : '?'}</span
        >
      {:else}
        <span
          class="inline-flex h-12 min-w-16 items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-2"
          >{n}</span
        >
      {/if}
    {/each}
  </div>
{:else if visual.type === 'blocks'}
  <div
    class="flex flex-wrap items-end justify-center gap-3 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={blocksLabel(visual)}
  >
    {#each { length: visual.hundreds } as _, i (i)}
      <Block kind="tram" cell={5} />
    {/each}
    {#if visual.tens > 0}
      <div class="flex gap-1">
        {#each { length: visual.tens } as _, i (i)}
          <Block kind="chuc" cell={5} />
        {/each}
      </div>
    {/if}
    {#if visual.ones > 0}
      <div class="grid grid-cols-3 gap-1">
        {#each { length: visual.ones } as _, i (i)}
          <Block kind="don-vi" cell={8} />
        {/each}
      </div>
    {/if}
  </div>
{:else if visual.type === 'cards'}
  <div
    class="flex justify-center gap-3 rounded-2xl bg-amber-50 p-3"
    role="img"
    aria-label="Ba thẻ số: {visual.digits.join(', ')}."
  >
    {#each visual.digits as d, i (i)}
      <span
        class="inline-flex h-16 w-14 items-center justify-center rounded-xl border-4 border-indigo-400 bg-white text-3xl font-bold tabular-nums"
        >{d}</span
      >
    {/each}
  </div>
{:else if visual.type === 'table'}
  <div class="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
    <table class="w-full text-left text-lg">
      <thead class="bg-slate-100">
        <tr>
          {#each visual.head as title (title)}
            <th scope="col" class="px-3 py-2 font-semibold">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each visual.rows as [name, n] (name)}
          <tr class="border-t border-slate-200">
            <td class="px-3 py-2">{name}</td>
            <td class="px-3 py-2 font-bold tabular-nums">{n}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else if visual.type === 'groups'}
  <div
    class="flex flex-wrap justify-center gap-2 rounded-2xl bg-amber-50 p-2"
    role="img"
    aria-label="{visual.groups} nhóm, mỗi nhóm {visual.each} {pictures[visual.picture]}."
  >
    {#each { length: visual.groups } as _, g (g)}
      <div
        class="flex max-w-24 flex-wrap justify-center rounded-xl border-2 border-amber-300 bg-white p-1"
      >
        {#each { length: visual.each } as _, i (i)}
          <Picture name={visual.picture} size={26} decorative />
        {/each}
      </div>
    {/each}
  </div>
{:else if visual.type === 'figure'}
  <div class="rounded-2xl bg-sky-50 p-3">
    <Figure figure={visual.figure} />
  </div>
{:else if visual.type === 'ruler'}
  <div class="rounded-2xl bg-sky-50 p-3">
    <RulerSegment name={visual.name} from={visual.from} to={visual.to} />
  </div>
{:else if visual.type === 'solids'}
  <div
    class="flex flex-wrap items-end justify-center gap-2 rounded-2xl bg-sky-50 p-3"
    role="img"
    aria-label={visual.kinds.map((k, i) => `Hình ${LETTERS[i]}: ${SOLID_LOOKS[k]}`).join('. ')}
  >
    {#each visual.kinds as kind, i (kind)}
      <div class="flex flex-col items-center">
        <SolidFigure {kind} color={SOLID_COLORS[i]} size={68} />
        <span class="text-lg font-bold text-slate-800">{LETTERS[i]}</span>
      </div>
    {/each}
  </div>
{:else}
  <MeasureSurveyVisual {visual} {settled} />
{/if}
