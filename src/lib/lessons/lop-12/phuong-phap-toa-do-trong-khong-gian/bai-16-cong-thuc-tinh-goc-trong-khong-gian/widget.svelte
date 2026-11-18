<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText } from '#lib/core/number-format.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { cross3, mul3 } from '#lib/geom-engine/solid.js';
  import { angleFan, isZero3, len3, P, planePatch } from '#lib/geom-engine/space.js';
  import { coordTex, coordText, degreeText } from '#lib/geom-engine/space-tex.js';
  import { LIMIT, formula, measure } from './engine.js';

  /**
   * Angles in space measured on the figure and by the book's formulas. The
   * learner picks two lines, a line and a plane, or two planes, all through
   * the origin, and sets their direction or normal vectors. The scene marks
   * the angle itself: between the lines, between the line and its
   * projection on the plane, or between two lines perpendicular to the
   * planes' common line, one in each plane; the text works the same angle
   * out with |cos| or |sin| of the vectors and compares the two.
   */

  /** @typedef {import('./engine.js').Mode} Mode */
  /** @typedef {import('#lib/geom-engine/space.js').P3} P3 */

  const C1 = '#2563EB';
  const C2 = '#DC2626';
  const FAN = '#F59E0B';
  const HALF = 3.4;

  /** @type {Record<Mode, { a: P3, b: P3, labels: [string, string] }>} */
  const START = {
    ll: {
      a: P(1, 0, 1),
      b: P(0, 1, 1),
      labels: ['Vectơ chỉ phương u của Δ', "Vectơ chỉ phương u' của Δ'"],
    },
    lp: {
      a: P(1, 1, 0),
      b: P(0, 1, 1),
      labels: ['Vectơ chỉ phương u của Δ', 'Vectơ pháp tuyến n của (P)'],
    },
    pp: {
      a: P(1, 0, 0),
      b: P(1, 1, 0),
      labels: ['Vectơ pháp tuyến n của (P)', "Vectơ pháp tuyến n' của (P')"],
    },
  };

  let mode = $state(/** @type {Mode} */ ('ll'));
  let a = $state(START.ll.a);
  let b = $state(START.ll.b);
  let view = $state({ yaw: -125, pitch: 22 });

  /** @param {string | number} m */
  function pick(m) {
    const key = /** @type {Mode} */ (m);
    a = { ...START[key].a };
    b = { ...START[key].b };
  }

  /** @param {'a' | 'b'} which @param {'x' | 'y' | 'z'} k @param {number} v */
  function set(which, k, v) {
    if (which === 'a') a = { ...a, [k]: v };
    else b = { ...b, [k]: v };
  }

  /** @type {Array<'x' | 'y' | 'z'>} */
  const AXES = ['x', 'y', 'z'];
  /** @type {Array<'a' | 'b'>} */
  const WHICH = ['a', 'b'];

  const f = $derived(formula(mode, a, b));
  const m = $derived(f ? measure(mode, a, b) : null);

  /** @param {P3} d @param {number} h */
  const along = (d, h) => mul3(d, h / len3(d));

  /** @param {string} key @param {P3} d @param {string} color */
  const line = (key, d, color) => ({
    key,
    from: along(d, -HALF),
    to: along(d, HALF),
    color,
    width: 2.6,
  });

  const scene = $derived.by(() => {
    /** @type {any[]} */
    const segments = [];
    /** @type {any[]} */
    const polygons = [];
    /** @type {any[]} */
    const arrows = [];
    /** @type {any[]} */
    const labels = [];
    if (!f || !m) return { segments, polygons, arrows, labels };
    if (mode === 'll') {
      segments.push(line('l1', a, C1), line('l2', b, C2));
      labels.push({ key: 'l1', text: 'Δ', at: along(a, HALF), color: C1 });
      labels.push({ key: 'l2', text: "Δ'", at: along(b, HALF), color: C2 });
    } else if (mode === 'lp') {
      polygons.push({
        key: 'p',
        pts: planePatch(b, P(), 2.6),
        fill: C2,
        opacity: 0.16,
        stroke: '#FCA5A5',
      });
      segments.push(line('l1', a, C1));
      arrows.push({ key: 'n', from: P(), to: along(b, 1.6), color: C2, width: 2.6 });
      if (m.from)
        segments.push({
          key: 'proj',
          from: along(m.from, -HALF),
          to: along(m.from, HALF),
          color: '#64748B',
          width: 1.6,
          dash: true,
        });
      labels.push({ key: 'l1', text: 'Δ', at: along(a, HALF), color: C1 });
      labels.push({ key: 'n', text: 'n', at: along(b, 1.6), color: C2 });
    } else {
      polygons.push({
        key: 'p1',
        pts: planePatch(a, P(), 2.6),
        fill: C1,
        opacity: 0.14,
        stroke: '#93C5FD',
      });
      polygons.push({
        key: 'p2',
        pts: planePatch(b, P(), 2.6),
        fill: C2,
        opacity: 0.14,
        stroke: '#FCA5A5',
      });
      arrows.push({ key: 'n1', from: P(), to: along(a, 1.6), color: C1, width: 2.6 });
      arrows.push({ key: 'n2', from: P(), to: along(b, 1.6), color: C2, width: 2.6 });
      const d = cross3(a, b);
      if (!isZero3(d))
        segments.push({
          key: 'd',
          from: along(d, -HALF),
          to: along(d, HALF),
          color: '#0F172A',
          width: 1.6,
          dash: true,
        });
      if (m.from && m.to) {
        segments.push({ key: 'm1', from: P(), to: along(m.from, 2.2), color: C1, width: 2.2 });
        segments.push({ key: 'm2', from: P(), to: along(m.to, 2.2), color: C2, width: 2.2 });
      }
      labels.push({ key: 'n1', text: 'n', at: along(a, 1.6), color: C1 });
      labels.push({ key: 'n2', text: "n'", at: along(b, 1.6), color: C2 });
    }
    if (m.from && m.to)
      polygons.push({
        key: 'fan',
        pts: angleFan(P(), m.from, m.to, 1.3),
        fill: FAN,
        opacity: 0.45,
        stroke: FAN,
      });
    return { segments, polygons, arrows, labels };
  });

  const vecNames = $derived(
    mode === 'll'
      ? ['\\vec{u}', "\\vec{u}'"]
      : mode === 'lp'
        ? ['\\vec{u}', '\\vec{n}']
        : ['\\vec{n}', "\\vec{n}'"],
  );

  const lines = $derived(
    f
      ? [
          `$${vecNames[0]} = ${coordTex(a)}$, $${vecNames[1]} = ${coordTex(b)}$.`,
          `$${f.tex}$.`,
          `Theo công thức: $${f.angleTex}$.`,
        ]
      : ['Vectơ chỉ phương và vectơ pháp tuyến phải khác $\\vec{0}$.'],
  );

  const what = $derived(
    mode === 'll'
      ? 'góc giữa hai đường thẳng'
      : mode === 'lp'
        ? 'góc giữa Δ và hình chiếu của nó trên (P)'
        : 'góc giữa hai đường thẳng vuông góc với giao tuyến, mỗi đường nằm trong một mặt phẳng',
  );

  const note = $derived(
    f && m
      ? `Đo trên hình (${what}): ${degreeText(m.deg)}. Công thức cho ${degreeText(f.deg)}: hai kết quả khớp nhau.${mode === 'pp' && m.deg === 0 ? ' Hai mặt phẳng song song hoặc trùng nhau, góc bằng $0^\\circ$.' : ''}${mode === 'lp' && m.deg === 90 ? ' Đường thẳng vuông góc với mặt phẳng.' : ''}`
      : 'Chưa đo được góc.',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Góc cần đo"
    options={[
      { value: 'll', label: 'Hai đường thẳng' },
      { value: 'lp', label: 'Đường thẳng và mặt phẳng' },
      { value: 'pp', label: 'Hai mặt phẳng' },
    ]}
    bind:value={mode}
    onchange={pick}
  />
  <SpaceScene
    look="coordinates"
    axes={3.2}
    segments={scene.segments}
    polygons={scene.polygons}
    arrows={scene.arrows}
    labels={scene.labels}
    radius={4}
    bind:view
    label={`${START[mode].labels[0]} ${coordText(a)}, ${START[mode].labels[1]} ${coordText(b)}${m ? `, góc đo được ${degreeText(m.deg)}` : ''}`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    {#each WHICH as which, i (which)}
      <div class="space-y-2" role="group" aria-label={START[mode].labels[i]}>
        <p class="text-sm font-semibold {i ? 'text-red-700' : 'text-blue-700'}">
          {START[mode].labels[i]}
        </p>
        {#each AXES as k (k)}
          <Stepper
            label={k}
            value={(which === 'a' ? a : b)[k]}
            min={-LIMIT}
            max={LIMIT}
            format={intText}
            onchange={(v) => set(which, k, v)}
          />
        {/each}
      </div>
    {/each}
  </div>
  <ul class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base">
    {#each lines as text, i (i)}
      <li><LiveRichText {text} /></li>
    {/each}
  </ul>
  <FeedbackNote tone={f ? 'ok' : 'warn'} text={note} />
</div>
