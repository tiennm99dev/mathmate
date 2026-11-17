<script>
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import { focusRing } from '#lib/core/ui.js';
  import { viewPoint } from '#lib/geom-engine/solid.js';
  import { pointsAttr } from '#lib/utils/svg.js';

  /** @typedef {import('#lib/geom-engine/solid.js').P3} P3 */
  /** @typedef {{ key: string, from: P3, to: P3, color?: string, width?: number, dash?: boolean }} Line */

  /**
   * A scene in space with vectors drawn as arrows, planes as square patches,
   * spheres as discs, in an orthographic view
   * that turns by drag or arrow keys. Props:
   * - `axes`: half-length of the axes Ox, Oy, Oz drawn through the origin
   *   with their names (0 draws none);
   * - `arrows`: vectors from `from` to `to`, with an arrowhead at `to`;
   * - `segments`: plain lines, `dash` for hidden or helper lines;
   * - `discs`: spheres, drawn first as their outline circle (the view is
   *   orthographic, so a sphere of radius r always shows as a circle of
   *   radius r);
   * - `polygons`: filled shapes (plane patches, angle fans, circles);
   * - `dots`: points to mark;
   * - `labels`: names written next to points, pushed away from the centre;
   * - `centre`, `radius`: the part of space kept in the frame;
   * - `view`: `{ yaw, pitch }` in degrees (bindable);
   * - `label`: what the drawing shows, for screen readers.
   * @type {{
   *   axes?: number;
   *   arrows?: Line[];
   *   segments?: Line[];
   *   discs?: Array<{ key: string, at: P3, r: number, fill: string, opacity?: number, stroke?: string }>;
   *   polygons?: Array<{ key: string, pts: P3[], fill: string, opacity?: number, stroke?: string }>;
   *   dots?: Array<{ key: string, at: P3, color?: string, r?: number }>;
   *   labels?: Array<{ key: string, text: string, at: P3, color?: string, dx?: number, dy?: number }>;
   *   centre?: P3;
   *   radius?: number;
   *   view?: { yaw: number, pitch: number };
   *   label: string;
   * }}
   */
  let {
    axes = 0,
    arrows = [],
    segments = [],
    discs = [],
    polygons = [],
    dots = [],
    labels = [],
    centre = { x: 0, y: 0, z: 0 },
    radius = 5,
    view = $bindable({ yaw: -125, pitch: 22 }),
    label,
  } = $props();

  const W = 360;
  const H = 320;
  const PAD = 20;
  const INK = '#1E293B';
  const AXIS = '#64748B';

  const scale = $derived((Math.min(W, H) / 2 - PAD) / radius);
  const mid = $derived(viewPoint(centre, view));

  /** @param {P3} p */
  const at = (p) => {
    const v = viewPoint(p, view);
    return { x: W / 2 + scale * (v.x - mid.x), y: H / 2 + scale * (v.y - mid.y) };
  };

  /**
   * The arrowhead at b of a line drawn from a, or null when the line is too
   * short on screen to carry one.
   * @param {{ x: number, y: number }} a @param {{ x: number, y: number }} b
   * @param {number} size
   */
  function head(a, b, size) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l = Math.hypot(dx, dy);
    if (l < size * 0.8) return null;
    const ux = dx / l;
    const uy = dy / l;
    const base = { x: b.x - ux * size, y: b.y - uy * size };
    return pointsAttr([
      b,
      { x: base.x - uy * size * 0.45, y: base.y + ux * size * 0.45 },
      { x: base.x + uy * size * 0.45, y: base.y - ux * size * 0.45 },
    ]);
  }

  const axisLines = $derived.by(() => {
    if (!axes) return [];
    const o = { x: 0, y: 0, z: 0 };
    return /** @type {const} */ (['x', 'y', 'z']).map((k) => {
      const tip = { ...o, [k]: axes };
      const tail = { ...o, [k]: -axes * 0.35 };
      const a = at(tail);
      const b = at(tip);
      return { key: k, a, b, head: head(a, b, 10), name: k, tip: b };
    });
  });

  const drawnArrows = $derived(
    arrows.map((l) => {
      const a = at(l.from);
      const b = at(l.to);
      return { ...l, a, b, head: head(a, b, 9 + (l.width ?? 2.5)) };
    }),
  );

  const drawnSegments = $derived(segments.map((l) => ({ ...l, a: at(l.from), b: at(l.to) })));

  const writes = $derived.by(() => {
    const c = { x: W / 2, y: H / 2 };
    return labels.map((l) => {
      const p = at(l.at);
      const dx = p.x - c.x;
      const dy = p.y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      return {
        ...l,
        x: p.x + (l.dx ?? (dx / d) * 14),
        y: p.y + (l.dy ?? (dy / d) * 14) + 5,
      };
    });
  });
</script>

<div
  role="slider"
  tabindex="0"
  aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay hình"
  aria-valuemin={-180}
  aria-valuemax={180}
  aria-valuenow={Math.round(view.yaw)}
  aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
  class="cursor-grab touch-none rounded-xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
  use:turnSolid={{
    view: () => view,
    onturn: (v) => (view = v),
    options: { yawRate: 0.6, minPitch: -30 },
  }}
>
  <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
    {#each discs as d (d.key)}
      {@const p = at(d.at)}
      <circle
        cx={p.x}
        cy={p.y}
        r={d.r * scale}
        fill={d.fill}
        fill-opacity={d.opacity ?? 0.15}
        stroke={d.stroke ?? 'none'}
        stroke-width="1.4"
      />
    {/each}
    {#each polygons as g (g.key)}
      <polygon
        points={pointsAttr(g.pts.map(at))}
        fill={g.fill}
        fill-opacity={g.opacity ?? 0.2}
        stroke={g.stroke ?? 'none'}
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    {/each}
    {#each axisLines as l (l.key)}
      <line x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y} stroke={AXIS} stroke-width="1.4" />
      {#if l.head}<polygon points={l.head} fill={AXIS} />{/if}
      <text
        x={l.tip.x + 8}
        y={l.tip.y - 6}
        font-size="15"
        font-style="italic"
        font-weight="600"
        fill={AXIS}>{l.name}</text
      >
    {/each}
    {#each drawnSegments as l (l.key)}
      <line
        x1={l.a.x}
        y1={l.a.y}
        x2={l.b.x}
        y2={l.b.y}
        stroke={l.color ?? INK}
        stroke-width={l.width ?? 1.6}
        stroke-dasharray={l.dash ? '5 4' : undefined}
        stroke-linecap="round"
      />
    {/each}
    {#each drawnArrows as l (l.key)}
      <line
        x1={l.a.x}
        y1={l.a.y}
        x2={l.b.x}
        y2={l.b.y}
        stroke={l.color ?? INK}
        stroke-width={l.width ?? 2.5}
        stroke-dasharray={l.dash ? '6 5' : undefined}
        stroke-linecap="round"
      />
      {#if l.head}<polygon points={l.head} fill={l.color ?? INK} />{/if}
    {/each}
    {#each dots as d (d.key)}
      {@const p = at(d.at)}
      <circle
        cx={p.x}
        cy={p.y}
        r={d.r ?? 4}
        fill={d.color ?? INK}
        stroke="#FFFFFF"
        stroke-width="1.5"
      />
    {/each}
    {#each writes as w (w.key)}
      <text
        x={w.x}
        y={w.y}
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill={w.color ?? '#0F172A'}
        paint-order="stroke"
        stroke="#FFFFFF"
        stroke-width="3">{w.text}</text
      >
    {/each}
  </svg>
</div>
