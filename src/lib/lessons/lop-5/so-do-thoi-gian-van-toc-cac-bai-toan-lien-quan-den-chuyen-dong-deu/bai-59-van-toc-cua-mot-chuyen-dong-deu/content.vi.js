/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vận tốc của một chuyển động đều cho biết mỗi đơn vị thời gian vật đi được bao nhiêu quãng đường: muốn tính vận tốc ta lấy quãng đường chia cho thời gian, v = s : t; đơn vị km/giờ, m/phút, m/giây.',
  intro:
    'Một ô tô đi được 170 km trong 4 giờ. Trung bình mỗi giờ ô tô đi được bao nhiêu ki-lô-mét? Số đó gọi là vận tốc của ô tô.',
  objectives: [
    'Hiểu vận tốc là quãng đường đi được trong một đơn vị thời gian.',
    'Biết tính vận tốc: v = s : t.',
    'Biết các đơn vị vận tốc km/giờ, m/phút, m/giây.',
  ],
  sections: [
    {
      heading: 'Vận tốc là gì?',
      blocks: [
        {
          type: 'p',
          text: 'Ô tô đi được 170 km trong 4 giờ. Trung bình mỗi giờ ô tô đi được 170 : 4 = 42,5 km.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ta nói vận tốc trung bình của ô tô là 42,5 ki-lô-mét một giờ, viết tắt là 42,5 km/giờ.',
        },
        {
          type: 'p',
          text: 'Một vật chuyển động đều thì mỗi giờ đi được quãng đường như nhau. Quãng đường đi được trong một giờ là vận tốc của vật.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian: v = s : t. Trong đó v là vận tốc, s là quãng đường, t là thời gian.',
        },
      ],
    },
    {
      heading: 'Đơn vị của vận tốc',
      blocks: [
        {
          type: 'p',
          text: 'Một người chạy được 60 m trong 10 giây. Vận tốc chạy của người đó là 60 : 10 = 6 m/giây.',
        },
        {
          type: 'table',
          head: ['Quãng đường', 'Thời gian', 'Đơn vị vận tốc'],
          rows: [
            ['km', 'giờ', 'km/giờ'],
            ['m', 'phút', 'm/phút'],
            ['m', 'giây', 'm/giây'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đơn vị của vận tốc đi theo đơn vị của quãng đường và thời gian. Thời gian có cả giờ và phút thì em đổi ra một đơn vị trước khi chia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai xe chạy đua',
    instruction:
      'Em bấm "Chạy 1 giờ" và xem xe xanh đi được bao xa. Em chỉnh vận tốc xe đỏ sao cho hai xe luôn chạy ngang nhau. Khi đó vận tốc xe đỏ bằng vận tốc xe xanh.',
  },
  examples: [
    {
      problem: 'Một ô tô đi được quãng đường 170 km trong 4 giờ. Tính vận tốc của ô tô.',
      steps: ['Vận tốc = quãng đường : thời gian.', '170 : 4 = 42,5.'],
      answer: 'Vận tốc của ô tô là 42,5 km/giờ.',
    },
    {
      problem:
        'Một người chạy được 400 m trong 1 phút 20 giây. Tính vận tốc chạy của người đó theo m/giây.',
      steps: ['Đổi 1 phút 20 giây = 80 giây.', '400 : 80 = 5.'],
      answer: 'Vận tốc chạy của người đó là 5 m/giây.',
    },
    {
      problem: 'Một xe máy đi được 105 km trong 2 giờ 30 phút. Tính vận tốc của xe máy.',
      steps: ['Đổi 2 giờ 30 phút = 2,5 giờ.', '105 : 2,5 = 42.'],
      answer: 'Vận tốc của xe máy là 42 km/giờ.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một ô tô đi được 135 km trong 3 giờ. Vận tốc của ô tô là bao nhiêu ki-lô-mét một giờ?',
      answer: 45,
      unit: 'km/giờ',
      hints: ['Vận tốc = quãng đường : thời gian.', 'Em tính 135 : 3.'],
      solution: '135 : 3 = 45. Vận tốc của ô tô là 45 km/giờ.',
    },
    {
      type: 'number',
      prompt:
        'Một con báo chạy được 120 m trong 4 giây. Vận tốc của con báo là bao nhiêu mét một giây?',
      answer: 30,
      unit: 'm/giây',
      hints: ['Em lấy quãng đường chia cho thời gian.'],
      solution: '120 : 4 = 30. Vận tốc của con báo là 30 m/giây.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tính vận tốc, ta làm thế nào?',
      options: [
        'Lấy quãng đường chia cho thời gian',
        'Lấy thời gian chia cho quãng đường',
        'Lấy quãng đường nhân với thời gian',
        'Lấy quãng đường cộng với thời gian',
      ],
      answer: 0,
      hints: ['Vận tốc là quãng đường đi được trong một đơn vị thời gian.'],
      solution: 'v = s : t: lấy quãng đường chia cho thời gian.',
    },
    {
      type: 'match',
      prompt: 'Nối quãng đường và thời gian với đơn vị vận tốc phù hợp.',
      left: [
        'Quãng đường km, thời gian giờ',
        'Quãng đường m, thời gian phút',
        'Quãng đường m, thời gian giây',
      ],
      right: ['km/giờ', 'm/phút', 'm/giây', 'km/phút'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đơn vị vận tốc là đơn vị quãng đường trên đơn vị thời gian.'],
      solution: 'km và giờ cho km/giờ; m và phút cho m/phút; m và giây cho m/giây.',
    },
    {
      type: 'number',
      prompt: 'Một người đi xe đạp được 36 km trong 3 giờ. Vận tốc của người đó là bao nhiêu?',
      answer: 12,
      unit: 'km/giờ',
      hints: ['Em tính 36 : 3.'],
      solution: '36 : 3 = 12. Vận tốc của người đi xe đạp là 12 km/giờ.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi bộ được 3 km trong 45 phút. Vận tốc của người đó là bao nhiêu ki-lô-mét một giờ?',
      answer: 4,
      unit: 'km/giờ',
      hints: ['Đổi 45 phút = 0,75 giờ.', 'Em tính 3 : 0,75.'],
      solution: '45 phút = 0,75 giờ. 3 : 0,75 = 4. Vận tốc là 4 km/giờ.',
    },
    {
      type: 'choice',
      prompt: 'Xe A đi 100 km trong 2 giờ. Xe B đi 150 km trong 3 giờ. So sánh vận tốc hai xe.',
      options: ['Hai xe có vận tốc bằng nhau', 'Xe B nhanh hơn', 'Xe A nhanh hơn'],
      answer: 0,
      hints: ['Em tính vận tốc của từng xe.'],
      solution:
        'Xe A: 100 : 2 = 50 km/giờ. Xe B: 150 : 3 = 50 km/giờ. Hai xe có vận tốc bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bay bay được 1 800 km trong 2 giờ 30 phút. Vận tốc của máy bay là bao nhiêu?',
      answer: 720,
      unit: 'km/giờ',
      hints: ['Đổi 2 giờ 30 phút = 2,5 giờ.', 'Em tính 1 800 : 2,5.'],
      solution: '2 giờ 30 phút = 2,5 giờ. 1 800 : 2,5 = 720. Vận tốc của máy bay là 720 km/giờ.',
    },
  ],
  takeaways: [
    'Vận tốc là quãng đường vật đi được trong một đơn vị thời gian.',
    'Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian: v = s : t.',
    'Đơn vị vận tốc: km/giờ, m/phút, m/giây.',
  ],
};
