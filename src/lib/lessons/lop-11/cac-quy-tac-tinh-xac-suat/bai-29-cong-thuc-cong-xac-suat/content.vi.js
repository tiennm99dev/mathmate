/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức cộng xác suất: P(A ∪ B) = P(A) + P(B) khi A, B xung khắc, và P(A ∪ B) = P(A) + P(B) − P(AB) với hai biến cố bất kì.',
  intro:
    'Lớp 11B có $40$ học sinh: $14$ bạn tham gia câu lạc bộ thể thao, $16$ bạn tham gia câu lạc bộ âm nhạc và $5$ bạn tham gia cả hai. Chọn ngẫu nhiên một bạn, xác suất bạn đó tham gia ít nhất một câu lạc bộ có phải là $\\dfrac{14}{40} + \\dfrac{16}{40}$ không? Bài này cho câu trả lời: công thức cộng xác suất.',
  objectives: [
    'Tính xác suất của biến cố hợp của hai biến cố xung khắc bằng công thức cộng.',
    'Dùng công thức cộng tổng quát $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
    'Dùng $P(\\overline{A}) = 1 - P(A)$ để tính xác suất qua biến cố đối.',
  ],
  sections: [
    {
      heading: 'Công thức cộng cho hai biến cố xung khắc',
      blocks: [
        {
          type: 'p',
          text: 'Khi các kết quả đồng khả năng, $P(A) = \\dfrac{n(A)}{n(\\Omega)}$. Nếu $A$ và $B$ xung khắc thì hai tập $A$, $B$ không có phần tử chung, nên $n(A \\cup B) = n(A) + n(B)$. Chia hai vế cho $n(\\Omega)$ ta được công thức cộng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức cộng xác suất cho hai biến cố xung khắc',
          text: 'Nếu $A$ và $B$ là hai biến cố xung khắc thì $P(A \\cup B) = P(A) + P(B)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Biến cố $A$ và biến cố đối $\\overline{A}$ xung khắc và $A \\cup \\overline{A} = \\Omega$. Do đó $P(A) + P(\\overline{A}) = P(\\Omega) = 1$, tức là $P(\\overline{A}) = 1 - P(A)$. Khi tính trực tiếp $P(A)$ khó, ta tính $P(\\overline{A})$ rồi lấy $1$ trừ đi.',
        },
      ],
    },
    {
      heading: 'Công thức cộng xác suất',
      blocks: [
        {
          type: 'p',
          text: 'Khi $A$ và $B$ không xung khắc, cộng $n(A) + n(B)$ thì mỗi kết quả thuộc $AB$ được đếm hai lần. Bớt đi một lần ta có $n(A \\cup B) = n(A) + n(B) - n(AB)$, chia cho $n(\\Omega)$ được công thức sau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức cộng xác suất',
          text: 'Cho hai biến cố $A$ và $B$. Khi đó $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
        },
        {
          type: 'p',
          text: 'Khi $A$ và $B$ xung khắc thì $AB = \\varnothing$, $P(AB) = 0$, và ta trở lại công thức ở mục trên. Từ công thức cộng còn suy ra $P(AB) = P(A) + P(B) - P(A \\cup B)$ và, vì $P(A \\cup B) \\le 1$, $P(AB) \\ge P(A) + P(B) - 1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Cộng $P(A) + P(B)$ khi $A$ và $B$ không xung khắc. Dấu hiệu dễ thấy: tổng có thể lớn hơn $1$, trong khi một xác suất không bao giờ vượt quá $1$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Diện tích tỉ lệ với xác suất',
    instruction:
      'Kéo các thanh trượt để chọn số gia đình có ti vi, có máy vi tính và có cả hai. Mỗi ô là một gia đình, nên diện tích mỗi vùng tỉ lệ với xác suất của nó. Bấm "Đếm P(A) + P(B)" để thấy phần chung bị đếm hai lần, tự tính $P(A \\cup B)$ rồi bấm "Kiểm tra". Thử cả trường hợp $A$, $B$ xung khắc.',
  },
  examples: [
    {
      problem:
        'Lớp 11B có $40$ học sinh, trong đó $14$ bạn tham gia câu lạc bộ thể thao, $16$ bạn tham gia câu lạc bộ âm nhạc và $5$ bạn tham gia cả hai câu lạc bộ. Chọn ngẫu nhiên một học sinh. Tính xác suất học sinh đó tham gia ít nhất một trong hai câu lạc bộ.',
      steps: [
        'Gọi $A$: "Học sinh tham gia câu lạc bộ thể thao", $B$: "Học sinh tham gia câu lạc bộ âm nhạc". Biến cố cần tính là $A \\cup B$.',
        '$P(A) = \\dfrac{14}{40}$, $P(B) = \\dfrac{16}{40}$, $P(AB) = \\dfrac{5}{40}$.',
        'Theo công thức cộng: $P(A \\cup B) = \\dfrac{14}{40} + \\dfrac{16}{40} - \\dfrac{5}{40} = \\dfrac{25}{40} = \\dfrac{5}{8}$.',
      ],
      answer: '$P(A \\cup B) = \\dfrac{5}{8}$.',
    },
    {
      problem:
        'Một hộp có $4$ viên bi đỏ và $5$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất để hai viên bi lấy được cùng màu.',
      steps: [
        'Số kết quả có thể: $n(\\Omega) = \\mathrm{C}_9^2 = 36$.',
        'Gọi $A$: "Hai bi đều màu đỏ", $B$: "Hai bi đều màu xanh". Ta có $n(A) = \\mathrm{C}_4^2 = 6$, $n(B) = \\mathrm{C}_5^2 = 10$.',
        '"Hai bi cùng màu" là $A \\cup B$, và $A$, $B$ xung khắc (hai bi không thể vừa cùng đỏ vừa cùng xanh).',
        '$P(A \\cup B) = P(A) + P(B) = \\dfrac{6}{36} + \\dfrac{10}{36} = \\dfrac{16}{36} = \\dfrac{4}{9}$.',
      ],
      answer: 'Xác suất hai bi cùng màu là $\\dfrac{4}{9}$.',
    },
    {
      problem:
        'Gieo một con xúc xắc cân đối hai lần. Tính xác suất để có ít nhất một lần xuất hiện mặt $6$ chấm.',
      steps: [
        'Gọi $A$: "Lần đầu ra mặt $6$ chấm", $B$: "Lần sau ra mặt $6$ chấm". Cần tính $P(A \\cup B)$.',
        '$n(\\Omega) = 36$; $n(A) = n(B) = 6$; $AB = \\{(6, 6)\\}$ nên $n(AB) = 1$.',
        '$P(A \\cup B) = \\dfrac{6}{36} + \\dfrac{6}{36} - \\dfrac{1}{36} = \\dfrac{11}{36}$.',
        'Kiểm tra bằng biến cố đối: "không lần nào ra mặt $6$" có $5 \\cdot 5 = 25$ kết quả, nên $P = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.',
      ],
      answer: '$\\dfrac{11}{36}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cho hai biến cố xung khắc $A$, $B$ với $P(A) = 0{,}4$ và $P(B) = 0{,}35$. Tính $P(A \\cup B)$.',
      answer: 0.75,
      tolerance: 0.0001,
      hints: ['$A$ và $B$ xung khắc nên $P(AB) = 0$.'],
      solution: '$P(A \\cup B) = P(A) + P(B) = 0{,}4 + 0{,}35 = 0{,}75$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai biến cố $A$, $B$ với $P(A) = 0{,}6$, $P(B) = 0{,}5$ và $P(A \\cup B) = 0{,}8$. Tính $P(AB)$.',
      answer: 0.3,
      tolerance: 0.0001,
      hints: ['Viết công thức cộng rồi giải ra $P(AB)$.'],
      solution: '$P(AB) = P(A) + P(B) - P(A \\cup B) = 0{,}6 + 0{,}5 - 0{,}8 = 0{,}3$.',
    },
    {
      type: 'fraction',
      prompt:
        'Lớp 11A có $40$ học sinh, $20$ bạn thích bóng đá, $15$ bạn thích cầu lông và $7$ bạn thích cả hai môn. Chọn ngẫu nhiên một bạn. Tính xác suất bạn đó thích ít nhất một trong hai môn (viết dạng phân số).',
      answer: [7, 10],
      hints: [
        'Gọi $A$: "thích bóng đá", $B$: "thích cầu lông". Cần $P(A \\cup B)$.',
        '$P(AB) = \\dfrac{7}{40}$; các bạn thích cả hai đã nằm trong cả $20$ lẫn $15$.',
      ],
      solution:
        '$P(A \\cup B) = \\dfrac{20}{40} + \\dfrac{15}{40} - \\dfrac{7}{40} = \\dfrac{28}{40} = \\dfrac{7}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với lớp 11A ở câu trên, tính xác suất bạn được chọn không thích môn nào trong hai môn (viết dạng phân số).',
      answer: [3, 10],
      hints: ['"Không thích môn nào" là biến cố đối của "thích ít nhất một môn".'],
      solution: '$P = 1 - P(A \\cup B) = 1 - \\dfrac{7}{10} = \\dfrac{3}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có $30$ tấm thẻ đánh số từ $1$ đến $30$. Tính xác suất số trên thẻ chia hết cho $2$ hoặc chia hết cho $3$ (viết dạng phân số).',
      answer: [2, 3],
      hints: [
        'Đếm số chia hết cho $2$, số chia hết cho $3$ và số chia hết cho cả $2$ và $3$ (tức chia hết cho $6$).',
        'Có $15$ số chẵn, $10$ số chia hết cho $3$, $5$ số chia hết cho $6$.',
      ],
      solution:
        '$P = \\dfrac{15}{30} + \\dfrac{10}{30} - \\dfrac{5}{30} = \\dfrac{20}{30} = \\dfrac{2}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $3$ viên bi đỏ, $4$ viên bi xanh và $5$ viên bi vàng. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất hai viên bi lấy được cùng màu (viết dạng phân số).',
      answer: [19, 66],
      hints: [
        '"Cùng màu" là hợp của ba biến cố đôi một xung khắc: cùng đỏ, cùng xanh, cùng vàng.',
        '$n(\\Omega) = \\mathrm{C}_{12}^2 = 66$; $\\mathrm{C}_3^2 = 3$, $\\mathrm{C}_4^2 = 6$, $\\mathrm{C}_5^2 = 10$.',
      ],
      solution:
        'Các biến cố "hai bi cùng đỏ", "cùng xanh", "cùng vàng" đôi một xung khắc, nên $P = \\dfrac{3}{66} + \\dfrac{6}{66} + \\dfrac{10}{66} = \\dfrac{19}{66}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $P(A) = 0{,}7$ và $P(B) = 0{,}6$. Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ không thể xung khắc, vì $P(AB) \\ge 0{,}3$',
        '$A$ và $B$ xung khắc và $P(A \\cup B) = 1{,}3$',
        '$P(A \\cup B) = 0{,}7 + 0{,}6 = 1{,}3$',
        '$P(AB) = 0$',
      ],
      answer: 0,
      hints: ['Một xác suất không vượt quá $1$. Dùng $P(AB) = P(A) + P(B) - P(A \\cup B)$.'],
      solution:
        'Vì $P(A \\cup B) \\le 1$ nên $P(AB) = 0{,}7 + 0{,}6 - P(A \\cup B) \\ge 0{,}3 > 0$. Vậy $A$ và $B$ không xung khắc, và không thể có $P(A \\cup B) = 1{,}3$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo hai con xúc xắc cân đối. Tính xác suất tổng số chấm bằng $7$ hoặc hai con ra cùng số chấm (viết dạng phân số).',
      answer: [1, 3],
      hints: [
        'Hai biến cố này có kết quả chung không?',
        'Cùng số chấm $a$ thì tổng là $2a$, một số chẵn.',
      ],
      solution:
        'Hai biến cố xung khắc, mỗi biến cố có $6$ kết quả trong $36$. $P = \\dfrac{6}{36} + \\dfrac{6}{36} = \\dfrac{12}{36} = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Với hai biến cố bất kì $A$, $B$, công thức nào luôn đúng?',
      options: [
        '$P(A \\cup B) = P(A) + P(B) - P(AB)$',
        '$P(A \\cup B) = P(A) + P(B)$',
        '$P(A \\cup B) = P(A) + P(B) + P(AB)$',
        '$P(A \\cup B) = P(A) \\cdot P(B)$',
      ],
      answer: 0,
      hints: ['Khi cộng $P(A)$ và $P(B)$, phần $AB$ được tính mấy lần?'],
      solution:
        'Phần $AB$ được tính hai lần trong $P(A) + P(B)$, nên phải trừ đi một lần: $P(A \\cup B) = P(A) + P(B) - P(AB)$. Công thức $P(A) + P(B)$ chỉ đúng khi $A$, $B$ xung khắc.',
    },
  ],
  takeaways: [
    '$A$, $B$ xung khắc: $P(A \\cup B) = P(A) + P(B)$.',
    'Hai biến cố bất kì: $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
    'Biến cố đối: $P(\\overline{A}) = 1 - P(A)$; hay dùng cho các câu hỏi "ít nhất một", "không có".',
  ],
};
