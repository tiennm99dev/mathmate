<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import CurveHandle from '../_shared/curve-handle.svelte';
  import { approxTex, approxText } from '../_shared/plot.js';
  import { CASES, candidates, extreme } from './engine.js';

  const MAX = '#dc2626';
  const MIN = '#2563eb';
  const PART = '#4f46e5';
  const STEP = 0.1;
  const GAP = 0.2;

  let id = $state('cubic');
  let mode = $state('closed');
  let a = $state(-2);
  let b = $state(1.5);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const c = $derived(CASES.find((k) => k.id === id) ?? CASES[0]);
  const open = $derived(mode === 'open');
  const list = $derived(candidates(c, a, b));
  const hi = $derived(extreme(list, 1, open));
  const lo = $derived(extreme(list, -1, open));

  /** @param {string | number} next */
  function choose(next) {
    const k = CASES.find((v) => v.id === next) ?? CASES[0];
    a = k.start.a;
    b = k.start.b;
  }

  const name = $derived(
    open ? `(${numTex(a, 1)}; ${numTex(b, 1)})` : `[${numTex(a, 1)}; ${numTex(b, 1)}]`,
  );
  /** @param {number[]} xs */
  const at = (xs) => xs.map((x) => `$x = ${numTex(tidy(x, 9), 2)}$`).join(' và ');

  /**
   * @param {import('./engine.js').Extreme} e
   * @param {'max' | 'min'} kind
   */
  function sentence(e, kind) {
    const op = kind === 'max' ? '\\max' : '\\min';
    if (e.value !== null) {
      return `$${op}\\limits_{${name}} f(x) ${approxTex(e.value, 3)}$, đạt tại ${at(e.xs)}`;
    }
    return `không có giá trị ${kind === 'max' ? 'lớn' : 'nhỏ'} nhất: $f(x)$ dần tới $${numTex(tidy(e.bound, 3), 3)}$ khi $x$ dần tới ${at(e.xs)} nhưng không đạt, vì ${e.xs.length > 1 ? 'các đầu mút' : 'đầu mút'} không thuộc khoảng`;
  }
  const note = $derived(
    `Trên ${open ? 'khoảng' : 'đoạn'} $${name}$: ${sentence(hi, 'max')}; ${sentence(lo, 'min')}.`,
  );
  const tone = $derived(hi.value !== null && lo.value !== null ? 'ok' : 'warn');

  const marks = $derived([
    ...list
      .filter((p) => p.at === 'end')
      .map((p) => ({ x: p.x, y: p.y, color: PART, hollow: open, r: 5 })),
    ...(hi.value !== null ? hi.xs.map((x) => ({ x, y: c.f(x), color: MAX, r: 7 })) : []),
    ...(lo.value !== null ? lo.xs.map((x) => ({ x, y: c.f(x), color: MIN, r: 7 })) : []),
  ]);
  const label = $derived(
    `Đồ thị hàm số y = ${c.label} trên ${open ? 'khoảng' : 'đoạn'} từ ${formatNumber(a)} đến ${formatNumber(b)}. Điểm đỏ là chỗ đạt giá trị lớn nhất, điểm xanh là chỗ đạt giá trị nhỏ nhất.`,
  );
  /** @param {import('./engine.js').Candidate} p */
  function role(p) {
    const tags = [];
    if (hi.value !== null && hi.xs.includes(p.x)) tags.push('lớn nhất');
    if (lo.value !== null && lo.xs.includes(p.x)) tags.push('nhỏ nhất');
    if (open && p.at === 'end') tags.push('đầu mút, không thuộc khoảng');
    return tags.join(', ');
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-3">
    <SegmentedControl
      label="Hàm số"
      options={CASES.map((k) => ({ value: k.id, label: k.label }))}
      bind:value={id}
      onchange={choose}
    />
    <SegmentedControl
      label="Xét trên"
      options={[
        { value: 'closed', label: 'đoạn [a; b]' },
        { value: 'open', label: 'khoảng (a; b)' },
      ]}
      bind:value={mode}
    />
  </div>
  <div class="overflow-x-auto text-center">
    <Tex display math={c.tex} />
  </div>

  <GraphBox
    win={c.win}
    {label}
    curves={[
      { f: c.f, color: '#cbd5e1', width: 2 },
      { f: c.f, color: PART, from: a, to: b, width: 3.5 },
    ]}
    spans={[{ from: a, to: b, color: PART }]}
    points={marks}
    interactive
    bind:svgEl
    height={300}
  >
    {#snippet children(frame)}
      <CurveHandle
        {frame}
        svg={() => svgEl ?? null}
        f={c.f}
        bind:x={a}
        lo={c.range.lo}
        hi={tidy(b - GAP)}
        step={STEP}
        onAxis
        color="#0f766e"
        name="a"
        label="Đầu mút a trên trục hoành; kéo hoặc dùng phím mũi tên"
      />
      <CurveHandle
        {frame}
        svg={() => svgEl ?? null}
        f={c.f}
        bind:x={b}
        lo={tidy(a + GAP)}
        hi={c.range.hi}
        step={STEP}
        onAxis
        color="#0f766e"
        name="b"
        label="Đầu mút b trên trục hoành; kéo hoặc dùng phím mũi tên"
      />
    {/snippet}
  </GraphBox>

  <FeedbackNote {tone} text={note} />

  <div class="overflow-x-auto">
    <table class="w-full text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Các giá trị cần so sánh
      </caption>
      <thead>
        <tr class="border-b border-slate-200 text-left text-slate-700">
          <th scope="col" class="py-1.5 pr-3">x</th>
          <th scope="col" class="py-1.5 pr-3">f(x)</th>
          <th scope="col" class="py-1.5">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {#each list as p (p.x)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1.5 pr-3 text-left font-semibold">
              {formatNumber(p.x, 2)}
              <span class="font-normal text-slate-500">
                ({p.at === 'end' ? 'đầu mút' : 'f′(x) = 0'})
              </span>
            </th>
            <td class="py-1.5 pr-3">{approxText(p.y, 3)}</td>
            <td class="py-1.5 text-slate-600">{role(p)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
