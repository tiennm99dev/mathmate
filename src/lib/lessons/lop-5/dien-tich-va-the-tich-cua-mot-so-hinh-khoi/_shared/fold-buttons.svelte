<script>
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { button } from '#lib/core/ui.js';

  /**
   * Big "Gấp lại" and "Mở ra" buttons that fold or unfold a net in a short
   * animation (at once when the visitor asks for less motion), and a slider
   * to stop the fold half way. `t` is 0 for the flat net and 1 for the solid.
   * @type {{ t: number, ondone?: (t: number) => void }}
   */
  let { t = $bindable(0), ondone } = $props();

  /** Share of the fold done per second. */
  const SPEED = 0.6;

  /** @type {(() => void) | null} */
  let stop = null;
  let moving = $state(false);

  function halt() {
    stop?.();
    stop = null;
    moving = false;
  }

  /** @param {number} target */
  function go(target) {
    halt();
    if (reducedMotion()) {
      t = target;
      ondone?.(target);
      return;
    }
    moving = true;
    const from = t;
    const sign = target > from ? 1 : -1;
    let done = 0;
    stop = frameLoop((dt) => {
      done += dt * SPEED;
      const next = from + sign * done;
      if (sign * (next - target) >= 0) {
        t = target;
        halt();
        ondone?.(target);
      } else {
        t = next;
      }
    });
  }

  $effect(() => () => stop?.());
</script>

<div class="space-y-3">
  <div class="flex flex-wrap justify-center gap-2">
    <button
      type="button"
      class="min-h-12 text-lg {button.primary}"
      disabled={moving || t >= 1}
      onclick={() => go(1)}>Gấp lại</button
    >
    <button
      type="button"
      class="min-h-12 text-lg {button.secondary}"
      disabled={moving || t <= 0}
      onclick={() => go(0)}>Mở ra</button
    >
  </div>
  <SliderField
    label="Gấp dần"
    bind:value={t}
    min={0}
    max={1}
    step={0.05}
    format={(v) => `${Math.round(v * 100)}%`}
    oninput={() => halt()}
  />
</div>
