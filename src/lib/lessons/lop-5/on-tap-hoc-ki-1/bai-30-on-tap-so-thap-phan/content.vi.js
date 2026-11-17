/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập số thập phân: đọc, viết, các hàng, phân số thập phân, so sánh và sắp xếp, làm tròn số thập phân và viết số đo đại lượng dưới dạng số thập phân.',
  intro:
    'Em đã học số thập phân trong học kì 1. Hôm nay em ôn lại cách đọc, viết, so sánh và làm tròn số thập phân. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết được số thập phân; nêu được các hàng của số thập phân.',
    'Viết được phân số thập phân thành số thập phân.',
    'So sánh, sắp xếp được các số thập phân.',
    'Làm tròn được số thập phân đến số tự nhiên gần nhất, đến hàng phần mười, hàng phần trăm.',
    'Viết được số đo đại lượng dưới dạng số thập phân.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Các hàng của số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Số thập phân có hai phần, ngăn cách bởi dấu phẩy. Bên trái là phần nguyên, bên phải là phần thập phân.',
        },
        {
          type: 'table',
          head: ['Chữ số của 36,725', 'Hàng'],
          rows: [
            ['3', 'hàng chục'],
            ['6', 'hàng đơn vị'],
            ['7', 'hàng phần mười'],
            ['2', 'hàng phần trăm'],
            ['5', 'hàng phần nghìn'],
          ],
        },
        {
          type: 'p',
          text: 'Số 36,725 đọc là: ba mươi sáu phẩy bảy trăm hai mươi lăm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc số thập phân: em đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân. Chữ số 0 ngay sau dấu phẩy đọc là "không": 0,05 đọc là không phẩy không năm.',
        },
        {
          type: 'p',
          text: 'Phân số thập phân viết được thành số thập phân: 7/10 = 0,7; 27/100 = 0,27; 39/1 000 = 0,039.',
        },
      ],
    },
    {
      heading: 'So sánh và làm tròn số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh hai số thập phân: em so sánh phần nguyên trước. Phần nguyên bằng nhau thì em so sánh lần lượt hàng phần mười, hàng phần trăm, hàng phần nghìn.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Viết thêm hay bỏ đi chữ số 0 ở tận cùng bên phải phần thập phân, số thập phân không đổi: 7,30 = 7,3.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn số thập phân đến một hàng: em nhìn chữ số ở hàng ngay bên phải. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Làm tròn 72,135 đến', 'Được số'],
          rows: [
            ['số tự nhiên gần nhất', '72'],
            ['hàng phần mười', '72,1'],
            ['hàng phần trăm', '72,14'],
          ],
        },
      ],
    },
    {
      heading: 'Viết số đo dưới dạng số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Em viết phần lẻ thành phân số thập phân của đơn vị lớn, rồi viết thành số thập phân.',
        },
        {
          type: 'table',
          head: ['Số đo', 'Viết thành', 'Số thập phân'],
          rows: [
            ['8 mm', '8/1 000 m', '0,008 m'],
            ['500 g', '500/1 000 kg', '0,5 kg'],
            ['3 m 5 cm', '3 m và 5/100 m', '3,05 m'],
          ],
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
      problem: 'So sánh hai số 34,6 và 34,52.',
      steps: [
        'Phần nguyên đều là 34.',
        'Hàng phần mười: 6 > 5.',
        'Em không cần nhìn hàng phần trăm nữa.',
      ],
      answer: '34,6 > 34,52.',
    },
    {
      problem: 'Làm tròn số 72,135 đến hàng phần trăm.',
      steps: [
        'Hàng ngay bên phải hàng phần trăm là hàng phần nghìn. Chữ số hàng phần nghìn là 5.',
        '5 không bé hơn 5 nên làm tròn lên: chữ số 3 ở hàng phần trăm thành 4.',
        'Bỏ chữ số ở hàng phần nghìn.',
      ],
      answer: 'Làm tròn 72,135 đến hàng phần trăm được 72,14.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 12,053 đọc là gì?',
      options: [
        'Mười hai phẩy không năm mươi ba',
        'Mười hai phẩy năm mươi ba',
        'Một trăm hai mươi phẩy năm mươi ba',
        'Mười hai phẩy năm trăm ba mươi',
      ],
      answer: 0,
      hints: ['Phần thập phân có chữ số 0 ngay sau dấu phẩy. Chữ số 0 đó đọc là "không".'],
      solution:
        'Phần nguyên là 12, phần thập phân gồm các chữ số 0, 5, 3. Số 12,053 đọc là: mười hai phẩy không năm mươi ba.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chữ số của số 36,725 với hàng của nó.',
      left: ['Chữ số 3', 'Chữ số 7', 'Chữ số 2', 'Chữ số 5'],
      right: ['hàng chục', 'hàng phần mười', 'hàng phần trăm', 'hàng phần nghìn', 'hàng đơn vị'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Bên trái dấu phẩy: hàng chục, hàng đơn vị. Bên phải dấu phẩy: hàng phần mười, phần trăm, phần nghìn.',
      ],
      solution:
        'Trong 36,725: chữ số 3 ở hàng chục, 6 ở hàng đơn vị, 7 ở hàng phần mười, 2 ở hàng phần trăm, 5 ở hàng phần nghìn.',
    },
    {
      type: 'number',
      prompt: 'Viết số gồm 5 đơn vị, 3 phần mười và 7 phần nghìn.',
      answer: 5.307,
      hints: ['Không có phần trăm thì em viết chữ số 0 ở hàng phần trăm.'],
      solution: 'Hàng phần mười là 3, hàng phần trăm là 0, hàng phần nghìn là 7. Số đó là 5,307.',
    },
    {
      type: 'choice',
      prompt: 'Phân số thập phân 27/100 viết thành số thập phân là số nào?',
      options: ['0,27', '2,7', '0,027', '27,100'],
      answer: 0,
      hints: ['Mẫu số 100 có hai chữ số 0, nên phần thập phân có hai chữ số.'],
      solution: '27/100 = 0,27 (đọc là không phẩy hai mươi bảy).',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 4,5 ? 4,49',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Phần nguyên bằng nhau. Em so sánh chữ số hàng phần mười.'],
      solution: 'Phần nguyên đều là 4. Hàng phần mười: 5 > 4. Vậy 4,5 > 4,49.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 7,30 ? 7,3',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Bỏ chữ số 0 ở tận cùng bên phải phần thập phân thì số có thay đổi không?'],
      solution: 'Bỏ chữ số 0 ở tận cùng bên phải phần thập phân, số không đổi: 7,30 = 7,3.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ bé đến lớn.',
      items: ['5,7', '5,07', '5,71', '5,17'],
      answer: [1, 3, 0, 2],
      hints: ['Các số có cùng phần nguyên 5. Em so sánh chữ số hàng phần mười trước.'],
      solution:
        'Hàng phần mười: 0 < 1 < 7. Hai số 5,7 và 5,71 có cùng hàng phần mười, 5,7 = 5,70 < 5,71. Thứ tự: 5,07; 5,17; 5,7; 5,71.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 3,47 đến hàng phần mười được số nào?',
      options: ['3,5', '3,4', '3', '3,48'],
      answer: 0,
      hints: ['Em nhìn chữ số ở hàng phần trăm.'],
      solution:
        'Chữ số hàng phần trăm là 7, 7 > 5 nên làm tròn lên. Làm tròn 3,47 đến hàng phần mười được 3,5.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 8,615 đến số tự nhiên gần nhất.',
      answer: 9,
      hints: ['Em nhìn chữ số ở hàng phần mười.'],
      solution:
        'Chữ số hàng phần mười là 6, 6 > 5 nên làm tròn lên. Làm tròn 8,615 đến số tự nhiên gần nhất được 9.',
    },
    {
      type: 'number',
      prompt: 'Viết số thập phân thích hợp: 8 mm = ? m',
      answer: 0.008,
      unit: 'm',
      hints: ['1 m = 1 000 mm, nên 1 mm = 1/1 000 m.'],
      solution: '8 mm = 8/1 000 m = 0,008 m.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với số thập phân bằng nó.',
      left: ['17 ml', '500 g', '3 m 5 cm', '2 kg 50 g'],
      right: ['0,017 l', '0,5 kg', '3,05 m', '2,05 kg', '3,5 m'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 l = 1 000 ml, 1 kg = 1 000 g, 1 m = 100 cm.'],
      solution:
        '17 ml = 17/1 000 l = 0,017 l. 500 g = 500/1 000 kg = 0,5 kg. 3 m 5 cm = 3 m và 5/100 m = 3,05 m. 2 kg 50 g = 2 kg và 50/1 000 kg = 2,05 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn chạy 60 m. An hết 10,5 giây, Bình hết 9,85 giây, Chi hết 10,05 giây. Bạn nào chạy nhanh nhất?',
      options: ['Bình', 'An', 'Chi'],
      answer: 0,
      hints: [
        'Chạy cùng quãng đường, bạn nào hết ít thời gian nhất thì chạy nhanh nhất. Em tìm số bé nhất.',
      ],
      solution:
        '9,85 có phần nguyên 9 nên bé nhất. Bình hết ít thời gian nhất, vậy Bình chạy nhanh nhất.',
    },
  ],
  takeaways: [
    'Số thập phân gồm phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy.',
    'Sau dấu phẩy là hàng phần mười, phần trăm, phần nghìn.',
    'So sánh: phần nguyên trước, rồi lần lượt từng hàng sau dấu phẩy.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
