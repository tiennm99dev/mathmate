<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { niceAxis } from '#lib/stats-engine/index.js';
  import { mean, median } from '#lib/stats-engine/descriptive.js';
  import {
    CLASS_SAMPLE,
    LIQUIDS,
    approxText,
    capacity,
    cumulative,
    defaultStart,
    groupCounts,
    groupText,
    groupedMean,
    groupedModes,
    groupedQuartile,
    meanTex,
    midpoint,
    modeTex,
    parseCounts,
    quartileTex,
    trialRandom,
  } from './engine.js';

  /** @typedef {import('./engine.js').Liquid} Liquid */

  /** @type {Liquid} */
  let liquid = $state('nuoc');
  /** @type {Record<Liquid, string>} */
  let texts = $state({ nuoc: CLASS_SAMPLE.join(' '), 'xa-phong': '' });
  /** @type {Record<Liquid, number>} */
  let trials = $state({ nuoc: 0, 'xa-phong': 0 });
  let drops = $state(0);
  let spilled = $state(false);
  let width = $state(5);
  let start = $state(25);
  const dataId = $props.id();

  const cap = $derived(capacity(liquid, trialRandom(liquid, trials[liquid])));
  const parsed = $derived(parseCounts(texts[liquid]));
  const values = $derived(parsed.values);
  const smallest = $derived(values.length ? Math.min(...values) : 0);
  const startLo = $derived(Math.max(0, smallest - width + 1));
  const first = $derived(Math.min(Math.max(start, startLo), smallest));
  const groups = $derived(values.length ? groupCounts(values, first, width) : []);
  const tooMany = $derived(groups.length > 12);
  const ready = $derived(values.length >= 4 && !tooMany);
  const cum = $derived(cumulative(groups));
  const xBar = $derived(ready ? groupedMean(groups) : 0);
  const quarts = $derived(
    ready
      ? /** @type {const} */ ([1, 2, 3]).map((k) => ({ k, q: groupedQuartile(groups, k) }))
      : [],
  );
  const modes = $derived(ready ? groupedModes(groups) : []);
  const otherLiquid = $derived(/** @type {Liquid} */ (liquid === 'nuoc' ? 'xa-phong' : 'nuoc'));
  const otherValues = $derived(parseCounts(texts[otherLiquid]).values);

  /** @param {string | number} v */
  function pickLiquid(v) {
    liquid = /** @type {Liquid} */ (v);
    drops = 0;
    spilled = false;
    regroup();
  }

  function regroup() {
    const vs = parseCounts(texts[liquid]).values;
    if (vs.length) start = defaultStart(Math.min(...vs), width);
  }

  /** @param {number} n */
  function addDrops(n) {
    if (spilled) return;
    for (let i = 0; i < n; i++) {
      if (drops === cap) {
        spilled = true;
        const sep = texts[liquid].trim() === '' ? '' : ' ';
        texts[liquid] = `${texts[liquid].trim()}${sep}${cap}`;
        regroup();
        return;
      }
      drops++;
    }
  }

  function newTrial() {
    trials[liquid]++;
    drops = 0;
    spilled = false;
  }

  // Coin drawing.
  const CW = 300;
  const CH = 150;
  const cx = CW / 2;
  const coinTop = 100;
  const half = 80;
  const dome = $derived(spilled ? 30 : 34 * (drops / 46) ** 0.75);
  const domePath = $derived(
    `M ${cx - half} ${coinTop} Q ${cx - half} ${coinTop - dome * 1.25} ${cx} ${coinTop - dome} Q ${cx + half} ${coinTop - dome * 1.25} ${cx + half} ${coinTop} Z`,
  );

  // Frequency chart.
  const W = 440;
  const H = 230;
  const L = 36;
  const R = 12;
  const T = 44;
  const B = 34;
  const lo = $derived(groups.length ? groups[0].lo : 0);
  const hi = $derived(groups.length ? groups[groups.length - 1].hi : 1);
  const axis = $derived(niceAxis(0, Math.max(1, ...groups.map((g) => g.count)), 4));
  /** @param {number} v */
  const gx = (v) => L + ((v - lo) / Math.max(hi - lo, 1)) * (W - L - R);
  /** @param {number} c */
  const gy = (c) => H - B - (c / axis.max) * (H - T - B);

  const markers = $derived(
    ready
      ? [
          { x: xBar, label: `x̄ ${approxText(xBar)}`, color: '#7C3AED' },
          { x: quarts[1].q.value, label: `Mₑ ${approxText(quarts[1].q.value)}`, color: '#0EA5E9' },
          ...modes
            .filter((m) => m.value !== null)
            .map((m) => ({
              x: /** @type {number} */ (m.value),
              label: `Mₒ ${approxText(/** @type {number} */ (m.value))}`,
              color: '#DC2626',
            })),
        ]
      : [],
  );

  const status = $derived.by(() => {
    if (parsed.bad.length)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Không đọc được: ${parsed.bad.slice(0, 3).join(', ')}. Mỗi lần đo là một số tự nhiên (số giọt), các số cách nhau bởi dấu cách hoặc dấu chấm phẩy.`,
      };
    if (values.length < 4)
      return {
        tone: /** @type {const} */ ('info'),
        text: `Mới có ${values.length} lần đo. Hãy làm thêm thí nghiệm hoặc nhập số liệu của lớp (ít nhất 4 số) để lập bảng ghép nhóm.`,
      };
    if (tooMany)
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Độ dài nhóm $h = ${width}$ tạo ra ${groups.length} nhóm, quá nhiều để đọc. Hãy tăng độ dài nhóm.`,
      };
    const raw = `Từ số liệu gốc: trung bình ${formatNumber(mean(values), 2)}, trung vị ${formatNumber(median(values), 2)}`;
    const compare = otherValues.length
      ? ` Số giọt trung bình với ${liquid === 'nuoc' ? 'nước xà phòng' : 'nước sạch'} là ${formatNumber(mean(otherValues), 2)}: ${liquid === 'nuoc' ? 'nước sạch giữ được nhiều giọt hơn vì lực căng mặt ngoài lớn hơn.' : 'xà phòng làm giảm lực căng mặt ngoài nên đồng xu giữ được ít giọt hơn.'}`
      : '';
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${values.length} lần đo, ${groups.length} nhóm. Ước lượng từ bảng ghép nhóm: $\\overline{x}$ ${approxText(xBar)}, $M_e$ ${approxText(quarts[1].q.value)}. ${raw}: hai cách cho kết quả gần nhau.${compare}`,
    };
  });
</script>

<div class="space-y-5">
  <SegmentedControl
    label="Chất lỏng"
    options={LIQUIDS.map((l) => ({ value: l.value, label: l.label }))}
    value={liquid}
    onchange={pickLiquid}
  />

  <div class="grid items-center gap-4 sm:grid-cols-2">
    <svg
      viewBox="0 0 {CW} {CH}"
      class="mx-auto block w-full max-w-xs rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label={spilled
        ? `Nước đã tràn khỏi đồng xu. Đồng xu giữ được ${cap} giọt.`
        : `Đồng xu có ${drops} giọt nước, mặt nước phồng lên thành vòm.`}
    >
      <line
        x1={cx}
        y1="8"
        x2={cx}
        y2="34"
        stroke="#94A3B8"
        stroke-width="6"
        stroke-linecap="round"
      />
      {#if !spilled}
        <circle {cx} cy="44" r="4" fill="#38BDF8" />
      {/if}
      <ellipse {cx} cy={coinTop + 14} rx={half} ry="8" fill="#B45309" />
      <rect x={cx - half} y={coinTop} width={half * 2} height="14" fill="#D97706" />
      <ellipse {cx} cy={coinTop} rx={half} ry="8" fill="#F59E0B" />
      {#if drops > 0}
        <path
          d={domePath}
          fill={liquid === 'nuoc' ? '#7DD3FC' : '#C4B5FD'}
          fill-opacity="0.8"
          stroke="#0284C7"
        />
      {/if}
      {#if spilled}
        <path
          d="M {cx + half - 4} {coinTop} q 14 10 10 40 l 30 0 q -18 -8 -26 -40 Z"
          fill="#7DD3FC"
          fill-opacity="0.8"
        />
        <text x={cx} y={CH - 6} font-size="13" text-anchor="middle" fill="#B91C1C">Nước tràn!</text>
      {/if}
    </svg>

    <div class="space-y-3">
      <p class="text-sm text-slate-700">
        Lần đo thứ {trials[liquid] + 1} ({liquid === 'nuoc' ? 'nước sạch' : 'nước xà phòng'}).
      </p>
      <p class="text-2xl font-bold tabular-nums" aria-live="polite">
        {spilled ? `Giữ được ${cap} giọt` : `${drops} giọt`}
      </p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} disabled={spilled} onclick={() => addDrops(1)}
          >Nhỏ một giọt</button
        >
        <button type="button" class={button.quiet} disabled={spilled} onclick={() => addDrops(5)}
          >Nhỏ 5 giọt</button
        >
        <button type="button" class={button.secondary} disabled={!spilled} onclick={newTrial}
          >Đo lần mới</button
        >
      </div>
      <p class="text-xs text-slate-600">
        Khi nước tràn, số giọt đồng xu giữ được (không tính giọt làm tràn) được ghi vào số liệu bên
        dưới.
      </p>
    </div>
  </div>

  <div>
    <label for={dataId} class="mb-1 block text-sm font-semibold text-slate-700"
      >Số liệu (số giọt của mỗi lần đo)</label
    >
    <textarea
      id={dataId}
      rows="3"
      class="w-full rounded-lg border border-slate-300 p-2 font-mono text-sm tabular-nums {focusRing}"
      bind:value={texts[liquid]}
      onchange={regroup}></textarea>
    <div class="mt-2 flex flex-wrap gap-2">
      {#if liquid === 'nuoc'}
        <button
          type="button"
          class={button.quiet}
          onclick={() => {
            texts.nuoc = CLASS_SAMPLE.join(' ');
            regroup();
          }}>Số liệu mẫu của lớp</button
        >
      {/if}
      <button type="button" class={button.quiet} onclick={() => (texts[liquid] = '')}
        >Xoá số liệu</button
      >
    </div>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Độ dài nhóm h"
      bind:value={width}
      min={1}
      max={10}
      oninput={() => regroup()}
    />
    <SliderField
      label="Đầu mút trái nhóm đầu"
      bind:value={start}
      min={startLo}
      max={Math.max(smallest, startLo)}
    />
  </div>

  {#if ready}
    <div class="overflow-x-auto">
      <table class="w-full min-w-[20rem] text-center text-sm tabular-nums">
        <caption class="mb-1 text-left text-slate-600"
          >Bảng tần số ghép nhóm, cỡ mẫu n = {values.length}</caption
        >
        <thead>
          <tr class="bg-slate-100">
            <th class="p-1.5">Nhóm</th>
            <th class="p-1.5">Tần số</th>
            <th class="p-1.5">Tần số tích luỹ</th>
            <th class="p-1.5">Giá trị đại diện</th>
          </tr>
        </thead>
        <tbody>
          {#each groups as g, i (g.lo)}
            <tr class="border-b border-slate-200">
              <td class="p-1.5">{groupText(g)}</td>
              <td class="p-1.5">{g.count}</td>
              <td class="p-1.5">{cum[i]}</td>
              <td class="p-1.5">{formatNumber(midpoint(g))}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
      role="img"
      aria-label="Biểu đồ tần số của {groups.length} nhóm: {groups
        .map((g) => `${groupText(g)} có ${g.count} lần`)
        .join('; ')}. {markers.map((m) => m.label).join(', ')}."
    >
      {#each axis.ticks as t (t)}
        <line x1={L} x2={W - R} y1={gy(t)} y2={gy(t)} stroke="#E2E8F0" />
        <text x={L - 6} y={gy(t) + 4} font-size="11" text-anchor="end" fill="#475569">{t}</text>
      {/each}
      {#each groups as g (g.lo)}
        <rect
          x={gx(g.lo)}
          y={gy(g.count)}
          width={gx(g.hi) - gx(g.lo)}
          height={H - B - gy(g.count)}
          fill="#BAE6FD"
          stroke="#0284C7"
        />
        <text x={gx(g.lo)} y={H - B + 14} font-size="11" text-anchor="middle" fill="#475569"
          >{g.lo}</text
        >
      {/each}
      <text x={gx(hi)} y={H - B + 14} font-size="11" text-anchor="middle" fill="#475569">{hi}</text>
      <text x={W - R} y={H - 4} font-size="11" text-anchor="end" fill="#475569">số giọt</text>
      {#each markers as m, i (m.label)}
        <line x1={gx(m.x)} x2={gx(m.x)} y1={T - 4} y2={H - B} stroke={m.color} stroke-width="2" />
        <text
          x={Math.min(Math.max(gx(m.x), L + 30), W - R - 30)}
          y={10 + i * 11}
          font-size="10"
          text-anchor="middle"
          fill={m.color}>{m.label}</text
        >
      {/each}
    </svg>

    <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
      <p><Tex math={meanTex(groups)} /></p>
      {#each quarts as { k, q } (k)}
        <p><Tex math={quartileTex(q, k)} /></p>
      {/each}
      {#each modes as m (m.index)}
        <p>
          <Tex math={modeTex(m)} />
          {#if m.value === null}
            (hai nhóm kề có cùng tần số với nhóm chứa mốt, công thức không áp dụng được)
          {/if}
        </p>
      {/each}
    </div>
  {/if}

  <FeedbackNote tone={status.tone} text={status.text} />
</div>
