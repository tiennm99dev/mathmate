<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { staircase } from './engine.js';

  const W = 400;
  const H = 320;
  const PAD = 24;
  const OWN = '#4f46e5';
  const COPY = '#f59e0b';
  const SUB = '₀₁₂₃₄₅₆₇₈₉';

  let u1 = $state(2);
  let d = $state(3);
  let n = $state(5);
  let paired = $state(false);
  let guess = $state('');
  let checked = $state(/** @type {'none' | 'ok' | 'wrong' | 'invalid'} */ ('none'));

  const stair = $derived(staircase(u1, d, n));
  const un = $derived(stair.columns[n - 1].own);
  // Blocks may be wider than tall, so a tall staircase still fills the width.
  const cellW = $derived(Math.min(44, (W - 2 * PAD) / n));
  const cell = $derived(Math.min(cellW, 30, (H - 2 * PAD) / stair.height));
  const left = $derived((W - n * cellW) / 2);
  const base = $derived(H - PAD);
  const termList = $derived(stair.columns.map((c) => c.own).join(', '));

  /** @param {number} col */
  const cellX = (col) => left + col * cellW;
  /** @param {number} row counted from the bottom, from 0 */
  const cellY = (row) => base - (row + 1) * cell;

  const label = $derived(
    `Cầu thang ${n} cột khối vuông, các cột cao ${termList} khối` +
      (paired
        ? `; ghép thêm bản sao lật ngược, mỗi cột cao ${stair.height} khối, tạo thành hình chữ nhật ${n} nhân ${stair.height}.`
        : '.'),
  );

  function check() {
    const v = readNumber(guess);
    checked = v === null ? 'invalid' : v === stair.sum ? 'ok' : 'wrong';
  }
  $effect(() => {
    // A new staircase asks the question again.
    void [u1, d, n];
    checked = 'none';
  });

  const note = $derived(
    paired
      ? `Mỗi cột gồm $u_k$ khối xanh và $u_{${n + 1}-k}$ khối cam, luôn cao $u_1 + u_${n} = ${u1} + ${un} = ${stair.height}$. Hình chữ nhật có $${n} \\cdot ${stair.height} = ${n * stair.height}$ khối, gấp đôi tổng $S_{${n}}$ cần tìm.`
      : `Các cột cao $${termList}$: mỗi bậc cao hơn bậc trước đúng $d = ${d}$ khối. Cột cuối cao $u_{${n}} = ${u1} + ${n - 1} \\cdot ${d} = ${un}$.`,
  );
  const feedback = $derived(
    checked === 'ok'
      ? `Đúng: $S_{${n}} = \\dfrac{${n}(${u1} + ${un})}{2} = ${stair.sum}$.`
      : checked === 'wrong'
        ? 'Chưa đúng. Hãy bật "Ghép bản sao lật ngược" và đếm số khối của hình chữ nhật, rồi chia đôi.'
        : checked === 'invalid'
          ? 'Hãy nhập một số nguyên.'
          : '',
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Số hạng đầu u₁" bind:value={u1} min={1} max={6} />
    <SliderField label="Công sai d" bind:value={d} min={0} max={3} />
    <SliderField label="Số bậc n" bind:value={n} min={2} max={9} />
  </div>

  <svg
    viewBox="0 0 {W} {H}"
    class="block w-full select-none rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={label}
  >
    <line x1={PAD / 2} y1={base} x2={W - PAD / 2} y2={base} stroke="#64748b" stroke-width="1.5" />
    {#each stair.columns as c, col (col)}
      {#each { length: c.own } as _, row (row)}
        <rect
          x={cellX(col) + 1}
          y={cellY(row) + 1}
          width={cellW - 2}
          height={cell - 2}
          rx="2"
          fill={OWN}
          opacity="0.85"
        />
      {/each}
      {#if paired}
        {#each { length: c.copy } as _, row (row)}
          <rect
            x={cellX(col) + 1}
            y={cellY(c.own + row) + 1}
            width={cellW - 2}
            height={cell - 2}
            rx="2"
            fill={COPY}
            opacity="0.85"
          />
        {/each}
      {:else if col > 0 && d > 0}
        <text
          x={cellX(col) + cellW / 2}
          y={cellY(c.own - 1) - 6}
          font-size="13"
          text-anchor="middle"
          fill="#be123c">+{d}</text
        >
      {/if}
      <text x={cellX(col) + cellW / 2} y={H - 6} font-size="13" text-anchor="middle" fill="#475569"
        >u<tspan font-size="10" dy="3">{col + 1}</tspan></text
      >
    {/each}
    {#if paired}
      <rect
        x={left}
        y={base - stair.height * cell}
        width={n * cellW}
        height={stair.height * cell}
        fill="none"
        stroke="#0f172a"
        stroke-width="2"
        stroke-dasharray="6 4"
      />
    {/if}
  </svg>

  <div class="flex flex-wrap items-center gap-3">
    <button
      type="button"
      class={paired ? button.secondary : button.primary}
      aria-pressed={paired}
      onclick={() => (paired = !paired)}>{paired ? 'Bỏ bản sao' : 'Ghép bản sao lật ngược'}</button
    >
    <span class="flex items-center gap-2 text-sm text-slate-600">
      <span class="inline-block h-3 w-3 rounded-sm" style:background={OWN}></span> cầu thang
      <span class="inline-block h-3 w-3 rounded-sm" style:background={COPY}></span> bản sao
    </span>
  </div>

  <FeedbackNote tone="info" text={note} />

  <div class="overflow-x-auto text-center">
    <Tex display math="u_n = u_1 + (n - 1)d" />
    <Tex display math={'S_n = \\dfrac{n(u_1 + u_n)}{2}'} />
  </div>

  <form
    class="flex flex-wrap items-end gap-3"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="block min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >{`Tổng S${SUB[n]} = ${termList.replaceAll(', ', ' + ')} bằng`}</span
      >
      <input
        class="{textInput} max-w-40"
        bind:value={guess}
        inputmode="numeric"
        autocomplete="off"
      />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if feedback}
    <FeedbackNote tone={checked === 'ok' ? 'ok' : 'warn'} text={feedback} />
  {/if}
</div>
