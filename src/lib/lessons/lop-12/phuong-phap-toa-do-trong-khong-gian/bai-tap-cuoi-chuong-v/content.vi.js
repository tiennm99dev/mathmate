/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương V: phương trình mặt phẳng, khoảng cách từ điểm đến mặt phẳng, phương trình đường thẳng và vị trí tương đối, công thức tính góc, phương trình mặt cầu; kèm bài toán định vị drone trong hệ toạ độ Oxyz và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương V cho ta viết phương trình của mặt phẳng, đường thẳng và mặt cầu trong không gian $Oxyz$. Nhờ đó, những câu hỏi như "drone bay tới đâu thì vào vùng ra-đa?", "đường bay cắt bức tường ở điểm nào?", "mái nhà nghiêng bao nhiêu độ?" đều trở thành bài toán giải phương trình. Bài ôn tập hệ thống lại các công thức, cho em định vị một drone đang bay, và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá phương trình mặt phẳng, đường thẳng, mặt cầu và các công thức khoảng cách, góc trong không gian $Oxyz$.',
    'Vận dụng tổng hợp: tìm giao điểm, hình chiếu, xét vị trí tương đối, tính khoảng cách và góc.',
    'Giải bài toán thực tiễn về định vị máy bay, drone và vùng phủ sóng bằng phương pháp toạ độ.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức chính'],
          rows: [
            [
              'Mặt phẳng qua $M_0$, vectơ pháp tuyến $(A; B; C)$',
              '$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$',
            ],
            [
              'Vectơ pháp tuyến từ cặp vectơ chỉ phương',
              "$\\vec{n} = [\\vec{u}, \\vec{v}] = (bc' - cb'; ca' - ac'; ab' - ba')$",
            ],
            ['Mặt phẳng theo đoạn chắn', '$\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$'],
            [
              'Khoảng cách từ điểm đến mặt phẳng',
              '$d(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$',
            ],
            [
              'Đường thẳng qua $M_0$, vectơ chỉ phương $(a; b; c)$',
              '$x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$',
            ],
            [
              'Vị trí tương đối hai đường thẳng',
              "Cùng phương: trùng nhau hoặc song song; không cùng phương: cắt nhau khi $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 0$, chéo nhau khi khác $0$",
            ],
            [
              'Góc',
              "$\\cos(\\Delta, \\Delta') = |\\cos(\\vec{u}, \\vec{u}')|$; $\\sin(\\Delta, (P)) = |\\cos(\\vec{u}, \\vec{n})|$; $\\cos((P), (P')) = |\\cos(\\vec{n}, \\vec{n}')|$",
            ],
            [
              'Mặt cầu tâm $I(a; b; c)$, bán kính $R$',
              '$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$; dạng $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với $R^2 = a^2 + b^2 + c^2 - d > 0$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Góc giữa đường thẳng và mặt phẳng dùng $\\sin$, hai góc còn lại dùng $\\cos$, và cả ba công thức đều có giá trị tuyệt đối. Hai mặt phẳng có vectơ pháp tuyến cùng phương có thể trùng nhau: kiểm tra thêm hệ số tự do. Trong phương trình mặt cầu, vế phải là $R^2$ chứ không phải $R$.',
        },
        {
          type: 'p',
          text: 'Để tìm giao điểm của đường thẳng và mặt phẳng, thay $x$, $y$, $z$ theo tham số $t$ vào phương trình mặt phẳng, giải ra $t$ rồi thay lại. Hình chiếu vuông góc $H$ của điểm $A$ trên $(P)$ là giao điểm của $(P)$ với đường thẳng qua $A$ nhận vectơ pháp tuyến của $(P)$ làm vectơ chỉ phương.',
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
    title: 'Định vị drone trong hệ toạ độ',
    instruction:
      'Một drone cất cánh từ $A$ và bay thẳng đều. Kéo thời gian $t$ để xem toạ độ của drone, so sánh $IM^2$ với $R^2$ của mặt cầu ra-đa và xét dấu khi thay toạ độ vào phương trình mặt phẳng $(P)$. Hãy tìm ba thời điểm: drone vào vùng ra-đa, chạm $(P)$ và rời vùng ra-đa.',
  },
  examples: [
    {
      problem:
        'Một drone bay theo đường thẳng $x = -4 + 2t$, $y = -4 + 2t$, $z = t$ ($t$ tính bằng phút, đơn vị km). Ra-đa đặt tại $I(0; 0; 2)$ quan sát được trong mặt cầu bán kính $3$ km. Hỏi drone ở trong vùng ra-đa trong khoảng thời gian nào, và khi nào drone chạm mặt phẳng $(P): y + 2z - 6 = 0$?',
      steps: [
        '$IM^2 = (-4 + 2t)^2 + (-4 + 2t)^2 + (t - 2)^2 = 8(t - 2)^2 + (t - 2)^2 = 9(t - 2)^2$.',
        'Drone ở trong hoặc trên mặt cầu khi $9(t - 2)^2 \\le 9 \\iff |t - 2| \\le 1 \\iff 1 \\le t \\le 3$.',
        'Vào vùng ra-đa lúc $t = 1$, tại $(-2; -2; 1)$; rời vùng lúc $t = 3$, tại $(2; 2; 3)$.',
        'Thay vào $(P)$: $(-4 + 2t) + 2t - 6 = 4t - 10 = 0 \\iff t = 2{,}5$, tại điểm $(1; 1; 2{,}5)$.',
      ],
      answer:
        'Drone trong vùng ra-đa từ phút thứ $1$ đến phút thứ $3$; chạm $(P)$ lúc $t = 2{,}5$ phút tại $(1; 1; 2{,}5)$.',
    },
    {
      problem:
        'Cho điểm $A(2; 3; 0)$ và mặt phẳng $(P): x + 2y - 2z + 1 = 0$. Viết phương trình đường thẳng $\\Delta$ đi qua $A$ và vuông góc với $(P)$; tìm hình chiếu vuông góc $H$ của $A$ trên $(P)$ và tính $d(A, (P))$.',
      steps: [
        '$\\Delta$ nhận $\\vec{n} = (1; 2; -2)$ làm vectơ chỉ phương: $x = 2 + t$, $y = 3 + 2t$, $z = -2t$.',
        'Thay vào $(P)$: $(2 + t) + 2(3 + 2t) - 2(-2t) + 1 = 9t + 9 = 0$, nên $t = -1$ và $H(1; 1; 2)$.',
        '$d(A, (P)) = \\dfrac{|2 + 6 - 0 + 1|}{\\sqrt{1 + 4 + 4}} = \\dfrac{9}{3} = 3$; kiểm tra: $AH = \\sqrt{1 + 4 + 4} = 3$.',
      ],
      answer:
        '$\\Delta: \\begin{cases} x = 2 + t \\\\ y = 3 + 2t \\\\ z = -2t \\end{cases}$, $H(1; 1; 2)$, $d(A, (P)) = 3$.',
    },
    {
      problem:
        'Viết phương trình mặt cầu tâm $I(1; -2; 3)$ tiếp xúc với mặt phẳng $(P): 2x - y + 2z - 1 = 0$, rồi tính góc giữa $(P)$ và mặt phẳng $(Oxy)$.',
      steps: [
        '$R = d(I, (P)) = \\dfrac{|2 + 2 + 6 - 1|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$.',
        'Mặt cầu: $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9$.',
        '$(Oxy)$ có vectơ pháp tuyến $(0; 0; 1)$: $\\cos((P), (Oxy)) = \\dfrac{|2|}{3 \\cdot 1} = \\dfrac{2}{3}$, nên góc $\\approx 48{,}2^\\circ$.',
      ],
      answer: '$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9$; góc $\\approx 48{,}2^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Mặt phẳng đi qua $M(1; 2; 3)$ và song song với $(P): x - 2y + z + 5 = 0$ có phương trình là',
      options: [
        '$x - 2y + z = 0$',
        '$x - 2y + z + 5 = 0$',
        '$x + 2y + 3z = 0$',
        '$x - 2y + z - 6 = 0$',
      ],
      answer: 0,
      hints: [
        'Mặt phẳng song song với $(P)$ có dạng $x - 2y + z + D = 0$ với $D \\ne 5$; thay toạ độ của $M$ để tìm $D$.',
      ],
      solution: '$1 - 4 + 3 + D = 0$ nên $D = 0$: mặt phẳng $x - 2y + z = 0$ (và $0 \\ne 5$).',
    },
    {
      type: 'number',
      prompt:
        'Tính khoảng cách giữa hai mặt phẳng song song $(P): 2x - y + 2z + 1 = 0$ và $(Q): 2x - y + 2z - 8 = 0$.',
      answer: 3,
      hints: [
        'Lấy một điểm trên $(P)$, chẳng hạn $(0; 1; 0)$, rồi tính khoảng cách từ điểm đó đến $(Q)$.',
      ],
      solution:
        '$M(0; 1; 0) \\in (P)$ vì $0 - 1 + 0 + 1 = 0$. $d((P), (Q)) = d(M, (Q)) = \\dfrac{|0 - 1 + 0 - 8|}{3} = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng đi qua $A(1; -1; 2)$ và vuông góc với mặt phẳng $(P): 2x + y - 3z + 1 = 0$ có phương trình tham số là',
      options: [
        '$\\begin{cases} x = 1 + 2t \\\\ y = -1 + t \\\\ z = 2 - 3t \\end{cases}$',
        '$\\begin{cases} x = 2 + t \\\\ y = 1 - t \\\\ z = -3 + 2t \\end{cases}$',
        '$\\begin{cases} x = 1 + 2t \\\\ y = -1 + t \\\\ z = 2 + 3t \\end{cases}$',
        '$\\begin{cases} x = 1 - t \\\\ y = -1 + t \\\\ z = 2 \\end{cases}$',
      ],
      answer: 0,
      hints: [
        'Đường thẳng vuông góc với $(P)$ nhận vectơ pháp tuyến của $(P)$ làm vectơ chỉ phương.',
      ],
      solution:
        'Vectơ chỉ phương $\\vec{n} = (2; 1; -3)$, đi qua $A(1; -1; 2)$: $x = 1 + 2t$, $y = -1 + t$, $z = 2 - 3t$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm cao độ giao điểm của đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 - t \\\\ z = 3 + 2t \\end{cases}$ và mặt phẳng $(P): x + y + z - 10 = 0$.',
      answer: 7,
      hints: ['Thay $x$, $y$, $z$ theo $t$ vào phương trình của $(P)$.'],
      solution:
        '$(1 + t) + (2 - t) + (3 + 2t) - 10 = 2t - 4 = 0$, nên $t = 2$. Giao điểm $(3; 0; 7)$, cao độ bằng $7$.',
    },
    {
      type: 'choice',
      prompt:
        "Vị trí tương đối của $\\Delta: \\begin{cases} x = 1 + 2t \\\\ y = 3 - t \\\\ z = t \\end{cases}$ và $\\Delta': \\begin{cases} x = 3 + 4s \\\\ y = 3 - 2s \\\\ z = 1 + 2s \\end{cases}$ là",
      options: ['Song song', 'Trùng nhau', 'Cắt nhau', 'Chéo nhau'],
      answer: 0,
      hints: [
        "So sánh hai vectơ chỉ phương, rồi kiểm tra điểm $M'(3; 3; 1)$ có thuộc $\\Delta$ không.",
      ],
      solution:
        "$\\vec{u}' = (4; -2; 2) = 2(2; -1; 1) = 2\\vec{u}$: cùng phương. Với $M'(3; 3; 1)$: từ $1 + 2t = 3$ được $t = 1$, khi đó $y = 2 \\ne 3$, nên $M' \\notin \\Delta$. Hai đường thẳng song song.",
    },
    {
      type: 'number',
      prompt:
        'Tính góc (theo độ) giữa đường thẳng có vectơ chỉ phương $\\vec{u} = (0; 1; 1)$ và mặt phẳng $(P): x + y + 3 = 0$.',
      answer: 30,
      unit: '°',
      hints: [
        '$\\sin(\\Delta, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$ với $\\vec{n} = (1; 1; 0)$.',
      ],
      solution:
        '$\\sin(\\Delta, (P)) = \\dfrac{|0 + 1 + 0|}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$, nên góc bằng $30^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính bán kính của mặt cầu $x^2 + y^2 + z^2 - 4x + 2y - 6z + 5 = 0$.',
      answer: 3,
      hints: ['Tâm $I(2; -1; 3)$; $R = \\sqrt{a^2 + b^2 + c^2 - d}$.'],
      solution: '$R = \\sqrt{4 + 1 + 9 - 5} = \\sqrt{9} = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Mặt cầu tâm $I(2; 1; -1)$ đi qua gốc toạ độ $O$ có phương trình là',
      options: [
        '$(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 6$',
        '$(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = \\sqrt{6}$',
        '$(x + 2)^2 + (y + 1)^2 + (z - 1)^2 = 6$',
        '$(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 36$',
      ],
      answer: 0,
      hints: ['$R^2 = IO^2$; vế phải của phương trình là $R^2$.'],
      solution: '$R^2 = IO^2 = 4 + 1 + 1 = 6$: $(x - 2)^2 + (y - 1)^2 + (z + 1)^2 = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để điểm $M(m; 1; 2)$ thuộc mặt phẳng $(P): 2x - y + 3z - 9 = 0$.',
      answer: 2,
      hints: ['Thay toạ độ của $M$ vào phương trình của $(P)$.'],
      solution: '$2m - 1 + 6 - 9 = 0 \\iff 2m = 4 \\iff m = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Điểm $A(1; 2; 3)$ nằm ở đâu so với mặt cầu $x^2 + y^2 + z^2 = 16$?',
      options: ['Nằm trong mặt cầu', 'Nằm trên mặt cầu', 'Nằm ngoài mặt cầu'],
      answer: 0,
      hints: ['Tâm là $O$, $R^2 = 16$; so sánh $OA^2$ với $16$.'],
      solution: '$OA^2 = 1 + 4 + 9 = 14 < 16$, nên $A$ nằm trong mặt cầu.',
    },
    {
      type: 'number',
      prompt:
        'Một trạm phát sóng đặt trên đỉnh tháp tại $I(0; 0; 3)$ phủ sóng trong bán kính $5$ km (mặt đất là mặt phẳng $z = 0$, đơn vị km). Vùng phủ sóng trên mặt đất là hình tròn có bán kính bao nhiêu kilômét?',
      answer: 4,
      unit: 'km',
      hints: [
        'Mặt cầu cắt mặt đất theo một đường tròn. Tâm đường tròn là hình chiếu của $I$ trên mặt đất; dùng định lí Pythagore.',
      ],
      solution:
        'Khoảng cách từ $I$ đến mặt đất là $3$, nên bán kính hình tròn là $r = \\sqrt{5^2 - 3^2} = 4$ (km).',
    },
  ],
  takeaways: [
    'Mặt phẳng: một điểm và một vectơ pháp tuyến; đường thẳng: một điểm và một vectơ chỉ phương; mặt cầu: tâm và bán kính.',
    'Giao điểm đường thẳng với mặt phẳng: thay phương trình tham số vào phương trình mặt phẳng để tìm $t$.',
    'Khoảng cách từ điểm đến mặt phẳng và công thức góc giúp giải nhanh nhiều bài toán định vị trong thực tế.',
  ],
};
