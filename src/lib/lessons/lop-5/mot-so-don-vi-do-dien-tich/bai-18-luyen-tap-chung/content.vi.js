/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về đơn vị đo diện tích: đổi giữa km², ha, m², dm², cm², mm², viết số đo dưới dạng số thập phân, so sánh và giải bài toán thực tế.',
  intro:
    'Em ôn lại cả bảng đơn vị đo diện tích. Em đổi đơn vị, so sánh số đo và giải bài toán về ruộng vườn, nền nhà nhé!',
  objectives: [
    'Đổi được các đơn vị đo diện tích đã học.',
    'Viết được số đo diện tích dưới dạng số thập phân.',
    'So sánh số đo diện tích và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 km²', '100 ha = 1 000 000 m²'],
            ['1 ha', '10 000 m²'],
            ['1 m²', '100 dm²'],
            ['1 dm²', '100 cm²'],
            ['1 cm²', '100 mm²'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đơn vị đo diện tích liền nhau gấp hoặc kém nhau 100 lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo so sánh',
          text: 'Muốn so sánh hai số đo khác đơn vị, em đổi về cùng một đơn vị rồi so sánh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ câu hỏi trộn',
    instruction:
      'Mỗi câu một dạng bài của chủ đề. Sai lần đầu, em có gợi ý và được thử lại. Làm xong, em xem phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem: '8 cm² 10 mm² = ? cm²',
      steps: [
        '1 cm² = 100 mm², nên 10 mm² = $\\dfrac{10}{100}$ cm².',
        '8 cm² 10 mm² = $8\\dfrac{10}{100}$ cm² = 8,10 cm² = 8,1 cm².',
      ],
      answer: '8 cm² 10 mm² = 8,1 cm².',
    },
    {
      problem: 'So sánh: 5 ha 2 000 m² và 52 000 m².',
      steps: ['5 ha = 50 000 m².', '5 ha 2 000 m² = 50 000 m² + 2 000 m² = 52 000 m².'],
      answer: '5 ha 2 000 m² = 52 000 m².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '16 km² = ? ha',
      answer: 1600,
      unit: 'ha',
      hints: ['1 km² = 100 ha.'],
      solution: '16 km² = 16 × 100 ha = 1 600 ha.',
    },
    {
      type: 'number',
      prompt: '80 000 m² = ? ha',
      answer: 8,
      unit: 'ha',
      hints: ['Cứ 10 000 m² là 1 ha.'],
      solution: '80 000 : 10 000 = 8. Vậy 80 000 m² = 8 ha.',
    },
    {
      type: 'number',
      prompt: '7 m² 8 dm² = ? dm²',
      answer: 708,
      unit: 'dm²',
      hints: ['7 m² = 700 dm².'],
      solution: '7 m² = 700 dm². 700 dm² + 8 dm² = 708 dm².',
    },
    {
      type: 'number',
      prompt: '1 230 cm² = ? dm² 30 cm²',
      answer: 12,
      unit: 'dm²',
      hints: ['1 230 cm² = 1 200 cm² + 30 cm².', '1 200 cm² = 12 dm².'],
      solution: '1 230 cm² = 1 200 cm² + 30 cm² = 12 dm² 30 cm².',
    },
    {
      type: 'number',
      prompt: '42 dm² = ? m²',
      answer: 0.42,
      unit: 'm²',
      hints: ['42 dm² = $\\dfrac{42}{100}$ m².'],
      solution: '42 dm² = $\\dfrac{42}{100}$ m² = 0,42 m².',
    },
    {
      type: 'choice',
      prompt: '12 km² 50 ha = ? km²',
      options: ['12,5 km²', '12,05 km²', '12,50 ha', '1 250 km²'],
      answer: 0,
      hints: ['50 ha = $\\dfrac{50}{100}$ km².'],
      solution: '50 ha = $\\dfrac{50}{100}$ km² = 0,5 km². Vậy 12 km² 50 ha = 12,5 km².',
    },
    {
      type: 'choice',
      prompt: '4 ha 101 m² ? 48 100 m²',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đổi 4 ha 101 m² ra mét vuông.', '4 ha = 40 000 m².'],
      solution: '4 ha 101 m² = 40 101 m². Mà 40 101 m² < 48 100 m². Vậy 4 ha 101 m² < 48 100 m².',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số đo bằng 1 m².',
      options: ['100 dm²', '10 000 cm²', '1 000 cm²', '10 dm²'],
      answers: [0, 1],
      hints: ['1 m² = 100 dm², mỗi dm² lại bằng 100 cm².'],
      solution: '1 m² = 100 dm² = 10 000 cm². Còn 1 000 cm² = 10 dm² chưa bằng 1 m².',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi nơi với diện tích phù hợp.',
      left: ['Sàn phòng khách', 'Một trang trại', 'Một tỉnh'],
      right: ['30 m²', '30 ha', '3 000 km²', '30 mm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Nơi càng rộng thì dùng đơn vị càng lớn: m², ha, km².'],
      solution: 'Sàn phòng khách 30 m². Trang trại 30 ha. Một tỉnh khoảng 3 000 km².',
    },
    {
      type: 'number',
      prompt:
        'Một khu đất hình chữ nhật dài 200 m, chiều rộng bằng $\\dfrac{3}{5}$ chiều dài. Diện tích khu đất là bao nhiêu mét vuông?',
      answer: 24000,
      unit: 'm²',
      hints: ['Chiều rộng: 200 : 5 × 3.', 'Rồi nhân chiều dài với chiều rộng.'],
      solution: 'Chiều rộng: 200 : 5 × 3 = 120 (m). Diện tích: 200 × 120 = 24 000 (m²).',
    },
    {
      type: 'number',
      prompt:
        'Hồ Tây rộng khoảng 5 km², Hồ Gươm rộng khoảng 12 ha. Hồ Tây rộng hơn Hồ Gươm khoảng bao nhiêu héc-ta?',
      answer: 488,
      unit: 'ha',
      hints: ['Đổi 5 km² ra héc-ta.', '5 km² = 500 ha.'],
      solution: '5 km² = 500 ha. 500 − 12 = 488. Hồ Tây rộng hơn Hồ Gươm khoảng 488 ha.',
    },
    {
      type: 'number',
      prompt:
        'Thửa ruộng rộng 2 ha. Cứ 100 m² thu hoạch được 50 kg thóc. Cả thửa ruộng thu được bao nhiêu ki-lô-gam thóc?',
      answer: 10000,
      unit: 'kg',
      hints: ['Đổi 2 ha ra mét vuông.', '2 ha = 20 000 m². Có bao nhiêu lần 100 m²?'],
      solution: '2 ha = 20 000 m². 20 000 : 100 = 200. Thu được 50 × 200 = 10 000 (kg) thóc.',
    },
  ],
  takeaways: [
    '1 km² = 100 ha; 1 ha = 10 000 m²; hai đơn vị liền nhau gấp nhau 100 lần.',
    'So sánh số đo diện tích: đổi về cùng một đơn vị rồi so sánh.',
    'Bài toán ruộng đất: tính diện tích theo m² rồi đổi ra ha khi cần.',
  ],
};
