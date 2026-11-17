/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm hai số khi biết tổng và tỉ số: vẽ sơ đồ đoạn thẳng, tìm tổng số phần bằng nhau, tìm giá trị một phần, rồi tìm số bé và số lớn.',
  intro:
    'Tổng của hai số là 96. Số bé bằng 3/5 số lớn. Hai số đó là bao nhiêu? Em vẽ sơ đồ đoạn thẳng, chia thành các phần bằng nhau là tìm ra ngay.',
  objectives: [
    'Vẽ được sơ đồ đoạn thẳng cho bài toán tổng và tỉ số.',
    'Tìm được tổng số phần bằng nhau và giá trị một phần.',
    'Giải được bài toán tìm hai số khi biết tổng và tỉ số của hai số đó.',
  ],
  sections: [
    {
      heading: 'Bài toán',
      blocks: [
        {
          type: 'p',
          text: 'Tổng của hai số là 96. Tỉ số của hai số đó là $\\dfrac{3}{5}$. Tìm hai số đó.',
        },
        {
          type: 'p',
          text: 'Tỉ số $\\dfrac{3}{5}$ cho biết: số bé gồm 3 phần bằng nhau thì số lớn gồm 5 phần như thế.',
        },
        {
          type: 'p',
          text: 'Em vẽ sơ đồ: đoạn thẳng số bé có 3 phần, đoạn thẳng số lớn có 5 phần bằng nhau. Cả hai đoạn ứng với tổng 96.',
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
            ['Tổng số phần bằng nhau', '3 + 5 = 8 (phần)'],
            ['Giá trị một phần', '96 : 8 = 12'],
            ['Số bé', '12 × 3 = 36'],
            ['Số lớn', '96 − 36 = 60'],
          ],
          caption: 'Đáp số: Số bé 36; số lớn 60.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các bước giải: 1. Vẽ sơ đồ đoạn thẳng. 2. Tìm tổng số phần bằng nhau. 3. Tìm giá trị một phần: lấy tổng chia cho tổng số phần. 4. Tìm số bé, rồi tìm số lớn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: '36 + 60 = 96 và 36 : 60 = $\\dfrac{36}{60} = \\dfrac{3}{5}$. Hai số tìm được đúng.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Có thể gộp bước 3 và bước 4: số bé là 96 : 8 × 3 = 36.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ đoạn thẳng',
    instruction:
      'Ở chế độ "Khám phá", chọn số phần của mỗi số và kéo thanh trượt để đổi tổng, rồi xem sơ đồ và các bước giải. Ở chế độ "Tự giải", chạm vào số đúng ở từng bước.',
  },
  examples: [
    {
      problem: 'Tổng của hai số là 96. Tỉ số của hai số đó là $\\dfrac{3}{5}$. Tìm hai số đó.',
      steps: [
        'Theo sơ đồ, tổng số phần bằng nhau là: 3 + 5 = 8 (phần).',
        'Giá trị của một phần là: 96 : 8 = 12.',
        'Số bé là: 12 × 3 = 36.',
        'Số lớn là: 96 − 36 = 60.',
      ],
      answer: 'Số bé: 36; số lớn: 60.',
    },
    {
      problem:
        'Hai lớp 5A và 5B thu gom được 120 kg giấy vụn. Số giấy lớp 5A thu gom bằng $\\dfrac{2}{3}$ số giấy lớp 5B. Mỗi lớp thu gom được bao nhiêu ki-lô-gam giấy vụn?',
      steps: [
        'Lớp 5A: 2 phần, lớp 5B: 3 phần như thế.',
        'Tổng số phần bằng nhau là: 2 + 3 = 5 (phần).',
        'Giá trị của một phần là: 120 : 5 = 24 (kg).',
        'Lớp 5A thu gom được: 24 × 2 = 48 (kg).',
        'Lớp 5B thu gom được: 120 − 48 = 72 (kg).',
      ],
      answer: 'Lớp 5A: 48 kg; lớp 5B: 72 kg.',
    },
    {
      problem:
        'Một mảnh vườn hình chữ nhật có chu vi 64 m, chiều rộng bằng $\\dfrac{3}{5}$ chiều dài. Tính chiều dài và chiều rộng của mảnh vườn.',
      steps: [
        'Tổng của chiều dài và chiều rộng là nửa chu vi: 64 : 2 = 32 (m).',
        'Tổng số phần bằng nhau là: 3 + 5 = 8 (phần).',
        'Giá trị của một phần là: 32 : 8 = 4 (m).',
        'Chiều rộng là: 4 × 3 = 12 (m). Chiều dài là: 32 − 12 = 20 (m).',
      ],
      answer: 'Chiều dài 20 m, chiều rộng 12 m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tổng của hai số là 80, tỉ số của hai số là $\\dfrac{3}{7}$. Tổng số phần bằng nhau là:',
      options: ['10 phần', '4 phần', '7 phần', '3 phần'],
      answer: 0,
      hints: ['Số bé có 3 phần, số lớn có 7 phần. Cộng lại.'],
      solution: 'Tổng số phần bằng nhau là: 3 + 7 = 10 (phần).',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 63. Tỉ số của hai số là $\\dfrac{2}{5}$. Tìm số bé.',
      answer: 18,
      hints: ['Tổng số phần bằng nhau là 2 + 5.', 'Tìm giá trị một phần rồi nhân với 2.'],
      solution: 'Tổng số phần: 2 + 5 = 7. Một phần: 63 : 7 = 9. Số bé: 9 × 2 = 18.',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 63. Tỉ số của hai số là $\\dfrac{2}{5}$. Tìm số lớn.',
      answer: 45,
      hints: ['Một phần là 63 : 7.', 'Số lớn có 5 phần.'],
      solution: 'Một phần: 63 : 7 = 9. Số lớn: 9 × 5 = 45 (hoặc 63 − 18 = 45).',
    },
    {
      type: 'number',
      prompt:
        'Tổng số tuổi của mẹ và con là 48 tuổi. Tuổi con bằng $\\dfrac{1}{5}$ tuổi mẹ. Con bao nhiêu tuổi?',
      answer: 8,
      unit: 'tuổi',
      hints: ['Tuổi con 1 phần, tuổi mẹ 5 phần.', 'Tổng số phần bằng nhau là 6.'],
      solution: 'Tổng số phần: 1 + 5 = 6. Một phần: 48 : 6 = 8. Tuổi con: 8 × 1 = 8 (tuổi).',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng có 150 kg gạo nếp và gạo tẻ. Số gạo nếp bằng $\\dfrac{1}{4}$ số gạo tẻ. Cửa hàng có bao nhiêu ki-lô-gam gạo tẻ?',
      answer: 120,
      unit: 'kg',
      hints: ['Gạo nếp 1 phần, gạo tẻ 4 phần.', 'Tìm giá trị một phần rồi nhân với 4.'],
      solution: 'Tổng số phần: 1 + 4 = 5. Một phần: 150 : 5 = 30 (kg). Gạo tẻ: 30 × 4 = 120 (kg).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán tìm hai số khi biết tổng và tỉ số.',
      items: [
        'Tìm giá trị một phần',
        'Vẽ sơ đồ đoạn thẳng',
        'Tìm số lớn',
        'Tìm tổng số phần bằng nhau',
        'Tìm số bé',
      ],
      answer: [1, 3, 0, 4, 2],
      hints: ['Bắt đầu bằng sơ đồ. Muốn tìm một phần, em cần biết có tất cả bao nhiêu phần.'],
      solution:
        'Vẽ sơ đồ đoạn thẳng → Tìm tổng số phần bằng nhau → Tìm giá trị một phần → Tìm số bé → Tìm số lớn.',
    },
    {
      type: 'choice',
      prompt:
        'Một mảnh đất hình chữ nhật có chu vi 100 m, chiều rộng bằng $\\dfrac{2}{3}$ chiều dài. Chiều dài mảnh đất là:',
      options: ['30 m', '60 m', '40 m', '20 m'],
      answer: 0,
      hints: ['Tổng của chiều dài và chiều rộng là nửa chu vi, không phải chu vi.'],
      solution:
        'Nửa chu vi: 100 : 2 = 50 (m). Tổng số phần: 2 + 3 = 5. Một phần: 50 : 5 = 10 (m). Chiều dài: 10 × 3 = 30 (m).',
    },
    {
      type: 'match',
      prompt: 'Tổng của hai số là 40. Nối mỗi tỉ số của hai số với số bé.',
      left: [
        'Tỉ số $\\dfrac{3}{5}$',
        'Tỉ số $\\dfrac{1}{4}$',
        'Tỉ số $\\dfrac{1}{3}$',
        'Tỉ số $\\dfrac{3}{7}$',
      ],
      right: ['15', '8', '10', '12', '20'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi tỉ số, tìm tổng số phần, giá trị một phần, rồi số bé.'],
      solution:
        '$\\dfrac{3}{5}$: 40 : 8 × 3 = 15. $\\dfrac{1}{4}$: 40 : 5 × 1 = 8. $\\dfrac{1}{3}$: 40 : 4 × 1 = 10. $\\dfrac{3}{7}$: 40 : 10 × 3 = 12.',
    },
  ],
  takeaways: [
    'Vẽ sơ đồ đoạn thẳng theo tỉ số: số bé mấy phần, số lớn mấy phần.',
    'Giá trị một phần = tổng : tổng số phần bằng nhau.',
    'Số bé = giá trị một phần × số phần của số bé; số lớn = tổng − số bé.',
  ],
};
