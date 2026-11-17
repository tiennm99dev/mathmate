/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề biến ngẫu nhiên rời rạc: bảng phân bố xác suất, kì vọng, phương sai, độ lệch chuẩn, phân bố nhị thức và bài toán trò chơi may rủi tính kì vọng lời lỗ.',
  intro:
    'Một trò chơi may rủi có "công bằng" không? Người chơi có thể thắng vài ván, nhưng chơi thật nhiều ván thì trung bình mỗi ván lời hay lỗ bao nhiêu? Kì vọng của tiền lời trả lời câu hỏi đó. Bài này ôn lại toàn bộ chuyên đề qua các bài toán như vậy.',
  objectives: [
    'Lập bảng phân bố xác suất và tính kì vọng, phương sai, độ lệch chuẩn của biến ngẫu nhiên rời rạc.',
    'Nhận biết và tính xác suất, kì vọng, phương sai của phân bố nhị thức.',
    'Dùng kì vọng để đánh giá lời lỗ của trò chơi, giá vé, hợp đồng bảo hiểm và tìm điều kiện để trò chơi công bằng.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức'],
          rows: [
            ['Bảng phân bố xác suất', '$p_k = P(X = x_k) \\ge 0$, $p_1 + p_2 + \\dots + p_n = 1$'],
            ['Kì vọng', '$E(X) = x_1p_1 + x_2p_2 + \\dots + x_np_n$'],
            ['Phương sai', '$V(X) = \\sum x_k^2p_k - [E(X)]^2$'],
            ['Độ lệch chuẩn', '$\\sigma(X) = \\sqrt{V(X)}$'],
            [
              'Phân bố nhị thức $B(n; p)$',
              '$P(X = k) = C_n^kp^k(1 - p)^{n-k}$, $k = 0, 1, \\dots, n$',
            ],
            ['Kì vọng, phương sai của $B(n; p)$', '$E(X) = np$, $V(X) = np(1 - p)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trò chơi công bằng',
          text: 'Gọi $X$ là tiền lời của người chơi sau một ván (lỗ thì $X$ âm). Trò chơi công bằng khi $E(X) = 0$; $E(X) < 0$ thì trò chơi có lợi cho nhà cái, $E(X) > 0$ thì có lợi cho người chơi. Kì vọng không cho biết kết quả của một ván, mà cho biết tiền lời trung bình mỗi ván khi chơi rất nhiều ván.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định các giá trị của tiền lời $X$ (nhớ trừ tiền vé, tiền đặt cược).',
            'Tính xác suất của từng giá trị, kiểm tra tổng bằng $1$, lập bảng phân bố.',
            'Tính $E(X)$ và kết luận; nếu cần, đặt ẩn cho giá vé hoặc tiền thưởng rồi giải $E(X) = 0$.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Thiết kế một trò chơi công bằng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế một trò chơi may rủi dùng xúc xắc, đồng xu hoặc lá thăm sao cho trò chơi công bằng, rồi kiểm chứng bằng thực nghiệm.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: xúc xắc, đồng xu hoặc các lá thăm; bảng ghi kết quả; máy tính cầm tay hoặc bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết luật chơi: tiền đặt (hoặc giá vé) và tiền thưởng cho từng kết quả, để một ẩn $a$ chưa biết.',
            'Lập bảng phân bố xác suất của tiền lời $X$ theo $a$, tính $E(X)$ và giải $E(X) = 0$ để tìm $a$.',
            'Tính độ lệch chuẩn $\\sigma(X)$ để biết trò chơi "may rủi" đến mức nào.',
            'Cả nhóm chơi thử ít nhất $100$ ván, ghi tiền lời mỗi ván và tính trung bình; so sánh với $E(X) = 0$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: luật chơi, bảng phân bố, lời giải tìm $a$, số liệu chơi thử và nhận xét. Thảo luận: vì sao các trò chơi có thưởng ngoài thực tế luôn có $E(X) < 0$ đối với người chơi?',
        },
      ],
    },
  ],
  explore: {
    title: 'Trò chơi may rủi: lời hay lỗ?',
    instruction:
      'Chọn một trò chơi và kéo thanh trượt để đổi tiền thưởng hoặc giá vé. Quan sát bảng phân bố xác suất của tiền lời $X$ và kì vọng $E(X)$; tìm giá trị làm trò chơi công bằng. Bấm chơi nhiều ván để thấy tiền lời trung bình tiến gần $E(X)$.',
  },
  examples: [
    {
      problem:
        'Người chơi đặt $10$ nghìn đồng vào một mặt rồi gieo ba con xúc xắc cân đối. Nếu mặt đó xuất hiện $k$ lần ($k = 1, 2, 3$) thì người chơi nhận lại tiền đặt và được thưởng $10k$ nghìn đồng; nếu không xuất hiện thì mất tiền đặt. Tính kì vọng tiền lời của người chơi.',
      steps: [
        'Số lần xuất hiện mặt đã đặt $K \\sim B\\left(3; \\dfrac{1}{6}\\right)$: $P(K = 0) = \\dfrac{125}{216}$, $P(K = 1) = 3 \\cdot \\dfrac{1}{6} \\cdot \\dfrac{25}{36} = \\dfrac{75}{216}$, $P(K = 2) = \\dfrac{15}{216}$, $P(K = 3) = \\dfrac{1}{216}$.',
        'Tiền lời $X$ (nghìn đồng) nhận các giá trị $-10;\\ 10;\\ 20;\\ 30$ với các xác suất trên.',
        '$E(X) = \\dfrac{-10 \\cdot 125 + 10 \\cdot 75 + 20 \\cdot 15 + 30 \\cdot 1}{216} = \\dfrac{-170}{216} \\approx -0{,}79$.',
      ],
      answer:
        '$E(X) \\approx -0{,}79$ nghìn đồng: trung bình mỗi ván người chơi lỗ khoảng $790$ đồng, trò chơi có lợi cho nhà cái.',
    },
    {
      problem:
        'Phí mỗi lượt chơi là $20$ nghìn đồng. Người chơi tung một đồng xu cân đối $3$ lần, mỗi lần xuất hiện mặt ngửa được thưởng $10$ nghìn đồng. Tính kì vọng tiền lời và tìm phí để trò chơi công bằng.',
      steps: [
        'Số mặt ngửa $Y \\sim B(3; 0{,}5)$ nhận $0, 1, 2, 3$ với xác suất $\\dfrac{1}{8}, \\dfrac{3}{8}, \\dfrac{3}{8}, \\dfrac{1}{8}$.',
        'Tiền lời $X = 10Y - 20$ nhận các giá trị $-20;\\ -10;\\ 0;\\ 10$ với cùng các xác suất đó.',
        '$E(X) = \\dfrac{-20 \\cdot 1 - 10 \\cdot 3 + 0 \\cdot 3 + 10 \\cdot 1}{8} = \\dfrac{-40}{8} = -5$.',
        'Tiền thưởng trung bình là $10 \\cdot E(Y) = 10 \\cdot 1{,}5 = 15$ nghìn đồng, nên phí $15$ nghìn đồng thì $E(X) = 0$.',
      ],
      answer: '$E(X) = -5$ nghìn đồng; trò chơi công bằng khi phí là $15$ nghìn đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Biến ngẫu nhiên $X$ nhận các giá trị $-1;\\ 0;\\ 2$ với xác suất lần lượt $0{,}3;\\ 0{,}2;\\ 0{,}5$. Tính $E(X)$.',
      answer: 0.7,
      hints: ['$E(X) = x_1p_1 + x_2p_2 + x_3p_3$.'],
      solution: '$E(X) = -1 \\cdot 0{,}3 + 0 \\cdot 0{,}2 + 2 \\cdot 0{,}5 = 0{,}7$.',
    },
    {
      type: 'number',
      prompt: 'Với biến ngẫu nhiên $X$ ở câu trên ($E(X) = 0{,}7$), tính $V(X)$.',
      answer: 1.81,
      hints: ['$V(X) = \\sum x_k^2p_k - [E(X)]^2$.'],
      solution:
        '$\\sum x_k^2p_k = 1 \\cdot 0{,}3 + 0 + 4 \\cdot 0{,}5 = 2{,}3$, nên $V(X) = 2{,}3 - 0{,}7^2 = 1{,}81$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo hai con xúc xắc cân đối. Nếu tổng số chấm bằng $7$ hoặc $11$, người chơi được thưởng $30$ nghìn đồng; nếu không, người chơi mất $10$ nghìn đồng. Tính kì vọng tiền lời của người chơi (nghìn đồng, làm tròn đến hàng phần trăm).',
      answer: -1.11,
      tolerance: 0.005,
      hints: [
        'Có $6$ kết quả cho tổng $7$ và $2$ kết quả cho tổng $11$ trong $36$ kết quả.',
        'Xác suất thắng là $\\dfrac{8}{36} = \\dfrac{2}{9}$.',
      ],
      solution:
        '$E(X) = 30 \\cdot \\dfrac{2}{9} + (-10) \\cdot \\dfrac{7}{9} = \\dfrac{60 - 70}{9} = -\\dfrac{10}{9} \\approx -1{,}11$ (nghìn đồng).',
    },
    {
      type: 'number',
      prompt:
        'Trong trò rút thăm: hộp có $10$ lá thăm, $1$ lá trúng $50$ nghìn đồng, $2$ lá trúng $20$ nghìn đồng, $7$ lá không trúng. Giá một lượt rút là bao nhiêu nghìn đồng thì trò chơi công bằng?',
      answer: 9,
      hints: ['Gọi giá là $c$; tiền lời là tiền trúng trừ $c$.', 'Giải $E(X) = 0$.'],
      solution:
        'Tiền trúng trung bình là $50 \\cdot 0{,}1 + 20 \\cdot 0{,}2 + 0 \\cdot 0{,}7 = 9$ nghìn đồng, nên $E(X) = 9 - c = 0$ khi $c = 9$.',
    },
    {
      type: 'number',
      prompt:
        'Một đợt xổ số phát hành $1\\,000$ vé, có $1$ giải $2$ triệu đồng và $10$ giải $100$ nghìn đồng. Giá vé bao nhiêu đồng thì kì vọng tiền lời của người mua một vé bằng $0$?',
      answer: 3000,
      hints: ['Tính tiền thưởng trung bình của một vé: tổng tiền thưởng chia cho số vé.'],
      solution:
        'Tổng tiền thưởng là $2\\,000\\,000 + 10 \\cdot 100\\,000 = 3\\,000\\,000$ đồng, nên tiền thưởng trung bình mỗi vé là $3\\,000$ đồng. Giá vé $3\\,000$ đồng thì $E(X) = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Một công ty bảo hiểm bán hợp đồng với phí $1$ triệu đồng/năm. Nếu người mua gặp sự cố (xác suất $0{,}01$) thì công ty chi trả $50$ triệu đồng. Tính lợi nhuận kì vọng của công ty trên một hợp đồng (triệu đồng).',
      answer: 0.5,
      hints: [
        'Lợi nhuận $X$ của công ty là $1$ khi không có sự cố và $1 - 50 = -49$ khi có sự cố.',
      ],
      solution:
        '$E(X) = 1 \\cdot 0{,}99 + (-49) \\cdot 0{,}01 = 0{,}99 - 0{,}49 = 0{,}5$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Một xạ thủ bắn $3$ viên đạn, xác suất trúng của mỗi viên là $0{,}6$, độc lập với nhau. Tính xác suất có đúng $2$ viên trúng.',
      answer: 0.432,
      hints: ['Số viên trúng $X \\sim B(3; 0{,}6)$.'],
      solution:
        '$P(X = 2) = C_3^2 \\cdot 0{,}6^2 \\cdot 0{,}4 = 3 \\cdot 0{,}36 \\cdot 0{,}4 = 0{,}432$.',
    },
    {
      type: 'number',
      prompt: 'Biến ngẫu nhiên $X \\sim B(100; 0{,}02)$. Tính độ lệch chuẩn $\\sigma(X)$.',
      answer: 1.4,
      hints: ['$V(X) = np(1 - p)$.'],
      solution:
        '$V(X) = 100 \\cdot 0{,}02 \\cdot 0{,}98 = 1{,}96$, nên $\\sigma(X) = \\sqrt{1{,}96} = 1{,}4$.',
    },
    {
      type: 'number',
      prompt: 'Biến ngẫu nhiên $X \\sim B(n; 0{,}5)$ có $P(X = 0) = \\dfrac{1}{32}$. Tìm $n$.',
      answer: 5,
      hints: ['$P(X = 0) = (1 - p)^n = 0{,}5^n$.'],
      solution: '$0{,}5^n = \\dfrac{1}{32} = 0{,}5^5$, nên $n = 5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $3$ viên bi đỏ và $2$ viên bi xanh. Lấy ngẫu nhiên đồng thời $3$ viên. Gọi $X$ là số bi xanh lấy được. Tính $E(X)$.',
      answer: [6, 5],
      hints: [
        '$X$ nhận $0, 1, 2$; số cách lấy là $C_5^3 = 10$.',
        '$P(X = 1) = \\dfrac{C_2^1C_3^2}{10}$, $P(X = 2) = \\dfrac{C_2^2C_3^1}{10}$.',
      ],
      solution:
        '$P(X = 0) = \\dfrac{1}{10}$, $P(X = 1) = \\dfrac{6}{10}$, $P(X = 2) = \\dfrac{3}{10}$. Vậy $E(X) = 1 \\cdot \\dfrac{6}{10} + 2 \\cdot \\dfrac{3}{10} = \\dfrac{12}{10} = \\dfrac{6}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'Kì vọng tiền lời của người chơi trong một trò chơi là $-0{,}5$ nghìn đồng mỗi ván. Khẳng định nào đúng?',
      options: [
        'Chơi rất nhiều ván, trung bình mỗi ván người chơi lỗ khoảng $500$ đồng.',
        'Ván nào người chơi cũng lỗ đúng $500$ đồng.',
        'Người chơi không bao giờ thắng một ván nào.',
        'Chơi càng nhiều ván, người chơi càng dễ có lời.',
      ],
      answer: 0,
      hints: ['Kì vọng là giá trị trung bình khi lặp lại phép thử rất nhiều lần.'],
      solution:
        'Kì vọng $-0{,}5$ nghìn đồng nghĩa là trung bình mỗi ván người chơi lỗ khoảng $500$ đồng khi chơi nhiều ván. Từng ván người chơi vẫn có thể thắng hoặc thua những khoản khác nhau, và chơi càng nhiều ván thì tiền lời trung bình càng gần $-0{,}5$ nên tổng tiền lỗ càng lớn.',
    },
  ],
  takeaways: [
    'Lập bảng phân bố xác suất của tiền lời rồi tính $E(X)$ để biết trung bình mỗi ván lời hay lỗ.',
    'Trò chơi công bằng khi $E(X) = 0$; đặt ẩn cho giá vé hay tiền thưởng rồi giải $E(X) = 0$.',
    'Đếm số lần thành công trong $n$ lần thử độc lập dùng phân bố nhị thức: $E(X) = np$, $V(X) = np(1 - p)$.',
  ],
};
