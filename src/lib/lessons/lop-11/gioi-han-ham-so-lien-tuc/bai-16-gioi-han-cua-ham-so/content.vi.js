/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giới hạn của hàm số: giới hạn hữu hạn tại một điểm, các phép toán về giới hạn, giới hạn một bên, giới hạn tại vô cực và giới hạn vô cực.',
  intro:
    'Hàm số $f(x) = \\dfrac{x^2 - 1}{x - 1}$ không xác định tại $x = 1$, vì khi đó cả tử và mẫu đều bằng $0$. Thế nhưng khi $x$ càng gần $1$, giá trị $f(x)$ càng gần $2$: $f(0{,}99) = 1{,}99$, $f(1{,}001) = 2{,}001$. Bài này nói chính xác "càng gần" nghĩa là gì, bằng khái niệm giới hạn của hàm số.',
  objectives: [
    'Nhận biết giới hạn hữu hạn của hàm số tại một điểm và tính giới hạn bằng các phép toán về giới hạn.',
    'Nhận biết giới hạn một bên và dùng chúng để xét sự tồn tại của giới hạn.',
    'Tính giới hạn hữu hạn của hàm số tại vô cực và nhận biết giới hạn vô cực.',
  ],
  sections: [
    {
      heading: 'Giới hạn hữu hạn của hàm số tại một điểm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho điểm $x_0$ thuộc khoảng $K$ và hàm số $y = f(x)$ xác định trên $K$ hoặc trên $K \\setminus \\{x_0\\}$. Ta nói hàm số $f(x)$ có giới hạn là số $L$ khi $x$ dần tới $x_0$ nếu với dãy số $(x_n)$ bất kì, $x_n \\in K \\setminus \\{x_0\\}$ và $x_n \\to x_0$, ta có $f(x_n) \\to L$. Kí hiệu $\\lim\\limits_{x \\to x_0} f(x) = L$ hay $f(x) \\to L$ khi $x \\to x_0$.',
        },
        {
          type: 'p',
          text: 'Giới hạn chỉ phụ thuộc vào các giá trị của $f$ khi $x$ gần $x_0$ và $x \\ne x_0$; hàm số không cần xác định tại $x_0$. Hiển nhiên $\\lim\\limits_{x \\to x_0} c = c$ ($c$ là hằng số) và $\\lim\\limits_{x \\to x_0} x = x_0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc tính giới hạn',
          text: 'a) Nếu $\\lim\\limits_{x \\to x_0} f(x) = L$ và $\\lim\\limits_{x \\to x_0} g(x) = M$ thì $\\lim\\limits_{x \\to x_0} [f(x) \\pm g(x)] = L \\pm M$, $\\lim\\limits_{x \\to x_0} [f(x) \\cdot g(x)] = L \\cdot M$, và $\\lim\\limits_{x \\to x_0} \\dfrac{f(x)}{g(x)} = \\dfrac{L}{M}$ nếu $M \\ne 0$. b) Nếu $f(x) \\ge 0$ và $\\lim\\limits_{x \\to x_0} f(x) = L$ thì $L \\ge 0$ và $\\lim\\limits_{x \\to x_0} \\sqrt{f(x)} = \\sqrt{L}$.',
        },
        {
          type: 'p',
          text: 'Từ đó, với đa thức $P(x)$ ta có $\\lim\\limits_{x \\to x_0} P(x) = P(x_0)$. Khi gặp dạng $\\dfrac{0}{0}$, ta phân tích tử và mẫu thành nhân tử để rút gọn thừa số $x - x_0$, hoặc nhân với biểu thức liên hợp nếu có căn thức.',
        },
      ],
    },
    {
      heading: 'Giới hạn một bên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giới hạn bên phải, bên trái',
          text: 'Cho hàm số $y = f(x)$ xác định trên khoảng $(x_0; b)$. Số $L$ là giới hạn bên phải của $f(x)$ khi $x \\to x_0$ nếu với dãy số $(x_n)$ bất kì, $x_0 < x_n < b$ và $x_n \\to x_0$, ta có $f(x_n) \\to L$; kí hiệu $\\lim\\limits_{x \\to x_0^+} f(x) = L$. Tương tự, với $f$ xác định trên $(a; x_0)$ và các dãy $a < x_n < x_0$, ta có giới hạn bên trái, kí hiệu $\\lim\\limits_{x \\to x_0^-} f(x) = L$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chú ý',
          text: '$\\lim\\limits_{x \\to x_0} f(x) = L$ khi và chỉ khi $\\lim\\limits_{x \\to x_0^+} f(x) = \\lim\\limits_{x \\to x_0^-} f(x) = L$.',
        },
        {
          type: 'p',
          text: 'Giới hạn một bên thường dùng cho hàm số cho bởi nhiều công thức: bên trái $x_0$ dùng một công thức, bên phải dùng công thức khác. Nếu hai giới hạn một bên khác nhau thì hàm số không có giới hạn tại $x_0$.',
        },
      ],
    },
    {
      heading: 'Giới hạn hữu hạn của hàm số tại vô cực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; +\\infty)$. Ta nói $f(x)$ có giới hạn là số $L$ khi $x \\to +\\infty$ nếu với dãy số $(x_n)$ bất kì, $x_n > a$ và $x_n \\to +\\infty$, ta có $f(x_n) \\to L$; kí hiệu $\\lim\\limits_{x \\to +\\infty} f(x) = L$. Giới hạn $\\lim\\limits_{x \\to -\\infty} f(x) = L$ được định nghĩa tương tự trên khoảng $(-\\infty; b)$.',
        },
        {
          type: 'list',
          items: [
            '$\\lim\\limits_{x \\to \\pm\\infty} c = c$ và $\\lim\\limits_{x \\to \\pm\\infty} \\dfrac{c}{x^k} = 0$ với $c$ là hằng số, $k$ là số nguyên dương.',
            'Các quy tắc tính giới hạn (tổng, hiệu, tích, thương, căn) vẫn đúng khi $x \\to +\\infty$ hoặc $x \\to -\\infty$.',
            'Với phân thức, chia tử và mẫu cho luỹ thừa cao nhất của $x$ ở mẫu. Khi $x \\to -\\infty$ và có $\\sqrt{x^2}$, nhớ rằng $\\sqrt{x^2} = |x| = -x$ vì $x < 0$.',
          ],
        },
      ],
    },
    {
      heading: 'Giới hạn vô cực của hàm số',
      blocks: [
        {
          type: 'p',
          text: 'Ta nói $f(x)$ có giới hạn $+\\infty$ khi $x \\to x_0^+$ nếu với dãy số $(x_n)$ bất kì, $x_n > x_0$, $x_n \\to x_0$, ta có $f(x_n) \\to +\\infty$; kí hiệu $\\lim\\limits_{x \\to x_0^+} f(x) = +\\infty$. Các giới hạn $-\\infty$, giới hạn bên trái và giới hạn vô cực khi $x \\to \\pm\\infty$ được định nghĩa tương tự.',
        },
        {
          type: 'list',
          items: [
            '$\\lim\\limits_{x \\to a^+} \\dfrac{1}{x - a} = +\\infty$ và $\\lim\\limits_{x \\to a^-} \\dfrac{1}{x - a} = -\\infty$.',
            '$\\lim\\limits_{x \\to +\\infty} x^k = +\\infty$ với $k$ nguyên dương; $\\lim\\limits_{x \\to -\\infty} x^k = +\\infty$ nếu $k$ chẵn, $= -\\infty$ nếu $k$ lẻ.',
            'Nếu $\\lim f(x) = L > 0$ và $\\lim g(x) = 0$ với $g(x) > 0$ (khi $x$ đủ gần $x_0$ về phía đang xét) thì $\\lim \\dfrac{f(x)}{g(x)} = +\\infty$; nếu $g(x) < 0$ thì giới hạn là $-\\infty$. Với $L < 0$ thì đổi dấu kết quả.',
            'Nếu $\\lim f(x) = L \\ne 0$ và $\\lim g(x) = \\pm\\infty$ thì $\\lim [f(x) g(x)] = \\pm\\infty$, dấu theo quy tắc nhân dấu của $L$ và của $g(x)$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Hai phía tiến về x₀',
    instruction:
      'Chọn một hàm số rồi giảm khoảng cách $h$: điểm xanh $x_0 - h$ tiến tới $x_0$ từ bên trái, điểm cam $x_0 + h$ tiến từ bên phải. Bật "Phóng to quanh x₀" để cửa sổ thu nhỏ theo $h$. So sánh hai giá trị trong bảng: chúng có dần tới cùng một số không?',
  },
  examples: [
    {
      problem: 'Tính $\\lim\\limits_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$.',
      steps: [
        'Thay $x = 2$ được dạng $\\dfrac{0}{0}$, nên phân tích tử thành nhân tử: $x^2 - 4 = (x - 2)(x + 2)$.',
        'Với $x \\ne 2$: $\\dfrac{x^2 - 4}{x - 2} = x + 2$.',
        '$\\lim\\limits_{x \\to 2} \\dfrac{x^2 - 4}{x - 2} = \\lim\\limits_{x \\to 2} (x + 2) = 4$.',
      ],
      answer: '$4$.',
    },
    {
      problem: 'Tính $\\lim\\limits_{x \\to 1} \\dfrac{\\sqrt{x + 3} - 2}{x - 1}$.',
      steps: [
        'Nhân tử và mẫu với biểu thức liên hợp $\\sqrt{x + 3} + 2$: $\\dfrac{(x + 3) - 4}{(x - 1)\\left(\\sqrt{x + 3} + 2\\right)} = \\dfrac{1}{\\sqrt{x + 3} + 2}$ với $x \\ne 1$.',
        '$\\lim\\limits_{x \\to 1} \\dfrac{1}{\\sqrt{x + 3} + 2} = \\dfrac{1}{\\sqrt{4} + 2} = \\dfrac{1}{4}$.',
      ],
      answer: '$\\dfrac{1}{4}$.',
    },
    {
      problem:
        'Cho $f(x) = \\begin{cases} x^2 + 1 & \\text{nếu } x \\le 1 \\\\ 3 - x & \\text{nếu } x > 1 \\end{cases}$. Tìm $\\lim\\limits_{x \\to 1^-} f(x)$, $\\lim\\limits_{x \\to 1^+} f(x)$ và $\\lim\\limits_{x \\to 1} f(x)$ (nếu có).',
      steps: [
        'Khi $x < 1$: $f(x) = x^2 + 1$, nên $\\lim\\limits_{x \\to 1^-} f(x) = 1^2 + 1 = 2$.',
        'Khi $x > 1$: $f(x) = 3 - x$, nên $\\lim\\limits_{x \\to 1^+} f(x) = 3 - 1 = 2$.',
        'Hai giới hạn một bên bằng nhau nên $\\lim\\limits_{x \\to 1} f(x) = 2$.',
      ],
      answer: 'Cả ba giới hạn đều bằng $2$.',
    },
    {
      problem:
        'Tính $\\lim\\limits_{x \\to +\\infty} \\dfrac{2x^2 - x}{x^2 + 1}$ và $\\lim\\limits_{x \\to -\\infty} \\dfrac{\\sqrt{x^2 + 1}}{x}$.',
      steps: [
        'Chia tử và mẫu cho $x^2$: $\\dfrac{2 - \\frac{1}{x}}{1 + \\frac{1}{x^2}} \\to \\dfrac{2}{1} = 2$ khi $x \\to +\\infty$.',
        'Khi $x < 0$: $\\sqrt{x^2 + 1} = |x|\\sqrt{1 + \\dfrac{1}{x^2}} = -x\\sqrt{1 + \\dfrac{1}{x^2}}$.',
        'Do đó $\\dfrac{\\sqrt{x^2 + 1}}{x} = -\\sqrt{1 + \\dfrac{1}{x^2}} \\to -1$ khi $x \\to -\\infty$.',
      ],
      answer: '$2$ và $-1$.',
    },
    {
      problem: 'Tính $\\lim\\limits_{x \\to 2^+} \\dfrac{x + 1}{x - 2}$.',
      steps: [
        '$\\lim\\limits_{x \\to 2^+} (x + 1) = 3 > 0$.',
        '$\\lim\\limits_{x \\to 2^+} (x - 2) = 0$ và $x - 2 > 0$ khi $x > 2$.',
        'Vậy $\\lim\\limits_{x \\to 2^+} \\dfrac{x + 1}{x - 2} = +\\infty$.',
      ],
      answer: '$+\\infty$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\lim\\limits_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$.',
      answer: 6,
      hints: ['Dạng $\\dfrac{0}{0}$: phân tích $x^2 - 9$ thành nhân tử.'],
      solution:
        '$\\dfrac{x^2 - 9}{x - 3} = \\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$ với $x \\ne 3$, nên giới hạn bằng $3 + 3 = 6$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim\\limits_{x \\to 1} \\dfrac{x^2 - 3x + 2}{x^2 - 1}$.',
      answer: [-1, 2],
      hints: [
        'Cả tử và mẫu đều có nghiệm $x = 1$, nên đều chứa thừa số $x - 1$.',
        '$x^2 - 3x + 2 = (x - 1)(x - 2)$.',
      ],
      solution:
        '$\\dfrac{(x - 1)(x - 2)}{(x - 1)(x + 1)} = \\dfrac{x - 2}{x + 1}$ với $x \\ne 1$, nên giới hạn bằng $\\dfrac{1 - 2}{1 + 1} = -\\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim\\limits_{x \\to 0} \\dfrac{\\sqrt{x + 9} - 3}{x}$.',
      answer: [1, 6],
      hints: ['Nhân tử và mẫu với $\\sqrt{x + 9} + 3$.'],
      solution:
        '$\\dfrac{\\sqrt{x + 9} - 3}{x} = \\dfrac{x}{x\\left(\\sqrt{x + 9} + 3\\right)} = \\dfrac{1}{\\sqrt{x + 9} + 3} \\to \\dfrac{1}{3 + 3} = \\dfrac{1}{6}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $f(x) = \\begin{cases} x + 3 & \\text{nếu } x < 2 \\\\ 2x - 1 & \\text{nếu } x \\ge 2 \\end{cases}$. Tính $\\lim\\limits_{x \\to 2^-} f(x)$.',
      answer: 5,
      hints: ['Khi $x \\to 2^-$ thì $x < 2$: dùng công thức của nhánh bên trái.'],
      solution:
        'Với $x < 2$: $f(x) = x + 3$, nên $\\lim\\limits_{x \\to 2^-} f(x) = 2 + 3 = 5$. (Bên phải: $\\lim\\limits_{x \\to 2^+} f(x) = 3$, nên hàm số không có giới hạn tại $2$.)',
    },
    {
      type: 'choice',
      prompt:
        'Cho $g(x) = \\begin{cases} 2x - 1 & \\text{nếu } x < 2 \\\\ x^2 - 1 & \\text{nếu } x \\ge 2 \\end{cases}$. Khẳng định nào đúng?',
      options: [
        '$\\lim\\limits_{x \\to 2} g(x) = 3$',
        'Không tồn tại $\\lim\\limits_{x \\to 2} g(x)$',
        '$\\lim\\limits_{x \\to 2} g(x) = 4$',
        '$\\lim\\limits_{x \\to 2} g(x) = 1$',
      ],
      answer: 0,
      hints: ['Tính riêng giới hạn bên trái và giới hạn bên phải tại $2$.'],
      solution:
        '$\\lim\\limits_{x \\to 2^-} g(x) = 2 \\cdot 2 - 1 = 3$ và $\\lim\\limits_{x \\to 2^+} g(x) = 2^2 - 1 = 3$. Hai giới hạn một bên bằng nhau nên $\\lim\\limits_{x \\to 2} g(x) = 3$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim\\limits_{x \\to +\\infty} \\dfrac{3x^2 + x}{2x^2 - 5}$.',
      answer: [3, 2],
      hints: ['Chia tử và mẫu cho $x^2$.'],
      solution:
        '$\\dfrac{3 + \\frac{1}{x}}{2 - \\frac{5}{x^2}} \\to \\dfrac{3}{2}$ khi $x \\to +\\infty$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\lim\\limits_{x \\to -\\infty} \\dfrac{2x + 1}{\\sqrt{x^2 + 3}}$.',
      answer: -2,
      hints: [
        'Khi $x < 0$ thì $\\sqrt{x^2} = -x$.',
        'Viết $\\sqrt{x^2 + 3} = -x\\sqrt{1 + \\dfrac{3}{x^2}}$ rồi chia tử và mẫu cho $x$.',
      ],
      solution:
        'Với $x < 0$: $\\dfrac{2x + 1}{\\sqrt{x^2 + 3}} = \\dfrac{2x + 1}{-x\\sqrt{1 + \\frac{3}{x^2}}} = \\dfrac{2 + \\frac{1}{x}}{-\\sqrt{1 + \\frac{3}{x^2}}} \\to \\dfrac{2}{-1} = -2$.',
    },
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim\\limits_{x \\to 1^-} \\dfrac{2}{x - 1}$ bằng',
      options: ['$-\\infty$', '$+\\infty$', '$0$', '$2$'],
      answer: 0,
      hints: ['Xét dấu của $x - 1$ khi $x < 1$.'],
      solution:
        'Tử $2 > 0$; khi $x \\to 1^-$ thì $x - 1 \\to 0$ và $x - 1 < 0$. Vậy $\\lim\\limits_{x \\to 1^-} \\dfrac{2}{x - 1} = -\\infty$.',
    },
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim\\limits_{x \\to -\\infty} \\left(x^3 - 2x + 1\\right)$ bằng',
      options: ['$-\\infty$', '$+\\infty$', '$1$', '$0$'],
      answer: 0,
      hints: ['Đặt $x^3$ làm nhân tử chung.', '$x^3 \\to -\\infty$ khi $x \\to -\\infty$.'],
      solution:
        '$x^3 - 2x + 1 = x^3\\left(1 - \\dfrac{2}{x^2} + \\dfrac{1}{x^3}\\right)$ với $\\lim\\limits_{x \\to -\\infty} x^3 = -\\infty$ và nhân tử còn lại dần tới $1 > 0$. Vậy giới hạn bằng $-\\infty$.',
    },
  ],
  takeaways: [
    '$\\lim\\limits_{x \\to x_0} f(x) = L$: mọi dãy $x_n \\to x_0$ ($x_n \\ne x_0$) đều cho $f(x_n) \\to L$; $f$ không cần xác định tại $x_0$.',
    'Dạng $\\dfrac{0}{0}$: rút gọn thừa số $x - x_0$, hoặc nhân liên hợp khi có căn.',
    '$\\lim\\limits_{x \\to x_0} f(x) = L \\iff \\lim\\limits_{x \\to x_0^-} f(x) = \\lim\\limits_{x \\to x_0^+} f(x) = L$.',
    'Tại vô cực: $\\lim \\dfrac{c}{x^k} = 0$; chia cho luỹ thừa cao nhất của mẫu; khi $x \\to -\\infty$ thì $\\sqrt{x^2} = -x$.',
  ],
};
