<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { fmt } from '#lib/core/number-format.js';
  import BoxFigure from '../_shared/box-figure.svelte';
  import { EDGE_NAMES, EDGES } from '../_shared/box-view.js';
  import { THINGS, cubed, noteFor, rulerMax, rulerState } from './engine.js';

  /**
   * Estimate first, then measure: the child picks a familiar box-shaped
   * thing, drawn to scale, and taps the volume they guess. Then they lay a
   * ruler along its length, width and height; each ruler turns green when it
   * reaches the end of its edge. With the three measures the live line works
   * the volume out and says how close the estimate was.
   */

  let id = $state(THINGS[0].id);
  /** @type {number | null} */
  let estimate = $state(null);
  let measured = $state([0, 0, 0]);

  const thing = $derived(THINGS.find((t) => t.id === id) ?? THINGS[0]);
  const max = $derived(rulerMax(thing));
  const fits = $derived(thing.size.map((want, i) => rulerState(measured[i], want) === 'fit'));
  const note = $derived(noteFor(thing, estimate, measured));

  const label = $derived(
    `${thing.name} vẽ dạng hình hộp chữ nhật.` +
      EDGES.map((edge, i) =>
        measured[i] > 0
          ? ` Thước đo ${EDGE_NAMES[edge]} dài ${fmt(measured[i])} ${thing.unit}${fits[i] ? ', vừa khít' : ''}.`
          : '',
      ).join(''),
  );

  /** @param {string | number} value */
  function choose(value) {
    id = String(value);
    estimate = null;
    measured = [0, 0, 0];
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đồ vật"
    options={THINGS.map((t) => ({ value: t.id, label: t.short }))}
    value={id}
    onchange={choose}
  />

  <BoxFigure
    a={thing.size[0]}
    b={thing.size[1]}
    c={thing.size[2]}
    {label}
    rulers={measured.map((m) => (m > 0 ? m : null))}
    rulerMax={max}
    {fits}
  />

  <fieldset class="space-y-2">
    <legend class="mb-1 text-lg font-semibold text-slate-800">
      1. Em đoán: {thing.name.toLowerCase()} có thể tích khoảng bao nhiêu?
    </legend>
    <div class="grid grid-cols-3 gap-2">
      {#each thing.estimates as e, i (e)}
        <button
          type="button"
          class="min-h-12 rounded-xl border-2 px-2 py-2 text-lg font-bold tabular-nums transition {estimate ===
          i
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white text-slate-800 hover:bg-indigo-50'} focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          aria-pressed={estimate === i}
          onclick={() => (estimate = i)}>{fmt(e)} {cubed(thing)}</button
        >
      {/each}
    </div>
  </fieldset>

  {#if estimate !== null}
    <fieldset class="space-y-2">
      <legend class="mb-1 text-lg font-semibold text-slate-800">
        2. Em kéo thước để đo (theo {thing.unit}):
      </legend>
      {#each EDGES as edge, i (edge)}
        <SliderField
          label="{fits[i] ? '✓ ' : ''}Thước đo {EDGE_NAMES[edge]}"
          bind:value={measured[i]}
          min={0}
          {max}
          unit={thing.unit}
        />
      {/each}
    </fieldset>
  {/if}

  <KidNote tone={note.tone} text={note.text} />
</div>
