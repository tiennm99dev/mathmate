/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vectơ pháp tuyến và vectơ chỉ phương của đường thẳng, phương trình tổng quát, phương trình tham số và cách viết phương trình đường thẳng đi qua hai điểm.',
  intro:
    'Trên mặt phẳng toạ độ, một đường thẳng là vô số điểm. Muốn "gọi tên" nó bằng một hệ thức giữa $x$ và $y$, ta chỉ cần biết một điểm nó đi qua và một hướng: hướng của chính nó (vectơ chỉ phương) hoặc hướng vuông góc với nó (vectơ pháp tuyến).',
  objectives: [
    'Nhận biết vectơ pháp tuyến, vectơ chỉ phương của đường thẳng và mối liên hệ giữa chúng.',
    'Viết phương trình tổng quát của đường thẳng đi qua một điểm và có vectơ pháp tuyến cho trước.',
    'Viết phương trình tham số của đường thẳng đi qua một điểm và có vectơ chỉ phương cho trước.',
    'Viết phương trình đường thẳng đi qua hai điểm; chuyển đổi giữa hai dạng phương trình.',
  ],
  sections: [
    {
      heading: 'Phương trình tổng quát của đường thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ pháp tuyến',
          text: 'Vectơ $\\vec n$ được gọi là vectơ pháp tuyến của đường thẳng $\\Delta$ nếu $\\vec n \\ne \\vec 0$ và giá của $\\vec n$ vuông góc với $\\Delta$.',
        },
        {
          type: 'p',
          text: 'Nếu $\\vec n$ là một vectơ pháp tuyến của $\\Delta$ thì $k\\vec n$ ($k \\ne 0$) cũng là một vectơ pháp tuyến của $\\Delta$. Một đường thẳng hoàn toàn được xác định khi biết một điểm thuộc nó và một vectơ pháp tuyến.',
        },
        {
          type: 'p',
          text: 'Cho $\\Delta$ đi qua $M_0(x_0; y_0)$ và có vectơ pháp tuyến $\\vec n = (a; b)$. Điểm $M(x; y)$ thuộc $\\Delta$ khi và chỉ khi $\\overrightarrow{M_0M} \\perp \\vec n$, tức là $\\vec n \\cdot \\overrightarrow{M_0M} = 0$:',
        },
        {
          type: 'tex',
          tex: 'a(x - x_0) + b(y - y_0) = 0 \\Leftrightarrow ax + by + c = 0,\\quad c = -ax_0 - by_0.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình tổng quát',
          text: 'Mọi đường thẳng đều có phương trình dạng $ax + by + c = 0$, với $a$, $b$ không đồng thời bằng $0$. Ngược lại, mỗi phương trình dạng đó là phương trình của một đường thẳng nhận $\\vec n = (a; b)$ làm một vectơ pháp tuyến.',
        },
        {
          type: 'list',
          items: [
            'Nếu $a = 0$ (và $b \\ne 0$), phương trình trở thành $y = -\\dfrac{c}{b}$: đường thẳng song song hoặc trùng với trục $Ox$.',
            'Nếu $b = 0$ (và $a \\ne 0$), phương trình trở thành $x = -\\dfrac{c}{a}$: đường thẳng song song hoặc trùng với trục $Oy$.',
            'Nếu $c = 0$, đường thẳng đi qua gốc toạ độ $O$.',
            'Nếu $b \\ne 0$, có thể viết $y = -\\dfrac{a}{b}x - \\dfrac{c}{b}$: đó là đồ thị của hàm số bậc nhất (khi $a \\ne 0$) hoặc hàm hằng.',
          ],
        },
      ],
    },
    {
      heading: 'Phương trình tham số của đường thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ chỉ phương',
          text: 'Vectơ $\\vec u$ được gọi là vectơ chỉ phương của đường thẳng $\\Delta$ nếu $\\vec u \\ne \\vec 0$ và giá của $\\vec u$ song song hoặc trùng với $\\Delta$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Liên hệ giữa hai vectơ',
          text: 'Vectơ chỉ phương và vectơ pháp tuyến của một đường thẳng vuông góc với nhau. Nếu $\\vec n = (a; b)$ là một vectơ pháp tuyến của $\\Delta$ thì $\\vec u = (-b; a)$ (hoặc $(b; -a)$) là một vectơ chỉ phương của $\\Delta$, và ngược lại: đổi chỗ hai toạ độ rồi đổi dấu một toạ độ.',
        },
        {
          type: 'p',
          text: 'Cho $\\Delta$ đi qua $A(x_0; y_0)$ và có vectơ chỉ phương $\\vec u = (a; b)$. Điểm $M(x; y)$ thuộc $\\Delta$ khi và chỉ khi $\\overrightarrow{AM} = t\\vec u$ với một số thực $t$ nào đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình tham số',
          text: 'Hệ $\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\end{cases}$ ($a^2 + b^2 > 0$, $t$ là tham số) được gọi là phương trình tham số của đường thẳng $\\Delta$. Mỗi giá trị của $t$ cho đúng một điểm của $\\Delta$, và ngược lại.',
        },
        {
          type: 'p',
          text: 'Đường thẳng đi qua hai điểm phân biệt $A$, $B$ nhận $\\overrightarrow{AB}$ làm một vectơ chỉ phương. Từ đó ta viết được phương trình tham số, rồi đổi sang vectơ pháp tuyến để viết phương trình tổng quát.',
        },
        {
          type: 'table',
          head: ['Biết', 'Cách làm'],
          rows: [
            ['Một điểm và $\\vec n = (a; b)$', 'Viết $a(x - x_0) + b(y - y_0) = 0$ rồi rút gọn.'],
            [
              'Một điểm và $\\vec u = (a; b)$',
              'Viết phương trình tham số; hoặc lấy $\\vec n = (b; -a)$.',
            ],
            [
              'Hai điểm $A$, $B$',
              'Lấy $\\vec u = \\overrightarrow{AB}$ (hoặc một vectơ cùng phương gọn hơn).',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đường thẳng qua hai điểm',
    instruction:
      'Kéo hai điểm $A$, $B$ (hoặc chọn rồi dùng phím mũi tên). Vectơ chỉ phương $\\vec u = \\overrightarrow{AB}$, vectơ pháp tuyến $\\vec n$ và hai dạng phương trình của đường thẳng $\\Delta$ được tính lại ngay. Thử đặt $\\Delta$ song song với một trục hoặc đi qua $O$.',
  },
  examples: [
    {
      problem:
        'Viết phương trình tổng quát của đường thẳng $\\Delta$ đi qua $M(-1; 2)$ và có vectơ pháp tuyến $\\vec n = (3; -2)$.',
      steps: [
        'Phương trình có dạng $a(x - x_0) + b(y - y_0) = 0$ với $a = 3$, $b = -2$, $x_0 = -1$, $y_0 = 2$.',
        '$3(x + 1) - 2(y - 2) = 0 \\Leftrightarrow 3x + 3 - 2y + 4 = 0$.',
        'Rút gọn: $3x - 2y + 7 = 0$.',
      ],
      answer: '$\\Delta: 3x - 2y + 7 = 0$.',
    },
    {
      problem:
        'Cho hai điểm $A(2; -1)$ và $B(4; 3)$. Viết phương trình tham số và phương trình tổng quát của đường thẳng $AB$.',
      steps: [
        '$\\overrightarrow{AB} = (2; 4) = 2(1; 2)$, nên $\\vec u = (1; 2)$ là một vectơ chỉ phương của $AB$.',
        'Phương trình tham số qua $A$: $\\begin{cases} x = 2 + t \\\\ y = -1 + 2t \\end{cases}$.',
        'Vectơ pháp tuyến: $\\vec n = (2; -1)$. Phương trình tổng quát: $2(x - 2) - (y + 1) = 0 \\Leftrightarrow 2x - y - 5 = 0$.',
        'Kiểm tra với $B$: $2 \\cdot 4 - 3 - 5 = 0$, đúng.',
      ],
      answer: '$\\begin{cases} x = 2 + t \\\\ y = -1 + 2t \\end{cases}$ và $2x - y - 5 = 0$.',
    },
    {
      problem:
        'Cho đường thẳng $\\Delta: \\begin{cases} x = 1 + 2t \\\\ y = 3 - t \\end{cases}$. Viết phương trình tổng quát của $\\Delta$. Điểm $M(5; 1)$ có thuộc $\\Delta$ không?',
      steps: [
        '$\\Delta$ đi qua $A(1; 3)$ và có vectơ chỉ phương $\\vec u = (2; -1)$, nên có vectơ pháp tuyến $\\vec n = (1; 2)$.',
        'Phương trình tổng quát: $(x - 1) + 2(y - 3) = 0 \\Leftrightarrow x + 2y - 7 = 0$.',
        'Thay $M(5; 1)$: $5 + 2 \\cdot 1 - 7 = 0$, nên $M \\in \\Delta$ (ứng với $t = 2$).',
      ],
      answer: '$x + 2y - 7 = 0$; $M$ thuộc $\\Delta$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một vectơ pháp tuyến của đường thẳng $2x - 3y + 5 = 0$ là',
      options: ['$(2; -3)$', '$(2; 3)$', '$(3; 2)$', '$(-3; 2)$'],
      answer: 0,
      hints: ['Đường thẳng $ax + by + c = 0$ nhận $(a; b)$ làm vectơ pháp tuyến.'],
      solution: 'Ở đây $a = 2$, $b = -3$, nên $\\vec n = (2; -3)$.',
    },
    {
      type: 'choice',
      prompt: 'Một vectơ chỉ phương của đường thẳng $2x - 3y + 5 = 0$ là',
      options: ['$(3; 2)$', '$(2; -3)$', '$(2; 3)$', '$(-3; 2)$'],
      answer: 0,
      hints: [
        'Vectơ pháp tuyến là $(2; -3)$.',
        'Từ $\\vec n = (a; b)$ suy ra $\\vec u = (-b; a)$.',
      ],
      solution:
        '$\\vec n = (2; -3)$ nên $\\vec u = (3; 2)$. Kiểm tra: $\\vec n \\cdot \\vec u = 6 - 6 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Một vectơ pháp tuyến của đường thẳng $y = 2x + 3$ là',
      options: ['$(2; -1)$', '$(2; 1)$', '$(1; 2)$', '$(-1; 2)$'],
      answer: 0,
      hints: ['Chuyển về dạng tổng quát $ax + by + c = 0$.'],
      solution: '$y = 2x + 3 \\Leftrightarrow 2x - y + 3 = 0$, nên $\\vec n = (2; -1)$.',
    },
    {
      type: 'choice',
      prompt:
        'Phương trình tổng quát của đường thẳng đi qua $A(1; 2)$ và có vectơ pháp tuyến $\\vec n = (2; -1)$ là',
      options: ['$2x - y = 0$', '$2x - y + 3 = 0$', '$x + 2y - 5 = 0$', '$x - 2y + 3 = 0$'],
      answer: 0,
      hints: ['Dùng $a(x - x_0) + b(y - y_0) = 0$.'],
      solution: '$2(x - 1) - (y - 2) = 0 \\Leftrightarrow 2x - y = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\Delta: \\begin{cases} x = 3 - 2t \\\\ y = 1 + 4t \\end{cases}$. Điểm $M$ thuộc $\\Delta$ có tung độ bằng $9$. Tìm hoành độ của $M$.',
      answer: -1,
      hints: ['Giải $1 + 4t = 9$ để tìm $t$.', 'Thay $t$ vừa tìm vào $x = 3 - 2t$.'],
      solution: '$1 + 4t = 9 \\Rightarrow t = 2$, nên $x = 3 - 2 \\cdot 2 = -1$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phương trình của đường thẳng đi qua $A(0; 1)$ và $B(2; 5)$.',
      options: [
        '$2x - y + 1 = 0$',
        '$\\begin{cases} x = t \\\\ y = 1 + 2t \\end{cases}$',
        '$\\begin{cases} x = 2 + 2t \\\\ y = 5 + 4t \\end{cases}$',
        '$x - 2y + 2 = 0$',
        '$y = 2x - 1$',
      ],
      answers: [0, 1, 2],
      hints: [
        '$\\overrightarrow{AB} = (2; 4)$, cùng phương với $(1; 2)$.',
        'Một phương trình đúng phải được thoả mãn bởi cả $A$ và $B$.',
      ],
      solution:
        'Đường thẳng $AB$ có vectơ chỉ phương $(1; 2)$ và pháp tuyến $(2; -1)$: $2x - (y - 1) = 0 \\Leftrightarrow 2x - y + 1 = 0$. Hai hệ tham số đi qua $A$ (với $t = 0$) hoặc $B$ và có vectơ chỉ phương $(1; 2)$ hoặc $(2; 4)$, nên đều đúng. $x - 2y + 2 = 0$ đi qua $A$ nhưng không qua $B$ ($2 - 10 + 2 \\ne 0$); $y = 2x - 1$ không qua $A$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $3x + 4y - 12 = 0$ cắt trục $Ox$ tại $A$ và trục $Oy$ tại $B$. Tính diện tích tam giác $OAB$.',
      answer: 6,
      hints: ['Cho $y = 0$ để tìm $A$, cho $x = 0$ để tìm $B$.', 'Tam giác $OAB$ vuông tại $O$.'],
      solution:
        '$A(4; 0)$, $B(0; 3)$. $S_{OAB} = \\dfrac{1}{2} \\cdot OA \\cdot OB = \\dfrac{1}{2} \\cdot 4 \\cdot 3 = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $\\Delta$ đi qua $M(1; -2)$ và song song với $d: 2x - y + 3 = 0$ có phương trình $2x - y + c = 0$. Tìm $c$.',
      answer: -4,
      hints: [
        'Hai đường thẳng song song có chung vectơ pháp tuyến, nên $\\Delta$ có dạng $2x - y + c = 0$.',
        'Thay toạ độ $M$ vào phương trình.',
      ],
      solution: '$2 \\cdot 1 - (-2) + c = 0 \\Rightarrow c = -4$. Vậy $\\Delta: 2x - y - 4 = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $\\Delta$ đi qua $A(-1; 2)$ và vuông góc với $d: x - 3y + 1 = 0$ có phương trình $3x + y + c = 0$. Tìm $c$.',
      answer: 1,
      hints: [
        '$\\Delta \\perp d$ nên vectơ chỉ phương $(3; 1)$ của $d$ là vectơ pháp tuyến của $\\Delta$.',
        'Viết $3(x + 1) + (y - 2) = 0$ rồi rút gọn.',
      ],
      solution: '$3(x + 1) + (y - 2) = 0 \\Leftrightarrow 3x + y + 1 = 0$, nên $c = 1$.',
    },
  ],
  takeaways: [
    'Vectơ pháp tuyến $\\vec n = (a; b)$ vuông góc với đường thẳng; vectơ chỉ phương $\\vec u = (-b; a)$ nằm theo đường thẳng.',
    'Qua $M_0(x_0; y_0)$, có pháp tuyến $(a; b)$: $a(x - x_0) + b(y - y_0) = 0$, rút gọn thành $ax + by + c = 0$.',
    'Qua $A(x_0; y_0)$, có chỉ phương $(a; b)$: $x = x_0 + at$, $y = y_0 + bt$.',
    'Qua hai điểm $A$, $B$: lấy $\\overrightarrow{AB}$ làm vectơ chỉ phương.',
  ],
};
