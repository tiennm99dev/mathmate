/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàm số mũ y = aˣ và hàm số lôgarit y = logₐ x: tập xác định, tập giá trị, đồ thị, tính đồng biến khi a > 1 và nghịch biến khi 0 < a < 1, và sự đối xứng của hai đồ thị qua đường thẳng y = x.',
  intro:
    'Một quần thể vi khuẩn cứ mỗi giờ lại tăng gấp đôi: nếu ban đầu có $100$ con thì sau $x$ giờ có $100 \\cdot 2^x$ con. Ngược lại, muốn biết sau bao lâu số vi khuẩn đạt mức $N$, ta tính $x = \\log_2 \\dfrac{N}{100}$. Hai quy luật này dẫn tới hai hàm số quan trọng: hàm số mũ và hàm số lôgarit.',
  objectives: [
    'Nhận biết hàm số mũ và hàm số lôgarit; tìm tập xác định của chúng.',
    'Nêu được tính chất và vẽ, đọc đồ thị của hàm số mũ và hàm số lôgarit.',
    'Dùng tính đồng biến, nghịch biến theo cơ số để so sánh các luỹ thừa và các lôgarit.',
  ],
  sections: [
    {
      heading: 'Hàm số mũ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho số thực $a > 0$, $a \\ne 1$. Hàm số $y = a^x$ được gọi là hàm số mũ cơ số $a$.',
        },
        {
          type: 'table',
          caption: 'Tính chất của hàm số mũ $y = a^x$',
          head: ['Tính chất', '$a > 1$', '$0 < a < 1$'],
          rows: [
            ['Tập xác định', '$\\mathbb{R}$', '$\\mathbb{R}$'],
            ['Tập giá trị', '$(0; +\\infty)$', '$(0; +\\infty)$'],
            ['Tính đơn điệu', 'Đồng biến trên $\\mathbb{R}$', 'Nghịch biến trên $\\mathbb{R}$'],
            [
              'Đồ thị',
              'Đi qua $(0; 1)$, $(1; a)$; nằm phía trên trục hoành; đi lên',
              'Đi qua $(0; 1)$, $(1; a)$; nằm phía trên trục hoành; đi xuống',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Chẳng hạn $y = 2^x$, $y = \\left(\\sqrt{3}\\right)^x$, $y = e^x$ là các hàm số đồng biến; $y = \\left(\\dfrac{1}{2}\\right)^x$, $y = (0{,}8)^x$ là các hàm số nghịch biến. Hàm số $y = x^2$ hay $y = x^{\\sqrt{2}}$ có biến ở cơ số nên không phải hàm số mũ.',
        },
      ],
    },
    {
      heading: 'Hàm số lôgarit',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho số thực $a > 0$, $a \\ne 1$. Hàm số $y = \\log_a x$ được gọi là hàm số lôgarit cơ số $a$.',
        },
        {
          type: 'table',
          caption: 'Tính chất của hàm số lôgarit $y = \\log_a x$',
          head: ['Tính chất', '$a > 1$', '$0 < a < 1$'],
          rows: [
            ['Tập xác định', '$(0; +\\infty)$', '$(0; +\\infty)$'],
            ['Tập giá trị', '$\\mathbb{R}$', '$\\mathbb{R}$'],
            ['Tính đơn điệu', 'Đồng biến trên $(0; +\\infty)$', 'Nghịch biến trên $(0; +\\infty)$'],
            [
              'Đồ thị',
              'Đi qua $(1; 0)$, $(a; 1)$; nằm bên phải trục tung; đi lên',
              'Đi qua $(1; 0)$, $(a; 1)$; nằm bên phải trục tung; đi xuống',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đồ thị của các hàm số $y = a^x$ và $y = \\log_a x$ đối xứng với nhau qua đường thẳng $y = x$: điểm $(t; a^t)$ thuộc đồ thị hàm số mũ khi và chỉ khi điểm $(a^t; t)$ thuộc đồ thị hàm số lôgarit.',
        },
        {
          type: 'p',
          text: 'Để tìm tập xác định của hàm số $y = \\log_a u(x)$, ta giải điều kiện $u(x) > 0$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đồ thị đối xứng qua y = x',
    instruction:
      "Kéo cơ số $a$ và quan sát: khi $a > 1$ cả hai đồ thị đi lên, khi $0 < a < 1$ cả hai đi xuống, còn $a = 1$ thì không có hàm số nào. Kéo hoành độ $t$ để thấy điểm $M$ trên đồ thị hàm số mũ và điểm $M'$ trên đồ thị hàm số lôgarit luôn đối xứng qua đường thẳng $y = x$.",
  },
  examples: [
    {
      problem:
        'Mỗi hàm số sau đồng biến hay nghịch biến trên $\\mathbb{R}$: $y = \\left(\\sqrt{3}\\right)^x$; $y = \\left(\\dfrac{2}{e}\\right)^x$; $y = \\pi^{-x}$?',
      steps: [
        '$\\sqrt{3} \\approx 1{,}73 > 1$ nên $y = \\left(\\sqrt{3}\\right)^x$ đồng biến trên $\\mathbb{R}$.',
        '$0 < \\dfrac{2}{e} \\approx 0{,}74 < 1$ nên $y = \\left(\\dfrac{2}{e}\\right)^x$ nghịch biến trên $\\mathbb{R}$.',
        '$y = \\pi^{-x} = \\left(\\dfrac{1}{\\pi}\\right)^x$ với $0 < \\dfrac{1}{\\pi} < 1$ nên hàm số nghịch biến trên $\\mathbb{R}$.',
      ],
      answer: 'Hàm thứ nhất đồng biến; hai hàm còn lại nghịch biến.',
    },
    {
      problem:
        'Tìm tập xác định của các hàm số $y = \\log_3 (2x - 4)$ và $y = \\log (x^2 - 4x + 3)$.',
      steps: [
        '$y = \\log_3 (2x - 4)$ xác định khi $2x - 4 > 0 \\iff x > 2$. Tập xác định $D = (2; +\\infty)$.',
        '$y = \\log (x^2 - 4x + 3)$ xác định khi $x^2 - 4x + 3 > 0 \\iff (x - 1)(x - 3) > 0 \\iff x < 1$ hoặc $x > 3$.',
        'Tập xác định $D = (-\\infty; 1) \\cup (3; +\\infty)$.',
      ],
      answer: '$(2; +\\infty)$ và $(-\\infty; 1) \\cup (3; +\\infty)$.',
    },
    {
      problem:
        'So sánh $\\log_{0{,}5} 3$ và $\\log_{0{,}5} \\pi$; so sánh $\\log_2 5$ và $\\log_2 7$.',
      steps: [
        'Hàm số $y = \\log_{0{,}5} x$ có cơ số $0 < 0{,}5 < 1$ nên nghịch biến trên $(0; +\\infty)$. Vì $3 < \\pi$ nên $\\log_{0{,}5} 3 > \\log_{0{,}5} \\pi$.',
        'Hàm số $y = \\log_2 x$ có cơ số $2 > 1$ nên đồng biến. Vì $5 < 7$ nên $\\log_2 5 < \\log_2 7$.',
      ],
      answer: '$\\log_{0{,}5} 3 > \\log_{0{,}5} \\pi$ và $\\log_2 5 < \\log_2 7$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây là hàm số mũ?',
      options: [
        '$y = \\left(\\sqrt{2}\\right)^x$',
        '$y = x^{\\sqrt{2}}$',
        '$y = 1^x$',
        '$y = (-2)^x$',
      ],
      answer: 0,
      hints: ['Hàm số mũ có dạng $y = a^x$ với cơ số $a > 0$, $a \\ne 1$ và biến ở số mũ.'],
      solution:
        '$y = \\left(\\sqrt{2}\\right)^x$ có cơ số $\\sqrt{2} > 0$, khác $1$. $y = x^{\\sqrt{2}}$ có biến ở cơ số; $y = 1^x$ có cơ số $1$; $y = (-2)^x$ có cơ số âm.',
    },
    {
      type: 'multi',
      prompt: 'Những hàm số nào đồng biến trên tập xác định của nó?',
      options: [
        '$y = (1{,}5)^x$',
        '$y = (0{,}9)^x$',
        '$y = \\log_{\\sqrt{2}} x$',
        '$y = \\log_{\\frac{1}{3}} x$',
        '$y = \\left(\\dfrac{\\pi}{3}\\right)^x$',
        '$y = e^{-x}$',
      ],
      answers: [0, 2, 4],
      hints: [
        'Chỉ cần xem cơ số lớn hơn $1$ hay nằm giữa $0$ và $1$.',
        '$\\dfrac{\\pi}{3} \\approx 1{,}05$; $e^{-x} = \\left(\\dfrac{1}{e}\\right)^x$.',
      ],
      solution:
        'Các cơ số $1{,}5$; $\\sqrt{2}$; $\\dfrac{\\pi}{3} \\approx 1{,}05$ lớn hơn $1$ nên ba hàm số tương ứng đồng biến. Các cơ số $0{,}9$; $\\dfrac{1}{3}$; $\\dfrac{1}{e}$ nằm giữa $0$ và $1$ nên ba hàm số kia nghịch biến.',
    },
    {
      type: 'number',
      prompt: 'Tập xác định của hàm số $y = \\log_2 (3x - 6)$ là $(m; +\\infty)$. Tìm $m$.',
      answer: 2,
      hints: ['Hàm số lôgarit chỉ xác định khi biểu thức dưới dấu lôgarit dương.'],
      solution: '$3x - 6 > 0 \\iff x > 2$, nên tập xác định là $(2; +\\infty)$ và $m = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\log (x^2 - 9)$ là',
      options: [
        '$(-\\infty; -3) \\cup (3; +\\infty)$',
        '$(-3; 3)$',
        '$(3; +\\infty)$',
        '$\\mathbb{R} \\setminus \\{-3; 3\\}$',
      ],
      answer: 0,
      hints: ['Giải bất phương trình $x^2 - 9 > 0$.'],
      solution: '$x^2 - 9 > 0 \\iff x^2 > 9 \\iff x < -3$ hoặc $x > 3$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = a^x$ ($a > 0$, $a \\ne 1$) đi qua điểm $(2; 9)$. Tìm $a$.',
      answer: 3,
      hints: ['Thay toạ độ điểm vào công thức: $a^2 = 9$.'],
      solution: '$a^2 = 9$ và $a > 0$ nên $a = 3$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = \\log_a x$ ($a > 0$, $a \\ne 1$) đi qua điểm $(8; 3)$. Tìm $a$.',
      answer: 2,
      hints: ['$\\log_a 8 = 3 \\iff a^3 = 8$.'],
      solution: '$\\log_a 8 = 3 \\iff a^3 = 8 \\iff a = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Với mọi cơ số $a > 0$, $a \\ne 1$, đồ thị hàm số $y = \\log_a x$ luôn đi qua điểm',
      options: ['$(1; 0)$', '$(0; 1)$', '$(1; 1)$', '$(0; a)$'],
      answer: 0,
      hints: ['$\\log_a 1 = ?$'],
      solution:
        '$\\log_a 1 = 0$ nên đồ thị luôn đi qua $(1; 0)$. Điểm $(0; 1)$ thuộc đồ thị hàm số mũ $y = a^x$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$\\log_{0{,}3} 2 > \\log_{0{,}3} 3$',
        '$\\log_{0{,}3} 2 < \\log_{0{,}3} 3$',
        '$(0{,}3)^2 < (0{,}3)^3$',
        '$\\log_3 2 > \\log_3 3$',
      ],
      answer: 0,
      hints: ['Cơ số $0{,}3 < 1$: hàm số nghịch biến.'],
      solution:
        'Với cơ số $0{,}3 < 1$, hàm số $y = \\log_{0{,}3} x$ và $y = (0{,}3)^x$ nghịch biến: $2 < 3$ nên $\\log_{0{,}3} 2 > \\log_{0{,}3} 3$ và $(0{,}3)^2 > (0{,}3)^3$. Còn $\\log_3 2 < \\log_3 3 = 1$.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị hai hàm số $y = 3^x$ và $y = \\log_3 x$ đối xứng nhau qua',
      options: ['đường thẳng $y = x$', 'trục hoành', 'trục tung', 'gốc toạ độ'],
      answer: 0,
      hints: ['Điểm $(1; 3)$ thuộc đồ thị thứ nhất; điểm nào thuộc đồ thị thứ hai?'],
      solution:
        '$(t; 3^t)$ thuộc đồ thị $y = 3^x$ khi và chỉ khi $(3^t; t)$ thuộc đồ thị $y = \\log_3 x$: hai điểm đổi chỗ hoành độ và tung độ, nên đối xứng qua đường thẳng $y = x$.',
    },
  ],
  takeaways: [
    '$y = a^x$ ($0 < a \\ne 1$): xác định trên $\\mathbb{R}$, nhận giá trị trong $(0; +\\infty)$, đồ thị qua $(0; 1)$.',
    '$y = \\log_a x$: xác định trên $(0; +\\infty)$, nhận mọi giá trị thực, đồ thị qua $(1; 0)$.',
    'Cả hai đồng biến khi $a > 1$, nghịch biến khi $0 < a < 1$.',
    'Hai đồ thị $y = a^x$ và $y = \\log_a x$ đối xứng nhau qua đường thẳng $y = x$.',
  ],
};
