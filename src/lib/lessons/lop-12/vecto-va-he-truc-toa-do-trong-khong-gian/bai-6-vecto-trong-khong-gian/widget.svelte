<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { arrowTex } from '../_shared/space.js';
  import { BOX_EDGES, EDGES, TARGETS, VERTEX, boxPoints, chain, sumTex, why } from './engine.js';

  /**
   * The parallelepiped rule: the learner switches the edge vectors AB, AD,
   * AA' on and off and sees their sum drawn head to tail along the edges and
   * as one vector from A, for any shape of the box (the base angle and the
   * lean of the lateral edge change it). A challenge asks for the choice
   * whose sum is a given vector.
   */

  const COLORS = { 1: '#2563EB', 2: '#DC2626', 4: '#059669' };
  const SUM = '#7C3AED';

  let mask = $state(0);
  let base = $state(70);
  let lean = $state(0.6);
  let target = $state(7);
  let view = $state({ yaw: -30, pitch: 20 });

  const pts = $derived(boxPoints(base, lean));
  const steps = $derived(chain(mask));
  const sum = $derived(sumTex(mask));
  const solved = $derived(mask === target);

  const segments = $derived(
    BOX_EDGES.map(([a, b]) => ({
      key: `${a}-${b}`,
      from: pts[VERTEX[a]],
      to: pts[VERTEX[b]],
      color: '#94A3B8',
      width: 1.3,
    })),
  );

  const arrows = $derived([
    ...EDGES.filter((e) => mask & e.bit).map((e) => ({
      key: `edge-${e.bit}`,
      from: pts.A,
      to: pts[e.to],
      color: COLORS[e.bit],
      width: 3,
    })),
    ...steps
      .filter((s) => s.from !== 0)
      .map((s) => ({
        key: `step-${s.from}-${s.to}`,
        from: pts[VERTEX[s.from]],
        to: pts[VERTEX[s.to]],
        color: COLORS[/** @type {1 | 2 | 4} */ (s.bit)],
        width: 2.2,
        dash: true,
      })),
    ...(steps.length > 1
      ? [{ key: 'sum', from: pts.A, to: pts[VERTEX[mask]], color: SUM, width: 3.6 }]
      : []),
  ]);

  const labels = $derived(VERTEX.map((v) => ({ key: v, text: v, at: pts[v] })));

  /** @param {number} bit */
  function toggle(bit) {
    mask ^= bit;
  }

  function nextTarget() {
    const i = TARGETS.indexOf(target);
    target = TARGETS[(i + 1) % TARGETS.length];
    mask = 0;
  }

  const status = $derived.by(() => {
    if (solved) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng: $${sum}$. ${why(mask)}`,
      };
    }
    if (!mask) return { tone: /** @type {const} */ ('info'), text: 'Chọn ít nhất một vectơ.' };
    if (steps.length === 1) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Mới chọn một vectơ $${arrowTex('A', VERTEX[mask])}$: chọn thêm để cộng.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Hiện tại: $${sum}$. ${why(mask)}`,
    };
  });
</script>

<div class="space-y-4">
  <p class="text-base">
    <LiveRichText
      text={`Thử thách: chọn các vectơ trong $\\overrightarrow{AB}$, $\\overrightarrow{AD}$, $\\overrightarrow{AA'}$ có tổng bằng $${arrowTex('A', VERTEX[target])}$.`}
    />
  </p>
  <SpaceScene
    {segments}
    {arrows}
    {labels}
    centre={{ x: pts["C'"].x / 2, y: pts["C'"].y / 2, z: 1 }}
    radius={2.7}
    bind:view
    label={`Hình hộp ABCD.A'B'C'D'${sum ? `, đang vẽ tổng bằng vectơ A${VERTEX[mask]}` : ''}`}
  />
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn các vectơ cộng lại">
    {#each EDGES as e (e.bit)}
      <button
        type="button"
        class={mask & e.bit ? button.primary : button.secondary}
        aria-pressed={(mask & e.bit) !== 0}
        aria-label="vectơ A{e.to}"
        onclick={() => toggle(e.bit)}
      >
        <LiveRichText text={`$${arrowTex('A', e.to)}$`} />
      </button>
    {/each}
    <button type="button" class={button.quiet} onclick={nextTarget}>Vectơ khác</button>
  </div>
  <FeedbackNote tone={status.tone} text={status.text} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Góc ở đáy BAD"
      bind:value={base}
      min={40}
      max={120}
      step={5}
      format={(v) => `${formatNumber(v)}°`}
    />
    <SliderField
      label="Độ nghiêng cạnh bên AA'"
      bind:value={lean}
      min={-1}
      max={1.5}
      step={0.1}
      format={(v) => formatNumber(v, 1)}
    />
  </div>
  <p class="text-sm text-slate-600">
    <LiveRichText
      text={"Đổi hình dạng hình hộp: tổng $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$ vẫn luôn là đường chéo $\\overrightarrow{AC'}$."}
    />
  </p>
</div>
