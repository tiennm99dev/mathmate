/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về toán chuyển động đều: tính vận tốc, quãng đường, thời gian; đổi đơn vị đo vận tốc; so sánh hai vận tốc; tính giờ đến nơi và quãng đường còn lại.',
  intro:
    'Xe đạp, ô tô, đoàn tàu hay một bạn đi bộ đến trường: chuyển động nào cũng có vận tốc, quãng đường và thời gian. Hôm nay em ôn lại ba công thức của chuyển động đều nhé!',
  objectives: [
    'Tính được vận tốc, quãng đường, thời gian của một chuyển động đều.',
    'Đổi được đơn vị đo vận tốc: km/giờ, m/phút, m/giây.',
    'Giải được bài toán thực tế: giờ đến nơi, quãng đường còn lại, so sánh hai vận tốc.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Ba công thức',
      blocks: [
        {
          type: 'p',
          text: 'Gọi s là quãng đường, t là thời gian, v là vận tốc.',
        },
        {
          type: 'table',
          head: ['Cần tìm', 'Cách tính'],
          rows: [
            ['Vận tốc', 'v = s : t'],
            ['Quãng đường', 's = v × t'],
            ['Thời gian', 't = s : v'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Trước khi tính, em đổi các số đo cho khớp đơn vị: km đi với giờ, m đi với phút hoặc giây.',
        },
      ],
    },
    {
      heading: 'Đổi thời gian và vận tốc',
      blocks: [
        {
          type: 'p',
          text: 'Đổi số phút ra giờ: 30 phút = 0,5 giờ; 15 phút = 0,25 giờ; 45 phút = 0,75 giờ.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: '1,5 giờ là 1 giờ 30 phút, không phải 1 giờ 50 phút.',
        },
        {
          type: 'p',
          text: '36 km/giờ: mỗi giờ đi được 36 000 m, mỗi phút đi được 36 000 : 60 = 600 m. Vậy 36 km/giờ = 600 m/phút.',
        },
        {
          type: 'p',
          text: '8 m/giây: mỗi giờ (3 600 giây) đi được 8 × 3 600 = 28 800 m = 28,8 km. Vậy 8 m/giây = 28,8 km/giờ.',
        },
      ],
    },
    {
      heading: 'Giờ đến nơi',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Giờ đến nơi = giờ khởi hành + thời gian đi (+ thời gian nghỉ dọc đường, nếu có).',
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
        'Một ô tô khởi hành từ A lúc 7 giờ 30 phút, đi đến B với vận tốc 48 km/giờ. Quãng đường AB dài 72 km. Dọc đường ô tô nghỉ 15 phút. Hỏi ô tô đến B lúc mấy giờ?',
      steps: [
        'Thời gian ô tô đi là: 72 : 48 = 1,5 (giờ).',
        '1,5 giờ = 1 giờ 30 phút.',
        'Ô tô đến B lúc: 7 giờ 30 phút + 1 giờ 30 phút + 15 phút = 9 giờ 15 phút.',
      ],
      answer: 'Ô tô đến B lúc 9 giờ 15 phút.',
    },
    {
      problem:
        'Trong cuộc đua xe đạp, anh Hùng đi với vận tốc 32 km/giờ, anh Dũng đi với vận tốc 8 m/giây. Ai đi nhanh hơn?',
      steps: [
        'Đổi vận tốc của anh Dũng ra km/giờ: 8 × 3 600 = 28 800 (m) = 28,8 km. Vậy 8 m/giây = 28,8 km/giờ.',
        'So sánh: 32 > 28,8.',
      ],
      answer: 'Anh Hùng đi nhanh hơn.',
    },
    {
      problem:
        'Quãng đường từ nhà Nam đến trường dài 1,52 km. Nam đi bộ với vận tốc 3 km/giờ. Sau 6 phút, Nam còn cách trường bao nhiêu ki-lô-mét?',
      steps: [
        'Đổi: 6 phút = 0,1 giờ.',
        'Nam đã đi được: 3 × 0,1 = 0,3 (km).',
        'Nam còn cách trường: 1,52 − 0,3 = 1,22 (km).',
      ],
      answer: 'Nam còn cách trường 1,22 km.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một ô tô đi được 135 km trong 3 giờ. Tính vận tốc của ô tô.',
      answer: 45,
      unit: 'km/giờ',
      hints: ['Vận tốc = quãng đường : thời gian.'],
      solution: 'Vận tốc của ô tô là: 135 : 3 = 45 (km/giờ).',
    },
    {
      type: 'number',
      prompt:
        'Một xe máy đi với vận tốc 42 km/giờ. Tính quãng đường xe máy đi được trong 2 giờ 30 phút.',
      answer: 105,
      unit: 'km',
      hints: ['Đổi 2 giờ 30 phút ra giờ.', 'Quãng đường = vận tốc × thời gian.'],
      solution: '2 giờ 30 phút = 2,5 giờ. Quãng đường là: 42 × 2,5 = 105 (km).',
    },
    {
      type: 'choice',
      prompt:
        'Quãng đường AB dài 60 km. Một ô tô đi từ A đến B với vận tốc 40 km/giờ. Ô tô đi hết bao lâu?',
      options: ['1 giờ 30 phút', '1 giờ 50 phút', '2 giờ 30 phút', '1 giờ 15 phút'],
      answer: 0,
      hints: ['Thời gian = quãng đường : vận tốc.', '0,5 giờ bằng bao nhiêu phút?'],
      solution: 'Thời gian ô tô đi là: 60 : 40 = 1,5 (giờ). 1,5 giờ = 1 giờ 30 phút.',
    },
    {
      type: 'number',
      prompt: '8 m/giây = ? km/giờ',
      answer: 28.8,
      unit: 'km/giờ',
      hints: ['1 giờ = 3 600 giây.', 'Em tính 8 × 3 600 (m), rồi đổi ra ki-lô-mét.'],
      solution: 'Mỗi giờ đi được: 8 × 3 600 = 28 800 (m) = 28,8 km. Vậy 8 m/giây = 28,8 km/giờ.',
    },
    {
      type: 'number',
      prompt: '36 km/giờ = ? m/phút',
      answer: 600,
      unit: 'm/phút',
      hints: ['36 km = 36 000 m; 1 giờ = 60 phút.'],
      solution: 'Mỗi phút đi được: 36 000 : 60 = 600 (m). Vậy 36 km/giờ = 600 m/phút.',
    },
    {
      type: 'choice',
      prompt:
        'Trong cuộc đua xe đạp, anh Hùng đi với vận tốc 32 km/giờ, anh Dũng đi với vận tốc 8 m/giây. Như vậy:',
      options: ['Anh Hùng nhanh hơn', 'Anh Dũng nhanh hơn', 'Hai anh nhanh như nhau'],
      answer: 0,
      hints: ['Em đổi 8 m/giây ra km/giờ rồi so sánh với 32 km/giờ.'],
      solution: '8 m/giây = 28,8 km/giờ. Vì 32 > 28,8 nên anh Hùng nhanh hơn.',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường từ nhà Nam đến trường dài 1,52 km. Nam đi bộ với vận tốc 3 km/giờ. Sau 6 phút, Nam còn cách trường bao nhiêu ki-lô-mét?',
      answer: 1.22,
      unit: 'km',
      hints: ['Đổi 6 phút = 0,1 giờ.', 'Tìm quãng đường Nam đã đi: 3 × 0,1.'],
      solution: 'Nam đã đi được: 3 × 0,1 = 0,3 (km). Nam còn cách trường: 1,52 − 0,3 = 1,22 (km).',
    },
    {
      type: 'choice',
      prompt:
        'Một ô tô khởi hành từ A lúc 7 giờ 30 phút với vận tốc 48 km/giờ. Quãng đường AB dài 72 km. Dọc đường ô tô nghỉ 15 phút. Ô tô đến B lúc mấy giờ?',
      options: ['9 giờ 15 phút', '9 giờ', '9 giờ 35 phút', '8 giờ 45 phút'],
      answer: 0,
      hints: [
        'Tìm thời gian đi: 72 : 48.',
        'Cộng thời gian đi và thời gian nghỉ vào giờ khởi hành.',
      ],
      solution:
        'Thời gian đi: 72 : 48 = 1,5 (giờ) = 1 giờ 30 phút. Ô tô đến B lúc: 7 giờ 30 phút + 1 giờ 30 phút + 15 phút = 9 giờ 15 phút.',
    },
    {
      type: 'number',
      prompt:
        'Một đoàn tàu đi qua cây cầu dài 150 m với vận tốc 4 m/giây. Từ lúc đầu tàu vào cầu đến lúc toa cuối ra khỏi cầu hết 1 phút 15 giây. Đoàn tàu dài bao nhiêu mét?',
      answer: 150,
      unit: 'm',
      hints: [
        'Đổi 1 phút 15 giây ra giây.',
        'Trong thời gian đó, tàu đi được quãng đường bằng chiều dài cầu cộng chiều dài tàu.',
      ],
      solution:
        '1 phút 15 giây = 75 giây. Tàu đi được: 4 × 75 = 300 (m). Đoàn tàu dài: 300 − 150 = 150 (m).',
    },
    {
      type: 'number',
      prompt:
        'Một tàu chở hàng đi xuôi dòng từ bến A đến bến B dài 65 km hết 2 giờ 36 phút. Khi ngược dòng, vận tốc của tàu bằng 4/5 vận tốc khi xuôi dòng. Tàu đi từ B về A hết bao nhiêu giờ?',
      answer: 3.25,
      unit: 'giờ',
      hints: [
        'Đổi 2 giờ 36 phút ra giờ: 36 phút = 0,6 giờ.',
        'Tìm vận tốc xuôi dòng, rồi vận tốc ngược dòng, rồi thời gian ngược dòng.',
      ],
      solution:
        '2 giờ 36 phút = 2,6 giờ. Vận tốc xuôi dòng: 65 : 2,6 = 25 (km/giờ). Vận tốc ngược dòng: 25 × 4 : 5 = 20 (km/giờ). Thời gian về: 65 : 20 = 3,25 (giờ), tức là 3 giờ 15 phút.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đi 1 giờ 15 phút trên đường bằng với vận tốc 48 km/giờ, rồi đi 30 phút lên dốc với vận tốc 26 km/giờ. Ô tô đã đi được tất cả bao nhiêu ki-lô-mét?',
      answer: 73,
      unit: 'km',
      hints: [
        'Đổi: 1 giờ 15 phút = 1,25 giờ; 30 phút = 0,5 giờ.',
        'Tính từng quãng đường rồi cộng lại.',
      ],
      solution:
        'Đường bằng: 48 × 1,25 = 60 (km). Đường dốc: 26 × 0,5 = 13 (km). Tất cả: 60 + 13 = 73 (km).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng cần tìm với cách tính của nó.',
      left: ['Vận tốc', 'Quãng đường', 'Thời gian'],
      right: ['s : t', 'v × t', 's : v', 'v : t'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['s là quãng đường, t là thời gian, v là vận tốc.'],
      solution: 'Vận tốc: v = s : t. Quãng đường: s = v × t. Thời gian: t = s : v.',
    },
  ],
  takeaways: [
    'Vận tốc = quãng đường : thời gian.',
    'Quãng đường = vận tốc × thời gian.',
    'Thời gian = quãng đường : vận tốc.',
    'Đổi đơn vị cho khớp trước khi tính: 1 m/giây = 3,6 km/giờ.',
  ],
};
