/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Làm quen với yếu tố thống kê, xác suất: đọc và sắp xếp dãy số liệu, tính số trung bình cộng, đọc biểu đồ cột, đọc bảng kiểm đếm và nêu các sự kiện có thể xảy ra.',
  intro:
    'Rô-bốt cùng các bạn làm đồ chơi tái chế để bán, lấy tiền ủng hộ đồng bào lũ lụt. Các bạn ghi lại số tiền, số câu đố, số chậu cây… Em cùng đọc các số liệu đó nhé!',
  objectives: [
    'Đọc, sắp xếp dãy số liệu và tìm số trung bình cộng của dãy.',
    'Đọc biểu đồ cột, so sánh các cột.',
    'Nêu các sự kiện có thể xảy ra, đọc số lần xuất hiện trong bảng kiểm đếm.',
  ],
  sections: [
    {
      heading: 'Ôn lại dãy số liệu và biểu đồ cột',
      blocks: [
        {
          type: 'p',
          text: 'Dãy số liệu: các số ghi lại lần lượt, như 2, 3, 5, 5, 5, 8, 8, 10, 12, 12.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc dãy: đếm số các số, tìm số thứ mấy, số lớn nhất, số bé nhất. Trung bình cộng: cộng các số rồi chia cho số các số.',
        },
        {
          type: 'p',
          text: 'Biểu đồ cột: mỗi cột biểu diễn một số liệu. Cột cao hơn biểu diễn số lớn hơn.',
        },
      ],
    },
    {
      heading: 'Ôn lại số lần xuất hiện của một sự kiện',
      blocks: [
        {
          type: 'p',
          text: 'Làm thí nghiệm nhiều lần, mỗi lần gạch một vạch vào bảng kiểm đếm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đếm số vạch của một hàng để biết số lần xuất hiện của sự kiện đó. Tổng số lần của các sự kiện bằng số lần thử.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập trộn',
    instruction:
      'Mỗi câu có một dãy số liệu, một biểu đồ cột hoặc một bảng kiểm đếm. Em đọc kĩ rồi chạm vào đáp án. Sai lần đầu, em xem gợi ý và thử lại. Làm xong, em có thể chọn bộ bài khác.',
  },
  examples: [
    {
      problem:
        'Rô-bốt ghi số câu đố mỗi bạn giải được: Nam 7, Rô-bốt 6, Việt 3, Hà 6, Mai 9, Lan 5. Bạn nào giải được nhiều nhất, ít nhất? Trung bình mỗi bạn giải được bao nhiêu câu đố?',
      steps: [
        'Cột Mai cao nhất (9 câu đố), cột Việt thấp nhất (3 câu đố).',
        'Cả 6 bạn giải được: 7 + 6 + 3 + 6 + 9 + 5 = 36 (câu đố).',
        'Trung bình mỗi bạn: 36 : 6 = 6 (câu đố).',
      ],
      answer: 'Mai giải nhiều nhất, Việt giải ít nhất. Trung bình mỗi bạn giải được 6 câu đố.',
    },
    {
      problem:
        'Mai và Mi làm chậu cây từ vỏ chai. Số chậu làm được mỗi ngày: 2, 3, 5, 5, 5, 8, 8, 10, 12, 12. Nhiều nhất một ngày làm được bao nhiêu chậu? Trung bình mỗi ngày làm được bao nhiêu chậu?',
      steps: [
        'Dãy đã xếp từ bé đến lớn, số cuối cùng 12 là số lớn nhất.',
        'Dãy có 10 số. Tổng: 2 + 3 + 5 + 5 + 5 + 8 + 8 + 10 + 12 + 12 = 70.',
        'Trung bình: 70 : 10 = 7 (chậu cây).',
      ],
      answer: 'Nhiều nhất 12 chậu cây một ngày. Trung bình mỗi ngày làm được 7 chậu cây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Số tiền bán đồ chơi tái chế mỗi ngày: 180 000 đồng, 70 000 đồng, 125 000 đồng, 80 000 đồng, 100 000 đồng. Có bao nhiêu ngày thu được nhiều hơn 100 000 đồng?',
      options: ['2 ngày', '1 ngày', '3 ngày', '4 ngày'],
      answer: 0,
      hints: ['Em so sánh từng số với 100 000.', '100 000 đồng không nhiều hơn 100 000 đồng.'],
      solution: 'Chỉ có 180 000 và 125 000 lớn hơn 100 000. Có 2 ngày.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các số tiền 180 000, 70 000, 125 000, 80 000, 100 000 (đồng) theo thứ tự từ lớn đến bé.',
      items: ['180 000', '70 000', '125 000', '80 000', '100 000'],
      answer: [0, 2, 4, 3, 1],
      hints: ['Số lớn nhất là 180 000, đặt lên đầu.'],
      solution: 'Từ lớn đến bé: 180 000, 125 000, 100 000, 80 000, 70 000.',
    },
    {
      type: 'choice',
      prompt:
        'Biểu đồ số câu đố: Nam 7, Rô-bốt 6, Việt 3, Hà 6, Mai 9, Lan 5. Bạn nào giải được nhiều câu đố nhất?',
      options: ['Mai', 'Nam', 'Việt', 'Lan'],
      answer: 0,
      hints: ['Cột cao nhất biểu diễn số lớn nhất.'],
      solution: 'Số lớn nhất là 9, của Mai. Mai giải được nhiều câu đố nhất.',
    },
    {
      type: 'number',
      prompt:
        'Số câu đố 6 bạn giải được: 7, 6, 3, 6, 9, 5. Các bạn giải các câu đố khác nhau. 6 bạn giải được tất cả bao nhiêu câu đố?',
      answer: 36,
      unit: 'câu đố',
      hints: ['Em cộng 6 số với nhau.'],
      solution: '7 + 6 + 3 + 6 + 9 + 5 = 36 (câu đố).',
    },
    {
      type: 'number',
      prompt:
        'Số câu đố 6 bạn giải được: 7, 6, 3, 6, 9, 5. Trung bình mỗi bạn giải được bao nhiêu câu đố?',
      answer: 6,
      unit: 'câu đố',
      hints: ['Tổng số câu đố là 36.', 'Có 6 bạn, em chia tổng cho 6.'],
      solution: '(7 + 6 + 3 + 6 + 9 + 5) : 6 = 36 : 6 = 6 (câu đố).',
    },
    {
      type: 'number',
      prompt:
        'Số chậu cây làm được mỗi ngày: 2, 3, 5, 5, 5, 8, 8, 10, 12, 12. Trong một ngày, Mai và Mi làm được nhiều nhất bao nhiêu chậu cây?',
      answer: 12,
      unit: 'chậu cây',
      hints: ['Em tìm số lớn nhất trong dãy.'],
      solution: 'Số lớn nhất trong dãy là 12. Nhiều nhất là 12 chậu cây một ngày.',
    },
    {
      type: 'number',
      prompt:
        'Số chậu cây làm được mỗi ngày: 2, 3, 5, 5, 5, 8, 8, 10, 12, 12. Trung bình mỗi ngày hai chị em làm được bao nhiêu chậu cây?',
      answer: 7,
      unit: 'chậu cây',
      hints: ['Dãy có 10 số.', 'Tổng của dãy là 70.'],
      solution: '(2 + 3 + 5 + 5 + 5 + 8 + 8 + 10 + 12 + 12) : 10 = 70 : 10 = 7 (chậu cây).',
    },
    {
      type: 'choice',
      prompt: 'Trong dãy 2, 3, 5, 5, 5, 8, 8, 10, 12, 12, số 5 xuất hiện mấy lần?',
      options: ['3 lần', '1 lần', '2 lần', '5 lần'],
      answer: 0,
      hints: ['Em đếm từng số 5 trong dãy.'],
      solution: 'Dãy có ba số 5 đứng liền nhau. Số 5 xuất hiện 3 lần.',
    },
    {
      type: 'multi',
      prompt:
        'Việt có 4 chiếc hộp: 1 hộp đựng kẹo và 3 hộp đựng tẩy. Việt mở 1 hộp. Chọn các sự kiện có thể xảy ra.',
      options: ['Mở được hộp đựng kẹo', 'Mở được hộp đựng tẩy', 'Mở được hộp đựng thước'],
      answers: [0, 1],
      hints: ['Trong 4 hộp có những đồ vật nào?'],
      solution: 'Việt có thể mở được hộp đựng kẹo hoặc hộp đựng tẩy.',
    },
    {
      type: 'number',
      prompt:
        'Việt mở hộp 10 lần, có 2 lần mở được hộp đựng kẹo. Còn lại là hộp đựng tẩy. Sự kiện mở được hộp đựng tẩy xuất hiện bao nhiêu lần?',
      answer: 8,
      unit: 'lần',
      hints: ['Mỗi lần mở chỉ được kẹo hoặc tẩy.'],
      solution: '10 − 2 = 8. Sự kiện mở được hộp đựng tẩy xuất hiện 8 lần.',
    },
  ],
  takeaways: [
    'Đọc dãy số liệu và biểu đồ cột để so sánh, tìm số lớn nhất, bé nhất.',
    'Số trung bình cộng bằng tổng các số chia cho số các số.',
    'Bảng kiểm đếm cho biết số lần xuất hiện của mỗi sự kiện.',
  ],
};
