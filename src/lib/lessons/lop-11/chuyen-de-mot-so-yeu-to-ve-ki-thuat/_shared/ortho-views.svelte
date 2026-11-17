<script>
  import { VIEW_NAMES, orthoView } from './voxel.js';

  /**
   * The three orthographic views of a cube-built solid laid out by the
   * first-angle method: the front view (hình chiếu đứng) top left, the top
   * view (hình chiếu bằng) below it and the side view (hình chiếu cạnh) on
   * its right. Visible edges are thick solid lines, hidden edges thin dashed
   * lines; thin projection lines (đường dóng) join the views when `links` is
   * set. Props:
   * - `solid`: the solid (`#./voxel.js`);
   * - `highlight`: the view to stress ('front', 'top', 'side') or '';
   * - `links`: draw the projection lines between the views;
   * - `names`: write the name of each view under it;
   * - `label`: what the drawing shows, for screen readers.
   * @type {{
   *   solid: import('./voxel.js').Solid;
   *   highlight?: '' | import('./voxel.js').ViewKind;
   *   links?: boolean;
   *   names?: boolean;
   *   label: string;
   * }}
   */
  let { solid, highlight = '', links = false, names = true, label } = $props();

  const GAP = 1.4;
  const PAD = 0.5;
  const LABEL = 0.9;

  const views = $derived({
    front: orthoView(solid, 'front'),
    top: orthoView(solid, 'top'),
    side: orthoView(solid, 'side'),
  });
  // Origins (bottom-left corners) of the views, in cells, y down.
  const box = $derived.by(() => {
    const { nx, ny, nz } = solid;
    const frontTop = PAD;
    const front = { x: PAD, y: frontTop + nz };
    const top = { x: PAD, y: front.y + GAP + (names ? LABEL : 0) + ny };
    const side = { x: PAD + nx + GAP, y: front.y };
    const width = PAD * 2 + nx + GAP + ny;
    const height = top.y + (names ? LABEL : 0) + PAD;
    return { front, top, side, width, height };
  });
  const unit = $derived(Math.min(340 / box.width, 46));

  const kinds = /** @type {const} */ (['front', 'top', 'side']);

  /** @param {import('./voxel.js').ViewKind} kind @param {import('./voxel.js').Line} l */
  function seg(kind, l) {
    const o = box[kind];
    return {
      x1: (o.x + l.u1) * unit,
      y1: (o.y - l.v1) * unit,
      x2: (o.x + l.u2) * unit,
      y2: (o.y - l.v2) * unit,
    };
  }
</script>

<svg
  viewBox="0 0 {box.width * unit} {box.height * unit}"
  class="block h-auto w-full max-w-md select-none"
  role="img"
  aria-label={label}
>
  {#each kinds as kind (kind)}
    {@const v = views[kind]}
    {@const o = box[kind]}
    {#if highlight === kind}
      <rect
        x={(o.x - 0.3) * unit}
        y={(o.y - v.height - 0.3) * unit}
        width={(v.width + 0.6) * unit}
        height={(v.height + 0.6) * unit}
        rx="6"
        fill="#e0e7ff"
      />
    {/if}
  {/each}
  {#if links}
    {@const f = box.front}
    {@const t = box.top}
    {@const s = box.side}
    <g stroke="#94a3b8" stroke-width="0.8">
      {#each [0, solid.nx] as u (u)}
        <line
          x1={(f.x + u) * unit}
          y1={f.y * unit}
          x2={(t.x + u) * unit}
          y2={(t.y - solid.ny) * unit}
        />
      {/each}
      {#each [0, solid.nz] as v (v)}
        <line
          x1={(f.x + solid.nx) * unit}
          y1={(f.y - v) * unit}
          x2={s.x * unit}
          y2={(s.y - v) * unit}
        />
      {/each}
    </g>
  {/if}
  {#each kinds as kind (kind)}
    {@const v = views[kind]}
    {@const o = box[kind]}
    <g stroke-linecap="square">
      {#each v.lines.filter((l) => l.hidden) as l, i (i)}
        {@const p = seg(kind, l)}
        <line {...p} stroke="#475569" stroke-width="1.5" stroke-dasharray="5 3" />
      {/each}
      {#each v.lines.filter((l) => !l.hidden) as l, i (i)}
        {@const p = seg(kind, l)}
        <line {...p} stroke="#0f172a" stroke-width="3" />
      {/each}
    </g>
    {#if names}
      <text
        x={(o.x + v.width / 2) * unit}
        y={(o.y + LABEL * 0.75) * unit}
        text-anchor="middle"
        font-size="13"
        font-weight={highlight === kind ? 700 : 500}
        fill={highlight === kind ? '#4338ca' : '#334155'}>{VIEW_NAMES[kind]}</text
      >
    {/if}
  {/each}
</svg>
