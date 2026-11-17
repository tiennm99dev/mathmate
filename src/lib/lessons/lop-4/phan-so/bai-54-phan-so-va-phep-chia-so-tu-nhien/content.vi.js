/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân số và phép chia số tự nhiên: thương của phép chia số tự nhiên cho số tự nhiên khác 0 viết được thành phân số, tử số là số bị chia, mẫu số là số chia; phân số lớn hơn 1, bằng 1, bé hơn 1; số tự nhiên viết thành phân số có mẫu số 1.',
  intro:
    'Có 3 cái bánh, chia đều cho 4 bạn. Mỗi bạn không được trọn 1 cái bánh. Vậy mỗi bạn được bao nhiêu cái bánh? Phân số sẽ giúp em trả lời!',
  objectives: [
    'Viết được thương của phép chia số tự nhiên cho số tự nhiên khác 0 thành phân số.',
    'Nhận biết được phân số lớn hơn 1, bằng 1, bé hơn 1.',
    'Viết được số tự nhiên thành phân số có mẫu số là 1.',
  ],
  sections: [
    {
      heading: 'Thương viết thành phân số',
      blocks: [
        {
          type: 'p',
          text: 'Có 8 quả cam, chia đều cho 4 bạn. Mỗi bạn được 8 : 4 = 2 (quả cam).',
        },
        {
          type: 'p',
          text: 'Có 3 cái bánh, chia đều cho 4 bạn. Em cắt mỗi cái bánh thành 4 phần bằng nhau, mỗi bạn lấy 1 phần của mỗi cái bánh. Mỗi bạn được 3 phần, tức là $\\dfrac{3}{4}$ cái bánh.',
        },
        { type: 'p', text: 'Ta viết: 3 : 4 = $\\dfrac{3}{4}$ (cái bánh).' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Thương của phép chia số tự nhiên cho số tự nhiên (khác 0) có thể viết thành một phân số: tử số là số bị chia, mẫu số là số chia.',
        },
        {
          type: 'table',
          head: ['Phép chia', 'Viết thành phân số'],
          rows: [
            ['3 : 4', '$\\dfrac{3}{4}$'],
            ['5 : 9', '$\\dfrac{5}{9}$'],
            ['8 : 4', '$\\dfrac{8}{4} = 2$'],
            ['0 : 3', '$\\dfrac{0}{3} = 0$'],
          ],
        },
      ],
    },
    {
      heading: 'Phân số lớn hơn 1, bằng 1, bé hơn 1',
      blocks: [
        {
          type: 'p',
          text: 'Có 5 quả cam, chia đều cho 4 bạn. Mỗi bạn được 5 : 4 = $\\dfrac{5}{4}$ (quả cam).',
        },
        {
          type: 'p',
          text: '$\\dfrac{5}{4}$ quả cam gồm 1 quả cam và $\\dfrac{1}{4}$ quả cam. Vậy $\\dfrac{5}{4}$ quả cam nhiều hơn 1 quả cam: $\\dfrac{5}{4} > 1$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phân số có tử số lớn hơn mẫu số thì lớn hơn 1. Phân số có tử số bằng mẫu số thì bằng 1. Phân số có tử số bé hơn mẫu số thì bé hơn 1.',
        },
        {
          type: 'table',
          head: ['Phân số', 'So với 1', 'Vì sao'],
          rows: [
            ['$\\dfrac{5}{4}$', '$\\dfrac{5}{4} > 1$', '5 > 4'],
            ['$\\dfrac{4}{4}$', '$\\dfrac{4}{4} = 1$', '4 = 4'],
            ['$\\dfrac{3}{4}$', '$\\dfrac{3}{4} < 1$', '3 < 4'],
          ],
        },
      ],
    },
    {
      heading: 'Số tự nhiên viết thành phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi số tự nhiên có thể viết thành một phân số có tử số là số tự nhiên đó và mẫu số bằng 1.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 3 = $\\dfrac{3}{1}$; 7 = $\\dfrac{7}{1}$; 15 = $\\dfrac{15}{1}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Mẫu số luôn khác 0, vì không chia được cho 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia bánh cho các bạn',
    instruction:
      'Em bấm − và + để chọn số cái bánh và số bạn. Mỗi cái bánh được cắt thành các phần bằng nhau, mỗi bạn một màu. Em xem phần của Mai gộp lại là bao nhiêu cái bánh, và thử trả lời câu đố.',
  },
  examples: [
    {
      problem: 'Có 2 cái bánh, chia đều cho 3 bạn. Mỗi bạn được bao nhiêu cái bánh?',
      steps: [
        'Em làm phép chia 2 : 3.',
        'Thương viết thành phân số: tử số là số bị chia 2, mẫu số là số chia 3.',
        '2 : 3 = $\\dfrac{2}{3}$. Vì 2 < 3 nên $\\dfrac{2}{3} < 1$: mỗi bạn được ít hơn 1 cái bánh.',
      ],
      answer: 'Mỗi bạn được $\\dfrac{2}{3}$ cái bánh.',
    },
    {
      problem:
        'Có 9 lít nước mắm, rót đều vào 4 chai. Mỗi chai có bao nhiêu lít nước mắm? Mỗi chai có nhiều hơn 1 lít không?',
      steps: [
        'Mỗi chai có 9 : 4 = $\\dfrac{9}{4}$ (lít).',
        'Tử số 9 lớn hơn mẫu số 4, nên $\\dfrac{9}{4} > 1$.',
      ],
      answer: 'Mỗi chai có $\\dfrac{9}{4}$ lít nước mắm, nhiều hơn 1 lít.',
    },
    {
      problem: 'Viết các thương sau thành số tự nhiên: 12 : 4 và 6 : 6.',
      steps: ['12 : 4 = $\\dfrac{12}{4}$ = 3.', '6 : 6 = $\\dfrac{6}{6}$ = 1.'],
      answer: '$\\dfrac{12}{4} = 3$ và $\\dfrac{6}{6} = 1$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Viết thương của phép chia 7 : 9 dưới dạng phân số.',
      answer: [7, 9],
      simplest: true,
      hints: ['Tử số là số bị chia, mẫu số là số chia.'],
      solution: '7 : 9 = $\\dfrac{7}{9}$.',
    },
    {
      type: 'choice',
      prompt: '5 : 11 bằng phân số nào?',
      options: ['$\\dfrac{5}{11}$', '$\\dfrac{11}{5}$', '$\\dfrac{1}{5}$'],
      answer: 0,
      hints: ['Số bị chia là 5, số chia là 11.'],
      solution: 'Số bị chia 5 là tử số, số chia 11 là mẫu số: 5 : 11 = $\\dfrac{5}{11}$.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép chia với thương của nó.',
      left: ['4 : 7', '7 : 4', '9 : 3', '10 : 10'],
      right: ['$\\dfrac{4}{7}$', '$\\dfrac{7}{4}$', '3', '1', '$\\dfrac{3}{9}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Tử số là số bị chia, mẫu số là số chia.',
        '9 : 3 và 10 : 10 chia hết, thương là số tự nhiên.',
      ],
      solution:
        '4 : 7 = $\\dfrac{4}{7}$; 7 : 4 = $\\dfrac{7}{4}$; 9 : 3 = $\\dfrac{9}{3}$ = 3; 10 : 10 = $\\dfrac{10}{10}$ = 1.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{24}{6}$ thành số tự nhiên.',
      answer: 4,
      hints: ['$\\dfrac{24}{6}$ là thương của 24 : 6.'],
      solution: '$\\dfrac{24}{6}$ = 24 : 6 = 4.',
    },
    {
      type: 'fraction',
      prompt: 'Có 2 cái bánh, chia đều cho 5 bạn. Mỗi bạn được bao nhiêu cái bánh?',
      answer: [2, 5],
      simplest: true,
      hints: ['Em làm phép chia 2 : 5 rồi viết thương thành phân số.'],
      solution: 'Mỗi bạn được 2 : 5 = $\\dfrac{2}{5}$ (cái bánh).',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào lớn hơn 1?',
      options: ['$\\dfrac{7}{5}$', '$\\dfrac{5}{7}$', '$\\dfrac{6}{6}$', '$\\dfrac{2}{9}$'],
      answer: 0,
      hints: ['Phân số lớn hơn 1 có tử số lớn hơn mẫu số.'],
      solution:
        '$\\dfrac{7}{5}$ có 7 > 5, nên $\\dfrac{7}{5} > 1$. $\\dfrac{6}{6} = 1$; $\\dfrac{5}{7}$ và $\\dfrac{2}{9}$ bé hơn 1.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phân số bé hơn 1.',
      options: ['$\\dfrac{3}{8}$', '$\\dfrac{9}{4}$', '$\\dfrac{4}{4}$', '$\\dfrac{1}{10}$'],
      answers: [0, 3],
      hints: ['Phân số bé hơn 1 có tử số bé hơn mẫu số.'],
      solution:
        '$\\dfrac{3}{8}$ (3 < 8) và $\\dfrac{1}{10}$ (1 < 10) bé hơn 1. $\\dfrac{4}{4} = 1$, $\\dfrac{9}{4} > 1$.',
    },
    {
      type: 'choice',
      prompt: 'Viết số 6 thành phân số có mẫu số là 1.',
      options: ['$\\dfrac{6}{1}$', '$\\dfrac{1}{6}$', '$\\dfrac{6}{6}$'],
      answer: 0,
      hints: ['Tử số là chính số tự nhiên đó.'],
      solution: '6 = $\\dfrac{6}{1}$, vì 6 : 1 = 6.',
    },
    {
      type: 'fraction',
      prompt: 'Có 7 lít sữa, rót đều vào 4 bình. Mỗi bình có bao nhiêu lít sữa?',
      answer: [7, 4],
      simplest: true,
      hints: ['Em làm phép chia 7 : 4.', 'Thương 7 : 4 viết thành phân số có tử số 7.'],
      solution:
        'Mỗi bình có 7 : 4 = $\\dfrac{7}{4}$ (lít). Vì 7 > 4 nên mỗi bình có nhiều hơn 1 lít.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{8}{8}$ so với 1 thế nào?',
      options: ['$\\dfrac{8}{8} = 1$', '$\\dfrac{8}{8} > 1$', '$\\dfrac{8}{8} < 1$'],
      answer: 0,
      hints: ['So sánh tử số với mẫu số.'],
      solution: 'Tử số bằng mẫu số (8 = 8), nên $\\dfrac{8}{8} = 1$.',
    },
  ],
  takeaways: [
    'Thương của phép chia số tự nhiên cho số tự nhiên khác 0 viết được thành phân số: tử số là số bị chia, mẫu số là số chia.',
    'Tử số lớn hơn mẫu số: phân số lớn hơn 1. Tử số bằng mẫu số: phân số bằng 1. Tử số bé hơn mẫu số: phân số bé hơn 1.',
    'Mỗi số tự nhiên viết được thành phân số có mẫu số là 1, ví dụ 5 = $\\dfrac{5}{1}$.',
  ],
};
