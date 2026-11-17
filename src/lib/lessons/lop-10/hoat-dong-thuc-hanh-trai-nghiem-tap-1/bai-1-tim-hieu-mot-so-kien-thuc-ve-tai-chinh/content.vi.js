/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: lập ngân sách thu nhập, chi tiêu, tiết kiệm; tính số tiền nhận được khi gửi tiết kiệm theo lãi đơn và lãi kép, so sánh tiết kiệm với đầu tư cổ phiếu; tính thuế thu nhập cá nhân theo biểu thuế luỹ tiến từng phần bằng hàm số bậc nhất trên từng khoảng.',
  intro:
    'Bạn An có $15$ triệu đồng và nhờ bố mẹ gửi tiết kiệm kì hạn $12$ tháng với lãi suất $6\\%$/năm. Hết kì hạn, An định rút tiền mua chiếc máy tính giá $16{,}2$ triệu đồng. Liệu có đủ tiền không? Để trả lời những câu hỏi như vậy, em cần một vài kiến thức tài chính: thu nhập, chi tiêu, tiết kiệm, lãi suất và thuế thu nhập cá nhân.',
  objectives: [
    'Lập ngân sách cá nhân: thu nhập, các khoản chi tiêu và phần tiết kiệm.',
    'Phân biệt lãi đơn và lãi kép; tính số tiền nhận được khi gửi tiết kiệm.',
    'Hiểu sự khác nhau giữa tiết kiệm và đầu tư (lợi nhuận và rủi ro).',
    'Tính thuế thu nhập cá nhân theo biểu thuế luỹ tiến từng phần; viết công thức tính thuế là hàm số bậc nhất trên từng khoảng thu nhập.',
  ],
  sections: [
    {
      heading: 'Thu nhập, chi tiêu và tiết kiệm',
      blocks: [
        {
          type: 'p',
          text: 'Thu nhập là số tiền một người hay một gia đình nhận được trong một khoảng thời gian (thường là một tháng): tiền lương, tiền công, tiền bán hàng, tiền lãi gửi tiết kiệm. Chi tiêu là số tiền dùng cho các nhu cầu: ăn uống, đi lại, học tập, giải trí. Phần thu nhập còn lại sau chi tiêu là tiền tiết kiệm.',
        },
        {
          type: 'tex',
          tex: '\\text{Tiết kiệm} = \\text{Thu nhập} - \\text{Chi tiêu}',
        },
        {
          type: 'p',
          text: 'Lập ngân sách là ghi trước thu nhập và các khoản chi dự kiến của một tháng. Nếu chi tiêu lớn hơn thu nhập, ngân sách bị thâm hụt; khi đó cần bớt các khoản không thiết yếu (giải trí, mua sắm) trước các khoản thiết yếu (ăn uống, học tập, đi lại).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tiền tiết kiệm có thể gửi ngân hàng để hưởng lãi (ít rủi ro) hoặc dùng để đầu tư, chẳng hạn mua cổ phiếu (có thể lãi nhiều nhưng cũng có thể lỗ).',
        },
      ],
    },
    {
      heading: 'Lãi đơn và lãi kép',
      blocks: [
        {
          type: 'p',
          text: 'Gửi số tiền gốc $A$ với lãi suất $r$ mỗi kì (năm, tháng...). Gọi $T$ là số tiền cả gốc lẫn lãi nhận được sau $n$ kì.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lãi đơn',
          text: 'Tiền lãi mỗi kì chỉ tính trên tiền gốc ban đầu. Sau $n$ kì: $T = A(1 + nr)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lãi kép',
          text: 'Tiền lãi của kì trước được cộng vào gốc để tính lãi cho kì sau. Sau $n$ kì: $T = A(1 + r)^n$.',
        },
        {
          type: 'p',
          text: 'Lãi suất ngân hàng thường ghi theo năm. Gửi kì hạn $1$ tháng với lãi suất $6\\%$/năm thì lãi suất mỗi tháng là $6\\% : 12 = 0{,}5\\%$; nếu không rút, cuối mỗi tháng tiền lãi được nhập vào gốc, nên số tiền tăng theo lãi kép với $r = 0{,}5\\%$.',
        },
        {
          type: 'table',
          head: ['Năm gửi', 'Lãi đơn (triệu đồng)', 'Lãi kép (triệu đồng)'],
          rows: [
            ['$1$', '$106$', '$106$'],
            ['$2$', '$112$', '$112{,}36$'],
            ['$5$', '$130$', '$\\approx 133{,}82$'],
            ['$10$', '$160$', '$\\approx 179{,}08$'],
          ],
          caption: 'Gửi $100$ triệu đồng với lãi suất $6\\%$/năm.',
        },
        {
          type: 'p',
          text: 'Năm đầu hai cách cho cùng số tiền; từ năm thứ hai, lãi kép cho nhiều hơn và khoảng chênh lệch tăng dần, vì tiền lãi cũng sinh ra lãi.',
        },
      ],
    },
    {
      heading: 'Tiết kiệm hay đầu tư?',
      blocks: [
        {
          type: 'p',
          text: 'Ngày $10/6/2020$, cô Lan có $511\\,000\\,000$ đồng, đủ mua $5\\,000$ cổ phiếu của công ty A với giá $102\\,200$ đồng/cổ phiếu. Giá cổ phiếu thay đổi theo thời gian, nên số tiền cô thu về phụ thuộc vào ngày bán.',
        },
        {
          type: 'table',
          head: ['Ngày bán', 'Giá (đồng/cổ phiếu)', 'Số tiền thu về (đồng)', 'Lãi, lỗ (đồng)'],
          rows: [
            ['$27/7/2020$', '$86\\,000$', '$430\\,000\\,000$', 'lỗ $81\\,000\\,000$'],
            ['$30/12/2020$', '$108\\,800$', '$544\\,000\\,000$', 'lãi $33\\,000\\,000$'],
            ['$10/5/2021$', '$91\\,000$', '$455\\,000\\,000$', 'lỗ $56\\,000\\,000$'],
          ],
          caption: 'Bán $5\\,000$ cổ phiếu công ty A vào ba thời điểm.',
        },
        {
          type: 'p',
          text: 'Nếu cô Lan gửi tiết kiệm kì hạn $1$ tháng với lãi suất $6\\%$/năm từ $10/6/2020$ đến $10/5/2021$ ($11$ tháng), cô nhận được $511\\,000\\,000 \\cdot (1 + 0{,}5\\%)^{11} \\approx 539\\,818\\,271$ đồng, lãi khoảng $28{,}8$ triệu đồng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đầu tư cổ phiếu có thể đem lại lợi nhuận cao trong thời gian ngắn nhưng rủi ro lớn: bán sai thời điểm có thể lỗ nhiều. Gửi tiết kiệm lợi nhuận thấp hơn nhưng an toàn, giữ được giá trị đồng tiền. Chọn cách nào tuỳ vào mục tiêu và mức rủi ro mỗi người chấp nhận được.',
        },
      ],
    },
    {
      heading: 'Thuế thu nhập cá nhân',
      blocks: [
        {
          type: 'p',
          text: 'Người có thu nhập từ tiền lương, tiền công phải nộp thuế thu nhập cá nhân trên phần thu nhập tính thuế:',
        },
        {
          type: 'tex',
          tex: '\\text{Thu nhập tính thuế} = \\text{Thu nhập} - \\text{Giảm trừ gia cảnh}',
        },
        {
          type: 'p',
          text: 'Theo quy định dùng trong sách giáo khoa, giảm trừ gia cảnh là $11$ triệu đồng/tháng cho bản thân người nộp thuế và $4{,}4$ triệu đồng/tháng cho mỗi người phụ thuộc. Thuế được tính theo biểu thuế luỹ tiến từng phần: mỗi bậc chỉ đánh thuế phần thu nhập nằm trong bậc đó.',
        },
        {
          type: 'table',
          head: ['Bậc', 'Phần thu nhập tính thuế/tháng (triệu đồng)', 'Thuế suất'],
          rows: [
            ['$1$', 'Đến $5$', '$5\\%$'],
            ['$2$', 'Trên $5$ đến $10$', '$10\\%$'],
            ['$3$', 'Trên $10$ đến $18$', '$15\\%$'],
            ['$4$', 'Trên $18$ đến $32$', '$20\\%$'],
            ['$5$', 'Trên $32$ đến $52$', '$25\\%$'],
            ['$6$', 'Trên $52$ đến $80$', '$30\\%$'],
            ['$7$', 'Trên $80$', '$35\\%$'],
          ],
          caption: 'Biểu thuế luỹ tiến từng phần trong sách giáo khoa.',
        },
        {
          type: 'p',
          text: 'Gọi $x$ là thu nhập tính thuế mỗi tháng và $y$ là thuế phải nộp (triệu đồng). Trên mỗi khoảng, $y$ là một hàm số bậc nhất của $x$:',
        },
        {
          type: 'table',
          head: ['Khoảng của $x$', 'Thuế $y$'],
          rows: [
            ['$0 \\le x \\le 5$', '$y = 0{,}05x$'],
            ['$5 < x \\le 10$', '$y = 0{,}1x - 0{,}25$'],
            ['$10 < x \\le 18$', '$y = 0{,}15x - 0{,}75$'],
            ['$18 < x \\le 32$', '$y = 0{,}2x - 1{,}65$'],
            ['$32 < x \\le 52$', '$y = 0{,}25x - 3{,}25$'],
            ['$52 < x \\le 80$', '$y = 0{,}3x - 5{,}85$'],
            ['$x > 80$', '$y = 0{,}35x - 9{,}85$'],
          ],
          caption: 'Công thức tính thuế theo từng khoảng thu nhập tính thuế.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn với $5 < x \\le 10$: phần $5$ triệu đầu chịu thuế $5\\%$ là $0{,}25$ triệu, phần $x - 5$ còn lại chịu thuế $10\\%$, nên $y = 0{,}25 + 0{,}1(x - 5) = 0{,}1x - 0{,}25$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Quy định thay đổi theo thời gian',
          text: 'Mức giảm trừ và biểu thuế do Nhà nước quy định và có thể được sửa đổi. Từ kì tính thuế năm 2026, mức giảm trừ là $15{,}5$ triệu đồng/tháng cho bản thân và $6{,}2$ triệu đồng/tháng cho mỗi người phụ thuộc, và Luật Thuế thu nhập cá nhân sửa đổi rút gọn biểu thuế còn $5$ bậc. Cách tính luỹ tiến từng phần vẫn như trên; khi tính thuế thật, em tra quy định hiện hành. Bài này dùng số liệu của sách giáo khoa.',
        },
      ],
    },
    {
      heading: 'Dự án: Kế hoạch tài chính của gia đình em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh tìm hiểu lãi suất tiết kiệm, cách tính thuế thu nhập cá nhân và lập một kế hoạch thu chi, tiết kiệm cho một gia đình giả định.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính cầm tay hoặc phần mềm bảng tính (Excel), biểu lãi suất tiết kiệm của một vài ngân hàng (tra trên trang web của ngân hàng), biểu thuế thu nhập cá nhân.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Giả định một gia đình: thu nhập mỗi tháng của từng người, số người phụ thuộc, các khoản chi thiết yếu và không thiết yếu.',
            'Tính thuế thu nhập cá nhân mỗi tháng của người có thu nhập, theo biểu thuế luỹ tiến từng phần.',
            'Lập bảng ngân sách một tháng: thu nhập sau thuế, các khoản chi, số tiền tiết kiệm và tỉ lệ tiết kiệm so với thu nhập.',
            'Tra lãi suất tiết kiệm kì hạn $1$ tháng, $6$ tháng, $12$ tháng của hai ngân hàng; tính số tiền nhận được sau $3$ năm nếu gửi số tiền tiết kiệm trong một năm, theo lãi đơn và theo lãi kép.',
            'Vẽ biểu đồ số tiền theo thời gian của hai cách tính lãi bằng phần mềm bảng tính và nêu nhận xét.',
            'Thảo luận: với số tiền đó, nên gửi tiết kiệm hay đầu tư? Nêu lợi nhuận và rủi ro của mỗi cách.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một bài trình chiếu gồm bảng ngân sách, phép tính thuế, bảng và biểu đồ lãi đơn, lãi kép, kết luận của nhóm về cách sử dụng tiền tiết kiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ngân sách, lãi suất và thuế',
    instruction:
      'Phần "Ngân sách": kéo thu nhập và các khoản chi để xem tiền tiết kiệm mỗi tháng. Phần "Lãi đơn, lãi kép": đổi tiền gốc, lãi suất và số năm, so sánh hai đường trên biểu đồ. Phần "Thuế thu nhập": đổi thu nhập và số người phụ thuộc để xem thuế của từng bậc.',
  },
  examples: [
    {
      problem:
        'Tháng 1 năm 2018, bác Việt gửi tiết kiệm $2\\,000\\,000\\,000$ đồng kì hạn $36$ tháng với lãi suất $7\\%$/năm, tiền lãi mỗi năm được nhập vào gốc. Tháng 1 năm 2021 bác rút tiền để mua căn hộ giá $30\\,626\\,075$ đồng/m$^2$. Bác rút được bao nhiêu tiền và mua được căn hộ rộng bao nhiêu mét vuông?',
      steps: [
        'Từ tháng 1/2018 đến tháng 1/2021 là $3$ năm; lãi nhập vào gốc mỗi năm nên dùng lãi kép với $A = 2\\,000\\,000\\,000$, $r = 7\\%$, $n = 3$.',
        '$T = 2\\,000\\,000\\,000 \\cdot (1 + 0{,}07)^3 = 2\\,000\\,000\\,000 \\cdot 1{,}225043 = 2\\,450\\,086\\,000$ (đồng).',
        'Diện tích căn hộ: $2\\,450\\,086\\,000 : 30\\,626\\,075 = 80$ (m$^2$).',
      ],
      answer: 'Bác rút được $2\\,450\\,086\\,000$ đồng và mua được căn hộ $80$ m$^2$.',
    },
    {
      problem:
        'Anh Nam có thu nhập từ tiền lương $28$ triệu đồng/tháng và nuôi một người phụ thuộc. Tính thuế thu nhập cá nhân anh Nam phải nộp trong một năm (theo biểu thuế trong sách giáo khoa).',
      steps: [
        'Thu nhập tính thuế mỗi tháng: $28 - 11 - 4{,}4 = 12{,}6$ (triệu đồng).',
        'Bậc 1: $5 \\cdot 5\\% = 0{,}25$; bậc 2: $(10 - 5) \\cdot 10\\% = 0{,}5$; bậc 3: $(12{,}6 - 10) \\cdot 15\\% = 0{,}39$ (triệu đồng).',
        'Thuế mỗi tháng: $0{,}25 + 0{,}5 + 0{,}39 = 1{,}14$ (triệu đồng). Kiểm tra bằng công thức bậc 3: $0{,}15 \\cdot 12{,}6 - 0{,}75 = 1{,}14$.',
        'Thuế cả năm: $1{,}14 \\cdot 12 = 13{,}68$ (triệu đồng).',
      ],
      answer: 'Anh Nam nộp $13\\,680\\,000$ đồng thuế thu nhập cá nhân mỗi năm.',
    },
    {
      problem:
        'Gửi $100$ triệu đồng với lãi suất $6\\%$/năm trong $5$ năm. Tính số tiền nhận được theo lãi đơn và theo lãi kép.',
      steps: [
        'Lãi đơn: $T = 100 \\cdot (1 + 5 \\cdot 0{,}06) = 100 \\cdot 1{,}3 = 130$ (triệu đồng).',
        'Lãi kép: $T = 100 \\cdot 1{,}06^5 \\approx 100 \\cdot 1{,}338226 \\approx 133{,}82$ (triệu đồng).',
        'Lãi kép cho nhiều hơn khoảng $133{,}82 - 130 = 3{,}82$ (triệu đồng).',
      ],
      answer: 'Lãi đơn: $130$ triệu đồng; lãi kép: khoảng $133{,}82$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Bạn An gửi $15$ triệu đồng kì hạn $12$ tháng với lãi suất $6\\%$/năm. Hết kì hạn An nhận được bao nhiêu triệu đồng?',
      answer: 15.9,
      unit: 'triệu đồng',
      hints: ['Một kì hạn $12$ tháng là một năm: $T = A(1 + r)$.'],
      solution:
        '$T = 15 \\cdot (1 + 0{,}06) = 15{,}9$ (triệu đồng). Số tiền này ít hơn giá máy tính $16{,}2$ triệu đồng, nên An chưa đủ tiền, còn thiếu $0{,}3$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt: 'Tiền lãi được cộng vào gốc để tính lãi cho kì sau. Đó là cách tính',
      options: ['lãi kép', 'lãi đơn', 'thuế luỹ tiến', 'lãi suất cố định'],
      answer: 0,
      hints: ['Ở cách tính nào thì tiền lãi cũng sinh ra lãi?'],
      solution:
        'Lãi kép: lãi của kì trước nhập vào gốc, sau $n$ kì $T = A(1 + r)^n$. Lãi đơn chỉ tính lãi trên tiền gốc ban đầu.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng với lãi suất $6\\%$/năm trong $5$ năm. Số tiền nhận được theo lãi kép nhiều hơn theo lãi đơn bao nhiêu triệu đồng (làm tròn đến hàng phần trăm)?',
      answer: 3.82,
      tolerance: 0.005,
      unit: 'triệu đồng',
      hints: ['Lãi đơn: $100(1 + 5 \\cdot 0{,}06)$; lãi kép: $100 \\cdot 1{,}06^5$.'],
      solution:
        'Lãi đơn: $130$ triệu đồng. Lãi kép: $100 \\cdot 1{,}06^5 \\approx 133{,}8226$ triệu đồng. Chênh lệch $\\approx 3{,}82$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Cô Lan gửi $511$ triệu đồng kì hạn $1$ tháng với lãi suất $6\\%$/năm, tiền lãi mỗi tháng nhập vào gốc. Sau $11$ tháng cô nhận được bao nhiêu triệu đồng (làm tròn đến hàng phần trăm)?',
      answer: 539.82,
      tolerance: 0.005,
      unit: 'triệu đồng',
      hints: ['Lãi suất mỗi tháng là $6\\% : 12$.', 'Dùng lãi kép với $r = 0{,}5\\%$ và $n = 11$.'],
      solution:
        '$r = 6\\% : 12 = 0{,}5\\%$. $T = 511 \\cdot 1{,}005^{11} \\approx 539{,}818 \\approx 539{,}82$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Cô Lan mua $5\\,000$ cổ phiếu với giá $102\\,200$ đồng/cổ phiếu và bán hết với giá $108\\,800$ đồng/cổ phiếu. Cô lãi bao nhiêu triệu đồng?',
      answer: 33,
      unit: 'triệu đồng',
      hints: ['Mỗi cổ phiếu lãi bao nhiêu đồng? Nhân với số cổ phiếu.'],
      solution:
        'Mỗi cổ phiếu lãi $108\\,800 - 102\\,200 = 6\\,600$ đồng. Cả $5\\,000$ cổ phiếu lãi $6\\,600 \\cdot 5\\,000 = 33\\,000\\,000$ đồng, tức $33$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu thuế trong sách giáo khoa, anh Nam có thu nhập $28$ triệu đồng/tháng và một người phụ thuộc. Mỗi tháng anh nộp bao nhiêu triệu đồng thuế thu nhập cá nhân?',
      answer: 1.14,
      unit: 'triệu đồng',
      hints: [
        'Trừ giảm trừ bản thân $11$ triệu và người phụ thuộc $4{,}4$ triệu để được thu nhập tính thuế.',
        'Thu nhập tính thuế $12{,}6$ triệu nằm ở bậc 3: tính thuế của từng phần.',
      ],
      solution:
        '$x = 28 - 11 - 4{,}4 = 12{,}6$. Thuế: $5 \\cdot 0{,}05 + 5 \\cdot 0{,}1 + 2{,}6 \\cdot 0{,}15 = 0{,}25 + 0{,}5 + 0{,}39 = 1{,}14$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Chị Hoa có thu nhập $20$ triệu đồng/tháng, không có người phụ thuộc. Theo biểu thuế trong sách giáo khoa, mỗi tháng chị nộp bao nhiêu triệu đồng thuế thu nhập cá nhân?',
      answer: 0.65,
      unit: 'triệu đồng',
      hints: ['Thu nhập tính thuế là $20 - 11 = 9$ triệu đồng, thuộc bậc 2.'],
      solution:
        '$x = 20 - 11 = 9$. Thuế: $5 \\cdot 5\\% + (9 - 5) \\cdot 10\\% = 0{,}25 + 0{,}4 = 0{,}65$ (triệu đồng). Hoặc $y = 0{,}1 \\cdot 9 - 0{,}25 = 0{,}65$.',
    },
    {
      type: 'choice',
      prompt:
        'Với thu nhập tính thuế $x$ (triệu đồng/tháng) thoả mãn $18 < x \\le 32$, thuế thu nhập cá nhân $y$ mỗi tháng là',
      options: [
        '$y = 0{,}2x - 1{,}65$',
        '$y = 0{,}2x$',
        '$y = 0{,}2x - 3{,}6$',
        '$y = 0{,}2x - 1{,}95$',
      ],
      answer: 0,
      hints: [
        'Thuế của $18$ triệu đầu là $0{,}25 + 0{,}5 + 1{,}2 = 1{,}95$ triệu; phần $x - 18$ chịu thuế $20\\%$.',
      ],
      solution:
        '$y = 1{,}95 + 0{,}2(x - 18) = 0{,}2x - 3{,}6 + 1{,}95 = 0{,}2x - 1{,}65$. Công thức $y = 0{,}2x$ quên rằng các phần thấp hơn chịu thuế suất thấp hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một gia đình có thu nhập $12$ triệu đồng/tháng và chi tiêu hết $9{,}5$ triệu đồng/tháng. Tiền tiết kiệm mỗi tháng chiếm bao nhiêu phần trăm thu nhập (làm tròn đến hàng phần mười)?',
      answer: 20.8,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tiết kiệm = thu nhập − chi tiêu; rồi chia cho thu nhập.'],
      solution:
        'Tiết kiệm: $12 - 9{,}5 = 2{,}5$ (triệu đồng). Tỉ lệ: $\\dfrac{2{,}5}{12} \\cdot 100\\% \\approx 20{,}8\\%$.',
    },
    {
      type: 'multi',
      prompt: 'Những nhận xét nào đúng?',
      options: [
        'Gửi tiết kiệm ít rủi ro hơn đầu tư cổ phiếu.',
        'Đầu tư cổ phiếu luôn có lãi nhiều hơn gửi tiết kiệm.',
        'Với cùng tiền gốc và lãi suất, sau nhiều năm lãi kép cho số tiền lớn hơn lãi đơn.',
        'Thuế luỹ tiến từng phần đánh cùng một thuế suất lên toàn bộ thu nhập tính thuế.',
      ],
      answers: [0, 2],
      hints: ['Nhớ lại ví dụ cô Lan: bán cổ phiếu vào ngày $27/7/2020$ thì sao?'],
      solution:
        'Tiết kiệm an toàn hơn (đúng). Cổ phiếu có thể lỗ, như khi cô Lan bán ngày $27/7/2020$ lỗ $81$ triệu đồng, nên "luôn có lãi nhiều hơn" sai. Lãi kép lớn hơn lãi đơn từ kì thứ hai (đúng). Thuế luỹ tiến từng phần chỉ đánh mỗi thuế suất lên phần thu nhập trong bậc của nó, nên nhận xét cuối sai.',
    },
  ],
  takeaways: [
    'Tiết kiệm = thu nhập − chi tiêu; lập ngân sách giúp tránh thâm hụt.',
    'Lãi đơn: $T = A(1 + nr)$. Lãi kép: $T = A(1 + r)^n$; lãi suất năm $r$ chia $12$ thành lãi suất tháng.',
    'Đầu tư có thể lợi nhuận cao nhưng rủi ro; tiết kiệm an toàn nhưng lợi nhuận thấp hơn.',
    'Thuế thu nhập cá nhân tính trên thu nhập sau giảm trừ gia cảnh, luỹ tiến từng phần: trên mỗi khoảng, thuế là một hàm số bậc nhất của thu nhập tính thuế.',
  ],
};
