/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình mũ và phương trình lôgarit cơ bản, đưa về cùng cơ số; bất phương trình mũ và bất phương trình lôgarit cơ bản, chiều của bất đẳng thức đổi theo cơ số; ứng dụng vào bài toán lãi kép.',
  intro:
    'Gửi $100$ triệu đồng với lãi suất $6\\%$ một năm theo thể thức lãi kép, sau bao nhiêu năm thì số tiền đạt ít nhất $150$ triệu đồng? Ta cần tìm $n$ để $100 \\cdot 1{,}06^n \\ge 150$: một bất phương trình mũ, với ẩn nằm ở số mũ. Bài này giải các phương trình và bất phương trình như thế bằng lôgarit và tính đơn điệu của hàm số mũ, hàm số lôgarit.',
  objectives: [
    'Giải phương trình mũ, phương trình lôgarit cơ bản và những phương trình đưa được về cùng cơ số.',
    'Giải bất phương trình mũ, bất phương trình lôgarit cơ bản, giữ hay đổi chiều bất đẳng thức tuỳ theo cơ số.',
    'Vận dụng vào các bài toán thực tế như lãi kép, tăng trưởng.',
  ],
  sections: [
    {
      heading: 'Phương trình mũ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình mũ cơ bản',
          text: 'Phương trình $a^x = b$ ($a > 0$, $a \\ne 1$): nếu $b \\le 0$ thì phương trình vô nghiệm; nếu $b > 0$ thì phương trình có nghiệm duy nhất $x = \\log_a b$.',
        },
        {
          type: 'p',
          text: 'Minh hoạ bằng đồ thị: đường thẳng $y = b$ không cắt đồ thị $y = a^x$ khi $b \\le 0$ (đồ thị nằm phía trên trục hoành), và cắt tại đúng một điểm khi $b > 0$ (hàm số đơn điệu).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Với $a > 0$, $a \\ne 1$: $a^{u(x)} = a^{v(x)} \\iff u(x) = v(x)$. Vì vậy ta thường đưa hai vế về cùng cơ số, chẳng hạn $4^x = 8 \\iff 2^{2x} = 2^3 \\iff x = \\dfrac{3}{2}$.',
        },
      ],
    },
    {
      heading: 'Phương trình lôgarit',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình lôgarit cơ bản',
          text: 'Phương trình $\\log_a x = b$ ($a > 0$, $a \\ne 1$) luôn có nghiệm duy nhất $x = a^b$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: '$\\log_a u(x) = \\log_a v(x) \\iff u(x) = v(x)$ với điều kiện $u(x) > 0$ (hoặc $v(x) > 0$). Khi giải phương trình lôgarit, luôn đặt điều kiện để các biểu thức dưới dấu lôgarit dương, rồi đối chiếu nghiệm với điều kiện.',
        },
      ],
    },
    {
      heading: 'Bất phương trình mũ',
      blocks: [
        {
          type: 'table',
          caption: 'Tập nghiệm của bất phương trình $a^x > b$',
          head: ['Vế phải', '$a > 1$', '$0 < a < 1$'],
          rows: [
            ['$b \\le 0$', '$\\mathbb{R}$', '$\\mathbb{R}$'],
            ['$b > 0$', '$(\\log_a b; +\\infty)$', '$(-\\infty; \\log_a b)$'],
          ],
        },
        {
          type: 'p',
          text: 'Các bất phương trình $a^x \\ge b$, $a^x < b$, $a^x \\le b$ giải tương tự. Với $a > 1$: $a^{u(x)} > a^{v(x)} \\iff u(x) > v(x)$; với $0 < a < 1$: $a^{u(x)} > a^{v(x)} \\iff u(x) < v(x)$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Khi cơ số nằm giữa $0$ và $1$, bỏ cơ số thì phải đổi chiều bất đẳng thức, vì hàm số nghịch biến.',
        },
      ],
    },
    {
      heading: 'Bất phương trình lôgarit',
      blocks: [
        {
          type: 'table',
          caption: 'Tập nghiệm của bất phương trình $\\log_a x > b$',
          head: ['Cơ số', 'Tập nghiệm'],
          rows: [
            ['$a > 1$', '$x > a^b$, tức là $(a^b; +\\infty)$'],
            ['$0 < a < 1$', '$0 < x < a^b$, tức là $(0; a^b)$'],
          ],
        },
        {
          type: 'p',
          text: 'Tương tự, với $a > 1$: $\\log_a u(x) > \\log_a v(x) \\iff u(x) > v(x) > 0$; với $0 < a < 1$: $\\log_a u(x) > \\log_a v(x) \\iff 0 < u(x) < v(x)$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường ngang y = b và miền nghiệm',
    instruction:
      'Chọn hàm số mũ hoặc lôgarit, cơ số và dấu, rồi kéo vế phải $b$. Đường ngang $y = b$ cắt đồ thị tại hoành độ $x_0$; phần trục hoành được tô đỏ là tập nghiệm, nơi đồ thị nằm trên (hoặc dưới) đường ngang. Đổi cơ số từ $2$ sang $\\dfrac{1}{2}$ để thấy miền nghiệm lật sang phía bên kia.',
  },
  examples: [
    {
      problem: 'Giải các phương trình: a) $2^{x + 1} = 8$; b) $5^x = 7$; c) $9^{x} = 3^{x + 4}$.',
      steps: [
        'a) $2^{x + 1} = 2^3 \\iff x + 1 = 3 \\iff x = 2$.',
        'b) $7 > 0$ nên phương trình có nghiệm duy nhất $x = \\log_5 7$.',
        'c) $9^x = 3^{2x}$, nên $3^{2x} = 3^{x + 4} \\iff 2x = x + 4 \\iff x = 4$.',
      ],
      answer: 'a) $x = 2$; b) $x = \\log_5 7$; c) $x = 4$.',
    },
    {
      problem:
        'Giải các phương trình: a) $\\log_2 (x - 1) = 3$; b) $\\log_3 (x + 2) = \\log_3 (2x - 1)$.',
      steps: [
        'a) Điều kiện $x > 1$. Phương trình tương đương $x - 1 = 2^3 = 8 \\iff x = 9$ (thoả mãn).',
        'b) Điều kiện $x + 2 > 0$ và $2x - 1 > 0$, tức là $x > \\dfrac{1}{2}$.',
        'Khi đó $x + 2 = 2x - 1 \\iff x = 3$ (thoả mãn điều kiện).',
      ],
      answer: 'a) $x = 9$; b) $x = 3$.',
    },
    {
      problem:
        'Giải các bất phương trình: a) $\\left(\\dfrac{1}{2}\\right)^x > 4$; b) $\\log_{\\frac{1}{3}} (x - 1) \\ge -2$.',
      steps: [
        'a) Cơ số $\\dfrac{1}{2} < 1$ nên $\\left(\\dfrac{1}{2}\\right)^x > 4 \\iff x < \\log_{\\frac{1}{2}} 4 = -2$. Tập nghiệm $(-\\infty; -2)$.',
        'b) Điều kiện $x > 1$. Cơ số $\\dfrac{1}{3} < 1$ nên bất phương trình tương đương $x - 1 \\le \\left(\\dfrac{1}{3}\\right)^{-2} = 9 \\iff x \\le 10$.',
        'Kết hợp điều kiện: $1 < x \\le 10$.',
      ],
      answer: 'a) $S = (-\\infty; -2)$; b) $S = (1; 10]$.',
    },
    {
      problem:
        'Gửi $100$ triệu đồng với lãi suất $6\\%$ một năm theo thể thức lãi kép. Sau ít nhất bao nhiêu năm thì số tiền đạt ít nhất $150$ triệu đồng?',
      steps: [
        'Sau $n$ năm, số tiền là $100 \\cdot 1{,}06^n$ triệu đồng. Cần $100 \\cdot 1{,}06^n \\ge 150 \\iff 1{,}06^n \\ge 1{,}5$.',
        'Cơ số $1{,}06 > 1$ nên $n \\ge \\log_{1{,}06} 1{,}5 \\approx 6{,}96$.',
        '$n$ là số tự nhiên nên $n \\ge 7$. Kiểm tra: $100 \\cdot 1{,}06^6 \\approx 141{,}85$ và $100 \\cdot 1{,}06^7 \\approx 150{,}36$.',
      ],
      answer: 'Sau ít nhất $7$ năm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Giải phương trình $3^{x - 2} = 27$.',
      answer: 5,
      hints: ['Viết $27 = 3^3$.'],
      solution: '$3^{x - 2} = 3^3 \\iff x - 2 = 3 \\iff x = 5$.',
    },
    {
      type: 'fraction',
      prompt: 'Giải phương trình $4^x = 8$ (viết nghiệm dưới dạng phân số).',
      answer: [3, 2],
      hints: ['Đưa hai vế về cơ số $2$.'],
      solution: '$4^x = 2^{2x}$ và $8 = 2^3$, nên $2x = 3 \\iff x = \\dfrac{3}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\log_2 (x + 3) = 4$.',
      answer: 13,
      hints: ['$\\log_a u = b \\iff u = a^b$.', 'Nhớ điều kiện $x + 3 > 0$.'],
      solution:
        'Điều kiện $x > -3$. Phương trình tương đương $x + 3 = 2^4 = 16 \\iff x = 13$ (thoả mãn).',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\log_3 (2x - 1) = \\log_3 (x + 4)$.',
      answer: 5,
      hints: ['Hai lôgarit cùng cơ số bằng nhau khi hai biểu thức bằng nhau và dương.'],
      solution:
        'Điều kiện $x > \\dfrac{1}{2}$. Khi đó $2x - 1 = x + 4 \\iff x = 5$, thoả mãn điều kiện.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $3^x = -3$ có bao nhiêu nghiệm?',
      answer: 0,
      hints: ['$3^x$ luôn dương.'],
      solution: '$3^x > 0$ với mọi $x$ mà $-3 < 0$, nên phương trình vô nghiệm: có $0$ nghiệm.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng các nghiệm của phương trình $25^x - 6 \\cdot 5^x + 5 = 0$.',
      answer: 1,
      hints: ['Đặt $t = 5^x > 0$; khi đó $25^x = t^2$.', 'Giải $t^2 - 6t + 5 = 0$.'],
      solution:
        'Đặt $t = 5^x > 0$: $t^2 - 6t + 5 = 0 \\iff t = 1$ hoặc $t = 5$. Suy ra $x = 0$ hoặc $x = 1$; tổng các nghiệm bằng $1$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $2^x > 8$ là',
      options: ['$(3; +\\infty)$', '$(-\\infty; 3)$', '$[3; +\\infty)$', '$(8; +\\infty)$'],
      answer: 0,
      hints: ['Cơ số $2 > 1$: giữ nguyên chiều.'],
      solution: '$2^x > 2^3 \\iff x > 3$ vì cơ số $2 > 1$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $(0{,}5)^x \\le 0{,}25$ là',
      options: ['$[2; +\\infty)$', '$(-\\infty; 2]$', '$(2; +\\infty)$', '$(-\\infty; -2]$'],
      answer: 0,
      hints: ['$0{,}25 = (0{,}5)^2$.', 'Cơ số nhỏ hơn $1$: đổi chiều.'],
      solution: '$(0{,}5)^x \\le (0{,}5)^2 \\iff x \\ge 2$ vì $0 < 0{,}5 < 1$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $\\log_{\\frac{1}{2}} (x - 1) > -1$ là',
      options: ['$(1; 3)$', '$(3; +\\infty)$', '$(-\\infty; 3)$', '$(1; +\\infty)$'],
      answer: 0,
      hints: [
        'Điều kiện $x > 1$.',
        'Cơ số $\\dfrac{1}{2} < 1$: $x - 1 < \\left(\\dfrac{1}{2}\\right)^{-1}$.',
      ],
      solution:
        'Điều kiện $x > 1$. Bất phương trình tương đương $x - 1 < \\left(\\dfrac{1}{2}\\right)^{-1} = 2 \\iff x < 3$. Tập nghiệm $(1; 3)$.',
    },
    {
      type: 'number',
      prompt: 'Bất phương trình $\\log_2 x < 3$ có bao nhiêu nghiệm nguyên?',
      answer: 7,
      hints: ['Đừng quên điều kiện $x > 0$.'],
      solution:
        '$\\log_2 x < 3 \\iff 0 < x < 2^3 = 8$. Các nghiệm nguyên là $1, 2, \\ldots, 7$: có $7$ nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng với lãi suất $7\\%$ một năm theo thể thức lãi kép. Sau ít nhất bao nhiêu năm thì số tiền vượt quá $200$ triệu đồng?',
      answer: 11,
      unit: 'năm',
      hints: ['Giải $1{,}07^n > 2$.', '$n > \\log_{1{,}07} 2 \\approx 10{,}24$.'],
      solution:
        '$100 \\cdot 1{,}07^n > 200 \\iff 1{,}07^n > 2 \\iff n > \\log_{1{,}07} 2 \\approx 10{,}24$. Số năm là số tự nhiên nên ít nhất $11$ năm.',
    },
  ],
  takeaways: [
    '$a^x = b$: vô nghiệm khi $b \\le 0$; khi $b > 0$ có nghiệm duy nhất $x = \\log_a b$.',
    '$\\log_a x = b$ luôn có nghiệm duy nhất $x = a^b$; nhớ đặt điều kiện cho biểu thức dưới dấu lôgarit.',
    'Bất phương trình: cơ số lớn hơn $1$ giữ chiều, cơ số giữa $0$ và $1$ đổi chiều.',
    'Đưa về cùng cơ số hoặc lấy lôgarit hai vế; đối chiếu nghiệm với điều kiện.',
  ],
};
