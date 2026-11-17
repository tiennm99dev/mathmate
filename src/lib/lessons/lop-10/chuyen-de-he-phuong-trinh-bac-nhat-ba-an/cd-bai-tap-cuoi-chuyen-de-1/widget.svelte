<script>
  import Tex from '#lib/components/tex.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { readNumber } from '#lib/core/decimal.js';
  import { numTex } from '#lib/core/number-format.js';
  import { checkValues, equationTex, substitutionTex, valueTex } from '../_shared/system3.js';
  import { SYSTEMS } from './systems.js';

  let id = $state(SYSTEMS[0].id);
  const sys = $derived(SYSTEMS.find((s) => s.id === id) ?? SYSTEMS[0]);
  let inputs = $state(['', '', '']);
  /** @type {number[] | null} */
  let tried = $state(null);
  /** @type {string | null} */
  let invalid = $state(null);

  const uid = $props.id();

  function reset() {
    inputs = ['', '', ''];
    tried = null;
    invalid = null;
  }

  function check() {
    const values = inputs.map((t) => readNumber(t));
    const bad = values.findIndex((v) => v === null);
    if (bad >= 0) {
      invalid = `Chưa đọc được giá trị của $${sys.names[bad]}$. Nhập một số nguyên, số thập phân (dấu phẩy) hoặc phân số dạng $a/b$.`;
      tried = null;
      return;
    }
    invalid = null;
    tried = /** @type {number[]} */ (values);
  }

  const system = $derived(
    `\\begin{cases} ${sys.equations.map((e) => equationTex(e.coeffs, e.rhs, sys.names)).join(' \\\\ ')} \\end{cases}`,
  );
  const results = $derived(tried ? checkValues(sys.equations, tried) : null);
  const good = $derived(results ? results.filter((r) => r.ok).length : 0);
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hệ cần kiểm tra"
    options={SYSTEMS.map((s) => ({ value: s.id, label: s.label }))}
    bind:value={id}
    onchange={reset}
  />

  <p class="text-sm text-slate-700"><LiveRichText text={sys.context} /></p>

  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
    <Tex math={system} display />
  </div>

  <form
    class="space-y-3 rounded-xl border border-slate-200 p-3"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <p class="text-sm font-semibold text-slate-700">Nhập nghiệm em tìm được</p>
    <div class="grid grid-cols-3 gap-2">
      {#each sys.names as name, i (sys.id + name)}
        <div>
          <label for="{uid}-{i}" class="block text-sm font-semibold text-slate-700">
            <i>{name}</i> =
          </label>
          <input
            id="{uid}-{i}"
            class={textInput}
            inputmode="text"
            autocomplete="off"
            bind:value={inputs[i]}
          />
        </div>
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="submit" class={button.primary}>Thay số kiểm tra</button>
      <button type="button" class={button.quiet} onclick={reset}>Xoá</button>
    </div>
  </form>

  {#if invalid}
    <FeedbackNote tone="warn" text={invalid} />
  {/if}

  {#if results && tried}
    {@const values = tried}
    <ul class="space-y-2 text-sm">
      {#each sys.equations as e, i (i)}
        {@const r = results[i]}
        <li
          class="rounded-lg border px-3 py-2 {r.ok
            ? 'border-emerald-200 bg-emerald-50'
            : 'border-amber-200 bg-amber-50'}"
        >
          <span class="font-semibold">Phương trình ({i + 1}):</span>
          <span class="block overflow-x-auto">
            <Tex
              math={`${substitutionTex(e.coeffs, values)} = ${valueTex(r.left)} ${r.ok ? '=' : '\\ne'} ${numTex(r.rhs)}`}
            />
            <span class="ml-1 font-semibold {r.ok ? 'text-emerald-700' : 'text-amber-800'}">
              {r.ok ? 'đúng' : 'sai'}
            </span>
          </span>
        </li>
      {/each}
    </ul>
    <FeedbackNote
      tone={good === 3 ? 'ok' : 'warn'}
      text={good === 3
        ? 'Bộ số thoả mãn cả ba phương trình: đó là nghiệm của hệ.'
        : `Bộ số chỉ thoả mãn ${good} trong 3 phương trình nên không phải nghiệm của hệ. Hãy xem lại các bước khử ở phương trình sai.`}
    />
  {/if}
</div>
