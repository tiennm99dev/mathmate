<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { numTex } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { SUN_TIMES, shadowCm, sunAngle } from './engine.js';

  /**
   * Measuring the angle of the sun's rays with the ground: a 1 m stick
   * stands upright on level ground, the learner reads its shadow on the
   * tape and works out the angle α from tan α = 1 / shadow.
   */

  const W = 360;
  const H = 200;
  const GROUND = 160;
  const FOOT = 330;
  const PX = 100; // pixels per metre

  let index = $state(0);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let said = $state({
    tone: 'info',
    text: 'Đọc độ dài bóng trên thước, rồi tính góc $\\alpha$ giữa tia nắng và mặt đất.',
  });

  const time = $derived(SUN_TIMES[index]);
  const shadow = $derived(shadowCm(time.deg));
  const tipX = $derived(FOOT - (shadow / 100) * PX);
  const angle = $derived(sunAngle(100, shadow));
  /** The sun ray through the stick top, drawn back towards the sun. */
  const ray = $derived.by(() => {
    const dx = FOOT - tipX;
    const k = 1.6;
    return { x: tipX + dx * k, y: GROUND - PX * k };
  });
  const ticks = $derived(
    Array.from({ length: 26 }, (_, i) => i * 10).filter((c) => FOOT - (c / 100) * PX >= 10),
  );

  function check() {
    const v = readNumber(typed);
    if (v === null) {
      said = { tone: 'warn', text: 'Hãy nhập số đo góc theo độ, ví dụ 32 hoặc 32,5.' };
      return;
    }
    if (Math.abs(v - angle) <= 0.6) {
      said = {
        tone: 'ok',
        text: `Đúng: $\\tan\\alpha = \\dfrac{100}{${shadow}}$, nên $\\alpha \\approx ${numTex(angle, 1)}^\\circ$.`,
      };
      return;
    }
    said = {
      tone: 'warn',
      text: `Chưa đúng. Cọc cao $100$ cm, bóng dài ${shadow} cm: góc $\\alpha$ có $\\tan\\alpha = \\dfrac{\\text{chiều cao cọc}}{\\text{độ dài bóng}}$; dùng phím $\\tan^{-1}$ của máy tính.`,
    };
  }

  function next() {
    index = (index + 1) % SUN_TIMES.length;
    typed = '';
    said = {
      tone: 'info',
      text: `Lúc ${SUN_TIMES[index].clock}. Đọc lại độ dài bóng và tính góc $\\alpha$.`,
    };
  }
</script>

<div class="space-y-4">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl rounded-xl border border-slate-200 bg-sky-50"
    role="img"
    aria-label="Lúc {time.clock}, cọc cao 1 m dựng thẳng đứng trên mặt đất phẳng, bóng của cọc dài {shadow} cm"
  >
    <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#D9F99D" />
    <line
      x1={ray.x}
      y1={ray.y}
      x2={tipX}
      y2={GROUND}
      stroke="#F59E0B"
      stroke-width="2"
      stroke-dasharray="6 4"
    />
    <line x1={tipX} y1={GROUND} x2={FOOT} y2={GROUND} stroke="#334155" stroke-width="6" />
    <line x1={FOOT} y1={GROUND} x2={FOOT} y2={GROUND - PX} stroke="#92400E" stroke-width="5" />
    <text x={FOOT + 6} y={GROUND - PX / 2} font-size="12" fill="#1E293B">1 m</text>
    <text x={tipX + 26} y={GROUND - 6} font-size="13" font-weight="700" fill="#B45309">α</text>
    {#each ticks as c (c)}
      {@const x = FOOT - (c / 100) * PX}
      <line x1={x} x2={x} y1={GROUND + 4} y2={GROUND + (c % 50 === 0 ? 14 : 9)} stroke="#334155" />
      {#if c % 50 === 0}
        <text {x} y={GROUND + 28} font-size="10" text-anchor="middle" fill="#334155">{c}</text>
      {/if}
    {/each}
    <text x="8" y={H - 6} font-size="10" fill="#334155">thước đo (cm)</text>
  </svg>
  <p class="text-sm text-slate-700">
    Lúc {time.clock}: bóng cọc dài <span class="font-semibold">{shadow} cm</span>.
  </p>
  <div class="flex flex-wrap items-end gap-2">
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700">Góc α (độ)</span>
      <input
        class={textInput}
        inputmode="decimal"
        bind:value={typed}
        onkeydown={(e) => e.key === 'Enter' && check()}
      />
    </label>
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={next}>Đo lúc khác</button>
  </div>
  <FeedbackNote tone={said.tone} text={said.text} />
</div>
