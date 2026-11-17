/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đầu tư tài chính và kế hoạch tài chính cá nhân: các kênh đầu tư, lợi nhuận và rủi ro, tìm lãi suất và thời gian đầu tư, giá trị hiện tại, niên kim và các bước lập kế hoạch tài chính.',
  intro:
    'Anh Nam trúng giải độc đắc $5$ tỉ đồng, nhưng tiền thưởng được trả dần $500$ triệu đồng mỗi năm trong $10$ năm. Nếu anh có thể đầu tư với lãi kép $10\\%$ mỗi năm, thì giải thưởng ấy thật ra đáng giá bao nhiêu tiền nếu nhận ngay hôm nay? Để trả lời, ta cần hai công cụ mới: giá trị hiện tại và niên kim.',
  objectives: [
    'Nhận biết một số kênh đầu tư phổ biến và mối quan hệ giữa lợi nhuận và rủi ro.',
    'Tìm được lãi suất, thời gian đầu tư và giá trị hiện tại $P = A\\left(1 + \\dfrac{r}{n}\\right)^{-nt}$ từ công thức lãi kép.',
    'Tính được giá trị tích luỹ $A = P\\cdot\\dfrac{(1 + i)^n - 1}{i}$ và giá trị hiện tại $V = P\\cdot\\dfrac{1 - (1 + i)^{-n}}{i}$ của một niên kim.',
    'Lập được kế hoạch tài chính cá nhân cho một mục tiêu cụ thể.',
  ],
  sections: [
    {
      heading: '1. Một số vấn đề về đầu tư',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đầu tư',
          text: 'Đầu tư là hoạt động sử dụng những nguồn lực ở hiện tại (gọi chung là vốn) như tiền bạc, vật chất, nhân công, trí tuệ, thời gian, $\\ldots$ để đạt được lợi nhuận và lợi ích kinh tế lớn hơn trong tương lai so với nguồn lực đã bỏ ra.',
        },
        {
          type: 'table',
          head: ['Kênh đầu tư', 'Lợi nhuận', 'Rủi ro'],
          rows: [
            ['Gửi tiết kiệm ngân hàng', 'Thấp, biết trước', 'Thấp'],
            ['Vàng, ngoại tệ', 'Thay đổi theo giá thị trường', 'Trung bình'],
            ['Trái phiếu', 'Khá, thường biết trước', 'Thấp đến trung bình (tuỳ tổ chức phát hành)'],
            ['Bất động sản', 'Có thể cao', 'Trung bình đến cao; vốn lớn, khó bán nhanh'],
            ['Cổ phiếu, quỹ đầu tư cổ phiếu', 'Có thể cao', 'Cao; giá biến động mạnh'],
          ],
          caption: 'Một số kênh đầu tư phổ biến (nhận xét chung, mang tính tham khảo)',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lợi nhuận và rủi ro',
          text: 'Kênh có lợi nhuận kì vọng càng cao thường đi kèm rủi ro càng lớn: kết quả có thể tốt hơn hoặc xấu hơn nhiều so với kì vọng. Người đầu tư nên chọn kênh phù hợp với mục tiêu, thời gian và khả năng chịu rủi ro của mình, và chia vốn vào nhiều kênh (đa dạng hoá) để giảm rủi ro.',
        },
      ],
    },
    {
      heading: '2. Lãi suất, thời gian và giá trị hiện tại',
      blocks: [
        {
          type: 'p',
          text: 'Từ công thức lãi kép $A = P\\left(1 + \\dfrac{r}{n}\\right)^{N}$ ($N = nt$ kì), biết ba trong bốn đại lượng $A$, $P$, $r$, $N$ ta tìm được đại lượng còn lại:',
        },
        {
          type: 'tex',
          tex: 'r = n\\left[\\left(\\frac{A}{P}\\right)^{\\frac{1}{N}} - 1\\right], \\qquad N = \\log_{1 + \\frac{r}{n}} \\frac{A}{P}.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số kì $N$ là số tự nhiên. Nếu $\\log_{1 + \\frac{r}{n}} \\dfrac{A}{P}$ không nguyên thì lấy số tự nhiên nhỏ nhất lớn hơn nó, vì tiền lãi chỉ được nhập vào vốn ở cuối mỗi kì.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Giá trị hiện tại',
          text: 'Số tiền $P$ cần đầu tư hôm nay (lãi kép, lãi suất năm $r$, $n$ kì mỗi năm) để sau $t$ năm có số tiền $A$ là $$P = A\\left(1 + \\frac{r}{n}\\right)^{-nt}.$$ Ta gọi $P$ là giá trị hiện tại của số tiền $A$ nhận được sau $t$ năm.',
        },
        {
          type: 'p',
          text: 'Ví dụ, trái phiếu chiết khấu (không trả lãi định kì) được nhà phát hành mua lại theo mệnh giá vào ngày đáo hạn. Giá hợp lí để mua nó hôm nay là giá trị hiện tại của mệnh giá, tính theo lãi suất mà người mua mong muốn.',
        },
      ],
    },
    {
      heading: '3. Niên kim',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Niên kim',
          text: 'Niên kim là một chuỗi các khoản tiền bằng nhau được gửi (hoặc nhận) đều đặn vào cuối mỗi kì, chẳng hạn mỗi tháng gửi tiết kiệm $1$ triệu đồng, hay mỗi năm nhận $500$ triệu đồng tiền thưởng.',
        },
        {
          type: 'p',
          text: 'Gửi $P$ vào cuối mỗi kì, lãi suất mỗi kì $i$. Gọi $A_k$ là số dư ngay sau lần gửi thứ $k$. Ta có hệ thức truy hồi $A_1 = P$, $A_k = (1 + i)A_{k-1} + P$, nên',
        },
        {
          type: 'tex',
          tex: 'A_n = P\\left[1 + (1 + i) + (1 + i)^2 + \\cdots + (1 + i)^{n-1}\\right] = P\\cdot\\frac{(1 + i)^n - 1}{i}.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Giá trị tích luỹ và giá trị hiện tại của niên kim',
          text: 'Niên kim gồm $n$ khoản $P$ vào cuối mỗi kì, lãi suất mỗi kì $i$: giá trị tích luỹ ngay sau lần gửi thứ $n$ là $$A = P\\cdot\\frac{(1 + i)^n - 1}{i};$$ giá trị hiện tại (tổng giá trị hiện tại của $n$ khoản) là $$V = P\\cdot\\frac{1 - (1 + i)^{-n}}{i}.$$',
        },
        {
          type: 'p',
          text: 'Công thức $V$ có được khi cộng giá trị hiện tại $P(1 + i)^{-k}$ của từng khoản, $k = 1, 2, \\ldots, n$. Đó cũng chính là công thức trả góp ở Bài 6: số tiền vay $V$ bằng giá trị hiện tại của các khoản trả góp.',
        },
      ],
    },
    {
      heading: '4. Lập kế hoạch tài chính cá nhân',
      blocks: [
        {
          type: 'p',
          text: 'Kế hoạch tài chính cá nhân giúp ta dùng thu nhập hợp lí để đạt các mục tiêu (mua đồ dùng học tập, đóng học phí, mua xe, mua nhà, nghỉ hưu) và phòng khi có việc bất ngờ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định mục tiêu tài chính: cụ thể, đo được bằng tiền, có thời hạn (ví dụ: có $30$ triệu đồng sau $2$ năm để mua máy tính).',
            'Đánh giá tình hình tài chính hiện tại: thu nhập, chi tiêu, tài sản và các khoản nợ.',
            'Lập ngân sách: chia thu nhập cho chi tiêu thiết yếu, chi tiêu cá nhân, tiết kiệm và đầu tư; để dành một quỹ dự phòng.',
            'Chọn cách tiết kiệm, đầu tư phù hợp với thời hạn và mức rủi ro chấp nhận được; dùng công thức lãi kép, niên kim để tính số tiền cần góp.',
            'Thực hiện, theo dõi định kì và điều chỉnh kế hoạch khi thu nhập hoặc mục tiêu thay đổi.',
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ, muốn có $30$ triệu đồng sau $24$ tháng bằng cách gửi đều cuối mỗi tháng vào tài khoản lãi suất năm $6\\%$ (lãi kép hằng tháng, $i = 0{,}005$), mỗi tháng cần gửi $P = \\dfrac{30 \\cdot 0{,}005}{1{,}005^{24} - 1} \\approx 1{,}180$ triệu đồng.',
        },
      ],
    },
    {
      heading: 'Dự án: Kế hoạch tài chính cho một mục tiêu của em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập một kế hoạch tài chính khả thi cho một mục tiêu có thật của em hoặc gia đình (học phí đại học, máy tính, chuyến du lịch).',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: số liệu thu nhập, chi tiêu hằng tháng (có thể ước lượng), giá của mục tiêu, lãi suất tiết kiệm hiện hành; bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ghi mục tiêu: số tiền cần có và thời hạn.',
            'Lập bảng thu, chi trong một tháng và xác định số tiền có thể để dành.',
            'Dùng công thức niên kim tính số tiền cần gửi mỗi tháng; so sánh với số tiền để dành được và điều chỉnh (thời hạn, mục tiêu, chi tiêu).',
            'So sánh ít nhất hai cách tích luỹ (gửi tiết kiệm, mua trái phiếu, $\\ldots$) về số tiền cuối kì và rủi ro.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng ngân sách, các phép tính, kế hoạch gửi tiền theo tháng và cách theo dõi việc thực hiện.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình lập kế hoạch tiết kiệm, đầu tư',
    instruction:
      'Đặt số tiền có sẵn, số tiền góp mỗi tháng, thời gian và mục tiêu, rồi chọn kênh đầu tư. Đồ thị cho thấy giá trị tài sản theo năm so với số tiền đã góp; với kênh rủi ro hơn, so sánh đường kì vọng với đường "năm xấu".',
  },
  examples: [
    {
      problem:
        'a) Lãi suất năm phải là bao nhiêu để một khoản đầu tư (lãi kép hằng quý) tăng gấp đôi sau $5$ năm? b) Với lãi suất năm $10\\%$, lãi kép hằng tháng, sau bao lâu khoản đầu tư tăng gấp đôi?',
      steps: [
        'a) $\\dfrac{A}{P} = 2$, $n = 4$, $N = 20$: $r = 4\\left(2^{\\frac{1}{20}} - 1\\right) \\approx 0{,}141 = 14{,}1\\%$.',
        'b) $N = \\log_{1 + \\frac{0{,}1}{12}} 2 \\approx 83{,}52$.',
        '$N$ là số tự nhiên nên lấy $N = 84$ tháng.',
      ],
      answer: 'a) Khoảng $14{,}1\\%$ một năm. b) Sau $84$ tháng, tức $7$ năm.',
    },
    {
      problem:
        'Một trái phiếu chiết khấu sẽ được mua lại với giá $100$ triệu đồng sau $10$ năm. Hôm nay nên mua nó với giá bao nhiêu nếu muốn được lãi kép $6\\%$ một năm, tính lãi hằng tháng?',
      steps: [
        '$A = 100$, $r = 0{,}06$, $n = 12$, $t = 10$.',
        '$P = 100\\left(1 + \\dfrac{0{,}06}{12}\\right)^{-120} = 100 \\cdot 1{,}005^{-120} \\approx 54{,}963$ (triệu đồng).',
      ],
      answer: 'Giá mua hợp lí khoảng $54{,}963$ triệu đồng.',
    },
    {
      problem:
        'Giải bài toán mở đầu: giải thưởng trả $500$ triệu đồng vào cuối mỗi năm trong $10$ năm; anh Nam có thể đầu tư với lãi kép $10\\%$ mỗi năm. Tính giá trị hiện tại của giải thưởng.',
      steps: [
        'Đây là niên kim với $P = 500$, $i = 0{,}1$, $n = 10$.',
        '$V = 500 \\cdot \\dfrac{1 - 1{,}1^{-10}}{0{,}1} \\approx 3\\,072{,}284$ (triệu đồng).',
      ],
      answer:
        'Giá trị hiện tại khoảng $3{,}072$ tỉ đồng, ít hơn nhiều so với con số $5$ tỉ đồng ghi trên giải thưởng.',
    },
    {
      problem:
        'Anh Nam $35$ tuổi, mỗi năm gửi $36$ triệu đồng vào tài khoản hưu trí trong $30$ năm, lãi kép $6\\%$ mỗi năm. Tài khoản có bao nhiêu tiền ngay sau lần gửi thứ $30$?',
      steps: [
        '$P = 36$, $i = 0{,}06$, $n = 30$.',
        '$A = 36 \\cdot \\dfrac{1{,}06^{30} - 1}{0{,}06} \\approx 2\\,846{,}095$ (triệu đồng).',
        'Tiền đã gửi: $36 \\cdot 30 = 1\\,080$ triệu đồng; phần còn lại là tiền lãi.',
      ],
      answer: 'Khoảng $2{,}846$ tỉ đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một trái phiếu chiết khấu sẽ được mua lại với giá $100$ triệu đồng sau $5$ năm. Hôm nay cần bỏ ra bao nhiêu triệu đồng để mua nó nếu muốn được lãi kép $1\\%$ mỗi tháng? Làm tròn đến hàng phần nghìn.',
      answer: 55.045,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['$5$ năm là $60$ tháng.', '$P = 100 \\cdot 1{,}01^{-60}$.'],
      solution: '$P = 100 \\cdot 1{,}01^{-60} \\approx 55{,}045$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Anh Hưng đầu tư $50$ triệu đồng vào cuối mỗi năm vào một quỹ trong $15$ năm. Nếu giá trị của quỹ tăng $5\\%$ mỗi năm, tài khoản có bao nhiêu triệu đồng ngay sau lần góp thứ $15$? Làm tròn đến hàng phần nghìn.',
      answer: 1078.928,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['Giá trị tích luỹ của niên kim: $A = P\\cdot\\dfrac{(1 + i)^n - 1}{i}$.'],
      solution:
        '$A = 50 \\cdot \\dfrac{1{,}05^{15} - 1}{0{,}05} \\approx 1\\,078{,}928$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Mỗi tháng gửi $1$ triệu đồng vào cuối tháng vào một tài khoản tích luỹ lãi suất năm $6\\%$, lãi kép hằng tháng. Cần gửi ít nhất bao nhiêu tháng để có $100$ triệu đồng?',
      answer: 82,
      unit: 'tháng',
      hints: [
        '$i = 0{,}005$. Giải $\\dfrac{1{,}005^n - 1}{0{,}005} \\ge 100$.',
        'Ta được $1{,}005^n \\ge 1{,}5$.',
      ],
      solution:
        '$1{,}005^n \\ge 1{,}5 \\Leftrightarrow n \\ge \\log_{1{,}005} 1{,}5 \\approx 81{,}3$. Vậy cần $82$ tháng, tức $6$ năm $10$ tháng.',
    },
    {
      type: 'number',
      prompt:
        'Tính giá trị hiện tại của một niên kim trả $5$ triệu đồng vào cuối mỗi tháng trong $48$ tháng, với lãi suất năm $6\\%$ (lãi kép hằng tháng). Làm tròn đến hàng phần nghìn.',
      answer: 212.902,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['$i = 0{,}005$, $n = 48$.', '$V = P\\cdot\\dfrac{1 - (1 + i)^{-n}}{i}$.'],
      solution:
        '$V = 5 \\cdot \\dfrac{1 - 1{,}005^{-48}}{0{,}005} \\approx 212{,}902$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Anh Dương để dành $1{,}5$ triệu đồng cuối mỗi tuần trong $12$ tuần, đầu tư với lãi kép $0{,}4\\%$ mỗi tuần. Sau $12$ tuần anh có bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 18.401,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['Niên kim với $P = 1{,}5$, $i = 0{,}004$, $n = 12$.'],
      solution:
        '$A = 1{,}5 \\cdot \\dfrac{1{,}004^{12} - 1}{0{,}004} \\approx 18{,}401$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Tiếp câu trên: anh Dương rút số tiền bằng nhau vào cuối mỗi tuần trong $36$ tuần (lãi vẫn là $0{,}4\\%$ mỗi tuần) cho đến khi hết tiền. Mỗi tuần anh rút được nhiều nhất bao nhiêu nghìn đồng? Làm tròn đến hàng đơn vị.',
      answer: 550,
      tolerance: 0.6,
      unit: 'nghìn đồng',
      hints: [
        'Số tiền $18{,}401$ triệu đồng là giá trị hiện tại $V$ của $36$ khoản rút.',
        'Giải $V = P\\cdot\\dfrac{1 - 1{,}004^{-36}}{0{,}004}$ để tìm $P$.',
      ],
      solution:
        '$P = \\dfrac{18{,}401 \\cdot 0{,}004}{1 - 1{,}004^{-36}} \\approx 0{,}550$ (triệu đồng), tức khoảng $550$ nghìn đồng mỗi tuần.',
    },
    {
      type: 'number',
      prompt:
        'Anh Nam và chị Hương cần $2$ tỉ đồng để mua nhà sau $4$ năm. Ngân hàng trả lãi kép $2\\%$ mỗi quý. Bây giờ họ cần gửi bao nhiêu tỉ đồng? Làm tròn đến hàng phần nghìn.',
      answer: 1.457,
      tolerance: 0.0015,
      unit: 'tỉ đồng',
      hints: ['$4$ năm là $16$ quý, lãi suất mỗi kì là $0{,}02$.', '$P = A(1 + i)^{-16}$.'],
      solution: '$P = 2 \\cdot 1{,}02^{-16} \\approx 1{,}457$ (tỉ đồng).',
    },
    {
      type: 'number',
      prompt:
        'Bác Hùng gửi $6$ triệu đồng vào cuối mỗi quý vào tài khoản hưu trí lãi suất năm $8\\%$, tính lãi hằng quý. Sau ít nhất bao nhiêu lần gửi thì số dư tài khoản vượt quá $500$ triệu đồng?',
      answer: 50,
      unit: 'lần',
      hints: [
        '$i = 0{,}02$; số dư sau $N$ lần gửi là $6\\cdot\\dfrac{1{,}02^N - 1}{0{,}02} = 300(1{,}02^N - 1)$.',
        'Giải $300(1{,}02^N - 1) > 500$.',
      ],
      solution:
        '$300(1{,}02^N - 1) > 500 \\Leftrightarrow 1{,}02^N > \\dfrac{8}{3} \\Leftrightarrow N > \\log_{1{,}02}\\dfrac{8}{3} \\approx 49{,}53$. Vậy cần ít nhất $50$ lần gửi ($50$ quý, tức $12$ năm $6$ tháng).',
    },
    {
      type: 'choice',
      prompt: 'Nhận định nào đúng về lợi nhuận và rủi ro khi đầu tư?',
      options: [
        'Kênh có lợi nhuận kì vọng cao thường có rủi ro cao; nên đa dạng hoá để giảm rủi ro.',
        'Kênh có lợi nhuận cao luôn an toàn hơn kênh có lợi nhuận thấp.',
        'Gửi tiết kiệm có rủi ro cao nhất trong các kênh đầu tư.',
        'Nên dồn toàn bộ vốn vào kênh có lợi nhuận năm ngoái cao nhất.',
      ],
      answer: 0,
      hints: ['Lợi nhuận kì vọng cao là phần "bù" cho việc chấp nhận kết quả không chắc chắn.'],
      solution:
        'Lợi nhuận kì vọng càng cao thì rủi ro thường càng lớn. Chia vốn vào nhiều kênh giúp giảm rủi ro; lợi nhuận năm trước không bảo đảm cho năm sau.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước lập kế hoạch tài chính cá nhân theo thứ tự hợp lí.',
      items: [
        'Xác định mục tiêu tài chính cụ thể, có thời hạn.',
        'Đánh giá thu nhập, chi tiêu, tài sản và nợ hiện tại.',
        'Lập ngân sách, chọn cách tiết kiệm và đầu tư.',
        'Thực hiện, theo dõi và điều chỉnh kế hoạch.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải biết mình muốn gì và đang có gì trước khi chia tiền.'],
      solution:
        'Xác định mục tiêu, đánh giá tình hình hiện tại, lập ngân sách và chọn cách tích luỹ, rồi thực hiện và theo dõi, điều chỉnh.',
    },
  ],
  takeaways: [
    'Lợi nhuận kì vọng cao thường đi kèm rủi ro cao; đa dạng hoá để giảm rủi ro.',
    'Từ $A = P\\left(1 + \\dfrac{r}{n}\\right)^N$: $r = n\\left[\\left(\\dfrac{A}{P}\\right)^{\\frac{1}{N}} - 1\\right]$, $N = \\log_{1 + \\frac{r}{n}} \\dfrac{A}{P}$; giá trị hiện tại $P = A\\left(1 + \\dfrac{r}{n}\\right)^{-nt}$.',
    'Niên kim: $A = P\\cdot\\dfrac{(1 + i)^n - 1}{i}$, $V = P\\cdot\\dfrac{1 - (1 + i)^{-n}}{i}$.',
    'Kế hoạch tài chính: mục tiêu, đánh giá hiện tại, ngân sách và cách tích luỹ, thực hiện và điều chỉnh.',
  ],
};
