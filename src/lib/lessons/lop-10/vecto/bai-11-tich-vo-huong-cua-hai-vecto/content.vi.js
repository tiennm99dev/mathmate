/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc giữa hai vectơ, tích vô hướng của hai vectơ: định nghĩa, biểu thức toạ độ, điều kiện vuông góc, tính chất và ứng dụng tính công của lực.',
  intro:
    'Kéo một chiếc vali bằng dây chéo lên, chỉ một phần lực kéo làm vali chạy về phía trước. Vật lí đo phần "có ích" đó bằng công $A = F \\cdot s \\cdot \\cos\\alpha$. Phép tính lấy hai vectơ lực và độ dịch chuyển để cho ra một con số như vậy gọi là tích vô hướng.',
  objectives: [
    'Xác định góc giữa hai vectơ.',
    'Tính tích vô hướng của hai vectơ theo định nghĩa và theo toạ độ.',
    'Dùng tích vô hướng để kiểm tra hai vectơ vuông góc, tính độ dài và góc.',
    'Vận dụng tích vô hướng để tính công của một lực.',
  ],
  sections: [
    {
      heading: 'Góc giữa hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc giữa hai vectơ',
          text: 'Cho hai vectơ $\\vec u$, $\\vec v$ khác $\\vec 0$. Từ một điểm $A$ tuỳ ý, vẽ $\\overrightarrow{AB} = \\vec u$ và $\\overrightarrow{AC} = \\vec v$. Số đo của góc $BAC$ được gọi là số đo góc giữa hai vectơ $\\vec u$ và $\\vec v$, kí hiệu $(\\vec u, \\vec v)$.',
        },
        {
          type: 'list',
          items: [
            'Quy ước: nếu một trong hai vectơ là $\\vec 0$ thì góc giữa chúng có thể nhận một giá trị tuỳ ý từ $0^\\circ$ đến $180^\\circ$.',
            '$0^\\circ \\le (\\vec u, \\vec v) \\le 180^\\circ$ và $(\\vec u, \\vec v) = (\\vec v, \\vec u)$.',
            '$(\\vec u, \\vec v) = 0^\\circ$ khi hai vectơ cùng hướng, $(\\vec u, \\vec v) = 180^\\circ$ khi hai vectơ ngược hướng.',
            'Nếu $(\\vec u, \\vec v) = 90^\\circ$ thì ta nói $\\vec u$ và $\\vec v$ vuông góc, kí hiệu $\\vec u \\perp \\vec v$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Muốn đọc góc giữa hai vectơ, phải đưa chúng về chung điểm đầu. Chẳng hạn trong tam giác đều $ABC$: $(\\overrightarrow{AB}, \\overrightarrow{AC}) = 60^\\circ$ nhưng $(\\overrightarrow{AB}, \\overrightarrow{BC}) = 120^\\circ$.',
        },
      ],
    },
    {
      heading: 'Tích vô hướng của hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tích vô hướng',
          text: 'Tích vô hướng của hai vectơ $\\vec u$ và $\\vec v$ là một số, kí hiệu $\\vec u \\cdot \\vec v$, được xác định bởi $\\vec u \\cdot \\vec v = |\\vec u| \\cdot |\\vec v| \\cdot \\cos(\\vec u, \\vec v)$.',
        },
        {
          type: 'list',
          items: [
            '$\\vec u \\perp \\vec v \\Leftrightarrow \\vec u \\cdot \\vec v = 0$.',
            '$\\vec u \\cdot \\vec u$ còn viết là $\\vec u^2$, gọi là bình phương vô hướng của $\\vec u$: $\\vec u^2 = |\\vec u|^2$.',
            'Dấu của tích vô hướng là dấu của $\\cos(\\vec u, \\vec v)$: dương khi góc nhọn, âm khi góc tù (với hai vectơ khác $\\vec 0$).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Công của lực',
          text: 'Một lực $\\vec F$ không đổi làm vật dịch chuyển theo vectơ $\\vec d$ thì sinh công $A = \\vec F \\cdot \\vec d = |\\vec F| \\cdot |\\vec d| \\cdot \\cos(\\vec F, \\vec d)$. Lực tính bằng niutơn (N), độ dịch chuyển bằng mét (m), công bằng jun (J).',
        },
      ],
    },
    {
      heading: 'Biểu thức toạ độ và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức toạ độ',
          text: "Với $\\vec u = (x; y)$ và $\\vec v = (x'; y')$: $\\vec u \\cdot \\vec v = xx' + yy'$.",
        },
        {
          type: 'p',
          text: 'Từ đó suy ra:',
        },
        {
          type: 'list',
          items: [
            "$\\vec u \\perp \\vec v \\Leftrightarrow xx' + yy' = 0$;",
            '$|\\vec u| = \\sqrt{\\vec u^2} = \\sqrt{x^2 + y^2}$;',
            "Nếu $\\vec u \\ne \\vec 0$ và $\\vec v \\ne \\vec 0$ thì $\\cos(\\vec u, \\vec v) = \\dfrac{\\vec u \\cdot \\vec v}{|\\vec u| \\cdot |\\vec v|} = \\dfrac{xx' + yy'}{\\sqrt{x^2 + y^2} \\cdot \\sqrt{x'^2 + y'^2}}$.",
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Với ba vectơ $\\vec u$, $\\vec v$, $\\vec w$ và số thực $k$: $\\vec u \\cdot \\vec v = \\vec v \\cdot \\vec u$ (giao hoán); $\\vec u \\cdot (\\vec v + \\vec w) = \\vec u \\cdot \\vec v + \\vec u \\cdot \\vec w$ (phân phối đối với phép cộng); $(k\\vec u) \\cdot \\vec v = k(\\vec u \\cdot \\vec v) = \\vec u \\cdot (k\\vec v)$.',
        },
        {
          type: 'p',
          text: 'Nhờ các tính chất này, ta có các hằng đẳng thức như với số: $(\\vec u + \\vec v)^2 = \\vec u^2 + 2\\vec u \\cdot \\vec v + \\vec v^2$, $(\\vec u - \\vec v)^2 = \\vec u^2 - 2\\vec u \\cdot \\vec v + \\vec v^2$, $(\\vec u + \\vec v) \\cdot (\\vec u - \\vec v) = \\vec u^2 - \\vec v^2$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hình chiếu và dấu của tích vô hướng',
    instruction:
      'Kéo ngọn của hai vectơ cùng gốc $O$ (hoặc chọn rồi dùng phím mũi tên). Đoạn tô đậm trên giá của vectơ thứ nhất là hình chiếu của vectơ thứ hai: màu xanh khi góc nhọn (tích vô hướng dương), màu đỏ khi góc tù (âm). Chọn "Công của lực" để xem công của lực $\\vec F$ khi vật dịch chuyển theo $\\vec d$.',
  },
  examples: [
    {
      problem:
        'Cho tam giác đều $ABC$ cạnh $2$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ và $\\overrightarrow{AB} \\cdot \\overrightarrow{BC}$.',
      steps: [
        'Hai vectơ $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ chung điểm đầu $A$, nên $(\\overrightarrow{AB}, \\overrightarrow{AC}) = \\widehat{BAC} = 60^\\circ$ và $\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2 \\cdot 2 \\cdot \\cos 60^\\circ = 2$.',
        'Để đo góc giữa $\\overrightarrow{AB}$ và $\\overrightarrow{BC}$, vẽ $\\overrightarrow{BD} = \\overrightarrow{AB}$ (kéo dài $AB$ về phía $B$): góc $DBC$ là góc ngoài tại $B$, bằng $180^\\circ - 60^\\circ = 120^\\circ$.',
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{BC} = 2 \\cdot 2 \\cdot \\cos 120^\\circ = 4 \\cdot \\left(-\\dfrac{1}{2}\\right) = -2$.',
      ],
      answer:
        '$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 2$, $\\overrightarrow{AB} \\cdot \\overrightarrow{BC} = -2$.',
    },
    {
      problem:
        'Cho $\\vec u = (1; 2)$ và $\\vec v = (-3; 1)$. Tính $\\vec u \\cdot \\vec v$ và góc giữa hai vectơ (làm tròn đến hàng phần trăm của độ).',
      steps: [
        '$\\vec u \\cdot \\vec v = 1 \\cdot (-3) + 2 \\cdot 1 = -1$.',
        '$|\\vec u| = \\sqrt{1 + 4} = \\sqrt{5}$, $|\\vec v| = \\sqrt{9 + 1} = \\sqrt{10}$.',
        '$\\cos(\\vec u, \\vec v) = \\dfrac{-1}{\\sqrt{5} \\cdot \\sqrt{10}} = -\\dfrac{1}{\\sqrt{50}} \\approx -0{,}1414$, nên $(\\vec u, \\vec v) \\approx 98{,}13^\\circ$.',
      ],
      answer:
        '$\\vec u \\cdot \\vec v = -1$, $(\\vec u, \\vec v) \\approx 98{,}13^\\circ$ (góc tù).',
    },
    {
      problem: 'Tìm $m$ để hai vectơ $\\vec u = (m; 2)$ và $\\vec v = (3; -1)$ vuông góc với nhau.',
      steps: [
        '$\\vec u \\perp \\vec v \\Leftrightarrow \\vec u \\cdot \\vec v = 0$.',
        '$\\vec u \\cdot \\vec v = 3m + 2 \\cdot (-1) = 3m - 2$.',
        '$3m - 2 = 0 \\Leftrightarrow m = \\dfrac{2}{3}$.',
      ],
      answer: '$m = \\dfrac{2}{3}$.',
    },
    {
      problem:
        'Một người kéo một thùng hàng đi $50$ m trên mặt sàn nằm ngang bằng một sợi dây hợp với phương ngang góc $60^\\circ$, lực kéo có độ lớn $20$ N. Tính công của lực kéo.',
      steps: [
        'Gọi $\\vec F$ là lực kéo, $\\vec d$ là vectơ dịch chuyển: $|\\vec F| = 20$, $|\\vec d| = 50$, $(\\vec F, \\vec d) = 60^\\circ$.',
        '$A = \\vec F \\cdot \\vec d = 20 \\cdot 50 \\cdot \\cos 60^\\circ = 1\\,000 \\cdot \\dfrac{1}{2} = 500$.',
      ],
      answer: 'Công của lực kéo là $500$ J.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai vectơ khác $\\vec 0$ ngược hướng thì góc giữa chúng bằng',
      options: ['$180^\\circ$', '$0^\\circ$', '$90^\\circ$', '$45^\\circ$'],
      answer: 0,
      hints: ['Đặt hai vectơ chung điểm đầu: hai tia tạo thành góc gì?'],
      solution:
        'Chung điểm đầu, hai vectơ ngược hướng nằm trên hai tia đối nhau, tạo góc bẹt $180^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $|\\vec a| = 3$, $|\\vec b| = 4$ và $(\\vec a, \\vec b) = 60^\\circ$. Tính $\\vec a \\cdot \\vec b$.',
      answer: 6,
      hints: [
        '$\\vec a \\cdot \\vec b = |\\vec a| \\cdot |\\vec b| \\cdot \\cos(\\vec a, \\vec b)$.',
      ],
      solution:
        '$\\vec a \\cdot \\vec b = 3 \\cdot 4 \\cdot \\cos 60^\\circ = 12 \\cdot \\dfrac{1}{2} = 6$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\vec a = (2; -3)$ và $\\vec b = (4; 1)$. Tính $\\vec a \\cdot \\vec b$.',
      answer: 5,
      hints: ["$\\vec a \\cdot \\vec b = xx' + yy'$."],
      solution: '$\\vec a \\cdot \\vec b = 2 \\cdot 4 + (-3) \\cdot 1 = 8 - 3 = 5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm $m$ để hai vectơ $\\vec u = (2; m)$ và $\\vec v = (-4; 6)$ vuông góc (viết dưới dạng phân số).',
      answer: [4, 3],
      hints: ['Hai vectơ vuông góc khi tích vô hướng bằng $0$.'],
      solution:
        '$\\vec u \\cdot \\vec v = 2 \\cdot (-4) + 6m = 6m - 8 = 0 \\Leftrightarrow m = \\dfrac{4}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hai vectơ $\\vec a$, $\\vec b$ khác $\\vec 0$ có $\\vec a \\cdot \\vec b < 0$. Khẳng định nào đúng?',
      options: [
        'Góc giữa $\\vec a$ và $\\vec b$ là góc tù.',
        'Góc giữa $\\vec a$ và $\\vec b$ là góc nhọn.',
        '$\\vec a$ và $\\vec b$ vuông góc.',
        '$\\vec a$ và $\\vec b$ cùng hướng.',
      ],
      answer: 0,
      hints: [
        '$|\\vec a|$ và $|\\vec b|$ dương, nên dấu của $\\vec a \\cdot \\vec b$ là dấu của số nào?',
      ],
      solution:
        '$\\vec a \\cdot \\vec b = |\\vec a| \\cdot |\\vec b| \\cdot \\cos(\\vec a, \\vec b) < 0$ với $|\\vec a|, |\\vec b| > 0$ nên $\\cos(\\vec a, \\vec b) < 0$: góc giữa hai vectơ là góc tù.',
    },
    {
      type: 'number',
      prompt: 'Tính góc giữa hai vectơ $\\vec u = (1; 1)$ và $\\vec v = (-1; 0)$ (theo độ).',
      answer: 135,
      unit: '°',
      hints: [
        '$\\cos(\\vec u, \\vec v) = \\dfrac{\\vec u \\cdot \\vec v}{|\\vec u| \\cdot |\\vec v|}$.',
        '$\\vec u \\cdot \\vec v = -1$, $|\\vec u| = \\sqrt{2}$, $|\\vec v| = 1$.',
      ],
      solution:
        '$\\cos(\\vec u, \\vec v) = \\dfrac{-1}{\\sqrt{2} \\cdot 1} = -\\dfrac{\\sqrt{2}}{2}$, nên $(\\vec u, \\vec v) = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác $ABC$ vuông cân tại $A$ có $AB = AC = 3$. Tính $\\overrightarrow{AB} \\cdot \\overrightarrow{BC}$.',
      answer: -9,
      hints: [
        'Góc $B$ bằng $45^\\circ$; góc giữa $\\overrightarrow{AB}$ và $\\overrightarrow{BC}$ là góc ngoài tại $B$.',
        '$(\\overrightarrow{AB}, \\overrightarrow{BC}) = 135^\\circ$ và $BC = 3\\sqrt{2}$.',
      ],
      solution:
        '$(\\overrightarrow{AB}, \\overrightarrow{BC}) = 180^\\circ - 45^\\circ = 135^\\circ$, $BC = 3\\sqrt{2}$. Vậy $\\overrightarrow{AB} \\cdot \\overrightarrow{BC} = 3 \\cdot 3\\sqrt{2} \\cdot \\cos 135^\\circ = 9\\sqrt{2} \\cdot \\left(-\\dfrac{\\sqrt{2}}{2}\\right) = -9$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $|\\vec a| = 2$, $|\\vec b| = 3$ và $\\vec a \\cdot \\vec b = 1$. Tính $|\\vec a + \\vec b|$ (làm tròn đến hàng phần trăm).',
      answer: 3.87,
      tolerance: 0.01,
      hints: [
        'Tính bình phương vô hướng $(\\vec a + \\vec b)^2$ trước.',
        '$(\\vec a + \\vec b)^2 = \\vec a^2 + 2\\vec a \\cdot \\vec b + \\vec b^2$.',
      ],
      solution:
        '$|\\vec a + \\vec b|^2 = (\\vec a + \\vec b)^2 = 4 + 2 \\cdot 1 + 9 = 15$, nên $|\\vec a + \\vec b| = \\sqrt{15} \\approx 3{,}87$.',
    },
    {
      type: 'number',
      prompt:
        'Một lực $\\vec F$ có độ lớn $50$ N làm vật dịch chuyển $10$ m theo hướng hợp với $\\vec F$ góc $30^\\circ$. Tính công của lực $\\vec F$ (theo J, làm tròn đến hàng đơn vị).',
      answer: 433,
      tolerance: 0.5,
      unit: 'J',
      hints: ['$A = |\\vec F| \\cdot |\\vec d| \\cdot \\cos(\\vec F, \\vec d)$.'],
      solution:
        '$A = 50 \\cdot 10 \\cdot \\cos 30^\\circ = 500 \\cdot \\dfrac{\\sqrt{3}}{2} = 250\\sqrt{3} \\approx 433$ (J).',
    },
  ],
  takeaways: [
    'Góc giữa hai vectơ đo khi chúng chung điểm đầu, từ $0^\\circ$ đến $180^\\circ$.',
    '$\\vec u \\cdot \\vec v = |\\vec u| \\cdot |\\vec v| \\cdot \\cos(\\vec u, \\vec v)$; $\\vec u^2 = |\\vec u|^2$.',
    "Toạ độ: $\\vec u \\cdot \\vec v = xx' + yy'$; $\\vec u \\perp \\vec v \\Leftrightarrow xx' + yy' = 0$.",
    "$\\cos(\\vec u, \\vec v) = \\dfrac{xx' + yy'}{\\sqrt{x^2 + y^2} \\cdot \\sqrt{x'^2 + y'^2}}$.",
    'Công của lực: $A = \\vec F \\cdot \\vec d$.',
  ],
};
