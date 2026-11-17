<script>
  import { onDestroy } from 'svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { fmt } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    MAX_HOURS,
    MAX_SPEED,
    MIN_SPEED,
    ROAD_KM,
    ROUNDS,
    clampSpeed,
    distance,
    hourly,
    noteFor,
    roadLabel,
  } from './engine.js';

  const W = 360;
  const LEFT = 30;
  const RIGHT = W - 16;
  /** @param {number} km */
  const xOf = (km) => LEFT + (km / ROAD_KM) * (RIGHT - LEFT);
  const TICKS = Array.from({ length: ROAD_KM / 50 + 1 }, (_, i) => i * 50);
  const LANES = [
    { key: 'blue', y: 40, body: '#0284c7', name: 'Xe xanh' },
    { key: 'red', y: 92, body: '#e11d48', name: 'Xe đỏ' },
  ];

  let round = $state(0);
  let red = $state(25);
  let hours = $state(0);
  let shown = $state(0);

  const blue = $derived(ROUNDS[round % ROUNDS.length]);
  const note = $derived(noteFor(blue, red, hours));
  const solved = $derived(note.tone === 'ok');

  /** @type {(() => void) | null} */
  let stop = null;
  onDestroy(() => stop?.());

  function run() {
    if (hours >= MAX_HOURS) return;
    hours += 1;
    stop?.();
    if (reducedMotion()) {
      shown = hours;
      return;
    }
    const target = hours;
    stop = frameLoop((dt) => {
      shown = Math.min(target, shown + dt / 0.9);
      if (shown >= target) {
        stop?.();
        stop = null;
      }
    });
  }

  function restart() {
    stop?.();
    stop = null;
    hours = 0;
    shown = 0;
  }

  function nextRound() {
    restart();
    round += 1;
    red = 25;
  }

  /** @param {number} d */
  function bump(d) {
    red = clampSpeed(red + d);
  }

  /** @param {'blue' | string} key */
  const speedOf = (key) => (key === 'blue' ? blue : red);

  const stepBtn = `min-h-12 min-w-14 rounded-xl border-2 border-rose-300 bg-white px-2 text-xl font-bold text-rose-800 hover:bg-rose-50 disabled:opacity-40 ${focusRing}`;
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {W} 140"
    class="w-full rounded-2xl bg-emerald-50"
    role="img"
    aria-label={roadLabel(blue, red, hours, solved)}
  >
    {#each LANES as lane (lane.key)}
      <rect x={LEFT} y={lane.y + 8} width={RIGHT - LEFT} height="6" rx="3" fill="#cbd5e1" />
      {#each hourly(speedOf(lane.key), Math.floor(shown)) as km, i (i)}
        <circle cx={xOf(km)} cy={lane.y + 11} r="4" fill={lane.body} opacity="0.5" />
      {/each}
      <g transform="translate({xOf(distance(speedOf(lane.key), shown))} {lane.y})">
        <rect x="-22" y="-10" width="24" height="14" rx="4" fill={lane.body} />
        <rect x="-16" y="-16" width="12" height="8" rx="2" fill={lane.body} />
        <circle cx="-16" cy="5" r="4" fill="#1e293b" />
        <circle cx="-4" cy="5" r="4" fill="#1e293b" />
      </g>
    {/each}
    <line x1={LEFT} y1="116" x2={RIGHT} y2="116" stroke="#475569" />
    {#each TICKS as km (km)}
      <line x1={xOf(km)} y1="112" x2={xOf(km)} y2="120" stroke="#475569" />
      <text x={xOf(km)} y="134" font-size="11" text-anchor="middle" fill="#334155">{km}</text>
    {/each}
    <text x={RIGHT} y="20" font-size="11" text-anchor="end" fill="#334155">km</text>
  </svg>

  <div class="grid grid-cols-2 gap-2 text-center text-lg">
    <p class="rounded-xl bg-sky-50 p-2 font-semibold text-sky-900">
      Xe xanh: {solved ? `${blue} km/giờ` : '? km/giờ'}
    </p>
    <p class="rounded-xl bg-rose-50 p-2 font-semibold text-rose-900">Xe đỏ: {red} km/giờ</p>
  </div>

  <div
    class="flex flex-wrap items-center justify-center gap-2"
    role="group"
    aria-label="Vận tốc xe đỏ"
  >
    <button
      type="button"
      class={stepBtn}
      disabled={red <= MIN_SPEED}
      onclick={() => bump(-10)}
      aria-label="Giảm vận tốc xe đỏ 10 km/giờ">−10</button
    >
    <button
      type="button"
      class={stepBtn}
      disabled={red <= MIN_SPEED}
      onclick={() => bump(-1)}
      aria-label="Giảm vận tốc xe đỏ 1 km/giờ">−1</button
    >
    <span
      class="min-w-24 text-center text-2xl font-bold tabular-nums text-rose-800"
      aria-live="polite">{red} km/giờ</span
    >
    <button
      type="button"
      class={stepBtn}
      disabled={red >= MAX_SPEED}
      onclick={() => bump(1)}
      aria-label="Tăng vận tốc xe đỏ 1 km/giờ">+1</button
    >
    <button
      type="button"
      class={stepBtn}
      disabled={red >= MAX_SPEED}
      onclick={() => bump(10)}
      aria-label="Tăng vận tốc xe đỏ 10 km/giờ">+10</button
    >
  </div>

  {#if hours > 0}
    <table class="mx-auto text-center text-lg tabular-nums">
      <caption class="text-base text-slate-600">Quãng đường đi được (km)</caption>
      <thead>
        <tr>
          <th class="px-2">Sau</th>
          {#each hourly(1, hours) as h (h)}<th class="px-2">{h} giờ</th>{/each}
        </tr>
      </thead>
      <tbody>
        <tr class="text-sky-800">
          <th class="px-2">Xe xanh</th>
          {#each hourly(blue, hours) as km, i (i)}<td class="px-2">{fmt(km)}</td>{/each}
        </tr>
        <tr class="text-rose-800">
          <th class="px-2">Xe đỏ</th>
          {#each hourly(red, hours) as km, i (i)}<td class="px-2">{fmt(km)}</td>{/each}
        </tr>
      </tbody>
    </table>
  {/if}

  <KidNote tone={note.tone} text={note.text} />

  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={hours >= MAX_HOURS}
      onclick={run}>Chạy 1 giờ</button
    >
    <button type="button" class="min-h-12 text-lg {button.quiet}" onclick={restart}
      >Về vạch xuất phát</button
    >
    {#if solved}
      <button type="button" class="min-h-12 text-lg {button.secondary}" onclick={nextRound}
        >Xe xanh khác</button
      >
    {/if}
  </div>
</div>
