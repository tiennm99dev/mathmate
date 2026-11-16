/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định lí côsin, định lí sin, giải tam giác và ứng dụng đo đạc, các công thức tính diện tích tam giác: nửa tích hai cạnh nhân sin góc xen giữa, công thức Heron, abc/4R và pr.',
  intro:
    'Muốn biết khoảng cách giữa hai điểm ở hai bờ hồ, ta không thể kéo thước qua mặt nước. Nhưng nếu đứng ở một điểm thứ ba, đo được hai khoảng cách tới hai điểm ấy và góc giữa chúng, ta tính ra ngay khoảng cách cần tìm. Bài này cho em những hệ thức nối cạnh và góc của một tam giác bất kì, không chỉ tam giác vuông.',
  objectives: [
    'Phát biểu và dùng định lí côsin, định lí sin trong tam giác.',
    'Giải tam giác khi biết hai cạnh và góc xen giữa, ba cạnh, hoặc một cạnh và hai góc kề.',
    'Tính diện tích tam giác bằng công thức $S = \\tfrac{1}{2}bc\\sin A$, công thức Heron, $S = \\dfrac{abc}{4R}$ và $S = pr$.',
    'Vận dụng giải tam giác vào các bài toán đo đạc thực tế.',
  ],
  sections: [
    {
      heading: 'Kí hiệu',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác $ABC$, ta kí hiệu: $a = BC$, $b = CA$, $c = AB$ là độ dài các cạnh đối diện với các góc $A$, $B$, $C$; $R$ là bán kính đường tròn ngoại tiếp, $r$ là bán kính đường tròn nội tiếp, $p = \\dfrac{a + b + c}{2}$ là nửa chu vi và $S$ là diện tích tam giác.',
        },
      ],
    },
    {
      heading: 'Định lí côsin',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí côsin',
          text: 'Trong tam giác $ABC$: $a^2 = b^2 + c^2 - 2bc\\cos A$; $b^2 = c^2 + a^2 - 2ca\\cos B$; $c^2 = a^2 + b^2 - 2ab\\cos C$.',
        },
        {
          type: 'p',
          text: 'Khi $A = 90^\\circ$ thì $\\cos A = 0$ và định lí côsin trở thành định lí Pythagore $a^2 = b^2 + c^2$. Góc $A$ nhọn thì $a^2 < b^2 + c^2$, góc $A$ tù thì $a^2 > b^2 + c^2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hệ quả',
          text: 'Biết ba cạnh, ta tính được các góc: $\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$; $\\cos B = \\dfrac{c^2 + a^2 - b^2}{2ca}$; $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$.',
        },
      ],
    },
    {
      heading: 'Định lí sin',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí sin',
          text: 'Trong tam giác $ABC$: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.',
        },
        {
          type: 'p',
          text: 'Từ đó $a = 2R\\sin A$, $b = 2R\\sin B$, $c = 2R\\sin C$: trong một tam giác, cạnh lớn hơn đối diện với góc lớn hơn. Định lí sin dùng khi biết một cạnh và hai góc, hoặc để tìm bán kính đường tròn ngoại tiếp.',
        },
      ],
    },
    {
      heading: 'Giải tam giác và ứng dụng thực tế',
      blocks: [
        {
          type: 'p',
          text: 'Giải tam giác là tìm các cạnh và các góc chưa biết của tam giác khi đã biết một số yếu tố của nó. Ba trường hợp thường gặp:',
        },
        {
          type: 'table',
          head: ['Biết', 'Cách giải'],
          rows: [
            [
              'Hai cạnh và góc xen giữa ($b$, $c$, $A$)',
              'Định lí côsin cho cạnh $a$, rồi hệ quả định lí côsin (hoặc định lí sin) cho góc $B$, $C$.',
            ],
            ['Ba cạnh $a$, $b$, $c$', 'Hệ quả định lí côsin cho từng góc.'],
            [
              'Một cạnh và hai góc kề ($a$, $B$, $C$)',
              '$A = 180^\\circ - B - C$, rồi định lí sin cho hai cạnh còn lại.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong đo đạc, khoảng cách và góc đo được (bằng thước dây, giác kế) đều là số gần đúng. Ta làm tròn kết quả cuối cùng theo yêu cầu, còn các bước trung gian nên giữ nhiều chữ số hoặc giữ giá trị trong máy tính.',
        },
      ],
    },
    {
      heading: 'Công thức tính diện tích tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Kẻ đường cao $BH$ từ $B$: $BH = c\\sin A$ (cả khi $A$ tù, vì $\\sin(180^\\circ - A) = \\sin A$). Vì $S = \\tfrac{1}{2} \\cdot b \\cdot BH$ nên:',
        },
        {
          type: 'tex',
          tex: 'S = \\frac{1}{2}bc\\sin A = \\frac{1}{2}ca\\sin B = \\frac{1}{2}ab\\sin C',
        },
        {
          type: 'p',
          text: 'Thay $\\sin A = \\dfrac{a}{2R}$ ta được $S = \\dfrac{abc}{4R}$. Chia tam giác thành ba tam giác nhỏ có chung đỉnh là tâm $I$ của đường tròn nội tiếp, mỗi tam giác có chiều cao $r$, ta được $S = \\tfrac{1}{2}(a + b + c)r = pr$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức Heron',
          text: 'Diện tích tam giác có ba cạnh $a$, $b$, $c$ và nửa chu vi $p$ là $S = \\sqrt{p(p - a)(p - b)(p - c)}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tam giác kéo được',
    instruction:
      'Kéo ba đỉnh $A$, $B$, $C$ (hoặc chọn một đỉnh rồi dùng phím mũi tên). Mỗi ô lưới là $1$ cm. Chọn định lí côsin, định lí sin hoặc diện tích để xem hai vế được tính lại theo số đo mới; hai vế luôn bằng nhau.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ có $\\widehat{A} = 60^\\circ$, $AB = 2$ cm, $AC = 3$ cm. Tính độ dài cạnh $BC$.',
      steps: [
        'Hai cạnh và góc xen giữa đã biết: $c = AB = 2$, $b = AC = 3$, $A = 60^\\circ$.',
        'Theo định lí côsin: $BC^2 = b^2 + c^2 - 2bc\\cos A = 9 + 4 - 2 \\cdot 3 \\cdot 2 \\cdot \\dfrac{1}{2} = 7$.',
      ],
      answer: '$BC = \\sqrt{7} \\approx 2{,}65$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ có $\\widehat{A} = 120^\\circ$, $\\widehat{B} = 30^\\circ$ và $AB = 10$. Tính $\\widehat{C}$, các cạnh $a$, $b$ và bán kính $R$.',
      steps: [
        '$\\widehat{C} = 180^\\circ - 120^\\circ - 30^\\circ = 30^\\circ$.',
        'Theo định lí sin: $\\dfrac{c}{\\sin C} = \\dfrac{10}{\\sin 30^\\circ} = 20 = 2R$, nên $R = 10$.',
        '$a = 2R\\sin A = 20 \\cdot \\dfrac{\\sqrt{3}}{2} = 10\\sqrt{3}$ và $b = 2R\\sin B = 20 \\cdot \\dfrac{1}{2} = 10$.',
      ],
      answer: '$\\widehat{C} = 30^\\circ$, $a = 10\\sqrt{3}$, $b = 10$, $R = 10$.',
    },
    {
      problem:
        'Giải tam giác $ABC$ biết $b = 12$, $\\widehat{A} = 100^\\circ$, $\\widehat{C} = 60^\\circ$ (làm tròn cạnh đến hàng phần mười).',
      steps: [
        '$\\widehat{B} = 180^\\circ - 100^\\circ - 60^\\circ = 20^\\circ$.',
        'Theo định lí sin: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{12}{\\sin 20^\\circ} \\approx 35{,}085$.',
        '$a \\approx 35{,}085 \\cdot \\sin 100^\\circ \\approx 34{,}6$ và $c \\approx 35{,}085 \\cdot \\sin 60^\\circ \\approx 30{,}4$.',
      ],
      answer: '$\\widehat{B} = 20^\\circ$, $a \\approx 34{,}6$, $c \\approx 30{,}4$.',
    },
    {
      problem:
        'Hai điểm $A$, $B$ ở hai bờ một cái hồ. Từ điểm $C$ trên bờ, người ta đo được $CA = 200$ m, $CB = 180$ m và $\\widehat{ACB} = 50^\\circ$. Tính khoảng cách $AB$ (làm tròn đến hàng phần mười của mét).',
      steps: [
        'Trong tam giác $ABC$ đã biết hai cạnh $CA$, $CB$ và góc xen giữa $C$.',
        'Định lí côsin: $AB^2 = 200^2 + 180^2 - 2 \\cdot 200 \\cdot 180 \\cdot \\cos 50^\\circ \\approx 72\\,400 - 46\\,280{,}7 = 26\\,119{,}3$.',
        '$AB \\approx \\sqrt{26\\,119{,}3} \\approx 161{,}6$.',
      ],
      answer: '$AB \\approx 161{,}6$ m.',
    },
    {
      problem:
        'Tam giác $ABC$ có $a = 13$, $b = 14$, $c = 15$. Tính diện tích $S$, bán kính $R$ và $r$.',
      steps: [
        '$p = \\dfrac{13 + 14 + 15}{2} = 21$.',
        'Công thức Heron: $S = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = \\sqrt{7\\,056} = 84$.',
        '$R = \\dfrac{abc}{4S} = \\dfrac{13 \\cdot 14 \\cdot 15}{4 \\cdot 84} = \\dfrac{2\\,730}{336} = 8{,}125$.',
        '$r = \\dfrac{S}{p} = \\dfrac{84}{21} = 4$.',
      ],
      answer: '$S = 84$, $R = 8{,}125$, $r = 4$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có $b = 5$, $c = 8$ và $\\widehat{A} = 60^\\circ$. Tính cạnh $a$.',
      answer: 7,
      hints: [
        'Biết hai cạnh và góc xen giữa: dùng định lí côsin.',
        '$\\cos 60^\\circ = \\dfrac{1}{2}$.',
      ],
      solution: '$a^2 = 25 + 64 - 2 \\cdot 5 \\cdot 8 \\cdot \\dfrac{1}{2} = 49$, nên $a = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có $a = 7$, $b = 3$, $c = 5$. Tính số đo góc $A$ (theo độ).',
      answer: 120,
      hints: ['Dùng hệ quả: $\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$.'],
      solution:
        '$\\cos A = \\dfrac{9 + 25 - 49}{2 \\cdot 3 \\cdot 5} = \\dfrac{-15}{30} = -\\dfrac{1}{2}$, nên $\\widehat{A} = 120^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ có $a^2 > b^2 + c^2$. Khi đó góc $A$ là',
      options: ['góc tù', 'góc nhọn', 'góc vuông', 'chưa xác định được'],
      answer: 0,
      hints: ['So sánh với $a^2 = b^2 + c^2 - 2bc\\cos A$: dấu của $\\cos A$ là gì?'],
      solution: '$a^2 - b^2 - c^2 = -2bc\\cos A > 0$ nên $\\cos A < 0$, tức là góc $A$ tù.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $a = 6$ và $\\widehat{A} = 30^\\circ$. Tính bán kính $R$ của đường tròn ngoại tiếp.',
      answer: 6,
      hints: ['Định lí sin: $\\dfrac{a}{\\sin A} = 2R$.'],
      solution: '$2R = \\dfrac{6}{\\sin 30^\\circ} = 12$, nên $R = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $a = 10$, $\\widehat{B} = 45^\\circ$, $\\widehat{C} = 75^\\circ$. Tính cạnh $b$ (làm tròn đến hàng phần trăm).',
      answer: 8.16,
      tolerance: 0.01,
      hints: [
        'Tìm góc $A$ trước.',
        '$\\widehat{A} = 60^\\circ$; dùng định lí sin $\\dfrac{b}{\\sin B} = \\dfrac{a}{\\sin A}$.',
      ],
      solution:
        '$\\widehat{A} = 180^\\circ - 45^\\circ - 75^\\circ = 60^\\circ$. $b = \\dfrac{a\\sin B}{\\sin A} = \\dfrac{10 \\cdot \\frac{\\sqrt{2}}{2}}{\\frac{\\sqrt{3}}{2}} = \\dfrac{10\\sqrt{6}}{3} \\approx 8{,}16$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 15$, $BC = 35$ và $\\widehat{B} = 60^\\circ$. Tính $AC$ (làm tròn đến hàng phần trăm).',
      answer: 30.41,
      tolerance: 0.01,
      hints: ['$AC$ đối diện góc $B$; hai cạnh kề góc $B$ là $AB$ và $BC$.'],
      solution:
        '$AC^2 = 15^2 + 35^2 - 2 \\cdot 15 \\cdot 35 \\cdot \\cos 60^\\circ = 225 + 1\\,225 - 525 = 925$, nên $AC = \\sqrt{925} \\approx 30{,}41$.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích tam giác $ABC$ có $b = 6$, $c = 8$ và $\\widehat{A} = 150^\\circ$.',
      answer: 12,
      hints: ['$S = \\tfrac{1}{2}bc\\sin A$.', '$\\sin 150^\\circ = \\sin 30^\\circ$.'],
      solution:
        '$S = \\dfrac{1}{2} \\cdot 6 \\cdot 8 \\cdot \\sin 150^\\circ = 24 \\cdot \\dfrac{1}{2} = 12$.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích tam giác có ba cạnh $5$, $6$, $7$ (làm tròn đến hàng phần trăm).',
      answer: 14.7,
      tolerance: 0.01,
      hints: ['Tính nửa chu vi $p$ rồi dùng công thức Heron.', '$p = 9$.'],
      solution:
        '$p = 9$, $S = \\sqrt{9 \\cdot 4 \\cdot 3 \\cdot 2} = \\sqrt{216} = 6\\sqrt{6} \\approx 14{,}70$.',
    },
    {
      type: 'number',
      prompt: 'Tam giác có ba cạnh $6$, $8$, $10$. Tính bán kính $r$ của đường tròn nội tiếp.',
      answer: 2,
      hints: ['Tính $S$ (đây là tam giác vuông) và $p$.', '$r = \\dfrac{S}{p}$.'],
      solution:
        '$6^2 + 8^2 = 10^2$ nên tam giác vuông, $S = \\dfrac{1}{2} \\cdot 6 \\cdot 8 = 24$. $p = 12$, nên $r = \\dfrac{24}{12} = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Hai tàu rời cảng cùng lúc theo hai hướng tạo với nhau góc $60^\\circ$. Tàu thứ nhất chạy $30$ km/h, tàu thứ hai $40$ km/h. Sau $2$ giờ, hai tàu cách nhau bao nhiêu ki-lô-mét (làm tròn đến hàng phần trăm)?',
      answer: 72.11,
      tolerance: 0.01,
      unit: 'km',
      hints: [
        'Sau $2$ giờ, hai tàu cách cảng $60$ km và $80$ km.',
        'Dùng định lí côsin với góc $60^\\circ$ xen giữa.',
      ],
      solution:
        '$d^2 = 60^2 + 80^2 - 2 \\cdot 60 \\cdot 80 \\cdot \\cos 60^\\circ = 3\\,600 + 6\\,400 - 4\\,800 = 5\\,200$, nên $d = \\sqrt{5\\,200} \\approx 72{,}11$ km.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi dữ kiện với cách giải tam giác phù hợp.',
      left: ['Biết hai cạnh và góc xen giữa', 'Biết ba cạnh', 'Biết một cạnh và hai góc kề'],
      right: [
        'Định lí côsin tính cạnh thứ ba',
        'Hệ quả định lí côsin tính các góc',
        'Tính góc thứ ba rồi dùng định lí sin',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Định lí côsin nối ba cạnh với một góc; định lí sin nối cạnh với góc đối diện.'],
      solution:
        'Hai cạnh và góc xen giữa: định lí côsin cho cạnh thứ ba. Ba cạnh: hệ quả định lí côsin cho các góc. Một cạnh và hai góc kề: góc thứ ba bằng $180^\\circ$ trừ tổng hai góc, rồi định lí sin.',
    },
  ],
  takeaways: [
    'Định lí côsin: $a^2 = b^2 + c^2 - 2bc\\cos A$; hệ quả $\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$.',
    'Định lí sin: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.',
    'Diện tích: $S = \\tfrac{1}{2}bc\\sin A = \\dfrac{abc}{4R} = pr = \\sqrt{p(p - a)(p - b)(p - c)}$.',
    'Giải tam giác: chọn định lí côsin khi biết hai cạnh và góc xen giữa hoặc ba cạnh, định lí sin khi biết một cạnh và hai góc.',
  ],
};
