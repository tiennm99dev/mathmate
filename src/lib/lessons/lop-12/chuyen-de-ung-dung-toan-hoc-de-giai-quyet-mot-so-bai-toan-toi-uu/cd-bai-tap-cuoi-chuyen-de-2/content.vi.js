/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề bài toán tối ưu: quy hoạch tuyến tính hai biến giải bằng miền chấp nhận được và đường mức, bài toán tối ưu giải bằng đạo hàm trong thực tiễn và kinh tế.',
  intro:
    'Chuyên đề có hai công cụ tìm phương án tốt nhất. Khi hàm mục tiêu và các ràng buộc đều bậc nhất theo hai ẩn, ta dùng quy hoạch tuyến tính: giá trị tối ưu nằm ở một đỉnh của miền chấp nhận được. Khi đại lượng cần tối ưu là một hàm số bất kì của một biến, ta dùng đạo hàm. Bài này ôn lại cả hai qua các bài toán thực tế.',
  objectives: [
    'Nhận ra bài toán nào giải bằng quy hoạch tuyến tính, bài toán nào giải bằng đạo hàm.',
    'Lập và giải bài toán quy hoạch tuyến tính hai biến, kể cả khi miền chấp nhận được không bị chặn.',
    'Lập hàm mục tiêu một biến và dùng đạo hàm tìm giá trị lớn nhất, nhỏ nhất trong các bài toán thực tiễn và kinh tế.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Quy hoạch tuyến tính', 'Dùng đạo hàm'],
          rows: [
            ['Hàm mục tiêu', '$F(x; y) = ax + by$', '$f(x)$ bất kì, một biến'],
            [
              'Điều kiện',
              'Hệ bất phương trình bậc nhất hai ẩn',
              'Tập $D$ (đoạn, khoảng) từ ý nghĩa thực tế',
            ],
            [
              'Tìm tối ưu',
              'Vẽ miền chấp nhận được, tính $F$ tại các đỉnh, so sánh',
              "Giải $f'(x) = 0$, lập bảng biến thiên hoặc so sánh với đầu mút",
            ],
            [
              'Lưu ý',
              'Miền không bị chặn: $F$ có thể không có giá trị lớn nhất, nhỏ nhất',
              'Trên đoạn, giá trị tối ưu có thể ở đầu mút',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kinh tế',
          text: "Chi phí trung bình $\\overline{C}(x) = \\dfrac{C(x)}{x}$; chi phí biên $C'(x)$; doanh thu $R(x) = x \\cdot p(x)$ với $p(x)$ là hàm cầu; lợi nhuận $P(x) = R(x) - C(x)$.",
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi ẩn là số người, số xe, số sản phẩm thì phương án phải là số nguyên. Nếu điểm tối ưu tìm được không nguyên, hãy kiểm tra các phương án nguyên ở gần nó.',
        },
      ],
    },
    {
      heading: 'Dự án: Bài toán tối ưu của lớp em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm chọn một quyết định thật của lớp (mua nước và bánh cho buổi liên hoan với ngân sách có hạn, thuê xe cho chuyến tham quan, làm hộp đựng quà từ tấm bìa có sẵn) và tìm phương án tốt nhất bằng một trong hai phương pháp của chuyên đề.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: báo giá thật, số người, kích thước vật liệu; giấy kẻ ô hoặc phần mềm vẽ đồ thị; máy tính cầm tay hoặc bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mô tả quyết định, các giới hạn (ngân sách, số người, vật liệu) và mục tiêu (rẻ nhất, nhiều nhất, lớn nhất).',
            'Chọn phương pháp: hai ẩn với các ràng buộc bậc nhất thì dùng quy hoạch tuyến tính; một biến với hàm mục tiêu bất kì thì dùng đạo hàm. Giải thích lựa chọn.',
            'Lập mô hình, giải và kiểm tra lại đáp án (thay số, vẽ đường mức hoặc tính thử vài giá trị lân cận).',
            'Nếu đáp án cần là số nguyên hoặc khó thực hiện, điều chỉnh thành phương án thực tế gần nhất.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tình huống và số liệu, mô hình, lời giải, phương án đề xuất và so sánh với cách lớp đã làm trước đây.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai công cụ tối ưu',
    instruction:
      'Chọn "Quy hoạch tuyến tính" để kéo đường mức $F = k$ qua miền chấp nhận được, hoặc "Dùng đạo hàm" để kéo điểm trên đồ thị hàm mục tiêu. Tìm phương án tối ưu rồi so sánh với lời giải bằng tính toán.',
  },
  examples: [
    {
      problem:
        'Mỗi sản phẩm loại I cần $1$ giờ trên máy A, $1$ giờ trên máy B và $2$ giờ trên máy C, lãi $3$ triệu đồng; mỗi sản phẩm loại II cần $1$ giờ trên máy A, $3$ giờ trên máy B và $1$ giờ trên máy C, lãi $5$ triệu đồng. Trong ngày, máy A chạy tối đa $8$ giờ, máy B $18$ giờ, máy C $14$ giờ. Làm bao nhiêu sản phẩm mỗi loại để lãi nhiều nhất?',
      steps: [
        'Gọi $x$, $y$ là số sản phẩm loại I, loại II. Lãi $F = 3x + 5y$ (triệu đồng).',
        'Ràng buộc: $x + y \\le 8$, $x + 3y \\le 18$, $2x + y \\le 14$, $x \\ge 0$, $y \\ge 0$.',
        'Miền chấp nhận được là ngũ giác $OABCD$ với $O(0; 0)$, $A(7; 0)$, $B(6; 2)$, $C(3; 5)$, $D(0; 6)$; chẳng hạn $C$ là giao của $x + y = 8$ và $x + 3y = 18$.',
        '$F(O) = 0$, $F(A) = 21$, $F(B) = 28$, $F(C) = 34$, $F(D) = 30$.',
      ],
      answer: 'Làm $3$ sản phẩm loại I và $5$ sản phẩm loại II, lãi lớn nhất $34$ triệu đồng.',
    },
    {
      problem:
        'Một xe khách chở tối đa $60$ hành khách. Nếu chuyến xe chở $x$ hành khách thì giá vé mỗi người là $\\left(3 - \\dfrac{x}{40}\\right)^2$ trăm nghìn đồng. Chuyến xe chở bao nhiêu hành khách thì doanh thu lớn nhất?',
      steps: [
        'Doanh thu $R(x) = x\\left(3 - \\dfrac{x}{40}\\right)^2$ (trăm nghìn đồng), $0 < x \\le 60$.',
        "$R'(x) = \\left(3 - \\dfrac{x}{40}\\right)^2 - \\dfrac{x}{20}\\left(3 - \\dfrac{x}{40}\\right) = \\left(3 - \\dfrac{x}{40}\\right)\\left(3 - \\dfrac{3x}{40}\\right)$.",
        "Trên $(0; 60]$, $R'(x) = 0 \\Leftrightarrow x = 40$; $R'$ đổi dấu từ dương sang âm tại $40$.",
        '$R(40) = 40 \\cdot 2^2 = 160$, lớn hơn $R(60) = 60 \\cdot 1{,}5^2 = 135$.',
      ],
      answer: 'Chở $40$ hành khách, doanh thu lớn nhất $160$ trăm nghìn đồng ($16$ triệu đồng).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Quán cà phê có $20$ kg cà phê Arabica và $30$ kg cà phê Robusta để pha hai loại hỗn hợp. Mỗi kilôgam hỗn hợp I gồm $0{,}5$ kg Arabica và $0{,}5$ kg Robusta, lãi $60$ nghìn đồng; mỗi kilôgam hỗn hợp II gồm $0{,}25$ kg Arabica và $0{,}75$ kg Robusta, lãi $40$ nghìn đồng. Tiền lãi lớn nhất là bao nhiêu nghìn đồng?',
      answer: 2600,
      unit: 'nghìn đồng',
      hints: [
        'Ràng buộc: $0{,}5x + 0{,}25y \\le 20$, $0{,}5x + 0{,}75y \\le 30$, tức $2x + y \\le 80$, $2x + 3y \\le 120$; $x, y \\ge 0$.',
        'Các đỉnh: $O(0; 0)$, $(40; 0)$, $(30; 20)$, $(0; 40)$.',
      ],
      solution:
        '$F = 60x + 40y$ tại các đỉnh: $0$; $2\\,400$; $1\\,800 + 800 = 2\\,600$; $1\\,600$. Lãi lớn nhất $2\\,600$ nghìn đồng khi pha $30$ kg hỗn hợp I và $20$ kg hỗn hợp II.',
    },
    {
      type: 'number',
      prompt:
        'Một đội thi công cần ít nhất $10$ người, trong đó ít nhất $2$ kĩ sư và ít nhất $3$ công nhân. Tiền công một ngày của kĩ sư là $500$ nghìn đồng, của công nhân là $400$ nghìn đồng. Tổng tiền công một ngày thấp nhất là bao nhiêu nghìn đồng?',
      answer: 4200,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$ kĩ sư, $y$ công nhân: $x + y \\ge 10$, $x \\ge 2$, $y \\ge 3$; $F = 500x + 400y$.',
        'Miền không bị chặn, có hai đỉnh $(2; 8)$ và $(7; 3)$.',
      ],
      solution:
        '$F(2; 8) = 1\\,000 + 3\\,200 = 4\\,200$, $F(7; 3) = 3\\,500 + 1\\,200 = 4\\,700$. Hệ số của $F$ dương nên đường mức giảm dần lần cuối chạm miền tại $(2; 8)$. Tiền công thấp nhất $4\\,200$ nghìn đồng với $2$ kĩ sư và $8$ công nhân.',
    },
    {
      type: 'choice',
      prompt:
        'Miền chấp nhận được của bài toán tìm giá trị lớn nhất của $F = 3x + 2y$ là miền không bị chặn chứa mọi điểm $(t; t)$ với $t \\ge 1$. Kết luận nào đúng?',
      options: [
        '$F$ không có giá trị lớn nhất trên miền.',
        '$F$ đạt giá trị lớn nhất tại đỉnh có hoành độ lớn nhất.',
        '$F$ đạt giá trị lớn nhất bằng $5$ tại $(1; 1)$.',
        'Không thể kết luận gì.',
      ],
      answer: 0,
      hints: ['Tính $F(t; t)$ và cho $t$ lớn dần.'],
      solution:
        '$F(t; t) = 5t$ lớn tuỳ ý khi $t$ tăng, và các điểm đó đều thuộc miền, nên $F$ không có giá trị lớn nhất.',
    },
    {
      type: 'number',
      prompt:
        'Dùng $120$ m lưới rào ba cạnh một mảnh vườn hình chữ nhật, cạnh thứ tư là bờ sông không cần rào. Diện tích lớn nhất của mảnh vườn là bao nhiêu mét vuông?',
      answer: 1800,
      unit: 'm²',
      hints: [
        'Gọi $x$ là cạnh vuông góc với bờ sông thì cạnh song song dài $120 - 2x$, $0 < x < 60$.',
      ],
      solution:
        "$S(x) = x(120 - 2x)$, $S'(x) = 120 - 4x = 0 \\Leftrightarrow x = 30$, $S'$ đổi dấu từ dương sang âm. Diện tích lớn nhất $S(30) = 30 \\cdot 60 = 1\\,800$ m².",
    },
    {
      type: 'number',
      prompt:
        'Một công ty làm thùng sơn hình trụ có nắp với thể tích cho trước. Vật liệu làm đáy và nắp có giá gấp đôi vật liệu làm thân thùng. Để chi phí vật liệu thấp nhất thì tỉ số $\\dfrac{h}{r}$ giữa chiều cao và bán kính đáy bằng bao nhiêu?',
      answer: 4,
      hints: [
        'Đặt giá vật liệu thân là $a$ mỗi đơn vị diện tích: chi phí $T = 2a \\cdot 2\\pi r^2 + a \\cdot 2\\pi rh$.',
        'Thay $h = \\dfrac{V}{\\pi r^2}$: $T(r) = a\\left(4\\pi r^2 + \\dfrac{2V}{r}\\right)$.',
      ],
      solution:
        "$T'(r) = a\\left(8\\pi r - \\dfrac{2V}{r^2}\\right) = 0 \\Leftrightarrow V = 4\\pi r^3$, $T'$ đổi dấu từ âm sang dương. Khi đó $h = \\dfrac{V}{\\pi r^2} = 4r$, nên $\\dfrac{h}{r} = 4$.",
    },
    {
      type: 'number',
      prompt:
        'Một bức tranh cao $1{,}4$ m treo trên tường, mép dưới cao hơn tầm mắt người xem $1{,}8$ m. Người xem phải đứng cách tường bao nhiêu mét để nhìn bức tranh dưới góc lớn nhất?',
      answer: 2.4,
      unit: 'm',
      hints: [
        'Đứng cách tường $x$ m, góc nhìn $\\theta$ có $\\tan\\theta = \\dfrac{\\dfrac{3{,}2}{x} - \\dfrac{1{,}8}{x}}{1 + \\dfrac{3{,}2 \\cdot 1{,}8}{x^2}} = \\dfrac{1{,}4x}{x^2 + 5{,}76}$.',
        '$\\theta$ nhọn nên $\\theta$ lớn nhất khi $\\tan\\theta$ lớn nhất.',
      ],
      solution:
        "Đặt $g(x) = \\dfrac{1{,}4x}{x^2 + 5{,}76}$, $g'(x) = \\dfrac{1{,}4(5{,}76 - x^2)}{(x^2 + 5{,}76)^2} = 0 \\Leftrightarrow x = 2{,}4$; $g'$ đổi dấu từ dương sang âm. Người xem đứng cách tường $2{,}4$ m.",
    },
    {
      type: 'number',
      prompt:
        'Hàm cầu của một sản phẩm là $p(x) = 300 - 2x$ (nghìn đồng), hàm chi phí là $C(x) = 1\\,000 + 60x$ (nghìn đồng). Lợi nhuận lớn nhất là bao nhiêu nghìn đồng?',
      answer: 6200,
      unit: 'nghìn đồng',
      hints: ['$P(x) = x(300 - 2x) - (1\\,000 + 60x) = -2x^2 + 240x - 1\\,000$.'],
      solution:
        "$P'(x) = -4x + 240 = 0 \\Leftrightarrow x = 60$, $P'$ đổi dấu từ dương sang âm. Lợi nhuận lớn nhất $P(60) = -7\\,200 + 14\\,400 - 1\\,000 = 6\\,200$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        'Chi phí sản xuất $x$ sản phẩm là $C(x) = 0{,}5x^2 + 20x + 450$ (nghìn đồng). Cần sản xuất bao nhiêu sản phẩm để chi phí trung bình mỗi sản phẩm nhỏ nhất?',
      answer: 30,
      hints: ['$\\overline{C}(x) = 0{,}5x + 20 + \\dfrac{450}{x}$, $x > 0$.'],
      solution:
        "$\\overline{C}'(x) = 0{,}5 - \\dfrac{450}{x^2} = 0 \\Leftrightarrow x^2 = 900 \\Leftrightarrow x = 30$, $\\overline{C}'$ đổi dấu từ âm sang dương. Chi phí trung bình nhỏ nhất $\\overline{C}(30) = 15 + 20 + 15 = 50$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        'Một sân hình tròn bán kính $6$ m được chiếu sáng bởi một bóng đèn treo trên cột ở tâm sân. Độ sáng tại mép sân là $E = c\\dfrac{\\sin\\alpha}{l^2}$, trong đó $l$ là khoảng cách từ đèn tới mép sân, $\\alpha$ là góc giữa tia sáng và mặt sân, $c$ là hằng số dương. Treo đèn cao bao nhiêu mét thì mép sân sáng nhất? (Làm tròn đến hàng phần trăm.)',
      answer: 4.24,
      tolerance: 0.005,
      unit: 'm',
      hints: [
        'Đèn cao $h$ thì $l = \\sqrt{h^2 + 36}$ và $\\sin\\alpha = \\dfrac{h}{l}$, nên $E = \\dfrac{ch}{(h^2 + 36)^{3/2}}$.',
        "$E'(h) = c\\dfrac{36 - 2h^2}{(h^2 + 36)^{5/2}}$.",
      ],
      solution:
        "$E'(h) = 0 \\Leftrightarrow h^2 = 18 \\Leftrightarrow h = 3\\sqrt{2} \\approx 4{,}24$ m; $E'$ đổi dấu từ dương sang âm tại đó nên mép sân sáng nhất.",
    },
    {
      type: 'number',
      prompt:
        'Cửa sổ gồm hình chữ nhật phía dưới và nửa hình tròn bán kính $r$ phía trên, chu vi cả cửa sổ là $8$ m. Tìm $r$ để cửa sổ có diện tích lớn nhất (làm tròn đến hàng phần trăm, đơn vị mét).',
      answer: 1.12,
      tolerance: 0.005,
      unit: 'm',
      hints: [
        'Chiều cao phần chữ nhật là $h = \\dfrac{8 - 2r - \\pi r}{2}$.',
        '$S(r) = 2rh + \\dfrac{\\pi r^2}{2} = 8r - \\left(2 + \\dfrac{\\pi}{2}\\right)r^2$.',
      ],
      solution:
        "$S'(r) = 8 - (4 + \\pi)r = 0 \\Leftrightarrow r = \\dfrac{8}{4 + \\pi} \\approx 1{,}12$ m, $S'$ đổi dấu từ dương sang âm. Diện tích lớn nhất khi $r \\approx 1{,}12$ m (bề rộng cửa sổ khoảng $2{,}24$ m).",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bài toán giải được bằng quy hoạch tuyến tính hai biến.',
      options: [
        'Chọn số xe loại A và loại B để chở đủ người và hàng với chi phí thấp nhất.',
        'Chọn bán kính đáy của lon nước có thể tích cho trước để tốn ít vật liệu nhất.',
        'Chọn khối lượng hai loại thức ăn để đủ chất dinh dưỡng với chi phí thấp nhất.',
        'Chọn chiều cao cột đèn để mép sân sáng nhất.',
      ],
      answers: [0, 2],
      hints: ['Quy hoạch tuyến tính cần hai ẩn, hàm mục tiêu và các ràng buộc đều bậc nhất.'],
      solution:
        'Bài toán thuê xe và bài toán khẩu phần có hai ẩn, chi phí và các ràng buộc bậc nhất. Bài toán lon nước và cột đèn có hàm mục tiêu một biến không bậc nhất ($2\\pi r^2 + \\dfrac{660}{r}$, $\\dfrac{ch}{(h^2 + 36)^{3/2}}$), giải bằng đạo hàm.',
    },
  ],
  takeaways: [
    'Hai ẩn, mục tiêu và ràng buộc bậc nhất: quy hoạch tuyến tính, tối ưu tại một đỉnh của miền chấp nhận được.',
    "Một biến, hàm mục tiêu bất kì: lập $f(x)$ trên $D$, dùng $f'(x)$ và bảng biến thiên (hoặc so sánh với đầu mút).",
    'Luôn kiểm tra đáp án có hợp lí trong thực tế (số nguyên, đơn vị, điều kiện của biến).',
  ],
};
