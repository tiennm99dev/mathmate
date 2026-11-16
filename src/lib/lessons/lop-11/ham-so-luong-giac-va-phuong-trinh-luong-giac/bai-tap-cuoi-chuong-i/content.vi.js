/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương I: góc lượng giác và radian, giá trị lượng giác, công thức lượng giác, hàm số lượng giác và phương trình lượng giác cơ bản, kèm bộ đề tự sinh có bản đồ kĩ năng và bài đánh dấu nghiệm trên đường tròn lượng giác.',
  intro:
    'Chương I mở rộng góc thành góc lượng giác quay được nhiều vòng, đo bằng radian, rồi xây dựng sin, côsin, tang, côtang trên đường tròn lượng giác. Từ đó ta có các công thức lượng giác, bốn hàm số lượng giác tuần hoàn và cách giải các phương trình lượng giác cơ bản. Bài ôn tập này hệ thống lại kiến thức, luyện tìm nghiệm trên đường tròn và một bộ đề tự sinh chỉ ra bài nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá kiến thức về góc lượng giác, giá trị lượng giác và các công thức lượng giác.',
    'Nắm vững tính chất và đồ thị của bốn hàm số lượng giác.',
    'Giải thành thạo các phương trình lượng giác cơ bản và biểu diễn nghiệm trên đường tròn lượng giác.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính', 'Điều cần nhớ'],
          rows: [
            [
              'Bài 1',
              'Giá trị lượng giác của góc lượng giác',
              '$\\pi$ rad $= 180^\\circ$; $l = R\\alpha$; $M(\\cos\\alpha; \\sin\\alpha)$ trên đường tròn lượng giác; $\\sin^2\\alpha + \\cos^2\\alpha = 1$; dấu theo góc phần tư',
            ],
            [
              'Bài 2',
              'Công thức lượng giác',
              '$\\cos(a \\pm b) = \\cos a\\cos b \\mp \\sin a\\sin b$; $\\sin(a \\pm b) = \\sin a\\cos b \\pm \\cos a\\sin b$; $\\sin 2a = 2\\sin a\\cos a$; $\\cos 2a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$; tích thành tổng, tổng thành tích',
            ],
            [
              'Bài 3',
              'Hàm số lượng giác',
              '$\\sin x$, $\\cos x$: tập giá trị $[-1; 1]$, chu kì $2\\pi$; $\\tan x$, $\\cot x$: chu kì $\\pi$; côsin chẵn, ba hàm còn lại lẻ',
            ],
            [
              'Bài 4',
              'Phương trình lượng giác cơ bản',
              '$\\sin x = \\sin\\alpha \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = \\pi - \\alpha + k2\\pi$; $\\cos x = \\cos\\alpha \\Leftrightarrow x = \\pm\\alpha + k2\\pi$; $\\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k\\pi$; $\\cot x = \\cot\\alpha \\Leftrightarrow x = \\alpha + k\\pi$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ba lỗi hay gặp',
          text: 'Quên chọn dấu theo góc phần tư khi dùng $\\sin^2\\alpha + \\cos^2\\alpha = 1$; dùng công thức "$\\pm\\alpha$" của côsin cho phương trình sin; viết lẫn độ và radian, như $x = 30^\\circ + k2\\pi$. Ngoài ra, phương trình $\\sin x = m$ và $\\cos x = m$ vô nghiệm khi $|m| > 1$.',
        },
      ],
    },
    {
      heading: 'Biểu diễn nghiệm trên đường tròn lượng giác',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi họ nghiệm $x = \\alpha + k\\dfrac{2\\pi}{n}$ $(k \\in \\mathbb{Z})$ được biểu diễn bởi $n$ điểm cách đều nhau trên đường tròn lượng giác: họ $x = \\alpha + k2\\pi$ cho $1$ điểm, họ $x = \\alpha + k\\pi$ cho $2$ điểm đối xứng qua $O$, họ $x = \\alpha + \\dfrac{k\\pi}{2}$ cho $4$ điểm. Đánh dấu đúng các điểm này là một cách kiểm tra nghiệm nhanh.',
        },
        { type: 'widget', name: 'circle-check' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề ở phần Khám phá có $12$ câu tự sinh, ba câu cho mỗi bài của chương. Đáp số là số nguyên, số thập phân (dùng dấu phẩy) hoặc phân số dạng $p/q$; câu hỏi theo độ cho phép gõ thêm kí hiệu $^\\circ$. Bấm "Làm bộ đề mới" để có bộ khác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Cho $\\cos\\alpha = -\\dfrac{3}{5}$ với $\\pi < \\alpha < \\dfrac{3\\pi}{2}$. Tính $\\sin\\alpha$, $\\sin 2\\alpha$ và $\\cos 2\\alpha$.',
      steps: [
        '$\\sin^2\\alpha = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$; ở góc phần tư thứ III, $\\sin\\alpha < 0$ nên $\\sin\\alpha = -\\dfrac{4}{5}$.',
        '$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2 \\cdot \\left(-\\dfrac{4}{5}\\right)\\left(-\\dfrac{3}{5}\\right) = \\dfrac{24}{25}$.',
        '$\\cos 2\\alpha = 2\\cos^2\\alpha - 1 = 2 \\cdot \\dfrac{9}{25} - 1 = -\\dfrac{7}{25}$.',
      ],
      answer:
        '$\\sin\\alpha = -\\dfrac{4}{5}$, $\\sin 2\\alpha = \\dfrac{24}{25}$, $\\cos 2\\alpha = -\\dfrac{7}{25}$.',
    },
    {
      problem: 'Giải phương trình $2\\cos x + \\sqrt{3} = 0$.',
      steps: [
        '$2\\cos x + \\sqrt{3} = 0 \\Leftrightarrow \\cos x = -\\dfrac{\\sqrt{3}}{2} = \\cos\\dfrac{5\\pi}{6}$.',
        '$\\Leftrightarrow x = \\pm\\dfrac{5\\pi}{6} + k2\\pi$ $(k \\in \\mathbb{Z})$.',
      ],
      answer: '$x = \\pm\\dfrac{5\\pi}{6} + k2\\pi$ $(k \\in \\mathbb{Z})$.',
    },
    {
      problem: 'Giải phương trình $\\sin 3x = \\sin x$.',
      steps: [
        'Trường hợp 1: $3x = x + k2\\pi \\Leftrightarrow 2x = k2\\pi \\Leftrightarrow x = k\\pi$.',
        'Trường hợp 2: $3x = \\pi - x + k2\\pi \\Leftrightarrow 4x = \\pi + k2\\pi \\Leftrightarrow x = \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}$.',
        'Trên đường tròn lượng giác, họ thứ nhất cho $2$ điểm, họ thứ hai cho $4$ điểm.',
      ],
      answer: '$x = k\\pi$, $x = \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}$ $(k \\in \\mathbb{Z})$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Số đo theo radian của góc $225^\\circ$ là $k\\pi$. Tìm $k$.',
      answer: [5, 4],
      hints: ['$1^\\circ = \\dfrac{\\pi}{180}$ rad.'],
      solution:
        '$225^\\circ = \\dfrac{225\\pi}{180} = \\dfrac{5\\pi}{4}$, nên $k = \\dfrac{5}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cho $\\cos\\alpha = -\\dfrac{3}{5}$ với $\\dfrac{\\pi}{2} < \\alpha < \\pi$. Tính $\\tan\\alpha$.',
      answer: [-4, 3],
      hints: ['Tìm $\\sin\\alpha$; ở góc phần tư thứ II, $\\sin\\alpha > 0$.'],
      solution:
        '$\\sin\\alpha = \\sqrt{1 - \\dfrac{9}{25}} = \\dfrac{4}{5}$, nên $\\tan\\alpha = \\dfrac{4/5}{-3/5} = -\\dfrac{4}{3}$.',
    },
    {
      type: 'fraction',
      prompt: 'Cho $\\sin\\alpha = \\dfrac{1}{3}$. Tính $\\cos 2\\alpha$.',
      answer: [7, 9],
      hints: ['$\\cos 2\\alpha = 1 - 2\\sin^2\\alpha$.'],
      solution: '$\\cos 2\\alpha = 1 - 2 \\cdot \\dfrac{1}{9} = \\dfrac{7}{9}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính giá trị của $\\sin 15^\\circ\\cos 15^\\circ$.',
      answer: [1, 4],
      hints: ['$\\sin a\\cos a = \\dfrac{1}{2}\\sin 2a$.'],
      solution:
        '$\\sin 15^\\circ\\cos 15^\\circ = \\dfrac{1}{2}\\sin 30^\\circ = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}$.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn $\\sin(a + b)\\sin(a - b)$, ta được',
      options: [
        '$\\sin^2 a - \\sin^2 b$',
        '$\\sin^2 a + \\sin^2 b$',
        '$\\cos^2 a - \\cos^2 b$',
        '$\\sin 2a\\sin 2b$',
      ],
      answer: 0,
      hints: [
        'Biến đổi tích thành tổng: $\\sin u\\sin v = \\dfrac{1}{2}[\\cos(u - v) - \\cos(u + v)]$.',
        'Sau đó dùng $\\cos 2x = 1 - 2\\sin^2 x$.',
      ],
      solution:
        '$\\sin(a + b)\\sin(a - b) = \\dfrac{1}{2}(\\cos 2b - \\cos 2a) = \\dfrac{1}{2}\\left[(1 - 2\\sin^2 b) - (1 - 2\\sin^2 a)\\right] = \\sin^2 a - \\sin^2 b$.',
    },
    {
      type: 'choice',
      prompt: 'Chu kì của hàm số $y = \\tan\\dfrac{x}{2}$ là',
      options: ['$2\\pi$', '$\\pi$', '$\\dfrac{\\pi}{2}$', '$4\\pi$'],
      answer: 0,
      hints: ['$y = \\tan ax$ có chu kì $\\dfrac{\\pi}{|a|}$, ở đây $a = \\dfrac{1}{2}$.'],
      solution: 'Chu kì là $\\pi : \\dfrac{1}{2} = 2\\pi$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = 1 - 2\\cos^2 x$.',
      answer: 1,
      hints: ['$1 - 2\\cos^2 x = -\\cos 2x$.'],
      solution:
        '$y = 1 - 2\\cos^2 x = -\\cos 2x \\le 1$, dấu bằng khi $\\cos 2x = -1$, chẳng hạn $x = \\dfrac{\\pi}{2}$. Giá trị lớn nhất là $1$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây là hàm số lẻ?',
      options: [
        '$y = \\sin x\\cos 2x$',
        '$y = \\cos x + \\sin^2 x$',
        '$y = 1 + \\sin x$',
        '$y = |\\sin x|$',
      ],
      answer: 0,
      hints: ['Tính $f(-x)$ cho từng hàm số.'],
      solution:
        '$\\sin(-x)\\cos(-2x) = -\\sin x\\cos 2x$: hàm số lẻ. $\\cos x + \\sin^2 x$ và $|\\sin x|$ là hàm số chẵn; $1 + \\sin x$ không chẵn, không lẻ (tại $\\dfrac{\\pi}{2}$ bằng $2$, tại $-\\dfrac{\\pi}{2}$ bằng $0$).',
    },
    {
      type: 'number',
      prompt: 'Phương trình $2\\sin x - 1 = 0$ có bao nhiêu nghiệm thuộc đoạn $[0; 3\\pi]$?',
      answer: 4,
      hints: [
        '$\\sin x = \\dfrac{1}{2} \\Leftrightarrow x = \\dfrac{\\pi}{6} + k2\\pi$ hoặc $x = \\dfrac{5\\pi}{6} + k2\\pi$.',
      ],
      solution:
        'Các nghiệm trong $[0; 3\\pi]$: $\\dfrac{\\pi}{6}$, $\\dfrac{5\\pi}{6}$, $\\dfrac{13\\pi}{6}$, $\\dfrac{17\\pi}{6}$ (vì $\\dfrac{17\\pi}{6} < 3\\pi$, còn $\\dfrac{25\\pi}{6} > 3\\pi$). Có $4$ nghiệm.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $\\tan\\left(x - \\dfrac{\\pi}{6}\\right) = 1$ là',
      options: [
        '$x = \\dfrac{5\\pi}{12} + k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{12} + k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{5\\pi}{12} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{4} + k\\pi$ $(k \\in \\mathbb{Z})$',
      ],
      answer: 0,
      hints: [
        '$1 = \\tan\\dfrac{\\pi}{4}$, nên $x - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{4} + k\\pi$.',
      ],
      solution:
        '$x = \\dfrac{\\pi}{4} + \\dfrac{\\pi}{6} + k\\pi = \\dfrac{5\\pi}{12} + k\\pi$ $(k \\in \\mathbb{Z})$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm nghiệm dương nhỏ nhất của phương trình $\\sin(2x - 30^\\circ) = \\dfrac{1}{2}$ (theo độ).',
      answer: 30,
      hints: ['$\\dfrac{1}{2} = \\sin 30^\\circ$; viết hai họ nghiệm của $2x - 30^\\circ$.'],
      solution:
        '$2x - 30^\\circ = 30^\\circ + k360^\\circ$ hoặc $2x - 30^\\circ = 150^\\circ + k360^\\circ$, tức là $x = 30^\\circ + k180^\\circ$ hoặc $x = 90^\\circ + k180^\\circ$. Nghiệm dương nhỏ nhất là $30^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $\\sin x = \\cos x$ là',
      options: [
        '$x = \\dfrac{\\pi}{4} + k\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{4} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\pm\\dfrac{\\pi}{4} + k2\\pi$ $(k \\in \\mathbb{Z})$',
        '$x = \\dfrac{\\pi}{2} + k\\pi$ $(k \\in \\mathbb{Z})$',
      ],
      answer: 0,
      hints: [
        'Các giá trị $x$ làm $\\cos x = 0$ không thoả phương trình (khi đó $\\sin x = \\pm 1$), nên có thể chia hai vế cho $\\cos x$.',
      ],
      solution:
        'Vì $\\cos x = 0$ không cho nghiệm, chia hai vế cho $\\cos x$: $\\tan x = 1 \\Leftrightarrow x = \\dfrac{\\pi}{4} + k\\pi$ $(k \\in \\mathbb{Z})$.',
    },
  ],
  takeaways: [
    'Đổi đơn vị: $\\pi$ rad $= 180^\\circ$; không viết lẫn độ và radian trong một công thức nghiệm.',
    'Tìm một giá trị lượng giác từ giá trị khác: dùng hệ thức cơ bản rồi chọn dấu theo góc phần tư.',
    'Chu kì: $2\\pi$ với sin, côsin; $\\pi$ với tang, côtang; chu kì của $f(ax)$ bằng chu kì của $f$ chia cho $|a|$.',
    'Họ nghiệm $x = \\alpha + \\dfrac{k2\\pi}{n}$ được biểu diễn bởi $n$ điểm cách đều trên đường tròn lượng giác.',
  ],
};
