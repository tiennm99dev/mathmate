/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất phân phối của phép nhân đối với phép cộng: a × (b + c) = a × b + a × c và (a + b) × c = a × c + b × c; dùng để tính bằng hai cách và tính nhanh.',
  intro:
    'Đội đồng diễn có 3 hàng áo đỏ và 2 hàng áo vàng, mỗi hàng 15 bạn. Đội có bao nhiêu bạn? Em có thể tính bằng hai cách, và hai cách cho cùng một kết quả!',
  objectives: [
    'Nhận biết tính chất nhân một số với một tổng.',
    'Tính giá trị biểu thức bằng hai cách.',
    'Vận dụng tính chất để tính nhanh.',
  ],
  sections: [
    {
      heading: 'Hai cách tính',
      blocks: [
        {
          type: 'p',
          text: 'Đội đồng diễn có 3 hàng áo đỏ và 2 hàng áo vàng, mỗi hàng 15 bạn.',
        },
        {
          type: 'p',
          text: 'Cách 1: Đội có 3 + 2 = 5 hàng. Số bạn là (3 + 2) × 15 = 5 × 15 = 75.',
        },
        {
          type: 'p',
          text: 'Cách 2: Áo đỏ có 3 × 15 = 45 bạn, áo vàng có 2 × 15 = 30 bạn. Cả đội có 45 + 30 = 75 bạn.',
        },
        { type: 'p', text: 'Vậy (3 + 2) × 15 = 3 × 15 + 2 × 15.' },
      ],
    },
    {
      heading: 'Nhân một số với một tổng',
      blocks: [
        { type: 'p', text: 'Em so sánh giá trị của a × (b + c) và a × b + a × c.' },
        {
          type: 'table',
          head: ['a', 'b', 'c', 'a × (b + c)', 'a × b + a × c'],
          rows: [
            ['4', '5', '3', '4 × 8 = 32', '20 + 12 = 32'],
            ['26', '5', '4', '26 × 9 = 234', '130 + 104 = 234'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng rồi cộng các kết quả với nhau.',
        },
        { type: 'p', text: 'a × (b + c) = a × b + a × c' },
        { type: 'p', text: '(a + b) × c = a × c + b × c' },
      ],
    },
    {
      heading: 'Tính nhanh',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai tích có chung một thừa số, em đưa về một số nhân với một tổng.',
        },
        { type: 'p', text: '25 × 7 + 25 × 3 = 25 × (7 + 3) = 25 × 10 = 250.' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Em cũng có thể tách một thừa số thành tổng để nhân nhẩm.',
        },
        { type: 'p', text: '36 × 11 = 36 × (10 + 1) = 36 × 10 + 36 × 1 = 360 + 36 = 396.' },
      ],
    },
  ],
  explore: {
    title: 'Hình chữ nhật hai màu',
    instruction:
      'Em đổi số ô mỗi cột, số cột hồng và số cột xanh. Đếm cả hình hay cộng hai phần đều được cùng một số ô. Chọn "Chia theo hàng" để xem (b + c) × a.',
  },
  examples: [
    {
      problem: 'Tính bằng hai cách: 43 × (2 + 6).',
      steps: [
        'Cách 1: 43 × (2 + 6) = 43 × 8 = 344.',
        'Cách 2: 43 × (2 + 6) = 43 × 2 + 43 × 6 = 86 + 258 = 344.',
      ],
      answer: '43 × (2 + 6) = 344.',
    },
    {
      problem: 'Tính bằng hai cách: (15 + 21) × 7.',
      steps: [
        'Cách 1: (15 + 21) × 7 = 36 × 7 = 252.',
        'Cách 2: (15 + 21) × 7 = 15 × 7 + 21 × 7 = 105 + 147 = 252.',
      ],
      answer: '(15 + 21) × 7 = 252.',
    },
    {
      problem: 'Cho m = 4, n = 5, p = 3. Tính m × (n + p) và m × n + m × p.',
      steps: [
        'm × (n + p) = 4 × (5 + 3) = 4 × 8 = 32.',
        'm × n + m × p = 4 × 5 + 4 × 3 = 20 + 12 = 32.',
        'Hai giá trị bằng nhau.',
      ],
      answer: 'm × (n + p) = m × n + m × p = 32.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 26 × (5 + 4) = ?',
      answer: 234,
      hints: ['Em có thể tính 26 × 9, hoặc 26 × 5 + 26 × 4.'],
      solution: '26 × (5 + 4) = 26 × 9 = 234. Hoặc: 26 × 5 + 26 × 4 = 130 + 104 = 234.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào có giá trị bằng 26 × (5 + 4)?',
      options: ['26 × 5 + 26 × 4', '26 × 5 + 4', '26 + 5 × 4', '26 × 5 × 4'],
      answer: 0,
      hints: ['Nhân 26 với từng số hạng của tổng rồi cộng lại.'],
      solution:
        '26 × (5 + 4) = 26 × 5 + 26 × 4 = 234. Các biểu thức kia: 26 × 5 + 4 = 134; 26 + 5 × 4 = 46; 26 × 5 × 4 = 520.',
    },
    {
      type: 'text',
      prompt: 'Điền chữ thích hợp: a × (b + c) = a × b + a × ?',
      accept: ['c'],
      hints: ['Nhân a với từng số hạng b và c.'],
      solution: 'a × (b + c) = a × b + a × c.',
    },
    {
      type: 'number',
      prompt: 'Cho m = 4, n = 5, p = 3. Tính giá trị của (m + n) × p.',
      answer: 27,
      hints: ['Thay chữ bằng số: (4 + 5) × 3.'],
      solution: '(m + n) × p = (4 + 5) × 3 = 9 × 3 = 27. Cũng bằng m × p + n × p = 12 + 15 = 27.',
    },
    {
      type: 'match',
      prompt: 'Tính rồi nối mỗi biểu thức với giá trị của nó.',
      left: ['7 × (10 + 2)', '(6 + 4) × 9', '8 × 25 + 8 × 75', '12 × 3 + 12 × 7'],
      right: ['84', '90', '800', '120', '74'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['7 × (10 + 2) = 7 × 10 + 7 × 2.', '8 × 25 + 8 × 75 = 8 × (25 + 75).'],
      solution:
        '7 × (10 + 2) = 70 + 14 = 84; (6 + 4) × 9 = 10 × 9 = 90; 8 × 25 + 8 × 75 = 8 × 100 = 800; 12 × 3 + 12 × 7 = 12 × 10 = 120.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: 25 × 7 + 25 × 3 = ?',
      answer: 250,
      hints: ['Hai tích có chung thừa số 25.', 'Em tính 25 × (7 + 3).'],
      solution: '25 × 7 + 25 × 3 = 25 × (7 + 3) = 25 × 10 = 250.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: 36 × 11 = ?',
      answer: 396,
      hints: ['11 = 10 + 1.', 'Em tính 36 × 10 + 36 × 1.'],
      solution: '36 × 11 = 36 × (10 + 1) = 360 + 36 = 396.',
    },
    {
      type: 'number',
      prompt:
        'Một đội đồng diễn có 4 hàng áo đỏ và 3 hàng áo vàng, mỗi hàng có 12 bạn. Hỏi đội có tất cả bao nhiêu bạn?',
      answer: 84,
      unit: 'bạn',
      hints: ['Đội có 4 + 3 hàng.', 'Em tính (4 + 3) × 12.'],
      solution:
        'Cách 1: (4 + 3) × 12 = 7 × 12 = 84 (bạn). Cách 2: 4 × 12 + 3 × 12 = 48 + 36 = 84 (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Mỗi hộp bút giá 12 000 đồng, mỗi hộp màu giá 8 000 đồng. Mẹ mua 5 hộp bút và 5 hộp màu. Hỏi mẹ phải trả bao nhiêu tiền?',
      answer: 100000,
      unit: 'đồng',
      hints: [
        'Mẹ mua 5 bộ, mỗi bộ gồm một hộp bút và một hộp màu.',
        'Em tính (12 000 + 8 000) × 5.',
      ],
      solution:
        '(12 000 + 8 000) × 5 = 20 000 × 5 = 100 000 (đồng). Hoặc: 12 000 × 5 + 8 000 × 5 = 60 000 + 40 000 = 100 000 (đồng).',
    },
  ],
  takeaways: [
    'a × (b + c) = a × b + a × c.',
    '(a + b) × c = a × c + b × c.',
    'Hai tích có chung một thừa số thì đưa về một số nhân với một tổng để tính nhanh.',
  ],
};
