<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { add3, mul3, sub3 } from '#lib/geom-engine/solid.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { P, angleFan, groundSquare, unit3 } from '../_shared/space.js';
  import { figure, measure, planeText, threeText } from './engine.js';

  /**
   * The oblique line SA turns around its foot A on the plane (P); H is the
   * foot of the perpendicular from S, so AH is the projection of SA. The
   * angle SAH between SA and (P) updates as S rises, moves away or turns. A
   * line d of (P) through A shows the theorem of the three perpendiculars.
   */

  const LINE = '#DC2626';
  const PROJ = '#D97706';
  const D_COLOR = '#2563EB';
  const HALF = 4.2;

  let height = $state(3);
  let reach = $state(2);
  let turn = $state(20);
  let dTurn = $state(70);
  let view = $state({ yaw: -35, pitch: 24 });

  const pts = $derived(figure(height, reach, turn));
  const m = $derived(measure(height, reach, turn, dTurn));
  const three = $derived(threeText(m));
  const dDir = $derived(P(Math.cos((dTurn * Math.PI) / 180), Math.sin((dTurn * Math.PI) / 180), 0));

  const segments = $derived([
    {
      key: 'd',
      from: mul3(dDir, -3.6),
      to: mul3(dDir, 3.6),
      color: D_COLOR,
      width: 2.4,
      dash: false,
    },
    { key: 'SH', from: 'S', to: 'H', color: '#64748B', width: 1.6, dash: true },
    ...(reach > 0 ? [{ key: 'AH', from: 'A', to: 'H', color: PROJ, width: 3, dash: false }] : []),
    { key: 'SA', from: 'S', to: 'A', color: LINE, width: 3.4, dash: false },
  ]);

  const polygons = $derived.by(() => {
    const list = [
      { key: 'P', pts: groundSquare(P(), HALF), fill: '#94A3B8', opacity: 0.22, stroke: '#64748B' },
    ];
    if (reach > 0) {
      const toA = unit3(sub3(pts.A, pts.H));
      const up = P(0, 0, 0.35);
      const s = mul3(toA, 0.35);
      list.push({
        key: 'right',
        pts: [pts.H, add3(pts.H, s), add3(add3(pts.H, s), up), add3(pts.H, up)],
        fill: '#FFFFFF',
        opacity: 0.6,
        stroke: '#475569',
      });
      const fan = angleFan(pts.A, sub3(pts.H, pts.A), sub3(pts.S, pts.A), 0.9);
      if (fan.length)
        list.push({ key: 'fan', pts: fan, fill: '#F59E0B', opacity: 0.5, stroke: PROJ });
    }
    return list;
  });

  const labels = $derived([
    { text: 'S', at: 'S' },
    { text: 'A', at: 'A', dx: -12, dy: 16 },
    ...(reach > 0 ? [{ text: 'H', at: 'H' }] : []),
    { text: 'd', at: mul3(dDir, 3.9), color: D_COLOR, dx: 0, dy: 0 },
    { text: '(P)', at: P(HALF * 0.8, -HALF * 0.85, 0), color: '#475569', dx: 0, dy: 0 },
  ]);
</script>

<div class="space-y-4">
  <SpaceScene
    points={pts}
    {segments}
    {polygons}
    dots={[{ at: 'A' }, { at: 'S', color: LINE }]}
    {labels}
    centre={{ x: 0, y: 0, z: 1.3 }}
    radius={5.2}
    bind:view
    label={`Đường xiên SA có chân A trên mặt phẳng (P), SH vuông góc với (P), SH bằng ${height}, AH bằng ${reach}; đường thẳng d của (P) đi qua A`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField label="Độ cao SH" bind:value={height} min={1} max={4} step={0.5} />
    <SliderField label="Độ dài hình chiếu AH" bind:value={reach} min={0} max={4} step={0.5} />
    <SliderField
      label="Xoay đường xiên quanh chân A"
      bind:value={turn}
      min={0}
      max={355}
      step={5}
      unit="°"
    />
    <SliderField
      label="Hướng của đường thẳng d"
      bind:value={dTurn}
      min={0}
      max={175}
      step={5}
      unit="°"
    />
  </div>
  <FeedbackNote tone="info" text={planeText(height, reach)} />
  <FeedbackNote tone={three.tone} text={three.text} />
</div>
