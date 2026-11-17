/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về số tự nhiên, phân số và số thập phân: đọc, viết, giá trị của chữ số theo hàng, làm tròn, rút gọn, quy đồng và so sánh phân số, hỗn số, viết phân số thành số thập phân, so sánh và làm tròn số thập phân.',
  intro:
    'Lớp 5 sắp kết thúc rồi! Hôm nay em ôn lại ba loại số đã học: số tự nhiên, phân số và số thập phân. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết được số tự nhiên; nêu được giá trị của chữ số theo hàng; làm tròn được số tự nhiên.',
    'Rút gọn, quy đồng mẫu số, so sánh được các phân số; viết được hỗn số thành phân số.',
    'Viết được phân số thành số thập phân.',
    'Đọc, viết, so sánh và làm tròn được số thập phân.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Số tự nhiên được viết theo các hàng và các lớp. Mỗi lớp có ba hàng: lớp đơn vị, lớp nghìn, lớp triệu.',
        },
        {
          type: 'table',
          head: ['Chữ số của 4 803 217', 'Hàng', 'Giá trị'],
          rows: [
            ['4', 'hàng triệu', '4 000 000'],
            ['8', 'hàng trăm nghìn', '800 000'],
            ['3', 'hàng nghìn', '3 000'],
            ['2', 'hàng trăm', '200'],
          ],
        },
        {
          type: 'p',
          text: 'Số 4 803 217 đọc là: bốn triệu tám trăm linh ba nghìn hai trăm mười bảy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn số đến một hàng: em nhìn chữ số ở hàng ngay bên phải. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
      ],
    },
    {
      heading: 'Phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân hoặc chia cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0, ta được một phân số bằng phân số đã cho.',
        },
        {
          type: 'p',
          text: 'Rút gọn phân số: 18/24 = (18 : 6)/(24 : 6) = 3/4. Phân số 3/4 là phân số tối giản.',
        },
        {
          type: 'p',
          text: 'So sánh hai phân số khác mẫu số: em quy đồng mẫu số rồi so sánh hai tử số.',
        },
        {
          type: 'p',
          text: 'Viết hỗn số thành phân số: 3 2/5 = (3 × 5 + 2)/5 = 17/5.',
        },
      ],
    },
    {
      heading: 'Số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Số thập phân có phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy. Sau dấu phẩy là hàng phần mười, hàng phần trăm, hàng phần nghìn.',
        },
        {
          type: 'table',
          head: ['Phân số', 'Phân số thập phân', 'Số thập phân'],
          rows: [
            ['3/5', '6/10', '0,6'],
            ['3/4', '75/100', '0,75'],
            ['7/8', '875/1 000', '0,875'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hai số thập phân: em so sánh phần nguyên trước. Phần nguyên bằng nhau thì em so sánh lần lượt hàng phần mười, hàng phần trăm, hàng phần nghìn.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Viết thêm hay bỏ đi chữ số 0 ở tận cùng bên phải phần thập phân, số thập phân không đổi: 2,50 = 2,5.',
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
      problem: 'So sánh hai phân số 3/4 và 5/6.',
      steps: [
        'Hai mẫu số khác nhau. Em quy đồng mẫu số, chọn mẫu số chung là 12.',
        '3/4 = (3 × 3)/(4 × 3) = 9/12; 5/6 = (5 × 2)/(6 × 2) = 10/12.',
        'Hai phân số cùng mẫu số 12, tử số 9 < 10, nên 9/12 < 10/12.',
      ],
      answer: '3/4 < 5/6.',
    },
    {
      problem: 'Viết phân số 7/8 thành số thập phân.',
      steps: [
        'Em tìm số nhân với 8 được 10; 100 hoặc 1 000: 8 × 125 = 1 000.',
        '7/8 = (7 × 125)/(8 × 125) = 875/1 000.',
        'Mẫu số 1 000 có ba chữ số 0, nên phần thập phân có ba chữ số.',
      ],
      answer: '7/8 = 0,875.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 2 305 060 đọc là gì?',
      options: [
        'Hai triệu ba trăm linh năm nghìn không trăm sáu mươi',
        'Hai triệu ba trăm năm nghìn sáu mươi',
        'Hai trăm ba mươi nghìn năm trăm linh sáu',
        'Hai triệu ba mươi năm nghìn không trăm sáu mươi',
      ],
      answer: 0,
      hints: [
        'Em tách số thành các lớp: 2 | 305 | 060, rồi đọc từng lớp từ trái sang phải kèm tên lớp.',
      ],
      solution:
        'Lớp triệu: 2, lớp nghìn: 305, lớp đơn vị: 060. Số 2 305 060 đọc là: hai triệu ba trăm linh năm nghìn không trăm sáu mươi.',
    },
    {
      type: 'number',
      prompt: '50 000 + 7 000 + 300 + 40 + 6 = ?',
      answer: 57346,
      hints: ['Em viết chữ số của từng hàng: chục nghìn, nghìn, trăm, chục, đơn vị.'],
      solution: '50 000 + 7 000 + 300 + 40 + 6 = 57 346.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 4 803 217, chữ số 8 có giá trị là bao nhiêu?',
      options: ['800 000', '80 000', '8 000 000', '8'],
      answer: 0,
      hints: ['Đếm từ phải sang trái để tìm hàng của chữ số 8.'],
      solution: 'Chữ số 8 ở hàng trăm nghìn, nên có giá trị là 800 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 6 451 892 đến hàng trăm nghìn.',
      answer: 6500000,
      hints: ['Em nhìn chữ số ở hàng chục nghìn.'],
      solution:
        'Chữ số hàng chục nghìn của 6 451 892 là 5, nên làm tròn lên. Làm tròn 6 451 892 đến hàng trăm nghìn được 6 500 000.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số 18/24 thành phân số tối giản.',
      answer: [3, 4],
      simplest: true,
      hints: ['18 và 24 cùng chia hết cho số nào lớn nhất?'],
      solution: '18 và 24 cùng chia hết cho 6: 18/24 = (18 : 6)/(24 : 6) = 3/4.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 5/8 ? 3/4',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em viết 3/4 thành phân số có mẫu số 8.'],
      solution: '3/4 = 6/8. Hai phân số cùng mẫu số 8, 5 < 6, nên 5/8 < 3/4.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phân số theo thứ tự từ bé đến lớn.',
      items: ['2/3', '1/2', '5/6', '1/3'],
      answer: [3, 1, 0, 2],
      hints: ['Em quy đồng mẫu số các phân số với mẫu số chung là 6.'],
      solution:
        '2/3 = 4/6; 1/2 = 3/6; 1/3 = 2/6. Vì 2/6 < 3/6 < 4/6 < 5/6 nên thứ tự là: 1/3; 1/2; 2/3; 5/6.',
    },
    {
      type: 'fraction',
      prompt: 'Viết hỗn số 3 2/5 thành phân số.',
      answer: [17, 5],
      hints: ['Lấy phần nguyên nhân với mẫu số, rồi cộng với tử số. Mẫu số giữ nguyên.'],
      solution: '3 2/5 = (3 × 5 + 2)/5 = 17/5.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phân số với số thập phân bằng nó.',
      left: ['7/10', '3/4', '7/8', '459/100'],
      right: ['0,7', '0,75', '0,875', '4,59', '0,34'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em viết mỗi phân số thành phân số có mẫu số 10; 100 hoặc 1 000.'],
      solution: '7/10 = 0,7. 3/4 = 75/100 = 0,75. 7/8 = 875/1 000 = 0,875. 459/100 = 4,59.',
    },
    {
      type: 'choice',
      prompt: 'Số 30,405 đọc là gì?',
      options: [
        'Ba mươi phẩy bốn trăm linh năm',
        'Ba mươi phẩy bốn trăm năm mươi',
        'Ba trăm linh bốn phẩy năm',
        'Ba mươi phẩy bốn mươi lăm',
      ],
      answer: 0,
      hints: ['Phần nguyên là 30. Phần thập phân gồm các chữ số 4, 0, 5.'],
      solution: 'Số 30,405 đọc là: ba mươi phẩy bốn trăm linh năm.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ bé đến lớn.',
      items: ['8,9', '8,09', '8,19', '8,091'],
      answer: [1, 3, 2, 0],
      hints: ['Phần nguyên đều là 8. Em so sánh chữ số hàng phần mười trước.'],
      solution:
        'Hàng phần mười: 0 < 1 < 9. Hai số 8,09 và 8,091 có cùng hàng phần mười và hàng phần trăm, 8,09 = 8,090 < 8,091. Thứ tự: 8,09; 8,091; 8,19; 8,9.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 15,846 đến hàng phần mười.',
      answer: 15.8,
      hints: ['Em nhìn chữ số ở hàng phần trăm.'],
      solution:
        'Chữ số hàng phần trăm là 4, 4 < 5 nên làm tròn xuống. Làm tròn 15,846 đến hàng phần mười được 15,8.',
    },
  ],
  takeaways: [
    'Số tự nhiên viết theo hàng và lớp; giá trị của chữ số phụ thuộc vào hàng của nó.',
    'Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số.',
    'So sánh phân số khác mẫu số: quy đồng mẫu số rồi so sánh tử số.',
    'So sánh số thập phân: phần nguyên trước, rồi lần lượt từng hàng sau dấu phẩy.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
