/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập số tự nhiên: đọc, viết số, viết số thành tổng, giá trị của chữ số, dãy số tự nhiên, số chẵn, số lẻ, so sánh, sắp xếp và làm tròn số.',
  intro:
    'Cả năm học, em đã làm quen với các số rất lớn, đến lớp triệu. Hôm nay em ôn lại cách đọc, viết, so sánh và làm tròn số. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết các số tự nhiên; viết số thành tổng các hàng.',
    'Nêu được giá trị của mỗi chữ số trong một số.',
    'Nhận biết dãy số tự nhiên, số chẵn, số lẻ, các số liên tiếp.',
    'So sánh, sắp xếp các số; tìm số lớn nhất, số bé nhất.',
    'Làm tròn số đến hàng nghìn, hàng chục nghìn, hàng trăm nghìn.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số và giá trị của chữ số',
      blocks: [
        {
          type: 'table',
          head: ['Lớp', 'Các hàng', 'Chữ số của 7 308 054'],
          rows: [
            ['Lớp triệu', 'trăm triệu, chục triệu, triệu', '7'],
            ['Lớp nghìn', 'trăm nghìn, chục nghìn, nghìn', '3, 0, 8'],
            ['Lớp đơn vị', 'trăm, chục, đơn vị', '0, 5, 4'],
          ],
        },
        {
          type: 'p',
          text: 'Số 7 308 054 đọc là: bảy triệu ba trăm linh tám nghìn không trăm năm mươi tư.',
        },
        {
          type: 'p',
          text: 'Viết số thành tổng: 7 308 054 = 7 000 000 + 300 000 + 8 000 + 50 + 4.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Giá trị của một chữ số phụ thuộc vào hàng của nó. Chữ số 8 trong số 7 308 054 ở hàng nghìn, có giá trị là 8 000.',
        },
      ],
    },
    {
      heading: 'Dãy số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Các số 0, 1, 2, 3, 4, 5, ... là các số tự nhiên. Xếp chúng theo thứ tự từ bé đến lớn, ta được dãy số tự nhiên.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số tự nhiên bé nhất là 0. Không có số tự nhiên lớn nhất.',
        },
        {
          type: 'table',
          head: ['Trong dãy số tự nhiên', 'Hơn kém nhau', 'Ví dụ'],
          rows: [
            ['Hai số liên tiếp', '1 đơn vị', '2 024; 2 025'],
            ['Hai số chẵn liên tiếp', '2 đơn vị', '2 024; 2 026'],
            ['Hai số lẻ liên tiếp', '2 đơn vị', '2 025; 2 027'],
          ],
        },
        {
          type: 'p',
          text: 'Số chẵn có chữ số hàng đơn vị là 0, 2, 4, 6, 8. Số lẻ có chữ số hàng đơn vị là 1, 3, 5, 7, 9.',
        },
      ],
    },
    {
      heading: 'So sánh và làm tròn số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào có nhiều chữ số hơn thì lớn hơn. Hai số có cùng số chữ số: em so sánh từng cặp chữ số ở cùng hàng, kể từ trái sang phải.',
        },
        {
          type: 'p',
          text: 'Số dân của Việt Nam lúc 0 giờ ngày 1 tháng 4 năm 2019 là 96 208 984 người.',
        },
        {
          type: 'table',
          head: ['Làm tròn 96 208 984 đến', 'Nhìn chữ số hàng', 'Được số'],
          rows: [
            ['hàng nghìn', 'trăm: 9 > 5, làm tròn lên', '96 209 000'],
            ['hàng chục nghìn', 'nghìn: 8 > 5, làm tròn lên', '96 210 000'],
            ['hàng trăm nghìn', 'chục nghìn: 0 < 5, làm tròn xuống', '96 200 000'],
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
      problem:
        'Số học sinh của bốn trường tiểu học Nguyễn Trãi, Quang Trung, Nguyễn Du, Lê Lợi là 2 065, 1 892, 2 131, 1 868. Trường Nguyễn Trãi có nhiều học sinh nhất, trường Quang Trung có nhiều học sinh hơn trường Nguyễn Du, số học sinh trường Lê Lợi là số lẻ. Mỗi trường có bao nhiêu học sinh?',
      steps: [
        'Số lớn nhất là 2 131, nên trường Nguyễn Trãi có 2 131 học sinh.',
        'Trong ba số còn lại, chỉ 2 065 là số lẻ, nên trường Lê Lợi có 2 065 học sinh.',
        'Còn 1 892 và 1 868. Vì 1 892 > 1 868 nên trường Quang Trung có 1 892 học sinh, trường Nguyễn Du có 1 868 học sinh.',
      ],
      answer:
        'Nguyễn Trãi: 2 131; Lê Lợi: 2 065; Quang Trung: 1 892; Nguyễn Du: 1 868 học sinh. Xếp từ bé đến lớn: 1 868; 1 892; 2 065; 2 131.',
    },
    {
      problem:
        'Từ bốn thẻ số 0, 1, 2, 3, lập số chẵn bé nhất có bốn chữ số (mỗi thẻ dùng một lần).',
      steps: [
        'Chữ số hàng nghìn không thể là 0, nên chữ số bé nhất đặt được ở hàng nghìn là 1.',
        'Hàng trăm đặt chữ số bé nhất còn lại là 0.',
        'Còn 2 và 3. Số phải chẵn nên hàng đơn vị là 2, hàng chục là 3.',
      ],
      answer: 'Số chẵn bé nhất là 1 032.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 7 308 054 đọc là gì?',
      options: [
        'Bảy triệu ba trăm linh tám nghìn không trăm năm mươi tư',
        'Bảy triệu ba trăm tám mươi nghìn không trăm năm mươi tư',
        'Bảy trăm ba mươi triệu tám nghìn không trăm năm mươi tư',
        'Bảy triệu ba trăm linh tám nghìn năm trăm bốn mươi',
      ],
      answer: 0,
      hints: ['Em tách số thành ba lớp: 7 | 308 | 054.'],
      solution:
        'Lớp triệu là 7, lớp nghìn là 308, lớp đơn vị là 054. Số 7 308 054 đọc là: bảy triệu ba trăm linh tám nghìn không trăm năm mươi tư.',
    },
    {
      type: 'number',
      prompt: '40 000 + 5 000 + 80 + 6 = ?',
      answer: 45086,
      hints: [
        'Số có năm chữ số, hàng chục nghìn là 4.',
        'Tổng không có hàng trăm, em viết chữ số 0 ở hàng trăm.',
      ],
      solution: '40 000 + 5 000 + 80 + 6 = 45 086.',
    },
    {
      type: 'choice',
      prompt: '653 940 = 600 000 + 50 000 + 3 000 + ? + 40. Số nào thay cho dấu "?"',
      options: ['900', '9 000', '90', '9'],
      answer: 0,
      hints: ['Chữ số 9 đứng ở hàng nào của số 653 940?'],
      solution:
        'Chữ số 9 ở hàng trăm, có giá trị 900. Vậy 653 940 = 600 000 + 50 000 + 3 000 + 900 + 40.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chữ số 6 với giá trị của nó.',
      left: [
        'Chữ số 6 trong 86 152',
        'Chữ số 6 trong 3 645 210',
        'Chữ số 6 trong 1 936',
        'Chữ số 6 trong 960 513',
      ],
      right: ['6 000', '600 000', '6', '60 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tìm hàng của chữ số 6 trong từng số, kể từ hàng đơn vị bên phải.'],
      solution:
        'Trong 86 152, chữ số 6 ở hàng nghìn: 6 000. Trong 3 645 210, ở hàng trăm nghìn: 600 000. Trong 1 936, ở hàng đơn vị: 6. Trong 960 513, ở hàng chục nghìn: 60 000.',
    },
    {
      type: 'choice',
      prompt: 'Trong dãy số tự nhiên, hai số chẵn liên tiếp hơn kém nhau mấy đơn vị?',
      options: ['2 đơn vị', '1 đơn vị', '3 đơn vị', '10 đơn vị'],
      answer: 0,
      hints: ['Thử với hai số chẵn liên tiếp 10 và 12.'],
      solution: 'Ví dụ 10 và 12: 12 − 10 = 2. Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.',
    },
    {
      type: 'number',
      prompt: 'Bốn số lẻ liên tiếp: 2 021; 2 023; ?; 2 027. Số nào thay cho dấu "?"',
      answer: 2025,
      hints: ['Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.'],
      solution: '2 023 + 2 = 2 025. Bốn số lẻ liên tiếp là 2 021; 2 023; 2 025; 2 027.',
    },
    {
      type: 'choice',
      prompt: 'Câu nào đúng?',
      options: [
        'Số tự nhiên bé nhất là 0.',
        'Số tự nhiên bé nhất là 1.',
        'Số tự nhiên lớn nhất là 999 999 999.',
        'Hai số lẻ liên tiếp hơn kém nhau 1 đơn vị.',
      ],
      answer: 0,
      hints: ['Dãy số tự nhiên bắt đầu từ số nào? Thêm 1 vào một số thì được số nào?'],
      solution:
        'Dãy số tự nhiên bắt đầu từ 0, nên số tự nhiên bé nhất là 0. Thêm 1 vào số nào cũng được số lớn hơn, nên không có số tự nhiên lớn nhất. Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.',
    },
    {
      type: 'choice',
      prompt:
        'Bốn con voi cân nặng: con A 4 850 kg, con B 2 995 kg, con C 4 920 kg, con D 3 527 kg. Con voi nào nặng nhất?',
      options: ['Con C', 'Con A', 'Con B', 'Con D'],
      answer: 0,
      hints: ['Các số đều có bốn chữ số. Em so sánh hàng nghìn, rồi đến hàng trăm.'],
      solution: '2 995 kg < 3 527 kg < 4 850 kg < 4 920 kg. Con voi C nặng nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Giá bốn chiếc xe đạp: xe A 5 350 000 đồng, xe B 4 900 000 đồng, xe C 5 700 000 đồng, xe D 4 550 000 đồng. Xe nào có giá tiền thấp nhất?',
      options: ['Xe D', 'Xe A', 'Xe B', 'Xe C'],
      answer: 0,
      hints: ['Các số đều có bảy chữ số. Em so sánh hàng triệu, rồi đến hàng trăm nghìn.'],
      solution:
        '4 550 000 đồng < 4 900 000 đồng < 5 350 000 đồng < 5 700 000 đồng. Xe đạp D có giá tiền thấp nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Số dân của Việt Nam năm 2019 là 96 208 984 người. Làm tròn đến hàng chục nghìn, số dân có khoảng bao nhiêu người?',
      options: ['96 210 000', '96 200 000', '96 209 000', '96 300 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng nghìn.'],
      solution:
        'Chữ số hàng nghìn là 8, 8 > 5 nên làm tròn lên. Làm tròn đến hàng chục nghìn được 96 210 000 người.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp số học sinh của bốn trường theo thứ tự từ bé đến lớn.',
      items: ['2 065', '1 892', '2 131', '1 868'],
      answer: [3, 1, 0, 2],
      hints: ['Em so sánh hàng nghìn trước, rồi đến hàng trăm, hàng chục.'],
      solution: 'Xếp từ bé đến lớn: 1 868; 1 892; 2 065; 2 131.',
    },
    {
      type: 'number',
      prompt:
        'Từ bốn thẻ số 0, 1, 2, 3, lập được số chẵn bé nhất có bốn chữ số (mỗi thẻ dùng một lần) là số nào?',
      answer: 1032,
      hints: [
        'Chữ số hàng nghìn không thể là 0.',
        'Số chẵn có chữ số hàng đơn vị là 0, 2, 4, 6, 8.',
      ],
      solution:
        'Hàng nghìn là 1, hàng trăm là 0. Còn 2 và 3; số chẵn nên hàng đơn vị là 2. Số cần tìm là 1 032.',
    },
  ],
  takeaways: [
    'Mỗi lớp có ba hàng: lớp đơn vị, lớp nghìn, lớp triệu. Giá trị của chữ số phụ thuộc vào hàng của nó.',
    'Số tự nhiên bé nhất là 0, không có số tự nhiên lớn nhất.',
    'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị; hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
