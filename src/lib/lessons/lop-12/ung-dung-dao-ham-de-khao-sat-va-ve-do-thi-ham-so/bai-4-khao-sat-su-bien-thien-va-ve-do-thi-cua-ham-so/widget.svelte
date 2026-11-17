<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button } from '#lib/core/ui.js';
  import { intText } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import VariationTable from '../_shared/variation-table.svelte';
  import { FAMILIES, STEP_TITLES, survey } from './engine.js';

  /** @type {Record<string, string>} */
  const COLORS = {
    max: '#dc2626',
    min: '#2563eb',
    center: '#d97706',
    oy: '#475569',
    ox: '#475569',
  };
  const DRAW_SECONDS = 2.5;

  /** @type {import('./engine.js').FamilyId} */
  let id = $state('cubic');
  // One coefficient list per family, so the family and its coefficients
  // always change together: a quadratic over linear survey never sees the
  // four coefficients of a cubic while the switch is changing.
  /** @type {Record<import('./engine.js').FamilyId, number[]>} */
  let coefsBy = $state({
    cubic: [...FAMILIES[0].start],
    linear: [...FAMILIES[1].start],
    quad: [...FAMILIES[2].start],
  });
  let shownSteps = $state(1);
  let progress = $state(1);
  /** @type {(() => void) | null} */
  let stop = null;

  const fam = $derived(FAMILIES.find((f) => f.id === id) ?? FAMILIES[0]);
  const s = $derived(survey(id, coefsBy[id]));

  /** @param {string | number} next */
  function choose(next) {
    const f = FAMILIES.find((v) => v.id === next) ?? FAMILIES[0];
    coefsBy[f.id] = [...f.start];
    restart();
  }
  function restart() {
    stop?.();
    stop = null;
    shownSteps = 1;
    progress = 1;
  }
  function draw() {
    stop?.();
    if (reducedMotion()) {
      progress = 1;
      return;
    }
    progress = 0;
    stop = frameLoop((dt) => {
      progress = Math.min(1, progress + dt / DRAW_SECONDS);
      if (progress >= 1) {
        stop?.();
        stop = null;
      }
    });
  }
  function next() {
    if (shownSteps >= STEP_TITLES.length) return;
    shownSteps += 1;
    if (shownSteps === STEP_TITLES.length) draw();
  }
  function all() {
    const was = shownSteps;
    shownSteps = STEP_TITLES.length;
    if (was < STEP_TITLES.length) draw();
  }
  $effect(() => () => stop?.());

  const curveTo = $derived(s.win.xMin + progress * (s.win.xMax - s.win.xMin));
  const curves = $derived(
    s.ok && shownSteps >= 5
      ? [{ f: s.f, color: '#4f46e5', breaks: s.poles, to: curveTo, width: 3 }]
      : [],
  );
  const lines = $derived(
    s.ok && shownSteps >= 3 ? s.asymptotes.map((l) => ({ ...l, color: '#dc2626' })) : [],
  );
  const points = $derived(
    s.ok
      ? s.specials
          .filter((p) => (p.kind === 'max' || p.kind === 'min' ? shownSteps >= 4 : shownSteps >= 5))
          .map((p) => ({
            x: p.x,
            y: p.y,
            color: COLORS[p.kind],
            r: p.kind === 'ox' || p.kind === 'oy' ? 4 : 6,
          }))
      : [],
  );
  const label = $derived(
    `Hệ trục cho đồ thị ${s.text}. ${shownSteps >= 3 && s.asymptotes.length ? 'Các tiệm cận vẽ nét đứt màu đỏ. ' : ''}${shownSteps >= 5 ? (progress < 1 ? 'Đồ thị đang được vẽ từ trái sang phải.' : 'Đồ thị đã vẽ xong; điểm đỏ là cực đại, xanh là cực tiểu, cam là tâm đối xứng.') : 'Đồ thị chưa vẽ.'}`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dạng hàm số"
    options={FAMILIES.map((f) => ({ value: f.id, label: f.label }))}
    bind:value={id}
    onchange={choose}
  />
  <div class="overflow-x-auto text-center text-sm text-slate-600">
    <Tex math={fam.general} />
  </div>
  <div class="flex flex-wrap gap-x-5 gap-y-2">
    {#each fam.names as name, i (name)}
      <Stepper
        label={name}
        bind:value={coefsBy[id][i]}
        min={fam.ranges[i][0]}
        max={fam.ranges[i][1]}
        format={intText}
      />
    {/each}
  </div>
  <div class="overflow-x-auto text-center">
    <Tex display math={s.tex} />
  </div>

  {#if !s.ok}
    <FeedbackNote tone="warn" text={s.problem ?? ''} />
  {:else}
    <ol class="space-y-2">
      {#each STEP_TITLES.slice(0, shownSteps) as title, i (title)}
        <li class="rounded-xl border border-slate-200 bg-white p-3">
          <p class="text-sm font-semibold text-indigo-700">Bước {i + 1}. {title}</p>
          <p class="mt-1 text-sm text-slate-800"><LiveRichText text={s.steps[i]} /></p>
          {#if i === 3}
            <div class="mt-2"><VariationTable table={s.table} /></div>
          {/if}
        </li>
      {/each}
    </ol>
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        class={button.primary}
        onclick={next}
        disabled={shownSteps >= STEP_TITLES.length}
      >
        Bước tiếp theo
      </button>
      <button type="button" class={button.quiet} onclick={all}>Xem cả 5 bước</button>
      <button type="button" class={button.quiet} onclick={restart}>Làm lại từ bước 1</button>
      {#if shownSteps >= STEP_TITLES.length}
        <button type="button" class={button.quiet} onclick={draw}>Vẽ lại đồ thị</button>
      {/if}
    </div>
  {/if}

  <GraphBox win={s.win} {label} {curves} {lines} {points} height={300} />
  <p class="text-sm text-slate-600" aria-live="polite">
    {#if !s.ok}
      Chọn lại hệ số để khảo sát.
    {:else if shownSteps < 3}
      Đồ thị sẽ hiện dần: tiệm cận ở bước 3, điểm cực trị ở bước 4, đường cong ở bước 5.
    {:else if shownSteps < 5}
      Đã có {s.asymptotes.length ? 'tiệm cận' : 'khung'}{shownSteps >= 4
        ? ' và các điểm cực trị'
        : ''}; bước 5 sẽ vẽ đường cong.
    {:else}
      Điểm đỏ: cực đại; điểm xanh: cực tiểu; điểm cam: tâm đối xứng; điểm xám: giao với các trục.
    {/if}
  </p>
</div>
