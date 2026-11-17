/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các phép tính với số thập phân: cộng, trừ, nhân, chia, nhân và chia nhẩm với 10, 100, 1 000 hoặc 0,1; 0,01; 0,001, tính bằng cách thuận tiện và giải bài toán thực tế.',
  intro:
    'Em đã biết cộng, trừ, nhân, chia số thập phân. Hôm nay em ôn lại cả bốn phép tính và cách tính nhẩm. Bài ôn tập sẽ cho em biết phép tính nào đã vững, phép tính nào cần luyện thêm nhé!',
  objectives: [
    'Đặt tính rồi tính cộng, trừ, nhân, chia số thập phân.',
    'Nhân, chia nhẩm một số thập phân với 10; 100; 1 000 hoặc với 0,1; 0,01; 0,001.',
    'Tính bằng cách thuận tiện.',
    'Dựa vào một phép nhân đã biết để tìm kết quả phép nhân khác.',
    'Giải bài toán thực tế với số thập phân.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Cộng và trừ số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ số thập phân: em đặt tính sao cho các dấu phẩy thẳng cột, các chữ số cùng hàng thẳng cột. Em tính như với số tự nhiên, rồi viết dấu phẩy ở kết quả thẳng cột với các dấu phẩy.',
        },
        {
          type: 'p',
          text: 'Số bị trừ có ít chữ số ở phần thập phân hơn số trừ thì em viết thêm chữ số 0: 27 − 1,2 = 27,0 − 1,2 = 25,8.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tính bằng cách thuận tiện: em cộng trước hai số có tổng là số tự nhiên. 9,2 + 17,56 + 0,8 = (9,2 + 0,8) + 17,56 = 10 + 17,56 = 27,56.',
        },
      ],
    },
    {
      heading: 'Nhân và chia số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân hai số thập phân: em nhân như nhân số tự nhiên. Hai thừa số có bao nhiêu chữ số ở phần thập phân thì em tách ra bấy nhiêu chữ số ở tích, kể từ phải sang trái.',
        },
        {
          type: 'p',
          text: 'Biết 29 × 37 = 1 073. Vậy 2,9 × 3,7 = 10,73 vì hai thừa số có tất cả hai chữ số ở phần thập phân.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chia cho một số thập phân: em đếm số chữ số ở phần thập phân của số chia, chuyển dấu phẩy của số bị chia sang phải bấy nhiêu chữ số, bỏ dấu phẩy ở số chia rồi chia.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Dấu phẩy chuyển', 'Ví dụ'],
          rows: [
            ['Nhân với 10; 100; 1 000', 'sang phải 1, 2, 3 chữ số', '4,83 × 100 = 483'],
            ['Chia cho 0,1; 0,01; 0,001', 'sang phải 1, 2, 3 chữ số', '5,67 : 0,1 = 56,7'],
            ['Chia cho 10; 100; 1 000', 'sang trái 1, 2, 3 chữ số', '36,5 : 10 = 3,65'],
            ['Nhân với 0,1; 0,01; 0,001', 'sang trái 1, 2, 3 chữ số', '20,08 × 0,1 = 2,008'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phép tính được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 9,63 − 5,275.',
      steps: [
        'Số bị trừ có hai chữ số ở phần thập phân, số trừ có ba. Em viết 9,63 thành 9,630.',
        'Đặt tính sao cho các dấu phẩy thẳng cột: 9,630 ở trên, 5,275 ở dưới.',
        'Trừ như trừ số tự nhiên: 9 630 − 5 275 = 4 355.',
        'Viết dấu phẩy ở hiệu thẳng cột với các dấu phẩy.',
      ],
      answer: '9,63 − 5,275 = 4,355.',
    },
    {
      problem: 'Đặt tính rồi tính: 2,52 : 2,1.',
      steps: [
        'Số chia 2,1 có một chữ số ở phần thập phân.',
        'Chuyển dấu phẩy của 2,52 sang phải một chữ số được 25,2; bỏ dấu phẩy ở 2,1 được 21.',
        'Chia 25,2 : 21: 25 chia 21 được 1, viết 1, dư 4. Viết dấu phẩy vào thương. Hạ 2 được 42, 42 chia 21 được 2.',
        'Thử lại: 1,2 × 2,1 = 2,52.',
      ],
      answer: '2,52 : 2,1 = 1,2.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 7,8 + 11,6 = ?',
      answer: 19.4,
      hints: ['Em đặt tính sao cho các dấu phẩy thẳng cột.'],
      solution: '7,8 + 11,6 = 19,4.',
    },
    {
      type: 'number',
      prompt: 'Tính: 15,7 + 1,57 = ?',
      answer: 17.27,
      hints: [
        'Chữ số 7 của 15,7 ở hàng phần mười, chữ số 7 của 1,57 ở hàng phần trăm. Em đặt các chữ số cùng hàng thẳng cột.',
      ],
      solution: 'Viết 15,7 thành 15,70 rồi cộng: 15,70 + 1,57 = 17,27.',
    },
    {
      type: 'choice',
      prompt: 'Tính bằng cách thuận tiện: 9,2 + 17,56 + 0,8 = ?',
      options: ['27,56', '26,56', '28,56', '18,44'],
      answer: 0,
      hints: ['Hai số nào có tổng là số tự nhiên?'],
      solution: '9,2 + 17,56 + 0,8 = (9,2 + 0,8) + 17,56 = 10 + 17,56 = 27,56.',
    },
    {
      type: 'number',
      prompt: 'Tính: 9,63 − 5,275 = ?',
      answer: 4.355,
      hints: ['Em viết thêm chữ số 0 vào 9,63 cho đủ ba chữ số ở phần thập phân.'],
      solution: '9,630 − 5,275 = 4,355.',
    },
    {
      type: 'number',
      prompt: 'Tính: 27 − 1,2 = ?',
      answer: 25.8,
      hints: ['Em viết 27 thành 27,0 rồi trừ.'],
      solution: '27,0 − 1,2 = 25,8.',
    },
    {
      type: 'number',
      prompt: 'Tính: 3,1 × 5,7 = ?',
      answer: 17.67,
      hints: ['Em nhân 31 × 57, rồi đếm số chữ số ở phần thập phân của hai thừa số.'],
      solution:
        '31 × 57 = 1 767. Hai thừa số có tất cả hai chữ số ở phần thập phân, nên 3,1 × 5,7 = 17,67.',
    },
    {
      type: 'match',
      prompt: 'Biết 29 × 37 = 1 073. Nối mỗi phép nhân với kết quả của nó.',
      left: ['2,9 × 37', '2,9 × 3,7', '0,29 × 3,7'],
      right: ['107,3', '10,73', '1,073', '0,1073'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Em đếm số chữ số ở phần thập phân của cả hai thừa số, rồi tách bấy nhiêu chữ số ở 1 073.',
      ],
      solution:
        '2,9 × 37: một chữ số ở phần thập phân, được 107,3. 2,9 × 3,7: hai chữ số, được 10,73. 0,29 × 3,7: ba chữ số, được 1,073.',
    },
    {
      type: 'number',
      prompt: 'Tính: 2,52 : 2,1 = ?',
      answer: 1.2,
      hints: ['Chuyển dấu phẩy của cả số bị chia và số chia sang phải một chữ số: 25,2 : 21.'],
      solution: '2,52 : 2,1 = 25,2 : 21 = 1,2.',
    },
    {
      type: 'number',
      prompt: 'Tính: 72 : 15 = ?',
      answer: 4.8,
      hints: [
        '72 chia 15 được 4, còn dư. Em viết dấu phẩy vào thương, thêm chữ số 0 vào số dư rồi chia tiếp.',
      ],
      solution:
        '72 : 15 được 4, dư 12. Viết dấu phẩy vào thương, thêm 0 vào 12 được 120; 120 : 15 = 8. Vậy 72 : 15 = 4,8.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 4,83 × 100 = ?',
      options: ['483', '48,3', '4 830', '0,0483'],
      answer: 0,
      hints: ['Nhân với 100 thì chuyển dấu phẩy sang phải hai chữ số.'],
      solution: 'Chuyển dấu phẩy của 4,83 sang phải hai chữ số: 4,83 × 100 = 483.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 56,7 : 0,1 = ?',
      options: ['567', '5,67', '56,7', '5 670'],
      answer: 0,
      hints: ['Chia cho 0,1 cũng như nhân với 10.'],
      solution: 'Chia cho 0,1 thì chuyển dấu phẩy sang phải một chữ số: 56,7 : 0,1 = 567.',
    },
    {
      type: 'number',
      prompt:
        'Cuộn dây kim tuyến dài 12,6 m. Lớp em cắt thành các đoạn dài 1,2 m. Cắt được nhiều nhất bao nhiêu đoạn như thế?',
      answer: 10,
      hints: ['Em tính 12,6 : 1,2. Phần dây thừa không đủ một đoạn thì không tính.'],
      solution:
        '12,6 : 1,2 = 10,5. Cắt được 10 đoạn, còn thừa 0,6 m không đủ một đoạn. Vậy cắt được nhiều nhất 10 đoạn.',
    },
    {
      type: 'number',
      prompt: 'Bác Bình có 6,75 kg nấm, chia đều vào 9 hộp. Mỗi hộp có bao nhiêu ki-lô-gam nấm?',
      answer: 0.75,
      unit: 'kg',
      hints: ['Chia đều vào 9 hộp thì em chia cho 9.'],
      solution: 'Mỗi hộp có: 6,75 : 9 = 0,75 (kg).',
    },
    {
      type: 'choice',
      prompt: 'Rô-bốt cao 0,9 m. Mi cao hơn Rô-bốt 0,35 m. Mi cao bao nhiêu mét?',
      options: ['1,25 m', '0,55 m', '1,2 m', '0,44 m'],
      answer: 0,
      hints: ['"Cao hơn" thì em làm phép cộng. Đặt các dấu phẩy thẳng cột.'],
      solution: 'Mi cao: 0,9 + 0,35 = 1,25 (m).',
    },
  ],
  takeaways: [
    'Cộng, trừ: đặt các dấu phẩy thẳng cột, thiếu chữ số thì viết thêm chữ số 0.',
    'Nhân: nhân như số tự nhiên, rồi tách ở tích số chữ số ở phần thập phân của cả hai thừa số.',
    'Chia cho số thập phân: chuyển dấu phẩy ở số bị chia và số chia sang phải cùng một số chữ số.',
    'Nhân với 10; 100; 1 000 thì dấu phẩy sang phải; nhân với 0,1; 0,01; 0,001 thì dấu phẩy sang trái.',
  ],
};
