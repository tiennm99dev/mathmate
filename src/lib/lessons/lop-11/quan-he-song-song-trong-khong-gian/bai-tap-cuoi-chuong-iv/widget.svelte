<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { EDGES, FACES, PRESETS, PYRAMID, SHAPE_NAME, judge, sectionOf } from './engine.js';

  /**
   * Building a cross-section (dựng thiết diện) of the pyramid S.ABCD: the
   * learner picks a plane (α), moves its given points along their edges,
   * marks the edges (α) cuts and checks; then the section is drawn with each
   * side named as the line of (α) with a face.
   */

  const SECTION = '#DC2626';
  const GIVEN = '#4F46E5';

  let presetId = $state(PRESETS[0].id);
  let ratios = $state(PRESETS[0].given.map((g) => g.t));
  let picked = $state(/** @type {string[]} */ ([]));
  let checked = $state(false);
  let shown = $state(false);
  let view = $state({ yaw: -30, pitch: 22 });

  const preset = $derived(
    /** @type {import('./engine.js').Preset} */ (PRESETS.find((p) => p.id === presetId)),
  );
  const s = $derived(sectionOf(preset, ratios));
  const givenEdges = $derived(new Set(preset.given.map((g) => g.edge)));
  const pickedSet = $derived(new Set([...picked, ...givenEdges]));
  const verdict = $derived(judge(pickedSet, s.hits));
  const done = $derived(shown || (checked && verdict.ok));

  function reset() {
    picked = [];
    checked = false;
    shown = false;
  }

  /** @param {string | number} id */
  function choose(id) {
    const p = /** @type {import('./engine.js').Preset} */ (PRESETS.find((x) => x.id === id));
    ratios = p.given.map((g) => g.t);
    reset();
  }

  /** @param {string} edge */
  function toggle(edge) {
    if (givenEdges.has(edge)) return;
    picked = picked.includes(edge) ? picked.filter((e) => e !== edge) : [...picked, edge];
    checked = false;
  }

  const segments = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').SceneSegment[]} */
    const list = EDGES.map((e) => ({
      key: e,
      from: e[0],
      to: e[1],
      color: checked && verdict.extra.includes(e) ? '#F59E0B' : undefined,
      width: pickedSet.has(e) ? 3 : 2,
    }));
    if (done) {
      s.vertices.forEach((v, i) => {
        const next = s.vertices[(i + 1) % s.vertices.length];
        list.push({ key: `s${i}`, from: v.point, to: next.point, color: SECTION, width: 2.5 });
      });
    }
    return list;
  });

  const polygons = $derived(
    done
      ? [
          {
            key: 'section',
            pts: s.vertices.map((v) => v.point),
            fill: SECTION,
            opacity: 0.22,
          },
        ]
      : [],
  );

  const dots = $derived([
    ...s.given.map((g) => ({ at: g.point, color: GIVEN })),
    ...(done
      ? s.vertices
          .filter((v) => !s.given.some((g) => g.name === v.name))
          .map((v) => ({ at: v.point, color: SECTION }))
      : []),
  ]);

  const labels = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').SceneLabel[]} */
    const list = Object.keys(PYRAMID).map((k) => ({ text: k, at: k }));
    for (const g of s.given) list.push({ text: g.name, at: g.point, color: GIVEN, dx: 12, dy: -4 });
    if (done) {
      for (const v of s.vertices) {
        if (s.given.some((g) => g.name === v.name) || v.name in PYRAMID) continue;
        list.push({ text: v.name, at: v.point, color: SECTION, dx: 12, dy: -4 });
      }
    }
    return list;
  });

  /** @param {import('./engine.js').GivenPoint} g */
  const ratioLabel = (g) =>
    `Vị trí của ${g.name}: ${g.edge[0]}${g.name} : ${g.edge[0]}${g.edge[1]}`;

  const cutEdges = $derived(s.hits.filter((h) => h.hit === 'cut').map((h) => h.edge));
  const atVertex = $derived(s.vertices.filter((v) => v.name in PYRAMID).map((v) => v.name));
  const faceText = (/** @type {string} */ f) => `(${f})`;

  const note = $derived.by(() => {
    const name = s.vertices.map((v) => v.name).join('');
    const sides = s.sides
      .map((x) => `$${x.from}${x.to} = (\\alpha) \\cap ${faceText(x.face)}$`)
      .join('; ');
    const vertexText = atVertex.length
      ? ` $(\\alpha)$ đi qua đỉnh $${atVertex.join(', ')}$ của hình chóp.`
      : '';
    const solved = `Thiết diện là ${SHAPE_NAME[s.shape]} $${name}$, có ${s.vertices.length} cạnh nằm trên ${s.vertices.length} mặt của hình chóp: ${sides}.${vertexText}`;
    if (shown && !(checked && verdict.ok))
      return { tone: /** @type {const} */ ('info'), text: solved };
    if (checked && verdict.ok)
      return { tone: /** @type {const} */ ('ok'), text: `Đúng! ${solved}` };
    if (checked) {
      const parts = [];
      if (verdict.missing.length)
        parts.push(`$(\\alpha)$ còn cắt cạnh khác ngoài các cạnh em chọn`);
      if (verdict.extra.length)
        parts.push(`cạnh $${verdict.extra.join(', ')}$ (tô cam) không bị $(\\alpha)$ cắt`);
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Chưa đúng: ${parts.join('; ')}. Gợi ý: tìm giao tuyến của $(\\alpha)$ với từng mặt chứa một điểm đã biết; mặt phẳng song song với một đường thẳng cắt mặt chứa đường thẳng đó theo giao tuyến song song với nó.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `${preset.text} Chọn tất cả các cạnh của hình chóp mà $(\\alpha)$ cắt (các cạnh chứa điểm đã cho được chọn sẵn), rồi bấm "Kiểm tra".`,
    };
  });

  const sceneLabel = $derived(
    `Hình chóp S.ABCD đáy hình bình hành. ${preset.label}. ` +
      (done
        ? `Thiết diện là ${SHAPE_NAME[s.shape]} ${s.vertices.map((v) => v.name).join('')}, cắt các cạnh ${cutEdges.join(', ')}`
        : 'Thiết diện chưa được vẽ'),
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Mặt phẳng (α)"
    options={PRESETS.map((p) => ({ value: p.id, label: p.label }))}
    bind:value={presetId}
    onchange={choose}
  />
  <SpaceScene
    points={PYRAMID}
    faces={FACES}
    {segments}
    {polygons}
    {dots}
    {labels}
    centre={{ x: 0, y: 0, z: 1.5 }}
    radius={3.6}
    bind:view
    label={sceneLabel}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    {#each preset.given as g, i (presetId + g.name)}
      <SliderField
        label={ratioLabel(g)}
        bind:value={ratios[i]}
        min={0.1}
        max={0.9}
        step={0.1}
        format={(v) => formatNumber(v)}
        oninput={reset}
      />
    {/each}
  </div>
  <fieldset class="min-w-0">
    <legend class="mb-2 text-sm font-semibold text-slate-700">
      Mặt phẳng (α) cắt những cạnh nào?
    </legend>
    <div class="flex flex-wrap gap-2">
      {#each EDGES as e (e)}
        {@const on = pickedSet.has(e)}
        <button
          type="button"
          class="min-h-11 min-w-14 rounded-lg border px-3 font-semibold transition {focusRing} {on
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'} {givenEdges.has(e)
            ? 'cursor-default opacity-80'
            : ''}"
          aria-pressed={on}
          aria-disabled={givenEdges.has(e)}
          aria-label="Cạnh {e}{givenEdges.has(e) ? ', chứa điểm đã cho' : ''}"
          onclick={() => toggle(e)}>{e}</button
        >
      {/each}
    </div>
  </fieldset>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button>
    <button type="button" class={button.secondary} onclick={() => (shown = true)}>
      Xem thiết diện
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
  {#if done}
    <p class="text-sm text-slate-600">
      <LiveRichText
        text={`Các cạnh bị cắt: $${cutEdges.join(',\\ ')}$. Hãy xoay hình để thấy thiết diện nằm trong hình chóp.`}
      />
    </p>
  {/if}
</div>
