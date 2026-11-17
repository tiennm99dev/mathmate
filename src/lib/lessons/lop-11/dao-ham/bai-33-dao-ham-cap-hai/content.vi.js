/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đạo hàm cấp hai: định nghĩa, cách tính bằng cách lấy đạo hàm hai lần, và ý nghĩa cơ học: gia tốc tức thời của chuyển động là đạo hàm cấp hai của quãng đường theo thời gian.',
  intro:
    'Khi một chiếc xe tăng tốc, vận tốc của nó thay đổi theo thời gian. Vận tốc là đạo hàm của quãng đường; vậy độ nhanh chậm của sự thay đổi vận tốc, tức gia tốc, là đạo hàm của vận tốc. Lấy đạo hàm hai lần như thế, ta được đạo hàm cấp hai.',
  objectives: [
    'Nhận biết khái niệm đạo hàm cấp hai của một hàm số.',
    'Tính đạo hàm cấp hai của một số hàm số đơn giản.',
    'Dùng đạo hàm cấp hai để tính gia tốc tức thời của chuyển động.',
  ],
  sections: [
    {
      heading: 'Khái niệm đạo hàm cấp hai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Giả sử hàm số $y = f(x)$ có đạo hàm $y' = f'(x)$ tại mọi điểm $x \\in (a; b)$. Nếu hàm số $y' = f'(x)$ lại có đạo hàm tại $x$ thì ta gọi đạo hàm của $y'$ tại $x$ là đạo hàm cấp hai của hàm số $y = f(x)$ tại $x$, kí hiệu $y''$ hoặc $f''(x)$: $$y'' = (y')'.$$",
        },
        {
          type: 'p',
          text: "Để tính đạo hàm cấp hai, ta tính $y'$ bằng các quy tắc đã học, rút gọn, rồi lấy đạo hàm của $y'$ một lần nữa. Chẳng hạn với $y = x^3 - 2x$: $y' = 3x^2 - 2$ và $y'' = 6x$.",
        },
        {
          type: 'table',
          head: ['Hàm số $y$', "$y'$", "$y''$"],
          rows: [
            ['$x^n$ ($n \\ge 2$)', '$nx^{n-1}$', '$n(n - 1)x^{n-2}$'],
            ['$\\sin x$', '$\\cos x$', '$-\\sin x$'],
            ['$\\cos x$', '$-\\sin x$', '$-\\cos x$'],
            ['$e^{kx}$', '$ke^{kx}$', '$k^2e^{kx}$'],
            ['$\\ln x$', '$\\dfrac{1}{x}$', '$-\\dfrac{1}{x^2}$'],
          ],
          caption: 'Đạo hàm cấp hai của một số hàm số thường gặp.',
        },
      ],
    },
    {
      heading: 'Ý nghĩa cơ học của đạo hàm cấp hai',
      blocks: [
        {
          type: 'p',
          text: "Một chuyển động có phương trình $s = f(t)$. Vận tốc tức thời là $v(t) = f'(t)$. Gia tốc trung bình trong khoảng thời gian từ $t$ đến $t + \\Delta t$ là $\\dfrac{v(t + \\Delta t) - v(t)}{\\Delta t}$; giới hạn của nó khi $\\Delta t \\to 0$ là gia tốc tức thời tại thời điểm $t$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ý nghĩa cơ học',
          text: "Đạo hàm cấp hai $f''(t)$ là gia tốc tức thời của chuyển động $s = f(t)$ tại thời điểm $t$: $$a(t) = v'(t) = f''(t).$$",
        },
        {
          type: 'list',
          items: [
            'Hệ số góc của tiếp tuyến của đồ thị vị trí là vận tốc; hệ số góc của tiếp tuyến của đồ thị vận tốc là gia tốc.',
            'Nếu $v$ và $a$ cùng dấu thì vật chuyển động nhanh dần; nếu $v$ và $a$ trái dấu thì vật chuyển động chậm dần.',
            'Vật rơi tự do $s = \\dfrac{1}{2}gt^2$ có $v = gt$ và $a = g$: gia tốc không đổi, bằng gia tốc trọng trường.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Vị trí, vận tốc, gia tốc',
    instruction:
      'Chọn một chuyển động, rồi kéo thanh thời gian hoặc bấm "Cho vật chuyển động". Ba điểm trên ba đồ thị luôn cùng một thời điểm $t$. Quan sát: tiếp tuyến của đồ thị vị trí nằm ngang đúng lúc $v = 0$, và đồ thị vận tốc đi lên khi $a > 0$, đi xuống khi $a < 0$.',
  },
  examples: [
    {
      problem: "Cho hàm số $y = x^3 - 3x^2 + 2x$. Tính $y''$ và $y''(2)$.",
      steps: [
        "$y' = 3x^2 - 6x + 2$.",
        "$y'' = (3x^2 - 6x + 2)' = 6x - 6$.",
        "$y''(2) = 6 \\cdot 2 - 6 = 6$.",
      ],
      answer: "$y'' = 6x - 6$, $y''(2) = 6$.",
    },
    {
      problem: 'Tính đạo hàm cấp hai của các hàm số: a) $y = \\sin 2x$; b) $y = xe^x$.',
      steps: [
        "a) $y' = 2\\cos 2x$, nên $y'' = 2 \\cdot (-2\\sin 2x) = -4\\sin 2x$.",
        "b) $y' = e^x + xe^x = (x + 1)e^x$.",
        "b) $y'' = (x + 1)'e^x + (x + 1)(e^x)' = e^x + (x + 1)e^x = (x + 2)e^x$.",
      ],
      answer: "a) $y'' = -4\\sin 2x$; b) $y'' = (x + 2)e^x$.",
    },
    {
      problem:
        'Một vật chuyển động có phương trình $s(t) = t^3 - 3t^2 + 5t + 2$, trong đó $s$ tính bằng mét, $t$ tính bằng giây. Tính vận tốc và gia tốc của vật tại thời điểm $t = 3$.',
      steps: [
        "$v(t) = s'(t) = 3t^2 - 6t + 5$, nên $v(3) = 27 - 18 + 5 = 14$ (m/s).",
        "$a(t) = s''(t) = 6t - 6$, nên $a(3) = 18 - 6 = 12$ (m/s²).",
      ],
      answer: '$v(3) = 14$ m/s, $a(3) = 12$ m/s².',
    },
    {
      problem:
        'Một vật dao động điều hoà có phương trình $x(t) = 2\\cos(\\pi t)$ (cm). Tìm gia tốc $a(t)$ và chứng tỏ $a(t) = -\\pi^2 x(t)$.',
      steps: [
        "$v(t) = x'(t) = -2\\pi\\sin(\\pi t)$.",
        "$a(t) = v'(t) = -2\\pi \\cdot \\pi\\cos(\\pi t) = -2\\pi^2\\cos(\\pi t)$.",
        'Vì $x(t) = 2\\cos(\\pi t)$ nên $a(t) = -\\pi^2 \\cdot 2\\cos(\\pi t) = -\\pi^2 x(t)$: gia tốc luôn ngược dấu với li độ.',
      ],
      answer: '$a(t) = -2\\pi^2\\cos(\\pi t) = -\\pi^2 x(t)$ (cm/s²).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: "Cho $f(x) = x^4 - 2x^2 + 1$. Tính $f''(1)$.",
      answer: 8,
      hints: ["Tính $f'(x)$ trước, rồi lấy đạo hàm của $f'(x)$."],
      solution: "$f'(x) = 4x^3 - 4x$, $f''(x) = 12x^2 - 4$, nên $f''(1) = 12 - 4 = 8$.",
    },
    {
      type: 'choice',
      prompt: 'Đạo hàm cấp hai của hàm số $y = \\sin x$ là',
      options: ["$y'' = -\\sin x$", "$y'' = \\sin x$", "$y'' = -\\cos x$", "$y'' = \\cos x$"],
      answer: 0,
      hints: ["$(\\sin x)' = \\cos x$; tiếp tục lấy đạo hàm của $\\cos x$."],
      solution: "$y' = \\cos x$, $y'' = (\\cos x)' = -\\sin x$.",
    },
    {
      type: 'fraction',
      prompt: "Cho $f(x) = \\dfrac{1}{x}$. Tính $f''(2)$.",
      answer: [1, 4],
      hints: [
        "$f'(x) = -\\dfrac{1}{x^2}$.",
        "Viết $-\\dfrac{1}{x^2}$ là $-\\dfrac{1}{v}$ với $v = x^2$ và dùng $\\left(\\dfrac{1}{v}\\right)' = -\\dfrac{v'}{v^2}$.",
      ],
      solution:
        "$f'(x) = -\\dfrac{1}{x^2}$, $f''(x) = \\dfrac{2x}{x^4} = \\dfrac{2}{x^3}$, nên $f''(2) = \\dfrac{2}{8} = \\dfrac{1}{4}$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = e^{2x}$. Tính $f''(0)$.",
      answer: 4,
      hints: ["$(e^u)' = u'e^u$ với $u = 2x$."],
      solution: "$f'(x) = 2e^{2x}$, $f''(x) = 4e^{2x}$, nên $f''(0) = 4e^0 = 4$.",
    },
    {
      type: 'number',
      prompt: "Cho $f(x) = \\ln x$. Tính $f''(1)$.",
      answer: -1,
      hints: ["$f'(x) = \\dfrac{1}{x}$, và $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$."],
      solution: "$f''(x) = -\\dfrac{1}{x^2}$, nên $f''(1) = -1$.",
    },
    {
      type: 'number',
      prompt:
        'Một vật chuyển động có phương trình $s(t) = t^3 - 3t^2 + 4t$ ($s$ tính bằng mét, $t$ tính bằng giây). Tính gia tốc của vật tại thời điểm $t = 2$.',
      answer: 6,
      unit: 'm/s²',
      hints: ["$a(t) = s''(t)$.", "$s'(t) = 3t^2 - 6t + 4$."],
      solution: "$a(t) = s''(t) = 6t - 6$, nên $a(2) = 12 - 6 = 6$ m/s².",
    },
    {
      type: 'number',
      prompt:
        'Với chuyển động $s(t) = t^3 - 3t^2 + 4t$ ở câu trước, tính vận tốc của vật tại thời điểm gia tốc bằng $0$.',
      answer: 1,
      unit: 'm/s',
      hints: [
        'Giải $a(t) = 6t - 6 = 0$ để tìm thời điểm.',
        'Thay thời điểm đó vào $v(t) = 3t^2 - 6t + 4$.',
      ],
      solution:
        '$a(t) = 6t - 6 = 0 \\iff t = 1$. Khi đó $v(1) = 3 - 6 + 4 = 1$ m/s. (Đây cũng là vận tốc nhỏ nhất của vật, vì trước đó $a < 0$ và sau đó $a > 0$.)',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà có li độ $x(t) = 3\\cos 2t$ (cm). Hệ thức nào giữa gia tốc $a(t)$ và li độ $x(t)$ là đúng?',
      options: ['$a = -4x$', '$a = 4x$', '$a = -2x$', '$a = -12x$'],
      answer: 0,
      hints: ["Tính $x'(t)$ rồi $x''(t)$, chú ý thừa số $2$ của hàm hợp xuất hiện hai lần."],
      solution: '$v(t) = -6\\sin 2t$, $a(t) = -12\\cos 2t = -4 \\cdot 3\\cos 2t = -4x(t)$.',
    },
    {
      type: 'choice',
      prompt:
        'Tại một thời điểm, vật có vận tốc $v = -3$ m/s và gia tốc $a = 2$ m/s². Khẳng định nào đúng?',
      options: [
        'Vật đang chuyển động theo chiều âm và chậm dần.',
        'Vật đang chuyển động theo chiều âm và nhanh dần.',
        'Vật đang chuyển động theo chiều dương và nhanh dần.',
        'Vật đang đứng yên.',
      ],
      answer: 0,
      hints: ['Dấu của $v$ cho biết chiều chuyển động.', 'So sánh dấu của $v$ và $a$.'],
      solution:
        '$v < 0$ nên vật đi theo chiều âm; $v$ và $a$ trái dấu nên độ lớn vận tốc đang giảm: vật chuyển động chậm dần.',
    },
  ],
  takeaways: [
    "$y'' = (y')'$: lấy đạo hàm hai lần, rút gọn $y'$ trước khi lấy đạo hàm lần thứ hai.",
    "Chuyển động $s = f(t)$: $v(t) = f'(t)$, $a(t) = v'(t) = f''(t)$.",
    '$v$ và $a$ cùng dấu: nhanh dần; trái dấu: chậm dần.',
    'Dao động điều hoà $x = A\\cos(\\omega t + \\varphi)$ có $a = -\\omega^2 x$.',
  ],
};
