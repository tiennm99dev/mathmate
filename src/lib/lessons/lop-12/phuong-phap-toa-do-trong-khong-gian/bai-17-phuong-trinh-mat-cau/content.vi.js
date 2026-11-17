/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình mặt cầu tâm I(a; b; c) bán kính R; nhận biết phương trình dạng x² + y² + z² − 2ax − 2by − 2cz + d = 0 và tìm tâm, bán kính; vị trí của một điểm đối với mặt cầu; vận dụng vào vùng phủ sóng của trạm phát.',
  intro:
    'Một trạm phát sóng điện thoại đặt trên đỉnh cột có thể phủ sóng đến mọi điểm cách nó không quá $R$ km. Tập hợp các điểm cách trạm đúng $R$ km là một mặt cầu, ranh giới của vùng phủ sóng. Viết được phương trình của mặt cầu ấy, ta kiểm tra ngay một ngôi nhà, một chiếc máy bay có nằm trong vùng phủ sóng hay không chỉ bằng vài phép tính.',
  objectives: [
    'Nhận biết và viết phương trình mặt cầu khi biết tâm và bán kính.',
    'Xác định tâm và bán kính của mặt cầu từ phương trình; nhận biết phương trình dạng khai triển có là phương trình mặt cầu hay không.',
    'Xác định vị trí của một điểm đối với mặt cầu.',
    'Vận dụng phương trình mặt cầu vào bài toán thực tiễn như vùng phủ sóng, định vị.',
  ],
  sections: [
    {
      heading: 'Phương trình mặt cầu',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: mặt cầu tâm $I$ bán kính $R$ là tập hợp các điểm $M$ trong không gian thoả mãn $IM = R$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình mặt cầu',
          text: 'Mặt cầu $(S)$ tâm $I(a; b; c)$, bán kính $R$ có phương trình $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.',
        },
        {
          type: 'p',
          text: 'Giải thích: $M(x; y; z) \\in (S) \\iff IM^2 = R^2 \\iff (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.',
        },
        {
          type: 'p',
          text: 'Đặc biệt, mặt cầu tâm $O$ bán kính $R$ có phương trình $x^2 + y^2 + z^2 = R^2$.',
        },
      ],
    },
    {
      heading: 'Phương trình dạng khai triển',
      blocks: [
        {
          type: 'p',
          text: 'Khai triển phương trình mặt cầu, ta được $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ với $d = a^2 + b^2 + c^2 - R^2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Phương trình $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ là phương trình của một mặt cầu khi và chỉ khi $a^2 + b^2 + c^2 - d > 0$. Khi đó mặt cầu có tâm $I(a; b; c)$ và bán kính $R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Hệ số của $x^2$, $y^2$, $z^2$ phải bằng nhau (chia cả hai vế cho hệ số ấy để đưa về $1$) và không có các số hạng $xy$, $yz$, $zx$. Tâm có toạ độ bằng hệ số của $x$, $y$, $z$ chia cho $-2$.',
        },
      ],
    },
    {
      heading: 'Vị trí của một điểm đối với mặt cầu và ứng dụng',
      blocks: [
        {
          type: 'table',
          head: ['So sánh', 'Vị trí của $M$'],
          rows: [
            ['$IM < R$', 'Nằm trong mặt cầu'],
            ['$IM = R$', 'Nằm trên mặt cầu'],
            ['$IM > R$', 'Nằm ngoài mặt cầu'],
          ],
        },
        {
          type: 'p',
          text: 'Để tránh căn bậc hai, ta so sánh $IM^2$ với $R^2$. Một trạm phát đặt tại $I$ với bán kính phủ sóng $R$ phủ được điểm $M$ khi và chỉ khi $IM \\le R$, tức là $M$ nằm trong hoặc trên mặt cầu tâm $I$ bán kính $R$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vùng phủ trên mặt đất',
          text: 'Nếu trạm ở độ cao $c$ (tâm $I(a; b; c)$, mặt đất là mặt phẳng $z = 0$) và $c < R$ thì vùng phủ sóng trên mặt đất là hình tròn tâm $(a; b; 0)$, bán kính $r = \\sqrt{R^2 - c^2}$ (theo định lí Pythagore).',
        },
      ],
    },
  ],
  explore: {
    title: 'Vùng phủ sóng của trạm phát',
    instruction:
      'Dời tâm $I$ của trạm phát và đổi bán kính $R$ (km). Các điểm dân cư được phủ sóng chuyển sang màu xanh lá; hình tròn xanh trên mặt đất là vùng phủ sóng. Chọn một điểm để xem phép so sánh $IM^2$ với $R^2$. Hãy tìm vị trí trạm để phủ hết sáu điểm với bán kính nhỏ nhất.',
  },
  examples: [
    {
      problem: 'Viết phương trình mặt cầu tâm $I(1; -2; 3)$, bán kính $R = 4$.',
      steps: [
        'Thay $a = 1$, $b = -2$, $c = 3$, $R = 4$ vào $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.',
        'Được $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$.',
      ],
      answer: '$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 16$.',
    },
    {
      problem:
        'Chứng tỏ phương trình $x^2 + y^2 + z^2 - 2x + 4y - 6z - 2 = 0$ là phương trình mặt cầu. Tìm tâm và bán kính.',
      steps: [
        'So sánh với $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$: $a = 1$, $b = -2$, $c = 3$, $d = -2$.',
        '$a^2 + b^2 + c^2 - d = 1 + 4 + 9 + 2 = 16 > 0$, nên đây là phương trình mặt cầu.',
        'Tâm $I(1; -2; 3)$, bán kính $R = \\sqrt{16} = 4$.',
      ],
      answer: 'Mặt cầu tâm $I(1; -2; 3)$, bán kính $R = 4$.',
    },
    {
      problem: 'Viết phương trình mặt cầu đường kính $AB$ với $A(1; 2; -1)$, $B(3; 0; 3)$.',
      steps: [
        'Tâm $I$ là trung điểm của $AB$: $I(2; 1; 1)$.',
        '$AB = \\sqrt{2^2 + (-2)^2 + 4^2} = \\sqrt{24} = 2\\sqrt{6}$, nên $R = \\dfrac{AB}{2} = \\sqrt{6}$.',
        'Phương trình: $(x - 2)^2 + (y - 1)^2 + (z - 1)^2 = 6$.',
      ],
      answer: '$(x - 2)^2 + (y - 1)^2 + (z - 1)^2 = 6$.',
    },
    {
      problem:
        'Viết phương trình mặt cầu tâm $I(1; 2; -1)$ và tiếp xúc với mặt phẳng $(P): 2x - y + 2z - 7 = 0$.',
      steps: [
        'Mặt cầu tiếp xúc với $(P)$ nên bán kính bằng khoảng cách từ tâm đến $(P)$.',
        '$R = d(I, (P)) = \\dfrac{|2 \\cdot 1 - 2 + 2 \\cdot (-1) - 7|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$.',
        'Phương trình: $(x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 9$.',
      ],
      answer: '$(x - 1)^2 + (y - 2)^2 + (z + 1)^2 = 9$.',
    },
    {
      problem:
        'Một trạm phát sóng đặt tại $I(3; 2; 0)$ có bán kính phủ sóng $5$ km (đơn vị trên các trục là kilômét). Hai điểm $A(6; 6; 0)$ và $B(7; 5; 1)$ có được phủ sóng không?',
      steps: [
        'Vùng phủ sóng được giới hạn bởi mặt cầu $(x - 3)^2 + (y - 2)^2 + z^2 = 25$.',
        '$IA^2 = 3^2 + 4^2 + 0^2 = 25 = R^2$: $A$ nằm trên mặt cầu, vẫn được phủ sóng.',
        '$IB^2 = 4^2 + 3^2 + 1^2 = 26 > 25$: $B$ nằm ngoài mặt cầu, không được phủ sóng.',
      ],
      answer: '$A$ được phủ sóng, $B$ thì không.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Mặt cầu $(S): (x - 2)^2 + (y + 1)^2 + z^2 = 9$ có tâm và bán kính là',
      options: [
        '$I(2; -1; 0)$, $R = 3$',
        '$I(-2; 1; 0)$, $R = 3$',
        '$I(2; -1; 0)$, $R = 9$',
        '$I(-2; 1; 0)$, $R = 9$',
      ],
      answer: 0,
      hints: ['$(y + 1)^2 = (y - (-1))^2$; vế phải là $R^2$, không phải $R$.'],
      solution: 'Tâm $I(2; -1; 0)$ và $R^2 = 9$ nên $R = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tính bán kính của mặt cầu $x^2 + y^2 + z^2 + 4x - 2y + 6z + 5 = 0$.',
      answer: 3,
      hints: [
        'Tâm có toạ độ bằng hệ số của $x$, $y$, $z$ chia cho $-2$.',
        '$R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
      ],
      solution:
        '$a = -2$, $b = 1$, $c = -3$, $d = 5$. $R = \\sqrt{4 + 1 + 9 - 5} = \\sqrt{9} = 3$.',
    },
    {
      type: 'multi',
      prompt: 'Những phương trình nào là phương trình của một mặt cầu?',
      options: [
        '$x^2 + y^2 + z^2 - 2x + 4z + 1 = 0$',
        '$x^2 + y^2 + z^2 + 2x + 2y + 2z + 5 = 0$',
        '$x^2 + y^2 - z^2 + 2x - 1 = 0$',
        '$2x^2 + 2y^2 + 2z^2 - 4x - 2 = 0$',
        '$x^2 + y^2 + z^2 + 2xy - 1 = 0$',
      ],
      answers: [0, 3],
      hints: [
        'Hệ số của $x^2$, $y^2$, $z^2$ phải bằng nhau và không có số hạng $xy$.',
        'Đưa về dạng $x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ rồi kiểm tra $a^2 + b^2 + c^2 - d > 0$.',
      ],
      solution:
        'Phương trình đầu: $a = 1$, $b = 0$, $c = -2$, $d = 1$, $1 + 0 + 4 - 1 = 4 > 0$: mặt cầu. Phương trình thứ hai: $1 + 1 + 1 - 5 = -2 < 0$: không phải. Phương trình có $-z^2$ và phương trình có $2xy$ không có dạng cần thiết. Chia phương trình $2x^2 + 2y^2 + 2z^2 - 4x - 2 = 0$ cho $2$: $x^2 + y^2 + z^2 - 2x - 1 = 0$, $1 + 1 = 2 > 0$: mặt cầu.',
    },
    {
      type: 'number',
      prompt: 'Mặt cầu tâm $I(1; 0; -2)$ đi qua điểm $A(3; 1; 0)$. Tính bán kính của mặt cầu.',
      answer: 3,
      hints: ['Bán kính bằng $IA$.'],
      solution: '$\\overrightarrow{IA} = (2; 1; 2)$ nên $R = IA = \\sqrt{4 + 1 + 4} = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình mặt cầu đường kính $AB$ với $A(2; 0; 1)$, $B(0; 2; -3)$ là',
      options: [
        '$(x - 1)^2 + (y - 1)^2 + (z + 1)^2 = 6$',
        '$(x - 1)^2 + (y - 1)^2 + (z + 1)^2 = 24$',
        '$(x + 1)^2 + (y + 1)^2 + (z - 1)^2 = 6$',
        '$(x - 1)^2 + (y - 1)^2 + (z + 1)^2 = \\sqrt{6}$',
      ],
      answer: 0,
      hints: [
        'Tâm là trung điểm của $AB$, bán kính bằng $\\dfrac{AB}{2}$, nên $R^2 = \\dfrac{AB^2}{4}$.',
      ],
      solution:
        'Tâm $I(1; 1; -1)$. $AB^2 = 4 + 4 + 16 = 24$ nên $R^2 = \\dfrac{24}{4} = 6$. Phương trình: $(x - 1)^2 + (y - 1)^2 + (z + 1)^2 = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để phương trình $x^2 + y^2 + z^2 - 2x + 2y - 4z + m = 0$ là phương trình mặt cầu có bán kính bằng $3$.',
      answer: -3,
      hints: ['$R^2 = a^2 + b^2 + c^2 - d$ với $a = 1$, $b = -1$, $c = 2$, $d = m$.'],
      solution: '$R^2 = 1 + 1 + 4 - m = 6 - m = 9$, nên $m = -3$.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $M(1; 1; 1)$ nằm ở đâu so với mặt cầu $(S): (x - 1)^2 + (y + 1)^2 + (z - 2)^2 = 4$?',
      options: ['Nằm ngoài mặt cầu', 'Nằm trong mặt cầu', 'Nằm trên mặt cầu'],
      answer: 0,
      hints: ['So sánh $IM^2$ với $R^2 = 4$, trong đó $I(1; -1; 2)$.'],
      solution: '$IM^2 = 0^2 + 2^2 + (-1)^2 = 5 > 4$, nên $M$ nằm ngoài mặt cầu.',
    },
    {
      type: 'number',
      prompt:
        'Mặt cầu tâm $I(1; -2; 3)$ tiếp xúc với mặt phẳng $(P): 2x + y + 2z + 3 = 0$. Tính bán kính của mặt cầu.',
      answer: 3,
      hints: ['Bán kính bằng khoảng cách từ $I$ đến $(P)$.'],
      solution: '$R = \\dfrac{|2 - 2 + 6 + 3|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Một trạm ra-đa đặt tại gốc $O$ phát hiện được mọi vật cách nó không quá $50$ km. Một máy bay đang ở điểm $A(30; 40; 10)$ (đơn vị: km). Ra-đa có phát hiện được máy bay không?',
      options: ['Không', 'Có'],
      answer: 0,
      hints: ['So sánh $OA^2$ với $50^2 = 2500$.'],
      solution:
        '$OA^2 = 30^2 + 40^2 + 10^2 = 900 + 1600 + 100 = 2600 > 2500$: máy bay nằm ngoài mặt cầu $x^2 + y^2 + z^2 = 2500$, ra-đa không phát hiện được.',
    },
  ],
  takeaways: [
    'Mặt cầu tâm $I(a; b; c)$, bán kính $R$: $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$.',
    '$x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$ là mặt cầu khi $a^2 + b^2 + c^2 - d > 0$; tâm $I(a; b; c)$, $R = \\sqrt{a^2 + b^2 + c^2 - d}$.',
    'So sánh $IM^2$ với $R^2$ để biết $M$ nằm trong, trên hay ngoài mặt cầu.',
  ],
};
