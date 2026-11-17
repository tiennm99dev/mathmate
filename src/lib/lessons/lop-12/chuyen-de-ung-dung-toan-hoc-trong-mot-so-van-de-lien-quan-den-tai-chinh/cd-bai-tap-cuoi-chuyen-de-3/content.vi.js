/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề tài chính: lãi đơn, lãi kép, lãi suất thực, vay và trả góp, giá trị hiện tại và niên kim, so sánh các phương án tài chính cá nhân.',
  intro:
    'Gửi tiền ở ngân hàng nào, vay theo gói nào, nhận thưởng một lần hay nhận dần? Mỗi quyết định tài chính đều là một phép so sánh. Bài này ôn lại các công thức của chuyên đề và luyện cách đưa các phương án về cùng một thước đo để chọn phương án có lợi.',
  objectives: [
    'Hệ thống các công thức lãi đơn, lãi kép, lãi suất thực, trả góp và niên kim.',
    'So sánh các phương án gửi tiền, vay tiền, đầu tư bằng cách quy về cùng thước đo.',
    'Vận dụng vào một tình huống tài chính cá nhân cụ thể.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức'],
          rows: [
            ['Lãi đơn', '$I = Prt$, $A = P(1 + rt)$'],
            ['Lãi kép, $n$ kì mỗi năm', '$A = P\\left(1 + \\dfrac{r}{n}\\right)^{nt}$'],
            ['Giá trị hiện tại', '$P = A\\left(1 + \\dfrac{r}{n}\\right)^{-nt}$'],
            ['Sức mua khi lạm phát $g$', '$A = P(1 - g)^n$'],
            ['Lãi suất thực', '$r_{\\text{thực}} = \\dfrac{r - g}{1 + g}$'],
            ['Trả góp đều', '$P = \\dfrac{V \\cdot i}{1 - (1 + i)^{-n}}$'],
            ['Giá trị tích luỹ của niên kim', '$A = P\\cdot\\dfrac{(1 + i)^n - 1}{i}$'],
            ['Giá trị hiện tại của niên kim', '$V = P\\cdot\\dfrac{1 - (1 + i)^{-n}}{i}$'],
          ],
          caption: '$r$: lãi suất năm, $i$: lãi suất mỗi kì, $t$: số năm, $n$: số kì',
        },
      ],
    },
    {
      heading: 'So sánh các phương án tài chính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một thước đo chung: tiền lãi phải trả (khi vay), số tiền nhận được ở cùng thời điểm (khi gửi), hoặc giá trị hiện tại (khi các khoản tiền rơi vào những thời điểm khác nhau).',
            'Tính thước đo đó cho từng phương án bằng đúng công thức của nó (lãi đơn hay lãi kép, bao nhiêu kì).',
            'So sánh, rồi xét thêm các yếu tố không thể hiện trong con số: rủi ro, phí, khả năng rút tiền trước hạn.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Lãi suất năm cao hơn chưa chắc có lợi hơn: cần xem lãi được tính đơn hay kép, bao nhiêu kì mỗi năm và trong bao lâu. Một khoản tiền nhận sau có giá trị hiện tại nhỏ hơn cùng khoản tiền ấy nhận ngay hôm nay.',
        },
      ],
    },
    {
      heading: 'Dự án: Tư vấn tài chính cho một gia đình',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đóng vai người tư vấn, giúp một gia đình (giả định hoặc có thật, giữ kín thông tin riêng) chọn phương án cho một quyết định tài chính lớn: gửi tiết kiệm cho học phí đại học của con, hoặc vay mua xe, mua nhà.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thu nhập, chi tiêu của gia đình (ước lượng), lãi suất tiết kiệm và lãi suất cho vay hiện hành của hai ngân hàng, tỉ lệ lạm phát gần nhất; bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mô tả mục tiêu và thời hạn; ước lượng số tiền cần có (có tính đến giá tăng theo lạm phát).',
            'Đề xuất ít nhất hai phương án (ví dụ: gửi một lần hay gửi đều hằng tháng; vay $5$ năm hay vay $10$ năm).',
            'Tính cho mỗi phương án: số tiền cuối kì hoặc khoản trả hằng tháng, tổng tiền lãi, và tỉ lệ khoản trả so với thu nhập.',
            'Chọn phương án và nêu rủi ro cần lưu ý.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một trang tư vấn gồm bảng so sánh, các phép tính và lời khuyên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tình huống: chọn phương án có lợi',
    instruction:
      'Chọn một tình huống, đoán phương án có lợi hơn rồi bấm vào phương án đó để xem lời giải. Sau đó kéo thanh trượt để tìm khi nào phương án kia trở nên có lợi hơn.',
  },
  examples: [
    {
      problem:
        'Ngân hàng A trả lãi suất năm $6\\%$, tính lãi kép hằng ngày. Ngân hàng B trả lãi suất năm $6{,}02\\%$, tính lãi kép hằng quý. Gửi tiền ở ngân hàng nào có lợi hơn?',
      steps: [
        'Sau $1$ năm, mỗi đồng vốn ở ngân hàng A thành $\\left(1 + \\dfrac{0{,}06}{365}\\right)^{365} \\approx 1{,}06183$ đồng.',
        'Ở ngân hàng B: $\\left(1 + \\dfrac{0{,}0602}{4}\\right)^{4} \\approx 1{,}06157$ đồng.',
        '$1{,}06183 > 1{,}06157$, và sau $t$ năm hai số tiền là $P \\cdot 1{,}06183^t$ và $P \\cdot 1{,}06157^t$.',
      ],
      answer: 'Ngân hàng A có lợi hơn, dù lãi suất năm thấp hơn.',
    },
    {
      problem:
        'Học phí trung bình của một trường đại học năm học 2021 – 2022 là $18$ triệu đồng/năm và tăng đều $8\\%$ mỗi năm. a) Tính học phí năm học 2029 – 2030. b) Ngân hàng trả lãi kép kì hạn $12$ tháng $6\\%$ một năm. Đầu tháng 9 năm 2021 cần gửi bao nhiêu để đủ học phí năm thứ nhất cho sinh viên nhập học tháng 9 năm 2029?',
      steps: [
        'a) Sau $8$ năm: $18 \\cdot 1{,}08^8 \\approx 33{,}317$ (triệu đồng).',
        'b) Giá trị hiện tại của $33{,}317$ triệu đồng sau $8$ năm: $P = 33{,}317 \\cdot 1{,}06^{-8} \\approx 20{,}903$ (triệu đồng).',
      ],
      answer: 'a) Khoảng $33{,}317$ triệu đồng. b) Cần gửi khoảng $20{,}903$ triệu đồng.',
    },
    {
      problem:
        'Một cặp vợ chồng vay $2$ tỉ đồng mua nhà trong $20$ năm, lãi suất năm $9\\%$, trả góp hằng tháng. Tính khoản trả hằng tháng và tổng số tiền trả trong $20$ năm.',
      steps: [
        '$V = 2\\,000$ (triệu đồng), $i = 0{,}0075$, $n = 240$.',
        '$P = \\dfrac{2\\,000 \\cdot 0{,}0075}{1 - 1{,}0075^{-240}} \\approx 17{,}995$ (triệu đồng).',
        'Tổng tiền trả: $240P \\approx 4\\,318{,}685$ (triệu đồng).',
      ],
      answer:
        'Mỗi tháng trả khoảng $17{,}995$ triệu đồng; tổng cộng khoảng $4{,}32$ tỉ đồng, hơn gấp đôi số tiền vay.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cần vay $80$ triệu đồng trong $9$ tháng. Khoản vay nào phải trả ít tiền lãi hơn?',
      options: [
        'Lãi kép hằng tháng, lãi suất năm $9\\%$',
        'Lãi đơn, lãi suất năm $9{,}3\\%$',
        'Hai khoản vay có tiền lãi bằng nhau',
      ],
      answer: 0,
      hints: [
        'Tiền lãi lãi kép: $80(1{,}0075^9 - 1)$; lãi đơn: $80 \\cdot 0{,}093 \\cdot 0{,}75$.',
      ],
      solution:
        'Lãi kép hằng tháng: $80(1{,}0075^9 - 1) \\approx 5{,}565$ (triệu đồng). Lãi đơn: $80 \\cdot 0{,}093 \\cdot 0{,}75 = 5{,}58$ (triệu đồng). Khoản vay lãi kép $9\\%$ phải trả ít lãi hơn.',
    },
    {
      type: 'number',
      prompt:
        'Đầu tư với lãi suất năm $8\\%$, tính lãi kép hằng tháng. Sau ít nhất bao nhiêu tháng thì khoản đầu tư tăng gấp đôi?',
      answer: 105,
      unit: 'tháng',
      hints: ['$i = \\dfrac{0{,}08}{12}$; giải $(1 + i)^N \\ge 2$.'],
      solution: '$N \\ge \\log_{1 + \\frac{0{,}08}{12}} 2 \\approx 104{,}32$, nên cần $105$ tháng.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với lãi suất năm $8\\%$ nhưng tính lãi kép hằng quý, sau ít nhất bao nhiêu quý thì khoản đầu tư tăng gấp đôi?',
      answer: 36,
      unit: 'quý',
      hints: ['Lãi suất mỗi quý là $0{,}02$.'],
      solution:
        '$N \\ge \\log_{1{,}02} 2 \\approx 35{,}003$. Vì $1{,}02^{35} \\approx 1{,}99989 < 2$ nên cần $36$ quý.',
    },
    {
      type: 'number',
      prompt:
        'Học phí năm 2021 là $18$ triệu đồng/năm và tăng đều $8\\%$ mỗi năm. Học phí sau $8$ năm là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 33.317,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['Học phí tăng như lãi kép hằng năm.'],
      solution: '$18 \\cdot 1{,}08^8 \\approx 33{,}317$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Cần gửi bao nhiêu triệu đồng hôm nay (lãi kép hằng năm $6\\%$) để sau $8$ năm có $33{,}317$ triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 20.903,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['Giá trị hiện tại: $P = A(1 + r)^{-t}$.'],
      solution: '$P = 33{,}317 \\cdot 1{,}06^{-8} \\approx 20{,}903$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Cần gửi bao nhiêu triệu đồng vào cuối mỗi quý (lãi suất năm $10\\%$, lãi kép hằng quý) để có $200$ triệu đồng sau $2$ năm? Làm tròn đến hàng phần trăm.',
      answer: 22.89,
      tolerance: 0.006,
      unit: 'triệu đồng',
      hints: ['$i = 0{,}025$, $n = 8$.', 'Giải $200 = P\\cdot\\dfrac{1{,}025^8 - 1}{0{,}025}$.'],
      solution: '$P = \\dfrac{200 \\cdot 0{,}025}{1{,}025^8 - 1} \\approx 22{,}89$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Vay $2$ tỉ đồng trong $20$ năm, lãi suất năm $9\\%$, trả góp hằng tháng. Khoản trả hằng tháng là bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 17.995,
      tolerance: 0.0015,
      unit: 'triệu đồng',
      hints: ['$V = 2\\,000$, $i = 0{,}0075$, $n = 240$.'],
      solution:
        '$P = \\dfrac{2\\,000 \\cdot 0{,}0075}{1 - 1{,}0075^{-240}} \\approx 17{,}995$ (triệu đồng).',
    },
    {
      type: 'number',
      prompt:
        'Nếu thay vì vay, cặp vợ chồng ở câu trên gửi $17{,}995$ triệu đồng vào cuối mỗi tháng trong $20$ năm vào tài khoản lãi suất năm $9\\%$, lãi kép hằng tháng, thì cuối kì tài khoản có bao nhiêu triệu đồng? Làm tròn đến hàng đơn vị.',
      answer: 12018,
      tolerance: 0.8,
      unit: 'triệu đồng',
      hints: ['Giá trị tích luỹ của niên kim với $i = 0{,}0075$, $n = 240$.'],
      solution:
        '$A = 17{,}995 \\cdot \\dfrac{1{,}0075^{240} - 1}{0{,}0075} \\approx 12\\,018$ (triệu đồng), khoảng $12$ tỉ đồng.',
    },
    {
      type: 'number',
      prompt:
        'Lãi suất tiết kiệm là $7\\%$ một năm, tỉ lệ lạm phát là $3\\%$ một năm. Lãi suất thực là bao nhiêu phần trăm? Làm tròn đến hàng phần trăm.',
      answer: 3.88,
      tolerance: 0.006,
      unit: '%',
      hints: ['$r_{\\text{thực}} = \\dfrac{r - g}{1 + g}$.'],
      solution:
        '$r_{\\text{thực}} = \\dfrac{0{,}07 - 0{,}03}{1{,}03} \\approx 0{,}0388 = 3{,}88\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Với lãi suất $6\\%$ một năm (lãi kép hằng năm), cách nào cho nhiều tiền hơn sau $10$ năm: gửi $100$ triệu đồng một lần ngay hôm nay, hay gửi $10$ triệu đồng vào cuối mỗi năm trong $10$ năm?',
      options: [
        'Gửi $100$ triệu đồng một lần ngay hôm nay',
        'Gửi $10$ triệu đồng cuối mỗi năm',
        'Hai cách như nhau vì cùng gửi tổng cộng $100$ triệu đồng',
      ],
      answer: 0,
      hints: ['So sánh $100 \\cdot 1{,}06^{10}$ với $10 \\cdot \\dfrac{1{,}06^{10} - 1}{0{,}06}$.'],
      solution:
        'Gửi một lần: $100 \\cdot 1{,}06^{10} \\approx 179{,}08$ (triệu đồng). Gửi đều: $10 \\cdot \\dfrac{1{,}06^{10} - 1}{0{,}06} \\approx 131{,}81$ (triệu đồng). Tiền gửi sớm có nhiều thời gian sinh lãi hơn.',
    },
    {
      type: 'choice',
      prompt: 'Cách dùng thẻ tín dụng nào giúp không phải trả tiền lãi?',
      options: [
        'Thanh toán toàn bộ dư nợ trong bảng sao kê trước ngày đến hạn.',
        'Chỉ thanh toán số tiền tối thiểu mỗi tháng.',
        'Rút tiền mặt bằng thẻ rồi trả trước ngày đến hạn.',
        'Thanh toán dư nợ sau ngày đến hạn vài ngày.',
      ],
      answer: 0,
      hints: ['Thời gian miễn lãi chỉ áp dụng cho giao dịch mua hàng khi trả hết dư nợ đúng hạn.'],
      solution:
        'Chỉ khi trả hết dư nợ trước ngày đến hạn thì không mất lãi. Trả tối thiểu hay trả trễ đều bị tính lãi; rút tiền mặt bị tính phí và lãi ngay từ ngày rút.',
    },
  ],
  takeaways: [
    'So sánh các phương án bằng cùng một thước đo: tiền lãi, số tiền ở cùng thời điểm, hoặc giá trị hiện tại.',
    'Số kì ghép lãi, thời hạn và lạm phát đều ảnh hưởng tới kết quả, không chỉ con số lãi suất.',
    'Tiền gửi càng sớm càng có nhiều thời gian sinh lãi; khoản vay càng dài thì tổng tiền lãi càng lớn.',
  ],
};
