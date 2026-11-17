/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh phân số: so sánh hai phân số cùng mẫu số, so sánh phân số với 1 và so sánh hai phân số khác mẫu số bằng cách quy đồng mẫu số.',
  intro:
    'Ba chú ốc sên thi bò. Ốc sên nâu bò được $\\dfrac{3}{5}$ m, ốc sên vàng bò được $\\dfrac{1}{2}$ m, ốc sên đen bò được $\\dfrac{7}{10}$ m. Chú nào bò xa nhất? Em cùng học so sánh phân số nhé!',
  objectives: [
    'So sánh được hai phân số cùng mẫu số.',
    'So sánh được một phân số với 1.',
    'So sánh được hai phân số khác mẫu số bằng cách quy đồng mẫu số.',
    'Sắp xếp được các phân số theo thứ tự từ bé đến lớn hoặc từ lớn đến bé.',
  ],
  sections: [
    {
      heading: 'So sánh hai phân số cùng mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Đoạn thẳng $AB$ chia thành 5 phần bằng nhau. Đoạn $AC$ dài 2 phần, tức là $\\dfrac{2}{5}$ độ dài $AB$. Đoạn $AD$ dài 3 phần, tức là $\\dfrac{3}{5}$ độ dài $AB$.',
        },
        {
          type: 'p',
          text: 'Đoạn $AC$ ngắn hơn đoạn $AD$, nên $\\dfrac{2}{5} < \\dfrac{3}{5}$, hay $\\dfrac{3}{5} > \\dfrac{2}{5}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong hai phân số cùng mẫu số: phân số nào có tử số bé hơn thì bé hơn; phân số nào có tử số lớn hơn thì lớn hơn; nếu tử số bằng nhau thì hai phân số đó bằng nhau.',
        },
        {
          type: 'table',
          head: ['Hai phân số', 'So sánh tử số', 'Kết quả'],
          rows: [
            ['$\\dfrac{5}{7}$ và $\\dfrac{4}{7}$', '5 > 4', '$\\dfrac{5}{7} > \\dfrac{4}{7}$'],
            ['$\\dfrac{5}{8}$ và $\\dfrac{7}{8}$', '5 < 7', '$\\dfrac{5}{8} < \\dfrac{7}{8}$'],
            ['$\\dfrac{4}{5}$ và $\\dfrac{4}{5}$', '4 = 4', '$\\dfrac{4}{5} = \\dfrac{4}{5}$'],
          ],
        },
      ],
    },
    {
      heading: 'So sánh phân số với 1',
      blocks: [
        {
          type: 'p',
          text: 'Số 1 viết được thành phân số có tử số bằng mẫu số: $1 = \\dfrac{5}{5}$. Vì $\\dfrac{3}{5} < \\dfrac{5}{5}$ nên $\\dfrac{3}{5} < 1$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phân số có tử số bé hơn mẫu số thì bé hơn 1. Phân số có tử số bằng mẫu số thì bằng 1. Phân số có tử số lớn hơn mẫu số thì lớn hơn 1.',
        },
        {
          type: 'table',
          head: ['Phân số', 'Tử số và mẫu số', 'So với 1'],
          rows: [
            ['$\\dfrac{12}{15}$', '12 < 15', '$\\dfrac{12}{15} < 1$'],
            ['$\\dfrac{3}{3}$', '3 = 3', '$\\dfrac{3}{3} = 1$'],
            ['$\\dfrac{9}{7}$', '9 > 7', '$\\dfrac{9}{7} > 1$'],
          ],
        },
      ],
    },
    {
      heading: 'So sánh hai phân số khác mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'So sánh $\\dfrac{2}{3}$ và $\\dfrac{5}{6}$. Hai phân số khác mẫu số. Ta quy đồng mẫu số, mẫu số chung là 6.',
        },
        { type: 'tex', tex: '\\dfrac{2}{3} = \\dfrac{2 \\times 2}{3 \\times 2} = \\dfrac{4}{6}' },
        {
          type: 'p',
          text: 'Ta có $\\dfrac{4}{6} < \\dfrac{5}{6}$, nên $\\dfrac{2}{3} < \\dfrac{5}{6}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn so sánh hai phân số khác mẫu số, ta có thể quy đồng mẫu số hai phân số đó, rồi so sánh hai phân số cùng mẫu số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn sắp xếp nhiều phân số, em đưa chúng về cùng mẫu số, rồi sắp xếp theo tử số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp chồng hai băng giấy',
    instruction:
      'Em nhìn phần tô màu của hai băng, rồi chọn dấu >, < hoặc =. Băng nào tô dài hơn thì phân số đó lớn hơn. Khi hai phân số khác mẫu số, em bấm "Quy đồng mẫu số" để hai băng có cùng số phần.',
  },
  examples: [
    {
      problem:
        'Sắp xếp các phân số $\\dfrac{15}{19}$; $\\dfrac{7}{19}$; $\\dfrac{17}{19}$; $\\dfrac{5}{19}$ theo thứ tự từ bé đến lớn.',
      steps: [
        'Các phân số đều có mẫu số 19. Ta so sánh các tử số.',
        'Xếp các tử số từ bé đến lớn: 5 < 7 < 15 < 17.',
      ],
      answer:
        'Từ bé đến lớn: $\\dfrac{5}{19}$; $\\dfrac{7}{19}$; $\\dfrac{15}{19}$; $\\dfrac{17}{19}$.',
    },
    {
      problem:
        'Ốc sên nâu bò được $\\dfrac{3}{5}$ m, ốc sên vàng bò được $\\dfrac{1}{2}$ m, ốc sên đen bò được $\\dfrac{7}{10}$ m. Chú ốc sên nào bò được xa nhất?',
      steps: [
        'Quy đồng mẫu số các phân số với mẫu số chung 10.',
        '$\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$; $\\dfrac{1}{2} = \\dfrac{1 \\times 5}{2 \\times 5} = \\dfrac{5}{10}$; giữ nguyên $\\dfrac{7}{10}$.',
        'So sánh: $\\dfrac{5}{10} < \\dfrac{6}{10} < \\dfrac{7}{10}$, nên $\\dfrac{1}{2} < \\dfrac{3}{5} < \\dfrac{7}{10}$.',
      ],
      answer: 'Ốc sên đen bò được xa nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{4}{7}$ ? $\\dfrac{6}{7}$',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hai phân số cùng mẫu số 7. Em so sánh hai tử số.'],
      solution: 'Cùng mẫu số 7, tử số 4 < 6, nên $\\dfrac{4}{7} < \\dfrac{6}{7}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{27}{25}$ ? 1',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em so sánh tử số 27 với mẫu số 25.'],
      solution: 'Tử số 27 lớn hơn mẫu số 25, nên $\\dfrac{27}{25} > 1$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{8}{9}$ ? $\\dfrac{11}{18}$',
      options: ['>', '<', '='],
      answer: 0,
      hints: [
        '18 : 9 = 2. Quy đồng mẫu số với mẫu số chung 18.',
        'Viết $\\dfrac{8}{9}$ thành phân số có mẫu số 18.',
      ],
      solution:
        '$\\dfrac{8}{9} = \\dfrac{8 \\times 2}{9 \\times 2} = \\dfrac{16}{18}$. Vì $\\dfrac{16}{18} > \\dfrac{11}{18}$ nên $\\dfrac{8}{9} > \\dfrac{11}{18}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{45}{60}$ ? $\\dfrac{3}{4}$',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['60 : 4 = 15. Viết $\\dfrac{3}{4}$ thành phân số có mẫu số 60.'],
      solution:
        '$\\dfrac{3}{4} = \\dfrac{3 \\times 15}{4 \\times 15} = \\dfrac{45}{60}$, nên $\\dfrac{45}{60} = \\dfrac{3}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phân số bé hơn 1.',
      options: [
        '$\\dfrac{15}{16}$',
        '$\\dfrac{31}{30}$',
        '$\\dfrac{99}{100}$',
        '$\\dfrac{47}{48}$',
        '$\\dfrac{7}{7}$',
      ],
      answers: [0, 2, 3],
      hints: ['Phân số bé hơn 1 khi tử số bé hơn mẫu số.'],
      solution:
        '$\\dfrac{15}{16}$, $\\dfrac{99}{100}$ và $\\dfrac{47}{48}$ có tử số bé hơn mẫu số nên bé hơn 1. $\\dfrac{31}{30} > 1$ và $\\dfrac{7}{7} = 1$.',
    },
    {
      type: 'choice',
      prompt:
        'Việt tô màu $\\dfrac{3}{8}$ tờ giấy, Mai tô màu $\\dfrac{3}{4}$ tờ giấy (hai tờ giấy như nhau). Ai tô màu được nhiều hơn?',
      options: ['Việt', 'Mai', 'Hai bạn tô bằng nhau'],
      answer: 1,
      hints: ['Quy đồng mẫu số với mẫu số chung 8.'],
      solution:
        '$\\dfrac{3}{4} = \\dfrac{6}{8}$. Vì $\\dfrac{6}{8} > \\dfrac{3}{8}$ nên Mai tô màu được nhiều hơn.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các phân số $\\dfrac{13}{18}$; $\\dfrac{2}{3}$; $\\dfrac{5}{6}$ theo thứ tự từ bé đến lớn.',
      items: ['$\\dfrac{13}{18}$', '$\\dfrac{2}{3}$', '$\\dfrac{5}{6}$'],
      answer: [1, 0, 2],
      hints: ['Quy đồng mẫu số với mẫu số chung 18.', '18 : 3 = 6 và 18 : 6 = 3.'],
      solution:
        '$\\dfrac{2}{3} = \\dfrac{12}{18}$, $\\dfrac{5}{6} = \\dfrac{15}{18}$. Vì 12 < 13 < 15 nên $\\dfrac{2}{3} < \\dfrac{13}{18} < \\dfrac{5}{6}$.',
    },
    {
      type: 'choice',
      prompt:
        'Thỏ xám cân nặng $\\dfrac{13}{2}$ kg, thỏ đen cân nặng $\\dfrac{21}{6}$ kg, thỏ trắng cân nặng $\\dfrac{37}{6}$ kg. Con thỏ nào nặng nhất?',
      options: ['Thỏ xám', 'Thỏ đen', 'Thỏ trắng'],
      answer: 0,
      hints: [
        'Quy đồng mẫu số với mẫu số chung 6.',
        '$\\dfrac{13}{2} = \\dfrac{13 \\times 3}{2 \\times 3}$.',
      ],
      solution:
        '$\\dfrac{13}{2} = \\dfrac{39}{6}$. Vì $\\dfrac{21}{6} < \\dfrac{37}{6} < \\dfrac{39}{6}$ nên thỏ xám nặng nhất.',
    },
    {
      type: 'number',
      prompt:
        'Phân số $\\dfrac{?}{9}$ lớn hơn $\\dfrac{7}{9}$ và bé hơn 1. Số nào thích hợp với dấu ?',
      answer: 8,
      hints: ['Bé hơn 1 nên tử số bé hơn 9.', 'Lớn hơn $\\dfrac{7}{9}$ nên tử số lớn hơn 7.'],
      solution: 'Tử số lớn hơn 7 và bé hơn 9, nên tử số là 8: $\\dfrac{7}{9} < \\dfrac{8}{9} < 1$.',
    },
  ],
  takeaways: [
    'Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.',
    'Tử số bé hơn mẫu số thì phân số bé hơn 1; bằng mẫu số thì bằng 1; lớn hơn mẫu số thì lớn hơn 1.',
    'Hai phân số khác mẫu số: quy đồng mẫu số rồi so sánh hai phân số cùng mẫu số.',
  ],
};
