/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương pháp quy nạp toán học: bước cơ sở và bước quy nạp; dùng quy nạp chứng minh đẳng thức, bất đẳng thức, tính chia hết và các công thức như lãi kép.',
  intro:
    'Quan sát: $1 = 1^2$, $1 + 3 = 2^2$, $1 + 3 + 5 = 3^2$, $1 + 3 + 5 + 7 = 4^2$. Ta đoán $1 + 3 + \\dots + (2n - 1) = n^2$ với mọi số tự nhiên $n \\ge 1$. Nhưng không thể kiểm tra hết vô số giá trị của $n$. Phương pháp quy nạp toán học giúp chứng minh một mệnh đề đúng với mọi $n$ chỉ bằng hai bước, giống như làm đổ cả một dây domino dài vô tận.',
  objectives: [
    'Nêu được hai bước của phương pháp quy nạp toán học: bước cơ sở và bước quy nạp.',
    'Hiểu vì sao thiếu một trong hai bước thì lập luận không còn đúng.',
    'Dùng phương pháp quy nạp chứng minh đẳng thức, bất đẳng thức và tính chia hết với mọi số tự nhiên $n \\ge p$.',
    'Vận dụng quy nạp vào một số bài toán thực tế như lãi kép.',
  ],
  sections: [
    {
      heading: 'Phương pháp quy nạp toán học',
      blocks: [
        {
          type: 'p',
          text: 'Xét đa thức $p(n) = n^2 - n + 41$. Ta có $p(1) = 41$, $p(2) = 43$, $p(3) = 47$, $p(4) = 53$, $p(5) = 61$ đều là số nguyên tố, và thử tiếp đến $n = 40$ vẫn được số nguyên tố. Nhưng $p(41) = 41^2 = 1\\,681$ không là số nguyên tố. Như vậy, một mệnh đề đúng với nhiều giá trị $n$ đã kiểm tra chưa chắc đúng với mọi $n$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương pháp quy nạp toán học',
          text: 'Để chứng minh mệnh đề $P(n)$ đúng với mọi số tự nhiên $n \\ge 1$, ta thực hiện hai bước sau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Bước cơ sở: chứng minh $P(n)$ đúng với $n = 1$.',
            'Bước quy nạp: với $k$ là một số tự nhiên tuỳ ý, $k \\ge 1$, giả sử $P(n)$ đúng với $n = k$ (giả thiết quy nạp), chứng minh $P(n)$ cũng đúng với $n = k + 1$.',
          ],
        },
        {
          type: 'p',
          text: 'Hình ảnh dây domino giải thích vì sao hai bước này là đủ: bước cơ sở làm đổ quân thứ nhất, bước quy nạp bảo đảm hễ quân thứ $k$ đổ thì quân thứ $k + 1$ cũng đổ. Vậy quân thứ hai đổ, rồi quân thứ ba đổ, … tất cả các quân đều đổ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Để chứng minh $P(n)$ đúng với mọi số tự nhiên $n \\ge p$ ($p$ là một số tự nhiên cho trước), ta làm tương tự. Bước cơ sở: chứng minh $P(n)$ đúng với $n = p$. Bước quy nạp: với $k$ là một số tự nhiên tuỳ ý, $k \\ge p$, giả sử $P(n)$ đúng với $n = k$, chứng minh $P(n)$ cũng đúng với $n = k + 1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không được bỏ bước nào',
          text: 'Bỏ bước cơ sở: $n^2 + n + 1$ "là số chẵn" có bước quy nạp đúng vì $(k + 1)^2 + (k + 1) + 1 = (k^2 + k + 1) + 2(k + 1)$, nhưng $n^2 + n + 1 = n(n + 1) + 1$ luôn là số lẻ. Bỏ bước quy nạp: $n^2 - n + 41$ đúng là số nguyên tố với $n = 1$ đến $40$ nhưng sai với $n = 41$.',
        },
      ],
    },
    {
      heading: 'Chứng minh đẳng thức',
      blocks: [
        {
          type: 'p',
          text: 'Khi chứng minh một đẳng thức dạng tổng $S_n = f(n)$, ở bước quy nạp ta viết $S_{k + 1} = S_k + (\\text{số hạng thứ } k + 1)$, thay $S_k = f(k)$ theo giả thiết quy nạp rồi biến đổi về $f(k + 1)$.',
        },
        {
          type: 'tex',
          tex: '1 + 2 + \\dots + n = \\frac{n(n + 1)}{2}, \\qquad 1^2 + 2^2 + \\dots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}',
        },
        {
          type: 'p',
          text: 'Cũng bằng quy nạp, ta chứng minh được với mọi $n \\ge 2$: $a^n - b^n = (a - b)(a^{n - 1} + a^{n - 2}b + \\dots + ab^{n - 2} + b^{n - 1})$.',
        },
      ],
    },
    {
      heading: 'Chứng minh bất đẳng thức và tính chia hết',
      blocks: [
        {
          type: 'p',
          text: 'Với bất đẳng thức, ở bước quy nạp ta dùng giả thiết quy nạp để đánh giá vế của $P(k + 1)$, thường bằng cách nhân hoặc cộng hai vế của $P(k)$ với cùng một số thích hợp.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bất đẳng thức Bernoulli',
          text: 'Nếu $x > -1$ thì $(1 + x)^n \\ge 1 + nx$ với mọi số tự nhiên $n \\ge 1$. Ở bước quy nạp, ta nhân hai vế của $(1 + x)^k \\ge 1 + kx$ với số dương $1 + x$: $(1 + x)^{k + 1} \\ge (1 + kx)(1 + x) = 1 + (k + 1)x + kx^2 \\ge 1 + (k + 1)x$.',
        },
        {
          type: 'p',
          text: 'Với tính chia hết, ta tách biểu thức ứng với $n = k + 1$ thành tổng của một bội của biểu thức ứng với $n = k$ (chia hết theo giả thiết quy nạp) và một số hạng chia hết rõ ràng. Chẳng hạn $4^{k + 1} - 1 = 4(4^k - 1) + 3$.',
        },
      ],
    },
    {
      heading: 'Ứng dụng khác: lãi kép',
      blocks: [
        {
          type: 'p',
          text: 'Gửi số tiền $A$ đồng vào ngân hàng với lãi suất $r$ mỗi kì theo thể thức lãi kép: tiền lãi của mỗi kì được cộng vào vốn để tính lãi kì sau. Gọi $T_n$ là số tiền (cả vốn lẫn lãi) sau $n$ kì. Ta có $T_1 = A(1 + r)$, $T_2 = T_1(1 + r) = A(1 + r)^2$, …',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức lãi kép',
          text: '$T_n = A(1 + r)^n$ với mọi $n \\ge 1$. Bước quy nạp: nếu $T_k = A(1 + r)^k$ thì $T_{k + 1} = T_k(1 + r) = A(1 + r)^{k + 1}$.',
        },
      ],
    },
    {
      heading: 'Dự án: Tháp Hà Nội',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm số lần chuyển ít nhất để giải trò chơi Tháp Hà Nội với $n$ đĩa, đưa ra dự đoán và chứng minh dự đoán bằng phương pháp quy nạp toán học.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: $5$ tấm bìa tròn có đường kính khác nhau (hoặc $5$ đồng xu khác cỡ), ba vị trí đánh dấu A, B, C trên giấy. Luật chơi: mỗi lần chỉ chuyển một đĩa trên cùng sang vị trí khác, không bao giờ đặt đĩa lớn lên đĩa nhỏ hơn; mục tiêu là chuyển cả chồng đĩa từ A sang C.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chơi với $1$, $2$, $3$, $4$ đĩa, ghi số lần chuyển ít nhất $M_n$ tìm được vào bảng.',
            'Nhận xét: muốn chuyển $n + 1$ đĩa, phải chuyển $n$ đĩa trên sang B, chuyển đĩa lớn nhất sang C, rồi chuyển $n$ đĩa từ B sang C. Từ đó viết hệ thức giữa $M_{n + 1}$ và $M_n$.',
            'Dự đoán công thức của $M_n$ (gợi ý: so sánh $M_n$ với $2^n$).',
            'Chứng minh dự đoán bằng phương pháp quy nạp toán học, ghi rõ bước cơ sở và bước quy nạp.',
            'Tính xem với $64$ đĩa, nếu mỗi giây chuyển một đĩa thì cần khoảng bao nhiêu năm.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu, hệ thức truy hồi, công thức dự đoán kèm chứng minh quy nạp và kết quả tính với $64$ đĩa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dây domino quy nạp',
    instruction:
      'Chọn một mệnh đề $P(n)$, kiểm tra bước cơ sở và bước quy nạp, rồi đẩy quân domino đầu tiên. Dời khung để xem các quân ở xa, chạm vào một quân để kiểm tra $P(n)$ với $n$ đó. Thử cả hai mệnh đề thiếu một bước để thấy vì sao cần đủ hai bước.',
  },
  examples: [
    {
      problem:
        'Chứng minh rằng với mọi số tự nhiên $n \\ge 1$: $1 + 3 + 5 + \\dots + (2n - 1) = n^2$.',
      steps: [
        'Bước 1. Với $n = 1$: vế trái bằng $1$, vế phải bằng $1^2 = 1$. Vậy đẳng thức đúng với $n = 1$.',
        'Bước 2. Giả sử đẳng thức đúng với $n = k$ ($k \\ge 1$), tức là $1 + 3 + \\dots + (2k - 1) = k^2$. Ta chứng minh nó đúng với $n = k + 1$, tức là $1 + 3 + \\dots + (2k - 1) + (2k + 1) = (k + 1)^2$.',
        'Theo giả thiết quy nạp: $1 + 3 + \\dots + (2k - 1) + (2k + 1) = k^2 + 2k + 1 = (k + 1)^2$.',
        'Vậy đẳng thức đúng với $n = k + 1$. Theo nguyên lí quy nạp, đẳng thức đúng với mọi $n \\ge 1$.',
      ],
      answer: '$1 + 3 + \\dots + (2n - 1) = n^2$ với mọi $n \\ge 1$.',
    },
    {
      problem:
        'Chứng minh rằng với mọi số tự nhiên $n \\ge 1$: $1^2 + 2^2 + \\dots + n^2 = \\dfrac{n(n + 1)(2n + 1)}{6}$.',
      steps: [
        'Bước 1. Với $n = 1$: vế trái bằng $1$, vế phải bằng $\\dfrac{1 \\cdot 2 \\cdot 3}{6} = 1$. Đúng.',
        'Bước 2. Giả sử $1^2 + 2^2 + \\dots + k^2 = \\dfrac{k(k + 1)(2k + 1)}{6}$ với $k \\ge 1$. Cần chứng minh $1^2 + \\dots + k^2 + (k + 1)^2 = \\dfrac{(k + 1)(k + 2)(2k + 3)}{6}$.',
        'Vế trái bằng $\\dfrac{k(k + 1)(2k + 1)}{6} + (k + 1)^2 = \\dfrac{(k + 1)\\left[k(2k + 1) + 6(k + 1)\\right]}{6} = \\dfrac{(k + 1)(2k^2 + 7k + 6)}{6}$.',
        'Vì $2k^2 + 7k + 6 = (k + 2)(2k + 3)$ nên vế trái bằng $\\dfrac{(k + 1)(k + 2)(2k + 3)}{6}$: đẳng thức đúng với $n = k + 1$.',
      ],
      answer: 'Đẳng thức đúng với mọi $n \\ge 1$.',
    },
    {
      problem: 'Chứng minh rằng $n^3 + 2n$ chia hết cho $3$ với mọi số tự nhiên $n \\ge 1$.',
      steps: [
        'Bước 1. Với $n = 1$: $1^3 + 2 \\cdot 1 = 3$ chia hết cho $3$.',
        'Bước 2. Giả sử $k^3 + 2k$ chia hết cho $3$ ($k \\ge 1$). Xét $(k + 1)^3 + 2(k + 1) = k^3 + 3k^2 + 3k + 1 + 2k + 2$.',
        'Nhóm lại: $(k + 1)^3 + 2(k + 1) = (k^3 + 2k) + 3(k^2 + k + 1)$.',
        'Số hạng thứ nhất chia hết cho $3$ theo giả thiết quy nạp, số hạng thứ hai là bội của $3$. Vậy $(k + 1)^3 + 2(k + 1)$ chia hết cho $3$.',
      ],
      answer: '$n^3 + 2n$ chia hết cho $3$ với mọi $n \\ge 1$.',
    },
    {
      problem: 'Chứng minh rằng $2^n > 2n + 1$ với mọi số tự nhiên $n \\ge 3$.',
      steps: [
        'Bước 1. Mệnh đề bắt đầu từ $n = 3$: $2^3 = 8 > 7 = 2 \\cdot 3 + 1$. Đúng. (Với $n = 1$, $n = 2$ bất đẳng thức sai, nên không thể bắt đầu từ $n = 1$.)',
        'Bước 2. Giả sử $2^k > 2k + 1$ với $k \\ge 3$. Nhân hai vế với $2$: $2^{k + 1} > 4k + 2$.',
        'Vì $k \\ge 3$ nên $2k > 1$, suy ra $4k + 2 = 2k + 3 + (2k - 1) > 2k + 3 = 2(k + 1) + 1$.',
        'Vậy $2^{k + 1} > 2(k + 1) + 1$: bất đẳng thức đúng với $n = k + 1$.',
      ],
      answer: '$2^n > 2n + 1$ với mọi $n \\ge 3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Chứng minh $P(n)$ đúng với mọi $n \\ge 1$ bằng quy nạp. Ở bước quy nạp, ta giả sử điều gì và cần chứng minh điều gì?',
      options: [
        'Giả sử $P(k)$ đúng với một số tự nhiên tuỳ ý $k \\ge 1$, chứng minh $P(k + 1)$ đúng.',
        'Giả sử $P(n)$ đúng với mọi $n \\ge 1$, chứng minh $P(k + 1)$ đúng.',
        'Giả sử $P(k + 1)$ đúng, chứng minh $P(k)$ đúng.',
        'Kiểm tra $P(1)$, $P(2)$, $P(3)$ đều đúng rồi kết luận.',
      ],
      answer: 0,
      hints: [
        'Không được giả sử điều cần chứng minh.',
        'Giả thiết quy nạp chỉ nói về một giá trị $n = k$; từ đó suy ra giá trị kế tiếp.',
      ],
      solution:
        'Bước quy nạp: giả sử $P(k)$ đúng với $k \\ge 1$ tuỳ ý (giả thiết quy nạp), rồi chứng minh $P(k + 1)$ đúng. Giả sử $P(n)$ đúng với mọi $n$ là giả sử luôn điều phải chứng minh; còn kiểm tra vài giá trị thì không phải chứng minh.',
    },
    {
      type: 'number',
      prompt:
        'Để chứng minh $n! > 2^n$ với mọi số tự nhiên $n \\ge p$ bằng quy nạp, bước cơ sở phải kiểm tra với $n = p$ là giá trị nhỏ nhất mà bất đẳng thức đúng. Tìm $p$.',
      answer: 4,
      hints: ['Tính $n!$ và $2^n$ với $n = 1, 2, 3, 4$.', '$3! = 6$ và $2^3 = 8$.'],
      solution:
        '$1! = 1 < 2$, $2! = 2 < 4$, $3! = 6 < 8$, $4! = 24 > 16$. Vậy $p = 4$. Bước quy nạp: nếu $k! > 2^k$ với $k \\ge 4$ thì $(k + 1)! = (k + 1) \\cdot k! > 2 \\cdot 2^k = 2^{k + 1}$.',
    },
    {
      type: 'number',
      prompt:
        'Giá trị nhỏ nhất của số tự nhiên $n \\ge 1$ để $n^2 - n + 41$ không là số nguyên tố là bao nhiêu?',
      answer: 41,
      hints: [
        'Với $n = 1, 2, \\dots, 40$ ta đều được số nguyên tố.',
        'Thử một giá trị làm cho hai số hạng cuối triệt tiêu và còn lại một bình phương.',
      ],
      solution:
        'Với $n = 41$: $41^2 - 41 + 41 = 41^2 = 1\\,681$ chia hết cho $41$, không là số nguyên tố. Với $1 \\le n \\le 40$, các giá trị đều là số nguyên tố. Vậy $n = 41$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước chứng minh $2 + 4 + \\dots + 2n = n(n + 1)$ với mọi $n \\ge 1$ theo đúng thứ tự.',
      items: [
        'Với $n = 1$: vế trái bằng $2$, vế phải bằng $1 \\cdot 2 = 2$, đẳng thức đúng.',
        'Giả sử $2 + 4 + \\dots + 2k = k(k + 1)$ với $k \\ge 1$.',
        'Khi đó $2 + 4 + \\dots + 2k + 2(k + 1) = k(k + 1) + 2(k + 1)$.',
        '$k(k + 1) + 2(k + 1) = (k + 1)(k + 2)$, nên đẳng thức đúng với $n = k + 1$.',
        'Vậy đẳng thức đúng với mọi $n \\ge 1$.',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Bước cơ sở trước, rồi giả thiết quy nạp, biến đổi, cuối cùng là kết luận.'],
      solution:
        'Bước cơ sở ($n = 1$) → giả thiết quy nạp ($n = k$) → cộng số hạng $2(k + 1)$ → biến đổi về $(k + 1)(k + 2)$ → kết luận.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $S_n = \\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\dots + \\dfrac{1}{n(n + 1)}$. Tính $S_1$, $S_2$, $S_3$, dự đoán công thức của $S_n$ (có thể chứng minh bằng quy nạp), rồi tính $S_{9}$.',
      answer: [9, 10],
      hints: [
        '$S_1 = \\dfrac{1}{2}$, $S_2 = \\dfrac{2}{3}$, $S_3 = \\dfrac{3}{4}$.',
        'Dự đoán $S_n = \\dfrac{n}{n + 1}$. Bước quy nạp: $\\dfrac{k}{k + 1} + \\dfrac{1}{(k + 1)(k + 2)} = \\dfrac{k + 1}{k + 2}$.',
      ],
      solution:
        'Dự đoán $S_n = \\dfrac{n}{n + 1}$. Bước cơ sở: $S_1 = \\dfrac{1}{2}$. Bước quy nạp: $S_{k + 1} = \\dfrac{k}{k + 1} + \\dfrac{1}{(k + 1)(k + 2)} = \\dfrac{k(k + 2) + 1}{(k + 1)(k + 2)} = \\dfrac{(k + 1)^2}{(k + 1)(k + 2)} = \\dfrac{k + 1}{k + 2}$. Vậy $S_9 = \\dfrac{9}{10}$.',
    },
    {
      type: 'number',
      prompt:
        'Gửi tiết kiệm $100$ triệu đồng với lãi suất $6\\%$ một năm theo thể thức lãi kép (kì hạn một năm). Theo công thức $T_n = A(1 + r)^n$, sau $3$ năm số tiền cả vốn lẫn lãi là bao nhiêu triệu đồng? (Làm tròn đến hàng phần trăm.)',
      answer: 119.1,
      tolerance: 0.01,
      hints: ['$A = 100$, $r = 0{,}06$, $n = 3$.', 'Tính $100 \\cdot 1{,}06^3$.'],
      solution:
        '$T_3 = 100 \\cdot 1{,}06^3 = 100 \\cdot 1{,}191016 \\approx 119{,}10$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Bằng quy nạp ta chứng minh được số đường chéo của một đa giác lồi $n$ cạnh ($n \\ge 4$) là $\\dfrac{n(n - 3)}{2}$. Một đa giác lồi $10$ cạnh có bao nhiêu đường chéo?',
      answer: 35,
      hints: ['Thay $n = 10$ vào công thức.'],
      solution: '$\\dfrac{10 \\cdot (10 - 3)}{2} = \\dfrac{70}{2} = 35$ đường chéo.',
    },
    {
      type: 'multi',
      prompt: 'Những khẳng định nào đúng với mọi số tự nhiên $n \\ge 1$?',
      options: [
        '$n^3 - n$ chia hết cho $6$',
        '$2^n \\ge n + 1$',
        '$n^2 + n + 1$ là số chẵn',
        '$n^2 \\le 2^n$',
      ],
      answers: [0, 1],
      hints: [
        'Hai khẳng định chứng minh được bằng quy nạp; với hai khẳng định còn lại, hãy tìm một phản ví dụ.',
        'Thử $n = 1$ với $n^2 + n + 1$ và $n = 3$ với $n^2 \\le 2^n$.',
      ],
      solution:
        '$n^3 - n = (n - 1)n(n + 1)$ là tích ba số tự nhiên liên tiếp nên chia hết cho $6$ (cũng chứng minh được bằng quy nạp: $(k + 1)^3 - (k + 1) = (k^3 - k) + 3k(k + 1)$). $2^n \\ge n + 1$: quy nạp với $2^{k + 1} \\ge 2k + 2 \\ge k + 2$. Sai: $1^2 + 1 + 1 = 3$ là số lẻ; $3^2 = 9 > 8 = 2^3$.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn "chứng minh" mọi con mèo đều cùng màu bằng quy nạp theo số mèo $n$: một con thì hiển nhiên cùng màu; giả sử mọi nhóm $k$ con cùng màu, xét nhóm $k + 1$ con, bỏ con thứ nhất được $k$ con cùng màu, bỏ con cuối được $k$ con cùng màu, hai nhóm có chung con ở giữa nên cả $k + 1$ con cùng màu. Lập luận sai ở đâu?',
      options: [
        'Bước quy nạp sai khi $k = 1$: với $2$ con, hai nhóm $1$ con không có con chung.',
        'Bước cơ sở sai vì một con mèo không thể "cùng màu".',
        'Không được dùng quy nạp cho con mèo.',
        'Lập luận đúng, mọi con mèo đều cùng màu.',
      ],
      answer: 0,
      hints: ['Thử áp dụng bước quy nạp với $k = 1$, tức là từ $1$ con lên $2$ con.'],
      solution:
        'Bước quy nạp cần hai nhóm $k$ con có phần chung, điều này chỉ đúng khi $k \\ge 2$. Từ $k = 1$ lên $k + 1 = 2$, bỏ con thứ nhất còn con thứ hai, bỏ con thứ hai còn con thứ nhất: hai nhóm rời nhau, không suy ra được hai con cùng màu. Dây domino gãy ngay giữa quân $1$ và quân $2$.',
    },
    {
      type: 'choice',
      prompt:
        'Khi chứng minh bất đẳng thức Bernoulli $(1 + x)^n \\ge 1 + nx$ bằng quy nạp, ta nhân hai vế của $(1 + x)^k \\ge 1 + kx$ với $1 + x$. Vì sao cần điều kiện $x > -1$?',
      options: [
        'Để $1 + x > 0$, nhân hai vế với nó không đổi chiều bất đẳng thức.',
        'Để $1 + kx$ luôn dương.',
        'Để $kx^2 \\ge 0$.',
        'Để bước cơ sở $n = 1$ đúng.',
      ],
      answer: 0,
      hints: ['Nhân hai vế của một bất đẳng thức với một số âm thì chiều bất đẳng thức thay đổi.'],
      solution:
        'Với $x > -1$ thì $1 + x > 0$, nên $(1 + x)^{k + 1} \\ge (1 + kx)(1 + x) = 1 + (k + 1)x + kx^2 \\ge 1 + (k + 1)x$. Bước cơ sở $n = 1$ là đẳng thức, đúng với mọi $x$; còn $kx^2 \\ge 0$ luôn đúng.',
    },
  ],
  takeaways: [
    'Phương pháp quy nạp gồm hai bước: bước cơ sở (kiểm tra $n = p$) và bước quy nạp (giả sử đúng với $n = k \\ge p$, chứng minh đúng với $n = k + 1$).',
    'Thiếu một trong hai bước thì không kết luận được: kiểm tra nhiều trường hợp không phải là chứng minh.',
    'Ở bước quy nạp, hãy viết rõ điều cần chứng minh $P(k + 1)$ rồi tìm cách dùng giả thiết quy nạp $P(k)$.',
    'Quy nạp dùng để chứng minh đẳng thức, bất đẳng thức, tính chia hết và các công thức như lãi kép $T_n = A(1 + r)^n$.',
  ],
};
