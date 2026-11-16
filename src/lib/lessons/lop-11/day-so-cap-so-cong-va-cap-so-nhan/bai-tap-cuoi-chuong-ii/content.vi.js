/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương II: dãy số và cách cho dãy số, dãy tăng, giảm, bị chặn; cấp số cộng và cấp số nhân với số hạng tổng quát và tổng n số hạng đầu; so sánh lãi đơn và lãi kép, kèm bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương II nghiên cứu dãy số, một hàm số trên tập số nguyên dương, và hai loại dãy số đặc biệt: cấp số cộng, cộng thêm một số không đổi sau mỗi bước, và cấp số nhân, nhân với một số không đổi sau mỗi bước. Bài ôn tập này hệ thống lại các công thức, so sánh hai kiểu tăng trưởng qua bài toán gửi tiết kiệm và cho một bộ đề tự sinh chỉ ra bài nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá kiến thức về dãy số, cấp số cộng và cấp số nhân.',
    'Vận dụng công thức số hạng tổng quát và tổng $n$ số hạng đầu để giải toán.',
    'Phân biệt tăng trưởng theo cấp số cộng và theo cấp số nhân trong các bài toán thực tế như lãi đơn, lãi kép.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Cấp số cộng', 'Cấp số nhân'],
          rows: [
            [
              'Định nghĩa',
              '$u_n = u_{n-1} + d$ $(n \\ge 2)$',
              '$u_n = u_{n-1} \\cdot q$ $(n \\ge 2)$',
            ],
            ['Số hạng tổng quát', '$u_n = u_1 + (n - 1)d$', '$u_n = u_1 q^{n-1}$'],
            [
              'Ba số hạng liên tiếp',
              '$u_k = \\dfrac{u_{k-1} + u_{k+1}}{2}$',
              '$u_k^2 = u_{k-1} \\cdot u_{k+1}$',
            ],
            [
              'Tổng $n$ số hạng đầu',
              '$S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n\\left[2u_1 + (n - 1)d\\right]}{2}$',
              '$S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$ $(q \\ne 1)$; $S_n = nu_1$ $(q = 1)$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Dãy số $(u_n)$ là hàm số xác định trên $\\mathbb{N}^*$; có thể cho bằng liệt kê, công thức số hạng tổng quát, mô tả hoặc hệ thức truy hồi.',
            'Dãy tăng khi $u_{n+1} > u_n$, dãy giảm khi $u_{n+1} < u_n$ với mọi $n$; thường xét dấu của hiệu $u_{n+1} - u_n$.',
            'Dãy bị chặn khi có các số $m$, $M$ sao cho $m \\le u_n \\le M$ với mọi $n$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Viết $u_n = u_1 + nd$ hay $u_n = u_1 q^n$ (sai: chỉ có $n - 1$ bước từ $u_1$ đến $u_n$); dùng công thức tổng của cấp số nhân khi $q = 1$; kết luận một dãy tăng chỉ vì vài số hạng đầu tăng.',
        },
      ],
    },
    {
      heading: 'Lãi đơn và lãi kép',
      blocks: [
        {
          type: 'p',
          text: 'Gửi số tiền $P$ với lãi suất $r$ mỗi kì. Nếu tính lãi đơn, chỉ tiền gốc sinh lãi, nên sau mỗi kì số tiền tăng thêm $Pr$: số tiền sau $n$ kì là $A_n = P(1 + nr)$, một cấp số cộng với công sai $d = Pr$. Nếu tính lãi kép, tiền lãi được nhập vào gốc để sinh lãi ở kì sau, nên sau mỗi kì số tiền được nhân với $1 + r$: $B_n = P(1 + r)^n$, một cấp số nhân với công bội $q = 1 + r$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Sau kì đầu tiên hai cách tính cho cùng số tiền, nhưng sau đó lãi kép luôn nhiều hơn, và khoảng cách ngày càng lớn: cấp số nhân với $q > 1$ cuối cùng vượt xa mọi cấp số cộng.',
        },
      ],
    },
    {
      heading: 'Luyện tập tự sinh',
      blocks: [
        {
          type: 'p',
          text: 'Bộ đề dưới đây sinh ngẫu nhiên các câu hỏi của ba bài trong chương. Trả lời sai lần đầu, em được xem gợi ý và làm lại; bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Gửi tiết kiệm: lãi đơn hay lãi kép?',
    instruction:
      'Chọn số tiền gửi, lãi suất và số năm. Đường lãi đơn là các điểm của một cấp số cộng, nằm trên một đường thẳng; đường lãi kép là các điểm của một cấp số nhân, cong dần lên. Quan sát chênh lệch sau nhiều năm và số năm cần để số tiền gấp đôi.',
  },
  examples: [
    {
      problem:
        'Cho cấp số cộng $(u_n)$ có tổng $n$ số hạng đầu là $S_n = 2n^2 + 3n$. Tìm số hạng đầu và công sai.',
      steps: [
        '$u_1 = S_1 = 2 + 3 = 5$.',
        '$S_2 = 8 + 6 = 14$, nên $u_2 = S_2 - S_1 = 9$.',
        '$d = u_2 - u_1 = 4$.',
      ],
      answer: '$u_1 = 5$, $d = 4$.',
    },
    {
      problem:
        'Một công ty đề nghị hai phương án trả lương năm đầu $120$ triệu đồng. Phương án A: mỗi năm sau tăng $8$ triệu đồng so với năm trước. Phương án B: mỗi năm sau tăng $5\\%$ so với năm trước. Tính tổng lương $10$ năm theo mỗi phương án (làm tròn đến triệu đồng).',
      steps: [
        'Phương án A: lương từng năm là cấp số cộng $u_1 = 120$, $d = 8$, nên $S_{10} = \\dfrac{10(2 \\cdot 120 + 9 \\cdot 8)}{2} = 1\\,560$ (triệu đồng).',
        'Phương án B: lương từng năm là cấp số nhân $u_1 = 120$, $q = 1{,}05$, nên $S_{10} = \\dfrac{120(1 - 1{,}05^{10})}{1 - 1{,}05} \\approx 1\\,509$ (triệu đồng).',
        'Trong $10$ năm, phương án A có lợi hơn khoảng $51$ triệu đồng; với thời gian đủ dài, phương án B sẽ vượt lên.',
      ],
      answer: 'A: $1\\,560$ triệu đồng; B: khoảng $1\\,509$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho cấp số cộng $(u_n)$ có $u_1 = -3$ và $u_6 = 27$. Công sai $d$ bằng',
      options: ['$6$', '$5$', '$7$', '$8$'],
      answer: 0,
      hints: ['$u_6 = u_1 + 5d$.'],
      solution: '$-3 + 5d = 27$, nên $5d = 30$ và $d = 6$.',
    },
    {
      type: 'choice',
      prompt: 'Cho cấp số nhân $(u_n)$ có $u_1 = 2$ và $q = -3$. Số $162$ là số hạng thứ mấy?',
      options: ['Thứ $5$', 'Thứ $4$', 'Thứ $6$', 'Không là số hạng nào của cấp số nhân'],
      answer: 0,
      hints: ['Giải $2 \\cdot (-3)^{n-1} = 162$.'],
      solution: '$(-3)^{n-1} = 81 = (-3)^4$, nên $n - 1 = 4$ và $n = 5$.',
    },
    {
      type: 'choice',
      prompt: 'Dãy số nào sau đây bị chặn?',
      options: ['$u_n = \\dfrac{1}{n^2 + 1}$', '$u_n = n^2$', '$u_n = 2^n$', '$u_n = -n$'],
      answer: 0,
      hints: ['Một dãy bị chặn khi mọi số hạng nằm giữa hai số cố định.'],
      solution:
        'Với mọi $n$, $0 < \\dfrac{1}{n^2 + 1} \\le \\dfrac{1}{2}$, nên dãy này bị chặn. Các dãy $n^2$ và $2^n$ không bị chặn trên, dãy $-n$ không bị chặn dưới.',
    },
    {
      type: 'multi',
      prompt: 'Cho dãy số $(u_n)$ với $u_n = 3 \\cdot 2^n$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$(u_n)$ là cấp số nhân với công bội $q = 2$.',
        'Số hạng đầu là $u_1 = 6$.',
        '$(u_n)$ là dãy số tăng.',
        '$(u_n)$ là cấp số cộng.',
        '$(u_n)$ bị chặn trên.',
      ],
      answers: [0, 1, 2],
      hints: ['Tính $\\dfrac{u_{n+1}}{u_n}$ và $u_{n+1} - u_n$.'],
      solution:
        '$\\dfrac{u_{n+1}}{u_n} = 2$ nên dãy là cấp số nhân với $q = 2$, $u_1 = 3 \\cdot 2 = 6$. Hiệu $u_{n+1} - u_n = 3 \\cdot 2^n > 0$ thay đổi theo $n$, nên dãy tăng nhưng không là cấp số cộng; các số hạng lớn tuỳ ý nên dãy không bị chặn trên.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng $2 + 4 + 6 + \\cdots + 100$.',
      answer: 2550,
      hints: [
        'Đây là cấp số cộng $u_1 = 2$, $d = 2$; có bao nhiêu số hạng?',
        '$100 = 2 + (n - 1) \\cdot 2$ cho $n = 50$.',
      ],
      solution: 'Có $50$ số hạng, nên tổng là $\\dfrac{50(2 + 100)}{2} = 2\\,550$.',
    },
    {
      type: 'number',
      prompt: 'Cấp số cộng $(u_n)$ có tổng $n$ số hạng đầu là $S_n = 3n^2 - n$. Tìm công sai $d$.',
      answer: 6,
      hints: ['$u_1 = S_1$ và $u_2 = S_2 - S_1$.'],
      solution: '$u_1 = S_1 = 2$, $S_2 = 12 - 2 = 10$, nên $u_2 = 8$ và $d = u_2 - u_1 = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Ba số lập thành một cấp số cộng có tổng bằng $15$ và tích bằng $105$. Tìm số lớn nhất trong ba số đó.',
      answer: 7,
      hints: ['Gọi ba số là $a - d$, $a$, $a + d$.', 'Tổng bằng $3a = 15$; thay $a = 5$ vào tích.'],
      solution:
        '$3a = 15$ nên $a = 5$. Tích $(5 - d) \\cdot 5 \\cdot (5 + d) = 105$ cho $25 - d^2 = 21$, $d = \\pm 2$. Ba số là $3, 5, 7$; số lớn nhất là $7$.',
    },
    {
      type: 'number',
      prompt: 'Cấp số nhân $(u_n)$ có công bội $q = 3$ và $u_1 + u_2 + u_3 = 13$. Tính $u_5$.',
      answer: 81,
      hints: ['$u_1 + u_1 q + u_1 q^2 = u_1(1 + 3 + 9)$.'],
      solution: '$13u_1 = 13$ nên $u_1 = 1$ và $u_5 = 1 \\cdot 3^4 = 81$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính tổng $1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\cdots + \\dfrac{1}{2^9}$ (viết dưới dạng phân số tối giản).',
      answer: [1023, 512],
      simplest: true,
      hints: ['Đây là $10$ số hạng đầu của cấp số nhân $u_1 = 1$, $q = \\dfrac{1}{2}$.'],
      solution:
        '$S_{10} = \\dfrac{1 - \\left(\\frac{1}{2}\\right)^{10}}{1 - \\frac{1}{2}} = 2\\left(1 - \\dfrac{1}{1024}\\right) = \\dfrac{1023}{512}$.',
    },
    {
      type: 'number',
      prompt:
        'Một người gửi $200$ triệu đồng, lãi suất $6\\%$ một năm theo hình thức lãi kép. Sau ít nhất bao nhiêu năm thì số tiền vượt $300$ triệu đồng?',
      answer: 7,
      unit: 'năm',
      hints: [
        'Cần $200 \\cdot 1{,}06^n > 300$, tức là $1{,}06^n > 1{,}5$.',
        'Tính lần lượt $1{,}06^6$ và $1{,}06^7$.',
      ],
      solution:
        '$1{,}06^6 \\approx 1{,}4185 < 1{,}5$ và $1{,}06^7 \\approx 1{,}5036 > 1{,}5$. Vậy sau ít nhất $7$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với $200$ triệu đồng và lãi suất $6\\%$ một năm nhưng tính lãi đơn, sau ít nhất bao nhiêu năm thì số tiền vượt $300$ triệu đồng?',
      answer: 9,
      unit: 'năm',
      hints: ['Mỗi năm được thêm $200 \\cdot 6\\% = 12$ triệu đồng.', 'Cần $200 + 12n > 300$.'],
      solution:
        '$12n > 100$ cho $n > 8{,}33$, nên cần ít nhất $9$ năm (sau $8$ năm mới có $296$ triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Theo phương án B ở ví dụ (lương năm đầu $120$ triệu đồng, mỗi năm sau tăng $5\\%$), lương của năm thứ $10$ là bao nhiêu triệu đồng? (Làm tròn đến hàng đơn vị.)',
      answer: 186,
      tolerance: 0.5,
      unit: 'triệu đồng',
      hints: ['Lương năm thứ $n$ là $u_n = 120 \\cdot 1{,}05^{n-1}$.'],
      solution:
        '$u_{10} = 120 \\cdot 1{,}05^9 \\approx 120 \\cdot 1{,}5513 \\approx 186$ triệu đồng.',
    },
  ],
  takeaways: [
    'Cấp số cộng: $u_n = u_1 + (n - 1)d$, $S_n = \\dfrac{n(u_1 + u_n)}{2}$.',
    'Cấp số nhân: $u_n = u_1 q^{n-1}$, $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$ $(q \\ne 1)$.',
    'Lãi đơn tăng theo cấp số cộng, lãi kép tăng theo cấp số nhân; về lâu dài lãi kép vượt xa lãi đơn.',
  ],
};
