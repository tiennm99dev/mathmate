/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số lần xuất hiện của một sự kiện: nêu các sự kiện có thể xảy ra, làm thí nghiệm nhiều lần, ghi lại bằng bảng kiểm đếm, rồi đếm và so sánh số lần xuất hiện của các sự kiện.',
  intro:
    'Tung một đồng xu, em được mặt sấp hay mặt ngửa? Tung 20 lần thì mỗi mặt xuất hiện mấy lần? Em cùng làm thí nghiệm và kiểm đếm nhé!',
  objectives: [
    'Nêu được các sự kiện có thể xảy ra khi làm một thí nghiệm.',
    'Ghi lại kết quả nhiều lần thử bằng bảng kiểm đếm.',
    'Đếm và so sánh số lần xuất hiện của các sự kiện.',
  ],
  sections: [
    {
      heading: 'Các sự kiện có thể xảy ra',
      blocks: [
        {
          type: 'p',
          text: 'Trong hộp có 3 quả bóng xanh và 1 quả bóng vàng. Rô-bốt lấy ra 1 quả bóng và xem màu.',
        },
        {
          type: 'list',
          items: ['Rô-bốt có thể lấy được bóng xanh.', 'Rô-bốt có thể lấy được bóng vàng.'],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mỗi kết quả có thể xảy ra như "lấy được bóng xanh" gọi là một sự kiện.',
        },
        {
          type: 'p',
          text: 'Tung một đồng xu có hai sự kiện có thể xảy ra: xuất hiện mặt sấp (S) hoặc xuất hiện mặt ngửa (N).',
        },
      ],
    },
    {
      heading: 'Kiểm đếm số lần xuất hiện',
      blocks: [
        {
          type: 'p',
          text: 'Hai bạn quay một vòng quay có phần màu đỏ và phần màu vàng 20 lần. Mỗi lần quay, các bạn gạch một vạch vào bảng kiểm đếm.',
        },
        {
          type: 'table',
          caption: 'Bảng kiểm đếm 20 lần quay',
          head: ['Mũi tên dừng ở', 'Kiểm đếm', 'Số lần'],
          rows: [
            ['Phần màu đỏ', '1 bó 5 vạch và 4 vạch', '9'],
            ['Phần màu vàng', '2 bó 5 vạch và 1 vạch', '11'],
          ],
        },
        {
          type: 'p',
          text: 'Có 9 lần mũi tên dừng ở phần màu đỏ và 11 lần dừng ở phần màu vàng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số lần mũi tên dừng ở phần màu đỏ là số lần xuất hiện của sự kiện "mũi tên dừng ở phần màu đỏ". Đếm số vạch trong bảng kiểm đếm để biết số lần xuất hiện.',
        },
        {
          type: 'p',
          text: '9 + 11 = 20, đúng bằng số lần quay. Vì 11 > 9, sự kiện mũi tên dừng ở phần màu vàng xuất hiện nhiều lần hơn.',
        },
      ],
    },
    {
      heading: 'Thí nghiệm tung đồng xu',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tung đồng xu, xem mặt nào ở trên.',
            'Gạch một vạch vào hàng của mặt đó trong bảng kiểm đếm.',
            'Làm như vậy nhiều lần.',
            'Đếm số vạch mỗi hàng để biết số lần xuất hiện của mặt sấp, mặt ngửa.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Gạch 4 vạch đứng, vạch thứ năm gạch chéo thành một bó. Đếm theo bó 5 cho nhanh.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mỗi lần thử có thể ra kết quả khác nhau. Hai bạn cùng tung 20 lần có thể đếm được số lần khác nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tung đồng xu và kiểm đếm',
    instruction:
      'Em chọn một trò chơi: tung đồng xu, lấy bóng, lấy bút hay gieo xúc xắc. Bấm nút để thử 1 lần hoặc 10 lần. Bảng kiểm đếm tự gạch vạch. Em xem sự kiện nào xuất hiện nhiều lần hơn.',
  },
  examples: [
    {
      problem:
        'Nam gieo một xúc xắc 30 lần và ghi lại: mặt 1 chấm 4 lần, 2 chấm 6 lần, 3 chấm 5 lần, 4 chấm 3 lần, 5 chấm 7 lần, 6 chấm 5 lần. Mặt 5 chấm xuất hiện bao nhiêu lần? Mặt nào xuất hiện ít lần nhất?',
      steps: [
        'Tìm hàng mặt 5 chấm: 7 lần.',
        'So sánh 4, 6, 5, 3, 7, 5: số bé nhất là 3, ở mặt 4 chấm.',
        'Kiểm tra: 4 + 6 + 5 + 3 + 7 + 5 = 30, đúng bằng số lần gieo.',
      ],
      answer: 'Mặt 5 chấm xuất hiện 7 lần. Mặt 4 chấm xuất hiện ít lần nhất.',
    },
    {
      problem:
        'Túi có 2 chiếc bút xanh và 1 chiếc bút vàng. Mai lấy ra 2 chiếc bút, xem màu rồi trả lại túi. Làm 20 lần, có 6 lần được 2 bút cùng màu. Nêu các sự kiện có thể xảy ra và so sánh số lần xuất hiện.',
      steps: [
        'Các sự kiện: lấy được 2 bút xanh (cùng màu), hoặc 1 bút xanh và 1 bút vàng (khác màu).',
        'Số lần lấy được 2 bút khác màu: 20 − 6 = 14 (lần).',
        'So sánh: 14 > 6.',
      ],
      answer: 'Sự kiện lấy được 2 bút khác màu xuất hiện nhiều lần hơn (14 lần so với 6 lần).',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Hộp có 3 quả bóng xanh và 1 quả bóng vàng. Lấy ra 1 quả bóng. Chọn các sự kiện có thể xảy ra.',
      options: ['Lấy được bóng xanh', 'Lấy được bóng vàng', 'Lấy được bóng đỏ'],
      answers: [0, 1],
      hints: ['Trong hộp có những màu bóng nào?'],
      solution: 'Hộp chỉ có bóng xanh và bóng vàng, nên có thể lấy được bóng xanh hoặc bóng vàng.',
    },
    {
      type: 'choice',
      prompt: 'Tung một đồng xu. Có những sự kiện nào có thể xảy ra?',
      options: [
        'Xuất hiện mặt sấp hoặc mặt ngửa',
        'Chỉ xuất hiện mặt sấp',
        'Chỉ xuất hiện mặt ngửa',
      ],
      answer: 0,
      hints: ['Đồng xu có hai mặt.'],
      solution: 'Đồng xu có hai mặt, nên có thể xuất hiện mặt sấp hoặc mặt ngửa.',
    },
    {
      type: 'choice',
      prompt:
        'Nam gieo xúc xắc 30 lần: 1 chấm 4 lần, 2 chấm 6 lần, 3 chấm 5 lần, 4 chấm 3 lần, 5 chấm 7 lần, 6 chấm 5 lần. Mặt 5 chấm xuất hiện bao nhiêu lần?',
      options: ['7 lần', '5 lần', '3 lần', '2 lần'],
      answer: 0,
      hints: ['Em tìm đúng hàng của mặt 5 chấm.'],
      solution: 'Hàng mặt 5 chấm ghi 7 lần. Mặt 5 chấm xuất hiện 7 lần.',
    },
    {
      type: 'number',
      prompt:
        'Bảng kiểm đếm tung đồng xu, hàng mặt sấp có 1 bó 5 vạch và 3 vạch. Mặt sấp xuất hiện bao nhiêu lần?',
      answer: 8,
      unit: 'lần',
      hints: ['Mỗi bó có 5 vạch.', 'Em tính 5 + 3.'],
      solution: '5 + 3 = 8. Mặt sấp xuất hiện 8 lần.',
    },
    {
      type: 'number',
      prompt:
        'Quay vòng quay 20 lần, mũi tên dừng ở phần màu đỏ 9 lần, còn lại dừng ở phần màu vàng. Mũi tên dừng ở phần màu vàng bao nhiêu lần?',
      answer: 11,
      unit: 'lần',
      hints: ['Số lần dừng ở hai màu cộng lại bằng số lần quay.'],
      solution: '20 − 9 = 11. Mũi tên dừng ở phần màu vàng 11 lần.',
    },
    {
      type: 'number',
      prompt: 'Hà tung đồng xu 30 lần, mặt ngửa xuất hiện 17 lần. Mặt sấp xuất hiện bao nhiêu lần?',
      answer: 13,
      unit: 'lần',
      hints: ['Mỗi lần tung chỉ ra một mặt: sấp hoặc ngửa.'],
      solution: '30 − 17 = 13. Mặt sấp xuất hiện 13 lần.',
    },
    {
      type: 'choice',
      prompt:
        'Mai lấy 2 chiếc bút 20 lần: 6 lần được 2 bút cùng màu, 14 lần được 2 bút khác màu. Sự kiện nào xuất hiện nhiều lần hơn?',
      options: ['Lấy được 2 bút khác màu', 'Lấy được 2 bút cùng màu', 'Hai sự kiện bằng nhau'],
      answer: 0,
      hints: ['Em so sánh 6 và 14.'],
      solution: '14 > 6, nên sự kiện lấy được 2 bút khác màu xuất hiện nhiều lần hơn.',
    },
    {
      type: 'multi',
      prompt:
        'Việt có 4 chiếc hộp: 1 hộp đựng kẹo, 3 hộp đựng tẩy. Việt mở 1 hộp bất kì. Chọn các sự kiện có thể xảy ra.',
      options: ['Mở được hộp đựng kẹo', 'Mở được hộp đựng tẩy', 'Mở được hộp đựng bút'],
      answers: [0, 1],
      hints: ['Trong 4 hộp chỉ có kẹo và tẩy.'],
      solution: 'Việt có thể mở được hộp đựng kẹo hoặc hộp đựng tẩy. Không có hộp đựng bút.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo hai xúc xắc được 3 chấm và 4 chấm. Tích số chấm chẵn thì thỏ Chẵn tiến 1 ô, lẻ thì thỏ Lẻ tiến 1 ô. Thỏ nào được tiến?',
      options: ['Thỏ Chẵn', 'Thỏ Lẻ', 'Cả hai thỏ'],
      answer: 0,
      hints: ['Em tính 3 × 4 rồi xem tích là số chẵn hay số lẻ.'],
      solution: '3 × 4 = 12 là số chẵn, nên thỏ Chẵn được tiến 1 ô.',
    },
    {
      type: 'number',
      prompt:
        'Gieo hai xúc xắc rồi cộng số chấm ở hai mặt trên. Tổng lớn nhất có thể là bao nhiêu?',
      answer: 12,
      hints: ['Mỗi xúc xắc có nhiều nhất 6 chấm.'],
      solution: '6 + 6 = 12. Tổng lớn nhất là 12.',
    },
  ],
  takeaways: [
    'Mỗi kết quả có thể xảy ra khi làm thí nghiệm là một sự kiện.',
    'Ghi kết quả mỗi lần thử bằng một vạch trong bảng kiểm đếm.',
    'Đếm số vạch để biết số lần xuất hiện của mỗi sự kiện, rồi so sánh.',
  ],
};
