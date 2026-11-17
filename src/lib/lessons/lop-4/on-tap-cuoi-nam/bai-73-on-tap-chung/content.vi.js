/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung cuối năm lớp 4: số tự nhiên và các phép tính, phân số và các phép tính với phân số, hình học và đo lường, thống kê và xác suất, giải bài toán.',
  intro:
    'Một năm học sắp khép lại! Em đã học số có nhiều chữ số, phân số, góc, hình thoi, biểu đồ cột… Hôm nay em cùng ôn lại tất cả nhé!',
  objectives: [
    'Đọc, viết, so sánh và sắp xếp số tự nhiên; thực hiện bốn phép tính.',
    'Rút gọn phân số và tính với phân số.',
    'Giải bài toán tìm số trung bình cộng, tìm hai số biết tổng và hiệu, tìm phân số của một số.',
    'Ôn lại hình học, đơn vị đo và cách đọc biểu đồ cột.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số tự nhiên và các phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Sắp xếp các số 3 142; 2 413; 2 431; 3 421 từ bé đến lớn: 2 413; 2 431; 3 142; 3 421.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['2 667 + 3 825', '6 492'],
            ['8 247 − 4 516', '3 731'],
            ['324 × 14', '4 536'],
            ['74 165 : 5', '14 833'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tìm hai số biết tổng và hiệu: Số lớn = (Tổng + Hiệu) : 2. Số bé = (Tổng − Hiệu) : 2.',
        },
      ],
    },
    {
      heading: 'Phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số lớn hơn 1. Ví dụ: $\\dfrac{15}{25} = \\dfrac{15 : 5}{25 : 5} = \\dfrac{3}{5}$.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['$\\dfrac{3}{5} + \\dfrac{7}{25}$', '$\\dfrac{22}{25}$'],
            ['$\\dfrac{8}{11} - \\dfrac{19}{33}$', '$\\dfrac{5}{33}$'],
            ['$\\dfrac{16}{21} \\times \\dfrac{3}{5}$', '$\\dfrac{16}{35}$'],
            ['$\\dfrac{14}{41} : \\dfrac{7}{9}$', '$\\dfrac{18}{41}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn tìm $\\dfrac{2}{5}$ của 100 l, em lấy 100 × $\\dfrac{2}{5}$ = 40 (l).',
        },
      ],
    },
    {
      heading: 'Hình học, đo lường và biểu đồ',
      blocks: [
        {
          type: 'p',
          text: 'Hình chữ nhật có chiều rộng 15 m, chiều dài gấp 2 lần chiều rộng. Chiều dài: 15 × 2 = 30 (m).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2. Diện tích hình chữ nhật = chiều dài × chiều rộng.',
        },
        {
          type: 'p',
          text: 'Hình chữ nhật có các cặp cạnh vuông góc và hai cặp cạnh song song. Hình thoi có hai cặp cạnh song song và bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Biểu đồ cột số người đồng diễn: Đội Một 120 người, Đội Hai 140 người, Đội Ba 100 người. Trung bình mỗi đội có (120 + 140 + 100) : 3 = 120 (người).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Bài có sáu phần, mỗi phần là một mảng kiến thức của lớp 4. Mỗi phần được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại bằng câu khác. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Một đội văn nghệ có 30 bạn, số bạn nam nhiều hơn số bạn nữ là 4 bạn. Hỏi đội văn nghệ có bao nhiêu bạn nam, bao nhiêu bạn nữ?',
      steps: [
        'Tổng là 30, hiệu là 4.',
        'Số bạn nam (số lớn): (30 + 4) : 2 = 17 (bạn).',
        'Số bạn nữ: 17 − 4 = 13 (bạn).',
      ],
      answer: 'Đội văn nghệ có 17 bạn nam và 13 bạn nữ.',
    },
    {
      problem:
        'Một thùng có 100 l dầu. Người ta lấy ra $\\dfrac{2}{5}$ số dầu trong thùng rồi rót đều vào 8 can. Hỏi 3 can như vậy có bao nhiêu lít dầu?',
      steps: [
        'Số dầu lấy ra: $100 \\times \\dfrac{2}{5} = 40$ (l).',
        'Mỗi can có: 40 : 8 = 5 (l).',
        '3 can có: 5 × 3 = 15 (l).',
      ],
      answer: '3 can có 15 l dầu.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ bé đến lớn.',
      items: ['3 142', '2 413', '2 431', '3 421'],
      answer: [1, 2, 0, 3],
      hints: ['Em so sánh chữ số hàng nghìn trước, rồi đến hàng trăm.'],
      solution:
        '2 413 và 2 431 có 2 nghìn; 3 142 và 3 421 có 3 nghìn. 2 413 < 2 431 (4 trăm bằng nhau, 1 chục < 3 chục), 3 142 < 3 421 (1 trăm < 4 trăm). Thứ tự: 2 413; 2 431; 3 142; 3 421.',
    },
    {
      type: 'choice',
      prompt: '2 667 + 3 825 = ?',
      options: ['6 492', '5 492', '6 482', '6 592'],
      answer: 0,
      hints: ['Đặt tính rồi cộng từ hàng đơn vị: 7 + 5 = 12, viết 2 nhớ 1.'],
      solution:
        '7 + 5 = 12, viết 2 nhớ 1. 6 + 2 + 1 = 9. 6 + 8 = 14, viết 4 nhớ 1. 2 + 3 + 1 = 6. Vậy 2 667 + 3 825 = 6 492.',
    },
    {
      type: 'choice',
      prompt: '324 × 14 = ?',
      options: ['4 536', '1 620', '4 436', '3 564'],
      answer: 0,
      hints: ['324 × 14 = 324 × 4 + 324 × 10.'],
      solution: '324 × 4 = 1 296. 324 × 10 = 3 240. 1 296 + 3 240 = 4 536.',
    },
    {
      type: 'choice',
      prompt: '74 165 : 5 = ?',
      options: ['14 833', '14 383', '1 483', '15 833'],
      answer: 0,
      hints: ['Chia lần lượt từ trái sang phải: 7 : 5 được 1, dư 2.'],
      solution: '74 165 : 5 = 14 833. Thử lại: 14 833 × 5 = 74 165.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng ba ngày bán được 45 m, 38 m và 52 m vải. Trung bình mỗi ngày cửa hàng bán được bao nhiêu mét vải?',
      answer: 45,
      unit: 'm',
      hints: ['Em cộng số mét vải của ba ngày.', 'Lấy tổng chia cho 3.'],
      solution: '(45 + 38 + 52) : 3 = 135 : 3 = 45 (m).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều rộng 15 m, chiều dài gấp 2 lần chiều rộng. Tính diện tích mảnh vườn.',
      answer: 450,
      unit: 'm²',
      hints: ['Chiều dài: 15 × 2.', 'Diện tích = chiều dài × chiều rộng.'],
      solution: 'Chiều dài: 15 × 2 = 30 (m). Diện tích: 30 × 15 = 450 (m²).',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{24}{28}$.',
      answer: [6, 7],
      simplest: true,
      hints: ['24 và 28 cùng chia hết cho 4.'],
      solution: '$\\dfrac{24}{28} = \\dfrac{24 : 4}{28 : 4} = \\dfrac{6}{7}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{14}{41} : \\dfrac{7}{9}$. Viết kết quả là phân số tối giản.',
      answer: [18, 41],
      simplest: true,
      hints: ['Chia cho một phân số là nhân với phân số đảo ngược.'],
      solution:
        '$\\dfrac{14}{41} : \\dfrac{7}{9} = \\dfrac{14}{41} \\times \\dfrac{9}{7} = \\dfrac{126}{287} = \\dfrac{18}{41}$.',
    },
    {
      type: 'number',
      prompt:
        'Đội văn nghệ có 30 bạn, số bạn nam nhiều hơn số bạn nữ là 4 bạn. Đội có bao nhiêu bạn nữ?',
      answer: 13,
      unit: 'bạn',
      hints: ['Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Số bạn nữ: (30 − 4) : 2 = 13 (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Một kho có 31 tấn 5 tạ muối. Lần đầu người ta chuyển đi $\\dfrac{2}{5}$ số muối trong kho, lần sau chuyển đi $\\dfrac{3}{7}$ số muối trong kho. Cả hai lần chuyển đi bao nhiêu tạ muối?',
      answer: 261,
      unit: 'tạ',
      hints: [
        'Đổi 31 tấn 5 tạ ra tạ: 1 tấn = 10 tạ.',
        'Tìm $\\dfrac{2}{5}$ và $\\dfrac{3}{7}$ của số muối, rồi cộng.',
      ],
      solution:
        '31 tấn 5 tạ = 315 tạ. Lần đầu: $315 \\times \\dfrac{2}{5} = 126$ (tạ). Lần sau: $315 \\times \\dfrac{3}{7} = 135$ (tạ). Cả hai lần: 126 + 135 = 261 (tạ).',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ cột số người đồng diễn: Đội Một 120 người, Đội Hai 140 người, Đội Ba 100 người. Đội đông nhất nhiều hơn đội ít nhất bao nhiêu người?',
      answer: 40,
      unit: 'người',
      hints: ['Cột cao nhất là Đội Hai, cột thấp nhất là Đội Ba.'],
      solution:
        'Đội Hai đông nhất (140 người), Đội Ba ít nhất (100 người). 140 − 100 = 40 (người).',
    },
    {
      type: 'choice',
      prompt:
        'Bốn ô tô đi từ nhà đến trường. Xe đỏ đi hết $\\dfrac{1}{5}$ giờ, xe đen đi hết $\\dfrac{1}{6}$ giờ, xe xanh đi hết 780 giây, xe trắng đi hết 11 phút. Xe nào đi hết nhiều thời gian nhất?',
      options: ['Xe xanh', 'Xe đỏ', 'Xe đen', 'Xe trắng'],
      answer: 0,
      hints: ['Đổi tất cả ra phút: 1 giờ = 60 phút, 1 phút = 60 giây.'],
      solution:
        'Xe đỏ: 60 : 5 = 12 phút. Xe đen: 60 : 6 = 10 phút. Xe xanh: 780 : 60 = 13 phút. Xe trắng: 11 phút. 13 phút là lâu nhất, nên xe xanh đi hết nhiều thời gian nhất.',
    },
    {
      type: 'multi',
      prompt: 'Hình thoi MNPQ. Chọn các cặp cạnh song song với nhau.',
      options: ['MN và PQ', 'NP và MQ', 'MN và NP', 'MQ và PQ'],
      answers: [0, 1],
      hints: [
        'Hình thoi có hai cặp cạnh đối diện song song. Hai cạnh đối diện không có đỉnh chung.',
      ],
      solution: 'MN đối diện PQ, NP đối diện MQ. Vậy MN song song với PQ, NP song song với MQ.',
    },
    {
      type: 'number',
      prompt:
        'Thùng có 100 l dầu. Lấy ra $\\dfrac{2}{5}$ số dầu rồi rót đều vào 8 can. Hỏi 3 can như vậy có bao nhiêu lít dầu?',
      answer: 15,
      unit: 'l',
      hints: ['Tìm $\\dfrac{2}{5}$ của 100 l.', 'Chia cho 8 can, rồi nhân với 3.'],
      solution:
        'Lấy ra: $100 \\times \\dfrac{2}{5} = 40$ (l). Mỗi can: 40 : 8 = 5 (l). 3 can: 5 × 3 = 15 (l).',
    },
  ],
  takeaways: [
    'So sánh số tự nhiên: so sánh từng hàng từ trái sang phải.',
    'Số lớn = (Tổng + Hiệu) : 2; số bé = (Tổng − Hiệu) : 2.',
    'Muốn tìm phân số của một số, em lấy số đó nhân với phân số.',
    'Chia cho một phân số là nhân với phân số đảo ngược.',
    'Số trung bình cộng = tổng các số : số các số hạng.',
  ],
};
