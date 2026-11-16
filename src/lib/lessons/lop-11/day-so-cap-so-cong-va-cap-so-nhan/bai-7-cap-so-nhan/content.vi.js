/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cấp số nhân: định nghĩa, công bội, tính chất của ba số hạng liên tiếp, công thức số hạng tổng quát và tổng n số hạng đầu, với các bài toán gấp giấy, vi khuẩn và lãi kép.',
  intro:
    'Tương truyền, người phát minh ra bàn cờ vua xin nhà vua thưởng thóc: ô thứ nhất $1$ hạt, ô thứ hai $2$ hạt, ô thứ ba $4$ hạt, cứ thế ô sau gấp đôi ô trước cho đến ô thứ $64$. Nghe thì ít, nhưng cả kho thóc của nhà vua cũng không đủ. Số hạt thóc trên các ô là một cấp số nhân; bài này cho cách tính số hạng thứ $n$ và tổng của $n$ số hạng đầu của nó.',
  objectives: [
    'Nhận biết cấp số nhân và xác định công bội.',
    'Dùng công thức số hạng tổng quát $u_n = u_1 q^{n-1}$ để tìm một số hạng, số hạng đầu hoặc công bội.',
    'Tính tổng $n$ số hạng đầu của cấp số nhân và giải các bài toán tăng trưởng thực tế.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cấp số nhân',
          text: 'Cấp số nhân là một dãy số (hữu hạn hoặc vô hạn), trong đó kể từ số hạng thứ hai, mỗi số hạng đều là tích của số hạng đứng ngay trước nó với một số $q$ không đổi, tức là $u_n = u_{n-1} \\cdot q$ với $n \\ge 2$. Số $q$ được gọi là công bội của cấp số nhân.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, dãy $3, 6, 12, 24, 48$ là cấp số nhân với $u_1 = 3$, $q = 2$; dãy $1, -\\dfrac{1}{2}, \\dfrac{1}{4}, -\\dfrac{1}{8}$ là cấp số nhân với $q = -\\dfrac{1}{2}$. Khi các số hạng khác $0$, công bội là tỉ số $q = \\dfrac{u_n}{u_{n-1}}$ không đổi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Nếu $(u_n)$ là cấp số nhân thì kể từ số hạng thứ hai, bình phương của mỗi số hạng (trừ số hạng cuối đối với cấp số nhân hữu hạn) bằng tích của hai số hạng đứng kề với nó: $u_k^2 = u_{k-1} \\cdot u_{k+1}$ với $k \\ge 2$.',
        },
      ],
    },
    {
      heading: 'Số hạng tổng quát',
      blocks: [
        {
          type: 'p',
          text: 'Từ $u_1$, mỗi bước ta nhân thêm $q$: $u_2 = u_1 q$, $u_3 = u_1 q^2$, $u_4 = u_1 q^3$, … Để đến $u_n$ cần $n - 1$ lần nhân.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu cấp số nhân $(u_n)$ có số hạng đầu $u_1$ và công bội $q$ thì số hạng tổng quát của nó là $u_n = u_1 \\cdot q^{n-1}$ với $n \\ge 2$.',
        },
        {
          type: 'p',
          text: 'Với $q > 1$ và $u_1 > 0$, các số hạng tăng rất nhanh (tăng theo cấp số nhân); với $0 < q < 1$ chúng nhỏ dần về gần $0$; với $q < 0$ các số hạng đổi dấu liên tiếp.',
        },
      ],
    },
    {
      heading: 'Tổng n số hạng đầu của cấp số nhân',
      blocks: [
        {
          type: 'p',
          text: 'Đặt $S_n = u_1 + u_1 q + u_1 q^2 + \\cdots + u_1 q^{n-1}$. Nhân hai vế với $q$ rồi trừ, các số hạng ở giữa triệt tiêu:',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned} S_n &= u_1 + u_1 q + \\cdots + u_1 q^{n-1} \\\\ qS_n &= u_1 q + \\cdots + u_1 q^{n-1} + u_1 q^n \\\\ S_n - qS_n &= u_1 - u_1 q^n. \\end{aligned}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Cho cấp số nhân $(u_n)$ với công bội $q \\ne 1$. Đặt $S_n = u_1 + u_2 + \\cdots + u_n$. Khi đó $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu $q = 1$ thì cấp số nhân là $u_1, u_1, u_1, \\ldots$ và $S_n = n u_1$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gấp giấy, vi khuẩn và biểu đồ tăng theo cấp số nhân',
    instruction:
      'Chọn một tình huống và bấm "Thêm một bước": số lớp giấy hay số vi khuẩn mỗi bước gấp đôi. Quan sát các cột vọt lên rất nhanh và tỉ số hai số hạng liên tiếp luôn bằng công bội $q$. Ở "Tự chọn", thử $q = \\dfrac{1}{2}$ và $q < 0$ để thấy dãy nhỏ dần hoặc đổi dấu.',
  },
  examples: [
    {
      problem:
        'Cho cấp số nhân $(u_n)$ có $u_1 = 3$ và $q = -2$. Tìm số hạng tổng quát, tính $u_6$ và cho biết $192$ là số hạng thứ mấy.',
      steps: [
        '$u_n = u_1 q^{n-1} = 3 \\cdot (-2)^{n-1}$.',
        '$u_6 = 3 \\cdot (-2)^5 = 3 \\cdot (-32) = -96$.',
        'Giải $3 \\cdot (-2)^{n-1} = 192$: $(-2)^{n-1} = 64 = (-2)^6$, nên $n - 1 = 6$, $n = 7$.',
      ],
      answer: '$u_n = 3 \\cdot (-2)^{n-1}$, $u_6 = -96$; $192$ là số hạng thứ $7$.',
    },
    {
      problem: 'Tìm số hạng đầu và công bội của cấp số nhân $(u_n)$ biết $u_2 = 6$ và $u_5 = 162$.',
      steps: [
        '$u_2 = u_1 q = 6$ và $u_5 = u_1 q^4 = 162$.',
        'Chia vế theo vế: $q^3 = \\dfrac{162}{6} = 27$, nên $q = 3$.',
        '$u_1 = \\dfrac{6}{3} = 2$.',
      ],
      answer: '$u_1 = 2$, $q = 3$.',
    },
    {
      problem:
        'Bác An gửi $100$ triệu đồng vào ngân hàng, kì hạn $1$ năm, lãi suất $6\\%$ một năm; hết mỗi kì, tiền lãi được nhập vào gốc (lãi kép). Tính số tiền bác có sau $5$ năm, làm tròn đến hàng phần trăm của triệu đồng.',
      steps: [
        'Sau mỗi năm, số tiền được nhân với $1 + 6\\% = 1{,}06$. Gọi $u_n$ là số tiền sau $n$ năm: $(u_n)$ là cấp số nhân với $u_1 = 100 \\cdot 1{,}06 = 106$, $q = 1{,}06$.',
        '$u_5 = u_1 q^4 = 106 \\cdot 1{,}06^4 = 100 \\cdot 1{,}06^5 \\approx 133{,}82$.',
      ],
      answer: 'Khoảng $133{,}82$ triệu đồng.',
    },
    {
      problem: 'Tính số hạt thóc trên $10$ ô đầu tiên của bàn cờ ở phần mở đầu.',
      steps: [
        'Số hạt trên các ô là cấp số nhân với $u_1 = 1$, $q = 2$.',
        '$S_{10} = \\dfrac{1 \\cdot (1 - 2^{10})}{1 - 2} = 2^{10} - 1 = 1\\,023$.',
      ],
      answer: '$1\\,023$ hạt. Cả $64$ ô có $2^{64} - 1$ hạt, một số có $20$ chữ số.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dãy số hữu hạn nào sau đây là một cấp số nhân?',
      options: ['$2, 6, 18, 54$', '$1, 3, 5, 7$', '$1, 4, 9, 16$', '$2, 4, 8, 14$'],
      answer: 0,
      hints: ['Tính tỉ số của hai số hạng liên tiếp trong mỗi dãy.'],
      solution:
        'Dãy $2, 6, 18, 54$ có tỉ số không đổi bằng $3$. Dãy $1, 3, 5, 7$ là cấp số cộng; dãy $1, 4, 9, 16$ có tỉ số $4$ rồi $\\dfrac{9}{4}$; dãy $2, 4, 8, 14$ có tỉ số $2, 2$ rồi $\\dfrac{7}{4}$.',
    },
    {
      type: 'number',
      prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 5$ và $q = 2$. Tính $u_6$.',
      answer: 160,
      hints: ['Dùng $u_n = u_1 q^{n-1}$ với $n = 6$.'],
      solution: '$u_6 = 5 \\cdot 2^5 = 5 \\cdot 32 = 160$.',
    },
    {
      type: 'fraction',
      prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 4$ và $q = -\\dfrac{1}{2}$. Tính $u_5$.',
      answer: [1, 4],
      hints: ['$u_5 = u_1 q^4$.', 'Luỹ thừa bậc chẵn của một số âm là số dương.'],
      solution:
        '$u_5 = 4 \\cdot \\left(-\\dfrac{1}{2}\\right)^4 = 4 \\cdot \\dfrac{1}{16} = \\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Biết ba số $2$, $x$, $18$ theo thứ tự đó lập thành một cấp số nhân và $x > 0$. Tìm $x$.',
      answer: 6,
      hints: ['Dùng nhận xét $u_2^2 = u_1 \\cdot u_3$.'],
      solution: '$x^2 = 2 \\cdot 18 = 36$, mà $x > 0$ nên $x = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng $8$ số hạng đầu của cấp số nhân $1, 3, 9, 27, \\ldots$',
      answer: 3280,
      hints: [
        '$u_1 = 1$, $q = 3$.',
        'Dùng $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$ và $3^8 = 6\\,561$.',
      ],
      solution:
        '$S_8 = \\dfrac{1 \\cdot (1 - 3^8)}{1 - 3} = \\dfrac{3^8 - 1}{2} = \\dfrac{6\\,560}{2} = 3\\,280$.',
    },
    {
      type: 'number',
      prompt: 'Cấp số nhân $(u_n)$ có $u_2 = 6$ và $u_5 = 48$. Tính tổng $6$ số hạng đầu $S_6$.',
      answer: 189,
      hints: ['Chia $u_5$ cho $u_2$ để được $q^3$.', 'Tìm $q$, $u_1$ rồi dùng công thức tổng.'],
      solution:
        '$q^3 = \\dfrac{48}{6} = 8$ nên $q = 2$ và $u_1 = 3$. Vậy $S_6 = \\dfrac{3(1 - 2^6)}{1 - 2} = 3 \\cdot 63 = 189$.',
    },
    {
      type: 'number',
      prompt:
        'Ban đầu có $500$ con vi khuẩn, cứ sau $20$ phút số lượng tăng gấp đôi. Sau $2$ giờ có bao nhiêu con vi khuẩn?',
      answer: 32000,
      unit: 'con',
      hints: [
        '$2$ giờ gồm bao nhiêu lần $20$ phút?',
        'Sau $6$ lần nhân đôi, số vi khuẩn là $500 \\cdot 2^6$.',
      ],
      solution:
        '$2$ giờ $= 120$ phút, gồm $6$ lần nhân đôi. Số vi khuẩn là $500 \\cdot 2^6 = 32\\,000$ con.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng, kì hạn $1$ năm, lãi suất $7\\%$ một năm theo hình thức lãi kép. Sau $3$ năm có bao nhiêu triệu đồng? (Làm tròn đến hàng phần trăm.)',
      answer: 122.5,
      tolerance: 0.006,
      unit: 'triệu đồng',
      hints: ['Mỗi năm số tiền được nhân với $1{,}07$.', 'Tính $100 \\cdot 1{,}07^3$.'],
      solution: '$100 \\cdot 1{,}07^3 = 100 \\cdot 1{,}225043 \\approx 122{,}50$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt: 'Cho cấp số nhân có $u_1 = 2$ và $q = 1$. Tổng $S_{10}$ bằng bao nhiêu?',
      options: ['$20$', '$0$', '$2$', 'Không tính được vì $1 - q = 0$'],
      answer: 0,
      hints: ['Khi $q = 1$, mọi số hạng đều bằng $u_1$.'],
      solution:
        'Với $q = 1$ không dùng được công thức $\\dfrac{u_1(1 - q^n)}{1 - q}$; dãy là $2, 2, 2, \\ldots$ nên $S_{10} = 10 \\cdot 2 = 20$.',
    },
  ],
  takeaways: [
    'Cấp số nhân: $u_n = u_{n-1} \\cdot q$ $(n \\ge 2)$; $q$ là công bội.',
    'Ba số hạng liên tiếp: $u_k^2 = u_{k-1} \\cdot u_{k+1}$.',
    'Số hạng tổng quát: $u_n = u_1 q^{n-1}$.',
    'Tổng $n$ số hạng đầu: $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$ khi $q \\ne 1$; $S_n = n u_1$ khi $q = 1$.',
  ],
};
