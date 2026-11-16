/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mệnh đề và mệnh đề chứa biến, mệnh đề phủ định, mệnh đề kéo theo và mệnh đề đảo, mệnh đề tương đương, điều kiện cần và đủ, mệnh đề với kí hiệu với mọi và tồn tại.',
  intro:
    'Trong toán học, mỗi định lí là một câu khẳng định hoặc đúng hoặc sai, không có chuyện "vừa đúng vừa sai". Bài học này giới thiệu ngôn ngữ của những câu như vậy, gọi là mệnh đề, và cách ghép chúng: phủ định, "nếu ... thì ...", "khi và chỉ khi", "với mọi", "tồn tại".',
  objectives: [
    'Nhận biết mệnh đề, mệnh đề chứa biến và xác định tính đúng sai của một mệnh đề.',
    'Lập mệnh đề phủ định của một mệnh đề.',
    'Lập mệnh đề kéo theo, mệnh đề đảo, mệnh đề tương đương và xét tính đúng sai của chúng.',
    'Phát biểu một định lí dưới dạng điều kiện cần, điều kiện đủ, điều kiện cần và đủ.',
    'Dùng kí hiệu $\\forall$, $\\exists$ và lập mệnh đề phủ định của mệnh đề chứa chúng.',
  ],
  sections: [
    {
      heading: 'Mệnh đề. Mệnh đề chứa biến',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề',
          text: 'Mệnh đề là một câu khẳng định đúng hoặc một câu khẳng định sai. Một mệnh đề không thể vừa đúng, vừa sai.',
        },
        {
          type: 'p',
          text: 'Ta thường kí hiệu mệnh đề bằng chữ in hoa, chẳng hạn $P$: "$7$ là số nguyên tố" là một mệnh đề đúng; $Q$: "$2 + 3 = 6$" là một mệnh đề sai. Các câu hỏi, câu cảm thán, câu cầu khiến không phải là mệnh đề.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề chứa biến',
          text: 'Câu "$n$ chia hết cho $5$" chưa thể nói đúng hay sai; nhưng khi thay $n$ bởi một số tự nhiên cụ thể, ta được một mệnh đề. Câu như vậy gọi là mệnh đề chứa biến, kí hiệu $P(n)$.',
        },
        {
          type: 'p',
          text: 'Với $P(n)$: "$n$ chia hết cho $5$" thì $P(10)$ là mệnh đề đúng, còn $P(7)$ là mệnh đề sai.',
        },
        { type: 'p', text: 'Thử xếp các câu sau vào đúng ô của nó:' },
        { type: 'widget', name: 'phan-loai' },
      ],
    },
    {
      heading: 'Mệnh đề phủ định',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề phủ định',
          text: 'Mệnh đề phủ định của mệnh đề $P$, kí hiệu $\\overline{P}$, là mệnh đề "Không phải $P$". Mệnh đề $\\overline{P}$ đúng khi $P$ sai và $\\overline{P}$ sai khi $P$ đúng.',
        },
        {
          type: 'p',
          text: 'Thường ta chỉ cần thêm (hoặc bớt) chữ "không" hay "không phải" vào trước vị ngữ. Ví dụ $P$: "$\\pi$ là số hữu tỉ" có phủ định $\\overline{P}$: "$\\pi$ không phải là số hữu tỉ"; $Q$: "$5 > 3$" có phủ định $\\overline{Q}$: "$5 \\le 3$".',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phủ định của "$a > b$" là "$a \\le b$", không phải "$a < b$".',
        },
      ],
    },
    {
      heading: 'Mệnh đề kéo theo. Mệnh đề đảo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề kéo theo',
          text: 'Cho hai mệnh đề $P$ và $Q$. Mệnh đề "Nếu $P$ thì $Q$" gọi là mệnh đề kéo theo, kí hiệu $P \\Rightarrow Q$. Mệnh đề $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai; nó đúng trong mọi trường hợp còn lại.',
        },
        {
          type: 'table',
          caption: 'Tính đúng sai của $P \\Rightarrow Q$ (Đ: đúng, S: sai)',
          head: ['$P$', '$Q$', '$P \\Rightarrow Q$'],
          rows: [
            ['Đ', 'Đ', 'Đ'],
            ['Đ', 'S', 'S'],
            ['S', 'Đ', 'Đ'],
            ['S', 'S', 'Đ'],
          ],
        },
        {
          type: 'p',
          text: 'Các định lí toán học thường có dạng $P \\Rightarrow Q$ đúng. Khi đó $P$ là giả thiết, $Q$ là kết luận của định lí, và ta nói:',
        },
        {
          type: 'list',
          items: ['$P$ là điều kiện đủ để có $Q$;', '$Q$ là điều kiện cần để có $P$.'],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề đảo',
          text: 'Mệnh đề $Q \\Rightarrow P$ được gọi là mệnh đề đảo của mệnh đề $P \\Rightarrow Q$. Mệnh đề đảo của một mệnh đề đúng không nhất thiết là đúng.',
        },
        {
          type: 'p',
          text: 'Ví dụ: "Nếu tam giác $ABC$ đều thì tam giác $ABC$ cân" là mệnh đề đúng, nhưng mệnh đề đảo "Nếu tam giác $ABC$ cân thì tam giác $ABC$ đều" là mệnh đề sai.',
        },
      ],
    },
    {
      heading: 'Mệnh đề tương đương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mệnh đề tương đương',
          text: 'Nếu cả hai mệnh đề $P \\Rightarrow Q$ và $Q \\Rightarrow P$ đều đúng thì ta nói $P$ và $Q$ là hai mệnh đề tương đương, kí hiệu $P \\Leftrightarrow Q$.',
        },
        {
          type: 'p',
          text: 'Khi đó ta có thể đọc: "$P$ tương đương $Q$", hoặc "$P$ là điều kiện cần và đủ để có $Q$", hoặc "$P$ khi và chỉ khi $Q$". Mệnh đề $P \\Leftrightarrow Q$ đúng khi $P$ và $Q$ cùng đúng hoặc cùng sai.',
        },
        {
          type: 'p',
          text: 'Ví dụ: "Tam giác $ABC$ là tam giác vuông tại $A$ khi và chỉ khi $BC^2 = AB^2 + AC^2$" là một mệnh đề tương đương đúng (định lí Pythagore và định lí đảo).',
        },
      ],
    },
    {
      heading: 'Mệnh đề có chứa kí hiệu ∀, ∃',
      blocks: [
        {
          type: 'p',
          text: 'Cho mệnh đề chứa biến $P(x)$ với $x$ thuộc tập hợp $X$.',
        },
        {
          type: 'list',
          items: [
            'Mệnh đề "Với mọi $x$ thuộc $X$, $P(x)$ đúng" được kí hiệu là "$\\forall x \\in X, P(x)$" hoặc "$\\forall x \\in X: P(x)$".',
            'Mệnh đề "Tồn tại $x$ thuộc $X$ để $P(x)$ đúng" được kí hiệu là "$\\exists x \\in X, P(x)$" hoặc "$\\exists x \\in X: P(x)$".',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phủ định của mệnh đề chứa ∀, ∃',
          text: 'Mệnh đề phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$". Mệnh đề phủ định của "$\\exists x \\in X, P(x)$" là "$\\forall x \\in X, \\overline{P(x)}$".',
        },
        {
          type: 'p',
          text: 'Ví dụ: phủ định của "$\\forall x \\in \\mathbb{R}, x^2 \\ge 0$" là "$\\exists x \\in \\mathbb{R}, x^2 < 0$"; phủ định của "$\\exists n \\in \\mathbb{N}, n^2 = 2$" là "$\\forall n \\in \\mathbb{N}, n^2 \\ne 2$".',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép mệnh đề và bảng chân trị',
    instruction:
      'Chọn một cặp mệnh đề $P$, $Q$ và một cách ghép: phủ định, kéo theo, mệnh đề đảo hay tương đương. Đọc mệnh đề vừa lập, đoán nó đúng hay sai, rồi xem dòng tương ứng của bảng chân trị bật sáng.',
  },
  examples: [
    {
      problem:
        'Cho $P$: "$\\sqrt{2}$ là số hữu tỉ". Mệnh đề $P$ đúng hay sai? Lập mệnh đề phủ định của $P$ và xét tính đúng sai của nó.',
      steps: [
        '$\\sqrt{2}$ là số vô tỉ, nên $P$ là mệnh đề sai.',
        'Mệnh đề phủ định: $\\overline{P}$: "$\\sqrt{2}$ không phải là số hữu tỉ".',
        '$P$ sai nên $\\overline{P}$ đúng.',
      ],
      answer: '$P$ sai; $\\overline{P}$: "$\\sqrt{2}$ không phải là số hữu tỉ" là mệnh đề đúng.',
    },
    {
      problem:
        'Cho tứ giác $ABCD$ và hai mệnh đề $P$: "$ABCD$ là hình chữ nhật", $Q$: "$ABCD$ có hai đường chéo bằng nhau". Phát biểu mệnh đề $P \\Rightarrow Q$ và mệnh đề đảo của nó, xét tính đúng sai, rồi phát biểu bằng thuật ngữ điều kiện cần, điều kiện đủ.',
      steps: [
        '$P \\Rightarrow Q$: "Nếu $ABCD$ là hình chữ nhật thì $ABCD$ có hai đường chéo bằng nhau". Đây là tính chất của hình chữ nhật nên mệnh đề đúng.',
        'Mệnh đề đảo $Q \\Rightarrow P$: "Nếu $ABCD$ có hai đường chéo bằng nhau thì $ABCD$ là hình chữ nhật". Mệnh đề này sai: hình thang cân có hai đường chéo bằng nhau nhưng không phải là hình chữ nhật.',
        'Vì $P \\Rightarrow Q$ đúng: "$ABCD$ là hình chữ nhật" là điều kiện đủ để "$ABCD$ có hai đường chéo bằng nhau"; "$ABCD$ có hai đường chéo bằng nhau" là điều kiện cần để "$ABCD$ là hình chữ nhật".',
      ],
      answer:
        '$P \\Rightarrow Q$ đúng, mệnh đề đảo $Q \\Rightarrow P$ sai. Hai đường chéo bằng nhau là điều kiện cần (nhưng không đủ) để tứ giác là hình chữ nhật.',
    },
    {
      problem:
        'Xét tính đúng sai và lập mệnh đề phủ định của mệnh đề $P$: "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$".',
      steps: [
        'Với mọi số thực $x$ ta có $x^2 \\ge 0$, nên $x^2 + 1 \\ge 1 > 0$. Vậy $P$ đúng.',
        'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$", và phủ định của "$x^2 + 1 > 0$" là "$x^2 + 1 \\le 0$".',
        'Vậy $\\overline{P}$: "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$". Vì $P$ đúng nên $\\overline{P}$ sai.',
      ],
      answer:
        '$P$ đúng; $\\overline{P}$: "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\le 0$" là mệnh đề sai.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Câu nào sau đây là mệnh đề?',
      options: [
        '"$15$ là số nguyên tố."',
        '"Bạn có thích học Toán không?"',
        '"$x + 2 = 5$."',
        '"Hãy đóng cửa lại!"',
      ],
      answer: 0,
      hints: [
        'Mệnh đề phải là câu khẳng định và có thể nói ngay nó đúng hay sai.',
        'Câu chứa biến $x$ chưa xác định được đúng sai.',
      ],
      solution:
        '"$15$ là số nguyên tố" là câu khẳng định (sai vì $15 = 3 \\cdot 5$), nên là một mệnh đề. Câu hỏi và câu cầu khiến không phải mệnh đề; "$x + 2 = 5$" là mệnh đề chứa biến.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các mệnh đề đúng.',
      options: [
        '"$\\sqrt{9} = 3$."',
        '"$7$ là số chẵn."',
        '"$\\mathbb{N} \\subset \\mathbb{Z}$."',
        '"$-5 > -3$."',
        '"Tổng ba góc của một tam giác bằng $180^\\circ$."',
      ],
      answers: [0, 2, 4],
      hints: ['Xét từng câu một.', 'Trên trục số, $-5$ nằm bên trái $-3$.'],
      solution:
        '$\\sqrt{9} = 3$ đúng; $7$ là số lẻ nên "$7$ là số chẵn" sai; mọi số tự nhiên là số nguyên nên $\\mathbb{N} \\subset \\mathbb{Z}$ đúng; $-5 < -3$ nên "$-5 > -3$" sai; tổng ba góc của tam giác bằng $180^\\circ$ đúng.',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề phủ định của mệnh đề "$2023 > 2024$" là',
      options: ['"$2023 \\le 2024$"', '"$2023 < 2024$"', '"$2023 \\ge 2024$"', '"$2024 > 2023$"'],
      answer: 0,
      hints: ['Phủ định của "lớn hơn" bao gồm cả "nhỏ hơn" và "bằng".'],
      solution: 'Phủ định của "$a > b$" là "$a \\le b$", nên ta được "$2023 \\le 2024$".',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề $P \\Rightarrow Q$ sai khi nào?',
      options: [
        'Khi $P$ đúng và $Q$ sai.',
        'Khi $P$ sai và $Q$ đúng.',
        'Khi $P$ và $Q$ cùng sai.',
        'Khi $P$ và $Q$ cùng đúng.',
      ],
      answer: 0,
      hints: [
        'Một lời hứa "Nếu ... thì ..." chỉ bị vi phạm khi điều kiện xảy ra mà kết quả không xảy ra.',
      ],
      solution: 'Theo định nghĩa, $P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai.',
    },
    {
      type: 'choice',
      prompt:
        'Cho mệnh đề "Nếu một số tự nhiên chia hết cho $6$ thì nó chia hết cho $3$". Phát biểu nào sau đây đúng?',
      options: [
        'Chia hết cho $6$ là điều kiện đủ để một số tự nhiên chia hết cho $3$.',
        'Chia hết cho $6$ là điều kiện cần để một số tự nhiên chia hết cho $3$.',
        'Chia hết cho $3$ là điều kiện đủ để một số tự nhiên chia hết cho $6$.',
        'Chia hết cho $3$ là điều kiện cần và đủ để một số tự nhiên chia hết cho $6$.',
      ],
      answer: 0,
      hints: [
        'Trong định lí $P \\Rightarrow Q$: $P$ là điều kiện đủ để có $Q$, $Q$ là điều kiện cần để có $P$.',
        'Ở đây $P$: "chia hết cho $6$", $Q$: "chia hết cho $3$".',
      ],
      solution:
        'Mệnh đề có dạng $P \\Rightarrow Q$ đúng với $P$: "chia hết cho $6$", $Q$: "chia hết cho $3$". Vậy chia hết cho $6$ là điều kiện đủ để chia hết cho $3$ (và chia hết cho $3$ là điều kiện cần để chia hết cho $6$). Mệnh đề đảo sai, chẳng hạn $9$ chia hết cho $3$ mà không chia hết cho $6$.',
    },
    {
      type: 'choice',
      prompt:
        'Mệnh đề đảo của mệnh đề "Nếu tam giác $ABC$ đều thì tam giác $ABC$ có ba góc bằng nhau" là mệnh đề nào, và nó đúng hay sai?',
      options: [
        '"Nếu tam giác $ABC$ có ba góc bằng nhau thì tam giác $ABC$ đều", mệnh đề đúng.',
        '"Nếu tam giác $ABC$ có ba góc bằng nhau thì tam giác $ABC$ đều", mệnh đề sai.',
        '"Nếu tam giác $ABC$ không đều thì tam giác $ABC$ không có ba góc bằng nhau", mệnh đề đúng.',
        '"Tam giác $ABC$ đều và có ba góc bằng nhau", mệnh đề sai.',
      ],
      answer: 0,
      hints: [
        'Mệnh đề đảo của $P \\Rightarrow Q$ là $Q \\Rightarrow P$: đổi chỗ giả thiết và kết luận.',
      ],
      solution:
        'Mệnh đề đảo là "Nếu tam giác $ABC$ có ba góc bằng nhau thì tam giác $ABC$ đều". Tam giác có ba góc bằng nhau (mỗi góc $60^\\circ$) là tam giác đều, nên mệnh đề đảo đúng. Do đó hai mệnh đề tương đương.',
    },
    {
      type: 'choice',
      prompt: 'Mệnh đề phủ định của mệnh đề "$\\exists x \\in \\mathbb{R}, x^2 = -1$" là',
      options: [
        '"$\\forall x \\in \\mathbb{R}, x^2 \\ne -1$"',
        '"$\\exists x \\in \\mathbb{R}, x^2 \\ne -1$"',
        '"$\\forall x \\in \\mathbb{R}, x^2 = -1$"',
        '"$\\exists x \\in \\mathbb{R}, x^2 = 1$"',
      ],
      answer: 0,
      hints: ['Phủ định đổi "tồn tại" thành "với mọi" và phủ định tính chất phía sau.'],
      solution:
        'Phủ định của "$\\exists x \\in X, P(x)$" là "$\\forall x \\in X, \\overline{P(x)}$", nên ta được "$\\forall x \\in \\mathbb{R}, x^2 \\ne -1$" (mệnh đề này đúng).',
    },
    {
      type: 'number',
      prompt:
        'Cho mệnh đề chứa biến $P(n)$: "$n^2 < 20$" với $n \\in \\mathbb{N}$. Có bao nhiêu số tự nhiên $n$ để $P(n)$ là mệnh đề đúng?',
      answer: 5,
      hints: [
        'Nhớ rằng $0 \\in \\mathbb{N}$.',
        'Thử lần lượt $n = 0, 1, 2, \\ldots$ cho đến khi $n^2 \\ge 20$.',
      ],
      solution:
        '$0^2 = 0$, $1^2 = 1$, $2^2 = 4$, $3^2 = 9$, $4^2 = 16$ đều nhỏ hơn $20$, còn $5^2 = 25 \\ge 20$. Vậy có $5$ số: $n \\in \\{0; 1; 2; 3; 4\\}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kí hiệu với cách đọc của nó.',
      left: [
        '$P \\Rightarrow Q$',
        '$P \\Leftrightarrow Q$',
        '$\\overline{P}$',
        '$\\forall x \\in X$',
        '$\\exists x \\in X$',
      ],
      right: [
        'Nếu $P$ thì $Q$',
        '$P$ khi và chỉ khi $Q$',
        'Không phải $P$',
        'Với mọi $x$ thuộc $X$',
        'Tồn tại $x$ thuộc $X$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
      hints: ['$\\forall$ là chữ A lộn ngược (All), $\\exists$ là chữ E quay ngược (Exist).'],
      solution:
        '$P \\Rightarrow Q$: nếu $P$ thì $Q$; $P \\Leftrightarrow Q$: $P$ khi và chỉ khi $Q$; $\\overline{P}$: không phải $P$; $\\forall$: với mọi; $\\exists$: tồn tại.',
    },
  ],
  takeaways: [
    'Mệnh đề là câu khẳng định đúng hoặc sai, không thể vừa đúng vừa sai.',
    '$\\overline{P}$ đúng khi $P$ sai, và sai khi $P$ đúng.',
    '$P \\Rightarrow Q$ chỉ sai khi $P$ đúng và $Q$ sai; mệnh đề đảo của nó là $Q \\Rightarrow P$.',
    'Định lí $P \\Rightarrow Q$: $P$ là điều kiện đủ để có $Q$, $Q$ là điều kiện cần để có $P$.',
    '$P \\Leftrightarrow Q$ đúng khi cả $P \\Rightarrow Q$ và $Q \\Rightarrow P$ đều đúng.',
    'Phủ định của "$\\forall x \\in X, P(x)$" là "$\\exists x \\in X, \\overline{P(x)}$", và ngược lại.',
  ],
};
