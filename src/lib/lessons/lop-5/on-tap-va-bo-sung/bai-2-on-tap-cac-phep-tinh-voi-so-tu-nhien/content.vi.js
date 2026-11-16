/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cộng, trừ, nhân, chia số tự nhiên; thứ tự thực hiện phép tính; tính chất giao hoán, kết hợp, nhân một số với một tổng và tính bằng cách thuận tiện; giải toán.',
  intro:
    'Tính 25 × 99 × 4 thế nào cho nhanh? Nếu em nhân 25 với 4 trước thì được 100, rồi chỉ cần nhân 100 với 99. Cùng ôn lại các phép tính và cách tính thuận tiện nhé!',
  objectives: [
    'Đặt tính và tính được cộng, trừ, nhân, chia số tự nhiên.',
    'Tính được giá trị biểu thức theo đúng thứ tự.',
    'Vận dụng tính chất của phép tính để tính thuận tiện; giải được bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Bốn phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Khi đặt tính, em viết các chữ số cùng hàng thẳng cột. Cộng, trừ, nhân thì tính từ phải sang trái. Chia thì tính từ trái sang phải.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['7 318 + 3 191', '10 509'],
            ['83 500 − 28 150', '55 350'],
            ['307 × 15', '4 605'],
            ['4 488 : 34', '132'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Thử lại phép chia: 132 × 34 = 4 488. Thử lại phép trừ: 55 350 + 28 150 = 83 500.',
        },
      ],
    },
    {
      heading: 'Thứ tự thực hiện phép tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có dấu ngoặc thì tính trong ngoặc trước. Không có ngoặc thì nhân, chia trước; cộng, trừ sau.',
        },
        { type: 'p', text: '3 713 − 200 × 5 = 3 713 − 1 000 = 2 713.' },
        { type: 'p', text: '1 500 + (750 + 250) : 2 = 1 500 + 1 000 : 2 = 1 500 + 500 = 2 000.' },
      ],
    },
    {
      heading: 'Tính chất của phép tính',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Ví dụ'],
          rows: [
            ['Giao hoán', '483 + 5 109 = 5 109 + 483; 999 × 45 = 45 × 999'],
            ['Kết hợp', '871 + 500 + 500 = 871 + (500 + 500)'],
            ['Nhân một số với một tổng', '2 × 75 + 2 × 25 = 2 × (75 + 25)'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tính thuận tiện: em đổi chỗ, nhóm các số để được số tròn chục, tròn trăm, tròn nghìn rồi mới tính.',
        },
        { type: 'p', text: '2 025 × 17 + 83 × 2 025 = 2 025 × (17 + 83) = 2 025 × 100 = 202 500.' },
      ],
    },
  ],
  explore: {
    title: 'Chọn cách tính nhanh nhất',
    instruction:
      'Em đọc biểu thức và chọn cách tính nhanh nhất trong ba cách. Chọn đúng cách thì em xem các bước và chọn kết quả.',
  },
  examples: [
    {
      problem:
        'Mai mua hai gói bim bim hết 18 000 đồng. Gói bim bim cua đắt hơn gói bim bim mực 4 000 đồng. Tính giá tiền mỗi gói.',
      steps: [
        'Đây là bài toán tìm hai số khi biết tổng và hiệu.',
        'Giá gói bim bim cua: (18 000 + 4 000) : 2 = 11 000 (đồng).',
        'Giá gói bim bim mực: 11 000 − 4 000 = 7 000 (đồng).',
      ],
      answer: 'Gói bim bim cua 11 000 đồng, gói bim bim mực 7 000 đồng.',
    },
    {
      problem:
        'Rô-bốt bán bốn bức tranh giá 85 500 đồng, 150 000 đồng, 425 000 đồng và 55 500 đồng. Trung bình mỗi bức tranh giá bao nhiêu tiền?',
      steps: [
        'Tổng số tiền: 85 500 + 150 000 + 425 000 + 55 500 = 716 000 (đồng).',
        'Trung bình mỗi bức: 716 000 : 4 = 179 000 (đồng).',
      ],
      answer: 'Trung bình mỗi bức tranh giá 179 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 7 318 + 3 191',
      answer: 10509,
      hints: ['Đặt tính thẳng cột, cộng từ hàng đơn vị. Nhớ khi tổng một hàng từ 10 trở lên.'],
      solution: '8 + 1 = 9; 1 + 9 = 10, viết 0 nhớ 1; 3 + 1 + 1 = 5; 7 + 3 = 10. Kết quả 10 509.',
    },
    {
      type: 'number',
      prompt: 'Tính: 83 500 − 28 150',
      answer: 55350,
      hints: [
        'Đặt tính thẳng cột, trừ từ hàng đơn vị. Hàng nào không trừ được thì mượn 1 ở hàng bên trái.',
      ],
      solution: '83 500 − 28 150 = 55 350. Thử lại: 55 350 + 28 150 = 83 500.',
    },
    {
      type: 'number',
      prompt: 'Tính: 307 × 15',
      answer: 4605,
      hints: ['Nhân 307 với 5, rồi nhân 307 với 1 chục, viết lùi sang trái một cột rồi cộng.'],
      solution: '307 × 5 = 1 535; 307 × 10 = 3 070; 1 535 + 3 070 = 4 605.',
    },
    {
      type: 'number',
      prompt: 'Tính: 4 488 : 34',
      answer: 132,
      hints: ['44 chia 34 được 1, dư 10. Hạ 8 được 108.'],
      solution:
        '44 : 34 được 1, dư 10; 108 : 34 được 3, dư 6; 68 : 34 được 2. Kết quả 132. Thử lại: 132 × 34 = 4 488.',
    },
    {
      type: 'match',
      prompt: 'Không tính, em nối hai biểu thức có giá trị bằng nhau.',
      left: ['483 + 5 109', '871 + 500 + 500', '999 × 45', '2 × 75 + 2 × 25'],
      right: ['5 109 + 483', '871 + (500 + 500)', '45 × 999', '2 × (75 + 25)', '2 × 75 + 25'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Đổi chỗ các số hạng (thừa số) thì tổng (tích) không đổi.',
        'Nhân một số với một tổng.',
      ],
      solution:
        '483 + 5 109 = 5 109 + 483 (giao hoán). 871 + 500 + 500 = 871 + (500 + 500) (kết hợp). 999 × 45 = 45 × 999 (giao hoán). 2 × 75 + 2 × 25 = 2 × (75 + 25) (nhân một số với một tổng).',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của biểu thức 3 713 − 200 × 5 là bao nhiêu?',
      options: ['2 713', '17 565', '3 513'],
      answer: 0,
      hints: ['Biểu thức không có ngoặc: nhân trước, trừ sau.'],
      solution: '3 713 − 200 × 5 = 3 713 − 1 000 = 2 713.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 1 500 + (750 + 250) : 2',
      answer: 2000,
      hints: ['Tính trong ngoặc trước, rồi chia, cuối cùng mới cộng.'],
      solution: '1 500 + (750 + 250) : 2 = 1 500 + 1 000 : 2 = 1 500 + 500 = 2 000.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 25 × 99 × 4',
      answer: 9900,
      hints: ['Nhân 25 với 4 trước.'],
      solution: '25 × 99 × 4 = (25 × 4) × 99 = 100 × 99 = 9 900.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 2 025 × 17 + 83 × 2 025',
      answer: 202500,
      hints: ['Hai tích có chung thừa số 2 025.', '17 + 83 = 100.'],
      solution: '2 025 × 17 + 83 × 2 025 = 2 025 × (17 + 83) = 2 025 × 100 = 202 500.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng bằng cách thuận tiện: 400 + 280 + 600 + 720 + 510 + 490',
      answer: 3000,
      hints: ['Ghép các cặp số có tổng tròn nghìn: 400 và 600, 280 và 720, 510 và 490.'],
      solution: '(400 + 600) + (280 + 720) + (510 + 490) = 1 000 + 1 000 + 1 000 = 3 000.',
    },
    {
      type: 'number',
      prompt:
        'Mai mua hai gói bim bim hết 18 000 đồng. Gói bim bim cua đắt hơn gói bim bim mực 4 000 đồng. Gói bim bim mực giá bao nhiêu tiền?',
      answer: 7000,
      unit: 'đồng',
      hints: ['Số bé = (tổng − hiệu) : 2.'],
      solution: 'Giá gói bim bim mực: (18 000 − 4 000) : 2 = 7 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Bác Ba chia 525 kg gạo vào các túi, mỗi túi 15 kg, rồi bán mỗi túi 250 000 đồng. Bác Ba thu được bao nhiêu tiền?',
      answer: 8750000,
      unit: 'đồng',
      hints: ['Tìm số túi gạo trước: 525 : 15.', 'Rồi nhân số túi với giá một túi.'],
      solution: 'Số túi gạo: 525 : 15 = 35 (túi). Số tiền: 250 000 × 35 = 8 750 000 (đồng).',
    },
  ],
  takeaways: [
    'Có ngoặc thì tính trong ngoặc trước; nhân, chia trước, cộng, trừ sau.',
    'Giao hoán: a + b = b + a, a × b = b × a.',
    'Kết hợp: (a + b) + c = a + (b + c), (a × b) × c = a × (b × c).',
    'Nhân một số với một tổng: a × b + a × c = a × (b + c).',
  ],
};
