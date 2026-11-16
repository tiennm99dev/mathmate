<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import RealLine, { LINE_VIEW } from '../_shared/real-line.svelte';
  import Venn from '../_shared/venn.svelte';
  import { setTex } from '../_shared/intervals.js';
  import { MAX, MIN, OPS, SHADE, endSymbol, moveEnd, nextMode, resultOf, toSet } from './engine.js';

  /** @typedef {'A' | 'B'} Name */
  /** @typedef {'lo' | 'hi'} Side */

  const COLORS = { A: '#be123c', B: '#0f766e' };
  /** @type {Name[]} */
  const NAMES = ['A', 'B'];
  /** @type {Side[]} */
  const SIDES = ['lo', 'hi'];

  /** @type {Record<Name, import('./engine.js').EditableInterval>} */
  let sets = $state({
    A: { lo: -1, hi: 3, loMode: 'closed', hiMode: 'open' },
    B: { lo: 1, hi: 5, loMode: 'open', hiMode: 'closed' },
  });
  /** @type {import('../_shared/intervals.js').SetOp} */
  let op = $state('cap');
  /** @type {Record<Name, SVGSVGElement | undefined>} */
  let svgs = $state({ A: undefined, B: undefined });

  const result = $derived(resultOf(sets.A, sets.B, op));
  const opInfo = $derived(OPS.find((o) => o.value === op) ?? OPS[0]);

  /** @param {Name} name @param {Side} side */
  const modeOf = (name, side) => (side === 'lo' ? sets[name].loMode : sets[name].hiMode);

  /** @param {Name} name @param {Side} side */
  function toggle(name, side) {
    const E = sets[name];
    sets[name] =
      side === 'lo' ? { ...E, loMode: nextMode(E.loMode) } : { ...E, hiMode: nextMode(E.hiMode) };
  }

  /** @param {Name} name @param {Side} side @param {number} value */
  function move(name, side, value) {
    sets[name] = moveEnd(sets[name], side, value);
  }

  /** Scratch points the drag action writes to, one per handle. */
  const scratch = {
    A: { lo: { x: 0, y: 0 }, hi: { x: 0, y: 0 } },
    B: { lo: { x: 0, y: 0 }, hi: { x: 0, y: 0 } },
  };

  /**
   * @param {Name} name @param {Side} side
   * @param {{ invert: (px: number) => number }} x
   */
  function dragFor(name, side, x) {
    const point = scratch[name][side];
    return {
      point,
      svg: () => svgs[name] ?? null,
      viewBox: LINE_VIEW,
      pad: 0,
      onChange: () => move(name, side, x.invert(point.x)),
      /** @param {number} dx @param {number} dy @param {boolean} big */
      onKeyMove: (dx, dy, big) => move(name, side, sets[name][side] + (dx - dy) * (big ? 3 : 1)),
    };
  }

  /** @param {Name} name @param {Side} side */
  const endLabel = (name, side) =>
    `${side === 'lo' ? 'Đầu trái' : 'Đầu phải'} của ${name}: ${
      { closed: 'lấy cả điểm mút', open: 'không lấy điểm mút', infinite: 'vô cực' }[
        modeOf(name, side)
      ]
    }. Nhấn để đổi.`;
</script>

<div class="space-y-4">
  <SegmentedControl label="Phép toán" options={OPS} bind:value={op} />

  <Venn
    shade={SHADE[op]}
    names={['A', 'B', 'ℝ']}
    label="Biểu đồ Ven: phần tô màu là tập {opInfo.label}"
  />

  {#each NAMES as name (name)}
    <div class="rounded-xl border border-slate-200 p-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-semibold" style:color={COLORS[name]}>
          <Tex math={`${name} = ${setTex(toSet(sets[name]))}`} />
        </span>
        <span class="ml-auto flex gap-2">
          {#each SIDES as side (side)}
            <button
              type="button"
              class="min-h-11 min-w-11 rounded-lg border border-slate-300 bg-white px-2 font-mono text-lg font-bold hover:bg-slate-100 {focusRing}"
              aria-label={endLabel(name, side)}
              onclick={() => toggle(name, side)}>{endSymbol(modeOf(name, side), side)}</button
            >
          {/each}
        </span>
      </div>
      <RealLine set={toSet(sets[name])} {name} color={COLORS[name]} bind:svgEl={svgs[name]}>
        {#snippet children(x, y)}
          {#each SIDES as side (side)}
            {#if modeOf(name, side) !== 'infinite'}
              <g
                class="drag-handle"
                role="slider"
                tabindex="0"
                aria-label="{side === 'lo' ? 'Đầu mút trái' : 'Đầu mút phải'} của {name}"
                aria-valuemin={MIN}
                aria-valuemax={MAX}
                aria-valuenow={sets[name][side]}
                aria-valuetext={String(sets[name][side]).replace('-', '−')}
                aria-orientation="horizontal"
                style="cursor:grab; outline:none"
                use:draggable={dragFor(name, side, x)}
              >
                <circle
                  class="drag-knob"
                  cx={x.map(sets[name][side])}
                  cy={y}
                  r="10"
                  fill={COLORS[name]}
                  fill-opacity="0.25"
                  stroke={COLORS[name]}
                  stroke-width="2"
                />
              </g>
            {/if}
          {/each}
        {/snippet}
      </RealLine>
    </div>
  {/each}

  <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-3">
    <RealLine set={result.set} name={opInfo.short} />
  </div>
  <FeedbackNote tone="info" text={result.text} />
</div>
