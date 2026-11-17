/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chia phân số: phân số đảo ngược; muốn chia hai phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược. Chia số tự nhiên cho phân số và chia phân số cho số tự nhiên.',
  intro:
    'Một thanh sắt dài $\\dfrac{3}{2}$ m được cắt thành các đoạn dài $\\dfrac{1}{8}$ m. Cắt được bao nhiêu đoạn? Em cùng học phép chia phân số nhé!',
  objectives: [
    'Viết được phân số đảo ngược của một phân số.',
    'Chia được hai phân số bằng cách nhân với phân số đảo ngược.',
    'Chia được số tự nhiên cho phân số, phân số cho số tự nhiên và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Phân số đảo ngược',
      blocks: [
        {
          type: 'p',
          text: 'Đổi chỗ tử số và mẫu số của $\\dfrac{2}{3}$, ta được $\\dfrac{3}{2}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '$\\dfrac{3}{2}$ là phân số đảo ngược của $\\dfrac{2}{3}$. Muốn viết phân số đảo ngược, em đổi chỗ tử số và mẫu số.',
        },
        {
          type: 'table',
          head: ['Phân số', 'Phân số đảo ngược'],
          rows: [
            ['$\\dfrac{5}{8}$', '$\\dfrac{8}{5}$'],
            ['$\\dfrac{3}{4}$', '$\\dfrac{4}{3}$'],
            ['$\\dfrac{1}{2}$', '$\\dfrac{2}{1}$, tức là 2'],
          ],
        },
      ],
    },
    {
      heading: 'Chia hai phân số',
      blocks: [
        {
          type: 'p',
          text: 'Băng giấy dài $\\dfrac{3}{4}$ m. Mỗi đoạn dài $\\dfrac{1}{8}$ m. Đặt lần lượt, em thấy vừa đúng 6 đoạn.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{3}{4} : \\dfrac{1}{8} = \\dfrac{3}{4} \\times \\dfrac{8}{1} = \\dfrac{24}{4} = 6',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia hai phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
        },
        {
          type: 'tex',
          tex: '\\dfrac{3}{7} : \\dfrac{5}{8} = \\dfrac{3}{7} \\times \\dfrac{8}{5} = \\dfrac{24}{35}',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ đảo ngược phân số thứ hai (số chia). Giữ nguyên phân số thứ nhất.',
        },
      ],
    },
    {
      heading: 'Chia với số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Số tự nhiên viết được thành phân số có mẫu số là 1. Số 3 có phân số đảo ngược là $\\dfrac{1}{3}$.',
        },
        {
          type: 'tex',
          tex: '3 : \\dfrac{5}{7} = 3 \\times \\dfrac{7}{5} = \\dfrac{21}{5}',
        },
        {
          type: 'tex',
          tex: '\\dfrac{5}{7} : 3 = \\dfrac{5}{7} \\times \\dfrac{1}{3} = \\dfrac{5}{21}',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt đoạn trên băng giấy',
    instruction:
      'Em bấm "Đặt thêm 1 đoạn" để xếp các đoạn bằng số chia dưới băng số bị chia, đến khi không vừa nữa. Rồi em chọn phân số đảo ngược của số chia.',
  },
  examples: [
    {
      problem:
        'Một bức tranh hình chữ nhật có diện tích $\\dfrac{27}{2}$ dm², chiều rộng $\\dfrac{10}{3}$ dm. Tính chiều dài bức tranh.',
      steps: [
        'Chiều dài bằng diện tích chia cho chiều rộng.',
        'Phân số đảo ngược của $\\dfrac{10}{3}$ là $\\dfrac{3}{10}$.',
        '$\\dfrac{27}{2} : \\dfrac{10}{3} = \\dfrac{27}{2} \\times \\dfrac{3}{10} = \\dfrac{81}{20}$.',
      ],
      answer: 'Chiều dài bức tranh là $\\dfrac{81}{20}$ dm.',
    },
    {
      problem:
        'Một thanh sắt dài $\\dfrac{3}{2}$ m được cắt thành các đoạn, mỗi đoạn dài $\\dfrac{1}{8}$ m. Cắt được bao nhiêu đoạn?',
      steps: [
        'Số đoạn bằng chiều dài thanh sắt chia cho chiều dài một đoạn.',
        '$\\dfrac{3}{2} : \\dfrac{1}{8} = \\dfrac{3}{2} \\times \\dfrac{8}{1} = \\dfrac{24}{2} = 12$.',
      ],
      answer: 'Cắt được 12 đoạn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phân số đảo ngược của $\\dfrac{5}{8}$ là phân số nào?',
      options: ['$\\dfrac{8}{5}$', '$\\dfrac{5}{8}$', '$\\dfrac{3}{8}$', '$\\dfrac{8}{13}$'],
      answer: 0,
      hints: ['Đổi chỗ tử số và mẫu số.'],
      solution: 'Đổi chỗ tử số 5 và mẫu số 8, ta được $\\dfrac{8}{5}$.',
    },
    {
      type: 'number',
      prompt: '$\\dfrac{3}{7} : \\dfrac{5}{8} = \\dfrac{?}{35}$. Số nào thích hợp với dấu ?',
      answer: 24,
      hints: [
        'Nhân $\\dfrac{3}{7}$ với phân số đảo ngược của $\\dfrac{5}{8}$.',
        'Phân số đảo ngược của $\\dfrac{5}{8}$ là $\\dfrac{8}{5}$.',
      ],
      solution:
        '$\\dfrac{3}{7} : \\dfrac{5}{8} = \\dfrac{3}{7} \\times \\dfrac{8}{5} = \\dfrac{24}{35}$.',
    },
    {
      type: 'choice',
      prompt: 'Tính $\\dfrac{3}{5} : \\dfrac{3}{4}$.',
      options: ['$\\dfrac{4}{5}$', '$\\dfrac{9}{20}$', '$\\dfrac{5}{4}$', '$\\dfrac{3}{20}$'],
      answer: 0,
      hints: [
        'Đảo ngược phân số thứ hai: $\\dfrac{4}{3}$.',
        'Tính $\\dfrac{3}{5} \\times \\dfrac{4}{3}$ rồi rút gọn.',
      ],
      solution:
        '$\\dfrac{3}{5} : \\dfrac{3}{4} = \\dfrac{3}{5} \\times \\dfrac{4}{3} = \\dfrac{12}{15} = \\dfrac{4}{5}$. Còn $\\dfrac{9}{20}$ là nhân mà quên đảo ngược.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép chia với kết quả của nó.',
      left: [
        '$\\dfrac{1}{8} : \\dfrac{1}{6}$',
        '$\\dfrac{2}{5} : \\dfrac{3}{10}$',
        '$\\dfrac{1}{3} : \\dfrac{1}{2}$',
      ],
      right: ['$\\dfrac{3}{4}$', '$\\dfrac{4}{3}$', '$\\dfrac{2}{3}$', '$\\dfrac{1}{48}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Nhân phân số thứ nhất với phân số thứ hai đảo ngược.',
        'Rút gọn kết quả: $\\dfrac{6}{8} = \\dfrac{3}{4}$, $\\dfrac{20}{15} = \\dfrac{4}{3}$.',
      ],
      solution:
        '$\\dfrac{1}{8} \\times \\dfrac{6}{1} = \\dfrac{6}{8} = \\dfrac{3}{4}$; $\\dfrac{2}{5} \\times \\dfrac{10}{3} = \\dfrac{20}{15} = \\dfrac{4}{3}$; $\\dfrac{1}{3} \\times \\dfrac{2}{1} = \\dfrac{2}{3}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $3 : \\dfrac{5}{7}$. Em viết kết quả dạng phân số, ví dụ 3/4.',
      answer: [21, 5],
      hints: [
        'Phân số đảo ngược của $\\dfrac{5}{7}$ là $\\dfrac{7}{5}$.',
        'Tính $3 \\times \\dfrac{7}{5}$.',
      ],
      solution: '$3 : \\dfrac{5}{7} = 3 \\times \\dfrac{7}{5} = \\dfrac{21}{5}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\dfrac{5}{7} : 3$. Em viết kết quả dạng phân số.',
      answer: [5, 21],
      hints: ['Phân số đảo ngược của 3 là $\\dfrac{1}{3}$.'],
      solution: '$\\dfrac{5}{7} : 3 = \\dfrac{5}{7} \\times \\dfrac{1}{3} = \\dfrac{5}{21}$.',
    },
    {
      type: 'number',
      prompt:
        'Một thanh sắt dài $\\dfrac{3}{2}$ m được cắt thành các đoạn dài $\\dfrac{1}{8}$ m. Cắt được bao nhiêu đoạn?',
      answer: 12,
      hints: ['Tính $\\dfrac{3}{2} : \\dfrac{1}{8}$.', 'Nhân $\\dfrac{3}{2}$ với 8.'],
      solution:
        '$\\dfrac{3}{2} : \\dfrac{1}{8} = \\dfrac{3}{2} \\times 8 = \\dfrac{24}{2} = 12$. Cắt được 12 đoạn.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm phân số thích hợp với dấu ?: $\\dfrac{2}{5} \\times ? = \\dfrac{3}{10}$. Em viết kết quả dạng phân số.',
      answer: [3, 4],
      hints: [
        'Muốn tìm thừa số chưa biết, em lấy tích chia cho thừa số đã biết.',
        'Tính $\\dfrac{3}{10} : \\dfrac{2}{5}$.',
      ],
      solution:
        '$? = \\dfrac{3}{10} : \\dfrac{2}{5} = \\dfrac{3}{10} \\times \\dfrac{5}{2} = \\dfrac{15}{20} = \\dfrac{3}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Bóng của một toà tháp dài $\\dfrac{99}{4}$ m, gấp 2 lần chiều cao toà tháp. Toà tháp cao bao nhiêu mét? Em viết kết quả dạng phân số.',
      answer: [99, 8],
      hints: [
        'Chiều cao bằng độ dài bóng chia cho 2.',
        'Phân số đảo ngược của 2 là $\\dfrac{1}{2}$.',
      ],
      solution:
        '$\\dfrac{99}{4} : 2 = \\dfrac{99}{4} \\times \\dfrac{1}{2} = \\dfrac{99}{8}$. Toà tháp cao $\\dfrac{99}{8}$ m.',
    },
  ],
  takeaways: [
    'Phân số đảo ngược: đổi chỗ tử số và mẫu số.',
    'Chia hai phân số: lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.',
    'Số 3 viết thành $\\dfrac{3}{1}$, phân số đảo ngược của nó là $\\dfrac{1}{3}$.',
  ],
};
