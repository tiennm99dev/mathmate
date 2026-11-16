/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bất phương trình bậc nhất hai ẩn, nghiệm của nó và cách biểu diễn miền nghiệm là một nửa mặt phẳng trên mặt phẳng toạ độ.',
  intro:
    'Nhân ngày Quốc tế Thiếu nhi, một rạp chiếu phim bán vé xem phim với giá $50$ nghìn đồng cho trẻ em và $100$ nghìn đồng cho người lớn. Để không bị lỗ, rạp phải thu được ít nhất $20$ triệu đồng. Gọi $x$, $y$ lần lượt là số vé trẻ em và số vé người lớn bán được, điều kiện đó viết là $50x + 100y \\ge 20\\,000$ (nghìn đồng). Đây là một bất phương trình bậc nhất hai ẩn.',
  objectives: [
    'Nhận biết bất phương trình bậc nhất hai ẩn và nghiệm của nó.',
    'Kiểm tra một cặp số có là nghiệm của bất phương trình hay không.',
    'Biểu diễn miền nghiệm của bất phương trình bậc nhất hai ẩn trên mặt phẳng toạ độ.',
    'Viết bất phương trình bậc nhất hai ẩn từ một tình huống thực tế.',
  ],
  sections: [
    {
      heading: 'Bất phương trình bậc nhất hai ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Bất phương trình bậc nhất hai ẩn $x$, $y$ là bất phương trình có một trong các dạng $ax + by < c$, $ax + by > c$, $ax + by \\le c$, $ax + by \\ge c$, trong đó $a$, $b$, $c$ là những số thực đã cho, $a$ và $b$ không đồng thời bằng $0$; $x$ và $y$ là các ẩn.',
        },
        {
          type: 'p',
          text: 'Cặp số $(x_0; y_0)$ gọi là một nghiệm của bất phương trình $ax + by < c$ nếu $ax_0 + by_0 < c$ là một mệnh đề đúng. Nghiệm của các bất phương trình còn lại được định nghĩa tương tự.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $(3; 5)$ là một nghiệm của $2x + 3y > 10$ vì $2 \\cdot 3 + 3 \\cdot 5 = 21 > 10$; còn $(1; 2)$ không là nghiệm vì $2 \\cdot 1 + 3 \\cdot 2 = 8$ và $8 > 10$ sai.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Một bất phương trình bậc nhất hai ẩn luôn có vô số nghiệm. Bất phương trình $3x + 0y < 7$ (tức $3x < 7$) vẫn là bất phương trình bậc nhất hai ẩn vì $a = 3 \\ne 0$; còn $x^2 + y > 1$ hay $xy \\ge 2$ thì không.',
        },
      ],
    },
    {
      heading: 'Biểu diễn miền nghiệm trên mặt phẳng toạ độ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Miền nghiệm',
          text: 'Trong mặt phẳng toạ độ $Oxy$, tập hợp các điểm có toạ độ là nghiệm của bất phương trình bậc nhất hai ẩn được gọi là miền nghiệm của bất phương trình đó.',
        },
        {
          type: 'p',
          text: 'Đường thẳng $d: ax + by = c$ chia mặt phẳng toạ độ thành hai nửa mặt phẳng bờ $d$. Các điểm nằm trên $d$ có toạ độ thoả mãn $ax + by = c$; mọi điểm của một nửa mặt phẳng (không kể $d$) thoả mãn $ax + by < c$, mọi điểm của nửa còn lại thoả mãn $ax + by > c$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các bước biểu diễn miền nghiệm',
          text: 'Để biểu diễn miền nghiệm của bất phương trình $ax + by < c$, ta làm như sau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng $d: ax + by = c$ trên mặt phẳng toạ độ $Oxy$.',
            'Lấy một điểm $M(x_0; y_0)$ không thuộc $d$ (thường lấy gốc toạ độ $O$ nếu $c \\ne 0$; lấy $(1; 0)$ hoặc $(0; 1)$ nếu $c = 0$) và tính $ax_0 + by_0$.',
            'Nếu $ax_0 + by_0 < c$ thì nửa mặt phẳng bờ $d$ chứa $M$ là miền nghiệm; nếu $ax_0 + by_0 > c$ thì nửa mặt phẳng bờ $d$ không chứa $M$ là miền nghiệm.',
          ],
        },
        {
          type: 'list',
          items: [
            'Ta gạch bỏ nửa mặt phẳng không là miền nghiệm; miền nghiệm là phần không bị gạch.',
            'Với dấu $<$ hoặc $>$, miền nghiệm không kể đường thẳng $d$: vẽ $d$ bằng nét đứt.',
            'Với dấu $\\le$ hoặc $\\ge$, miền nghiệm kể cả đường thẳng $d$: vẽ $d$ bằng nét liền.',
          ],
        },
        {
          type: 'table',
          head: ['Bất phương trình', 'Điểm thử', 'Kết quả thử', 'Miền nghiệm'],
          rows: [
            [
              '$2x - y > 2$',
              '$O(0; 0)$',
              '$0 > 2$ sai',
              'nửa mặt phẳng không chứa $O$, không kể $d$',
            ],
            [
              '$3x + y \\le 6$',
              '$O(0; 0)$',
              '$0 \\le 6$ đúng',
              'nửa mặt phẳng chứa $O$, kể cả $d$',
            ],
            [
              '$x - 2y > 0$',
              '$(1; 0)$',
              '$1 > 0$ đúng',
              'nửa mặt phẳng chứa $(1; 0)$, không kể $d$',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thử điểm để tìm nửa mặt phẳng nghiệm',
    instruction:
      'Chỉnh $a$, $b$, $c$ và dấu để có bất phương trình, quan sát đường thẳng $d$ dịch chuyển. Kéo điểm $M$ (hoặc dùng phím mũi tên) ra khỏi $d$ rồi bấm “Thử điểm M”: nửa mặt phẳng không là miền nghiệm sẽ bị gạch. Thử thêm các điểm ở hai phía của $d$ để thấy mọi nghiệm nằm cùng một phía.',
  },
  examples: [
    {
      problem:
        'Trong các cặp số $(0; 0)$, $(3; 2)$, $(4; 2)$, $(-1; 5)$, cặp nào là nghiệm của bất phương trình $2x + 3y \\le 12$?',
      steps: [
        'Thay $(0; 0)$: $2 \\cdot 0 + 3 \\cdot 0 = 0 \\le 12$, đúng.',
        'Thay $(3; 2)$: $2 \\cdot 3 + 3 \\cdot 2 = 12 \\le 12$, đúng (điểm nằm trên đường thẳng bờ).',
        'Thay $(4; 2)$: $2 \\cdot 4 + 3 \\cdot 2 = 14$, mà $14 \\le 12$ sai.',
        'Thay $(-1; 5)$: $2 \\cdot (-1) + 3 \\cdot 5 = 13$, mà $13 \\le 12$ sai.',
      ],
      answer: 'Các cặp $(0; 0)$ và $(3; 2)$ là nghiệm; $(4; 2)$ và $(-1; 5)$ không là nghiệm.',
    },
    {
      problem: 'Biểu diễn miền nghiệm của bất phương trình $2x - y > 2$ trên mặt phẳng toạ độ.',
      steps: [
        'Vẽ đường thẳng $d: 2x - y = 2$ đi qua $(1; 0)$ và $(0; -2)$. Vì dấu là $>$ nên vẽ $d$ bằng nét đứt.',
        'Lấy gốc toạ độ $O(0; 0) \\notin d$: $2 \\cdot 0 - 0 = 0$, mà $0 > 2$ sai, nên $O$ không là nghiệm.',
        'Gạch bỏ nửa mặt phẳng bờ $d$ chứa $O$.',
      ],
      answer:
        'Miền nghiệm là nửa mặt phẳng bờ $d$ không chứa gốc toạ độ $O$, không kể đường thẳng $d$ (phần không bị gạch).',
    },
    {
      problem: 'Biểu diễn miền nghiệm của bất phương trình $3x + y \\le 6$.',
      steps: [
        'Vẽ đường thẳng $d: 3x + y = 6$ đi qua $(2; 0)$ và $(0; 6)$, bằng nét liền vì dấu là $\\le$.',
        'Thay $O(0; 0)$: $3 \\cdot 0 + 0 = 0 \\le 6$, đúng.',
        'Gạch bỏ nửa mặt phẳng bờ $d$ không chứa $O$.',
      ],
      answer: 'Miền nghiệm là nửa mặt phẳng bờ $d$ chứa gốc toạ độ $O$, kể cả đường thẳng $d$.',
    },
    {
      problem:
        'Cước gọi nội mạng là $1$ nghìn đồng/phút, cước gọi ngoại mạng là $2$ nghìn đồng/phút. Bạn An muốn trả không quá $200$ nghìn đồng cước gọi trong tháng. Gọi $x$, $y$ là số phút gọi nội mạng và ngoại mạng. Viết bất phương trình mô tả điều kiện và biểu diễn miền nghiệm.',
      steps: [
        'Tiền cước là $x + 2y$ (nghìn đồng), nên $x + 2y \\le 200$; ngoài ra $x \\ge 0$, $y \\ge 0$.',
        'Đường thẳng $d: x + 2y = 200$ cắt $Ox$ tại $A(200; 0)$, cắt $Oy$ tại $B(0; 100)$.',
        'Thay $O(0; 0)$: $0 \\le 200$ đúng, nên miền nghiệm của $x + 2y \\le 200$ là nửa mặt phẳng bờ $d$ chứa $O$, kể cả $d$.',
        'Kết hợp $x \\ge 0$, $y \\ge 0$, chỉ giữ phần nằm trong góc phần tư thứ nhất (kể cả hai trục).',
      ],
      answer:
        '$x + 2y \\le 200$; miền các giá trị $(x; y)$ thoả mãn là tam giác $OAB$ với $A(200; 0)$, $B(0; 100)$, kể cả các cạnh.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bất phương trình bậc nhất hai ẩn.',
      options: [
        '$2x - 5y \\le 3$',
        '$x^2 + y > 1$',
        '$3x + 0y < 7$',
        '$xy \\ge 2$',
        '$0x + 0y > -1$',
      ],
      answers: [0, 2],
      hints: [
        'Dạng $ax + by < c$ (hoặc $>$, $\\le$, $\\ge$) với $a$, $b$ không đồng thời bằng $0$.',
        'Ẩn không được có số mũ $2$ hay nhân với nhau; $a = 0$ vẫn được nếu $b \\ne 0$ và ngược lại.',
      ],
      solution:
        '$2x - 5y \\le 3$ và $3x + 0y < 7$ ($a = 3 \\ne 0$) là bất phương trình bậc nhất hai ẩn. $x^2 + y > 1$ có $x^2$, $xy \\ge 2$ có tích $xy$, còn $0x + 0y > -1$ có $a = b = 0$ nên đều không phải.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cặp số là nghiệm của bất phương trình $x - 2y + 4 > 0$.',
      options: ['$(0; 0)$', '$(0; 2)$', '$(5; 4)$', '$(-3; 1)$', '$(1; -1)$'],
      answers: [0, 2, 4],
      hints: [
        'Thay từng cặp vào $x - 2y + 4$ rồi xét dấu.',
        'Cặp làm $x - 2y + 4 = 0$ không là nghiệm vì dấu là $>$ (không có dấu bằng).',
      ],
      solution:
        '$(0; 0)$: $4 > 0$ đúng. $(0; 2)$: $0 - 4 + 4 = 0$, sai. $(5; 4)$: $5 - 8 + 4 = 1 > 0$, đúng. $(-3; 1)$: $-3 - 2 + 4 = -1$, sai. $(1; -1)$: $1 + 2 + 4 = 7 > 0$, đúng.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số nguyên $y$ lớn nhất sao cho cặp số $(1; y)$ là nghiệm của bất phương trình $3x + 2y < 11$.',
      answer: 3,
      hints: ['Thay $x = 1$ để được một bất phương trình ẩn $y$.', 'Giải $3 + 2y < 11$.'],
      solution:
        'Thay $x = 1$: $3 + 2y < 11 \\Leftrightarrow 2y < 8 \\Leftrightarrow y < 4$. Số nguyên lớn nhất nhỏ hơn $4$ là $y = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Miền nghiệm của bất phương trình $x + y \\le 3$ là',
      options: [
        'nửa mặt phẳng bờ $x + y = 3$ chứa gốc $O$, kể cả bờ',
        'nửa mặt phẳng bờ $x + y = 3$ không chứa gốc $O$, kể cả bờ',
        'nửa mặt phẳng bờ $x + y = 3$ chứa gốc $O$, không kể bờ',
        'nửa mặt phẳng bờ $x + y = 3$ không chứa gốc $O$, không kể bờ',
      ],
      answer: 0,
      hints: [
        'Thử điểm $O(0; 0)$.',
        'Dấu $\\le$ có dấu bằng, nên các điểm trên bờ cũng là nghiệm.',
      ],
      solution:
        'Thay $O$: $0 + 0 = 0 \\le 3$ đúng, nên miền nghiệm chứa $O$; dấu $\\le$ nên kể cả đường thẳng $x + y = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Miền nghiệm của bất phương trình $2x - 3y > 0$ là nửa mặt phẳng bờ $d: 2x - 3y = 0$',
      options: [
        'chứa điểm $(1; 0)$, không kể $d$',
        'không chứa điểm $(1; 0)$, không kể $d$',
        'chứa điểm $(1; 0)$, kể cả $d$',
        'chứa gốc $O$, không kể $d$',
      ],
      answer: 0,
      hints: [
        'Đường thẳng $d$ đi qua gốc toạ độ, nên không thể thử bằng $O$.',
        'Thử điểm $(1; 0)$, điểm này không thuộc $d$.',
      ],
      solution:
        '$d$ đi qua $O$ (vì $c = 0$) nên lấy điểm thử $(1; 0)$: $2 \\cdot 1 - 3 \\cdot 0 = 2 > 0$ đúng. Miền nghiệm là nửa mặt phẳng bờ $d$ chứa $(1; 0)$; dấu $>$ nên không kể $d$. Gốc $O$ nằm trên $d$ nên không thuộc miền nghiệm.',
    },
    {
      type: 'choice',
      prompt:
        'Khi biểu diễn miền nghiệm của $x - 3y < 6$, đường thẳng $d: x - 3y = 6$ được vẽ thế nào?',
      options: [
        'Nét đứt, vì các điểm trên $d$ không là nghiệm',
        'Nét liền, vì các điểm trên $d$ là nghiệm',
        'Nét liền, vì $d$ là bờ của miền nghiệm',
        'Không cần vẽ $d$',
      ],
      answer: 0,
      hints: ['Một điểm trên $d$ làm $x - 3y = 6$. Khi đó $6 < 6$ đúng hay sai?'],
      solution:
        'Điểm trên $d$ cho $x - 3y = 6$, mà $6 < 6$ sai, nên $d$ không thuộc miền nghiệm: vẽ $d$ bằng nét đứt.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng bờ đi qua $A(2; 0)$ và $B(0; 4)$, miền nghiệm là nửa mặt phẳng chứa gốc $O$, kể cả bờ. Đó là miền nghiệm của bất phương trình nào?',
      options: ['$2x + y \\le 4$', '$2x + y \\ge 4$', '$x + 2y \\le 4$', '$2x + y < 4$'],
      answer: 0,
      hints: [
        'Tìm phương trình đường thẳng qua $A$ và $B$ dạng $ax + by = c$ rồi thử lại toạ độ $A$, $B$.',
        'Kể cả bờ nên dấu có dấu bằng; chứa $O$ nên $O$ phải thoả mãn.',
      ],
      solution:
        'Đường thẳng $2x + y = 4$ đi qua $A(2; 0)$ và $B(0; 4)$. Kể cả bờ nên dùng $\\le$ hoặc $\\ge$; $O$ thoả mãn $0 \\le 4$ nên bất phương trình là $2x + y \\le 4$.',
    },
    {
      type: 'number',
      prompt:
        'Lan có $120$ nghìn đồng để mua $x$ quyển vở giá $8$ nghìn đồng/quyển và $y$ chiếc bút giá $6$ nghìn đồng/chiếc, nên $8x + 6y \\le 120$. Nếu Lan mua $9$ quyển vở thì mua được nhiều nhất bao nhiêu chiếc bút?',
      answer: 8,
      unit: 'chiếc',
      hints: [
        'Thay $x = 9$ vào bất phương trình.',
        'Giải $72 + 6y \\le 120$, rồi chọn số tự nhiên lớn nhất.',
      ],
      solution:
        'Thay $x = 9$: $72 + 6y \\le 120 \\Leftrightarrow 6y \\le 48 \\Leftrightarrow y \\le 8$. Lan mua được nhiều nhất $8$ chiếc bút.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước biểu diễn miền nghiệm của bất phương trình $ax + by \\le c$ theo đúng thứ tự.',
      items: [
        'Vẽ đường thẳng $d: ax + by = c$ (nét liền).',
        'Lấy một điểm $M(x_0; y_0)$ không thuộc $d$.',
        'Tính $ax_0 + by_0$ và so sánh với $c$.',
        'Gạch bỏ nửa mặt phẳng không là miền nghiệm, giữ phần còn lại kể cả $d$.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải có đường thẳng bờ trước, rồi mới chọn điểm thử ở ngoài nó.'],
      solution:
        'Vẽ $d$ → lấy điểm $M$ không thuộc $d$ → tính $ax_0 + by_0$ và so sánh với $c$ → gạch bỏ nửa mặt phẳng không là miền nghiệm.',
    },
  ],
  takeaways: [
    'Bất phương trình bậc nhất hai ẩn có dạng $ax + by < c$ (hoặc $>$, $\\le$, $\\ge$) với $a$, $b$ không đồng thời bằng $0$; nó có vô số nghiệm.',
    'Miền nghiệm là một nửa mặt phẳng bờ $d: ax + by = c$; xác định nó bằng một điểm thử không thuộc $d$ (thường là $O$).',
    'Gạch bỏ phần không là miền nghiệm; vẽ $d$ nét đứt với $<$, $>$ và nét liền với $\\le$, $\\ge$.',
  ],
};
