<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    DIMS,
    ELEMENTS,
    LINE_TYPES,
    START_DIMS,
    TYPE_ORDER,
    checkDims,
    judgeLine,
  } from './engine.js';

  const W = 140;
  const H = 132;
  /** Stroke widths and dash patterns in paper millimetres. */
  const STYLE = {
    thick: { width: 0.8, dash: '' },
    dashed: { width: 0.35, dash: '3 1.5' },
    center: { width: 0.3, dash: '8 1.5 1 1.5' },
    thin: { width: 0.3, dash: '' },
  };

  let mode = $state('net');
  /** @type {Record<number, import('./engine.js').LineType>} */
  let placed = $state({});
  let current = $state(1);
  let note = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Chọn một nét bằng các nút số, rồi chọn loại nét phù hợp với nó.',
  });
  let chosen = $state([...START_DIMS]);

  const doneCount = $derived(Object.keys(placed).length);
  const dimNote = $derived(checkDims(chosen));

  /** @param {import('./engine.js').LineType} type */
  function choose(type) {
    const verdict = judgeLine(current, type);
    if (!verdict.ok) {
      note = { tone: 'warn', text: verdict.text };
      return;
    }
    placed = { ...placed, [current]: type };
    const next = ELEMENTS.find((e) => !(e.n in placed));
    note = {
      tone: 'ok',
      text: next
        ? verdict.text
        : `${verdict.text} Em đã vẽ đúng cả ${ELEMENTS.length} nét: bản vẽ dùng đúng quy ước nét vẽ.`,
    };
    if (next) current = next.n;
  }

  function restart() {
    placed = {};
    current = 1;
    note = { tone: 'info', text: 'Bản vẽ đã được xoá nét. Chọn nét 1 để bắt đầu lại.' };
  }

  /** @param {string} id */
  function toggleDim(id) {
    chosen = chosen.includes(id) ? chosen.filter((d) => d !== id) : [...chosen, id];
  }

  /**
   * How element `n` is drawn: in its line type once placed (or always while
   * dimensioning), as a grey guess line before, indigo when selected.
   * @param {import('./engine.js').Element} e
   */
  function look(e) {
    const known = mode === 'kichThuoc' || e.n in placed;
    if (known) return { ...STYLE[e.type], color: '#0f172a' };
    if (mode === 'net' && e.n === current) return { width: 0.9, dash: '', color: '#4f46e5' };
    return { width: 0.5, dash: '', color: '#94a3b8' };
  }

  /**
   * An arrowhead with its tip at (x, y) pointing along (dx, dy).
   * @param {number} x @param {number} y @param {number} dx @param {number} dy
   */
  function arrow(x, y, dx, dy) {
    const l = Math.hypot(dx, dy);
    const ux = dx / l;
    const uy = dy / l;
    const bx = x - ux * 2.5;
    const by = y - uy * 2.5;
    return `${x},${y} ${bx - uy * 0.7},${by + ux * 0.7} ${bx + uy * 0.7},${by - ux * 0.7}`;
  }

  const shownDims = $derived(mode === 'kichThuoc' ? DIMS.filter((d) => chosen.includes(d.id)) : []);
  const visibleElements = $derived(
    mode === 'kichThuoc' ? ELEMENTS.filter((e) => e.type !== 'thin') : ELEMENTS,
  );

  const drawingLabel = $derived(
    mode === 'net'
      ? `Bản vẽ ba hình chiếu của gối đỡ chữ U với ${ELEMENTS.length} nét đánh số. Đã vẽ đúng ${doneCount} nét; đang chọn nét ${current}.`
      : `Bản vẽ ba hình chiếu của gối đỡ chữ U, đang ghi các kích thước: ${shownDims.map((d) => d.label).join('; ') || 'chưa có kích thước nào'}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Lớp làm việc"
    options={[
      { value: 'net', label: 'Nét vẽ' },
      { value: 'kichThuoc', label: 'Kích thước' },
    ]}
    bind:value={mode}
  />

  <div class="rounded-xl border border-slate-200 bg-white p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="block h-auto w-full select-none"
      role="img"
      aria-label={drawingLabel}
    >
      {#each visibleElements as e (e.n)}
        {@const s = look(e)}
        <g
          fill="none"
          stroke={s.color}
          stroke-width={s.width}
          stroke-dasharray={s.dash || undefined}
        >
          {#each e.lines as [x1, y1, x2, y2], i (i)}
            <line {x1} {y1} {x2} {y2} />
          {/each}
          {#each e.circles as [cx, cy, r], i (i)}
            <circle {cx} {cy} {r} />
          {/each}
        </g>
        {#if e.type === 'thin' && (mode === 'kichThuoc' || e.n in placed)}
          <polygon points={arrow(20, 124, -1, 0)} fill="#0f172a" />
          <polygon points={arrow(70, 124, 1, 0)} fill="#0f172a" />
          <text x="45" y="122.6" text-anchor="middle" font-size="4.8" fill="#0f172a">50</text>
        {/if}
        {#if mode === 'net'}
          <g>
            <circle
              cx={e.mark[0]}
              cy={e.mark[1]}
              r="3.8"
              fill={e.n === current ? '#4f46e5' : e.n in placed ? '#059669' : '#ffffff'}
              stroke={e.n === current ? '#4f46e5' : '#64748b'}
              stroke-width="0.4"
            />
            <text
              x={e.mark[0]}
              y={e.mark[1] + 1.6}
              text-anchor="middle"
              font-size="4.6"
              font-weight="700"
              fill={e.n === current || e.n in placed ? '#ffffff' : '#334155'}>{e.n}</text
            >
          </g>
        {/if}
      {/each}

      {#each shownDims as d (d.id)}
        <g stroke="#0f172a" stroke-width="0.3" fill="none">
          {#if d.kind === 'h'}
            {@const [x1, x2, y, from] = d.at}
            {@const over = y < from ? -2 : 2}
            <line {x1} y1={from + (y < from ? -1 : 1)} x2={x1} y2={y + over} />
            <line x1={x2} y1={from + (y < from ? -1 : 1)} {x2} y2={y + over} />
            <line {x1} y1={y} {x2} y2={y} />
          {:else if d.kind === 'v'}
            {@const [y1, y2, x, from] = d.at}
            {@const over = x < from ? -2 : 2}
            <line x1={from + (x < from ? -1 : 1)} {y1} x2={x + over} y2={y1} />
            <line x1={from + (x < from ? -1 : 1)} y1={y2} x2={x + over} {y2} />
            <line x1={x} {y1} x2={x} {y2} />
          {:else}
            {@const [cx, cy, r] = d.at}
            {@const c = r * Math.SQRT1_2}
            <line x1={cx + c} y1={cy + c} x2={cx - c - 3.5} y2={cy - c - 3.5} />
            <line x1={cx - c - 3.5} y1={cy - c - 3.5} x2={31} y2={cy - c - 3.5} />
          {/if}
        </g>
        <g fill="#0f172a">
          {#if d.kind === 'h'}
            {@const [x1, x2, y] = d.at}
            <polygon points={arrow(x1, y, -1, 0)} />
            <polygon points={arrow(x2, y, 1, 0)} />
            <text x={(x1 + x2) / 2} y={y - 1.2} text-anchor="middle" font-size="4.8">{d.text}</text>
          {:else if d.kind === 'v'}
            {@const [y1, y2, x] = d.at}
            <polygon points={arrow(x, y1, 0, -1)} />
            <polygon points={arrow(x, y2, 0, 1)} />
            <text
              x={x - 1.2}
              y={(y1 + y2) / 2}
              text-anchor="middle"
              font-size="4.8"
              transform="rotate(-90 {x - 1.2} {(y1 + y2) / 2})">{d.text}</text
            >
          {:else}
            {@const [cx, cy, r] = d.at}
            {@const c = r * Math.SQRT1_2}
            <polygon points={arrow(cx - c, cy - c, -1, -1)} />
            <polygon points={arrow(cx + c, cy + c, 1, 1)} />
            <text x="31.3" y={cy - c - 4.6} font-size="4.8">{d.text}</text>
          {/if}
        </g>
      {/each}

      <g font-size="4.4" fill="#475569" text-anchor="middle">
        <text x="45" y="79">Hình chiếu đứng</text>
        <text x="110" y="79">Hình chiếu cạnh</text>
        <text x="98" y="102">Hình chiếu bằng</text>
      </g>
    </svg>
  </div>

  {#if mode === 'net'}
    <div class="space-y-3">
      <div>
        <p class="mb-1 text-sm font-semibold text-slate-700">
          Chọn nét ({doneCount}/{ELEMENTS.length} nét đã vẽ đúng)
        </p>
        <div class="flex flex-wrap gap-1.5">
          {#each ELEMENTS as e (e.n)}
            <button
              type="button"
              class="min-h-11 min-w-11 rounded-lg border text-sm font-bold {focusRing} {e.n ===
              current
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : e.n in placed
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-slate-300 bg-white text-slate-700'}"
              aria-pressed={e.n === current}
              aria-label="Nét {e.n}{e.n in placed
                ? `, đã vẽ bằng ${LINE_TYPES[placed[e.n]].name.toLowerCase()}`
                : ''}"
              onclick={() => (current = e.n)}>{e.n}</button
            >
          {/each}
        </div>
      </div>
      <div>
        <p class="mb-1 text-sm font-semibold text-slate-700">Vẽ nét {current} bằng</p>
        <div class="grid gap-2 sm:grid-cols-2">
          {#each TYPE_ORDER as t (t)}
            <button
              type="button"
              class="{button.quiet} justify-start text-left"
              disabled={current in placed}
              onclick={() => choose(t)}
            >
              <svg viewBox="0 0 40 6" class="w-12 shrink-0" aria-hidden="true">
                <line
                  x1="1"
                  y1="3"
                  x2="39"
                  y2="3"
                  stroke="#0f172a"
                  stroke-width={STYLE[t].width * 2}
                  stroke-dasharray={STYLE[t].dash
                    ? STYLE[t].dash
                        .split(' ')
                        .map((v) => Number(v) * 1.2)
                        .join(' ')
                    : undefined}
                />
              </svg>
              <span>{LINE_TYPES[t].name}</span>
            </button>
          {/each}
        </div>
      </div>
      <FeedbackNote tone={note.tone} text={note.text} />
      {#if doneCount > 0}
        <button type="button" class={button.quiet} onclick={restart}>Xoá nét, làm lại</button>
      {/if}
    </div>
  {:else}
    <div class="space-y-3">
      <p class="text-sm text-slate-600">
        Rãnh và lỗ nằm chính giữa gối. Bật hoặc tắt từng kích thước (đơn vị mm) để bản vẽ vừa đủ:
        đọc được mọi kích thước, không ghi lặp, không ghi thừa.
      </p>
      <div class="grid gap-2 sm:grid-cols-2">
        {#each DIMS as d (d.id)}
          <button
            type="button"
            class="min-h-11 rounded-lg border px-3 py-2 text-left text-sm font-semibold {focusRing} {chosen.includes(
              d.id,
            )
              ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
              : 'border-slate-300 bg-white text-slate-700'}"
            aria-pressed={chosen.includes(d.id)}
            onclick={() => toggleDim(d.id)}
          >
            {chosen.includes(d.id) ? '✓ ' : ''}{d.label}
          </button>
        {/each}
      </div>
      <FeedbackNote tone={dimNote.tone} text={dimNote.text} />
    </div>
  {/if}
</div>
