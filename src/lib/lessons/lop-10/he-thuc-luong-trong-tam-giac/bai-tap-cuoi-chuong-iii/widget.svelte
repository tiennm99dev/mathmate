<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import DragPoint from '#lib/core/visuals/drag-point.svelte';
  import GeometryBoard from '#lib/core/visuals/geometry-board.svelte';
  import { arcPath, directionTo } from '#lib/core/visuals/angle-math.js';
  import { button, textInput } from '#lib/core/ui.js';
  import {
    TOWER_HEIGHT,
    TREE,
    judge,
    realDistance,
    riverDistance,
    riverReadings,
    towerHeight,
    towerReadings,
  } from './engine.js';

  const W = 400;
  const H = 260;

  // Tower scene: ground at GROUND, the tower's foot at FOOT, TK px per metre.
  const GROUND = 230;
  const FOOT = 370;
  const TK = 2.8;
  const TOP = { x: FOOT, y: GROUND - TOWER_HEIGHT * TK };

  // River scene: this bank at BANK, metres measured from X0, RK px per metre.
  const BANK = 220;
  const X0 = 10;
  const RK = 4;
  const TREE_PT = { x: X0 + TREE.x * RK, y: BANK - TREE.y * RK };

  let scene = $state('tower');
  let far = $state(60);
  let near = $state(25);
  let xa = $state(5);
  let xb = $state(80);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn', text: string } | null} */
  let result = $state(null);
  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const tower = $derived(towerReadings(far, near));
  const river = $derived(riverReadings(xa, xb));

  const A = $derived(
    scene === 'tower' ? { x: FOOT - far * TK, y: GROUND } : { x: X0 + xa * RK, y: BANK },
  );
  const B = $derived(
    scene === 'tower' ? { x: FOOT - near * TK, y: GROUND } : { x: X0 + xb * RK, y: BANK },
  );

  function clear() {
    result = null;
  }

  /** @param {number} f @param {number} n */
  function setTower(f, n) {
    const nf = Math.max(25, Math.min(120, Math.round(f)));
    const nn = Math.max(10, Math.min(105, Math.round(n)));
    const r = towerReadings(nf, nn);
    // B stays at least 15 m nearer, so the angle at the top is not too small.
    if (nf - nn < 15 || r.beta - r.alpha < 3) return;
    far = nf;
    near = nn;
    clear();
  }

  /** @param {number} a @param {number} b */
  function setRiver(a, b) {
    const na = Math.max(0, Math.min(35, Math.round(a)));
    const nb = Math.max(20, Math.min(95, Math.round(b)));
    if (nb - na < 20) return;
    xa = na;
    xb = nb;
    clear();
  }

  /** @param {'A' | 'B'} name */
  const dragOf = (name) => ({
    point: { ...(name === 'A' ? A : B) },
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    projector: (/** @type {{ x: number, y: number }} */ p) => {
      if (scene === 'tower') {
        const m = (FOOT - p.x) / TK;
        if (name === 'A') setTower(m, near);
        else setTower(far, m);
      } else {
        const m = (p.x - X0) / RK;
        if (name === 'A') setRiver(m, xb);
        else setRiver(xa, m);
      }
      return name === 'A' ? A : B;
    },
    onKeyMove: (/** @type {-1 | 0 | 1} */ dx, /** @type {-1 | 0 | 1} */ _dy, big = false) => {
      const step = dx * (big ? 5 : 1);
      if (scene === 'tower') {
        // Right moves towards the tower, so the distance to the foot shrinks.
        if (name === 'A') setTower(far - step, near);
        else setTower(far, near - step);
      } else if (name === 'A') setRiver(xa + step, xb);
      else setRiver(xa, xb + step);
    },
  });

  const expected = $derived(scene === 'tower' ? towerHeight(tower) : riverDistance(river));
  const real = $derived(scene === 'tower' ? TOWER_HEIGHT : realDistance(xa));

  function check() {
    result =
      scene === 'tower'
        ? judge(
            typed,
            expected,
            real,
            'chiều cao h',
            `Trong tam giác ABC: góc A = ${tower.alpha}°, góc ABC = 180° − ${tower.beta}°, nên góc ACB = ${tower.beta}° − ${tower.alpha}° = ${tower.beta - tower.alpha}°. Định lí sin cho $BC = \\dfrac{AB \\sin A}{\\sin C}$, rồi $h = BC \\sin ${tower.beta}^\\circ$.`,
          )
        : judge(
            typed,
            expected,
            real,
            'AC',
            `Góc C = 180° − ${river.angA}° − ${river.angB}° = ${180 - river.angA - river.angB}°. Định lí sin: $\\dfrac{AC}{\\sin B} = \\dfrac{AB}{\\sin C}$, nên $AC = \\dfrac{${river.d} \\sin ${river.angB}^\\circ}{\\sin ${180 - river.angA - river.angB}^\\circ}$.`,
          );
  }

  const label = $derived(
    scene === 'tower'
      ? `Mặt cắt đứng: tháp cao chưa biết, đỉnh C. Điểm A cách chân tháp ${far} m, điểm B cách chân tháp ${near} m, AB = ${tower.d} m. Góc nhìn đỉnh tháp từ A là ${tower.alpha} độ, từ B là ${tower.beta} độ.`
      : `Nhìn từ trên xuống: A và B trên bờ bên này, cách nhau ${river.d} m; cây C ở bờ bên kia. Góc CAB = ${river.angA} độ, góc CBA = ${river.angB} độ.`,
  );
  const readings = $derived(
    scene === 'tower'
      ? [
          `AB = ${tower.d} m`,
          `Góc nhìn từ A: α = ${tower.alpha}°`,
          `Góc nhìn từ B: β = ${tower.beta}°`,
        ]
      : [`AB = ${river.d} m`, `Góc CAB = ${river.angA}°`, `Góc CBA = ${river.angB}°`],
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Bài đo"
    bind:value={scene}
    onchange={() => {
      typed = '';
      clear();
    }}
    options={[
      { value: 'tower', label: 'Chiều cao tháp' },
      { value: 'river', label: 'Khoảng cách qua sông' },
    ]}
  />

  <GeometryBoard bind:svgEl width={W} height={H} interactive maxWidth="max-w-xl" {label}>
    {#if scene === 'tower'}
      <rect x="0" y="0" width={W} height={GROUND} fill="#f0f9ff" />
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#dcfce7" />
      <line x1="0" x2={W} y1={GROUND} y2={GROUND} stroke="#166534" stroke-width="1.5" />
      <rect
        x={FOOT - 9}
        y={TOP.y}
        width="18"
        height={GROUND - TOP.y}
        fill="#cbd5e1"
        stroke="#475569"
      />
      <text
        x={FOOT - 14}
        y={GROUND - 25}
        font-size="13"
        font-weight="700"
        text-anchor="end"
        fill="#0f172a">h = ?</text
      >
      <text
        x={FOOT}
        y={TOP.y - 8}
        font-size="12"
        font-weight="700"
        text-anchor="middle"
        fill="#0f172a">C</text
      >
      <line
        x1={A.x}
        y1={A.y}
        x2={TOP.x}
        y2={TOP.y}
        stroke="#4f46e5"
        stroke-width="1.4"
        stroke-dasharray="6 4"
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={TOP.x}
        y2={TOP.y}
        stroke="#e11d48"
        stroke-width="1.4"
        stroke-dasharray="6 4"
      />
      <path
        d={arcPath(A, directionTo(A, { x: FOOT, y: GROUND }), directionTo(A, TOP), 34)}
        fill="none"
        stroke="#4f46e5"
        stroke-width="1.6"
      />
      <path
        d={arcPath(B, directionTo(B, { x: FOOT, y: GROUND }), directionTo(B, TOP), 26)}
        fill="none"
        stroke="#e11d48"
        stroke-width="1.6"
      />
      <text x={A.x + 40} y={A.y - 6} font-size="11" font-weight="700" fill="#4f46e5">α</text>
      <text x={B.x + 32} y={B.y - 6} font-size="11" font-weight="700" fill="#e11d48">β</text>
    {:else}
      <rect x="0" y="0" width={W} height={TREE_PT.y + 14} fill="#dcfce7" />
      <rect x="0" y={TREE_PT.y + 14} width={W} height={BANK - TREE_PT.y - 14} fill="#bae6fd" />
      <rect x="0" y={BANK} width={W} height={H - BANK} fill="#dcfce7" />
      <line x1="0" x2={W} y1={BANK} y2={BANK} stroke="#166534" stroke-width="1.5" />
      <circle cx={TREE_PT.x} cy={TREE_PT.y} r="9" fill="#16a34a" />
      <text x={TREE_PT.x + 14} y={TREE_PT.y + 4} font-size="12" font-weight="700" fill="#14532d"
        >C</text
      >
      <line
        x1={A.x}
        y1={A.y}
        x2={TREE_PT.x}
        y2={TREE_PT.y}
        stroke="#4f46e5"
        stroke-width="1.4"
        stroke-dasharray="6 4"
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={TREE_PT.x}
        y2={TREE_PT.y}
        stroke="#e11d48"
        stroke-width="1.4"
        stroke-dasharray="6 4"
      />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#b45309" stroke-width="2.5" />
      <path
        d={arcPath(A, directionTo(A, B), directionTo(A, TREE_PT), 30)}
        fill="none"
        stroke="#4f46e5"
        stroke-width="1.6"
      />
      <path
        d={arcPath(B, directionTo(B, TREE_PT), directionTo(B, A), 30)}
        fill="none"
        stroke="#e11d48"
        stroke-width="1.6"
      />
      <text
        x={(A.x + TREE_PT.x) / 2 - 10}
        y={(A.y + TREE_PT.y) / 2}
        font-size="12"
        font-weight="700"
        text-anchor="end"
        fill="#0f172a">AC = ?</text
      >
    {/if}

    <DragPoint
      drag={dragOf('A')}
      r={8}
      color="#4f46e5"
      name="A"
      nameDx={-6}
      nameDy={22}
      label="Điểm đứng A: kéo hoặc dùng phím mũi tên trái phải để dời, giữ Shift để dời 5 mét"
    />
    <DragPoint
      drag={dragOf('B')}
      r={8}
      color="#e11d48"
      name="B"
      nameDx={-6}
      nameDy={22}
      label="Điểm đứng B: kéo hoặc dùng phím mũi tên trái phải để dời, giữ Shift để dời 5 mét"
    />
  </GeometryBoard>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
    {#each readings as r (r)}
      <p>{r}</p>
    {/each}
  </div>

  <form
    class="flex flex-wrap items-end gap-2"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-0 flex-1">
      <span class="mb-1 block text-sm font-semibold text-slate-700"
        >{scene === 'tower' ? 'Chiều cao h của tháp' : 'Khoảng cách AC'} (m, làm tròn đến hàng phần mười)</span
      >
      <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
    </label>
    <button type="submit" class={button.primary}>Kiểm tra</button>
  </form>
  {#if result}
    <FeedbackNote tone={result.tone} text={result.text} />
  {:else}
    <FeedbackNote
      tone="info"
      text={scene === 'tower'
        ? 'Đứng ở A rồi tiến lại gần tháp đến B, mỗi lần đo góc nhìn lên đỉnh C. Dùng định lí sin trong tam giác ABC để tính h.'
        : 'Đo đoạn AB trên bờ và hai góc CAB, CBA bằng giác kế. Dùng định lí sin trong tam giác ABC để tính AC.'}
    />
  {/if}
</div>
