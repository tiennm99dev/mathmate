<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { lerp3 } from '#lib/geom-engine/space.js';
  import {
    CUBE,
    EDGES,
    FACES,
    PRESETS,
    RANGE,
    SIDE,
    STEPS,
    best,
    presetOf,
    placeOf,
    verdict,
  } from './engine.js';

  /**
   * Two skew lines of a cube, with M sliding on the first and N on the
   * second. Moving them to make MN as short as possible brings out the
   * common perpendicular segment, whose length is the distance between the
   * two lines; a button shows it directly.
   */

  const A_COLOR = '#DC2626';
  const B_COLOR = '#2563EB';
  const MN_OFF = '#64748B';
  const MN_ON = '#059669';

  let id = $state(PRESETS[0].id);
  let m = $state(6);
  let n = $state(18);
  let view = $state({ yaw: -32, pitch: 22 });

  const p = $derived(presetOf(String(id)));
  const s = $derived(placeOf(p, m, n));
  const said = $derived(verdict(p, s));

  function reveal() {
    const c = best(p);
    m = c.m;
    n = c.n;
  }

  /** @param {number} k */
  const stepText = (k) => formatNumber(k / STEPS, 2);

  /**
   * A line drawn past both of its vertices.
   * @param {[string, string]} seg @param {string} color @param {string} key
   */
  function long(seg, color, key) {
    const a = CUBE[seg[0]];
    const b = CUBE[seg[1]];
    const line = { color, width: 3 };
    return [
      { key: `${key}-0`, from: lerp3(a, b, -0.3), to: seg[0], ...line, dash: false },
      { key: `${key}-1`, from: seg[0], to: seg[1], ...line, dash: /** @type {const} */ ('auto') },
      { key: `${key}-2`, from: seg[1], to: lerp3(a, b, 1.3), ...line, dash: false },
    ];
  }

  const points = $derived({ ...CUBE, M: s.M, N: s.N });

  const segments = $derived([
    ...EDGES.map((e) => ({ key: e.join(''), from: e[0], to: e[1], color: '#94A3B8', width: 1.4 })),
    ...long(p.a, A_COLOR, 'a'),
    ...long(p.b, B_COLOR, 'b'),
    {
      key: 'MN',
      from: 'M',
      to: 'N',
      color: s.least ? MN_ON : MN_OFF,
      width: s.least ? 3.4 : 2.2,
      dash: /** @type {const} */ ('auto'),
    },
  ]);

  /** @type {import('#lib/geom-engine/space.js').SceneLabel[]} */
  const labels = $derived([
    ...Object.keys(CUBE).map((k) => ({ text: k, at: k })),
    { text: 'M', at: 'M', color: A_COLOR, dx: -14, dy: -6 },
    { text: 'N', at: 'N', color: B_COLOR, dx: 14, dy: -6 },
  ]);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Cặp đường thẳng chéo nhau"
    options={PRESETS.map((q) => ({ value: q.id, label: q.label }))}
    bind:value={id}
  />
  <SpaceScene
    {points}
    faces={FACES}
    {segments}
    dots={[
      { at: 'M', color: A_COLOR },
      { at: 'N', color: B_COLOR },
    ]}
    {labels}
    centre={{ x: SIDE / 2, y: SIDE / 2, z: SIDE / 2 }}
    radius={SIDE * 1.2}
    bind:view
    label={`Hình lập phương ABCD.A'B'C'D' với hai đường thẳng chéo nhau ${p.label}; điểm M trên đường thứ nhất, N trên đường thứ hai`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label={`Vị trí M trên ${p.a.join('')}`}
      bind:value={m}
      min={RANGE.min}
      max={RANGE.max}
      format={stepText}
    />
    <SliderField
      label={`Vị trí N trên ${p.b.join('')}`}
      bind:value={n}
      min={RANGE.min}
      max={RANGE.max}
      format={stepText}
    />
  </div>
  <p class="text-sm text-slate-600">
    Vị trí 0 là đỉnh đầu, 1 là đỉnh cuối của mỗi đoạn; giá trị âm hoặc lớn hơn 1 là điểm nằm ngoài
    đoạn.
  </p>
  <button type="button" class={button.secondary} onclick={reveal}>Hiện đoạn vuông góc chung</button>
  <FeedbackNote tone={said.tone} text={said.text} />
</div>
