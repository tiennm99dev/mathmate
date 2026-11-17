/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các đơn vị đo thời gian: thế kỉ, năm, tháng, tuần lễ, ngày, giờ, phút, giây; bảng đơn vị đo thời gian và cách đổi số đo thời gian từ đơn vị này sang đơn vị khác.',
  intro:
    'Một trận bóng đá kéo dài 1,5 giờ. Đó là bao nhiêu phút? Hôm nay em ôn lại bảng đơn vị đo thời gian và học cách đổi đơn vị.',
  objectives: [
    'Nhớ bảng đơn vị đo thời gian.',
    'Biết năm nhuận có 366 ngày và số ngày của từng tháng.',
    'Đổi được số đo thời gian từ đơn vị này sang đơn vị khác, kể cả số đo viết bằng số thập phân hoặc phân số.',
  ],
  sections: [
    {
      heading: 'Bảng đơn vị đo thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị lớn', 'Bằng'],
          rows: [
            ['1 thế kỉ', '100 năm'],
            ['1 năm', '12 tháng'],
            ['1 năm', '365 ngày'],
            ['1 năm nhuận', '366 ngày'],
            ['1 tuần lễ', '7 ngày'],
            ['1 ngày', '24 giờ'],
            ['1 giờ', '60 phút'],
            ['1 phút', '60 giây'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cứ 4 năm lại có 1 năm nhuận. Năm 2024 là năm nhuận, năm nhuận tiếp theo là năm 2028.',
        },
        {
          type: 'table',
          head: ['Số ngày', 'Các tháng'],
          rows: [
            ['31 ngày', 'Tháng 1, 3, 5, 7, 8, 10, 12'],
            ['30 ngày', 'Tháng 4, 6, 9, 11'],
            ['28 ngày (năm nhuận 29 ngày)', 'Tháng 2'],
          ],
        },
      ],
    },
    {
      heading: 'Đổi đơn vị đo thời gian',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đổi sang đơn vị bé hơn thì em nhân. Đổi sang đơn vị lớn hơn thì em chia.',
        },
        {
          type: 'p',
          text: '1,5 giờ = 60 phút × 1,5 = 90 phút.',
        },
        {
          type: 'p',
          text: '2/3 giờ = 60 phút × 2/3 = 40 phút.',
        },
        {
          type: 'p',
          text: '180 phút = 180 : 60 giờ = 3 giờ.',
        },
        {
          type: 'p',
          text: '216 phút: 216 : 60 = 3, dư 36. Vậy 216 phút = 3 giờ 36 phút = 3,6 giờ.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Đổi qua nhiều bậc thì em đi từng bậc: 1 ngày = 24 giờ = 24 × 60 phút = 1 440 phút.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thang đổi đơn vị thời gian',
    instruction:
      'Em đi trên thang đơn vị từ đơn vị đã cho đến đơn vị cần đổi. Mỗi bậc, em chọn nhân hay chia với số nào. Số giữa hai đơn vị hiện ra khi em chọn đúng.',
  },
  examples: [
    {
      problem: 'Trận bóng đá kéo dài 1,5 giờ. Hỏi trận đấu dài bao nhiêu phút?',
      steps: ['1 giờ = 60 phút.', 'Đổi sang đơn vị bé hơn nên em nhân: 60 × 1,5 = 90.'],
      answer: '1,5 giờ = 90 phút.',
    },
    {
      problem: 'Viết 216 phút dưới dạng số đo có đơn vị là giờ.',
      steps: [
        'Đổi sang đơn vị lớn hơn nên em chia cho 60: 216 : 60 = 3, dư 36.',
        'Vậy 216 phút = 3 giờ 36 phút.',
        '36 phút = 36/60 giờ = 0,6 giờ.',
      ],
      answer: '216 phút = 3 giờ 36 phút = 3,6 giờ.',
    },
    {
      problem: 'Ô tô đầu tiên được phát minh năm 1886. Năm đó thuộc thế kỉ nào?',
      steps: ['Thế kỉ XIX tính từ năm 1801 đến năm 1900.', '1886 nằm trong khoảng đó.'],
      answer: 'Năm 1886 thuộc thế kỉ XIX.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi đơn vị với số đo bằng nó.',
      left: ['1 thế kỉ', '1 năm', '1 tuần lễ', '1 ngày', '1 giờ'],
      right: ['100 năm', '12 tháng', '7 ngày', '24 giờ', '60 phút', '60 giây'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
      hints: ['Em đọc lại bảng đơn vị đo thời gian.'],
      solution:
        '1 thế kỉ = 100 năm; 1 năm = 12 tháng; 1 tuần lễ = 7 ngày; 1 ngày = 24 giờ; 1 giờ = 60 phút.',
    },
    {
      type: 'number',
      prompt: '3 năm = ? tháng',
      answer: 36,
      unit: 'tháng',
      hints: ['1 năm = 12 tháng.', 'Em tính 12 × 3.'],
      solution: '3 năm = 12 tháng × 3 = 36 tháng.',
    },
    {
      type: 'number',
      prompt: '1,5 ngày = ? giờ',
      answer: 36,
      unit: 'giờ',
      hints: ['1 ngày = 24 giờ.', 'Em tính 24 × 1,5.'],
      solution: '1,5 ngày = 24 giờ × 1,5 = 36 giờ.',
    },
    {
      type: 'number',
      prompt: '3/4 giờ = ? phút',
      answer: 45,
      unit: 'phút',
      hints: ['1 giờ = 60 phút.', 'Em tính 60 × 3/4: lấy 60 chia 4 rồi nhân 3.'],
      solution: '3/4 giờ = 60 phút × 3/4 = 45 phút.',
    },
    {
      type: 'number',
      prompt: '150 giây = ? phút (viết dưới dạng số thập phân)',
      answer: 2.5,
      unit: 'phút',
      hints: ['Đổi sang đơn vị lớn hơn thì em chia cho 60.', '150 giây = 2 phút 30 giây.'],
      solution: '150 : 60 = 2,5. Vậy 150 giây = 2,5 phút.',
    },
    {
      type: 'choice',
      prompt: 'Năm nhuận có bao nhiêu ngày?',
      options: ['366 ngày', '365 ngày', '364 ngày', '360 ngày'],
      answer: 0,
      hints: ['Năm nhuận, tháng 2 có 29 ngày.'],
      solution: 'Năm thường có 365 ngày, năm nhuận có 366 ngày.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các tháng có 31 ngày.',
      options: ['Tháng 1', 'Tháng 4', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 2'],
      answers: [0, 2, 3],
      hints: ['Em đếm trên các khớp ngón tay: khớp lồi là tháng có 31 ngày.'],
      solution:
        'Các tháng có 31 ngày là tháng 1, 3, 5, 7, 8, 10, 12. Tháng 4 và tháng 9 có 30 ngày, tháng 2 có 28 hoặc 29 ngày.',
    },
    {
      type: 'choice',
      prompt: '2 giờ 15 phút bằng bao nhiêu giờ?',
      options: ['2,25 giờ', '2,15 giờ', '2,5 giờ', '215 giờ'],
      answer: 0,
      hints: ['15 phút = 15/60 giờ.', '15/60 = 1/4 = 0,25.'],
      solution: '15 phút = 15/60 giờ = 0,25 giờ. Vậy 2 giờ 15 phút = 2,25 giờ.',
    },
    {
      type: 'order',
      prompt: 'Xếp các khoảng thời gian từ ngắn đến dài.',
      items: ['1 giờ', '90 phút', '0,5 ngày', '1 tuần lễ', '45 phút'],
      answer: [4, 0, 1, 2, 3],
      hints: ['Em đổi tất cả ra phút: 1 giờ = 60 phút.', '0,5 ngày = 12 giờ.'],
      solution: '45 phút < 1 giờ (60 phút) < 90 phút < 0,5 ngày (12 giờ) < 1 tuần lễ (7 ngày).',
    },
    {
      type: 'choice',
      prompt: 'Năm 2028 thuộc thế kỉ nào?',
      options: ['Thế kỉ XXI', 'Thế kỉ XX', 'Thế kỉ XXII', 'Thế kỉ XIX'],
      answer: 0,
      hints: ['Thế kỉ XXI tính từ năm 2001 đến năm 2100.'],
      solution: '2028 nằm trong khoảng từ năm 2001 đến năm 2100, nên thuộc thế kỉ XXI.',
    },
  ],
  takeaways: [
    '1 thế kỉ = 100 năm; 1 năm = 12 tháng = 365 ngày; năm nhuận có 366 ngày.',
    '1 tuần lễ = 7 ngày; 1 ngày = 24 giờ; 1 giờ = 60 phút; 1 phút = 60 giây.',
    'Đổi sang đơn vị bé hơn thì nhân, đổi sang đơn vị lớn hơn thì chia.',
  ],
};
