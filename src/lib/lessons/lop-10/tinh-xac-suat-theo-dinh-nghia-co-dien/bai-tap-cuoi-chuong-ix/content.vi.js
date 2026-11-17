/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương IX: không gian mẫu, biến cố, biến cố đối, định nghĩa cổ điển của xác suất, tính xác suất bằng tổ hợp, sơ đồ hình cây và biến cố đối, nguyên lí xác suất bé.',
  intro:
    'Chương IX cho ta một quy trình rõ ràng để tính xác suất: mô tả không gian mẫu, đếm $n(\\Omega)$ và $n(E)$ bằng các công cụ của đại số tổ hợp, rồi lập tỉ số. Bài này hệ thống lại kiến thức, luyện từng kĩ năng và kiểm chứng đáp số bằng mô phỏng hàng nghìn lần thử.',
  objectives: [
    'Mô tả không gian mẫu, biến cố và biến cố đối của một phép thử.',
    'Tính xác suất theo định nghĩa cổ điển bằng liệt kê, bảng, sơ đồ hình cây hoặc tổ hợp.',
    'Dùng $P(\\overline{E}) = 1 - P(E)$ và nguyên lí xác suất bé trong bài toán thực tế.',
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
              'Không gian mẫu',
              'Tập $\\Omega$ mọi kết quả có thể của phép thử, có $n(\\Omega)$ phần tử',
            ],
            [
              'Biến cố',
              'Tập con $E \\subset \\Omega$; mỗi phần tử của $E$ là một kết quả thuận lợi',
            ],
            ['Biến cố chắc chắn, không thể', '$\\Omega$ và $\\varnothing$'],
            ['Biến cố đối', '$\\overline{E} = \\Omega \\setminus E$: "$E$ không xảy ra"'],
            [
              'Định nghĩa cổ điển',
              'Các kết quả đồng khả năng: $P(E) = \\dfrac{n(E)}{n(\\Omega)}$, $0 \\le P(E) \\le 1$',
            ],
            ['Xác suất của biến cố đối', '$P(\\overline{E}) = 1 - P(E)$'],
            [
              'Nguyên lí xác suất bé',
              'Biến cố có xác suất rất bé thì trong một phép thử coi như không xảy ra',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn cách đếm',
          text: 'Lấy đồng thời $k$ phần tử: tổ hợp $C_n^k$. Xếp hàng: hoán vị $n!$. Phép thử nhiều bước: sơ đồ hình cây hoặc bảng, quy tắc nhân. Gặp "ít nhất một", "có cả": thử đếm biến cố đối.',
        },
      ],
    },
    {
      heading: 'Kiểm chứng bằng mô phỏng',
      blocks: [
        {
          type: 'p',
          text: 'Chọn một bài toán, đọc cách tính $P(E)$ rồi chạy hàng nghìn lần thử ngẫu nhiên. Nếu tính đúng, tần suất của $E$ sẽ dần ổn định quanh giá trị $P(E)$ đã tính.',
        },
        { type: 'widget', name: 'simulate' },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập theo kĩ năng',
    instruction:
      'Mỗi câu được sinh ngẫu nhiên từ một kĩ năng của chương. Nhập số phần tử là số tự nhiên, nhập xác suất dạng phân số $a/b$. Trả lời sai lần đầu sẽ có gợi ý và một lần thử lại; bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Gieo một con xúc xắc cân đối hai lần liên tiếp. Tính xác suất của biến cố $E$: "Tích hai số chấm là số lẻ".',
      steps: [
        'Lập bảng $6 \\times 6$: $n(\\Omega) = 36$.',
        'Tích là số lẻ khi cả hai số chấm đều lẻ: mỗi lần có $3$ mặt lẻ, nên $n(E) = 3 \\cdot 3 = 9$.',
        '$P(E) = \\dfrac{9}{36} = \\dfrac{1}{4}$.',
      ],
      answer: '$P(E) = \\dfrac{1}{4}$.',
    },
    {
      problem:
        'Một nhóm có $5$ bạn nam và $4$ bạn nữ. Chọn ngẫu nhiên $3$ bạn. Tính xác suất để trong $3$ bạn được chọn có đúng $1$ bạn nữ.',
      steps: [
        '$n(\\Omega) = C_9^3 = 84$.',
        'Chọn $1$ bạn nữ trong $4$: $C_4^1 = 4$ cách; chọn $2$ bạn nam trong $5$: $C_5^2 = 10$ cách.',
        '$n(E) = 4 \\cdot 10 = 40$, nên $P(E) = \\dfrac{40}{84} = \\dfrac{10}{21}$.',
      ],
      answer: '$P(E) = \\dfrac{10}{21}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Gieo hai con xúc xắc cân đối. Xác suất để tổng số chấm xuất hiện bằng $8$ là',
      options: ['$\\dfrac{5}{36}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{9}$', '$\\dfrac{2}{11}$'],
      answer: 0,
      hints: ['$n(\\Omega) = 36$.', 'Liệt kê các cặp $(i, j)$ có $i + j = 8$.'],
      solution:
        'Các kết quả thuận lợi: $(2, 6); (3, 5); (4, 4); (5, 3); (6, 2)$. $P = \\dfrac{5}{36}$. Đáp án $\\dfrac{2}{11}$ sai vì coi $11$ giá trị tổng từ $2$ đến $12$ là đồng khả năng.',
    },
    {
      type: 'fraction',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có $30$ tấm thẻ đánh số từ $1$ đến $30$. Tính xác suất để số ghi trên thẻ là số nguyên tố.',
      answer: [1, 3],
      hints: ['Liệt kê các số nguyên tố không vượt quá $30$.'],
      solution:
        'Các số nguyên tố: $2; 3; 5; 7; 11; 13; 17; 19; 23; 29$, có $10$ số. $P = \\dfrac{10}{30} = \\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất để số được chọn chia hết cho $5$.',
      answer: [1, 5],
      hints: [
        'Có bao nhiêu số tự nhiên có hai chữ số?',
        'Các số chia hết cho $5$: $10; 15; \\ldots; 95$.',
      ],
      solution:
        '$n(\\Omega) = 99 - 10 + 1 = 90$. Các số $10; 15; \\ldots; 95$ có $\\dfrac{95 - 10}{5} + 1 = 18$ số. $P = \\dfrac{18}{90} = \\dfrac{1}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối $4$ lần liên tiếp. Tính xác suất của biến cố "Có đúng $2$ lần xuất hiện mặt ngửa".',
      answer: [3, 8],
      hints: ['$n(\\Omega) = 2^4$.', 'Chọn $2$ trong $4$ lần tung là mặt ngửa.'],
      solution:
        '$n(\\Omega) = 16$, $n(E) = C_4^2 = 6$, nên $P(E) = \\dfrac{6}{16} = \\dfrac{3}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối hai lần liên tiếp. Tính xác suất để có ít nhất một lần xuất hiện mặt $6$ chấm.',
      answer: [11, 36],
      hints: ['Biến cố đối là "Không lần nào xuất hiện mặt $6$ chấm".'],
      solution:
        'Biến cố đối có $5 \\cdot 5 = 25$ kết quả, nên $P(\\overline{E}) = \\dfrac{25}{36}$ và $P(E) = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một nhóm có $5$ bạn nam và $4$ bạn nữ. Chọn ngẫu nhiên $3$ bạn. Tính xác suất để trong $3$ bạn được chọn có cả nam và nữ.',
      answer: [5, 6],
      hints: ['Biến cố đối là "Ba bạn toàn nam hoặc toàn nữ".', '$n(\\Omega) = C_9^3 = 84$.'],
      solution:
        '$n(\\overline{E}) = C_5^3 + C_4^3 = 10 + 4 = 14$, nên $P(E) = 1 - \\dfrac{14}{84} = \\dfrac{70}{84} = \\dfrac{5}{6}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một lô hàng có $10$ sản phẩm, trong đó có $3$ phế phẩm. Lấy ngẫu nhiên đồng thời $2$ sản phẩm. Tính xác suất để có ít nhất $1$ phế phẩm.',
      answer: [8, 15],
      hints: ['Biến cố đối là "Cả hai sản phẩm đều tốt".', 'Có $7$ sản phẩm tốt.'],
      solution:
        '$n(\\Omega) = C_{10}^2 = 45$, $n(\\overline{E}) = C_7^2 = 21$, nên $P(E) = 1 - \\dfrac{21}{45} = \\dfrac{24}{45} = \\dfrac{8}{15}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Xếp ngẫu nhiên bốn bạn An, Bình, Cường, Dũng thành một hàng ngang. Tính xác suất để An đứng ở đầu hàng bên trái.',
      answer: [1, 4],
      hints: ['$n(\\Omega) = 4!$.', 'Cố định An ở đầu hàng rồi xếp ba bạn còn lại.'],
      solution:
        '$n(\\Omega) = 4! = 24$, $n(E) = 3! = 6$, nên $P(E) = \\dfrac{6}{24} = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên hai đỉnh của một lục giác đều. Tính xác suất để đoạn thẳng nối hai đỉnh đó là một đường chéo của lục giác.',
      answer: [3, 5],
      hints: ['Số đoạn thẳng nối hai đỉnh là $C_6^2$.', 'Bỏ đi $6$ đoạn là cạnh.'],
      solution:
        '$n(\\Omega) = C_6^2 = 15$; có $6$ cạnh, nên số đường chéo là $15 - 6 = 9$. $P = \\dfrac{9}{15} = \\dfrac{3}{5}$.',
    },
    {
      type: 'multi',
      prompt: 'Gieo một con xúc xắc. Những biến cố nào dưới đây là biến cố chắc chắn?',
      options: [
        '"Số chấm xuất hiện nhỏ hơn $7$"',
        '"Số chấm xuất hiện lớn hơn $0$"',
        '"Số chấm xuất hiện bằng $7$"',
        '"Số chấm xuất hiện là số chẵn"',
      ],
      answers: [0, 1],
      hints: ['Biến cố chắc chắn chứa mọi kết quả của $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$.'],
      solution:
        '"Nhỏ hơn $7$" và "lớn hơn $0$" đều đúng với cả $6$ kết quả nên là biến cố chắc chắn. "Bằng $7$" là biến cố không thể, còn "số chẵn" chỉ gồm $\\{2; 4; 6\\}$.',
    },
    {
      type: 'number',
      prompt: 'Biết $P(E) = 0{,}35$. Tính $P(\\overline{E})$.',
      answer: 0.65,
      hints: ['$P(\\overline{E}) = 1 - P(E)$.'],
      solution: '$P(\\overline{E}) = 1 - 0{,}35 = 0{,}65$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong tình huống nào dưới đây, xác suất xảy ra sự cố là $0{,}001$ thì không thể coi là xác suất bé?',
      options: [
        'Một động cơ máy bay gặp sự cố khi bay',
        'Một chiếc bút bi mới bị hỏng',
        'Một bóng đèn mới không sáng',
        'Một chuyến tàu đến ga muộn vài phút',
      ],
      answer: 0,
      hints: ['Một xác suất có bé hay không còn tuỳ hậu quả của sự cố.'],
      solution:
        'Sự cố động cơ máy bay gây hậu quả rất nghiêm trọng, nên xác suất $0{,}001$ không thể coi là bé; với bút bi, bóng đèn hay tàu đến muộn vài phút thì có thể coi là bé.',
    },
  ],
  takeaways: [
    'Ba bước: mô tả $\\Omega$ và đếm $n(\\Omega)$, đếm $n(E)$, lập tỉ số $P(E) = \\dfrac{n(E)}{n(\\Omega)}$.',
    'Đếm bằng liệt kê, bảng, sơ đồ hình cây hoặc tổ hợp; kiểm tra các kết quả có đồng khả năng không.',
    '$P(\\overline{E}) = 1 - P(E)$ giúp giải nhanh các bài "ít nhất một", "có cả".',
    'Mô phỏng nhiều lần thử: tần suất ổn định quanh xác suất; biến cố có xác suất rất bé coi như không xảy ra trong một phép thử.',
  ],
};
