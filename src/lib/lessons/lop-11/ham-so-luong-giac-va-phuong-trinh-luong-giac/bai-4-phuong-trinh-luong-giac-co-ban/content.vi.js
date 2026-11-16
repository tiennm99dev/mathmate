/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình tương đương; công thức nghiệm của các phương trình lượng giác cơ bản sin x = m, cos x = m, tan x = m, cot x = m; các trường hợp đặc biệt và cách viết họ nghiệm theo chu kì.',
  intro:
    'Độ cao của một cabin đu quay so với trục quay tỉ lệ với $\\sin x$, trong đó $x$ là góc quay. Hỏi khi nào cabin ở độ cao bằng nửa bán kính? Ta cần giải phương trình $\\sin x = \\dfrac{1}{2}$. Vì cabin quay mãi, phương trình có vô số nghiệm; bài này cho cách viết gọn tất cả các nghiệm đó thành các họ nghiệm.',
  objectives: [
    'Nhận biết hai phương trình tương đương.',
    'Giải các phương trình $\\sin x = m$, $\\cos x = m$, $\\tan x = m$, $\\cot x = m$ và viết họ nghiệm.',
    'Giải các phương trình dạng $\\sin u = \\sin v$, $\\cos u = \\cos v$ và tìm nghiệm thuộc một khoảng cho trước.',
  ],
  sections: [
    {
      heading: 'Phương trình tương đương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương trình tương đương',
          text: 'Hai phương trình được gọi là tương đương nếu chúng có cùng tập nghiệm. Nếu phương trình $f(x) = 0$ tương đương với phương trình $g(x) = 0$ thì ta viết $f(x) = 0 \\Leftrightarrow g(x) = 0$.',
        },
        {
          type: 'p',
          text: 'Cộng hoặc trừ hai vế với cùng một số hay một biểu thức (mà không làm thay đổi điều kiện của phương trình), nhân hoặc chia hai vế với cùng một số khác $0$, ta được phương trình tương đương. Đó là các phép biến đổi tương đương.',
        },
      ],
    },
    {
      heading: 'Phương trình sin x = m',
      blocks: [
        {
          type: 'list',
          items: [
            'Nếu $|m| > 1$ thì phương trình vô nghiệm, vì $-1 \\le \\sin x \\le 1$.',
            'Nếu $|m| \\le 1$, gọi $\\alpha$ là góc có $\\sin\\alpha = m$. Khi đó:',
          ],
        },
        {
          type: 'tex',
          tex: '\\sin x = m \\Leftrightarrow \\left[\\begin{array}{l} x = \\alpha + k2\\pi \\\\ x = \\pi - \\alpha + k2\\pi \\end{array}\\right. \\quad (k \\in \\mathbb{Z}).',
        },
        {
          type: 'p',
          text: 'Trên đường tròn lượng giác, đường thẳng $y = m$ cắt đường tròn tại hai điểm đối xứng qua trục tung, ứng với $\\alpha$ và $\\pi - \\alpha$; mỗi điểm cho một họ nghiệm vì hàm sin tuần hoàn chu kì $2\\pi$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Tổng quát, $\\sin u = \\sin v \\Leftrightarrow u = v + k2\\pi$ hoặc $u = \\pi - v + k2\\pi$ $(k \\in \\mathbb{Z})$. Nếu dùng độ: $\\sin x = \\sin a^\\circ \\Leftrightarrow x = a^\\circ + k360^\\circ$ hoặc $x = 180^\\circ - a^\\circ + k360^\\circ$. Không dùng đồng thời hai đơn vị trong một công thức nghiệm.',
        },
        {
          type: 'table',
          caption: 'Các trường hợp đặc biệt',
          head: ['Phương trình', 'Nghiệm $(k \\in \\mathbb{Z})$'],
          rows: [
            ['$\\sin x = 1$', '$x = \\dfrac{\\pi}{2} + k2\\pi$'],
            ['$\\sin x = -1$', '$x = -\\dfrac{\\pi}{2} + k2\\pi$'],
            ['$\\sin x = 0$', '$x = k\\pi$'],
          ],
        },
      ],
    },
    {
      heading: 'Phương trình cos x = m',
      blocks: [
        {
          type: 'list',
          items: [
            'Nếu $|m| > 1$ thì phương trình vô nghiệm.',
            'Nếu $|m| \\le 1$, gọi $\\alpha$ là góc có $\\cos\\alpha = m$. Khi đó $\\cos x = m \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = -\\alpha + k2\\pi$ $(k \\in \\mathbb{Z})$.',
          ],
        },
        {
          type: 'p',
          text: 'Đường thẳng $x = m$ cắt đường tròn lượng giác tại hai điểm đối xứng qua trục hoành, ứng với $\\alpha$ và $-\\alpha$. Tổng quát: $\\cos u = \\cos v \\Leftrightarrow u = \\pm v + k2\\pi$ $(k \\in \\mathbb{Z})$.',
        },
        {
          type: 'table',
          caption: 'Các trường hợp đặc biệt',
          head: ['Phương trình', 'Nghiệm $(k \\in \\mathbb{Z})$'],
          rows: [
            ['$\\cos x = 1$', '$x = k2\\pi$'],
            ['$\\cos x = -1$', '$x = \\pi + k2\\pi$'],
            ['$\\cos x = 0$', '$x = \\dfrac{\\pi}{2} + k\\pi$'],
          ],
        },
      ],
    },
    {
      heading: 'Phương trình tan x = m và cot x = m',
      blocks: [
        {
          type: 'p',
          text: 'Hàm số tang và côtang nhận mọi giá trị thực nên hai phương trình này luôn có nghiệm, với mọi $m$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức nghiệm',
          text: 'Gọi $\\alpha$ là góc có $\\tan\\alpha = m$ (lấy $-\\dfrac{\\pi}{2} < \\alpha < \\dfrac{\\pi}{2}$): $\\tan x = m \\Leftrightarrow x = \\alpha + k\\pi$. Gọi $\\alpha$ là góc có $\\cot\\alpha = m$ (lấy $0 < \\alpha < \\pi$): $\\cot x = m \\Leftrightarrow x = \\alpha + k\\pi$ $(k \\in \\mathbb{Z})$.',
        },
        {
          type: 'p',
          text: 'Mỗi phương trình chỉ có một họ nghiệm vì chu kì của tang và côtang là $\\pi$: hai điểm biểu diễn của $\\alpha$ và $\\alpha + \\pi$ đối xứng qua gốc $O$. Tổng quát, $\\tan u = \\tan v \\Leftrightarrow u = v + k\\pi$ và $\\cot u = \\cot v \\Leftrightarrow u = v + k\\pi$, với điều kiện các biểu thức có nghĩa.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dùng máy tính cầm tay',
          text: 'Khi $m$ không phải giá trị đặc biệt, ta dùng các phím SHIFT sin, SHIFT cos, SHIFT tan của máy tính cầm tay để tìm góc $\\alpha$, chẳng hạn $\\sin\\alpha = \\dfrac{1}{3}$ cho $\\alpha \\approx 19{,}47^\\circ$. Muốn có nghiệm theo radian, chuyển máy sang chế độ radian trước khi bấm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường ngang y = m cắt đồ thị',
    instruction:
      'Chọn một phương trình, kéo thanh trượt hoặc bấm một giá trị đặc biệt của $m$. Các giao điểm của đường thẳng $y = m$ với đồ thị trên đoạn $[-2\\pi; 2\\pi]$ được tô màu theo họ nghiệm, cùng các điểm tương ứng trên đường tròn lượng giác và giá trị của $k$.',
  },
  examples: [
    {
      problem: 'Giải phương trình $\\sin x = \\dfrac{\\sqrt{3}}{2}$.',
      steps: [
        'Ta có $\\dfrac{\\sqrt{3}}{2} = \\sin\\dfrac{\\pi}{3}$, nên phương trình trở thành $\\sin x = \\sin\\dfrac{\\pi}{3}$.',
        '$\\Leftrightarrow x = \\dfrac{\\pi}{3} + k2\\pi$ hoặc $x = \\pi - \\dfrac{\\pi}{3} + k2\\pi = \\dfrac{2\\pi}{3} + k2\\pi$ $(k \\in \\mathbb{Z})$.',
      ],
      answer:
        '$x = \\dfrac{\\pi}{3} + k2\\pi$, $x = \\dfrac{2\\pi}{3} + k2\\pi$ $(k \\in \\mathbb{Z})$.',
    },
    {
      problem:
        'Giải phương trình $\\cos\\left(2x - \\dfrac{\\pi}{4}\\right) = -\\dfrac{\\sqrt{2}}{2}$.',
      steps: [
        '$-\\dfrac{\\sqrt{2}}{2} = \\cos\\dfrac{3\\pi}{4}$, nên $2x - \\dfrac{\\pi}{4} = \\pm\\dfrac{3\\pi}{4} + k2\\pi$.',
        'Với dấu $+$: $2x = \\pi + k2\\pi$, tức là $x = \\dfrac{\\pi}{2} + k\\pi$.',
        'Với dấu $-$: $2x = -\\dfrac{\\pi}{2} + k2\\pi$, tức là $x = -\\dfrac{\\pi}{4} + k\\pi$.',
      ],
      answer:
        '$x = \\dfrac{\\pi}{2} + k\\pi$, $x = -\\dfrac{\\pi}{4} + k\\pi$ $(k \\in \\mathbb{Z})$.',
    },
    {
      problem: 'Giải phương trình $\\sin 2x = \\cos x$.',
      steps: [
        'Viết $\\cos x = \\sin\\left(\\dfrac{\\pi}{2} - x\\right)$: phương trình thành $\\sin 2x = \\sin\\left(\\dfrac{\\pi}{2} - x\\right)$.',
        'Trường hợp 1: $2x = \\dfrac{\\pi}{2} - x + k2\\pi \\Leftrightarrow 3x = \\dfrac{\\pi}{2} + k2\\pi \\Leftrightarrow x = \\dfrac{\\pi}{6} + \\dfrac{k2\\pi}{3}$.',
        'Trường hợp 2: $2x = \\pi - \\left(\\dfrac{\\pi}{2} - x\\right) + k2\\pi \\Leftrightarrow x = \\dfrac{\\pi}{2} + k2\\pi$.',
      ],
      answer:
        '$x = \\dfrac{\\pi}{6} + \\dfrac{k2\\pi}{3}$, $x = \\dfrac{\\pi}{2} + k2\\pi$ $(k \\in \\mathbb{Z})$.',
    },
    {
      problem: 'Giải phương trình $\\tan x = 3$.',
      steps: [
        '$3$ không phải giá trị đặc biệt; dùng máy tính cầm tay (SHIFT tan 3) được góc $\\alpha$ với $\\tan\\alpha = 3$, $\\alpha \\approx 71{,}57^\\circ \\approx 1{,}249$ rad.',
        'Phương trình $\\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k\\pi$.',
      ],
      answer:
        '$x = \\alpha + k\\pi$ $(k \\in \\mathbb{Z})$, với $\\tan\\alpha = 3$, $\\alpha \\approx 1{,}249$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $\\sin x = \\dfrac{1}{2}$ là',
      options: [
        '$x = \\dfrac{\\pi}{6} + k2\\pi$, $x = \\dfrac{5\\pi}{6} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\pm\\dfrac{\\pi}{6} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{6} + k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\pm\\dfrac{\\pi}{3} + k2\\pi$ $(k \\in \\mathbb{Z})$',
      ],
      answer: 0,
      hints: [
        '$\\dfrac{1}{2} = \\sin\\dfrac{\\pi}{6}$.',
        'Họ thứ hai của phương trình sin là $\\pi - \\alpha + k2\\pi$.',
      ],
      solution:
        '$\\sin x = \\sin\\dfrac{\\pi}{6} \\Leftrightarrow x = \\dfrac{\\pi}{6} + k2\\pi$ hoặc $x = \\pi - \\dfrac{\\pi}{6} + k2\\pi = \\dfrac{5\\pi}{6} + k2\\pi$. Công thức "$\\pm$" là của phương trình côsin.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $\\cos x = 0$ là',
      options: [
        '$x = \\dfrac{\\pi}{2} + k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{2} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = k2\\pi$ $(k \\in \\mathbb{Z})$',
      ],
      answer: 0,
      hints: ["Điểm biểu diễn có hoành độ $0$ là $B(0; 1)$ và $B'(0; -1)$."],
      solution:
        "Hai điểm $B$ và $B'$ ứng với $\\dfrac{\\pi}{2}$ và $-\\dfrac{\\pi}{2}$, cách nhau $\\pi$, nên $x = \\dfrac{\\pi}{2} + k\\pi$ $(k \\in \\mathbb{Z})$.",
    },
    {
      type: 'number',
      prompt: 'Phương trình $\\sin x = \\dfrac{1}{2}$ có bao nhiêu nghiệm thuộc đoạn $[0; 2\\pi]$?',
      answer: 2,
      hints: [
        'Thử các giá trị $k$ trong hai họ $\\dfrac{\\pi}{6} + k2\\pi$ và $\\dfrac{5\\pi}{6} + k2\\pi$.',
      ],
      solution:
        'Chỉ có $x = \\dfrac{\\pi}{6}$ và $x = \\dfrac{5\\pi}{6}$ (ứng với $k = 0$) thuộc $[0; 2\\pi]$: $2$ nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Tìm nghiệm thuộc khoảng $(0^\\circ; 180^\\circ)$ của phương trình $\\tan x = \\sqrt{3}$ (theo độ).',
      answer: 60,
      hints: ['$\\sqrt{3} = \\tan 60^\\circ$; các nghiệm cách nhau $180^\\circ$.'],
      solution:
        '$\\tan x = \\tan 60^\\circ \\Leftrightarrow x = 60^\\circ + k180^\\circ$. Trong $(0^\\circ; 180^\\circ)$ chỉ có $x = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tìm nghiệm dương nhỏ nhất của phương trình $\\cos 2x = \\dfrac{1}{2}$ (theo độ).',
      answer: 30,
      hints: [
        '$\\cos 2x = \\cos 60^\\circ \\Leftrightarrow 2x = \\pm 60^\\circ + k360^\\circ$.',
        'Chia hai vế cho $2$.',
      ],
      solution:
        '$2x = \\pm 60^\\circ + k360^\\circ \\Leftrightarrow x = \\pm 30^\\circ + k180^\\circ$. Các nghiệm dương: $30^\\circ$, $150^\\circ$, $210^\\circ$, ...; nhỏ nhất là $30^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tính tổng các nghiệm thuộc đoạn $[0^\\circ; 360^\\circ]$ của phương trình $\\cos x = -\\dfrac{1}{2}$ (theo độ).',
      answer: 360,
      hints: [
        '$-\\dfrac{1}{2} = \\cos 120^\\circ$.',
        'Hai họ: $x = 120^\\circ + k360^\\circ$ và $x = -120^\\circ + k360^\\circ$.',
      ],
      solution:
        'Trong $[0^\\circ; 360^\\circ]$ có $x = 120^\\circ$ và $x = -120^\\circ + 360^\\circ = 240^\\circ$. Tổng bằng $360^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình nào sau đây vô nghiệm?',
      options: ['$\\sin x = 1{,}2$', '$\\cos x = -0{,}9$', '$\\tan x = 5$', '$\\cot x = -10$'],
      answer: 0,
      hints: [
        'Giá trị của sin và côsin luôn nằm trong đoạn $[-1; 1]$; tang và côtang nhận mọi giá trị.',
      ],
      solution:
        '$1{,}2 > 1$ nên $\\sin x = 1{,}2$ vô nghiệm. $\\cos x = -0{,}9$ có nghiệm vì $|-0{,}9| \\le 1$; các phương trình tang, côtang luôn có nghiệm.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $\\tan x = 1$ có bao nhiêu nghiệm thuộc khoảng $(-\\pi; \\pi)$?',
      answer: 2,
      hints: ['$x = \\dfrac{\\pi}{4} + k\\pi$; thử $k = -1, 0, 1$.'],
      solution:
        '$k = 0$: $x = \\dfrac{\\pi}{4}$; $k = -1$: $x = -\\dfrac{3\\pi}{4}$; $k = 1$ cho $\\dfrac{5\\pi}{4} > \\pi$. Có $2$ nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Tìm nghiệm thuộc khoảng $(0^\\circ; 180^\\circ)$ của phương trình $\\cot x = -1$ (theo độ).',
      answer: 135,
      hints: [
        'Với côtang, chọn $\\alpha$ trong khoảng $(0^\\circ; 180^\\circ)$ có $\\cot\\alpha = -1$.',
      ],
      solution:
        '$\\cot 135^\\circ = \\dfrac{\\cos 135^\\circ}{\\sin 135^\\circ} = -1$, nên $x = 135^\\circ + k180^\\circ$; trong $(0^\\circ; 180^\\circ)$ chỉ có $x = 135^\\circ$.',
    },
  ],
  takeaways: [
    '$\\sin x = \\sin\\alpha \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = \\pi - \\alpha + k2\\pi$; vô nghiệm khi $|m| > 1$.',
    '$\\cos x = \\cos\\alpha \\Leftrightarrow x = \\pm\\alpha + k2\\pi$; vô nghiệm khi $|m| > 1$.',
    '$\\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k\\pi$; $\\cot x = \\cot\\alpha \\Leftrightarrow x = \\alpha + k\\pi$; luôn có nghiệm.',
    'Đặc biệt: $\\sin x = 0 \\Leftrightarrow x = k\\pi$, $\\cos x = 0 \\Leftrightarrow x = \\dfrac{\\pi}{2} + k\\pi$, $\\sin x = 1 \\Leftrightarrow x = \\dfrac{\\pi}{2} + k2\\pi$, $\\cos x = 1 \\Leftrightarrow x = k2\\pi$.',
  ],
};
