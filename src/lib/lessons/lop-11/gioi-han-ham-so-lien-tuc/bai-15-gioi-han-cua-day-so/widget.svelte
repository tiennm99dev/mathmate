<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { EPSILONS, LEVELS, SEQUENCES, SHOWN, firstInside, isInside } from './engine.js';

  const IN = '#059669';
  const OUT = '#e11d48';

  let id = $state('inv');
  let level = $state(0);

  const seq = $derived(SEQUENCES.find((s) => s.id === id) ?? SEQUENCES[0]);
  const finite = $derived(Number.isFinite(seq.limit));
  const tol = $derived(finite ? EPSILONS[level] : LEVELS[level]);
  const N = $derived(firstInside(seq, tol));
  const ns = Array.from({ length: SHOWN }, (_, i) => i + 1);
  const outside = $derived(ns.filter((n) => !isInside(seq, n, tol)).length);

  const win = $derived({ xMin: 0, xMax: SHOWN + 1, ...seq.view });
  const points = $derived(
    ns.map((n) => ({
      x: n,
      y: seq.term(n),
      color: isInside(seq, n, tol) ? IN : OUT,
      r: n === N ? 6 : 4,
    })),
  );
  const bands = $derived(
    finite
      ? [{ lo: seq.limit - tol, hi: seq.limit + tol, color: IN }]
      : [{ lo: tol, hi: seq.view.yMax, color: IN }],
  );
  const limitLine = $derived(
    finite ? [{ f: () => seq.limit, color: '#64748b', width: 1.5, dashed: true }] : [],
  );

  const tolText = $derived(formatNumber(tol));
  const label = $derived(
    `${SHOWN} số hạng đầu của dãy ${seq.label}, vẽ thành các điểm. ${
      finite
        ? `Dải xanh là các giá trị cách ${seq.limitTex} nhỏ hơn ε = ${tolText}.`
        : `Dải xanh là các giá trị lớn hơn M = ${tolText}.`
    } Có ${outside} điểm nằm ngoài dải; từ số hạng thứ ${N} trở đi, mọi điểm nằm trong dải.`,
  );

  const note = $derived(
    finite
      ? `Với $\\varepsilon = ${numTex(tol)}$: $|u_n - ${seq.limitTex}| < ${numTex(tol)}$ với mọi $n \\ge ${N}$, chẳng hạn $|u_{${N}} - ${seq.limitTex}| = ${numTex(seq.gap?.(N) ?? 0, 4)}$. Chỉ ${outside} số hạng đầu nằm ngoài dải.`
      : `Với $M = ${numTex(tol)}$: $u_n > ${numTex(tol)}$ với mọi $n \\ge ${N}$, chẳng hạn $u_{${N}} = \\sqrt{${N}} \\approx ${numTex(seq.term(N), 3)}$. Chỉ ${outside} số hạng đầu không vượt quá $M$.`,
  );
  const lesson = $derived(
    finite
      ? `Thu hẹp dải thì $N$ lớn lên, nhưng với mọi $\\varepsilon > 0$ luôn có một chỉ số $N$ như vậy: $|u_n - ${seq.limitTex}|$ nhỏ hơn một số dương bé tuỳ ý kể từ một số hạng nào đó trở đi. Do đó $\\lim u_n = ${seq.limitTex}$.`
      : 'Nâng mức $M$ thì $N$ lớn lên, nhưng với mọi $M > 0$ luôn có một chỉ số $N$ như vậy: $u_n$ lớn hơn một số dương lớn tuỳ ý kể từ một số hạng nào đó trở đi. Do đó $\\lim u_n = +\\infty$.',
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Dãy số"
    options={SEQUENCES.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={id}
  />

  <div class="overflow-x-auto text-center">
    <Tex
      display
      math={`${seq.tex}, \\quad \\lim_{n \\to +\\infty} ${seq.id === 'sum' ? 'S_n' : 'u_n'} = ${seq.limitTex}`}
    />
  </div>

  <GraphBox {win} {label} {points} {bands} curves={limitLine} />

  <SliderField
    label={finite ? 'Độ rộng dải ε' : 'Mức M'}
    bind:value={level}
    min={0}
    max={EPSILONS.length - 1}
    format={(i) => (finite ? `ε = ${formatNumber(EPSILONS[i])}` : `M = ${LEVELS[i]}`)}
  />

  <p class="text-sm text-slate-700">
    Điểm xanh: số hạng nằm trong dải; điểm đỏ: nằm ngoài dải. Điểm to hơn là số hạng thứ
    <strong>N = {N}</strong>.
  </p>
  <FeedbackNote tone="info" text={note} />
  <FeedbackNote tone="ok" text={lesson} />
</div>
