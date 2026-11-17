/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất cơ bản của phân số: nhân cả tử số và mẫu số với cùng một số tự nhiên khác 0, hoặc chia cả tử số và mẫu số cho cùng một số tự nhiên khác 0, thì được một phân số bằng phân số đã cho.',
  intro:
    'Hai băng giấy dài bằng nhau. Băng thứ nhất chia 4 phần, tô 3 phần. Băng thứ hai chia 8 phần, tô 6 phần. Phần tô màu của hai băng dài bằng nhau. Vì sao vậy?',
  objectives: [
    'Nêu được tính chất cơ bản của phân số.',
    'Viết được phân số bằng một phân số đã cho bằng cách nhân hoặc chia cả tử số và mẫu số với cùng một số.',
  ],
  sections: [
    {
      heading: 'Hai phân số bằng nhau',
      blocks: [
        {
          type: 'p',
          text: 'Băng giấy thứ nhất chia thành 4 phần bằng nhau, tô màu 3 phần: đã tô màu $\\dfrac{3}{4}$ băng giấy.',
        },
        {
          type: 'p',
          text: 'Băng giấy thứ hai dài bằng băng thứ nhất, chia thành 8 phần bằng nhau, tô màu 6 phần: đã tô màu $\\dfrac{6}{8}$ băng giấy.',
        },
        {
          type: 'p',
          text: 'Phần tô màu của hai băng giấy dài bằng nhau. Ta nói $\\dfrac{3}{4}$ và $\\dfrac{6}{8}$ là hai phân số bằng nhau: $\\dfrac{3}{4} = \\dfrac{6}{8}$.',
        },
      ],
    },
    {
      heading: 'Tính chất cơ bản của phân số',
      blocks: [
        {
          type: 'p',
          text: 'Chia mỗi phần của băng thứ nhất thành 2 phần bằng nhau: số phần của cả băng gấp 2, số phần tô màu cũng gấp 2.',
        },
        { type: 'tex', tex: '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.',
        },
        { type: 'tex', tex: '\\dfrac{6}{8} = \\dfrac{6 : 2}{8 : 2} = \\dfrac{3}{4}' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu cả tử số và mẫu số của một phân số cùng chia hết cho một số tự nhiên khác 0 thì sau khi chia ta được một phân số bằng phân số đã cho.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phải nhân (hoặc chia) cả tử số và mẫu số với cùng một số. Cộng thêm cùng một số vào tử số và mẫu số thì thường không được phân số bằng nhau: $\\dfrac{1}{2}$ khác $\\dfrac{2}{3}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia nhỏ băng giấy',
    instruction:
      'Băng trên là phân số đã cho. Em bấm "Chia nhỏ thêm" hoặc "Gộp bớt" để băng dưới có số phần đề bài cần. Em xem phần tô màu của hai băng: luôn dài bằng nhau.',
  },
  examples: [
    {
      problem: 'Viết phân số bằng $\\dfrac{2}{3}$ có mẫu số là 12.',
      steps: [
        '12 : 3 = 4, nên phải nhân mẫu số 3 với 4 để được 12.',
        'Nhân cả tử số và mẫu số với 4: $\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}$.',
      ],
      answer: '$\\dfrac{2}{3} = \\dfrac{8}{12}$.',
    },
    {
      problem: 'Viết phân số bằng $\\dfrac{15}{20}$ có mẫu số là 4.',
      steps: [
        '20 : 4 = 5, nên phải chia mẫu số 20 cho 5 để được 4.',
        '15 cũng chia hết cho 5. Chia cả tử số và mẫu số cho 5: $\\dfrac{15}{20} = \\dfrac{15 : 5}{20 : 5} = \\dfrac{3}{4}$.',
      ],
      answer: '$\\dfrac{15}{20} = \\dfrac{3}{4}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Số nào thích hợp với dấu ?: $\\dfrac{2}{5} = \\dfrac{?}{10}$',
      answer: 4,
      hints: ['10 : 5 = 2. Mẫu số được nhân với 2.', 'Tử số cũng phải nhân với 2.'],
      solution:
        '$\\dfrac{2}{5} = \\dfrac{2 \\times 2}{5 \\times 2} = \\dfrac{4}{10}$. Số cần điền là 4.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp với dấu ?: $\\dfrac{15}{18} = \\dfrac{5}{?}$',
      answer: 6,
      hints: ['15 : 3 = 5. Tử số được chia cho 3.', 'Mẫu số cũng phải chia cho 3.'],
      solution: '$\\dfrac{15}{18} = \\dfrac{15 : 3}{18 : 3} = \\dfrac{5}{6}$. Số cần điền là 6.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp với dấu ?: $\\dfrac{3}{7} = \\dfrac{12}{?}$',
      answer: 28,
      hints: ['3 nhân với mấy thì được 12?', '12 : 3 = 4, nên mẫu số cũng nhân với 4.'],
      solution:
        '$\\dfrac{3}{7} = \\dfrac{3 \\times 4}{7 \\times 4} = \\dfrac{12}{28}$. Số cần điền là 28.',
    },
    {
      type: 'choice',
      prompt: 'Nhân cả tử số và mẫu số của $\\dfrac{4}{5}$ với 3, ta được phân số nào?',
      options: ['$\\dfrac{12}{15}$', '$\\dfrac{12}{5}$', '$\\dfrac{7}{8}$', '$\\dfrac{4}{15}$'],
      answer: 0,
      hints: ['Tính 4 × 3 và 5 × 3.'],
      solution:
        '$\\dfrac{4 \\times 3}{5 \\times 3} = \\dfrac{12}{15}$, và $\\dfrac{12}{15} = \\dfrac{4}{5}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phân số bằng $\\dfrac{1}{3}$.',
      options: ['$\\dfrac{2}{6}$', '$\\dfrac{3}{9}$', '$\\dfrac{3}{1}$', '$\\dfrac{4}{10}$'],
      answers: [0, 1],
      hints: ['Thử nhân cả tử số và mẫu số của $\\dfrac{1}{3}$ với 2, 3, 4.'],
      solution:
        '$\\dfrac{1}{3} = \\dfrac{2}{6} = \\dfrac{3}{9} = \\dfrac{4}{12}$. $\\dfrac{4}{10}$ không bằng $\\dfrac{1}{3}$ (phải là $\\dfrac{4}{12}$), $\\dfrac{3}{1}$ là 3.',
    },
    {
      type: 'choice',
      prompt: 'Làm thế nào để được một phân số bằng phân số đã cho?',
      options: [
        'Nhân cả tử số và mẫu số với cùng một số tự nhiên khác 0',
        'Cộng thêm cùng một số vào tử số và mẫu số',
        'Chỉ nhân tử số với 2',
      ],
      answer: 0,
      hints: ['Nhớ lại tính chất cơ bản của phân số.'],
      solution:
        'Nhân (hoặc chia) cả tử số và mẫu số với cùng một số tự nhiên khác 0 thì được phân số bằng phân số đã cho. Cộng thêm thì không được: $\\dfrac{1}{2}$ cộng 1 vào tử và mẫu thành $\\dfrac{2}{3}$, khác $\\dfrac{1}{2}$.',
    },
    {
      type: 'match',
      prompt: 'Em nối hai phân số bằng nhau.',
      left: ['$\\dfrac{2}{3}$', '$\\dfrac{3}{5}$', '$\\dfrac{1}{4}$', '$\\dfrac{5}{6}$'],
      right: [
        '$\\dfrac{8}{12}$',
        '$\\dfrac{9}{15}$',
        '$\\dfrac{5}{20}$',
        '$\\dfrac{10}{12}$',
        '$\\dfrac{4}{9}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi phân số bên trái, em tìm số nhân với mẫu số để được mẫu số bên phải.'],
      solution:
        '$\\dfrac{2}{3} = \\dfrac{8}{12}$ (nhân 4); $\\dfrac{3}{5} = \\dfrac{9}{15}$ (nhân 3); $\\dfrac{1}{4} = \\dfrac{5}{20}$ (nhân 5); $\\dfrac{5}{6} = \\dfrac{10}{12}$ (nhân 2).',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp với dấu ?: $\\dfrac{6}{9} = \\dfrac{?}{3}$',
      answer: 2,
      hints: ['9 : 3 = 3. Mẫu số được chia cho 3.'],
      solution: '$\\dfrac{6}{9} = \\dfrac{6 : 3}{9 : 3} = \\dfrac{2}{3}$. Số cần điền là 2.',
    },
    {
      type: 'choice',
      prompt: 'Phân số $\\dfrac{20}{30}$ bằng phân số nào?',
      options: ['$\\dfrac{2}{3}$', '$\\dfrac{3}{2}$', '$\\dfrac{20}{3}$', '$\\dfrac{1}{3}$'],
      answer: 0,
      hints: ['20 và 30 cùng chia hết cho 10.'],
      solution: '$\\dfrac{20}{30} = \\dfrac{20 : 10}{30 : 10} = \\dfrac{2}{3}$.',
    },
  ],
  takeaways: [
    'Nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được phân số bằng phân số đã cho.',
    'Chia cả tử số và mẫu số cho cùng một số tự nhiên khác 0 (khi cả hai cùng chia hết) thì được phân số bằng phân số đã cho.',
    'Hai phân số bằng nhau chỉ cùng một phần của hình: $\\dfrac{3}{4} = \\dfrac{6}{8}$.',
  ],
};
