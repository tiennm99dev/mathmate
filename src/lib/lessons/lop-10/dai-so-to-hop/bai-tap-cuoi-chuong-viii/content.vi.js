/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VIII: quy tắc cộng, quy tắc nhân, sơ đồ hình cây, hoán vị, chỉnh hợp, tổ hợp và nhị thức Newton với n = 4, n = 5.',
  intro:
    'Chương VIII cho ta các công cụ đếm mà không phải liệt kê: quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp, rồi dùng chúng để khai triển $(a + b)^4$ và $(a + b)^5$. Bài này hệ thống lại kiến thức, luyện chọn đúng công cụ và kiểm tra đáp số bằng cách liệt kê trực tiếp.',
  objectives: [
    'Chọn đúng quy tắc cộng hay quy tắc nhân, hoán vị, chỉnh hợp hay tổ hợp cho mỗi bài toán đếm.',
    'Giải bài toán đếm có điều kiện bằng cách chia trường hợp hoặc đếm phần bù.',
    'Khai triển nhị thức Newton với $n = 4$, $n = 5$ và tìm hệ số của một số hạng.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Quy tắc cộng',
              'Công việc làm theo một trong các phương án không trùng nhau: $n_1 + n_2 + \\cdots$ cách',
            ],
            [
              'Quy tắc nhân',
              'Công việc gồm các công đoạn liên tiếp: $n_1 \\cdot n_2 \\cdots$ cách',
            ],
            ['Hoán vị', 'Sắp thứ tự $n$ phần tử: $P_n = n!$, quy ước $0! = 1$'],
            [
              'Chỉnh hợp',
              'Chọn $k$ trong $n$ phần tử có xét thứ tự: $A_n^k = \\dfrac{n!}{(n - k)!}$',
            ],
            [
              'Tổ hợp',
              'Chọn $k$ trong $n$ phần tử không xét thứ tự: $C_n^k = \\dfrac{n!}{(n - k)!\\,k!}$, $C_n^k = C_n^{n-k}$',
            ],
            ['Nhị thức Newton, $n = 4$', '$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$'],
            [
              'Nhị thức Newton, $n = 5$',
              '$(a + b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo chọn công cụ',
          text: 'Đổi chỗ hai phần tử đã chọn mà được cách mới: có xét thứ tự (chỉnh hợp, hoán vị). Không được cách mới: tổ hợp. Có điều kiện "ít nhất", "có cả": thử đếm phần bù. Có vị trí bị ràng buộc (chữ số $0$, số chẵn): chia trường hợp theo vị trí đó.',
        },
      ],
    },
    {
      heading: 'Luyện tập theo kĩ năng',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi câu dưới đây được sinh ngẫu nhiên từ một kĩ năng của chương. Trả lời sai lần đầu sẽ có gợi ý và một lần thử lại; bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Đếm bằng công thức, kiểm tra bằng liệt kê',
    instruction:
      'Chọn một bài toán, nhập đáp số tính bằng công thức rồi bấm "Kiểm tra". Bấm "Liệt kê" để máy liệt kê mọi cách và đếm trực tiếp: hai kết quả phải khớp nhau.',
  },
  examples: [
    {
      problem:
        'Một tổ có $4$ bạn nam và $3$ bạn nữ. Có bao nhiêu cách chọn $3$ bạn sao cho có cả nam và nữ?',
      steps: [
        'Cách 1 (đếm phần bù): chọn $3$ bạn tuỳ ý có $C_7^3 = 35$ cách; toàn nam có $C_4^3 = 4$ cách; toàn nữ có $C_3^3 = 1$ cách. Có $35 - 4 - 1 = 30$ cách.',
        'Cách 2 (chia trường hợp): $2$ nam, $1$ nữ có $C_4^2 \\cdot C_3^1 = 18$ cách; $1$ nam, $2$ nữ có $C_4^1 \\cdot C_3^2 = 12$ cách. Có $18 + 12 = 30$ cách.',
      ],
      answer: '$30$ cách.',
    },
    {
      problem:
        'Xếp $3$ bạn nam và $2$ bạn nữ thành một hàng ngang. Có bao nhiêu cách xếp để hai bạn nữ đứng cạnh nhau?',
      steps: [
        'Coi hai bạn nữ là một khối. Xếp khối này cùng $3$ bạn nam: $P_4 = 4! = 24$ cách.',
        'Trong khối, hai bạn nữ đổi chỗ cho nhau: $P_2 = 2$ cách.',
        'Theo quy tắc nhân có $24 \\cdot 2 = 48$ cách.',
      ],
      answer: '$48$ cách.',
    },
    {
      problem: 'Tìm hệ số của $x^3$ trong khai triển $(2x - 1)^4$.',
      steps: [
        'Viết $(2x - 1)^4 = (2x + (-1))^4$. Số hạng chứa $x^3$ là $C_4^1(2x)^3(-1)$.',
        '$C_4^1(2x)^3(-1) = 4 \\cdot 8x^3 \\cdot (-1) = -32x^3$.',
      ],
      answer: 'Hệ số là $-32$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Có bao nhiêu số tự nhiên có bốn chữ số khác nhau?',
      answer: 4536,
      unit: 'số',
      hints: [
        'Chữ số hàng nghìn khác $0$.',
        'Hàng nghìn có $9$ cách; ba hàng còn lại chọn từ các chữ số chưa dùng (kể cả $0$).',
      ],
      solution:
        'Hàng nghìn có $9$ cách, hàng trăm $9$ cách, hàng chục $8$ cách, hàng đơn vị $7$ cách: $9 \\cdot 9 \\cdot 8 \\cdot 7 = 4\\,536$ số.',
    },
    {
      type: 'number',
      prompt:
        'Trên giá có $5$ quyển sách Toán và $4$ quyển sách Văn (đôi một khác nhau). Có bao nhiêu cách chọn $2$ quyển sách khác môn?',
      answer: 20,
      unit: 'cách',
      hints: ['Chọn một quyển Toán rồi chọn một quyển Văn.'],
      solution: 'Theo quy tắc nhân có $5 \\cdot 4 = 20$ cách.',
    },
    {
      type: 'number',
      prompt:
        'Cho $8$ điểm, trong đó không có ba điểm nào thẳng hàng. Có bao nhiêu tam giác có ba đỉnh là ba trong tám điểm đó?',
      answer: 56,
      unit: 'tam giác',
      hints: ['Mỗi tam giác ứng với một cách chọn $3$ điểm, không xét thứ tự.'],
      solution: '$C_8^3 = \\dfrac{8 \\cdot 7 \\cdot 6}{3!} = 56$ tam giác.',
    },
    {
      type: 'number',
      prompt:
        'Một giải đấu có $8$ đội. Có bao nhiêu khả năng về ba đội giành huy chương vàng, bạc, đồng?',
      answer: 336,
      unit: 'khả năng',
      hints: ['Vàng, bạc, đồng là ba vị trí khác nhau: có xét thứ tự.'],
      solution: '$A_8^3 = 8 \\cdot 7 \\cdot 6 = 336$ khả năng.',
    },
    {
      type: 'number',
      prompt:
        'Trong một buổi gặp mặt có $10$ người, mỗi người bắt tay mỗi người còn lại đúng một lần. Có tất cả bao nhiêu cái bắt tay?',
      answer: 45,
      hints: ['Mỗi cái bắt tay ứng với một cặp người, không xét thứ tự.'],
      solution: '$C_{10}^2 = \\dfrac{10 \\cdot 9}{2} = 45$ cái bắt tay.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu cách xếp $5$ bạn thành một hàng dọc sao cho bạn An đứng đầu hàng?',
      answer: 24,
      unit: 'cách',
      hints: ['An đã cố định ở vị trí đầu, chỉ còn xếp $4$ bạn còn lại.'],
      solution: 'Xếp $4$ bạn còn lại vào $4$ vị trí sau: $P_4 = 4! = 24$ cách.',
    },
    {
      type: 'choice',
      prompt: 'Với $1 \\le k \\le n$, đẳng thức nào sau đây sai?',
      options: [
        '$A_n^k = A_n^{n-k}$',
        '$A_n^k = C_n^k \\cdot k!$',
        '$C_n^k = C_n^{n-k}$',
        '$A_n^n = P_n$',
      ],
      answer: 0,
      hints: ['Thử với $n = 3$, $k = 1$ cho từng đẳng thức.'],
      solution:
        'Với $n = 3$, $k = 1$: $A_3^1 = 3$ còn $A_3^2 = 6$, nên $A_n^k = A_n^{n-k}$ sai. Ba đẳng thức còn lại đúng với mọi $1 \\le k \\le n$.',
    },
    {
      type: 'multi',
      prompt: 'Những bài toán nào giải bằng tổ hợp (chọn không xét thứ tự)?',
      options: [
        'Chọn $3$ bạn trong lớp đi trực nhật.',
        'Chọn $2$ đội trong $8$ đội để đá trận khai mạc.',
        'Chọn một lớp trưởng, một lớp phó và một thủ quỹ trong lớp.',
        'Lập số có ba chữ số khác nhau từ các chữ số $1$ đến $9$.',
      ],
      answers: [0, 1],
      hints: ['Đổi chỗ hai phần tử đã chọn có tạo ra một cách mới không?'],
      solution:
        'Nhóm trực nhật và cặp đội đá khai mạc không phân biệt thứ tự: dùng tổ hợp. Ba chức vụ khác nhau và các chữ số ở các hàng khác nhau thì có xét thứ tự: dùng chỉnh hợp.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^2$ trong khai triển $(x + 1)^5$.',
      answer: 10,
      hints: ['Số hạng chứa $x^2$ là $C_5^3 x^2 \\cdot 1^3$.'],
      solution: 'Hệ số là $C_5^3 = 10$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số hạng không chứa $x$ trong khai triển $\\left(x - \\dfrac{1}{x}\\right)^4$.',
      answer: 6,
      hints: [
        'Số hạng tổng quát: $C_4^k x^{4-k}\\left(-\\dfrac{1}{x}\\right)^k = C_4^k(-1)^k x^{4-2k}$.',
        'Không chứa $x$ khi $k = 2$.',
      ],
      solution: 'Với $k = 2$: $C_4^2 \\cdot (-1)^2 = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính $C_4^0 + 2C_4^1 + 4C_4^2 + 8C_4^3 + 16C_4^4$.',
      answer: 81,
      hints: [
        'Đây là khai triển $(a + b)^4$ với $a = 1$ và một giá trị $b$ thích hợp.',
        'Các luỹ thừa $1, 2, 4, 8, 16$ là $2^0, 2^1, \\ldots, 2^4$.',
      ],
      solution:
        'Với $a = 1$, $b = 2$: $(1 + 2)^4 = C_4^0 + C_4^1 \\cdot 2 + C_4^2 \\cdot 4 + C_4^3 \\cdot 8 + C_4^4 \\cdot 16 = 3^4 = 81$ (kiểm tra: $1 + 8 + 24 + 32 + 16 = 81$).',
    },
    {
      type: 'number',
      prompt:
        'Dùng hai số hạng đầu tiên trong khai triển của $(1 - 0{,}01)^5$, tính giá trị gần đúng của $0{,}99^5$.',
      answer: 0.95,
      tolerance: 0.0001,
      hints: ['Hai số hạng đầu của $(1 + b)^5$ là $1 + 5b$, ở đây $b = -0{,}01$.'],
      solution:
        '$0{,}99^5 \\approx 1 + 5 \\cdot (-0{,}01) = 0{,}95$ (giá trị đúng khoảng $0{,}951$).',
    },
  ],
  takeaways: [
    'Một trong các phương án: cộng; lần lượt các công đoạn: nhân.',
    'Có xét thứ tự: $P_n$, $A_n^k$; không xét thứ tự: $C_n^k$; $A_n^k = C_n^k \\cdot k!$.',
    'Bài toán có điều kiện: chia trường hợp hoặc đếm phần bù; kiểm tra lại bằng liệt kê với số nhỏ.',
    'Hệ số của $a^{n-k}b^k$ trong $(a + b)^n$ là $C_n^k$; với $b$ âm nhớ giữ dấu.',
  ],
};
