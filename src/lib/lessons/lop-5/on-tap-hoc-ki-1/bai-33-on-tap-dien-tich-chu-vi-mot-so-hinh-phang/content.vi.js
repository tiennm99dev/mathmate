/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập diện tích, chu vi một số hình phẳng: diện tích hình tam giác, hình thang; chu vi và diện tích hình tròn; tìm độ dài đáy, tính diện tích hình ghép và giải bài toán thực tế.',
  intro:
    'Em đã biết tính diện tích hình tam giác, hình thang, hình tròn và chu vi hình tròn. Hôm nay em ôn lại các cách tính đó. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính được diện tích hình tam giác, hình thang.',
    'Tính được chu vi và diện tích hình tròn.',
    'Tìm được độ dài đáy của hình tam giác khi biết diện tích và chiều cao.',
    'Tính được diện tích hình ghép từ các hình đã học.',
    'Giải được bài toán thực tế về chu vi, diện tích.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Các công thức đã học',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Cách tính'],
          rows: [
            ['Diện tích hình tam giác', 'S = a × h : 2'],
            ['Diện tích hình thang', 'S = (a + b) × h : 2'],
            ['Chu vi hình tròn', 'C = d × 3,14 hoặc C = r × 2 × 3,14'],
            ['Diện tích hình tròn', 'S = r × r × 3,14'],
          ],
          caption: 'a, b là độ dài đáy, h là chiều cao, r là bán kính, d là đường kính.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các độ dài phải cùng một đơn vị đo. Diện tích viết với đơn vị vuông: cm², dm², m².',
        },
      ],
    },
    {
      heading: 'Tìm ngược lại và tính hình ghép',
      blocks: [
        {
          type: 'p',
          text: 'Biết diện tích và chiều cao của hình tam giác, em tìm độ dài đáy: a = S × 2 : h.',
        },
        {
          type: 'p',
          text: 'Hình phức tạp: em chia thành các hình đã biết, tính diện tích từng hình rồi cộng lại, hoặc lấy hình lớn trừ đi phần bỏ ra.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai tam giác có chung chiều cao và hai đáy bằng nhau thì có diện tích bằng nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần, nhiều câu có hình vẽ ghi sẵn số đo. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Tứ giác ABCD có góc A và góc C vuông. AB = 33 cm, AD = 56 cm, CB = 16 cm, CD = 63 cm. Tính diện tích tứ giác ABCD.',
      steps: [
        'Kẻ đường chéo BD, chia tứ giác thành hai tam giác vuông ABD và CBD.',
        'Diện tích tam giác ABD: 56 × 33 : 2 = 924 (cm²).',
        'Diện tích tam giác CBD: 63 × 16 : 2 = 504 (cm²).',
        'Diện tích tứ giác: 924 + 504 = 1 428 (cm²).',
      ],
      answer: 'Diện tích tứ giác ABCD là 1 428 cm².',
    },
    {
      problem:
        'Biển cấm đi ngược chiều là hình tròn bán kính 35 cm, ở giữa có hình chữ nhật màu trắng dài 50 cm, rộng 12 cm. Tính diện tích phần màu đỏ.',
      steps: [
        'Diện tích hình tròn: 35 × 35 × 3,14 = 3 846,5 (cm²).',
        'Diện tích hình chữ nhật trắng: 50 × 12 = 600 (cm²).',
        'Phần màu đỏ là hình tròn bỏ đi hình chữ nhật: 3 846,5 − 600 = 3 246,5 (cm²).',
      ],
      answer: 'Diện tích phần màu đỏ là 3 246,5 cm².',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với cách tính của nó.',
      left: [
        'Diện tích hình tam giác',
        'Diện tích hình thang',
        'Chu vi hình tròn',
        'Diện tích hình tròn',
      ],
      right: [
        'đáy × chiều cao : 2',
        '(đáy lớn + đáy bé) × chiều cao : 2',
        'đường kính × 3,14',
        'bán kính × bán kính × 3,14',
        'bán kính × 3,14',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Chu vi hình tròn dùng đường kính; diện tích hình tròn dùng bán kính hai lần.'],
      solution:
        'Diện tích tam giác: đáy × chiều cao : 2. Diện tích hình thang: (đáy lớn + đáy bé) × chiều cao : 2. Chu vi hình tròn: đường kính × 3,14. Diện tích hình tròn: bán kính × bán kính × 3,14.',
    },
    {
      type: 'choice',
      prompt:
        'Hình tam giác ABC có độ dài đáy 3,5 dm, chiều cao 1,6 dm. Diện tích hình tam giác là:',
      options: ['2,8 dm²', '5,6 dm²', '2,3 dm²', '2,8 m²'],
      answer: 0,
      hints: ['Nhân đáy với chiều cao rồi chia cho 2. Nhớ đơn vị đo.'],
      solution: 'S = 3,5 × 1,6 : 2 = 2,8 (dm²).',
    },
    {
      type: 'choice',
      prompt:
        'Hình thang MNPQ có hai đáy dài 36 cm và 14 cm, chiều cao 17 cm. Diện tích hình thang là:',
      options: ['425 cm²', '850 cm²', '187 cm²', '67 cm²'],
      answer: 0,
      hints: ['Cộng hai đáy, nhân với chiều cao, rồi chia cho 2.'],
      solution: 'S = (36 + 14) × 17 : 2 = 50 × 17 : 2 = 425 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác MNP có diện tích 72 dm², chiều cao 9 dm. Tính độ dài đáy NP.',
      answer: 16,
      unit: 'dm',
      hints: ['Đáy = diện tích × 2 : chiều cao.'],
      solution: 'NP = 72 × 2 : 9 = 144 : 9 = 16 (dm).',
    },
    {
      type: 'choice',
      prompt: 'Một tấm thảm hình tròn có bán kính 3 dm. Chu vi tấm thảm là:',
      options: ['18,84 dm', '9,42 dm', '28,26 dm', '37,68 dm'],
      answer: 0,
      hints: ['Chu vi hình tròn bằng bán kính × 2 × 3,14.'],
      solution: 'C = 3 × 2 × 3,14 = 18,84 (dm).',
    },
    {
      type: 'number',
      prompt: 'Tấm thảm hình tròn bán kính 3 dm có diện tích bao nhiêu đề-xi-mét vuông?',
      answer: 28.26,
      unit: 'dm²',
      hints: ['Diện tích hình tròn bằng bán kính × bán kính × 3,14.'],
      solution: 'S = 3 × 3 × 3,14 = 28,26 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Bánh xe lăn có đường kính 50 cm. Bánh xe lăn 1 000 vòng thì đi được bao nhiêu mét?',
      answer: 1570,
      unit: 'm',
      hints: ['Mỗi vòng, xe đi được một đoạn bằng chu vi bánh xe. Đổi 50 cm = 0,5 m.'],
      solution: 'Chu vi bánh xe: 0,5 × 3,14 = 1,57 (m). Lăn 1 000 vòng: 1,57 × 1 000 = 1 570 (m).',
    },
    {
      type: 'number',
      prompt: 'Mặt bàn hình tròn có đường kính 1,4 m. Tính diện tích mặt bàn (theo mét vuông).',
      answer: 1.5386,
      unit: 'm²',
      hints: ['Em tìm bán kính trước: bán kính bằng đường kính chia cho 2.'],
      solution: 'Bán kính: 1,4 : 2 = 0,7 (m). S = 0,7 × 0,7 × 3,14 = 1,5386 (m²).',
    },
    {
      type: 'number',
      prompt:
        'Một hồ nước có dạng nửa hình tròn bán kính 60 m. Diện tích mặt hồ là bao nhiêu mét vuông?',
      answer: 5652,
      unit: 'm²',
      hints: ['Em tính diện tích cả hình tròn, rồi chia cho 2.'],
      solution:
        'Diện tích hình tròn: 60 × 60 × 3,14 = 11 304 (m²). Nửa hình tròn: 11 304 : 2 = 5 652 (m²).',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác ABC có M là trung điểm của cạnh BC. So sánh diện tích tam giác ABM và tam giác ACM.',
      options: ['Bằng nhau', 'ABM lớn hơn', 'ABM bé hơn'],
      answer: 0,
      hints: ['Hai tam giác có chung chiều cao kẻ từ A. Hai đáy BM và MC thế nào?'],
      solution:
        'Hai tam giác có chung chiều cao kẻ từ A, và BM = MC. Vậy diện tích tam giác ABM bằng diện tích tam giác ACM.',
    },
    {
      type: 'number',
      prompt:
        'Thửa ruộng hình thang có hai đáy 56 m và 34 m, chiều cao 20 m. Cứ 100 m² thu được 70 kg thóc. Thửa ruộng thu được bao nhiêu ki-lô-gam thóc?',
      answer: 630,
      unit: 'kg',
      hints: ['Em tính diện tích thửa ruộng, rồi xem diện tích đó gấp 100 m² bao nhiêu lần.'],
      solution:
        'Diện tích: (56 + 34) × 20 : 2 = 900 (m²). 900 m² gấp 100 m² là 900 : 100 = 9 lần. Số thóc: 70 × 9 = 630 (kg).',
    },
    {
      type: 'number',
      prompt:
        'Mảnh đất hình thang vuông có chiều cao 12 m, đáy bé 18 m, đáy lớn 24 m. Bác Tư hiến một phần đất hình tam giác có đáy 5 m, chiều cao 12 m để mở rộng đường. Diện tích đất còn lại là bao nhiêu mét vuông?',
      answer: 222,
      unit: 'm²',
      hints: ['Em tính diện tích hình thang, diện tích tam giác, rồi lấy hiệu.'],
      solution:
        'Diện tích hình thang: (18 + 24) × 12 : 2 = 252 (m²). Diện tích tam giác: 5 × 12 : 2 = 30 (m²). Còn lại: 252 − 30 = 222 (m²).',
    },
  ],
  takeaways: [
    'Tam giác: S = đáy × chiều cao : 2. Hình thang: S = (đáy lớn + đáy bé) × chiều cao : 2.',
    'Hình tròn: C = đường kính × 3,14; S = bán kính × bán kính × 3,14.',
    'Muốn tìm đáy tam giác: lấy diện tích nhân 2 rồi chia cho chiều cao.',
    'Hình ghép: chia thành các hình đã biết, rồi cộng hoặc trừ diện tích.',
  ],
};
