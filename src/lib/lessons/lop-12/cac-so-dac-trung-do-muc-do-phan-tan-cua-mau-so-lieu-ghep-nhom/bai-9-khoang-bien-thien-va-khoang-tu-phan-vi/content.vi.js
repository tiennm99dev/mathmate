/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khoảng biến thiên và khoảng tứ phân vị của mẫu số liệu ghép nhóm: cách tính, ý nghĩa đo độ phân tán và độ nhạy với giá trị bất thường.',
  intro:
    'Hai lớp có chiều cao trung bình gần như nhau, nhưng ở lớp này các bạn cao thấp khá đều, còn ở lớp kia chênh lệch nhiều. Số trung bình hay trung vị không cho thấy điều đó. Bài này giới thiệu hai số đo mức độ phân tán của mẫu số liệu ghép nhóm: khoảng biến thiên và khoảng tứ phân vị.',
  objectives: [
    'Tính khoảng biến thiên của mẫu số liệu ghép nhóm.',
    'Tính tứ phân vị $Q_1$, $Q_3$ và khoảng tứ phân vị của mẫu số liệu ghép nhóm.',
    'Giải thích ý nghĩa của khoảng biến thiên, khoảng tứ phân vị và dùng chúng để so sánh độ phân tán của hai mẫu.',
    'Biết khoảng biến thiên nhạy với giá trị bất thường còn khoảng tứ phân vị thì ít bị ảnh hưởng.',
  ],
  sections: [
    {
      heading: 'Khoảng biến thiên',
      blocks: [
        {
          type: 'p',
          text: 'Xét mẫu số liệu ghép nhóm gồm $k$ nhóm $[a_1; a_2), [a_2; a_3), \\ldots, [a_k; a_{k+1})$ với tần số tương ứng $m_1, m_2, \\ldots, m_k$. Ta không còn biết từng giá trị, nhưng biết mọi giá trị đều nằm trong đoạn từ $a_1$ đến $a_{k+1}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khoảng biến thiên',
          text: 'Khoảng biến thiên của mẫu số liệu ghép nhóm là hiệu giữa đầu mút phải của nhóm cuối cùng và đầu mút trái của nhóm đầu tiên: $R = a_{k+1} - a_1$.',
        },
        {
          type: 'p',
          text: 'Khoảng biến thiên của mẫu số liệu gốc (hiệu giữa giá trị lớn nhất và nhỏ nhất) không vượt quá $R$; vì vậy khoảng biến thiên của mẫu ghép nhóm là một giá trị xấp xỉ của khoảng biến thiên của mẫu gốc.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Khoảng biến thiên được dùng để đo độ phân tán của mẫu số liệu: khoảng biến thiên càng lớn thì mẫu số liệu càng phân tán. Nó dễ tính nhưng chỉ dùng hai đầu mút của mẫu, nên rất dễ bị ảnh hưởng bởi các giá trị bất thường.',
        },
      ],
    },
    {
      heading: 'Khoảng tứ phân vị',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại cách tính tứ phân vị của mẫu ghép nhóm (đã học ở lớp 11). Gọi $n$ là cỡ mẫu. Nhóm chứa $Q_1$ là nhóm đầu tiên có tần số tích luỹ lớn hơn hoặc bằng $\\dfrac{n}{4}$; nhóm chứa $Q_3$ là nhóm đầu tiên có tần số tích luỹ lớn hơn hoặc bằng $\\dfrac{3n}{4}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tứ phân vị của mẫu ghép nhóm',
          text: 'Nếu nhóm $[a_p; a_{p+1})$ chứa $Q_1$ thì $Q_1 = a_p + \\dfrac{\\frac{n}{4} - (m_1 + \\cdots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$. Nếu nhóm $[a_q; a_{q+1})$ chứa $Q_3$ thì $Q_3 = a_q + \\dfrac{\\frac{3n}{4} - (m_1 + \\cdots + m_{q-1})}{m_q} \\cdot (a_{q+1} - a_q)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khoảng tứ phân vị',
          text: 'Khoảng tứ phân vị của mẫu số liệu ghép nhóm là hiệu giữa tứ phân vị thứ ba và tứ phân vị thứ nhất: $\\Delta_Q = Q_3 - Q_1$.',
        },
        {
          type: 'p',
          text: 'Khoảng tứ phân vị của mẫu ghép nhóm là giá trị xấp xỉ của khoảng tứ phân vị của mẫu số liệu gốc. Giữa $Q_1$ và $Q_3$ có khoảng $50\\%$ số liệu của mẫu, nên $\\Delta_Q$ cho biết nửa số liệu ở giữa trải rộng đến đâu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Khoảng tứ phân vị cũng dùng để đo độ phân tán: $\\Delta_Q$ càng lớn thì mẫu số liệu càng phân tán. Vì chỉ phụ thuộc vào nửa giữa của mẫu, $\\Delta_Q$ ít bị ảnh hưởng bởi các giá trị bất thường; khi mẫu có giá trị bất thường, nên dùng $\\Delta_Q$ thay cho $R$ để so sánh độ phân tán.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Giá trị bất thường',
          text: 'Như ở lớp 10, có thể dùng khoảng tứ phân vị để phát hiện giá trị bất thường: giá trị $x$ được coi là bất thường nếu $x < Q_1 - 1{,}5\\Delta_Q$ hoặc $x > Q_3 + 1{,}5\\Delta_Q$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khoảng biến thiên và khoảng tứ phân vị trên biểu đồ',
    instruction:
      'Hai cột tô vàng là nhóm chứa $Q_1$ và nhóm chứa $Q_3$; phần tô đậm trong mỗi cột là phần số liệu cần lấy thêm trong nhóm. Dải tím là khoảng tứ phân vị, mũi tên trên cùng là khoảng biến thiên. Bấm − và + để đổi tần số, rồi bấm "Thêm một giá trị bất thường" để so sánh độ nhạy của $R$ và $\\Delta_Q$.',
  },
  examples: [
    {
      problem:
        'Thời gian đi từ nhà đến trường (phút) của $40$ học sinh: $[0; 5)$: $6$; $[5; 10)$: $14$; $[10; 15)$: $10$; $[15; 20)$: $7$; $[20; 25)$: $3$. Tính khoảng biến thiên và khoảng tứ phân vị của mẫu số liệu ghép nhóm này.',
      steps: [
        'Khoảng biến thiên: $R = 25 - 0 = 25$ (phút).',
        'Cỡ mẫu $n = 40$; tần số tích luỹ: $6$; $20$; $30$; $37$; $40$.',
        '$\\dfrac{n}{4} = 10$: nhóm đầu tiên có tần số tích luỹ $\\ge 10$ là $[5; 10)$, với $C = 6$, $m_2 = 14$. Vậy $Q_1 = 5 + \\dfrac{10 - 6}{14} \\cdot 5 = \\dfrac{45}{7} \\approx 6{,}43$.',
        '$\\dfrac{3n}{4} = 30$: nhóm đầu tiên có tần số tích luỹ $\\ge 30$ là $[10; 15)$, với $C = 20$, $m_3 = 10$. Vậy $Q_3 = 10 + \\dfrac{30 - 20}{10} \\cdot 5 = 15$.',
        '$\\Delta_Q = Q_3 - Q_1 = 15 - \\dfrac{45}{7} = \\dfrac{60}{7} \\approx 8{,}57$ (phút).',
      ],
      answer: '$R = 25$ phút, $\\Delta_Q \\approx 8{,}57$ phút.',
    },
    {
      problem:
        'Chiều cao (cm) của học sinh hai lớp, mỗi lớp $40$ bạn. Lớp 12A: $[150; 155)$: $3$; $[155; 160)$: $7$; $[160; 165)$: $12$; $[165; 170)$: $10$; $[170; 175)$: $5$; $[175; 180)$: $3$. Lớp 12B: $[145; 150)$: $1$; $[150; 155)$: $2$; $[155; 160)$: $5$; $[160; 165)$: $14$; $[165; 170)$: $12$; $[170; 175)$: $4$; $[175; 180)$: $1$; $[180; 185)$: $1$. Chiều cao của lớp nào phân tán hơn?',
      steps: [
        'Lớp 12A: $R_A = 180 - 150 = 30$. Tần số tích luỹ $3$; $10$; $22$; $32$; $37$; $40$. $Q_1 = 155 + \\dfrac{10 - 3}{7} \\cdot 5 = 160$, $Q_3 = 165 + \\dfrac{30 - 22}{10} \\cdot 5 = 169$, nên $\\Delta_{Q_A} = 9$.',
        'Lớp 12B: $R_B = 185 - 145 = 40$. Tần số tích luỹ $1$; $3$; $8$; $22$; $34$; $38$; $39$; $40$. $Q_1 = 160 + \\dfrac{10 - 8}{14} \\cdot 5 \\approx 160{,}71$, $Q_3 = 165 + \\dfrac{30 - 22}{12} \\cdot 5 \\approx 168{,}33$, nên $\\Delta_{Q_B} \\approx 7{,}62$.',
        'Theo khoảng biến thiên, lớp 12B có vẻ phân tán hơn; nhưng $R_B$ lớn chỉ vì hai bạn rất thấp và rất cao ở hai đầu. Khoảng tứ phân vị ít bị ảnh hưởng bởi các giá trị đó, và $\\Delta_{Q_A} > \\Delta_{Q_B}$.',
      ],
      answer:
        'Dựa vào khoảng tứ phân vị, chiều cao của lớp 12A phân tán hơn (nửa giữa của lớp 12A trải rộng hơn), dù lớp 12B có khoảng biến thiên lớn hơn.',
    },
    {
      problem:
        'Với bảng chiều cao của lớp 12A ở ví dụ trên, một bạn cao $185$ cm có được coi là giá trị bất thường không?',
      steps: [
        'Từ ví dụ trên: $Q_1 = 160$, $Q_3 = 169$, $\\Delta_Q = 9$.',
        '$Q_1 - 1{,}5\\Delta_Q = 160 - 13{,}5 = 146{,}5$ và $Q_3 + 1{,}5\\Delta_Q = 169 + 13{,}5 = 182{,}5$.',
        '$185 > 182{,}5$.',
      ],
      answer: 'Có: chiều cao $185$ cm là giá trị bất thường so với mẫu số liệu này.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Thời gian hoàn thành một bài kiểm tra (phút) của $40$ học sinh: $[20; 25)$: $5$; $[25; 30)$: $8$; $[30; 35)$: $14$; $[35; 40)$: $9$; $[40; 45)$: $4$. Tính khoảng biến thiên $R$ của mẫu số liệu ghép nhóm.',
      answer: 25,
      unit: 'phút',
      hints: [
        'Khoảng biến thiên dùng hai đầu mút của bảng, không dùng tần số.',
        'Lấy đầu mút phải của nhóm cuối trừ đầu mút trái của nhóm đầu.',
      ],
      solution: '$R = a_6 - a_1 = 45 - 20 = 25$ (phút).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng thời gian hoàn thành bài kiểm tra ở câu trên, tính tứ phân vị thứ nhất $Q_1$ (làm tròn đến hàng phần trăm).',
      answer: 28.13,
      tolerance: 0.006,
      hints: [
        'Tính $\\dfrac{n}{4}$ và tần số tích luỹ $5$; $13$; $27$; $36$; $40$.',
        'Nhóm chứa $Q_1$ là $[25; 30)$ với $C = 5$ và $m_2 = 8$.',
      ],
      solution:
        '$n = 40$, $\\dfrac{n}{4} = 10$. Nhóm đầu tiên có tần số tích luỹ $\\ge 10$ là $[25; 30)$. $Q_1 = 25 + \\dfrac{10 - 5}{8} \\cdot 5 = 28{,}125 \\approx 28{,}13$.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn với bảng thời gian hoàn thành bài kiểm tra, tính khoảng tứ phân vị $\\Delta_Q$ (làm tròn đến hàng phần trăm).',
      answer: 8.54,
      tolerance: 0.006,
      hints: [
        '$\\dfrac{3n}{4} = 30$; nhóm chứa $Q_3$ là nhóm đầu tiên có tần số tích luỹ $\\ge 30$.',
        'Nhóm chứa $Q_3$ là $[35; 40)$ với $C = 27$, $m_4 = 9$. Tính $Q_3$ rồi trừ $Q_1 = 28{,}125$.',
      ],
      solution:
        '$Q_3 = 35 + \\dfrac{30 - 27}{9} \\cdot 5 = \\dfrac{110}{3} \\approx 36{,}67$. $\\Delta_Q = \\dfrac{110}{3} - 28{,}125 \\approx 8{,}54$ (phút).',
    },
    {
      type: 'choice',
      prompt:
        'Khoảng biến thiên của mẫu số liệu ghép nhóm có $k$ nhóm $[a_1; a_2), \\ldots, [a_k; a_{k+1})$ là',
      options: ['$R = a_{k+1} - a_1$', '$R = a_k - a_1$', '$R = a_{k+1} - a_k$', '$R = Q_3 - Q_1$'],
      answer: 0,
      hints: [
        'Mọi giá trị của mẫu đều nằm giữa đầu mút trái của nhóm đầu và đầu mút phải của nhóm cuối.',
      ],
      solution:
        'Khoảng biến thiên là hiệu giữa đầu mút phải của nhóm cuối và đầu mút trái của nhóm đầu: $R = a_{k+1} - a_1$. Còn $Q_3 - Q_1$ là khoảng tứ phân vị.',
    },
    {
      type: 'choice',
      prompt:
        'Một mẫu số liệu ghép nhóm có thêm một giá trị rất lớn, nằm ở một nhóm mới xa hẳn các nhóm khác. Số đo nào thay đổi nhiều nhất?',
      options: [
        'Khoảng biến thiên $R$',
        'Khoảng tứ phân vị $\\Delta_Q$',
        'Tứ phân vị thứ nhất $Q_1$',
        'Cả ba thay đổi như nhau',
      ],
      answer: 0,
      hints: ['Số đo nào phụ thuộc vào hai đầu mút của bảng?'],
      solution:
        'Khoảng biến thiên dùng đầu mút phải của nhóm cuối, nên tăng mạnh khi có thêm nhóm ở xa. $Q_1$, $Q_3$ và $\\Delta_Q$ chỉ phụ thuộc vào nửa giữa của mẫu nên chỉ đổi rất ít.',
    },
    {
      type: 'choice',
      prompt:
        'Thu nhập hằng tháng của người lao động ở hai nhà máy có khoảng tứ phân vị lần lượt là $\\Delta_{Q_A} \\approx 2{,}9$ triệu đồng và $\\Delta_{Q_B} \\approx 4{,}1$ triệu đồng. Kết luận nào đúng?',
      options: [
        'Thu nhập ở nhà máy B phân tán (biến động) nhiều hơn.',
        'Thu nhập ở nhà máy A phân tán nhiều hơn.',
        'Thu nhập trung bình ở nhà máy B cao hơn.',
        'Không thể so sánh độ phân tán khi chưa biết khoảng biến thiên.',
      ],
      answer: 0,
      hints: ['Khoảng tứ phân vị càng lớn thì mẫu số liệu càng phân tán.'],
      solution:
        '$\\Delta_{Q_B} > \\Delta_{Q_A}$ nên thu nhập ở nhà máy B phân tán nhiều hơn. Khoảng tứ phân vị không cho biết gì về thu nhập trung bình.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu số liệu ghép nhóm có $Q_1 = 52$ và $Q_3 = 60$. Tìm số $b$ sao cho mọi giá trị lớn hơn $b$ đều được coi là giá trị bất thường.',
      answer: 72,
      hints: [
        'Tính $\\Delta_Q = Q_3 - Q_1$.',
        'Giá trị $x$ là bất thường khi $x > Q_3 + 1{,}5\\Delta_Q$.',
      ],
      solution: '$\\Delta_Q = 60 - 52 = 8$, $b = Q_3 + 1{,}5\\Delta_Q = 60 + 12 = 72$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Khoảng biến thiên của mẫu số liệu gốc không vượt quá khoảng biến thiên của mẫu ghép nhóm.',
        'Khoảng tứ phân vị của mẫu ghép nhóm là giá trị xấp xỉ của khoảng tứ phân vị của mẫu gốc.',
        'Khoảng tứ phân vị càng lớn thì mẫu số liệu càng tập trung.',
        'Khoảng biến thiên luôn nhỏ hơn khoảng tứ phân vị.',
      ],
      answers: [0, 1],
      hints: [
        'Mọi giá trị gốc đều nằm giữa $a_1$ và $a_{k+1}$.',
        'Giữa $Q_1$ và $Q_3$ chỉ có một nửa số liệu, còn $R$ bao trọn mẫu.',
      ],
      solution:
        'Hai khẳng định đầu đúng. $\\Delta_Q$ càng lớn thì mẫu càng phân tán, không phải tập trung. Vì $a_1 \\le Q_1 \\le Q_3 \\le a_{k+1}$ nên $\\Delta_Q \\le R$, không phải ngược lại.',
    },
  ],
  takeaways: [
    'Khoảng biến thiên: $R = a_{k+1} - a_1$ (đầu mút phải nhóm cuối trừ đầu mút trái nhóm đầu).',
    'Khoảng tứ phân vị: $\\Delta_Q = Q_3 - Q_1$, với $Q_1$, $Q_3$ tính bằng công thức nội suy trong nhóm chứa chúng.',
    '$R$ và $\\Delta_Q$ càng lớn thì mẫu càng phân tán; chúng xấp xỉ các số tương ứng của mẫu gốc.',
    '$R$ nhạy với giá trị bất thường; $\\Delta_Q$ ít bị ảnh hưởng nên phù hợp hơn khi mẫu có giá trị bất thường.',
  ],
};
