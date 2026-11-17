/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề lí thuyết đồ thị: bậc của đỉnh và định lí bắt tay, đồ thị liên thông, đường đi và chu trình Euler, Hamilton, thuật toán gắn nhãn tìm đường đi ngắn nhất và bài toán người đưa thư.',
  intro:
    'Chuyên đề đã đưa ta từ câu đố bảy cây cầu đến thuật toán chỉ đường của bản đồ số. Bài này ôn lại các khái niệm và công cụ chính, rồi luyện tập trên những đồ thị mới, kể cả những đồ thị được tạo ngẫu nhiên.',
  objectives: [
    'Hệ thống hoá các khái niệm đồ thị, bậc, đường đi, chu trình và tính liên thông.',
    'Vận dụng định lí Euler, định lí Dirac và định lí Ore.',
    'Vận dụng thuật toán gắn nhãn và giải bài toán người đưa thư.',
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
              'Đồ thị $G = (V, E)$',
              'Đơn đồ thị: không khuyên, không cạnh bội; $K_n$ có $\\dfrac{n(n - 1)}{2}$ cạnh.',
            ],
            ['Định lí bắt tay', '$\\sum \\deg(v) = 2|E|$; số đỉnh bậc lẻ luôn chẵn.'],
            ['Liên thông', 'Hai đỉnh bất kì đều có đường đi nối chúng.'],
            [
              'Euler',
              'Đồ thị liên thông: chu trình Euler khi mọi bậc chẵn; đường đi Euler (không là chu trình) khi có đúng hai đỉnh bậc lẻ.',
            ],
            [
              'Hamilton',
              'Dirac: mọi bậc $\\ge \\dfrac{n}{2}$; Ore: $\\deg(u) + \\deg(v) \\ge n$ với mọi cặp không kề nhau ($n \\ge 3$, đơn đồ thị).',
            ],
            [
              'Đường đi ngắn nhất',
              'Thuật toán gắn nhãn: chốt nhãn tạm thời nhỏ nhất, cập nhật $l(v) + w(vu)$.',
            ],
            [
              'Người đưa thư',
              'Tổng trọng số các cạnh, cộng đường ngắn nhất giữa hai đỉnh bậc lẻ (nếu có).',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Quên kiểm tra đồ thị liên thông trước khi dùng định lí Euler; coi định lí Dirac, Ore là điều kiện cần; chốt nhãn cho đỉnh kề có cạnh ngắn nhất thay vì đỉnh có nhãn tạm thời nhỏ nhất.',
        },
      ],
    },
    {
      heading: 'Dự án: Bản đồ du lịch thu nhỏ',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chọn $6$ đến $8$ điểm tham quan ở địa phương (hoặc một thành phố em thích), dựng đồ thị có trọng số các tuyến đường giữa chúng và trả lời các câu hỏi của cả chuyên đề trên cùng một đồ thị.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bản đồ (giấy hoặc trực tuyến) để đọc khoảng cách, giấy khổ lớn, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đồ thị: mỗi điểm tham quan là một đỉnh, mỗi tuyến đường trực tiếp là một cạnh ghi độ dài (km). Lập bảng bậc, kiểm tra định lí bắt tay và tính liên thông.',
            'Dùng định lí Euler: một xe buýt có thể chạy qua mỗi tuyến đúng một lần không? Nếu không, cần đi lặp lại những tuyến nào ít tốn quãng đường nhất?',
            'Tìm một chu trình Hamilton để ghé mỗi điểm đúng một lần rồi về điểm xuất phát; kiểm tra định lí Dirac và Ore.',
            'Dùng thuật toán gắn nhãn tìm đường ngắn nhất từ điểm xuất phát tới điểm xa nhất, kèm bảng nhãn.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tấm bản đồ đồ thị, các bảng tính, câu trả lời có giải thích bằng định lí cho từng câu hỏi và một lịch trình tham quan đề xuất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập trên đồ thị ngẫu nhiên',
    instruction:
      'Mỗi đồ thị mới có hai câu hỏi: xét đường đi Euler (dựa vào bậc các đỉnh và tính liên thông) và tính độ dài đường đi ngắn nhất từ $A$ đến đỉnh cuối bằng thuật toán gắn nhãn. Trả lời xong, đọc lời giải rồi nhấn "Đồ thị mới".',
  },
  examples: [
    {
      problem:
        'Đồ thị $G$ có các đỉnh $A, B, C, D, E, F$ và các cạnh $AB, AC, BC, BD, CE, DE, DF, EF$. a) $G$ có đường đi Euler không? b) Cần thêm ít nhất bao nhiêu cạnh (vẫn là đơn đồ thị) để $G$ có chu trình Euler? c) Tìm một chu trình Hamilton của $G$.',
      steps: [
        'Bậc: $\\deg(A) = 2$, $\\deg(B) = 3$, $\\deg(C) = 3$, $\\deg(D) = 3$, $\\deg(E) = 3$, $\\deg(F) = 2$; tổng $16 = 2 \\cdot 8$. $G$ liên thông.',
        'a) Có $4$ đỉnh bậc lẻ $B, C, D, E$, nên $G$ không có đường đi Euler.',
        'b) Mỗi cạnh mới chỉ đổi tính chẵn lẻ của hai đỉnh, nên cần ít nhất $2$ cạnh. Thêm $BE$ và $CD$ (chưa có trong $G$): mọi đỉnh có bậc chẵn, $G$ có chu trình Euler.',
        'c) $ABDFECA$ đi qua các cạnh $AB, BD, DF, FE, EC, CA$ và qua mỗi đỉnh đúng một lần.',
      ],
      answer: 'a) Không. b) Ít nhất $2$ cạnh, chẳng hạn $BE$ và $CD$. c) Chẳng hạn $ABDFECA$.',
    },
    {
      problem:
        'Đồ thị có trọng số gồm các đỉnh $A, B, C, D, E$ và các cạnh $AB = 2$, $AC = 5$, $BC = 2$, $BD = 6$, $CD = 3$, $CE = 7$, $DE = 2$. a) Tìm đường đi ngắn nhất từ $A$ đến $E$. b) Giải bài toán người đưa thư với bưu điện ở $B$.',
      steps: [
        'a) $l(A) = 0$; nhãn tạm thời $B: 2$, $C: 5$. Chốt $l(B) = 2$; cập nhật $C: 2 + 2 = 4$, $D: 2 + 6 = 8$.',
        'Chốt $l(C) = 4$; cập nhật $D: 4 + 3 = 7$, $E: 4 + 7 = 11$. Chốt $l(D) = 7$; cập nhật $E: 7 + 2 = 9$. Chốt $l(E) = 9$.',
        'Đi ngược: $E \\leftarrow D \\leftarrow C \\leftarrow B \\leftarrow A$. Đường đi ngắn nhất $ABCDE$ dài $2 + 2 + 3 + 2 = 9$.',
        'b) Bậc: $A: 2$, $B: 3$, $C: 4$, $D: 3$, $E: 2$; hai đỉnh bậc lẻ là $B$ và $D$. Tổng trọng số $2 + 5 + 2 + 6 + 3 + 7 + 2 = 27$.',
        'Đường ngắn nhất giữa $B$ và $D$ là $BCD$, dài $5 < 6$. Lộ trình: đường đi Euler $BACBDCED$ rồi về $DCB$, tức là $BACBDCEDCB$, dài $27 + 5 = 32$.',
      ],
      answer: 'a) $ABCDE$, dài $9$. b) Lộ trình $BACBDCEDCB$, dài $32$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đồ thị đầy đủ $K_9$ có bao nhiêu cạnh?',
      answer: 36,
      unit: 'cạnh',
      hints: ['$K_n$ có $\\dfrac{n(n - 1)}{2}$ cạnh.'],
      solution: '$\\dfrac{9 \\cdot 8}{2} = 36$ cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Có tồn tại đồ thị có $7$ đỉnh mà mỗi đỉnh đều có bậc $3$ không?',
      options: [
        'Không, vì tổng các bậc là số lẻ.',
        'Có, chẳng hạn $K_7$.',
        'Có, vì $3 < 7$.',
        'Không, vì một đồ thị có $7$ đỉnh phải có đúng $7$ cạnh.',
      ],
      answer: 0,
      hints: ['Áp dụng định lí bắt tay.'],
      solution:
        'Tổng các bậc là $7 \\cdot 3 = 21$, là số lẻ, trong khi nó phải bằng hai lần số cạnh. Vậy không tồn tại đồ thị như vậy ($K_7$ có mọi đỉnh bậc $6$).',
    },
    {
      type: 'number',
      prompt:
        'Một đồ thị có $15$ cạnh; ba đỉnh có bậc $4$, các đỉnh còn lại đều có bậc $3$. Đồ thị có bao nhiêu đỉnh?',
      answer: 9,
      unit: 'đỉnh',
      hints: ['Gọi $k$ là số đỉnh bậc $3$ và dùng định lí bắt tay.'],
      solution: '$3 \\cdot 4 + 3k = 2 \\cdot 15 = 30$, nên $k = 6$. Số đỉnh là $3 + 6 = 9$.',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, CD, DE, CE$. Khẳng định nào đúng?',
      options: [
        'Đồ thị không liên thông, có $2$ thành phần liên thông.',
        'Đồ thị liên thông.',
        'Đồ thị không liên thông, có $3$ thành phần liên thông.',
        'Đồ thị không có chu trình nào.',
      ],
      answer: 0,
      hints: ['Từ $A$ đi được tới những đỉnh nào?'],
      solution:
        'Các thành phần liên thông là $\\{A, B\\}$ và $\\{C, D, E\\}$; phần thứ hai chứa chu trình $CDEC$.',
    },
    {
      type: 'choice',
      prompt:
        'Một đồ thị liên thông có $5$ đỉnh với bậc lần lượt là $3, 3, 4, 4, 2$. Khẳng định nào đúng?',
      options: [
        'Có đường đi Euler nhưng không có chu trình Euler.',
        'Có chu trình Euler.',
        'Không có đường đi Euler.',
        'Có chu trình Euler và đường đi Euler bắt đầu ở đỉnh bậc $2$.',
      ],
      answer: 0,
      hints: ['Đếm số đỉnh bậc lẻ.'],
      solution:
        'Có đúng hai đỉnh bậc lẻ (hai đỉnh bậc $3$), nên đồ thị có đường đi Euler nối hai đỉnh đó nhưng không có chu trình Euler.',
    },
    {
      type: 'multi',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, BC, CA, CD, DE$. Một đường đi Euler có thể bắt đầu ở những đỉnh nào?',
      options: ['$A$', '$B$', '$C$', '$D$', '$E$'],
      answers: [2, 4],
      hints: ['Tìm hai đỉnh bậc lẻ.'],
      solution:
        'Bậc: $A: 2$, $B: 2$, $C: 3$, $D: 2$, $E: 1$. Hai đỉnh bậc lẻ là $C$ và $E$, nên đường đi Euler bắt đầu ở $C$ hoặc $E$, chẳng hạn $CABCDE$ hoặc $EDCBAC$.',
    },
    {
      type: 'number',
      prompt:
        'Một đồ thị liên thông có đúng $6$ đỉnh bậc lẻ. Cần thêm ít nhất bao nhiêu cạnh (được phép thêm cạnh bội) để đồ thị có đường đi Euler?',
      answer: 2,
      unit: 'cạnh',
      hints: [
        'Mỗi cạnh mới làm số đỉnh bậc lẻ giảm nhiều nhất $2$.',
        'Đường đi Euler cho phép tối đa hai đỉnh bậc lẻ.',
      ],
      solution:
        'Cần giảm từ $6$ xuống còn không quá $2$ đỉnh bậc lẻ, mỗi cạnh giảm nhiều nhất $2$, nên cần ít nhất $2$ cạnh. Nối hai cặp đỉnh bậc lẻ bằng $2$ cạnh mới là đủ: còn đúng $2$ đỉnh bậc lẻ và đồ thị vẫn liên thông.',
    },
    {
      type: 'choice',
      prompt:
        'Một đơn đồ thị có $8$ đỉnh, mỗi đỉnh có bậc ít nhất $4$. Khẳng định nào chắc chắn đúng?',
      options: [
        'Đồ thị có chu trình Hamilton.',
        'Đồ thị có chu trình Euler.',
        'Đồ thị không có chu trình Hamilton.',
        'Đồ thị là đồ thị đầy đủ.',
      ],
      answer: 0,
      hints: ['So sánh bậc nhỏ nhất với $\\dfrac{n}{2}$.'],
      solution:
        'Mỗi bậc $\\ge 4 = \\dfrac{8}{2}$, nên theo định lí Dirac đồ thị có chu trình Hamilton. Bậc có thể lẻ (chẳng hạn $5$), nên chưa chắc có chu trình Euler.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị đầy đủ $K_4$ có các đỉnh $A, B, C, D$. Có bao nhiêu chu trình Hamilton khác nhau, nếu coi hai chu trình là một khi chúng đi qua cùng một tập cạnh (ví dụ $ABCDA$, $BCDAB$ và $ADCBA$ là một)?',
      answer: 3,
      hints: [
        'Cố định điểm xuất phát $A$ và liệt kê thứ tự của $B, C, D$.',
        'Mỗi chu trình được đếm hai lần, theo hai chiều.',
      ],
      solution:
        'Từ $A$ có $3! = 6$ thứ tự cho $B, C, D$; mỗi chu trình được đếm hai lần (hai chiều), nên có $6 : 2 = 3$ chu trình: $ABCDA$, $ABDCA$, $ACBDA$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị có trọng số gồm các cạnh $AB = 4$, $AD = 1$, $BC = 1$, $BD = 2$, $CE = 3$, $DE = 7$. Tìm độ dài đường đi ngắn nhất từ $A$ đến $E$.',
      answer: 7,
      hints: [
        'Chốt lần lượt $A$, $D$, rồi đỉnh có nhãn tạm thời nhỏ nhất tiếp theo.',
        'Nhãn của $B$ giảm từ $4$ xuống $1 + 2$.',
      ],
      solution:
        '$l(A) = 0$, $l(D) = 1$; $B$: $\\min(4,\\ 1 + 2) = 3$, $E$: $1 + 7 = 8$. $l(B) = 3$, $C$: $3 + 1 = 4$. $l(C) = 4$, $E$: $\\min(8,\\ 4 + 3) = 7$. Đường đi ngắn nhất $ADBCE$ dài $1 + 2 + 1 + 3 = 7$.',
    },
    {
      type: 'number',
      prompt:
        'Các con phố $AB = 3$, $BC = 4$, $CA = 5$ và $CD = 2$ (đơn vị: trăm mét). Người đưa thư xuất phát ở $A$, đi qua mọi con phố rồi về $A$. Lộ trình ngắn nhất dài bao nhiêu trăm mét?',
      answer: 16,
      hints: ['Tìm hai đỉnh bậc lẻ.', 'Cộng tổng các cạnh với đường ngắn nhất giữa hai đỉnh đó.'],
      solution:
        'Bậc: $A: 2$, $B: 2$, $C: 3$, $D: 1$; đỉnh bậc lẻ là $C$ và $D$. Tổng các cạnh $3 + 4 + 5 + 2 = 14$; đường ngắn nhất giữa $C$ và $D$ là cạnh $CD = 2$. Lộ trình $ABCDCA$ dài $14 + 2 = 16$ trăm mét.',
    },
  ],
  takeaways: [
    'Bắt đầu mọi bài bằng bảng bậc và kiểm tra tính liên thông.',
    'Euler: đếm số đỉnh bậc lẻ ($0$: chu trình, $2$: đường đi, nhiều hơn: không có).',
    'Hamilton: thử tìm trực tiếp; Dirac và Ore chỉ là điều kiện đủ.',
    'Đường đi ngắn nhất: thuật toán gắn nhãn, đọc ngược đường đi từ đỉnh đích.',
    'Người đưa thư: tổng các cạnh, cộng đường ngắn nhất giữa hai đỉnh bậc lẻ.',
  ],
};
