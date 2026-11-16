/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hỗn số gồm phần nguyên và phần phân số bé hơn 1, như 2 và 3/4; đọc, viết hỗn số và chuyển hỗn số thành phân số.',
  intro:
    'Mẹ mua 2 cái bánh tròn và thêm $\\dfrac{3}{4}$ cái bánh nữa. Có tất cả 2 cái bánh và $\\dfrac{3}{4}$ cái bánh. Ta viết gọn số đó thế nào?',
  objectives: [
    'Nhận biết hỗn số, phần nguyên và phần phân số của hỗn số.',
    'Đọc, viết được hỗn số.',
    'Chuyển được hỗn số thành phân số.',
  ],
  sections: [
    {
      heading: 'Hỗn số',
      blocks: [
        {
          type: 'p',
          text: 'Có 2 cái bánh và $\\dfrac{3}{4}$ cái bánh. Ta viết gọn là $2\\,\\dfrac{3}{4}$ cái bánh.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '$2\\,\\dfrac{3}{4}$ gọi là hỗn số, đọc là: hai và ba phần tư. Hỗn số $2\\,\\dfrac{3}{4}$ có phần nguyên là 2, phần phân số là $\\dfrac{3}{4}$.',
        },
        {
          type: 'p',
          text: 'Khi viết hỗn số, em viết phần nguyên trước, rồi viết phần phân số. Khi đọc, em đọc phần nguyên, rồi đọc "và", rồi đọc phần phân số.',
        },
        {
          type: 'table',
          head: ['Hỗn số', 'Phần nguyên', 'Phần phân số', 'Đọc là'],
          rows: [
            ['$3\\,\\dfrac{7}{10}$', '3', '$\\dfrac{7}{10}$', 'ba và bảy phần mười'],
            ['$1\\,\\dfrac{5}{8}$', '1', '$\\dfrac{5}{8}$', 'một và năm phần tám'],
            ['$12\\,\\dfrac{7}{10}$', '12', '$\\dfrac{7}{10}$', 'mười hai và bảy phần mười'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phần phân số của hỗn số bao giờ cũng bé hơn 1.',
        },
      ],
    },
    {
      heading: 'Chuyển hỗn số thành phân số',
      blocks: [
        {
          type: 'p',
          text: '$2\\,\\dfrac{3}{4}$ là 2 hình tròn và $\\dfrac{3}{4}$ hình tròn. Mỗi hình tròn có 4 phần tư, nên 2 hình tròn có 2 × 4 = 8 phần tư. Thêm 3 phần tư là 11 phần tư.',
        },
        {
          type: 'p',
          text: '$2\\,\\dfrac{3}{4} = \\dfrac{2 \\times 4 + 3}{4} = \\dfrac{11}{4}$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Có thể viết hỗn số thành một phân số có: tử số bằng phần nguyên nhân với mẫu số rồi cộng với tử số ở phần phân số; mẫu số bằng mẫu số ở phần phân số.',
        },
        {
          type: 'p',
          text: '$3\\,\\dfrac{7}{10} = \\dfrac{3 \\times 10 + 7}{10} = \\dfrac{37}{10}$',
        },
      ],
    },
    {
      heading: 'Hỗn số trên tia số',
      blocks: [
        {
          type: 'p',
          text: 'Đoạn từ 6 đến 7 trên tia số chia thành 10 phần bằng nhau. Vạch thứ 3 sau số 6 là $6\\,\\dfrac{3}{10}$, vạch thứ 7 là $6\\,\\dfrac{7}{10}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ngược lại',
          text: 'Phân số $\\dfrac{23}{10}$ lớn hơn 1: 23 : 10 = 2 (dư 3), nên $\\dfrac{23}{10} = 2\\,\\dfrac{3}{10}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô hình tròn',
    instruction:
      'Em tô đúng số hình tròn đề bài cho. Bấm "+ 1 phần" hoặc "+ 1 hình tròn", hoặc chạm vào từng phần. Dòng dưới hình viết số đó thành hỗn số và phân số.',
  },
  examples: [
    {
      problem:
        'Có 3 hình vuông được tô màu cả, hình vuông thứ tư chia 10 phần bằng nhau và tô 7 phần. Viết rồi đọc hỗn số chỉ phần đã tô màu.',
      steps: [
        'Tô đủ 3 hình vuông: phần nguyên là 3.',
        'Hình thứ tư tô 7 trong 10 phần: phần phân số là $\\dfrac{7}{10}$.',
      ],
      answer: 'Viết $3\\,\\dfrac{7}{10}$, đọc là: ba và bảy phần mười.',
    },
    {
      problem: 'Chuyển hỗn số $5\\,\\dfrac{2}{3}$ thành phân số.',
      steps: [
        'Tử số: phần nguyên nhân với mẫu số rồi cộng tử số: 5 × 3 + 2 = 17.',
        'Mẫu số giữ nguyên là 3.',
      ],
      answer: '$5\\,\\dfrac{2}{3} = \\dfrac{5 \\times 3 + 2}{3} = \\dfrac{17}{3}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hỗn số $5\\,\\dfrac{5}{6}$ đọc là:',
      options: [
        'năm và năm phần sáu',
        'năm năm phần sáu',
        'năm phần sáu và năm',
        'năm mươi lăm phần sáu',
      ],
      answer: 0,
      hints: ['Đọc phần nguyên, rồi đọc "và", rồi đọc phần phân số.'],
      solution: '$5\\,\\dfrac{5}{6}$ đọc là: năm và năm phần sáu.',
    },
    {
      type: 'number',
      prompt: 'Phần nguyên của hỗn số $12\\,\\dfrac{7}{10}$ là bao nhiêu?',
      answer: 12,
      hints: ['Phần nguyên là số viết trước phần phân số.'],
      solution: '$12\\,\\dfrac{7}{10}$ có phần nguyên là 12, phần phân số là $\\dfrac{7}{10}$.',
    },
    {
      type: 'choice',
      prompt: 'Phần phân số của hỗn số $100\\,\\dfrac{59}{100}$ là:',
      options: ['$\\dfrac{59}{100}$', '$\\dfrac{100}{59}$', '100', '59'],
      answer: 0,
      hints: ['Phần phân số là phân số viết sau phần nguyên, và nó bé hơn 1.'],
      solution:
        '$100\\,\\dfrac{59}{100}$ có phần nguyên là 100, phần phân số là $\\dfrac{59}{100}$.',
    },
    {
      type: 'fraction',
      prompt: 'Chuyển hỗn số $3\\,\\dfrac{1}{4}$ thành phân số.',
      answer: [13, 4],
      hints: ['Tử số: 3 × 4 + 1.', 'Mẫu số giữ nguyên là 4.'],
      solution: '$3\\,\\dfrac{1}{4} = \\dfrac{3 \\times 4 + 1}{4} = \\dfrac{13}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Chuyển hỗn số $4\\,\\dfrac{2}{5}$ thành phân số.',
      answer: [22, 5],
      hints: ['Tử số: phần nguyên nhân với mẫu số rồi cộng với tử số.'],
      solution: '$4\\,\\dfrac{2}{5} = \\dfrac{4 \\times 5 + 2}{5} = \\dfrac{22}{5}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hỗn số với phân số bằng nó.',
      left: [
        '$1\\,\\dfrac{1}{2}$',
        '$2\\,\\dfrac{1}{3}$',
        '$1\\,\\dfrac{3}{4}$',
        '$3\\,\\dfrac{2}{5}$',
      ],
      right: [
        '$\\dfrac{3}{2}$',
        '$\\dfrac{7}{3}$',
        '$\\dfrac{7}{4}$',
        '$\\dfrac{17}{5}$',
        '$\\dfrac{5}{3}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi hỗn số, tính phần nguyên × mẫu số + tử số.'],
      solution:
        '$1\\,\\dfrac{1}{2} = \\dfrac{3}{2}$; $2\\,\\dfrac{1}{3} = \\dfrac{7}{3}$; $1\\,\\dfrac{3}{4} = \\dfrac{7}{4}$; $3\\,\\dfrac{2}{5} = \\dfrac{17}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên tia số, đoạn từ 6 đến 7 chia thành 10 phần bằng nhau. Vạch thứ 3 sau số 6 ứng với hỗn số nào?',
      options: [
        '$6\\,\\dfrac{3}{10}$',
        '$3\\,\\dfrac{6}{10}$',
        '$6\\,\\dfrac{7}{10}$',
        '$7\\,\\dfrac{3}{10}$',
      ],
      answer: 0,
      hints: ['Vạch đó nằm giữa 6 và 7, nên phần nguyên là 6.'],
      solution:
        'Mỗi phần là $\\dfrac{1}{10}$. Vạch thứ 3 sau số 6 là 6 và $\\dfrac{3}{10}$, tức là $6\\,\\dfrac{3}{10}$.',
    },
    {
      type: 'choice',
      prompt: 'Cách viết nào không phải là hỗn số?',
      options: [
        '$2\\,\\dfrac{5}{4}$',
        '$3\\,\\dfrac{1}{2}$',
        '$1\\,\\dfrac{7}{8}$',
        '$10\\,\\dfrac{3}{10}$',
      ],
      answer: 0,
      hints: ['Phần phân số của hỗn số bao giờ cũng bé hơn 1.'],
      solution:
        'Trong $2\\,\\dfrac{5}{4}$, phần $\\dfrac{5}{4}$ lớn hơn 1, nên đó không phải là hỗn số. Ta viết đúng là $3\\,\\dfrac{1}{4}$.',
    },
  ],
  takeaways: [
    'Hỗn số gồm phần nguyên và phần phân số; phần phân số luôn bé hơn 1.',
    'Đọc hỗn số: phần nguyên, "và", rồi phần phân số.',
    'Chuyển hỗn số thành phân số: tử số = phần nguyên × mẫu số + tử số; mẫu số giữ nguyên.',
  ],
};
