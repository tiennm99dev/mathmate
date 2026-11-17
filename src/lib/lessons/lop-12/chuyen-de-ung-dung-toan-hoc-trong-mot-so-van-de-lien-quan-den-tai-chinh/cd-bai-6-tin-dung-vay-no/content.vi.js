/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tín dụng và vay nợ: thẻ tín dụng, cách tính lãi khi không trả hết dư nợ, vay theo lãi đơn và lãi kép, khoản trả góp đều hằng tháng và lịch trả nợ.',
  intro:
    'Anh Hùng muốn mua một chiếc ô tô giá $500$ triệu đồng để chạy dịch vụ. Ngân hàng cho anh vay $500$ triệu đồng, trả góp hằng tháng trong $60$ tháng với lãi suất năm $7{,}4\\%$. Mỗi tháng anh phải trả bao nhiêu, và tổng cộng anh trả ngân hàng bao nhiêu tiền lãi?',
  objectives: [
    'Nêu được khái niệm và chức năng của thẻ tín dụng; tính được tiền lãi, phí khi dùng thẻ không đúng hạn.',
    'Tính được số tiền phải trả của khoản vay theo thể thức lãi đơn và lãi kép, so sánh các khoản vay.',
    'Tính được khoản trả góp đều hằng kì $P = \\dfrac{V \\cdot i}{1 - (1 + i)^{-n}}$, tổng tiền trả và tiền lãi; đọc được lịch trả nợ.',
  ],
  sections: [
    {
      heading: '1. Thẻ tín dụng và phí sử dụng thẻ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thẻ tín dụng',
          text: 'Thẻ tín dụng là thẻ cho phép chủ thẻ thực hiện giao dịch trong phạm vi hạn mức tín dụng đã được cấp theo thoả thuận với tổ chức phát hành thẻ. Nói cách khác, chủ thẻ được "chi tiêu trước, trả tiền sau".',
        },
        {
          type: 'list',
          items: [
            'Theo hạng thẻ: hạng chuẩn, hạng vàng, hạng bạch kim.',
            'Theo chủ thể sử dụng: thẻ tín dụng doanh nghiệp, thẻ tín dụng cá nhân.',
            'Theo phạm vi sử dụng: thẻ nội địa, thẻ quốc tế.',
            'Chức năng: thanh toán chậm, rút tiền mặt, mua sắm trả góp.',
          ],
        },
        {
          type: 'p',
          text: 'Mỗi tháng ngân hàng gửi bảng sao kê ghi tổng dư nợ của kì sao kê và hạn thanh toán (ngày đến hạn). Nếu trả hết dư nợ trước hạn, chủ thẻ không mất tiền lãi. Nếu chỉ trả một phần (ví dụ số tiền thanh toán tối thiểu), ngân hàng tính lãi trên từng khoản dư nợ, kể từ ngày giao dịch, theo lãi suất năm chia cho $365$ ngày:',
        },
        {
          type: 'tex',
          tex: '\\text{Tiền lãi} = \\text{dư nợ} \\cdot \\frac{r}{365} \\cdot \\text{số ngày dư nợ}.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Rút tiền mặt bằng thẻ tín dụng',
          text: 'Khoản rút tiền mặt bị tính phí rút tiền (theo phần trăm số tiền rút) và bị tính lãi ngay từ ngày rút, không có thời gian miễn lãi. Đây là cách vay rất đắt.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Để không mất tiền lãi, hãy trả toàn bộ dư nợ trước ngày đến hạn và hạn chế rút tiền mặt bằng thẻ tín dụng. Mức phí, lãi suất cụ thể khác nhau giữa các ngân hàng; số liệu trong bài chỉ để minh hoạ.',
        },
      ],
    },
    {
      heading: '2. Vay nợ của các tổ chức tín dụng',
      blocks: [
        {
          type: 'p',
          text: 'Khoản vay có thể tính lãi theo thể thức lãi đơn hoặc lãi kép, với các công thức đã học ở Bài 5: vay $P$ đồng, lãi suất năm $r$, thời gian $t$ năm thì số tiền phải trả là',
        },
        {
          type: 'tex',
          tex: 'A = P(1 + rt)\\ \\text{(lãi đơn)}, \\qquad A = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\ \\text{(lãi kép, } n \\text{ kì mỗi năm)}.',
        },
        {
          type: 'p',
          text: 'Khi vay để mua nhà, mua xe, người vay thường trả góp: trả một khoản bằng nhau $P$ vào cuối mỗi kì (thường là mỗi tháng) trong $n$ kì. Mỗi khoản trả gồm tiền lãi tính trên dư nợ còn lại và một phần tiền gốc; cách trả nợ dần như vậy còn gọi là khấu hao khoản vay.',
        },
        {
          type: 'p',
          text: 'Gọi $V$ là số tiền vay, $i$ là lãi suất mỗi kì (vay lãi suất năm $r$, trả hằng tháng thì $i = \\dfrac{r}{12}$). Dư nợ sau kì thứ $k$ là $B_k = B_{k-1}(1 + i) - P$, $B_0 = V$, nên',
        },
        {
          type: 'tex',
          tex: 'B_k = V(1 + i)^k - P\\cdot\\frac{(1 + i)^k - 1}{i}.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Khoản trả góp đều',
          text: 'Khoản vay $V$, lãi suất mỗi kì $i$, trả hết sau $n$ kì (tức $B_n = 0$) thì khoản thanh toán mỗi kì là $$P = \\frac{V \\cdot i}{1 - (1 + i)^{-n}}.$$ Tổng số tiền trả là $nP$, tiền lãi là $nP - V$.',
        },
        {
          type: 'table',
          head: ['Kì', 'Khoản trả', 'Tiền lãi', 'Tiền gốc', 'Còn nợ'],
          rows: [
            ['$1$', '$10{,}201$', '$30 \\cdot 0{,}01 = 0{,}300$', '$9{,}901$', '$20{,}099$'],
            ['$2$', '$10{,}201$', '$0{,}201$', '$10{,}000$', '$10{,}100$'],
            ['$3$', '$10{,}201$', '$0{,}101$', '$10{,}100$', '$0$'],
          ],
          caption:
            'Lịch trả nợ khoản vay $30$ triệu đồng, lãi suất $1\\%$ mỗi tháng, trả trong $3$ tháng (triệu đồng)',
        },
        {
          type: 'p',
          text: 'Trong lịch trả nợ, khoản trả không đổi, nhưng dư nợ giảm dần nên phần lãi giảm dần và phần gốc tăng dần.',
        },
      ],
    },
    {
      heading: 'Dự án: Mua trả góp, nên chọn gói nào?',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: so sánh các gói mua trả góp một món hàng có thật (xe máy, máy tính xách tay, điện thoại) và chọn gói tốn ít tiền nhất.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thông tin của ít nhất ba gói trả góp (ngân hàng, công ty tài chính, cửa hàng): giá, số tiền trả trước, lãi suất, số kì, các loại phí; máy tính cầm tay hoặc bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Với mỗi gói, tính số tiền vay $V$, lãi suất mỗi tháng $i$ và khoản trả hằng tháng $P$.',
            'Tính tổng số tiền phải bỏ ra (trả trước, các khoản trả góp và phí) và phần chênh lệch so với giá mua thẳng.',
            'Lập lịch trả nợ $6$ tháng đầu của gói được chọn trên bảng tính; nhận xét phần lãi và phần gốc.',
            'Với gói "trả góp $0\\%$", kiểm tra các khoản phí đi kèm và quy đổi ra lãi suất năm tương đương.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng so sánh các gói, các phép tính, gói được chọn và lời khuyên cho người mua.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lịch trả nợ trả góp',
    instruction:
      'Chọn số tiền vay, lãi suất năm và số tháng trả. Mỗi cột là một kì trả: phần màu cam là tiền lãi, phần màu chàm là tiền gốc. Chạm vào một cột hoặc dùng phím mũi tên để xem chi tiết kì đó trong lịch trả nợ.',
  },
  examples: [
    {
      problem:
        'Kì sao kê thẻ tín dụng của chị Lan từ $1/6$ đến $30/6$, hạn thanh toán là $15/7$, lãi suất $18{,}25\\%$ một năm (tính theo $365$ ngày). Ngày $11/6$ chị mua hàng $4$ triệu đồng, ngày $21/6$ mua thêm $2$ triệu đồng. Tính tiền lãi đến ngày $15/7$ nếu: a) chị trả đủ $6$ triệu đồng trước ngày $15/7$; b) đến ngày $15/7$ chị chỉ trả số tiền tối thiểu.',
      steps: [
        'a) Trả hết dư nợ trước hạn thì không bị tính lãi: tiền lãi bằng $0$.',
        'b) Lãi suất mỗi ngày: $\\dfrac{18{,}25\\%}{365} = 0{,}05\\%$.',
        'Dư nợ $4$ triệu đồng từ $11/6$ đến $20/6$ ($10$ ngày): $4\\,000\\,000 \\cdot 0{,}0005 \\cdot 10 = 20\\,000$ (đồng).',
        'Dư nợ $6$ triệu đồng từ $21/6$ đến $15/7$ ($10 + 15 = 25$ ngày): $6\\,000\\,000 \\cdot 0{,}0005 \\cdot 25 = 75\\,000$ (đồng).',
      ],
      answer:
        'a) Không mất tiền lãi. b) Tiền lãi là $20\\,000 + 75\\,000 = 95\\,000$ đồng, và phần dư nợ chưa trả vẫn tiếp tục bị tính lãi.',
    },
    {
      problem:
        'Vay $100$ triệu đồng trong $2$ năm với lãi suất năm $12\\%$. Tính số tiền phải trả khi tính lãi đơn, lãi kép hằng năm, hằng quý và hằng tháng.',
      steps: [
        'Lãi đơn: $A = 100(1 + 0{,}12 \\cdot 2) = 124$ (triệu đồng).',
        'Lãi kép hằng năm: $A = 100 \\cdot 1{,}12^2 = 125{,}44$ (triệu đồng).',
        'Hằng quý: $A = 100 \\cdot 1{,}03^8 \\approx 126{,}677$ (triệu đồng).',
        'Hằng tháng: $A = 100 \\cdot 1{,}01^{24} \\approx 126{,}973$ (triệu đồng).',
      ],
      answer:
        'Lần lượt là $124$; $125{,}44$; $\\approx 126{,}677$ và $\\approx 126{,}973$ triệu đồng: người vay trả nhiều nhất khi lãi được ghép hằng tháng.',
    },
    {
      problem:
        'Giải bài toán mở đầu: anh Hùng vay $500$ triệu đồng, trả góp hằng tháng trong $60$ tháng, lãi suất năm $7{,}4\\%$. Tính khoản trả hằng tháng, tổng số tiền trả và tiền lãi.',
      steps: [
        '$V = 500$, $i = \\dfrac{0{,}074}{12} = \\dfrac{37}{6\\,000}$, $n = 60$.',
        '$P = \\dfrac{500 \\cdot \\frac{37}{6000}}{1 - \\left(1 + \\frac{37}{6000}\\right)^{-60}} \\approx 9{,}995$ (triệu đồng).',
        'Tổng số tiền trả: $60P \\approx 599{,}714$ (triệu đồng).',
        'Tiền lãi: $599{,}714 - 500 = 99{,}714$ (triệu đồng).',
      ],
      answer:
        'Mỗi tháng trả khoảng $9{,}995$ triệu đồng (gần $10$ triệu); tổng cộng khoảng $599{,}714$ triệu đồng, trong đó tiền lãi khoảng $99{,}714$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một công ty vay ngân hàng $1$ tỉ đồng trong $4$ tháng với lãi suất đơn $9\\%$ một năm. Sau $4$ tháng công ty phải trả tổng cộng bao nhiêu tỉ đồng?',
      answer: 1.03,
      unit: 'tỉ đồng',
      hints: ['$t = \\dfrac{4}{12} = \\dfrac{1}{3}$ năm.', 'Dùng $A = P(1 + rt)$.'],
      solution: '$A = 1 \\cdot \\left(1 + 0{,}09 \\cdot \\dfrac{1}{3}\\right) = 1{,}03$ (tỉ đồng).',
    },
    {
      type: 'number',
      prompt:
        'Chị Dung vay $100$ triệu đồng trong $6$ tháng, lãi suất năm $9\\%$, tính lãi kép hằng tháng. Chị phải trả tổng cộng bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 104.585,
      tolerance: 0.002,
      unit: 'triệu đồng',
      hints: ['$n = 12$, $t = 0{,}5$ nên có $nt = 6$ kì.', '$A = 100 \\cdot 1{,}0075^6$.'],
      solution:
        '$A = 100\\left(1 + \\dfrac{0{,}09}{12}\\right)^{6} = 100 \\cdot 1{,}0075^6 \\approx 104{,}585$ (triệu đồng); tiền lãi khoảng $4{,}585$ triệu đồng (lãi đơn chỉ là $4{,}5$ triệu đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Anh Hải cần vay $500$ triệu đồng và trả sau $9$ tháng. Khoản vay nào làm anh trả ít tiền hơn?',
      options: [
        'Lãi kép kì hạn $3$ tháng, lãi suất năm $8\\%$',
        'Lãi đơn, lãi suất năm $8{,}5\\%$',
        'Hai khoản vay phải trả như nhau',
      ],
      answer: 0,
      hints: [
        'Lãi kép kì hạn $3$ tháng: $n = 4$, $9$ tháng là $3$ kì.',
        'So sánh $500 \\cdot 1{,}02^3$ với $500(1 + 0{,}085 \\cdot 0{,}75)$.',
      ],
      solution:
        'Lãi kép: $500 \\cdot 1{,}02^3 = 530{,}604$ (triệu đồng). Lãi đơn: $500(1 + 0{,}085 \\cdot 0{,}75) = 531{,}875$ (triệu đồng). Khoản vay lãi kép kì hạn $3$ tháng, $8\\%$ có lợi hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Anh Tùng nợ $800$ triệu đồng và sẽ trả cả gốc lẫn lãi sau $5$ năm. Lựa chọn nào làm anh trả ít tiền lãi hơn?',
      options: [
        'Lãi suất năm $6\\%$, tính lãi đơn',
        'Lãi suất năm $5{,}5\\%$, tính lãi kép hằng tháng',
      ],
      answer: 0,
      hints: [
        'Tính tiền lãi của từng lựa chọn: $Prt$ và $P\\left[\\left(1 + \\frac{r}{12}\\right)^{60} - 1\\right]$.',
      ],
      solution:
        'Lãi đơn: $800 \\cdot 0{,}06 \\cdot 5 = 240$ (triệu đồng). Lãi kép hằng tháng: $800\\left[\\left(1 + \\frac{0{,}055}{12}\\right)^{60} - 1\\right] \\approx 252{,}563$ (triệu đồng). Lựa chọn lãi đơn $6\\%$ có lợi hơn dù lãi suất cao hơn.',
    },
    {
      type: 'number',
      prompt:
        'Chị Dung mua ô tô $600$ triệu đồng theo hình thức vay trả góp hằng tháng trong $72$ tháng, lãi suất năm $6{,}9\\%$. Khoản thanh toán hằng tháng là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 10.201,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: [
        '$i = \\dfrac{0{,}069}{12} = 0{,}00575$, $n = 72$.',
        'Dùng $P = \\dfrac{V \\cdot i}{1 - (1 + i)^{-n}}$.',
      ],
      solution:
        '$P = \\dfrac{600 \\cdot 0{,}00575}{1 - 1{,}00575^{-72}} \\approx 10{,}201$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Với khoản vay ở câu trên ($600$ triệu đồng, $72$ tháng, lãi suất năm $6{,}9\\%$), tổng tiền lãi chị Dung phải trả là bao nhiêu triệu đồng? Làm tròn đến hàng đơn vị.',
      answer: 134,
      tolerance: 0.6,
      unit: 'triệu đồng',
      hints: ['Tổng tiền trả là $72P$.', 'Tiền lãi bằng tổng tiền trả trừ số tiền vay.'],
      solution:
        'Tổng tiền trả: $72 \\cdot 10{,}2006 \\approx 734{,}44$ (triệu đồng). Tiền lãi: $734{,}44 - 600 \\approx 134$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Vợ chồng anh Tùng vay $2{,}4$ tỉ đồng mua nhà, trả góp hằng tháng trong $30$ năm với lãi suất năm $6\\%$. Khoản thanh toán hằng tháng là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 14.389,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['$V = 2\\,400$ triệu đồng, $i = 0{,}005$, $n = 360$.'],
      solution:
        '$P = \\dfrac{2\\,400 \\cdot 0{,}005}{1 - 1{,}005^{-360}} \\approx 14{,}389$ (triệu đồng). Sau $30$ năm họ trả khoảng $14{,}389 \\cdot 360 \\approx 5\\,180$ triệu đồng, gấp hơn hai lần số tiền vay.',
    },
    {
      type: 'number',
      prompt:
        'Ngày $1/6$ chị Hương rút $5$ triệu đồng tiền mặt bằng thẻ tín dụng; lãi suất $20\\%$ một năm (tính theo $365$ ngày), phí rút tiền mặt $3\\%$. Chị trả khoản này ngày $20/7$, tức bị tính lãi $50$ ngày. Tổng chi phí (tiền lãi và phí) là bao nhiêu đồng? Làm tròn đến hàng đơn vị.',
      answer: 286986,
      tolerance: 1,
      unit: 'đồng',
      hints: [
        'Tiền lãi: $5\\,000\\,000 \\cdot \\dfrac{0{,}2}{365} \\cdot 50$.',
        'Phí rút tiền: $3\\%$ của $5$ triệu đồng.',
      ],
      solution:
        'Tiền lãi: $5\\,000\\,000 \\cdot \\dfrac{0{,}2}{365} \\cdot 50 \\approx 136\\,986$ (đồng). Phí: $5\\,000\\,000 \\cdot 0{,}03 = 150\\,000$ (đồng). Tổng chi phí khoảng $286\\,986$ đồng, tức chị phải trả $5\\,286\\,986$ đồng. Coi đây là khoản vay lãi đơn $50$ ngày thì lãi suất năm tương đương khoảng $41{,}9\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng tính phí $1{,}25\\%$ mỗi tháng trên số dư chưa thanh toán, tiền lãi gộp hằng tháng. Một khách mua hàng $5$ triệu đồng và không thanh toán trong $6$ tháng. Hoá đơn lúc đó là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 5.387,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['Lãi suất mỗi kì (tháng) là $0{,}0125$, có $6$ kì.'],
      solution: '$A = 5 \\cdot 1{,}0125^6 \\approx 5{,}387$ (triệu đồng).',
    },
    {
      type: 'multi',
      prompt: 'Chọn các nhận xét đúng về lịch trả nợ của một khoản vay trả góp đều hằng tháng.',
      options: [
        'Khoản trả mỗi tháng không đổi.',
        'Tiền lãi trong mỗi khoản trả giảm dần qua các tháng.',
        'Tiền gốc trong mỗi khoản trả tăng dần qua các tháng.',
        'Tiền lãi mỗi tháng luôn bằng nhau.',
        'Tổng tiền trả đúng bằng số tiền vay.',
      ],
      answers: [0, 1, 2],
      hints: ['Tiền lãi mỗi kì được tính trên dư nợ còn lại, mà dư nợ giảm dần.'],
      solution:
        'Khoản trả $P$ không đổi; tiền lãi $i \\cdot B_{k-1}$ giảm vì dư nợ giảm, nên phần gốc $P - iB_{k-1}$ tăng dần. Tổng tiền trả $nP$ lớn hơn số tiền vay, phần chênh lệch là tiền lãi.',
    },
  ],
  takeaways: [
    'Thẻ tín dụng: trả hết dư nợ trước hạn thì không mất lãi; nếu không, lãi tính theo ngày trên từng khoản dư nợ. Rút tiền mặt bị tính phí và lãi ngay.',
    'Vay lãi đơn $A = P(1 + rt)$, vay lãi kép $A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$; so sánh các khoản vay bằng số tiền phải trả.',
    'Trả góp đều: $P = \\dfrac{V \\cdot i}{1 - (1 + i)^{-n}}$; tổng tiền trả $nP$, tiền lãi $nP - V$.',
  ],
};
