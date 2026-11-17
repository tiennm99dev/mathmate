<script>
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { fraction, toTex } from '#lib/fraction-engine/index.js';
  import {
    applyStep,
    backSolve,
    classify,
    generalTex,
    isTriangular,
    nextStep,
    stepText,
    systemOf,
    systemTex,
  } from '../_shared/system3.js';

  /** @typedef {import('../_shared/system3.js').Step} Step */
  /** @typedef {import('../_shared/system3.js').System} System */

  const PRESETS = [
    {
      value: 'mot',
      label: 'Hệ 1',
      rows: [
        [1, 1, -2, 3],
        [-1, 1, 6, 13],
        [2, 1, -9, -5],
      ],
    },
    {
      value: 'hai',
      label: 'Hệ 2',
      rows: [
        [0, 2, -1, 3],
        [1, -1, 2, 0],
        [2, 1, 1, 6],
      ],
    },
    {
      value: 'ba',
      label: 'Hệ 3',
      rows: [
        [1, 1, 1, 1],
        [2, 3, 1, 4],
        [3, 4, 2, 7],
      ],
    },
    {
      value: 'bon',
      label: 'Hệ 4',
      rows: [
        [1, 1, 1, 2],
        [1, 2, 3, 5],
        [2, 3, 4, 7],
      ],
    },
  ];

  /** Multipliers offered in the list, as [numerator, denominator]. */
  const BASE_FACTORS = [
    [-5, 1],
    [-4, 1],
    [-3, 1],
    [-2, 1],
    [-1, 1],
    [-1, 2],
    [-1, 3],
    [1, 3],
    [1, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
  ];

  let preset = $state('mot');
  /** @type {System[]} */
  let history = $state([systemOf(PRESETS[0].rows)]);
  /** @type {string[]} */
  let log = $state([]);
  const current = $derived(history[history.length - 1]);

  let op = $state('add');
  let target = $state(1);
  let source = $state(0);
  let factorKey = $state('1/1');
  let other = $state(1);
  /** @type {string | null} */
  let hint = $state(null);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let message = $state(null);

  /** @param {string} key */
  const factorOf = (key) => {
    const [n, d] = key.split('/').map(Number);
    return fraction(n, d);
  };
  /** @param {number} n @param {number} d */
  const keyOf = (n, d) => `${n}/${d}`;

  let extraFactor = $state(/** @type {string | null} */ (null));
  const factors = $derived.by(() => {
    const keys = BASE_FACTORS.map(([n, d]) => keyOf(n, d));
    if (extraFactor && !keys.includes(extraFactor)) keys.push(extraFactor);
    return keys.map((k) => {
      const f = factorOf(k);
      const sign = f.n < 0 ? '−' : '';
      const abs = Math.abs(f.n);
      return { key: k, label: f.d === 1 ? `${sign}${abs}` : `${sign}${abs}/${f.d}` };
    });
  });

  const ROWS = [0, 1, 2].map((i) => ({ value: i, label: `PT (${i + 1})` }));

  /** @param {string} value */
  function choosePreset(value) {
    const p = PRESETS.find((x) => x.value === value) ?? PRESETS[0];
    history = [systemOf(p.rows)];
    log = [];
    hint = null;
    message = null;
  }

  /** @param {Step} step */
  function run(step) {
    history = [...history, applyStep(current, step)];
    log = [...log, stepText(step)];
    hint = null;
    message = null;
  }

  function apply() {
    const k = factorOf(factorKey);
    if (op === 'swap') {
      if (target === other) {
        message = { tone: 'warn', text: 'Hãy chọn hai phương trình khác nhau để đổi chỗ.' };
        return;
      }
      run({ op: 'swap', i: target, j: other });
    } else if (op === 'scale') {
      run({ op: 'scale', i: target, k });
    } else {
      if (target === source) {
        message = {
          tone: 'warn',
          text: 'Phải cộng với bội của một phương trình khác: chọn hai phương trình khác nhau.',
        };
        return;
      }
      run({ op: 'add', target, source, k });
    }
  }

  function suggest() {
    const step = nextStep(current);
    if (!step) {
      hint = 'Hệ đã có dạng tam giác: giải ngược từ phương trình cuối lên.';
      return;
    }
    op = step.op;
    if (step.op === 'swap') {
      target = step.i;
      other = step.j;
    } else if (step.op === 'scale') {
      target = step.i;
    } else {
      target = step.target;
      source = step.source;
      extraFactor = keyOf(step.k.n, step.k.d);
      factorKey = extraFactor;
    }
    hint = `Gợi ý: ${stepText(step)} Bấm "Thực hiện" để làm bước này.`;
  }

  function undo() {
    if (history.length < 2) return;
    history = history.slice(0, -1);
    log = log.slice(0, -1);
    hint = null;
    message = null;
  }

  const triangular = $derived(isTriangular(current));
  const result = $derived.by(() => {
    if (!triangular) return null;
    const back = backSolve(current);
    if (back) {
      return {
        tone: /** @type {const} */ ('ok'),
        lines: back.lines,
        text: `Hệ đã có dạng tam giác. Hệ có nghiệm duy nhất $(x; y; z) = (${back.values.map(toTex).join('; ')})$.`,
      };
    }
    const sol = classify(current);
    if (sol.kind === 'none') {
      return {
        tone: /** @type {const} */ ('warn'),
        lines: [],
        text: 'Hệ đã có dạng tam giác, nhưng có một phương trình dạng $0z = d$ với $d \\ne 0$: phương trình này vô nghiệm, nên hệ vô nghiệm.',
      };
    }
    if (sol.kind === 'infinite') {
      const general = generalTex(sol);
      return {
        tone: /** @type {const} */ ('info'),
        lines: [],
        text: general
          ? `Hệ đã có dạng tam giác, phương trình cuối là $0z = 0$, đúng với mọi $z$: hệ có vô số nghiệm $${general}$ với $z$ tuỳ ý.`
          : 'Hệ đã có dạng tam giác và có vô số nghiệm.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      lines: [],
      text: 'Hệ đã có dạng tam giác. Tiếp tục khử để thấy rõ nghiệm của hệ.',
    };
  });

  const status = $derived(
    triangular
      ? null
      : `Chưa có dạng tam giác: cần khử $x$ khỏi phương trình (2), (3) và khử $y$ khỏi phương trình (3). Đã làm ${log.length} bước.`,
  );

  const selectClass = `${textInput} text-base`;
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hệ phương trình"
    options={PRESETS.map((p) => ({ value: p.value, label: p.label }))}
    bind:value={preset}
    onchange={(v) => choosePreset(String(v))}
  />

  <div
    class="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center"
    aria-live="polite"
  >
    <Tex math={systemTex(current)} display />
  </div>

  <div class="space-y-3 rounded-xl border border-slate-200 p-3">
    <SegmentedControl
      label="Phép biến đổi"
      options={[
        { value: 'add', label: 'Cộng bội' },
        { value: 'scale', label: 'Nhân' },
        { value: 'swap', label: 'Đổi chỗ' },
      ]}
      bind:value={op}
    />

    <div class="grid gap-3 sm:grid-cols-3">
      <label class="block text-sm font-semibold text-slate-700">
        {op === 'add' ? 'Cộng vào' : op === 'scale' ? 'Nhân hai vế của' : 'Đổi chỗ'}
        <select class={selectClass} bind:value={target}>
          {#each ROWS as r (r.value)}
            <option value={r.value}>{r.label}</option>
          {/each}
        </select>
      </label>
      {#if op === 'add'}
        <label class="block text-sm font-semibold text-slate-700">
          Số nhân
          <select class={selectClass} bind:value={factorKey}>
            {#each factors as f (f.key)}
              <option value={f.key}>{f.label}</option>
            {/each}
          </select>
        </label>
        <label class="block text-sm font-semibold text-slate-700">
          lần
          <select class={selectClass} bind:value={source}>
            {#each ROWS as r (r.value)}
              <option value={r.value}>{r.label}</option>
            {/each}
          </select>
        </label>
      {:else if op === 'scale'}
        <label class="block text-sm font-semibold text-slate-700">
          với số
          <select class={selectClass} bind:value={factorKey}>
            {#each factors as f (f.key)}
              <option value={f.key}>{f.label}</option>
            {/each}
          </select>
        </label>
      {:else}
        <label class="block text-sm font-semibold text-slate-700">
          với
          <select class={selectClass} bind:value={other}>
            {#each ROWS as r (r.value)}
              <option value={r.value}>{r.label}</option>
            {/each}
          </select>
        </label>
      {/if}
    </div>

    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={apply}>Thực hiện</button>
      <button type="button" class={button.secondary} onclick={suggest}>Gợi ý bước tiếp</button>
      <button type="button" class={button.quiet} onclick={undo} disabled={history.length < 2}>
        Hoàn tác
      </button>
      <button type="button" class={button.quiet} onclick={() => choosePreset(preset)}>
        Làm lại
      </button>
    </div>
  </div>

  {#if message}
    <FeedbackNote tone={message.tone} text={message.text} />
  {/if}
  {#if hint}
    <FeedbackNote tone="info" text={hint} />
  {/if}

  {#if log.length}
    <div class="rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
      <p class="font-semibold">Các bước đã làm</p>
      <ol class="mt-1 list-decimal space-y-1 pl-5">
        {#each log as line, i (i)}
          <li><LiveRichText text={line} /></li>
        {/each}
      </ol>
    </div>
  {/if}

  {#if result}
    {#if result.lines.length}
      <ul class="space-y-1 text-sm text-slate-700">
        {#each result.lines as line, i (i)}
          <li><LiveRichText text={line} /></li>
        {/each}
      </ul>
    {/if}
    <FeedbackNote tone={result.tone} text={result.text} />
  {:else if status}
    <FeedbackNote tone="info" text={status} />
  {/if}
</div>
