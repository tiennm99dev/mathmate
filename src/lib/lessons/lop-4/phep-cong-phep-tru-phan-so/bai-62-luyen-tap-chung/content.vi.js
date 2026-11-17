/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép cộng, phép trừ phân số: cộng, trừ phân số cùng mẫu số và khác mẫu số, rút gọn rồi tính, cộng trừ số tự nhiên với phân số, tính thuận tiện và giải bài toán thực tế.',
  intro:
    'Ba người thu hoạch cà phê: anh A Phan được $\\dfrac{1}{5}$ rẫy, chị Rang Hu được $\\dfrac{3}{10}$ rẫy, chú Y Phui được $\\dfrac{7}{20}$ rẫy. Cả ba người thu hoạch được mấy phần rẫy? Em cùng luyện tập nhé!',
  objectives: [
    'Cộng, trừ được hai phân số cùng mẫu số và khác mẫu số.',
    'Cộng, trừ được số tự nhiên với phân số.',
    'Tính thuận tiện và giải được bài toán thực tế có phép cộng, phép trừ phân số.',
  ],
  sections: [
    {
      heading: 'Ôn lại cộng, trừ phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cùng mẫu số: cộng (hoặc trừ) hai tử số, giữ nguyên mẫu số. Khác mẫu số: quy đồng mẫu số rồi cộng (hoặc trừ).',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Cách làm', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{2}{3} + \\dfrac{4}{9}$',
              '$\\dfrac{6}{9} + \\dfrac{4}{9}$',
              '$\\dfrac{10}{9}$',
            ],
            [
              '$\\dfrac{5}{6} - \\dfrac{5}{12}$',
              '$\\dfrac{10}{12} - \\dfrac{5}{12}$',
              '$\\dfrac{5}{12}$',
            ],
            [
              '$\\dfrac{1}{10} + \\dfrac{2}{5}$',
              '$\\dfrac{1}{10} + \\dfrac{4}{10} = \\dfrac{5}{10}$',
              '$\\dfrac{1}{2}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tính thuận tiện: nhóm các phân số có tổng tròn trước. $\\dfrac{599}{1000} + \\dfrac{377}{1000} + \\dfrac{1}{1000} = \\dfrac{600}{1000} + \\dfrac{377}{1000} = \\dfrac{977}{1000}$.',
        },
      ],
    },
    {
      heading: 'Cộng, trừ số tự nhiên với phân số',
      blocks: [
        {
          type: 'p',
          text: 'Viết số tự nhiên thành phân số có cùng mẫu số với phân số kia, rồi cộng hoặc trừ.',
        },
        {
          type: 'tex',
          tex: '1 + \\dfrac{4}{9} = \\dfrac{9}{9} + \\dfrac{4}{9} = \\dfrac{13}{9}',
        },
        {
          type: 'tex',
          tex: '3 - \\dfrac{5}{6} = \\dfrac{18}{6} - \\dfrac{5}{6} = \\dfrac{13}{6}',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài cộng, trừ phân số',
    instruction:
      'Mỗi lượt có một câu của từng dạng bài: cộng, trừ cùng mẫu số và khác mẫu số, rút gọn rồi tính, số tự nhiên với phân số, tính thuận tiện, tìm phép tính sai và bài toán. Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại.',
  },
  examples: [
    {
      problem:
        'Một cây gỗ dài $\\dfrac{17}{4}$ m. Bác thợ cắt khúc thứ nhất dài $\\dfrac{3}{2}$ m, khúc thứ hai dài $\\dfrac{9}{8}$ m. Khúc gỗ còn lại dài bao nhiêu mét?',
      steps: [
        'Chọn mẫu số chung là 8: $\\dfrac{17}{4} = \\dfrac{34}{8}$, $\\dfrac{3}{2} = \\dfrac{12}{8}$.',
        'Sau khi cắt khúc thứ nhất còn: $\\dfrac{34}{8} - \\dfrac{12}{8} = \\dfrac{22}{8}$ (m).',
        'Sau khi cắt khúc thứ hai còn: $\\dfrac{22}{8} - \\dfrac{9}{8} = \\dfrac{13}{8}$ (m).',
      ],
      answer: 'Khúc gỗ còn lại dài $\\dfrac{13}{8}$ m.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: $\\dfrac{15}{4} + \\dfrac{15}{16} + \\dfrac{5}{16}$.',
      steps: [
        'Nhóm hai phân số cùng mẫu số 16: $\\dfrac{15}{16} + \\dfrac{5}{16} = \\dfrac{20}{16} = \\dfrac{5}{4}$.',
        '$\\dfrac{15}{4} + \\dfrac{5}{4} = \\dfrac{20}{4} = 5$.',
      ],
      answer: '$\\dfrac{15}{4} + \\dfrac{15}{16} + \\dfrac{5}{16} = 5$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{2}{3} + \\dfrac{4}{9}$.',
      options: ['$\\dfrac{10}{9}$', '$\\dfrac{6}{12}$', '$\\dfrac{6}{9}$', '$\\dfrac{10}{12}$'],
      answer: 0,
      hints: ['Mẫu số chung là 9: $\\dfrac{2}{3} = \\dfrac{6}{9}$.'],
      solution: '$\\dfrac{2}{3} + \\dfrac{4}{9} = \\dfrac{6}{9} + \\dfrac{4}{9} = \\dfrac{10}{9}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\dfrac{1}{10} + \\dfrac{2}{5}$. Em viết kết quả là phân số tối giản, ví dụ 3/4.',
      answer: [1, 2],
      simplest: true,
      hints: ['$\\dfrac{2}{5} = \\dfrac{4}{10}$.', 'Rút gọn kết quả $\\dfrac{5}{10}$.'],
      solution:
        '$\\dfrac{1}{10} + \\dfrac{2}{5} = \\dfrac{1}{10} + \\dfrac{4}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt: '$\\dfrac{7}{22} - \\dfrac{3}{11} = \\dfrac{?}{22}$. Số nào thích hợp với dấu ?',
      answer: 1,
      hints: ['$\\dfrac{3}{11} = \\dfrac{6}{22}$.'],
      solution:
        '$\\dfrac{7}{22} - \\dfrac{3}{11} = \\dfrac{7}{22} - \\dfrac{6}{22} = \\dfrac{1}{22}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{5}{6} - \\dfrac{5}{12}$.',
      options: ['$\\dfrac{5}{12}$', '$\\dfrac{10}{12}$', '$\\dfrac{1}{12}$', '$\\dfrac{15}{12}$'],
      answer: 0,
      hints: ['Mẫu số chung là 12: $\\dfrac{5}{6} = \\dfrac{10}{12}$.'],
      solution:
        '$\\dfrac{5}{6} - \\dfrac{5}{12} = \\dfrac{10}{12} - \\dfrac{5}{12} = \\dfrac{5}{12}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép tính đúng.',
      options: [
        '$\\dfrac{1}{2} - \\dfrac{1}{8} = \\dfrac{3}{8}$',
        '$\\dfrac{7}{10} - \\dfrac{1}{5} = \\dfrac{6}{5}$',
        '$\\dfrac{5}{4} + \\dfrac{5}{12} = \\dfrac{5}{16}$',
        '$\\dfrac{3}{6} + \\dfrac{2}{3} = \\dfrac{7}{6}$',
      ],
      answers: [0, 3],
      hints: [
        'Tự tính từng phép tính: quy đồng mẫu số rồi cộng hoặc trừ hai tử số.',
        'Mẫu số giữ nguyên, không cộng hay trừ hai mẫu số.',
      ],
      solution:
        '$\\dfrac{1}{2} - \\dfrac{1}{8} = \\dfrac{4}{8} - \\dfrac{1}{8} = \\dfrac{3}{8}$: đúng. $\\dfrac{3}{6} + \\dfrac{2}{3} = \\dfrac{3}{6} + \\dfrac{4}{6} = \\dfrac{7}{6}$: đúng. $\\dfrac{7}{10} - \\dfrac{1}{5} = \\dfrac{5}{10} = \\dfrac{1}{2}$, không phải $\\dfrac{6}{5}$. $\\dfrac{5}{4} + \\dfrac{5}{12} = \\dfrac{15}{12} + \\dfrac{5}{12} = \\dfrac{20}{12} = \\dfrac{5}{3}$, không phải $\\dfrac{5}{16}$.',
    },
    {
      type: 'match',
      prompt: 'Rút gọn rồi tính. Em nối mỗi phép tính với kết quả của nó.',
      left: [
        '$\\dfrac{4}{24} + \\dfrac{7}{6}$',
        '$\\dfrac{10}{15} - \\dfrac{1}{3}$',
        '$\\dfrac{21}{28} - \\dfrac{1}{4}$',
        '$\\dfrac{35}{40} + \\dfrac{5}{8}$',
      ],
      right: [
        '$\\dfrac{4}{3}$',
        '$\\dfrac{1}{3}$',
        '$\\dfrac{1}{2}$',
        '$\\dfrac{3}{2}$',
        '$\\dfrac{2}{3}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Rút gọn: $\\dfrac{4}{24} = \\dfrac{1}{6}$, $\\dfrac{10}{15} = \\dfrac{2}{3}$, $\\dfrac{21}{28} = \\dfrac{3}{4}$, $\\dfrac{35}{40} = \\dfrac{7}{8}$.',
      ],
      solution:
        '$\\dfrac{1}{6} + \\dfrac{7}{6} = \\dfrac{8}{6} = \\dfrac{4}{3}$; $\\dfrac{2}{3} - \\dfrac{1}{3} = \\dfrac{1}{3}$; $\\dfrac{3}{4} - \\dfrac{1}{4} = \\dfrac{2}{4} = \\dfrac{1}{2}$; $\\dfrac{7}{8} + \\dfrac{5}{8} = \\dfrac{12}{8} = \\dfrac{3}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính bằng cách thuận tiện: $\\dfrac{599}{1000} + \\dfrac{377}{1000} + \\dfrac{1}{1000} = \\dfrac{?}{1000}$. Số nào thích hợp với dấu ?',
      answer: 977,
      hints: ['Nhóm $\\dfrac{599}{1000}$ với $\\dfrac{1}{1000}$ trước: 599 + 1 = 600.'],
      solution:
        '$\\left(\\dfrac{599}{1000} + \\dfrac{1}{1000}\\right) + \\dfrac{377}{1000} = \\dfrac{600}{1000} + \\dfrac{377}{1000} = \\dfrac{977}{1000}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $1 + \\dfrac{4}{9} = \\dfrac{?}{9}$. Số nào thích hợp với dấu ?',
      answer: 13,
      hints: ['Viết 1 thành phân số có mẫu số 9: $1 = \\dfrac{9}{9}$.'],
      solution: '$1 + \\dfrac{4}{9} = \\dfrac{9}{9} + \\dfrac{4}{9} = \\dfrac{13}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $3 - \\dfrac{5}{6}$.',
      options: ['$\\dfrac{13}{6}$', '$\\dfrac{2}{6}$', '$\\dfrac{3}{6}$', '$\\dfrac{23}{6}$'],
      answer: 0,
      hints: ['Viết 3 thành phân số có mẫu số 6: $3 = \\dfrac{18}{6}$.'],
      solution: '$3 - \\dfrac{5}{6} = \\dfrac{18}{6} - \\dfrac{5}{6} = \\dfrac{13}{6}$.',
    },
    {
      type: 'choice',
      prompt:
        'Anh A Phan thu hoạch $\\dfrac{1}{5}$ rẫy cà phê, chị Rang Hu $\\dfrac{3}{10}$ rẫy, chú Y Phui $\\dfrac{7}{20}$ rẫy. Cả ba người thu hoạch được mấy phần rẫy cà phê?',
      options: ['$\\dfrac{17}{20}$', '$\\dfrac{11}{35}$', '$\\dfrac{11}{20}$', '$\\dfrac{3}{4}$'],
      answer: 0,
      hints: [
        'Mẫu số chung là 20.',
        '$\\dfrac{1}{5} = \\dfrac{4}{20}$, $\\dfrac{3}{10} = \\dfrac{6}{20}$.',
      ],
      solution:
        '$\\dfrac{1}{5} + \\dfrac{3}{10} + \\dfrac{7}{20} = \\dfrac{4}{20} + \\dfrac{6}{20} + \\dfrac{7}{20} = \\dfrac{17}{20}$. Cả ba người thu hoạch được $\\dfrac{17}{20}$ rẫy cà phê.',
    },
    {
      type: 'fraction',
      prompt:
        'Cây gỗ dài $\\dfrac{17}{4}$ m. Cắt khúc thứ nhất dài $\\dfrac{3}{2}$ m, khúc thứ hai dài $\\dfrac{9}{8}$ m. Khúc còn lại dài bao nhiêu mét? Em viết kết quả dạng phân số, ví dụ 3/4.',
      answer: [13, 8],
      hints: [
        'Chọn mẫu số chung là 8.',
        '$\\dfrac{17}{4} = \\dfrac{34}{8}$, $\\dfrac{3}{2} = \\dfrac{12}{8}$.',
      ],
      solution:
        '$\\dfrac{34}{8} - \\dfrac{12}{8} - \\dfrac{9}{8} = \\dfrac{13}{8}$. Khúc còn lại dài $\\dfrac{13}{8}$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt có $\\dfrac{7}{12}$ chai nước giặt. Rô-bốt dùng $\\dfrac{1}{3}$ chai để giặt chăn và $\\dfrac{1}{6}$ chai để giặt quần áo. Rô-bốt còn lại mấy phần chai nước giặt?',
      options: ['$\\dfrac{1}{12}$', '$\\dfrac{5}{12}$', '$\\dfrac{1}{4}$', '$\\dfrac{5}{3}$'],
      answer: 0,
      hints: [
        'Mẫu số chung là 12.',
        '$\\dfrac{1}{3} = \\dfrac{4}{12}$, $\\dfrac{1}{6} = \\dfrac{2}{12}$.',
      ],
      solution:
        '$\\dfrac{7}{12} - \\dfrac{4}{12} - \\dfrac{2}{12} = \\dfrac{1}{12}$. Rô-bốt còn lại $\\dfrac{1}{12}$ chai nước giặt.',
    },
  ],
  takeaways: [
    'Cộng, trừ hai phân số khác mẫu số: quy đồng mẫu số rồi cộng, trừ hai tử số.',
    'Cộng, trừ số tự nhiên với phân số: viết số tự nhiên thành phân số có cùng mẫu số.',
    'Kết quả rút gọn được thì rút gọn; nhóm các phân số có tổng tròn để tính thuận tiện.',
  ],
};
