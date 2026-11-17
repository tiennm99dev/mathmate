/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khái niệm phân số: một hình chia thành các phần bằng nhau, tô màu một số phần; mẫu số là số phần bằng nhau, tử số là số phần đã tô màu; đọc và viết phân số.',
  intro:
    'Một cái bánh tròn được cắt thành 6 phần bằng nhau. Mai ăn 5 phần. Mai đã ăn bao nhiêu phần cái bánh? Em cùng học cách viết bằng phân số nhé!',
  objectives: [
    'Nhận biết được phân số, tử số và mẫu số.',
    'Đọc, viết được phân số.',
    'Viết được phân số chỉ phần đã tô màu của một hình.',
  ],
  sections: [
    {
      heading: 'Phân số',
      blocks: [
        {
          type: 'p',
          text: 'Hình tròn được chia thành 6 phần bằng nhau. Đã tô màu 5 phần.',
        },
        {
          type: 'p',
          text: 'Ta nói: đã tô màu năm phần sáu hình tròn. Ta viết $\\dfrac{5}{6}$, đọc là năm phần sáu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Ta gọi $\\dfrac{5}{6}$ là phân số. Phân số $\\dfrac{5}{6}$ có tử số là 5, mẫu số là 6.',
        },
      ],
    },
    {
      heading: 'Tử số và mẫu số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mẫu số là số tự nhiên khác 0, viết dưới gạch ngang. Mẫu số cho biết hình được chia thành bao nhiêu phần bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tử số là số tự nhiên viết trên gạch ngang. Tử số cho biết đã lấy (đã tô màu) bao nhiêu phần bằng nhau đó.',
        },
        {
          type: 'p',
          text: 'Với $\\dfrac{5}{6}$ hình tròn: mẫu số 6 cho biết hình tròn được chia thành 6 phần bằng nhau, tử số 5 cho biết đã tô màu 5 phần.',
        },
      ],
    },
    {
      heading: 'Đọc, viết phân số',
      blocks: [
        {
          type: 'p',
          text: 'Viết phân số: viết tử số, kẻ gạch ngang, viết mẫu số dưới gạch ngang. Đọc phân số: đọc tử số, đọc "phần", rồi đọc mẫu số.',
        },
        {
          type: 'table',
          head: ['Phân số', 'Đọc là', 'Tử số', 'Mẫu số'],
          rows: [
            ['$\\dfrac{1}{2}$', 'một phần hai', '1', '2'],
            ['$\\dfrac{3}{4}$', 'ba phần tư', '3', '4'],
            ['$\\dfrac{4}{7}$', 'bốn phần bảy', '4', '7'],
            ['$\\dfrac{9}{10}$', 'chín phần mười', '9', '10'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mẫu số là 4 thì em đọc là "phần tư": $\\dfrac{3}{4}$ đọc là ba phần tư.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các phần phải bằng nhau. Chỉ khi hình được chia thành các phần bằng nhau, em mới viết phân số chỉ phần đã tô màu như trên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô màu tạo phân số',
    instruction:
      'Em đọc đề rồi chạm vào từng phần của hình để tô màu (chạm lại để bỏ màu). Phân số hiện ngay bên dưới: mẫu số là số phần bằng nhau, tử số là số phần em đã tô. Tô xong, em bấm "Hình khác".',
  },
  examples: [
    {
      problem:
        'Một băng giấy được chia thành 8 phần bằng nhau, đã tô màu 3 phần. Viết và đọc phân số chỉ phần đã tô màu của băng giấy.',
      steps: [
        'Băng giấy được chia thành 8 phần bằng nhau, nên mẫu số là 8.',
        'Đã tô màu 3 phần, nên tử số là 3.',
        'Viết tử số trên gạch ngang, mẫu số dưới gạch ngang: $\\dfrac{3}{8}$.',
      ],
      answer: 'Đã tô màu $\\dfrac{3}{8}$ băng giấy, đọc là ba phần tám.',
    },
    {
      problem:
        'Một hình được chia thành 12 phần bằng nhau, đã tô màu 7 phần. Viết phân số chỉ phần đã tô màu và nêu tử số, mẫu số của phân số đó. Viết phân số chỉ phần chưa tô màu.',
      steps: [
        'Hình có 12 phần bằng nhau, đã tô màu 7 phần: phân số $\\dfrac{7}{12}$, đọc là bảy phần mười hai. Tử số là 7, mẫu số là 12.',
        'Phần chưa tô màu: 12 − 7 = 5 (phần) trong 12 phần bằng nhau.',
      ],
      answer:
        'Phân số $\\dfrac{7}{12}$ có tử số 7, mẫu số 12. Phần chưa tô màu là $\\dfrac{5}{12}$ hình.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Hình tròn được chia thành 8 phần bằng nhau, đã tô màu 3 phần. Phân số nào chỉ phần đã tô màu?',
      options: ['$\\dfrac{3}{8}$', '$\\dfrac{8}{3}$', '$\\dfrac{5}{8}$', '$\\dfrac{3}{5}$'],
      answer: 0,
      hints: ['Mẫu số là số phần bằng nhau của cả hình.', 'Tử số là số phần đã tô màu.'],
      solution: 'Cả hình có 8 phần bằng nhau, đã tô 3 phần. Phân số là $\\dfrac{3}{8}$.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phân số với cách đọc.',
      left: ['$\\dfrac{2}{5}$', '$\\dfrac{3}{4}$', '$\\dfrac{7}{10}$', '$\\dfrac{5}{9}$'],
      right: ['hai phần năm', 'ba phần tư', 'bảy phần mười', 'năm phần chín', 'năm phần hai'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đọc tử số trước, rồi đọc "phần", rồi đọc mẫu số.'],
      solution:
        '$\\dfrac{2}{5}$: hai phần năm. $\\dfrac{3}{4}$: ba phần tư. $\\dfrac{7}{10}$: bảy phần mười. $\\dfrac{5}{9}$: năm phần chín.',
    },
    {
      type: 'number',
      prompt: 'Phân số $\\dfrac{7}{12}$ có tử số là bao nhiêu?',
      answer: 7,
      hints: ['Tử số viết trên gạch ngang.'],
      solution: 'Tử số viết trên gạch ngang. Phân số $\\dfrac{7}{12}$ có tử số là 7.',
    },
    {
      type: 'number',
      prompt: 'Phân số $\\dfrac{9}{15}$ có mẫu số là bao nhiêu?',
      answer: 15,
      hints: ['Mẫu số viết dưới gạch ngang.'],
      solution: 'Mẫu số viết dưới gạch ngang. Phân số $\\dfrac{9}{15}$ có mẫu số là 15.',
    },
    {
      type: 'fraction',
      prompt: 'Viết phân số: năm phần tám.',
      answer: [5, 8],
      simplest: true,
      hints: ['"Năm" là tử số, "tám" là mẫu số.'],
      solution: 'Năm phần tám viết là $\\dfrac{5}{8}$: tử số 5, mẫu số 8.',
    },
    {
      type: 'choice',
      prompt:
        'Trong phân số $\\dfrac{5}{6}$ chỉ phần đã tô màu của hình tròn, mẫu số 6 cho biết gì?',
      options: [
        'Hình tròn được chia thành 6 phần bằng nhau',
        'Đã tô màu 6 phần',
        'Còn 6 phần chưa tô màu',
      ],
      answer: 0,
      hints: ['Mẫu số cho biết cả hình có bao nhiêu phần bằng nhau.'],
      solution:
        'Mẫu số 6 cho biết hình tròn được chia thành 6 phần bằng nhau; tử số 5 cho biết đã tô màu 5 phần.',
    },
    {
      type: 'fraction',
      prompt:
        'Một cái bánh được cắt thành 4 phần bằng nhau. Nam ăn 1 phần. Viết phân số chỉ phần bánh Nam đã ăn.',
      answer: [1, 4],
      simplest: true,
      hints: ['Cái bánh có mấy phần bằng nhau? Nam ăn mấy phần?'],
      solution: 'Cái bánh có 4 phần bằng nhau, Nam ăn 1 phần. Nam đã ăn $\\dfrac{1}{4}$ cái bánh.',
    },
    {
      type: 'choice',
      prompt:
        'Băng giấy được chia thành 5 phần bằng nhau, đã tô màu 2 phần. Phân số nào chỉ phần chưa tô màu?',
      options: ['$\\dfrac{3}{5}$', '$\\dfrac{2}{5}$', '$\\dfrac{5}{3}$', '$\\dfrac{3}{2}$'],
      answer: 0,
      hints: ['Em tìm số phần chưa tô màu: 5 − 2.'],
      solution:
        'Còn 5 − 2 = 3 phần chưa tô màu trong 5 phần bằng nhau. Phân số là $\\dfrac{3}{5}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phân số có tử số là 3.',
      options: ['$\\dfrac{3}{7}$', '$\\dfrac{7}{3}$', '$\\dfrac{3}{10}$', '$\\dfrac{5}{3}$'],
      answers: [0, 2],
      hints: ['Tử số là số viết trên gạch ngang.'],
      solution:
        '$\\dfrac{3}{7}$ và $\\dfrac{3}{10}$ có số 3 viết trên gạch ngang, nên có tử số là 3.',
    },
    {
      type: 'text',
      prompt: 'Đọc phân số $\\dfrac{11}{20}$.',
      accept: ['mười một phần hai mươi'],
      hints: ['Đọc tử số 11, rồi "phần", rồi mẫu số 20.'],
      solution: '$\\dfrac{11}{20}$ đọc là mười một phần hai mươi.',
    },
  ],
  takeaways: [
    'Phân số gồm tử số và mẫu số, viết tử số trên gạch ngang, mẫu số dưới gạch ngang.',
    'Mẫu số là số tự nhiên khác 0, cho biết hình được chia thành bao nhiêu phần bằng nhau.',
    'Tử số cho biết đã lấy (đã tô màu) bao nhiêu phần bằng nhau đó.',
    'Đọc phân số: đọc tử số, đọc "phần", rồi đọc mẫu số.',
  ],
};
