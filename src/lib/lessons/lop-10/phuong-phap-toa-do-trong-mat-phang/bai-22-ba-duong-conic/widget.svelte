<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { coordText } from '../_shared/coords.js';
  import { BOX, LIMITS, clampC, conicOf, nearest, relationTex } from './engine.js';

  const plane = planeScale(BOX);
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const STRING = '#d97706';
  const FC = '#e11d48';

  let kind = $state(/** @type {import('./engine.js').Kind} */ ('elip'));
  let a = $state(5);
  let c = $state(3);
  let p = $state(2);
  let at = $state(20);

  const conic = $derived(conicOf(kind, { a, c, p }));
  const n = $derived(conic.samples.length);
  const M = $derived(conic.samples[((at % n) + n) % n]);
  const relation = $derived(relationTex(kind, conic, M, a));

  /** Keep a and c valid for the new kind and put M back on the curve. @param {string | number} next */
  function switchKind(next) {
    if (next === 'elip') {
      a = Math.min(7, Math.max(2, a));
      c = clampC('elip', a, c);
    } else if (next === 'hypebol') {
      a = Math.min(4, a);
      c = clampC('hypebol', a, c);
    }
    at = next === 'parabol' ? 60 : 10;
  }
  /** @param {number} next */
  const changeA = (next) => {
    if (kind !== 'parabol') c = clampC(kind, next, c);
  };
  const cRange = $derived(kind === 'parabol' ? [1, 1] : LIMITS[kind].c(a));
  const aRange = $derived(kind === 'hypebol' ? LIMITS.hypebol.a : LIMITS.elip.a);

  const path = $derived.by(() => {
    const pts = conic.samples.map((q) => `${mx(q.x)},${my(q.y)}`);
    if (kind === 'elip') return `M ${pts.join(' L ')} Z`;
    if (kind === 'parabol') return `M ${pts.join(' L ')}`;
    const half = n / 2;
    return `M ${pts.slice(0, half).join(' L ')} M ${pts.slice(half).join(' L ')}`;
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const point = $derived({ x: mx(M.x), y: my(M.y) });
  const handle = $derived({
    point,
    svg: () => svgEl ?? null,
    viewBox: { w: plane.width, h: plane.height },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ q) => {
      const i = nearest(conic.samples, { x: plane.toX(q.x), y: plane.toY(q.y) });
      return { x: mx(conic.samples[i].x), y: my(conic.samples[i].y) };
    },
    onChange: () => {
      at = nearest(conic.samples, { x: plane.toX(point.x), y: plane.toY(point.y) });
    },
    onKeyMove: (
      /** @type {-1 | 0 | 1} */ dx,
      /** @type {-1 | 0 | 1} */ dy,
      /** @type {boolean} */ big,
    ) => {
      const step = (dx || -dy) * (big ? 5 : 1);
      at = (((at + step) % n) + n) % n;
    },
  });

  const KIND_NOTE = {
    elip: 'Sợi dây có độ dài $2a$ buộc ở hai tiêu điểm: kéo $M$ trượt trên elip, tổng $MF_1 + MF_2$ luôn bằng $2a$.',
    hypebol:
      'Trên hypebol, hiệu khoảng cách đến hai tiêu điểm có giá trị tuyệt đối không đổi: $|MF_1 - MF_2| = 2a$.',
    parabol:
      'Mỗi điểm $M$ của parabol cách đều tiêu điểm $F$ và đường chuẩn $\\Delta$: $MF = d(M, \\Delta)$.',
  };
  const label = $derived(
    `${kind === 'elip' ? 'Elip' : kind === 'hypebol' ? 'Hypebol' : 'Parabol'} trên mặt phẳng toạ độ, điểm M${coordText(M.x, M.y)} trên đường.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Đường conic"
    bind:value={kind}
    onchange={switchKind}
    options={[
      { value: 'elip', label: 'Elip' },
      { value: 'hypebol', label: 'Hypebol' },
      { value: 'parabol', label: 'Parabol' },
    ]}
  />
  <div class="flex flex-wrap items-end gap-4">
    {#if kind === 'parabol'}
      <Stepper label="p" bind:value={p} min={LIMITS.parabol.p[0]} max={LIMITS.parabol.p[1]} />
    {:else}
      <Stepper label="a" bind:value={a} min={aRange[0]} max={aRange[1]} onchange={changeA} />
      <Stepper label="c" bind:value={c} min={cRange[0]} max={cRange[1]} />
    {/if}
  </div>

  <CoordinatePlane bind:svgEl {plane} {label}>
    {#if kind === 'parabol'}
      <line
        x1={mx(conic.directrix)}
        y1={my(BOX.yMax)}
        x2={mx(conic.directrix)}
        y2={my(BOX.yMin)}
        stroke="#64748b"
        stroke-width="2"
        stroke-dasharray="6 4"
        style="pointer-events:none"
      />
      <text
        x={mx(conic.directrix) - 6}
        y={my(BOX.yMax) + 14}
        font-size="13"
        font-style="italic"
        font-weight="700"
        text-anchor="end"
        fill="#64748b"
        style="pointer-events:none">Δ</text
      >
    {/if}
    <path d={path} fill="none" stroke={CURVE} stroke-width="2.5" style="pointer-events:none" />
    {#if kind === 'parabol'}
      <polyline
        points="{mx(conic.directrix)},{my(M.y)} {mx(M.x)},{my(M.y)} {mx(conic.foci[0].x)},{my(0)}"
        fill="none"
        stroke={STRING}
        stroke-width="2.5"
        style="pointer-events:none"
      />
    {:else}
      <polyline
        points="{mx(conic.foci[0].x)},{my(0)} {mx(M.x)},{my(M.y)} {mx(conic.foci[1].x)},{my(0)}"
        fill="none"
        stroke={STRING}
        stroke-width="2.5"
        style="pointer-events:none"
      />
    {/if}
    {#each conic.foci as F, i (i)}
      <circle cx={mx(F.x)} cy={my(F.y)} r="5" fill={FC} style="pointer-events:none" />
      <text
        x={mx(F.x)}
        y={my(F.y) + 20}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill={FC}
        stroke="#fff"
        stroke-width="3"
        paint-order="stroke"
        style="pointer-events:none"
        >{conic.foci.length === 1 ? 'F' : `F${i === 0 ? '₁' : '₂'}`}</text
      >
    {/each}
    <g
      class="drag-handle"
      role="slider"
      tabindex="0"
      aria-label="Điểm M trên đường: kéo, hoặc dùng phím mũi tên để trượt"
      aria-valuenow={at}
      aria-valuemin={0}
      aria-valuemax={n - 1}
      aria-valuetext="M{coordText(M.x, M.y)}"
      style="cursor:grab; outline:none"
      use:draggable={handle}
    >
      <circle
        class="drag-knob"
        cx={mx(M.x)}
        cy={my(M.y)}
        r="7"
        fill="#fff"
        stroke={STRING}
        stroke-width="3"
      />
    </g>
    <text
      x={mx(M.x) + 10}
      y={my(M.y) - 10}
      font-size="13"
      font-weight="700"
      fill={STRING}
      stroke="#fff"
      stroke-width="3"
      paint-order="stroke"
      style="pointer-events:none">M</text
    >
  </CoordinatePlane>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-white p-3">
    <p><Tex math={conic.equation} /></p>
    {#each conic.facts as fact (fact)}
      <p><Tex math={fact} /></p>
    {/each}
    <p aria-live="polite"><Tex math={relation} /></p>
  </div>
  <FeedbackNote tone="info" text={KIND_NOTE[kind]} />
</div>
