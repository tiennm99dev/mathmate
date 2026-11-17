/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán quy hoạch tuyến tính hai biến: lập hàm mục tiêu và hệ ràng buộc, vẽ miền chấp nhận được, tìm phương án tối ưu tại một đỉnh của miền bằng phương pháp hình học.',
  intro:
    'Một xưởng làm hai loại sản phẩm từ cùng một kho nguyên liệu và cùng một đội thợ. Làm mỗi loại bao nhiêu để lãi nhiều nhất? Thuê bao nhiêu xe mỗi loại để chở đủ người và hàng mà tốn ít tiền nhất? Những câu hỏi như vậy dẫn tới bài toán quy hoạch tuyến tính, giải được bằng hệ bất phương trình bậc nhất hai ẩn đã học ở lớp 10.',
  objectives: [
    'Lập mô hình bài toán quy hoạch tuyến tính: chọn ẩn, lập hàm mục tiêu và hệ ràng buộc.',
    'Vẽ miền chấp nhận được, tìm toạ độ các đỉnh và tìm phương án tối ưu tại một đỉnh của miền.',
    'Nhận biết khi miền chấp nhận được không là miền đa giác: hàm mục tiêu có thể không có giá trị lớn nhất hoặc nhỏ nhất.',
    'Vận dụng vào các bài toán sản xuất, khẩu phần ăn, thuê xe.',
  ],
  sections: [
    {
      heading: '1. Bài toán quy hoạch tuyến tính hai biến',
      blocks: [
        {
          type: 'p',
          text: 'Xưởng sản xuất hai loại sản phẩm I và II. Mỗi kilôgam sản phẩm loại I cần $2$ kg nguyên liệu và $30$ giờ làm, lãi $40$ nghìn đồng; mỗi kilôgam sản phẩm loại II cần $4$ kg nguyên liệu và $15$ giờ làm, lãi $30$ nghìn đồng. Xưởng có $200$ kg nguyên liệu và $1\\,200$ giờ làm. Gọi $x$, $y$ (kg) là khối lượng sản phẩm loại I, loại II. Tiền lãi là $F(x; y) = 40x + 30y$ (nghìn đồng) và $x$, $y$ phải thoả mãn',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} 2x + 4y \\le 200 \\\\ 30x + 15y \\le 1\\,200 \\\\ x \\ge 0,\\ y \\ge 0 \\end{cases} \\Leftrightarrow \\begin{cases} x + 2y \\le 100 \\\\ 2x + y \\le 80 \\\\ x \\ge 0,\\ y \\ge 0. \\end{cases}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bài toán quy hoạch tuyến tính',
          text: 'Bài toán tìm giá trị lớn nhất hoặc giá trị nhỏ nhất của biểu thức $F(x; y) = ax + by$ với $x$, $y$ thoả mãn một hệ bất phương trình bậc nhất hai ẩn gọi là bài toán quy hoạch tuyến tính (hai biến). $F$ là hàm mục tiêu, mỗi bất phương trình của hệ là một ràng buộc. Mỗi nghiệm $(x; y)$ của hệ là một phương án chấp nhận được; tập hợp các phương án đó là miền chấp nhận được. Phương án chấp nhận được làm $F$ đạt giá trị lớn nhất (hoặc nhỏ nhất) là phương án tối ưu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn ẩn: gọi $x$, $y$ là các đại lượng cần quyết định, ghi rõ đơn vị.',
            'Lập hàm mục tiêu $F(x; y) = ax + by$ (lãi, chi phí, …) và xác định cần tìm giá trị lớn nhất hay nhỏ nhất.',
            'Lập hệ ràng buộc từ các giới hạn của đề bài (nguyên liệu, thời gian, nhu cầu tối thiểu) và điều kiện $x \\ge 0$, $y \\ge 0$.',
          ],
        },
      ],
    },
    {
      heading: '2. Miền chấp nhận được là miền đa giác',
      blocks: [
        {
          type: 'p',
          text: 'Với mỗi số $k$, các điểm $(x; y)$ có $F(x; y) = k$ nằm trên đường thẳng $ax + by = k$, gọi là đường mức. Các đường mức song song với nhau. Khi $k$ thay đổi, đường mức trượt song song; giá trị lớn nhất (nhỏ nhất) của $F$ ứng với vị trí cuối cùng mà đường mức còn chạm miền chấp nhận được, và vị trí đó luôn đi qua một đỉnh của miền.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu miền chấp nhận được là một miền đa giác thì giá trị lớn nhất và giá trị nhỏ nhất của $F(x; y) = ax + by$ trên miền đó đều đạt được tại một đỉnh của đa giác.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ miền chấp nhận được (miền nghiệm của hệ ràng buộc).',
            'Tìm toạ độ các đỉnh: mỗi đỉnh là giao điểm của hai đường thẳng biên, tìm bằng cách giải hệ hai phương trình.',
            'Tính giá trị của $F$ tại từng đỉnh.',
            'So sánh: giá trị lớn nhất (nhỏ nhất) trong các giá trị đó là giá trị lớn nhất (nhỏ nhất) của $F$; đỉnh tương ứng là phương án tối ưu.',
          ],
        },
        {
          type: 'p',
          text: 'Với bài toán của xưởng, miền chấp nhận được là tứ giác $OABC$ với $O(0; 0)$, $A(40; 0)$, $B(20; 40)$, $C(0; 50)$; đỉnh $B$ là giao điểm của $x + 2y = 100$ và $2x + y = 80$.',
        },
        {
          type: 'table',
          head: ['Đỉnh', '$O(0; 0)$', '$A(40; 0)$', '$B(20; 40)$', '$C(0; 50)$'],
          rows: [['$F = 40x + 30y$', '$0$', '$1\\,600$', '$2\\,000$', '$1\\,500$']],
          caption: 'Giá trị lớn nhất của $F$ là $2\\,000$, đạt tại $B(20; 40)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu hai đỉnh kề nhau cùng cho giá trị tối ưu thì mọi điểm trên cạnh nối hai đỉnh đó đều là phương án tối ưu: khi đó cạnh ấy song song với đường mức.',
        },
      ],
    },
    {
      heading: '3. Miền chấp nhận được không là miền đa giác',
      blocks: [
        {
          type: 'p',
          text: 'Khi miền chấp nhận được không bị chặn (không là miền đa giác), hàm mục tiêu có thể không có giá trị lớn nhất hoặc không có giá trị nhỏ nhất: đường mức trượt mãi theo một hướng mà vẫn cắt miền. Nếu $F$ có giá trị lớn nhất (nhỏ nhất) thì giá trị đó vẫn đạt tại một đỉnh của miền.',
        },
        {
          type: 'p',
          text: 'Ví dụ, khẩu phần cần ít nhất $3$ đơn vị chất đạm và $4$ đơn vị vitamin. Mỗi kilôgam thức ăn I chứa $1$ đơn vị chất đạm và $1$ đơn vị vitamin, giá $30$ nghìn đồng; mỗi kilôgam thức ăn II chứa $1$ đơn vị chất đạm và $2$ đơn vị vitamin, giá $40$ nghìn đồng. Chi phí $F = 30x + 40y$ với $x + y \\ge 3$, $x + 2y \\ge 4$, $x \\ge 0$, $y \\ge 0$. Miền chấp nhận được không bị chặn, có ba đỉnh $A(0; 3)$, $B(2; 1)$, $C(4; 0)$.',
        },
        {
          type: 'table',
          head: ['Đỉnh', '$A(0; 3)$', '$B(2; 1)$', '$C(4; 0)$'],
          rows: [['$F = 30x + 40y$', '$120$', '$100$', '$120$']],
        },
        {
          type: 'p',
          text: 'Giảm $k$ thì đường mức $30x + 40y = k$ tiến về phía gốc toạ độ và lần cuối chạm miền tại $B(2; 1)$, nên chi phí nhỏ nhất là $100$ nghìn đồng. Tăng $k$ thì đường mức luôn cắt miền, nên $F$ không có giá trị lớn nhất.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Với miền không bị chặn, chỉ so sánh giá trị tại các đỉnh là chưa đủ: phải dùng đường mức (hoặc lập luận) để biết $F$ có đạt giá trị lớn nhất, nhỏ nhất hay không.',
        },
      ],
    },
    {
      heading: 'Dự án: Tối ưu một bài toán thực tế bằng quy hoạch tuyến tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm một tình huống thật có hai lựa chọn (hai món ăn trong khẩu phần, hai loại sản phẩm của một cửa hàng, hai loại xe để thuê) và tìm phương án tốt nhất.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: số liệu thật (giá, thành phần dinh dưỡng, thời gian làm) thu thập từ bao bì, cửa hàng hoặc người thân; giấy kẻ ô hoặc phần mềm vẽ đồ thị.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn ẩn $x$, $y$ và ghi các giới hạn của tình huống thành hệ ràng buộc (ít nhất ba ràng buộc ngoài $x \\ge 0$, $y \\ge 0$).',
            'Lập hàm mục tiêu và xác định cần tìm giá trị lớn nhất hay nhỏ nhất.',
            'Vẽ miền chấp nhận được, tìm toạ độ các đỉnh, lập bảng giá trị của $F$ và kết luận phương án tối ưu.',
            'Kiểm tra lại bằng cách vẽ đường mức. Nếu ẩn phải là số nguyên mà đỉnh tối ưu không có toạ độ nguyên, hãy tìm phương án nguyên tốt nhất ở gần đỉnh đó.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tình huống và số liệu, mô hình, hình vẽ miền chấp nhận được, bảng giá trị, phương án tối ưu và nhận xét phương án đó có hợp lí trong thực tế không.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường mức quét qua miền chấp nhận được',
    instruction:
      'Chọn một bài toán. Miền tô xanh là miền chấp nhận được. Kéo thanh trượt để dời đường mức $F = k$ (màu cam): đoạn đậm là các phương án cho $F = k$. Tìm vị trí cuối cùng mà đường mức còn chạm miền, rồi bấm "Tính F tại các đỉnh" để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Giải bài toán của xưởng: tìm giá trị lớn nhất của $F(x; y) = 40x + 30y$ với $x + 2y \\le 100$, $2x + y \\le 80$, $x \\ge 0$, $y \\ge 0$.',
      steps: [
        'Miền chấp nhận được là tứ giác $OABC$, giới hạn bởi hai trục toạ độ và hai đường thẳng $x + 2y = 100$, $2x + y = 80$.',
        'Toạ độ các đỉnh: $O(0; 0)$; $A(40; 0)$ (giao của $2x + y = 80$ với $Ox$); $C(0; 50)$ (giao của $x + 2y = 100$ với $Oy$); $B$ là nghiệm của hệ $\\begin{cases} x + 2y = 100 \\\\ 2x + y = 80 \\end{cases}$, tức $B(20; 40)$.',
        '$F(O) = 0$, $F(A) = 1\\,600$, $F(B) = 40 \\cdot 20 + 30 \\cdot 40 = 2\\,000$, $F(C) = 1\\,500$.',
        'Giá trị lớn nhất của $F$ là $2\\,000$, đạt tại $B(20; 40)$.',
      ],
      answer:
        'Xưởng nên sản xuất $20$ kg sản phẩm loại I và $40$ kg sản phẩm loại II, tiền lãi lớn nhất là $2\\,000$ nghìn đồng ($2$ triệu đồng).',
    },
    {
      problem:
        'Cần chở $140$ người và $9$ tấn hàng. Mỗi xe loại A chở $20$ người và $0{,}6$ tấn hàng, giá thuê $4$ triệu đồng; mỗi xe loại B chở $10$ người và $1{,}5$ tấn hàng, giá thuê $3$ triệu đồng. Nơi cho thuê chỉ có $10$ xe loại A và $9$ xe loại B. Thuê bao nhiêu xe mỗi loại để chi phí thấp nhất?',
      steps: [
        'Gọi $x$, $y$ là số xe loại A, loại B. Chi phí $F = 4x + 3y$ (triệu đồng), cần tìm giá trị nhỏ nhất.',
        'Ràng buộc: $20x + 10y \\ge 140 \\Leftrightarrow 2x + y \\ge 14$; $0{,}6x + 1{,}5y \\ge 9 \\Leftrightarrow 2x + 5y \\ge 30$; $0 \\le x \\le 10$; $0 \\le y \\le 9$.',
        'Miền chấp nhận được là tứ giác $ABCD$ với $A(10; 2)$, $B(10; 9)$, $C(2{,}5; 9)$, $D(5; 4)$; đỉnh $D$ là nghiệm của hệ $2x + y = 14$, $2x + 5y = 30$.',
        '$F(A) = 46$, $F(B) = 67$, $F(C) = 37$, $F(D) = 4 \\cdot 5 + 3 \\cdot 4 = 32$. Giá trị nhỏ nhất là $32$, đạt tại $D(5; 4)$, có toạ độ nguyên nên dùng được ngay.',
      ],
      answer: 'Thuê $5$ xe loại A và $4$ xe loại B, chi phí thấp nhất là $32$ triệu đồng.',
    },
    {
      problem:
        'Tìm giá trị nhỏ nhất và giá trị lớn nhất (nếu có) của $F = 30x + 40y$ với $x + y \\ge 3$, $x + 2y \\ge 4$, $x \\ge 0$, $y \\ge 0$.',
      steps: [
        'Miền chấp nhận được không bị chặn, có các đỉnh $A(0; 3)$, $B(2; 1)$ (giao của $x + y = 3$ và $x + 2y = 4$), $C(4; 0)$.',
        '$F(A) = 120$, $F(B) = 100$, $F(C) = 120$.',
        'Đường mức $30x + 40y = k$ cắt miền khi và chỉ khi $k \\ge 100$: với $k < 100$ đường mức nằm hẳn phía gốc toạ độ của miền.',
        'Vậy giá trị nhỏ nhất của $F$ là $100$, đạt tại $B(2; 1)$; khi $k$ tăng mãi đường mức vẫn cắt miền nên $F$ không có giá trị lớn nhất.',
      ],
      answer: 'Giá trị nhỏ nhất là $100$ tại $(2; 1)$; $F$ không có giá trị lớn nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cặp số nào là một phương án chấp nhận được của bài toán xưởng sản xuất với ràng buộc $x + 2y \\le 100$, $2x + y \\le 80$, $x \\ge 0$, $y \\ge 0$?',
      options: ['$(20; 40)$', '$(30; 30)$', '$(50; 0)$', '$(0; 60)$'],
      answer: 0,
      hints: ['Thay từng cặp số vào cả bốn bất phương trình.'],
      solution:
        '$(20; 40)$: $20 + 80 = 100 \\le 100$ và $40 + 40 = 80 \\le 80$, thoả mãn. $(30; 30)$ có $2x + y = 90 > 80$; $(50; 0)$ có $2x + y = 100 > 80$; $(0; 60)$ có $x + 2y = 120 > 100$.',
    },
    {
      type: 'choice',
      prompt:
        'Xưởng làm $x$ cái bàn và $y$ cái ghế. Mỗi bàn cần $3$ giờ công, mỗi ghế cần $2$ giờ công, xưởng có tối đa $60$ giờ công. Ràng buộc về giờ công là',
      options: ['$3x + 2y \\le 60$', '$2x + 3y \\le 60$', '$3x + 2y \\ge 60$', '$x + y \\le 60$'],
      answer: 0,
      hints: ['$x$ cái bàn cần $3x$ giờ công, $y$ cái ghế cần $2y$ giờ công.'],
      solution: 'Tổng giờ công là $3x + 2y$ và không vượt quá $60$, nên $3x + 2y \\le 60$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị lớn nhất của $F = 2x + 3y$ với $x + y \\le 5$, $x + 2y \\le 8$, $x \\ge 0$, $y \\ge 0$.',
      answer: 13,
      hints: [
        'Miền chấp nhận được là một tứ giác có một đỉnh là gốc toạ độ.',
        'Đỉnh còn lại khó tìm là giao của $x + y = 5$ và $x + 2y = 8$.',
      ],
      solution:
        'Các đỉnh: $O(0; 0)$, $(5; 0)$, $(2; 3)$, $(0; 4)$. $F$ lần lượt bằng $0$, $10$, $13$, $12$. Giá trị lớn nhất là $13$, tại $(2; 3)$.',
    },
    {
      type: 'number',
      prompt:
        'Với cùng miền chấp nhận được $x + y \\le 5$, $x + 2y \\le 8$, $x \\ge 0$, $y \\ge 0$, tìm giá trị nhỏ nhất của $G = x - y$.',
      answer: -4,
      hints: ['Tính $G$ tại bốn đỉnh $O(0; 0)$, $(5; 0)$, $(2; 3)$, $(0; 4)$.'],
      solution:
        '$G(O) = 0$, $G(5; 0) = 5$, $G(2; 3) = -1$, $G(0; 4) = -4$. Giá trị nhỏ nhất là $-4$, tại $(0; 4)$.',
    },
    {
      type: 'number',
      prompt:
        'Một nông dân có $8$ ha đất để trồng cà phê và hồ tiêu. Mỗi hecta cà phê cần $20$ ngày công, lãi $40$ triệu đồng; mỗi hecta hồ tiêu cần $40$ ngày công, lãi $60$ triệu đồng. Gia đình có tối đa $240$ ngày công. Tiền lãi lớn nhất là bao nhiêu triệu đồng?',
      answer: 400,
      unit: 'triệu đồng',
      hints: [
        'Gọi $x$, $y$ (ha) là diện tích cà phê, hồ tiêu: $x + y \\le 8$, $20x + 40y \\le 240$, $x \\ge 0$, $y \\ge 0$; $F = 40x + 60y$.',
        'Giao của $x + y = 8$ và $x + 2y = 12$ là $(4; 4)$.',
      ],
      solution:
        'Các đỉnh: $O(0; 0)$, $(8; 0)$, $(4; 4)$, $(0; 6)$. $F$ lần lượt bằng $0$, $320$, $400$, $360$. Lãi lớn nhất $400$ triệu đồng khi trồng $4$ ha cà phê và $4$ ha hồ tiêu.',
    },
    {
      type: 'number',
      prompt:
        'Trộn hai loại thức ăn gia súc. Mỗi kilôgam loại I chứa $2$ đơn vị đạm và $1$ đơn vị chất béo, giá $12$ nghìn đồng; mỗi kilôgam loại II chứa $1$ đơn vị đạm và $2$ đơn vị chất béo, giá $10$ nghìn đồng. Hỗn hợp cần ít nhất $8$ đơn vị đạm và $7$ đơn vị chất béo. Chi phí thấp nhất là bao nhiêu nghìn đồng?',
      answer: 56,
      unit: 'nghìn đồng',
      hints: [
        'Ràng buộc: $2x + y \\ge 8$, $x + 2y \\ge 7$, $x \\ge 0$, $y \\ge 0$; chi phí $F = 12x + 10y$.',
        'Miền không bị chặn, có ba đỉnh $(0; 8)$, $(3; 2)$, $(7; 0)$.',
      ],
      solution:
        '$F(0; 8) = 80$, $F(3; 2) = 36 + 20 = 56$, $F(7; 0) = 84$. Vì $F$ có hệ số dương, đường mức giảm dần về phía gốc toạ độ và lần cuối chạm miền tại $(3; 2)$. Chi phí thấp nhất $56$ nghìn đồng: $3$ kg loại I và $2$ kg loại II.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị nhỏ nhất của $F = 2x + y$ với $x + y \\ge 4$, $x + 3y \\ge 6$, $x \\ge 0$, $y \\ge 0$.',
      answer: 4,
      hints: [
        'Các đỉnh của miền là $(0; 4)$, giao điểm của $x + y = 4$ với $x + 3y = 6$, và $(6; 0)$.',
      ],
      solution:
        'Giao của $x + y = 4$ và $x + 3y = 6$ là $(3; 1)$. $F(0; 4) = 4$, $F(3; 1) = 7$, $F(6; 0) = 12$. Đường mức $2x + y = k$ chỉ cắt miền khi $k \\ge 4$, nên giá trị nhỏ nhất là $4$, tại $(0; 4)$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên miền chấp nhận được $x + y \\ge 4$, $x + 3y \\ge 6$, $x \\ge 0$, $y \\ge 0$, hàm $H = x + y$ có giá trị lớn nhất không?',
      options: [
        'Không, vì miền không bị chặn và $x + y$ lớn tuỳ ý trên miền.',
        'Có, bằng $6$, đạt tại $(6; 0)$.',
        'Có, bằng $4$, đạt tại $(0; 4)$.',
        'Có, bằng $4$, đạt tại $(3; 1)$.',
      ],
      answer: 0,
      hints: ['Thử các điểm $(t; 0)$ với $t$ rất lớn: chúng có thuộc miền không?'],
      solution:
        'Mọi điểm $(t; 0)$ với $t \\ge 6$ đều thuộc miền và $H = t$ lớn tuỳ ý, nên $H$ không có giá trị lớn nhất. ($H$ có giá trị nhỏ nhất bằng $4$, đạt tại mọi điểm của đoạn nối $(0; 4)$ và $(3; 1)$.)',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán quy hoạch tuyến tính bằng phương pháp hình học.',
      items: [
        'Vẽ miền chấp nhận được của hệ ràng buộc.',
        'Tìm toạ độ các đỉnh của miền.',
        'Tính giá trị của hàm mục tiêu tại các đỉnh.',
        'So sánh các giá trị và kết luận phương án tối ưu.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải có miền rồi mới có đỉnh, có đỉnh rồi mới tính được $F$.'],
      solution:
        'Vẽ miền chấp nhận được, tìm các đỉnh, tính $F$ tại các đỉnh, rồi so sánh để kết luận.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về bài toán quy hoạch tuyến tính hai biến.',
      options: [
        'Nếu miền chấp nhận được là miền đa giác thì $F$ đạt giá trị lớn nhất tại một đỉnh của miền.',
        'Phương án tối ưu luôn là duy nhất.',
        'Đường mức $ax + by = k$ ứng với các giá trị $k$ khác nhau thì song song với nhau.',
        'Nếu miền chấp nhận được không bị chặn thì $F$ chắc chắn không có giá trị nhỏ nhất.',
      ],
      answers: [0, 2],
      hints: [
        'Nghĩ tới trường hợp một cạnh của miền song song với đường mức.',
        'Xem lại bài toán khẩu phần: miền không bị chặn nhưng chi phí vẫn có giá trị nhỏ nhất.',
      ],
      solution:
        'Đúng: giá trị tối ưu trên miền đa giác đạt tại một đỉnh; các đường mức cùng vectơ pháp tuyến $(a; b)$ nên song song. Sai: phương án tối ưu có thể là cả một cạnh (vô số phương án); miền không bị chặn vẫn có thể có giá trị nhỏ nhất, như bài toán khẩu phần.',
    },
  ],
  takeaways: [
    'Bài toán quy hoạch tuyến tính: tìm giá trị lớn nhất, nhỏ nhất của $F = ax + by$ trên miền nghiệm của một hệ bất phương trình bậc nhất hai ẩn.',
    'Miền chấp nhận được là miền đa giác thì giá trị tối ưu đạt tại một đỉnh: tìm các đỉnh, tính $F$, so sánh.',
    'Miền không bị chặn thì $F$ có thể không có giá trị lớn nhất hoặc nhỏ nhất; dùng đường mức để kiểm tra.',
  ],
};
