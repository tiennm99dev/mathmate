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
      prompt: 'Tính: 6 427 + 2 894',
      answer: 9321,
      hints: ['Đặt tính thẳng cột, cộng từ hàng đơn vị. Nhớ khi tổng một hàng từ 10 trở lên.'],
      solution:
        '7 + 4 = 11, viết 1 nhớ 1; 2 + 9 + 1 = 12, viết 2 nhớ 1; 4 + 8 + 1 = 13, viết 3 nhớ 1; 6 + 2 + 1 = 9. Kết quả 9 321.',
    },
    {
      type: 'number',
      prompt: 'Tính: 92 400 − 37 260',
      answer: 55140,
      hints: [
        'Đặt tính thẳng cột, trừ từ hàng đơn vị. Hàng nào không trừ được thì mượn 1 ở hàng bên trái.',
      ],
      solution: '92 400 − 37 260 = 55 140. Thử lại: 55 140 + 37 260 = 92 400.',
    },
    {
      type: 'number',
      prompt: 'Tính: 408 × 23',
      answer: 9384,
      hints: ['Nhân 408 với 3, rồi nhân 408 với 2 chục, viết lùi sang trái một cột rồi cộng.'],
      solution: '408 × 3 = 1 224; 408 × 20 = 8 160; 1 224 + 8 160 = 9 384.',
    },
    {
      type: 'number',
      prompt: 'Tính: 5 412 : 22',
      answer: 246,
      hints: ['54 chia 22 được 2, dư 10. Hạ 1 được 101.'],
      solution:
        '54 : 22 được 2, dư 10; 101 : 22 được 4, dư 13; 132 : 22 được 6. Kết quả 246. Thử lại: 246 × 22 = 5 412.',
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
      prompt: 'Giá trị của biểu thức 4 820 − 300 × 6 là bao nhiêu?',
      options: ['3 020', '27 120', '4 520'],
      answer: 0,
      hints: ['Biểu thức không có ngoặc: nhân trước, trừ sau.'],
      solution: '4 820 − 300 × 6 = 4 820 − 1 800 = 3 020.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 2 400 + (630 + 370) : 4',
      answer: 2650,
      hints: ['Tính trong ngoặc trước, rồi chia, cuối cùng mới cộng.'],
      solution: '2 400 + (630 + 370) : 4 = 2 400 + 1 000 : 4 = 2 400 + 250 = 2 650.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 4 × 87 × 25',
      answer: 8700,
      hints: ['Nhân 4 với 25 trước.'],
      solution: '4 × 87 × 25 = (4 × 25) × 87 = 100 × 87 = 8 700.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 1 975 × 36 + 64 × 1 975',
      answer: 197500,
      hints: ['Hai tích có chung thừa số 1 975.', '36 + 64 = 100.'],
      solution: '1 975 × 36 + 64 × 1 975 = 1 975 × (36 + 64) = 1 975 × 100 = 197 500.',
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
        'Hai thùng có tất cả 150 l nước. Thùng thứ nhất nhiều hơn thùng thứ hai 24 l. Thùng thứ hai có bao nhiêu lít nước?',
      answer: 63,
      unit: 'l',
      hints: ['Số bé = (tổng − hiệu) : 2.'],
      solution: 'Thùng thứ hai có: (150 − 24) : 2 = 63 (l).',
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
