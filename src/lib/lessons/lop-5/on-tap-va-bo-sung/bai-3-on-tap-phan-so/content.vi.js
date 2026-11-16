/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phân số: tử số, mẫu số; tính chất cơ bản và phân số bằng nhau; rút gọn, quy đồng mẫu số; so sánh và sắp xếp phân số.',
  intro:
    'Một cái bánh chia 5 phần bằng nhau, Mai ăn 3 phần. Nếu chia mỗi phần làm đôi thì Mai đã ăn mấy phần mười cái bánh? Cùng ôn lại phân số nhé!',
  objectives: [
    'Đọc, viết được phân số; nêu được tử số, mẫu số.',
    'Tìm được phân số bằng nhau; rút gọn và quy đồng mẫu số được các phân số.',
    'So sánh, sắp xếp được các phân số.',
  ],
  sections: [
    {
      heading: 'Phân số',
      blocks: [
        {
          type: 'p',
          text: 'Phân số $\\dfrac{3}{5}$ đọc là ba phần năm. 3 là tử số, 5 là mẫu số. Mẫu số cho biết hình được chia thành 5 phần bằng nhau, tử số cho biết đã lấy 3 phần.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Thương của phép chia số tự nhiên cho số tự nhiên khác 0 có thể viết thành phân số: 3 : 5 = $\\dfrac{3}{5}$.',
        },
      ],
    },
    {
      heading: 'Phân số bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho. Nếu cả tử số và mẫu số cùng chia hết cho một số tự nhiên khác 0 thì sau khi chia ta cũng được một phân số bằng phân số đã cho.',
        },
        { type: 'p', text: '$\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$' },
        {
          type: 'p',
          text: 'Rút gọn: chia cả tử số và mẫu số cho cùng một số lớn hơn 1, đến khi được phân số tối giản. $\\dfrac{18}{24} = \\dfrac{18 : 6}{24 : 6} = \\dfrac{3}{4}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Phân số tối giản là phân số mà tử số và mẫu số không cùng chia hết cho số nào lớn hơn 1. Ví dụ: $\\dfrac{3}{4}$, $\\dfrac{7}{9}$.',
        },
      ],
    },
    {
      heading: 'Quy đồng mẫu số',
      blocks: [
        {
          type: 'p',
          text: 'Quy đồng $\\dfrac{9}{5}$ và $\\dfrac{21}{40}$: vì 40 : 5 = 8 nên lấy 40 làm mẫu số chung.',
        },
        {
          type: 'p',
          text: '$\\dfrac{9}{5} = \\dfrac{9 \\times 8}{5 \\times 8} = \\dfrac{72}{40}$, giữ nguyên $\\dfrac{21}{40}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi mẫu số này chia hết cho mẫu số kia, em lấy mẫu số lớn làm mẫu số chung. Nhân cả tử số và mẫu số của phân số kia với thương của hai mẫu số.',
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
            ['Cùng mẫu số', 'Tử số lớn hơn thì phân số lớn hơn', '$\\dfrac{4}{7} > \\dfrac{3}{7}$'],
            ['Cùng tử số', 'Mẫu số bé hơn thì phân số lớn hơn', '$\\dfrac{8}{5} > \\dfrac{8}{7}$'],
            [
              'Khác mẫu số',
              'Quy đồng mẫu số rồi so sánh',
              '$\\dfrac{3}{4} = \\dfrac{9}{12} > \\dfrac{7}{12}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh với 1: tử số bé hơn mẫu số thì phân số bé hơn 1; tử số lớn hơn mẫu số thì phân số lớn hơn 1; tử số bằng mẫu số thì phân số bằng 1.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia nhỏ băng giấy',
    instruction:
      'Băng trên là phân số đã cho. Em bấm "Chia nhỏ thêm" hoặc "Bớt chia nhỏ" để băng dưới có số phần cần tìm. Phần tô màu của hai băng luôn dài bằng nhau.',
  },
  examples: [
    {
      problem: 'Rút gọn phân số $\\dfrac{72}{90}$.',
      steps: [
        '72 và 90 cùng chia hết cho 9: $\\dfrac{72}{90} = \\dfrac{8}{10}$.',
        '8 và 10 cùng chia hết cho 2: $\\dfrac{8}{10} = \\dfrac{4}{5}$.',
        '4 và 5 không cùng chia hết cho số nào lớn hơn 1.',
      ],
      answer: '$\\dfrac{72}{90} = \\dfrac{4}{5}$.',
    },
    {
      problem: 'Quy đồng mẫu số $\\dfrac{1}{3}$, $\\dfrac{7}{12}$ và $\\dfrac{35}{48}$.',
      steps: [
        '48 : 3 = 16 và 48 : 12 = 4, nên chọn mẫu số chung là 48.',
        '$\\dfrac{1}{3} = \\dfrac{1 \\times 16}{3 \\times 16} = \\dfrac{16}{48}$.',
        '$\\dfrac{7}{12} = \\dfrac{7 \\times 4}{12 \\times 4} = \\dfrac{28}{48}$, giữ nguyên $\\dfrac{35}{48}$.',
      ],
      answer: '$\\dfrac{16}{48}$, $\\dfrac{28}{48}$ và $\\dfrac{35}{48}$.',
    },
    {
      problem: 'So sánh $\\dfrac{7}{6}$ và $\\dfrac{29}{24}$.',
      steps: [
        '24 : 6 = 4, nên $\\dfrac{7}{6} = \\dfrac{28}{24}$.',
        'Hai phân số cùng mẫu số 24, mà 28 < 29.',
      ],
      answer: '$\\dfrac{7}{6} < \\dfrac{29}{24}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{20}{45}$.',
      answer: [4, 9],
      simplest: true,
      hints: ['20 và 45 cùng chia hết cho 5.'],
      solution: '$\\dfrac{20}{45} = \\dfrac{20 : 5}{45 : 5} = \\dfrac{4}{9}$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{56}{42}$.',
      answer: [4, 3],
      simplest: true,
      hints: ['56 và 42 cùng chia hết cho 7.', 'Sau đó 8 và 6 còn cùng chia hết cho 2.'],
      solution: '$\\dfrac{56}{42} = \\dfrac{8}{6} = \\dfrac{4}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{36}{54} = \\dfrac{?}{9}$',
      answer: 6,
      hints: ['54 : 9 = 6. Em chia tử số cho cùng số đó.'],
      solution: '54 : 6 = 9 và 36 : 6 = 6. Vậy $\\dfrac{36}{54} = \\dfrac{6}{9}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào là phân số tối giản?',
      options: ['$\\dfrac{8}{15}$', '$\\dfrac{16}{18}$', '$\\dfrac{15}{12}$', '$\\dfrac{25}{30}$'],
      answer: 0,
      hints: ['Em thử xem tử số và mẫu số có cùng chia hết cho 2, 3 hay 5 không.'],
      solution:
        '16 và 18 cùng chia hết cho 2; 15 và 12 cùng chia hết cho 3; 25 và 30 cùng chia hết cho 5. 8 và 15 không cùng chia hết cho số nào lớn hơn 1. Chỉ $\\dfrac{8}{15}$ là phân số tối giản.',
    },
    {
      type: 'number',
      prompt:
        'Quy đồng mẫu số $\\dfrac{17}{30}$ và $\\dfrac{53}{90}$ với mẫu số chung 90. Phân số $\\dfrac{17}{30}$ có tử số mới là bao nhiêu?',
      answer: 51,
      hints: ['90 : 30 = 3.'],
      solution:
        '$\\dfrac{17}{30} = \\dfrac{17 \\times 3}{30 \\times 3} = \\dfrac{51}{90}$. Tử số mới là 51.',
    },
    {
      type: 'number',
      prompt:
        'Quy đồng mẫu số $\\dfrac{5}{6}$ và $\\dfrac{7}{24}$. Phân số $\\dfrac{5}{6}$ trở thành $\\dfrac{?}{24}$.',
      answer: 20,
      hints: ['24 : 6 = 4.'],
      solution: '$\\dfrac{5}{6} = \\dfrac{5 \\times 4}{6 \\times 4} = \\dfrac{20}{24}$.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: $\\dfrac{5}{6}$ ? $\\dfrac{13}{18}$',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Quy đồng: $\\dfrac{5}{6} = \\dfrac{?}{18}$.'],
      solution:
        '$\\dfrac{5}{6} = \\dfrac{15}{18}$, mà 15 > 13. Vậy $\\dfrac{5}{6} > \\dfrac{13}{18}$.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: $\\dfrac{9}{10}$ ? $\\dfrac{9}{8}$',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Hai phân số cùng tử số. Mẫu số bé hơn thì mỗi phần to hơn.'],
      solution: 'Cùng tử số 9, mà 10 > 8. Vậy $\\dfrac{9}{10} < \\dfrac{9}{8}$.',
    },
    {
      type: 'choice',
      prompt: 'Em chọn dấu đúng: $\\dfrac{9}{5}$ ? 2',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Viết 2 thành phân số có mẫu số 5: 2 = $\\dfrac{10}{5}$.'],
      solution: '2 = $\\dfrac{10}{5}$, mà 9 < 10. Vậy $\\dfrac{9}{5}$ < 2.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các phân số theo thứ tự từ bé đến lớn.',
      items: ['$\\dfrac{3}{4}$', '$\\dfrac{7}{12}$', '$\\dfrac{19}{24}$', '$\\dfrac{20}{16}$'],
      answer: [1, 0, 2, 3],
      hints: [
        '$\\dfrac{20}{16}$ có tử số lớn hơn mẫu số nên lớn hơn 1.',
        'Quy đồng ba phân số còn lại với mẫu số 24.',
      ],
      solution:
        '$\\dfrac{3}{4} = \\dfrac{18}{24}$, $\\dfrac{7}{12} = \\dfrac{14}{24}$; ba phân số này bé hơn 1, còn $\\dfrac{20}{16}$ lớn hơn 1. Thứ tự: $\\dfrac{7}{12}$, $\\dfrac{3}{4}$, $\\dfrac{19}{24}$, $\\dfrac{20}{16}$.',
    },
    {
      type: 'choice',
      prompt:
        'Khối 5 có $\\dfrac{1}{3}$ số học sinh thích cầu lông, $\\dfrac{2}{5}$ thích bóng đá, $\\dfrac{1}{5}$ thích võ, $\\dfrac{4}{15}$ thích bóng rổ. Môn nào được nhiều bạn thích nhất?',
      options: ['Bóng đá', 'Cầu lông', 'Võ', 'Bóng rổ'],
      answer: 0,
      hints: ['Quy đồng các phân số với mẫu số chung 15.'],
      solution:
        'Cầu lông $\\dfrac{5}{15}$, bóng đá $\\dfrac{6}{15}$, võ $\\dfrac{3}{15}$, bóng rổ $\\dfrac{4}{15}$. Lớn nhất là $\\dfrac{6}{15}$: môn bóng đá.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{3}{8} < \\dfrac{?}{8} < \\dfrac{4}{7}$',
      answer: 4,
      hints: [
        'Tử số phải lớn hơn 3.',
        'So sánh $\\dfrac{4}{8}$ và $\\dfrac{5}{8}$ với $\\dfrac{4}{7}$.',
      ],
      solution:
        '$\\dfrac{4}{8}$ và $\\dfrac{4}{7}$ cùng tử số, 8 > 7 nên $\\dfrac{4}{8} < \\dfrac{4}{7}$. Còn $\\dfrac{5}{8} = \\dfrac{35}{56}$ lớn hơn $\\dfrac{4}{7} = \\dfrac{32}{56}$. Vậy số cần tìm là 4.',
    },
  ],
  takeaways: [
    'Nhân cả tử số và mẫu số với cùng một số khác 0, hoặc chia cả hai cho cùng một số khác 0 mà chúng cùng chia hết, thì được phân số bằng nó.',
    'Rút gọn đến khi được phân số tối giản.',
    'Quy đồng mẫu số rồi so sánh tử số.',
    'Cùng tử số: mẫu số bé hơn thì phân số lớn hơn.',
  ],
};
