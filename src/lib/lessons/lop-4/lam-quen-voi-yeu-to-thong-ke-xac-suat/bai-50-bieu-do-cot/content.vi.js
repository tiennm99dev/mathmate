/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu đồ cột: mỗi cột biểu diễn một số liệu, cột cao hơn biểu diễn số lớn hơn. Đọc biểu đồ cột và vẽ thêm cột từ bảng số liệu.',
  intro:
    'Mai hỏi các bạn trong nhóm thích môn thể thao nào nhất rồi ghi vào bảng. Rô-bốt vẽ các số liệu ấy thành những cột cao thấp khác nhau. Em cùng đọc và vẽ biểu đồ cột nhé!',
  objectives: [
    'Nhận biết biểu đồ cột: tên các cột, số ở trục bên trái, số ở đỉnh cột.',
    'Đọc và mô tả số liệu trên biểu đồ cột.',
    'Vẽ thêm cột vào biểu đồ từ bảng số liệu.',
  ],
  sections: [
    {
      heading: 'Biểu đồ cột',
      blocks: [
        {
          type: 'table',
          caption: 'Môn thể thao yêu thích của nhóm Mai',
          head: ['Môn thể thao', 'Bóng đá', 'Bóng rổ', 'Bơi'],
          rows: [['Số bạn', '4', '6', '2']],
        },
        { type: 'p', text: 'Rô-bốt vẽ biểu đồ cột biểu diễn bảng số liệu trên.' },
        { type: 'widget', name: 'bieu-do-mau' },
        {
          type: 'list',
          items: [
            'Hàng dưới ghi tên các môn thể thao.',
            'Các số ở bên trái chỉ số bạn.',
            'Mỗi cột biểu diễn số bạn thích môn thể thao đó.',
            'Số ghi ở đỉnh cột là số bạn của cột đó.',
          ],
        },
      ],
    },
    {
      heading: 'Đọc biểu đồ cột',
      blocks: [
        {
          type: 'p',
          text: 'Biểu đồ cho biết: 4 bạn thích bóng đá, 6 bạn thích bóng rổ, 2 bạn thích bơi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cột cao hơn biểu diễn số lớn hơn. Cột thấp hơn biểu diễn số bé hơn.',
        },
        {
          type: 'p',
          text: 'Cột Bóng rổ cao nhất: bóng rổ được nhiều bạn thích nhất. Cột Bơi thấp nhất: bơi được ít bạn thích nhất.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Nếu đỉnh cột không ghi số, em dóng ngang từ đỉnh cột sang các số ở bên trái để đọc.',
        },
      ],
    },
    {
      heading: 'Vẽ thêm cột',
      blocks: [
        { type: 'p', text: 'Muốn vẽ thêm một cột từ bảng số liệu, em làm như sau.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc số liệu của cột cần vẽ trong bảng.',
            'Tìm số đó ở các số bên trái biểu đồ.',
            'Vẽ cột cao đến đúng vạch của số đó.',
            'Ghi số ở đỉnh cột.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các cột rộng bằng nhau và đều đứng trên hàng dưới cùng. Chỉ chiều cao của cột thay đổi theo số liệu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ thêm cột cho biểu đồ',
    instruction:
      'Em chọn một bảng số liệu. Kéo đỉnh từng cột lên hoặc xuống (hoặc chọn cột rồi bấm phím mũi tên) cho cột cao đúng bằng số trong bảng. Vẽ đủ các cột, em chạm "Đọc biểu đồ" và trả lời câu hỏi.',
  },
  examples: [
    {
      problem:
        'Biểu đồ cột cho biết số sách khối Bốn góp cho thư viện: 4A 60 cuốn, 4B 52 cuốn, 4C 80 cuốn, 4D 68 cuốn, 4E 40 cuốn. Lớp nào góp nhiều nhất, ít nhất? Có bao nhiêu lớp góp nhiều hơn 50 cuốn?',
      steps: [
        'Cột 4C cao nhất (80 cuốn). Lớp 4C góp nhiều sách nhất.',
        'Cột 4E thấp nhất (40 cuốn). Lớp 4E góp ít sách nhất.',
        'Các cột lớn hơn 50 là 4A (60), 4B (52), 4C (80), 4D (68).',
      ],
      answer: 'Lớp 4C góp nhiều nhất, lớp 4E góp ít nhất. Có 4 lớp góp nhiều hơn 50 cuốn.',
    },
    {
      problem:
        'Số học sinh đến thư viện mượn sách từ thứ Hai đến thứ Sáu là 35, 50, 50, 70, 115. Biểu đồ mới có cột thứ Hai và thứ Ba. Em vẽ thêm các cột còn lại. Những ngày nào có số học sinh bằng nhau? Trung bình mỗi ngày có bao nhiêu học sinh?',
      steps: [
        'Vẽ cột thứ Tư cao đến 50, cột thứ Năm cao đến 70, cột thứ Sáu cao đến 115.',
        'Cột thứ Ba và cột thứ Tư cao bằng nhau (cùng 50 học sinh).',
        'Trung bình: (35 + 50 + 50 + 70 + 115) : 5 = 320 : 5 = 64 (học sinh).',
      ],
      answer:
        'Thứ Ba và thứ Tư có số học sinh bằng nhau. Trung bình mỗi ngày có 64 học sinh mượn sách.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Biểu đồ môn thể thao yêu thích: Bóng đá 4, Bóng rổ 6, Bơi 2. Có bao nhiêu bạn thích bóng rổ?',
      options: ['6 bạn', '4 bạn', '2 bạn', '12 bạn'],
      answer: 0,
      hints: ['Em tìm cột Bóng rổ rồi đọc số ở đỉnh cột.'],
      solution: 'Đỉnh cột Bóng rổ ghi 6. Có 6 bạn thích bóng rổ.',
    },
    {
      type: 'choice',
      prompt: 'Trên biểu đồ môn thể thao yêu thích, cột nào thấp nhất?',
      options: ['Bơi', 'Bóng đá', 'Bóng rổ'],
      answer: 0,
      hints: ['Cột thấp nhất biểu diễn số bé nhất trong 4, 6, 2.'],
      solution: 'Số bé nhất là 2, của môn Bơi. Cột Bơi thấp nhất.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ sách góp: 4A 60 cuốn, 4B 52 cuốn, 4C 80 cuốn, 4D 68 cuốn, 4E 40 cuốn. Có bao nhiêu lớp góp nhiều hơn 50 cuốn sách?',
      answer: 4,
      unit: 'lớp',
      hints: ['Em tìm các cột có số lớn hơn 50 rồi đếm.'],
      solution: '60, 52, 80 và 68 đều lớn hơn 50; chỉ 40 bé hơn 50. Có 4 lớp.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ số ngày có mưa: tháng 1 có 20 ngày, tháng 2 có 25 ngày, tháng 3 có 15 ngày. Tháng 2 mưa nhiều hơn tháng 1 bao nhiêu ngày?',
      answer: 5,
      unit: 'ngày',
      hints: ['Nhiều hơn bao nhiêu: em lấy số lớn trừ số bé.'],
      solution: '25 − 20 = 5. Tháng 2 mưa nhiều hơn tháng 1 là 5 ngày.',
    },
    {
      type: 'number',
      prompt:
        'Số ngày có mưa trong ba tháng: 20, 25, 15. Trung bình mỗi tháng có bao nhiêu ngày mưa?',
      answer: 20,
      unit: 'ngày',
      hints: ['Em cộng số ngày mưa của ba tháng rồi chia cho 3.'],
      solution: '(20 + 25 + 15) : 3 = 60 : 3 = 20 (ngày).',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ quãng đường Rô-bốt chạy trong 5 ngày: 700 m, 800 m, 1 100 m, 1 400 m, 1 700 m. Trung bình mỗi ngày Rô-bốt chạy bao nhiêu mét?',
      answer: 1140,
      unit: 'm',
      hints: ['Em cộng quãng đường của 5 ngày.', 'Tổng là 5 700 m. Em chia cho 5.'],
      solution: '(700 + 800 + 1 100 + 1 400 + 1 700) : 5 = 5 700 : 5 = 1 140 (m).',
    },
    {
      type: 'choice',
      prompt:
        'Quãng đường Rô-bốt chạy: 700 m, 800 m, 1 100 m, 1 400 m, 1 700 m. Mỗi ngày Rô-bốt chạy thế nào so với ngày trước đó?',
      options: ['Dài hơn ngày trước', 'Ngắn hơn ngày trước', 'Bằng ngày trước'],
      answer: 0,
      hints: ['Trên biểu đồ, các cột cao dần hay thấp dần?'],
      solution:
        '700 < 800 < 1 100 < 1 400 < 1 700. Các cột cao dần: ngày sau chạy dài hơn ngày trước.',
    },
    {
      type: 'multi',
      prompt:
        'Rạp phim bán được từ thứ Hai đến Chủ nhật: 285, 540, 2 150, 410, 1 105, 1 200, 1 610 vé. Chọn các ngày bán được nhiều hơn 1 000 vé.',
      options: ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'],
      answers: [2, 4, 5, 6],
      hints: ['Em so sánh từng số với 1 000.', 'Số có bốn chữ số thì lớn hơn 1 000.'],
      solution:
        'Thứ Tư 2 150 vé, thứ Sáu 1 105 vé, thứ Bảy 1 200 vé, Chủ nhật 1 610 vé đều nhiều hơn 1 000 vé.',
    },
    {
      type: 'choice',
      prompt:
        'Rạp phim bán được từ thứ Hai đến Chủ nhật: 285, 540, 2 150, 410, 1 105, 1 200, 1 610 vé. Trên biểu đồ, cột của ngày nào cao nhất?',
      options: ['Thứ Tư', 'Chủ nhật', 'Thứ Bảy', 'Thứ Hai'],
      answer: 0,
      hints: ['Cột cao nhất biểu diễn số lớn nhất.'],
      solution: 'Số lớn nhất là 2 150, của thứ Tư. Cột thứ Tư cao nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Số học sinh mượn sách từ thứ Hai đến thứ Sáu: 35, 50, 50, 70, 115. Hai cột nào cao bằng nhau?',
      options: [
        'Thứ Ba và thứ Tư',
        'Thứ Hai và thứ Ba',
        'Thứ Năm và thứ Sáu',
        'Thứ Hai và thứ Sáu',
      ],
      answer: 0,
      hints: ['Hai cột cao bằng nhau biểu diễn hai số bằng nhau.'],
      solution: 'Thứ Ba và thứ Tư đều có 50 học sinh, nên hai cột đó cao bằng nhau.',
    },
  ],
  takeaways: [
    'Biểu đồ cột: hàng dưới ghi tên, các số bên trái chỉ số liệu, mỗi cột biểu diễn một số liệu.',
    'Cột cao hơn biểu diễn số lớn hơn, cột thấp hơn biểu diễn số bé hơn.',
    'Vẽ thêm cột: tìm số trong bảng, vẽ cột cao đến vạch của số đó, ghi số ở đỉnh cột.',
  ],
};
