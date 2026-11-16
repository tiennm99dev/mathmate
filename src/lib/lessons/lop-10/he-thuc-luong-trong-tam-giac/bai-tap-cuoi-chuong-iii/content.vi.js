/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương Hệ thức lượng trong tam giác: giá trị lượng giác của góc từ 0° đến 180°, định lí côsin, định lí sin, công thức diện tích, giải tam giác và đo đạc thực tế bằng giác kế.',
  intro:
    'Chương này cho em một bộ công cụ hoàn chỉnh: biết ba yếu tố của một tam giác (trong đó có ít nhất một cạnh) là tính được mọi cạnh, góc và diện tích còn lại. Bài ôn tập này hệ thống lại các công thức, rồi dùng chúng để đo chiều cao một toà tháp và khoảng cách qua sông mà không cần leo lên hay lội qua.',
  objectives: [
    'Tính được giá trị lượng giác của góc từ $0^\\circ$ đến $180^\\circ$, dùng quan hệ giữa hai góc bù nhau, phụ nhau.',
    'Chọn đúng định lí côsin, định lí sin hay công thức diện tích để giải tam giác.',
    'Giải các bài toán đo chiều cao, đo khoảng cách tới điểm không đến được.',
  ],
  sections: [
    {
      heading: 'Tóm tắt kiến thức',
      blocks: [
        {
          type: 'list',
          items: [
            'Với $M(x_0; y_0)$ trên nửa đường tròn đơn vị, $\\widehat{xOM} = \\alpha$: $\\sin \\alpha = y_0$, $\\cos \\alpha = x_0$, $\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$ ($\\alpha \\ne 90^\\circ$), $\\cot \\alpha = \\dfrac{\\cos \\alpha}{\\sin \\alpha}$ ($\\alpha \\ne 0^\\circ, 180^\\circ$); $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.',
            'Hai góc bù nhau: $\\sin(180^\\circ - \\alpha) = \\sin \\alpha$, còn côsin, tang, côtang đổi dấu. Hai góc phụ nhau: $\\sin(90^\\circ - \\alpha) = \\cos \\alpha$, $\\tan(90^\\circ - \\alpha) = \\cot \\alpha$.',
            'Định lí côsin: $a^2 = b^2 + c^2 - 2bc\\cos A$, nên $\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}$.',
            'Định lí sin: $\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R$.',
            'Diện tích: $S = \\tfrac{1}{2}bc\\sin A = \\dfrac{abc}{4R} = pr = \\sqrt{p(p - a)(p - b)(p - c)}$.',
          ],
        },
      ],
    },
    {
      heading: 'Đo đạc bằng giác kế',
      blocks: [
        {
          type: 'p',
          text: 'Giác kế đo góc giữa hai hướng nhìn; thước dây đo khoảng cách trên mặt đất. Khi điểm cần đo không đến được (đỉnh tháp, gốc cây bên kia sông), ta chọn thêm hai điểm đứng $A$, $B$ đo được khoảng cách $AB$, đo các góc ở $A$ và $B$, rồi giải tam giác bằng định lí sin.',
        },
        {
          type: 'table',
          head: ['Bài toán', 'Số đo', 'Cách tính'],
          rows: [
            [
              'Chiều cao $h$ của tháp, chân tháp không đến được',
              '$AB = d$; góc nhìn đỉnh $C$ từ $A$ là $\\alpha$, từ $B$ (gần tháp hơn) là $\\beta$',
              '$\\widehat{ACB} = \\beta - \\alpha$; $BC = \\dfrac{d\\sin \\alpha}{\\sin(\\beta - \\alpha)}$; $h = BC\\sin \\beta$',
            ],
            [
              'Khoảng cách $AC$ tới điểm $C$ bên kia sông',
              '$AB = d$; $\\widehat{CAB}$, $\\widehat{CBA}$',
              '$\\widehat{C} = 180^\\circ - \\widehat{A} - \\widehat{B}$; $AC = \\dfrac{d\\sin B}{\\sin C}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Góc đọc trên giác kế chỉ chính xác đến độ, nên kết quả là số gần đúng. Sai số càng lớn khi góc ở đỉnh $C$ càng nhỏ: hãy chọn $A$ và $B$ cách nhau đủ xa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Giác kế ảo',
    instruction:
      'Chọn bài đo, kéo hai điểm đứng $A$ và $B$ (hoặc dùng phím mũi tên trái, phải) và đọc các số đo. Tính chiều cao tháp hoặc khoảng cách $AC$ bằng định lí sin, làm tròn đến hàng phần mười, rồi bấm Kiểm tra để so với giá trị thật.',
  },
  examples: [
    {
      problem:
        'Để đo chiều cao $h$ của một toà tháp, bạn An đứng tại $A$ đo được góc nhìn lên đỉnh $C$ là $35^\\circ$, rồi tiến thẳng về phía tháp $24$ m đến $B$ và đo được góc nhìn là $50^\\circ$. Tính $h$ (làm tròn đến hàng phần mười của mét, bỏ qua chiều cao giác kế).',
      steps: [
        'Trong tam giác $ABC$: $\\widehat{CAB} = 35^\\circ$, $\\widehat{ABC} = 180^\\circ - 50^\\circ = 130^\\circ$, nên $\\widehat{ACB} = 180^\\circ - 35^\\circ - 130^\\circ = 15^\\circ$.',
        'Định lí sin: $BC = \\dfrac{AB\\sin A}{\\sin C} = \\dfrac{24\\sin 35^\\circ}{\\sin 15^\\circ} \\approx 53{,}19$ m.',
        'Gọi $H$ là chân tháp, tam giác $BHC$ vuông tại $H$: $h = BC\\sin 50^\\circ \\approx 40{,}74$.',
      ],
      answer: '$h \\approx 40{,}7$ m.',
    },
    {
      problem:
        'Hai điểm $A$, $B$ trên một bờ sông cách nhau $40$ m. Cây $C$ ở bờ bên kia, đo được $\\widehat{CAB} = 70^\\circ$, $\\widehat{CBA} = 60^\\circ$. Tính $AC$ và chiều rộng của sông (làm tròn đến hàng phần mười của mét, coi hai bờ song song).',
      steps: [
        '$\\widehat{ACB} = 180^\\circ - 70^\\circ - 60^\\circ = 50^\\circ$.',
        'Định lí sin: $AC = \\dfrac{AB\\sin B}{\\sin C} = \\dfrac{40\\sin 60^\\circ}{\\sin 50^\\circ} \\approx 45{,}22$ m.',
        'Chiều rộng sông là khoảng cách từ $C$ đến bờ $AB$: $AC\\sin 70^\\circ \\approx 42{,}49$ m.',
      ],
      answer: '$AC \\approx 45{,}2$ m, sông rộng khoảng $42{,}5$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Giá trị của $\\sin 120^\\circ$ là',
      options: [
        '$\\dfrac{\\sqrt{3}}{2}$',
        '$-\\dfrac{\\sqrt{3}}{2}$',
        '$-\\dfrac{1}{2}$',
        '$\\dfrac{1}{2}$',
      ],
      answer: 0,
      hints: ['$120^\\circ$ bù với $60^\\circ$; hai góc bù nhau có sin bằng nhau.'],
      solution: '$\\sin 120^\\circ = \\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đẳng thức đúng.',
      options: [
        '$\\sin 150^\\circ = \\dfrac{1}{2}$',
        '$\\cos 120^\\circ = \\dfrac{1}{2}$',
        '$\\tan 135^\\circ = -1$',
        '$\\cot 90^\\circ = 0$',
        '$\\sin 160^\\circ = -\\sin 20^\\circ$',
        '$\\cos 10^\\circ = \\sin 80^\\circ$',
      ],
      answers: [0, 2, 3, 5],
      hints: [
        'Đưa góc tù về góc bù của nó; nhớ sin giữ dấu, côsin đổi dấu.',
        'Hai góc phụ nhau: côsin góc này bằng sin góc kia.',
      ],
      solution:
        '$\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}$; $\\cos 120^\\circ = -\\dfrac{1}{2}$ nên đẳng thức thứ hai sai; $\\tan 135^\\circ = -\\tan 45^\\circ = -1$; $\\cot 90^\\circ = \\dfrac{0}{1} = 0$; $\\sin 160^\\circ = \\sin 20^\\circ$ (không đổi dấu) nên đẳng thức đó sai; $\\cos 10^\\circ = \\sin 80^\\circ$ vì $10^\\circ + 80^\\circ = 90^\\circ$.',
    },
    {
      type: 'fraction',
      prompt: 'Cho góc tù $\\alpha$ có $\\sin \\alpha = \\dfrac{3}{5}$. Tính $\\cos \\alpha$.',
      answer: [-4, 5],
      simplest: true,
      hints: ['$\\cos^2 \\alpha = 1 - \\sin^2 \\alpha$.', 'Góc tù có côsin âm.'],
      solution:
        '$\\cos^2 \\alpha = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$, $\\alpha$ tù nên $\\cos \\alpha = -\\dfrac{4}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với góc $\\alpha$ ở câu trên ($\\sin \\alpha = \\dfrac{3}{5}$, $\\alpha$ tù), tính $\\tan \\alpha$.',
      answer: [-3, 4],
      simplest: true,
      hints: [
        '$\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$ với $\\cos \\alpha = -\\dfrac{4}{5}$.',
      ],
      solution: '$\\tan \\alpha = \\dfrac{3}{5} : \\left(-\\dfrac{4}{5}\\right) = -\\dfrac{3}{4}$.',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có $b = 8$, $c = 5$ và $\\widehat{A} = 60^\\circ$. Tính cạnh $a$.',
      answer: 7,
      hints: ['Định lí côsin cho cạnh đối diện góc đã biết.'],
      solution: '$a^2 = 64 + 25 - 2 \\cdot 8 \\cdot 5 \\cdot \\dfrac{1}{2} = 49$, nên $a = 7$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $a = 5$, $b = 6$, $c = 7$. Tính góc lớn nhất của tam giác (theo độ, làm tròn đến hàng phần mười).',
      answer: 78.5,
      tolerance: 0.05,
      hints: [
        'Góc lớn nhất đối diện cạnh lớn nhất $c = 7$.',
        '$\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$.',
      ],
      solution:
        "$\\cos C = \\dfrac{25 + 36 - 49}{2 \\cdot 5 \\cdot 6} = \\dfrac{12}{60} = \\dfrac{1}{5}$, nên $\\widehat{C} \\approx 78{,}5^\\circ$ (máy tính cho $78^\\circ 28'$).",
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $b = 8$ và $\\widehat{B} = 45^\\circ$. Tính bán kính $R$ của đường tròn ngoại tiếp (làm tròn đến hàng phần trăm).',
      answer: 5.66,
      tolerance: 0.01,
      hints: ['$2R = \\dfrac{b}{\\sin B}$.'],
      solution:
        '$2R = \\dfrac{8}{\\sin 45^\\circ} = \\dfrac{8}{\\frac{\\sqrt{2}}{2}} = 8\\sqrt{2}$, nên $R = 4\\sqrt{2} \\approx 5{,}66$.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích tam giác có ba cạnh $7$, $8$, $9$ (làm tròn đến hàng phần trăm).',
      answer: 26.83,
      tolerance: 0.01,
      hints: ['$p = 12$; dùng công thức Heron.'],
      solution:
        '$S = \\sqrt{12 \\cdot 5 \\cdot 4 \\cdot 3} = \\sqrt{720} = 12\\sqrt{5} \\approx 26{,}83$.',
    },
    {
      type: 'number',
      prompt:
        'Tính bán kính $r$ của đường tròn nội tiếp tam giác có ba cạnh $7$, $8$, $9$ (làm tròn đến hàng phần trăm).',
      answer: 2.24,
      tolerance: 0.01,
      hints: ['$S = pr$, với $S$ vừa tính ở câu trước và $p = 12$.'],
      solution: '$r = \\dfrac{S}{p} = \\dfrac{12\\sqrt{5}}{12} = \\sqrt{5} \\approx 2{,}24$.',
    },
    {
      type: 'choice',
      prompt: 'Trong tam giác $ABC$, công thức nào sau đây sai?',
      options: [
        '$S = \\dfrac{1}{2}bc\\cos A$',
        '$a = 2R\\sin A$',
        '$S = \\dfrac{1}{2}ab\\sin C$',
        '$b^2 = a^2 + c^2 - 2ac\\cos B$',
      ],
      answer: 0,
      hints: ['Diện tích bằng nửa tích hai cạnh nhân sin (không phải côsin) của góc xen giữa.'],
      solution:
        'Đúng là $S = \\dfrac{1}{2}bc\\sin A$; công thức với $\\cos A$ sai (chẳng hạn khi $A = 90^\\circ$ nó cho $S = 0$).',
    },
    {
      type: 'number',
      prompt:
        'Từ $A$, góc nhìn lên đỉnh một ngọn tháp là $30^\\circ$; tiến thẳng về phía tháp $30$ m đến $B$, góc nhìn là $45^\\circ$. Tính chiều cao tháp (mét, làm tròn đến hàng phần mười, bỏ qua chiều cao người đo).',
      answer: 41,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Góc ở đỉnh tháp trong tam giác $ABC$ là $45^\\circ - 30^\\circ = 15^\\circ$.',
        'Tính $BC$ bằng định lí sin, rồi $h = BC\\sin 45^\\circ$.',
      ],
      solution:
        '$BC = \\dfrac{30\\sin 30^\\circ}{\\sin 15^\\circ} \\approx 57{,}96$ m, $h = BC\\sin 45^\\circ \\approx 40{,}98 \\approx 41{,}0$ m (giá trị đúng là $15(\\sqrt{3} + 1)$ m).',
    },
    {
      type: 'number',
      prompt:
        'Hai điểm $A$, $B$ trên bờ sông cách nhau $50$ m; cây $C$ bên kia sông cho $\\widehat{CAB} = 65^\\circ$, $\\widehat{CBA} = 75^\\circ$. Tính $AC$ (mét, làm tròn đến hàng phần mười).',
      answer: 75.1,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        '$\\widehat{C} = 180^\\circ - 65^\\circ - 75^\\circ = 40^\\circ$.',
        '$AC = \\dfrac{AB\\sin B}{\\sin C}$.',
      ],
      solution:
        '$\\widehat{C} = 40^\\circ$, $AC = \\dfrac{50\\sin 75^\\circ}{\\sin 40^\\circ} \\approx 75{,}1$ m.',
    },
  ],
  takeaways: [
    'Góc tù có sin dương, còn côsin, tang, côtang âm; $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$ giúp tính giá trị này từ giá trị kia.',
    'Hai cạnh và góc xen giữa hoặc ba cạnh: định lí côsin. Một cạnh và hai góc: định lí sin.',
    'Đo vật không đến được: chọn hai điểm đứng, đo một khoảng cách và hai góc, rồi giải tam giác bằng định lí sin.',
  ],
};
