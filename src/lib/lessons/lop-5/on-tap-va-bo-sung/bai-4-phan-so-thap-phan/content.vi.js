/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân số thập phân là phân số có mẫu số 10, 100, 1 000, ...; nhận biết, đọc, viết phân số thập phân và viết một phân số thành phân số thập phân.',
  intro:
    'Một hình vuông chia thành 100 ô bằng nhau. Mỗi cột là một phần mười, mỗi ô là một phần trăm của hình vuông. Những phân số như thế có tên riêng: phân số thập phân.',
  objectives: [
    'Nhận biết được phân số thập phân.',
    'Đọc, viết được phân số thập phân.',
    'Viết được một số phân số thành phân số thập phân.',
  ],
  sections: [
    {
      heading: 'Phân số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Các phân số có mẫu số là 10; 100; 1 000; ... gọi là các phân số thập phân.',
        },
        {
          type: 'table',
          head: ['Phân số thập phân', 'Đọc là'],
          rows: [
            ['$\\dfrac{7}{10}$', 'bảy phần mười'],
            ['$\\dfrac{63}{100}$', 'sáu mươi ba phần trăm'],
            ['$\\dfrac{161}{1000}$', 'một trăm sáu mươi mốt phần nghìn'],
          ],
        },
        {
          type: 'p',
          text: '$\\dfrac{9}{20}$ và $\\dfrac{100}{59}$ không phải phân số thập phân, vì mẫu số 20 và 59 không phải là 10, 100, 1 000, ...',
        },
      ],
    },
    {
      heading: 'Phần mười, phần trăm trên hình vuông',
      blocks: [
        {
          type: 'p',
          text: 'Chia hình vuông thành 10 cột bằng nhau. Mỗi cột là $\\dfrac{1}{10}$ hình vuông. Tô 4 cột là tô $\\dfrac{4}{10}$ hình vuông.',
        },
        {
          type: 'p',
          text: 'Chia mỗi cột thành 10 ô, hình vuông có 100 ô. Mỗi ô là $\\dfrac{1}{100}$ hình vuông. Tô 3 ô là tô $\\dfrac{3}{100}$ hình vuông.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Một cột có 10 ô, nên $\\dfrac{4}{10} = \\dfrac{40}{100}$.',
        },
      ],
    },
    {
      heading: 'Viết phân số thành phân số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em nhân cả tử số và mẫu số với cùng một số (hoặc chia cả hai cho cùng một số) để được mẫu số 10, 100, 1 000, ...',
        },
        {
          type: 'p',
          text: 'Nhân: $\\dfrac{3}{5} = \\dfrac{3 \\times 2}{5 \\times 2} = \\dfrac{6}{10}$.',
        },
        {
          type: 'p',
          text: 'Nhân: $\\dfrac{3}{4} = \\dfrac{3 \\times 25}{4 \\times 25} = \\dfrac{75}{100}$.',
        },
        {
          type: 'p',
          text: 'Chia: $\\dfrac{27}{300} = \\dfrac{27 : 3}{300 : 3} = \\dfrac{9}{100}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo',
          text: '2 × 5 = 10, 4 × 25 = 100, 8 × 125 = 1 000. Em dùng các cặp số này để tìm số cần nhân.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô lưới 10 × 10',
    instruction:
      'Em chọn tô từng cột hoặc tô từng ô, rồi chạm vào lưới hoặc bấm các nút để tô đúng phân số được hỏi. Lưới cho biết phần đã tô viết thành phân số thập phân.',
  },
  examples: [
    {
      problem: 'Viết $\\dfrac{11}{25}$ thành phân số thập phân có mẫu số 100.',
      steps: [
        '100 : 25 = 4.',
        'Nhân cả tử số và mẫu số với 4: $\\dfrac{11 \\times 4}{25 \\times 4} = \\dfrac{44}{100}$.',
      ],
      answer: '$\\dfrac{11}{25} = \\dfrac{44}{100}$.',
    },
    {
      problem: 'Viết $\\dfrac{66}{60}$ thành phân số thập phân.',
      steps: [
        '60 không phải 10, 100, ... Nhưng 60 : 6 = 10.',
        'Chia cả tử số và mẫu số cho 6: $\\dfrac{66 : 6}{60 : 6} = \\dfrac{11}{10}$.',
      ],
      answer: '$\\dfrac{66}{60} = \\dfrac{11}{10}$.',
    },
    {
      problem: 'Viết $\\dfrac{31}{125}$ thành phân số thập phân.',
      steps: [
        '125 × 8 = 1 000.',
        'Nhân cả tử số và mẫu số với 8: $\\dfrac{31 \\times 8}{125 \\times 8} = \\dfrac{248}{1000}$.',
      ],
      answer: '$\\dfrac{31}{125} = \\dfrac{248}{1000}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các phân số thập phân.',
      options: [
        '$\\dfrac{7}{10}$',
        '$\\dfrac{9}{20}$',
        '$\\dfrac{63}{100}$',
        '$\\dfrac{100}{59}$',
        '$\\dfrac{178}{100}$',
        '$\\dfrac{365}{1000}$',
      ],
      answers: [0, 2, 4, 5],
      hints: ['Em chỉ nhìn mẫu số: có phải 10, 100, 1 000 không?'],
      solution:
        '$\\dfrac{7}{10}$, $\\dfrac{63}{100}$, $\\dfrac{178}{100}$, $\\dfrac{365}{1000}$ là phân số thập phân. $\\dfrac{9}{20}$ và $\\dfrac{100}{59}$ thì không.',
    },
    {
      type: 'choice',
      prompt: 'Trên lưới 100 ô, em tô 35 ô. Phân số thập phân nào chỉ phần đã tô?',
      options: [
        '$\\dfrac{35}{100}$',
        '$\\dfrac{35}{10}$',
        '$\\dfrac{3}{10}$',
        '$\\dfrac{65}{100}$',
      ],
      answer: 0,
      hints: ['Mỗi ô là một phần trăm của hình vuông.'],
      solution: 'Tô 35 ô trong 100 ô là $\\dfrac{35}{100}$ hình vuông.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{4}{5} = \\dfrac{?}{10}$',
      answer: 8,
      hints: ['5 nhân mấy được 10?'],
      solution:
        '5 × 2 = 10, nên $\\dfrac{4}{5} = \\dfrac{4 \\times 2}{5 \\times 2} = \\dfrac{8}{10}$.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{25}{500} = \\dfrac{?}{100}$',
      answer: 5,
      hints: ['500 chia mấy được 100?'],
      solution:
        '500 : 5 = 100, nên $\\dfrac{25}{500} = \\dfrac{25 : 5}{500 : 5} = \\dfrac{5}{100}$.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{13}{25} = \\dfrac{?}{100}$',
      answer: 52,
      hints: ['25 × 4 = 100.'],
      solution: '$\\dfrac{13}{25} = \\dfrac{13 \\times 4}{25 \\times 4} = \\dfrac{52}{100}$.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp? $\\dfrac{82}{2000} = \\dfrac{?}{1000}$',
      answer: 41,
      hints: ['2 000 : 2 = 1 000.'],
      solution: '$\\dfrac{82}{2000} = \\dfrac{82 : 2}{2000 : 2} = \\dfrac{41}{1000}$.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{9}{4}$ thành phân số thập phân có mẫu số 100. Tử số là bao nhiêu?',
      answer: 225,
      hints: ['4 × 25 = 100.'],
      solution:
        '$\\dfrac{9}{4} = \\dfrac{9 \\times 25}{4 \\times 25} = \\dfrac{225}{100}$. Tử số là 225.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{42}{600}$ thành phân số thập phân có mẫu số 100. Tử số là bao nhiêu?',
      answer: 7,
      hints: ['600 : 6 = 100.'],
      solution: '$\\dfrac{42}{600} = \\dfrac{42 : 6}{600 : 6} = \\dfrac{7}{100}$. Tử số là 7.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phân số với phân số thập phân bằng nó.',
      left: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{5}$', '$\\dfrac{3}{20}$'],
      right: [
        '$\\dfrac{5}{10}$',
        '$\\dfrac{25}{100}$',
        '$\\dfrac{2}{10}$',
        '$\\dfrac{15}{100}$',
        '$\\dfrac{4}{10}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tìm số nhân với mẫu số để được 10 hoặc 100.'],
      solution:
        '$\\dfrac{1}{2} = \\dfrac{5}{10}$, $\\dfrac{1}{4} = \\dfrac{25}{100}$, $\\dfrac{1}{5} = \\dfrac{2}{10}$, $\\dfrac{3}{20} = \\dfrac{15}{100}$.',
    },
    {
      type: 'number',
      prompt:
        'Viết $\\dfrac{17}{125}$ thành phân số thập phân có mẫu số 1 000. Tử số là bao nhiêu?',
      answer: 136,
      hints: ['125 × 8 = 1 000.'],
      solution:
        '$\\dfrac{17}{125} = \\dfrac{17 \\times 8}{125 \\times 8} = \\dfrac{136}{1000}$. Tử số là 136.',
    },
  ],
  takeaways: [
    'Phân số thập phân có mẫu số 10, 100, 1 000, ...',
    'Trên hình vuông 100 ô: một cột là một phần mười, một ô là một phần trăm.',
    'Nhân hoặc chia cả tử số và mẫu số để được phân số thập phân.',
  ],
};
