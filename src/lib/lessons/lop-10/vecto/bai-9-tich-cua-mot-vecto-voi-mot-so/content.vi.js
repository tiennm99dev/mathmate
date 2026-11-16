/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tích của một vectơ với một số: định nghĩa, tính chất, hệ thức trung điểm và trọng tâm, điều kiện để hai vectơ cùng phương và ba điểm thẳng hàng.',
  intro:
    'Một ô tô chạy với vận tốc $\\vec v$. Nếu nó chạy theo đúng hướng đó nhưng nhanh gấp đôi, vận tốc mới là $\\vec v + \\vec v$, ta viết gọn là $2\\vec v$. Nếu nó lùi lại với cùng tốc độ, vận tốc là $-\\vec v$. Nhân một vectơ với một số làm vectơ dài ra, ngắn lại hoặc quay ngược hướng.',
  objectives: [
    'Xác định tích của một vectơ với một số và vận dụng các tính chất của nó.',
    'Dùng hệ thức vectơ của trung điểm đoạn thẳng và trọng tâm tam giác.',
    'Dùng điều kiện cùng phương để chứng minh ba điểm thẳng hàng.',
    'Biểu thị một vectơ theo hai vectơ không cùng phương.',
  ],
  sections: [
    {
      heading: 'Định nghĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tích của vectơ với một số',
          text: 'Tích của một vectơ $\\vec a \\ne \\vec 0$ với một số thực $k > 0$ là một vectơ, kí hiệu $k\\vec a$, cùng hướng với $\\vec a$ và có độ dài bằng $k|\\vec a|$. Tích của $\\vec a \\ne \\vec 0$ với số thực $k < 0$ là vectơ $k\\vec a$ ngược hướng với $\\vec a$ và có độ dài bằng $|k| \\cdot |\\vec a|$.',
        },
        {
          type: 'p',
          text: 'Quy ước: $k\\vec a = \\vec 0$ nếu $\\vec a = \\vec 0$ hoặc $k = 0$. Như vậy luôn có $|k\\vec a| = |k| \\cdot |\\vec a|$, và $(-1)\\vec a = -\\vec a$ là vectơ đối của $\\vec a$.',
        },
        {
          type: 'table',
          head: ['$k$', 'Hướng của $k\\vec a$', 'Độ dài'],
          rows: [
            ['$k > 0$', 'cùng hướng với $\\vec a$', '$k|\\vec a|$'],
            ['$k < 0$', 'ngược hướng với $\\vec a$', '$-k|\\vec a|$'],
            ['$k = 0$', '$k\\vec a = \\vec 0$', '$0$'],
          ],
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'p',
          text: 'Với hai vectơ $\\vec a$, $\\vec b$ và hai số thực $h$, $k$ tuỳ ý:',
        },
        {
          type: 'list',
          items: [
            '$k(\\vec a + \\vec b) = k\\vec a + k\\vec b$; $k(\\vec a - \\vec b) = k\\vec a - k\\vec b$;',
            '$(h + k)\\vec a = h\\vec a + k\\vec a$;',
            '$h(k\\vec a) = (hk)\\vec a$;',
            '$1\\vec a = \\vec a$; $(-1)\\vec a = -\\vec a$.',
          ],
        },
        {
          type: 'p',
          text: 'Nhờ các tính chất này, ta biến đổi biểu thức vectơ như biến đổi biểu thức đại số: $2(\\vec a + \\vec b) - 3\\vec a = 2\\vec a + 2\\vec b - 3\\vec a = -\\vec a + 2\\vec b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trung điểm và trọng tâm',
          text: 'Nếu $I$ là trung điểm của đoạn thẳng $AB$ thì $\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI}$ với mọi điểm $M$. Nếu $G$ là trọng tâm của tam giác $ABC$ thì $\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG}$ với mọi điểm $M$.',
        },
        {
          type: 'p',
          text: 'Chứng minh hệ thức trọng tâm: chèn điểm $G$ vào từng vectơ, $\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG} + (\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC}) = 3\\overrightarrow{MG}$, vì $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = \\vec 0$. Hệ thức trung điểm chứng minh tương tự với $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$.',
        },
      ],
    },
    {
      heading: 'Điều kiện để hai vectơ cùng phương',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện cùng phương',
          text: 'Hai vectơ $\\vec a$ và $\\vec b$ ($\\vec b \\ne \\vec 0$) cùng phương khi và chỉ khi có số $k$ để $\\vec a = k\\vec b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ba điểm thẳng hàng',
          text: 'Ba điểm phân biệt $A$, $B$, $C$ thẳng hàng khi và chỉ khi có số $k \\ne 0$ để $\\overrightarrow{AB} = k\\overrightarrow{AC}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phân tích một vectơ theo hai vectơ không cùng phương',
          text: 'Cho hai vectơ không cùng phương $\\vec a$ và $\\vec b$. Mọi vectơ $\\vec x$ đều biểu thị được một cách duy nhất theo $\\vec a$ và $\\vec b$: có duy nhất cặp số $(h; k)$ sao cho $\\vec x = h\\vec a + k\\vec b$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Co giãn vectơ',
    instruction:
      'Ở chế độ "Nhân vectơ với số k", kéo $A$, $B$ để đổi $\\vec a = \\overrightarrow{AB}$ và kéo thanh trượt $k$: điểm $C$ với $\\overrightarrow{AC} = k\\vec a$ luôn nằm trên đường thẳng $AB$. Ở chế độ "Hệ thức trọng tâm", kéo các đỉnh và điểm $M$ để kiểm tra $\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG}$.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$, gọi $M$, $N$ lần lượt là trung điểm của $AB$, $AC$. Chứng minh rằng $\\overrightarrow{MN} = \\dfrac{1}{2}\\overrightarrow{BC}$.',
      steps: [
        'Theo quy tắc hiệu, $\\overrightarrow{MN} = \\overrightarrow{AN} - \\overrightarrow{AM}$.',
        '$N$ là trung điểm $AC$ nên $\\overrightarrow{AN} = \\dfrac{1}{2}\\overrightarrow{AC}$; tương tự $\\overrightarrow{AM} = \\dfrac{1}{2}\\overrightarrow{AB}$.',
        'Do đó $\\overrightarrow{MN} = \\dfrac{1}{2}(\\overrightarrow{AC} - \\overrightarrow{AB}) = \\dfrac{1}{2}\\overrightarrow{BC}$.',
      ],
      answer:
        '$\\overrightarrow{MN} = \\dfrac{1}{2}\\overrightarrow{BC}$: đường trung bình $MN$ song song với $BC$ và bằng nửa $BC$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ có trọng tâm $G$. Biểu thị $\\overrightarrow{AG}$ theo $\\overrightarrow{AB}$ và $\\overrightarrow{AC}$.',
      steps: [
        'Áp dụng hệ thức trọng tâm với $M \\equiv A$: $\\overrightarrow{AA} + \\overrightarrow{AB} + \\overrightarrow{AC} = 3\\overrightarrow{AG}$.',
        'Vì $\\overrightarrow{AA} = \\vec 0$ nên $3\\overrightarrow{AG} = \\overrightarrow{AB} + \\overrightarrow{AC}$.',
      ],
      answer:
        '$\\overrightarrow{AG} = \\dfrac{1}{3}\\overrightarrow{AB} + \\dfrac{1}{3}\\overrightarrow{AC}$.',
    },
    {
      problem:
        'Cho hai điểm phân biệt $A$, $B$ và điểm $M$ thoả mãn $\\overrightarrow{MA} + 2\\overrightarrow{MB} = \\vec 0$. Chứng minh $M$ nằm trên đoạn thẳng $AB$ và biểu thị $\\overrightarrow{AM}$ theo $\\overrightarrow{AB}$.',
      steps: [
        'Từ giả thiết, $\\overrightarrow{MA} = -2\\overrightarrow{MB}$: hai vectơ $\\overrightarrow{MA}$, $\\overrightarrow{MB}$ ngược hướng, nên $M$ nằm giữa $A$ và $B$, và $MA = 2MB$.',
        'Chèn điểm $A$: $\\overrightarrow{MA} + 2(\\overrightarrow{MA} + \\overrightarrow{AB}) = \\vec 0$, tức là $3\\overrightarrow{MA} + 2\\overrightarrow{AB} = \\vec 0$.',
        'Suy ra $3\\overrightarrow{AM} = 2\\overrightarrow{AB}$.',
      ],
      answer: '$M$ thuộc đoạn $AB$ và $\\overrightarrow{AM} = \\dfrac{2}{3}\\overrightarrow{AB}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho vectơ $\\vec a \\ne \\vec 0$. Vectơ $-3\\vec a$',
      options: [
        'ngược hướng với $\\vec a$ và có độ dài $3|\\vec a|$',
        'cùng hướng với $\\vec a$ và có độ dài $3|\\vec a|$',
        'ngược hướng với $\\vec a$ và có độ dài $\\dfrac{1}{3}|\\vec a|$',
        'cùng hướng với $\\vec a$ và có độ dài $-3|\\vec a|$',
      ],
      answer: 0,
      hints: ['Dấu của $k$ quyết định hướng, $|k|$ quyết định độ dài.'],
      solution:
        '$k = -3 < 0$ nên $-3\\vec a$ ngược hướng với $\\vec a$; độ dài $|-3| \\cdot |\\vec a| = 3|\\vec a|$. Độ dài không bao giờ âm.',
    },
    {
      type: 'number',
      prompt: 'Cho $|\\vec a| = 4$. Tính $|-2{,}5\\vec a|$.',
      answer: 10,
      hints: ['$|k\\vec a| = |k| \\cdot |\\vec a|$.'],
      solution: '$|-2{,}5\\vec a| = 2{,}5 \\cdot 4 = 10$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $I$ là trung điểm của đoạn thẳng $AB$ và $M$ là điểm bất kì. Vectơ $\\overrightarrow{MA} + \\overrightarrow{MB}$ bằng',
      options: [
        '$2\\overrightarrow{MI}$',
        '$\\overrightarrow{MI}$',
        '$\\dfrac{1}{2}\\overrightarrow{MI}$',
        '$\\vec 0$',
      ],
      answer: 0,
      hints: [
        'Chèn điểm $I$: $\\overrightarrow{MA} = \\overrightarrow{MI} + \\overrightarrow{IA}$.',
      ],
      solution:
        '$\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI} + (\\overrightarrow{IA} + \\overrightarrow{IB}) = 2\\overrightarrow{MI}$ vì $\\overrightarrow{IA} + \\overrightarrow{IB} = \\vec 0$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn $2(\\vec a + \\vec b) - 3(\\vec a - \\vec b)$.',
      options: [
        '$-\\vec a + 5\\vec b$',
        '$-\\vec a - \\vec b$',
        '$5\\vec a - \\vec b$',
        '$-\\vec a + \\vec b$',
      ],
      answer: 0,
      hints: ['Phá ngoặc như với biểu thức đại số: $k(\\vec a - \\vec b) = k\\vec a - k\\vec b$.'],
      solution:
        '$2\\vec a + 2\\vec b - 3\\vec a + 3\\vec b = (2 - 3)\\vec a + (2 + 3)\\vec b = -\\vec a + 5\\vec b$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $M$ là trung điểm của đoạn thẳng $AB$. Tìm số $k$ sao cho $\\overrightarrow{MA} = k\\overrightarrow{MB}$.',
      answer: -1,
      hints: [
        '$\\overrightarrow{MA}$ và $\\overrightarrow{MB}$ có cùng độ dài; chúng cùng hướng hay ngược hướng?',
      ],
      solution:
        '$MA = MB$ và $\\overrightarrow{MA}$, $\\overrightarrow{MB}$ ngược hướng, nên $\\overrightarrow{MA} = -\\overrightarrow{MB}$, tức là $k = -1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Điểm $M$ nằm trên đoạn thẳng $AB$ và $MA = 3MB$. Tìm $k$ sao cho $\\overrightarrow{AM} = k\\overrightarrow{AB}$ (viết dưới dạng phân số).',
      answer: [3, 4],
      hints: [
        'Chia đoạn $AB$ thành các phần bằng $MB$: $AB = MA + MB$.',
        '$AB = 4MB$ và $AM = 3MB$; hai vectơ $\\overrightarrow{AM}$, $\\overrightarrow{AB}$ cùng hướng.',
      ],
      solution:
        '$AB = MA + MB = 4MB$, $AM = 3MB = \\dfrac{3}{4}AB$, và $\\overrightarrow{AM}$, $\\overrightarrow{AB}$ cùng hướng nên $\\overrightarrow{AM} = \\dfrac{3}{4}\\overrightarrow{AB}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho tam giác $ABC$ có trọng tâm $G$, $M$ là trung điểm của $BC$. Tìm $k$ sao cho $\\overrightarrow{AG} = k\\overrightarrow{AM}$.',
      answer: [2, 3],
      hints: ['Trọng tâm nằm trên trung tuyến và cách đỉnh một khoảng bằng mấy phần trung tuyến?'],
      solution:
        '$G$ nằm trên đoạn $AM$ và $AG = \\dfrac{2}{3}AM$; $\\overrightarrow{AG}$, $\\overrightarrow{AM}$ cùng hướng, nên $\\overrightarrow{AG} = \\dfrac{2}{3}\\overrightarrow{AM}$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hai vectơ $\\vec a$, $\\vec b$ không cùng phương. Chọn tất cả các cặp vectơ cùng phương.',
      options: [
        '$\\vec a$ và $-2\\vec a$',
        '$3\\vec a$ và $\\dfrac{1}{2}\\vec a$',
        '$2\\vec a - 2\\vec b$ và $\\vec b - \\vec a$',
        '$\\vec a + \\vec b$ và $\\vec a - \\vec b$',
      ],
      answers: [0, 1, 2],
      hints: ['Tìm số $k$ để vectơ này bằng $k$ lần vectơ kia.'],
      solution:
        '$-2\\vec a = (-2)\\vec a$; $3\\vec a = 6 \\cdot \\dfrac{1}{2}\\vec a$; $2\\vec a - 2\\vec b = -2(\\vec b - \\vec a)$: ba cặp đầu cùng phương. Nếu $\\vec a + \\vec b = k(\\vec a - \\vec b)$ thì $(1 - k)\\vec a = -(1 + k)\\vec b$; vì $\\vec a$, $\\vec b$ không cùng phương nên $1 - k = 0$ và $1 + k = 0$, vô lí. Vậy $\\vec a + \\vec b$ và $\\vec a - \\vec b$ không cùng phương.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho hình bình hành $ABCD$ có tâm $O$. Tìm số $x$ sao cho $\\overrightarrow{AO} = x(\\overrightarrow{AB} + \\overrightarrow{AD})$.',
      answer: [1, 2],
      hints: [
        'Theo quy tắc hình bình hành, $\\overrightarrow{AB} + \\overrightarrow{AD}$ bằng vectơ nào?',
        '$O$ là trung điểm của đường chéo $AC$.',
      ],
      solution:
        '$\\overrightarrow{AB} + \\overrightarrow{AD} = \\overrightarrow{AC} = 2\\overrightarrow{AO}$, nên $\\overrightarrow{AO} = \\dfrac{1}{2}(\\overrightarrow{AB} + \\overrightarrow{AD})$, tức là $x = \\dfrac{1}{2}$.',
    },
  ],
  takeaways: [
    '$k\\vec a$ cùng hướng với $\\vec a$ khi $k > 0$, ngược hướng khi $k < 0$; $|k\\vec a| = |k| \\cdot |\\vec a|$.',
    '$k(\\vec a + \\vec b) = k\\vec a + k\\vec b$, $(h + k)\\vec a = h\\vec a + k\\vec a$, $h(k\\vec a) = (hk)\\vec a$.',
    '$I$ trung điểm $AB$: $\\overrightarrow{MA} + \\overrightarrow{MB} = 2\\overrightarrow{MI}$; $G$ trọng tâm: $\\overrightarrow{MA} + \\overrightarrow{MB} + \\overrightarrow{MC} = 3\\overrightarrow{MG}$.',
    '$\\vec a$, $\\vec b$ ($\\vec b \\ne \\vec 0$) cùng phương $\\Leftrightarrow$ $\\vec a = k\\vec b$; $A$, $B$, $C$ thẳng hàng $\\Leftrightarrow$ $\\overrightarrow{AB} = k\\overrightarrow{AC}$.',
    'Với $\\vec a$, $\\vec b$ không cùng phương, mọi $\\vec x$ viết duy nhất được dưới dạng $h\\vec a + k\\vec b$.',
  ],
};
