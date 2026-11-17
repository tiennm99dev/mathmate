/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Xác suất của biến cố A với điều kiện biến cố B đã xảy ra, P(A|B) = P(AB)/P(B), cách tính bằng cách thu hẹp không gian mẫu, và công thức nhân xác suất P(AB) = P(B)·P(A|B).',
  intro:
    'Một hộp có $20$ viên bi trắng và $10$ viên bi đen. Bạn Bình lấy ngẫu nhiên một viên, không trả lại; sau đó bạn An lấy ngẫu nhiên một viên. Nếu biết Bình đã lấy được bi trắng thì xác suất An lấy được bi trắng là bao nhiêu? Thông tin "Bình lấy được bi trắng" làm thay đổi hộp bi còn lại, và vì thế làm thay đổi xác suất. Đó là xác suất có điều kiện.',
  objectives: [
    'Hiểu khái niệm xác suất của biến cố $A$ với điều kiện biến cố $B$ đã xảy ra, kí hiệu $P(A|B)$.',
    'Tính $P(A|B)$ bằng công thức $P(A|B) = \\dfrac{P(AB)}{P(B)}$ hoặc bằng cách thu hẹp không gian mẫu.',
    'Dùng công thức nhân xác suất $P(AB) = P(B) \\cdot P(A|B)$ và sơ đồ hình cây để tính xác suất.',
  ],
  sections: [
    {
      heading: 'Xác suất có điều kiện',
      blocks: [
        {
          type: 'p',
          text: 'Trở lại hộp bi ở đầu bài. Gọi $A$: "An lấy được viên bi trắng", $B$: "Bình lấy được viên bi trắng". Nếu $B$ đã xảy ra thì trong hộp còn $29$ viên bi, trong đó có $19$ viên bi trắng. Do đó xác suất An lấy được bi trắng, khi biết Bình đã lấy được bi trắng, bằng $\\dfrac{19}{29}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Cho hai biến cố $A$ và $B$. Xác suất của biến cố $A$ với điều kiện biến cố $B$ đã xảy ra được gọi là xác suất của $A$ với điều kiện $B$, kí hiệu là $P(A|B)$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính xác suất có điều kiện',
          text: 'Cho hai biến cố $A$ và $B$ bất kì, với $P(B) > 0$. Khi đó $$P(A|B) = \\dfrac{P(AB)}{P(B)}.$$',
        },
        {
          type: 'p',
          text: 'Khi các kết quả của phép thử đồng khả năng, $P(AB) = \\dfrac{n(AB)}{n(\\Omega)}$ và $P(B) = \\dfrac{n(B)}{n(\\Omega)}$, nên $$P(A|B) = \\dfrac{n(AB)}{n(B)}.$$ Nghĩa là: biết $B$ đã xảy ra, ta thu hẹp không gian mẫu thành $B$ và đếm trong đó các kết quả thuận lợi cho $A$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Với $P(B) > 0$: $P(\\overline{A}|B) = 1 - P(A|B)$. Nếu $A$ và $B$ độc lập thì việc $B$ xảy ra không ảnh hưởng tới xác suất của $A$, nên $P(A|B) = P(A)$. Nói chung $P(A|B)$ khác $P(B|A)$.',
        },
      ],
    },
    {
      heading: 'Công thức nhân xác suất',
      blocks: [
        {
          type: 'p',
          text: 'Nhân hai vế của công thức $P(A|B) = \\dfrac{P(AB)}{P(B)}$ với $P(B)$ ta được công thức nhân xác suất; đổi vai trò của $A$ và $B$ ta được dạng thứ hai.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nhân xác suất',
          text: 'Với hai biến cố $A$, $B$ bất kì, ta có $$P(AB) = P(B) \\cdot P(A|B),$$ hay $$P(AB) = P(A) \\cdot P(B|A).$$',
        },
        {
          type: 'p',
          text: 'Khi $A$ và $B$ độc lập, $P(A|B) = P(A)$ và công thức trở thành $P(AB) = P(A) \\cdot P(B)$ đã học ở lớp 11. Công thức nhân hay được dùng khi phép thử gồm hai bước nối tiếp, bước sau phụ thuộc kết quả bước trước, chẳng hạn lấy lần lượt hai viên bi không hoàn lại.',
        },
        {
          type: 'list',
          items: [
            'Sơ đồ hình cây: từ gốc tách hai nhánh $A$ và $\\overline{A}$, ghi $P(A)$ và $P(\\overline{A})$.',
            'Từ mỗi nhánh tách tiếp hai nhánh $B$ và $\\overline{B}$, ghi các xác suất có điều kiện $P(B|A)$, $P(\\overline{B}|A)$, $P(B|\\overline{A})$, $P(\\overline{B}|\\overline{A})$.',
            'Theo công thức nhân, xác suất của mỗi lá bằng tích các xác suất trên đường đi từ gốc đến lá đó, chẳng hạn $P(AB) = P(A) \\cdot P(B|A)$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng hai chiều co giãn',
    instruction:
      'Chọn tình huống, chọn biến cố $A$ rồi chọn điều kiện $B$. Các ô không thuộc $B$ bị gạch đi: không gian mẫu thu hẹp còn $B$, ô thuộc $AB$ được tô xanh lá. So sánh $P(A|B) = \\dfrac{n(AB)}{n(B)}$ với $P(A)$. Mở "Thay đổi số liệu trong bảng" để chỉnh từng ô và tìm số liệu làm cho $P(A|B) = P(A)$.',
  },
  examples: [
    {
      problem:
        'Khảo sát $100$ học sinh lớp 12 của một trường về việc đeo kính cận, kết quả như sau: nam có $18$ bạn đeo kính, $32$ bạn không đeo kính; nữ có $22$ bạn đeo kính, $28$ bạn không đeo kính. Chọn ngẫu nhiên một học sinh trong số đó. Tính xác suất học sinh đó đeo kính, biết rằng học sinh đó là nữ; và xác suất học sinh đó là nữ, biết rằng học sinh đó đeo kính.',
      steps: [
        'Gọi $A$: "Học sinh được chọn đeo kính", $B$: "Học sinh được chọn là nữ". Ta có $n(B) = 22 + 28 = 50$, $n(A) = 18 + 22 = 40$, $n(AB) = 22$.',
        'Biết học sinh là nữ, không gian mẫu thu hẹp còn $50$ bạn nữ: $P(A|B) = \\dfrac{n(AB)}{n(B)} = \\dfrac{22}{50} = 0{,}44$.',
        'Biết học sinh đeo kính, không gian mẫu thu hẹp còn $40$ bạn đeo kính: $P(B|A) = \\dfrac{n(AB)}{n(A)} = \\dfrac{22}{40} = 0{,}55$.',
      ],
      answer: '$P(A|B) = 0{,}44$ và $P(B|A) = 0{,}55$; hai xác suất có điều kiện này khác nhau.',
    },
    {
      problem:
        'Một hộp có $20$ viên bi trắng và $10$ viên bi đen. Bình lấy ngẫu nhiên một viên, không trả lại, rồi An lấy ngẫu nhiên một viên. Gọi $A$: "An lấy được bi trắng", $B$: "Bình lấy được bi trắng". Tính $P(A|B)$ theo công thức $P(A|B) = \\dfrac{P(AB)}{P(B)}$.',
      steps: [
        'Số cách lấy lần lượt hai viên bi là $n(\\Omega) = 30 \\cdot 29 = 870$.',
        'Bình lấy được bi trắng: $n(B) = 20 \\cdot 29 = 580$. Cả hai lấy được bi trắng: $n(AB) = 20 \\cdot 19 = 380$.',
        '$P(A|B) = \\dfrac{P(AB)}{P(B)} = \\dfrac{380/870}{580/870} = \\dfrac{380}{580} = \\dfrac{19}{29}$, đúng như khi lập luận trực tiếp trên hộp bi còn lại.',
      ],
      answer: '$P(A|B) = \\dfrac{19}{29}$.',
    },
    {
      problem:
        'Một hộp có $7$ chiếc bút bi xanh và $5$ chiếc bút bi đen, cùng kích thước và khối lượng. Bạn Sơn lấy ngẫu nhiên một chiếc bút, không trả lại. Sau đó bạn Tùng lấy ngẫu nhiên một chiếc bút. Tính xác suất Sơn lấy được bút đen và Tùng lấy được bút xanh.',
      steps: [
        'Gọi $A$: "Sơn lấy được bút đen", $B$: "Tùng lấy được bút xanh". Ta cần $P(AB)$.',
        '$P(A) = \\dfrac{5}{12}$. Nếu $A$ đã xảy ra, hộp còn $11$ chiếc bút, trong đó có $7$ chiếc bút xanh, nên $P(B|A) = \\dfrac{7}{11}$.',
        'Theo công thức nhân xác suất: $P(AB) = P(A) \\cdot P(B|A) = \\dfrac{5}{12} \\cdot \\dfrac{7}{11} = \\dfrac{35}{132}$.',
      ],
      answer: '$P(AB) = \\dfrac{35}{132}$.',
    },
    {
      problem:
        'Cho hai biến cố $A$, $B$ với $P(A) = 0{,}6$, $P(B) = 0{,}5$ và $P(A \\cup B) = 0{,}8$. Tính $P(A|B)$ và $P(B|A)$. Hai biến cố $A$ và $B$ có độc lập không?',
      steps: [
        'Theo công thức cộng xác suất: $P(AB) = P(A) + P(B) - P(A \\cup B) = 0{,}6 + 0{,}5 - 0{,}8 = 0{,}3$.',
        '$P(A|B) = \\dfrac{P(AB)}{P(B)} = \\dfrac{0{,}3}{0{,}5} = 0{,}6$ và $P(B|A) = \\dfrac{P(AB)}{P(A)} = \\dfrac{0{,}3}{0{,}6} = 0{,}5$.',
        'Vì $P(A|B) = 0{,}6 = P(A)$ (cũng vậy, $P(AB) = 0{,}3 = P(A) \\cdot P(B)$) nên $A$ và $B$ độc lập.',
      ],
      answer: '$P(A|B) = 0{,}6$, $P(B|A) = 0{,}5$; $A$ và $B$ độc lập.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho hai biến cố $A$, $B$ với $P(B) = 0{,}8$ và $P(AB) = 0{,}2$. Tính $P(A|B)$.',
      answer: 0.25,
      tolerance: 0.0001,
      hints: ['Dùng công thức $P(A|B) = \\dfrac{P(AB)}{P(B)}$.'],
      solution: '$P(A|B) = \\dfrac{0{,}2}{0{,}8} = 0{,}25$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(A) = 0{,}4$ và $P(B|A) = 0{,}7$. Tính $P(AB)$.',
      answer: 0.28,
      tolerance: 0.0001,
      hints: ['Dùng công thức nhân xác suất dạng $P(AB) = P(A) \\cdot P(B|A)$.'],
      solution: '$P(AB) = P(A) \\cdot P(B|A) = 0{,}4 \\cdot 0{,}7 = 0{,}28$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(B) > 0$ và $P(A|B) = 0{,}35$. Tính $P(\\overline{A}|B)$.',
      answer: 0.65,
      tolerance: 0.0001,
      hints: [
        'Khi $B$ đã xảy ra, $A$ và $\\overline{A}$ vẫn là hai biến cố đối nhau trong không gian mẫu thu hẹp.',
      ],
      solution: '$P(\\overline{A}|B) = 1 - P(A|B) = 1 - 0{,}35 = 0{,}65$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối hai lần. Biết rằng tổng số chấm hai lần gieo bằng $8$, tính xác suất lần gieo đầu xuất hiện mặt $6$ chấm.',
      answer: [1, 5],
      hints: [
        'Thu hẹp không gian mẫu: liệt kê các kết quả có tổng số chấm bằng $8$.',
        'Có $5$ kết quả $(2; 6)$, $(3; 5)$, $(4; 4)$, $(5; 3)$, $(6; 2)$; đếm các kết quả có lần đầu ra $6$ chấm.',
      ],
      solution:
        'Gọi $B$: "Tổng số chấm bằng $8$", $A$: "Lần đầu ra mặt $6$ chấm". $B = \\{(2; 6), (3; 5), (4; 4), (5; 3), (6; 2)\\}$ nên $n(B) = 5$; $AB = \\{(6; 2)\\}$ nên $n(AB) = 1$. Vậy $P(A|B) = \\dfrac{1}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $6$ viên bi đỏ và $4$ viên bi xanh. Lấy ngẫu nhiên lần lượt hai viên bi, không hoàn lại. Tính xác suất cả hai viên bi lấy được đều màu đỏ.',
      answer: [1, 3],
      hints: [
        'Gọi $A$: "Viên thứ nhất màu đỏ", $B$: "Viên thứ hai màu đỏ"; cần $P(AB) = P(A) \\cdot P(B|A)$.',
        'Sau khi lấy một viên đỏ, hộp còn $9$ viên, trong đó $5$ viên đỏ.',
      ],
      solution:
        '$P(A) = \\dfrac{6}{10}$, $P(B|A) = \\dfrac{5}{9}$, nên $P(AB) = \\dfrac{6}{10} \\cdot \\dfrac{5}{9} = \\dfrac{30}{90} = \\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với số liệu khảo sát $100$ học sinh ở Ví dụ 1 (nam: $18$ đeo kính, $32$ không đeo kính; nữ: $22$ đeo kính, $28$ không đeo kính), chọn ngẫu nhiên một học sinh. Biết học sinh đó không đeo kính, tính xác suất học sinh đó là nam.',
      answer: [8, 15],
      simplest: true,
      hints: [
        'Không gian mẫu thu hẹp còn các bạn không đeo kính: $32 + 28$ bạn.',
        'Trong đó có $32$ bạn nam. Rút gọn phân số.',
      ],
      solution:
        'Có $32 + 28 = 60$ bạn không đeo kính, trong đó $32$ bạn nam. Xác suất cần tìm là $\\dfrac{32}{60} = \\dfrac{8}{15}$.',
    },
    {
      type: 'choice',
      prompt: 'Với hai biến cố $A$, $B$ và $P(B) > 0$, công thức nào đúng?',
      options: [
        '$P(A|B) = \\dfrac{P(AB)}{P(B)}$',
        '$P(A|B) = \\dfrac{P(AB)}{P(A)}$',
        '$P(A|B) = \\dfrac{P(A)}{P(B)}$',
        '$P(A|B) = P(A) \\cdot P(B)$',
      ],
      answer: 0,
      hints: ['Điều kiện $B$ đã xảy ra, nên $B$ trở thành không gian mẫu mới và nằm ở mẫu số.'],
      solution:
        'Theo định nghĩa, $P(A|B) = \\dfrac{P(AB)}{P(B)}$. Công thức có $P(A)$ ở mẫu số là $P(B|A)$; công thức $P(A) \\cdot P(B)$ chỉ là $P(AB)$ khi $A$, $B$ độc lập.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(A) = 0{,}5$, $P(B) = 0{,}4$ và $P(A|B) = 0{,}3$. Tính $P(B|A)$.',
      answer: 0.24,
      tolerance: 0.0001,
      hints: [
        'Tính $P(AB)$ trước bằng công thức nhân $P(AB) = P(B) \\cdot P(A|B)$.',
        'Sau đó $P(B|A) = \\dfrac{P(AB)}{P(A)}$.',
      ],
      solution:
        '$P(AB) = P(B) \\cdot P(A|B) = 0{,}4 \\cdot 0{,}3 = 0{,}12$, nên $P(B|A) = \\dfrac{0{,}12}{0{,}5} = 0{,}24$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $P(A) = 0{,}3$, $P(B) = 0{,}5$ và $P(A|B) = 0{,}3$. Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ độc lập',
        '$A$ và $B$ xung khắc',
        '$P(AB) = 0{,}6$',
        '$P(B|A) = 0{,}3$',
      ],
      answer: 0,
      hints: ['So sánh $P(A|B)$ với $P(A)$, rồi tính $P(AB) = P(B) \\cdot P(A|B)$.'],
      solution:
        '$P(A|B) = 0{,}3 = P(A)$ nên $A$ và $B$ độc lập. $P(AB) = 0{,}5 \\cdot 0{,}3 = 0{,}15 \\ne 0$, nên $A$, $B$ không xung khắc; $P(B|A) = \\dfrac{0{,}15}{0{,}3} = 0{,}5$.',
    },
  ],
  takeaways: [
    '$P(A|B)$ là xác suất của $A$ khi biết $B$ đã xảy ra; với $P(B) > 0$: $P(A|B) = \\dfrac{P(AB)}{P(B)}$.',
    'Khi các kết quả đồng khả năng: $P(A|B) = \\dfrac{n(AB)}{n(B)}$, tức là thu hẹp không gian mẫu thành $B$.',
    'Công thức nhân xác suất: $P(AB) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)$.',
    'Nếu $A$, $B$ độc lập thì $P(A|B) = P(A)$; nói chung $P(A|B) \\ne P(B|A)$.',
  ],
};
