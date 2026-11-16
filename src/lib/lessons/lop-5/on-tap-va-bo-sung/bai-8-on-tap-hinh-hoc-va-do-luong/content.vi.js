/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập tấn, tạ, yến, ki-lô-gam; giờ, phút, giây, thế kỉ; góc nhọn, góc vuông, góc tù, góc bẹt và đo góc; đường thẳng song song, vuông góc; hình bình hành, hình thoi; chu vi, diện tích hình chữ nhật.',
  intro:
    'Bác Năm thu hoạch được 1 tấn 250 kg cam. Cô Sáu chia mảnh đất hình chữ nhật thành các phòng. Để giúp hai người, em cùng ôn lại đơn vị đo, góc, đường thẳng và hình nhé!',
  objectives: [
    'Đổi được các đơn vị đo khối lượng và thời gian.',
    'Nhận biết được góc nhọn, góc vuông, góc tù, góc bẹt; đo được góc bằng thước đo góc.',
    'Nhận biết được hai đường thẳng song song, vuông góc; hình bình hành, hình thoi.',
    'Tính được chu vi, diện tích hình chữ nhật và giải bài toán có đơn vị đo.',
  ],
  sections: [
    {
      heading: 'Đơn vị đo khối lượng và thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Đổi ra đơn vị bé hơn'],
          rows: [
            ['1 tấn', '10 tạ = 100 yến = 1 000 kg'],
            ['1 tạ', '10 yến = 100 kg'],
            ['1 yến', '10 kg'],
          ],
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Đổi ra đơn vị bé hơn'],
          rows: [
            ['1 giờ', '60 phút'],
            ['1 phút', '60 giây'],
            ['1 thế kỉ', '100 năm'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: '2 giờ 30 phút = 120 phút + 30 phút = 150 phút. $\\dfrac{1}{10}$ giờ = 60 phút : 10 = 6 phút.',
        },
      ],
    },
    {
      heading: 'Góc',
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
          title: 'Đo góc',
          text: 'Đặt tâm thước đo góc trùng với đỉnh góc, một cạnh của góc đi qua vạch 0. Cạnh kia đi qua vạch nào trên vòng số bắt đầu từ vạch 0 đó thì đó là số đo của góc.',
        },
      ],
    },
    {
      heading: 'Đường thẳng và hình',
      blocks: [
        {
          type: 'p',
          text: 'Hai đường thẳng song song thì không bao giờ cắt nhau. Hai đường thẳng vuông góc thì cắt nhau và tạo thành bốn góc vuông.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau. Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Hình chữ nhật có bốn góc vuông. Hình vuông có bốn góc vuông và bốn cạnh bằng nhau.',
        },
      ],
    },
    {
      heading: 'Chu vi và diện tích hình chữ nhật',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng rồi nhân với 2. Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo).',
        },
        {
          type: 'p',
          text: 'Mảnh đất dài 12 m, rộng 7 m: chu vi (12 + 7) × 2 = 38 (m); diện tích 12 × 7 = 84 (m²).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thích ứng',
    instruction:
      'Em trả lời từng câu. Câu tiếp theo được chọn từ phần em còn yếu. Bảng màu ở cuối cho biết phần nào em đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Bác Năm thu hoạch được 1 tấn 250 kg cam, trong đó cam loại I chiếm $\\dfrac{3}{10}$ số cam, còn lại là cam loại II. Tính số ki-lô-gam cam mỗi loại.',
      steps: [
        'Đổi: 1 tấn 250 kg = 1 250 kg.',
        'Cam loại I: 1 250 × $\\dfrac{3}{10}$ = 375 (kg).',
        'Cam loại II: 1 250 − 375 = 875 (kg).',
      ],
      answer: 'Cam loại I: 375 kg; cam loại II: 875 kg.',
    },
    {
      problem:
        'Mảnh đất hình chữ nhật dài 12 m, rộng 7 m. Cô Sáu chia đều mảnh đất thành 7 phòng. Mỗi phòng có diện tích bao nhiêu mét vuông?',
      steps: ['Diện tích mảnh đất: 12 × 7 = 84 (m²).', 'Diện tích mỗi phòng: 84 : 7 = 12 (m²).'],
      answer: 'Mỗi phòng có diện tích 12 m².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '2 tấn = ? kg',
      answer: 2000,
      unit: 'kg',
      hints: ['1 tấn = 1 000 kg.'],
      solution: '2 tấn = 2 × 1 000 = 2 000 kg.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi khối lượng với số bằng nó.',
      left: ['6 yến', '2 tạ', '5 tấn', '9 tạ'],
      right: ['60 kg', '200 kg', '50 tạ', '90 yến', '600 kg'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 yến = 10 kg, 1 tạ = 100 kg = 10 yến, 1 tấn = 10 tạ.'],
      solution: '6 yến = 60 kg; 2 tạ = 200 kg; 5 tấn = 50 tạ; 9 tạ = 90 yến.',
    },
    {
      type: 'number',
      prompt: '2 giờ 30 phút = ? phút',
      answer: 150,
      unit: 'phút',
      hints: ['1 giờ = 60 phút, nên 2 giờ = 120 phút.'],
      solution: '2 giờ 30 phút = 120 phút + 30 phút = 150 phút.',
    },
    {
      type: 'number',
      prompt: '4 phút 5 giây = ? giây',
      answer: 245,
      unit: 'giây',
      hints: ['1 phút = 60 giây.'],
      solution: '4 phút = 240 giây, nên 4 phút 5 giây = 240 + 5 = 245 giây.',
    },
    {
      type: 'choice',
      prompt: '7 thế kỉ = ? năm',
      options: ['700 năm', '70 năm', '7 000 năm', '420 năm'],
      answer: 0,
      hints: ['1 thế kỉ = 100 năm.'],
      solution: '7 thế kỉ = 7 × 100 = 700 năm.',
    },
    {
      type: 'number',
      prompt: '$\\dfrac{1}{10}$ giờ = ? phút',
      answer: 6,
      unit: 'phút',
      hints: ['1 giờ = 60 phút. Em lấy 60 chia cho 10.'],
      solution: '$\\dfrac{1}{10}$ giờ = 60 phút : 10 = 6 phút.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo góc với tên góc.',
      left: ['60°', '90°', '120°', '180°'],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['So sánh với 90° và 180°.'],
      solution:
        '60° bé hơn 90°: góc nhọn. 90°: góc vuông. 120° lớn hơn 90° và bé hơn 180°: góc tù. 180°: góc bẹt.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau?',
      options: ['Hình thoi', 'Hình bình hành', 'Hình chữ nhật', 'Hình tam giác'],
      answer: 0,
      hints: ['Hình bình hành có các cạnh đối diện bằng nhau, nhưng hai cạnh kề có thể khác nhau.'],
      solution: 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng cắt nhau tạo thành bốn góc vuông. Hai đường thẳng đó:',
      options: ['vuông góc với nhau', 'song song với nhau', 'không cắt nhau', 'trùng nhau'],
      answer: 0,
      hints: ['Hai đường thẳng song song thì không cắt nhau.'],
      solution: 'Hai đường thẳng cắt nhau tạo thành bốn góc vuông là hai đường thẳng vuông góc.',
    },
    {
      type: 'number',
      prompt:
        'Bác Năm thu hoạch được 1 tấn 250 kg cam, trong đó cam loại I chiếm $\\dfrac{3}{10}$ số cam. Có bao nhiêu ki-lô-gam cam loại II?',
      answer: 875,
      unit: 'kg',
      hints: ['Đổi 1 tấn 250 kg ra ki-lô-gam.', 'Tìm số cam loại I, rồi lấy tổng số cam trừ đi.'],
      solution:
        '1 tấn 250 kg = 1 250 kg. Cam loại I: 1 250 × $\\dfrac{3}{10}$ = 375 (kg). Cam loại II: 1 250 − 375 = 875 (kg).',
    },
    {
      type: 'number',
      prompt:
        'Mảnh đất hình chữ nhật dài 12 m, rộng 7 m được chia đều thành 7 phòng. Mỗi phòng có diện tích bao nhiêu mét vuông?',
      answer: 12,
      unit: 'm²',
      hints: ['Tính diện tích cả mảnh đất trước: dài × rộng.'],
      solution: 'Diện tích mảnh đất: 12 × 7 = 84 (m²). Mỗi phòng: 84 : 7 = 12 (m²).',
    },
  ],
  takeaways: [
    '1 tấn = 10 tạ = 100 yến = 1 000 kg; 1 giờ = 60 phút; 1 phút = 60 giây; 1 thế kỉ = 100 năm.',
    'Góc nhọn bé hơn 90°, góc vuông bằng 90°, góc tù lớn hơn 90° và bé hơn 180°, góc bẹt bằng 180°.',
    'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau; hình thoi có thêm bốn cạnh bằng nhau.',
    'Diện tích hình chữ nhật = chiều dài × chiều rộng.',
  ],
};
