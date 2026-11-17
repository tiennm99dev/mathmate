/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu thức toạ độ của tổng, hiệu, tích của một số với vectơ, trung điểm và trọng tâm; tích vô hướng, độ dài, góc giữa hai vectơ; tích có hướng và diện tích hình bình hành.',
  intro:
    'Một ra-đa đặt tại gốc toạ độ theo dõi một máy bay bay thẳng đều. Biết toạ độ hai vị trí của máy bay cách nhau 10 phút, làm sao đoán được vị trí 5 phút sau đó, hay độ dài quãng đường đã bay? Khi các vectơ đã có toạ độ, mọi phép toán vectơ trở thành phép tính trên các con số.',
  objectives: [
    'Tính toạ độ của tổng, hiệu hai vectơ, tích của một số với một vectơ; toạ độ trung điểm đoạn thẳng và trọng tâm tam giác.',
    'Tính tích vô hướng, độ dài vectơ, khoảng cách giữa hai điểm và góc giữa hai vectơ bằng toạ độ.',
    'Tính tích có hướng của hai vectơ và dùng nó để tìm một vectơ vuông góc với cả hai vectơ đã cho.',
    'Vận dụng toạ độ vectơ vào bài toán thực tiễn.',
  ],
  sections: [
    {
      heading: 'Toạ độ của tổng, hiệu và tích với một số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức toạ độ',
          text: "Trong không gian $Oxyz$, cho $\\vec{a} = (x; y; z)$, $\\vec{b} = (x'; y'; z')$ và số $k$. Khi đó: $\\vec{a} + \\vec{b} = (x + x'; y + y'; z + z')$; $\\vec{a} - \\vec{b} = (x - x'; y - y'; z - z')$; $k\\vec{a} = (kx; ky; kz)$.",
        },
        {
          type: 'list',
          items: [
            'Trung điểm $M$ của đoạn thẳng $AB$: $M\\left(\\dfrac{x_A + x_B}{2}; \\dfrac{y_A + y_B}{2}; \\dfrac{z_A + z_B}{2}\\right)$.',
            'Trọng tâm $G$ của tam giác $ABC$: $G\\left(\\dfrac{x_A + x_B + x_C}{3}; \\dfrac{y_A + y_B + y_C}{3}; \\dfrac{z_A + z_B + z_C}{3}\\right)$.',
            "Với $\\vec{a} \\ne \\vec{0}$: $\\vec{b}$ cùng phương với $\\vec{a}$ khi và chỉ khi có số $k$ sao cho $x' = kx$, $y' = ky$, $z' = kz$.",
          ],
        },
      ],
    },
    {
      heading: 'Biểu thức toạ độ của tích vô hướng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: "Cho $\\vec{a} = (x; y; z)$ và $\\vec{b} = (x'; y'; z')$. Khi đó $\\vec{a} \\cdot \\vec{b} = xx' + yy' + zz'$.",
        },
        {
          type: 'p',
          text: "Giải thích: $\\vec{a} \\cdot \\vec{b} = (x\\vec{i} + y\\vec{j} + z\\vec{k}) \\cdot (x'\\vec{i} + y'\\vec{j} + z'\\vec{k})$; khai triển, dùng $\\vec{i}^2 = \\vec{j}^2 = \\vec{k}^2 = 1$ và $\\vec{i} \\cdot \\vec{j} = \\vec{j} \\cdot \\vec{k} = \\vec{k} \\cdot \\vec{i} = 0$.",
        },
        {
          type: 'table',
          head: ['Hệ quả', 'Công thức'],
          rows: [
            ['Độ dài vectơ', '$|\\vec{a}| = \\sqrt{\\vec{a}^2} = \\sqrt{x^2 + y^2 + z^2}$'],
            [
              'Khoảng cách hai điểm',
              '$AB = |\\overrightarrow{AB}| = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$',
            ],
            [
              'Góc giữa hai vectơ khác $\\vec{0}$',
              "$\\cos(\\vec{a}, \\vec{b}) = \\dfrac{xx' + yy' + zz'}{\\sqrt{x^2 + y^2 + z^2} \\cdot \\sqrt{x'^2 + y'^2 + z'^2}}$",
            ],
            ['Hai vectơ vuông góc', "$\\vec{a} \\perp \\vec{b} \\iff xx' + yy' + zz' = 0$"],
          ],
        },
      ],
    },
    {
      heading: 'Tích có hướng của hai vectơ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Tích có hướng của hai vectơ $\\vec{u} = (x; y; z)$ và $\\vec{v} = (x'; y'; z')$ là vectơ, kí hiệu $[\\vec{u}, \\vec{v}]$, xác định bởi $[\\vec{u}, \\vec{v}] = (yz' - zy'; zx' - xz'; xy' - yx')$.",
        },
        {
          type: 'p',
          text: "Mẹo nhớ: toạ độ thứ nhất bỏ cột $x$ và tính $\\begin{vmatrix} y & z \\\\ y' & z' \\end{vmatrix} = yz' - zy'$; toạ độ thứ hai dùng cột $z$, $x$; toạ độ thứ ba dùng cột $x$, $y$.",
        },
        {
          type: 'list',
          items: [
            '$[\\vec{u}, \\vec{v}]$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$: $[\\vec{u}, \\vec{v}] \\cdot \\vec{u} = [\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 0$ (kiểm tra bằng cách khai triển).',
            '$[\\vec{u}, \\vec{v}] = \\vec{0}$ khi và chỉ khi $\\vec{u}$ và $\\vec{v}$ cùng phương.',
            'Độ dài $\\left|[\\vec{u}, \\vec{v}]\\right| = |\\vec{u}| \\cdot |\\vec{v}| \\cdot \\sin(\\vec{u}, \\vec{v})$, bằng diện tích hình bình hành dựng trên hai vectơ $\\vec{u}$, $\\vec{v}$ có chung điểm đầu.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Khi cần một vectơ vuông góc với hai vectơ không cùng phương (chẳng hạn vuông góc với một mặt phẳng chứa chúng), ta lấy tích có hướng của hai vectơ đó. Diện tích tam giác $ABC$ bằng $\\dfrac{1}{2}\\left|[\\overrightarrow{AB}, \\overrightarrow{AC}]\\right|$.',
        },
      ],
    },
    {
      heading: 'Vận dụng vào bài toán thực tiễn',
      blocks: [
        {
          type: 'p',
          text: 'Một vật chuyển động thẳng đều đi từ $A$ đến $B$ trong khoảng thời gian $t$ thì trong khoảng thời gian $kt$ tiếp theo, nó dịch chuyển theo vectơ $k\\overrightarrow{AB}$. Tính toán bằng toạ độ cho vị trí mới, quãng đường đi và góc giữa các hướng chuyển động.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phép toán vectơ bằng toạ độ',
    instruction:
      'Đổi toạ độ của $\\vec{u}$ và $\\vec{v}$. Quan sát vectơ tổng là đường chéo của hình bình hành dựng trên hai vectơ, và tích có hướng $[\\vec{u}, \\vec{v}]$ luôn đứng vuông góc với hình bình hành ấy. Xoay hình để kiểm tra; thử cho hai vectơ cùng phương.',
  },
  examples: [
    {
      problem:
        'Cho $\\vec{u} = (1; -2; 3)$ và $\\vec{v} = (2; 0; -1)$. Tìm toạ độ của $\\vec{u} + \\vec{v}$ và $2\\vec{u} - 3\\vec{v}$.',
      steps: [
        '$\\vec{u} + \\vec{v} = (1 + 2; -2 + 0; 3 + (-1)) = (3; -2; 2)$.',
        '$2\\vec{u} = (2; -4; 6)$ và $3\\vec{v} = (6; 0; -3)$.',
        '$2\\vec{u} - 3\\vec{v} = (2 - 6; -4 - 0; 6 - (-3)) = (-4; -4; 9)$.',
      ],
      answer: '$\\vec{u} + \\vec{v} = (3; -2; 2)$, $2\\vec{u} - 3\\vec{v} = (-4; -4; 9)$.',
    },
    {
      problem:
        'Cho $A(1; 2; 3)$, $B(3; 0; -1)$, $C(-1; 1; 1)$. Tìm toạ độ trung điểm $M$ của $AB$, trọng tâm $G$ của tam giác $ABC$ và độ dài $AB$.',
      steps: [
        '$M\\left(\\dfrac{1 + 3}{2}; \\dfrac{2 + 0}{2}; \\dfrac{3 + (-1)}{2}\\right) = (2; 1; 1)$.',
        '$G\\left(\\dfrac{1 + 3 - 1}{3}; \\dfrac{2 + 0 + 1}{3}; \\dfrac{3 - 1 + 1}{3}\\right) = (1; 1; 1)$.',
        '$\\overrightarrow{AB} = (2; -2; -4)$ nên $AB = \\sqrt{2^2 + (-2)^2 + (-4)^2} = \\sqrt{24} = 2\\sqrt{6}$.',
      ],
      answer: '$M(2; 1; 1)$, $G(1; 1; 1)$, $AB = 2\\sqrt{6}$.',
    },
    {
      problem:
        'Cho $\\vec{u} = (1; 1; 0)$, $\\vec{v} = (1; 0; 1)$ và $\\vec{w} = (1; -1; 2)$. Tính góc $(\\vec{u}, \\vec{v})$ và chứng tỏ $\\vec{u} \\perp \\vec{w}$.',
      steps: [
        '$\\vec{u} \\cdot \\vec{v} = 1 \\cdot 1 + 1 \\cdot 0 + 0 \\cdot 1 = 1$; $|\\vec{u}| = |\\vec{v}| = \\sqrt{2}$.',
        '$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{1}{2}$, nên $(\\vec{u}, \\vec{v}) = 60^\\circ$.',
        '$\\vec{u} \\cdot \\vec{w} = 1 \\cdot 1 + 1 \\cdot (-1) + 0 \\cdot 2 = 0$, nên $\\vec{u} \\perp \\vec{w}$.',
      ],
      answer: '$(\\vec{u}, \\vec{v}) = 60^\\circ$ và $\\vec{u} \\perp \\vec{w}$.',
    },
    {
      problem:
        'Cho $\\vec{u} = (1; 2; 3)$ và $\\vec{v} = (2; 0; 1)$. Tính $[\\vec{u}, \\vec{v}]$ và kiểm tra rằng nó vuông góc với cả $\\vec{u}$ và $\\vec{v}$.',
      steps: [
        '$[\\vec{u}, \\vec{v}] = (2 \\cdot 1 - 3 \\cdot 0; 3 \\cdot 2 - 1 \\cdot 1; 1 \\cdot 0 - 2 \\cdot 2) = (2; 5; -4)$.',
        '$[\\vec{u}, \\vec{v}] \\cdot \\vec{u} = 2 \\cdot 1 + 5 \\cdot 2 + (-4) \\cdot 3 = 0$.',
        '$[\\vec{u}, \\vec{v}] \\cdot \\vec{v} = 2 \\cdot 2 + 5 \\cdot 0 + (-4) \\cdot 1 = 0$.',
      ],
      answer: '$[\\vec{u}, \\vec{v}] = (2; 5; -4)$, vuông góc với cả $\\vec{u}$ và $\\vec{v}$.',
    },
    {
      problem:
        'Một ra-đa theo dõi một máy bay. Máy bay bay từ điểm $A(800; 500; 7)$ đến điểm $B(940; 550; 8)$ trong $10$ phút (đơn vị trên mỗi trục là kilômét). Nếu máy bay giữ nguyên vận tốc và hướng bay thì $5$ phút tiếp theo nó ở điểm $C$ có toạ độ nào?',
      steps: [
        '$\\overrightarrow{AB} = (140; 50; 1)$.',
        'Thời gian bay trên $BC$ bằng một nửa thời gian bay trên $AB$, cùng hướng, nên $\\overrightarrow{BC} = \\dfrac{1}{2}\\overrightarrow{AB} = (70; 25; 0{,}5)$.',
        'Gọi $C(x; y; z)$: $x - 940 = 70$, $y - 550 = 25$, $z - 8 = 0{,}5$, nên $C(1010; 575; 8{,}5)$.',
      ],
      answer: '$C(1010; 575; 8{,}5)$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cho $\\vec{a} = (2; -1; 3)$ và $\\vec{b} = (1; 4; -2)$. Tính $\\vec{a} \\cdot \\vec{b}$.',
      answer: -8,
      hints: ["Nhân các toạ độ tương ứng rồi cộng lại: $xx' + yy' + zz'$."],
      solution:
        '$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 1 + (-1) \\cdot 4 + 3 \\cdot (-2) = 2 - 4 - 6 = -8$.',
    },
    {
      type: 'number',
      prompt: 'Cho $A(1; -2; 3)$ và $B(3; 0; 4)$. Tính độ dài đoạn thẳng $AB$.',
      answer: 3,
      hints: [
        'Tìm toạ độ $\\overrightarrow{AB}$ trước, rồi lấy căn bậc hai của tổng bình phương các toạ độ.',
      ],
      solution:
        '$\\overrightarrow{AB} = (2; 2; 1)$ nên $AB = \\sqrt{2^2 + 2^2 + 1^2} = \\sqrt{9} = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $\\vec{a} = (1; 0; -2)$ và $\\vec{b} = (3; -1; 1)$. Toạ độ của $2\\vec{a} - \\vec{b}$ là',
      options: ['$(-1; 1; -5)$', '$(-1; -1; -5)$', '$(5; -1; -3)$', '$(-1; 1; -3)$'],
      answer: 0,
      hints: ['$2\\vec{a} = (2; 0; -4)$; trừ từng toạ độ của $\\vec{b}$, cẩn thận với dấu trừ.'],
      solution: '$2\\vec{a} - \\vec{b} = (2 - 3; 0 - (-1); -4 - 1) = (-1; 1; -5)$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm $m$ để hai vectơ $\\vec{u} = (m; 2; -1)$ và $\\vec{v} = (3; 1; 4)$ vuông góc với nhau. Nhập $m$ dưới dạng phân số.',
      answer: [2, 3],
      hints: ['$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.'],
      solution: '$\\vec{u} \\cdot \\vec{v} = 3m + 2 - 4 = 3m - 2 = 0$, nên $m = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\vec{u} = (1; 0; 1)$ và $\\vec{v} = (0; 1; 1)$. Tính số đo góc $(\\vec{u}, \\vec{v})$ theo độ.',
      answer: 60,
      hints: [
        '$\\cos(\\vec{u}, \\vec{v}) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| \\cdot |\\vec{v}|}$.',
      ],
      solution:
        '$\\vec{u} \\cdot \\vec{v} = 0 + 0 + 1 = 1$, $|\\vec{u}| = |\\vec{v}| = \\sqrt{2}$, nên $\\cos(\\vec{u}, \\vec{v}) = \\dfrac{1}{2}$ và $(\\vec{u}, \\vec{v}) = 60^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho tam giác $ABC$ với $A(2; 1; -1)$, $B(0; 3; 2)$, $C(1; -1; 5)$. Trọng tâm $G$ của tam giác có toạ độ là',
      options: [
        '$(1; 1; 2)$',
        '$\\left(\\dfrac{3}{2}; \\dfrac{3}{2}; 3\\right)$',
        '$(3; 3; 6)$',
        '$(1; 2; 1)$',
      ],
      answer: 0,
      hints: ['Cộng từng loại toạ độ của ba đỉnh rồi chia cho $3$.'],
      solution:
        '$G\\left(\\dfrac{2 + 0 + 1}{3}; \\dfrac{1 + 3 - 1}{3}; \\dfrac{-1 + 2 + 5}{3}\\right) = (1; 1; 2)$.',
    },
    {
      type: 'choice',
      prompt: 'Vectơ nào sau đây cùng phương với $\\vec{a} = (2; -4; 6)$?',
      options: ['$(-1; 2; -3)$', '$(1; 2; 3)$', '$(2; 4; -6)$', '$(4; -8; 6)$'],
      answer: 0,
      hints: ['Tìm số $k$ sao cho cả ba toạ độ đều gấp $k$ lần toạ độ tương ứng của $\\vec{a}$.'],
      solution:
        '$(-1; 2; -3) = -\\dfrac{1}{2}(2; -4; 6)$ nên cùng phương với $\\vec{a}$. Các vectơ còn lại không có chung một hệ số $k$ cho cả ba toạ độ.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $\\vec{u} = (1; 0; 2)$ và $\\vec{v} = (0; 1; -1)$. Tích có hướng $[\\vec{u}, \\vec{v}]$ bằng',
      options: ['$(-2; 1; 1)$', '$(2; -1; -1)$', '$(-2; -1; 1)$', '$(0; 0; -2)$'],
      answer: 0,
      hints: [
        "$[\\vec{u}, \\vec{v}] = (yz' - zy'; zx' - xz'; xy' - yx')$.",
        'Kiểm tra lại: kết quả phải có tích vô hướng bằng $0$ với cả $\\vec{u}$ và $\\vec{v}$.',
      ],
      solution:
        '$[\\vec{u}, \\vec{v}] = (0 \\cdot (-1) - 2 \\cdot 1; 2 \\cdot 0 - 1 \\cdot (-1); 1 \\cdot 1 - 0 \\cdot 0) = (-2; 1; 1)$. Kiểm tra: $(-2) \\cdot 1 + 1 \\cdot 0 + 1 \\cdot 2 = 0$ và $0 + 1 - 1 = 0$. Vectơ $(2; -1; -1)$ là $[\\vec{v}, \\vec{u}]$, ngược hướng.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình bình hành dựng trên hai vectơ $\\vec{u} = (2; 0; 0)$ và $\\vec{v} = (0; 3; 4)$ có chung điểm đầu.',
      answer: 10,
      hints: ['Diện tích bằng độ dài của $[\\vec{u}, \\vec{v}]$.'],
      solution:
        '$[\\vec{u}, \\vec{v}] = (0 \\cdot 4 - 0 \\cdot 3; 0 \\cdot 0 - 2 \\cdot 4; 2 \\cdot 3 - 0 \\cdot 0) = (0; -8; 6)$, nên $S = \\sqrt{0 + 64 + 36} = 10$. (Hai vectơ vuông góc nên đây là hình chữ nhật $2 \\times 5$.)',
    },
    {
      type: 'number',
      prompt:
        'Một khinh khí cầu bay thẳng đều, đi từ $A(100; 200; 5)$ đến $B(140; 260; 7)$ trong $4$ phút (đơn vị trên mỗi trục là mét). Giữ nguyên vận tốc, sau $2$ phút tiếp theo nó ở điểm $C$. Tìm cao độ của $C$.',
      answer: 8,
      hints: [
        '$2$ phút bằng một nửa của $4$ phút, nên $\\overrightarrow{BC} = \\dfrac{1}{2}\\overrightarrow{AB}$.',
      ],
      solution:
        '$\\overrightarrow{AB} = (40; 60; 2)$, $\\overrightarrow{BC} = (20; 30; 1)$, nên $C(160; 290; 8)$. Cao độ của $C$ là $8$.',
    },
  ],
  takeaways: [
    "$\\vec{a} \\pm \\vec{b} = (x \\pm x'; y \\pm y'; z \\pm z')$, $k\\vec{a} = (kx; ky; kz)$; trung điểm và trọng tâm là trung bình cộng các toạ độ.",
    "$\\vec{a} \\cdot \\vec{b} = xx' + yy' + zz'$; $|\\vec{a}| = \\sqrt{x^2 + y^2 + z^2}$; $\\vec{a} \\perp \\vec{b} \\iff xx' + yy' + zz' = 0$.",
    "$[\\vec{u}, \\vec{v}] = (yz' - zy'; zx' - xz'; xy' - yx')$ vuông góc với cả $\\vec{u}$ và $\\vec{v}$; độ dài của nó là diện tích hình bình hành dựng trên $\\vec{u}$, $\\vec{v}$.",
  ],
};
