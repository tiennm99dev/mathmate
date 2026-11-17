/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đồ thị gồm các đỉnh và các cạnh nối chúng; bậc của một đỉnh là số cạnh có đầu mút tại đỉnh đó; tổng các bậc bằng hai lần số cạnh (định lí bắt tay); đường đi, chu trình và đồ thị liên thông.',
  intro:
    'Trong một bữa tiệc, mỗi người bắt tay một số người khác. Có thể xảy ra chuyện đúng một người bắt tay một số lẻ lần không? Vẽ mỗi người là một điểm, mỗi cái bắt tay là một đoạn nối hai điểm, ta được một đồ thị, và câu hỏi được trả lời ngay bằng một định lí rất đơn giản.',
  objectives: [
    'Nhận biết đỉnh, cạnh, khuyên, cạnh bội, đơn đồ thị và đồ thị đầy đủ.',
    'Tính bậc của đỉnh và dùng định lí bắt tay: tổng các bậc bằng hai lần số cạnh.',
    'Nhận biết đường đi, chu trình, chu trình sơ cấp và đồ thị liên thông.',
  ],
  sections: [
    {
      heading: 'Đồ thị',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Một đồ thị $G$ gồm một tập hữu hạn các điểm, gọi là các đỉnh, và một tập các đường (đoạn thẳng hoặc đường cong) nối một số cặp đỉnh, gọi là các cạnh. Kí hiệu $G = (V, E)$, trong đó $V$ là tập các đỉnh và $E$ là tập các cạnh.',
        },
        {
          type: 'list',
          items: [
            'Cạnh nối hai đỉnh $u$ và $v$ được kí hiệu là $uv$; $u$ và $v$ là hai đầu mút của cạnh, và ta nói $u$, $v$ là hai đỉnh kề nhau.',
            'Cạnh có hai đầu mút trùng nhau gọi là một khuyên.',
            'Hai hay nhiều cạnh cùng nối một cặp đỉnh gọi là các cạnh bội.',
            'Đồ thị không có khuyên và không có cạnh bội gọi là đơn đồ thị. Trong đơn đồ thị, mỗi cạnh được xác định bởi cặp đỉnh của nó.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồ thị đầy đủ',
          text: 'Đơn đồ thị mà hai đỉnh bất kì đều kề nhau gọi là đồ thị đầy đủ. Đồ thị đầy đủ có $n$ đỉnh kí hiệu là $K_n$; nó có $\\dfrac{n(n - 1)}{2}$ cạnh, vì mỗi cặp trong $n$ đỉnh cho đúng một cạnh.',
        },
        {
          type: 'p',
          text: 'Ví dụ: bảng đấu có $4$ đội thi đấu vòng tròn một lượt được mô tả bằng $K_4$: mỗi đội là một đỉnh, mỗi trận là một cạnh, nên có $\\dfrac{4 \\cdot 3}{2} = 6$ trận.',
        },
      ],
    },
    {
      heading: 'Bậc của đỉnh',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bậc của đỉnh',
          text: 'Bậc của đỉnh $v$, kí hiệu $\\deg(v)$, là số cạnh có đầu mút tại $v$; mỗi khuyên tại $v$ được tính hai lần. Đỉnh có bậc $0$ gọi là đỉnh cô lập.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí bắt tay',
          text: 'Trong mọi đồ thị $G = (V, E)$, tổng bậc của tất cả các đỉnh bằng hai lần số cạnh: $$\\sum_{v \\in V} \\deg(v) = 2|E|.$$',
        },
        {
          type: 'p',
          text: 'Lí do: mỗi cạnh có hai đầu mút, nên khi cộng bậc của mọi đỉnh, mỗi cạnh được đếm đúng hai lần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Trong mọi đồ thị, số đỉnh có bậc lẻ là một số chẵn.',
        },
        {
          type: 'p',
          text: 'Thật vậy, tổng các bậc là số chẵn; tổng các bậc chẵn cũng là số chẵn, nên tổng các bậc lẻ là số chẵn, mà tổng của các số lẻ chỉ chẵn khi số số hạng là chẵn.',
        },
      ],
    },
    {
      heading: 'Đường đi, chu trình và đồ thị liên thông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường đi và chu trình',
          text: 'Một đường đi từ đỉnh $u$ đến đỉnh $v$ là một dãy các đỉnh bắt đầu bằng $u$, kết thúc bằng $v$, trong đó hai đỉnh liên tiếp được nối bởi một cạnh và không cạnh nào được đi qua quá một lần. Số cạnh của đường đi là độ dài của nó. Đường đi có đỉnh đầu trùng với đỉnh cuối gọi là một chu trình.',
        },
        {
          type: 'list',
          items: [
            'Ta viết đường đi bằng dãy tên các đỉnh, chẳng hạn $ABDE$ là đường đi $A \\to B \\to D \\to E$, có độ dài $3$.',
            'Đường đi không đi qua đỉnh nào quá một lần gọi là đường đi sơ cấp.',
            'Chu trình không đi qua đỉnh nào quá một lần, trừ đỉnh đầu trùng với đỉnh cuối, gọi là chu trình sơ cấp; ví dụ $ABCA$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồ thị liên thông',
          text: 'Đồ thị $G$ gọi là liên thông nếu với hai đỉnh phân biệt bất kì $u$, $v$ luôn có một đường đi từ $u$ đến $v$. Một đồ thị không liên thông được chia thành các phần liên thông rời nhau, gọi là các thành phần liên thông.',
        },
      ],
    },
    {
      heading: 'Dự án: Mạng lưới bạn bè trong lớp',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mô tả quan hệ "đã từng làm bài nhóm cùng nhau" trong một tổ bằng một đồ thị, rồi dùng bậc, định lí bắt tay và tính liên thông để đọc thông tin từ đồ thị.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: danh sách thành viên tổ (khoảng $8$ đến $10$ bạn), giấy, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mỗi bạn ghi tên những bạn trong tổ đã từng làm bài nhóm cùng mình. Đối chiếu để quan hệ là hai chiều.',
            'Vẽ đồ thị: mỗi bạn là một đỉnh, hai bạn đã làm nhóm cùng nhau được nối bởi một cạnh. Đồ thị này có phải đơn đồ thị không? Vì sao?',
            'Lập bảng bậc của các đỉnh. Kiểm tra định lí bắt tay: tổng các bậc có bằng hai lần số cạnh đã vẽ không? Có bao nhiêu đỉnh bậc lẻ?',
            'Đồ thị có liên thông không? Nếu không, có bao nhiêu thành phần liên thông? Tìm một chu trình sơ cấp dài nhất mà em tìm được.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: hình vẽ đồ thị, bảng bậc, phép kiểm tra định lí bắt tay, các thành phần liên thông và một đề xuất ghép nhóm để đồ thị trở nên liên thông với ít cạnh thêm nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ đồ thị',
    instruction:
      'Chạm một đỉnh rồi chạm một đỉnh khác để nối chúng (làm lại để bỏ cạnh). Theo dõi bậc của từng đỉnh, đẳng thức của định lí bắt tay, các thành phần liên thông (cùng màu nền) và một chu trình sơ cấp nếu có. Thử nối thêm cạnh để đồ thị trở nên liên thông.',
  },
  examples: [
    {
      problem:
        'Trong một buổi gặp mặt có $6$ người, mỗi người bắt tay mỗi người khác đúng một lần. Có tất cả bao nhiêu cái bắt tay? Giải thích bằng đồ thị.',
      steps: [
        'Mỗi người là một đỉnh, mỗi cái bắt tay là một cạnh. Hai người bất kì bắt tay nhau đúng một lần nên đồ thị là $K_6$.',
        'Mỗi đỉnh có bậc $5$, nên tổng các bậc là $6 \\cdot 5 = 30$.',
        'Theo định lí bắt tay, số cạnh là $30 : 2 = 15$ (cũng chính là $\\dfrac{6 \\cdot 5}{2}$).',
      ],
      answer: 'Có $15$ cái bắt tay.',
    },
    {
      problem:
        'Chứng minh rằng không có đồ thị nào có $6$ đỉnh với bậc lần lượt là $2, 3, 3, 4, 4, 5$.',
      steps: [
        'Tổng các bậc: $2 + 3 + 3 + 4 + 4 + 5 = 21$.',
        'Theo định lí bắt tay, tổng các bậc phải bằng hai lần số cạnh, tức là một số chẵn.',
        '$21$ là số lẻ (cũng có thể thấy: có $3$ đỉnh bậc lẻ, là số lẻ), mâu thuẫn.',
      ],
      answer: 'Không tồn tại đồ thị như vậy.',
    },
    {
      problem:
        'Cho đồ thị $G$ có các đỉnh $A, B, C, D, E, F$ và các cạnh $AB, AC, BC, BD, DE$. Tìm bậc của các đỉnh, một đường đi từ $A$ đến $E$, một chu trình sơ cấp, và cho biết $G$ có liên thông không.',
      steps: [
        '$\\deg(A) = 2$, $\\deg(B) = 3$, $\\deg(C) = 2$, $\\deg(D) = 2$, $\\deg(E) = 1$, $\\deg(F) = 0$. Kiểm tra: tổng $10 = 2 \\cdot 5$.',
        'Đường đi $ABDE$ từ $A$ đến $E$ có độ dài $3$.',
        '$ABCA$ là một chu trình sơ cấp độ dài $3$.',
        '$F$ là đỉnh cô lập: không có đường đi nào từ $F$ đến $A$, nên $G$ không liên thông; $G$ có hai thành phần liên thông $\\{A, B, C, D, E\\}$ và $\\{F\\}$.',
      ],
      answer:
        '$G$ không liên thông; $ABDE$ là một đường đi từ $A$ đến $E$, $ABCA$ là một chu trình sơ cấp.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một giải bóng đá có $8$ đội thi đấu vòng tròn một lượt (hai đội bất kì gặp nhau đúng một lần). Có tất cả bao nhiêu trận đấu?',
      answer: 28,
      unit: 'trận',
      hints: [
        'Đồ thị mô tả giải đấu là đồ thị đầy đủ $K_8$.',
        '$K_n$ có $\\dfrac{n(n - 1)}{2}$ cạnh.',
      ],
      solution: 'Số trận bằng số cạnh của $K_8$: $\\dfrac{8 \\cdot 7}{2} = 28$ trận.',
    },
    {
      type: 'number',
      prompt:
        'Một đồ thị có $5$ đỉnh với bậc lần lượt là $1, 2, 2, 3, 4$. Đồ thị đó có bao nhiêu cạnh?',
      answer: 6,
      unit: 'cạnh',
      hints: ['Dùng định lí bắt tay: tổng các bậc bằng hai lần số cạnh.'],
      solution: 'Tổng các bậc là $1 + 2 + 2 + 3 + 4 = 12 = 2|E|$, nên $|E| = 6$.',
    },
    {
      type: 'choice',
      prompt: 'Dãy nào dưới đây có thể là dãy bậc các đỉnh của một đồ thị có $5$ đỉnh?',
      options: ['$2, 2, 3, 3, 4$', '$1, 2, 2, 3, 3$', '$1, 1, 1, 2, 2$', '$3, 3, 3, 3, 3$'],
      answer: 0,
      hints: ['Tính tổng mỗi dãy: tổng các bậc phải là số chẵn.'],
      solution:
        'Các dãy $1, 2, 2, 3, 3$ (tổng $11$), $1, 1, 1, 2, 2$ (tổng $7$) và $3, 3, 3, 3, 3$ (tổng $15$) có tổng lẻ nên bị loại. Dãy $2, 2, 3, 3, 4$ có tổng $14$; một đồ thị như vậy: đỉnh $E$ bậc $4$ nối với $A, B, C, D$, thêm các cạnh $CD$, $CA$, $DB$, khi đó $\\deg(A) = \\deg(B) = 2$, $\\deg(C) = \\deg(D) = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Một đơn đồ thị có $10$ cạnh và mọi đỉnh đều có bậc $4$. Đồ thị đó có bao nhiêu đỉnh?',
      answer: 5,
      unit: 'đỉnh',
      hints: ['Gọi số đỉnh là $n$; tổng các bậc là $4n$.'],
      solution: 'Theo định lí bắt tay, $4n = 2 \\cdot 10 = 20$, nên $n = 5$ (đó chính là $K_5$).',
    },
    {
      type: 'number',
      prompt:
        'Một đơn đồ thị có $9$ đỉnh và $16$ cạnh, mỗi đỉnh có bậc $3$ hoặc $4$. Đồ thị có bao nhiêu đỉnh bậc $3$?',
      answer: 4,
      unit: 'đỉnh',
      hints: [
        'Gọi $x$ là số đỉnh bậc $3$; khi đó có $9 - x$ đỉnh bậc $4$.',
        'Lập phương trình theo định lí bắt tay.',
      ],
      solution: '$3x + 4(9 - x) = 2 \\cdot 16 = 32$, tức là $36 - x = 32$, nên $x = 4$.',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị $G$ có các đỉnh $A, B, C, D, E, F$ và các cạnh $AB, BC, CA, DE, EF, FD$. Khẳng định nào đúng?',
      options: [
        '$G$ không liên thông và có $2$ thành phần liên thông.',
        '$G$ liên thông.',
        '$G$ không liên thông và có $3$ thành phần liên thông.',
        '$G$ không có chu trình nào.',
      ],
      answer: 0,
      hints: ['Từ $A$ có thể đi tới những đỉnh nào?'],
      solution:
        'Từ $A$ chỉ đi được tới $B$ và $C$; từ $D$ chỉ đi được tới $E$ và $F$. Vậy $G$ gồm hai thành phần liên thông $\\{A, B, C\\}$ và $\\{D, E, F\\}$; mỗi phần là một chu trình ($ABCA$ và $DEFD$).',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, BC, CD, DA, AC, DE$. Dãy nào là một chu trình sơ cấp có độ dài $4$?',
      options: ['$ABCDA$', '$ABCA$', '$ACDEA$', '$ABDCA$'],
      answer: 0,
      hints: [
        'Kiểm tra từng cặp đỉnh liên tiếp có phải là một cạnh không.',
        'Độ dài là số cạnh của chu trình.',
      ],
      solution:
        '$ABCDA$ đi qua các cạnh $AB, BC, CD, DA$, không lặp đỉnh, độ dài $4$. $ABCA$ chỉ có độ dài $3$; $ACDEA$ cần cạnh $EA$ và $ABDCA$ cần cạnh $BD$, đều không có.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, BC, CD, DA, AC, DE$. Đường đi từ $B$ đến $E$ có độ dài nhỏ nhất là bao nhiêu?',
      answer: 3,
      hints: ['$E$ chỉ kề với $D$; $B$ không kề với $D$.'],
      solution:
        '$E$ chỉ kề với $D$, mà $B$ không kề với $D$, nên mọi đường đi từ $B$ đến $E$ có độ dài ít nhất $3$. Đường đi $BADE$ (hoặc $BCDE$) có độ dài $3$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Tổng bậc các đỉnh của một đồ thị bất kì là số chẵn.',
        'Số đỉnh bậc lẻ của một đồ thị bất kì là số chẵn.',
        'Trong đơn đồ thị có $n$ đỉnh, mỗi đỉnh có bậc không vượt quá $n - 1$.',
        'Một khuyên tại $v$ làm bậc của $v$ tăng thêm $1$.',
        'Đồ thị có số cạnh nhiều hơn số đỉnh thì luôn liên thông.',
      ],
      answers: [0, 1, 2],
      hints: ['Khuyên được tính hai lần vào bậc.', 'Thử ghép $K_5$ với một đỉnh cô lập.'],
      solution:
        'Ba khẳng định đầu đúng: hai khẳng định đầu là định lí bắt tay và hệ quả của nó; trong đơn đồ thị mỗi đỉnh kề với nhiều nhất $n - 1$ đỉnh còn lại. Khuyên làm bậc tăng $2$. Đồ thị gồm $K_5$ và một đỉnh cô lập có $6$ đỉnh, $10$ cạnh nhưng không liên thông.',
    },
    {
      type: 'text',
      prompt: 'Đơn đồ thị mà hai đỉnh bất kì đều kề nhau được gọi là đồ thị gì?',
      accept: ['đồ thị đầy đủ', 'đầy đủ', 'đồ thị đầy đủ Kn'],
      hints: ['Đồ thị này có kí hiệu $K_n$.'],
      solution: 'Đó là đồ thị đầy đủ, kí hiệu $K_n$ khi có $n$ đỉnh.',
    },
  ],
  takeaways: [
    'Đồ thị $G = (V, E)$: các đỉnh và các cạnh; đơn đồ thị không có khuyên và cạnh bội.',
    '$K_n$ có $\\dfrac{n(n - 1)}{2}$ cạnh.',
    'Định lí bắt tay: $\\sum \\deg(v) = 2|E|$; số đỉnh bậc lẻ luôn là số chẵn.',
    'Đường đi không lặp cạnh; độ dài là số cạnh; chu trình có đỉnh đầu trùng đỉnh cuối.',
    'Đồ thị liên thông khi hai đỉnh bất kì đều có đường đi nối chúng.',
  ],
};
