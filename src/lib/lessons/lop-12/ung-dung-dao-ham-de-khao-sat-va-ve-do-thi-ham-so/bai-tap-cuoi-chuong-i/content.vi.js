/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương I: tính đơn điệu và cực trị, giá trị lớn nhất và nhỏ nhất, đường tiệm cận, khảo sát và vẽ đồ thị hàm số, bài toán thực tiễn; kèm trò ghép đồ thị với công thức và bảng biến thiên, và bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương I dùng đạo hàm để đọc hiểu một hàm số: nó tăng hay giảm ở đâu, đạt cực trị ở đâu, lớn nhất và nhỏ nhất bằng bao nhiêu, đồ thị tiến tới những đường nào ở xa. Ghép các thông tin ấy lại, ta khảo sát và vẽ được đồ thị, rồi giải các bài toán tối ưu trong thực tế. Bài ôn tập này hệ thống lại kiến thức, cho em luyện đọc đồ thị bằng cách ghép đồ thị với công thức và bảng biến thiên, và một bộ đề tự sinh chỉ ra phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các định lí và quy tắc của chương: dấu đạo hàm và tính đơn điệu, cực trị, giá trị lớn nhất và nhỏ nhất, tiệm cận.',
    'Khảo sát và vẽ đồ thị hàm số bậc ba, $y = \\dfrac{ax + b}{cx + d}$ và $y = \\dfrac{ax^2 + bx + c}{mx + n}$; đọc tính chất của hàm số từ đồ thị và bảng biến thiên.',
    'Vận dụng đạo hàm để giải các bài toán thực tiễn: vận tốc, chi phí trung bình, tối ưu diện tích và thể tích.',
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
              'Tính đơn điệu',
              "$f'(x) > 0$ trên $K$ thì $f$ đồng biến trên $K$; $f'(x) < 0$ trên $K$ thì $f$ nghịch biến trên $K$ (vẫn đúng khi $f'(x) = 0$ tại hữu hạn điểm)",
            ],
            [
              'Cực trị',
              "$f'$ đổi dấu từ dương sang âm khi qua $x_0$: $x_0$ là điểm cực đại; từ âm sang dương: $x_0$ là điểm cực tiểu",
            ],
            [
              'Giá trị lớn nhất, nhỏ nhất trên $[a; b]$',
              "Tìm các điểm $x_i \\in (a; b)$ mà $f'(x_i) = 0$ hoặc không tồn tại; so sánh $f(a)$, $f(x_i)$, $f(b)$",
            ],
            [
              'Tiệm cận ngang',
              '$y = y_0$ nếu $\\lim\\limits_{x \\to +\\infty} f(x) = y_0$ hoặc $\\lim\\limits_{x \\to -\\infty} f(x) = y_0$',
            ],
            [
              'Tiệm cận đứng',
              '$x = x_0$ nếu ít nhất một trong các giới hạn một bên của $f(x)$ khi $x \\to x_0^-$, $x \\to x_0^+$ là $+\\infty$ hoặc $-\\infty$',
            ],
            [
              'Tiệm cận xiên',
              '$y = ax + b$ ($a \\ne 0$) nếu $\\lim\\limits_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$; $a = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{f(x)}{x}$, $b = \\lim\\limits_{x \\to \\pm\\infty} [f(x) - ax]$',
            ],
            [
              'Sơ đồ khảo sát',
              "Tập xác định; $y'$ và dấu của $y'$; cực trị, giới hạn, tiệm cận; bảng biến thiên; vẽ đồ thị",
            ],
          ],
        },
        {
          type: 'table',
          caption: 'Đặc điểm đồ thị của ba dạng hàm số trong chương',
          head: ['Hàm số', 'Tiệm cận', 'Tâm đối xứng'],
          rows: [
            ['$y = ax^3 + bx^2 + cx + d$', 'Không có', 'Điểm có hoành độ $x_0 = -\\dfrac{b}{3a}$'],
            [
              '$y = \\dfrac{ax + b}{cx + d}$',
              'Đứng $x = -\\dfrac{d}{c}$, ngang $y = \\dfrac{a}{c}$',
              'Giao điểm hai tiệm cận',
            ],
            [
              '$y = \\dfrac{ax^2 + bx + c}{mx + n}$',
              'Đứng $x = -\\dfrac{n}{m}$ và một tiệm cận xiên',
              'Giao điểm hai tiệm cận',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: "Kết luận $x_0$ là điểm cực trị chỉ vì $f'(x_0) = 0$ mà không xét dấu (ví dụ $y = x^3$ tại $x = 0$); viết hàm số đồng biến trên $(-\\infty; 1) \\cup (1; +\\infty)$ thay vì trên từng khoảng; quên so sánh giá trị ở hai đầu mút khi tìm giá trị lớn nhất, nhỏ nhất trên đoạn; nhầm điểm cực trị $x_0$ với giá trị cực trị $f(x_0)$.",
        },
      ],
    },
    {
      heading: 'Bộ đề tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt gồm các câu hỏi mới về cực trị, giá trị lớn nhất và nhỏ nhất, tiệm cận, khảo sát hàm số và bài toán thực tiễn. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Ghép đồ thị với công thức và bảng biến thiên',
    instruction:
      'Mỗi bộ có ba đồ thị, ba công thức và ba bảng biến thiên. Với mỗi đồ thị, chọn công thức (A, B, C) và bảng biến thiên (I, II, III) của nó rồi bấm “Kiểm tra”. Hãy nhìn vào nhánh bên phải, các điểm cực trị và các đường tiệm cận; đồ thị nào còn sai sẽ có gợi ý.',
  },
  examples: [
    {
      problem: 'Tìm các khoảng đơn điệu và cực trị của hàm số $y = x^3 - 3x^2 - 9x + 1$.',
      steps: [
        "Tập xác định $\\mathbb{R}$. $y' = 3x^2 - 6x - 9 = 3(x + 1)(x - 3)$; $y' = 0 \\iff x = -1$ hoặc $x = 3$.",
        "$y' > 0$ trên $(-\\infty; -1)$ và $(3; +\\infty)$, $y' < 0$ trên $(-1; 3)$.",
        'Hàm số đồng biến trên mỗi khoảng $(-\\infty; -1)$ và $(3; +\\infty)$, nghịch biến trên khoảng $(-1; 3)$.',
        'Cực đại tại $x = -1$: $y_{\\text{CĐ}} = -1 - 3 + 9 + 1 = 6$. Cực tiểu tại $x = 3$: $y_{\\text{CT}} = 27 - 27 - 27 + 1 = -26$.',
      ],
      answer:
        'Đồng biến trên $(-\\infty; -1)$ và $(3; +\\infty)$, nghịch biến trên $(-1; 3)$; $y_{\\text{CĐ}} = 6$ tại $x = -1$, $y_{\\text{CT}} = -26$ tại $x = 3$.',
    },
    {
      problem:
        'Cho hàm số $y = \\dfrac{2x + 1}{x - 1}$. Tìm các khoảng đơn điệu, các đường tiệm cận và tâm đối xứng của đồ thị.',
      steps: [
        "Tập xác định $D = \\mathbb{R} \\setminus \\{1\\}$. $y' = \\dfrac{2 \\cdot (-1) - 1 \\cdot 1}{(x - 1)^2} = \\dfrac{-3}{(x - 1)^2} < 0$ với mọi $x \\in D$.",
        'Hàm số nghịch biến trên mỗi khoảng $(-\\infty; 1)$ và $(1; +\\infty)$, không có cực trị.',
        '$\\lim\\limits_{x \\to \\pm\\infty} y = 2$ nên $y = 2$ là tiệm cận ngang; $\\lim\\limits_{x \\to 1^-} y = -\\infty$, $\\lim\\limits_{x \\to 1^+} y = +\\infty$ nên $x = 1$ là tiệm cận đứng.',
        'Tâm đối xứng là giao điểm của hai tiệm cận: $I(1; 2)$.',
      ],
      answer:
        'Nghịch biến trên $(-\\infty; 1)$ và $(1; +\\infty)$; tiệm cận đứng $x = 1$, tiệm cận ngang $y = 2$; tâm đối xứng $I(1; 2)$.',
    },
    {
      problem:
        'Bác An dùng $120$ m lưới để rào một mảnh vườn hình chữ nhật sát bờ sông; phía bờ sông không cần rào. Tìm kích thước của mảnh vườn để diện tích lớn nhất.',
      steps: [
        'Gọi $x$ (m) là độ dài mỗi cạnh vuông góc với bờ sông; cạnh song song với bờ sông dài $120 - 2x$ (m), với $0 < x < 60$.',
        "Diện tích $S(x) = x(120 - 2x) = 120x - 2x^2$; $S'(x) = 120 - 4x = 0 \\iff x = 30$.",
        "$S'(x) > 0$ trên $(0; 30)$ và $S'(x) < 0$ trên $(30; 60)$, nên $S$ lớn nhất tại $x = 30$: $S(30) = 30 \\cdot 60 = 1\\,800$ (m²).",
      ],
      answer:
        'Mảnh vườn có cạnh vuông góc với bờ sông $30$ m, cạnh dọc bờ sông $60$ m; diện tích lớn nhất là $1\\,800$ m².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số $y = x^3 - 6x^2 + 9x - 1$ nghịch biến trên khoảng nào?',
      options: ['$(1; 3)$', '$(-\\infty; 1)$', '$(3; +\\infty)$', '$(-3; -1)$'],
      answer: 0,
      hints: ["Tính $y'$ và giải $y' = 0$.", "Hàm số nghịch biến trên khoảng mà $y' < 0$."],
      solution:
        "$y' = 3x^2 - 12x + 9 = 3(x - 1)(x - 3)$, âm khi $1 < x < 3$. Vậy hàm số nghịch biến trên khoảng $(1; 3)$.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị cực đại $y_{\\text{CĐ}}$ của hàm số $y = -x^3 + 3x^2 + 9x - 2$.',
      answer: 25,
      hints: [
        "$y' = -3x^2 + 6x + 9$; giải $y' = 0$.",
        "Hệ số $a < 0$: $y'$ dương giữa hai nghiệm, nên điểm cực đại là nghiệm lớn hơn.",
      ],
      solution:
        "$y' = -3(x + 1)(x - 3)$, đổi dấu từ dương sang âm tại $x = 3$. Do đó $y_{\\text{CĐ}} = y(3) = -27 + 27 + 27 - 2 = 25$.",
    },
    {
      type: 'number',
      prompt:
        "Hàm số $y = f(x)$ có đạo hàm $f'(x) = x(x - 1)^2(x + 2)$ với mọi $x \\in \\mathbb{R}$. Hàm số có bao nhiêu điểm cực trị?",
      answer: 2,
      hints: [
        "$f'(x) = 0$ tại $x = -2$, $x = 0$ và $x = 1$.",
        "Chỉ những điểm mà $f'$ đổi dấu mới là điểm cực trị; $(x - 1)^2$ không đổi dấu.",
      ],
      solution:
        "$f'$ đổi dấu khi qua $x = -2$ (từ dương sang âm) và $x = 0$ (từ âm sang dương), nhưng không đổi dấu khi qua $x = 1$ vì thừa số $(x - 1)^2 \\ge 0$. Hàm số có $2$ điểm cực trị.",
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị nhỏ nhất của hàm số $y = x^3 - 3x + 2$ trên đoạn $[-3; 0]$.',
      answer: -16,
      hints: [
        "$y' = 3x^2 - 3 = 0 \\iff x = \\pm 1$; chỉ $x = -1$ thuộc $(-3; 0)$.",
        'So sánh $y(-3)$, $y(-1)$ và $y(0)$.',
      ],
      solution:
        '$y(-3) = -27 + 9 + 2 = -16$, $y(-1) = -1 + 3 + 2 = 4$, $y(0) = 2$. Giá trị nhỏ nhất là $-16$, đạt tại $x = -3$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đường tiệm cận của đồ thị hàm số $y = \\dfrac{2x - 1}{x + 1}$.',
      options: ['$x = -1$', '$y = 2$', '$x = 1$', '$y = -1$', '$y = \\dfrac{1}{2}$'],
      answers: [0, 1],
      hints: [
        'Tiệm cận đứng: giá trị làm mẫu bằng $0$ (tử khác $0$).',
        'Tiệm cận ngang: tỉ số hai hệ số của $x$ ở tử và mẫu.',
      ],
      solution:
        '$\\lim\\limits_{x \\to -1^+} y = -\\infty$ nên $x = -1$ là tiệm cận đứng; $\\lim\\limits_{x \\to \\pm\\infty} y = 2$ nên $y = 2$ là tiệm cận ngang.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị hàm số $y = \\dfrac{x^2 - 3x + 1}{x - 2}$ có tiệm cận xiên $y = x + b$. Tìm $b$.',
      answer: -1,
      hints: ['Chia $x^2 - 3x + 1$ cho $x - 2$.'],
      solution:
        '$x^2 - 3x + 1 = (x - 2)(x - 1) - 1$, nên $y = x - 1 - \\dfrac{1}{x - 2}$. Vì $\\dfrac{1}{x - 2} \\to 0$ khi $x \\to \\pm\\infty$, tiệm cận xiên là $y = x - 1$, tức $b = -1$.',
    },
    {
      type: 'choice',
      prompt: 'Tâm đối xứng của đồ thị hàm số $y = \\dfrac{x + 3}{x - 1}$ là điểm nào?',
      options: ['$I(1; 1)$', '$I(-1; 1)$', '$I(1; 3)$', '$I(-3; 1)$'],
      answer: 0,
      hints: ['Tâm đối xứng là giao điểm của tiệm cận đứng và tiệm cận ngang.'],
      solution: 'Tiệm cận đứng $x = 1$, tiệm cận ngang $y = 1$, nên tâm đối xứng là $I(1; 1)$.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $x^3 - 3x + 1 = 3$ có bao nhiêu nghiệm thực phân biệt?',
      answer: 2,
      hints: [
        'Số nghiệm là số giao điểm của đồ thị $y = x^3 - 3x + 1$ với đường thẳng $y = 3$.',
        'Tìm giá trị cực đại và cực tiểu của $y = x^3 - 3x + 1$.',
      ],
      solution:
        '$y_{\\text{CĐ}} = y(-1) = 3$, $y_{\\text{CT}} = y(1) = -1$. Đường thẳng $y = 3$ đi qua điểm cực đại, tiếp xúc với đồ thị tại đó và cắt đồ thị tại một điểm nữa. Thật vậy, $x^3 - 3x - 2 = (x + 1)^2(x - 2)$, phương trình có $2$ nghiệm $x = -1$ và $x = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây đồng biến trên $\\mathbb{R}$?',
      options: [
        '$y = x^3 + 3x$',
        '$y = x^3 - 3x$',
        '$y = -x^3 + x$',
        '$y = \\dfrac{x - 1}{x + 2}$',
      ],
      answer: 0,
      hints: [
        "Hàm số phải xác định trên $\\mathbb{R}$ và có $y' \\ge 0$ với mọi $x$ (bằng $0$ tại hữu hạn điểm).",
      ],
      solution:
        "$y = x^3 + 3x$ có $y' = 3x^2 + 3 > 0$ với mọi $x$. Hàm $y = x^3 - 3x$ và $y = -x^3 + x$ có $y'$ đổi dấu; hàm $y = \\dfrac{x - 1}{x + 2}$ đồng biến trên từng khoảng nhưng không xác định tại $x = -2$.",
    },
    {
      type: 'number',
      prompt:
        'Một chất điểm chuyển động theo phương trình $s(t) = -t^3 + 6t^2$, trong đó $t$ tính bằng giây ($0 \\le t \\le 6$) và $s$ tính bằng mét. Tìm vận tốc lớn nhất của chất điểm.',
      answer: 12,
      unit: 'm/s',
      hints: [
        "Vận tốc $v(t) = s'(t) = -3t^2 + 12t$.",
        'Tìm giá trị lớn nhất của $v(t)$ trên $[0; 6]$.',
      ],
      solution:
        "$v(t) = -3t^2 + 12t$, $v'(t) = -6t + 12 = 0 \\iff t = 2$. $v(0) = 0$, $v(2) = 12$, $v(6) = -36$. Vận tốc lớn nhất là $12$ m/s tại $t = 2$ s.",
    },
    {
      type: 'number',
      prompt:
        'Chi phí sản xuất $x$ sản phẩm là $C(x) = x^2 + 20x + 900$ (nghìn đồng). Cần sản xuất bao nhiêu sản phẩm để chi phí trung bình cho mỗi sản phẩm là nhỏ nhất?',
      answer: 30,
      hints: [
        'Chi phí trung bình là $\\overline{C}(x) = \\dfrac{C(x)}{x} = x + 20 + \\dfrac{900}{x}$.',
        "Giải $\\overline{C}'(x) = 0$ với $x > 0$.",
      ],
      solution:
        "$\\overline{C}'(x) = 1 - \\dfrac{900}{x^2} = 0 \\iff x = 30$ (vì $x > 0$), và $\\overline{C}'$ đổi dấu từ âm sang dương tại đó. Sản xuất $30$ sản phẩm thì chi phí trung bình nhỏ nhất, bằng $\\overline{C}(30) = 30 + 20 + 30 = 80$ nghìn đồng.",
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước của sơ đồ khảo sát sự biến thiên và vẽ đồ thị hàm số theo đúng thứ tự.',
      items: [
        'Tìm tập xác định của hàm số.',
        "Tính $y'$, tìm các điểm tại đó $y'$ bằng $0$ hoặc không tồn tại.",
        "Xét dấu $y'$, tìm cực trị, các giới hạn và tiệm cận (nếu có).",
        'Lập bảng biến thiên.',
        'Vẽ đồ thị dựa vào bảng biến thiên.',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Bảng biến thiên tổng hợp mọi thông tin về dấu đạo hàm, cực trị và giới hạn.'],
      solution:
        "Tập xác định → $y'$ và các điểm tới hạn → dấu $y'$, cực trị, giới hạn, tiệm cận → bảng biến thiên → đồ thị.",
    },
  ],
  takeaways: [
    "Dấu của $y'$ cho tính đơn điệu; $y'$ đổi dấu khi qua $x_0$ thì $x_0$ là điểm cực trị.",
    'Giá trị lớn nhất, nhỏ nhất trên đoạn: so sánh giá trị tại các điểm tới hạn bên trong và tại hai đầu mút.',
    'Tiệm cận ngang và xiên tìm bằng giới hạn tại vô cực; tiệm cận đứng tại điểm mà giới hạn một bên là vô cực.',
    'Đồ thị của $y = \\dfrac{ax + b}{cx + d}$ và $y = \\dfrac{ax^2 + bx + c}{mx + n}$ nhận giao điểm hai tiệm cận làm tâm đối xứng.',
    'Bài toán thực tiễn: chọn ẩn và điều kiện, lập hàm số, rồi tìm giá trị lớn nhất hoặc nhỏ nhất bằng đạo hàm.',
  ],
};
