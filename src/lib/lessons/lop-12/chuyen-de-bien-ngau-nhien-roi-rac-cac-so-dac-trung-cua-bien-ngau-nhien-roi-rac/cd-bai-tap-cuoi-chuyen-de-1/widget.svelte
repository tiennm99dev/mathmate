<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { GAMES, expectedGain, expectedTex, playRound, playSummary, verdict } from './engine.js';

  let gameId = $state(GAMES[0].id);
  const game = $derived(GAMES.find((g) => g.id === gameId) ?? GAMES[0]);
  let knob = $state(GAMES[0].start);
  let rounds = $state(0);
  let total = $state(0);
  /** @type {number | null} */
  let lastIndex = $state(null);

  const outcomes = $derived(game.outcomes(knob));
  const e = $derived(expectedGain(outcomes));
  const judge = $derived(verdict(outcomes));

  function resetPlay() {
    rounds = 0;
    total = 0;
    lastIndex = null;
  }

  /** @param {string | number} id */
  function chooseGame(id) {
    const g = GAMES.find((x) => x.id === id) ?? GAMES[0];
    knob = g.start;
    resetPlay();
  }

  /** @param {number} count */
  function play(count) {
    let sum = 0;
    let idx = 0;
    for (let i = 0; i < count; i += 1) {
      idx = playRound(outcomes, Math.random);
      sum += outcomes[idx].gain;
    }
    rounds += count;
    total += sum;
    lastIndex = idx;
  }

  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);
  const playText = $derived(
    playSummary(rounds, total, e, lastIndex === null ? null : outcomes[lastIndex].label),
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Trò chơi"
    options={GAMES.map((g) => ({ value: g.id, label: g.label }))}
    bind:value={gameId}
    onchange={chooseGame}
  />
  <p class="text-sm text-slate-600"><LiveRichText text={game.story} /></p>

  <SliderField
    label={game.knob}
    bind:value={knob}
    min={game.min}
    max={game.max}
    step={game.step}
    unit="nghìn đồng"
    oninput={resetPlay}
  />

  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-center text-sm tabular-nums">
      <caption class="sr-only">Bảng phân bố xác suất của tiền lời X của người chơi</caption>
      <thead>
        <tr class="text-slate-600">
          <th scope="col" class="border border-slate-200 p-2 text-left">Kết quả</th>
          <th scope="col" class="border border-slate-200 p-2">X (nghìn đồng)</th>
          <th scope="col" class="border border-slate-200 p-2">P</th>
        </tr>
      </thead>
      <tbody>
        {#each outcomes as o, i (o.label)}
          <tr class={lastIndex === i ? 'bg-amber-50' : ''}>
            <th scope="row" class="border border-slate-200 p-2 text-left font-normal">{o.label}</th>
            <td
              class="border border-slate-200 p-2 font-semibold {o.gain < 0
                ? 'text-rose-700'
                : 'text-emerald-700'}">{fmt(o.gain)}</td
            >
            <td class="border border-slate-200 p-2"><Tex math={`\\dfrac{${o.num}}{${o.den}}`} /></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="overflow-x-auto rounded-xl border border-indigo-200 bg-white p-3">
    <Tex math={expectedTex(outcomes)} display />
  </div>
  <FeedbackNote tone={judge.tone} text={judge.text} />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => play(1)}>Chơi 1 ván</button>
    <button type="button" class={button.secondary} onclick={() => play(100)}>Chơi 100 ván</button>
    <button type="button" class={button.secondary} onclick={() => play(1000)}
      >Chơi {formatNumber(1000)} ván</button
    >
    <button type="button" class={button.quiet} onclick={resetPlay} disabled={rounds === 0}
      >Làm lại</button
    >
  </div>
  <FeedbackNote tone="info" text={playText} />
</div>
