<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import ColumnBoard from '#lib/core/kid/column-board.svelte';
  import Cup from '#lib/core/kid/cup.svelte';
  import NumberChain from '#lib/core/kid/number-chain.svelte';
  import RulerSegment from '#lib/core/kid/ruler-segment.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import { FIGURE_NAMES, plainFigure } from '#lib/core/kid/shapes.js';
  import NumberLine from '#lib/core/visuals/number-line.svelte';
  import { resultOf, towerRows } from './arith-skills.js';
  import Figure from '#lib/core/kid/plane-figure.svelte';

  /**
   * The picture above a review question (`Visual` in `visual.js`). Numbers the
   * child has to work out stay hidden until the question ends; screen readers
   * hear the same facts the picture shows.
   * @type {{ visual: import('./visual.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();
</script>

{#if visual.type === 'column'}
  {@const c = resultOf(visual.a, visual.b, visual.op)}
  <div class="flex justify-center">
    <ColumnBoard
      a={visual.a}
      b={visual.b}
      op={visual.op}
      written={settled
        ? { tens: c >= 10 ? Math.floor(c / 10) : null, ones: c % 10 }
        : { tens: null, ones: null }}
    />
  </div>
{:else if visual.type === 'chain'}
  <NumberChain start={visual.start} steps={visual.steps} {settled} />
{:else if visual.type === 'tower'}
  {@const rows = towerRows(visual.base)}
  <div
    class="flex flex-col-reverse items-center gap-1 rounded-2xl bg-amber-50 p-3 text-2xl font-bold tabular-nums"
    role="img"
    aria-label="Tháp số ba hàng. Hàng dưới cùng là {visual.base.join(', ')}."
  >
    {#each rows as row, r (r)}
      <div class="flex gap-1">
        {#each row as n, i (i)}
          <span
            class="inline-flex h-12 w-14 items-center justify-center rounded-lg border-2 {r === 0
              ? 'border-indigo-400 bg-white'
              : 'border-dashed border-indigo-400 bg-indigo-50'}"
            >{r === 0 || settled ? n : '?'}</span
          >
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
{:else if visual.type === 'pattern'}
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3"
    role="img"
    aria-label="{visual.figures.map((k) => FIGURE_NAMES[k]).join(', ')}, dấu hỏi."
  >
    {#each visual.figures as kind, i (i)}
      <ShapeFigure figure={plainFigure(kind)} size={44} decorative />
    {/each}
    <span
      class="inline-flex h-12 w-12 items-center justify-center rounded-lg border-4 border-dashed border-indigo-400 bg-white text-3xl font-bold text-indigo-600"
      aria-hidden="true">?</span
    >
  </div>
{:else if visual.type === 'scales'}
  <div class="space-y-2 rounded-2xl bg-sky-50 p-2">
    {#each visual.scales as scale, i (i)}
      <BalanceScale left={scale.left} right={scale.right} />
    {/each}
  </div>
{:else if visual.type === 'cups'}
  <div class="space-y-3 rounded-2xl bg-sky-50 p-3">
    {#each visual.groups as group (group.name)}
      <div role="img" aria-label="{group.name}: {group.n} ca 1 l đầy nước.">
        <p class="mb-1 text-lg font-bold text-slate-800">{group.name}</p>
        <div class="flex flex-wrap gap-1">
          {#each { length: group.n } as _, i (i)}
            <Cup full size={36} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
{:else if visual.type === 'clock'}
  <div class="rounded-2xl bg-sky-50 p-3">
    <ClockPicture minutes={visual.minutes} />
  </div>
{:else if visual.type === 'number-line'}
  {@const line = visual}
  {@const hole = line.min + line.blank * line.step}
  <div class="rounded-2xl bg-sky-50 p-3">
    <NumberLine
      min={line.min}
      max={line.min + (line.count - 1) * line.step}
      step={line.step}
      interactive={false}
      format={(v) => (v === hole && !settled ? '?' : String(v))}
      width={360}
      label="Tia số từ {line.min}, mỗi vạch hơn vạch trước {line.step}. Vạch thứ {line.blank +
        1} là dấu hỏi."
    />
  </div>
{/if}
