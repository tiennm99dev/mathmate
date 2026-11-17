/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tỉ số của a và b là a : b hay a/b (b khác 0). Tỉ số phần trăm: 25 : 100 hay 25/100 viết là 25%, đọc là hai mươi lăm phần trăm.',
  intro:
    'Trong hộp có 5 viên bi đỏ và 3 viên bi xanh. Số bi đỏ so với số bi xanh thế nào? Em dùng tỉ số để so sánh hai số. Tỉ số có mẫu số 100 còn có cách viết riêng: tỉ số phần trăm.',
  objectives: [
    'Hiểu và viết được tỉ số của hai số.',
    'Nhận biết, đọc và viết được tỉ số phần trăm.',
    'Viết được một phân số thành tỉ số phần trăm.',
  ],
  sections: [
    {
      heading: 'Tỉ số của hai số',
      blocks: [
        {
          type: 'p',
          text: 'Trong hộp có 5 viên bi đỏ và 3 viên bi xanh.',
        },
        {
          type: 'p',
          text: 'Tỉ số của số bi đỏ và số bi xanh là 5 : 3 hay $\\dfrac{5}{3}$.',
        },
        {
          type: 'p',
          text: 'Tỉ số của số bi xanh và số bi đỏ là 3 : 5 hay $\\dfrac{3}{5}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Tỉ số của a và b là a : b hay $\\dfrac{a}{b}$ (b khác 0).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Tỉ số của a và b khác tỉ số của b và a. Số nói trước viết trước. Tỉ số không kèm đơn vị: tỉ số của 3 m và 6 m là 3 : 6.',
        },
      ],
    },
    {
      heading: 'Tỉ số phần trăm',
      blocks: [
        {
          type: 'p',
          text: 'Một vườn hoa rộng 100 m², trong đó 25 m² trồng hoa hồng.',
        },
        {
          type: 'p',
          text: 'Tỉ số của diện tích trồng hoa hồng và diện tích vườn hoa là 25 : 100 hay $\\dfrac{25}{100}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ta viết $\\dfrac{25}{100}$ = 25%, đọc là: hai mươi lăm phần trăm. Kí hiệu % đọc là "phần trăm".',
        },
        {
          type: 'p',
          text: 'Tỉ số phần trăm của diện tích trồng hoa hồng và diện tích vườn hoa là 25%.',
        },
        {
          type: 'table',
          head: ['Tỉ số', 'Tỉ số phần trăm', 'Đọc là'],
          rows: [
            ['$\\dfrac{7}{100}$', '7%', 'bảy phần trăm'],
            ['$\\dfrac{50}{100}$', '50%', 'năm mươi phần trăm'],
            ['$\\dfrac{100}{100}$', '100%', 'một trăm phần trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn viết một tỉ số thành tỉ số phần trăm, em viết tỉ số đó thành phân số có mẫu số 100, rồi viết tử số kèm kí hiệu %.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới 100 ô vuông',
    instruction:
      'Chạm vào một ô để tô màu đến ô đó, hoặc dùng các nút thêm, bớt. Mỗi ô là 1% của lưới. Ở chế độ "Đố em", tô đúng số phần trăm được hỏi.',
  },
  examples: [
    {
      problem:
        'Lớp 5A có 12 bạn nam và 15 bạn nữ. Viết tỉ số của số bạn nam và số bạn nữ, tỉ số của số bạn nữ và số bạn nam.',
      steps: [
        'Số bạn nam nói trước, nên tỉ số của số bạn nam và số bạn nữ là 12 : 15 hay $\\dfrac{12}{15}$.',
        'Đổi chỗ hai số: tỉ số của số bạn nữ và số bạn nam là 15 : 12 hay $\\dfrac{15}{12}$.',
      ],
      answer: '12 : 15 và 15 : 12.',
    },
    {
      problem: 'Viết $\\dfrac{3}{4}$ thành tỉ số phần trăm.',
      steps: [
        'Nhân cả tử số và mẫu số với 25 để được mẫu số 100: $\\dfrac{3}{4} = \\dfrac{3 \\times 25}{4 \\times 25} = \\dfrac{75}{100}$.',
        '$\\dfrac{75}{100}$ = 75%.',
      ],
      answer: '$\\dfrac{3}{4}$ = 75%.',
    },
    {
      problem:
        'Một trường có 400 học sinh, trong đó có 80 học sinh thích bơi lội. Tìm tỉ số phần trăm của số học sinh thích bơi lội và số học sinh cả trường.',
      steps: [
        'Tỉ số của số học sinh thích bơi lội và số học sinh cả trường là 80 : 400 hay $\\dfrac{80}{400}$.',
        'Chia cả tử số và mẫu số cho 4: $\\dfrac{80}{400} = \\dfrac{20}{100}$.',
        '$\\dfrac{20}{100}$ = 20%.',
      ],
      answer: 'Tỉ số phần trăm là 20%.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Rổ có 7 quả cam và 4 quả quýt. Tỉ số của số cam và số quýt là:',
      options: ['7 : 4', '4 : 7', '7 : 11', '11 : 4'],
      answer: 0,
      hints: ['Số nói trước (số cam) viết trước.'],
      solution: 'Số cam là 7, số quýt là 4. Tỉ số của số cam và số quýt là 7 : 4.',
    },
    {
      type: 'choice',
      prompt: 'Tỉ số của 4 và 9 là:',
      options: ['$\\dfrac{4}{9}$', '$\\dfrac{9}{4}$', '$\\dfrac{4}{13}$', '$\\dfrac{5}{9}$'],
      answer: 0,
      hints: ['Tỉ số của a và b là $\\dfrac{a}{b}$.'],
      solution: 'Tỉ số của 4 và 9 là 4 : 9 hay $\\dfrac{4}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Viết $\\dfrac{45}{100}$ thành tỉ số phần trăm.',
      options: ['45%', '4,5%', '0,45%', '450%'],
      answer: 0,
      hints: ['Mẫu số đã là 100. Em viết tử số kèm kí hiệu %.'],
      solution: '$\\dfrac{45}{100}$ = 45%.',
    },
    {
      type: 'number',
      prompt: 'Viết số thích hợp vào chỗ chấm: 27% = $\\dfrac{\\ldots}{100}$.',
      answer: 27,
      hints: ['27% nghĩa là 27 phần trăm.'],
      solution: '27% = $\\dfrac{27}{100}$. Số cần điền là 27.',
    },
    {
      type: 'number',
      prompt:
        'Một lưới có 100 ô vuông, em tô màu 38 ô. Số ô tô màu chiếm bao nhiêu phần trăm số ô của lưới?',
      answer: 38,
      unit: '%',
      hints: ['Tỉ số của số ô tô màu và số ô cả lưới là 38 : 100.'],
      solution: '38 : 100 = $\\dfrac{38}{100}$ = 38%.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{3}{5}$ thành tỉ số phần trăm.',
      answer: 60,
      unit: '%',
      hints: ['Nhân cả tử số và mẫu số với 20 để được mẫu số 100.'],
      solution: '$\\dfrac{3}{5} = \\dfrac{3 \\times 20}{5 \\times 20} = \\dfrac{60}{100}$ = 60%.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phân số với tỉ số phần trăm bằng nó.',
      left: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{4}$', '$\\dfrac{3}{10}$', '$\\dfrac{7}{20}$'],
      right: ['50%', '25%', '30%', '35%', '70%'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Viết mỗi phân số thành phân số có mẫu số 100.'],
      solution:
        '$\\dfrac{1}{2} = \\dfrac{50}{100}$ = 50%; $\\dfrac{1}{4} = \\dfrac{25}{100}$ = 25%; $\\dfrac{3}{10} = \\dfrac{30}{100}$ = 30%; $\\dfrac{7}{20} = \\dfrac{35}{100}$ = 35%.',
    },
    {
      type: 'text',
      prompt: 'Em đọc 15% như thế nào? Viết bằng chữ.',
      accept: ['mười lăm phần trăm'],
      hints: ['Đọc số 15 trước, rồi đọc kí hiệu %.'],
      solution: '15% đọc là: mười lăm phần trăm.',
    },
    {
      type: 'number',
      prompt:
        'Một đội có 20 người, trong đó có 9 người là nữ. Tìm tỉ số phần trăm của số người nữ và số người cả đội.',
      answer: 45,
      unit: '%',
      hints: ['Tỉ số là $\\dfrac{9}{20}$. Nhân cả tử số và mẫu số với 5.'],
      solution: '$\\dfrac{9}{20} = \\dfrac{9 \\times 5}{20 \\times 5} = \\dfrac{45}{100}$ = 45%.',
    },
  ],
  takeaways: [
    'Tỉ số của a và b là a : b hay $\\dfrac{a}{b}$ (b khác 0). Số nói trước viết trước.',
    'Tỉ số có mẫu số 100 viết được thành tỉ số phần trăm: $\\dfrac{25}{100}$ = 25%.',
    'Muốn viết thành tỉ số phần trăm, em đưa tỉ số về phân số có mẫu số 100.',
  ],
};
