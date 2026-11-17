/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương III: khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm; tự tính trên số liệu thực, so sánh với mẫu gốc và luyện tập với bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương III cho bốn số đo mức độ phân tán của mẫu số liệu ghép nhóm: khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn. Bài ôn tập này hệ thống lại các công thức và ý nghĩa của chúng, cho em tự tính trên số liệu chiều cao và thời gian chạy thật rồi so với kết quả tính trên mẫu gốc, và một bộ đề tự sinh chỉ ra phần nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các công thức tính khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm.',
    'Tính thành thạo các số đo độ phân tán từ bảng tần số ghép nhóm.',
    'Chọn số đo phù hợp để so sánh độ phân tán, độ ổn định, mức độ rủi ro và phát hiện giá trị bất thường.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Số đo', 'Công thức', 'Đặc điểm'],
          rows: [
            [
              'Khoảng biến thiên $R$',
              '$R = a_{k+1} - a_1$',
              'Dễ tính; chỉ dùng hai đầu mút nên rất nhạy với giá trị bất thường',
            ],
            [
              'Khoảng tứ phân vị $\\Delta_Q$',
              '$\\Delta_Q = Q_3 - Q_1$',
              'Đo độ phân tán của nửa giữa mẫu; ít bị ảnh hưởng bởi giá trị bất thường',
            ],
            [
              'Phương sai $s^2$',
              '$s^2 = \\dfrac{1}{n}\\left[m_1(x_1 - \\overline{x})^2 + \\cdots + m_k(x_k - \\overline{x})^2\\right]$',
              'Dùng mọi nhóm; đơn vị là bình phương đơn vị số liệu',
            ],
            [
              'Độ lệch chuẩn $s$',
              '$s = \\sqrt{s^2}$',
              'Cùng đơn vị với số liệu; đo độ phân tán quanh số trung bình, đo mức độ rủi ro',
            ],
          ],
          caption:
            'Mẫu có $k$ nhóm $[a_i; a_{i+1})$, tần số $m_i$, giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$, cỡ mẫu $n$.',
        },
        {
          type: 'list',
          items: [
            '$Q_1 = a_p + \\dfrac{\\frac{n}{4} - (m_1 + \\cdots + m_{p-1})}{m_p}(a_{p+1} - a_p)$, với $[a_p; a_{p+1})$ là nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{n}{4}$; $Q_3$ tính tương tự với $\\dfrac{3n}{4}$.',
            'Công thức tính nhanh phương sai: $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_kx_k^2\\right) - \\overline{x}^2$.',
            'Các số đo càng lớn thì mẫu số liệu càng phân tán; chúng đều là giá trị xấp xỉ của các số đo tương ứng của mẫu gốc.',
            'Giá trị $x$ là bất thường nếu $x < Q_1 - 1{,}5\\Delta_Q$ hoặc $x > Q_3 + 1{,}5\\Delta_Q$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Lấy đầu mút trái của nhóm cuối thay cho đầu mút phải khi tính $R$; chọn nhóm chứa $Q_1$, $Q_3$ theo tần số lớn nhất thay vì theo tần số tích luỹ; quên trừ tổng tần số các nhóm đứng trước; dùng đầu mút thay cho giá trị đại diện khi tính phương sai; quên lấy căn bậc hai khi đề hỏi độ lệch chuẩn; chia cho $n - 1$ thay vì $n$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự luyện',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có $12$ câu sinh ngẫu nhiên, ba câu cho mỗi số đo: khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn. Trả lời sai lần đầu em được gợi ý và thử lại; bản đồ kĩ năng tô màu theo lần trả lời đầu tiên và chỉ ra phần cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Tự tính rồi so với mẫu gốc',
    instruction:
      'Chọn bộ dữ liệu (chiều cao của $40$ học sinh hoặc thời gian chạy $100$ m của $30$ học sinh) và độ dài nhóm. Từ bảng tần số ghép nhóm, tự tính khoảng biến thiên, khoảng tứ phân vị và độ lệch chuẩn, nhập kết quả rồi bấm "Kiểm tra". Sau đó bấm "So sánh với mẫu gốc" để xem các số đo tính từ mẫu ghép nhóm lệch bao nhiêu so với các số tính trực tiếp từ số liệu ban đầu, và thử đổi độ dài nhóm.',
  },
  examples: [
    {
      problem:
        'Thời gian chờ xe buýt (phút) của $40$ hành khách: $[0; 5)$: $4$; $[5; 10)$: $10$; $[10; 15)$: $13$; $[15; 20)$: $8$; $[20; 25)$: $5$. Tính khoảng biến thiên, khoảng tứ phân vị và độ lệch chuẩn.',
      steps: [
        '$R = 25 - 0 = 25$ (phút).',
        'Tần số tích luỹ: $4$; $14$; $27$; $35$; $40$. $\\dfrac{n}{4} = 10$, nhóm chứa $Q_1$ là $[5; 10)$: $Q_1 = 5 + \\dfrac{10 - 4}{10} \\cdot 5 = 8$.',
        '$\\dfrac{3n}{4} = 30$, nhóm chứa $Q_3$ là $[15; 20)$: $Q_3 = 15 + \\dfrac{30 - 27}{8} \\cdot 5 = 16{,}875$. Vậy $\\Delta_Q = 16{,}875 - 8 = 8{,}875$.',
        'Giá trị đại diện $2{,}5$; $7{,}5$; $12{,}5$; $17{,}5$; $22{,}5$. $\\overline{x} = \\dfrac{10 + 75 + 162{,}5 + 140 + 112{,}5}{40} = \\dfrac{500}{40} = 12{,}5$.',
        'Độ lệch: $-10$; $-5$; $0$; $5$; $10$. $s^2 = \\dfrac{4 \\cdot 100 + 10 \\cdot 25 + 0 + 8 \\cdot 25 + 5 \\cdot 100}{40} = \\dfrac{1\\,350}{40} = 33{,}75$, $s = \\sqrt{33{,}75} \\approx 5{,}81$.',
      ],
      answer: '$R = 25$ phút, $\\Delta_Q = 8{,}875$ phút, $s \\approx 5{,}81$ phút.',
    },
    {
      problem:
        'Năng suất (tạ/ha) của hai giống lúa X và Y, mỗi giống trồng trên $20$ thửa ruộng: giống X: $[50; 55)$: $2$; $[55; 60)$: $4$; $[60; 65)$: $8$; $[65; 70)$: $4$; $[70; 75)$: $2$. Giống Y: $[50; 55)$: $4$; $[55; 60)$: $5$; $[60; 65)$: $2$; $[65; 70)$: $5$; $[70; 75)$: $4$. Giống nào cho năng suất ổn định hơn?',
      steps: [
        'Hai mẫu có cùng khoảng biến thiên $R = 75 - 50 = 25$, nên $R$ không giúp so sánh.',
        'Giống X: tần số tích luỹ $2$; $6$; $14$; $18$; $20$. $Q_1 = 55 + \\dfrac{5 - 2}{4} \\cdot 5 = 58{,}75$, $Q_3 = 65 + \\dfrac{15 - 14}{4} \\cdot 5 = 66{,}25$, $\\Delta_{Q_X} = 7{,}5$.',
        'Giống Y: tần số tích luỹ $4$; $9$; $11$; $16$; $20$. $Q_1 = 55 + \\dfrac{5 - 4}{5} \\cdot 5 = 56$, $Q_3 = 65 + \\dfrac{15 - 11}{5} \\cdot 5 = 69$, $\\Delta_{Q_Y} = 13$.',
        'Cả hai có $\\overline{x} = 62{,}5$ và độ lệch $-10$; $-5$; $0$; $5$; $10$. $s_X^2 = \\dfrac{2 \\cdot 100 + 4 \\cdot 25 + 0 + 4 \\cdot 25 + 2 \\cdot 100}{20} = 30$, $s_X \\approx 5{,}48$; $s_Y^2 = \\dfrac{4 \\cdot 100 + 5 \\cdot 25 + 0 + 5 \\cdot 25 + 4 \\cdot 100}{20} = 52{,}5$, $s_Y \\approx 7{,}25$.',
      ],
      answer:
        'Cả khoảng tứ phân vị và độ lệch chuẩn của giống X đều nhỏ hơn, nên giống X cho năng suất ổn định hơn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Điểm đánh giá năng lực (thang $100$) của $30$ học sinh: $[40; 50)$: $2$; $[50; 60)$: $5$; $[60; 70)$: $9$; $[70; 80)$: $10$; $[80; 90)$: $3$; $[90; 100)$: $1$. Khoảng biến thiên của mẫu số liệu ghép nhóm này là',
      options: ['$60$', '$50$', '$55$', '$10$'],
      answer: 0,
      hints: ['Lấy đầu mút phải của nhóm cuối trừ đầu mút trái của nhóm đầu.'],
      solution: '$R = 100 - 40 = 60$.',
    },
    {
      type: 'choice',
      prompt: 'Với bảng điểm đánh giá năng lực ở câu trên, nhóm chứa tứ phân vị thứ ba $Q_3$ là',
      options: ['$[70; 80)$', '$[60; 70)$', '$[80; 90)$', '$[90; 100)$'],
      answer: 0,
      hints: [
        'Tính $\\dfrac{3n}{4}$ với $n = 30$.',
        'Tần số tích luỹ: $2$; $7$; $16$; $26$; $29$; $30$. Tìm nhóm đầu tiên có tần số tích luỹ $\\ge 22{,}5$.',
      ],
      solution:
        '$\\dfrac{3n}{4} = 22{,}5$. Tần số tích luỹ đến hết $[60; 70)$ là $16 < 22{,}5$, đến hết $[70; 80)$ là $26 \\ge 22{,}5$, nên nhóm chứa $Q_3$ là $[70; 80)$.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn với bảng điểm đánh giá năng lực, tính khoảng tứ phân vị $\\Delta_Q$ (làm tròn đến hàng phần trăm).',
      answer: 15.94,
      tolerance: 0.011,
      hints: [
        '$\\dfrac{n}{4} = 7{,}5$: nhóm chứa $Q_1$ là $[60; 70)$ với $C = 7$, $m = 9$.',
        '$\\dfrac{3n}{4} = 22{,}5$: nhóm chứa $Q_3$ là $[70; 80)$ với $C = 16$, $m = 10$.',
      ],
      solution:
        '$Q_1 = 60 + \\dfrac{7{,}5 - 7}{9} \\cdot 10 \\approx 60{,}56$; $Q_3 = 70 + \\dfrac{22{,}5 - 16}{10} \\cdot 10 = 76{,}5$. $\\Delta_Q = 76{,}5 - 60{,}56 \\approx 15{,}94$.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn với bảng điểm đánh giá năng lực, tính số trung bình $\\overline{x}$ (làm tròn đến hàng phần trăm).',
      answer: 68.33,
      tolerance: 0.006,
      hints: [
        'Giá trị đại diện: $45$; $55$; $65$; $75$; $85$; $95$.',
        'Tính $\\dfrac{2 \\cdot 45 + 5 \\cdot 55 + 9 \\cdot 65 + 10 \\cdot 75 + 3 \\cdot 85 + 1 \\cdot 95}{30}$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{90 + 275 + 585 + 750 + 255 + 95}{30} = \\dfrac{2\\,050}{30} = \\dfrac{205}{3} \\approx 68{,}33$.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn với bảng điểm đánh giá năng lực, tính độ lệch chuẩn $s$ (làm tròn đến hàng phần trăm).',
      answer: 11.64,
      tolerance: 0.011,
      hints: [
        'Dùng $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_6x_6^2\\right) - \\overline{x}^2$ với $\\overline{x} = \\dfrac{205}{3}$.',
        '$m_1x_1^2 + \\cdots + m_6x_6^2 = 144\\,150$.',
      ],
      solution:
        '$s^2 = \\dfrac{144\\,150}{30} - \\left(\\dfrac{205}{3}\\right)^2 = 4\\,805 - \\dfrac{42\\,025}{9} = \\dfrac{1\\,220}{9} \\approx 135{,}56$, nên $s = \\sqrt{\\dfrac{1\\,220}{9}} \\approx 11{,}64$.',
    },
    {
      type: 'choice',
      prompt:
        'Với bảng điểm đánh giá năng lực ($Q_1 \\approx 60{,}56$, $Q_3 = 76{,}5$), một học sinh được $35$ điểm. Kết luận nào đúng?',
      options: [
        'Điểm $35$ là giá trị bất thường vì nhỏ hơn $Q_1 - 1{,}5\\Delta_Q \\approx 36{,}64$.',
        'Điểm $35$ không bất thường vì lớn hơn $0$.',
        'Điểm $35$ không bất thường vì lớn hơn $Q_1 - \\Delta_Q \\approx 44{,}61$.',
        'Không thể kết luận vì mẫu đã ghép nhóm.',
      ],
      answer: 0,
      hints: ['Tính $\\Delta_Q$ rồi $Q_1 - 1{,}5\\Delta_Q$.'],
      solution:
        '$\\Delta_Q \\approx 15{,}94$, $Q_1 - 1{,}5\\Delta_Q \\approx 60{,}56 - 23{,}92 = 36{,}64$. Vì $35 < 36{,}64$ nên điểm $35$ là giá trị bất thường.',
    },
    {
      type: 'multi',
      prompt:
        'Một mẫu số liệu có một giá trị bất thường rất lớn. Số đo nào sau đây ít bị ảnh hưởng bởi giá trị đó?',
      options: ['Khoảng tứ phân vị', 'Khoảng biến thiên', 'Phương sai', 'Độ lệch chuẩn'],
      answers: [0],
      hints: ['Số đo nào chỉ phụ thuộc vào nửa giữa của mẫu?'],
      solution:
        'Chỉ khoảng tứ phân vị ít bị ảnh hưởng, vì nó chỉ phụ thuộc vào $50\\%$ số liệu ở giữa. Khoảng biến thiên dùng hai đầu mút; phương sai và độ lệch chuẩn dùng bình phương độ lệch của mọi giá trị, nên một giá trị rất xa trung bình làm chúng tăng nhiều.',
    },
    {
      type: 'choice',
      prompt:
        'Lợi nhuận hằng năm của hai danh mục đầu tư có cùng số trung bình $8\\%$; độ lệch chuẩn lần lượt là $s_1 \\approx 3{,}2\\%$ và $s_2 \\approx 5{,}7\\%$. Nhà đầu tư muốn ít rủi ro nên chọn danh mục nào?',
      options: [
        'Danh mục 1',
        'Danh mục 2',
        'Hai danh mục rủi ro như nhau vì cùng số trung bình',
        'Danh mục 2 vì có khả năng lãi cao hơn',
      ],
      answer: 0,
      hints: ['Độ lệch chuẩn của lợi nhuận càng lớn thì rủi ro càng cao.'],
      solution:
        '$s_1 < s_2$: lợi nhuận của danh mục 1 dao động ít hơn quanh $8\\%$, nên danh mục 1 ít rủi ro hơn.',
    },
    {
      type: 'number',
      prompt: 'Một mẫu số liệu ghép nhóm có độ lệch chuẩn $s = 1{,}2$. Tính phương sai $s^2$.',
      answer: 1.44,
      tolerance: 0.001,
      hints: ['Phương sai là bình phương của độ lệch chuẩn.'],
      solution: '$s^2 = 1{,}2^2 = 1{,}44$.',
    },
    {
      type: 'choice',
      prompt:
        'Cộng thêm $5$ vào mọi đầu mút của các nhóm (giữ nguyên tần số), tức là mọi giá trị của mẫu tăng $5$ đơn vị. Phương sai của mẫu số liệu ghép nhóm thay đổi thế nào?',
      options: ['Không đổi', 'Tăng thêm $5$', 'Tăng thêm $25$', 'Gấp $5$ lần'],
      answer: 0,
      hints: [
        'Mọi giá trị đại diện $x_i$ và số trung bình $\\overline{x}$ đều tăng $5$.',
        'Độ lệch $x_i - \\overline{x}$ thay đổi thế nào?',
      ],
      solution:
        'Mỗi $x_i$ tăng $5$ và $\\overline{x}$ cũng tăng $5$, nên mọi độ lệch $x_i - \\overline{x}$ giữ nguyên. Vậy phương sai (và độ lệch chuẩn) không đổi: dịch chuyển cả mẫu không làm nó phân tán hơn.',
    },
    {
      type: 'number',
      prompt:
        'Tuổi thọ (năm) của $50$ chiếc bình ắc quy: $[2; 2{,}5)$: $4$; $[2{,}5; 3)$: $9$; $[3; 3{,}5)$: $14$; $[3{,}5; 4)$: $11$; $[4; 4{,}5)$: $7$; $[4{,}5; 5)$: $5$. Tính khoảng biến thiên $R$ (năm).',
      answer: 3,
      unit: 'năm',
      hints: ['Đầu mút trái của nhóm đầu là $2$, đầu mút phải của nhóm cuối là $5$.'],
      solution: '$R = 5 - 2 = 3$ (năm).',
    },
  ],
  takeaways: [
    'Khoảng biến thiên $R = a_{k+1} - a_1$ và khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$.',
    'Phương sai $s^2 = \\dfrac{1}{n}\\sum m_i(x_i - \\overline{x})^2$, độ lệch chuẩn $s = \\sqrt{s^2}$, với $x_i$ là giá trị đại diện.',
    'Các số đo càng lớn thì mẫu càng phân tán; khi có giá trị bất thường, dùng $\\Delta_Q$ để so sánh và để phát hiện giá trị bất thường.',
    'Độ lệch chuẩn nhỏ hơn nghĩa là ổn định hơn, ít rủi ro hơn.',
  ],
};
