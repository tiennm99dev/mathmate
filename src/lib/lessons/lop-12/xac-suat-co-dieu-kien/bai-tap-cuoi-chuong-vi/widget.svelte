<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import TreeDiagram from '../_shared/tree-diagram.svelte';
  import { FIELDS, SCENARIOS, expected, judge, solution } from './engine.js';

  /** @typedef {import('./engine.js').Field} Field */
  /** @typedef {import('./engine.js').Verdict} Verdict */

  const blank = () => ({ pA: '', pBA: '', pBnA: '', pB: '', post: '' });

  /** @type {string} */
  let scenarioId = $state(SCENARIOS[0].id);
  const s = $derived(SCENARIOS.find((x) => x.id === scenarioId) ?? SCENARIOS[0]);
  /** @type {Record<Field, string>} */
  let typed = $state(blank());
  /** @type {Record<Field, Verdict> | null} */
  let verdicts = $state(null);
  let showSolution = $state(false);

  function reset() {
    typed = blank();
    verdicts = null;
    showSolution = false;
  }

  function check() {
    verdicts = {
      pA: judge(s, 'pA', typed.pA),
      pBA: judge(s, 'pBA', typed.pBA),
      pBnA: judge(s, 'pBnA', typed.pBnA),
      pB: judge(s, 'pB', typed.pB),
      post: judge(s, 'post', typed.post),
    };
  }

  /** @param {Field} f */
  const ok = (f) => verdicts?.[f] === 'right';
  const known = (/** @type {Field} */ f) => (ok(f) ? expected(s, f) : null);

  const allRight = $derived(FIELDS.every((f) => verdicts?.[f.id] === 'right'));
  /** @type {import('../_shared/conditional.js').Leaf[]} */
  const marked = $derived(ok('pB') ? ['AB', 'nAB'] : []);

  const note = $derived.by(() => {
    if (!verdicts) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Đọc tình huống, điền ba xác suất trên nhánh của sơ đồ cây, rồi tính $P(B)$ và $P(A|B)$. Nhập số thập phân (dấu phẩy), phân số $a/b$ hoặc phần trăm.',
      };
    }
    if (allRight) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: 'Đúng hết! Sơ đồ cây đã đầy đủ: $P(B)$ là tổng hai lá được tô, $P(A|B)$ là tỉ số giữa lá $AB$ và $P(B)$.',
      };
    }
    const v = /** @type {Record<Field, Verdict>} */ (verdicts);
    const first = FIELDS.find((f) => v[f.id] !== 'right');
    if (!first) return { tone: /** @type {const} */ ('info'), text: '' };
    const why = {
      pA: '$P(A)$ là xác suất của trường hợp $A$, chưa có điều kiện gì.',
      pBA: '$P(B|A)$ là xác suất của $B$ khi biết $A$ đã xảy ra.',
      pBnA: '$P(B|\\overline{A})$ là xác suất của $B$ khi biết $A$ không xảy ra; nếu đề cho xác suất của $\\overline{B}$ thì lấy $1$ trừ đi.',
      pB: 'Dùng công thức xác suất toàn phần: $P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})$.',
      post: 'Dùng công thức Bayes: $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$; có thể làm tròn đến hàng phần nghìn.',
    };
    const state =
      v[first.id] === 'empty'
        ? 'chưa điền'
        : v[first.id] === 'invalid'
          ? 'chưa đọc được (nhập như $0{,}4$, $2/5$ hoặc $40\\%$)'
          : 'chưa đúng';
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Ô ${first.label} ${state}. ${why[first.id]}`,
    };
  });

  /** @param {Field} f */
  function mark(f) {
    const v = verdicts?.[f];
    if (v === 'right') return 'bg-emerald-50 ring-2 ring-emerald-500';
    if (v === 'wrong' || v === 'invalid') return 'bg-amber-50 ring-2 ring-amber-500';
    return '';
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Tình huống"
    options={SCENARIOS.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={scenarioId}
    onchange={reset}
  />
  <div class="space-y-1 text-sm text-slate-700">
    <p><LiveRichText text={s.story} /></p>
    <p><b>A</b>: "{s.a}"; <b>B</b>: "{s.b}".</p>
    <p class="font-semibold">{s.ask}</p>
  </div>

  <TreeDiagram pA={known('pA')} pBA={known('pBA')} pBnA={known('pBnA')} {marked} />

  <form
    class="grid grid-cols-2 gap-3 sm:grid-cols-5"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    {#each FIELDS as f (f.id)}
      <label class="block text-sm">
        <span class="font-semibold text-slate-700">{f.label}</span>
        <input
          class="{textInput} {mark(f.id)}"
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed[f.id]}
          aria-invalid={verdicts?.[f.id] === 'wrong' || verdicts?.[f.id] === 'invalid'}
        />
        <span class="sr-only" aria-live="polite"
          >{verdicts?.[f.id] === 'right'
            ? 'đúng'
            : verdicts?.[f.id] === 'wrong'
              ? 'chưa đúng'
              : ''}</span
        >
      </label>
    {/each}
    <div class="col-span-2 flex flex-wrap gap-2 sm:col-span-5">
      <button type="submit" class={button.primary}>Kiểm tra</button>
      <button type="button" class={button.quiet} onclick={() => (showSolution = !showSolution)}
        >{showSolution ? 'Ẩn lời giải' : 'Xem lời giải'}</button
      >
      <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
    </div>
  </form>

  <FeedbackNote tone={note.tone} text={note.text} />

  {#if showSolution}
    <ol class="list-decimal space-y-1 pl-5 text-sm text-slate-700">
      {#each solution(s) as step, i (i)}
        <li><LiveRichText text={step} /></li>
      {/each}
    </ol>
  {/if}
</div>
