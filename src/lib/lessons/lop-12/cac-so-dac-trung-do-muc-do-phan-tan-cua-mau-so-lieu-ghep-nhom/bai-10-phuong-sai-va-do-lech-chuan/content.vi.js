/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm: công thức tính bằng giá trị đại diện, ý nghĩa đo độ phân tán quanh số trung bình và ứng dụng đo mức độ rủi ro.',
  intro:
    'Hai lĩnh vực đầu tư cho cùng một mức lợi nhuận trung bình $3\\%$ mỗi năm. Ở lĩnh vực thứ nhất có khoản lãi $7\\%$ nhưng cũng có khoản lỗ; ở lĩnh vực thứ hai lợi nhuận hầu như quanh $3\\%$. Nên chọn lĩnh vực nào nếu muốn ít rủi ro? Khoảng biến thiên và khoảng tứ phân vị chỉ dùng vài giá trị của mẫu; phương sai và độ lệch chuẩn đo độ phân tán của mọi số liệu quanh số trung bình.',
  objectives: [
    'Tính phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm.',
    'Giải thích ý nghĩa của phương sai và độ lệch chuẩn.',
    'Dùng độ lệch chuẩn để so sánh độ phân tán, độ ổn định và mức độ rủi ro trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Phương sai và độ lệch chuẩn',
      blocks: [
        {
          type: 'p',
          text: 'Như khi tính số trung bình, ta thay mọi giá trị của nhóm $[a_i; a_{i+1})$ bằng giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$. Độ lệch của nhóm so với số trung bình là $x_i - \\overline{x}$; bình phương độ lệch rồi lấy trung bình có trọng số là tần số, ta được phương sai.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương sai và độ lệch chuẩn',
          text: 'Cho mẫu số liệu ghép nhóm có $k$ nhóm, nhóm thứ $i$ có giá trị đại diện $x_i$ và tần số $m_i$, cỡ mẫu $n = m_1 + m_2 + \\cdots + m_k$, số trung bình $\\overline{x} = \\dfrac{m_1x_1 + \\cdots + m_kx_k}{n}$. Phương sai của mẫu số liệu ghép nhóm là số $s^2$ cho bởi công thức dưới đây. Căn bậc hai số học của phương sai, $s = \\sqrt{s^2}$, là độ lệch chuẩn của mẫu số liệu ghép nhóm.',
        },
        {
          type: 'tex',
          tex: 's^2 = \\dfrac{1}{n}\\left[m_1(x_1 - \\overline{x})^2 + m_2(x_2 - \\overline{x})^2 + \\cdots + m_k(x_k - \\overline{x})^2\\right]',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Công thức tính nhanh',
          text: 'Khai triển các bình phương, ta có cách tính tương đương $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + m_2x_2^2 + \\cdots + m_kx_k^2\\right) - \\overline{x}^2$, thuận tiện khi $\\overline{x}$ không phải là số đẹp.',
        },
        {
          type: 'p',
          text: 'Độ lệch chuẩn có cùng đơn vị với số liệu (phút, cm, $\\%$, …), còn phương sai có đơn vị là bình phương đơn vị đó. Vì vậy khi nêu ý nghĩa thực tế, ta thường dùng độ lệch chuẩn.',
        },
      ],
    },
    {
      heading: 'Ý nghĩa và ứng dụng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ý nghĩa',
          text: 'Phương sai và độ lệch chuẩn của mẫu ghép nhóm là giá trị xấp xỉ của phương sai và độ lệch chuẩn của mẫu số liệu gốc. Chúng đo mức độ phân tán của mẫu số liệu quanh số trung bình: phương sai, độ lệch chuẩn càng lớn thì mẫu số liệu càng phân tán.',
        },
        {
          type: 'p',
          text: 'Khi hai mẫu cùng đơn vị và có số trung bình gần nhau, mẫu có độ lệch chuẩn nhỏ hơn thì các giá trị tập trung quanh số trung bình hơn, tức là "ổn định" hơn: kết quả đo của một thiết bị, điểm số của một học sinh, năng suất của một giống lúa, …',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo mức độ rủi ro',
          text: 'Trong đầu tư, độ lệch chuẩn của lợi nhuận được dùng để đo mức độ rủi ro: lĩnh vực có độ lệch chuẩn lợi nhuận lớn hơn thì lợi nhuận dao động mạnh hơn, khó đoán hơn, nên đầu tư vào đó rủi ro hơn.',
        },
        {
          type: 'table',
          head: ['Số đo', 'Dùng giá trị nào', 'Nhạy với giá trị bất thường'],
          rows: [
            ['Khoảng biến thiên $R$', 'Hai đầu mút của bảng', 'Rất nhạy'],
            ['Khoảng tứ phân vị $\\Delta_Q$', 'Nửa giữa của mẫu', 'Ít bị ảnh hưởng'],
            [
              'Phương sai $s^2$, độ lệch chuẩn $s$',
              'Mọi nhóm, qua độ lệch so với $\\overline{x}$',
              'Khá nhạy',
            ],
          ],
          caption: 'So sánh các số đo độ phân tán của mẫu số liệu ghép nhóm',
        },
      ],
    },
  ],
  explore: {
    title: 'Độ lệch chuẩn và rủi ro đầu tư',
    instruction:
      'Hai biểu đồ là lợi nhuận một năm của các khoản đầu tư vào hai lĩnh vực, cùng số trung bình. Dải đỏ đi từ $\\overline{x} - s$ đến $\\overline{x} + s$. Chọn lĩnh vực cần sửa, bấm − và + để dồn tần số về giữa hoặc đẩy ra hai đầu, rồi quan sát độ lệch chuẩn và kết luận về mức độ rủi ro thay đổi.',
  },
  examples: [
    {
      problem:
        'Chiều cao (cm) của $40$ học sinh lớp 12A: $[150; 155)$: $3$; $[155; 160)$: $7$; $[160; 165)$: $12$; $[165; 170)$: $10$; $[170; 175)$: $5$; $[175; 180)$: $3$. Tính phương sai và độ lệch chuẩn của mẫu số liệu ghép nhóm này.',
      steps: [
        'Giá trị đại diện: $152{,}5$; $157{,}5$; $162{,}5$; $167{,}5$; $172{,}5$; $177{,}5$.',
        '$\\overline{x} = \\dfrac{3 \\cdot 152{,}5 + 7 \\cdot 157{,}5 + 12 \\cdot 162{,}5 + 10 \\cdot 167{,}5 + 5 \\cdot 172{,}5 + 3 \\cdot 177{,}5}{40} = \\dfrac{6\\,580}{40} = 164{,}5$.',
        'Độ lệch $x_i - \\overline{x}$: $-12$; $-7$; $-2$; $3$; $8$; $13$.',
        '$s^2 = \\dfrac{3 \\cdot 144 + 7 \\cdot 49 + 12 \\cdot 4 + 10 \\cdot 9 + 5 \\cdot 64 + 3 \\cdot 169}{40} = \\dfrac{1\\,740}{40} = 43{,}5$.',
        '$s = \\sqrt{43{,}5} \\approx 6{,}6$.',
      ],
      answer: 'Phương sai $s^2 = 43{,}5$, độ lệch chuẩn $s \\approx 6{,}6$ cm.',
    },
    {
      problem:
        'Lợi nhuận một năm (%) của $20$ khoản đầu tư vào mỗi lĩnh vực được ghép nhóm như sau. Lĩnh vực A: $[-2; 0)$: $3$; $[0; 2)$: $4$; $[2; 4)$: $6$; $[4; 6)$: $4$; $[6; 8)$: $3$. Lĩnh vực B: $[-2; 0)$: $1$; $[0; 2)$: $3$; $[2; 4)$: $12$; $[4; 6)$: $3$; $[6; 8)$: $1$. Đầu tư vào lĩnh vực nào rủi ro hơn?',
      steps: [
        'Giá trị đại diện: $-1$; $1$; $3$; $5$; $7$.',
        'Lĩnh vực A: $\\overline{x}_A = \\dfrac{3 \\cdot (-1) + 4 \\cdot 1 + 6 \\cdot 3 + 4 \\cdot 5 + 3 \\cdot 7}{20} = \\dfrac{60}{20} = 3$. Độ lệch: $-4$; $-2$; $0$; $2$; $4$. $s_A^2 = \\dfrac{3 \\cdot 16 + 4 \\cdot 4 + 0 + 4 \\cdot 4 + 3 \\cdot 16}{20} = \\dfrac{128}{20} = 6{,}4$, $s_A = \\sqrt{6{,}4} \\approx 2{,}53$.',
        'Lĩnh vực B: $\\overline{x}_B = \\dfrac{1 \\cdot (-1) + 3 \\cdot 1 + 12 \\cdot 3 + 3 \\cdot 5 + 1 \\cdot 7}{20} = \\dfrac{60}{20} = 3$. $s_B^2 = \\dfrac{1 \\cdot 16 + 3 \\cdot 4 + 0 + 3 \\cdot 4 + 1 \\cdot 16}{20} = \\dfrac{56}{20} = 2{,}8$, $s_B = \\sqrt{2{,}8} \\approx 1{,}67$.',
        'Hai lĩnh vực có cùng lợi nhuận trung bình $3\\%$, nhưng $s_A > s_B$.',
      ],
      answer: 'Đầu tư vào lĩnh vực A rủi ro hơn vì độ lệch chuẩn lợi nhuận của A lớn hơn.',
    },
    {
      problem:
        'Thời gian dùng mạng xã hội (phút/ngày) của $30$ học sinh: $[0; 10)$: $2$; $[10; 20)$: $6$; $[20; 30)$: $10$; $[30; 40)$: $9$; $[40; 50)$: $3$. Tính độ lệch chuẩn bằng công thức tính nhanh.',
      steps: [
        'Giá trị đại diện: $5$; $15$; $25$; $35$; $45$.',
        '$\\overline{x} = \\dfrac{2 \\cdot 5 + 6 \\cdot 15 + 10 \\cdot 25 + 9 \\cdot 35 + 3 \\cdot 45}{30} = \\dfrac{800}{30} = \\dfrac{80}{3}$.',
        '$m_1x_1^2 + \\cdots + m_5x_5^2 = 2 \\cdot 25 + 6 \\cdot 225 + 10 \\cdot 625 + 9 \\cdot 1\\,225 + 3 \\cdot 2\\,025 = 24\\,750$.',
        '$s^2 = \\dfrac{24\\,750}{30} - \\left(\\dfrac{80}{3}\\right)^2 = 825 - \\dfrac{6\\,400}{9} = \\dfrac{1\\,025}{9} \\approx 113{,}89$.',
        '$s = \\sqrt{\\dfrac{1\\,025}{9}} \\approx 10{,}67$.',
      ],
      answer: 'Độ lệch chuẩn $s \\approx 10{,}67$ phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Thời gian tự học trong tuần (giờ) của $40$ học sinh lớp 12A: $[5; 7)$: $4$; $[7; 9)$: $6$; $[9; 11)$: $10$; $[11; 13)$: $12$; $[13; 15)$: $8$. Tính số trung bình $\\overline{x}$.',
      answer: 10.7,
      tolerance: 0.001,
      unit: 'giờ',
      hints: [
        'Giá trị đại diện của nhóm $[5; 7)$ là $6$.',
        'Tính $\\dfrac{4 \\cdot 6 + 6 \\cdot 8 + 10 \\cdot 10 + 12 \\cdot 12 + 8 \\cdot 14}{40}$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{24 + 48 + 100 + 144 + 112}{40} = \\dfrac{428}{40} = 10{,}7$ (giờ).',
    },
    {
      type: 'number',
      prompt: 'Với bảng thời gian tự học của lớp 12A ở câu trên, tính phương sai $s^2$.',
      answer: 6.11,
      tolerance: 0.001,
      hints: [
        'Độ lệch $x_i - \\overline{x}$ là $-4{,}7$; $-2{,}7$; $-0{,}7$; $1{,}3$; $3{,}3$.',
        'Tính $\\dfrac{4 \\cdot 4{,}7^2 + 6 \\cdot 2{,}7^2 + 10 \\cdot 0{,}7^2 + 12 \\cdot 1{,}3^2 + 8 \\cdot 3{,}3^2}{40}$.',
      ],
      solution:
        '$s^2 = \\dfrac{4 \\cdot 22{,}09 + 6 \\cdot 7{,}29 + 10 \\cdot 0{,}49 + 12 \\cdot 1{,}69 + 8 \\cdot 10{,}89}{40} = \\dfrac{88{,}36 + 43{,}74 + 4{,}9 + 20{,}28 + 87{,}12}{40} = \\dfrac{244{,}4}{40} = 6{,}11$.',
    },
    {
      type: 'number',
      prompt: 'Vẫn với bảng của lớp 12A, tính độ lệch chuẩn $s$ (làm tròn đến hàng phần trăm).',
      answer: 2.47,
      tolerance: 0.006,
      unit: 'giờ',
      hints: ['Độ lệch chuẩn là căn bậc hai số học của phương sai $s^2 = 6{,}11$.'],
      solution: '$s = \\sqrt{6{,}11} \\approx 2{,}47$ (giờ).',
    },
    {
      type: 'number',
      prompt:
        'Thời gian tự học trong tuần (giờ) của $40$ học sinh lớp 12B: $[5; 7)$: $8$; $[7; 9)$: $12$; $[9; 11)$: $6$; $[11; 13)$: $8$; $[13; 15)$: $6$. Tính phương sai $s^2$.',
      answer: 7.44,
      tolerance: 0.001,
      hints: [
        'Tính trước $\\overline{x} = \\dfrac{8 \\cdot 6 + 12 \\cdot 8 + 6 \\cdot 10 + 8 \\cdot 12 + 6 \\cdot 14}{40}$.',
        'Có thể dùng $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_5x_5^2\\right) - \\overline{x}^2$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{384}{40} = 9{,}6$. $m_1x_1^2 + \\cdots + m_5x_5^2 = 8 \\cdot 36 + 12 \\cdot 64 + 6 \\cdot 100 + 8 \\cdot 144 + 6 \\cdot 196 = 3\\,984$. $s^2 = \\dfrac{3\\,984}{40} - 9{,}6^2 = 99{,}6 - 92{,}16 = 7{,}44$.',
    },
    {
      type: 'choice',
      prompt:
        'Theo hai câu trên, lớp 12A có $s \\approx 2{,}47$ giờ và lớp 12B có $s \\approx 2{,}73$ giờ. Thời gian tự học của lớp nào đồng đều hơn?',
      options: [
        'Lớp 12A',
        'Lớp 12B',
        'Hai lớp như nhau',
        'Không so sánh được vì số trung bình khác nhau',
      ],
      answer: 0,
      hints: ['Độ lệch chuẩn càng nhỏ thì số liệu càng tập trung quanh số trung bình.'],
      solution:
        'Hai mẫu cùng đơn vị, số trung bình gần nhau ($10{,}7$ và $9{,}6$ giờ) và $2{,}47 < 2{,}73$, nên thời gian tự học của lớp 12A ít phân tán hơn, tức là đồng đều hơn.',
    },
    {
      type: 'number',
      prompt: 'Một mẫu số liệu ghép nhóm có phương sai $s^2 = 2{,}25$. Tính độ lệch chuẩn $s$.',
      answer: 1.5,
      hints: ['Độ lệch chuẩn là căn bậc hai số học của phương sai.'],
      solution: '$s = \\sqrt{2{,}25} = 1{,}5$.',
    },
    {
      type: 'choice',
      prompt:
        'Công suất của một chiếc quạt được đo $20$ lần bằng mỗi thiết bị. Kết quả: thiết bị 1 có $\\overline{x} = 74{,}8$, $s_1 \\approx 1{,}05$; thiết bị 2 có $\\overline{y} = 74{,}45$, $s_2 \\approx 1{,}2$. Thiết bị nào cho kết quả đo ổn định hơn?',
      options: [
        'Thiết bị 1',
        'Thiết bị 2',
        'Thiết bị 1, vì số trung bình lớn hơn',
        'Hai thiết bị như nhau',
      ],
      answer: 0,
      hints: [
        'Độ ổn định được đánh giá qua độ phân tán quanh số trung bình, không qua số trung bình.',
      ],
      solution:
        '$s_1 < s_2$ nên các kết quả đo của thiết bị 1 ít phân tán hơn quanh số trung bình: thiết bị 1 ổn định hơn. Số trung bình lớn hơn không nói gì về độ ổn định.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về mẫu số liệu ghép nhóm.',
      options: [
        'Phương sai của mẫu ghép nhóm là giá trị xấp xỉ của phương sai của mẫu số liệu gốc.',
        'Độ lệch chuẩn có cùng đơn vị đo với số liệu.',
        'Độ lệch chuẩn càng lớn thì mẫu số liệu càng tập trung quanh số trung bình.',
        'Khi tính phương sai, mỗi nhóm được thay bằng đầu mút trái của nhóm.',
      ],
      answers: [0, 1],
      hints: [
        'Mỗi nhóm được đại diện bởi điểm giữa của nhóm.',
        'Phương sai có đơn vị là bình phương đơn vị của số liệu; lấy căn bậc hai thì về lại đơn vị đó.',
      ],
      solution:
        'Hai khẳng định đầu đúng. Độ lệch chuẩn càng lớn thì mẫu càng phân tán, không phải tập trung. Mỗi nhóm được thay bằng giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$, không phải đầu mút trái.',
    },
  ],
  takeaways: [
    'Phương sai: $s^2 = \\dfrac{1}{n}\\sum_{i=1}^{k} m_i(x_i - \\overline{x})^2$, với $x_i$ là giá trị đại diện của nhóm.',
    'Tính nhanh: $s^2 = \\dfrac{1}{n}\\left(m_1x_1^2 + \\cdots + m_kx_k^2\\right) - \\overline{x}^2$; độ lệch chuẩn $s = \\sqrt{s^2}$.',
    'Phương sai và độ lệch chuẩn đo độ phân tán quanh số trung bình: càng lớn thì mẫu càng phân tán.',
    'Độ lệch chuẩn của lợi nhuận đo mức độ rủi ro: lớn hơn thì rủi ro hơn; độ lệch chuẩn nhỏ hơn nghĩa là ổn định hơn.',
  ],
};
