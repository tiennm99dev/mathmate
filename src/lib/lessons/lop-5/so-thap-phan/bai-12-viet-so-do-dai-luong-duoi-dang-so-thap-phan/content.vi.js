/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Viết số đo độ dài, khối lượng, diện tích dưới dạng số thập phân: đổi phần lẻ thành phân số thập phân của đơn vị lớn rồi viết thành số thập phân.',
  intro:
    'Bút chì của em dài 1 dm 5 cm. Viết theo đề-xi-mét là bao nhiêu? Em sẽ dùng số thập phân để viết một số đo chỉ với một đơn vị: 1 dm 5 cm = 1,5 dm.',
  objectives: [
    'Viết được số đo độ dài dưới dạng số thập phân.',
    'Viết được số đo khối lượng dưới dạng số thập phân.',
    'Viết được số đo diện tích dưới dạng số thập phân.',
  ],
  sections: [
    {
      heading: 'Số đo độ dài',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong bảng đơn vị đo độ dài, hai đơn vị liền nhau hơn kém nhau 10 lần: 1 m = 10 dm, 1 dm = $\\dfrac{1}{10}$ m.',
        },
        {
          type: 'p',
          text: '6 m 4 dm = $6\\dfrac{4}{10}$ m = 6,4 m.',
        },
        {
          type: 'p',
          text: '3 m 5 cm = $3\\dfrac{5}{100}$ m = 3,05 m.',
        },
        {
          type: 'table',
          head: ['m', 'dm', 'cm'],
          rows: [['3', '0', '5']],
          caption: '3 m 5 cm = 3,05 m: dấu phẩy đặt ngay sau chữ số ở cột mét',
        },
      ],
    },
    {
      heading: 'Số đo khối lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 tấn = 10 tạ, 1 tạ = 10 yến, 1 yến = 10 kg. 1 tấn = 1 000 kg, 1 kg = 1 000 g.',
        },
        {
          type: 'p',
          text: '5 tấn 132 kg = $5\\dfrac{132}{1000}$ tấn = 5,132 tấn.',
        },
        {
          type: 'p',
          text: '5 tấn 32 kg = $5\\dfrac{32}{1000}$ tấn = 5,032 tấn.',
        },
        {
          type: 'p',
          text: '5 kg 950 g = $5\\dfrac{950}{1000}$ kg = 5,950 kg = 5,95 kg.',
        },
      ],
    },
    {
      heading: 'Số đo diện tích',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 lần: 1 m² = 100 dm², 1 dm² = $\\dfrac{1}{100}$ m².',
        },
        {
          type: 'p',
          text: '3 m² 5 dm² = $3\\dfrac{5}{100}$ m² = 3,05 m².',
        },
        {
          type: 'p',
          text: '42 dm² = $\\dfrac{42}{100}$ m² = 0,42 m².',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dung tích',
          text: '1 l = 1 000 ml, nên 1 l 125 ml = $1\\dfrac{125}{1000}$ l = 1,125 l.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng đơn vị, dời dấu phẩy',
    instruction:
      'Số đo được viết vào bảng đơn vị. Em dời dấu phẩy sang trái hoặc sang phải cho đến khi nó đứng ngay sau cột đơn vị được hỏi, rồi đọc số đo mới.',
  },
  examples: [
    {
      problem: 'Viết 8 m 56 cm dưới dạng số đo có đơn vị là mét.',
      steps: [
        '1 m = 100 cm, nên 56 cm = $\\dfrac{56}{100}$ m.',
        '8 m 56 cm = $8\\dfrac{56}{100}$ m = 8,56 m.',
      ],
      answer: '8 m 56 cm = 8,56 m.',
    },
    {
      problem: 'Viết 2 kg 50 g dưới dạng số đo có đơn vị là ki-lô-gam.',
      steps: [
        '1 kg = 1 000 g, nên 50 g = $\\dfrac{50}{1000}$ kg.',
        '2 kg 50 g = $2\\dfrac{50}{1000}$ kg = 2,050 kg = 2,05 kg.',
      ],
      answer: '2 kg 50 g = 2,05 kg.',
    },
    {
      problem: 'Viết 4 m² 18 dm² dưới dạng số đo có đơn vị là mét vuông.',
      steps: [
        '1 m² = 100 dm², nên 18 dm² = $\\dfrac{18}{100}$ m².',
        '4 m² 18 dm² = $4\\dfrac{18}{100}$ m² = 4,18 m².',
      ],
      answer: '4 m² 18 dm² = 4,18 m².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '3 m 5 cm = ? m',
      options: ['3,05', '3,5', '3,005', '35'],
      answer: 0,
      hints: ['1 m = 100 cm. 5 cm là mấy phần trăm mét?'],
      solution: '5 cm = $\\dfrac{5}{100}$ m, nên 3 m 5 cm = $3\\dfrac{5}{100}$ m = 3,05 m.',
    },
    {
      type: 'number',
      prompt: '8 m 4 cm = ? m',
      answer: 8.04,
      unit: 'm',
      hints: ['4 cm = $\\dfrac{4}{100}$ m.'],
      solution: '8 m 4 cm = $8\\dfrac{4}{100}$ m = 8,04 m.',
    },
    {
      type: 'number',
      prompt: '508 cm = ? m',
      answer: 5.08,
      unit: 'm',
      hints: ['508 cm = 500 cm + 8 cm = 5 m 8 cm.'],
      solution: '508 cm = 5 m 8 cm = $5\\dfrac{8}{100}$ m = 5,08 m.',
    },
    {
      type: 'number',
      prompt: '15 cm 9 mm = ? cm',
      answer: 15.9,
      unit: 'cm',
      hints: ['1 cm = 10 mm, nên 9 mm = $\\dfrac{9}{10}$ cm.'],
      solution: '15 cm 9 mm = $15\\dfrac{9}{10}$ cm = 15,9 cm.',
    },
    {
      type: 'number',
      prompt: '5 kg 950 g = ? kg',
      answer: 5.95,
      unit: 'kg',
      hints: ['1 kg = 1 000 g, nên 950 g = $\\dfrac{950}{1000}$ kg.'],
      solution: '5 kg 950 g = $5\\dfrac{950}{1000}$ kg = 5,950 kg = 5,95 kg.',
    },
    {
      type: 'choice',
      prompt: '5 tấn 32 kg = ? tấn',
      options: ['5,032', '5,32', '5,0032', '532'],
      answer: 0,
      hints: ['1 tấn = 1 000 kg. 32 kg là mấy phần nghìn tấn?'],
      solution:
        '32 kg = $\\dfrac{32}{1000}$ tấn, nên 5 tấn 32 kg = $5\\dfrac{32}{1000}$ tấn = 5,032 tấn.',
    },
    {
      type: 'number',
      prompt: '450 g = ? kg',
      answer: 0.45,
      unit: 'kg',
      hints: ['450 g ít hơn 1 kg, nên phần nguyên là 0.'],
      solution: '450 g = $\\dfrac{450}{1000}$ kg = 0,450 kg = 0,45 kg.',
    },
    {
      type: 'choice',
      prompt: '3 m² 5 dm² = ? m²',
      options: ['3,05', '3,5', '3,005', '305'],
      answer: 0,
      hints: ['1 m² = 100 dm², không phải 10 dm².'],
      solution: '5 dm² = $\\dfrac{5}{100}$ m², nên 3 m² 5 dm² = $3\\dfrac{5}{100}$ m² = 3,05 m².',
    },
    {
      type: 'number',
      prompt: '42 dm² = ? m²',
      answer: 0.42,
      unit: 'm²',
      hints: ['1 m² = 100 dm².'],
      solution: '42 dm² = $\\dfrac{42}{100}$ m² = 0,42 m².',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số đo với số đo bằng nó, viết theo lít.',
      left: ['1 l 125 ml', '950 ml', '1 l 85 ml', '2 l 5 ml'],
      right: ['1,125 l', '0,95 l', '1,085 l', '2,005 l', '1,85 l'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 l = 1 000 ml, nên số mi-li-lít là phần nghìn lít: ba chữ số sau dấu phẩy.'],
      solution:
        '1 l 125 ml = 1,125 l; 950 ml = 0,950 l = 0,95 l; 1 l 85 ml = 1,085 l; 2 l 5 ml = 2,005 l.',
    },
    {
      type: 'choice',
      prompt: 'Con ngỗng nặng 5 kg 950 g. Con chó nặng 6,2 kg. Con nào nặng hơn?',
      options: ['Con chó', 'Con ngỗng', 'Hai con nặng bằng nhau'],
      answer: 0,
      hints: ['Viết cân nặng con ngỗng theo ki-lô-gam rồi so sánh.'],
      solution: '5 kg 950 g = 5,95 kg. Phần nguyên 5 < 6, nên 5,95 kg < 6,2 kg. Con chó nặng hơn.',
    },
  ],
  takeaways: [
    'Đổi phần lẻ thành phân số thập phân của đơn vị lớn, rồi viết thành số thập phân.',
    'Độ dài, khối lượng: hai đơn vị liền nhau hơn kém nhau 10 lần; diện tích: 100 lần.',
    'Trên bảng đơn vị, dấu phẩy đứng ngay sau cột của đơn vị cần viết.',
  ],
};
