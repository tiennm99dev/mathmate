/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ki-lô-mét vuông (km²) và héc-ta (ha) đo những diện tích lớn: 1 km² = 1 000 000 m², 1 ha = 10 000 m², 1 km² = 100 ha.',
  intro:
    'Nền lớp học đo bằng mét vuông. Còn cánh đồng, khu rừng, cả một thành phố thì sao? Em làm quen với hai đơn vị đo diện tích lớn: ki-lô-mét vuông và héc-ta.',
  objectives: [
    'Biết đơn vị ki-lô-mét vuông, héc-ta; đọc, viết được số đo theo hai đơn vị này.',
    'Biết 1 km² = 1 000 000 m², 1 ha = 10 000 m², 1 km² = 100 ha.',
    'Cảm nhận được độ lớn của 1 ha, 1 km² và chọn đơn vị phù hợp.',
  ],
  sections: [
    {
      heading: 'Ki-lô-mét vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ki-lô-mét vuông là diện tích của hình vuông có cạnh dài 1 km. Ki-lô-mét vuông viết tắt là km².',
        },
        {
          type: 'p',
          text: 'Hình vuông cạnh 1 km, tức là cạnh 1 000 m. Diện tích của nó là 1 000 × 1 000 = 1 000 000 m².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 km² = 1 000 000 m².',
        },
        {
          type: 'p',
          text: 'Người ta dùng ki-lô-mét vuông để đo diện tích một thành phố, một tỉnh, một khu rừng lớn. Ví dụ: diện tích Thủ đô Hà Nội khoảng 3 359 km².',
        },
      ],
    },
    {
      heading: 'Héc-ta',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Héc-ta là diện tích của hình vuông có cạnh dài 100 m. Héc-ta viết tắt là ha.',
        },
        {
          type: 'p',
          text: 'Hình vuông cạnh 100 m có diện tích 100 × 100 = 10 000 m².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 ha = 10 000 m².',
        },
        {
          type: 'p',
          text: 'Người ta dùng héc-ta để đo diện tích ruộng đất, vườn cây, ao hồ. Ví dụ: Hồ Gươm rộng khoảng 12 ha.',
        },
      ],
    },
    {
      heading: 'Ki-lô-mét vuông và héc-ta',
      blocks: [
        {
          type: 'p',
          text: 'Cạnh 1 km dài gấp 10 lần cạnh 100 m. Xếp hình vuông 1 km² thành 10 hàng, mỗi hàng 10 ô vuông 1 ha: có 10 × 10 = 100 ô.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 km² = 100 ha.',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Cạnh hình vuông', 'Bằng'],
          rows: [
            ['1 km²', '1 000 m', '100 ha = 1 000 000 m²'],
            ['1 ha', '100 m', '10 000 m²'],
            ['1 m²', '1 m', '100 dm²'],
          ],
          caption: 'Các đơn vị đo diện tích lớn',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đổi từ km² ra ha: nhân với 100. Đổi từ ha ra m²: nhân với 10 000.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phủ bản đồ bằng ô héc-ta',
    instruction:
      'Bản đồ là hình vuông 1 km², chia thành 100 ô 1 ha. Em bấm nút để phủ đúng diện tích của từng nơi rồi đọc số đo theo ha và m².',
  },
  examples: [
    {
      problem: '3 km² = ? ha',
      steps: ['1 km² = 100 ha.', '3 km² = 3 × 100 ha = 300 ha.'],
      answer: '3 km² = 300 ha.',
    },
    {
      problem: '70 000 m² = ? ha',
      steps: ['1 ha = 10 000 m².', '70 000 : 10 000 = 7.'],
      answer: '70 000 m² = 7 ha.',
    },
    {
      problem: 'Thủ đô Hà Nội rộng khoảng 3 359 km². Diện tích đó là bao nhiêu héc-ta?',
      steps: ['1 km² = 100 ha.', '3 359 × 100 = 335 900.'],
      answer: 'Hà Nội rộng khoảng 335 900 ha.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối cách đọc với cách viết.',
      left: ['Ba mươi tám ki-lô-mét vuông', 'Hai trăm linh năm héc-ta', 'Mười hai héc-ta'],
      right: ['38 km²', '205 ha', '12 ha', '38 ha', '12 km²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Ki-lô-mét vuông viết là km², héc-ta viết là ha.'],
      solution:
        'Ba mươi tám ki-lô-mét vuông: 38 km². Hai trăm linh năm héc-ta: 205 ha. Mười hai héc-ta: 12 ha.',
    },
    {
      type: 'number',
      prompt: '5 km² = ? ha',
      answer: 500,
      unit: 'ha',
      hints: ['1 km² = 100 ha.'],
      solution: '5 km² = 5 × 100 ha = 500 ha.',
    },
    {
      type: 'number',
      prompt: '4 ha = ? m²',
      answer: 40000,
      unit: 'm²',
      hints: ['1 ha = 10 000 m².'],
      solution: '4 ha = 4 × 10 000 m² = 40 000 m².',
    },
    {
      type: 'number',
      prompt: '600 ha = ? km²',
      answer: 6,
      unit: 'km²',
      hints: ['Cứ 100 ha là 1 km².'],
      solution: '600 : 100 = 6. Vậy 600 ha = 6 km².',
    },
    {
      type: 'number',
      prompt: '2 km² = ? m²',
      answer: 2000000,
      unit: 'm²',
      hints: ['1 km² = 1 000 000 m².'],
      solution: '2 km² = 2 × 1 000 000 m² = 2 000 000 m².',
    },
    {
      type: 'choice',
      prompt: 'Diện tích nước Việt Nam khoảng 331 000 … Em chọn đơn vị phù hợp.',
      options: ['km²', 'ha', 'm²', 'dm²'],
      answer: 0,
      hints: ['Cả một đất nước rất rộng, gồm rất nhiều tỉnh, thành phố.'],
      solution: 'Diện tích nước Việt Nam khoảng 331 000 km².',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi nơi với diện tích phù hợp.',
      left: ['Nền phòng học', 'Hồ Gươm', 'Thủ đô Hà Nội'],
      right: ['50 m²', '12 ha', '3 359 km²', '12 m²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Nơi càng rộng thì dùng đơn vị càng lớn: m², rồi ha, rồi km².'],
      solution: 'Nền phòng học khoảng 50 m². Hồ Gươm khoảng 12 ha. Hà Nội khoảng 3 359 km².',
    },
    {
      type: 'choice',
      prompt: '3 km² ? 250 ha',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đổi 3 km² ra héc-ta trước.', '1 km² = 100 ha.'],
      solution: '3 km² = 300 ha. Mà 300 ha > 250 ha. Vậy 3 km² > 250 ha.',
    },
    {
      type: 'choice',
      prompt: 'Hồ Tây rộng khoảng 5 km², Hồ Gươm rộng khoảng 12 ha. Hồ nào rộng hơn?',
      options: ['Hồ Tây', 'Hồ Gươm', 'Hai hồ rộng bằng nhau'],
      answer: 0,
      hints: ['Em đổi 5 km² ra héc-ta để so sánh.'],
      solution: '5 km² = 500 ha. Mà 500 ha > 12 ha. Vậy Hồ Tây rộng hơn Hồ Gươm.',
    },
    {
      type: 'number',
      prompt:
        'Một cánh đồng hình chữ nhật dài 400 m, rộng 250 m. Diện tích cánh đồng là bao nhiêu héc-ta?',
      answer: 10,
      unit: 'ha',
      hints: [
        'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.',
        'Tính ra m² trước, rồi đổi: 10 000 m² = 1 ha.',
      ],
      solution: '400 × 250 = 100 000 (m²). 100 000 m² = 10 ha. Cánh đồng rộng 10 ha.',
    },
  ],
  takeaways: [
    '1 km² là diện tích hình vuông cạnh 1 km; 1 ha là diện tích hình vuông cạnh 100 m.',
    '1 km² = 1 000 000 m²; 1 ha = 10 000 m²; 1 km² = 100 ha.',
    'Dùng ha cho ruộng đất, vườn, hồ; dùng km² cho thành phố, tỉnh, đất nước.',
  ],
};
