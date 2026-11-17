<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, focusRing } from '#lib/core/ui.js';
  import OrthoViews from '../_shared/ortho-views.svelte';
  import SolidPicture from '../_shared/solid-picture.svelte';
  import { CATALOG, ROUNDS, judgePick, viewsWords } from './engine.js';

  const LETTERS = ['A', 'B', 'C', 'D'];

  let round = $state(0);
  /** @type {string[]} */
  let tried = $state([]);
  let solved = $state(false);
  let firstTry = $state(0);
  let note = $state({
    tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
    text: 'Đọc ba hình chiếu rồi chọn vật thể có đúng ba hình chiếu đó.',
  });

  const r = $derived(ROUNDS[round]);
  const target = $derived(CATALOG[r.target]);
  const last = $derived(round === ROUNDS.length - 1);
  // All choices share one scale, so their sizes can be compared too.
  const fit = $derived(
    Math.max(
      ...r.options.map((o) => {
        const s = CATALOG[o].solid;
        return Math.hypot(s.nx, s.ny, s.nz);
      }),
    ),
  );

  /** @param {string} id */
  function pick(id) {
    if (solved || tried.includes(id)) return;
    const verdict = judgePick(id, r.target);
    tried = [...tried, id];
    if (verdict.ok) {
      solved = true;
      if (tried.length === 1) firstTry += 1;
      note = {
        tone: 'ok',
        text: last
          ? `${verdict.text} Em đã hoàn thành ${ROUNDS.length} lượt, đúng ngay lần đầu ${firstTry} lượt.`
          : verdict.text,
      };
    } else {
      note = { tone: 'warn', text: verdict.text };
    }
  }

  function next() {
    round = last ? 0 : round + 1;
    if (last) firstTry = 0;
    tried = [];
    solved = false;
    note = { tone: 'info', text: `Lượt ${round + 1}: đọc ba hình chiếu rồi chọn vật thể.` };
  }
</script>

<div class="space-y-4">
  <p class="text-sm font-semibold text-slate-700">
    Lượt {round + 1}/{ROUNDS.length}: ba hình chiếu này là của vật thể nào?
  </p>
  <div class="rounded-xl border border-slate-200 bg-white p-3">
    <OrthoViews
      solid={target.solid}
      label="Ba hình chiếu của vật thể cần tìm: {viewsWords(target.solid)}.{solved
        ? ` Vật thể đó là ${target.desc}.`
        : ''}"
    />
  </div>

  <div class="grid grid-cols-2 gap-3">
    {#each r.options as id, i (id)}
      {@const wrong = tried.includes(id) && id !== r.target}
      {@const right = solved && id === r.target}
      <button
        type="button"
        class="rounded-xl border-2 bg-white p-2 text-left transition {focusRing} {right
          ? 'border-emerald-500'
          : wrong
            ? 'border-rose-300 opacity-60'
            : 'border-slate-200 hover:border-indigo-400'}"
        aria-label="Vật thể {LETTERS[i]}: {CATALOG[id].desc}{right
          ? ', đúng'
          : wrong
            ? ', chưa đúng'
            : ''}"
        aria-disabled={solved || wrong}
        onclick={() => pick(id)}
      >
        <span class="text-sm font-bold text-slate-700">{LETTERS[i]}</span>
        <SolidPicture solid={CATALOG[id].solid} width={180} height={140} {fit} />
      </button>
    {/each}
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
  {#if solved}
    <button type="button" class={button.primary} onclick={next}>
      {last ? 'Chơi lại từ đầu' : 'Lượt tiếp theo'}
    </button>
  {/if}
</div>
