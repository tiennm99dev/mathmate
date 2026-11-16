/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân một số tự nhiên với 10, 100, 1 000 bằng cách viết thêm chữ số 0 vào bên phải; chia số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000 bằng cách bớt chữ số 0.',
  intro:
    'Có 10 dây cờ, mỗi dây có 36 lá cờ. Có tất cả bao nhiêu lá cờ? Rô-bốt nói có thể nhẩm ngay: 36 × 10 = 360. Em xem Rô-bốt nhẩm thế nào nhé!',
  objectives: [
    'Nhân nhẩm một số tự nhiên với 10, 100, 1 000.',
    'Chia nhẩm số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000.',
    'Vận dụng để đổi đơn vị đo và giải toán.',
  ],
  sections: [
    {
      heading: 'Nhân với 10, 100, 1 000',
      blocks: [
        { type: 'p', text: '36 × 10 = 360.' },
        { type: 'p', text: '36 × 100 = 36 × 10 × 10 = 360 × 10 = 3 600.' },
        { type: 'p', text: '36 × 1 000 = 36 000.' },
        {
          type: 'table',
          head: ['Phép nhân', 'Kết quả', 'Viết thêm'],
          rows: [
            ['36 × 10', '360', 'một chữ số 0'],
            ['36 × 100', '3 600', 'hai chữ số 0'],
            ['36 × 1 000', '36 000', 'ba chữ số 0'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi nhân một số tự nhiên với 10, 100, 1 000, … ta chỉ việc viết thêm một, hai, ba, … chữ số 0 vào bên phải số đó.',
        },
      ],
    },
    {
      heading: 'Chia cho 10, 100, 1 000',
      blocks: [
        { type: 'p', text: 'Từ 36 × 10 = 360, ta có 360 : 10 = 36.' },
        { type: 'p', text: 'Từ 36 × 100 = 3 600, ta có 3 600 : 100 = 36.' },
        { type: 'p', text: 'Từ 36 × 1 000 = 36 000, ta có 36 000 : 1 000 = 36.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi chia số tròn chục, tròn trăm, tròn nghìn, … cho 10, 100, 1 000, … ta chỉ việc bỏ bớt đi một, hai, ba, … chữ số 0 ở bên phải số đó.',
        },
      ],
    },
    {
      heading: 'Chữ số dịch hàng',
      blocks: [
        {
          type: 'p',
          text: '36 × 10 = 360: chữ số 3 ở hàng chục lên hàng trăm, chữ số 6 ở hàng đơn vị lên hàng chục. Mỗi chữ số dịch sang trái một hàng.',
        },
        {
          type: 'p',
          text: 'Chia cho 10 thì ngược lại: 360 : 10 = 36, mỗi chữ số dịch sang phải một hàng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng hàng',
    instruction:
      'Em bấm × 10, × 100, × 1 000 hoặc : 10, : 100, : 1 000 và xem các chữ số dịch sang trái, sang phải. Hãy đi từ số ban đầu tới số cần được.',
  },
  examples: [
    {
      problem: 'Tính nhẩm: 5 629 × 1 000 và 378 000 : 1 000.',
      steps: [
        'Nhân với 1 000: viết thêm ba chữ số 0 vào bên phải 5 629, được 5 629 000.',
        'Chia cho 1 000: bỏ bớt ba chữ số 0 ở bên phải 378 000, được 378.',
      ],
      answer: '5 629 × 1 000 = 5 629 000; 378 000 : 1 000 = 378.',
    },
    {
      problem: 'Viết số thích hợp: 80 kg = ? yến; 3 tạ = ? kg.',
      steps: [
        '1 yến = 10 kg, nên 80 kg = 80 : 10 yến = 8 yến.',
        '1 tạ = 100 kg, nên 3 tạ = 3 × 100 kg = 300 kg.',
      ],
      answer: '80 kg = 8 yến; 3 tạ = 300 kg.',
    },
    {
      problem:
        'Người ta đóng 6 000 kg gạo vào các bao, mỗi bao 100 kg. Hỏi đóng được bao nhiêu bao gạo?',
      steps: ['Em làm phép chia: 6 000 : 100.', 'Bỏ bớt hai chữ số 0: 6 000 : 100 = 60.'],
      answer: 'Đóng được 60 bao gạo.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả của nó.',
      left: ['14 × 10', '5 629 × 1 000', '378 000 : 1 000', '2 500 : 100'],
      right: ['140', '5 629 000', '378', '25', '250'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhân với 10, 100, 1 000: viết thêm chữ số 0.', 'Chia: bỏ bớt chữ số 0.'],
      solution:
        '14 × 10 = 140; 5 629 × 1 000 = 5 629 000; 378 000 : 1 000 = 378; 2 500 : 100 = 25.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 207 × 100 = ?',
      answer: 20700,
      hints: ['Nhân với 100: viết thêm hai chữ số 0 vào bên phải.'],
      solution: '207 × 100 = 20 700.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 90 000 : 10 = ?',
      answer: 9000,
      hints: ['Chia cho 10: bỏ bớt một chữ số 0 ở bên phải.'],
      solution: '90 000 : 10 = 9 000.',
    },
    {
      type: 'choice',
      prompt: 'Khi nhân một số tự nhiên với 1 000, em làm thế nào?',
      options: [
        'Viết thêm ba chữ số 0 vào bên phải số đó',
        'Viết thêm hai chữ số 0 vào bên phải số đó',
        'Bỏ bớt ba chữ số 0 ở bên phải số đó',
      ],
      answer: 0,
      hints: ['1 000 có mấy chữ số 0?'],
      solution: '1 000 có ba chữ số 0, nên em viết thêm ba chữ số 0 vào bên phải số đó.',
    },
    {
      type: 'choice',
      prompt: 'Số nào nhân với 100 thì được 45 000?',
      options: ['450', '45', '4 500', '45 000'],
      answer: 0,
      hints: ['Em làm ngược lại: 45 000 : 100.'],
      solution: '45 000 : 100 = 450, và 450 × 100 = 45 000.',
    },
    {
      type: 'number',
      prompt: 'Viết số thích hợp: 80 kg = ? yến',
      answer: 8,
      unit: 'yến',
      hints: ['1 yến = 10 kg.', 'Em tính 80 : 10.'],
      solution: '1 yến = 10 kg, nên 80 kg = 80 : 10 = 8 yến.',
    },
    {
      type: 'number',
      prompt: 'Viết số thích hợp: 3 tạ = ? kg',
      answer: 300,
      unit: 'kg',
      hints: ['1 tạ = 100 kg.', 'Em tính 3 × 100.'],
      solution: '1 tạ = 100 kg, nên 3 tạ = 3 × 100 = 300 kg.',
    },
    {
      type: 'number',
      prompt: 'Có 10 hộp bút, mỗi hộp có 12 chiếc bút. Hỏi có tất cả bao nhiêu chiếc bút?',
      answer: 120,
      unit: 'chiếc',
      hints: ['Em tính 12 × 10.'],
      solution: '12 × 10 = 120 (chiếc bút).',
    },
    {
      type: 'number',
      prompt:
        'Người ta đóng 6 000 kg gạo vào các bao, mỗi bao 100 kg. Hỏi đóng được bao nhiêu bao gạo?',
      answer: 60,
      unit: 'bao',
      hints: ['Em làm phép chia cho 100.'],
      solution: '6 000 : 100 = 60 (bao gạo).',
    },
  ],
  takeaways: [
    'Nhân với 10, 100, 1 000: viết thêm một, hai, ba chữ số 0 vào bên phải.',
    'Chia số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000: bỏ bớt một, hai, ba chữ số 0 ở bên phải.',
    'Nhân với 10: mỗi chữ số dịch sang trái một hàng; chia cho 10: dịch sang phải một hàng.',
  ],
};
