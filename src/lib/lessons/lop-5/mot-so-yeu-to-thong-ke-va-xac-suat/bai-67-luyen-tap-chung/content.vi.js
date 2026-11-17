/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề một số yếu tố thống kê và xác suất: sắp xếp và phân loại số liệu, đọc biểu đồ hình quạt tròn, tính số lượng từ tỉ số phần trăm và viết tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện.',
  intro:
    'Bãi đỗ xe có bao nhiêu xe đạp? Rô-bốt lấy được tất khác nhau mấy lần trong tháng? Em ôn lại cả chủ đề qua các bài tập nhé!',
  objectives: [
    'Đọc biểu đồ hình quạt tròn và tính số lượng của từng phần.',
    'Viết tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện.',
    'Sắp xếp, phân loại số liệu và nhận biết sự kiện chắc chắn, có thể, không thể xảy ra.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'list',
          items: [
            'Thu thập số liệu, phân loại vào bảng, sắp xếp từ bé đến lớn hoặc từ lớn đến bé.',
            'Biểu đồ hình quạt tròn: cả hình tròn là 100%. Số lượng một phần = Tổng số × Tỉ số phần trăm : 100.',
            'Tỉ số mô tả số lần lặp lại = Số lần sự kiện xảy ra : Tổng số lần thực hiện.',
          ],
        },
      ],
    },
    {
      heading: 'Lấy tất trong hộp',
      blocks: [
        {
          type: 'p',
          text: 'Hộp có 2 chiếc tất đỏ và 2 chiếc tất vàng. Nhắm mắt lấy ra vài chiếc.',
        },
        {
          type: 'p',
          text: 'Lấy 2 chiếc: có thể được 2 chiếc cùng màu, cũng có thể được 1 đỏ và 1 vàng. Ta không chắc chắn lấy được 2 chiếc cùng màu.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chỉ có 2 màu. Lấy 3 chiếc thì chắc chắn có 2 chiếc cùng màu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi lượt có 7 câu, mỗi câu một dạng bài của chủ đề. Em chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết lượt, em xem dạng nào cần ôn thêm và bấm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem:
        'Bãi đỗ xe có 300 xe. Biểu đồ hình quạt tròn cho biết: xe máy 75%, xe đạp 15%, ô tô 10%. Loại xe nào nhiều nhất? Bãi có bao nhiêu xe đạp?',
      steps: [
        'So sánh: 75% > 15% > 10%. Xe máy nhiều nhất.',
        'Số xe đạp: 300 × 15 : 100 = 45 (xe).',
      ],
      answer: 'Xe máy nhiều nhất. Bãi có 45 xe đạp.',
    },
    {
      problem:
        'Tháng 4 có 30 ngày. Mỗi sáng Rô-bốt lấy 2 chiếc tất mà không nhìn. Có 22 ngày Rô-bốt lấy được 2 chiếc khác nhau. Viết tỉ số mô tả số lần lấy được 2 chiếc tất khác nhau so với số lần lấy tất.',
      steps: [
        'Mỗi ngày lấy một lần, nên có 30 lần lấy tất.',
        'Số lần lấy được 2 chiếc khác nhau là 22.',
        'Tỉ số là 22 : 30 hay $\\dfrac{22}{30}$.',
      ],
      answer: '$\\dfrac{22}{30}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Biểu đồ các loại xe trong bãi: xe máy 75%, xe đạp 15%, ô tô 10%. Loại xe nào nhiều nhất?',
      options: ['Xe máy', 'Xe đạp', 'Ô tô'],
      answer: 0,
      hints: ['Phần nào có tỉ số phần trăm lớn nhất?'],
      solution: '75% lớn nhất, nên xe máy nhiều nhất.',
    },
    {
      type: 'number',
      prompt: 'Với biểu đồ trên, số ô tô chiếm bao nhiêu phần trăm số xe trong bãi?',
      answer: 10,
      unit: '%',
      hints: ['Đọc số ghi trên hình quạt "Ô tô".'],
      solution: 'Ô tô chiếm 10% số xe.',
    },
    {
      type: 'number',
      prompt: 'Bãi có tất cả 300 xe, xe đạp chiếm 15%. Bãi có bao nhiêu xe đạp?',
      answer: 45,
      unit: 'xe',
      hints: ['Số lượng = Tổng số × Tỉ số phần trăm : 100.'],
      solution: '300 × 15 : 100 = 45 (xe).',
    },
    {
      type: 'fraction',
      prompt:
        'Tháng 4 (30 ngày), Rô-bốt lấy được 2 chiếc tất khác nhau 22 ngày. Viết tỉ số mô tả số lần lấy được 2 chiếc tất khác nhau so với số lần lấy tất.',
      answer: [22, 30],
      hints: ['Mẫu số là số lần lấy tất trong tháng.'],
      solution: 'Tỉ số là 22 : 30 hay $\\dfrac{22}{30}$.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có 2 chiếc tất đỏ và 2 chiếc tất vàng. Lấy ra 2 chiếc bất kì. Em có chắc chắn lấy được 2 chiếc cùng màu không?',
      options: ['Không chắc chắn', 'Chắc chắn'],
      answer: 0,
      hints: ['Có thể lấy được 1 chiếc đỏ và 1 chiếc vàng không?'],
      solution: 'Có thể lấy được 1 đỏ và 1 vàng, nên không chắc chắn được 2 chiếc cùng màu.',
    },
    {
      type: 'choice',
      prompt:
        'Cũng hộp đó, lấy ra 3 chiếc bất kì. Em có chắc chắn lấy được 2 chiếc cùng màu không?',
      options: ['Chắc chắn', 'Không chắc chắn'],
      answer: 0,
      hints: ['Chỉ có 2 màu. 3 chiếc thì có thể đều khác màu nhau không?'],
      solution: 'Chỉ có 2 màu, nên trong 3 chiếc luôn có 2 chiếc cùng màu. Chắc chắn.',
    },
    {
      type: 'number',
      prompt: 'Rô-bốt ngủ 37,5% thời gian của một ngày (24 giờ). Rô-bốt ngủ bao nhiêu giờ?',
      answer: 9,
      unit: 'giờ',
      hints: ['Tính 24 × 37,5 : 100.'],
      solution: '24 × 37,5 : 100 = 9 (giờ).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp cân nặng các bạn theo thứ tự từ lớn đến bé.',
      items: ['32,5 kg', '35 kg', '29,5 kg', '32 kg'],
      answer: [1, 0, 3, 2],
      hints: ['Tìm số lớn nhất trước.'],
      solution: '35 kg > 32,5 kg > 32 kg > 29,5 kg.',
    },
    {
      type: 'number',
      prompt:
        'Thành tích nhảy xa: 2,6 m; 2,15 m; 3,1 m; 2,45 m; 2,8 m; 2,35 m. Có bao nhiêu học viên nhảy dưới 2,5 m?',
      answer: 3,
      unit: 'học viên',
      hints: ['So sánh từng số với 2,5 m.'],
      solution: 'Các số dưới 2,5 m: 2,15 m; 2,45 m; 2,35 m. Có 3 học viên.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo xúc xắc 25 lần: mặt chẵn xuất hiện 12 lần. Viết tỉ số mô tả số lần xuất hiện mặt lẻ so với tổng số lần gieo.',
      answer: [13, 25],
      hints: ['Số lần mặt lẻ: 25 − 12.'],
      solution: 'Mặt lẻ xuất hiện 25 − 12 = 13 lần. Tỉ số là 13 : 25 hay $\\dfrac{13}{25}$.',
    },
  ],
  takeaways: [
    'Đọc biểu đồ hình quạt tròn: hình quạt to hơn thì phần đó nhiều hơn; cả hình tròn là 100%.',
    'Số lượng một phần = Tổng số × Tỉ số phần trăm : 100.',
    'Tỉ số số lần lặp lại = Số lần xảy ra : Tổng số lần thực hiện.',
  ],
};
