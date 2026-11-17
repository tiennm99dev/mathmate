/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: khảo sát thời gian dùng mạng xã hội, lợi ích và bất lợi của mạng xã hội trong lớp; lập bảng tần số, tính các số đặc trưng đo xu thế trung tâm và độ phân tán, so sánh học sinh nam và nữ rồi rút ra kết luận.',
  intro:
    'Mạng xã hội giúp chúng ta kết nối với bạn bè, giải trí và tìm thông tin, nhưng cũng có thể lấy đi rất nhiều thời gian. Các bạn trong lớp em dùng mạng xã hội bao lâu mỗi ngày? Bạn nam hay bạn nữ dùng nhiều hơn? Trong hoạt động này, em tự làm một cuộc khảo sát nhỏ và dùng các số đặc trưng của mẫu số liệu đã học ở chương V để trả lời.',
  objectives: [
    'Thiết kế phiếu khảo sát, thu thập và ghi lại số liệu về việc sử dụng mạng xã hội.',
    'Lập bảng tần số, vẽ biểu đồ cho số liệu thu được.',
    'Tính số trung bình, trung vị, tứ phân vị, mốt, khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn và tìm giá trị ngoại lệ.',
    'Dùng các số đặc trưng để so sánh hai nhóm và rút ra kết luận về lợi ích, tác hại của mạng xã hội.',
  ],
  sections: [
    {
      heading: 'Thu thập số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi nhóm học sinh phát phiếu khảo sát cho các bạn trong lớp (ít nhất $30$ phiếu) và ghi lại câu trả lời vào một bảng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Giới tính: Nam / Nữ.',
            'Mỗi ngày em dùng mạng xã hội khoảng bao nhiêu phút?',
            'Lợi ích lớn nhất mà mạng xã hội đem lại cho em: A. Kết nối, trò chuyện với bạn bè; B. Giải trí; C. Tìm kiếm, cập nhật thông tin; D. Hỗ trợ học tập.',
            'Bất lợi lớn nhất của mạng xã hội đối với em: A. Tốn nhiều thời gian; B. Ảnh hưởng sức khoẻ, giấc ngủ; C. Ảnh hưởng kết quả học tập; D. Gặp thông tin sai lệch, lừa đảo.',
          ],
        },
        {
          type: 'table',
          head: ['STT', 'Giới tính', 'Thời gian (phút)', 'Lợi ích', 'Bất lợi'],
          rows: [
            ['$1$', 'Nam', '$30$', 'C', 'D'],
            ['$2$', 'Nam', '$60$', 'D', 'A'],
            ['$3$', 'Nữ', '$40$', 'C', 'D'],
            ['...', '...', '...', '...', '...'],
          ],
          caption: 'Bảng ghi kết quả khảo sát (mỗi dòng là một phiếu).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khảo sát cần trung thực và tôn trọng người trả lời: không ghi tên, không ép bạn trả lời, ghi đúng câu trả lời. Có thể làm phiếu trên giấy hoặc bằng biểu mẫu trực tuyến (Google Forms, Microsoft Forms) để dữ liệu tự vào bảng tính.',
        },
      ],
    },
    {
      heading: 'Xử lí số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Một nhóm khảo sát $30$ bạn lớp 10A ($14$ nam, $16$ nữ) và thu được thời gian dùng mạng xã hội mỗi ngày như sau.',
        },
        {
          type: 'table',
          head: ['Thời gian (phút)', '$30$', '$40$', '$60$', '$90$', '$120$', '$150$'],
          rows: [['Tần số', '$2$', '$1$', '$4$', '$5$', '$7$', '$3$']],
        },
        {
          type: 'table',
          head: ['Thời gian (phút)', '$180$', '$240$', '$300$', '$360$', '$420$'],
          rows: [['Tần số', '$2$', '$3$', '$1$', '$1$', '$1$']],
          caption: 'Bảng tần số thời gian dùng mạng xã hội mỗi ngày của $30$ bạn lớp 10A.',
        },
        {
          type: 'p',
          text: 'Từ bảng tần số, tính các số đặc trưng (nhắc lại: $n = 30$ chẵn, trung vị là trung bình cộng của giá trị thứ $15$ và thứ $16$; $Q_1$ là trung vị của $15$ giá trị đầu, $Q_3$ là trung vị của $15$ giá trị cuối).',
        },
        {
          type: 'table',
          head: ['Số đặc trưng', 'Giá trị'],
          rows: [
            ['Số trung bình', '$\\overline{x} = \\dfrac{4\\,240}{30} \\approx 141{,}3$ phút'],
            ['Trung vị', '$Q_2 = \\dfrac{120 + 120}{2} = 120$ phút'],
            [
              'Tứ phân vị',
              '$Q_1 = 90$ phút (giá trị thứ $8$), $Q_3 = 180$ phút (giá trị thứ $23$)',
            ],
            ['Mốt', '$120$ phút (tần số $7$)'],
            ['Khoảng biến thiên', '$R = 420 - 30 = 390$ phút'],
            ['Khoảng tứ phân vị', '$\\Delta_Q = 180 - 90 = 90$ phút'],
            ['Phương sai, độ lệch chuẩn', '$s^2 \\approx 8\\,698{,}22$; $s \\approx 93{,}26$ phút'],
          ],
          caption: 'Các số đặc trưng của mẫu số liệu lớp 10A.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Giá trị ngoại lệ',
          text: 'Giá trị $x$ là ngoại lệ nếu $x > Q_3 + 1{,}5\\Delta_Q$ hoặc $x < Q_1 - 1{,}5\\Delta_Q$. Ở đây $Q_3 + 1{,}5\\Delta_Q = 180 + 135 = 315$ và $Q_1 - 1{,}5\\Delta_Q = -45$, nên $360$ và $420$ phút là các giá trị ngoại lệ.',
        },
      ],
    },
    {
      heading: 'Rút ra kết luận',
      blocks: [
        {
          type: 'list',
          items: [
            'Thời gian dùng mạng xã hội mỗi ngày từ $30$ đến $420$ phút; trung bình mỗi bạn dùng khoảng $141$ phút, tức hơn $2$ giờ.',
            'Có $75\\%$ số bạn dùng từ $90$ phút trở lên, một nửa dùng từ $120$ phút trở lên và $25\\%$ dùng từ $180$ phút ($3$ giờ) trở lên.',
            'Nhiều bạn dùng khoảng $120$ phút nhất (mốt). Hai giá trị ngoại lệ $360$ và $420$ phút kéo số trung bình lên cao hơn trung vị, nên trung vị $120$ phút đại diện cho mẫu tốt hơn.',
          ],
        },
        {
          type: 'table',
          head: ['Nhóm', '$n$', '$\\overline{x}$', '$Q_1$', '$Q_2$', '$Q_3$', '$s$'],
          rows: [
            ['Nam', '$14$', '$180$', '$90$', '$135$', '$240$', '$\\approx 112{,}25$'],
            ['Nữ', '$16$', '$107{,}5$', '$60$', '$105$', '$135$', '$\\approx 53{,}21$'],
          ],
          caption: 'So sánh thời gian dùng mạng xã hội (phút/ngày) của học sinh nam và nữ.',
        },
        {
          type: 'p',
          text: 'Trong mẫu này, học sinh nam dùng mạng xã hội nhiều hơn học sinh nữ (cả số trung bình và trung vị đều lớn hơn). Độ lệch chuẩn và khoảng tứ phân vị của nhóm nam lớn hơn, nên thời gian của các bạn nam phân tán hơn: có bạn dùng rất ít, có bạn dùng rất nhiều.',
        },
        {
          type: 'p',
          text: 'Về lợi ích, nhiều bạn chọn "Kết nối, trò chuyện với bạn bè" nhất ($11$ bạn) rồi đến "Giải trí" ($9$ bạn). Về bất lợi, "Tốn nhiều thời gian" được chọn nhiều nhất ($13$ bạn), sau đó là "Ảnh hưởng sức khoẻ, giấc ngủ" ($8$ bạn).',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Kết luận chỉ đúng cho mẫu đã khảo sát. Mẫu nhỏ ($30$ bạn của một lớp) chưa đủ để kết luận cho mọi học sinh; muốn kết luận rộng hơn cần khảo sát nhiều lớp, nhiều trường.',
        },
      ],
    },
    {
      heading: 'Dự án: Mạng xã hội trong lớp em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh khảo sát việc sử dụng mạng xã hội của các bạn trong lớp hoặc trong khối, xử lí số liệu và trình bày kết luận, đề xuất cách dùng mạng xã hội hợp lí.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: phiếu khảo sát (giấy hoặc biểu mẫu trực tuyến), máy tính cầm tay hoặc phần mềm bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Thống nhất phiếu khảo sát gồm giới tính, thời gian dùng mạng xã hội mỗi ngày, lợi ích và bất lợi lớn nhất.',
            'Thu thập ít nhất $30$ phiếu và ghi kết quả vào bảng.',
            'Lập bảng tần số cho các lợi ích và các bất lợi; vẽ biểu đồ cột hoặc biểu đồ hình quạt tròn.',
            'Tính các số đặc trưng của thời gian dùng mạng xã hội: số trung bình, trung vị, tứ phân vị, mốt, khoảng biến thiên, khoảng tứ phân vị, độ lệch chuẩn; tìm giá trị ngoại lệ.',
            'Tách số liệu theo giới tính, tính lại các số đặc trưng và so sánh học sinh nam với học sinh nữ.',
            'Rút ra kết luận và đề xuất: nên dùng mạng xã hội bao lâu mỗi ngày, dùng vào việc gì để có lợi.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một áp phích hoặc bài trình chiếu gồm phiếu khảo sát, bảng số liệu, các biểu đồ, bảng số đặc trưng, ít nhất ba nhận xét rút ra từ các số đặc trưng và các đề xuất của nhóm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khảo sát và phân tích',
    instruction:
      'Điền phiếu khảo sát rồi bấm "Thêm phiếu": biểu đồ tần số, các số đặc trưng và biểu đồ hộp cập nhật ngay. Chọn "So sánh nam, nữ" để đặt hai nhóm cạnh nhau, "Lợi ích, bất lợi" để xem ý kiến của cả lớp. Thử thêm một phiếu $600$ phút và xem số trung bình, trung vị thay đổi thế nào.',
  },
  examples: [
    {
      problem:
        'Từ bảng tần số của $30$ bạn lớp 10A, tính số trung bình, trung vị và các tứ phân vị của thời gian dùng mạng xã hội.',
      steps: [
        'Tổng thời gian: $30 \\cdot 2 + 40 + 60 \\cdot 4 + 90 \\cdot 5 + 120 \\cdot 7 + 150 \\cdot 3 + 180 \\cdot 2 + 240 \\cdot 3 + 300 + 360 + 420 = 4\\,240$ (phút).',
        'Số trung bình: $\\overline{x} = 4\\,240 : 30 \\approx 141{,}3$ (phút).',
        'Tần số tích luỹ: đến $90$ có $12$ giá trị, đến $120$ có $19$ giá trị. Giá trị thứ $15$ và $16$ đều là $120$, nên $Q_2 = 120$.',
        '$Q_1$ là trung vị của $15$ giá trị đầu, tức giá trị thứ $8$: $Q_1 = 90$. $Q_3$ là trung vị của $15$ giá trị cuối, tức giá trị thứ $23$: đến $150$ có $22$ giá trị, đến $180$ có $24$ giá trị, nên $Q_3 = 180$.',
      ],
      answer: '$\\overline{x} \\approx 141{,}3$ phút; $Q_1 = 90$, $Q_2 = 120$, $Q_3 = 180$ (phút).',
    },
    {
      problem:
        'Thời gian dùng mạng xã hội mỗi ngày (phút) của $16$ bạn nữ: $30$; $40$; $60$; $60$; $60$; $90$; $90$; $90$; $120$; $120$; $120$; $120$; $150$; $150$; $180$; $240$. Tính số trung bình, phương sai và độ lệch chuẩn.',
      steps: [
        'Tổng: $1\\,720$ phút, nên $\\overline{x} = 1\\,720 : 16 = 107{,}5$ (phút).',
        'Phương sai: $s^2 = \\dfrac{1}{16}\\left[(30 - 107{,}5)^2 + (40 - 107{,}5)^2 + \\ldots + (240 - 107{,}5)^2\\right] = \\dfrac{45\\,300}{16} = 2\\,831{,}25$.',
        'Có thể tính nhanh: $s^2 = \\dfrac{230\\,200}{16} - 107{,}5^2 = 14\\,387{,}5 - 11\\,556{,}25 = 2\\,831{,}25$, với $230\\,200$ là tổng bình phương các giá trị.',
        'Độ lệch chuẩn: $s = \\sqrt{2\\,831{,}25} \\approx 53{,}21$ (phút).',
      ],
      answer: '$\\overline{x} = 107{,}5$ phút; $s^2 = 2\\,831{,}25$; $s \\approx 53{,}21$ phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Thời gian trung bình dùng mạng xã hội mỗi ngày của $30$ bạn lớp 10A là bao nhiêu phút (làm tròn đến hàng phần mười)?',
      answer: 141.3,
      tolerance: 0.05,
      unit: 'phút',
      hints: ['Nhân mỗi giá trị với tần số của nó, cộng lại rồi chia cho $30$.'],
      solution: '$\\overline{x} = \\dfrac{4\\,240}{30} \\approx 141{,}3$ (phút).',
    },
    {
      type: 'number',
      prompt: 'Trung vị của mẫu số liệu thời gian của $30$ bạn lớp 10A là bao nhiêu phút?',
      answer: 120,
      unit: 'phút',
      hints: [
        '$n = 30$ chẵn: trung vị là trung bình cộng của giá trị thứ $15$ và thứ $16$.',
        'Dùng tần số tích luỹ để tìm hai giá trị đó.',
      ],
      solution:
        'Đến giá trị $90$ có $12$ số, đến $120$ có $19$ số, nên giá trị thứ $15$ và $16$ đều là $120$. $Q_2 = 120$ phút.',
    },
    {
      type: 'number',
      prompt: 'Khoảng tứ phân vị của mẫu số liệu thời gian của $30$ bạn lớp 10A là bao nhiêu phút?',
      answer: 90,
      unit: 'phút',
      hints: [
        'Tìm $Q_1$ (giá trị thứ $8$) và $Q_3$ (giá trị thứ $23$) của mẫu đã sắp xếp.',
        '$\\Delta_Q = Q_3 - Q_1$.',
      ],
      solution: '$Q_1 = 90$, $Q_3 = 180$, nên $\\Delta_Q = 180 - 90 = 90$ (phút).',
    },
    {
      type: 'number',
      prompt: 'Mốt của mẫu số liệu thời gian của $30$ bạn lớp 10A là bao nhiêu phút?',
      answer: 120,
      unit: 'phút',
      hints: ['Mốt là giá trị có tần số lớn nhất.'],
      solution: 'Giá trị $120$ phút có tần số lớn nhất ($7$), nên mốt là $120$ phút.',
    },
    {
      type: 'multi',
      prompt: 'Với $Q_1 = 90$ và $Q_3 = 180$, những giá trị nào của mẫu là giá trị ngoại lệ?',
      options: ['$420$', '$360$', '$300$', '$240$', '$30$'],
      answers: [0, 1],
      hints: ['Tính $Q_3 + 1{,}5\\Delta_Q$ và $Q_1 - 1{,}5\\Delta_Q$.'],
      solution:
        '$\\Delta_Q = 90$; $Q_3 + 1{,}5 \\cdot 90 = 315$ và $Q_1 - 1{,}5 \\cdot 90 = -45$. Chỉ $360$ và $420$ lớn hơn $315$, nên đó là hai giá trị ngoại lệ; $30 > -45$ không phải ngoại lệ.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian (phút) của $14$ bạn nam: $30$; $60$; $90$; $90$; $120$; $120$; $120$; $150$; $180$; $240$; $240$; $300$; $360$; $420$. Tính số trung bình.',
      answer: 180,
      unit: 'phút',
      hints: ['Tổng các giá trị chia cho $14$.'],
      solution: 'Tổng: $2\\,520$ phút. $\\overline{x} = 2\\,520 : 14 = 180$ (phút).',
    },
    {
      type: 'number',
      prompt: 'Với $14$ bạn nam ở câu trên, trung vị thời gian dùng mạng xã hội là bao nhiêu phút?',
      answer: 135,
      unit: 'phút',
      hints: ['$n = 14$ chẵn: lấy trung bình cộng của giá trị thứ $7$ và thứ $8$.'],
      solution: 'Giá trị thứ $7$ là $120$, thứ $8$ là $150$. $Q_2 = (120 + 150) : 2 = 135$ (phút).',
    },
    {
      type: 'number',
      prompt:
        'Thời gian của $16$ bạn nữ có phương sai $s^2 = 2\\,831{,}25$. Độ lệch chuẩn là bao nhiêu phút (làm tròn đến hàng phần trăm)?',
      answer: 53.21,
      tolerance: 0.005,
      unit: 'phút',
      hints: ['Độ lệch chuẩn là căn bậc hai số học của phương sai.'],
      solution: '$s = \\sqrt{2\\,831{,}25} \\approx 53{,}21$ (phút).',
    },
    {
      type: 'choice',
      prompt:
        'Nhóm nam: $\\overline{x} = 180$, $s \\approx 112{,}25$. Nhóm nữ: $\\overline{x} = 107{,}5$, $s \\approx 53{,}21$ (phút). Kết luận nào đúng với mẫu đã khảo sát?',
      options: [
        'Nam dùng mạng xã hội nhiều hơn và thời gian của nam phân tán hơn.',
        'Nam dùng nhiều hơn nhưng thời gian của nữ phân tán hơn.',
        'Nữ dùng mạng xã hội nhiều hơn nam.',
        'Không thể so sánh vì hai nhóm có số người khác nhau.',
      ],
      answer: 0,
      hints: [
        'Số trung bình cho biết nhóm nào dùng nhiều hơn; độ lệch chuẩn cho biết nhóm nào phân tán hơn.',
      ],
      solution:
        '$180 > 107{,}5$ nên nam dùng nhiều hơn; $112{,}25 > 53{,}21$ nên thời gian của nam phân tán hơn. Hai nhóm có cỡ mẫu khác nhau vẫn so sánh được bằng số trung bình và độ lệch chuẩn.',
    },
    {
      type: 'number',
      prompt:
        'Có $11$ trong $30$ bạn chọn lợi ích lớn nhất là "Kết nối, trò chuyện với bạn bè". Tỉ lệ này là bao nhiêu phần trăm (làm tròn đến hàng phần mười)?',
      answer: 36.7,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tính $\\dfrac{11}{30} \\cdot 100\\%$.'],
      solution: '$\\dfrac{11}{30} \\cdot 100\\% \\approx 36{,}7\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Mẫu số liệu có hai giá trị ngoại lệ rất lớn ($360$ và $420$ phút). Số đặc trưng nào đại diện tốt hơn cho thời gian dùng mạng xã hội "điển hình" của lớp?',
      options: ['Trung vị', 'Số trung bình', 'Khoảng biến thiên', 'Phương sai'],
      answer: 0,
      hints: ['Số đặc trưng nào ít bị ảnh hưởng bởi các giá trị quá lớn?'],
      solution:
        'Trung vị chỉ phụ thuộc vào vị trí giữa của mẫu nên không bị các giá trị ngoại lệ kéo lệch; số trung bình bị kéo lên ($141{,}3 > 120$). Khoảng biến thiên và phương sai đo độ phân tán, không đo xu thế trung tâm.',
    },
  ],
  takeaways: [
    'Một cuộc khảo sát gồm: thiết kế phiếu, thu thập số liệu, lập bảng và biểu đồ, tính các số đặc trưng, rút ra kết luận.',
    'Số trung bình, trung vị, mốt và tứ phân vị cho biết xu thế trung tâm; khoảng biến thiên, khoảng tứ phân vị, phương sai và độ lệch chuẩn cho biết độ phân tán.',
    'Giá trị ngoại lệ nằm ngoài đoạn $[Q_1 - 1{,}5\\Delta_Q;\\ Q_3 + 1{,}5\\Delta_Q]$; khi có ngoại lệ, trung vị đại diện tốt hơn số trung bình.',
    'So sánh hai nhóm bằng số trung bình (hoặc trung vị) và độ lệch chuẩn (hoặc khoảng tứ phân vị); kết luận chỉ đúng với mẫu đã khảo sát.',
  ],
};
