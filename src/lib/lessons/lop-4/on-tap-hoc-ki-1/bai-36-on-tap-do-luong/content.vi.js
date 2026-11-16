/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đo lường: yến, tạ, tấn; mi-li-mét vuông, đề-xi-mét vuông, mét vuông; giây, thế kỉ; đo góc; so sánh, tính với số đo và giải bài toán.',
  intro:
    'Em đã học yến, tạ, tấn, các đơn vị đo diện tích, giây và thế kỉ. Hôm nay em ôn lại cách đổi, so sánh và tính với các số đo. Bài ôn tập sẽ hỏi thêm phần nào em còn sai nhé!',
  objectives: [
    'Đổi các đơn vị đo khối lượng yến, tạ, tấn, ki-lô-gam.',
    'Đổi các đơn vị đo diện tích mm², cm², dm², m².',
    'Đổi phút ra giây, thế kỉ ra năm; biết một năm thuộc thế kỉ nào.',
    'So sánh và tính với các số đo; đo góc bằng thước đo góc.',
    'Giải bài toán có số đo khối lượng, diện tích.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Khối lượng',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 yến', '10 kg'],
            ['1 tạ', '10 yến = 100 kg'],
            ['1 tấn', '10 tạ = 1 000 kg'],
          ],
        },
      ],
    },
    {
      heading: 'Diện tích',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 cm²', '100 mm²'],
            ['1 dm²', '100 cm²'],
            ['1 m²', '100 dm² = 10 000 cm²'],
          ],
        },
        {
          type: 'p',
          text: 'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo).',
        },
      ],
    },
    {
      heading: 'Thời gian',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 phút', '60 giây'],
            ['1 thế kỉ', '100 năm'],
          ],
        },
        {
          type: 'p',
          text: 'Từ năm 2001 đến năm 2100 là thế kỉ XXI (thế kỉ hai mươi mốt).',
        },
      ],
    },
    {
      heading: 'So sánh số đo',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn so sánh hai số đo, em đổi chúng về cùng một đơn vị rồi so sánh hai số.',
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
      problem: 'Chọn dấu thích hợp: 5 tạ 4 yến ? 538 kg.',
      steps: [
        'Em đổi về ki-lô-gam: 5 tạ = 500 kg, 4 yến = 40 kg.',
        '5 tạ 4 yến = 500 kg + 40 kg = 540 kg.',
        '540 > 538.',
      ],
      answer: '5 tạ 4 yến > 538 kg.',
    },
    {
      problem:
        'Mảnh đất trồng rau hình chữ nhật có chiều dài 15 m, chiều dài hơn chiều rộng 6 m. Tính diện tích mảnh đất.',
      steps: [
        'Chiều rộng mảnh đất là: 15 − 6 = 9 (m).',
        'Diện tích mảnh đất là: 15 × 9 = 135 (m²).',
      ],
      answer: 'Diện tích mảnh đất là 135 m².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '3 tạ 60 kg = ? kg',
      answer: 360,
      unit: 'kg',
      hints: ['1 tạ = 100 kg. Em đổi 3 tạ ra ki-lô-gam trước.'],
      solution: '3 tạ = 300 kg. 300 kg + 60 kg = 360 kg.',
    },
    {
      type: 'number',
      prompt: '1 tấn 7 tạ = ? tạ',
      answer: 17,
      hints: ['1 tấn = 10 tạ.'],
      solution: '1 tấn = 10 tạ. 10 tạ + 7 tạ = 17 tạ.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 2 tấn 2 tạ ? 2 220 kg',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em đổi 2 tấn 2 tạ ra ki-lô-gam.'],
      solution:
        '2 tấn 2 tạ = 2 000 kg + 200 kg = 2 200 kg. 2 200 < 2 220, nên 2 tấn 2 tạ < 2 220 kg.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['5 yến + 7 yến', '43 tấn − 25 tấn', '3 tạ × 5', '15 tạ : 5'],
      right: ['12 yến', '18 tấn', '15 tạ', '3 tạ'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính với các số như bình thường rồi viết đơn vị vào kết quả.'],
      solution:
        '5 + 7 = 12, được 12 yến. 43 − 25 = 18, được 18 tấn. 3 × 5 = 15, được 15 tạ. 15 : 5 = 3, được 3 tạ.',
    },
    {
      type: 'number',
      prompt: '1 dm² 6 cm² = ? cm²',
      answer: 106,
      unit: 'cm²',
      hints: ['1 dm² = 100 cm².'],
      solution: '1 dm² = 100 cm². 100 cm² + 6 cm² = 106 cm².',
    },
    {
      type: 'number',
      prompt: '5 m² = ? cm²',
      answer: 50000,
      unit: 'cm²',
      hints: ['1 m² = 10 000 cm².'],
      solution: '1 m² = 10 000 cm², nên 5 m² = 5 × 10 000 cm² = 50 000 cm².',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 2 m² 5 dm² ? 250 dm²',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em đổi 2 m² 5 dm² ra đề-xi-mét vuông. Cẩn thận: 5 dm² không phải 50 dm².'],
      solution: '2 m² 5 dm² = 200 dm² + 5 dm² = 205 dm². 205 < 250, nên 2 m² 5 dm² < 250 dm².',
    },
    {
      type: 'number',
      prompt: '1 phút 30 giây = ? giây',
      answer: 90,
      hints: ['1 phút = 60 giây.'],
      solution: '1 phút 30 giây = 60 giây + 30 giây = 90 giây.',
    },
    {
      type: 'choice',
      prompt: 'Năm 2026 thuộc thế kỉ nào?',
      options: ['Thế kỉ XXI', 'Thế kỉ XX', 'Thế kỉ XXII'],
      answer: 0,
      hints: ['Thế kỉ XX từ năm 1901 đến năm 2000. Thế kỉ tiếp theo bắt đầu từ năm 2001.'],
      solution: 'Thế kỉ XXI từ năm 2001 đến năm 2100, nên năm 2026 thuộc thế kỉ XXI.',
    },
    {
      type: 'number',
      prompt:
        'Con bê cân nặng 1 tạ 40 kg. Con bò cân nặng hơn con bê 220 kg. Cả con bê và con bò cân nặng bao nhiêu ki-lô-gam?',
      answer: 500,
      unit: 'kg',
      hints: ['Em đổi 1 tạ 40 kg ra ki-lô-gam, rồi tìm cân nặng của con bò.'],
      solution:
        '1 tạ 40 kg = 140 kg. Con bò nặng: 140 + 220 = 360 (kg). Cả hai con nặng: 140 + 360 = 500 (kg).',
    },
    {
      type: 'choice',
      prompt:
        'Con voi cân nặng gấp đôi cả con bê và con bò, mà cả con bê và con bò nặng 500 kg. Con voi nặng bao nhiêu?',
      options: ['1 tấn', '1 tạ', '10 tấn', '5 tạ'],
      answer: 0,
      hints: ['Em tính 500 × 2 rồi đổi ra tấn. 1 tấn = 1 000 kg.'],
      solution: 'Con voi nặng: 500 × 2 = 1 000 (kg). 1 000 kg = 1 tấn.',
    },
    {
      type: 'number',
      prompt:
        'Mảnh đất hình chữ nhật có chiều dài 12 m, chiều dài hơn chiều rộng 4 m. Diện tích mảnh đất là bao nhiêu mét vuông?',
      answer: 96,
      unit: 'm²',
      hints: ['Em tìm chiều rộng trước: 12 − 4.'],
      solution: 'Chiều rộng: 12 − 4 = 8 (m). Diện tích: 12 × 8 = 96 (m²).',
    },
  ],
  takeaways: [
    '1 yến = 10 kg; 1 tạ = 100 kg; 1 tấn = 1 000 kg.',
    '1 cm² = 100 mm²; 1 dm² = 100 cm²; 1 m² = 100 dm².',
    '1 phút = 60 giây; 1 thế kỉ = 100 năm.',
    'So sánh số đo: đổi về cùng một đơn vị rồi so sánh.',
  ],
};
