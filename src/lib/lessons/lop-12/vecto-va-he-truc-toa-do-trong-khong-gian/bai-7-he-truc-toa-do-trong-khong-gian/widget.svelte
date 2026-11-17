<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { rng } from '#lib/core/drill.js';
  import { intText } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { P, coordTex, coordText, ijkTex, same3 } from '../_shared/space.js';
  import {
    LIMIT,
    PLANES,
    boxEdges,
    corner,
    makeTarget,
    planeSquare,
    project,
    wrongCoords,
  } from './engine.js';

  /**
   * The system Oxyz with a point M set by its three coordinates: dashed lines
   * of the box from O to M show where each coordinate is read, a chosen
   * coordinate plane is shaded with the projection of M on it, and the vector
   * OM is written with i, j, k. In the challenge an orange point N with its
   * box is drawn, and the learner places M on it.
   */

  const M_COLOR = '#2563EB';
  const N_COLOR = '#EA580C';
  const PROJ = '#059669';
  const rand = rng(20241107);

  let x = $state(2);
  let y = $state(3);
  let z = $state(2);
  /** @type {import('./engine.js').PlaneId} */
  let plane = $state('Oxy');
  let challenge = $state(false);
  let target = $state(makeTarget(rand));
  let found = $state(0);
  let view = $state({ yaw: -125, pitch: 22 });

  const m = $derived(P(x, y, z));
  const h = $derived(project(m, plane));
  const planeName = $derived(PLANES.find((p) => p.id === plane)?.name ?? '');
  const hit = $derived(challenge && same3(m, target));

  /** The shaded part of the chosen plane, a square around O. */
  const planeRect = $derived(planeSquare(plane, LIMIT + 0.6));

  const segments = $derived([
    ...boxEdges(m).map((e) => ({
      ...e,
      key: `m-${e.key}`,
      color: M_COLOR,
      width: 1.3,
      dash: true,
    })),
    ...(challenge
      ? boxEdges(target).map((e) => ({
          ...e,
          key: `n-${e.key}`,
          color: N_COLOR,
          width: 1.3,
          dash: true,
        }))
      : []),
    { key: 'proj', from: m, to: h, color: PROJ, width: 2, dash: false },
  ]);

  const arrows = $derived([{ key: 'om', from: P(), to: m, color: M_COLOR, width: 2.6 }]);

  const polygons = $derived([
    { key: 'plane', pts: planeRect, fill: PROJ, opacity: 0.1, stroke: '#A7F3D0' },
  ]);

  const dots = $derived([
    ...(challenge ? [{ key: 'n', at: target, color: N_COLOR, r: 6 }] : []),
    { key: 'h', at: h, color: PROJ },
    { key: 'm', at: m, color: M_COLOR, r: 5 },
    ...[1, 2, 4].map((bit) => ({ key: `axis-${bit}`, at: corner(m, bit), color: '#475569', r: 3 })),
  ]);

  const labels = $derived([
    { key: 'O', text: 'O', at: P(), dx: -12, dy: 12 },
    { key: 'M', text: 'M', at: m, color: M_COLOR },
    { key: 'H', text: "M'", at: h, color: PROJ },
    ...(challenge ? [{ key: 'N', text: 'N', at: target, color: N_COLOR, dx: 14, dy: -10 }] : []),
  ]);

  function nextTarget() {
    if (hit) found += 1;
    target = makeTarget(rand, target);
  }

  const status = $derived.by(() => {
    if (!challenge) return null;
    if (hit) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng: $N${coordTex(target)}$. Hình chiếu của $N$ trên ba trục cho hoành độ $${target.x}$, tung độ $${target.y}$, cao độ $${target.z}$.`,
      };
    }
    const wrong = wrongCoords(m, target);
    return {
      tone: /** @type {const} */ ('info'),
      text: `$M$ chưa trùng $N$: còn sai ${wrong.join(', ')}. Xoay hình và dò theo các đường nét đứt màu cam tới ba trục.`,
    };
  });
</script>

<div class="space-y-4">
  <SpaceScene
    axes={LIMIT + 1}
    {segments}
    {arrows}
    {polygons}
    {dots}
    {labels}
    radius={4.1}
    bind:view
    label={`Hệ trục Oxyz với điểm M có toạ độ ${coordText(m)}, hình chiếu M' của M trên mặt phẳng ${planeName} có toạ độ ${coordText(h)}${challenge ? `, điểm N màu cam cần tìm` : ''}`}
  />
  <div class="grid gap-2 sm:grid-cols-3" role="group" aria-label="Toạ độ của điểm M">
    <Stepper label="x" bind:value={x} min={-LIMIT} max={LIMIT} format={intText} />
    <Stepper label="y" bind:value={y} min={-LIMIT} max={LIMIT} format={intText} />
    <Stepper label="z" bind:value={z} min={-LIMIT} max={LIMIT} format={intText} />
  </div>
  <SegmentedControl
    label="Chiếu M xuống mặt phẳng toạ độ"
    options={PLANES.map((p) => ({ value: p.id, label: p.name }))}
    bind:value={plane}
  />
  <div class="space-y-1 rounded-xl bg-slate-50 px-4 py-3 text-base">
    <p>
      <LiveRichText text={`$M${coordTex(m)}$, nghĩa là $\\overrightarrow{OM} = ${ijkTex(m)}$.`} />
    </p>
    <p>
      <LiveRichText
        text={`Hình chiếu của $M$ trên mặt phẳng $${planeName}$ là $M'${coordTex(h)}$.`}
      />
    </p>
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={challenge ? button.primary : button.secondary}
      aria-pressed={challenge}
      onclick={() => (challenge = !challenge)}>Thử thách: tìm điểm N</button
    >
    {#if challenge}
      <button type="button" class={button.quiet} onclick={nextTarget}>Điểm khác</button>
    {/if}
  </div>
  {#if status}
    <FeedbackNote tone={status.tone} text={status.text} />
    <p class="text-sm text-slate-600" aria-live="polite">
      Đã tìm đúng {found + (hit ? 1 : 0)} điểm.
    </p>
  {/if}
</div>
