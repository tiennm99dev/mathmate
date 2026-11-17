/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vectơ chỉ phương, phương trình tham số và phương trình chính tắc của đường thẳng trong không gian; đường thẳng đi qua hai điểm; vị trí tương đối của hai đường thẳng: trùng nhau, song song, cắt nhau, chéo nhau.',
  intro:
    'Hai chiếc máy bay bay theo hai đường thẳng ở hai độ cao khác nhau. Nhìn từ mặt đất, hai đường bay có vẻ cắt nhau, nhưng thực ra chúng có thể không bao giờ gặp nhau. Trong không gian, ngoài song song và cắt nhau, hai đường thẳng còn có thể chéo nhau. Phương trình đường thẳng giúp ta mô tả đường bay và kiểm tra chính xác hai đường ấy ở vị trí nào.',
  objectives: [
    'Nhận biết vectơ chỉ phương của đường thẳng; viết phương trình tham số, phương trình chính tắc của đường thẳng.',
    'Lập phương trình đường thẳng đi qua một điểm và biết vectơ chỉ phương, đi qua hai điểm.',
    'Xác định vị trí tương đối của hai đường thẳng: trùng nhau, song song, cắt nhau, chéo nhau; nhận biết hai đường thẳng vuông góc.',
  ],
  sections: [
    {
      heading: 'Phương trình của đường thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ chỉ phương',
          text: 'Vectơ $\\vec{u} \\ne \\vec{0}$ được gọi là vectơ chỉ phương của đường thẳng $\\Delta$ nếu giá của $\\vec{u}$ song song hoặc trùng với $\\Delta$. Nếu $\\vec{u}$ là vectơ chỉ phương của $\\Delta$ thì $k\\vec{u}$ ($k \\ne 0$) cũng vậy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình tham số',
          text: 'Đường thẳng $\\Delta$ đi qua $M_0(x_0; y_0; z_0)$ và có vectơ chỉ phương $\\vec{u} = (a; b; c)$ có phương trình tham số',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} x = x_0 + at \\\\ y = y_0 + bt \\\\ z = z_0 + ct \\end{cases} \\quad (t \\in \\mathbb{R}).',
        },
        {
          type: 'p',
          text: 'Mỗi giá trị của tham số $t$ cho một điểm của $\\Delta$, vì $M \\in \\Delta \\iff \\overrightarrow{M_0M} = t\\vec{u}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình chính tắc',
          text: 'Nếu $a$, $b$, $c$ đều khác $0$ thì $\\Delta$ có phương trình chính tắc $\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$.',
        },
        {
          type: 'p',
          text: 'Đường thẳng đi qua hai điểm phân biệt $A$, $B$ nhận $\\overrightarrow{AB}$ làm vectơ chỉ phương và đi qua $A$.',
        },
      ],
    },
    {
      heading: 'Vị trí tương đối của hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: "Cho đường thẳng $\\Delta$ đi qua $M$, có vectơ chỉ phương $\\vec{u}$ và đường thẳng $\\Delta'$ đi qua $M'$, có vectơ chỉ phương $\\vec{u}'$.",
        },
        {
          type: 'table',
          head: ['Vị trí', 'Điều kiện'],
          rows: [
            ['Trùng nhau', "$\\vec{u}$, $\\vec{u}'$ cùng phương và $M \\in \\Delta'$"],
            ['Song song', "$\\vec{u}$, $\\vec{u}'$ cùng phương và $M \\notin \\Delta'$"],
            [
              'Cắt nhau',
              "$\\vec{u}$, $\\vec{u}'$ không cùng phương và $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 0$",
            ],
            ['Chéo nhau', "$[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} \\ne 0$"],
          ],
        },
        {
          type: 'p',
          text: "Ý nghĩa: $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 0$ nghĩa là ba vectơ $\\vec{u}$, $\\vec{u}'$, $\\overrightarrow{MM'}$ cùng nằm trong một mặt phẳng, nên hai đường thẳng đồng phẳng. Hai đường thẳng không cùng phương và đồng phẳng thì cắt nhau; không đồng phẳng thì chéo nhau.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách khác',
          text: "Khi $\\vec{u}$, $\\vec{u}'$ không cùng phương, ta cũng có thể giải hệ gồm phương trình tham số của hai đường thẳng (với hai tham số $t$, $s$ khác nhau): hệ có nghiệm duy nhất thì hai đường thẳng cắt nhau, hệ vô nghiệm thì chúng chéo nhau.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai đường thẳng vuông góc',
          text: "$\\Delta \\perp \\Delta' \\iff \\vec{u} \\cdot \\vec{u}' = 0$. Hai đường thẳng vuông góc có thể cắt nhau hoặc chéo nhau.",
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng trong không gian',
    instruction:
      "Chọn một ví dụ có sẵn hoặc chỉnh điểm và vectơ chỉ phương của từng đường thẳng. Quan sát $[\\vec{u}, \\vec{u}']$ và $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'}$ để biết hai đường thẳng trùng nhau, song song, cắt nhau hay chéo nhau. Xoay hình: hai đường chéo nhau trông như cắt nhau ở một góc nhìn, nhưng xoay đi là thấy chúng không gặp nhau.",
  },
  examples: [
    {
      problem:
        'Viết phương trình tham số và phương trình chính tắc của đường thẳng $\\Delta$ đi qua $A(1; -2; 3)$ và có vectơ chỉ phương $\\vec{u} = (2; 1; -1)$. Điểm $M(5; 0; 1)$ có thuộc $\\Delta$ không?',
      steps: [
        'Phương trình tham số: $x = 1 + 2t$, $y = -2 + t$, $z = 3 - t$.',
        'Ba toạ độ của $\\vec{u}$ đều khác $0$ nên có phương trình chính tắc $\\dfrac{x - 1}{2} = \\dfrac{y + 2}{1} = \\dfrac{z - 3}{-1}$.',
        'Thay $M$: $\\dfrac{5 - 1}{2} = 2$, $\\dfrac{0 + 2}{1} = 2$, $\\dfrac{1 - 3}{-1} = 2$. Ba tỉ số bằng nhau nên $M \\in \\Delta$ (ứng với $t = 2$).',
      ],
      answer:
        '$\\begin{cases} x = 1 + 2t \\\\ y = -2 + t \\\\ z = 3 - t \\end{cases}$; $\\dfrac{x - 1}{2} = \\dfrac{y + 2}{1} = \\dfrac{z - 3}{-1}$; $M$ thuộc $\\Delta$.',
    },
    {
      problem:
        'Viết phương trình tham số của đường thẳng đi qua hai điểm $A(1; 0; 2)$ và $B(3; -1; 0)$.',
      steps: [
        'Vectơ chỉ phương: $\\overrightarrow{AB} = (2; -1; -2)$.',
        'Đường thẳng đi qua $A$: $x = 1 + 2t$, $y = -t$, $z = 2 - 2t$.',
      ],
      answer: '$\\begin{cases} x = 1 + 2t \\\\ y = -t \\\\ z = 2 - 2t \\end{cases}$',
    },
    {
      problem:
        "Xét vị trí tương đối của $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2t \\\\ z = -1 + t \\end{cases}$ và $\\Delta': \\begin{cases} x = 4 - 2s \\\\ y = 1 + s \\\\ z = -1 + s \\end{cases}$; nếu chúng cắt nhau, tìm giao điểm.",
      steps: [
        "$\\Delta$ qua $M(1; 0; -1)$, $\\vec{u} = (1; 2; 1)$; $\\Delta'$ qua $M'(4; 1; -1)$, $\\vec{u}' = (-2; 1; 1)$, không cùng phương.",
        "$[\\vec{u}, \\vec{u}'] = (2 \\cdot 1 - 1 \\cdot 1; 1 \\cdot (-2) - 1 \\cdot 1; 1 \\cdot 1 - 2 \\cdot (-2)) = (1; -3; 5)$, $\\overrightarrow{MM'} = (3; 1; 0)$.",
        "$[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 3 - 3 + 0 = 0$: hai đường thẳng cắt nhau.",
        'Giải hệ $1 + t = 4 - 2s$, $2t = 1 + s$, $-1 + t = -1 + s$: phương trình cuối cho $t = s$, thay vào phương trình giữa được $t = s = 1$; phương trình đầu: $2 = 2$ đúng.',
        'Với $t = 1$: giao điểm $I(2; 2; 0)$.',
      ],
      answer: "$\\Delta$ và $\\Delta'$ cắt nhau tại $I(2; 2; 0)$.",
    },
    {
      problem:
        "Chứng minh hai đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 - t \\\\ z = t \\end{cases}$ và $\\Delta': \\begin{cases} x = 2s \\\\ y = 1 + s \\\\ z = 3 - s \\end{cases}$ chéo nhau và vuông góc với nhau.",
      steps: [
        "$M(1; 2; 0)$, $\\vec{u} = (1; -1; 1)$; $M'(0; 1; 3)$, $\\vec{u}' = (2; 1; -1)$.",
        "$[\\vec{u}, \\vec{u}'] = ((-1) \\cdot (-1) - 1 \\cdot 1; 1 \\cdot 2 - 1 \\cdot (-1); 1 \\cdot 1 - (-1) \\cdot 2) = (0; 3; 3)$.",
        "$\\overrightarrow{MM'} = (-1; -1; 3)$ và $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 0 - 3 + 9 = 6 \\ne 0$: hai đường thẳng chéo nhau.",
        "$\\vec{u} \\cdot \\vec{u}' = 2 - 1 - 1 = 0$: hai đường thẳng vuông góc.",
      ],
      answer: "$\\Delta$ và $\\Delta'$ chéo nhau và vuông góc với nhau.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Một vectơ chỉ phương của đường thẳng $\\Delta: \\begin{cases} x = 2 - t \\\\ y = 1 + 3t \\\\ z = 5 \\end{cases}$ là',
      options: ['$(-1; 3; 0)$', '$(2; 1; 5)$', '$(-1; 3; 5)$', '$(1; 3; 0)$'],
      answer: 0,
      hints: [
        'Vectơ chỉ phương gồm các hệ số của $t$; phương trình $z = 5$ không có $t$ nghĩa là hệ số bằng $0$.',
      ],
      solution:
        'Các hệ số của $t$ là $-1$, $3$, $0$, nên $\\vec{u} = (-1; 3; 0)$. Bộ $(2; 1; 5)$ là toạ độ một điểm của $\\Delta$, không phải vectơ chỉ phương.',
    },
    {
      type: 'choice',
      prompt:
        'Phương trình chính tắc của đường thẳng đi qua $A(1; -1; 2)$ và có vectơ chỉ phương $\\vec{u} = (2; 3; -1)$ là',
      options: [
        '$\\dfrac{x - 1}{2} = \\dfrac{y + 1}{3} = \\dfrac{z - 2}{-1}$',
        '$\\dfrac{x + 1}{2} = \\dfrac{y - 1}{3} = \\dfrac{z + 2}{-1}$',
        '$\\dfrac{x - 1}{2} = \\dfrac{y + 1}{3} = \\dfrac{z - 2}{1}$',
        '$\\dfrac{x - 2}{1} = \\dfrac{y - 3}{-1} = \\dfrac{z + 1}{2}$',
      ],
      answer: 0,
      hints: [
        'Tử số là $x - x_0$, $y - y_0$, $z - z_0$ với toạ độ của $A$; mẫu số là toạ độ của $\\vec{u}$.',
      ],
      solution:
        '$\\dfrac{x - 1}{2} = \\dfrac{y - (-1)}{3} = \\dfrac{z - 2}{-1}$, tức là $\\dfrac{x - 1}{2} = \\dfrac{y + 1}{3} = \\dfrac{z - 2}{-1}$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $AB$ với $A(1; 2; 3)$, $B(3; 0; 4)$ có điểm $M$ với hoành độ bằng $7$. Tìm cao độ của $M$.',
      answer: 6,
      hints: [
        'Viết phương trình tham số của $AB$ với vectơ chỉ phương $\\overrightarrow{AB}$, rồi tìm $t$ từ hoành độ.',
      ],
      solution:
        '$\\overrightarrow{AB} = (2; -2; 1)$, $AB: x = 1 + 2t$, $y = 2 - 2t$, $z = 3 + t$. Từ $1 + 2t = 7$ được $t = 3$, nên cao độ của $M$ là $3 + 3 = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để điểm $M(3; m; -1)$ thuộc đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 + 3t \\\\ z = 1 - t \\end{cases}$.',
      answer: 8,
      hints: ['Dùng hoành độ để tìm $t$, kiểm tra cao độ, rồi tính tung độ.'],
      solution:
        'Từ $1 + t = 3$ được $t = 2$; khi đó $z = 1 - 2 = -1$ đúng với cao độ của $M$. Vậy $m = 2 + 3 \\cdot 2 = 8$.',
    },
    {
      type: 'choice',
      prompt:
        "Vị trí tương đối của $\\Delta: \\dfrac{x - 1}{2} = \\dfrac{y}{1} = \\dfrac{z + 1}{-1}$ và $\\Delta': \\begin{cases} x = 3 + 4s \\\\ y = 1 + 2s \\\\ z = -2 - 2s \\end{cases}$ là",
      options: ['Trùng nhau', 'Song song', 'Cắt nhau', 'Chéo nhau'],
      answer: 0,
      hints: [
        "So sánh hai vectơ chỉ phương trước. Nếu chúng cùng phương, kiểm tra xem điểm $M'(3; 1; -2)$ có thuộc $\\Delta$ không.",
      ],
      solution:
        "$\\vec{u}' = (4; 2; -2) = 2(2; 1; -1) = 2\\vec{u}$: cùng phương. Thay $M'(3; 1; -2)$ vào $\\Delta$: $\\dfrac{2}{2} = \\dfrac{1}{1} = \\dfrac{-1}{-1} = 1$, nên $M' \\in \\Delta$. Hai đường thẳng trùng nhau.",
    },
    {
      type: 'choice',
      prompt:
        "Vị trí tương đối của $\\Delta: \\begin{cases} x = 1 + t \\\\ y = t \\\\ z = 0 \\end{cases}$ và $\\Delta': \\begin{cases} x = 0 \\\\ y = s \\\\ z = 2 + s \\end{cases}$ là",
      options: ['Chéo nhau', 'Cắt nhau', 'Song song', 'Trùng nhau'],
      answer: 0,
      hints: [
        "Hai vectơ chỉ phương $(1; 1; 0)$ và $(0; 1; 1)$ không cùng phương. Tính $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'}$.",
      ],
      solution:
        "$[\\vec{u}, \\vec{u}'] = (1 \\cdot 1 - 0 \\cdot 1; 0 \\cdot 0 - 1 \\cdot 1; 1 \\cdot 1 - 1 \\cdot 0) = (1; -1; 1)$, $\\overrightarrow{MM'} = (-1; 0; 2)$, tích vô hướng bằng $-1 + 0 + 2 = 1 \\ne 0$. Hai đường thẳng chéo nhau.",
    },
    {
      type: 'number',
      prompt:
        "Hai đường thẳng $\\Delta: \\begin{cases} x = 1 + t \\\\ y = 2 - t \\\\ z = 3 + 2t \\end{cases}$ và $\\Delta': \\begin{cases} x = 1 + s \\\\ y = -2 + s \\\\ z = 5 + s \\end{cases}$ cắt nhau tại $I$. Tìm cao độ của $I$.",
      answer: 7,
      hints: [
        'Cho các toạ độ bằng nhau: $1 + t = 1 + s$, $2 - t = -2 + s$.',
        'Hai phương trình đầu cho $t$ và $s$; nhớ kiểm tra phương trình thứ ba.',
      ],
      solution:
        'Từ $1 + t = 1 + s$ được $t = s$; thay vào $2 - t = -2 + s$ được $t = s = 2$. Kiểm tra: $3 + 2 \\cdot 2 = 7 = 5 + 2$. Giao điểm $I(3; 0; 7)$, cao độ bằng $7$.',
    },
    {
      type: 'number',
      prompt:
        "Tìm $m$ để hai đường thẳng có vectơ chỉ phương $\\vec{u} = (1; m; 2)$ và $\\vec{u}' = (2; -1; 3)$ vuông góc với nhau.",
      answer: 8,
      hints: ["$\\Delta \\perp \\Delta' \\iff \\vec{u} \\cdot \\vec{u}' = 0$."],
      solution: "$\\vec{u} \\cdot \\vec{u}' = 2 - m + 6 = 8 - m = 0$, nên $m = 8$.",
    },
  ],
  takeaways: [
    'Đường thẳng qua $M_0(x_0; y_0; z_0)$, vectơ chỉ phương $(a; b; c)$: $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$; khi $abc \\ne 0$: $\\dfrac{x - x_0}{a} = \\dfrac{y - y_0}{b} = \\dfrac{z - z_0}{c}$.',
    "Vectơ chỉ phương cùng phương: trùng nhau ($M \\in \\Delta'$) hoặc song song ($M \\notin \\Delta'$).",
    "Không cùng phương: cắt nhau nếu $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} = 0$, chéo nhau nếu $[\\vec{u}, \\vec{u}'] \\cdot \\overrightarrow{MM'} \\ne 0$.",
    "$\\Delta \\perp \\Delta' \\iff \\vec{u} \\cdot \\vec{u}' = 0$.",
  ],
};
