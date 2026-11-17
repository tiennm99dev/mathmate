/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương III: mẫu số liệu ghép nhóm, số trung bình, trung vị, tứ phân vị và mốt; tự tính trên số liệu thực, so sánh với mẫu gốc và luyện tập với bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương III cho cách thu gọn một mẫu số liệu lớn thành bảng tần số ghép nhóm và cách ước lượng các số đặc trưng đo xu thế trung tâm từ bảng đó. Bài ôn tập này hệ thống lại các công thức, cho em tự tính trên số liệu chiều cao và điểm thi thật rồi so với kết quả tính trên mẫu gốc, và một bộ đề tự sinh chỉ ra phần nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá cách ghép nhóm và các công thức tính số trung bình, trung vị, tứ phân vị, mốt của mẫu số liệu ghép nhóm.',
    'Tính thành thạo các số đặc trưng từ bảng tần số ghép nhóm.',
    'Giải thích ý nghĩa của các số đặc trưng và hiểu vì sao chúng chỉ là giá trị xấp xỉ.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Số đặc trưng', 'Nhóm cần xác định', 'Công thức'],
          rows: [
            [
              'Số trung bình $\\overline{x}$',
              'Mọi nhóm, giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$',
              '$\\overline{x} = \\dfrac{m_1x_1 + \\cdots + m_kx_k}{n}$',
            ],
            [
              'Trung vị $M_e = Q_2$',
              'Nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{n}{2}$',
              '$M_e = a_p + \\dfrac{\\frac{n}{2} - C}{m_p}(a_{p+1} - a_p)$',
            ],
            [
              'Tứ phân vị $Q_1$',
              'Nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{n}{4}$',
              '$Q_1 = a_p + \\dfrac{\\frac{n}{4} - C}{m_p}(a_{p+1} - a_p)$',
            ],
            [
              'Tứ phân vị $Q_3$',
              'Nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{3n}{4}$',
              '$Q_3 = a_q + \\dfrac{\\frac{3n}{4} - C}{m_q}(a_{q+1} - a_q)$',
            ],
            [
              'Mốt $M_o$',
              'Nhóm có tần số lớn nhất $[a_j; a_{j+1})$',
              '$M_o = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$',
            ],
          ],
          caption: '$C$ là tổng tần số các nhóm đứng trước nhóm đang xét, $h$ là độ dài nhóm.',
        },
        {
          type: 'list',
          items: [
            'Mẫu số liệu ghép nhóm cho dưới dạng bảng tần số ghép nhóm; nhóm $[a; b)$ chứa $a$ nhưng không chứa $b$, độ dài nhóm là $b - a$, cỡ mẫu là tổng các tần số.',
            'Ghép nhóm: chia miền giá trị thành các nhóm (thường cùng độ dài), đếm tần số từng nhóm rồi lập bảng; nhóm cuối có thể lấy cả đầu mút phải.',
            'Mọi số đặc trưng tính từ mẫu ghép nhóm chỉ xấp xỉ các số tương ứng của mẫu gốc.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Dùng đầu mút thay cho giá trị đại diện khi tính số trung bình; chọn nhóm chứa trung vị là nhóm có tần số lớn nhất thay vì xét tần số tích luỹ; quên trừ $C$, tổng tần số các nhóm đứng trước; lấy mốt là điểm giữa nhóm có tần số lớn nhất; quên lấy $m_{j-1} = 0$ hay $m_{j+1} = 0$ khi nhóm chứa mốt ở đầu hoặc cuối bảng.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự luyện',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có $12$ câu sinh ngẫu nhiên, ba câu cho mỗi số đặc trưng. Trả lời sai lần đầu em được gợi ý và thử lại; bản đồ kĩ năng tô màu theo lần trả lời đầu tiên và chỉ ra phần cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Tự tính rồi so với mẫu gốc',
    instruction:
      'Chọn bộ dữ liệu (chiều cao hoặc điểm thi của $40$ học sinh) và độ dài nhóm. Từ bảng tần số ghép nhóm, tự tính số trung bình, trung vị và mốt, nhập kết quả rồi bấm "Kiểm tra". Sau đó bấm "So sánh với mẫu gốc" để xem các số tính từ mẫu ghép nhóm lệch bao nhiêu so với các số tính trực tiếp từ $40$ số liệu ban đầu, và thử đổi độ dài nhóm.',
  },
  examples: [
    {
      problem:
        'Chiều cao (cm) của $40$ học sinh được ghép nhóm: $[150; 155)$: $1$; $[155; 160)$: $4$; $[160; 165)$: $9$; $[165; 170)$: $12$; $[170; 175)$: $8$; $[175; 180]$: $6$. Tính số trung bình, trung vị và mốt. Biết từ mẫu gốc tính được số trung bình $166{,}9$ cm, trung vị $167$ cm, mốt $168$ cm; hãy nhận xét.',
      steps: [
        'Giá trị đại diện: $152{,}5$; $157{,}5$; $162{,}5$; $167{,}5$; $172{,}5$; $177{,}5$. Ta có $\\overline{x} = \\dfrac{1 \\cdot 152{,}5 + 4 \\cdot 157{,}5 + 9 \\cdot 162{,}5 + 12 \\cdot 167{,}5 + 8 \\cdot 172{,}5 + 6 \\cdot 177{,}5}{40} = \\dfrac{6\\,700}{40} = 167{,}5$.',
        'Tần số tích luỹ: $1$; $5$; $14$; $26$; $34$; $40$. Với $\\dfrac{n}{2} = 20$, nhóm chứa trung vị là $[165; 170)$, $C = 14$, $m_p = 12$: $M_e = 165 + \\dfrac{20 - 14}{12} \\cdot 5 = 167{,}5$.',
        'Nhóm chứa mốt là $[165; 170)$ với $m_j = 12$, $m_{j-1} = 9$, $m_{j+1} = 8$: $M_o = 165 + \\dfrac{12 - 9}{(12 - 9) + (12 - 8)} \\cdot 5 = 165 + \\dfrac{15}{7} \\approx 167{,}14$.',
        'So với mẫu gốc, các số tính từ mẫu ghép nhóm lệch không quá $1$ cm: chúng là những giá trị xấp xỉ tốt, dù không bằng đúng.',
      ],
      answer:
        '$\\overline{x} = 167{,}5$ cm, $M_e = 167{,}5$ cm, $M_o \\approx 167{,}14$ cm; đều gần với các số $166{,}9$; $167$; $168$ của mẫu gốc.',
    },
    {
      problem: 'Với bảng chiều cao ở ví dụ trên, tính các tứ phân vị $Q_1$, $Q_3$ và nêu ý nghĩa.',
      steps: [
        '$\\dfrac{n}{4} = 10$: tần số tích luỹ đến hết nhóm $[155; 160)$ là $5 < 10$, đến hết nhóm $[160; 165)$ là $14 \\ge 10$. Vậy $Q_1 = 160 + \\dfrac{10 - 5}{9} \\cdot 5 = 160 + \\dfrac{25}{9} \\approx 162{,}78$.',
        '$\\dfrac{3n}{4} = 30$: tần số tích luỹ đến hết nhóm $[165; 170)$ là $26 < 30$, đến hết nhóm $[170; 175)$ là $34 \\ge 30$. Vậy $Q_3 = 170 + \\dfrac{30 - 26}{8} \\cdot 5 = 172{,}5$.',
      ],
      answer:
        '$Q_1 \\approx 162{,}78$ cm, $Q_3 = 172{,}5$ cm: khoảng một nửa số học sinh có chiều cao từ khoảng $162{,}78$ cm đến $172{,}5$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Quãng đường (km) đi được sau một lần sạc đầy của một số xe máy điện: $[50; 60)$: $6$; $[60; 70)$: $15$; $[70; 80)$: $21$; $[80; 90)$: $12$; $[90; 100)$: $6$. Cỡ mẫu là bao nhiêu?',
      answer: 60,
      hints: ['Cộng tất cả các tần số.'],
      solution: '$n = 6 + 15 + 21 + 12 + 6 = 60$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng quãng đường xe máy điện ở trên, giá trị đại diện của nhóm $[90; 100)$ là bao nhiêu?',
      answer: 95,
      unit: 'km',
      hints: ['Giá trị đại diện là điểm giữa của nhóm.'],
      solution: '$\\dfrac{90 + 100}{2} = 95$ (km).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng quãng đường xe máy điện ở trên, tính quãng đường trung bình $\\overline{x}$ (km).',
      answer: 74.5,
      tolerance: 0.005,
      unit: 'km',
      hints: [
        'Các giá trị đại diện là $55$; $65$; $75$; $85$; $95$.',
        'Tính $\\dfrac{6 \\cdot 55 + 15 \\cdot 65 + 21 \\cdot 75 + 12 \\cdot 85 + 6 \\cdot 95}{60}$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{330 + 975 + 1\\,575 + 1\\,020 + 570}{60} = \\dfrac{4\\,470}{60} = 74{,}5$ (km).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng quãng đường xe máy điện ở trên, tính trung vị $M_e$ (km, làm tròn đến hàng phần trăm).',
      answer: 74.29,
      tolerance: 0.006,
      unit: 'km',
      hints: [
        'Tần số tích luỹ: $6$; $21$; $42$; $54$; $60$. Tìm nhóm đầu tiên có tần số tích luỹ $\\ge 30$.',
        'Nhóm $[70; 80)$ với $C = 21$, $m_p = 21$.',
      ],
      solution:
        '$M_e = 70 + \\dfrac{30 - 21}{21} \\cdot 10 = 70 + \\dfrac{30}{7} \\approx 74{,}29$ (km).',
    },
    {
      type: 'choice',
      prompt: 'Với bảng quãng đường xe máy điện ở trên, nhóm nào chứa tứ phân vị thứ ba $Q_3$?',
      options: ['$[80; 90)$', '$[70; 80)$', '$[90; 100)$', '$[60; 70)$'],
      answer: 0,
      hints: ['$\\dfrac{3n}{4} = 45$; xem tần số tích luỹ $6$; $21$; $42$; $54$; $60$.'],
      solution:
        'Tần số tích luỹ đến hết nhóm $[70; 80)$ là $42 < 45$, đến hết nhóm $[80; 90)$ là $54 \\ge 45$, nên $Q_3$ thuộc nhóm $[80; 90)$.',
    },
    {
      type: 'number',
      prompt: 'Với bảng quãng đường xe máy điện ở trên, tính tứ phân vị thứ nhất $Q_1$ (km).',
      answer: 66,
      tolerance: 0.005,
      unit: 'km',
      hints: ['$\\dfrac{n}{4} = 15$; nhóm chứa $Q_1$ là $[60; 70)$ với $C = 6$, $m_p = 15$.'],
      solution: '$Q_1 = 60 + \\dfrac{15 - 6}{15} \\cdot 10 = 60 + 6 = 66$ (km).',
    },
    {
      type: 'number',
      prompt: 'Với bảng quãng đường xe máy điện ở trên, tính tứ phân vị thứ ba $Q_3$ (km).',
      answer: 82.5,
      tolerance: 0.005,
      unit: 'km',
      hints: ['Nhóm chứa $Q_3$ là $[80; 90)$ với $C = 42$, $m_q = 12$.'],
      solution: '$Q_3 = 80 + \\dfrac{45 - 42}{12} \\cdot 10 = 80 + 2{,}5 = 82{,}5$ (km).',
    },
    {
      type: 'number',
      prompt: 'Với bảng quãng đường xe máy điện ở trên, tính mốt $M_o$ (km).',
      answer: 74,
      tolerance: 0.005,
      unit: 'km',
      hints: [
        'Nhóm chứa mốt là $[70; 80)$ với $m_j = 21$.',
        '$m_{j-1} = 15$, $m_{j+1} = 12$, $h = 10$.',
      ],
      solution:
        '$M_o = 70 + \\dfrac{21 - 15}{(21 - 15) + (21 - 12)} \\cdot 10 = 70 + \\dfrac{6}{15} \\cdot 10 = 74$ (km).',
    },
    {
      type: 'choice',
      prompt:
        'Dựa vào các kết quả tính được với bảng quãng đường xe máy điện, khẳng định nào sau đây đúng?',
      options: [
        'Khoảng $25\\%$ số xe đi được dưới $66$ km sau một lần sạc.',
        'Khoảng $25\\%$ số xe đi được dưới $74$ km sau một lần sạc.',
        'Khoảng một nửa số xe đi được trên $82{,}5$ km sau một lần sạc.',
        'Quãng đường trung bình đúng bằng mốt.',
      ],
      answer: 0,
      hints: ['$Q_1 = 66$ chia mẫu thành phần $25\\%$ nhỏ nhất và $75\\%$ còn lại.'],
      solution:
        '$Q_1 = 66$ nên khoảng $25\\%$ số xe đi được dưới $66$ km. Trên $Q_3 = 82{,}5$ km chỉ có khoảng $25\\%$ số xe, không phải một nửa; số trung bình $74{,}5$ khác mốt $74$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm kiểm tra của $25$ học sinh được ghép nhóm: $[4; 6)$: $3$; $[6; 8)$: $8$; $[8; 10]$: $14$. Tính mốt $M_o$.',
      answer: 8.6,
      tolerance: 0.005,
      hints: ['Nhóm chứa mốt $[8; 10]$ là nhóm cuối cùng, nên lấy $m_{j+1} = 0$.'],
      solution:
        '$M_o = 8 + \\dfrac{14 - 8}{(14 - 8) + (14 - 0)} \\cdot 2 = 8 + \\dfrac{6}{20} \\cdot 2 = 8{,}6$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng điểm của $25$ học sinh ở câu trên, tính trung vị $M_e$ (làm tròn đến hàng phần trăm).',
      answer: 8.21,
      tolerance: 0.006,
      hints: [
        '$\\dfrac{n}{2} = 12{,}5$; tần số tích luỹ là $3$; $11$; $25$.',
        'Nhóm chứa trung vị là $[8; 10]$ với $C = 11$, $m_p = 14$.',
      ],
      solution:
        '$M_e = 8 + \\dfrac{12{,}5 - 11}{14} \\cdot 2 = 8 + \\dfrac{3}{14} \\approx 8{,}21$.',
    },
  ],
  takeaways: [
    'Từ bảng tần số ghép nhóm, xác định đúng nhóm cần dùng: mọi nhóm cho số trung bình, nhóm theo tần số tích luỹ cho trung vị và tứ phân vị, nhóm có tần số lớn nhất cho mốt.',
    'Số trung bình dùng giá trị đại diện; trung vị, tứ phân vị và mốt dùng công thức nội suy trong nhóm.',
    'Các số đặc trưng của mẫu ghép nhóm chỉ xấp xỉ mẫu gốc; cách chia nhóm khác nhau cho kết quả hơi khác nhau.',
  ],
};
