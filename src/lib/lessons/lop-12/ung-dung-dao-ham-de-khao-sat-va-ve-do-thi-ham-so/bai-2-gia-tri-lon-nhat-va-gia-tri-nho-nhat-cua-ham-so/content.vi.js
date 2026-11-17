/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giá trị lớn nhất, giá trị nhỏ nhất của hàm số trên một tập; cách tìm trên một đoạn bằng cách so sánh giá trị tại các điểm có đạo hàm bằng 0 và tại hai đầu mút, và trên một khoảng bằng bảng biến thiên.',
  intro:
    'Một quả bóng được ném lên, độ cao của nó thay đổi theo thời gian. Bóng lên cao nhất bao nhiêu? Nhiệt độ trong ngày thấp nhất là bao nhiêu? Đó là những câu hỏi về giá trị lớn nhất và giá trị nhỏ nhất của một hàm số. Đạo hàm giúp ta trả lời chúng mà không cần vẽ chính xác đồ thị.',
  objectives: [
    'Nhận biết giá trị lớn nhất, giá trị nhỏ nhất của hàm số trên một tập.',
    'Tìm giá trị lớn nhất, giá trị nhỏ nhất của hàm số liên tục trên một đoạn.',
    'Dùng bảng biến thiên để tìm giá trị lớn nhất, giá trị nhỏ nhất của hàm số trên một khoảng.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hàm số $y = f(x)$ xác định trên tập $D$. Số $M$ được gọi là giá trị lớn nhất của hàm số $y = f(x)$ trên tập $D$ nếu $f(x) \\le M$ với mọi $x \\in D$ và tồn tại $x_0 \\in D$ sao cho $f(x_0) = M$. Kí hiệu $M = \\max\\limits_{x \\in D} f(x)$ hoặc $M = \\max\\limits_{D} f(x)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số $m$ được gọi là giá trị nhỏ nhất của hàm số $y = f(x)$ trên tập $D$ nếu $f(x) \\ge m$ với mọi $x \\in D$ và tồn tại $x_0 \\in D$ sao cho $f(x_0) = m$. Kí hiệu $m = \\min\\limits_{x \\in D} f(x)$ hoặc $m = \\min\\limits_{D} f(x)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi nói giá trị lớn nhất, giá trị nhỏ nhất của hàm số $f(x)$ mà không nói "trên tập $D$" thì ta hiểu đó là giá trị lớn nhất, giá trị nhỏ nhất trên tập xác định của hàm số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cả hai điều kiện đều cần',
          text: 'Có $f(x) \\le M$ với mọi $x \\in D$ thôi chưa đủ: giá trị $M$ còn phải đạt được tại một điểm $x_0 \\in D$. Chẳng hạn trên khoảng $(0; 1)$, hàm số $y = x$ luôn nhỏ hơn $1$ nhưng không bao giờ bằng $1$, nên không có giá trị lớn nhất trên khoảng này.',
        },
      ],
    },
    {
      heading: 'Giá trị lớn nhất, nhỏ nhất trên một khoảng',
      blocks: [
        {
          type: 'p',
          text: 'Để tìm giá trị lớn nhất, giá trị nhỏ nhất của hàm số trên một khoảng, ta thường lập bảng biến thiên của hàm số trên khoảng đó rồi đọc kết quả từ bảng. Nếu trên khoảng $K$ hàm số chỉ có một điểm cực trị $x_0$ là điểm cực tiểu thì $f(x_0)$ là giá trị nhỏ nhất của hàm số trên $K$; tương tự với điểm cực đại và giá trị lớn nhất.',
        },
        {
          type: 'table',
          caption: 'Chiều biến thiên của $y = x + \\dfrac{4}{x}$ trên khoảng $(0; +\\infty)$',
          head: ['$x$', '$(0; 2)$', '$2$', '$(2; +\\infty)$'],
          rows: [
            ["$y'$", '$-$', '$0$', '$+$'],
            ['$y$', 'giảm từ $+\\infty$ xuống $4$', '$4$', 'tăng từ $4$ lên $+\\infty$'],
          ],
        },
        {
          type: 'p',
          text: 'Từ bảng: $\\min\\limits_{(0; +\\infty)} y = 4$, đạt tại $x = 2$; hàm số không có giá trị lớn nhất trên $(0; +\\infty)$ vì $y$ lớn tuỳ ý khi $x$ dần tới $0$ hoặc tới $+\\infty$.',
        },
      ],
    },
    {
      heading: 'Giá trị lớn nhất, nhỏ nhất trên một đoạn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Mọi hàm số liên tục trên một đoạn đều có giá trị lớn nhất và giá trị nhỏ nhất trên đoạn đó.',
        },
        {
          type: 'p',
          text: 'Giá trị lớn nhất, nhỏ nhất trên đoạn $[a; b]$ chỉ có thể đạt tại hai đầu mút hoặc tại các điểm bên trong mà đạo hàm bằng $0$ hay không tồn tại. Từ đó có quy tắc:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "Tìm các điểm $x_1, x_2, \\ldots, x_n$ thuộc khoảng $(a; b)$ mà tại đó $f'(x) = 0$ hoặc $f'(x)$ không tồn tại.",
            'Tính $f(x_1), f(x_2), \\ldots, f(x_n), f(a)$ và $f(b)$.',
            'Tìm số lớn nhất $M$ và số nhỏ nhất $m$ trong các số trên. Ta có $M = \\max\\limits_{[a; b]} f(x)$, $m = \\min\\limits_{[a; b]} f(x)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Chỉ lấy các điểm $x_i$ nằm trong khoảng $(a; b)$. Điểm có đạo hàm bằng $0$ nằm ngoài đoạn thì bỏ đi, dù nó là điểm cực trị của hàm số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo hai đầu mút của đoạn',
    instruction:
      'Kéo các điểm $a$ và $b$ trên trục hoành (hoặc chọn một điểm rồi dùng phím mũi tên). Điểm đỏ đánh dấu nơi hàm số đạt giá trị lớn nhất, điểm xanh nơi đạt giá trị nhỏ nhất. Đổi sang khoảng $(a; b)$ để thấy khi nào giá trị lớn nhất hay nhỏ nhất không tồn tại.',
  },
  examples: [
    {
      problem:
        'Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = x^3 - 3x + 1$ trên đoạn $[0; 2]$.',
      steps: [
        "$y' = 3x^2 - 3$; $y' = 0 \\Leftrightarrow x = 1$ hoặc $x = -1$. Trong khoảng $(0; 2)$ chỉ có $x = 1$.",
        '$y(0) = 1$, $y(1) = 1 - 3 + 1 = -1$, $y(2) = 8 - 6 + 1 = 3$.',
        'So sánh ba số $1$, $-1$, $3$.',
      ],
      answer:
        '$\\max\\limits_{[0; 2]} y = 3$ tại $x = 2$; $\\min\\limits_{[0; 2]} y = -1$ tại $x = 1$.',
    },
    {
      problem: 'Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số $y = \\sqrt{4 - x^2}$.',
      steps: [
        'Tập xác định: $4 - x^2 \\ge 0 \\Leftrightarrow -2 \\le x \\le 2$, tức là $D = [-2; 2]$.',
        "Trên $(-2; 2)$: $y' = \\dfrac{-x}{\\sqrt{4 - x^2}}$; $y' = 0 \\Leftrightarrow x = 0$.",
        '$y(-2) = 0$, $y(0) = 2$, $y(2) = 0$.',
      ],
      answer: '$\\max y = 2$ tại $x = 0$; $\\min y = 0$ tại $x = \\pm 2$.',
    },
    {
      problem:
        'Tìm giá trị nhỏ nhất của hàm số $y = x + \\dfrac{4}{x}$ trên khoảng $(0; +\\infty)$.',
      steps: [
        "$y' = 1 - \\dfrac{4}{x^2} = \\dfrac{x^2 - 4}{x^2}$; trên $(0; +\\infty)$, $y' = 0 \\Leftrightarrow x = 2$.",
        "$y' < 0$ trên $(0; 2)$ và $y' > 0$ trên $(2; +\\infty)$; $\\lim\\limits_{x \\to 0^+} y = +\\infty$, $\\lim\\limits_{x \\to +\\infty} y = +\\infty$.",
        'Lập bảng biến thiên: hàm số giảm rồi tăng, giá trị nhỏ nhất đạt tại $x = 2$ và bằng $2 + 2 = 4$.',
      ],
      answer:
        '$\\min\\limits_{(0; +\\infty)} y = 4$ tại $x = 2$; hàm số không có giá trị lớn nhất trên khoảng này.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = x^3 - 3x^2 - 9x + 35$ trên đoạn $[-4; 4]$.',
      answer: 40,
      hints: [
        "$y' = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$, cả hai nghiệm đều thuộc $(-4; 4)$.",
        'Tính $y(-4)$, $y(-1)$, $y(3)$, $y(4)$ rồi so sánh.',
      ],
      solution:
        '$y(-4) = -64 - 48 + 36 + 35 = -41$; $y(-1) = -1 - 3 + 9 + 35 = 40$; $y(3) = 27 - 27 - 27 + 35 = 8$; $y(4) = 64 - 48 - 36 + 35 = 15$. Vậy $\\max\\limits_{[-4; 4]} y = 40$ tại $x = -1$ (và $\\min\\limits_{[-4; 4]} y = -41$ tại $x = -4$).',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị nhỏ nhất của hàm số $y = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$.',
      answer: 2,
      hints: [
        "$y' = 4x^3 - 4x = 4x(x - 1)(x + 1)$.",
        'Trong khoảng $(0; 2)$ chỉ có $x = 1$; nhớ tính cả $y(0)$ và $y(2)$.',
      ],
      solution:
        '$y(0) = 3$, $y(1) = 1 - 2 + 3 = 2$, $y(2) = 16 - 8 + 3 = 11$. Vậy $\\min\\limits_{[0; 2]} y = 2$ tại $x = 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = \\dfrac{x - 1}{x + 1}$ trên đoạn $[0; 3]$.',
      answer: 0.5,
      hints: [
        "$y' = \\dfrac{2}{(x + 1)^2}$ có dấu gì trên $[0; 3]$?",
        'Hàm số đồng biến thì giá trị lớn nhất đạt tại đầu mút bên phải.',
      ],
      solution:
        "$y' = \\dfrac{2}{(x + 1)^2} > 0$ nên hàm số đồng biến trên $[0; 3]$. Do đó $\\max\\limits_{[0; 3]} y = y(3) = \\dfrac{2}{4} = 0{,}5$.",
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng về hàm số $y = x + \\dfrac{9}{x}$ trên khoảng $(0; +\\infty)$?',
      options: [
        'Có giá trị nhỏ nhất bằng $6$, không có giá trị lớn nhất.',
        'Có giá trị nhỏ nhất bằng $6$ và giá trị lớn nhất bằng $10$.',
        'Có giá trị lớn nhất bằng $-6$, không có giá trị nhỏ nhất.',
        'Không có giá trị lớn nhất và không có giá trị nhỏ nhất.',
      ],
      answer: 0,
      hints: [
        "$y' = 1 - \\dfrac{9}{x^2}$ bằng $0$ tại $x = 3$ trên khoảng đang xét.",
        'Lập bảng biến thiên, chú ý giới hạn khi $x \\to 0^+$ và $x \\to +\\infty$.',
      ],
      solution:
        "$y' < 0$ trên $(0; 3)$, $y' > 0$ trên $(3; +\\infty)$, và $y \\to +\\infty$ ở cả hai đầu. Vậy $\\min\\limits_{(0; +\\infty)} y = y(3) = 3 + 3 = 6$, còn giá trị lớn nhất không tồn tại.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = x\\sqrt{4 - x^2}$ trên đoạn $[0; 2]$.',
      answer: 2,
      hints: [
        "$y' = \\sqrt{4 - x^2} - \\dfrac{x^2}{\\sqrt{4 - x^2}} = \\dfrac{4 - 2x^2}{\\sqrt{4 - x^2}}$ với $0 \\le x < 2$.",
        "$y' = 0$ tại $x = \\sqrt{2}$.",
      ],
      solution:
        "$y' = 0 \\Leftrightarrow x = \\sqrt{2} \\in (0; 2)$. $y(0) = 0$, $y(\\sqrt{2}) = \\sqrt{2} \\cdot \\sqrt{2} = 2$, $y(2) = 0$. Vậy $\\max\\limits_{[0; 2]} y = 2$ tại $x = \\sqrt{2}$.",
    },
    {
      type: 'number',
      prompt:
        'Một vật chuyển động có vận tốc $v(t) = -t^2 + 6t + 2$ (m/s), với $t$ (giây) thuộc đoạn $[0; 5]$. Tìm vận tốc lớn nhất của vật.',
      answer: 11,
      unit: 'm/s',
      hints: ["$v'(t) = -2t + 6$.", 'So sánh $v(0)$, $v(3)$ và $v(5)$.'],
      solution:
        "$v'(t) = 0 \\Leftrightarrow t = 3$. $v(0) = 2$, $v(3) = -9 + 18 + 2 = 11$, $v(5) = -25 + 30 + 2 = 7$. Vận tốc lớn nhất là $11$ m/s, tại $t = 3$ s.",
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị nhỏ nhất của hàm số $y = x^2 + \\dfrac{2}{x}$ trên khoảng $(0; +\\infty)$.',
      answer: 3,
      hints: [
        "$y' = 2x - \\dfrac{2}{x^2} = \\dfrac{2(x^3 - 1)}{x^2}$.",
        "$y'$ đổi dấu từ âm sang dương tại $x = 1$.",
      ],
      solution:
        "$y' = 0 \\Leftrightarrow x = 1$; $y' < 0$ trên $(0; 1)$, $y' > 0$ trên $(1; +\\infty)$. Hàm số chỉ có một cực trị trên khoảng là cực tiểu, nên $\\min\\limits_{(0; +\\infty)} y = y(1) = 1 + 2 = 3$.",
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây luôn đúng?',
      options: [
        'Hàm số liên tục trên đoạn $[a; b]$ thì có giá trị lớn nhất và giá trị nhỏ nhất trên đoạn đó.',
        'Hàm số liên tục trên khoảng $(a; b)$ thì có giá trị lớn nhất trên khoảng đó.',
        'Giá trị lớn nhất của hàm số trên đoạn $[a; b]$ luôn đạt tại một điểm cực đại.',
        'Giá trị cực đại của hàm số luôn là giá trị lớn nhất của hàm số trên tập xác định.',
      ],
      answer: 0,
      hints: [
        'Thử $y = x$ trên $(0; 1)$ và trên $[0; 1]$.',
        'Giá trị lớn nhất trên đoạn có thể đạt tại một đầu mút.',
      ],
      solution:
        'Đúng là nhận xét: hàm số liên tục trên một đoạn luôn có giá trị lớn nhất và nhỏ nhất trên đoạn đó. Hàm số $y = x$ liên tục trên $(0; 1)$ nhưng không có giá trị lớn nhất trên khoảng đó; trên $[0; 1]$ nó đạt giá trị lớn nhất tại đầu mút $x = 1$, không phải điểm cực đại; và $y = x^3 - 3x$ có giá trị cực đại $2$ nhưng $y(3) = 18 > 2$.',
    },
  ],
  takeaways: [
    '$M = \\max\\limits_D f(x)$ khi $f(x) \\le M$ với mọi $x \\in D$ và có $x_0 \\in D$ để $f(x_0) = M$; tương tự với $\\min$.',
    "Trên đoạn $[a; b]$: so sánh $f(a)$, $f(b)$ và $f(x_i)$ tại các điểm $x_i \\in (a; b)$ có $f'(x_i) = 0$ hoặc không có đạo hàm.",
    'Trên một khoảng: lập bảng biến thiên; giá trị lớn nhất hoặc nhỏ nhất có thể không tồn tại.',
    'Hàm số liên tục trên một đoạn luôn có giá trị lớn nhất và giá trị nhỏ nhất trên đoạn đó.',
  ],
};
