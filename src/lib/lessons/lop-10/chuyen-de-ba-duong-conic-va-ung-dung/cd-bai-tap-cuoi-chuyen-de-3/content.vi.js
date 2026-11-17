/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề ba đường conic: tâm sai, đường chuẩn, bán kính qua tiêu, lập phương trình conic từ tiêu điểm và đường chuẩn, và các bài toán ứng dụng về quỹ đạo elip, ăng-ten parabol, định vị bằng hypebol.',
  intro:
    'Chuyên đề đã cho ta một cách nhìn chung về elip, hypebol và parabol: tiêu điểm, đường chuẩn và tâm sai. Bài này ôn lại các công thức then chốt và dùng chúng để giải các bài toán thực tế: tính khoảng cách của sao chổi đến Mặt Trời, đặt đầu thu cho ăng-ten chảo, viết quỹ đạo của tàu vũ trụ.',
  objectives: [
    'Hệ thống lại các yếu tố của ba đường conic: đỉnh, trục, tâm sai, đường chuẩn, bán kính qua tiêu.',
    'Lập phương trình đường conic từ tiêu điểm, đường chuẩn và tâm sai, kể cả khi đường chuẩn không song song với trục toạ độ.',
    'Vận dụng tính chất của các đường conic để giải bài toán thực tiễn.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Yếu tố', 'Elip', 'Hypebol', 'Parabol'],
          rows: [
            [
              'Phương trình chính tắc',
              '$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$',
              '$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$',
              '$y^2 = 2px$',
            ],
            [
              'Liên hệ',
              '$c^2 = a^2 - b^2$',
              '$c^2 = a^2 + b^2$',
              '$F\\left(\\dfrac{p}{2}; 0\\right)$',
            ],
            ['Tâm sai', '$e = \\dfrac{c}{a} < 1$', '$e = \\dfrac{c}{a} > 1$', '$e = 1$'],
            [
              'Bán kính qua tiêu',
              '$a + ex$; $a - ex$',
              '$|a + ex|$; $|a - ex|$',
              '$x + \\dfrac{p}{2}$',
            ],
            [
              'Đường chuẩn',
              '$x = \\pm\\dfrac{a}{e}$',
              '$x = \\pm\\dfrac{a}{e}$',
              '$x = -\\dfrac{p}{2}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất chung',
          text: 'Với mọi điểm $M$ của một đường conic có tiêu điểm $F$, đường chuẩn tương ứng $\\Delta$ và tâm sai $e$: $\\dfrac{MF}{d(M, \\Delta)} = e$. Ngược lại, tập hợp các điểm như vậy là elip khi $e < 1$, parabol khi $e = 1$, hypebol khi $e > 1$.',
        },
      ],
    },
    {
      heading: 'Các dạng bài tập thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định các yếu tố từ phương trình chính tắc: đọc $a$, $b$ (hoặc $p$), tính $c$, rồi tính tâm sai, đường chuẩn, tiêu điểm.',
            'Lập phương trình chính tắc từ các yếu tố đã cho: lập hệ phương trình với ẩn $a$, $b$, $c$ (hoặc $p$).',
            'Tìm điểm trên đường conic thoả mãn điều kiện về bán kính qua tiêu: thay công thức bán kính qua tiêu để tìm hoành độ, rồi thay vào phương trình để tìm tung độ.',
            'Lập phương trình conic từ tiêu điểm $F$, đường chuẩn $\\Delta$ và tâm sai $e$: viết $MF^2 = e^2 \\cdot d(M, \\Delta)^2$ và rút gọn.',
            'Bài toán thực tiễn: chọn hệ trục hợp lí (gốc ở tâm elip, hypebol hoặc đỉnh parabol), đưa dữ kiện về toạ độ rồi dùng các công thức trên.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đồ thị hàm bậc hai là một parabol',
          text: 'Đồ thị hàm số $y = ax^2 + bx + c$ ($a \\ne 0$) là parabol có tiêu điểm $F\\left(-\\dfrac{b}{2a}; \\dfrac{1 - \\Delta}{4a}\\right)$ và đường chuẩn $y = -\\dfrac{1 + \\Delta}{4a}$, với $\\Delta = b^2 - 4ac$. Thật vậy, $y = ax^2 + bx + c \\Leftrightarrow \\left(x + \\dfrac{b}{2a}\\right)^2 = \\dfrac{1}{a}\\left(y + \\dfrac{\\Delta}{4a}\\right)$, và có thể kiểm tra trực tiếp rằng mọi điểm của đồ thị cách đều $F$ và đường thẳng đó.',
        },
      ],
    },
    {
      heading: 'Dự án: Chế tạo gương parabol',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế và làm một gương phản xạ parabol nhỏ, xác định tiêu điểm bằng tính toán và kiểm chứng bằng ánh sáng.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bìa các-tông cứng, giấy bạc (giấy nhôm) mặt bóng, kéo, keo, thước, giấy kẻ ô, đèn pin nhỏ hoặc đèn của điện thoại.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn đường kính miệng gương $D = 30$ cm và độ sâu $h$ (chẳng hạn $5$ cm). Viết phương trình mặt cắt $y^2 = 2px$ với $p = \\dfrac{D^2}{8h}$ và tính vị trí tiêu điểm.',
            'Vẽ cung parabol lên giấy kẻ ô theo bảng giá trị, cắt khoảng $8$ "xương" bằng bìa theo đúng cung đó rồi ghép chúng thành khung hình chảo; dán giấy bạc lên mặt trong.',
            'Đặt đèn pin nhỏ đúng tiêu điểm, quay gương về phía tường trong phòng tối: chùm sáng phản xạ phải gần như song song (vệt sáng ít loe ra khi lùi xa tường). Dịch đèn ra khỏi tiêu điểm và quan sát sự khác biệt.',
            'Không dùng gương để hội tụ ánh nắng Mặt Trời vào người, vào mắt hay vật dễ cháy.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bản vẽ thiết kế với phương trình và vị trí tiêu điểm, ảnh sản phẩm, kết quả thử với đèn pin và nhận xét về độ chính xác của gương.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quỹ đạo elip và ăng-ten parabol',
    instruction:
      'Ở chế độ quỹ đạo, chọn một thiên thể và kéo nó trên quỹ đạo (hoặc dùng phím mũi tên) để đọc khoảng cách $r = a + ex$ đến Mặt Trời. Ở chế độ ăng-ten, đổi đường kính $D$ và độ sâu $h$ của chảo để thấy đầu thu (tiêu điểm) dịch chuyển theo công thức $\\dfrac{D^2}{16h}$.',
  },
  examples: [
    {
      problem:
        'Viết phương trình đường conic có tâm sai $e = \\dfrac{1}{\\sqrt{2}}$, tiêu điểm $F(-1; 0)$ và đường chuẩn $\\Delta: x + y + 1 = 0$. Đường conic đó là đường gì?',
      steps: [
        '$MF^2 = (x + 1)^2 + y^2$ và $d(M, \\Delta)^2 = \\dfrac{(x + y + 1)^2}{2}$.',
        '$MF^2 = e^2 \\cdot d(M, \\Delta)^2 = \\dfrac{1}{2} \\cdot \\dfrac{(x + y + 1)^2}{2}$, tức là $4(x + 1)^2 + 4y^2 = (x + y + 1)^2$.',
        'Khai triển: $4x^2 + 8x + 4 + 4y^2 = x^2 + y^2 + 2xy + 2x + 2y + 1$.',
      ],
      answer:
        '$3x^2 - 2xy + 3y^2 + 6x - 2y + 3 = 0$; vì $e = \\dfrac{1}{\\sqrt{2}} < 1$ nên đó là một elip.',
    },
    {
      problem: 'Tìm tiêu điểm và đường chuẩn của parabol $y = x^2 - 2x + 3$.',
      steps: [
        '$a = 1$, $b = -2$, $c = 3$, $\\Delta = b^2 - 4ac = 4 - 12 = -8$.',
        'Tiêu điểm $F\\left(-\\dfrac{b}{2a}; \\dfrac{1 - \\Delta}{4a}\\right) = F\\left(1; \\dfrac{9}{4}\\right)$.',
        'Đường chuẩn $y = -\\dfrac{1 + \\Delta}{4a} = \\dfrac{7}{4}$.',
        'Kiểm tra: đỉnh $(1; 2)$ nằm chính giữa $F$ và đường chuẩn, cách mỗi bên $\\dfrac{1}{4}$.',
      ],
      answer: '$F\\left(1; \\dfrac{9}{4}\\right)$, đường chuẩn $y = \\dfrac{7}{4}$.',
    },
    {
      problem:
        'Cho elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$. Viết phương trình đường thẳng đi qua $M(2; 1)$ và cắt elip tại hai điểm $A$, $B$ sao cho $MA = MB$.',
      steps: [
        '$M$ nằm trong elip vì $\\dfrac{4}{25} + \\dfrac{1}{16} < 1$; $MA = MB$ nghĩa là $M$ là trung điểm $AB$: $x_A + x_B = 4$, $y_A + y_B = 2$.',
        'Trừ hai đẳng thức $\\dfrac{x_A^2}{25} + \\dfrac{y_A^2}{16} = 1$ và $\\dfrac{x_B^2}{25} + \\dfrac{y_B^2}{16} = 1$: $\\dfrac{(x_A + x_B)(x_A - x_B)}{25} + \\dfrac{(y_A + y_B)(y_A - y_B)}{16} = 0$.',
        'Suy ra $\\dfrac{4(x_A - x_B)}{25} + \\dfrac{2(y_A - y_B)}{16} = 0$, nên hệ số góc $k = \\dfrac{y_A - y_B}{x_A - x_B} = -\\dfrac{32}{25}$.',
        'Đường thẳng: $y - 1 = -\\dfrac{32}{25}(x - 2)$.',
      ],
      answer: '$32x + 25y - 89 = 0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đường conic có tâm sai bằng $2$, một tiêu điểm $F(-2; 5)$ và đường chuẩn tương ứng $x + y - 1 = 0$ có phương trình là',
      options: [
        '$x^2 + 4xy + y^2 - 8x + 6y - 27 = 0$',
        '$x^2 - 4xy + y^2 - 8x + 6y - 27 = 0$',
        '$3x^2 + 4xy + 3y^2 - 8x + 6y - 27 = 0$',
        '$x^2 + 4xy + y^2 + 8x - 6y + 27 = 0$',
      ],
      answer: 0,
      hints: [
        'Viết $(x + 2)^2 + (y - 5)^2 = 4 \\cdot \\dfrac{(x + y - 1)^2}{2}$.',
        'Khai triển cả hai vế rồi chuyển hết sang một vế.',
      ],
      solution:
        '$x^2 + y^2 + 4x - 10y + 29 = 2(x^2 + y^2 + 2xy - 2x - 2y + 1)$, tức là $x^2 + 4xy + y^2 - 8x + 6y - 27 = 0$ (một hypebol, vì $e = 2 > 1$).',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi phương trình với đường mà nó biểu diễn.',
      left: [
        '$\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$',
        '$\\dfrac{x^2}{9} - \\dfrac{y^2}{4} = 1$',
        '$y^2 = 9x$',
        '$x^2 + y^2 = 9$',
      ],
      right: ['Elip', 'Hypebol', 'Parabol', 'Đường tròn'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhìn dấu giữa hai số hạng bậc hai và xem có số hạng bậc nhất không.'],
      solution:
        'Tổng hai bình phương với hệ số khác nhau: elip; hiệu: hypebol; $y^2 = 2px$: parabol; $x^2 + y^2 = R^2$: đường tròn.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ thuộc elip $\\dfrac{x^2}{100} + \\dfrac{y^2}{36} = 1$ có $MF_1 = 13$ (với $F_1$ là tiêu điểm có hoành độ âm). Tìm hoành độ của $M$.',
      answer: 3.75,
      hints: ['$a = 10$, $c = 8$, $e = 0{,}8$.', 'Giải $10 + 0{,}8x = 13$.'],
      solution: '$MF_1 = a + ex = 10 + 0{,}8x = 13$, nên $x = \\dfrac{3}{0{,}8} = 3{,}75$.',
    },
    {
      type: 'number',
      prompt:
        'Trên nhánh phải của hypebol $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$, bán kính qua tiêu $MF_2$ nhỏ nhất bằng bao nhiêu?',
      answer: 1,
      hints: [
        'Trên nhánh phải, $MF_2 = ex - a$ với $x \\ge a$.',
        'Biểu thức này nhỏ nhất khi $x$ nhỏ nhất.',
      ],
      solution:
        '$c = 5$, $e = \\dfrac{5}{4}$. $MF_2 = \\dfrac{5}{4}x - 4$ nhỏ nhất khi $x = 4$ (đỉnh $A_2$), bằng $5 - 4 = 1 = c - a$.',
    },
    {
      type: 'number',
      prompt: 'Tìm tung độ tiêu điểm của parabol $y = x^2 - 2x + 3$ (viết dạng số thập phân).',
      answer: 2.25,
      hints: ['Tung độ tiêu điểm là $\\dfrac{1 - \\Delta}{4a}$ với $\\Delta = b^2 - 4ac$.'],
      solution:
        '$\\Delta = 4 - 12 = -8$, nên tung độ tiêu điểm là $\\dfrac{1 + 8}{4} = \\dfrac{9}{4} = 2{,}25$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng đi qua $M(2; 1)$ cắt elip $\\dfrac{x^2}{25} + \\dfrac{y^2}{16} = 1$ tại $A$, $B$ với $M$ là trung điểm $AB$. Tính hệ số góc của đường thẳng đó (dạng số thập phân).',
      answer: -1.28,
      hints: [
        'Trừ vế với vế phương trình elip viết cho $A$ và $B$.',
        'Dùng $x_A + x_B = 4$, $y_A + y_B = 2$.',
      ],
      solution:
        '$\\dfrac{4(x_A - x_B)}{25} + \\dfrac{2(y_A - y_B)}{16} = 0$, nên $k = -\\dfrac{4}{25} \\cdot 8 = -\\dfrac{32}{25} = -1{,}28$.',
    },
    {
      type: 'number',
      prompt:
        'Một tàu vũ trụ bay trên quỹ đạo tròn ở độ cao $148$ km so với mặt đất. Khi đạt vận tốc thoát, tàu bay theo quỹ đạo parabol nhận tâm Trái Đất làm tiêu điểm, có đỉnh là điểm bắt đầu rời quỹ đạo tròn. Bán kính Trái Đất là $6\\,371$ km, đơn vị trên trục là km. Quỹ đạo parabol có phương trình $y^2 = kx$. Tìm $k$.',
      answer: 26076,
      hints: ['Khoảng cách từ đỉnh đến tiêu điểm là $\\dfrac{p}{2} = 6\\,371 + 148$.', '$k = 2p$.'],
      solution:
        '$\\dfrac{p}{2} = 6\\,519$, nên $p = 13\\,038$ và $k = 2p = 26\\,076$: quỹ đạo là $y^2 = 26\\,076x$.',
    },
    {
      type: 'number',
      prompt:
        'Quỹ đạo của sao Diêm Vương là elip nhận Mặt Trời làm tiêu điểm, bán trục lớn khoảng $5\\,906$ triệu km, tâm sai $0{,}244$. Khoảng cách gần nhất từ sao Diêm Vương đến Mặt Trời khoảng bao nhiêu triệu km (làm tròn đến hàng đơn vị)?',
      answer: 4465,
      tolerance: 1,
      hints: ['Khoảng cách gần nhất là $a - c = a(1 - e)$.'],
      solution: '$a(1 - e) = 5\\,906 \\cdot 0{,}756 \\approx 4\\,465$ (triệu km).',
    },
    {
      type: 'number',
      prompt:
        'Một chảo ăng-ten parabol có đường kính $80$ cm, đầu thu đặt ở tiêu điểm cách đỉnh chảo $20$ cm. Tính độ sâu của chảo (theo cm).',
      answer: 20,
      unit: 'cm',
      hints: ['$\\dfrac{p}{2} = 20$ nên $y^2 = 80x$.', 'Mép chảo có tung độ $40$.'],
      solution: '$y^2 = 80x$; với $y = 40$: $x = \\dfrac{1\\,600}{80} = 20$. Chảo sâu $20$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một cổng hình nửa elip rộng $8$ m, cao $3$ m (trục lớn nằm trên mặt đường). Một xe tải rộng $2{,}4$ m đi chính giữa cổng. Chiều cao tối đa của xe để đi qua được là bao nhiêu mét (làm tròn đến hàng phần trăm)?',
      answer: 2.86,
      tolerance: 0.01,
      unit: 'm',
      hints: [
        'Elip $\\dfrac{x^2}{16} + \\dfrac{y^2}{9} = 1$, gốc ở tâm cổng.',
        'Thành xe cách tâm $1{,}2$ m: tính $y$ tại $x = 1{,}2$.',
      ],
      solution: '$y = 3\\sqrt{1 - \\dfrac{1{,}44}{16}} = 3\\sqrt{0{,}91} \\approx 2{,}86$ (m).',
    },
    {
      type: 'choice',
      prompt: 'Hypebol có tâm sai $\\sqrt{2}$ và một đỉnh $(3; 0)$ có phương trình chính tắc là',
      options: [
        '$\\dfrac{x^2}{9} - \\dfrac{y^2}{9} = 1$',
        '$\\dfrac{x^2}{9} - \\dfrac{y^2}{18} = 1$',
        '$\\dfrac{x^2}{9} + \\dfrac{y^2}{9} = 1$',
        '$\\dfrac{x^2}{3} - \\dfrac{y^2}{3} = 1$',
      ],
      answer: 0,
      hints: ['$a = 3$, $c = ea = 3\\sqrt{2}$.'],
      solution:
        '$c^2 = 18$, $b^2 = c^2 - a^2 = 9$: hypebol vuông $\\dfrac{x^2}{9} - \\dfrac{y^2}{9} = 1$.',
    },
  ],
  takeaways: [
    'Elip: $e < 1$, $MF = a \\pm ex$; hypebol: $e > 1$, $MF = |a \\pm ex|$; parabol: $e = 1$, $MF = x + \\dfrac{p}{2}$.',
    'Mọi đường conic: $\\dfrac{MF}{d(M, \\Delta)} = e$; lập phương trình bằng $MF^2 = e^2 \\cdot d(M, \\Delta)^2$.',
    'Quỹ đạo elip quanh Mặt Trời: khoảng cách đến Mặt Trời từ $a - c$ đến $a + c$.',
    'Ăng-ten chảo đường kính $D$, sâu $h$: đầu thu cách đỉnh $\\dfrac{D^2}{16h}$.',
  ],
};
