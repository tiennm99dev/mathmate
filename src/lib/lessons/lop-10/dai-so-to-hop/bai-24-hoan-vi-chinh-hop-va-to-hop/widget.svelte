<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { STUDENTS, allKeys, formulaTex, labelOf, reasonText, record, totalOf } from './engine.js';

  /** @type {import('./engine.js').Mode} */
  let mode = $state('xep');
  let n = $state(4);
  let k = $state(2);
  /** @type {number[]} */
  let seats = $state([]);
  /** @type {string[]} */
  let found = $state([]);
  let note = $state('Chạm vào thẻ một bạn để đưa bạn đó vào chỗ trống đầu tiên.');
  let fresh = $state(true);

  const total = $derived(totalOf(n, k, mode));
  const modes = [
    { value: 'xep', label: 'Xếp vào ghế (có thứ tự)' },
    { value: 'chon', label: 'Chọn nhóm (không thứ tự)' },
  ];

  function reset() {
    k = Math.min(k, n);
    seats = [];
    found = [];
    fresh = true;
    note = 'Chạm vào thẻ một bạn để đưa bạn đó vào chỗ trống đầu tiên.';
  }

  /** @param {number} i */
  function tapStudent(i) {
    if (seats.includes(i)) {
      seats = seats.filter((s) => s !== i);
      return;
    }
    const next = [...seats, i];
    if (next.length < k) {
      seats = next;
      return;
    }
    const got = record(found, next, mode, total);
    found = got.found;
    fresh = got.fresh;
    note = got.text;
    seats = [];
  }

  /** @param {number} place */
  function clearSeat(place) {
    seats = seats.filter((_, j) => j !== place);
  }

  function listAll() {
    found = allKeys(n, k, mode);
    seats = [];
    fresh = true;
    note = `Đây là tất cả ${total} cách.`;
  }

  const placeName = $derived(mode === 'xep' ? 'Ghế' : 'Chỗ');
</script>

<div class="space-y-4">
  <SegmentedControl label="Cách đếm" options={modes} bind:value={mode} onchange={reset} />
  <div class="flex flex-wrap gap-x-6 gap-y-2">
    <Stepper label="Số học sinh n" bind:value={n} min={2} max={5} onchange={reset} />
    <Stepper
      label={mode === 'xep' ? 'Số ghế k' : 'Số bạn trong nhóm k'}
      bind:value={k}
      min={1}
      max={n}
      onchange={reset}
    />
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">Thẻ học sinh</p>
    <div class="flex flex-wrap gap-2">
      {#each STUDENTS.slice(0, n) as name, i (name)}
        {@const seated = seats.includes(i)}
        <button
          type="button"
          class="min-h-11 min-w-16 rounded-lg border-2 px-3 font-semibold {seated
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'} {focusRing}"
          aria-pressed={seated}
          aria-label={seated ? `${name}, đang ngồi, chạm để đứng dậy` : `Đưa ${name} vào chỗ`}
          onclick={() => tapStudent(i)}>{name}</button
        >
      {/each}
    </div>
  </div>

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      {mode === 'xep'
        ? 'Hàng ghế đánh số (đổi chỗ là cách mới)'
        : 'Nhóm được chọn (đổi chỗ không là cách mới)'}
    </p>
    <div
      class="flex flex-wrap gap-2 {mode === 'chon'
        ? 'rounded-2xl border-2 border-dashed border-emerald-500 p-2'
        : ''}"
    >
      {#each Array.from({ length: k }, (_, j) => j) as place (place)}
        {@const who = seats[place]}
        <button
          type="button"
          class="flex min-h-14 min-w-20 flex-col items-center justify-center rounded-lg border-2 px-2 text-sm {who ===
          undefined
            ? 'border-dashed border-slate-300 bg-slate-50 text-slate-500'
            : 'border-indigo-300 bg-indigo-50 font-semibold text-indigo-900'} {focusRing}"
          aria-label={who === undefined
            ? `${placeName} ${place + 1}: trống`
            : `${placeName} ${place + 1}: ${STUDENTS[who]}, chạm để bỏ ra`}
          onclick={() => clearSeat(place)}
        >
          {#if mode === 'xep'}<span class="text-xs text-slate-500">Ghế {place + 1}</span>{/if}
          <span>{who === undefined ? '…' : STUDENTS[who]}</span>
        </button>
      {/each}
    </div>
  </div>

  <FeedbackNote tone={fresh ? 'info' : 'warn'} text={note} />

  <div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <p class="font-semibold text-slate-800">
      Đã tìm {found.length} / {total} cách
    </p>
    <p class="mt-1 overflow-x-auto text-lg"><Tex math={formulaTex(n, k, mode)} /></p>
    <p class="mt-1 text-sm text-slate-700">{reasonText(n, k, mode)}</p>
    {#if found.length > 0}
      <ul class="mt-2 flex flex-wrap gap-1" aria-label="Các cách đã tìm">
        {#each found as key (key)}
          <li class="rounded bg-white px-2 py-0.5 text-xs text-slate-700 ring-1 ring-slate-200">
            {labelOf(key, mode)}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.quiet} onclick={listAll}>Liệt kê hết</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
</div>
