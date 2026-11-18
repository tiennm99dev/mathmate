<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { P, same3 } from '#lib/geom-engine/space.js';
  import { coordTex, coordText } from '#lib/geom-engine/space-tex.js';
  import {
    DESK_HIGH,
    DESK_LOW,
    OBJECTS,
    ROOM,
    ROOM_CORNERS,
    ROOM_EDGES,
    boxLines,
    distanceFromO,
    wrongNames,
  } from './engine.js';

  /**
   * A classroom in the system Oxyz (O at a floor corner, one metre a unit).
   * One object is marked in orange; the learner sets the coordinates of the
   * blue point M until it sits on the object, reading them off the floor
   * grid, the heights on Oz and a dashed line down to the floor. Then the
   * distance from O to the object is worked out.
   */

  const M_COLOR = '#2563EB';
  const T_COLOR = '#EA580C';
  const AXIS = '#64748B';

  let index = $state(0);
  let x = $state(0);
  let y = $state(0);
  let z = $state(0);
  /** @type {string[]} the objects placed right at least once */
  let foundIds = $state([]);
  let view = $state({ yaw: -35, pitch: 28 });

  const obj = $derived(OBJECTS[index]);
  const m = $derived(P(x, y, z));
  const hit = $derived(same3(m, obj.at));
  const dist = $derived(distanceFromO(obj.at));

  /** @param {import('#lib/geom-engine/space.js').P3} p */
  const floor = (p) => P(p.x, p.y, 0);

  const grid = $derived([
    ...Array.from({ length: ROOM.length - 1 }, (_, i) => ({
      key: `gx-${i}`,
      from: P(i + 1, 0, 0),
      to: P(i + 1, ROOM.width, 0),
      color: '#E2E8F0',
      width: 1,
    })),
    ...Array.from({ length: ROOM.width - 1 }, (_, i) => ({
      key: `gy-${i}`,
      from: P(0, i + 1, 0),
      to: P(ROOM.length, i + 1, 0),
      color: '#E2E8F0',
      width: 1,
    })),
  ]);

  const segments = $derived([
    ...grid,
    ...ROOM_EDGES.map(([a, b]) => ({
      key: `room-${a}-${b}`,
      from: ROOM_CORNERS[a],
      to: ROOM_CORNERS[b],
      color: '#94A3B8',
      width: 1.3,
    })),
    ...boxLines(DESK_LOW, DESK_HIGH).map((l) => ({
      ...l,
      key: `desk-${l.key}`,
      color: '#A16207',
      width: 1.6,
    })),
    { key: 't-drop', from: obj.at, to: floor(obj.at), color: T_COLOR, width: 1.4, dash: true },
    { key: 'm-drop', from: m, to: floor(m), color: M_COLOR, width: 1.4, dash: true },
  ]);

  const arrows = [
    { key: 'ox', from: P(), to: P(ROOM.length + 1.2, 0, 0), color: AXIS, width: 1.6 },
    { key: 'oy', from: P(), to: P(0, ROOM.width + 1.2, 0), color: AXIS, width: 1.6 },
    { key: 'oz', from: P(), to: P(0, 0, ROOM.height + 1), color: AXIS, width: 1.6 },
  ];

  const dots = $derived([
    { key: 't', at: obj.at, color: T_COLOR, r: 7 },
    { key: 't-floor', at: floor(obj.at), color: T_COLOR, r: 3 },
    { key: 'm', at: m, color: M_COLOR, r: 5 },
  ]);

  const labels = $derived([
    { key: 'O', text: 'O', at: P(), dx: -12, dy: 12 },
    { key: 'x', text: 'x', at: P(ROOM.length + 1.2, 0, 0), color: AXIS },
    { key: 'y', text: 'y', at: P(0, ROOM.width + 1.2, 0), color: AXIS },
    { key: 'z', text: 'z', at: P(0, 0, ROOM.height + 1), color: AXIS },
    ...[2, 4, 6, 8].map((k) => ({
      key: `tx-${k}`,
      text: `${k}`,
      at: P(k, 0, 0),
      color: AXIS,
      dx: 0,
      dy: 18,
    })),
    ...[2, 4, 6].map((k) => ({
      key: `ty-${k}`,
      text: `${k}`,
      at: P(0, k, 0),
      color: AXIS,
      dx: -12,
      dy: 4,
    })),
    ...[1, 2, 3, 4].map((k) => ({
      key: `tz-${k}`,
      text: `${k}`,
      at: P(0, 0, k),
      color: AXIS,
      dx: -14,
      dy: 0,
    })),
    { key: 'M', text: 'M', at: m, color: M_COLOR, dx: 12, dy: -8 },
  ]);

  function next() {
    if (hit && !foundIds.includes(obj.id)) foundIds = [...foundIds, obj.id];
    index = (index + 1) % OBJECTS.length;
  }

  const status = $derived.by(() => {
    if (hit) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng: ${obj.name.toLowerCase()} ở điểm $${coordTex(obj.at)}$. Khoảng cách từ góc $O$ tới nó là $${dist.tex}${Number.isInteger(dist.value) ? '' : ` \\approx ${numTex(dist.value, 2)}`}$ (m).`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `$M$ chưa trùng vật cần tìm: còn sai ${wrongNames(m, obj.at).join(', ')}. Dò điểm chân đường nét đứt màu cam trên lưới sàn để đọc hoành độ, tung độ; cao độ là độ cao của vật.`,
    };
  });
</script>

<div class="space-y-4">
  <p class="text-base">
    <LiveRichText
      text={`Phòng học dài $${ROOM.length}$ m, rộng $${ROOM.width}$ m, cao $${ROOM.height}$ m. ${obj.name} ${obj.where}. Tìm toạ độ của nó (đơn vị mét).`}
    />
  </p>
  <SpaceScene
    look="coordinates"
    {segments}
    {arrows}
    {dots}
    {labels}
    centre={{ x: ROOM.length / 2, y: ROOM.width / 2, z: ROOM.height / 2 }}
    radius={6.4}
    bind:view
    label={`Phòng học trong hệ trục Oxyz, ${obj.name.toLowerCase()} được đánh dấu màu cam, điểm M màu xanh ở ${coordText(m)}`}
  />
  <div class="grid gap-2 sm:grid-cols-3" role="group" aria-label="Toạ độ của điểm M">
    <Stepper label="x" bind:value={x} min={0} max={ROOM.length} />
    <Stepper label="y" bind:value={y} min={0} max={ROOM.width} />
    <Stepper label="z" bind:value={z} min={0} max={ROOM.height} />
  </div>
  <FeedbackNote tone={status.tone} text={status.text} />
  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.secondary} onclick={next}>Vật tiếp theo</button>
    <p class="text-sm text-slate-600" aria-live="polite">
      Đã định vị đúng {foundIds.length +
        (hit && !foundIds.includes(obj.id) ? 1 : 0)}/{OBJECTS.length}
      vật.
    </p>
  </div>
</div>
