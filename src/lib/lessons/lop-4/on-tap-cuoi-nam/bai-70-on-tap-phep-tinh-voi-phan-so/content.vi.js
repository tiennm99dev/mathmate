/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép tính với phân số: cộng, trừ phân số khác mẫu số và với số tự nhiên, nhân, chia phân số, tính giá trị biểu thức, tính thuận tiện và giải bài toán.',
  intro:
    'Nam có 400 000 đồng. Nam dùng $\\dfrac{3}{8}$ số tiền để mua sách vở, số còn lại Nam góp vào quỹ giúp đỡ các bạn. Nam đã góp bao nhiêu tiền? Em cùng ôn tập nhé!',
  objectives: [
    'Cộng, trừ hai phân số; cộng, trừ phân số với số tự nhiên.',
    'Nhân, chia hai phân số; nhân, chia phân số với số tự nhiên.',
    'Tính giá trị biểu thức và tính bằng cách thuận tiện.',
    'Giải bài toán có phân số.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Cộng, trừ phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn cộng (hoặc trừ) hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi cộng (hoặc trừ) hai phân số đó.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Cách làm', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{7}{24} + \\dfrac{11}{6}$',
              '$\\dfrac{7}{24} + \\dfrac{44}{24} = \\dfrac{51}{24}$',
              '$\\dfrac{17}{8}$',
            ],
            ['$3 + \\dfrac{5}{8}$', '$\\dfrac{24}{8} + \\dfrac{5}{8}$', '$\\dfrac{29}{8}$'],
            [
              '$\\dfrac{19}{28} - \\dfrac{3}{7}$',
              '$\\dfrac{19}{28} - \\dfrac{12}{28} = \\dfrac{7}{28}$',
              '$\\dfrac{1}{4}$',
            ],
            ['$\\dfrac{53}{21} - 1$', '$\\dfrac{53}{21} - \\dfrac{21}{21}$', '$\\dfrac{32}{21}$'],
          ],
        },
      ],
    },
    {
      heading: 'Nhân, chia phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số. Muốn chia hai phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Cách làm', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{5}{7} \\times \\dfrac{7}{15}$',
              '$\\dfrac{5 \\times 7}{7 \\times 15} = \\dfrac{35}{105}$',
              '$\\dfrac{1}{3}$',
            ],
            [
              '$\\dfrac{8}{21} \\times 3$',
              '$\\dfrac{8 \\times 3}{21} = \\dfrac{24}{21}$',
              '$\\dfrac{8}{7}$',
            ],
            [
              '$\\dfrac{24}{17} : \\dfrac{9}{17}$',
              '$\\dfrac{24}{17} \\times \\dfrac{17}{9} = \\dfrac{24}{9}$',
              '$\\dfrac{8}{3}$',
            ],
            [
              '$\\dfrac{36}{5} : 9$',
              '$\\dfrac{36}{5 \\times 9} = \\dfrac{36}{45}$',
              '$\\dfrac{4}{5}$',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Biểu thức và tính thuận tiện',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia): em tính từ trái sang phải. Có dấu ngoặc: em tính trong ngoặc trước.',
        },
        {
          type: 'p',
          text: '$\\dfrac{4}{9} + \\dfrac{2}{9} - \\dfrac{5}{18} = \\dfrac{6}{9} - \\dfrac{5}{18} = \\dfrac{12}{18} - \\dfrac{5}{18} = \\dfrac{7}{18}$.',
        },
        {
          type: 'p',
          text: 'Tính thuận tiện: nhóm hai phân số cùng mẫu số. $\\dfrac{4}{27} + \\dfrac{5}{9} + \\dfrac{13}{9} - 2 = \\dfrac{4}{27} + \\left(\\dfrac{5}{9} + \\dfrac{13}{9}\\right) - 2 = \\dfrac{4}{27} + 2 - 2 = \\dfrac{4}{27}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Bác Tư dùng $\\dfrac{2}{5}$ diện tích khu đất để xây nhà và $\\dfrac{3}{10}$ diện tích để trồng cây, phần còn lại làm sân và lối đi. Sân và lối đi chiếm bao nhiêu phần diện tích khu đất?',
      steps: [
        'Xây nhà và trồng cây: $\\dfrac{2}{5} + \\dfrac{3}{10} = \\dfrac{4}{10} + \\dfrac{3}{10} = \\dfrac{7}{10}$ (diện tích).',
        'Sân và lối đi: $1 - \\dfrac{7}{10} = \\dfrac{3}{10}$ (diện tích).',
      ],
      answer: 'Sân và lối đi chiếm $\\dfrac{3}{10}$ diện tích khu đất.',
    },
    {
      problem:
        'Nam có 400 000 đồng tiền tiết kiệm. Nam dùng $\\dfrac{3}{8}$ số tiền đó để mua sách vở và đồ dùng học tập, số tiền còn lại Nam góp vào quỹ giúp đỡ các bạn có hoàn cảnh khó khăn. Nam đã góp bao nhiêu tiền?',
      steps: [
        'Tiền mua sách vở: $400\\,000 \\times \\dfrac{3}{8} = 150\\,000$ (đồng).',
        'Tiền góp vào quỹ: 400 000 − 150 000 = 250 000 (đồng).',
      ],
      answer: 'Nam đã góp 250 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Tính $\\dfrac{7}{24} + \\dfrac{11}{6}$. Em viết kết quả là phân số tối giản, dạng 2/5.',
      answer: [17, 8],
      simplest: true,
      hints: [
        'Mẫu số chung là 24: $\\dfrac{11}{6} = \\dfrac{44}{24}$.',
        'Được $\\dfrac{51}{24}$, em rút gọn.',
      ],
      solution:
        '$\\dfrac{7}{24} + \\dfrac{11}{6} = \\dfrac{7}{24} + \\dfrac{44}{24} = \\dfrac{51}{24} = \\dfrac{17}{8}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $3 + \\dfrac{5}{8}$.',
      options: ['$\\dfrac{29}{8}$', '$\\dfrac{8}{8}$', '$\\dfrac{15}{8}$', '$\\dfrac{8}{11}$'],
      answer: 0,
      hints: ['Viết 3 thành phân số có mẫu số 8.'],
      solution: '$3 + \\dfrac{5}{8} = \\dfrac{24}{8} + \\dfrac{5}{8} = \\dfrac{29}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\dfrac{19}{28} - \\dfrac{3}{7}$. Em viết kết quả là phân số tối giản, dạng 2/5.',
      answer: [1, 4],
      simplest: true,
      hints: ['Mẫu số chung là 28: $\\dfrac{3}{7} = \\dfrac{12}{28}$.'],
      solution:
        '$\\dfrac{19}{28} - \\dfrac{3}{7} = \\dfrac{19}{28} - \\dfrac{12}{28} = \\dfrac{7}{28} = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính giá trị biểu thức $\\dfrac{4}{9} + \\dfrac{2}{9} - \\dfrac{5}{18}$. Em viết kết quả là phân số tối giản, dạng 2/5.',
      answer: [7, 18],
      simplest: true,
      hints: ['Em tính từ trái sang phải. Cộng hai phân số cùng mẫu số trước.'],
      solution:
        '$\\dfrac{4}{9} + \\dfrac{2}{9} - \\dfrac{5}{18} = \\dfrac{6}{9} - \\dfrac{5}{18} = \\dfrac{12}{18} - \\dfrac{5}{18} = \\dfrac{7}{18}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính giá trị biểu thức $2 - \\dfrac{3}{5} + \\dfrac{8}{15}$.',
      options: ['$\\dfrac{29}{15}$', '$\\dfrac{13}{15}$', '$\\dfrac{7}{15}$', '$\\dfrac{5}{15}$'],
      answer: 0,
      hints: ['Em tính từ trái sang phải. Mẫu số chung là 15.'],
      solution:
        '$2 - \\dfrac{3}{5} + \\dfrac{8}{15} = \\dfrac{30}{15} - \\dfrac{9}{15} + \\dfrac{8}{15} = \\dfrac{21}{15} + \\dfrac{8}{15} = \\dfrac{29}{15}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Bác Tư dùng $\\dfrac{2}{5}$ diện tích khu đất để xây nhà, $\\dfrac{3}{10}$ diện tích để trồng cây, còn lại làm sân và lối đi. Sân và lối đi chiếm mấy phần diện tích khu đất? Em viết dạng 2/5.',
      answer: [3, 10],
      simplest: true,
      hints: ['Em cộng hai phần đã dùng, rồi lấy 1 trừ đi.'],
      solution:
        '$\\dfrac{2}{5} + \\dfrac{3}{10} = \\dfrac{7}{10}$. Sân và lối đi: $1 - \\dfrac{7}{10} = \\dfrac{3}{10}$ diện tích khu đất.',
    },
    {
      type: 'choice',
      prompt: 'Tính bằng cách thuận tiện: $\\dfrac{4}{27} + \\dfrac{5}{9} + \\dfrac{13}{9} - 2$.',
      options: ['$\\dfrac{4}{27}$', '$\\dfrac{58}{27}$', '$\\dfrac{22}{27}$', '$\\dfrac{18}{9}$'],
      answer: 0,
      hints: ['Em cộng $\\dfrac{5}{9}$ với $\\dfrac{13}{9}$ trước. Được số nào?'],
      solution:
        '$\\dfrac{4}{27} + \\left(\\dfrac{5}{9} + \\dfrac{13}{9}\\right) - 2 = \\dfrac{4}{27} + 2 - 2 = \\dfrac{4}{27}$.',
    },
    {
      type: 'choice',
      prompt:
        'Đố em: Tách $\\dfrac{3}{4}$ thành tổng hai phân số có tử số là 1 và mẫu số khác nhau.',
      options: [
        '$\\dfrac{1}{2} + \\dfrac{1}{4}$',
        '$\\dfrac{1}{3} + \\dfrac{1}{4}$',
        '$\\dfrac{1}{4} + \\dfrac{1}{4}$',
        '$\\dfrac{1}{2} + \\dfrac{1}{3}$',
      ],
      answer: 0,
      hints: ['$\\dfrac{3}{4} = \\dfrac{2}{4} + \\dfrac{1}{4}$. Em rút gọn $\\dfrac{2}{4}$.'],
      solution:
        '$\\dfrac{3}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{1}{2} + \\dfrac{1}{4}$. Hai phân số có tử số 1, mẫu số 2 và 4 khác nhau.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\dfrac{5}{7} \\times \\dfrac{7}{15}$. Em viết kết quả là phân số tối giản, dạng 2/5.',
      answer: [1, 3],
      simplest: true,
      hints: ['Tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.'],
      solution: '$\\dfrac{5}{7} \\times \\dfrac{7}{15} = \\dfrac{35}{105} = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{24}{17} : \\dfrac{9}{17}$.',
      options: ['$\\dfrac{8}{3}$', '$\\dfrac{3}{8}$', '$\\dfrac{216}{289}$', '$\\dfrac{15}{17}$'],
      answer: 0,
      hints: ['Nhân $\\dfrac{24}{17}$ với phân số đảo ngược của $\\dfrac{9}{17}$.'],
      solution:
        '$\\dfrac{24}{17} : \\dfrac{9}{17} = \\dfrac{24}{17} \\times \\dfrac{17}{9} = \\dfrac{24}{9} = \\dfrac{8}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Nam có 400 000 đồng, dùng $\\dfrac{3}{8}$ số tiền để mua sách vở, còn lại góp vào quỹ giúp đỡ các bạn. Nam đã góp bao nhiêu đồng?',
      answer: 250000,
      hints: ['Tìm $\\dfrac{3}{8}$ của 400 000 đồng trước.'],
      solution:
        'Tiền mua sách vở: $400\\,000 \\times \\dfrac{3}{8} = 150\\,000$ (đồng). Tiền góp vào quỹ: 400 000 − 150 000 = 250 000 (đồng).',
    },
    {
      type: 'fraction',
      prompt:
        'Tấm bìa hình chữ nhật có diện tích $\\dfrac{7}{25}$ m², chiều rộng $\\dfrac{2}{5}$ m. Chu vi tấm bìa là bao nhiêu mét? Em viết dạng 2/5.',
      answer: [11, 5],
      simplest: true,
      hints: ['Chiều dài = diện tích : chiều rộng.', 'Chu vi = (chiều dài + chiều rộng) × 2.'],
      solution:
        'Chiều dài: $\\dfrac{7}{25} : \\dfrac{2}{5} = \\dfrac{7}{25} \\times \\dfrac{5}{2} = \\dfrac{7}{10}$ (m). Chu vi: $\\left(\\dfrac{7}{10} + \\dfrac{2}{5}\\right) \\times 2 = \\dfrac{11}{10} \\times 2 = \\dfrac{11}{5}$ (m).',
    },
  ],
  takeaways: [
    'Cộng, trừ hai phân số khác mẫu số: quy đồng mẫu số trước.',
    'Nhân hai phân số: tử nhân tử, mẫu nhân mẫu.',
    'Chia hai phân số: nhân với phân số thứ hai đảo ngược.',
    'Rút gọn kết quả về phân số tối giản.',
  ],
};
