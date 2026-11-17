/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương II: vectơ trong không gian, quy tắc hình hộp, tích vô hướng, hệ trục toạ độ Oxyz, toạ độ của điểm và vectơ, biểu thức toạ độ của các phép toán vectơ và tích có hướng; kèm trò định vị đồ vật trong phòng học và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương II đưa vectơ từ mặt phẳng ra không gian, rồi gắn vào không gian một hệ trục toạ độ để mọi điểm, mọi vectơ trở thành bộ ba số. Nhờ đó, các câu hỏi hình học như hai đường có vuông góc không, đoạn thẳng dài bao nhiêu, diện tích tam giác bằng bao nhiêu đều được trả lời bằng tính toán. Bài ôn tập này hệ thống lại kiến thức, cho em luyện đọc toạ độ đồ vật trong một phòng học, và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các phép toán vectơ trong không gian: cộng, trừ, nhân với một số, quy tắc hình hộp, tích vô hướng.',
    'Xác định toạ độ của điểm và vectơ trong không gian $Oxyz$; tính toán bằng biểu thức toạ độ của các phép toán vectơ.',
    'Vận dụng toạ độ để tính độ dài, góc, chứng minh vuông góc, tính diện tích và giải bài toán thực tiễn.',
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
              'Quy tắc ba điểm, hình bình hành',
              '$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$; $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$',
            ],
            [
              'Quy tắc hình hộp',
              "$\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$",
            ],
            [
              'Tích vô hướng',
              '$\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$',
            ],
            [
              'Toạ độ điểm',
              '$M(x; y; z) \\iff \\overrightarrow{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$',
            ],
            [
              'Toạ độ vectơ theo hai điểm',
              '$\\overrightarrow{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$',
            ],
            [
              'Tổng, hiệu, tích với số',
              "$\\vec{a} \\pm \\vec{b} = (x \\pm x'; y \\pm y'; z \\pm z')$, $k\\vec{a} = (kx; ky; kz)$",
            ],
            ['Trung điểm, trọng tâm', 'Trung bình cộng các toạ độ tương ứng của hai, ba điểm'],
            [
              'Tích vô hướng theo toạ độ',
              "$\\vec{a} \\cdot \\vec{b} = xx' + yy' + zz'$; $|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$",
            ],
            [
              'Tích có hướng',
              "$[\\vec{u}, \\vec{v}] = (yz' - zy'; zx' - xz'; xy' - yx')$, vuông góc với $\\vec{u}$ và $\\vec{v}$",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Toạ độ $\\overrightarrow{AB}$ là toạ độ điểm cuối trừ điểm đầu, không phải ngược lại. Góc giữa hai vectơ phải đo khi hai vectơ chung điểm đầu, và có thể là góc tù (đến $180^\\circ$), khác góc giữa hai đường thẳng. Hình chiếu trên mặt phẳng $(Oxy)$ làm cao độ bằng $0$, trên trục $Ox$ làm cả tung độ và cao độ bằng $0$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có hai câu cho mỗi dạng bài của chương. Trả lời sai lần đầu, em được gợi ý và làm lại; bản đồ kĩ năng cho biết dạng nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Định vị đồ vật trong phòng học',
    instruction:
      'Phòng học được gắn hệ trục $Oxyz$ với gốc $O$ ở một góc sàn, mỗi đơn vị là $1$ m. Đặt toạ độ của điểm $M$ màu xanh cho trùng với đồ vật màu cam: đọc hoành độ, tung độ ở chân đường nét đứt trên lưới sàn và cao độ là độ cao của vật. Xoay phòng để nhìn rõ hơn.',
  },
  examples: [
    {
      problem:
        'Cho $A(1; 1; 1)$, $B(2; 3; 3)$, $C(3; -1; 2)$. Chứng minh rằng tam giác $ABC$ vuông cân tại $A$ và tính diện tích của nó.',
      steps: [
        '$\\overrightarrow{AB} = (1; 2; 2)$, $\\overrightarrow{AC} = (2; -2; 1)$.',
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 1 \\cdot 2 + 2 \\cdot (-2) + 2 \\cdot 1 = 0$, nên $AB \\perp AC$.',
        '$AB = \\sqrt{1 + 4 + 4} = 3$ và $AC = \\sqrt{4 + 4 + 1} = 3$, nên tam giác $ABC$ vuông cân tại $A$.',
        '$S_{ABC} = \\dfrac{1}{2} AB \\cdot AC = \\dfrac{9}{2}$. Kiểm tra bằng tích có hướng: $[\\overrightarrow{AB}, \\overrightarrow{AC}] = (6; 3; -6)$ có độ dài $9$, và $\\dfrac{1}{2} \\cdot 9 = \\dfrac{9}{2}$.',
      ],
      answer: 'Tam giác $ABC$ vuông cân tại $A$, $S_{ABC} = \\dfrac{9}{2}$.',
    },
    {
      problem:
        'Một phòng học có dạng hình hộp chữ nhật dài $8$ m, rộng $6$ m, cao $4$ m. Gắn hệ trục $Oxyz$ với $O$ ở một góc sàn, các trục $Ox$, $Oy$, $Oz$ lần lượt theo chiều dài, chiều rộng và chiều cao (đơn vị mét). Tìm toạ độ của bóng đèn ở tâm trần và khoảng cách từ bóng đèn đến góc $O$.',
      steps: [
        'Trần nhà là hình chữ nhật ở độ cao $4$ m có các đỉnh $(0; 0; 4)$, $(8; 0; 4)$, $(8; 6; 4)$, $(0; 6; 4)$.',
        'Tâm trần là trung điểm của đường chéo nối $(0; 0; 4)$ và $(8; 6; 4)$: $L(4; 3; 4)$.',
        '$OL = \\sqrt{4^2 + 3^2 + 4^2} = \\sqrt{41} \\approx 6{,}40$ m.',
      ],
      answer: 'Bóng đèn ở $L(4; 3; 4)$, cách góc $O$ khoảng $6{,}40$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho $A(1; 2; -1)$ và $B(3; 0; 5)$. Trung điểm của đoạn thẳng $AB$ có toạ độ là',
      options: ['$(2; 1; 2)$', '$(4; 2; 4)$', '$(1; -1; 3)$', '$(2; -1; 3)$'],
      answer: 0,
      hints: ['Mỗi toạ độ của trung điểm là trung bình cộng hai toạ độ tương ứng.'],
      solution:
        'Trung điểm $\\left(\\dfrac{1 + 3}{2}; \\dfrac{2 + 0}{2}; \\dfrac{-1 + 5}{2}\\right) = (2; 1; 2)$. Kết quả $(1; -1; 3)$ là $\\dfrac{1}{2}\\overrightarrow{AB}$, không phải trung điểm.',
    },
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} - \\overrightarrow{AC'}$ bằng",
      options: [
        '$\\vec{0}$',
        "$2\\overrightarrow{AC'}$",
        '$\\overrightarrow{AC}$',
        "$\\overrightarrow{CA'}$",
      ],
      answer: 0,
      hints: ['Dùng quy tắc hình hộp cho ba vectơ đầu.'],
      solution:
        "Theo quy tắc hình hộp $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$, nên biểu thức bằng $\\overrightarrow{AC'} - \\overrightarrow{AC'} = \\vec{0}$.",
    },
    {
      type: 'choice',
      prompt: 'Hình chiếu vuông góc của điểm $M(3; -1; 4)$ trên trục $Ox$ có toạ độ là',
      options: ['$(3; 0; 0)$', '$(0; -1; 4)$', '$(3; -1; 0)$', '$(0; 0; 4)$'],
      answer: 0,
      hints: ['Điểm thuộc trục $Ox$ có tung độ và cao độ bằng $0$.'],
      solution:
        'Chiếu trên trục $Ox$ chỉ giữ hoành độ: $(3; 0; 0)$. Còn $(3; -1; 0)$ là hình chiếu trên mặt phẳng $(Oxy)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A(2; -1; 3)$ và $B(4; 3; 1)$. Toạ độ của vectơ $2\\overrightarrow{AB}$ là',
      options: ['$(4; 8; -4)$', '$(4; 4; -4)$', '$(-4; -8; 4)$', '$(12; 4; 8)$'],
      answer: 0,
      hints: ['Tìm $\\overrightarrow{AB}$ (điểm cuối trừ điểm đầu) rồi nhân từng toạ độ với $2$.'],
      solution: '$\\overrightarrow{AB} = (2; 4; -2)$ nên $2\\overrightarrow{AB} = (4; 8; -4)$.',
    },
    {
      type: 'number',
      prompt: 'Tính độ dài của vectơ $\\vec{a} = (1; -2; 2)$.',
      answer: 3,
      hints: ['$|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$.'],
      solution: '$|\\vec{a}| = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\vec{u} = (1; 2; -1)$ và $\\vec{v} = (2; -1; 3)$. Tính $\\vec{u} \\cdot \\vec{v}$.',
      answer: -3,
      hints: ["$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$."],
      solution:
        '$\\vec{u} \\cdot \\vec{v} = 1 \\cdot 2 + 2 \\cdot (-1) + (-1) \\cdot 3 = 2 - 2 - 3 = -3$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hai vectơ $\\vec{a} = (2; 1; -1)$ và $\\vec{b} = (1; 3; m)$ vuông góc với nhau.',
      answer: 5,
      hints: ['Hai vectơ vuông góc khi tích vô hướng của chúng bằng $0$.'],
      solution: '$\\vec{a} \\cdot \\vec{b} = 2 + 3 - m = 5 - m = 0$, nên $m = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Tính số đo góc giữa hai vectơ $\\vec{a} = (1; 1; 0)$ và $\\vec{b} = (-1; 0; 1)$ theo độ.',
      answer: 120,
      hints: [
        '$\\cos(\\vec{a}, \\vec{b}) = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}$.',
        'Cosin âm thì góc là góc tù.',
      ],
      solution:
        '$\\vec{a} \\cdot \\vec{b} = -1$, $|\\vec{a}| = |\\vec{b}| = \\sqrt{2}$, nên $\\cos(\\vec{a}, \\vec{b}) = -\\dfrac{1}{2}$ và $(\\vec{a}, \\vec{b}) = 120^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $1$. Tính $\\overrightarrow{AD'} \\cdot \\overrightarrow{BC'}$.",
      answer: 2,
      hints: [
        "$ABC'D'$ là hình bình hành, nên $\\overrightarrow{BC'}$ bằng một vectơ có điểm đầu $A$.",
        "$\\vec{u} \\cdot \\vec{u} = |\\vec{u}|^2$, và $AD'$ là đường chéo của một mặt hình vuông cạnh $1$.",
      ],
      solution:
        "$\\overrightarrow{BC'} = \\overrightarrow{AD'}$, nên $\\overrightarrow{AD'} \\cdot \\overrightarrow{BC'} = AD'^2 = \\left(\\sqrt{2}\\right)^2 = 2$.",
    },
    {
      type: 'multi',
      prompt: 'Cho $A(1; 0; 0)$, $B(0; 1; 0)$, $C(0; 0; 1)$. Chọn tất cả các khẳng định đúng.',
      options: [
        'Tam giác $ABC$ là tam giác đều.',
        'Trọng tâm của tam giác $ABC$ là $G\\left(\\dfrac{1}{3}; \\dfrac{1}{3}; \\dfrac{1}{3}\\right)$.',
        '$[\\overrightarrow{AB}, \\overrightarrow{AC}] = (1; 1; 1)$.',
        '$\\overrightarrow{AB} \\perp \\overrightarrow{AC}$.',
      ],
      answers: [0, 1, 2],
      hints: [
        '$\\overrightarrow{AB} = (-1; 1; 0)$, $\\overrightarrow{AC} = (-1; 0; 1)$, $\\overrightarrow{BC} = (0; -1; 1)$.',
        'Tính độ dài ba cạnh và tích vô hướng $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.',
      ],
      solution:
        '$AB = BC = CA = \\sqrt{2}$ nên tam giác đều; $G = \\left(\\dfrac{1}{3}; \\dfrac{1}{3}; \\dfrac{1}{3}\\right)$; $[\\overrightarrow{AB}, \\overrightarrow{AC}] = (1 \\cdot 1 - 0 \\cdot 0; 0 \\cdot (-1) - (-1) \\cdot 1; (-1) \\cdot 0 - 1 \\cdot (-1)) = (1; 1; 1)$. Còn $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 1 \\ne 0$, nên hai vectơ không vuông góc (góc $A$ bằng $60^\\circ$).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích tam giác $ABC$ với $A(1; 1; 1)$, $B(3; 1; 1)$, $C(1; 4; 5)$.',
      answer: 5,
      hints: [
        '$S_{ABC} = \\dfrac{1}{2}\\left|[\\overrightarrow{AB}, \\overrightarrow{AC}]\\right|$.',
      ],
      solution:
        '$\\overrightarrow{AB} = (2; 0; 0)$, $\\overrightarrow{AC} = (0; 3; 4)$, $[\\overrightarrow{AB}, \\overrightarrow{AC}] = (0 \\cdot 4 - 0 \\cdot 3; 0 \\cdot 0 - 2 \\cdot 4; 2 \\cdot 3 - 0 \\cdot 0) = (0; -8; 6)$, có độ dài $10$. Vậy $S_{ABC} = 5$. (Cũng có thể thấy $AB \\perp AC$, $AB = 2$, $AC = 5$.)',
    },
    {
      type: 'number',
      prompt:
        'Trong phòng học ở Ví dụ 2 (dài $8$ m, rộng $6$ m, cao $4$ m, gốc $O$ ở một góc sàn), một camera gắn ở điểm $(6; 0; 4)$. Tính khoảng cách từ camera đến tâm sàn nhà, theo mét, làm tròn đến hàng phần trăm.',
      answer: 5.39,
      tolerance: 0.005,
      unit: 'm',
      hints: [
        'Tâm sàn nhà là giao điểm hai đường chéo của sàn, có cao độ $0$.',
        'Tâm sàn là $(4; 3; 0)$; dùng công thức khoảng cách giữa hai điểm.',
      ],
      solution:
        'Tâm sàn $S(4; 3; 0)$. Khoảng cách $\\sqrt{(4 - 6)^2 + (3 - 0)^2 + (0 - 4)^2} = \\sqrt{29} \\approx 5{,}39$ m.',
    },
  ],
  takeaways: [
    "Quy tắc hình hộp $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$ và tích vô hướng $|\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$ dùng được cả khi chưa có toạ độ.",
    'Gắn hệ trục $Oxyz$ phù hợp (gốc ở một đỉnh, trục theo các cạnh vuông góc) để đổi bài hình học thành tính toán.',
    "Với toạ độ: $\\overrightarrow{AB} = (x_B - x_A; \\ldots)$, $\\vec{a} \\cdot \\vec{b} = xx' + yy' + zz'$, $|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$, và $[\\vec{u}, \\vec{v}]$ cho vectơ vuông góc với cả hai vectơ.",
  ],
};
