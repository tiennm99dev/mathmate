<script>
  import { along, arcPath, rightMarkPath } from '#lib/core/visuals/angle-math.js';
  import Protractor from '#lib/core/visuals/protractor.svelte';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { ANGLE_KINDS, PAIR_TEXT, SHAPE_NAMES, angleKind } from './engine.js';

  /**
   * The picture of a review question (`Visual` in `engine.js`). Until the
   * question ends, the screen-reader label describes the picture without
   * giving the answer away: an angle is "một góc", a shape "một hình tứ
   * giác".
   * @type {{ visual: import('./engine.js').Visual, settled: boolean }}
   */
  let { visual, settled } = $props();

  const INK = '#1e3a8a';
  const RED = '#dc2626';

  /**
   * Corners of each shape, drawn with its base level.
   * @type {Record<import('./engine.js').ShapeKind, { x: number, y: number }[]>}
   */
  const SHAPES = {
    'binh-hanh': [
      { x: 30, y: 120 },
      { x: 160, y: 120 },
      { x: 210, y: 40 },
      { x: 80, y: 40 },
    ],
    thoi: [
      { x: 40, y: 125 },
      { x: 140, y: 125 },
      { x: 200, y: 45 },
      { x: 100, y: 45 },
    ],
    'chu-nhat': [
      { x: 30, y: 40 },
      { x: 210, y: 40 },
      { x: 210, y: 125 },
      { x: 30, y: 125 },
    ],
    vuong: [
      { x: 70, y: 35 },
      { x: 160, y: 35 },
      { x: 160, y: 125 },
      { x: 70, y: 125 },
    ],
  };

  /**
   * The two red lines of a pair, each as two far points.
   * @param {import('./engine.js').LinePair} pair
   * @param {number} turn
   */
  function linesOf(pair, turn) {
    const c = { x: 120, y: 80 };
    /** @param {{ x: number, y: number }} p @param {number} dir */
    const line = (p, dir) => [along(p, 200, dir), along(p, 200, dir + 180)];
    if (pair === 'song-song') {
      return [line(along(c, 28, turn + 90), turn), line(along(c, 28, turn - 90), turn)];
    }
    return [line(c, turn), line(c, turn + (pair === 'vuong-goc' ? 90 : 50))];
  }

  /** Right-angle marks at the corners of a rectangle or a square. @param {readonly { x: number, y: number }[]} pts */
  function cornerMarks(pts) {
    return pts.map((p, i) => {
      const prev = pts[(i + pts.length - 1) % pts.length];
      const next = pts[(i + 1) % pts.length];
      /** @param {{ x: number, y: number }} q */
      const toward = (q) => {
        const len = Math.hypot(q.x - p.x, q.y - p.y);
        return { x: ((q.x - p.x) / len) * 12, y: ((q.y - p.y) / len) * 12 };
      };
      const a = toward(prev);
      const b = toward(next);
      return `M ${p.x + a.x} ${p.y + a.y} L ${p.x + a.x + b.x} ${p.y + a.y + b.y} L ${p.x + b.x} ${p.y + b.y}`;
    });
  }
</script>

{#if visual.type === 'angle'}
  {@const o = { x: visual.deg === 180 ? 120 : 110, y: 115 }}
  {@const a = visual.turn}
  {@const b = visual.turn + visual.deg}
  {@const pa = along(o, 95, a)}
  {@const pb = along(o, 95, b)}
  <svg
    viewBox="0 0 240 130"
    class="mx-auto block w-full max-w-xs select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label={settled ? `${ANGLE_KINDS[angleKind(visual.deg)]} ${visual.deg} độ` : 'Một góc'}
  >
    {#if visual.deg === 90}
      <path d={rightMarkPath(o, a, b, 18)} fill="none" stroke="#059669" stroke-width="3" />
    {:else}
      <path d={arcPath(o, a, b, 26)} fill="none" stroke="#b45309" stroke-width="3" />
    {/if}
    <line x1={o.x} y1={o.y} x2={pa.x} y2={pa.y} stroke={INK} stroke-width="4" />
    <line x1={o.x} y1={o.y} x2={pb.x} y2={pb.y} stroke={INK} stroke-width="4" />
    <circle cx={o.x} cy={o.y} r="5" fill="#0f172a" />
  </svg>
{:else if visual.type === 'protractor'}
  {@const o = { x: 160, y: 162 }}
  {@const pa = along(o, 140, 0)}
  {@const pb = along(o, 140, visual.deg)}
  <svg
    viewBox="0 0 320 180"
    class="mx-auto block w-full max-w-sm select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label={settled
      ? `Thước đo góc đặt lên góc ${visual.deg} độ, một cạnh đi qua vạch 0 bên phải`
      : 'Thước đo góc đặt lên một góc, tâm thước ở đỉnh góc, một cạnh đi qua vạch 0 bên phải'}
  >
    <Protractor {o} r={118} side="phai" font={11} />
    <line x1={o.x} y1={o.y} x2={pa.x} y2={pa.y} stroke={INK} stroke-width="3.5" />
    <line x1={o.x} y1={o.y} x2={pb.x} y2={pb.y} stroke="#0f766e" stroke-width="3.5" />
    <circle cx={o.x} cy={o.y} r="4" fill="#0f172a" />
  </svg>
{:else if visual.type === 'lines'}
  <svg
    viewBox="0 0 240 160"
    class="mx-auto block w-full max-w-xs select-none overflow-hidden rounded-2xl bg-sky-50"
    role="img"
    aria-label={settled
      ? `Hai đường thẳng màu đỏ ${PAIR_TEXT[visual.pair].toLowerCase()}`
      : 'Hai đường thẳng màu đỏ'}
  >
    {#each linesOf(visual.pair, visual.turn) as [p, q], i (i)}
      <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={RED} stroke-width="4" />
    {/each}
  </svg>
{:else if visual.type === 'shape'}
  {@const pts = SHAPES[visual.kind]}
  <svg
    viewBox="0 0 240 160"
    class="mx-auto block w-full max-w-xs select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label={settled ? SHAPE_NAMES[visual.kind] : 'Một hình tứ giác'}
  >
    <polygon
      points={pointsAttr(pts)}
      fill="#dbeafe"
      stroke={INK}
      stroke-width="4"
      stroke-linejoin="round"
    />
    {#if visual.kind === 'chu-nhat' || visual.kind === 'vuong'}
      {#each cornerMarks(pts) as d, i (i)}
        <path {d} fill="none" stroke="#059669" stroke-width="2.5" />
      {/each}
    {/if}
  </svg>
{:else}
  {@const scale = Math.min(200 / visual.w, 110 / visual.h)}
  {@const w = visual.w * scale}
  {@const h = visual.h * scale}
  <svg
    viewBox="0 0 {w + 80} {h + 50}"
    class="mx-auto block w-full max-w-xs select-none rounded-2xl bg-sky-50"
    role="img"
    aria-label="Hình chữ nhật dài {visual.w} m, rộng {visual.h} m"
  >
    <rect x="20" y="12" width={w} height={h} fill="#dcfce7" stroke={INK} stroke-width="3" />
    <text x={20 + w / 2} y={h + 40} text-anchor="middle" font-size="18" font-weight="700"
      >{visual.w} m</text
    >
    <text x={w + 28} y={12 + h / 2 + 6} font-size="18" font-weight="700">{visual.h} m</text>
  </svg>
{/if}
