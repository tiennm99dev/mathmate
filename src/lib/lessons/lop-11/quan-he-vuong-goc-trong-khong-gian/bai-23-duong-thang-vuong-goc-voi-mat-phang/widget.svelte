<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { add3, mul3 } from '#lib/geom-engine/solid.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { P, groundSquare } from '#lib/geom-engine/space.js';
  import { C_TURN, check, poleDir, texDeg, verdict, yardDir } from './engine.js';

  /**
   * A flagpole d at the point O of a yard (P), with two lines a and b of the
   * yard through O and a check line c. Tilting the pole and turning b shows
   * the condition of the lesson: d ⊥ (P) exactly when d is perpendicular to
   * two crossing lines of (P), and then d is perpendicular to c as well.
   */

  const POLE = '#B91C1C';
  const OK = '#047857';
  const A_COLOR = '#2563EB';
  const B_COLOR = '#7C3AED';
  const C_COLOR = '#D97706';
  const HALF = 3.2;
  const HEIGHT = 3.4;

  let tilt = $state(14);
  let turn = $state(40);
  let beta = $state(90);
  let view = $state({ yaw: -30, pitch: 24 });

  const result = $derived(check(tilt, turn, beta));
  const top = $derived(mul3(poleDir(tilt, turn), HEIGHT));
  const flag = $derived([top, add3(top, P(0.9, 0.35, -0.3)), add3(top, P(0, 0, -0.6))]);

  /** @param {number} deg @param {number} r */
  const end = (deg, r) => mul3(yardDir(deg), r);

  const points = $derived({ O: P(), T: top });

  const segments = $derived([
    { key: 'a', from: end(180, HALF), to: end(0, HALF), color: A_COLOR, width: 2.4, dash: false },
    {
      key: 'b',
      from: end(beta + 180, HALF),
      to: end(beta, HALF),
      color: B_COLOR,
      width: 2.4,
      dash: false,
    },
    {
      key: 'c',
      from: end(C_TURN + 180, HALF * 0.9),
      to: end(C_TURN, HALF * 0.9),
      color: C_COLOR,
      width: 1.6,
      dash: true,
    },
    {
      key: 'pole',
      from: 'O',
      to: 'T',
      color: result.status === 'vuong-goc' ? OK : POLE,
      width: 4,
      dash: false,
    },
  ]);

  const polygons = $derived([
    { key: 'P', pts: groundSquare(P(), HALF), fill: '#A3E635', opacity: 0.22, stroke: '#65A30D' },
    { key: 'flag', pts: flag, fill: '#EF4444', opacity: 0.85 },
  ]);

  const labels = $derived([
    { text: 'O', at: 'O', dx: -14, dy: 16 },
    { text: 'd', at: 'T', color: POLE },
    { text: 'a', at: end(0, HALF + 0.3), color: A_COLOR, dx: 0, dy: 0 },
    { text: 'b', at: end(beta, HALF + 0.3), color: B_COLOR, dx: 0, dy: 0 },
    { text: 'c', at: end(C_TURN, HALF), color: C_COLOR, dx: 0, dy: 0 },
    { text: '(P)', at: P(HALF * 0.75, -HALF * 0.8, 0), color: '#4D7C0F', dx: 0, dy: 0 },
  ]);

  const readout = $derived(
    `$(d, a) = ${texDeg(result.angles.a)}$, $(d, b) = ${texDeg(result.angles.b)}$, $(d, c) = ${texDeg(result.angles.c)}$.`,
  );
  const tone = $derived(
    /** @type {'ok' | 'warn' | 'info'} */ (
      result.status === 'vuong-goc' ? 'ok' : result.status === 'chua-du' ? 'warn' : 'info'
    ),
  );
</script>

<div class="space-y-4">
  <SpaceScene
    {points}
    {segments}
    {polygons}
    dots={[{ at: 'O' }]}
    {labels}
    centre={{ x: 0, y: 0, z: 1.2 }}
    radius={4.4}
    bind:view
    label={`Cột cờ d dựng tại điểm O của sân (P), nghiêng ${tilt} độ; hai đường thẳng a, b của sân đi qua O tạo với nhau góc ${beta} độ`}
  />
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField label="Độ nghiêng của cột cờ" bind:value={tilt} min={0} max={30} unit="°" />
    <SliderField label="Hướng nghiêng" bind:value={turn} min={0} max={355} step={5} unit="°" />
    <SliderField label="Góc từ a đến b" bind:value={beta} min={0} max={165} step={15} unit="°" />
  </div>
  <p class="text-base"><LiveRichText text={readout} /></p>
  <FeedbackNote {tone} text={verdict(result)} />
</div>
