/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diện tích xung quanh của hình lập phương bằng diện tích một mặt nhân với 4; diện tích toàn phần bằng diện tích một mặt nhân với 6.',
  intro:
    'Mai gói một hộp quà hình lập phương. Sáu mặt của hộp là sáu hình vuông bằng nhau. Biết một mặt, em tính được diện tích cả hộp. Cùng tìm cách tính nhé!',
  objectives: [
    'Biết cách tính diện tích xung quanh và diện tích toàn phần của hình lập phương.',
    'Vận dụng để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hình lập phương là hình hộp chữ nhật đặc biệt',
      blocks: [
        {
          type: 'p',
          text: 'Hình lập phương có chiều dài, chiều rộng, chiều cao bằng nhau. Sáu mặt của nó là sáu hình vuông bằng nhau.',
        },
        {
          type: 'p',
          text: 'Diện tích xung quanh là tổng diện tích bốn mặt xung quanh. Diện tích toàn phần là tổng diện tích sáu mặt.',
        },
      ],
    },
    {
      heading: 'Cách tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích xung quanh của hình lập phương, ta lấy diện tích một mặt nhân với 4.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích toàn phần của hình lập phương, ta lấy diện tích một mặt nhân với 6.',
        },
        {
          type: 'table',
          head: ['Cạnh', 'Một mặt', 'Xung quanh', 'Toàn phần'],
          rows: [
            ['2 cm', '2 × 2 = 4 (cm²)', '4 × 4 = 16 (cm²)', '4 × 6 = 24 (cm²)'],
            ['5 cm', '5 × 5 = 25 (cm²)', '25 × 4 = 100 (cm²)', '25 × 6 = 150 (cm²)'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Đây cũng là cách tính của hình hộp chữ nhật: chu vi mặt đáy 5 × 4 = 20 (cm), diện tích xung quanh 20 × 5 = 100 (cm²).',
        },
      ],
    },
  ],
  explore: {
    title: 'Một mặt, bốn mặt, sáu mặt',
    instruction:
      'Em chỉnh cạnh hình lập phương. Chọn "Một mặt", "Mặt xung quanh" hoặc "Cả 6 mặt" và đếm ô vuông 1 cm².',
  },
  examples: [
    {
      problem: 'Tính diện tích xung quanh và diện tích toàn phần của hình lập phương có cạnh 5 cm.',
      steps: [
        'Diện tích một mặt: 5 × 5 = 25 (cm²).',
        'Diện tích xung quanh: 25 × 4 = 100 (cm²).',
        'Diện tích toàn phần: 25 × 6 = 150 (cm²).',
      ],
      answer: 'Diện tích xung quanh 100 cm², diện tích toàn phần 150 cm².',
    },
    {
      problem:
        'Một cái hộp hình lập phương không có nắp, cạnh 2,5 dm. Tính diện tích bìa cần dùng để làm hộp (không tính mép dán).',
      steps: [
        'Hộp không có nắp, nên chỉ có 5 mặt.',
        'Diện tích một mặt: 2,5 × 2,5 = 6,25 (dm²).',
        'Diện tích bìa cần dùng: 6,25 × 5 = 31,25 (dm²).',
      ],
      answer: 'Cần 31,25 dm² bìa.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Muốn tính diện tích toàn phần của hình lập phương, ta làm thế nào?',
      options: [
        'Lấy diện tích một mặt nhân với 6',
        'Lấy diện tích một mặt nhân với 4',
        'Lấy cạnh nhân với 6',
      ],
      answer: 0,
      hints: ['Hình lập phương có mấy mặt bằng nhau?'],
      solution:
        'Hình lập phương có 6 mặt bằng nhau, nên diện tích toàn phần bằng diện tích một mặt nhân với 6.',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương có cạnh 3 dm. Tính diện tích xung quanh.',
      answer: 36,
      unit: 'dm²',
      hints: ['Diện tích một mặt: 3 × 3.', 'Lấy diện tích một mặt nhân với 4.'],
      solution: 'Diện tích một mặt: 3 × 3 = 9 (dm²). Diện tích xung quanh: 9 × 4 = 36 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương có cạnh 3 dm. Tính diện tích toàn phần.',
      answer: 54,
      unit: 'dm²',
      hints: ['Diện tích một mặt là 9 dm².', 'Lấy diện tích một mặt nhân với 6.'],
      solution: 'Diện tích một mặt: 3 × 3 = 9 (dm²). Diện tích toàn phần: 9 × 6 = 54 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương có cạnh 1,5 m. Tính diện tích toàn phần.',
      answer: 13.5,
      unit: 'm²',
      hints: ['Diện tích một mặt: 1,5 × 1,5.'],
      solution:
        'Diện tích một mặt: 1,5 × 1,5 = 2,25 (m²). Diện tích toàn phần: 2,25 × 6 = 13,5 (m²).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình lập phương với diện tích toàn phần của nó.',
      left: ['Cạnh 1 cm', 'Cạnh 2 cm', 'Cạnh 4 cm'],
      right: ['6 cm²', '24 cm²', '96 cm²', '16 cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Diện tích toàn phần = cạnh × cạnh × 6.'],
      solution: '1 × 1 × 6 = 6 (cm²); 2 × 2 × 6 = 24 (cm²); 4 × 4 × 6 = 96 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương có diện tích một mặt là 16 cm². Tính diện tích toàn phần của hình lập phương đó.',
      answer: 96,
      unit: 'cm²',
      hints: ['Đã biết diện tích một mặt, em chỉ cần nhân với 6.'],
      solution: 'Diện tích toàn phần: 16 × 6 = 96 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương có diện tích xung quanh là 36 cm². Cạnh của hình lập phương dài bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Diện tích một mặt: 36 : 4.', 'Số nào nhân với chính nó được 9?'],
      solution: 'Diện tích một mặt: 36 : 4 = 9 (cm²). Vì 3 × 3 = 9, nên cạnh dài 3 cm.',
    },
    {
      type: 'number',
      prompt:
        'Mai dán giấy màu kín 6 mặt của một hộp quà hình lập phương cạnh 2 dm. Mai cần bao nhiêu đề-xi-mét vuông giấy?',
      answer: 24,
      unit: 'dm²',
      hints: ['Dán kín 6 mặt là tính diện tích toàn phần.'],
      solution: 'Diện tích một mặt: 2 × 2 = 4 (dm²). Diện tích giấy: 4 × 6 = 24 (dm²).',
    },
    {
      type: 'choice',
      prompt:
        'Hình lập phương A cạnh 2 cm, hình lập phương B cạnh 4 cm. Diện tích toàn phần của B gấp mấy lần của A?',
      options: ['4 lần', '2 lần', '6 lần'],
      answer: 0,
      hints: ['Tính diện tích toàn phần của từng hình.', 'A: 2 × 2 × 6. B: 4 × 4 × 6.'],
      solution:
        'A: 2 × 2 × 6 = 24 (cm²). B: 4 × 4 × 6 = 96 (cm²). 96 : 24 = 4. Diện tích toàn phần của B gấp 4 lần của A.',
    },
  ],
  takeaways: [
    'Diện tích xung quanh của hình lập phương = diện tích một mặt × 4.',
    'Diện tích toàn phần của hình lập phương = diện tích một mặt × 6.',
    'Diện tích một mặt = cạnh × cạnh.',
  ],
};
