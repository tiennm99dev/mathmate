/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vectơ trong không gian: vectơ bằng nhau, tổng và hiệu theo quy tắc ba điểm, hình bình hành, hình hộp; tích của một số với một vectơ; góc giữa hai vectơ và tích vô hướng.',
  intro:
    'Một chiếc đèn treo được giữ bởi ba sợi dây kéo theo ba hướng khác nhau, không cùng nằm trong một mặt phẳng. Để biết hợp lực của ba lực ấy, ta cần cộng các vectơ trong không gian. Ở lớp 10 em đã học vectơ trong mặt phẳng; bài này mở rộng các khái niệm và phép toán ấy ra không gian, và thêm một quy tắc mới: quy tắc hình hộp.',
  objectives: [
    'Nhận biết vectơ, độ dài, giá, hai vectơ cùng phương, cùng hướng, bằng nhau và vectơ-không trong không gian.',
    'Thực hiện phép cộng, trừ hai vectơ, nhân một số với một vectơ; vận dụng quy tắc ba điểm, quy tắc hình bình hành và quy tắc hình hộp.',
    'Xác định góc giữa hai vectơ và tính tích vô hướng của hai vectơ trong không gian.',
  ],
  sections: [
    {
      heading: 'Vectơ trong không gian',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Vectơ trong không gian là một đoạn thẳng có hướng. Vectơ có điểm đầu $A$, điểm cuối $B$ được kí hiệu là $\\overrightarrow{AB}$; vectơ còn được kí hiệu bằng một chữ cái in thường có mũi tên ở trên như $\\vec{a}$, $\\vec{b}$, $\\vec{u}$, $\\vec{v}$.',
        },
        {
          type: 'list',
          items: [
            'Độ dài của vectơ $\\overrightarrow{AB}$ là độ dài đoạn thẳng $AB$, kí hiệu $|\\overrightarrow{AB}|$. Đường thẳng $AB$ gọi là giá của vectơ $\\overrightarrow{AB}$.',
            'Hai vectơ gọi là cùng phương nếu giá của chúng song song hoặc trùng nhau. Hai vectơ cùng phương thì hoặc cùng hướng, hoặc ngược hướng.',
            'Hai vectơ $\\vec{a}$, $\\vec{b}$ bằng nhau, kí hiệu $\\vec{a} = \\vec{b}$, nếu chúng có cùng độ dài và cùng hướng.',
            'Vectơ có điểm đầu và điểm cuối trùng nhau gọi là vectơ-không, kí hiệu $\\vec{0}$; nó có độ dài $0$ và cùng hướng với mọi vectơ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: "Cho điểm $O$ và vectơ $\\vec{a}$, có duy nhất điểm $A$ sao cho $\\overrightarrow{OA} = \\vec{a}$. Chẳng hạn trong hình hộp $ABCD.A'B'C'D'$, các cạnh song song cho các vectơ bằng nhau: $\\overrightarrow{AB} = \\overrightarrow{DC} = \\overrightarrow{A'B'} = \\overrightarrow{D'C'}$.",
        },
      ],
    },
    {
      heading: 'Tổng và hiệu của hai vectơ',
      blocks: [
        {
          type: 'p',
          text: 'Cho hai vectơ $\\vec{a}$, $\\vec{b}$. Lấy một điểm $A$ bất kì, vẽ $\\overrightarrow{AB} = \\vec{a}$ và $\\overrightarrow{BC} = \\vec{b}$. Vectơ $\\overrightarrow{AC}$ gọi là tổng của hai vectơ $\\vec{a}$ và $\\vec{b}$, kí hiệu $\\vec{a} + \\vec{b}$. Phép cộng vectơ trong không gian có tính chất giao hoán, kết hợp, cộng với vectơ-không như trong mặt phẳng.',
        },
        {
          type: 'table',
          head: ['Quy tắc', 'Nội dung'],
          rows: [
            [
              'Ba điểm',
              'Với ba điểm $A$, $B$, $C$ bất kì: $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$',
            ],
            [
              'Hình bình hành',
              'Nếu $ABCD$ là hình bình hành thì $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$',
            ],
            [
              'Hiệu',
              'Với ba điểm $O$, $A$, $B$ bất kì: $\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc hình hộp',
          text: "Nếu $ABCD.A'B'C'D'$ là hình hộp thì $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$.",
        },
        {
          type: 'p',
          text: "Giải thích: theo quy tắc hình bình hành $\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$; vì $ACC'A'$ là hình bình hành nên $\\overrightarrow{AC} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$. Tổng ba vectơ cùng điểm đầu nằm trên ba cạnh của hình hộp là vectơ đường chéo xuất phát từ điểm đầu ấy.",
        },
        {
          type: 'p',
          text: 'Hiệu của $\\vec{a}$ và $\\vec{b}$ là tổng của $\\vec{a}$ với vectơ đối của $\\vec{b}$: $\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})$, trong đó $-\\vec{b}$ cùng độ dài, ngược hướng với $\\vec{b}$.',
        },
      ],
    },
    {
      heading: 'Tích của một số với một vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Tích của số thực $k \\ne 0$ với vectơ $\\vec{a} \\ne \\vec{0}$ là một vectơ, kí hiệu $k\\vec{a}$, cùng hướng với $\\vec{a}$ nếu $k > 0$, ngược hướng với $\\vec{a}$ nếu $k < 0$, và có độ dài bằng $|k| \\cdot |\\vec{a}|$. Quy ước $0\\vec{a} = \\vec{0}$ và $k\\vec{0} = \\vec{0}$.',
        },
        {
          type: 'list',
          items: [
            '$k(\\vec{a} + \\vec{b}) = k\\vec{a} + k\\vec{b}$; $(h + k)\\vec{a} = h\\vec{a} + k\\vec{a}$; $h(k\\vec{a}) = (hk)\\vec{a}$; $1\\vec{a} = \\vec{a}$, $(-1)\\vec{a} = -\\vec{a}$.',
            'Hai vectơ $\\vec{a}$ và $\\vec{b}$, với $\\vec{a} \\ne \\vec{0}$, cùng phương khi và chỉ khi có số $k$ sao cho $\\vec{b} = k\\vec{a}$.',
            '$I$ là trung điểm của đoạn thẳng $AB$ khi và chỉ khi $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec{0}$; khi đó với mọi điểm $M$: $\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI}$.',
            '$G$ là trọng tâm tam giác $ABC$ khi và chỉ khi $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec{0}$; khi đó với mọi điểm $M$: $\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG}$.',
          ],
        },
      ],
    },
    {
      heading: 'Tích vô hướng của hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc giữa hai vectơ',
          text: 'Cho hai vectơ $\\vec{u}$, $\\vec{v}$ khác $\\vec{0}$. Lấy một điểm $O$ bất kì, vẽ $\\overrightarrow{OA} = \\vec{u}$ và $\\overrightarrow{OB} = \\vec{v}$. Góc $\\widehat{AOB}$ (từ $0^\\circ$ đến $180^\\circ$) gọi là góc giữa hai vectơ $\\vec{u}$ và $\\vec{v}$, kí hiệu $(\\vec{u}, \\vec{v})$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tích vô hướng',
          text: 'Tích vô hướng của hai vectơ $\\vec{u}$ và $\\vec{v}$ khác $\\vec{0}$ là một số, kí hiệu $\\vec{u} \\cdot \\vec{v}$, xác định bởi $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$. Nếu $\\vec{u} = \\vec{0}$ hoặc $\\vec{v} = \\vec{0}$ thì quy ước $\\vec{u} \\cdot \\vec{v} = 0$.',
        },
        {
          type: 'list',
          items: [
            '$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$ (với $\\vec{u}$, $\\vec{v}$ khác $\\vec{0}$).',
            '$\\vec{u}^2 = \\vec{u} \\cdot \\vec{u} = |\\vec{u}|^2$.',
            '$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$ (với $\\vec{u}$, $\\vec{v}$ khác $\\vec{0}$).',
            'Tích vô hướng có tính chất giao hoán $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$ và phân phối với phép cộng $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$.',
          ],
        },
        {
          type: 'p',
          text: 'Chọn hai vectơ trong hình lập phương cạnh $a$ dưới đây. Nếu vectơ thứ hai không xuất phát từ $A$, ta vẽ một vectơ bằng nó có điểm đầu $A$ để thấy góc giữa hai vectơ.',
        },
        { type: 'widget', name: 'dot' },
      ],
    },
  ],
  explore: {
    title: 'Quy tắc hình hộp',
    instruction:
      "Bật, tắt các vectơ $\\overrightarrow{AB}$, $\\overrightarrow{AD}$, $\\overrightarrow{AA'}$ để xem tổng của chúng được vẽ nối đuôi dọc các cạnh và thành một vectơ từ $A$. Kéo hình để xoay, đổi góc ở đáy và độ nghiêng để thấy quy tắc đúng với mọi hình hộp.",
  },
  examples: [
    {
      problem:
        "Cho hình hộp $ABCD.A'B'C'D'$. Chứng minh rằng $\\overrightarrow{AB} + \\overrightarrow{B'C'} + \\overrightarrow{DD'} = \\overrightarrow{AC'}$.",
      steps: [
        "$BCC'B'$ là hình bình hành nên $\\overrightarrow{B'C'} = \\overrightarrow{BC}$.",
        "$CDD'C'$ là hình bình hành nên $\\overrightarrow{DD'} = \\overrightarrow{CC'}$.",
        "Theo quy tắc ba điểm: $\\overrightarrow{AB} + \\overrightarrow{B'C'} + \\overrightarrow{DD'} = \\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CC'} = \\overrightarrow{AC} + \\overrightarrow{CC'} = \\overrightarrow{AC'}$.",
      ],
      answer:
        "$\\overrightarrow{AB} + \\overrightarrow{B'C'} + \\overrightarrow{DD'} = \\overrightarrow{AC'}$.",
    },
    {
      problem:
        'Cho tứ diện $ABCD$; $M$, $N$ lần lượt là trung điểm của $AB$ và $CD$. Chứng minh rằng $\\overrightarrow{MN} = \\dfrac{1}{2}\\left(\\overrightarrow{AD} + \\overrightarrow{BC}\\right)$.',
      steps: [
        'Theo quy tắc ba điểm: $\\overrightarrow{MN} = \\overrightarrow{MA} + \\overrightarrow{AD} + \\overrightarrow{DN}$ và $\\overrightarrow{MN} = \\overrightarrow{MB} + \\overrightarrow{BC} + \\overrightarrow{CN}$.',
        'Cộng vế theo vế: $2\\overrightarrow{MN} = \\left(\\overrightarrow{MA} + \\overrightarrow{MB}\\right) + \\overrightarrow{AD} + \\overrightarrow{BC} + \\left(\\overrightarrow{DN} + \\overrightarrow{CN}\\right)$.',
        '$M$ là trung điểm của $AB$ nên $\\overrightarrow{MA} + \\overrightarrow{MB} = \\vec{0}$; $N$ là trung điểm của $CD$ nên $\\overrightarrow{DN} + \\overrightarrow{CN} = \\vec{0}$.',
        'Vậy $2\\overrightarrow{MN} = \\overrightarrow{AD} + \\overrightarrow{BC}$.',
      ],
      answer:
        '$\\overrightarrow{MN} = \\dfrac{1}{2}\\left(\\overrightarrow{AD} + \\overrightarrow{BC}\\right)$.',
    },
    {
      problem:
        "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $a$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{A'C'}$.",
      steps: [
        "$ACC'A'$ là hình bình hành nên $\\overrightarrow{A'C'} = \\overrightarrow{AC}$, do đó $(\\overrightarrow{AB}, \\overrightarrow{A'C'}) = (\\overrightarrow{AB}, \\overrightarrow{AC}) = \\widehat{BAC} = 45^\\circ$.",
        "$|\\overrightarrow{AB}| = a$, $|\\overrightarrow{A'C'}| = AC = a\\sqrt{2}$ (đường chéo của hình vuông cạnh $a$).",
        "$\\overrightarrow{AB} \\cdot \\overrightarrow{A'C'} = a \\cdot a\\sqrt{2} \\cdot \\cos 45^\\circ = a \\cdot a\\sqrt{2} \\cdot \\dfrac{\\sqrt{2}}{2} = a^2$.",
      ],
      answer: "$\\overrightarrow{AB} \\cdot \\overrightarrow{A'C'} = a^2$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'}$ bằng vectơ nào?",
      options: [
        "$\\overrightarrow{AC'}$",
        '$\\overrightarrow{AC}$',
        "$\\overrightarrow{A'C}$",
        "$\\overrightarrow{BD'}$",
      ],
      answer: 0,
      hints: ['Đây chính là quy tắc hình hộp: ba cạnh cùng xuất phát từ $A$.'],
      solution:
        "Theo quy tắc hình hộp, $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$, vectơ đường chéo của hình hộp xuất phát từ $A$.",
    },
    {
      type: 'choice',
      prompt:
        "Cho hình hộp $ABCD.A'B'C'D'$. Vectơ $\\overrightarrow{AB} + \\overrightarrow{A'D'}$ bằng vectơ nào?",
      options: [
        '$\\overrightarrow{AC}$',
        "$\\overrightarrow{AD'}$",
        "$\\overrightarrow{AB'}$",
        '$\\overrightarrow{BD}$',
      ],
      answer: 0,
      hints: [
        "Tìm một vectơ có điểm đầu $A$ bằng $\\overrightarrow{A'D'}$.",
        "$ADD'A'$ là hình bình hành nên $\\overrightarrow{A'D'} = \\overrightarrow{AD}$.",
      ],
      solution:
        "$\\overrightarrow{A'D'} = \\overrightarrow{AD}$, nên $\\overrightarrow{AB} + \\overrightarrow{A'D'} = \\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC}$ (quy tắc hình bình hành với $ABCD$).",
    },
    {
      type: 'choice',
      prompt: 'Cho vectơ $\\vec{a} \\ne \\vec{0}$. Khẳng định nào đúng về vectơ $-2\\vec{a}$?',
      options: [
        'Ngược hướng với $\\vec{a}$ và có độ dài $2|\\vec{a}|$.',
        'Cùng hướng với $\\vec{a}$ và có độ dài $2|\\vec{a}|$.',
        'Ngược hướng với $\\vec{a}$ và có độ dài $-2|\\vec{a}|$.',
        'Không cùng phương với $\\vec{a}$.',
      ],
      answer: 0,
      hints: [
        'Với $k < 0$, $k\\vec{a}$ ngược hướng với $\\vec{a}$ và có độ dài $|k| \\cdot |\\vec{a}|$.',
      ],
      solution:
        'Vì $k = -2 < 0$ nên $-2\\vec{a}$ ngược hướng với $\\vec{a}$ (vẫn cùng phương), và $|-2\\vec{a}| = |-2| \\cdot |\\vec{a}| = 2|\\vec{a}|$. Độ dài không bao giờ âm.',
    },
    {
      type: 'multi',
      prompt:
        'Cho tứ diện $ABCD$ và $G$ là trọng tâm tam giác $BCD$. Chọn tất cả các đẳng thức đúng.',
      options: [
        '$\\overrightarrow{GB} + \\overrightarrow{GC} + \\overrightarrow{GD} = \\vec{0}$',
        '$\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD} = 3\\overrightarrow{AG}$',
        '$\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD} = \\overrightarrow{AG}$',
        '$\\overrightarrow{GB} + \\overrightarrow{GC} = \\overrightarrow{GD}$',
      ],
      answers: [0, 1],
      hints: [
        'Nhớ tính chất trọng tâm: $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec{0}$ cho tam giác $ABC$.',
        'Với mọi điểm $M$: $\\overrightarrow{MB} + \\overrightarrow{MC} + \\overrightarrow{MD} = 3\\overrightarrow{MG}$. Lấy $M$ là $A$.',
      ],
      solution:
        '$G$ là trọng tâm tam giác $BCD$ nên $\\overrightarrow{GB} + \\overrightarrow{GC} + \\overrightarrow{GD} = \\vec{0}$; do đó $\\overrightarrow{GB} + \\overrightarrow{GC} = -\\overrightarrow{GD} \\ne \\overrightarrow{GD}$. Với $M = A$: $\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD} = 3\\overrightarrow{AG}$, không phải $\\overrightarrow{AG}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai vectơ $\\vec{a}$, $\\vec{b}$ trong không gian với $|\\vec{a}| = 3$, $|\\vec{b}| = 4$ và $(\\vec{a}, \\vec{b}) = 120^\\circ$. Tính $\\vec{a} \\cdot \\vec{b}$.',
      answer: -6,
      hints: [
        'Dùng định nghĩa $\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b})$.',
        '$\\cos 120^\\circ = -\\dfrac{1}{2}$.',
      ],
      solution:
        '$\\vec{a} \\cdot \\vec{b} = 3 \\cdot 4 \\cdot \\cos 120^\\circ = 12 \\cdot \\left(-\\dfrac{1}{2}\\right) = -6$.',
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$ có cạnh bằng $2$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{AC'}$.",
      answer: 4,
      hints: [
        "$AC'$ là đường chéo của hình lập phương: $AC' = 2\\sqrt{3}$. Tam giác $ABC'$ vuông tại $B$ vì $BC' \\perp AB$.",
        "$\\cos(\\overrightarrow{AB}, \\overrightarrow{AC'}) = \\cos\\widehat{BAC'} = \\dfrac{AB}{AC'}$.",
      ],
      solution:
        "$AB \\perp (BCC'B')$ nên $AB \\perp BC'$, tam giác $ABC'$ vuông tại $B$ và $\\cos\\widehat{BAC'} = \\dfrac{AB}{AC'} = \\dfrac{2}{2\\sqrt{3}}$. Vậy $\\overrightarrow{AB} \\cdot \\overrightarrow{AC'} = AB \\cdot AC' \\cdot \\cos\\widehat{BAC'} = 2 \\cdot 2\\sqrt{3} \\cdot \\dfrac{2}{2\\sqrt{3}} = 4$.",
    },
    {
      type: 'number',
      prompt:
        "Cho hình lập phương $ABCD.A'B'C'D'$. Tính số đo góc $(\\overrightarrow{AC}, \\overrightarrow{B'D'})$ theo độ.",
      answer: 90,
      hints: [
        "$BDD'B'$ là hình bình hành nên $\\overrightarrow{B'D'} = \\overrightarrow{BD}$.",
        'Hai đường chéo của một hình vuông có vuông góc với nhau không?',
      ],
      solution:
        "$\\overrightarrow{B'D'} = \\overrightarrow{BD}$, mà $AC \\perp BD$ (hai đường chéo của hình vuông $ABCD$), nên $(\\overrightarrow{AC}, \\overrightarrow{B'D'}) = (\\overrightarrow{AC}, \\overrightarrow{BD}) = 90^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Cho tứ diện đều $ABCD$ có cạnh bằng $2$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{CD}$.',
      answer: 0,
      hints: [
        'Viết $\\overrightarrow{CD} = \\overrightarrow{AD} - \\overrightarrow{AC}$ rồi dùng tính chất phân phối.',
        'Các mặt là tam giác đều nên $(\\overrightarrow{AB}, \\overrightarrow{AC}) = (\\overrightarrow{AB}, \\overrightarrow{AD}) = 60^\\circ$.',
      ],
      solution:
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{CD} = \\overrightarrow{AB} \\cdot (\\overrightarrow{AD} - \\overrightarrow{AC}) = \\overrightarrow{AB} \\cdot \\overrightarrow{AD} - \\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2 \\cdot 2 \\cdot \\cos 60^\\circ - 2 \\cdot 2 \\cdot \\cos 60^\\circ = 0$. Vậy $AB \\perp CD$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai vectơ $\\vec{u}$, $\\vec{v}$ với $|\\vec{u}| = 2$, $|\\vec{v}| = 3$ và $\\vec{u} \\cdot \\vec{v} = 3$. Tính số đo góc $(\\vec{u}, \\vec{v})$ theo độ.',
      answer: 60,
      hints: [
        '$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$.',
      ],
      solution:
        '$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{3}{2 \\cdot 3} = \\dfrac{1}{2}$, nên $(\\vec{u}, \\vec{v}) = 60^\\circ$.',
    },
  ],
  takeaways: [
    'Vectơ trong không gian là đoạn thẳng có hướng; hai vectơ bằng nhau khi cùng độ dài và cùng hướng.',
    "Quy tắc ba điểm $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$, quy tắc hình bình hành, và quy tắc hình hộp $\\overrightarrow{AB} + \\overrightarrow{AD} + \\overrightarrow{AA'} = \\overrightarrow{AC'}$.",
    '$k\\vec{a}$ cùng hướng với $\\vec{a}$ khi $k > 0$, ngược hướng khi $k < 0$, độ dài $|k| \\cdot |\\vec{a}|$.',
    '$\\vec{u} \\cdot \\vec{v} = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\cos(\\vec{u}, \\vec{v})$; $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.',
  ],
};
