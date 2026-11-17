/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn 1, làm như thế cho đến khi được phân số tối giản; phân số tối giản là phân số có tử số và mẫu số không cùng chia hết cho số tự nhiên nào lớn hơn 1.',
  intro:
    'Em đã biết $\\dfrac{6}{8} = \\dfrac{3}{4}$. Phân số $\\dfrac{3}{4}$ có tử số và mẫu số bé hơn, dễ đọc, dễ tính hơn. Làm sao để viết một phân số gọn như thế? Em cùng học rút gọn phân số nhé!',
  objectives: ['Nhận biết được phân số tối giản.', 'Rút gọn được phân số đến phân số tối giản.'],
  sections: [
    {
      heading: 'Rút gọn phân số',
      blocks: [
        {
          type: 'p',
          text: 'Tử số 6 và mẫu số 8 cùng chia hết cho 2. Chia cả tử số và mẫu số cho 2:',
        },
        { type: 'tex', tex: '\\dfrac{6}{8} = \\dfrac{6 : 2}{8 : 2} = \\dfrac{3}{4}' },
        {
          type: 'p',
          text: 'Phân số $\\dfrac{3}{4}$ bằng $\\dfrac{6}{8}$, tử số và mẫu số bé hơn. Ta nói: đã rút gọn phân số $\\dfrac{6}{8}$ thành $\\dfrac{3}{4}$.',
        },
      ],
    },
    {
      heading: 'Phân số tối giản',
      blocks: [
        {
          type: 'p',
          text: 'Tử số 3 và mẫu số 4 không cùng chia hết cho số tự nhiên nào lớn hơn 1. Phân số $\\dfrac{3}{4}$ không rút gọn được nữa.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Phân số tối giản là phân số có tử số và mẫu số không cùng chia hết cho số tự nhiên nào lớn hơn 1.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\dfrac{3}{4}$, $\\dfrac{2}{3}$, $\\dfrac{5}{17}$ là các phân số tối giản. $\\dfrac{9}{21}$ chưa tối giản vì 9 và 21 cùng chia hết cho 3.',
        },
      ],
    },
    {
      heading: 'Cách rút gọn phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi rút gọn phân số: xét xem tử số và mẫu số cùng chia hết cho số tự nhiên nào lớn hơn 1. Chia tử số và mẫu số cho số đó. Cứ làm như thế cho đến khi nhận được phân số tối giản.',
        },
        { type: 'p', text: 'Có thể rút gọn qua nhiều bước:' },
        {
          type: 'tex',
          tex: '\\dfrac{18}{54} = \\dfrac{18 : 2}{54 : 2} = \\dfrac{9}{27} = \\dfrac{9 : 9}{27 : 9} = \\dfrac{1}{3}',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Chọn được số chia lớn thì rút gọn nhanh hơn: $\\dfrac{18}{54} = \\dfrac{18 : 18}{54 : 18} = \\dfrac{1}{3}$. Cách nào cũng cho cùng một phân số tối giản.',
        },
        {
          type: 'p',
          text: 'Em dùng bảng nhân, bảng chia để tìm số mà tử số và mẫu số cùng chia hết.',
        },
      ],
    },
  ],
  explore: {
    title: 'Rút gọn từng bước',
    instruction:
      'Em chọn một số từ 2 đến 9 để chia cả tử số và mẫu số. Nếu chia được, phân số gọn hơn và băng dưới gộp lại thành ít phần hơn, phần tô màu vẫn dài bằng nhau. Bí quá, em bấm "Tô màu số chia được". Rút gọn đến khi được phân số tối giản.',
  },
  examples: [
    {
      problem: 'Rút gọn phân số $\\dfrac{15}{18}$.',
      steps: [
        '15 và 18 cùng chia hết cho 3.',
        'Chia cả tử số và mẫu số cho 3: $\\dfrac{15}{18} = \\dfrac{15 : 3}{18 : 3} = \\dfrac{5}{6}$.',
        '5 và 6 không cùng chia hết cho số nào lớn hơn 1, nên $\\dfrac{5}{6}$ là phân số tối giản.',
      ],
      answer: '$\\dfrac{15}{18} = \\dfrac{5}{6}$.',
    },
    {
      problem: 'Rút gọn phân số $\\dfrac{24}{36}$.',
      steps: [
        '24 và 36 cùng chia hết cho 2: $\\dfrac{24}{36} = \\dfrac{24 : 2}{36 : 2} = \\dfrac{12}{18}$.',
        '12 và 18 cùng chia hết cho 6: $\\dfrac{12}{18} = \\dfrac{12 : 6}{18 : 6} = \\dfrac{2}{3}$.',
        '$\\dfrac{2}{3}$ là phân số tối giản. (Chia ngay cho 12 cũng được: $\\dfrac{24 : 12}{36 : 12} = \\dfrac{2}{3}$.)',
      ],
      answer: '$\\dfrac{24}{36} = \\dfrac{2}{3}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn các phân số tối giản.',
      options: [
        '$\\dfrac{2}{3}$',
        '$\\dfrac{9}{21}$',
        '$\\dfrac{5}{17}$',
        '$\\dfrac{1}{10}$',
        '$\\dfrac{10}{15}$',
        '$\\dfrac{7}{14}$',
      ],
      answers: [0, 2, 3],
      hints: ['Với mỗi phân số, em thử xem tử số và mẫu số có cùng chia hết cho 2, 3, 5, 7 không.'],
      solution:
        '$\\dfrac{2}{3}$, $\\dfrac{5}{17}$, $\\dfrac{1}{10}$ là phân số tối giản. $\\dfrac{9}{21}$ (cùng chia hết cho 3), $\\dfrac{10}{15}$ (cùng chia hết cho 5), $\\dfrac{7}{14}$ (cùng chia hết cho 7) chưa tối giản.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{9}{21}$.',
      answer: [3, 7],
      simplest: true,
      hints: ['9 và 21 cùng chia hết cho 3.'],
      solution: '$\\dfrac{9}{21} = \\dfrac{9 : 3}{21 : 3} = \\dfrac{3}{7}$.',
    },
    {
      type: 'match',
      prompt: 'Em rút gọn mỗi phân số ở bông hoa rồi nối với phân số ở lọ hoa.',
      left: ['$\\dfrac{4}{6}$', '$\\dfrac{10}{12}$', '$\\dfrac{9}{15}$', '$\\dfrac{5}{20}$'],
      right: [
        '$\\dfrac{2}{3}$',
        '$\\dfrac{5}{6}$',
        '$\\dfrac{3}{5}$',
        '$\\dfrac{1}{4}$',
        '$\\dfrac{1}{2}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Chia cả tử số và mẫu số cho số mà cả hai cùng chia hết: 2, 3 hay 5?'],
      solution:
        '$\\dfrac{4}{6} = \\dfrac{2}{3}$ (chia cho 2); $\\dfrac{10}{12} = \\dfrac{5}{6}$ (chia cho 2); $\\dfrac{9}{15} = \\dfrac{3}{5}$ (chia cho 3); $\\dfrac{5}{20} = \\dfrac{1}{4}$ (chia cho 5).',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân số $\\dfrac{48}{60}$ được phân số tối giản là:',
      options: ['$\\dfrac{24}{30}$', '$\\dfrac{12}{15}$', '$\\dfrac{3}{5}$', '$\\dfrac{4}{5}$'],
      answer: 3,
      hints: [
        '$\\dfrac{24}{30}$ và $\\dfrac{12}{15}$ bằng $\\dfrac{48}{60}$ nhưng chưa tối giản.',
        '48 và 60 cùng chia hết cho 12.',
      ],
      solution:
        '$\\dfrac{48}{60} = \\dfrac{48 : 12}{60 : 12} = \\dfrac{4}{5}$, và $\\dfrac{4}{5}$ là phân số tối giản.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{12}{48}$.',
      answer: [1, 4],
      simplest: true,
      hints: ['12 và 48 cùng chia hết cho 12 (vì 48 = 12 × 4).'],
      solution: '$\\dfrac{12}{48} = \\dfrac{12 : 12}{48 : 12} = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{80}{100}$.',
      answer: [4, 5],
      simplest: true,
      hints: ['80 và 100 cùng chia hết cho 10.', 'Rút gọn được $\\dfrac{8}{10}$, em rút gọn tiếp.'],
      solution:
        '$\\dfrac{80}{100} = \\dfrac{80 : 10}{100 : 10} = \\dfrac{8}{10} = \\dfrac{8 : 2}{10 : 2} = \\dfrac{4}{5}$ (hoặc chia ngay cho 20).',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{75}{125}$.',
      answer: [3, 5],
      simplest: true,
      hints: ['75 và 125 cùng chia hết cho 5.', 'Được $\\dfrac{15}{25}$, vẫn cùng chia hết cho 5.'],
      solution:
        '$\\dfrac{75}{125} = \\dfrac{75 : 5}{125 : 5} = \\dfrac{15}{25} = \\dfrac{15 : 5}{25 : 5} = \\dfrac{3}{5}$ (hoặc chia ngay cho 25).',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{12 \\times 11 \\times 13}{13 \\times 17 \\times 11}$.',
      answer: [12, 17],
      simplest: true,
      hints: [
        'Ở trên và ở dưới gạch ngang đều có thừa số 11 và 13.',
        'Cùng chia tích ở trên và tích ở dưới cho 11, rồi cho 13.',
      ],
      solution:
        'Chia tích ở trên và tích ở dưới cho 11 rồi cho 13 (gạch các thừa số giống nhau): $\\dfrac{12 \\times 11 \\times 13}{13 \\times 17 \\times 11} = \\dfrac{12}{17}$.',
    },
    {
      type: 'choice',
      prompt:
        'Thỏ mẹ chia một giỏ cà rốt. Thỏ nâu được $\\dfrac{5}{10}$ giỏ, thỏ xám được $\\dfrac{1}{4}$ giỏ, thỏ trắng được $\\dfrac{25}{100}$ giỏ. Hai thỏ con nào được số phần giỏ cà rốt bằng nhau?',
      options: ['Thỏ xám và thỏ trắng', 'Thỏ nâu và thỏ xám', 'Thỏ nâu và thỏ trắng'],
      answer: 0,
      hints: ['Em rút gọn $\\dfrac{5}{10}$ và $\\dfrac{25}{100}$.'],
      solution:
        '$\\dfrac{5}{10} = \\dfrac{5 : 5}{10 : 5} = \\dfrac{1}{2}$; $\\dfrac{25}{100} = \\dfrac{25 : 25}{100 : 25} = \\dfrac{1}{4}$. Thỏ xám và thỏ trắng cùng được $\\dfrac{1}{4}$ giỏ.',
    },
  ],
  takeaways: [
    'Phân số tối giản: tử số và mẫu số không cùng chia hết cho số tự nhiên nào lớn hơn 1.',
    'Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn 1, làm đến khi được phân số tối giản.',
    'Phân số sau khi rút gọn bằng phân số ban đầu.',
  ],
};
