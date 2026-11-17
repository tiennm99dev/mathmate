/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Phép nhân, phép chia phân số: nhân, chia hai phân số, nhân và chia với số tự nhiên, tìm thừa số chưa biết, tính thuận tiện, tìm phân số của một số và giải bài toán thực tế.',
  intro:
    'Quãng đường dài 45 km. Một người đã đi được $\\dfrac{2}{3}$ quãng đường. Người đó còn phải đi bao nhiêu ki-lô-mét? Em cùng luyện tập nhé!',
  objectives: [
    'Nhân, chia được hai phân số, phân số với số tự nhiên.',
    'Tìm được thừa số chưa biết và tính thuận tiện với phân số.',
    'Tìm được phân số của một số và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Ôn lại nhân, chia phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số. Chia hai phân số: lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Cách làm', 'Kết quả'],
          rows: [
            [
              '$\\dfrac{5}{6} \\times \\dfrac{1}{3}$',
              '$\\dfrac{5 \\times 1}{6 \\times 3}$',
              '$\\dfrac{5}{18}$',
            ],
            [
              '$\\dfrac{5}{6} : \\dfrac{1}{3}$',
              '$\\dfrac{5}{6} \\times \\dfrac{3}{1} = \\dfrac{15}{6}$',
              '$\\dfrac{5}{2}$',
            ],
            [
              '$\\dfrac{3}{4} : 3$',
              '$\\dfrac{3}{4} \\times \\dfrac{1}{3} = \\dfrac{3}{12}$',
              '$\\dfrac{1}{4}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong một biểu thức, em làm phép nhân, phép chia trước, phép cộng, phép trừ sau: $\\dfrac{5}{3} - \\dfrac{1}{3} : \\dfrac{1}{4} = \\dfrac{5}{3} - \\dfrac{4}{3} = \\dfrac{1}{3}$.',
        },
      ],
    },
    {
      heading: 'Tìm phân số của một số',
      blocks: [
        {
          type: 'p',
          text: 'Muốn tìm phân số của một số, ta lấy số đó nhân với phân số.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{1}{8} \\text{ của } 72 \\text{ là } 72 \\times \\dfrac{1}{8} = 9',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tính thuận tiện: nhóm hai phân số đảo ngược của nhau, tích của chúng bằng 1. $\\dfrac{2}{13} \\times \\dfrac{22}{5} \\times \\dfrac{13}{2} = \\left(\\dfrac{2}{13} \\times \\dfrac{13}{2}\\right) \\times \\dfrac{22}{5} = \\dfrac{22}{5}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài nhân, chia phân số',
    instruction:
      'Mỗi lượt có một câu của từng dạng bài: nhân, chia phân số, phân số đảo ngược, số tự nhiên với phân số, tìm phân số của một số, tìm thừa số chưa biết và bài toán. Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại.',
  },
  examples: [
    {
      problem:
        'Một vại có 15 l nước mắm. Người ta rót ra 8 lọ, mỗi lọ $\\dfrac{3}{4}$ l. Trong vại còn lại bao nhiêu lít nước mắm?',
      steps: [
        'Số lít đã rót: $8 \\times \\dfrac{3}{4} = \\dfrac{24}{4} = 6$ (l).',
        'Số lít còn lại: 15 − 6 = 9 (l).',
      ],
      answer: 'Trong vại còn lại 9 l nước mắm.',
    },
    {
      problem:
        'Một đơn hàng có 1 000 hộp. Tổ của bác Diễm nhận $\\dfrac{1}{4}$ số hộp. Mỗi hộp nặng $\\dfrac{3}{2}$ kg. Các hộp tổ bác Diễm nhận nặng bao nhiêu ki-lô-gam?',
      steps: [
        'Số hộp tổ bác Diễm nhận: $1\\,000 \\times \\dfrac{1}{4} = 250$ (hộp).',
        'Khối lượng: $250 \\times \\dfrac{3}{2} = \\dfrac{750}{2} = 375$ (kg).',
      ],
      answer: 'Các hộp đó nặng 375 kg.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{5}{6} \\times \\dfrac{1}{3}$.',
      options: ['$\\dfrac{5}{18}$', '$\\dfrac{5}{2}$', '$\\dfrac{6}{9}$', '$\\dfrac{5}{9}$'],
      answer: 0,
      hints: ['Tử số nhân tử số, mẫu số nhân mẫu số.'],
      solution:
        '$\\dfrac{5}{6} \\times \\dfrac{1}{3} = \\dfrac{5 \\times 1}{6 \\times 3} = \\dfrac{5}{18}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\dfrac{5}{6} : \\dfrac{1}{3}$. Em viết kết quả là phân số tối giản, ví dụ 3/4.',
      answer: [5, 2],
      simplest: true,
      hints: [
        'Phân số đảo ngược của $\\dfrac{1}{3}$ là $\\dfrac{3}{1}$.',
        'Được $\\dfrac{15}{6}$. Em rút gọn.',
      ],
      solution:
        '$\\dfrac{5}{6} : \\dfrac{1}{3} = \\dfrac{5}{6} \\times \\dfrac{3}{1} = \\dfrac{15}{6} = \\dfrac{5}{2}$.',
    },
    {
      type: 'number',
      prompt:
        '$\\dfrac{5}{3} - \\dfrac{1}{3} : \\dfrac{1}{4} = \\dfrac{?}{3}$. Số nào thích hợp với dấu ?',
      answer: 1,
      hints: [
        'Làm phép chia trước.',
        '$\\dfrac{1}{3} : \\dfrac{1}{4} = \\dfrac{1}{3} \\times 4 = \\dfrac{4}{3}$.',
      ],
      solution:
        '$\\dfrac{5}{3} - \\dfrac{1}{3} : \\dfrac{1}{4} = \\dfrac{5}{3} - \\dfrac{4}{3} = \\dfrac{1}{3}$.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép tính với kết quả của nó.',
      left: [
        '$\\dfrac{2}{7} \\times \\dfrac{7}{2}$',
        '$\\dfrac{3}{4} : 3$',
        '$4 \\times \\dfrac{3}{8}$',
        '$6 : \\dfrac{2}{3}$',
      ],
      right: ['$1$', '$\\dfrac{1}{4}$', '$\\dfrac{3}{2}$', '$9$', '$4$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hai phân số đảo ngược của nhau nhân với nhau được 1.',
        '$6 : \\dfrac{2}{3} = 6 \\times \\dfrac{3}{2}$.',
      ],
      solution:
        '$\\dfrac{2}{7} \\times \\dfrac{7}{2} = \\dfrac{14}{14} = 1$; $\\dfrac{3}{4} : 3 = \\dfrac{3}{4} \\times \\dfrac{1}{3} = \\dfrac{3}{12} = \\dfrac{1}{4}$; $4 \\times \\dfrac{3}{8} = \\dfrac{12}{8} = \\dfrac{3}{2}$; $6 : \\dfrac{2}{3} = 6 \\times \\dfrac{3}{2} = \\dfrac{18}{2} = 9$.',
    },
    {
      type: 'choice',
      prompt:
        'Tính bằng cách thuận tiện: $\\dfrac{2}{13} \\times \\dfrac{22}{5} \\times \\dfrac{13}{2}$.',
      options: ['$\\dfrac{22}{5}$', '$\\dfrac{11}{5}$', '$\\dfrac{22}{65}$', '$\\dfrac{44}{5}$'],
      answer: 0,
      hints: [
        'Đổi chỗ để nhóm $\\dfrac{2}{13}$ với $\\dfrac{13}{2}$.',
        '$\\dfrac{2}{13} \\times \\dfrac{13}{2} = 1$.',
      ],
      solution:
        '$\\left(\\dfrac{2}{13} \\times \\dfrac{13}{2}\\right) \\times \\dfrac{22}{5} = 1 \\times \\dfrac{22}{5} = \\dfrac{22}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm phân số thích hợp với dấu ?: $? : \\dfrac{2}{3} = \\dfrac{3}{4}$. Em viết kết quả là phân số tối giản.',
      answer: [1, 2],
      simplest: true,
      hints: [
        'Muốn tìm số bị chia, em lấy thương nhân với số chia.',
        'Tính $\\dfrac{3}{4} \\times \\dfrac{2}{3}$ rồi rút gọn.',
      ],
      solution:
        '$? = \\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{6}{12} = \\dfrac{1}{2}$. Thử lại: $\\dfrac{1}{2} : \\dfrac{2}{3} = \\dfrac{1}{2} \\times \\dfrac{3}{2} = \\dfrac{3}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường dài 45 km. Một người đã đi được $\\dfrac{2}{3}$ quãng đường. Người đó còn phải đi bao nhiêu ki-lô-mét?',
      answer: 15,
      unit: 'km',
      hints: ['Tìm $\\dfrac{2}{3}$ của 45 km.', 'Lấy 45 trừ đi quãng đường đã đi.'],
      solution: 'Đã đi $45 \\times \\dfrac{2}{3} = 30$ (km). Còn phải đi 45 − 30 = 15 (km).',
    },
    {
      type: 'number',
      prompt:
        'Ông năm nay 72 tuổi. Tuổi của Việt bằng $\\dfrac{1}{8}$ tuổi ông. Việt năm nay bao nhiêu tuổi?',
      answer: 9,
      unit: 'tuổi',
      hints: ['Tìm $\\dfrac{1}{8}$ của 72.'],
      solution: '$72 \\times \\dfrac{1}{8} = 9$. Việt năm nay 9 tuổi.',
    },
    {
      type: 'choice',
      prompt:
        'Một mảnh đất hình chữ nhật có chiều rộng 4 m, diện tích $\\dfrac{91}{2}$ m². Chiều dài mảnh đất là bao nhiêu mét?',
      options: ['$\\dfrac{91}{8}$ m', '182 m', '$\\dfrac{91}{6}$ m', '$\\dfrac{95}{2}$ m'],
      answer: 0,
      hints: [
        'Chiều dài bằng diện tích chia cho chiều rộng.',
        'Tính $\\dfrac{91}{2} : 4 = \\dfrac{91}{2} \\times \\dfrac{1}{4}$.',
      ],
      solution: '$\\dfrac{91}{2} : 4 = \\dfrac{91}{2} \\times \\dfrac{1}{4} = \\dfrac{91}{8}$ (m).',
    },
    {
      type: 'number',
      prompt:
        'Một vại có 15 l nước mắm. Người ta rót ra 8 lọ, mỗi lọ $\\dfrac{3}{4}$ l. Trong vại còn lại bao nhiêu lít nước mắm?',
      answer: 9,
      unit: 'l',
      hints: ['Tính số lít đã rót: $8 \\times \\dfrac{3}{4}$.', 'Lấy 15 trừ đi số lít đã rót.'],
      solution: 'Đã rót $8 \\times \\dfrac{3}{4} = 6$ (l). Còn lại 15 − 6 = 9 (l).',
    },
    {
      type: 'number',
      prompt:
        'Một đơn hàng có 1 000 hộp. Tổ của bác Diễm nhận $\\dfrac{1}{4}$ số hộp, mỗi hộp nặng $\\dfrac{3}{2}$ kg. Các hộp tổ bác Diễm nhận nặng bao nhiêu ki-lô-gam?',
      answer: 375,
      unit: 'kg',
      hints: ['Tìm số hộp: $\\dfrac{1}{4}$ của 1 000.', 'Nhân số hộp với $\\dfrac{3}{2}$.'],
      solution:
        'Số hộp: $1\\,000 \\times \\dfrac{1}{4} = 250$ (hộp). Khối lượng: $250 \\times \\dfrac{3}{2} = 375$ (kg).',
    },
    {
      type: 'choice',
      prompt:
        'Chiếc bánh được cắt thành 8 miếng bằng nhau. Lấy phần nào của chiếc bánh thì được một số miếng tròn, không phải cắt thêm?',
      options: [
        '$\\dfrac{1}{4}$ chiếc bánh',
        '$\\dfrac{1}{5}$ chiếc bánh',
        '$\\dfrac{1}{3}$ chiếc bánh',
      ],
      answer: 0,
      hints: ['Tìm phân số của 8 miếng: chia 8 cho mẫu số.', 'Mẫu số nào chia hết 8?'],
      solution:
        '$\\dfrac{1}{4}$ của 8 miếng là 8 : 4 = 2 miếng. Còn 8 không chia hết cho 5 và cho 3, nên phải cắt thêm.',
    },
  ],
  takeaways: [
    'Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số.',
    'Chia hai phân số: nhân với phân số thứ hai đảo ngược.',
    'Tìm phân số của một số: lấy số đó nhân với phân số.',
  ],
};
