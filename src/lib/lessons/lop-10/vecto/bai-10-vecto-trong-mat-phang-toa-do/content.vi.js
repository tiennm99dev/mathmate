/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Toạ độ của vectơ và của điểm trong mặt phẳng Oxy, biểu thức toạ độ của phép cộng, trừ, nhân vectơ với số, độ dài vectơ, toạ độ trung điểm và trọng tâm.',
  intro:
    'Trên bản đồ, muốn chỉ đường từ trường về nhà, em có thể nói: "đi $3$ km về phía đông rồi $4$ km về phía bắc". Hai con số ấy đủ để xác định một vectơ dịch chuyển. Khi gắn một hệ trục toạ độ, mỗi vectơ được mô tả bằng một cặp số, và mọi phép toán vectơ trở thành phép tính trên các con số.',
  objectives: [
    'Xác định toạ độ của vectơ, toạ độ của điểm đối với hệ trục $Oxy$.',
    'Tính toạ độ của $\\overrightarrow{AB}$ và độ dài đoạn thẳng $AB$ từ toạ độ hai điểm.',
    'Dùng biểu thức toạ độ của tổng, hiệu, tích vectơ với một số.',
    'Tính toạ độ trung điểm của đoạn thẳng, trọng tâm của tam giác; kiểm tra hai vectơ cùng phương.',
  ],
  sections: [
    {
      heading: 'Toạ độ của vectơ',
      blocks: [
        {
          type: 'p',
          text: 'Hệ trục toạ độ $Oxy$ gồm hai trục $Ox$ (trục hoành) và $Oy$ (trục tung) vuông góc với nhau tại gốc $O$. Vectơ đơn vị trên $Ox$ là $\\vec i$, trên $Oy$ là $\\vec j$, với $|\\vec i| = |\\vec j| = 1$. Mặt phẳng có hệ trục $Oxy$ gọi là mặt phẳng toạ độ $Oxy$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Toạ độ của vectơ',
          text: 'Với mỗi vectơ $\\vec u$ trên mặt phẳng $Oxy$, có duy nhất cặp số $(x_0; y_0)$ sao cho $\\vec u = x_0\\vec i + y_0\\vec j$. Cặp số đó là toạ độ của $\\vec u$, kí hiệu $\\vec u = (x_0; y_0)$; $x_0$ là hoành độ, $y_0$ là tung độ của $\\vec u$.',
        },
        {
          type: 'list',
          items: [
            '$\\vec i = (1; 0)$, $\\vec j = (0; 1)$, $\\vec 0 = (0; 0)$.',
            "Hai vectơ bằng nhau khi và chỉ khi chúng có cùng toạ độ: $(x; y) = (x'; y') \\Leftrightarrow x = x'$ và $y = y'$.",
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Toạ độ của điểm',
          text: 'Toạ độ của vectơ $\\overrightarrow{OM}$ được gọi là toạ độ của điểm $M$: $M(x; y) \\Leftrightarrow \\overrightarrow{OM} = (x; y)$. Khi đó $x$ là hoành độ, $y$ là tung độ của điểm $M$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Toạ độ của vectơ $\\overrightarrow{AB}$',
          text: 'Với $A(x_A; y_A)$ và $B(x_B; y_B)$: $\\overrightarrow{AB} = (x_B - x_A;\\ y_B - y_A)$ và $AB = |\\overrightarrow{AB}| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.',
        },
        {
          type: 'p',
          text: 'Toạ độ của vectơ là "toạ độ điểm cuối trừ toạ độ điểm đầu". Nói riêng, vectơ $\\vec u = (x; y)$ có độ dài $|\\vec u| = \\sqrt{x^2 + y^2}$.',
        },
      ],
    },
    {
      heading: 'Biểu thức toạ độ của các phép toán vectơ',
      blocks: [
        {
          type: 'p',
          text: "Cho $\\vec u = (x; y)$, $\\vec v = (x'; y')$ và số thực $k$. Khi đó:",
        },
        {
          type: 'table',
          head: ['Phép toán', 'Toạ độ'],
          rows: [
            ['$\\vec u + \\vec v$', "$(x + x'; y + y')$"],
            ['$\\vec u - \\vec v$', "$(x - x'; y - y')$"],
            ['$k\\vec u$', '$(kx; ky)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai vectơ cùng phương',
          text: "Hai vectơ $\\vec u = (x; y)$ và $\\vec v = (x'; y')$ cùng phương khi và chỉ khi $xy' - x'y = 0$. Khi $\\vec v \\ne \\vec 0$, điều đó tương đương với $\\vec u = k\\vec v$ cho một số $k$ nào đó.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trung điểm và trọng tâm',
          text: 'Cho $A(x_A; y_A)$, $B(x_B; y_B)$, $C(x_C; y_C)$. Trung điểm $M$ của đoạn thẳng $AB$ có toạ độ $\\left(\\dfrac{x_A + x_B}{2}; \\dfrac{y_A + y_B}{2}\\right)$. Trọng tâm $G$ của tam giác $ABC$ có toạ độ $\\left(\\dfrac{x_A + x_B + x_C}{3}; \\dfrac{y_A + y_B + y_C}{3}\\right)$.',
        },
        {
          type: 'p',
          text: 'Các công thức này suy ra từ hệ thức vectơ của bài trước: với điểm $O$ là gốc toạ độ, $\\overrightarrow{OM} = \\dfrac{1}{2}(\\overrightarrow{OA} + \\overrightarrow{OB})$ và $\\overrightarrow{OG} = \\dfrac{1}{3}(\\overrightarrow{OA} + \\overrightarrow{OB} + \\overrightarrow{OC})$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vectơ trên lưới toạ độ',
    instruction:
      'Ở chế độ "Phép toán vectơ", kéo ngọn của $\\vec u$, $\\vec v$ (hoặc chọn rồi dùng phím mũi tên) và chọn phép toán: toạ độ kết quả được tính lại ngay. Ở chế độ "Toạ độ điểm", kéo $A$, $B$, $C$ để xem toạ độ $\\overrightarrow{AB}$, độ dài $AB$, trung điểm $I$ của $AB$ và trọng tâm $G$.',
  },
  examples: [
    {
      problem:
        'Cho hai điểm $A(1; 2)$ và $B(4; -2)$. Tìm toạ độ của $\\overrightarrow{AB}$ và tính độ dài đoạn thẳng $AB$.',
      steps: [
        '$\\overrightarrow{AB} = (x_B - x_A; y_B - y_A) = (4 - 1; -2 - 2) = (3; -4)$.',
        '$AB = \\sqrt{3^2 + (-4)^2} = \\sqrt{25} = 5$.',
      ],
      answer: '$\\overrightarrow{AB} = (3; -4)$, $AB = 5$.',
    },
    {
      problem:
        'Cho $\\vec u = (2; -1)$ và $\\vec v = (-3; 4)$. Tìm toạ độ của vectơ $2\\vec u - \\vec v$.',
      steps: [
        '$2\\vec u = (2 \\cdot 2; 2 \\cdot (-1)) = (4; -2)$.',
        '$2\\vec u - \\vec v = (4 - (-3); -2 - 4) = (7; -6)$.',
      ],
      answer: '$2\\vec u - \\vec v = (7; -6)$.',
    },
    {
      problem:
        'Cho ba điểm $A(1; 1)$, $B(5; 3)$, $C(3; 5)$. a) Tìm toạ độ trọng tâm $G$ của tam giác $ABC$. b) Tìm toạ độ điểm $D$ để $ABCD$ là hình bình hành.',
      steps: [
        'a) $x_G = \\dfrac{1 + 5 + 3}{3} = 3$, $y_G = \\dfrac{1 + 3 + 5}{3} = 3$.',
        'b) $ABCD$ là hình bình hành khi $\\overrightarrow{AB} = \\overrightarrow{DC}$. Ta có $\\overrightarrow{AB} = (4; 2)$ và $\\overrightarrow{DC} = (3 - x_D; 5 - y_D)$.',
        'Hai vectơ bằng nhau khi toạ độ bằng nhau: $3 - x_D = 4$, $5 - y_D = 2$, nên $x_D = -1$, $y_D = 3$. Kiểm tra: $A$, $B$, $C$ không thẳng hàng vì $\\overrightarrow{AB} = (4; 2)$, $\\overrightarrow{AC} = (2; 4)$ có $4 \\cdot 4 - 2 \\cdot 2 = 12 \\ne 0$.',
      ],
      answer: 'a) $G(3; 3)$; b) $D(-1; 3)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Toạ độ của vectơ $\\vec u = 3\\vec i - 2\\vec j$ là',
      options: ['$(3; -2)$', '$(-2; 3)$', '$(3; 2)$', '$(-3; 2)$'],
      answer: 0,
      hints: ['$\\vec u = x\\vec i + y\\vec j$ thì $\\vec u = (x; y)$.'],
      solution: '$\\vec u = 3\\vec i + (-2)\\vec j$ nên $\\vec u = (3; -2)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A(2; -1)$, $B(-1; 3)$. Toạ độ của $\\overrightarrow{AB}$ là',
      options: ['$(-3; 4)$', '$(3; -4)$', '$(1; 2)$', '$(-3; -4)$'],
      answer: 0,
      hints: ['Lấy toạ độ điểm cuối trừ toạ độ điểm đầu.'],
      solution: '$\\overrightarrow{AB} = (-1 - 2; 3 - (-1)) = (-3; 4)$.',
    },
    {
      type: 'number',
      prompt: 'Cho $A(2; -1)$, $B(-1; 3)$. Tính độ dài đoạn thẳng $AB$.',
      answer: 5,
      hints: ['$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.'],
      solution: '$\\overrightarrow{AB} = (-3; 4)$ nên $AB = \\sqrt{9 + 16} = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\vec u = (1; -2)$ và $\\vec v = (3; 4)$. Toạ độ của $\\vec u + 2\\vec v$ là',
      options: ['$(7; 6)$', '$(4; 2)$', '$(5; 0)$', '$(-5; -10)$'],
      answer: 0,
      hints: ['Tính $2\\vec v$ trước, rồi cộng từng toạ độ.'],
      solution: '$2\\vec v = (6; 8)$, nên $\\vec u + 2\\vec v = (1 + 6; -2 + 8) = (7; 6)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A(-3; 4)$, $B(5; 2)$. Trung điểm $I$ của đoạn thẳng $AB$ có toạ độ là',
      options: ['$(1; 3)$', '$(4; -1)$', '$(2; 6)$', '$(8; -2)$'],
      answer: 0,
      hints: ['Toạ độ trung điểm là trung bình cộng toạ độ hai đầu mút.'],
      solution: '$x_I = \\dfrac{-3 + 5}{2} = 1$, $y_I = \\dfrac{4 + 2}{2} = 3$. Vậy $I(1; 3)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho tam giác $ABC$ với $A(1; 2)$, $B(-2; 5)$, $C(4; 2)$. Trọng tâm $G$ có toạ độ là',
      options: ['$(1; 3)$', '$(3; 9)$', '$(1{,}5; 4{,}5)$', '$(-1; 3)$'],
      answer: 0,
      hints: ['Cộng ba hoành độ rồi chia $3$; làm tương tự với tung độ.'],
      solution:
        '$x_G = \\dfrac{1 - 2 + 4}{3} = 1$, $y_G = \\dfrac{2 + 5 + 2}{3} = 3$. Vậy $G(1; 3)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để hai vectơ $\\vec u = (2; m)$ và $\\vec v = (4; 6)$ cùng phương.',
      answer: 3,
      hints: ["Hai vectơ $(x; y)$, $(x'; y')$ cùng phương khi $xy' - x'y = 0$."],
      solution:
        '$2 \\cdot 6 - 4 \\cdot m = 0 \\Leftrightarrow 4m = 12 \\Leftrightarrow m = 3$. Khi đó $\\vec v = 2\\vec u$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $A(0; 0)$, $B(3; 1)$, $C(4; 4)$. Điểm $D$ để $ABCD$ là hình bình hành có toạ độ là',
      options: ['$(1; 3)$', '$(7; 5)$', '$(-1; -3)$', '$(5; 3)$'],
      answer: 0,
      hints: [
        '$ABCD$ là hình bình hành khi $\\overrightarrow{AD} = \\overrightarrow{BC}$.',
        'Tính $\\overrightarrow{BC}$, rồi $D = A + \\overrightarrow{BC}$ theo toạ độ.',
      ],
      solution:
        '$\\overrightarrow{BC} = (1; 3)$ và $\\overrightarrow{AD} = (x_D; y_D)$. Từ $\\overrightarrow{AD} = \\overrightarrow{BC}$ được $D(1; 3)$. ($A$, $B$, $C$ không thẳng hàng vì $3 \\cdot 4 - 4 \\cdot 1 = 8 \\ne 0$.)',
    },
    {
      type: 'number',
      prompt: 'Cho ba điểm $A(1; 2)$, $B(3; 6)$, $C(5; y)$. Tìm $y$ để $A$, $B$, $C$ thẳng hàng.',
      answer: 10,
      hints: [
        '$A$, $B$, $C$ thẳng hàng khi $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$ cùng phương.',
        '$\\overrightarrow{AB} = (2; 4)$, $\\overrightarrow{AC} = (4; y - 2)$.',
      ],
      solution:
        '$\\overrightarrow{AB} = (2; 4)$, $\\overrightarrow{AC} = (4; y - 2)$ cùng phương khi $2(y - 2) - 4 \\cdot 4 = 0 \\Leftrightarrow y - 2 = 8 \\Leftrightarrow y = 10$.',
    },
  ],
  takeaways: [
    '$\\vec u = x\\vec i + y\\vec j \\Leftrightarrow \\vec u = (x; y)$; $M(x; y) \\Leftrightarrow \\overrightarrow{OM} = (x; y)$.',
    '$\\overrightarrow{AB} = (x_B - x_A; y_B - y_A)$, $|\\vec u| = \\sqrt{x^2 + y^2}$.',
    "$\\vec u \\pm \\vec v = (x \\pm x'; y \\pm y')$, $k\\vec u = (kx; ky)$.",
    "$\\vec u$, $\\vec v$ cùng phương $\\Leftrightarrow xy' - x'y = 0$.",
    'Trung điểm: trung bình cộng toạ độ hai đầu mút; trọng tâm: trung bình cộng toạ độ ba đỉnh.',
  ],
};
