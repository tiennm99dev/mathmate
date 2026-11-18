<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { formatNumber, intText, numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { add3, mul3 } from '#lib/geom-engine/solid.js';
  import { circle3, footOnEquation, len3, P, planePatch } from '#lib/geom-engine/space.js';
  import { overSqrtTex, paramTex, planeTex, sphereTex } from '#lib/geom-engine/space-tex.js';
  import {
    lineInput,
    linePlane,
    lineSphere,
    planeInput,
    planeSphere,
    sphereInput,
  } from './engine.js';

  /**
   * A small GeoGebra 3D scene: the plane (P), the line d and the sphere (S)
   * are typed in by their coefficients, drawn in a view that turns by drag or
   * arrow keys, and listed in an Algebra panel as GeoGebra input lines and
   * as the book's equations. The scene finds where they meet (Intersect)
   * and checks three tasks: make (P) tangent to (S), make d parallel to (P),
   * make d cut (S) at two points.
   */

  const PLANE = '#F59E0B';
  const LINE = '#DC2626';
  const SPHERE = '#6366F1';
  const MEET = '#059669';

  let a = $state(0);
  let b = $state(0);
  let c = $state(1);
  let d = $state(0);
  let mx = $state(3);
  let my = $state(-2);
  let mz = $state(1);
  let ux = $state(0);
  let uy = $state(1);
  let uz = $state(1);
  let ia = $state(0);
  let ib = $state(0);
  let ic = $state(2);
  let r = $state(3);
  let show = $state({ plane: true, line: true, sphere: true });
  let editing = $state('plane');
  let view = $state({ yaw: -125, pitch: 22 });

  const n = $derived(P(a, b, c));
  const m = $derived(P(mx, my, mz));
  const u = $derived(P(ux, uy, uz));
  const centre = $derived(P(ia, ib, ic));
  const planeOk = $derived(a !== 0 || b !== 0 || c !== 0);
  const lineOk = $derived(ux !== 0 || uy !== 0 || uz !== 0);

  const lp = $derived(linePlane(n, d, m, u));
  const ps = $derived(planeSphere(n, d, centre, r));
  const ls = $derived(lineSphere(m, u, centre, r));

  /** @param {number} v */
  const coord = (v) => formatNumber(v, 2);
  /** @param {import('#lib/geom-engine/solid.js').P3} p */
  const pointText = (p) => {
    const exact = [p.x, p.y, p.z].every((v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-9);
    return `${exact ? '' : '≈ '}(${coord(p.x)}; ${coord(p.y)}; ${coord(p.z)})`;
  };

  const polygons = $derived([
    ...(show.plane && planeOk
      ? [
          {
            key: 'p',
            pts: planePatch(n, footOnEquation(n, d, P()), 3.6),
            fill: PLANE,
            opacity: 0.22,
            stroke: '#D97706',
          },
        ]
      : []),
    ...(show.sphere
      ? [{ key: 'eq', pts: circle3(centre, r), fill: SPHERE, opacity: 0.04, stroke: '#A5B4FC' }]
      : []),
    ...(show.plane && show.sphere && ps.kind === 'circle' && ps.centre
      ? [{ key: 'cut', pts: circle3(ps.centre, ps.r, n), fill: MEET, opacity: 0.2, stroke: MEET }]
      : []),
  ]);
  const discs = $derived(
    show.sphere ? [{ key: 's', at: centre, r, fill: SPHERE, opacity: 0.1, stroke: SPHERE }] : [],
  );
  const lineEnds = $derived.by(() => {
    if (!lineOk) return null;
    const k = mul3(u, 5.5 / len3(u));
    return { from: add3(m, mul3(k, -1)), to: add3(m, k) };
  });
  const segments = $derived(
    show.line && lineEnds ? [{ key: 'd', ...lineEnds, color: LINE, width: 2.4 }] : [],
  );

  const meets = $derived([
    ...(show.line && show.plane && planeOk && lp.kind === 'cut' ? [lp.point] : []),
    ...(show.line && show.sphere ? ls.points : []),
    ...(show.plane && show.sphere && ps.kind === 'tangent' && ps.centre ? [ps.centre] : []),
  ]);
  const dots = $derived([
    ...(show.line ? [{ key: 'm', at: m, color: LINE, r: 4.5 }] : []),
    ...(show.sphere ? [{ key: 'i', at: centre, color: SPHERE, r: 4.5 }] : []),
    ...meets.map((p, i) => ({ key: `x${i}`, at: p, color: MEET, r: 5.5 })),
  ]);
  const labels = $derived([
    ...(show.line ? [{ key: 'm', text: 'M', at: m, color: LINE }] : []),
    ...(show.line && lineEnds ? [{ key: 'd', text: 'd', at: lineEnds.to, color: LINE }] : []),
    ...(show.sphere ? [{ key: 'i', text: 'I', at: centre, color: SPHERE }] : []),
    ...(show.sphere
      ? [{ key: 's', text: '(S)', at: add3(centre, P(0, 0, r)), color: SPHERE }]
      : []),
    ...(show.plane && planeOk
      ? [
          {
            key: 'p',
            text: '(P)',
            at: planePatch(n, footOnEquation(n, d, P()), 3.6)[0],
            color: '#B45309',
          },
        ]
      : []),
  ]);

  const lpText = $derived(
    !planeOk || !lineOk
      ? ''
      : lp.kind === 'cut'
        ? `Intersect(p, d): $d$ cắt $(P)$ tại điểm ${pointText(lp.point)}, ứng với $t = ${numTex(lp.t, 2)}$.`
        : lp.kind === 'inside'
          ? '$d$ nằm trong $(P)$: $\\vec{n} \\cdot \\vec{u} = 0$ và $M$ thuộc $(P)$.'
          : '$d$ song song với $(P)$: $\\vec{n} \\cdot \\vec{u} = 0$ nhưng $M$ không thuộc $(P)$.',
  );
  const psText = $derived(
    !planeOk
      ? ''
      : `$d(I, (P)) = ${overSqrtTex(Math.abs(ps.top), ps.nn)}${Number.isInteger(ps.d) ? '' : ` \\approx ${numTex(ps.d, 2)}`}$ ${
          ps.kind === 'circle'
            ? `$< R$: $(P)$ cắt $(S)$ theo đường tròn tâm ${pointText(ps.centre ?? P())}, bán kính $r = \\sqrt{R^2 - d^2} ${Number.isInteger(ps.r) ? '=' : '\\approx'} ${numTex(ps.r, 2)}$.`
            : ps.kind === 'tangent'
              ? `$= R$: $(P)$ tiếp xúc với $(S)$ tại ${pointText(ps.centre ?? P())}.`
              : '$> R$: $(P)$ và $(S)$ không có điểm chung.'
        }`,
  );
  const lsText = $derived(
    !lineOk
      ? ''
      : ls.kind === 'two'
        ? `$d$ cắt $(S)$ tại hai điểm ${ls.points.map(pointText).join(' và ')}.`
        : ls.kind === 'tangent'
          ? `$d$ tiếp xúc với $(S)$ tại ${pointText(ls.points[0])}.`
          : `$d$ không cắt $(S)$: khoảng cách từ $I$ đến $d$ là $\\approx ${numTex(ls.dist, 2)} > R$.`,
  );

  const tasks = $derived([
    { text: 'Mặt phẳng $(P)$ tiếp xúc với mặt cầu $(S)$.', done: planeOk && ps.kind === 'tangent' },
    {
      text: 'Đường thẳng $d$ song song với $(P)$ (không nằm trong $(P)$).',
      done: planeOk && lineOk && lp.kind === 'parallel',
    },
    { text: 'Đường thẳng $d$ cắt $(S)$ tại hai điểm.', done: lineOk && ls.kind === 'two' },
  ]);
  const doneCount = $derived(tasks.filter((t) => t.done).length);

  const warning = $derived(
    !planeOk
      ? 'Vectơ pháp tuyến $(A; B; C)$ phải khác $\\vec{0}$: GeoGebra báo phương trình không xác định mặt phẳng.'
      : !lineOk
        ? 'Vectơ chỉ phương $\\vec{u}$ phải khác $\\vec{0}$: Vector((0, 0, 0)) không xác định đường thẳng.'
        : '',
  );

  const sceneLabel = $derived(
    `Cảnh 3D: ${show.plane ? `mặt phẳng ${planeInput(n, d)}; ` : ''}${show.line ? `đường thẳng qua M ${pointText(m)} với vectơ chỉ phương (${ux}; ${uy}; ${uz}); ` : ''}${show.sphere ? `mặt cầu tâm I ${pointText(centre)} bán kính ${r}; ` : ''}${meets.length} điểm chung được đánh dấu`,
  );

  /** @type {Array<{ value: string, label: string }>} */
  const EDIT = [
    { value: 'plane', label: 'Mặt phẳng (P)' },
    { value: 'line', label: 'Đường thẳng d' },
    { value: 'sphere', label: 'Mặt cầu (S)' },
  ];
  /** @type {Array<{ key: 'plane' | 'line' | 'sphere', name: string, input: string }>} */
  const rows = $derived([
    { key: 'plane', name: 'p', input: planeInput(n, d) },
    { key: 'line', name: 'd', input: lineInput(m, u) },
    { key: 'sphere', name: 's', input: sphereInput(centre, r) },
  ]);
  /** @param {'plane' | 'line' | 'sphere'} key */
  const toggle = (key) => (show = { ...show, [key]: !show[key] });
</script>

<div class="space-y-4">
  <SpaceScene
    look="coordinates"
    axes={4}
    {discs}
    {polygons}
    {segments}
    {dots}
    {labels}
    radius={6}
    bind:view
    label={sceneLabel}
  />

  <div
    class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800"
    role="group"
    aria-label="Cửa sổ Đại số"
  >
    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cửa sổ Đại số</p>
    {#each rows as row (row.key)}
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="{button.quiet} min-w-11 shrink-0 px-2"
          aria-pressed={show[row.key]}
          aria-label="{show[row.key] ? 'Ẩn' : 'Hiện'} {row.name}"
          onclick={() => toggle(row.key)}>{show[row.key] ? '●' : '○'}</button
        >
        <span class="min-w-0 break-words font-mono">{row.name}: {row.input}</span>
      </div>
    {/each}
  </div>

  <SegmentedControl label="Đối tượng đang nhập" options={EDIT} bind:value={editing} />

  {#if editing === 'plane'}
    <div class="space-y-2">
      <p class="text-sm"><LiveRichText text={`$(P): ${planeTex(n, d)}$`} /></p>
      <div class="grid gap-2 sm:grid-cols-2">
        <Stepper label="A" bind:value={a} min={-3} max={3} format={intText} />
        <Stepper label="B" bind:value={b} min={-3} max={3} format={intText} />
        <Stepper label="C" bind:value={c} min={-3} max={3} format={intText} />
        <Stepper label="D" bind:value={d} min={-9} max={9} format={intText} />
      </div>
    </div>
  {:else if editing === 'line'}
    <div class="space-y-2">
      <p class="text-sm">
        <LiveRichText
          text={lineOk ? `$d: ${paramTex(m, u)}$` : '$\\vec{u} = \\vec{0}$: chưa có đường thẳng.'}
        />
      </p>
      <div class="grid gap-2 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
        <Stepper label="x của M" bind:value={mx} min={-4} max={4} format={intText} />
        <Stepper label="y của M" bind:value={my} min={-4} max={4} format={intText} />
        <Stepper label="z của M" bind:value={mz} min={-4} max={4} format={intText} />
        <Stepper label="a của u" bind:value={ux} min={-3} max={3} format={intText} />
        <Stepper label="b của u" bind:value={uy} min={-3} max={3} format={intText} />
        <Stepper label="c của u" bind:value={uz} min={-3} max={3} format={intText} />
      </div>
    </div>
  {:else}
    <div class="space-y-2">
      <p class="text-sm"><LiveRichText text={`$(S): ${sphereTex(centre, r * r)}$`} /></p>
      <div class="grid gap-2 sm:grid-cols-2">
        <Stepper label="x của I" bind:value={ia} min={-3} max={3} format={intText} />
        <Stepper label="y của I" bind:value={ib} min={-3} max={3} format={intText} />
        <Stepper label="z của I" bind:value={ic} min={-3} max={3} format={intText} />
        <Stepper label="R" bind:value={r} min={1} max={4} format={intText} />
      </div>
    </div>
  {/if}

  {#if warning}
    <FeedbackNote tone="warn" text={warning} />
  {:else}
    <ul
      class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
      aria-live="polite"
    >
      {#each [lpText, psText, lsText].filter(Boolean) as text, i (i)}
        <li><LiveRichText {text} /></li>
      {/each}
    </ul>
  {/if}

  <div class="space-y-1 rounded-xl border border-slate-200 px-4 py-3">
    <p class="text-sm font-semibold text-slate-700">Nhiệm vụ ({doneCount}/{tasks.length})</p>
    <ul class="space-y-1 text-sm">
      {#each tasks as task, i (i)}
        <li class={task.done ? 'text-emerald-700' : 'text-slate-700'}>
          <span aria-hidden="true">{task.done ? '✓' : '○'}</span>
          <span class="sr-only">{task.done ? 'Đã xong:' : 'Chưa xong:'}</span>
          <LiveRichText text={task.text} />
        </li>
      {/each}
    </ul>
  </div>
  <FeedbackNote
    tone={doneCount === tasks.length ? 'ok' : 'info'}
    text={doneCount === tasks.length
      ? 'Hoàn thành cả ba nhiệm vụ! Xoay cảnh để nhìn các điểm chung từ nhiều phía.'
      : 'Sửa hệ số của các đối tượng để hoàn thành các nhiệm vụ. Mỗi khi đổi một hệ số, cửa sổ Đại số và cảnh 3D cập nhật ngay.'}
  />
</div>
