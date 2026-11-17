<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { button } from '#lib/core/ui.js';
  import { intText } from '#lib/core/number-format.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import {
    BOX_EDGES,
    CHALLENGE_W,
    ORIGIN,
    P,
    boxCorners,
    chain,
    challengeText,
    coordText,
    ggbVector,
    lengthText,
    mixed,
    sceneFrame,
    sum3,
  } from './engine.js';

  /** @typedef {'u' | 'v' | 'w'} Name */
  /** @typedef {'chain' | 'box'} Mode */

  /** @type {Record<Name | 's', string>} */
  const COLOR = { u: '#dc2626', v: '#059669', w: '#2563eb', s: '#7c3aed' };
  const NAMES = /** @type {Name[]} */ (['u', 'v', 'w']);
  const AXES = /** @type {Array<'x' | 'y' | 'z'>} */ (['x', 'y', 'z']);

  let vecs = $state({ u: P(2, 0, 0), v: P(1, 2, 0), w: P(0, 1, 2) });
  let edit = $state(/** @type {Name} */ ('u'));
  let mode = $state(/** @type {Mode} */ ('box'));
  let challenge = $state(false);
  let round = $state(0);
  /** @type {import('./engine.js').P3} */
  let target = $state(P(0, 0, 0));
  let view = $state({ yaw: -65, pitch: 22 });

  const s = $derived(sum3(vecs.u, vecs.v, vecs.w));
  const pts = $derived(chain(vecs.u, vecs.v, vecs.w));
  const box = $derived(boxCorners(vecs.u, vecs.v, vecs.w));
  const flat = $derived(mixed(vecs.u, vecs.v, vecs.w) === 0);
  const hit = $derived(challenge && s.x === target.x && s.y === target.y && s.z === target.z);

  const frame = $derived(
    sceneFrame([...Object.values(box), ...pts, ...(challenge ? [target] : [])]),
  );
  const axes = $derived(
    Math.max(2, ...[...Object.values(box), ...pts].flatMap((p) => [p.x, p.y, p.z])) + 0.5,
  );

  const arrows = $derived(
    mode === 'chain'
      ? [
          { key: 'u', from: pts[0], to: pts[1], color: COLOR.u },
          { key: 'v', from: pts[1], to: pts[2], color: COLOR.v },
          { key: 'w', from: pts[2], to: pts[3], color: COLOR.w },
          { key: 's', from: ORIGIN, to: s, color: COLOR.s, width: 3.5 },
        ]
      : [
          ...NAMES.map((n) => ({ key: n, from: ORIGIN, to: vecs[n], color: COLOR[n] })),
          { key: 's', from: ORIGIN, to: s, color: COLOR.s, width: 3.5 },
        ],
  );

  const segments = $derived(
    mode === 'box'
      ? BOX_EDGES.filter(([a, b]) => a !== 'A' && b !== 'A').map(([a, b]) => ({
          key: `${a}${b}`,
          from: box[a],
          to: box[b],
          color: '#94a3b8',
          width: 1.2,
          dash: true,
        }))
      : [],
  );

  const labels = $derived([
    ...(mode === 'box'
      ? Object.entries(box).map(([name, at]) => ({
          key: `p${name}`,
          text: name,
          at,
          color: '#475569',
        }))
      : [{ key: 'pO', text: 'O', at: ORIGIN, color: '#475569' }]),
    ...(challenge ? [{ key: 'pT', text: 'T', at: target, color: '#d97706' }] : []),
  ]);

  const dots = $derived(challenge ? [{ key: 'T', at: target, color: '#d97706', r: 6 }] : []);

  const sceneLabel = $derived(
    `${mode === 'box' ? 'Hình hộp dựng trên ba vectơ' : 'Ba vectơ nối tiếp nhau'} u${coordText(vecs.u)}, v${coordText(vecs.v)}, w${coordText(vecs.w)}; vectơ tổng s${coordText(s)}`,
  );

  /** @param {string | number} next */
  function pickMode(next) {
    mode = next === 'chain' ? 'chain' : 'box';
  }

  /** @param {string | number} next */
  function pickEdit(next) {
    edit = /** @type {Name} */ (next);
  }

  function newTarget() {
    const w = CHALLENGE_W[round % CHALLENGE_W.length];
    round += 1;
    target = sum3(vecs.u, vecs.v, w);
    edit = 'w';
  }

  function toggleChallenge() {
    challenge = !challenge;
    if (challenge) newTarget();
  }

  const modeNote = $derived(
    mode === 'chain'
      ? `Vectơ v được đặt nối tiếp ở ngọn của u, vectơ w ở ngọn của v. Theo quy tắc ba điểm, vectơ từ O đến ngọn của w chính là u + v + w = ${coordText(s)}.`
      : flat
        ? `Ba vectơ u, v, w đồng phẳng nên hình hộp bị dẹt, nằm trong một mặt phẳng. Đường chéo AC' vẫn biểu diễn tổng u + v + w = ${coordText(s)}.`
        : `Ba vectơ chung gốc A là ba cạnh AB, AD, AA' của hình hộp. Theo quy tắc hình hộp, đường chéo AC' biểu diễn u + v + w = ${coordText(s)}, độ dài ${lengthText(s)}.`,
  );
</script>

<div class="space-y-4">
  <div class="flex flex-wrap items-end gap-4">
    <SegmentedControl
      label="Cách dựng vectơ tổng"
      options={[
        { value: 'box', label: 'Quy tắc hình hộp' },
        { value: 'chain', label: 'Nối tiếp' },
      ]}
      value={mode}
      onchange={pickMode}
    />
    <button type="button" class={button.quiet} onclick={toggleChallenge}>
      {challenge ? 'Thoát thử thách' : 'Thử thách'}
    </button>
  </div>

  <SpaceScene
    {axes}
    {arrows}
    {segments}
    {labels}
    {dots}
    centre={frame.centre}
    radius={frame.radius}
    bind:view
    label={sceneLabel}
  />

  <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
    {#each NAMES as n (n)}
      <span style="color: {COLOR[n]}">{n} = {coordText(vecs[n])}</span>
    {/each}
    <span style="color: {COLOR.s}">s = u + v + w = {coordText(s)}</span>
  </div>

  <div class="space-y-3 rounded-lg border border-slate-200 p-3">
    {#if challenge}
      <p class="text-sm font-semibold text-slate-700">
        Thử thách: chỉ sửa vectơ w sao cho vectơ tổng đi từ O đến điểm T{coordText(target)}.
      </p>
    {:else}
      <SegmentedControl
        label="Sửa vectơ"
        options={NAMES.map((n) => ({ value: n, label: n }))}
        value={edit}
        onchange={pickEdit}
      />
    {/if}
    <div class="grid gap-2 sm:grid-cols-3">
      {#each AXES as k (k)}
        <Stepper
          label="{k} của {edit}"
          bind:value={vecs[edit][k]}
          min={-3}
          max={3}
          format={intText}
        />
      {/each}
    </div>
  </div>

  <div
    class="space-y-1 rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm text-slate-800"
    role="group"
    aria-label="Lệnh GeoGebra tương ứng"
  >
    <p class="font-sans text-xs font-semibold uppercase tracking-wide text-slate-500">
      Lệnh GeoGebra tương ứng
    </p>
    <p>O = (0, 0, 0)</p>
    {#each NAMES as n (n)}
      <p>{ggbVector(n, vecs[n])}</p>
    {/each}
    <p>s = u + v + w</p>
    {#if mode === 'chain'}
      <p>Translate(v, O + u)</p>
      <p>Translate(w, O + u + v)</p>
    {:else}
      <p>Prism(O, O + u, O + u + v, O + v, O + w)</p>
    {/if}
  </div>

  <FeedbackNote tone="info" text={modeNote} />
  {#if challenge}
    <FeedbackNote tone={hit ? 'ok' : 'warn'} text={challengeText(s, target)} />
    {#if hit}
      <button type="button" class={button.secondary} onclick={newTarget}>Điểm T khác</button>
    {/if}
  {/if}
</div>
