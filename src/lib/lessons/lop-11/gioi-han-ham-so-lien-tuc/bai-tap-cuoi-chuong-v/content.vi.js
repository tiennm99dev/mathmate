/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương V: giới hạn của dãy số, tổng của cấp số nhân lùi vô hạn, giới hạn của hàm số (tại một điểm, một bên, tại vô cực, vô cực) và hàm số liên tục, kèm phép phóng to đồ thị để kiểm chứng giới hạn và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương V xây dựng khái niệm giới hạn: của dãy số khi $n \\to +\\infty$, rồi của hàm số khi $x$ dần tới một điểm hoặc tới vô cực, và dùng nó để định nghĩa hàm số liên tục. Bài ôn tập này hệ thống lại các quy tắc, các dạng bài thường gặp, cho em kiểm chứng kết quả tính giới hạn bằng cách phóng to đồ thị, và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các định nghĩa, định lí và giới hạn cơ bản của chương.',
    'Tính giới hạn của dãy số và hàm số ở các dạng thường gặp: phân thức, dạng $\\dfrac{0}{0}$, biểu thức chứa căn, giới hạn một bên.',
    'Xét tính liên tục, tìm tham số để hàm số liên tục và chứng minh phương trình có nghiệm.',
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
              'Giới hạn cơ bản của dãy số',
              '$\\lim \\dfrac{1}{n^k} = 0$; $\\lim q^n = 0$ khi $|q| < 1$; $\\lim n^k = +\\infty$; $\\lim q^n = +\\infty$ khi $q > 1$',
            ],
            [
              'Cấp số nhân lùi vô hạn',
              '$S = u_1 + u_1 q + u_1 q^2 + \\cdots = \\dfrac{u_1}{1 - q}$ với $|q| < 1$',
            ],
            [
              'Giới hạn của hàm số tại $x_0$',
              '$\\lim\\limits_{x \\to x_0} f(x) = L \\iff \\lim\\limits_{x \\to x_0^-} f(x) = \\lim\\limits_{x \\to x_0^+} f(x) = L$',
            ],
            [
              'Giới hạn tại vô cực',
              '$\\lim\\limits_{x \\to \\pm\\infty} \\dfrac{c}{x^k} = 0$; chia cho luỹ thừa cao nhất của mẫu',
            ],
            [
              'Giới hạn vô cực',
              '$\\lim\\limits_{x \\to a^+} \\dfrac{1}{x - a} = +\\infty$, $\\lim\\limits_{x \\to a^-} \\dfrac{1}{x - a} = -\\infty$',
            ],
            ['Hàm số liên tục tại $x_0$', '$\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$'],
            [
              'Định lí giá trị trung gian',
              '$f$ liên tục trên $[a; b]$, $f(a) \\cdot f(b) < 0$ $\\Rightarrow$ có $c \\in (a; b)$ với $f(c) = 0$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Phân thức của $n$ hoặc của $x \\to \\pm\\infty$: chia tử và mẫu cho luỹ thừa cao nhất của mẫu.',
            'Dạng $\\dfrac{0}{0}$ khi $x \\to x_0$: phân tích thành nhân tử để rút gọn $x - x_0$, hoặc nhân với biểu thức liên hợp khi có căn.',
            'Hiệu hai căn (dạng $\\infty - \\infty$): nhân và chia với biểu thức liên hợp.',
            'Hàm số cho bởi nhiều công thức: tính hai giới hạn một bên tại điểm nối và so sánh với giá trị tại điểm đó.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Coi $+\\infty$ là một số và viết $\\infty - \\infty = 0$ hay $\\dfrac{\\infty}{\\infty} = 1$; quên rằng $\\sqrt{x^2} = -x$ khi $x \\to -\\infty$; dùng công thức $S = \\dfrac{u_1}{1 - q}$ khi $|q| \\ge 1$; kết luận hàm số liên tục chỉ vì nó xác định tại $x_0$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt gồm các câu hỏi mới về giới hạn của dãy số, giới hạn của hàm số và hàm số liên tục. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Phóng to đồ thị để kiểm chứng giới hạn',
    instruction:
      'Chọn một câu, tính giới hạn $L$ trên giấy rồi nhập kết quả. Kéo thanh trượt để phóng to quanh $x_0$: nếu $L$ đúng, hai điểm xanh và cam bám sát đường nét đứt $y = L$ dù phóng to đến đâu; nếu sai, đường đó sớm ra khỏi khung.',
  },
  examples: [
    {
      problem: 'Tính $\\lim \\dfrac{2^{n+1} - 3^n}{3^n + 1}$.',
      steps: [
        'Chia tử và mẫu cho $3^n$: $\\dfrac{2 \\cdot \\left(\\frac{2}{3}\\right)^n - 1}{1 + \\left(\\frac{1}{3}\\right)^n}$.',
        'Vì $\\left|\\dfrac{2}{3}\\right| < 1$ và $\\left|\\dfrac{1}{3}\\right| < 1$ nên $\\left(\\dfrac{2}{3}\\right)^n \\to 0$ và $\\left(\\dfrac{1}{3}\\right)^n \\to 0$.',
        'Giới hạn bằng $\\dfrac{0 - 1}{1 + 0} = -1$.',
      ],
      answer: '$-1$.',
    },
    {
      problem:
        'Tìm $a$ để hàm số $f(x) = \\begin{cases} \\dfrac{x^2 - 5x + 6}{x - 2} & \\text{nếu } x \\ne 2 \\\\ a & \\text{nếu } x = 2 \\end{cases}$ liên tục trên $\\mathbb{R}$.',
      steps: [
        'Với $x \\ne 2$, $f(x) = \\dfrac{(x - 2)(x - 3)}{x - 2} = x - 3$ liên tục trên $(-\\infty; 2)$ và $(2; +\\infty)$.',
        '$\\lim\\limits_{x \\to 2} f(x) = \\lim\\limits_{x \\to 2} (x - 3) = -1$.',
        'Hàm số liên tục tại $2$ khi $f(2) = a = -1$; khi đó nó liên tục trên $\\mathbb{R}$.',
      ],
      answer: '$a = -1$.',
    },
    {
      problem: 'Chứng minh rằng phương trình $x^5 - 3x - 1 = 0$ có ít nhất hai nghiệm phân biệt.',
      steps: [
        '$f(x) = x^5 - 3x - 1$ là đa thức nên liên tục trên $\\mathbb{R}$.',
        '$f(-1) = -1 + 3 - 1 = 1 > 0$, $f(0) = -1 < 0$, $f(2) = 32 - 6 - 1 = 25 > 0$.',
        '$f(-1) \\cdot f(0) < 0$ nên có nghiệm thuộc $(-1; 0)$; $f(0) \\cdot f(2) < 0$ nên có nghiệm thuộc $(0; 2)$. Hai khoảng rời nhau nên hai nghiệm này phân biệt.',
      ],
      answer:
        'Phương trình có ít nhất hai nghiệm, một nghiệm thuộc $(-1; 0)$ và một nghiệm thuộc $(0; 2)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho dãy số $(u_n)$ với $u_n = \\sqrt{n^2 + 1} - n$. Mệnh đề nào đúng?',
      options: [
        '$\\lim u_n = 0$',
        '$\\lim u_n = 1$',
        '$\\lim u_n = +\\infty$',
        'Dãy số không có giới hạn',
      ],
      answer: 0,
      hints: ['Nhân và chia với biểu thức liên hợp $\\sqrt{n^2 + 1} + n$.'],
      solution:
        '$u_n = \\dfrac{(n^2 + 1) - n^2}{\\sqrt{n^2 + 1} + n} = \\dfrac{1}{\\sqrt{n^2 + 1} + n}$. Mẫu dần tới $+\\infty$, nên $\\lim u_n = 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\lim \\dfrac{2 + 2^2 + \\cdots + 2^n}{2^n}$.',
      answer: 2,
      hints: [
        'Tử là tổng $n$ số hạng đầu của cấp số nhân với $u_1 = 2$, $q = 2$.',
        '$2 + 2^2 + \\cdots + 2^n = 2(2^n - 1)$.',
      ],
      solution:
        'Tử bằng $\\dfrac{2(1 - 2^n)}{1 - 2} = 2^{n+1} - 2$. Do đó $\\dfrac{2^{n+1} - 2}{2^n} = 2 - \\dfrac{2}{2^n} \\to 2$.',
    },
    {
      type: 'number',
      prompt:
        'Tính tổng của cấp số nhân lùi vô hạn $(u_n)$ với $u_n = \\left(\\dfrac{2}{3}\\right)^n$.',
      answer: 2,
      hints: ['$u_1 = \\dfrac{2}{3}$ và công bội $q = \\dfrac{2}{3}$.'],
      solution:
        '$S = \\dfrac{u_1}{1 - q} = \\dfrac{\\frac{2}{3}}{1 - \\frac{2}{3}} = \\dfrac{\\frac{2}{3}}{\\frac{1}{3}} = 2$.',
    },
    {
      type: 'fraction',
      prompt: 'Viết số thập phân vô hạn tuần hoàn $1{,}(12)$ dưới dạng phân số tối giản.',
      answer: [37, 33],
      simplest: true,
      hints: [
        '$1{,}(12) = 1 + 0{,}(12)$ và $0{,}(12) = \\dfrac{12}{100} + \\dfrac{12}{100^2} + \\cdots$',
      ],
      solution:
        '$0{,}(12) = \\dfrac{\\frac{12}{100}}{1 - \\frac{1}{100}} = \\dfrac{12}{99} = \\dfrac{4}{33}$, nên $1{,}(12) = 1 + \\dfrac{4}{33} = \\dfrac{37}{33}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $f(x) = \\sqrt{x + 1} - \\sqrt{x + 2}$. Mệnh đề nào đúng?',
      options: [
        '$\\lim\\limits_{x \\to +\\infty} f(x) = 0$',
        '$\\lim\\limits_{x \\to +\\infty} f(x) = -1$',
        '$\\lim\\limits_{x \\to +\\infty} f(x) = -\\infty$',
        '$\\lim\\limits_{x \\to +\\infty} f(x) = 1$',
      ],
      answer: 0,
      hints: ['Nhân và chia với $\\sqrt{x + 1} + \\sqrt{x + 2}$.'],
      solution:
        '$f(x) = \\dfrac{(x + 1) - (x + 2)}{\\sqrt{x + 1} + \\sqrt{x + 2}} = \\dfrac{-1}{\\sqrt{x + 1} + \\sqrt{x + 2}}$. Mẫu dần tới $+\\infty$ nên giới hạn bằng $0$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim\\limits_{x \\to 7} \\dfrac{\\sqrt{x + 2} - 3}{x - 7}$.',
      answer: [1, 6],
      hints: ['Dạng $\\dfrac{0}{0}$ có căn: nhân tử và mẫu với $\\sqrt{x + 2} + 3$.'],
      solution:
        '$\\dfrac{\\sqrt{x + 2} - 3}{x - 7} = \\dfrac{x + 2 - 9}{(x - 7)\\left(\\sqrt{x + 2} + 3\\right)} = \\dfrac{1}{\\sqrt{x + 2} + 3} \\to \\dfrac{1}{3 + 3} = \\dfrac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim\\limits_{x \\to +\\infty} \\left(\\sqrt{4x^2 + x} - 2x\\right)$.',
      answer: [1, 4],
      hints: [
        'Nhân và chia với $\\sqrt{4x^2 + x} + 2x$.',
        'Sau đó chia tử và mẫu cho $x$ (với $x > 0$ thì $\\sqrt{x^2} = x$).',
      ],
      solution:
        '$\\sqrt{4x^2 + x} - 2x = \\dfrac{x}{\\sqrt{4x^2 + x} + 2x} = \\dfrac{1}{\\sqrt{4 + \\frac{1}{x}} + 2} \\to \\dfrac{1}{2 + 2} = \\dfrac{1}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Giới hạn $\\lim\\limits_{x \\to 3^+} \\dfrac{x + 1}{3 - x}$ bằng',
      options: ['$-\\infty$', '$+\\infty$', '$0$', '$-1$'],
      answer: 0,
      hints: ['Tử dần tới $4 > 0$; xét dấu của $3 - x$ khi $x > 3$.'],
      solution:
        '$\\lim\\limits_{x \\to 3^+} (x + 1) = 4 > 0$, còn $3 - x \\to 0$ và $3 - x < 0$ khi $x > 3$. Vậy giới hạn bằng $-\\infty$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hàm số $f(x) = \\begin{cases} \\dfrac{x^2 - 3x + 2}{x - 1} & \\text{nếu } x \\ne 1 \\\\ m & \\text{nếu } x = 1 \\end{cases}$ liên tục tại $x = 1$.',
      answer: -1,
      hints: ['Phân tích $x^2 - 3x + 2 = (x - 1)(x - 2)$ rồi tính giới hạn tại $1$.'],
      solution:
        'Với $x \\ne 1$: $f(x) = x - 2$, nên $\\lim\\limits_{x \\to 1} f(x) = -1$. Hàm số liên tục tại $1$ khi $m = -1$.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao hàm số $f(x) = \\begin{cases} \\dfrac{1}{x} & \\text{nếu } x \\ne 0 \\\\ 1 & \\text{nếu } x = 0 \\end{cases}$ gián đoạn tại $x = 0$?',
      options: [
        'Vì $f(x)$ không có giới hạn hữu hạn khi $x \\to 0$',
        'Vì $f(x)$ không xác định tại $x = 0$',
        'Vì $\\lim\\limits_{x \\to 0} f(x) = 0 \\ne f(0)$',
        'Vì $f$ cho bởi hai công thức',
      ],
      answer: 0,
      hints: ['Tính hai giới hạn một bên của $\\dfrac{1}{x}$ tại $0$.'],
      solution:
        '$\\lim\\limits_{x \\to 0^+} \\dfrac{1}{x} = +\\infty$ và $\\lim\\limits_{x \\to 0^-} \\dfrac{1}{x} = -\\infty$, nên không có $\\lim\\limits_{x \\to 0} f(x)$ hữu hạn bằng $f(0) = 1$. Hàm số vẫn xác định tại $0$ ($f(0) = 1$).',
    },
    {
      type: 'number',
      prompt:
        'Cho $f(x) = 2x^3 - 6x + 1$, với $f(-2) = -3$, $f(0) = 1$, $f(1) = -3$, $f(2) = 5$. Dựa vào định lí giá trị trung gian, phương trình $f(x) = 0$ có ít nhất bao nhiêu nghiệm thuộc khoảng $(-2; 2)$?',
      answer: 3,
      hints: ['Đếm số khoảng $(-2; 0)$, $(0; 1)$, $(1; 2)$ mà $f$ đổi dấu ở hai đầu.'],
      solution:
        '$f$ liên tục và đổi dấu trên mỗi khoảng $(-2; 0)$, $(0; 1)$, $(1; 2)$, nên mỗi khoảng có ít nhất một nghiệm: ít nhất $3$ nghiệm. Một phương trình bậc ba có không quá $3$ nghiệm, nên nó có đúng $3$ nghiệm.',
    },
  ],
  takeaways: [
    'Giới hạn của dãy số và hàm số tuân theo cùng các quy tắc tổng, hiệu, tích, thương (mẫu khác $0$) và căn.',
    'Dạng vô định ($\\dfrac{0}{0}$, $\\dfrac{\\infty}{\\infty}$, $\\infty - \\infty$) cần biến đổi trước: rút gọn nhân tử, chia cho luỹ thừa cao nhất, nhân liên hợp.',
    'Cấp số nhân lùi vô hạn có tổng $\\dfrac{u_1}{1 - q}$; dùng nó để đổi số thập phân vô hạn tuần hoàn ra phân số.',
    'Liên tục tại $x_0$: $\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$; liên tục và đổi dấu trên $[a; b]$ thì có nghiệm trong $(a; b)$.',
  ],
};
