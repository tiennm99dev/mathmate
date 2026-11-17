<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  /**
   * The chapter's mixed practice: one tap-the-answer question of each part.
   * A motion question draws the mover on its road with what it knows: the
   * speed above, the distance below and the time at the end, the unknown one
   * as '?'.
   */

  const allGood =
    'Tuyệt vời! Em đã nắm chắc số đo thời gian, vận tốc, quãng đường và thời gian của chuyển động đều.';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      {@const v = q.visual}
      <svg
        viewBox="0 0 360 120"
        class="w-full rounded-2xl bg-sky-50"
        role="img"
        aria-label="{v.mover}: vận tốc {v.v}, quãng đường {v.s}, thời gian {v.t === '?'
          ? 'chưa biết'
          : v.t}."
      >
        <rect x="20" y="52" width="320" height="22" rx="6" fill="#cbd5e1" />
        <line
          x1="28"
          y1="63"
          x2="332"
          y2="63"
          stroke="#ffffff"
          stroke-width="2"
          stroke-dasharray="10 8"
        />
        <g transform="translate(40 48)">
          {#if v.kind === 'motorbike'}
            <circle cx="0" cy="3" r="6" fill="none" stroke="#1e293b" stroke-width="3" />
            <circle cx="24" cy="3" r="6" fill="none" stroke="#1e293b" stroke-width="3" />
            <path d="M 2 -4 L 22 -4 L 26 3" fill="none" stroke="#e11d48" stroke-width="3" />
            <rect x="4" y="-10" width="12" height="6" rx="2" fill="#e11d48" />
            <path d="M 20 -4 L 18 -14 L 23 -14" fill="none" stroke="#1e293b" stroke-width="2" />
            <circle cx="10" cy="-20" r="4" fill="#f59e0b" />
          {:else if v.kind === 'bicycle'}
            <circle cx="0" cy="3" r="7" fill="none" stroke="#1e293b" stroke-width="2" />
            <circle cx="24" cy="3" r="7" fill="none" stroke="#1e293b" stroke-width="2" />
            <path
              d="M 0 3 L 9 -7 L 20 -7 L 24 3 M 9 -7 L 12 3 L 20 -7 M 20 -7 L 19 -12"
              fill="none"
              stroke="#0f766e"
              stroke-width="2"
            />
            <circle cx="11" cy="-18" r="4" fill="#f59e0b" />
          {:else}
            <rect x="-4" y="-10" width="30" height="14" rx="4" fill="#e11d48" />
            <rect x="2" y="-17" width="16" height="9" rx="2" fill="#e11d48" />
            <circle cx="4" cy="5" r="4" fill="#1e293b" />
            <circle cx="20" cy="5" r="4" fill="#1e293b" />
          {/if}
        </g>
        <path
          d="M 74 38 L 120 38 M 112 32 L 120 38 L 112 44"
          stroke="#be123c"
          stroke-width="3"
          fill="none"
        />
        <text x="128" y="44" font-size="18" font-weight="700" fill="#9f1239">v = {v.v}</text>
        <line x1="20" y1="86" x2="340" y2="86" stroke="#475569" stroke-width="2" />
        <line x1="20" y1="80" x2="20" y2="92" stroke="#475569" stroke-width="2" />
        <line x1="340" y1="80" x2="340" y2="92" stroke="#475569" stroke-width="2" />
        <text x="180" y="110" font-size="18" font-weight="700" text-anchor="middle" fill="#334155"
          >s = {v.s}</text
        >
        <text x="340" y="28" font-size="18" font-weight="700" text-anchor="end" fill="#0f766e"
          >t = {v.t}</text
        >
      </svg>
    {/if}
  {/snippet}
</ChoiceRound>
