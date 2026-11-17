/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đo lường: đổi đơn vị đo độ dài, khối lượng, diện tích (km², ha, m², dm², cm², mm²), viết số đo dưới dạng số thập phân, so sánh và tính với số đo, đơn vị đo thời gian và giải bài toán thực tế.',
  intro:
    'Em đã học nhiều đơn vị đo: độ dài, khối lượng, diện tích và thời gian. Hôm nay em ôn lại cách đổi và tính với các số đo. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đổi được các đơn vị đo độ dài, khối lượng, diện tích.',
    'Viết được số đo đại lượng dưới dạng số thập phân.',
    'So sánh được hai số đo và tính được với số đo.',
    'Đổi được một phần của giờ, phút, thế kỉ ra phút, giây, năm.',
    'Giải được bài toán thực tế về đo lường.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đơn vị đo độ dài và khối lượng',
      blocks: [
        {
          type: 'table',
          head: ['Độ dài', 'Khối lượng'],
          rows: [
            ['1 km = 1 000 m', '1 tấn = 10 tạ = 1 000 kg'],
            ['1 m = 10 dm = 100 cm', '1 tạ = 10 yến = 100 kg'],
            ['1 m = 1 000 mm', '1 kg = 1 000 g'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đơn vị đo độ dài (hay khối lượng) liền nhau gấp hoặc kém nhau 10 lần.',
        },
      ],
    },
    {
      heading: 'Đơn vị đo diện tích',
      blocks: [
        {
          type: 'table',
          head: ['Đổi', 'Bằng'],
          rows: [
            ['1 km²', '100 ha'],
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
      ],
    },
    {
      heading: 'Viết số đo dưới dạng số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Em viết phần lẻ thành phân số thập phân của đơn vị lớn: 5 m 36 cm = 5 m và 36/100 m = 5,36 m.',
        },
        {
          type: 'p',
          text: 'Với diện tích, mỗi đơn vị ứng với hai chữ số: 48 km² 9 ha = 48 km² và 9/100 km² = 48,09 km².',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn so sánh hay cộng, trừ hai số đo, em đổi chúng về cùng một đơn vị đo trước.',
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
      problem: 'Đổi: 4 km² 37 ha = ? ha.',
      steps: ['1 km² = 100 ha, nên 4 km² = 400 ha.', '400 ha + 37 ha = 437 ha.'],
      answer: '4 km² 37 ha = 437 ha.',
    },
    {
      problem: 'Đổi: 5/6 giờ = ? phút.',
      steps: ['1 giờ = 60 phút.', '1/6 giờ = 60 : 6 = 10 phút.', '5/6 giờ = 10 × 5 = 50 phút.'],
      answer: '5/6 giờ = 50 phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '28 m 15 cm = ? cm',
      answer: 2815,
      unit: 'cm',
      hints: ['1 m = 100 cm. Em đổi 28 m ra xăng-ti-mét trước.'],
      solution: '28 m = 2 800 cm. 2 800 cm + 15 cm = 2 815 cm.',
    },
    {
      type: 'number',
      prompt: '3,42 tạ = ? kg',
      answer: 342,
      unit: 'kg',
      hints: ['1 tạ = 100 kg. Nhân với 100 thì chuyển dấu phẩy sang phải hai chữ số.'],
      solution: '3,42 tạ = 3,42 × 100 kg = 342 kg.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với số đo bằng nó.',
      left: ['4 km² 37 ha', '6,5 ha', '700 ha', '2,75 m²'],
      right: ['437 ha', '65 000 m²', '7 km²', '275 dm²', '6 500 m²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 km² = 100 ha; 1 ha = 10 000 m²; 1 m² = 100 dm².'],
      solution:
        '4 km² 37 ha = 400 ha + 37 ha = 437 ha. 6,5 ha = 6,5 × 10 000 m² = 65 000 m². 700 ha = 700 : 100 km² = 7 km². 2,75 m² = 2,75 × 100 dm² = 275 dm².',
    },
    {
      type: 'number',
      prompt: 'Viết số thập phân thích hợp: 5 m 360 mm = ? m',
      answer: 5.36,
      unit: 'm',
      hints: ['1 m = 1 000 mm, nên 360 mm = 360/1 000 m.'],
      solution: '5 m 360 mm = 5 m và 360/1 000 m = 5,360 m = 5,36 m.',
    },
    {
      type: 'number',
      prompt: 'Viết số thập phân thích hợp: 6 tấn 205 kg = ? tấn',
      answer: 6.205,
      unit: 'tấn',
      hints: ['1 tấn = 1 000 kg, nên 205 kg = 205/1 000 tấn.'],
      solution: '6 tấn 205 kg = 6 tấn và 205/1 000 tấn = 6,205 tấn.',
    },
    {
      type: 'choice',
      prompt: '48 km² 9 ha = ? km²',
      options: ['48,09 km²', '48,9 km²', '48,009 km²', '4 809 km²'],
      answer: 0,
      hints: ['1 km² = 100 ha, nên 9 ha = 9/100 km².'],
      solution: '9 ha = 9/100 km² = 0,09 km². Vậy 48 km² 9 ha = 48,09 km².',
    },
    {
      type: 'choice',
      prompt: '80 mm² = ? cm²',
      options: ['0,8 cm²', '0,08 cm²', '8 cm²', '0,008 cm²'],
      answer: 0,
      hints: ['1 cm² = 100 mm², nên 80 mm² = 80/100 cm².'],
      solution: '80 mm² = 80/100 cm² = 0,8 cm².',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 3,5 km ? 3 050 m',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đổi 3,5 km ra mét rồi so sánh.'],
      solution: '3,5 km = 3 500 m, mà 3 500 > 3 050. Vậy 3,5 km > 3 050 m.',
    },
    {
      type: 'number',
      prompt: 'Tính: 6,34 km + 5,8 km = ?',
      answer: 12.14,
      unit: 'km',
      hints: ['Em cộng hai số thập phân, đặt các dấu phẩy thẳng cột, rồi viết đơn vị km.'],
      solution: '6,34 + 5,8 = 12,14. Vậy 6,34 km + 5,8 km = 12,14 km.',
    },
    {
      type: 'number',
      prompt: 'Tính: 93,17 km² : 7 = ?',
      answer: 13.31,
      unit: 'km²',
      hints: ['Em chia số thập phân cho số tự nhiên, rồi viết đơn vị km².'],
      solution: '93,17 : 7 = 13,31. Vậy 93,17 km² : 7 = 13,31 km².',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo thời gian với số đo bằng nó.',
      left: ['5/6 giờ', '7/12 phút', '4/5 thế kỉ'],
      right: ['50 phút', '35 giây', '80 năm', '56 phút'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['1 giờ = 60 phút; 1 phút = 60 giây; 1 thế kỉ = 100 năm.'],
      solution:
        '5/6 giờ = 60 : 6 × 5 = 50 phút. 7/12 phút = 60 : 12 × 7 = 35 giây. 4/5 thế kỉ = 100 : 5 × 4 = 80 năm.',
    },
    {
      type: 'choice',
      prompt: 'Hồ Gươm có diện tích khoảng 0,12 km². Diện tích đó bằng khoảng bao nhiêu héc-ta?',
      options: ['12 ha', '1,2 ha', '120 ha', '0,12 ha'],
      answer: 0,
      hints: ['1 km² = 100 ha. Nhân với 100 thì chuyển dấu phẩy sang phải hai chữ số.'],
      solution: '0,12 km² = 0,12 × 100 ha = 12 ha.',
    },
    {
      type: 'number',
      prompt:
        'Khu đất hình chữ nhật có chiều dài 300 m, chiều rộng bằng 1/3 chiều dài. Diện tích khu đất là bao nhiêu héc-ta?',
      answer: 3,
      unit: 'ha',
      hints: ['Em tìm chiều rộng, tính diện tích theo mét vuông, rồi đổi: 10 000 m² = 1 ha.'],
      solution:
        'Chiều rộng: 300 : 3 = 100 (m). Diện tích: 300 × 100 = 30 000 (m²). 30 000 m² = 3 ha.',
    },
    {
      type: 'number',
      prompt:
        'Khu sinh thái rộng 128 ha. Rừng chiếm 7/8 diện tích, phần còn lại là khu vui chơi. Khu vui chơi rộng bao nhiêu ki-lô-mét vuông?',
      answer: 0.16,
      unit: 'km²',
      hints: ['Em tìm diện tích rừng, lấy 128 ha trừ đi, rồi đổi ra km²: 100 ha = 1 km².'],
      solution:
        'Diện tích rừng: 128 : 8 × 7 = 112 (ha). Khu vui chơi: 128 − 112 = 16 (ha). 16 ha = 16/100 km² = 0,16 km².',
    },
  ],
  takeaways: [
    'Hai đơn vị đo độ dài, khối lượng liền nhau gấp, kém nhau 10 lần.',
    'Hai đơn vị đo diện tích liền nhau gấp, kém nhau 100 lần; 1 ha = 10 000 m², 1 km² = 100 ha.',
    'Viết số đo dưới dạng số thập phân: đổi phần lẻ thành phân số thập phân của đơn vị lớn.',
    'So sánh, cộng, trừ số đo: đổi về cùng một đơn vị đo trước.',
  ],
};
