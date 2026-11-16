/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tập hợp và phần tử, tập con và hai tập hợp bằng nhau, các tập con của tập số thực (khoảng, đoạn, nửa khoảng) và các phép toán giao, hợp, hiệu, phần bù.',
  intro:
    'Lớp 10A có $40$ học sinh, trong đó $25$ bạn thích Toán, $20$ bạn thích Văn và $10$ bạn thích cả hai môn. Có bao nhiêu bạn không thích môn nào? Để trả lời gọn gàng những câu hỏi như vậy, ta dùng ngôn ngữ tập hợp và các phép toán trên tập hợp.',
  objectives: [
    'Nhận biết tập con, hai tập hợp bằng nhau, tập rỗng; dùng biểu đồ Ven để minh hoạ.',
    'Viết các tập con thường dùng của $\\mathbb{R}$ dưới dạng khoảng, đoạn, nửa khoảng và biểu diễn chúng trên trục số.',
    'Thực hiện các phép toán giao, hợp, hiệu của hai tập hợp và phần bù của một tập con.',
    'Vận dụng các phép toán tập hợp để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Tập hợp và phần tử',
      blocks: [
        {
          type: 'p',
          text: 'Nếu $a$ là phần tử của tập hợp $S$ ta viết $a \\in S$; nếu $a$ không là phần tử của $S$ ta viết $a \\notin S$. Tập hợp không chứa phần tử nào gọi là tập rỗng, kí hiệu $\\varnothing$. Số phần tử của tập hợp hữu hạn $S$ được kí hiệu là $n(S)$.',
        },
        {
          type: 'p',
          text: 'Có hai cách cho một tập hợp:',
        },
        {
          type: 'list',
          items: [
            'Liệt kê các phần tử: $A = \\{1; 2; 3; 6\\}$.',
            'Chỉ ra tính chất đặc trưng của các phần tử: $A = \\{x \\in \\mathbb{N} \\mid x \\text{ là ước của } 6\\}$.',
          ],
        },
      ],
    },
    {
      heading: 'Tập con và hai tập hợp bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tập con',
          text: 'Nếu mọi phần tử của tập hợp $T$ đều là phần tử của tập hợp $S$ thì ta nói $T$ là một tập con (tập hợp con) của $S$, kí hiệu $T \\subset S$ (đọc là "$T$ chứa trong $S$"), hoặc $S \\supset T$ (đọc là "$S$ chứa $T$").',
        },
        {
          type: 'list',
          items: [
            '$A \\subset A$ với mọi tập hợp $A$.',
            'Tập rỗng là tập con của mọi tập hợp: $\\varnothing \\subset A$.',
            'Nếu $A \\subset B$ và $B \\subset C$ thì $A \\subset C$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai tập hợp bằng nhau',
          text: 'Hai tập hợp $S$ và $T$ được gọi là bằng nhau, kí hiệu $S = T$, nếu mỗi phần tử của $T$ cũng là phần tử của $S$ và ngược lại, tức là $S \\subset T$ và $T \\subset S$.',
        },
        {
          type: 'p',
          text: 'Ta thường minh hoạ tập hợp bằng một vòng kín gọi là biểu đồ Ven. Khi $T \\subset S$, vòng của $T$ nằm hẳn bên trong vòng của $S$.',
        },
      ],
    },
    {
      heading: 'Các tập con của tập số thực',
      blocks: [
        {
          type: 'tex',
          tex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
        },
        {
          type: 'p',
          text: 'Các tập con sau của $\\mathbb{R}$ thường dùng, với $a < b$. Trong sách, khi biểu diễn trên trục số, phần không thuộc tập hợp được gạch bỏ; dấu ngoặc vuông chỉ điểm mút thuộc tập hợp, dấu ngoặc tròn chỉ điểm mút không thuộc tập hợp.',
        },
        {
          type: 'table',
          caption: 'Khoảng, đoạn, nửa khoảng',
          head: ['Tên gọi', 'Kí hiệu', 'Tập hợp'],
          rows: [
            ['Tập số thực', '$(-\\infty; +\\infty)$', '$\\mathbb{R}$'],
            ['Đoạn', '$[a; b]$', '$\\{x \\in \\mathbb{R} \\mid a \\le x \\le b\\}$'],
            ['Khoảng', '$(a; b)$', '$\\{x \\in \\mathbb{R} \\mid a < x < b\\}$'],
            ['Nửa khoảng', '$[a; b)$', '$\\{x \\in \\mathbb{R} \\mid a \\le x < b\\}$'],
            ['Nửa khoảng', '$(a; b]$', '$\\{x \\in \\mathbb{R} \\mid a < x \\le b\\}$'],
            ['Nửa khoảng', '$[a; +\\infty)$', '$\\{x \\in \\mathbb{R} \\mid x \\ge a\\}$'],
            ['Nửa khoảng', '$(-\\infty; b]$', '$\\{x \\in \\mathbb{R} \\mid x \\le b\\}$'],
            ['Khoảng', '$(a; +\\infty)$', '$\\{x \\in \\mathbb{R} \\mid x > a\\}$'],
            ['Khoảng', '$(-\\infty; b)$', '$\\{x \\in \\mathbb{R} \\mid x < b\\}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Kí hiệu $-\\infty$ đọc là "âm vô cực", $+\\infty$ đọc là "dương vô cực". Phía có vô cực luôn dùng ngoặc tròn, vì $\\pm\\infty$ không phải là số thực.',
        },
      ],
    },
    {
      heading: 'Các phép toán trên tập hợp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giao, hợp, hiệu',
          text: 'Giao của hai tập hợp $A$ và $B$: $A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}$. Hợp của $A$ và $B$: $A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}$. Hiệu của $A$ và $B$: $A \\setminus B = \\{x \\mid x \\in A \\text{ và } x \\notin B\\}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phần bù',
          text: 'Nếu $A \\subset E$ thì hiệu $E \\setminus A$ được gọi là phần bù của $A$ trong $E$, kí hiệu $C_E A$. Chẳng hạn $C_{\\mathbb{R}} \\mathbb{Q} = \\mathbb{R} \\setminus \\mathbb{Q}$ là tập các số vô tỉ.',
        },
        {
          type: 'p',
          text: 'Để tìm giao, hợp, hiệu của các khoảng, đoạn, nửa khoảng, ta biểu diễn chúng trên cùng một trục số rồi đọc kết quả. Cần chú ý từng điểm mút: nó thuộc kết quả hay không tuỳ theo nó thuộc tập nào.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đếm số phần tử của hợp',
          text: 'Với hai tập hợp hữu hạn $A$, $B$: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ Ven và trục số',
    instruction:
      'Kéo các đầu mút của $A$ và $B$ dọc trục số (hoặc chọn đầu mút rồi dùng phím mũi tên), nhấn nút ngoặc để đổi giữa ngoặc vuông, ngoặc tròn và vô cực. Chọn một phép toán: biểu đồ Ven tô vùng tương ứng và hàng cuối hiện kết quả trên trục số.',
  },
  examples: [
    {
      problem:
        'Cho $A = \\{x \\in \\mathbb{N} \\mid x \\text{ là ước của } 6\\}$ và $B = \\{x \\in \\mathbb{N} \\mid x \\text{ là ước của } 12\\}$. Liệt kê các phần tử của $A$, $B$ và cho biết $A \\subset B$ hay không.',
      steps: [
        'Các ước tự nhiên của $6$ là $1, 2, 3, 6$, nên $A = \\{1; 2; 3; 6\\}$.',
        'Các ước tự nhiên của $12$ là $1, 2, 3, 4, 6, 12$, nên $B = \\{1; 2; 3; 4; 6; 12\\}$.',
        'Mọi phần tử của $A$ đều thuộc $B$ (mỗi ước của $6$ cũng là ước của $12$), nên $A \\subset B$. Ngược lại $4 \\in B$ nhưng $4 \\notin A$, nên $A \\ne B$.',
      ],
      answer: '$A = \\{1; 2; 3; 6\\} \\subset B = \\{1; 2; 3; 4; 6; 12\\}$ và $A \\ne B$.',
    },
    {
      problem:
        'Cho $A = [-1; 3)$ và $B = (1; 5]$. Tìm $A \\cap B$, $A \\cup B$, $A \\setminus B$, $B \\setminus A$ và $C_{\\mathbb{R}} A$.',
      steps: [
        'Biểu diễn hai tập trên cùng một trục số: $A$ gồm các số từ $-1$ (lấy) đến $3$ (không lấy); $B$ gồm các số từ $1$ (không lấy) đến $5$ (lấy).',
        'Phần chung: các số lớn hơn $1$ và nhỏ hơn $3$, nên $A \\cap B = (1; 3)$.',
        'Gộp lại: từ $-1$ (thuộc $A$) đến $5$ (thuộc $B$), nên $A \\cup B = [-1; 5]$.',
        'Bỏ khỏi $A$ phần thuộc $B$: còn từ $-1$ đến $1$; số $1 \\notin B$ nên $1$ vẫn thuộc hiệu. Vậy $A \\setminus B = [-1; 1]$.',
        'Bỏ khỏi $B$ phần thuộc $A$: số $3 \\notin A$ nên $3$ thuộc hiệu. Vậy $B \\setminus A = [3; 5]$.',
        '$C_{\\mathbb{R}} A = \\mathbb{R} \\setminus A = (-\\infty; -1) \\cup [3; +\\infty)$.',
      ],
      answer:
        '$A \\cap B = (1; 3)$, $A \\cup B = [-1; 5]$, $A \\setminus B = [-1; 1]$, $B \\setminus A = [3; 5]$, $C_{\\mathbb{R}} A = (-\\infty; -1) \\cup [3; +\\infty)$.',
    },
    {
      problem:
        'Trở lại lớp 10A ở đầu bài: $40$ học sinh, $25$ bạn thích Toán, $20$ bạn thích Văn, $10$ bạn thích cả hai. Có bao nhiêu bạn không thích môn nào trong hai môn đó?',
      steps: [
        'Gọi $T$, $V$ lần lượt là tập các bạn thích Toán, thích Văn. Ta có $n(T) = 25$, $n(V) = 20$, $n(T \\cap V) = 10$.',
        'Số bạn thích ít nhất một môn: $n(T \\cup V) = 25 + 20 - 10 = 35$.',
        'Số bạn không thích môn nào: $40 - 35 = 5$.',
      ],
      answer: 'Có $5$ học sinh không thích môn nào.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tập hợp $\\{a; b; c\\}$ có tất cả bao nhiêu tập con?',
      answer: 8,
      hints: [
        'Đừng quên tập rỗng và chính tập hợp đó.',
        'Đếm lần lượt các tập con có $0$, $1$, $2$, $3$ phần tử.',
      ],
      solution:
        'Các tập con là $\\varnothing$; $\\{a\\}$, $\\{b\\}$, $\\{c\\}$; $\\{a; b\\}$, $\\{a; c\\}$, $\\{b; c\\}$; $\\{a; b; c\\}$. Có $1 + 3 + 3 + 1 = 8$ tập con.',
    },
    {
      type: 'choice',
      prompt: 'Tập hợp $\\{x \\in \\mathbb{R} \\mid -2 \\le x < 3\\}$ được viết là',
      options: ['$[-2; 3)$', '$(-2; 3]$', '$[-2; 3]$', '$(-2; 3)$'],
      answer: 0,
      hints: ['Dấu "$\\le$" ứng với ngoặc vuông, dấu "$<$" ứng với ngoặc tròn.'],
      solution: '$-2$ thuộc tập hợp (ngoặc vuông), $3$ không thuộc (ngoặc tròn): $[-2; 3)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A = [-1; 3)$ và $B = (2; 5]$. Tập $A \\cap B$ là',
      options: ['$(2; 3)$', '$[2; 3]$', '$[-1; 5]$', '$(2; 3]$'],
      answer: 0,
      hints: [
        'Vẽ hai tập trên cùng một trục số và tìm phần chung.',
        'Xét riêng hai điểm $2$ và $3$.',
      ],
      solution:
        'Phần chung gồm các số lớn hơn $2$ và nhỏ hơn $3$. Số $2 \\notin B$, số $3 \\notin A$, nên $A \\cap B = (2; 3)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A = (-\\infty; 2]$ và $B = (0; 4)$. Tập $A \\cup B$ là',
      options: ['$(-\\infty; 4)$', '$(-\\infty; 4]$', '$(0; 2]$', '$(-\\infty; 2]$'],
      answer: 0,
      hints: ['Hợp gồm các số thuộc ít nhất một trong hai tập.'],
      solution:
        'Mọi số $\\le 2$ thuộc $A$, các số từ $2$ đến dưới $4$ thuộc $B$; $4$ không thuộc tập nào. Vậy $A \\cup B = (-\\infty; 4)$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $A = [-3; 4]$ và $B = (1; +\\infty)$. Tập $A \\setminus B$ là',
      options: ['$[-3; 1]$', '$[-3; 1)$', '$(1; 4]$', '$(4; +\\infty)$'],
      answer: 0,
      hints: ['Bỏ khỏi $A$ những số lớn hơn $1$.', 'Số $1$ có thuộc $B$ không?'],
      solution:
        'Bỏ khỏi $A$ các số $x > 1$, còn lại $-3 \\le x \\le 1$. Vì $1 \\notin B$ nên $1$ vẫn ở lại: $A \\setminus B = [-3; 1]$.',
    },
    {
      type: 'choice',
      prompt: 'Phần bù của $[0; +\\infty)$ trong $\\mathbb{R}$ là',
      options: ['$(-\\infty; 0)$', '$(-\\infty; 0]$', '$(0; +\\infty)$', '$\\varnothing$'],
      answer: 0,
      hints: ['$C_{\\mathbb{R}} A = \\mathbb{R} \\setminus A$: các số thực không thuộc $A$.'],
      solution:
        'Các số thực không thuộc $[0; +\\infty)$ là các số âm: $C_{\\mathbb{R}} [0; +\\infty) = (-\\infty; 0)$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $A = \\{x \\in \\mathbb{N} \\mid x < 6\\}$ và $B = \\{x \\in \\mathbb{Z} \\mid -2 \\le x \\le 3\\}$. Tập $A \\setminus B$ có bao nhiêu phần tử?',
      answer: 2,
      hints: ['Liệt kê phần tử của $A$ và của $B$ trước.', 'Nhớ $0 \\in \\mathbb{N}$.'],
      solution:
        '$A = \\{0; 1; 2; 3; 4; 5\\}$, $B = \\{-2; -1; 0; 1; 2; 3\\}$. Bỏ khỏi $A$ các phần tử thuộc $B$, còn $A \\setminus B = \\{4; 5\\}$: $2$ phần tử.',
    },
    {
      type: 'multi',
      prompt: 'Cho $A = \\{1; 2; 3; 4\\}$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$\\varnothing \\subset A$',
        '$\\{2; 4\\} \\subset A$',
        '$3 \\in A$',
        '$\\{3\\} \\in A$',
        '$\\{1; 5\\} \\subset A$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Kí hiệu $\\in$ dùng giữa một phần tử và một tập hợp; $\\subset$ dùng giữa hai tập hợp.',
      ],
      solution:
        'Tập rỗng là tập con của mọi tập; $\\{2; 4\\} \\subset A$ vì $2, 4 \\in A$; $3 \\in A$ đúng. Viết $\\{3\\} \\in A$ là sai (phải viết $\\{3\\} \\subset A$), và $\\{1; 5\\} \\not\\subset A$ vì $5 \\notin A$.',
    },
    {
      type: 'number',
      prompt:
        'Một nhóm có $30$ học sinh, mỗi bạn chơi ít nhất một trong hai môn bóng đá và cầu lông. Có $18$ bạn chơi bóng đá, $17$ bạn chơi cầu lông. Có bao nhiêu bạn chơi cả hai môn?',
      answer: 5,
      hints: ['Dùng $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$, với $n(A \\cup B) = 30$.'],
      solution:
        'Gọi $A$, $B$ là tập các bạn chơi bóng đá, cầu lông. $n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = 18 + 17 - 30 = 5$.',
    },
  ],
  takeaways: [
    '$T \\subset S$ khi mọi phần tử của $T$ đều thuộc $S$; $S = T$ khi $S \\subset T$ và $T \\subset S$.',
    'Ngoặc vuông: lấy điểm mút; ngoặc tròn: không lấy điểm mút; phía vô cực luôn là ngoặc tròn.',
    '$A \\cap B$: thuộc cả hai; $A \\cup B$: thuộc ít nhất một; $A \\setminus B$: thuộc $A$ mà không thuộc $B$.',
    'Nếu $A \\subset E$ thì $C_E A = E \\setminus A$.',
    '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.',
  ],
};
