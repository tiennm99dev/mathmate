/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: làm thí nghiệm nhỏ giọt nước lên đồng xu để quan sát lực căng mặt ngoài, thu thập số liệu của cả lớp, lập mẫu số liệu ghép nhóm và tính số trung bình, trung vị, tứ phân vị, mốt.',
  intro:
    'Nhỏ từng giọt nước lên mặt một đồng xu, nước không tràn ngay mà phồng lên thành một cái vòm. Đó là nhờ lực căng mặt ngoài của nước. Một đồng xu giữ được bao nhiêu giọt? Mỗi lần đo cho một kết quả khác nhau, nên ta thu thập số liệu của cả lớp và dùng các số đặc trưng của mẫu số liệu ghép nhóm để trả lời.',
  objectives: [
    'Thực hiện thí nghiệm đo đạc, ghi lại số liệu một cách trung thực.',
    'Lập bảng tần số ghép nhóm từ số liệu thu thập được.',
    'Tính số trung bình, trung vị, tứ phân vị và mốt của mẫu số liệu ghép nhóm.',
    'Dùng các số đặc trưng để so sánh hai mẫu số liệu và rút ra kết luận.',
  ],
  sections: [
    {
      heading: 'Lực căng mặt ngoài và thí nghiệm nhỏ giọt',
      blocks: [
        {
          type: 'p',
          text: 'Các phân tử nước hút lẫn nhau. Ở bề mặt, lực hút này làm mặt nước có xu hướng co lại như một tấm màng căng, gọi là lực căng mặt ngoài. Nhờ đó con nhện nước đi được trên mặt hồ, giọt nước đọng trên lá có dạng gần tròn, và nước nhỏ lên đồng xu phồng thành vòm cao hơn mép đồng xu trước khi tràn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Câu hỏi của hoạt động',
          text: 'Một đồng xu đặt nằm ngang giữ được bao nhiêu giọt nước trước khi nước tràn? Pha thêm xà phòng vào nước thì số giọt thay đổi thế nào?',
        },
        {
          type: 'p',
          text: 'Số giọt phụ thuộc vào kích thước giọt, độ cao khi nhỏ, độ sạch của đồng xu, …, nên mỗi lần đo cho một số khác nhau. Không thể trả lời bằng một lần đo; ta cần nhiều lần đo và các số đặc trưng của mẫu số liệu.',
        },
      ],
    },
    {
      heading: 'Lập mẫu số liệu ghép nhóm',
      blocks: [
        {
          type: 'p',
          text: 'Khi có nhiều số liệu và các giá trị trải rộng, ta ghép chúng thành các nhóm có cùng độ dài $h$: $[a_1; a_2), [a_2; a_3), \\ldots, [a_k; a_{k+1})$ với $a_1$ không lớn hơn giá trị nhỏ nhất và nhóm cuối chứa giá trị lớn nhất. Tần số $m_i$ của nhóm là số lần đo rơi vào nhóm đó.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tìm giá trị nhỏ nhất và lớn nhất của mẫu.',
            'Chọn số nhóm (thường từ $5$ đến $8$) và độ dài nhóm $h$ sao cho các nhóm phủ hết các giá trị.',
            'Đếm tần số của từng nhóm, lập bảng tần số ghép nhóm; thêm cột tần số tích luỹ và giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mỗi giá trị chỉ thuộc một nhóm',
          text: 'Nhóm $[35; 40)$ chứa $35$ nhưng không chứa $40$; giá trị $40$ thuộc nhóm $[40; 45)$. Số giọt là số tự nhiên nên nhóm $[35; 40)$ gồm các giá trị $35, 36, 37, 38, 39$.',
        },
      ],
    },
    {
      heading: 'Các số đặc trưng của mẫu ghép nhóm',
      blocks: [
        {
          type: 'p',
          text: 'Gọi $n$ là cỡ mẫu. Các công thức dưới đây coi các giá trị trong mỗi nhóm rải đều trên nhóm, nên chỉ cho giá trị xấp xỉ của các số đặc trưng của mẫu số liệu gốc.',
        },
        {
          type: 'table',
          head: ['Số đặc trưng', 'Cách tính'],
          rows: [
            ['Số trung bình', '$\\overline{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}$'],
            [
              'Trung vị',
              '$M_e = a_p + \\dfrac{\\frac{n}{2} - (m_1 + \\cdots + m_{p-1})}{m_p} \\cdot (a_{p+1} - a_p)$, với $[a_p; a_{p+1})$ là nhóm đầu tiên có tần số tích luỹ $\\ge \\dfrac{n}{2}$',
            ],
            [
              'Tứ phân vị',
              '$Q_1$, $Q_3$: tính như trung vị, thay $\\dfrac{n}{2}$ bằng $\\dfrac{n}{4}$ và $\\dfrac{3n}{4}$; $Q_2 = M_e$',
            ],
            [
              'Mốt',
              '$M_o = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$, với $[a_j; a_{j+1})$ là nhóm có tần số lớn nhất',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Số trung bình và trung vị cho biết "thông thường" một đồng xu giữ được khoảng bao nhiêu giọt; mốt cho biết số giọt hay gặp nhất; khoảng $[Q_1; Q_3]$ chứa khoảng một nửa số lần đo ở giữa. So sánh các số này giữa nước sạch và nước xà phòng cho biết xà phòng ảnh hưởng thế nào tới lực căng mặt ngoài.',
        },
      ],
    },
    {
      heading: 'Dự án: Đo lực căng mặt ngoài bằng đồng xu',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thu thập số giọt nước mà một đồng xu giữ được, lập mẫu số liệu ghép nhóm, tính các số đặc trưng và so sánh nước sạch với nước có pha xà phòng. Lớp chia thành các nhóm $4$ đến $5$ học sinh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: mỗi nhóm một đồng xu (hoặc nắp chai nhựa) giống nhau, ống nhỏ giọt, cốc nước sạch, cốc nước có pha vài giọt nước rửa bát, khăn giấy, giấy ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lau khô đồng xu, đặt nằm ngang trên mặt bàn phẳng.',
            'Giữ ống nhỏ giọt thẳng đứng, cách mặt đồng xu khoảng $1$ cm, nhỏ từng giọt nước sạch và đếm. Ghi lại số giọt đồng xu giữ được trước khi nước tràn (không tính giọt làm tràn).',
            'Mỗi bạn trong nhóm làm ít nhất $2$ lần, lau khô đồng xu trước mỗi lần. Gộp kết quả của cả lớp thành một mẫu số liệu.',
            'Lặp lại với nước xà phòng để được mẫu số liệu thứ hai.',
            'Với mỗi mẫu: lập bảng tần số ghép nhóm (có thể dùng khung tương tác), vẽ biểu đồ, tính $\\overline{x}$, $M_e$, $Q_1$, $Q_3$, $M_o$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu gốc và bảng ghép nhóm của hai mẫu, các phép tính số đặc trưng, so sánh với số trung bình và trung vị tính từ số liệu gốc, nhận xét về ảnh hưởng của xà phòng và những nguyên nhân gây sai số (giọt to nhỏ khác nhau, nhỏ quá cao, đồng xu còn ướt).',
        },
      ],
    },
  ],
  explore: {
    title: 'Thí nghiệm nhỏ giọt và bảng ghép nhóm',
    instruction:
      'Chọn chất lỏng, bấm "Nhỏ một giọt" cho đến khi nước tràn: số giọt đồng xu giữ được được thêm vào số liệu. Bạn cũng có thể gõ số liệu của lớp vào ô số liệu. Đổi độ dài nhóm và đầu mút trái của nhóm đầu để thấy bảng ghép nhóm, biểu đồ và các số đặc trưng thay đổi.',
  },
  examples: [
    {
      problem:
        'Kết quả $40$ lần đo số giọt nước sạch của một lớp: 27; 28; 29; 30; 31; 32; 32; 33; 33; 34; 34; 34; 35; 35; 36; 36; 36; 37; 37; 37; 38; 38; 38; 38; 39; 39; 39; 40; 40; 41; 41; 42; 42; 43; 43; 44; 44; 45; 46; 48. Lập bảng tần số ghép nhóm với các nhóm có độ dài $5$, bắt đầu từ $25$.',
      steps: [
        'Giá trị nhỏ nhất là $27$, lớn nhất là $48$; các nhóm $[25; 30), [30; 35), [35; 40), [40; 45), [45; 50)$ phủ hết các giá trị.',
        'Đếm: $[25; 30)$ có $27, 28, 29$: $3$ lần; $[30; 35)$: $9$ lần; $[35; 40)$: $15$ lần; $[40; 45)$: $10$ lần; $[45; 50)$: $3$ lần.',
        'Kiểm tra: $3 + 9 + 15 + 10 + 3 = 40$. Tần số tích luỹ: $3;\\ 12;\\ 27;\\ 37;\\ 40$.',
      ],
      answer:
        'Bảng ghép nhóm: $[25; 30)$: $3$; $[30; 35)$: $9$; $[35; 40)$: $15$; $[40; 45)$: $10$; $[45; 50)$: $3$.',
    },
    {
      problem: 'Với bảng ghép nhóm ở trên, tính số giọt trung bình và trung vị.',
      steps: [
        'Giá trị đại diện: $27{,}5;\\ 32{,}5;\\ 37{,}5;\\ 42{,}5;\\ 47{,}5$.',
        '$\\overline{x} = \\dfrac{3 \\cdot 27{,}5 + 9 \\cdot 32{,}5 + 15 \\cdot 37{,}5 + 10 \\cdot 42{,}5 + 3 \\cdot 47{,}5}{40} = \\dfrac{1\\,505}{40} = 37{,}625$.',
        '$\\dfrac{n}{2} = 20$; nhóm đầu tiên có tần số tích luỹ $\\ge 20$ là $[35; 40)$, với $C = 12$, $m_p = 15$.',
        '$M_e = 35 + \\dfrac{20 - 12}{15} \\cdot 5 = 35 + \\dfrac{8}{3} \\approx 37{,}67$.',
      ],
      answer: '$\\overline{x} = 37{,}625$ giọt, $M_e \\approx 37{,}67$ giọt.',
    },
    {
      problem:
        'Tính $Q_1$, $Q_3$ và mốt của mẫu ghép nhóm trên. So sánh với số liệu gốc: số trung bình $37{,}35$, trung vị $37{,}5$, $Q_1 = 34$, $Q_3 = 41$.',
      steps: [
        '$\\dfrac{n}{4} = 10$: nhóm chứa $Q_1$ là $[30; 35)$, $C = 3$, $m = 9$, nên $Q_1 = 30 + \\dfrac{10 - 3}{9} \\cdot 5 \\approx 33{,}89$.',
        '$\\dfrac{3n}{4} = 30$: nhóm chứa $Q_3$ là $[40; 45)$, $C = 27$, $m = 10$, nên $Q_3 = 40 + \\dfrac{30 - 27}{10} \\cdot 5 = 41{,}5$.',
        'Nhóm chứa mốt là $[35; 40)$ với $m_j = 15$, $m_{j-1} = 9$, $m_{j+1} = 10$: $M_o = 35 + \\dfrac{15 - 9}{(15 - 9) + (15 - 10)} \\cdot 5 = 35 + \\dfrac{30}{11} \\approx 37{,}73$.',
        'Các giá trị ước lượng từ bảng ghép nhóm chênh với số liệu gốc chưa tới $1$ giọt.',
      ],
      answer:
        '$Q_1 \\approx 33{,}89$, $Q_3 = 41{,}5$, $M_o \\approx 37{,}73$: một đồng xu thường giữ được khoảng $37$ đến $38$ giọt nước sạch.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Một mẫu số giọt nước có giá trị nhỏ nhất $27$ và lớn nhất $48$ (các số tự nhiên). Những cách chia nhóm nào dùng được để ghép nhóm mẫu này?',
      options: [
        '$[25; 30), [30; 35), \\ldots, [45; 50)$',
        '$[27; 31), [31; 35), \\ldots, [47; 51)$',
        '$[30; 35), [35; 40), \\ldots, [45; 50)$',
        '$[25; 30), [30; 35), \\ldots, [40; 45)$',
      ],
      answers: [0, 1],
      hints: ['Nhóm đầu phải chứa $27$ và nhóm cuối phải chứa $48$.'],
      solution:
        'Cách bắt đầu từ $25$ đến $50$ và cách bắt đầu từ $27$ đến $51$ đều phủ hết từ $27$ đến $48$. Cách bắt đầu từ $30$ bỏ sót $27, 28, 29$; cách kết thúc ở $45$ bỏ sót các giá trị từ $45$ đến $48$.',
    },
    {
      type: 'number',
      prompt:
        'Số giọt nước xà phòng một đồng xu giữ được trong $30$ lần đo: $[14; 17)$: $4$; $[17; 20)$: $9$; $[20; 23)$: $11$; $[23; 26)$: $6$. Tính số trung bình $\\overline{x}$.',
      answer: 20.4,
      tolerance: 0.005,
      unit: 'giọt',
      hints: [
        'Giá trị đại diện của các nhóm: $15{,}5;\\ 18{,}5;\\ 21{,}5;\\ 24{,}5$.',
        'Tính $\\dfrac{4 \\cdot 15{,}5 + 9 \\cdot 18{,}5 + 11 \\cdot 21{,}5 + 6 \\cdot 24{,}5}{30}$.',
      ],
      solution:
        '$\\overline{x} = \\dfrac{62 + 166{,}5 + 236{,}5 + 147}{30} = \\dfrac{612}{30} = 20{,}4$ (giọt).',
    },
    {
      type: 'choice',
      prompt: 'Với bảng số giọt nước xà phòng ở câu trên, nhóm nào chứa trung vị?',
      options: ['$[20; 23)$', '$[17; 20)$', '$[14; 17)$', '$[23; 26)$'],
      answer: 0,
      hints: ['Tần số tích luỹ đầu tiên không nhỏ hơn $\\dfrac{n}{2} = 15$ ở nhóm nào?'],
      solution:
        'Tần số tích luỹ: $4;\\ 13;\\ 24;\\ 30$. Nhóm đầu tiên có tần số tích luỹ $\\ge 15$ là $[20; 23)$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng số giọt nước xà phòng ở trên, tính trung vị $M_e$ (làm tròn đến hàng phần trăm).',
      answer: 20.55,
      tolerance: 0.006,
      unit: 'giọt',
      hints: [
        'Nhóm chứa trung vị là $[20; 23)$, $C = 4 + 9 = 13$, $m_p = 11$, $h = 3$.',
        '$M_e = 20 + \\dfrac{15 - 13}{11} \\cdot 3$.',
      ],
      solution:
        '$M_e = 20 + \\dfrac{2}{11} \\cdot 3 = 20 + \\dfrac{6}{11} \\approx 20{,}55$ (giọt).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng số giọt nước xà phòng ở trên, tính tứ phân vị thứ nhất $Q_1$ (làm tròn đến hàng phần trăm).',
      answer: 18.17,
      tolerance: 0.006,
      unit: 'giọt',
      hints: [
        '$\\dfrac{n}{4} = 7{,}5$; nhóm đầu tiên có tần số tích luỹ $\\ge 7{,}5$ là $[17; 20)$.',
        '$C = 4$, $m = 9$: $Q_1 = 17 + \\dfrac{7{,}5 - 4}{9} \\cdot 3$.',
      ],
      solution:
        '$Q_1 = 17 + \\dfrac{3{,}5}{9} \\cdot 3 = 17 + \\dfrac{7}{6} \\approx 18{,}17$ (giọt).',
    },
    {
      type: 'number',
      prompt:
        'Với bảng số giọt nước xà phòng ở trên, tính mốt $M_o$ (làm tròn đến hàng phần trăm).',
      answer: 20.86,
      tolerance: 0.006,
      unit: 'giọt',
      hints: [
        'Nhóm chứa mốt là $[20; 23)$ với $m_j = 11$; nhóm liền trước có tần số $9$, liền sau có tần số $6$.',
        '$M_o = 20 + \\dfrac{11 - 9}{(11 - 9) + (11 - 6)} \\cdot 3$.',
      ],
      solution: '$M_o = 20 + \\dfrac{2}{7} \\cdot 3 = 20 + \\dfrac{6}{7} \\approx 20{,}86$ (giọt).',
    },
    {
      type: 'choice',
      prompt:
        'Với nước sạch, lớp tính được $\\overline{x} = 37{,}625$ giọt; với nước xà phòng, $\\overline{x} = 20{,}4$ giọt. Kết luận nào hợp lí nhất?',
      options: [
        'Xà phòng làm giảm lực căng mặt ngoài nên đồng xu giữ được ít giọt hơn.',
        'Xà phòng làm tăng lực căng mặt ngoài nên mỗi giọt to hơn.',
        'Hai mẫu khác nhau chỉ do đo sai, lực căng mặt ngoài không đổi.',
        'Không thể so sánh vì hai mẫu có cỡ mẫu khác nhau.',
      ],
      answer: 0,
      hints: [
        'Mặt nước giữ được vòm cao trên đồng xu là nhờ lực căng mặt ngoài. Lực đó yếu đi thì vòm nước thế nào?',
      ],
      solution:
        'Số trung bình (và cả trung vị, mốt) của nước xà phòng nhỏ hơn hẳn: xà phòng làm giảm lực căng mặt ngoài, vòm nước sụp sớm hơn nên đồng xu giữ được ít giọt hơn. Hai mẫu có cỡ mẫu khác nhau vẫn so sánh được bằng các số đặc trưng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của hoạt động theo đúng thứ tự.',
      items: [
        'Tính số trung bình, trung vị, tứ phân vị và mốt',
        'Nhỏ giọt và ghi số giọt của mỗi lần đo',
        'Rút ra kết luận về lực căng mặt ngoài',
        'Lập bảng tần số ghép nhóm',
        'Gộp số liệu của cả lớp thành một mẫu',
      ],
      answer: [1, 4, 3, 0, 2],
      hints: ['Phải có số liệu trước khi ghép nhóm, và có bảng trước khi tính số đặc trưng.'],
      solution:
        'Nhỏ giọt và ghi số giọt → gộp số liệu của cả lớp → lập bảng tần số ghép nhóm → tính các số đặc trưng → rút ra kết luận.',
    },
  ],
  takeaways: [
    'Lực căng mặt ngoài giữ nước thành vòm trên đồng xu; xà phòng làm giảm lực này.',
    'Kết quả đo thay đổi giữa các lần, nên cần nhiều lần đo và ghép thành mẫu số liệu ghép nhóm với các nhóm cùng độ dài.',
    'Số trung bình dùng giá trị đại diện; trung vị, tứ phân vị tìm nhóm chứa chúng nhờ tần số tích luỹ; mốt nằm trong nhóm có tần số lớn nhất.',
    'Các số đặc trưng của mẫu ghép nhóm xấp xỉ các số tương ứng của số liệu gốc và dùng để so sánh hai mẫu.',
  ],
};
