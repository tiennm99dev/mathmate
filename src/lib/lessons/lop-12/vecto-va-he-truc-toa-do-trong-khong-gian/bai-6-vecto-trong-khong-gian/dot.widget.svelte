<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SpaceScene from '../_shared/space-scene.svelte';
  import {
    CUBE,
    CUBE_EDGES,
    add3,
    angleFan,
    arrowTex,
    degreeTex,
    degreeText,
    mul3,
  } from '../_shared/space.js';
  import { U_CHOICES, V_CHOICES, dotOf } from './engine.js';

  /**
   * The dot product in the cube ABCD.A'B'C'D' of edge a: the learner picks
   * two vectors; one that does not start at A is moved to A (a vector equal
   * to it), the angle between them is shaded at A, and the product
   * |u|·|v|·cos(u, v) is worked out.
   */

  const U = '#2563EB';
  const V = '#DC2626';

  let ui = $state(0);
  let vi = $state(0);
  let view = $state({ yaw: -30, pitch: 20 });

  const u = $derived(U_CHOICES[ui]);
  const v = $derived(V_CHOICES[vi]);
  const d = $derived(dotOf(u, v));
  const uTex = $derived(arrowTex(u[0], u[1]));
  const vTex = $derived(arrowTex(v[0], v[1]));
  const vAtA = $derived(d.moved ? arrowTex('A', d.moved) : vTex);
  const end = $derived(add3(CUBE.A, d.v));

  const segments = $derived(
    CUBE_EDGES.map(([a, b]) => ({
      key: a + b,
      from: CUBE[a],
      to: CUBE[b],
      color: '#94A3B8',
      width: 1.3,
    })),
  );

  const arrows = $derived([
    { key: 'u', from: CUBE[u[0]], to: CUBE[u[1]], color: U, width: 3 },
    { key: 'v', from: CUBE[v[0]], to: CUBE[v[1]], color: V, width: 3 },
    ...(d.moved
      ? [{ key: 'v-moved', from: CUBE.A, to: end, color: V, width: 2.4, dash: true }]
      : []),
  ]);

  const polygons = $derived.by(() => {
    const fan = angleFan(CUBE.A, d.u, d.v, 0.3, { x: 0, y: 0, z: 1 });
    return fan.length
      ? [{ key: 'fan', pts: fan, fill: '#F59E0B', opacity: 0.5, stroke: '#D97706' }]
      : [];
  });

  const labels = $derived([
    ...Object.keys(CUBE).map((k) => ({ key: k, text: k, at: CUBE[k] })),
    ...(d.moved === 'E' ? [{ key: 'E', text: 'E', at: end, color: V }] : []),
    {
      key: 'angle',
      text: degreeText(d.angle),
      at: add3(CUBE.A, mul3(add3(d.u, d.v), 0.18)),
      color: '#B45309',
      dx: 0,
      dy: -14,
    },
  ]);

  const work = $derived.by(() => {
    const lines = [];
    if (d.moved) {
      lines.push(
        `Đặt $${vAtA} = ${vTex}$, khi đó $(${uTex}, ${vTex}) = (${uTex}, ${vAtA}) ${degreeTex(d.angle)}$.`,
      );
    } else {
      lines.push(`Hai vectơ chung điểm đầu $A$: $(${uTex}, ${vTex}) ${degreeTex(d.angle)}$.`);
    }
    lines.push(
      `$|${uTex}| = ${d.lenU}$, $|${vTex}| = ${d.lenV}$, $\\cos(${uTex}, ${vTex}) = ${d.cos}$.`,
    );
    lines.push(
      `$${uTex} \\cdot ${vTex} = ${d.lenU} \\cdot ${d.lenV} \\cdot ${d.cos.startsWith('-') ? `\\left(${d.cos}\\right)` : d.cos} = ${d.product}$.`,
    );
    if (d.k === 0) lines.push('Tích vô hướng bằng $0$: hai vectơ vuông góc với nhau.');
    else if (d.k < 0) lines.push('Tích vô hướng âm: góc giữa hai vectơ là góc tù.');
    return lines;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vectơ thứ nhất (xanh)"
      options={U_CHOICES.map((c, i) => ({ value: i, label: `${c[0]}${c[1]}` }))}
      bind:value={ui}
    />
    <SegmentedControl
      label="Vectơ thứ hai (đỏ)"
      options={V_CHOICES.map((c, i) => ({ value: i, label: `${c[0]}${c[1]}` }))}
      bind:value={vi}
    />
  </div>
  <SpaceScene
    {segments}
    {arrows}
    {polygons}
    {labels}
    centre={{ x: 0.2, y: 0.3, z: 0.45 }}
    radius={1.65}
    bind:view
    label={`Hình lập phương ABCD.A'B'C'D' cạnh a, vectơ ${u[0]}${u[1]} màu xanh và vectơ ${v[0]}${v[1]} màu đỏ`}
  />
  <ul class="space-y-1 text-base" aria-live="polite">
    {#each work as line (line)}
      <li><LiveRichText text={line} /></li>
    {/each}
  </ul>
</div>
