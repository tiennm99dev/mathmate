/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biến cố là tập con của không gian mẫu, biến cố đối là phần bù của nó; định nghĩa cổ điển P(E) = n(E)/n(Ω) khi các kết quả đồng khả năng, và nguyên lí xác suất bé.',
  intro:
    'Gieo hai con xúc xắc cân đối: tổng số chấm bằng $7$ hay tổng số chấm bằng $12$, khả năng nào lớn hơn? Ở lớp 9 ta đã tính xác suất bằng cách đếm kết quả. Bài này dùng ngôn ngữ tập hợp để nói chính xác thế nào là biến cố, biến cố đối và xác suất của một biến cố.',
  objectives: [
    'Mô tả không gian mẫu $\\Omega$ của một phép thử và biểu diễn biến cố như một tập con của $\\Omega$.',
    'Nhận biết biến cố chắc chắn, biến cố không thể và xác định biến cố đối $\\overline{E} = \\Omega \\setminus E$.',
    'Tính xác suất theo định nghĩa cổ điển $P(E) = \\dfrac{n(E)}{n(\\Omega)}$.',
    'Hiểu ý nghĩa của nguyên lí xác suất bé.',
  ],
  sections: [
    {
      heading: 'Biến cố',
      blocks: [
        {
          type: 'p',
          text: 'Phép thử ngẫu nhiên (gọi tắt là phép thử) là một thí nghiệm hay một hành động mà kết quả của nó không thể biết trước được trước khi phép thử được thực hiện. Ta chỉ xét các phép thử mà không gian mẫu gồm hữu hạn phần tử.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Không gian mẫu',
          text: 'Không gian mẫu của phép thử là tập hợp tất cả các kết quả có thể xảy ra của phép thử, kí hiệu là $\\Omega$. Số phần tử của $\\Omega$ kí hiệu là $n(\\Omega)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố',
          text: 'Mỗi biến cố liên quan đến phép thử là một tập con $E$ của không gian mẫu. Mỗi phần tử của $E$ được gọi là một kết quả thuận lợi cho $E$; $n(E)$ là số kết quả thuận lợi cho $E$.',
        },
        {
          type: 'p',
          text: 'Biến cố $E$ xảy ra khi và chỉ khi kết quả của phép thử thuộc tập $E$. Chẳng hạn gieo một con xúc xắc, $\\Omega = \\{1; 2; 3; 4; 5; 6\\}$; biến cố "Số chấm xuất hiện là số lẻ" là tập $E = \\{1; 3; 5\\}$. Nếu gieo được mặt $3$ chấm thì $E$ xảy ra.',
        },
        {
          type: 'list',
          items: [
            'Biến cố chắc chắn là biến cố luôn xảy ra, nó chính là tập $\\Omega$.',
            'Biến cố không thể là biến cố không bao giờ xảy ra, nó là tập $\\varnothing$.',
          ],
        },
      ],
    },
    {
      heading: 'Biến cố đối',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố đối',
          text: 'Biến cố đối của biến cố $E$, kí hiệu $\\overline{E}$, là biến cố "$E$ không xảy ra". Biến cố đối của $E$ là tập con $\\overline{E} = \\Omega \\setminus E$ của không gian mẫu.',
        },
        {
          type: 'p',
          text: 'Trong mỗi lần thử, đúng một trong hai biến cố $E$ và $\\overline{E}$ xảy ra. Vì $E$ và $\\overline{E}$ chia không gian mẫu thành hai phần không giao nhau nên $n(E) + n(\\overline{E}) = n(\\Omega)$.',
        },
        {
          type: 'table',
          caption: 'Gieo một con xúc xắc',
          head: ['Biến cố', 'Tập con của $\\Omega$'],
          rows: [
            ['$E$: "Số chấm là số lẻ"', '$\\{1; 3; 5\\}$'],
            ['$\\overline{E}$: "Số chấm là số chẵn"', '$\\{2; 4; 6\\}$'],
            ['$F$: "Số chấm lớn hơn $4$"', '$\\{5; 6\\}$'],
            ['$\\overline{F}$: "Số chấm không lớn hơn $4$"', '$\\{1; 2; 3; 4\\}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Biến cố đối của "Có ít nhất một ..." là "Không có ... nào", không phải "Có nhiều nhất một ...". Hãy diễn đạt $\\overline{E}$ bằng lời rồi kiểm tra lại bằng tập hợp.',
        },
      ],
    },
    {
      heading: 'Định nghĩa cổ điển của xác suất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho phép thử $T$ với không gian mẫu $\\Omega$ gồm hữu hạn kết quả có cùng khả năng xảy ra (đồng khả năng). Với mỗi biến cố $E$, xác suất của $E$ là $$P(E) = \\dfrac{n(E)}{n(\\Omega)},$$ trong đó $n(E)$, $n(\\Omega)$ lần lượt là số phần tử của $E$ và $\\Omega$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Với mọi biến cố $E$: $0 \\le P(E) \\le 1$; $P(\\Omega) = 1$; $P(\\varnothing) = 0$.',
        },
        {
          type: 'p',
          text: 'Tính xác suất theo định nghĩa cổ điển gồm ba bước: mô tả không gian mẫu và đếm $n(\\Omega)$; xác định các kết quả thuận lợi và đếm $n(E)$; lập tỉ số $\\dfrac{n(E)}{n(\\Omega)}$. Điều kiện "đồng khả năng" là quan trọng: đồng xu, con xúc xắc phải cân đối, việc chọn phải ngẫu nhiên.',
        },
      ],
    },
    {
      heading: 'Nguyên lí xác suất bé',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên lí xác suất bé',
          text: 'Qua thực tế, người ta thấy nếu một biến cố có xác suất rất bé thì trong một phép thử, biến cố đó sẽ không xảy ra.',
        },
        {
          type: 'p',
          text: 'Một xác suất được coi là bé hay không tuỳ thuộc vào từng tình huống. Chẳng hạn, xác suất một chiếc điện thoại bị lỗi kĩ thuật là $0{,}001$ có thể coi là bé, nhưng xác suất một động cơ máy bay gặp sự cố cũng là $0{,}001$ thì không thể coi là bé: hậu quả quá nghiêm trọng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô kết quả thuận lợi trên không gian mẫu',
    instruction:
      'Chọn phép thử và biến cố $E$, chạm vào các ô của không gian mẫu là kết quả thuận lợi rồi bấm "Kiểm tra" để nhận $n(E)$, $n(\\Omega)$ và $P(E)$. Chuyển sang "Biến cố đối Ē" để tô phần còn lại, và bấm "Thực hiện phép thử" để xem một kết quả ngẫu nhiên làm $E$ xảy ra hay không.',
  },
  examples: [
    {
      problem:
        'Gieo hai con xúc xắc cân đối. Tính xác suất của các biến cố $A$: "Tổng số chấm nhỏ hơn $13$", $B$: "Tổng số chấm bằng $13$" và $C$: "Tổng số chấm bằng $7$".',
      steps: [
        'Mỗi kết quả là một cặp $(i, j)$ với $1 \\le i, j \\le 6$, nên $n(\\Omega) = 6 \\cdot 6 = 36$; các kết quả đồng khả năng vì hai con xúc xắc cân đối.',
        'Tổng số chấm luôn không vượt quá $12$, nên $A = \\Omega$ là biến cố chắc chắn: $P(A) = \\dfrac{36}{36} = 1$.',
        'Không có kết quả nào có tổng bằng $13$, nên $B = \\varnothing$ là biến cố không thể: $P(B) = 0$.',
        '$C = \\{(1, 6); (2, 5); (3, 4); (4, 3); (5, 2); (6, 1)\\}$, $n(C) = 6$, nên $P(C) = \\dfrac{6}{36} = \\dfrac{1}{6}$.',
      ],
      answer: '$P(A) = 1$, $P(B) = 0$, $P(C) = \\dfrac{1}{6}$.',
    },
    {
      problem:
        'Chọn ngẫu nhiên một số nguyên dương không lớn hơn $30$. Tính xác suất của biến cố $E$: "Số được chọn chia hết cho $4$" và của biến cố đối $\\overline{E}$.',
      steps: [
        '$\\Omega = \\{1; 2; \\ldots; 30\\}$, $n(\\Omega) = 30$.',
        '$E = \\{4; 8; 12; 16; 20; 24; 28\\}$, $n(E) = 7$, nên $P(E) = \\dfrac{7}{30}$.',
        '$\\overline{E} = \\Omega \\setminus E$ có $30 - 7 = 23$ phần tử, nên $P(\\overline{E}) = \\dfrac{23}{30}$.',
      ],
      answer: '$P(E) = \\dfrac{7}{30}$, $P(\\overline{E}) = \\dfrac{23}{30}$.',
    },
    {
      problem:
        'Chọn ngẫu nhiên một số nguyên trong các số từ $11$ đến $99$. Tính xác suất để số được chọn là số chẵn.',
      steps: [
        'Từ $11$ đến $99$ có $99 - 11 + 1 = 89$ số nguyên, nên $n(\\Omega) = 89$.',
        'Biến cố $B$: "Số được chọn là số chẵn", $B = \\{12; 14; \\ldots; 98\\}$ có $\\dfrac{98 - 12}{2} + 1 = 44$ phần tử.',
        '$P(B) = \\dfrac{44}{89}$.',
      ],
      answer: '$P(B) = \\dfrac{44}{89}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Gieo một con xúc xắc hai lần liên tiếp. Không gian mẫu có bao nhiêu phần tử?',
      answer: 36,
      hints: ['Mỗi kết quả là một cặp $(i, j)$: số chấm lần đầu và số chấm lần sau.'],
      solution:
        'Lần gieo đầu có $6$ kết quả, mỗi kết quả đó đi với $6$ kết quả của lần sau: $n(\\Omega) = 6 \\cdot 6 = 36$.',
    },
    {
      type: 'choice',
      prompt:
        'Tung một đồng xu ba lần liên tiếp. Biến cố đối của biến cố "Có ít nhất một lần xuất hiện mặt ngửa" là',
      options: [
        '"Cả ba lần đều xuất hiện mặt sấp"',
        '"Có nhiều nhất một lần xuất hiện mặt ngửa"',
        '"Cả ba lần đều xuất hiện mặt ngửa"',
        '"Có đúng một lần xuất hiện mặt sấp"',
      ],
      answer: 0,
      hints: [
        'Biến cố đối là "biến cố đã cho không xảy ra".',
        '"Không có lần nào ngửa" nghĩa là gì?',
      ],
      solution:
        '"Có ít nhất một lần ngửa" không xảy ra nghĩa là không có lần nào ngửa, tức là cả ba lần đều xuất hiện mặt sấp: $\\overline{E} = \\{SSS\\}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số nguyên dương không lớn hơn $50$. Tính xác suất để số được chọn chia hết cho $7$.',
      answer: [7, 50],
      hints: ['$n(\\Omega) = 50$.', 'Liệt kê các bội của $7$ không vượt quá $50$.'],
      solution:
        'Các số chia hết cho $7$ là $7; 14; 21; 28; 35; 42; 49$, có $7$ số. Vậy $P = \\dfrac{7}{50}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo hai con xúc xắc cân đối. Tính xác suất của biến cố "Tổng số chấm xuất hiện bằng $9$".',
      answer: [1, 9],
      hints: ['$n(\\Omega) = 36$.', 'Liệt kê các cặp $(i, j)$ có $i + j = 9$.'],
      solution:
        'Các kết quả thuận lợi: $(3, 6); (4, 5); (5, 4); (6, 3)$, có $4$ kết quả. $P = \\dfrac{4}{36} = \\dfrac{1}{9}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp thứ nhất có $4$ viên bi đánh số $1; 2; 3; 4$, hộp thứ hai có $5$ viên bi đánh số $1; 2; 3; 4; 5$. Lấy ngẫu nhiên từ mỗi hộp một viên bi. Tính xác suất để tổng hai số ghi trên hai viên bi không nhỏ hơn $7$.',
      answer: [3, 10],
      hints: [
        'Mỗi kết quả là một cặp $(a, b)$, $n(\\Omega) = 4 \\cdot 5 = 20$.',
        'Với mỗi $a$, tìm các $b$ để $a + b \\ge 7$.',
      ],
      solution:
        'Các kết quả thuận lợi: $(2, 5); (3, 4); (3, 5); (4, 3); (4, 4); (4, 5)$, có $6$ kết quả. $P = \\dfrac{6}{20} = \\dfrac{3}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối ba lần liên tiếp. Tính xác suất của biến cố "Có đúng hai lần xuất hiện mặt ngửa".',
      answer: [3, 8],
      hints: [
        'Liệt kê $\\Omega$ bằng sơ đồ cây: có $8$ kết quả.',
        'Tìm các kết quả có đúng hai chữ $N$.',
      ],
      solution:
        '$\\Omega = \\{SSS; SSN; SNS; SNN; NSS; NSN; NNS; NNN\\}$. Các kết quả thuận lợi: $SNN; NSN; NNS$. $P = \\dfrac{3}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối ba lần liên tiếp và gọi $E$ là biến cố "Có đúng hai lần xuất hiện mặt ngửa". Tính xác suất của biến cố đối $\\overline{E}$.',
      answer: [5, 8],
      hints: ['$n(E) = 3$ và $n(\\Omega) = 8$.', '$n(\\overline{E}) = n(\\Omega) - n(E)$.'],
      solution: '$n(\\overline{E}) = 8 - 3 = 5$, nên $P(\\overline{E}) = \\dfrac{5}{8}$.',
    },
    {
      type: 'multi',
      prompt: 'Những khẳng định nào dưới đây là đúng với mọi biến cố $E$ của một phép thử?',
      options: [
        '$0 \\le P(E) \\le 1$',
        '$P(\\Omega) = 1$ và $P(\\varnothing) = 0$',
        '$n(E) + n(\\overline{E}) = n(\\Omega)$',
        '$P(E)$ có thể lớn hơn $1$ khi $E$ có nhiều kết quả thuận lợi',
        '$\\overline{E}$ luôn có ít phần tử hơn $E$',
      ],
      answers: [0, 1, 2],
      hints: ['$E \\subset \\Omega$ nên $0 \\le n(E) \\le n(\\Omega)$.'],
      solution:
        'Vì $0 \\le n(E) \\le n(\\Omega)$ nên $0 \\le P(E) \\le 1$, không thể lớn hơn $1$; $P(\\Omega) = 1$, $P(\\varnothing) = 0$; $E$ và $\\overline{E}$ chia $\\Omega$ thành hai phần nên $n(E) + n(\\overline{E}) = n(\\Omega)$. Còn $\\overline{E}$ có thể nhiều phần tử hơn $E$ (chẳng hạn $E = \\varnothing$).',
    },
    {
      type: 'fraction',
      prompt:
        'Một nhóm có $5$ bạn nữ và $4$ bạn nam. Chọn ngẫu nhiên một bạn trong nhóm. Tính xác suất để bạn được chọn là bạn nữ.',
      answer: [5, 9],
      hints: ['Không gian mẫu là tập $9$ bạn trong nhóm.'],
      solution: '$n(\\Omega) = 9$, có $5$ kết quả thuận lợi, nên $P = \\dfrac{5}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Theo nguyên lí xác suất bé, một biến cố có xác suất rất bé thì',
      options: [
        'trong một phép thử, biến cố đó sẽ không xảy ra',
        'là biến cố không thể',
        'có xác suất bằng $0$',
        'chắc chắn xảy ra nếu thực hiện phép thử một lần',
      ],
      answer: 0,
      hints: ['Xác suất rất bé nhưng vẫn lớn hơn $0$.'],
      solution:
        'Nguyên lí xác suất bé: biến cố có xác suất rất bé thì trong một phép thử ta coi như nó không xảy ra. Nó vẫn không phải biến cố không thể, vì xác suất của nó lớn hơn $0$.',
    },
  ],
  takeaways: [
    'Không gian mẫu $\\Omega$ là tập mọi kết quả có thể; mỗi biến cố là một tập con $E \\subset \\Omega$.',
    'Biến cố chắc chắn là $\\Omega$, biến cố không thể là $\\varnothing$; biến cố đối $\\overline{E} = \\Omega \\setminus E$.',
    'Khi các kết quả đồng khả năng: $P(E) = \\dfrac{n(E)}{n(\\Omega)}$, và $0 \\le P(E) \\le 1$.',
    'Nguyên lí xác suất bé: biến cố có xác suất rất bé thì trong một phép thử coi như không xảy ra.',
  ],
};
