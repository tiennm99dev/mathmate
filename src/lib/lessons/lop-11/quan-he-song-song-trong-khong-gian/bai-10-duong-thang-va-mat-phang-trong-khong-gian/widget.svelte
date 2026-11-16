<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { focusRing } from '#lib/core/ui.js';
  import SpaceScene from '../_shared/space-scene.svelte';
  import { lerp3 } from '../_shared/space.js';
  import { CANDIDATES, POINTS, TASKS, answerText, judge } from './engine.js';

  /**
   * Finding the line where two planes of the pyramid S.ABCD meet: the
   * learner taps the points they think both planes hold. Each tap is checked
   * with the reason (O ∈ AC ⊂ (SAC)); two common points give the giao tuyến,
   * drawn in red through them.
   */

  const PLANE_COLORS = ['#6366F1', '#F59E0B'];
  const LINE = '#DC2626';
  const GREY = '#94A3B8';
  const FACES = [
    ['A', 'B', 'C', 'D'],
    ['S', 'A', 'B'],
    ['S', 'B', 'C'],
    ['S', 'C', 'D'],
    ['S', 'D', 'A'],
  ];
  const EDGES = ['SA', 'SB', 'SC', 'SD', 'AB', 'BC', 'CD', 'DA'];

  let task = $state(0);
  /** @type {string[]} */
  let tapped = $state([]);
  let note = $state({ tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'), text: '' });
  let view = $state({ yaw: -30, pitch: 28 });

  const current = $derived(TASKS[task]);
  const found = $derived(tapped.filter((p) => judge(p, current.planes).common));
  const done = $derived(found.length >= 2);

  /** @param {string} p */
  function tap(p) {
    if (tapped.includes(p) || done) return;
    tapped = [...tapped, p];
    const v = judge(p, current.planes);
    const count = found.length;
    if (!v.common) note = { tone: 'warn', text: v.text };
    else if (count < 2) note = { tone: 'info', text: `${v.text} Hãy tìm thêm một điểm chung nữa.` };
    else
      note = {
        tone: 'ok',
        text: `${v.text} Hai điểm chung phân biệt xác định giao tuyến: ${answerText(current)}.`,
      };
  }

  /** @param {string | number} i */
  function choose(i) {
    task = Number(i);
    tapped = [];
    note = { tone: 'info', text: '' };
  }

  const segments = $derived.by(() => {
    /** @type {import('../_shared/space.js').SceneSegment[]} */
    const list = EDGES.map((e) => ({ key: e, from: e[0], to: e[1] }));
    const thin = { color: GREY, width: 1.4 };
    list.push(
      { key: 'AC', from: 'A', to: 'C', ...thin },
      { key: 'BD', from: 'B', to: 'D', ...thin },
      { key: 'BE', from: 'B', to: 'E', ...thin },
      { key: 'CE', from: 'C', to: 'E', ...thin },
      { key: 'DF', from: 'D', to: 'F', ...thin },
      { key: 'CF', from: 'C', to: 'F', ...thin },
    );
    if (current.planes.includes('MBD')) {
      list.push(
        { key: 'MB', from: 'M', to: 'B', color: PLANE_COLORS[0], width: 1.6 },
        { key: 'MD', from: 'M', to: 'D', color: PLANE_COLORS[0], width: 1.6 },
      );
    }
    if (done) {
      const a = POINTS[current.line[0]];
      const b = POINTS[current.line[1]];
      list.push({
        key: 'giao-tuyen',
        from: lerp3(a, b, -0.2),
        to: lerp3(a, b, 1.25),
        color: LINE,
        width: 3,
      });
    }
    return list;
  });

  const polygons = $derived(
    current.planes.map((name, i) => ({
      key: `${task}-${name}`,
      pts: [...name],
      fill: PLANE_COLORS[i],
      opacity: 0.22,
    })),
  );

  const dots = $derived([
    ...['O', 'E', 'F', 'M'].map((k) => ({ at: k, color: '#475569' })),
    ...tapped.map((k) => ({ at: k, color: judge(k, current.planes).common ? '#059669' : LINE })),
  ]);

  const status = $derived(
    done
      ? `Đã tìm được giao tuyến ${current.line}`
      : `Đã tìm được ${found.length} trong 2 điểm chung`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn bài toán"
    options={TASKS.map((t, i) => ({ value: i, label: `(${t.planes[0]}) và (${t.planes[1]})` }))}
    value={task}
    onchange={choose}
  />
  <p class="text-base">
    <LiveRichText
      text={`Tìm giao tuyến của hai mặt phẳng $(${current.planes[0]})$ (tô tím) và $(${current.planes[1]})$ (tô cam): chạm vào các điểm thuộc cả hai mặt phẳng.`}
    />
  </p>
  <SpaceScene
    points={POINTS}
    faces={FACES}
    {segments}
    {polygons}
    {dots}
    centre={{ x: 1.2, y: 1.2, z: 1.4 }}
    radius={5.2}
    bind:view
    label={`Hình chóp S.ABCD; O là giao điểm của AC và BD, E là giao điểm của AB và CD, F là giao điểm của AD và BC, M là trung điểm SA. ${status}`}
  />
  <div class="flex flex-wrap gap-2" role="group" aria-label="Các điểm có thể là điểm chung">
    {#each CANDIDATES as p (p)}
      {@const picked = tapped.includes(p)}
      {@const good = picked && judge(p, current.planes).common}
      <button
        type="button"
        class="min-h-11 min-w-11 rounded-lg border px-3 text-lg font-bold transition {focusRing} {picked
          ? good
            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
            : 'border-red-500 bg-red-50 text-red-700'
          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'}"
        aria-pressed={picked}
        aria-label={picked ? `${p}, ${good ? 'là điểm chung' : 'không là điểm chung'}` : p}
        disabled={done && !picked}
        onclick={() => tap(p)}>{p}</button
      >
    {/each}
  </div>
  <p class="text-sm text-slate-600" aria-live="polite">{status}.</p>
  {#if note.text}
    <FeedbackNote tone={note.tone} text={note.text} />
  {/if}
</div>
