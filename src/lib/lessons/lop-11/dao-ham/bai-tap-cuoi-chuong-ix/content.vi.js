/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương IX: định nghĩa và ý nghĩa của đạo hàm, các quy tắc tính đạo hàm, đạo hàm cấp hai và phương trình tiếp tuyến, kèm đồ thị kiểm tra tiếp tuyến em viết và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương IX đưa ra khái niệm đạo hàm, giới hạn của tỉ số $\\dfrac{\\Delta y}{\\Delta x}$, cùng hai ý nghĩa của nó: hệ số góc của tiếp tuyến và vận tốc tức thời. Sau đó là bảng đạo hàm, các quy tắc tính và đạo hàm cấp hai với ý nghĩa gia tốc. Bài ôn tập này hệ thống lại kiến thức, cho em kiểm tra phương trình tiếp tuyến trên đồ thị và luyện tập với một bộ đề tự sinh.',
  objectives: [
    'Hệ thống hoá định nghĩa, ý nghĩa hình học và ý nghĩa vật lí của đạo hàm.',
    'Tính thành thạo đạo hàm bằng bảng đạo hàm và các quy tắc tổng, hiệu, tích, thương, hàm hợp; tính đạo hàm cấp hai.',
    'Viết phương trình tiếp tuyến của đồ thị hàm số; tính vận tốc và gia tốc tức thời của chuyển động.',
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
              'Đạo hàm tại $x_0$',
              "$f'(x_0) = \\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0} = \\lim\\limits_{\\Delta x \\to 0} \\dfrac{\\Delta y}{\\Delta x}$",
            ],
            [
              'Tiếp tuyến tại $M_0(x_0; y_0)$',
              "Hệ số góc $k = f'(x_0)$; phương trình $y - y_0 = f'(x_0)(x - x_0)$",
            ],
            ['Ý nghĩa vật lí', "$v(t) = s'(t)$, $a(t) = v'(t) = s''(t)$"],
            [
              'Hàm số sơ cấp cơ bản',
              "$(x^n)' = nx^{n-1}$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(\\tan x)' = \\dfrac{1}{\\cos^2 x}$, $(\\cot x)' = -\\dfrac{1}{\\sin^2 x}$",
            ],
            [
              'Hàm số mũ, logarit',
              "$(e^x)' = e^x$, $(a^x)' = a^x \\ln a$, $(\\ln x)' = \\dfrac{1}{x}$, $(\\log_a x)' = \\dfrac{1}{x \\ln a}$",
            ],
            [
              'Quy tắc',
              "$(u \\pm v)' = u' \\pm v'$, $(uv)' = u'v + uv'$, $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$",
            ],
            ['Hàm hợp', "$y'_x = y'_u \\cdot u'_x$, ví dụ $(u^n)' = nu^{n-1}u'$, $(e^u)' = u'e^u$"],
            ['Đạo hàm cấp hai', "$y'' = (y')'$"],
          ],
        },
        {
          type: 'list',
          items: [
            "Viết tiếp tuyến tại điểm có hoành độ $x_0$: tính $y_0 = f(x_0)$ và $f'(x_0)$, thay vào $y - y_0 = f'(x_0)(x - x_0)$.",
            "Tiếp tuyến có hệ số góc $k$ cho trước: giải phương trình $f'(x_0) = k$ để tìm hoành độ tiếp điểm, rồi viết như trên.",
            'Chuyển động $s = s(t)$: lấy đạo hàm một lần được vận tốc, hai lần được gia tốc; vật dừng khi $v = 0$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: "Viết $(uv)' = u'v'$ hoặc $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'}{v'}$; quên nhân $u'$ khi tính đạo hàm hàm hợp (như $(\\sin 2x)' = \\cos 2x$ là sai); dùng $(x^n)' = nx^{n-1}$ cho hàm số mũ $2^x$; viết tiếp tuyến với $f'(x)$ chưa thay $x = x_0$.",
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt gồm các câu hỏi mới về định nghĩa và ý nghĩa của đạo hàm, các quy tắc tính đạo hàm, đạo hàm cấp hai và phương trình tiếp tuyến. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Kiểm tra tiếp tuyến trên đồ thị',
    instruction:
      'Chọn một câu, tự viết phương trình tiếp tuyến tại điểm có hoành độ $x_0$ dưới dạng $y = kx + b$ rồi nhập $k$ và $b$. Đường thẳng của em hiện lên cùng đồ thị: tiếp tuyến đúng chạm đồ thị tại tiếp điểm và "ôm" sát đồ thị ở gần đó; nếu sai, nhận xét cho biết em sai hệ số góc hay sai tung độ gốc.',
  },
  examples: [
    {
      problem: 'Dùng định nghĩa, tính đạo hàm của hàm số $f(x) = x^2 - 3x$ tại $x_0 = 2$.',
      steps: [
        '$f(x) - f(2) = x^2 - 3x + 2 = (x - 1)(x - 2)$.',
        'Với $x \\ne 2$: $\\dfrac{f(x) - f(2)}{x - 2} = x - 1$.',
        "$f'(2) = \\lim\\limits_{x \\to 2} (x - 1) = 1$.",
      ],
      answer: "$f'(2) = 1$.",
    },
    {
      problem: 'Tính đạo hàm của hàm số $y = \\left(x^2 + 1\\right)\\sqrt{x}$.',
      steps: [
        "Quy tắc tích: $y' = \\left(x^2 + 1\\right)'\\sqrt{x} + \\left(x^2 + 1\\right)(\\sqrt{x})' = 2x\\sqrt{x} + \\dfrac{x^2 + 1}{2\\sqrt{x}}$.",
        "Quy đồng: $y' = \\dfrac{4x^2 + x^2 + 1}{2\\sqrt{x}} = \\dfrac{5x^2 + 1}{2\\sqrt{x}}$ với $x > 0$.",
      ],
      answer: "$y' = \\dfrac{5x^2 + 1}{2\\sqrt{x}}$.",
    },
    {
      problem:
        'Cho hàm số $y = x^3 - 3x^2 + 2$ có đồ thị $(C)$. Viết phương trình tiếp tuyến của $(C)$ có hệ số góc bằng $9$.',
      steps: [
        "$y' = 3x^2 - 6x$. Hoành độ tiếp điểm thoả mãn $3x_0^2 - 6x_0 = 9 \\iff x_0^2 - 2x_0 - 3 = 0 \\iff x_0 = -1$ hoặc $x_0 = 3$.",
        'Với $x_0 = -1$: $y_0 = -1 - 3 + 2 = -2$, tiếp tuyến $y + 2 = 9(x + 1)$, tức là $y = 9x + 7$.',
        'Với $x_0 = 3$: $y_0 = 27 - 27 + 2 = 2$, tiếp tuyến $y - 2 = 9(x - 3)$, tức là $y = 9x - 25$.',
      ],
      answer: 'Hai tiếp tuyến: $y = 9x + 7$ và $y = 9x - 25$.',
    },
    {
      problem:
        'Một vật chuyển động có phương trình $s(t) = t^3 - 6t^2 + 9t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tìm gia tốc của vật tại các thời điểm vận tốc bằng $0$.',
      steps: [
        "$v(t) = s'(t) = 3t^2 - 12t + 9$; $v(t) = 0 \\iff t^2 - 4t + 3 = 0 \\iff t = 1$ hoặc $t = 3$.",
        "$a(t) = s''(t) = 6t - 12$.",
        '$a(1) = -6$ m/s² và $a(3) = 6$ m/s².',
      ],
      answer: 'Tại $t = 1$: $a = -6$ m/s²; tại $t = 3$: $a = 6$ m/s².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Dùng định nghĩa, tính đạo hàm của hàm số $f(x) = 2x^2 - 3x$ tại $x_0 = 1$.',
      answer: 1,
      hints: [
        'Tính $f(x) - f(1) = 2x^2 - 3x + 1$ rồi phân tích thành nhân tử.',
        '$2x^2 - 3x + 1 = (x - 1)(2x - 1)$.',
      ],
      solution:
        "$\\dfrac{f(x) - f(1)}{x - 1} = \\dfrac{(x - 1)(2x - 1)}{x - 1} = 2x - 1$ với $x \\ne 1$, nên $f'(1) = \\lim\\limits_{x \\to 1} (2x - 1) = 1$.",
    },
    {
      type: 'choice',
      prompt: 'Đạo hàm của hàm số $y = \\dfrac{x^2 + 1}{x - 1}$ là',
      options: [
        "$y' = \\dfrac{x^2 - 2x - 1}{(x - 1)^2}$",
        "$y' = \\dfrac{x^2 - 2x + 1}{(x - 1)^2}$",
        "$y' = \\dfrac{3x^2 - 2x + 1}{(x - 1)^2}$",
        "$y' = 2x$",
      ],
      answer: 0,
      hints: [
        "Quy tắc thương với $u = x^2 + 1$, $v = x - 1$: $u' = 2x$, $v' = 1$.",
        'Khai triển $2x(x - 1) - \\left(x^2 + 1\\right)$.',
      ],
      solution:
        "$y' = \\dfrac{2x(x - 1) - \\left(x^2 + 1\\right)}{(x - 1)^2} = \\dfrac{2x^2 - 2x - x^2 - 1}{(x - 1)^2} = \\dfrac{x^2 - 2x - 1}{(x - 1)^2}$. Đáp án $2x$ là lỗi lấy đạo hàm riêng tử số.",
    },
    {
      type: 'fraction',
      prompt: "Cho $y = \\sqrt{3x + 1}$. Tính $y'(1)$.",
      answer: [3, 4],
      hints: ["$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ với $u = 3x + 1$."],
      solution:
        "$y' = \\dfrac{3}{2\\sqrt{3x + 1}}$, nên $y'(1) = \\dfrac{3}{2 \\cdot 2} = \\dfrac{3}{4}$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = \\sin^2 x$. Tính $f'\\left(\\dfrac{\\pi}{4}\\right)$.",
      answer: 1,
      hints: [
        "Hàm hợp: $(u^2)' = 2u \\cdot u'$ với $u = \\sin x$.",
        "$f'(x) = 2\\sin x\\cos x = \\sin 2x$.",
      ],
      solution:
        "$f'(x) = 2\\sin x\\cos x = \\sin 2x$, nên $f'\\left(\\dfrac{\\pi}{4}\\right) = \\sin\\dfrac{\\pi}{2} = 1$.",
    },
    {
      type: 'fraction',
      prompt: "Cho $f(x) = \\ln(2x + 1)$. Tính $f'(1)$.",
      answer: [2, 3],
      hints: ["$(\\ln u)' = \\dfrac{u'}{u}$ với $u = 2x + 1$."],
      solution: "$f'(x) = \\dfrac{2}{2x + 1}$, nên $f'(1) = \\dfrac{2}{3}$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = xe^x$. Tính $f''(0)$.",
      answer: 2,
      hints: ["$f'(x) = (x + 1)e^x$; dùng quy tắc tích một lần nữa."],
      solution: "$f'(x) = (x + 1)e^x$, $f''(x) = e^x + (x + 1)e^x = (x + 2)e^x$, nên $f''(0) = 2$.",
    },
    {
      type: 'choice',
      prompt:
        'Phương trình tiếp tuyến của đồ thị hàm số $y = x^3 - 3x^2 + 2$ tại điểm có hoành độ $x_0 = 1$ là',
      options: ['$y = -3x + 3$', '$y = -3x - 3$', '$y = 3x - 3$', '$y = -3x$'],
      answer: 0,
      hints: ["Tính $y_0 = y(1)$ và $y'(1)$ với $y' = 3x^2 - 6x$."],
      solution:
        "$y_0 = 1 - 3 + 2 = 0$, $y'(1) = 3 - 6 = -3$. Tiếp tuyến: $y - 0 = -3(x - 1)$, tức là $y = -3x + 3$.",
    },
    {
      type: 'number',
      prompt:
        'Tiếp tuyến của parabol $y = x^2 - 4x + 3$ có hệ số góc bằng $2$ có phương trình $y = 2x + b$. Tìm $b$.',
      answer: -6,
      hints: [
        "Giải $y'(x_0) = 2x_0 - 4 = 2$ để tìm hoành độ tiếp điểm.",
        'Tính $y_0$ rồi dùng $b = y_0 - 2x_0$.',
      ],
      solution:
        '$2x_0 - 4 = 2 \\iff x_0 = 3$, $y_0 = 9 - 12 + 3 = 0$. Tiếp tuyến: $y = 2(x - 3)$, tức là $y = 2x - 6$, nên $b = -6$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật chuyển động có phương trình $s(t) = t^3 - 6t^2 + 9t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính vận tốc của vật tại thời điểm $t = 2$.',
      answer: -3,
      unit: 'm/s',
      hints: ["$v(t) = s'(t) = 3t^2 - 12t + 9$."],
      solution:
        '$v(2) = 12 - 24 + 9 = -3$ m/s: lúc đó vật đang chuyển động theo chiều âm với tốc độ $3$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Với chuyển động $s(t) = t^3 - 6t^2 + 9t$ ở câu trước, tính gia tốc của vật tại thời điểm vật dừng lại lần đầu tiên ($t > 0$).',
      answer: -6,
      unit: 'm/s²',
      hints: [
        'Vật dừng khi $v(t) = 3t^2 - 12t + 9 = 0$; chọn nghiệm nhỏ hơn.',
        "$a(t) = s''(t) = 6t - 12$.",
      ],
      solution:
        '$v(t) = 0 \\iff t = 1$ hoặc $t = 3$; vật dừng lần đầu tại $t = 1$. Khi đó $a(1) = 6 - 12 = -6$ m/s².',
    },
    {
      type: 'multi',
      prompt: 'Những khẳng định nào sau đây đúng? Chọn tất cả các đáp án đúng.',
      options: [
        "$(\\cos 3x)' = -3\\sin 3x$",
        "$\\left(e^{2x}\\right)' = 2e^{2x}$",
        "$(2^x)' = x \\cdot 2^{x-1}$",
        "$(\\sin 2x)' = \\cos 2x$",
      ],
      answers: [0, 1],
      hints: ["Với hàm hợp, nhớ nhân thêm $u'$.", '$2^x$ là hàm số mũ.'],
      solution:
        "$(\\cos 3x)' = -3\\sin 3x$ và $\\left(e^{2x}\\right)' = 2e^{2x}$ đúng. Sai: $(2^x)' = 2^x \\ln 2$ và $(\\sin 2x)' = 2\\cos 2x$.",
    },
  ],
  takeaways: [
    "Đạo hàm $f'(x_0)$ là giới hạn của $\\dfrac{\\Delta y}{\\Delta x}$; nó là hệ số góc tiếp tuyến và là tốc độ thay đổi tức thời.",
    "Tiếp tuyến tại $M_0(x_0; y_0)$: $y - y_0 = f'(x_0)(x - x_0)$.",
    "Quy tắc: tổng, hiệu, tích $(uv)' = u'v + uv'$, thương, hàm hợp $y'_x = y'_u \\cdot u'_x$.",
    "$v = s'$, $a = v' = s''$.",
  ],
};
