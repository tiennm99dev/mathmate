/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diện tích hình thang cong, định nghĩa tích phân qua nguyên hàm (công thức Newton – Leibniz), ý nghĩa hình học và các tính chất của tích phân.',
  intro:
    'Một ô tô đang chạy thì hãm phanh, vận tốc giảm dần theo thời gian. Ô tô còn đi thêm bao nhiêu mét mới dừng? Câu hỏi này, cũng như câu hỏi tính diện tích một miền có cạnh cong, đều được trả lời bằng tích phân, một khái niệm gắn chặt với nguyên hàm.',
  objectives: [
    'Nhận biết hình thang cong và cách tính diện tích của nó qua nguyên hàm.',
    'Nhận biết định nghĩa và kí hiệu tích phân; tính tích phân bằng công thức Newton – Leibniz.',
    'Hiểu ý nghĩa hình học (diện tích) và ý nghĩa vật lí (quãng đường) của tích phân.',
    'Vận dụng các tính chất của tích phân để tính tích phân.',
  ],
  sections: [
    {
      heading: 'Diện tích hình thang cong',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thang cong',
          text: 'Cho hàm số $y = f(x)$ liên tục, không âm trên đoạn $[a; b]$. Hình phẳng giới hạn bởi đồ thị của hàm số $y = f(x)$, trục hoành và hai đường thẳng $x = a$, $x = b$ được gọi là một hình thang cong.',
        },
        {
          type: 'p',
          text: "Gọi $S(x)$ là diện tích phần hình thang cong nằm giữa đường thẳng $x = a$ và đường thẳng vuông góc với trục $Ox$ tại điểm có hoành độ $x$ ($a \\le x \\le b$). Người ta chứng minh được $S'(x) = f(x)$, tức là $S(x)$ là một nguyên hàm của $f(x)$ trên $[a; b]$, với $S(a) = 0$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích hình thang cong',
          text: 'Nếu $F(x)$ là một nguyên hàm bất kì của $f(x)$ trên $[a; b]$ thì diện tích của hình thang cong là $S = F(b) - F(a)$.',
        },
        {
          type: 'p',
          text: 'Thật vậy, $S(x) = F(x) + C$ với hằng số $C$ nào đó. Từ $S(a) = 0$ suy ra $C = -F(a)$, nên $S = S(b) = F(b) - F(a)$. Ta cũng có thể xấp xỉ diện tích này bằng tổng diện tích của nhiều hình chữ nhật hẹp; khi số hình chữ nhật tăng lên, tổng đó dần tới $F(b) - F(a)$.',
        },
      ],
    },
    {
      heading: 'Định nghĩa tích phân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hàm số $f(x)$ liên tục trên đoạn $[a; b]$. Nếu $F(x)$ là một nguyên hàm của hàm số $f(x)$ trên đoạn $[a; b]$ thì hiệu số $F(b) - F(a)$ được gọi là tích phân từ $a$ đến $b$ của hàm số $f(x)$, kí hiệu là $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.',
        },
        {
          type: 'p',
          text: 'Kí hiệu $F(x)\\big|_a^b = F(b) - F(a)$. Khi đó ta có công thức Newton – Leibniz:',
        },
        { type: 'tex', tex: '\\int_a^b f(x)\\,\\mathrm{d}x = F(x)\\Big|_a^b = F(b) - F(a).' },
        {
          type: 'p',
          text: 'Ta gọi $\\int$ là dấu tích phân, $a$ là cận dưới, $b$ là cận trên, $f(x)\\,\\mathrm{d}x$ là biểu thức dưới dấu tích phân và $f(x)$ là hàm số dưới dấu tích phân. Hiệu $F(b) - F(a)$ không phụ thuộc vào việc chọn nguyên hàm $F$, vì hai nguyên hàm chỉ khác nhau một hằng số.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'a) Quy ước: $\\displaystyle\\int_a^a f(x)\\,\\mathrm{d}x = 0$ và $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = -\\int_b^a f(x)\\,\\mathrm{d}x$. b) Tích phân chỉ phụ thuộc vào hàm số $f$ và các cận $a$, $b$, không phụ thuộc vào biến số: $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^b f(t)\\,\\mathrm{d}t$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ý nghĩa hình học và vật lí',
          text: 'Nếu hàm số $f(x)$ liên tục và không âm trên đoạn $[a; b]$ thì $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ là diện tích của hình thang cong giới hạn bởi đồ thị $y = f(x)$, trục hoành và hai đường thẳng $x = a$, $x = b$. Nếu một vật chuyển động với vận tốc $v(t)$ thì quãng đường vật đi được từ thời điểm $t = a$ đến $t = b$ là $s = \\displaystyle\\int_a^b v(t)\\,\\mathrm{d}t$ (với $v(t) \\ge 0$ trên $[a; b]$).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Khi $f(x)$ đổi dấu trên $[a; b]$, tích phân không còn là diện tích: phần hình nằm dưới trục hoành được tính với dấu âm. Chẳng hạn $\\displaystyle\\int_0^{2\\pi} \\sin x\\,\\mathrm{d}x = 0$.',
        },
      ],
    },
    {
      heading: 'Tính chất của tích phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Cho các hàm số $f(x)$, $g(x)$ liên tục trên đoạn $[a; b]$. Khi đó: 1) $\\displaystyle\\int_a^b k f(x)\\,\\mathrm{d}x = k\\int_a^b f(x)\\,\\mathrm{d}x$ ($k$ là hằng số). 2) $\\displaystyle\\int_a^b [f(x) \\pm g(x)]\\,\\mathrm{d}x = \\int_a^b f(x)\\,\\mathrm{d}x \\pm \\int_a^b g(x)\\,\\mathrm{d}x$. 3) $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = \\int_a^c f(x)\\,\\mathrm{d}x + \\int_c^b f(x)\\,\\mathrm{d}x$ với $a < c < b$.',
        },
        {
          type: 'p',
          text: 'Tính chất 3 rất hữu ích khi hàm số dưới dấu tích phân được cho bởi nhiều công thức, chẳng hạn hàm chứa dấu giá trị tuyệt đối: ta tách đoạn $[a; b]$ tại các điểm mà biểu thức trong dấu giá trị tuyệt đối đổi dấu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tổng các hình chữ nhật và tích phân',
    instruction:
      'Chọn hàm số, cách lấy chiều cao và kéo thanh $n$ để tăng số hình chữ nhật. Quan sát tổng diện tích (có dấu) $S_n$ tiến gần tới tích phân $F(b) - F(a)$. Với $x^2 - 1$, phần dưới trục hoành được tô đỏ và tính với dấu âm.',
  },
  examples: [
    {
      problem: 'Tính $\\displaystyle\\int_0^1 (3x^2 - 2x + 1)\\,\\mathrm{d}x$.',
      steps: [
        'Một nguyên hàm của $3x^2 - 2x + 1$ là $F(x) = x^3 - x^2 + x$.',
        '$\\displaystyle\\int_0^1 (3x^2 - 2x + 1)\\,\\mathrm{d}x = (x^3 - x^2 + x)\\Big|_0^1 = (1 - 1 + 1) - 0$.',
      ],
      answer: '$\\displaystyle\\int_0^1 (3x^2 - 2x + 1)\\,\\mathrm{d}x = 1$.',
    },
    {
      problem: 'Tính $\\displaystyle\\int_0^{\\frac{\\pi}{2}} (2\\cos x - 1)\\,\\mathrm{d}x$.',
      steps: [
        'Một nguyên hàm của $2\\cos x - 1$ là $2\\sin x - x$.',
        '$\\displaystyle\\int_0^{\\frac{\\pi}{2}} (2\\cos x - 1)\\,\\mathrm{d}x = (2\\sin x - x)\\Big|_0^{\\frac{\\pi}{2}} = \\left(2 - \\dfrac{\\pi}{2}\\right) - 0$.',
      ],
      answer: '$2 - \\dfrac{\\pi}{2}$.',
    },
    {
      problem: 'Tính $\\displaystyle\\int_0^2 |x - 1|\\,\\mathrm{d}x$.',
      steps: [
        'Trên $[0; 1]$: $|x - 1| = 1 - x$; trên $[1; 2]$: $|x - 1| = x - 1$.',
        'Theo tính chất 3: $\\displaystyle\\int_0^2 |x - 1|\\,\\mathrm{d}x = \\int_0^1 (1 - x)\\,\\mathrm{d}x + \\int_1^2 (x - 1)\\,\\mathrm{d}x$.',
        '$= \\left(x - \\dfrac{x^2}{2}\\right)\\Big|_0^1 + \\left(\\dfrac{x^2}{2} - x\\right)\\Big|_1^2 = \\dfrac{1}{2} + \\left(0 + \\dfrac{1}{2}\\right)$.',
      ],
      answer: '$\\displaystyle\\int_0^2 |x - 1|\\,\\mathrm{d}x = 1$.',
    },
    {
      problem:
        'Một ô tô đang chạy với vận tốc $10$ m/s thì hãm phanh, từ đó chuyển động chậm dần đều với vận tốc $v(t) = 10 - 2t$ (m/s), $t$ tính bằng giây kể từ lúc hãm phanh. Tính quãng đường ô tô đi được từ lúc hãm phanh đến khi dừng hẳn.',
      steps: [
        'Ô tô dừng khi $v(t) = 0 \\iff t = 5$ (giây).',
        'Trên $[0; 5]$ ta có $v(t) \\ge 0$, nên quãng đường là $s = \\displaystyle\\int_0^5 (10 - 2t)\\,\\mathrm{d}t$.',
        '$s = (10t - t^2)\\Big|_0^5 = 50 - 25 = 25$.',
      ],
      answer: 'Ô tô đi thêm được $25$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_1^3 2x\\,\\mathrm{d}x$.',
      answer: 8,
      hints: ['Một nguyên hàm của $2x$ là $x^2$.', 'Tính $F(3) - F(1)$.'],
      solution: '$\\displaystyle\\int_1^3 2x\\,\\mathrm{d}x = x^2\\Big|_1^3 = 9 - 1 = 8$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\displaystyle\\int_0^1 (x^2 + x)\\,\\mathrm{d}x$ (viết dưới dạng phân số tối giản).',
      answer: [5, 6],
      simplest: true,
      hints: ['Một nguyên hàm: $\\dfrac{x^3}{3} + \\dfrac{x^2}{2}$.'],
      solution:
        '$\\displaystyle\\int_0^1 (x^2 + x)\\,\\mathrm{d}x = \\left(\\dfrac{x^3}{3} + \\dfrac{x^2}{2}\\right)\\Big|_0^1 = \\dfrac{1}{3} + \\dfrac{1}{2} = \\dfrac{5}{6}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_1^e \\dfrac{1}{x}\\,\\mathrm{d}x$.',
      answer: 1,
      hints: ['Trên $[1; e]$, một nguyên hàm của $\\dfrac{1}{x}$ là $\\ln x$.'],
      solution:
        '$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,\\mathrm{d}x = \\ln x\\Big|_1^e = \\ln e - \\ln 1 = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình thang cong giới hạn bởi đồ thị $y = \\sin x$, trục hoành và hai đường thẳng $x = 0$, $x = \\pi$.',
      answer: 2,
      hints: [
        'Trên $[0; \\pi]$ ta có $\\sin x \\ge 0$, nên diện tích bằng tích phân.',
        'Một nguyên hàm của $\\sin x$ là $-\\cos x$.',
      ],
      solution:
        '$S = \\displaystyle\\int_0^{\\pi} \\sin x\\,\\mathrm{d}x = -\\cos x\\Big|_0^{\\pi} = -\\cos\\pi + \\cos 0 = 1 + 1 = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x = 3$ và $\\displaystyle\\int_0^2 g(x)\\,\\mathrm{d}x = -1$. Tính $\\displaystyle\\int_0^2 [2f(x) - 3g(x)]\\,\\mathrm{d}x$.',
      answer: 9,
      hints: ['Dùng tính chất 1 và 2 của tích phân.'],
      solution:
        '$\\displaystyle\\int_0^2 [2f(x) - 3g(x)]\\,\\mathrm{d}x = 2 \\cdot 3 - 3 \\cdot (-1) = 6 + 3 = 9$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $\\displaystyle\\int_0^3 f(x)\\,\\mathrm{d}x = 5$ và $\\displaystyle\\int_0^1 f(x)\\,\\mathrm{d}x = 2$. Tính $\\displaystyle\\int_1^3 f(x)\\,\\mathrm{d}x$.',
      answer: 3,
      hints: ['Tính chất 3: $\\displaystyle\\int_0^3 = \\int_0^1 + \\int_1^3$.'],
      solution:
        '$\\displaystyle\\int_1^3 f(x)\\,\\mathrm{d}x = \\int_0^3 f(x)\\,\\mathrm{d}x - \\int_0^1 f(x)\\,\\mathrm{d}x = 5 - 2 = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Biết $\\displaystyle\\int_0^2 f(x)\\,\\mathrm{d}x = 4$. Khi đó $\\displaystyle\\int_2^0 f(x)\\,\\mathrm{d}x$ bằng',
      options: ['$-4$', '$4$', '$0$', '$\\dfrac{1}{4}$'],
      answer: 0,
      hints: ['Đổi chỗ hai cận thì tích phân đổi dấu.'],
      solution:
        '$\\displaystyle\\int_2^0 f(x)\\,\\mathrm{d}x = -\\int_0^2 f(x)\\,\\mathrm{d}x = -4$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_{-1}^{2} |x|\\,\\mathrm{d}x$.',
      answer: 2.5,
      hints: ['Tách tại $x = 0$: trên $[-1; 0]$ thì $|x| = -x$, trên $[0; 2]$ thì $|x| = x$.'],
      solution:
        '$\\displaystyle\\int_{-1}^{2} |x|\\,\\mathrm{d}x = \\int_{-1}^{0} (-x)\\,\\mathrm{d}x + \\int_0^2 x\\,\\mathrm{d}x = \\dfrac{1}{2} + 2 = 2{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đang chạy thì hãm phanh, chuyển động chậm dần đều với vận tốc $v(t) = 20 - 5t$ (m/s), $t$ tính bằng giây kể từ lúc hãm phanh. Ô tô còn đi được bao nhiêu mét đến khi dừng hẳn?',
      answer: 40,
      unit: 'm',
      hints: [
        'Ô tô dừng khi $v(t) = 0$, tức $t = 4$.',
        'Tính $\\displaystyle\\int_0^4 (20 - 5t)\\,\\mathrm{d}t$.',
      ],
      solution:
        '$s = \\displaystyle\\int_0^4 (20 - 5t)\\,\\mathrm{d}t = \\left(20t - \\dfrac{5t^2}{2}\\right)\\Big|_0^4 = 80 - 40 = 40$ (m).',
    },
    {
      type: 'number',
      prompt:
        'Tính $\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x$ (làm tròn kết quả đến hàng phần trăm).',
      answer: 1.72,
      tolerance: 0.005,
      hints: ['$\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x = e^x\\Big|_0^1$.'],
      solution: '$\\displaystyle\\int_0^1 e^x\\,\\mathrm{d}x = e - 1 \\approx 1{,}72$.',
    },
  ],
  takeaways: [
    'Newton – Leibniz: $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(x)\\Big|_a^b = F(b) - F(a)$, với $F$ là một nguyên hàm bất kì của $f$.',
    'Nếu $f$ liên tục, không âm trên $[a; b]$ thì tích phân là diện tích hình thang cong; quãng đường là tích phân của vận tốc.',
    'Đổi chỗ hai cận thì tích phân đổi dấu; $\\displaystyle\\int_a^a f(x)\\,\\mathrm{d}x = 0$.',
    'Tích phân có tính chất tuyến tính và cộng được theo đoạn: $\\displaystyle\\int_a^b = \\int_a^c + \\int_c^b$.',
  ],
};
