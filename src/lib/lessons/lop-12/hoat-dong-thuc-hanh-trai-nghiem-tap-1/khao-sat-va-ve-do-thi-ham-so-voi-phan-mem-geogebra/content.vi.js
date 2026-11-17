/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra để tính đạo hàm, tìm cực trị, tiệm cận, giá trị lớn nhất và nhỏ nhất, vẽ đồ thị hàm số và dùng thanh trượt khảo sát một họ đồ thị có tham số, rồi kiểm tra lại kết quả bằng tính toán.',
  intro:
    'Khảo sát hàm số bằng tay cần nhiều bước: tính đạo hàm, lập bảng biến thiên, tìm tiệm cận rồi vẽ đồ thị. Phần mềm GeoGebra làm những việc đó chỉ bằng vài lệnh, và với một thanh trượt, ta còn thấy cả một họ đồ thị thay đổi khi tham số thay đổi. Trong hoạt động này, em dùng GeoGebra để khảo sát và vẽ đồ thị hàm số, rồi dùng kiến thức của Chương I để kiểm tra lại những gì phần mềm cho thấy.',
  objectives: [
    'Nhập hàm số và vẽ đồ thị hàm số bằng GeoGebra.',
    'Dùng các lệnh của GeoGebra để tính đạo hàm, tìm điểm cực trị, tiệm cận, giá trị lớn nhất và giá trị nhỏ nhất.',
    'Dùng thanh trượt để khảo sát một họ đồ thị phụ thuộc tham số $m$.',
    'Kiểm tra kết quả của phần mềm bằng tính toán và giải thích khi kết quả sai lệch.',
  ],
  sections: [
    {
      heading: 'Làm quen với GeoGebra',
      blocks: [
        {
          type: 'p',
          text: 'GeoGebra là phần mềm toán học miễn phí, dùng trực tuyến tại trang geogebra.org hoặc cài trên máy tính, điện thoại. Trong hoạt động này ta dùng GeoGebra Classic (hoặc Máy tính vẽ đồ thị). Màn hình gồm cửa sổ Đại số (bên trái, ghi các đối tượng và kết quả), cửa sổ Đồ hoạ (bên phải, vẽ đồ thị) và ô Nhập lệnh.',
        },
        {
          type: 'p',
          text: 'Để vẽ đồ thị hàm số $y = x^3 - 6x^2 + 9$, gõ vào ô Nhập lệnh dòng f(x) = x^3 - 6x^2 + 9 rồi nhấn Enter. Kí hiệu ^ là luỹ thừa, * là phép nhân (có thể bỏ), sqrt(3) là $\\sqrt{3}$; trong phần mềm, số thập phân viết bằng dấu chấm, chẳng hạn 0.5 thay cho $0{,}5$.',
        },
        {
          type: 'table',
          head: ['Lệnh', 'Kết quả'],
          rows: [
            ['Derivative(f)', "Đạo hàm $f'(x)$, vẽ luôn đồ thị của $f'$"],
            ['Derivative(f, 2)', "Đạo hàm cấp hai $f''(x)$"],
            ['Extremum(f)', 'Các điểm cực trị của hàm đa thức $f$'],
            ['Extremum(f, a, b)', 'Điểm cực trị của $f$ trên khoảng $(a; b)$, tìm gần đúng'],
            ['Root(f)', 'Các giao điểm của đồ thị với trục hoành'],
            ['Asymptote(f)', 'Các đường tiệm cận của đồ thị'],
            [
              'Max(f, a, b), Min(f, a, b)',
              'Điểm cao nhất, thấp nhất mà phần mềm tìm được trên $[a; b]$',
            ],
          ],
          caption:
            'Một số lệnh của GeoGebra. Lệnh gõ bằng tiếng Anh dùng được với mọi ngôn ngữ giao diện.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Kết quả của phần mềm là gần đúng',
          text: 'GeoGebra làm tròn kết quả (mặc định đến hai chữ số thập phân), nên $-\\dfrac{\\sqrt{3}}{6}$ hiện ra là $-0{,}29$. Khi tìm giá trị lớn nhất, nhỏ nhất trên một đoạn, các lệnh tìm điểm cực trị chỉ xét các điểm bên trong đoạn. Vì vậy luôn tự tính thêm giá trị tại hai đầu mút rồi so sánh, như quy tắc ở Bài 2.',
        },
      ],
    },
    {
      heading: 'Thanh trượt và họ đồ thị có tham số',
      blocks: [
        {
          type: 'p',
          text: 'Gõ m = 1 rồi nhấn Enter: GeoGebra tạo số $m$ và hiện nó thành một thanh trượt (bấm vào chấm tròn bên cạnh nếu thanh trượt chưa hiện). Tiếp theo gõ f(x) = x^3 - 3m x + 1. Khi kéo thanh trượt, đồ thị và các kết quả phụ thuộc $f$ (đạo hàm, điểm cực trị, tiệm cận) thay đổi theo.',
        },
        {
          type: 'p',
          text: 'Nháy chuột phải vào một đối tượng và chọn Hiện vết (Show Trace): khi kéo thanh trượt, các vị trí cũ của đối tượng vẫn được giữ trên màn hình. Bật vết cho các điểm cực trị, ta thấy chúng chạy trên một đường cong cố định.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra bằng tính toán',
          text: "Với $y = x^3 - 3mx + 1$, ta có $y' = 3x^2 - 3m$. Hàm số có hai điểm cực trị khi và chỉ khi $m > 0$; khi đó các điểm cực trị là $x = \\pm\\sqrt{m}$ và $y = 1 \\mp 2m\\sqrt{m}$. Vì $x^3 = \\pm m\\sqrt{m}$ nên mọi điểm cực trị đều thoả mãn $y = 1 - 2x^3$: đó là đường cong mà vết các điểm cực trị vẽ nên.",
        },
      ],
    },
    {
      heading: 'Khảo sát hàm số với GeoGebra',
      blocks: [
        {
          type: 'p',
          text: 'Dùng GeoGebra thực hiện các yêu cầu sau, rồi đối chiếu với bảng kết quả (đã kiểm tra lại bằng tính toán).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm đạo hàm cấp một, cấp hai, các điểm cực trị và vẽ đồ thị của các hàm số $y = 3x^2 + \\sqrt{3}x + 1$, $y = x^3 - 6x^2 + 9$, $y = x^4 - 4x^2 + 3$.',
            'Tìm đạo hàm, các đường tiệm cận và vẽ đồ thị của các hàm số $y = \\dfrac{x}{x + \\sqrt{2}}$, $y = \\dfrac{2x - 1}{x + 1}$, $y = \\dfrac{x^2 - 2x - 8}{x - 1}$, $y = 5x + 1 + \\dfrac{3}{2x - 3}$.',
            'Tìm giá trị lớn nhất và giá trị nhỏ nhất của các hàm số $y = x^3 - 3x^2 - 9x + 35$ trên đoạn $[-4; 4]$, $y = -3x^4 + 4x^2 + \\sqrt{2}$ trên đoạn $[-1; 1]$, $y = x + \\dfrac{\\sqrt{5}}{x}$ trên đoạn $[1; 10]$ và $y = \\sin 2x - x$ trên đoạn $\\left[-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right]$.',
          ],
        },
        {
          type: 'table',
          head: ['Hàm số', 'Đạo hàm', 'Kết quả'],
          rows: [
            [
              '$y = 3x^2 + \\sqrt{3}x + 1$',
              "$y' = 6x + \\sqrt{3}$, $y'' = 6$",
              'Cực tiểu tại $x = -\\dfrac{\\sqrt{3}}{6}$, $y_{\\text{CT}} = \\dfrac{3}{4}$',
            ],
            [
              '$y = x^3 - 6x^2 + 9$',
              "$y' = 3x^2 - 12x$, $y'' = 6x - 12$",
              'Cực đại $(0; 9)$, cực tiểu $(4; -23)$',
            ],
            [
              '$y = x^4 - 4x^2 + 3$',
              "$y' = 4x^3 - 8x$, $y'' = 12x^2 - 8$",
              'Cực đại $(0; 3)$, cực tiểu $(-\\sqrt{2}; -1)$ và $(\\sqrt{2}; -1)$',
            ],
            [
              '$y = \\dfrac{x}{x + \\sqrt{2}}$',
              "$y' = \\dfrac{\\sqrt{2}}{(x + \\sqrt{2})^2}$",
              'Tiệm cận đứng $x = -\\sqrt{2}$, tiệm cận ngang $y = 1$',
            ],
            [
              '$y = \\dfrac{2x - 1}{x + 1}$',
              "$y' = \\dfrac{3}{(x + 1)^2}$",
              'Tiệm cận đứng $x = -1$, tiệm cận ngang $y = 2$',
            ],
            [
              '$y = \\dfrac{x^2 - 2x - 8}{x - 1}$',
              "$y' = \\dfrac{x^2 - 2x + 10}{(x - 1)^2}$",
              'Tiệm cận đứng $x = 1$, tiệm cận xiên $y = x - 1$',
            ],
            [
              '$y = 5x + 1 + \\dfrac{3}{2x - 3}$',
              "$y' = 5 - \\dfrac{6}{(2x - 3)^2}$",
              'Tiệm cận đứng $x = \\dfrac{3}{2}$, tiệm cận xiên $y = 5x + 1$',
            ],
          ],
          caption: 'Kết quả khảo sát các hàm số ở yêu cầu 1 và 2.',
        },
        {
          type: 'table',
          head: ['Hàm số và đoạn', 'Giá trị lớn nhất', 'Giá trị nhỏ nhất'],
          rows: [
            [
              '$y = x^3 - 3x^2 - 9x + 35$ trên $[-4; 4]$',
              '$40$, tại $x = -1$',
              '$-41$, tại $x = -4$',
            ],
            [
              '$y = -3x^4 + 4x^2 + \\sqrt{2}$ trên $[-1; 1]$',
              '$\\dfrac{4}{3} + \\sqrt{2} \\approx 2{,}75$, tại $x = \\pm\\dfrac{\\sqrt{6}}{3}$',
              '$\\sqrt{2} \\approx 1{,}41$, tại $x = 0$',
            ],
            [
              '$y = x + \\dfrac{\\sqrt{5}}{x}$ trên $[1; 10]$',
              '$10 + \\dfrac{\\sqrt{5}}{10} \\approx 10{,}22$, tại $x = 10$',
              '$2\\sqrt[4]{5} \\approx 2{,}99$, tại $x = \\sqrt[4]{5}$',
            ],
            [
              '$y = \\sin 2x - x$ trên $\\left[-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right]$',
              '$\\dfrac{\\pi}{2}$, tại $x = -\\dfrac{\\pi}{2}$',
              '$-\\dfrac{\\pi}{2}$, tại $x = \\dfrac{\\pi}{2}$',
            ],
          ],
          caption:
            'Kết quả yêu cầu 3, đã so sánh giá trị tại các điểm cực trị bên trong đoạn với giá trị tại hai đầu mút.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên hai đầu mút',
          text: 'Với $y = \\sin 2x - x$ trên $\\left[-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right]$, các điểm cực trị bên trong đoạn là $x = \\pm\\dfrac{\\pi}{6}$ với giá trị $\\pm\\left(\\dfrac{\\sqrt{3}}{2} - \\dfrac{\\pi}{6}\\right) \\approx \\pm 0{,}34$. Nhưng $y\\left(-\\dfrac{\\pi}{2}\\right) = \\dfrac{\\pi}{2} \\approx 1{,}57$ và $y\\left(\\dfrac{\\pi}{2}\\right) = -\\dfrac{\\pi}{2}$, nên giá trị lớn nhất là $\\dfrac{\\pi}{2}$ và giá trị nhỏ nhất là $-\\dfrac{\\pi}{2}$, đạt tại hai đầu mút.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát một họ đồ thị bằng thanh trượt',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng GeoGebra khảo sát một họ hàm số có tham số $m$, đưa ra dự đoán từ hình vẽ rồi chứng minh dự đoán bằng đạo hàm. Làm theo nhóm $3$ đến $4$ học sinh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc điện thoại có GeoGebra (trực tuyến hoặc đã cài), vở ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mỗi nhóm chọn một họ: $y = x^3 - 3mx + 1$, $y = x^4 - 2mx^2 + 1$ hoặc $y = \\dfrac{mx + 1}{x - 1}$.',
            'Tạo thanh trượt $m$ (chẳng hạn từ $-3$ đến $3$, bước $0{,}25$) và nhập hàm số. Dùng các lệnh Derivative, Extremum, Asymptote để hiện đạo hàm, điểm cực trị, tiệm cận.',
            'Kéo thanh trượt, ghi vào bảng: với những giá trị nào của $m$ thì hàm số có $0$, $1$, $2$ hoặc $3$ điểm cực trị; tiệm cận thay đổi thế nào.',
            'Bật Hiện vết cho các điểm cực trị (hoặc cho tiệm cận). Dự đoán đường mà vết vẽ nên, rồi nhập phương trình dự đoán vào GeoGebra để so sánh.',
            'Chứng minh các dự đoán bằng đạo hàm như đã học ở Chương I.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: ảnh chụp màn hình GeoGebra ở vài giá trị của $m$, bảng ghi số điểm cực trị theo $m$, phương trình đường chứa vết và lời chứng minh, cùng một nhận xét về chỗ kết quả của phần mềm là gần đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thanh trượt tham số như trong GeoGebra',
    instruction:
      'Chọn một họ hàm số rồi kéo thanh trượt $m$. Cửa sổ Đại số cho biết hàm số, đạo hàm và các điểm cực trị (hoặc tiệm cận) như GeoGebra. Bấm "Hiện vết" rồi kéo $m$ qua nhiều giá trị dương để các điểm cực trị để lại vết, đoán đường chứa vết và bấm "Kiểm tra dự đoán".',
  },
  examples: [
    {
      problem:
        'Dùng GeoGebra tìm các điểm cực trị của hàm số $y = x^3 - 6x^2 + 9$, rồi kiểm tra lại bằng đạo hàm cấp hai.',
      steps: [
        "Nhập f(x) = x^3 - 6x^2 + 9, rồi Derivative(f) và Derivative(f, 2): GeoGebra cho $f'(x) = 3x^2 - 12x$ và $f''(x) = 6x - 12$.",
        'Nhập Extremum(f): GeoGebra cho hai điểm $A(0; 9)$ và $B(4; -23)$.',
        "Kiểm tra: $f'(x) = 3x(x - 4) = 0 \\Leftrightarrow x = 0$ hoặc $x = 4$.",
        "$f''(0) = -12 < 0$ nên $x = 0$ là điểm cực đại, $f(0) = 9$; $f''(4) = 12 > 0$ nên $x = 4$ là điểm cực tiểu, $f(4) = 64 - 96 + 9 = -23$.",
      ],
      answer:
        'Hàm số đạt cực đại tại $x = 0$, $y_{\\text{CĐ}} = 9$, và đạt cực tiểu tại $x = 4$, $y_{\\text{CT}} = -23$.',
    },
    {
      problem:
        'Dùng GeoGebra tìm các đường tiệm cận của đồ thị hàm số $y = \\dfrac{x^2 - 2x - 8}{x - 1}$ và giải thích kết quả.',
      steps: [
        'Nhập f(x) = (x^2 - 2x - 8)/(x - 1) rồi Asymptote(f): GeoGebra cho hai đường $x = 1$ và $y = x - 1$.',
        'Chia đa thức: $x^2 - 2x - 8 = (x - 1)^2 - 9$, nên $y = x - 1 - \\dfrac{9}{x - 1}$.',
        '$\\lim\\limits_{x \\to 1^+} y = -\\infty$ nên $x = 1$ là tiệm cận đứng.',
        '$\\lim\\limits_{x \\to \\pm\\infty} \\left[y - (x - 1)\\right] = \\lim\\limits_{x \\to \\pm\\infty} \\dfrac{-9}{x - 1} = 0$ nên $y = x - 1$ là tiệm cận xiên.',
      ],
      answer: 'Đồ thị có tiệm cận đứng $x = 1$ và tiệm cận xiên $y = x - 1$.',
    },
    {
      problem:
        'Tìm giá trị lớn nhất và giá trị nhỏ nhất của $y = x^3 - 3x^2 - 9x + 35$ trên đoạn $[-4; 4]$. Vì sao chỉ dùng lệnh Extremum là chưa đủ?',
      steps: [
        'Extremum(f) cho hai điểm cực trị $(-1; 40)$ và $(3; 8)$; cả hai đều thuộc $[-4; 4]$.',
        'Tính thêm giá trị tại hai đầu mút: $y(-4) = -64 - 48 + 36 + 35 = -41$ và $y(4) = 64 - 48 - 36 + 35 = 15$.',
        'So sánh bốn giá trị $40$, $8$, $-41$, $15$.',
      ],
      answer:
        '$\\max\\limits_{[-4; 4]} y = 40$ tại $x = -1$ và $\\min\\limits_{[-4; 4]} y = -41$ tại $x = -4$. Giá trị cực tiểu $8$ không phải giá trị nhỏ nhất, vì đầu mút $x = -4$ cho giá trị nhỏ hơn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong GeoGebra, đã nhập hàm số $f$. Lệnh nào cho các đường tiệm cận của đồ thị?',
      options: ['Asymptote(f)', 'Extremum(f)', 'Derivative(f)', 'Root(f)'],
      answer: 0,
      hints: ['Tiệm cận trong tiếng Anh là asymptote.'],
      solution:
        'Lệnh Asymptote(f) cho các đường tiệm cận; Extremum cho điểm cực trị, Derivative cho đạo hàm, Root cho giao điểm với trục hoành.',
    },
    {
      type: 'number',
      prompt:
        'GeoGebra cho ba điểm cực trị của hàm số $y = x^4 - 4x^2 + 3$. Giá trị cực tiểu của hàm số bằng bao nhiêu?',
      answer: -1,
      hints: [
        "Giải $y' = 4x^3 - 8x = 4x(x^2 - 2) = 0$.",
        'Hai điểm cực tiểu là $x = \\pm\\sqrt{2}$; thay vào hàm số với $x^2 = 2$.',
      ],
      solution:
        "$y' = 4x(x^2 - 2) = 0 \\Leftrightarrow x = 0$ hoặc $x = \\pm\\sqrt{2}$. $y'' = 12x^2 - 8$: $y''(\\pm\\sqrt{2}) = 16 > 0$ nên $x = \\pm\\sqrt{2}$ là điểm cực tiểu, $y_{\\text{CT}} = 4 - 8 + 3 = -1$.",
    },
    {
      type: 'number',
      prompt:
        'GeoGebra cho điểm cực tiểu của $y = 3x^2 + \\sqrt{3}x + 1$ là $(-0{,}29; 0{,}75)$. Tính chính xác giá trị cực tiểu (viết dưới dạng số thập phân).',
      answer: 0.75,
      hints: [
        "Giải $y' = 6x + \\sqrt{3} = 0$.",
        'Thay $x = -\\dfrac{\\sqrt{3}}{6}$ vào hàm số, chú ý $x^2 = \\dfrac{3}{36} = \\dfrac{1}{12}$.',
      ],
      solution:
        '$x = -\\dfrac{\\sqrt{3}}{6}$, $y = 3 \\cdot \\dfrac{1}{12} + \\sqrt{3} \\cdot \\left(-\\dfrac{\\sqrt{3}}{6}\\right) + 1 = \\dfrac{1}{4} - \\dfrac{1}{2} + 1 = \\dfrac{3}{4} = 0{,}75$. Ở đây GeoGebra cho đúng giá trị cực tiểu, còn hoành độ $-0{,}29$ là giá trị làm tròn của $-\\dfrac{\\sqrt{3}}{6}$.',
    },
    {
      type: 'choice',
      prompt: 'Asymptote(f) với $f(x) = 5x + 1 + \\dfrac{3}{2x - 3}$ cho những đường nào?',
      options: [
        '$x = \\dfrac{3}{2}$ và $y = 5x + 1$',
        '$x = \\dfrac{3}{2}$ và $y = 5$',
        '$x = -\\dfrac{3}{2}$ và $y = 5x + 1$',
        'Chỉ có $x = \\dfrac{3}{2}$',
      ],
      answer: 0,
      hints: ['Mẫu $2x - 3$ bằng $0$ tại đâu?', 'Xét $y - (5x + 1)$ khi $x \\to \\pm\\infty$.'],
      solution:
        '$\\lim\\limits_{x \\to (3/2)^+} y = +\\infty$ nên $x = \\dfrac{3}{2}$ là tiệm cận đứng; $y - (5x + 1) = \\dfrac{3}{2x - 3} \\to 0$ khi $x \\to \\pm\\infty$ nên $y = 5x + 1$ là tiệm cận xiên.',
    },
    {
      type: 'choice',
      prompt:
        'Kéo thanh trượt $m$ với họ $y = x^3 - 3mx + 1$. Hàm số có hai điểm cực trị khi và chỉ khi nào?',
      options: ['$m > 0$', '$m \\ge 0$', '$m < 0$', 'Với mọi $m$'],
      answer: 0,
      hints: [
        "$y' = 3x^2 - 3m$. Khi nào phương trình $y' = 0$ có hai nghiệm phân biệt?",
        "Xét riêng $m = 0$: $y' = 3x^2$ có đổi dấu không?",
      ],
      solution:
        "$y' = 3(x^2 - m)$ có hai nghiệm phân biệt và đổi dấu qua mỗi nghiệm khi và chỉ khi $m > 0$. Với $m = 0$, $y' = 3x^2 \\ge 0$ không đổi dấu nên không có cực trị.",
    },
    {
      type: 'number',
      prompt: 'Với $m = 4$, hàm số $y = x^3 - 3mx + 1$ có giá trị cực đại bằng bao nhiêu?',
      answer: 17,
      hints: [
        "$y' = 3x^2 - 12 = 0 \\Leftrightarrow x = \\pm 2$.",
        "Hệ số của $x^3$ dương nên điểm cực đại là nghiệm nhỏ hơn của $y'$.",
      ],
      solution:
        "$y = x^3 - 12x + 1$, $y' = 3x^2 - 12 = 0 \\Leftrightarrow x = \\pm 2$. $y''(-2) = -12 < 0$ nên cực đại tại $x = -2$: $y_{\\text{CĐ}} = -8 + 24 + 1 = 17$.",
    },
    {
      type: 'choice',
      prompt:
        'Bật Hiện vết cho các điểm cực trị của $y = x^3 - 3mx + 1$ rồi kéo $m$ qua các giá trị dương. Vết nằm trên đường nào?',
      options: ['$y = 1 - 2x^3$', '$y = 1 - x^3$', '$y = x^3 + 1$', '$y = 1 - 3x^2$'],
      answer: 0,
      hints: [
        'Các điểm cực trị có $x = \\pm\\sqrt{m}$, tức là $x^2 = m$.',
        'Thay $m = x^2$ vào $y = x^3 - 3mx + 1$.',
      ],
      solution:
        'Tại điểm cực trị $x^2 = m$, nên $y = x^3 - 3x^2 \\cdot x + 1 = 1 - 2x^3$. Mọi điểm cực trị đều nằm trên đường cong $y = 1 - 2x^3$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị lớn nhất của hàm số $y = \\sin 2x - x$ trên đoạn $\\left[-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right]$ (làm tròn đến hàng phần trăm).',
      answer: 1.57,
      tolerance: 0.005,
      hints: [
        "$y' = 2\\cos 2x - 1 = 0$ cho $x = \\pm\\dfrac{\\pi}{6}$ trong đoạn.",
        'Tính cả giá trị tại hai đầu mút $x = \\pm\\dfrac{\\pi}{2}$ rồi so sánh.',
      ],
      solution:
        '$y\\left(\\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{3}}{2} - \\dfrac{\\pi}{6} \\approx 0{,}34$, $y\\left(-\\dfrac{\\pi}{6}\\right) \\approx -0{,}34$, $y\\left(-\\dfrac{\\pi}{2}\\right) = \\sin(-\\pi) + \\dfrac{\\pi}{2} = \\dfrac{\\pi}{2} \\approx 1{,}57$, $y\\left(\\dfrac{\\pi}{2}\\right) = -\\dfrac{\\pi}{2}$. Giá trị lớn nhất là $\\dfrac{\\pi}{2} \\approx 1{,}57$, đạt tại đầu mút $x = -\\dfrac{\\pi}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị nhỏ nhất của hàm số $y = x + \\dfrac{\\sqrt{5}}{x}$ trên đoạn $[1; 10]$ (làm tròn đến hàng phần trăm).',
      answer: 2.99,
      tolerance: 0.005,
      hints: [
        "$y' = 1 - \\dfrac{\\sqrt{5}}{x^2} = 0$ khi $x^2 = \\sqrt{5}$.",
        'So sánh giá trị tại $x = \\sqrt[4]{5}$ với giá trị tại hai đầu mút $x = 1$ và $x = 10$.',
      ],
      solution:
        "$y' = 0 \\Leftrightarrow x = \\sqrt[4]{5} \\approx 1{,}50 \\in [1; 10]$, $y\\left(\\sqrt[4]{5}\\right) = \\sqrt[4]{5} + \\dfrac{\\sqrt{5}}{\\sqrt[4]{5}} = 2\\sqrt[4]{5} \\approx 2{,}99$. Hai đầu mút: $y(1) = 1 + \\sqrt{5} \\approx 3{,}24$, $y(10) = 10 + \\dfrac{\\sqrt{5}}{10} \\approx 10{,}22$. Giá trị nhỏ nhất là $2\\sqrt[4]{5} \\approx 2{,}99$.",
    },
    {
      type: 'number',
      prompt:
        'Với họ $y = x^4 - 2mx^2 + 1$ và $m = 2$, giá trị cực tiểu của hàm số bằng bao nhiêu?',
      answer: -3,
      hints: [
        "$y' = 4x(x^2 - m)$; với $m > 0$, các điểm cực tiểu là $x = \\pm\\sqrt{m}$.",
        'Tại $x^2 = m$: $y = m^2 - 2m^2 + 1$.',
      ],
      solution:
        "Với $m = 2$: $y' = 4x(x^2 - 2) = 0 \\Leftrightarrow x = 0$, $x = \\pm\\sqrt{2}$. Cực tiểu tại $x = \\pm\\sqrt{2}$: $y_{\\text{CT}} = 4 - 8 + 1 = -3$.",
    },
  ],
  takeaways: [
    'GeoGebra: Derivative cho đạo hàm, Extremum cho điểm cực trị, Asymptote cho tiệm cận, Root cho giao điểm với trục hoành.',
    'Thanh trượt cho thấy một họ đồ thị thay đổi theo tham số; Hiện vết giữ lại các vị trí cũ để ta dự đoán quy luật.',
    'Kết quả của phần mềm là gần đúng: luôn kiểm tra lại bằng đạo hàm, và khi tìm giá trị lớn nhất, nhỏ nhất trên đoạn thì so sánh cả giá trị tại hai đầu mút.',
  ],
};
