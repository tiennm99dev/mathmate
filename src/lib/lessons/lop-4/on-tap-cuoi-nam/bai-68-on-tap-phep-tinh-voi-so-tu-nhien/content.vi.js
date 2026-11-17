/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép tính với số tự nhiên: cộng, trừ, nhân, chia, tính chất của phép cộng và phép nhân, thứ tự thực hiện phép tính, tính thuận tiện, tìm hai số biết tổng và hiệu, tìm số trung bình cộng và giải bài toán.',
  intro:
    'Hai xe bồn chở tất cả 39 000 l nước, xe thứ nhất chở nhiều hơn xe thứ hai 3 000 l. Mỗi xe chở bao nhiêu lít nước? Em cùng ôn lại các phép tính với số tự nhiên nhé!',
  objectives: [
    'Đặt tính rồi tính cộng, trừ, nhân, chia với số tự nhiên.',
    'Vận dụng tính chất giao hoán, kết hợp và nhân một số với một tổng.',
    'Tính giá trị biểu thức đúng thứ tự; tính bằng cách thuận tiện.',
    'Giải bài toán tìm hai số biết tổng và hiệu, tìm số trung bình cộng.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Tính chất của phép cộng và phép nhân',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Phép cộng', 'Phép nhân'],
          rows: [
            ['Giao hoán', 'a + b = b + a', 'a × b = b × a'],
            ['Kết hợp', '(a + b) + c = a + (b + c)', '(a × b) × c = a × (b × c)'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân một số với một tổng: a × b + a × c = a × (b + c).',
        },
        {
          type: 'p',
          text: 'Ví dụ: 467 × 46 + 467 × 54 = 467 × (46 + 54) = 467 × 100 = 46 700.',
        },
      ],
    },
    {
      heading: 'Thứ tự thực hiện phép tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có dấu ngoặc: em tính trong ngoặc trước. Biểu thức có cộng, trừ, nhân, chia: em làm nhân, chia trước, cộng, trừ sau.',
        },
        {
          type: 'p',
          text: '8 359 + 305 × 38 = 8 359 + 11 590 = 19 949.',
        },
        {
          type: 'p',
          text: '4 824 − (9 365 − 5 465) : 15 = 4 824 − 3 900 : 15 = 4 824 − 260 = 4 564.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tìm hai số biết tổng và hiệu: Số lớn = (Tổng + Hiệu) : 2. Số bé = (Tổng − Hiệu) : 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số trung bình cộng = Tổng các số : Số các số hạng.',
        },
        {
          type: 'p',
          text: 'Một đoàn tàu có 17 toa: 9 toa, mỗi toa chở 15 300 kg hàng và 8 toa, mỗi toa chở 13 600 kg hàng. Trung bình mỗi toa chở: (15 300 × 9 + 13 600 × 8) : 17 = (137 700 + 108 800) : 17 = 14 500 (kg).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Hai xe bồn chở tất cả 39 000 l nước. Xe thứ nhất chở nhiều hơn xe thứ hai 3 000 l nước. Hỏi mỗi xe chở bao nhiêu lít nước?',
      steps: [
        'Tổng là 39 000, hiệu là 3 000.',
        'Xe thứ nhất chở: (39 000 + 3 000) : 2 = 21 000 (l).',
        'Xe thứ hai chở: 21 000 − 3 000 = 18 000 (l).',
      ],
      answer: 'Xe thứ nhất: 21 000 l nước; xe thứ hai: 18 000 l nước.',
    },
    {
      problem:
        'Chú Hùng đi ô tô trên quãng đường dài 300 km. Cứ đi 100 km thì xe dùng hết 10 l xăng, giá 1 l xăng là 23 400 đồng. Tính số tiền mua xăng vừa đủ để đi hết quãng đường đó.',
      steps: [
        '300 km gấp 100 km số lần là: 300 : 100 = 3 (lần).',
        'Số lít xăng cần mua: 10 × 3 = 30 (l).',
        'Số tiền mua xăng: 23 400 × 30 = 702 000 (đồng).',
      ],
      answer: 'Chú Hùng cần 702 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 3 458 + 639 = ?',
      answer: 4097,
      hints: ['Viết 639 thẳng cột với 458, hàng đơn vị thẳng hàng đơn vị. Cộng từ phải sang trái.'],
      solution:
        '8 cộng 9 bằng 17, viết 7, nhớ 1. 5 cộng 3 bằng 8, thêm 1 bằng 9, viết 9. 4 cộng 6 bằng 10, viết 0, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 3 458 + 639 = 4 097.',
    },
    {
      type: 'choice',
      prompt: 'Không thực hiện phép tính, tìm số thích hợp: (173 + 454) + 346 = 173 + (454 + ?)',
      options: ['346', '173', '454', '627'],
      answer: 0,
      hints: ['Đây là tính chất kết hợp của phép cộng.'],
      solution: '(a + b) + c = a + (b + c), nên (173 + 454) + 346 = 173 + (454 + 346).',
    },
    {
      type: 'choice',
      prompt: 'Không thực hiện phép tính, tìm số thích hợp: 103 × 18 + 103 × 12 = 103 × (18 + ?)',
      options: ['12', '103', '18', '30'],
      answer: 0,
      hints: ['Nhân một số với một tổng: a × b + a × c = a × (b + c).'],
      solution: '103 × 18 + 103 × 12 = 103 × (18 + 12).',
    },
    {
      type: 'number',
      prompt:
        'Hai xe bồn chở tất cả 39 000 l nước, xe thứ nhất chở nhiều hơn xe thứ hai 3 000 l. Xe thứ hai chở bao nhiêu lít nước?',
      answer: 18000,
      hints: ['Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Xe thứ hai chở: (39 000 − 3 000) : 2 = 18 000 (l).',
    },
    {
      type: 'number',
      prompt:
        'Đoàn tàu 17 toa: 9 toa, mỗi toa chở 15 300 kg hàng; 8 toa, mỗi toa chở 13 600 kg hàng. Trung bình mỗi toa chở bao nhiêu ki-lô-gam hàng?',
      answer: 14500,
      hints: ['Em tính số hàng 9 toa chở và số hàng 8 toa chở.', 'Cộng lại rồi chia cho 17.'],
      solution:
        '15 300 × 9 = 137 700 (kg); 13 600 × 8 = 108 800 (kg). Trung bình: (137 700 + 108 800) : 17 = 246 500 : 17 = 14 500 (kg).',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 6 650 + 9 543 + 3 250 − 9 900 = ?',
      answer: 9543,
      hints: ['Em cộng 6 650 với 3 250 trước. Được số nào?'],
      solution:
        '6 650 + 9 543 + 3 250 − 9 900 = (6 650 + 3 250) + 9 543 − 9 900 = 9 900 − 9 900 + 9 543 = 9 543.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 8 359 + 305 × 38 = ?',
      answer: 19949,
      hints: ['Em làm phép nhân trước: 305 × 38.'],
      solution: '8 359 + 305 × 38 = 8 359 + 11 590 = 19 949.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 4 824 − (9 365 − 5 465) : 15 = ?',
      answer: 4564,
      hints: ['Em tính trong ngoặc trước, rồi đến phép chia, sau cùng là phép trừ.'],
      solution: '4 824 − (9 365 − 5 465) : 15 = 4 824 − 3 900 : 15 = 4 824 − 260 = 4 564.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 13 498 : 32 = ?',
      options: ['421 (dư 26)', '421', '42 (dư 26)', '422 (dư 6)'],
      answer: 0,
      hints: ['Em chia từ trái sang phải: 134 chia 32, rồi hạ tiếp. Số dư phải bé hơn 32.'],
      solution:
        '134 chia 32 được 4, dư 6. Hạ 9 được 69, 69 chia 32 được 2, dư 5. Hạ 8 được 58, 58 chia 32 được 1, dư 26. Vậy 13 498 : 32 = 421 (dư 26). Thử lại: 421 × 32 + 26 = 13 498.',
    },
    {
      type: 'number',
      prompt:
        'Chú Hùng đi 300 km. Cứ 100 km xe dùng hết 10 l xăng, giá 1 l xăng là 23 400 đồng. Chú cần bao nhiêu đồng mua xăng?',
      answer: 702000,
      hints: ['Em tìm số lít xăng cần dùng cho 300 km trước.'],
      solution: 'Số lít xăng: 10 × (300 : 100) = 30 (l). Số tiền: 23 400 × 30 = 702 000 (đồng).',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 3 506 × 25 × 4 = ?',
      answer: 350600,
      hints: ['Em nhân 25 với 4 trước.'],
      solution: '3 506 × 25 × 4 = 3 506 × (25 × 4) = 3 506 × 100 = 350 600.',
    },
    {
      type: 'choice',
      prompt: 'Tính bằng cách thuận tiện: 467 × 46 + 467 × 54 = ?',
      options: ['46 700', '4 670', '467 000', '46 170'],
      answer: 0,
      hints: ['Hai tích cùng có thừa số 467. Em tính 46 + 54 trước.'],
      solution: '467 × 46 + 467 × 54 = 467 × (46 + 54) = 467 × 100 = 46 700.',
    },
  ],
  takeaways: [
    'Phép cộng và phép nhân có tính chất giao hoán và kết hợp.',
    'a × b + a × c = a × (b + c).',
    'Trong ngoặc trước; nhân, chia trước, cộng, trừ sau.',
    'Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng − Hiệu) : 2.',
  ],
};
