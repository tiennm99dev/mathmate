/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luỹ thừa với số mũ nguyên, căn bậc n, luỹ thừa với số mũ hữu tỉ và số mũ thực; các tính chất của luỹ thừa và cách so sánh hai luỹ thừa cùng cơ số.',
  intro:
    'Gửi $100$ triệu đồng vào ngân hàng với lãi suất $6\\%$ một năm theo thể thức lãi kép thì sau $n$ năm, số tiền là $100 \\cdot 1{,}06^n$ triệu đồng. Với $n$ nguyên, ta đã biết tính luỹ thừa này. Nhưng $1{,}06^{\\frac{1}{2}}$ hay $2^{\\sqrt{2}}$ là gì? Bài học này mở rộng luỹ thừa từ số mũ nguyên sang số mũ hữu tỉ rồi số mũ thực.',
  objectives: [
    'Nhận biết luỹ thừa với số mũ nguyên, căn bậc $n$, luỹ thừa với số mũ hữu tỉ và số mũ thực.',
    'Vận dụng các tính chất của luỹ thừa để tính giá trị và rút gọn biểu thức.',
    'So sánh hai luỹ thừa cùng cơ số dựa vào cơ số lớn hơn hay nhỏ hơn $1$.',
  ],
  sections: [
    {
      heading: 'Luỹ thừa với số mũ nguyên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho $n$ là một số nguyên dương. Với $a$ là số thực tuỳ ý, $a^n = \\underbrace{a \\cdot a \\cdots a}_{n \\text{ thừa số}}$. Với $a \\ne 0$: $a^0 = 1$ và $a^{-n} = \\dfrac{1}{a^n}$. Trong biểu thức $a^m$, $a$ là cơ số, $m$ là số mũ.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: '$0^0$ và $0^{-n}$ (với $n$ nguyên dương) không có nghĩa. Luỹ thừa với số mũ nguyên có các tính chất tương tự luỹ thừa với số mũ nguyên dương.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8}$ và $\\left(\\dfrac{1}{3}\\right)^{-2} = \\dfrac{1}{\\left(\\frac{1}{3}\\right)^2} = 9$.',
        },
      ],
    },
    {
      heading: 'Căn bậc n',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho số thực $b$ và số nguyên dương $n \\ge 2$. Số $a$ được gọi là căn bậc $n$ của số $b$ nếu $a^n = b$.',
        },
        {
          type: 'list',
          items: [
            '$n$ lẻ: mỗi số thực $b$ có đúng một căn bậc $n$, kí hiệu $\\sqrt[n]{b}$. Chẳng hạn $\\sqrt[3]{-8} = -2$.',
            '$n$ chẵn: số $b < 0$ không có căn bậc $n$; số $0$ có một căn bậc $n$ là $0$; số $b > 0$ có hai căn bậc $n$ đối nhau, giá trị dương kí hiệu là $\\sqrt[n]{b}$, giá trị âm là $-\\sqrt[n]{b}$. Chẳng hạn $81$ có hai căn bậc bốn là $3$ và $-3$, còn $\\sqrt[4]{81} = 3$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Với $m$, $n$ nguyên dương ($n \\ge 2$) và $a$, $b$ sao cho các biểu thức có nghĩa: $\\sqrt[n]{a} \\cdot \\sqrt[n]{b} = \\sqrt[n]{ab}$; $\\dfrac{\\sqrt[n]{a}}{\\sqrt[n]{b}} = \\sqrt[n]{\\dfrac{a}{b}}$; $\\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$; $\\sqrt[n]{\\sqrt[k]{a}} = \\sqrt[nk]{a}$; $\\sqrt[n]{a^n} = a$ khi $n$ lẻ và $\\sqrt[n]{a^n} = |a|$ khi $n$ chẵn.',
        },
      ],
    },
    {
      heading: 'Luỹ thừa với số mũ hữu tỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho số thực $a > 0$ và số hữu tỉ $r = \\dfrac{m}{n}$, trong đó $m \\in \\mathbb{Z}$, $n \\in \\mathbb{N}$, $n \\ge 2$. Luỹ thừa của $a$ với số mũ $r$ là $a^r = a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $8^{\\frac{2}{3}} = \\sqrt[3]{8^2} = \\sqrt[3]{64} = 4$ và $4^{-\\frac{1}{2}} = \\sqrt{4^{-1}} = \\dfrac{1}{2}$. Đặc biệt $a^{\\frac{1}{n}} = \\sqrt[n]{a}$ với $a > 0$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Luỹ thừa với số mũ hữu tỉ (không nguyên) chỉ xét khi cơ số dương. Ta có $\\sqrt[3]{-8} = -2$, nhưng không viết $(-8)^{\\frac{1}{3}}$.',
        },
      ],
    },
    {
      heading: 'Luỹ thừa với số mũ thực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho $a$ là số thực dương và $\\alpha$ là số vô tỉ. Xét dãy số hữu tỉ $(r_n)$ mà $\\lim r_n = \\alpha$. Khi đó dãy $\\left(a^{r_n}\\right)$ có giới hạn xác định (không phụ thuộc dãy $(r_n)$ đã chọn), và ta gọi giới hạn đó là luỹ thừa của $a$ với số mũ $\\alpha$: $a^\\alpha = \\lim a^{r_n}$.',
        },
        {
          type: 'table',
          caption:
            'Tính gần đúng $2^{\\sqrt{2}}$ bằng các số hữu tỉ $r_n$ dần tới $\\sqrt{2} = 1{,}41421356\\ldots$',
          head: ['$r_n$', '$1$', '$1{,}4$', '$1{,}41$', '$1{,}414$', '$1{,}4142$'],
          rows: [
            ['$2^{r_n}$', '$2$', '$2{,}639016$', '$2{,}657372$', '$2{,}664750$', '$2{,}665119$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Cho $a$, $b$ là những số thực dương; $\\alpha$, $\\beta$ là những số thực tuỳ ý. Khi đó: $a^\\alpha \\cdot a^\\beta = a^{\\alpha + \\beta}$; $\\dfrac{a^\\alpha}{a^\\beta} = a^{\\alpha - \\beta}$; $\\left(a^\\alpha\\right)^\\beta = a^{\\alpha\\beta}$; $(ab)^\\alpha = a^\\alpha b^\\alpha$; $\\left(\\dfrac{a}{b}\\right)^\\alpha = \\dfrac{a^\\alpha}{b^\\alpha}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh hai luỹ thừa cùng cơ số',
          text: 'Nếu $a > 1$ thì $a^\\alpha > a^\\beta \\iff \\alpha > \\beta$. Nếu $0 < a < 1$ thì $a^\\alpha > a^\\beta \\iff \\alpha < \\beta$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Từ số mũ nguyên đến số mũ thực',
    instruction:
      'Chọn cơ số $a$, rồi chuyển lần lượt "Nguyên", "Hữu tỉ", "Thực". Với số mũ nguyên chỉ có vài điểm rời rạc; với số mũ $\\dfrac{m}{n}$ các điểm dày lên khi tăng mẫu; với số mũ thực, kéo số chữ số của $r_k$ để thấy $a^{r_k}$ dần tới $a^{\\sqrt{2}}$ hoặc $a^{\\pi}$, lấp kín đường cong.',
  },
  examples: [
    {
      problem:
        'Tính giá trị của biểu thức $A = \\left(\\dfrac{1}{2}\\right)^{-3} + 3^{-2} \\cdot 27 - 5^0$.',
      steps: [
        '$\\left(\\dfrac{1}{2}\\right)^{-3} = 2^3 = 8$.',
        '$3^{-2} \\cdot 27 = \\dfrac{1}{9} \\cdot 27 = 3$.',
        '$5^0 = 1$, nên $A = 8 + 3 - 1 = 10$.',
      ],
      answer: '$A = 10$.',
    },
    {
      problem: 'Tính $8^{\\frac{2}{3}}$ và $81^{-\\frac{3}{4}}$.',
      steps: [
        '$8^{\\frac{2}{3}} = \\sqrt[3]{8^2} = \\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4$.',
        '$81^{-\\frac{3}{4}} = \\left(3^4\\right)^{-\\frac{3}{4}} = 3^{-3} = \\dfrac{1}{27}$.',
      ],
      answer: '$8^{\\frac{2}{3}} = 4$ và $81^{-\\frac{3}{4}} = \\dfrac{1}{27}$.',
    },
    {
      problem:
        'Rút gọn biểu thức $B = \\dfrac{a^{\\sqrt{3} + 1} \\cdot a^{2 - \\sqrt{3}}}{\\left(a^{\\sqrt{2} - 2}\\right)^{\\sqrt{2} + 2}}$ với $a > 0$.',
      steps: [
        'Tử số: $a^{\\sqrt{3} + 1} \\cdot a^{2 - \\sqrt{3}} = a^{(\\sqrt{3} + 1) + (2 - \\sqrt{3})} = a^3$.',
        'Mẫu số: $\\left(a^{\\sqrt{2} - 2}\\right)^{\\sqrt{2} + 2} = a^{(\\sqrt{2} - 2)(\\sqrt{2} + 2)} = a^{2 - 4} = a^{-2}$.',
        '$B = \\dfrac{a^3}{a^{-2}} = a^{3 - (-2)} = a^5$.',
      ],
      answer: '$B = a^5$.',
    },
    {
      problem:
        'So sánh $\\left(\\dfrac{2}{3}\\right)^{\\sqrt{3}}$ và $\\left(\\dfrac{2}{3}\\right)^{1{,}7}$.',
      steps: [
        'Cơ số $\\dfrac{2}{3}$ thoả mãn $0 < \\dfrac{2}{3} < 1$.',
        '$\\sqrt{3} \\approx 1{,}732 > 1{,}7$.',
        'Với cơ số nhỏ hơn $1$, số mũ lớn hơn cho luỹ thừa nhỏ hơn.',
      ],
      answer: '$\\left(\\dfrac{2}{3}\\right)^{\\sqrt{3}} < \\left(\\dfrac{2}{3}\\right)^{1{,}7}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\left(\\dfrac{1}{2}\\right)^{-4}$.',
      answer: 16,
      hints: ['$a^{-n} = \\dfrac{1}{a^n}$.', '$\\left(\\dfrac{1}{2}\\right)^{-4} = 2^4$.'],
      solution:
        '$\\left(\\dfrac{1}{2}\\right)^{-4} = \\dfrac{1}{\\left(\\frac{1}{2}\\right)^4} = \\dfrac{1}{\\frac{1}{16}} = 16$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt[5]{-32}$.',
      answer: -2,
      hints: ['Căn bậc lẻ của một số âm là một số âm.', 'Tìm $a$ để $a^5 = -32$.'],
      solution: '$(-2)^5 = -32$ nên $\\sqrt[5]{-32} = -2$.',
    },
    {
      type: 'number',
      prompt: 'Tính $16^{\\frac{3}{4}}$.',
      answer: 8,
      hints: [
        '$a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = \\left(\\sqrt[n]{a}\\right)^m$.',
        '$\\sqrt[4]{16} = 2$.',
      ],
      solution: '$16^{\\frac{3}{4}} = \\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $27^{-\\frac{2}{3}}$ (viết dưới dạng phân số).',
      answer: [1, 9],
      hints: ['Viết $27 = 3^3$.', '$\\left(3^3\\right)^{-\\frac{2}{3}} = 3^{-2}$.'],
      solution:
        '$27^{-\\frac{2}{3}} = \\left(3^3\\right)^{-\\frac{2}{3}} = 3^{-2} = \\dfrac{1}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Với $a > 0$, biểu thức $a^{\\frac{1}{3}} \\cdot \\sqrt{a}$ bằng',
      options: [
        '$a^{\\frac{5}{6}}$',
        '$a^{\\frac{1}{6}}$',
        '$a^{\\frac{2}{5}}$',
        '$a^{\\frac{3}{2}}$',
      ],
      answer: 0,
      hints: [
        'Viết $\\sqrt{a} = a^{\\frac{1}{2}}$.',
        'Nhân hai luỹ thừa cùng cơ số thì cộng số mũ.',
      ],
      solution:
        '$a^{\\frac{1}{3}} \\cdot a^{\\frac{1}{2}} = a^{\\frac{1}{3} + \\frac{1}{2}} = a^{\\frac{5}{6}}$. Kết quả $a^{\\frac{1}{6}}$ là nhầm nhân số mũ.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\left(2^{\\sqrt{3}}\\right)^{\\sqrt{3}} \\cdot 2^{-1}$.',
      answer: 4,
      hints: [
        '$\\left(a^\\alpha\\right)^\\beta = a^{\\alpha\\beta}$.',
        '$\\sqrt{3} \\cdot \\sqrt{3} = 3$.',
      ],
      solution:
        '$\\left(2^{\\sqrt{3}}\\right)^{\\sqrt{3}} = 2^{3} = 8$, nên biểu thức bằng $8 \\cdot 2^{-1} = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$(0{,}5)^{\\sqrt{3}} < (0{,}5)^{1{,}7}$',
        '$(0{,}5)^{\\sqrt{3}} > (0{,}5)^{1{,}7}$',
        '$(0{,}5)^{\\sqrt{3}} = (0{,}5)^{1{,}7}$',
        '$3^{\\sqrt{2}} < 3^{1{,}4}$',
      ],
      answer: 0,
      hints: [
        'So sánh số mũ: $\\sqrt{3} \\approx 1{,}732$ và $\\sqrt{2} \\approx 1{,}414$.',
        'Cơ số $0{,}5 < 1$ thì số mũ lớn hơn cho luỹ thừa nhỏ hơn; cơ số $3 > 1$ thì ngược lại.',
      ],
      solution:
        '$\\sqrt{3} > 1{,}7$ và $0 < 0{,}5 < 1$ nên $(0{,}5)^{\\sqrt{3}} < (0{,}5)^{1{,}7}$. Còn $\\sqrt{2} > 1{,}4$ và $3 > 1$ nên $3^{\\sqrt{2}} > 3^{1{,}4}$.',
    },
    {
      type: 'multi',
      prompt: 'Những biểu thức nào có nghĩa?',
      options: [
        '$(-2)^{-3}$',
        '$0^{-2}$',
        '$(-8)^{\\frac{1}{3}}$',
        '$\\sqrt[3]{-8}$',
        '$3^{\\sqrt{2}}$',
        '$0^0$',
      ],
      answers: [0, 3, 4],
      hints: [
        'Số mũ nguyên âm hoặc bằng $0$ cần cơ số khác $0$.',
        'Số mũ hữu tỉ không nguyên hoặc số mũ vô tỉ cần cơ số dương.',
      ],
      solution:
        '$(-2)^{-3} = -\\dfrac{1}{8}$, $\\sqrt[3]{-8} = -2$ và $3^{\\sqrt{2}}$ có nghĩa. $0^{-2}$ và $0^0$ không có nghĩa; $(-8)^{\\frac{1}{3}}$ không được định nghĩa vì cơ số âm.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng với lãi suất $6\\%$ một năm theo thể thức lãi kép. Sau $3$ năm, số tiền (cả gốc và lãi) là bao nhiêu triệu đồng? Làm tròn đến hàng phần trăm.',
      answer: 119.1,
      tolerance: 0.005,
      unit: 'triệu đồng',
      hints: ['Mỗi năm số tiền được nhân với $1 + 6\\% = 1{,}06$.', 'Tính $100 \\cdot 1{,}06^3$.'],
      solution:
        '$100 \\cdot 1{,}06^3 = 100 \\cdot 1{,}191016 = 119{,}1016 \\approx 119{,}10$ triệu đồng.',
    },
  ],
  takeaways: [
    '$a^{-n} = \\dfrac{1}{a^n}$, $a^0 = 1$ (với $a \\ne 0$); $0^0$ và $0^{-n}$ không có nghĩa.',
    'Với $a > 0$: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$; $a^\\alpha = \\lim a^{r_n}$ khi $r_n \\to \\alpha$.',
    'Nhân, chia luỹ thừa cùng cơ số thì cộng, trừ số mũ; luỹ thừa của luỹ thừa thì nhân số mũ.',
    'Cơ số lớn hơn $1$: số mũ lớn hơn thì luỹ thừa lớn hơn; cơ số từ $0$ đến $1$: ngược lại.',
  ],
};
