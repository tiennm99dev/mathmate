/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập một số yếu tố thống kê và xác suất: đọc và sắp xếp số liệu, đọc biểu đồ cột, tìm số trung bình cộng, đọc bảng kiểm đếm và số lần xuất hiện của một sự kiện.',
  intro:
    'Đội bóng chuyền của trường có 6 bạn. Ai cao nhất? Câu lạc bộ nào đông nhất? Rô-bốt lấy bóng 30 lần, màu nào ra nhiều nhất? Em cùng ôn lại cách đọc số liệu nhé!',
  objectives: [
    'Đọc, so sánh và sắp xếp các số liệu trong bảng.',
    'Đọc biểu đồ cột, tìm cột cao nhất, thấp nhất và số trung bình cộng.',
    'Đọc bảng kiểm đếm, tìm số lần xuất hiện của một sự kiện.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Bảng số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Chiều cao của 6 bạn trong đội bóng chuyền được ghi trong bảng.',
        },
        {
          type: 'table',
          head: ['Tên', 'Chiều cao (cm)'],
          rows: [
            ['Thắng', '180'],
            ['Hùng', '175'],
            ['Bình', '182'],
            ['Trung', '178'],
            ['Lợi', '168'],
            ['Dũng', '185'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn sắp xếp các bạn từ thấp đến cao, em xếp các số đo từ bé đến lớn.',
        },
        {
          type: 'p',
          text: 'Hùng, Trung, Thắng, Bình xếp từ thấp đến cao: 175 cm, 178 cm, 180 cm, 182 cm.',
        },
      ],
    },
    {
      heading: 'Biểu đồ cột',
      blocks: [
        {
          type: 'p',
          text: 'Biểu đồ cột cho biết số học sinh tham gia mỗi câu lạc bộ: Bơi 60, Võ 45, Cờ 30, Múa 45.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cột cao hơn biểu diễn số lớn hơn. Hai cột cao bằng nhau biểu diễn hai số bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số trung bình cộng: em cộng các số lại, rồi chia cho số các số hạng.',
        },
        {
          type: 'p',
          text: 'Trung bình mỗi câu lạc bộ có: (60 + 45 + 30 + 45) : 4 = 45 (học sinh).',
        },
      ],
    },
    {
      heading: 'Số lần xuất hiện của một sự kiện',
      blocks: [
        {
          type: 'p',
          text: 'Trong hộp có 1 quả bóng đỏ, 1 quả bóng vàng, 1 quả bóng xanh. Rô-bốt lấy ra một quả bóng, ghi lại màu rồi trả bóng vào hộp. Rô-bốt làm như vậy 30 lần.',
        },
        {
          type: 'table',
          head: ['Màu bóng', 'Kiểm đếm', 'Số lần'],
          rows: [
            ['Đỏ', '2 bó 5 vạch', '10'],
            ['Xanh', '2 bó 5 vạch và 2 vạch', '12'],
            ['Vàng', '1 bó 5 vạch và 3 vạch', '8'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đếm số vạch của một hàng để biết số lần xuất hiện của sự kiện đó. Cộng số lần của các màu được số lần lấy bóng: 10 + 12 + 8 = 30.',
        },
        {
          type: 'p',
          text: 'Bóng xanh xuất hiện nhiều lần nhất. Bóng vàng xuất hiện ít lần nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi câu có một bảng số liệu, một biểu đồ cột hoặc một bảng kiểm đếm. Mỗi phần được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Chiều cao của 6 bạn: Thắng 180 cm, Hùng 175 cm, Bình 182 cm, Trung 178 cm, Lợi 168 cm, Dũng 185 cm. Bạn nào thấp hơn Hùng? Bạn nào cao hơn Bình? Trung bình mỗi bạn cao bao nhiêu xăng-ti-mét?',
      steps: [
        'Chỉ có 168 bé hơn 175, nên Lợi thấp hơn Hùng.',
        'Chỉ có 185 lớn hơn 182, nên Dũng cao hơn Bình.',
        'Tổng chiều cao: 180 + 175 + 182 + 178 + 168 + 185 = 1 068 (cm).',
        'Trung bình: 1 068 : 6 = 178 (cm).',
      ],
      answer: 'Lợi thấp hơn Hùng, Dũng cao hơn Bình. Trung bình mỗi bạn cao 178 cm.',
    },
    {
      problem:
        'Biểu đồ cột: câu lạc bộ Bơi có 60 học sinh, Võ có 45, Cờ có 30, Múa có 45. Câu lạc bộ nào đông nhất, ít nhất? Hai câu lạc bộ nào có số học sinh bằng nhau? Trung bình mỗi câu lạc bộ có bao nhiêu học sinh?',
      steps: [
        'Cột Bơi cao nhất (60): câu lạc bộ Bơi có nhiều học sinh nhất.',
        'Cột Cờ thấp nhất (30): câu lạc bộ Cờ có ít học sinh nhất.',
        'Cột Võ và cột Múa cao bằng nhau (45 học sinh).',
        'Trung bình: (60 + 45 + 30 + 45) : 4 = 180 : 4 = 45 (học sinh).',
      ],
      answer:
        'Bơi đông nhất, Cờ ít nhất, Võ và Múa bằng nhau. Trung bình mỗi câu lạc bộ có 45 học sinh.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt:
        'Chiều cao: Thắng 180 cm, Hùng 175 cm, Bình 182 cm, Trung 178 cm. Xếp tên các bạn từ thấp đến cao.',
      items: ['Thắng', 'Hùng', 'Bình', 'Trung'],
      answer: [1, 3, 0, 2],
      hints: ['Em xếp các số đo từ bé đến lớn.', 'Số bé nhất là 175, của Hùng.'],
      solution: '175 < 178 < 180 < 182. Từ thấp đến cao: Hùng, Trung, Thắng, Bình.',
    },
    {
      type: 'choice',
      prompt:
        'Chiều cao: Thắng 180 cm, Hùng 175 cm, Bình 182 cm, Trung 178 cm, Lợi 168 cm, Dũng 185 cm. Bạn nào thấp hơn Hùng?',
      options: ['Lợi', 'Trung', 'Thắng', 'Dũng'],
      answer: 0,
      hints: ['Hùng cao 175 cm. Em tìm số bé hơn 175.'],
      solution: 'Chỉ có 168 bé hơn 175. Lợi thấp hơn Hùng.',
    },
    {
      type: 'choice',
      prompt:
        'Chiều cao: Thắng 180 cm, Hùng 175 cm, Bình 182 cm, Trung 178 cm, Lợi 168 cm, Dũng 185 cm. Bạn nào cao hơn Bình?',
      options: ['Dũng', 'Thắng', 'Trung', 'Lợi'],
      answer: 0,
      hints: ['Bình cao 182 cm. Em tìm số lớn hơn 182.'],
      solution: 'Chỉ có 185 lớn hơn 182. Dũng cao hơn Bình.',
    },
    {
      type: 'number',
      prompt:
        'Chiều cao: Thắng 180 cm, Hùng 175 cm, Bình 182 cm, Trung 178 cm, Lợi 168 cm, Dũng 185 cm. Trung bình mỗi bạn cao bao nhiêu xăng-ti-mét?',
      answer: 178,
      unit: 'cm',
      hints: ['Em cộng chiều cao của 6 bạn.', 'Lấy tổng chia cho 6.'],
      solution:
        '180 + 175 + 182 + 178 + 168 + 185 = 1 068. 1 068 : 6 = 178. Trung bình mỗi bạn cao 178 cm.',
    },
    {
      type: 'choice',
      prompt:
        'Biểu đồ cột: Bơi 60 học sinh, Võ 45 học sinh, Cờ 30 học sinh, Múa 45 học sinh. Câu lạc bộ nào có ít học sinh nhất?',
      options: ['Cờ', 'Bơi', 'Võ', 'Múa'],
      answer: 0,
      hints: ['Cột thấp nhất biểu diễn số bé nhất.'],
      solution: 'Số bé nhất là 30, của câu lạc bộ Cờ. Câu lạc bộ Cờ có ít học sinh nhất.',
    },
    {
      type: 'multi',
      prompt:
        'Biểu đồ cột: Bơi 60 học sinh, Võ 45 học sinh, Cờ 30 học sinh, Múa 45 học sinh. Chọn hai câu lạc bộ có số học sinh bằng nhau.',
      options: ['Võ', 'Múa', 'Bơi', 'Cờ'],
      answers: [0, 1],
      hints: ['Hai cột cao bằng nhau biểu diễn hai số bằng nhau.'],
      solution:
        'Võ có 45 học sinh, Múa cũng có 45 học sinh. Hai câu lạc bộ này có số học sinh bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ cột: Bơi 60 học sinh, Võ 45 học sinh, Cờ 30 học sinh, Múa 45 học sinh. Câu lạc bộ Bơi có nhiều hơn câu lạc bộ Cờ bao nhiêu học sinh?',
      answer: 30,
      unit: 'học sinh',
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: '60 − 30 = 30. Câu lạc bộ Bơi có nhiều hơn câu lạc bộ Cờ 30 học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ cột: Bơi 60 học sinh, Võ 45 học sinh, Cờ 30 học sinh, Múa 45 học sinh. Trung bình mỗi câu lạc bộ có bao nhiêu học sinh?',
      answer: 45,
      unit: 'học sinh',
      hints: ['Em cộng số học sinh của 4 câu lạc bộ.', 'Lấy tổng chia cho 4.'],
      solution: '(60 + 45 + 30 + 45) : 4 = 180 : 4 = 45 (học sinh).',
    },
    {
      type: 'match',
      prompt: 'Bảng kiểm đếm khi Rô-bốt lấy bóng. Nối mỗi hàng vạch với số lần.',
      left: ['2 bó 5 vạch', '2 bó 5 vạch và 2 vạch', '1 bó 5 vạch và 3 vạch'],
      right: ['10 lần', '12 lần', '8 lần', '7 lần'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Mỗi bó có 5 vạch. Em đếm 5, 10, … rồi đếm thêm các vạch lẻ.'],
      solution: '5 + 5 = 10. 5 + 5 + 2 = 12. 5 + 3 = 8.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt lấy bóng 30 lần: bóng đỏ 10 lần, bóng xanh 12 lần, bóng vàng 8 lần. Màu nào xuất hiện ít lần nhất?',
      options: ['Bóng vàng', 'Bóng đỏ', 'Bóng xanh'],
      answer: 0,
      hints: ['Em tìm số bé nhất trong ba số 10, 12, 8.'],
      solution: '8 < 10 < 12. Bóng vàng xuất hiện ít lần nhất (8 lần).',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt lấy bóng 30 lần: bóng đỏ 10 lần, bóng xanh 12 lần, còn lại là bóng vàng. Bóng vàng xuất hiện bao nhiêu lần?',
      answer: 8,
      unit: 'lần',
      hints: ['Số lần của ba màu cộng lại bằng 30.'],
      solution: '30 − 10 − 12 = 8. Bóng vàng xuất hiện 8 lần.',
    },
    {
      type: 'multi',
      prompt:
        'Trong hộp có 1 quả bóng đỏ, 1 quả bóng vàng, 1 quả bóng xanh. Rô-bốt lấy ra một quả bóng. Chọn các sự kiện có thể xảy ra.',
      options: [
        'Lấy được bóng đỏ',
        'Lấy được bóng vàng',
        'Lấy được bóng xanh',
        'Lấy được bóng tím',
      ],
      answers: [0, 1, 2],
      hints: ['Trong hộp không có màu nào thì không thể lấy được bóng màu đó.'],
      solution:
        'Lấy được bóng đỏ, vàng hoặc xanh đều có thể xảy ra. Trong hộp không có bóng tím, nên không thể lấy được bóng tím.',
    },
  ],
  takeaways: [
    'Muốn sắp xếp số liệu, em so sánh các số rồi xếp từ bé đến lớn hoặc từ lớn đến bé.',
    'Trên biểu đồ cột, cột cao hơn biểu diễn số lớn hơn.',
    'Số trung bình cộng = tổng các số : số các số hạng.',
    'Đếm số vạch kiểm đếm để biết số lần xuất hiện của một sự kiện.',
  ],
};
