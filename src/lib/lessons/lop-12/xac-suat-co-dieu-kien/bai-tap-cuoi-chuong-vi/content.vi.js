/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VI: xác suất có điều kiện, công thức nhân xác suất, công thức xác suất toàn phần và công thức Bayes; giải các tình huống thực tế bằng sơ đồ cây và luyện tập với bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương VI trả lời câu hỏi: khi biết thêm một thông tin, xác suất thay đổi thế nào? Xác suất có điều kiện và công thức nhân giúp tính xác suất của các phép thử nhiều bước; công thức xác suất toàn phần tính xác suất qua hai trường hợp; công thức Bayes "đi ngược" từ kết quả quan sát được về nguyên nhân. Bài ôn tập này hệ thống lại các công thức, cho em tự lập sơ đồ cây cho các tình huống thực tế, và một bộ đề tự sinh chỉ ra phần nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các công thức tính xác suất có điều kiện, công thức nhân, công thức xác suất toàn phần và công thức Bayes.',
    'Lập sơ đồ hình cây từ một tình huống thực tế và đọc ra các xác suất cần tính.',
    'Phân biệt $P(A|B)$ với $P(B|A)$ và giải thích kết quả trong bối cảnh thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Công thức', 'Nội dung', 'Dùng khi'],
          rows: [
            [
              'Xác suất có điều kiện',
              '$P(A|B) = \\dfrac{P(AB)}{P(B)}$, $P(B) > 0$; đồng khả năng: $P(A|B) = \\dfrac{n(AB)}{n(B)}$',
              'đã biết $B$ xảy ra: thu hẹp không gian mẫu thành $B$',
            ],
            [
              'Công thức nhân',
              '$P(AB) = P(A) \\cdot P(B|A) = P(B) \\cdot P(A|B)$',
              'phép thử nhiều bước, bước sau phụ thuộc bước trước',
            ],
            [
              'Xác suất toàn phần',
              '$P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})$',
              '$B$ xảy ra theo hai trường hợp $A$ và $\\overline{A}$',
            ],
            [
              'Công thức Bayes',
              '$P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$, $P(B) > 0$',
              'biết kết quả $B$, tìm xác suất của "nguyên nhân" $A$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Sơ đồ hình cây: nhánh cấp một ghi $P(A)$, $P(\\overline{A})$; nhánh cấp hai ghi các xác suất có điều kiện; xác suất một lá là tích dọc theo nhánh.',
            '$P(B)$ là tổng các lá thuộc $B$; $P(A|B)$ là tỉ số giữa lá $AB$ và $P(B)$.',
            '$P(\\overline{A}|B) = 1 - P(A|B)$; nếu $A$, $B$ độc lập thì $P(A|B) = P(A)$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nhầm $P(A|B)$ với $P(B|A)$ (chẳng hạn coi xác suất dương tính khi mắc bệnh là xác suất mắc bệnh khi dương tính); quên nhân với $P(A)$, $P(\\overline{A})$ trong công thức xác suất toàn phần; dùng $P(A) \\cdot P(B)$ cho hai biến cố không độc lập, chẳng hạn khi lấy bi không hoàn lại; đề cho $P(\\overline{B}|\\overline{A})$ mà quên đổi sang $P(B|\\overline{A}) = 1 - P(\\overline{B}|\\overline{A})$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự luyện',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có $12$ câu sinh ngẫu nhiên, ba câu cho mỗi kĩ năng: bảng hai chiều, công thức nhân, công thức xác suất toàn phần và công thức Bayes. Nhập xác suất dạng số thập phân (dấu phẩy) hoặc phân số $a/b$. Trả lời sai lần đầu em được gợi ý và thử lại; bản đồ kĩ năng tô màu theo lần trả lời đầu tiên.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Tình huống thực tế và sơ đồ cây',
    instruction:
      'Chọn một tình huống. Đọc đề, xác định $P(A)$, $P(B|A)$, $P(B|\\overline{A})$ và điền vào ba ô đầu: mỗi xác suất đúng hiện lên trên sơ đồ cây. Sau đó tính $P(B)$ bằng công thức xác suất toàn phần và $P(A|B)$ bằng công thức Bayes (có thể làm tròn đến hàng phần nghìn), rồi bấm "Kiểm tra".',
  },
  examples: [
    {
      problem:
        'Một nhà máy có hai dây chuyền. Dây chuyền I làm ra $55\\%$ số sản phẩm, trong đó $80\\%$ đạt loại A; dây chuyền II làm ra $45\\%$ số sản phẩm, trong đó $90\\%$ đạt loại A. Chọn ngẫu nhiên một sản phẩm của nhà máy. a) Tính xác suất sản phẩm đạt loại A. b) Biết sản phẩm đạt loại A, tính xác suất nó do dây chuyền II làm ra (làm tròn đến hàng phần nghìn).',
      steps: [
        'Gọi $A$: "Sản phẩm do dây chuyền I làm ra", $B$: "Sản phẩm đạt loại A". $P(A) = 0{,}55$, $P(\\overline{A}) = 0{,}45$, $P(B|A) = 0{,}8$, $P(B|\\overline{A}) = 0{,}9$.',
        'a) $P(B) = 0{,}55 \\cdot 0{,}8 + 0{,}45 \\cdot 0{,}9 = 0{,}44 + 0{,}405 = 0{,}845$.',
        'b) Cần $P(\\overline{A}|B) = \\dfrac{P(\\overline{A}) \\cdot P(B|\\overline{A})}{P(B)} = \\dfrac{0{,}405}{0{,}845} \\approx 0{,}479$.',
      ],
      answer: 'a) $0{,}845$; b) khoảng $0{,}479$.',
    },
    {
      problem:
        'Một hộp có $10$ lá thăm, trong đó có $3$ lá thăm trúng thưởng. An rút ngẫu nhiên một lá (không trả lại), sau đó Bình rút ngẫu nhiên một lá. Tính xác suất Bình rút được thăm trúng thưởng. Người rút sau có thiệt không?',
      steps: [
        'Gọi $A$: "An rút được thăm trúng", $B$: "Bình rút được thăm trúng". $P(A) = \\dfrac{3}{10}$, $P(\\overline{A}) = \\dfrac{7}{10}$.',
        'Nếu An trúng, còn $9$ lá với $2$ lá trúng: $P(B|A) = \\dfrac{2}{9}$. Nếu An không trúng, còn $9$ lá với $3$ lá trúng: $P(B|\\overline{A}) = \\dfrac{3}{9}$.',
        '$P(B) = \\dfrac{3}{10} \\cdot \\dfrac{2}{9} + \\dfrac{7}{10} \\cdot \\dfrac{3}{9} = \\dfrac{6}{90} + \\dfrac{21}{90} = \\dfrac{27}{90} = \\dfrac{3}{10}$.',
        '$P(B) = P(A) = \\dfrac{3}{10}$: rút trước hay rút sau đều có cùng cơ hội trúng thưởng.',
      ],
      answer: '$P(B) = \\dfrac{3}{10}$; người rút sau không thiệt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho $P(A) = 0{,}4$, $P(B) = 0{,}5$ và $P(AB) = 0{,}2$. Giá trị của $P(A|B)$ là',
      options: ['$0{,}4$', '$0{,}5$', '$0{,}2$', '$0{,}8$'],
      answer: 0,
      hints: ['$P(A|B) = \\dfrac{P(AB)}{P(B)}$.'],
      solution:
        '$P(A|B) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$. Giá trị $0{,}5$ là $P(B|A) = \\dfrac{0{,}2}{0{,}4}$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(A) = 0{,}5$, $P(B) = 0{,}6$ và $P(A \\cup B) = 0{,}8$. Tính $P(B|A)$.',
      answer: 0.6,
      tolerance: 0.0001,
      hints: ['Tính $P(AB)$ bằng công thức cộng xác suất.', '$P(B|A) = \\dfrac{P(AB)}{P(A)}$.'],
      solution:
        '$P(AB) = 0{,}5 + 0{,}6 - 0{,}8 = 0{,}3$, nên $P(B|A) = \\dfrac{0{,}3}{0{,}5} = 0{,}6$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối hai lần. Biết rằng có ít nhất một lần xuất hiện mặt $6$ chấm, tính xác suất tổng số chấm hai lần gieo không nhỏ hơn $10$.',
      answer: [5, 11],
      hints: [
        'Biến cố "có ít nhất một lần ra $6$ chấm" có $36 - 25 = 11$ kết quả.',
        'Trong $11$ kết quả đó, đếm các kết quả có tổng $\\ge 10$.',
      ],
      solution:
        'Gọi $B$: "Có ít nhất một lần ra $6$ chấm", $n(B) = 36 - 5 \\cdot 5 = 11$. Các kết quả thuộc $B$ có tổng không nhỏ hơn $10$: $(4; 6)$, $(6; 4)$, $(5; 6)$, $(6; 5)$, $(6; 6)$, nên $n(AB) = 5$ và $P(A|B) = \\dfrac{5}{11}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $5$ viên bi trắng và $3$ viên bi đen. Lấy ngẫu nhiên lần lượt hai viên bi, không hoàn lại. Tính xác suất viên bi thứ hai màu trắng.',
      answer: [5, 8],
      hints: [
        'Xét hai trường hợp: viên thứ nhất trắng hoặc đen.',
        '$P(B) = \\dfrac{5}{8} \\cdot \\dfrac{4}{7} + \\dfrac{3}{8} \\cdot \\dfrac{5}{7}$.',
      ],
      solution:
        'Gọi $A$: "Viên thứ nhất trắng", $B$: "Viên thứ hai trắng". $P(B) = \\dfrac{5}{8} \\cdot \\dfrac{4}{7} + \\dfrac{3}{8} \\cdot \\dfrac{5}{7} = \\dfrac{20}{56} + \\dfrac{15}{56} = \\dfrac{35}{56} = \\dfrac{5}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với cách lấy bi ở câu trên, biết viên bi thứ hai màu trắng. Tính xác suất viên bi thứ nhất cũng màu trắng.',
      answer: [4, 7],
      hints: ['Dùng công thức Bayes với $P(B) = \\dfrac{35}{56}$.'],
      solution:
        '$P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)} = \\dfrac{20/56}{35/56} = \\dfrac{20}{35} = \\dfrac{4}{7}$.',
    },
    {
      type: 'number',
      prompt:
        'Xác suất một ngày trời mưa là $0{,}25$. Nếu trời mưa, xác suất đường bị tắc là $0{,}6$; nếu không mưa, xác suất đó là $0{,}2$. Tính xác suất đường bị tắc trong một ngày.',
      answer: 0.3,
      tolerance: 0.0001,
      hints: ['Dùng công thức xác suất toàn phần với $P(\\overline{A}) = 0{,}75$.'],
      solution: '$P(B) = 0{,}25 \\cdot 0{,}6 + 0{,}75 \\cdot 0{,}2 = 0{,}15 + 0{,}15 = 0{,}3$.',
    },
    {
      type: 'number',
      prompt: 'Với số liệu ở câu trên, biết hôm đó đường bị tắc. Tính xác suất hôm đó trời mưa.',
      answer: 0.5,
      tolerance: 0.0001,
      hints: ['Dùng công thức Bayes với $P(B) = 0{,}3$.'],
      solution: '$P(A|B) = \\dfrac{0{,}25 \\cdot 0{,}6}{0{,}3} = \\dfrac{0{,}15}{0{,}3} = 0{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Với hai biến cố $A$, $B$ có $P(A) > 0$, $P(B) > 0$, đẳng thức nào luôn đúng?',
      options: [
        '$P(A|B) \\cdot P(B) = P(B|A) \\cdot P(A)$',
        '$P(A|B) = P(B|A)$',
        '$P(A|B) + P(B|A) = 1$',
        '$P(A|B) = P(A) \\cdot P(B)$',
      ],
      answer: 0,
      hints: ['Cả hai vế của đẳng thức đúng đều bằng $P(AB)$ theo công thức nhân.'],
      solution:
        'Theo công thức nhân, $P(A|B) \\cdot P(B) = P(AB) = P(B|A) \\cdot P(A)$. Nói chung $P(A|B) \\ne P(B|A)$; tổng của chúng không nhất thiết bằng $1$; còn $P(A) \\cdot P(B)$ là $P(AB)$ khi $A$, $B$ độc lập, không phải $P(A|B)$.',
    },
    {
      type: 'multi',
      prompt:
        'Hai biến cố $A$, $B$ độc lập, $P(A) > 0$, $P(B) > 0$. Chọn tất cả các đẳng thức đúng.',
      options: [
        '$P(A|B) = P(A)$',
        '$P(AB) = P(A) \\cdot P(B)$',
        '$P(\\overline{A}|B) = 1 - P(A)$',
        '$P(A|B) = P(B)$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Độc lập nghĩa là việc $B$ xảy ra không ảnh hưởng tới xác suất của $A$.',
        'Nhớ rằng $P(\\overline{A}|B) = 1 - P(A|B)$.',
      ],
      solution:
        'Độc lập nên $P(A|B) = P(A)$, do đó $P(AB) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B)$ và $P(\\overline{A}|B) = 1 - P(A|B) = 1 - P(A)$. Đẳng thức $P(A|B) = P(B)$ chỉ đúng khi tình cờ $P(A) = P(B)$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng bán bóng đèn của hai hãng X và Y; hãng X chiếm $70\\%$, hãng Y chiếm $30\\%$ số bóng. Tỉ lệ bóng hỏng của hãng X là $2\\%$, của hãng Y là $5\\%$. Mua ngẫu nhiên một bóng thì thấy bóng hỏng. Tính xác suất bóng đó của hãng Y (làm tròn đến hàng phần nghìn).',
      answer: 0.517,
      tolerance: 0.0005,
      hints: [
        'Gọi $A$: "Bóng của hãng X", $B$: "Bóng hỏng"; cần $P(\\overline{A}|B)$.',
        '$P(B) = 0{,}7 \\cdot 0{,}02 + 0{,}3 \\cdot 0{,}05$.',
      ],
      solution:
        '$P(B) = 0{,}014 + 0{,}015 = 0{,}029$; $P(\\overline{A}|B) = \\dfrac{P(\\overline{A}) \\cdot P(B|\\overline{A})}{P(B)} = \\dfrac{0{,}015}{0{,}029} = \\dfrac{15}{29} \\approx 0{,}517$.',
    },
    {
      type: 'number',
      prompt:
        'Tỉ lệ mắc một bệnh là $10\\%$. Xét nghiệm cho kết quả dương tính với xác suất $0{,}9$ nếu người đó mắc bệnh và $0{,}2$ nếu không mắc bệnh. Một người có kết quả âm tính. Tính xác suất người đó vẫn mắc bệnh (làm tròn đến hàng phần nghìn).',
      answer: 0.014,
      tolerance: 0.0005,
      hints: [
        'Gọi $B$: "Dương tính"; cần $P(A|\\overline{B})$, với $P(\\overline{B}|A) = 0{,}1$, $P(\\overline{B}|\\overline{A}) = 0{,}8$.',
        'Tính $P(\\overline{B})$ bằng công thức xác suất toàn phần.',
      ],
      solution:
        '$P(\\overline{B}) = 0{,}1 \\cdot 0{,}1 + 0{,}9 \\cdot 0{,}8 = 0{,}01 + 0{,}72 = 0{,}73$; $P(A|\\overline{B}) = \\dfrac{0{,}01}{0{,}73} = \\dfrac{1}{73} \\approx 0{,}014$.',
    },
    {
      type: 'fraction',
      prompt:
        'Trong $200$ khách hàng của một siêu thị có $120$ người thanh toán bằng thẻ, trong đó $80$ người mua hàng trên $500$ nghìn đồng; $80$ người còn lại trả tiền mặt, trong đó $30$ người mua hàng trên $500$ nghìn đồng. Chọn ngẫu nhiên một khách hàng. Biết khách hàng đó mua hàng trên $500$ nghìn đồng, tính xác suất người đó thanh toán bằng thẻ.',
      answer: [8, 11],
      hints: ['Thu hẹp không gian mẫu: có $80 + 30$ khách mua hàng trên $500$ nghìn đồng.'],
      solution:
        'Có $80 + 30 = 110$ khách mua hàng trên $500$ nghìn đồng, trong đó $80$ người thanh toán bằng thẻ. Xác suất cần tìm là $\\dfrac{80}{110} = \\dfrac{8}{11}$.',
    },
  ],
  takeaways: [
    'Biết $B$ đã xảy ra: $P(A|B) = \\dfrac{P(AB)}{P(B)}$, tức là thu hẹp không gian mẫu thành $B$.',
    'Công thức nhân $P(AB) = P(A) \\cdot P(B|A)$ dùng cho phép thử nhiều bước phụ thuộc nhau.',
    'Hai trường hợp $A$, $\\overline{A}$: $P(B) = P(A) \\cdot P(B|A) + P(\\overline{A}) \\cdot P(B|\\overline{A})$.',
    'Đi ngược từ kết quả về nguyên nhân bằng công thức Bayes: $P(A|B) = \\dfrac{P(A) \\cdot P(B|A)}{P(B)}$.',
  ],
};
