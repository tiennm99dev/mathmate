/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về một số yếu tố thống kê và xác suất: sắp xếp, đọc bảng số liệu, đọc biểu đồ hình quạt tròn, tính tỉ số phần trăm, viết tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện và nhận biết sự kiện chắc chắn, có thể, không thể xảy ra.',
  intro:
    'Gieo xúc xắc, tung đồng xu, hỏi các bạn thích môn thể thao nào: em thu được rất nhiều số liệu. Hôm nay em ôn lại cách đọc, sắp xếp số liệu và đoán khả năng xảy ra nhé!',
  objectives: [
    'Sắp xếp được số liệu; đọc được bảng số liệu.',
    'Đọc được biểu đồ hình quạt tròn và tính được số lượng của từng phần.',
    'Viết được tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện.',
    'Nhận biết được sự kiện chắc chắn, có thể, không thể xảy ra.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số liệu và bảng',
      blocks: [
        {
          type: 'p',
          text: 'Việt gieo một con xúc xắc 30 lần và ghi kết quả vào bảng.',
        },
        {
          type: 'table',
          head: ['Mặt xúc xắc', 'Số lần'],
          rows: [
            ['Mặt 1 chấm', '5'],
            ['Mặt 2 chấm', '8'],
            ['Mặt 3 chấm', '5'],
            ['Mặt 4 chấm', '6'],
            ['Mặt 5 chấm', '4'],
            ['Mặt 6 chấm', '2'],
          ],
        },
        {
          type: 'p',
          text: 'Mặt 2 chấm xuất hiện nhiều nhất (8 lần). Mặt 6 chấm xuất hiện ít nhất (2 lần).',
        },
      ],
    },
    {
      heading: 'Biểu đồ hình quạt tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cả hình tròn ứng với 100%. Hình quạt nào to hơn thì phần đó nhiều hơn.',
        },
        {
          type: 'p',
          text: 'Số lượng của một phần = Tổng số × Tỉ số phần trăm : 100. Ví dụ: 40 bạn, có 35% thích bơi, thì số bạn thích bơi là 40 × 35 : 100 = 14 (bạn).',
        },
      ],
    },
    {
      heading: 'Tỉ số và khả năng xảy ra',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện = Số lần sự kiện xảy ra : Tổng số lần thực hiện.',
        },
        {
          type: 'p',
          text: 'Mai tung đồng xu 29 lần, có 10 lần được mặt sấp. Tỉ số của số lần được mặt sấp so với tổng số lần tung là 10 : 29 hay 10/29.',
        },
        {
          type: 'table',
          head: ['Gieo hai con xúc xắc', 'Khả năng'],
          rows: [
            ['Tổng số chấm lớn hơn 1 và bé hơn 13', 'Chắc chắn'],
            ['Tổng số chấm là số lẻ', 'Có thể'],
            ['Tổng số chấm là 1', 'Không thể'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Biểu đồ hình quạt tròn cho biết môn thể thao yêu thích của 40 bạn lớp 5A: bóng đá 40%, bơi 35%, cờ vua 25%. Môn nào được yêu thích nhất? Có bao nhiêu bạn thích bơi?',
      steps: [
        'So sánh: 40% > 35% > 25%. Bóng đá được yêu thích nhất.',
        'Số bạn thích bơi là: 40 × 35 : 100 = 14 (bạn).',
      ],
      answer: 'Bóng đá được yêu thích nhất. Có 14 bạn thích bơi.',
    },
    {
      problem:
        'Hộp có 3 quả bóng vàng và 2 quả bóng đỏ. Lấy ra cùng lúc 3 quả. Sự kiện "cả 3 quả đều màu đỏ" xảy ra như thế nào?',
      steps: ['Hộp chỉ có 2 quả bóng đỏ.', 'Lấy 3 quả thì không thể được cả 3 quả màu đỏ.'],
      answer: 'Sự kiện đó không thể xảy ra.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Gieo hai con xúc xắc. Sự kiện "tổng số chấm là số lẻ" xảy ra như thế nào?',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 1,
      hints: ['Tổng có thể là 3 (1 và 2) không? Có thể là 2 (1 và 1) không?'],
      solution:
        'Tổng có thể là số lẻ (1 + 2 = 3), cũng có thể là số chẵn (1 + 1 = 2). Sự kiện có thể xảy ra.',
    },
    {
      type: 'choice',
      prompt: 'Gieo hai con xúc xắc. Sự kiện "tổng số chấm là 1" xảy ra như thế nào?',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 2,
      hints: ['Mỗi con xúc xắc có ít nhất mấy chấm?'],
      solution: 'Mỗi con có ít nhất 1 chấm, nên tổng ít nhất là 2. Sự kiện không thể xảy ra.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo hai con xúc xắc. Sự kiện "tổng số chấm lớn hơn 1 và bé hơn 13" xảy ra như thế nào?',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 0,
      hints: ['Tổng bé nhất là bao nhiêu? Tổng lớn nhất là bao nhiêu?'],
      solution: 'Tổng bé nhất là 2, lớn nhất là 12. Sự kiện chắc chắn xảy ra.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có 3 quả bóng vàng và 2 quả bóng đỏ. Lấy ra cùng lúc 3 quả. Khả năng nào không thể xảy ra?',
      options: [
        'Cả 3 quả màu đỏ',
        'Cả 3 quả màu vàng',
        'Có 2 quả đỏ và 1 quả vàng',
        'Có 1 quả đỏ và 2 quả vàng',
      ],
      answer: 0,
      hints: ['Hộp có mấy quả bóng đỏ?'],
      solution: 'Hộp chỉ có 2 quả đỏ, nên không thể lấy được cả 3 quả màu đỏ.',
    },
    {
      type: 'number',
      prompt:
        'Việt gieo xúc xắc: mặt 1 chấm 5 lần, mặt 2 chấm 8 lần, mặt 3 chấm 5 lần, mặt 4 chấm 6 lần, mặt 5 chấm 4 lần, mặt 6 chấm 2 lần. Việt đã gieo xúc xắc bao nhiêu lần?',
      answer: 30,
      unit: 'lần',
      hints: ['Em cộng số lần của cả sáu mặt.'],
      solution: '5 + 8 + 5 + 6 + 4 + 2 = 30. Việt đã gieo 30 lần.',
    },
    {
      type: 'choice',
      prompt: 'Với kết quả gieo xúc xắc ở câu trên, mặt nào xuất hiện ít nhất?',
      options: ['Mặt 6 chấm', 'Mặt 5 chấm', 'Mặt 1 chấm', 'Mặt 2 chấm'],
      answer: 0,
      hints: ['Tìm số lần bé nhất.'],
      solution: 'Số lần bé nhất là 2, của mặt 6 chấm.',
    },
    {
      type: 'fraction',
      prompt:
        'Mai tung hai đồng xu cùng lúc 29 lần: 10 lần được hai mặt sấp, 8 lần được hai mặt ngửa, 11 lần được một mặt sấp và một mặt ngửa. Viết tỉ số của số lần được hai mặt ngửa so với tổng số lần tung.',
      answer: [8, 29],
      hints: ['Tử số là số lần được hai mặt ngửa. Mẫu số là tổng số lần tung.'],
      solution: 'Tỉ số là 8 : 29 hay 8/29.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5A có 40 bạn. Biểu đồ hình quạt tròn cho biết 35% số bạn thích bơi. Có bao nhiêu bạn thích bơi?',
      answer: 14,
      unit: 'bạn',
      hints: ['Số bạn = Tổng số bạn × Tỉ số phần trăm : 100.'],
      solution: '40 × 35 : 100 = 14 (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ hình quạt tròn có bốn phần: bóng đá 40%, cầu lông 25%, bơi 20% và cờ vua. Phần cờ vua chiếm bao nhiêu phần trăm?',
      answer: 15,
      unit: '%',
      hints: ['Cả hình tròn ứng với 100%.'],
      solution: '100% − 40% − 25% − 20% = 15%.',
    },
    {
      type: 'number',
      prompt:
        'Đội tuyển có 50 bạn thi Hội khoẻ Phù Đổng, trong đó 18 bạn thi cờ vua. Số bạn thi cờ vua chiếm bao nhiêu phần trăm số bạn của đội?',
      answer: 36,
      unit: '%',
      hints: ['Tìm thương 18 : 50, rồi nhân với 100.'],
      solution: '18 : 50 = 0,36 = 36%.',
    },
    {
      type: 'order',
      prompt: 'Khối lượng rác các loại mà lớp em thu gom được. Sắp xếp theo thứ tự từ bé đến lớn.',
      items: ['12,5 kg', '8,75 kg', '15 kg', '9,8 kg'],
      answer: [1, 3, 0, 2],
      hints: ['So sánh phần nguyên trước, rồi đến phần thập phân.'],
      solution: '8,75 kg < 9,8 kg < 12,5 kg < 15 kg.',
    },
    {
      type: 'match',
      prompt: 'Hộp chỉ có 4 quả bóng xanh. Lấy ra 1 quả. Nối mỗi sự kiện với khả năng xảy ra.',
      left: ['Lấy được bóng xanh', 'Lấy được bóng đỏ'],
      right: ['Chắc chắn', 'Không thể', 'Có thể'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Trong hộp có quả bóng màu nào?'],
      solution:
        'Hộp chỉ có bóng xanh: lấy được bóng xanh là chắc chắn, lấy được bóng đỏ là không thể.',
    },
  ],
  takeaways: [
    'Cả hình tròn của biểu đồ hình quạt ứng với 100%.',
    'Số lượng một phần = Tổng số × Tỉ số phần trăm : 100.',
    'Tỉ số của số lần lặp lại = Số lần xảy ra : Tổng số lần thực hiện.',
    'Một sự kiện có thể chắc chắn, có thể hoặc không thể xảy ra.',
  ],
};
