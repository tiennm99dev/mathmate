/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trừ hai số thập phân: đặt tính sao cho dấu phẩy thẳng dấu phẩy, viết thêm chữ số 0 vào phần thập phân của số bị trừ khi cần, trừ như trừ số tự nhiên rồi viết dấu phẩy ở hiệu thẳng cột.',
  intro:
    'Đường gấp khúc ABC dài 4,29 m, đoạn AB dài 1,84 m. Đoạn BC dài bao nhiêu mét? Em cùng học cách trừ hai số thập phân nhé.',
  objectives: [
    'Đặt tính và thực hiện được phép trừ hai số thập phân.',
    'Biết viết thêm chữ số 0 vào bên phải phần thập phân của số bị trừ khi cần.',
    'Giải được bài toán thực tế có phép trừ số thập phân.',
  ],
  sections: [
    {
      heading: 'Trừ hai số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Tính 4,29 − 1,84. Đổi ra xăng-ti-mét: 429 cm − 184 cm = 245 cm = 2,45 m.',
        },
        {
          type: 'p',
          text: 'Em đặt tính: 1,84 dưới 4,29, dấu phẩy thẳng dấu phẩy. Trừ như số tự nhiên được 245. Viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy: 2,45.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn trừ một số thập phân cho một số thập phân, em làm như sau: viết số trừ dưới số bị trừ sao cho các chữ số ở cùng một hàng đặt thẳng cột với nhau; trừ như trừ các số tự nhiên; viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy của số bị trừ và số trừ.',
        },
      ],
    },
    {
      heading: 'Viết thêm chữ số 0',
      blocks: [
        {
          type: 'p',
          text: 'Tính 45,8 − 19,26. Số bị trừ 45,8 chỉ có một chữ số ở phần thập phân, số trừ 19,26 có hai chữ số.',
        },
        {
          type: 'p',
          text: 'Em viết thêm một chữ số 0 vào bên phải 45,8 được 45,80. Số không thay đổi. Rồi em trừ: 45,80 − 19,26 = 26,54.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Nếu số chữ số ở phần thập phân của số bị trừ ít hơn số chữ số ở phần thập phân của số trừ, em viết thêm một số thích hợp chữ số 0 vào bên phải phần thập phân của số bị trừ, rồi trừ như trừ các số tự nhiên.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Viết số bị trừ thành', 'Hiệu'],
          rows: [
            ['45,8 − 19,26', '45,80', '26,54'],
            ['7 − 2,35', '7,00', '4,65'],
            ['5,2 − 1,47', '5,20', '3,73'],
          ],
        },
        {
          type: 'p',
          text: 'Trừ một số cho một tổng: a − b − c = a − (b + c). Ví dụ: 15,7 − 3,2 − 1,8 = 15,7 − 5 = 10,7.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt tính trừ dọc',
    instruction:
      'Em chọn cách đặt tính đúng. Bảng tự viết thêm chữ số 0 (màu xanh) vào số bị trừ khi cần. Em chạm chữ số để viết hiệu từ phải sang trái; chỗ nào phải mượn, số 1 đỏ hiện lên. Cuối cùng em đặt dấu phẩy ở hiệu.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính 4,29 − 1,84.',
      steps: [
        'Viết 1,84 dưới 4,29, dấu phẩy thẳng dấu phẩy.',
        '9 trừ 4 bằng 5, viết 5; 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, nhớ 1; 1 thêm 1 bằng 2, 4 trừ 2 bằng 2, viết 2.',
        'Viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy: 2,45.',
      ],
      answer: '4,29 − 1,84 = 2,45. Đoạn BC dài 2,45 m.',
    },
    {
      problem: 'Đặt tính rồi tính 45,8 − 19,26.',
      steps: [
        'Viết thêm chữ số 0 vào bên phải 45,8 được 45,80. Viết 19,26 dưới, dấu phẩy thẳng dấu phẩy.',
        '0 không trừ được 6, lấy 10 trừ 6 bằng 4, viết 4, nhớ 1; 2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5.',
        '5 không trừ được 9, lấy 15 trừ 9 bằng 6, viết 6, nhớ 1; 1 thêm 1 bằng 2, 4 trừ 2 bằng 2, viết 2.',
        'Viết dấu phẩy ở hiệu thẳng cột: 26,54.',
      ],
      answer: '45,8 − 19,26 = 26,54.',
    },
    {
      problem: 'Đặt tính rồi tính 7 − 2,35.',
      steps: [
        'Viết 7 thành 7,00 để có hai chữ số ở phần thập phân như 2,35.',
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1; 3 thêm 1 bằng 4, 0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1; 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4.',
        'Viết dấu phẩy ở hiệu: 4,65.',
      ],
      answer: '7 − 2,35 = 4,65.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 68,4 − 25,7 = ?',
      answer: 42.7,
      hints: ['4 không trừ được 7, em lấy 14 trừ 7 và nhớ 1.'],
      solution:
        '14 trừ 7 bằng 7, viết 7, nhớ 1; 5 thêm 1 bằng 6, 8 trừ 6 bằng 2; 6 trừ 2 bằng 4. Vậy 68,4 − 25,7 = 42,7.',
    },
    {
      type: 'choice',
      prompt: 'Để tính 8,5 − 3,27, em viết số bị trừ 8,5 thành số nào?',
      options: ['8,50', '85,0', '8,05', '0,85'],
      answer: 0,
      hints: ['Viết thêm chữ số 0 vào bên phải phần thập phân thì số không thay đổi.'],
      solution: '3,27 có hai chữ số ở phần thập phân, nên em viết 8,5 thành 8,50.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 46,8 − 9,34 = ?',
      answer: 37.46,
      hints: ['Viết 46,8 thành 46,80.', '0 không trừ được 4, lấy 10 trừ 4.'],
      solution:
        '46,80 − 9,34: 10 trừ 4 bằng 6, nhớ 1; 3 thêm 1 bằng 4, 8 trừ 4 bằng 4; 6 không trừ được 9, lấy 16 trừ 9 bằng 7, nhớ 1; 4 trừ 1 bằng 3. Vậy 46,8 − 9,34 = 37,46.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 12 − 4,75 = ?',
      answer: 7.25,
      hints: ['Viết 12 thành 12,00.'],
      solution: '12,00 − 4,75 = 7,25.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 9,6 − 2,45 = ?',
      answer: 7.15,
      hints: ['Viết 9,6 thành 9,60 rồi trừ, nhớ cẩn thận.'],
      solution:
        '10 trừ 5 bằng 5, viết 5, nhớ 1; 4 thêm 1 bằng 5, 6 trừ 5 bằng 1; 9 trừ 2 bằng 7. Vậy 9,6 − 2,45 = 7,15.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép trừ với hiệu của nó.',
      left: ['5 − 0,5', '1 − 0,25', '3,6 − 1,6', '10 − 0,1'],
      right: ['4,5', '0,75', '2', '9,9', '4,95'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Viết thêm chữ số 0 cho số bị trừ: 5 = 5,0; 1 = 1,00; 10 = 10,0.'],
      solution: '5 − 0,5 = 4,5; 1 − 0,25 = 0,75; 3,6 − 1,6 = 2; 10 − 0,1 = 9,9.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 15,7 − 3,2 − 1,8 = ?',
      answer: 10.7,
      hints: ['Trừ một số cho một tổng: 15,7 − (3,2 + 1,8).'],
      solution: '15,7 − 3,2 − 1,8 = 15,7 − (3,2 + 1,8) = 15,7 − 5 = 10,7.',
    },
    {
      type: 'number',
      prompt: 'Sợi dây dài 3,5 m. Em cắt đi 1,85 m. Sợi dây còn lại dài bao nhiêu mét?',
      answer: 1.65,
      unit: 'm',
      hints: ['Tính 3,5 − 1,85. Viết 3,5 thành 3,50.'],
      solution: 'Sợi dây còn lại dài: 3,50 − 1,85 = 1,65 (m).',
    },
    {
      type: 'choice',
      prompt: 'Bao gạo nặng 50 kg. Người bán đã bán 12,75 kg. Bao gạo còn lại bao nhiêu ki-lô-gam?',
      options: ['37,25 kg', '38,25 kg', '37,75 kg', '62,75 kg'],
      answer: 0,
      hints: ['Viết 50 thành 50,00 rồi trừ 12,75.'],
      solution: 'Số gạo còn lại: 50,00 − 12,75 = 37,25 (kg).',
    },
  ],
  takeaways: [
    'Đặt tính: dấu phẩy thẳng dấu phẩy, các chữ số cùng hàng thẳng cột.',
    'Số bị trừ có ít chữ số ở phần thập phân hơn thì viết thêm chữ số 0 vào bên phải.',
    'Trừ như trừ các số tự nhiên, rồi viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy.',
  ],
};
