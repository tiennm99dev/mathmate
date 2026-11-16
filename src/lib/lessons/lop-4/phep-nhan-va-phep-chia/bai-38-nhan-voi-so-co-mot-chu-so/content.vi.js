/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép nhân số có nhiều chữ số với số có một chữ số, không nhớ và có nhớ; tính giá trị biểu thức và giải bài toán có phép nhân.',
  intro:
    'Bóng đèn trong nhà sáng được 12 250 giờ. Bóng đèn đường bền gấp 3 lần. Bóng đèn đường sáng được bao nhiêu giờ? Em đặt tính rồi nhân từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và nhân số có nhiều chữ số với số có một chữ số.',
    'Nhân có nhớ: thêm số đã nhớ vào kết quả của hàng tiếp theo.',
    'Tính giá trị biểu thức và giải bài toán có phép nhân.',
  ],
  sections: [
    {
      heading: 'Nhân không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 241 324 × 2.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết 241 324, viết 2 thẳng cột với chữ số hàng đơn vị, viết dấu nhân, kẻ vạch ngang.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '2 nhân 4 bằng 8, viết 8.',
            '2 nhân 2 bằng 4, viết 4.',
            '2 nhân 3 bằng 6, viết 6.',
            '2 nhân 1 bằng 2, viết 2.',
            '2 nhân 4 bằng 8, viết 8.',
            '2 nhân 2 bằng 4, viết 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '241 324 × 2 = 482 648.' },
      ],
    },
    {
      heading: 'Nhân có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 136 204 × 4.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '4 nhân 4 bằng 16, viết 6, nhớ 1.',
            '4 nhân 0 bằng 0, thêm 1 bằng 1, viết 1.',
            '4 nhân 2 bằng 8, viết 8.',
            '4 nhân 6 bằng 24, viết 4, nhớ 2.',
            '4 nhân 3 bằng 12, thêm 2 bằng 14, viết 4, nhớ 1.',
            '4 nhân 1 bằng 4, thêm 1 bằng 5, viết 5.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '136 204 × 4 = 544 816.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em nhân lần lượt từ phải sang trái, bắt đầu từ hàng đơn vị. Có số nhớ thì em thêm số nhớ vào kết quả của hàng tiếp theo.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ở hàng cuối cùng bên trái, em viết cả kết quả. Ví dụ: 40 819 × 5, hàng cuối 5 nhân 4 bằng 20, em viết 20.',
        },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức',
      blocks: [
        { type: 'p', text: 'Em tính 460 839 + 29 210 × 3.' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong biểu thức có phép cộng và phép nhân, em làm phép nhân trước.',
        },
        { type: 'p', text: '29 210 × 3 = 87 630.' },
        { type: 'p', text: '460 839 + 87 630 = 548 469.' },
      ],
    },
  ],
  explore: {
    title: 'Nhân từng hàng',
    instruction:
      'Em nhân từ hàng đơn vị, chạm vào chữ số để viết kết quả mỗi hàng. Số nhớ hiện màu đỏ trên hàng bên trái. Chọn "Nhớ nhiều lần" để thử phép nhân khó hơn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 40 819 × 5.',
      steps: [
        '5 nhân 9 bằng 45, viết 5, nhớ 4.',
        '5 nhân 1 bằng 5, thêm 4 bằng 9, viết 9.',
        '5 nhân 8 bằng 40, viết 0, nhớ 4.',
        '5 nhân 0 bằng 0, thêm 4 bằng 4, viết 4.',
        '5 nhân 4 bằng 20, viết 20.',
      ],
      answer: '40 819 × 5 = 204 095.',
    },
    {
      problem:
        'Bóng đèn trong nhà có tuổi thọ 12 250 giờ. Bóng đèn đường có tuổi thọ gấp 3 lần bóng đèn trong nhà. Hỏi bóng đèn đường có tuổi thọ bao nhiêu giờ?',
      steps: [
        'Gấp 3 lần, em làm phép nhân: 12 250 × 3.',
        '3 nhân 0 bằng 0, viết 0. 3 nhân 5 bằng 15, viết 5, nhớ 1.',
        '3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. 3 nhân 2 bằng 6, viết 6.',
        '3 nhân 1 bằng 3, viết 3.',
        '12 250 × 3 = 36 750 (giờ).',
      ],
      answer: 'Bóng đèn đường có tuổi thọ 36 750 giờ.',
    },
    {
      problem: 'Tính giá trị của biểu thức: 648 501 − 20 810 × 4.',
      steps: [
        'Em làm phép nhân trước: 20 810 × 4 = 83 240.',
        'Rồi làm phép trừ: 648 501 − 83 240 = 565 261.',
      ],
      answer: '648 501 − 20 810 × 4 = 565 261.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 374 519 × 2 = ?',
      answer: 749038,
      hints: ['2 nhân 9 bằng 18, viết 8, nhớ 1.', 'Hàng chục: 2 nhân 1 bằng 2, thêm 1 đã nhớ.'],
      solution:
        '2 nhân 9 bằng 18, viết 8, nhớ 1. 2 nhân 1 bằng 2, thêm 1 bằng 3, viết 3. 2 nhân 5 bằng 10, viết 0, nhớ 1. 2 nhân 4 bằng 8, thêm 1 bằng 9, viết 9. 2 nhân 7 bằng 14, viết 4, nhớ 1. 2 nhân 3 bằng 6, thêm 1 bằng 7, viết 7. Vậy 374 519 × 2 = 749 038.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả của nó.',
      left: ['48 102 × 5', '32 419 × 4', '27 283 × 3', '172 923 × 3'],
      right: ['240 510', '129 676', '81 849', '518 769', '240 500'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhìn chữ số hàng đơn vị của kết quả trước: 2 × 5 = 10, nên 48 102 × 5 có tận cùng là 0.',
        'Em đặt tính từng phép nhân, nhớ thêm số nhớ vào hàng bên trái.',
      ],
      solution:
        '48 102 × 5 = 240 510; 32 419 × 4 = 129 676; 27 283 × 3 = 81 849; 172 923 × 3 = 518 769.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam tính 31 090 × 2 = 26 180. Kết quả đúng là bao nhiêu?',
      options: ['62 180', '26 180', '62 080', '61 180'],
      answer: 0,
      hints: [
        'Em tính lại hàng nghìn và hàng chục nghìn.',
        '2 nhân 3 chục nghìn bằng 6 chục nghìn.',
      ],
      solution:
        '2 nhân 0 bằng 0, viết 0. 2 nhân 9 bằng 18, viết 8, nhớ 1. 2 nhân 0 bằng 0, thêm 1 bằng 1, viết 1. 2 nhân 1 bằng 2, viết 2. 2 nhân 3 bằng 6, viết 6. Vậy 31 090 × 2 = 62 180.',
    },
    {
      type: 'choice',
      prompt: '250 000 × 3 bằng bao nhiêu?',
      options: ['750 000', '650 000', '75 000', '7 500 000'],
      answer: 0,
      hints: ['Em nhẩm: 25 chục nghìn × 3.'],
      solution: '25 chục nghìn × 3 = 75 chục nghìn. Vậy 250 000 × 3 = 750 000.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt có 200 000 đồng. Rô-bốt mua 2 bộ cờ vua, mỗi bộ có giá 80 000 đồng. Hỏi Rô-bốt còn lại bao nhiêu tiền?',
      answer: 40000,
      unit: 'đồng',
      hints: ['Trước hết em tính tiền mua 2 bộ cờ vua.', 'Rồi lấy 200 000 trừ đi số tiền đó.'],
      solution:
        'Tiền mua 2 bộ cờ vua: 80 000 × 2 = 160 000 (đồng). Rô-bốt còn lại: 200 000 − 160 000 = 40 000 (đồng).',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 460 839 + 29 210 × 3.',
      answer: 548469,
      hints: ['Em làm phép nhân trước, phép cộng sau.', '29 210 × 3 = 87 630.'],
      solution: '29 210 × 3 = 87 630. Vậy 460 839 + 29 210 × 3 = 460 839 + 87 630 = 548 469.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 172 923 × 3 theo đúng thứ tự.',
      items: [
        '3 nhân 9 bằng 27, viết 7, nhớ 2',
        '3 nhân 3 bằng 9, viết 9',
        '3 nhân 7 bằng 21, viết 1, nhớ 2',
        '3 nhân 2 bằng 6, viết 6',
        '3 nhân 1 bằng 3, thêm 2 bằng 5, viết 5',
        '3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8',
      ],
      answer: [1, 3, 0, 5, 2, 4],
      hints: ['Em nhân từ hàng đơn vị trước: 3 nhân 3.', 'Hàng trăm nghìn làm sau cùng: 3 nhân 1.'],
      solution:
        '3 nhân 3 bằng 9, viết 9. 3 nhân 2 bằng 6, viết 6. 3 nhân 9 bằng 27, viết 7, nhớ 2. 3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8. 3 nhân 7 bằng 21, viết 1, nhớ 2. 3 nhân 1 bằng 3, thêm 2 bằng 5, viết 5. Vậy 172 923 × 3 = 518 769.',
    },
    {
      type: 'choice',
      prompt:
        'Mai tính 123 214 × 3 như sau: 3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 1 bằng 3, viết 3. Rồi Mai nhân tiếp và được 369 632. Mai làm đúng hay sai?',
      options: [
        'Sai, ở hàng chục Mai quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng đơn vị Mai quên nhớ 1',
      ],
      answer: 0,
      hints: ['Hàng đơn vị nhớ 1 sang hàng chục. Em xem Mai có thêm số 1 đó không.'],
      solution:
        'Hàng chục: 3 nhân 1 bằng 3, phải thêm 1 bằng 4, viết 4. Vậy 123 214 × 3 = 369 642, không phải 369 632.',
    },
    {
      type: 'number',
      prompt:
        'Một nhà máy mỗi ngày làm được 125 460 chai nước. Hỏi 6 ngày nhà máy làm được bao nhiêu chai nước?',
      answer: 752760,
      unit: 'chai',
      hints: [
        '125 460 chai được lấy 6 lần, em làm phép nhân.',
        '6 nhân 0 bằng 0, viết 0. 6 nhân 6 bằng 36, viết 6, nhớ 3.',
      ],
      solution:
        '6 nhân 0 bằng 0, viết 0. 6 nhân 6 bằng 36, viết 6, nhớ 3. 6 nhân 4 bằng 24, thêm 3 bằng 27, viết 7, nhớ 2. 6 nhân 5 bằng 30, thêm 2 bằng 32, viết 2, nhớ 3. 6 nhân 2 bằng 12, thêm 3 bằng 15, viết 5, nhớ 1. 6 nhân 1 bằng 6, thêm 1 bằng 7, viết 7. 6 ngày làm được 125 460 × 6 = 752 760 (chai nước).',
    },
  ],
  takeaways: [
    'Đặt tính: viết thừa số có một chữ số thẳng cột với hàng đơn vị.',
    'Nhân từ phải sang trái, thêm số đã nhớ vào kết quả của hàng tiếp theo.',
    'Trong biểu thức, làm phép nhân trước, phép cộng và phép trừ sau.',
  ],
};
