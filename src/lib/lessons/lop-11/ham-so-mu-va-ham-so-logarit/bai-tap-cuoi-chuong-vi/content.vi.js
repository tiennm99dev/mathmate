/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VI: luỹ thừa với số mũ thực, lôgarit, hàm số mũ và hàm số lôgarit, phương trình và bất phương trình mũ, lôgarit; mô hình tăng dân số và phân rã phóng xạ có đồ thị tương tác, kèm bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương VI mở rộng luỹ thừa sang số mũ thực, định nghĩa lôgarit là phép toán ngược của luỹ thừa, nghiên cứu hai hàm số $y = a^x$, $y = \\log_a x$ và dùng chúng để giải phương trình, bất phương trình. Bài ôn tập này hệ thống lại các công thức, cho em thử hai mô hình thực tế (tăng dân số và phân rã phóng xạ) trên đồ thị, và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các định nghĩa, tính chất và công thức của chương.',
    'Tính toán, rút gọn biểu thức chứa luỹ thừa và lôgarit; giải phương trình, bất phương trình mũ và lôgarit.',
    'Vận dụng hàm số mũ và lôgarit vào bài toán tăng trưởng, lãi kép, phân rã phóng xạ.',
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
              'Luỹ thừa ($a > 0$)',
              '$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$; $a^\\alpha a^\\beta = a^{\\alpha + \\beta}$; $\\dfrac{a^\\alpha}{a^\\beta} = a^{\\alpha - \\beta}$; $\\left(a^\\alpha\\right)^\\beta = a^{\\alpha\\beta}$',
            ],
            [
              'Lôgarit ($0 < a \\ne 1$, $b > 0$)',
              '$\\alpha = \\log_a b \\iff a^\\alpha = b$; $a^{\\log_a b} = b$',
            ],
            [
              'Quy tắc tính lôgarit',
              '$\\log_a (MN) = \\log_a M + \\log_a N$; $\\log_a \\dfrac{M}{N} = \\log_a M - \\log_a N$; $\\log_a M^\\alpha = \\alpha \\log_a M$',
            ],
            ['Đổi cơ số', '$\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$'],
            [
              'Hàm số $y = a^x$, $y = \\log_a x$',
              'Đồng biến khi $a > 1$, nghịch biến khi $0 < a < 1$; hai đồ thị đối xứng qua đường thẳng $y = x$',
            ],
            [
              'Phương trình cơ bản',
              '$a^x = b > 0 \\iff x = \\log_a b$; $\\log_a x = b \\iff x = a^b$',
            ],
            [
              'Bất phương trình',
              'Cơ số $a > 1$: giữ chiều; cơ số $0 < a < 1$: đổi chiều; luôn có điều kiện biểu thức dưới dấu lôgarit dương',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Đưa về cùng cơ số: $a^{u(x)} = a^{v(x)} \\iff u(x) = v(x)$; $\\log_a u(x) = \\log_a v(x) \\iff u(x) = v(x) > 0$.',
            'Đặt ẩn phụ: với phương trình chứa $a^{2x}$ và $a^x$, đặt $t = a^x > 0$.',
            'Lấy lôgarit hai vế khi hai vế không cùng cơ số: $5^x = 7 \\iff x = \\log_5 7$.',
            'Mô hình tăng trưởng $S = A e^{rt}$ và phân rã $m = m_0 \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{T}}$: tìm thời gian bằng lôgarit.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Quên điều kiện của lôgarit rồi giữ cả nghiệm ngoại lai; quên đổi chiều bất phương trình khi cơ số nằm giữa $0$ và $1$; viết $\\log_a (M + N) = \\log_a M + \\log_a N$; nhầm $\\log_a M^\\alpha$ với $\\left(\\log_a M\\right)^\\alpha$; quên điều kiện $t > 0$ khi đặt $t = a^x$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt gồm các câu hỏi mới về luỹ thừa, lôgarit, hàm số mũ và hàm số lôgarit, phương trình và bất phương trình. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Tăng dân số và phân rã phóng xạ',
    instruction:
      'Chọn một mô hình. Với "Tăng dân số", kéo tỉ lệ tăng $r$ và chọn mục tiêu gấp $k$ lần; với "Phân rã phóng xạ", kéo chu kì bán rã $T$ và phần trăm còn lại $p$. Đường ngang xanh là mức cần đạt, giao điểm của nó với đồ thị cho thời gian cần tìm; kéo thời gian $t$ để điểm đỏ chạm giao điểm, rồi so với lời giải bằng lôgarit.',
  },
  examples: [
    {
      problem: 'Giải bất phương trình $4^x - 3 \\cdot 2^x + 2 \\le 0$.',
      steps: [
        'Đặt $t = 2^x > 0$; khi đó $4^x = t^2$ và bất phương trình trở thành $t^2 - 3t + 2 \\le 0 \\iff 1 \\le t \\le 2$.',
        '$1 \\le 2^x \\le 2 \\iff 2^0 \\le 2^x \\le 2^1 \\iff 0 \\le x \\le 1$ (cơ số $2 > 1$).',
      ],
      answer: '$S = [0; 1]$.',
    },
    {
      problem:
        'Giả sử dân số của một quốc gia năm 2020 là $100$ triệu người, tăng theo công thức $S = A e^{rt}$ với $r = 0{,}9\\%$ một năm. Sau bao nhiêu năm thì dân số đạt $120$ triệu người?',
      steps: [
        '$100 \\cdot e^{0{,}009t} = 120 \\iff e^{0{,}009t} = 1{,}2$.',
        'Lấy lôgarit tự nhiên hai vế: $0{,}009t = \\ln 1{,}2 \\iff t = \\dfrac{\\ln 1{,}2}{0{,}009} \\approx 20{,}26$.',
      ],
      answer: 'Sau khoảng $20{,}3$ năm, tức là vào khoảng năm 2040.',
    },
    {
      problem:
        'Một chất phóng xạ có chu kì bán rã $8$ ngày. Từ $100$ g chất đó, sau bao nhiêu ngày thì còn lại $10$ g?',
      steps: [
        'Khối lượng còn lại sau $t$ ngày: $m(t) = 100 \\cdot \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{8}}$.',
        '$100 \\cdot \\left(\\dfrac{1}{2}\\right)^{\\frac{t}{8}} = 10 \\iff 2^{\\frac{t}{8}} = 10 \\iff \\dfrac{t}{8} = \\log_2 10$.',
        '$t = 8\\log_2 10 \\approx 26{,}58$.',
      ],
      answer: 'Sau khoảng $26{,}6$ ngày.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $\\dfrac{8^{\\frac{1}{3}} \\cdot 4^{\\frac{3}{2}}}{2^{-1}}$.',
      answer: 32,
      hints: ['$8^{\\frac{1}{3}} = 2$ và $4^{\\frac{3}{2}} = \\left(\\sqrt{4}\\right)^3$.'],
      solution:
        '$8^{\\frac{1}{3}} = 2$, $4^{\\frac{3}{2}} = 2^3 = 8$, nên biểu thức bằng $\\dfrac{2 \\cdot 8}{\\frac{1}{2}} = 32$.',
    },
    {
      type: 'choice',
      prompt: 'Với $a > 0$, biểu thức $\\sqrt[3]{a^2} \\cdot \\sqrt{a}$ bằng',
      options: ['$a^{\\frac{7}{6}}$', '$a^{\\frac{1}{3}}$', '$a^{\\frac{5}{6}}$', '$a^3$'],
      answer: 0,
      hints: ['$\\sqrt[3]{a^2} = a^{\\frac{2}{3}}$, $\\sqrt{a} = a^{\\frac{1}{2}}$.'],
      solution:
        '$a^{\\frac{2}{3}} \\cdot a^{\\frac{1}{2}} = a^{\\frac{2}{3} + \\frac{1}{2}} = a^{\\frac{7}{6}}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\log_2 24 - \\log_2 3$.',
      answer: 3,
      hints: ['Hiệu hai lôgarit cùng cơ số là lôgarit của thương.'],
      solution: '$\\log_2 24 - \\log_2 3 = \\log_2 8 = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $0 < a \\ne 1$, $b > 0$ và $\\log_a b = 2$. Tính $\\log_a \\left(a^3 b^2\\right)$.',
      answer: 7,
      hints: ['Tách lôgarit của tích thành tổng.'],
      solution:
        '$\\log_a \\left(a^3 b^2\\right) = \\log_a a^3 + \\log_a b^2 = 3 + 2\\log_a b = 3 + 4 = 7$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\log_9 27$ (viết dưới dạng phân số).',
      answer: [3, 2],
      hints: ['Đổi sang cơ số $3$.'],
      solution: '$\\log_9 27 = \\dfrac{\\log_3 27}{\\log_3 9} = \\dfrac{3}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số nào nghịch biến trên $\\mathbb{R}$?',
      options: [
        '$y = \\left(\\dfrac{e}{3}\\right)^x$',
        '$y = \\left(\\dfrac{\\pi}{3}\\right)^x$',
        '$y = \\left(\\sqrt{2}\\right)^x$',
        '$y = 2^x$',
      ],
      answer: 0,
      hints: ['So sánh cơ số với $1$: $e \\approx 2{,}718$, $\\pi \\approx 3{,}14$.'],
      solution:
        '$\\dfrac{e}{3} \\approx 0{,}91 < 1$ nên $y = \\left(\\dfrac{e}{3}\\right)^x$ nghịch biến. Các cơ số $\\dfrac{\\pi}{3} \\approx 1{,}05$, $\\sqrt{2}$ và $2$ đều lớn hơn $1$.',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\log_3 (4 - x^2)$ là',
      options: [
        '$(-2; 2)$',
        '$(-\\infty; -2) \\cup (2; +\\infty)$',
        '$[-2; 2]$',
        '$(-\\infty; 2)$',
      ],
      answer: 0,
      hints: ['Giải $4 - x^2 > 0$.'],
      solution: '$4 - x^2 > 0 \\iff x^2 < 4 \\iff -2 < x < 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng các nghiệm của phương trình $2^{x^2 - 3x} = \\dfrac{1}{4}$.',
      answer: 3,
      hints: ['$\\dfrac{1}{4} = 2^{-2}$.', 'Giải $x^2 - 3x = -2$.'],
      solution:
        '$2^{x^2 - 3x} = 2^{-2} \\iff x^2 - 3x + 2 = 0 \\iff x = 1$ hoặc $x = 2$. Tổng các nghiệm bằng $3$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\log_2 (x - 2) + \\log_2 x = 3$.',
      answer: 4,
      hints: ['Điều kiện $x > 2$.', 'Gộp vế trái: $\\log_2 [x(x - 2)] = 3$.'],
      solution:
        'Điều kiện $x > 2$. Phương trình tương đương $x(x - 2) = 8 \\iff x^2 - 2x - 8 = 0 \\iff x = 4$ hoặc $x = -2$. Chỉ $x = 4$ thoả mãn điều kiện.',
    },
    {
      type: 'number',
      prompt: 'Bất phương trình $\\log_{0{,}5} (x - 1) \\ge -3$ có bao nhiêu nghiệm nguyên?',
      answer: 8,
      hints: ['Điều kiện $x > 1$.', 'Cơ số $0{,}5 < 1$: đổi chiều, $x - 1 \\le (0{,}5)^{-3}$.'],
      solution:
        'Điều kiện $x > 1$. Bất phương trình tương đương $x - 1 \\le (0{,}5)^{-3} = 8 \\iff x \\le 9$. Vậy $1 < x \\le 9$: các nghiệm nguyên là $2, 3, \\ldots, 9$, có $8$ nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Dân số tăng theo công thức $S = A e^{rt}$ với tỉ lệ tăng $r = 1{,}07\\%$ một năm. Sau bao nhiêu năm thì dân số tăng gấp đôi? Làm tròn đến hàng phần mười.',
      answer: 64.8,
      tolerance: 0.05,
      unit: 'năm',
      hints: ['Giải $e^{0{,}0107t} = 2$.', '$t = \\dfrac{\\ln 2}{0{,}0107}$.'],
      solution:
        '$A e^{0{,}0107t} = 2A \\iff t = \\dfrac{\\ln 2}{0{,}0107} \\approx 64{,}78 \\approx 64{,}8$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Carbon-14 có chu kì bán rã khoảng $5\\,730$ năm. Một mẫu vật còn $30\\%$ lượng carbon-14 ban đầu. Mẫu vật khoảng bao nhiêu năm tuổi? Làm tròn đến hàng đơn vị.',
      answer: 9953,
      tolerance: 0.5,
      unit: 'năm',
      hints: [
        'Giải $\\left(\\dfrac{1}{2}\\right)^{\\frac{t}{5730}} = 0{,}3$.',
        '$t = 5730 \\cdot \\log_{\\frac{1}{2}} 0{,}3 = 5730 \\cdot \\log_2 \\dfrac{10}{3}$.',
      ],
      solution:
        '$\\left(\\dfrac{1}{2}\\right)^{\\frac{t}{5730}} = 0{,}3 \\iff t = 5730 \\log_2 \\dfrac{10}{3} \\approx 5730 \\cdot 1{,}737 \\approx 9\\,953$ năm.',
    },
  ],
  takeaways: [
    'Luỹ thừa và lôgarit là hai phép toán ngược nhau: $a^\\alpha = b \\iff \\alpha = \\log_a b$.',
    'Cơ số lớn hơn $1$: hàm số mũ và lôgarit đồng biến; cơ số giữa $0$ và $1$: nghịch biến.',
    'Giải phương trình, bất phương trình: đưa về cùng cơ số, đặt ẩn phụ hoặc lấy lôgarit; nhớ điều kiện và chiều bất đẳng thức.',
    'Thời gian để đại lượng tăng trưởng hay suy giảm theo hàm mũ đạt một mức cho trước được tính bằng lôgarit.',
  ],
};
