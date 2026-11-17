<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import { KIND_LABELS, buildRound } from './engine.js';

  const allGood = 'Tuyệt vời! Em đã nắm chắc chu vi và diện tích các hình đã học.';

  const box = 'mx-auto block w-full max-w-xs';
  const label = 'font-size:15px;font-weight:700';
</script>

<ChoiceRound build={buildRound} labels={KIND_LABELS} {allGood}>
  {#snippet visual(q)}
    {#if q.visual}
      {@const v = q.visual}
      <div class="rounded-2xl bg-sky-50 px-4 py-3">
        {#if v.shape === 'triangle'}
          <svg
            viewBox="0 0 240 150"
            class={box}
            role="img"
            aria-label="Hình tam giác có đáy {v.base}, chiều cao {v.height}."
          >
            <polygon
              points="30,120 210,120 90,25"
              fill="#C7D2FE"
              stroke="#4338CA"
              stroke-width="3"
            />
            <line
              x1="90"
              y1="25"
              x2="90"
              y2="120"
              stroke="#DC2626"
              stroke-width="2.5"
              stroke-dasharray="6 4"
            />
            <path d="M 100 120 V 110 H 90" fill="none" stroke="#DC2626" stroke-width="2" />
            <text x="120" y="142" text-anchor="middle" fill="#047857" style={label}>{v.base}</text>
            <text x="84" y="80" text-anchor="end" fill="#DC2626" style={label}>{v.height}</text>
          </svg>
        {:else if v.shape === 'trapezoid'}
          <svg
            viewBox="0 0 240 150"
            class={box}
            role="img"
            aria-label="Hình thang có đáy lớn {v.a}, đáy bé {v.b}, chiều cao {v.h}."
          >
            <polygon
              points="20,115 220,115 160,35 70,35"
              fill="#C7D2FE"
              stroke="#4338CA"
              stroke-width="3"
            />
            <line
              x1="70"
              y1="35"
              x2="70"
              y2="115"
              stroke="#DC2626"
              stroke-width="2.5"
              stroke-dasharray="6 4"
            />
            <path d="M 80 115 V 105 H 70" fill="none" stroke="#DC2626" stroke-width="2" />
            <text x="120" y="138" text-anchor="middle" fill="#047857" style={label}>{v.a}</text>
            <text x="115" y="27" text-anchor="middle" fill="#0369A1" style={label}>{v.b}</text>
            <text x="64" y="82" text-anchor="end" fill="#DC2626" style={label}>{v.h}</text>
          </svg>
        {:else if v.shape === 'circle'}
          <svg
            viewBox="0 0 240 150"
            class={box}
            role="img"
            aria-label={v.r
              ? `Hình tròn tâm O, bán kính ${v.r}.`
              : `Hình tròn tâm O, đường kính ${v.d}.`}
          >
            <circle cx="120" cy="72" r="62" fill="#E0E7FF" stroke="#3730A3" stroke-width="3" />
            <circle cx="120" cy="72" r="4" fill="#1F2937" />
            <text x="114" y="92" text-anchor="end" fill="#1F2937" style={label}>O</text>
            {#if v.r}
              <line x1="120" y1="72" x2="182" y2="72" stroke="#047857" stroke-width="3" />
              <text x="151" y="64" text-anchor="middle" fill="#047857" style={label}>{v.r}</text>
            {:else}
              <line x1="58" y1="72" x2="182" y2="72" stroke="#0369A1" stroke-width="3" />
              <text x="120" y="62" text-anchor="middle" fill="#0369A1" style={label}>{v.d}</text>
            {/if}
          </svg>
        {:else if v.shape === 'plot'}
          <svg
            viewBox="0 0 260 150"
            class={box}
            role="img"
            aria-label="Mảnh đất gồm hình chữ nhật dài {v.long}, rộng {v.wide} và hình tam giác có đáy là chiều rộng, chiều cao {v.tip}."
          >
            <rect
              x="60"
              y="35"
              width="130"
              height="80"
              fill="#BBF7D0"
              stroke="#15803D"
              stroke-width="3"
            />
            <polygon
              points="190,35 190,115 245,75"
              fill="#FDE68A"
              stroke="#B45309"
              stroke-width="3"
            />
            <line
              x1="190"
              y1="75"
              x2="245"
              y2="75"
              stroke="#DC2626"
              stroke-width="2.5"
              stroke-dasharray="6 4"
            />
            <text x="125" y="138" text-anchor="middle" fill="#15803D" style={label}>{v.long}</text>
            <text x="54" y="80" text-anchor="end" fill="#15803D" style={label}>{v.wide}</text>
            <text x="217" y="68" text-anchor="middle" fill="#DC2626" style={label}>{v.tip}</text>
          </svg>
        {:else if v.shape === 'quarter'}
          <svg
            viewBox="0 0 240 150"
            class={box}
            role="img"
            aria-label="Mảnh vườn một phần tư hình tròn, bán kính {v.r}."
          >
            <path
              d="M 70 130 L 70 20 A 110 110 0 0 1 180 130 Z"
              fill="#BBF7D0"
              stroke="#15803D"
              stroke-width="3"
            />
            <text x="125" y="146" text-anchor="middle" fill="#047857" style={label}>{v.r}</text>
            <text x="64" y="80" text-anchor="end" fill="#047857" style={label}>{v.r}</text>
          </svg>
        {/if}
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
