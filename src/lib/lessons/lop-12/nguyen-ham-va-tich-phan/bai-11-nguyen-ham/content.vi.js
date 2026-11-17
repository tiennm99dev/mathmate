/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khái niệm nguyên hàm, kí hiệu họ nguyên hàm, hai tính chất cơ bản và bảng nguyên hàm của một số hàm số sơ cấp thường gặp.',
  intro:
    "Ở lớp 11, biết quãng đường $s(t)$ của một vật, em tính được vận tốc $v(t) = s'(t)$. Bài toán ngược cũng rất thường gặp: biết vận tốc $v(t)$, tìm quãng đường $s(t)$. Tìm một hàm số khi biết đạo hàm của nó chính là tìm nguyên hàm.",
  objectives: [
    'Nhận biết khái niệm nguyên hàm của một hàm số và kí hiệu họ nguyên hàm.',
    'Giải thích được vì sao mọi nguyên hàm của một hàm số chỉ khác nhau một hằng số.',
    'Vận dụng các tính chất cơ bản và bảng nguyên hàm của một số hàm số sơ cấp để tìm nguyên hàm.',
    'Tìm nguyên hàm thoả mãn một điều kiện cho trước và giải bài toán thực tiễn đơn giản.',
  ],
  sections: [
    {
      heading: 'Khái niệm nguyên hàm',
      blocks: [
        {
          type: 'p',
          text: 'Trong bài, $K$ là một khoảng, một đoạn hoặc một nửa khoảng của $\\mathbb{R}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho hàm số $f(x)$ xác định trên $K$. Hàm số $F(x)$ được gọi là một nguyên hàm của $f(x)$ trên $K$ nếu $F'(x) = f(x)$ với mọi $x$ thuộc $K$.",
        },
        {
          type: 'p',
          text: "Chẳng hạn $F(x) = x^2$ là một nguyên hàm của $f(x) = 2x$ trên $\\mathbb{R}$ vì $(x^2)' = 2x$. Các hàm số $x^2 + 1$, $x^2 - 5$ cũng là nguyên hàm của $2x$, vì đạo hàm của một hằng số bằng $0$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu $F(x)$ là một nguyên hàm của $f(x)$ trên $K$ thì: a) Với mỗi hằng số $C$, hàm số $F(x) + C$ cũng là một nguyên hàm của $f(x)$ trên $K$. b) Nếu $G(x)$ là một nguyên hàm khác của $f(x)$ trên $K$ thì tồn tại hằng số $C$ sao cho $G(x) = F(x) + C$ với mọi $x$ thuộc $K$.',
        },
        {
          type: 'p',
          text: "Ý b) đúng vì $(G - F)' = f - f = 0$ trên $K$, nên $G - F$ là một hàm hằng. Như vậy, nếu biết một nguyên hàm $F(x)$ thì mọi nguyên hàm của $f(x)$ trên $K$ đều có dạng $F(x) + C$, với $C$ là hằng số. Ta gọi $F(x) + C$, $C \\in \\mathbb{R}$, là họ tất cả các nguyên hàm của $f(x)$ trên $K$, kí hiệu",
        },
        { type: 'tex', tex: '\\int f(x)\\,\\mathrm{d}x = F(x) + C.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: "a) Mọi hàm số liên tục trên $K$ đều có nguyên hàm trên $K$. b) Biểu thức $f(x)\\,\\mathrm{d}x$ gọi là vi phân của nguyên hàm $F(x)$, kí hiệu $\\mathrm{d}F(x)$, tức là $\\mathrm{d}F(x) = F'(x)\\,\\mathrm{d}x = f(x)\\,\\mathrm{d}x$. c) Vì $F(x)$ là một nguyên hàm của $F'(x)$ nên $\\int F'(x)\\,\\mathrm{d}x = F(x) + C$.",
        },
        {
          type: 'p',
          text: 'Về hình học, đồ thị của các hàm số $y = F(x) + C$ nhận được từ đồ thị $y = F(x)$ bằng cách tịnh tiến theo phương thẳng đứng. Tại cùng một hoành độ $x$, các tiếp tuyến của chúng có cùng hệ số góc $f(x)$, nên song song với nhau.',
        },
      ],
    },
    {
      heading: 'Tính chất cơ bản của nguyên hàm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Cho $f(x)$, $g(x)$ là hai hàm số liên tục trên $K$. a) $\\int k f(x)\\,\\mathrm{d}x = k\\int f(x)\\,\\mathrm{d}x$ với $k$ là hằng số khác $0$. b) $\\int [f(x) + g(x)]\\,\\mathrm{d}x = \\int f(x)\\,\\mathrm{d}x + \\int g(x)\\,\\mathrm{d}x$. c) $\\int [f(x) - g(x)]\\,\\mathrm{d}x = \\int f(x)\\,\\mathrm{d}x - \\int g(x)\\,\\mathrm{d}x$.',
        },
        {
          type: 'p',
          text: 'Nhờ các tính chất này, để tìm nguyên hàm của một tổng (hiệu) ta tìm nguyên hàm của từng số hạng, rồi cộng (trừ) các kết quả. Khi cộng, các hằng số tuỳ ý gộp lại thành một hằng số $C$.',
        },
      ],
    },
    {
      heading: 'Nguyên hàm của một số hàm số sơ cấp',
      blocks: [
        {
          type: 'p',
          text: "Mỗi công thức dưới đây được kiểm tra bằng cách lấy đạo hàm vế phải. Chẳng hạn $\\left(\\dfrac{x^{\\alpha + 1}}{\\alpha + 1}\\right)' = x^{\\alpha}$ khi $\\alpha \\ne -1$, và $(\\ln|x|)' = \\dfrac{1}{x}$ với $x \\ne 0$.",
        },
        {
          type: 'table',
          caption: 'Bảng nguyên hàm của một số hàm số sơ cấp',
          head: ['Hàm số', 'Họ nguyên hàm', 'Điều kiện'],
          rows: [
            ['$0$', '$\\int 0\\,\\mathrm{d}x = C$', '$x \\in \\mathbb{R}$'],
            ['$1$', '$\\int \\mathrm{d}x = x + C$', '$x \\in \\mathbb{R}$'],
            [
              '$x^{\\alpha}$',
              '$\\int x^{\\alpha}\\,\\mathrm{d}x = \\dfrac{x^{\\alpha + 1}}{\\alpha + 1} + C$',
              '$\\alpha \\ne -1$',
            ],
            ['$\\dfrac{1}{x}$', '$\\int \\dfrac{1}{x}\\,\\mathrm{d}x = \\ln|x| + C$', '$x \\ne 0$'],
            ['$\\sin x$', '$\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$', '$x \\in \\mathbb{R}$'],
            ['$\\cos x$', '$\\int \\cos x\\,\\mathrm{d}x = \\sin x + C$', '$x \\in \\mathbb{R}$'],
            [
              '$\\dfrac{1}{\\cos^2 x}$',
              '$\\int \\dfrac{1}{\\cos^2 x}\\,\\mathrm{d}x = \\tan x + C$',
              '$\\cos x \\ne 0$',
            ],
            [
              '$\\dfrac{1}{\\sin^2 x}$',
              '$\\int \\dfrac{1}{\\sin^2 x}\\,\\mathrm{d}x = -\\cot x + C$',
              '$\\sin x \\ne 0$',
            ],
            ['$e^x$', '$\\int e^x\\,\\mathrm{d}x = e^x + C$', '$x \\in \\mathbb{R}$'],
            [
              '$a^x$',
              '$\\int a^x\\,\\mathrm{d}x = \\dfrac{a^x}{\\ln a} + C$',
              '$a > 0$, $a \\ne 1$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: "Công thức $\\int x^{\\alpha}\\,\\mathrm{d}x = \\dfrac{x^{\\alpha+1}}{\\alpha+1} + C$ không dùng được khi $\\alpha = -1$ (mẫu bằng $0$); khi đó $\\int x^{-1}\\,\\mathrm{d}x = \\ln|x| + C$. Cũng đừng nhầm dấu: $\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$ vì $(\\cos x)' = -\\sin x$.",
        },
        {
          type: 'p',
          text: 'Để tìm nguyên hàm $F(x)$ thoả mãn một điều kiện như $F(x_0) = y_0$, ta tìm họ nguyên hàm $F(x) + C$ rồi thay $x = x_0$ để tính $C$. Về hình học, đó là chọn trong họ đồ thị đường cong duy nhất đi qua điểm $(x_0; y_0)$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Họ nguyên hàm F(x) + C',
    instruction:
      'Chọn hàm số $f$. Kéo thanh $C$ để tịnh tiến đồ thị $y = F(x) + C$ lên xuống, kéo thanh $x$ để xem các tiếp tuyến tại cùng hoành độ: chúng luôn song song và có hệ số góc bằng $f(x)$. Sau đó tìm $C$ để đồ thị đi qua điểm $M$.',
  },
  examples: [
    {
      problem: 'Tìm $\\int (3x^2 - 4x + 5)\\,\\mathrm{d}x$.',
      steps: [
        'Theo tính chất, $\\int (3x^2 - 4x + 5)\\,\\mathrm{d}x = 3\\int x^2\\,\\mathrm{d}x - 4\\int x\\,\\mathrm{d}x + 5\\int \\mathrm{d}x$.',
        'Dùng $\\int x^{\\alpha}\\,\\mathrm{d}x = \\dfrac{x^{\\alpha+1}}{\\alpha+1} + C$: $3 \\cdot \\dfrac{x^3}{3} - 4 \\cdot \\dfrac{x^2}{2} + 5x + C$.',
        "Kiểm tra: $(x^3 - 2x^2 + 5x)' = 3x^2 - 4x + 5$.",
      ],
      answer: '$\\int (3x^2 - 4x + 5)\\,\\mathrm{d}x = x^3 - 2x^2 + 5x + C$.',
    },
    {
      problem:
        'Tìm $\\int \\left(2\\cos x - \\dfrac{3}{x}\\right)\\mathrm{d}x$ trên khoảng $(0; +\\infty)$.',
      steps: [
        '$\\int \\left(2\\cos x - \\dfrac{3}{x}\\right)\\mathrm{d}x = 2\\int \\cos x\\,\\mathrm{d}x - 3\\int \\dfrac{1}{x}\\,\\mathrm{d}x$.',
        '$= 2\\sin x - 3\\ln|x| + C$.',
        'Trên $(0; +\\infty)$ ta có $|x| = x$.',
      ],
      answer:
        '$\\int \\left(2\\cos x - \\dfrac{3}{x}\\right)\\mathrm{d}x = 2\\sin x - 3\\ln x + C$.',
    },
    {
      problem:
        'Tìm $\\int \\tan^2 x\\,\\mathrm{d}x$ trên khoảng $\\left(-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right)$.',
      steps: [
        'Biến đổi: $\\tan^2 x = \\dfrac{1}{\\cos^2 x} - 1$.',
        '$\\int \\tan^2 x\\,\\mathrm{d}x = \\int \\dfrac{1}{\\cos^2 x}\\,\\mathrm{d}x - \\int \\mathrm{d}x = \\tan x - x + C$.',
      ],
      answer: '$\\int \\tan^2 x\\,\\mathrm{d}x = \\tan x - x + C$.',
    },
    {
      problem: 'Tìm nguyên hàm $F(x)$ của hàm số $f(x) = e^x + 2x$ thoả mãn $F(0) = 3$.',
      steps: [
        '$F(x) = \\int (e^x + 2x)\\,\\mathrm{d}x = e^x + x^2 + C$.',
        '$F(0) = e^0 + 0 + C = 1 + C$.',
        '$F(0) = 3 \\Rightarrow 1 + C = 3 \\Rightarrow C = 2$.',
      ],
      answer: '$F(x) = e^x + x^2 + 2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây là một nguyên hàm của $f(x) = 3x^2$ trên $\\mathbb{R}$?',
      options: ['$x^3 + 5$', '$6x$', '$\\dfrac{x^3}{3}$', '$3x^3$'],
      answer: 0,
      hints: ["Tìm hàm số $F$ có $F'(x) = 3x^2$.", 'Lấy đạo hàm từng phương án.'],
      solution:
        "$(x^3 + 5)' = 3x^2$ nên $x^3 + 5$ là một nguyên hàm của $3x^2$. Còn $6x$ là đạo hàm của $3x^2$; $\\left(\\dfrac{x^3}{3}\\right)' = x^2$; $(3x^3)' = 9x^2$.",
    },
    {
      type: 'choice',
      prompt: 'Tìm $\\int (4x^3 - 2x + 1)\\,\\mathrm{d}x$.',
      options: [
        '$x^4 - x^2 + x + C$',
        '$12x^2 - 2 + C$',
        '$x^4 - 2x^2 + x + C$',
        '$4x^4 - x^2 + x + C$',
      ],
      answer: 0,
      hints: [
        'Tìm nguyên hàm của từng số hạng.',
        '$\\int x^3\\,\\mathrm{d}x = \\dfrac{x^4}{4} + C$.',
      ],
      solution:
        '$\\int (4x^3 - 2x + 1)\\,\\mathrm{d}x = 4 \\cdot \\dfrac{x^4}{4} - 2 \\cdot \\dfrac{x^2}{2} + x + C = x^4 - x^2 + x + C$.',
    },
    {
      type: 'choice',
      prompt: 'Họ nguyên hàm của hàm số $f(x) = \\sin x$ là',
      options: ['$-\\cos x + C$', '$\\cos x + C$', '$-\\sin x + C$', '$\\sin x \\cdot x + C$'],
      answer: 0,
      hints: ["Nhớ lại: $(\\cos x)' = -\\sin x$."],
      solution: "Vì $(-\\cos x)' = \\sin x$ nên $\\int \\sin x\\,\\mathrm{d}x = -\\cos x + C$.",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các công thức đúng.',
      options: [
        '$\\int 2^x\\,\\mathrm{d}x = \\dfrac{2^x}{\\ln 2} + C$',
        '$\\int \\dfrac{1}{\\cos^2 x}\\,\\mathrm{d}x = \\tan x + C$',
        '$\\int \\dfrac{1}{x^2}\\,\\mathrm{d}x = -\\dfrac{1}{x} + C$',
        '$\\int \\cos x\\,\\mathrm{d}x = -\\sin x + C$',
        '$\\int \\dfrac{1}{\\sin^2 x}\\,\\mathrm{d}x = \\cot x + C$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Kiểm tra mỗi công thức bằng cách lấy đạo hàm vế phải.',
        "Chú ý dấu: $(\\cot x)' = -\\dfrac{1}{\\sin^2 x}$.",
      ],
      solution:
        "$\\left(\\dfrac{2^x}{\\ln 2}\\right)' = 2^x$; $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$; $\\left(-\\dfrac{1}{x}\\right)' = \\dfrac{1}{x^2}$. Hai công thức còn lại sai: $\\int \\cos x\\,\\mathrm{d}x = \\sin x + C$ và $\\int \\dfrac{1}{\\sin^2 x}\\,\\mathrm{d}x = -\\cot x + C$.",
    },
    {
      type: 'number',
      prompt: 'Biết $F(x)$ là một nguyên hàm của $f(x) = 2x + 1$ và $F(0) = 3$. Tính $F(2)$.',
      answer: 9,
      hints: ['Họ nguyên hàm: $F(x) = x^2 + x + C$.', 'Dùng $F(0) = 3$ để tìm $C$.'],
      solution: '$F(x) = x^2 + x + C$, $F(0) = C = 3$. Vậy $F(2) = 4 + 2 + 3 = 9$.',
    },
    {
      type: 'number',
      prompt: 'Biết $F(x)$ là một nguyên hàm của $f(x) = e^x$ và $F(0) = 5$. Tính $F(\\ln 3)$.',
      answer: 7,
      hints: ['$F(x) = e^x + C$.', 'Nhớ rằng $e^{\\ln 3} = 3$.'],
      solution: '$F(x) = e^x + C$, $F(0) = 1 + C = 5$ nên $C = 4$. Vậy $F(\\ln 3) = 3 + 4 = 7$.',
    },
    {
      type: 'fraction',
      prompt:
        'Biết $F(x)$ là một nguyên hàm của $f(x) = \\sqrt{x}$ trên $[0; +\\infty)$ và $F(0) = 0$. Tính $F(4)$ (viết dưới dạng phân số tối giản).',
      answer: [16, 3],
      simplest: true,
      hints: [
        'Viết $\\sqrt{x} = x^{\\frac{1}{2}}$.',
        '$\\int x^{\\frac{1}{2}}\\,\\mathrm{d}x = \\dfrac{x^{\\frac{3}{2}}}{\\frac{3}{2}} + C = \\dfrac{2}{3}x\\sqrt{x} + C$.',
      ],
      solution:
        '$F(x) = \\dfrac{2}{3}x\\sqrt{x} + C$, $F(0) = C = 0$. Vậy $F(4) = \\dfrac{2}{3} \\cdot 4 \\cdot 2 = \\dfrac{16}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật chuyển động thẳng với vận tốc $v(t) = 3t^2 + 2$ (m/s), $t$ tính bằng giây. Biết quãng đường $s(t)$ vật đi được thoả mãn $s(0) = 0$. Tính quãng đường vật đi được sau $2$ giây.',
      answer: 12,
      unit: 'm',
      hints: [
        "Quãng đường là một nguyên hàm của vận tốc: $s'(t) = v(t)$.",
        '$s(t) = t^3 + 2t + C$.',
      ],
      solution:
        '$s(t) = \\int (3t^2 + 2)\\,\\mathrm{d}t = t^3 + 2t + C$, $s(0) = 0$ nên $C = 0$. Vậy $s(2) = 8 + 4 = 12$ (m).',
    },
    {
      type: 'choice',
      prompt: 'Tìm $\\int \\dfrac{x^2 + 1}{x^2}\\,\\mathrm{d}x$ trên khoảng $(0; +\\infty)$.',
      options: [
        '$x - \\dfrac{1}{x} + C$',
        '$x + \\dfrac{1}{x} + C$',
        '$x + \\ln x + C$',
        '$\\dfrac{x^3}{3} + x + C$',
      ],
      answer: 0,
      hints: ['Chia tử cho mẫu: $\\dfrac{x^2 + 1}{x^2} = 1 + x^{-2}$.'],
      solution:
        '$\\int (1 + x^{-2})\\,\\mathrm{d}x = x + \\dfrac{x^{-1}}{-1} + C = x - \\dfrac{1}{x} + C$.',
    },
  ],
  takeaways: [
    "$F$ là một nguyên hàm của $f$ trên $K$ khi $F'(x) = f(x)$ với mọi $x \\in K$.",
    'Mọi nguyên hàm của $f$ có dạng $F(x) + C$: $\\int f(x)\\,\\mathrm{d}x = F(x) + C$.',
    'Nguyên hàm của tổng (hiệu) bằng tổng (hiệu) các nguyên hàm; hằng số khác $0$ đưa ra ngoài dấu nguyên hàm được.',
    'Nhớ bảng nguyên hàm cơ bản; với $\\alpha = -1$ dùng $\\int \\dfrac{1}{x}\\,\\mathrm{d}x = \\ln|x| + C$.',
  ],
};
