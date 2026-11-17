/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ trục toạ độ Oxyz, các vectơ đơn vị và mặt phẳng toạ độ; toạ độ của điểm, của vectơ, và toạ độ của vectơ khi biết toạ độ hai điểm mút.',
  intro:
    'Muốn chỉ vị trí một chiếc đèn trong phòng, ta có thể nói: cách bức tường bên trái 2 m, cách bức tường phía trước 3 m và cách sàn 2,5 m. Ba con số ấy xác định đúng một vị trí. Gắn vào không gian ba trục số đôi một vuông góc, mỗi điểm sẽ có một bộ ba số gọi là toạ độ, và các bài toán hình học không gian có thể giải bằng tính toán.',
  objectives: [
    'Nhận biết hệ trục toạ độ $Oxyz$, các vectơ đơn vị $\\vec{i}$, $\\vec{j}$, $\\vec{k}$ và các mặt phẳng toạ độ.',
    'Xác định toạ độ của một điểm, của một vectơ trong không gian $Oxyz$.',
    'Tính toạ độ của vectơ $\\overrightarrow{AB}$ khi biết toạ độ hai điểm $A$, $B$.',
  ],
  sections: [
    {
      heading: 'Hệ trục toạ độ trong không gian',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hệ gồm ba trục $Ox$, $Oy$, $Oz$ đôi một vuông góc với nhau tại $O$, với các vectơ đơn vị lần lượt là $\\vec{i}$, $\\vec{j}$, $\\vec{k}$, được gọi là hệ trục toạ độ vuông góc trong không gian, gọi tắt là hệ toạ độ $Oxyz$.',
        },
        {
          type: 'list',
          items: [
            'Điểm $O$ là gốc toạ độ; $Ox$ là trục hoành, $Oy$ là trục tung, $Oz$ là trục cao.',
            'Các mặt phẳng $(Oxy)$, $(Oyz)$, $(Ozx)$ đôi một vuông góc, gọi là các mặt phẳng toạ độ.',
            'Không gian với hệ toạ độ $Oxyz$ còn được gọi là không gian $Oxyz$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Ba vectơ đơn vị có độ dài bằng $1$ và đôi một vuông góc, nên $\\vec{i}^2 = \\vec{j}^2 = \\vec{k}^2 = 1$ và $\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$.',
        },
      ],
    },
    {
      heading: 'Toạ độ của điểm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Trong không gian $Oxyz$, cho điểm $M$. Bộ ba số $(x; y; z)$ duy nhất sao cho $\\overrightarrow{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$ được gọi là toạ độ của điểm $M$, kí hiệu $M(x; y; z)$ hoặc $M = (x; y; z)$. Số $x$ là hoành độ, $y$ là tung độ, $z$ là cao độ của điểm $M$.',
        },
        {
          type: 'p',
          text: 'Cách đọc toạ độ: gọi $M_1$, $M_2$, $M_3$ lần lượt là hình chiếu vuông góc của $M$ trên các trục $Ox$, $Oy$, $Oz$. Khi đó $M_1(x; 0; 0)$, $M_2(0; y; 0)$, $M_3(0; 0; z)$: hoành độ của $M$ đọc trên trục $Ox$ tại $M_1$, tung độ đọc tại $M_2$, cao độ đọc tại $M_3$.',
        },
        {
          type: 'table',
          caption: 'Hình chiếu vuông góc của điểm $M(x; y; z)$',
          head: ['Chiếu lên', 'Toạ độ hình chiếu'],
          rows: [
            ['Mặt phẳng $(Oxy)$', '$(x; y; 0)$'],
            ['Mặt phẳng $(Oyz)$', '$(0; y; z)$'],
            ['Mặt phẳng $(Ozx)$', '$(x; 0; z)$'],
            ['Trục $Ox$, $Oy$, $Oz$', '$(x; 0; 0)$, $(0; y; 0)$, $(0; 0; z)$'],
          ],
        },
        {
          type: 'p',
          text: 'Nói riêng, điểm thuộc mặt phẳng $(Oxy)$ có cao độ bằng $0$; điểm thuộc trục $Oy$ có hoành độ và cao độ bằng $0$; gốc toạ độ là $O(0; 0; 0)$.',
        },
      ],
    },
    {
      heading: 'Toạ độ của vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Trong không gian $Oxyz$, cho vectơ $\\vec{a}$. Bộ ba số $(a_1; a_2; a_3)$ duy nhất sao cho $\\vec{a} = a_1\\vec{i} + a_2\\vec{j} + a_3\\vec{k}$ được gọi là toạ độ của vectơ $\\vec{a}$, kí hiệu $\\vec{a} = (a_1; a_2; a_3)$ hoặc $\\vec{a}(a_1; a_2; a_3)$.',
        },
        {
          type: 'list',
          items: [
            'Toạ độ của điểm $M$ chính là toạ độ của vectơ $\\overrightarrow{OM}$.',
            '$\\vec{i} = (1; 0; 0)$, $\\vec{j} = (0; 1; 0)$, $\\vec{k} = (0; 0; 1)$, $\\vec{0} = (0; 0; 0)$.',
            'Hai vectơ bằng nhau khi và chỉ khi các toạ độ tương ứng của chúng bằng nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Toạ độ vectơ theo hai điểm mút',
          text: 'Nếu $A(x_A; y_A; z_A)$ và $B(x_B; y_B; z_B)$ thì $\\overrightarrow{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$.',
        },
        {
          type: 'p',
          text: 'Giải thích: $\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = (x_B\\vec{i} + y_B\\vec{j} + z_B\\vec{k}) - (x_A\\vec{i} + y_A\\vec{j} + z_A\\vec{k})$. Điểm cuối trừ điểm đầu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đọc toạ độ một điểm',
    instruction:
      "Đổi toạ độ $x$, $y$, $z$ của điểm $M$ và xoay hình để thấy các đường nét đứt dẫn tới ba trục. Chọn một mặt phẳng toạ độ để xem hình chiếu $M'$ của $M$. Bật thử thách để đặt $M$ trùng với điểm $N$ màu cam.",
  },
  examples: [
    {
      problem:
        "Trong không gian $Oxyz$, cho hình hộp chữ nhật $OABC.O'A'B'C'$ có $A$, $C$, $O'$ lần lượt thuộc các tia $Ox$, $Oy$, $Oz$ và $OA = 2$, $OC = 3$, $OO' = 4$. Tìm toạ độ các điểm $B$, $B'$ và biểu diễn $\\overrightarrow{OB'}$ theo $\\vec{i}$, $\\vec{j}$, $\\vec{k}$.",
      steps: [
        "$A$ thuộc tia $Ox$ và $OA = 2$ nên $\\overrightarrow{OA} = 2\\vec{i}$; tương tự $\\overrightarrow{OC} = 3\\vec{j}$, $\\overrightarrow{OO'} = 4\\vec{k}$.",
        '$OABC$ là hình chữ nhật nên $\\overrightarrow{OB} = \\overrightarrow{OA} + \\overrightarrow{OC} = 2\\vec{i} + 3\\vec{j}$, do đó $B(2; 3; 0)$.',
        "Theo quy tắc hình hộp: $\\overrightarrow{OB'} = \\overrightarrow{OA} + \\overrightarrow{OC} + \\overrightarrow{OO'} = 2\\vec{i} + 3\\vec{j} + 4\\vec{k}$, do đó $B'(2; 3; 4)$.",
      ],
      answer:
        "$B(2; 3; 0)$, $B'(2; 3; 4)$ và $\\overrightarrow{OB'} = 2\\vec{i} + 3\\vec{j} + 4\\vec{k}$.",
    },
    {
      problem:
        'Cho điểm $M(3; -1; 2)$. Tìm toạ độ hình chiếu vuông góc của $M$ trên mặt phẳng $(Oxy)$ và trên trục $Oz$. Tìm toạ độ của vectơ $\\vec{a} = 2\\vec{i} - 3\\vec{k}$.',
      steps: [
        'Chiếu trên mặt phẳng $(Oxy)$ giữ hoành độ và tung độ, cao độ thành $0$: được $(3; -1; 0)$.',
        'Chiếu trên trục $Oz$ chỉ giữ cao độ: được $(0; 0; 2)$.',
        '$\\vec{a} = 2\\vec{i} + 0\\vec{j} + (-3)\\vec{k}$ nên $\\vec{a} = (2; 0; -3)$.',
      ],
      answer: 'Hình chiếu là $(3; -1; 0)$ và $(0; 0; 2)$; $\\vec{a} = (2; 0; -3)$.',
    },
    {
      problem:
        'Cho $A(1; 2; -1)$, $B(3; -2; 4)$ và $C(0; 1; 1)$. Tìm toạ độ của $\\overrightarrow{AB}$ và toạ độ điểm $D$ sao cho $ABCD$ là hình bình hành.',
      steps: [
        '$\\overrightarrow{AB} = (3 - 1; -2 - 2; 4 - (-1)) = (2; -4; 5)$.',
        '$ABCD$ là hình bình hành khi và chỉ khi $\\overrightarrow{AB} = \\overrightarrow{DC}$. Gọi $D(x; y; z)$ thì $\\overrightarrow{DC} = (-x; 1 - y; 1 - z)$.',
        'Từ $-x = 2$, $1 - y = -4$, $1 - z = 5$ được $x = -2$, $y = 5$, $z = -4$. Ba điểm $A$, $B$, $C$ không thẳng hàng vì $\\overrightarrow{AC} = (-1; -1; 2)$ không cùng phương với $\\overrightarrow{AB}$.',
      ],
      answer: '$\\overrightarrow{AB} = (2; -4; 5)$ và $D(-2; 5; -4)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình chiếu vuông góc của điểm $M(2; -5; 4)$ trên mặt phẳng $(Ozx)$ có toạ độ là',
      options: ['$(2; 0; 4)$', '$(2; -5; 0)$', '$(0; -5; 4)$', '$(0; 0; 4)$'],
      answer: 0,
      hints: ['Mặt phẳng $(Ozx)$ chứa trục $Ox$ và trục $Oz$: toạ độ nào trở thành $0$?'],
      solution: 'Chiếu trên $(Ozx)$ giữ hoành độ và cao độ, tung độ thành $0$: được $(2; 0; 4)$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong không gian $Oxyz$, vectơ $\\vec{a} = 3\\vec{i} - 2\\vec{j} + \\vec{k}$ có toạ độ là',
      options: ['$(3; -2; 1)$', '$(3; 2; 1)$', '$(3; -2; 0)$', '$(-2; 3; 1)$'],
      answer: 0,
      hints: ['Hệ số của $\\vec{i}$, $\\vec{j}$, $\\vec{k}$ theo đúng thứ tự là ba toạ độ.'],
      solution: '$\\vec{a} = 3\\vec{i} + (-2)\\vec{j} + 1\\vec{k}$ nên $\\vec{a} = (3; -2; 1)$.',
    },
    {
      type: 'choice',
      prompt: 'Điểm nào sau đây thuộc trục $Oy$?',
      options: ['$(0; -3; 0)$', '$(-3; 0; 0)$', '$(0; 0; -3)$', '$(0; -3; 1)$'],
      answer: 0,
      hints: ['Điểm thuộc trục $Oy$ có hoành độ và cao độ bằng $0$.'],
      solution:
        'Điểm thuộc trục $Oy$ có dạng $(0; y; 0)$, chỉ có $(0; -3; 0)$. Điểm $(0; -3; 1)$ thuộc mặt phẳng $(Oyz)$ nhưng không thuộc trục $Oy$.',
    },
    {
      type: 'number',
      prompt: 'Cho $A(1; 0; -2)$ và $B(4; -1; 3)$. Tìm cao độ của vectơ $\\overrightarrow{AB}$.',
      answer: 5,
      hints: [
        '$\\overrightarrow{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$: điểm cuối trừ điểm đầu.',
      ],
      solution: '$\\overrightarrow{AB} = (4 - 1; -1 - 0; 3 - (-2)) = (3; -1; 5)$, cao độ bằng $5$.',
    },
    {
      type: 'number',
      prompt: 'Cho $A(2; -1; 3)$ và $\\overrightarrow{AB} = (1; 4; -2)$. Tìm tung độ của điểm $B$.',
      answer: 3,
      hints: [
        'Gọi $B(x; y; z)$, viết $\\overrightarrow{AB}$ theo toạ độ của $A$ và $B$ rồi so sánh từng toạ độ.',
      ],
      solution:
        '$\\overrightarrow{AB} = (x - 2; y + 1; z - 3) = (1; 4; -2)$, nên $y + 1 = 4$, tức $y = 3$. Vậy $B(3; 3; 1)$, tung độ bằng $3$.',
    },
    {
      type: 'number',
      prompt:
        "Cho điểm $M(1; 2; -3)$ và $M'$ là hình chiếu vuông góc của $M$ trên mặt phẳng $(Oxy)$. Tính độ dài đoạn $MM'$.",
      answer: 3,
      hints: [
        "Tìm toạ độ của $M'$ trước.",
        "$\\overrightarrow{M'M}$ cùng phương với $\\vec{k}$: độ dài của nó là bao nhiêu lần độ dài $\\vec{k}$?",
      ],
      solution:
        "$M'(1; 2; 0)$, nên $\\overrightarrow{M'M} = (0; 0; -3) = -3\\vec{k}$ và $MM' = |-3| \\cdot |\\vec{k}| = 3$.",
    },
    {
      type: 'choice',
      prompt:
        'Cho $A(1; 0; 1)$, $B(2; 1; 2)$, $C(0; 2; 3)$. Toạ độ điểm $D$ sao cho $ABCD$ là hình bình hành là',
      options: ['$(-1; 1; 2)$', '$(1; 3; 4)$', '$(3; -1; 0)$', '$(1; 1; 2)$'],
      answer: 0,
      hints: [
        '$ABCD$ là hình bình hành khi và chỉ khi $\\overrightarrow{AD} = \\overrightarrow{BC}$.',
      ],
      solution:
        '$\\overrightarrow{BC} = (-2; 1; 1)$. Gọi $D(x; y; z)$: $\\overrightarrow{AD} = (x - 1; y; z - 1) = (-2; 1; 1)$, nên $D(-1; 1; 2)$. ($A$, $B$, $C$ không thẳng hàng vì $\\overrightarrow{AB} = (1; 1; 1)$ không cùng phương với $\\overrightarrow{BC}$.) Lưu ý thứ tự đỉnh: điểm $(1; 3; 4)$ làm $ABDC$ thành hình bình hành, không phải $ABCD$.',
    },
    {
      type: 'multi',
      prompt: 'Trong không gian $Oxyz$, chọn tất cả các khẳng định đúng.',
      options: [
        '$\\vec{i} \\cdot \\vec{j} = 0$',
        '$|\\vec{k}| = 1$',
        '$\\vec{i} + \\vec{j} = \\vec{k}$',
        'Điểm thuộc mặt phẳng $(Oxy)$ có cao độ bằng $0$',
      ],
      answers: [0, 1, 3],
      hints: ['Ba vectơ đơn vị có độ dài $1$ và đôi một vuông góc.'],
      solution:
        '$\\vec{i} \\perp \\vec{j}$ nên $\\vec{i} \\cdot \\vec{j} = 0$; $\\vec{k}$ là vectơ đơn vị nên $|\\vec{k}| = 1$; điểm thuộc $(Oxy)$ có dạng $(x; y; 0)$. Còn $\\vec{i} + \\vec{j} = (1; 1; 0) \\ne (0; 0; 1) = \\vec{k}$.',
    },
  ],
  takeaways: [
    'Hệ toạ độ $Oxyz$ gồm ba trục đôi một vuông góc tại $O$ với các vectơ đơn vị $\\vec{i}$, $\\vec{j}$, $\\vec{k}$.',
    '$M(x; y; z) \\iff \\overrightarrow{OM} = x\\vec{i} + y\\vec{j} + z\\vec{k}$; $x$ là hoành độ, $y$ là tung độ, $z$ là cao độ.',
    'Hình chiếu của $M(x; y; z)$ trên $(Oxy)$, $(Oyz)$, $(Ozx)$ lần lượt là $(x; y; 0)$, $(0; y; z)$, $(x; 0; z)$.',
    '$\\vec{a} = (a_1; a_2; a_3) \\iff \\vec{a} = a_1\\vec{i} + a_2\\vec{j} + a_3\\vec{k}$; $\\overrightarrow{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$.',
  ],
};
