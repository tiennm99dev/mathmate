/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng hàm số mũ để mô tả sự tăng trưởng và suy giảm (dân số, vi khuẩn, chất phóng xạ), dùng hàm số lôgarit để đo trên thang lôgarit (độ pH, độ Richter, mức cường độ âm theo decibel).',
  intro:
    'Năm $2020$ dân số thế giới khoảng $7\\,795$ triệu người. Nếu dân số tăng $1{,}05\\%$ mỗi năm thì đến năm $2050$ thế giới có bao nhiêu người? Một mẩu than củi chỉ còn $1{,}67\\%$ lượng carbon-14 ban đầu thì đã có từ bao giờ? Những câu hỏi như vậy được trả lời bằng hàm số mũ và hàm số lôgarit.',
  objectives: [
    'Dùng mô hình $A(t) = A_0e^{rt}$ để mô tả sự tăng trưởng ($r > 0$) và suy giảm ($r < 0$).',
    'Tìm tham số $r$ từ số liệu hoặc từ chu kì bán rã, rồi dùng lôgarit để tìm thời gian.',
    'Tính độ pH, độ lớn Richter của trận động đất và mức cường độ âm theo decibel.',
    'Giải thích vì sao thang lôgarit thu gọn những đại lượng thay đổi rất nhiều lần.',
  ],
  sections: [
    {
      heading: 'Mô hình tăng trưởng và suy giảm',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều đại lượng thay đổi với tốc độ tỉ lệ với chính nó: dân số, số vi khuẩn, số tiền gửi theo lãi kép liên tục, lượng chất phóng xạ. Các đại lượng này được mô tả bởi hàm số mũ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mô hình mũ',
          text: '$$A(t) = A_0e^{rt},$$ trong đó $A_0$ là giá trị ban đầu (tại $t = 0$), $A(t)$ là giá trị sau thời gian $t$ và $r$ là tỉ lệ tăng trưởng. Nếu $r > 0$ thì $A$ tăng (mô hình tăng trưởng); nếu $r < 0$ thì $A$ giảm (mô hình suy giảm).',
        },
        {
          type: 'p',
          text: 'Biết hai giá trị $A(t_1)$ và $A(t_2)$, chia vế theo vế được $\\dfrac{A(t_2)}{A(t_1)} = e^{r(t_2 - t_1)}$, nên $$r = \\dfrac{1}{t_2 - t_1}\\ln\\dfrac{A(t_2)}{A(t_1)}.$$ Muốn biết sau bao lâu thì đại lượng đạt giá trị $A$, ta lấy lôgarit tự nhiên: $t = \\dfrac{1}{r}\\ln\\dfrac{A}{A_0}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chu kì bán rã',
          text: 'Chu kì bán rã $T$ của một chất phóng xạ là thời gian để lượng chất còn lại một nửa: $e^{kT} = \\dfrac{1}{2}$, do đó $k = -\\dfrac{\\ln 2}{T}$. Carbon-14 có chu kì bán rã khoảng $5\\,730$ năm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận ra mô hình mũ từ số liệu',
          text: 'Từ $A = A_0e^{rt}$ suy ra $\\ln A = \\ln A_0 + rt$. Vậy nếu biểu diễn $\\ln A$ theo $t$ mà các điểm gần thẳng hàng thì số liệu phù hợp với mô hình mũ, và $r$ là hệ số góc của đường thẳng đó.',
        },
      ],
    },
    {
      heading: 'Thang lôgarit',
      blocks: [
        {
          type: 'p',
          text: 'Có những đại lượng thay đổi từ rất nhỏ đến rất lớn, chênh nhau hàng triệu, hàng tỉ lần. Để so sánh dễ hơn, người ta dùng thang lôgarit: thay đại lượng $x$ bởi $\\log x$. Khi $x$ tăng gấp $10$ lần thì $\\log x$ chỉ tăng thêm $1$, vì $\\log(10x) = 1 + \\log x$.',
        },
        {
          type: 'table',
          head: ['Thang đo', 'Công thức', 'Đại lượng'],
          rows: [
            ['Độ pH', '$\\mathrm{pH} = -\\log[H^+]$', '$[H^+]$: nồng độ ion hydrogen (mol/l)'],
            [
              'Độ Richter',
              '$M = \\log A - \\log A_0 = \\log\\dfrac{A}{A_0}$',
              '$A$: biên độ lớn nhất đo được, $A_0$: biên độ chuẩn',
            ],
            [
              'Mức cường độ âm',
              '$L = 10\\log\\dfrac{I}{I_0}$ (dB)',
              '$I$: cường độ âm (W/m²), $I_0 = 10^{-12}$ W/m²',
            ],
          ],
          caption: 'Ba thang lôgarit thường gặp.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Độ pH',
          text: 'Dung dịch có $\\mathrm{pH} < 7$ có tính acid, $\\mathrm{pH} > 7$ có tính base, $\\mathrm{pH} = 7$ là trung tính. Nồng độ $[H^+]$ tăng gấp $10$ lần thì pH giảm $1$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Độ Richter và decibel',
          text: 'Biên độ tăng gấp $10$ lần thì độ lớn Richter tăng $1$. Cường độ âm tăng gấp $10$ lần thì mức cường độ âm tăng $10$ dB; tăng gấp đôi thì tăng $10\\log 2 \\approx 3$ dB.',
        },
        { type: 'widget', name: 'log-scale' },
      ],
    },
    {
      heading: 'Dự án: Mô hình hoá bằng hàm số mũ và lôgarit',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thu thập một bộ số liệu thực tế, chọn mô hình mũ hoặc thang lôgarit phù hợp, dùng mô hình để dự báo và trình bày trước lớp. Lớp chia thành các nhóm $4$ đến $6$ học sinh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính cầm tay hoặc phần mềm bảng tính, giấy kẻ ô; nguồn số liệu như niên giám thống kê, trang web của cơ quan thống kê, sách Vật lí và Hoá học.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một chủ đề: dân số của tỉnh, thành phố hoặc cả nước qua các năm; số tiền gửi tiết kiệm; lượng chất phóng xạ; độ pH của một số đồ uống; mức cường độ âm ở những nơi quen thuộc.',
            'Với chủ đề tăng trưởng, suy giảm: lập bảng số liệu, tính $\\ln A$ và biểu diễn trên mặt phẳng toạ độ để kiểm tra các điểm có gần thẳng hàng không.',
            'Chọn hai số liệu để tìm $r$, viết mô hình $A(t) = A_0e^{rt}$, so sánh các giá trị mô hình cho với số liệu thật (có thể dùng khung tương tác ở trên).',
            'Dùng mô hình để dự báo giá trị ở một thời điểm sau, hoặc tìm thời điểm đại lượng đạt một mức cho trước.',
            'Với chủ đề thang lôgarit: tính độ pH, độ Richter hoặc mức cường độ âm từ số liệu, rồi so sánh các đại lượng ban đầu gấp nhau bao nhiêu lần.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nguồn số liệu, bảng số liệu và đồ thị, mô hình đã chọn và cách tìm tham số, kết quả dự báo, nhận xét về độ tin cậy của mô hình (mô hình mũ chỉ đúng trong một khoảng thời gian, khi tỉ lệ tăng trưởng gần như không đổi).',
        },
      ],
    },
  ],
  explore: {
    title: 'Chọn tham số cho mô hình mũ',
    instruction:
      'Chọn một bộ số liệu. Kéo thanh $A_0$ và $r$ để đồ thị $A(t) = A_0e^{rt}$ đi qua gần các điểm số liệu. Chuyển trục tung sang $\\ln A$: các điểm gần thẳng hàng và $r$ là hệ số góc. Khi đã thử xong, bấm "Xem mô hình khớp nhất" để so sánh.',
  },
  examples: [
    {
      problem:
        'Số vi khuẩn trong một mẫu nuôi cấy là $2$ nghìn con lúc bắt đầu và $16{,}5$ nghìn con sau $6$ giờ. Giả sử số vi khuẩn tăng theo mô hình $A(t) = A_0e^{rt}$ ($t$ tính bằng giờ). Tìm $r$ và ước tính số vi khuẩn sau $8$ giờ.',
      steps: [
        '$A_0 = 2$ và $A(6) = 2e^{6r} = 16{,}5$, nên $e^{6r} = 8{,}25$.',
        '$r = \\dfrac{\\ln 8{,}25}{6} \\approx \\dfrac{2{,}1102}{6} \\approx 0{,}3517$.',
        '$A(8) = 2e^{8r} \\approx 2e^{2{,}8136} \\approx 33{,}34$.',
      ],
      answer: '$r \\approx 0{,}3517$; sau $8$ giờ có khoảng $33{,}34$ nghìn con vi khuẩn.',
    },
    {
      problem:
        'Một mẫu gỗ cổ chỉ còn $30\\%$ lượng carbon-14 so với lúc cây còn sống. Biết chu kì bán rã của carbon-14 là $5\\,730$ năm, ước tính tuổi của mẫu gỗ.',
      steps: [
        'Lượng carbon-14 còn lại: $A(t) = A_0e^{kt}$ với $k = -\\dfrac{\\ln 2}{5\\,730}$.',
        '$A(t) = 0{,}3A_0 \\Leftrightarrow e^{kt} = 0{,}3 \\Leftrightarrow t = \\dfrac{\\ln 0{,}3}{k} = \\dfrac{5\\,730 \\cdot \\ln\\dfrac{1}{0{,}3}}{\\ln 2}$.',
        '$t \\approx \\dfrac{5\\,730 \\cdot 1{,}20397}{0{,}69315} \\approx 9\\,953$.',
      ],
      answer: 'Mẫu gỗ có tuổi khoảng $9\\,953$ năm.',
    },
    {
      problem:
        'Một dung dịch có nồng độ ion hydrogen $[H^+] = 3{,}2 \\cdot 10^{-9}$ mol/l. Tính độ pH của dung dịch (làm tròn đến hàng phần trăm) và cho biết dung dịch có tính acid hay tính base.',
      steps: [
        '$\\mathrm{pH} = -\\log(3{,}2 \\cdot 10^{-9}) = -(\\log 3{,}2 - 9) = 9 - \\log 3{,}2$.',
        '$\\log 3{,}2 \\approx 0{,}505$, nên $\\mathrm{pH} \\approx 8{,}49$.',
        '$8{,}49 > 7$ nên dung dịch có tính base.',
      ],
      answer: '$\\mathrm{pH} \\approx 8{,}49$, dung dịch có tính base.',
    },
    {
      problem:
        'Âm thanh trong một lớp học có cường độ $I = 10^{-6}$ W/m². Tính mức cường độ âm. Nếu cường độ âm tăng gấp đôi thì mức cường độ âm tăng bao nhiêu decibel?',
      steps: [
        '$L = 10\\log\\dfrac{10^{-6}}{10^{-12}} = 10\\log 10^{6} = 60$ (dB).',
        "Khi cường độ là $2I$: $L' = 10\\log\\dfrac{2I}{I_0} = 10\\log 2 + 10\\log\\dfrac{I}{I_0} = L + 10\\log 2$.",
        '$10\\log 2 \\approx 3{,}01$.',
      ],
      answer:
        'Mức cường độ âm là $60$ dB; tăng gấp đôi cường độ thì mức cường độ âm tăng khoảng $3$ dB.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Năm $2020$ dân số thế giới khoảng $7\\,795$ triệu người. Giả sử tỉ lệ tăng dân số là $1{,}05\\%$ mỗi năm và không đổi, dân số tăng theo mô hình $A(t) = A_0e^{rt}$. Ước tính dân số thế giới năm $2050$ (đơn vị triệu người, làm tròn đến hàng đơn vị).',
      answer: 10681,
      tolerance: 1,
      unit: 'triệu người',
      hints: [
        '$A_0 = 7\\,795$, $r = 0{,}0105$ và $t = 2050 - 2020$.',
        'Tính $7\\,795 \\cdot e^{0{,}0105 \\cdot 30} = 7\\,795 \\cdot e^{0{,}315}$.',
      ],
      solution:
        '$A(30) = 7\\,795 \\cdot e^{0{,}315} \\approx 7\\,795 \\cdot 1{,}37026 \\approx 10\\,681$ triệu người.',
    },
    {
      type: 'number',
      prompt:
        'Than củi tìm thấy cùng những công cụ bằng đá chỉ còn $1{,}67\\%$ lượng carbon-14 ban đầu. Biết chu kì bán rã của carbon-14 là $5\\,730$ năm, cây làm ra than đã bị chặt và đốt cách đây khoảng bao nhiêu năm? Làm tròn đến hàng chục.',
      answer: 33830,
      tolerance: 5,
      unit: 'năm',
      hints: [
        'Từ chu kì bán rã: $k = -\\dfrac{\\ln 2}{5\\,730}$.',
        'Giải $e^{kt} = 0{,}0167$: $t = \\dfrac{\\ln 0{,}0167}{k}$.',
      ],
      solution:
        '$t = \\dfrac{-5\\,730 \\cdot \\ln 0{,}0167}{\\ln 2} \\approx \\dfrac{5\\,730 \\cdot 4{,}09235}{0{,}69315} \\approx 33\\,830$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu chứa carbon-14 chỉ còn $25\\%$ lượng ban đầu. Mẫu đó có tuổi bao nhiêu năm? (Chu kì bán rã $5\\,730$ năm.)',
      answer: 11460,
      tolerance: 1,
      unit: 'năm',
      hints: [
        '$25\\% = \\dfrac{1}{4} = \\left(\\dfrac{1}{2}\\right)^2$: lượng chất đã giảm một nửa mấy lần?',
      ],
      solution:
        'Sau mỗi chu kì bán rã lượng chất còn một nửa; còn $\\dfrac{1}{4}$ nghĩa là đã qua $2$ chu kì: $2 \\cdot 5\\,730 = 11\\,460$ năm. Có thể kiểm tra: $t = \\dfrac{\\ln 0{,}25}{-\\ln 2 / 5\\,730} = 2 \\cdot 5\\,730$.',
    },
    {
      type: 'number',
      prompt:
        'Số vi khuẩn tăng theo mô hình $A(t) = A_0e^{rt}$ ($t$ tính bằng giờ) và cứ sau $3$ giờ thì tăng gấp đôi. Tìm $r$ (làm tròn đến hàng phần nghìn).',
      answer: 0.231,
      tolerance: 0.0006,
      hints: ['Tăng gấp đôi sau $3$ giờ: $e^{3r} = 2$.'],
      solution:
        '$e^{3r} = 2 \\Leftrightarrow r = \\dfrac{\\ln 2}{3} \\approx \\dfrac{0{,}69315}{3} \\approx 0{,}231$.',
    },
    {
      type: 'number',
      prompt:
        'Dân số một thành phố năm $2015$ là $2$ triệu người, năm $2025$ là $2{,}3$ triệu người. Giả sử dân số tăng theo mô hình $A(t) = A_0e^{rt}$, dân số năm $2035$ là bao nhiêu triệu người?',
      answer: 2.645,
      tolerance: 0.0006,
      unit: 'triệu người',
      hints: [
        'Từ $2015$ đến $2025$: $e^{10r} = \\dfrac{2{,}3}{2} = 1{,}15$.',
        'Đến $2035$ là $20$ năm: $A = 2e^{20r} = 2\\left(e^{10r}\\right)^2$.',
      ],
      solution:
        '$e^{10r} = 1{,}15$ nên $A(20) = 2e^{20r} = 2 \\cdot 1{,}15^2 = 2 \\cdot 1{,}3225 = 2{,}645$ triệu người.',
    },
    {
      type: 'number',
      prompt:
        'Nước chanh có nồng độ ion hydrogen $[H^+] = 5{,}0 \\cdot 10^{-3}$ mol/l. Tính độ pH của nước chanh (làm tròn đến hàng phần mười).',
      answer: 2.3,
      tolerance: 0.05,
      hints: ['$\\mathrm{pH} = -\\log[H^+] = -(\\log 5 - 3)$.'],
      solution:
        '$\\mathrm{pH} = -\\log(5 \\cdot 10^{-3}) = 3 - \\log 5 \\approx 3 - 0{,}699 \\approx 2{,}3$. Vì $2{,}3 < 7$ nên nước chanh có tính acid.',
    },
    {
      type: 'choice',
      prompt:
        'Dung dịch $X$ có pH lớn hơn pH của dung dịch $Y$ đúng $1$ đơn vị. Khẳng định nào đúng?',
      options: [
        'Nồng độ $[H^+]$ của $X$ bằng $\\dfrac{1}{10}$ nồng độ $[H^+]$ của $Y$.',
        'Nồng độ $[H^+]$ của $X$ gấp $10$ lần nồng độ $[H^+]$ của $Y$.',
        'Nồng độ $[H^+]$ của $X$ nhỏ hơn của $Y$ đúng $1$ mol/l.',
        'Nồng độ $[H^+]$ của $X$ gấp $e$ lần nồng độ $[H^+]$ của $Y$.',
      ],
      answer: 0,
      hints: [
        '$\\mathrm{pH}_X - \\mathrm{pH}_Y = \\log[H^+]_Y - \\log[H^+]_X = \\log\\dfrac{[H^+]_Y}{[H^+]_X}$.',
      ],
      solution:
        '$\\log\\dfrac{[H^+]_Y}{[H^+]_X} = 1$ nên $[H^+]_Y = 10[H^+]_X$: nồng độ $[H^+]$ của $X$ chỉ bằng $\\dfrac{1}{10}$ của $Y$. pH lớn hơn thì nồng độ $[H^+]$ nhỏ hơn.',
    },
    {
      type: 'number',
      prompt:
        'Trận động đất ở San Francisco năm $1906$ có độ lớn $8{,}3$ độ Richter. Một trận động đất khác có biên độ gấp $4$ lần. Tính độ lớn của trận động đất đó (làm tròn đến hàng phần mười).',
      answer: 8.9,
      tolerance: 0.05,
      unit: 'độ Richter',
      hints: [
        "$M = \\log\\dfrac{A}{A_0}$; nếu biên độ là $4A$ thì $M' = \\log 4 + \\log\\dfrac{A}{A_0}$.",
      ],
      solution:
        "$M' = \\log\\dfrac{4A}{A_0} = \\log 4 + 8{,}3 \\approx 0{,}602 + 8{,}3 \\approx 8{,}9$ độ Richter.",
    },
    {
      type: 'number',
      prompt:
        'Một trận động đất $7$ độ Richter có biên độ gấp bao nhiêu lần biên độ của một trận động đất $5$ độ Richter?',
      answer: 100,
      unit: 'lần',
      hints: [
        '$M_1 - M_2 = \\log\\dfrac{A_1}{A_0} - \\log\\dfrac{A_2}{A_0} = \\log\\dfrac{A_1}{A_2}$.',
      ],
      solution: '$\\log\\dfrac{A_1}{A_2} = 7 - 5 = 2$ nên $\\dfrac{A_1}{A_2} = 10^2 = 100$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Âm thanh của dòng xe cộ trên một con phố có cường độ $I = 2{,}0 \\cdot 10^{-5}$ W/m². Tính mức cường độ âm (làm tròn đến hàng đơn vị), biết $I_0 = 10^{-12}$ W/m².',
      answer: 73,
      tolerance: 0.5,
      unit: 'dB',
      hints: ['$\\dfrac{I}{I_0} = 2 \\cdot 10^{7}$, rồi tính $10\\log(2 \\cdot 10^7)$.'],
      solution:
        '$L = 10\\log\\dfrac{2 \\cdot 10^{-5}}{10^{-12}} = 10\\log(2 \\cdot 10^{7}) = 10(\\log 2 + 7) \\approx 10 \\cdot 7{,}301 \\approx 73$ dB.',
    },
    {
      type: 'number',
      prompt:
        'Mức cường độ âm ở một ngã tư là $80$ dB, trong một phòng làm việc là $60$ dB. Cường độ âm ở ngã tư gấp bao nhiêu lần cường độ âm trong phòng?',
      answer: 100,
      unit: 'lần',
      hints: ['$L_1 - L_2 = 10\\log\\dfrac{I_1}{I_2}$.'],
      solution:
        '$10\\log\\dfrac{I_1}{I_2} = 80 - 60 = 20$ nên $\\log\\dfrac{I_1}{I_2} = 2$, $\\dfrac{I_1}{I_2} = 100$ lần.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tình huống với công thức dùng để tính.',
      left: [
        'Lượng chất phóng xạ còn lại sau thời gian $t$',
        'Độ chua của một dung dịch',
        'Độ lớn của một trận động đất',
        'Độ to của một âm thanh',
      ],
      right: [
        '$A(t) = A_0e^{kt}$ với $k = -\\dfrac{\\ln 2}{T}$',
        '$\\mathrm{pH} = -\\log[H^+]$',
        '$M = \\log A - \\log A_0$',
        '$L = 10\\log\\dfrac{I}{I_0}$',
        '$A(t) = A_0(1 + rt)$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Độ to của âm đo bằng decibel; độ lớn động đất đo bằng độ Richter.'],
      solution:
        'Chất phóng xạ: mô hình suy giảm $A_0e^{kt}$, $k = -\\dfrac{\\ln 2}{T}$. Độ chua: $\\mathrm{pH} = -\\log[H^+]$. Động đất: $M = \\log A - \\log A_0$. Âm thanh: $L = 10\\log\\dfrac{I}{I_0}$ (dB). Công thức $A_0(1 + rt)$ là tăng theo hàm bậc nhất, không phải mô hình mũ.',
    },
  ],
  takeaways: [
    'Mô hình mũ $A(t) = A_0e^{rt}$: tăng trưởng khi $r > 0$, suy giảm khi $r < 0$; tìm $r$ và $t$ bằng lôgarit tự nhiên.',
    'Chất có chu kì bán rã $T$: $k = -\\dfrac{\\ln 2}{T}$.',
    'Thang lôgarit: $\\mathrm{pH} = -\\log[H^+]$, $M = \\log\\dfrac{A}{A_0}$, $L = 10\\log\\dfrac{I}{I_0}$ (dB).',
    'Đại lượng tăng gấp $10$ lần thì pH giảm $1$, độ Richter tăng $1$, mức cường độ âm tăng $10$ dB.',
  ],
};
