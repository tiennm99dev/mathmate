<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { button } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import GraphBox from '../_shared/graph-box.svelte';
  import { FAMILIES, M_MAX, M_MIN, M_STEP, isContinuous } from './engine.js';

  const CURVE = '#4f46e5';
  const PEN = '#e11d48';
  const SPEED = 1.6; // units of x per second

  let id = $state('value');
  let m = $state(1);
  let penX = $state(/** @type {number | null} */ (null));
  let playing = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  const fam = $derived(FAMILIES.find((x) => x.id === id) ?? FAMILIES[0]);
  const f = $derived(fam.at(m));
  const join = $derived(fam.join(m));
  const ok = $derived(isContinuous(fam, m));
  const win = $derived(fam.view);
  const end = $derived(penX ?? win.xMax);
  const lifted = $derived(!ok && end > fam.x0);

  const dots = $derived.by(() => {
    const out = [];
    if (ok) return [{ x: fam.x0, y: join.value, color: CURVE }];
    for (const y of new Set([join.left, join.right])) {
      if (y !== join.value) out.push({ x: fam.x0, y, color: CURVE, hollow: true });
    }
    out.push({ x: fam.x0, y: join.value, color: CURVE });
    return out;
  });
  const pen = $derived(
    penX === null ? [] : [{ x: penX, y: penX === fam.x0 ? join.value : f(penX), color: PEN, r: 7 }],
  );

  function draw() {
    if (playing) {
      halt();
      return;
    }
    if (reducedMotion()) {
      penX = win.xMax;
      return;
    }
    penX = win.xMin;
    playing = true;
    stop = frameLoop((dt) => {
      const next = Math.min(win.xMax, (penX ?? win.xMin) + SPEED * dt);
      penX = next;
      if (next >= win.xMax) halt();
    });
  }
  function halt() {
    stop?.();
    stop = null;
    playing = false;
  }
  $effect(() => () => stop?.());

  function reset() {
    halt();
    penX = null;
  }

  const x0 = $derived(numTex(fam.x0));
  const values = $derived(
    `$\\lim\\limits_{x \\to ${x0}^-} f(x) = ${numTex(join.left)}$, $\\lim\\limits_{x \\to ${x0}^+} f(x) = ${numTex(join.right)}$, $f(${x0}) = ${numTex(join.value)}$.`,
  );
  const verdict = $derived(
    ok
      ? `Ba số bằng nhau: $\\lim\\limits_{x \\to ${x0}} f(x) = f(${x0})$, nên hàm số liên tục tại $x = ${x0}$; đồ thị là một đường liền, vẽ không cần nhấc bút.`
      : join.left !== join.right
        ? `Hai giới hạn một bên khác nhau, nên không có $\\lim\\limits_{x \\to ${x0}} f(x)$: hàm số gián đoạn tại $x = ${x0}$. Hãy chỉnh $m$ để hai nhánh gặp nhau.`
        : `Giới hạn $\\lim\\limits_{x \\to ${x0}} f(x) = ${numTex(join.left)}$ tồn tại nhưng khác $f(${x0})$: hàm số gián đoạn tại $x = ${x0}$. Hãy chỉnh $m$ để lấp chỗ hổng.`,
  );
  const penLine = $derived(
    penX === null
      ? 'Bấm "Vẽ đồ thị" để bút chạy từ trái sang phải.'
      : lifted
        ? `Đến $x = ${x0}$ bút phải nhấc lên rồi đặt xuống chỗ khác: đồ thị bị đứt.`
        : end >= win.xMax
          ? 'Bút vẽ hết đồ thị mà không nhấc lên lần nào.'
          : `Bút đang ở $x \\approx ${numTex(end, 1)}$.`,
  );
  const label = $derived(
    `Đồ thị hàm số trên đoạn từ ${formatNumber(win.xMin)} đến ${formatNumber(win.xMax)} với m = ${formatNumber(m)}; ${
      ok ? 'liền nét' : 'bị đứt'
    } tại x = ${formatNumber(fam.x0)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Hàm số"
    options={FAMILIES.map((x) => ({ value: x.id, label: x.label }))}
    bind:value={id}
    onchange={reset}
  />

  <div class="overflow-x-auto text-center">
    <Tex display math={fam.tex(m)} />
  </div>

  <GraphBox
    {win}
    {label}
    curves={[{ f, color: CURVE, breaks: ok ? [] : [fam.x0], to: end }]}
    points={end >= fam.x0 ? [...dots, ...pen] : pen}
    marks={[fam.x0]}
  />

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Tham số m"
      bind:value={m}
      min={M_MIN}
      max={M_MAX}
      step={M_STEP}
      oninput={reset}
    />
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={draw}
        >{playing ? 'Tạm dừng' : 'Vẽ đồ thị'}</button
      >
      <button type="button" class={button.quiet} onclick={reset}>Hiện cả đồ thị</button>
    </div>
  </div>

  <FeedbackNote tone="info" text={values} />
  <FeedbackNote tone={ok ? 'ok' : 'warn'} text={verdict} />
  <FeedbackNote tone={lifted ? 'warn' : 'info'} text={penLine} />
</div>
