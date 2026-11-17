/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Elip x²/a² + y²/b² = 1: tính đối xứng, đỉnh, trục lớn, trục nhỏ, hình chữ nhật cơ sở, tâm sai e = c/a, bán kính qua tiêu MF₁ = a + ex, MF₂ = a − ex và hai đường chuẩn x = ±a/e.',
  intro:
    'Quỹ đạo của Trái Đất quanh Mặt Trời là một elip nhận Mặt Trời làm một tiêu điểm, gần như tròn. Quỹ đạo sao chổi Halley cũng là elip nhưng rất dẹt. Con số nào đo được độ "dẹt" ấy, và khoảng cách từ Trái Đất đến Mặt Trời thay đổi ra sao? Bài này đi sâu vào hình dạng của elip qua phương trình chính tắc của nó.',
  objectives: [
    'Nêu được tính đối xứng, các đỉnh, trục lớn, trục nhỏ và hình chữ nhật cơ sở của elip có phương trình chính tắc.',
    'Tính được tâm sai $e = \\dfrac{c}{a}$ và hiểu ý nghĩa của nó đối với hình dạng elip.',
    'Tính được bán kính qua tiêu $MF_1 = a + ex$, $MF_2 = a - ex$ của một điểm trên elip.',
    'Viết được phương trình hai đường chuẩn và dùng tính chất $\\dfrac{MF}{d(M, \\Delta)} = e$.',
  ],
  sections: [
    {
      heading: 'Hình dạng của elip',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: elip là tập hợp các điểm $M$ trong mặt phẳng sao cho $MF_1 + MF_2 = 2a$, trong đó $F_1$, $F_2$ là hai tiêu điểm cố định, $F_1F_2 = 2c$ và $a > c > 0$. Chọn hệ trục với $F_1(-c; 0)$, $F_2(c; 0)$, elip có phương trình chính tắc',
        },
        {
          type: 'tex',
          tex: '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1, \\qquad a > b > 0,\\ b^2 = a^2 - c^2.',
        },
        {
          type: 'list',
          items: [
            'Elip nhận hai trục toạ độ làm hai trục đối xứng và nhận gốc $O$ làm tâm đối xứng (gọi là tâm của elip): nếu $M(x_0; y_0)$ thuộc elip thì các điểm $(x_0; -y_0)$, $(-x_0; y_0)$, $(-x_0; -y_0)$ cũng thuộc elip.',
            'Elip cắt $Ox$ tại $A_1(-a; 0)$, $A_2(a; 0)$ và cắt $Oy$ tại $B_1(0; -b)$, $B_2(0; b)$. Bốn điểm này là bốn đỉnh của elip.',
            'Đoạn $A_1A_2$ là trục lớn, dài $2a$; đoạn $B_1B_2$ là trục nhỏ, dài $2b$. Ta gọi $a$ là bán trục lớn, $b$ là bán trục nhỏ.',
            'Mọi điểm $M(x; y)$ của elip thoả mãn $|x| \\le a$, $|y| \\le b$ và $b \\le OM \\le a$: elip nằm trong hình chữ nhật cơ sở có các cạnh nằm trên các đường thẳng $x = \\pm a$, $y = \\pm b$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Elip là đường tròn bị "ép" lại',
          text: 'Cho đường tròn $x^2 + y^2 = a^2$ và số $k$ với $0 < k < 1$. Với mỗi điểm $M(x_0; y_0)$ trên đường tròn, gọi $H$ là hình chiếu của $M$ trên $Ox$ và lấy $N$ trên đoạn $HM$ sao cho $HN = k \\cdot HM$. Khi đó $N(x_0; ky_0)$ chạy trên elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{(ka)^2} = 1$.',
        },
      ],
    },
    {
      heading: 'Tâm sai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tâm sai của elip',
          text: 'Tỉ số giữa tiêu cự và độ dài trục lớn, $e = \\dfrac{c}{a}$, gọi là tâm sai của elip. Vì $0 < c < a$ nên $0 < e < 1$.',
        },
        {
          type: 'p',
          text: 'Từ $b^2 = a^2 - c^2$ ta có $\\dfrac{b}{a} = \\sqrt{1 - e^2}$. Tâm sai càng gần $0$ thì $b$ càng gần $a$ và elip càng gần đường tròn; tâm sai càng gần $1$ thì $b$ càng nhỏ so với $a$ và elip càng dẹt. Hai elip có cùng tâm sai thì có cùng hình dạng: elip này là hình phóng to hay thu nhỏ của elip kia.',
        },
        {
          type: 'table',
          head: ['Quỹ đạo', 'Tâm sai (xấp xỉ)'],
          rows: [
            ['Trái Đất', '$0{,}017$'],
            ['Sao Hoả', '$0{,}093$'],
            ['Sao Diêm Vương', '$0{,}244$'],
            ['Sao chổi Halley', '$0{,}967$'],
          ],
          caption: 'Quỹ đạo các hành tinh gần như tròn; quỹ đạo sao chổi Halley rất dẹt.',
        },
      ],
    },
    {
      heading: 'Bán kính qua tiêu',
      blocks: [
        {
          type: 'p',
          text: 'Với điểm $M(x; y)$ trên elip, các đoạn $MF_1$, $MF_2$ gọi là các bán kính qua tiêu của $M$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức bán kính qua tiêu',
          text: 'Với $M(x; y)$ thuộc elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ có hai tiêu điểm $F_1(-c; 0)$, $F_2(c; 0)$: $$\\begin{aligned} MF_1 &= a + ex = a + \\dfrac{c}{a}x, \\\\ MF_2 &= a - ex = a - \\dfrac{c}{a}x. \\end{aligned}$$',
        },
        {
          type: 'p',
          text: 'Chứng minh: $MF_1^2 - MF_2^2 = (x + c)^2 - (x - c)^2 = 4cx$. Chia cho $MF_1 + MF_2 = 2a$ được $MF_1 - MF_2 = \\dfrac{2cx}{a}$. Cộng và trừ với $MF_1 + MF_2 = 2a$ ta có hai công thức trên.',
        },
        {
          type: 'p',
          text: 'Vì $-a \\le x \\le a$ nên $a - c \\le MF_1 \\le a + c$: điểm gần $F_1$ nhất là đỉnh $A_1$, xa nhất là đỉnh $A_2$. Với quỹ đạo hành tinh, $a - c$ và $a + c$ là khoảng cách gần nhất và xa nhất đến Mặt Trời.',
        },
      ],
    },
    {
      heading: 'Đường chuẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường chuẩn của elip',
          text: 'Hai đường thẳng $\\Delta_1: x = -\\dfrac{a}{e}$ và $\\Delta_2: x = \\dfrac{a}{e}$ gọi là hai đường chuẩn của elip, lần lượt ứng với hai tiêu điểm $F_1$ và $F_2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Với mọi điểm $M$ thuộc elip: $$\\dfrac{MF_1}{d(M, \\Delta_1)} = \\dfrac{MF_2}{d(M, \\Delta_2)} = e.$$',
        },
        {
          type: 'p',
          text: 'Thật vậy, $d(M, \\Delta_2) = \\dfrac{a}{e} - x = \\dfrac{a - ex}{e} = \\dfrac{MF_2}{e}$ (vì $x \\le a < \\dfrac{a}{e}$). Tương tự cho $\\Delta_1$. Hai đường chuẩn nằm ngoài hình chữ nhật cơ sở, vì $\\dfrac{a}{e} > a$.',
        },
      ],
    },
    {
      heading: 'Dự án: Vẽ elip bằng sợi dây và đo tâm sai',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: vẽ một số elip bằng phương pháp "người làm vườn", đo các trục, tính tâm sai và kiểm chứng các hệ thức của bài.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: một tấm bìa cứng hoặc tấm xốp, hai chiếc đinh ghim, một sợi dây không giãn dài khoảng $30$ cm, bút chì, thước kẻ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Buộc hai đầu dây thành vòng hoặc ghim hai đầu dây vào hai điểm $F_1$, $F_2$ cách nhau $10$ cm. Căng dây bằng đầu bút chì rồi di chuyển bút một vòng để vẽ elip.',
            'Đo độ dài trục lớn $2a$, trục nhỏ $2b$ và tiêu cự $2c$. Kiểm tra hệ thức $b^2 = a^2 - c^2$ và tính tâm sai $e = \\dfrac{c}{a}$.',
            'Giữ nguyên sợi dây, lần lượt đặt hai đinh cách nhau $5$ cm, $15$ cm, $20$ cm và vẽ lại. Xếp các elip theo độ dẹt và so với tâm sai đã tính.',
            'Chọn một điểm $M$ trên một elip, đo $MF_1$, $MF_2$ và hoành độ $x$ của $M$ (gốc ở trung điểm $F_1F_2$), rồi so với công thức $MF_1 = a + ex$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: các hình vẽ, bảng số đo $a$, $b$, $c$, $e$ của từng elip, nhận xét về mối liên hệ giữa tâm sai và độ dẹt, và sai số khi kiểm chứng công thức bán kính qua tiêu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo tiêu điểm, đo tâm sai',
    instruction:
      'Kéo tiêu điểm $F_2$ dọc trục $Ox$ (hoặc chọn nó rồi dùng phím mũi tên) để đổi $c$, chọn bán trục lớn $a$, rồi kéo điểm $M$ trên elip. Quan sát: tâm sai $e$ thay đổi và elip dẹt dần, còn tổng $MF_1 + MF_2$ luôn bằng $2a$; tỉ số $\\dfrac{MF_2}{d(M, \\Delta_2)}$ luôn bằng $e$.',
  },
  examples: [
    {
      problem:
        'Cho elip $(E): \\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$. Tìm các đỉnh, độ dài các trục, tâm sai và phương trình các đường chuẩn của $(E)$.',
      steps: [
        'Ta có $a^2 = 25$, $b^2 = 9$ nên $a = 5$, $b = 3$, $c = \\sqrt{a^2 - b^2} = 4$.',
        'Các đỉnh: $A_1(-5; 0)$, $A_2(5; 0)$, $B_1(0; -3)$, $B_2(0; 3)$. Trục lớn dài $2a = 10$, trục nhỏ dài $2b = 6$.',
        'Tâm sai $e = \\dfrac{c}{a} = \\dfrac{4}{5}$.',
        'Đường chuẩn: $x = \\pm\\dfrac{a}{e} = \\pm\\dfrac{5}{4/5} = \\pm\\dfrac{25}{4}$.',
      ],
      answer:
        'Trục lớn $10$, trục nhỏ $6$, $e = \\dfrac{4}{5}$, hai đường chuẩn $x = -\\dfrac{25}{4}$ và $x = \\dfrac{25}{4}$.',
    },
    {
      problem:
        'Viết phương trình chính tắc của elip có độ dài trục lớn bằng $10$ và tâm sai bằng $\\dfrac{3}{5}$.',
      steps: [
        '$2a = 10$ nên $a = 5$.',
        '$e = \\dfrac{c}{a} = \\dfrac{3}{5}$ nên $c = 3$.',
        '$b^2 = a^2 - c^2 = 25 - 9 = 16$.',
      ],
      answer: '$\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$.',
    },
    {
      problem:
        'Cho elip $\\dfrac{x^2}{9} + \\dfrac{y^2}{5} = 1$ với hai tiêu điểm $F_1$, $F_2$. Tìm điểm $M$ trên elip sao cho $MF_1 = 2MF_2$.',
      steps: [
        '$a = 3$, $b^2 = 5$, $c = \\sqrt{9 - 5} = 2$, $e = \\dfrac{2}{3}$.',
        'Với $M(x; y)$: $MF_1 = 3 + \\dfrac{2}{3}x$, $MF_2 = 3 - \\dfrac{2}{3}x$.',
        '$MF_1 = 2MF_2 \\Leftrightarrow 3 + \\dfrac{2}{3}x = 6 - \\dfrac{4}{3}x \\Leftrightarrow 2x = 3 \\Leftrightarrow x = \\dfrac{3}{2}$.',
        'Thay vào phương trình elip: $y^2 = 5\\left(1 - \\dfrac{1}{4}\\right) = \\dfrac{15}{4}$, nên $y = \\pm\\dfrac{\\sqrt{15}}{2}$.',
      ],
      answer:
        'Có hai điểm $M\\left(\\dfrac{3}{2}; \\dfrac{\\sqrt{15}}{2}\\right)$ và $M\\left(\\dfrac{3}{2}; -\\dfrac{\\sqrt{15}}{2}\\right)$.',
    },
    {
      problem:
        'Bán trục lớn của quỹ đạo Trái Đất khoảng $149{,}6$ triệu km, tâm sai khoảng $0{,}017$. Tính khoảng cách gần nhất và xa nhất từ Trái Đất đến Mặt Trời (Mặt Trời ở một tiêu điểm).',
      steps: [
        'Khoảng cách từ Trái Đất đến Mặt Trời là một bán kính qua tiêu, nằm giữa $a - c$ và $a + c$, với $c = ea$.',
        '$c = 0{,}017 \\cdot 149{,}6 \\approx 2{,}54$ (triệu km).',
        'Gần nhất: $a - c \\approx 147{,}1$ triệu km; xa nhất: $a + c \\approx 152{,}1$ triệu km.',
      ],
      answer: 'Khoảng $147{,}1$ triệu km và $152{,}1$ triệu km.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tìm tâm sai của elip $\\dfrac{x^2}{36} + \\dfrac{y^2}{27} = 1$.',
      answer: [1, 2],
      hints: ['Tính $c = \\sqrt{a^2 - b^2}$.', '$e = \\dfrac{c}{a}$.'],
      solution: '$a = 6$, $c = \\sqrt{36 - 27} = 3$, nên $e = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ thuộc elip $\\dfrac{x^2}{36} + \\dfrac{y^2}{27} = 1$ có hoành độ bằng $4$. Tính bán kính qua tiêu $MF_1$ (với $F_1$ là tiêu điểm có hoành độ âm).',
      answer: 8,
      hints: ['$MF_1 = a + ex$.', 'Ở bài trước ta có $a = 6$, $e = \\dfrac{1}{2}$.'],
      solution:
        '$MF_1 = a + ex = 6 + \\dfrac{1}{2} \\cdot 4 = 8$ (và $MF_2 = 6 - 2 = 4$, tổng bằng $2a = 12$).',
    },
    {
      type: 'number',
      prompt:
        'Đường chuẩn $\\Delta_2$ của elip $\\dfrac{x^2}{36} + \\dfrac{y^2}{27} = 1$ có phương trình $x = m$. Tìm $m$.',
      answer: 12,
      hints: ['Đường chuẩn ứng với $F_2$ là $x = \\dfrac{a}{e}$.'],
      solution: '$m = \\dfrac{a}{e} = \\dfrac{6}{1/2} = 12$.',
    },
    {
      type: 'choice',
      prompt: 'Khi tâm sai của elip càng gần $0$ thì elip',
      options: [
        'càng gần với đường tròn',
        'càng dẹt',
        'có tiêu cự càng gần độ dài trục lớn',
        'có trục nhỏ càng ngắn so với trục lớn',
      ],
      answer: 0,
      hints: ['Dùng hệ thức $\\dfrac{b}{a} = \\sqrt{1 - e^2}$.'],
      solution:
        '$e$ càng gần $0$ thì $\\dfrac{b}{a} = \\sqrt{1 - e^2}$ càng gần $1$, trục nhỏ gần bằng trục lớn: elip càng gần với đường tròn.',
    },
    {
      type: 'number',
      prompt:
        'Elip có độ dài trục nhỏ bằng $8$ và tâm sai bằng $\\dfrac{3}{5}$ có phương trình chính tắc $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{16} = 1$. Tìm $a^2$.',
      answer: 25,
      hints: ['$c = ea = \\dfrac{3}{5}a$.', 'Thay vào $a^2 - c^2 = b^2 = 16$.'],
      solution:
        '$a^2 - \\dfrac{9}{25}a^2 = 16 \\Rightarrow \\dfrac{16}{25}a^2 = 16 \\Rightarrow a^2 = 25$. Phương trình: $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho elip $\\dfrac{x^2}{9} + \\dfrac{y^2}{5} = 1$. Đường thẳng qua tiêu điểm $F_2$ và vuông góc với $Ox$ cắt elip tại $A$, $B$. Tính độ dài $AB$.',
      answer: [10, 3],
      hints: [
        '$c = 2$, nên đường thẳng là $x = 2$.',
        'Thay $x = 2$ vào phương trình elip để tìm $y$.',
      ],
      solution:
        'Với $x = 2$: $y^2 = 5\\left(1 - \\dfrac{4}{9}\\right) = \\dfrac{25}{9}$, $y = \\pm\\dfrac{5}{3}$. Vậy $AB = \\dfrac{10}{3}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng về elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$.',
      options: [
        'Tiêu cự bằng $6$.',
        'Tâm sai bằng $\\dfrac{3}{5}$.',
        'Hai đường chuẩn là $x = \\pm\\dfrac{25}{3}$.',
        'Độ dài trục nhỏ bằng $4$.',
        'Với mọi điểm $M$ trên elip, $MF_1 + MF_2 = 5$.',
      ],
      answers: [0, 1, 2],
      hints: ['$a = 5$, $b = 4$; tính $c$ rồi $e$ và $\\dfrac{a}{e}$.'],
      solution:
        '$c = 3$: tiêu cự $2c = 6$, $e = \\dfrac{3}{5}$, đường chuẩn $x = \\pm\\dfrac{5}{3/5} = \\pm\\dfrac{25}{3}$. Trục nhỏ dài $2b = 8$ và $MF_1 + MF_2 = 2a = 10$, nên hai khẳng định còn lại sai.',
    },
    {
      type: 'number',
      prompt:
        'Một "phòng thì thầm" có mặt cắt trần là nửa elip với hai tiêu điểm ở độ cao $1{,}6$ m so với sàn, cách nhau $16$ m; đỉnh vòm cao $7{,}6$ m. Tính chiều dài trục lớn của elip (theo mét).',
      answer: 20,
      unit: 'm',
      hints: [
        'Đặt gốc toạ độ ở trung điểm hai tiêu điểm: $c = 8$, bán trục nhỏ $b = 7{,}6 - 1{,}6$.',
        '$a^2 = b^2 + c^2$.',
      ],
      solution: '$b = 6$, $c = 8$ nên $a = \\sqrt{36 + 64} = 10$. Trục lớn dài $2a = 20$ m.',
    },
    {
      type: 'number',
      prompt:
        'Bán trục lớn của quỹ đạo Trái Đất khoảng $149{,}6$ triệu km, tâm sai khoảng $0{,}0167$. Khoảng cách gần nhất từ Trái Đất đến Mặt Trời khoảng bao nhiêu triệu km? (Làm tròn đến hàng phần mười.)',
      answer: 147.1,
      tolerance: 0.05,
      hints: ['Khoảng cách gần nhất là $a - c = a(1 - e)$.'],
      solution: '$a(1 - e) = 149{,}6 \\cdot 0{,}9833 \\approx 147{,}1$ (triệu km).',
    },
    {
      type: 'number',
      prompt:
        'Co đường tròn $x^2 + y^2 = 25$ về trục $Ox$ theo hệ số $k = \\dfrac{3}{5}$ (mỗi điểm $M(x_0; y_0)$ biến thành $N(x_0; ky_0)$) thì được một elip. Tính độ dài trục nhỏ của elip đó.',
      answer: 6,
      hints: ['Elip nhận được là $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{(ka)^2} = 1$ với $a = 5$.'],
      solution: 'Bán trục nhỏ $b = ka = \\dfrac{3}{5} \\cdot 5 = 3$, nên trục nhỏ dài $2b = 6$.',
    },
  ],
  takeaways: [
    'Elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ đối xứng qua $Ox$, $Oy$ và $O$; đỉnh $(\\pm a; 0)$, $(0; \\pm b)$; trục lớn $2a$, trục nhỏ $2b$; nằm trong hình chữ nhật cơ sở.',
    'Tâm sai $e = \\dfrac{c}{a}$, $0 < e < 1$: $e$ càng lớn elip càng dẹt.',
    'Bán kính qua tiêu: $MF_1 = a + ex$, $MF_2 = a - ex$, nên $a - c \\le MF \\le a + c$.',
    'Đường chuẩn $x = \\pm\\dfrac{a}{e}$; với mọi $M$ trên elip, $\\dfrac{MF}{d(M, \\Delta)} = e$ (tiêu điểm và đường chuẩn tương ứng).',
  ],
};
