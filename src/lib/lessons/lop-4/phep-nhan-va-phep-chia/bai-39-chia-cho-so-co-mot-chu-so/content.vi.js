/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép chia số có nhiều chữ số cho số có một chữ số: chia từ trái sang phải, phép chia hết, phép chia có dư và thương có chữ số 0; thử lại phép chia.',
  intro:
    'Có 128 472 l nước chia đều vào 6 bể. Mỗi bể có bao nhiêu lít nước? Em đặt tính rồi chia từ bên trái nhé!',
  objectives: [
    'Đặt tính và chia số có nhiều chữ số cho số có một chữ số.',
    'Chia từ trái sang phải. Mỗi lượt: chia, nhân, trừ, rồi hạ chữ số tiếp theo.',
    'Biết phép chia có dư: số dư bé hơn số chia.',
    'Thử lại phép chia bằng phép nhân.',
  ],
  sections: [
    {
      heading: 'Phép chia hết',
      blocks: [
        {
          type: 'p',
          text: 'Em tính 128 472 : 6. Chữ số đầu tiên là 1, bé hơn 6, nên em lấy 12 để chia.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '12 chia 6 được 2, viết 2. 2 nhân 6 bằng 12; 12 trừ 12 bằng 0.',
            'Hạ 8; 8 chia 6 được 1, viết 1. 1 nhân 6 bằng 6; 8 trừ 6 bằng 2.',
            'Hạ 4, được 24; 24 chia 6 được 4, viết 4. 4 nhân 6 bằng 24; 24 trừ 24 bằng 0.',
            'Hạ 7; 7 chia 6 được 1, viết 1. 1 nhân 6 bằng 6; 7 trừ 6 bằng 1.',
            'Hạ 2, được 12; 12 chia 6 được 2, viết 2. 2 nhân 6 bằng 12; 12 trừ 12 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '128 472 : 6 = 21 412.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em chia lần lượt từ trái sang phải. Mỗi lượt: chia, viết chữ số ở thương, nhân, trừ, rồi hạ chữ số tiếp theo.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        { type: 'p', text: 'Em tính 230 859 : 5. Em lấy 23 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '23 chia 5 được 4, viết 4. 4 nhân 5 bằng 20; 23 trừ 20 bằng 3.',
            'Hạ 0, được 30; 30 chia 5 được 6, viết 6. 6 nhân 5 bằng 30; 30 trừ 30 bằng 0.',
            'Hạ 8; 8 chia 5 được 1, viết 1. 1 nhân 5 bằng 5; 8 trừ 5 bằng 3.',
            'Hạ 5, được 35; 35 chia 5 được 7, viết 7. 7 nhân 5 bằng 35; 35 trừ 35 bằng 0.',
            'Hạ 9; 9 chia 5 được 1, viết 1. 1 nhân 5 bằng 5; 9 trừ 5 bằng 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '230 859 : 5 = 46 171 (dư 4).' },
        { type: 'callout', tone: 'warning', text: 'Số dư luôn bé hơn số chia.' },
        { type: 'p', text: 'Thử lại: 46 171 × 5 = 230 855, 230 855 + 4 = 230 859.' },
      ],
    },
    {
      heading: 'Thương có chữ số 0',
      blocks: [
        { type: 'p', text: 'Em tính 420 318 : 6. Em lấy 42 để chia.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '42 chia 6 được 7, viết 7. 7 nhân 6 bằng 42; 42 trừ 42 bằng 0.',
            'Hạ 0; 0 chia 6 được 0, viết 0.',
            'Hạ 3; 3 chia 6 được 0, viết 0. 3 trừ 0 bằng 3.',
            'Hạ 1, được 31; 31 chia 6 được 5, viết 5. 5 nhân 6 bằng 30; 31 trừ 30 bằng 1.',
            'Hạ 8, được 18; 18 chia 6 được 3, viết 3. 3 nhân 6 bằng 18; 18 trừ 18 bằng 0.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '420 318 : 6 = 70 053.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần hạ một chữ số mà chưa chia được, em viết 0 ở thương rồi mới hạ tiếp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia từng bước',
    instruction:
      'Em chạm chữ số để viết thương và số dư mỗi lượt, rồi bấm "Hạ" để hạ chữ số tiếp theo. Ô màu vàng là số em đang chia.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 826 391 : 7.',
      steps: [
        '8 chia 7 được 1, viết 1; 1 nhân 7 bằng 7; 8 trừ 7 bằng 1.',
        'Hạ 2, được 12; 12 chia 7 được 1, viết 1; 1 nhân 7 bằng 7; 12 trừ 7 bằng 5.',
        'Hạ 6, được 56; 56 chia 7 được 8, viết 8; 8 nhân 7 bằng 56; 56 trừ 56 bằng 0.',
        'Hạ 3; 3 chia 7 được 0, viết 0; 3 trừ 0 bằng 3.',
        'Hạ 9, được 39; 39 chia 7 được 5, viết 5; 5 nhân 7 bằng 35; 39 trừ 35 bằng 4.',
        'Hạ 1, được 41; 41 chia 7 được 5, viết 5; 5 nhân 7 bằng 35; 41 trừ 35 bằng 6.',
      ],
      answer: '826 391 : 7 = 118 055 (dư 6).',
    },
    {
      problem: 'Có 124 650 kg gạo chia đều vào 6 kho. Hỏi mỗi kho có bao nhiêu ki-lô-gam gạo?',
      steps: [
        'Chia đều vào 6 kho, em làm phép chia: 124 650 : 6.',
        '12 chia 6 được 2, viết 2. Hạ 4; 4 chia 6 được 0, viết 0.',
        'Hạ 6, được 46; 46 chia 6 được 7, viết 7; 46 trừ 42 bằng 4.',
        'Hạ 5, được 45; 45 chia 6 được 7, viết 7; 45 trừ 42 bằng 3.',
        'Hạ 0, được 30; 30 chia 6 được 5, viết 5; 30 trừ 30 bằng 0.',
        '124 650 : 6 = 20 775 (kg).',
      ],
      answer: 'Mỗi kho có 20 775 kg gạo.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 38 295 : 3 = ?',
      answer: 12765,
      hints: [
        '3 chia 3 được 1. Hạ 8; 8 chia 3 được 2, còn 2.',
        'Hạ 2, được 22; 22 chia 3 được mấy?',
      ],
      solution:
        '3 chia 3 được 1. Hạ 8; 8 chia 3 được 2, còn 2. Hạ 2, được 22; 22 chia 3 được 7, còn 1. Hạ 9, được 19; 19 chia 3 được 6, còn 1. Hạ 5, được 15; 15 chia 3 được 5, còn 0. Vậy 38 295 : 3 = 12 765.',
    },
    {
      type: 'choice',
      prompt: '826 391 : 7 bằng bao nhiêu?',
      options: ['118 055 (dư 6)', '11 855 (dư 6)', '118 055 (dư 4)', '118 155 (dư 6)'],
      answer: 0,
      hints: ['Hạ 3 mà 3 chia 7 được 0, em phải viết 0 ở thương.', 'Số dư cuối cùng: 41 trừ 35.'],
      solution:
        '8 : 7 được 1, dư 1. 12 : 7 được 1, dư 5. 56 : 7 được 8, dư 0. 3 : 7 được 0, dư 3. 39 : 7 được 5, dư 4. 41 : 7 được 5, dư 6. Vậy 826 391 : 7 = 118 055 (dư 6).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với kết quả của nó.',
      left: ['872 905 : 6', '542 827 : 6', '128 472 : 6', '230 859 : 5'],
      right: ['145 484 (dư 1)', '90 471 (dư 1)', '21 412', '46 171 (dư 4)', '9 471 (dư 1)'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em đặt tính từng phép chia.',
        '542 827 : 6: hạ 2 mà 2 chia 6 được 0, nên thương có chữ số 0.',
      ],
      solution:
        '872 905 : 6 = 145 484 (dư 1); 542 827 : 6 = 90 471 (dư 1); 128 472 : 6 = 21 412; 230 859 : 5 = 46 171 (dư 4).',
    },
    {
      type: 'choice',
      prompt: 'Trong một phép chia cho 7, số dư không thể là số nào?',
      options: ['7', '6', '3', '0'],
      answer: 0,
      hints: ['Số dư luôn bé hơn số chia.'],
      solution:
        'Số dư phải bé hơn 7, nên số dư có thể là 0, 1, 2, 3, 4, 5, 6. Số dư không thể là 7.',
    },
    {
      type: 'number',
      prompt: 'Phép chia 230 859 : 5 có số dư là bao nhiêu?',
      answer: 4,
      hints: ['Em chia đến chữ số cuối cùng: 9 chia 5 được 1.', 'Rồi lấy 9 trừ 5.'],
      solution: '230 859 : 5 = 46 171 (dư 4). Số dư là 4.',
    },
    {
      type: 'choice',
      prompt:
        'An tính 542 827 : 6 = 9 471 (dư 1). Thử lại: 9 471 × 6 + 1 = 56 827, không bằng 542 827. An sai ở đâu?',
      options: ['An quên viết chữ số 0 ở thương khi hạ 2', 'An làm đúng rồi', 'An tính sai số dư'],
      answer: 0,
      hints: ['54 chia 6 được 9. Hạ 2 thì 2 chia 6 được mấy?'],
      solution:
        '54 chia 6 được 9. Hạ 2, 2 chia 6 được 0, phải viết 0 ở thương. Đúng là 542 827 : 6 = 90 471 (dư 1).',
    },
    {
      type: 'number',
      prompt: 'Phép chia có số chia là 5, thương là 46 171 và số dư là 4. Số bị chia là bao nhiêu?',
      answer: 230859,
      hints: ['Số bị chia = thương × số chia + số dư.'],
      solution: '46 171 × 5 = 230 855; 230 855 + 4 = 230 859. Số bị chia là 230 859.',
    },
    {
      type: 'number',
      prompt: 'Có 124 650 kg gạo chia đều vào 6 kho. Hỏi mỗi kho có bao nhiêu ki-lô-gam gạo?',
      answer: 20775,
      unit: 'kg',
      hints: [
        'Chia đều vào 6 kho, em làm phép chia cho 6.',
        'Hạ 4 mà 4 chia 6 được 0: em viết 0 ở thương.',
      ],
      solution: '124 650 : 6 = 20 775 (kg). Mỗi kho có 20 775 kg gạo.',
    },
    {
      type: 'number',
      prompt:
        'Người ta xếp 100 250 quyển vở vào các thùng, mỗi thùng 8 quyển. Hỏi cần ít nhất bao nhiêu thùng để xếp hết số vở đó?',
      answer: 12532,
      unit: 'thùng',
      hints: ['Em tính 100 250 : 8.', 'Phép chia còn dư, số vở dư cũng cần thêm một thùng.'],
      solution:
        '100 250 : 8 = 12 531 (dư 2). Xếp được 12 531 thùng, còn 2 quyển vở cần thêm 1 thùng nữa. Cần ít nhất 12 531 + 1 = 12 532 (thùng).',
    },
  ],
  takeaways: [
    'Chia từ trái sang phải: chia, nhân, trừ, rồi hạ chữ số tiếp theo.',
    'Hạ một chữ số mà chưa chia được thì viết 0 ở thương.',
    'Số dư luôn bé hơn số chia. Thử lại: thương × số chia + số dư = số bị chia.',
  ],
};
