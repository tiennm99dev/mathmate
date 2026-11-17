/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vectơ pháp tuyến, cặp vectơ chỉ phương và tích có hướng; phương trình tổng quát của mặt phẳng; lập phương trình mặt phẳng; điều kiện hai mặt phẳng song song, vuông góc; khoảng cách từ một điểm đến một mặt phẳng.',
  intro:
    'Một tấm pin mặt trời phẳng được lắp nghiêng trên mái nhà. Muốn pin đón nắng tốt, người thợ quan tâm đến hướng "vuông góc với mặt pin". Trong hệ toạ độ $Oxyz$, chính hướng vuông góc ấy, cùng một điểm của tấm pin, cho ta viết được phương trình của mặt phẳng chứa tấm pin, rồi tính khoảng cách từ một điểm bất kì đến nó.',
  objectives: [
    'Nhận biết vectơ pháp tuyến, cặp vectơ chỉ phương của mặt phẳng; dùng tích có hướng để tìm vectơ pháp tuyến.',
    'Nhận biết phương trình tổng quát của mặt phẳng và đọc vectơ pháp tuyến từ phương trình.',
    'Lập phương trình mặt phẳng đi qua một điểm và biết vectơ pháp tuyến, biết cặp vectơ chỉ phương, đi qua ba điểm không thẳng hàng.',
    'Nhận biết hai mặt phẳng song song, vuông góc bằng vectơ pháp tuyến.',
    'Tính khoảng cách từ một điểm đến một mặt phẳng.',
  ],
  sections: [
    {
      heading: 'Vectơ pháp tuyến và cặp vectơ chỉ phương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vectơ pháp tuyến',
          text: 'Vectơ $\\vec{n} \\ne \\vec{0}$ được gọi là vectơ pháp tuyến của mặt phẳng $(P)$ nếu giá của $\\vec{n}$ vuông góc với $(P)$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $\\vec{n}$ là một vectơ pháp tuyến của $(P)$ thì $k\\vec{n}$ ($k \\ne 0$) cũng là một vectơ pháp tuyến của $(P)$.',
            'Có duy nhất một mặt phẳng đi qua một điểm cho trước và nhận một vectơ $\\vec{n} \\ne \\vec{0}$ cho trước làm vectơ pháp tuyến.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cặp vectơ chỉ phương',
          text: 'Hai vectơ $\\vec{u}$, $\\vec{v}$ không cùng phương, có giá song song hoặc nằm trong mặt phẳng $(P)$, được gọi là một cặp vectơ chỉ phương của $(P)$.',
        },
        {
          type: 'p',
          text: "Với $\\vec{u} = (a; b; c)$ và $\\vec{v} = (a'; b'; c')$ không cùng phương, vectơ",
        },
        {
          type: 'tex',
          tex: "\\vec{n} = [\\vec{u}, \\vec{v}] = (bc' - cb'; ca' - ac'; ab' - ba')",
        },
        {
          type: 'p',
          text: 'khác $\\vec{0}$ và vuông góc với cả $\\vec{u}$, $\\vec{v}$. Nó được gọi là tích có hướng của $\\vec{u}$ và $\\vec{v}$. Vì thế, nếu $\\vec{u}$, $\\vec{v}$ là một cặp vectơ chỉ phương của $(P)$ thì $[\\vec{u}, \\vec{v}]$ là một vectơ pháp tuyến của $(P)$.',
        },
      ],
    },
    {
      heading: 'Phương trình tổng quát của mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Trong không gian $Oxyz$, mỗi mặt phẳng có phương trình dạng $Ax + By + Cz + D = 0$, trong đó $A$, $B$, $C$ không đồng thời bằng $0$, gọi là phương trình tổng quát của mặt phẳng. Khi đó $\\vec{n} = (A; B; C)$ là một vectơ pháp tuyến của mặt phẳng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Mặt phẳng qua một điểm, biết vectơ pháp tuyến',
          text: 'Mặt phẳng đi qua $M_0(x_0; y_0; z_0)$ và có vectơ pháp tuyến $\\vec{n} = (A; B; C)$ có phương trình $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.',
        },
        {
          type: 'p',
          text: 'Giải thích: điểm $M(x; y; z)$ thuộc mặt phẳng khi và chỉ khi $\\overrightarrow{M_0M} \\perp \\vec{n}$, tức là $\\vec{n} \\cdot \\overrightarrow{M_0M} = 0$.',
        },
        {
          type: 'table',
          head: ['Trường hợp', 'Đặc điểm của mặt phẳng'],
          rows: [
            ['$D = 0$', 'Đi qua gốc toạ độ $O$'],
            ['$A = 0$, $D \\ne 0$', 'Song song với trục $Ox$'],
            ['$A = B = 0$, $D \\ne 0$', 'Song song với mặt phẳng $(Oxy)$'],
            ['$z = 0$; $x = 0$; $y = 0$', 'Các mặt phẳng toạ độ $(Oxy)$; $(Oyz)$; $(Oxz)$'],
            [
              '$\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$ ($abc \\ne 0$)',
              'Đi qua $(a; 0; 0)$, $(0; b; 0)$, $(0; 0; c)$ (phương trình theo đoạn chắn)',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Lập phương trình mặt phẳng',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Biết một điểm $M_0$ và vectơ pháp tuyến $\\vec{n}$: dùng ngay $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.',
            'Biết một điểm $M_0$ và cặp vectơ chỉ phương $\\vec{u}$, $\\vec{v}$: lấy $\\vec{n} = [\\vec{u}, \\vec{v}]$ rồi làm như trường hợp 1.',
            'Đi qua ba điểm $A$, $B$, $C$ không thẳng hàng: $\\overrightarrow{AB}$, $\\overrightarrow{AC}$ là một cặp vectơ chỉ phương, nên $\\vec{n} = [\\overrightarrow{AB}, \\overrightarrow{AC}]$ và mặt phẳng đi qua $A$.',
          ],
        },
      ],
    },
    {
      heading: 'Điều kiện để hai mặt phẳng song song, vuông góc',
      blocks: [
        {
          type: 'p',
          text: "Cho $(P): Ax + By + Cz + D = 0$ và $(P'): A'x + B'y + C'z + D' = 0$ với các vectơ pháp tuyến $\\vec{n} = (A; B; C)$, $\\vec{n}' = (A'; B'; C')$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện',
          text: "$(P) \\parallel (P')$ khi và chỉ khi có số $k \\ne 0$ sao cho $\\vec{n}' = k\\vec{n}$ và $D' \\ne kD$ (nếu $D' = kD$ thì hai mặt phẳng trùng nhau). $(P) \\perp (P')$ khi và chỉ khi $\\vec{n} \\cdot \\vec{n}' = 0$, tức là $AA' + BB' + CC' = 0$.",
        },
      ],
    },
    {
      heading: 'Khoảng cách từ một điểm đến một mặt phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: 'Khoảng cách từ điểm $M_0(x_0; y_0; z_0)$ đến mặt phẳng $(P): Ax + By + Cz + D = 0$ là',
        },
        {
          type: 'tex',
          tex: 'd(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
        },
        {
          type: 'p',
          text: 'Giải thích: gọi $H$ là hình chiếu vuông góc của $M_0$ trên $(P)$. Khi đó $\\overrightarrow{HM_0}$ cùng phương với $\\vec{n}$, và $|\\vec{n} \\cdot \\overrightarrow{HM_0}| = |\\vec{n}| \\cdot HM_0$. Mặt khác $\\vec{n} \\cdot \\overrightarrow{HM_0} = Ax_0 + By_0 + Cz_0 + D$ vì $H$ thuộc $(P)$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mặt phẳng quay theo vectơ pháp tuyến',
    instruction:
      'Đổi các toạ độ $A$, $B$, $C$ của vectơ pháp tuyến $\\vec{n}$ và điểm $M_0$: mặt phẳng luôn vuông góc với $\\vec{n}$ và phương trình cập nhật theo. Bật điểm $Q$ để thấy đường vuông góc $QH$ và công thức khoảng cách. Thử đặt $Q$ sao cho toạ độ của nó thoả mãn phương trình.',
  },
  examples: [
    {
      problem:
        'Viết phương trình mặt phẳng $(P)$ đi qua điểm $M(1; -2; 3)$ và có vectơ pháp tuyến $\\vec{n} = (2; -1; 3)$.',
      steps: [
        'Mặt phẳng qua $M_0(x_0; y_0; z_0)$ có vectơ pháp tuyến $(A; B; C)$: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.',
        'Thay số: $2(x - 1) - (y + 2) + 3(z - 3) = 0$.',
        'Khai triển: $2x - 2 - y - 2 + 3z - 9 = 0$, tức là $2x - y + 3z - 13 = 0$.',
      ],
      answer: '$(P): 2x - y + 3z - 13 = 0$.',
    },
    {
      problem:
        'Viết phương trình mặt phẳng đi qua ba điểm $A(1; 0; 0)$, $B(0; 2; 0)$, $C(0; 0; 3)$.',
      steps: [
        '$\\overrightarrow{AB} = (-1; 2; 0)$, $\\overrightarrow{AC} = (-1; 0; 3)$ không cùng phương.',
        '$\\vec{n} = [\\overrightarrow{AB}, \\overrightarrow{AC}] = (2 \\cdot 3 - 0 \\cdot 0; 0 \\cdot (-1) - (-1) \\cdot 3; (-1) \\cdot 0 - 2 \\cdot (-1)) = (6; 3; 2)$.',
        'Mặt phẳng qua $A$: $6(x - 1) + 3y + 2z = 0$, tức là $6x + 3y + 2z - 6 = 0$.',
        'Kiểm tra bằng phương trình theo đoạn chắn: $\\dfrac{x}{1} + \\dfrac{y}{2} + \\dfrac{z}{3} = 1$, nhân hai vế với $6$ được cùng kết quả.',
      ],
      answer: '$6x + 3y + 2z - 6 = 0$.',
    },
    {
      problem: 'Tính khoảng cách từ điểm $M(1; 2; -1)$ đến mặt phẳng $(P): 2x - y + 2z + 4 = 0$.',
      steps: [
        'Tử số: $|2 \\cdot 1 - 2 + 2 \\cdot (-1) + 4| = |2| = 2$.',
        'Mẫu số: $\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3$.',
        '$d(M, (P)) = \\dfrac{2}{3}$.',
      ],
      answer: '$d(M, (P)) = \\dfrac{2}{3}$.',
    },
    {
      problem:
        'Cho $(P): x + 2y - z + 1 = 0$, $(Q): 2x + 4y - 2z + 5 = 0$ và $(R): x - y - z + 3 = 0$. Xét vị trí của $(P)$ với $(Q)$ và với $(R)$.',
      steps: [
        '$\\vec{n}_P = (1; 2; -1)$, $\\vec{n}_Q = (2; 4; -2) = 2\\vec{n}_P$, còn $5 \\ne 2 \\cdot 1$, nên $(P) \\parallel (Q)$.',
        '$\\vec{n}_R = (1; -1; -1)$ và $\\vec{n}_P \\cdot \\vec{n}_R = 1 - 2 + 1 = 0$, nên $(P) \\perp (R)$.',
      ],
      answer: '$(P) \\parallel (Q)$ và $(P) \\perp (R)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một vectơ pháp tuyến của mặt phẳng $(P): 3x - 2z + 1 = 0$ là',
      options: ['$(3; 0; -2)$', '$(3; -2; 1)$', '$(3; -2; 0)$', '$(0; 3; -2)$'],
      answer: 0,
      hints: [
        'Viết đủ ba hệ số của $x$, $y$, $z$: phương trình không có $y$ nghĩa là hệ số của $y$ bằng $0$.',
      ],
      solution:
        '$(P): 3x + 0y - 2z + 1 = 0$ nên $\\vec{n} = (3; 0; -2)$. Hệ số tự do $1$ không thuộc vectơ pháp tuyến.',
    },
    {
      type: 'number',
      prompt:
        'Mặt phẳng đi qua $A(2; -1; 1)$ và có vectơ pháp tuyến $\\vec{n} = (1; 3; -2)$ có phương trình dạng $x + 3y - 2z + D = 0$. Tìm $D$.',
      answer: 3,
      hints: ['Thay toạ độ của $A$ vào phương trình, vì $A$ thuộc mặt phẳng.'],
      solution:
        '$(x - 2) + 3(y + 1) - 2(z - 1) = 0 \\iff x + 3y - 2z + 3 = 0$. Kiểm tra: $2 - 3 - 2 + D = 0$ cho $D = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Mặt phẳng có cặp vectơ chỉ phương $\\vec{u} = (1; 1; 0)$ và $\\vec{v} = (0; 1; 2)$ có một vectơ pháp tuyến là',
      options: ['$(2; -2; 1)$', '$(2; 2; 1)$', '$(1; -2; 2)$', '$(2; -2; -1)$'],
      answer: 0,
      hints: [
        "$[\\vec{u}, \\vec{v}] = (bc' - cb'; ca' - ac'; ab' - ba')$.",
        'Kiểm tra: vectơ pháp tuyến phải có tích vô hướng bằng $0$ với cả $\\vec{u}$ và $\\vec{v}$.',
      ],
      solution:
        '$[\\vec{u}, \\vec{v}] = (1 \\cdot 2 - 0 \\cdot 1; 0 \\cdot 0 - 1 \\cdot 2; 1 \\cdot 1 - 1 \\cdot 0) = (2; -2; 1)$. Kiểm tra: $2 - 2 + 0 = 0$ và $0 - 2 + 2 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình mặt phẳng đi qua ba điểm $A(2; 0; 0)$, $B(0; -1; 0)$, $C(0; 0; 4)$ là',
      options: [
        '$2x - 4y + z - 4 = 0$',
        '$2x + 4y + z - 4 = 0$',
        '$4x - 2y + z - 4 = 0$',
        '$x - y + z - 1 = 0$',
      ],
      answer: 0,
      hints: [
        'Ba điểm nằm trên ba trục: dùng phương trình theo đoạn chắn $\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1$.',
      ],
      solution:
        '$\\dfrac{x}{2} + \\dfrac{y}{-1} + \\dfrac{z}{4} = 1$; nhân hai vế với $4$: $2x - 4y + z = 4$, tức là $2x - 4y + z - 4 = 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính khoảng cách từ điểm $A(3; -1; 2)$ đến mặt phẳng $(P): 2x + 2y - z + 7 = 0$.',
      answer: 3,
      hints: ['$d = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.'],
      solution:
        '$d(A, (P)) = \\dfrac{|2 \\cdot 3 + 2 \\cdot (-1) - 2 + 7|}{\\sqrt{4 + 4 + 1}} = \\dfrac{9}{3} = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hai mặt phẳng $(P): 2x - y + mz + 1 = 0$ và $(Q): x + 4y - 2z - 3 = 0$ vuông góc với nhau.',
      answer: -1,
      hints: ['Hai mặt phẳng vuông góc khi tích vô hướng hai vectơ pháp tuyến bằng $0$.'],
      solution:
        '$\\vec{n}_P \\cdot \\vec{n}_Q = 2 \\cdot 1 + (-1) \\cdot 4 + m \\cdot (-2) = -2 - 2m = 0$, nên $m = -1$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hai mặt phẳng $(P): x + 2y - 2z + 1 = 0$ và $(Q): 2x + my - 4z + 5 = 0$ song song với nhau.',
      answer: 4,
      hints: [
        'Cần $\\vec{n}_Q = k\\vec{n}_P$: so sánh hệ số của $x$ để tìm $k$.',
        'Đừng quên kiểm tra hệ số tự do để hai mặt phẳng không trùng nhau.',
      ],
      solution:
        'Từ hệ số của $x$ và $z$: $k = 2$, nên $m = 2 \\cdot 2 = 4$. Khi đó $5 \\ne 2 \\cdot 1$ nên $(P) \\parallel (Q)$, không trùng nhau.',
    },
    {
      type: 'multi',
      prompt: 'Những điểm nào thuộc mặt phẳng $(P): x - 2y + z - 3 = 0$?',
      options: ['$(3; 0; 0)$', '$(1; -1; 0)$', '$(0; 0; 3)$', '$(1; 1; 1)$', '$(2; 1; 2)$'],
      answers: [0, 1, 2],
      hints: ['Thay toạ độ từng điểm vào vế trái; điểm thuộc $(P)$ khi kết quả bằng $0$.'],
      solution:
        '$(3; 0; 0)$: $3 - 3 = 0$; $(1; -1; 0)$: $1 + 2 - 3 = 0$; $(0; 0; 3)$: $3 - 3 = 0$, ba điểm này thuộc $(P)$. $(1; 1; 1)$ cho $-3$ và $(2; 1; 2)$ cho $-1$, không thuộc $(P)$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một phòng gắn hệ trục $Oxyz$ (đơn vị là mét), mặt kính của một ô cửa nằm trong mặt phẳng $2x + y - 2z - 6 = 0$. Tính khoảng cách từ góc phòng $O$ đến mặt phẳng ấy (theo mét).',
      answer: 2,
      unit: 'm',
      hints: ['Thay $x_0 = y_0 = z_0 = 0$ vào công thức khoảng cách.'],
      solution: '$d(O, (P)) = \\dfrac{|-6|}{\\sqrt{2^2 + 1^2 + (-2)^2}} = \\dfrac{6}{3} = 2$ (m).',
    },
  ],
  takeaways: [
    'Vectơ pháp tuyến $\\vec{n} \\ne \\vec{0}$ có giá vuông góc với mặt phẳng; nếu $\\vec{u}$, $\\vec{v}$ là cặp vectơ chỉ phương thì $[\\vec{u}, \\vec{v}]$ là một vectơ pháp tuyến.',
    'Mặt phẳng $Ax + By + Cz + D = 0$ có vectơ pháp tuyến $(A; B; C)$; mặt phẳng qua $M_0$ có vectơ pháp tuyến $(A; B; C)$: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.',
    "$(P) \\parallel (P') \\iff \\vec{n}' = k\\vec{n}$, $D' \\ne kD$; $(P) \\perp (P') \\iff AA' + BB' + CC' = 0$.",
    '$d(M_0, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.',
  ],
};
