/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biến cố hợp A ∪ B (A hoặc B xảy ra), biến cố giao AB (cả A và B cùng xảy ra), hai biến cố xung khắc và hai biến cố độc lập, minh hoạ bằng biểu đồ Ven trên không gian mẫu.',
  intro:
    'Một khu phố có các gia đình có ti vi, có máy vi tính, hoặc có cả hai. Câu hỏi "gia đình có ti vi hoặc có máy vi tính" và câu hỏi "gia đình có cả ti vi lẫn máy vi tính" mô tả hai biến cố khác nhau được tạo ra từ hai biến cố ban đầu. Bài này cho cách ghép các biến cố như vậy, và cho biết khi nào hai biến cố không thể cùng xảy ra hay không ảnh hưởng đến nhau.',
  objectives: [
    'Nhận biết biến cố hợp, biến cố giao của hai biến cố và mô tả chúng bằng tập hợp.',
    'Nhận biết hai biến cố xung khắc.',
    'Nhận biết hai biến cố độc lập và các cặp biến cố độc lập suy ra từ chúng.',
  ],
  sections: [
    {
      heading: 'Biến cố hợp và biến cố giao',
      blocks: [
        {
          type: 'p',
          text: 'Xét phép thử $T$ có không gian mẫu $\\Omega$. Mỗi biến cố liên quan đến $T$ là một tập con của $\\Omega$, gồm các kết quả thuận lợi cho biến cố đó. Từ hai biến cố $A$ và $B$ ta tạo ra các biến cố mới.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố hợp',
          text: 'Biến cố "$A$ hoặc $B$ xảy ra", kí hiệu là $A \\cup B$, được gọi là biến cố hợp của $A$ và $B$. Tập các kết quả thuận lợi cho $A \\cup B$ là hợp của hai tập con $A$ và $B$ của $\\Omega$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố giao',
          text: 'Biến cố "Cả $A$ và $B$ cùng xảy ra", kí hiệu là $AB$ (hay $A \\cap B$), được gọi là biến cố giao của $A$ và $B$. Tập các kết quả thuận lợi cho $AB$ là giao của hai tập con $A$ và $B$ của $\\Omega$.',
        },
        {
          type: 'p',
          text: '"$A$ hoặc $B$ xảy ra" nghĩa là có ít nhất một trong hai biến cố xảy ra. Nhắc lại từ lớp 10: biến cố đối của $A$, kí hiệu $\\overline{A}$, là biến cố "$A$ không xảy ra", $\\overline{A} = \\Omega \\setminus A$.',
        },
        {
          type: 'table',
          head: ['Biến cố', 'Nói bằng lời', 'Tập hợp'],
          rows: [
            [
              '$A \\cup B$',
              '$A$ hoặc $B$ xảy ra (ít nhất một biến cố xảy ra)',
              'hợp của hai tập $A$, $B$',
            ],
            ['$AB$', 'cả $A$ và $B$ cùng xảy ra', 'giao của hai tập $A$, $B$'],
            ['$\\overline{A}$', '$A$ không xảy ra', '$\\Omega \\setminus A$'],
          ],
        },
      ],
    },
    {
      heading: 'Biến cố xung khắc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố xung khắc',
          text: 'Hai biến cố $A$ và $B$ được gọi là xung khắc nếu $A$ và $B$ không đồng thời xảy ra. Nói cách khác, $A$ và $B$ xung khắc khi và chỉ khi $A \\cap B = \\varnothing$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn khi gieo một con xúc xắc, biến cố "ra mặt $1$ chấm" và biến cố "ra mặt chẵn chấm" xung khắc. Một biến cố $A$ và biến cố đối $\\overline{A}$ của nó luôn xung khắc. Ngược lại, hai biến cố xung khắc chưa chắc là hai biến cố đối: "ra mặt $1$ chấm" và "ra mặt $2$ chấm" xung khắc nhưng không đối nhau.',
        },
      ],
    },
    {
      heading: 'Biến cố độc lập',
      blocks: [
        {
          type: 'p',
          text: 'Minh và Sơn mỗi bạn gieo một con xúc xắc, đồng thời và độc lập với nhau. Gọi $A$ là biến cố "Minh gieo được mặt chẵn chấm", $B$ là biến cố "Sơn gieo được mặt có số chấm chia hết cho $3$". Kết quả gieo của Minh không làm thay đổi khả năng Sơn gieo được mặt $3$ hay $6$ chấm, và ngược lại.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố độc lập',
          text: 'Hai biến cố $A$ và $B$ được gọi là độc lập nếu việc xảy ra hay không xảy ra của biến cố này không làm ảnh hưởng tới xác suất xảy ra của biến cố kia.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Nếu $A$ và $B$ là hai biến cố độc lập thì $A$ và $\\overline{B}$; $\\overline{A}$ và $B$; $\\overline{A}$ và $\\overline{B}$ cũng là các cặp biến cố độc lập.',
        },
        {
          type: 'p',
          text: 'Khi gieo một con xúc xắc cân đối hai lần (như trong biểu đồ Ven ở phần khám phá), $36$ kết quả đồng khả năng. Khi đó "$A$ xảy ra không làm thay đổi khả năng xảy ra của $B$" có nghĩa là tỉ lệ kết quả thuận lợi cho $B$ trong số các kết quả của $A$ bằng tỉ lệ kết quả thuận lợi cho $B$ trên cả không gian mẫu. Bài 30 sẽ cho một công thức để kiểm tra điều này.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng nhầm',
          text: 'Xung khắc và độc lập là hai khái niệm khác nhau. Hai biến cố xung khắc (mỗi biến cố có thể xảy ra) thì không độc lập: nếu $A$ xảy ra thì chắc chắn $B$ không xảy ra, tức là $A$ đã ảnh hưởng đến xác suất của $B$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ Ven trên không gian mẫu',
    instruction:
      'Gieo một con xúc xắc hai lần, không gian mẫu có $36$ kết quả. Chọn hai biến cố $A$, $B$ trong danh sách (hoặc chạm vào các ô để tự chọn kết quả), rồi chọn biến cố muốn tô: $A \\cup B$, $AB$ hay các biến cố đối. Đọc số kết quả trong từng vùng của biểu đồ Ven và xem $A$, $B$ có xung khắc, có độc lập không. Thử cặp "tổng số chấm bằng $7$" và "lần đầu ra mặt $6$ chấm".',
  },
  examples: [
    {
      problem:
        'Một hộp có $25$ tấm thẻ được đánh số từ $1$ đến $25$. Rút ngẫu nhiên một tấm thẻ. Gọi $P$ là biến cố "Số ghi trên thẻ chia hết cho $4$", $Q$ là biến cố "Số ghi trên thẻ chia hết cho $6$". Mô tả không gian mẫu, các biến cố $P$, $Q$, $P \\cup Q$, $PQ$. Hai biến cố $P$ và $Q$ có xung khắc không?',
      steps: [
        '$\\Omega = \\{1; 2; \\ldots; 25\\}$.',
        '$P = \\{4; 8; 12; 16; 20; 24\\}$ và $Q = \\{6; 12; 18; 24\\}$.',
        '$P \\cup Q$ gồm các số thuộc $P$ hoặc thuộc $Q$: $P \\cup Q = \\{4; 6; 8; 12; 16; 18; 20; 24\\}$.',
        '$PQ$ gồm các số thuộc cả $P$ và $Q$, tức là chia hết cho cả $4$ và $6$: $PQ = \\{12; 24\\}$.',
        '$PQ \\ne \\varnothing$ nên $P$ và $Q$ không xung khắc: rút được thẻ số $12$ thì cả hai cùng xảy ra.',
      ],
      answer:
        '$P \\cup Q = \\{4; 6; 8; 12; 16; 18; 20; 24\\}$, $PQ = \\{12; 24\\}$; $P$ và $Q$ không xung khắc.',
    },
    {
      problem:
        'Một hộp có $5$ viên bi xanh và $3$ viên bi đỏ. Lấy ngẫu nhiên lần lượt hai viên bi. Gọi $A$ là biến cố "Viên bi lấy lần thứ nhất màu đỏ", $B$ là biến cố "Viên bi lấy lần thứ hai màu đỏ". Xét tính độc lập của $A$ và $B$ trong hai trường hợp: a) viên bi lấy lần đầu được trả lại hộp; b) viên bi lấy lần đầu không được trả lại hộp.',
      steps: [
        'a) Viên bi lần đầu được trả lại, nên lần thứ hai hộp vẫn có $3$ đỏ trong $8$ viên, dù $A$ có xảy ra hay không. Xác suất của $B$ luôn là $\\dfrac{3}{8}$: $A$ và $B$ độc lập.',
        'b) Nếu $A$ xảy ra, lần thứ hai hộp còn $2$ đỏ trong $7$ viên, khả năng lấy được bi đỏ là $\\dfrac{2}{7}$.',
        'Nếu $A$ không xảy ra (lần đầu lấy bi xanh), hộp còn $3$ đỏ trong $7$ viên, khả năng đó là $\\dfrac{3}{7}$.',
        'Việc $A$ xảy ra hay không làm thay đổi xác suất của $B$, nên $A$ và $B$ không độc lập.',
      ],
      answer: 'a) $A$ và $B$ độc lập. b) $A$ và $B$ không độc lập.',
    },
    {
      problem:
        'Hai xạ thủ, mỗi người bắn một viên đạn vào bia, độc lập với nhau. Gọi $A$ là biến cố "Xạ thủ thứ nhất bắn trúng", $B$ là biến cố "Xạ thủ thứ hai bắn trúng". Biểu diễn các biến cố sau qua $A$, $B$: $E$: "Có ít nhất một xạ thủ bắn trúng"; $F$: "Cả hai xạ thủ đều bắn trượt". Các biến cố $\\overline{A}$ và $\\overline{B}$ có độc lập không?',
      steps: [
        '"Có ít nhất một người bắn trúng" nghĩa là $A$ hoặc $B$ xảy ra: $E = A \\cup B$.',
        '"Cả hai đều bắn trượt" nghĩa là $\\overline{A}$ và $\\overline{B}$ cùng xảy ra: $F = \\overline{A}\\,\\overline{B}$. Đây cũng là biến cố đối của $E$.',
        'Hai người bắn độc lập nên $A$ và $B$ độc lập. Theo nhận xét, $\\overline{A}$ và $\\overline{B}$ cũng độc lập.',
      ],
      answer:
        '$E = A \\cup B$, $F = \\overline{A}\\,\\overline{B}$; $\\overline{A}$ và $\\overline{B}$ độc lập.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Gọi $A$ là biến cố "Ra mặt chẵn chấm", $B$ là biến cố "Ra mặt có số chấm nhỏ hơn $4$". Biến cố $A \\cup B$ có bao nhiêu kết quả thuận lợi?',
      answer: 5,
      hints: [
        'Viết $A$ và $B$ thành tập hợp các số chấm.',
        '$A = \\{2; 4; 6\\}$, $B = \\{1; 2; 3\\}$. Lấy hợp của hai tập, mỗi phần tử chỉ ghi một lần.',
      ],
      solution:
        '$A \\cup B = \\{1; 2; 3; 4; 6\\}$ có $5$ phần tử. Chỉ khi ra mặt $5$ chấm thì cả $A$ và $B$ đều không xảy ra.',
    },
    {
      type: 'number',
      prompt:
        'Với hai biến cố $A$, $B$ ở câu trên, biến cố giao $AB$ có bao nhiêu kết quả thuận lợi?',
      answer: 1,
      hints: ['$AB$ gồm các mặt vừa chẵn chấm vừa có số chấm nhỏ hơn $4$.'],
      solution: '$AB = \\{2\\}$, có $1$ kết quả thuận lợi.',
    },
    {
      type: 'number',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ trong hộp $25$ thẻ đánh số từ $1$ đến $25$. $P$: "Số trên thẻ chia hết cho $4$", $Q$: "Số trên thẻ chia hết cho $6$". Biến cố $P \\cup Q$ có bao nhiêu kết quả thuận lợi?',
      answer: 8,
      hints: [
        'Liệt kê các số chia hết cho $4$ và các số chia hết cho $6$ từ $1$ đến $25$.',
        'Hai số $12$ và $24$ nằm trong cả hai danh sách, chỉ đếm một lần.',
      ],
      solution:
        '$P$ có $6$ số, $Q$ có $4$ số, trong đó $12$ và $24$ thuộc cả hai. $P \\cup Q = \\{4; 6; 8; 12; 16; 18; 20; 24\\}$ có $6 + 4 - 2 = 8$ phần tử.',
    },
    {
      type: 'choice',
      prompt: 'Gieo một con xúc xắc. Cặp biến cố nào sau đây xung khắc?',
      options: [
        '"Ra mặt $1$ chấm" và "Ra mặt chẵn chấm"',
        '"Ra mặt chẵn chấm" và "Ra mặt có số chấm lớn hơn $3$"',
        '"Ra mặt lẻ chấm" và "Ra mặt có số chấm nhỏ hơn $3$"',
        '"Ra mặt có số chấm chia hết cho $3$" và "Ra mặt chẵn chấm"',
      ],
      answer: 0,
      hints: ['Hai biến cố xung khắc khi không có kết quả nào thuận lợi cho cả hai.'],
      solution:
        'Mặt $1$ chấm không chẵn, nên "Ra mặt $1$ chấm" và "Ra mặt chẵn chấm" không cùng xảy ra: chúng xung khắc. Các cặp còn lại đều có kết quả chung: mặt $4$ hoặc $6$; mặt $1$; mặt $6$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai xạ thủ mỗi người bắn một viên đạn. $A$: "Xạ thủ thứ nhất bắn trúng", $B$: "Xạ thủ thứ hai bắn trúng". Biến cố "Có ít nhất một xạ thủ bắn trúng" là',
      options: [
        '$A \\cup B$',
        '$AB$',
        '$\\overline{A}\\,\\overline{B}$',
        '$\\overline{A} \\cup \\overline{B}$',
      ],
      answer: 0,
      hints: ['"Ít nhất một" nghĩa là $A$ xảy ra hoặc $B$ xảy ra.'],
      solution:
        'Có ít nhất một người bắn trúng khi và chỉ khi $A$ hoặc $B$ xảy ra, tức là biến cố $A \\cup B$. $AB$ là "cả hai đều trúng", $\\overline{A}\\,\\overline{B}$ là "cả hai đều trượt", $\\overline{A} \\cup \\overline{B}$ là "có ít nhất một người bắn trượt".',
    },
    {
      type: 'choice',
      prompt:
        'Một hộp có $4$ viên bi trắng và $6$ viên bi đen. Lấy ngẫu nhiên lần lượt hai viên bi. $A$: "Lần thứ nhất lấy được bi trắng", $B$: "Lần thứ hai lấy được bi trắng". Trường hợp nào $A$ và $B$ độc lập?',
      options: [
        'Viên bi lấy lần thứ nhất được trả lại hộp trước khi lấy lần thứ hai',
        'Viên bi lấy lần thứ nhất không được trả lại hộp',
        'Cả hai trường hợp',
        'Không trường hợp nào',
      ],
      answer: 0,
      hints: [
        'Trong mỗi trường hợp, hỏi: nếu biết lần thứ nhất lấy được bi trắng, khả năng lấy được bi trắng ở lần thứ hai có thay đổi không?',
      ],
      solution:
        'Khi trả lại bi, lần thứ hai hộp vẫn là $4$ trắng, $6$ đen dù lần đầu ra màu gì: $A$, $B$ độc lập. Khi không trả lại, nếu $A$ xảy ra thì còn $3$ trắng trong $9$ viên, nếu không thì còn $4$ trắng trong $9$ viên: $A$ ảnh hưởng đến xác suất của $B$, nên không độc lập.',
    },
    {
      type: 'multi',
      prompt:
        'Biết $A$ và $B$ là hai biến cố độc lập. Những cặp biến cố nào sau đây chắc chắn độc lập?',
      options: [
        '$A$ và $\\overline{B}$',
        '$\\overline{A}$ và $B$',
        '$\\overline{A}$ và $\\overline{B}$',
        '$A$ và $\\overline{A}$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nhớ lại nhận xét sau định nghĩa biến cố độc lập.',
        'Một biến cố và biến cố đối của nó thì xung khắc.',
      ],
      solution:
        'Theo nhận xét, $A$ và $\\overline{B}$; $\\overline{A}$ và $B$; $\\overline{A}$ và $\\overline{B}$ đều độc lập. Còn $A$ và $\\overline{A}$ xung khắc: biết $A$ xảy ra thì $\\overline{A}$ chắc chắn không xảy ra, nên (khi $A$ có thể xảy ra nhưng không chắc chắn) chúng không độc lập.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc hai lần. $A$: "Tổng số chấm hai lần gieo bằng $7$", $B$: "Lần đầu ra mặt $6$ chấm". Biến cố $A \\cup B$ có bao nhiêu kết quả thuận lợi?',
      answer: 11,
      hints: [
        '$A$ có $6$ kết quả, $B$ có $6$ kết quả. Có kết quả nào thuộc cả hai không?',
        'Kết quả $(6, 1)$ thuộc cả $A$ và $B$.',
      ],
      solution:
        '$A = \\{(1, 6); (2, 5); (3, 4); (4, 3); (5, 2); (6, 1)\\}$, $B = \\{(6, 1); (6, 2); \\ldots; (6, 6)\\}$, $AB = \\{(6, 1)\\}$. Vậy $A \\cup B$ có $6 + 6 - 1 = 11$ kết quả.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo một con xúc xắc hai lần. $A$: "Hai lần gieo ra cùng số chấm", $B$: "Tổng số chấm bằng $7$". Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ xung khắc',
        '$A$ và $B$ là hai biến cố đối nhau',
        '$AB$ có đúng một kết quả',
        '$A \\cup B = \\Omega$',
      ],
      answer: 0,
      hints: ['Nếu hai lần ra cùng số chấm $a$ thì tổng là $2a$, một số chẵn.'],
      solution:
        'Hai lần ra cùng số chấm $a$ thì tổng bằng $2a$, là số chẵn, không thể bằng $7$. Vậy $AB = \\varnothing$: $A$ và $B$ xung khắc. Chúng không đối nhau vì $A \\cup B$ chỉ có $6 + 6 = 12$ trong $36$ kết quả.',
    },
  ],
  takeaways: [
    '$A \\cup B$: $A$ hoặc $B$ xảy ra (ít nhất một biến cố xảy ra); tập hợp là hợp của $A$ và $B$.',
    '$AB$ (hay $A \\cap B$): cả $A$ và $B$ cùng xảy ra; tập hợp là giao của $A$ và $B$.',
    '$A$ và $B$ xung khắc khi chúng không đồng thời xảy ra, tức là $A \\cap B = \\varnothing$.',
    '$A$ và $B$ độc lập khi việc xảy ra hay không của biến cố này không ảnh hưởng tới xác suất của biến cố kia; khi đó $A$ và $\\overline{B}$, $\\overline{A}$ và $B$, $\\overline{A}$ và $\\overline{B}$ cũng độc lập.',
  ],
};
