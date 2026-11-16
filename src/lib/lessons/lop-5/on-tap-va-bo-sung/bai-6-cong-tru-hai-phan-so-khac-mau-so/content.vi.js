/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Muốn cộng, trừ hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số rồi cộng, trừ hai phân số đã quy đồng; rút gọn kết quả nếu được.',
  intro:
    'Mai đổ $\\dfrac{1}{2}$ l nước vào bình, Nam đổ thêm $\\dfrac{1}{3}$ l nước. Trong bình có tất cả bao nhiêu lít nước? Hai phân số này khác mẫu số. Em làm thế nào?',
  objectives: [
    'Quy đồng được mẫu số hai phân số.',
    'Cộng, trừ được hai phân số khác mẫu số.',
    'Vận dụng cộng, trừ phân số để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Cộng hai phân số khác mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Tính $\\dfrac{1}{2} + \\dfrac{1}{3}$. Hai mẫu số 2 và 3 khác nhau, nên em quy đồng mẫu số trước.',
        },
        {
          type: 'p',
          text: 'Mẫu số chung là 2 × 3 = 6. $\\dfrac{1}{2} = \\dfrac{1 \\times 3}{2 \\times 3} = \\dfrac{3}{6}$; $\\dfrac{1}{3} = \\dfrac{1 \\times 2}{3 \\times 2} = \\dfrac{2}{6}$.',
        },
        {
          type: 'p',
          text: '$\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$. Trong bình có $\\dfrac{5}{6}$ l nước.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn cộng (hoặc trừ) hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi cộng (hoặc trừ) hai phân số đó.',
        },
      ],
    },
    {
      heading: 'Trừ hai phân số khác mẫu số',
      blocks: [
        {
          type: 'p',
          text: '$\\dfrac{3}{4} - \\dfrac{2}{3} = \\dfrac{9}{12} - \\dfrac{8}{12} = \\dfrac{1}{12}$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẫu số chung',
          text: 'Mẫu số chung là số chia hết cho cả hai mẫu số. Tích hai mẫu số luôn là một mẫu số chung.',
        },
        {
          type: 'p',
          text: 'Với $\\dfrac{5}{6} - \\dfrac{3}{4}$, số 12 chia hết cho cả 6 và 4, nên em có thể lấy 12 làm mẫu số chung: $\\dfrac{10}{12} - \\dfrac{9}{12} = \\dfrac{1}{12}$.',
        },
      ],
    },
    {
      heading: 'Rút gọn kết quả',
      blocks: [
        {
          type: 'p',
          text: '$\\dfrac{3}{10} + \\dfrac{1}{6} = \\dfrac{9}{30} + \\dfrac{5}{30} = \\dfrac{14}{30} = \\dfrac{7}{15}$',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không cộng tử số với tử số, mẫu số với mẫu số: $\\dfrac{1}{2} + \\dfrac{1}{3}$ không bằng $\\dfrac{2}{5}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia lại hai băng cùng mẫu số',
    instruction:
      'Em chọn mẫu số chung. Nếu đúng, hai băng được chia lại thành các phần bằng nhau. Rồi em chọn kết quả của phép tính.',
  },
  examples: [
    {
      problem:
        'Một vòi nước giờ đầu chảy được $\\dfrac{2}{5}$ bể, giờ thứ hai chảy được $\\dfrac{1}{3}$ bể. Cả hai giờ vòi chảy được mấy phần bể?',
      steps: [
        'Em tính $\\dfrac{2}{5} + \\dfrac{1}{3}$.',
        'Mẫu số chung là 5 × 3 = 15: $\\dfrac{2}{5} = \\dfrac{6}{15}$, $\\dfrac{1}{3} = \\dfrac{5}{15}$.',
        '$\\dfrac{6}{15} + \\dfrac{5}{15} = \\dfrac{11}{15}$.',
      ],
      answer: 'Cả hai giờ vòi chảy được $\\dfrac{11}{15}$ bể.',
    },
    {
      problem:
        'Một sợi dây dài $\\dfrac{4}{5}$ m. Bác Tư cắt đi $\\dfrac{2}{3}$ m. Sợi dây còn lại dài bao nhiêu mét?',
      steps: [
        'Em tính $\\dfrac{4}{5} - \\dfrac{2}{3}$.',
        'Mẫu số chung là 15: $\\dfrac{4}{5} = \\dfrac{12}{15}$, $\\dfrac{2}{3} = \\dfrac{10}{15}$.',
        '$\\dfrac{12}{15} - \\dfrac{10}{15} = \\dfrac{2}{15}$.',
      ],
      answer: 'Sợi dây còn lại dài $\\dfrac{2}{15}$ m.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{3}{5} + \\dfrac{1}{4}$',
      answer: [17, 20],
      simplest: true,
      hints: ['Mẫu số chung là 5 × 4 = 20.'],
      solution:
        '$\\dfrac{3}{5} + \\dfrac{1}{4} = \\dfrac{12}{20} + \\dfrac{5}{20} = \\dfrac{17}{20}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{5}{6} - \\dfrac{2}{5}$',
      answer: [13, 30],
      simplest: true,
      hints: ['Mẫu số chung là 6 × 5 = 30.'],
      solution:
        '$\\dfrac{5}{6} - \\dfrac{2}{5} = \\dfrac{25}{30} - \\dfrac{12}{30} = \\dfrac{13}{30}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{2}{3} + \\dfrac{3}{4}$ (viết kết quả là phân số tối giản)',
      answer: [17, 12],
      simplest: true,
      hints: ['Mẫu số chung là 12.'],
      solution:
        '$\\dfrac{2}{3} + \\dfrac{3}{4} = \\dfrac{8}{12} + \\dfrac{9}{12} = \\dfrac{17}{12}$.',
    },
    {
      type: 'choice',
      prompt: 'Để tính $\\dfrac{2}{3} + \\dfrac{3}{5}$, em chọn mẫu số chung nào?',
      options: ['15', '8', '5', '3'],
      answer: 0,
      hints: ['Mẫu số chung phải chia hết cho cả 3 và 5.'],
      solution:
        '15 chia hết cho cả 3 và 5. Số 8 là tổng hai mẫu số, không chia hết cho 3 hay 5. Các số 5 và 3 chỉ chia hết cho một mẫu số.',
    },
    {
      type: 'fraction',
      prompt:
        'Ngày thứ nhất Hà đọc được $\\dfrac{2}{7}$ quyển sách, ngày thứ hai đọc được $\\dfrac{1}{3}$ quyển sách. Cả hai ngày Hà đọc được mấy phần quyển sách?',
      answer: [13, 21],
      simplest: true,
      hints: ['Em tính $\\dfrac{2}{7} + \\dfrac{1}{3}$ với mẫu số chung 21.'],
      solution:
        '$\\dfrac{2}{7} + \\dfrac{1}{3} = \\dfrac{6}{21} + \\dfrac{7}{21} = \\dfrac{13}{21}$ (quyển sách).',
    },
    {
      type: 'fraction',
      prompt:
        'Hà đã đọc $\\dfrac{13}{21}$ quyển sách. Hà còn phải đọc mấy phần quyển sách nữa thì hết quyển?',
      answer: [8, 21],
      simplest: true,
      hints: ['Cả quyển sách là 1, tức là $\\dfrac{21}{21}$.'],
      solution:
        '$1 - \\dfrac{13}{21} = \\dfrac{21}{21} - \\dfrac{13}{21} = \\dfrac{8}{21}$ (quyển sách).',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các phép tính đúng.',
      options: [
        '$\\dfrac{1}{2} + \\dfrac{1}{5} = \\dfrac{7}{10}$',
        '$\\dfrac{3}{4} - \\dfrac{1}{3} = \\dfrac{2}{1}$',
        '$\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{2}{7}$',
        '$\\dfrac{5}{6} - \\dfrac{1}{4} = \\dfrac{7}{12}$',
      ],
      answers: [0, 3],
      hints: ['Em quy đồng mẫu số rồi tự tính từng phép tính.'],
      solution:
        '$\\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{7}{10}$ đúng. $\\dfrac{10}{12} - \\dfrac{3}{12} = \\dfrac{7}{12}$ đúng. Còn $\\dfrac{3}{4} - \\dfrac{1}{3} = \\dfrac{9}{12} - \\dfrac{4}{12} = \\dfrac{5}{12}$ và $\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$: hai phép tính đó sai vì đã trừ (cộng) tử số với tử số, mẫu số với mẫu số.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: [
        '$\\dfrac{1}{2} + \\dfrac{1}{3}$',
        '$\\dfrac{3}{4} - \\dfrac{1}{5}$',
        '$\\dfrac{2}{5} + \\dfrac{1}{2}$',
        '$\\dfrac{2}{3} - \\dfrac{1}{4}$',
      ],
      right: [
        '$\\dfrac{5}{6}$',
        '$\\dfrac{11}{20}$',
        '$\\dfrac{9}{10}$',
        '$\\dfrac{5}{12}$',
        '$\\dfrac{2}{5}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Quy đồng mẫu số từng phép tính: 6, 20, 10 và 12.'],
      solution:
        '$\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$; $\\dfrac{15}{20} - \\dfrac{4}{20} = \\dfrac{11}{20}$; $\\dfrac{4}{10} + \\dfrac{5}{10} = \\dfrac{9}{10}$; $\\dfrac{8}{12} - \\dfrac{3}{12} = \\dfrac{5}{12}$.',
    },
  ],
  takeaways: [
    'Cộng, trừ hai phân số khác mẫu số: quy đồng mẫu số, rồi cộng, trừ hai phân số đã quy đồng.',
    'Mẫu số chung chia hết cho cả hai mẫu số; tích hai mẫu số luôn dùng được.',
    'Rút gọn kết quả nếu được.',
  ],
};
