/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành ước lượng trong tính toán: làm tròn các số để tính nhẩm nhanh kết quả gần đúng, rồi dùng ước lượng để kiểm tra kết quả có hợp lí không.',
  intro:
    'Đi siêu thị, em mang theo 100 000 đồng. Em có đủ tiền mua mấy món đồ không? Em không cần tính đúng từng đồng, chỉ cần ước lượng thật nhanh!',
  objectives: [
    'Làm tròn số để ước lượng tổng, hiệu, tích, thương.',
    'Dùng ước lượng để kiểm tra một kết quả có hợp lí không.',
    'Vận dụng ước lượng khi mua sắm, đi chơi.',
  ],
  sections: [
    {
      heading: 'Làm tròn để ước lượng',
      blocks: [
        {
          type: 'p',
          text: 'Muốn ước lượng, em làm tròn các số rồi tính nhẩm với số tròn.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Làm tròn', 'Ước lượng'],
          rows: [
            ['7 960 + 1 980', '8 000 + 2 000', 'Khoảng 10 000'],
            ['5 985 − 3 897', '6 000 − 4 000', 'Khoảng 2 000'],
            ['39 × 21', '40 × 20', 'Khoảng 800'],
            ['804 : 41', '800 : 40', 'Khoảng 20'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Ước lượng: làm tròn các số cho dễ tính, rồi tính nhẩm. Kết quả ước lượng gần với kết quả đúng.',
        },
      ],
    },
    {
      heading: 'Kiểm tra kết quả hợp lí',
      blocks: [
        {
          type: 'p',
          text: 'Bạn Nam tính 48 × 21 = 144. Em ước lượng: 50 × 20 = 1 000. Kết quả 144 quá bé, nên Nam tính sai.',
        },
        {
          type: 'p',
          text: 'Nam quên viết lùi tích riêng thứ hai. Tính đúng: 48 × 21 = 1 008, gần 1 000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo',
          text: 'Làm tròn cả hai thừa số lên thì tích ước lượng lớn hơn tích đúng. Làm tròn cả hai thừa số xuống thì tích ước lượng bé hơn tích đúng.',
        },
      ],
    },
    {
      heading: 'Dự án: Ước lượng tiền đi siêu thị',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em ước lượng tổng tiền mua đồ trước khi trả, rồi so với số tiền đúng trên hoá đơn.',
        },
        {
          type: 'list',
          items: [
            'Chuẩn bị: một tờ giấy, bút chì, đi siêu thị hoặc chợ cùng bố mẹ (hoặc dùng tờ quảng cáo có giá).',
            'Em chọn 4 hoặc 5 món đồ và ghi giá của từng món.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm tròn giá mỗi món đến hàng nghìn.',
            'Cộng nhẩm các số đã làm tròn để được tổng ước lượng.',
            'Xem hoá đơn (hoặc tính đúng) để có tổng tiền thật.',
            'So sánh: tổng ước lượng hơn hay kém tổng thật bao nhiêu?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: bảng giá, tổng ước lượng, tổng thật và chênh lệch. Bạn nào ước lượng gần nhất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Ước lượng nhanh',
    instruction:
      'Mỗi câu, em làm tròn các số rồi chọn kết quả ước lượng. Xong mỗi câu, em xem kết quả đúng để so sánh. Sai lần đầu, em có gợi ý và được thử lại.',
  },
  examples: [
    {
      problem: 'Ước lượng kết quả: 7 960 + 1 980.',
      steps: [
        'Làm tròn đến hàng nghìn: 7 960 thành 8 000, 1 980 thành 2 000.',
        '8 000 + 2 000 = 10 000.',
        'Kết quả đúng: 7 960 + 1 980 = 9 940, gần 10 000.',
      ],
      answer: '7 960 + 1 980 được khoảng 10 000.',
    },
    {
      problem: 'Đúng hay sai: 89 × 26 > 2 700?',
      steps: [
        'Làm tròn lên đến hàng chục: 89 thành 90, 26 thành 30.',
        '90 × 30 = 2 700. Cả hai số đều được làm tròn lên, nên 89 × 26 bé hơn 2 700.',
        'Kiểm tra: 89 × 26 = 2 314.',
      ],
      answer: 'Sai.',
    },
    {
      problem: 'Đúng hay sai: 9 170 : 30 < 300?',
      steps: [
        'Làm tròn xuống số bị chia: 9 170 thành 9 000.',
        '9 000 : 30 = 300. Số bị chia thật lớn hơn 9 000, nên thương lớn hơn 300.',
        'Kiểm tra: 9 170 : 30 = 305 (dư 20).',
      ],
      answer: 'Sai.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '7 960 + 1 980 được khoảng bao nhiêu?',
      options: ['10 000', '9 000', '11 000', '1 000'],
      answer: 0,
      hints: ['Làm tròn mỗi số đến hàng nghìn.'],
      solution: '8 000 + 2 000 = 10 000. Kết quả đúng là 9 940.',
    },
    {
      type: 'choice',
      prompt: '5 985 − 3 897 được khoảng bao nhiêu?',
      options: ['2 000', '3 000', '1 000', '9 000'],
      answer: 0,
      hints: ['5 985 gần 6 000, 3 897 gần 4 000.'],
      solution: '6 000 − 4 000 = 2 000. Kết quả đúng là 2 088.',
    },
    {
      type: 'choice',
      prompt: '89 × 26 > 2 700. Đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['Làm tròn lên cả hai thừa số: 90 × 30.'],
      solution:
        '90 × 30 = 2 700. Cả hai thừa số đều làm tròn lên, nên 89 × 26 < 2 700. Thật vậy, 89 × 26 = 2 314.',
    },
    {
      type: 'choice',
      prompt: '9 170 : 30 < 300. Đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['9 000 : 30 = 300, mà 9 170 lớn hơn 9 000.'],
      solution: '9 170 > 9 000 nên 9 170 : 30 > 300. Thật vậy, 9 170 : 30 = 305 (dư 20).',
    },
    {
      type: 'choice',
      prompt: 'Kết quả nào của 48 × 21 là hợp lí?',
      options: ['1 008', '144', '10 080'],
      answer: 0,
      hints: ['Ước lượng: 50 × 20.'],
      solution: '50 × 20 = 1 000, nên tích phải gần 1 000. 48 × 21 = 1 008.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả ước lượng của nó.',
      left: ['39 × 21', '52 × 48', '61 × 29', '19 × 71'],
      right: ['800', '2 500', '1 800', '1 400', '8 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Làm tròn mỗi thừa số đến hàng chục.', '52 × 48: 50 × 50.'],
      solution:
        '40 × 20 = 800 (đúng: 819). 50 × 50 = 2 500 (đúng: 2 496). 60 × 30 = 1 800 (đúng: 1 769). 20 × 70 = 1 400 (đúng: 1 349).',
    },
    {
      type: 'choice',
      prompt: '804 : 41 được khoảng bao nhiêu?',
      options: ['20', '2', '200'],
      answer: 0,
      hints: ['804 gần 800, 41 gần 40.'],
      solution: '800 : 40 = 20. Kết quả đúng: 804 : 41 = 19 (dư 25), gần 20.',
    },
    {
      type: 'choice',
      prompt:
        'Em có 100 000 đồng. Em muốn mua bút giá 18 500 đồng, vở giá 21 000 đồng và cặp giá 39 900 đồng. Em có đủ tiền không?',
      options: ['Đủ tiền', 'Không đủ tiền'],
      answer: 0,
      hints: ['Làm tròn giá mỗi món đến hàng nghìn rồi cộng.'],
      solution:
        '19 000 + 21 000 + 40 000 = 80 000, bé hơn 100 000 nhiều. Em đủ tiền. Tổng đúng là 79 400 đồng.',
    },
  ],
  takeaways: [
    'Muốn ước lượng, em làm tròn các số rồi tính nhẩm.',
    'Ước lượng giúp em kiểm tra kết quả có hợp lí không.',
  ],
};
