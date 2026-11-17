/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 10: mệnh đề và tập hợp, bất phương trình bậc nhất hai ẩn, hàm số bậc hai, đại số tổ hợp, hệ thức lượng trong tam giác, vectơ, phương pháp toạ độ, các số đặc trưng của mẫu số liệu và xác suất cổ điển, kèm đề ôn thích ứng có bản đồ chủ đề.',
  intro:
    'Năm lớp 10, em đã học mệnh đề và tập hợp, bất phương trình và hệ bất phương trình bậc nhất hai ẩn, hàm số bậc hai và tam thức bậc hai, đại số tổ hợp; về hình học là hệ thức lượng trong tam giác, vectơ và phương pháp toạ độ trong mặt phẳng; cuối cùng là các số đặc trưng của mẫu số liệu và xác suất theo định nghĩa cổ điển. Bài ôn tập này hệ thống lại ba mạch kiến thức đó theo cách sách Kết nối tri thức chia bài tập ôn tập cuối năm: Đại số, Hình học và đo lường, Thống kê và xác suất. Đề ôn thích ứng ở dưới có bản đồ chủ đề: chủ đề nào em còn làm sai, đề hỏi thêm chủ đề đó và cuối đề chỉ ra phần cần ôn lại.',
  objectives: [
    'Xác định tính đúng sai, phủ định của mệnh đề; thực hiện các phép toán giao, hợp, hiệu, phần bù trên các khoảng, đoạn, nửa khoảng.',
    'Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn và tìm giá trị lớn nhất, nhỏ nhất của $F = ax + by$ trên miền đó.',
    'Khảo sát hàm số bậc hai, xét dấu tam thức bậc hai, giải bất phương trình bậc hai và phương trình quy về phương trình bậc hai.',
    'Vận dụng quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp và nhị thức Newton với $n \\le 5$.',
    'Dùng định lí côsin, định lí sin và các công thức diện tích để giải tam giác; tính toán với vectơ, toạ độ, tích vô hướng.',
    'Lập phương trình đường thẳng, đường tròn; tính khoảng cách, góc; nhận biết ba đường conic.',
    'Tính các số đặc trưng đo xu thế trung tâm và độ phân tán; tính xác suất bằng định nghĩa cổ điển và biến cố đối.',
  ],
  sections: [
    {
      heading: 'Đại số',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Mệnh đề',
              'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$"; phủ định của "$\\exists x \\in X, P(x)$" là "$\\forall x \\in X, \\overline{P(x)}$". Mệnh đề $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai.',
            ],
            [
              'Tập hợp',
              '$A \\cap B$ gồm các phần tử thuộc cả $A$ và $B$; $A \\cup B$ gồm các phần tử thuộc $A$ hoặc $B$; $A \\setminus B$ gồm các phần tử thuộc $A$ mà không thuộc $B$. Một tập có $n$ phần tử có $2^n$ tập con. Biểu diễn khoảng, đoạn trên trục số để tìm giao, hợp.',
            ],
            [
              'Bất phương trình bậc nhất hai ẩn',
              'Đường thẳng $ax + by = c$ chia mặt phẳng thành hai nửa mặt phẳng; thay toạ độ một điểm không nằm trên đường thẳng (thường là $O$) để chọn nửa mặt phẳng là miền nghiệm. Giá trị lớn nhất, nhỏ nhất của $F = ax + by$ trên miền đa giác đạt tại một đỉnh.',
            ],
            [
              'Hàm số bậc hai $y = ax^2 + bx + c$',
              'Đồ thị là parabol có đỉnh $I\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$, trục đối xứng $x = -\\dfrac{b}{2a}$. Với $a > 0$, hàm số nghịch biến trên $\\left(-\\infty; -\\dfrac{b}{2a}\\right)$, đồng biến trên $\\left(-\\dfrac{b}{2a}; +\\infty\\right)$ và có giá trị nhỏ nhất tại đỉnh; với $a < 0$ thì ngược lại.',
            ],
            [
              'Dấu của tam thức bậc hai',
              '$\\Delta < 0$: $f(x)$ cùng dấu với $a$ với mọi $x$. $\\Delta = 0$: $f(x)$ cùng dấu với $a$ với mọi $x \\ne -\\dfrac{b}{2a}$. $\\Delta > 0$: $f(x)$ trái dấu với $a$ trong khoảng hai nghiệm, cùng dấu với $a$ ngoài khoảng hai nghiệm.',
            ],
            [
              'Phương trình quy về bậc hai',
              '$\\sqrt{f(x)} = \\sqrt{g(x)}$: bình phương được $f(x) = g(x)$, giải rồi giữ nghiệm có $f(x) \\ge 0$ (hoặc $g(x) \\ge 0$). $\\sqrt{f(x)} = g(x)$: bình phương được $f(x) = [g(x)]^2$, giải rồi giữ nghiệm có $g(x) \\ge 0$.',
            ],
            [
              'Đại số tổ hợp',
              '$P_n = n!$, $A_n^k = \\dfrac{n!}{(n - k)!}$, $C_n^k = \\dfrac{n!}{k!(n - k)!}$. Chọn có thứ tự (có phân biệt vai trò) dùng chỉnh hợp, không có thứ tự dùng tổ hợp. $(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$; $(a + b)^5$ có các hệ số $1, 5, 10, 10, 5, 1$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Khi giải $\\sqrt{f(x)} = g(x)$, bình phương hai vế có thể sinh nghiệm ngoại lai: luôn thử lại điều kiện $g(x) \\ge 0$. Khi xét dấu tam thức, nhớ "trong trái, ngoài cùng": trong khoảng hai nghiệm, $f(x)$ trái dấu với $a$.',
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
              'Giá trị lượng giác của góc từ $0^\\circ$ đến $180^\\circ$',
              '$\\sin(180^\\circ - \\alpha) = \\sin\\alpha$, $\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$, $\\tan(180^\\circ - \\alpha) = -\\tan\\alpha$ ($\\alpha \\ne 90^\\circ$). Ví dụ $\\cos 120^\\circ = -\\dfrac{1}{2}$, $\\sin 150^\\circ = \\dfrac{1}{2}$.',
            ],
            [
              'Hệ thức lượng trong tam giác',
              'Định lí côsin: $a^2 = b^2 + c^2 - 2bc\\cos A$. Định lí sin: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$. Diện tích: $S = \\dfrac{1}{2}bc\\sin A = \\dfrac{abc}{4R} = pr = \\sqrt{p(p - a)(p - b)(p - c)}$ (công thức Heron, $p$ là nửa chu vi).',
            ],
            [
              'Vectơ',
              'Quy tắc ba điểm $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$, quy tắc hiệu $\\overrightarrow{OB} - \\overrightarrow{OA} = \\overrightarrow{AB}$, quy tắc hình bình hành. $M$ là trung điểm $AB$ khi $\\overrightarrow{MA} + \\overrightarrow{MB} = \\vec 0$; $G$ là trọng tâm tam giác $ABC$ khi $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$.',
            ],
            [
              'Toạ độ và tích vô hướng',
              "Với $\\vec a = (x; y)$, $\\vec b = (x'; y')$: $\\vec a \\cdot \\vec b = xx' + yy'$, $|\\vec a| = \\sqrt{x^2 + y^2}$, $\\cos(\\vec a, \\vec b) = \\dfrac{\\vec a \\cdot \\vec b}{|\\vec a| \\cdot |\\vec b|}$; $\\vec a \\perp \\vec b \\Leftrightarrow xx' + yy' = 0$.",
            ],
            [
              'Đường thẳng',
              'Đường thẳng qua $M(x_0; y_0)$ có vectơ pháp tuyến $\\vec n = (a; b)$: $a(x - x_0) + b(y - y_0) = 0$. Khoảng cách $d(M, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$. Góc giữa hai đường thẳng: $\\cos\\varphi = \\dfrac{|\\vec n_1 \\cdot \\vec n_2|}{|\\vec n_1| \\cdot |\\vec n_2|}$.',
            ],
            [
              'Đường tròn và ba đường conic',
              'Đường tròn tâm $I(a; b)$, bán kính $R$: $(x - a)^2 + (y - b)^2 = R^2$; phương trình $x^2 + y^2 - 2ax - 2by + c = 0$ với $a^2 + b^2 - c > 0$ có $R = \\sqrt{a^2 + b^2 - c}$. Elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ ($a > b > 0$, $c^2 = a^2 - b^2$); hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ ($c^2 = a^2 + b^2$); parabol $y^2 = 2px$ ($p > 0$).',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn công thức theo dữ kiện',
          text: 'Biết hai cạnh và góc xen giữa: định lí côsin để tìm cạnh thứ ba, $S = \\dfrac{1}{2}bc\\sin A$ để tìm diện tích. Biết một cạnh và hai góc: định lí sin. Biết ba cạnh: công thức Heron, rồi $R = \\dfrac{abc}{4S}$ và $r = \\dfrac{S}{p}$.',
        },
      ],
    },
    {
      heading: 'Thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Số gần đúng $a$ của số đúng $\\overline{a}$ có sai số tuyệt đối $\\Delta_a = |\\overline{a} - a|$; nếu $\\Delta_a \\le d$ thì $d$ là độ chính xác, viết $\\overline{a} = a \\pm d$. Sai số tương đối $\\delta_a = \\dfrac{\\Delta_a}{|a|}$.',
            'Số đặc trưng đo xu thế trung tâm: số trung bình $\\overline{x} = \\dfrac{x_1 + x_2 + \\dots + x_n}{n}$; trung vị (giá trị chính giữa của mẫu đã sắp xếp, hoặc trung bình cộng của hai giá trị chính giữa); tứ phân vị $Q_1, Q_2, Q_3$; mốt (giá trị có tần số lớn nhất).',
            'Số đặc trưng đo độ phân tán: khoảng biến thiên $R$; khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$; phương sai $s^2 = \\dfrac{1}{n}\\left[(x_1 - \\overline{x})^2 + \\dots + (x_n - \\overline{x})^2\\right]$ và độ lệch chuẩn $s = \\sqrt{s^2}$. Giá trị $x$ là bất thường khi $x > Q_3 + 1{,}5\\Delta_Q$ hoặc $x < Q_1 - 1{,}5\\Delta_Q$.',
            'Phép thử có không gian mẫu $\\Omega$ gồm các kết quả đồng khả năng thì $P(E) = \\dfrac{n(E)}{n(\\Omega)}$. Biến cố đối: $P(\\overline{E}) = 1 - P(E)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm cho đúng không gian mẫu',
          text: 'Lấy đồng thời $2$ quả từ $n$ quả thì $n(\\Omega) = C_n^2$ (không có thứ tự). Gieo hai con xúc xắc thì $n(\\Omega) = 36$ vì $(1; 2)$ khác $(2; 1)$. Biến cố có chữ "ít nhất một" thường dễ tính hơn qua biến cố đối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tổng hợp với bản đồ chủ đề',
    instruction:
      'Đề có $18$ câu. Chín câu đầu lấy mỗi chương một câu theo thứ tự ngẫu nhiên; từ câu thứ mười, đề ưu tiên chủ đề em đã làm sai (dòng chữ phía trên câu hỏi ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $8{,}125$) hoặc phân số dạng $16/65$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ chủ đề chấm theo lần làm đầu và cuối đề chỉ ra phần cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Cho $A = [-3; 5)$ và $B = (1; +\\infty)$. Tìm $A \\cap B$, $A \\cup B$ và $A \\setminus B$.',
      steps: [
        'Biểu diễn hai tập trên trục số: $A$ từ $-3$ (lấy) đến $5$ (không lấy), $B$ từ $1$ (không lấy) ra $+\\infty$.',
        'Phần chung: $A \\cap B = (1; 5)$.',
        'Phần gộp: $A \\cup B = [-3; +\\infty)$.',
        'Các số thuộc $A$ mà không thuộc $B$ là các số từ $-3$ đến $1$ (số $1$ không thuộc $B$ nên được lấy): $A \\setminus B = [-3; 1]$.',
      ],
      answer: '$A \\cap B = (1; 5)$, $A \\cup B = [-3; +\\infty)$, $A \\setminus B = [-3; 1]$.',
    },
    {
      problem: 'Giải phương trình $\\sqrt{2x^2 - 5x + 3} = x - 1$.',
      steps: [
        'Bình phương hai vế: $2x^2 - 5x + 3 = x^2 - 2x + 1$, tức là $x^2 - 3x + 2 = 0$.',
        'Phương trình này có hai nghiệm $x = 1$ và $x = 2$.',
        'Thử lại điều kiện $x - 1 \\ge 0$: cả $x = 1$ và $x = 2$ đều thoả mãn (thay vào: $\\sqrt{0} = 0$ và $\\sqrt{1} = 1$).',
      ],
      answer: 'Tập nghiệm $S = \\{1; 2\\}$.',
    },
    {
      problem: 'Khai triển $(2x - 1)^4$.',
      steps: [
        'Áp dụng $(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$ với $a = 2x$, $b = -1$.',
        '$(2x)^4 + 4(2x)^3(-1) + 6(2x)^2(-1)^2 + 4(2x)(-1)^3 + (-1)^4$.',
        '$= 16x^4 - 32x^3 + 24x^2 - 8x + 1$.',
      ],
      answer: '$(2x - 1)^4 = 16x^4 - 32x^3 + 24x^2 - 8x + 1$.',
    },
    {
      problem:
        'Tam giác $ABC$ có $AB = 5$, $AC = 8$, $\\widehat{A} = 60^\\circ$. Tính $BC$, diện tích $S$ và bán kính $R$ của đường tròn ngoại tiếp tam giác.',
      steps: [
        'Định lí côsin: $BC^2 = 5^2 + 8^2 - 2 \\cdot 5 \\cdot 8 \\cdot \\cos 60^\\circ = 25 + 64 - 40 = 49$, nên $BC = 7$.',
        '$S = \\dfrac{1}{2} \\cdot AB \\cdot AC \\cdot \\sin A = \\dfrac{1}{2} \\cdot 5 \\cdot 8 \\cdot \\dfrac{\\sqrt{3}}{2} = 10\\sqrt{3}$.',
        'Định lí sin: $2R = \\dfrac{BC}{\\sin A} = \\dfrac{7}{\\frac{\\sqrt{3}}{2}} = \\dfrac{14}{\\sqrt{3}}$, nên $R = \\dfrac{7}{\\sqrt{3}} = \\dfrac{7\\sqrt{3}}{3}$.',
      ],
      answer: '$BC = 7$, $S = 10\\sqrt{3}$, $R = \\dfrac{7\\sqrt{3}}{3}$.',
    },
    {
      problem:
        'Trong mặt phẳng toạ độ $Oxy$, cho $A(1; 2)$ và $B(3; -2)$. Viết phương trình tổng quát của đường thẳng $AB$ và phương trình đường tròn tâm $O$ tiếp xúc với $AB$.',
      steps: [
        '$\\overrightarrow{AB} = (2; -4)$ là một vectơ chỉ phương, nên $\\vec n = (2; 1)$ là một vectơ pháp tuyến của $AB$.',
        'Đường thẳng qua $A(1; 2)$: $2(x - 1) + (y - 2) = 0$, tức là $2x + y - 4 = 0$. Thử lại với $B$: $2 \\cdot 3 + (-2) - 4 = 0$.',
        'Bán kính bằng khoảng cách từ $O$ đến $AB$: $R = \\dfrac{|2 \\cdot 0 + 0 - 4|}{\\sqrt{2^2 + 1^2}} = \\dfrac{4}{\\sqrt{5}}$, nên $R^2 = \\dfrac{16}{5}$.',
      ],
      answer: '$AB: 2x + y - 4 = 0$; đường tròn $x^2 + y^2 = \\dfrac{16}{5}$.',
    },
    {
      problem:
        'Cho mẫu số liệu: $1; 3; 4; 4; 6; 7; 10$. Tìm số trung bình, trung vị, khoảng tứ phân vị và phương sai (làm tròn đến hàng phần trăm). Mẫu có giá trị bất thường không?',
      steps: [
        '$\\overline{x} = \\dfrac{1 + 3 + 4 + 4 + 6 + 7 + 10}{7} = \\dfrac{35}{7} = 5$. Mẫu đã sắp xếp, có $7$ giá trị nên trung vị $Q_2 = 4$ (giá trị thứ tư).',
        'Nửa dưới $1; 3; 4$ cho $Q_1 = 3$; nửa trên $6; 7; 10$ cho $Q_3 = 7$; $\\Delta_Q = 7 - 3 = 4$.',
        'Bình phương các độ lệch: $16; 4; 1; 1; 1; 4; 25$, tổng bằng $52$, nên $s^2 = \\dfrac{52}{7} \\approx 7{,}43$.',
        '$Q_3 + 1{,}5\\Delta_Q = 13$ và $Q_1 - 1{,}5\\Delta_Q = -3$; mọi giá trị đều nằm giữa hai số này.',
      ],
      answer:
        '$\\overline{x} = 5$, trung vị $4$, $\\Delta_Q = 4$, $s^2 \\approx 7{,}43$; mẫu không có giá trị bất thường.',
    },
    {
      problem:
        'Một nhóm có $5$ bạn nam và $4$ bạn nữ. Chọn ngẫu nhiên $3$ bạn. Tính xác suất để trong ba bạn được chọn có ít nhất một bạn nữ.',
      steps: [
        '$n(\\Omega) = C_9^3 = 84$.',
        'Biến cố đối "cả ba bạn đều là nam" có $C_5^3 = 10$ kết quả.',
        '$P = 1 - \\dfrac{10}{84} = \\dfrac{74}{84} = \\dfrac{37}{42}$.',
      ],
      answer: '$P = \\dfrac{37}{42}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Mệnh đề phủ định của mệnh đề "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$" là',
      options: [
        '$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$',
        '$\\forall x \\in \\mathbb{R}, x^2 + 1 \\le 0$',
        '$\\exists x \\in \\mathbb{R}, x^2 + 1 > 0$',
        '$\\exists x \\in \\mathbb{R}, x^2 + 1 < 0$',
      ],
      answer: 0,
      hints: [
        'Phủ định của "với mọi" là "tồn tại".',
        'Phủ định của "$> 0$" là "$\\le 0$", không phải "$< 0$".',
      ],
      solution:
        'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$". Ở đây $\\overline{P(x)}$ là "$x^2 + 1 \\le 0$", nên mệnh đề phủ định là "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$".',
    },
    {
      type: 'number',
      prompt: 'Cho $A = [-2; 4)$ và $B = (1; 7]$. Tập $A \\cap B$ có bao nhiêu số nguyên?',
      answer: 2,
      hints: [
        'Biểu diễn hai tập trên trục số và tìm phần chung.',
        'Đầu mút có ngoặc tròn thì không thuộc tập hợp.',
      ],
      solution: '$A \\cap B = (1; 4)$. Các số nguyên thuộc $(1; 4)$ là $2$ và $3$, có $2$ số.',
    },
    {
      type: 'choice',
      prompt: 'Cặp số nào sau đây là một nghiệm của bất phương trình $2x - 3y + 1 > 0$?',
      options: ['$(2; 1)$', '$(1; 1)$', '$(0; 1)$', '$(-1; 0)$'],
      answer: 0,
      hints: ['Thay từng cặp $(x; y)$ vào vế trái và so sánh với $0$.'],
      solution:
        '$(2; 1)$: $4 - 3 + 1 = 2 > 0$, đúng. $(1; 1)$: $2 - 3 + 1 = 0$, không lớn hơn $0$. $(0; 1)$: $-3 + 1 = -2$. $(-1; 0)$: $-2 + 1 = -1$. Chỉ $(2; 1)$ là nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị lớn nhất của $F(x; y) = x + 2y$ trên miền nghiệm của hệ $\\begin{cases} x \\ge 0, \\ y \\ge 0 \\\\ x + y \\le 4 \\\\ y \\le 3 \\end{cases}$.',
      answer: 7,
      hints: [
        'Miền nghiệm là một tứ giác; giá trị lớn nhất của $F$ đạt tại một đỉnh.',
        'Các đỉnh là $O(0; 0)$, $(4; 0)$, giao của $y = 3$ với $x + y = 4$, và $(0; 3)$.',
      ],
      solution:
        'Các đỉnh: $O(0; 0)$, $(4; 0)$, $(1; 3)$, $(0; 3)$. $F$ tại các đỉnh lần lượt là $0$, $4$, $7$, $6$. Giá trị lớn nhất là $7$, đạt tại $(1; 3)$.',
    },
    {
      type: 'number',
      prompt: 'Bất phương trình $x^2 - x - 6 \\le 0$ có bao nhiêu nghiệm nguyên?',
      answer: 6,
      hints: [
        'Tìm hai nghiệm của tam thức $x^2 - x - 6$.',
        'Hệ số $a = 1 > 0$, nên tam thức nhận giá trị không dương trên đoạn giữa hai nghiệm.',
      ],
      solution:
        '$x^2 - x - 6 = 0$ có hai nghiệm $x = -2$ và $x = 3$. Vì $a > 0$ nên tập nghiệm là $[-2; 3]$, gồm các số nguyên $-2, -1, 0, 1, 2, 3$: có $6$ nghiệm nguyên.',
    },
    {
      type: 'number',
      prompt: 'Tìm tung độ đỉnh của parabol $y = 2x^2 - 8x + 5$.',
      answer: -3,
      hints: ['Hoành độ đỉnh là $x = -\\dfrac{b}{2a}$.', 'Thay hoành độ đỉnh vào hàm số.'],
      solution:
        'Hoành độ đỉnh: $x = -\\dfrac{-8}{2 \\cdot 2} = 2$. Tung độ đỉnh: $y = 2 \\cdot 4 - 8 \\cdot 2 + 5 = -3$. Đỉnh $I(2; -3)$.',
    },
    {
      type: 'number',
      prompt:
        'Có bao nhiêu số tự nhiên có ba chữ số khác nhau được lập từ các chữ số $0, 1, 2, 3, 4, 5$?',
      answer: 100,
      hints: [
        'Chữ số hàng trăm phải khác $0$.',
        'Chọn lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị rồi dùng quy tắc nhân.',
      ],
      solution:
        'Hàng trăm có $5$ cách (khác $0$), hàng chục có $5$ cách (khác chữ số hàng trăm), hàng đơn vị có $4$ cách. Theo quy tắc nhân: $5 \\cdot 5 \\cdot 4 = 100$ số.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^2$ trong khai triển $(x + 2)^5$.',
      answer: 80,
      hints: [
        'Số hạng tổng quát của $(x + 2)^5$ là $C_5^k x^k 2^{5 - k}$.',
        'Số hạng chứa $x^2$ ứng với $k = 2$.',
      ],
      solution:
        'Số hạng chứa $x^2$ là $C_5^2 x^2 \\cdot 2^3 = 10 \\cdot 8 x^2 = 80x^2$. Hệ số cần tìm là $80$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của $\\cos 135^\\circ$ là',
      options: [
        '$-\\dfrac{\\sqrt{2}}{2}$',
        '$\\dfrac{\\sqrt{2}}{2}$',
        '$-\\dfrac{1}{2}$',
        '$-\\dfrac{\\sqrt{3}}{2}$',
      ],
      answer: 0,
      hints: [
        '$\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$.',
        '$135^\\circ = 180^\\circ - 45^\\circ$.',
      ],
      solution:
        '$\\cos 135^\\circ = \\cos(180^\\circ - 45^\\circ) = -\\cos 45^\\circ = -\\dfrac{\\sqrt{2}}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác có ba cạnh $13$, $14$, $15$. Tính bán kính $R$ của đường tròn ngoại tiếp tam giác.',
      answer: 8.125,
      hints: [
        'Tính diện tích bằng công thức Heron với nửa chu vi $p = 21$.',
        'Dùng $S = \\dfrac{abc}{4R}$.',
      ],
      solution:
        '$S = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7\\,056} = 84$. $R = \\dfrac{abc}{4S} = \\dfrac{13 \\cdot 14 \\cdot 15}{4 \\cdot 84} = \\dfrac{2\\,730}{336} = \\dfrac{65}{8} = 8{,}125$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\vec a = (m; 2)$ và $\\vec b = (3; -6)$. Tìm $m$ để $\\vec a \\perp \\vec b$.',
      answer: 4,
      hints: [
        '$\\vec a \\perp \\vec b \\Leftrightarrow \\vec a \\cdot \\vec b = 0$.',
        "$\\vec a \\cdot \\vec b = xx' + yy'$.",
      ],
      solution: '$\\vec a \\cdot \\vec b = 3m + 2 \\cdot (-6) = 3m - 12 = 0$, nên $m = 4$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính khoảng cách từ điểm $M(2; -1)$ đến đường thẳng $\\Delta: 3x - 4y + 2 = 0$ (phân số tối giản).',
      answer: [12, 5],
      simplest: true,
      hints: [
        '$d(M, \\Delta) = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.',
        '$\\sqrt{3^2 + (-4)^2} = 5$.',
      ],
      solution:
        '$d(M, \\Delta) = \\dfrac{|3 \\cdot 2 - 4 \\cdot (-1) + 2|}{\\sqrt{3^2 + (-4)^2}} = \\dfrac{12}{5}$.',
    },
    {
      type: 'number',
      prompt: 'Tính bán kính của đường tròn $x^2 + y^2 - 4x + 6y - 3 = 0$.',
      answer: 4,
      hints: [
        'Đưa về dạng $x^2 + y^2 - 2ax - 2by + c = 0$ để đọc $a$, $b$, $c$.',
        '$R = \\sqrt{a^2 + b^2 - c}$.',
      ],
      solution: '$a = 2$, $b = -3$, $c = -3$. $R = \\sqrt{4 + 9 + 3} = \\sqrt{16} = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Tiêu cự của elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ là',
      options: ['$8$', '$4$', '$10$', '$6$'],
      answer: 0,
      hints: ['Với elip, $c^2 = a^2 - b^2$.', 'Tiêu cự bằng $2c$.'],
      solution: '$a^2 = 25$, $b^2 = 9$, nên $c^2 = 16$, $c = 4$. Tiêu cự $2c = 8$.',
    },
    {
      type: 'number',
      prompt: 'Quy tròn số $2{,}3487$ đến hàng phần trăm.',
      answer: 2.35,
      hints: ['Nhìn chữ số hàng phần nghìn để quyết định làm tròn lên hay xuống.'],
      solution:
        'Chữ số hàng phần nghìn là $8 \\ge 5$, nên tăng chữ số hàng phần trăm thêm $1$: $2{,}3487 \\approx 2{,}35$.',
    },
    {
      type: 'number',
      prompt: 'Tính phương sai của mẫu số liệu $2; 4; 6; 8; 10$.',
      answer: 8,
      hints: ['Tính số trung bình trước.', '$s^2$ là trung bình cộng của bình phương các độ lệch.'],
      solution:
        '$\\overline{x} = \\dfrac{30}{5} = 6$. Bình phương các độ lệch: $16; 4; 0; 4; 16$, tổng bằng $40$. $s^2 = \\dfrac{40}{5} = 8$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $4$ viên bi đỏ và $3$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên. Tính xác suất để hai viên bi cùng màu (phân số tối giản).',
      answer: [3, 7],
      simplest: true,
      hints: [
        '$n(\\Omega) = C_7^2$.',
        'Cùng màu là hai viên đều đỏ hoặc hai viên đều xanh: dùng quy tắc cộng.',
      ],
      solution:
        '$n(\\Omega) = C_7^2 = 21$. Số kết quả thuận lợi: $C_4^2 + C_3^2 = 6 + 3 = 9$. $P = \\dfrac{9}{21} = \\dfrac{3}{7}$.',
    },
  ],
  takeaways: [
    'Phủ định "với mọi" thành "tồn tại" và ngược lại; tìm giao, hợp, hiệu của các khoảng bằng cách vẽ trên trục số.',
    'Giá trị lớn nhất, nhỏ nhất của $F = ax + by$ trên miền nghiệm đa giác đạt tại một đỉnh.',
    'Parabol $y = ax^2 + bx + c$ có đỉnh tại $x = -\\dfrac{b}{2a}$; tam thức bậc hai "trong trái, ngoài cùng" dấu với $a$; giải $\\sqrt{f(x)} = g(x)$ xong phải thử lại.',
    'Có thứ tự dùng chỉnh hợp $A_n^k$, không thứ tự dùng tổ hợp $C_n^k$; khai triển $(a + b)^n$ có hệ số $C_n^k$.',
    'Định lí côsin, định lí sin và $S = \\dfrac{1}{2}bc\\sin A = \\dfrac{abc}{4R} = pr$ giải hầu hết các bài tam giác.',
    "$\\vec a \\cdot \\vec b = xx' + yy'$; khoảng cách $\\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$; đường tròn $R = \\sqrt{a^2 + b^2 - c}$.",
    'Phương sai $s^2$ là trung bình cộng của bình phương độ lệch; xác suất cổ điển $P(E) = \\dfrac{n(E)}{n(\\Omega)}$, "ít nhất một" thì dùng biến cố đối.',
  ],
};
