/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chia số thập phân cho số tự nhiên, chia số tự nhiên cho số tự nhiên mà thương là số thập phân, chia cho số thập phân bằng cách dời dấu phẩy để số chia thành số tự nhiên.',
  intro:
    'Sợi dây dài 8,4 m được cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu mét? Em cùng học cách chia số thập phân nhé.',
  objectives: [
    'Chia được một số thập phân cho một số tự nhiên.',
    'Chia được số tự nhiên cho số tự nhiên khi thương là số thập phân.',
    'Chia được một số tự nhiên hoặc một số thập phân cho một số thập phân.',
  ],
  sections: [
    {
      heading: 'Chia một số thập phân cho một số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Tính 8,4 : 4. Đổi 8,4 m = 84 dm. 84 dm : 4 = 21 dm = 2,1 m. Vậy 8,4 : 4 = 2,1.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia một số thập phân cho một số tự nhiên, em làm như sau: chia phần nguyên của số bị chia cho số chia; viết dấu phẩy vào bên phải thương đã tìm được trước khi lấy chữ số đầu tiên ở phần thập phân của số bị chia để tiếp tục chia; tiếp tục chia với từng chữ số ở phần thập phân của số bị chia.',
        },
        {
          type: 'p',
          text: 'Nếu phần nguyên bé hơn số chia, thương có phần nguyên là 0: 0,85 : 5 = 0,17.',
        },
      ],
    },
    {
      heading: 'Chia số tự nhiên cho số tự nhiên, thương là số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Tính 23 : 4. Chia được 5, còn dư 3. Em chưa dừng lại mà chia tiếp.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi chia số tự nhiên cho số tự nhiên còn dư, em có thể chia tiếp: viết dấu phẩy vào bên phải thương; viết thêm vào bên phải số dư một chữ số 0 rồi chia tiếp. Nếu vẫn còn dư, em lại viết thêm chữ số 0 vào bên phải số dư mới rồi chia tiếp.',
        },
        {
          type: 'table',
          head: ['Bước', 'Em làm', 'Thương'],
          rows: [
            ['1', '23 chia 4 được 5, dư 3', '5'],
            ['2', 'Viết dấu phẩy vào thương', '5,'],
            ['3', 'Viết 0 vào sau 3 được 30; 30 chia 4 được 7, dư 2', '5,7'],
            ['4', 'Viết 0 vào sau 2 được 20; 20 chia 4 được 5, dư 0', '5,75'],
          ],
        },
      ],
    },
    {
      heading: 'Chia cho một số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia một số tự nhiên cho một số thập phân, em đếm xem phần thập phân của số chia có bao nhiêu chữ số thì viết thêm vào bên phải số bị chia bấy nhiêu chữ số 0; bỏ dấu phẩy ở số chia rồi chia như chia các số tự nhiên.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 7 : 3,5. Số chia có một chữ số ở phần thập phân. Viết 7 thành 70, bỏ dấu phẩy ở 3,5 được 35. 70 : 35 = 2. Vậy 7 : 3,5 = 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia một số thập phân cho một số thập phân, em đếm xem phần thập phân của số chia có bao nhiêu chữ số thì chuyển dấu phẩy ở số bị chia sang bên phải bấy nhiêu chữ số; bỏ dấu phẩy ở số chia rồi chia như chia số thập phân cho số tự nhiên.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 48,3 : 3,5. Chuyển dấu phẩy của 48,3 sang phải một chữ số được 483, bỏ dấu phẩy ở 3,5 được 35. 483 : 35 = 13,8.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phép chia có dời dấu phẩy',
    instruction:
      'Khi số chia là số thập phân, em chọn số chữ số cần dời và xem dấu phẩy trượt sang phải. Rồi em chia: chạm chữ số của thương, hoặc nút "Viết dấu phẩy" khi đến lúc.',
  },
  examples: [
    {
      problem: 'Sợi dây dài 8,4 m cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu mét?',
      steps: [
        'Tính 8,4 : 4.',
        '8 chia 4 được 2, viết 2; 2 nhân 4 bằng 8; 8 trừ 8 bằng 0.',
        'Viết dấu phẩy vào bên phải 2 ở thương. Hạ 4; 4 chia 4 được 1, viết 1; 1 nhân 4 bằng 4; 4 trừ 4 bằng 0.',
      ],
      answer: '8,4 : 4 = 2,1. Mỗi đoạn dài 2,1 m.',
    },
    {
      problem: 'Đặt tính rồi tính 23 : 4.',
      steps: [
        '23 chia 4 được 5, viết 5; 5 nhân 4 bằng 20; 23 trừ 20 bằng 3.',
        'Viết dấu phẩy vào bên phải 5. Viết 0 vào bên phải 3 được 30; 30 chia 4 được 7, dư 2.',
        'Viết 0 vào bên phải 2 được 20; 20 chia 4 được 5, dư 0.',
      ],
      answer: '23 : 4 = 5,75.',
    },
    {
      problem: 'Đặt tính rồi tính 48,3 : 3,5.',
      steps: [
        'Số chia 3,5 có một chữ số ở phần thập phân. Chuyển dấu phẩy ở 48,3 sang phải một chữ số được 483; bỏ dấu phẩy ở 3,5 được 35.',
        '48 chia 35 được 1, dư 13. Hạ 3 được 133; 133 chia 35 được 3, dư 28.',
        'Viết dấu phẩy vào thương. Viết 0 vào bên phải 28 được 280; 280 chia 35 được 8, dư 0.',
      ],
      answer: '48,3 : 3,5 = 13,8.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 9,6 : 4 = ?',
      answer: 2.4,
      hints: ['9 chia 4 được 2, dư 1. Viết dấu phẩy rồi hạ 6.'],
      solution:
        '9 chia 4 được 2, dư 1; viết dấu phẩy; hạ 6 được 16, 16 chia 4 được 4. Vậy 9,6 : 4 = 2,4.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 5,28 : 4 = ?',
      answer: 1.32,
      hints: ['5 chia 4 được 1, dư 1. Viết dấu phẩy vào thương rồi chia tiếp.'],
      solution:
        '5 chia 4 được 1, dư 1; viết dấu phẩy; hạ 2 được 12, chia 4 được 3; hạ 8, chia 4 được 2. Vậy 5,28 : 4 = 1,32.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 0,85 : 5 = ?',
      answer: 0.17,
      hints: ['Phần nguyên 0 chia 5 được 0. Thương bắt đầu bằng 0,'],
      solution:
        '0 chia 5 được 0, viết 0 và dấu phẩy; 8 chia 5 được 1, dư 3; 35 chia 5 được 7. Vậy 0,85 : 5 = 0,17.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 7 : 4 = ?',
      answer: 1.75,
      hints: ['7 chia 4 được 1, dư 3. Viết dấu phẩy, thêm 0 vào số dư rồi chia tiếp.'],
      solution:
        '7 chia 4 được 1, dư 3; viết dấu phẩy; 30 chia 4 được 7, dư 2; 20 chia 4 được 5. Vậy 7 : 4 = 1,75.',
    },
    {
      type: 'choice',
      prompt: 'Để tính 7 : 3,5, em chuyển thành phép chia nào?',
      options: ['70 : 35', '7 : 35', '70 : 3,5', '0,7 : 35'],
      answer: 0,
      hints: ['Số chia 3,5 có một chữ số ở phần thập phân. Viết thêm một chữ số 0 vào số bị chia.'],
      solution:
        'Viết thêm một chữ số 0 vào bên phải 7 được 70, bỏ dấu phẩy ở 3,5 được 35: 70 : 35 = 2.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 702 : 7,2 = ?',
      answer: 97.5,
      hints: [
        'Đổi thành 7 020 : 72.',
        '7 020 chia 72 được 97, dư 36. Viết dấu phẩy rồi chia tiếp.',
      ],
      solution:
        '702 : 7,2 = 7 020 : 72. 702 chia 72 được 9, dư 54; hạ 0 được 540, chia 72 được 7, dư 36; viết dấu phẩy; 360 chia 72 được 5. Vậy 702 : 7,2 = 97,5.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 48,3 : 3,5 = ?',
      answer: 13.8,
      hints: ['Chuyển thành 483 : 35.'],
      solution:
        '483 : 35: 48 chia 35 được 1, dư 13; 133 chia 35 được 3, dư 28; viết dấu phẩy; 280 chia 35 được 8. Vậy 48,3 : 3,5 = 13,8.',
    },
    {
      type: 'choice',
      prompt: 'Khi tính 33,332 : 0,52, em chuyển dấu phẩy ở số bị chia sang bên phải mấy chữ số?',
      options: ['2 chữ số', '1 chữ số', '3 chữ số'],
      answer: 0,
      hints: ['Đếm các chữ số ở phần thập phân của số chia 0,52.'],
      solution:
        '0,52 có hai chữ số ở phần thập phân. Chuyển dấu phẩy sang phải 2 chữ số: 3 333,2 : 52 = 64,1.',
    },
    {
      type: 'number',
      prompt: 'Sợi dây dài 8,4 m được cắt thành 4 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu mét?',
      answer: 2.1,
      unit: 'm',
      hints: ['Tính 8,4 : 4.'],
      solution: 'Mỗi đoạn dài: 8,4 : 4 = 2,1 (m).',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt gieo hạt trên 5 ha đất hết 2,5 giờ. Trung bình mỗi giờ Rô-bốt gieo được bao nhiêu héc-ta?',
      answer: 2,
      unit: 'ha',
      hints: ['Tính 5 : 2,5. Đổi thành 50 : 25.'],
      solution: '5 : 2,5 = 50 : 25 = 2. Mỗi giờ Rô-bốt gieo được 2 ha.',
    },
  ],
  takeaways: [
    'Chia số thập phân cho số tự nhiên: viết dấu phẩy vào thương trước khi chia phần thập phân.',
    'Còn dư thì viết dấu phẩy vào thương, thêm chữ số 0 vào số dư rồi chia tiếp.',
    'Số chia là số thập phân: dời dấu phẩy ở số bị chia sang phải bấy nhiêu chữ số (thêm 0 nếu thiếu), bỏ dấu phẩy ở số chia.',
  ],
};
