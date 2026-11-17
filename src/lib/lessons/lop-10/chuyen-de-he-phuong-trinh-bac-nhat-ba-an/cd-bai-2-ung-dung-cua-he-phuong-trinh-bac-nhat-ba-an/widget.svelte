<script>
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import { checkValues, equationTex, substitutionTex } from '../_shared/system3.js';
  import { SCENARIOS } from './scenarios.js';

  let id = $state(SCENARIOS[0].id);
  const scenario = $derived(SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]);
  const names = $derived(scenario.unknowns.map((u) => u.name));

  /** @type {number[]} */
  let values = $state(SCENARIOS[0].unknowns.map((u) => u.start));

  /** @param {string | number} next */
  function choose(next) {
    const s = SCENARIOS.find((x) => x.id === next) ?? SCENARIOS[0];
    values = s.unknowns.map((u) => u.start);
  }

  const system = $derived(
    `\\begin{cases} ${scenario.equations.map((e) => equationTex(e.coeffs, e.rhs, names)).join(' \\\\ ')} \\end{cases}`,
  );
  const checks = $derived(checkValues(scenario.equations, values));
  const solved = $derived(checks.every((c) => c.ok));
  const reaction = $derived(
    id === 'phan-ung'
      ? `\\mathrm{C_3H_8} + ${values[0]}\\,\\mathrm{O_2} \\to ${values[1]}\\,\\mathrm{CO_2} + ${values[2]}\\,\\mathrm{H_2O}`
      : null,
  );

  const note = $derived.by(() => {
    if (solved)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Cả ba phương trình đều đúng. ${scenario.done}`,
      };
    const wrong = checks.findIndex((c) => !c.ok);
    const c = checks[wrong];
    const side = c.left < c.rhs ? 'nhỏ hơn' : 'lớn hơn';
    const right = checks.filter((x) => x.ok).length;
    return {
      tone: /** @type {const} */ ('info'),
      text: `Đúng ${right} trong 3 phương trình. Ở phương trình (${wrong + 1}), vế trái bằng $${numTex(c.left)}$, ${side} vế phải $${numTex(c.rhs)}$. Đổi giá trị các ẩn, hoặc giải hệ rồi kéo thanh trượt đến nghiệm để kiểm tra.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn tình huống"
    options={SCENARIOS.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={id}
    onchange={choose}
  />

  <p class="text-sm text-slate-700"><LiveRichText text={scenario.story} /></p>

  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
    <p class="text-left text-xs font-semibold text-slate-600">Hệ phương trình lập được</p>
    <Tex math={system} display />
  </div>

  <div class="space-y-3 rounded-xl border border-slate-200 p-3">
    {#each scenario.unknowns as u, i (scenario.id + u.name)}
      <SliderField
        label={u.label}
        bind:value={values[i]}
        min={u.min}
        max={u.max}
        step={u.step}
        unit={u.unit}
        format={(v) => formatNumber(v)}
      />
    {/each}
  </div>

  {#if reaction}
    <div class="overflow-x-auto text-center" aria-live="polite">
      <Tex math={reaction} display />
    </div>
  {/if}

  <ul class="space-y-2 text-sm">
    {#each scenario.equations as e, i (i)}
      {@const c = checks[i]}
      <li
        class="rounded-lg border px-3 py-2 {c.ok
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-slate-200 bg-white'}"
      >
        <span class="font-semibold">({i + 1}) <LiveRichText text={e.meaning} /></span>
        <span class="block overflow-x-auto">
          <Tex
            math={`${substitutionTex(e.coeffs, values)} = ${numTex(c.left)} ${c.ok ? '=' : '\\ne'} ${numTex(c.rhs)}`}
          />
          <span class="ml-1 font-semibold {c.ok ? 'text-emerald-700' : 'text-amber-800'}">
            {c.ok ? 'đúng' : 'chưa đúng'}
          </span>
        </span>
      </li>
    {/each}
  </ul>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
