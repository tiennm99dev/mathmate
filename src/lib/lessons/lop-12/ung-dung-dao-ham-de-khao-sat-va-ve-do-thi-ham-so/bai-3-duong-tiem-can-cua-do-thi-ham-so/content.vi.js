/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường tiệm cận ngang, tiệm cận đứng và tiệm cận xiên của đồ thị hàm số: định nghĩa bằng giới hạn và cách tìm, nhất là với hàm phân thức.',
  intro:
    'Nhìn đồ thị của hàm số $y = \\dfrac{1}{x}$ từ thật xa, hai nhánh của nó gần như nằm sát lên hai trục toạ độ. Những đường thẳng mà đồ thị "bám sát" khi điểm trên đồ thị chạy ra xa vô tận được gọi là đường tiệm cận. Biết các tiệm cận, ta hình dung được dáng của đồ thị ở những chỗ không thể vẽ hết.',
  objectives: [
    'Nhận biết đường tiệm cận ngang, tiệm cận đứng, tiệm cận xiên của đồ thị hàm số.',
    'Tìm các đường tiệm cận bằng giới hạn, đặc biệt với hàm phân thức.',
  ],
  sections: [
    {
      heading: 'Đường tiệm cận ngang',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng $y = m$ được gọi là đường tiệm cận ngang (gọi tắt là tiệm cận ngang) của đồ thị hàm số $y = f(x)$ nếu $\\lim\\limits_{x \\to +\\infty} f(x) = m$ hoặc $\\lim\\limits_{x \\to -\\infty} f(x) = m$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, với $y = \\dfrac{2x - 1}{x + 1}$ ta có $\\lim\\limits_{x \\to \\pm\\infty} \\dfrac{2x - 1}{x + 1} = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{2 - \\frac{1}{x}}{1 + \\frac{1}{x}} = 2$, nên đường thẳng $y = 2$ là tiệm cận ngang của đồ thị.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Đồ thị có thể có hai tiệm cận ngang khác nhau ứng với $x \\to +\\infty$ và $x \\to -\\infty$, và có thể cắt tiệm cận ngang của nó: $y = \\dfrac{x}{x^2 + 1}$ có tiệm cận ngang $y = 0$ nhưng đồ thị đi qua gốc toạ độ.',
        },
      ],
    },
    {
      heading: 'Đường tiệm cận đứng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng $x = x_0$ được gọi là đường tiệm cận đứng (gọi tắt là tiệm cận đứng) của đồ thị hàm số $y = f(x)$ nếu ít nhất một trong các điều kiện sau được thoả mãn: $\\lim\\limits_{x \\to x_0^+} f(x) = +\\infty$; $\\lim\\limits_{x \\to x_0^-} f(x) = -\\infty$; $\\lim\\limits_{x \\to x_0^+} f(x) = -\\infty$; $\\lim\\limits_{x \\to x_0^-} f(x) = +\\infty$.',
        },
        {
          type: 'p',
          text: 'Với hàm phân thức, tiệm cận đứng thường nằm tại nghiệm của mẫu. Tuy nhiên phải kiểm tra giới hạn: nếu tử và mẫu cùng có nhân tử $(x - x_0)$ thì sau khi rút gọn, $f(x)$ có thể có giới hạn hữu hạn tại $x_0$ và $x = x_0$ không phải tiệm cận đứng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hàm số phân thức bậc nhất trên bậc nhất',
          text: 'Đồ thị hàm số $y = \\dfrac{ax + b}{cx + d}$ ($c \\ne 0$, $ad - bc \\ne 0$) có tiệm cận đứng $x = -\\dfrac{d}{c}$ và tiệm cận ngang $y = \\dfrac{a}{c}$.',
        },
      ],
    },
    {
      heading: 'Đường tiệm cận xiên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng $y = ax + b$ ($a \\ne 0$) được gọi là đường tiệm cận xiên (gọi tắt là tiệm cận xiên) của đồ thị hàm số $y = f(x)$ nếu $\\lim\\limits_{x \\to +\\infty} [f(x) - (ax + b)] = 0$ hoặc $\\lim\\limits_{x \\to -\\infty} [f(x) - (ax + b)] = 0$.',
        },
        {
          type: 'p',
          text: 'Cách tìm hệ số: đường thẳng $y = ax + b$ ($a \\ne 0$) là tiệm cận xiên của đồ thị khi $x \\to +\\infty$ khi và chỉ khi',
        },
        {
          type: 'tex',
          tex: 'a = \\lim_{x \\to +\\infty} \\frac{f(x)}{x}, \\qquad b = \\lim_{x \\to +\\infty} [f(x) - ax]',
        },
        {
          type: 'p',
          text: 'và tương tự khi $x \\to -\\infty$. Với hàm phân thức mà bậc của tử lớn hơn bậc của mẫu một đơn vị, ta chia tử cho mẫu: $f(x) = ax + b + \\dfrac{r(x)}{q(x)}$ với phần dư $\\dfrac{r(x)}{q(x)} \\to 0$, khi đó $y = ax + b$ là tiệm cận xiên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng xa đồ thị phân thức',
    instruction:
      'Chọn một hàm số rồi kéo thanh "Phóng xa". Điểm tím chạy ra xa theo cửa sổ: khi $x \\to \\pm\\infty$, đoạn tím nối nó với tiệm cận ngang hoặc xiên ngắn dần về $0$; khi $x$ tiến sát tiệm cận đứng, $|f(x)|$ lớn dần không giới hạn.',
  },
  examples: [
    {
      problem:
        'Tìm các đường tiệm cận đứng và ngang của đồ thị hàm số $y = \\dfrac{2x - 1}{x + 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{-1\\}$.',
        '$\\lim\\limits_{x \\to +\\infty} y = \\lim\\limits_{x \\to -\\infty} y = 2$ nên $y = 2$ là tiệm cận ngang.',
        'Khi $x \\to -1^+$: tử $2x - 1 \\to -3$, mẫu $x + 1 \\to 0^+$, nên $\\lim\\limits_{x \\to -1^+} y = -\\infty$. Vậy $x = -1$ là tiệm cận đứng (cũng có $\\lim\\limits_{x \\to -1^-} y = +\\infty$).',
      ],
      answer: 'Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2$.',
    },
    {
      problem: 'Tìm các đường tiệm cận của đồ thị hàm số $y = \\dfrac{x^2 + x + 1}{x - 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$. Khi $x \\to 1^+$, tử $\\to 3$, mẫu $\\to 0^+$, nên $\\lim\\limits_{x \\to 1^+} y = +\\infty$: $x = 1$ là tiệm cận đứng.',
        '$a = \\lim\\limits_{x \\to +\\infty} \\dfrac{y}{x} = \\lim\\limits_{x \\to +\\infty} \\dfrac{x^2 + x + 1}{x^2 - x} = 1$.',
        '$b = \\lim\\limits_{x \\to +\\infty} (y - x) = \\lim\\limits_{x \\to +\\infty} \\dfrac{x^2 + x + 1 - x^2 + x}{x - 1} = \\lim\\limits_{x \\to +\\infty} \\dfrac{2x + 1}{x - 1} = 2$.',
        'Tương tự khi $x \\to -\\infty$. Kiểm tra lại: $y = x + 2 + \\dfrac{3}{x - 1}$ và $\\dfrac{3}{x - 1} \\to 0$.',
      ],
      answer: 'Tiệm cận đứng $x = 1$, tiệm cận xiên $y = x + 2$.',
    },
    {
      problem:
        'Tìm các đường tiệm cận đứng và ngang của đồ thị hàm số $y = \\dfrac{x^2 - 3x + 2}{x^2 - 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{-1; 1\\}$.',
        '$\\lim\\limits_{x \\to \\pm\\infty} y = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{1 - \\frac{3}{x} + \\frac{2}{x^2}}{1 - \\frac{1}{x^2}} = 1$: tiệm cận ngang $y = 1$.',
        'Với $x \\ne \\pm 1$: $y = \\dfrac{(x - 1)(x - 2)}{(x - 1)(x + 1)} = \\dfrac{x - 2}{x + 1}$.',
        '$\\lim\\limits_{x \\to 1} y = \\dfrac{1 - 2}{1 + 1} = -\\dfrac{1}{2}$ hữu hạn, nên $x = 1$ không phải tiệm cận đứng; $\\lim\\limits_{x \\to -1^+} y = -\\infty$ nên $x = -1$ là tiệm cận đứng.',
      ],
      answer: 'Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đồ thị hàm số $y = \\dfrac{3x + 1}{x - 2}$ có tiệm cận đứng và tiệm cận ngang lần lượt là',
      options: [
        '$x = 2$ và $y = 3$',
        '$x = -2$ và $y = 3$',
        '$x = 3$ và $y = 2$',
        '$x = 2$ và $y = -\\dfrac{1}{2}$',
      ],
      answer: 0,
      hints: [
        'Tiệm cận đứng tại nghiệm của mẫu (tử khác $0$ ở đó).',
        'Tiệm cận ngang $y = \\dfrac{a}{c}$, tỉ số hai hệ số của $x$.',
      ],
      solution:
        'Mẫu bằng $0$ tại $x = 2$ và tử bằng $7 \\ne 0$ ở đó, nên tiệm cận đứng là $x = 2$. $\\lim\\limits_{x \\to \\pm\\infty} y = \\dfrac{3}{1} = 3$, nên tiệm cận ngang là $y = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị hàm số $y = \\dfrac{x + 1}{x^2 - 4}$ có tất cả bao nhiêu đường tiệm cận đứng và tiệm cận ngang?',
      answer: 3,
      hints: [
        'Mẫu có hai nghiệm $x = \\pm 2$, tử khác $0$ tại cả hai.',
        'Bậc của tử nhỏ hơn bậc của mẫu thì $y \\to 0$ khi $x \\to \\pm\\infty$.',
      ],
      solution:
        'Hai tiệm cận đứng $x = -2$ và $x = 2$ (tử bằng $-1$ và $3$, khác $0$), một tiệm cận ngang $y = 0$. Tổng cộng $3$ đường tiệm cận.',
    },
    {
      type: 'choice',
      prompt: 'Tiệm cận xiên của đồ thị hàm số $y = \\dfrac{2x^2 - 3x + 1}{x + 1}$ là',
      options: ['$y = 2x - 5$', '$y = 2x - 3$', '$y = 2x + 5$', '$y = x - 5$'],
      answer: 0,
      hints: ['Chia $2x^2 - 3x + 1$ cho $x + 1$.', '$2x^2 - 3x + 1 = (x + 1)(2x - 5) + 6$.'],
      solution:
        '$y = 2x - 5 + \\dfrac{6}{x + 1}$ và $\\dfrac{6}{x + 1} \\to 0$ khi $x \\to \\pm\\infty$, nên tiệm cận xiên là $y = 2x - 5$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị hàm số $y = \\dfrac{x^2 - 4}{x^2 - 3x + 2}$ có bao nhiêu đường tiệm cận đứng?',
      answer: 1,
      hints: [
        'Mẫu $x^2 - 3x + 2 = (x - 1)(x - 2)$ có hai nghiệm, nhưng tử cũng chứa $(x - 2)$.',
        'Rút gọn rồi tính giới hạn tại $x = 2$.',
      ],
      solution:
        'Với $x \\ne 1, x \\ne 2$: $y = \\dfrac{(x - 2)(x + 2)}{(x - 1)(x - 2)} = \\dfrac{x + 2}{x - 1}$. $\\lim\\limits_{x \\to 2} y = 4$ hữu hạn nên $x = 2$ không là tiệm cận đứng; $\\lim\\limits_{x \\to 1^+} y = +\\infty$ nên $x = 1$ là tiệm cận đứng. Vậy có $1$ tiệm cận đứng.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = \\dfrac{\\sqrt{x^2 + 1}}{x}$ có bao nhiêu đường tiệm cận ngang?',
      answer: 2,
      hints: [
        'Xét riêng $x \\to +\\infty$ và $x \\to -\\infty$.',
        'Khi $x < 0$ thì $\\sqrt{x^2} = |x| = -x$.',
      ],
      solution:
        '$\\lim\\limits_{x \\to +\\infty} \\dfrac{x\\sqrt{1 + \\frac{1}{x^2}}}{x} = 1$ và $\\lim\\limits_{x \\to -\\infty} \\dfrac{-x\\sqrt{1 + \\frac{1}{x^2}}}{x} = -1$. Đồ thị có hai tiệm cận ngang $y = 1$ và $y = -1$.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị hàm số $y = x + \\dfrac{1}{x}$ có các đường tiệm cận nào?',
      options: [
        'Tiệm cận đứng $x = 0$ và tiệm cận xiên $y = x$.',
        'Tiệm cận đứng $x = 0$ và tiệm cận ngang $y = 1$.',
        'Chỉ có tiệm cận đứng $x = 0$.',
        'Tiệm cận ngang $y = 0$ và tiệm cận xiên $y = x$.',
      ],
      answer: 0,
      hints: [
        'Tính $\\lim\\limits_{x \\to 0^+} y$.',
        '$y - x = \\dfrac{1}{x}$ dần tới đâu khi $x \\to \\pm\\infty$?',
      ],
      solution:
        '$\\lim\\limits_{x \\to 0^+} y = +\\infty$ nên $x = 0$ là tiệm cận đứng. $y - x = \\dfrac{1}{x} \\to 0$ khi $x \\to \\pm\\infty$ nên $y = x$ là tiệm cận xiên. Đồ thị không có tiệm cận ngang vì $y \\to \\pm\\infty$ khi $x \\to \\pm\\infty$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị hàm số $y = \\dfrac{ax + 1}{x + b}$ có tiệm cận đứng $x = 2$ và tiệm cận ngang $y = 3$. Tính $a + b$.',
      answer: 1,
      hints: ['Tiệm cận đứng là nghiệm của mẫu $x + b$.', 'Tiệm cận ngang là $y = \\dfrac{a}{1}$.'],
      solution:
        'Tiệm cận đứng $x = -b = 2$ nên $b = -2$; tiệm cận ngang $y = a = 3$. Khi đó $y = \\dfrac{3x + 1}{x - 2}$ có $ad - bc = 3 \\cdot (-2) - 1 \\cdot 1 = -7 \\ne 0$, thoả mãn. Vậy $a + b = 3 + (-2) = 1$.',
    },
  ],
  takeaways: [
    'Tiệm cận ngang $y = m$: $\\lim\\limits_{x \\to +\\infty} f(x) = m$ hoặc $\\lim\\limits_{x \\to -\\infty} f(x) = m$.',
    'Tiệm cận đứng $x = x_0$: ít nhất một giới hạn một bên của $f(x)$ tại $x_0$ bằng $+\\infty$ hoặc $-\\infty$.',
    'Tiệm cận xiên $y = ax + b$ ($a \\ne 0$): $f(x) - (ax + b) \\to 0$; tìm $a = \\lim \\dfrac{f(x)}{x}$, $b = \\lim [f(x) - ax]$.',
    'Với hàm phân thức, nghiệm của mẫu chỉ là tiệm cận đứng khi giới hạn tại đó là vô cực: rút gọn trước khi kết luận.',
  ],
};
