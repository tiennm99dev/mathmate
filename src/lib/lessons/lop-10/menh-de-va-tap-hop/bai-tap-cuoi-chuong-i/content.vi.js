/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương I: mệnh đề, mệnh đề phủ định, kéo theo, tương đương, điều kiện cần và đủ, kí hiệu với mọi và tồn tại; tập con, khoảng, đoạn, nửa khoảng và các phép toán trên tập hợp.',
  intro:
    'Chương I cho em hai công cụ dùng suốt chương trình Toán trung học phổ thông: ngôn ngữ mệnh đề để phát biểu và hiểu định lí, ngôn ngữ tập hợp để mô tả các tập số. Bài này giúp em ôn lại cả hai qua một bộ câu hỏi có minh hoạ và các bài tập tổng hợp.',
  objectives: [
    'Xét tính đúng sai của mệnh đề, lập mệnh đề phủ định, mệnh đề đảo.',
    'Phát biểu định lí bằng thuật ngữ điều kiện cần, điều kiện đủ.',
    'Thực hiện các phép toán giao, hợp, hiệu, phần bù với khoảng, đoạn, nửa khoảng và tập hữu hạn.',
  ],
  sections: [
    {
      heading: 'Mệnh đề',
      blocks: [
        {
          type: 'list',
          items: [
            'Mệnh đề là câu khẳng định đúng hoặc sai. $\\overline{P}$ đúng khi $P$ sai và ngược lại.',
            '$P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai. Mệnh đề đảo của $P \\Rightarrow Q$ là $Q \\Rightarrow P$.',
            'Nếu $P \\Rightarrow Q$ là định lí: $P$ là điều kiện đủ để có $Q$, $Q$ là điều kiện cần để có $P$.',
            '$P \\Leftrightarrow Q$ đúng khi cả $P \\Rightarrow Q$ và $Q \\Rightarrow P$ cùng đúng: $P$ là điều kiện cần và đủ để có $Q$.',
            'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$"; phủ định của "$\\exists x \\in X, P(x)$" là "$\\forall x \\in X, \\overline{P(x)}$".',
          ],
        },
      ],
    },
    {
      heading: 'Tập hợp',
      blocks: [
        {
          type: 'table',
          head: ['Phép toán', 'Gồm các phần tử'],
          rows: [
            ['$A \\cap B$', 'thuộc cả $A$ và $B$'],
            ['$A \\cup B$', 'thuộc $A$ hoặc thuộc $B$'],
            ['$A \\setminus B$', 'thuộc $A$ nhưng không thuộc $B$'],
            ['$C_E A$ (với $A \\subset E$)', 'thuộc $E$ nhưng không thuộc $A$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Với khoảng, đoạn, nửa khoảng, hãy biểu diễn các tập trên cùng một trục số và xét riêng từng điểm mút: điểm mút thuộc kết quả hay không tuỳ theo nó thuộc tập nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trắc nghiệm có minh hoạ',
    instruction:
      'Chọn một đáp án cho mỗi câu. Sau khi chọn, trục số hoặc biểu đồ Ven sẽ minh hoạ vì sao đáp án đúng; nhấn "Câu tiếp theo" để làm tiếp.',
  },
  examples: [
    {
      problem:
        'Cho $A = (-2; 4]$ và $B = [1; +\\infty)$. Tìm $A \\cap B$, $A \\setminus B$ và $C_{\\mathbb{R}} B$.',
      steps: [
        'Biểu diễn $A$ và $B$ trên cùng một trục số.',
        'Phần chung: $1 \\le x \\le 4$ (cả $1$ và $4$ đều thuộc hai tập), nên $A \\cap B = [1; 4]$.',
        'Bỏ khỏi $A$ các số $x \\ge 1$: còn $-2 < x < 1$, nên $A \\setminus B = (-2; 1)$.',
        '$C_{\\mathbb{R}} B$ gồm các số thực nhỏ hơn $1$: $C_{\\mathbb{R}} B = (-\\infty; 1)$.',
      ],
      answer:
        '$A \\cap B = [1; 4]$, $A \\setminus B = (-2; 1)$, $C_{\\mathbb{R}} B = (-\\infty; 1)$.',
    },
    {
      problem:
        'Xét tính đúng sai của mệnh đề $P$: "$\\forall x \\in \\mathbb{R}, x^2 \\ge x$" và lập mệnh đề phủ định của nó.',
      steps: [
        'Thử $x = \\dfrac{1}{2}$: $x^2 = \\dfrac{1}{4} < \\dfrac{1}{2} = x$. Có một giá trị làm $x^2 \\ge x$ sai, nên $P$ sai.',
        'Phủ định: $\\overline{P}$: "$\\exists x \\in \\mathbb{R}, x^2 < x$".',
        '$P$ sai nên $\\overline{P}$ đúng (chẳng hạn $x = \\dfrac{1}{2}$).',
      ],
      answer: '$P$ sai; $\\overline{P}$: "$\\exists x \\in \\mathbb{R}, x^2 < x$" là mệnh đề đúng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Câu nào sau đây không phải là mệnh đề?',
      options: [
        '"Bạn có chắc không?"',
        '"$\\pi$ là số vô tỉ."',
        '"$2 + 2 = 5$."',
        '"$\\sqrt{2} > 1$."',
      ],
      answer: 0,
      hints: ['Mệnh đề phải là câu khẳng định, đúng hoặc sai.'],
      solution:
        '"Bạn có chắc không?" là câu hỏi, không phải mệnh đề. Ba câu còn lại là câu khẳng định: "$\\pi$ là số vô tỉ" và "$\\sqrt{2} > 1$" đúng, "$2 + 2 = 5$" sai.',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề phủ định của mệnh đề "$\\forall x \\in \\mathbb{R}, x^2 - x + 1 > 0$" là',
      options: [
        '"$\\exists x \\in \\mathbb{R}, x^2 - x + 1 \\le 0$"',
        '"$\\exists x \\in \\mathbb{R}, x^2 - x + 1 < 0$"',
        '"$\\forall x \\in \\mathbb{R}, x^2 - x + 1 \\le 0$"',
        '"$\\forall x \\in \\mathbb{R}, x^2 - x + 1 < 0$"',
      ],
      answer: 0,
      hints: ['Đổi $\\forall$ thành $\\exists$.', 'Phủ định của "$> 0$" là "$\\le 0$".'],
      solution:
        'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$", và phủ định của "$x^2 - x + 1 > 0$" là "$x^2 - x + 1 \\le 0$".',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề nào sau đây đúng?',
      options: [
        '"$\\forall n \\in \\mathbb{N}, 2n \\ge n$"',
        '"$\\forall x \\in \\mathbb{R}, x^2 > 0$"',
        '"$\\exists n \\in \\mathbb{N}, n^2 = 2$"',
        '"$\\exists x \\in \\mathbb{R}, x^2 < 0$"',
      ],
      answer: 0,
      hints: ['Với mệnh đề "với mọi", tìm một phản ví dụ; với mệnh đề "tồn tại", tìm một ví dụ.'],
      solution:
        'Với mọi $n \\in \\mathbb{N}$ thì $n \\ge 0$ nên $2n = n + n \\ge n$: mệnh đề đúng. "$\\forall x \\in \\mathbb{R}, x^2 > 0$" sai vì $x = 0$; không có số tự nhiên nào có bình phương bằng $2$; mọi số thực có $x^2 \\ge 0$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho định lí "Nếu hai tam giác bằng nhau thì chúng có diện tích bằng nhau". Phát biểu nào sau đây đúng?',
      options: [
        'Hai tam giác có diện tích bằng nhau là điều kiện cần để hai tam giác đó bằng nhau.',
        'Hai tam giác có diện tích bằng nhau là điều kiện đủ để hai tam giác đó bằng nhau.',
        'Hai tam giác bằng nhau là điều kiện cần để chúng có diện tích bằng nhau.',
        'Hai tam giác bằng nhau là điều kiện cần và đủ để chúng có diện tích bằng nhau.',
      ],
      answer: 0,
      hints: ['Định lí $P \\Rightarrow Q$: $Q$ là điều kiện cần để có $P$.'],
      solution:
        'Với $P$: "hai tam giác bằng nhau", $Q$: "hai tam giác có diện tích bằng nhau", định lí là $P \\Rightarrow Q$. Vậy $Q$ là điều kiện cần để có $P$ (và $P$ là điều kiện đủ để có $Q$). Mệnh đề đảo sai, nên không có điều kiện cần và đủ.',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề "Nếu $2 > 3$ thì $4 > 5$" đúng hay sai?',
      options: [
        'Đúng, vì mệnh đề $2 > 3$ sai.',
        'Sai, vì mệnh đề $4 > 5$ sai.',
        'Sai, vì cả hai mệnh đề $2 > 3$ và $4 > 5$ đều sai.',
        'Đây không phải là mệnh đề.',
      ],
      answer: 0,
      hints: ['$P \\Rightarrow Q$ chỉ sai trong đúng một trường hợp. Ở đây $P$ đúng hay sai?'],
      solution:
        '$P$: "$2 > 3$" sai. Mệnh đề $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai, nên khi $P$ sai thì $P \\Rightarrow Q$ đúng.',
    },
    {
      type: 'number',
      prompt:
        'Cho $A = \\{x \\in \\mathbb{N} \\mid x \\le 3\\}$. Tập $A$ có bao nhiêu tập con có đúng hai phần tử?',
      answer: 6,
      hints: [
        'Liệt kê $A$, nhớ $0 \\in \\mathbb{N}$.',
        'Chọn hai phần tử khác nhau, không kể thứ tự.',
      ],
      solution:
        '$A = \\{0; 1; 2; 3\\}$. Các tập con hai phần tử: $\\{0; 1\\}$, $\\{0; 2\\}$, $\\{0; 3\\}$, $\\{1; 2\\}$, $\\{1; 3\\}$, $\\{2; 3\\}$. Có $6$ tập.',
    },
    {
      type: 'choice',
      prompt: 'Tập hợp $[-3; 1) \\cap [0; 4]$ là',
      options: ['$[0; 1)$', '$[0; 1]$', '$[-3; 4]$', '$(0; 1)$'],
      answer: 0,
      hints: ['Biểu diễn hai tập trên một trục số.', 'Số $1$ có thuộc $[-3; 1)$ không?'],
      solution:
        'Phần chung gồm $0 \\le x < 1$: $0$ thuộc cả hai tập, $1$ không thuộc $[-3; 1)$. Vậy kết quả là $[0; 1)$.',
    },
    {
      type: 'choice',
      prompt: 'Tập hợp $(-\\infty; -1) \\cup [-1; 2)$ là',
      options: [
        '$(-\\infty; 2)$',
        '$(-\\infty; 2]$',
        '$(-\\infty; -1) \\cup (-1; 2)$',
        '$[-1; 2)$',
      ],
      answer: 0,
      hints: ['Điểm $-1$ thuộc tập thứ hai.'],
      solution:
        'Mọi số nhỏ hơn $-1$ thuộc tập thứ nhất, các số từ $-1$ đến dưới $2$ thuộc tập thứ hai, nên hợp là $(-\\infty; 2)$, không có lỗ hổng tại $-1$.',
    },
    {
      type: 'choice',
      prompt: 'Tập hợp $\\mathbb{R} \\setminus (-\\infty; 3]$ là',
      options: ['$(3; +\\infty)$', '$[3; +\\infty)$', '$(-\\infty; 3)$', '$\\varnothing$'],
      answer: 0,
      hints: ['Bỏ khỏi $\\mathbb{R}$ các số $x \\le 3$.'],
      solution:
        'Các số thực không thoả mãn $x \\le 3$ là các số $x > 3$: $\\mathbb{R} \\setminus (-\\infty; 3] = (3; +\\infty)$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $m$ để $[m; m + 2] \\subset [1; 5]$?',
      answer: 3,
      hints: [
        'Đoạn $[m; m + 2]$ nằm trong $[1; 5]$ khi cả hai đầu mút của nó nằm trong $[1; 5]$.',
        'Giải $1 \\le m$ và $m + 2 \\le 5$.',
      ],
      solution:
        '$[m; m + 2] \\subset [1; 5] \\Leftrightarrow 1 \\le m$ và $m + 2 \\le 5$, tức là $1 \\le m \\le 3$. Các số nguyên $m$ là $1$, $2$, $3$: có $3$ số.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 10B có $45$ học sinh, trong đó $28$ bạn tham gia câu lạc bộ bóng đá, $20$ bạn tham gia câu lạc bộ cờ vua và $8$ bạn tham gia cả hai câu lạc bộ. Có bao nhiêu bạn tham gia đúng một câu lạc bộ?',
      answer: 32,
      hints: [
        'Tính số bạn tham gia ít nhất một câu lạc bộ bằng $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.',
        'Bớt đi những bạn tham gia cả hai.',
      ],
      solution:
        'Gọi $A$, $B$ là tập các bạn tham gia bóng đá, cờ vua. $n(A \\cup B) = 28 + 20 - 8 = 40$. Số bạn tham gia đúng một câu lạc bộ là $40 - 8 = 32$ (gồm $20$ bạn chỉ chơi bóng đá và $12$ bạn chỉ chơi cờ vua).',
    },
    {
      type: 'multi',
      prompt:
        'Cho $A = \\{x \\in \\mathbb{Z} \\mid -2 < x \\le 2\\}$ và $B = \\{x \\in \\mathbb{N} \\mid x < 4\\}$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$A \\cap B = \\{0; 1; 2\\}$',
        '$A \\cup B = \\{-1; 0; 1; 2; 3\\}$',
        '$A \\setminus B = \\{-1\\}$',
        '$B \\setminus A = \\varnothing$',
        '$A \\subset B$',
      ],
      answers: [0, 1, 2],
      hints: ['Liệt kê các phần tử: $A = \\{-1; 0; 1; 2\\}$. Còn $B$?'],
      solution:
        '$A = \\{-1; 0; 1; 2\\}$, $B = \\{0; 1; 2; 3\\}$. Khi đó $A \\cap B = \\{0; 1; 2\\}$, $A \\cup B = \\{-1; 0; 1; 2; 3\\}$, $A \\setminus B = \\{-1\\}$. Còn $B \\setminus A = \\{3\\} \\ne \\varnothing$ và $A \\not\\subset B$ vì $-1 \\notin B$.',
    },
  ],
  takeaways: [
    '$P \\Rightarrow Q$ chỉ sai khi $P$ đúng, $Q$ sai; mệnh đề đảo của một mệnh đề đúng có thể sai.',
    'Phủ định đổi $\\forall$ thành $\\exists$, $\\exists$ thành $\\forall$, và phủ định tính chất phía sau.',
    'Giao, hợp, hiệu của các khoảng: vẽ trên cùng trục số và xét riêng từng điểm mút.',
    '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$ với hai tập hữu hạn.',
  ],
};
