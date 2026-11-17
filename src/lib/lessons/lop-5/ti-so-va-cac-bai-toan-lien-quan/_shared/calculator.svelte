<script>
  import { focusRing } from '#lib/core/ui.js';
  import { KEY_ROWS, KEY_WORDS, screenReading } from './calc.js';

  /**
   * The pocket calculator drawn as a keypad under a screen. It keeps no state:
   * `calc` is the state from `calc.js` and `onpress` gets every key, from a
   * tap, a click or, while a key has focus, the computer keyboard (digits,
   * . or ,, + - * /, %, =, Escape for ON/C, Delete for CE). `target` rings the key a guide
   * wants pressed next.
   * @type {{
   *   calc: import('./calc.js').Calc;
   *   onpress: (key: import('./calc.js').Key) => void;
   *   target?: import('./calc.js').Key | null;
   * }}
   */
  let { calc, onpress, target = null } = $props();

  /** @type {Record<string, import('./calc.js').Key>} */
  const PHYSICAL = {
    '+': '+',
    '-': '−',
    '*': '×',
    x: '×',
    '/': '÷',
    ':': '÷',
    '%': '%',
    '=': '=',
    '.': '.',
    ',': '.',
    Escape: 'ON/C',
    Delete: 'CE',
  };

  /** @param {KeyboardEvent} e */
  function onkeydown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = /^\d$/.test(e.key)
      ? /** @type {import('./calc.js').Key} */ (e.key)
      : PHYSICAL[e.key];
    if (!key) return;
    e.preventDefault();
    onpress(key);
  }

  /** @param {import('./calc.js').Key} key */
  function tone(key) {
    if (key === 'ON/C' || key === 'OFF' || key === 'CE') return 'bg-rose-100 text-rose-900';
    if (/^\d$/.test(key) || key === '.') return 'bg-white text-slate-900';
    return 'bg-indigo-100 text-indigo-900';
  }
</script>

<div
  class="mx-auto w-full max-w-xs rounded-3xl bg-slate-700 p-3 shadow-md"
  role="group"
  aria-label="Máy tính cầm tay"
>
  <div
    class="mb-3 flex min-h-16 items-center justify-end overflow-hidden rounded-xl bg-lime-100 px-3 font-mono text-3xl tabular-nums text-slate-900"
    aria-hidden="true"
  >
    {#if calc.on}
      {#if calc.op}<span class="mr-auto text-base text-slate-500">{calc.op}</span>{/if}
      {calc.entry}
    {/if}
  </div>
  <p class="sr-only" aria-live="polite">{screenReading(calc)}</p>
  <div class="grid grid-cols-4 gap-2">
    {#each KEY_ROWS.flat() as key (key)}
      <button
        type="button"
        class="min-h-12 rounded-xl text-xl font-bold shadow-sm transition active:translate-y-px {tone(
          key,
        )} {focusRing} {target === key ? 'ring-4 ring-amber-400' : ''}"
        aria-label={KEY_WORDS[key]}
        {onkeydown}
        onclick={() => onpress(key)}>{key}</button
      >
    {/each}
  </div>
</div>
