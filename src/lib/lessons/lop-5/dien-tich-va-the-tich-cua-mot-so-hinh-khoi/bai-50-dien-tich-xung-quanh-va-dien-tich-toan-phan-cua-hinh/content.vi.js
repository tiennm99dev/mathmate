/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diện tích xung quanh của hình hộp chữ nhật bằng chu vi mặt đáy nhân với chiều cao; diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai đáy.',
  intro:
    'Rô-bốt muốn dán giấy màu kín bốn mặt xung quanh một chiếc hộp. Rô-bốt cần bao nhiêu giấy? Nếu dán cả nắp và đáy thì sao? Hôm nay em học cách tính.',
  objectives: [
    'Biết diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật.',
    'Tính diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật.',
    'Giải bài toán thực tế về diện tích các mặt của hình hộp chữ nhật.',
  ],
  sections: [
    {
      heading: 'Diện tích xung quanh',
      blocks: [
        {
          type: 'p',
          text: 'Hình hộp chữ nhật có 4 mặt xung quanh và 2 mặt đáy.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Diện tích xung quanh của hình hộp chữ nhật là tổng diện tích bốn mặt xung quanh.',
        },
        {
          type: 'p',
          text: 'Trải phẳng bốn mặt xung quanh, em được một hình chữ nhật. Chiều dài của nó bằng chu vi mặt đáy. Chiều rộng của nó bằng chiều cao của hình hộp.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích xung quanh của hình hộp chữ nhật, ta lấy chu vi mặt đáy nhân với chiều cao (cùng một đơn vị đo).',
        },
      ],
    },
    {
      heading: 'Diện tích toàn phần',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Diện tích toàn phần của hình hộp chữ nhật là tổng của diện tích xung quanh và diện tích hai đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Diện tích toàn phần = diện tích xung quanh + diện tích một mặt đáy × 2.',
        },
        {
          type: 'table',
          head: ['Dài, rộng, cao', 'Diện tích xung quanh', 'Diện tích toàn phần'],
          rows: [
            ['5 dm, 4 dm, 3 dm', '(5 + 4) × 2 × 3 = 54 (dm²)', '54 + 5 × 4 × 2 = 94 (dm²)'],
            ['8 cm, 6 cm, 3 cm', '(8 + 6) × 2 × 3 = 84 (cm²)', '84 + 8 × 6 × 2 = 180 (cm²)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các kích thước phải cùng một đơn vị đo. Nếu khác đơn vị, em đổi về cùng đơn vị trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô màu các mặt của hình hộp',
    instruction:
      'Em chỉnh chiều dài, chiều rộng, chiều cao. Chọn "Mặt xung quanh" để xem bốn mặt xung quanh ghép thành một hình chữ nhật. Mỗi ô vuông là 1 cm².',
  },
  examples: [
    {
      problem:
        'Tính diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật có chiều dài 5 dm, chiều rộng 4 dm và chiều cao 3 dm.',
      steps: [
        'Chu vi mặt đáy: (5 + 4) × 2 = 18 (dm).',
        'Diện tích xung quanh: 18 × 3 = 54 (dm²).',
        'Diện tích một mặt đáy: 5 × 4 = 20 (dm²).',
        'Diện tích toàn phần: 54 + 20 × 2 = 94 (dm²).',
      ],
      answer: 'Diện tích xung quanh 54 dm², diện tích toàn phần 94 dm².',
    },
    {
      problem:
        'Một cái thùng tôn không có nắp, dạng hình hộp chữ nhật, dài 6 dm, rộng 4 dm, cao 5 dm. Người ta sơn mặt ngoài của thùng. Tính diện tích cần sơn.',
      steps: [
        'Thùng không có nắp, nên cần sơn 4 mặt xung quanh và 1 mặt đáy.',
        'Diện tích xung quanh: (6 + 4) × 2 × 5 = 100 (dm²).',
        'Diện tích mặt đáy: 6 × 4 = 24 (dm²).',
        'Diện tích cần sơn: 100 + 24 = 124 (dm²).',
      ],
      answer: 'Diện tích cần sơn là 124 dm².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Muốn tính diện tích xung quanh của hình hộp chữ nhật, ta làm thế nào?',
      options: [
        'Lấy chu vi mặt đáy nhân với chiều cao',
        'Lấy diện tích mặt đáy nhân với chiều cao',
        'Lấy chu vi mặt đáy nhân với 2',
      ],
      answer: 0,
      hints: ['Bốn mặt xung quanh trải phẳng thành một hình chữ nhật.'],
      solution:
        'Bốn mặt xung quanh ghép thành hình chữ nhật dài bằng chu vi mặt đáy, rộng bằng chiều cao. Vậy diện tích xung quanh bằng chu vi mặt đáy nhân với chiều cao.',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật dài 8 dm, rộng 6 dm, cao 3 dm. Tính diện tích xung quanh của hình hộp đó.',
      answer: 84,
      unit: 'dm²',
      hints: [
        'Tính chu vi mặt đáy trước: (8 + 6) × 2.',
        'Lấy chu vi mặt đáy nhân với chiều cao 3 dm.',
      ],
      solution: 'Chu vi mặt đáy: (8 + 6) × 2 = 28 (dm). Diện tích xung quanh: 28 × 3 = 84 (dm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật dài 8 dm, rộng 6 dm, cao 3 dm. Tính diện tích toàn phần của hình hộp đó.',
      answer: 180,
      unit: 'dm²',
      hints: ['Diện tích xung quanh là 84 dm².', 'Cộng thêm diện tích hai mặt đáy: 8 × 6 × 2.'],
      solution:
        'Diện tích xung quanh: (8 + 6) × 2 × 3 = 84 (dm²). Diện tích một mặt đáy: 8 × 6 = 48 (dm²). Diện tích toàn phần: 84 + 48 × 2 = 180 (dm²).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình hộp chữ nhật (dài, rộng, cao) với diện tích xung quanh của nó.',
      left: ['3 cm, 2 cm, 1 cm', '4 cm, 3 cm, 2 cm', '5 cm, 5 cm, 2 cm'],
      right: ['10 cm²', '28 cm²', '40 cm²', '24 cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Diện tích xung quanh = (dài + rộng) × 2 × cao.'],
      solution:
        '(3 + 2) × 2 × 1 = 10 (cm²); (4 + 3) × 2 × 2 = 28 (cm²); (5 + 5) × 2 × 2 = 40 (cm²).',
    },
    {
      type: 'choice',
      prompt: 'Diện tích toàn phần của hình hộp chữ nhật bằng:',
      options: [
        'Diện tích xung quanh cộng diện tích hai mặt đáy',
        'Diện tích xung quanh cộng diện tích một mặt đáy',
        'Diện tích xung quanh nhân với 2',
      ],
      answer: 0,
      hints: ['Toàn phần là cả 6 mặt.', 'Hình hộp có 4 mặt xung quanh và mấy mặt đáy?'],
      solution:
        'Cả 6 mặt gồm 4 mặt xung quanh và 2 mặt đáy, nên diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai mặt đáy.',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật dài 1,5 m, rộng 0,5 m, cao 1 m. Tính diện tích toàn phần của hình hộp đó.',
      answer: 5.5,
      unit: 'm²',
      hints: ['Diện tích xung quanh: (1,5 + 0,5) × 2 × 1.', 'Diện tích một mặt đáy: 1,5 × 0,5.'],
      solution:
        'Diện tích xung quanh: (1,5 + 0,5) × 2 × 1 = 4 (m²). Diện tích một mặt đáy: 1,5 × 0,5 = 0,75 (m²). Diện tích toàn phần: 4 + 0,75 × 2 = 5,5 (m²).',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật dài 1 m, rộng 50 cm, cao 40 cm. Tính diện tích xung quanh theo xăng-ti-mét vuông.',
      answer: 12000,
      unit: 'cm²',
      hints: ['Đổi 1 m = 100 cm trước.', 'Chu vi mặt đáy: (100 + 50) × 2.'],
      solution:
        '1 m = 100 cm. Chu vi mặt đáy: (100 + 50) × 2 = 300 (cm). Diện tích xung quanh: 300 × 40 = 12 000 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một cái hộp không có nắp, dạng hình hộp chữ nhật, dài 6 dm, rộng 4 dm, cao 2 dm. Tính diện tích giấy cần để dán kín mặt ngoài của hộp.',
      answer: 64,
      unit: 'dm²',
      hints: [
        'Hộp không có nắp: chỉ dán 4 mặt xung quanh và 1 mặt đáy.',
        'Diện tích xung quanh: (6 + 4) × 2 × 2.',
      ],
      solution:
        'Diện tích xung quanh: (6 + 4) × 2 × 2 = 40 (dm²). Diện tích mặt đáy: 6 × 4 = 24 (dm²). Diện tích giấy cần dùng: 40 + 24 = 64 (dm²).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước tính diện tích toàn phần của hình hộp chữ nhật.',
      items: [
        'Lấy chu vi mặt đáy nhân với chiều cao, được diện tích xung quanh',
        'Tính chu vi mặt đáy',
        'Cộng diện tích xung quanh với diện tích hai mặt đáy',
      ],
      answer: [1, 0, 2],
      hints: ['Muốn có diện tích xung quanh, em cần chu vi mặt đáy trước.'],
      solution:
        'Tính chu vi mặt đáy, rồi lấy chu vi mặt đáy nhân với chiều cao được diện tích xung quanh, cuối cùng cộng diện tích xung quanh với diện tích hai mặt đáy.',
    },
  ],
  takeaways: [
    'Diện tích xung quanh = chu vi mặt đáy × chiều cao.',
    'Diện tích toàn phần = diện tích xung quanh + diện tích hai mặt đáy.',
    'Các kích thước phải cùng một đơn vị đo.',
  ],
};
