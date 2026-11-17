/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đạo hàm là tốc độ thay đổi tức thời của một đại lượng (vận tốc, gia tốc, chi phí biên) và là công cụ giải các bài toán tối ưu thực tế như làm hộp có thể tích lớn nhất hay tốn ít vật liệu nhất.',
  intro:
    'Từ một tấm bìa hình vuông, ta cắt bốn hình vuông nhỏ ở bốn góc rồi gấp lên thành một chiếc hộp không nắp. Cắt nhỏ quá thì hộp quá nông, cắt to quá thì đáy hộp quá bé. Cắt bao nhiêu thì hộp chứa được nhiều nhất? Đạo hàm trả lời chính xác câu hỏi đó, và cả những câu hỏi về tốc độ thay đổi của các đại lượng trong đời sống.',
  objectives: [
    'Hiểu đạo hàm là tốc độ thay đổi tức thời của một đại lượng theo một đại lượng khác.',
    'Tính vận tốc, gia tốc, chi phí biên bằng đạo hàm.',
    'Giải một số bài toán tối ưu đơn giản bằng cách tìm giá trị lớn nhất, nhỏ nhất của hàm số.',
  ],
  sections: [
    {
      heading: 'Tốc độ thay đổi của một đại lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tốc độ thay đổi',
          text: "Nếu đại lượng $y$ phụ thuộc đại lượng $x$ theo hàm số $y = f(x)$ thì tỉ số $\\dfrac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$ là tốc độ thay đổi trung bình của $y$ khi $x$ đi từ $x_0$ đến $x_0 + \\Delta x$, còn đạo hàm $f'(x_0)$ là tốc độ thay đổi tức thời của $y$ theo $x$ tại $x = x_0$.",
        },
        {
          type: 'list',
          items: [
            "Vật lí: nếu $s = s(t)$ là quãng đường (toạ độ) của vật theo thời gian $t$ thì $v(t) = s'(t)$ là vận tốc tức thời, và $a(t) = v'(t)$ là gia tốc tức thời của vật.",
            "Kinh tế: nếu $C(x)$ là chi phí để sản xuất $x$ đơn vị sản phẩm thì $C'(x)$ gọi là chi phí biên; $C'(x)$ xấp xỉ chi phí để sản xuất thêm một đơn vị sau $x$ đơn vị: $C(x + 1) - C(x) \\approx C'(x)$.",
            'Các đại lượng khác: tốc độ phản ứng là đạo hàm của nồng độ theo thời gian, tốc độ tăng dân số là đạo hàm của số dân theo thời gian.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Dấu của đạo hàm cho biết đại lượng đang tăng hay giảm: $v(t) > 0$ thì vật đi theo chiều dương, $v(t) = 0$ thì vật dừng lại (tức thời) và có thể đổi chiều.',
        },
      ],
    },
    {
      heading: 'Bài toán tối ưu',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều bài toán thực tế yêu cầu tìm cách làm cho một đại lượng lớn nhất (thể tích, lợi nhuận) hoặc nhỏ nhất (chi phí, vật liệu, thời gian). Ta đưa chúng về bài toán tìm giá trị lớn nhất, nhỏ nhất của một hàm số:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một đại lượng làm ẩn $x$ và tìm điều kiện của $x$ (miền $D$) từ ý nghĩa thực tế.',
            'Biểu diễn đại lượng cần tối ưu thành một hàm số $f(x)$ trên $D$.',
            'Tìm giá trị lớn nhất hoặc nhỏ nhất của $f(x)$ trên $D$ (bằng bảng biến thiên hoặc so sánh các giá trị).',
            'Trả lời bài toán thực tế, kèm đơn vị.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hộp không nắp',
          text: "Tấm bìa vuông cạnh $a$, cắt bốn hình vuông cạnh $x$ ở bốn góc ($0 < x < \\dfrac{a}{2}$). Hộp có đáy là hình vuông cạnh $a - 2x$ và chiều cao $x$, nên $V(x) = x(a - 2x)^2$ và $V'(x) = (a - 2x)(a - 6x)$. $V'$ đổi dấu từ dương sang âm tại $x = \\dfrac{a}{6}$, nên thể tích lớn nhất là $V\\left(\\dfrac{a}{6}\\right) = \\dfrac{2a^3}{27}$.",
        },
      ],
    },
  ],
  explore: {
    title: 'Làm hộp không nắp',
    instruction:
      "Chọn cạnh tấm bìa, rồi kéo chấm đỏ ở góc tấm bìa (hoặc điểm trên đồ thị $V(x)$, hoặc dùng phím mũi tên) để đổi cạnh $x$ của hình vuông bị cắt. Theo dõi chiếc hộp, thể tích và dấu của $V'(x)$ để tìm vết cắt cho thể tích lớn nhất.",
  },
  examples: [
    {
      problem:
        'Một vật chuyển động thẳng có phương trình $s(t) = t^3 - 6t^2 + 9t$ ($s$ tính bằng mét, $t$ tính bằng giây, $t \\ge 0$). Tính vận tốc và gia tốc của vật tại $t = 4$ s. Vật dừng lại tại những thời điểm nào?',
      steps: [
        "$v(t) = s'(t) = 3t^2 - 12t + 9$, nên $v(4) = 48 - 48 + 9 = 9$ (m/s).",
        "$a(t) = v'(t) = 6t - 12$, nên $a(4) = 24 - 12 = 12$ (m/s²).",
        '$v(t) = 0 \\Leftrightarrow 3(t - 1)(t - 3) = 0 \\Leftrightarrow t = 1$ hoặc $t = 3$.',
      ],
      answer: '$v(4) = 9$ m/s, $a(4) = 12$ m/s²; vật dừng lại tại $t = 1$ s và $t = 3$ s.',
    },
    {
      problem:
        'Chi phí để sản xuất $x$ sản phẩm là $C(x) = 0{,}01x^2 + 20x + 5\\,000$ (nghìn đồng). Tính chi phí biên tại $x = 100$ và nêu ý nghĩa.',
      steps: [
        "$C'(x) = 0{,}02x + 20$.",
        "$C'(100) = 2 + 20 = 22$ (nghìn đồng/sản phẩm).",
        'So sánh: $C(101) - C(100) = 0{,}01(101^2 - 100^2) + 20 = 22{,}01$, rất gần $22$.',
      ],
      answer:
        'Chi phí biên tại $x = 100$ là $22$ nghìn đồng: sản xuất thêm sản phẩm thứ $101$ tốn khoảng $22$ nghìn đồng.',
    },
    {
      problem:
        'Từ một tấm bìa hình vuông cạnh $12$ cm, người ta cắt bốn hình vuông bằng nhau ở bốn góc rồi gấp lên thành một chiếc hộp không nắp. Tìm cạnh của hình vuông bị cắt để hộp có thể tích lớn nhất.',
      steps: [
        'Gọi $x$ (cm) là cạnh hình vuông bị cắt, điều kiện $0 < x < 6$.',
        'Đáy hộp là hình vuông cạnh $12 - 2x$, chiều cao $x$: $V(x) = x(12 - 2x)^2 = 4x^3 - 48x^2 + 144x$.',
        "$V'(x) = 12x^2 - 96x + 144 = 12(x - 2)(x - 6)$; trên $(0; 6)$, $V'(x) = 0 \\Leftrightarrow x = 2$.",
        "$V' > 0$ trên $(0; 2)$ và $V' < 0$ trên $(2; 6)$, nên $V$ đạt giá trị lớn nhất trên $(0; 6)$ tại $x = 2$: $V(2) = 2 \\cdot 8^2 = 128$.",
      ],
      answer: 'Cắt hình vuông cạnh $2$ cm; thể tích lớn nhất là $128$ cm³.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một vật chuyển động có phương trình $s(t) = t^3 - 3t^2 + 5t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính vận tốc của vật tại $t = 2$ s.',
      answer: 5,
      unit: 'm/s',
      hints: ["Vận tốc $v(t) = s'(t)$.", "$s'(t) = 3t^2 - 6t + 5$."],
      solution: '$v(t) = 3t^2 - 6t + 5$, nên $v(2) = 12 - 12 + 5 = 5$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Với vật chuyển động $s(t) = t^3 - 3t^2 + 5t$ ở bài trên, tính gia tốc của vật tại $t = 3$ s (theo m/s²).',
      answer: 12,
      hints: ["Gia tốc $a(t) = v'(t) = s''(t)$.", '$v(t) = 3t^2 - 6t + 5$ nên $a(t) = 6t - 6$.'],
      solution: '$a(t) = 6t - 6$, nên $a(3) = 18 - 6 = 12$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Chi phí sản xuất $x$ sản phẩm là $C(x) = x^2 + 30x + 400$ (nghìn đồng). Tính chi phí biên tại $x = 50$ (theo nghìn đồng).',
      answer: 130,
      hints: ["Chi phí biên là $C'(x)$.", "$C'(x) = 2x + 30$."],
      solution:
        "$C'(50) = 2 \\cdot 50 + 30 = 130$ nghìn đồng: sản phẩm thứ $51$ tốn khoảng $130$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        'Trong các hình chữ nhật có chu vi $40$ cm, hình chữ nhật có diện tích lớn nhất bằng bao nhiêu?',
      answer: 100,
      unit: 'cm²',
      hints: [
        'Gọi một cạnh là $x$ thì cạnh kia là $20 - x$, với $0 < x < 20$.',
        "$S(x) = x(20 - x)$, $S'(x) = 20 - 2x$.",
      ],
      solution:
        "$S'(x) = 0 \\Leftrightarrow x = 10$; $S' > 0$ trên $(0; 10)$, $S' < 0$ trên $(10; 20)$. Diện tích lớn nhất là $S(10) = 100$ cm², khi hình chữ nhật là hình vuông cạnh $10$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Từ tấm bìa hình vuông cạnh $18$ cm, cắt bốn hình vuông bằng nhau ở bốn góc rồi gấp thành hộp không nắp. Cạnh hình vuông bị cắt bằng bao nhiêu thì hộp có thể tích lớn nhất?',
      answer: 3,
      unit: 'cm',
      hints: ['$V(x) = x(18 - 2x)^2$ với $0 < x < 9$.', "$V'(x) = (18 - 2x)(18 - 6x)$."],
      solution:
        "$V'(x) = (18 - 2x)(18 - 6x) = 0$ trên $(0; 9)$ khi $x = 3$; $V'$ đổi dấu từ dương sang âm tại đó. Cắt hình vuông cạnh $3$ cm, thể tích lớn nhất $V(3) = 3 \\cdot 12^2 = 432$ cm³.",
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng được ném thẳng đứng lên trên, độ cao của nó là $h(t) = 2 + 24{,}5t - 4{,}9t^2$ (mét) sau $t$ giây. Quả bóng lên cao nhất bao nhiêu mét?',
      answer: 32.625,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        "Bóng lên cao nhất khi vận tốc $h'(t) = 0$.",
        "$h'(t) = 24{,}5 - 9{,}8t = 0 \\Leftrightarrow t = 2{,}5$.",
      ],
      solution:
        "$h'(t) = 24{,}5 - 9{,}8t$ đổi dấu từ dương sang âm tại $t = 2{,}5$ s. Độ cao lớn nhất là $h(2{,}5) = 2 + 61{,}25 - 30{,}625 = 32{,}625$ m.",
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng ước tính nếu bán mỗi sản phẩm với giá $p$ nghìn đồng ($0 < p < 60$) thì doanh thu là $R(p) = p(120 - 2p)$ nghìn đồng. Giá bán bao nhiêu nghìn đồng thì doanh thu lớn nhất?',
      answer: 30,
      hints: ["$R(p) = 120p - 2p^2$, $R'(p) = 120 - 4p$.", "Giải $R'(p) = 0$ và kiểm tra đổi dấu."],
      solution:
        "$R'(p) = 0 \\Leftrightarrow p = 30$; $R' > 0$ trên $(0; 30)$, $R' < 0$ trên $(30; 60)$. Giá bán $30$ nghìn đồng cho doanh thu lớn nhất $R(30) = 30 \\cdot 60 = 1\\,800$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        'Cần xây một bể chứa hình hộp chữ nhật không nắp, đáy là hình vuông, thể tích $32$ m³. Cạnh đáy bằng bao nhiêu mét thì tổng diện tích đáy và bốn mặt bên nhỏ nhất (tốn ít vật liệu nhất)?',
      answer: 4,
      unit: 'm',
      hints: [
        'Gọi cạnh đáy là $x$, chiều cao $h = \\dfrac{32}{x^2}$.',
        "$S(x) = x^2 + 4xh = x^2 + \\dfrac{128}{x}$, $S'(x) = 2x - \\dfrac{128}{x^2}$.",
      ],
      solution:
        "$S'(x) = \\dfrac{2x^3 - 128}{x^2} = 0 \\Leftrightarrow x^3 = 64 \\Leftrightarrow x = 4$; $S'$ đổi dấu từ âm sang dương tại đó. Cạnh đáy $4$ m (chiều cao $2$ m), diện tích nhỏ nhất $S(4) = 16 + 32 = 48$ m².",
    },
  ],
  takeaways: [
    "$f'(x_0)$ là tốc độ thay đổi tức thời của $y = f(x)$ theo $x$ tại $x_0$.",
    "Vận tốc $v(t) = s'(t)$, gia tốc $a(t) = v'(t)$; chi phí biên $C'(x) \\approx C(x + 1) - C(x)$.",
    'Bài toán tối ưu: chọn ẩn và điều kiện, lập hàm số, tìm giá trị lớn nhất hoặc nhỏ nhất, trả lời kèm đơn vị.',
    'Hộp không nắp từ tấm bìa vuông cạnh $a$: cắt góc cạnh $\\dfrac{a}{6}$ cho thể tích lớn nhất $\\dfrac{2a^3}{27}$.',
  ],
};
