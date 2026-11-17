/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ phân số: trừ hai phân số cùng mẫu số bằng cách trừ hai tử số và giữ nguyên mẫu số; trừ hai phân số khác mẫu số bằng cách quy đồng mẫu số rồi trừ.',
  intro:
    'Băng giấy có $\\dfrac{4}{5}$ đã tô màu. Em cắt bỏ $\\dfrac{1}{5}$ băng giấy tô màu. Phần tô màu còn lại là bao nhiêu? Em cùng học phép trừ phân số nhé!',
  objectives: [
    'Trừ được hai phân số cùng mẫu số.',
    'Trừ được hai phân số khác mẫu số bằng cách quy đồng mẫu số.',
    'Vận dụng phép trừ phân số để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Trừ hai phân số cùng mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Băng giấy chia thành 5 phần bằng nhau, đã tô màu 4 phần. Gạch bớt 1 phần, còn lại 4 − 1 = 3 phần.',
        },
        { type: 'tex', tex: '\\dfrac{4}{5} - \\dfrac{1}{5} = \\dfrac{4 - 1}{5} = \\dfrac{3}{5}' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn trừ hai phân số cùng mẫu số, ta trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai và giữ nguyên mẫu số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không trừ hai mẫu số. Mẫu số giữ nguyên.',
        },
      ],
    },
    {
      heading: 'Trừ hai phân số khác mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Tính $\\dfrac{3}{4} - \\dfrac{1}{8}$. 8 chia hết cho 4, chọn mẫu số chung là 8.',
        },
        {
          type: 'p',
          text: 'Quy đồng: $\\dfrac{3}{4} = \\dfrac{3 \\times 2}{4 \\times 2} = \\dfrac{6}{8}$.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{3}{4} - \\dfrac{1}{8} = \\dfrac{6}{8} - \\dfrac{1}{8} = \\dfrac{5}{8}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn trừ hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi trừ hai phân số đã quy đồng mẫu số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Kết quả rút gọn được thì em rút gọn: $\\dfrac{2}{5} - \\dfrac{3}{20} = \\dfrac{8}{20} - \\dfrac{3}{20} = \\dfrac{5}{20} = \\dfrac{1}{4}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gạch bớt mảnh trên băng giấy',
    instruction:
      'Em bấm + hoặc − để chia nhỏ các mảnh cho mảnh ở hai băng bằng nhau. Rồi em gạch bớt ở băng trên số mảnh bằng băng dưới. Phần còn lại là hiệu.',
  },
  examples: [
    {
      problem:
        'Dế Trũi có $\\dfrac{3}{8}$ chiếc lá. Dế Trũi cho Dế Mèn $\\dfrac{1}{4}$ chiếc lá. Dế Trũi còn lại mấy phần chiếc lá?',
      steps: [
        'Ta tính $\\dfrac{3}{8} - \\dfrac{1}{4}$. 8 chia hết cho 4, chọn mẫu số chung là 8.',
        '$\\dfrac{1}{4} = \\dfrac{1 \\times 2}{4 \\times 2} = \\dfrac{2}{8}$.',
        '$\\dfrac{3}{8} - \\dfrac{2}{8} = \\dfrac{1}{8}$.',
      ],
      answer: 'Dế Trũi còn lại $\\dfrac{1}{8}$ chiếc lá.',
    },
    {
      problem: 'Rút gọn rồi tính: $\\dfrac{5}{6} - \\dfrac{3}{18}$.',
      steps: [
        'Rút gọn: $\\dfrac{3}{18} = \\dfrac{3 : 3}{18 : 3} = \\dfrac{1}{6}$.',
        'Cùng mẫu số 6: $\\dfrac{5}{6} - \\dfrac{1}{6} = \\dfrac{4}{6}$.',
        'Rút gọn kết quả: $\\dfrac{4}{6} = \\dfrac{4 : 2}{6 : 2} = \\dfrac{2}{3}$.',
      ],
      answer: '$\\dfrac{5}{6} - \\dfrac{3}{18} = \\dfrac{2}{3}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '$\\dfrac{9}{11} - \\dfrac{3}{11} = \\dfrac{?}{11}$. Số nào thích hợp với dấu ?',
      answer: 6,
      hints: ['Hai phân số cùng mẫu số 11.', 'Trừ hai tử số: 9 − 3.'],
      solution: '$\\dfrac{9}{11} - \\dfrac{3}{11} = \\dfrac{9 - 3}{11} = \\dfrac{6}{11}$.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{10}{4} - \\dfrac{5}{4}$ bằng phân số nào?',
      options: ['$\\dfrac{5}{4}$', '$\\dfrac{15}{4}$', '$\\dfrac{5}{8}$', '$\\dfrac{2}{4}$'],
      answer: 0,
      hints: ['Trừ hai tử số, giữ nguyên mẫu số 4.'],
      solution: '$\\dfrac{10}{4} - \\dfrac{5}{4} = \\dfrac{10 - 5}{4} = \\dfrac{5}{4}$.',
    },
    {
      type: 'number',
      prompt: '$\\dfrac{3}{4} - \\dfrac{1}{8} = \\dfrac{?}{8}$. Số nào thích hợp với dấu ?',
      answer: 5,
      hints: [
        'Quy đồng: $\\dfrac{3}{4} = \\dfrac{6}{8}$.',
        'Tính $\\dfrac{6}{8} - \\dfrac{1}{8}$.',
      ],
      solution: '$\\dfrac{3}{4} - \\dfrac{1}{8} = \\dfrac{6}{8} - \\dfrac{1}{8} = \\dfrac{5}{8}$.',
    },
    {
      type: 'number',
      prompt:
        '$\\dfrac{1}{2} - \\dfrac{1}{6} = \\dfrac{3}{6} - \\dfrac{1}{6} = \\dfrac{2}{6} = \\dfrac{?}{3}$. Số nào thích hợp với dấu ?',
      answer: 1,
      hints: ['Rút gọn $\\dfrac{2}{6}$: chia cả tử số và mẫu số cho 2.'],
      solution:
        '$\\dfrac{2}{6} = \\dfrac{2 : 2}{6 : 2} = \\dfrac{1}{3}$. Vậy $\\dfrac{1}{2} - \\dfrac{1}{6} = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        'Dế Trũi có $\\dfrac{3}{8}$ chiếc lá, cho Dế Mèn $\\dfrac{1}{4}$ chiếc lá. Dế Trũi còn lại mấy phần chiếc lá?',
      options: ['$\\dfrac{1}{8}$', '$\\dfrac{2}{4}$', '$\\dfrac{2}{8}$'],
      answer: 0,
      hints: ['Mẫu số chung là 8.', '$\\dfrac{1}{4} = \\dfrac{2}{8}$.'],
      solution:
        '$\\dfrac{3}{8} - \\dfrac{1}{4} = \\dfrac{3}{8} - \\dfrac{2}{8} = \\dfrac{1}{8}$. Dế Trũi còn lại $\\dfrac{1}{8}$ chiếc lá.',
    },
    {
      type: 'match',
      prompt: 'Rút gọn rồi tính. Em nối mỗi phép tính với kết quả của nó.',
      left: [
        '$\\dfrac{2}{3} - \\dfrac{2}{6}$',
        '$\\dfrac{5}{6} - \\dfrac{3}{18}$',
        '$\\dfrac{8}{14} - \\dfrac{2}{7}$',
        '$\\dfrac{12}{20} - \\dfrac{2}{5}$',
      ],
      right: [
        '$\\dfrac{1}{3}$',
        '$\\dfrac{2}{3}$',
        '$\\dfrac{2}{7}$',
        '$\\dfrac{1}{5}$',
        '$\\dfrac{1}{2}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Rút gọn: $\\dfrac{2}{6} = \\dfrac{1}{3}$, $\\dfrac{3}{18} = \\dfrac{1}{6}$, $\\dfrac{8}{14} = \\dfrac{4}{7}$, $\\dfrac{12}{20} = \\dfrac{3}{5}$.',
      ],
      solution:
        '$\\dfrac{2}{3} - \\dfrac{1}{3} = \\dfrac{1}{3}$; $\\dfrac{5}{6} - \\dfrac{1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}$; $\\dfrac{4}{7} - \\dfrac{2}{7} = \\dfrac{2}{7}$; $\\dfrac{3}{5} - \\dfrac{2}{5} = \\dfrac{1}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào đúng?',
      options: [
        '$\\dfrac{7}{10} - \\dfrac{2}{5} = \\dfrac{3}{10}$',
        '$\\dfrac{7}{10} - \\dfrac{2}{5} = \\dfrac{5}{5}$',
        '$\\dfrac{3}{4} - \\dfrac{5}{8} = \\dfrac{2}{4}$',
        '$\\dfrac{5}{6} - \\dfrac{1}{3} = \\dfrac{4}{6}$',
      ],
      answer: 0,
      hints: [
        'Quy đồng mẫu số rồi trừ hai tử số. Mẫu số giữ nguyên, không trừ.',
        'Khi quy đồng, nhân cả tử số và mẫu số.',
      ],
      solution:
        '$\\dfrac{7}{10} - \\dfrac{2}{5} = \\dfrac{7}{10} - \\dfrac{4}{10} = \\dfrac{3}{10}$. Đúng ra $\\dfrac{3}{4} - \\dfrac{5}{8} = \\dfrac{6}{8} - \\dfrac{5}{8} = \\dfrac{1}{8}$ và $\\dfrac{5}{6} - \\dfrac{1}{3} = \\dfrac{5}{6} - \\dfrac{2}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    },
    {
      type: 'choice',
      prompt:
        'Bác Tân dùng $\\dfrac{7}{12}$ mảnh đất để trồng rau và hoa, trong đó $\\dfrac{1}{3}$ mảnh đất trồng rau. Bác dùng mấy phần mảnh đất để trồng hoa?',
      options: ['$\\dfrac{1}{4}$', '$\\dfrac{6}{9}$', '$\\dfrac{6}{12}$', '$\\dfrac{1}{3}$'],
      answer: 0,
      hints: [
        'Tính $\\dfrac{7}{12} - \\dfrac{1}{3}$ với mẫu số chung là 12.',
        '$\\dfrac{1}{3} = \\dfrac{4}{12}$. Nhớ rút gọn kết quả.',
      ],
      solution:
        '$\\dfrac{7}{12} - \\dfrac{1}{3} = \\dfrac{7}{12} - \\dfrac{4}{12} = \\dfrac{3}{12} = \\dfrac{1}{4}$. Bác trồng hoa trên $\\dfrac{1}{4}$ mảnh đất.',
    },
    {
      type: 'fraction',
      prompt:
        'Thanh gỗ dài $\\dfrac{17}{10}$ m. Bố cắt đi $\\dfrac{6}{5}$ m. Phần còn lại dài bao nhiêu mét? Em viết kết quả dạng phân số, ví dụ 3/4.',
      answer: [1, 2],
      hints: ['Mẫu số chung là 10.', '$\\dfrac{6}{5} = \\dfrac{12}{10}$.'],
      solution:
        '$\\dfrac{17}{10} - \\dfrac{6}{5} = \\dfrac{17}{10} - \\dfrac{12}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}$ (m).',
    },
  ],
  takeaways: [
    'Trừ hai phân số cùng mẫu số: trừ hai tử số, giữ nguyên mẫu số.',
    'Trừ hai phân số khác mẫu số: quy đồng mẫu số rồi trừ.',
    'Kết quả rút gọn được thì rút gọn.',
  ],
};
