/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định nghĩa và phương trình chính tắc của elip, hypebol và parabol: tiêu điểm, tiêu cự, đường chuẩn, cùng một số ứng dụng thực tiễn của ba đường conic.',
  intro:
    'Cắm hai chiếc đinh trên tấm bảng, buộc vào đó hai đầu một sợi dây dài hơn khoảng cách giữa hai đinh, rồi căng dây bằng đầu bút chì và vẽ một vòng: nét bút tạo thành một elip. Elip, hypebol và parabol được gọi chung là ba đường conic, vì chúng là giao của một mặt nón với một mặt phẳng.',
  objectives: [
    'Nhận biết elip, hypebol, parabol qua định nghĩa bằng tiêu điểm (và đường chuẩn).',
    'Viết và đọc phương trình chính tắc của ba đường conic; tìm tiêu điểm, tiêu cự, đường chuẩn.',
    'Nhận ra ba đường conic trong một số hiện tượng và công trình thực tế.',
  ],
  sections: [
    {
      heading: 'Elip',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Elip',
          text: 'Cho hai điểm cố định $F_1$, $F_2$ với $F_1F_2 = 2c$ ($c > 0$) và một số thực $a > c$. Tập hợp các điểm $M$ trong mặt phẳng sao cho $MF_1 + MF_2 = 2a$ được gọi là đường elip. Hai điểm $F_1$, $F_2$ là hai tiêu điểm, $F_1F_2 = 2c$ là tiêu cự của elip.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình chính tắc của elip',
          text: 'Chọn hệ trục sao cho $F_1(-c; 0)$, $F_2(c; 0)$. Khi đó elip có phương trình $$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1,\\quad a > b > 0,\\quad b = \\sqrt{a^2 - c^2}.$$',
        },
        {
          type: 'p',
          text: 'Ngược lại, mỗi phương trình dạng trên với $a > b > 0$ là phương trình chính tắc của một elip có hai tiêu điểm $F_1(-c; 0)$, $F_2(c; 0)$, trong đó $c = \\sqrt{a^2 - b^2}$. Elip cắt trục $Ox$ tại $(\\pm a; 0)$ và trục $Oy$ tại $(0; \\pm b)$.',
        },
      ],
    },
    {
      heading: 'Hypebol',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hypebol',
          text: 'Cho hai điểm cố định $F_1$, $F_2$ với $F_1F_2 = 2c$ ($c > 0$) và một số thực dương $a < c$. Tập hợp các điểm $M$ trong mặt phẳng sao cho $|MF_1 - MF_2| = 2a$ được gọi là đường hypebol. $F_1$, $F_2$ là hai tiêu điểm, $2c$ là tiêu cự của hypebol.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình chính tắc của hypebol',
          text: 'Với $F_1(-c; 0)$, $F_2(c; 0)$, hypebol có phương trình $$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1,\\quad a > 0,\\ b > 0,\\quad b = \\sqrt{c^2 - a^2}.$$',
        },
        {
          type: 'p',
          text: 'Hypebol gồm hai nhánh nằm hai bên trục $Oy$ và cắt trục $Ox$ tại $(\\pm a; 0)$. Điều kiện $a < c$ đến từ bất đẳng thức tam giác: $|MF_1 - MF_2| < F_1F_2$. Với hypebol, $c^2 = a^2 + b^2$ (khác với elip, ở đó $a^2 = b^2 + c^2$).',
        },
      ],
    },
    {
      heading: 'Parabol',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Parabol',
          text: 'Cho một điểm $F$ cố định và một đường thẳng $\\Delta$ cố định không đi qua $F$. Tập hợp các điểm $M$ cách đều $F$ và $\\Delta$, tức là $MF = d(M, \\Delta)$, được gọi là đường parabol. $F$ là tiêu điểm, $\\Delta$ là đường chuẩn, $p = d(F, \\Delta)$ là tham số tiêu của parabol.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình chính tắc của parabol',
          text: 'Với $F\\left(\\dfrac{p}{2}; 0\\right)$ và $\\Delta: x = -\\dfrac{p}{2}$, parabol có phương trình $$y^2 = 2px\\quad (p > 0).$$',
        },
        {
          type: 'p',
          text: 'Với điểm $M(x_0; y_0)$ trên parabol $y^2 = 2px$, ta có $MF = d(M, \\Delta) = x_0 + \\dfrac{p}{2}$.',
        },
      ],
    },
    {
      heading: 'Ứng dụng thực tiễn của ba đường conic',
      blocks: [
        {
          type: 'list',
          items: [
            'Các hành tinh chuyển động quanh Mặt Trời theo quỹ đạo là những đường elip nhận tâm Mặt Trời làm một tiêu điểm.',
            'Tia sáng xuất phát từ một tiêu điểm của gương elip, phản xạ trên gương, sẽ đi qua tiêu điểm còn lại; nguyên lí này được dùng trong máy tán sỏi thận.',
            'Mặt cắt của tháp làm nguội ở nhà máy điện có dạng hypebol; hypebol cũng được dùng để định vị trong hệ thống dẫn đường.',
            'Gương của đèn pha, chảo ăng-ten parabol có mặt cắt là parabol: nguồn sáng đặt ở tiêu điểm cho chùm tia phản xạ song song, và tín hiệu song song đến chảo được hội tụ tại tiêu điểm.',
            'Quỹ đạo của một vật được ném xiên (bỏ qua sức cản không khí) là một phần của parabol; nhiều cổng và cầu có dạng vòm parabol hoặc nửa elip.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ conic bằng sợi dây',
    instruction:
      'Chọn elip, hypebol hoặc parabol và chỉnh $a$, $c$ (hoặc $p$). Kéo điểm $M$ trượt trên đường (hoặc chọn rồi dùng phím mũi tên): sợi dây màu cam nối $M$ với các tiêu điểm, và đẳng thức định nghĩa luôn đúng với mọi vị trí của $M$.',
  },
  examples: [
    {
      problem:
        'Cho elip $(E): \\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$. Tìm toạ độ các tiêu điểm và tiêu cự của $(E)$. Với $M \\in (E)$, tính $MF_1 + MF_2$.',
      steps: [
        '$a^2 = 25$, $b^2 = 16$, nên $a = 5$, $c = \\sqrt{a^2 - b^2} = \\sqrt{9} = 3$.',
        'Hai tiêu điểm $F_1(-3; 0)$, $F_2(3; 0)$; tiêu cự $2c = 6$.',
        'Theo định nghĩa, $MF_1 + MF_2 = 2a = 10$.',
      ],
      answer: '$F_1(-3; 0)$, $F_2(3; 0)$, tiêu cự $6$, $MF_1 + MF_2 = 10$.',
    },
    {
      problem:
        'Lập phương trình chính tắc của hypebol $(H)$ có một tiêu điểm là $F_2(5; 0)$ và đi qua điểm $A(3; 0)$.',
      steps: [
        'Phương trình có dạng $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$, với $c = 5$.',
        'Thay $A(3; 0)$: $\\dfrac{9}{a^2} = 1$, nên $a^2 = 9$.',
        '$b^2 = c^2 - a^2 = 25 - 9 = 16$.',
      ],
      answer: '$\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$.',
    },
    {
      problem:
        'Cho parabol $(P): y^2 = 8x$. Tìm tiêu điểm, đường chuẩn của $(P)$ và kiểm tra rằng điểm $M(2; 4) \\in (P)$ cách đều tiêu điểm và đường chuẩn.',
      steps: [
        '$2p = 8$ nên $p = 4$, tiêu điểm $F(2; 0)$, đường chuẩn $\\Delta: x = -2$.',
        '$4^2 = 16 = 8 \\cdot 2$, nên $M \\in (P)$.',
        '$MF = \\sqrt{(2 - 2)^2 + 4^2} = 4$ và $d(M, \\Delta) = 2 + 2 = 4$.',
      ],
      answer: '$F(2; 0)$, $\\Delta: x = -2$, $MF = d(M, \\Delta) = 4$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phương trình nào là phương trình chính tắc của một elip?',
      options: [
        '$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$',
        '$\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1$',
        '$\\dfrac{x^2}{9} - \\dfrac{y^2}{4} = 1$',
        '$y^2 = 4x$',
      ],
      answer: 0,
      hints: ['Dạng chính tắc là $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ với $a > b > 0$.'],
      solution:
        '$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$ có $a = 3 > b = 2$. Phương trình $\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1$ có $a < b$ nên không ở dạng chính tắc; dấu trừ cho hypebol; $y^2 = 4x$ là parabol.',
    },
    {
      type: 'number',
      prompt: 'Tính tiêu cự của elip $\\dfrac{x^2}{100} + \\dfrac{y^2}{64} = 1$.',
      answer: 12,
      hints: ['Với elip, $c^2 = a^2 - b^2$.', 'Tiêu cự bằng $2c$.'],
      solution: '$c = \\sqrt{100 - 64} = 6$, tiêu cự $2c = 12$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm trên elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ có $MF_1 = 3$. Tính $MF_2$.',
      answer: 7,
      hints: ['$MF_1 + MF_2 = 2a$.'],
      solution: '$a = 5$ nên $MF_1 + MF_2 = 10$, suy ra $MF_2 = 10 - 3 = 7$.',
    },
    {
      type: 'choice',
      prompt: 'Hai tiêu điểm của hypebol $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$ là',
      options: [
        '$(-5; 0)$ và $(5; 0)$',
        '$(-\\sqrt{7}; 0)$ và $(\\sqrt{7}; 0)$',
        '$(-4; 0)$ và $(4; 0)$',
        '$(0; -5)$ và $(0; 5)$',
      ],
      answer: 0,
      hints: ['Với hypebol, $c^2 = a^2 + b^2$.'],
      solution:
        '$c = \\sqrt{16 + 9} = 5$, hai tiêu điểm $F_1(-5; 0)$, $F_2(5; 0)$. Nhầm $c^2 = a^2 - b^2$ như elip sẽ ra $\\sqrt{7}$.',
    },
    {
      type: 'multi',
      prompt:
        'Điểm $M$ nằm trên hypebol $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$ có $MF_1 = 10$. Chọn tất cả các giá trị có thể của $MF_2$.',
      options: ['$4$', '$16$', '$6$', '$10$'],
      answers: [0, 1],
      hints: ['$|MF_1 - MF_2| = 2a$ với $a = 3$.', 'Phương trình $|10 - MF_2| = 6$ có hai nghiệm.'],
      solution:
        '$|10 - MF_2| = 6$, nên $MF_2 = 4$ hoặc $MF_2 = 16$. Cả hai đều có thể xảy ra ($M$ ở nhánh gần $F_2$ hoặc nhánh gần $F_1$).',
    },
    {
      type: 'choice',
      prompt: 'Tiêu điểm của parabol $y^2 = 6x$ là',
      options: [
        '$F\\left(\\dfrac{3}{2}; 0\\right)$',
        '$F(3; 0)$',
        '$F(6; 0)$',
        '$F\\left(-\\dfrac{3}{2}; 0\\right)$',
      ],
      answer: 0,
      hints: ['$y^2 = 2px$ có tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right)$.'],
      solution: '$2p = 6$ nên $p = 3$ và $F\\left(\\dfrac{3}{2}; 0\\right)$.',
    },
    {
      type: 'number',
      prompt: 'Parabol có phương trình chính tắc $y^2 = kx$ và đường chuẩn $x = -3$. Tìm $k$.',
      answer: 12,
      hints: ['Đường chuẩn là $x = -\\dfrac{p}{2}$.'],
      solution:
        '$\\dfrac{p}{2} = 3$ nên $p = 6$, phương trình $y^2 = 2 \\cdot 6x = 12x$. Vậy $k = 12$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ thuộc parabol $y^2 = 4x$ có hoành độ bằng $3$. Tính khoảng cách từ $M$ đến tiêu điểm $F$.',
      answer: 4,
      hints: ['$MF = d(M, \\Delta) = x_0 + \\dfrac{p}{2}$.'],
      solution: '$2p = 4$ nên $p = 2$. $MF = 3 + \\dfrac{2}{2} = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Một cổng có dạng nửa elip, chân cổng rộng $8$ m, chiều cao lớn nhất $3$ m. Chọn hệ trục có gốc ở giữa chân cổng, khi đó vòm cổng là nửa trên của elip $\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1$. Tính chiều cao của cổng tại điểm cách tâm $2$ m (làm tròn đến hàng phần trăm, theo mét).',
      answer: 2.6,
      tolerance: 0.005,
      unit: 'm',
      hints: ['Thay $x = 2$ vào phương trình elip, tìm $y > 0$.'],
      solution:
        '$\\dfrac{4}{16} + \\dfrac{y^2}{9} = 1 \\Rightarrow y^2 = 9 \\cdot \\dfrac{3}{4} = \\dfrac{27}{4} \\Rightarrow y = \\dfrac{3\\sqrt{3}}{2} \\approx 2{,}60$ (m).',
    },
    {
      type: 'choice',
      prompt:
        'Gương của một chiếc đèn pha có mặt cắt là một parabol. Để chùm sáng phản xạ đi thành các tia song song, cần đặt bóng đèn ở đâu?',
      options: [
        'Tại tiêu điểm của parabol',
        'Tại đỉnh của parabol',
        'Trên đường chuẩn',
        'Tại bất kì điểm nào trên trục',
      ],
      answer: 0,
      hints: ['Nhớ lại tính chất phản xạ của gương parabol.'],
      solution:
        'Tia sáng đi ra từ tiêu điểm, phản xạ trên gương parabol, sẽ song song với trục của parabol. Vì vậy bóng đèn được đặt tại tiêu điểm.',
    },
  ],
  takeaways: [
    'Elip: $MF_1 + MF_2 = 2a$; $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$, $a > b > 0$, $c^2 = a^2 - b^2$.',
    'Hypebol: $|MF_1 - MF_2| = 2a$; $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$, $c^2 = a^2 + b^2$.',
    'Parabol: $MF = d(M, \\Delta)$; $y^2 = 2px$, tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right)$, đường chuẩn $x = -\\dfrac{p}{2}$.',
    'Tiêu cự của elip và hypebol là $F_1F_2 = 2c$.',
  ],
};
