/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sơ đồ khảo sát sự biến thiên và vẽ đồ thị hàm số; khảo sát hàm số bậc ba, hàm phân thức bậc nhất trên bậc nhất và bậc hai trên bậc nhất; dùng đồ thị để biện luận số nghiệm của phương trình.',
  intro:
    'Ba bài trước cho ta từng công cụ riêng lẻ: dấu của đạo hàm, cực trị, giá trị lớn nhất và nhỏ nhất, đường tiệm cận. Bài này ghép chúng lại thành một quy trình hoàn chỉnh để khảo sát một hàm số và vẽ đồ thị của nó một cách chính xác, rồi dùng đồ thị để trả lời các câu hỏi về phương trình.',
  objectives: [
    'Nắm sơ đồ tổng quát để khảo sát sự biến thiên và vẽ đồ thị hàm số.',
    'Khảo sát và vẽ đồ thị các hàm số $y = ax^3 + bx^2 + cx + d$, $y = \\dfrac{ax + b}{cx + d}$ và $y = \\dfrac{ax^2 + bx + c}{mx + n}$.',
    'Đọc tính chất của hàm số từ đồ thị và dùng đồ thị để tìm số nghiệm của phương trình.',
  ],
  sections: [
    {
      heading: 'Sơ đồ khảo sát hàm số',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm tập xác định của hàm số.',
            "Khảo sát sự biến thiên: tính đạo hàm $y'$ và tìm các điểm tại đó $y'$ bằng $0$ hoặc không tồn tại; xét dấu $y'$ để chỉ ra các khoảng đơn điệu; tìm cực trị; tìm các giới hạn tại vô cực, giới hạn vô cực và tiệm cận (nếu có); lập bảng biến thiên.",
            'Vẽ đồ thị của hàm số dựa vào bảng biến thiên.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi vẽ đồ thị, nên vẽ các đường tiệm cận (nếu có) trước, xác định thêm một số điểm đặc biệt như giao điểm của đồ thị với các trục toạ độ, và để ý tính đối xứng của đồ thị (tâm đối xứng, trục đối xứng) để vẽ cho đúng.',
        },
      ],
    },
    {
      heading: 'Hàm số bậc ba',
      blocks: [
        {
          type: 'p',
          text: "Với hàm số $y = ax^3 + bx^2 + cx + d$ ($a \\ne 0$): tập xác định là $\\mathbb{R}$, $y' = 3ax^2 + 2bx + c$ là tam thức bậc hai, và $\\lim\\limits_{x \\to \\pm\\infty} y$ là vô cực nên đồ thị không có tiệm cận. Hình dạng của đồ thị phụ thuộc vào dấu của $a$ và số nghiệm của phương trình $y' = 0$:",
        },
        {
          type: 'table',
          caption: 'Các dạng đồ thị của hàm số bậc ba',
          head: ["Phương trình $y' = 0$", '$a > 0$', '$a < 0$'],
          rows: [
            [
              'có hai nghiệm phân biệt',
              'có cực đại rồi cực tiểu; nhánh bên phải đi lên',
              'có cực tiểu rồi cực đại; nhánh bên phải đi xuống',
            ],
            [
              'có nghiệm kép',
              'đồng biến trên $\\mathbb{R}$, không có cực trị',
              'nghịch biến trên $\\mathbb{R}$, không có cực trị',
            ],
            [
              'vô nghiệm',
              'đồng biến trên $\\mathbb{R}$, không có cực trị',
              'nghịch biến trên $\\mathbb{R}$, không có cực trị',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đồ thị của hàm số bậc ba $y = ax^3 + bx^2 + cx + d$ ($a \\ne 0$) luôn có tâm đối xứng là điểm $I$ có hoành độ $x_0 = -\\dfrac{b}{3a}$ (trung điểm của hai điểm cực trị, khi hàm số có cực trị).',
        },
      ],
    },
    {
      heading: 'Hàm số phân thức',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Hàm số phân thức bậc nhất trên bậc nhất',
          text: "Hàm số $y = \\dfrac{ax + b}{cx + d}$ ($c \\ne 0$, $ad - bc \\ne 0$) có tập xác định $\\mathbb{R} \\setminus \\left\\{-\\dfrac{d}{c}\\right\\}$, $y' = \\dfrac{ad - bc}{(cx + d)^2}$ không đổi dấu: hàm số luôn đồng biến (khi $ad - bc > 0$) hoặc luôn nghịch biến (khi $ad - bc < 0$) trên từng khoảng xác định và không có cực trị. Đồ thị có tiệm cận đứng $x = -\\dfrac{d}{c}$, tiệm cận ngang $y = \\dfrac{a}{c}$ và nhận giao điểm của hai tiệm cận làm tâm đối xứng.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hàm số phân thức bậc hai trên bậc nhất',
          text: 'Với hàm số $y = \\dfrac{ax^2 + bx + c}{mx + n}$ ($a \\ne 0$, $m \\ne 0$, tử không chia hết cho mẫu), chia tử cho mẫu ta viết được $y = px + q + \\dfrac{r}{mx + n}$ với $r \\ne 0$. Đồ thị có tiệm cận đứng $x = -\\dfrac{n}{m}$, tiệm cận xiên $y = px + q$ và nhận giao điểm của hai tiệm cận làm tâm đối xứng. Hàm số có hai cực trị hoặc không có cực trị nào.',
        },
      ],
    },
    {
      heading: 'Dùng đồ thị để tìm số nghiệm của phương trình',
      blocks: [
        {
          type: 'p',
          text: 'Số nghiệm của phương trình $f(x) = m$ bằng số giao điểm của đồ thị $y = f(x)$ với đường thẳng nằm ngang $y = m$. Dựa vào bảng biến thiên hoặc đồ thị, ta đếm số giao điểm khi đường thẳng $y = m$ trượt lên xuống.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: 'Hàm số $y = x^3 - 3x^2 + 2$ có $y_{\\text{CĐ}} = 2$, $y_{\\text{CT}} = -2$. Phương trình $x^3 - 3x^2 + 2 = m$ có ba nghiệm khi $-2 < m < 2$, có hai nghiệm khi $m = 2$ hoặc $m = -2$, và có một nghiệm khi $m > 2$ hoặc $m < -2$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình khảo sát từng bước',
    instruction:
      'Chọn dạng hàm số và các hệ số. Bấm "Bước tiếp theo" để đi qua từng bước của sơ đồ: bảng biến thiên tự lập ở bước 4, đồ thị hiện dần (tiệm cận, điểm cực trị, rồi đường cong). Đổi một hệ số để xem các kết quả thay đổi theo.',
  },
  examples: [
    {
      problem: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số $y = x^3 - 3x^2 + 2$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R}$.',
        "$y' = 3x^2 - 6x = 3x(x - 2)$; $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.",
        '$\\lim\\limits_{x \\to -\\infty} y = -\\infty$, $\\lim\\limits_{x \\to +\\infty} y = +\\infty$; đồ thị không có tiệm cận.',
        "Bảng biến thiên: $y' > 0$ trên $(-\\infty; 0)$ và $(2; +\\infty)$, $y' < 0$ trên $(0; 2)$. Hàm số đồng biến trên $(-\\infty; 0)$ và $(2; +\\infty)$, nghịch biến trên $(0; 2)$; đạt cực đại tại $x = 0$, $y_{\\text{CĐ}} = 2$; đạt cực tiểu tại $x = 2$, $y_{\\text{CT}} = -2$.",
        'Đồ thị cắt $Oy$ tại $(0; 2)$; $y = 0 \\Leftrightarrow (x - 1)(x^2 - 2x - 2) = 0 \\Leftrightarrow x = 1$ hoặc $x = 1 \\pm \\sqrt{3}$. Tâm đối xứng là $I(1; 0)$.',
      ],
      answer:
        'Đồ thị đi lên tới điểm cực đại $(0; 2)$, đi xuống tới điểm cực tiểu $(2; -2)$ rồi đi lên, đối xứng qua $I(1; 0)$.',
    },
    {
      problem: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số $y = \\dfrac{x + 1}{x - 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$.',
        "$y' = \\dfrac{1 \\cdot (-1) - 1 \\cdot 1}{(x - 1)^2} = \\dfrac{-2}{(x - 1)^2} < 0$ với mọi $x \\ne 1$: hàm số nghịch biến trên mỗi khoảng $(-\\infty; 1)$ và $(1; +\\infty)$, không có cực trị.",
        '$\\lim\\limits_{x \\to \\pm\\infty} y = 1$: tiệm cận ngang $y = 1$. $\\lim\\limits_{x \\to 1^-} y = -\\infty$, $\\lim\\limits_{x \\to 1^+} y = +\\infty$: tiệm cận đứng $x = 1$.',
        'Đồ thị cắt $Oy$ tại $(0; -1)$, cắt $Ox$ tại $(-1; 0)$ và nhận $I(1; 1)$ làm tâm đối xứng.',
      ],
      answer:
        'Đồ thị gồm hai nhánh đi xuống, nằm ở hai góc đối nhau tạo bởi tiệm cận $x = 1$ và $y = 1$.',
    },
    {
      problem: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số $y = \\dfrac{x^2 - x + 1}{x - 1}$.',
      steps: [
        'Tập xác định: $D = \\mathbb{R} \\setminus \\{1\\}$. Chia tử cho mẫu: $y = x + \\dfrac{1}{x - 1}$.',
        "$y' = 1 - \\dfrac{1}{(x - 1)^2} = \\dfrac{x^2 - 2x}{(x - 1)^2}$; $y' = 0 \\Leftrightarrow x = 0$ hoặc $x = 2$.",
        "$y' > 0$ trên $(-\\infty; 0)$ và $(2; +\\infty)$, $y' < 0$ trên $(0; 1)$ và $(1; 2)$. Cực đại tại $x = 0$, $y_{\\text{CĐ}} = -1$; cực tiểu tại $x = 2$, $y_{\\text{CT}} = 3$.",
        '$\\lim\\limits_{x \\to \\pm\\infty} [y - x] = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{1}{x - 1} = 0$: tiệm cận xiên $y = x$. $\\lim\\limits_{x \\to 1^+} y = +\\infty$: tiệm cận đứng $x = 1$.',
        'Đồ thị cắt $Oy$ tại $(0; -1)$, không cắt $Ox$, và nhận $I(1; 1)$ làm tâm đối xứng.',
      ],
      answer:
        'Đồ thị có hai nhánh: nhánh trái có điểm cực đại $(0; -1)$, nhánh phải có điểm cực tiểu $(2; 3)$, cả hai bám theo tiệm cận $x = 1$ và $y = x$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điểm cực đại của đồ thị hàm số $y = x^3 - 3x + 1$ là',
      options: ['$(-1; 3)$', '$(1; -1)$', '$(-1; -1)$', '$(1; 3)$'],
      answer: 0,
      hints: [
        "$y' = 3x^2 - 3$, bằng $0$ tại $x = \\pm 1$.",
        "Ở điểm cực đại, $y'$ đổi dấu từ dương sang âm.",
      ],
      solution:
        "$y' > 0$ trên $(-\\infty; -1)$, $y' < 0$ trên $(-1; 1)$: hàm số đạt cực đại tại $x = -1$, $y(-1) = -1 + 3 + 1 = 3$. Điểm cực đại của đồ thị là $(-1; 3)$; điểm cực tiểu là $(1; -1)$.",
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = \\dfrac{2x + 3}{x - 1}$ có tâm đối xứng $I(a; b)$. Tính $a + b$.',
      answer: 3,
      hints: [
        'Tâm đối xứng là giao điểm của hai đường tiệm cận.',
        'Tiệm cận đứng $x = 1$, tiệm cận ngang $y = \\dfrac{2}{1}$.',
      ],
      solution: 'Tâm đối xứng $I(1; 2)$, nên $a + b = 1 + 2 = 3$.',
    },
    {
      type: 'number',
      prompt: 'Hàm số $y = -x^3 + 3x^2 - 3x + 1$ có bao nhiêu điểm cực trị?',
      answer: 0,
      hints: ["Tính $y'$ và viết thành bình phương.", "$y' = -3(x - 1)^2$."],
      solution:
        "$y' = -3x^2 + 6x - 3 = -3(x - 1)^2 \\le 0$ và chỉ bằng $0$ tại $x = 1$. Hàm số nghịch biến trên $\\mathbb{R}$ và không có cực trị: $0$ điểm cực trị.",
    },
    {
      type: 'number',
      prompt: 'Phương trình $x^3 - 3x^2 + 2 = 1$ có bao nhiêu nghiệm thực?',
      answer: 3,
      hints: [
        'Đếm giao điểm của đồ thị $y = x^3 - 3x^2 + 2$ với đường thẳng $y = 1$.',
        'Hàm số có $y_{\\text{CĐ}} = 2$ và $y_{\\text{CT}} = -2$.',
      ],
      solution:
        'Vì $-2 < 1 < 2$, đường thẳng $y = 1$ nằm giữa giá trị cực tiểu và giá trị cực đại nên cắt đồ thị tại $3$ điểm: phương trình có $3$ nghiệm.',
    },
    {
      type: 'choice',
      prompt:
        'Tìm tất cả các giá trị của $m$ để phương trình $x^3 - 3x^2 + 2 = m$ có đúng hai nghiệm phân biệt.',
      options: ['$m \\in \\{-2; 2\\}$', '$m \\in (-2; 2)$', '$m \\in [-2; 2]$', '$m = 2$'],
      answer: 0,
      hints: [
        'Đường thẳng $y = m$ cắt đồ thị tại đúng hai điểm khi nó đi qua một điểm cực trị.',
        '$y_{\\text{CĐ}} = 2$, $y_{\\text{CT}} = -2$.',
      ],
      solution:
        'Khi $m = 2$ hoặc $m = -2$, đường thẳng $y = m$ tiếp xúc với đồ thị tại một điểm cực trị và cắt nhánh còn lại tại một điểm: đúng hai nghiệm. Khi $-2 < m < 2$ có ba nghiệm, còn lại một nghiệm.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị hàm số $y = \\dfrac{x^2 + 2x + 2}{x + 1}$ có các đường tiệm cận là',
      options: [
        '$x = -1$ và $y = x + 1$',
        '$x = -1$ và $y = 1$',
        '$x = 1$ và $y = x + 1$',
        '$x = -1$ và $y = x + 2$',
      ],
      answer: 0,
      hints: ['Chia $x^2 + 2x + 2$ cho $x + 1$.', '$x^2 + 2x + 2 = (x + 1)^2 + 1$.'],
      solution:
        '$y = x + 1 + \\dfrac{1}{x + 1}$. Tiệm cận đứng $x = -1$ (vì $\\lim\\limits_{x \\to -1^+} y = +\\infty$), tiệm cận xiên $y = x + 1$.',
    },
    {
      type: 'choice',
      prompt:
        'Hàm số nào nghịch biến trên mỗi khoảng $(-\\infty; 2)$ và $(2; +\\infty)$, có đồ thị nhận $y = 1$ làm tiệm cận ngang?',
      options: [
        '$y = \\dfrac{x + 1}{x - 2}$',
        '$y = \\dfrac{x - 3}{x - 2}$',
        '$y = \\dfrac{2x + 1}{x - 2}$',
        '$y = \\dfrac{x + 1}{x + 2}$',
      ],
      answer: 0,
      hints: [
        'Tiệm cận ngang $y = \\dfrac{a}{c}$, tiệm cận đứng $x = -\\dfrac{d}{c}$.',
        "Dấu của $y'$ là dấu của $ad - bc$.",
      ],
      solution:
        '$y = \\dfrac{x + 1}{x - 2}$ có $ad - bc = 1 \\cdot (-2) - 1 \\cdot 1 = -3 < 0$ nên nghịch biến trên mỗi khoảng xác định, tiệm cận đứng $x = 2$, tiệm cận ngang $y = 1$. Hàm $\\dfrac{x - 3}{x - 2}$ có $ad - bc = 1 > 0$ (đồng biến), $\\dfrac{2x + 1}{x - 2}$ có tiệm cận ngang $y = 2$, $\\dfrac{x + 1}{x + 2}$ có tiệm cận đứng $x = -2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị cực tiểu $y_{\\text{CT}}$ của hàm số $y = \\dfrac{x^2 + 3}{x + 1}$.',
      answer: 2,
      hints: [
        "$y' = \\dfrac{2x(x + 1) - (x^2 + 3)}{(x + 1)^2} = \\dfrac{x^2 + 2x - 3}{(x + 1)^2}$.",
        "$y' = 0 \\Leftrightarrow x = 1$ hoặc $x = -3$; xét dấu $y'$.",
      ],
      solution:
        "$y' = \\dfrac{(x - 1)(x + 3)}{(x + 1)^2}$: dương trên $(-\\infty; -3)$ và $(1; +\\infty)$, âm trên $(-3; -1)$ và $(-1; 1)$. Hàm số đạt cực tiểu tại $x = 1$: $y_{\\text{CT}} = \\dfrac{4}{2} = 2$ (cực đại tại $x = -3$: $y_{\\text{CĐ}} = -6$).",
    },
  ],
  takeaways: [
    'Sơ đồ khảo sát: tập xác định; đạo hàm, chiều biến thiên, cực trị, giới hạn và tiệm cận, bảng biến thiên; vẽ đồ thị.',
    'Hàm bậc ba: không có tiệm cận, có hai cực trị hoặc không có cực trị, đồ thị có tâm đối xứng tại điểm có hoành độ $-\\dfrac{b}{3a}$.',
    'Hàm $\\dfrac{ax + b}{cx + d}$: luôn đồng biến hoặc luôn nghịch biến trên từng khoảng xác định; tâm đối xứng là giao điểm hai tiệm cận.',
    'Hàm $\\dfrac{ax^2 + bx + c}{mx + n}$: tiệm cận đứng và tiệm cận xiên; tâm đối xứng là giao điểm hai tiệm cận.',
    'Số nghiệm của $f(x) = m$ bằng số giao điểm của đồ thị $y = f(x)$ với đường thẳng $y = m$.',
  ],
};
