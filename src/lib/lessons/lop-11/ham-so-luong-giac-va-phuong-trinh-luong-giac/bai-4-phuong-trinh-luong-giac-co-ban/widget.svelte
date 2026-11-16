<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { circlePoint, isNiceAngle } from '../_shared/trig.js';
  import { asymptotes, graphPath, piText } from '../_shared/graph.js';
  import { SPECIAL_VALUES, alphaTex, baseAngle, solutionTex } from '../_shared/equations.js';
  import { X_MAX, X_MIN, circleHits, mRange, solutionChips } from './engine.js';

  /** @typedef {import('../_shared/trig.js').TrigName} TrigName */

  // The circle and the graph share one unit, so the line y = m is level
  // across both for sin (and for tan on the tangent axis).
  const W = 520;
  const H = 260;
  const CY = 130;
  const G0 = 175;
  const G1 = 510;
  const FAMILY = ['#4f46e5', '#e11d48'];

  let name = $state(/** @type {TrigName} */ ('sin'));
  let m = $state(0.5);
  /** TeX of m when it was set by a preset button, so it shows exactly. */
  let mExact = $state(/** @type {string | null} */ ('\\dfrac{1}{2}'));

  const range = $derived(mRange(name));
  const U = $derived(name === 'sin' || name === 'cos' ? 60 : 36);
  const LIMIT = $derived(name === 'sin' || name === 'cos' ? 2 : 3.4);
  const C = $derived({ x: 80, y: CY });
  /** @param {number} deg */
  const gx = (deg) => G0 + ((deg - X_MIN) * (G1 - G0)) / (X_MAX - X_MIN);
  const gy = $derived((/** @type {number} */ y) => CY - y * U);

  const curve = $derived(graphPath(name, X_MIN, X_MAX, gx, gy, LIMIT));
  const walls = $derived(name === 'tan' || name === 'cot' ? asymptotes(name, X_MIN, X_MAX) : []);
  const chips = $derived(solutionChips(name, m));
  const hits = $derived(circleHits(name, m));
  const alpha = $derived(baseAngle(name, m));
  const formula = $derived(solutionTex(name, m));
  const mTex = $derived(mExact ?? numTex(m, 2));

  /** @param {TrigName} n */
  function choose(n) {
    name = n;
    m = n === 'sin' || n === 'cos' ? 0.5 : 1;
    mExact = n === 'sin' || n === 'cos' ? '\\dfrac{1}{2}' : '1';
  }

  const equationTex = $derived(`\\${name} x = ${mTex}`);
  const note = $derived.by(() => {
    if (alpha === null) {
      return `$|${mTex}| > 1$ nên đường thẳng $y = ${mTex}$ không cắt đồ thị: phương trình $${equationTex}$ vô nghiệm.`;
    }
    const n = chips.length;
    const where =
      name === 'sin'
        ? 'Trên đường tròn, đường thẳng $y = m$ cắt tại các điểm có tung độ $m$.'
        : name === 'cos'
          ? 'Trên đường tròn, đường thẳng $x = m$ cắt tại các điểm có hoành độ $m$.'
          : name === 'tan'
            ? 'Trên đường tròn, đường thẳng $OT$ (với $T(1; m)$ trên trục tang) cắt tại hai điểm đối xứng qua $O$.'
            : 'Trên đường tròn, đường thẳng $OS$ (với $S(m; 1)$ trên trục côtang) cắt tại hai điểm đối xứng qua $O$.';
    return `Đường thẳng $y = ${mTex}$ cắt đồ thị tại $${n}$ điểm trên đoạn $[-2\\pi; 2\\pi]$; mỗi họ nghiệm (một màu) lặp lại sau mỗi chu kì $${name === 'sin' || name === 'cos' ? '2\\pi' : '\\pi'}$. ${where}`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phương trình"
    options={[
      { value: 'sin', label: 'sin x = m' },
      { value: 'cos', label: 'cos x = m' },
      { value: 'tan', label: 'tan x = m' },
      { value: 'cot', label: 'cot x = m' },
    ]}
    value={name}
    onchange={(v) => choose(/** @type {TrigName} */ (v))}
  />

  <svg
    viewBox="0 0 {W} {H}"
    class="block w-full select-none rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={`Đồ thị y = ${name} x trên đoạn từ −2π đến 2π và đường thẳng y = ${formatNumber(m, 2)}; có ${chips.length} giao điểm.`}
  >
    <!-- unit circle -->
    <line x1={C.x - U - 12} y1={CY} x2={C.x + U + 14} y2={CY} stroke="#94a3b8" />
    <line x1={C.x} y1={CY + U + 12} x2={C.x} y2={CY - U - 14} stroke="#94a3b8" />
    <circle cx={C.x} cy={CY} r={U} fill="none" stroke="#334155" stroke-width="1.5" />
    {#if name === 'sin'}
      <line
        x1="8"
        y1={gy(m)}
        x2={C.x + U + 20}
        y2={gy(m)}
        stroke="#0f766e"
        stroke-width="1.5"
        stroke-dasharray="5 3"
      />
    {:else if name === 'cos'}
      <line
        x1={C.x + m * U}
        y1="8"
        x2={C.x + m * U}
        y2={H - 8}
        stroke="#0f766e"
        stroke-width="1.5"
        stroke-dasharray="5 3"
      />
    {:else if name === 'tan'}
      <line x1={C.x + U} y1="8" x2={C.x + U} y2={H - 8} stroke="#94a3b8" stroke-dasharray="3 3" />
      <line
        x1={C.x - U}
        y1={CY + m * U}
        x2={C.x + U}
        y2={gy(m)}
        stroke="#0f766e"
        stroke-width="1.5"
      />
      <circle cx={C.x + U} cy={gy(m)} r="4" fill="#0f766e" />
    {:else}
      <line
        x1="8"
        y1={CY - U}
        x2={C.x + U + 50}
        y2={CY - U}
        stroke="#94a3b8"
        stroke-dasharray="3 3"
      />
      <line
        x1={C.x - m * U}
        y1={CY + U}
        x2={C.x + m * U}
        y2={CY - U}
        stroke="#0f766e"
        stroke-width="1.5"
      />
      <circle cx={C.x + m * U} cy={CY - U} r="4" fill="#0f766e" />
    {/if}
    {#each hits as h (h.x)}
      {@const p = circlePoint(C, U, h.x)}
      <circle cx={p.x} cy={p.y} r="6" fill={FAMILY[h.family]} stroke="#fff" stroke-width="1.5" />
    {/each}

    <!-- graph -->
    <line x1={G0 - 5} y1={CY} x2={G1 + 5} y2={CY} stroke="#94a3b8" />
    <line x1={gx(0)} y1="8" x2={gx(0)} y2={H - 8} stroke="#94a3b8" />
    {#each [-360, -180, 180, 360] as t (t)}
      <line x1={gx(t)} y1={CY - 4} x2={gx(t)} y2={CY + 4} stroke="#94a3b8" />
      <text x={gx(t)} y={CY + 18} font-size="12" text-anchor="middle" fill="#475569"
        >{piText(t)}</text
      >
    {/each}
    {#each [1, -1] as v (v)}
      <line x1={gx(0) - 4} y1={gy(v)} x2={gx(0) + 4} y2={gy(v)} stroke="#94a3b8" />
      <text x={gx(0) - 7} y={gy(v) + 4} font-size="12" text-anchor="end" fill="#475569"
        >{v === 1 ? '1' : '−1'}</text
      >
    {/each}
    {#each walls as a (a)}
      <line x1={gx(a)} y1="8" x2={gx(a)} y2={H - 8} stroke="#cbd5e1" stroke-dasharray="5 4" />
    {/each}
    <path d={curve} fill="none" stroke="#334155" stroke-width="2" />
    <line x1={G0} y1={gy(m)} x2={G1} y2={gy(m)} stroke="#0f766e" stroke-width="2" />
    <text x={G1 - 4} y={gy(m) - 6} font-size="12" text-anchor="end" fill="#0f766e">y = m</text>
    {#each chips as c (c.x)}
      <line
        x1={gx(c.x)}
        y1={gy(m)}
        x2={gx(c.x)}
        y2={CY}
        stroke={FAMILY[c.family]}
        stroke-dasharray="2 3"
      />
      <circle cx={gx(c.x)} cy={gy(m)} r="5" fill={FAMILY[c.family]} />
    {/each}
  </svg>

  <SliderField
    label="Giá trị của m"
    bind:value={m}
    min={range.min}
    max={range.max}
    step={range.step}
    format={(v) => formatNumber(v, 2)}
    oninput={() => (mExact = null)}
  />
  <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn m là một giá trị đặc biệt">
    {#each SPECIAL_VALUES[name] as s (s.tex)}
      <button
        type="button"
        class="{button.quiet} min-w-14 px-2 text-sm"
        aria-pressed={mExact === s.tex}
        onclick={() => {
          m = s.value;
          mExact = s.tex;
        }}><Tex math={s.tex} /></button
      >
    {/each}
  </div>

  <div class="space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
    <p class="font-semibold text-slate-700">Phương trình <Tex math={equationTex} /></p>
    {#if formula.length === 0}
      <p>Vô nghiệm.</p>
    {:else}
      {#if alpha !== null && !isNiceAngle(alpha)}
        <p>
          Góc <Tex math="\alpha" /> tìm bằng máy tính cầm tay: <Tex math={alphaTex(alpha)} />
        </p>
      {/if}
      {#each formula as line, i (line)}
        <p style="color:{FAMILY[i]}"><Tex math={`${line} \\quad (k \\in \\mathbb{Z})`} /></p>
      {/each}
      <p class="text-slate-600">Nghiệm trên đoạn [−2π; 2π]:</p>
      <ul class="flex flex-wrap gap-2">
        {#each chips as c (c.x)}
          <li
            class="rounded-full border px-3 py-1 font-semibold tabular-nums"
            style="border-color:{FAMILY[c.family]}; color:{FAMILY[c.family]}"
          >
            {c.text} <span class="font-normal text-slate-500">(k = {c.k})</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <FeedbackNote tone={alpha === null ? 'warn' : 'info'} text={note} />
</div>
