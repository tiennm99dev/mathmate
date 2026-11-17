<script>
  import { turnSolid } from '#lib/actions/turn-solid.js';
  import { facesViewer, viewPoint } from '#lib/geom-engine/solid.js';
  import { focusRing } from '#lib/core/ui.js';
  import { pointsAttr } from '#lib/utils/svg.js';
  import { placePieces } from './fold.js';

  /**
   * A net folding into its solid, drawn in a view the child turns by drag or
   * arrow keys. `t` runs from 0 (the flat net) to 1 (the closed solid). Each
   * face is coloured by its role; `lit` names the faces to show in full and
   * fades the others (all show when it is null).
   * The drawing zooms to keep the shape as it is now in view.
   * @type {{
   *   pieces: import('./fold.js').Piece[];
   *   t: number;
   *   label: string;
   *   view?: import('#lib/geom-engine/solid.js').View;
   *   lit?: readonly string[] | null;
   * }}
   */
  let { pieces, t, label, view = $bindable({ yaw: -25, pitch: 50 }), lit = null } = $props();

  const W = 360;
  const H = 280;
  const PAD = 14;

  /** Outside and inside colours of each role. */
  const COLORS = {
    'xung-quanh': { out: '#7dd3fc', in: '#e0f2fe', line: '#0369a1' },
    day: { out: '#fcd34d', in: '#fef3c7', line: '#b45309' },
  };

  /** The middle of the flat net, the point the view turns about. */
  const middle = $derived.by(() => {
    const pts = pieces.flatMap((p) => p.pts);
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    return {
      x: (Math.min(...xs) + Math.max(...xs)) / 2,
      y: (Math.min(...ys) + Math.max(...ys)) / 2,
    };
  });

  /** @param {import('./fold.js').P3} p */
  const seen = (p) => viewPoint({ x: p.x - middle.x, y: p.y - middle.y, z: p.z }, view);

  const placed = $derived(placePieces(pieces, t));

  /**
   * The shape as it is now fills the drawing: all of it for the flat net,
   * less of it as the solid closes, so a small solid does not look huge.
   */
  const frame = $derived.by(() => {
    const pts = placed.flatMap((p) => p.pts.map(seen));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const x0 = Math.min(...xs);
    const y0 = Math.min(...ys);
    const fill = 1 - 0.35 * t;
    const scale = Math.min(
      ((W - 2 * PAD) * fill) / Math.max(1e-6, Math.max(...xs) - x0),
      ((H - 2 * PAD) * fill) / Math.max(1e-6, Math.max(...ys) - y0),
    );
    return {
      scale,
      dx: (W - scale * (Math.max(...xs) - x0)) / 2 - scale * x0,
      dy: (H - scale * (Math.max(...ys) - y0)) / 2 - scale * y0,
    };
  });

  /** @param {{ x: number, y: number }} p */
  const toScreen = (p) => ({ x: frame.dx + frame.scale * p.x, y: frame.dy + frame.scale * p.y });

  const faces = $derived(
    placed
      .map((p) => {
        const v = p.pts.map(seen);
        // Corners run counter-clockwise seen from the inside of the solid.
        const outside = facesViewer([...p.pts].reverse(), view);
        const color = COLORS[p.role];
        return {
          id: p.id,
          depth: v.reduce((s, q) => s + q.depth, 0) / v.length,
          outside,
          points: pointsAttr(v.map(toScreen)),
          fill: outside ? color.out : color.in,
          line: color.line,
          faded: lit !== null && !lit.includes(p.id),
          lines: p.lines.map(([a, b]) => [toScreen(seen(a)), toScreen(seen(b))]),
          edges: p.edges?.map(([a, b]) => [toScreen(seen(a)), toScreen(seen(b))]) ?? null,
        };
      })
      .sort((a, b) => Number(a.outside) - Number(b.outside) || a.depth - b.depth),
  );
</script>

<div
  role="slider"
  tabindex="0"
  aria-label="{label}. Kéo hoặc dùng phím mũi tên để xoay hình"
  aria-valuemin={-180}
  aria-valuemax={180}
  aria-valuenow={Math.round(view.yaw)}
  aria-valuetext="Xoay {Math.round(view.yaw)} độ, nhìn từ trên xuống {Math.round(view.pitch)} độ"
  class="cursor-grab touch-none rounded-2xl border border-slate-200 bg-white active:cursor-grabbing {focusRing}"
  use:turnSolid={{
    view: () => view,
    onturn: (v) => (view = v),
    options: { yawRate: 0.6, minPitch: 5 },
  }}
>
  <svg viewBox="0 0 {W} {H}" class="block h-auto w-full select-none" aria-hidden="true">
    {#each faces as f (f.id)}
      <g opacity={f.faded ? 0.25 : 1}>
        <polygon
          points={f.points}
          fill={f.fill}
          stroke={f.edges ? f.fill : f.line}
          stroke-width={f.edges ? 1 : 1.5}
          stroke-linejoin="round"
        />
        {#each f.edges ?? [] as [a, b], i (i)}
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={f.line} stroke-width="1.5" />
        {/each}
        {#each f.lines as [a, b], i (i)}
          <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={f.line} stroke-width="0.7" />
        {/each}
      </g>
    {/each}
  </svg>
</div>
