/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các số đặc trưng đo độ phân tán của mẫu số liệu không ghép nhóm: khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn, và cách phát hiện giá trị bất thường bằng tứ phân vị.',
  intro:
    'Hai xạ thủ cùng có điểm trung bình $8$ sau $10$ lần bắn. Nhưng một người bắn rất đều, người kia lúc trúng $10$ lúc chỉ được $6$. Số trung bình không cho thấy sự khác nhau đó. Ta cần những con số đo xem các số liệu tản ra xa trung tâm đến mức nào: các số đặc trưng đo độ phân tán.',
  objectives: [
    'Tính được khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu không ghép nhóm.',
    'Hiểu ý nghĩa của các số đặc trưng đo độ phân tán và dùng chúng để so sánh độ đồng đều của hai mẫu số liệu.',
    'Phát hiện được giá trị bất thường của mẫu số liệu bằng tứ phân vị.',
  ],
  sections: [
    {
      heading: 'Khoảng biến thiên và khoảng tứ phân vị',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khoảng biến thiên',
          text: 'Khoảng biến thiên của mẫu số liệu, kí hiệu là $R$, là hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất của mẫu số liệu đó.',
        },
        {
          type: 'p',
          text: 'Khoảng biến thiên càng lớn thì mẫu số liệu càng phân tán. Nó dễ tính nhưng chỉ dùng hai giá trị lớn nhất và nhỏ nhất, nên rất dễ bị ảnh hưởng bởi các giá trị bất thường.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khoảng tứ phân vị',
          text: 'Khoảng tứ phân vị, kí hiệu là $\\Delta_Q$, là hiệu giữa tứ phân vị thứ ba và tứ phân vị thứ nhất: $\\Delta_Q = Q_3 - Q_1$.',
        },
        {
          type: 'p',
          text: 'Khoảng tứ phân vị là khoảng biến thiên của khoảng $50\\%$ số liệu chính giữa của mẫu đã sắp xếp. $\\Delta_Q$ càng lớn thì mẫu càng phân tán. Nó không bị ảnh hưởng bởi các giá trị quá lớn hoặc quá nhỏ.',
        },
      ],
    },
    {
      heading: 'Phương sai và độ lệch chuẩn',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi hiệu $x_i - \\overline{x}$ là độ lệch của giá trị $x_i$ so với số trung bình. Tổng các độ lệch luôn bằng $0$, nên ta lấy trung bình cộng của bình phương các độ lệch.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương sai và độ lệch chuẩn',
          text: 'Cho mẫu số liệu $x_1, x_2, \\ldots, x_n$ có số trung bình $\\overline{x}$. Phương sai của mẫu là $$s^2 = \\dfrac{(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2}{n}.$$ Căn bậc hai của phương sai, $s = \\sqrt{s^2}$, được gọi là độ lệch chuẩn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Có thể tính $s^2 = \\dfrac{x_1^2 + x_2^2 + \\cdots + x_n^2}{n} - \\overline{x}^2$. Nếu mẫu cho dưới dạng bảng tần số (giá trị $x_i$ có tần số $m_i$) thì $s^2 = \\dfrac{m_1(x_1 - \\overline{x})^2 + \\cdots + m_k(x_k - \\overline{x})^2}{n} = \\dfrac{m_1x_1^2 + \\cdots + m_kx_k^2}{n} - \\overline{x}^2$. Trong thống kê, người ta còn dùng phương sai hiệu chỉnh $\\hat{s}^2$, chia cho $n - 1$ thay vì $n$.',
        },
        {
          type: 'p',
          text: 'Phương sai và độ lệch chuẩn dùng thông tin của tất cả các giá trị trong mẫu. Số liệu càng phân tán thì phương sai và độ lệch chuẩn càng lớn. Độ lệch chuẩn có cùng đơn vị với số liệu, nên thường dùng hơn phương sai.',
        },
      ],
    },
    {
      heading: 'Phát hiện giá trị bất thường',
      blocks: [
        {
          type: 'p',
          text: 'Mẫu số liệu có thể có những giá trị quá lớn hoặc quá nhỏ so với phần lớn các giá trị khác, do nhầm lẫn khi đo, khi ghi chép, hoặc do một hiện tượng đặc biệt. Chúng gọi là giá trị bất thường.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc phát hiện giá trị bất thường',
          text: 'Giá trị $x$ trong mẫu là giá trị bất thường nếu $x > Q_3 + 1{,}5\\Delta_Q$ hoặc $x < Q_1 - 1{,}5\\Delta_Q$.',
        },
        {
          type: 'p',
          text: 'Biểu đồ hộp tóm tắt mẫu số liệu: hộp kéo dài từ $Q_1$ đến $Q_3$ (dài đúng $\\Delta_Q$), vạch trong hộp là trung vị, hai "râu" chạy tới giá trị nhỏ nhất và lớn nhất không bất thường, còn mỗi giá trị bất thường là một điểm riêng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ hộp từ số liệu em nhập',
    instruction:
      'Chọn một mẫu có sẵn hoặc gõ mẫu của em (các số cách nhau bởi dấu chấm phẩy, dùng dấu phẩy thập phân). Xem biểu đồ hộp, dải từ $\\overline{x} - s$ đến $\\overline{x} + s$ và các giá trị bất thường. Thử sửa một số thành rất lớn: $R$ và $s$ tăng vọt, còn $\\Delta_Q$ gần như không đổi.',
  },
  examples: [
    {
      problem:
        'Điểm $10$ lần bắn của hai xạ thủ: A: $8$; $9$; $10$; $7$; $6$; $10$; $6$; $7$; $9$; $8$; B: $10$; $6$; $8$; $7$; $9$; $9$; $8$; $7$; $8$; $8$. Xạ thủ nào bắn đều hơn?',
      steps: [
        'Số trung bình: $\\overline{x}_A = \\dfrac{80}{10} = 8$, $\\overline{x}_B = \\dfrac{80}{10} = 8$.',
        'Khoảng biến thiên: $R_A = 10 - 6 = 4$, $R_B = 10 - 6 = 4$, như nhau.',
        'Độ lệch so với $8$ của A: $0, 1, 2, -1, -2, 2, -2, -1, 1, 0$; tổng bình phương là $20$, nên $s_A^2 = \\dfrac{20}{10} = 2$.',
        'Độ lệch của B: $2, -2, 0, -1, 1, 1, 0, -1, 0, 0$; tổng bình phương là $12$, nên $s_B^2 = \\dfrac{12}{10} = 1{,}2$.',
      ],
      answer: '$s_B^2 = 1{,}2 < s_A^2 = 2$: điểm của B ít phân tán hơn, nên xạ thủ B bắn đều hơn.',
    },
    {
      problem:
        'Cân nặng (kg) của $10$ trẻ sơ sinh: $2{,}8$; $2{,}5$; $3{,}1$; $3{,}3$; $2{,}9$; $3{,}5$; $4{,}1$; $2{,}8$; $3{,}0$; $3{,}3$. Tìm khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn.',
      steps: [
        'Sắp xếp: $2{,}5$; $2{,}8$; $2{,}8$; $2{,}9$; $3{,}0$; $3{,}1$; $3{,}3$; $3{,}3$; $3{,}5$; $4{,}1$. $R = 4{,}1 - 2{,}5 = 1{,}6$ (kg).',
        'Nửa trái $2{,}5;\\ 2{,}8;\\ 2{,}8;\\ 2{,}9;\\ 3{,}0$ cho $Q_1 = 2{,}8$; nửa phải $3{,}1;\\ 3{,}3;\\ 3{,}3;\\ 3{,}5;\\ 4{,}1$ cho $Q_3 = 3{,}3$. $\\Delta_Q = 0{,}5$ (kg).',
        '$\\overline{x} = \\dfrac{31{,}3}{10} = 3{,}13$. Tổng bình phương các độ lệch là $1{,}821$, nên $s^2 = \\dfrac{1{,}821}{10} = 0{,}1821$.',
        '$s = \\sqrt{0{,}1821} \\approx 0{,}4267$ (kg).',
        'Kiểm tra giá trị bất thường: $Q_1 - 1{,}5\\Delta_Q = 2{,}8 - 0{,}75 = 2{,}05$ và $Q_3 + 1{,}5\\Delta_Q = 3{,}3 + 0{,}75 = 4{,}05$. Giá trị $4{,}1 > 4{,}05$ nên $4{,}1$ kg là giá trị bất thường; vì vậy $R = 1{,}6$ lớn hơn nhiều so với $\\Delta_Q = 0{,}5$.',
      ],
      answer:
        '$R = 1{,}6$ kg, $\\Delta_Q = 0{,}5$ kg, $s^2 = 0{,}1821$, $s \\approx 0{,}43$ kg; mẫu có một giá trị bất thường là $4{,}1$ kg.',
    },
    {
      problem:
        'Hàm lượng canxi (mg) trong $20$ mẫu thực phẩm, đã sắp xếp: $0$; $4$; $8$; $10$; $13$; $14$; $15$; $16$; $16$; $18$; $18$; $18$; $19$; $20$; $20$; $20$; $21$; $22$; $29$; $34$. Tìm các giá trị bất thường.',
      steps: [
        '$Q_2 = \\dfrac{18 + 18}{2} = 18$; nửa trái có $Q_1 = \\dfrac{13 + 14}{2} = 13{,}5$; nửa phải có $Q_3 = \\dfrac{20 + 20}{2} = 20$.',
        '$\\Delta_Q = 20 - 13{,}5 = 6{,}5$.',
        '$Q_1 - 1{,}5\\Delta_Q = 13{,}5 - 9{,}75 = 3{,}75$ và $Q_3 + 1{,}5\\Delta_Q = 20 + 9{,}75 = 29{,}75$.',
        'Giá trị $0 < 3{,}75$ và $34 > 29{,}75$; mọi giá trị khác nằm trong đoạn $[3{,}75; 29{,}75]$.',
      ],
      answer: 'Mẫu có hai giá trị bất thường là $0$ và $34$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm khoảng biến thiên của mẫu số liệu: $12;\\ 7;\\ 15;\\ 9;\\ 20;\\ 11$.',
      answer: 13,
      hints: ['$R$ là hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất.'],
      solution: 'Giá trị lớn nhất là $20$, nhỏ nhất là $7$, nên $R = 20 - 7 = 13$.',
    },
    {
      type: 'number',
      prompt: 'Tìm khoảng tứ phân vị của mẫu số liệu: $3$; $5$; $6$; $8$; $9$; $11$; $14$; $15$.',
      answer: 7,
      hints: [
        'Mẫu đã sắp xếp, $n = 8$: mỗi nửa có $4$ giá trị.',
        '$Q_1$ là trung vị của $3;\\ 5;\\ 6;\\ 8$, $Q_3$ là trung vị của $9;\\ 11;\\ 14;\\ 15$.',
      ],
      solution:
        '$Q_1 = \\dfrac{5 + 6}{2} = 5{,}5$, $Q_3 = \\dfrac{11 + 14}{2} = 12{,}5$, nên $\\Delta_Q = 12{,}5 - 5{,}5 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính phương sai của mẫu số liệu: $2;\\ 4;\\ 6;\\ 8$.',
      answer: 5,
      hints: [
        'Tính số trung bình $\\overline{x}$ trước.',
        '$\\overline{x} = 5$; các độ lệch là $-3, -1, 1, 3$.',
      ],
      solution:
        '$\\overline{x} = 5$. $s^2 = \\dfrac{(-3)^2 + (-1)^2 + 1^2 + 3^2}{4} = \\dfrac{20}{4} = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ lệch chuẩn của mẫu số liệu: $5;\\ 7;\\ 9;\\ 11;\\ 13$ (làm tròn đến hàng phần trăm).',
      answer: 2.83,
      tolerance: 0.006,
      hints: ['$\\overline{x} = 9$.', 'Tính phương sai $s^2$ rồi lấy căn bậc hai.'],
      solution:
        '$\\overline{x} = 9$; $s^2 = \\dfrac{16 + 4 + 0 + 4 + 16}{5} = 8$; $s = \\sqrt{8} \\approx 2{,}83$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu số liệu cho dưới dạng bảng tần số: giá trị $1$, $2$, $3$ có tần số lần lượt là $2$, $5$, $3$. Tính phương sai của mẫu.',
      answer: 0.49,
      hints: [
        '$n = 10$ và $\\overline{x} = \\dfrac{2 \\cdot 1 + 5 \\cdot 2 + 3 \\cdot 3}{10}$.',
        'Dùng $s^2 = \\dfrac{m_1x_1^2 + m_2x_2^2 + m_3x_3^2}{n} - \\overline{x}^2$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{21}{10} = 2{,}1$. $\\dfrac{2 \\cdot 1 + 5 \\cdot 4 + 3 \\cdot 9}{10} = \\dfrac{49}{10} = 4{,}9$. $s^2 = 4{,}9 - 2{,}1^2 = 4{,}9 - 4{,}41 = 0{,}49$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu số liệu có $Q_1 = 10$ và $Q_3 = 16$. Một giá trị của mẫu là bất thường nếu nó lớn hơn số nào?',
      answer: 25,
      hints: ['Tính $\\Delta_Q = Q_3 - Q_1$ trước.', 'Giới hạn trên là $Q_3 + 1{,}5\\Delta_Q$.'],
      solution:
        '$\\Delta_Q = 6$; $Q_3 + 1{,}5\\Delta_Q = 16 + 9 = 25$. Giá trị lớn hơn $25$ là bất thường.',
    },
    {
      type: 'multi',
      prompt:
        'Cho mẫu số liệu $1$; $10$; $11$; $12$; $12$; $13$; $14$; $15$; $30$. Chọn tất cả các giá trị bất thường.',
      options: ['$1$', '$10$', '$15$', '$30$'],
      answers: [0, 3],
      hints: [
        '$n = 9$, $Q_2 = 12$; tìm $Q_1$, $Q_3$ từ hai nửa $1;\\ 10;\\ 11;\\ 12$ và $13;\\ 14;\\ 15;\\ 30$.',
        '$Q_1 = 10{,}5$, $Q_3 = 14{,}5$; tính hai giới hạn $Q_1 - 1{,}5\\Delta_Q$ và $Q_3 + 1{,}5\\Delta_Q$.',
      ],
      solution:
        '$Q_1 = 10{,}5$, $Q_3 = 14{,}5$, $\\Delta_Q = 4$. Hai giới hạn là $10{,}5 - 6 = 4{,}5$ và $14{,}5 + 6 = 20{,}5$. Giá trị $1 < 4{,}5$ và $30 > 20{,}5$ là bất thường; $10$ và $15$ nằm trong đoạn $[4{,}5; 20{,}5]$.',
    },
    {
      type: 'choice',
      prompt:
        'Cộng thêm $5$ vào mọi giá trị của một mẫu số liệu. Độ lệch chuẩn của mẫu mới so với mẫu cũ thì',
      options: ['không thay đổi', 'tăng thêm $5$', 'tăng thêm $25$', 'gấp $5$ lần'],
      answer: 0,
      hints: [
        'Số trung bình mới cũng tăng thêm $5$. Các độ lệch $x_i - \\overline{x}$ thay đổi thế nào?',
      ],
      solution:
        'Mỗi giá trị và số trung bình đều tăng $5$, nên mọi độ lệch $x_i - \\overline{x}$ giữ nguyên. Phương sai và độ lệch chuẩn không thay đổi: cả mẫu chỉ dịch chuyển, không tản ra thêm.',
    },
    {
      type: 'choice',
      prompt: 'Số đặc trưng đo độ phân tán nào không bị ảnh hưởng bởi các giá trị bất thường?',
      options: ['Khoảng tứ phân vị', 'Khoảng biến thiên', 'Phương sai', 'Độ lệch chuẩn'],
      answer: 0,
      hints: ['Số nào chỉ dùng khoảng $50\\%$ số liệu chính giữa?'],
      solution:
        '$\\Delta_Q = Q_3 - Q_1$ chỉ phụ thuộc vào nửa số liệu chính giữa, nên không bị ảnh hưởng bởi giá trị quá lớn hoặc quá nhỏ. Khoảng biến thiên dùng chính giá trị lớn nhất, nhỏ nhất; phương sai và độ lệch chuẩn dùng mọi giá trị.',
    },
  ],
  takeaways: [
    'Khoảng biến thiên $R = x_{\\max} - x_{\\min}$; khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$.',
    'Phương sai $s^2 = \\dfrac{1}{n}\\left[(x_1 - \\overline{x})^2 + \\cdots + (x_n - \\overline{x})^2\\right]$, độ lệch chuẩn $s = \\sqrt{s^2}$; càng lớn thì mẫu càng phân tán.',
    'Giá trị bất thường: lớn hơn $Q_3 + 1{,}5\\Delta_Q$ hoặc nhỏ hơn $Q_1 - 1{,}5\\Delta_Q$.',
    '$R$, $s^2$, $s$ bị ảnh hưởng bởi giá trị bất thường; $\\Delta_Q$ thì không.',
  ],
};
