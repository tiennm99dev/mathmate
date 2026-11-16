/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất giao hoán (a × b = b × a) và tính chất kết hợp ((a × b) × c = a × (b × c)) của phép nhân, dùng để tính bằng cách thuận tiện.',
  intro:
    'Một hộp có 4 tầng bánh, mỗi tầng 2 hàng, mỗi hàng 3 chiếc. Em đếm từng tầng hay từng hàng thì số bánh vẫn như nhau. Vì sao vậy?',
  objectives: [
    'Nhận biết tính chất giao hoán của phép nhân.',
    'Nhận biết tính chất kết hợp của phép nhân.',
    'Vận dụng hai tính chất để tính bằng cách thuận tiện.',
  ],
  sections: [
    {
      heading: 'Tính chất giao hoán',
      blocks: [
        { type: 'p', text: 'Em so sánh giá trị của a × b và b × a.' },
        {
          type: 'table',
          head: ['a', 'b', 'a × b', 'b × a'],
          rows: [
            ['4', '5', '20', '20'],
            ['6', '7', '42', '42'],
            ['125', '8', '1 000', '1 000'],
          ],
        },
        { type: 'p', text: 'Giá trị của a × b và b × a luôn bằng nhau: a × b = b × a.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.',
        },
      ],
    },
    {
      heading: 'Tính chất kết hợp',
      blocks: [
        { type: 'p', text: 'Em so sánh giá trị của (a × b) × c và a × (b × c).' },
        {
          type: 'table',
          head: ['a', 'b', 'c', '(a × b) × c', 'a × (b × c)'],
          rows: [
            ['2', '3', '4', '6 × 4 = 24', '2 × 12 = 24'],
            ['5', '2', '7', '10 × 7 = 70', '5 × 14 = 70'],
            ['4', '5', '6', '20 × 6 = 120', '4 × 30 = 120'],
          ],
        },
        { type: 'p', text: 'Hai giá trị luôn bằng nhau: (a × b) × c = a × (b × c).' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi nhân một tích hai số với số thứ ba, ta có thể nhân số thứ nhất với tích của số thứ hai và số thứ ba.',
        },
        {
          type: 'p',
          text: 'Vì thế em có thể viết a × b × c mà không cần dấu ngoặc: a × b × c = (a × b) × c = a × (b × c).',
        },
      ],
    },
    {
      heading: 'Tính bằng cách thuận tiện',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          text: 'Em đổi chỗ và nhóm các thừa số có tích là 10, 100, 1 000 để tính nhẩm cho nhanh.',
        },
        { type: 'p', text: 'Các cặp hay gặp: 2 × 5 = 10, 25 × 4 = 100, 125 × 8 = 1 000.' },
        { type: 'p', text: '25 × 7 × 4 = 7 × (25 × 4) = 7 × 100 = 700.' },
      ],
    },
  ],
  explore: {
    title: 'Hộp chấm',
    instruction:
      'Em chọn đếm từng tầng hoặc đếm từng hàng màu, rồi đổi số hàng, số cột, số tầng. Bấm "Xoay các tầng" để đổi chỗ hàng và cột. Số chấm luôn giữ nguyên.',
  },
  examples: [
    {
      problem: 'Tính bằng cách thuận tiện: 5 × 9 × 2.',
      steps: [
        'Em thấy 5 × 2 = 10.',
        'Đổi chỗ: 5 × 9 × 2 = 5 × 2 × 9.',
        'Nhóm: (5 × 2) × 9 = 10 × 9 = 90.',
      ],
      answer: '5 × 9 × 2 = 90.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: 125 × 3 × 8.',
      steps: [
        'Em thấy 125 × 8 = 1 000.',
        'Đổi chỗ và nhóm: 125 × 3 × 8 = (125 × 8) × 3.',
        '= 1 000 × 3 = 3 000.',
      ],
      answer: '125 × 3 × 8 = 3 000.',
    },
    {
      problem:
        'Mỗi hộp bánh có 4 hàng, mỗi hàng 5 chiếc. Hỏi 6 hộp như thế có bao nhiêu chiếc bánh?',
      steps: [
        'Số bánh là 4 × 5 × 6.',
        'Cách 1: (4 × 5) × 6 = 20 × 6 = 120.',
        'Cách 2: 4 × (5 × 6) = 4 × 30 = 120.',
      ],
      answer: '6 hộp có 120 chiếc bánh.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Biết 245 × 3 = 735. Không cần tính, 3 × 245 = ?',
      answer: 735,
      hints: ['Hai tích có cùng các thừa số, chỉ đổi chỗ.'],
      solution: 'Khi đổi chỗ các thừa số thì tích không thay đổi: 3 × 245 = 735.',
    },
    {
      type: 'text',
      prompt: 'Điền chữ thích hợp: a × b = b × ?',
      accept: ['a'],
      hints: ['Đây là tính chất giao hoán: đổi chỗ hai thừa số.'],
      solution: 'a × b = b × a.',
    },
    {
      type: 'number',
      prompt: '(6 × 5) × 7 = 6 × (5 × ?). Số cần điền là số nào?',
      answer: 7,
      hints: ['Tính chất kết hợp: (a × b) × c = a × (b × c).'],
      solution: '(6 × 5) × 7 = 6 × (5 × 7). Số cần điền là 7.',
    },
    {
      type: 'match',
      prompt: 'Nối hai số có tích là 100 hoặc 1 000.',
      left: ['25', '125', '5', '500'],
      right: ['4', '8', '20', '2', '3'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ: 25 × 4 = 100.', '125 × 8 = 1 000.'],
      solution: '25 × 4 = 100; 125 × 8 = 1 000; 5 × 20 = 100; 500 × 2 = 1 000.',
    },
    {
      type: 'choice',
      prompt: 'Cách nào tính 25 × 9 × 4 thuận tiện nhất?',
      options: ['(25 × 4) × 9', '(25 × 9) × 4', '25 × (9 × 4)'],
      answer: 0,
      hints: ['Em tìm hai thừa số có tích là số tròn trăm.'],
      solution: '25 × 4 = 100, nên (25 × 4) × 9 = 100 × 9 = 900.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào có giá trị bằng 4 × 7 × 5?',
      options: ['4 × 5 × 7', '4 × 7 + 5', '(4 + 7) × 5', '4 + 7 × 5'],
      answer: 0,
      hints: ['Đổi chỗ các thừa số thì tích không đổi. Đổi dấu nhân thành dấu cộng thì khác.'],
      solution:
        '4 × 7 × 5 = 140 và 4 × 5 × 7 = 20 × 7 = 140. Các biểu thức kia: 4 × 7 + 5 = 33; (4 + 7) × 5 = 55; 4 + 7 × 5 = 39.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 2 × 37 × 5 = ?',
      answer: 370,
      hints: ['Em nhóm 2 với 5.'],
      solution: '2 × 37 × 5 = (2 × 5) × 37 = 10 × 37 = 370.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 125 × 6 × 8 = ?',
      answer: 6000,
      hints: ['Số nào nhân với 125 được 1 000?'],
      solution: '125 × 6 × 8 = (125 × 8) × 6 = 1 000 × 6 = 6 000.',
    },
    {
      type: 'number',
      prompt:
        'Một khay trứng có 5 hàng, mỗi hàng 6 quả. Hỏi 4 khay như thế có bao nhiêu quả trứng?',
      answer: 120,
      unit: 'quả',
      hints: ['Số trứng là 5 × 6 × 4.', 'Em có thể tính 5 × (6 × 4) hoặc (5 × 4) × 6.'],
      solution: '5 × 6 × 4 = (5 × 4) × 6 = 20 × 6 = 120 (quả).',
    },
  ],
  takeaways: [
    'Tính chất giao hoán: a × b = b × a.',
    'Tính chất kết hợp: (a × b) × c = a × (b × c).',
    'Nhóm các thừa số có tích là 10, 100, 1 000 để tính nhanh.',
  ],
};
