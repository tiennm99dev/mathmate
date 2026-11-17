/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tỉ lệ bản đồ 1 : 1 000 cho biết 1 cm trên bản đồ ứng với 1 000 cm thực tế. Độ dài thật bằng độ dài trên bản đồ nhân với 1 000; độ dài trên bản đồ bằng độ dài thật (đổi ra cm) chia cho 1 000.',
  intro:
    'Trên bản đồ Việt Nam có ghi Tỉ lệ 1 : 10 000 000. Bản đồ đã thu nhỏ mọi độ dài 10 000 000 lần. Nhờ tỉ lệ bản đồ, em đo trên bản đồ là tính được quãng đường thật.',
  objectives: [
    'Hiểu ý nghĩa của tỉ lệ bản đồ.',
    'Tính được độ dài thật khi biết độ dài trên bản đồ và tỉ lệ bản đồ.',
    'Tính được độ dài trên bản đồ khi biết độ dài thật và tỉ lệ bản đồ.',
  ],
  sections: [
    {
      heading: 'Tỉ lệ bản đồ',
      blocks: [
        {
          type: 'p',
          text: 'Tỉ lệ bản đồ 1 : 10 000 000 có thể viết dưới dạng phân số $\\dfrac{1}{10\\,000\\,000}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Tỉ lệ bản đồ 1 : 1 000 cho biết: 1 cm trên bản đồ ứng với 1 000 cm trên thực tế. Mọi độ dài trên bản đồ đã thu nhỏ 1 000 lần.',
        },
        {
          type: 'table',
          head: ['Tỉ lệ bản đồ', '1 cm trên bản đồ ứng với'],
          rows: [
            ['1 : 1 000', '1 000 cm = 10 m'],
            ['1 : 100 000', '100 000 cm = 1 km'],
            ['1 : 10 000 000', '10 000 000 cm = 100 km'],
          ],
        },
      ],
    },
    {
      heading: 'Tính độ dài thật',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Độ dài thật = độ dài trên bản đồ × số ở mẫu của tỉ lệ. Hai độ dài cùng đơn vị (thường là xăng-ti-mét), rồi đổi ra mét hoặc ki-lô-mét.',
        },
        {
          type: 'p',
          text: 'Tỉ lệ 1 : 1 000, chiều dài vườn trên bản đồ là 6 cm. Chiều dài thật là: 6 × 1 000 = 6 000 (cm) = 60 m.',
        },
      ],
    },
    {
      heading: 'Tính độ dài trên bản đồ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Độ dài trên bản đồ = độ dài thật : số ở mẫu của tỉ lệ. Em đổi độ dài thật ra xăng-ti-mét trước khi chia.',
        },
        {
          type: 'p',
          text: 'Tỉ lệ 1 : 1 000, chiều rộng thật của vườn là 50 m = 5 000 cm. Trên bản đồ: 5 000 : 1 000 = 5 (cm).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Nhớ đổi đơn vị: 1 m = 100 cm; 1 km = 100 000 cm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bản đồ có thước đo',
    instruction:
      'Chọn tỉ lệ bản đồ và hai địa điểm. Đọc độ dài đoạn đường trên thước rồi xem độ dài thật. Ở chế độ "Đố em", chọn độ dài thật đúng.',
  },
  examples: [
    {
      problem:
        'Quãng đường từ Lạng Sơn đến Hà Nội dài 160 km. Trên bản đồ tỉ lệ 1 : 1 000 000, quãng đường đó dài bao nhiêu xăng-ti-mét?',
      steps: [
        'Đổi: 160 km = 16 000 000 cm.',
        'Độ dài trên bản đồ là: 16 000 000 : 1 000 000 = 16 (cm).',
      ],
      answer: 'Trên bản đồ, quãng đường dài 16 cm.',
    },
    {
      problem:
        'Trên bản đồ tỉ lệ 1 : 10 000 000, một đoạn đường sắt dài 5 cm. Đoạn đường sắt thật dài bao nhiêu ki-lô-mét?',
      steps: ['Độ dài thật là: 5 × 10 000 000 = 50 000 000 (cm).', 'Đổi: 50 000 000 cm = 500 km.'],
      answer: 'Đoạn đường sắt thật dài 500 km.',
    },
    {
      problem:
        'Trên bản đồ tỉ lệ 1 : 10 000, quãng đường từ nhà đến trường dài 15 cm. Quãng đường thật dài bao nhiêu ki-lô-mét?',
      steps: ['15 × 10 000 = 150 000 (cm).', '150 000 cm = 1 500 m = 1,5 km.'],
      answer: 'Quãng đường thật dài 1,5 km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tỉ lệ bản đồ 1 : 10 000 cho biết:',
      options: [
        '1 cm trên bản đồ ứng với 10 000 cm thực tế',
        '1 cm trên bản đồ ứng với 10 000 m thực tế',
        '1 cm trên bản đồ ứng với 10 000 km thực tế',
        '10 000 cm trên bản đồ ứng với 1 cm thực tế',
      ],
      answer: 0,
      hints: ['Hai số của tỉ lệ cùng một đơn vị.'],
      solution: 'Tỉ lệ 1 : 10 000 nghĩa là 1 cm trên bản đồ ứng với 10 000 cm trên thực tế.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản đồ tỉ lệ 1 : 1 000 000, quãng đường từ A đến B dài 3 cm. Quãng đường thật dài bao nhiêu ki-lô-mét?',
      answer: 30,
      unit: 'km',
      hints: ['Nhân 3 với 1 000 000 được số xăng-ti-mét.', '100 000 cm = 1 km.'],
      solution: '3 × 1 000 000 = 3 000 000 (cm) = 30 km.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản đồ tỉ lệ 1 : 500, chiều dài một sân trường là 8 cm. Chiều dài thật của sân trường là bao nhiêu mét?',
      answer: 40,
      unit: 'm',
      hints: ['Nhân 8 với 500 được số xăng-ti-mét.', '100 cm = 1 m.'],
      solution: '8 × 500 = 4 000 (cm) = 40 m.',
    },
    {
      type: 'number',
      prompt:
        'Bản đồ có tỉ lệ 1 : 3 000. Khoảng cách thật từ nhà An đến trường là 1 500 m. Trên bản đồ, khoảng cách đó dài bao nhiêu xăng-ti-mét?',
      answer: 50,
      unit: 'cm',
      hints: ['Đổi 1 500 m ra xăng-ti-mét trước.', 'Lấy số xăng-ti-mét chia cho 3 000.'],
      solution: '1 500 m = 150 000 cm. Trên bản đồ: 150 000 : 3 000 = 50 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường thật dài 40 km. Trên bản đồ tỉ lệ 1 : 500 000, quãng đường đó dài bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['40 km = 4 000 000 cm.'],
      solution: '40 km = 4 000 000 cm. Trên bản đồ: 4 000 000 : 500 000 = 8 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Trên bản đồ tỉ lệ 1 : 10 000, một con đường dài 15 cm. Con đường thật dài:',
      options: ['1,5 km', '15 km', '150 km', '0,15 km'],
      answer: 0,
      hints: ['15 × 10 000 = 150 000 (cm). Đổi ra ki-lô-mét.'],
      solution: '15 × 10 000 = 150 000 (cm) = 1,5 km.',
    },
    {
      type: 'number',
      prompt:
        'Cạnh bàn học dài 1 m. Em vẽ cạnh bàn theo tỉ lệ 1 : 50. Trên hình vẽ, cạnh bàn dài bao nhiêu xăng-ti-mét?',
      answer: 2,
      unit: 'cm',
      hints: ['1 m = 100 cm. Chia cho 50.'],
      solution: '1 m = 100 cm. Trên hình vẽ: 100 : 50 = 2 (cm).',
    },
    {
      type: 'match',
      prompt: 'Một đoạn thẳng dài 2 cm trên bản đồ. Nối mỗi tỉ lệ bản đồ với độ dài thật.',
      left: ['1 : 1 000', '1 : 10 000', '1 : 100 000', '1 : 1 000 000'],
      right: ['20 m', '200 m', '2 km', '20 km', '2 m'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhân 2 với số ở mẫu của tỉ lệ, rồi đổi đơn vị.'],
      solution:
        '2 × 1 000 = 2 000 cm = 20 m; 2 × 10 000 = 20 000 cm = 200 m; 2 × 100 000 = 200 000 cm = 2 km; 2 × 1 000 000 = 2 000 000 cm = 20 km.',
    },
  ],
  takeaways: [
    'Tỉ lệ 1 : 1 000 nghĩa là 1 cm trên bản đồ ứng với 1 000 cm thực tế.',
    'Độ dài thật = độ dài trên bản đồ × số ở mẫu của tỉ lệ.',
    'Độ dài trên bản đồ = độ dài thật (đổi ra cm) : số ở mẫu của tỉ lệ.',
  ],
};
