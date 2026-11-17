/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung học kì 1: hỗn số, phân số và số thập phân, so sánh và sắp xếp số thập phân, các phép tính với số thập phân, diện tích và chu vi một số hình phẳng, đổi đơn vị đo và giải bài toán thực tế.',
  intro:
    'Học kì 1 sắp kết thúc. Hôm nay em ôn lại tất cả: số thập phân, các phép tính, hình phẳng và đo lường. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Viết được hỗn số thành phân số, phân số thành số thập phân.',
    'Đọc, viết, so sánh và sắp xếp được các số thập phân.',
    'Cộng, trừ, nhân, chia được số thập phân; tính được bằng cách thuận tiện.',
    'Tính được diện tích hình tam giác, hình thang, chu vi và diện tích hình tròn.',
    'Đổi được các đơn vị đo và giải được bài toán thực tế.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hỗn số, phân số và số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Viết hỗn số thành phân số: lấy phần nguyên nhân với mẫu số, cộng với tử số. Ví dụ 5 2/5 = 27/5.',
        },
        {
          type: 'p',
          text: 'Viết phân số thành số thập phân: em đưa về phân số có mẫu số 10; 100; 1 000. Ví dụ 96/50 = 192/100 = 1,92.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hai số thập phân: em so sánh phần nguyên trước, rồi lần lượt hàng phần mười, phần trăm, phần nghìn.',
        },
      ],
    },
    {
      heading: 'Các phép tính với số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Cộng, trừ: em đặt tính sao cho các dấu phẩy thẳng cột.',
        },
        {
          type: 'p',
          text: 'Nhân: em nhân như số tự nhiên, rồi tách ở tích số chữ số phần thập phân bằng tổng của hai thừa số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Biểu thức có cộng, trừ, nhân, chia: em làm nhân, chia trước, cộng, trừ sau.',
        },
      ],
    },
    {
      heading: 'Chu vi và diện tích hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Công thức'],
          rows: [
            ['Diện tích hình tam giác', 'S = a × h : 2'],
            ['Diện tích hình thang', 'S = (a + b) × h : 2'],
            ['Chu vi hình tròn', 'C = r × 2 × 3,14'],
            ['Diện tích hình tròn', 'S = r × r × 3,14'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Các độ dài phải cùng một đơn vị đo trước khi tính.',
        },
      ],
    },
    {
      heading: 'Đo lường',
      blocks: [
        {
          type: 'p',
          text: 'Hai đơn vị đo độ dài, khối lượng liền nhau gấp, kém nhau 10 lần.',
        },
        {
          type: 'p',
          text: 'Hai đơn vị đo diện tích liền nhau gấp, kém nhau 100 lần: 1 km² = 100 ha, 1 ha = 10 000 m².',
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
      problem: 'Viết phân số 7/4 thành số thập phân.',
      steps: [
        'Nhân cả tử số và mẫu số với 25: 7/4 = (7 × 25)/(4 × 25) = 175/100.',
        '175/100 = 1,75.',
      ],
      answer: '7/4 = 1,75.',
    },
    {
      problem: 'Tính giá trị biểu thức: 12,5 × 3 + 7,8 : 2.',
      steps: [
        'Em làm nhân, chia trước: 12,5 × 3 = 37,5 và 7,8 : 2 = 3,9.',
        'Rồi cộng: 37,5 + 3,9 = 41,4.',
      ],
      answer: '12,5 × 3 + 7,8 : 2 = 41,4.',
    },
    {
      problem: 'Một hình tròn có bán kính 5 cm. Tính chu vi và diện tích hình tròn đó.',
      steps: ['Chu vi: 5 × 2 × 3,14 = 31,4 (cm).', 'Diện tích: 5 × 5 × 3,14 = 78,5 (cm²).'],
      answer: 'Chu vi 31,4 cm, diện tích 78,5 cm².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hỗn số 4 3/10 viết thành phân số nào?',
      options: ['43/10', '7/10', '34/10', '12/10'],
      answer: 0,
      hints: ['Em lấy phần nguyên nhân với mẫu số, rồi cộng với tử số. Mẫu số giữ nguyên.'],
      solution: '4 3/10 = (4 × 10 + 3)/10 = 43/10.',
    },
    {
      type: 'number',
      prompt: 'Viết phân số 63/25 thành số thập phân.',
      answer: 2.52,
      hints: ['Em nhân cả tử số và mẫu số với 4 để có mẫu số 100.'],
      solution: '63/25 = (63 × 4)/(25 × 4) = 252/100 = 2,52.',
    },
    {
      type: 'choice',
      prompt: 'Số gồm 35 đơn vị, 2 phần mười, 0 phần trăm và 6 phần nghìn viết là số nào?',
      options: ['35,206', '35,26', '35,026', '35,2006'],
      answer: 0,
      hints: ['Sau dấu phẩy lần lượt là hàng phần mười, phần trăm, phần nghìn.'],
      solution:
        'Phần nguyên là 35. Sau dấu phẩy: 2 ở hàng phần mười, 0 ở hàng phần trăm, 6 ở hàng phần nghìn. Số đó là 35,206.',
    },
    {
      type: 'choice',
      prompt: 'Số nào có chữ số 8 ở hàng phần trăm?',
      options: ['32,081', '32,801', '38,012', '32,108'],
      answer: 0,
      hints: ['Hàng phần trăm là chữ số thứ hai sau dấu phẩy.'],
      solution:
        'Trong 32,081, chữ số 8 đứng thứ hai sau dấu phẩy, nên ở hàng phần trăm. Ở 32,801 chữ số 8 ở hàng phần mười, ở 38,012 ở hàng đơn vị, ở 32,108 ở hàng phần nghìn.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 5,099 ? 5,1',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Phần nguyên bằng nhau. Em so sánh hàng phần mười.'],
      solution: 'Phần nguyên đều là 5. Hàng phần mười: 0 < 1. Vậy 5,099 < 5,1.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ bé đến lớn.',
      items: ['6,321', '5,1', '6,3209', '5,099'],
      answer: [3, 1, 2, 0],
      hints: [
        'Em so sánh phần nguyên trước: hai số có phần nguyên 5 bé hơn hai số có phần nguyên 6.',
      ],
      solution:
        '5,099 < 5,1 vì hàng phần mười 0 < 1. 6,3209 < 6,321 vì hàng phần nghìn 0 < 1. Thứ tự: 5,099; 5,1; 6,3209; 6,321.',
    },
    {
      type: 'number',
      prompt: 'Tính: 36,8 + 16,93 = ?',
      answer: 53.73,
      hints: ['Em đặt tính sao cho các dấu phẩy thẳng cột. Viết 36,8 thành 36,80.'],
      solution: '36,80 + 16,93 = 53,73.',
    },
    {
      type: 'number',
      prompt: 'Tính: 30,31 × 8 = ?',
      answer: 242.48,
      hints: ['Em nhân như số tự nhiên: 3 031 × 8. Rồi tách hai chữ số ở phần thập phân của tích.'],
      solution:
        '3 031 × 8 = 24 248. Thừa số 30,31 có hai chữ số ở phần thập phân, nên 30,31 × 8 = 242,48.',
    },
    {
      type: 'number',
      prompt: 'Tính: 23,6 : 5 = ?',
      answer: 4.72,
      hints: [
        'Chia đến phần thập phân thì em viết dấu phẩy ở thương. Còn dư thì viết thêm 0 rồi chia tiếp.',
      ],
      solution:
        '23 : 5 = 4 dư 3. Hạ 6 được 36, viết dấu phẩy: 36 : 5 = 7 dư 1. Viết thêm 0 được 10, 10 : 5 = 2. Vậy 23,6 : 5 = 4,72.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 4,25 × 7,8 + 4,25 × 2,2 = ?',
      answer: 42.5,
      hints: ['Hai tích có chung thừa số 4,25. Em cộng 7,8 với 2,2 trước.'],
      solution: '4,25 × 7,8 + 4,25 × 2,2 = 4,25 × (7,8 + 2,2) = 4,25 × 10 = 42,5.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang có hai đáy dài 16 cm và 28 cm, chiều cao 20 cm. Tính diện tích hình thang.',
      answer: 440,
      unit: 'cm²',
      hints: ['Diện tích hình thang: tổng hai đáy nhân với chiều cao rồi chia cho 2.'],
      solution: 'S = (16 + 28) × 20 : 2 = 44 × 20 : 2 = 440 (cm²).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi câu hỏi với kết quả đúng.',
      left: [
        'Chu vi hình tròn bán kính 5 cm',
        'Diện tích hình tròn bán kính 5 cm',
        'Diện tích hình tam giác có đáy 8 cm, chiều cao 6 cm',
      ],
      right: ['31,4 cm', '78,5 cm²', '24 cm²', '15,7 cm', '48 cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['C = r × 2 × 3,14; S hình tròn = r × r × 3,14; S tam giác = a × h : 2.'],
      solution:
        'Chu vi: 5 × 2 × 3,14 = 31,4 (cm). Diện tích hình tròn: 5 × 5 × 3,14 = 78,5 (cm²). Diện tích tam giác: 8 × 6 : 2 = 24 (cm²).',
    },
    {
      type: 'choice',
      prompt: '1 052 ha = ? km²',
      options: ['10,52 km²', '105,2 km²', '1,052 km²', '0,1052 km²'],
      answer: 0,
      hints: ['100 ha = 1 km². Chia cho 100 thì chuyển dấu phẩy sang trái hai chữ số.'],
      solution: '1 052 ha = 1 052 : 100 km² = 10,52 km².',
    },
    {
      type: 'number',
      prompt: '2,5 tấn = ? kg',
      answer: 2500,
      unit: 'kg',
      hints: ['1 tấn = 1 000 kg. Nhân với 1 000 thì chuyển dấu phẩy sang phải ba chữ số.'],
      solution: '2,5 tấn = 2,5 × 1 000 kg = 2 500 kg.',
    },
    {
      type: 'number',
      prompt: 'Có 6 kg đường chia đều vào 12 túi. Hỏi 8 túi như thế có bao nhiêu ki-lô-gam đường?',
      answer: 4,
      unit: 'kg',
      hints: ['Em tìm số đường trong một túi trước, rồi nhân với 8.'],
      solution: 'Mỗi túi có: 6 : 12 = 0,5 (kg). 8 túi có: 0,5 × 8 = 4 (kg).',
    },
  ],
  takeaways: [
    'Hỗn số thành phân số: phần nguyên nhân mẫu số, cộng tử số.',
    'So sánh số thập phân: phần nguyên trước, rồi từng hàng sau dấu phẩy.',
    'Biểu thức: nhân, chia trước; cộng, trừ sau.',
    'Diện tích tam giác: a × h : 2; hình thang: (a + b) × h : 2; hình tròn: r × r × 3,14.',
    'Đổi đơn vị đo trước khi so sánh hay tính.',
  ],
};
