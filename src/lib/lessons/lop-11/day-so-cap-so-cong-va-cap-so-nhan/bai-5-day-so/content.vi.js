/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dãy số vô hạn và dãy số hữu hạn; bốn cách cho một dãy số: liệt kê, công thức số hạng tổng quát, mô tả và hệ thức truy hồi; dãy số tăng, dãy số giảm và dãy số bị chặn.',
  intro:
    'Xếp que diêm thành một hàng hình vuông liền nhau: một hình vuông cần $4$ que, hai hình cần $7$ que, ba hình cần $10$ que, … Ứng với mỗi số nguyên dương $n$ là số que $u_n$ cần để xếp $n$ hình vuông. Một quy tắc như thế, cho mỗi số nguyên dương một số thực, chính là một dãy số. Bài này cho biết các cách cho một dãy số và cách nhận ra dãy số tăng, giảm hay bị chặn.',
  objectives: [
    'Nhận biết dãy số vô hạn, dãy số hữu hạn, số hạng đầu, số hạng tổng quát.',
    'Cho một dãy số bằng cách liệt kê, bằng công thức số hạng tổng quát, bằng mô tả hoặc bằng hệ thức truy hồi; tính các số hạng của dãy.',
    'Xét tính tăng, giảm và tính bị chặn của một dãy số đơn giản.',
  ],
  sections: [
    {
      heading: 'Định nghĩa dãy số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số vô hạn',
          text: 'Mỗi hàm số $u$ xác định trên tập các số nguyên dương $\\mathbb{N}^*$ được gọi là một dãy số vô hạn (gọi tắt là dãy số). Kí hiệu $u = u(n)$. Ta thường viết $u_n$ thay cho $u(n)$ và kí hiệu dãy số là $(u_n)$; $u_n$ được gọi là số hạng tổng quát, $u_1$ là số hạng đầu của dãy số.',
        },
        {
          type: 'p',
          text: 'Dãy số $(u_n)$ thường được viết dưới dạng khai triển $u_1, u_2, u_3, \\ldots, u_n, \\ldots$ Chẳng hạn, dãy các số nguyên dương chẵn là $2, 4, 6, \\ldots, 2n, \\ldots$ với $u_n = 2n$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số hữu hạn',
          text: 'Mỗi hàm số $u$ xác định trên tập $M = \\{1; 2; 3; \\ldots; m\\}$ với $m \\in \\mathbb{N}^*$ được gọi là một dãy số hữu hạn. Dạng khai triển của nó là $u_1, u_2, \\ldots, u_m$, trong đó $u_1$ là số hạng đầu và $u_m$ là số hạng cuối.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $1, 4, 9, 16, 25$ là dãy số hữu hạn có số hạng đầu $u_1 = 1$ và số hạng cuối $u_5 = 25$.',
        },
      ],
    },
    {
      heading: 'Cách cho một dãy số',
      blocks: [
        {
          type: 'p',
          text: 'Một dãy số có thể được cho bằng một trong các cách sau:',
        },
        {
          type: 'list',
          items: [
            'Liệt kê các số hạng (với dãy hữu hạn, hoặc dãy vô hạn có quy luật dễ thấy): $1, 3, 5, 7, 9$.',
            'Công thức của số hạng tổng quát, cho $u_n$ theo $n$: $u_n = \\dfrac{n}{n + 1}$. Thay $n$ bằng một số nguyên dương, ta tính được ngay số hạng thứ $n$: $u_3 = \\dfrac{3}{4}$.',
            'Mô tả bằng lời: "dãy các số nguyên tố theo thứ tự tăng dần" cho $2, 3, 5, 7, 11, \\ldots$; dãy này không có công thức số hạng tổng quát đơn giản.',
            'Hệ thức truy hồi: cho số hạng đầu (hoặc vài số hạng đầu) và một hệ thức tính mỗi số hạng theo các số hạng đứng trước nó.',
          ],
        },
        {
          type: 'p',
          text: 'Dãy Fibonacci được cho bằng hệ thức truy hồi:',
        },
        {
          type: 'tex',
          tex: 'u_1 = u_2 = 1, \\qquad u_n = u_{n-1} + u_{n-2} \\quad (n \\ge 3).',
        },
        {
          type: 'p',
          text: 'Từ đó $u_3 = 2$, $u_4 = 3$, $u_5 = 5$, $u_6 = 8$, … Muốn tính $u_{10}$ bằng hệ thức truy hồi, ta phải tính lần lượt mọi số hạng đứng trước nó.',
        },
      ],
    },
    {
      heading: 'Dãy số tăng, dãy số giảm và dãy số bị chặn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số tăng, dãy số giảm',
          text: 'Dãy số $(u_n)$ được gọi là dãy số tăng nếu $u_{n+1} > u_n$ với mọi $n \\in \\mathbb{N}^*$. Dãy số $(u_n)$ được gọi là dãy số giảm nếu $u_{n+1} < u_n$ với mọi $n \\in \\mathbb{N}^*$.',
        },
        {
          type: 'list',
          items: [
            'Xét hiệu $u_{n+1} - u_n$: nếu hiệu này dương với mọi $n$ thì dãy tăng, âm với mọi $n$ thì dãy giảm.',
            'Khi mọi số hạng đều dương, có thể so sánh tỉ số $\\dfrac{u_{n+1}}{u_n}$ với $1$: lớn hơn $1$ với mọi $n$ thì dãy tăng, nhỏ hơn $1$ với mọi $n$ thì dãy giảm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Một dãy số không nhất thiết phải tăng hoặc giảm. Chẳng hạn, dãy $u_n = (-1)^n$, tức là $-1, 1, -1, 1, \\ldots$, không tăng cũng không giảm. Để chứng tỏ một dãy không tăng, chỉ cần chỉ ra một chỉ số $n$ có $u_{n+1} \\le u_n$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dãy số bị chặn',
          text: 'Dãy số $(u_n)$ được gọi là bị chặn trên nếu tồn tại một số $M$ sao cho $u_n \\le M$ với mọi $n \\in \\mathbb{N}^*$; bị chặn dưới nếu tồn tại một số $m$ sao cho $u_n \\ge m$ với mọi $n \\in \\mathbb{N}^*$. Dãy số được gọi là bị chặn nếu nó vừa bị chặn trên vừa bị chặn dưới, tức là tồn tại các số $m$ và $M$ sao cho $m \\le u_n \\le M$ với mọi $n \\in \\mathbb{N}^*$.',
        },
        {
          type: 'table',
          caption: 'Một số dãy số quen thuộc',
          head: ['Dãy số', 'Tăng hay giảm', 'Bị chặn'],
          rows: [
            ['$u_n = 2n - 1$', 'Tăng', 'Bị chặn dưới bởi $1$, không bị chặn trên'],
            ['$u_n = \\dfrac{1}{n}$', 'Giảm', 'Bị chặn: $0 < u_n \\le 1$'],
            ['$u_n = \\dfrac{n}{n + 1}$', 'Tăng', 'Bị chặn: $\\dfrac{1}{2} \\le u_n < 1$'],
            ['$u_n = (-1)^n$', 'Không tăng, không giảm', 'Bị chặn: $-1 \\le u_n \\le 1$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xem các số hạng của một dãy số',
    instruction:
      'Chọn cách cho dãy số, gõ một công thức (hoặc bấm một ví dụ có sẵn) và xem các số hạng đầu hiện thành cột và điểm $(n; u_n)$. Quan sát xem số hạng sau lớn hơn hay nhỏ hơn số hạng trước, các số hạng có nằm giữa hai số cố định không. Ghi nhớ rằng vài số hạng đầu chỉ gợi ý, còn kết luận cần chứng minh cho mọi $n$.',
  },
  examples: [
    {
      problem: 'Cho dãy số $(u_n)$ với $u_n = (-1)^n \\cdot 2n$. Viết năm số hạng đầu của dãy.',
      steps: [
        '$u_1 = (-1)^1 \\cdot 2 = -2$; $u_2 = (-1)^2 \\cdot 4 = 4$; $u_3 = (-1)^3 \\cdot 6 = -6$.',
        '$u_4 = (-1)^4 \\cdot 8 = 8$; $u_5 = (-1)^5 \\cdot 10 = -10$.',
      ],
      answer: 'Năm số hạng đầu là $-2, 4, -6, 8, -10$.',
    },
    {
      problem:
        'Cho dãy số $(u_n)$ xác định bởi $u_1 = 1$ và $u_n = 2u_{n-1} + 1$ với $n \\ge 2$. Tính năm số hạng đầu và dự đoán công thức số hạng tổng quát.',
      steps: [
        '$u_2 = 2 \\cdot 1 + 1 = 3$; $u_3 = 2 \\cdot 3 + 1 = 7$; $u_4 = 2 \\cdot 7 + 1 = 15$; $u_5 = 2 \\cdot 15 + 1 = 31$.',
        'Các số $1, 3, 7, 15, 31$ đều nhỏ hơn một luỹ thừa của $2$ đúng $1$ đơn vị: $2^1 - 1, 2^2 - 1, \\ldots, 2^5 - 1$.',
        'Dự đoán $u_n = 2^n - 1$. Kiểm tra: nếu $u_{n-1} = 2^{n-1} - 1$ thì $u_n = 2(2^{n-1} - 1) + 1 = 2^n - 1$, đúng với hệ thức truy hồi.',
      ],
      answer: '$1, 3, 7, 15, 31$ và $u_n = 2^n - 1$.',
    },
    {
      problem:
        'Xét tính tăng, giảm và tính bị chặn của dãy số $(u_n)$ với $u_n = \\dfrac{n}{n + 1}$.',
      steps: [
        'Xét hiệu: $u_{n+1} - u_n = \\dfrac{n + 1}{n + 2} - \\dfrac{n}{n + 1} = \\dfrac{(n + 1)^2 - n(n + 2)}{(n + 1)(n + 2)} = \\dfrac{1}{(n + 1)(n + 2)}$.',
        'Hiệu này dương với mọi $n \\in \\mathbb{N}^*$, nên $u_{n+1} > u_n$: dãy số tăng.',
        'Ta có $u_n > 0$ và $u_n = 1 - \\dfrac{1}{n + 1} < 1$ với mọi $n$, nên $0 < u_n < 1$: dãy số bị chặn.',
      ],
      answer: 'Dãy số tăng và bị chặn $\\left(0 < u_n < 1\\right)$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Cho dãy số $(u_n)$ với $u_n = \\dfrac{3n - 1}{n + 2}$. Tính $u_4$.',
      answer: [11, 6],
      hints: [
        'Thay $n = 4$ vào công thức số hạng tổng quát.',
        'Tử số là $3 \\cdot 4 - 1$, mẫu số là $4 + 2$.',
      ],
      solution: '$u_4 = \\dfrac{3 \\cdot 4 - 1}{4 + 2} = \\dfrac{11}{6}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho dãy số $(u_n)$ xác định bởi $u_1 = 2$ và $u_n = 3u_{n-1} - 1$ với $n \\ge 2$. Tính $u_4$.',
      answer: 41,
      hints: ['Tính lần lượt $u_2$, $u_3$ rồi $u_4$.', '$u_2 = 3 \\cdot 2 - 1 = 5$.'],
      solution:
        '$u_2 = 3 \\cdot 2 - 1 = 5$; $u_3 = 3 \\cdot 5 - 1 = 14$; $u_4 = 3 \\cdot 14 - 1 = 41$.',
    },
    {
      type: 'number',
      prompt:
        'Dãy Fibonacci được cho bởi $u_1 = u_2 = 1$ và $u_n = u_{n-1} + u_{n-2}$ với $n \\ge 3$. Tính $u_{10}$.',
      answer: 55,
      hints: [
        'Mỗi số hạng bằng tổng của hai số hạng đứng ngay trước nó.',
        'Viết lần lượt: $1, 1, 2, 3, 5, 8, \\ldots$',
      ],
      solution: 'Mười số hạng đầu là $1, 1, 2, 3, 5, 8, 13, 21, 34, 55$, nên $u_{10} = 55$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dãy số với cách cho dãy số đó.',
      left: [
        '$1, 3, 5, 7, 9$',
        '$u_n = n^2 + 1$',
        '$u_1 = 3$, $u_n = u_{n-1} + 4$ $(n \\ge 2)$',
        'Dãy các số nguyên tố theo thứ tự tăng dần',
      ],
      right: [
        'Liệt kê các số hạng',
        'Công thức của số hạng tổng quát',
        'Hệ thức truy hồi',
        'Mô tả bằng lời',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hệ thức truy hồi tính mỗi số hạng theo số hạng đứng trước nó.',
        'Công thức số hạng tổng quát cho $u_n$ trực tiếp theo $n$.',
      ],
      solution:
        'Dãy $1, 3, 5, 7, 9$ cho bằng liệt kê; $u_n = n^2 + 1$ là công thức số hạng tổng quát; $u_n = u_{n-1} + 4$ là hệ thức truy hồi; "dãy các số nguyên tố" là mô tả bằng lời.',
    },
    {
      type: 'choice',
      prompt: 'Dãy số nào sau đây là dãy số tăng?',
      options: [
        '$u_n = 3n - 5$',
        '$u_n = \\dfrac{1}{n}$',
        '$u_n = (-1)^n \\cdot n$',
        '$u_n = 5 - 2n$',
      ],
      answer: 0,
      hints: ['Xét dấu của hiệu $u_{n+1} - u_n$ cho từng dãy.'],
      solution:
        'Với $u_n = 3n - 5$: $u_{n+1} - u_n = 3 > 0$, dãy tăng. Dãy $\\dfrac{1}{n}$ và dãy $5 - 2n$ giảm; dãy $(-1)^n \\cdot n$ là $-1, 2, -3, 4, \\ldots$ không tăng cũng không giảm.',
    },
    {
      type: 'multi',
      prompt: 'Cho dãy số $(u_n)$ với $u_n = 1 + \\dfrac{1}{n}$. Chọn tất cả các khẳng định đúng.',
      options: [
        'Dãy số giảm.',
        'Dãy số tăng.',
        'Dãy số bị chặn trên bởi $2$.',
        'Dãy số bị chặn dưới bởi $1$.',
        'Dãy số không bị chặn.',
      ],
      answers: [0, 2, 3],
      hints: ['Tính $u_{n+1} - u_n$.', 'Với mọi $n \\ge 1$ thì $0 < \\dfrac{1}{n} \\le 1$.'],
      solution:
        '$u_{n+1} - u_n = \\dfrac{1}{n + 1} - \\dfrac{1}{n} = -\\dfrac{1}{n(n + 1)} < 0$, nên dãy giảm. Vì $0 < \\dfrac{1}{n} \\le 1$ nên $1 < u_n \\le 2$: dãy bị chặn trên bởi $2$, bị chặn dưới bởi $1$, tức là dãy bị chặn.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng về dãy số $u_n = (-1)^n$?',
      options: [
        'Dãy số không tăng, không giảm và bị chặn.',
        'Dãy số tăng và bị chặn.',
        'Dãy số giảm và không bị chặn.',
        'Dãy số không tăng, không giảm và không bị chặn.',
      ],
      answer: 0,
      hints: ['Viết vài số hạng đầu: $-1, 1, -1, 1, \\ldots$'],
      solution:
        'Ta có $u_2 > u_1$ nhưng $u_3 < u_2$, nên dãy không tăng cũng không giảm. Mọi số hạng đều bằng $1$ hoặc $-1$, nên $-1 \\le u_n \\le 1$: dãy bị chặn.',
    },
    {
      type: 'number',
      prompt:
        'Cho dãy số $(u_n)$ với $u_n = n^2 - 6n$. Tìm số $m$ lớn nhất sao cho $u_n \\ge m$ với mọi $n \\in \\mathbb{N}^*$ (tức là số hạng nhỏ nhất của dãy).',
      answer: -9,
      hints: ['Viết $u_n = (n - 3)^2 - 9$.', 'Bình phương nhỏ nhất khi $n = 3$.'],
      solution:
        '$u_n = (n - 3)^2 - 9 \\ge -9$, dấu bằng khi $n = 3$ ($u_3 = 9 - 18 = -9$). Vậy dãy bị chặn dưới và số hạng nhỏ nhất là $-9$.',
    },
    {
      type: 'number',
      prompt:
        'Số que diêm cần để xếp $n$ hình vuông liền nhau thành một hàng là $u_n$, với $u_1 = 4$, $u_2 = 7$, $u_3 = 10$. Mỗi hình vuông thêm vào cần thêm $3$ que. Tính $u_{20}$.',
      answer: 61,
      hints: ['$u_n = u_{n-1} + 3$, nên $u_n = 4 + 3(n - 1)$.', 'Thay $n = 20$.'],
      solution: '$u_n = 4 + 3(n - 1) = 3n + 1$, nên $u_{20} = 3 \\cdot 20 + 1 = 61$.',
    },
  ],
  takeaways: [
    'Dãy số là hàm số xác định trên $\\mathbb{N}^*$ (dãy vô hạn) hoặc trên $\\{1; 2; \\ldots; m\\}$ (dãy hữu hạn); kí hiệu $(u_n)$.',
    'Có bốn cách cho dãy số: liệt kê, công thức số hạng tổng quát, mô tả bằng lời, hệ thức truy hồi.',
    'Dãy tăng: $u_{n+1} > u_n$ với mọi $n$; dãy giảm: $u_{n+1} < u_n$ với mọi $n$. Thường xét dấu của $u_{n+1} - u_n$.',
    'Dãy bị chặn khi có $m$, $M$ sao cho $m \\le u_n \\le M$ với mọi $n$.',
  ],
};
