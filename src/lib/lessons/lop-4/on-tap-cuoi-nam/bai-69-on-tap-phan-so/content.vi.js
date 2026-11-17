/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phân số: phân số chỉ phần tô màu, phân số của một số, phân số bằng nhau, rút gọn, quy đồng mẫu số, so sánh và sắp xếp phân số.',
  intro:
    'Ba vòi nước cùng chảy vào một bể. Trong 1 giờ, vòi số 1 chảy được $\\dfrac{1}{4}$ bể, vòi số 2 chảy được $\\dfrac{2}{5}$ bể, vòi số 3 chảy được $\\dfrac{7}{20}$ bể. Vòi nào chảy nhiều nước nhất? Em cùng ôn tập phân số nhé!',
  objectives: [
    'Viết được phân số chỉ phần tô màu của một hình.',
    'Tìm được phân số bằng phân số đã cho; rút gọn phân số.',
    'Quy đồng mẫu số các phân số.',
    'So sánh, sắp xếp các phân số; so sánh phân số với 1.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Phân số',
      blocks: [
        {
          type: 'p',
          text: 'Một hình được chia thành 14 phần bằng nhau, tô màu 9 phần. Phân số chỉ phần đã tô màu là $\\dfrac{9}{14}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mẫu số cho biết hình được chia thành bao nhiêu phần bằng nhau. Tử số cho biết đã lấy (tô màu) bao nhiêu phần.',
        },
        {
          type: 'p',
          text: 'Có 15 con ếch. $\\dfrac{3}{5}$ số con ếch là: $15 \\times \\dfrac{3}{5} = 9$ (con ếch).',
        },
      ],
    },
    {
      heading: 'Tính chất cơ bản của phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân (hoặc chia) cả tử số và mẫu số của một phân số với (cho) cùng một số tự nhiên khác 0, ta được một phân số bằng phân số đã cho.',
        },
        {
          type: 'p',
          text: 'Rút gọn: $\\dfrac{12}{15} = \\dfrac{12 : 3}{15 : 3} = \\dfrac{4}{5}$. Phân số $\\dfrac{4}{5}$ là phân số tối giản.',
        },
        {
          type: 'table',
          head: ['Quy đồng mẫu số', 'Mẫu số chung', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{4}{7}$ và $\\dfrac{28}{35}$',
              '35',
              '$\\dfrac{20}{35}$ và $\\dfrac{28}{35}$',
            ],
            [
              '$\\dfrac{13}{20}$ và $\\dfrac{53}{100}$',
              '100',
              '$\\dfrac{65}{100}$ và $\\dfrac{53}{100}$',
            ],
            [
              '$\\dfrac{5}{6}$; $\\dfrac{9}{8}$ và $\\dfrac{11}{24}$',
              '24',
              '$\\dfrac{20}{24}$; $\\dfrac{27}{24}$ và $\\dfrac{11}{24}$',
            ],
          ],
        },
      ],
    },
    {
      heading: 'So sánh phân số',
      blocks: [
        {
          type: 'table',
          head: ['Trường hợp', 'Cách so sánh', 'Ví dụ'],
          rows: [
            ['Cùng mẫu số', 'Tử số bé hơn thì phân số bé hơn', '$\\dfrac{5}{8} < \\dfrac{7}{8}$'],
            ['Cùng tử số', 'Mẫu số bé hơn thì phân số lớn hơn', '$\\dfrac{3}{4} > \\dfrac{3}{7}$'],
            [
              'Khác mẫu số',
              'Quy đồng mẫu số rồi so sánh tử số',
              '$\\dfrac{2}{3} = \\dfrac{8}{12} > \\dfrac{7}{12}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tử số bé hơn mẫu số thì phân số bé hơn 1. Tử số bằng mẫu số thì phân số bằng 1. Tử số lớn hơn mẫu số thì phân số lớn hơn 1.',
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
        'Trong 1 giờ, vòi số 1 chảy được $\\dfrac{1}{4}$ bể, vòi số 2 chảy được $\\dfrac{2}{5}$ bể, vòi số 3 chảy được $\\dfrac{7}{20}$ bể. Vòi nào chảy được nhiều nước nhất, vòi nào chảy được ít nước nhất?',
      steps: [
        'Quy đồng mẫu số với mẫu số chung 20: $\\dfrac{1}{4} = \\dfrac{5}{20}$; $\\dfrac{2}{5} = \\dfrac{8}{20}$.',
        'So sánh: $\\dfrac{5}{20} < \\dfrac{7}{20} < \\dfrac{8}{20}$, nên $\\dfrac{1}{4} < \\dfrac{7}{20} < \\dfrac{2}{5}$.',
      ],
      answer: 'Vòi số 2 chảy được nhiều nước nhất, vòi số 1 chảy được ít nước nhất.',
    },
    {
      problem:
        'Mai chạy hết $\\dfrac{5}{6}$ phút, Nam chạy hết $\\dfrac{2}{3}$ phút, Việt chạy hết $\\dfrac{7}{12}$ phút, Rô-bốt chạy hết $\\dfrac{11}{12}$ phút. Ai về đích đầu tiên, ai về đích cuối cùng?',
      steps: [
        'Quy đồng mẫu số với mẫu số chung 12: $\\dfrac{5}{6} = \\dfrac{10}{12}$; $\\dfrac{2}{3} = \\dfrac{8}{12}$.',
        '$\\dfrac{7}{12} < \\dfrac{8}{12} < \\dfrac{10}{12} < \\dfrac{11}{12}$.',
        'Bạn chạy hết ít thời gian nhất về đích đầu tiên, bạn chạy hết nhiều thời gian nhất về đích cuối cùng.',
      ],
      answer: 'Việt về đích đầu tiên, Rô-bốt về đích cuối cùng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Một hình được chia thành 14 phần bằng nhau, đã tô màu 9 phần. Phân số chỉ phần đã tô màu là:',
      options: ['$\\dfrac{9}{14}$', '$\\dfrac{5}{14}$', '$\\dfrac{14}{9}$', '$\\dfrac{9}{5}$'],
      answer: 0,
      hints: ['Mẫu số là số phần bằng nhau, tử số là số phần đã tô màu.'],
      solution: 'Hình có 14 phần bằng nhau, tô màu 9 phần. Phân số là $\\dfrac{9}{14}$.',
    },
    {
      type: 'number',
      prompt: 'Có 15 con ếch. $\\dfrac{3}{5}$ số con ếch là bao nhiêu con?',
      answer: 9,
      hints: ['Em tính $15 \\times \\dfrac{3}{5}$: chia 15 cho 5, rồi nhân với 3.'],
      solution: '$15 \\times \\dfrac{3}{5} = 9$ (con ếch).',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào bằng phân số $\\dfrac{5}{7}$?',
      options: ['$\\dfrac{15}{21}$', '$\\dfrac{10}{7}$', '$\\dfrac{5}{21}$', '$\\dfrac{8}{10}$'],
      answer: 0,
      hints: ['Nhân cả tử số và mẫu số với cùng một số.'],
      solution: '$\\dfrac{5}{7} = \\dfrac{5 \\times 3}{7 \\times 3} = \\dfrac{15}{21}$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{18}{24}$ thành phân số tối giản. Em viết kết quả dạng 2/5.',
      answer: [3, 4],
      simplest: true,
      hints: ['18 và 24 cùng chia hết cho 6.'],
      solution: '$\\dfrac{18}{24} = \\dfrac{18 : 6}{24 : 6} = \\dfrac{3}{4}$.',
    },
    {
      type: 'choice',
      prompt:
        'Quy đồng mẫu số hai phân số $\\dfrac{4}{7}$ và $\\dfrac{28}{35}$, ta viết $\\dfrac{4}{7}$ thành phân số nào?',
      options: ['$\\dfrac{20}{35}$', '$\\dfrac{4}{35}$', '$\\dfrac{32}{35}$', '$\\dfrac{28}{35}$'],
      answer: 0,
      hints: ['35 : 7 = 5. Nhân cả tử số và mẫu số của $\\dfrac{4}{7}$ với 5.'],
      solution: '$\\dfrac{4}{7} = \\dfrac{4 \\times 5}{7 \\times 5} = \\dfrac{20}{35}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào bé hơn 1?',
      options: ['$\\dfrac{22}{33}$', '$\\dfrac{7}{5}$', '$\\dfrac{9}{9}$', '$\\dfrac{13}{12}$'],
      answer: 0,
      hints: ['Phân số có tử số bé hơn mẫu số thì bé hơn 1.'],
      solution:
        '$\\dfrac{22}{33}$ có 22 < 33 nên bé hơn 1. $\\dfrac{9}{9} = 1$; $\\dfrac{7}{5}$ và $\\dfrac{13}{12}$ lớn hơn 1.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào lớn hơn $\\dfrac{3}{5}$?',
      options: ['$\\dfrac{12}{15}$', '$\\dfrac{6}{10}$', '$\\dfrac{2}{5}$', '$\\dfrac{3}{10}$'],
      answer: 0,
      hints: ['Rút gọn các phân số chưa tối giản, rồi so sánh với $\\dfrac{3}{5}$.'],
      solution:
        '$\\dfrac{12}{15} = \\dfrac{4}{5} > \\dfrac{3}{5}$. Còn $\\dfrac{6}{10} = \\dfrac{3}{5}$; $\\dfrac{2}{5} < \\dfrac{3}{5}$; $\\dfrac{3}{10} < \\dfrac{3}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{3}{4}$ ? $\\dfrac{3}{7}$',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai phân số cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.'],
      solution: 'Cùng tử số 3, mà 4 < 7, nên $\\dfrac{3}{4} > \\dfrac{3}{7}$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $\\dfrac{2}{3}$ ? $\\dfrac{7}{12}$',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Quy đồng mẫu số: 12 : 3 = 4.'],
      solution:
        '$\\dfrac{2}{3} = \\dfrac{8}{12}$ và $\\dfrac{8}{12} > \\dfrac{7}{12}$, nên $\\dfrac{2}{3} > \\dfrac{7}{12}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các con vật theo thứ tự cân nặng từ bé đến lớn.',
      items: [
        'Con thỏ: $\\dfrac{19}{4}$ kg',
        'Con vịt: $\\dfrac{9}{4}$ kg',
        'Con mèo: $\\dfrac{28}{8}$ kg',
        'Con gà: $\\dfrac{5}{2}$ kg',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Quy đồng mẫu số các phân số với mẫu số chung 8, rồi so sánh các tử số.'],
      solution:
        '$\\dfrac{9}{4} = \\dfrac{18}{8}$; $\\dfrac{5}{2} = \\dfrac{20}{8}$; $\\dfrac{19}{4} = \\dfrac{38}{8}$. Ta có $\\dfrac{18}{8} < \\dfrac{20}{8} < \\dfrac{28}{8} < \\dfrac{38}{8}$. Thứ tự: con vịt, con gà, con mèo, con thỏ.',
    },
    {
      type: 'choice',
      prompt:
        'Mai chạy hết $\\dfrac{5}{6}$ phút, Nam hết $\\dfrac{2}{3}$ phút, Việt hết $\\dfrac{7}{12}$ phút, Rô-bốt hết $\\dfrac{11}{12}$ phút. Ai về đích đầu tiên?',
      options: ['Việt', 'Mai', 'Nam', 'Rô-bốt'],
      answer: 0,
      hints: [
        'Bạn chạy hết ít thời gian nhất về đích đầu tiên. Quy đồng mẫu số với mẫu số chung 12.',
      ],
      solution:
        '$\\dfrac{5}{6} = \\dfrac{10}{12}$; $\\dfrac{2}{3} = \\dfrac{8}{12}$. Phân số bé nhất là $\\dfrac{7}{12}$, nên Việt về đích đầu tiên.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính: $\\dfrac{7 \\times 9 \\times 13}{13 \\times 7 \\times 21}$. Em viết kết quả là phân số tối giản, dạng 2/5.',
      answer: [3, 7],
      simplest: true,
      hints: [
        'Chia nhẩm cả tử số và mẫu số cho 7 và cho 13.',
        'Còn $\\dfrac{9}{21}$. Em rút gọn tiếp.',
      ],
      solution:
        '$\\dfrac{7 \\times 9 \\times 13}{13 \\times 7 \\times 21} = \\dfrac{9}{21} = \\dfrac{3}{7}$.',
    },
  ],
  takeaways: [
    'Mẫu số là số phần bằng nhau, tử số là số phần được lấy.',
    'Nhân hoặc chia cả tử số và mẫu số với cùng một số khác 0 thì được phân số bằng phân số đã cho.',
    'So sánh hai phân số khác mẫu số: quy đồng mẫu số rồi so sánh tử số.',
    'Phân số có tử số bé hơn mẫu số thì bé hơn 1.',
  ],
};
