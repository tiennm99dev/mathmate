/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình đường tròn biết tâm và bán kính, nhận biết phương trình dạng khai triển, tìm tâm và bán kính, và phương trình tiếp tuyến của đường tròn tại một điểm.',
  intro:
    'Một trạm phát sóng phủ sóng mọi nơi cách nó không quá $5$ km. Ranh giới vùng phủ sóng là một đường tròn. Trong mặt phẳng toạ độ, điều kiện "cách tâm đúng $R$" trở thành một phương trình bậc hai đối với $x$ và $y$.',
  objectives: [
    'Lập phương trình đường tròn khi biết tâm và bán kính.',
    'Nhận biết phương trình dạng $x^2 + y^2 - 2ax - 2by + c = 0$ là phương trình đường tròn và tìm tâm, bán kính.',
    'Viết phương trình tiếp tuyến của đường tròn tại một điểm thuộc đường tròn.',
  ],
  sections: [
    {
      heading: 'Phương trình đường tròn',
      blocks: [
        {
          type: 'p',
          text: 'Đường tròn $(C)$ tâm $I(a; b)$, bán kính $R$ là tập hợp các điểm $M(x; y)$ sao cho $IM = R$. Vì $IM = \\sqrt{(x - a)^2 + (y - b)^2}$, nên $M \\in (C)$ khi và chỉ khi:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình đường tròn',
          text: 'Phương trình $(x - a)^2 + (y - b)^2 = R^2$ được gọi là phương trình của đường tròn tâm $I(a; b)$, bán kính $R$.',
        },
        {
          type: 'p',
          text: 'Khai triển phương trình trên ta được $x^2 + y^2 - 2ax - 2by + c = 0$ với $c = a^2 + b^2 - R^2$. Ngược lại, không phải phương trình nào có dạng này cũng là phương trình đường tròn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Phương trình $x^2 + y^2 - 2ax - 2by + c = 0$ là phương trình của một đường tròn khi và chỉ khi $a^2 + b^2 - c > 0$. Khi đó đường tròn có tâm $I(a; b)$ và bán kính $R = \\sqrt{a^2 + b^2 - c}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý dấu',
          text: 'Trong $(x - a)^2 + (y - b)^2 = R^2$, tâm có toạ độ là các số bị trừ: $(x + 1)^2 + (y - 3)^2 = 16$ có tâm $I(-1; 3)$, $R = 4$. Trong dạng khai triển, hệ số của $x$ là $-2a$: $x^2 + y^2 - 4x + 6y - 3 = 0$ có $a = 2$, $b = -3$.',
        },
      ],
    },
    {
      heading: 'Phương trình tiếp tuyến của đường tròn',
      blocks: [
        {
          type: 'p',
          text: 'Cho điểm $M_0(x_0; y_0)$ thuộc đường tròn $(C)$ tâm $I(a; b)$. Tiếp tuyến $\\Delta$ của $(C)$ tại $M_0$ vuông góc với bán kính $IM_0$, nên đi qua $M_0$ và nhận $\\overrightarrow{M_0I} = (a - x_0; b - y_0)$ làm vectơ pháp tuyến.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiếp tuyến tại một điểm',
          text: 'Tiếp tuyến của đường tròn tâm $I(a; b)$ tại điểm $M_0(x_0; y_0)$ nằm trên đường tròn có phương trình $$(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0.$$',
        },
        {
          type: 'p',
          text: 'Một đường thẳng $\\Delta$ tiếp xúc với đường tròn tâm $I$, bán kính $R$ khi và chỉ khi $d(I, \\Delta) = R$. Điều này giúp tìm bán kính của đường tròn tâm $I$ tiếp xúc với một đường thẳng cho trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường tròn và tiếp tuyến',
    instruction:
      'Kéo tâm $I$ (hoặc chọn rồi dùng phím mũi tên) và chọn bán kính: phương trình đường tròn và dạng khai triển đổi theo. Nhấp (hoặc chọn bằng Tab rồi nhấn Enter) một điểm $M$ trên đường tròn để vẽ tiếp tuyến tại $M$.',
  },
  examples: [
    {
      problem: 'Viết phương trình đường tròn tâm $I(2; -3)$ và đi qua điểm $A(5; 1)$.',
      steps: [
        'Bán kính $R = IA = \\sqrt{(5 - 2)^2 + (1 + 3)^2} = \\sqrt{9 + 16} = 5$.',
        'Phương trình: $(x - 2)^2 + (y + 3)^2 = 25$.',
      ],
      answer: '$(x - 2)^2 + (y + 3)^2 = 25$.',
    },
    {
      problem:
        'Chứng tỏ $x^2 + y^2 - 4x + 6y - 3 = 0$ là phương trình của một đường tròn. Tìm tâm và bán kính của đường tròn đó.',
      steps: [
        'So sánh với $x^2 + y^2 - 2ax - 2by + c = 0$: $-2a = -4$, $-2b = 6$, $c = -3$, nên $a = 2$, $b = -3$.',
        '$a^2 + b^2 - c = 4 + 9 + 3 = 16 > 0$, nên đây là phương trình đường tròn.',
        'Tâm $I(2; -3)$, bán kính $R = \\sqrt{16} = 4$.',
      ],
      answer: 'Tâm $I(2; -3)$, $R = 4$.',
    },
    {
      problem:
        'Cho đường tròn $(C): (x - 1)^2 + (y - 2)^2 = 25$. Kiểm tra $M(4; 6)$ thuộc $(C)$ và viết phương trình tiếp tuyến của $(C)$ tại $M$.',
      steps: [
        '$(4 - 1)^2 + (6 - 2)^2 = 9 + 16 = 25$, nên $M \\in (C)$.',
        'Tâm $I(1; 2)$. Tiếp tuyến tại $M$: $(1 - 4)(x - 4) + (2 - 6)(y - 6) = 0$.',
        '$\\Leftrightarrow -3x + 12 - 4y + 24 = 0 \\Leftrightarrow 3x + 4y - 36 = 0$.',
      ],
      answer: '$3x + 4y - 36 = 0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường tròn $(x + 1)^2 + (y - 3)^2 = 16$ có tâm và bán kính là',
      options: [
        '$I(-1; 3)$, $R = 4$',
        '$I(1; -3)$, $R = 4$',
        '$I(-1; 3)$, $R = 16$',
        '$I(1; -3)$, $R = 16$',
      ],
      answer: 0,
      hints: ['So sánh với $(x - a)^2 + (y - b)^2 = R^2$: $x + 1 = x - (-1)$.'],
      solution: '$a = -1$, $b = 3$, $R^2 = 16$ nên tâm $I(-1; 3)$ và $R = 4$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phương trình là phương trình đường tròn.',
      options: [
        '$x^2 + y^2 - 2x + 4y + 1 = 0$',
        '$x^2 + y^2 + 2x + 2y + 5 = 0$',
        '$2x^2 + y^2 - 4 = 0$',
        '$x^2 + y^2 - 6x = 0$',
        '$x^2 + y^2 + xy - 1 = 0$',
      ],
      answers: [0, 3],
      hints: [
        'Phương trình phải có dạng $x^2 + y^2 - 2ax - 2by + c = 0$: hệ số của $x^2$ và $y^2$ bằng nhau, không có hạng tử $xy$.',
        'Sau đó kiểm tra $a^2 + b^2 - c > 0$.',
      ],
      solution:
        '$x^2 + y^2 - 2x + 4y + 1 = 0$: $a = 1$, $b = -2$, $c = 1$, $1 + 4 - 1 = 4 > 0$, đúng. $x^2 + y^2 + 2x + 2y + 5 = 0$: $1 + 1 - 5 < 0$, không phải. $2x^2 + y^2 - 4 = 0$ có hệ số $x^2$, $y^2$ khác nhau; $x^2 + y^2 + xy - 1 = 0$ có hạng tử $xy$. $x^2 + y^2 - 6x = 0$: $a = 3$, $b = 0$, $c = 0$, $9 > 0$, đúng.',
    },
    {
      type: 'number',
      prompt: 'Tính bán kính của đường tròn $x^2 + y^2 - 4x + 2y - 4 = 0$.',
      answer: 3,
      hints: ['Tìm $a$, $b$, $c$ từ $-2a = -4$, $-2b = 2$.', '$R = \\sqrt{a^2 + b^2 - c}$.'],
      solution: '$a = 2$, $b = -1$, $c = -4$. $R = \\sqrt{4 + 1 + 4} = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A(1; 1)$, $B(5; 3)$. Phương trình đường tròn đường kính $AB$ là',
      options: [
        '$(x - 3)^2 + (y - 2)^2 = 5$',
        '$(x - 3)^2 + (y - 2)^2 = 20$',
        '$(x + 3)^2 + (y + 2)^2 = 5$',
        '$(x - 3)^2 + (y - 2)^2 = \\sqrt{5}$',
      ],
      answer: 0,
      hints: ['Tâm là trung điểm của $AB$.', 'Bán kính bằng $\\dfrac{AB}{2}$; vế phải là $R^2$.'],
      solution:
        'Tâm $I(3; 2)$. $AB = \\sqrt{16 + 4} = \\sqrt{20}$, nên $R = \\dfrac{\\sqrt{20}}{2} = \\sqrt{5}$ và $R^2 = 5$. Phương trình: $(x - 3)^2 + (y - 2)^2 = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị nguyên lớn nhất của $m$ để $x^2 + y^2 - 2x + 4y + m = 0$ là phương trình của một đường tròn.',
      answer: 4,
      hints: ['Điều kiện: $a^2 + b^2 - c > 0$ với $a = 1$, $b = -2$, $c = m$.'],
      solution: '$1 + 4 - m > 0 \\Leftrightarrow m < 5$. Giá trị nguyên lớn nhất là $m = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn tâm $I(1; -2)$ tiếp xúc với đường thẳng $\\Delta: 3x - 4y + 4 = 0$. Tính bán kính của đường tròn.',
      answer: 3,
      hints: ['Đường tròn tiếp xúc với $\\Delta$ khi $R = d(I, \\Delta)$.'],
      solution:
        '$R = d(I, \\Delta) = \\dfrac{|3 \\cdot 1 - 4 \\cdot (-2) + 4|}{\\sqrt{9 + 16}} = \\dfrac{15}{5} = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Tiếp tuyến của đường tròn $x^2 + y^2 = 25$ tại điểm $M(3; 4)$ có phương trình',
      options: ['$3x + 4y - 25 = 0$', '$3x + 4y + 25 = 0$', '$4x - 3y = 0$', '$3x - 4y + 7 = 0$'],
      answer: 0,
      hints: [
        'Tâm là $O(0; 0)$.',
        'Tiếp tuyến tại $M$ nhận $\\overrightarrow{MO}$ (hay $\\overrightarrow{OM}$) làm vectơ pháp tuyến.',
      ],
      solution:
        '$(0 - 3)(x - 3) + (0 - 4)(y - 4) = 0 \\Leftrightarrow 3x + 4y - 25 = 0$. Đường $4x - 3y = 0$ là đường thẳng $OM$, không phải tiếp tuyến.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp tuyến của đường tròn $(x - 2)^2 + (y + 1)^2 = 10$ tại điểm $M(3; 2)$ có phương trình $x + 3y + c = 0$. Tìm $c$.',
      answer: -9,
      hints: ['Tâm $I(2; -1)$. Dùng $(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0$.'],
      solution:
        '$(2 - 3)(x - 3) + (-1 - 2)(y - 2) = 0 \\Leftrightarrow -x + 3 - 3y + 6 = 0 \\Leftrightarrow x + 3y - 9 = 0$. Vậy $c = -9$.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản đồ có hệ toạ độ (đơn vị km), một trạm phát sóng đặt tại $I(2; 1)$ phủ sóng trong bán kính $5$ km. Ranh giới vùng phủ sóng có phương trình $x^2 + y^2 - 4x - 2y + c = 0$. Tìm $c$.',
      answer: -20,
      hints: ['Viết $(x - 2)^2 + (y - 1)^2 = 25$ rồi khai triển.', '$c = a^2 + b^2 - R^2$.'],
      solution: '$c = 2^2 + 1^2 - 5^2 = 4 + 1 - 25 = -20$.',
    },
  ],
  takeaways: [
    'Đường tròn tâm $I(a; b)$, bán kính $R$: $(x - a)^2 + (y - b)^2 = R^2$.',
    '$x^2 + y^2 - 2ax - 2by + c = 0$ là đường tròn khi $a^2 + b^2 - c > 0$; tâm $I(a; b)$, $R = \\sqrt{a^2 + b^2 - c}$.',
    'Tiếp tuyến tại $M_0(x_0; y_0) \\in (C)$: $(a - x_0)(x - x_0) + (b - y_0)(y - y_0) = 0$.',
    'Đường thẳng tiếp xúc với đường tròn khi khoảng cách từ tâm đến nó bằng bán kính.',
  ],
};
