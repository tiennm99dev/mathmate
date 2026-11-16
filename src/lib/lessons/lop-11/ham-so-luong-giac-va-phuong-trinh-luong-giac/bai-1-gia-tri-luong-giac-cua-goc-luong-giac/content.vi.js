/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc lượng giác và số đo của nó theo độ và radian, đường tròn lượng giác, giá trị lượng giác sin, côsin, tang, côtang của một góc lượng giác, các hệ thức cơ bản và giá trị lượng giác của các góc có liên quan đặc biệt.',
  intro:
    'Kim phút của đồng hồ quay một vòng mỗi giờ. Sau $2$ giờ $15$ phút nó đã quay bao nhiêu độ? Câu trả lời lớn hơn $360^\\circ$ rất nhiều, nên góc hình học từ $0^\\circ$ đến $180^\\circ$ không đủ để mô tả. Bài này mở rộng khái niệm góc thành góc lượng giác: có chiều quay, có thể quay nhiều vòng, và có giá trị lượng giác xác định nhờ đường tròn lượng giác.',
  objectives: [
    'Nhận biết góc lượng giác và số đo của nó; dùng hệ thức Chasles.',
    'Đổi số đo giữa độ và radian; tính độ dài cung tròn $l = R\\alpha$.',
    'Biểu diễn góc lượng giác trên đường tròn lượng giác và xác định sin, côsin, tang, côtang của nó.',
    'Dùng các hệ thức cơ bản và giá trị lượng giác của các góc có liên quan đặc biệt để tính toán.',
  ],
  sections: [
    {
      heading: 'Góc lượng giác',
      blocks: [
        {
          type: 'p',
          text: 'Trong mặt phẳng, cho hai tia $Ou$, $Ov$. Xét tia $Om$ cùng nằm trong mặt phẳng này, quay quanh điểm $O$ theo một chiều nhất định từ $Ou$ đến trùng với $Ov$. Chiều ngược chiều kim đồng hồ gọi là chiều dương, chiều cùng chiều kim đồng hồ gọi là chiều âm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc lượng giác',
          text: 'Khi tia $Om$ quay từ tia đầu $Ou$ đến tia cuối $Ov$ thì ta nói nó quét một góc lượng giác tia đầu $Ou$, tia cuối $Ov$, kí hiệu $(Ou, Ov)$. Mỗi vòng quay theo chiều dương ứng với $360^\\circ$, theo chiều âm ứng với $-360^\\circ$.',
        },
        {
          type: 'p',
          text: 'Nếu một góc lượng giác có số đo $\\alpha^\\circ$ thì mọi góc lượng giác cùng tia đầu, tia cuối với nó có số đo dạng $\\alpha^\\circ + k360^\\circ$ với $k \\in \\mathbb{Z}$, kí hiệu $\\text{sđ}(Ou, Ov) = \\alpha^\\circ + k360^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ thức Chasles',
          text: 'Với ba tia tuỳ ý $Ou$, $Ov$, $Ow$, ta có $\\text{sđ}(Ou, Ov) + \\text{sđ}(Ov, Ow) = \\text{sđ}(Ou, Ow) + k360^\\circ$ $(k \\in \\mathbb{Z})$.',
        },
      ],
    },
    {
      heading: 'Đơn vị radian',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Radian',
          text: 'Cho đường tròn tâm $O$ bán kính $R$. Góc ở tâm chắn một cung có độ dài đúng bằng $R$ có số đo $1$ radian (viết tắt $1$ rad).',
        },
        {
          type: 'p',
          text: 'Nửa đường tròn dài $\\pi R$ nên góc bẹt có số đo $\\pi$ rad. Từ $180^\\circ = \\pi$ rad ta có công thức đổi đơn vị:',
        },
        {
          type: 'tex',
          tex: "1^\\circ = \\dfrac{\\pi}{180}\\ \\text{rad}, \\qquad 1\\ \\text{rad} = \\left(\\dfrac{180}{\\pi}\\right)^\\circ \\approx 57^\\circ 17' 45''.",
        },
        {
          type: 'table',
          caption: 'Số đo của một số góc đặc biệt',
          head: [
            'Độ',
            '$30^\\circ$',
            '$45^\\circ$',
            '$60^\\circ$',
            '$90^\\circ$',
            '$120^\\circ$',
            '$135^\\circ$',
            '$150^\\circ$',
            '$180^\\circ$',
          ],
          rows: [
            [
              'Radian',
              '$\\dfrac{\\pi}{6}$',
              '$\\dfrac{\\pi}{4}$',
              '$\\dfrac{\\pi}{3}$',
              '$\\dfrac{\\pi}{2}$',
              '$\\dfrac{2\\pi}{3}$',
              '$\\dfrac{3\\pi}{4}$',
              '$\\dfrac{5\\pi}{6}$',
              '$\\pi$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi ghi số đo theo radian, người ta thường không viết chữ rad: $\\dfrac{\\pi}{2}$ hiểu là $\\dfrac{\\pi}{2}$ rad. Số đo theo radian của góc lượng giác $(Ou, Ov)$ có dạng $\\alpha + k2\\pi$ $(k \\in \\mathbb{Z})$. Không viết lẫn hai đơn vị trong một biểu thức, chẳng hạn không viết $\\dfrac{\\pi}{3} + k360^\\circ$.',
        },
        {
          type: 'p',
          text: 'Một cung của đường tròn bán kính $R$ có số đo $\\alpha$ rad thì có độ dài $l = R\\alpha$.',
        },
      ],
    },
    {
      heading: 'Đường tròn lượng giác và giá trị lượng giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường tròn lượng giác',
          text: 'Trong mặt phẳng toạ độ $Oxy$, đường tròn lượng giác là đường tròn tâm $O$, bán kính $1$, được định hướng (chiều dương là chiều ngược chiều kim đồng hồ) và lấy điểm $A(1; 0)$ làm điểm gốc. Điểm $M$ trên đường tròn sao cho $\\text{sđ}(OA, OM) = \\alpha$ gọi là điểm biểu diễn của góc lượng giác có số đo $\\alpha$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá trị lượng giác',
          text: 'Cho $M(x; y)$ là điểm biểu diễn của góc lượng giác có số đo $\\alpha$. Khi đó $\\cos\\alpha = x$, $\\sin\\alpha = y$; $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$ $(\\cos\\alpha \\ne 0)$ và $\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}$ $(\\sin\\alpha \\ne 0)$.',
        },
        {
          type: 'list',
          items: [
            'Trục hoành gọi là trục côsin, trục tung gọi là trục sin.',
            '$-1 \\le \\sin\\alpha \\le 1$ và $-1 \\le \\cos\\alpha \\le 1$ với mọi $\\alpha$.',
            '$\\tan\\alpha$ xác định khi $\\alpha \\ne \\dfrac{\\pi}{2} + k\\pi$; $\\cot\\alpha$ xác định khi $\\alpha \\ne k\\pi$ $(k \\in \\mathbb{Z})$.',
            'Thêm hay bớt một số nguyên lần $2\\pi$ không làm đổi điểm biểu diễn: $\\sin(\\alpha + k2\\pi) = \\sin\\alpha$, $\\cos(\\alpha + k2\\pi) = \\cos\\alpha$, $\\tan(\\alpha + k\\pi) = \\tan\\alpha$, $\\cot(\\alpha + k\\pi) = \\cot\\alpha$.',
          ],
        },
        {
          type: 'table',
          caption: 'Dấu của các giá trị lượng giác theo góc phần tư chứa điểm biểu diễn',
          head: ['Góc phần tư', 'I', 'II', 'III', 'IV'],
          rows: [
            ['$\\cos\\alpha$', '$+$', '$-$', '$-$', '$+$'],
            ['$\\sin\\alpha$', '$+$', '$+$', '$-$', '$-$'],
            ['$\\tan\\alpha$', '$+$', '$-$', '$+$', '$-$'],
            ['$\\cot\\alpha$', '$+$', '$-$', '$+$', '$-$'],
          ],
        },
        {
          type: 'table',
          caption: 'Giá trị lượng giác của các góc đặc biệt (kí hiệu || nghĩa là không xác định)',
          head: [
            '$\\alpha$',
            '$0$',
            '$\\dfrac{\\pi}{6}$',
            '$\\dfrac{\\pi}{4}$',
            '$\\dfrac{\\pi}{3}$',
            '$\\dfrac{\\pi}{2}$',
          ],
          rows: [
            [
              '$\\sin\\alpha$',
              '$0$',
              '$\\dfrac{1}{2}$',
              '$\\dfrac{\\sqrt{2}}{2}$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$1$',
            ],
            [
              '$\\cos\\alpha$',
              '$1$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$\\dfrac{\\sqrt{2}}{2}$',
              '$\\dfrac{1}{2}$',
              '$0$',
            ],
            ['$\\tan\\alpha$', '$0$', '$\\dfrac{\\sqrt{3}}{3}$', '$1$', '$\\sqrt{3}$', '||'],
            ['$\\cot\\alpha$', '||', '$\\sqrt{3}$', '$1$', '$\\dfrac{\\sqrt{3}}{3}$', '$0$'],
          ],
        },
        {
          type: 'p',
          text: 'Với các góc khác, ta dùng máy tính cầm tay; nhớ chọn đúng đơn vị đo góc (độ hoặc radian) trước khi bấm.',
        },
      ],
    },
    {
      heading: 'Quan hệ giữa các giá trị lượng giác',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các hệ thức cơ bản',
          text: '$\\sin^2\\alpha + \\cos^2\\alpha = 1$; $\\quad 1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}$ $\\left(\\alpha \\ne \\dfrac{\\pi}{2} + k\\pi\\right)$; $\\quad 1 + \\cot^2\\alpha = \\dfrac{1}{\\sin^2\\alpha}$ $(\\alpha \\ne k\\pi)$; $\\quad \\tan\\alpha \\cdot \\cot\\alpha = 1$ $\\left(\\alpha \\ne \\dfrac{k\\pi}{2}\\right)$.',
        },
        {
          type: 'p',
          text: 'Hệ thức đầu tiên chính là định lí Pythagore cho điểm $M(\\cos\\alpha; \\sin\\alpha)$ nằm trên đường tròn bán kính $1$. Chia hai vế cho $\\cos^2\\alpha$ hoặc $\\sin^2\\alpha$ được hai hệ thức tiếp theo.',
        },
        {
          type: 'table',
          caption: 'Giá trị lượng giác của các góc có liên quan đặc biệt',
          head: ['Hai góc', 'Quan hệ'],
          rows: [
            [
              'Đối nhau: $\\alpha$ và $-\\alpha$',
              '$\\cos(-\\alpha) = \\cos\\alpha$, $\\sin(-\\alpha) = -\\sin\\alpha$, $\\tan(-\\alpha) = -\\tan\\alpha$, $\\cot(-\\alpha) = -\\cot\\alpha$',
            ],
            [
              'Bù nhau: $\\alpha$ và $\\pi - \\alpha$',
              '$\\sin(\\pi - \\alpha) = \\sin\\alpha$, $\\cos(\\pi - \\alpha) = -\\cos\\alpha$, $\\tan(\\pi - \\alpha) = -\\tan\\alpha$, $\\cot(\\pi - \\alpha) = -\\cot\\alpha$',
            ],
            [
              'Phụ nhau: $\\alpha$ và $\\dfrac{\\pi}{2} - \\alpha$',
              '$\\sin\\left(\\dfrac{\\pi}{2} - \\alpha\\right) = \\cos\\alpha$, $\\cos\\left(\\dfrac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$, $\\tan\\left(\\dfrac{\\pi}{2} - \\alpha\\right) = \\cot\\alpha$, $\\cot\\left(\\dfrac{\\pi}{2} - \\alpha\\right) = \\tan\\alpha$',
            ],
            [
              'Hơn kém $\\pi$: $\\alpha$ và $\\pi + \\alpha$',
              '$\\sin(\\pi + \\alpha) = -\\sin\\alpha$, $\\cos(\\pi + \\alpha) = -\\cos\\alpha$, $\\tan(\\pi + \\alpha) = \\tan\\alpha$, $\\cot(\\pi + \\alpha) = \\cot\\alpha$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi biết một giá trị lượng giác và cần tìm giá trị khác bằng hệ thức $\\sin^2\\alpha + \\cos^2\\alpha = 1$, ta được hai giá trị đối nhau; phải dựa vào góc phần tư chứa điểm biểu diễn để chọn dấu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường tròn lượng giác quay nhiều vòng',
    instruction:
      'Kéo điểm M trên đường tròn (hoặc chọn M rồi dùng phím mũi tên; giữ Shift để quay nhanh). Đường xoắn ghi lại cả những vòng đã quay, bảng bên cạnh cho số đo theo độ và radian cùng bốn giá trị lượng giác. Bấm "+1 vòng" để thấy điểm M và các giá trị không đổi.',
  },
  examples: [
    {
      problem: 'a) Đổi $72^\\circ$ sang radian. b) Đổi $\\dfrac{3\\pi}{4}$ rad sang độ.',
      steps: [
        'a) $72^\\circ = 72 \\cdot \\dfrac{\\pi}{180} = \\dfrac{72\\pi}{180} = \\dfrac{2\\pi}{5}$.',
        'b) $\\dfrac{3\\pi}{4} = \\dfrac{3}{4} \\cdot 180^\\circ = 135^\\circ$.',
      ],
      answer: '$72^\\circ = \\dfrac{2\\pi}{5}$ và $\\dfrac{3\\pi}{4} = 135^\\circ$.',
    },
    {
      problem:
        'Xác định điểm biểu diễn của góc lượng giác có số đo $-765^\\circ$ trên đường tròn lượng giác và tính $\\sin(-765^\\circ)$, $\\cos(-765^\\circ)$.',
      steps: [
        'Viết $-765^\\circ = -45^\\circ + (-2) \\cdot 360^\\circ$: quay theo chiều âm hai vòng rồi thêm $45^\\circ$.',
        "Vậy góc $-765^\\circ$ có cùng điểm biểu diễn $M$ với góc $-45^\\circ$; $M$ là điểm chính giữa cung nhỏ $AB'$, thuộc góc phần tư thứ IV.",
        '$\\sin(-765^\\circ) = \\sin(-45^\\circ) = -\\sin 45^\\circ = -\\dfrac{\\sqrt{2}}{2}$.',
        '$\\cos(-765^\\circ) = \\cos(-45^\\circ) = \\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$.',
      ],
      answer:
        '$\\sin(-765^\\circ) = -\\dfrac{\\sqrt{2}}{2}$, $\\cos(-765^\\circ) = \\dfrac{\\sqrt{2}}{2}$.',
    },
    {
      problem:
        'Cho $\\sin\\alpha = \\dfrac{3}{5}$ với $\\dfrac{\\pi}{2} < \\alpha < \\pi$. Tính $\\cos\\alpha$, $\\tan\\alpha$ và $\\cot\\alpha$.',
      steps: [
        '$\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.',
        'Vì $\\dfrac{\\pi}{2} < \\alpha < \\pi$ nên điểm biểu diễn thuộc góc phần tư thứ II, $\\cos\\alpha < 0$. Do đó $\\cos\\alpha = -\\dfrac{4}{5}$.',
        '$\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\dfrac{3}{5} : \\left(-\\dfrac{4}{5}\\right) = -\\dfrac{3}{4}$ và $\\cot\\alpha = \\dfrac{1}{\\tan\\alpha} = -\\dfrac{4}{3}$.',
      ],
      answer:
        '$\\cos\\alpha = -\\dfrac{4}{5}$, $\\tan\\alpha = -\\dfrac{3}{4}$, $\\cot\\alpha = -\\dfrac{4}{3}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Số đo theo radian của góc $105^\\circ$ là $k\\pi$. Tìm $k$ (viết dưới dạng phân số tối giản).',
      answer: [7, 12],
      simplest: true,
      hints: ['$1^\\circ = \\dfrac{\\pi}{180}$ rad.', 'Rút gọn phân số $\\dfrac{105}{180}$.'],
      solution:
        '$105^\\circ = \\dfrac{105\\pi}{180} = \\dfrac{7\\pi}{12}$, nên $k = \\dfrac{7}{12}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi $\\dfrac{5\\pi}{4}$ rad sang độ. Góc đó bằng bao nhiêu độ?',
      answer: 225,
      hints: ['$\\pi$ rad $= 180^\\circ$.'],
      solution: '$\\dfrac{5\\pi}{4} = \\dfrac{5}{4} \\cdot 180^\\circ = 225^\\circ$.',
    },
    {
      type: 'multi',
      prompt:
        'Những góc lượng giác nào có cùng điểm biểu diễn trên đường tròn lượng giác với góc $30^\\circ$?',
      options: ['$390^\\circ$', '$-330^\\circ$', '$150^\\circ$', '$210^\\circ$', '$750^\\circ$'],
      answers: [0, 1, 4],
      hints: [
        'Hai góc có cùng điểm biểu diễn khi chúng hơn kém nhau một số nguyên lần $360^\\circ$.',
      ],
      solution:
        '$390^\\circ = 30^\\circ + 360^\\circ$, $-330^\\circ = 30^\\circ - 360^\\circ$, $750^\\circ = 30^\\circ + 2 \\cdot 360^\\circ$. Còn $150^\\circ - 30^\\circ = 120^\\circ$ và $210^\\circ - 30^\\circ = 180^\\circ$ không phải bội của $360^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một bánh xe có bán kính $20$ cm quay được một góc $1{,}5$ rad. Một điểm trên vành bánh xe đi được quãng đường dài bao nhiêu xăng-ti-mét?',
      answer: 30,
      unit: 'cm',
      hints: ['Độ dài cung: $l = R\\alpha$ với $\\alpha$ tính bằng radian.'],
      solution: '$l = R\\alpha = 20 \\cdot 1{,}5 = 30$ (cm).',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $\\sin\\alpha = \\dfrac{5}{13}$ với $\\dfrac{\\pi}{2} < \\alpha < \\pi$. Tính $\\cos\\alpha$.',
      answer: [-12, 13],
      hints: [
        '$\\cos^2\\alpha = 1 - \\sin^2\\alpha$.',
        'Điểm biểu diễn của $\\alpha$ thuộc góc phần tư thứ II, nên $\\cos\\alpha$ mang dấu gì?',
      ],
      solution:
        '$\\cos^2\\alpha = 1 - \\dfrac{25}{169} = \\dfrac{144}{169}$. Vì $\\dfrac{\\pi}{2} < \\alpha < \\pi$ nên $\\cos\\alpha < 0$, do đó $\\cos\\alpha = -\\dfrac{12}{13}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $\\cos\\alpha = -\\dfrac{4}{5}$ với $\\pi < \\alpha < \\dfrac{3\\pi}{2}$. Tính $\\tan\\alpha$.',
      answer: [3, 4],
      hints: [
        'Tìm $\\sin\\alpha$ trước, chú ý dấu ở góc phần tư thứ III.',
        '$\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$.',
      ],
      solution:
        '$\\sin^2\\alpha = 1 - \\dfrac{16}{25} = \\dfrac{9}{25}$; ở góc phần tư thứ III, $\\sin\\alpha < 0$ nên $\\sin\\alpha = -\\dfrac{3}{5}$. Vậy $\\tan\\alpha = \\dfrac{-3/5}{-4/5} = \\dfrac{3}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Cho $\\tan\\alpha = 2$. Tính $\\cos^2\\alpha$.',
      answer: [1, 5],
      hints: ['Dùng $1 + \\tan^2\\alpha = \\dfrac{1}{\\cos^2\\alpha}$.'],
      solution: '$\\dfrac{1}{\\cos^2\\alpha} = 1 + 2^2 = 5$, nên $\\cos^2\\alpha = \\dfrac{1}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\pi < \\alpha < \\dfrac{3\\pi}{2}$. Khẳng định nào đúng?',
      options: [
        '$\\sin\\alpha < 0$ và $\\tan\\alpha > 0$',
        '$\\sin\\alpha > 0$ và $\\cos\\alpha < 0$',
        '$\\cos\\alpha > 0$ và $\\tan\\alpha < 0$',
        '$\\sin\\alpha < 0$ và $\\cot\\alpha < 0$',
      ],
      answer: 0,
      hints: ['Điểm biểu diễn thuộc góc phần tư thứ III: cả hoành độ và tung độ đều âm.'],
      solution:
        'Ở góc phần tư thứ III, $\\cos\\alpha < 0$ và $\\sin\\alpha < 0$, nên $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha} > 0$ và $\\cot\\alpha > 0$. Chỉ khẳng định "$\\sin\\alpha < 0$ và $\\tan\\alpha > 0$" đúng.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\cos\\dfrac{2\\pi}{3}$ (viết dưới dạng số thập phân).',
      answer: -0.5,
      hints: ['$\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$: hai góc bù nhau.'],
      solution:
        '$\\cos\\dfrac{2\\pi}{3} = \\cos\\left(\\pi - \\dfrac{\\pi}{3}\\right) = -\\cos\\dfrac{\\pi}{3} = -\\dfrac{1}{2} = -0{,}5$.',
    },
    {
      type: 'choice',
      prompt:
        'Rút gọn $A = \\sin(\\pi - \\alpha) + \\cos\\left(\\dfrac{\\pi}{2} - \\alpha\\right)$.',
      options: ['$2\\sin\\alpha$', '$0$', '$\\sin\\alpha + \\cos\\alpha$', '$2\\cos\\alpha$'],
      answer: 0,
      hints: ['Góc bù nhau có sin bằng nhau; góc phụ nhau có côsin góc này bằng sin góc kia.'],
      solution:
        '$\\sin(\\pi - \\alpha) = \\sin\\alpha$ và $\\cos\\left(\\dfrac{\\pi}{2} - \\alpha\\right) = \\sin\\alpha$, nên $A = 2\\sin\\alpha$.',
    },
  ],
  takeaways: [
    'Số đo góc lượng giác: $\\alpha^\\circ + k360^\\circ$ hay $\\alpha + k2\\pi$ $(k \\in \\mathbb{Z})$; $\\pi$ rad $= 180^\\circ$.',
    'Độ dài cung tròn bán kính $R$, số đo $\\alpha$ rad: $l = R\\alpha$.',
    'Điểm biểu diễn $M(x; y)$: $\\cos\\alpha = x$, $\\sin\\alpha = y$, $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$, $\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}$.',
    '$\\sin^2\\alpha + \\cos^2\\alpha = 1$; dấu của giá trị lượng giác do góc phần tư chứa điểm $M$ quyết định.',
    'Cos đối, sin bù, phụ chéo, hơn kém $\\pi$ tang và côtang.',
  ],
};
