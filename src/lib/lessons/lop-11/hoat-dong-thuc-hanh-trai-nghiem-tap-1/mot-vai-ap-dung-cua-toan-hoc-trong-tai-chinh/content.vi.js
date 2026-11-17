/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: lãi kép là một cấp số nhân, dùng tổng n số hạng đầu của cấp số nhân để tính tiền gửi tiết kiệm tích luỹ và số tiền trả góp hằng tháng khi vay ngân hàng, so sánh với cách trả gốc đều và lãi trên dư nợ giảm dần.',
  intro:
    'Gia đình bạn Minh định vay ngân hàng $600$ triệu đồng để mua nhà và trả góp trong $5$ năm. Mỗi tháng phải trả bao nhiêu tiền, và sau $5$ năm tổng tiền lãi là bao nhiêu? Bài này dùng cấp số nhân và cấp số cộng đã học để trả lời những câu hỏi tài chính như vậy.',
  objectives: [
    'Nhận ra dãy số tiền gửi theo thể thức lãi kép là một cấp số nhân với công bội $1 + r$.',
    'Dùng tổng $n$ số hạng đầu của cấp số nhân để tính số tiền gửi tiết kiệm tích luỹ hằng tháng.',
    'Lập công thức dư nợ và số tiền trả góp đều hằng tháng của một khoản vay.',
    'Tính tiền lãi khi trả gốc đều và lãi trên dư nợ giảm dần, so sánh hai cách trả nợ.',
  ],
  sections: [
    {
      heading: 'Lãi kép và cấp số nhân',
      blocks: [
        {
          type: 'p',
          text: 'Gửi số tiền $P$ với lãi suất $r$ mỗi kì hạn theo thể thức lãi kép: hết mỗi kì, tiền lãi được nhập vào gốc. Gọi $A_n$ là số tiền cả gốc lẫn lãi sau $n$ kì. Khi đó $A_1 = P(1 + r)$ và $A_{n} = A_{n-1}(1 + r)$ với mọi $n \\ge 2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức lãi kép',
          text: 'Dãy $(A_n)$ là một cấp số nhân với số hạng đầu $A_1 = P(1 + r)$ và công bội $q = 1 + r$. Do đó $$A_n = P(1 + r)^n.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lãi suất mỗi kì',
          text: 'Ngân hàng công bố lãi suất theo năm. Với kì hạn $1$ tháng, lãi suất mỗi kì bằng lãi suất năm chia cho $12$: lãi suất $9\\%$/năm ứng với $r = 0{,}75\\% = 0{,}0075$ mỗi tháng.',
        },
      ],
    },
    {
      heading: 'Gửi tiết kiệm tích luỹ hằng tháng',
      blocks: [
        {
          type: 'p',
          text: 'Đầu mỗi tháng, một người gửi vào ngân hàng cùng một số tiền $a$, lãi suất $r$ mỗi tháng, tiền lãi được nhập vào gốc cuối mỗi tháng. Đến cuối tháng thứ $n$, khoản gửi đầu tiên đã sinh lãi $n$ tháng, khoản thứ hai $n - 1$ tháng, …, khoản cuối cùng $1$ tháng.',
        },
        {
          type: 'tex',
          tex: 'T_n = a(1 + r) + a(1 + r)^2 + \\cdots + a(1 + r)^n',
        },
        {
          type: 'p',
          text: 'Đây là tổng $n$ số hạng đầu của cấp số nhân có $u_1 = a(1 + r)$ và công bội $q = 1 + r$. Áp dụng $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiền gửi tích luỹ',
          text: 'Gửi $a$ đồng vào đầu mỗi tháng, lãi suất $r$ mỗi tháng, thì cuối tháng thứ $n$ có $$T_n = \\dfrac{a(1 + r)\\left[(1 + r)^n - 1\\right]}{r}.$$',
        },
      ],
    },
    {
      heading: 'Vay trả góp',
      blocks: [
        {
          type: 'p',
          text: 'Vay ngân hàng $A$ đồng, lãi suất $r$ mỗi tháng. Cuối mỗi tháng, kể từ tháng đầu tiên, trả ngân hàng cùng một số tiền $x$. Gọi $D_k$ là dư nợ (số tiền còn nợ) sau khi trả lần thứ $k$.',
        },
        {
          type: 'table',
          head: ['Sau tháng', 'Dư nợ'],
          rows: [
            ['$1$', '$D_1 = A(1 + r) - x$'],
            ['$2$', '$D_2 = D_1(1 + r) - x = A(1 + r)^2 - x\\left[(1 + r) + 1\\right]$'],
            ['$k$', '$D_k = A(1 + r)^k - x\\left[(1 + r)^{k-1} + \\cdots + (1 + r) + 1\\right]$'],
          ],
          caption: 'Mỗi tháng, dư nợ được nhân với $1 + r$ (cộng tiền lãi) rồi trừ đi $x$.',
        },
        {
          type: 'p',
          text: 'Tổng trong ngoặc là tổng $k$ số hạng đầu của cấp số nhân có $u_1 = 1$, $q = 1 + r$, bằng $\\dfrac{(1 + r)^k - 1}{r}$. Vậy $D_k = A(1 + r)^k - x \\cdot \\dfrac{(1 + r)^k - 1}{r}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số tiền trả góp đều hằng tháng',
          text: 'Để trả hết nợ sau đúng $N$ tháng thì $D_N = 0$, tức là $$x = \\dfrac{A\\,r\\,(1 + r)^N}{(1 + r)^N - 1}.$$',
        },
        {
          type: 'p',
          text: 'Nhiều ngân hàng còn cho vay theo cách trả gốc đều, lãi tính trên dư nợ giảm dần: mỗi tháng trả $\\dfrac{A}{N}$ tiền gốc cộng với tiền lãi của số tiền còn nợ đầu tháng đó. Dư nợ đầu các tháng là $A$, $A - \\dfrac{A}{N}$, $A - \\dfrac{2A}{N}$, …, nên tiền lãi các tháng $rA$, $rA\\dfrac{N - 1}{N}$, …, $rA\\dfrac{1}{N}$ lập thành một cấp số cộng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tổng tiền lãi khi trả gốc đều',
          text: 'Tổng $N$ số hạng của cấp số cộng trên là $$\\dfrac{N}{2}\\left(rA + \\dfrac{rA}{N}\\right) = \\dfrac{rA(N + 1)}{2}.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh hai cách trả',
          text: 'Với cùng khoản vay, lãi suất và thời hạn, trả gốc đều có tổng tiền lãi ít hơn vì tiền gốc được trả nhanh hơn ở những tháng đầu; đổi lại, số tiền phải trả các tháng đầu cao hơn. Trả đều hằng tháng giữ số tiền mỗi tháng không đổi, dễ lập kế hoạch chi tiêu.',
        },
      ],
    },
    {
      heading: 'Dự án: Lập kế hoạch tài chính cho gia đình',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng các công thức trên để tư vấn cho một gia đình muốn tiết kiệm hoặc vay tiền mua nhà, mua xe. Lớp chia thành các nhóm $4$ đến $6$ học sinh, mỗi nhóm chọn một tình huống rồi trình bày trước lớp.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: lãi suất tiết kiệm và lãi suất cho vay của ít nhất hai ngân hàng (xem trên trang web của ngân hàng hoặc hỏi người thân), máy tính cầm tay hoặc phần mềm bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tình huống 1. Một gia đình mỗi tháng để dành được $10$ triệu đồng và gửi vào đầu mỗi tháng. Với lãi suất đã thu thập, sau $3$ năm gia đình có bao nhiêu tiền? Cần gửi mỗi tháng bao nhiêu để sau $3$ năm có $400$ triệu đồng?',
            'Tình huống 2. Gia đình vay $600$ triệu đồng mua nhà, trả góp trong $5$ năm hoặc $10$ năm. Với mỗi thời hạn, tính số tiền trả mỗi tháng và tổng tiền lãi theo cách trả đều hằng tháng.',
            'Tình huống 3. Cũng khoản vay đó, tính số tiền phải trả tháng đầu, tháng cuối và tổng tiền lãi theo cách trả gốc đều, lãi trên dư nợ giảm dần.',
            'Lập bảng tính dư nợ từng tháng (hoặc dùng khung tương tác) và vẽ biểu đồ dư nợ giảm dần cho từng cách trả.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng lãi suất (ghi rõ ngân hàng, nguồn và ngày lấy số liệu), các công thức đã dùng và phép tính, biểu đồ dư nợ, phương án đề xuất cho gia đình và lí do (so sánh số tiền mỗi tháng với thu nhập, tổng tiền lãi phải trả).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng tính khoản vay trả góp',
    instruction:
      'Chọn số tiền vay, lãi suất năm, thời hạn và cách trả nợ. Mỗi cột là dư nợ sau một tháng. Kéo thanh "Xem tháng thứ" để xem tiền lãi, tiền gốc, số tiền phải trả và dư nợ của tháng đó, rồi so sánh tổng tiền lãi của hai cách trả.',
  },
  examples: [
    {
      problem:
        'Bác An gửi $100$ triệu đồng, kì hạn $1$ năm, lãi suất $6\\%$/năm theo thể thức lãi kép. Tính số tiền bác có sau $5$ năm.',
      steps: [
        'Số tiền sau mỗi năm lập thành cấp số nhân với công bội $q = 1 + 0{,}06 = 1{,}06$.',
        '$A_5 = 100 \\cdot 1{,}06^5 \\approx 100 \\cdot 1{,}338226 = 133{,}8226$ (triệu đồng).',
      ],
      answer: 'Sau $5$ năm bác An có khoảng $133{,}823$ triệu đồng.',
    },
    {
      problem:
        'Chị Lan gửi vào đầu mỗi tháng $2$ triệu đồng, lãi suất $0{,}5\\%$ mỗi tháng, tiền lãi nhập vào gốc cuối mỗi tháng. Hỏi cuối tháng thứ $12$ chị có bao nhiêu tiền?',
      steps: [
        '$a = 2$, $r = 0{,}005$, $n = 12$.',
        '$T_{12} = \\dfrac{2 \\cdot 1{,}005 \\cdot (1{,}005^{12} - 1)}{0{,}005}$.',
        '$1{,}005^{12} \\approx 1{,}0616778$, nên $T_{12} \\approx \\dfrac{2{,}01 \\cdot 0{,}0616778}{0{,}005} \\approx 24{,}794$ (triệu đồng).',
        'Chị đã gửi tổng cộng $24$ triệu đồng, tiền lãi khoảng $0{,}794$ triệu đồng.',
      ],
      answer: 'Khoảng $24{,}794$ triệu đồng.',
    },
    {
      problem:
        'Một gia đình vay $1$ tỉ đồng, lãi suất $9\\%$/năm, trả góp đều hằng tháng trong $10$ năm, lần trả đầu tiên vào cuối tháng thứ nhất. Mỗi tháng phải trả bao nhiêu và tổng tiền lãi là bao nhiêu?',
      steps: [
        '$A = 1\\,000$ triệu đồng, $r = 9\\% : 12 = 0{,}0075$, $N = 10 \\cdot 12 = 120$ tháng.',
        '$1{,}0075^{120} \\approx 2{,}451357$.',
        '$x = \\dfrac{1\\,000 \\cdot 0{,}0075 \\cdot 2{,}451357}{2{,}451357 - 1} \\approx 12{,}668$ (triệu đồng).',
        'Tổng số tiền trả: $120 \\cdot x \\approx 1\\,520{,}109$ triệu đồng, nên tổng tiền lãi khoảng $520{,}109$ triệu đồng.',
      ],
      answer: 'Mỗi tháng trả khoảng $12{,}668$ triệu đồng; tổng tiền lãi khoảng $520$ triệu đồng.',
    },
    {
      problem:
        'Vay $120$ triệu đồng trong $12$ tháng, lãi suất $1\\%$ mỗi tháng, trả gốc đều và lãi trên dư nợ giảm dần. Tính số tiền trả tháng đầu, tháng cuối và tổng tiền lãi. So sánh với cách trả đều hằng tháng.',
      steps: [
        'Tiền gốc mỗi tháng: $120 : 12 = 10$ triệu đồng.',
        'Tháng đầu: lãi $0{,}01 \\cdot 120 = 1{,}2$, phải trả $11{,}2$ triệu đồng. Tháng cuối dư nợ đầu tháng còn $10$: lãi $0{,}1$, phải trả $10{,}1$ triệu đồng.',
        'Tiền lãi các tháng $1{,}2;\\ 1{,}1;\\ \\ldots;\\ 0{,}1$ là cấp số cộng $12$ số hạng, tổng $\\dfrac{12(1{,}2 + 0{,}1)}{2} = 7{,}8$ triệu đồng.',
        'Trả đều: $x = \\dfrac{120 \\cdot 0{,}01 \\cdot 1{,}01^{12}}{1{,}01^{12} - 1} \\approx 10{,}662$, tổng lãi $12x - 120 \\approx 7{,}942$ triệu đồng.',
      ],
      answer:
        'Tháng đầu $11{,}2$ triệu, tháng cuối $10{,}1$ triệu, tổng lãi $7{,}8$ triệu đồng, ít hơn cách trả đều khoảng $0{,}142$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Gửi $P$ đồng, lãi suất $r$ mỗi kì theo thể thức lãi kép. Dãy số tiền $A_1, A_2, A_3, \\ldots$ sau mỗi kì là một cấp số nhân với công bội bằng bao nhiêu?',
      options: ['$1 + r$', '$r$', '$P$', '$Pr$'],
      answer: 0,
      hints: ['So sánh $A_{n}$ với $A_{n-1}$: tiền lãi kì đó là $A_{n-1} \\cdot r$.'],
      solution: '$A_n = A_{n-1} + A_{n-1}r = A_{n-1}(1 + r)$, nên công bội là $1 + r$.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $50$ triệu đồng, kì hạn $1$ năm, lãi suất $8\\%$/năm theo thể thức lãi kép. Sau $3$ năm có bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 62.986,
      tolerance: 0.0006,
      unit: 'triệu đồng',
      hints: ['$A_n = P(1 + r)^n$ với $r = 0{,}08$.', 'Tính $50 \\cdot 1{,}08^3$.'],
      solution:
        '$A_3 = 50 \\cdot 1{,}08^3 = 50 \\cdot 1{,}259712 = 62{,}9856 \\approx 62{,}986$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Đầu mỗi tháng gửi $1$ triệu đồng, lãi suất $0{,}5\\%$ mỗi tháng, lãi nhập vào gốc. Cuối tháng thứ $6$ có bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 6.106,
      tolerance: 0.0006,
      unit: 'triệu đồng',
      hints: [
        'Đây là tổng $6$ số hạng của cấp số nhân $u_1 = 1{,}005$, $q = 1{,}005$.',
        '$T_6 = \\dfrac{1 \\cdot 1{,}005 \\cdot (1{,}005^6 - 1)}{0{,}005}$.',
      ],
      solution:
        '$1{,}005^6 \\approx 1{,}030378$, nên $T_6 \\approx \\dfrac{1{,}005 \\cdot 0{,}030378}{0{,}005} \\approx 6{,}106$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Vay $100$ triệu đồng, lãi suất $1\\%$ mỗi tháng. Cuối mỗi tháng trả $10$ triệu đồng. Sau khi trả lần thứ hai, còn nợ bao nhiêu triệu đồng?',
      answer: 81.91,
      tolerance: 0.0005,
      unit: 'triệu đồng',
      hints: [
        'Mỗi tháng: dư nợ nhân với $1{,}01$ rồi trừ $10$.',
        '$D_1 = 100 \\cdot 1{,}01 - 10$, rồi $D_2 = D_1 \\cdot 1{,}01 - 10$.',
      ],
      solution:
        '$D_1 = 101 - 10 = 91$; $D_2 = 91 \\cdot 1{,}01 - 10 = 91{,}91 - 10 = 81{,}91$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Vay $60$ triệu đồng, lãi suất $1\\%$ mỗi tháng, trả góp đều hằng tháng trong $12$ tháng, lần đầu vào cuối tháng thứ nhất. Mỗi tháng phải trả bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 5.331,
      tolerance: 0.0006,
      unit: 'triệu đồng',
      hints: [
        '$x = \\dfrac{A\\,r\\,(1 + r)^N}{(1 + r)^N - 1}$ với $A = 60$, $r = 0{,}01$, $N = 12$.',
        '$1{,}01^{12} \\approx 1{,}126825$.',
      ],
      solution:
        '$x = \\dfrac{60 \\cdot 0{,}01 \\cdot 1{,}126825}{0{,}126825} \\approx \\dfrac{0{,}676095}{0{,}126825} \\approx 5{,}331$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Vay $60$ triệu đồng trong $6$ tháng, lãi suất $1\\%$ mỗi tháng, trả gốc đều và lãi trên dư nợ giảm dần. Tổng tiền lãi phải trả là bao nhiêu triệu đồng?',
      answer: 2.1,
      tolerance: 0.0005,
      unit: 'triệu đồng',
      hints: [
        'Mỗi tháng trả $10$ triệu tiền gốc; dư nợ đầu các tháng là $60, 50, \\ldots, 10$.',
        'Tiền lãi các tháng là cấp số cộng $0{,}6;\\ 0{,}5;\\ \\ldots;\\ 0{,}1$.',
      ],
      solution:
        'Tổng lãi $= 0{,}6 + 0{,}5 + 0{,}4 + 0{,}3 + 0{,}2 + 0{,}1 = \\dfrac{6(0{,}6 + 0{,}1)}{2} = 2{,}1$ triệu đồng. Cũng có thể dùng $\\dfrac{rA(N + 1)}{2} = \\dfrac{0{,}01 \\cdot 60 \\cdot 7}{2} = 2{,}1$.',
    },
    {
      type: 'number',
      prompt:
        'Vay $120$ triệu đồng trong $24$ tháng, lãi suất $0{,}8\\%$ mỗi tháng, trả gốc đều và lãi trên dư nợ giảm dần. Số tiền phải trả ở tháng đầu tiên là bao nhiêu triệu đồng?',
      answer: 5.96,
      tolerance: 0.0005,
      unit: 'triệu đồng',
      hints: [
        'Tiền gốc mỗi tháng là $\\dfrac{120}{24}$.',
        'Tiền lãi tháng đầu tính trên cả $120$ triệu.',
      ],
      solution:
        'Gốc: $120 : 24 = 5$; lãi tháng đầu: $0{,}008 \\cdot 120 = 0{,}96$. Phải trả $5 + 0{,}96 = 5{,}96$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Cùng vay $A$ đồng, cùng lãi suất và cùng thời hạn. Nhận xét nào đúng khi so sánh trả đều hằng tháng với trả gốc đều, lãi trên dư nợ giảm dần?',
      options: [
        'Trả gốc đều có tổng tiền lãi ít hơn nhưng các tháng đầu phải trả nhiều hơn.',
        'Trả đều hằng tháng có tổng tiền lãi ít hơn.',
        'Hai cách có tổng tiền lãi bằng nhau vì cùng lãi suất.',
        'Trả gốc đều có số tiền phải trả mỗi tháng không đổi.',
      ],
      answer: 0,
      hints: [
        'Ở tháng đầu, phần trả gốc của cách nào lớn hơn? Dư nợ giảm nhanh hơn thì tiền lãi những tháng sau thế nào?',
      ],
      solution:
        'Khi trả gốc đều, ngay từ tháng đầu đã trả $\\dfrac{A}{N}$ tiền gốc, nhiều hơn phần gốc của cách trả đều, nên dư nợ giảm nhanh hơn và tổng tiền lãi ít hơn. Đổi lại, tháng đầu phải trả $\\dfrac{A}{N} + rA$, lớn hơn số tiền $x$ của cách trả đều.',
    },
    {
      type: 'match',
      prompt: 'Lãi suất $r$ mỗi tháng. Nối mỗi đại lượng với công thức của nó.',
      left: [
        'Gửi $P$ đồng theo lãi kép, số tiền sau $n$ tháng',
        'Gửi $a$ đồng vào đầu mỗi tháng, số tiền cuối tháng thứ $n$',
        'Vay $A$ đồng, trả $x$ cuối mỗi tháng, dư nợ sau $k$ tháng',
        'Tổng tiền lãi khi vay $A$ đồng, trả gốc đều trong $N$ tháng',
      ],
      right: [
        '$P(1 + r)^n$',
        '$a(1 + r) \\cdot \\dfrac{(1 + r)^n - 1}{r}$',
        '$A(1 + r)^k - x \\cdot \\dfrac{(1 + r)^k - 1}{r}$',
        '$\\dfrac{rA(N + 1)}{2}$',
        '$P(1 + nr)$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Lãi kép là cấp số nhân; tiền lãi khi trả gốc đều là cấp số cộng.',
        '$P(1 + nr)$ là công thức lãi đơn, không dùng ở đây.',
      ],
      solution:
        'Lãi kép: $P(1 + r)^n$. Gửi tích luỹ: $a(1 + r) \\cdot \\dfrac{(1 + r)^n - 1}{r}$. Dư nợ khi trả đều: $A(1 + r)^k - x \\cdot \\dfrac{(1 + r)^k - 1}{r}$. Trả gốc đều: tổng lãi $\\dfrac{rA(N + 1)}{2}$.',
    },
  ],
  takeaways: [
    'Lãi kép: số tiền sau mỗi kì lập thành cấp số nhân công bội $1 + r$, $A_n = P(1 + r)^n$.',
    'Gửi $a$ đồng đầu mỗi tháng: $T_n = \\dfrac{a(1 + r)\\left[(1 + r)^n - 1\\right]}{r}$, nhờ tổng $n$ số hạng đầu của cấp số nhân.',
    'Vay $A$ đồng, trả đều $x$ mỗi tháng trong $N$ tháng: $x = \\dfrac{A\\,r\\,(1 + r)^N}{(1 + r)^N - 1}$.',
    'Trả gốc đều, lãi trên dư nợ giảm dần: tiền lãi các tháng là cấp số cộng, tổng lãi $\\dfrac{rA(N + 1)}{2}$, ít hơn cách trả đều.',
  ],
};
