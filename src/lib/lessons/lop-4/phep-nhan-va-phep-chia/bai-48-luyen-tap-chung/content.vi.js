/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép nhân và phép chia: nhân, chia nhẩm với 10, 100, 1 000 và số tròn chục, đặt tính nhân với số có hai chữ số, chia cho số có hai chữ số, tính thuận tiện, số trung bình cộng và bài toán rút về đơn vị.',
  intro:
    'Em đã biết nhân, chia số có nhiều chữ số, tính thuận tiện, tìm số trung bình cộng và giải bài toán rút về đơn vị. Cùng luyện tập để nhớ thật chắc nhé!',
  objectives: [
    'Củng cố tính nhẩm và đặt tính rồi tính phép nhân, phép chia.',
    'Vận dụng tính chất giao hoán, kết hợp, phân phối để tính thuận tiện.',
    'Giải bài toán thực tế: số trung bình cộng, rút về đơn vị, phép chia có dư.',
  ],
  sections: [
    {
      heading: 'Em nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân với 10, 100, 1 000: viết thêm một, hai, ba chữ số 0 vào bên phải. Chia cho 10, 100, 1 000: bỏ bớt một, hai, ba chữ số 0 ở bên phải.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân với số có hai chữ số: tích riêng thứ hai viết lùi sang trái một cột so với tích riêng thứ nhất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia từ trái sang phải. Số dư luôn bé hơn số chia.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'a × b = b × a; (a × b) × c = a × (b × c); a × (b + c) = a × b + a × c.',
        },
      ],
    },
    {
      heading: 'Giải toán',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số trung bình cộng: tính tổng các số, rồi chia cho số các số hạng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Rút về đơn vị: tìm giá trị của một phần trước, rồi tìm giá trị của nhiều phần.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['48 256 × 10', '482 560'],
            ['5 437 × 100', '543 700'],
            ['625 400 : 100', '6 254'],
            ['960 000 : 1 000', '960'],
          ],
          caption: 'Nhân, chia nhẩm với 10, 100, 1 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi bộ có một câu cho từng phần của chủ đề. Em chạm đáp án đúng. Sai lần đầu thì em xem gợi ý và thử lại. Cuối bộ, em biết phần nào cần ôn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 175 937 : 35.',
      steps: [
        '175 chia 35 được 5, viết 5. 5 nhân 35 bằng 175. 175 trừ 175 bằng 0.',
        'Hạ 9: 9 chia 35 được 0, viết 0.',
        'Hạ 3, được 93. 93 chia 35 được 2, viết 2. 2 nhân 35 bằng 70. 93 trừ 70 bằng 23.',
        'Hạ 7, được 237. 237 chia 35 được 6, viết 6. 6 nhân 35 bằng 210. 237 trừ 210 bằng 27.',
      ],
      answer: '175 937 : 35 = 5 026 (dư 27).',
    },
    {
      problem:
        'Có 15 thùng xoài như nhau cân nặng 675 kg. Cửa hàng đã bán 8 thùng. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam xoài?',
      steps: [
        'Mỗi thùng cân nặng: 675 : 15 = 45 (kg).',
        'Số thùng còn lại: 15 − 8 = 7 (thùng).',
        'Số xoài còn lại: 45 × 7 = 315 (kg).',
      ],
      answer: 'Cửa hàng còn lại 315 kg xoài.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép tính với kết quả.',
      left: ['7 192 × 1 000', '395 800 : 10', '86 × 100', '4 500 : 100'],
      right: ['7 192 000', '39 580', '8 600', '45', '450'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhân với 100: thêm hai chữ số 0. Chia cho 10: bỏ một chữ số 0 ở bên phải.'],
      solution:
        '7 192 × 1 000 = 7 192 000; 395 800 : 10 = 39 580; 86 × 100 = 8 600; 4 500 : 100 = 45.',
    },
    {
      type: 'match',
      prompt: 'Em tính nhẩm rồi nối phép tính với kết quả.',
      left: ['20 × 40', '70 × 60', '900 : 30', '3 600 : 600'],
      right: ['800', '4 200', '30', '6', '60'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        '20 × 40: em nhân 2 × 4 rồi viết thêm hai chữ số 0.',
        '900 : 30: em xoá một chữ số 0 ở số bị chia và số chia, được 90 : 3.',
      ],
      solution: '20 × 40 = 800; 70 × 60 = 4 200; 900 : 30 = 90 : 3 = 30; 3 600 : 600 = 36 : 6 = 6.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 91 207 × 8 = ?',
      answer: 729656,
      hints: ['Em nhân từ hàng đơn vị: 8 nhân 7 bằng 56, viết 6, nhớ 5.'],
      solution:
        '8 × 7 = 56, viết 6, nhớ 5; 8 × 0 = 0, thêm 5 bằng 5; 8 × 2 = 16, viết 6, nhớ 1; 8 × 1 = 8, thêm 1 bằng 9; 8 × 9 = 72, viết 72. Vậy 91 207 × 8 = 729 656.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 2 615 × 63 = ?',
      answer: 164745,
      hints: [
        'Tích riêng thứ nhất: 2 615 × 3. Tích riêng thứ hai: 2 615 × 6.',
        'Tích riêng thứ hai viết lùi sang trái một cột.',
      ],
      solution:
        '2 615 × 3 = 7 845; 2 615 × 6 = 15 690, viết lùi sang trái một cột. 7 845 + 156 900 = 164 745.',
    },
    {
      type: 'choice',
      prompt: 'Khi đặt tính 815 × 24, tích riêng thứ hai 1 630 được viết thế nào?',
      options: [
        'Lùi sang trái một cột so với tích riêng thứ nhất',
        'Thẳng cột với tích riêng thứ nhất',
        'Lùi sang phải một cột so với tích riêng thứ nhất',
      ],
      answer: 0,
      hints: ['1 630 là 815 × 2 chục, tức là 1 630 chục.'],
      solution:
        'Tích riêng thứ hai là 1 630 chục nên viết lùi sang trái một cột: 3 260 + 16 300 = 19 560. Vậy 815 × 24 = 19 560.',
    },
    {
      type: 'number',
      prompt: '? × 7 = 14 742. Số cần điền là số nào?',
      answer: 2106,
      hints: [
        'Muốn tìm thừa số chưa biết, em lấy tích chia cho thừa số đã biết.',
        'Khi chia, hạ 4 xuống: 4 bé hơn 7, nhớ viết 0 vào thương.',
      ],
      solution: '14 742 : 7 = 2 106. Thử lại: 2 106 × 7 = 14 742.',
    },
    {
      type: 'choice',
      prompt: '104 160 : 32 = ?',
      options: ['3 255', '3 155', '3 265', '325'],
      answer: 0,
      hints: ['104 chia 32 được 3. Em thử lại bằng phép nhân thương với 32.'],
      solution:
        '104 : 32 = 3, dư 8; hạ 1 được 81 : 32 = 2, dư 17; hạ 6 được 176 : 32 = 5, dư 16; hạ 0 được 160 : 32 = 5. Vậy 104 160 : 32 = 3 255. Thử lại: 3 255 × 32 = 104 160.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 512 × 20 × 5 = ?',
      answer: 51200,
      hints: ['20 × 5 bằng bao nhiêu?'],
      solution: '512 × 20 × 5 = 512 × (20 × 5) = 512 × 100 = 51 200.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 930 × 65 + 65 × 70 = ?',
      answer: 65000,
      hints: ['Hai tích có cùng thừa số 65.', 'Em tính 930 + 70 trước.'],
      solution: '930 × 65 + 65 × 70 = 65 × (930 + 70) = 65 × 1 000 = 65 000.',
    },
    {
      type: 'choice',
      prompt:
        'Vườn hồng hình chữ nhật dài 14 m, rộng 10 m. Vườn cúc hình vuông cạnh 12 m. Câu nào đúng?',
      options: [
        'Hai vườn có chu vi bằng nhau, vườn hồng có diện tích bé hơn.',
        'Hai vườn có diện tích bằng nhau.',
        'Vườn hồng có chu vi lớn hơn vườn cúc.',
      ],
      answer: 0,
      hints: ['Em tính chu vi và diện tích của từng vườn rồi so sánh.'],
      solution:
        'Chu vi vườn hồng: (14 + 10) × 2 = 48 (m); chu vi vườn cúc: 12 × 4 = 48 (m). Diện tích vườn hồng: 14 × 10 = 140 (m²); diện tích vườn cúc: 12 × 12 = 144 (m²). Chu vi bằng nhau, vườn hồng có diện tích bé hơn.',
    },
    {
      type: 'number',
      prompt:
        'Khối lớp 4 có 1 lớp 27 học sinh và 6 lớp, mỗi lớp 34 học sinh. Hỏi trung bình mỗi lớp có bao nhiêu học sinh?',
      answer: 33,
      unit: 'học sinh',
      hints: ['Khối lớp 4 có tất cả 7 lớp.', 'Em tính tổng số học sinh rồi chia cho 7.'],
      solution:
        '6 lớp có: 34 × 6 = 204 (học sinh). Cả khối có: 27 + 204 = 231 (học sinh). Trung bình mỗi lớp có: 231 : 7 = 33 (học sinh).',
    },
    {
      type: 'number',
      prompt: '8 hộp như nhau có 96 cái bánh. Hỏi 5 hộp như thế có bao nhiêu cái bánh?',
      answer: 60,
      unit: 'cái bánh',
      hints: ['Em tìm số bánh trong 1 hộp trước: 96 : 8.'],
      solution: '1 hộp có: 96 : 8 = 12 (cái bánh). 5 hộp có: 12 × 5 = 60 (cái bánh).',
    },
    {
      type: 'choice',
      prompt:
        '6 hộp bút như nhau có 72 cái bút chì. Có 760 cái bút chì xếp vào các hộp như thế. Xếp được nhiều nhất bao nhiêu hộp và còn thừa mấy cái bút chì?',
      options: [
        '63 hộp, thừa 4 cái bút chì',
        '126 hộp, thừa 4 cái bút chì',
        '62 hộp, thừa 16 cái bút chì',
        '64 hộp, không thừa cái nào',
      ],
      answer: 0,
      hints: [
        'Em tìm số bút trong 1 hộp trước: 72 : 6.',
        'Rồi chia 760 cho số bút trong 1 hộp. Số dư phải bé hơn số chia.',
      ],
      solution:
        'Mỗi hộp có: 72 : 6 = 12 (cái bút chì). 760 : 12 = 63 (dư 4). Xếp được nhiều nhất 63 hộp, còn thừa 4 cái bút chì.',
    },
  ],
  takeaways: [
    'Nhân, chia với 10, 100, 1 000: thêm hoặc bớt chữ số 0 ở bên phải.',
    'Nhân với số có hai chữ số: tích riêng thứ hai lùi sang trái một cột.',
    'Chia: lần nào hạ xuống mà bé hơn số chia thì viết 0 vào thương; số dư bé hơn số chia.',
    'Nhóm các thừa số thành số tròn chục, tròn trăm để tính thuận tiện.',
    'Rút về đơn vị: tìm giá trị một phần trước.',
  ],
};
