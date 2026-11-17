/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: đo độ dài gang tay của các bạn trong lớp, ghép nhóm số liệu, vẽ biểu đồ tần số, tính số trung bình, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn, hệ số biến thiên và so sánh gang tay của nam và nữ.',
  intro:
    'Ngày xưa, người ta hay đo độ dài bằng gang tay. Nhưng gang tay mỗi người dài ngắn khác nhau: gang tay của bạn dài bao nhiêu, của các bạn nam có dài hơn của các bạn nữ không, và nhóm nào có độ dài gang tay đồng đều hơn? Trong hoạt động này, cả lớp tự thu thập số liệu và dùng các số đặc trưng của mẫu số liệu ghép nhóm để trả lời.',
  objectives: [
    'Thu thập số liệu về độ dài gang tay của các bạn trong lớp.',
    'Lập bảng tần số ghép nhóm và vẽ biểu đồ tần số cho số liệu của nam và của nữ.',
    'Tính số trung bình, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn và hệ số biến thiên của mẫu số liệu ghép nhóm.',
    'Dùng các số đặc trưng để so sánh và rút ra kết luận về hai nhóm.',
  ],
  sections: [
    {
      heading: 'Thu thập dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Độ dài gang tay là khoảng cách từ đầu ngón tay cái đến đầu ngón tay út khi xoè bàn tay hết cỡ. Để đo, đặt bàn tay xoè rộng lên mặt bàn, dùng thước đo khoảng cách giữa hai đầu ngón tay, ghi kết quả theo xăng-ti-mét, chính xác đến milimét (chẳng hạn $19{,}5$ cm).',
        },
        {
          type: 'list',
          items: [
            'Mỗi bạn được đo hai lần bởi hai bạn khác nhau; nếu hai lần chênh lệch nhiều thì đo lại.',
            'Thống nhất đo cùng một bàn tay (chẳng hạn tay phải) cho cả lớp.',
            'Ghi kết quả vào bảng gồm các cột: số thứ tự, họ và tên, giới tính (nam hoặc nữ), độ dài gang tay (cm).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số liệu mẫu',
          text: 'Phần tiếp theo dùng số liệu của một lớp có $25$ bạn nam và $20$ bạn nữ. Khi làm dự án, em thay bằng số liệu của lớp mình.',
        },
      ],
    },
    {
      heading: 'Tóm tắt dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Ghép số liệu thành các nhóm có độ dài $1$ cm: $[16; 17)$, $[17; 18)$, …, $[23; 24)$. Dùng chung một cách ghép nhóm cho nam và nữ để dễ so sánh. Giá trị đại diện của mỗi nhóm là trung điểm của nhóm.',
        },
        {
          type: 'table',
          head: ['Nhóm (cm)', 'Giá trị đại diện', 'Số bạn nam', 'Số bạn nữ'],
          rows: [
            ['$[16; 17)$', '$16{,}5$', '$0$', '$3$'],
            ['$[17; 18)$', '$17{,}5$', '$0$', '$2$'],
            ['$[18; 19)$', '$18{,}5$', '$1$', '$8$'],
            ['$[19; 20)$', '$19{,}5$', '$6$', '$4$'],
            ['$[20; 21)$', '$20{,}5$', '$8$', '$2$'],
            ['$[21; 22)$', '$21{,}5$', '$7$', '$1$'],
            ['$[22; 23)$', '$22{,}5$', '$2$', '$0$'],
            ['$[23; 24)$', '$23{,}5$', '$1$', '$0$'],
          ],
          caption: 'Bảng tần số ghép nhóm độ dài gang tay của lớp mẫu.',
        },
        {
          type: 'p',
          text: 'Từ bảng, vẽ biểu đồ tần số dạng cột cho từng nhóm nam, nữ: mỗi cột đứng trên một nhóm, chiều cao bằng tần số của nhóm, các cột liền nhau. Biểu đồ cho thấy gang tay của nam tập trung quanh $20$ đến $21$ cm, của nữ quanh $18$ đến $19$ cm.',
        },
      ],
    },
    {
      heading: 'Phân tích dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Với mẫu ghép nhóm gồm các nhóm có giá trị đại diện $x_1, x_2, \\ldots, x_k$ và tần số $m_1, m_2, \\ldots, m_k$, cỡ mẫu $n = m_1 + m_2 + \\cdots + m_k$:',
        },
        {
          type: 'list',
          items: [
            'Số trung bình: $\\overline{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}$.',
            'Khoảng biến thiên $R$: hiệu giữa đầu mút phải của nhóm cuối và đầu mút trái của nhóm đầu (chỉ xét các nhóm có số liệu).',
            'Tứ phân vị $Q_1$, $Q_3$: tìm nhóm chứa nó rồi tính $Q = a + \\dfrac{\\frac{kn}{4} - C}{m} \\cdot h$ như ở lớp 11; khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1$.',
            'Phương sai: $s^2 = \\dfrac{m_1(x_1 - \\overline{x})^2 + \\cdots + m_k(x_k - \\overline{x})^2}{n}$; độ lệch chuẩn $s = \\sqrt{s^2}$.',
            'Hệ số biến thiên: $CV = \\dfrac{s}{\\overline{x}}$, thường viết dưới dạng phần trăm. Hệ số biến thiên so độ lệch chuẩn với số trung bình, nên dùng để so sánh độ phân tán của hai mẫu có số trung bình khác nhau: mẫu nào có hệ số biến thiên lớn hơn thì phân tán hơn.',
          ],
        },
        {
          type: 'table',
          head: ['Số đặc trưng', 'Nam', 'Nữ'],
          rows: [
            ['Số trung bình $\\overline{x}$ (cm)', '$20{,}74$', '$18{,}65$'],
            ['Khoảng biến thiên $R$ (cm)', '$6$', '$6$'],
            ['$Q_1$ (cm)', '$19{,}875$', '$18$'],
            ['$Q_3$ (cm)', '$\\approx 21{,}54$', '$19{,}5$'],
            ['Khoảng tứ phân vị $\\Delta_Q$ (cm)', '$\\approx 1{,}66$', '$1{,}5$'],
            ['Phương sai $s^2$', '$1{,}3024$', '$1{,}7275$'],
            ['Độ lệch chuẩn $s$ (cm)', '$\\approx 1{,}14$', '$\\approx 1{,}31$'],
            [
              'Hệ số biến thiên $CV$',
              '$\\approx 0{,}055 = 5{,}5\\%$',
              '$\\approx 0{,}070 = 7{,}0\\%$',
            ],
          ],
          caption: 'Các số đặc trưng của lớp mẫu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết luận cho lớp mẫu',
          text: 'Trung bình, gang tay của nam dài hơn của nữ khoảng $2{,}09$ cm. Hệ số biến thiên (và cả độ lệch chuẩn) của nữ lớn hơn nên độ dài gang tay của các bạn nữ phân tán hơn, của các bạn nam đồng đều hơn. Khoảng tứ phân vị của nam lại lớn hơn một chút: khoảng tứ phân vị chỉ phản ánh nửa giữa của mẫu, còn độ lệch chuẩn tính đến mọi giá trị, kể cả các giá trị ở hai đầu.',
        },
      ],
    },
    {
      heading: 'Dự án: Gang tay của lớp em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thu thập độ dài gang tay của cả lớp, tóm tắt và phân tích số liệu để trả lời: gang tay của nam hay nữ dài hơn, nhóm nào có độ dài gang tay đồng đều hơn? Lớp chia thành các nhóm $4$ đến $6$ học sinh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thước kẻ có vạch chia milimét (hoặc thước dây), bảng ghi số liệu, máy tính cầm tay hoặc phần mềm bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo và ghi độ dài gang tay của mọi bạn trong lớp theo cách thống nhất ở phần Thu thập dữ liệu.',
            'Tách số liệu của nam và của nữ, chọn cách ghép nhóm chung (chẳng hạn độ dài nhóm $1$ cm), lập bảng tần số ghép nhóm và vẽ hai biểu đồ tần số.',
            'Tính số trung bình, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn và hệ số biến thiên cho từng nhóm (có thể nhập số liệu vào khung tương tác để kiểm tra).',
            'So sánh hai nhóm: độ dài trung bình, mức độ phân tán (dựa vào hệ số biến thiên); thử đổi độ dài nhóm và xem các số đặc trưng thay đổi thế nào.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu gốc, bảng tần số ghép nhóm, biểu đồ, bảng các số đặc trưng kèm cách tính, và kết luận trả lời hai câu hỏi trên. Nêu thêm một nhận xét: vì sao số trung bình tính từ mẫu ghép nhóm có thể khác số trung bình tính từ số liệu gốc?',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu mẫu số liệu gang tay',
    instruction:
      'Sửa trực tiếp danh sách số đo của nam và nữ, hoặc nhập từng số đo rồi bấm "Thêm". Khung tự ghép nhóm, vẽ biểu đồ tần số và tính các số đặc trưng. Đổi độ dài nhóm $h$ để xem các số đặc trưng thay đổi, rồi nhập số liệu của lớp em.',
  },
  examples: [
    {
      problem:
        'Tính số trung bình, phương sai và độ lệch chuẩn độ dài gang tay của các bạn nam ở lớp mẫu.',
      steps: [
        'Các nhóm có số liệu: giá trị đại diện $18{,}5$; $19{,}5$; $20{,}5$; $21{,}5$; $22{,}5$; $23{,}5$ với tần số $1$; $6$; $8$; $7$; $2$; $1$, cỡ mẫu $n = 25$.',
        '$\\overline{x} = \\dfrac{1 \\cdot 18{,}5 + 6 \\cdot 19{,}5 + 8 \\cdot 20{,}5 + 7 \\cdot 21{,}5 + 2 \\cdot 22{,}5 + 1 \\cdot 23{,}5}{25} = \\dfrac{518{,}5}{25} = 20{,}74$ (cm).',
        '$s^2 = \\dfrac{1 \\cdot (-2{,}24)^2 + 6 \\cdot (-1{,}24)^2 + 8 \\cdot (-0{,}24)^2 + 7 \\cdot 0{,}76^2 + 2 \\cdot 1{,}76^2 + 1 \\cdot 2{,}76^2}{25} = \\dfrac{32{,}56}{25} = 1{,}3024$.',
        '$s = \\sqrt{1{,}3024} \\approx 1{,}14$ (cm).',
      ],
      answer: '$\\overline{x} = 20{,}74$ cm, $s^2 = 1{,}3024$, $s \\approx 1{,}14$ cm.',
    },
    {
      problem: 'Tính khoảng tứ phân vị độ dài gang tay của các bạn nữ ở lớp mẫu.',
      steps: [
        'Cỡ mẫu $n = 20$; tần số tích luỹ của các nhóm $[16; 17)$, $[17; 18)$, $[18; 19)$, $[19; 20)$ là $3$; $5$; $13$; $17$.',
        '$\\dfrac{n}{4} = 5$: nhóm đầu tiên có tần số tích luỹ đạt $5$ là $[17; 18)$, nên $Q_1 = 17 + \\dfrac{5 - 3}{2} \\cdot 1 = 18$.',
        '$\\dfrac{3n}{4} = 15$: nhóm đầu tiên có tần số tích luỹ đạt $15$ là $[19; 20)$, nên $Q_3 = 19 + \\dfrac{15 - 13}{4} \\cdot 1 = 19{,}5$.',
        '$\\Delta_Q = Q_3 - Q_1 = 19{,}5 - 18 = 1{,}5$.',
      ],
      answer: 'Khoảng tứ phân vị độ dài gang tay của các bạn nữ là $1{,}5$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một bạn có gang tay dài $19{,}0$ cm. Số đo này thuộc nhóm nào?',
      options: ['$[19; 20)$', '$[18; 19)$', '$[18; 20)$', 'Cả $[18; 19)$ và $[19; 20)$'],
      answer: 0,
      hints: ['Nhóm $[a; b)$ chứa đầu mút trái $a$ nhưng không chứa đầu mút phải $b$.'],
      solution:
        '$19 \\in [19; 20)$ và $19 \\notin [18; 19)$, nên số đo $19{,}0$ cm thuộc nhóm $[19; 20)$.',
    },
    {
      type: 'number',
      prompt: 'Tính số trung bình độ dài gang tay của các bạn nữ ở lớp mẫu (theo cm).',
      answer: 18.65,
      unit: 'cm',
      hints: [
        'Dùng giá trị đại diện $16{,}5$; $17{,}5$; $18{,}5$; $19{,}5$; $20{,}5$; $21{,}5$ với tần số $3$; $2$; $8$; $4$; $2$; $1$.',
        'Cỡ mẫu là $20$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{3 \\cdot 16{,}5 + 2 \\cdot 17{,}5 + 8 \\cdot 18{,}5 + 4 \\cdot 19{,}5 + 2 \\cdot 20{,}5 + 1 \\cdot 21{,}5}{20} = \\dfrac{373}{20} = 18{,}65$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính phương sai độ dài gang tay của các bạn nữ ở lớp mẫu (làm tròn đến hàng phần trăm).',
      answer: 1.73,
      tolerance: 0.005,
      hints: [
        'Số trung bình là $18{,}65$; tính các độ lệch $x_i - 18{,}65$.',
        'Lấy tổng các $m_i(x_i - \\overline{x})^2$ rồi chia cho $n = 20$.',
      ],
      solution:
        '$s^2 = \\dfrac{3 \\cdot (-2{,}15)^2 + 2 \\cdot (-1{,}15)^2 + 8 \\cdot (-0{,}15)^2 + 4 \\cdot 0{,}85^2 + 2 \\cdot 1{,}85^2 + 1 \\cdot 2{,}85^2}{20} = \\dfrac{34{,}55}{20} = 1{,}7275 \\approx 1{,}73$.',
    },
    {
      type: 'number',
      prompt:
        'Phương sai độ dài gang tay của các bạn nam ở lớp mẫu là $1{,}3024$. Tính độ lệch chuẩn (theo cm, làm tròn đến hàng phần trăm).',
      answer: 1.14,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Độ lệch chuẩn là căn bậc hai của phương sai.'],
      solution: '$s = \\sqrt{1{,}3024} \\approx 1{,}14$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Ở lớp mẫu, độ lệch chuẩn của nam khoảng $1{,}14$ cm, của nữ khoảng $1{,}31$ cm. Kết luận nào đúng?',
      options: [
        'Độ dài gang tay của các bạn nữ phân tán hơn',
        'Độ dài gang tay của các bạn nam phân tán hơn',
        'Gang tay của các bạn nữ dài hơn',
        'Hai nhóm có mức độ phân tán như nhau',
      ],
      answer: 0,
      hints: ['Độ lệch chuẩn càng lớn thì số liệu càng phân tán.'],
      solution:
        'Độ lệch chuẩn của nữ lớn hơn, nên độ dài gang tay của các bạn nữ phân tán hơn (kém đồng đều hơn). Độ lệch chuẩn không cho biết nhóm nào có gang tay dài hơn: điều đó do số trung bình cho biết.',
    },
    {
      type: 'number',
      prompt:
        'Ở lớp mẫu, gang tay của nữ có số trung bình $18{,}65$ cm và độ lệch chuẩn khoảng $1{,}314$ cm. Tính hệ số biến thiên (theo %, làm tròn đến hàng phần mười).',
      answer: 7,
      tolerance: 0.05,
      unit: '%',
      hints: [
        'Hệ số biến thiên là $CV = \\dfrac{s}{\\overline{x}}$.',
        'Nhân thương với $100\\%$ để viết dưới dạng phần trăm.',
      ],
      solution:
        '$CV = \\dfrac{s}{\\overline{x}} \\approx \\dfrac{1{,}314}{18{,}65} \\approx 0{,}0705 \\approx 7{,}0\\%$.',
    },
    {
      type: 'number',
      prompt: 'Tìm tứ phân vị thứ nhất $Q_1$ độ dài gang tay của các bạn nữ ở lớp mẫu (theo cm).',
      answer: 18,
      unit: 'cm',
      hints: [
        'Tính $\\dfrac{n}{4}$ với $n = 20$ rồi tìm nhóm đầu tiên có tần số tích luỹ đạt giá trị đó.',
        'Tần số tích luỹ của hai nhóm đầu là $3$ và $5$.',
      ],
      solution:
        '$\\dfrac{n}{4} = 5$, nhóm chứa $Q_1$ là $[17; 18)$ với $C = 3$, $m = 2$: $Q_1 = 17 + \\dfrac{5 - 3}{2} \\cdot 1 = 18$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính khoảng tứ phân vị độ dài gang tay của các bạn nam ở lớp mẫu (theo cm, làm tròn đến hàng phần trăm).',
      answer: 1.66,
      tolerance: 0.005,
      unit: 'cm',
      hints: [
        'Với $n = 25$: $\\dfrac{n}{4} = 6{,}25$ và $\\dfrac{3n}{4} = 18{,}75$.',
        'Tần số tích luỹ của các nhóm $[18; 19)$, $[19; 20)$, $[20; 21)$, $[21; 22)$ là $1$; $7$; $15$; $22$.',
      ],
      solution:
        '$Q_1 = 19 + \\dfrac{6{,}25 - 1}{6} \\cdot 1 = 19{,}875$; $Q_3 = 21 + \\dfrac{18{,}75 - 15}{7} \\cdot 1 \\approx 21{,}536$. $\\Delta_Q = Q_3 - Q_1 \\approx 1{,}66$ cm.',
    },
    {
      type: 'number',
      prompt: 'Tìm khoảng biến thiên độ dài gang tay của các bạn nam ở lớp mẫu (theo cm).',
      answer: 6,
      unit: 'cm',
      hints: ['Nhóm đầu tiên có bạn nam là $[18; 19)$, nhóm cuối cùng là $[23; 24)$.'],
      solution: '$R = 24 - 18 = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Ở một lớp khác, $24$ bạn nam có độ dài gang tay được ghép nhóm như sau: $[18; 19)$: $1$ bạn, $[19; 20)$: $4$ bạn, $[20; 21)$: $8$ bạn, $[21; 22)$: $6$ bạn, $[22; 23)$: $3$ bạn, $[23; 24)$: $2$ bạn. Tính số trung bình (theo cm).',
      answer: 21,
      unit: 'cm',
      hints: ['Nhân mỗi giá trị đại diện với tần số của nhóm, cộng lại rồi chia cho $24$.'],
      solution:
        '$\\overline{x} = \\dfrac{18{,}5 + 4 \\cdot 19{,}5 + 8 \\cdot 20{,}5 + 6 \\cdot 21{,}5 + 3 \\cdot 22{,}5 + 2 \\cdot 23{,}5}{24} = \\dfrac{504}{24} = 21$ cm.',
    },
  ],
  takeaways: [
    'Đo gang tay từ đầu ngón cái đến đầu ngón út khi xoè hết cỡ, thống nhất cách đo cho cả lớp.',
    'Ghép nhóm chung cho hai nhóm cần so sánh; giá trị đại diện của nhóm là trung điểm của nhóm.',
    'Số trung bình cho biết nhóm nào có gang tay dài hơn; hệ số biến thiên $CV = \\dfrac{s}{\\overline{x}}$ (cùng độ lệch chuẩn, khoảng tứ phân vị) cho biết nhóm nào phân tán hơn.',
  ],
};
