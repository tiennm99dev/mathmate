<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import {
    OMEGA,
    PRESETS,
    VIEWS,
    inView,
    outcomeText,
    presetSet,
    toggled,
    regionCounts,
    regionOf,
    verdict,
    viewText,
  } from './engine.js';

  const CUSTOM = 'tu-chon';

  let idA = $state('chan-1');
  let idB = $state('chia3-2');
  let A = $state(presetSet('chan-1'));
  let B = $state(presetSet('chia3-2'));
  /** @type {import('./engine.js').View} */
  let view = $state('inter');
  /** @type {'A' | 'B'} */
  let editing = $state('A');

  const counts = $derived(regionCounts(A, B));
  const shaded = $derived(viewText(A, B, view));
  const check = $derived(verdict(A, B));

  /** @param {string} id */
  function chooseA(id) {
    idA = id;
    if (id !== CUSTOM) A = presetSet(id);
  }
  /** @param {string} id */
  function chooseB(id) {
    idB = id;
    if (id !== CUSTOM) B = presetSet(id);
  }

  /** @param {number} i */
  function toggle(i) {
    const next = toggled(editing === 'A' ? A : B, i);
    if (editing === 'A') {
      A = next;
      idA = CUSTOM;
    } else {
      B = next;
      idB = CUSTOM;
    }
  }

  const FILL = {
    onlyA: 'bg-sky-200 text-sky-950',
    both: 'bg-violet-300 text-violet-950',
    onlyB: 'bg-amber-200 text-amber-950',
    neither: 'bg-white text-slate-500',
  };
  const WORD = {
    onlyA: 'chỉ thuộc A',
    both: 'thuộc cả A và B',
    onlyB: 'chỉ thuộc B',
    neither: 'không thuộc A, không thuộc B',
  };

  // Venn drawing: two circles in a 320 × 180 box.
  const W = 320;
  const H = 180;
  const ca = { x: 125, y: 92, r: 68 };
  const cb = { x: 195, y: 92, r: 68 };
  const uid = $props.id();
  const shadeOf = $derived({
    onlyA: ['union', 'notB'].includes(view),
    both: ['union', 'inter'].includes(view),
    onlyB: ['union', 'notA'].includes(view),
    neither: ['notA', 'notB'].includes(view),
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <label class="block text-sm font-semibold text-sky-800">
      Biến cố <i>A</i>
      <select
        class="mt-1 block min-h-11 w-full rounded-lg border border-sky-300 bg-white px-3 text-slate-800 {focusRing}"
        value={idA}
        onchange={(e) => chooseA(e.currentTarget.value)}
      >
        {#each PRESETS as p (p.id)}
          <option value={p.id}>{p.name}</option>
        {/each}
        <option value={CUSTOM}>tự chọn (chạm vào các ô)</option>
      </select>
    </label>
    <label class="block text-sm font-semibold text-amber-800">
      Biến cố <i>B</i>
      <select
        class="mt-1 block min-h-11 w-full rounded-lg border border-amber-300 bg-white px-3 text-slate-800 {focusRing}"
        value={idB}
        onchange={(e) => chooseB(e.currentTarget.value)}
      >
        {#each PRESETS as p (p.id)}
          <option value={p.id}>{p.name}</option>
        {/each}
        <option value={CUSTOM}>tự chọn (chạm vào các ô)</option>
      </select>
    </label>
  </div>

  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Biến cố được tô"
      options={VIEWS.map((v) => ({ value: v.value, label: v.label }))}
      bind:value={view}
    />
    <SegmentedControl
      label="Chạm ô để thêm, bớt kết quả của"
      options={[
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ]}
      bind:value={editing}
    />
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    <div>
      <p class="mb-1 text-sm text-slate-600">
        Không gian mẫu khi gieo xúc xắc hai lần: hàng là lần đầu, cột là lần sau.
      </p>
      <div class="grid grid-cols-6 gap-1" role="group" aria-label="36 kết quả của phép thử">
        {#each OMEGA as o, i (i)}
          {@const r = regionOf(i, A, B)}
          {@const on = inView(i, A, B, view)}
          <button
            type="button"
            class="min-h-11 rounded-md border text-xs font-semibold tabular-nums transition {FILL[
              r
            ]} {on
              ? 'border-emerald-600 ring-2 ring-emerald-600'
              : 'border-slate-200 opacity-60'} {focusRing}"
            aria-pressed={editing === 'A' ? A.has(i) : B.has(i)}
            aria-label="Kết quả {outcomeText(o)}, {WORD[r]}{on
              ? ', thuộc biến cố được tô'
              : ''}. Chạm để {(editing === 'A' ? A.has(i) : B.has(i))
              ? 'bỏ khỏi'
              : 'thêm vào'} {editing}"
            onclick={() => toggle(i)}
          >
            {outcomeText(o)}
          </button>
        {/each}
      </div>
      <p class="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
        <span><span class="inline-block size-3 rounded bg-sky-200"></span> chỉ <i>A</i></span>
        <span
          ><span class="inline-block size-3 rounded bg-violet-300"></span> cả <i>A</i> và
          <i>B</i></span
        >
        <span><span class="inline-block size-3 rounded bg-amber-200"></span> chỉ <i>B</i></span>
        <span
          ><span class="inline-block size-3 rounded ring-2 ring-emerald-600"></span> thuộc biến cố được
          tô</span
        >
      </p>
    </div>

    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-sm rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Biểu đồ Ven: chỉ A có {counts.onlyA} kết quả, cả A và B có {counts.both}, chỉ B có {counts.onlyB}, ngoài A và B có {counts.neither}"
    >
      <defs>
        <clipPath id="{uid}-a"><circle cx={ca.x} cy={ca.y} r={ca.r} /></clipPath>
        <mask id="{uid}-out">
          <rect width={W} height={H} fill="white" />
          <circle cx={ca.x} cy={ca.y} r={ca.r} fill="black" />
          <circle cx={cb.x} cy={cb.y} r={cb.r} fill="black" />
        </mask>
        <mask id="{uid}-onlyA">
          <circle cx={ca.x} cy={ca.y} r={ca.r} fill="white" />
          <circle cx={cb.x} cy={cb.y} r={cb.r} fill="black" />
        </mask>
        <mask id="{uid}-onlyB">
          <circle cx={cb.x} cy={cb.y} r={cb.r} fill="white" />
          <circle cx={ca.x} cy={ca.y} r={ca.r} fill="black" />
        </mask>
      </defs>
      <rect
        x="2"
        y="2"
        width={W - 4}
        height={H - 4}
        fill={shadeOf.neither ? '#a7f3d0' : 'white'}
        mask="url(#{uid}-out)"
      />
      <rect
        width={W}
        height={H}
        fill={shadeOf.onlyA ? '#a7f3d0' : '#e0f2fe'}
        mask="url(#{uid}-onlyA)"
      />
      <rect
        width={W}
        height={H}
        fill={shadeOf.onlyB ? '#a7f3d0' : '#fef3c7'}
        mask="url(#{uid}-onlyB)"
      />
      <circle
        cx={cb.x}
        cy={cb.y}
        r={cb.r}
        fill={shadeOf.both ? '#a7f3d0' : '#ddd6fe'}
        clip-path="url(#{uid}-a)"
      />
      <rect x="2" y="2" width={W - 4} height={H - 4} fill="none" stroke="#334155" />
      <circle cx={ca.x} cy={ca.y} r={ca.r} fill="none" stroke="#0369a1" stroke-width="2" />
      <circle cx={cb.x} cy={cb.y} r={cb.r} fill="none" stroke="#b45309" stroke-width="2" />
      <text x="12" y="22" font-size="15" font-style="italic" fill="#334155">Ω</text>
      <text x={ca.x - 52} y={ca.y - 52} font-size="15" font-weight="700" fill="#0369a1">A</text>
      <text x={cb.x + 44} y={cb.y - 52} font-size="15" font-weight="700" fill="#b45309">B</text>
      <g font-size="18" font-weight="700" text-anchor="middle" fill="#1e293b">
        <text x={ca.x - 30} y={ca.y + 6}>{counts.onlyA}</text>
        <text x={(ca.x + cb.x) / 2} y={ca.y + 6}>{counts.both}</text>
        <text x={cb.x + 30} y={cb.y + 6}>{counts.onlyB}</text>
        <text x={W - 24} y={H - 14}>{counts.neither}</text>
      </g>
    </svg>
  </div>

  <p class="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900" aria-live="polite">
    <LiveRichText text={shaded} />
  </p>
  <FeedbackNote tone={check.tone} text={check.text} />
</div>
