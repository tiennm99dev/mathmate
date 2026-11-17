<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { lineThrough } from '../_shared/plot.js';
  import { MOTIONS, motionState, windowOf } from './engine.js';

  const S_COLOR = '#2563eb';
  const V_COLOR = '#ea580c';
  const A_COLOR = '#059669';
  const TANGENT = '#334155';
  const HEIGHT = 190;

  let id = $state('cubic');
  let t = $state(0.5);
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;
  const canPlay = !reducedMotion();

  const m = $derived(MOTIONS.find((x) => x.id === id) ?? MOTIONS[0]);
  const st = $derived(motionState(m, t));
  const pos = $derived(m.id === 'spring' ? 'x' : 's');

  /** Half the width of a drawn tangent, in seconds. */
  const half = $derived(m.tMax / 8);
  /** @param {(t: number) => number} f @param {number} k */
  const tangent = (f, k) => ({
    f: lineThrough(t, f(t), k),
    color: TANGENT,
    width: 1.5,
    dashed: true,
    from: t - half,
    to: t + half,
  });

  const graphs = $derived([
    {
      key: 's',
      title: `Vị trí ${pos}(t) (${m.unit})`,
      win: windowOf(m, m.sRange),
      curves: [{ f: m.s, color: S_COLOR }, tangent(m.s, st.v)],
      point: { x: t, y: st.s, color: S_COLOR },
      label: `Đồ thị vị trí theo thời gian; tại t = ${formatNumber(t, 2)} giây, ${pos} = ${formatNumber(st.s, 2)} ${m.unit}, tiếp tuyến có hệ số góc bằng vận tốc ${formatNumber(st.v, 2)}.`,
    },
    {
      key: 'v',
      title: `Vận tốc v(t) (${m.unit}/s)`,
      win: windowOf(m, m.vRange),
      curves: [{ f: m.v, color: V_COLOR }, tangent(m.v, st.a)],
      point: { x: t, y: st.v, color: V_COLOR },
      label: `Đồ thị vận tốc theo thời gian; tại t = ${formatNumber(t, 2)} giây, v = ${formatNumber(st.v, 2)} ${m.unit}/s, tiếp tuyến có hệ số góc bằng gia tốc ${formatNumber(st.a, 2)}.`,
    },
    {
      key: 'a',
      title: `Gia tốc a(t) (${m.unit}/s²)`,
      win: windowOf(m, m.aRange),
      curves: [{ f: m.a, color: A_COLOR }],
      point: { x: t, y: st.a, color: A_COLOR },
      label: `Đồ thị gia tốc theo thời gian; tại t = ${formatNumber(t, 2)} giây, a = ${formatNumber(st.a, 2)} ${m.unit}/s².`,
    },
  ]);

  /** @param {number} v '=' when two decimals write v exactly, else '≈' */
  const rel = (v) => (tidy(v, 2) === tidy(v, 9) ? '=' : '\\approx');
  const values = $derived(
    `Tại $t = ${numTex(t, 2)}$ s: $${pos} ${rel(st.s)} ${numTex(st.s, 2)}$ ${m.unit}, $v ${rel(st.v)} ${numTex(st.v, 2)}$ ${m.unit}/s, $a ${rel(st.a)} ${numTex(st.a, 2)}$ ${m.unit}/s².`,
  );
  const reading = $derived.by(() => {
    if (st.change === 'dung')
      return `$v = 0$: vật dừng lại trong khoảnh khắc (tiếp tuyến của đồ thị vị trí nằm ngang), còn $a ${st.a > 0 ? '> 0' : st.a < 0 ? '< 0' : '= 0'}$ nên vận tốc vẫn đang thay đổi.`;
    const way = st.direction === 'duong' ? 'theo chiều dương ($v > 0$)' : 'theo chiều âm ($v < 0$)';
    if (st.change === 'deu') return `Vật chuyển động ${way}, $a = 0$: vận tốc tạm thời không đổi.`;
    return st.change === 'nhanh'
      ? `Vật chuyển động ${way}; $v$ và $a$ cùng dấu nên vật đang chuyển động nhanh dần.`
      : `Vật chuyển động ${way}; $v$ và $a$ trái dấu nên vật đang chuyển động chậm dần.`;
  });

  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }

  function toggle() {
    if (playing) return halt();
    if (t >= m.tMax) t = 0;
    playing = true;
    stop = frameLoop((dt) => {
      const next = t + dt * (m.tMax / 4);
      if (next >= m.tMax) {
        t = m.tMax;
        halt();
      } else t = tidy(next, 4);
    });
  }

  function choose() {
    halt();
    t = 0.5;
  }

  $effect(() => halt);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chuyển động"
    options={MOTIONS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={choose}
  />

  <div class="space-y-1 overflow-x-auto text-center">
    <div><Tex math={m.sTex} /></div>
    <div><Tex math={m.vTex} /></div>
    <div><Tex math={m.aTex} /></div>
  </div>

  <div class="grid gap-3 lg:grid-cols-3">
    {#each graphs as g (g.key)}
      <figure class="min-w-0">
        <figcaption class="mb-1 text-sm font-semibold text-slate-700">{g.title}</figcaption>
        <GraphBox
          win={g.win}
          label={g.label}
          curves={g.curves}
          points={[{ ...g.point, r: 6 }]}
          marks={[t]}
          height={HEIGHT}
        />
      </figure>
    {/each}
  </div>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Thời điểm t"
      bind:value={t}
      min={0}
      max={m.tMax}
      step={0.05}
      format={(v) => `t = ${formatNumber(v, 2)} s`}
      oninput={halt}
    />
    {#if canPlay}
      <button type="button" class={button.secondary} onclick={toggle}>
        {playing ? 'Tạm dừng' : 'Cho vật chuyển động'}
      </button>
    {/if}
  </div>

  <p class="text-sm text-slate-700">
    Nét đứt trên đồ thị vị trí là tiếp tuyến: hệ số góc của nó là vận tốc. Nét đứt trên đồ thị vận
    tốc có hệ số góc là gia tốc.
  </p>
  <FeedbackNote tone="info" text={values} />
  <FeedbackNote tone="ok" text={reading} />
</div>
