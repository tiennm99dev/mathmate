<svelte:options namespace="svg" />

<script>
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import { snapX } from './plot.js';

  /**
   * A drag handle that rides on the curve y = f(x) inside a `graph-box`: a
   * drag moves it left and right along the curve, the arrow keys move x by
   * `step` (Shift: five steps), and x snaps to the grid `step` and to the
   * special values `snaps` (critical points, ends of an interval). Set
   * `onAxis` to keep the handle on the x-axis instead of on the curve.
   * @type {{
   *   frame: import('./plot.js').Frame;
   *   svg: () => SVGSVGElement | null;
   *   f: (x: number) => number;
   *   x: number;
   *   lo: number;
   *   hi: number;
   *   step: number;
   *   snaps?: number[];
   *   onAxis?: boolean;
   *   color?: string;
   *   name?: string;
   *   label: string;
   * }}
   */
  let {
    frame,
    svg,
    f,
    x = $bindable(),
    lo,
    hi,
    step,
    snaps = [],
    onAxis = false,
    color = '#4F46E5',
    name = '',
    label,
  } = $props();

  /** @param {number} v */
  const place = (v) => snapX(v, { lo, hi, step, snaps, radius: step * 1.5 });
  /** @param {number} v */
  const yOf = (v) => (onAxis ? frame.sy(0) : frame.sy(f(v)));
  const drag = $derived({
    point: { x: frame.sx(x), y: yOf(x) },
    svg,
    viewBox: { w: frame.width, h: frame.height },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      const v = place(frame.ix(p.x));
      return { x: frame.sx(v), y: yOf(v) };
    },
    onChange: () => {
      x = place(frame.ix(drag.point.x));
    },
    /** @param {-1 | 0 | 1} dx @param {-1 | 0 | 1} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const dir = dx || -dy;
      x = snapX(x + dir * step * (big ? 5 : 1), { lo, hi, step });
    },
  });
</script>

<DragPoint {drag} {label} r={9} {color} {name} nameDx={10} nameDy={-12} />
