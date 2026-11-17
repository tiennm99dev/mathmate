/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mét khối (m³) là thể tích hình lập phương cạnh 1 m; 1 m³ = 1 000 dm³ = 1 000 000 cm³, mỗi đơn vị đo thể tích gấp 1 000 lần đơn vị bé hơn liền sau.',
  intro:
    'Bể bơi, thùng xe tải, căn phòng có thể tích rất lớn. Để đo chúng, người ta dùng mét khối. Em xem khối 1 m³ to cỡ nào khi đứng cạnh một bạn nhỏ nhé!',
  objectives: [
    'Biết mét khối; đọc và viết được m³.',
    'Biết 1 m³ = 1 000 dm³ = 1 000 000 cm³.',
    'Đổi được số đo thể tích giữa m³, dm³ và cm³ và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Mét khối',
      blocks: [
        {
          type: 'p',
          text: 'Để đo thể tích lớn, người ta còn dùng đơn vị mét khối.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mét khối là thể tích của hình lập phương có cạnh dài 1 m. Mét khối viết tắt là m³.',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['1,25 m³', 'một phẩy hai mươi lăm mét khối'],
            ['300 m³', 'ba trăm mét khối'],
            ['1 875 m³', 'một nghìn tám trăm bảy mươi lăm mét khối'],
          ],
        },
      ],
    },
    {
      heading: '1 m³ = 1 000 dm³',
      blocks: [
        {
          type: 'p',
          text: 'Hình lập phương cạnh 1 m = 10 dm. Nó gồm 10 lớp, mỗi lớp 10 hàng, mỗi hàng 10 khối 1 dm³.',
        },
        {
          type: 'p',
          text: '10 × 10 × 10 = 1 000. Vậy 1 m³ = 1 000 dm³. Mà 1 dm³ = 1 000 cm³, nên 1 m³ = 1 000 000 cm³.',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 m³', '1 000 dm³ = 1 000 000 cm³'],
            ['1 dm³', '1 000 cm³ = 0,001 m³'],
            ['1 cm³', '0,001 dm³'],
          ],
          caption: 'Các đơn vị đo thể tích, từ lớn đến bé',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi đơn vị đo thể tích gấp 1 000 lần đơn vị bé hơn liền sau. Đổi ra đơn vị bé thì nhân với 1 000, đổi ra đơn vị lớn thì chia cho 1 000.',
        },
      ],
    },
    {
      heading: 'Đổi đơn vị',
      blocks: [
        {
          type: 'p',
          text: '3 m³ = 3 000 dm³. 2 400 dm³ = 2,4 m³.',
        },
        {
          type: 'p',
          text: 'm³ ra cm³ thì nhân với 1 000 hai lần: 25 m³ = 25 000 dm³ = 25 000 000 cm³.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Một phòng học có thể tích khoảng 200 m³. Một chiếc máy giặt chiếm khoảng 0,3 m³.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khối 1 m³ cạnh bạn nhỏ',
    instruction:
      'Em xếp các khối 1 dm³ vào khối 1 m³: từng khối, từng hàng hoặc từng lớp. So khối 1 m³ với bạn nhỏ đứng bên cạnh.',
  },
  examples: [
    {
      problem: '1,7 m³ = ? dm³',
      steps: ['1 m³ = 1 000 dm³.', '1,7 × 1 000 = 1 700.'],
      answer: '1,7 m³ = 1 700 dm³.',
    },
    {
      problem: '800 000 cm³ = ? m³',
      steps: ['1 m³ = 1 000 000 cm³.', '800 000 : 1 000 000 = 0,8.'],
      answer: '800 000 cm³ = 0,8 m³.',
    },
    {
      problem:
        'Thùng một xe tải có thể tích 33,2 m³. Hàng hoá xếp chiếm 80% thể tích thùng xe. Hỏi phần thùng xe còn trống có thể tích bao nhiêu mét khối?',
      steps: [
        'Hàng hoá chiếm: 33,2 × 80 : 100 = 26,56 (m³).',
        'Phần còn trống: 33,2 − 26,56 = 6,64 (m³).',
      ],
      answer: 'Phần thùng xe còn trống có thể tích 6,64 m³.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Xếp các đơn vị đo thể tích từ lớn đến bé.',
      items: ['dm³', 'm³', 'cm³'],
      answer: [1, 0, 2],
      hints: ['Hình lập phương cạnh 1 m to hơn hình lập phương cạnh 1 dm.'],
      solution: 'm³, dm³, cm³.',
    },
    {
      type: 'number',
      prompt: '3 m³ = ? dm³',
      answer: 3000,
      unit: 'dm³',
      hints: ['1 m³ = 1 000 dm³.'],
      solution: '3 m³ = 3 × 1 000 dm³ = 3 000 dm³.',
    },
    {
      type: 'number',
      prompt: '2 400 dm³ = ? m³',
      answer: 2.4,
      unit: 'm³',
      hints: ['Chia 2 400 cho 1 000.'],
      solution: '2 400 : 1 000 = 2,4. Vậy 2 400 dm³ = 2,4 m³.',
    },
    {
      type: 'number',
      prompt: '25 m³ = ? cm³',
      answer: 25000000,
      unit: 'cm³',
      hints: ['1 m³ = 1 000 000 cm³.'],
      solution: '25 m³ = 25 × 1 000 000 cm³ = 25 000 000 cm³.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{1}{4}$ m³ = ? dm³',
      options: ['250 dm³', '25 dm³', '2 500 dm³', '400 dm³'],
      answer: 0,
      hints: ['1 m³ = 1 000 dm³. Em tìm một phần tư của 1 000.'],
      solution: '1 000 : 4 = 250. Vậy $\\dfrac{1}{4}$ m³ = 250 dm³.',
    },
    {
      type: 'number',
      prompt: '7 500 000 cm³ = ? m³',
      answer: 7.5,
      unit: 'm³',
      hints: ['1 000 000 cm³ = 1 m³.'],
      solution: '7 500 000 : 1 000 000 = 7,5. Vậy 7 500 000 cm³ = 7,5 m³.',
    },
    {
      type: 'number',
      prompt: '3,5 m³ + 6,05 m³ = ?',
      answer: 9.55,
      unit: 'm³',
      hints: ['Đặt thẳng dấu phẩy rồi cộng.'],
      solution: '3,5 + 6,05 = 9,55. Vậy 3,5 m³ + 6,05 m³ = 9,55 m³.',
    },
    {
      type: 'number',
      prompt: '1 875 m³ : 5 = ?',
      answer: 375,
      unit: 'm³',
      hints: ['Em chia 1 875 cho 5.'],
      solution: '1 875 : 5 = 375. Vậy 1 875 m³ : 5 = 375 m³.',
    },
    {
      type: 'choice',
      prompt:
        'Một phòng học dài 8 m, rộng 7 m, cao khoảng 3,5 m. Thể tích phòng học khoảng bao nhiêu?',
      options: ['200 m³', '200 dm³', '200 cm³', '20 cm³'],
      answer: 0,
      hints: ['Phòng học to hơn rất nhiều so với khối 1 m³.'],
      solution: 'Phòng học chứa được khoảng 8 × 7 × 3,5 = 196 khối 1 m³, tức là khoảng 200 m³.',
    },
    {
      type: 'number',
      prompt:
        'Giá nước sinh hoạt: 10 m³ đầu tiên giá 5 973 đồng mỗi mét khối, từ mét khối thứ 11 trở đi giá 7 052 đồng mỗi mét khối. Tháng này nhà Mai dùng 15 m³ nước. Nhà Mai phải trả bao nhiêu tiền?',
      answer: 94990,
      unit: 'đồng',
      hints: ['Tính tiền 10 m³ đầu, rồi tiền 5 m³ sau.', '10 × 5 973 và 5 × 7 052.'],
      solution:
        '10 m³ đầu: 5 973 × 10 = 59 730 (đồng). 5 m³ sau: 7 052 × 5 = 35 260 (đồng). Tổng: 59 730 + 35 260 = 94 990 (đồng).',
    },
  ],
  takeaways: [
    'm³ là thể tích hình lập phương cạnh 1 m.',
    '1 m³ = 1 000 dm³ = 1 000 000 cm³.',
    'Mỗi đơn vị đo thể tích gấp 1 000 lần đơn vị bé hơn liền sau.',
  ],
};
