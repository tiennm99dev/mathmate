<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import { facesViewer } from '#lib/geom-engine/solid.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { P, isHidden, orientFaces } from '../_shared/space.js';
  import {
    BOX,
    BOX_EDGES,
    BOX_FACES,
    CENTRE,
    CUP,
    CUP_EDGES,
    CUP_FACES,
    HEIGHT,
    POURS,
    RADIUS,
    boxWater,
    cupWater,
    prismWater,
    verdict,
  } from './engine.js';

  /**
   * A pyramid-shaped cup and a box with the same square base and the same
   * height. Lowering the water in the cup pours it into the box; the poured
   * part is a regular frustum whose volume the feedback works out. Three
   * full cups fill the box: the pyramid holds a third of the prism.
   */

  const WATER = '#0EA5E9';
  const INK = '#1E293B';

  let poured = $state(0);
  let y = $state(HEIGHT);
  let view = $state({ yaw: -28, pitch: 18 });

  const said = $derived(verdict(poured, y));
  const level = $derived(prismWater(poured, y).level);
  const canRefill = $derived(y === 0 && poured < POURS - 1);

  function refill() {
    poured += 1;
    y = HEIGHT;
  }

  function reset() {
    poured = 0;
    y = HEIGHT;
  }

  const cupSolid = orientFaces(CUP, CUP_FACES);
  const boxSolid = orientFaces(BOX, BOX_FACES);

  /**
   * The edges of one solid, dashed when hidden behind it.
   * @param {Record<string, import('../_shared/space.js').P3>} pts
   * @param {[string, string][]} edges
   * @param {ReturnType<typeof orientFaces>} solid
   */
  function edgesOf(pts, edges, solid) {
    const front = solid.map((f) => facesViewer(f.pts, view));
    return edges.map(([a, b]) => ({
      key: a + b,
      from: a,
      to: b,
      color: INK,
      width: 1.8,
      dash: isHidden(pts[a], pts[b], solid, front),
    }));
  }

  const segments = $derived([
    ...edgesOf(CUP, CUP_EDGES, cupSolid),
    ...edgesOf(BOX, BOX_EDGES, boxSolid),
  ]);

  const polygons = $derived([
    ...cupWater(y).map((pts, i) => ({ key: `c${i}`, pts, fill: WATER, opacity: 0.22 })),
    ...boxWater(level).map((pts, i) => ({ key: `b${i}`, pts, fill: WATER, opacity: 0.22 })),
  ]);

  const labels = [
    ...['S', 'A', 'B', 'C', 'D'].map((k) => ({ text: k, at: k })),
    { text: 'Khối chóp', at: P(CUP.S.x, CUP.S.y, -0.6), dx: 0, dy: 14 },
    { text: 'Khối lăng trụ', at: P(BOX.E.x + 1.5, BOX.E.y + 1.5, -0.6), dx: 0, dy: 14 },
  ];
</script>

<div class="space-y-4">
  <SpaceScene
    points={{ ...CUP, ...BOX }}
    {segments}
    {polygons}
    {labels}
    centre={CENTRE}
    radius={RADIUS}
    bind:view
    label={`Khối chóp tứ giác đều úp ngược đựng nước cao ${y} cm, bên cạnh khối lăng trụ cùng đáy, cùng chiều cao 12 cm; đã rót hết ${poured} khối chóp`}
  />
  <SliderField label="Mực nước còn trong khối chóp" bind:value={y} min={0} max={HEIGHT} unit="cm" />
  <p class="text-sm text-slate-600">
    Hai khối có cùng đáy là hình vuông cạnh 6 cm và cùng chiều cao h = 12 cm. Kéo thanh trượt sang
    trái để rót nước từ khối chóp sang khối lăng trụ.
  </p>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.secondary} disabled={!canRefill} onclick={refill}>
      Đổ đầy khối chóp
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>
  <p class="text-sm text-slate-600">Số lần đã rót hết khối chóp: {poured + (y === 0 ? 1 : 0)}</p>
  <FeedbackNote tone={said.tone} text={said.text} />
</div>
