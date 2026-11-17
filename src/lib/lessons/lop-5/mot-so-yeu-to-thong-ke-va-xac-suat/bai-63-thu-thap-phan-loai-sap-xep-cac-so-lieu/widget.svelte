<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { passFocus } from '#lib/core/kid/pass-focus.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { colorAt } from '#lib/core/visuals/svg-math.js';
  import {
    DATASETS,
    ORDERS,
    doneMessage,
    groupCounts,
    groupOf,
    nextToPlace,
    orderOf,
    placeMessage,
    valueText,
  } from './engine.js';

  let pick = $state(0);
  let order = $state(/** @type {import('./engine.js').Order} */ ('ghi'));
  /** Positions of the values already placed in the table. */
  /** @type {number[]} */
  let placed = $state([]);
  let note = $state(/** @type {{ ok: boolean, text: string } | null} */ (null));
  /** @type {HTMLButtonElement | undefined} */
  let again = $state();

  const ds = $derived(DATASETS[pick]);
  const shown = $derived(orderOf(ds.values, order));
  const current = $derived(nextToPlace(shown, placed));
  const counts = $derived(groupCounts(ds, placed));
  const done = $derived(current === null);

  const message = $derived(
    done
      ? doneMessage(ds)
      : note && !note.ok
        ? note.text
        : note
          ? `${note.text} Số tiếp theo: ${valueText(ds, ds.values[current ?? 0])}.`
          : `Số đang xét: ${valueText(ds, ds.values[current ?? 0])}. Em chạm vào nhóm của số đó.`,
  );

  /** @param {string | number} v */
  function chooseSet(v) {
    pick = Number(v);
    order = 'ghi';
    restart();
  }

  function restart() {
    placed = [];
    note = null;
  }

  /** @param {MouseEvent} e @param {number} g */
  function place(e, g) {
    if (current === null) return;
    const from = /** @type {HTMLButtonElement} */ (e.currentTarget);
    const result = placeMessage(ds, ds.values[current], g);
    note = result;
    if (result.ok) {
      placed = [...placed, current];
      if (nextToPlace(shown, placed) === null) passFocus(from, again);
    }
  }
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chọn dãy số liệu"
    options={DATASETS.map((d, i) => ({ value: i, label: d.short }))}
    value={pick}
    onchange={chooseSet}
  />

  <section class="space-y-3 rounded-2xl bg-amber-50 p-4" aria-label="Dãy số liệu">
    <h3 class="text-lg font-bold text-slate-800">{ds.title} (đơn vị: {ds.unit})</h3>
    <SegmentedControl
      label="Sắp xếp dãy số liệu"
      options={Object.entries(ORDERS).map(([value, label]) => ({ value, label }))}
      value={order}
      onchange={(v) => (order = /** @type {import('./engine.js').Order} */ (v))}
    />
    <ol class="flex flex-wrap gap-2" aria-label="Các số liệu theo thứ tự {ORDERS[order]}">
      {#each shown as i (i)}
        {@const isPlaced = placed.includes(i)}
        {@const g = groupOf(ds, ds.values[i])}
        <li
          class="flex min-h-12 min-w-14 items-center justify-center rounded-xl border-4 px-3 text-xl font-bold tabular-nums
            {i === current
            ? 'border-indigo-600 bg-white text-indigo-900'
            : isPlaced
              ? 'border-transparent text-white'
              : 'border-slate-300 bg-white text-slate-800'}"
          style:background-color={isPlaced ? colorAt(g) : null}
          aria-current={i === current ? 'true' : undefined}
        >
          {valueText(ds, ds.values[i])}
          {#if isPlaced}<span class="sr-only">, đã vào nhóm {ds.groups[g].label}</span>{/if}
        </li>
      {/each}
    </ol>
  </section>

  <div class="overflow-x-auto rounded-2xl bg-white">
    <table class="w-full border-collapse text-lg text-slate-800">
      <caption class="pb-2 text-left text-base font-semibold text-slate-600">
        Bảng số liệu: {ds.title}
      </caption>
      <thead>
        <tr>
          <th scope="col" class="border-2 border-slate-300 bg-sky-100 px-2 py-2 text-left">Nhóm</th>
          <th scope="col" class="border-2 border-slate-300 bg-sky-100 px-2 py-2">
            Số {ds.noun}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each ds.groups as group, g (group.label)}
          <tr>
            <th scope="row" class="border-2 border-slate-300 p-1 text-left">
              <button
                type="button"
                class="flex min-h-12 w-full items-center gap-2 rounded-xl px-2 text-left font-semibold hover:bg-slate-100 disabled:cursor-default {focusRing}"
                disabled={done}
                aria-label="Đưa vào nhóm {group.label}"
                onclick={(e) => place(e, g)}
              >
                <span
                  class="inline-block h-5 w-5 shrink-0 rounded"
                  style:background-color={colorAt(g)}
                  aria-hidden="true"
                ></span>
                {group.label}
              </button>
            </th>
            <td
              class="border-2 border-slate-300 px-2 py-2 text-center text-2xl font-bold tabular-nums"
              >{counts[g]}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <KidNote tone={done ? 'ok' : note && !note.ok ? 'warn' : 'info'} text={message} />

  <button bind:this={again} type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}>
    Làm lại
  </button>
</div>
