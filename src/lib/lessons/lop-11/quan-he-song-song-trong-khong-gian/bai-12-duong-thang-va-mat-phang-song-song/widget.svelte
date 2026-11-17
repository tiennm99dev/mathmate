<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { lerp3 } from '#lib/geom-engine/space.js';
  import { HALF, cutBy, lineOf } from './engine.js';

  /**
   * A line a = AB moved above the plane (P) by the heights of A and B and the
   * turn of its direction. (P) turns green when a ∥ (P): then a is parallel to
   * its shadow a' in (P), and a plane (Q) turning about a always cuts (P)
   * along a line b parallel to a. Otherwise a cuts (P) at M, or lies in it.
   */

  const LINE = '#DC2626';
  const SHADOW = '#F59E0B';
  const Q_FILL = '#6366F1';

  let hA = $state(2);
  let hB = $state(0.5);
  let turn = $state(30);
  let tilt = $state(25);
  let view = $state({ yaw: -25, pitch: 30 });

  const s = $derived(lineOf(hA, hB, turn));
  const plane = $derived([
    { x: -HALF.x, y: -HALF.y, z: 0 },
    { x: HALF.x, y: -HALF.y, z: 0 },
    { x: HALF.x, y: HALF.y, z: 0 },
    { x: -HALF.x, y: HALF.y, z: 0 },
  ]);
  const planeColor = $derived(
    s.place === 'song-song' ? '#10B981' : s.place === 'nam-trong' ? '#F59E0B' : '#94A3B8',
  );
  const cut = $derived(s.place === 'song-song' ? cutBy(s.A, s.B, tilt) : null);

  const points = $derived({ A: s.A, B: s.B });

  const segments = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').SceneSegment[]} */
    const list = [];
    const t = s.t;
    const lo = t !== null && s.seen ? Math.min(-0.4, t - 0.3) : -0.4;
    const hi = t !== null && s.seen ? Math.max(1.4, t + 0.3) : 1.4;
    const from = lerp3(s.A, s.B, lo);
    const to = lerp3(s.A, s.B, hi);
    if (t !== null && s.seen) {
      // The part under (P) is hidden when (P) is seen from above.
      const below = (/** @type {number} */ k) => lerp3(s.A, s.B, k).z < 0;
      const m = lerp3(s.A, s.B, t);
      const under = view.pitch > 0;
      list.push(
        { key: 'a1', from, to: m, color: LINE, width: 3, dash: under && below(lo) },
        { key: 'a2', from: m, to, color: LINE, width: 3, dash: under && below(hi) },
      );
    } else {
      list.push({ key: 'a', from, to, color: LINE, width: 3, dash: s.A.z < 0 && view.pitch > 0 });
    }
    if (s.place === 'song-song' && cut) {
      const ground = (/** @type {import('#lib/geom-engine/solid.js').P3} */ p) => ({ ...p, z: 0 });
      list.push({
        key: 'shadow',
        from: ground(lerp3(s.A, s.B, -0.4)),
        to: ground(lerp3(s.A, s.B, 1.4)),
        color: SHADOW,
        width: 2,
        dash: false,
      });
      list.push({
        key: 'b',
        from: lerp3(cut.b1, cut.b2, -0.4),
        to: lerp3(cut.b1, cut.b2, 1.4),
        color: Q_FILL,
        width: 2.5,
        dash: false,
      });
    }
    return list;
  });

  const polygons = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').ScenePolygon[]} */
    const list = [{ key: 'P', pts: plane, fill: planeColor, opacity: 0.3, stroke: '#475569' }];
    if (cut) {
      list.push({
        key: 'Q',
        pts: [
          lerp3(s.A, s.B, -0.4),
          lerp3(s.A, s.B, 1.4),
          lerp3(cut.b1, cut.b2, 1.4),
          lerp3(cut.b1, cut.b2, -0.4),
        ],
        fill: Q_FILL,
        opacity: 0.18,
        stroke: Q_FILL,
      });
    }
    return list;
  });

  const labels = $derived.by(() => {
    /** @type {import('#lib/geom-engine/space.js').SceneLabel[]} */
    const list = [
      { text: 'A', at: s.A },
      { text: 'B', at: s.B },
      { text: 'a', at: lerp3(s.A, s.B, 1.4), color: LINE },
      { text: '(P)', at: plane[1], color: '#334155', dx: -18, dy: -6 },
    ];
    if (s.M && s.seen) list.push({ text: 'M', at: s.M, color: LINE, dx: 12, dy: 14 });
    if (cut) {
      list.push(
        { text: 'b', at: lerp3(cut.b1, cut.b2, 1.4), color: Q_FILL },
        { text: "a'", at: { ...lerp3(s.A, s.B, 1.4), z: 0 }, color: '#B45309' },
        { text: '(Q)', at: lerp3(s.A, s.B, -0.4), color: Q_FILL, dx: -22, dy: -4 },
      );
    }
    return list;
  });

  const dots = $derived([
    { at: s.A, color: LINE },
    { at: s.B, color: LINE },
    ...(s.M && s.seen ? [{ at: s.M, color: '#1E293B' }] : []),
  ]);

  const note = $derived.by(() => {
    if (s.place === 'nam-trong')
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Mọi điểm của $a$ đều thuộc $(P)$: $a \\subset (P)$. Hãy nâng $a$ lên khỏi $(P)$.',
      };
    if (s.place === 'song-song')
      return {
        tone: /** @type {const} */ ('ok'),
        text: `$A$ và $B$ cùng cao ${formatNumber(Math.abs(hA))} đơn vị ${hA > 0 ? 'trên' : 'dưới'} $(P)$: $a$ không có điểm chung với $(P)$, nên $a \\parallel (P)$. Đường thẳng $a$ song song với bóng $a' \\subset (P)$ của nó (màu cam). Xoay mặt phẳng $(Q)$ quanh $a$: giao tuyến $b$ của $(Q)$ và $(P)$ luôn song song với $a$.`,
      };
    return {
      tone: /** @type {const} */ ('warn'),
      text: s.seen
        ? `$A$ và $B$ có độ cao khác nhau nên $a$ cắt $(P)$ tại điểm $M$. Hãy chỉnh cho $a$ song song với $(P)$.`
        : `$A$ và $B$ có độ cao khác nhau nên $a$ vẫn cắt $(P)$, tại một điểm $M$ nằm ngoài phần hình vẽ. Hãy chỉnh cho $a$ song song với $(P)$.`,
    };
  });

  const status = $derived(
    s.place === 'song-song'
      ? 'a song song với mặt phẳng P'
      : s.place === 'nam-trong'
        ? 'a nằm trong mặt phẳng P'
        : 'a cắt mặt phẳng P',
  );
  const height = (/** @type {number} */ v) => formatNumber(v);
</script>

<div class="space-y-4">
  <SpaceScene
    {points}
    {segments}
    {polygons}
    {labels}
    {dots}
    centre={{ x: 0, y: 0, z: 0.6 }}
    radius={4.8}
    bind:view
    label={`Mặt phẳng P nằm ngang và đường thẳng a qua A cao ${height(hA)}, B cao ${height(hB)}: ${status}`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Độ cao của A so với (P)"
      bind:value={hA}
      min={-2}
      max={3}
      step={0.5}
      format={height}
    />
    <SliderField
      label="Độ cao của B so với (P)"
      bind:value={hB}
      min={-2}
      max={3}
      step={0.5}
      format={height}
    />
    <SliderField label="Hướng của a" bind:value={turn} min={0} max={165} step={15} unit="°" />
    {#if s.place === 'song-song'}
      <SliderField
        label="Xoay (Q) quanh a"
        bind:value={tilt}
        min={-60}
        max={60}
        step={5}
        unit="°"
      />
    {/if}
  </div>
  <FeedbackNote tone={note.tone} text={note.text} />
</div>
