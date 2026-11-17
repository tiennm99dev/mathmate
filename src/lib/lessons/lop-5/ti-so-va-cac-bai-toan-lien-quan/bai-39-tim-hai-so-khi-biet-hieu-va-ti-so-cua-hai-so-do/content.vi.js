/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm hai số khi biết hiệu và tỉ số: vẽ sơ đồ đoạn thẳng, tìm hiệu số phần bằng nhau, tìm giá trị một phần, rồi tìm số bé và số lớn.',
  intro:
    'Số lớn hơn số bé 24 đơn vị. Số bé bằng 3/5 số lớn. Hai số đó là bao nhiêu? Trên sơ đồ, phần số lớn dài hơn số bé chính là hiệu 24.',
  objectives: [
    'Vẽ được sơ đồ đoạn thẳng cho bài toán hiệu và tỉ số.',
    'Tìm được hiệu số phần bằng nhau và giá trị một phần.',
    'Giải được bài toán tìm hai số khi biết hiệu và tỉ số của hai số đó.',
  ],
  sections: [
    {
      heading: 'Bài toán',
      blocks: [
        {
          type: 'p',
          text: 'Hiệu của hai số là 24. Tỉ số của hai số đó là $\\dfrac{3}{5}$. Tìm hai số đó.',
        },
        {
          type: 'p',
          text: 'Số bé gồm 3 phần bằng nhau, số lớn gồm 5 phần như thế.',
        },
        {
          type: 'p',
          text: 'Trên sơ đồ, số lớn hơn số bé 5 − 3 = 2 phần. Hai phần đó ứng với hiệu 24.',
        },
      ],
    },
    {
      heading: 'Bài giải',
      blocks: [
        {
          type: 'table',
          head: ['Bước', 'Phép tính'],
          rows: [
            ['Hiệu số phần bằng nhau', '5 − 3 = 2 (phần)'],
            ['Giá trị một phần', '24 : 2 = 12'],
            ['Số bé', '12 × 3 = 36'],
            ['Số lớn', '36 + 24 = 60'],
          ],
          caption: 'Đáp số: Số bé 36; số lớn 60.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các bước giải: 1. Vẽ sơ đồ đoạn thẳng. 2. Tìm hiệu số phần bằng nhau. 3. Tìm giá trị một phần: lấy hiệu chia cho hiệu số phần. 4. Tìm số bé, rồi tìm số lớn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Bài toán cho hiệu thì em lấy hiệu số phần (trừ), không cộng số phần như bài toán tổng và tỉ số.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: '60 − 36 = 24 và $\\dfrac{36}{60} = \\dfrac{3}{5}$. Hai số tìm được đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai thanh băng theo tỉ số',
    instruction:
      'Ở chế độ "Khám phá", chọn số phần của mỗi số và kéo thanh trượt để đổi hiệu. Phần chênh lệch được đánh dấu chính là hiệu. Ở chế độ "Tự giải", chạm vào số đúng ở từng bước.',
  },
  examples: [
    {
      problem: 'Hiệu của hai số là 24. Tỉ số của hai số đó là $\\dfrac{3}{5}$. Tìm hai số đó.',
      steps: [
        'Theo sơ đồ, hiệu số phần bằng nhau là: 5 − 3 = 2 (phần).',
        'Giá trị của một phần là: 24 : 2 = 12.',
        'Số bé là: 12 × 3 = 36.',
        'Số lớn là: 36 + 24 = 60.',
      ],
      answer: 'Số bé: 36; số lớn: 60.',
    },
    {
      problem:
        'Mẹ hơn con 27 tuổi. Tuổi con bằng $\\dfrac{2}{5}$ tuổi mẹ. Tính tuổi của mỗi người.',
      steps: [
        'Tuổi con: 2 phần, tuổi mẹ: 5 phần như thế.',
        'Hiệu số phần bằng nhau là: 5 − 2 = 3 (phần).',
        'Giá trị của một phần là: 27 : 3 = 9 (tuổi).',
        'Tuổi con là: 9 × 2 = 18 (tuổi). Tuổi mẹ là: 18 + 27 = 45 (tuổi).',
      ],
      answer: 'Con 18 tuổi, mẹ 45 tuổi.',
    },
    {
      problem:
        'Một hình chữ nhật có chiều dài hơn chiều rộng 12 m. Chiều rộng bằng $\\dfrac{3}{4}$ chiều dài. Tính chiều dài và chiều rộng.',
      steps: [
        'Hiệu số phần bằng nhau là: 4 − 3 = 1 (phần).',
        'Giá trị của một phần là: 12 : 1 = 12 (m).',
        'Chiều rộng là: 12 × 3 = 36 (m). Chiều dài là: 36 + 12 = 48 (m).',
      ],
      answer: 'Chiều dài 48 m, chiều rộng 36 m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Hiệu của hai số là 45, tỉ số của hai số là $\\dfrac{4}{9}$. Hiệu số phần bằng nhau là:',
      options: ['5 phần', '13 phần', '9 phần', '4 phần'],
      answer: 0,
      hints: ['Số lớn có 9 phần, số bé có 4 phần. Lấy số phần lớn trừ số phần bé.'],
      solution: 'Hiệu số phần bằng nhau là: 9 − 4 = 5 (phần).',
    },
    {
      type: 'number',
      prompt: 'Hiệu của hai số là 30. Tỉ số của hai số là $\\dfrac{2}{5}$. Tìm số bé.',
      answer: 20,
      hints: ['Hiệu số phần bằng nhau là 5 − 2.', 'Tìm giá trị một phần rồi nhân với 2.'],
      solution: 'Hiệu số phần: 5 − 2 = 3. Một phần: 30 : 3 = 10. Số bé: 10 × 2 = 20.',
    },
    {
      type: 'number',
      prompt: 'Hiệu của hai số là 30. Tỉ số của hai số là $\\dfrac{2}{5}$. Tìm số lớn.',
      answer: 50,
      hints: ['Một phần là 30 : 3.', 'Số lớn có 5 phần, hoặc lấy số bé cộng hiệu.'],
      solution: 'Một phần: 30 : 3 = 10. Số lớn: 10 × 5 = 50 (hoặc 20 + 30 = 50).',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5B có số bạn nữ nhiều hơn số bạn nam là 6 bạn. Số bạn nam bằng $\\dfrac{3}{4}$ số bạn nữ. Lớp 5B có bao nhiêu bạn nữ?',
      answer: 24,
      unit: 'bạn',
      hints: ['Nam 3 phần, nữ 4 phần. Hiệu số phần là 1.', 'Một phần ứng với 6 bạn.'],
      solution: 'Hiệu số phần: 4 − 3 = 1. Một phần: 6 : 1 = 6 (bạn). Số bạn nữ: 6 × 4 = 24 (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Kho thứ nhất chứa ít hơn kho thứ hai 120 tấn thóc. Số thóc kho thứ nhất bằng $\\dfrac{3}{7}$ số thóc kho thứ hai. Kho thứ hai chứa bao nhiêu tấn thóc?',
      answer: 210,
      unit: 'tấn',
      hints: ['Kho thứ nhất 3 phần, kho thứ hai 7 phần.', 'Hiệu số phần bằng nhau là 4.'],
      solution:
        'Hiệu số phần: 7 − 3 = 4. Một phần: 120 : 4 = 30 (tấn). Kho thứ hai: 30 × 7 = 210 (tấn).',
    },
    {
      type: 'choice',
      prompt: 'Hiệu của hai số là 20. Số bé bằng $\\dfrac{1}{3}$ số lớn. Số lớn là:',
      options: ['30', '15', '20', '10'],
      answer: 0,
      hints: ['Bài cho hiệu, nên em lấy 3 − 1, không lấy 3 + 1.'],
      solution: 'Hiệu số phần: 3 − 1 = 2. Một phần: 20 : 2 = 10. Số lớn: 10 × 3 = 30.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán tìm hai số khi biết hiệu và tỉ số.',
      items: [
        'Tìm số lớn',
        'Vẽ sơ đồ đoạn thẳng',
        'Tìm hiệu số phần bằng nhau',
        'Tìm số bé',
        'Tìm giá trị một phần',
      ],
      answer: [1, 2, 4, 3, 0],
      hints: ['Bắt đầu bằng sơ đồ. Hiệu ứng với hiệu số phần, nên tìm hiệu số phần trước.'],
      solution:
        'Vẽ sơ đồ đoạn thẳng → Tìm hiệu số phần bằng nhau → Tìm giá trị một phần → Tìm số bé → Tìm số lớn.',
    },
    {
      type: 'match',
      prompt: 'Hiệu của hai số là 24. Nối mỗi tỉ số của hai số với số bé.',
      left: [
        'Tỉ số $\\dfrac{1}{3}$',
        'Tỉ số $\\dfrac{1}{4}$',
        'Tỉ số $\\dfrac{3}{5}$',
        'Tỉ số $\\dfrac{5}{7}$',
      ],
      right: ['12', '8', '36', '60', '24'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi tỉ số, tìm hiệu số phần, giá trị một phần, rồi số bé.'],
      solution:
        '$\\dfrac{1}{3}$: 24 : 2 × 1 = 12. $\\dfrac{1}{4}$: 24 : 3 × 1 = 8. $\\dfrac{3}{5}$: 24 : 2 × 3 = 36. $\\dfrac{5}{7}$: 24 : 2 × 5 = 60.',
    },
  ],
  takeaways: [
    'Vẽ sơ đồ đoạn thẳng: phần số lớn dài hơn số bé ứng với hiệu.',
    'Giá trị một phần = hiệu : hiệu số phần bằng nhau.',
    'Số bé = giá trị một phần × số phần của số bé; số lớn = số bé + hiệu.',
  ],
};
