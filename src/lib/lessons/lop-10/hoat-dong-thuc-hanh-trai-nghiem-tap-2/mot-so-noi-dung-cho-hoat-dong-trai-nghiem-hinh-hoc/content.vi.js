/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động trải nghiệm hình học: đo đạc để kiểm chứng định lí côsin, định lí sin và công thức Heron; đo khoảng cách trong thực tế; gấp giấy tìm các yếu tố của elip, hypebol, parabol; dựng elip và hypebol bằng phần mềm GeoGebra.',
  intro:
    'Một định lí đúng thì mọi tam giác vẽ ra đều phải thoả mãn nó. Vậy nếu em vẽ một tam giác thật, đo các cạnh, các góc bằng thước và thước đo góc, các số đo có khớp với định lí côsin không? Và nếu cho một điểm chạy trên đường tròn, điểm dựng từ nó sẽ vẽ nên đường gì? Trong bài này em vừa đo đạc trên giấy, vừa dùng phần mềm hình học động để kiểm chứng và khám phá.',
  objectives: [
    'Đo đạc trên hình vẽ để kiểm chứng định lí côsin, định lí sin và công thức Heron.',
    'Dùng hệ thức lượng trong tam giác để đo khoảng cách giữa hai điểm trong thực tế.',
    'Gấp giấy tìm trục đối xứng, lập hệ trục toạ độ và tìm phương trình chính tắc, tiêu điểm của ba đường conic.',
    'Dựng elip và hypebol bằng phần mềm GeoGebra và giải thích vì sao vết của điểm dựng là đường conic.',
  ],
  sections: [
    {
      heading: 'Kiểm chứng kết quả hình học bằng đo đạc',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi nhóm vẽ vài tam giác $ABC$ trên giấy, dùng thước, compa và thước đo góc để đo rồi so sánh với các kết quả đã học. Số đo luôn có sai số, nên hai vế chỉ cần xấp xỉ bằng nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo ba cạnh $a$, $b$, $c$ và góc $A$; kiểm tra định lí côsin $a^2 = b^2 + c^2 - 2bc\\cos A$.',
            'Vẽ đường tròn ngoại tiếp tam giác (tâm là giao điểm hai đường trung trực), đo bán kính $R$; kiểm tra định lí sin $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.',
            'Đo cạnh $a$ và đường cao $h_a$; kiểm tra $a \\cdot h_a = 2S = 2\\sqrt{p(p - a)(p - b)(p - c)}$, với $p = \\dfrac{a + b + c}{2}$ (công thức Heron).',
          ],
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Đo được', 'Tính theo định lí côsin'],
          rows: [
            ['$b$, $c$, $\\widehat{A}$', '$b = 4$ cm, $c = 5$ cm, $\\widehat{A} = 60^\\circ$', '—'],
            [
              '$a$',
              '$a \\approx 4{,}6$ cm',
              '$a = \\sqrt{16 + 25 - 2 \\cdot 4 \\cdot 5 \\cdot 0{,}5} = \\sqrt{21} \\approx 4{,}58$ cm',
            ],
          ],
          caption: 'Một lần đo của nhóm: kết quả đo khớp với định lí côsin đến hàng phần mười.',
        },
      ],
    },
    {
      heading: 'Đo khoảng cách trong thực tế',
      blocks: [
        {
          type: 'p',
          text: 'Đứng ở vị trí $C$, ta muốn biết khoảng cách giữa hai điểm $A$, $B$ không đến được (chẳng hạn hai cây bên kia hồ). Trước hết đo khoảng cách $CA$, $CB$ theo cách đã làm ở Bài 6 (giải tam giác), rồi đo góc $\\widehat{ACB}$ bằng giác kế. Khi đó:',
        },
        {
          type: 'tex',
          tex: 'AB = \\sqrt{CA^2 + CB^2 - 2 \\cdot CA \\cdot CB \\cdot \\cos \\widehat{ACB}}.',
        },
      ],
    },
    {
      heading: 'Gấp giấy tìm các yếu tố của ba đường conic',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi nhóm nhận ba tờ giấy, mỗi tờ có vẽ một đường elip, hypebol hoặc parabol. Gấp giấy sao cho hai nửa đường cong chồng khít lên nhau thì nếp gấp là một trục đối xứng. Lấy đơn vị trên các trục là xentimét.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Elip',
          text: 'Gấp tìm hai trục đối xứng, cắt elip tại $A_1$, $A_2$ và $B_1$, $B_2$ với $A_1A_2 \\ge B_1B_2$. Gọi $O$ là giao điểm hai trục, chọn tia $Ox$ là $OA_2$, tia $Oy$ là $OB_2$. Phương trình chính tắc $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$ với $a = \\dfrac{A_1A_2}{2}$, $b = \\dfrac{B_1B_2}{2}$; tiêu điểm $F_1(-c; 0)$, $F_2(c; 0)$ với $c = \\sqrt{a^2 - b^2}$, tiêu cự $2c$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hypebol',
          text: 'Gấp tìm hai trục đối xứng và lập hệ trục để phương trình có dạng $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$. Đo toạ độ hai điểm trên hypebol, thay vào phương trình được hệ hai ẩn $\\dfrac{1}{a^2}$, $\\dfrac{1}{b^2}$. Giải hệ để có $a$, $b$, rồi $c = \\sqrt{a^2 + b^2}$, tiêu điểm $F_1(-c; 0)$, $F_2(c; 0)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Parabol',
          text: 'Gấp tìm trục đối xứng, nó cắt parabol tại đỉnh $O$. Lập hệ trục để phương trình có dạng $y^2 = 2px$ ($p > 0$). Đo toạ độ một điểm $M(x_0; y_0)$ trên parabol, từ $y_0^2 = 2px_0$ tìm $p$; tiêu điểm $F\\left(\\dfrac{p}{2}; 0\\right)$, đường chuẩn $\\Delta: x = -\\dfrac{p}{2}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Kiểm tra lại bằng định nghĩa: với elip, tổng khoảng cách từ một điểm trên elip đến hai tiêu điểm vừa tìm phải xấp xỉ $2a$; với parabol, khoảng cách từ một điểm đến tiêu điểm phải xấp xỉ khoảng cách từ điểm đó đến đường chuẩn.',
        },
      ],
    },
    {
      heading: 'Dựng elip và hypebol bằng GeoGebra',
      blocks: [
        {
          type: 'p',
          text: 'Trong phòng máy, mở phần mềm GeoGebra và dựng theo các bước sau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường tròn $(A; R)$ với $R = 3$ (công cụ "Đường tròn khi biết tâm và bán kính").',
            'Lấy điểm $B$ nằm ngoài đường tròn và điểm $C$ trên đường tròn (công cụ "Điểm trên đối tượng").',
            'Vẽ đường thẳng $AC$, đoạn thẳng $BC$ và đường trung trực của $BC$.',
            'Lấy giao điểm của đường thẳng $AC$ với đường trung trực, đổi tên thành $M$; bật "Hiện vết" cho $M$.',
            'Cho $C$ chuyển động trên đường tròn ("Tạo chuyển động") và quan sát vết của $M$.',
            'Làm lại với điểm $B$ nằm trong đường tròn.',
          ],
        },
        {
          type: 'p',
          text: 'Vì $M$ nằm trên đường trung trực của $BC$ nên $MB = MC$. Điểm $M$ lại nằm trên đường thẳng $AC$ và $AC = R$.',
        },
        {
          type: 'list',
          items: [
            '$B$ nằm trong đường tròn: $M$ nằm giữa $A$ và $C$, nên $MA + MB = MA + MC = AC = R$. Vết của $M$ là elip có hai tiêu điểm $A$, $B$ và $2a = R$.',
            '$B$ nằm ngoài đường tròn: $M$ nằm ngoài đoạn $AC$, nên $|MA - MB| = |MA - MC| = AC = R$. Vết của $M$ là hypebol có hai tiêu điểm $A$, $B$ và $2a = R$.',
          ],
        },
      ],
    },
    {
      heading: 'Hai viên sỏi trên mặt nước',
      blocks: [
        {
          type: 'p',
          text: 'Thả cùng lúc hai viên sỏi giống nhau xuống mặt nước phẳng lặng tại $O_1$ và $O_2$: hai họ sóng tròn lan ra với cùng tốc độ. Mô phỏng trong GeoGebra: vẽ các đường tròn $(\\omega_1)$, $(\\omega_2)$, $(\\omega_3)$, … tâm $O_1$, bán kính $R_1$, $R_1 + a$, $R_1 + 2a$, … và các đường tròn $(\\Omega_1)$, $(\\Omega_2)$, $(\\Omega_3)$, … tâm $O_2$, bán kính $R_2$, $R_2 + a$, $R_2 + 2a$, … với $R_1 \\ne R_2$ (chẳng hạn $R_1 = 3$, $R_2 = 4$, $a = 2$).',
        },
        {
          type: 'p',
          text: 'Giao điểm $P$ của $(\\omega_k)$ và $(\\Omega_k)$ có $PO_2 - PO_1 = (R_2 + (k - 1)a) - (R_1 + (k - 1)a) = R_2 - R_1$ không đổi. Vậy mọi giao điểm nằm trên một nhánh của hypebol có hai tiêu điểm $O_1$, $O_2$ và $2a_H = |R_2 - R_1|$ (viết $a_H$ để khỏi nhầm với khoảng cách $a$ giữa hai vòng sóng).',
        },
      ],
    },
    {
      heading: 'Dự án: Đo đạc và dựng hình với các đường conic',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh kiểm chứng các hệ thức lượng bằng đo đạc, đo một khoảng cách thật ở sân trường, tìm các yếu tố của ba đường conic bằng gấp giấy và dựng elip, hypebol bằng GeoGebra.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thước thẳng, compa, ê ke, thước đo góc, thước dây, giác kế (hoặc ứng dụng đo góc trên điện thoại), giấy có vẽ sẵn elip, hypebol, parabol; máy tính cài GeoGebra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ ba tam giác (nhọn, vuông, tù), đo cạnh, góc, bán kính đường tròn ngoại tiếp và đường cao; lập bảng so sánh với định lí côsin, định lí sin và công thức Heron.',
            'Chọn hai điểm $A$, $B$ trong sân trường; đứng tại $C$, đo $CA$, $CB$, góc $\\widehat{ACB}$ và tính $AB$. Nếu đến được, đo trực tiếp $AB$ bằng thước dây để so sánh.',
            'Gấp giấy tìm trục đối xứng của ba đường conic; đo đạc, viết phương trình chính tắc, tìm tiêu điểm (và đường chuẩn của parabol); kiểm tra lại bằng định nghĩa.',
            'Dựng điểm $M$ trong GeoGebra với $B$ ở trong và ở ngoài đường tròn; chụp lại vết của $M$ và giải thích vì sao đó là elip, hypebol.',
            'Mô phỏng hai họ sóng tròn của hai viên sỏi; kiểm tra các giao điểm nằm trên một nhánh hypebol.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một bài trình chiếu gồm các bảng số đo và nhận xét về sai số, phép tính khoảng cách $AB$, phương trình ba đường conic tìm được, hình chụp các vết trong GeoGebra và lời giải thích.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng elip và hypebol',
    instruction:
      'Phần "Điểm M": kéo điểm $C$ trên đường tròn hoặc bấm "Cho C chạy một vòng" để xem vết của $M$; kéo $B$ vào trong hay ra ngoài đường tròn và đọc tổng hoặc hiệu $MA$, $MB$. Phần "Hai viên sỏi": đổi khoảng cách $a$ giữa các vòng sóng và số vòng, quan sát các giao điểm.',
  },
  examples: [
    {
      problem:
        'Gấp tờ giấy có vẽ elip, nhóm của Lan đo được $A_1A_2 = 10$ cm, $B_1B_2 = 6$ cm. Viết phương trình chính tắc của elip, tìm tiêu cự và toạ độ các tiêu điểm.',
      steps: [
        '$a = \\dfrac{A_1A_2}{2} = 5$, $b = \\dfrac{B_1B_2}{2} = 3$.',
        'Phương trình chính tắc: $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$.',
        '$c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 9} = 4$, tiêu cự $2c = 8$ cm.',
      ],
      answer:
        '$\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$; tiêu cự $8$ cm; $F_1(-4; 0)$, $F_2(4; 0)$.',
    },
    {
      problem:
        'Trên tờ giấy vẽ hypebol, sau khi lập hệ trục, nhóm của Minh đo được hai điểm $M(2; 0)$ và $N(4; 6)$ nằm trên hypebol. Viết phương trình chính tắc và tìm các tiêu điểm.',
      steps: [
        'Phương trình có dạng $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$. Đặt $u = \\dfrac{1}{a^2}$, $v = \\dfrac{1}{b^2}$.',
        'Thay $M(2; 0)$: $4u = 1$, nên $u = \\dfrac{1}{4}$, $a^2 = 4$.',
        'Thay $N(4; 6)$: $16u - 36v = 1$, tức $4 - 36v = 1$, nên $v = \\dfrac{1}{12}$, $b^2 = 12$.',
        '$c = \\sqrt{a^2 + b^2} = \\sqrt{16} = 4$.',
      ],
      answer: '$\\dfrac{x^2}{4} - \\dfrac{y^2}{12} = 1$; $F_1(-4; 0)$, $F_2(4; 0)$.',
    },
    {
      problem:
        'Trên tờ giấy vẽ parabol, sau khi lập hệ trục để phương trình có dạng $y^2 = 2px$, nhóm đo được điểm $M(2; 4)$ nằm trên parabol. Tìm phương trình, tiêu điểm và đường chuẩn.',
      steps: [
        'Thay $M(2; 4)$: $16 = 2p \\cdot 2$, nên $p = 4$.',
        'Phương trình: $y^2 = 8x$; tiêu điểm $F(2; 0)$, đường chuẩn $\\Delta: x = -2$.',
        'Kiểm tra: $MF = \\sqrt{(2 - 2)^2 + 4^2} = 4$ và khoảng cách từ $M$ đến $\\Delta$ là $2 + 2 = 4$, bằng nhau.',
      ],
      answer: '$y^2 = 8x$; $F(2; 0)$; $\\Delta: x = -2$.',
    },
    {
      problem:
        'Đứng tại $C$, bạn Hùng đo được $CA = 40$ m, $CB = 50$ m và $\\widehat{ACB} = 60^\\circ$. Tính khoảng cách $AB$ (làm tròn đến hàng phần trăm của mét).',
      steps: [
        'Theo định lí côsin: $AB^2 = 40^2 + 50^2 - 2 \\cdot 40 \\cdot 50 \\cdot \\cos 60^\\circ$.',
        '$AB^2 = 1\\,600 + 2\\,500 - 2\\,000 = 2\\,100$.',
        '$AB = \\sqrt{2\\,100} \\approx 45{,}83$ (m).',
      ],
      answer: '$AB \\approx 45{,}83$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Gấp giấy, một nhóm đo được hai trục của elip là $A_1A_2 = 10$ cm và $B_1B_2 = 8$ cm. Tiêu cự của elip bằng bao nhiêu xentimét?',
      answer: 6,
      unit: 'cm',
      hints: ['$a = 5$, $b = 4$; tính $c = \\sqrt{a^2 - b^2}$.', 'Tiêu cự là $2c$.'],
      solution: '$a = 5$, $b = 4$, $c = \\sqrt{25 - 16} = 3$. Tiêu cự $2c = 6$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Cho đường tròn $(A; 3)$, điểm $B$ nằm trong đường tròn, $C$ chạy trên đường tròn; $M$ là giao điểm của đường thẳng $AC$ với đường trung trực của $BC$. Vết của $M$ là',
      options: [
        'elip có hai tiêu điểm $A$, $B$ và $MA + MB = 3$',
        'hypebol có hai tiêu điểm $A$, $B$ và $|MA - MB| = 3$',
        'đường tròn tâm $A$ bán kính $3$',
        'parabol có tiêu điểm $B$',
      ],
      answer: 0,
      hints: [
        '$M$ nằm trên đường trung trực của $BC$ nên $MB = MC$.',
        'Tính $MA + MC$ khi $M$ nằm giữa $A$ và $C$.',
      ],
      solution:
        '$MB = MC$ và $M$ nằm giữa $A$, $C$, nên $MA + MB = MA + MC = AC = 3$ không đổi. Vết của $M$ là elip có hai tiêu điểm $A$, $B$. Hypebol chỉ xuất hiện khi $B$ nằm ngoài đường tròn.',
    },
    {
      type: 'number',
      prompt:
        'Trong cách dựng trên, $R = 3$ cm và $B$ nằm ngoài đường tròn với $AB = 5$ cm. Vết của $M$ là hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ (trong hệ trục thích hợp). Tính $b$ (cm).',
      answer: 2,
      unit: 'cm',
      hints: [
        '$|MA - MB| = R$ nên $2a = 3$; tiêu cự $2c = AB = 5$.',
        'Với hypebol, $b^2 = c^2 - a^2$.',
      ],
      solution: '$a = 1{,}5$, $c = 2{,}5$, $b^2 = 6{,}25 - 2{,}25 = 4$, nên $b = 2$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn cách dựng đó với $R = 3$ cm, nhưng $B$ nằm trong đường tròn và $AB = 2$ cm. Vết của $M$ là elip $\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$. Tính $b$ (cm, làm tròn đến hàng phần trăm).',
      answer: 1.12,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['$MA + MB = 3$ nên $2a = 3$; tiêu cự $2c = AB = 2$.', 'Với elip, $b^2 = a^2 - c^2$.'],
      solution:
        '$a = 1{,}5$, $c = 1$, $b = \\sqrt{2{,}25 - 1} = \\sqrt{1{,}25} \\approx 1{,}12$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Parabol $y^2 = 2px$ vẽ trên giấy đi qua điểm đo được $M(1; 3)$. Hoành độ tiêu điểm của parabol bằng bao nhiêu?',
      answer: 2.25,
      hints: [
        'Thay toạ độ $M$ vào $y^2 = 2px$ để tìm $p$.',
        'Tiêu điểm là $F\\left(\\dfrac{p}{2}; 0\\right)$.',
      ],
      solution: '$9 = 2p \\cdot 1$, nên $p = 4{,}5$. Tiêu điểm $F(2{,}25; 0)$, hoành độ $2{,}25$.',
    },
    {
      type: 'number',
      prompt:
        'Đứng tại $C$, đo được $CA = 30$ m, $CB = 40$ m và $\\widehat{ACB} = 120^\\circ$. Khoảng cách $AB$ bằng bao nhiêu mét (làm tròn đến hàng phần trăm)?',
      answer: 60.83,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Dùng định lí côsin; nhớ $\\cos 120^\\circ = -\\dfrac{1}{2}$.'],
      solution:
        '$AB^2 = 900 + 1\\,600 - 2 \\cdot 30 \\cdot 40 \\cdot \\left(-\\dfrac{1}{2}\\right) = 2\\,500 + 1\\,200 = 3\\,700$, nên $AB = \\sqrt{3\\,700} \\approx 60{,}83$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một nhóm vẽ tam giác có ba cạnh $13$ cm, $14$ cm, $15$ cm để kiểm chứng công thức $a \\cdot h_a = 2S$. Theo công thức Heron, đường cao ứng với cạnh $a = 14$ cm dài bao nhiêu xentimét?',
      answer: 12,
      unit: 'cm',
      hints: [
        '$p = \\dfrac{13 + 14 + 15}{2} = 21$; tính $S = \\sqrt{p(p - a)(p - b)(p - c)}$.',
        '$h_a = \\dfrac{2S}{a}$.',
      ],
      solution:
        '$S = \\sqrt{21 \\cdot 7 \\cdot 6 \\cdot 8} = \\sqrt{7\\,056} = 84$ (cm²). $h_a = \\dfrac{2 \\cdot 84}{14} = 12$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Đo trên hình vẽ được cạnh $a = 6$ cm và góc $\\widehat{A} = 30^\\circ$. Theo định lí sin, bán kính đường tròn ngoại tiếp tam giác bằng bao nhiêu xentimét?',
      answer: 6,
      unit: 'cm',
      hints: ['$\\dfrac{a}{\\sin A} = 2R$.'],
      solution: '$2R = \\dfrac{6}{\\sin 30^\\circ} = \\dfrac{6}{0{,}5} = 12$, nên $R = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hai viên sỏi rơi tại $O_1$, $O_2$ cách nhau $5$ cm; các vòng sóng có bán kính bắt đầu từ $R_1 = 3$ cm và $R_2 = 4$ cm. Các giao điểm nằm trên hypebol $\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$ (trong hệ trục thích hợp). Tính $b$ (cm, làm tròn đến hàng phần trăm).',
      answer: 2.45,
      tolerance: 0.01,
      unit: 'cm',
      hints: [
        '$PO_2 - PO_1 = R_2 - R_1 = 1$ nên $2a = 1$; tiêu cự $2c = O_1O_2 = 5$.',
        '$b^2 = c^2 - a^2$.',
      ],
      solution:
        '$a = 0{,}5$, $c = 2{,}5$, $b^2 = 6{,}25 - 0{,}25 = 6$, nên $b = \\sqrt{6} \\approx 2{,}45$ cm.',
    },
  ],
  takeaways: [
    'Số đo trên hình vẽ chỉ xấp xỉ, nhưng phải khớp với định lí côsin, định lí sin và công thức Heron trong phạm vi sai số đo.',
    'Đo $CA$, $CB$ và góc $\\widehat{ACB}$ rồi dùng định lí côsin để tính khoảng cách $AB$ không đo trực tiếp được.',
    'Gấp giấy tìm trục đối xứng giúp lập hệ trục; đo đạc rồi thay vào phương trình chính tắc để tìm $a$, $b$, $p$ và tiêu điểm.',
    'Giao điểm $M$ của đường thẳng $AC$ và đường trung trực của $BC$ ($C$ chạy trên đường tròn $(A; R)$) vạch nên elip khi $B$ ở trong, hypebol khi $B$ ở ngoài đường tròn, với hai tiêu điểm $A$, $B$ và $2a = R$.',
  ],
};
