/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành dùng máy tính cầm tay để giải các bài toán mua bán thực tế: tính tiền hàng, tiền giảm giá, giá mỗi món và tiền ủng hộ theo phần trăm, rồi kiểm tra lại kết quả.',
  intro:
    'Lớp 5A làm 100 chiếc vòng tay để bán ở hội chợ, lấy tiền góp quỹ từ thiện. Em hãy dùng máy tính cầm tay để giúp lớp tính tiền nhé!',
  objectives: [
    'Dùng máy tính cầm tay để giải bài toán thực tế về mua bán.',
    'Tính được số tiền giảm giá, số tiền ủng hộ theo phần trăm bằng máy tính.',
    'Biết ước lượng để kiểm tra kết quả bấm máy.',
  ],
  sections: [
    {
      heading: 'Bấm máy và kiểm tra kết quả',
      blocks: [
        {
          type: 'p',
          text: 'Trước khi bấm máy, em đọc kĩ đề và nghĩ xem cần làm phép tính gì.',
        },
        {
          type: 'table',
          head: ['Em cần tính', 'Em bấm'],
          rows: [
            ['Giá 7 chiếc vòng, mỗi chiếc 25 000 đồng', '25000 × 7 ='],
            ['20% của 450 000 đồng', '450000 × 20 %'],
            ['Giá mỗi chiếc khi 75 chiếc giá 3 000 000 đồng', '3000000 ÷ 75 ='],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra kết quả',
          text: 'Bấm xong, em ước lượng xem kết quả có hợp lí không. Ví dụ: 7 chiếc vòng, mỗi chiếc khoảng 25 nghìn đồng, thì giá khoảng 7 × 25 = 175 nghìn đồng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Bấm sai một chữ số là kết quả sai hẳn. Nếu kết quả lạ, em bấm ON/C rồi bấm lại từ đầu.',
        },
      ],
    },
    {
      heading: 'Dự án: Gian hàng vòng tay ở hội chợ',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em dùng máy tính cầm tay để tính số tiền lớp thu được khi bán vòng tay và số tiền góp vào quỹ từ thiện.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính cầm tay, giấy, bút và bảng ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cô Hường mua 7 chiếc vòng, mỗi chiếc 25 000 đồng. Tính số tiền cô phải trả.',
            'Ai mua nhiều hơn 10 chiếc thì được giảm 20%. Chú Hải mua 18 chiếc. Tính số tiền chú phải trả.',
            'Một công ty mua hết số vòng còn lại với giá 3 000 000 đồng. Tính giá mỗi chiếc vòng.',
            'Nhà trường ủng hộ thêm 20% số tiền lớp bán được. Tính số tiền lớp góp vào quỹ từ thiện.',
            'Ước lượng để kiểm tra từng kết quả.',
          ],
        },
        {
          type: 'table',
          head: ['Người mua', 'Số vòng', 'Số tiền (đồng)'],
          rows: [
            ['Cô Hường', '7', '…'],
            ['Chú Hải', '18', '…'],
            ['Công ty', '…', '3 000 000'],
          ],
          caption: 'Bảng ghi kết quả bán vòng tay',
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: em đã bấm máy thế nào, kết quả là bao nhiêu và em kiểm tra lại ra sao.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử thách mua sắm',
    instruction:
      'Chọn một thử thách. Em dùng máy tính cầm tay để tính, khi màn hình hiện kết quả thì bấm "Nộp kết quả". Làm hết các bước để hoàn thành thử thách.',
  },
  examples: [
    {
      problem:
        'Chú Hải mua 18 chiếc vòng tay, mỗi chiếc 25 000 đồng, được giảm 20%. Chú Hải phải trả bao nhiêu tiền?',
      steps: [
        'Giá khi chưa giảm: bấm 25000 × 18 =, được 450 000 đồng.',
        'Số tiền được giảm: bấm 450000 × 20 %, được 90 000 đồng.',
        'Số tiền phải trả: bấm 450000 − 90000 =, được 360 000 đồng.',
      ],
      answer: 'Chú Hải phải trả 360 000 đồng.',
    },
    {
      problem:
        'Lớp làm 100 chiếc vòng. Cô Hường mua 7 chiếc, chú Hải mua 18 chiếc. Công ty mua hết số vòng còn lại với giá 3 000 000 đồng. Hỏi mỗi chiếc vòng công ty mua giá bao nhiêu?',
      steps: [
        'Số vòng còn lại: 100 − 7 − 18 = 75 (chiếc).',
        'Giá mỗi chiếc: bấm 3000000 ÷ 75 =, được 40 000 đồng.',
      ],
      answer: 'Mỗi chiếc vòng công ty mua giá 40 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cô Hường mua 7 chiếc vòng tay, mỗi chiếc giá 25 000 đồng. Cô phải trả bao nhiêu tiền?',
      answer: 175000,
      unit: 'đồng',
      hints: ['Bấm 25000 × 7 =.'],
      solution: '25 000 × 7 = 175 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Ai mua nhiều hơn 10 chiếc vòng tay thì được giảm 20%. Chú Hải mua 18 chiếc, mỗi chiếc 25 000 đồng. Chú phải trả bao nhiêu tiền?',
      answer: 360000,
      unit: 'đồng',
      hints: [
        'Tính giá 18 chiếc khi chưa giảm.',
        'Tìm 20% của số tiền đó rồi lấy giá chưa giảm trừ đi.',
      ],
      solution:
        'Giá chưa giảm: 25 000 × 18 = 450 000 (đồng). Được giảm: 450 000 × 20 : 100 = 90 000 (đồng). Phải trả: 450 000 − 90 000 = 360 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Lớp làm 100 chiếc vòng. Đã bán 7 chiếc và 18 chiếc. Một công ty mua hết số vòng còn lại với giá 3 000 000 đồng. Mỗi chiếc vòng giá bao nhiêu tiền?',
      answer: 40000,
      unit: 'đồng',
      hints: ['Tìm số vòng còn lại trước.', 'Lấy 3 000 000 chia cho số vòng còn lại.'],
      solution:
        'Số vòng còn lại: 100 − 7 − 18 = 75 (chiếc). Giá mỗi chiếc: 3 000 000 : 75 = 40 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Lớp bán vòng được 175 000 đồng, 360 000 đồng và 3 000 000 đồng. Nhà trường ủng hộ thêm 20% số tiền lớp bán được. Quỹ từ thiện có tất cả bao nhiêu tiền?',
      answer: 4242000,
      unit: 'đồng',
      hints: ['Tính tổng số tiền lớp bán được.', 'Tìm 20% của tổng đó, rồi cộng với tổng.'],
      solution:
        'Lớp bán được: 175 000 + 360 000 + 3 000 000 = 3 535 000 (đồng). Nhà trường ủng hộ: 3 535 000 × 20 : 100 = 707 000 (đồng). Quỹ có: 3 535 000 + 707 000 = 4 242 000 (đồng).',
    },
    {
      type: 'choice',
      prompt: 'Mai bấm 25000 × 7 = và màn hình hiện 17500. Em ước lượng xem kết quả này thế nào?',
      options: [
        'Sai, vì 7 chiếc giá khoảng 175 nghìn đồng',
        'Đúng, vì máy tính không bao giờ sai',
        'Đúng, vì 17 500 gần bằng 25 000',
      ],
      answer: 0,
      hints: ['25 nghìn nhân 7 được khoảng bao nhiêu nghìn?'],
      solution:
        '25 × 7 = 175, nên kết quả phải khoảng 175 nghìn đồng, tức là 175 000. Mai đã bấm thiếu một chữ số 0.',
    },
    {
      type: 'number',
      prompt: 'Chiếc quạt điện giá 650 000 đồng, được giảm giá 12%. Mẹ phải trả bao nhiêu tiền?',
      answer: 572000,
      unit: 'đồng',
      hints: [
        'Bấm 650000 × 12 % để tìm số tiền được giảm.',
        'Lấy giá bán trừ đi số tiền được giảm.',
      ],
      solution:
        'Được giảm: 650 000 × 12 : 100 = 78 000 (đồng). Mẹ phải trả: 650 000 − 78 000 = 572 000 (đồng).',
    },
  ],
  takeaways: [
    'Đọc kĩ đề, chọn đúng phép tính rồi mới bấm máy.',
    'Tìm a% của một số: bấm số đó × a %.',
    'Ước lượng để kiểm tra: kết quả bấm máy phải gần với số ước lượng.',
  ],
};
