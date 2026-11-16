/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cấp số cộng: định nghĩa, công sai, tính chất trung bình cộng của ba số hạng liên tiếp, công thức số hạng tổng quát và tổng n số hạng đầu tính bằng cách ghép đôi của Gauss.',
  intro:
    'Một chiếc thang gỗ có $8$ bậc, bậc dưới cùng dài $45$ cm, mỗi bậc phía trên ngắn hơn bậc ngay dưới nó $2$ cm. Cần một thanh gỗ dài bao nhiêu để cắt ra đủ các bậc? Độ dài các bậc $45, 43, 41, \\ldots$ tạo thành một cấp số cộng, và bài này cho cách tính nhanh tổng của chúng mà không cần cộng từng số.',
  objectives: [
    'Nhận biết cấp số cộng và xác định công sai.',
    'Dùng công thức số hạng tổng quát $u_n = u_1 + (n - 1)d$ để tìm một số hạng, số hạng đầu hoặc công sai.',
    'Tính tổng $n$ số hạng đầu của cấp số cộng và giải các bài toán thực tế liên quan.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cấp số cộng',
          text: 'Cấp số cộng là một dãy số (hữu hạn hoặc vô hạn), trong đó kể từ số hạng thứ hai, mỗi số hạng đều bằng số hạng đứng ngay trước nó cộng với một số $d$ không đổi, tức là $u_n = u_{n-1} + d$ với $n \\ge 2$. Số $d$ được gọi là công sai của cấp số cộng.',
        },
        {
          type: 'p',
          text: 'Như vậy $d = u_n - u_{n-1}$: muốn kiểm tra một dãy có là cấp số cộng không, ta xét hiệu hai số hạng liên tiếp có không đổi hay không. Chẳng hạn, dãy $2, 5, 8, 11, 14$ là cấp số cộng với $u_1 = 2$, $d = 3$; dãy $10, 6, 2, -2$ là cấp số cộng với công sai $d = -4$. Khi $d = 0$, mọi số hạng bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Nếu $(u_n)$ là cấp số cộng thì kể từ số hạng thứ hai, mỗi số hạng (trừ số hạng cuối đối với cấp số cộng hữu hạn) đều là trung bình cộng của hai số hạng đứng kề với nó: $u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}$ với $k \\ge 2$.',
        },
      ],
    },
    {
      heading: 'Số hạng tổng quát',
      blocks: [
        {
          type: 'p',
          text: 'Từ $u_1$, mỗi bước ta cộng thêm $d$: $u_2 = u_1 + d$, $u_3 = u_1 + 2d$, $u_4 = u_1 + 3d$, … Để đến $u_n$ cần $n - 1$ bước.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu cấp số cộng $(u_n)$ có số hạng đầu $u_1$ và công sai $d$ thì số hạng tổng quát của nó là $u_n = u_1 + (n - 1)d$ với $n \\ge 2$.',
        },
        {
          type: 'p',
          text: 'Công thức này có bốn đại lượng $u_1$, $d$, $n$, $u_n$: biết ba đại lượng thì tìm được đại lượng còn lại. Biết hai số hạng bất kì, ta lập hệ hai phương trình ẩn $u_1$ và $d$.',
        },
      ],
    },
    {
      heading: 'Tổng n số hạng đầu của cấp số cộng',
      blocks: [
        {
          type: 'p',
          text: 'Tương truyền, cậu bé Gauss tính $1 + 2 + \\cdots + 100$ bằng cách ghép số đầu với số cuối: $1 + 100 = 2 + 99 = \\cdots = 101$, có $50$ cặp như vậy nên tổng là $5\\,050$. Với một cấp số cộng bất kì, viết tổng $S_n$ theo hai chiều rồi cộng lại:',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} S_n &= u_1 + u_2 + \\cdots + u_n \\\\ S_n &= u_n + u_{n-1} + \\cdots + u_1 \\\\ 2S_n &= (u_1 + u_n) + (u_2 + u_{n-1}) + \\cdots + (u_n + u_1) = n(u_1 + u_n). \\end{aligned}',
        },
        {
          type: 'p',
          text: 'Mỗi cặp đều bằng $u_1 + u_n$ vì khi đi từ cặp này sang cặp sau, số hạng thứ nhất tăng $d$ còn số hạng thứ hai giảm $d$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Cho cấp số cộng $(u_n)$ có số hạng đầu $u_1$ và công sai $d$. Đặt $S_n = u_1 + u_2 + \\cdots + u_n$. Khi đó $S_n = \\dfrac{n(u_1 + u_n)}{2}$, hay $S_n = \\dfrac{n\\left[2u_1 + (n - 1)d\\right]}{2}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cầu thang khối vuông và cách ghép đôi của Gauss',
    instruction:
      'Chọn số hạng đầu $u_1$, công sai $d$ và số bậc $n$: cột thứ $k$ có $u_k$ khối, mỗi bậc cao hơn bậc trước $d$ khối. Bấm "Ghép bản sao lật ngược" để đặt một cầu thang giống hệt, lộn ngược, lên trên: mọi cột cùng cao $u_1 + u_n$ và ta được một hình chữ nhật gấp đôi tổng. Thử đoán $S_n$ trước rồi kiểm tra.',
  },
  examples: [
    {
      problem:
        'Cho cấp số cộng $(u_n)$ có $u_1 = -3$ và $d = 4$. Tìm số hạng tổng quát, tính $u_{10}$ và cho biết $53$ là số hạng thứ mấy.',
      steps: [
        '$u_n = u_1 + (n - 1)d = -3 + 4(n - 1) = 4n - 7$.',
        '$u_{10} = 4 \\cdot 10 - 7 = 33$.',
        'Giải $4n - 7 = 53$: $4n = 60$, $n = 15$.',
      ],
      answer: '$u_n = 4n - 7$, $u_{10} = 33$; $53$ là số hạng thứ $15$.',
    },
    {
      problem: 'Tìm số hạng đầu và công sai của cấp số cộng $(u_n)$ biết $u_3 = 7$ và $u_8 = 22$.',
      steps: [
        'Theo công thức số hạng tổng quát: $u_3 = u_1 + 2d = 7$ và $u_8 = u_1 + 7d = 22$.',
        'Trừ vế theo vế: $5d = 15$, nên $d = 3$.',
        'Thay lại: $u_1 = 7 - 2 \\cdot 3 = 1$.',
      ],
      answer: '$u_1 = 1$, $d = 3$.',
    },
    {
      problem:
        'Chiếc thang ở phần mở đầu có $8$ bậc, bậc dưới cùng dài $45$ cm, mỗi bậc phía trên ngắn hơn bậc ngay dưới nó $2$ cm. Tính tổng chiều dài các bậc.',
      steps: [
        'Độ dài các bậc tính từ dưới lên là cấp số cộng với $u_1 = 45$, $d = -2$, $n = 8$.',
        'Bậc trên cùng dài $u_8 = 45 + 7 \\cdot (-2) = 31$ (cm).',
        '$S_8 = \\dfrac{8(u_1 + u_8)}{2} = \\dfrac{8(45 + 31)}{2} = 304$ (cm).',
      ],
      answer: 'Cần thanh gỗ dài ít nhất $304$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dãy số hữu hạn nào sau đây là một cấp số cộng?',
      options: ['$2, 5, 8, 11$', '$1, 4, 9, 16$', '$1, 2, 4, 8$', '$1, 3, 6, 10$'],
      answer: 0,
      hints: [
        'Tính hiệu của hai số hạng liên tiếp trong mỗi dãy.',
        'Cấp số cộng có các hiệu này bằng nhau.',
      ],
      solution:
        'Dãy $2, 5, 8, 11$ có các hiệu đều bằng $3$. Dãy $1, 4, 9, 16$ có hiệu $3, 5, 7$; dãy $1, 2, 4, 8$ có hiệu $1, 2, 4$; dãy $1, 3, 6, 10$ có hiệu $2, 3, 4$: các hiệu thay đổi nên không là cấp số cộng.',
    },
    {
      type: 'number',
      prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = 5$ và công sai $d = -3$. Tính $u_{15}$.',
      answer: -37,
      hints: ['Dùng $u_n = u_1 + (n - 1)d$ với $n = 15$.'],
      solution: '$u_{15} = 5 + 14 \\cdot (-3) = 5 - 42 = -37$.',
    },
    {
      type: 'number',
      prompt: 'Cấp số cộng $(u_n)$ có $u_2 = 4$ và $u_5 = 13$. Tính $u_{20}$.',
      answer: 58,
      hints: [
        'Từ $u_2$ đến $u_5$ có ba lần cộng công sai: $u_5 - u_2 = 3d$.',
        'Tìm $d$ rồi $u_1 = u_2 - d$.',
      ],
      solution:
        '$3d = 13 - 4 = 9$, nên $d = 3$ và $u_1 = 4 - 3 = 1$. Vậy $u_{20} = 1 + 19 \\cdot 3 = 58$.',
    },
    {
      type: 'number',
      prompt: 'Biết ba số $x$, $7$, $12$ theo thứ tự đó lập thành một cấp số cộng. Tìm $x$.',
      answer: 2,
      hints: ['Số hạng ở giữa là trung bình cộng của hai số hạng kề nó.'],
      solution: '$7 = \\dfrac{x + 12}{2}$, nên $x + 12 = 14$ và $x = 2$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng $1 + 2 + 3 + \\cdots + 100$.',
      answer: 5050,
      hints: [
        'Đây là cấp số cộng với $u_1 = 1$, $u_{100} = 100$.',
        'Dùng $S_n = \\dfrac{n(u_1 + u_n)}{2}$.',
      ],
      solution: '$S_{100} = \\dfrac{100(1 + 100)}{2} = 5\\,050$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng $20$ số hạng đầu của cấp số cộng có $u_1 = 3$ và $d = 2$.',
      answer: 440,
      hints: ['Dùng $S_n = \\dfrac{n\\left[2u_1 + (n - 1)d\\right]}{2}$.'],
      solution: '$S_{20} = \\dfrac{20(2 \\cdot 3 + 19 \\cdot 2)}{2} = 10 \\cdot 44 = 440$.',
    },
    {
      type: 'number',
      prompt:
        'Một hội trường có $20$ hàng ghế. Hàng đầu có $15$ ghế, mỗi hàng sau nhiều hơn hàng ngay trước nó $3$ ghế. Hội trường có tất cả bao nhiêu ghế?',
      answer: 870,
      unit: 'ghế',
      hints: ['Số ghế các hàng là cấp số cộng với $u_1 = 15$, $d = 3$, $n = 20$.'],
      solution: '$S_{20} = \\dfrac{20(2 \\cdot 15 + 19 \\cdot 3)}{2} = 10 \\cdot 87 = 870$ ghế.',
    },
    {
      type: 'number',
      prompt:
        'Giá khoan giếng: mét khoan đầu tiên là $80\\,000$ đồng, mỗi mét sau đắt hơn mét ngay trước nó $5\\,000$ đồng. Khoan một giếng sâu $20$ m hết bao nhiêu tiền?',
      answer: 2550000,
      unit: 'đồng',
      hints: ['Giá từng mét là cấp số cộng với $u_1 = 80\\,000$, $d = 5\\,000$.', 'Tính $S_{20}$.'],
      solution:
        '$S_{20} = \\dfrac{20(2 \\cdot 80\\,000 + 19 \\cdot 5\\,000)}{2} = 10 \\cdot 255\\,000 = 2\\,550\\,000$ đồng.',
    },
    {
      type: 'number',
      prompt:
        'Cần lấy tổng của bao nhiêu số hạng đầu của cấp số cộng $1, 3, 5, 7, \\ldots$ để được $225$?',
      answer: 15,
      hints: [
        '$u_1 = 1$, $d = 2$; tính $S_n$ theo $n$.',
        '$S_n = \\dfrac{n(2 + 2(n - 1))}{2} = n^2$.',
      ],
      solution:
        '$S_n = \\dfrac{n\\left[2 \\cdot 1 + (n - 1) \\cdot 2\\right]}{2} = n^2 = 225$, nên $n = 15$.',
    },
  ],
  takeaways: [
    'Cấp số cộng: $u_n = u_{n-1} + d$ $(n \\ge 2)$; công sai $d = u_n - u_{n-1}$ không đổi.',
    'Ba số hạng liên tiếp: $u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}$.',
    'Số hạng tổng quát: $u_n = u_1 + (n - 1)d$.',
    'Tổng $n$ số hạng đầu: $S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n\\left[2u_1 + (n - 1)d\\right]}{2}$.',
  ],
};
