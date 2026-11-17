<script>
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import {
    CARD,
    KNOBS,
    SOLIDS,
    bestCut,
    foldedFaces,
    measures,
    minSlant,
    shapeOf,
  } from './engine.js';

  /**
   * The net of an open solid made from card, folded step by step: the flat
   * net (to draw, cut and fold) beside the solid in space, which turns by
   * drag or arrow keys. The measures of the folded solid (dihedral angle
   * between a side face and the base, height, lateral edge, volume, card
   * used) follow the sliders.
   */

  const W = 300;
  const H = 260;

  let kind = $state('hop');
  let p = $state(KNOBS.hop[0].start);
  let q = $state(0);
  let fold = $state(60);
  let view = $state({ yaw: -30, pitch: 28 });

  const solid = $derived(SOLIDS.find((s) => s.id === kind) ?? SOLIDS[0]);
  const knobs = $derived(KNOBS[kind]);
  const shape = $derived(shapeOf(kind, p, q));
  const m = $derived(measures(shape));
  const flat = $derived(foldedFaces(shape, 0));
  const faces = $derived(foldedFaces(shape, fold / 100));
  const qMin = $derived(Math.max(knobs[1]?.min ?? 0, minSlant(kind, p)));

  /** Half the size of the flat net, so the scale stays put while folding. */
  const reach = $derived(
    Math.max(...flat.flatMap((f) => f.pts.map((pt) => Math.hypot(pt.x, pt.y)))),
  );
  const scale = $derived((Math.min(W, H) / 2 - 26) / reach);

  /** @param {{ x: number, y: number, z: number }} pt */
  const at3 = (pt) => {
    const v = viewPoint({ x: pt.x, y: pt.y, z: pt.z - (m ? m.h / 2 : 0) * (fold / 100) }, view);
    return { x: W / 2 + scale * v.x, y: H / 2 + scale * v.y, depth: v.depth };
  };
  /** @param {{ x: number, y: number }} pt */
  const at2 = (pt) => ({ x: W / 2 + scale * pt.x, y: H / 2 - scale * pt.y });

  const drawn = $derived(
    faces
      .map((f) => {
        const s = f.pts.map(at3);
        return { f, s, depth: s.reduce((t, v) => t + v.depth, 0) / s.length };
      })
      .sort((a, b) => a.depth - b.depth),
  );

  /** A label at the middle of a side face's base edge and along its slant. */
  const netLabels = $derived.by(() => {
    const side = flat[1];
    const [, , c] = side.pts;
    const top = side.pts.length === 4 ? side.pts[3] : c;
    const far = at2({ x: (c.x + top.x) / 2, y: (c.y + top.y) / 2 });
    return [
      { key: 'b', at: at2({ x: 0, y: 0 }), text: `b = ${formatNumber(shape.b, 2)}` },
      { key: 'd', at: { x: far.x, y: far.y + 12 }, text: `d = ${formatNumber(shape.d, 2)}` },
    ];
  });

  /** @param {string | number} v */
  function pickKind(v) {
    kind = String(v);
    const k = KNOBS[kind];
    p = k[0].start;
    q = k[1]?.start ?? 0;
  }

  /** Keeps the slant long enough after the base changes. @param {number} v */
  function onBase(v) {
    q = Math.max(q, minSlant(kind, v));
  }

  /** @param {number} v */
  const cm = (v) => formatNumber(v, 2);

  const note = $derived.by(() => {
    if (!m)
      return { tone: /** @type {const} */ ('warn'), text: 'Các mặt bên không gặp nhau được.' };
    const vol = `Thể tích $V \\approx ${numTex(m.volume, 2)}$ cm³.`;
    if (fold < 100)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Đã gấp ${fold}%. Mỗi mặt bên quay quanh cạnh đáy; khi gấp xong, mặt bên tạo với đáy góc ${formatNumber(m.phi, 1)}°. Kéo thanh "Gấp" đến 100%.`,
      };
    if (kind === 'hop') {
      const best = bestCut(CARD);
      return {
        tone: p === best ? /** @type {const} */ ('ok') : /** @type {const} */ ('info'),
        text:
          p === best
            ? `${vol} Đây là hộp có thể tích lớn nhất cắt được từ tờ bìa ${CARD} cm × ${CARD} cm: $x = ${best}$ cm, $V = ${best} \\cdot ${CARD - 2 * best}^2 = 128$ cm³.`
            : `${vol} $V = x(${CARD} - 2x)^2$. Thử các giá trị khác của $x$: hộp nào chứa được nhiều nhất?`,
      };
    }
    return {
      tone: /** @type {const} */ ('ok'),
      text: `Đã gấp xong ${solid.name}: các mép cạnh nhau trùng khít, chỉ cần dán băng dính. ${vol}`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Khối cần gấp"
    options={SOLIDS.map((s) => ({ value: s.id, label: s.label }))}
    value={kind}
    onchange={pickKind}
  />
  {#if kind === 'hop'}
    <p class="text-sm text-slate-600">
      Tờ bìa hình vuông cạnh {CARD} cm: cắt bỏ bốn hình vuông cạnh x ở bốn góc rồi gấp lên.
    </p>
  {:else if kind === 'chop-cut'}
    <p class="text-sm text-slate-600">
      Đáy lớn là hình vuông cạnh 8 cm, mặt bên là hình thang cân.
    </p>
  {/if}
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label={knobs[0].label}
      bind:value={p}
      min={knobs[0].min}
      max={knobs[0].max}
      step={knobs[0].step}
      unit="cm"
      oninput={onBase}
    />
    {#if knobs[1]}
      <SliderField
        label={knobs[1].label}
        bind:value={q}
        min={qMin}
        max={knobs[1].max}
        step={knobs[1].step}
        unit="cm"
      />
    {/if}
  </div>
  <SliderField label="Gấp" bind:value={fold} min={0} max={100} step={5} unit="%" />

  <div class="grid gap-3 sm:grid-cols-2">
    <figure class="space-y-1">
      <svg
        viewBox="0 0 {W} {H}"
        class="block w-full rounded-xl border border-slate-200 bg-white"
        role="img"
        aria-label="Lưới phẳng của {solid.name}: đáy là đa giác đều cạnh {cm(
          shape.b,
        )} cm, {shape.n} mặt bên{shape.c > 0 ? '' : ' hình tam giác'} cao {cm(shape.d)} cm"
      >
        {#each flat as f (f.id)}
          <polygon
            points={pointsAttr(f.pts.map(at2))}
            fill={f.kind === 'base' ? '#E2E8F0' : '#C7D2FE'}
            stroke="#1E293B"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        {/each}
        {#each netLabels as l (l.key)}
          <text
            x={l.at.x}
            y={l.at.y + 4}
            font-size="12"
            font-weight="700"
            text-anchor="middle"
            fill="#312E81"
            paint-order="stroke"
            stroke="#FFFFFF"
            stroke-width="3">{l.text}</text
          >
        {/each}
      </svg>
      <figcaption class="text-xs text-slate-500">
        Lưới phẳng, b là cạnh đáy, d là chiều cao mỗi mặt bên (cm): vẽ lên bìa, cắt theo viền, gấp
        theo các cạnh đáy.
      </figcaption>
    </figure>
    <figure class="space-y-1">
      <div
        role="slider"
        tabindex="0"
        aria-label="{solid.name} đã gấp {fold}%. Kéo hoặc dùng phím mũi tên để xoay hình"
        aria-valuemin={-180}
        aria-valuemax={180}
        aria-valuenow={Math.round(view.yaw)}
        aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(
          view.pitch,
        )} độ"
        class="cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
        use:turnSolid={{ view: () => view, onturn: (v) => (view = v), options: { yawRate: 0.6 } }}
      >
        <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
          {#each drawn as d (d.f.id)}
            <polygon
              points={pointsAttr(d.s)}
              fill={d.f.kind === 'base' ? '#CBD5E1' : '#818CF8'}
              fill-opacity="0.75"
              stroke="#1E293B"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          {/each}
        </svg>
      </div>
      <figcaption class="text-xs text-slate-500">
        Hình gấp trong không gian (kéo để xoay).
      </figcaption>
    </figure>
  </div>

  {#if m}
    <dl class="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
      <div class="rounded-lg bg-slate-50 p-2">
        <dt class="text-slate-600">Góc giữa mặt bên và đáy</dt>
        <dd class="font-semibold tabular-nums">{formatNumber(m.phi, 1)}°</dd>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <dt class="text-slate-600">Chiều cao h</dt>
        <dd class="font-semibold tabular-nums">{cm(m.h)} cm</dd>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <dt class="text-slate-600">Cạnh bên</dt>
        <dd class="font-semibold tabular-nums">{cm(m.edge)} cm</dd>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <dt class="text-slate-600">Diện tích đáy</dt>
        <dd class="font-semibold tabular-nums">{cm(m.base)} cm²</dd>
      </div>
      <div class="rounded-lg bg-amber-50 p-2">
        <dt class="text-slate-600">Thể tích</dt>
        <dd class="font-semibold tabular-nums">{cm(m.volume)} cm³</dd>
      </div>
      <div class="rounded-lg bg-slate-50 p-2">
        <dt class="text-slate-600">Diện tích bìa của lưới</dt>
        <dd class="font-semibold tabular-nums">{cm(m.net)} cm²</dd>
      </div>
    </dl>
  {/if}
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
