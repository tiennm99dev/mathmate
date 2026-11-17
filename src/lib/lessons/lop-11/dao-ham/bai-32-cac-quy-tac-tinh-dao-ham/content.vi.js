/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các quy tắc tính đạo hàm: đạo hàm của các hàm số sơ cấp cơ bản (luỹ thừa, căn, lượng giác, mũ, logarit), đạo hàm của tổng, hiệu, tích, thương và đạo hàm của hàm hợp.',
  intro:
    'Tính đạo hàm bằng định nghĩa nghĩa là mỗi lần lại lập tỉ số và tìm giới hạn, rất dài khi hàm số phức tạp như $y = \\dfrac{2x - 1}{x + 1}$ hay $y = \\left(x^2 + x\\right)^8$. Bài này xây dựng một bảng đạo hàm của các hàm số cơ bản và các quy tắc để ghép chúng lại, nhờ đó ta tính được đạo hàm của hầu hết các hàm số thường gặp chỉ bằng vài bước.',
  objectives: [
    'Nhớ đạo hàm của các hàm số $y = x^n$, $y = \\sqrt{x}$, các hàm số lượng giác, hàm số mũ và hàm số logarit.',
    'Tính đạo hàm của tổng, hiệu, tích, thương các hàm số.',
    'Nhận biết hàm hợp và tính đạo hàm của hàm hợp.',
  ],
  sections: [
    {
      heading: 'Đạo hàm của một số hàm số thường gặp',
      blocks: [
        {
          type: 'list',
          items: [
            "$(c)' = 0$ với $c$ là hằng số; $(x)' = 1$.",
            "$(x^n)' = nx^{n-1}$ với $n \\in \\mathbb{N}$, $n \\ge 1$, trên $\\mathbb{R}$.",
            "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$ trên khoảng $(0; +\\infty)$.",
          ],
        },
        {
          type: 'p',
          text: "Chẳng hạn $(x^5)' = 5x^4$. Với $x_0 > 0$: $\\dfrac{\\sqrt{x} - \\sqrt{x_0}}{x - x_0} = \\dfrac{1}{\\sqrt{x} + \\sqrt{x_0}} \\to \\dfrac{1}{2\\sqrt{x_0}}$, đó là công thức đạo hàm của $\\sqrt{x}$. Từ định nghĩa cũng có $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ với $x \\ne 0$.",
        },
      ],
    },
    {
      heading: 'Đạo hàm của tổng, hiệu, tích, thương',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: "Giả sử $u = u(x)$, $v = v(x)$ là các hàm số có đạo hàm tại điểm $x$ thuộc khoảng xác định. Ta có: $$(u + v)' = u' + v'; \\quad (u - v)' = u' - v'; \\quad (uv)' = u'v + uv';$$ $$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2} \\quad (v = v(x) \\ne 0).$$",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hệ quả',
          text: "$(ku)' = ku'$ với $k$ là hằng số; $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$ với $v = v(x) \\ne 0$.",
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: "Đạo hàm của tích không phải tích các đạo hàm: $(uv)' \\ne u'v'$. Chẳng hạn $(x \\cdot x)' = (x^2)' = 2x$, trong khi $(x)' \\cdot (x)' = 1$.",
        },
      ],
    },
    {
      heading: 'Đạo hàm của hàm hợp',
      blocks: [
        {
          type: 'p',
          text: 'Nếu $u = g(x)$ là hàm số của $x$ và $y = f(u)$ là hàm số của $u$ thì $y = f(g(x))$ được gọi là hàm hợp của hàm số $y = f(u)$ với $u = g(x)$. Chẳng hạn $y = \\left(x^2 + x\\right)^8$ là hàm hợp của $y = u^8$ với $u = x^2 + x$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: "Nếu hàm số $u = g(x)$ có đạo hàm $u'_x$ tại $x$ và hàm số $y = f(u)$ có đạo hàm $y'_u$ tại $u = g(x)$ thì hàm hợp $y = f(g(x))$ có đạo hàm tại $x$ là $$y'_x = y'_u \\cdot u'_x.$$",
        },
        {
          type: 'p',
          text: "Áp dụng cho $y = u^n$ và $y = \\sqrt{u}$: $(u^n)' = nu^{n-1} \\cdot u'$ và $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$. Ví dụ $\\left(\\left(x^2 + x\\right)^8\\right)' = 8\\left(x^2 + x\\right)^7 (2x + 1)$.",
        },
      ],
    },
    {
      heading: 'Đạo hàm của hàm số lượng giác',
      blocks: [
        {
          type: 'p',
          text: 'Người ta chứng minh được $\\lim\\limits_{x \\to 0} \\dfrac{\\sin x}{x} = 1$. Từ đó suy ra các công thức sau (với $u = u(x)$):',
        },
        {
          type: 'table',
          head: ['Hàm số', 'Đạo hàm', 'Hàm hợp'],
          rows: [
            ['$y = \\sin x$', "$(\\sin x)' = \\cos x$", "$(\\sin u)' = u' \\cos u$"],
            ['$y = \\cos x$', "$(\\cos x)' = -\\sin x$", "$(\\cos u)' = -u' \\sin u$"],
            [
              '$y = \\tan x$',
              "$(\\tan x)' = \\dfrac{1}{\\cos^2 x}$",
              "$(\\tan u)' = \\dfrac{u'}{\\cos^2 u}$",
            ],
            [
              '$y = \\cot x$',
              "$(\\cot x)' = -\\dfrac{1}{\\sin^2 x}$",
              "$(\\cot u)' = -\\dfrac{u'}{\\sin^2 u}$",
            ],
          ],
          caption:
            'Công thức của $\\tan$ đúng khi $x \\ne \\dfrac{\\pi}{2} + k\\pi$, của $\\cot$ khi $x \\ne k\\pi$ ($k \\in \\mathbb{Z}$).',
        },
      ],
    },
    {
      heading: 'Đạo hàm của hàm số mũ và hàm số logarit',
      blocks: [
        {
          type: 'p',
          text: 'Người ta chứng minh được $\\lim\\limits_{x \\to 0} \\dfrac{e^x - 1}{x} = 1$. Từ đó, với $0 < a \\ne 1$ và $u = u(x)$:',
        },
        {
          type: 'table',
          head: ['Hàm số', 'Đạo hàm', 'Hàm hợp'],
          rows: [
            ['$y = e^x$', "$(e^x)' = e^x$", "$(e^u)' = u'e^u$"],
            ['$y = a^x$', "$(a^x)' = a^x \\ln a$", "$(a^u)' = u'a^u \\ln a$"],
            ['$y = \\ln x$', "$(\\ln x)' = \\dfrac{1}{x}$", "$(\\ln u)' = \\dfrac{u'}{u}$"],
            [
              '$y = \\log_a x$',
              "$(\\log_a x)' = \\dfrac{1}{x \\ln a}$",
              "$(\\log_a u)' = \\dfrac{u'}{u \\ln a}$",
            ],
          ],
          caption: 'Các công thức của $\\ln$ và $\\log_a$ đúng khi $x > 0$ (hay $u > 0$).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách làm',
          text: 'Nhìn phép toán thực hiện sau cùng của biểu thức: cộng, trừ thì dùng quy tắc tổng, hiệu; nhân thì dùng quy tắc tích; chia thì dùng quy tắc thương; còn nếu là một hàm số cơ bản của một biểu thức $u \\ne x$ thì dùng quy tắc hàm hợp. Lặp lại cho đến khi chỉ còn các đạo hàm có trong bảng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính đạo hàm từng bước',
    instruction:
      'Chọn một hàm số. Ở mỗi bước, máy hỏi đạo hàm cần tính; em chọn quy tắc áp dụng cho phép toán ngoài cùng. Chọn đúng thì bước đó hiện ra và thẻ quy tắc sáng màu; chọn sai thì em được giải thích vì sao. Khi mọi phần đã về bảng đạo hàm, máy ghép lại và rút gọn kết quả.',
  },
  examples: [
    {
      problem: 'Tính đạo hàm của hàm số $y = x^3 - 2\\sqrt{x} + 5$.',
      steps: [
        "Quy tắc tổng, hiệu: $y' = (x^3)' - 2(\\sqrt{x})' + (5)'$.",
        "Bảng đạo hàm: $(x^3)' = 3x^2$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(5)' = 0$.",
        "$y' = 3x^2 - \\dfrac{2}{2\\sqrt{x}} = 3x^2 - \\dfrac{1}{\\sqrt{x}}$ với $x > 0$.",
      ],
      answer: "$y' = 3x^2 - \\dfrac{1}{\\sqrt{x}}$.",
    },
    {
      problem: 'Tính đạo hàm của hàm số $y = \\dfrac{2x - 1}{x + 1}$.',
      steps: [
        "Quy tắc thương: $y' = \\dfrac{(2x - 1)'(x + 1) - (2x - 1)(x + 1)'}{(x + 1)^2}$.",
        "$(2x - 1)' = 2$ và $(x + 1)' = 1$.",
        "$y' = \\dfrac{2(x + 1) - (2x - 1)}{(x + 1)^2} = \\dfrac{3}{(x + 1)^2}$ với $x \\ne -1$.",
      ],
      answer: "$y' = \\dfrac{3}{(x + 1)^2}$.",
    },
    {
      problem: 'Tính đạo hàm của hàm số $y = \\sqrt{x^2 - 2x + 3}$.',
      steps: [
        "Đây là hàm hợp của $y = \\sqrt{u}$ với $u = x^2 - 2x + 3$, và $u' = 2x - 2$.",
        "$y' = \\dfrac{u'}{2\\sqrt{u}} = \\dfrac{2x - 2}{2\\sqrt{x^2 - 2x + 3}}$.",
        "Rút gọn: $y' = \\dfrac{x - 1}{\\sqrt{x^2 - 2x + 3}}$.",
      ],
      answer: "$y' = \\dfrac{x - 1}{\\sqrt{x^2 - 2x + 3}}$.",
    },
    {
      problem:
        'Tính đạo hàm của các hàm số: a) $y = \\sin\\left(2x + \\dfrac{\\pi}{3}\\right)$; b) $y = xe^x$; c) $y = \\ln\\left(x^2 + 1\\right)$.',
      steps: [
        "a) Hàm hợp với $u = 2x + \\dfrac{\\pi}{3}$, $u' = 2$: $y' = 2\\cos\\left(2x + \\dfrac{\\pi}{3}\\right)$.",
        "b) Quy tắc tích: $y' = (x)'e^x + x(e^x)' = e^x + xe^x = (x + 1)e^x$.",
        "c) Hàm hợp với $u = x^2 + 1 > 0$, $u' = 2x$: $y' = \\dfrac{u'}{u} = \\dfrac{2x}{x^2 + 1}$.",
      ],
      answer:
        'a) $2\\cos\\left(2x + \\dfrac{\\pi}{3}\\right)$; b) $(x + 1)e^x$; c) $\\dfrac{2x}{x^2 + 1}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: "Cho $f(x) = x^3 - 2x^2 + 4$. Tính $f'(2)$.",
      answer: 4,
      hints: ["Tính $f'(x)$ bằng quy tắc tổng, hiệu và công thức $(x^n)' = nx^{n-1}$."],
      solution: "$f'(x) = 3x^2 - 4x$, nên $f'(2) = 12 - 8 = 4$.",
    },
    {
      type: 'choice',
      prompt: 'Đạo hàm của hàm số $y = x\\cos x$ là',
      options: [
        "$y' = \\cos x - x\\sin x$",
        "$y' = \\cos x + x\\sin x$",
        "$y' = -\\sin x$",
        "$y' = -x\\sin x$",
      ],
      answer: 0,
      hints: ["Đây là tích của $u = x$ và $v = \\cos x$: $(uv)' = u'v + uv'$."],
      solution: "$y' = (x)'\\cos x + x(\\cos x)' = \\cos x + x(-\\sin x) = \\cos x - x\\sin x$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = \\dfrac{x + 2}{x - 1}$. Tính $f'(2)$.",
      answer: -3,
      hints: [
        'Dùng quy tắc thương với $u = x + 2$, $v = x - 1$.',
        "$f'(x) = \\dfrac{1 \\cdot (x - 1) - (x + 2) \\cdot 1}{(x - 1)^2}$.",
      ],
      solution:
        "$f'(x) = \\dfrac{(x - 1) - (x + 2)}{(x - 1)^2} = \\dfrac{-3}{(x - 1)^2}$, nên $f'(2) = \\dfrac{-3}{1} = -3$.",
    },
    {
      type: 'number',
      prompt: "Cho $y = (2x + 1)^5$. Tính $y'(0)$.",
      answer: 10,
      hints: ["Hàm hợp: $(u^5)' = 5u^4 \\cdot u'$ với $u = 2x + 1$."],
      solution: "$y' = 5(2x + 1)^4 \\cdot 2 = 10(2x + 1)^4$, nên $y'(0) = 10 \\cdot 1 = 10$.",
    },
    {
      type: 'fraction',
      prompt: "Cho $y = \\sqrt{x^2 + 9}$. Tính $y'(4)$.",
      answer: [4, 5],
      hints: ["$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ với $u = x^2 + 9$."],
      solution:
        "$y' = \\dfrac{2x}{2\\sqrt{x^2 + 9}} = \\dfrac{x}{\\sqrt{x^2 + 9}}$, nên $y'(4) = \\dfrac{4}{\\sqrt{25}} = \\dfrac{4}{5}$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = \\sin 2x$. Tính $f'\\left(\\dfrac{\\pi}{6}\\right)$.",
      answer: 1,
      hints: ["$(\\sin u)' = u'\\cos u$ với $u = 2x$."],
      solution:
        "$f'(x) = 2\\cos 2x$, nên $f'\\left(\\dfrac{\\pi}{6}\\right) = 2\\cos\\dfrac{\\pi}{3} = 2 \\cdot \\dfrac{1}{2} = 1$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = \\tan x$. Tính $f'\\left(\\dfrac{\\pi}{4}\\right)$.",
      answer: 2,
      hints: [
        "$(\\tan x)' = \\dfrac{1}{\\cos^2 x}$ và $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$.",
      ],
      solution:
        "$f'\\left(\\dfrac{\\pi}{4}\\right) = \\dfrac{1}{\\cos^2 \\frac{\\pi}{4}} = \\dfrac{1}{\\frac{1}{2}} = 2$.",
    },
    {
      type: 'fraction',
      prompt: "Cho $f(x) = \\ln\\left(x^2 + 3\\right)$. Tính $f'(1)$.",
      answer: [1, 2],
      hints: ["$(\\ln u)' = \\dfrac{u'}{u}$ với $u = x^2 + 3$."],
      solution: "$f'(x) = \\dfrac{2x}{x^2 + 3}$, nên $f'(1) = \\dfrac{2}{4} = \\dfrac{1}{2}$.",
    },
    {
      type: 'choice',
      prompt: 'Đạo hàm của hàm số $y = 2^x$ là',
      options: [
        "$y' = 2^x \\ln 2$",
        "$y' = x \\cdot 2^{x-1}$",
        "$y' = 2^x$",
        "$y' = \\dfrac{2^x}{\\ln 2}$",
      ],
      answer: 0,
      hints: ['$y = a^x$ là hàm số mũ, không phải hàm số luỹ thừa $x^n$.'],
      solution:
        "Theo công thức $(a^x)' = a^x \\ln a$ với $a = 2$: $y' = 2^x \\ln 2$. Công thức $nx^{n-1}$ chỉ dùng cho $x^n$, khi số mũ là hằng số.",
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hàm số với đạo hàm của nó.',
      left: ['$y = \\tan x$', '$y = \\cot x$', '$y = \\log_3 x$', '$y = \\sqrt{x}$'],
      right: [
        '$\\dfrac{1}{\\cos^2 x}$',
        '$-\\dfrac{1}{\\sin^2 x}$',
        '$\\dfrac{1}{x \\ln 3}$',
        '$\\dfrac{1}{2\\sqrt{x}}$',
        '$\\dfrac{\\ln 3}{x}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Dấu trừ thuộc về $\\cot x$.',
        "$(\\log_a x)' = \\dfrac{1}{x \\ln a}$: $\\ln a$ nằm ở mẫu.",
      ],
      solution:
        "$(\\tan x)' = \\dfrac{1}{\\cos^2 x}$; $(\\cot x)' = -\\dfrac{1}{\\sin^2 x}$; $(\\log_3 x)' = \\dfrac{1}{x \\ln 3}$; $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$. Biểu thức $\\dfrac{\\ln 3}{x}$ thừa ra.",
    },
  ],
  takeaways: [
    "$(x^n)' = nx^{n-1}$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$.",
    "$(u \\pm v)' = u' \\pm v'$, $(uv)' = u'v + uv'$, $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
    "Hàm hợp $y = f(u(x))$: $y'_x = y'_u \\cdot u'_x$, ví dụ $(u^n)' = nu^{n-1}u'$, $(\\sin u)' = u'\\cos u$, $(e^u)' = u'e^u$.",
    'Nhìn phép toán thực hiện sau cùng để chọn quy tắc, rồi lặp lại đến khi chỉ còn đạo hàm trong bảng.',
  ],
};
