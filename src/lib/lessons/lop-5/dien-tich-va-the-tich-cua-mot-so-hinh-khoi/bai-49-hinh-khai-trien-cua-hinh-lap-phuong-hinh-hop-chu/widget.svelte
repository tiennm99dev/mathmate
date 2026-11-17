<script>
  import KidNote from '#lib/core/kid/kid-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FoldButtons from '../_shared/fold-buttons.svelte';
  import FoldView from '../_shared/fold-view.svelte';
  import { boxPieces, cylinderPieces } from '../_shared/fold.js';

  /** The three solids of the lesson, each with its net and what the net is made of. */
  const SOLIDS = {
    'lap-phuong': {
      name: 'hình lập phương',
      pieces: boxPieces(3, 3, 3),
      net: 'Hình khai triển của hình lập phương gồm 6 hình vuông bằng nhau.',
    },
    'hop-chu-nhat': {
      name: 'hình hộp chữ nhật',
      pieces: boxPieces(4, 2, 3),
      net: 'Hình khai triển của hình hộp chữ nhật gồm 6 hình chữ nhật: 4 mặt xung quanh màu xanh và 2 mặt đáy màu vàng.',
    },
    tru: {
      name: 'hình trụ',
      pieces: cylinderPieces(1.1, 3.5),
      net: 'Hình khai triển của hình trụ gồm 1 hình chữ nhật màu xanh (mặt xung quanh) và 2 hình tròn bằng nhau màu vàng (hai mặt đáy).',
    },
  };

  let shape = $state(/** @type {string | number} */ ('lap-phuong'));
  let t = $state(0);

  const solid = $derived(SOLIDS[/** @type {keyof typeof SOLIDS} */ (shape)]);

  const note = $derived.by(() => {
    if (t >= 1) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Gấp xong rồi! Hình khai triển đã thành ${solid.name}.`,
      };
    }
    if (t <= 0) return { tone: /** @type {const} */ ('info'), text: solid.net };
    return {
      tone: /** @type {const} */ ('info'),
      text: `Các mặt đang gấp dần lên. Gấp hết sẽ được ${solid.name}.`,
    };
  });

  /** Start each solid from its flat net. */
  function pick() {
    t = 0;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn hình"
    options={[
      { value: 'lap-phuong', label: 'Hình lập phương' },
      { value: 'hop-chu-nhat', label: 'Hình hộp chữ nhật' },
      { value: 'tru', label: 'Hình trụ' },
    ]}
    bind:value={shape}
    onchange={pick}
  />

  <FoldView pieces={solid.pieces} {t} label="Hình khai triển của {solid.name}" />

  {#key shape}
    <FoldButtons bind:t />
  {/key}

  <KidNote tone={note.tone} text={note.text} />
</div>
