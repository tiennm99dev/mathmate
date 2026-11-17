<script>
  import Frac from '#lib/core/frac.svelte';
  import CountStepper from '#lib/core/kid/count-stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import FractionNote from '#lib/core/kid/fraction-note.svelte';
  import FractionShape from '../_shared/fraction-shape.svelte';
  import {
    FRIEND_COLORS,
    FRIEND_NAMES,
    GOALS,
    MAX_CAKES,
    MAX_FRIENDS,
    MIN_CAKES,
    MIN_FRIENDS,
    cakeFills,
    shareFills,
    shareNote,
  } from './engine.js';

  let cakes = $state(1);
  let friends = $state(2);
  let goalIndex = $state(0);

  const goal = $derived(GOALS[goalIndex % GOALS.length]);
  const fills = $derived(cakeFills(cakes, friends));
  const share = $derived(shareFills(cakes, friends));
  const note = $derived(shareNote(cakes, friends, goal));
</script>

<div class="space-y-5">
  <div
    class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-indigo-50 p-3 text-xl font-semibold text-indigo-900"
  >
    Đố em: làm sao để mỗi bạn được <Frac n={goal[0]} d={goal[1]} size="lg" /> cái bánh?
    <button type="button" class="min-h-12 text-base {button.quiet}" onclick={() => (goalIndex += 1)}
      >Đố khác</button
    >
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="rounded-2xl bg-amber-50 p-3 text-center">
      <p class="text-xl font-semibold text-slate-800">Số cái bánh: <strong>{cakes}</strong></p>
      <CountStepper
        name="cái bánh"
        value={cakes}
        min={MIN_CAKES}
        max={MAX_CAKES}
        onchange={(v) => (cakes = v)}
      />
    </div>
    <div class="rounded-2xl bg-sky-50 p-3 text-center">
      <p class="text-xl font-semibold text-slate-800">Số bạn: <strong>{friends}</strong></p>
      <CountStepper
        name="bạn"
        value={friends}
        min={MIN_FRIENDS}
        max={MAX_FRIENDS}
        onchange={(v) => (friends = v)}
      />
    </div>
  </div>

  <ul class="flex flex-wrap justify-center gap-2" aria-label="Màu của mỗi bạn">
    {#each FRIEND_NAMES.slice(0, friends) as name, i (name)}
      <li class="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-lg">
        <span
          class="inline-block h-4 w-4 rounded-full"
          style:background={FRIEND_COLORS[i]}
          aria-hidden="true"
        ></span>
        {name}
      </li>
    {/each}
  </ul>

  <div>
    <p class="mb-2 text-lg font-semibold text-slate-700">
      Mỗi cái bánh cắt thành {friends} phần bằng nhau, mỗi bạn lấy 1 phần:
    </p>
    <div class="flex flex-wrap justify-center gap-3">
      {#each fills as cake, c (c)}
        <div class="w-24">
          <FractionShape
            shape="circle"
            parts={friends}
            fills={cake}
            small
            label="Cái bánh thứ {c + 1}, cắt thành {friends} phần, mỗi bạn một phần"
          />
        </div>
      {/each}
    </div>
  </div>

  <div class="rounded-2xl bg-white p-3">
    <p class="mb-2 text-lg font-semibold text-slate-700">
      Gộp các phần của {FRIEND_NAMES[0]}: {cakes} phần, mỗi phần là
      <Frac n={1} d={friends} /> cái bánh.
    </p>
    <div class="flex flex-wrap justify-center gap-3">
      {#each share as whole, w (w)}
        <div class="w-24">
          <FractionShape
            shape="circle"
            parts={friends}
            fills={whole}
            small
            label="Phần của {FRIEND_NAMES[0]}, cái bánh thứ {w + 1}: {whole.filter(Boolean)
              .length} trong {friends} phần"
          />
        </div>
      {/each}
    </div>
  </div>

  <FractionNote tone={note.tone} text={note.text} />
</div>
