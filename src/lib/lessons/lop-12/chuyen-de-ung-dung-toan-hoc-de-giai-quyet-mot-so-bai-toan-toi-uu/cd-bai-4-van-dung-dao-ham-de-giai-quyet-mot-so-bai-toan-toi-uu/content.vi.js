/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vận dụng đạo hàm giải bài toán tối ưu: chọn biến, lập hàm mục tiêu trên miền xác định, tìm giá trị lớn nhất hoặc nhỏ nhất bằng đạo hàm, áp dụng cho bài toán thực tiễn và kinh tế (chi phí, doanh thu, lợi nhuận).',
  intro:
    'Lon nước ngọt $330$ ml nên có bán kính đáy bao nhiêu để tốn ít vỏ nhất? Người đánh cá nên cập bờ ở đâu để về nhà nhanh nhất? Cửa hàng nên giảm giá bao nhiêu để lãi nhiều nhất? Mỗi câu hỏi là một bài toán tối ưu: biểu diễn đại lượng cần tối ưu thành một hàm số rồi dùng đạo hàm tìm giá trị lớn nhất, nhỏ nhất của nó.',
  objectives: [
    'Lập hàm mục tiêu của một bài toán tối ưu: chọn biến, đặt điều kiện, biểu diễn đại lượng cần tối ưu theo biến.',
    'Tìm giá trị lớn nhất, nhỏ nhất của hàm mục tiêu bằng đạo hàm và bảng biến thiên.',
    'Giải các bài toán tối ưu trong thực tiễn (vật liệu, thời gian, quãng đường) và trong kinh tế (chi phí trung bình, lợi nhuận).',
  ],
  sections: [
    {
      heading: '1. Các bước giải bài toán tối ưu bằng đạo hàm',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một đại lượng làm biến $x$, ghi đơn vị và tìm điều kiện của $x$ (tập $D$) từ ý nghĩa thực tế.',
            'Biểu diễn đại lượng cần tối ưu thành hàm số $f(x)$ trên $D$; nếu có hai đại lượng thay đổi, dùng điều kiện ràng buộc giữa chúng để rút một đại lượng theo đại lượng kia.',
            "Tính $f'(x)$, tìm các điểm mà $f'(x) = 0$ hoặc $f'(x)$ không tồn tại, rồi tìm giá trị lớn nhất hoặc nhỏ nhất của $f$ trên $D$.",
            'Trả lời câu hỏi của bài toán bằng ngôn ngữ thực tế, kèm đơn vị.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm giá trị lớn nhất, nhỏ nhất',
          text: "Trên đoạn $[a; b]$: so sánh giá trị của $f$ tại các điểm tới hạn trong khoảng $(a; b)$ và tại hai đầu mút $a$, $b$. Trên một khoảng (không chứa đầu mút): lập bảng biến thiên; nếu $f'$ đổi dấu từ âm sang dương tại điểm duy nhất $x_0$ thì $f(x_0)$ là giá trị nhỏ nhất, đổi dấu từ dương sang âm thì $f(x_0)$ là giá trị lớn nhất.",
        },
      ],
    },
    {
      heading: '2. Bài toán tối ưu trong thực tiễn',
      blocks: [
        {
          type: 'p',
          text: 'Lon nước ngọt hình trụ có nắp, thể tích $V = 330$ cm³, bán kính đáy $r$, chiều cao $h$. Vật liệu làm lon tỉ lệ với diện tích toàn phần $S = 2\\pi r^2 + 2\\pi rh$. Từ $\\pi r^2h = 330$ có $h = \\dfrac{330}{\\pi r^2}$, nên',
        },
        {
          type: 'tex',
          tex: "S(r) = 2\\pi r^2 + \\frac{660}{r},\\ r > 0; \\qquad S'(r) = 4\\pi r - \\frac{660}{r^2} = \\frac{4\\pi r^3 - 660}{r^2}.",
        },
        {
          type: 'p',
          text: "$S'(r) = 0 \\Leftrightarrow r = r_0 = \\sqrt[3]{\\dfrac{165}{\\pi}} \\approx 3{,}74$ cm. $S'(r) < 0$ trên $(0; r_0)$ và $S'(r) > 0$ trên $(r_0; +\\infty)$, nên $S$ nhỏ nhất tại $r_0$: $S \\approx 264{,}4$ cm². Khi đó $h = \\dfrac{330}{\\pi r_0^2} = \\dfrac{2 \\cdot 165}{\\pi r_0^2} = \\dfrac{2r_0^3}{r_0^2} = 2r_0$: chiều cao bằng đường kính đáy.",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Lon $330$ ml thật thường cao khoảng $11{,}5$ cm, cao hơn hẳn đường kính đáy, vì nắp và đáy dày hơn thân, còn phải tính phần mép gấp và cho vừa tay cầm. Mô hình toán học cho một đáp án lí tưởng; người thiết kế điều chỉnh theo các yếu tố khác.',
        },
      ],
    },
    {
      heading: '3. Bài toán tối ưu trong kinh tế',
      blocks: [
        {
          type: 'p',
          text: 'Khi sản xuất (hoặc bán) $x$ đơn vị sản phẩm, ta thường dùng các hàm số sau.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Kí hiệu, công thức'],
          rows: [
            ['Hàm chi phí', '$C(x)$: tổng chi phí sản xuất $x$ đơn vị'],
            ['Chi phí trung bình', '$\\overline{C}(x) = \\dfrac{C(x)}{x}$'],
            ['Chi phí biên', "$C'(x)$: xấp xỉ chi phí làm thêm một đơn vị khi đã làm $x$ đơn vị"],
            ['Hàm cầu', '$p(x)$: giá bán mỗi đơn vị để bán được $x$ đơn vị'],
            ['Doanh thu', '$R(x) = x \\cdot p(x)$'],
            ['Lợi nhuận', '$P(x) = R(x) - C(x)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Lợi nhuận lớn nhất',
          text: "Tại mức sản xuất cho lợi nhuận lớn nhất (bên trong miền xác định) có $P'(x) = 0$, tức $R'(x) = C'(x)$: doanh thu tăng thêm khi bán thêm một đơn vị bằng chi phí biên.",
        },
        {
          type: 'p',
          text: "Ví dụ, nếu $C(x) = 0{,}01x^2 + 10x + 400$ (nghìn đồng) thì chi phí trung bình $\\overline{C}(x) = 0{,}01x + 10 + \\dfrac{400}{x}$ có $\\overline{C}'(x) = 0{,}01 - \\dfrac{400}{x^2} = 0 \\Leftrightarrow x = 200$. Làm $200$ sản phẩm thì chi phí trung bình nhỏ nhất, bằng $14$ nghìn đồng mỗi sản phẩm.",
        },
      ],
    },
    {
      heading: 'Dự án: Thiết kế bao bì tiết kiệm vật liệu',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm tra xem một bao bì quen thuộc (lon nước, hộp sữa, hộp giấy) đã được thiết kế tiết kiệm vật liệu chưa, và đề xuất kích thước tối ưu.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: vài lon hoặc hộp có ghi thể tích, thước kẻ hoặc thước dây, máy tính cầm tay hoặc bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo bán kính đáy (hoặc các cạnh) và chiều cao của từng bao bì; ghi thể tích in trên nhãn.',
            'Lập hàm diện tích vật liệu theo một biến khi giữ nguyên thể tích, tính đạo hàm và tìm kích thước làm diện tích nhỏ nhất.',
            'So sánh kích thước thật với kích thước tối ưu; tính xem bao bì thật tốn thêm bao nhiêu phần trăm vật liệu.',
            'Thảo luận vì sao nhà sản xuất có thể không chọn kích thước tối ưu (cầm tay, xếp kệ, độ dày nắp, thẩm mĩ).',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số đo, hàm mục tiêu và lời giải, bảng so sánh thật với tối ưu và kết luận của nhóm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo biến, tìm điểm tối ưu',
    instruction:
      'Chọn một bài toán. Kéo điểm trên đồ thị (hoặc thanh trượt) và quan sát tiếp tuyến màu cam cùng dấu của đạo hàm. Điểm tối ưu là nơi tiếp tuyến nằm ngang và đạo hàm đổi dấu. Với lon nước, hình lon bên cạnh thay đổi theo bán kính.',
  },
  examples: [
    {
      problem:
        'Người đánh cá ở trên thuyền tại $A$, cách bờ biển $AP = 2$ km ($P$ trên bờ). Nhà anh ở $B$ trên bờ, $PB = 6$ km. Anh chèo thuyền với vận tốc $3$ km/h tới điểm $Q$ nằm giữa $P$ và $B$, rồi đi bộ với vận tốc $5$ km/h về $B$. Chọn $Q$ để thời gian về nhà ngắn nhất.',
      steps: [
        'Đặt $x = PQ$ (km), $0 \\le x \\le 6$. Quãng chèo thuyền $AQ = \\sqrt{x^2 + 4}$, quãng đi bộ $QB = 6 - x$.',
        "Thời gian: $T(x) = \\dfrac{\\sqrt{x^2 + 4}}{3} + \\dfrac{6 - x}{5}$, $T'(x) = \\dfrac{x}{3\\sqrt{x^2 + 4}} - \\dfrac{1}{5}$.",
        "$T'(x) = 0 \\Leftrightarrow 5x = 3\\sqrt{x^2 + 4} \\Leftrightarrow 25x^2 = 9x^2 + 36$ (với $x \\ge 0$) $\\Leftrightarrow x = \\dfrac{3}{2}$.",
        '$T(0) = \\dfrac{28}{15} \\approx 1{,}87$; $T\\left(\\dfrac{3}{2}\\right) = \\dfrac{5}{6} + \\dfrac{9}{10} = \\dfrac{26}{15} \\approx 1{,}73$; $T(6) = \\dfrac{\\sqrt{40}}{3} \\approx 2{,}11$.',
      ],
      answer:
        'Cập bờ tại $Q$ cách $P$ một khoảng $1{,}5$ km; thời gian ngắn nhất là $\\dfrac{26}{15}$ giờ, khoảng $1$ giờ $44$ phút.',
    },
    {
      problem:
        'Một cửa hàng nhập xe máy với giá $27$ triệu đồng/chiếc và bán $31$ triệu đồng/chiếc thì mỗi năm bán được $600$ chiếc. Cứ giảm giá bán $1$ triệu đồng thì bán thêm được $200$ chiếc mỗi năm. Cửa hàng nên bán với giá bao nhiêu để lợi nhuận lớn nhất?',
      steps: [
        'Gọi $x$ (triệu đồng) là số tiền giảm giá, $0 \\le x \\le 4$ (giảm quá $4$ triệu thì bán dưới giá nhập). Số xe bán được là $600 + 200x$, lãi mỗi xe là $31 - x - 27 = 4 - x$.',
        'Lợi nhuận: $P(x) = (600 + 200x)(4 - x) = -200x^2 + 200x + 2\\,400$.',
        "$P'(x) = -400x + 200 = 0 \\Leftrightarrow x = 0{,}5$; $P'$ đổi dấu từ dương sang âm tại $0{,}5$.",
        '$P(0) = 2\\,400$, $P(0{,}5) = 2\\,450$, $P(4) = 0$. Lợi nhuận lớn nhất $2\\,450$ triệu đồng khi $x = 0{,}5$.',
      ],
      answer:
        'Bán $30{,}5$ triệu đồng/chiếc: mỗi năm bán $700$ chiếc, lợi nhuận lớn nhất $2\\,450$ triệu đồng.',
    },
    {
      problem:
        'Biết $C(x) = 16\\,000 + 500x - 1{,}64x^2 + 0{,}004x^3$ (nghìn đồng) là hàm chi phí sản xuất $x$ sản phẩm. Tính chi phí biên tại mức $x = 100$ và nêu ý nghĩa.',
      steps: ["$C'(x) = 500 - 3{,}28x + 0{,}012x^2$.", "$C'(100) = 500 - 328 + 120 = 292$."],
      answer:
        'Chi phí biên tại $x = 100$ là $292$ nghìn đồng: khi đã làm $100$ sản phẩm, làm thêm sản phẩm thứ $101$ tốn khoảng $292$ nghìn đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Trong các hình chữ nhật có chu vi $40$ cm, hình có diện tích lớn nhất có diện tích bằng bao nhiêu?',
      answer: 100,
      unit: 'cm²',
      hints: [
        'Gọi một cạnh là $x$ thì cạnh kia là $20 - x$, $0 < x < 20$.',
        'Tìm giá trị lớn nhất của $S(x) = x(20 - x)$.',
      ],
      solution:
        "$S(x) = 20x - x^2$, $S'(x) = 20 - 2x = 0 \\Leftrightarrow x = 10$; $S'$ đổi dấu từ dương sang âm. Diện tích lớn nhất $S(10) = 100$ cm² (hình vuông cạnh $10$ cm).",
    },
    {
      type: 'number',
      prompt:
        'Từ tấm bìa hình vuông cạnh $30$ cm, cắt ở bốn góc bốn hình vuông bằng nhau cạnh $x$ cm rồi gập thành hộp không nắp. Tìm $x$ để hộp có thể tích lớn nhất.',
      answer: 5,
      unit: 'cm',
      hints: [
        'Đáy hộp là hình vuông cạnh $30 - 2x$, chiều cao $x$, $0 < x < 15$.',
        "$V'(x) = (30 - 2x)(30 - 6x)$.",
      ],
      solution:
        "$V(x) = x(30 - 2x)^2$, $V'(x) = (30 - 2x)^2 - 4x(30 - 2x) = (30 - 2x)(30 - 6x)$. Trên $(0; 15)$, $V' = 0 \\Leftrightarrow x = 5$ và $V'$ đổi dấu từ dương sang âm. Vậy $x = 5$ cm, khi đó $V = 5 \\cdot 20^2 = 2\\,000$ cm³.",
    },
    {
      type: 'choice',
      prompt:
        'Một chiếc cốc hình trụ không nắp có thể tích $V$ cho trước. Để tốn ít vật liệu nhất (diện tích đáy cộng diện tích xung quanh nhỏ nhất), chiều cao $h$ và bán kính đáy $r$ phải thoả mãn',
      options: ['$h = r$', '$h = 2r$', '$h = \\dfrac{r}{2}$', '$h = 3r$'],
      answer: 0,
      hints: [
        '$S = \\pi r^2 + 2\\pi rh$ với $h = \\dfrac{V}{\\pi r^2}$, nên $S(r) = \\pi r^2 + \\dfrac{2V}{r}$.',
      ],
      solution:
        "$S'(r) = 2\\pi r - \\dfrac{2V}{r^2} = 0 \\Leftrightarrow r^3 = \\dfrac{V}{\\pi}$, và $S'$ đổi dấu từ âm sang dương. Khi đó $h = \\dfrac{V}{\\pi r^2} = \\dfrac{\\pi r^3}{\\pi r^2} = r$.",
    },
    {
      type: 'number',
      prompt:
        'Thuyền ở $A$ cách bờ $AP = 3$ km, nhà ở $B$ trên bờ với $PB = 8$ km. Người chèo thuyền với vận tốc $4$ km/h tới điểm $Q$ trên đoạn $PB$ rồi đi bộ với vận tốc $5$ km/h về $B$. Khoảng cách $PQ$ bằng bao nhiêu kilômét thì thời gian về nhà ngắn nhất?',
      answer: 4,
      unit: 'km',
      hints: [
        '$T(x) = \\dfrac{\\sqrt{x^2 + 9}}{4} + \\dfrac{8 - x}{5}$ với $x = PQ \\in [0; 8]$.',
        "$T'(x) = 0 \\Leftrightarrow 5x = 4\\sqrt{x^2 + 9}$.",
      ],
      solution:
        "$T'(x) = \\dfrac{x}{4\\sqrt{x^2 + 9}} - \\dfrac{1}{5} = 0 \\Leftrightarrow 25x^2 = 16(x^2 + 9) \\Leftrightarrow x^2 = 16 \\Leftrightarrow x = 4$. So sánh $T(0) = 2{,}35$, $T(4) = 1{,}25 + 0{,}8 = 2{,}05$, $T(8) = \\dfrac{\\sqrt{73}}{4} \\approx 2{,}14$: thời gian ngắn nhất khi $PQ = 4$ km.",
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng nhập một loại tủ lạnh giá $40$ triệu đồng/chiếc, bán $50$ triệu đồng/chiếc thì mỗi tháng bán được $100$ chiếc. Cứ giảm giá $1$ triệu đồng thì bán thêm $20$ chiếc mỗi tháng. Giá bán mới (triệu đồng/chiếc) để lợi nhuận lớn nhất là bao nhiêu?',
      answer: 47.5,
      unit: 'triệu đồng',
      hints: [
        'Giảm $x$ triệu đồng: bán $100 + 20x$ chiếc, lãi mỗi chiếc $10 - x$.',
        '$P(x) = (100 + 20x)(10 - x) = -20x^2 + 100x + 1\\,000$.',
      ],
      solution:
        "$P'(x) = -40x + 100 = 0 \\Leftrightarrow x = 2{,}5$, $P'$ đổi dấu từ dương sang âm. Giá bán mới $50 - 2{,}5 = 47{,}5$ triệu đồng/chiếc, lợi nhuận lớn nhất $P(2{,}5) = 1\\,125$ triệu đồng mỗi tháng.",
    },
    {
      type: 'number',
      prompt:
        'Chi phí sản xuất $x$ sản phẩm là $C(x) = 2x^2 + 50x + 800$ (nghìn đồng). Chi phí trung bình mỗi sản phẩm nhỏ nhất là bao nhiêu nghìn đồng?',
      answer: 130,
      unit: 'nghìn đồng',
      hints: ['$\\overline{C}(x) = \\dfrac{C(x)}{x} = 2x + 50 + \\dfrac{800}{x}$, $x > 0$.'],
      solution:
        "$\\overline{C}'(x) = 2 - \\dfrac{800}{x^2} = 0 \\Leftrightarrow x = 20$, và $\\overline{C}'$ đổi dấu từ âm sang dương. Chi phí trung bình nhỏ nhất $\\overline{C}(20) = 40 + 50 + 40 = 130$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        'Hàm cầu của một sản phẩm là $p(x) = 200 - 0{,}5x$ (nghìn đồng), hàm chi phí là $C(x) = 2\\,000 + 40x$ (nghìn đồng). Cần sản xuất bao nhiêu sản phẩm để lợi nhuận lớn nhất?',
      answer: 160,
      hints: [
        '$R(x) = x \\cdot p(x) = 200x - 0{,}5x^2$.',
        '$P(x) = R(x) - C(x) = -0{,}5x^2 + 160x - 2\\,000$.',
      ],
      solution:
        "$P'(x) = -x + 160 = 0 \\Leftrightarrow x = 160$, $P'$ đổi dấu từ dương sang âm. Sản xuất $160$ sản phẩm, lợi nhuận lớn nhất $P(160) = 10\\,800$ nghìn đồng.",
    },
    {
      type: 'number',
      prompt:
        "Với hàm chi phí $C(x) = 16\\,000 + 500x - 1{,}64x^2 + 0{,}004x^3$ (nghìn đồng), tính chi phí biên $C'(50)$ (nghìn đồng).",
      answer: 366,
      hints: ["$C'(x) = 500 - 3{,}28x + 0{,}012x^2$."],
      solution: "$C'(50) = 500 - 164 + 30 = 366$ (nghìn đồng).",
    },
    {
      type: 'choice',
      prompt:
        "Hàm số $f$ liên tục trên đoạn $[0; 10]$ có $f'(x) = 0$ duy nhất tại $x = 4$. Để tìm giá trị lớn nhất của $f$ trên $[0; 10]$, cách làm đúng là",
      options: [
        'So sánh $f(0)$, $f(4)$ và $f(10)$.',
        'Kết luận ngay giá trị lớn nhất là $f(4)$.',
        'Chỉ so sánh $f(0)$ và $f(10)$.',
        "Tính $f'(4)$ và lấy đó làm giá trị lớn nhất.",
      ],
      answer: 0,
      hints: ['Trên một đoạn, giá trị lớn nhất có thể đạt tại đầu mút.'],
      solution:
        'Trên đoạn $[a; b]$, giá trị lớn nhất là số lớn nhất trong các giá trị tại điểm tới hạn và tại hai đầu mút, nên phải so sánh $f(0)$, $f(4)$, $f(10)$. Điểm $x = 4$ có thể là điểm cực tiểu.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán tối ưu bằng đạo hàm.',
      items: [
        'Chọn biến $x$ và tìm điều kiện của $x$.',
        'Biểu diễn đại lượng cần tối ưu thành hàm số $f(x)$.',
        "Tính $f'(x)$ và lập bảng biến thiên (hoặc so sánh các giá trị).",
        'Kết luận theo yêu cầu của bài toán.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Có biến mới lập được hàm; có hàm mới tính được đạo hàm.'],
      solution:
        'Chọn biến và điều kiện, lập hàm mục tiêu, dùng đạo hàm tìm giá trị lớn nhất hoặc nhỏ nhất, rồi trả lời bài toán.',
    },
  ],
  takeaways: [
    "Bài toán tối ưu: chọn biến, đặt điều kiện, lập hàm mục tiêu $f(x)$, dùng $f'(x)$ tìm giá trị lớn nhất hoặc nhỏ nhất.",
    'Trên đoạn, so sánh giá trị tại điểm tới hạn và đầu mút; trên khoảng, dùng bảng biến thiên.',
    "Kinh tế: $\\overline{C}(x) = \\dfrac{C(x)}{x}$, chi phí biên $C'(x)$, doanh thu $R(x) = x \\cdot p(x)$, lợi nhuận $P(x) = R(x) - C(x)$.",
  ],
};
