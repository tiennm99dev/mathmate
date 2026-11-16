/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng hai số thập phân: đặt tính sao cho các chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy, cộng như cộng số tự nhiên rồi viết dấu phẩy ở tổng thẳng cột với các dấu phẩy.',
  intro:
    'Đoạn thẳng AB dài 1,84 m, đoạn thẳng BC dài 2,45 m. Đường gấp khúc ABC dài bao nhiêu mét? Em cùng học cách cộng hai số thập phân nhé.',
  objectives: [
    'Đặt tính và thực hiện được phép cộng hai số thập phân.',
    'Cộng được nhiều số thập phân, vận dụng tính chất giao hoán và kết hợp để tính thuận tiện.',
    'Giải được bài toán thực tế có phép cộng số thập phân.',
  ],
  sections: [
    {
      heading: 'Cộng hai số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Tính 1,84 + 2,45. Đổi ra xăng-ti-mét: 184 cm + 245 cm = 429 cm = 4,29 m.',
        },
        {
          type: 'p',
          text: 'Em đặt tính: 1,84 ở trên, 2,45 ở dưới, dấu phẩy thẳng dấu phẩy. Cộng như số tự nhiên được 429. Viết dấu phẩy ở tổng thẳng cột với các dấu phẩy: 4,29.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn cộng hai số thập phân, em làm như sau: viết số hạng này dưới số hạng kia sao cho các chữ số ở cùng một hàng đặt thẳng cột với nhau; cộng như cộng các số tự nhiên; viết dấu phẩy ở tổng thẳng cột với các dấu phẩy của các số hạng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Khi hai số có số chữ số ở phần thập phân khác nhau, như 45,08 và 24,7, em không đặt thẳng lề phải. Em đặt dấu phẩy thẳng dấu phẩy: chữ số 7 phần mười thẳng với chữ số 0 phần mười.',
        },
      ],
    },
    {
      heading: 'Tính chất và cộng nhiều số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phép cộng các số thập phân có tính chất giao hoán: đổi chỗ hai số hạng thì tổng không thay đổi, a + b = b + a.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phép cộng các số thập phân có tính chất kết hợp: (a + b) + c = a + (b + c).',
        },
        {
          type: 'p',
          text: 'Muốn cộng nhiều số thập phân, em đặt tính các số thẳng cột rồi cộng như cộng nhiều số tự nhiên. Khi tính nhẩm, em ghép các số có tổng tròn: 6,03 + 3,97 = 10.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Ghép cho tròn', 'Kết quả'],
          rows: [
            ['4,68 + 6,03 + 3,97', '4,68 + (6,03 + 3,97) = 4,68 + 10', '14,68'],
            ['2,6 + 3,7 + 1,3', '2,6 + (3,7 + 1,3) = 2,6 + 5', '7,6'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính cộng dọc',
    instruction:
      'Em chọn cách đặt tính đúng: dấu phẩy thẳng dấu phẩy. Bảng tự căn thẳng các hàng. Em chạm chữ số để viết tổng từ phải sang trái, rồi chọn chỗ đặt dấu phẩy ở tổng.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính 1,84 + 2,45.',
      steps: [
        'Viết 2,45 dưới 1,84, dấu phẩy thẳng dấu phẩy.',
        'Cộng như số tự nhiên: 4 cộng 5 bằng 9, viết 9; 8 cộng 4 bằng 12, viết 2, nhớ 1; 1 cộng 2 bằng 3, thêm 1 bằng 4, viết 4.',
        'Viết dấu phẩy ở tổng thẳng cột với các dấu phẩy: 4,29.',
      ],
      answer: '1,84 + 2,45 = 4,29. Đường gấp khúc ABC dài 4,29 m.',
    },
    {
      problem: 'Đặt tính rồi tính 15,9 + 8,75.',
      steps: [
        'Viết 8,75 dưới 15,9 sao cho dấu phẩy thẳng dấu phẩy. Hàng phần trăm của 15,9 để trống.',
        'Hạ 5, viết 5; 9 cộng 7 bằng 16, viết 6, nhớ 1; 5 cộng 8 bằng 13, thêm 1 bằng 14, viết 4, nhớ 1; hạ 1, thêm 1 bằng 2, viết 2.',
        'Viết dấu phẩy ở tổng thẳng cột với các dấu phẩy: 24,65.',
      ],
      answer: '15,9 + 8,75 = 24,65.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: 2,6 + 3,7 + 1,3.',
      steps: ['Dùng tính chất kết hợp, ghép 3,7 với 1,3: 3,7 + 1,3 = 5.', '2,6 + 5 = 7,6.'],
      answer: '2,6 + 3,7 + 1,3 = 7,6.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 23,75 + 8,42 = ?',
      answer: 32.17,
      hints: [
        'Đặt dấu phẩy thẳng dấu phẩy rồi cộng như số tự nhiên.',
        '5 cộng 2 bằng 7; 7 cộng 4 bằng 11, viết 1, nhớ 1.',
      ],
      solution: '2 375 + 842 = 3 217. Viết dấu phẩy thẳng cột: 23,75 + 8,42 = 32,17.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 0,36 + 5,8 = ?',
      answer: 6.16,
      hints: ['Chữ số 8 của 5,8 ở hàng phần mười, thẳng cột với chữ số 3 của 0,36.'],
      solution:
        'Hạ 6; 3 cộng 8 bằng 11, viết 1, nhớ 1; 0 cộng 5 bằng 5, thêm 1 bằng 6. Vậy 0,36 + 5,8 = 6,16.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Bi tính 12,5 + 3,47 và được 4,72. Bạn Bi sai ở đâu?',
      options: [
        'Bi đặt thẳng lề phải, dấu phẩy không thẳng cột',
        'Bi quên nhớ 1',
        'Bi cộng nhầm hàng phần trăm',
      ],
      answer: 0,
      hints: ['Thử đặt 12,5 và 3,47 thẳng lề phải rồi cộng như số tự nhiên: 125 + 347 bằng mấy?'],
      solution:
        'Đặt thẳng lề phải thì 125 + 347 = 472, ra 4,72: sai. Phải đặt dấu phẩy thẳng dấu phẩy: 12,5 + 3,47 = 15,97.',
    },
    {
      type: 'number',
      prompt: 'Tính đúng: 12,5 + 3,47 = ?',
      answer: 15.97,
      hints: ['Chữ số 5 của 12,5 thẳng cột với chữ số 4 của 3,47.'],
      solution: 'Hạ 7; 5 cộng 4 bằng 9; 2 cộng 3 bằng 5; hạ 1. Vậy 12,5 + 3,47 = 15,97.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép cộng với tổng của nó.',
      left: ['2,5 + 1,5', '0,7 + 0,3', '1,25 + 0,5', '3,4 + 0,06'],
      right: ['4', '1', '1,75', '3,46', '1,3'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đặt dấu phẩy thẳng dấu phẩy, ví dụ 1,25 + 0,50.'],
      solution: '2,5 + 1,5 = 4; 0,7 + 0,3 = 1; 1,25 + 0,5 = 1,75; 3,4 + 0,06 = 3,46.',
    },
    {
      type: 'choice',
      prompt: '3,8 + 4,57 = 4,57 + ...',
      options: ['3,8', '4,57', '8,37', '0,38'],
      answer: 0,
      hints: ['Đổi chỗ hai số hạng thì tổng không thay đổi.'],
      solution: 'Tính chất giao hoán: 3,8 + 4,57 = 4,57 + 3,8.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 4,68 + 6,03 + 3,97 = ?',
      answer: 14.68,
      hints: ['Ghép hai số có tổng là số tròn: 6,03 + 3,97.'],
      solution: '4,68 + (6,03 + 3,97) = 4,68 + 10 = 14,68.',
    },
    {
      type: 'number',
      prompt:
        'Con vịt cân nặng 2,7 kg. Con ngỗng nặng hơn con vịt 2,2 kg. Con ngỗng cân nặng bao nhiêu ki-lô-gam?',
      answer: 4.9,
      unit: 'kg',
      hints: ['Nặng hơn thì em làm phép cộng.'],
      solution: 'Con ngỗng cân nặng: 2,7 + 2,2 = 4,9 (kg).',
    },
    {
      type: 'choice',
      prompt:
        'Thùng thứ nhất có 28,4 l dầu, thùng thứ hai có 9,65 l dầu. Cả hai thùng có bao nhiêu lít dầu?',
      options: ['38,05 l', '37,05 l', '12,49 l', '3,805 l'],
      answer: 0,
      hints: ['Tính 28,4 + 9,65. Đặt dấu phẩy thẳng dấu phẩy, nhớ cẩn thận.'],
      solution:
        'Hạ 5; 4 cộng 6 bằng 10, viết 0, nhớ 1; 8 cộng 9 bằng 17, thêm 1 bằng 18, viết 8, nhớ 1; 2 thêm 1 bằng 3. Cả hai thùng có 38,05 l dầu.',
    },
  ],
  takeaways: [
    'Đặt tính: các chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy.',
    'Cộng như cộng các số tự nhiên, rồi viết dấu phẩy ở tổng thẳng cột với các dấu phẩy.',
    'Phép cộng số thập phân có tính chất giao hoán và kết hợp.',
  ],
};
