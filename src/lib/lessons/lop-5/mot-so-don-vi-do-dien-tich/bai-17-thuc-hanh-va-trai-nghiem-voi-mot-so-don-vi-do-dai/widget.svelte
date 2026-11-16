<script>
  import { tick } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { PLACES, measureText, nearest, verdict } from './engine.js';

  const SHOWN = `inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold ${focusRing}`;
  const BOX_W = 260;
  const BOX_H = 150;
  const LEFT = 70;

  let index = $state(0);
  /** @type {number | null} */
  let chosen = $state(null);
  let good = $state(0);
  let tried = $state(0);

  const place = $derived(PLACES[index % PLACES.length]);
  const shape = $derived.by(() => {
    const scale = Math.min(BOX_W / place.length, BOX_H / place.width);
    return { w: place.length * scale, h: place.width * scale };
  });
  const result = $derived(chosen === null ? null : verdict(place, chosen));

  /** @type {HTMLElement | undefined} */
  let options = $state();
  /** @type {HTMLButtonElement | undefined} */
  let nextButton = $state();

  /** @param {number} i */
  async function guess(i) {
    if (chosen !== null) return;
    chosen = i;
    tried += 1;
    if (i === nearest(place)) good += 1;
    await tick();
    nextButton?.focus();
  }

  async function next() {
    index += 1;
    chosen = null;
    await tick();
    options?.querySelector('button')?.focus();
  }
</script>

<div class="space-y-4">
  <p class="text-center text-xl font-semibold text-slate-800">
    {place.place} rộng khoảng bao nhiêu? Em ước lượng trước, rồi kiểm tra.
  </p>

  <svg
    viewBox="0 0 {LEFT + BOX_W + 20} {BOX_H + 50}"
    class="mx-auto block w-full max-w-sm"
    role="img"
    aria-label={chosen === null
      ? `${place.place}, hình chữ nhật, chưa biết số đo`
      : `${place.place}, hình chữ nhật dài ${place.length} ${place.side}, rộng ${place.width} ${place.side}`}
  >
    <rect
      x={LEFT + (BOX_W - shape.w) / 2}
      y={10 + (BOX_H - shape.h) / 2}
      width={shape.w}
      height={shape.h}
      rx="4"
      fill="#e0f2fe"
      stroke="#0369a1"
      stroke-width="2.5"
    />
    <text
      x={LEFT + BOX_W / 2}
      y={10 + (BOX_H + shape.h) / 2 + 24}
      text-anchor="middle"
      font-size="18"
      font-weight="700"
      fill="#0f172a">{chosen === null ? '? ' : `${place.length} `}{place.side}</text
    >
    <text
      x={LEFT + (BOX_W - shape.w) / 2 - 8}
      y={10 + BOX_H / 2 + 6}
      text-anchor="end"
      font-size="18"
      font-weight="700"
      fill="#0f172a">{chosen === null ? '? ' : `${place.width} `}{place.side}</text
    >
  </svg>

  <div
    class="grid gap-2 sm:grid-cols-3"
    role="group"
    aria-label="Ước lượng của em"
    bind:this={options}
  >
    {#each place.estimates as e, i (e.text)}
      <button
        type="button"
        class="min-h-14 text-xl {chosen === null
          ? button.secondary
          : i === nearest(place)
            ? `${SHOWN} border-2 border-emerald-600 bg-emerald-50 text-emerald-800`
            : i === chosen
              ? `${SHOWN} border-2 border-amber-500 bg-amber-50 text-amber-900`
              : `${SHOWN} border border-slate-300 bg-white text-slate-500`}"
        aria-pressed={chosen === i}
        disabled={chosen !== null}
        onclick={() => guess(i)}>Khoảng {e.text}</button
      >
    {/each}
  </div>

  {#if chosen !== null && result}
    <p class="rounded-2xl bg-sky-50 px-4 py-3 text-center text-lg text-slate-800">
      Kiểm tra bằng số liệu: {measureText(place)}
    </p>
    <KidNote tone={result.tone} text={result.text} />
    <div class="flex flex-col items-center gap-2">
      <p class="text-base text-slate-600">Em ước lượng sát {good} trên {tried} lần.</p>
      <button
        type="button"
        class="min-h-12 text-lg {button.primary}"
        bind:this={nextButton}
        onclick={next}>Nơi khác</button
      >
    </div>
  {:else}
    <KidNote tone="info" text="Em chọn một ước lượng. Sau đó em xem số đo thật để kiểm tra." />
  {/if}
</div>
