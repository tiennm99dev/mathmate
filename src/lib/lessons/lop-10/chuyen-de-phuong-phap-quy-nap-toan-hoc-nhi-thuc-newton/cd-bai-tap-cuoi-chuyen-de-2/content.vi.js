/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề 2: chứng minh bằng phương pháp quy nạp toán học, khai triển nhị thức Newton, tìm hệ số và tính tổng các số tổ hợp.',
  intro:
    'Chuyên đề này cho em hai công cụ gắn bó với nhau: phương pháp quy nạp để chứng minh một mệnh đề đúng với mọi số tự nhiên $n$, và công thức nhị thức Newton, chính là một kết quả được chứng minh bằng quy nạp. Bài ôn tập này giúp em luyện cả hai, từ điền từng bước chứng minh đến tìm hệ số trong khai triển.',
  objectives: [
    'Trình bày đầy đủ một chứng minh quy nạp: bước cơ sở, giả thiết quy nạp, điều cần chứng minh và kết luận.',
    'Phát hiện lỗi trong một lập luận quy nạp thiếu bước.',
    'Dùng số hạng tổng quát của nhị thức Newton để tìm hệ số, tìm $n$ và tính gần đúng.',
    'Tính các tổng số tổ hợp bằng cách thay giá trị thích hợp vào khai triển.',
  ],
  sections: [
    {
      heading: 'Tóm tắt chuyên đề',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương pháp quy nạp toán học',
          text: 'Để chứng minh $P(n)$ đúng với mọi số tự nhiên $n \\ge p$: (1) chứng minh $P(p)$ đúng; (2) với $k \\ge p$ tuỳ ý, giả sử $P(k)$ đúng, chứng minh $P(k + 1)$ đúng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhị thức Newton',
          text: '$(a + b)^n = C_n^0a^n + C_n^1a^{n-1}b + \\dots + C_n^nb^n$, số hạng tổng quát $T_{k+1} = C_n^ka^{n-k}b^k$ ($0 \\le k \\le n$). Các hệ số là hàng $n$ của tam giác Pascal.',
        },
        {
          type: 'table',
          head: ['Dạng bài', 'Cách làm'],
          rows: [
            [
              'Chứng minh đẳng thức dạng tổng',
              '$S_{k+1} = S_k + $ số hạng thứ $k + 1$, thay $S_k$ theo giả thiết quy nạp',
            ],
            [
              'Chứng minh chia hết',
              'Tách biểu thức với $n = k + 1$ thành bội của biểu thức với $n = k$ cộng một số chia hết',
            ],
            [
              'Chứng minh bất đẳng thức',
              'Nhân hoặc cộng hai vế của $P(k)$ rồi so sánh với vế phải của $P(k + 1)$',
            ],
            [
              'Tìm hệ số của $x^m$',
              'Viết $T_{k+1}$, gom luỹ thừa của $x$, giải số mũ bằng $m$ để tìm $k$',
            ],
            [
              'Tính tổng số tổ hợp',
              'Thay $x$ bằng giá trị thích hợp ($1$, $-1$, $2$, …) vào khai triển $(1 + x)^n$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Quên bước cơ sở hoặc chọn sai giá trị bắt đầu; giả sử luôn điều cần chứng minh; quên dấu trừ của $b$ khi khai triển $(a - b)^n$; nhầm số hạng thứ $k$ với $T_{k+1}$.',
        },
      ],
    },
    {
      heading: 'Dự án: Tung đồng xu và tam giác Pascal',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm tra bằng thực nghiệm rằng khi tung $4$ đồng xu, số cách được đúng $k$ mặt sấp là $C_4^k$, tức là hàng $4$ của tam giác Pascal: $1, 4, 6, 4, 1$ trên tổng số $2^4 = 16$ kết quả.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: $4$ đồng xu, bảng kiểm đếm, có thể dùng phần mềm bảng tính để tổng hợp kết quả của cả lớp.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Liệt kê $16$ kết quả có thể của việc tung $4$ đồng xu (ví dụ SNSS) và đếm số kết quả có đúng $k$ mặt sấp, $k = 0, 1, 2, 3, 4$. Giải thích vì sao số đó là $C_4^k$.',
            'Mỗi nhóm tung $4$ đồng xu $80$ lần, ghi số mặt sấp mỗi lần vào bảng kiểm đếm.',
            'Tính tần suất của mỗi giá trị $k$ và so sánh với $\\dfrac{C_4^k}{16}$.',
            'Gộp kết quả của cả lớp và nhận xét: khi số lần tung lớn, tần suất có gần $\\dfrac{C_4^k}{16}$ hơn không?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng $16$ kết quả, bảng tần suất của nhóm và của cả lớp, biểu đồ cột so sánh với $\\dfrac{1}{16}, \\dfrac{4}{16}, \\dfrac{6}{16}, \\dfrac{4}{16}, \\dfrac{1}{16}$ và nhận xét.',
        },
      ],
    },
  ],
  explore: {
    title: 'Điền từng bước chứng minh quy nạp',
    instruction:
      'Chọn một bài chứng minh. Ở mỗi chỗ trống, chọn nội dung đúng để chứng minh hiện tiếp bước sau. Nếu chọn sai, đọc lời nhắc rồi chọn lại.',
  },
  examples: [
    {
      problem: 'Chứng minh rằng $7^n - 1$ chia hết cho $6$ với mọi số tự nhiên $n \\ge 1$.',
      steps: [
        'Bước 1. Với $n = 1$: $7 - 1 = 6$ chia hết cho $6$.',
        'Bước 2. Giả sử $7^k - 1$ chia hết cho $6$ ($k \\ge 1$). Ta có $7^{k + 1} - 1 = 7 \\cdot 7^k - 7 + 6 = 7(7^k - 1) + 6$.',
        '$7(7^k - 1)$ chia hết cho $6$ theo giả thiết quy nạp và $6$ chia hết cho $6$, nên $7^{k + 1} - 1$ chia hết cho $6$.',
      ],
      answer: '$7^n - 1$ chia hết cho $6$ với mọi $n \\ge 1$.',
    },
    {
      problem:
        'Biết hệ số của $x^2$ trong khai triển $(1 + 2x)^n$ bằng $40$. Tìm $n$ và hệ số của $x^3$ trong khai triển đó.',
      steps: [
        'Số hạng tổng quát: $T_{k+1} = C_n^k(2x)^k = C_n^k2^kx^k$.',
        'Hệ số của $x^2$: $4C_n^2 = 40$, nên $C_n^2 = \\dfrac{n(n - 1)}{2} = 10$, tức là $n^2 - n - 20 = 0$. Do $n$ là số tự nhiên, $n = 5$.',
        'Hệ số của $x^3$: $C_5^3 \\cdot 2^3 = 10 \\cdot 8 = 80$.',
      ],
      answer: '$n = 5$, hệ số của $x^3$ là $80$.',
    },
    {
      problem:
        'Chứng minh rằng $C_n^0 + 2C_n^1 + 4C_n^2 + \\dots + 2^nC_n^n = 3^n$ với mọi $n \\ge 1$.',
      steps: [
        'Theo nhị thức Newton: $(1 + x)^n = C_n^0 + C_n^1x + C_n^2x^2 + \\dots + C_n^nx^n$.',
        'Thay $x = 2$: vế trái bằng $(1 + 2)^n = 3^n$, vế phải bằng $C_n^0 + 2C_n^1 + 4C_n^2 + \\dots + 2^nC_n^n$.',
      ],
      answer: 'Đẳng thức đúng với mọi $n \\ge 1$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Theo đẳng thức $1 \\cdot 2 + 2 \\cdot 3 + \\dots + n(n + 1) = \\dfrac{n(n + 1)(n + 2)}{3}$ (chứng minh bằng quy nạp), tính $1 \\cdot 2 + 2 \\cdot 3 + \\dots + 10 \\cdot 11$.',
      answer: 440,
      hints: ['Thay $n = 10$ vào vế phải.'],
      solution: '$\\dfrac{10 \\cdot 11 \\cdot 12}{3} = \\dfrac{1\\,320}{3} = 440$.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn chứng minh được: nếu $1 + 2 + \\dots + k = \\dfrac{(2k + 1)^2}{8}$ thì $1 + 2 + \\dots + (k + 1) = \\dfrac{(2k + 3)^2}{8}$. Bạn kết luận $1 + 2 + \\dots + n = \\dfrac{(2n + 1)^2}{8}$ với mọi $n \\ge 1$. Nhận xét nào đúng?',
      options: [
        'Bước quy nạp đúng nhưng bước cơ sở sai ($n = 1$: $1 \\ne \\dfrac{9}{8}$), nên kết luận sai.',
        'Kết luận đúng vì bước quy nạp đã được chứng minh.',
        'Bước quy nạp sai vì $\\dfrac{(2k + 1)^2}{8} + (k + 1) \\ne \\dfrac{(2k + 3)^2}{8}$.',
        'Kết luận đúng với mọi $n \\ge 2$.',
      ],
      answer: 0,
      hints: [
        'Kiểm tra đẳng thức với $n = 1$.',
        'Thử lại bước quy nạp: $\\dfrac{4k^2 + 4k + 1 + 8k + 8}{8}$.',
      ],
      solution:
        'Bước quy nạp đúng: $\\dfrac{(2k + 1)^2}{8} + (k + 1) = \\dfrac{4k^2 + 12k + 9}{8} = \\dfrac{(2k + 3)^2}{8}$. Nhưng với $n = 1$: vế trái bằng $1$, vế phải bằng $\\dfrac{9}{8}$. Thiếu bước cơ sở nên không kết luận được; thực tế $1 + 2 + \\dots + n = \\dfrac{n(n + 1)}{2} \\ne \\dfrac{(2n + 1)^2}{8}$ với mọi $n$.',
    },
    {
      type: 'number',
      prompt:
        'Dãy số $(u_n)$ cho bởi $u_1 = 2$, $u_{n+1} = 2u_n - 1$. Tính vài số hạng đầu, dự đoán công thức của $u_n$ (có thể chứng minh bằng quy nạp) rồi tính $u_{10}$.',
      answer: 513,
      hints: [
        '$u_1 = 2$, $u_2 = 3$, $u_3 = 5$, $u_4 = 9$: mỗi số hơn một luỹ thừa của $2$ đúng $1$ đơn vị.',
        'Dự đoán $u_n = 2^{n-1} + 1$.',
      ],
      solution:
        'Dự đoán $u_n = 2^{n-1} + 1$. Bước cơ sở: $u_1 = 2^0 + 1 = 2$. Bước quy nạp: $u_{k+1} = 2(2^{k-1} + 1) - 1 = 2^k + 1$. Vậy $u_{10} = 2^9 + 1 = 513$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^3$ trong khai triển $(1 + x)^{10}$.',
      answer: 120,
      hints: ['$T_{k+1} = C_{10}^kx^k$.'],
      solution: 'Với $k = 3$: hệ số là $C_{10}^3 = \\dfrac{10 \\cdot 9 \\cdot 8}{6} = 120$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^4$ trong khai triển $(x - 2)^6$.',
      answer: 60,
      hints: ['$T_{k+1} = C_6^kx^{6-k}(-2)^k$.', 'Số mũ $6 - k = 4$ nên $k = 2$.'],
      solution: 'Với $k = 2$: hệ số là $C_6^2(-2)^2 = 15 \\cdot 4 = 60$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$ thoả mãn $C_n^1 + C_n^2 = 21$.',
      answer: 6,
      hints: [
        '$C_n^1 + C_n^2 = n + \\dfrac{n(n - 1)}{2}$.',
        'Đưa về phương trình $n^2 + n - 42 = 0$.',
      ],
      solution:
        '$n + \\dfrac{n(n - 1)}{2} = 21 \\Leftrightarrow n^2 + n - 42 = 0 \\Leftrightarrow n = 6$ (loại $n = -7$).',
    },
    {
      type: 'number',
      prompt: 'Hệ số lớn nhất trong khai triển $(a + b)^8$ bằng bao nhiêu?',
      answer: 70,
      hints: ['Các hệ số là hàng $8$ của tam giác Pascal; số lớn nhất nằm ở giữa hàng.'],
      solution: 'Hàng $8$: $1, 8, 28, 56, 70, 56, 28, 8, 1$. Hệ số lớn nhất là $C_8^4 = 70$.',
    },
    {
      type: 'number',
      prompt:
        'Dùng ba số hạng đầu của khai triển $(1 + 0{,}01)^5$, tính gần đúng $1{,}01^5$ (viết kết quả dạng số thập phân).',
      answer: 1.051,
      tolerance: 0.0001,
      hints: ['$(1 + x)^5 \\approx 1 + 5x + 10x^2$ khi $x$ nhỏ.'],
      solution:
        '$1{,}01^5 \\approx 1 + 5 \\cdot 0{,}01 + 10 \\cdot 0{,}0001 = 1 + 0{,}05 + 0{,}001 = 1{,}051$ (giá trị đúng là $1{,}0510100501$).',
    },
    {
      type: 'number',
      prompt: 'Tính $C_7^0 + C_7^1 + \\dots + C_7^7$.',
      answer: 128,
      hints: ['Thay $x = 1$ vào khai triển $(1 + x)^7$.'],
      solution: '$C_7^0 + C_7^1 + \\dots + C_7^7 = (1 + 1)^7 = 2^7 = 128$.',
    },
    {
      type: 'number',
      prompt: 'Tính $C_8^0 + 3C_8^1 + 3^2C_8^2 + \\dots + 3^8C_8^8$.',
      answer: 65536,
      hints: ['Tổng này là khai triển của $(1 + x)^8$ tại một giá trị $x$ thích hợp.'],
      solution:
        'Thay $x = 3$ vào $(1 + x)^8 = \\sum_{k=0}^{8} C_8^kx^k$: tổng bằng $4^8 = 65\\,536$.',
    },
  ],
  takeaways: [
    'Một chứng minh quy nạp đủ hai bước: bước cơ sở ở đúng giá trị bắt đầu và bước quy nạp từ $n = k$ lên $n = k + 1$.',
    'Ở bước quy nạp, viết rõ $P(k + 1)$ trước, rồi tìm chỗ dùng giả thiết quy nạp $P(k)$.',
    'Số hạng tổng quát $T_{k+1} = C_n^ka^{n-k}b^k$ là chìa khoá để tìm hệ số, tìm $n$ và tìm số hạng không chứa $x$.',
    'Thay $x$ bằng $1$, $-1$, $2$, … vào $(1 + x)^n$ để tính các tổng số tổ hợp.',
  ],
};
