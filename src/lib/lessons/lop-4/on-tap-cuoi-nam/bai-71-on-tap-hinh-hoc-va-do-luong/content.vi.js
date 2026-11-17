/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học và đo lường: góc nhọn, góc vuông, góc tù, góc bẹt, đo góc, hình bình hành, hình thoi, đơn vị đo khối lượng, thời gian, diện tích và giải bài toán.',
  intro:
    'Một phòng học dài 8 m, rộng 6 m được lát bằng gạch hình vuông cạnh 50 cm. Cần bao nhiêu viên gạch? Em cùng ôn lại góc, các hình và các đơn vị đo nhé!',
  objectives: [
    'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt; đo góc bằng thước đo góc.',
    'Nhận biết hình bình hành, hình thoi và các cạnh song song, bằng nhau.',
    'Đổi các đơn vị đo khối lượng, thời gian, diện tích.',
    'Giải bài toán có đơn vị đo.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Góc và các hình',
      blocks: [
        {
          type: 'table',
          head: ['Góc', 'Số đo'],
          rows: [
            ['Góc nhọn', 'bé hơn 90°'],
            ['Góc vuông', 'bằng 90°'],
            ['Góc tù', 'lớn hơn 90° và bé hơn 180°'],
            ['Góc bẹt', 'bằng 180°'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đo góc: đặt tâm thước đo góc trùng với đỉnh góc, một cạnh nằm trên vạch 0 của thước. Cạnh kia đi qua vạch nào thì đó là số đo của góc.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau. Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Đo các góc của hình thoi ABCD: góc đỉnh A và góc đỉnh C bằng 60° (góc nhọn); góc đỉnh B và góc đỉnh D bằng 120° (góc tù).',
        },
      ],
    },
    {
      heading: 'Đơn vị đo khối lượng và thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Khối lượng', 'Thời gian'],
          rows: [
            ['1 yến = 10 kg', '1 giờ = 60 phút'],
            ['1 tạ = 10 yến = 100 kg', '1 phút = 60 giây'],
            ['1 tấn = 10 tạ = 1 000 kg', '1 thế kỉ = 100 năm'],
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ: 3 giờ 25 phút = 180 phút + 25 phút = 205 phút. $\\dfrac{1}{3}$ giờ = 60 phút : 3 = 20 phút.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Từ năm 1901 đến năm 2000 là thế kỉ XX. Từ năm 2001 đến năm 2100 là thế kỉ XXI.',
        },
      ],
    },
    {
      heading: 'Đơn vị đo diện tích',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².',
        },
        {
          type: 'table',
          head: ['Đổi', 'Kết quả'],
          rows: [
            ['4 m²', '400 dm²'],
            ['200 cm²', '2 dm²'],
            ['5 m² 52 dm²', '552 dm²'],
            ['7 cm² 6 mm²', '706 mm²'],
          ],
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
        'Một cửa hàng có 1 tấn 540 kg gạo tẻ và số gạo nếp bằng $\\dfrac{2}{7}$ số gạo tẻ. Cửa hàng có tất cả bao nhiêu ki-lô-gam gạo tẻ và gạo nếp?',
      steps: [
        'Đổi: 1 tấn 540 kg = 1 540 kg.',
        'Số gạo nếp: $1\\,540 \\times \\dfrac{2}{7} = 440$ (kg).',
        'Tất cả: 1 540 + 440 = 1 980 (kg).',
      ],
      answer: 'Cửa hàng có tất cả 1 980 kg gạo.',
    },
    {
      problem:
        'Người ta dùng gạch men hình vuông cạnh 50 cm để lát nền một phòng học hình chữ nhật dài 8 m, rộng 6 m. Cần bao nhiêu viên gạch để lát kín nền phòng? (Phần mạch vữa không đáng kể.)',
      steps: [
        'Diện tích một viên gạch: 50 × 50 = 2 500 (cm²).',
        'Diện tích nền phòng: 8 × 6 = 48 (m²) = 480 000 cm².',
        'Số viên gạch: 480 000 : 2 500 = 192 (viên).',
      ],
      answer: 'Cần 192 viên gạch.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với loại góc.',
      left: ['60°', '90°', '120°', '180°'],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['So sánh mỗi số đo với 90° và 180°.'],
      solution:
        '60° bé hơn 90°: góc nhọn. 90°: góc vuông. 120° lớn hơn 90° và bé hơn 180°: góc tù. 180°: góc bẹt.',
    },
    {
      type: 'choice',
      prompt:
        'Hình thoi ABCD có góc đỉnh A bằng 60°. Góc đỉnh B đo được 120°. Góc đỉnh B là góc gì?',
      options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'],
      answer: 0,
      hints: ['So sánh 120° với 90° và 180°.'],
      solution: '120° lớn hơn 90° và bé hơn 180°, nên góc đỉnh B là góc tù.',
    },
    {
      type: 'choice',
      prompt: 'Hình bình hành ABCD có AB = 8 cm, AD = 5 cm. Cạnh BC dài bao nhiêu xăng-ti-mét?',
      options: ['5 cm', '8 cm', '13 cm', '3 cm'],
      answer: 0,
      hints: ['Cạnh BC đối diện với cạnh nào?'],
      solution:
        'Hình bình hành có hai cặp cạnh đối diện bằng nhau. BC đối diện với AD, nên BC = AD = 5 cm.',
    },
    {
      type: 'number',
      prompt: '3 tấn 50 kg = ? kg',
      answer: 3050,
      hints: ['1 tấn = 1 000 kg.'],
      solution: '3 tấn = 3 000 kg. 3 000 + 50 = 3 050. Vậy 3 tấn 50 kg = 3 050 kg.',
    },
    {
      type: 'choice',
      prompt: '7 tạ = ? yến',
      options: ['70 yến', '700 yến', '7 yến', '7 000 yến'],
      answer: 0,
      hints: ['1 tạ = 10 yến.'],
      solution: '1 tạ = 10 yến, nên 7 tạ = 70 yến.',
    },
    {
      type: 'number',
      prompt: '3 giờ 25 phút = ? phút',
      answer: 205,
      hints: ['1 giờ = 60 phút. 3 giờ = ? phút.'],
      solution: '3 giờ = 180 phút. 180 + 25 = 205. Vậy 3 giờ 25 phút = 205 phút.',
    },
    {
      type: 'number',
      prompt: '15 phút 20 giây = ? giây',
      answer: 920,
      hints: ['1 phút = 60 giây.'],
      solution: '15 phút = 15 × 60 = 900 giây. 900 + 20 = 920. Vậy 15 phút 20 giây = 920 giây.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{1}{4}$ thế kỉ = ? năm',
      options: ['25 năm', '40 năm', '4 năm', '75 năm'],
      answer: 0,
      hints: ['1 thế kỉ = 100 năm. Tìm $\\dfrac{1}{4}$ của 100.'],
      solution: '100 : 4 = 25. Vậy $\\dfrac{1}{4}$ thế kỉ = 25 năm.',
    },
    {
      type: 'choice',
      prompt:
        'Năm 2025, Nam 10 tuổi, Nam kém mẹ 30 tuổi. Mẹ Nam sinh năm nào và năm đó thuộc thế kỉ nào?',
      options: [
        'Năm 1985, thế kỉ XX',
        'Năm 1985, thế kỉ XIX',
        'Năm 1995, thế kỉ XX',
        'Năm 2005, thế kỉ XXI',
      ],
      answer: 0,
      hints: ['Tuổi mẹ = 10 + 30. Năm sinh = 2025 − tuổi mẹ.'],
      solution:
        'Tuổi mẹ: 10 + 30 = 40 (tuổi). Mẹ sinh năm 2025 − 40 = 1985. Từ năm 1901 đến năm 2000 là thế kỉ XX, nên năm 1985 thuộc thế kỉ XX.',
    },
    {
      type: 'number',
      prompt: '5 m² 52 dm² = ? dm²',
      answer: 552,
      hints: ['1 m² = 100 dm².'],
      solution: '5 m² = 500 dm². 500 + 52 = 552. Vậy 5 m² 52 dm² = 552 dm².',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng có 1 tấn 540 kg gạo tẻ, số gạo nếp bằng $\\dfrac{2}{7}$ số gạo tẻ. Cửa hàng có tất cả bao nhiêu ki-lô-gam gạo?',
      answer: 1980,
      hints: ['Đổi 1 tấn 540 kg ra ki-lô-gam.', 'Tìm $\\dfrac{2}{7}$ của số gạo tẻ, rồi cộng.'],
      solution:
        '1 tấn 540 kg = 1 540 kg. Gạo nếp: $1\\,540 \\times \\dfrac{2}{7} = 440$ (kg). Tất cả: 1 540 + 440 = 1 980 (kg).',
    },
    {
      type: 'number',
      prompt:
        'Lát nền phòng dài 8 m, rộng 6 m bằng gạch hình vuông cạnh 50 cm. Cần bao nhiêu viên gạch?',
      answer: 192,
      hints: ['Đổi diện tích nền phòng ra xăng-ti-mét vuông.', 'Chia cho diện tích một viên gạch.'],
      solution:
        'Một viên gạch: 50 × 50 = 2 500 (cm²). Nền phòng: 8 × 6 = 48 (m²) = 480 000 cm². Số viên: 480 000 : 2 500 = 192 (viên).',
    },
  ],
  takeaways: [
    'Góc nhọn bé hơn góc vuông; góc tù lớn hơn góc vuông và bé hơn góc bẹt.',
    'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau; hình thoi có bốn cạnh bằng nhau.',
    '1 tấn = 10 tạ = 100 yến = 1 000 kg; 1 giờ = 60 phút; 1 phút = 60 giây; 1 thế kỉ = 100 năm.',
    'Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 lần.',
  ],
};
