/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức nhân xác suất P(AB) = P(A)·P(B) cho hai biến cố độc lập, cách kiểm tra hai biến cố không độc lập, và sơ đồ cây để tính xác suất.',
  intro:
    'Hai xạ thủ cùng bắn vào một tấm bia, độc lập với nhau; xạ thủ thứ nhất bắn trúng với xác suất $0{,}8$, xạ thủ thứ hai với xác suất $0{,}7$. Xác suất cả hai cùng bắn trúng là bao nhiêu? Xác suất để bia trúng ít nhất một viên là bao nhiêu? Công thức nhân xác suất cùng sơ đồ cây giúp trả lời những câu hỏi như vậy.',
  objectives: [
    'Dùng công thức nhân $P(AB) = P(A) \\cdot P(B)$ cho hai biến cố độc lập.',
    'Nhận ra hai biến cố không độc lập khi $P(AB) \\ne P(A) \\cdot P(B)$.',
    'Dùng sơ đồ cây, phối hợp công thức nhân và công thức cộng, để tính xác suất trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Công thức nhân xác suất cho hai biến cố độc lập',
      blocks: [
        {
          type: 'p',
          text: 'Gieo một con xúc xắc hai lần. $A$: "Lần đầu ra mặt chẵn chấm", $B$: "Lần sau ra mặt có số chấm chia hết cho $3$". Hai lần gieo độc lập nên $A$ và $B$ độc lập. Ta có $n(\\Omega) = 36$, $n(A) = 18$, $n(B) = 12$ và $n(AB) = 3 \\cdot 2 = 6$, nên $P(AB) = \\dfrac{6}{36} = \\dfrac{1}{6} = \\dfrac{1}{2} \\cdot \\dfrac{1}{3} = P(A) \\cdot P(B)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nhân xác suất',
          text: 'Nếu hai biến cố $A$ và $B$ độc lập thì $P(AB) = P(A) \\cdot P(B)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Từ công thức nhân xác suất ta thấy: nếu $P(AB) \\ne P(A) \\cdot P(B)$ thì hai biến cố $A$ và $B$ không độc lập. Ngược lại, khi $P(AB) = P(A) \\cdot P(B)$ ta cũng nói $A$ và $B$ độc lập; đẳng thức này thường được dùng để kiểm tra tính độc lập.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn hai biến cố xung khắc $A$, $B$ với $P(A) > 0$, $P(B) > 0$ thì $P(AB) = 0 \\ne P(A) \\cdot P(B)$, nên chúng không độc lập. Nếu $A$, $B$ độc lập thì $\\overline{A}$ và $\\overline{B}$ cũng độc lập, nên $P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B})$.',
        },
      ],
    },
    {
      heading: 'Sơ đồ cây',
      blocks: [
        {
          type: 'p',
          text: 'Với hai biến cố độc lập $A$, $B$, ta vẽ sơ đồ cây: từ gốc tách hai nhánh $A$ và $\\overline{A}$, mỗi nhánh lại tách hai nhánh $B$ và $\\overline{B}$; ghi xác suất trên từng nhánh. Mỗi lá ứng với một trong bốn biến cố $AB$, $A\\overline{B}$, $\\overline{A}B$, $\\overline{A}\\,\\overline{B}$, đôi một xung khắc.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác suất của một lá bằng tích các xác suất trên đường đi từ gốc đến lá đó (công thức nhân).',
            'Một biến cố gồm nhiều lá có xác suất bằng tổng xác suất các lá đó (công thức cộng cho các biến cố xung khắc).',
            'Tổng xác suất của tất cả các lá bằng $1$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ít nhất một',
          text: 'Biến cố "ít nhất một trong hai biến cố xảy ra" là $A \\cup B$, có biến cố đối là $\\overline{A}\\,\\overline{B}$. Khi $A$, $B$ độc lập: $P(A \\cup B) = 1 - P(\\overline{A}) \\cdot P(\\overline{B})$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ cây và mô phỏng',
    instruction:
      'Chỉnh xác suất bắn trúng $P(A)$, $P(B)$ của hai xạ thủ và chọn biến cố cần tính: các lá thuộc biến cố đó được tô xanh, xác suất mỗi lá là tích dọc nhánh. Sau đó bấm "Bắn $1\\,000$ lượt" vài lần để mô phỏng và so tần số tương đối của từng lá với xác suất tính trên sơ đồ cây.',
  },
  examples: [
    {
      problem:
        'Hai xạ thủ bắn độc lập vào một tấm bia, mỗi người một viên. Xác suất bắn trúng của xạ thủ thứ nhất là $0{,}8$, của xạ thủ thứ hai là $0{,}7$. Tính xác suất: a) cả hai đều bắn trúng; b) có ít nhất một xạ thủ bắn trúng; c) có đúng một xạ thủ bắn trúng.',
      steps: [
        'Gọi $A$: "Xạ thủ thứ nhất bắn trúng", $B$: "Xạ thủ thứ hai bắn trúng"; $A$, $B$ độc lập, $P(\\overline{A}) = 0{,}2$, $P(\\overline{B}) = 0{,}3$.',
        'a) $P(AB) = P(A) \\cdot P(B) = 0{,}8 \\cdot 0{,}7 = 0{,}56$.',
        'b) $\\overline{A}$, $\\overline{B}$ độc lập nên $P(\\overline{A}\\,\\overline{B}) = 0{,}2 \\cdot 0{,}3 = 0{,}06$; do đó $P(A \\cup B) = 1 - 0{,}06 = 0{,}94$.',
        'c) "Đúng một người trúng" là $A\\overline{B} \\cup \\overline{A}B$, hai biến cố xung khắc: $P = 0{,}8 \\cdot 0{,}3 + 0{,}2 \\cdot 0{,}7 = 0{,}24 + 0{,}14 = 0{,}38$.',
      ],
      answer: 'a) $0{,}56$; b) $0{,}94$; c) $0{,}38$.',
    },
    {
      problem:
        'Gieo một con xúc xắc cân đối hai lần. $A$: "Tổng số chấm bằng $7$", $B$: "Lần đầu ra mặt $6$ chấm", $C$: "Tổng số chấm không nhỏ hơn $10$". Hỏi $A$ và $B$ có độc lập không? $B$ và $C$ có độc lập không?',
      steps: [
        '$P(A) = \\dfrac{6}{36} = \\dfrac{1}{6}$, $P(B) = \\dfrac{1}{6}$; $AB = \\{(6, 1)\\}$ nên $P(AB) = \\dfrac{1}{36} = P(A) \\cdot P(B)$. Vậy $A$ và $B$ độc lập.',
        '$C = \\{(4, 6); (5, 5); (6, 4); (5, 6); (6, 5); (6, 6)\\}$, $P(C) = \\dfrac{6}{36} = \\dfrac{1}{6}$.',
        '$BC = \\{(6, 4); (6, 5); (6, 6)\\}$, $P(BC) = \\dfrac{3}{36} = \\dfrac{1}{12} \\ne \\dfrac{1}{36} = P(B) \\cdot P(C)$. Vậy $B$ và $C$ không độc lập.',
      ],
      answer: '$A$ và $B$ độc lập; $B$ và $C$ không độc lập.',
    },
    {
      problem:
        'Hộp thứ nhất có $3$ viên bi đỏ và $2$ viên bi xanh; hộp thứ hai có $4$ viên bi đỏ và $6$ viên bi xanh. Lấy ngẫu nhiên từ mỗi hộp một viên bi. Dùng sơ đồ cây, tính xác suất hai viên bi lấy được cùng màu.',
      steps: [
        'Gọi $A$: "Bi lấy từ hộp thứ nhất màu đỏ", $B$: "Bi lấy từ hộp thứ hai màu đỏ". Hai lần lấy ở hai hộp khác nhau nên $A$, $B$ độc lập; $P(A) = \\dfrac{3}{5} = 0{,}6$, $P(B) = \\dfrac{4}{10} = 0{,}4$.',
        'Sơ đồ cây có bốn lá: $AB$: $0{,}6 \\cdot 0{,}4 = 0{,}24$; $A\\overline{B}$: $0{,}6 \\cdot 0{,}6 = 0{,}36$; $\\overline{A}B$: $0{,}4 \\cdot 0{,}4 = 0{,}16$; $\\overline{A}\\,\\overline{B}$: $0{,}4 \\cdot 0{,}6 = 0{,}24$.',
        '"Cùng màu" gồm hai lá $AB$ (cùng đỏ) và $\\overline{A}\\,\\overline{B}$ (cùng xanh): $P = 0{,}24 + 0{,}24 = 0{,}48$.',
      ],
      answer: 'Xác suất hai bi cùng màu là $0{,}48$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cho hai biến cố độc lập $A$, $B$ với $P(A) = 0{,}6$ và $P(B) = 0{,}5$. Tính $P(AB)$.',
      answer: 0.3,
      tolerance: 0.0001,
      hints: ['Dùng công thức nhân xác suất.'],
      solution: '$P(AB) = P(A) \\cdot P(B) = 0{,}6 \\cdot 0{,}5 = 0{,}3$.',
    },
    {
      type: 'number',
      prompt: 'Với $A$, $B$ ở câu trên, tính $P(A \\cup B)$.',
      answer: 0.8,
      tolerance: 0.0001,
      hints: ['Dùng công thức cộng với $P(AB)$ vừa tính.'],
      solution: '$P(A \\cup B) = 0{,}6 + 0{,}5 - 0{,}3 = 0{,}8$.',
    },
    {
      type: 'number',
      prompt:
        'Với $A$, $B$ ở câu trên, tính xác suất để cả $A$ và $B$ đều không xảy ra, $P(\\overline{A}\\,\\overline{B})$.',
      answer: 0.2,
      tolerance: 0.0001,
      hints: ['$\\overline{A}$ và $\\overline{B}$ cũng độc lập.'],
      solution:
        '$P(\\overline{A}\\,\\overline{B}) = P(\\overline{A}) \\cdot P(\\overline{B}) = 0{,}4 \\cdot 0{,}5 = 0{,}2$. Kiểm tra: $1 - P(A \\cup B) = 1 - 0{,}8 = 0{,}2$.',
    },
    {
      type: 'number',
      prompt:
        'Hai xạ thủ bắn độc lập, mỗi người một viên, với xác suất bắn trúng lần lượt là $0{,}9$ và $0{,}8$. Tính xác suất có đúng một xạ thủ bắn trúng.',
      answer: 0.26,
      tolerance: 0.0001,
      hints: [
        'Có hai khả năng xung khắc: người thứ nhất trúng và người thứ hai trượt, hoặc ngược lại.',
        'Tính $0{,}9 \\cdot 0{,}2$ và $0{,}1 \\cdot 0{,}8$ rồi cộng lại.',
      ],
      solution: '$P = 0{,}9 \\cdot 0{,}2 + 0{,}1 \\cdot 0{,}8 = 0{,}18 + 0{,}08 = 0{,}26$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một đồng xu cân đối và một con xúc xắc cân đối. Tính xác suất đồng xu xuất hiện mặt sấp và con xúc xắc xuất hiện mặt $6$ chấm (viết dạng phân số).',
      answer: [1, 12],
      hints: ['Kết quả của đồng xu và của xúc xắc không ảnh hưởng đến nhau.'],
      solution:
        'Hai biến cố độc lập nên $P = \\dfrac{1}{2} \\cdot \\dfrac{1}{6} = \\dfrac{1}{12}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $P(A) = 0{,}4$, $P(B) = 0{,}5$ và $P(AB) = 0{,}2$. Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ độc lập',
        '$A$ và $B$ không độc lập',
        '$A$ và $B$ xung khắc',
        '$P(A \\cup B) = 0{,}9$',
      ],
      answer: 0,
      hints: ['So sánh $P(AB)$ với $P(A) \\cdot P(B)$.'],
      solution:
        '$P(A) \\cdot P(B) = 0{,}4 \\cdot 0{,}5 = 0{,}2 = P(AB)$, nên $A$ và $B$ độc lập. Chúng không xung khắc vì $P(AB) \\ne 0$, và $P(A \\cup B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai biến cố $A$, $B$ xung khắc, $P(A) = 0{,}3$ và $P(B) = 0{,}4$. Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ không độc lập vì $P(AB) = 0 \\ne 0{,}12$',
        '$A$ và $B$ độc lập vì $P(AB) = 0{,}12$',
        '$A$ và $B$ độc lập vì chúng không cùng xảy ra',
        '$P(A \\cup B) = 0{,}58$',
      ],
      answer: 0,
      hints: ['Xung khắc nghĩa là $AB = \\varnothing$. Tính $P(A) \\cdot P(B)$.'],
      solution:
        'Xung khắc nên $P(AB) = 0$, còn $P(A) \\cdot P(B) = 0{,}12 \\ne 0$: $A$ và $B$ không độc lập. $P(A \\cup B) = 0{,}3 + 0{,}4 = 0{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Hộp thứ nhất có $3$ bi đỏ, $2$ bi xanh; hộp thứ hai có $4$ bi đỏ, $6$ bi xanh. Lấy ngẫu nhiên từ mỗi hộp một viên. Tính xác suất hai viên bi khác màu (viết dạng số thập phân).',
      answer: 0.52,
      tolerance: 0.0001,
      hints: [
        'Vẽ sơ đồ cây với $P(A) = 0{,}6$ (hộp thứ nhất ra đỏ) và $P(B) = 0{,}4$ (hộp thứ hai ra đỏ).',
        '"Khác màu" gồm hai lá $A\\overline{B}$ và $\\overline{A}B$.',
      ],
      solution:
        '$P = 0{,}6 \\cdot 0{,}6 + 0{,}4 \\cdot 0{,}4 = 0{,}36 + 0{,}16 = 0{,}52$; cũng bằng $1 - 0{,}48$, với $0{,}48$ là xác suất hai bi cùng màu.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối hai lần. Tính xác suất cả hai lần đều xuất hiện mặt có số chấm lớn hơn $4$ (viết dạng phân số).',
      answer: [1, 9],
      hints: [
        'Mỗi lần, xác suất ra mặt $5$ hoặc $6$ chấm là $\\dfrac{2}{6}$; hai lần gieo độc lập.',
      ],
      solution:
        '$P = \\dfrac{2}{6} \\cdot \\dfrac{2}{6} = \\dfrac{1}{3} \\cdot \\dfrac{1}{3} = \\dfrac{1}{9}$.',
    },
  ],
  takeaways: [
    '$A$, $B$ độc lập thì $P(AB) = P(A) \\cdot P(B)$; nếu $P(AB) \\ne P(A) \\cdot P(B)$ thì $A$, $B$ không độc lập.',
    'Sơ đồ cây: nhân xác suất dọc theo nhánh, cộng xác suất các lá thuộc biến cố cần tính.',
    '"Ít nhất một" thường tính qua biến cố đối: $P(A \\cup B) = 1 - P(\\overline{A}) \\cdot P(\\overline{B})$ khi $A$, $B$ độc lập.',
  ],
};
