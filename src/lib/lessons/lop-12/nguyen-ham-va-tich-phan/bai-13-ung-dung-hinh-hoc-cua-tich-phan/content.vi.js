/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dùng tích phân tính diện tích hình phẳng giới hạn bởi các đồ thị, thể tích vật thể khi biết diện tích thiết diện và thể tích khối tròn xoay.',
  intro:
    'Một chiếc bình gốm được tiện trên bàn xoay: người thợ chỉ cần tạo dáng một đường cong, khi bàn quay, đường cong ấy vạch nên thành bình. Bình chứa được bao nhiêu nước? Bài này dùng tích phân để tính diện tích các hình có cạnh cong và thể tích những vật thể như vậy.',
  objectives: [
    'Tính diện tích hình phẳng giới hạn bởi một đồ thị và trục hoành, hoặc bởi hai đồ thị, bằng tích phân.',
    'Tính thể tích vật thể khi biết diện tích thiết diện vuông góc với một trục.',
    'Tính thể tích khối tròn xoay sinh ra khi quay một hình thang cong quanh trục hoành.',
  ],
  sections: [
    {
      heading: 'Diện tích hình phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình phẳng giới hạn bởi một đồ thị và trục hoành',
          text: 'Cho hàm số $y = f(x)$ liên tục trên đoạn $[a; b]$. Diện tích $S$ của hình phẳng giới hạn bởi đồ thị hàm số $y = f(x)$, trục hoành và hai đường thẳng $x = a$, $x = b$ là $$S = \\int_a^b |f(x)|\\,\\mathrm{d}x.$$',
        },
        {
          type: 'p',
          text: 'Phần đồ thị nằm dưới trục hoành ứng với $f(x) < 0$; lấy giá trị tuyệt đối để phần đó cũng góp diện tích dương. Vì vậy, khi $f(x)$ đổi dấu, $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ nói chung không bằng diện tích.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình phẳng giới hạn bởi hai đồ thị',
          text: 'Cho hai hàm số $y = f(x)$ và $y = g(x)$ liên tục trên đoạn $[a; b]$. Diện tích $S$ của hình phẳng giới hạn bởi đồ thị của hai hàm số đó và hai đường thẳng $x = a$, $x = b$ là $$S = \\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách bỏ dấu giá trị tuyệt đối',
          text: 'Giải phương trình $f(x) - g(x) = 0$ để tìm các nghiệm thuộc $(a; b)$, chẳng hạn $c$. Trên mỗi đoạn $[a; c]$, $[c; b]$ hiệu $f(x) - g(x)$ không đổi dấu, nên diện tích bằng tổng giá trị tuyệt đối của tích phân trên từng đoạn:',
        },
        {
          type: 'tex',
          tex: '\\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x = \\left|\\int_a^c [f(x) - g(x)]\\,\\mathrm{d}x\\right| + \\left|\\int_c^b [f(x) - g(x)]\\,\\mathrm{d}x\\right|.',
        },
      ],
    },
    {
      heading: 'Thể tích vật thể',
      blocks: [
        {
          type: 'p',
          text: 'Cắt một vật thể bởi hai mặt phẳng $(P)$ và $(Q)$ vuông góc với trục $Ox$ tại $x = a$ và $x = b$ ($a < b$). Một mặt phẳng tuỳ ý vuông góc với $Ox$ tại điểm có hoành độ $x$ ($a \\le x \\le b$) cắt vật thể theo một thiết diện có diện tích $S(x)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích vật thể',
          text: 'Nếu $S(x)$ là hàm số liên tục trên đoạn $[a; b]$ thì thể tích của phần vật thể giới hạn bởi hai mặt phẳng $(P)$ và $(Q)$ là $$V = \\int_a^b S(x)\\,\\mathrm{d}x.$$',
        },
        {
          type: 'p',
          text: 'Có thể hình dung vật thể được cắt thành rất nhiều lát mỏng; lát ở vị trí $x$ dày $\\Delta x$ có thể tích xấp xỉ $S(x)\\,\\Delta x$. Cộng tất cả các lát lại và cho độ dày dần tới $0$, ta được tích phân trên. Áp dụng cho khối chóp và khối nón, ta tìm lại được công thức $V = \\dfrac{1}{3}Bh$ đã học.',
        },
      ],
    },
    {
      heading: 'Thể tích khối tròn xoay',
      blocks: [
        {
          type: 'p',
          text: 'Cho hàm số $y = f(x)$ liên tục, không âm trên đoạn $[a; b]$. Quay hình thang cong giới hạn bởi đồ thị $y = f(x)$, trục hoành và hai đường thẳng $x = a$, $x = b$ quanh trục $Ox$, ta được một khối tròn xoay. Mặt phẳng vuông góc với $Ox$ tại $x$ cắt khối theo hình tròn bán kính $f(x)$, có diện tích $S(x) = \\pi f^2(x)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích khối tròn xoay',
          text: 'Thể tích của khối tròn xoay sinh ra khi quay hình thang cong giới hạn bởi đồ thị $y = f(x)$, trục hoành và hai đường thẳng $x = a$, $x = b$ ($a < b$) quanh trục $Ox$ là $$V = \\pi\\int_a^b f^2(x)\\,\\mathrm{d}x.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Đừng quên hằng số $\\pi$ và bình phương của $f(x)$: $V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$, không phải $\\pi\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quay miền phẳng tạo khối tròn xoay',
    instruction:
      'Chọn một miền phẳng, kéo thanh góc quay từ $0^\\circ$ đến $360^\\circ$ để xem miền phẳng quét nên khối tròn xoay, rồi di chuyển lát cắt: thiết diện là hình tròn bán kính $f(x)$. Kéo hình hoặc dùng phím mũi tên để xoay góc nhìn.',
  },
  examples: [
    {
      problem:
        'Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số $y = x^2 - 1$, trục hoành và hai đường thẳng $x = 0$, $x = 2$.',
      steps: [
        '$S = \\displaystyle\\int_0^2 |x^2 - 1|\\,\\mathrm{d}x$. Trên $[0; 2]$, $x^2 - 1 = 0 \\iff x = 1$.',
        '$S = \\left|\\displaystyle\\int_0^1 (x^2 - 1)\\,\\mathrm{d}x\\right| + \\left|\\displaystyle\\int_1^2 (x^2 - 1)\\,\\mathrm{d}x\\right|$.',
        '$\\displaystyle\\int_0^1 (x^2 - 1)\\,\\mathrm{d}x = \\left(\\dfrac{x^3}{3} - x\\right)\\Big|_0^1 = -\\dfrac{2}{3}$; $\\displaystyle\\int_1^2 (x^2 - 1)\\,\\mathrm{d}x = \\left(\\dfrac{x^3}{3} - x\\right)\\Big|_1^2 = \\dfrac{2}{3} + \\dfrac{2}{3} = \\dfrac{4}{3}$.',
        '$S = \\dfrac{2}{3} + \\dfrac{4}{3} = 2$.',
      ],
      answer: '$S = 2$.',
    },
    {
      problem: 'Tính diện tích hình phẳng giới hạn bởi hai đường $y = x$ và $y = x^2$.',
      steps: [
        'Hoành độ giao điểm: $x^2 = x \\iff x = 0$ hoặc $x = 1$.',
        'Trên $[0; 1]$ ta có $x \\ge x^2$, nên $S = \\displaystyle\\int_0^1 (x - x^2)\\,\\mathrm{d}x$.',
        '$S = \\left(\\dfrac{x^2}{2} - \\dfrac{x^3}{3}\\right)\\Big|_0^1 = \\dfrac{1}{2} - \\dfrac{1}{3}$.',
      ],
      answer: '$S = \\dfrac{1}{6}$.',
    },
    {
      problem:
        'Chứng minh rằng khối chóp có diện tích đáy $B$ và chiều cao $h$ có thể tích $V = \\dfrac{1}{3}Bh$.',
      steps: [
        'Chọn trục $Ox$ vuông góc với đáy, gốc $O$ tại đỉnh chóp; đáy nằm trên mặt phẳng $x = h$.',
        'Mặt phẳng vuông góc với $Ox$ tại $x$ ($0 \\le x \\le h$) cắt khối chóp theo một đa giác đồng dạng với đáy, tỉ số $\\dfrac{x}{h}$, nên $S(x) = B\\dfrac{x^2}{h^2}$.',
        '$V = \\displaystyle\\int_0^h \\dfrac{B}{h^2}x^2\\,\\mathrm{d}x = \\dfrac{B}{h^2} \\cdot \\dfrac{x^3}{3}\\Big|_0^h = \\dfrac{B}{h^2} \\cdot \\dfrac{h^3}{3}$.',
      ],
      answer: '$V = \\dfrac{1}{3}Bh$.',
    },
    {
      problem: 'Tính thể tích khối cầu bán kính $R$.',
      steps: [
        'Khối cầu là khối tròn xoay sinh ra khi quay nửa hình tròn giới hạn bởi $y = \\sqrt{R^2 - x^2}$ và trục hoành ($-R \\le x \\le R$) quanh $Ox$.',
        '$V = \\pi\\displaystyle\\int_{-R}^{R} (R^2 - x^2)\\,\\mathrm{d}x = \\pi\\left(R^2x - \\dfrac{x^3}{3}\\right)\\Big|_{-R}^{R}$.',
        '$= \\pi\\left[\\left(R^3 - \\dfrac{R^3}{3}\\right) - \\left(-R^3 + \\dfrac{R^3}{3}\\right)\\right] = \\pi \\cdot \\dfrac{4R^3}{3}$.',
      ],
      answer: '$V = \\dfrac{4}{3}\\pi R^3$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính diện tích hình phẳng giới hạn bởi đồ thị $y = x^2$, trục hoành và hai đường thẳng $x = 0$, $x = 3$.',
      answer: 9,
      hints: [
        'Trên $[0; 3]$ ta có $x^2 \\ge 0$, nên $S = \\displaystyle\\int_0^3 x^2\\,\\mathrm{d}x$.',
      ],
      solution: '$S = \\displaystyle\\int_0^3 x^2\\,\\mathrm{d}x = \\dfrac{x^3}{3}\\Big|_0^3 = 9$.',
    },
    {
      type: 'choice',
      prompt:
        'Diện tích hình phẳng giới hạn bởi đồ thị hai hàm số liên tục $y = f(x)$, $y = g(x)$ và hai đường thẳng $x = a$, $x = b$ ($a < b$) là',
      options: [
        '$\\displaystyle\\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x$',
        '$\\displaystyle\\int_a^b [f(x) - g(x)]\\,\\mathrm{d}x$',
        '$\\pi\\displaystyle\\int_a^b [f(x) - g(x)]^2\\,\\mathrm{d}x$',
        '$\\displaystyle\\int_a^b [f(x) + g(x)]\\,\\mathrm{d}x$',
      ],
      answer: 0,
      hints: ['Diện tích luôn dương, kể cả khi đồ thị $g$ nằm trên đồ thị $f$.'],
      solution:
        '$S = \\displaystyle\\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x$. Không có dấu giá trị tuyệt đối thì phần $g > f$ bị trừ đi.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình phẳng giới hạn bởi đồ thị $y = x^3$, trục hoành và hai đường thẳng $x = -1$, $x = 1$.',
      answer: 0.5,
      hints: [
        '$x^3 < 0$ trên $(-1; 0)$ và $x^3 > 0$ trên $(0; 1)$.',
        'Tách tích phân tại $x = 0$ và lấy giá trị tuyệt đối từng phần.',
      ],
      solution:
        '$S = \\left|\\displaystyle\\int_{-1}^{0} x^3\\,\\mathrm{d}x\\right| + \\displaystyle\\int_0^1 x^3\\,\\mathrm{d}x = \\dfrac{1}{4} + \\dfrac{1}{4} = 0{,}5$. Lưu ý $\\displaystyle\\int_{-1}^{1} x^3\\,\\mathrm{d}x = 0$ không phải diện tích.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2$ và đường thẳng $y = 2x$ (viết dưới dạng phân số tối giản).',
      answer: [4, 3],
      simplest: true,
      hints: [
        'Hoành độ giao điểm: $x^2 = 2x \\iff x = 0$ hoặc $x = 2$.',
        'Trên $[0; 2]$ thì $2x \\ge x^2$.',
      ],
      solution:
        '$S = \\displaystyle\\int_0^2 (2x - x^2)\\,\\mathrm{d}x = \\left(x^2 - \\dfrac{x^3}{3}\\right)\\Big|_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        'Thể tích khối tròn xoay sinh ra khi quay hình thang cong giới hạn bởi đồ thị $y = f(x)$ (liên tục, không âm), trục hoành và hai đường thẳng $x = a$, $x = b$ quanh trục $Ox$ là',
      options: [
        '$\\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$',
        '$\\pi\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$',
        '$\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$',
        '$2\\pi\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$',
      ],
      answer: 0,
      hints: ['Thiết diện tại $x$ là hình tròn bán kính $f(x)$.'],
      solution:
        'Thiết diện có diện tích $S(x) = \\pi f^2(x)$, nên $V = \\displaystyle\\int_a^b S(x)\\,\\mathrm{d}x = \\pi\\int_a^b f^2(x)\\,\\mathrm{d}x$.',
    },
    {
      type: 'number',
      prompt:
        'Quay hình phẳng giới hạn bởi đường thẳng $y = x$, trục hoành và đường thẳng $x = 3$ quanh trục $Ox$, ta được khối nón có thể tích $V = k\\pi$. Tìm $k$.',
      answer: 9,
      hints: ['$V = \\pi\\displaystyle\\int_0^3 x^2\\,\\mathrm{d}x$.'],
      solution:
        '$V = \\pi\\displaystyle\\int_0^3 x^2\\,\\mathrm{d}x = \\pi\\dfrac{x^3}{3}\\Big|_0^3 = 9\\pi$, nên $k = 9$. Kiểm tra: khối nón bán kính đáy $3$, chiều cao $3$ có $V = \\dfrac{1}{3}\\pi \\cdot 9 \\cdot 3 = 9\\pi$.',
    },
    {
      type: 'fraction',
      prompt:
        'Quay hình phẳng giới hạn bởi parabol $y = 2x - x^2$ và trục hoành quanh trục $Ox$. Thể tích khối tròn xoay là $V = k\\pi$. Tìm $k$ (phân số tối giản).',
      answer: [16, 15],
      simplest: true,
      hints: [
        'Parabol cắt trục hoành tại $x = 0$ và $x = 2$.',
        '$(2x - x^2)^2 = 4x^2 - 4x^3 + x^4$.',
      ],
      solution:
        '$V = \\pi\\displaystyle\\int_0^2 (4x^2 - 4x^3 + x^4)\\,\\mathrm{d}x = \\pi\\left(\\dfrac{4x^3}{3} - x^4 + \\dfrac{x^5}{5}\\right)\\Big|_0^2 = \\pi\\left(\\dfrac{32}{3} - 16 + \\dfrac{32}{5}\\right) = \\dfrac{16\\pi}{15}$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật thể nằm giữa hai mặt phẳng $x = 0$ và $x = 3$. Mặt phẳng vuông góc với trục $Ox$ tại điểm có hoành độ $x$ ($0 \\le x \\le 3$) cắt vật thể theo hình chữ nhật có hai cạnh là $x$ và $2x$. Tính thể tích vật thể.',
      answer: 18,
      hints: [
        'Diện tích thiết diện $S(x) = x \\cdot 2x = 2x^2$.',
        '$V = \\displaystyle\\int_0^3 S(x)\\,\\mathrm{d}x$.',
      ],
      solution:
        '$V = \\displaystyle\\int_0^3 2x^2\\,\\mathrm{d}x = \\dfrac{2x^3}{3}\\Big|_0^3 = 18$.',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi đồ thị $y = \\sin x$, trục hoành và hai đường thẳng $x = 0$, $x = \\pi$ quanh trục $Ox$ (làm tròn đến hàng phần trăm).',
      answer: 4.93,
      tolerance: 0.005,
      hints: [
        '$V = \\pi\\displaystyle\\int_0^{\\pi} \\sin^2 x\\,\\mathrm{d}x$.',
        'Hạ bậc: $\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}$.',
        "Vì $(\\sin 2x)' = 2\\cos 2x$ nên $\\dfrac{\\sin 2x}{2}$ là một nguyên hàm của $\\cos 2x$.",
      ],
      solution:
        "$V = \\pi\\displaystyle\\int_0^{\\pi} \\dfrac{1 - \\cos 2x}{2}\\,\\mathrm{d}x = \\pi\\left(\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4}\\right)\\Big|_0^{\\pi} = \\dfrac{\\pi^2}{2} \\approx 4{,}93$ (kiểm tra: $\\left(\\dfrac{x}{2} - \\dfrac{\\sin 2x}{4}\\right)' = \\dfrac{1 - \\cos 2x}{2}$).",
    },
  ],
  takeaways: [
    'Diện tích giữa đồ thị $y = f(x)$ và trục hoành trên $[a; b]$: $S = \\displaystyle\\int_a^b |f(x)|\\,\\mathrm{d}x$.',
    'Diện tích giữa hai đồ thị: $S = \\displaystyle\\int_a^b |f(x) - g(x)|\\,\\mathrm{d}x$; tách đoạn tại nghiệm của $f(x) - g(x) = 0$.',
    'Thể tích vật thể có thiết diện $S(x)$: $V = \\displaystyle\\int_a^b S(x)\\,\\mathrm{d}x$.',
    'Khối tròn xoay quanh $Ox$: $V = \\pi\\displaystyle\\int_a^b f^2(x)\\,\\mathrm{d}x$.',
  ],
};
