/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàm số liên tục: liên tục tại một điểm, trên một khoảng, một đoạn; tính liên tục của các hàm số sơ cấp và của tổng, hiệu, tích, thương; định lí giá trị trung gian và ứng dụng chứng minh phương trình có nghiệm.',
  intro:
    'Nhiệt độ trong ngày tăng giảm dần dần chứ không nhảy vọt: muốn đi từ $20^\\circ\\mathrm{C}$ lên $30^\\circ\\mathrm{C}$, nhiệt độ phải đi qua mọi giá trị ở giữa, chẳng hạn $25^\\circ\\mathrm{C}$. Đồ thị của những đại lượng như vậy vẽ được bằng một nét liền, không phải nhấc bút. Trong toán học, ta gọi đó là hàm số liên tục.',
  objectives: [
    'Nhận biết hàm số liên tục tại một điểm, trên một khoảng, trên một đoạn.',
    'Nhận biết tính liên tục của các hàm số sơ cấp và của tổng, hiệu, tích, thương các hàm số liên tục.',
    'Tìm tham số để hàm số liên tục; dùng định lí giá trị trung gian để chứng minh phương trình có nghiệm.',
  ],
  sections: [
    {
      heading: 'Hàm số liên tục tại một điểm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hàm số $y = f(x)$ xác định trên khoảng $(a; b)$ và $x_0 \\in (a; b)$. Hàm số $y = f(x)$ được gọi là liên tục tại điểm $x_0$ nếu $\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$.',
        },
        {
          type: 'p',
          text: 'Như vậy, để xét tính liên tục của $f$ tại $x_0$, ta kiểm tra ba điều: $f$ xác định tại $x_0$; tồn tại $\\lim\\limits_{x \\to x_0} f(x)$; và giới hạn đó bằng $f(x_0)$. Hàm số không liên tục tại $x_0$ được gọi là gián đoạn tại điểm đó.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, hàm số $f(x) = \\dfrac{x^2 - 1}{x - 1}$ khi $x \\ne 1$ và $f(1) = 2$ liên tục tại $x = 1$, vì $\\lim\\limits_{x \\to 1} f(x) = \\lim\\limits_{x \\to 1} (x + 1) = 2 = f(1)$. Nếu thay $f(1) = 3$ thì giới hạn vẫn là $2$ nhưng khác $f(1)$, nên hàm số gián đoạn tại $x = 1$.',
        },
      ],
    },
    {
      heading: 'Hàm số liên tục trên một khoảng, một đoạn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hàm số $y = f(x)$ được gọi là liên tục trên khoảng $(a; b)$ nếu nó liên tục tại mọi điểm của khoảng đó. Hàm số $y = f(x)$ được gọi là liên tục trên đoạn $[a; b]$ nếu nó liên tục trên khoảng $(a; b)$ và $\\lim\\limits_{x \\to a^+} f(x) = f(a)$, $\\lim\\limits_{x \\to b^-} f(x) = f(b)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đồ thị của hàm số liên tục trên một khoảng là một "đường liền" trên khoảng đó: vẽ được mà không phải nhấc bút.',
        },
      ],
    },
    {
      heading: 'Tính liên tục của hàm số sơ cấp',
      blocks: [
        {
          type: 'list',
          items: [
            'Hàm số đa thức và các hàm số $y = \\sin x$, $y = \\cos x$ liên tục trên $\\mathbb{R}$.',
            'Hàm số phân thức hữu tỉ, hàm số căn thức và các hàm số $y = \\tan x$, $y = \\cot x$ liên tục trên từng khoảng của tập xác định của chúng.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Giả sử hai hàm số $y = f(x)$ và $y = g(x)$ liên tục tại điểm $x_0$. Khi đó các hàm số $y = f(x) + g(x)$, $y = f(x) - g(x)$ và $y = f(x) \\cdot g(x)$ liên tục tại $x_0$; hàm số $y = \\dfrac{f(x)}{g(x)}$ liên tục tại $x_0$ nếu $g(x_0) \\ne 0$.',
        },
        {
          type: 'p',
          text: 'Với hàm số cho bởi nhiều công thức, mỗi công thức là hàm sơ cấp nên hàm số liên tục trên các khoảng mở không chứa điểm nối. Tại điểm nối $x_0$, ta so sánh $\\lim\\limits_{x \\to x_0^-} f(x)$, $\\lim\\limits_{x \\to x_0^+} f(x)$ và $f(x_0)$.',
        },
      ],
    },
    {
      heading: 'Định lí giá trị trung gian',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu hàm số $y = f(x)$ liên tục trên đoạn $[a; b]$ và $f(a) \\cdot f(b) < 0$ thì tồn tại ít nhất một điểm $c \\in (a; b)$ sao cho $f(c) = 0$.',
        },
        {
          type: 'p',
          text: 'Nói cách khác, khi đó phương trình $f(x) = 0$ có ít nhất một nghiệm thuộc khoảng $(a; b)$: đồ thị liền nét đi từ dưới trục hoành lên trên (hoặc ngược lại) thì phải cắt trục hoành. Định lí chỉ khẳng định có nghiệm; để tìm gần đúng nghiệm, ta chia đôi đoạn nhiều lần, mỗi lần giữ lại nửa đoạn mà $f$ đổi dấu ở hai đầu (thử ngay bên dưới với phương trình $x^3 + x - 1 = 0$ trên đoạn $[0; 1]$).',
        },
        { type: 'widget', name: 'ivt' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Điều kiện liên tục là cần thiết: $f(x) = \\dfrac{1}{x}$ có $f(-1) \\cdot f(1) = -1 < 0$ nhưng phương trình $\\dfrac{1}{x} = 0$ vô nghiệm, vì $f$ không liên tục trên $[-1; 1]$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ không nhấc bút',
    instruction:
      'Chọn một hàm số rồi bấm "Vẽ đồ thị": bút chạy từ trái sang phải và phải nhấc lên nếu đồ thị bị đứt tại điểm nối. Kéo thanh trượt $m$ cho đến khi giới hạn bên trái, giới hạn bên phải và giá trị tại điểm nối bằng nhau, rồi vẽ lại.',
  },
  examples: [
    {
      problem:
        'Xét tính liên tục của hàm số $f(x) = \\begin{cases} \\dfrac{x^2 - 4}{x - 2} & \\text{nếu } x \\ne 2 \\\\ 4 & \\text{nếu } x = 2 \\end{cases}$ tại $x = 2$.',
      steps: [
        '$f(2) = 4$.',
        '$\\lim\\limits_{x \\to 2} f(x) = \\lim\\limits_{x \\to 2} \\dfrac{(x - 2)(x + 2)}{x - 2} = \\lim\\limits_{x \\to 2} (x + 2) = 4$.',
        'Vì $\\lim\\limits_{x \\to 2} f(x) = f(2)$ nên hàm số liên tục tại $x = 2$.',
      ],
      answer: 'Hàm số liên tục tại $x = 2$.',
    },
    {
      problem:
        'Xét tính liên tục của hàm số $f(x) = \\begin{cases} 1 + x^2 & \\text{nếu } x < 1 \\\\ 4 - x & \\text{nếu } x \\ge 1 \\end{cases}$ trên $\\mathbb{R}$.',
      steps: [
        'Trên các khoảng $(-\\infty; 1)$ và $(1; +\\infty)$, $f$ là hàm đa thức nên liên tục.',
        'Tại $x = 1$: $\\lim\\limits_{x \\to 1^-} f(x) = 1 + 1^2 = 2$ và $\\lim\\limits_{x \\to 1^+} f(x) = 4 - 1 = 3$.',
        'Hai giới hạn một bên khác nhau nên không tồn tại $\\lim\\limits_{x \\to 1} f(x)$: hàm số gián đoạn tại $x = 1$.',
      ],
      answer: 'Hàm số liên tục trên $(-\\infty; 1)$ và $(1; +\\infty)$, gián đoạn tại $x = 1$.',
    },
    {
      problem:
        'Tìm $m$ để hàm số $f(x) = \\begin{cases} x^2 + mx & \\text{nếu } x < 2 \\\\ 3x - 1 & \\text{nếu } x \\ge 2 \\end{cases}$ liên tục trên $\\mathbb{R}$.',
      steps: [
        'Trên $(-\\infty; 2)$ và $(2; +\\infty)$, $f$ là đa thức nên liên tục với mọi $m$.',
        'Tại $x = 2$: $f(2) = 3 \\cdot 2 - 1 = 5$, $\\lim\\limits_{x \\to 2^+} f(x) = 5$ và $\\lim\\limits_{x \\to 2^-} f(x) = 4 + 2m$.',
        'Hàm số liên tục tại $2$ khi $4 + 2m = 5$, tức là $m = \\dfrac{1}{2}$.',
      ],
      answer: '$m = \\dfrac{1}{2}$.',
    },
    {
      problem:
        'Chứng minh rằng phương trình $x^3 + 2x - 1 = 0$ có ít nhất một nghiệm thuộc khoảng $(0; 1)$.',
      steps: [
        'Hàm số $f(x) = x^3 + 2x - 1$ là đa thức nên liên tục trên đoạn $[0; 1]$.',
        '$f(0) = -1 < 0$ và $f(1) = 1 + 2 - 1 = 2 > 0$, nên $f(0) \\cdot f(1) < 0$.',
        'Theo định lí giá trị trung gian, tồn tại $c \\in (0; 1)$ sao cho $f(c) = 0$.',
      ],
      answer: 'Phương trình có ít nhất một nghiệm thuộc $(0; 1)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây liên tục trên $\\mathbb{R}$?',
      options: [
        '$y = x^3 - 2x + 1$',
        '$y = \\dfrac{1}{x - 1}$',
        '$y = \\tan x$',
        '$y = \\sqrt{x}$',
      ],
      answer: 0,
      hints: [
        'Hàm đa thức liên tục trên $\\mathbb{R}$; các hàm khác chỉ liên tục trên tập xác định của chúng.',
      ],
      solution:
        '$y = x^3 - 2x + 1$ là đa thức nên liên tục trên $\\mathbb{R}$. Hàm $\\dfrac{1}{x - 1}$ không xác định tại $x = 1$, $\\tan x$ không xác định tại $x = \\dfrac{\\pi}{2} + k\\pi$, $\\sqrt{x}$ không xác định khi $x < 0$.',
    },
    {
      type: 'number',
      prompt:
        'Cho các hàm số $f(x)$ và $g(x)$ liên tục tại $x = 1$, với $f(1) = 2$ và $\\lim\\limits_{x \\to 1^-} [2f(x) - g(x)] = 3$. Tính $g(1)$.',
      answer: 1,
      hints: [
        'Vì $f$, $g$ liên tục tại $1$ nên hàm $2f - g$ cũng liên tục tại $1$.',
        'Giới hạn bên trái của hàm liên tục bằng giá trị của nó tại điểm đó.',
      ],
      solution:
        'Hàm $2f(x) - g(x)$ liên tục tại $x = 1$ nên $\\lim\\limits_{x \\to 1^-} [2f(x) - g(x)] = 2f(1) - g(1) = 4 - g(1)$. Từ $4 - g(1) = 3$ suy ra $g(1) = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hàm số $f(x) = \\begin{cases} \\sin x & \\text{nếu } x \\ge 0 \\\\ -x + m & \\text{nếu } x < 0 \\end{cases}$ liên tục trên $\\mathbb{R}$.',
      answer: 0,
      hints: ['Hai nhánh đều liên tục; chỉ cần xét điểm nối $x = 0$.'],
      solution:
        '$f(0) = \\sin 0 = 0 = \\lim\\limits_{x \\to 0^+} f(x)$ và $\\lim\\limits_{x \\to 0^-} f(x) = m$. Hàm số liên tục tại $0$ khi $m = 0$; khi đó nó liên tục trên $\\mathbb{R}$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $a$ để hàm số $f(x) = \\begin{cases} \\dfrac{x^2 - 9}{x - 3} & \\text{nếu } x \\ne 3 \\\\ a & \\text{nếu } x = 3 \\end{cases}$ liên tục tại $x = 3$.',
      answer: 6,
      hints: ['Tính $\\lim\\limits_{x \\to 3} f(x)$ rồi cho bằng $f(3) = a$.'],
      solution:
        '$\\lim\\limits_{x \\to 3} \\dfrac{x^2 - 9}{x - 3} = \\lim\\limits_{x \\to 3} (x + 3) = 6$. Hàm số liên tục tại $3$ khi $a = f(3) = 6$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm $a$ để hàm số $f(x) = \\begin{cases} ax + 2 & \\text{nếu } x \\le 2 \\\\ x^2 + 1 & \\text{nếu } x > 2 \\end{cases}$ liên tục trên $\\mathbb{R}$.',
      answer: [3, 2],
      hints: ['So sánh $f(2) = 2a + 2$ với $\\lim\\limits_{x \\to 2^+} f(x)$.'],
      solution:
        '$f(2) = \\lim\\limits_{x \\to 2^-} f(x) = 2a + 2$ và $\\lim\\limits_{x \\to 2^+} f(x) = 2^2 + 1 = 5$. Liên tục tại $2$ khi $2a + 2 = 5$, tức $a = \\dfrac{3}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm $m$ để hàm số $f(x) = \\begin{cases} \\dfrac{\\sqrt{x + 3} - 2}{x - 1} & \\text{nếu } x \\ne 1 \\\\ m & \\text{nếu } x = 1 \\end{cases}$ liên tục tại $x = 1$.',
      answer: [1, 4],
      hints: ['Nhân tử và mẫu với $\\sqrt{x + 3} + 2$ để tính giới hạn tại $1$.'],
      solution:
        '$\\dfrac{\\sqrt{x + 3} - 2}{x - 1} = \\dfrac{1}{\\sqrt{x + 3} + 2} \\to \\dfrac{1}{4}$ khi $x \\to 1$. Vậy $m = \\dfrac{1}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Hàm số $f(x) = \\dfrac{x}{x^2 + 5x + 6}$ liên tục trên những khoảng nào sau đây?',
      options: ['$(-\\infty; -3)$', '$(-3; -2)$', '$(-2; +\\infty)$', '$(-3; 0)$', '$\\mathbb{R}$'],
      answers: [0, 1, 2],
      hints: [
        'Hàm phân thức liên tục trên từng khoảng của tập xác định.',
        'Giải $x^2 + 5x + 6 = 0$ để tìm các điểm loại khỏi tập xác định.',
      ],
      solution:
        '$x^2 + 5x + 6 = 0 \\iff x = -2$ hoặc $x = -3$. Tập xác định là $(-\\infty; -3) \\cup (-3; -2) \\cup (-2; +\\infty)$, và $f$ liên tục trên từng khoảng đó. Khoảng $(-3; 0)$ chứa $-2$ còn $\\mathbb{R}$ chứa cả $-3$ và $-2$, nên $f$ không liên tục trên chúng.',
    },
    {
      type: 'choice',
      prompt:
        'Dựa vào định lí giá trị trung gian, phương trình $x^3 - 3x + 1 = 0$ chắc chắn có nghiệm thuộc khoảng nào?',
      options: ['$(0; 1)$', '$(-1; 0)$', '$(2; 3)$', '$(1; 1{,}5)$'],
      answer: 0,
      hints: [
        'Tính $f(x) = x^3 - 3x + 1$ tại hai đầu của mỗi khoảng và tìm khoảng mà $f$ đổi dấu.',
      ],
      solution:
        '$f(0) = 1 > 0$, $f(1) = -1 < 0$, nên $f(0) \\cdot f(1) < 0$ và $f$ liên tục trên $[0; 1]$: có nghiệm thuộc $(0; 1)$. Ở các khoảng khác $f$ không đổi dấu: $f(-1) = 3$, $f(0) = 1$; $f(2) = 3$, $f(3) = 19$; $f(1) = -1$, $f(1{,}5) = -0{,}125$.',
    },
    {
      type: 'choice',
      prompt:
        'Lực hấp dẫn do Trái Đất tác dụng lên một đơn vị khối lượng ở khoảng cách $r$ tính từ tâm Trái Đất là $F(r) = \\begin{cases} \\dfrac{GMr}{R^3} & \\text{nếu } 0 < r < R \\\\ \\dfrac{GM}{r^2} & \\text{nếu } r \\ge R \\end{cases}$, với $M$, $R$ là khối lượng và bán kính Trái Đất, $G$ là hằng số hấp dẫn. Hàm số $F(r)$ có liên tục tại $r = R$ không?',
      options: [
        'Có, vì cả hai giới hạn một bên đều bằng $F(R) = \\dfrac{GM}{R^2}$',
        'Không, vì $F$ cho bởi hai công thức khác nhau',
        'Không, vì giới hạn bên trái bằng $0$',
        'Không, vì $F$ không xác định tại $r = R$',
      ],
      answer: 0,
      hints: [
        'Tính $\\lim\\limits_{r \\to R^-} F(r)$, $\\lim\\limits_{r \\to R^+} F(r)$ và $F(R)$.',
      ],
      solution:
        '$\\lim\\limits_{r \\to R^-} F(r) = \\dfrac{GMR}{R^3} = \\dfrac{GM}{R^2}$, $\\lim\\limits_{r \\to R^+} F(r) = \\dfrac{GM}{R^2} = F(R)$. Ba giá trị bằng nhau nên $F$ liên tục tại $r = R$. Một hàm cho bởi hai công thức vẫn có thể liên tục tại điểm nối.',
    },
  ],
  takeaways: [
    '$f$ liên tục tại $x_0$ khi $\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$; tại điểm nối, so sánh hai giới hạn một bên với $f(x_0)$.',
    'Đa thức, $\\sin x$, $\\cos x$ liên tục trên $\\mathbb{R}$; phân thức, căn thức, $\\tan x$, $\\cot x$ liên tục trên từng khoảng của tập xác định.',
    'Tổng, hiệu, tích của các hàm liên tục là hàm liên tục; thương liên tục tại những điểm mẫu khác $0$.',
    'Nếu $f$ liên tục trên $[a; b]$ và $f(a) \\cdot f(b) < 0$ thì phương trình $f(x) = 0$ có ít nhất một nghiệm thuộc $(a; b)$.',
  ],
};
