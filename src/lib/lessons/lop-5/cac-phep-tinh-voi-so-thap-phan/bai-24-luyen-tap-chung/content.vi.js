/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Các phép tính với số thập phân: cộng, trừ, nhân, chia số thập phân, nhân chia nhẩm với 10; 100; 1 000 hoặc 0,1; 0,01; 0,001, tính giá trị biểu thức, tính thuận tiện và giải bài toán thực tế.',
  intro:
    'Em đã biết cộng, trừ, nhân, chia số thập phân. Bây giờ em cùng luyện tập, tính giá trị biểu thức và giải các bài toán thực tế nhé!',
  objectives: [
    'Thực hiện được phép cộng, trừ, nhân, chia số thập phân.',
    'Nhân, chia nhẩm được số thập phân với 10; 100; 1 000;... và với 0,1; 0,01; 0,001;...',
    'Tính được giá trị của biểu thức và tính bằng cách thuận tiện.',
    'Vận dụng giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại bốn phép tính',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Cách làm'],
          rows: [
            ['Cộng, trừ', 'Đặt tính sao cho các dấu phẩy thẳng cột, rồi tính như số tự nhiên.'],
            [
              'Nhân',
              'Nhân như số tự nhiên. Đếm số chữ số ở phần thập phân của cả hai thừa số, rồi tách ra bấy nhiêu chữ số ở tích.',
            ],
            [
              'Chia cho số thập phân',
              'Số chia có bao nhiêu chữ số ở phần thập phân thì chuyển dấu phẩy ở số bị chia sang phải bấy nhiêu chữ số, bỏ dấu phẩy ở số chia, rồi chia.',
            ],
            ['Nhân với 10; 100; 1 000', 'Chuyển dấu phẩy sang bên phải một, hai, ba chữ số.'],
            ['Nhân với 0,1; 0,01; 0,001', 'Chuyển dấu phẩy sang bên trái một, hai, ba chữ số.'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi trừ, nếu số bị trừ có ít chữ số ở phần thập phân hơn, em viết thêm chữ số 0 vào bên phải cho đủ: 52 = 52,00.',
        },
      ],
    },
    {
      heading: 'Biểu thức và tính chất của phép tính',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong biểu thức: tính trong ngoặc trước; rồi đến nhân, chia; sau cùng là cộng, trừ.',
        },
        {
          type: 'p',
          text: 'Phép cộng và phép nhân số thập phân cũng có tính chất giao hoán và kết hợp, như với số tự nhiên.',
        },
        {
          type: 'table',
          head: ['Tính chất', 'Ví dụ'],
          rows: [
            ['Giao hoán', '2,5 × 6,1 = 6,1 × 2,5'],
            ['Kết hợp', '(15 × 6) × 0,25 = 15 × (6 × 0,25)'],
            ['Nhân một tổng với một số', '(5,3 + 4,7) × 0,1 = 5,3 × 0,1 + 4,7 × 0,1'],
          ],
        },
        {
          type: 'p',
          text: 'Tính thuận tiện: em ghép các số có tích là 1, 10, 100 để tính trước. Ví dụ 2,5 × 3,7 × 4 = (2,5 × 4) × 3,7 = 10 × 3,7 = 37.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập trộn',
    instruction:
      'Mỗi bộ có một câu cho mỗi phần của chủ đề. Chọn sai lần đầu, em được xem gợi ý và chọn lại. Hết bộ, em xem điểm và các phần cần ôn rồi làm bộ khác.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: (131,4 − 80,8) : 2,3 + 21,64 × 2.',
      steps: [
        'Tính trong ngoặc trước: 131,4 − 80,8 = 50,6.',
        'Làm phép chia và phép nhân: 50,6 : 2,3 = 22; 21,64 × 2 = 43,28.',
        'Làm phép cộng: 22 + 43,28 = 65,28.',
      ],
      answer: '(131,4 − 80,8) : 2,3 + 21,64 × 2 = 65,28.',
    },
    {
      problem:
        'Trong hai năm, trang trại nhà bác Tám bán được 21,56 tấn cá vược. Năm thứ hai bán được nhiều hơn năm thứ nhất 2,7 tấn. Mỗi năm trang trại bán được bao nhiêu tấn cá vược?',
      steps: [
        'Đây là bài toán tìm hai số khi biết tổng (21,56 tấn) và hiệu (2,7 tấn).',
        'Năm thứ nhất bán được: (21,56 − 2,7) : 2 = 18,86 : 2 = 9,43 (tấn).',
        'Năm thứ hai bán được: 21,56 − 9,43 = 12,13 (tấn).',
      ],
      answer: 'Năm thứ nhất: 9,43 tấn; năm thứ hai: 12,13 tấn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 4,98 + 15,7',
      answer: 20.68,
      hints: [
        'Đặt tính sao cho dấu phẩy của hai số thẳng cột.',
        'Viết 15,7 thành 15,70 cho dễ cộng.',
      ],
      solution: 'Đặt tính thẳng dấu phẩy: 4,98 + 15,70 = 20,68.',
    },
    {
      type: 'number',
      prompt: 'Tính: 52 − 4,91',
      answer: 47.09,
      hints: ['Viết 52 thành 52,00.', 'Đặt tính thẳng dấu phẩy rồi trừ như số tự nhiên.'],
      solution: '52,00 − 4,91 = 47,09.',
    },
    {
      type: 'choice',
      prompt: '0,73 × 6,5 = ?',
      options: ['4,745', '47,45', '0,4745', '474,5'],
      answer: 0,
      hints: [
        'Nhân như số tự nhiên: 73 × 65.',
        'Hai thừa số có tất cả bao nhiêu chữ số ở phần thập phân?',
      ],
      solution:
        '73 × 65 = 4 745. Hai thừa số có tất cả 2 + 1 = 3 chữ số ở phần thập phân, nên tách ra 3 chữ số: 4,745.',
    },
    {
      type: 'number',
      prompt: 'Tính: 104,89 : 8,5',
      answer: 12.34,
      hints: [
        'Số chia 8,5 có một chữ số ở phần thập phân.',
        'Chuyển dấu phẩy ở 104,89 sang phải một chữ số, bỏ dấu phẩy ở 8,5: tính 1 048,9 : 85.',
      ],
      solution: '104,89 : 8,5 = 1 048,9 : 85 = 12,34. Thử lại: 12,34 × 8,5 = 104,89.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm. Nối mỗi phép tính với kết quả.',
      left: ['3,14 × 0,1', '3,14 × 100', '31,4 : 10', '314 : 0,001'],
      right: ['0,314', '314', '3,14', '314 000', '31,4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Nhân với 100: dấu phẩy sang phải hai chữ số. Nhân với 0,1 hay chia cho 10: sang trái một chữ số.',
        'Chia cho 0,001 cũng như nhân với 1 000.',
      ],
      solution: '3,14 × 0,1 = 0,314; 3,14 × 100 = 314; 31,4 : 10 = 3,14; 314 : 0,001 = 314 000.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: (5,3 + 4,7) × 0,1 ? 5,3 × 0,1 + 4,7 × 0,1',
      options: ['=', '>', '<'],
      answer: 0,
      hints: ['Nhân một tổng với một số: nhân từng số hạng với số đó rồi cộng lại.'],
      solution:
        'Theo tính chất nhân một tổng với một số, hai vế bằng nhau. Kiểm tra: 10 × 0,1 = 1 và 0,53 + 0,47 = 1.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 8,16 : (1,32 + 3,48) − 0,34 : 2',
      answer: 1.53,
      hints: ['Tính trong ngoặc trước: 1,32 + 3,48.', 'Rồi làm hai phép chia, sau cùng mới trừ.'],
      solution: '1,32 + 3,48 = 4,8; 8,16 : 4,8 = 1,7; 0,34 : 2 = 0,17; 1,7 − 0,17 = 1,53.',
    },
    {
      type: 'choice',
      prompt: 'Tính bằng cách thuận tiện: 0,56 × 4,7 + 5,3 × 0,56',
      options: ['5,6', '56', '0,56', '2,8'],
      answer: 0,
      hints: ['Hai tích có chung thừa số 0,56.', '4,7 + 5,3 bằng mấy?'],
      solution: '0,56 × 4,7 + 5,3 × 0,56 = 0,56 × (4,7 + 5,3) = 0,56 × 10 = 5,6.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm bản đồ hình chữ nhật dài 2,97 dm, rộng 2,1 dm. Diện tích tấm bản đồ là bao nhiêu đề-xi-mét vuông?',
      answer: 6.237,
      unit: 'dm²',
      hints: ['Diện tích hình chữ nhật = chiều dài × chiều rộng.'],
      solution: 'Diện tích tấm bản đồ: 2,97 × 2,1 = 6,237 (dm²).',
    },
    {
      type: 'choice',
      prompt: 'Số nào thay vào dấu ? cho đúng: ? : 3,8 = 21,34',
      options: ['81,092', '810,92', '17,54', '25,14'],
      answer: 0,
      hints: ['Muốn tìm số bị chia, em lấy thương nhân với số chia.'],
      solution: 'Số cần tìm là 21,34 × 3,8 = 81,092. Thử lại: 81,092 : 3,8 = 21,34.',
    },
    {
      type: 'number',
      prompt:
        'Một vườn cây hình chữ nhật có diện tích 83,52 m², chiều rộng 8,7 m. Tính chu vi vườn cây.',
      answer: 36.6,
      unit: 'm',
      hints: [
        'Tìm chiều dài trước: diện tích chia cho chiều rộng.',
        'Chu vi = (chiều dài + chiều rộng) × 2.',
      ],
      solution: 'Chiều dài: 83,52 : 8,7 = 9,6 (m). Chu vi: (9,6 + 8,7) × 2 = 36,6 (m).',
    },
    {
      type: 'choice',
      prompt:
        'Tú có 25 quả bóng, mỗi quả nặng 5,7 g. Tú cho các quả bóng vào hộp đỏ và hộp xanh. Hộp xanh nặng thêm 62,7 g. Hộp đỏ nặng thêm bao nhiêu gam?',
      options: ['79,8 g', '142,5 g', '74,1 g'],
      answer: 0,
      hints: [
        'Tính cân nặng của cả 25 quả bóng trước.',
        'Lấy cân nặng cả 25 quả trừ đi phần ở hộp xanh.',
      ],
      solution:
        '25 quả bóng nặng: 5,7 × 25 = 142,5 (g). Hộp đỏ nặng thêm: 142,5 − 62,7 = 79,8 (g).',
    },
  ],
  takeaways: [
    'Cộng, trừ số thập phân: đặt tính thẳng dấu phẩy, rồi tính như số tự nhiên.',
    'Nhân: nhân như số tự nhiên, rồi tách ở tích bấy nhiêu chữ số bằng tổng số chữ số ở phần thập phân của hai thừa số.',
    'Chia cho số thập phân: chuyển dấu phẩy để số chia thành số tự nhiên, rồi chia.',
    'Biểu thức: trong ngoặc trước, nhân chia trước, cộng trừ sau.',
  ],
};
