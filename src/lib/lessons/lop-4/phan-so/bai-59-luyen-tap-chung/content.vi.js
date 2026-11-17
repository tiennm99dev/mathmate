/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phân số: đọc, viết phân số, phân số và phép chia, phân số bằng nhau, rút gọn phân số, quy đồng mẫu số và so sánh phân số trong các bài toán thực tế.',
  intro:
    'Có một cái bánh pi-da. Việt ăn $\\dfrac{1}{2}$ cái bánh, Mi ăn $\\dfrac{1}{6}$ cái bánh, Mai ăn $\\dfrac{1}{3}$ cái bánh. Bạn nào ăn ít bánh nhất? Em cùng ôn lại phân số để trả lời nhé!',
  objectives: [
    'Viết được phân số bằng phân số đã cho, rút gọn được phân số.',
    'Quy đồng được mẫu số hai hoặc nhiều phân số.',
    'So sánh và sắp xếp được các phân số, vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Ôn lại phân số bằng nhau, rút gọn và quy đồng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân (hoặc chia) cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0, ta được một phân số bằng phân số đã cho.',
        },
        {
          type: 'p',
          text: 'Rút gọn: $\\dfrac{16}{24} = \\dfrac{16 : 8}{24 : 8} = \\dfrac{2}{3}$. Phân số $\\dfrac{2}{3}$ là phân số tối giản.',
        },
        {
          type: 'p',
          text: 'Quy đồng mẫu số $\\dfrac{1}{6}$ và $\\dfrac{7}{18}$: 18 : 6 = 3, nên $\\dfrac{1}{6} = \\dfrac{1 \\times 3}{6 \\times 3} = \\dfrac{3}{18}$; giữ nguyên $\\dfrac{7}{18}$.',
        },
      ],
    },
    {
      heading: 'Ôn lại so sánh phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn. Khác mẫu số: quy đồng mẫu số rồi so sánh. Tử số bé hơn mẫu số thì phân số bé hơn 1; tử số lớn hơn mẫu số thì phân số lớn hơn 1.',
        },
        {
          type: 'table',
          head: ['Hai phân số', 'Cách làm', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{21}{23}$ và $\\dfrac{19}{23}$',
              'Cùng mẫu số, 21 > 19',
              '$\\dfrac{21}{23} > \\dfrac{19}{23}$',
            ],
            [
              '$\\dfrac{8}{5}$ và $\\dfrac{49}{30}$',
              '$\\dfrac{8}{5} = \\dfrac{48}{30}$',
              '$\\dfrac{8}{5} < \\dfrac{49}{30}$',
            ],
            ['$\\dfrac{8}{9}$ và 1', '8 < 9', '$\\dfrac{8}{9} < 1$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập phân số',
    instruction:
      'Mỗi lượt có một câu của từng dạng bài: phân số chỉ phần tô màu, phân số và phép chia, phân số bằng nhau, rút gọn, quy đồng mẫu số và so sánh phân số. Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại.',
  },
  examples: [
    {
      problem: 'Quy đồng mẫu số các phân số $\\dfrac{2}{5}$; $\\dfrac{13}{15}$; $\\dfrac{19}{45}$.',
      steps: [
        '45 chia hết cho 5 và cho 15. Chọn mẫu số chung là 45.',
        '45 : 5 = 9, nên $\\dfrac{2}{5} = \\dfrac{2 \\times 9}{5 \\times 9} = \\dfrac{18}{45}$.',
        '45 : 15 = 3, nên $\\dfrac{13}{15} = \\dfrac{13 \\times 3}{15 \\times 3} = \\dfrac{39}{45}$. Giữ nguyên $\\dfrac{19}{45}$.',
      ],
      answer: 'Được $\\dfrac{18}{45}$; $\\dfrac{39}{45}$; $\\dfrac{19}{45}$.',
    },
    {
      problem: 'Viết $2$; $\\dfrac{1}{2}$; $\\dfrac{3}{4}$ thành ba phân số có mẫu số là 12.',
      steps: [
        '$2 = \\dfrac{2}{1} = \\dfrac{2 \\times 12}{1 \\times 12} = \\dfrac{24}{12}$.',
        '12 : 2 = 6, nên $\\dfrac{1}{2} = \\dfrac{1 \\times 6}{2 \\times 6} = \\dfrac{6}{12}$.',
        '12 : 4 = 3, nên $\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$.',
      ],
      answer: 'Được $\\dfrac{24}{12}$; $\\dfrac{6}{12}$; $\\dfrac{9}{12}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '$\\dfrac{16}{24} = \\dfrac{2}{3} = \\dfrac{?}{12}$. Số nào thích hợp với dấu ?',
      answer: 8,
      hints: ['12 : 3 = 4.', 'Nhân cả tử số và mẫu số của $\\dfrac{2}{3}$ với 4.'],
      solution: '$\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{63}{81}$ thành phân số tối giản.',
      answer: [7, 9],
      simplest: true,
      hints: ['Cả 63 và 81 đều chia hết cho 9.'],
      solution: '$\\dfrac{63}{81} = \\dfrac{63 : 9}{81 : 9} = \\dfrac{7}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào bằng $\\dfrac{5}{6}$?',
      options: ['$\\dfrac{5}{30}$', '$\\dfrac{25}{30}$', '$\\dfrac{10}{30}$', '$\\dfrac{6}{30}$'],
      answer: 1,
      hints: ['30 : 6 = 5. Nhân cả tử số và mẫu số với 5.'],
      solution: '$\\dfrac{5}{6} = \\dfrac{5 \\times 5}{6 \\times 5} = \\dfrac{25}{30}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{5 \\times 6 \\times 12}{6 \\times 12 \\times 7}$',
      answer: [5, 7],
      simplest: true,
      hints: [
        'Tử số và mẫu số cùng có thừa số 6 và 12.',
        'Chia cả tử số và mẫu số cho $6 \\times 12$.',
      ],
      solution:
        'Chia cả tử số và mẫu số cho $6 \\times 12$: $\\dfrac{5 \\times 6 \\times 12}{6 \\times 12 \\times 7} = \\dfrac{5}{7}$.',
    },
    {
      type: 'match',
      prompt:
        'Quy đồng mẫu số từng cặp: $\\dfrac{1}{6}$ và $\\dfrac{7}{18}$; $\\dfrac{4}{5}$ và $\\dfrac{11}{60}$; $\\dfrac{7}{25}$ và $\\dfrac{3}{100}$. Em nối phân số thứ nhất của mỗi cặp với phân số mới của nó.',
      left: ['$\\dfrac{1}{6}$', '$\\dfrac{4}{5}$', '$\\dfrac{7}{25}$'],
      right: ['$\\dfrac{3}{18}$', '$\\dfrac{48}{60}$', '$\\dfrac{28}{100}$', '$\\dfrac{7}{100}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Mẫu số chung là 18, 60 và 100.',
        'Lấy mẫu số chung chia cho mẫu số, rồi nhân cả tử số và mẫu số với thương đó.',
      ],
      solution:
        '18 : 6 = 3, $\\dfrac{1}{6} = \\dfrac{3}{18}$; 60 : 5 = 12, $\\dfrac{4}{5} = \\dfrac{48}{60}$; 100 : 25 = 4, $\\dfrac{7}{25} = \\dfrac{28}{100}$.',
    },
    {
      type: 'multi',
      prompt:
        'Quy đồng mẫu số các phân số $\\dfrac{1}{2}$; $\\dfrac{3}{8}$; $\\dfrac{5}{4}$; $\\dfrac{7}{16}$ với mẫu số chung 16. Chọn các phân số em nhận được.',
      options: [
        '$\\dfrac{8}{16}$',
        '$\\dfrac{6}{16}$',
        '$\\dfrac{20}{16}$',
        '$\\dfrac{7}{16}$',
        '$\\dfrac{4}{16}$',
        '$\\dfrac{5}{16}$',
      ],
      answers: [0, 1, 2, 3],
      hints: ['16 : 2 = 8, 16 : 8 = 2, 16 : 4 = 4.', 'Giữ nguyên $\\dfrac{7}{16}$.'],
      solution:
        '$\\dfrac{1}{2} = \\dfrac{8}{16}$; $\\dfrac{3}{8} = \\dfrac{6}{16}$; $\\dfrac{5}{4} = \\dfrac{20}{16}$; giữ nguyên $\\dfrac{7}{16}$.',
    },
    {
      type: 'number',
      prompt:
        'Viết số 3 thành phân số có mẫu số 8: $3 = \\dfrac{?}{8}$. Số nào thích hợp với dấu ?',
      answer: 24,
      hints: ['$3 = \\dfrac{3}{1}$.', 'Nhân cả tử số và mẫu số của $\\dfrac{3}{1}$ với 8.'],
      solution: '$3 = \\dfrac{3}{1} = \\dfrac{3 \\times 8}{1 \\times 8} = \\dfrac{24}{8}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{8}{5}$ ? $\\dfrac{49}{30}$',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['30 : 5 = 6. Viết $\\dfrac{8}{5}$ thành phân số có mẫu số 30.'],
      solution:
        '$\\dfrac{8}{5} = \\dfrac{8 \\times 6}{5 \\times 6} = \\dfrac{48}{30}$. Vì $\\dfrac{48}{30} < \\dfrac{49}{30}$ nên $\\dfrac{8}{5} < \\dfrac{49}{30}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{9}{20}$ ? $\\dfrac{9}{10}$',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['20 : 10 = 2. Quy đồng mẫu số với mẫu số chung 20.'],
      solution:
        '$\\dfrac{9}{10} = \\dfrac{18}{20}$. Vì $\\dfrac{9}{20} < \\dfrac{18}{20}$ nên $\\dfrac{9}{20} < \\dfrac{9}{10}$.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt nhận được $\\dfrac{1}{3}$ túi bi, Việt nhận được $\\dfrac{4}{9}$ túi bi đó. Ai nhận được nhiều bi hơn?',
      options: ['Rô-bốt', 'Việt', 'Hai bạn nhận bằng nhau'],
      answer: 1,
      hints: ['Quy đồng mẫu số với mẫu số chung 9.'],
      solution:
        '$\\dfrac{1}{3} = \\dfrac{3}{9}$. Vì $\\dfrac{3}{9} < \\dfrac{4}{9}$ nên Việt nhận được nhiều bi hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Việt ăn $\\dfrac{1}{2}$ cái bánh, Mi ăn $\\dfrac{1}{6}$ cái bánh, Mai ăn $\\dfrac{1}{3}$ cái bánh. Bạn nào ăn ít bánh nhất?',
      options: ['Việt', 'Mi', 'Mai'],
      answer: 1,
      hints: ['Quy đồng mẫu số ba phân số với mẫu số chung 6.'],
      solution:
        '$\\dfrac{1}{2} = \\dfrac{3}{6}$, $\\dfrac{1}{3} = \\dfrac{2}{6}$. Vì $\\dfrac{1}{6} < \\dfrac{2}{6} < \\dfrac{3}{6}$ nên Mi ăn ít bánh nhất.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các phân số $\\dfrac{3}{4}$; $\\dfrac{17}{16}$; $\\dfrac{9}{8}$; $\\dfrac{11}{16}$; $\\dfrac{25}{32}$ theo thứ tự từ bé đến lớn.',
      items: [
        '$\\dfrac{3}{4}$',
        '$\\dfrac{17}{16}$',
        '$\\dfrac{9}{8}$',
        '$\\dfrac{11}{16}$',
        '$\\dfrac{25}{32}$',
      ],
      answer: [3, 0, 4, 1, 2],
      hints: ['Quy đồng mẫu số với mẫu số chung 32.', '32 : 4 = 8, 32 : 16 = 2, 32 : 8 = 4.'],
      solution:
        '$\\dfrac{3}{4} = \\dfrac{24}{32}$, $\\dfrac{17}{16} = \\dfrac{34}{32}$, $\\dfrac{9}{8} = \\dfrac{36}{32}$, $\\dfrac{11}{16} = \\dfrac{22}{32}$. Vì 22 < 24 < 25 < 34 < 36 nên $\\dfrac{11}{16} < \\dfrac{3}{4} < \\dfrac{25}{32} < \\dfrac{17}{16} < \\dfrac{9}{8}$.',
    },
    {
      type: 'choice',
      prompt:
        'Quả bưởi cân nặng $\\dfrac{9}{8}$ kg, quả thanh long cân nặng $\\dfrac{31}{32}$ kg. Quả nào nặng hơn?',
      options: ['Quả bưởi', 'Quả thanh long', 'Hai quả nặng bằng nhau'],
      answer: 0,
      hints: ['Em so sánh mỗi phân số với 1.'],
      solution:
        'Tử số 9 lớn hơn mẫu số 8 nên $\\dfrac{9}{8} > 1$. Tử số 31 bé hơn mẫu số 32 nên $\\dfrac{31}{32} < 1$. Vậy quả bưởi nặng hơn.',
    },
  ],
  takeaways: [
    'Nhân hoặc chia cả tử số và mẫu số với cùng một số khác 0 thì được phân số bằng phân số đã cho.',
    'Quy đồng mẫu số rồi so sánh tử số để so sánh hai phân số khác mẫu số.',
    'So sánh với 1 giúp so sánh nhanh một phân số bé hơn 1 với một phân số lớn hơn 1.',
  ],
};
