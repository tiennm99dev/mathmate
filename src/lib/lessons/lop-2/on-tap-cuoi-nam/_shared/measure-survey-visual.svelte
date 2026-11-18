<script>
  import BalanceScale from '#lib/core/kid/balance-scale.svelte';
  import ClockPicture from '#lib/core/kid/clock-picture.svelte';
  import MonthSheet from '#lib/core/kid/month-sheet.svelte';
  import PictureChart from '#lib/core/kid/picture-chart.svelte';
  import ShapeFigure from '#lib/core/kid/shape-figure.svelte';
  import Vessel from '#lib/core/kid/vessel.svelte';
  import { FIGURE_NAMES, plainFigure } from '#lib/core/kid/shapes.js';
  import BallBox from '#lib/core/kid/ball-box.svelte';
  import { BALL_COLORS } from '#lib/core/kid/chance.js';
  import TallyMarks from '#lib/core/kid/tally-marks.svelte';

  /**
   * The pictures of the reviews of measures and of counting data
   * (`MeasureSurveyVisual` in `visual.js`). Until the question ends, a count
   * the child is asked for stays hidden and a screen reader hears one word per
   * thing, so it can still be counted.
   * @type {{ visual: import('./visual.js').MeasureSurveyVisual, settled: boolean }}
   */
  let { visual, settled } = $props();

  /**
   * What a screen reader hears for the mixed-up shapes.
   * @param {readonly import('./visual.js').PlaneKind[]} kinds
   */
  function scatterLabel(kinds) {
    if (!settled) return kinds.map((k) => FIGURE_NAMES[k]).join(', ');
    return [...new Set(kinds)]
      .map((k) => `${kinds.filter((x) => x === k).length} ${FIGURE_NAMES[k]}`)
      .join(', ');
  }

  /**
   * What a screen reader hears for a shape of a repeating row.
   * @param {import('./visual.js').PatternItem} item
   */
  const patternName = (item) => `${FIGURE_NAMES[item.kind]} ${BALL_COLORS[item.color].name}`;
</script>

{#if visual.type === 'clock'}
  <ClockPicture minutes={visual.minutes} />
{:else if visual.type === 'clocks'}
  <div class="grid grid-cols-3 gap-2 rounded-2xl bg-sky-50 p-2">
    {#each visual.clocks as clock (clock.name)}
      <div class="flex min-w-0 flex-col items-center gap-1">
        <ClockPicture minutes={clock.minutes} size="w-full max-w-28" />
        <span class="text-lg font-bold text-slate-800">{clock.name}</span>
      </div>
    {/each}
  </div>
{:else if visual.type === 'balance'}
  <BalanceScale left={visual.left} right={visual.right} />
{:else if visual.type === 'cans'}
  <div class="flex flex-wrap items-end justify-center gap-2 rounded-2xl bg-sky-50 p-2">
    {#each visual.litres as n (n)}
      <Vessel id="can" fill={1} size={68} label="Can {n} l" caption="{n} l" />
    {/each}
  </div>
{:else if visual.type === 'month'}
  <MonthSheet month={visual.month} marks={visual.marks} />
{:else if visual.type === 'scatter'}
  <div
    class="mx-auto grid max-w-sm grid-cols-5 justify-items-center gap-1 rounded-2xl bg-sky-50 p-2"
    role="img"
    aria-label={scatterLabel(visual.kinds)}
  >
    {#each visual.kinds as kind, i (i)}
      <ShapeFigure figure={plainFigure(kind)} size={48} decorative />
    {/each}
  </div>
{:else if visual.type === 'tally'}
  <div class="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
    <table class="w-full text-left text-lg">
      <tbody>
        {#each visual.rows as row (row.label)}
          <tr class="border-t border-slate-200 first:border-t-0">
            <th scope="row" class="px-3 py-2 font-semibold">{row.label}</th>
            <td class="px-2 py-2">
              <TallyMarks count={row.count} {settled} />
              {#if settled}<span class="ml-2 font-bold tabular-nums">{row.count}</span>{/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else if visual.type === 'chart'}
  <PictureChart title={visual.title} rows={visual.rows} {settled} />
{:else if visual.type === 'box'}
  <BallBox balls={visual.balls} />
{:else if visual.type === 'pattern'}
  {@const last = visual.items.length - 1}
  <div
    class="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-amber-50 p-2"
    role="img"
    aria-label="Dãy hình: {visual.items
      .map((item, i) => (i === last && !settled ? 'dấu hỏi' : patternName(item)))
      .join(', ')}."
  >
    {#each visual.items as item, i (i)}
      {#if i === last && !settled}
        <span
          class="inline-flex h-11 w-11 items-center justify-center rounded-xl border-4 border-dashed border-indigo-400 bg-white text-xl font-bold text-indigo-600"
          >?</span
        >
      {:else}
        <ShapeFigure
          figure={{ ...plainFigure(item.kind), color: BALL_COLORS[item.color].fill }}
          size={44}
          decorative
        />
      {/if}
    {/each}
  </div>
{/if}
