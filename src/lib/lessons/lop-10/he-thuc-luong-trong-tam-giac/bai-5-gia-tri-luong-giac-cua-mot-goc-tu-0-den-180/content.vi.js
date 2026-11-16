/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giá trị lượng giác sin, côsin, tang, côtang của một góc từ 0° đến 180° định nghĩa qua nửa đường tròn đơn vị, bảng giá trị các góc đặc biệt và quan hệ giữa hai góc bù nhau, hai góc phụ nhau.',
  intro:
    'Ở lớp 9, em đã biết tỉ số lượng giác của một góc nhọn trong tam giác vuông. Nhưng một tam giác có thể có góc tù, chẳng hạn góc $120^\\circ$, và không tam giác vuông nào chứa góc đó. Nửa đường tròn đơn vị giúp mở rộng $\\sin$, $\\cos$, $\\tan$, $\\cot$ cho mọi góc từ $0^\\circ$ đến $180^\\circ$, để dùng được trong mọi tam giác.',
  objectives: [
    'Nhận biết giá trị lượng giác của một góc từ $0^\\circ$ đến $180^\\circ$ qua toạ độ của một điểm trên nửa đường tròn đơn vị.',
    'Nhớ và dùng bảng giá trị lượng giác của các góc đặc biệt.',
    'Dùng quan hệ giữa giá trị lượng giác của hai góc bù nhau, hai góc phụ nhau để tính toán.',
    'Dùng máy tính cầm tay để tính giá trị lượng giác của một góc và tìm góc khi biết một giá trị lượng giác.',
  ],
  sections: [
    {
      heading: 'Giá trị lượng giác của một góc',
      blocks: [
        {
          type: 'p',
          text: 'Trong mặt phẳng toạ độ $Oxy$, nửa đường tròn tâm $O$, bán kính bằng $1$, nằm phía trên trục hoành gọi là nửa đường tròn đơn vị. Với mỗi góc $\\alpha$ ($0^\\circ \\le \\alpha \\le 180^\\circ$), có duy nhất một điểm $M(x_0; y_0)$ trên nửa đường tròn đơn vị sao cho $\\widehat{xOM} = \\alpha$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Với $M(x_0; y_0)$ trên nửa đường tròn đơn vị và $\\widehat{xOM} = \\alpha$: $\\sin \\alpha = y_0$ (tung độ của $M$); $\\cos \\alpha = x_0$ (hoành độ của $M$); $\\tan \\alpha = \\dfrac{y_0}{x_0}$ với $\\alpha \\ne 90^\\circ$; $\\cot \\alpha = \\dfrac{x_0}{y_0}$ với $\\alpha \\ne 0^\\circ$ và $\\alpha \\ne 180^\\circ$. Các số $\\sin \\alpha$, $\\cos \\alpha$, $\\tan \\alpha$, $\\cot \\alpha$ gọi là các giá trị lượng giác của góc $\\alpha$.',
        },
        {
          type: 'p',
          text: 'Khi $\\alpha$ là góc nhọn, gọi $H$ là hình chiếu của $M$ trên $Ox$, tam giác $OHM$ vuông tại $H$ có cạnh huyền $OM = 1$. Khi đó $\\sin \\alpha = \\dfrac{HM}{OM} = y_0$ và $\\cos \\alpha = \\dfrac{OH}{OM} = x_0$: định nghĩa mới trùng với tỉ số lượng giác đã học ở lớp 9.',
        },
        {
          type: 'list',
          items: [
            '$\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$ ($\\alpha \\ne 90^\\circ$), $\\cot \\alpha = \\dfrac{\\cos \\alpha}{\\sin \\alpha}$ ($\\alpha \\ne 0^\\circ$, $\\alpha \\ne 180^\\circ$), $\\tan \\alpha = \\dfrac{1}{\\cot \\alpha}$ ($\\alpha \\notin \\{0^\\circ; 90^\\circ; 180^\\circ\\}$).',
            'Vì $M$ nằm trên đường tròn bán kính $1$ nên $x_0^2 + y_0^2 = 1$, tức là $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$ với mọi $0^\\circ \\le \\alpha \\le 180^\\circ$.',
            'Vì $y_0 \\ge 0$ nên $0 \\le \\sin \\alpha \\le 1$; còn $-1 \\le \\cos \\alpha \\le 1$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu $\\alpha$ là góc tù thì $M$ nằm bên trái trục tung, nên $\\cos \\alpha < 0$, $\\tan \\alpha < 0$, $\\cot \\alpha < 0$ (còn $\\sin \\alpha > 0$). $\\tan \\alpha$ chỉ xác định khi $\\alpha \\ne 90^\\circ$; $\\cot \\alpha$ chỉ xác định khi $\\alpha \\ne 0^\\circ$ và $\\alpha \\ne 180^\\circ$.',
        },
      ],
    },
    {
      heading: 'Giá trị lượng giác của các góc đặc biệt',
      blocks: [
        {
          type: 'p',
          text: 'Từ toạ độ của các điểm đặc biệt trên nửa đường tròn đơn vị, ta có bảng sau. Kí hiệu ‖ chỉ giá trị không xác định.',
        },
        {
          type: 'table',
          caption: 'Giá trị lượng giác của các góc đặc biệt',
          head: [
            '$\\alpha$',
            '$\\sin \\alpha$',
            '$\\cos \\alpha$',
            '$\\tan \\alpha$',
            '$\\cot \\alpha$',
          ],
          rows: [
            ['$0^\\circ$', '$0$', '$1$', '$0$', '‖'],
            [
              '$30^\\circ$',
              '$\\dfrac{1}{2}$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$\\dfrac{\\sqrt{3}}{3}$',
              '$\\sqrt{3}$',
            ],
            ['$45^\\circ$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$', '$1$'],
            [
              '$60^\\circ$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$\\dfrac{1}{2}$',
              '$\\sqrt{3}$',
              '$\\dfrac{\\sqrt{3}}{3}$',
            ],
            ['$90^\\circ$', '$1$', '$0$', '‖', '$0$'],
            [
              '$120^\\circ$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$-\\dfrac{1}{2}$',
              '$-\\sqrt{3}$',
              '$-\\dfrac{\\sqrt{3}}{3}$',
            ],
            ['$135^\\circ$', '$\\dfrac{\\sqrt{2}}{2}$', '$-\\dfrac{\\sqrt{2}}{2}$', '$-1$', '$-1$'],
            [
              '$150^\\circ$',
              '$\\dfrac{1}{2}$',
              '$-\\dfrac{\\sqrt{3}}{2}$',
              '$-\\dfrac{\\sqrt{3}}{3}$',
              '$-\\sqrt{3}$',
            ],
            ['$180^\\circ$', '$0$', '$-1$', '$0$', '‖'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dùng máy tính cầm tay',
          text: 'Đặt máy ở đơn vị độ, bấm $\\sin$, $\\cos$ hoặc $\\tan$ rồi nhập số đo góc để được giá trị gần đúng; $\\cot \\alpha$ tính bằng $\\dfrac{1}{\\tan \\alpha}$. Để tìm góc khi biết một giá trị, dùng $\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$. Lưu ý: $\\sin^{-1}$ và $\\tan^{-1}$ chỉ cho góc từ $-90^\\circ$ đến $90^\\circ$, nên với góc tù hãy tìm theo $\\cos^{-1}$ (cho góc từ $0^\\circ$ đến $180^\\circ$).',
        },
      ],
    },
    {
      heading: 'Hai góc bù nhau, hai góc phụ nhau',
      blocks: [
        {
          type: 'p',
          text: "Hai điểm $M$ và $M'$ trên nửa đường tròn đơn vị ứng với hai góc $\\alpha$ và $180^\\circ - \\alpha$ đối xứng nhau qua trục tung: chúng có cùng tung độ và hoành độ đối nhau.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai góc bù nhau',
          text: '$\\sin(180^\\circ - \\alpha) = \\sin \\alpha$; $\\cos(180^\\circ - \\alpha) = -\\cos \\alpha$; $\\tan(180^\\circ - \\alpha) = -\\tan \\alpha$ ($\\alpha \\ne 90^\\circ$); $\\cot(180^\\circ - \\alpha) = -\\cot \\alpha$ ($0^\\circ < \\alpha < 180^\\circ$). Hai góc bù nhau có sin bằng nhau; có côsin, tang, côtang đối nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai góc phụ nhau',
          text: 'Với $0^\\circ \\le \\alpha \\le 90^\\circ$: $\\sin(90^\\circ - \\alpha) = \\cos \\alpha$; $\\cos(90^\\circ - \\alpha) = \\sin \\alpha$; $\\tan(90^\\circ - \\alpha) = \\cot \\alpha$ và $\\cot(90^\\circ - \\alpha) = \\tan \\alpha$ (khi các giá trị này xác định). Sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nửa đường tròn đơn vị',
    instruction:
      'Kéo điểm $M$ trên nửa đường tròn (hoặc chọn nó rồi dùng phím mũi tên, giữ Shift để đổi $15^\\circ$ mỗi lần). Hoành độ của $M$ là $\\cos \\alpha$, tung độ là $\\sin \\alpha$. Bật điểm $M\'$ để so sánh hai góc bù nhau, hoặc chuyển sang "Tìm góc" để tìm góc thoả mãn một điều kiện.',
  },
  examples: [
    {
      problem: 'Tìm các giá trị lượng giác của góc $120^\\circ$.',
      steps: [
        "Lấy $M$ trên nửa đường tròn đơn vị với $\\widehat{xOM} = 120^\\circ$. Khi đó $\\widehat{yOM} = 30^\\circ$ và $\\widehat{MOx'} = 60^\\circ$, với $Ox'$ là tia đối của tia $Ox$.",
        'Hình chiếu của $M$ trên hai trục cho toạ độ $M\\left(-\\dfrac{1}{2}; \\dfrac{\\sqrt{3}}{2}\\right)$.',
        'Vậy $\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}$, $\\cos 120^\\circ = -\\dfrac{1}{2}$.',
        '$\\tan 120^\\circ = \\dfrac{\\sqrt{3}}{2} : \\left(-\\dfrac{1}{2}\\right) = -\\sqrt{3}$ và $\\cot 120^\\circ = \\dfrac{1}{-\\sqrt{3}} = -\\dfrac{\\sqrt{3}}{3}$.',
      ],
      answer:
        '$\\sin 120^\\circ = \\dfrac{\\sqrt{3}}{2}$, $\\cos 120^\\circ = -\\dfrac{1}{2}$, $\\tan 120^\\circ = -\\sqrt{3}$, $\\cot 120^\\circ = -\\dfrac{\\sqrt{3}}{3}$.',
    },
    {
      problem: 'Tìm các giá trị lượng giác của góc $135^\\circ$.',
      steps: [
        '$135^\\circ = 180^\\circ - 45^\\circ$, nên $135^\\circ$ và $45^\\circ$ là hai góc bù nhau.',
        '$\\sin 135^\\circ = \\sin 45^\\circ = \\dfrac{\\sqrt{2}}{2}$; $\\cos 135^\\circ = -\\cos 45^\\circ = -\\dfrac{\\sqrt{2}}{2}$.',
        '$\\tan 135^\\circ = -\\tan 45^\\circ = -1$; $\\cot 135^\\circ = -\\cot 45^\\circ = -1$.',
      ],
      answer:
        '$\\sin 135^\\circ = \\dfrac{\\sqrt{2}}{2}$, $\\cos 135^\\circ = -\\dfrac{\\sqrt{2}}{2}$, $\\tan 135^\\circ = \\cot 135^\\circ = -1$.',
    },
    {
      problem:
        'Tính giá trị của biểu thức $A = 3\\sin 150^\\circ + \\tan 135^\\circ + \\cot 45^\\circ$.',
      steps: [
        '$\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}$.',
        '$\\tan 135^\\circ = -1$ và $\\cot 45^\\circ = 1$.',
        '$A = 3 \\cdot \\dfrac{1}{2} + (-1) + 1 = \\dfrac{3}{2}$.',
      ],
      answer: '$A = \\dfrac{3}{2}$.',
    },
    {
      problem:
        'Cho góc tù $\\alpha$ với $\\sin \\alpha = \\dfrac{1}{3}$. Tính $\\cos \\alpha$ và $\\tan \\alpha$.',
      steps: [
        'Từ $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$: $\\cos^2 \\alpha = 1 - \\dfrac{1}{9} = \\dfrac{8}{9}$.',
        '$\\alpha$ tù nên $\\cos \\alpha < 0$, do đó $\\cos \\alpha = -\\dfrac{2\\sqrt{2}}{3}$.',
        '$\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha} = \\dfrac{1}{3} : \\left(-\\dfrac{2\\sqrt{2}}{3}\\right) = -\\dfrac{1}{2\\sqrt{2}} = -\\dfrac{\\sqrt{2}}{4}$.',
      ],
      answer:
        '$\\cos \\alpha = -\\dfrac{2\\sqrt{2}}{3}$, $\\tan \\alpha = -\\dfrac{\\sqrt{2}}{4}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Giá trị của $\\cos 150^\\circ$ là',
      options: [
        '$-\\dfrac{\\sqrt{3}}{2}$',
        '$\\dfrac{\\sqrt{3}}{2}$',
        '$-\\dfrac{1}{2}$',
        '$\\dfrac{1}{2}$',
      ],
      answer: 0,
      hints: [
        '$150^\\circ$ và $30^\\circ$ là hai góc bù nhau.',
        'Hai góc bù nhau có côsin đối nhau.',
      ],
      solution: '$\\cos 150^\\circ = -\\cos 30^\\circ = -\\dfrac{\\sqrt{3}}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Nếu $\\alpha$ là góc tù thì khẳng định nào sau đây đúng?',
      options: [
        '$\\sin \\alpha > 0$ và $\\cos \\alpha < 0$',
        '$\\sin \\alpha < 0$ và $\\cos \\alpha < 0$',
        '$\\sin \\alpha > 0$ và $\\cos \\alpha > 0$',
        '$\\sin \\alpha < 0$ và $\\cos \\alpha > 0$',
      ],
      answer: 0,
      hints: ['Điểm $M$ ứng với góc tù nằm ở phía nào của trục tung, phía nào của trục hoành?'],
      solution:
        'Với góc tù, $M$ nằm trên nửa đường tròn đơn vị (tung độ dương) và bên trái trục tung (hoành độ âm), nên $\\sin \\alpha > 0$, $\\cos \\alpha < 0$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$\\sin 130^\\circ = \\sin 50^\\circ$',
        '$\\cos 130^\\circ = \\cos 50^\\circ$',
        '$\\tan 100^\\circ < 0$',
        '$\\cos 95^\\circ > 0$',
        '$\\cot 170^\\circ < 0$',
        '$\\sin 35^\\circ = \\cos 55^\\circ$',
      ],
      answers: [0, 2, 4, 5],
      hints: [
        'Hai góc bù nhau có sin bằng nhau, côsin đối nhau.',
        'Với góc tù, côsin, tang, côtang đều âm. Hai góc phụ nhau: sin góc này bằng côsin góc kia.',
      ],
      solution:
        '$\\sin 130^\\circ = \\sin 50^\\circ$ đúng (bù nhau); $\\cos 130^\\circ = -\\cos 50^\\circ \\ne \\cos 50^\\circ$; $100^\\circ$ và $170^\\circ$ là góc tù nên $\\tan 100^\\circ < 0$, $\\cot 170^\\circ < 0$; $95^\\circ$ tù nên $\\cos 95^\\circ < 0$; $35^\\circ + 55^\\circ = 90^\\circ$ nên $\\sin 35^\\circ = \\cos 55^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính $B = \\sin 120^\\circ + \\cos 150^\\circ$.',
      answer: 0,
      hints: ['Tra bảng các góc đặc biệt, hoặc đưa về góc $60^\\circ$ và $30^\\circ$.'],
      solution:
        '$\\sin 120^\\circ = \\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$, $\\cos 150^\\circ = -\\cos 30^\\circ = -\\dfrac{\\sqrt{3}}{2}$, nên $B = 0$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $C = \\cos 120^\\circ \\cdot \\sin 150^\\circ$. Viết kết quả dưới dạng phân số tối giản.',
      answer: [-1, 4],
      simplest: true,
      hints: ['$\\cos 120^\\circ = -\\dfrac{1}{2}$.', '$\\sin 150^\\circ = \\sin 30^\\circ$.'],
      solution: '$C = \\left(-\\dfrac{1}{2}\\right) \\cdot \\dfrac{1}{2} = -\\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $0^\\circ < \\alpha < 180^\\circ$ và $\\cos \\alpha = -\\dfrac{3}{5}$. Tính $\\sin \\alpha$ (viết dạng số thập phân).',
      answer: 0.8,
      hints: [
        'Dùng $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.',
        'Với $0^\\circ < \\alpha < 180^\\circ$, $\\sin \\alpha > 0$.',
      ],
      solution:
        '$\\sin^2 \\alpha = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$ và $\\sin \\alpha > 0$, nên $\\sin \\alpha = \\dfrac{4}{5} = 0{,}8$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với góc $\\alpha$ ở câu trên ($\\cos \\alpha = -\\dfrac{3}{5}$, $\\sin \\alpha = \\dfrac{4}{5}$), tính $\\tan \\alpha$.',
      answer: [-4, 3],
      simplest: true,
      hints: ['$\\tan \\alpha = \\dfrac{\\sin \\alpha}{\\cos \\alpha}$.'],
      solution: '$\\tan \\alpha = \\dfrac{4}{5} : \\left(-\\dfrac{3}{5}\\right) = -\\dfrac{4}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $\\tan \\alpha = 2$. Tính $D = \\dfrac{3\\sin \\alpha - \\cos \\alpha}{\\sin \\alpha + \\cos \\alpha}$.',
      answer: [5, 3],
      simplest: true,
      hints: [
        '$\\tan \\alpha = 2$ nên $\\cos \\alpha \\ne 0$; chia cả tử và mẫu cho $\\cos \\alpha$.',
        'Khi đó $D = \\dfrac{3\\tan \\alpha - 1}{\\tan \\alpha + 1}$.',
      ],
      solution:
        'Chia tử và mẫu cho $\\cos \\alpha \\ne 0$: $D = \\dfrac{3\\tan \\alpha - 1}{\\tan \\alpha + 1} = \\dfrac{6 - 1}{2 + 1} = \\dfrac{5}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính $E = \\cos 0^\\circ + \\cos 20^\\circ + \\cos 40^\\circ + \\dots + \\cos 160^\\circ + \\cos 180^\\circ$ (các góc tăng dần $20^\\circ$).',
      answer: 0,
      hints: [
        'Ghép các góc bù nhau thành cặp: $0^\\circ$ với $180^\\circ$, $20^\\circ$ với $160^\\circ$, ...',
        '$\\cos(180^\\circ - \\alpha) = -\\cos \\alpha$.',
      ],
      solution:
        'Mười góc ghép thành năm cặp bù nhau $(0^\\circ; 180^\\circ)$, $(20^\\circ; 160^\\circ)$, $(40^\\circ; 140^\\circ)$, $(60^\\circ; 120^\\circ)$, $(80^\\circ; 100^\\circ)$. Mỗi cặp có tổng côsin bằng $0$, nên $E = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm góc $\\alpha$ ($0^\\circ \\le \\alpha \\le 180^\\circ$) biết $\\cos \\alpha = -\\dfrac{\\sqrt{2}}{2}$. Nhập số đo theo độ.',
      answer: 135,
      hints: [
        '$\\cos \\alpha < 0$ nên $\\alpha$ là góc tù.',
        '$\\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$; góc nào bù với $45^\\circ$?',
      ],
      solution:
        '$\\cos \\alpha = -\\cos 45^\\circ = \\cos(180^\\circ - 45^\\circ)$, nên $\\alpha = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tính $\\sin 100^\\circ$ (làm tròn đến hàng phần mười nghìn).',
      answer: 0.9848,
      tolerance: 0.0001,
      hints: ['Kiểm tra máy đang ở đơn vị độ (D).', '$\\sin 100^\\circ = \\sin 80^\\circ$.'],
      solution: '$\\sin 100^\\circ = \\sin 80^\\circ \\approx 0{,}9848$.',
    },
    {
      type: 'choice',
      prompt: '$\\sin 50^\\circ$ bằng',
      options: [
        '$\\cos 40^\\circ$',
        '$\\cos 50^\\circ$',
        '$-\\cos 40^\\circ$',
        '$\\sin 40^\\circ$',
      ],
      answer: 0,
      hints: ['$50^\\circ + 40^\\circ = 90^\\circ$: hai góc phụ nhau.'],
      solution: '$50^\\circ$ và $40^\\circ$ phụ nhau nên $\\sin 50^\\circ = \\cos 40^\\circ$.',
    },
  ],
  takeaways: [
    'Trên nửa đường tròn đơn vị, $M(x_0; y_0)$ với $\\widehat{xOM} = \\alpha$ cho $\\sin \\alpha = y_0$, $\\cos \\alpha = x_0$, $\\tan \\alpha = \\dfrac{y_0}{x_0}$, $\\cot \\alpha = \\dfrac{x_0}{y_0}$.',
    '$\\tan \\alpha$ không xác định khi $\\alpha = 90^\\circ$; $\\cot \\alpha$ không xác định khi $\\alpha = 0^\\circ$ hoặc $180^\\circ$.',
    'Góc tù có $\\sin \\alpha > 0$, còn $\\cos \\alpha$, $\\tan \\alpha$, $\\cot \\alpha$ âm; luôn có $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.',
    'Hai góc bù nhau có sin bằng nhau; côsin, tang, côtang đối nhau. Hai góc phụ nhau: sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.',
  ],
};
