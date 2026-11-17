<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText, numTex, tidy } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { P, add3, coordTex, coordText, len3, mul3, paramTex } from '../_shared/space.js';
  import { LIMIT, PRESETS, RELATION_NAMES, relate } from './engine.js';

  /**
   * Two lines in space, Δ through M with direction u and Δ' through M' with
   * direction u', each set by steppers. The scene draws both lines and the
   * text works out the book's test: are u and u' parallel, and is
   * [u, u'] · MM' zero? The lines are then named parallel, coincident,
   * crossing (with the common point) or skew.
   */

  const C1 = '#2563EB';
  const C2 = '#DC2626';
  const HALF = 3.6;
  /** @type {import('./engine.js').Relation[]} */
  const KEYS = ['song-song', 'cat', 'cheo', 'trung'];
  /** @type {Array<'x' | 'y' | 'z'>} */
  const AXES = ['x', 'y', 'z'];

  let line1 = $state({ m: P(0, 0, 0), u: P(1, 0, 1) });
  let line2 = $state({ m: P(1, -2, 0), u: P(0, 2, 1) });
  let editing = $state('2');
  let view = $state({ yaw: -125, pitch: 22 });

  const active = $derived(editing === '1' ? line1 : line2);
  const w = $derived(relate(line1.m, line1.u, line2.m, line2.u));

  /**
   * @param {'m' | 'u'} part @param {'x' | 'y' | 'z'} k @param {number} v
   */
  function set(part, k, v) {
    const target = editing === '1' ? line1 : line2;
    target[part] = { ...target[part], [k]: v };
  }

  /** @param {keyof typeof PRESETS} key */
  function preset(key) {
    line1 = { m: P(0, 0, 0), u: P(1, 0, 1) };
    line2 = { m: { ...PRESETS[key].m }, u: { ...PRESETS[key].u } };
  }

  /** @param {{ m: import('../_shared/space.js').P3, u: import('../_shared/space.js').P3 }} l */
  function ends(l) {
    const l0 = len3(l.u);
    if (l0 === 0) return null;
    const d = mul3(l.u, HALF / l0);
    return { from: add3(l.m, mul3(d, -1)), to: add3(l.m, d) };
  }

  const e1 = $derived(ends(line1));
  const e2 = $derived(ends(line2));

  const segments = $derived([
    ...(e1 ? [{ key: 'd1', ...e1, color: C1, width: 2.6 }] : []),
    ...(e2 ? [{ key: 'd2', ...e2, color: C2, width: 2.6 }] : []),
  ]);
  const arrows = $derived([
    ...(e1
      ? [{ key: 'u1', from: line1.m, to: add3(line1.m, line1.u), color: C1, width: 3.4 }]
      : []),
    ...(e2
      ? [{ key: 'u2', from: line2.m, to: add3(line2.m, line2.u), color: C2, width: 3.4 }]
      : []),
  ]);
  const dots = $derived([
    { key: 'm1', at: line1.m, color: C1 },
    { key: 'm2', at: line2.m, color: C2 },
    ...(w?.meet ? [{ key: 'i', at: w.meet, color: '#059669', r: 5.5 }] : []),
  ]);
  const labels = $derived([
    { key: 'm1', text: 'M', at: line1.m, color: C1 },
    { key: 'm2', text: "M'", at: line2.m, color: C2 },
    ...(e1 ? [{ key: 'd1', text: 'Δ', at: e1.to, color: C1 }] : []),
    ...(e2 ? [{ key: 'd2', text: "Δ'", at: e2.to, color: C2 }] : []),
    ...(w?.meet ? [{ key: 'i', text: 'I', at: w.meet, color: '#059669' }] : []),
  ]);

  const lines = $derived(
    w
      ? [
          `$\\Delta: ${paramTex(line1.m, line1.u)}$ $\\quad \\Delta': ${paramTex(line2.m, line2.u, 's')}$`,
          `$\\vec{u} = ${coordTex(line1.u)}$, $\\vec{u}' = ${coordTex(line2.u)}$; $${w.crossTex}$.`,
          w.relation === 'trung' || w.relation === 'song-song'
            ? `$[\\vec{u}, \\vec{u}'] = \\vec{0}$: hai vectơ chỉ phương cùng phương. $${w.mmTex}$ ${w.relation === 'trung' ? "cũng cùng phương với $\\vec{u}$, nên $M' \\in \\Delta$" : "không cùng phương với $\\vec{u}$, nên $M' \\notin \\Delta$"}.`
            : `$${w.mmTex}$, $${w.mixTex}$.`,
        ]
      : ['Vectơ chỉ phương phải khác $\\vec{0}$.'],
  );

  /**
   * The common point in TeX: exact when its coordinates have at most two
   * decimals, rounded with ≈ otherwise.
   * @param {import('../_shared/space.js').P3} p
   */
  function meetTex(p) {
    const vals = [p.x, p.y, p.z].map((v) => tidy(v));
    const exact = vals.every((v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6);
    const body = `(${vals.map((v) => numTex(v, 2)).join('; ')})`;
    return exact ? `I${body}` : `I \\approx ${body}`;
  }

  const verdict = $derived(
    w
      ? `Hai đường thẳng ${RELATION_NAMES[w.relation]}${w.meet ? ` tại $${meetTex(w.meet)}$` : ''}.${w.perpendicular ? " Ngoài ra $\\vec{u} \\cdot \\vec{u}' = 0$: hai đường thẳng vuông góc." : ''}`
      : 'Chưa xác định được đường thẳng.',
  );
</script>

<div class="space-y-4">
  <SpaceScene
    axes={3.5}
    {segments}
    {arrows}
    {dots}
    {labels}
    radius={4.4}
    bind:view
    label={`Đường thẳng Δ qua M ${coordText(line1.m)} có vectơ chỉ phương ${coordText(line1.u)} màu xanh dương, đường thẳng Δ' qua M' ${coordText(line2.m)} có vectơ chỉ phương ${coordText(line2.u)} màu đỏ${w ? `, hai đường thẳng ${RELATION_NAMES[w.relation]}` : ''}`}
  />
  <div class="flex flex-wrap gap-2">
    {#each KEYS as key (key)}
      <button type="button" class={button.secondary} onclick={() => preset(key)}
        >Ví dụ {RELATION_NAMES[key]}</button
      >
    {/each}
  </div>
  <SegmentedControl
    label="Đường thẳng đang chỉnh"
    options={[
      { value: '1', label: 'Δ (xanh)' },
      { value: '2', label: "Δ' (đỏ)" },
    ]}
    bind:value={editing}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="space-y-2" role="group" aria-label="Điểm đi qua">
      <p class="text-sm font-semibold text-slate-700">
        Điểm {editing === '1' ? 'M' : "M'"}
      </p>
      {#each AXES as k (k)}
        <Stepper
          label={k}
          value={active.m[k]}
          min={-LIMIT}
          max={LIMIT}
          format={intText}
          onchange={(v) => set('m', k, v)}
        />
      {/each}
    </div>
    <div class="space-y-2" role="group" aria-label="Vectơ chỉ phương">
      <p class="text-sm font-semibold text-slate-700">
        Vectơ chỉ phương {editing === '1' ? 'u' : "u'"}
      </p>
      {#each AXES as k (k)}
        <Stepper
          label={k === 'x' ? 'a' : k === 'y' ? 'b' : 'c'}
          value={active.u[k]}
          min={-LIMIT}
          max={LIMIT}
          format={intText}
          onchange={(v) => set('u', k, v)}
        />
      {/each}
    </div>
  </div>
  <ul class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base">
    {#each lines as line, i (i)}
      <li><LiveRichText text={line} /></li>
    {/each}
  </ul>
  <FeedbackNote tone={w ? 'ok' : 'warn'} text={verdict} />
</div>
