/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về đo lường: đổi đơn vị đo độ dài, khối lượng, diện tích, thể tích và thời gian, viết số đo dưới dạng số thập phân, so sánh hai số đo, cộng và trừ số đo thời gian.',
  intro:
    'Đo chiều dài sân, cân túi gạo, tính thời gian đi học: ngày nào em cũng dùng đến số đo. Hôm nay em ôn lại các đơn vị đo và cách đổi giữa chúng nhé!',
  objectives: [
    'Đổi được các đơn vị đo độ dài, khối lượng, diện tích, thể tích.',
    'Viết được số đo đại lượng dưới dạng số thập phân.',
    'Đổi được các đơn vị đo thời gian; cộng, trừ được số đo thời gian.',
    'So sánh được hai số đo và giải được bài toán thực tế.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Độ dài và khối lượng',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Các đơn vị, từ lớn đến bé'],
          rows: [
            ['Độ dài', 'km, hm, dam, m, dm, cm, mm'],
            ['Khối lượng', 'tấn, tạ, yến, kg, hg, dag, g'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đơn vị đo độ dài (hoặc khối lượng) liền nhau hơn kém nhau 10 lần: 1 m = 10 dm, 1 tạ = 10 yến.',
        },
        {
          type: 'p',
          text: 'Viết số đo dưới dạng số thập phân: 3 km 45 m = 3 km và 45/1 000 km = 3,045 km.',
        },
      ],
    },
    {
      heading: 'Diện tích và thể tích',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 lần: 1 m² = 100 dm², 1 km² = 100 ha, 1 ha = 10 000 m².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đơn vị đo thể tích liền nhau hơn kém nhau 1 000 lần: 1 m³ = 1 000 dm³, 1 dm³ = 1 000 cm³.',
        },
        {
          type: 'p',
          text: 'Một hộp có thể tích 1 dm³ chứa vừa đầy 1 l nước; 1 cm³ chứa vừa đầy 1 ml nước.',
        },
      ],
    },
    {
      heading: 'Thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 thế kỉ', '100 năm'],
            ['1 năm', '12 tháng'],
            ['1 ngày', '24 giờ'],
            ['1 giờ', '60 phút'],
            ['1 phút', '60 giây'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Cộng số đo thời gian: được từ 60 phút trở lên thì đổi 60 phút thành 1 giờ. Trừ mà số phút không đủ thì đổi 1 giờ thành 60 phút.',
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
      problem: 'Viết số thập phân thích hợp: 3 km 45 m = ? km.',
      steps: [
        '1 km = 1 000 m, nên 45 m = 45/1 000 km.',
        '3 km 45 m = 3 45/1 000 km.',
        'Viết thành số thập phân: phần nguyên 3, phần thập phân có ba chữ số 045.',
      ],
      answer: '3 km 45 m = 3,045 km.',
    },
    {
      problem: 'Tính: 2 giờ 45 phút + 1 giờ 30 phút.',
      steps: [
        'Cộng giờ với giờ, phút với phút: 3 giờ 75 phút.',
        '75 phút = 1 giờ 15 phút.',
        '3 giờ 75 phút = 4 giờ 15 phút.',
      ],
      answer: '2 giờ 45 phút + 1 giờ 30 phút = 4 giờ 15 phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '4 km 25 m = ? m',
      answer: 4025,
      unit: 'm',
      hints: ['1 km = 1 000 m.'],
      solution: '4 km = 4 000 m, nên 4 km 25 m = 4 000 m + 25 m = 4 025 m.',
    },
    {
      type: 'number',
      prompt: '3 tấn 50 kg = ? kg',
      answer: 3050,
      unit: 'kg',
      hints: ['1 tấn = 1 000 kg.'],
      solution: '3 tấn = 3 000 kg, nên 3 tấn 50 kg = 3 000 kg + 50 kg = 3 050 kg.',
    },
    {
      type: 'number',
      prompt: 'Viết số thập phân thích hợp: 2 kg 350 g = ? kg',
      answer: 2.35,
      unit: 'kg',
      hints: ['1 g = 1/1 000 kg. Em viết 350 g thành phân số thập phân của ki-lô-gam.'],
      solution: '350 g = 350/1 000 kg, nên 2 kg 350 g = 2,350 kg = 2,35 kg.',
    },
    {
      type: 'number',
      prompt: '5 ha = ? m²',
      answer: 50000,
      unit: 'm²',
      hints: ['1 ha = 10 000 m².'],
      solution: '5 ha = 5 × 10 000 m² = 50 000 m².',
    },
    {
      type: 'number',
      prompt: '3 m² 6 dm² = ? dm²',
      answer: 306,
      unit: 'dm²',
      hints: ['1 m² = 100 dm². Cẩn thận: 6 dm² không phải 60 dm².'],
      solution: '3 m² = 300 dm², nên 3 m² 6 dm² = 300 dm² + 6 dm² = 306 dm².',
    },
    {
      type: 'number',
      prompt: '2,5 m³ = ? dm³',
      answer: 2500,
      unit: 'dm³',
      hints: ['1 m³ = 1 000 dm³. Em nhân 2,5 với 1 000.'],
      solution: '2,5 m³ = 2,5 × 1 000 dm³ = 2 500 dm³.',
    },
    {
      type: 'number',
      prompt: '1 500 cm³ = ? dm³',
      answer: 1.5,
      unit: 'dm³',
      hints: ['1 000 cm³ = 1 dm³. Em chia 1 500 cho 1 000.'],
      solution: '1 500 cm³ = 1 500 : 1 000 dm³ = 1,5 dm³.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đơn vị đo thời gian với số đo bằng nó.',
      left: ['1 giờ', '1 ngày', '1 năm', '1 thế kỉ'],
      right: ['60 phút', '24 giờ', '12 tháng', '100 năm', '30 ngày'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại bảng đơn vị đo thời gian.'],
      solution: '1 giờ = 60 phút. 1 ngày = 24 giờ. 1 năm = 12 tháng. 1 thế kỉ = 100 năm.',
    },
    {
      type: 'number',
      prompt: '2,5 giờ = ? phút',
      answer: 150,
      unit: 'phút',
      hints: ['1 giờ = 60 phút. Em nhân 2,5 với 60.'],
      solution: '2,5 giờ = 2,5 × 60 phút = 150 phút.',
    },
    {
      type: 'choice',
      prompt: '3 giờ 45 phút + 2 giờ 30 phút = ?',
      options: ['6 giờ 15 phút', '5 giờ 15 phút', '6 giờ 5 phút', '6 giờ 75 phút'],
      answer: 0,
      hints: ['Cộng giờ với giờ, phút với phút. Số phút từ 60 trở lên thì đổi ra giờ.'],
      solution:
        '3 giờ 45 phút + 2 giờ 30 phút = 5 giờ 75 phút. 75 phút = 1 giờ 15 phút, nên kết quả là 6 giờ 15 phút.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 4 kg 5 g ? 4,5 kg',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em đổi cả hai số đo ra gam rồi so sánh.'],
      solution: '4 kg 5 g = 4 005 g; 4,5 kg = 4 500 g. Vì 4 005 < 4 500 nên 4 kg 5 g < 4,5 kg.',
    },
    {
      type: 'number',
      prompt: 'Một bể nước chứa đầy 1,2 m³ nước. Bể chứa được bao nhiêu lít nước?',
      answer: 1200,
      hints: ['1 m³ = 1 000 dm³ và 1 dm³ = 1 l.'],
      solution: '1,2 m³ = 1 200 dm³ = 1 200 l. Bể chứa được 1 200 lít nước.',
    },
  ],
  takeaways: [
    'Độ dài, khối lượng: hai đơn vị liền nhau hơn kém nhau 10 lần.',
    'Diện tích: hai đơn vị liền nhau hơn kém nhau 100 lần.',
    'Thể tích: hai đơn vị liền nhau hơn kém nhau 1 000 lần; 1 dm³ = 1 l.',
    'Thời gian: 1 giờ = 60 phút, 1 ngày = 24 giờ, 1 năm = 12 tháng.',
  ],
};
