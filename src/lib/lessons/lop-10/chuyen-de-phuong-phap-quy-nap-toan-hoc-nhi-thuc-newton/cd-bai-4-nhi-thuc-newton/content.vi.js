/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhị thức Newton tổng quát: tam giác Pascal, công thức khai triển (a + b)^n với mọi số tự nhiên n, số hạng tổng quát, tìm hệ số và các hệ quả về tổng các số tổ hợp.',
  intro:
    'Ở Toán 10 ta đã khai triển $(a + b)^4$ và $(a + b)^5$ bằng các số tổ hợp. Còn $(a + b)^{10}$, $(2 - 3x)^{10}$ thì sao? Không cần nhân mười ngoặc: tam giác Pascal và công thức nhị thức Newton tổng quát cho ngay mọi hệ số, và phương pháp quy nạp vừa học giúp ta chứng minh công thức đó đúng với mọi $n$.',
  objectives: [
    'Lập tam giác Pascal và giải thích quy luật của nó bằng hệ thức $C_{n}^{k-1} + C_{n}^{k} = C_{n+1}^{k}$.',
    'Phát biểu và áp dụng công thức nhị thức Newton $(a + b)^n$ với $n$ là số tự nhiên bất kì.',
    'Viết số hạng tổng quát $T_{k+1} = C_n^k a^{n-k}b^k$, tìm hệ số của một luỹ thừa và số hạng không chứa $x$.',
    'Dùng khai triển để tính tổng các số tổ hợp.',
  ],
  sections: [
    {
      heading: 'Tam giác Pascal',
      blocks: [
        {
          type: 'p',
          text: 'Viết các hệ số của khai triển $(a + b)^n$ với $n = 0, 1, 2, \\dots$ thành từng hàng, ta được một bảng hình tam giác gọi là tam giác Pascal. Hàng thứ $n$ (tính từ hàng $0$) gồm các số $C_n^0, C_n^1, \\dots, C_n^n$.',
        },
        {
          type: 'table',
          head: ['$n$', 'Hàng $n$ của tam giác Pascal'],
          rows: [
            ['$0$', '$1$'],
            ['$1$', '$1 \\quad 1$'],
            ['$2$', '$1 \\quad 2 \\quad 1$'],
            ['$3$', '$1 \\quad 3 \\quad 3 \\quad 1$'],
            ['$4$', '$1 \\quad 4 \\quad 6 \\quad 4 \\quad 1$'],
            ['$5$', '$1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1$'],
            ['$6$', '$1 \\quad 6 \\quad 15 \\quad 20 \\quad 15 \\quad 6 \\quad 1$'],
            ['$7$', '$1 \\quad 7 \\quad 21 \\quad 35 \\quad 35 \\quad 21 \\quad 7 \\quad 1$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy luật của tam giác Pascal',
          text: 'Hai số ở hai đầu mỗi hàng đều bằng $1$. Mỗi số bên trong bằng tổng hai số đứng ngay trên nó ở hàng trước, do hệ thức $C_{n}^{k-1} + C_{n}^{k} = C_{n+1}^{k}$ ($1 \\le k \\le n$). Các số cách đều hai đầu mỗi hàng thì bằng nhau vì $C_n^k = C_n^{n-k}$.',
        },
      ],
    },
    {
      heading: 'Công thức nhị thức Newton',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhị thức Newton',
          text: 'Với mọi số tự nhiên $n \\ge 1$: $$\\begin{aligned} (a + b)^n = {} & C_n^0a^n + C_n^1a^{n-1}b + \\dots \\\\ & + C_n^ka^{n-k}b^k + \\dots \\\\ & + C_n^{n-1}ab^{n-1} + C_n^nb^n. \\end{aligned}$$',
        },
        {
          type: 'list',
          items: [
            'Khai triển có $n + 1$ số hạng.',
            'Số mũ của $a$ giảm dần từ $n$ về $0$, số mũ của $b$ tăng dần từ $0$ lên $n$; trong mỗi số hạng, tổng hai số mũ bằng $n$ (quy ước $a^0 = b^0 = 1$).',
            'Các hệ số $C_n^0, C_n^1, \\dots, C_n^n$ chính là hàng $n$ của tam giác Pascal.',
          ],
        },
        {
          type: 'p',
          text: 'Chứng minh bằng quy nạp theo $n$. Với $n = 1$: $(a + b)^1 = C_1^0a + C_1^1b$, đúng. Giả sử công thức đúng với $n = k$. Khi đó $(a + b)^{k+1} = (a + b)^k(a + b)$; nhân từng số hạng $C_k^ja^{k-j}b^j$ với $a$ và với $b$ rồi gom các số hạng chứa $a^{k+1-j}b^j$, hệ số thu được là $C_k^j + C_k^{j-1} = C_{k+1}^j$. Vậy công thức đúng với $n = k + 1$.',
        },
        {
          type: 'p',
          text: 'Khi khai triển một hiệu, viết $a - b = a + (-b)$: các số hạng có $b$ với số mũ lẻ mang dấu trừ, nên dấu xen kẽ $+, -, +, \\dots$',
        },
      ],
    },
    {
      heading: 'Số hạng tổng quát',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số hạng tổng quát',
          text: 'Số hạng thứ $k + 1$ của khai triển $(a + b)^n$ (theo số mũ của $a$ giảm dần) là $T_{k+1} = C_n^ka^{n-k}b^k$, với $0 \\le k \\le n$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết $T_{k+1}$ với $a$, $b$ cụ thể (giữ cả hệ số và dấu của $b$ trong ngoặc).',
            'Gom các luỹ thừa của $x$ thành $x^{m(k)}$.',
            'Giải $m(k)$ bằng số mũ cần tìm (bằng $0$ nếu tìm số hạng không chứa $x$) để được $k$, với $k$ là số tự nhiên, $0 \\le k \\le n$.',
            'Thay $k$ vào để tính hệ số.',
          ],
        },
      ],
    },
    {
      heading: 'Hệ quả',
      blocks: [
        {
          type: 'p',
          text: 'Thay $a = b = 1$ vào công thức, rồi thay $a = 1$, $b = -1$, ta được hai hệ thức:',
        },
        {
          type: 'tex',
          tex: 'C_n^0 + C_n^1 + \\dots + C_n^n = 2^n, \\qquad C_n^0 - C_n^1 + C_n^2 - \\dots + (-1)^nC_n^n = 0',
        },
        {
          type: 'p',
          text: 'Hệ thức thứ nhất cho biết một tập hợp có $n$ phần tử có tất cả $2^n$ tập con. Hệ thức thứ hai cho biết số tập con có số phần tử chẵn bằng số tập con có số phần tử lẻ, mỗi loại $2^{n-1}$ tập.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tổng các hệ số',
          text: 'Tổng các hệ số của một đa thức $P(x)$ bằng $P(1)$. Chẳng hạn tổng các hệ số trong khai triển $(2x + 1)^5$ là $(2 + 1)^5 = 243$.',
        },
      ],
    },
    {
      heading: 'Dự án: Bí mật của tam giác Pascal',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập tam giác Pascal đến hàng $15$, tìm các quy luật ẩn trong đó và giải thích một quy luật bằng công thức tổ hợp hoặc nhị thức Newton.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô, bút màu, có thể dùng phần mềm bảng tính (mỗi ô bằng tổng hai ô phía trên).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập tam giác Pascal đến hàng $15$ và kiểm tra tổng mỗi hàng bằng $2^n$.',
            'Tô màu các ô chứa số lẻ: hình nhận được giống hình nào? (Tìm hiểu về tam giác Sierpiński.)',
            'Cộng các số trên những "đường chéo nông" của tam giác: dãy tổng nhận được là dãy số nào?',
            'So sánh các hàng $0$ đến $4$ với $11^0, 11^1, \\dots, 11^4$; giải thích bằng khai triển $(10 + 1)^n$ và cho biết vì sao quy luật không còn đúng nguyên vẹn từ hàng $5$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tam giác Pascal đã lập, hình tô màu, các quy luật tìm được và lời giải thích cho ít nhất một quy luật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tam giác Pascal và số hạng tổng quát',
    instruction:
      'Chọn nhị thức, chọn số mũ $n$ và chỉ số $k$ (hoặc chạm vào một số của tam giác). Quan sát số hạng tổng quát $T_{k+1}$ được tô màu trong khai triển, và hai số màu cam ở hàng trên cộng lại thành số đang chọn.',
  },
  examples: [
    {
      problem: 'Khai triển $(x - 2y)^6$.',
      steps: [
        'Hàng $6$ của tam giác Pascal: $1, 6, 15, 20, 15, 6, 1$.',
        'Áp dụng công thức với $a = x$, $b = -2y$: $T_{k+1} = C_6^kx^{6-k}(-2y)^k = C_6^k(-2)^kx^{6-k}y^k$.',
        'Các hệ số $C_6^k(-2)^k$ lần lượt là $1, -12, 60, -160, 240, -192, 64$.',
      ],
      answer: '$(x - 2y)^6 = x^6 - 12x^5y + 60x^4y^2 - 160x^3y^3 + 240x^2y^4 - 192xy^5 + 64y^6$.',
    },
    {
      problem: 'Tìm hệ số của $x^7$ trong khai triển $(2 - 3x)^{10}$.',
      steps: [
        'Số hạng tổng quát: $T_{k+1} = C_{10}^k \\cdot 2^{10-k}(-3x)^k = C_{10}^k \\cdot 2^{10-k}(-3)^kx^k$.',
        'Số hạng chứa $x^7$ ứng với $k = 7$.',
        'Hệ số: $C_{10}^7 \\cdot 2^3 \\cdot (-3)^7 = 120 \\cdot 8 \\cdot (-2\\,187) = -2\\,099\\,520$.',
      ],
      answer: 'Hệ số của $x^7$ là $-2\\,099\\,520$.',
    },
    {
      problem:
        'Tìm số hạng không chứa $x$ trong khai triển $\\left(x^2 + \\dfrac{1}{x}\\right)^6$ ($x \\ne 0$).',
      steps: [
        '$T_{k+1} = C_6^k(x^2)^{6-k}\\left(\\dfrac{1}{x}\\right)^k = C_6^kx^{12-2k}x^{-k} = C_6^kx^{12-3k}$.',
        'Số hạng không chứa $x$ ứng với $12 - 3k = 0$, tức là $k = 4$.',
        'Số hạng đó là $T_5 = C_6^4 = 15$.',
      ],
      answer: 'Số hạng không chứa $x$ là $15$.',
    },
    {
      problem:
        "Tính $S = C_{10}^0 + C_{10}^1 + \\dots + C_{10}^{10}$ và $S' = C_{10}^0 - C_{10}^1 + C_{10}^2 - \\dots + C_{10}^{10}$.",
      steps: [
        'Theo nhị thức Newton, $(1 + x)^{10} = C_{10}^0 + C_{10}^1x + \\dots + C_{10}^{10}x^{10}$.',
        'Thay $x = 1$: $S = (1 + 1)^{10} = 2^{10} = 1\\,024$.',
        "Thay $x = -1$: $S' = (1 - 1)^{10} = 0$.",
      ],
      answer: "$S = 1\\,024$, $S' = 0$.",
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^8$ trong khai triển $(2x + 3)^{10}$.',
      answer: 103680,
      hints: ['$T_{k+1} = C_{10}^k(2x)^{10-k}3^k$.', 'Số mũ của $x$ là $10 - k = 8$, nên $k = 2$.'],
      solution:
        'Với $k = 2$: hệ số là $C_{10}^2 \\cdot 2^8 \\cdot 3^2 = 45 \\cdot 256 \\cdot 9 = 103\\,680$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$ biết hệ số của $x^2$ trong khai triển $(1 - 3x)^n$ bằng $90$.',
      answer: 5,
      hints: [
        'Hệ số của $x^2$ là $C_n^2(-3)^2 = 9C_n^2$.',
        'Giải $C_n^2 = \\dfrac{n(n-1)}{2} = 10$.',
      ],
      solution:
        '$9C_n^2 = 90 \\Rightarrow C_n^2 = 10 \\Rightarrow n(n - 1) = 20 \\Rightarrow n = 5$ (loại $n = -4$).',
    },
    {
      type: 'number',
      prompt: 'Tính tổng các hệ số trong khai triển $(3x - 5)^4$.',
      answer: 16,
      hints: ['Tổng các hệ số của đa thức $P(x)$ bằng $P(1)$.'],
      solution: 'Thay $x = 1$: $(3 - 5)^4 = (-2)^4 = 16$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm hệ số của số hạng thứ tư trong khai triển $(a + b)^9$ theo luỹ thừa giảm dần của $a$.',
      answer: 84,
      hints: ['Số hạng thứ tư là $T_4 = T_{k+1}$ với $k = 3$.'],
      solution: '$T_4 = C_9^3a^6b^3 = 84a^6b^3$, hệ số là $84$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số hạng không chứa $x$ trong khai triển $\\left(2x - \\dfrac{1}{x}\\right)^6$ ($x \\ne 0$).',
      answer: -160,
      hints: [
        '$T_{k+1} = C_6^k(2x)^{6-k}\\left(-\\dfrac{1}{x}\\right)^k = C_6^k2^{6-k}(-1)^kx^{6-2k}$.',
        'Giải $6 - 2k = 0$.',
      ],
      solution:
        '$6 - 2k = 0 \\Rightarrow k = 3$. Số hạng cần tìm là $C_6^3 \\cdot 2^3 \\cdot (-1)^3 = 20 \\cdot 8 \\cdot (-1) = -160$.',
    },
    {
      type: 'choice',
      prompt: 'Khai triển $(a + b)^{12}$ có bao nhiêu số hạng?',
      options: ['$13$', '$12$', '$11$', '$24$'],
      answer: 0,
      hints: ['Số mũ của $b$ chạy từ $0$ đến $12$.'],
      solution: 'Khai triển $(a + b)^n$ có $n + 1$ số hạng, nên $(a + b)^{12}$ có $13$ số hạng.',
    },
    {
      type: 'number',
      prompt:
        'Hàng $6$ của tam giác Pascal là $1, 6, 15, 20, 15, 6, 1$. Dùng quy luật cộng hai số liền nhau, tìm số thứ tư của hàng $7$ (tức là $C_7^3$).',
      answer: 35,
      hints: ['$C_7^3 = C_6^2 + C_6^3$.'],
      solution: '$C_7^3 = C_6^2 + C_6^3 = 15 + 20 = 35$.',
    },
    {
      type: 'number',
      prompt: 'Tính $C_{20}^0 + C_{20}^2 + C_{20}^4 + \\dots + C_{20}^{20}$.',
      answer: 524288,
      hints: [
        'Cộng hai hệ thức $\\sum C_{20}^k = 2^{20}$ và $\\sum (-1)^kC_{20}^k = 0$.',
        'Các số hạng chỉ số lẻ triệt tiêu, các số hạng chỉ số chẵn được nhân đôi.',
      ],
      solution:
        'Cộng $C_{20}^0 + C_{20}^1 + \\dots + C_{20}^{20} = 2^{20}$ với $C_{20}^0 - C_{20}^1 + \\dots + C_{20}^{20} = 0$ được $2(C_{20}^0 + C_{20}^2 + \\dots + C_{20}^{20}) = 2^{20}$. Vậy tổng cần tìm là $2^{19} = 524\\,288$.',
    },
    {
      type: 'number',
      prompt:
        'Một tập hợp có $6$ phần tử có tất cả bao nhiêu tập con (kể cả tập rỗng và chính nó)?',
      answer: 64,
      hints: ['Số tập con có $k$ phần tử là $C_6^k$.'],
      solution: 'Số tập con là $C_6^0 + C_6^1 + \\dots + C_6^6 = 2^6 = 64$.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi khai triển với hệ số của $x^2$ trong khai triển đó.',
      left: ['$(1 + x)^5$', '$(x - 1)^4$', '$(2x + 1)^3$'],
      right: ['$10$', '$6$', '$12$', '$-6$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Viết số hạng tổng quát và chọn $k$ để số mũ của $x$ bằng $2$.'],
      solution:
        '$(1 + x)^5$: $C_5^2 = 10$. $(x - 1)^4$: $C_4^2x^2(-1)^2$, hệ số $6$. $(2x + 1)^3$: $C_3^1(2x)^2 \\cdot 1 = 12x^2$, hệ số $12$.',
    },
  ],
  takeaways: [
    'Tam giác Pascal: hai đầu bằng $1$, mỗi số bên trong bằng tổng hai số trên nó ($C_{n}^{k-1} + C_{n}^{k} = C_{n+1}^{k}$).',
    '$(a + b)^n = \\sum_{k=0}^{n} C_n^ka^{n-k}b^k$ có $n + 1$ số hạng, đúng với mọi $n \\ge 1$ (chứng minh bằng quy nạp).',
    'Số hạng tổng quát $T_{k+1} = C_n^ka^{n-k}b^k$: tìm $k$ từ số mũ cần có rồi tính hệ số, nhớ giữ dấu của $b$.',
    '$C_n^0 + C_n^1 + \\dots + C_n^n = 2^n$ và $C_n^0 - C_n^1 + \\dots + (-1)^nC_n^n = 0$.',
  ],
};
