<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import {
    GIFTS,
    OUTFIT,
    onPath,
    placeTree,
    productText,
    productTree,
    sumText,
    sumTree,
  } from './engine.js';

  const W = 360;
  const ROW = 20;
  const PAD = 14;
  const LEFT = 14;
  const LAST = 280;
  const ON = '#4f46e5';
  const OFF = '#94a3b8';

  /** @type {'nhan' | 'cong'} */
  let mode = $state('nhan');
  let counts = $state([3, 2, 2]);
  let withShoes = $state(true);
  let picks = $state([0, 0, 0]);
  let gifts = $state([3, 2]);
  let group = $state(0);
  let item = $state(0);

  const stages = $derived(withShoes ? OUTFIT : OUTFIT.slice(0, 2));
  const used = $derived(counts.slice(0, stages.length));
  const chosen = $derived(mode === 'nhan' ? picks.slice(0, stages.length) : [group, item]);
  const tree = $derived(
    placeTree(mode === 'nhan' ? productTree(stages, used) : sumTree(GIFTS, gifts)),
  );
  const height = $derived(tree.leaves * ROW + 2 * PAD);
  const feedback = $derived(
    mode === 'nhan' ? productText(stages, used, chosen) : sumText(GIFTS, gifts, group, item),
  );

  /** @param {number} depth */
  const xOf = (depth) => LEFT + (depth * (LAST - LEFT)) / tree.depth;
  /** @param {number} row */
  const yOf = (row) => PAD + ROW / 2 + row * ROW;

  /** Keep each pick inside the items still on the tree. */
  function clampPicks() {
    picks = picks.map((p, d) => Math.min(p, counts[d] - 1));
    item = Math.min(item, gifts[group] - 1);
  }

  /** @param {number} d */
  const pickOptions = (d) =>
    OUTFIT[d].items.slice(0, counts[d]).map((label, value) => ({ value, label }));
  const itemOptions = $derived(
    GIFTS[group].items.slice(0, gifts[group]).map((label, value) => ({ value, label })),
  );
  const groupOptions = GIFTS.map((g, value) => ({ value, label: g.name }));
  const modes = [
    { value: 'nhan', label: 'Quy tắc nhân' },
    { value: 'cong', label: 'Quy tắc cộng' },
  ];
</script>

<div class="space-y-4">
  <SegmentedControl label="Quy tắc" options={modes} bind:value={mode} />

  {#if mode === 'nhan'}
    <p class="text-sm text-slate-700">
      Chọn một bộ trang phục gồm một áo, một quần{withShoes ? ' và một đôi giày' : ''}. Mỗi công
      đoạn làm mọi nhánh của sơ đồ mọc thêm nhánh con.
    </p>
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      {#each stages as stage, d (stage.name)}
        <Stepper
          label="Số {stage.noun}"
          bind:value={counts[d]}
          min={1}
          max={stage.items.length}
          onchange={clampPicks}
        />
      {/each}
    </div>
    <label class="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700">
      <input type="checkbox" class="h-5 w-5 {focusRing}" bind:checked={withShoes} />
      Thêm công đoạn chọn giày
    </label>
  {:else}
    <p class="text-sm text-slate-700">
      Chọn một món quà: một cuốn sách hoặc một chiếc bút. Hai phương án tách thành hai nhánh riêng,
      không nhánh nào mọc tiếp.
    </p>
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      {#each GIFTS as g, i (g.name)}
        <Stepper
          label="Số loại {g.noun}"
          bind:value={gifts[i]}
          min={1}
          max={g.items.length}
          onchange={clampPicks}
        />
      {/each}
    </div>
  {/if}

  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <svg
      viewBox="0 0 {W} {height}"
      class="block h-auto w-full"
      role="img"
      aria-label="Sơ đồ hình cây có {tree.leaves} nhánh cuối, mỗi nhánh cuối là một cách chọn."
    >
      {#each tree.edges as edge, i (i)}
        {@const lit = onPath(edge.to.path, chosen)}
        <line
          x1={xOf(edge.from.depth)}
          y1={yOf(edge.from.row)}
          x2={xOf(edge.to.depth)}
          y2={yOf(edge.to.row)}
          stroke={lit ? ON : OFF}
          stroke-width={lit ? 3 : 1.2}
        />
      {/each}
      {#each tree.nodes as node, i (i)}
        {@const lit = onPath(node.path, chosen)}
        <circle
          cx={xOf(node.depth)}
          cy={yOf(node.row)}
          r={node.depth === 0 ? 6 : 4}
          fill={lit ? ON : '#fff'}
          stroke={lit ? ON : OFF}
          stroke-width="1.5"
        />
        {#if node.label}
          <text
            x={xOf(node.depth) + 7}
            y={yOf(node.row) + (node.leaf ? 4 : -6)}
            font-size="12"
            font-weight={lit ? 700 : 400}
            fill={lit ? '#312e81' : '#334155'}
            stroke="#fff"
            stroke-width="3"
            paint-order="stroke">{node.label}</text
          >
        {/if}
      {/each}
      {#if mode === 'nhan'}
        {#each tree.nodes.filter((n) => n.leaf) as leaf (leaf.row)}
          <text x={W - 4} y={yOf(leaf.row) + 4} font-size="11" text-anchor="end" fill="#64748b"
            >{leaf.row + 1}</text
          >
        {/each}
      {/if}
    </svg>
  </div>

  {#if mode === 'nhan'}
    <div class="space-y-2">
      {#each stages as stage, d (stage.name)}
        <SegmentedControl
          label="Chọn {stage.noun}"
          options={pickOptions(d)}
          bind:value={picks[d]}
        />
      {/each}
    </div>
  {:else}
    <div class="space-y-2">
      <SegmentedControl
        label="Phương án"
        options={groupOptions}
        bind:value={group}
        onchange={(v) => (item = Math.min(item, gifts[Number(v)] - 1))}
      />
      <SegmentedControl label="Chọn {GIFTS[group].noun}" options={itemOptions} bind:value={item} />
    </div>
  {/if}

  <FeedbackNote tone="info" text={feedback} />
</div>
