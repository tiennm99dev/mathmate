/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số thập phân: viết phân số thập phân thành số thập phân, phần nguyên và phần thập phân, các hàng phần mười, phần trăm, phần nghìn, đọc và viết số thập phân.',
  intro:
    'Một thước mét chia thành 10 đề-xi-mét. 1 dm là một phần mười mét, viết là 0,1 m. Những số có dấu phẩy như 0,1 hay 2,7 gọi là số thập phân.',
  objectives: [
    'Viết được phân số thập phân thành số thập phân.',
    'Nhận biết phần nguyên, phần thập phân của số thập phân.',
    'Biết các hàng phần mười, phần trăm, phần nghìn.',
    'Đọc, viết được số thập phân.',
  ],
  sections: [
    {
      heading: 'Phần mười, phần trăm, phần nghìn',
      blocks: [
        {
          type: 'table',
          head: ['Độ dài', 'Phân số thập phân', 'Số thập phân'],
          rows: [
            ['1 dm', '$\\dfrac{1}{10}$ m', '0,1 m'],
            ['1 cm', '$\\dfrac{1}{100}$ m', '0,01 m'],
            ['1 mm', '$\\dfrac{1}{1000}$ m', '0,001 m'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '$\\dfrac{1}{10}$ viết thành 0,1; $\\dfrac{1}{100}$ viết thành 0,01; $\\dfrac{1}{1000}$ viết thành 0,001. Các số 0,1; 0,01; 0,001 là số thập phân.',
        },
        {
          type: 'table',
          head: ['Số thập phân', 'Đọc là'],
          rows: [
            ['0,1', 'không phẩy một'],
            ['0,01', 'không phẩy không một'],
            ['0,001', 'không phẩy không không một'],
          ],
        },
        {
          type: 'p',
          text: 'Tương tự: $\\dfrac{5}{10}$ = 0,5; $\\dfrac{7}{100}$ = 0,07; $\\dfrac{9}{1000}$ = 0,009.',
        },
      ],
    },
    {
      heading: 'Phần nguyên và phần thập phân',
      blocks: [
        {
          type: 'p',
          text: '2 m 7 dm = $2\\dfrac{7}{10}$ m, viết thành 2,7 m. 8 m 56 cm = $8\\dfrac{56}{100}$ m, viết thành 8,56 m.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mỗi số thập phân gồm hai phần: phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy. Các chữ số bên trái dấu phẩy thuộc phần nguyên. Các chữ số bên phải dấu phẩy thuộc phần thập phân.',
        },
        {
          type: 'table',
          head: ['Số thập phân', 'Phần nguyên', 'Phần thập phân'],
          rows: [
            ['8,56', '8', '56'],
            ['2,7', '2', '7'],
            ['5,07', '5', '07'],
            ['0,195', '0', '195'],
          ],
        },
      ],
    },
    {
      heading: 'Hàng của số thập phân',
      blocks: [
        {
          type: 'table',
          head: ['Trăm', 'Chục', 'Đơn vị', ',', 'Phần mười', 'Phần trăm', 'Phần nghìn'],
          rows: [['3', '7', '5', ',', '4', '0', '6']],
          caption: 'Số 375,406 trong bảng hàng',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi đơn vị của một hàng bằng 10 đơn vị của hàng thấp hơn liền sau. Một phần mười bằng 10 phần trăm, một phần trăm bằng 10 phần nghìn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn đọc số thập phân, em đọc phần nguyên, đọc dấu phẩy (phẩy), rồi đọc phần thập phân. Muốn viết số thập phân, em viết phần nguyên, viết dấu phẩy, rồi viết phần thập phân.',
        },
        {
          type: 'p',
          text: '375,406 đọc là: ba trăm bảy mươi lăm phẩy bốn trăm linh sáu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thước phóng to',
    instruction:
      'Em chạm vào khoảng chứa số trên thước. Khoảng đó được phóng to và chia thành 10 phần bằng nhau. Cứ thế cho đến khi em chạm đúng vạch của số.',
  },
  examples: [
    {
      problem: 'Viết 2 m 7 dm thành số đo có đơn vị là mét.',
      steps: ['7 dm = $\\dfrac{7}{10}$ m.', '2 m 7 dm = $2\\dfrac{7}{10}$ m = 2,7 m.'],
      answer: '2 m 7 dm = 2,7 m.',
    },
    {
      problem: 'Đọc số 25,08. Nêu phần nguyên và phần thập phân của nó.',
      steps: [
        'Bên trái dấu phẩy là 25: phần nguyên là 25.',
        'Bên phải dấu phẩy là 08: phần thập phân là 08.',
        'Đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân.',
      ],
      answer: '25,08 đọc là: hai mươi lăm phẩy không tám.',
    },
    {
      problem: 'Viết số thập phân gồm 6 đơn vị, 3 phần mười và 9 phần trăm.',
      steps: [
        'Phần nguyên có 6 đơn vị: viết 6.',
        'Sau dấu phẩy: hàng phần mười là 3, hàng phần trăm là 9.',
      ],
      answer: 'Số đó là 6,39.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 25,08 có phần nguyên là bao nhiêu?',
      options: ['25', '08', '2', '2 508'],
      answer: 0,
      hints: ['Phần nguyên là các chữ số bên trái dấu phẩy.'],
      solution: 'Bên trái dấu phẩy là 25, nên phần nguyên là 25.',
    },
    {
      type: 'choice',
      prompt: 'Số 5,07 có phần thập phân là bao nhiêu?',
      options: ['07', '5', '70', '507'],
      answer: 0,
      hints: ['Phần thập phân là các chữ số bên phải dấu phẩy.'],
      solution: 'Bên phải dấu phẩy là 07, nên phần thập phân là 07.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phân số thập phân với số thập phân bằng nó.',
      left: ['$\\dfrac{7}{10}$', '$\\dfrac{7}{100}$', '$\\dfrac{7}{1000}$', '$\\dfrac{27}{100}$'],
      right: ['0,7', '0,07', '0,007', '0,27', '2,7'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Mẫu số 10: một chữ số sau dấu phẩy. Mẫu số 100: hai chữ số. Mẫu số 1 000: ba chữ số.',
      ],
      solution:
        '$\\dfrac{7}{10}$ = 0,7; $\\dfrac{7}{100}$ = 0,07; $\\dfrac{7}{1000}$ = 0,007; $\\dfrac{27}{100}$ = 0,27.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với cách đọc của nó.',
      left: ['2,47', '0,05', '3,08', '105,5'],
      right: [
        'hai phẩy bốn mươi bảy',
        'không phẩy không năm',
        'ba phẩy không tám',
        'một trăm linh năm phẩy năm',
        'ba phẩy tám',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Chữ số 0 đứng ngay sau dấu phẩy đọc là "không".'],
      solution:
        '2,47: hai phẩy bốn mươi bảy. 0,05: không phẩy không năm. 3,08: ba phẩy không tám. 105,5: một trăm linh năm phẩy năm.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 13,465, chữ số 6 thuộc hàng nào?',
      options: ['Hàng phần trăm', 'Hàng phần mười', 'Hàng phần nghìn', 'Hàng đơn vị'],
      answer: 0,
      hints: ['Sau dấu phẩy, các hàng lần lượt là: phần mười, phần trăm, phần nghìn.'],
      solution: '13,465: 4 ở hàng phần mười, 6 ở hàng phần trăm, 5 ở hàng phần nghìn.',
    },
    {
      type: 'choice',
      prompt: '2 m 7 dm = ? m',
      options: ['2,7', '2,07', '27', '0,27'],
      answer: 0,
      hints: ['7 dm là mấy phần mười mét?'],
      solution: '7 dm = $\\dfrac{7}{10}$ m, nên 2 m 7 dm = $2\\dfrac{7}{10}$ m = 2,7 m.',
    },
    {
      type: 'choice',
      prompt: '8 m 56 cm = ? m',
      options: ['8,56', '8,056', '85,6', '8,6'],
      answer: 0,
      hints: ['56 cm là mấy phần trăm mét?'],
      solution: '56 cm = $\\dfrac{56}{100}$ m, nên 8 m 56 cm = $8\\dfrac{56}{100}$ m = 8,56 m.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{3}{10}$ thành số thập phân.',
      answer: 0.3,
      hints: ['$\\dfrac{1}{10}$ viết là 0,1.'],
      solution: '$\\dfrac{3}{10}$ là 3 phần mười, viết là 0,3.',
    },
    {
      type: 'choice',
      prompt: 'Số thập phân gồm 5 đơn vị, 2 phần mười và 9 phần trăm là số nào?',
      options: ['5,29', '5,92', '52,9', '5,029'],
      answer: 0,
      hints: ['Viết phần nguyên, dấu phẩy, rồi hàng phần mười, hàng phần trăm.'],
      solution: 'Phần nguyên 5, hàng phần mười 2, hàng phần trăm 9: số đó là 5,29.',
    },
    {
      type: 'number',
      prompt: 'Một phần mười bằng bao nhiêu phần trăm?',
      answer: 10,
      hints: ['Mỗi đơn vị của một hàng bằng 10 đơn vị của hàng thấp hơn liền sau.'],
      solution: '$\\dfrac{1}{10} = \\dfrac{10}{100}$, nên một phần mười bằng 10 phần trăm.',
    },
  ],
  takeaways: [
    '$\\dfrac{1}{10}$ = 0,1; $\\dfrac{1}{100}$ = 0,01; $\\dfrac{1}{1000}$ = 0,001.',
    'Số thập phân có phần nguyên (bên trái dấu phẩy) và phần thập phân (bên phải dấu phẩy).',
    'Sau dấu phẩy là hàng phần mười, phần trăm, phần nghìn.',
    'Đọc: phần nguyên, "phẩy", phần thập phân.',
  ],
};
