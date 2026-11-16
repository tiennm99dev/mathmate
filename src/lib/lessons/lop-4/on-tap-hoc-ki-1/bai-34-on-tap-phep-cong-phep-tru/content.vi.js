/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ: tính nhẩm số tròn, đặt tính rồi tính có nhớ, tính thuận tiện, biểu thức chứa chữ, tìm hai số biết tổng và hiệu, bài toán mua hàng.',
  intro:
    'Em đã biết cộng, trừ các số có nhiều chữ số và tính bằng cách thuận tiện. Hôm nay em ôn lại tất cả. Bài ôn tập sẽ hỏi thêm phần nào em còn sai nhé!',
  objectives: [
    'Tính nhẩm cộng, trừ các số tròn chục nghìn, tròn trăm nghìn, tròn triệu.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ.',
    'Dùng tính chất giao hoán, kết hợp để tính thuận tiện.',
    'Tính giá trị của biểu thức chứa chữ.',
    'Giải bài toán tìm hai số biết tổng và hiệu, bài toán mua hàng.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em viết các chữ số cùng hàng thẳng cột. Em tính từ hàng đơn vị, sang trái. Có nhớ thì nhớ 1 sang hàng bên trái.',
        },
        {
          type: 'p',
          text: 'Thử lại phép trừ: lấy hiệu cộng với số trừ, phải được số bị trừ.',
        },
      ],
    },
    {
      heading: 'Tính thuận tiện',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Viết là'],
          rows: [
            ['Giao hoán', 'a + b = b + a'],
            ['Kết hợp', '(a + b) + c = a + (b + c)'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo',
          text: 'Em tìm các số cộng lại được số tròn nghìn, tròn chục nghìn rồi cộng chúng trước.',
        },
      ],
    },
    {
      heading: 'Tìm hai số biết tổng và hiệu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số bé = (Tổng − Hiệu) : 2. Số lớn = (Tổng + Hiệu) : 2.',
        },
        {
          type: 'p',
          text: 'Tìm được số bé rồi, em có thể lấy số bé cộng với hiệu để được số lớn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Phép cộng, phép trừ có bảng đặt tính để em nhìn. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 359 816 + 284 175.',
      steps: [
        '6 cộng 5 bằng 11, viết 1, nhớ 1.',
        '1 cộng 7 bằng 8, thêm 1 bằng 9, viết 9.',
        '8 cộng 1 bằng 9, viết 9.',
        '9 cộng 4 bằng 13, viết 3, nhớ 1.',
        '5 cộng 8 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1.',
        '3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6.',
      ],
      answer: '359 816 + 284 175 = 643 991.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: 1 250 + 3 470 + 8 750 + 6 530.',
      steps: [
        'Em thấy 1 250 + 8 750 = 10 000 và 3 470 + 6 530 = 10 000.',
        'Đổi chỗ và nhóm các số hạng: (1 250 + 8 750) + (3 470 + 6 530).',
        '= 10 000 + 10 000 = 20 000.',
      ],
      answer: '1 250 + 3 470 + 8 750 + 6 530 = 20 000.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhẩm: 50 000 + 80 000 = ?',
      answer: 130000,
      hints: ['5 chục nghìn cộng 8 chục nghìn bằng bao nhiêu chục nghìn?'],
      solution: '5 chục nghìn + 8 chục nghìn = 13 chục nghìn. Vậy 50 000 + 80 000 = 130 000.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['30 000 + 50 000', '90 000 − 60 000', '200 000 + 400 000', '1 000 000 − 300 000'],
      right: ['80 000', '30 000', '600 000', '700 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em đếm theo chục nghìn hoặc trăm nghìn: 3 chục nghìn + 5 chục nghìn = 8 chục nghìn.',
      ],
      solution:
        '30 000 + 50 000 = 80 000; 90 000 − 60 000 = 30 000; 200 000 + 400 000 = 600 000; 1 000 000 − 300 000 = 700 000.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 235 709 + 408 232 = ?',
      options: ['643 941', '633 931', '643 931', '644 941'],
      answer: 0,
      hints: ['9 cộng 2 bằng 11, viết 1, nhớ 1. Đừng quên số nhớ ở các hàng sau.'],
      solution:
        '9 cộng 2 bằng 11, viết 1, nhớ 1. 0 cộng 3 bằng 3, thêm 1 bằng 4, viết 4. 7 cộng 2 bằng 9, viết 9. 5 cộng 8 bằng 13, viết 3, nhớ 1. 3 cộng 0 bằng 3, thêm 1 bằng 4, viết 4. 2 cộng 4 bằng 6, viết 6. Kết quả: 643 941.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 600 000 − 354 303 = ?',
      options: ['245 697', '354 303', '246 707', '355 697'],
      answer: 0,
      hints: ['0 không trừ được 3, lấy 10 trừ 3 bằng 7, viết 7, nhớ 1.'],
      solution:
        '0 không trừ được 3, lấy 10 trừ 3 bằng 7, viết 7, nhớ 1. 0 thêm 1 bằng 1, lấy 10 trừ 1 bằng 9, viết 9, nhớ 1. 3 thêm 1 bằng 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1. 4 thêm 1 bằng 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1. 5 thêm 1 bằng 6, lấy 10 trừ 6 bằng 4, viết 4, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Kết quả: 245 697. Thử lại: 245 697 + 354 303 = 600 000.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 3 720 + 4 900 + 6 280 = ?',
      answer: 14900,
      hints: ['Hai số nào cộng lại được 10 000?'],
      solution: '3 720 + 4 900 + 6 280 = (3 720 + 6 280) + 4 900 = 10 000 + 4 900 = 14 900.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức a + b − c với a = 52 300, b = 6 000, c = 700.',
      answer: 57600,
      hints: ['Em thay chữ bằng số rồi tính từ trái sang phải.'],
      solution: 'a + b − c = 52 300 + 6 000 − 700 = 58 300 − 700 = 57 600.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 52 300 + 15 500 ? 80 500 − 12 700',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Em tính kết quả của từng vế trước.'],
      solution:
        '52 300 + 15 500 = 67 800; 80 500 − 12 700 = 67 800. Hai kết quả bằng nhau nên chọn dấu =.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào đúng?',
      options: [
        '45 000 + 75 000 = 120 000',
        '83 000 − 8 000 = 75 000',
        '62 000 + 9 000 = 70 000',
        '100 000 − 1 = 99 999',
      ],
      answers: [0, 1, 3],
      hints: ['Em tính nhẩm lại từng phép tính theo nghìn.'],
      solution:
        '45 + 75 = 120 nghìn: đúng. 83 − 8 = 75 nghìn: đúng. 62 + 9 = 71 nghìn, không phải 70 nghìn: sai. 100 000 − 1 = 99 999: đúng.',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường sắt từ Hà Nội đến Đà Nẵng dài 791 km, đi qua Đồng Hới. Đoạn Hà Nội – Đồng Hới dài hơn đoạn Đồng Hới – Đà Nẵng 253 km. Đoạn Hà Nội – Đồng Hới dài bao nhiêu ki-lô-mét?',
      answer: 522,
      unit: 'km',
      hints: ['Tổng là 791, hiệu là 253. Đoạn Hà Nội – Đồng Hới là số lớn.'],
      solution:
        'Số lớn = (Tổng + Hiệu) : 2 = (791 + 253) : 2 = 1 044 : 2 = 522 (km). Đoạn Đồng Hới – Đà Nẵng dài 522 − 253 = 269 (km).',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 1 500, hiệu của chúng là 300. Số bé là bao nhiêu?',
      answer: 600,
      hints: ['Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Số bé = (1 500 − 300) : 2 = 1 200 : 2 = 600. Số lớn = 600 + 300 = 900.',
    },
    {
      type: 'number',
      prompt:
        'Mai đưa cô bán hàng tờ 200 000 đồng để mua một cái mũ giá 45 000 đồng và một con gấu bông giá 120 000 đồng. Cô bán hàng trả lại Mai bao nhiêu đồng?',
      answer: 35000,
      unit: 'đồng',
      hints: ['Em tính tiền mua cả hai thứ trước.'],
      solution:
        'Mua hai thứ hết: 45 000 + 120 000 = 165 000 (đồng). Cô trả lại: 200 000 − 165 000 = 35 000 (đồng).',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào có giá trị bằng 7 800 + 12 500?',
      options: ['12 500 + 7 800', '12 500 − 7 800', '7 800 + 1 250', '78 000 + 12 500'],
      answer: 0,
      hints: ['Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.'],
      solution: 'Theo tính chất giao hoán: 7 800 + 12 500 = 12 500 + 7 800 = 20 300.',
    },
  ],
  takeaways: [
    'Cộng, trừ: đặt các chữ số cùng hàng thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.',
    'a + b = b + a và (a + b) + c = a + (b + c): nhóm các số tròn để tính nhanh.',
    'Số bé = (Tổng − Hiệu) : 2; Số lớn = (Tổng + Hiệu) : 2.',
  ],
};
