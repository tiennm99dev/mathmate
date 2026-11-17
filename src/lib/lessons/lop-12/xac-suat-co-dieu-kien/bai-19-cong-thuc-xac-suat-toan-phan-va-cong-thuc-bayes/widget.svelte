<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button } from '#lib/core/ui.js';
  import TreeDiagram from '../_shared/tree-diagram.svelte';
  import { bayes, bayesNot } from '../_shared/conditional.js';
  import { PREVALENCES, countStory, explain, pText, percent } from './engine.js';

  let level = $state(1);
  let sensitivity = $state(0.95);
  let specificity = $state(0.99);
  /** @type {import('./engine.js').Result} */
  let result = $state('pos');

  const tree = $derived({
    pA: PREVALENCES[level],
    pBA: sensitivity,
    pBnA: Math.round((1 - specificity) * 1000) / 1000,
  });
  /** @type {import('../_shared/conditional.js').Leaf[]} */
  const marked = $derived(result === 'pos' ? ['AB', 'nAB'] : ['AnB', 'nAnB']);
  const share = $derived((result === 'pos' ? bayes(tree) : bayesNot(tree)) ?? 0);

  function bookCase() {
    level = 1;
    sensitivity = 0.95;
    specificity = 0.99;
    result = 'pos';
  }
</script>

<div class="space-y-4">
  <p class="text-sm text-slate-600">
    Xét nghiệm bệnh X. <i>A</i>: "Người được xét nghiệm mắc bệnh X", <i>B</i>: "Kết quả xét nghiệm
    dương tính".
  </p>
  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Tỉ lệ mắc bệnh P(A)"
      bind:value={level}
      min={0}
      max={PREVALENCES.length - 1}
      step={1}
      format={(i) => percent(PREVALENCES[i])}
    />
    <SliderField
      label="Độ nhạy P(B|A)"
      bind:value={sensitivity}
      min={0.5}
      max={1}
      step={0.01}
      format={pText}
    />
    <SliderField
      label="Độ đặc hiệu P(B̄|Ā)"
      bind:value={specificity}
      min={0.7}
      max={1}
      step={0.005}
      format={pText}
    />
  </div>
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Kết quả xét nghiệm"
      options={[
        { value: 'pos', label: 'Dương tính (B)' },
        { value: 'neg', label: 'Âm tính (B̄)' },
      ]}
      bind:value={result}
    />
    <button type="button" class={button.quiet} onclick={bookCase}>Số liệu trong SGK</button>
  </div>

  <TreeDiagram pA={tree.pA} pBA={tree.pBA} pBnA={tree.pBnA} {marked} format={pText} />

  <FeedbackNote tone="info" text={explain(tree, result)} />

  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">
      Trong những người {result === 'pos' ? 'dương tính' : 'âm tính'}: mắc bệnh {percent(share)}
    </p>
    <div
      class="flex h-6 w-full overflow-hidden rounded-md border border-slate-300 bg-slate-100"
      role="img"
      aria-label="Trong những người {result === 'pos'
        ? 'dương tính'
        : 'âm tính'}, phần mắc bệnh chiếm {percent(share)}, phần không mắc bệnh chiếm {percent(
        1 - share,
      )}."
    >
      <div class="h-full bg-rose-500" style="width: {share * 100}%"></div>
      <div class="h-full bg-sky-300" style="width: {(1 - share) * 100}%"></div>
    </div>
    <p class="mt-1 flex gap-4 text-xs text-slate-600">
      <span><span class="inline-block h-3 w-3 rounded-sm bg-rose-500"></span> mắc bệnh</span>
      <span><span class="inline-block h-3 w-3 rounded-sm bg-sky-300"></span> không mắc bệnh</span>
    </p>
  </div>
  <p class="text-sm text-slate-600" aria-live="polite">{countStory(tree, result)}</p>
</div>
