/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức xác suất toàn phần P(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā), công thức Bayes P(A|B) = P(A)·P(B|A)/P(B), sơ đồ hình cây, và bài toán xét nghiệm bệnh.',
  intro:
    'Một xét nghiệm cho kết quả dương tính với xác suất $0{,}95$ nếu người được xét nghiệm mắc bệnh X. Ông M xét nghiệm và nhận kết quả dương tính. Có phải ông M mắc bệnh X với xác suất $0{,}95$? Câu trả lời là không, và con số thật sự có thể nhỏ hơn rất nhiều. Công thức xác suất toàn phần và công thức Bayes giúp ta tính đúng xác suất đó.',
  objectives: [
    'Dùng công thức xác suất toàn phần để tính xác suất của một biến cố qua hai trường hợp $A$ và $\\overline{A}$.',
    'Dùng công thức Bayes để tính $P(A|B)$ khi biết $P(A)$, $P(B|A)$ và $P(B|\\overline{A})$.',
    'Dùng sơ đồ hình cây để tổ chức lời giải và giải thích kết quả xét nghiệm trong thực tế.',
  ],
  sections: [
    {
      heading: 'Công thức xác suất toàn phần',
      blocks: [
        {
          type: 'p',
          text: 'Cho hai biến cố $A$ và $B$. Hai biến cố $AB$ và $\\overline{A}B$ xung khắc và $B = AB \\cup \\overline{A}B$, nên $P(B) = P(AB) + P(\\overline{A}B)$. Áp dụng công thức nhân xác suất cho từng số hạng, ta được công thức sau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức xác suất toàn phần',
          text: 'Cho hai biến cố $A$ và $B$. Khi đó $$P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A}).$$',
        },
        {
          type: 'p',
          text: 'Trên sơ đồ hình cây, $P(B)$ là tổng xác suất của hai lá $AB$ và $\\overline{A}B$; mỗi lá có xác suất bằng tích các xác suất trên đường đi từ gốc đến lá đó. Công thức này dùng khi $B$ xảy ra theo hai trường hợp: $A$ xảy ra hoặc $A$ không xảy ra, và trong mỗi trường hợp ta biết xác suất của $B$.',
        },
      ],
    },
    {
      heading: 'Công thức Bayes',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều khi ta biết $P(B|A)$ nhưng lại cần $P(A|B)$: biết xác suất xét nghiệm dương tính khi mắc bệnh, cần xác suất mắc bệnh khi xét nghiệm dương tính. Từ $P(A|B) = \\dfrac{P(AB)}{P(B)}$ và $P(AB) = P(A) \\cdot P(B|A)$ ta được công thức Bayes.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức Bayes',
          text: 'Cho hai biến cố $A$, $B$ với $P(B) > 0$. Khi đó $$P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}.$$',
        },
        {
          type: 'p',
          text: 'Thay $P(B)$ theo công thức xác suất toàn phần, ta được dạng thường dùng khi giải toán:',
        },
        {
          type: 'tex',
          tex: 'P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})}',
        },
        {
          type: 'p',
          text: 'Trong bài toán xét nghiệm: $A$: "Người được xét nghiệm mắc bệnh X", $B$: "Kết quả xét nghiệm dương tính". Tỉ lệ mắc bệnh $0{,}2\\%$ cho $P(A) = 0{,}002$; xét nghiệm dương tính với xác suất $0{,}95$ nếu mắc bệnh và $0{,}01$ nếu không mắc bệnh: $P(B|A) = 0{,}95$, $P(B|\\overline{A}) = 0{,}01$.',
        },
        {
          type: 'tex',
          tex: 'P(A|B) = \\dfrac{0{,}002 \\cdot 0{,}95}{0{,}002 \\cdot 0{,}95 + 0{,}998 \\cdot 0{,}01} = \\dfrac{0{,}0019}{0{,}01188} \\approx 0{,}1599',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Trước khi xét nghiệm, xác suất ông M mắc bệnh là $P(A) = 0{,}002$; sau khi có kết quả dương tính, xác suất đó tăng lên $P(A|B) \\approx 0{,}16$, nhưng vẫn còn xa $0{,}95$. Lí do: bệnh rất hiếm, nên số người khoẻ bị dương tính nhầm nhiều hơn số người bệnh có kết quả dương tính. Không được nhầm $P(B|A)$ với $P(A|B)$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xét nghiệm bệnh và công thức Bayes',
    instruction:
      'Kéo các thanh trượt tỉ lệ mắc bệnh $P(A)$, độ nhạy $P(B|A)$ và độ đặc hiệu $P(\\overline{B}|\\overline{A})$; sơ đồ cây cập nhật xác suất từng lá. Chọn kết quả dương tính hoặc âm tính để xem công thức xác suất toàn phần và công thức Bayes. Thử giảm tỉ lệ mắc bệnh: dù xét nghiệm rất tốt, $P(A|B)$ vẫn có thể nhỏ.',
  },
  examples: [
    {
      problem:
        'Xác suất một ngày trời mưa là $0{,}4$. Nếu trời mưa, xác suất bạn Hà đến trường muộn là $0{,}3$; nếu trời không mưa, xác suất đó là $0{,}1$. Tính xác suất bạn Hà đến trường muộn trong một ngày.',
      steps: [
        'Gọi $A$: "Trời mưa", $B$: "Hà đến trường muộn". Ta có $P(A) = 0{,}4$, $P(\\overline{A}) = 0{,}6$, $P(B|A) = 0{,}3$, $P(B|\\overline{A}) = 0{,}1$.',
        'Theo công thức xác suất toàn phần: $P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A}) = 0{,}4 \\cdot 0{,}3 + 0{,}6 \\cdot 0{,}1$.',
        '$P(B) = 0{,}12 + 0{,}06 = 0{,}18$.',
      ],
      answer: 'Xác suất Hà đến trường muộn là $0{,}18$.',
    },
    {
      problem:
        'Với số liệu ở Ví dụ 1, biết hôm đó Hà đến trường muộn. Tính xác suất hôm đó trời mưa.',
      steps: [
        'Cần tính $P(A|B)$ với $P(B) = 0{,}18$ đã tính ở Ví dụ 1.',
        'Theo công thức Bayes: $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)} = \\dfrac{0{,}4 \\cdot 0{,}3}{0{,}18} = \\dfrac{0{,}12}{0{,}18} = \\dfrac{2}{3}$.',
        'Biết Hà đến muộn, xác suất trời mưa tăng từ $0{,}4$ lên $\\dfrac{2}{3} \\approx 0{,}67$.',
      ],
      answer: '$P(A|B) = \\dfrac{2}{3}$.',
    },
    {
      problem:
        'Một nhà máy có hai phân xưởng: phân xưởng I sản xuất $60\\%$ và phân xưởng II sản xuất $40\\%$ số sản phẩm. Tỉ lệ phế phẩm của phân xưởng I là $3\\%$, của phân xưởng II là $5\\%$. Chọn ngẫu nhiên một sản phẩm của nhà máy. a) Tính xác suất sản phẩm đó là phế phẩm. b) Biết sản phẩm được chọn là phế phẩm, tính xác suất nó do phân xưởng I sản xuất (làm tròn đến hàng phần nghìn).',
      steps: [
        'Gọi $A$: "Sản phẩm do phân xưởng I sản xuất", $B$: "Sản phẩm là phế phẩm". $P(A) = 0{,}6$, $P(\\overline{A}) = 0{,}4$, $P(B|A) = 0{,}03$, $P(B|\\overline{A}) = 0{,}05$.',
        'a) $P(B) = 0{,}6 \\cdot 0{,}03 + 0{,}4 \\cdot 0{,}05 = 0{,}018 + 0{,}02 = 0{,}038$.',
        'b) $P(A|B) = \\dfrac{0{,}018}{0{,}038} = \\dfrac{9}{19} \\approx 0{,}474$.',
      ],
      answer: 'a) $0{,}038$; b) $\\dfrac{9}{19} \\approx 0{,}474$.',
    },
    {
      problem:
        'Trong một hầm rượu, $30\\%$ số chai là rượu loại I. Ông Tùng nếm thử một chai chọn ngẫu nhiên. Nếu chai đó là rượu loại I, ông nhận ra đúng với xác suất $0{,}9$; nếu không phải loại I, ông nói đúng là không phải loại I với xác suất $0{,}95$. Ông Tùng nói chai rượu là loại I. Tính xác suất chai đó thật sự là rượu loại I (làm tròn đến hàng phần chục nghìn).',
      steps: [
        'Gọi $A$: "Chai rượu là loại I", $B$: "Ông Tùng nói chai rượu là loại I". $P(A) = 0{,}3$, $P(\\overline{A}) = 0{,}7$, $P(B|A) = 0{,}9$, $P(B|\\overline{A}) = 1 - 0{,}95 = 0{,}05$.',
        '$P(B) = 0{,}3 \\cdot 0{,}9 + 0{,}7 \\cdot 0{,}05 = 0{,}27 + 0{,}035 = 0{,}305$.',
        '$P(A|B) = \\dfrac{0{,}27}{0{,}305} \\approx 0{,}8852$.',
      ],
      answer: '$P(A|B) \\approx 0{,}8852$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho $P(A) = 0{,}6$, $P(B|A) = 0{,}5$ và $P(B|\\overline{A}) = 0{,}25$. Tính $P(B)$.',
      answer: 0.4,
      tolerance: 0.0001,
      hints: ['Tính $P(\\overline{A}) = 1 - P(A)$ trước.', 'Dùng công thức xác suất toàn phần.'],
      solution: '$P(B) = 0{,}6 \\cdot 0{,}5 + 0{,}4 \\cdot 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.',
    },
    {
      type: 'number',
      prompt: 'Với số liệu ở câu trên, tính $P(A|B)$.',
      answer: 0.75,
      tolerance: 0.0001,
      hints: ['Dùng công thức Bayes với $P(B) = 0{,}4$.'],
      solution: '$P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)} = \\dfrac{0{,}3}{0{,}4} = 0{,}75$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp I có $3$ viên bi đỏ và $2$ viên bi xanh; hộp II có $1$ viên bi đỏ và $3$ viên bi xanh. Chọn ngẫu nhiên một hộp (hai hộp có khả năng được chọn như nhau) rồi lấy ngẫu nhiên một viên bi từ hộp đó. Tính xác suất lấy được bi đỏ.',
      answer: [17, 40],
      hints: [
        'Gọi $A$: "Chọn hộp I", $B$: "Lấy được bi đỏ"; $P(A) = P(\\overline{A}) = \\dfrac{1}{2}$.',
        '$P(B|A) = \\dfrac{3}{5}$, $P(B|\\overline{A}) = \\dfrac{1}{4}$; dùng công thức xác suất toàn phần.',
      ],
      solution:
        '$P(B) = \\dfrac{1}{2} \\cdot \\dfrac{3}{5} + \\dfrac{1}{2} \\cdot \\dfrac{1}{4} = \\dfrac{3}{10} + \\dfrac{1}{8} = \\dfrac{17}{40}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với cách lấy bi ở câu trên, biết viên bi lấy được màu đỏ. Tính xác suất viên bi đó được lấy từ hộp I.',
      answer: [12, 17],
      hints: [
        'Dùng công thức Bayes: $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$ với $P(B) = \\dfrac{17}{40}$.',
      ],
      solution:
        '$P(A|B) = \\dfrac{\\frac{3}{10}}{\\frac{17}{40}} = \\dfrac{3}{10} \\cdot \\dfrac{40}{17} = \\dfrac{12}{17}$.',
    },
    {
      type: 'choice',
      prompt:
        'Gọi $A$: "Người được xét nghiệm mắc bệnh X", $B$: "Kết quả xét nghiệm dương tính". Câu "Nếu người đó mắc bệnh X thì xét nghiệm cho kết quả dương tính với xác suất $0{,}95$" cho biết điều gì?',
      options: [
        '$P(B|A) = 0{,}95$',
        '$P(A|B) = 0{,}95$',
        '$P(A) = 0{,}95$',
        '$P(\\overline{B}|\\overline{A}) = 0{,}95$',
      ],
      answer: 0,
      hints: ['Điều kiện đã biết là "người đó mắc bệnh", tức là biến cố $A$ đã xảy ra.'],
      solution:
        'Biết $A$ đã xảy ra, xác suất $B$ xảy ra là $0{,}95$: đó là $P(B|A)$. Xác suất mắc bệnh khi đã dương tính, $P(A|B)$, phải tính bằng công thức Bayes.',
    },
    {
      type: 'number',
      prompt:
        'Tỉ lệ mắc một bệnh trong cộng đồng là $1\\%$. Một xét nghiệm cho kết quả dương tính với xác suất $0{,}9$ nếu người đó mắc bệnh, và với xác suất $0{,}05$ nếu người đó không mắc bệnh. Một người có kết quả dương tính. Tính xác suất người đó mắc bệnh (làm tròn đến hàng phần nghìn).',
      answer: 0.154,
      tolerance: 0.0005,
      hints: [
        '$P(A) = 0{,}01$, $P(B|A) = 0{,}9$, $P(B|\\overline{A}) = 0{,}05$.',
        'Tính $P(B)$ bằng công thức xác suất toàn phần, rồi dùng công thức Bayes.',
      ],
      solution:
        '$P(B) = 0{,}01 \\cdot 0{,}9 + 0{,}99 \\cdot 0{,}05 = 0{,}009 + 0{,}0495 = 0{,}0585$; $P(A|B) = \\dfrac{0{,}009}{0{,}0585} = \\dfrac{2}{13} \\approx 0{,}154$.',
    },
    {
      type: 'number',
      prompt:
        'Một trường có $45\\%$ học sinh là nam. Có $80\\%$ học sinh nam và $30\\%$ học sinh nữ thích bóng đá. Chọn ngẫu nhiên một học sinh của trường. Tính xác suất học sinh đó thích bóng đá.',
      answer: 0.525,
      tolerance: 0.0001,
      hints: [
        'Gọi $A$: "Học sinh là nam", $B$: "Học sinh thích bóng đá"; $P(\\overline{A}) = 0{,}55$.',
      ],
      solution: '$P(B) = 0{,}45 \\cdot 0{,}8 + 0{,}55 \\cdot 0{,}3 = 0{,}36 + 0{,}165 = 0{,}525$.',
    },
    {
      type: 'number',
      prompt:
        'Với số liệu ở câu trên, biết học sinh được chọn thích bóng đá. Tính xác suất học sinh đó là nam (làm tròn đến hàng phần nghìn).',
      answer: 0.686,
      tolerance: 0.0005,
      hints: ['Dùng công thức Bayes với $P(B) = 0{,}525$.'],
      solution:
        '$P(A|B) = \\dfrac{0{,}45 \\cdot 0{,}8}{0{,}525} = \\dfrac{0{,}36}{0{,}525} = \\dfrac{24}{35} \\approx 0{,}686$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $P(A) = 0{,}2$, $P(B|A) = 0{,}9$ và $P(B|\\overline{A}) = 0{,}1$. Khẳng định nào đúng?',
      options: ['$P(B) = 0{,}26$', '$P(B) = 1$', '$P(B) = 0{,}18$', '$P(A|B) = 0{,}9$'],
      answer: 0,
      hints: [
        'Dùng công thức xác suất toàn phần; nhớ nhân $P(B|\\overline{A})$ với $P(\\overline{A}) = 0{,}8$.',
      ],
      solution:
        '$P(B) = 0{,}2 \\cdot 0{,}9 + 0{,}8 \\cdot 0{,}1 = 0{,}18 + 0{,}08 = 0{,}26$. Cộng thẳng $0{,}9 + 0{,}1 = 1$ là sai vì quên nhân với $P(A)$, $P(\\overline{A})$; $0{,}18$ mới chỉ là $P(AB)$; còn $P(A|B) = \\dfrac{0{,}18}{0{,}26} = \\dfrac{9}{13}$.',
    },
  ],
  takeaways: [
    'Công thức xác suất toàn phần: $P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})$.',
    'Công thức Bayes ($P(B) > 0$): $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$.',
    'Sơ đồ hình cây: nhân dọc theo nhánh, cộng các lá thuộc $B$ để được $P(B)$; $P(A|B)$ là tỉ số giữa lá $AB$ và $P(B)$.',
    'Không nhầm $P(B|A)$ với $P(A|B)$: với bệnh hiếm, xác suất mắc bệnh khi dương tính có thể nhỏ dù xét nghiệm rất chính xác.',
  ],
};
