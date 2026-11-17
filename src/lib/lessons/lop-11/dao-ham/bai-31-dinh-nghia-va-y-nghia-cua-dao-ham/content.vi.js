/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đạo hàm của hàm số tại một điểm và trên một khoảng, cách tính đạo hàm bằng định nghĩa, ý nghĩa hình học (hệ số góc của tiếp tuyến, phương trình tiếp tuyến) và ý nghĩa vật lí (vận tốc tức thời) của đạo hàm.',
  intro:
    'Một hòn bi rơi tự do có quãng đường $s(t) = 4{,}9t^2$ (mét) sau $t$ giây. Từ giây thứ $2$ đến giây thứ $3$, vận tốc trung bình của bi là $\\dfrac{s(3) - s(2)}{3 - 2} = 24{,}5$ m/s. Nhưng đúng tại thời điểm $t = 2$, bi rơi nhanh bao nhiêu? Câu trả lời dẫn tới một khái niệm mới của giải tích: đạo hàm.',
  objectives: [
    'Nhận biết các bài toán dẫn đến khái niệm đạo hàm: vận tốc tức thời, cường độ tức thời.',
    'Hiểu định nghĩa đạo hàm của hàm số tại một điểm và tính đạo hàm bằng định nghĩa.',
    'Nhận biết ý nghĩa hình học của đạo hàm và viết phương trình tiếp tuyến của đồ thị tại một điểm.',
    'Nhận biết ý nghĩa vật lí của đạo hàm: vận tốc tức thời của chuyển động.',
  ],
  sections: [
    {
      heading: 'Một số bài toán dẫn đến khái niệm đạo hàm',
      blocks: [
        {
          type: 'p',
          text: 'Bài toán vận tốc tức thời. Một vật chuyển động thẳng có quãng đường $s = s(t)$. Vận tốc trung bình trong khoảng thời gian từ $t_0$ đến $t$ là $v_{tb} = \\dfrac{s(t) - s(t_0)}{t - t_0}$. Khoảng thời gian càng ngắn thì $v_{tb}$ càng phản ánh đúng độ nhanh chậm của vật tại $t_0$. Giới hạn $v(t_0) = \\lim\\limits_{t \\to t_0} \\dfrac{s(t) - s(t_0)}{t - t_0}$ (nếu có) gọi là vận tốc tức thời của vật tại thời điểm $t_0$.',
        },
        {
          type: 'p',
          text: 'Với vật rơi tự do, $s(t) = \\dfrac{1}{2}gt^2$ ($g \\approx 9{,}8$ m/s²). Ta có $\\dfrac{s(t) - s(t_0)}{t - t_0} = \\dfrac{g(t^2 - t_0^2)}{2(t - t_0)} = \\dfrac{g(t + t_0)}{2}$, nên $v(t_0) = \\lim\\limits_{t \\to t_0} \\dfrac{g(t + t_0)}{2} = gt_0$.',
        },
        {
          type: 'p',
          text: 'Bài toán cường độ tức thời. Điện lượng $Q$ truyền trong dây dẫn là hàm số của thời gian, $Q = Q(t)$. Cường độ trung bình từ $t_0$ đến $t$ là $\\dfrac{Q(t) - Q(t_0)}{t - t_0}$, và giới hạn $I(t_0) = \\lim\\limits_{t \\to t_0} \\dfrac{Q(t) - Q(t_0)}{t - t_0}$ là cường độ tức thời của dòng điện tại $t_0$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai bài toán rất khác nhau nhưng cùng dẫn tới một giới hạn dạng $\\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0}$. Giới hạn này gọi là đạo hàm.',
        },
      ],
    },
    {
      heading: 'Đạo hàm của hàm số tại một điểm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ và điểm $x_0 \\in (a; b)$. Nếu tồn tại giới hạn hữu hạn $\\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0}$ thì giới hạn đó được gọi là đạo hàm của hàm số $y = f(x)$ tại điểm $x_0$, kí hiệu $f'(x_0)$ hoặc $y'(x_0)$: $$f'(x_0) = \\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0}.$$",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: "Đặt $h = x - x_0$ (hay $\\Delta x = x - x_0$, số gia của biến số) và $\\Delta y = f(x_0 + \\Delta x) - f(x_0)$ (số gia của hàm số). Khi đó $$f'(x_0) = \\lim\\limits_{h \\to 0} \\dfrac{f(x_0 + h) - f(x_0)}{h} = \\lim\\limits_{\\Delta x \\to 0} \\dfrac{\\Delta y}{\\Delta x}.$$",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính $f(x) - f(x_0)$.',
            'Lập và rút gọn tỉ số $\\dfrac{f(x) - f(x_0)}{x - x_0}$ với $x \\in (a; b)$, $x \\ne x_0$.',
            'Tìm giới hạn $\\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0}$.',
          ],
        },
        {
          type: 'p',
          text: 'Ba bước trên là quy tắc tính đạo hàm của hàm số $y = f(x)$ tại $x_0$ bằng định nghĩa.',
        },
      ],
    },
    {
      heading: 'Đạo hàm của hàm số trên một khoảng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Hàm số $y = f(x)$ được gọi là có đạo hàm trên khoảng $(a; b)$ nếu nó có đạo hàm $f'(x)$ tại mọi điểm $x$ thuộc khoảng đó. Khi đó ta có hàm số $f'(x)$ xác định trên $(a; b)$, gọi là đạo hàm của hàm số $y = f(x)$, kí hiệu $y' = f'(x)$.",
        },
        {
          type: 'p',
          text: "Chẳng hạn, với $f(x) = x^2$ và $x_0$ bất kì: $\\dfrac{x^2 - x_0^2}{x - x_0} = x + x_0 \\to 2x_0$. Vậy $(x^2)' = 2x$ trên $\\mathbb{R}$. Tương tự, đạo hàm của hàm hằng $y = c$ là $y' = 0$, của hàm số $y = x$ là $y' = 1$.",
        },
      ],
    },
    {
      heading: 'Ý nghĩa hình học của đạo hàm',
      blocks: [
        {
          type: 'p',
          text: 'Cho đồ thị $(C)$ của hàm số $y = f(x)$ và điểm cố định $M_0(x_0; f(x_0))$ trên $(C)$. Điểm $M(x; f(x))$ di chuyển trên $(C)$; đường thẳng $M_0M$ là một cát tuyến, có hệ số góc $k_M = \\dfrac{f(x) - f(x_0)}{x - x_0}$. Khi $x \\to x_0$, điểm $M$ dần tới $M_0$. Nếu $k_M$ dần tới một số $k$ thì đường thẳng $M_0T$ đi qua $M_0$ với hệ số góc $k$ là vị trí giới hạn của cát tuyến $M_0M$, và được gọi là tiếp tuyến của $(C)$ tại $M_0$; $M_0$ gọi là tiếp điểm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ý nghĩa hình học',
          text: "Hệ số góc của tiếp tuyến của đồ thị hàm số $y = f(x)$ tại điểm $M_0(x_0; f(x_0))$ là đạo hàm $f'(x_0)$. Phương trình tiếp tuyến đó là $$y - y_0 = f'(x_0)(x - x_0), \\quad \\text{trong đó } y_0 = f(x_0).$$",
        },
        {
          type: 'p',
          text: "Để viết phương trình tiếp tuyến tại điểm có hoành độ $x_0$: tính $y_0 = f(x_0)$, tính $f'(x_0)$, rồi thay vào công thức trên.",
        },
      ],
    },
    {
      heading: 'Ý nghĩa vật lí của đạo hàm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ý nghĩa vật lí',
          text: "Nếu hàm số $s = s(t)$ biểu thị quãng đường di chuyển của vật theo thời gian $t$ thì $s'(t_0)$ là vận tốc tức thời của chuyển động tại thời điểm $t_0$: $v(t_0) = s'(t_0)$.",
        },
        {
          type: 'p',
          text: "Tương tự, nếu điện lượng $Q = Q(t)$ truyền trong dây dẫn thì $Q'(t_0)$ là cường độ tức thời của dòng điện tại thời điểm $t_0$: $I(t_0) = Q'(t_0)$. Nói chung, đạo hàm $f'(x_0)$ cho biết tốc độ thay đổi tức thời của đại lượng $f$ theo $x$ tại $x_0$.",
        },
      ],
    },
  ],
  explore: {
    title: 'Cát tuyến quay thành tiếp tuyến',
    instruction:
      'Chọn một hàm số và điểm $M_0$, rồi giảm dần $|h|$: điểm $M$ có hoành độ $x_0 + h$ trượt về $M_0$ và cát tuyến $M_0M$ quay quanh $M_0$. Theo dõi tỉ số $\\dfrac{\\Delta y}{\\Delta x}$ trong bảng, thử cả $h$ âm: hai phía cùng tiến về $f\'(x_0)$. Với "Rơi tự do", tỉ số đó là vận tốc trung bình, còn giới hạn của nó là vận tốc tức thời.',
  },
  examples: [
    {
      problem: 'Tính đạo hàm của hàm số $f(x) = x^2 + 1$ tại $x_0 = 3$ bằng định nghĩa.',
      steps: [
        '$f(x) - f(3) = (x^2 + 1) - 10 = x^2 - 9$.',
        'Với $x \\ne 3$: $\\dfrac{f(x) - f(3)}{x - 3} = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$.',
        "$f'(3) = \\lim\\limits_{x \\to 3} (x + 3) = 6$.",
      ],
      answer: "$f'(3) = 6$.",
    },
    {
      problem: 'Tìm đạo hàm của hàm số $y = x^3$ trên $\\mathbb{R}$.',
      steps: [
        'Với $x_0$ bất kì và $x \\ne x_0$: $\\dfrac{x^3 - x_0^3}{x - x_0} = \\dfrac{(x - x_0)(x^2 + x x_0 + x_0^2)}{x - x_0} = x^2 + x x_0 + x_0^2$.',
        "$\\lim\\limits_{x \\to x_0} \\left(x^2 + x x_0 + x_0^2\\right) = 3x_0^2$, nên $y'(x_0) = 3x_0^2$.",
        "Điều này đúng với mọi $x_0 \\in \\mathbb{R}$, vậy $y' = 3x^2$.",
      ],
      answer: "$(x^3)' = 3x^2$ trên $\\mathbb{R}$.",
    },
    {
      problem: 'Viết phương trình tiếp tuyến của đồ thị hàm số $y = x^3$ tại điểm $M(1; 1)$.',
      steps: [
        "Theo ví dụ trên, $y' = 3x^2$, nên hệ số góc của tiếp tuyến là $y'(1) = 3$.",
        'Phương trình tiếp tuyến: $y - 1 = 3(x - 1)$.',
        'Rút gọn: $y = 3x - 2$.',
      ],
      answer: '$y = 3x - 2$.',
    },
    {
      problem:
        'Một vật rơi tự do có phương trình chuyển động $s(t) = 4{,}9t^2$, trong đó $s$ tính bằng mét, $t$ tính bằng giây. Tính vận tốc tức thời của vật tại thời điểm $t = 2$.',
      steps: [
        '$\\dfrac{s(t) - s(2)}{t - 2} = \\dfrac{4{,}9(t^2 - 4)}{t - 2} = 4{,}9(t + 2)$ với $t \\ne 2$.',
        "$s'(2) = \\lim\\limits_{t \\to 2} 4{,}9(t + 2) = 4{,}9 \\cdot 4 = 19{,}6$.",
        "Vận tốc tức thời tại $t = 2$ là $v(2) = s'(2) = 19{,}6$ m/s.",
      ],
      answer: '$19{,}6$ m/s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Dùng định nghĩa, tính đạo hàm của hàm số $f(x) = x^2 + x$ tại $x_0 = 2$.',
      answer: 5,
      hints: [
        'Tính $f(x) - f(2) = x^2 + x - 6$ rồi phân tích thành nhân tử.',
        '$x^2 + x - 6 = (x - 2)(x + 3)$.',
      ],
      solution:
        "$\\dfrac{f(x) - f(2)}{x - 2} = \\dfrac{(x - 2)(x + 3)}{x - 2} = x + 3$ với $x \\ne 2$, nên $f'(2) = \\lim\\limits_{x \\to 2} (x + 3) = 5$.",
    },
    {
      type: 'number',
      prompt: "Cho hàm số $f(x) = 3x - 1$. Tính $f'(4)$.",
      answer: 3,
      hints: ['Tính $\\dfrac{f(x) - f(4)}{x - 4}$ và rút gọn.'],
      solution:
        "$f(x) - f(4) = 3x - 1 - 11 = 3(x - 4)$, nên $\\dfrac{f(x) - f(4)}{x - 4} = 3$ và $f'(4) = 3$. (Đồ thị là đường thẳng có hệ số góc $3$.)",
    },
    {
      type: 'choice',
      prompt: 'Cho hàm số $y = f(x)$ có đạo hàm tại $x_0$. Đẳng thức nào đúng?',
      options: [
        "$f'(x_0) = \\lim\\limits_{h \\to 0} \\dfrac{f(x_0 + h) - f(x_0)}{h}$",
        "$f'(x_0) = \\lim\\limits_{x \\to x_0} \\dfrac{f(x) + f(x_0)}{x - x_0}$",
        "$f'(x_0) = \\lim\\limits_{h \\to 0} \\dfrac{f(x_0 + h) - f(x_0)}{x_0}$",
        "$f'(x_0) = \\dfrac{f(x) - f(x_0)}{x - x_0}$",
      ],
      answer: 0,
      hints: [
        'Đạo hàm là giới hạn của tỉ số giữa số gia của hàm số và số gia của biến số.',
        'Đặt $h = x - x_0$ trong định nghĩa.',
      ],
      solution:
        "Với $h = x - x_0$ thì $x = x_0 + h$ và $x \\to x_0 \\iff h \\to 0$, nên $f'(x_0) = \\lim\\limits_{h \\to 0} \\dfrac{f(x_0 + h) - f(x_0)}{h}$. Đẳng thức không có dấu giới hạn chỉ là hệ số góc của một cát tuyến.",
    },
    {
      type: 'fraction',
      prompt: 'Dùng định nghĩa, tính đạo hàm của hàm số $f(x) = \\dfrac{1}{x}$ tại $x_0 = 2$.',
      answer: [-1, 4],
      hints: [
        'Quy đồng: $\\dfrac{1}{x} - \\dfrac{1}{2} = \\dfrac{2 - x}{2x}$.',
        'Chia cho $x - 2$, chú ý $2 - x = -(x - 2)$.',
      ],
      solution:
        "$\\dfrac{f(x) - f(2)}{x - 2} = \\dfrac{2 - x}{2x(x - 2)} = -\\dfrac{1}{2x}$ với $x \\ne 2$, nên $f'(2) = \\lim\\limits_{x \\to 2} \\left(-\\dfrac{1}{2x}\\right) = -\\dfrac{1}{4}$.",
    },
    {
      type: 'number',
      prompt:
        'Tính hệ số góc của tiếp tuyến của đồ thị hàm số $y = x^2$ tại điểm có hoành độ $x_0 = -1$.',
      answer: -2,
      hints: ["Hệ số góc của tiếp tuyến tại $x_0$ là $y'(x_0)$, với $(x^2)' = 2x$."],
      solution: "Hệ số góc $k = y'(-1) = 2 \\cdot (-1) = -2$.",
    },
    {
      type: 'choice',
      prompt: 'Phương trình tiếp tuyến của parabol $y = x^2$ tại điểm $M(2; 4)$ là',
      options: ['$y = 4x - 4$', '$y = 4x + 4$', '$y = 2x$', '$y = 4x - 8$'],
      answer: 0,
      hints: ["Hệ số góc $k = y'(2)$.", 'Dùng $y - y_0 = k(x - x_0)$ với $x_0 = 2$, $y_0 = 4$.'],
      solution: "$y'(2) = 2 \\cdot 2 = 4$. Tiếp tuyến: $y - 4 = 4(x - 2)$, tức là $y = 4x - 4$.",
    },
    {
      type: 'number',
      prompt:
        'Một vật rơi tự do có phương trình $s(t) = 4{,}9t^2$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính vận tốc tức thời của vật tại thời điểm $t = 3$.',
      answer: 29.4,
      unit: 'm/s',
      hints: ["$v(t_0) = s'(t_0)$.", '$\\dfrac{s(t) - s(3)}{t - 3} = 4{,}9(t + 3)$.'],
      solution:
        "$s'(3) = \\lim\\limits_{t \\to 3} 4{,}9(t + 3) = 4{,}9 \\cdot 6 = 29{,}4$. Vận tốc tức thời tại $t = 3$ là $29{,}4$ m/s.",
    },
    {
      type: 'number',
      prompt:
        'Điện lượng truyền trong một dây dẫn là $Q(t) = t^2 + 2t$ (culông), $t$ tính bằng giây. Tính cường độ tức thời của dòng điện tại thời điểm $t = 3$.',
      answer: 8,
      unit: 'A',
      hints: ["$I(t_0) = Q'(t_0)$.", 'Rút gọn $\\dfrac{Q(t) - Q(3)}{t - 3}$; chú ý $Q(3) = 15$.'],
      solution:
        "$Q(t) - Q(3) = t^2 + 2t - 15 = (t - 3)(t + 5)$, nên $\\dfrac{Q(t) - Q(3)}{t - 3} = t + 5 \\to 8$. Vậy $I(3) = Q'(3) = 8$ A.",
    },
    {
      type: 'multi',
      prompt:
        'Tiếp tuyến của đồ thị hàm số $y = x^3$ có hệ số góc bằng $12$ tại những điểm nào? Chọn tất cả các đáp án đúng.',
      options: ['$(2; 8)$', '$(-2; -8)$', '$(-2; 8)$', '$(4; 64)$'],
      answers: [0, 1],
      hints: ["Giải phương trình $y'(x_0) = 3x_0^2 = 12$.", 'Tìm tung độ bằng $y_0 = x_0^3$.'],
      solution:
        '$3x_0^2 = 12 \\iff x_0 = 2$ hoặc $x_0 = -2$. Tiếp điểm là $(2; 8)$ và $(-2; -8)$. Điểm $(-2; 8)$ không thuộc đồ thị, còn tại $(4; 64)$ hệ số góc là $48$.',
    },
  ],
  takeaways: [
    "$f'(x_0) = \\lim\\limits_{x \\to x_0} \\dfrac{f(x) - f(x_0)}{x - x_0} = \\lim\\limits_{h \\to 0} \\dfrac{f(x_0 + h) - f(x_0)}{h}$ (nếu giới hạn hữu hạn tồn tại).",
    'Tính bằng định nghĩa: tính $f(x) - f(x_0)$, rút gọn tỉ số, rồi lấy giới hạn.',
    "$f'(x_0)$ là hệ số góc của tiếp tuyến tại $M_0(x_0; y_0)$; tiếp tuyến: $y - y_0 = f'(x_0)(x - x_0)$.",
    "Vận tốc tức thời $v(t_0) = s'(t_0)$; cường độ tức thời $I(t_0) = Q'(t_0)$.",
  ],
};
