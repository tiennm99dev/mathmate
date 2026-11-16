/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng đơn vị đo diện tích km², ha, m², dm², cm², mm²: 1 km² = 100 ha, 1 ha = 10 000 m², từ m² trở xuống hai đơn vị liền nhau gấp hoặc kém nhau 100 lần.',
  intro:
    'Em đã biết km², ha, m², dm², cm², mm². Hôm nay em xếp tất cả vào một bảng. Nhìn bảng, em đổi đơn vị thật nhanh.',
  objectives: [
    'Nêu được bảng đơn vị đo diện tích theo thứ tự từ lớn đến bé.',
    'Biết 1 km² = 100 ha, 1 ha = 10 000 m², 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm².',
    'Đổi được các số đo diện tích, kể cả viết dưới dạng số thập phân.',
  ],
  sections: [
    {
      heading: 'Bảng đơn vị đo diện tích',
      blocks: [
        {
          type: 'p',
          text: 'Em xếp các đơn vị đo diện tích đã học từ lớn đến bé: km², ha, m², dm², cm², mm².',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 km²', '100 ha'],
            ['1 ha', '10 000 m²'],
            ['1 m²', '100 dm²'],
            ['1 dm²', '100 cm²'],
            ['1 cm²', '100 mm²'],
          ],
          caption: 'Bảng đơn vị đo diện tích, từ lớn đến bé',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Với m², dm², cm², mm²: đơn vị lớn gấp 100 lần đơn vị bé liền sau, đơn vị bé bằng 1/100 đơn vị lớn liền trước.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Héc-ta và mét vuông đứng cạnh nhau trong bảng nhưng 1 ha = 10 000 m², không phải 100 m².',
        },
      ],
    },
    {
      heading: 'Đổi đơn vị đo diện tích',
      blocks: [
        {
          type: 'p',
          text: 'Đổi từ đơn vị lớn ra đơn vị bé: nhân. Ví dụ: 4 m² = 4 × 100 dm² = 400 dm²; 3 ha = 3 × 10 000 m² = 30 000 m².',
        },
        {
          type: 'p',
          text: 'Đổi từ đơn vị bé ra đơn vị lớn: chia. Ví dụ: 900 : 100 = 9, nên 900 cm² = 9 dm²; 600 : 100 = 6, nên 600 ha = 6 km².',
        },
        {
          type: 'p',
          text: 'Cách hai cột thì nhân hoặc chia hai lần: 3 m² = 300 dm² = 30 000 cm².',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đơn vị đo độ dài liền nhau gấp nhau 10 lần (1 m = 10 dm). Còn 1 m² = 100 dm², gấp 100 lần, vì hình vuông cạnh 1 m gồm 10 hàng, mỗi hàng 10 ô vuông 1 dm².',
        },
      ],
    },
    {
      heading: 'Viết số đo diện tích dưới dạng số thập phân',
      blocks: [
        {
          type: 'p',
          text: '1 dm² = $\\dfrac{1}{100}$ m² = 0,01 m². Vậy 30 dm² = $\\dfrac{30}{100}$ m² = 0,3 m².',
        },
        {
          type: 'p',
          text: '3 m² 7 dm² = $3\\dfrac{7}{100}$ m² = 3,07 m².',
        },
        {
          type: 'p',
          text: '12 km² 50 ha = $12\\dfrac{50}{100}$ km² = 12,5 km².',
        },
      ],
    },
  ],
  explore: {
    title: 'Bấm cột để đổi đơn vị',
    instruction:
      'Số đo bắt đầu ở cột đơn vị của nó. Em bấm vào cột đơn vị được hỏi. Mỗi cột đi qua, máy ghi lại phép nhân hoặc phép chia.',
  },
  examples: [
    {
      problem: '2 m² 5 dm² = ? dm²',
      steps: ['1 m² = 100 dm², nên 2 m² = 200 dm².', '200 dm² + 5 dm² = 205 dm².'],
      answer: '2 m² 5 dm² = 205 dm².',
    },
    {
      problem: '615 dm² = ? m² ? dm²',
      steps: ['615 dm² = 600 dm² + 15 dm².', '600 dm² = 6 m².'],
      answer: '615 dm² = 6 m² 15 dm².',
    },
    {
      problem: 'Viết 54 m² dưới dạng số đo có đơn vị là héc-ta.',
      steps: [
        '1 ha = 10 000 m², nên 54 m² = $\\dfrac{54}{10\\,000}$ ha.',
        '$\\dfrac{54}{10\\,000}$ = 0,0054.',
      ],
      answer: '54 m² = 0,0054 ha.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Xếp các đơn vị đo diện tích theo thứ tự từ lớn đến bé.',
      items: ['m²', 'km²', 'cm²', 'ha', 'mm²', 'dm²'],
      answer: [1, 3, 0, 5, 2, 4],
      hints: ['Lớn nhất là km², bé nhất là mm².', 'Lớn hơn mét vuông có km² và ha.'],
      solution: 'km², ha, m², dm², cm², mm².',
    },
    {
      type: 'number',
      prompt: '12 m² = ? dm²',
      answer: 1200,
      unit: 'dm²',
      hints: ['1 m² = 100 dm².'],
      solution: '12 m² = 12 × 100 dm² = 1 200 dm².',
    },
    {
      type: 'number',
      prompt: '2 500 dm² = ? m²',
      answer: 25,
      unit: 'm²',
      hints: ['Cứ 100 dm² là 1 m².'],
      solution: '2 500 : 100 = 25. Vậy 2 500 dm² = 25 m².',
    },
    {
      type: 'number',
      prompt: '40 cm² 4 mm² = ? mm²',
      answer: 4004,
      unit: 'mm²',
      hints: ['1 cm² = 100 mm², nên 40 cm² = 4 000 mm².'],
      solution: '40 cm² = 4 000 mm². 4 000 mm² + 4 mm² = 4 004 mm².',
    },
    {
      type: 'choice',
      prompt: 'Nền nhà rộng 4 m². Diện tích đó bằng bao nhiêu đề-xi-mét vuông?',
      options: ['400 dm²', '40 dm²', '4 000 dm²', '40 000 dm²'],
      answer: 0,
      hints: ['m² và dm² là hai đơn vị liền nhau.'],
      solution: '1 m² = 100 dm², nên 4 m² = 400 dm².',
    },
    {
      type: 'choice',
      prompt: 'Mặt bàn học của em rộng khoảng bao nhiêu?',
      options: ['50 dm²', '50 cm²', '50 m²', '50 mm²'],
      answer: 0,
      hints: ['Mặt bàn dài khoảng 1 m, rộng khoảng nửa mét.'],
      solution: 'Mặt bàn học rộng khoảng 50 dm².',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với diện tích phù hợp.',
      left: ['Chiếc khăn mặt', 'Sàn một căn hộ', 'Tỉnh Lạng Sơn'],
      right: ['225 cm²', '94 m²', '8 310 km²', '94 ha'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Vật càng to thì dùng đơn vị càng lớn.'],
      solution: 'Khăn mặt khoảng 225 cm². Sàn căn hộ 94 m². Tỉnh Lạng Sơn khoảng 8 310 km².',
    },
    {
      type: 'number',
      prompt: '30 dm² = ? m²',
      answer: 0.3,
      unit: 'm²',
      hints: ['1 dm² = 0,01 m², nên 30 dm² = $\\dfrac{30}{100}$ m².'],
      solution: '30 dm² = $\\dfrac{30}{100}$ m² = 0,3 m².',
    },
    {
      type: 'number',
      prompt: '3 m² 7 dm² = ? m²',
      answer: 3.07,
      unit: 'm²',
      hints: ['7 dm² = $\\dfrac{7}{100}$ m².'],
      solution: '3 m² 7 dm² = $3\\dfrac{7}{100}$ m² = 3,07 m².',
    },
    {
      type: 'number',
      prompt:
        'Bác Tư có mảnh đất rộng 1 ha. Bác dùng $\\dfrac{1}{10}$ mảnh đất để làm nhà. Phần làm nhà rộng bao nhiêu mét vuông?',
      answer: 1000,
      unit: 'm²',
      hints: ['Đổi 1 ha ra mét vuông trước.', '1 ha = 10 000 m². Tìm $\\dfrac{1}{10}$ của số đó.'],
      solution: '1 ha = 10 000 m². 10 000 : 10 = 1 000. Phần làm nhà rộng 1 000 m².',
    },
  ],
  takeaways: [
    'Bảng đơn vị đo diện tích: km², ha, m², dm², cm², mm².',
    '1 km² = 100 ha; 1 ha = 10 000 m²; 1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².',
    'Đổi từ đơn vị lớn ra đơn vị bé thì nhân, từ đơn vị bé ra đơn vị lớn thì chia.',
  ],
};
