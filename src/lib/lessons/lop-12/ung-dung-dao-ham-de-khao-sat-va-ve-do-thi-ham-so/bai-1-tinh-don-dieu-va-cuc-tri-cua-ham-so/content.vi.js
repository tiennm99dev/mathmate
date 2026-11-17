/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính đồng biến, nghịch biến của hàm số qua dấu của đạo hàm; điểm cực đại, điểm cực tiểu, giá trị cực trị và quy tắc tìm cực trị bằng bảng biến thiên.',
  intro:
    'Đi trên một con đường đèo, có đoạn ta lên dốc, có đoạn xuống dốc, và có những chỗ là đỉnh đèo hay đáy thung lũng. Đồ thị của một hàm số cũng vậy. Ở lớp 11, em đã biết đạo hàm $f\'(x_0)$ là hệ số góc của tiếp tuyến tại điểm có hoành độ $x_0$. Bài này cho thấy chỉ cần xét dấu của đạo hàm là biết hàm số tăng hay giảm ở đâu, và đạt "đỉnh", "đáy" tại đâu.',
  objectives: [
    'Nhận biết tính đồng biến, nghịch biến của hàm số trên một khoảng qua dấu của đạo hàm.',
    'Lập bảng biến thiên và tìm các khoảng đơn điệu của hàm số.',
    'Nhận biết điểm cực trị, giá trị cực trị của hàm số và tìm chúng bằng bảng biến thiên.',
  ],
  sections: [
    {
      heading: 'Tính đơn điệu của hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho $K$ là một khoảng, một đoạn hoặc một nửa khoảng và $y = f(x)$ là hàm số xác định trên $K$. Hàm số $y = f(x)$ được gọi là đồng biến trên $K$ nếu với mọi $x_1, x_2 \\in K$, $x_1 < x_2$ thì $f(x_1) < f(x_2)$; được gọi là nghịch biến trên $K$ nếu với mọi $x_1, x_2 \\in K$, $x_1 < x_2$ thì $f(x_1) > f(x_2)$.',
        },
        {
          type: 'p',
          text: 'Hàm số đồng biến hay nghịch biến trên $K$ còn được gọi chung là đơn điệu trên $K$. Nhìn từ trái sang phải, đồ thị của hàm số đồng biến là một đường đi lên, của hàm số nghịch biến là một đường đi xuống.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: "Cho hàm số $y = f(x)$ có đạo hàm trên khoảng $K$. a) Nếu $f'(x) > 0$ với mọi $x \\in K$ thì hàm số $f(x)$ đồng biến trên $K$. b) Nếu $f'(x) < 0$ với mọi $x \\in K$ thì hàm số $f(x)$ nghịch biến trên $K$.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: "Nếu $f'(x) \\ge 0$ (hoặc $f'(x) \\le 0$) với mọi $x \\in K$ và $f'(x) = 0$ chỉ tại một số hữu hạn điểm của $K$ thì hàm số đồng biến (hoặc nghịch biến) trên $K$. Chẳng hạn $y = x^3$ có $y' = 3x^2 \\ge 0$, chỉ bằng $0$ tại $x = 0$, nên đồng biến trên $\\mathbb{R}$.",
        },
        {
          type: 'p',
          text: 'Các bước xét tính đơn điệu của hàm số $y = f(x)$:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm tập xác định của hàm số.',
            "Tính đạo hàm $f'(x)$. Tìm các điểm $x_i$ mà tại đó $f'(x) = 0$ hoặc đạo hàm không tồn tại.",
            'Sắp xếp các điểm $x_i$ theo thứ tự tăng dần và lập bảng biến thiên của hàm số.',
            'Nêu kết luận về các khoảng đồng biến, nghịch biến của hàm số.',
          ],
        },
        {
          type: 'table',
          caption: "Xét dấu $y'$ của hàm số $y = x^3 - 3x$, với $y' = 3x^2 - 3 = 3(x - 1)(x + 1)$",
          head: ['$x$', '$(-\\infty; -1)$', '$-1$', '$(-1; 1)$', '$1$', '$(1; +\\infty)$'],
          rows: [
            ["$y'$", '$+$', '$0$', '$-$', '$0$', '$+$'],
            ['$y$', 'đồng biến', '$2$', 'nghịch biến', '$-2$', 'đồng biến'],
          ],
        },
      ],
    },
    {
      heading: 'Cực trị của hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hàm số $y = f(x)$ xác định và liên tục trên khoảng $(a; b)$ (có thể $a$ là $-\\infty$, $b$ là $+\\infty$) và điểm $x_0 \\in (a; b)$. Nếu tồn tại số $h > 0$ sao cho $f(x) < f(x_0)$ với mọi $x \\in (x_0 - h; x_0 + h) \\subset (a; b)$ và $x \\ne x_0$ thì ta nói hàm số $f(x)$ đạt cực đại tại $x_0$. Nếu tồn tại số $h > 0$ sao cho $f(x) > f(x_0)$ với mọi $x \\in (x_0 - h; x_0 + h) \\subset (a; b)$ và $x \\ne x_0$ thì ta nói hàm số $f(x)$ đạt cực tiểu tại $x_0$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu hàm số đạt cực đại (cực tiểu) tại $x_0$ thì $x_0$ gọi là điểm cực đại (điểm cực tiểu) của hàm số; $f(x_0)$ gọi là giá trị cực đại (giá trị cực tiểu) của hàm số, kí hiệu $f_{\\text{CĐ}}$ ($f_{\\text{CT}}$) hay $y_{\\text{CĐ}}$ ($y_{\\text{CT}}$); điểm $M(x_0; f(x_0))$ gọi là điểm cực đại (điểm cực tiểu) của đồ thị hàm số. Điểm cực đại và điểm cực tiểu gọi chung là điểm cực trị; giá trị cực đại và giá trị cực tiểu gọi chung là cực trị của hàm số.',
        },
        {
          type: 'p',
          text: 'Cực đại, cực tiểu chỉ so sánh $f(x_0)$ với các giá trị của $f$ ở gần $x_0$. Vì vậy một hàm số có thể có giá trị cực đại nhỏ hơn giá trị cực tiểu, như $y = x + \\dfrac{4}{x}$ có $y_{\\text{CĐ}} = -4 < y_{\\text{CT}} = 4$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: "Giả sử hàm số $y = f(x)$ liên tục trên khoảng $(a; b)$ chứa điểm $x_0$ và có đạo hàm trên các khoảng $(a; x_0)$ và $(x_0; b)$. Khi đó: a) Nếu $f'(x) < 0$ với mọi $x \\in (a; x_0)$ và $f'(x) > 0$ với mọi $x \\in (x_0; b)$ thì $x_0$ là một điểm cực tiểu của hàm số $f(x)$. b) Nếu $f'(x) > 0$ với mọi $x \\in (a; x_0)$ và $f'(x) < 0$ với mọi $x \\in (x_0; b)$ thì $x_0$ là một điểm cực đại của hàm số $f(x)$.",
        },
        {
          type: 'p',
          text: "Nói gọn: $f'(x)$ đổi dấu từ dương sang âm khi $x$ đi qua $x_0$ thì $x_0$ là điểm cực đại; đổi dấu từ âm sang dương thì $x_0$ là điểm cực tiểu.",
        },
        {
          type: 'p',
          text: 'Các bước tìm cực trị của hàm số $y = f(x)$:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm tập xác định của hàm số.',
            "Tính đạo hàm $f'(x)$. Tìm các điểm mà tại đó đạo hàm $f'(x)$ bằng $0$ hoặc đạo hàm không tồn tại.",
            'Lập bảng biến thiên của hàm số.',
            'Từ bảng biến thiên suy ra các cực trị của hàm số.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: "$f'(x_0) = 0$ chưa đủ để $x_0$ là điểm cực trị: $y = x^3$ có $y'(0) = 0$ nhưng $y'$ không đổi dấu khi đi qua $0$, nên hàm số không có cực trị. Ngược lại, hàm số có thể đạt cực trị tại điểm mà đạo hàm không tồn tại: $y = |x|$ đạt cực tiểu tại $x = 0$.",
        },
      ],
    },
  ],
  explore: {
    title: 'Dấu của f′ và hình dạng của đồ thị f',
    instruction:
      "Chọn một hàm số rồi kéo điểm $M$ dọc theo đồ thị của $f$ (hoặc dùng phím mũi tên). Quan sát dấu của $f'(x)$ ở đồ thị bên dưới và tiếp tuyến tại $M$. Dừng $M$ tại các điểm mà $f'(x) = 0$ để xem đó có phải điểm cực trị hay không.",
  },
  examples: [
    {
      problem: 'Tìm các khoảng đơn điệu và cực trị của hàm số $y = -x^3 + 3x^2 + 1$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R}$.',
        "$y' = -3x^2 + 6x = -3x(x - 2)$; $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.",
        "Xét dấu: $y' < 0$ trên $(-\\infty; 0)$ và $(2; +\\infty)$; $y' > 0$ trên $(0; 2)$.",
        'Hàm số nghịch biến trên các khoảng $(-\\infty; 0)$ và $(2; +\\infty)$, đồng biến trên khoảng $(0; 2)$.',
        "$y'$ đổi dấu từ âm sang dương khi đi qua $x = 0$: hàm số đạt cực tiểu tại $x = 0$, $y_{\\text{CT}} = y(0) = 1$.",
        "$y'$ đổi dấu từ dương sang âm khi đi qua $x = 2$: hàm số đạt cực đại tại $x = 2$, $y_{\\text{CĐ}} = y(2) = -8 + 12 + 1 = 5$.",
      ],
      answer:
        'Nghịch biến trên $(-\\infty; 0)$ và $(2; +\\infty)$, đồng biến trên $(0; 2)$; $y_{\\text{CT}} = 1$ tại $x = 0$, $y_{\\text{CĐ}} = 5$ tại $x = 2$.',
    },
    {
      problem: 'Tìm cực trị của hàm số $y = \\dfrac{x^2 - 2x + 2}{x - 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$.',
        "$y' = \\dfrac{(2x - 2)(x - 1) - (x^2 - 2x + 2)}{(x - 1)^2} = \\dfrac{x^2 - 2x}{(x - 1)^2}$; $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.",
        "Mẫu $(x - 1)^2 > 0$ nên dấu của $y'$ là dấu của $x(x - 2)$: $y' > 0$ trên $(-\\infty; 0)$ và $(2; +\\infty)$, $y' < 0$ trên $(0; 1)$ và $(1; 2)$.",
        'Hàm số đạt cực đại tại $x = 0$, $y_{\\text{CĐ}} = y(0) = \\dfrac{2}{-1} = -2$.',
        'Hàm số đạt cực tiểu tại $x = 2$, $y_{\\text{CT}} = y(2) = \\dfrac{4 - 4 + 2}{1} = 2$.',
      ],
      answer: '$y_{\\text{CĐ}} = -2$ tại $x = 0$; $y_{\\text{CT}} = 2$ tại $x = 2$.',
    },
    {
      problem: 'Tìm $m$ để hàm số $y = x^3 - 3x^2 + mx + 2$ đồng biến trên $\\mathbb{R}$.',
      steps: [
        "$y' = 3x^2 - 6x + m$, là tam thức bậc hai có hệ số $a = 3 > 0$.",
        "Hàm số đồng biến trên $\\mathbb{R}$ khi $y' \\ge 0$ với mọi $x$ (và $y' = 0$ chỉ tại hữu hạn điểm), tức là $\\Delta' = 9 - 3m \\le 0$.",
        "$9 - 3m \\le 0 \\Leftrightarrow m \\ge 3$. Khi $m = 3$, $y' = 3(x - 1)^2$ chỉ bằng $0$ tại $x = 1$, nên vẫn thoả mãn.",
      ],
      answer: '$m \\ge 3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số $y = x^3 - 3x + 2$ nghịch biến trên khoảng nào?',
      options: ['$(-1; 1)$', '$(-\\infty; -1)$', '$(1; +\\infty)$', '$(-\\infty; +\\infty)$'],
      answer: 0,
      hints: ["Tính $y'$ rồi giải $y' < 0$.", "$y' = 3x^2 - 3 = 3(x - 1)(x + 1)$."],
      solution:
        "$y' = 3(x - 1)(x + 1) < 0 \\Leftrightarrow -1 < x < 1$. Hàm số nghịch biến trên khoảng $(-1; 1)$.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị cực đại $y_{\\text{CĐ}}$ của hàm số $y = x^3 - 6x^2 + 9x + 1$.',
      answer: 5,
      hints: [
        "$y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$.",
        "$y'$ đổi dấu từ dương sang âm tại điểm cực đại.",
      ],
      solution:
        "$y' = 3(x - 1)(x - 3)$; $y' > 0$ trên $(-\\infty; 1)$, $y' < 0$ trên $(1; 3)$, $y' > 0$ trên $(3; +\\infty)$. Hàm số đạt cực đại tại $x = 1$, $y_{\\text{CĐ}} = 1 - 6 + 9 + 1 = 5$ (và cực tiểu tại $x = 3$, $y_{\\text{CT}} = 1$).",
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng về hàm số $y = \\dfrac{x - 1}{x + 2}$?',
      options: [
        'Hàm số đồng biến trên mỗi khoảng $(-\\infty; -2)$ và $(-2; +\\infty)$.',
        'Hàm số đồng biến trên $\\mathbb{R}$.',
        'Hàm số nghịch biến trên mỗi khoảng $(-\\infty; -2)$ và $(-2; +\\infty)$.',
        'Hàm số có một điểm cực trị.',
      ],
      answer: 0,
      hints: [
        'Tập xác định là $\\mathbb{R} \\setminus \\{-2\\}$, không phải một khoảng.',
        "Tính $y' = \\dfrac{1 \\cdot 2 - (-1) \\cdot 1}{(x + 2)^2}$.",
      ],
      solution:
        '$y\' = \\dfrac{3}{(x + 2)^2} > 0$ với mọi $x \\ne -2$. Hàm số đồng biến trên mỗi khoảng $(-\\infty; -2)$ và $(-2; +\\infty)$; không nói được "đồng biến trên $\\mathbb{R}$" vì hàm số không xác định tại $-2$, và $y\'$ không đổi dấu nên không có cực trị.',
    },
    {
      type: 'number',
      prompt:
        "Hàm số $y = f(x)$ có đạo hàm $f'(x) = x^2(x - 1)(x + 2)$ với mọi $x \\in \\mathbb{R}$. Hàm số có bao nhiêu điểm cực trị?",
      answer: 2,
      hints: [
        "$f'(x) = 0$ tại $x = -2$, $x = 0$, $x = 1$. Xét dấu $f'$ trên từng khoảng.",
        'Thừa số $x^2$ không đổi dấu khi $x$ đi qua $0$.',
      ],
      solution:
        "$f' > 0$ trên $(-\\infty; -2)$, $f' < 0$ trên $(-2; 0)$ và $(0; 1)$, $f' > 0$ trên $(1; +\\infty)$. $f'$ đổi dấu tại $x = -2$ (cực đại) và $x = 1$ (cực tiểu), không đổi dấu tại $x = 0$. Vậy hàm số có $2$ điểm cực trị.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị cực tiểu $y_{\\text{CT}}$ của hàm số $y = x^4 - 8x^2 + 3$.',
      answer: -13,
      hints: ["$y' = 4x^3 - 16x = 4x(x - 2)(x + 2)$.", 'Hàm số đạt cực tiểu tại $x = \\pm 2$.'],
      solution:
        "$y' = 4x(x - 2)(x + 2)$: âm trên $(-\\infty; -2)$, dương trên $(-2; 0)$, âm trên $(0; 2)$, dương trên $(2; +\\infty)$. Hàm số đạt cực tiểu tại $x = \\pm 2$ với $y_{\\text{CT}} = 16 - 32 + 3 = -13$, đạt cực đại tại $x = 0$ với $y_{\\text{CĐ}} = 3$.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị cực đại $y_{\\text{CĐ}}$ của hàm số $y = x + \\dfrac{4}{x}$.',
      answer: -4,
      hints: [
        "$y' = 1 - \\dfrac{4}{x^2} = \\dfrac{x^2 - 4}{x^2}$, với $x \\ne 0$.",
        "Xem $y'$ đổi dấu từ dương sang âm tại $x = 2$ hay $x = -2$.",
      ],
      solution:
        "$y' = \\dfrac{x^2 - 4}{x^2}$: dương trên $(-\\infty; -2)$, âm trên $(-2; 0)$ và $(0; 2)$, dương trên $(2; +\\infty)$. Hàm số đạt cực đại tại $x = -2$: $y_{\\text{CĐ}} = -2 + \\dfrac{4}{-2} = -4$ (cực tiểu tại $x = 2$, $y_{\\text{CT}} = 4$).",
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = \\sqrt{2x - x^2}$ đồng biến trên khoảng nào?',
      options: ['$(0; 1)$', '$(1; 2)$', '$(-\\infty; 1)$', '$(0; 2)$'],
      answer: 0,
      hints: [
        'Tập xác định: $2x - x^2 \\ge 0 \\Leftrightarrow 0 \\le x \\le 2$.',
        "$y' = \\dfrac{2 - 2x}{2\\sqrt{2x - x^2}} = \\dfrac{1 - x}{\\sqrt{2x - x^2}}$ trên $(0; 2)$.",
      ],
      solution:
        "Tập xác định $D = [0; 2]$. Trên $(0; 2)$: $y' = \\dfrac{1 - x}{\\sqrt{2x - x^2}}$, dương khi $0 < x < 1$ và âm khi $1 < x < 2$. Hàm số đồng biến trên $(0; 1)$ và nghịch biến trên $(1; 2)$.",
    },
    {
      type: 'choice',
      prompt:
        'Tìm tất cả các giá trị của $m$ để hàm số $y = x^3 + 3x^2 + mx + 1$ đồng biến trên $\\mathbb{R}$.',
      options: ['$m \\ge 3$', '$m > 3$', '$m \\le 3$', '$m \\ge -3$'],
      answer: 0,
      hints: [
        "$y' = 3x^2 + 6x + m$. Cần $y' \\ge 0$ với mọi $x$.",
        "Tam thức có $a = 3 > 0$ nên điều kiện là $\\Delta' \\le 0$.",
      ],
      solution:
        "$\\Delta' = 9 - 3m \\le 0 \\Leftrightarrow m \\ge 3$. Khi $m = 3$, $y' = 3(x + 1)^2 \\ge 0$ và chỉ bằng $0$ tại $x = -1$, nên hàm số vẫn đồng biến trên $\\mathbb{R}$. Vậy $m \\ge 3$.",
    },
  ],
  takeaways: [
    "$f'(x) > 0$ trên khoảng $K$ thì $f$ đồng biến trên $K$; $f'(x) < 0$ trên $K$ thì $f$ nghịch biến trên $K$.",
    "Vẫn đúng khi $f'(x) \\ge 0$ (hoặc $\\le 0$) trên $K$ và chỉ bằng $0$ tại hữu hạn điểm.",
    "$f'$ đổi dấu từ $+$ sang $-$ qua $x_0$: cực đại; từ $-$ sang $+$: cực tiểu; không đổi dấu: không có cực trị tại $x_0$.",
    'Tìm khoảng đơn điệu và cực trị: tập xác định, đạo hàm và các điểm mà đạo hàm bằng $0$ hoặc không tồn tại, bảng biến thiên, kết luận.',
  ],
};
