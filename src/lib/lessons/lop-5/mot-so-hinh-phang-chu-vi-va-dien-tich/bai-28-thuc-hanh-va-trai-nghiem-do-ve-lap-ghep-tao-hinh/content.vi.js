/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đo, vẽ, cắt và lắp ghép các hình tam giác, hình thang, hình chữ nhật, hình tròn để tạo bức tranh ngôi nhà, bông hoa, con gà; tính diện tích hình ghép bằng tổng diện tích các hình thành phần.',
  intro:
    'Từ những hình tam giác, hình thang, hình tròn, em có thể cắt dán thành ngôi nhà, bông hoa, con gà. Em cùng đo, vẽ, lắp ghép và tính xem cần bao nhiêu giấy màu nhé!',
  objectives: [
    'Đo, vẽ được hình tam giác, hình thang, hình chữ nhật trên giấy kẻ ô vuông và vẽ hình tròn bằng compa.',
    'Lắp ghép được các hình đã học để tạo thành hình mới.',
    'Tính được diện tích hình ghép bằng tổng diện tích các hình thành phần.',
  ],
  sections: [
    {
      heading: 'Bức tranh từ các hình đã học',
      blocks: [
        {
          type: 'p',
          text: 'Ngôi nhà trong sách có mái là hình thang màu đỏ: đáy bé 6 ô, đáy lớn 12 ô, chiều cao 3 ô.',
        },
        {
          type: 'p',
          text: 'Thân nhà là hình chữ nhật. Dãy núi là các hình tam giác. Mặt trời là hình tròn vẽ bằng compa.',
        },
        {
          type: 'table',
          head: ['Hình em làm', 'Ghép từ'],
          rows: [
            ['Ngôi nhà', 'Hình thang, hình chữ nhật'],
            ['Bông hoa', '1 hình tròn làm nhuỵ, 4 nửa hình tròn làm cánh'],
            ['Con gà', 'Hình tròn làm đầu và thân, hình tam giác làm cánh, mỏ, đuôi, chân'],
          ],
          caption: 'Các hình em tạo ra',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Diện tích hình ghép bằng tổng diện tích các hình ghép thành nó.',
        },
        {
          type: 'p',
          text: 'Em thử ghép các mảnh bên dưới thành hình mới, rồi tính diện tích theo hai cách: cộng các mảnh, hoặc dùng công thức của hình mới.',
        },
        { type: 'widget', name: 'ghep-hinh' },
      ],
    },
    {
      heading: 'Dự án: Bức tranh ngôi nhà của em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: nhóm em cắt dán một bức tranh có ngôi nhà, dãy núi, mặt trời, rồi tính diện tích giấy màu đã dùng.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô vuông, giấy màu, thước kẻ, compa, bút chì, kéo, hồ dán.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng thước vẽ mái nhà hình thang, thân nhà hình chữ nhật và các ngọn núi hình tam giác trên giấy màu. Ghi số đo từng hình.',
            'Dùng compa vẽ mặt trời hình tròn. Ghi bán kính.',
            'Cắt các hình rồi dán thành bức tranh.',
            'Tính diện tích từng hình, rồi cộng lại để biết đã dùng bao nhiêu xăng-ti-mét vuông giấy màu.',
            'Làm thêm một bông hoa hoặc một con gà từ hình tròn và hình tam giác.',
          ],
        },
        {
          type: 'table',
          head: ['Hình', 'Số đo', 'Diện tích'],
          rows: [
            ['Mái nhà (hình thang)', '… cm, … cm, … cm', '… cm²'],
            ['Thân nhà (hình chữ nhật)', '… cm, … cm', '… cm²'],
            ['Ngọn núi (hình tam giác)', '… cm, … cm', '… cm²'],
            ['Mặt trời (hình tròn)', 'r = … cm', '… cm²'],
          ],
          caption: 'Bảng ghi số đo và diện tích',
        },
        {
          type: 'p',
          text: 'Trưng bày bức tranh và báo cáo với cả lớp: em dùng những hình nào, số đo, diện tích từng hình và tổng diện tích giấy màu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Làm bức tranh ngôi nhà',
    instruction:
      'Em chọn từng phần của bức tranh rồi bấm − và + để đổi số đo. Xem diện tích từng phần và tổng số giấy màu cần dùng. Làm theo các thử thách nhé.',
  },
  examples: [
    {
      problem:
        'Mái nhà hình thang có đáy bé 6 cm, đáy lớn 12 cm, chiều cao 3 cm. Thân nhà hình chữ nhật dài 10 cm, rộng 6 cm. Tính diện tích cả ngôi nhà.',
      steps: [
        'Diện tích mái nhà: (12 + 6) × 3 : 2 = 27 (cm²).',
        'Diện tích thân nhà: 10 × 6 = 60 (cm²).',
        'Diện tích cả ngôi nhà: 27 + 60 = 87 (cm²).',
      ],
      answer: 'Ngôi nhà có diện tích 87 cm².',
    },
    {
      problem:
        'Bông hoa gồm 1 hình tròn làm nhuỵ và 4 nửa hình tròn làm cánh. Tất cả có bán kính 2 cm. Tính diện tích giấy làm bông hoa.',
      steps: [
        'Diện tích một hình tròn: 2 × 2 × 3,14 = 12,56 (cm²).',
        '4 nửa hình tròn bằng 2 hình tròn. Cả bông hoa bằng 3 hình tròn.',
        'Diện tích bông hoa: 12,56 × 3 = 37,68 (cm²).',
      ],
      answer: 'Bông hoa cần 37,68 cm² giấy.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Ngôi nhà trong tranh được ghép từ những hình nào?',
      options: ['Hình thang', 'Hình chữ nhật', 'Hình tròn', 'Hình tam giác'],
      answers: [0, 1],
      hints: ['Mái nhà có hai cạnh song song. Thân nhà có bốn góc vuông.'],
      solution: 'Mái nhà là hình thang, thân nhà là hình chữ nhật.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phần của bức tranh với hình của nó.',
      left: ['Mái nhà', 'Mặt trời', 'Ngọn núi', 'Cánh hoa'],
      right: ['Hình thang', 'Hình tròn', 'Hình tam giác', 'Nửa hình tròn'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mặt trời vẽ bằng compa. Cánh hoa là một nửa hình tròn.'],
      solution:
        'Mái nhà: hình thang. Mặt trời: hình tròn. Ngọn núi: hình tam giác. Cánh hoa: nửa hình tròn.',
    },
    {
      type: 'number',
      prompt:
        'Mái nhà hình thang có đáy bé 6 cm, đáy lớn 12 cm, chiều cao 3 cm. Diện tích mái nhà là bao nhiêu?',
      answer: 27,
      unit: 'cm²',
      hints: ['S = (a + b) × h : 2.'],
      solution: '(12 + 6) × 3 : 2 = 27. Mái nhà có diện tích 27 cm².',
    },
    {
      type: 'number',
      prompt: 'Mặt trời là hình tròn bán kính 1 cm. Diện tích mặt trời là bao nhiêu?',
      answer: 3.14,
      unit: 'cm²',
      hints: ['S = r × r × 3,14.'],
      solution: '1 × 1 × 3,14 = 3,14. Mặt trời có diện tích 3,14 cm².',
    },
    {
      type: 'number',
      prompt:
        'Dãy núi gồm 3 hình tam giác bằng nhau, mỗi hình có đáy 6 cm, chiều cao 4 cm. Tính diện tích giấy làm dãy núi.',
      answer: 36,
      unit: 'cm²',
      hints: ['Tính diện tích một ngọn núi trước.', 'Rồi nhân với 3.'],
      solution: 'Một ngọn núi: 6 × 4 : 2 = 12 (cm²). Ba ngọn núi: 12 × 3 = 36 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Ghép 2 hình tam giác vuông bằng nhau, mỗi hình có hai cạnh góc vuông 3 cm và 4 cm, thành một hình chữ nhật. Chu vi hình chữ nhật là bao nhiêu?',
      answer: 14,
      unit: 'cm',
      hints: ['Hình chữ nhật có chiều dài 4 cm, chiều rộng 3 cm.'],
      solution:
        'Chu vi: (4 + 3) × 2 = 14 (cm). Diện tích: 4 × 3 = 12 (cm²), bằng 2 lần 3 × 4 : 2 = 6 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Bông hoa gồm 1 hình tròn và 4 nửa hình tròn, tất cả có bán kính 2 cm. Diện tích bông hoa là bao nhiêu?',
      answer: 37.68,
      unit: 'cm²',
      hints: [
        '4 nửa hình tròn ghép lại bằng 2 hình tròn.',
        'Diện tích một hình tròn: 2 × 2 × 3,14.',
      ],
      solution:
        'Một hình tròn: 2 × 2 × 3,14 = 12,56 (cm²). Bông hoa bằng 3 hình tròn: 12,56 × 3 = 37,68 (cm²).',
    },
    {
      type: 'choice',
      prompt: 'Ghép 2 hình tam giác vuông bằng nhau và 1 hình vuông, ta có thể được hình nào?',
      options: ['Hình thang', 'Hình tròn', 'Nửa hình tròn'],
      answer: 0,
      hints: ['Đặt hai tam giác vuông ở hai bên hình vuông.'],
      solution:
        'Đặt hai tam giác vuông hai bên hình vuông, ta được hình thang. Hình ghép từ các cạnh thẳng không thể là hình tròn.',
    },
  ],
  takeaways: [
    'Từ hình tam giác, hình thang, hình chữ nhật, hình tròn, em ghép được nhiều hình mới.',
    'Diện tích hình ghép bằng tổng diện tích các hình thành phần.',
  ],
};
