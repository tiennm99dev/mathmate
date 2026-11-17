/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tam thức bậc hai, định lí về dấu của tam thức bậc hai theo dấu của a và biệt thức Δ, bảng xét dấu và cách giải bất phương trình bậc hai một ẩn.',
  intro:
    'Một quả bóng được ném lên có độ cao $h(t) = -5t^2 + 20t + 1$ (mét) sau $t$ giây. Trong khoảng thời gian nào quả bóng ở cao hơn $16$ m? Câu hỏi này dẫn tới bất phương trình $-5t^2 + 20t - 15 > 0$. Để giải nó, ta cần biết một biểu thức bậc hai dương, âm khi nào: đó là nội dung của định lí về dấu tam thức bậc hai.',
  objectives: [
    'Phát biểu và vận dụng định lí về dấu của tam thức bậc hai, lập bảng xét dấu.',
    'Giải bất phương trình bậc hai một ẩn bằng cách xét dấu tam thức hoặc dùng đồ thị.',
    'Vận dụng bất phương trình bậc hai vào bài toán thực tiễn.',
  ],
  sections: [
    {
      heading: 'Dấu của tam thức bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tam thức bậc hai',
          text: 'Đa thức bậc hai $f(x) = ax^2 + bx + c$ với $a$, $b$, $c$ là các hệ số, $a \\ne 0$ và $x$ là biến số được gọi là tam thức bậc hai. Nghiệm của phương trình $ax^2 + bx + c = 0$ gọi là nghiệm của tam thức; $\\Delta = b^2 - 4ac$ và $\\Delta^{\\prime} = b^{\\prime 2} - ac$ (với $b = 2b^{\\prime}$) lần lượt là biệt thức và biệt thức thu gọn của tam thức.',
        },
        {
          type: 'p',
          text: 'Đồ thị $y = f(x)$ là một parabol. Tam thức dương tại những $x$ mà parabol nằm phía trên trục hoành, âm tại những $x$ mà parabol nằm phía dưới trục hoành, và bằng $0$ tại giao điểm với trục hoành. Số giao điểm đó phụ thuộc dấu của $\\Delta$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí về dấu của tam thức bậc hai',
          text: 'Cho tam thức bậc hai $f(x) = ax^2 + bx + c$ $(a \\ne 0)$. Nếu $\\Delta < 0$ thì $f(x)$ cùng dấu với hệ số $a$ với mọi $x \\in \\mathbb{R}$. Nếu $\\Delta = 0$ thì $f(x)$ cùng dấu với hệ số $a$ với mọi $x \\ne -\\dfrac{b}{2a}$. Nếu $\\Delta > 0$ thì tam thức có hai nghiệm $x_1 < x_2$; khi đó $f(x)$ cùng dấu với hệ số $a$ với mọi $x \\in (-\\infty; x_1) \\cup (x_2; +\\infty)$ và trái dấu với hệ số $a$ với mọi $x \\in (x_1; x_2)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Trong định lí, có thể thay $\\Delta$ bằng $\\Delta^{\\prime}$. Khi $\\Delta > 0$, người ta thường nhớ gọn: "trong trái, ngoài cùng" (trong khoảng hai nghiệm thì trái dấu với $a$, ngoài khoảng hai nghiệm thì cùng dấu với $a$).',
        },
        {
          type: 'table',
          head: ['$x$', '$(-\\infty; 1)$', '$1$', '$(1; 3)$', '$3$', '$(3; +\\infty)$'],
          rows: [['$x^2 - 4x + 3$', '$+$', '$0$', '$-$', '$0$', '$+$']],
          caption:
            'Bảng xét dấu của $f(x) = x^2 - 4x + 3$: $a = 1 > 0$, hai nghiệm $x_1 = 1$, $x_2 = 3$.',
        },
      ],
    },
    {
      heading: 'Bất phương trình bậc hai một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bất phương trình bậc hai',
          text: 'Bất phương trình bậc hai ẩn $x$ là bất phương trình có dạng $ax^2 + bx + c > 0$ (hoặc $ax^2 + bx + c \\ge 0$, $ax^2 + bx + c < 0$, $ax^2 + bx + c \\le 0$), trong đó $a$, $b$, $c$ là những số thực đã cho và $a \\ne 0$. Số thực $x_0$ là một nghiệm của bất phương trình $ax^2 + bx + c > 0$ nếu $ax_0^2 + bx_0 + c > 0$; tập hợp các nghiệm gọi là tập nghiệm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính $\\Delta$ (hoặc $\\Delta^{\\prime}$), tìm nghiệm của tam thức $f(x) = ax^2 + bx + c$ nếu có.',
            'Dùng định lí về dấu lập bảng xét dấu của $f(x)$ (hoặc nhìn parabol $y = f(x)$ so với trục hoành).',
            'Chọn các khoảng mà $f(x)$ có dấu theo yêu cầu; với $\\ge$, $\\le$ lấy thêm các nghiệm của tam thức.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Đừng quên xét dấu của $a$: $x^2 - 4x + 3 < 0$ có tập nghiệm $(1; 3)$, nhưng $-x^2 + 4x - 3 < 0$ có tập nghiệm $(-\\infty; 1) \\cup (3; +\\infty)$, dù hai tam thức có cùng nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Parabol và bảng xét dấu',
    instruction:
      'Kéo các thanh trượt $a$, $b$, $c$: phần parabol phía trên trục hoành tô xanh ($f(x) > 0$), phía dưới tô đỏ ($f(x) < 0$), và bảng xét dấu tự sinh theo. Kéo điểm thử trên trục hoành (hoặc dùng phím mũi tên) để đọc dấu của $f(x)$ tại đó. Chọn một bất phương trình để xem tập nghiệm được tô đậm trên trục hoành.',
  },
  examples: [
    {
      problem:
        'Xét dấu các tam thức: a) $f(x) = x^2 - x + 1$; b) $g(x) = -x^2 + 6x - 9$; c) $h(x) = 2x^2 - 5x + 2$.',
      steps: [
        'a) $\\Delta = 1 - 4 = -3 < 0$ và $a = 1 > 0$, nên $f(x) > 0$ với mọi $x \\in \\mathbb{R}$.',
        'b) $\\Delta^{\\prime} = 9 - 9 = 0$ và $a = -1 < 0$, nghiệm kép $x = 3$, nên $g(x) < 0$ với mọi $x \\ne 3$ và $g(3) = 0$.',
        'c) $\\Delta = 25 - 16 = 9 > 0$, hai nghiệm $x_1 = \\dfrac{5 - 3}{4} = \\dfrac{1}{2}$, $x_2 = \\dfrac{5 + 3}{4} = 2$; $a = 2 > 0$.',
        'Vậy $h(x) > 0$ khi $x \\in \\left(-\\infty; \\dfrac{1}{2}\\right) \\cup (2; +\\infty)$, $h(x) < 0$ khi $x \\in \\left(\\dfrac{1}{2}; 2\\right)$.',
      ],
      answer:
        '$f(x) > 0$ với mọi $x$; $g(x) < 0$ với mọi $x \\ne 3$; $h(x)$ âm trong $\\left(\\dfrac{1}{2}; 2\\right)$, dương ngoài đoạn $\\left[\\dfrac{1}{2}; 2\\right]$.',
    },
    {
      problem: 'Giải các bất phương trình: a) $3x^2 + x + 5 \\le 0$; b) $-x^2 + 2x + 3 > 0$.',
      steps: [
        'a) $\\Delta = 1 - 60 = -59 < 0$ và $a = 3 > 0$, nên $3x^2 + x + 5 > 0$ với mọi $x$. Bất phương trình vô nghiệm: $S = \\varnothing$.',
        'b) $-x^2 + 2x + 3 = 0 \\Leftrightarrow x = -1$ hoặc $x = 3$; $a = -1 < 0$.',
        'Trong khoảng hai nghiệm tam thức trái dấu với $a$, tức là dương: $-x^2 + 2x + 3 > 0 \\Leftrightarrow -1 < x < 3$.',
      ],
      answer: 'a) $S = \\varnothing$; b) $S = (-1; 3)$.',
    },
    {
      problem:
        'Quả bóng có độ cao $h(t) = -5t^2 + 20t + 1$ (m) sau $t$ giây. Trong khoảng thời gian nào quả bóng ở cao hơn $16$ m?',
      steps: [
        'Cần giải $-5t^2 + 20t + 1 > 16 \\Leftrightarrow -5t^2 + 20t - 15 > 0 \\Leftrightarrow t^2 - 4t + 3 < 0$ (chia hai vế cho $-5$, đổi chiều).',
        'Tam thức $t^2 - 4t + 3$ có hai nghiệm $t = 1$, $t = 3$ và $a = 1 > 0$, nên nó âm khi $1 < t < 3$.',
      ],
      answer:
        'Quả bóng ở cao hơn $16$ m khi $1 < t < 3$, tức là từ thời điểm $1$ giây đến thời điểm $3$ giây sau khi ném, trong $2$ giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng về tam thức $f(x) = x^2 - 2x + 5$?',
      options: [
        '$f(x) > 0$ với mọi $x \\in \\mathbb{R}$',
        '$f(x) < 0$ với mọi $x \\in \\mathbb{R}$',
        '$f(x) > 0$ với mọi $x \\ne 1$',
        '$f(x)$ đổi dấu khi $x$ đi qua $1$',
      ],
      answer: 0,
      hints: ['Tính $\\Delta^{\\prime} = b^{\\prime 2} - ac$ với $b^{\\prime} = -1$.'],
      solution:
        '$\\Delta^{\\prime} = 1 - 5 = -4 < 0$ và $a = 1 > 0$, nên $f(x) > 0$ với mọi $x \\in \\mathbb{R}$.',
    },
    {
      type: 'choice',
      prompt: 'Tam thức $f(x) = -2x^2 + 3x + 2$ dương khi và chỉ khi',
      options: [
        '$x \\in \\left(-\\dfrac{1}{2}; 2\\right)$',
        '$x \\in \\left(-\\infty; -\\dfrac{1}{2}\\right) \\cup (2; +\\infty)$',
        '$x \\in \\left(-2; \\dfrac{1}{2}\\right)$',
        '$x \\in \\mathbb{R}$',
      ],
      answer: 0,
      hints: [
        'Tìm hai nghiệm của $-2x^2 + 3x + 2 = 0$.',
        '$a = -2 < 0$: tam thức dương ở khoảng nào so với hai nghiệm?',
      ],
      solution:
        '$\\Delta = 9 + 16 = 25$, hai nghiệm $x_1 = -\\dfrac{1}{2}$, $x_2 = 2$. Vì $a < 0$, tam thức trái dấu với $a$ (dương) trong khoảng hai nghiệm: $x \\in \\left(-\\dfrac{1}{2}; 2\\right)$.',
    },
    {
      type: 'number',
      prompt: 'Bất phương trình $x^2 - 5x + 4 \\le 0$ có bao nhiêu nghiệm nguyên?',
      answer: 4,
      hints: ['Giải bất phương trình trước, chú ý dấu $\\le$ lấy cả hai nghiệm của tam thức.'],
      solution:
        'Tam thức có hai nghiệm $1$ và $4$, $a = 1 > 0$, nên $x^2 - 5x + 4 \\le 0 \\Leftrightarrow 1 \\le x \\le 4$. Các nghiệm nguyên là $1, 2, 3, 4$: có $4$ nghiệm.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $x^2 - 6x + 9 > 0$ là',
      options: [
        '$\\mathbb{R}$',
        '$\\mathbb{R} \\setminus \\{3\\}$',
        '$\\varnothing$',
        '$(3; +\\infty)$',
      ],
      answer: 1,
      hints: ['$\\Delta^{\\prime} = 0$: tam thức có nghiệm kép.'],
      solution:
        '$x^2 - 6x + 9 = (x - 3)^2 \\ge 0$, bằng $0$ chỉ khi $x = 3$. Vậy $(x - 3)^2 > 0 \\Leftrightarrow x \\ne 3$: $S = \\mathbb{R} \\setminus \\{3\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $-x^2 + 4x - 5 \\ge 0$ là',
      options: ['$\\varnothing$', '$\\mathbb{R}$', '$\\{2\\}$', '$[1; 5]$'],
      answer: 0,
      hints: ['Tính $\\Delta^{\\prime}$ và xét dấu của $a$.'],
      solution:
        '$\\Delta^{\\prime} = 4 - 5 = -1 < 0$ và $a = -1 < 0$, nên $-x^2 + 4x - 5 < 0$ với mọi $x$. Bất phương trình vô nghiệm: $S = \\varnothing$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các giá trị của $x$ thoả mãn $2x^2 - 7x + 3 < 0$.',
      options: ['$x = 0$', '$x = 1$', '$x = 2$', '$x = 3$', '$x = 2{,}5$'],
      answers: [1, 2, 4],
      hints: ['Tìm hai nghiệm của tam thức, rồi dùng "trong trái, ngoài cùng".'],
      solution:
        '$\\Delta = 49 - 24 = 25$, hai nghiệm $\\dfrac{1}{2}$ và $3$; $a = 2 > 0$, nên $2x^2 - 7x + 3 < 0 \\Leftrightarrow \\dfrac{1}{2} < x < 3$. Thoả mãn: $1$; $2$; $2{,}5$. Không thoả: $0$ (ngoài khoảng) và $3$ (là nghiệm, tại đó tam thức bằng $0$).',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\sqrt{x^2 - 3x - 4}$ là',
      options: [
        '$(-\\infty; -1] \\cup [4; +\\infty)$',
        '$[-1; 4]$',
        '$(-\\infty; -4] \\cup [1; +\\infty)$',
        '$(-\\infty; -1) \\cup (4; +\\infty)$',
      ],
      answer: 0,
      hints: ['Hàm số xác định khi $x^2 - 3x - 4 \\ge 0$.', 'Tam thức có hai nghiệm $-1$ và $4$.'],
      solution:
        'Cần $x^2 - 3x - 4 \\ge 0$. Tam thức có nghiệm $-1$ và $4$, $a = 1 > 0$, nên nó không âm khi $x \\le -1$ hoặc $x \\ge 4$. $D = (-\\infty; -1] \\cup [4; +\\infty)$.',
    },
    {
      type: 'choice',
      prompt: 'Với giá trị nào của $m$ thì $x^2 + 2x + m > 0$ với mọi $x \\in \\mathbb{R}$?',
      options: ['$m > 1$', '$m \\ge 1$', '$m < 1$', '$m > -1$'],
      answer: 0,
      hints: [
        '$a = 1 > 0$; tam thức luôn dương khi nó không có nghiệm.',
        'Cần $\\Delta^{\\prime} = 1 - m < 0$.',
      ],
      solution:
        '$a = 1 > 0$ nên $x^2 + 2x + m > 0$ với mọi $x$ khi và chỉ khi $\\Delta^{\\prime} = 1 - m < 0$, tức là $m > 1$. Với $m = 1$ thì $(x + 1)^2 = 0$ tại $x = -1$, không thoả mãn.',
    },
    {
      type: 'number',
      prompt:
        'Quả bóng có độ cao $h(t) = -5t^2 + 20t + 1$ (m) sau $t$ giây. Quả bóng ở độ cao từ $11$ m trở lên trong bao nhiêu giây? (Làm tròn kết quả đến hàng phần trăm.)',
      answer: 2.83,
      tolerance: 0.01,
      unit: 's',
      hints: [
        'Giải $-5t^2 + 20t + 1 \\ge 11$.',
        'Đưa về $t^2 - 4t + 2 \\le 0$ rồi tìm hai nghiệm của tam thức.',
      ],
      solution:
        '$-5t^2 + 20t + 1 \\ge 11 \\Leftrightarrow t^2 - 4t + 2 \\le 0 \\Leftrightarrow 2 - \\sqrt{2} \\le t \\le 2 + \\sqrt{2}$. Khoảng thời gian dài $(2 + \\sqrt{2}) - (2 - \\sqrt{2}) = 2\\sqrt{2} \\approx 2{,}83$ giây.',
    },
  ],
  takeaways: [
    '$\\Delta < 0$: $f(x)$ cùng dấu với $a$ với mọi $x$; $\\Delta = 0$: cùng dấu với $a$ với mọi $x \\ne -\\dfrac{b}{2a}$.',
    '$\\Delta > 0$, hai nghiệm $x_1 < x_2$: trong khoảng $(x_1; x_2)$ trái dấu với $a$, ngoài đoạn $[x_1; x_2]$ cùng dấu với $a$.',
    'Giải bất phương trình bậc hai: tìm nghiệm của tam thức, lập bảng xét dấu, chọn khoảng theo yêu cầu (lấy cả nghiệm khi có dấu $\\ge$, $\\le$).',
  ],
};
