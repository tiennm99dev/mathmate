/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quy đồng mẫu số các phân số: viết các phân số đã cho thành các phân số bằng chúng và có cùng mẫu số (mẫu số chung), khi một mẫu số chia hết cho mẫu số kia hoặc khi biết mẫu số chung.',
  intro:
    'Hai băng giấy dài bằng nhau. Băng thứ nhất tô $\\dfrac{3}{4}$, băng thứ hai tô $\\dfrac{5}{8}$. Làm sao để hai băng có cùng số phần bằng nhau? Em cùng học quy đồng mẫu số nhé!',
  objectives: [
    'Nhận biết được mẫu số chung của hai phân số.',
    'Quy đồng được mẫu số hai phân số khi một mẫu số chia hết cho mẫu số kia.',
    'Viết được các phân số bằng phân số đã cho với một mẫu số chung cho trước.',
  ],
  sections: [
    {
      heading: 'Quy đồng mẫu số hai phân số',
      blocks: [
        {
          type: 'p',
          text: 'Cho hai phân số $\\dfrac{3}{4}$ và $\\dfrac{5}{8}$. Mẫu số 8 chia hết cho mẫu số 4: 8 : 4 = 2.',
        },
        {
          type: 'p',
          text: 'Nhân cả tử số và mẫu số của $\\dfrac{3}{4}$ với 2. Giữ nguyên phân số $\\dfrac{5}{8}$.',
        },
        { type: 'tex', tex: '\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}' },
        {
          type: 'p',
          text: 'Hai phân số $\\dfrac{6}{8}$ và $\\dfrac{5}{8}$ có cùng mẫu số 8. Ta nói: đã quy đồng mẫu số hai phân số $\\dfrac{3}{4}$ và $\\dfrac{5}{8}$. Số 8 gọi là mẫu số chung.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Quy đồng mẫu số hai phân số là viết hai phân số đó thành hai phân số bằng chúng và có cùng mẫu số. Mẫu số đó gọi là mẫu số chung.',
        },
      ],
    },
    {
      heading: 'Cách quy đồng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi mẫu số của phân số này chia hết cho mẫu số của phân số kia: lấy mẫu số lớn hơn làm mẫu số chung. Tìm thương của mẫu số chung và mẫu số của phân số kia. Nhân cả tử số và mẫu số của phân số kia với thương đó. Giữ nguyên phân số có mẫu số là mẫu số chung.',
        },
        {
          type: 'table',
          head: ['Hai phân số', 'Mẫu số chung', 'Sau khi quy đồng'],
          rows: [
            [
              '$\\dfrac{5}{9}$ và $\\dfrac{11}{18}$',
              '18',
              '$\\dfrac{10}{18}$ và $\\dfrac{11}{18}$',
            ],
            [
              '$\\dfrac{13}{60}$ và $\\dfrac{9}{20}$',
              '60',
              '$\\dfrac{13}{60}$ và $\\dfrac{27}{60}$',
            ],
            ['$\\dfrac{1}{3}$ và $\\dfrac{5}{6}$', '6', '$\\dfrac{2}{6}$ và $\\dfrac{5}{6}$'],
          ],
        },
      ],
    },
    {
      heading: 'Khi biết mẫu số chung',
      blocks: [
        {
          type: 'p',
          text: 'Tìm hai phân số lần lượt bằng $\\dfrac{2}{3}$ và $\\dfrac{3}{4}$ và có mẫu số chung là 12.',
        },
        {
          type: 'p',
          text: '12 : 3 = 4, nên $\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}$.',
        },
        {
          type: 'p',
          text: '12 : 4 = 3, nên $\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Lấy mẫu số chung chia cho mẫu số của từng phân số. Nhân cả tử số và mẫu số của phân số đó với thương vừa tìm được.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia lại hai băng giấy',
    instruction:
      'Em bấm + hoặc − để chia mỗi phần của từng băng thành nhiều phần nhỏ hơn. Phần tô màu không đổi, phân số mới bằng phân số cũ. Khi hai băng có cùng số phần, em đã quy đồng mẫu số.',
  },
  examples: [
    {
      problem: 'Quy đồng mẫu số hai phân số $\\dfrac{5}{6}$ và $\\dfrac{11}{24}$.',
      steps: [
        '24 chia hết cho 6, chọn mẫu số chung là 24.',
        '24 : 6 = 4. Nhân cả tử số và mẫu số của $\\dfrac{5}{6}$ với 4: $\\dfrac{5}{6} = \\dfrac{5 \\times 4}{6 \\times 4} = \\dfrac{20}{24}$.',
        'Giữ nguyên $\\dfrac{11}{24}$.',
      ],
      answer:
        'Quy đồng mẫu số $\\dfrac{5}{6}$ và $\\dfrac{11}{24}$ được $\\dfrac{20}{24}$ và $\\dfrac{11}{24}$.',
    },
    {
      problem: 'Rút gọn rồi quy đồng mẫu số hai phân số $\\dfrac{10}{25}$ và $\\dfrac{14}{40}$.',
      steps: [
        'Rút gọn: $\\dfrac{10}{25} = \\dfrac{10 : 5}{25 : 5} = \\dfrac{2}{5}$; $\\dfrac{14}{40} = \\dfrac{14 : 2}{40 : 2} = \\dfrac{7}{20}$.',
        '20 chia hết cho 5, chọn mẫu số chung là 20. 20 : 5 = 4.',
        '$\\dfrac{2}{5} = \\dfrac{2 \\times 4}{5 \\times 4} = \\dfrac{8}{20}$; giữ nguyên $\\dfrac{7}{20}$.',
      ],
      answer: 'Được hai phân số $\\dfrac{8}{20}$ và $\\dfrac{7}{20}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Quy đồng mẫu số $\\dfrac{7}{15}$ và $\\dfrac{19}{45}$ với mẫu số chung 45. Ta được $\\dfrac{7}{15} = \\dfrac{?}{45}$. Số nào thích hợp với dấu ?',
      answer: 21,
      hints: ['45 : 15 = 3.', 'Nhân tử số 7 với 3.'],
      solution:
        '45 : 15 = 3, nên $\\dfrac{7}{15} = \\dfrac{7 \\times 3}{15 \\times 3} = \\dfrac{21}{45}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào có mẫu số là 72 và bằng $\\dfrac{2}{9}$?',
      options: ['$\\dfrac{18}{72}$', '$\\dfrac{4}{18}$', '$\\dfrac{16}{72}$', '$\\dfrac{14}{72}$'],
      answer: 2,
      hints: ['72 : 9 = 8.', 'Nhân cả tử số và mẫu số của $\\dfrac{2}{9}$ với 8.'],
      solution:
        '72 : 9 = 8, nên $\\dfrac{2}{9} = \\dfrac{2 \\times 8}{9 \\times 8} = \\dfrac{16}{72}$.',
    },
    {
      type: 'choice',
      prompt: 'Quy đồng mẫu số hai phân số $\\dfrac{2}{3}$ và $\\dfrac{77}{300}$, ta được:',
      options: [
        '$\\dfrac{200}{300}$ và $\\dfrac{77}{300}$',
        '$\\dfrac{2}{300}$ và $\\dfrac{77}{300}$',
        '$\\dfrac{20}{300}$ và $\\dfrac{77}{300}$',
        '$\\dfrac{2}{3}$ và $\\dfrac{77}{3}$',
      ],
      answer: 0,
      hints: ['300 : 3 = 100.', 'Phải nhân cả tử số 2 với 100, không chỉ đổi mẫu số.'],
      solution:
        '300 : 3 = 100, nên $\\dfrac{2}{3} = \\dfrac{2 \\times 100}{3 \\times 100} = \\dfrac{200}{300}$. Giữ nguyên $\\dfrac{77}{300}$.',
    },
    {
      type: 'number',
      prompt: 'Mẫu số chung nào nên chọn khi quy đồng mẫu số $\\dfrac{3}{8}$ và $\\dfrac{5}{16}$?',
      answer: 16,
      hints: ['Mẫu số nào chia hết cho mẫu số kia?'],
      solution: '16 : 8 = 2, nên 16 chia hết cho 8. Chọn mẫu số chung là 16.',
    },
    {
      type: 'match',
      prompt: 'Quy đồng mẫu số với mẫu số chung là 12. Em nối mỗi phân số với phân số bằng nó.',
      left: ['$\\dfrac{2}{3}$', '$\\dfrac{3}{4}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{2}$'],
      right: [
        '$\\dfrac{8}{12}$',
        '$\\dfrac{9}{12}$',
        '$\\dfrac{2}{12}$',
        '$\\dfrac{6}{12}$',
        '$\\dfrac{3}{12}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Lấy 12 chia cho mẫu số của từng phân số, rồi nhân tử số với thương đó.'],
      solution:
        '$\\dfrac{2}{3} = \\dfrac{8}{12}$ (nhân 4); $\\dfrac{3}{4} = \\dfrac{9}{12}$ (nhân 3); $\\dfrac{1}{6} = \\dfrac{2}{12}$ (nhân 2); $\\dfrac{1}{2} = \\dfrac{6}{12}$ (nhân 6).',
    },
    {
      type: 'multi',
      prompt:
        'Quy đồng mẫu số ba phân số $\\dfrac{3}{5}$, $\\dfrac{4}{7}$ và $\\dfrac{9}{35}$ với mẫu số chung 35. Chọn các phân số em nhận được.',
      options: [
        '$\\dfrac{21}{35}$',
        '$\\dfrac{20}{35}$',
        '$\\dfrac{9}{35}$',
        '$\\dfrac{15}{35}$',
        '$\\dfrac{28}{35}$',
      ],
      answers: [0, 1, 2],
      hints: ['35 : 5 = 7 và 35 : 7 = 5.', 'Giữ nguyên $\\dfrac{9}{35}$.'],
      solution:
        '$\\dfrac{3}{5} = \\dfrac{3 \\times 7}{5 \\times 7} = \\dfrac{21}{35}$; $\\dfrac{4}{7} = \\dfrac{4 \\times 5}{7 \\times 5} = \\dfrac{20}{35}$; giữ nguyên $\\dfrac{9}{35}$.',
    },
    {
      type: 'number',
      prompt:
        'Quy đồng mẫu số $\\dfrac{5}{6}$, $\\dfrac{7}{9}$ và $\\dfrac{19}{54}$ với mẫu số chung 54. Ta được $\\dfrac{7}{9} = \\dfrac{?}{54}$. Số nào thích hợp với dấu ?',
      answer: 42,
      hints: ['54 : 9 = 6.', 'Nhân cả tử số và mẫu số của $\\dfrac{7}{9}$ với 6.'],
      solution:
        '54 : 9 = 6, nên $\\dfrac{7}{9} = \\dfrac{7 \\times 6}{9 \\times 6} = \\dfrac{42}{54}$.',
    },
    {
      type: 'choice',
      prompt:
        'Rút gọn rồi quy đồng mẫu số hai phân số $\\dfrac{2}{36}$ và $\\dfrac{8}{12}$, ta được:',
      options: [
        '$\\dfrac{1}{18}$ và $\\dfrac{12}{18}$',
        '$\\dfrac{2}{36}$ và $\\dfrac{8}{36}$',
        '$\\dfrac{1}{18}$ và $\\dfrac{2}{18}$',
        '$\\dfrac{1}{18}$ và $\\dfrac{2}{3}$',
      ],
      answer: 0,
      hints: [
        'Rút gọn: $\\dfrac{2}{36} = \\dfrac{1}{18}$ và $\\dfrac{8}{12} = \\dfrac{2}{3}$.',
        '18 : 3 = 6, nhân cả tử số và mẫu số của $\\dfrac{2}{3}$ với 6.',
      ],
      solution:
        '$\\dfrac{2}{36} = \\dfrac{2 : 2}{36 : 2} = \\dfrac{1}{18}$; $\\dfrac{8}{12} = \\dfrac{8 : 4}{12 : 4} = \\dfrac{2}{3} = \\dfrac{2 \\times 6}{3 \\times 6} = \\dfrac{12}{18}$. Được $\\dfrac{1}{18}$ và $\\dfrac{12}{18}$.',
    },
  ],
  takeaways: [
    'Quy đồng mẫu số là viết các phân số thành các phân số bằng chúng và có cùng mẫu số (mẫu số chung).',
    'Khi mẫu số này chia hết cho mẫu số kia, lấy mẫu số lớn hơn làm mẫu số chung.',
    'Lấy mẫu số chung chia cho mẫu số của phân số kia, rồi nhân cả tử số và mẫu số của phân số kia với thương đó.',
  ],
};
