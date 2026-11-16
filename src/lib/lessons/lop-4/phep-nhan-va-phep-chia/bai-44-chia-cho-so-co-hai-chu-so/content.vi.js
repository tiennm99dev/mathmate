/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chia cho số có hai chữ số: chia từ trái sang phải, mỗi lượt ước lượng chữ số của thương rồi thử lại bằng phép nhân; số dư luôn bé hơn số chia.',
  intro:
    'Có 216 khách du lịch đi thuyền, mỗi thuyền chở 12 người. Cần bao nhiêu chiếc thuyền? Em cùng học cách chia cho số có hai chữ số nhé!',
  objectives: [
    'Đặt tính rồi tính phép chia cho số có hai chữ số.',
    'Ước lượng chữ số của thương rồi thử để chọn đúng.',
    'Giải bài toán có phép chia cho số có hai chữ số.',
  ],
  sections: [
    {
      heading: 'Chia từng lượt',
      blocks: [
        { type: 'p', text: 'Em tính 216 : 12. Em chia từ trái sang phải.' },
        {
          type: 'table',
          head: ['Lượt', 'Em làm'],
          rows: [
            [
              'Lượt 1',
              '2 bé hơn 12, em lấy 21. 21 chia 12 được 1, viết 1. 1 nhân 12 bằng 12; 21 trừ 12 bằng 9.',
            ],
            [
              'Lượt 2',
              'Hạ 6, được 96. 96 chia 12 được 8, viết 8. 8 nhân 12 bằng 96; 96 trừ 96 bằng 0.',
            ],
          ],
        },
        { type: 'p', text: 'Vậy 216 : 12 = 18. Cần 18 chiếc thuyền.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia cho số có hai chữ số: chia lần lượt từ trái sang phải. Mỗi lượt: chia, nhân, trừ, rồi hạ chữ số tiếp theo.',
        },
      ],
    },
    {
      heading: 'Ước lượng thương',
      blocks: [
        {
          type: 'p',
          text: 'Khó nhất là tìm chữ số của thương. Em che chữ số cuối của số bị chia lượt đó và của số chia, rồi chia nhẩm.',
        },
        { type: 'p', text: '134 : 64, em che chữ số cuối: 13 : 6 được 2. Em thử 2.' },
        { type: 'p', text: '2 × 64 = 128; 134 − 128 = 6, bé hơn 64. Vậy chữ số đó là 2.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Nhân chữ số thử với số chia. Tích lớn hơn số đang chia: số thử quá lớn, em giảm đi 1. Hiệu còn lớn hơn hoặc bằng số chia: số thử quá bé, em tăng lên 1.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 779 : 18.' },
        {
          type: 'p',
          text: '77 chia 18: che chữ số cuối được 7 : 1 = 7. Thử 7, 6, 5 đều quá lớn. Thử 4: 4 × 18 = 72; 77 − 72 = 5. Viết 4.',
        },
        { type: 'p', text: 'Hạ 9, được 59. 59 chia 18 được 3: 3 × 18 = 54; 59 − 54 = 5. Viết 3.' },
        { type: 'p', text: 'Vậy 779 : 18 = 43 (dư 5). Thử lại: 43 × 18 + 5 = 779.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số dư luôn bé hơn số chia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử chọn thương',
    instruction:
      'Mỗi lượt, em đọc gợi ý ước lượng rồi chọn một chữ số để thử. Máy cho biết số đó quá lớn, quá bé hay đúng. Chọn đúng thì em hạ chữ số tiếp theo.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 672 : 21.',
      steps: [
        '67 chia 21: che chữ số cuối được 6 : 2 = 3. Thử 3: 3 × 21 = 63; 67 − 63 = 4. Viết 3.',
        'Hạ 2, được 42. 42 chia 21 được 2: 2 × 21 = 42; 42 − 42 = 0. Viết 2.',
      ],
      answer: '672 : 21 = 32.',
    },
    {
      problem: 'Đặt tính rồi tính: 10 105 : 43.',
      steps: [
        '1 và 10 đều bé hơn 43, em lấy 101. 101 chia 43 được 2: 2 × 43 = 86; 101 − 86 = 15.',
        'Hạ 0, được 150. 150 chia 43 được 3: 3 × 43 = 129; 150 − 129 = 21.',
        'Hạ 5, được 215. 215 chia 43 được 5: 5 × 43 = 215; 215 − 215 = 0.',
      ],
      answer: '10 105 : 43 = 235.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 672 : 21 = ?',
      answer: 32,
      hints: ['67 : 21, em ước lượng 6 : 2.', 'Hạ 2 được 42, rồi chia 42 cho 21.'],
      solution: '67 : 21 được 3, dư 4. Hạ 2 được 42; 42 : 21 được 2. Vậy 672 : 21 = 32.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 1 344 : 64 = ?',
      answer: 21,
      hints: ['13 bé hơn 64, em lấy 134.', '134 : 64, em ước lượng 13 : 6.'],
      solution:
        '134 : 64 được 2 (2 × 64 = 128), dư 6. Hạ 4 được 64; 64 : 64 được 1. Vậy 1 344 : 64 = 21.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của 218 : 18 là gì?',
      options: ['12 (dư 2)', '12', '11 (dư 20)', '13 (dư 2)'],
      answer: 0,
      hints: ['21 : 18 được 1, dư 3. Hạ 8 được 38.', 'Số dư phải bé hơn 18.'],
      solution:
        '21 : 18 được 1, dư 3. Hạ 8 được 38; 38 : 18 được 2, dư 2. Vậy 218 : 18 = 12 (dư 2). Thử lại: 12 × 18 + 2 = 218.',
    },
    {
      type: 'choice',
      prompt: 'Khi chia 134 cho 64, em che chữ số cuối được 13 : 6. Em thử chữ số nào trước?',
      options: ['2', '1', '3', '6'],
      answer: 0,
      hints: ['Em tính 13 : 6.'],
      solution: '13 : 6 được 2. Thử 2: 2 × 64 = 128, 134 − 128 = 6, bé hơn 64. Chữ số 2 đúng.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 7 975 : 25 = ?',
      answer: 319,
      hints: ['7 bé hơn 25, em lấy 79.', 'Có ba lượt chia, thương có ba chữ số.'],
      solution:
        '79 : 25 được 3, dư 4. Hạ 7 được 47; 47 : 25 được 1, dư 22. Hạ 5 được 225; 225 : 25 được 9. Vậy 7 975 : 25 = 319.',
    },
    {
      type: 'number',
      prompt: 'Trong phép chia cho 32, số dư lớn nhất có thể là bao nhiêu?',
      answer: 31,
      hints: ['Số dư luôn bé hơn số chia.'],
      solution: 'Số dư bé hơn 32, nên số dư lớn nhất là 31.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với thương của nó.',
      left: ['450 : 15', '684 : 36', '1 288 : 56', '9 045 : 45'],
      right: ['30', '19', '23', '201', '21'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em có thể thử lại bằng phép nhân: thương × số chia = số bị chia.'],
      solution: '30 × 15 = 450; 19 × 36 = 684; 23 × 56 = 1 288; 201 × 45 = 9 045.',
    },
    {
      type: 'number',
      prompt: 'Cô giáo chia đều 240 quyển vở cho 15 bạn. Mỗi bạn được bao nhiêu quyển vở?',
      answer: 16,
      unit: 'quyển',
      hints: ['Em tính 240 : 15.'],
      solution: '24 : 15 được 1, dư 9. Hạ 0 được 90; 90 : 15 được 6. Vậy mỗi bạn được 16 quyển vở.',
    },
    {
      type: 'number',
      prompt:
        'Có 500 cái bánh, xếp vào các hộp, mỗi hộp 12 cái. Xếp được nhiều nhất bao nhiêu hộp đầy?',
      answer: 41,
      unit: 'hộp',
      hints: ['Em tính 500 : 12.', 'Số bánh còn thừa không đủ một hộp.'],
      solution:
        '50 : 12 được 4, dư 2. Hạ 0 được 20; 20 : 12 được 1, dư 8. Vậy 500 : 12 = 41 (dư 8): xếp được 41 hộp, còn thừa 8 cái bánh.',
    },
  ],
  takeaways: [
    'Chia từ trái sang phải; mỗi lượt: chia, nhân, trừ, hạ.',
    'Ước lượng thương: che chữ số cuối của số đang chia và của số chia rồi chia nhẩm.',
    'Số dư luôn bé hơn số chia.',
  ],
};
