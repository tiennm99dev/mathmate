/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương IV: nguyên hàm, tích phân và công thức Newton – Leibniz, diện tích hình phẳng, thể tích vật thể và khối tròn xoay; kèm trò chọn tích phân cho miền tô màu và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương IV đi từ bài toán ngược của đạo hàm (tìm nguyên hàm) tới tích phân, rồi dùng tích phân để đo diện tích các hình có cạnh cong và thể tích các vật thể. Bài ôn tập này hệ thống lại các công thức, cho em luyện chọn đúng tích phân cho một miền phẳng tô màu và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá khái niệm, tính chất và bảng nguyên hàm của các hàm số sơ cấp.',
    'Tính tích phân bằng công thức Newton – Leibniz và các tính chất của tích phân.',
    'Thiết lập và tính tích phân cho diện tích hình phẳng, thể tích vật thể và khối tròn xoay.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Kết quả chính'],
          rows: [
            [
              'Nguyên hàm',
              "$F'(x) = f(x)$ trên $K$; mọi nguyên hàm có dạng $F(x) + C$: $\\int f(x)\\,\\mathrm{d}x = F(x) + C$",
            ],
            [
              'Tính chất của nguyên hàm',
              '$\\int k f(x)\\,\\mathrm{d}x = k\\int f(x)\\,\\mathrm{d}x$ ($k \\ne 0$); $\\int [f(x) \\pm g(x)]\\,\\mathrm{d}x = \\int f(x)\\,\\mathrm{d}x \\pm \\int g(x)\\,\\mathrm{d}x$',
            ],
            [
              'Nguyên hàm cơ bản',
              '$\\int x^{\\alpha}\\,\\mathrm{d}x = \\dfrac{x^{\\alpha+1}}{\\alpha+1} + C$ ($\\alpha \\ne -1$); $\\int \\dfrac{\\mathrm{d}x}{x} = \\ln|x| + C$; $\\int e^x\\,\\mathrm{d}x = e^x + C$; $\\int a^x\\,\\mathrm{d}x = \\dfrac{a^x}{\\ln a} + C$; $\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$; $\\int \\cos x\\,\\mathrm{d}x = \\sin x + C$',
            ],
            [
              'Tích phân',
              '$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(x)\\Big|_a^b = F(b) - F(a)$',
            ],
            [
              'Tính chất của tích phân',
              '$\\displaystyle\\int_a^b = -\\int_b^a$; tuyến tính; $\\displaystyle\\int_a^b = \\int_a^c + \\int_c^b$',
            ],
            [
              'Diện tích hình phẳng',
              '$S = \\displaystyle\\int_a^b |f(x)|\\,\\mathrm{d}x$ hoặc $S = \\displaystyle\\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x$',
            ],
            ['Thể tích vật thể', '$V = \\displaystyle\\int_a^b S(x)\\,\\mathrm{d}x$'],
            [
              'Khối tròn xoay quanh $Ox$',
              '$V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'Quên hằng số $C$ khi tìm họ nguyên hàm; nhầm dấu $\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$; dùng công thức $\\dfrac{x^{\\alpha+1}}{\\alpha+1}$ khi $\\alpha = -1$; tính diện tích bằng $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ khi $f$ đổi dấu; quên $\\pi$ hoặc quên bình phương trong công thức thể tích khối tròn xoay.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi câu thuộc một kĩ năng của chương. Trả lời sai lần đầu, em được gợi ý và làm lại; bản đồ kĩ năng tô màu theo kết quả lần đầu và chỉ ra phần cần ôn thêm. Đáp số có thể là số nguyên hoặc phân số, ví dụ $\\dfrac{4}{3}$ nhập là 4/3.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Chọn tích phân cho miền tô màu',
    instruction:
      'Quan sát miền tô màu xanh và chọn tích phân cho đúng diện tích của nó, rồi tính diện tích đó. Chú ý phần nằm dưới trục hoành và đường nào nằm trên trong mỗi đoạn.',
  },
  examples: [
    {
      problem: 'Tìm nguyên hàm $F(x)$ của $f(x) = \\cos x - 2\\sin x$ thoả mãn $F(0) = 1$.',
      steps: [
        '$F(x) = \\int (\\cos x - 2\\sin x)\\,\\mathrm{d}x = \\sin x + 2\\cos x + C$.',
        '$F(0) = 0 + 2 + C = 1 \\Rightarrow C = -1$.',
      ],
      answer: '$F(x) = \\sin x + 2\\cos x - 1$.',
    },
    {
      problem: 'Tính diện tích hình phẳng giới hạn bởi đồ thị $y = x^3 - x$ và trục hoành.',
      steps: [
        '$x^3 - x = 0 \\iff x = -1$, $x = 0$ hoặc $x = 1$.',
        '$S = \\left|\\displaystyle\\int_{-1}^{0} (x^3 - x)\\,\\mathrm{d}x\\right| + \\left|\\displaystyle\\int_0^1 (x^3 - x)\\,\\mathrm{d}x\\right|$.',
        'Với $F(x) = \\dfrac{x^4}{4} - \\dfrac{x^2}{2}$: $\\displaystyle\\int_{-1}^{0} = F(0) - F(-1) = \\dfrac{1}{4}$, $\\displaystyle\\int_0^1 = F(1) - F(0) = -\\dfrac{1}{4}$.',
        '$S = \\dfrac{1}{4} + \\dfrac{1}{4} = \\dfrac{1}{2}$.',
      ],
      answer: '$S = \\dfrac{1}{2}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số $F(x) = e^x + x^2$ là một nguyên hàm của hàm số nào?',
      options: ['$e^x + 2x$', '$e^x + \\dfrac{x^3}{3}$', '$e^x + x$', '$xe^{x-1} + 2x$'],
      answer: 0,
      hints: ["Tính $F'(x)$."],
      solution: "$F'(x) = e^x + 2x$, nên $F$ là một nguyên hàm của $e^x + 2x$.",
    },
    {
      type: 'choice',
      prompt:
        'Trên khoảng $(0; +\\infty)$, $\\int \\left(2^x + \\dfrac{1}{x}\\right)\\mathrm{d}x$ bằng',
      options: [
        '$\\dfrac{2^x}{\\ln 2} + \\ln x + C$',
        '$2^x\\ln 2 + \\ln x + C$',
        '$\\dfrac{2^{x+1}}{x+1} + \\ln x + C$',
        '$\\dfrac{2^x}{\\ln 2} - \\dfrac{1}{x^2} + C$',
      ],
      answer: 0,
      hints: ['$\\int a^x\\,\\mathrm{d}x = \\dfrac{a^x}{\\ln a} + C$.'],
      solution:
        '$\\int 2^x\\,\\mathrm{d}x = \\dfrac{2^x}{\\ln 2} + C$ và $\\int \\dfrac{1}{x}\\,\\mathrm{d}x = \\ln x + C$ khi $x > 0$.',
    },
    {
      type: 'number',
      prompt: 'Biết $F(x)$ là một nguyên hàm của $f(x) = 4x^3 - 2x$ và $F(1) = 2$. Tính $F(2)$.',
      answer: 14,
      hints: ['$F(x) = x^4 - x^2 + C$.', 'Dùng $F(1) = 2$ để tìm $C$.'],
      solution: '$F(x) = x^4 - x^2 + C$, $F(1) = C = 2$. Vậy $F(2) = 16 - 4 + 2 = 14$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,\\mathrm{d}x$.',
      answer: 6,
      hints: ['Một nguyên hàm: $x^3 - x^2 + x$.'],
      solution:
        '$\\displaystyle\\int_0^2 (3x^2 - 2x + 1)\\,\\mathrm{d}x = (x^3 - x^2 + x)\\Big|_0^2 = 8 - 4 + 2 = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_0^{\\frac{\\pi}{2}} (\\sin x + \\cos x)\\,\\mathrm{d}x$.',
      answer: 2,
      hints: ['Một nguyên hàm: $-\\cos x + \\sin x$.'],
      solution: '$(-\\cos x + \\sin x)\\Big|_0^{\\frac{\\pi}{2}} = (0 + 1) - (-1 + 0) = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $\\displaystyle\\int_1^4 f(x)\\,\\mathrm{d}x = 7$ và $\\displaystyle\\int_1^4 g(x)\\,\\mathrm{d}x = 2$. Tính $\\displaystyle\\int_1^4 [f(x) - 2g(x) + 1]\\,\\mathrm{d}x$.',
      answer: 6,
      hints: ['$\\displaystyle\\int_1^4 1\\,\\mathrm{d}x = 4 - 1 = 3$.'],
      solution:
        '$\\displaystyle\\int_1^4 [f(x) - 2g(x) + 1]\\,\\mathrm{d}x = 7 - 2 \\cdot 2 + 3 = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $\\displaystyle\\int_0^3 f(x)\\,\\mathrm{d}x = 4$ và $\\displaystyle\\int_2^3 f(x)\\,\\mathrm{d}x = 1$. Tính $\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x$.',
      answer: 3,
      hints: ['$\\displaystyle\\int_0^3 = \\int_0^2 + \\int_2^3$.'],
      solution: '$\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x = 4 - 1 = 3$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\displaystyle\\int_1^2 \\dfrac{1}{x^2}\\,\\mathrm{d}x$ (phân số tối giản).',
      answer: [1, 2],
      simplest: true,
      hints: ['$\\int x^{-2}\\,\\mathrm{d}x = -\\dfrac{1}{x} + C$.'],
      solution:
        '$\\displaystyle\\int_1^2 \\dfrac{1}{x^2}\\,\\mathrm{d}x = -\\dfrac{1}{x}\\Big|_1^2 = -\\dfrac{1}{2} + 1 = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2 - 2x$ và trục hoành (phân số tối giản).',
      answer: [4, 3],
      simplest: true,
      hints: [
        'Parabol cắt trục hoành tại $x = 0$ và $x = 2$.',
        'Trên $[0; 2]$ parabol nằm dưới trục hoành.',
      ],
      solution:
        '$S = \\displaystyle\\int_0^2 (2x - x^2)\\,\\mathrm{d}x = \\left(x^2 - \\dfrac{x^3}{3}\\right)\\Big|_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình phẳng giới hạn bởi hai đường $y = x^3$ và $y = x$.',
      answer: 0.5,
      hints: [
        'Giao điểm: $x^3 = x \\iff x \\in \\{-1; 0; 1\\}$.',
        'Hình đối xứng qua gốc toạ độ: $S = 2\\displaystyle\\int_0^1 (x - x^3)\\,\\mathrm{d}x$.',
      ],
      solution:
        '$S = \\displaystyle\\int_{-1}^{0} (x^3 - x)\\,\\mathrm{d}x + \\int_0^1 (x - x^3)\\,\\mathrm{d}x = \\dfrac{1}{4} + \\dfrac{1}{4} = 0{,}5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Quay hình phẳng giới hạn bởi parabol $y = x^2$, trục hoành và đường thẳng $x = 1$ quanh trục $Ox$. Thể tích khối tròn xoay là $V = k\\pi$. Tìm $k$ (phân số tối giản).',
      answer: [1, 5],
      simplest: true,
      hints: ['$V = \\pi\\displaystyle\\int_0^1 (x^2)^2\\,\\mathrm{d}x$.'],
      solution:
        '$V = \\pi\\displaystyle\\int_0^1 x^4\\,\\mathrm{d}x = \\pi\\dfrac{x^5}{5}\\Big|_0^1 = \\dfrac{\\pi}{5}$, nên $k = \\dfrac{1}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi đồ thị $y = e^x$, trục hoành và hai đường thẳng $x = 0$, $x = 1$ quanh trục $Ox$ (làm tròn đến hàng phần trăm).',
      answer: 10.04,
      tolerance: 0.005,
      hints: ['$(e^x)^2 = e^{2x}$, và $\\int e^{2x}\\,\\mathrm{d}x = \\dfrac{e^{2x}}{2} + C$.'],
      solution:
        '$V = \\pi\\displaystyle\\int_0^1 e^{2x}\\,\\mathrm{d}x = \\pi\\dfrac{e^{2x}}{2}\\Big|_0^1 = \\dfrac{\\pi(e^2 - 1)}{2} \\approx 10{,}04$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật chuyển động với vận tốc $v(t) = 3t^2$ (m/s). Tính quãng đường vật đi được trong khoảng thời gian từ $t = 1$ s đến $t = 3$ s.',
      answer: 26,
      unit: 'm',
      hints: ['$s = \\displaystyle\\int_1^3 v(t)\\,\\mathrm{d}t$.'],
      solution:
        '$s = \\displaystyle\\int_1^3 3t^2\\,\\mathrm{d}t = t^3\\Big|_1^3 = 27 - 1 = 26$ (m).',
    },
  ],
  takeaways: [
    'Tìm nguyên hàm bằng bảng nguyên hàm và tính chất tuyến tính; đừng quên hằng số $C$.',
    'Tích phân $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$ không phụ thuộc cách chọn nguyên hàm.',
    'Diện tích luôn dùng giá trị tuyệt đối: tách đoạn tại các giao điểm.',
    'Thể tích: $V = \\displaystyle\\int_a^b S(x)\\,\\mathrm{d}x$; khối tròn xoay $V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$.',
  ],
};
