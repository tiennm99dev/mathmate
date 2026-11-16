/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức cộng của sin, côsin, tang; công thức nhân đôi và hạ bậc; công thức biến đổi tích thành tổng và tổng thành tích, cùng cách dùng chúng để tính giá trị và rút gọn biểu thức lượng giác.',
  intro:
    'Ta đã biết $\\cos 45^\\circ$ và $\\cos 30^\\circ$. Liệu có tính được đúng $\\cos 15^\\circ$ mà không cần máy tính? Có: vì $15^\\circ = 45^\\circ - 30^\\circ$, chỉ cần một công thức nối giá trị lượng giác của $a - b$ với giá trị lượng giác của $a$ và $b$. Đó là công thức cộng, điểm xuất phát của mọi công thức trong bài này.',
  objectives: [
    'Nhớ và dùng các công thức cộng của sin, côsin và tang.',
    'Dùng công thức nhân đôi và công thức hạ bậc.',
    'Biến đổi tích thành tổng và tổng thành tích để tính giá trị, rút gọn biểu thức.',
  ],
  sections: [
    {
      heading: 'Công thức cộng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức cộng',
          text: '$\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$; $\\quad \\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$; $\\quad \\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b$; $\\quad \\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$.',
        },
        {
          type: 'tex',
          tex: '\\tan(a - b) = \\dfrac{\\tan a - \\tan b}{1 + \\tan a\\tan b}, \\qquad \\tan(a + b) = \\dfrac{\\tan a + \\tan b}{1 - \\tan a\\tan b}',
        },
        {
          type: 'p',
          text: 'Hai công thức của tang chỉ dùng được khi các giá trị tang trong đó đều xác định và mẫu số khác $0$.',
        },
        {
          type: 'p',
          text: 'Vì sao $\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$? Gọi $A(\\cos a; \\sin a)$ và $B(\\cos b; \\sin b)$ là điểm biểu diễn của $a$ và $b$ trên đường tròn lượng giác. Góc lượng giác $(OB, OA)$ có số đo $a - b$, và tích vô hướng $\\overrightarrow{OA} \\cdot \\overrightarrow{OB} = 1 \\cdot 1 \\cdot \\cos(a - b)$. Tính theo toạ độ, tích này bằng $\\cos a\\cos b + \\sin a\\sin b$. Các công thức khác suy ra bằng cách thay $b$ bởi $-b$ hoặc dùng góc phụ nhau.',
        },
      ],
    },
    {
      heading: 'Công thức nhân đôi và hạ bậc',
      blocks: [
        {
          type: 'p',
          text: 'Cho $b = a$ trong công thức cộng, ta được công thức nhân đôi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nhân đôi',
          text: '$\\sin 2a = 2\\sin a\\cos a$; $\\quad \\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$; $\\quad \\tan 2a = \\dfrac{2\\tan a}{1 - \\tan^2 a}$.',
        },
        {
          type: 'p',
          text: 'Từ hai dạng cuối của $\\cos 2a$, ta rút ra $\\cos^2 a$ và $\\sin^2 a$; khi đó luỹ thừa bậc hai được thay bằng biểu thức bậc nhất của $\\cos 2a$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức hạ bậc',
          text: '$\\cos^2 a = \\dfrac{1 + \\cos 2a}{2}$; $\\qquad \\sin^2 a = \\dfrac{1 - \\cos 2a}{2}$.',
        },
      ],
    },
    {
      heading: 'Biến đổi tích thành tổng, tổng thành tích',
      blocks: [
        {
          type: 'p',
          text: 'Cộng hoặc trừ từng vế hai công thức cộng, ta được công thức biến đổi tích thành tổng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức biến đổi tích thành tổng',
          text: '$\\cos a\\cos b = \\dfrac{1}{2}\\left[\\cos(a - b) + \\cos(a + b)\\right]$; $\\quad \\sin a\\sin b = \\dfrac{1}{2}\\left[\\cos(a - b) - \\cos(a + b)\\right]$; $\\quad \\sin a\\cos b = \\dfrac{1}{2}\\left[\\sin(a - b) + \\sin(a + b)\\right]$.',
        },
        {
          type: 'p',
          text: 'Đặt $u = a + b$, $v = a - b$ (tức là $a = \\dfrac{u + v}{2}$, $b = \\dfrac{u - v}{2}$) vào các công thức trên, ta được công thức biến đổi tổng thành tích.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức biến đổi tổng thành tích',
          text: '$\\cos u + \\cos v = 2\\cos\\dfrac{u + v}{2}\\cos\\dfrac{u - v}{2}$; $\\quad \\cos u - \\cos v = -2\\sin\\dfrac{u + v}{2}\\sin\\dfrac{u - v}{2}$; $\\quad \\sin u + \\sin v = 2\\sin\\dfrac{u + v}{2}\\cos\\dfrac{u - v}{2}$; $\\quad \\sin u - \\sin v = 2\\cos\\dfrac{u + v}{2}\\sin\\dfrac{u - v}{2}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Lỗi hay gặp: viết $\\cos(a + b) = \\cos a + \\cos b$ hay $\\sin 2a = 2\\sin a$. Thử với $a = b = 45^\\circ$: $\\cos 90^\\circ = 0$ nhưng $\\cos 45^\\circ + \\cos 45^\\circ = \\sqrt{2}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo hai góc, hai vế luôn bằng nhau',
    instruction:
      'Chọn một công thức, rồi kéo điểm A (góc a) và điểm B (góc b) trên đường tròn, hoặc chọn điểm rồi dùng phím mũi tên. Vế trái được đọc trên điểm C ứng với góc $a \\pm b$ (hay $2a$); vế phải chỉ tính từ toạ độ của A và B. Hai số luôn trùng nhau.',
  },
  examples: [
    {
      problem: 'Tính đúng giá trị của $\\cos 15^\\circ$ và $\\tan 75^\\circ$.',
      steps: [
        '$\\cos 15^\\circ = \\cos(45^\\circ - 30^\\circ) = \\cos 45^\\circ\\cos 30^\\circ + \\sin 45^\\circ\\sin 30^\\circ$.',
        '$= \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$.',
        '$\\tan 75^\\circ = \\tan(45^\\circ + 30^\\circ) = \\dfrac{1 + \\frac{\\sqrt{3}}{3}}{1 - \\frac{\\sqrt{3}}{3}} = \\dfrac{3 + \\sqrt{3}}{3 - \\sqrt{3}}$.',
        'Nhân cả tử và mẫu với $3 + \\sqrt{3}$: $\\dfrac{(3 + \\sqrt{3})^2}{9 - 3} = \\dfrac{12 + 6\\sqrt{3}}{6} = 2 + \\sqrt{3}$.',
      ],
      answer:
        '$\\cos 15^\\circ = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$, $\\tan 75^\\circ = 2 + \\sqrt{3}$.',
    },
    {
      problem:
        'Cho $\\sin a = \\dfrac{3}{5}$ với $0 < a < \\dfrac{\\pi}{2}$. Tính $\\sin 2a$ và $\\cos 2a$.',
      steps: [
        '$\\cos^2 a = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$; vì $0 < a < \\dfrac{\\pi}{2}$ nên $\\cos a = \\dfrac{4}{5}$.',
        '$\\sin 2a = 2\\sin a\\cos a = 2 \\cdot \\dfrac{3}{5} \\cdot \\dfrac{4}{5} = \\dfrac{24}{25}$.',
        '$\\cos 2a = 1 - 2\\sin^2 a = 1 - 2 \\cdot \\dfrac{9}{25} = \\dfrac{7}{25}$.',
      ],
      answer: '$\\sin 2a = \\dfrac{24}{25}$, $\\cos 2a = \\dfrac{7}{25}$.',
    },
    {
      problem:
        'Tính $A = \\cos 75^\\circ\\cos 15^\\circ$ và $B = \\sin 75^\\circ + \\sin 15^\\circ$.',
      steps: [
        '$A = \\dfrac{1}{2}\\left[\\cos(75^\\circ - 15^\\circ) + \\cos(75^\\circ + 15^\\circ)\\right] = \\dfrac{1}{2}(\\cos 60^\\circ + \\cos 90^\\circ) = \\dfrac{1}{2}\\left(\\dfrac{1}{2} + 0\\right) = \\dfrac{1}{4}$.',
        '$B = 2\\sin\\dfrac{75^\\circ + 15^\\circ}{2}\\cos\\dfrac{75^\\circ - 15^\\circ}{2} = 2\\sin 45^\\circ\\cos 30^\\circ$.',
        '$B = 2 \\cdot \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} = \\dfrac{\\sqrt{6}}{2}$.',
      ],
      answer: '$A = \\dfrac{1}{4}$, $B = \\dfrac{\\sqrt{6}}{2}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Cho $\\cos a = \\dfrac{1}{3}$. Tính $\\cos 2a$.',
      answer: [-7, 9],
      hints: ['Chọn dạng của $\\cos 2a$ chỉ chứa $\\cos a$.', '$\\cos 2a = 2\\cos^2 a - 1$.'],
      solution: '$\\cos 2a = 2 \\cdot \\dfrac{1}{9} - 1 = \\dfrac{2}{9} - 1 = -\\dfrac{7}{9}$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\sin a = 0{,}6$. Tính $\\cos 2a$ (viết dưới dạng số thập phân).',
      answer: 0.28,
      hints: ['Dùng $\\cos 2a = 1 - 2\\sin^2 a$, không cần biết dấu của $\\cos a$.'],
      solution: '$\\cos 2a = 1 - 2 \\cdot 0{,}6^2 = 1 - 2 \\cdot 0{,}36 = 1 - 0{,}72 = 0{,}28$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $\\sin a = \\dfrac{3}{5}$, $\\cos b = \\dfrac{5}{13}$ với $a$, $b$ thuộc khoảng $\\left(0; \\dfrac{\\pi}{2}\\right)$. Tính $\\sin(a + b)$.',
      answer: [63, 65],
      hints: [
        'Tìm $\\cos a$ và $\\sin b$ trước; cả hai đều dương.',
        '$\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$.',
      ],
      solution:
        '$\\cos a = \\dfrac{4}{5}$, $\\sin b = \\dfrac{12}{13}$. Vậy $\\sin(a + b) = \\dfrac{3}{5} \\cdot \\dfrac{5}{13} + \\dfrac{4}{5} \\cdot \\dfrac{12}{13} = \\dfrac{15 + 48}{65} = \\dfrac{63}{65}$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\tan a = 2$ và $\\tan b = 3$. Tính $\\tan(a + b)$.',
      answer: -1,
      hints: ['$\\tan(a + b) = \\dfrac{\\tan a + \\tan b}{1 - \\tan a\\tan b}$.'],
      solution: '$\\tan(a + b) = \\dfrac{2 + 3}{1 - 2 \\cdot 3} = \\dfrac{5}{-5} = -1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị của $\\sin 105^\\circ\\sin 15^\\circ$.',
      answer: [1, 4],
      hints: [
        'Biến đổi tích thành tổng: $\\sin a\\sin b = \\dfrac{1}{2}[\\cos(a - b) - \\cos(a + b)]$.',
      ],
      solution:
        '$\\sin 105^\\circ\\sin 15^\\circ = \\dfrac{1}{2}(\\cos 90^\\circ - \\cos 120^\\circ) = \\dfrac{1}{2}\\left(0 + \\dfrac{1}{2}\\right) = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Cho $\\sin 2x = -\\dfrac{1}{3}$. Tính $(\\sin x + \\cos x)^2$.',
      answer: [2, 3],
      hints: [
        'Khai triển bình phương, rồi dùng $\\sin^2 x + \\cos^2 x = 1$ và $2\\sin x\\cos x = \\sin 2x$.',
      ],
      solution:
        '$(\\sin x + \\cos x)^2 = \\sin^2 x + \\cos^2 x + 2\\sin x\\cos x = 1 + \\sin 2x = 1 - \\dfrac{1}{3} = \\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Công thức hạ bậc nào đúng?',
      options: [
        '$\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}$',
        '$\\sin^2 x = \\dfrac{1 + \\cos 2x}{2}$',
        '$\\sin^2 x = \\dfrac{1 - \\cos x}{2}$',
        '$\\sin^2 x = 1 - \\cos 2x$',
      ],
      answer: 0,
      hints: [
        'Xuất phát từ $\\cos 2x = 1 - 2\\sin^2 x$.',
        'Thử với $x = \\dfrac{\\pi}{2}$: vế trái bằng $1$.',
      ],
      solution:
        'Từ $\\cos 2x = 1 - 2\\sin^2 x$ suy ra $\\sin^2 x = \\dfrac{1 - \\cos 2x}{2}$. Kiểm tra với $x = \\dfrac{\\pi}{2}$: $\\sin^2 x = 1$, trong khi $\\dfrac{1 + \\cos\\pi}{2} = 0$, $\\dfrac{1 - \\cos\\frac{\\pi}{2}}{2} = \\dfrac{1}{2}$ và $1 - \\cos\\pi = 2$; chỉ $\\dfrac{1 - \\cos\\pi}{2} = 1$ khớp.',
    },
    {
      type: 'choice',
      prompt: 'Biến đổi $\\sin 5x + \\sin 3x$ thành tích, ta được:',
      options: ['$2\\sin 4x\\cos x$', '$2\\cos 4x\\sin x$', '$2\\sin 4x\\sin x$', '$\\sin 8x$'],
      answer: 0,
      hints: ['$\\sin u + \\sin v = 2\\sin\\dfrac{u + v}{2}\\cos\\dfrac{u - v}{2}$.'],
      solution:
        '$\\sin 5x + \\sin 3x = 2\\sin\\dfrac{5x + 3x}{2}\\cos\\dfrac{5x - 3x}{2} = 2\\sin 4x\\cos x$.',
    },
    {
      type: 'multi',
      prompt: 'Những đẳng thức nào đúng với mọi $x$?',
      options: [
        '$\\cos 2x = \\cos^2 x - \\sin^2 x$',
        '$\\sin 2x = 2\\sin x$',
        '$\\cos\\left(x + \\dfrac{\\pi}{2}\\right) = -\\sin x$',
        '$\\sin(x + y) = \\sin x + \\sin y$',
        '$\\cos^4 x - \\sin^4 x = \\cos 2x$',
      ],
      answers: [0, 2, 4],
      hints: [
        'Thử một giá trị cụ thể, chẳng hạn $x = y = \\dfrac{\\pi}{2}$, để loại đẳng thức sai.',
        '$\\cos^4 x - \\sin^4 x = (\\cos^2 x - \\sin^2 x)(\\cos^2 x + \\sin^2 x)$.',
      ],
      solution:
        '"$\\cos 2x = \\cos^2 x - \\sin^2 x$" là công thức nhân đôi. $\\cos\\left(x + \\dfrac{\\pi}{2}\\right) = \\cos x\\cos\\dfrac{\\pi}{2} - \\sin x\\sin\\dfrac{\\pi}{2} = -\\sin x$. $\\cos^4 x - \\sin^4 x = (\\cos^2 x - \\sin^2 x) \\cdot 1 = \\cos 2x$. Hai đẳng thức còn lại sai: với $x = y = \\dfrac{\\pi}{2}$ thì $\\sin 2x = \\sin\\pi = 0 \\ne 2$ và $\\sin(x + y) = 0 \\ne 2$.',
    },
  ],
  takeaways: [
    'Công thức cộng: $\\cos(a \\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b$, $\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b$.',
    '$\\tan(a \\pm b) = \\dfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}$.',
    'Nhân đôi: $\\sin 2a = 2\\sin a\\cos a$, $\\cos 2a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$; hạ bậc: $\\cos^2 a = \\dfrac{1 + \\cos 2a}{2}$, $\\sin^2 a = \\dfrac{1 - \\cos 2a}{2}$.',
    'Tích thành tổng và tổng thành tích giúp tính giá trị các biểu thức như $\\cos 75^\\circ\\cos 15^\\circ$ hay $\\sin 75^\\circ + \\sin 15^\\circ$.',
  ],
};
