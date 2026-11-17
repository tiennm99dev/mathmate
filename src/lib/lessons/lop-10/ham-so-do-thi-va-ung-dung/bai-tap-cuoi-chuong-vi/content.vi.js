/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VI: hàm số và đồ thị, hàm số bậc hai, dấu của tam thức bậc hai, bất phương trình bậc hai và phương trình chứa căn quy về phương trình bậc hai.',
  intro:
    'Chương VI đi từ khái niệm hàm số tới hàm số bậc hai và parabol, rồi dùng parabol để xét dấu tam thức bậc hai, giải bất phương trình bậc hai và phương trình chứa căn. Bài này hệ thống lại các kiến thức đó, kèm một bộ đề luyện tập tự sinh và một công cụ vẽ đồ thị để em tự kiểm tra đáp án.',
  objectives: [
    'Tìm tập xác định, xét tính đồng biến, nghịch biến của hàm số.',
    'Tìm đỉnh, trục đối xứng, giá trị lớn nhất hoặc nhỏ nhất và lập bảng biến thiên của hàm số bậc hai.',
    'Xét dấu tam thức bậc hai, giải bất phương trình bậc hai và phương trình chứa căn quy về phương trình bậc hai.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Hàm số',
              'Mỗi $x \\in D$ ứng với đúng một $y$; tập xác định $D$ gồm các $x$ làm biểu thức có nghĩa',
            ],
            [
              'Đồng biến, nghịch biến trên $(a; b)$',
              '$x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ (đồ thị đi lên); $x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$ (đồ thị đi xuống)',
            ],
            [
              'Hàm số bậc hai $y = ax^2 + bx + c$',
              'Parabol đỉnh $S\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$, trục $x = -\\dfrac{b}{2a}$, quay lên khi $a > 0$, quay xuống khi $a < 0$',
            ],
            [
              'Dấu của tam thức bậc hai',
              '$\\Delta < 0$: cùng dấu $a$ với mọi $x$; $\\Delta = 0$: cùng dấu $a$ với mọi $x \\ne -\\dfrac{b}{2a}$; $\\Delta > 0$: trong khoảng hai nghiệm trái dấu $a$, ngoài đoạn hai nghiệm cùng dấu $a$',
            ],
            [
              'Phương trình chứa căn',
              'Bình phương hai vế, giải phương trình bậc hai, thử lại để loại nghiệm ngoại lai',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Kiểm tra đáp án bằng đồ thị',
      blocks: [
        {
          type: 'p',
          text: 'Sau khi giải một bài về tam thức $f(x) = ax^2 + bx + c$, nhập các hệ số vào công cụ dưới đây. Parabol, đỉnh, bảng biến thiên, bảng xét dấu và tập nghiệm của bất phương trình được vẽ ngay để em đối chiếu với lời giải của mình.',
        },
        { type: 'widget', name: 'check' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Công cụ chỉ giúp kiểm tra. Bài làm vẫn cần trình bày đủ các bước: tính $\\Delta$, tìm nghiệm, lập bảng xét dấu hoặc bảng biến thiên và kết luận.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề ôn tập chương VI',
    instruction:
      'Mỗi lượt có hai câu cho mỗi dạng: tập xác định, đỉnh parabol, giá trị lớn nhất hoặc nhỏ nhất, số nghiệm nguyên của bất phương trình bậc hai và hai dạng phương trình chứa căn. Trả lời sai lần đầu sẽ có gợi ý và được làm lại. Với câu về tam thức, em có thể nhập hệ số vào công cụ vẽ đồ thị ở trên để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Cho hàm số $y = x^2 - 2x - 3$. a) Lập bảng biến thiên. b) Giải bất phương trình $x^2 - 2x - 3 > 0$.',
      steps: [
        'a) $x_S = -\\dfrac{-2}{2} = 1$, $y_S = 1 - 2 - 3 = -4$; $a = 1 > 0$.',
        'Hàm số nghịch biến trên $(-\\infty; 1)$, đồng biến trên $(1; +\\infty)$, giá trị nhỏ nhất $-4$ tại $x = 1$.',
        'b) Tam thức có hai nghiệm $x = -1$, $x = 3$ và $a > 0$, nên dương ngoài đoạn $[-1; 3]$.',
      ],
      answer: 'b) $S = (-\\infty; -1) \\cup (3; +\\infty)$.',
    },
    {
      problem: 'Giải phương trình $\\sqrt{x^2 + 2x + 6} = 2x + 1$.',
      steps: [
        'Bình phương hai vế: $x^2 + 2x + 6 = 4x^2 + 4x + 1 \\Leftrightarrow 3x^2 + 2x - 5 = 0$.',
        'Phương trình có nghiệm $x = 1$ và $x = -\\dfrac{5}{3}$.',
        'Thử lại $x = 1$: $\\sqrt{9} = 3 = 2 \\cdot 1 + 1$, nhận. Thử lại $x = -\\dfrac{5}{3}$: vế phải $-\\dfrac{7}{3} < 0$, loại.',
      ],
      answer: 'Phương trình có nghiệm $x = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\sqrt{x - 1} + \\dfrac{1}{x - 3}$ là',
      options: [
        '$[1; +\\infty) \\setminus \\{3\\}$',
        '$(1; +\\infty) \\setminus \\{3\\}$',
        '$[1; 3)$',
        '$\\mathbb{R} \\setminus \\{3\\}$',
      ],
      answer: 0,
      hints: ['Cần $x - 1 \\ge 0$ và $x - 3 \\ne 0$.'],
      solution:
        'Hàm số xác định khi $x \\ge 1$ và $x \\ne 3$, nên $D = [1; +\\infty) \\setminus \\{3\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\sqrt{4 - x^2}$ là',
      options: [
        '$[-2; 2]$',
        '$(-2; 2)$',
        '$(-\\infty; -2] \\cup [2; +\\infty)$',
        '$(-\\infty; 2]$',
      ],
      answer: 0,
      hints: ['Giải bất phương trình bậc hai $4 - x^2 \\ge 0$.'],
      solution:
        'Cần $4 - x^2 \\ge 0$. Tam thức $-x^2 + 4$ có nghiệm $\\pm 2$ và $a = -1 < 0$, nên nó không âm khi $-2 \\le x \\le 2$. $D = [-2; 2]$.',
    },
    {
      type: 'number',
      prompt: 'Tìm tung độ đỉnh của parabol $y = 2x^2 - 8x + 3$.',
      answer: -5,
      hints: ['Tính $x_S = -\\dfrac{b}{2a}$ rồi thay vào công thức.'],
      solution: '$x_S = \\dfrac{8}{4} = 2$, $y_S = 2 \\cdot 4 - 16 + 3 = -5$.',
    },
    {
      type: 'choice',
      prompt: 'Parabol nào có đỉnh $S(-1; 4)$ và bề lõm quay xuống dưới?',
      options: [
        '$y = -x^2 - 2x + 3$',
        '$y = x^2 + 2x + 5$',
        '$y = -x^2 + 2x + 3$',
        '$y = -2x^2 - 4x + 1$',
      ],
      answer: 0,
      hints: ['Cần $a < 0$, $-\\dfrac{b}{2a} = -1$ và tung độ đỉnh bằng $4$.'],
      solution:
        '$y = -x^2 - 2x + 3$: $a = -1 < 0$, $x_S = -\\dfrac{-2}{-2} = -1$, $y_S = -1 + 2 + 3 = 4$ ✓. $y = x^2 + 2x + 5$ có đỉnh $(-1; 4)$ nhưng quay lên; $y = -x^2 + 2x + 3$ có đỉnh $(1; 4)$; $y = -2x^2 - 4x + 1$ có đỉnh $(-1; 3)$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = -x^2 + 4x - 1$ đồng biến trên khoảng nào?',
      options: ['$(-\\infty; 2)$', '$(2; +\\infty)$', '$(-\\infty; 3)$', '$\\mathbb{R}$'],
      answer: 0,
      hints: ['$a < 0$: hàm số đồng biến ở bên trái đỉnh.'],
      solution:
        '$x_S = -\\dfrac{4}{-2} = 2$ và $a = -1 < 0$, nên hàm số đồng biến trên $(-\\infty; 2)$ và nghịch biến trên $(2; +\\infty)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = -x^2 + 6x - 4$.',
      answer: 5,
      hints: ['$a < 0$ nên giá trị lớn nhất là tung độ đỉnh.'],
      solution: '$x_S = 3$, $y_S = -9 + 18 - 4 = 5$. Giá trị lớn nhất bằng $5$, đạt tại $x = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $x^2 - x - 6 \\le 0$ là',
      options: ['$[-2; 3]$', '$(-2; 3)$', '$(-\\infty; -2] \\cup [3; +\\infty)$', '$[-3; 2]$'],
      answer: 0,
      hints: ['Tam thức có hai nghiệm $-2$ và $3$, $a = 1 > 0$.'],
      solution:
        '$x^2 - x - 6 = 0 \\Leftrightarrow x = -2$ hoặc $x = 3$. Với $a > 0$, tam thức không dương trên đoạn giữa hai nghiệm: $S = [-2; 3]$.',
    },
    {
      type: 'choice',
      prompt: 'Tập nghiệm của bất phương trình $-2x^2 + x - 1 < 0$ là',
      options: [
        '$\\mathbb{R}$',
        '$\\varnothing$',
        '$\\left(0; \\dfrac{1}{2}\\right)$',
        '$(-\\infty; 0)$',
      ],
      answer: 0,
      hints: ['Tính $\\Delta$ và xét dấu của $a$.'],
      solution:
        '$\\Delta = 1 - 8 = -7 < 0$ và $a = -2 < 0$, nên $-2x^2 + x - 1 < 0$ với mọi $x$: $S = \\mathbb{R}$.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các giá trị của $m$ để $x^2 - 2mx + 4 > 0$ với mọi $x \\in \\mathbb{R}$.',
      options: ['$m = -3$', '$m = -1$', '$m = 0$', '$m = 2$', '$m = 1{,}5$'],
      answers: [1, 2, 4],
      hints: ['$a = 1 > 0$; cần $\\Delta^{\\prime} = m^2 - 4 < 0$.'],
      solution:
        'Điều kiện là $\\Delta^{\\prime} = m^2 - 4 < 0 \\Leftrightarrow -2 < m < 2$. Thoả mãn: $m = -1$, $m = 0$, $m = 1{,}5$. Với $m = 2$ thì $\\Delta^{\\prime} = 0$ và $(x - 2)^2 = 0$ tại $x = 2$; với $m = -3$ thì $\\Delta^{\\prime} = 5 > 0$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\sqrt{2x^2 - 4x + 1} = x - 1$.',
      answer: 2,
      hints: ['Bình phương được $x^2 - 2x = 0$.', 'Thử lại: vế phải phải không âm.'],
      solution:
        'Bình phương: $2x^2 - 4x + 1 = x^2 - 2x + 1 \\Leftrightarrow x^2 - 2x = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. Với $x = 0$ vế phải bằng $-1$, loại. Với $x = 2$: $\\sqrt{1} = 1 = 2 - 1$, nhận. Nghiệm $x = 2$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\sqrt{x^2 - 3x} = \\sqrt{2x - 6}$.',
      answer: 3,
      hints: [
        'Bình phương được $x^2 - 5x + 6 = 0$.',
        'Thử lại: biểu thức dưới dấu căn phải không âm.',
      ],
      solution:
        'Bình phương: $x^2 - 3x = 2x - 6 \\Leftrightarrow x^2 - 5x + 6 = 0 \\Leftrightarrow x = 2$ hoặc $x = 3$. Với $x = 2$: $2x - 6 = -2 < 0$, loại. Với $x = 3$: hai vế cùng bằng $\\sqrt{0} = 0$, nhận. Nghiệm $x = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng bán một loại sản phẩm với giá $x$ nghìn đồng. Lợi nhuận mỗi ngày là $P(x) = -x^2 + 100x - 1\\,600$ (nghìn đồng). Cửa hàng nên bán với giá bao nhiêu nghìn đồng để lợi nhuận lớn nhất?',
      answer: 50,
      hints: ['$P(x)$ là hàm số bậc hai có $a < 0$: lớn nhất tại đỉnh.'],
      solution:
        'Đỉnh có hoành độ $x = -\\dfrac{100}{2 \\cdot (-1)} = 50$. Khi đó $P(50) = -2\\,500 + 5\\,000 - 1\\,600 = 900$ (nghìn đồng). Cửa hàng nên bán với giá $50$ nghìn đồng.',
    },
  ],
  takeaways: [
    'Tập xác định: mẫu khác $0$, biểu thức dưới căn bậc hai không âm (thường dẫn tới bất phương trình bậc hai).',
    'Hàm số bậc hai: đỉnh $\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$ cho giá trị lớn nhất hoặc nhỏ nhất và chia hai khoảng đơn điệu.',
    'Bất phương trình bậc hai: dùng định lí về dấu của tam thức; phương trình chứa căn: bình phương rồi thử lại.',
  ],
};
