<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { FACES, SOLID, pieces, planePatch, sectionAt } from './engine.js';

  /**
   * A plane (α) parallel to the bases of the box ABCD.A'B'C'D' slides along
   * the lateral edges. The section MNPQ stays a parallelogram equal to the
   * base, and the pieces cut on AA' and on the diagonal AC' keep one ratio.
   */

  const SECTION = '#10B981';
  const DIAGONAL = '#DC2626';

  let percent = $state(40);
  let view = $state({ yaw: -30, pitch: 18 });

  const t = $derived(percent / 100);
  const cut = $derived(sectionAt(t));
  const p = $derived(pieces(t));
  const patch = $derived(planePatch(t));
  const points = $derived({ ...SOLID, M: cut.M, N: cut.N, P: cut.P, Q: cut.Q });

  const EDGES = [
    ['A', 'B'],
    ['B', 'C'],
    ['C', 'D'],
    ['D', 'A'],
    ["A'", "B'"],
    ["B'", "C'"],
    ["C'", "D'"],
    ["D'", "A'"],
    ['A', "A'"],
    ['B', "B'"],
    ['C', "C'"],
    ['D', "D'"],
  ];

  const segments = $derived([
    ...EDGES.map(([a, b]) => ({ key: a + b, from: a, to: b })),
    ...[
      ['M', 'N'],
      ['N', 'P'],
      ['P', 'Q'],
      ['Q', 'M'],
    ].map(([a, b]) => ({ key: a + b, from: a, to: b, color: SECTION, width: 2.5 })),
    { key: 'AC', from: 'A', to: "C'", color: DIAGONAL, width: 2 },
  ]);

  const polygons = $derived([
    { key: 'alpha', pts: patch, fill: '#6366F1', opacity: 0.12, stroke: '#6366F1' },
    { key: 'section', pts: ['M', 'N', 'P', 'Q'], fill: SECTION, opacity: 0.35 },
  ]);

  const labels = $derived([
    ...Object.keys(points).map((k) => ({ text: k, at: k })),
    { text: 'K', at: cut.K, color: DIAGONAL, dx: 12, dy: -6 },
    { text: '(α)', at: patch[2], color: '#4F46E5', dx: 22, dy: -8 },
  ]);

  const dots = $derived([
    { at: cut.K, color: DIAGONAL },
    ...['M', 'N', 'P', 'Q'].map((k) => ({ at: k, color: SECTION })),
  ]);

  const ratio = $derived(`$\\dfrac{AM}{AA'} = \\dfrac{AK}{AC'} = ${numTex(t)}$`);
  const text = $derived(
    `$AM \\approx ${numTex(p.AM, 2)}$, $MA' \\approx ${numTex(p.MA, 2)}$; $AK \\approx ${numTex(p.AK, 2)}$, $KC' \\approx ${numTex(p.KC, 2)}$. Hai tỉ số $\\dfrac{AM}{MA'}$ và $\\dfrac{AK}{KC'}$ cùng xấp xỉ $${numTex(p.AM / p.MA, 2)}$: ba mặt phẳng song song $(ABCD)$, $(\\alpha)$, $(A'B'C'D')$ chắn trên hai cát tuyến $AA'$ và $AC'$ các đoạn thẳng tương ứng tỉ lệ.`,
  );
</script>

<div class="space-y-4">
  <SpaceScene
    {points}
    faces={FACES}
    {segments}
    {polygons}
    {labels}
    {dots}
    centre={{ x: 0.4, y: 0.3, z: 1.8 }}
    radius={4.4}
    bind:view
    label={`Hình hộp ABCD.A'B'C'D' bị cắt bởi mặt phẳng alpha song song với hai đáy, thiết diện MNPQ; mặt phẳng cắt AA' tại M với AM bằng ${formatNumber(percent)} phần trăm AA'`}
  />
  <SliderField
    label="Vị trí của (α): tỉ số AM : AA'"
    bind:value={percent}
    min={5}
    max={95}
    step={5}
    format={(v) => formatFixed(v / 100, 2)}
  />
  <p class="text-base"><LiveRichText text={ratio} /></p>
  <FeedbackNote
    tone="info"
    text={`Thiết diện $MNPQ$ là hình bình hành bằng đáy: $MN \\parallel AB$, $NP \\parallel BC$ (tô xanh lá). ${text}`}
  />
</div>
