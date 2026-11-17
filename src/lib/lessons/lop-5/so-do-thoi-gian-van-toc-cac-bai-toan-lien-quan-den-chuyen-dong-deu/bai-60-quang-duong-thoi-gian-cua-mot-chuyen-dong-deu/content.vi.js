/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quãng đường và thời gian của một chuyển động đều: muốn tính quãng đường ta lấy vận tốc nhân với thời gian, s = v × t; muốn tính thời gian ta lấy quãng đường chia cho vận tốc, t = s : v.',
  intro:
    'Một ô tô đi với vận tốc 42,5 km/giờ trong 4 giờ. Ô tô đi được bao nhiêu ki-lô-mét? Biết vận tốc, em tính được quãng đường và thời gian.',
  objectives: [
    'Biết tính quãng đường: s = v × t.',
    'Biết tính thời gian: t = s : v.',
    'Chọn đúng công thức và đổi đơn vị cho phù hợp khi giải bài toán chuyển động đều.',
  ],
  sections: [
    {
      heading: 'Tính quãng đường',
      blocks: [
        {
          type: 'p',
          text: 'Ô tô đi mỗi giờ được 42,5 km. Trong 4 giờ, ô tô đi được 42,5 × 4 = 170 km.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian: s = v × t.',
        },
        {
          type: 'p',
          text: 'Một người đi xe đạp với vận tốc 12 km/giờ trong 2 giờ 30 phút. Đổi 2 giờ 30 phút = 2,5 giờ. Quãng đường là 12 × 2,5 = 30 km.',
        },
      ],
    },
    {
      heading: 'Tính thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Một ô tô đi quãng đường 170 km với vận tốc 42,5 km/giờ. Thời gian ô tô đi là 170 : 42,5 = 4 giờ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính thời gian, ta lấy quãng đường chia cho vận tốc: t = s : v.',
        },
        {
          type: 'table',
          head: ['Cần tìm', 'Công thức'],
          rows: [
            ['Vận tốc v', 'v = s : t'],
            ['Quãng đường s', 's = v × t'],
            ['Thời gian t', 't = s : v'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Các đại lượng phải dùng đơn vị khớp nhau: vận tốc km/giờ thì quãng đường tính bằng km, thời gian tính bằng giờ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tam giác công thức',
    instruction:
      'Em đọc đề bài, chạm vào đại lượng cần tìm để che nó. Phần còn lại của tam giác cho em công thức. Rồi em chọn đáp số.',
  },
  examples: [
    {
      problem:
        'Một người đi xe đạp với vận tốc 12 km/giờ trong 2 giờ 30 phút. Tính quãng đường người đó đi được.',
      steps: ['Đổi 2 giờ 30 phút = 2,5 giờ.', 's = v × t = 12 × 2,5 = 30.'],
      answer: 'Quãng đường người đó đi được là 30 km.',
    },
    {
      problem:
        'Một ca nô đi với vận tốc 36 km/giờ trên quãng đường 42 km. Tính thời gian ca nô đi.',
      steps: [
        't = s : v = 42 : 36 = $\\dfrac{7}{6}$ giờ.',
        '$\\dfrac{7}{6}$ giờ = $1\\dfrac{1}{6}$ giờ = 1 giờ 10 phút.',
      ],
      answer: 'Ca nô đi hết 1 giờ 10 phút.',
    },
    {
      problem: 'Một ô tô đi quãng đường 135 km với vận tốc 60 km/giờ. Tính thời gian ô tô đi.',
      steps: ['t = s : v = 135 : 60 = 2,25 giờ.', '2,25 giờ = 2 giờ 15 phút.'],
      answer: 'Ô tô đi hết 2 giờ 15 phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một ô tô đi với vận tốc 48 km/giờ trong 3 giờ. Ô tô đi được bao nhiêu ki-lô-mét?',
      answer: 144,
      unit: 'km',
      hints: ['Quãng đường = vận tốc × thời gian.', 'Em tính 48 × 3.'],
      solution: 's = 48 × 3 = 144. Ô tô đi được 144 km.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi bộ với vận tốc 4 km/giờ trên quãng đường 10 km. Người đó đi hết bao nhiêu giờ?',
      answer: 2.5,
      unit: 'giờ',
      hints: ['Thời gian = quãng đường : vận tốc.', 'Em tính 10 : 4.'],
      solution: 't = 10 : 4 = 2,5. Người đó đi hết 2,5 giờ (2 giờ 30 phút).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng cần tìm với công thức tính nó.',
      left: ['Quãng đường s', 'Thời gian t', 'Vận tốc v'],
      right: ['s = v × t', 't = s : v', 'v = s : t', 't = v × s'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em nhớ tam giác: s ở trên, v và t ở dưới.'],
      solution: 's = v × t; t = s : v; v = s : t.',
    },
    {
      type: 'number',
      prompt: 'Một con ong bay với vận tốc 8 m/giây. Trong 1 phút, con ong bay được bao nhiêu mét?',
      answer: 480,
      unit: 'm',
      hints: ['Đổi 1 phút = 60 giây.', 'Em tính 8 × 60.'],
      solution: '1 phút = 60 giây. s = 8 × 60 = 480. Con ong bay được 480 m.',
    },
    {
      type: 'choice',
      prompt:
        'Một xe máy đi với vận tốc 40 km/giờ trên quãng đường 30 km. Xe máy đi hết bao nhiêu thời gian?',
      options: ['45 phút', '1 giờ 20 phút', '75 phút', '1 giờ 10 phút'],
      answer: 0,
      hints: ['t = 30 : 40 = 0,75 giờ.', '0,75 giờ = 0,75 × 60 phút.'],
      solution: 't = 30 : 40 = 0,75 giờ = 45 phút.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi xe đạp với vận tốc 15 km/giờ trong 1 giờ 12 phút. Người đó đi được bao nhiêu ki-lô-mét?',
      answer: 18,
      unit: 'km',
      hints: ['Đổi 1 giờ 12 phút = 1,2 giờ.', 'Em tính 15 × 1,2.'],
      solution: '1 giờ 12 phút = 1,2 giờ. s = 15 × 1,2 = 18. Người đó đi được 18 km.',
    },
    {
      type: 'choice',
      prompt:
        'Một ô tô khởi hành lúc 7 giờ, đi quãng đường 120 km với vận tốc 50 km/giờ. Ô tô đến nơi lúc mấy giờ?',
      options: ['9 giờ 24 phút', '9 giờ 40 phút', '2 giờ 24 phút', '9 giờ 20 phút'],
      answer: 0,
      hints: ['t = 120 : 50 = 2,4 giờ = 2 giờ 24 phút.', 'Em cộng 7 giờ với thời gian đi.'],
      solution: 't = 120 : 50 = 2,4 giờ = 2 giờ 24 phút. 7 giờ + 2 giờ 24 phút = 9 giờ 24 phút.',
    },
    {
      type: 'choice',
      prompt: 'Biết vận tốc và thời gian, muốn tính quãng đường em làm thế nào?',
      options: [
        'Lấy vận tốc nhân với thời gian',
        'Lấy vận tốc chia cho thời gian',
        'Lấy thời gian chia cho vận tốc',
        'Lấy vận tốc cộng với thời gian',
      ],
      answer: 0,
      hints: ['Mỗi giờ đi được v km, đi t giờ thì được bao nhiêu?'],
      solution: 's = v × t: lấy vận tốc nhân với thời gian.',
    },
  ],
  takeaways: [
    'Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian: s = v × t.',
    'Muốn tính thời gian, ta lấy quãng đường chia cho vận tốc: t = s : v.',
    'Trước khi tính, em đổi các số đo cho khớp đơn vị.',
  ],
};
