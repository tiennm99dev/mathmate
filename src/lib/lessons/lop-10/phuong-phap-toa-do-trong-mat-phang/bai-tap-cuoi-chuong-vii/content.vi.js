/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VII: phương trình đường thẳng, vị trí tương đối, góc và khoảng cách, phương trình đường tròn và tiếp tuyến, ba đường conic elip, hypebol, parabol.',
  intro:
    'Chương VII đưa hình học vào mặt phẳng toạ độ: mỗi đường thẳng, đường tròn hay đường conic được mô tả bằng một phương trình, và các câu hỏi hình học như song song, vuông góc, tiếp xúc, khoảng cách trở thành các phép tính. Bài này hệ thống lại kiến thức và luyện tập tổng hợp cả chương.',
  objectives: [
    'Viết phương trình tổng quát, phương trình tham số của đường thẳng; xét vị trí tương đối, tính góc và khoảng cách.',
    'Viết phương trình đường tròn, tìm tâm và bán kính, viết phương trình tiếp tuyến.',
    'Nhận biết và viết phương trình chính tắc của elip, hypebol, parabol.',
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
              'Phương trình đường thẳng',
              'Tổng quát $ax + by + c = 0$, pháp tuyến $\\vec n = (a; b)$; tham số $x = x_0 + at$, $y = y_0 + bt$, chỉ phương $\\vec u = (a; b)$; $\\vec n = (a; b) \\Rightarrow \\vec u = (-b; a)$',
            ],
            [
              'Vị trí tương đối',
              'Hệ hai phương trình có một nghiệm: cắt nhau; vô nghiệm: song song; vô số nghiệm: trùng nhau',
            ],
            [
              'Góc giữa hai đường thẳng',
              '$\\cos\\varphi = \\dfrac{|a_1a_2 + b_1b_2|}{\\sqrt{a_1^2 + b_1^2} \\cdot \\sqrt{a_2^2 + b_2^2}}$; vuông góc khi $a_1a_2 + b_1b_2 = 0$',
            ],
            ['Khoảng cách', '$d(M_0, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$'],
            [
              'Đường tròn',
              '$(x - a)^2 + (y - b)^2 = R^2$; $x^2 + y^2 - 2ax - 2by + c = 0$ với $a^2 + b^2 - c > 0$, $R = \\sqrt{a^2 + b^2 - c}$',
            ],
            ['Tiếp tuyến tại $M_0$', '$(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0$'],
            [
              'Elip',
              '$MF_1 + MF_2 = 2a$; $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$, $a > b > 0$, $c^2 = a^2 - b^2$',
            ],
            [
              'Hypebol',
              '$|MF_1 - MF_2| = 2a$; $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$, $c^2 = a^2 + b^2$',
            ],
            [
              'Parabol',
              '$MF = d(M, \\Delta)$; $y^2 = 2px$, $F\\left(\\dfrac{p}{2}; 0\\right)$, $\\Delta: x = -\\dfrac{p}{2}$',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Luyện tập tính toán',
      blocks: [
        {
          type: 'p',
          text: 'Bộ câu hỏi dưới đây được sinh ngẫu nhiên từ sáu dạng toán của chương. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết dạng nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Khi viết phương trình, hãy rút gọn về dạng có hệ số nguyên tối giản và luôn thử lại bằng cách thay toạ độ một điểm đã biết vào phương trình vừa tìm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Câu đố dựng hình trên lưới',
    instruction:
      'Đọc đề bài, rồi kéo hai điểm (hoặc chọn rồi dùng phím mũi tên) để dựng đúng đường thẳng hoặc đường tròn được yêu cầu. Dòng phản hồi cho biết phương trình của hình em đang dựng. Nhấn "Gợi ý" nếu cần, "Câu khác" để sang câu mới.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ với $A(1; 3)$, $B(-1; -1)$, $C(5; 1)$. a) Viết phương trình đường thẳng $BC$. b) Viết phương trình đường cao $AH$. c) Tính diện tích tam giác $ABC$.',
      steps: [
        'a) $\\overrightarrow{BC} = (6; 2) = 2(3; 1)$, nên $BC$ có vectơ pháp tuyến $(1; -3)$: $(x + 1) - 3(y + 1) = 0 \\Leftrightarrow x - 3y - 2 = 0$.',
        'b) $AH \\perp BC$ nên nhận $(3; 1)$ làm vectơ pháp tuyến: $3(x - 1) + (y - 3) = 0 \\Leftrightarrow 3x + y - 6 = 0$.',
        'c) $AH = d(A, BC) = \\dfrac{|1 - 9 - 2|}{\\sqrt{10}} = \\sqrt{10}$, $BC = \\sqrt{36 + 4} = 2\\sqrt{10}$.',
        '$S_{ABC} = \\dfrac{1}{2} \\cdot BC \\cdot AH = \\dfrac{1}{2} \\cdot 2\\sqrt{10} \\cdot \\sqrt{10} = 10$.',
      ],
      answer: '$BC: x - 3y - 2 = 0$; $AH: 3x + y - 6 = 0$; $S_{ABC} = 10$.',
    },
    {
      problem: 'Viết phương trình đường tròn đi qua ba điểm $O(0; 0)$, $A(4; 0)$, $B(0; 2)$.',
      steps: [
        'Gọi phương trình là $x^2 + y^2 - 2ax - 2by + c = 0$.',
        'Qua $O$: $c = 0$. Qua $A$: $16 - 8a = 0$, nên $a = 2$. Qua $B$: $4 - 4b = 0$, nên $b = 1$.',
        'Phương trình $x^2 + y^2 - 4x - 2y = 0$; tâm $I(2; 1)$, $R = \\sqrt{4 + 1 - 0} = \\sqrt{5}$.',
      ],
      answer: '$x^2 + y^2 - 4x - 2y = 0$.',
    },
    {
      problem:
        'Lập phương trình chính tắc của elip đi qua điểm $(5; 0)$ và có một tiêu điểm là $F_2(4; 0)$.',
      steps: [
        'Elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ đi qua $(5; 0)$ nên $a^2 = 25$.',
        '$c = 4$, nên $b^2 = a^2 - c^2 = 25 - 16 = 9$.',
      ],
      answer: '$\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Phương trình tham số của đường thẳng đi qua $A(2; -1)$ và có vectơ chỉ phương $\\vec u = (3; 4)$ là',
      options: [
        '$\\begin{cases} x = 2 + 3t \\\\ y = -1 + 4t \\end{cases}$',
        '$\\begin{cases} x = 3 + 2t \\\\ y = 4 - t \\end{cases}$',
        '$\\begin{cases} x = 2 + 4t \\\\ y = -1 - 3t \\end{cases}$',
        '$\\begin{cases} x = 2 + 3t \\\\ y = 1 + 4t \\end{cases}$',
      ],
      answer: 0,
      hints: [
        '$x = x_0 + at$, $y = y_0 + bt$ với $(x_0; y_0)$ là điểm và $(a; b)$ là vectơ chỉ phương.',
      ],
      solution:
        '$x_0 = 2$, $y_0 = -1$, $a = 3$, $b = 4$. Hệ $x = 2 + 4t$, $y = -1 - 3t$ dùng nhầm một vectơ pháp tuyến làm vectơ chỉ phương.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng đi qua $A(1; 2)$ và $B(3; -2)$ có phương trình $2x + y + c = 0$. Tìm $c$.',
      answer: -4,
      hints: ['Thay toạ độ của $A$ vào $2x + y + c = 0$.'],
      solution:
        '$2 \\cdot 1 + 2 + c = 0 \\Rightarrow c = -4$. Kiểm tra với $B$: $6 - 2 - 4 = 0$. Đường thẳng $AB$: $2x + y - 4 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Vị trí tương đối của $d_1: x - 2y + 1 = 0$ và $d_2: -2x + 4y - 2 = 0$ là',
      options: ['trùng nhau', 'song song', 'cắt nhau nhưng không vuông góc', 'vuông góc'],
      answer: 0,
      hints: ['So sánh các hệ số của $d_2$ với các hệ số của $d_1$.'],
      solution:
        'Phương trình của $d_2$ bằng $-2$ lần phương trình của $d_1$ (kể cả hệ số tự do), nên hệ có vô số nghiệm: $d_1$ và $d_2$ trùng nhau.',
    },
    {
      type: 'number',
      prompt: 'Tính góc (theo độ) giữa hai đường thẳng $x - 2y + 1 = 0$ và $3x - y = 0$.',
      answer: 45,
      hints: ['$\\vec n_1 = (1; -2)$, $\\vec n_2 = (3; -1)$.'],
      solution:
        '$\\cos\\varphi = \\dfrac{|3 + 2|}{\\sqrt{5} \\cdot \\sqrt{10}} = \\dfrac{5}{5\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}$, nên $\\varphi = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính khoảng cách từ $A(3; -1)$ đến đường thẳng $6x + 8y - 5 = 0$.',
      answer: 0.5,
      hints: ['$d = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.'],
      solution: '$d = \\dfrac{|18 - 8 - 5|}{\\sqrt{36 + 64}} = \\dfrac{5}{10} = 0{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình đường tròn tâm $I(-2; 1)$, bán kính $3$ là',
      options: [
        '$(x + 2)^2 + (y - 1)^2 = 9$',
        '$(x - 2)^2 + (y + 1)^2 = 9$',
        '$(x + 2)^2 + (y - 1)^2 = 3$',
        '$(x - 2)^2 + (y + 1)^2 = 3$',
      ],
      answer: 0,
      hints: ['$(x - a)^2 + (y - b)^2 = R^2$; chú ý dấu và bình phương bán kính.'],
      solution: '$(x - (-2))^2 + (y - 1)^2 = 3^2 \\Leftrightarrow (x + 2)^2 + (y - 1)^2 = 9$.',
    },
    {
      type: 'number',
      prompt: 'Tính bán kính của đường tròn $x^2 + y^2 + 6x - 8y = 0$.',
      answer: 5,
      hints: ['$-2a = 6$, $-2b = -8$, $c = 0$.'],
      solution: '$a = -3$, $b = 4$, $c = 0$, $R = \\sqrt{9 + 16 - 0} = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp tuyến của đường tròn $x^2 + y^2 - 2x - 4y - 20 = 0$ tại điểm $M(5; 5)$ có phương trình $4x + 3y + c = 0$. Tìm $c$.',
      answer: -35,
      hints: [
        'Tâm $I(1; 2)$; kiểm tra $M$ thuộc đường tròn.',
        'Tiếp tuyến: $(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0$.',
      ],
      solution:
        '$(1 - 5)(x - 5) + (2 - 5)(y - 5) = 0 \\Leftrightarrow -4x + 20 - 3y + 15 = 0 \\Leftrightarrow 4x + 3y - 35 = 0$. Vậy $c = -35$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m > 0$ để đường thẳng $3x - 4y + m = 0$ tiếp xúc với đường tròn $x^2 + y^2 = 9$.',
      answer: 15,
      hints: ['Tiếp xúc khi khoảng cách từ tâm $O$ đến đường thẳng bằng bán kính $3$.'],
      solution:
        '$d(O, \\Delta) = \\dfrac{|m|}{5} = 3 \\Leftrightarrow |m| = 15$. Với $m > 0$: $m = 15$.',
    },
    {
      type: 'choice',
      prompt:
        'Elip có tổng khoảng cách từ mỗi điểm của nó đến hai tiêu điểm bằng $10$ và tiêu cự bằng $6$. Phương trình chính tắc của elip là',
      options: [
        '$\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$',
        '$\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$',
        '$\\dfrac{x^2}{100} + \\dfrac{y^2}{36} = 1$',
        '$\\dfrac{x^2}{25} - \\dfrac{y^2}{16} = 1$',
      ],
      answer: 0,
      hints: ['$MF_1 + MF_2 = 2a = 10$ và $2c = 6$.', 'Với elip, $b^2 = a^2 - c^2$.'],
      solution:
        '$2a = 10$ nên $a = 5$; $2c = 6$ nên $c = 3$; $b^2 = 25 - 9 = 16$, nên $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ có hai tiêu điểm $(\\pm 5; 0)$ và đi qua điểm $(4; 0)$. Tìm $b^2$.',
      answer: 9,
      hints: ['Thay $(4; 0)$ vào phương trình để tìm $a^2$.', 'Với hypebol $b^2 = c^2 - a^2$.'],
      solution: '$\\dfrac{16}{a^2} = 1 \\Rightarrow a^2 = 16$; $b^2 = 25 - 16 = 9$.',
    },
    {
      type: 'choice',
      prompt: 'Parabol có tiêu điểm $F(3; 0)$ có phương trình chính tắc là',
      options: ['$y^2 = 12x$', '$y^2 = 6x$', '$y^2 = 3x$', '$x^2 = 12y$'],
      answer: 0,
      hints: ['Tiêu điểm là $F\\left(\\dfrac{p}{2}; 0\\right)$.'],
      solution: '$\\dfrac{p}{2} = 3 \\Rightarrow p = 6$, phương trình $y^2 = 2px = 12x$.',
    },
  ],
  takeaways: [
    'Đường thẳng cần một điểm và một hướng: vectơ pháp tuyến hoặc vectơ chỉ phương.',
    'Góc và vuông góc dùng tích vô hướng của hai vectơ pháp tuyến; khoảng cách dùng $\\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.',
    'Đường tròn cần tâm và bán kính; tiếp tuyến vuông góc với bán kính tại tiếp điểm.',
    'Elip: $c^2 = a^2 - b^2$; hypebol: $c^2 = a^2 + b^2$; parabol $y^2 = 2px$ có tiêu điểm $\\left(\\dfrac{p}{2}; 0\\right)$.',
  ],
};
