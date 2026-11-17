<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import {
    P,
    coordText,
    len3,
    paramTex,
    planePatch,
    planeTex,
    sphereTex,
  } from '../_shared/space.js';
  import {
    D,
    EVENTS,
    NORMAL,
    RADAR,
    RADIUS,
    START,
    T_MAX,
    T_STEP,
    VELOCITY,
    eventTimes,
    planeSide,
    position,
    radarSquare,
  } from './engine.js';

  /**
   * Locating a drone in Oxyz. The drone takes off from A and flies along
   * M(t) = A + t·v; the learner moves the time t and reads its coordinates.
   * It checks IM² against R² for the radar's sphere and the sign of the
   * plane (P)'s expression, and has to find the three moments when the
   * drone enters the radar zone, touches (P) and leaves the radar zone.
   */

  const PATH = '#2563EB';
  const RADAR_COLOR = '#DC2626';
  const PLANE = '#F59E0B';

  let t = $state(0);
  /** @type {string[]} */
  let found = $state([]);
  let view = $state({ yaw: -150, pitch: 20 });

  const m = $derived(position(t));
  const im2 = $derived(radarSquare(t));
  const side = $derived(planeSide(t));
  const end = position(T_MAX);

  const TIMES = eventTimes();
  const R2 = RADIUS * RADIUS;
  const NORMAL_LENGTH = len3(NORMAL);

  /** Marks the events that happen at time v. @param {number} v */
  function mark(v) {
    for (const e of EVENTS) if (e.test(v) && !found.includes(e.id)) found = [...found, e.id];
  }

  const segments = $derived([
    { key: 'done', from: START, to: m, color: PATH, width: 2.8 },
    { key: 'next', from: m, to: end, color: PATH, width: 1.4, dash: true },
    { key: 'im', from: RADAR, to: m, color: RADAR_COLOR, width: 1.2, dash: true },
  ]);
  const polygons = [
    {
      key: 'p',
      pts: planePatch(NORMAL, P(1, 1, 2.5), 2.4),
      fill: PLANE,
      opacity: 0.2,
      stroke: '#FCD34D',
    },
  ];
  const discs = [
    { key: 'r', at: RADAR, r: RADIUS, fill: RADAR_COLOR, opacity: 0.08, stroke: '#FCA5A5' },
  ];
  const dots = $derived([
    { key: 'a', at: START, color: '#334155', r: 3.5 },
    { key: 'i', at: RADAR, color: RADAR_COLOR, r: 4 },
    { key: 'm', at: m, color: PATH, r: 6.5 },
  ]);
  const labels = $derived([
    { key: 'a', text: 'A', at: START },
    { key: 'i', text: 'I', at: RADAR, color: RADAR_COLOR },
    { key: 'm', text: 'M', at: m, color: PATH },
  ]);

  const tTex = $derived(numTex(t, 2));
  const mTex = $derived(`(${[m.x, m.y, m.z].map((v) => numTex(v, 2)).join('; ')})`);

  const lines = $derived([
    `Đường bay: $${paramTex(START, VELOCITY)}$ ($t$ tính bằng phút, đơn vị km).`,
    `Ra-đa: mặt cầu $${sphereTex(RADAR, RADIUS * RADIUS)}$; vùng cấm bay bắt đầu từ $(P): ${planeTex(NORMAL, D)}$.`,
    `Với $t = ${tTex}$: $M${mTex}$.`,
    `$IM^2 = ${numTex(im2, 4)}$, so với $R^2 = ${R2}$ thì ${im2 < R2 ? 'nhỏ hơn' : im2 === R2 ? 'bằng nhau' : 'lớn hơn'}: drone ${im2 < R2 ? 'ở trong vùng ra-đa' : im2 === R2 ? 'ở đúng biên vùng ra-đa' : 'ở ngoài vùng ra-đa'}.`,
    `Thay $M$ vào vế trái của $(P)$: $${numTex(side, 4)}$, ${side < 0 ? 'drone chưa tới $(P)$' : side === 0 ? 'drone nằm trên $(P)$' : 'drone đã vượt qua $(P)$'}; khoảng cách đến $(P)$ là $${numTex(Math.abs(side) / NORMAL_LENGTH, 2)}$ km.`,
  ]);

  const note = $derived(
    found.length === EVENTS.length
      ? 'Em đã tìm đủ ba thời điểm. Hãy kiểm tra lại bằng cách giải phương trình bậc hai $IM^2 = 9$ và phương trình bậc nhất khi thay đường bay vào $(P)$.'
      : `Đã tìm ${found.length}/${EVENTS.length} thời điểm. Kéo $t$ để tìm: ${EVENTS.filter(
          (e) => !found.includes(e.id),
        )
          .map((e) => `${e.label[0].toLowerCase()}${e.label.slice(1)}`)
          .join('; ')}.`,
  );
</script>

<div class="space-y-4">
  <SpaceScene
    axes={4.5}
    {discs}
    {polygons}
    {segments}
    {dots}
    {labels}
    centre={P(0, 0, 2)}
    radius={6}
    bind:view
    label={`Drone ở M ${coordText(m)} sau ${formatNumber(t)} phút, ${im2 <= R2 ? 'trong' : 'ngoài'} vùng ra-đa`}
  />
  <SliderField
    label="Thời gian t (phút)"
    bind:value={t}
    min={0}
    max={T_MAX}
    step={T_STEP}
    format={(v) => formatNumber(v, 2)}
    oninput={mark}
  />
  <ul
    class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
    aria-live="polite"
  >
    {#each lines as text, i (i)}
      <li><LiveRichText {text} /></li>
    {/each}
  </ul>
  <ul class="space-y-1 text-sm" aria-label="Các thời điểm cần tìm">
    {#each EVENTS as e (e.id)}
      <li class={found.includes(e.id) ? 'font-semibold text-emerald-700' : 'text-slate-600'}>
        {found.includes(e.id) ? '✓' : '○'}
        {e.label}{found.includes(e.id) ? `: t = ${formatNumber(TIMES[e.id][0], 2)} phút` : ''}
      </li>
    {/each}
  </ul>
  <FeedbackNote tone={found.length === EVENTS.length ? 'ok' : 'info'} text={note} />
</div>
