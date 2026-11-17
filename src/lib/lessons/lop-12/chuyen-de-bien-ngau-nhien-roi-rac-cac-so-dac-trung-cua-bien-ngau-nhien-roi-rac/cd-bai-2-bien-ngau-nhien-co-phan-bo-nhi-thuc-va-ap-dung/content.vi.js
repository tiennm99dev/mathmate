/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép thử Bernoulli, biến ngẫu nhiên có phân bố nhị thức B(n; p) với công thức P(X = k) = C(n, k)p^k(1 − p)^(n − k), kì vọng np, phương sai np(1 − p) và các bài toán áp dụng.',
  intro:
    'Một học sinh đoán bừa cả $10$ câu trắc nghiệm, mỗi câu có $4$ phương án. Xác suất đúng đúng $3$ câu là bao nhiêu, và trung bình đoán đúng mấy câu? Mỗi câu là một phép thử chỉ có hai kết quả, lặp lại độc lập: số câu đúng là một biến ngẫu nhiên có phân bố nhị thức, và mọi câu hỏi trên đều có công thức trả lời.',
  objectives: [
    'Nhận biết phép thử Bernoulli và dãy phép thử Bernoulli độc lập.',
    'Nhận biết biến ngẫu nhiên có phân bố nhị thức $B(n; p)$ và tính $P(X = k) = C_n^kp^k(1 - p)^{n-k}$.',
    'Tính kì vọng $E(X) = np$, phương sai $V(X) = np(1 - p)$ và áp dụng vào các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Phép thử Bernoulli',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép thử Bernoulli',
          text: 'Phép thử Bernoulli là phép thử chỉ có hai kết quả: biến cố $A$ xảy ra (gọi là "thành công") hoặc không xảy ra ("thất bại"). Nếu $P(A) = p$ thì $P(\\overline{A}) = 1 - p$.',
        },
        {
          type: 'list',
          items: [
            'Gieo một đồng xu: $A$ là "xuất hiện mặt ngửa", $p = 0{,}5$.',
            'Chọn bừa một phương án của câu trắc nghiệm có $4$ phương án: $A$ là "chọn đúng", $p = 0{,}25$.',
            'Kiểm tra một sản phẩm: $A$ là "sản phẩm bị lỗi".',
          ],
        },
        {
          type: 'p',
          text: 'Lặp lại một phép thử Bernoulli $n$ lần sao cho kết quả của các lần thử độc lập với nhau và xác suất thành công ở mỗi lần đều là $p$, ta được một dãy $n$ phép thử Bernoulli độc lập.',
        },
      ],
    },
    {
      heading: 'Phân bố nhị thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân bố nhị thức',
          text: 'Xét dãy $n$ phép thử Bernoulli độc lập với xác suất thành công $p$. Gọi $X$ là số lần thành công. Khi đó $X$ nhận các giá trị $0, 1, \\dots, n$ và $$P(X = k) = C_n^kp^k(1 - p)^{n-k}$$ với $k = 0, 1, \\dots, n$. Ta nói $X$ có phân bố nhị thức với tham số $n$ và $p$, kí hiệu $X \\sim B(n; p)$.',
        },
        {
          type: 'p',
          text: 'Giải thích: một dãy kết quả có đúng $k$ lần thành công và $n - k$ lần thất bại có xác suất $p^k(1 - p)^{n-k}$ (quy tắc nhân cho các biến cố độc lập). Có $C_n^k$ cách chọn $k$ lần thành công trong $n$ lần thử, nên ta nhân thêm $C_n^k$.',
        },
        {
          type: 'p',
          text: 'Các xác suất $P(X = k)$ chính là các số hạng trong khai triển nhị thức Newton $(p + (1 - p))^n = 1$; đó là lí do có tên "phân bố nhị thức" và tổng của chúng bằng $1$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biến cố "ít nhất một lần"',
          text: 'Với $X \\sim B(n; p)$: $P(X \\ge 1) = 1 - P(X = 0) = 1 - (1 - p)^n$.',
        },
      ],
    },
    {
      heading: 'Kì vọng và phương sai của phân bố nhị thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kì vọng và phương sai',
          text: 'Nếu $X \\sim B(n; p)$ thì $$\\begin{aligned} E(X) &= np, \\\\ V(X) &= np(1 - p), \\\\ \\sigma(X) &= \\sqrt{np(1 - p)}. \\end{aligned}$$',
        },
        {
          type: 'p',
          text: 'Chẳng hạn với $n = 2$: $X$ nhận $0, 1, 2$ với xác suất $(1 - p)^2$, $2p(1 - p)$, $p^2$, nên $E(X) = 2p(1 - p) + 2p^2 = 2p$ và $V(X) = 2p(1 - p) + 4p^2 - 4p^2 = 2p(1 - p)$, đúng với công thức.',
        },
        {
          type: 'p',
          text: 'Ý nghĩa: trong $n$ lần thử, số lần thành công trung bình là $np$. Bảng Galton minh hoạ điều này: mỗi viên bi qua $n$ hàng đinh, mỗi lần rẽ phải với xác suất $p$, nên ô mà viên bi rơi vào (số lần rẽ phải) có phân bố $B(n; p)$.',
        },
      ],
    },
    {
      heading: 'Dự án: Bảng Galton tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm chứng bằng thực nghiệm rằng số lần thành công trong $n$ phép thử Bernoulli độc lập có phân bố nhị thức, và trung bình số lần thành công gần $np$.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: một đồng xu (hoặc một tấm gỗ cắm đinh làm bảng Galton và các viên bi nhỏ), bảng ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mỗi lượt gieo đồng xu $6$ lần, ghi số lần xuất hiện mặt ngửa $X$ (hoặc thả một viên bi qua bảng Galton $6$ hàng đinh, ghi ô bi rơi vào).',
            'Cả nhóm thực hiện ít nhất $100$ lượt, lập bảng tần số và tần suất của $X$.',
            'Tính các xác suất $P(X = k)$ của phân bố $B(6; 0{,}5)$ và so sánh với tần suất.',
            'Tính trung bình số lần mặt ngửa của mẫu số liệu và so sánh với $E(X) = 3$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu, biểu đồ tần suất vẽ chồng với các xác suất lí thuyết và nhận xét.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng Galton và phân bố nhị thức',
    instruction:
      'Chọn số hàng đinh $n$ và xác suất rẽ phải $p$, rồi thả bi. Cột xanh là tần suất bi rơi vào ô $k$, vạch tím là xác suất $P(X = k)$ của $B(n; p)$. Thả càng nhiều bi, các cột càng khớp với các vạch.',
  },
  examples: [
    {
      problem:
        'Một bài kiểm tra có $10$ câu trắc nghiệm, mỗi câu có $4$ phương án, chỉ một phương án đúng. Một học sinh chọn ngẫu nhiên phương án ở tất cả các câu. Gọi $X$ là số câu trả lời đúng. Tính $P(X = 3)$, $E(X)$ và $V(X)$.',
      steps: [
        'Mỗi câu là một phép thử Bernoulli với xác suất thành công $p = 0{,}25$, các câu độc lập. Vậy $X \\sim B(10; 0{,}25)$.',
        '$P(X = 3) = C_{10}^3 \\cdot 0{,}25^3 \\cdot 0{,}75^7 = 120 \\cdot 0{,}25^3 \\cdot 0{,}75^7 \\approx 0{,}2503$.',
        '$E(X) = np = 10 \\cdot 0{,}25 = 2{,}5$; $V(X) = np(1 - p) = 10 \\cdot 0{,}25 \\cdot 0{,}75 = 1{,}875$.',
      ],
      answer: '$P(X = 3) \\approx 0{,}2503$; $E(X) = 2{,}5$; $V(X) = 1{,}875$.',
    },
    {
      problem:
        'Một xạ thủ bắn $5$ viên đạn vào bia, xác suất trúng của mỗi viên là $0{,}8$, độc lập với nhau. Tính xác suất có ít nhất $4$ viên trúng bia và xác suất có ít nhất một viên trúng bia.',
      steps: [
        'Gọi $X$ là số viên trúng: $X \\sim B(5; 0{,}8)$.',
        '$P(X = 4) = C_5^4 \\cdot 0{,}8^4 \\cdot 0{,}2 = 0{,}4096$; $P(X = 5) = 0{,}8^5 = 0{,}32768$.',
        '$P(X \\ge 4) = 0{,}4096 + 0{,}32768 = 0{,}73728$.',
        '$P(X \\ge 1) = 1 - P(X = 0) = 1 - 0{,}2^5 = 0{,}99968$.',
      ],
      answer: '$P(X \\ge 4) = 0{,}73728$ và $P(X \\ge 1) = 0{,}99968$.',
    },
    {
      problem:
        'Tỉ lệ phế phẩm của một dây chuyền là $5\\%$. Lấy ngẫu nhiên $20$ sản phẩm (coi các lần lấy là độc lập). Tính số phế phẩm trung bình và độ lệch chuẩn của số phế phẩm.',
      steps: [
        'Số phế phẩm $X \\sim B(20; 0{,}05)$.',
        '$E(X) = 20 \\cdot 0{,}05 = 1$.',
        '$V(X) = 20 \\cdot 0{,}05 \\cdot 0{,}95 = 0{,}95$, nên $\\sigma(X) = \\sqrt{0{,}95} \\approx 0{,}97$.',
      ],
      answer: 'Trung bình có $1$ phế phẩm; $\\sigma(X) \\approx 0{,}97$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Gieo một đồng xu cân đối $6$ lần. Tính xác suất mặt ngửa xuất hiện đúng $2$ lần (viết dưới dạng phân số tối giản).',
      answer: [15, 64],
      simplest: true,
      hints: [
        'Số lần mặt ngửa $X \\sim B(6; 0{,}5)$.',
        '$P(X = 2) = C_6^2 \\cdot 0{,}5^2 \\cdot 0{,}5^4$.',
      ],
      solution: '$P(X = 2) = C_6^2 \\cdot \\left(\\dfrac{1}{2}\\right)^6 = \\dfrac{15}{64}$.',
    },
    {
      type: 'number',
      prompt: 'Biến ngẫu nhiên $X \\sim B(10; 0{,}3)$. Tính $V(X)$.',
      answer: 2.1,
      hints: ['$V(X) = np(1 - p)$.'],
      solution: '$V(X) = 10 \\cdot 0{,}3 \\cdot 0{,}7 = 2{,}1$.',
    },
    {
      type: 'number',
      prompt:
        'Xác suất một bóng đèn bị hỏng trong năm đầu là $0{,}2$. Một nhà lắp $4$ bóng đèn, các bóng hỏng độc lập. Tính xác suất không có bóng nào hỏng trong năm đầu.',
      answer: 0.4096,
      hints: ['Số bóng hỏng $X \\sim B(4; 0{,}2)$; tính $P(X = 0)$.'],
      solution: '$P(X = 0) = C_4^0 \\cdot 0{,}2^0 \\cdot 0{,}8^4 = 0{,}4096$.',
    },
    {
      type: 'number',
      prompt: 'Với bốn bóng đèn ở câu trên, tính xác suất có ít nhất một bóng hỏng trong năm đầu.',
      answer: 0.5904,
      hints: ['Biến cố "ít nhất một bóng hỏng" là biến cố đối của "không bóng nào hỏng".'],
      solution: '$P(X \\ge 1) = 1 - P(X = 0) = 1 - 0{,}4096 = 0{,}5904$.',
    },
    {
      type: 'number',
      prompt:
        'Xác suất nảy mầm của mỗi hạt giống là $0{,}9$. Gieo $5$ hạt, các hạt nảy mầm độc lập. Tính xác suất có đúng $4$ hạt nảy mầm (làm tròn đến hàng phần nghìn).',
      answer: 0.328,
      tolerance: 0.0005,
      hints: [
        'Số hạt nảy mầm $X \\sim B(5; 0{,}9)$.',
        '$P(X = 4) = C_5^4 \\cdot 0{,}9^4 \\cdot 0{,}1$.',
      ],
      solution: '$P(X = 4) = 5 \\cdot 0{,}6561 \\cdot 0{,}1 = 0{,}32805 \\approx 0{,}328$.',
    },
    {
      type: 'number',
      prompt:
        'Biến ngẫu nhiên $X$ có phân bố nhị thức $B(n; p)$ với $E(X) = 4$ và $V(X) = 2{,}4$. Tìm $n$.',
      answer: 10,
      hints: ['Chia $V(X)$ cho $E(X)$ để được $1 - p$.'],
      solution:
        '$\\dfrac{V(X)}{E(X)} = 1 - p = 0{,}6$, nên $p = 0{,}4$ và $n = \\dfrac{4}{0{,}4} = 10$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một học sinh chọn ngẫu nhiên phương án cho $4$ câu trắc nghiệm, mỗi câu có $4$ phương án và chỉ một phương án đúng. Tính xác suất học sinh đó trả lời đúng cả $4$ câu.',
      answer: [1, 256],
      hints: ['Số câu đúng $X \\sim B(4; 0{,}25)$; tính $P(X = 4)$.'],
      solution: '$P(X = 4) = C_4^4 \\cdot \\left(\\dfrac{1}{4}\\right)^4 = \\dfrac{1}{256}$.',
    },
    {
      type: 'choice',
      prompt: 'Trong các biến ngẫu nhiên sau, biến ngẫu nhiên nào có phân bố nhị thức?',
      options: [
        'Số lần xuất hiện mặt $6$ chấm khi gieo một con xúc xắc cân đối $10$ lần.',
        'Số quả cầu đỏ khi lấy lần lượt không hoàn lại $3$ quả từ hộp có $5$ quả đỏ và $5$ quả xanh.',
        'Số lần gieo một đồng xu cho đến khi xuất hiện mặt ngửa lần đầu.',
        'Tổng số chấm khi gieo hai con xúc xắc.',
      ],
      answer: 0,
      hints: [
        'Cần một số cố định $n$ lần thử độc lập, mỗi lần chỉ xét thành công hay thất bại với cùng xác suất $p$, và đếm số lần thành công.',
      ],
      solution:
        'Số lần ra mặt $6$ chấm trong $10$ lần gieo là $B\\left(10; \\dfrac{1}{6}\\right)$. Lấy không hoàn lại thì các lần lấy không độc lập và xác suất thay đổi; số lần gieo đến khi có mặt ngửa không có số lần thử cố định; tổng số chấm không phải là số lần thành công.',
    },
    {
      type: 'number',
      prompt:
        'Một cầu thủ sút $50$ quả phạt đền, xác suất sút hỏng mỗi quả là $0{,}1$, các quả độc lập với nhau. Tính độ lệch chuẩn của số quả sút hỏng (làm tròn đến hàng phần trăm).',
      answer: 2.12,
      tolerance: 0.005,
      hints: ['Số quả sút hỏng $X \\sim B(50; 0{,}1)$.', '$\\sigma(X) = \\sqrt{np(1 - p)}$.'],
      solution:
        '$V(X) = 50 \\cdot 0{,}1 \\cdot 0{,}9 = 4{,}5$, nên $\\sigma(X) = \\sqrt{4{,}5} \\approx 2{,}12$.',
    },
  ],
  takeaways: [
    'Phép thử Bernoulli chỉ có hai kết quả: thành công với xác suất $p$, thất bại với xác suất $1 - p$.',
    'Số lần thành công $X$ trong $n$ phép thử Bernoulli độc lập có phân bố nhị thức $B(n; p)$: $P(X = k) = C_n^kp^k(1 - p)^{n-k}$.',
    '$E(X) = np$, $V(X) = np(1 - p)$; $P(X \\ge 1) = 1 - (1 - p)^n$.',
  ],
};
