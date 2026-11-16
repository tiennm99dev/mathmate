/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương II: bất phương trình và hệ bất phương trình bậc nhất hai ẩn, biểu diễn miền nghiệm và bài toán tìm giá trị lớn nhất, nhỏ nhất trên miền đa giác.',
  intro:
    'Chương II giúp ta mô tả những điều kiện như “không quá”, “ít nhất” bằng bất phương trình bậc nhất hai ẩn, nhìn tập nghiệm của chúng như những nửa mặt phẳng và chọn phương án tốt nhất trong một bài toán sản xuất hay chi tiêu. Bài này ôn lại cách biểu diễn miền nghiệm và cách giải bài toán tối ưu đơn giản.',
  objectives: [
    'Kiểm tra một cặp số có là nghiệm của bất phương trình, hệ bất phương trình bậc nhất hai ẩn.',
    'Biểu diễn miền nghiệm của bất phương trình và hệ bất phương trình bậc nhất hai ẩn.',
    'Tìm giá trị lớn nhất, nhỏ nhất của $F = ax + by$ trên một miền đa giác và vận dụng vào bài toán thực tiễn.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Bất phương trình bậc nhất hai ẩn',
              '$ax + by < c$ (hoặc $>$, $\\le$, $\\ge$), $a$ và $b$ không đồng thời bằng $0$',
            ],
            ['Nghiệm', 'Cặp $(x_0; y_0)$ làm bất phương trình thành mệnh đề đúng'],
            [
              'Miền nghiệm',
              'Nửa mặt phẳng bờ $d: ax + by = c$; xác định bằng một điểm thử không thuộc $d$',
            ],
            [
              'Đường bờ $d$',
              'Nét đứt với $<$, $>$ (không kể $d$); nét liền với $\\le$, $\\ge$ (kể cả $d$)',
            ],
            ['Hệ bất phương trình', 'Miền nghiệm là giao các nửa mặt phẳng: phần không bị gạch'],
            [
              'Giá trị lớn nhất, nhỏ nhất của $F = ax + by$',
              'Trên miền đa giác, đạt tại một trong các đỉnh',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Các bước giải bài toán tối ưu',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Gọi ẩn $x$, $y$ (kèm điều kiện, thường là $x \\ge 0$, $y \\ge 0$).',
            'Viết hệ bất phương trình mô tả các ràng buộc và biểu thức $F = ax + by$ cần tối ưu.',
            'Biểu diễn miền nghiệm của hệ, tìm toạ độ các đỉnh bằng cách giải từng cặp phương trình đường bờ.',
            'Tính $F$ tại các đỉnh, so sánh và trả lời bài toán.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Trước khi tính $F$, thử lại mỗi đỉnh vào tất cả các bất phương trình của hệ: giao điểm của hai đường bờ chưa chắc thuộc miền nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài toán sản xuất',
    instruction:
      'Nhập số giờ mỗi sản phẩm cần trên hai máy, số giờ tối đa của mỗi máy và tiền lãi mỗi sản phẩm. Miền nghiệm của hệ được vẽ ngay (phần không bị gạch). Chọn đỉnh em cho là cho lãi lớn nhất rồi đối chiếu với bảng giá trị của $F$.',
  },
  examples: [
    {
      problem:
        'Biểu diễn miền nghiệm của hệ $\\begin{cases} x \\ge 0,\\ y \\ge 0 \\\\ 2x + y \\le 6 \\\\ x + y \\ge 2 \\end{cases}$ và tìm các đỉnh của nó.',
      steps: [
        'Giữ góc phần tư thứ nhất (kể cả hai trục) cho $x \\ge 0$, $y \\ge 0$.',
        '$2x + y = 6$ qua $(3; 0)$ và $(0; 6)$; thay $O$: $0 \\le 6$ đúng, giữ phía chứa $O$.',
        '$x + y = 2$ qua $(2; 0)$ và $(0; 2)$; thay $O$: $0 \\ge 2$ sai, giữ phía không chứa $O$.',
        'Phần không bị gạch là tứ giác có các đỉnh $(2; 0)$, $(3; 0)$, $(0; 6)$, $(0; 2)$.',
      ],
      answer:
        'Miền nghiệm là tứ giác với các đỉnh $(2; 0)$, $(3; 0)$, $(0; 6)$, $(0; 2)$, kể cả các cạnh.',
    },
    {
      problem:
        'Mỗi ngày một xưởng làm $x$ ghế và $y$ bàn. Mỗi ghế cần $1$ giờ lắp ráp và $3$ giờ hoàn thiện, mỗi bàn cần $2$ giờ lắp ráp và $2$ giờ hoàn thiện; xưởng có tối đa $10$ giờ lắp ráp và $18$ giờ hoàn thiện. Mỗi ghế lãi $200$ nghìn đồng, mỗi bàn lãi $300$ nghìn đồng. Tìm tiền lãi lớn nhất.',
      steps: [
        'Hệ: $x \\ge 0$, $y \\ge 0$, $x + 2y \\le 10$, $3x + 2y \\le 18$; lãi $F = 200x + 300y$ (nghìn đồng).',
        'Các đỉnh: $O(0; 0)$, $A(6; 0)$, $C(0; 5)$ và $B$ là giao của $x + 2y = 10$ với $3x + 2y = 18$: trừ vế được $2x = 8$, $x = 4$, $y = 3$.',
        '$F(O) = 0$, $F(A) = 1\\,200$, $F(B) = 800 + 900 = 1\\,700$, $F(C) = 1\\,500$.',
      ],
      answer: 'Lãi lớn nhất là $1\\,700$ nghìn đồng khi làm $4$ ghế và $3$ bàn mỗi ngày.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?',
      options: [
        '$2x + 3y > 5$',
        '$x + y^2 \\le 1$',
        '$\\dfrac{2}{x} - y < 0$',
        '$x(y + 1) \\ge 3$',
      ],
      answer: 0,
      hints: ['Hai ẩn chỉ được xuất hiện ở bậc nhất, không nhân với nhau, không nằm ở mẫu.'],
      solution:
        '$2x + 3y > 5$ có dạng $ax + by > c$ với $a = 2$, $b = 3$. Các bất phương trình còn lại có $y^2$, có $x$ ở mẫu hoặc có tích $xy$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp số nào là nghiệm của bất phương trình $3x - 2y \\ge 4$?',
      options: ['$(2; 1)$', '$(0; 0)$', '$(1; 0)$', '$(1; 1)$'],
      answer: 0,
      hints: ['Thay từng cặp vào $3x - 2y$ rồi so sánh với $4$; nhớ dấu $\\ge$ cho phép dấu bằng.'],
      solution:
        '$(2; 1)$: $6 - 2 = 4 \\ge 4$, đúng. $(0; 0)$: $0$; $(1; 0)$: $3$; $(1; 1)$: $1$; cả ba đều nhỏ hơn $4$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số nguyên $m$ nhỏ nhất để cặp số $(m; 3)$ là nghiệm của bất phương trình $2x - y > 5$.',
      answer: 5,
      hints: ['Thay $x = m$, $y = 3$.', 'Giải $2m - 3 > 5$.'],
      solution:
        '$2m - 3 > 5 \\Leftrightarrow 2m > 8 \\Leftrightarrow m > 4$. Số nguyên nhỏ nhất lớn hơn $4$ là $m = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Miền nghiệm của bất phương trình $x - y \\ge 0$ là nửa mặt phẳng bờ $x - y = 0$',
      options: [
        'chứa điểm $(1; 0)$, kể cả bờ',
        'chứa điểm $(0; 1)$, kể cả bờ',
        'chứa điểm $(1; 0)$, không kể bờ',
        'chứa điểm $(0; 1)$, không kể bờ',
      ],
      answer: 0,
      hints: [
        'Đường bờ đi qua $O$ nên phải chọn điểm thử khác, chẳng hạn $(1; 0)$.',
        'Dấu $\\ge$ có dấu bằng.',
      ],
      solution:
        'Thay $(1; 0)$: $1 - 0 = 1 \\ge 0$, đúng, nên miền nghiệm chứa $(1; 0)$; dấu $\\ge$ nên kể cả bờ. Điểm $(0; 1)$ cho $-1 \\ge 0$ sai.',
    },
    {
      type: 'choice',
      prompt:
        'Phần không bị gạch là nửa mặt phẳng chứa gốc $O$, có bờ là đường thẳng nét đứt đi qua $(3; 0)$ và $(0; -3)$. Đó là miền nghiệm của bất phương trình nào?',
      options: ['$x - y < 3$', '$x - y > 3$', '$x - y \\le 3$', '$x + y < 3$'],
      answer: 0,
      hints: [
        'Đường thẳng qua $(3; 0)$ và $(0; -3)$ là $x - y = 3$.',
        'Nét đứt: không có dấu bằng. Chứa $O$: $O$ phải thoả mãn.',
      ],
      solution:
        'Bờ là $x - y = 3$, nét đứt nên dấu là $<$ hoặc $>$. Thay $O$: $0 < 3$ đúng, nên bất phương trình là $x - y < 3$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi bất phương trình với miền nghiệm của nó (bờ là đường thẳng $x + y = 2$).',
      left: ['$x + y < 2$', '$x + y \\ge 2$', '$x + y > 2$', '$x + y \\le 2$'],
      right: [
        'Nửa mặt phẳng chứa $O$, không kể bờ',
        'Nửa mặt phẳng không chứa $O$, kể cả bờ',
        'Nửa mặt phẳng không chứa $O$, không kể bờ',
        'Nửa mặt phẳng chứa $O$, kể cả bờ',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Thay $O(0; 0)$: $0 + 0 = 0$, mà $0 < 2$. Vậy dấu nào chứa $O$?',
        'Có dấu bằng thì kể cả bờ.',
      ],
      solution:
        'Vì $0 < 2$ nên $O$ thuộc miền nghiệm của $x + y < 2$ và $x + y \\le 2$, không thuộc miền nghiệm của $x + y > 2$ và $x + y \\ge 2$. Dấu $\\le$, $\\ge$ kể cả bờ; dấu $<$, $>$ không kể bờ.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các cặp số là nghiệm của hệ $\\begin{cases} x \\ge 0,\\ y \\ge 0 \\\\ 2x + y \\le 6 \\\\ x + y \\ge 2. \\end{cases}$',
      options: ['$(1; 1)$', '$(0; 0)$', '$(3; 0)$', '$(2; 3)$', '$(0; 6)$', '$(-1; 4)$'],
      answers: [0, 2, 4],
      hints: ['Một cặp là nghiệm của hệ khi thoả mãn tất cả các bất phương trình.'],
      solution:
        '$(1; 1)$: $3 \\le 6$, $2 \\ge 2$, nhận. $(0; 0)$: $0 \\ge 2$ sai. $(3; 0)$: $6 \\le 6$, $3 \\ge 2$, nhận. $(2; 3)$: $7 \\le 6$ sai. $(0; 6)$: $6 \\le 6$, $6 \\ge 2$, nhận. $(-1; 4)$: $x \\ge 0$ sai.',
    },
    {
      type: 'number',
      prompt:
        'Với hệ ở câu trên (miền nghiệm là tứ giác có các đỉnh $(2; 0)$, $(3; 0)$, $(0; 6)$, $(0; 2)$), tìm giá trị nhỏ nhất của $F = 3x + y$.',
      answer: 2,
      hints: ['Tính $F$ tại bốn đỉnh rồi so sánh.'],
      solution:
        '$F(2; 0) = 6$, $F(3; 0) = 9$, $F(0; 6) = 6$, $F(0; 2) = 2$. Giá trị nhỏ nhất là $2$, đạt tại $(0; 2)$.',
    },
    {
      type: 'number',
      prompt: 'Cũng trên miền đó, tìm giá trị lớn nhất của $G = x - 2y$.',
      answer: 3,
      hints: ['Tính $G$ tại bốn đỉnh $(2; 0)$, $(3; 0)$, $(0; 6)$, $(0; 2)$.'],
      solution:
        '$G(2; 0) = 2$, $G(3; 0) = 3$, $G(0; 6) = -12$, $G(0; 2) = -4$. Giá trị lớn nhất là $3$, đạt tại $(3; 0)$.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi ngày một xưởng làm $x$ ghế và $y$ bàn với $x + 2y \\le 10$ (giờ lắp ráp), $3x + 2y \\le 18$ (giờ hoàn thiện), $x, y \\ge 0$. Tiền lãi là $F = 200x + 300y$ (nghìn đồng). Để lãi lớn nhất, mỗi ngày xưởng nên làm bao nhiêu chiếc bàn?',
      answer: 3,
      unit: 'chiếc',
      hints: [
        'Các đỉnh của miền nghiệm là $O(0; 0)$, $A(6; 0)$, $B$, $C(0; 5)$; tìm $B$ từ $x + 2y = 10$ và $3x + 2y = 18$.',
        'So sánh $F$ tại bốn đỉnh.',
      ],
      solution:
        '$B(4; 3)$. $F(O) = 0$, $F(A) = 1\\,200$, $F(B) = 1\\,700$, $F(C) = 1\\,500$. Lãi lớn nhất tại $B$: làm $4$ ghế và $3$ bàn.',
    },
    {
      type: 'number',
      prompt:
        'Một gia đình cần ít nhất $900$ đơn vị protein và $400$ đơn vị lipit mỗi ngày. Mỗi kilôgam thịt bò có $800$ đơn vị protein, $200$ đơn vị lipit, giá $250$ nghìn đồng; mỗi kilôgam thịt lợn có $600$ đơn vị protein, $400$ đơn vị lipit, giá $160$ nghìn đồng. Gia đình mua nhiều nhất $1{,}6$ kg thịt bò và $1{,}1$ kg thịt lợn. Chi phí ít nhất là bao nhiêu nghìn đồng?',
      answer: 251,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$, $y$ là số kilôgam thịt bò, thịt lợn: $0 \\le x \\le 1{,}6$; $0 \\le y \\le 1{,}1$; $800x + 600y \\ge 900$; $200x + 400y \\ge 400$. Chi phí $F = 250x + 160y$.',
        'Rút gọn: $8x + 6y \\ge 9$, $x + 2y \\ge 2$. Miền nghiệm là tứ giác có các đỉnh $(0{,}3; 1{,}1)$, $(0{,}6; 0{,}7)$, $(1{,}6; 0{,}2)$, $(1{,}6; 1{,}1)$.',
      ],
      solution:
        '$F(0{,}3; 1{,}1) = 75 + 176 = 251$; $F(0{,}6; 0{,}7) = 150 + 112 = 262$; $F(1{,}6; 0{,}2) = 400 + 32 = 432$; $F(1{,}6; 1{,}1) = 400 + 176 = 576$. Chi phí ít nhất là $251$ nghìn đồng khi mua $0{,}3$ kg thịt bò và $1{,}1$ kg thịt lợn.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước giải bài toán tìm giá trị lớn nhất của $F = ax + by$ theo đúng thứ tự.',
      items: [
        'Gọi ẩn và viết hệ bất phương trình mô tả các điều kiện.',
        'Biểu diễn miền nghiệm của hệ.',
        'Tìm toạ độ các đỉnh của miền đa giác.',
        'Tính $F$ tại các đỉnh và chọn giá trị lớn nhất.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải có miền nghiệm thì mới biết các đỉnh.'],
      solution:
        'Gọi ẩn, lập hệ → biểu diễn miền nghiệm → tìm các đỉnh → tính và so sánh $F$ tại các đỉnh.',
    },
  ],
  takeaways: [
    'Miền nghiệm của $ax + by < c$ là một nửa mặt phẳng bờ $ax + by = c$, tìm bằng một điểm thử.',
    'Miền nghiệm của hệ là phần không bị gạch sau khi gạch bỏ phần không thoả mãn từng bất phương trình.',
    'Bài toán tối ưu: lập hệ, vẽ miền nghiệm, tìm các đỉnh, so sánh $F$ tại các đỉnh.',
  ],
};
