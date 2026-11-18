<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import { intText, numTex } from '#lib/core/number-format.js';
  import { button } from '#lib/core/ui.js';
  import SpaceScene from '#lib/core/visuals/space-scene.svelte';
  import { circle3, P } from '#lib/geom-engine/space.js';
  import { coordTex, coordText, sphereExpandedTex, sphereTex } from '#lib/geom-engine/space-tex.js';
  import {
    HIGH,
    HOUSES,
    LIMIT,
    bestRadius,
    covered,
    distanceTex,
    groundRadius,
    placeOf,
  } from './engine.js';

  /**
   * A radio station at I(a; b; c) reaches every point within R km: the
   * sphere (x − a)² + (y − b)² + (z − c)² = R² bounds its coverage. The
   * learner moves the centre and changes the radius; the houses of a
   * village on the ground turn green when IM ≤ R, the circle cut on the
   * ground shows the covered area, and one chosen house is checked with
   * IM² against R².
   */

  const SPHERE = '#6366F1';
  const IN = '#059669';
  const OUT = '#DC2626';
  const BEST = bestRadius();

  let a = $state(1);
  let b = $state(0);
  let c = $state(2);
  let r = $state(3);
  let chosen = $state(0);
  let view = $state({ yaw: -125, pitch: 26 });

  const centre = $derived(P(a, b, c));
  const places = $derived(HOUSES.map((h) => placeOf(centre, r, h)));
  const count = $derived(covered(centre, r));
  const ground = $derived(groundRadius(centre, r));
  const pick = $derived(places[chosen]);

  const polygons = $derived([
    { key: 'eq', pts: circle3(centre, r), fill: SPHERE, opacity: 0.05, stroke: '#A5B4FC' },
    ...(ground && ground.value > 0
      ? [
          {
            key: 'g',
            pts: circle3(P(a, b, 0), ground.value),
            fill: IN,
            opacity: 0.14,
            stroke: '#6EE7B7',
          },
        ]
      : []),
  ]);
  const discs = $derived([
    { key: 's', at: centre, r, fill: SPHERE, opacity: 0.12, stroke: SPHERE },
  ]);
  const segments = $derived([
    { key: 'pole', from: P(a, b, 0), to: centre, color: '#64748B', width: 1.4, dash: true },
    { key: 'im', from: centre, to: HOUSES[chosen], color: '#0F172A', width: 1.6 },
  ]);
  const dots = $derived([
    { key: 'i', at: centre, color: SPHERE, r: 5 },
    ...HOUSES.map((h, i) => ({
      key: `h${i}`,
      at: h,
      color: places[i].where === 'ngoai' ? OUT : IN,
      r: i === chosen ? 6.5 : 4.5,
    })),
  ]);
  const labels = $derived([
    { key: 'i', text: 'I', at: centre, color: SPHERE },
    ...HOUSES.map((h, i) => ({ key: `h${i}`, text: `M${i + 1}`, at: h, color: '#334155' })),
  ]);

  const lines = $derived([
    `$(S): ${sphereTex(centre, r * r)}$`,
    `Dạng khai triển: $${sphereExpandedTex(centre, r * r)}$.`,
    ground && ground.value === 0
      ? 'Mặt cầu chỉ chạm mặt đất tại một điểm, ngay dưới trạm: $c = R$.'
      : ground
        ? `Vùng phủ trên mặt đất là hình tròn bán kính $r = ${ground.tex}${Number.isInteger(ground.value) ? '' : ` \\approx ${numTex(ground.value, 2)}`}$ (km).`
        : 'Mặt cầu không chạm mặt đất: trạm đặt quá cao so với bán kính phủ sóng.',
    `Điểm $M_{${chosen + 1}}${coordTex(HOUSES[chosen])}$: $${distanceTex(centre, HOUSES[chosen])}$ ${pick.where === 'trong' ? '<' : pick.where === 'tren' ? '=' : '>'} $R^2 = ${r * r}$, nên $M_{${chosen + 1}}$ ${pick.where === 'trong' ? 'nằm trong mặt cầu, được phủ sóng' : pick.where === 'tren' ? 'nằm trên mặt cầu, vừa đủ được phủ sóng' : 'nằm ngoài mặt cầu, không được phủ sóng'}.`,
  ]);

  const goal = $derived(
    count === HOUSES.length
      ? r <= BEST
        ? `Cả ${HOUSES.length} điểm dân cư đều được phủ sóng với bán kính nhỏ nhất có thể, $R = ${r}$ km.`
        : `Cả ${HOUSES.length} điểm đều được phủ sóng. Thử dời tâm để giảm bán kính xuống còn $${BEST}$ km.`
      : `Mới phủ sóng ${count}/${HOUSES.length} điểm dân cư. Hãy dời tâm hoặc tăng bán kính.`,
  );
</script>

<div class="space-y-4">
  <SpaceScene
    look="coordinates"
    axes={4}
    {discs}
    {polygons}
    {segments}
    {dots}
    {labels}
    radius={6}
    bind:view
    label={`Trạm phát tại I ${coordText(centre)}, bán kính phủ sóng ${r} km, phủ được ${count} trên ${HOUSES.length} điểm dân cư`}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="space-y-2" role="group" aria-label="Tâm I của mặt cầu">
      <p class="text-sm font-semibold text-indigo-700">
        <LiveRichText text="Tâm $I(a; b; c)$ của trạm" />
      </p>
      <Stepper label="a" bind:value={a} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="b" bind:value={b} min={-LIMIT} max={LIMIT} format={intText} />
      <Stepper label="c (độ cao)" bind:value={c} min={0} max={HIGH} format={intText} />
    </div>
    <div class="space-y-2">
      <p class="text-sm font-semibold text-indigo-700">Bán kính phủ sóng</p>
      <Stepper label="R (km)" bind:value={r} min={1} max={6} format={intText} />
      <p class="pt-2 text-sm font-semibold text-slate-700">Kiểm tra điểm</p>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Chọn điểm dân cư để kiểm tra">
        {#each HOUSES as h, i (i)}
          <button
            type="button"
            class={i === chosen ? button.primary : button.secondary}
            aria-pressed={i === chosen}
            aria-label="Điểm M{i + 1} {coordText(h)}"
            onclick={() => (chosen = i)}>M{i + 1}</button
          >
        {/each}
      </div>
    </div>
  </div>
  <ul
    class="space-y-1 overflow-x-auto rounded-xl bg-slate-50 px-4 py-3 text-base"
    aria-live="polite"
  >
    {#each lines as text, i (i)}
      <li><LiveRichText {text} /></li>
    {/each}
  </ul>
  <FeedbackNote tone={count === HOUSES.length ? (r <= BEST ? 'ok' : 'info') : 'warn'} text={goal} />
</div>
