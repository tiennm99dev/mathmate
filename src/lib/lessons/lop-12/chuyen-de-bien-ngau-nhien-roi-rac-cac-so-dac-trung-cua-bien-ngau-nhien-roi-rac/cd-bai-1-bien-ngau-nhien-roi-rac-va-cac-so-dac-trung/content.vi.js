/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biến ngẫu nhiên rời rạc và bảng phân bố xác suất của nó; kì vọng E(X), phương sai V(X), độ lệch chuẩn σ(X) và ý nghĩa của các số đặc trưng này.',
  intro:
    'Số vụ vi phạm giao thông ở một nút giao trong một tối, số câu đúng khi đoán bừa một bài trắc nghiệm, số tiền lãi của một khoản đầu tư: đó là những đại lượng nhận giá trị bằng số nhưng không đoán trước được. Bài này giúp ta mô tả chúng bằng bảng phân bố xác suất và đo "giá trị trung bình", "mức độ rủi ro" của chúng bằng kì vọng, phương sai và độ lệch chuẩn.',
  objectives: [
    'Nhận biết biến ngẫu nhiên rời rạc và lập bảng phân bố xác suất của nó.',
    'Tính kì vọng $E(X)$ và hiểu kì vọng là giá trị trung bình của $X$.',
    'Tính phương sai $V(X)$, độ lệch chuẩn $\\sigma(X)$ và dùng chúng để so sánh mức độ phân tán (rủi ro).',
  ],
  sections: [
    {
      heading: 'Biến ngẫu nhiên rời rạc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến ngẫu nhiên rời rạc',
          text: 'Một đại lượng $X$ được gọi là biến ngẫu nhiên rời rạc nếu nó nhận giá trị bằng số thuộc một tập hữu hạn $\\{x_1; x_2; \\dots; x_n\\}$ và giá trị ấy là ngẫu nhiên, không dự đoán trước được.',
        },
        {
          type: 'p',
          text: 'Biến ngẫu nhiên rời rạc thường được kí hiệu bằng chữ in hoa $X, Y, Z$. Kí hiệu $\\{X = x_k\\}$ là biến cố "$X$ nhận giá trị $x_k$" và $p_k = P(X = x_k)$ là xác suất của biến cố đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bảng phân bố xác suất',
          text: 'Bảng phân bố xác suất của biến ngẫu nhiên rời rạc $X$ ghi các giá trị $x_1, x_2, \\dots, x_n$ của $X$ và các xác suất tương ứng $p_k = P(X = x_k)$, trong đó $p_k \\ge 0$ và $p_1 + p_2 + \\dots + p_n = 1$.',
        },
        {
          type: 'table',
          head: ['$X$', '$x_1$', '$x_2$', '$\\dots$', '$x_n$'],
          rows: [['$P$', '$p_1$', '$p_2$', '$\\dots$', '$p_n$']],
          caption: 'Bảng phân bố xác suất của $X$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: gieo hai đồng xu cân đối, gọi $X$ là số đồng xu xuất hiện mặt sấp. Không gian mẫu có $4$ kết quả đồng khả năng $SS, SN, NS, NN$, nên $P(X = 0) = \\dfrac{1}{4}$, $P(X = 1) = \\dfrac{2}{4} = \\dfrac{1}{2}$, $P(X = 2) = \\dfrac{1}{4}$.',
        },
        {
          type: 'table',
          head: ['$X$', '$0$', '$1$', '$2$'],
          rows: [['$P$', '$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{4}$']],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách lập bảng phân bố xác suất',
          text: 'Bước 1: xác định tập các giá trị $x_1, \\dots, x_n$ mà $X$ có thể nhận. Bước 2: tính xác suất $p_k = P(X = x_k)$ của từng giá trị. Bước 3: kiểm tra $p_1 + \\dots + p_n = 1$ rồi lập bảng.',
        },
      ],
    },
    {
      heading: 'Kì vọng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kì vọng',
          text: 'Kì vọng của biến ngẫu nhiên rời rạc $X$, kí hiệu $E(X)$, là số $$E(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n.$$',
        },
        {
          type: 'list',
          items: [
            'Kì vọng là giá trị trung bình (theo xác suất) của $X$: khi lặp lại phép thử rất nhiều lần, trung bình cộng các giá trị quan sát được của $X$ gần với $E(X)$.',
            '$E(X)$ có cùng đơn vị với $X$ và không nhất thiết là một giá trị của $X$ (chẳng hạn số vụ vi phạm trung bình có thể là $2{,}3$).',
            'Nếu đặt tại mỗi điểm $x_k$ trên trục số một vật nặng $p_k$, thì hệ cân bằng tại điểm $E(X)$, vì $(x_1 - E(X))p_1 + \\dots + (x_n - E(X))p_n = 0$.',
          ],
        },
      ],
    },
    {
      heading: 'Phương sai và độ lệch chuẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương sai, độ lệch chuẩn',
          text: 'Phương sai của $X$, kí hiệu $V(X)$, là $$\\begin{aligned} V(X) &= (x_1 - \\mu)^2p_1 + (x_2 - \\mu)^2p_2 \\\\ &\\quad + \\dots + (x_n - \\mu)^2p_n, \\end{aligned}$$ trong đó $\\mu = E(X)$. Căn bậc hai của phương sai gọi là độ lệch chuẩn: $\\sigma(X) = \\sqrt{V(X)}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính phương sai',
          text: '$$\\begin{aligned} V(X) &= x_1^2p_1 + x_2^2p_2 + \\dots + x_n^2p_n \\\\ &\\quad - [E(X)]^2. \\end{aligned}$$',
        },
        {
          type: 'list',
          items: [
            'Phương sai và độ lệch chuẩn đo mức độ phân tán của các giá trị của $X$ quanh kì vọng: chúng càng lớn thì $X$ càng dễ nhận giá trị xa $E(X)$.',
            'Độ lệch chuẩn có cùng đơn vị với $X$, nên thường được dùng hơn phương sai khi so sánh.',
            'Trong đầu tư, kinh doanh, hai phương án có cùng kì vọng lợi nhuận thì phương án có độ lệch chuẩn nhỏ hơn ít rủi ro hơn.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Kì vọng của tổng số chấm khi gieo hai con xúc xắc',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập bảng phân bố xác suất của tổng số chấm $X$ khi gieo hai con xúc xắc cân đối, tính $E(X)$, $V(X)$ và kiểm chứng bằng thực nghiệm rằng trung bình các kết quả gieo gần với $E(X)$.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: hai con xúc xắc, bảng ghi kết quả (giấy hoặc bảng tính), máy tính cầm tay.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Liệt kê $36$ kết quả đồng khả năng, lập bảng phân bố xác suất của $X$ (các giá trị từ $2$ đến $12$).',
            'Tính $E(X)$, $V(X)$ và $\\sigma(X)$ bằng công thức.',
            'Mỗi thành viên gieo hai con xúc xắc $25$ lần, ghi tổng số chấm; gộp kết quả cả nhóm.',
            'Tính trung bình cộng và độ lệch chuẩn của mẫu số liệu thu được, so sánh với $E(X)$ và $\\sigma(X)$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng phân bố xác suất, các số đặc trưng tính theo lí thuyết, bảng số liệu thực nghiệm và nhận xét về sự gần nhau khi số lần gieo tăng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ phân bố xác suất và điểm cân bằng',
    instruction:
      'Kéo các cột để thay đổi xác suất, giữ tổng bằng $1$. Đường nét đứt cho biết $E(X)$, dải màu là khoảng từ $E(X) - \\sigma(X)$ đến $E(X) + \\sigma(X)$. Kéo điểm tựa màu cam để tìm chỗ cán cân thăng bằng: đó chính là kì vọng.',
  },
  examples: [
    {
      problem:
        'Một hộp có $3$ viên bi đỏ và $2$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Gọi $X$ là số bi đỏ lấy được. Lập bảng phân bố xác suất của $X$ và tính $E(X)$, $V(X)$, $\\sigma(X)$.',
      steps: [
        '$X$ nhận các giá trị $0, 1, 2$. Số cách lấy $2$ viên từ $5$ viên là $C_5^2 = 10$.',
        '$P(X = 0) = \\dfrac{C_2^2}{10} = 0{,}1$; $P(X = 1) = \\dfrac{C_3^1 \\cdot C_2^1}{10} = 0{,}6$; $P(X = 2) = \\dfrac{C_3^2}{10} = 0{,}3$.',
        '$E(X) = 0 \\cdot 0{,}1 + 1 \\cdot 0{,}6 + 2 \\cdot 0{,}3 = 1{,}2$.',
        '$V(X) = 0^2 \\cdot 0{,}1 + 1^2 \\cdot 0{,}6 + 2^2 \\cdot 0{,}3 - 1{,}2^2 = 1{,}8 - 1{,}44 = 0{,}36$, nên $\\sigma(X) = \\sqrt{0{,}36} = 0{,}6$.',
      ],
      answer:
        'Bảng: $X$ nhận $0; 1; 2$ với xác suất $0{,}1; 0{,}6; 0{,}3$. $E(X) = 1{,}2$, $V(X) = 0{,}36$, $\\sigma(X) = 0{,}6$.',
    },
    {
      problem:
        'Số vụ vi phạm luật giao thông $X$ tại một nút giao vào tối thứ Bảy có bảng phân bố xác suất: $X$ nhận $0, 1, 2, 3, 4, 5$ với xác suất lần lượt $0{,}1;\\ 0{,}2;\\ 0{,}25;\\ 0{,}25;\\ 0{,}15;\\ 0{,}05$. Tính số vụ vi phạm trung bình và độ lệch chuẩn của $X$.',
      steps: [
        'Kiểm tra: $0{,}1 + 0{,}2 + 0{,}25 + 0{,}25 + 0{,}15 + 0{,}05 = 1$.',
        '$E(X) = 0 \\cdot 0{,}1 + 1 \\cdot 0{,}2 + 2 \\cdot 0{,}25 + 3 \\cdot 0{,}25 + 4 \\cdot 0{,}15 + 5 \\cdot 0{,}05 = 2{,}3$.',
        '$\\sum x_k^2p_k = 0 + 0{,}2 + 1 + 2{,}25 + 2{,}4 + 1{,}25 = 7{,}1$, nên $V(X) = 7{,}1 - 2{,}3^2 = 1{,}81$.',
        '$\\sigma(X) = \\sqrt{1{,}81} \\approx 1{,}35$.',
      ],
      answer:
        'Trung bình mỗi tối thứ Bảy có $2{,}3$ vụ vi phạm; $\\sigma(X) \\approx 1{,}35$ (vụ).',
    },
    {
      problem:
        'Một người có hai phương án đầu tư. Lợi nhuận (triệu đồng) của phương án A là $X$, nhận các giá trị $-2;\\ 4;\\ 10$ với xác suất $0{,}3;\\ 0{,}5;\\ 0{,}2$. Lợi nhuận của phương án B là $Y$, nhận các giá trị $2;\\ 4$ với xác suất $0{,}3;\\ 0{,}7$. Nên chọn phương án nào?',
      steps: [
        '$E(X) = -2 \\cdot 0{,}3 + 4 \\cdot 0{,}5 + 10 \\cdot 0{,}2 = 3{,}4$ và $E(Y) = 2 \\cdot 0{,}3 + 4 \\cdot 0{,}7 = 3{,}4$: lợi nhuận trung bình như nhau.',
        '$V(X) = 4 \\cdot 0{,}3 + 16 \\cdot 0{,}5 + 100 \\cdot 0{,}2 - 3{,}4^2 = 29{,}2 - 11{,}56 = 17{,}64$, $\\sigma(X) = 4{,}2$.',
        '$V(Y) = 4 \\cdot 0{,}3 + 16 \\cdot 0{,}7 - 3{,}4^2 = 12{,}4 - 11{,}56 = 0{,}84$, $\\sigma(Y) \\approx 0{,}92$.',
        'Hai phương án có cùng kì vọng, nhưng $\\sigma(Y) < \\sigma(X)$: lợi nhuận của B ít phân tán hơn, tức là ít rủi ro hơn.',
      ],
      answer:
        'Nên chọn phương án B: cùng lợi nhuận kì vọng $3{,}4$ triệu đồng nhưng ít rủi ro hơn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Biến ngẫu nhiên rời rạc $X$ nhận các giá trị $1, 2, 3, 4$ với xác suất lần lượt $0{,}1;\\ a;\\ 0{,}3;\\ 0{,}2$. Tìm $a$.',
      answer: 0.4,
      hints: ['Tổng các xác suất trong bảng phân bố bằng $1$.'],
      solution: '$0{,}1 + a + 0{,}3 + 0{,}2 = 1$, nên $a = 0{,}4$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng phân bố ở câu trên ($X$ nhận $1, 2, 3, 4$ với xác suất $0{,}1;\\ 0{,}4;\\ 0{,}3;\\ 0{,}2$), tính $E(X)$.',
      answer: 2.6,
      hints: ['$E(X) = x_1p_1 + x_2p_2 + x_3p_3 + x_4p_4$.'],
      solution:
        '$E(X) = 1 \\cdot 0{,}1 + 2 \\cdot 0{,}4 + 3 \\cdot 0{,}3 + 4 \\cdot 0{,}2 = 0{,}1 + 0{,}8 + 0{,}9 + 0{,}8 = 2{,}6$.',
    },
    {
      type: 'number',
      prompt: 'Cũng với bảng phân bố đó ($E(X) = 2{,}6$), tính phương sai $V(X)$.',
      answer: 0.84,
      hints: [
        'Dùng công thức $V(X) = \\sum x_k^2p_k - [E(X)]^2$.',
        '$\\sum x_k^2p_k = 1 \\cdot 0{,}1 + 4 \\cdot 0{,}4 + 9 \\cdot 0{,}3 + 16 \\cdot 0{,}2$.',
      ],
      solution:
        '$\\sum x_k^2p_k = 0{,}1 + 1{,}6 + 2{,}7 + 3{,}2 = 7{,}6$, nên $V(X) = 7{,}6 - 2{,}6^2 = 7{,}6 - 6{,}76 = 0{,}84$.',
    },
    {
      type: 'choice',
      prompt:
        'Bảng nào dưới đây là bảng phân bố xác suất của một biến ngẫu nhiên $X$ nhận các giá trị $0, 1, 2$?',
      options: [
        '$P(X = 0) = 0{,}3;\\ P(X = 1) = 0{,}4;\\ P(X = 2) = 0{,}3$',
        '$P(X = 0) = 0{,}5;\\ P(X = 1) = 0{,}4;\\ P(X = 2) = 0{,}2$',
        '$P(X = 0) = 0{,}6;\\ P(X = 1) = -0{,}1;\\ P(X = 2) = 0{,}5$',
        '$P(X = 0) = 0{,}2;\\ P(X = 1) = 0{,}3;\\ P(X = 2) = 0{,}4$',
      ],
      answer: 0,
      hints: ['Các xác suất phải không âm và có tổng bằng $1$.'],
      solution:
        'Bảng $0{,}3;\\ 0{,}4;\\ 0{,}3$ có các số không âm, tổng bằng $1$. Bảng $0{,}5;\\ 0{,}4;\\ 0{,}2$ có tổng $1{,}1$; bảng $0{,}2;\\ 0{,}3;\\ 0{,}4$ có tổng $0{,}9$; bảng có $-0{,}1$ chứa xác suất âm.',
    },
    {
      type: 'number',
      prompt: 'Gieo một con xúc xắc cân đối. Gọi $X$ là số chấm xuất hiện. Tính $E(X)$.',
      answer: 3.5,
      hints: ['Mỗi giá trị $1, 2, \\dots, 6$ có xác suất $\\dfrac{1}{6}$.'],
      solution: '$E(X) = (1 + 2 + 3 + 4 + 5 + 6) \\cdot \\dfrac{1}{6} = \\dfrac{21}{6} = 3{,}5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với $X$ là số chấm khi gieo một con xúc xắc cân đối ($E(X) = 3{,}5$), tính $V(X)$ (viết dưới dạng phân số tối giản).',
      answer: [35, 12],
      simplest: true,
      hints: [
        '$\\sum x_k^2p_k = (1 + 4 + 9 + 16 + 25 + 36) \\cdot \\dfrac{1}{6}$.',
        'Trừ đi $3{,}5^2 = \\dfrac{49}{4}$.',
      ],
      solution:
        '$\\sum x_k^2p_k = \\dfrac{91}{6}$, nên $V(X) = \\dfrac{91}{6} - \\dfrac{49}{4} = \\dfrac{182 - 147}{12} = \\dfrac{35}{12}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $4$ viên bi trắng và $2$ viên bi đen. Lấy ngẫu nhiên đồng thời $2$ viên. Gọi $X$ là số bi đen lấy được. Tính $E(X)$.',
      answer: [2, 3],
      hints: [
        '$X$ nhận $0, 1, 2$; số cách lấy là $C_6^2 = 15$.',
        '$P(X = 1) = \\dfrac{C_4^1C_2^1}{15} = \\dfrac{8}{15}$, $P(X = 2) = \\dfrac{C_2^2}{15} = \\dfrac{1}{15}$.',
      ],
      solution:
        '$P(X = 0) = \\dfrac{C_4^2}{15} = \\dfrac{6}{15}$, $P(X = 1) = \\dfrac{8}{15}$, $P(X = 2) = \\dfrac{1}{15}$. Vậy $E(X) = 0 \\cdot \\dfrac{6}{15} + 1 \\cdot \\dfrac{8}{15} + 2 \\cdot \\dfrac{1}{15} = \\dfrac{10}{15} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Biến ngẫu nhiên $X$ có $E(X) = 2$ và $x_1^2p_1 + x_2^2p_2 + \\dots + x_n^2p_n = 6{,}25$. Tính độ lệch chuẩn $\\sigma(X)$.',
      answer: 1.5,
      hints: ['Tính $V(X)$ trước, rồi lấy căn bậc hai.'],
      solution: '$V(X) = 6{,}25 - 2^2 = 2{,}25$, nên $\\sigma(X) = \\sqrt{2{,}25} = 1{,}5$.',
    },
    {
      type: 'choice',
      prompt:
        'Lợi nhuận của hai cửa hàng là $X$ và $Y$ (triệu đồng/ngày) với $E(X) = E(Y) = 5$, $\\sigma(X) = 1{,}2$, $\\sigma(Y) = 3$. Nhận xét nào đúng?',
      options: [
        'Hai cửa hàng có lợi nhuận trung bình như nhau, lợi nhuận của cửa hàng thứ nhất ổn định hơn.',
        'Hai cửa hàng có lợi nhuận trung bình như nhau, lợi nhuận của cửa hàng thứ hai ổn định hơn.',
        'Cửa hàng thứ hai có lợi nhuận trung bình cao hơn.',
        'Ngày nào hai cửa hàng cũng có lợi nhuận đúng $5$ triệu đồng.',
      ],
      answer: 0,
      hints: [
        'Kì vọng cho giá trị trung bình; độ lệch chuẩn cho mức độ phân tán quanh giá trị trung bình.',
      ],
      solution:
        'Hai kì vọng bằng nhau nên lợi nhuận trung bình như nhau. $\\sigma(X) < \\sigma(Y)$ nên lợi nhuận của cửa hàng thứ nhất ít phân tán, tức là ổn định hơn. Kì vọng là giá trị trung bình, không phải lợi nhuận của mọi ngày.',
    },
  ],
  takeaways: [
    'Bảng phân bố xác suất của $X$: các giá trị $x_k$ và xác suất $p_k = P(X = x_k) \\ge 0$, với $p_1 + \\dots + p_n = 1$.',
    '$E(X) = x_1p_1 + \\dots + x_np_n$ là giá trị trung bình của $X$, cũng là điểm cân bằng của biểu đồ phân bố.',
    '$V(X) = \\sum (x_k - E(X))^2p_k = \\sum x_k^2p_k - [E(X)]^2$ và $\\sigma(X) = \\sqrt{V(X)}$ đo mức độ phân tán (rủi ro) của $X$ quanh $E(X)$.',
  ],
};
