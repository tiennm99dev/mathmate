/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng phân số: cộng hai phân số cùng mẫu số bằng cách cộng hai tử số và giữ nguyên mẫu số; cộng hai phân số khác mẫu số bằng cách quy đồng mẫu số rồi cộng.',
  intro:
    'Mai tô màu $\\dfrac{3}{8}$ băng giấy, rồi tô tiếp $\\dfrac{2}{8}$ băng giấy. Mai đã tô màu bao nhiêu phần băng giấy? Em cùng học phép cộng phân số nhé!',
  objectives: [
    'Cộng được hai phân số cùng mẫu số.',
    'Cộng được hai phân số khác mẫu số bằng cách quy đồng mẫu số.',
    'Vận dụng phép cộng phân số để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Cộng hai phân số cùng mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Băng giấy chia thành 8 phần bằng nhau. Mai tô màu 3 phần, rồi tô tiếp 2 phần.',
        },
        {
          type: 'p',
          text: 'Mai đã tô màu 3 + 2 = 5 phần. Đó là $\\dfrac{5}{8}$ băng giấy.',
        },
        { type: 'tex', tex: '\\dfrac{3}{8} + \\dfrac{2}{8} = \\dfrac{3 + 2}{8} = \\dfrac{5}{8}' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và giữ nguyên mẫu số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không cộng hai mẫu số. $\\dfrac{3}{8} + \\dfrac{2}{8}$ không bằng $\\dfrac{5}{16}$.',
        },
      ],
    },
    {
      heading: 'Cộng hai phân số khác mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Tính $\\dfrac{3}{5} + \\dfrac{1}{10}$. Hai mẫu số khác nhau. 10 chia hết cho 5, chọn mẫu số chung là 10.',
        },
        {
          type: 'p',
          text: 'Quy đồng: $\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{3}{5} + \\dfrac{1}{10} = \\dfrac{6}{10} + \\dfrac{1}{10} = \\dfrac{7}{10}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn cộng hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi cộng hai phân số đã quy đồng mẫu số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phân số nào rút gọn được thì em có thể rút gọn trước rồi mới tính: $\\dfrac{21}{15} + \\dfrac{2}{5} = \\dfrac{7}{5} + \\dfrac{2}{5} = \\dfrac{9}{5}$.',
        },
      ],
    },
    {
      heading: 'Đổi chỗ, nhóm các phân số',
      blocks: [
        {
          type: 'p',
          text: '$\\dfrac{2}{9} + \\dfrac{5}{9} = \\dfrac{7}{9}$ và $\\dfrac{5}{9} + \\dfrac{2}{9} = \\dfrac{7}{9}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi đổi chỗ các phân số trong một tổng thì tổng không thay đổi.',
        },
        {
          type: 'p',
          text: 'Tính thuận tiện: nhóm hai phân số có tổng tròn trước. $\\dfrac{16}{15} + \\dfrac{7}{15} + \\dfrac{4}{15} = \\left(\\dfrac{16}{15} + \\dfrac{4}{15}\\right) + \\dfrac{7}{15} = \\dfrac{20}{15} + \\dfrac{7}{15} = \\dfrac{27}{15} = \\dfrac{9}{5}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép mảnh trên băng giấy',
    instruction:
      'Em bấm + hoặc − để chia nhỏ các mảnh của từng băng. Khi mảnh ở hai băng bằng nhau, chúng ghép lại thành băng tổng. Em chọn phân số chỉ băng tổng.',
  },
  examples: [
    {
      problem:
        'Hai nhóm sửa một đoạn đường. Nhóm thứ nhất sửa được $\\dfrac{3}{10}$ đoạn đường, nhóm thứ hai sửa được $\\dfrac{1}{5}$ đoạn đường. Cả hai nhóm sửa được mấy phần đoạn đường?',
      steps: [
        'Ta tính $\\dfrac{3}{10} + \\dfrac{1}{5}$. 10 chia hết cho 5, chọn mẫu số chung là 10.',
        '$\\dfrac{1}{5} = \\dfrac{1 \\times 2}{5 \\times 2} = \\dfrac{2}{10}$.',
        '$\\dfrac{3}{10} + \\dfrac{2}{10} = \\dfrac{5}{10} = \\dfrac{1}{2}$.',
      ],
      answer: 'Cả hai nhóm sửa được $\\dfrac{1}{2}$ đoạn đường.',
    },
    {
      problem: 'Rút gọn rồi tính: $\\dfrac{6}{16} + \\dfrac{1}{8}$.',
      steps: [
        'Rút gọn: $\\dfrac{6}{16} = \\dfrac{6 : 2}{16 : 2} = \\dfrac{3}{8}$.',
        'Cùng mẫu số 8: $\\dfrac{3}{8} + \\dfrac{1}{8} = \\dfrac{4}{8}$.',
        'Rút gọn kết quả: $\\dfrac{4}{8} = \\dfrac{4 : 4}{8 : 4} = \\dfrac{1}{2}$.',
      ],
      answer: '$\\dfrac{6}{16} + \\dfrac{1}{8} = \\dfrac{1}{2}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '$\\dfrac{7}{15} + \\dfrac{3}{15} = \\dfrac{?}{15}$. Số nào thích hợp với dấu ?',
      answer: 10,
      hints: ['Hai phân số cùng mẫu số 15.', 'Cộng hai tử số: 7 + 3.'],
      solution: '$\\dfrac{7}{15} + \\dfrac{3}{15} = \\dfrac{7 + 3}{15} = \\dfrac{10}{15}$.',
    },
    {
      type: 'choice',
      prompt: '$\\dfrac{5}{8} + \\dfrac{6}{8}$ bằng phân số nào?',
      options: ['$\\dfrac{11}{8}$', '$\\dfrac{11}{16}$', '$\\dfrac{30}{8}$', '$\\dfrac{1}{8}$'],
      answer: 0,
      hints: ['Cộng hai tử số, giữ nguyên mẫu số.'],
      solution:
        '$\\dfrac{5}{8} + \\dfrac{6}{8} = \\dfrac{5 + 6}{8} = \\dfrac{11}{8}$. Không cộng hai mẫu số.',
    },
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{3}{5} + \\dfrac{1}{10}$.',
      options: ['$\\dfrac{7}{10}$', '$\\dfrac{4}{15}$', '$\\dfrac{4}{10}$', '$\\dfrac{4}{5}$'],
      answer: 0,
      hints: ['Mẫu số chung là 10.', 'Nhân cả tử số và mẫu số của $\\dfrac{3}{5}$ với 2.'],
      solution:
        '$\\dfrac{3}{5} + \\dfrac{1}{10} = \\dfrac{6}{10} + \\dfrac{1}{10} = \\dfrac{7}{10}$.',
    },
    {
      type: 'number',
      prompt:
        '$\\dfrac{8}{9} + \\dfrac{2}{3} = \\dfrac{8}{9} + \\dfrac{6}{9} = \\dfrac{?}{9}$. Số nào thích hợp với dấu ?',
      answer: 14,
      hints: ['$\\dfrac{2}{3} = \\dfrac{6}{9}$. Bây giờ hai phân số cùng mẫu số 9.'],
      solution: '$\\dfrac{8}{9} + \\dfrac{6}{9} = \\dfrac{8 + 6}{9} = \\dfrac{14}{9}$.',
    },
    {
      type: 'match',
      prompt: 'Rút gọn rồi tính. Em nối mỗi phép tính với kết quả của nó.',
      left: [
        '$\\dfrac{21}{15} + \\dfrac{2}{5}$',
        '$\\dfrac{6}{16} + \\dfrac{1}{8}$',
        '$\\dfrac{3}{12} + \\dfrac{3}{4}$',
      ],
      right: ['$\\dfrac{9}{5}$', '$\\dfrac{1}{2}$', '$1$', '$\\dfrac{23}{20}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Rút gọn: $\\dfrac{21}{15} = \\dfrac{7}{5}$, $\\dfrac{6}{16} = \\dfrac{3}{8}$, $\\dfrac{3}{12} = \\dfrac{1}{4}$.',
      ],
      solution:
        '$\\dfrac{7}{5} + \\dfrac{2}{5} = \\dfrac{9}{5}$; $\\dfrac{3}{8} + \\dfrac{1}{8} = \\dfrac{4}{8} = \\dfrac{1}{2}$; $\\dfrac{1}{4} + \\dfrac{3}{4} = \\dfrac{4}{4} = 1$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các tổng bằng $\\dfrac{2}{9} + \\dfrac{5}{9}$.',
      options: [
        '$\\dfrac{5}{9} + \\dfrac{2}{9}$',
        '$\\dfrac{7}{9}$',
        '$\\dfrac{7}{18}$',
        '$\\dfrac{3}{9} + \\dfrac{4}{9}$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Đổi chỗ các phân số thì tổng không đổi.',
        'Tính từng tổng rồi so sánh với $\\dfrac{7}{9}$.',
      ],
      solution:
        '$\\dfrac{2}{9} + \\dfrac{5}{9} = \\dfrac{7}{9}$. Cũng bằng $\\dfrac{7}{9}$: $\\dfrac{5}{9} + \\dfrac{2}{9}$ và $\\dfrac{3}{9} + \\dfrac{4}{9}$. Còn $\\dfrac{7}{18}$ là cộng nhầm cả mẫu số.',
    },
    {
      type: 'number',
      prompt:
        'Tính bằng cách thuận tiện: $\\dfrac{16}{15} + \\dfrac{7}{15} + \\dfrac{4}{15} = \\dfrac{?}{15}$. Số nào thích hợp với dấu ?',
      answer: 27,
      hints: ['Nhóm $\\dfrac{16}{15}$ với $\\dfrac{4}{15}$ trước: 16 + 4 = 20.'],
      solution:
        '$\\left(\\dfrac{16}{15} + \\dfrac{4}{15}\\right) + \\dfrac{7}{15} = \\dfrac{20}{15} + \\dfrac{7}{15} = \\dfrac{27}{15}$.',
    },
    {
      type: 'choice',
      prompt:
        'Việt dùng $\\dfrac{1}{2}$ số tiền để mua vở và $\\dfrac{1}{6}$ số tiền để mua bút. Việt đã dùng mấy phần số tiền?',
      options: ['$\\dfrac{2}{3}$', '$\\dfrac{2}{8}$', '$\\dfrac{2}{6}$', '$\\dfrac{1}{12}$'],
      answer: 0,
      hints: [
        'Tính $\\dfrac{1}{2} + \\dfrac{1}{6}$ với mẫu số chung là 6.',
        '$\\dfrac{1}{2} = \\dfrac{3}{6}$. Nhớ rút gọn kết quả.',
      ],
      solution:
        '$\\dfrac{1}{2} + \\dfrac{1}{6} = \\dfrac{3}{6} + \\dfrac{1}{6} = \\dfrac{4}{6} = \\dfrac{2}{3}$. Việt đã dùng $\\dfrac{2}{3}$ số tiền.',
    },
    {
      type: 'number',
      prompt:
        'Ba bạn uống nước cam: Mai uống $\\dfrac{1}{4}$ l, Nam uống $\\dfrac{5}{6}$ l, Việt uống $\\dfrac{11}{12}$ l. Cả ba bạn uống bao nhiêu lít nước cam?',
      answer: 2,
      hints: [
        'Quy đồng mẫu số ba phân số với mẫu số chung là 12.',
        '$\\dfrac{1}{4} = \\dfrac{3}{12}$, $\\dfrac{5}{6} = \\dfrac{10}{12}$.',
      ],
      solution:
        '$\\dfrac{1}{4} + \\dfrac{5}{6} + \\dfrac{11}{12} = \\dfrac{3}{12} + \\dfrac{10}{12} + \\dfrac{11}{12} = \\dfrac{24}{12} = 2$. Cả ba bạn uống 2 l nước cam.',
    },
  ],
  takeaways: [
    'Cộng hai phân số cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số.',
    'Cộng hai phân số khác mẫu số: quy đồng mẫu số rồi cộng.',
    'Đổi chỗ các phân số trong một tổng thì tổng không thay đổi.',
  ],
};
