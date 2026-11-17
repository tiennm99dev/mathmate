/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân với số có hai chữ số: nhân với chữ số hàng đơn vị được tích riêng thứ nhất, nhân với chữ số hàng chục được tích riêng thứ hai viết lùi sang trái một cột, rồi cộng hai tích riêng.',
  intro:
    'Cửa hàng có 18 bao ngô, mỗi bao cân nặng 35 kg. Cửa hàng có bao nhiêu ki-lô-gam ngô? Hôm nay em học cách nhân với số có hai chữ số nhé!',
  objectives: [
    'Hiểu tích riêng thứ nhất và tích riêng thứ hai.',
    'Đặt tính rồi tính phép nhân với số có hai chữ số.',
    'Nhân nhẩm một số có hai chữ số với 11.',
  ],
  sections: [
    {
      heading: 'Tách thừa số thành chục và đơn vị',
      blocks: [
        { type: 'p', text: 'Em tính 36 × 23. Em tách 23 = 20 + 3.' },
        { type: 'p', text: '36 × 23 = 36 × (3 + 20) = 36 × 3 + 36 × 20.' },
        { type: 'p', text: '36 × 3 = 108. Đây là tích riêng thứ nhất.' },
        {
          type: 'p',
          text: '36 × 2 = 72, nên 36 × 20 = 72 chục = 720. Đây là tích riêng thứ hai.',
        },
        { type: 'p', text: '108 + 720 = 828. Vậy 36 × 23 = 828.' },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'table',
          head: ['Bước', 'Em làm', 'Kết quả'],
          rows: [
            [
              'Nhân với 3',
              '3 nhân 6 bằng 18, viết 8 nhớ 1. 3 nhân 3 bằng 9, thêm 1 bằng 10, viết 10.',
              '108',
            ],
            [
              'Nhân với 2',
              '2 nhân 6 bằng 12, viết 2 dưới chữ số 0 của 108, nhớ 1. 2 nhân 3 bằng 6, thêm 1 bằng 7, viết 7.',
              '72 (lùi sang trái một cột)',
            ],
            ['Cộng', 'Hạ 8. 0 cộng 2 bằng 2, viết 2. 1 cộng 7 bằng 8, viết 8.', '828'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân với số có hai chữ số: nhân với chữ số hàng đơn vị được tích riêng thứ nhất. Nhân với chữ số hàng chục được tích riêng thứ hai, viết lùi sang trái một cột. Cộng hai tích riêng được tích.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tích riêng thứ hai là số chục, nên phải viết lùi sang trái một cột. Viết thẳng cột là sai!',
        },
      ],
    },
    {
      heading: 'Nhân nhẩm với 11',
      blocks: [
        {
          type: 'p',
          text: 'Khi nhân với 11, hai tích riêng giống nhau: 27 × 11 có hai tích riêng đều là 27.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhân nhẩm',
          text: 'Cộng hai chữ số rồi viết tổng vào giữa: 27 × 11, có 2 + 7 = 9, được 297.',
        },
        {
          type: 'p',
          text: 'Nếu tổng có hai chữ số, em viết chữ số hàng đơn vị vào giữa và thêm 1 vào chữ số đầu: 48 × 11, có 4 + 8 = 12, được 528.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bốn ô ghép thành tích',
    instruction:
      'Hình chữ nhật được chia thành bốn ô. Em chạm từng ô để tính. Hàng trên cho tích riêng thứ nhất, hàng dưới cho tích riêng thứ hai. Mở hết bốn ô để xem phép tính đặt cột.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 56 × 23.',
      steps: [
        'Nhân 56 với 3: 3 nhân 6 bằng 18, viết 8 nhớ 1; 3 nhân 5 bằng 15, thêm 1 bằng 16, viết 16. Tích riêng thứ nhất là 168.',
        'Nhân 56 với 2: 2 nhân 6 bằng 12, viết 2 nhớ 1; 2 nhân 5 bằng 10, thêm 1 bằng 11, viết 11. Tích riêng thứ hai là 112, viết lùi sang trái một cột.',
        'Cộng: 168 + 1 120 = 1 288.',
      ],
      answer: '56 × 23 = 1 288.',
    },
    {
      problem: 'Đặt tính rồi tính: 201 × 45.',
      steps: [
        'Nhân 201 với 5: được tích riêng thứ nhất 1 005.',
        'Nhân 201 với 4: được tích riêng thứ hai 804, viết lùi sang trái một cột.',
        'Cộng: 1 005 + 8 040 = 9 045.',
      ],
      answer: '201 × 45 = 9 045.',
    },
    {
      problem:
        'Cửa hàng có 18 bao ngô, mỗi bao cân nặng 35 kg. Hỏi cửa hàng có bao nhiêu ki-lô-gam ngô?',
      steps: [
        'Em tính 35 × 18.',
        'Tích riêng thứ nhất: 35 × 8 = 280. Tích riêng thứ hai: 35 × 1 = 35, viết lùi sang trái một cột.',
        '280 + 350 = 630.',
      ],
      answer: 'Cửa hàng có 630 kg ngô.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 87 × 23 = ?',
      answer: 2001,
      hints: [
        'Tích riêng thứ nhất là 87 × 3.',
        'Tích riêng thứ hai là 87 × 2, viết lùi sang trái một cột.',
      ],
      solution: '87 × 3 = 261; 87 × 2 = 174, viết lùi sang trái một cột. 261 + 1 740 = 2 001.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 134 × 32 = ?',
      answer: 4288,
      hints: ['Nhân 134 với 2 trước, rồi nhân 134 với 3.'],
      solution: '134 × 2 = 268; 134 × 3 = 402, viết lùi sang trái một cột. 268 + 4 020 = 4 288.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 2 021 × 36 = ?',
      answer: 72756,
      hints: [
        'Tích riêng thứ nhất là 2 021 × 6.',
        'Tích riêng thứ hai là 2 021 × 3, viết lùi sang trái một cột.',
      ],
      solution:
        '2 021 × 6 = 12 126; 2 021 × 3 = 6 063, viết lùi sang trái một cột. 12 126 + 60 630 = 72 756.',
    },
    {
      type: 'choice',
      prompt: 'Khi đặt tính 45 × 12, tích riêng thứ hai được viết thế nào?',
      options: [
        'Lùi sang trái một cột so với tích riêng thứ nhất',
        'Thẳng cột với tích riêng thứ nhất',
        'Lùi sang phải một cột so với tích riêng thứ nhất',
      ],
      answer: 0,
      hints: ['Tích riêng thứ hai là 45 × 1 chục, tức là 45 chục.'],
      solution:
        'Tích riêng thứ hai là 45 chục = 450, nên viết lùi sang trái một cột. 90 + 450 = 540.',
    },
    {
      type: 'match',
      prompt: 'Nhân nhẩm với 11 rồi nối mỗi phép tính với kết quả.',
      left: ['12 × 11', '27 × 11', '35 × 11', '46 × 11'],
      right: ['132', '297', '385', '506', '54'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Cộng hai chữ số rồi viết tổng vào giữa.',
        '46 × 11: 4 + 6 = 10, viết 0 vào giữa, thêm 1 vào 4.',
      ],
      solution:
        '12 × 11 = 132 (1 + 2 = 3). 27 × 11 = 297 (2 + 7 = 9). 35 × 11 = 385 (3 + 5 = 8). 46 × 11 = 506 (4 + 6 = 10, viết 0, thêm 1 vào 4).',
    },
    {
      type: 'choice',
      prompt:
        'Nam nhân một số với 11 nhưng đặt hai tích riêng thẳng cột nên được 36. Tích đúng là bao nhiêu?',
      options: ['198', '36', '396', '180'],
      answer: 0,
      hints: ['Hai tích riêng bằng nhau và cộng lại được 36.', 'Mỗi tích riêng là 36 : 2.'],
      solution: 'Mỗi tích riêng là 36 : 2 = 18, nên số đó là 18. Tích đúng: 18 × 11 = 198.',
    },
    {
      type: 'number',
      prompt: 'Trường thuê 12 xe, mỗi xe có 45 chỗ ngồi. Hỏi các xe có tất cả bao nhiêu chỗ ngồi?',
      answer: 540,
      unit: 'chỗ ngồi',
      hints: ['Em tính 45 × 12.'],
      solution: '45 × 12: tích riêng 90 và 45 (lùi một cột). 90 + 450 = 540 (chỗ ngồi).',
    },
    {
      type: 'number',
      prompt: 'Mỗi quyển vở giá 12 000 đồng. Mua 15 quyển vở hết bao nhiêu tiền?',
      answer: 180000,
      unit: 'đồng',
      hints: ['Em tính 12 000 × 15.', 'Có thể tính 12 × 15 rồi viết thêm ba chữ số 0.'],
      solution: '12 × 15 = 180, nên 12 000 × 15 = 180 000 (đồng).',
    },
  ],
  takeaways: [
    'Nhân với chữ số hàng đơn vị được tích riêng thứ nhất.',
    'Nhân với chữ số hàng chục được tích riêng thứ hai, viết lùi sang trái một cột.',
    'Cộng hai tích riêng được tích.',
  ],
};
