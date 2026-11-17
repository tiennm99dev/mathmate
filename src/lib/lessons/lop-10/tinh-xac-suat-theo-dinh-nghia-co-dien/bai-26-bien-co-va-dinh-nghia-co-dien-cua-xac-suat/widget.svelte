<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { richText } from '#lib/core/tex-text.js';
  import { button, focusRing } from '#lib/core/ui.js';
  import {
    EXPERIMENTS,
    checkMarks,
    favourableKeys,
    letterTex,
    summaryText,
    trialText,
  } from './engine.js';

  let expId = $state(EXPERIMENTS[0].id);
  let eventIndex = $state(0);
  let opposite = $state(false);
  /** @type {string[]} */
  let marked = $state([]);
  /** @type {string | null} */
  let rolled = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let note = $state({
    tone: 'info',
    text: 'Chạm vào các ô là kết quả thuận lợi cho biến cố rồi bấm "Kiểm tra".',
  });

  const exp = $derived(EXPERIMENTS.find((e) => e.id === expId) ?? EXPERIMENTS[0]);
  const event = $derived(exp.events[eventIndex] ?? exp.events[0]);
  const name = $derived(letterTex(opposite));
  const pickId = $props.id();

  const modes = EXPERIMENTS.map((e) => ({ value: e.id, label: e.title }));
  const targets = [
    { value: 'E', label: 'Biến cố E' },
    { value: 'doi', label: 'Biến cố đối Ē' },
  ];
  let target = $state('E');

  function fresh() {
    marked = [];
    rolled = null;
    note = {
      tone: 'info',
      text: 'Chạm vào các ô là kết quả thuận lợi cho biến cố rồi bấm "Kiểm tra".',
    };
  }

  function changeExperiment() {
    eventIndex = 0;
    fresh();
  }

  function changeTarget() {
    opposite = target === 'doi';
    fresh();
  }

  /** @param {string} key */
  function toggle(key) {
    marked = marked.includes(key) ? marked.filter((k) => k !== key) : [...marked, key];
  }

  function check() {
    const got = checkMarks(exp, event, opposite, marked);
    note = { tone: got.ok ? 'ok' : 'warn', text: got.text };
  }

  function show() {
    marked = favourableKeys(exp, event, opposite);
    note = {
      tone: 'info',
      text: `Các ô được tô là các kết quả thuận lợi. ${summaryText(exp, event, opposite)}`,
    };
  }

  function roll() {
    const o = exp.outcomes[Math.floor(Math.random() * exp.outcomes.length)];
    rolled = o.key;
    note = { tone: 'info', text: trialText(event, opposite, o) };
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Phép thử"
    options={modes}
    bind:value={expId}
    onchange={changeExperiment}
  />

  <p class="text-slate-800"><LiveRichText text={exp.prompt} /></p>
  <p class="text-sm text-slate-600"><LiveRichText text={`Không gian mẫu: ${exp.omega}`} /></p>

  <label class="block" for={pickId}>
    <span class="mb-1 block text-sm font-semibold text-slate-700">Biến cố E</span>
    <select
      id={pickId}
      class="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 {focusRing}"
      bind:value={eventIndex}
      onchange={fresh}
    >
      {#each exp.events as ev, i (ev.id)}
        <option value={i}>{richText(ev.text)}</option>
      {/each}
    </select>
  </label>

  <SegmentedControl
    label="Tô kết quả thuận lợi cho"
    options={targets}
    bind:value={target}
    onchange={changeTarget}
  />

  <p class="font-semibold text-slate-800">
    <LiveRichText text={`$${name}$: "${opposite ? event.opposite : event.text}".`} />
  </p>

  <div class="overflow-x-auto">
    {#if exp.colLabel}
      <p class="mb-1 text-xs text-slate-500">Hàng: {exp.rowLabel}; cột: {exp.colLabel}</p>
    {/if}
    <div
      class="grid gap-1"
      style="grid-template-columns: repeat({exp.columns}, minmax(2.75rem, 1fr));"
      role="group"
      aria-label="Không gian mẫu: chạm để tô hoặc bỏ tô một kết quả"
    >
      {#each exp.outcomes as o (o.key)}
        {@const on = marked.includes(o.key)}
        <button
          type="button"
          class="min-h-11 rounded-lg border-2 px-0 text-xs font-semibold whitespace-nowrap tabular-nums sm:text-sm {on
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'} {rolled === o.key
            ? 'ring-4 ring-amber-400'
            : ''} {focusRing}"
          aria-pressed={on}
          aria-label={`Kết quả ${o.label}${rolled === o.key ? ', vừa xuất hiện' : ''}`}
          onclick={() => toggle(o.key)}>{o.label}</button
        >
      {/each}
    </div>
  </div>

  <p class="text-sm text-slate-700">
    Đã tô {marked.length} trong {exp.outcomes.length} kết quả.
  </p>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.secondary} onclick={roll}>Thực hiện phép thử</button>
    <button type="button" class={button.quiet} onclick={show}>Tô giúp</button>
    <button type="button" class={button.quiet} onclick={fresh}>Xoá</button>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
