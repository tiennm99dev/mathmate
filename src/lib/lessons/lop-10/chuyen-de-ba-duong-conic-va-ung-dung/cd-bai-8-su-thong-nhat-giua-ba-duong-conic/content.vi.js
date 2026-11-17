/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba đường conic có chung một định nghĩa: tập hợp các điểm M có MF / d(M, Δ) = e; e < 1 cho elip, e = 1 cho parabol, e > 1 cho hypebol. Ba đường conic cũng là giao tuyến của mặt nón tròn xoay với một mặt phẳng.',
  intro:
    'Elip, hypebol và parabol trông rất khác nhau: một đường cong kín, một đường hai nhánh, một đường mở. Vậy mà chúng là "anh em một nhà": cùng sinh ra từ một tiêu điểm, một đường chuẩn và một con số duy nhất là tâm sai, và cùng hiện ra khi ta cắt một mặt nón bằng một mặt phẳng.',
  objectives: [
    'Nhận biết tính chất chung $\\dfrac{MF}{d(M, \\Delta)} = e$ của ba đường conic.',
    'Phát biểu được định nghĩa đường conic theo tiêu điểm, đường chuẩn và tâm sai; phân loại đường conic theo tâm sai.',
    'Lập được phương trình đường conic khi biết tiêu điểm, đường chuẩn tương ứng và tâm sai.',
    'Giải thích được vì sao các đường conic là giao tuyến của mặt nón với mặt phẳng.',
  ],
  sections: [
    {
      heading: 'Đường chuẩn và tâm sai của ba đường conic',
      blocks: [
        {
          type: 'p',
          text: 'Ở các bài trước, mỗi đường conic đều có tiêu điểm, đường chuẩn tương ứng và tâm sai, và tỉ số khoảng cách từ một điểm của đường đến tiêu điểm và đến đường chuẩn tương ứng luôn bằng tâm sai.',
        },
        {
          type: 'table',
          head: ['Đường', 'Phương trình chính tắc', 'Tâm sai', 'Đường chuẩn'],
          rows: [
            [
              'Elip',
              '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$',
              '$e = \\dfrac{c}{a} < 1$',
              '$x = \\pm\\dfrac{a}{e}$',
            ],
            ['Parabol', '$y^2 = 2px$', '$e = 1$', '$x = -\\dfrac{p}{2}$'],
            [
              'Hypebol',
              '$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$',
              '$e = \\dfrac{c}{a} > 1$',
              '$x = \\pm\\dfrac{a}{e}$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Với mọi điểm $M$ thuộc một trong ba đường trên, tiêu điểm $F$ và đường chuẩn $\\Delta$ tương ứng: $\\dfrac{MF}{d(M, \\Delta)} = e$.',
        },
      ],
    },
    {
      heading: 'Định nghĩa đường conic',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường conic',
          text: 'Cho điểm $F$ cố định, đường thẳng $\\Delta$ cố định không đi qua $F$ và số thực dương $e$. Tập hợp các điểm $M$ sao cho $\\dfrac{MF}{d(M, \\Delta)} = e$ gọi là một đường conic. $F$ là tiêu điểm, $\\Delta$ là đường chuẩn (ứng với $F$) và $e$ là tâm sai của đường conic.',
        },
        {
          type: 'list',
          items: [
            'Nếu $0 < e < 1$ thì đường conic là một elip.',
            'Nếu $e = 1$ thì đường conic là một parabol.',
            'Nếu $e > 1$ thì đường conic là một hypebol.',
          ],
        },
        {
          type: 'p',
          text: 'Để lập phương trình đường conic, lấy $M(x; y)$ bất kì, viết $MF^2 = e^2 \\cdot d(M, \\Delta)^2$ rồi khai triển và rút gọn. Cách này dùng được cả khi đường chuẩn không song song với trục toạ độ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết?',
          text: "Quỹ đạo của một sao chổi quanh Mặt Trời là một đường conic nhận tâm Mặt Trời làm tiêu điểm. Sao chổi Halley ($e \\approx 0{,}967$) và Hale-Bopp ($e \\approx 0{,}995$) có quỹ đạo elip nên quay trở lại; còn vật thể 'Oumuamua ($e \\approx 1{,}201$) bay theo quỹ đạo hypebol, đi qua Hệ Mặt Trời một lần rồi không quay lại.",
        },
      ],
    },
    {
      heading: 'Đường conic là giao của mặt nón với mặt phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Cho mặt nón tròn xoay có đỉnh $O$, trục $d$ và nửa góc ở đỉnh $\\alpha$ ($0^\\circ < \\alpha < 90^\\circ$). Cắt mặt nón bởi một mặt phẳng $(P)$ không đi qua đỉnh $O$:',
        },
        {
          type: 'list',
          items: [
            '$(P)$ vuông góc với trục $d$: giao tuyến là một đường tròn.',
            '$(P)$ cắt mọi đường sinh của một nửa mặt nón (nghiêng ít hơn đường sinh): giao tuyến là một elip.',
            '$(P)$ song song với đúng một đường sinh: giao tuyến là một parabol.',
            '$(P)$ cắt cả hai nửa mặt nón: giao tuyến là một hypebol.',
          ],
        },
        {
          type: 'p',
          text: 'Người ta chứng minh được (bằng các mặt cầu Dandelin nội tiếp mặt nón và tiếp xúc với $(P)$) rằng tiếp điểm của mỗi mặt cầu với $(P)$ là một tiêu điểm, và tâm sai của giao tuyến là $e = \\dfrac{\\sin\\varphi}{\\cos\\alpha}$, với $\\varphi$ là góc giữa $(P)$ và mặt phẳng vuông góc với trục. Vì thế $e < 1$, $e = 1$ hay $e > 1$ tuỳ theo $\\varphi$ nhỏ hơn, bằng hay lớn hơn $90^\\circ - \\alpha$. Đó là lí do ba đường này được gọi chung là các đường conic (conic: thuộc về hình nón).',
        },
        { type: 'widget', name: 'cone' },
      ],
    },
    {
      heading: 'Dự án: Cắt "mặt nón ánh sáng"',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: quan sát cả bốn loại giao tuyến của mặt nón với mặt phẳng bằng chùm sáng hình nón của một chiếc đèn pin, rồi đo để kiểm chứng điều kiện về góc.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: đèn pin có chùm sáng hình nón rõ nét (hoặc đèn bàn có chụp tròn), một bức tường phẳng hoặc tấm bìa trắng, thước đo góc, giấy kẻ ô, phòng hơi tối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo nửa góc ở đỉnh $\\alpha$ của chùm sáng: chiếu thẳng vào tường, đo bán kính vệt sáng $r$ và khoảng cách $h$ từ bóng đèn đến tường, rồi tính $\\tan\\alpha = \\dfrac{r}{h}$.',
            'Chiếu đèn vuông góc với tường: vệt sáng là đường tròn. Nghiêng dần đèn: vệt sáng thành elip và dài dần ra. Ghi lại góc nghiêng khi vệt sáng vừa "hở" một đầu (parabol) và so với $90^\\circ - \\alpha$.',
            'Đặt đèn sát tường, chiếu gần như song song với tường: vệt sáng là một nhánh hypebol.',
            'Với một vệt sáng elip, đánh dấu trên giấy dán tường hai đầu trục lớn và hai đầu trục nhỏ, đo $2a$, $2b$ rồi tính tâm sai, so với công thức $e = \\dfrac{\\sin\\varphi}{\\cos\\alpha}$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: ảnh chụp bốn loại vệt sáng, bảng số đo góc và tâm sai, nhận xét về sai số và giải thích vì sao vệt sáng trên tường là một đường conic.',
        },
      ],
    },
  ],
  explore: {
    title: 'Một tiêu điểm, một đường chuẩn, một tâm sai',
    instruction:
      'Kéo thanh trượt tâm sai $e$ và đổi khoảng cách từ $F$ đến $\\Delta$; kéo điểm $M$ trên đường cong (hoặc chọn nó rồi dùng phím mũi tên). Tỉ số $\\dfrac{MF}{d(M, \\Delta)}$ luôn bằng $e$; quan sát đường conic chuyển từ elip ($e < 1$) sang parabol ($e = 1$) rồi hypebol ($e > 1$).',
  },
  examples: [
    {
      problem:
        'Lập phương trình đường conic có tâm sai $e = \\dfrac{2}{3}$, một tiêu điểm $F(-2; 0)$ và đường chuẩn tương ứng $\\Delta: x + \\dfrac{9}{2} = 0$.',
      steps: [
        'Điểm $M(x; y)$ thuộc đường conic khi và chỉ khi $MF = \\dfrac{2}{3}d(M, \\Delta)$, tức là $3\\sqrt{(x + 2)^2 + y^2} = 2\\left|x + \\dfrac{9}{2}\\right|$.',
        'Bình phương hai vế: $9\\left[(x + 2)^2 + y^2\\right] = 4\\left(x + \\dfrac{9}{2}\\right)^2$.',
        'Khai triển: $9x^2 + 36x + 36 + 9y^2 = 4x^2 + 36x + 81$, tức là $5x^2 + 9y^2 = 45$.',
      ],
      answer:
        '$\\dfrac{x^2}{9} + \\dfrac{y^2}{5} = 1$: một elip, phù hợp với $e = \\dfrac{2}{3} < 1$.',
    },
    {
      problem:
        'Viết phương trình đường conic có tâm sai bằng $1$, tiêu điểm $F(2; 0)$ và đường chuẩn $\\Delta: x + 2 = 0$.',
      steps: [
        '$e = 1$ nên $MF = d(M, \\Delta)$: $(x - 2)^2 + y^2 = (x + 2)^2$.',
        'Rút gọn: $-4x + y^2 = 4x$, tức là $y^2 = 8x$.',
      ],
      answer: 'Parabol $y^2 = 8x$.',
    },
    {
      problem:
        'Lập phương trình đường conic có tâm sai bằng $1$, tiêu điểm $F(1; 1)$ và đường chuẩn $\\Delta: x + y = 0$.',
      steps: [
        '$d(M, \\Delta) = \\dfrac{|x + y|}{\\sqrt{2}}$ và $MF^2 = (x - 1)^2 + (y - 1)^2$.',
        '$MF^2 = d(M, \\Delta)^2$: $2(x - 1)^2 + 2(y - 1)^2 = (x + y)^2$.',
        'Khai triển và rút gọn: $x^2 - 2xy + y^2 - 4x - 4y + 4 = 0$.',
      ],
      answer:
        'Parabol $x^2 - 2xy + y^2 - 4x - 4y + 4 = 0$ (trục của nó là đường thẳng $y = x$, không song song với trục toạ độ).',
    },
    {
      problem:
        'Viết phương trình các đường chuẩn của: a) elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$; b) hypebol $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$; c) parabol $y^2 = 6x$.',
      steps: [
        'a) $c = 3$, $e = \\dfrac{3}{5}$, đường chuẩn $x = \\pm\\dfrac{a}{e} = \\pm\\dfrac{25}{3}$.',
        'b) $c = 5$, $e = \\dfrac{5}{4}$, đường chuẩn $x = \\pm\\dfrac{4}{5/4} = \\pm\\dfrac{16}{5}$.',
        'c) $p = 3$, đường chuẩn $x = -\\dfrac{3}{2}$.',
      ],
      answer: 'a) $x = \\pm\\dfrac{25}{3}$; b) $x = \\pm\\dfrac{16}{5}$; c) $x = -\\dfrac{3}{2}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường conic có tâm sai $e = 1{,}5$ là',
      options: ['một hypebol', 'một elip', 'một parabol', 'một đường tròn'],
      answer: 0,
      hints: ['So sánh tâm sai với $1$.'],
      solution: '$e = 1{,}5 > 1$ nên đường conic là một hypebol.',
    },
    {
      type: 'number',
      prompt:
        'Đường conic có tâm sai $\\dfrac{1}{2}$, tiêu điểm $F(-1; 0)$ và đường chuẩn tương ứng $x + 4 = 0$ có phương trình $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$. Tìm $b^2$.',
      answer: 3,
      hints: [
        'Viết $MF^2 = \\dfrac{1}{4}(x + 4)^2$.',
        'Khai triển $(x + 1)^2 + y^2 = \\dfrac{(x + 4)^2}{4}$ rồi đưa về dạng chính tắc.',
      ],
      solution:
        '$4(x + 1)^2 + 4y^2 = (x + 4)^2 \\Leftrightarrow 3x^2 + 4y^2 = 12 \\Leftrightarrow \\dfrac{x^2}{4} + \\dfrac{y^2}{3} = 1$. Vậy $b^2 = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Đường conic có tâm sai bằng $2$, tiêu điểm $F(4; 0)$ và đường chuẩn tương ứng $x = 1$ có phương trình $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$. Tìm $b^2$.',
      answer: 12,
      hints: ['$MF^2 = 4(x - 1)^2$.', 'Khai triển $(x - 4)^2 + y^2 = 4(x - 1)^2$.'],
      solution:
        '$x^2 - 8x + 16 + y^2 = 4x^2 - 8x + 4 \\Leftrightarrow 3x^2 - y^2 = 12 \\Leftrightarrow \\dfrac{x^2}{4} - \\dfrac{y^2}{12} = 1$. Vậy $b^2 = 12$.',
    },
    {
      type: 'choice',
      prompt:
        'So sánh tâm sai của hai elip $(E_1): \\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$ và $(E_2): \\dfrac{x^2}{100} + \\dfrac{y^2}{64} = 1$.',
      options: [
        'Bằng nhau, cùng bằng $\\dfrac{3}{5}$',
        'Tâm sai của $(E_2)$ gấp đôi tâm sai của $(E_1)$',
        'Tâm sai của $(E_1)$ gấp đôi tâm sai của $(E_2)$',
        'Tâm sai của $(E_2)$ gấp bốn tâm sai của $(E_1)$',
      ],
      answer: 0,
      hints: ['Tính $c$ của từng elip.'],
      solution:
        '$(E_1)$: $c = 3$, $e = \\dfrac{3}{5}$. $(E_2)$: $c = \\sqrt{100 - 64} = 6$, $e = \\dfrac{6}{10} = \\dfrac{3}{5}$. Hai elip có cùng tâm sai: $(E_2)$ chính là $(E_1)$ phóng to gấp $2$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Đường chuẩn của parabol $y^2 = 6x$ có phương trình $x = m$. Tìm $m$ (viết dạng số thập phân).',
      answer: -1.5,
      hints: ['$2p = 6$; đường chuẩn là $x = -\\dfrac{p}{2}$.'],
      solution: '$p = 3$, nên $m = -\\dfrac{3}{2} = -1{,}5$.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi cách cắt mặt nón (mặt phẳng không đi qua đỉnh) với giao tuyến nhận được.',
      left: [
        'Mặt phẳng vuông góc với trục',
        'Mặt phẳng song song với đúng một đường sinh',
        'Mặt phẳng cắt cả hai nửa mặt nón',
        'Mặt phẳng cắt mọi đường sinh của một nửa mặt nón, không vuông góc với trục',
      ],
      right: ['Đường tròn', 'Parabol', 'Hypebol', 'Elip'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tâm sai $e = \\dfrac{\\sin\\varphi}{\\cos\\alpha}$ tăng khi mặt phẳng nghiêng dần.'],
      solution:
        'Vuông góc với trục: đường tròn ($e = 0$). Cắt mọi đường sinh của một nửa mặt nón: elip. Song song với một đường sinh: parabol. Cắt cả hai nửa: hypebol.',
    },
    {
      type: 'number',
      prompt:
        'Quỹ đạo sao chổi Halley là elip nhận tâm Mặt Trời làm một tiêu điểm, tâm sai $0{,}967$. Khoảng cách gần nhất từ sao chổi đến Mặt Trời khoảng $88$ triệu km. Tính khoảng cách xa nhất, theo triệu km (làm tròn đến hàng đơn vị).',
      answer: 5245,
      tolerance: 1,
      hints: [
        'Gần nhất là $a - c = a(1 - e)$, xa nhất là $a + c = a(1 + e)$.',
        'Tính $a = \\dfrac{88}{1 - 0{,}967}$.',
      ],
      solution:
        '$a = \\dfrac{88}{0{,}033} \\approx 2\\,666{,}67$; xa nhất $a(1 + e) \\approx 2\\,666{,}67 \\cdot 1{,}967 \\approx 5\\,245$ (triệu km), tức khoảng $5{,}2$ tỉ km.',
    },
    {
      type: 'choice',
      prompt:
        "Vật thể 'Oumuamua bay qua Hệ Mặt Trời theo quỹ đạo có tâm sai khoảng $1{,}201$. Quỹ đạo đó là",
      options: [
        'một nhánh hypebol, vật thể không quay trở lại',
        'một elip, vật thể sẽ quay trở lại',
        'một parabol',
        'một đường tròn',
      ],
      answer: 0,
      hints: ['So sánh tâm sai với $1$.'],
      solution:
        '$e \\approx 1{,}201 > 1$ nên quỹ đạo là hypebol: vật thể đi qua một lần rồi rời xa mãi.',
    },
  ],
  takeaways: [
    'Đường conic: tập hợp các điểm $M$ với $\\dfrac{MF}{d(M, \\Delta)} = e$ ($F \\notin \\Delta$, $e > 0$).',
    '$0 < e < 1$: elip; $e = 1$: parabol; $e > 1$: hypebol.',
    'Lập phương trình: viết $MF^2 = e^2 \\cdot d(M, \\Delta)^2$ rồi rút gọn.',
    'Cắt mặt nón tròn xoay bởi mặt phẳng không qua đỉnh được đường tròn, elip, parabol hoặc hypebol tuỳ theo độ nghiêng của mặt phẳng.',
  ],
};
