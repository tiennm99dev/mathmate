/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hiện một thí nghiệm nhiều lần, đếm số lần một khả năng xảy ra rồi viết tỉ số của số lần đó so với tổng số lần thực hiện, ví dụ 9 lần trong 14 lần là 9 : 14 hay 9/14.',
  intro:
    'Mi lấy tất trong hộp 14 lần, có 9 lần được 2 chiếc cùng màu. Em viết tỉ số nào để mô tả điều đó? Em cùng làm thí nghiệm và viết tỉ số nhé!',
  objectives: [
    'Thực hiện thí nghiệm nhiều lần và ghi lại kết quả.',
    'Đếm số lần lặp lại của mỗi khả năng.',
    'Viết tỉ số của số lần lặp lại một khả năng so với tổng số lần thực hiện.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm lấy tất',
      blocks: [
        {
          type: 'p',
          text: 'Mi cho một đôi tất màu đỏ và một đôi tất màu xanh vào hộp. Không nhìn vào hộp, Mi lấy ra 2 chiếc tất, xem màu rồi cho lại vào hộp.',
        },
        {
          type: 'p',
          text: 'Có hai khả năng: lấy được 2 chiếc tất cùng màu, hoặc lấy được 2 chiếc tất khác màu.',
        },
        {
          type: 'table',
          caption: 'Kết quả 14 lần lấy tất của Mi',
          head: ['Khả năng', 'Số lần'],
          rows: [
            ['Lấy được 2 chiếc tất cùng màu', '9'],
            ['Lấy được 2 chiếc tất khác màu', '5'],
          ],
        },
        {
          type: 'p',
          text: 'Tỉ số của số lần lấy được 2 chiếc tất cùng màu so với tổng số lần lấy tất là 9 : 14 hay $\\dfrac{9}{14}$.',
        },
        {
          type: 'p',
          text: 'Tỉ số của số lần lấy được 2 chiếc tất khác màu so với tổng số lần lấy tất là 5 : 14 hay $\\dfrac{5}{14}$.',
        },
      ],
    },
    {
      heading: 'Viết tỉ số mô tả số lần lặp lại',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tỉ số mô tả số lần lặp lại của một khả năng = Số lần khả năng đó xảy ra : Tổng số lần thực hiện.',
        },
        {
          type: 'p',
          text: 'Các bạn lớp 5A quay vòng quay để chọn màu áo: 8 lần màu vàng, 17 lần màu xanh, 5 lần màu đỏ.',
        },
        {
          type: 'p',
          text: 'Tổng số lần quay: 8 + 17 + 5 = 30 (lần).',
        },
        {
          type: 'table',
          head: ['Màu', 'Số lần', 'Tỉ số'],
          rows: [
            ['Vàng', '8', '$\\dfrac{8}{30}$'],
            ['Xanh', '17', '$\\dfrac{17}{30}$'],
            ['Đỏ', '5', '$\\dfrac{5}{30}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Mẫu số của tỉ số luôn là tổng số lần thực hiện. Tử số là số lần khả năng đó xảy ra.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần làm thí nghiệm có thể ra kết quả khác nhau, nên tỉ số em viết có thể khác của bạn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Làm thí nghiệm nhiều lần',
    instruction:
      'Em chọn một thí nghiệm: tung đồng xu, gieo xúc xắc, lấy tất hay quay vòng quay. Bấm "Thử 1 lần", "Thêm 10 lần" hoặc "Thêm 100 lần". Bảng ghi số lần của mỗi khả năng và tỉ số so với tổng số lần. Em xem các tỉ số thay đổi thế nào khi làm thật nhiều lần.',
  },
  examples: [
    {
      problem:
        'Nam tung một đồng xu 20 lần, có 9 lần xuất hiện mặt sấp. Viết tỉ số mô tả số lần xuất hiện mặt sấp và mặt ngửa so với tổng số lần tung.',
      steps: [
        'Số lần xuất hiện mặt ngửa: 20 − 9 = 11 (lần).',
        'Mặt sấp: 9 : 20 hay $\\dfrac{9}{20}$.',
        'Mặt ngửa: 11 : 20 hay $\\dfrac{11}{20}$.',
      ],
      answer: 'Mặt sấp: $\\dfrac{9}{20}$; mặt ngửa: $\\dfrac{11}{20}$.',
    },
    {
      problem:
        'Mai gieo xúc xắc 9 lần: mặt chẵn xuất hiện 3 lần. Nếu mặt chẵn nhiều hơn thì Mai đọc truyện, nếu mặt lẻ nhiều hơn thì Mai làm bánh. Mai sẽ làm gì? Viết tỉ số mô tả số lần xuất hiện mặt chẵn so với tổng số lần gieo.',
      steps: [
        'Số lần xuất hiện mặt lẻ: 9 − 3 = 6 (lần).',
        '6 > 3, mặt lẻ xuất hiện nhiều lần hơn, nên Mai làm bánh.',
        'Tỉ số của số lần xuất hiện mặt chẵn so với tổng số lần gieo: 3 : 9 hay $\\dfrac{3}{9}$.',
      ],
      answer: 'Mai làm bánh cùng bố mẹ. Tỉ số là $\\dfrac{3}{9}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Mi lấy tất 14 lần, có 9 lần được 2 chiếc cùng màu. Viết tỉ số mô tả số lần lấy được 2 chiếc cùng màu so với tổng số lần lấy.',
      answer: [9, 14],
      hints: ['Tử số là số lần lấy được 2 chiếc cùng màu.', 'Mẫu số là tổng số lần lấy tất.'],
      solution: 'Tỉ số là 9 : 14 hay $\\dfrac{9}{14}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cũng 14 lần đó, có 5 lần được 2 chiếc khác màu. Viết tỉ số mô tả số lần lấy được 2 chiếc khác màu so với tổng số lần lấy.',
      answer: [5, 14],
      hints: ['Mẫu số vẫn là 14.'],
      solution: 'Tỉ số là 5 : 14 hay $\\dfrac{5}{14}$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5A quay vòng quay: 8 lần màu vàng, 17 lần màu xanh, 5 lần màu đỏ. Lớp đã quay tất cả bao nhiêu lần?',
      answer: 30,
      unit: 'lần',
      hints: ['Cộng số lần của cả ba màu.'],
      solution: '8 + 17 + 5 = 30 (lần).',
    },
    {
      type: 'fraction',
      prompt:
        'Với kết quả quay ở trên (8 vàng, 17 xanh, 5 đỏ), viết tỉ số mô tả số lần quay được màu xanh so với tổng số lần quay.',
      answer: [17, 30],
      hints: ['Tổng số lần quay là 30.'],
      solution: 'Tỉ số là 17 : 30 hay $\\dfrac{17}{30}$.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tung đồng xu 20 lần, có 9 lần mặt sấp. Tỉ số mô tả số lần xuất hiện mặt ngửa so với tổng số lần tung là:',
      options: ['$\\dfrac{11}{20}$', '$\\dfrac{9}{20}$', '$\\dfrac{9}{11}$', '$\\dfrac{20}{11}$'],
      answer: 0,
      hints: ['Tìm số lần mặt ngửa trước: 20 − 9.', 'Mẫu số là tổng số lần tung.'],
      solution: 'Mặt ngửa xuất hiện 20 − 9 = 11 lần. Tỉ số là $\\dfrac{11}{20}$.',
    },
    {
      type: 'choice',
      prompt:
        'Mai gieo xúc xắc 9 lần, mặt chẵn xuất hiện 3 lần. Mặt chẵn nhiều hơn thì đọc truyện, mặt lẻ nhiều hơn thì làm bánh. Mai sẽ làm gì?',
      options: ['Làm bánh cùng bố mẹ', 'Đọc truyện'],
      answer: 0,
      hints: ['Tính số lần mặt lẻ: 9 − 3.'],
      solution:
        'Mặt lẻ xuất hiện 9 − 3 = 6 lần, nhiều hơn 3 lần mặt chẵn. Mai làm bánh cùng bố mẹ.',
    },
    {
      type: 'fraction',
      prompt:
        'Trong tháng 4 có 30 ngày, Rô-bốt lấy 2 chiếc tất mỗi sáng. Có 22 ngày được 2 chiếc khác nhau. Viết tỉ số mô tả số lần lấy được 2 chiếc tất khác nhau so với số lần lấy tất.',
      answer: [22, 30],
      hints: ['Mỗi ngày lấy một lần, nên có 30 lần lấy tất.'],
      solution: 'Tỉ số là 22 : 30 hay $\\dfrac{22}{30}$.',
    },
    {
      type: 'number',
      prompt:
        'Việt tung đồng xu 20 lần. Tỉ số mô tả số lần xuất hiện mặt sấp so với tổng số lần tung là $\\dfrac{7}{20}$. Có bao nhiêu lần xuất hiện mặt ngửa?',
      answer: 13,
      unit: 'lần',
      hints: [
        'Tử số 7 là số lần xuất hiện mặt sấp.',
        'Lấy tổng số lần tung trừ đi số lần mặt sấp.',
      ],
      solution: 'Có 7 lần mặt sấp trong 20 lần tung. Số lần mặt ngửa: 20 − 7 = 13 (lần).',
    },
  ],
  takeaways: [
    'Làm thí nghiệm nhiều lần, ghi lại số lần xảy ra của mỗi khả năng.',
    'Tỉ số mô tả số lần lặp lại = Số lần khả năng đó xảy ra : Tổng số lần thực hiện.',
    'Ví dụ: 9 lần trong 14 lần được viết là 9 : 14 hay $\\dfrac{9}{14}$.',
  ],
};
