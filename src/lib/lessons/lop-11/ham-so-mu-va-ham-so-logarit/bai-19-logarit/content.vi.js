/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khái niệm lôgarit cơ số a của một số dương, các tính chất và quy tắc tính lôgarit của tích, thương, luỹ thừa, công thức đổi cơ số, lôgarit thập phân và lôgarit tự nhiên.',
  intro:
    'Độ pH của một dung dịch được tính theo công thức $\\mathrm{pH} = -\\log\\,[\\mathrm{H}^+]$, trong đó $[\\mathrm{H}^+]$ là nồng độ ion hydrogen. Nước tinh khiết có $[\\mathrm{H}^+] = 10^{-7}$, nên pH bằng $7$. Phép tính "tìm số mũ" như vậy gọi là lấy lôgarit: nó là phép toán ngược của phép nâng lên luỹ thừa.',
  objectives: [
    'Nhận biết khái niệm lôgarit cơ số $a$ ($a > 0$, $a \\ne 1$) của một số thực dương.',
    'Sử dụng các tính chất, quy tắc tính lôgarit và công thức đổi cơ số để tính toán, rút gọn.',
    'Nhận biết lôgarit thập phân, lôgarit tự nhiên và tính giá trị lôgarit bằng máy tính cầm tay.',
  ],
  sections: [
    {
      heading: 'Khái niệm lôgarit',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hai số thực dương $a$, $b$ với $a \\ne 1$. Số thực $\\alpha$ thoả mãn đẳng thức $a^\\alpha = b$ được gọi là lôgarit cơ số $a$ của $b$ và kí hiệu là $\\log_a b$. Vậy $\\alpha = \\log_a b \\iff a^\\alpha = b$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\log_2 8 = 3$ vì $2^3 = 8$; $\\log_3 \\dfrac{1}{9} = -2$ vì $3^{-2} = \\dfrac{1}{9}$; $\\log_4 2 = \\dfrac{1}{2}$ vì $4^{\\frac{1}{2}} = 2$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Không có lôgarit của số âm và số $0$; cơ số phải dương và khác $1$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Với $0 < a \\ne 1$ và $b > 0$: $\\log_a 1 = 0$; $\\log_a a = 1$; $\\log_a a^\\alpha = \\alpha$ ($\\alpha \\in \\mathbb{R}$); $a^{\\log_a b} = b$.',
        },
      ],
    },
    {
      heading: 'Lôgarit thập phân và lôgarit tự nhiên',
      blocks: [
        {
          type: 'list',
          items: [
            'Lôgarit cơ số $10$ của số thực dương $x$ được gọi là lôgarit thập phân của $x$, kí hiệu là $\\log x$ (hoặc $\\lg x$).',
            'Lôgarit cơ số $e$ của số thực dương $x$ được gọi là lôgarit tự nhiên của $x$, kí hiệu là $\\ln x$. Ở đây $e = \\lim\\limits_{n \\to +\\infty} \\left(1 + \\dfrac{1}{n}\\right)^n \\approx 2{,}718281828$ là một số vô tỉ.',
          ],
        },
        {
          type: 'p',
          text: 'Máy tính cầm tay có phím $\\log$ và $\\ln$ (nhiều máy có phím tính trực tiếp $\\log_a b$). Chẳng hạn $\\log 2 \\approx 0{,}3010$ và $\\ln 5 \\approx 1{,}6094$.',
        },
      ],
    },
    {
      heading: 'Tính chất của phép tính lôgarit',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lôgarit của tích, thương, luỹ thừa',
          text: 'Cho $0 < a \\ne 1$ và $M$, $N > 0$. Khi đó: $\\log_a (MN) = \\log_a M + \\log_a N$; $\\log_a \\dfrac{M}{N} = \\log_a M - \\log_a N$; $\\log_a M^\\alpha = \\alpha \\log_a M$ với mọi $\\alpha \\in \\mathbb{R}$.',
        },
        {
          type: 'p',
          text: 'Đặc biệt $\\log_a \\dfrac{1}{N} = -\\log_a N$. Nhân hai số ứng với cộng hai lôgarit: đó là nguyên lí của thước lôgarit, công cụ tính toán của các kĩ sư trước khi có máy tính. Kéo thước trượt bên dưới để tính một tích.',
        },
        { type: 'widget', name: 'slide-rule' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức đổi cơ số',
          text: 'Cho các số dương $a$, $b$, $c$ với $a \\ne 1$, $c \\ne 1$. Khi đó $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$. Hệ quả: $\\log_a b = \\dfrac{1}{\\log_b a}$ (với $b \\ne 1$) và $\\log_{a^\\alpha} b = \\dfrac{1}{\\alpha} \\log_a b$ (với $\\alpha \\ne 0$).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Không có công thức cho lôgarit của một tổng: $\\log_a (M + N) \\ne \\log_a M + \\log_a N$ nói chung. Cũng chú ý $\\log_a M^\\alpha = \\alpha \\log_a M$, khác với $\\left(\\log_a M\\right)^\\alpha$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy đổi luỹ thừa và lôgarit',
    instruction:
      'Chọn cơ số $a$ và kéo số mũ $\\alpha$: máy viết cùng lúc $a^\\alpha = b$ và $\\log_a b = \\alpha$, còn thước hai hàng cho thấy mỗi số ở hàng dưới ứng với số mũ nào ở hàng trên. Sau đó làm phần "Đố em": đọc ngược thước để tìm lôgarit.',
  },
  examples: [
    {
      problem: 'Tính $\\log_2 16$, $\\log_3 \\dfrac{1}{27}$ và $\\log_{\\frac{1}{2}} 8$.',
      steps: [
        '$2^4 = 16$ nên $\\log_2 16 = 4$.',
        '$3^{-3} = \\dfrac{1}{27}$ nên $\\log_3 \\dfrac{1}{27} = -3$.',
        '$\\left(\\dfrac{1}{2}\\right)^{-3} = 2^3 = 8$ nên $\\log_{\\frac{1}{2}} 8 = -3$.',
      ],
      answer: '$4$; $-3$; $-3$.',
    },
    {
      problem: 'Tính $A = \\log_6 9 + \\log_6 4$ và $B = \\log_2 40 - \\log_2 5$.',
      steps: [
        '$A = \\log_6 (9 \\cdot 4) = \\log_6 36 = 2$ vì $6^2 = 36$.',
        '$B = \\log_2 \\dfrac{40}{5} = \\log_2 8 = 3$.',
      ],
      answer: '$A = 2$, $B = 3$.',
    },
    {
      problem: 'Tính $\\log_4 8$ và $\\log_{\\sqrt{3}} 9$.',
      steps: [
        'Đổi sang cơ số $2$: $\\log_4 8 = \\dfrac{\\log_2 8}{\\log_2 4} = \\dfrac{3}{2}$.',
        '$\\sqrt{3} = 3^{\\frac{1}{2}}$, nên $\\log_{\\sqrt{3}} 9 = \\dfrac{1}{\\frac{1}{2}} \\log_3 9 = 2 \\cdot 2 = 4$.',
      ],
      answer: '$\\log_4 8 = \\dfrac{3}{2}$, $\\log_{\\sqrt{3}} 9 = 4$.',
    },
    {
      problem:
        'Một dung dịch có nồng độ ion hydrogen $[\\mathrm{H}^+] = 2 \\cdot 10^{-5}$ mol/L. Tính độ pH của dung dịch, làm tròn đến hàng phần mười.',
      steps: [
        '$\\mathrm{pH} = -\\log\\left(2 \\cdot 10^{-5}\\right) = -\\left(\\log 2 + \\log 10^{-5}\\right)$.',
        '$= -(\\log 2 - 5) = 5 - \\log 2 \\approx 5 - 0{,}3010 = 4{,}699$.',
      ],
      answer: '$\\mathrm{pH} \\approx 4{,}7$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\log_3 81$.',
      answer: 4,
      hints: ['Tìm số mũ $\\alpha$ để $3^\\alpha = 81$.'],
      solution: '$3^4 = 81$ nên $\\log_3 81 = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\log_{\\frac{1}{2}} 32$.',
      answer: -5,
      hints: [
        '$32 = 2^5$ và $\\dfrac{1}{2} = 2^{-1}$.',
        'Tìm $\\alpha$ để $\\left(\\dfrac{1}{2}\\right)^\\alpha = 2^5$.',
      ],
      solution:
        '$\\left(\\dfrac{1}{2}\\right)^{-5} = 2^5 = 32$ nên $\\log_{\\frac{1}{2}} 32 = -5$.',
    },
    {
      type: 'number',
      prompt: 'Tính $4^{\\log_2 3}$.',
      answer: 9,
      hints: ['Viết $4 = 2^2$.', 'Dùng $a^{\\log_a b} = b$.'],
      solution: '$4^{\\log_2 3} = \\left(2^{\\log_2 3}\\right)^2 = 3^2 = 9$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\log_3 18 + \\log_3 \\dfrac{1}{2}$.',
      answer: 2,
      hints: ['Tổng hai lôgarit cùng cơ số là lôgarit của tích.'],
      solution:
        '$\\log_3 18 + \\log_3 \\dfrac{1}{2} = \\log_3 \\left(18 \\cdot \\dfrac{1}{2}\\right) = \\log_3 9 = 2$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\log_8 4$ (viết dưới dạng phân số).',
      answer: [2, 3],
      hints: ['Đổi sang cơ số $2$.', '$\\log_8 4 = \\dfrac{\\log_2 4}{\\log_2 8}$.'],
      solution: '$\\log_8 4 = \\dfrac{\\log_2 4}{\\log_2 8} = \\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $0 < a \\ne 1$ và $M$, $N > 0$. Khẳng định nào đúng?',
      options: [
        '$\\log_a (MN) = \\log_a M + \\log_a N$',
        '$\\log_a (M + N) = \\log_a M \\cdot \\log_a N$',
        '$\\log_a M^3 = \\left(\\log_a M\\right)^3$',
        '$\\log_a \\dfrac{M}{N} = \\dfrac{\\log_a M}{\\log_a N}$',
      ],
      answer: 0,
      hints: ['Lôgarit biến phép nhân thành phép cộng.'],
      solution:
        'Quy tắc đúng là $\\log_a (MN) = \\log_a M + \\log_a N$. Các khẳng định còn lại sai: không có công thức cho lôgarit của tổng, $\\log_a M^3 = 3\\log_a M$ và $\\log_a \\dfrac{M}{N} = \\log_a M - \\log_a N$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\log_2 3 = a$. Khi đó $\\log_2 18$ bằng',
      options: ['$1 + 2a$', '$2a$', '$2 + a$', '$1 + a^2$'],
      answer: 0,
      hints: ['$18 = 2 \\cdot 3^2$.'],
      solution: '$\\log_2 18 = \\log_2 2 + \\log_2 3^2 = 1 + 2\\log_2 3 = 1 + 2a$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\log 1000 + \\ln e^2$.',
      answer: 5,
      hints: ['$\\log$ là lôgarit cơ số $10$, $\\ln$ là lôgarit cơ số $e$.'],
      solution: '$\\log 1000 = \\log 10^3 = 3$ và $\\ln e^2 = 2$, nên tổng bằng $5$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tính $\\log_2 7$ (làm tròn đến hàng phần trăm).',
      answer: 2.81,
      tolerance: 0.005,
      hints: [
        'Có thể dùng công thức đổi cơ số: $\\log_2 7 = \\dfrac{\\ln 7}{\\ln 2}$.',
        '$2^2 = 4 < 7 < 8 = 2^3$, nên kết quả nằm giữa $2$ và $3$.',
      ],
      solution: '$\\log_2 7 = \\dfrac{\\ln 7}{\\ln 2} \\approx 2{,}8074 \\approx 2{,}81$.',
    },
    {
      type: 'number',
      prompt:
        'Một dung dịch có $[\\mathrm{H}^+] = 0{,}0001$ mol/L. Tính độ pH của dung dịch, biết $\\mathrm{pH} = -\\log\\,[\\mathrm{H}^+]$.',
      answer: 4,
      hints: ['Viết $0{,}0001$ dưới dạng luỹ thừa của $10$.'],
      solution: '$0{,}0001 = 10^{-4}$, nên $\\mathrm{pH} = -\\log 10^{-4} = -(-4) = 4$.',
    },
    {
      type: 'text',
      prompt: 'Lôgarit cơ số $e$ của một số dương $x$, kí hiệu $\\ln x$, được gọi là gì?',
      accept: ['lôgarit tự nhiên', 'logarit tự nhiên', 'lôgarit nê-pe', 'logarit nepe'],
      hints: ['Cùng với lôgarit thập phân, đây là hai loại lôgarit có tên riêng.'],
      solution: '$\\ln x$ là lôgarit tự nhiên của $x$.',
    },
  ],
  takeaways: [
    '$\\alpha = \\log_a b \\iff a^\\alpha = b$ (với $a > 0$, $a \\ne 1$, $b > 0$).',
    '$\\log_a 1 = 0$, $\\log_a a = 1$, $\\log_a a^\\alpha = \\alpha$, $a^{\\log_a b} = b$.',
    'Lôgarit của tích bằng tổng các lôgarit, của thương bằng hiệu; $\\log_a M^\\alpha = \\alpha \\log_a M$.',
    'Đổi cơ số: $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$; $\\log x$ là cơ số $10$, $\\ln x$ là cơ số $e$.',
  ],
};
