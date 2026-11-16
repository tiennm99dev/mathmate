/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương Vectơ: các khái niệm mở đầu, tổng và hiệu hai vectơ, tích của vectơ với một số, toạ độ của vectơ và tích vô hướng, cùng trò chơi tìm điểm bằng tổ hợp vectơ trên lưới toạ độ.',
  intro:
    'Một robot trên lưới chỉ biết hai kiểu bước: bước theo vectơ $\\vec a$ và bước theo vectơ $\\vec b$. Nó cần bao nhiêu bước mỗi loại để đi từ $A$ tới đích $T$? Bài ôn tập này nhắc lại toàn bộ chương Vectơ: phép cộng, trừ, nhân với một số, toạ độ và tích vô hướng, rồi dùng chúng để giải những câu hỏi như vậy.',
  objectives: [
    'Dùng quy tắc ba điểm, quy tắc hình bình hành, hệ thức trung điểm và trọng tâm để biến đổi vectơ.',
    'Tính toạ độ của vectơ, độ dài, toạ độ trung điểm, trọng tâm; xét hai vectơ cùng phương, ba điểm thẳng hàng.',
    'Tính tích vô hướng, góc giữa hai vectơ và nhận biết hai vectơ vuông góc.',
    'Phân tích một vectơ theo hai vectơ không cùng phương.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'list',
          items: [
            'Vectơ là đoạn thẳng có hướng. Hai vectơ bằng nhau khi chúng cùng hướng và cùng độ dài; vectơ-không $\\vec 0$ cùng phương, cùng hướng với mọi vectơ.',
            'Quy tắc ba điểm: $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$ và $\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}$. Quy tắc hình bình hành: nếu $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$.',
            'Vectơ $k\\vec a$ cùng hướng với $\\vec a$ khi $k > 0$, ngược hướng khi $k < 0$, và $|k\\vec a| = |k| \\cdot |\\vec a|$. Hai vectơ $\\vec a$, $\\vec b$ ($\\vec b \\ne \\vec 0$) cùng phương khi và chỉ khi có số $k$ để $\\vec a = k\\vec b$.',
            '$I$ là trung điểm của $AB$: $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$, và $\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI}$ với mọi điểm $M$. $G$ là trọng tâm tam giác $ABC$: $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$.',
            "Với $\\vec u = (x; y)$, $\\vec v = (x'; y')$: $\\vec u \\pm \\vec v = (x \\pm x'; y \\pm y')$, $k\\vec u = (kx; ky)$, $|\\vec u| = \\sqrt{x^2 + y^2}$; $\\vec u$, $\\vec v$ cùng phương khi $xy' - x'y = 0$.",
            'Với $A(x_A; y_A)$, $B(x_B; y_B)$: $\\overrightarrow{AB} = (x_B - x_A; y_B - y_A)$; trung điểm $I\\left(\\dfrac{x_A + x_B}{2}; \\dfrac{y_A + y_B}{2}\\right)$; trọng tâm $G$ có toạ độ là trung bình cộng toạ độ ba đỉnh.',
            "Tích vô hướng: $\\vec u \\cdot \\vec v = |\\vec u| \\cdot |\\vec v| \\cos(\\vec u, \\vec v) = xx' + yy'$; $\\vec u \\perp \\vec v \\iff \\vec u \\cdot \\vec v = 0$.",
          ],
        },
      ],
    },
    {
      heading: 'Phân tích một vectơ theo hai vectơ không cùng phương',
      blocks: [
        {
          type: 'p',
          text: 'Cho hai vectơ $\\vec a$, $\\vec b$ không cùng phương. Với mọi vectơ $\\vec c$, có đúng một cặp số $(m; n)$ sao cho $\\vec c = m\\vec a + n\\vec b$. Trong mặt phẳng toạ độ, ta tìm $m$, $n$ bằng cách viết đẳng thức theo từng toạ độ.',
        },
        {
          type: 'tex',
          tex: '\\vec a = (a_1; a_2),\\ \\vec b = (b_1; b_2),\\ \\vec c = (c_1; c_2):\\quad \\vec c = m\\vec a + n\\vec b \\iff \\begin{cases} a_1 m + b_1 n = c_1 \\\\ a_2 m + b_2 n = c_2 \\end{cases}',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Vì $\\vec a$, $\\vec b$ không cùng phương nên $a_1 b_2 - a_2 b_1 \\ne 0$, do đó hệ trên luôn có nghiệm duy nhất. Trong trò chơi bên dưới, $m$ và $n$ chính là số bước theo $\\vec a$ và theo $\\vec b$; số âm nghĩa là bước ngược hướng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đi tìm điểm bằng tổ hợp vectơ',
    instruction:
      'Từ điểm $A$, chỉnh $m$ để đi $m$ bước theo $\\vec a$ rồi chỉnh $n$ để đi tiếp $n$ bước theo $\\vec b$, sao cho điểm đến $M$ trùng đích $T$, tức là $\\overrightarrow{AT} = m\\vec a + n\\vec b$. Bí thì bấm Gợi ý để xem hệ phương trình của $m$, $n$; tìm xong thì bấm Điểm mới.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ có $M$ là trung điểm của $BC$ và $G$ là trọng tâm. Chứng minh rằng $\\overrightarrow{AB} + \\overrightarrow{AC} = 3\\overrightarrow{AG}$.',
      steps: [
        '$M$ là trung điểm của $BC$ nên $\\overrightarrow{AB} + \\overrightarrow{AC} = 2\\overrightarrow{AM}$.',
        '$G$ là trọng tâm nên $G$ nằm trên trung tuyến $AM$ và $\\overrightarrow{AG} = \\dfrac{2}{3}\\overrightarrow{AM}$, tức là $\\overrightarrow{AM} = \\dfrac{3}{2}\\overrightarrow{AG}$.',
        'Thay vào: $\\overrightarrow{AB} + \\overrightarrow{AC} = 2 \\cdot \\dfrac{3}{2}\\overrightarrow{AG} = 3\\overrightarrow{AG}$.',
      ],
      answer: '$\\overrightarrow{AB} + \\overrightarrow{AC} = 3\\overrightarrow{AG}$.',
    },
    {
      problem:
        'Trong mặt phẳng toạ độ $Oxy$, cho $A(1; 2)$, $B(4; 3)$, $C(2; -1)$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$, rồi cho biết tam giác $ABC$ là tam giác gì và tính diện tích của nó.',
      steps: [
        '$\\overrightarrow{AB} = (3; 1)$, $\\overrightarrow{AC} = (1; -3)$.',
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 3 \\cdot 1 + 1 \\cdot (-3) = 0$, nên $AB \\perp AC$: tam giác vuông tại $A$.',
        '$AB = \\sqrt{3^2 + 1^2} = \\sqrt{10}$, $AC = \\sqrt{1^2 + (-3)^2} = \\sqrt{10}$, nên tam giác vuông cân tại $A$.',
        '$S = \\dfrac{1}{2} AB \\cdot AC = \\dfrac{1}{2} \\cdot 10 = 5$.',
      ],
      answer: 'Tam giác $ABC$ vuông cân tại $A$, diện tích bằng $5$.',
    },
    {
      problem:
        'Cho $\\vec a = (2; 1)$, $\\vec b = (-1; 1)$ và $\\vec c = (1; 5)$. Phân tích $\\vec c$ theo $\\vec a$ và $\\vec b$.',
      steps: [
        '$2 \\cdot 1 - 1 \\cdot (-1) = 3 \\ne 0$ nên $\\vec a$, $\\vec b$ không cùng phương; đặt $\\vec c = m\\vec a + n\\vec b$.',
        'Theo toạ độ: $\\begin{cases} 2m - n = 1 \\\\ m + n = 5 \\end{cases}$. Cộng hai phương trình: $3m = 6$, nên $m = 2$, $n = 3$.',
        'Thử lại: $2(2; 1) + 3(-1; 1) = (4 - 3; 2 + 3) = (1; 5)$.',
      ],
      answer: '$\\vec c = 2\\vec a + 3\\vec b$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho hình bình hành $ABCD$. Khẳng định nào sau đây đúng?',
      options: [
        '$\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$',
        '$\\overrightarrow{AB} = \\overrightarrow{CD}$',
        '$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{CA}$',
        '$\\overrightarrow{AD} = \\overrightarrow{CB}$',
      ],
      answer: 0,
      hints: [
        'Nhớ quy tắc hình bình hành, và để ý hướng: trong hình bình hành $ABCD$ thì $\\overrightarrow{AB} = \\overrightarrow{DC}$.',
      ],
      solution:
        'Quy tắc hình bình hành cho $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$. Các khẳng định khác sai: $\\overrightarrow{AB} = \\overrightarrow{DC}$ (ngược hướng với $\\overrightarrow{CD}$); $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$, không phải $\\overrightarrow{CA}$; $\\overrightarrow{AD} = \\overrightarrow{BC}$, ngược hướng với $\\overrightarrow{CB}$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho tam giác $ABC$ có $M$ là trung điểm của $BC$ và $G$ là trọng tâm. Chọn tất cả các đẳng thức đúng.',
      options: [
        '$\\overrightarrow{MB} + \\overrightarrow{MC} = \\vec 0$',
        '$\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$',
        '$\\overrightarrow{AB} + \\overrightarrow{AC} = 2\\overrightarrow{AM}$',
        '$\\overrightarrow{AG} = \\dfrac{1}{3}\\overrightarrow{AM}$',
        '$\\overrightarrow{GA} = 2\\overrightarrow{GM}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Trọng tâm chia trung tuyến $AM$ sao cho $AG = \\dfrac{2}{3}AM$.',
        'Hai vectơ $\\overrightarrow{GA}$ và $\\overrightarrow{GM}$ cùng hướng hay ngược hướng?',
      ],
      solution:
        'Ba đẳng thức đầu là hệ thức trung điểm và trọng tâm. Đúng ra $\\overrightarrow{AG} = \\dfrac{2}{3}\\overrightarrow{AM}$, và vì $G$ nằm giữa $A$ và $M$ nên $\\overrightarrow{GA} = -2\\overrightarrow{GM}$, không phải $2\\overrightarrow{GM}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\vec a = (2; -3)$ và $\\vec b = (-1; 4)$. Toạ độ của $2\\vec a - \\vec b$ là',
      options: ['$(5; -10)$', '$(3; -2)$', '$(5; -2)$', '$(4; -10)$'],
      answer: 0,
      hints: ['Tính $2\\vec a$ trước, rồi trừ từng toạ độ của $\\vec b$; cẩn thận với dấu trừ.'],
      solution: '$2\\vec a = (4; -6)$, nên $2\\vec a - \\vec b = (4 - (-1); -6 - 4) = (5; -10)$.',
    },
    {
      type: 'number',
      prompt: 'Tính độ dài của vectơ $\\vec u = (-5; 12)$.',
      answer: 13,
      hints: ['$|\\vec u| = \\sqrt{x^2 + y^2}$.'],
      solution: '$|\\vec u| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{169} = 13$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $A(1; 2)$ và $B(3; -4)$. Tính độ dài đoạn thẳng $AB$ (làm tròn đến hàng phần trăm).',
      answer: 6.32,
      tolerance: 0.01,
      hints: ['Tính toạ độ của $\\overrightarrow{AB}$ rồi lấy độ dài của nó.'],
      solution:
        '$\\overrightarrow{AB} = (2; -6)$, $AB = \\sqrt{4 + 36} = \\sqrt{40} = 2\\sqrt{10} \\approx 6{,}32$.',
    },
    {
      type: 'choice',
      prompt: 'Cho tam giác $ABC$ với $A(1; 3)$, $B(-2; 4)$, $C(4; -1)$. Toạ độ trọng tâm $G$ là',
      options: ['$(1; 2)$', '$(3; 6)$', '$\\left(\\dfrac{3}{2}; 3\\right)$', '$(-1; 2)$'],
      answer: 0,
      hints: ['Toạ độ trọng tâm là trung bình cộng toạ độ của ba đỉnh: chia tổng cho $3$.'],
      solution:
        '$x_G = \\dfrac{1 - 2 + 4}{3} = 1$, $y_G = \\dfrac{3 + 4 - 1}{3} = 2$, nên $G(1; 2)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để hai vectơ $\\vec u = (m; 2)$ và $\\vec v = (3; -6)$ cùng phương.',
      answer: -1,
      hints: ["$\\vec u = (x; y)$ và $\\vec v = (x'; y')$ cùng phương khi $xy' - x'y = 0$."],
      solution:
        '$m \\cdot (-6) - 3 \\cdot 2 = 0 \\iff -6m = 6 \\iff m = -1$. Khi đó $\\vec v = -3\\vec u$.',
    },
    {
      type: 'number',
      prompt: 'Cho $A(1; 1)$, $B(3; 2)$ và $C(7; m)$. Tìm $m$ để ba điểm $A$, $B$, $C$ thẳng hàng.',
      answer: 4,
      hints: [
        'Ba điểm thẳng hàng khi $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ cùng phương.',
        '$\\overrightarrow{AB} = (2; 1)$, $\\overrightarrow{AC} = (6; m - 1)$.',
      ],
      solution:
        '$\\overrightarrow{AB} = (2; 1)$ và $\\overrightarrow{AC} = (6; m - 1)$ cùng phương khi $2(m - 1) - 6 \\cdot 1 = 0$, tức là $m = 4$. Khi đó $\\overrightarrow{AC} = (6; 3) = 3\\overrightarrow{AB}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $\\vec a = (1; 1)$, $\\vec b = (1; -1)$ và $\\vec c = (3; 1)$. Khẳng định nào sau đây đúng?',
      options: [
        '$\\vec c = 2\\vec a + \\vec b$',
        '$\\vec c = \\vec a + 2\\vec b$',
        '$\\vec c = 2\\vec a - \\vec b$',
        '$\\vec c = 3\\vec a + \\vec b$',
      ],
      answer: 0,
      hints: ['Đặt $\\vec c = m\\vec a + n\\vec b$ và viết theo toạ độ: $m + n = 3$, $m - n = 1$.'],
      solution:
        'Từ $m + n = 3$ và $m - n = 1$ ta được $m = 2$, $n = 1$. Thử lại: $2(1; 1) + (1; -1) = (3; 1) = \\vec c$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\vec a = (1; 2)$ và $\\vec b = (3; -1)$. Tính $\\vec a \\cdot \\vec b$.',
      answer: 1,
      hints: ["$\\vec a \\cdot \\vec b = xx' + yy'$."],
      solution: '$\\vec a \\cdot \\vec b = 1 \\cdot 3 + 2 \\cdot (-1) = 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để hai vectơ $\\vec u = (m; 3)$ và $\\vec v = (2; -4)$ vuông góc với nhau.',
      answer: 6,
      hints: ['Hai vectơ vuông góc khi tích vô hướng của chúng bằng $0$.'],
      solution: '$\\vec u \\cdot \\vec v = 2m - 12 = 0 \\iff m = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính góc giữa hai vectơ $\\vec a = (1; 1)$ và $\\vec b = (-1; 0)$ (theo độ).',
      answer: 135,
      hints: [
        '$\\cos(\\vec a, \\vec b) = \\dfrac{\\vec a \\cdot \\vec b}{|\\vec a| \\cdot |\\vec b|}$.',
        'Góc có côsin bằng $-\\dfrac{\\sqrt{2}}{2}$ là góc tù.',
      ],
      solution:
        '$\\vec a \\cdot \\vec b = -1$, $|\\vec a| = \\sqrt{2}$, $|\\vec b| = 1$, nên $\\cos(\\vec a, \\vec b) = -\\dfrac{1}{\\sqrt{2}} = -\\dfrac{\\sqrt{2}}{2}$ và $(\\vec a, \\vec b) = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác đều $ABC$ cạnh $2$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.',
      answer: 2,
      hints: [
        'Góc giữa $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ là góc $\\widehat{BAC} = 60^\\circ$.',
      ],
      solution:
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2 \\cdot 2 \\cdot \\cos 60^\\circ = 4 \\cdot \\dfrac{1}{2} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hình vuông $ABCD$ cạnh $3$. Tính $\\left|\\overrightarrow{AB} + \\overrightarrow{AD}\\right|$ (làm tròn đến hàng phần trăm).',
      answer: 4.24,
      tolerance: 0.01,
      hints: ['Dùng quy tắc hình bình hành để viết tổng thành một vectơ.'],
      solution:
        '$\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$, nên độ dài cần tìm là đường chéo $AC = 3\\sqrt{2} \\approx 4{,}24$.',
    },
    {
      type: 'number',
      prompt:
        'Một người kéo một thùng hàng đi $10$ m trên mặt sàn bằng một lực $\\vec F$ có độ lớn $50$ N, hướng hợp với hướng di chuyển một góc $60^\\circ$. Tính công của lực $\\vec F$ (theo J).',
      answer: 250,
      unit: 'J',
      hints: ['Công là tích vô hướng $A = \\vec F \\cdot \\vec d$ của lực và vectơ độ dời.'],
      solution:
        '$A = |\\vec F| \\cdot |\\vec d| \\cos 60^\\circ = 50 \\cdot 10 \\cdot \\dfrac{1}{2} = 250$ (J).',
    },
  ],
  takeaways: [
    'Cộng vectơ bằng quy tắc ba điểm hoặc hình bình hành; trừ vectơ: $\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}$.',
    'Trung điểm và trọng tâm có hệ thức vectơ riêng: $\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI}$, $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$.',
    'Hai vectơ không cùng phương phân tích được mọi vectơ một cách duy nhất: $\\vec c = m\\vec a + n\\vec b$.',
    "Theo toạ độ: cùng phương khi $xy' - x'y = 0$, vuông góc khi $xx' + yy' = 0$.",
  ],
};
