/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đọc, viết số tự nhiên đến lớp triệu; hàng và lớp, giá trị của chữ số; số chẵn, số lẻ; so sánh, sắp xếp số và làm tròn số.',
  intro:
    'Rô-bốt viết ngày Nhà giáo Việt Nam 20/11/2024 thành một số: 20 112 024. Em đọc số này thế nào? Mỗi chữ số 2 trong số đó có giá trị bao nhiêu? Cùng ôn lại số tự nhiên nhé!',
  objectives: [
    'Đọc, viết được số tự nhiên đến lớp triệu.',
    'Nêu được hàng, lớp và giá trị của mỗi chữ số; viết được số thành tổng.',
    'Nhận biết số chẵn, số lẻ; so sánh, sắp xếp và làm tròn được số tự nhiên.',
  ],
  sections: [
    {
      heading: 'Hàng và lớp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ba hàng làm thành một lớp. Lớp đơn vị gồm hàng đơn vị, hàng chục, hàng trăm. Lớp nghìn gồm hàng nghìn, hàng chục nghìn, hàng trăm nghìn. Lớp triệu gồm hàng triệu, hàng chục triệu, hàng trăm triệu.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['20 112 024', 'hai mươi triệu một trăm mười hai nghìn không trăm hai mươi tư'],
            ['1 730 539', 'một triệu bảy trăm ba mươi nghìn năm trăm ba mươi chín'],
            ['26 400 500', 'hai mươi sáu triệu bốn trăm nghìn năm trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc số: em tách số thành từng lớp, đọc từ trái sang phải. Đọc xong mỗi lớp thì đọc tên lớp đó.',
        },
      ],
    },
    {
      heading: 'Giá trị của chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Giá trị của một chữ số phụ thuộc vào hàng của nó.',
        },
        {
          type: 'p',
          text: 'Trong số 20 112 024, chữ số 2 ở hàng chục triệu có giá trị 20 000 000. Chữ số 2 ở hàng nghìn có giá trị 2 000. Chữ số 2 ở hàng chục có giá trị 20.',
        },
        {
          type: 'p',
          text: 'Viết số thành tổng: 504 842 = 500 000 + 4 000 + 800 + 40 + 2.',
        },
      ],
    },
    {
      heading: 'Số chẵn, số lẻ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số có chữ số hàng đơn vị là 0, 2, 4, 6, 8 là số chẵn. Số có chữ số hàng đơn vị là 1, 3, 5, 7, 9 là số lẻ.',
        },
        {
          type: 'p',
          text: 'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị. Ví dụ: 2 028, 2 030, 2 032 là ba số chẵn liên tiếp.',
        },
      ],
    },
    {
      heading: 'So sánh và làm tròn số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào có ít chữ số hơn thì bé hơn. Hai số có cùng số chữ số thì so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải.',
        },
        {
          type: 'p',
          text: '2 873 và 2 837: hàng nghìn, hàng trăm giống nhau. Ở hàng chục: 7 > 3. Vậy 2 873 > 2 837.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn số: em nhìn chữ số ở hàng ngay bên phải. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'p',
          text: '2 545 000 làm tròn đến hàng chục nghìn được 2 550 000, vì chữ số hàng nghìn là 5. Làm tròn đến hàng trăm nghìn được 2 500 000, vì chữ số hàng chục nghìn là 4.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẻ vào bảng hàng và lớp',
    instruction:
      'Em đọc tên số. Em kéo thẻ chữ số vào từng cột, hoặc chạm thẻ rồi chạm cột. Bảng sẽ đọc số, viết số thành tổng, cho biết số chẵn hay lẻ và làm tròn số.',
  },
  examples: [
    {
      problem: 'Viết số gồm 3 triệu, 4 chục nghìn, 5 trăm và 2 đơn vị. Đọc số đó.',
      steps: [
        'Số có 3 triệu, 0 trăm nghìn, 4 chục nghìn, 0 nghìn, 5 trăm, 0 chục, 2 đơn vị.',
        'Viết từ trái sang phải: 3 040 502.',
        'Tách lớp: 3 | 040 | 502. Đọc từng lớp kèm tên lớp.',
      ],
      answer: '3 040 502, đọc là ba triệu không trăm bốn mươi nghìn năm trăm linh hai.',
    },
    {
      problem: 'Nêu giá trị của chữ số 7 trong số 1 730 539.',
      steps: ['Tách lớp: 1 | 730 | 539.', 'Chữ số 7 đứng ở hàng trăm nghìn của lớp nghìn.'],
      answer: 'Chữ số 7 có giá trị 700 000.',
    },
    {
      problem: 'Làm tròn số 863 749 đến hàng trăm nghìn.',
      steps: [
        'Hàng ngay bên phải hàng trăm nghìn là hàng chục nghìn, có chữ số 6.',
        'Vì 6 > 5 nên làm tròn lên.',
      ],
      answer: '863 749 làm tròn đến hàng trăm nghìn được 900 000.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Em nối cách đọc với số.',
      left: [
        'Hai mươi sáu triệu bốn trăm nghìn năm trăm',
        'Một triệu bảy trăm ba mươi nghìn năm trăm ba mươi chín',
        'Năm trăm linh bốn nghìn tám trăm bốn mươi hai',
        'Hai mươi triệu một trăm mười hai nghìn không trăm hai mươi tư',
      ],
      right: ['26 400 500', '1 730 539', '504 842', '20 112 024', '26 040 500'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em tách số thành từng lớp, mỗi lớp ba chữ số tính từ bên phải.',
        '"Bốn trăm nghìn" cho biết lớp nghìn là 400.',
      ],
      solution:
        'Hai mươi sáu triệu bốn trăm nghìn năm trăm: 26 400 500. Một triệu bảy trăm ba mươi nghìn năm trăm ba mươi chín: 1 730 539. Năm trăm linh bốn nghìn tám trăm bốn mươi hai: 504 842. Hai mươi triệu một trăm mười hai nghìn không trăm hai mươi tư: 20 112 024.',
    },
    {
      type: 'number',
      prompt: '504 842 = 500 000 + 4 000 + ? + 40 + 2. Số còn thiếu là số nào?',
      answer: 800,
      hints: ['Chữ số hàng trăm của 504 842 là 8.'],
      solution: '504 842 có 8 trăm. Số còn thiếu là 800.',
    },
    {
      type: 'number',
      prompt: '1 730 539 = 1 000 000 + ? + 30 000 + 500 + 30 + 9. Số còn thiếu là số nào?',
      answer: 700000,
      hints: ['Chữ số 7 đứng ở hàng nào?'],
      solution: 'Chữ số 7 ở hàng trăm nghìn, có giá trị 700 000. Số còn thiếu là 700 000.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 20 112 024, chữ số 2 đầu tiên bên trái có giá trị là bao nhiêu?',
      options: ['20 000 000', '2 000 000', '2 000', '20'],
      answer: 0,
      hints: ['Số 20 112 024 có tám chữ số. Chữ số đầu tiên bên trái ở hàng chục triệu.'],
      solution: 'Chữ số 2 đầu tiên ở hàng chục triệu nên có giá trị 20 000 000.',
    },
    {
      type: 'number',
      prompt: 'Em viết số gồm 3 triệu, 4 chục nghìn, 5 trăm và 2 đơn vị.',
      answer: 3040502,
      hints: ['Hàng nào không có thì viết chữ số 0: trăm nghìn, nghìn, chục.'],
      solution:
        'Số gồm 3 triệu, 0 trăm nghìn, 4 chục nghìn, 0 nghìn, 5 trăm, 0 chục, 2 đơn vị: 3 040 502.',
    },
    {
      type: 'number',
      prompt: 'Ba số chẵn liên tiếp: 2 028, ?, 2 032. Số ở giữa là số nào?',
      answer: 2030,
      hints: ['Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.'],
      solution: '2 028 + 2 = 2 030 và 2 030 + 2 = 2 032. Số ở giữa là 2 030.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các số lẻ.',
      options: ['1 730 539', '20 112 024', '863 749', '26 400 500', '3 040 505'],
      answers: [0, 2, 4],
      hints: ['Em chỉ cần nhìn chữ số hàng đơn vị.'],
      solution:
        '1 730 539 (tận cùng 9), 863 749 (tận cùng 9) và 3 040 505 (tận cùng 5) là số lẻ. 20 112 024 và 26 400 500 là số chẵn.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: 9 999 999 ? 10 000 000',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đếm số chữ số của mỗi số.'],
      solution: '9 999 999 có bảy chữ số, 10 000 000 có tám chữ số. Vậy 9 999 999 < 10 000 000.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['2 354 687', '2 345 678', '2 354 678', '2 345 768'],
      answer: 0,
      hints: ['Bốn số có cùng hàng triệu. Em so sánh hàng trăm nghìn, rồi hàng chục nghìn.'],
      solution:
        '2 354 687 và 2 354 678 có hàng chục nghìn là 5, lớn hơn hai số còn lại. So sánh hai số này: ở hàng chục 8 > 7. Vậy số lớn nhất là 2 354 687.',
    },
    {
      type: 'order',
      prompt:
        'Số sản phẩm một cửa hàng bán được: năm 2020 là 2 873, năm 2021 là 2 837, năm 2022 là 3 293, năm 2023 là 3 018. Em xếp các năm theo số sản phẩm từ ít đến nhiều.',
      items: ['Năm 2020', 'Năm 2021', 'Năm 2022', 'Năm 2023'],
      answer: [1, 0, 3, 2],
      hints: [
        '2 873 và 2 837 có ít nghìn hơn 3 293 và 3 018.',
        'So sánh 2 873 và 2 837 ở hàng chục.',
      ],
      solution:
        '2 837 < 2 873 < 3 018 < 3 293. Từ ít đến nhiều: năm 2021, năm 2020, năm 2023, năm 2022.',
    },
    {
      type: 'number',
      prompt: 'Cửa hàng thu được 2 545 000 đồng. Làm tròn số tiền đó đến hàng chục nghìn.',
      answer: 2550000,
      unit: 'đồng',
      hints: ['Em nhìn chữ số hàng nghìn của 2 545 000.'],
      solution:
        'Chữ số hàng nghìn là 5, nên làm tròn lên: 2 545 000 làm tròn đến hàng chục nghìn được 2 550 000 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 26 450 000 đến hàng trăm nghìn ta được số nào?',
      options: ['26 500 000', '26 400 000', '26 000 000', '26 450 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng chục nghìn của 26 450 000.'],
      solution: 'Chữ số hàng chục nghìn là 5, nên làm tròn lên: được 26 500 000.',
    },
    {
      type: 'number',
      prompt: 'Có sáu thẻ số 8, 6, 3, 7, 4, 9. Em dùng cả sáu thẻ để lập số lẻ lớn nhất.',
      answer: 987643,
      hints: [
        'Số lẻ có chữ số hàng đơn vị lẻ. Em để chữ số lẻ bé nhất ở hàng đơn vị.',
        'Các thẻ còn lại em xếp từ lớn đến bé.',
      ],
      solution:
        'Các chữ số lẻ là 3, 7, 9. Đặt 3 ở hàng đơn vị để giữ chữ số lớn cho hàng cao. Năm thẻ còn lại xếp từ lớn đến bé: 9, 8, 7, 6, 4. Số lẻ lớn nhất là 987 643.',
    },
  ],
  takeaways: [
    'Ba hàng làm thành một lớp: lớp đơn vị, lớp nghìn, lớp triệu.',
    'Giá trị của chữ số phụ thuộc vào hàng của nó.',
    'Số chẵn tận cùng là 0, 2, 4, 6, 8; số lẻ tận cùng là 1, 3, 5, 7, 9.',
    'Làm tròn: chữ số bên phải bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
