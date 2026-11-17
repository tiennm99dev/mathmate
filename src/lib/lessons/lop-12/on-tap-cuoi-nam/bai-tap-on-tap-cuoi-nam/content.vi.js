/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 12: ứng dụng đạo hàm để khảo sát hàm số, nguyên hàm và tích phân; vectơ, phương trình mặt phẳng, đường thẳng, mặt cầu và góc trong không gian; các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm và xác suất có điều kiện, kèm đề ôn thích ứng có bản đồ chủ đề.',
  intro:
    'Năm lớp 12, em đã dùng đạo hàm để khảo sát và vẽ đồ thị hàm số, học nguyên hàm, tích phân và các ứng dụng hình học của tích phân; về hình học là vectơ, hệ trục toạ độ và phương pháp toạ độ trong không gian; cuối cùng là các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm, xác suất có điều kiện, công thức xác suất toàn phần và công thức Bayes. Bài ôn tập này hệ thống lại các kiến thức đó theo ba mạch: Giải tích, Hình học và đo lường, Thống kê và xác suất. Đề ôn thích ứng ở dưới có bản đồ chủ đề: chủ đề nào em còn làm sai, đề hỏi thêm chủ đề đó và cuối đề chỉ ra phần cần ôn lại.',
  objectives: [
    'Xét tính đơn điệu, tìm cực trị, giá trị lớn nhất, giá trị nhỏ nhất và các đường tiệm cận của đồ thị hàm số; giải bài toán thực tiễn bằng đạo hàm.',
    'Tìm nguyên hàm, tính tích phân bằng công thức Newton – Leibniz; tính diện tích hình phẳng và thể tích khối tròn xoay.',
    'Tính toạ độ của vectơ, độ dài, tích vô hướng và góc giữa hai vectơ trong không gian.',
    'Viết phương trình mặt phẳng, đường thẳng, mặt cầu; tính khoảng cách từ một điểm đến một mặt phẳng và góc trong không gian.',
    'Tính khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm.',
    'Tính xác suất có điều kiện, dùng công thức nhân xác suất, công thức xác suất toàn phần và công thức Bayes.',
  ],
  sections: [
    {
      heading: 'Giải tích',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Tính đơn điệu và cực trị',
              "Nếu $f'(x) \\ge 0$ với mọi $x \\in K$ và dấu bằng chỉ xảy ra tại hữu hạn điểm thì $f$ đồng biến trên $K$ (tương tự $f'(x) \\le 0$: nghịch biến). Nếu $f'$ đổi dấu từ $+$ sang $-$ khi $x$ qua $x_0$ thì $x_0$ là điểm cực đại; đổi dấu từ $-$ sang $+$ thì $x_0$ là điểm cực tiểu.",
            ],
            [
              'Giá trị lớn nhất, nhỏ nhất trên đoạn',
              "Tìm các điểm $x_1, x_2, \\dots$ thuộc $(a; b)$ mà tại đó $f'(x) = 0$ hoặc $f'(x)$ không tồn tại; tính $f(a)$, $f(b)$, $f(x_1)$, $f(x_2)$, …; số lớn nhất là $\\max\\limits_{[a; b]} f(x)$, số nhỏ nhất là $\\min\\limits_{[a; b]} f(x)$.",
            ],
            [
              'Đường tiệm cận',
              'Tiệm cận ngang $y = y_0$: $\\lim\\limits_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim\\limits_{x \\to -\\infty} f(x) = y_0$. Tiệm cận đứng $x = x_0$: một trong các giới hạn một bên của $f(x)$ tại $x_0$ bằng $+\\infty$ hoặc $-\\infty$. Tiệm cận xiên $y = ax + b$ ($a \\ne 0$): $\\lim\\limits_{x \\to +\\infty}[f(x) - (ax + b)] = 0$ hoặc $\\lim\\limits_{x \\to -\\infty}[f(x) - (ax + b)] = 0$.',
            ],
            [
              'Nguyên hàm',
              '$\\displaystyle\\int x^\\alpha \\,\\mathrm{d}x = \\dfrac{x^{\\alpha + 1}}{\\alpha + 1} + C$ ($\\alpha \\ne -1$), $\\displaystyle\\int \\dfrac{1}{x} \\,\\mathrm{d}x = \\ln|x| + C$, $\\displaystyle\\int e^x \\,\\mathrm{d}x = e^x + C$, $\\displaystyle\\int a^x \\,\\mathrm{d}x = \\dfrac{a^x}{\\ln a} + C$, $\\displaystyle\\int \\cos x \\,\\mathrm{d}x = \\sin x + C$, $\\displaystyle\\int \\sin x \\,\\mathrm{d}x = -\\cos x + C$.',
            ],
            [
              'Tích phân',
              'Công thức Newton – Leibniz: $\\displaystyle\\int_a^b f(x) \\,\\mathrm{d}x = F(b) - F(a)$, với $F$ là một nguyên hàm của $f$ trên $[a; b]$. Diện tích hình phẳng: $S = \\displaystyle\\int_a^b |f(x) - g(x)| \\,\\mathrm{d}x$. Thể tích khối tròn xoay khi quay hình phẳng giới hạn bởi $y = f(x)$, trục hoành, $x = a$, $x = b$ quanh $Ox$: $V = \\pi\\displaystyle\\int_a^b f^2(x) \\,\\mathrm{d}x$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Giá trị lớn nhất trên một đoạn phải so sánh cả giá trị tại hai đầu mút, không chỉ giá trị cực đại. Khi tính diện tích, nếu $f(x) - g(x)$ đổi dấu trên $[a; b]$ thì phải tách đoạn tại các nghiệm rồi lấy giá trị tuyệt đối từng phần.',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Vectơ trong không gian',
              "Với $\\vec{a} = (x; y; z)$, $\\vec{b} = (x'; y'; z')$: $\\vec{a} \\cdot \\vec{b} = xx' + yy' + zz'$, $|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$, $\\cos(\\vec{a}, \\vec{b}) = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}$. $\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$; trọng tâm tam giác có toạ độ bằng trung bình cộng toạ độ ba đỉnh.",
            ],
            [
              'Phương trình mặt phẳng',
              'Mặt phẳng đi qua $M(x_0; y_0; z_0)$ có vectơ pháp tuyến $\\vec{n} = (A; B; C)$: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$. Hai vectơ $\\vec{u}$, $\\vec{v}$ không cùng phương có giá song song hoặc nằm trong mặt phẳng thì $[\\vec{u}, \\vec{v}]$ là một vectơ pháp tuyến. $d(M, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.',
            ],
            [
              'Phương trình đường thẳng',
              'Đường thẳng đi qua $M(x_0; y_0; z_0)$ có vectơ chỉ phương $\\vec{u} = (a; b; c)$: phương trình tham số $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$; khi $abc \\ne 0$ có phương trình chính tắc $\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$.',
            ],
            [
              'Góc trong không gian',
              "$\\cos(\\Delta, \\Delta') = \\dfrac{|\\vec{u} \\cdot \\vec{u}'|}{|\\vec{u}| \\cdot |\\vec{u}'|}$, $\\sin(\\Delta, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$, $\\cos((P), (P')) = \\dfrac{|\\vec{n} \\cdot \\vec{n}'|}{|\\vec{n}| \\cdot |\\vec{n}'|}$.",
            ],
            [
              'Mặt cầu',
              'Mặt cầu tâm $I(a; b; c)$, bán kính $R$: $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$. Phương trình $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với $a^2 + b^2 + c^2 - d > 0$ là mặt cầu tâm $I(a; b; c)$, bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn vectơ cho đúng',
          text: 'Góc giữa hai mặt phẳng dùng hai vectơ pháp tuyến; góc giữa hai đường thẳng dùng hai vectơ chỉ phương; góc giữa đường thẳng và mặt phẳng dùng vectơ chỉ phương với vectơ pháp tuyến và cho $\\sin$, không phải $\\cos$.',
        },
      ],
    },
    {
      heading: 'Thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Khoảng biến thiên của mẫu số liệu ghép nhóm: $R = a_{k+1} - a_1$, với $a_1$ là đầu mút trái của nhóm đầu và $a_{k+1}$ là đầu mút phải của nhóm cuối.',
            'Khoảng tứ phân vị: $\\Delta_Q = Q_3 - Q_1$. Nếu nhóm $[a_p; a_{p+1})$ chứa $Q_1$, $m_p$ là tần số của nhóm đó và $C$ là tổng tần số các nhóm đứng trước thì $Q_1 = a_p + \\dfrac{\\frac{n}{4} - C}{m_p} \\cdot (a_{p+1} - a_p)$; $Q_3$ tính tương tự với $\\dfrac{3n}{4}$.',
            'Phương sai: $s^2 = \\dfrac{1}{n}\\left[m_1(x_1 - \\overline{x})^2 + \\dots + m_k(x_k - \\overline{x})^2\\right] = \\dfrac{1}{n}\\left(m_1x_1^2 + \\dots + m_kx_k^2\\right) - \\overline{x}^2$, với $x_i$ là giá trị đại diện của nhóm thứ $i$. Độ lệch chuẩn: $s = \\sqrt{s^2}$.',
            'Xác suất có điều kiện: $P(A \\mid B) = \\dfrac{P(AB)}{P(B)}$ với $P(B) > 0$. Công thức nhân xác suất: $P(AB) = P(B) \\cdot P(A \\mid B)$.',
            'Công thức xác suất toàn phần: $P(A) = P(B) \\cdot P(A \\mid B) + P(\\overline{B}) \\cdot P(A \\mid \\overline{B})$. Công thức Bayes: $P(B \\mid A) = \\dfrac{P(B) \\cdot P(A \\mid B)}{P(A)}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sơ đồ hình cây',
          text: 'Với bài toán xác suất toàn phần, vẽ sơ đồ hình cây: nhánh đầu là $B$ và $\\overline{B}$, nhánh sau là $A$ và $\\overline{A}$. $P(A)$ là tổng xác suất của các đường đi kết thúc ở $A$; công thức Bayes lấy xác suất của một đường đi chia cho tổng đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tổng hợp với bản đồ chủ đề',
    instruction:
      'Đề có $16$ câu. Tám câu đầu lấy mỗi chủ đề một câu theo thứ tự ngẫu nhiên; từ câu thứ chín, đề ưu tiên chủ đề em đã làm sai (dòng chữ phía trên câu hỏi ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $-2{,}5$) hoặc phân số dạng $13/6$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ chủ đề chấm theo lần làm đầu và cuối đề chỉ ra phần cần ôn lại.',
  },
  examples: [
    {
      problem: 'Tìm cực trị của hàm số $y = x^3 - 6x^2 + 9x - 1$.',
      steps: [
        "Tập xác định $\\mathbb{R}$. $y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$; $y' = 0 \\Leftrightarrow x = 1$ hoặc $x = 3$.",
        "$y' > 0$ trên $(-\\infty; 1)$ và $(3; +\\infty)$, $y' < 0$ trên $(1; 3)$.",
        'Hàm số đạt cực đại tại $x = 1$, $y_{\\text{CĐ}} = y(1) = 1 - 6 + 9 - 1 = 3$; đạt cực tiểu tại $x = 3$, $y_{\\text{CT}} = y(3) = 27 - 54 + 27 - 1 = -1$.',
      ],
      answer: '$y_{\\text{CĐ}} = 3$ tại $x = 1$; $y_{\\text{CT}} = -1$ tại $x = 3$.',
    },
    {
      problem: 'Tìm các đường tiệm cận của đồ thị hàm số $y = \\dfrac{x^2 + x + 1}{x - 1}$.',
      steps: [
        'Chia đa thức: $x^2 + x + 1 = (x - 1)(x + 2) + 3$, nên $y = x + 2 + \\dfrac{3}{x - 1}$.',
        '$\\lim\\limits_{x \\to 1^+} y = +\\infty$ nên $x = 1$ là tiệm cận đứng.',
        '$\\lim\\limits_{x \\to \\pm\\infty}[y - (x + 2)] = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{3}{x - 1} = 0$ nên $y = x + 2$ là tiệm cận xiên.',
      ],
      answer: 'Tiệm cận đứng $x = 1$, tiệm cận xiên $y = x + 2$.',
    },
    {
      problem:
        'Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2$ và đường thẳng $y = x + 2$.',
      steps: [
        'Hoành độ giao điểm: $x^2 = x + 2 \\Leftrightarrow x^2 - x - 2 = 0 \\Leftrightarrow x = -1$ hoặc $x = 2$.',
        'Trên $[-1; 2]$ thì $x + 2 \\ge x^2$, nên $S = \\displaystyle\\int_{-1}^{2} (x + 2 - x^2) \\,\\mathrm{d}x = \\left(\\dfrac{x^2}{2} + 2x - \\dfrac{x^3}{3}\\right)\\Big|_{-1}^{2}$.',
        '$S = \\dfrac{10}{3} - \\left(-\\dfrac{7}{6}\\right) = \\dfrac{27}{6} = \\dfrac{9}{2}$.',
      ],
      answer: '$S = \\dfrac{9}{2}$.',
    },
    {
      problem:
        'Trong không gian $Oxyz$, cho $A(1; 2; 0)$, $B(3; 3; 2)$, $C(3; 0; 1)$. Tính $\\cos\\widehat{BAC}$.',
      steps: [
        '$\\vec{AB} = (2; 1; 2)$, $\\vec{AC} = (2; -2; 1)$.',
        '$\\vec{AB} \\cdot \\vec{AC} = 4 - 2 + 2 = 4$; $|\\vec{AB}| = \\sqrt{4 + 1 + 4} = 3$, $|\\vec{AC}| = \\sqrt{4 + 4 + 1} = 3$.',
        '$\\cos\\widehat{BAC} = \\dfrac{4}{3 \\cdot 3} = \\dfrac{4}{9}$.',
      ],
      answer: '$\\cos\\widehat{BAC} = \\dfrac{4}{9}$.',
    },
    {
      problem: 'Viết phương trình mặt phẳng $(ABC)$ với $A(1; 2; -1)$, $B(2; 0; 1)$, $C(0; 1; 2)$.',
      steps: [
        '$\\vec{AB} = (1; -2; 2)$, $\\vec{AC} = (-1; -1; 3)$.',
        '$[\\vec{AB}, \\vec{AC}] = \\left((-2) \\cdot 3 - 2 \\cdot (-1);\\ 2 \\cdot (-1) - 1 \\cdot 3;\\ 1 \\cdot (-1) - (-2) \\cdot (-1)\\right) = (-4; -5; -3)$, nên chọn $\\vec{n} = (4; 5; 3)$.',
        '$(ABC)$: $4(x - 1) + 5(y - 2) + 3(z + 1) = 0$, tức là $4x + 5y + 3z - 11 = 0$. Thử lại: $B$ và $C$ đều thoả mãn.',
      ],
      answer: '$(ABC): 4x + 5y + 3z - 11 = 0$.',
    },
    {
      problem:
        'Viết phương trình mặt cầu tâm $I(1; -2; 3)$ tiếp xúc với mặt phẳng $(P): 2x - y + 2z + 1 = 0$.',
      steps: [
        'Mặt cầu tiếp xúc với $(P)$ nên bán kính bằng khoảng cách từ $I$ đến $(P)$.',
        '$R = d(I, (P)) = \\dfrac{|2 \\cdot 1 - (-2) + 2 \\cdot 3 + 1|}{\\sqrt{4 + 1 + 4}} = \\dfrac{11}{3}$.',
      ],
      answer: '$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = \\dfrac{121}{9}$.',
    },
    {
      problem:
        'Thời gian (phút) $50$ người đi từ nhà đến nơi làm việc được ghép thành các nhóm $[40; 50)$, $[50; 60)$, $[60; 70)$, $[70; 80)$, $[80; 90)$ với tần số lần lượt là $5$; $10$; $15$; $10$; $10$. Tính khoảng biến thiên, phương sai và độ lệch chuẩn.',
      steps: [
        '$R = 90 - 40 = 50$ (phút). Giá trị đại diện: $45$; $55$; $65$; $75$; $85$.',
        '$\\overline{x} = \\dfrac{5 \\cdot 45 + 10 \\cdot 55 + 15 \\cdot 65 + 10 \\cdot 75 + 10 \\cdot 85}{50} = \\dfrac{3\\,350}{50} = 67$.',
        '$s^2 = \\dfrac{5 \\cdot 45^2 + 10 \\cdot 55^2 + 15 \\cdot 65^2 + 10 \\cdot 75^2 + 10 \\cdot 85^2}{50} - 67^2 = \\dfrac{232\\,250}{50} - 4\\,489 = 4\\,645 - 4\\,489 = 156$.',
        '$s = \\sqrt{156} \\approx 12{,}49$ (phút).',
      ],
      answer: '$R = 50$ phút, $s^2 = 156$, $s \\approx 12{,}49$ phút.',
    },
    {
      problem:
        'Tỉ lệ người mắc một bệnh trong cộng đồng là $2\\%$. Một xét nghiệm cho kết quả dương tính với $95\\%$ người mắc bệnh và dương tính nhầm với $10\\%$ người không mắc bệnh. Một người có kết quả dương tính. Tính xác suất người đó mắc bệnh.',
      steps: [
        'Gọi $B$: "người đó mắc bệnh", $A$: "xét nghiệm dương tính". $P(B) = 0{,}02$, $P(\\overline{B}) = 0{,}98$, $P(A \\mid B) = 0{,}95$, $P(A \\mid \\overline{B}) = 0{,}1$.',
        'Công thức xác suất toàn phần: $P(A) = 0{,}02 \\cdot 0{,}95 + 0{,}98 \\cdot 0{,}1 = 0{,}019 + 0{,}098 = 0{,}117$.',
        'Công thức Bayes: $P(B \\mid A) = \\dfrac{0{,}019}{0{,}117} = \\dfrac{19}{117} \\approx 0{,}162$.',
      ],
      answer:
        '$P(B \\mid A) = \\dfrac{19}{117} \\approx 0{,}162$: dù dương tính, khả năng mắc bệnh chỉ khoảng $16\\%$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số $y = x^3 - 3x^2 + 2$ đạt cực tiểu tại',
      options: ['$x = 2$', '$x = 0$', '$x = -2$', '$x = 1$'],
      answer: 0,
      hints: [
        "Tính $y'$ và giải $y' = 0$.",
        "Điểm cực tiểu là điểm mà $y'$ đổi dấu từ $-$ sang $+$.",
      ],
      solution:
        "$y' = 3x^2 - 6x = 3x(x - 2)$, $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$. $y' < 0$ trên $(0; 2)$ và $y' > 0$ trên $(2; +\\infty)$, nên hàm số đạt cực tiểu tại $x = 2$ (còn $x = 0$ là điểm cực đại).",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = x^3 - 3x + 1$ trên đoạn $[0; 2]$.',
      answer: 3,
      hints: [
        "Giải $y' = 0$ trên khoảng $(0; 2)$.",
        'So sánh giá trị của hàm số tại nghiệm đó và tại hai đầu mút $0$, $2$.',
      ],
      solution:
        "$y' = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$; trên $(0; 2)$ chỉ có $x = 1$. $y(0) = 1$, $y(1) = -1$, $y(2) = 3$. Vậy $\\max\\limits_{[0; 2]} y = y(2) = 3$.",
    },
    {
      type: 'choice',
      prompt: 'Đồ thị hàm số $y = \\dfrac{2x - 1}{x + 1}$ có các đường tiệm cận là',
      options: [
        'Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2$',
        'Tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$',
        'Tiệm cận đứng $x = -1$, tiệm cận ngang $y = -1$',
        'Tiệm cận đứng $x = \\dfrac{1}{2}$, tiệm cận ngang $y = 2$',
      ],
      answer: 0,
      hints: [
        'Tiệm cận đứng ứng với nghiệm của mẫu số (tử số khác $0$ tại đó).',
        'Tiệm cận ngang: tính $\\lim\\limits_{x \\to \\pm\\infty} y$.',
      ],
      solution:
        '$\\lim\\limits_{x \\to -1^+} y = -\\infty$ nên $x = -1$ là tiệm cận đứng; $\\lim\\limits_{x \\to \\pm\\infty} \\dfrac{2x - 1}{x + 1} = 2$ nên $y = 2$ là tiệm cận ngang.',
    },
    {
      type: 'number',
      prompt:
        'Từ một tấm bìa hình vuông cạnh $12$ cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh $x$ cm rồi gập lại thành một chiếc hộp không nắp. Tìm $x$ để hộp có thể tích lớn nhất (theo cm).',
      answer: 2,
      unit: 'cm',
      hints: [
        'Đáy hộp là hình vuông cạnh $12 - 2x$, chiều cao $x$, với $0 < x < 6$.',
        "$V(x) = x(12 - 2x)^2$; giải $V'(x) = 0$ trên $(0; 6)$.",
      ],
      solution:
        "$V'(x) = (12 - 2x)^2 - 4x(12 - 2x) = (12 - 2x)(12 - 6x)$. Trên $(0; 6)$, $V'(x) = 0 \\Leftrightarrow x = 2$; $V'$ đổi dấu từ $+$ sang $-$ tại $x = 2$, nên $V$ lớn nhất khi $x = 2$ cm, khi đó $V = 2 \\cdot 8^2 = 128$ ($\\text{cm}^3$).",
    },
    {
      type: 'choice',
      prompt: 'Họ nguyên hàm của hàm số $f(x) = \\cos x + e^x$ là',
      options: [
        '$\\sin x + e^x + C$',
        '$-\\sin x + e^x + C$',
        '$\\sin x + xe^{x} + C$',
        '$-\\cos x + e^x + C$',
      ],
      answer: 0,
      hints: ['Tìm nguyên hàm của từng số hạng.', "$(\\sin x)' = \\cos x$ và $(e^x)' = e^x$."],
      solution:
        '$\\displaystyle\\int (\\cos x + e^x) \\,\\mathrm{d}x = \\displaystyle\\int \\cos x \\,\\mathrm{d}x + \\displaystyle\\int e^x \\,\\mathrm{d}x = \\sin x + e^x + C$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\displaystyle\\int_0^2 (3x^2 - 2x + 1) \\,\\mathrm{d}x$.',
      answer: 6,
      hints: [
        'Một nguyên hàm của $3x^2 - 2x + 1$ là $x^3 - x^2 + x$.',
        'Dùng công thức Newton – Leibniz.',
      ],
      solution:
        '$\\displaystyle\\int_0^2 (3x^2 - 2x + 1) \\,\\mathrm{d}x = (x^3 - x^2 + x)\\Big|_0^2 = (8 - 4 + 2) - 0 = 6$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2 - 2x$ và trục hoành (viết kết quả dưới dạng phân số tối giản).',
      answer: [4, 3],
      simplest: true,
      hints: [
        'Parabol cắt trục hoành tại $x = 0$ và $x = 2$.',
        'Trên $[0; 2]$ thì $x^2 - 2x \\le 0$, nên $S = \\displaystyle\\int_0^2 (2x - x^2) \\,\\mathrm{d}x$.',
      ],
      solution:
        '$S = \\displaystyle\\int_0^2 (2x - x^2) \\,\\mathrm{d}x = \\left(x^2 - \\dfrac{x^3}{3}\\right)\\Big|_0^2 = 4 - \\dfrac{8}{3} = \\dfrac{4}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Quay hình phẳng giới hạn bởi đồ thị $y = \\sqrt{x}$, trục hoành và đường thẳng $x = 4$ quanh trục $Ox$, ta được khối tròn xoay có thể tích $V = k\\pi$. Tìm $k$.',
      answer: 8,
      hints: ['$V = \\pi\\displaystyle\\int_a^b f^2(x) \\,\\mathrm{d}x$, ở đây $f^2(x) = x$.'],
      solution:
        '$V = \\pi\\displaystyle\\int_0^4 x \\,\\mathrm{d}x = \\pi \\cdot \\dfrac{x^2}{2}\\Big|_0^4 = 8\\pi$, nên $k = 8$.',
    },
    {
      type: 'number',
      prompt:
        'Trong không gian $Oxyz$, cho $A(1; 2; -1)$ và $B(3; -1; 5)$. Tính độ dài đoạn thẳng $AB$.',
      answer: 7,
      hints: ['$\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$.', '$AB = |\\vec{AB}|$.'],
      solution: '$\\vec{AB} = (2; -3; 6)$, $AB = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính góc giữa hai vectơ $\\vec{a} = (1; 1; 0)$ và $\\vec{b} = (1; 0; 1)$ (theo độ).',
      answer: 60,
      unit: '°',
      hints: [
        '$\\cos(\\vec{a}, \\vec{b}) = \\dfrac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}$.',
      ],
      solution:
        '$\\vec{a} \\cdot \\vec{b} = 1$, $|\\vec{a}| = |\\vec{b}| = \\sqrt{2}$, nên $\\cos(\\vec{a}, \\vec{b}) = \\dfrac{1}{2}$ và $(\\vec{a}, \\vec{b}) = 60^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Mặt phẳng đi qua $A(1; 0; -2)$ và vuông góc với đường thẳng có vectơ chỉ phương $\\vec{u} = (2; -1; 3)$ có phương trình là',
      options: [
        '$2x - y + 3z + 4 = 0$',
        '$2x - y + 3z - 8 = 0$',
        '$2x - y + 3z - 4 = 0$',
        '$x - 2z + 4 = 0$',
      ],
      answer: 0,
      hints: [
        'Mặt phẳng vuông góc với đường thẳng nhận vectơ chỉ phương của đường thẳng làm vectơ pháp tuyến.',
        'Dùng $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$ với $(x_0; y_0; z_0) = (1; 0; -2)$.',
      ],
      solution:
        '$\\vec{n} = (2; -1; 3)$: $2(x - 1) - (y - 0) + 3(z + 2) = 0 \\Leftrightarrow 2x - y + 3z + 4 = 0$. Phương án có $-8$ là do viết nhầm $z - 2$ thay cho $z + 2$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính khoảng cách từ điểm $M(1; 2; 3)$ đến mặt phẳng $(P): 2x - y + 2z + 4 = 0$ (viết dưới dạng phân số tối giản).',
      answer: [10, 3],
      simplest: true,
      hints: ['$d(M, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.'],
      solution:
        '$d(M, (P)) = \\dfrac{|2 \\cdot 1 - 2 + 2 \\cdot 3 + 4|}{\\sqrt{4 + 1 + 4}} = \\dfrac{10}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm bán kính của mặt cầu $x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0$.',
      answer: 4,
      hints: [
        'Mặt cầu $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ có tâm $I(a; b; c)$.',
        '$R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
      ],
      solution: 'Tâm $I(1; -2; 3)$, $d = -2$, nên $R = \\sqrt{1 + 4 + 9 - (-2)} = \\sqrt{16} = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Tính góc giữa đường thẳng $d: x = 1 + t,\\ y = 2,\\ z = 3 + t$ và mặt phẳng $(P): z - 2 = 0$ (theo độ).',
      answer: 45,
      unit: '°',
      hints: [
        '$d$ có vectơ chỉ phương $\\vec{u} = (1; 0; 1)$, $(P)$ có vectơ pháp tuyến $\\vec{n} = (0; 0; 1)$.',
        '$\\sin(d, (P)) = \\dfrac{|\\vec{u} \\cdot \\vec{n}|}{|\\vec{u}| \\cdot |\\vec{n}|}$.',
      ],
      solution:
        '$\\sin(d, (P)) = \\dfrac{1}{\\sqrt{2} \\cdot 1} = \\dfrac{\\sqrt{2}}{2}$, nên góc giữa $d$ và $(P)$ bằng $45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian (phút) $40$ học sinh hoàn thành một bài tập được ghép thành các nhóm $[0; 10)$, $[10; 20)$, $[20; 30)$, $[30; 40)$ với tần số lần lượt là $4$; $10$; $16$; $10$. Tính khoảng tứ phân vị $\\Delta_Q$.',
      answer: 14,
      hints: [
        'Tần số tích luỹ: $4$; $14$; $30$; $40$. $\\dfrac{n}{4} = 10$, $\\dfrac{3n}{4} = 30$.',
        '$Q_1$ thuộc nhóm $[10; 20)$, $Q_3$ thuộc nhóm $[20; 30)$.',
      ],
      solution:
        '$Q_1 = 10 + \\dfrac{10 - 4}{10} \\cdot 10 = 16$; $Q_3 = 20 + \\dfrac{30 - 14}{16} \\cdot 10 = 30$. $\\Delta_Q = 30 - 16 = 14$ (phút).',
    },
    {
      type: 'number',
      prompt: 'Tính phương sai của mẫu số liệu ghép nhóm ở bài trên.',
      answer: 86,
      hints: [
        'Giá trị đại diện: $5$; $15$; $25$; $35$; số trung bình $\\overline{x} = 23$.',
        '$s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\dots + m_kx_k^2\\right) - \\overline{x}^2$.',
      ],
      solution:
        '$\\dfrac{4 \\cdot 25 + 10 \\cdot 225 + 16 \\cdot 625 + 10 \\cdot 1\\,225}{40} = \\dfrac{24\\,600}{40} = 615$, nên $s^2 = 615 - 23^2 = 615 - 529 = 86$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai biến cố $A$ và $B$ với $P(B) = 0{,}5$ và $P(AB) = 0{,}2$. Tính $P(A \\mid B)$.',
      answer: 0.4,
      hints: ['$P(A \\mid B) = \\dfrac{P(AB)}{P(B)}$.'],
      solution: '$P(A \\mid B) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$.',
    },
    {
      type: 'number',
      prompt:
        'Một xưởng có hai máy: máy I làm ra $60\\%$ số sản phẩm với tỉ lệ phế phẩm $3\\%$, máy II làm ra $40\\%$ số sản phẩm với tỉ lệ phế phẩm $5\\%$. Lấy ngẫu nhiên một sản phẩm của xưởng. Tính xác suất sản phẩm đó là phế phẩm.',
      answer: 0.038,
      hints: [
        'Gọi $A$: "sản phẩm là phế phẩm", $B$: "sản phẩm do máy I làm ra".',
        '$P(A) = P(B) \\cdot P(A \\mid B) + P(\\overline{B}) \\cdot P(A \\mid \\overline{B})$.',
      ],
      solution: '$P(A) = 0{,}6 \\cdot 0{,}03 + 0{,}4 \\cdot 0{,}05 = 0{,}018 + 0{,}02 = 0{,}038$.',
    },
    {
      type: 'fraction',
      prompt:
        'Ở bài trên, biết sản phẩm lấy ra là phế phẩm. Tính xác suất sản phẩm đó do máy I làm ra (viết dưới dạng phân số tối giản).',
      answer: [9, 19],
      simplest: true,
      hints: ['Dùng công thức Bayes: $P(B \\mid A) = \\dfrac{P(B) \\cdot P(A \\mid B)}{P(A)}$.'],
      solution:
        '$P(B \\mid A) = \\dfrac{0{,}6 \\cdot 0{,}03}{0{,}038} = \\dfrac{0{,}018}{0{,}038} = \\dfrac{9}{19}$.',
    },
  ],
  takeaways: [
    "Cực trị: tìm nghiệm của $f'(x) = 0$ và xét dấu $f'$; giá trị lớn nhất, nhỏ nhất trên đoạn: so sánh giá trị tại các nghiệm đó và tại hai đầu mút.",
    'Tiệm cận ngang qua giới hạn tại vô cực, tiệm cận đứng qua giới hạn một bên bằng vô cực, tiệm cận xiên $y = ax + b$ khi $f(x) - (ax + b) \\to 0$.',
    'Tích phân: $\\displaystyle\\int_a^b f(x) \\,\\mathrm{d}x = F(b) - F(a)$; diện tích $\\displaystyle\\int_a^b |f(x) - g(x)| \\,\\mathrm{d}x$; thể tích khối tròn xoay $\\pi\\displaystyle\\int_a^b f^2(x) \\,\\mathrm{d}x$.',
    'Trong không gian $Oxyz$: tích vô hướng, độ dài và góc tính theo toạ độ; mặt phẳng cần một điểm và một vectơ pháp tuyến, đường thẳng cần một điểm và một vectơ chỉ phương.',
    'Mặt cầu tâm $I(a; b; c)$, bán kính $R$: $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$; khoảng cách từ điểm đến mặt phẳng: $\\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.',
    'Mẫu số liệu ghép nhóm: $R = a_{k+1} - a_1$, $\\Delta_Q = Q_3 - Q_1$, $s^2 = \\dfrac{1}{n}\\sum m_ix_i^2 - \\overline{x}^2$, $s = \\sqrt{s^2}$.',
    '$P(A \\mid B) = \\dfrac{P(AB)}{P(B)}$; xác suất toàn phần cộng các nhánh của sơ đồ hình cây; Bayes lấy một nhánh chia cho tổng.',
  ],
};
