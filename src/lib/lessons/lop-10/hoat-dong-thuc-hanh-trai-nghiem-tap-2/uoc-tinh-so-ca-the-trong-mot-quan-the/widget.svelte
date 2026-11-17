<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { int, rng } from '#lib/core/drill.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import {
    errors,
    estimate,
    estimateText,
    makePond,
    markFish,
    meanEstimate,
    percent,
    recapture,
  } from './engine.js';

  const W = 400;
  const H = 240;
  /** Rows of catches shown in the table. */
  const SHOWN = 8;

  /** @typedef {{ id: number, n: number, k: number, est: number | null }} Catch */

  /** The true number of fish of pond `s`, from 500 to 1 500. @param {number} s */
  const sizeOf = (s) => int(rng(s * 101 + 7), 500, 1500);
  /** Pond `s` with its fish unmarked. @param {number} s */
  const pondOf = (s) => makePond(rng(s * 101 + 8), sizeOf(s), W, H);

  let seed = $state(1);
  /** The true number of fish, hidden until the learner asks. */
  const N = $derived(sizeOf(seed));
  let pond = $state(pondOf(1));
  let M = $state(100);
  let n = $state(100);
  let marked = $state(0);
  /** @type {Set<number>} */
  let caught = $state(new Set());
  /** @type {Catch[]} */
  let catches = $state([]);
  let reveal = $state(false);
  let rand = rng(110);

  /** A new pond with a new hidden number of fish. */
  function newPond() {
    seed += 1;
    pond = pondOf(seed);
    rand = rng(seed * 101 + 9);
    marked = 0;
    caught = new Set();
    catches = [];
    reveal = false;
  }

  function mark() {
    pond = markFish(rand, pond, M);
    marked = M;
    caught = new Set();
    catches = [];
  }

  function sample() {
    const size = Math.min(n, pond.length);
    const got = recapture(rand, pond, size);
    caught = new Set(got.caught);
    catches = [
      ...catches,
      { id: catches.length + 1, n: size, k: got.k, est: estimate(marked, size, got.k) },
    ];
  }

  const last = $derived(catches.at(-1));
  const mean = $derived(meanEstimate(catches.map((c) => c.est)));
  const note = $derived(
    marked === 0
      ? `Bước 1: chọn số cá $M$ cần bắt rồi bấm "Đánh dấu và thả lại". Trong hồ có bao nhiêu cá? Hãy ước lượng.`
      : last
        ? estimateText(marked, last.n, last.k)
        : `Đã đánh dấu $M = ${marked}$ con và thả lại hồ. Bước 2: chọn cỡ mẫu $n$ rồi bấm "Bắt mẫu".`,
  );
  const label = $derived(
    `Hồ cá ảo. ${marked > 0 ? `${marked} con đã được đánh dấu màu cam.` : 'Chưa có con nào được đánh dấu.'} ${
      last ? `Lần bắt gần nhất: ${last.n} con, trong đó ${last.k} con có dấu.` : ''
    }`,
  );
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-lg border border-sky-200 bg-sky-50"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label={label}
  >
    {#each pond as f, i (i)}
      <ellipse
        cx={f.x}
        cy={f.y}
        rx={f.marked ? 3.6 : 2.6}
        ry={f.marked ? 2.4 : 1.7}
        fill={f.marked ? '#ea580c' : caught.has(i) ? '#0f172a' : '#38bdf8'}
        opacity={caught.size > 0 && !caught.has(i) ? 0.35 : 1}
        stroke={caught.has(i) ? '#0f172a' : 'none'}
        stroke-width="1"
      />
    {/each}
  </svg>
  <p class="text-center text-xs text-slate-600">
    Cam: cá có dấu. Viền đậm: cá trong mẫu vừa bắt. Các con khác mờ đi khi có mẫu.
  </p>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="space-y-2">
      <SliderField
        label="Bước 1: số cá bắt để đánh dấu M"
        bind:value={M}
        min={20}
        max={200}
        step={10}
        unit="con"
      />
      <button type="button" class={button.secondary} onclick={mark}>
        {marked > 0 ? 'Đánh dấu lại từ đầu' : 'Đánh dấu và thả lại'}
      </button>
    </div>
    <div class="space-y-2">
      <SliderField
        label="Bước 2: cỡ mẫu bắt lần hai n"
        bind:value={n}
        min={20}
        max={400}
        step={10}
        unit="con"
      />
      <button type="button" class={button.primary} onclick={sample} disabled={marked === 0}
        >Bắt mẫu</button
      >
    </div>
  </div>

  <FeedbackNote
    tone={last && last.est === null ? 'warn' : marked === 0 ? 'info' : 'ok'}
    text={note}
  />

  {#if catches.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600">
          Các lần bắt mẫu với M = {marked}{reveal ? ` (số cá thật N = ${fmt(N)})` : ''}
        </caption>
        <thead>
          <tr class="border-b border-slate-200 text-left">
            <th scope="col" class="py-1 pr-2">Lần</th>
            <th scope="col" class="py-1 pr-2">n</th>
            <th scope="col" class="py-1 pr-2">k</th>
            <th scope="col" class="py-1 pr-2">N̂</th>
            {#if reveal}
              <th scope="col" class="py-1 pr-2">ΔN</th>
              <th scope="col" class="py-1">δ</th>
            {/if}
          </tr>
        </thead>
        <tbody>
          {#each catches.slice(-SHOWN) as c (c.id)}
            {@const err = c.est === null ? null : errors(c.est, N)}
            <tr class="border-b border-slate-100">
              <td class="py-1 pr-2">{c.id}</td>
              <td class="py-1 pr-2">{c.n}</td>
              <td class="py-1 pr-2">{c.k}</td>
              <td class="py-1 pr-2">{c.est === null ? '—' : fmt(c.est)}</td>
              {#if reveal}
                <td class="py-1 pr-2">{err ? fmt(err.abs) : '—'}</td>
                <td class="py-1">{err ? percent(err.rel) : '—'}</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if mean !== null}
      <p class="text-sm text-slate-700">
        Trung bình các ước lượng: <strong class="tabular-nums">{fmt(Math.round(mean))}</strong> con.
      </p>
    {/if}
  {/if}

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.quiet}
      onclick={() => (reveal = !reveal)}
      aria-pressed={reveal}
    >
      {reveal ? 'Ẩn số cá thật' : 'Hiện số cá thật'}
    </button>
    <button type="button" class={button.quiet} onclick={newPond}>Hồ mới</button>
  </div>
  {#if reveal}
    <FeedbackNote
      tone="info"
      text={`Trong hồ có $N = ${fmt(N)}$ con. Với mỗi lần bắt, sai số tuyệt đối $\\Delta_N = |\\hat{N} - N|$ và sai số tương đối $\\delta_N = \\dfrac{\\Delta_N}{\\hat{N}}$. Thử tăng cỡ mẫu $n$: sai số thường nhỏ đi.`}
    />
  {/if}
</div>
