<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button } from '#lib/core/ui.js';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import GridLines from '../_shared/grid-lines.svelte';
  import { gridHandle } from '#lib/core/visuals/grid-handle.js';
  import VectorArrow from '#lib/core/visuals/vector-arrow.svelte';
  import { add, len, lengthTex, relation, relationText } from '../_shared/vectors.js';
  import { PAIRS, TASKS, keepInside, moveText, supports } from './engine.js';

  const plane = planeScale({ xMin: 0, xMax: 10, yMin: 0, yMax: 7, width: 400, pad: 16 });
  const { mx, my } = plane;
  const COLORS = { a: '#4f46e5', b: '#e11d48', c: '#0f766e' };

  /** @returns {import('./engine.js').Arrow[]} */
  const start = () => [
    { name: 'a', tail: { x: 1, y: 5 }, d: { x: 3, y: 1 } },
    { name: 'b', tail: { x: 2, y: 1 }, d: { x: 2, y: 2 } },
    { name: 'c', tail: { x: 6, y: 2 }, d: { x: 0, y: 3 } },
  ];

  let arrows = $state(start());
  let pair = $state('0-1');
  /** @type {string[]} */
  let met = $state([]);

  const chosen = $derived(PAIRS[['0-1', '0-2', '1-2'].indexOf(pair)]);
  const p = $derived(arrows[chosen[0]]);
  const q = $derived(arrows[chosen[1]]);
  const where = $derived(supports(p, q));

  $effect(() => {
    const now = TASKS.filter((t) => t.done(arrows) && !met.includes(t.id)).map((t) => t.id);
    if (now.length) met = [...met, ...now];
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const svg = () => svgEl ?? null;

  /** @param {number} i */
  const tailOpts = (i) =>
    gridHandle({
      at: arrows[i].tail,
      plane,
      svg,
      onmove: (g) => (arrows[i].tail = keepInside(g, arrows[i].d, plane)),
    });
  /** @param {number} i */
  const headOpts = (i) =>
    gridHandle({
      at: add(arrows[i].tail, arrows[i].d),
      plane,
      svg,
      onmove: (g) => (arrows[i].d = { x: g.x - arrows[i].tail.x, y: g.y - arrows[i].tail.y }),
    });

  /** Two points of a vector's support, far beyond the board on each side. */
  const supportLine = (/** @type {import('./engine.js').Arrow} */ v) => {
    const k = 30 / len(v.d);
    return {
      x1: mx(v.tail.x - v.d.x * k),
      y1: my(v.tail.y - v.d.y * k),
      x2: mx(v.tail.x + v.d.x * k),
      y2: my(v.tail.y + v.d.y * k),
    };
  };

  function restart() {
    arrows = start();
    met = [];
  }

  const label = $derived(
    `Bảng lưới với ba vectơ. ${arrows.map((v) => `Vectơ ${v.name}: ${moveText(v.d)}`).join('. ')}.`,
  );
  const mark = (/** @type {boolean} */ ok) => (ok ? '✓' : '✗');
  const PAIR_NAMES = ['$\\vec a$, $\\vec b$', '$\\vec a$, $\\vec c$', '$\\vec b$, $\\vec c$'];
</script>

<div class="space-y-4">
  <GeometryBoard
    bind:svgEl
    width={plane.width}
    height={plane.height}
    interactive
    maxWidth="max-w-xl"
    {label}
  >
    <GridLines {plane} />
    {#each [p, q] as v (v.name)}
      {#if where && where !== 'cắt nhau'}
        <line {...supportLine(v)} stroke={COLORS[v.name]} stroke-dasharray="4 5" opacity="0.5" />
      {/if}
    {/each}
    {#each arrows as v (v.name)}
      <VectorArrow
        from={{ x: mx(v.tail.x), y: my(v.tail.y) }}
        to={{ x: mx(v.tail.x + v.d.x), y: my(v.tail.y + v.d.y) }}
        color={COLORS[v.name]}
        name={v.name}
        width={v === p || v === q ? 3.5 : 2.5}
      />
    {/each}
    {#each arrows as v, i (v.name)}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm đầu của vectơ {v.name}: kéo để dời cả vectơ, giữ nguyên hướng và độ dài"
        style="cursor:grab; outline:none"
        use:draggable={tailOpts(i)}
      >
        <rect
          class="drag-knob"
          x={mx(v.tail.x) - 6}
          y={my(v.tail.y) - 6}
          width="12"
          height="12"
          rx="2"
          fill="#fff"
          stroke={COLORS[v.name]}
          stroke-width="2.5"
        />
      </g>
    {/each}
    {#each arrows as v, i (v.name)}
      <g
        class="drag-handle"
        role="button"
        tabindex="0"
        aria-label="Điểm cuối của vectơ {v.name}, {moveText(v.d)}: kéo để đổi hướng và độ dài"
        style="cursor:grab; outline:none"
        use:draggable={headOpts(i)}
      >
        <circle
          class="drag-knob"
          cx={mx(v.tail.x + v.d.x)}
          cy={my(v.tail.y + v.d.y)}
          r="7"
          fill={COLORS[v.name]}
          fill-opacity="0.25"
          stroke={COLORS[v.name]}
          stroke-width="2"
        />
      </g>
    {/each}
  </GeometryBoard>

  <p class="text-sm text-slate-600">
    Ô vuông là điểm đầu (kéo để dời cả vectơ), vòng tròn là điểm cuối (kéo để đổi hướng, độ dài).
    Mỗi cạnh ô lưới dài 1 đơn vị.
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <caption class="mb-1 text-left text-slate-600">Độ dài các vectơ</caption>
      <tbody>
        <tr>
          {#each arrows as v (v.name)}
            <td class="py-1 pr-3 tabular-nums" style:color={COLORS[v.name]}>
              <LiveRichText text={`$|\\vec ${v.name}| ${lengthTex(len(v.d))}$`} />
            </td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-center text-xs sm:text-sm">
      <caption class="mb-1 text-left text-slate-600">Quan hệ của từng cặp vectơ</caption>
      <thead>
        <tr class="border-b border-slate-200">
          <th scope="col" class="py-1 text-left">Cặp</th>
          <th scope="col" class="py-1">Cùng phương</th>
          <th scope="col" class="py-1">Cùng hướng</th>
          <th scope="col" class="py-1">Cùng độ dài</th>
          <th scope="col" class="py-1">Bằng nhau</th>
        </tr>
      </thead>
      <tbody>
        {#each PAIRS as [i, j], k (k)}
          {@const r = relation(arrows[i].d, arrows[j].d)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 text-left font-normal"
              ><LiveRichText text={PAIR_NAMES[k]} /></th
            >
            <td class={r.parallel ? 'text-emerald-700' : 'text-slate-400'}>{mark(r.parallel)}</td>
            <td class={r.same ? 'text-emerald-700' : 'text-slate-400'}>{mark(r.same)}</td>
            <td class={r.equalLength ? 'text-emerald-700' : 'text-slate-400'}
              >{mark(r.equalLength)}</td
            >
            <td class={r.equal ? 'font-bold text-emerald-700' : 'text-slate-400'}
              >{mark(r.equal)}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <SegmentedControl
    label="Xem kĩ một cặp"
    bind:value={pair}
    options={[
      { value: '0-1', label: 'a và b' },
      { value: '0-2', label: 'a và c' },
      { value: '1-2', label: 'b và c' },
    ]}
  />
  <FeedbackNote
    tone={relation(p.d, q.d).equal ? 'ok' : 'info'}
    text={`${relationText(p.name, q.name, p.d, q.d)}${where && where !== 'cắt nhau' ? ` Giá của chúng ${where}.` : ''}`}
  />

  <div class="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
    <p class="text-sm font-semibold text-slate-700">Thử thách</p>
    <ul class="space-y-1 text-sm">
      {#each TASKS as t (t.id)}
        <li class="flex gap-2">
          <span
            aria-hidden="true"
            class={met.includes(t.id) ? 'font-bold text-emerald-600' : 'text-slate-400'}
            >{met.includes(t.id) ? '✓' : '○'}</span
          >
          <span class={met.includes(t.id) ? 'text-emerald-800' : 'text-slate-700'}>
            <LiveRichText text={t.text} />
            <span class="sr-only">{met.includes(t.id) ? '(đã làm được)' : '(chưa làm)'}</span>
          </span>
        </li>
      {/each}
    </ul>
    <p class="text-sm text-slate-600" aria-live="polite">
      Đã làm được {met.length}/{TASKS.length} thử thách{met.length === TASKS.length
        ? '. Tuyệt vời!'
        : '.'}
    </p>
    <button type="button" class={button.quiet} onclick={restart}>Làm lại từ đầu</button>
  </div>
</div>
