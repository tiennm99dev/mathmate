<script>
  import Frac from '#lib/core/frac.svelte';
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import FractionShape from '../_shared/fraction-shape.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood =
    'Tuyệt vời! Em đã đọc, viết, rút gọn, quy đồng mẫu số và so sánh phân số rất giỏi.';

  /** @param {import('./engine.js').Question} q */
  const listOptions = (q) => q.kind === 'quy-dong';

  /**
   * @param {{ shape: 'circle' | 'bar' | 'grid', parts: number, cols: number, filled: number }} v
   */
  const fillsOf = (v) =>
    Array.from({ length: v.parts }, (_, i) => (i < v.filled ? '#6366f1' : null));
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood} {listOptions}>
  {#snippet visual(/** @type {import('./engine.js').Question} */ q)}
    {@const v = q.visual}
    {#if v?.type === 'shape'}
      <div class="rounded-2xl bg-indigo-50 p-3">
        <FractionShape
          shape={v.shape}
          parts={v.parts}
          cols={v.cols}
          fills={fillsOf(v)}
          label="Hình chia thành {v.parts} phần bằng nhau, {v.filled} phần tô màu."
        />
      </div>
    {:else if v?.type === 'line'}
      <p
        class="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-amber-50 p-4 text-3xl font-bold text-slate-800"
      >
        {#each v.items as item, i (i)}
          {#if typeof item === 'string'}
            <span>{item}</span>
          {:else if item.n === '?'}
            <span class="inline-flex flex-col items-center leading-tight">
              <span class="sr-only">Dấu ? phần {item.d}</span>
              <span aria-hidden="true" class="text-indigo-700">?</span>
              <span aria-hidden="true" class="w-full border-t-2 border-current"></span>
              <span aria-hidden="true">{item.d}</span>
            </span>
          {:else}
            <Frac n={item.n} d={item.d} size="lg" />
          {/if}
        {/each}
      </p>
    {:else if v?.type === 'people'}
      <ul class="grid gap-2 rounded-2xl bg-sky-50 p-3 text-xl text-slate-800">
        {#each v.rows as row (row.name)}
          <li class="flex items-center gap-2">
            <strong>{row.name}:</strong>
            <Frac n={row.n} d={row.d} size="lg" />
            <span>{v.unit}</span>
          </li>
        {/each}
      </ul>
    {/if}
  {/snippet}
  {#snippet option(/** @type {import('#lib/core/kid/quiz.js').KidOption} */ opt)}
    {#if typeof opt !== 'string' && Array.isArray(opt.fracs)}
      <span class="inline-flex items-center gap-2" aria-hidden="true">
        {#each opt.fracs as f, i (i)}
          {#if i > 0}<span class="text-xl">và</span>{/if}
          <Frac n={f.n} d={f.d} size="lg" />
        {/each}
      </span>
    {:else}
      {typeof opt === 'string' ? opt : opt.label}
    {/if}
  {/snippet}
</ChoiceRound>
