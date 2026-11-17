/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép nhân phân số: muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số. Nhân phân số với số tự nhiên và các tính chất của phép nhân phân số.',
  intro:
    'Một tấm nhôm hình chữ nhật dài $\\dfrac{4}{5}$ m, rộng $\\dfrac{2}{3}$ m. Diện tích tấm nhôm là bao nhiêu mét vuông? Em cùng học phép nhân phân số nhé!',
  objectives: [
    'Nhân được hai phân số: tử số nhân tử số, mẫu số nhân mẫu số.',
    'Nhân được phân số với số tự nhiên.',
    'Biết tính chất giao hoán, kết hợp và nhân một tổng hai phân số với một phân số để tính thuận tiện.',
  ],
  sections: [
    {
      heading: 'Nhân hai phân số',
      blocks: [
        {
          type: 'p',
          text: 'Hình vuông cạnh 1 m có diện tích 1 m². Chia hình vuông thành 5 cột và 3 hàng bằng nhau: được 5 × 3 = 15 ô.',
        },
        {
          type: 'p',
          text: 'Hình chữ nhật dài $\\dfrac{4}{5}$ m, rộng $\\dfrac{2}{3}$ m gồm 4 × 2 = 8 ô. Diện tích của nó là $\\dfrac{8}{15}$ m².',
        },
        {
          type: 'tex',
          tex: '\\dfrac{4}{5} \\times \\dfrac{2}{3} = \\dfrac{4 \\times 2}{5 \\times 3} = \\dfrac{8}{15}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phân số nào rút gọn được thì em rút gọn trước rồi mới tính: $\\dfrac{2}{4} \\times \\dfrac{9}{5} = \\dfrac{1}{2} \\times \\dfrac{9}{5} = \\dfrac{9}{10}$.',
        },
      ],
    },
    {
      heading: 'Nhân phân số với số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Em viết số tự nhiên thành phân số có mẫu số là 1, rồi nhân hai phân số.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{2}{5} \\times 3 = \\dfrac{2}{5} \\times \\dfrac{3}{1} = \\dfrac{2 \\times 3}{5 \\times 1} = \\dfrac{6}{5}',
        },
        {
          type: 'p',
          text: 'Em cũng có thể làm nhanh: giữ nguyên mẫu số, lấy tử số nhân với số tự nhiên. $\\dfrac{2}{5} \\times 3 = \\dfrac{2 \\times 3}{5} = \\dfrac{6}{5}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phân số nhân với 1 bằng chính phân số đó. Phân số nhân với 0 bằng 0.',
        },
      ],
    },
    {
      heading: 'Tính chất của phép nhân phân số',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Ví dụ'],
          rows: [
            [
              'Đổi chỗ hai phân số',
              '$\\dfrac{2}{3} \\times \\dfrac{4}{5} = \\dfrac{4}{5} \\times \\dfrac{2}{3}$',
            ],
            [
              'Nhân với tích hai phân số',
              '$\\left(\\dfrac{1}{3} \\times \\dfrac{2}{5}\\right) \\times \\dfrac{3}{4} = \\dfrac{1}{3} \\times \\left(\\dfrac{2}{5} \\times \\dfrac{3}{4}\\right)$',
            ],
            [
              'Nhân một tổng với một phân số',
              '$\\left(\\dfrac{1}{3} + \\dfrac{1}{6}\\right) \\times \\dfrac{2}{5} = \\dfrac{1}{3} \\times \\dfrac{2}{5} + \\dfrac{1}{6} \\times \\dfrac{2}{5}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi đổi chỗ các phân số trong một tích thì tích không thay đổi.',
        },
        {
          type: 'p',
          text: 'Tính thuận tiện: $\\dfrac{3}{5} \\times \\dfrac{17}{21} + \\dfrac{2}{5} \\times \\dfrac{17}{21} = \\left(\\dfrac{3}{5} + \\dfrac{2}{5}\\right) \\times \\dfrac{17}{21} = 1 \\times \\dfrac{17}{21} = \\dfrac{17}{21}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô màu trên hình vuông',
    instruction:
      'Em bấm + hoặc − để tô xanh số cột và tô vàng số hàng theo hai phân số. Phần tô cả hai màu là tích. Em chọn phân số chỉ phần đó.',
  },
  examples: [
    {
      problem:
        'Một tấm nhôm hình chữ nhật có chiều dài $\\dfrac{6}{7}$ m, chiều rộng $\\dfrac{3}{5}$ m. Tính diện tích tấm nhôm.',
      steps: [
        'Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.',
        '$\\dfrac{6}{7} \\times \\dfrac{3}{5} = \\dfrac{6 \\times 3}{7 \\times 5} = \\dfrac{18}{35}$.',
      ],
      answer: 'Diện tích tấm nhôm là $\\dfrac{18}{35}$ m².',
    },
    {
      problem: 'Một hình vuông có cạnh $\\dfrac{3}{5}$ dm. Tính chu vi hình vuông.',
      steps: [
        'Chu vi hình vuông bằng độ dài cạnh nhân với 4.',
        '$\\dfrac{3}{5} \\times 4 = \\dfrac{3 \\times 4}{5} = \\dfrac{12}{5}$.',
      ],
      answer: 'Chu vi hình vuông là $\\dfrac{12}{5}$ dm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '$\\dfrac{4}{7} \\times \\dfrac{3}{5} = \\dfrac{?}{35}$. Số nào thích hợp với dấu ?',
      answer: 12,
      hints: ['Tử số nhân với tử số.', 'Tính 4 × 3.'],
      solution:
        '$\\dfrac{4}{7} \\times \\dfrac{3}{5} = \\dfrac{4 \\times 3}{7 \\times 5} = \\dfrac{12}{35}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{2}{5} \\times \\dfrac{1}{2}$.',
      options: ['$\\dfrac{1}{5}$', '$\\dfrac{3}{7}$', '$\\dfrac{2}{7}$', '$\\dfrac{3}{10}$'],
      answer: 0,
      hints: [
        'Tử số nhân tử số, mẫu số nhân mẫu số.',
        'Được $\\dfrac{2}{10}$. Em rút gọn kết quả.',
      ],
      solution:
        '$\\dfrac{2}{5} \\times \\dfrac{1}{2} = \\dfrac{2 \\times 1}{5 \\times 2} = \\dfrac{2}{10} = \\dfrac{1}{5}$. Không cộng tử số hay mẫu số.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\dfrac{9}{11} \\times 8$. Em viết kết quả dạng phân số, ví dụ 3/4.',
      answer: [72, 11],
      hints: ['Viết 8 thành $\\dfrac{8}{1}$.', 'Giữ nguyên mẫu số 11, lấy 9 × 8.'],
      solution: '$\\dfrac{9}{11} \\times 8 = \\dfrac{9 \\times 8}{11} = \\dfrac{72}{11}$.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép nhân với kết quả của nó.',
      left: [
        '$\\dfrac{4}{5} \\times 1$',
        '$\\dfrac{15}{8} \\times 0$',
        '$3 \\times \\dfrac{4}{11}$',
      ],
      right: ['$\\dfrac{4}{5}$', '$0$', '$\\dfrac{12}{11}$', '$\\dfrac{12}{33}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Nhân với 1 thì phân số giữ nguyên. Nhân với 0 thì được 0.',
        '$3 \\times \\dfrac{4}{11}$: giữ nguyên mẫu số 11, nhân 3 với tử số.',
      ],
      solution:
        '$\\dfrac{4}{5} \\times 1 = \\dfrac{4}{5}$; $\\dfrac{15}{8} \\times 0 = 0$; $3 \\times \\dfrac{4}{11} = \\dfrac{3 \\times 4}{11} = \\dfrac{12}{11}$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn rồi tính: $\\dfrac{2}{4} \\times \\dfrac{9}{5} = \\dfrac{?}{10}$. Số nào thích hợp với dấu ?',
      answer: 9,
      hints: [
        'Rút gọn $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
        'Tính $\\dfrac{1}{2} \\times \\dfrac{9}{5}$.',
      ],
      solution:
        '$\\dfrac{2}{4} \\times \\dfrac{9}{5} = \\dfrac{1}{2} \\times \\dfrac{9}{5} = \\dfrac{1 \\times 9}{2 \\times 5} = \\dfrac{9}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hình vuông có cạnh $\\dfrac{3}{5}$ dm. Chu vi hình vuông là bao nhiêu đề-xi-mét? Em viết kết quả dạng phân số.',
      answer: [12, 5],
      hints: ['Chu vi hình vuông bằng cạnh nhân với 4.'],
      solution: '$\\dfrac{3}{5} \\times 4 = \\dfrac{12}{5}$ (dm).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số bằng $\\dfrac{2}{3} \\times \\dfrac{4}{5}$.',
      options: [
        '$\\dfrac{4}{5} \\times \\dfrac{2}{3}$',
        '$\\dfrac{8}{15}$',
        '$\\dfrac{6}{8}$',
        '$\\dfrac{8}{8}$',
      ],
      answers: [0, 1],
      hints: [
        'Đổi chỗ các phân số trong một tích thì tích không đổi.',
        'Tính tích: tử số nhân tử số, mẫu số nhân mẫu số.',
      ],
      solution:
        '$\\dfrac{2}{3} \\times \\dfrac{4}{5} = \\dfrac{8}{15} = \\dfrac{4}{5} \\times \\dfrac{2}{3}$. Còn $\\dfrac{6}{8}$ là cộng nhầm tử số và mẫu số, $\\dfrac{8}{8}$ là cộng nhầm mẫu số.',
    },
    {
      type: 'choice',
      prompt:
        'Tính bằng cách thuận tiện: $\\dfrac{3}{5} \\times \\dfrac{17}{21} + \\dfrac{2}{5} \\times \\dfrac{17}{21}$.',
      options: ['$\\dfrac{17}{21}$', '$\\dfrac{5}{21}$', '$\\dfrac{17}{105}$', '$\\dfrac{17}{42}$'],
      answer: 0,
      hints: [
        'Hai tích cùng nhân với $\\dfrac{17}{21}$.',
        'Tính $\\left(\\dfrac{3}{5} + \\dfrac{2}{5}\\right) \\times \\dfrac{17}{21}$.',
      ],
      solution:
        '$\\left(\\dfrac{3}{5} + \\dfrac{2}{5}\\right) \\times \\dfrac{17}{21} = 1 \\times \\dfrac{17}{21} = \\dfrac{17}{21}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một bãi đỗ xe có ô đỗ hình chữ nhật dài $\\dfrac{11}{2}$ m, rộng $\\dfrac{5}{2}$ m. Diện tích một ô đỗ xe là bao nhiêu mét vuông? Em viết kết quả dạng phân số.',
      answer: [55, 4],
      hints: ['Diện tích bằng chiều dài nhân chiều rộng.', 'Tính 11 × 5 và 2 × 2.'],
      solution:
        '$\\dfrac{11}{2} \\times \\dfrac{5}{2} = \\dfrac{11 \\times 5}{2 \\times 2} = \\dfrac{55}{4}$ (m²).',
    },
  ],
  takeaways: [
    'Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số.',
    'Nhân phân số với số tự nhiên: giữ nguyên mẫu số, nhân tử số với số tự nhiên.',
    'Đổi chỗ các phân số trong một tích thì tích không thay đổi.',
  ],
};
