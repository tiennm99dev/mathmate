<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import VectorArrow from '../_shared/vector-arrow.svelte';
  import { add, coordTex, coordText, crossV, scale } from '../_shared/vectors.js';
  import {
    BOX,
    MAX_STEPS,
    comboTex,
    landTex,
    mRange,
    makeRound,
    same,
    systemTex,
    walk,
  } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  /** @param {{ x: number, y: number }} g */
  const px = (g) => ({ x: mx(g.x), y: my(g.y) });
  const AC = '#4f46e5';
  const BC = '#e11d48';
  const TC = '#059669';

  let seed = $state(1);
  const round = $derived(makeRound(seed));
  let m = $state(0);
  let n = $state(0);
  let found = $state(0);
  let showHint = $state(false);
  let solved = $state(false);

  // The key arrows share the origin: write each name on the side away from
  // the other vector, outside the angle between them, so the names never meet.
  const keySide = $derived(crossV(round.a, round.b) > 0 ? 1 : -1);
  const range = $derived(mRange(round.A, round.a));
  const turn = $derived(walk(round.A, round.a, round.b, m, 0).P);
  const nRange = $derived(mRange(turn, round.b));
  const land = $derived(walk(round.A, round.a, round.b, m, n));
  const hit = $derived(same(land.M, round.T));
  /**
   * The single steps of a walk from `from`: `count` copies of `v`, backwards
   * when `count` is negative.
   * @param {{ x: number, y: number }} from @param {{ x: number, y: number }} v @param {number} count
   */
  const steps = (from, v, count) =>
    Array.from({ length: Math.abs(count) }, (_, i) => ({
      from: add(from, scale(v, Math.sign(count) * i)),
      to: add(from, scale(v, Math.sign(count) * (i + 1))),
    }));
  const aSteps = $derived(steps(round.A, round.a, m));
  const bSteps = $derived(steps(turn, round.b, n));

  /** Count a round once, the first time the walk lands on T. */
  function check() {
    if (same(walk(round.A, round.a, round.b, m, n).M, round.T) && !solved) {
      solved = true;
      found += 1;
    }
  }

  /** Keep n allowed after m moves the turning point. */
  function changeM() {
    n = Math.max(nRange.lo, Math.min(nRange.hi, n));
    check();
  }

  function next() {
    seed += 1;
    m = 0;
    n = 0;
    showHint = false;
    solved = false;
  }

  const note = $derived.by(() => {
    if (hit)
      return `Đúng rồi: $\\overrightarrow{AT} = ${comboTex(round.m, round.n)}$. Vì $\\vec a$, $\\vec b$ không cùng phương nên cặp số $(m; n)$ này là duy nhất.`;
    if (m === 0 && n === 0)
      return 'Tăng hoặc giảm $m$ để đi theo $\\vec a$ (số âm là đi ngược hướng), rồi chỉnh $n$ để đi tiếp theo $\\vec b$.';
    const dx = round.T.x - land.M.x;
    const dy = round.T.y - land.M.y;
    return `$M${coordTex(land.M.x, land.M.y)}$ còn cách $T$ vectơ $\\overrightarrow{MT} = ${coordTex(dx, dy)}$. Thử đổi $m$ hoặc $n$.`;
  });

  const label = $derived(
    `Lưới toạ độ: điểm xuất phát A${coordText(round.A.x, round.A.y)}, đích T${coordText(round.T.x, round.T.y)}, vectơ a ${coordText(round.a.x, round.a.y)}, vectơ b ${coordText(round.b.x, round.b.y)}; đang ở M${coordText(land.M.x, land.M.y)}.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <p class="text-sm text-slate-700">
      <Tex
        math={`A${coordTex(round.A.x, round.A.y)},\\ T${coordTex(round.T.x, round.T.y)},\\ \\vec a = ${coordTex(round.a.x, round.a.y)},\\ \\vec b = ${coordTex(round.b.x, round.b.y)}`}
      />
    </p>
    <p class="text-sm font-semibold text-emerald-700" aria-live="polite">Đã tìm được: {found}</p>
  </div>

  <CoordinatePlane {plane} {label} interactive={false}>
    <!-- The two given vectors drawn from the origin, as a key. -->
    <VectorArrow
      from={px({ x: 0, y: 0 })}
      to={px(round.a)}
      color={AC}
      name="a"
      side={keySide === 1 ? -1 : 1}
      opacity={0.35}
    />
    <VectorArrow
      from={px({ x: 0, y: 0 })}
      to={px(round.b)}
      color={BC}
      name="b"
      side={keySide}
      opacity={0.35}
    />
    <circle
      cx={mx(round.T.x)}
      cy={my(round.T.y)}
      r="11"
      fill={TC}
      fill-opacity="0.18"
      stroke={TC}
      stroke-width="2"
    />
    {#each aSteps as s, i (i)}
      <VectorArrow from={px(s.from)} to={px(s.to)} color={AC} width={3} />
    {/each}
    {#each bSteps as s, i (i)}
      <VectorArrow from={px(s.from)} to={px(s.to)} color={BC} width={3} />
    {/each}
    {#if m !== 0 || n !== 0}
      <VectorArrow from={px(round.A)} to={px(land.M)} color="#0f172a" width={1.5} dashed />
    {/if}
    <circle cx={mx(round.A.x)} cy={my(round.A.y)} r="5" fill="#0f172a" />
    <circle cx={mx(land.M.x)} cy={my(land.M.y)} r="5" fill="#f59e0b" stroke="#0f172a" />
    {#each [{ p: round.A, t: 'A', c: '#0f172a' }, { p: round.T, t: 'T', c: TC }, { p: land.M, t: 'M', c: '#b45309' }] as l (l.t)}
      {#if l.t !== 'M' || !(same(land.M, round.A) || hit)}
        <text
          x={mx(l.p.x) + (l.t === 'T' ? -20 : 9)}
          y={my(l.p.y) - 9}
          font-size="14"
          font-weight="700"
          fill={l.c}
          stroke="#fff"
          stroke-width="3"
          paint-order="stroke"
          style="pointer-events:none">{l.t}</text
        >
      {/if}
    {/each}
  </CoordinatePlane>

  <div class="flex flex-wrap items-center gap-4">
    <Stepper
      label="m (số bước theo a)"
      bind:value={m}
      min={range.lo}
      max={range.hi}
      format={intText}
      onchange={changeM}
    />
    <Stepper
      label="n (số bước theo b)"
      bind:value={n}
      min={nRange.lo}
      max={nRange.hi}
      format={intText}
      onchange={check}
    />
  </div>

  <div class="space-y-1 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p><Tex math={landTex(round.A, land.M, m, n)} /></p>
    {#if showHint}
      <p><Tex math={systemTex(round)} /></p>
    {/if}
  </div>
  <FeedbackNote tone={hit ? 'ok' : 'info'} text={note} />

  <div class="flex flex-wrap gap-3">
    {#if !showHint && !hit}
      <button type="button" class={button.quiet} onclick={() => (showHint = true)}
        >Gợi ý: lập hệ phương trình</button
      >
    {/if}
    <button type="button" class={hit ? button.primary : button.secondary} onclick={next}
      >Điểm mới</button
    >
  </div>
  <p class="text-xs text-slate-500">
    Mỗi bước là một vectơ a hoặc một vectơ b; mỗi số bước từ {intText(-MAX_STEPS)} đến {MAX_STEPS} và
    đường đi không ra ngoài lưới.
  </p>
</div>
