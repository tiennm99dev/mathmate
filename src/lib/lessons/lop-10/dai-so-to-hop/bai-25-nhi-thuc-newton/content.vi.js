/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhị thức Newton: khai triển (a + b)^4 và (a + b)^5 với các hệ số là số tổ hợp, tam giác Pascal và ứng dụng tính gần đúng.',
  intro:
    'Ở lớp 8 ta đã biết $(a + b)^2 = a^2 + 2ab + b^2$ và $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. Muốn khai triển $(a + b)^4$ hay $(a + b)^5$ mà không phải nhân từng ngoặc, ta dùng sơ đồ hình cây và các số tổ hợp $C_n^k$ vừa học.',
  objectives: [
    'Giải thích vì sao hệ số của $a^{n-k}b^k$ trong khai triển $(a + b)^n$ là $C_n^k$.',
    'Khai triển $(a + b)^4$ và $(a + b)^5$, áp dụng để khai triển các biểu thức như $(x - 2)^4$, $(2x + 1)^5$.',
    'Tìm hệ số của một số hạng và dùng khai triển để tính gần đúng.',
  ],
  sections: [
    {
      heading: 'Hệ số của khai triển là số tổ hợp',
      blocks: [
        {
          type: 'p',
          text: 'Viết $(a + b)^3 = (a + b)(a + b)(a + b)$. Khi nhân ra, mỗi số hạng có được bằng cách chọn từ mỗi ngoặc một chữ $a$ hoặc $b$ (sơ đồ hình cây có $2^3 = 8$ nhánh cuối). Số hạng $a^2b$ xuất hiện mỗi khi ta chọn $b$ ở đúng $1$ trong $3$ ngoặc, có $C_3^1 = 3$ cách, nên hệ số của $a^2b$ là $3$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Trong khai triển $(a + b)^n$, hệ số của $a^{n-k}b^k$ bằng số cách chọn $k$ ngoặc (trong $n$ ngoặc) để lấy $b$, tức là $C_n^k$.',
        },
        {
          type: 'tex',
          tex: '(a + b)^3 = C_3^0a^3 + C_3^1a^2b + C_3^2ab^2 + C_3^3b^3 = a^3 + 3a^2b + 3ab^2 + b^3',
        },
      ],
    },
    {
      heading: 'Khai triển (a + b)⁴ và (a + b)⁵',
      blocks: [
        {
          type: 'tex',
          tex: '\\begin{aligned}(a + b)^4 &= C_4^0a^4 + C_4^1a^3b + C_4^2a^2b^2 + C_4^3ab^3 + C_4^4b^4 \\\\ &= a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4\\end{aligned}',
        },
        {
          type: 'tex',
          tex: '\\begin{aligned}(a + b)^5 &= C_5^0a^5 + C_5^1a^4b + C_5^2a^3b^2 + C_5^3a^2b^3 + C_5^4ab^4 + C_5^5b^5 \\\\ &= a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5\\end{aligned}',
        },
        {
          type: 'p',
          text: 'Các công thức trên gọi là công thức nhị thức Newton (gọi tắt là nhị thức Newton) ứng với $n = 4$ và $n = 5$.',
        },
        {
          type: 'list',
          items: [
            'Khai triển $(a + b)^n$ có $n + 1$ số hạng.',
            'Số mũ của $a$ giảm dần từ $n$ về $0$, số mũ của $b$ tăng dần từ $0$ lên $n$; tổng hai số mũ luôn bằng $n$.',
            'Các hệ số cách đều hai đầu thì bằng nhau, vì $C_n^k = C_n^{n-k}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi $b$ là số âm, chẳng hạn $(x - 2)^4 = (x + (-2))^4$, hãy thay $b = -2$ kèm dấu ngoặc: các số hạng chứa $b$ mũ lẻ mang dấu trừ.',
        },
      ],
    },
    {
      heading: 'Tam giác Pascal',
      blocks: [
        {
          type: 'p',
          text: 'Xếp các hệ số $C_n^0, C_n^1, \\ldots, C_n^n$ của từng khai triển thành từng hàng, ta được tam giác Pascal. Hai đầu mỗi hàng là $1$, mỗi số bên trong bằng tổng hai số đứng ngay trên nó.',
        },
        {
          type: 'table',
          caption: 'Tam giác Pascal đến hàng 5',
          head: ['$n$', 'Hệ số của $(a + b)^n$'],
          rows: [
            ['$1$', '$1 \\quad 1$'],
            ['$2$', '$1 \\quad 2 \\quad 1$'],
            ['$3$', '$1 \\quad 3 \\quad 3 \\quad 1$'],
            ['$4$', '$1 \\quad 4 \\quad 6 \\quad 4 \\quad 1$'],
            ['$5$', '$1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1$'],
          ],
        },
        {
          type: 'p',
          text: 'Thay $a = b = 1$ vào khai triển ta được tổng các số trên hàng $n$: $C_n^0 + C_n^1 + \\cdots + C_n^n = 2^n$. Chẳng hạn $1 + 4 + 6 + 4 + 1 = 16 = 2^4$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tam giác Pascal',
    instruction:
      'Chạm vào một số trong tam giác Pascal: hàng của nó cho khai triển tương ứng, số hạng ứng với ô được tô màu, hai ô phía trên cộng lại ra số đó. Đổi nhị thức để xem hệ số thay đổi thế nào khi $a$, $b$ là $2x$, $-2$, …',
  },
  examples: [
    {
      problem: 'Khai triển $(x - 2)^4$.',
      steps: [
        'Áp dụng khai triển $(a + b)^4$ với $a = x$, $b = -2$.',
        '$(x - 2)^4 = x^4 + 4x^3(-2) + 6x^2(-2)^2 + 4x(-2)^3 + (-2)^4$.',
        'Tính từng số hạng: $x^4 - 8x^3 + 24x^2 - 32x + 16$.',
      ],
      answer: '$(x - 2)^4 = x^4 - 8x^3 + 24x^2 - 32x + 16$.',
    },
    {
      problem: 'Khai triển $(2x + 1)^5$.',
      steps: [
        'Áp dụng khai triển $(a + b)^5$ với $a = 2x$, $b = 1$.',
        '$(2x + 1)^5 = (2x)^5 + 5(2x)^4 + 10(2x)^3 + 10(2x)^2 + 5(2x) + 1$.',
        '$= 32x^5 + 5 \\cdot 16x^4 + 10 \\cdot 8x^3 + 10 \\cdot 4x^2 + 10x + 1$.',
      ],
      answer: '$(2x + 1)^5 = 32x^5 + 80x^4 + 80x^3 + 40x^2 + 10x + 1$.',
    },
    {
      problem:
        'Dùng hai số hạng đầu tiên trong khai triển của $(1 + 0{,}05)^4$ để tính giá trị gần đúng của $1{,}05^4$. So sánh với giá trị đúng.',
      steps: [
        '$(1 + 0{,}05)^4 = 1 + 4 \\cdot 0{,}05 + 6 \\cdot 0{,}05^2 + 4 \\cdot 0{,}05^3 + 0{,}05^4$.',
        'Các số hạng sau chứa $0{,}05^2 = 0{,}0025$ trở đi nên rất nhỏ. Lấy hai số hạng đầu: $1{,}05^4 \\approx 1 + 4 \\cdot 0{,}05 = 1{,}2$.',
        'Máy tính cho $1{,}05^4 = 1{,}21550625$, nên sai số tuyệt đối là $1{,}21550625 - 1{,}2 = 0{,}01550625$.',
      ],
      answer: '$1{,}05^4 \\approx 1{,}2$, sai số tuyệt đối khoảng $0{,}0155$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khai triển của $(a + b)^4$ là',
      options: [
        '$a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$',
        '$a^4 + 4a^3b + 4a^2b^2 + 4ab^3 + b^4$',
        '$a^4 + 3a^3b + 6a^2b^2 + 3ab^3 + b^4$',
        '$a^4 + b^4$',
      ],
      answer: 0,
      hints: ['Các hệ số là hàng $4$ của tam giác Pascal: $C_4^0, C_4^1, \\ldots, C_4^4$.'],
      solution:
        'Hàng $4$ của tam giác Pascal là $1, 4, 6, 4, 1$, nên $(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$.',
    },
    {
      type: 'number',
      prompt: 'Khai triển $(a + b)^5$ có bao nhiêu số hạng?',
      answer: 6,
      unit: 'số hạng',
      hints: ['Số mũ của $b$ chạy từ $0$ đến $5$.'],
      solution: 'Khai triển $(a + b)^n$ có $n + 1$ số hạng, nên $(a + b)^5$ có $6$ số hạng.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^3$ trong khai triển $(x + 2)^5$.',
      answer: 40,
      hints: ['Số hạng chứa $x^{5-k}$ là $C_5^k x^{5-k} \\cdot 2^k$.', '$x^3$ ứng với $k = 2$.'],
      solution:
        'Với $k = 2$: $C_5^2 \\cdot x^3 \\cdot 2^2 = 10 \\cdot 4x^3 = 40x^3$. Hệ số là $40$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^4$ trong khai triển $(3x - 1)^5$.',
      answer: -405,
      hints: [
        'Viết $(3x - 1)^5 = (3x + (-1))^5$; số hạng chứa $x^4$ là $C_5^1(3x)^4(-1)$.',
        '$(3x)^4 = 81x^4$.',
      ],
      solution:
        '$C_5^1 \\cdot (3x)^4 \\cdot (-1) = 5 \\cdot 81x^4 \\cdot (-1) = -405x^4$. Hệ số là $-405$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số của $x^2$ trong khai triển $(1 - 3x)^4$.',
      answer: 54,
      hints: ['Số hạng chứa $x^2$ là $C_4^2 \\cdot 1^2 \\cdot (-3x)^2$.'],
      solution: '$C_4^2 \\cdot (-3x)^2 = 6 \\cdot 9x^2 = 54x^2$. Hệ số là $54$.',
    },
    {
      type: 'choice',
      prompt: 'Số hạng không chứa $x$ trong khai triển $(x - 2)^4$ là',
      options: ['$16$', '$-16$', '$8$', '$-8$'],
      answer: 0,
      hints: ['Số hạng không chứa $x$ là số hạng cuối, $(-2)^4$.'],
      solution: 'Số hạng cuối của khai triển là $(-2)^4 = 16$, mũ chẵn nên mang dấu cộng.',
    },
    {
      type: 'number',
      prompt: 'Tìm số hạng không chứa $x$ trong khai triển $\\left(x + \\dfrac{2}{x}\\right)^4$.',
      answer: 24,
      hints: [
        'Số hạng tổng quát: $C_4^k x^{4-k}\\left(\\dfrac{2}{x}\\right)^k = C_4^k 2^k x^{4-2k}$.',
        'Không chứa $x$ khi $4 - 2k = 0$.',
      ],
      solution: 'Với $k = 2$: $C_4^2 \\cdot 2^2 = 6 \\cdot 4 = 24$.',
    },
    {
      type: 'number',
      prompt: 'Tính $C_5^0 + C_5^1 + C_5^2 + C_5^3 + C_5^4 + C_5^5$.',
      answer: 32,
      hints: ['Thay $a = b = 1$ vào khai triển $(a + b)^5$.'],
      solution:
        '$(1 + 1)^5 = C_5^0 + C_5^1 + \\cdots + C_5^5$, nên tổng bằng $2^5 = 32$ (kiểm tra: $1 + 5 + 10 + 10 + 5 + 1 = 32$).',
    },
    {
      type: 'number',
      prompt:
        'Dùng hai số hạng đầu tiên trong khai triển của $(1 + 0{,}02)^5$, tính giá trị gần đúng của $1{,}02^5$.',
      answer: 1.1,
      tolerance: 0.0001,
      hints: ['Hai số hạng đầu của $(1 + b)^5$ là $1 + 5b$.'],
      solution: '$1{,}02^5 \\approx 1 + 5 \\cdot 0{,}02 = 1{,}1$ (giá trị đúng khoảng $1{,}104$).',
    },
    {
      type: 'number',
      prompt:
        'Dân số một tỉnh hiện nay khoảng $800$ nghìn người, tỉ lệ tăng dân số mỗi năm là $1{,}5\\%$. Dùng hai số hạng đầu tiên trong khai triển của $(1 + 0{,}015)^5$, ước tính dân số tỉnh đó sau $5$ năm (theo nghìn người).',
      answer: 860,
      hints: [
        'Sau $5$ năm, dân số là $800 \\cdot (1 + 0{,}015)^5$ nghìn người.',
        '$(1 + 0{,}015)^5 \\approx 1 + 5 \\cdot 0{,}015$.',
      ],
      solution:
        '$800 \\cdot (1 + 0{,}015)^5 \\approx 800 \\cdot (1 + 0{,}075) = 800 \\cdot 1{,}075 = 860$ nghìn người.',
    },
  ],
  takeaways: [
    'Hệ số của $a^{n-k}b^k$ trong $(a + b)^n$ là $C_n^k$.',
    '$(a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$.',
    '$(a + b)^5 = a^5 + 5a^4b + 10a^3b^2 + 10a^2b^3 + 5ab^4 + b^5$.',
    'Tam giác Pascal: hai đầu là $1$, mỗi số bên trong bằng tổng hai số ngay trên nó; tổng hàng $n$ bằng $2^n$.',
    'Với $b$ âm, giữ dấu ngoặc: số hạng mũ lẻ của $b$ mang dấu trừ.',
  ],
};
