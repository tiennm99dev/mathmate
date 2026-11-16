<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { circlePoint } from '../_shared/trig.js';
  import { piText } from '../_shared/graph.js';
  import { EQUATIONS, POINTS, checkMarks } from './engine.js';

  const W = 340;
  const C = { x: 170, y: 170 };
  const R = 125;

  let index = $state(0);
  let marked = $state(/** @type {number[]} */ ([]));
  let result = $state(/** @type {ReturnType<typeof checkMarks> | null} */ (null));

  const eq = $derived(EQUATIONS[index]);

  /** @param {number} d */
  function toggle(d) {
    marked = marked.includes(d) ? marked.filter((x) => x !== d) : [...marked, d];
    result = null;
  }
  /** @param {number} i */
  function choose(i) {
    index = i;
    marked = [];
    result = null;
  }
  function check() {
    result = checkMarks(eq, marked);
  }
  function next() {
    choose((index + 1) % EQUATIONS.length);
  }

  /** @param {number[]} list */
  const listText = (list) => list.map((d) => piText(d)).join('; ');

  const note = $derived.by(() => {
    if (!result) {
      return marked.length === 0
        ? 'Chạm vào các điểm biểu diễn nghiệm của phương trình, rồi bấm "Kiểm tra".'
        : `Đã đánh dấu ${marked.length} điểm.`;
    }
    if (result.ok) {
      return `Chính xác! Các nghiệm $${eq.formula}$ $(k \\in \\mathbb{Z})$ được biểu diễn bởi ${result.want.length} điểm trên đường tròn.`;
    }
    const parts = [];
    if (result.missing.length) parts.push(`còn thiếu ${result.missing.length} điểm`);
    if (result.extra.length)
      parts.push(`có ${result.extra.length} điểm không phải nghiệm (${listText(result.extra)})`);
    return `Chưa đúng: ${parts.join(', ')}. Viết công thức nghiệm rồi thử $k = 0, 1, 2, \\ldots$ để tìm đủ điểm.`;
  });
</script>

<div class="space-y-4">
  <label class="block text-sm font-semibold text-slate-700">
    Phương trình
    <select
      class="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 {focusRing}"
      value={index}
      onchange={(e) => choose(Number(e.currentTarget.value))}
    >
      {#each EQUATIONS as e, i (e.id)}
        <option value={i}>{e.label}</option>
      {/each}
    </select>
  </label>
  <p class="text-center text-lg"><Tex math={eq.tex} /></p>

  <svg
    viewBox="0 0 {W} {W}"
    class="mx-auto block w-full max-w-sm select-none rounded-lg border border-slate-200 bg-white"
    role="group"
    aria-label="Đường tròn lượng giác với 24 điểm cách nhau 15 độ; chọn các điểm biểu diễn nghiệm"
  >
    <line x1="12" y1={C.y} x2={W - 12} y2={C.y} stroke="#94a3b8" />
    <line x1={C.x} y1={W - 12} x2={C.x} y2="12" stroke="#94a3b8" />
    <circle cx={C.x} cy={C.y} r={R} fill="none" stroke="#334155" stroke-width="1.5" />
    <text x={C.x + R + 4} y={C.y - 6} font-size="12" fill="#475569">A</text>
    {#each POINTS as d (d)}
      {@const p = circlePoint(C, R, d)}
      {@const on = marked.includes(d)}
      {@const missed = result?.missing.includes(d)}
      {@const wrong = result?.extra.includes(d)}
      <g
        role="checkbox"
        tabindex="0"
        aria-checked={on}
        aria-label={`Điểm ứng với ${piText(d)}`}
        class="drag-handle cursor-pointer"
        style="outline:none"
        onclick={() => toggle(d)}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(d);
          }
        }}
      >
        <circle cx={p.x} cy={p.y} r="16" fill="transparent" />
        <circle
          class="drag-knob"
          cx={p.x}
          cy={p.y}
          r={on ? 9 : 6}
          fill={wrong ? '#e11d48' : on ? '#4f46e5' : missed ? '#fde68a' : '#fff'}
          stroke={missed ? '#d97706' : on ? '#4f46e5' : '#64748b'}
          stroke-width="2"
        />
      </g>
    {/each}
  </svg>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check} disabled={marked.length === 0}
      >Kiểm tra</button
    >
    <button
      type="button"
      class={button.quiet}
      onclick={() => {
        marked = [];
        result = null;
      }}>Xoá các điểm</button
    >
    <button type="button" class={button.quiet} onclick={next}>Phương trình khác</button>
  </div>

  <FeedbackNote tone={result ? (result.ok ? 'ok' : 'warn') : 'info'} text={note} />
</div>
