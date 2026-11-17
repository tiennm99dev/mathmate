/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức tính góc giữa hai đường thẳng, góc giữa đường thẳng và mặt phẳng, góc giữa hai mặt phẳng trong không gian Oxyz bằng vectơ chỉ phương và vectơ pháp tuyến.',
  intro:
    'Một đường hầm xuyên núi được khoan theo một hướng nhất định; người kĩ sư cần biết đường hầm nghiêng bao nhiêu độ so với mặt đất, hay hai mái của một ngôi nhà tạo với nhau góc bao nhiêu. Ở lớp 11, ta đã định nghĩa các góc này bằng hình vẽ. Khi đã có toạ độ, mỗi góc được tính bằng một công thức gọn với vectơ chỉ phương và vectơ pháp tuyến.',
  objectives: [
    'Tính góc giữa hai đường thẳng bằng vectơ chỉ phương.',
    'Tính góc giữa đường thẳng và mặt phẳng bằng vectơ chỉ phương và vectơ pháp tuyến.',
    'Tính góc giữa hai mặt phẳng bằng vectơ pháp tuyến.',
    'Vận dụng công thức tính góc vào hình học và bài toán thực tiễn.',
  ],
  sections: [
    {
      heading: 'Góc giữa hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: "Nhắc lại: góc giữa hai đường thẳng $\\Delta$, $\\Delta'$ là góc giữa hai đường thẳng cùng đi qua một điểm và lần lượt song song (hoặc trùng) với $\\Delta$, $\\Delta'$. Góc này nằm trong đoạn $[0^\\circ; 90^\\circ]$, còn góc giữa hai vectơ có thể tù, nên công thức có dấu giá trị tuyệt đối.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: "Nếu $\\Delta$, $\\Delta'$ có vectơ chỉ phương $\\vec{u} = (a; b; c)$, $\\vec{u}' = (a'; b'; c')$ thì",
        },
        {
          type: 'tex',
          tex: "\\cos(\\Delta, \\Delta') = |\\cos(\\vec{u}, \\vec{u}')| = \\dfrac{|aa' + bb' + cc'|}{\\sqrt{a^2 + b^2 + c^2} \\cdot \\sqrt{a'^2 + b'^2 + c'^2}}",
        },
      ],
    },
    {
      heading: 'Góc giữa đường thẳng và mặt phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: nếu $\\Delta$ không vuông góc với $(P)$ thì góc giữa $\\Delta$ và $(P)$ là góc giữa $\\Delta$ và hình chiếu vuông góc $\\Delta_1$ của nó trên $(P)$; nếu $\\Delta \\perp (P)$ thì góc bằng $90^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: 'Nếu $\\Delta$ có vectơ chỉ phương $\\vec{u} = (a; b; c)$ và $(P)$ có vectơ pháp tuyến $\\vec{n} = (A; B; C)$ thì',
        },
        {
          type: 'tex',
          tex: '\\sin(\\Delta, (P)) = |\\cos(\\vec{u}, \\vec{n})| = \\dfrac{|aA + bB + cC|}{\\sqrt{a^2 + b^2 + c^2} \\cdot \\sqrt{A^2 + B^2 + C^2}}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Ở đây là $\\sin$, không phải $\\cos$: góc giữa $\\Delta$ và giá của $\\vec{n}$ (một đường vuông góc với $(P)$) phụ với góc giữa $\\Delta$ và $(P)$.',
        },
      ],
    },
    {
      heading: 'Góc giữa hai mặt phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: góc giữa hai mặt phẳng bằng góc giữa hai đường thẳng lần lượt vuông góc với hai mặt phẳng đó; hai mặt phẳng song song hoặc trùng nhau tạo góc $0^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: "Nếu $(P)$, $(P')$ có vectơ pháp tuyến $\\vec{n} = (A; B; C)$, $\\vec{n}' = (A'; B'; C')$ thì",
        },
        {
          type: 'tex',
          tex: "\\cos((P), (P')) = |\\cos(\\vec{n}, \\vec{n}')| = \\dfrac{|AA' + BB' + CC'|}{\\sqrt{A^2 + B^2 + C^2} \\cdot \\sqrt{A'^2 + B'^2 + C'^2}}",
        },
        {
          type: 'table',
          head: ['Góc', 'Dùng vectơ', 'Hàm số lượng giác'],
          rows: [
            ['Hai đường thẳng', "$\\vec{u}$, $\\vec{u}'$", '$\\cos$'],
            ['Đường thẳng và mặt phẳng', '$\\vec{u}$, $\\vec{n}$', '$\\sin$'],
            ['Hai mặt phẳng', "$\\vec{n}$, $\\vec{n}'$", '$\\cos$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đo góc trên hình và bằng công thức',
    instruction:
      'Chọn loại góc, rồi đổi toạ độ các vectơ chỉ phương, vectơ pháp tuyến. Góc màu cam được đo trực tiếp trên hình; dòng dưới cùng so sánh nó với kết quả của công thức. Xoay hình để thấy hình chiếu của đường thẳng trên mặt phẳng, hay giao tuyến của hai mặt phẳng.',
  },
  examples: [
    {
      problem:
        "Tính góc giữa hai đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 \\\\ z = -1 + t \\end{cases}$ và $\\Delta': \\begin{cases} x = 3 \\\\ y = 1 + s \\\\ z = s \\end{cases}$.",
      steps: [
        "$\\vec{u} = (1; 0; 1)$, $\\vec{u}' = (0; 1; 1)$.",
        "$\\cos(\\Delta, \\Delta') = \\dfrac{|1 \\cdot 0 + 0 \\cdot 1 + 1 \\cdot 1|}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$.",
        "Vậy $(\\Delta, \\Delta') = 60^\\circ$.",
      ],
      answer: "$(\\Delta, \\Delta') = 60^\\circ$.",
    },
    {
      problem:
        'Tính góc giữa đường thẳng $\\Delta: \\begin{cases} x = t \\\\ y = 1 + t \\\\ z = 2 \\end{cases}$ và mặt phẳng $(P): y + z - 3 = 0$.',
      steps: [
        '$\\vec{u} = (1; 1; 0)$, $\\vec{n} = (0; 1; 1)$.',
        '$\\sin(\\Delta, (P)) = \\dfrac{|1 \\cdot 0 + 1 \\cdot 1 + 0 \\cdot 1|}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$.',
        'Vậy $(\\Delta, (P)) = 30^\\circ$.',
      ],
      answer: '$(\\Delta, (P)) = 30^\\circ$.',
    },
    {
      problem: "Tính góc giữa hai mặt phẳng $(P): x + y - 1 = 0$ và $(P'): y + z + 2 = 0$.",
      steps: [
        "$\\vec{n} = (1; 1; 0)$, $\\vec{n}' = (0; 1; 1)$.",
        "$\\cos((P), (P')) = \\dfrac{|0 + 1 + 0|}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$.",
        "Vậy $((P), (P')) = 60^\\circ$.",
      ],
      answer: "$((P), (P')) = 60^\\circ$.",
    },
    {
      problem:
        "Cho hình lập phương $ABCD.A'B'C'D'$ cạnh $1$. Gắn hệ toạ độ với $A$ là gốc, $B(1; 0; 0)$, $D(0; 1; 0)$, $A'(0; 0; 1)$. Tính góc giữa đường chéo $AC'$ và mặt đáy $(ABCD)$.",
      steps: [
        "$C'(1; 1; 1)$ nên $\\overrightarrow{AC'} = (1; 1; 1)$ là một vectơ chỉ phương của $AC'$.",
        'Mặt đáy là mặt phẳng $(Oxy)$, có vectơ pháp tuyến $\\vec{k} = (0; 0; 1)$.',
        "$\\sin(AC', (ABCD)) = \\dfrac{|0 + 0 + 1|}{\\sqrt{3} \\cdot 1} = \\dfrac{\\sqrt{3}}{3}$, nên góc $\\approx 35{,}3^\\circ$.",
      ],
      answer: "$\\sin(AC', (ABCD)) = \\dfrac{\\sqrt{3}}{3}$, góc $\\approx 35{,}3^\\circ$.",
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Tính góc (theo độ) giữa hai đường thẳng có vectơ chỉ phương $\\vec{u} = (1; -1; 0)$ và $\\vec{u}' = (0; 1; -1)$.",
      answer: 60,
      unit: '°',
      hints: [
        "$\\cos(\\Delta, \\Delta') = \\dfrac{|\\vec{u} \\cdot \\vec{u}'|}{|\\vec{u}| \\cdot |\\vec{u}'|}$; nhớ lấy giá trị tuyệt đối.",
      ],
      solution:
        "$\\vec{u} \\cdot \\vec{u}' = 0 - 1 + 0 = -1$, $|\\vec{u}| = |\\vec{u}'| = \\sqrt{2}$, nên $\\cos(\\Delta, \\Delta') = \\dfrac{1}{2}$ và góc bằng $60^\\circ$ (không phải $120^\\circ$).",
    },
    {
      type: 'number',
      prompt:
        'Tính góc (theo độ) giữa đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 \\\\ z = -t \\end{cases}$ và mặt phẳng $(P): x - 3 = 0$.',
      answer: 45,
      unit: '°',
      hints: [
        'Góc giữa đường thẳng và mặt phẳng dùng $\\sin$: $\\sin(\\Delta, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$.',
      ],
      solution:
        '$\\vec{u} = (1; 0; -1)$, $\\vec{n} = (1; 0; 0)$. $\\sin(\\Delta, (P)) = \\dfrac{1}{\\sqrt{2} \\cdot 1} = \\dfrac{\\sqrt{2}}{2}$, nên góc bằng $45^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính góc (theo độ) giữa hai mặt phẳng $(P): x - z + 1 = 0$ và $(Q): y - z = 0$.',
      answer: 60,
      unit: '°',
      hints: ['Dùng hai vectơ pháp tuyến $(1; 0; -1)$ và $(0; 1; -1)$.'],
      solution:
        '$\\cos((P), (Q)) = \\dfrac{|0 + 0 + 1|}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$, nên góc bằng $60^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Côsin của góc giữa hai mặt phẳng $(P): 2x - y + 2z + 1 = 0$ và $(Q): x + 2y - 2z - 3 = 0$ bằng',
      options: ['$\\dfrac{4}{9}$', '$-\\dfrac{4}{9}$', '$\\dfrac{4}{3}$', '$\\dfrac{2}{3}$'],
      answer: 0,
      hints: [
        'Tính tích vô hướng hai vectơ pháp tuyến và độ dài mỗi vectơ.',
        'Góc giữa hai mặt phẳng không vượt quá $90^\\circ$, nên côsin của nó không âm.',
      ],
      solution:
        "$\\vec{n} \\cdot \\vec{n}' = 2 - 2 - 4 = -4$, $|\\vec{n}| = |\\vec{n}'| = 3$. $\\cos((P), (Q)) = \\dfrac{|-4|}{3 \\cdot 3} = \\dfrac{4}{9}$. Đáp án $-\\dfrac{4}{9}$ quên giá trị tuyệt đối; $\\dfrac{4}{3}$ chỉ chia cho độ dài một vectơ.",
    },
    {
      type: 'choice',
      prompt:
        'Góc giữa đường thẳng có vectơ chỉ phương $\\vec{u} = (1; 1; 1)$ và mặt phẳng $(Oxy)$ xấp xỉ bằng',
      options: ['$35{,}3^\\circ$', '$54{,}7^\\circ$', '$45^\\circ$', '$90^\\circ$'],
      answer: 0,
      hints: [
        'Mặt phẳng $(Oxy)$ có vectơ pháp tuyến $(0; 0; 1)$. Với đường thẳng và mặt phẳng, dùng $\\sin$, không dùng $\\cos$.',
      ],
      solution:
        '$\\sin = \\dfrac{|1|}{\\sqrt{3} \\cdot 1} = \\dfrac{\\sqrt{3}}{3} \\approx 0{,}577$, nên góc $\\approx 35{,}3^\\circ$. Kết quả $54{,}7^\\circ$ là góc giữa đường thẳng và trục $Oz$, có được khi dùng nhầm $\\cos$.',
    },
    {
      type: 'number',
      prompt:
        "Tính góc giữa hai đường thẳng có vectơ chỉ phương $\\vec{u} = (2; 1; 2)$ và $\\vec{u}' = (1; 0; 0)$, theo độ, làm tròn đến hàng phần mười.",
      answer: 48.2,
      tolerance: 0.05,
      unit: '°',
      hints: ["$|\\vec{u}| = 3$, $|\\vec{u}'| = 1$."],
      solution:
        "$\\cos(\\Delta, \\Delta') = \\dfrac{|2|}{3 \\cdot 1} = \\dfrac{2}{3}$, nên góc $\\approx 48{,}2^\\circ$.",
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng $\\Delta$ có vectơ chỉ phương $\\vec{u} = (2; -4; 6)$, mặt phẳng $(P): x - 2y + 3z = 0$. Góc giữa $\\Delta$ và $(P)$ bằng',
      options: ['$90^\\circ$', '$0^\\circ$', '$60^\\circ$', '$30^\\circ$'],
      answer: 0,
      hints: ['So sánh $\\vec{u}$ với vectơ pháp tuyến $(1; -2; 3)$ của $(P)$.'],
      solution:
        '$\\vec{u} = 2(1; -2; 3) = 2\\vec{n}$ nên $\\Delta \\perp (P)$. Kiểm tra bằng công thức: $\\sin = \\dfrac{|2 + 8 + 18|}{\\sqrt{56} \\cdot \\sqrt{14}} = \\dfrac{28}{28} = 1$, góc bằng $90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một mái nhà nằm trong mặt phẳng $(P): x + z - 4 = 0$, mặt đất là mặt phẳng $(Oxy)$. Mái nhà nghiêng bao nhiêu độ so với mặt đất?',
      answer: 45,
      unit: '°',
      hints: ['Góc giữa hai mặt phẳng: dùng hai vectơ pháp tuyến $(1; 0; 1)$ và $(0; 0; 1)$.'],
      solution:
        '$\\cos((P), (Oxy)) = \\dfrac{|0 + 0 + 1|}{\\sqrt{2} \\cdot 1} = \\dfrac{\\sqrt{2}}{2}$, nên mái nghiêng $45^\\circ$.',
    },
  ],
  takeaways: [
    "$\\cos(\\Delta, \\Delta') = \\dfrac{|\\vec{u} \\cdot \\vec{u}'|}{|\\vec{u}| \\cdot |\\vec{u}'|}$.",
    '$\\sin(\\Delta, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$ (chú ý: $\\sin$).',
    "$\\cos((P), (P')) = \\dfrac{|\\vec{n} \\cdot \\vec{n}'|}{|\\vec{n}| \\cdot |\\vec{n}'|}$.",
    'Ba góc này đều nằm trong đoạn $[0^\\circ; 90^\\circ]$, vì thế công thức luôn có dấu giá trị tuyệt đối.',
  ],
};
