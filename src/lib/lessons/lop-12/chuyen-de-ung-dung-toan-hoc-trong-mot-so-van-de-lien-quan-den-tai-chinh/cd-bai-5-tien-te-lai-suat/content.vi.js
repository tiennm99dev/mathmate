/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tiền tệ và lãi suất: tính lãi đơn, lãi kép theo kì hạn ghép lãi, sức mua của đồng tiền khi có lạm phát, lãi suất danh nghĩa và lãi suất thực.',
  intro:
    'Bác An có $500$ triệu đồng muốn gửi ngân hàng trong $9$ tháng. Phương án 1: lãi đơn với lãi suất năm $6{,}1\\%$. Phương án 2: lãi kép kì hạn $1$ tháng với lãi suất năm $6\\%$. Lãi suất của phương án 1 cao hơn, nhưng phương án nào thật sự có lợi hơn? Bài học này cho ta công thức để trả lời bằng con số.',
  objectives: [
    'Nêu được khái niệm tiền tệ và vai trò của lãi suất như "giá cả" của tiền tệ.',
    'Tính được tiền lãi và số tiền nhận được theo thể thức lãi đơn $A = P(1 + rt)$.',
    'Tính được số tiền nhận được theo thể thức lãi kép với $n$ kì tính lãi mỗi năm $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$.',
    'Tính được sức mua của đồng tiền khi có lạm phát và lãi suất thực từ lãi suất danh nghĩa.',
  ],
  sections: [
    {
      heading: '1. Khái niệm tiền tệ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tiền tệ',
          text: 'Tiền tệ là phương tiện thanh toán chính thức theo pháp luật, được dùng để trao đổi hàng hoá, dịch vụ trong một khu vực, một quốc gia hay một nền kinh tế. Vì vậy tiền tệ còn được gọi là "tiền lưu thông". Để phân biệt tiền của các quốc gia, người ta dùng cụm từ "đơn vị tiền tệ".',
        },
        {
          type: 'p',
          text: 'Đơn vị tiền tệ của Việt Nam là đồng (kí hiệu "đ", mã quốc tế VND). Các tờ tiền thường gặp có mệnh giá $1\\,000$; $2\\,000$; $5\\,000$; $10\\,000$; $20\\,000$; $50\\,000$; $100\\,000$; $200\\,000$ và $500\\,000$ đồng.',
        },
        {
          type: 'p',
          text: 'Người cần tiền có thể vay của người đang có tiền nhàn rỗi, và phải trả thêm một khoản cho cơ hội được dùng số tiền đó trong một thời gian. Khoản trả thêm ấy là tiền lãi; tỉ số giữa tiền lãi một năm và số tiền vay là lãi suất năm. Có thể nói giá cả của tiền tệ chính là lãi suất.',
        },
      ],
    },
    {
      heading: '2. Lãi đơn',
      blocks: [
        {
          type: 'p',
          text: 'Trong thể thức lãi đơn, tiền lãi chỉ được tính trên số tiền vốn ban đầu. Gửi vốn $P$ với lãi suất năm $r$ (viết dưới dạng số thập phân, chẳng hạn $8\\% = 0{,}08$) thì mỗi năm được lãi $Pr$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức lãi đơn',
          text: 'Sau $t$ năm, tiền lãi là $I = Prt$ và số tiền nhận được (cả vốn lẫn lãi) là $$A = P + I = P(1 + rt).$$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Thời gian $t$ luôn đổi ra năm: $6$ tháng là $t = \\dfrac{6}{12} = 0{,}5$ năm; $50$ ngày là $t = \\dfrac{50}{365}$ năm (một năm tài chính lấy $365$ ngày).',
        },
      ],
    },
    {
      heading: '3. Lãi kép',
      blocks: [
        {
          type: 'p',
          text: 'Trong thể thức lãi kép, cuối mỗi kì tiền lãi được nhập vào vốn để tính lãi cho kì sau ("lãi mẹ đẻ lãi con"). Nếu lãi suất năm là $r$ và mỗi năm tính lãi $n$ kì thì lãi suất mỗi kì là $\\dfrac{r}{n}$. Sau mỗi kì, số tiền được nhân với $1 + \\dfrac{r}{n}$:',
        },
        {
          type: 'tex',
          tex: 'A_1 = P\\left(1 + \\frac{r}{n}\\right),\\quad A_2 = A_1\\left(1 + \\frac{r}{n}\\right) = P\\left(1 + \\frac{r}{n}\\right)^2,\\ \\ldots,\\ A_N = P\\left(1 + \\frac{r}{n}\\right)^N.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức lãi kép',
          text: 'Gửi vốn $P$ theo thể thức lãi kép, lãi suất năm $r$, tính lãi $n$ kì mỗi năm thì sau $t$ năm (tức $N = nt$ kì) số tiền nhận được là $$A = P\\left(1 + \\frac{r}{n}\\right)^{nt}.$$',
        },
        {
          type: 'table',
          head: ['Tính lãi', 'Hằng năm', 'Nửa năm', 'Hằng quý', 'Hằng tháng', 'Hằng ngày'],
          rows: [['$n$', '$1$', '$2$', '$4$', '$12$', '$365$']],
          caption: 'Số kì tính lãi trong một năm',
        },
        {
          type: 'table',
          head: ['Thể thức', 'Số tiền sau $3$ năm (triệu đồng)'],
          rows: [
            ['Lãi đơn', '$100(1 + 0{,}09 \\cdot 3) = 127$'],
            ['Lãi kép hằng năm', '$100 \\cdot 1{,}09^3 \\approx 129{,}503$'],
            [
              'Lãi kép hằng quý',
              '$100\\left(1 + \\frac{0{,}09}{4}\\right)^{12} \\approx 130{,}605$',
            ],
            [
              'Lãi kép hằng tháng',
              '$100\\left(1 + \\frac{0{,}09}{12}\\right)^{36} \\approx 130{,}865$',
            ],
            [
              'Lãi kép hằng ngày',
              '$100\\left(1 + \\frac{0{,}09}{365}\\right)^{1095} \\approx 130{,}992$',
            ],
          ],
          caption: 'Gửi $100$ triệu đồng, lãi suất năm $9\\%$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Với cùng lãi suất năm, tính lãi càng nhiều kì thì số tiền nhận được càng lớn, nhưng mức tăng ngày càng nhỏ. Để so sánh hai phương án gửi tiền hay vay tiền, hãy tính số tiền cuối cùng (hoặc tiền lãi) của từng phương án, đừng chỉ nhìn con số lãi suất.',
        },
      ],
    },
    {
      heading: '4. Lạm phát. Lãi suất danh nghĩa và lãi suất thực',
      blocks: [
        {
          type: 'p',
          text: 'Lạm phát là sự tăng mức giá chung của hàng hoá, dịch vụ theo thời gian, làm cùng một số tiền mua được ít hàng hơn: sức mua của đồng tiền giảm. Tỉ lệ lạm phát $g$ thường tính theo năm, và được đo qua chỉ số giá tiêu dùng (CPI).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sức mua',
          text: 'Với tỉ lệ lạm phát trung bình $g$ mỗi năm, sức mua của số tiền $P$ sau $n$ năm được tính là $$A = P(1 - g)^n.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Công thức trên coi mỗi năm sức mua giảm đi một tỉ lệ $g$. Một cách tính khác là $A = \\dfrac{P}{(1 + g)^n}$; khi $g$ nhỏ hai kết quả gần bằng nhau. Trong bài ta dùng công thức $A = P(1 - g)^n$.',
        },
        {
          type: 'p',
          text: 'Lãi suất ghi trên sổ tiết kiệm hay hợp đồng vay là lãi suất danh nghĩa $r$. Phần thực sự làm tăng sức mua của người gửi tiền được đo bởi lãi suất thực, là lãi suất đã tính đến lạm phát.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lãi suất thực',
          text: 'Với lãi suất danh nghĩa $r$ và tỉ lệ lạm phát $g$ (cùng tính theo năm), lãi suất thực là $$r_{\\text{thực}} = \\frac{r - g}{1 + g}.$$ Thu nhập thực của khoản gửi $P$ sau một năm là $P \\cdot r_{\\text{thực}}$.',
        },
        {
          type: 'p',
          text: 'Khi $g$ nhỏ, $r_{\\text{thực}} \\approx r - g$. Nếu lạm phát cao hơn lãi suất ($g > r$) thì $r_{\\text{thực}} < 0$: tiền lãi nhận được không bù nổi phần sức mua bị mất.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát lãi suất tiết kiệm và lạm phát',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chọn được cách gửi tiết kiệm có lợi nhất cho một khoản tiền cụ thể và đánh giá khoản gửi đó có giữ được sức mua hay không.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: biểu lãi suất tiết kiệm (công bố trên trang web chính thức) của ba ngân hàng, tỉ lệ lạm phát (CPI) năm gần nhất do Tổng cục Thống kê công bố, máy tính cầm tay hoặc bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập bảng lãi suất năm của các kì hạn $1$, $3$, $6$, $12$ tháng ở ba ngân hàng.',
            'Với khoản gửi $100$ triệu đồng trong $1$ năm, tính số tiền nhận được khi gửi kì hạn $12$ tháng và khi gửi kì hạn $1$ tháng rồi tái tục (lãi kép hằng tháng).',
            'Tính lãi suất thực của phương án tốt nhất với tỉ lệ lạm phát đã tra cứu, rồi tính thu nhập thực.',
            'Thảo luận: ngoài số tiền, còn yếu tố nào ảnh hưởng đến lựa chọn (rút trước hạn, độ an toàn, sự tiện lợi)?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu có ghi nguồn và ngày tra cứu, các phép tính, phương án được chọn và lí do.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính lãi suất',
    instruction:
      'Chọn số tiền vốn, lãi suất năm, thời gian gửi và kì tính lãi kép. Quan sát hai đường lãi đơn và lãi kép tách xa nhau dần, rồi tăng tỉ lệ lạm phát để xem lãi suất thực và sức mua thay đổi thế nào.',
  },
  examples: [
    {
      problem:
        'Giải bài toán mở đầu: bác An gửi $500$ triệu đồng trong $9$ tháng. Phương án 1: lãi đơn, lãi suất năm $6{,}1\\%$. Phương án 2: lãi kép kì hạn $1$ tháng, lãi suất năm $6\\%$. Phương án nào có lợi hơn?',
      steps: [
        '$P = 500$ triệu đồng, $t = \\dfrac{9}{12} = 0{,}75$ năm.',
        'Phương án 1: $A_1 = 500(1 + 0{,}061 \\cdot 0{,}75) = 522{,}875$ (triệu đồng).',
        'Phương án 2: $n = 12$, $nt = 9$ kì, $A_2 = 500\\left(1 + \\dfrac{0{,}06}{12}\\right)^{9} = 500 \\cdot 1{,}005^9 \\approx 522{,}955$ (triệu đồng).',
        '$A_2 > A_1$, chênh lệch khoảng $80$ nghìn đồng.',
      ],
      answer: 'Phương án 2 (lãi kép kì hạn $1$ tháng, $6\\%$) có lợi hơn dù lãi suất năm thấp hơn.',
    },
    {
      problem:
        'Gửi $200$ triệu đồng với lãi suất năm $9\\%$ trong $5$ năm. Tính số tiền nhận được và tiền lãi khi tính lãi kép hằng năm và khi tính lãi kép hằng quý.',
      steps: [
        'Hằng năm ($n = 1$): $A = 200 \\cdot 1{,}09^5 \\approx 307{,}725$ (triệu đồng), tiền lãi $\\approx 107{,}725$ triệu đồng.',
        'Hằng quý ($n = 4$, $nt = 20$ kì): $A = 200\\left(1 + \\dfrac{0{,}09}{4}\\right)^{20} = 200 \\cdot 1{,}0225^{20} \\approx 312{,}102$ (triệu đồng).',
        'Tiền lãi khi tính hằng quý: $312{,}102 - 200 = 112{,}102$ (triệu đồng).',
      ],
      answer:
        'Hằng năm: khoảng $307{,}725$ triệu đồng (lãi $107{,}725$ triệu). Hằng quý: khoảng $312{,}102$ triệu đồng (lãi $112{,}102$ triệu).',
    },
    {
      problem:
        'Anh Nam gửi tiết kiệm $500$ triệu đồng kì hạn $12$ tháng với lãi suất năm $9\\%$. Tỉ lệ lạm phát năm đó là $4\\%$. Tính lãi suất thực và thu nhập thực của anh Nam sau một năm.',
      steps: [
        '$r = 0{,}09$, $g = 0{,}04$.',
        '$r_{\\text{thực}} = \\dfrac{0{,}09 - 0{,}04}{1 + 0{,}04} = \\dfrac{0{,}05}{1{,}04} \\approx 0{,}0481 = 4{,}81\\%$.',
        'Thu nhập thực: $500 \\cdot \\dfrac{0{,}05}{1{,}04} \\approx 24{,}038$ (triệu đồng), trong khi tiền lãi danh nghĩa là $500 \\cdot 0{,}09 = 45$ triệu đồng.',
      ],
      answer: 'Lãi suất thực khoảng $4{,}81\\%$; thu nhập thực khoảng $24{,}038$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Gửi $900$ triệu đồng theo thể thức lãi đơn, sau $6$ tháng nhận được $54$ triệu đồng tiền lãi. Lãi suất năm là bao nhiêu phần trăm?',
      answer: 12,
      unit: '%',
      hints: ['Dùng $I = Prt$ với $t = 0{,}5$ năm.', 'Giải $54 = 900 \\cdot r \\cdot 0{,}5$.'],
      solution: '$54 = 900 \\cdot r \\cdot 0{,}5 = 450r$, nên $r = 0{,}12 = 12\\%$ một năm.',
    },
    {
      type: 'number',
      prompt:
        'Cần gửi bao nhiêu ngày để $100$ triệu đồng tích luỹ thành $105$ triệu đồng theo thể thức lãi đơn với lãi suất năm $11\\%$? Lấy một năm là $365$ ngày, làm tròn đến hàng đơn vị.',
      answer: 166,
      tolerance: 0.5,
      unit: 'ngày',
      hints: [
        'Giải $105 = 100(1 + 0{,}11t)$ để tìm $t$ (năm).',
        'Đổi $t$ ra ngày bằng cách nhân với $365$.',
      ],
      solution:
        '$1 + 0{,}11t = 1{,}05 \\Rightarrow t = \\dfrac{0{,}05}{0{,}11} = \\dfrac{5}{11}$ năm $= \\dfrac{5}{11} \\cdot 365 \\approx 165{,}9$ ngày, tức khoảng $166$ ngày.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng, lãi suất năm $9\\%$, tính lãi kép hằng ngày (một năm $365$ ngày). Sau $3$ năm nhận được bao nhiêu triệu đồng? Làm tròn đến hàng phần trăm.',
      answer: 130.99,
      tolerance: 0.006,
      unit: 'triệu đồng',
      hints: [
        '$n = 365$, $nt = 1\\,095$ kì.',
        '$A = 100\\left(1 + \\dfrac{0{,}09}{365}\\right)^{1095}$.',
      ],
      solution:
        '$A = 100\\left(1 + \\dfrac{0{,}09}{365}\\right)^{1095} \\approx 130{,}992 \\approx 130{,}99$ (triệu đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Cùng gửi một số tiền với lãi suất năm $8\\%$ trong $2$ năm. Thể thức nào cho số tiền nhận được lớn nhất?',
      options: ['Lãi kép hằng tháng', 'Lãi kép hằng quý', 'Lãi kép hằng năm', 'Lãi đơn'],
      answer: 0,
      hints: [
        'So sánh $\\left(1 + \\dfrac{0{,}08}{n}\\right)^{2n}$ với $n = 1, 4, 12$ và $1 + 0{,}08 \\cdot 2$.',
      ],
      solution:
        'Lãi đơn: $1{,}16$; hằng năm: $1{,}08^2 = 1{,}1664$; hằng quý: $1{,}02^8 \\approx 1{,}1717$; hằng tháng: $\\left(1 + \\frac{0{,}08}{12}\\right)^{24} \\approx 1{,}1729$. Tính lãi kép càng nhiều kì, số tiền càng lớn, nên lãi kép hằng tháng cho nhiều nhất.',
    },
    {
      type: 'number',
      prompt:
        'Tỉ lệ lạm phát là $3{,}5\\%$ một năm. Sau $1$ năm nữa, sức mua của $10$ triệu đồng hiện tại là bao nhiêu triệu đồng?',
      answer: 9.65,
      unit: 'triệu đồng',
      hints: ['Dùng $A = P(1 - g)^n$ với $n = 1$.'],
      solution: '$A = 10(1 - 0{,}035) = 9{,}65$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Tỉ lệ lạm phát trung bình là $4\\%$ một năm. Dùng công thức $A = P(1 - g)^n$, sau khoảng bao nhiêu năm (làm tròn đến hàng đơn vị) thì sức mua của đồng tiền chỉ còn một nửa?',
      answer: 17,
      tolerance: 0.5,
      unit: 'năm',
      hints: ['Giải $0{,}96^n = 0{,}5$.', 'Lấy lôgarit: $n = \\log_{0{,}96} 0{,}5$.'],
      solution:
        '$\\dfrac{P}{2} = P \\cdot 0{,}96^n \\Leftrightarrow 0{,}96^n = 0{,}5 \\Leftrightarrow n = \\log_{0{,}96} 0{,}5 \\approx 16{,}98$. Sau khoảng $17$ năm sức mua còn một nửa.',
    },
    {
      type: 'number',
      prompt:
        'Một người gửi tiết kiệm $600$ triệu đồng kì hạn $12$ tháng với lãi suất năm $8\\%$, tỉ lệ lạm phát năm đó là $3{,}5\\%$. Thu nhập thực sau $1$ năm là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 26.087,
      tolerance: 0.002,
      unit: 'triệu đồng',
      hints: [
        'Tính $r_{\\text{thực}} = \\dfrac{r - g}{1 + g}$.',
        'Thu nhập thực bằng $P \\cdot r_{\\text{thực}}$.',
      ],
      solution:
        '$r_{\\text{thực}} = \\dfrac{0{,}08 - 0{,}035}{1{,}035} = \\dfrac{1}{23} \\approx 0{,}0435$. Thu nhập thực: $600 \\cdot \\dfrac{1}{23} \\approx 26{,}087$ (triệu đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Lãi suất tiết kiệm là $5\\%$ một năm, tỉ lệ lạm phát là $6\\%$ một năm. Nhận xét nào đúng?',
      options: [
        'Lãi suất thực âm, khoảng $-0{,}94\\%$: tiền gửi mất dần sức mua.',
        'Lãi suất thực là $11\\%$.',
        'Lãi suất thực bằng $5\\%$ vì lạm phát không ảnh hưởng đến tiền gửi.',
        'Lãi suất thực là $1\\%$.',
      ],
      answer: 0,
      hints: ['Thay $r = 0{,}05$, $g = 0{,}06$ vào $r_{\\text{thực}} = \\dfrac{r - g}{1 + g}$.'],
      solution:
        '$r_{\\text{thực}} = \\dfrac{0{,}05 - 0{,}06}{1{,}06} \\approx -0{,}0094 = -0{,}94\\%$. Lạm phát cao hơn lãi suất nên lãi suất thực âm.',
    },
    {
      type: 'number',
      prompt:
        'Chỉ số CPI tháng 1 năm 2020 là $118{,}09$. Nếu tỉ lệ lạm phát trung bình là $3{,}21\\%$ mỗi năm, thì CPI tháng 1 năm 2030 là bao nhiêu? Làm tròn đến hàng phần trăm.',
      answer: 161.97,
      tolerance: 0.006,
      hints: ['CPI tăng theo công thức $\\text{CPI} = \\text{CPI}_0(1 + g)^n$.', 'Ở đây $n = 10$.'],
      solution: '$\\text{CPI} = 118{,}09 \\cdot 1{,}0321^{10} \\approx 161{,}97$.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi cách tính lãi kép với số kì tính lãi $n$ trong một năm.',
      left: ['Hằng năm', 'Hằng quý', 'Hằng tháng', 'Hằng ngày'],
      right: ['$n = 1$', '$n = 4$', '$n = 12$', '$n = 365$', '$n = 2$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Một năm có $4$ quý, $12$ tháng, $365$ ngày (năm tài chính).'],
      solution: 'Hằng năm: $n = 1$; hằng quý: $n = 4$; hằng tháng: $n = 12$; hằng ngày: $n = 365$.',
    },
  ],
  takeaways: [
    'Lãi đơn: $I = Prt$, $A = P(1 + rt)$, chỉ tính lãi trên vốn ban đầu.',
    'Lãi kép với $n$ kì mỗi năm: $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$; tính lãi càng nhiều kì, số tiền càng lớn.',
    'Lạm phát làm giảm sức mua: $A = P(1 - g)^n$.',
    'Lãi suất thực $r_{\\text{thực}} = \\dfrac{r - g}{1 + g}$; nó âm khi lạm phát cao hơn lãi suất danh nghĩa.',
  ],
};
