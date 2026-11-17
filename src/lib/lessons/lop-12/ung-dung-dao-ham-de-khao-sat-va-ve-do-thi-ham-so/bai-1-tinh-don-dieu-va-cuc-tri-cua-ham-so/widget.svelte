<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import CurveHandle from '../_shared/curve-handle.svelte';
  import VariationTable from '../_shared/variation-table.svelte';
  import { approxTex, approxText } from '../_shared/plot.js';
  import { CASES, locate, pieces, zeroKind } from './engine.js';

  const UP = '#059669';
  const DOWN = '#e11d48';
  const POINT = '#4f46e5';
  const STEP = 0.05;

  let id = $state('cubic');
  let x = $state(-2);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const c = $derived(CASES.find((k) => k.id === id) ?? CASES[0]);
  const y = $derived(c.f(x));
  const slope = $derived(c.df(x));
  const where = $derived(locate(c, x));
  const parts = $derived(pieces(c, c.win.xMin, c.win.xMax));
  const spans = $derived(parts.map((p) => ({ from: p.from, to: p.to, color: p.up ? UP : DOWN })));
  const curves = $derived(
    parts.map((p) => ({ f: c.f, color: p.up ? UP : DOWN, from: p.from, to: p.to })),
  );
  const guide = $derived({ c: x, vertical: true, color: '#64748b' });
  const tangent = $derived({ a: slope, b: y - slope * x, color: '#d97706' });

  /** @param {string | number} next */
  function choose(next) {
    const k = CASES.find((v) => v.id === next) ?? CASES[0];
    x = tidy(k.range.lo + 0.2);
  }

  const xTex = $derived(numTex(x, 2));
  const note = $derived.by(() => {
    if ('zero' in where) {
      const z = c.critTex[where.zero];
      const kind = zeroKind(c, where.zero);
      if (kind === 'none') {
        return `$f'(${z}) = 0$ nhưng ${c.why} nên $f'(x)$ không đổi dấu khi $x$ đi qua $${z}$: hàm số không đạt cực trị tại $x = ${z}$, đồ thị chỉ có tiếp tuyến nằm ngang ở đó.`;
      }
      const max = kind === 'max';
      return `$f'(${z}) = 0$ và $f'(x)$ đổi dấu từ ${max ? 'dương sang âm' : 'âm sang dương'} khi $x$ đi qua $${z}$: hàm số đạt cực ${max ? 'đại' : 'tiểu'} tại $x = ${z}$, $f_{\\text{${max ? 'CĐ' : 'CT'}}} = f(${z}) = ${numTex(y)}$.`;
    }
    const up = slope > 0;
    return `$f'(${xTex}) ${approxTex(slope, 3)} ${up ? '> 0' : '< 0'}$: tiếp tuyến tại $M$ đi ${up ? 'lên' : 'xuống'}. Trên khoảng $${c.intervals[where.interval]}$ luôn có $f'(x) ${up ? '> 0' : '< 0'}$, nên hàm số ${up ? 'đồng biến' : 'nghịch biến'} trên khoảng này.`;
  });
  const tone = $derived('zero' in where ? 'ok' : 'info');
  const active = $derived(
    'zero' in where ? { node: where.zero + 1 } : { interval: where.interval },
  );
  const label = $derived(
    `Đồ thị hàm số y = ${c.label}, phần đồng biến màu xanh, phần nghịch biến màu đỏ. Điểm M ở x = ${formatNumber(x)}, y = ${approxText(y, 3)}.`,
  );
  const dlabel = $derived(
    `Đồ thị đạo hàm y = f′(x). Tại x = ${formatNumber(x)}, f′(x) = ${approxText(slope, 3)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số"
    options={CASES.map((k) => ({ value: k.id, label: k.label }))}
    bind:value={id}
    onchange={choose}
  />
  <div class="overflow-x-auto text-center">
    <Tex display math={c.tex} />
  </div>

  <div class="grid gap-3 lg:grid-cols-2">
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">
        Đồ thị của f: kéo điểm M hoặc dùng phím mũi tên
      </p>
      <GraphBox
        win={c.win}
        {label}
        {curves}
        {spans}
        lines={[guide, tangent]}
        interactive
        bind:svgEl
      >
        {#snippet children(frame)}
          <CurveHandle
            {frame}
            svg={() => svgEl ?? null}
            f={c.f}
            bind:x
            lo={c.range.lo}
            hi={c.range.hi}
            step={STEP}
            snaps={c.crit}
            color={POINT}
            name="M"
            label="Điểm M trên đồ thị của f; kéo hoặc dùng phím mũi tên trái, phải để đổi x"
          />
        {/snippet}
      </GraphBox>
    </div>
    <div>
      <p class="mb-1 text-sm font-semibold text-slate-700">Đồ thị của f′: dấu của f′ ngay dưới M</p>
      <GraphBox
        win={c.dwin}
        label={dlabel}
        curves={[{ f: c.df, color: '#334155' }]}
        {spans}
        lines={[guide]}
        points={[
          ...c.crit.map((z) => ({ x: z, y: 0, color: '#334155', r: 4 })),
          { x, y: slope, color: slope > 0 ? UP : slope < 0 ? DOWN : POINT, r: 6 },
        ]}
      />
    </div>
  </div>

  <p class="text-sm text-slate-700">
    Nền <span class="font-semibold text-emerald-700">xanh</span>: f′(x) &gt; 0, đồ thị đi lên. Nền
    <span class="font-semibold text-rose-700">đỏ</span>: f′(x) &lt; 0, đồ thị đi xuống. Đường nét
    đứt màu cam là tiếp tuyến tại M, có hệ số góc bằng f′(x).
  </p>
  <FeedbackNote {tone} text={note} />
  <VariationTable
    table={c.table}
    {active}
    caption="Bảng biến thiên của f; ô tô vàng là chỗ điểm M đang đứng."
  />
</div>
