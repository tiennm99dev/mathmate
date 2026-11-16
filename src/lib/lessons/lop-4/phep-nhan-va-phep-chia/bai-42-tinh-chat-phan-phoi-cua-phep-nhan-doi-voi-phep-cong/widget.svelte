<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import Stepper from '#lib/core/stepper.svelte';
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import { LIMITS, countsOf, partsOf, splitLabel } from './engine.js';

  let cut = $state(/** @type {import('./engine.js').Cut} */ ('cols'));
  let a = $state(4);
  let b = $state(5);
  let c = $state(3);

  const split = $derived({ cut, a, b, c });
  const parts = $derived(partsOf(split));
  const counts = $derived(countsOf(split));
  const message = $derived(
    `Đếm cả hình hay cộng hai phần đều được ${counts.total} ô. Vậy ${counts.rule}.`,
  );
  const partWord = $derived(cut === 'cols' ? 'cột' : 'hàng');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chia hình chữ nhật"
    bind:value={cut}
    options={[
      { value: 'cols', label: 'Chia theo cột' },
      { value: 'rows', label: 'Chia theo hàng' },
    ]}
  />

  <div class="flex justify-center">
    <div
      class="flex gap-2 rounded-xl bg-white p-2 shadow-sm {cut === 'cols'
        ? 'flex-row'
        : 'flex-col'}"
      role="img"
      aria-label={splitLabel(split)}
    >
      {#each parts as part (part.tone)}
        <div
          class="inline-grid gap-0.5"
          style="grid-template-columns: repeat({part.cols}, 1.25rem)"
        >
          {#each { length: part.rows * part.cols } as _, i (i)}
            <span class="block h-5 w-5 rounded-sm {part.tone}"></span>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="grid gap-2 text-center text-lg font-semibold tabular-nums sm:grid-cols-2">
    <p class="rounded-xl bg-slate-100 px-3 py-2 text-slate-900">Cả hình: {counts.whole}</p>
    <p class="rounded-xl bg-slate-100 px-3 py-2 text-slate-900">
      <span class="text-rose-700">Phần hồng</span> +
      <span class="text-sky-700">phần xanh</span>: {counts.parts}
    </p>
  </div>

  <KidNote tone="info" text={message} />

  <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
    <Stepper
      label="Mỗi {partWord} có"
      bind:value={a}
      min={LIMITS.a.min}
      max={LIMITS.a.max}
      format={(v) => `${v} ô`}
    />
    <Stepper
      label="Số {partWord} hồng"
      bind:value={b}
      min={LIMITS.part.min}
      max={LIMITS.part.max}
    />
    <Stepper
      label="Số {partWord} xanh"
      bind:value={c}
      min={LIMITS.part.min}
      max={LIMITS.part.max}
    />
  </div>
</div>
