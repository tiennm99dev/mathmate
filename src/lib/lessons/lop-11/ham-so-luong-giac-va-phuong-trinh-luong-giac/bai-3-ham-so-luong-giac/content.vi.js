/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bốn hàm số lượng giác y = sin x, y = cos x, y = tan x, y = cot x: tập xác định, tập giá trị, tính chẵn lẻ, tính tuần hoàn và chu kì, đồ thị cùng các khoảng đồng biến, nghịch biến.',
  intro:
    'Một chiếc đu quay quay đều; độ cao của một cabin lên xuống lặp đi lặp lại theo thời gian. Những hiện tượng lặp lại như vậy (dao động của lò xo, dòng điện xoay chiều, thuỷ triều) được mô tả bằng các hàm số lượng giác. Trong bài này, mỗi số thực $x$ được xem là số đo radian của một góc lượng giác, và ta nghiên cứu sin, côsin, tang, côtang như những hàm số của $x$.',
  objectives: [
    'Nêu định nghĩa, tập xác định và tập giá trị của bốn hàm số lượng giác.',
    'Nhận biết hàm số chẵn, hàm số lẻ, hàm số tuần hoàn và chu kì.',
    'Đọc đồ thị và nêu các khoảng đồng biến, nghịch biến của $y = \\sin x$, $y = \\cos x$, $y = \\tan x$, $y = \\cot x$.',
  ],
  sections: [
    {
      heading: 'Định nghĩa hàm số lượng giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số sin và hàm số côsin',
          text: 'Quy tắc đặt tương ứng mỗi số thực $x$ với số thực $\\sin x$ được gọi là hàm số sin, kí hiệu $y = \\sin x$. Quy tắc đặt tương ứng mỗi số thực $x$ với số thực $\\cos x$ được gọi là hàm số côsin, kí hiệu $y = \\cos x$. Tập xác định của hai hàm số này là $\\mathbb{R}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số tang và hàm số côtang',
          text: 'Hàm số tang là hàm số cho bởi $y = \\dfrac{\\sin x}{\\cos x}$, kí hiệu $y = \\tan x$, có tập xác định $D = \\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$. Hàm số côtang là hàm số cho bởi $y = \\dfrac{\\cos x}{\\sin x}$, kí hiệu $y = \\cot x$, có tập xác định $D = \\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$.',
        },
      ],
    },
    {
      heading: 'Hàm số chẵn, hàm số lẻ, hàm số tuần hoàn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số chẵn, hàm số lẻ',
          text: 'Cho hàm số $y = f(x)$ có tập xác định $D$. Hàm số $f$ là hàm số chẵn nếu với mọi $x \\in D$ ta có $-x \\in D$ và $f(-x) = f(x)$. Hàm số $f$ là hàm số lẻ nếu với mọi $x \\in D$ ta có $-x \\in D$ và $f(-x) = -f(x)$.',
        },
        {
          type: 'p',
          text: 'Đồ thị của hàm số chẵn nhận trục tung làm trục đối xứng; đồ thị của hàm số lẻ nhận gốc toạ độ làm tâm đối xứng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số tuần hoàn',
          text: 'Hàm số $y = f(x)$ có tập xác định $D$ được gọi là hàm số tuần hoàn nếu tồn tại một số $T$ khác $0$ sao cho với mọi $x \\in D$ ta có $x \\pm T \\in D$ và $f(x + T) = f(x)$. Nếu có số $T$ dương nhỏ nhất thoả mãn các điều kiện trên thì $T$ được gọi là chu kì của hàm số tuần hoàn đó.',
        },
        {
          type: 'p',
          text: 'Đồ thị của hàm số tuần hoàn chu kì $T$ lặp lại trên từng đoạn dài $T$: vẽ trên một đoạn $[a; a + T]$ rồi tịnh tiến song song với trục hoành các đoạn $T$, $2T$, ... sang trái và sang phải.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Với $a \\ne 0$: hàm số $y = \\sin ax$ và $y = \\cos ax$ tuần hoàn với chu kì $\\dfrac{2\\pi}{|a|}$; hàm số $y = \\tan ax$ và $y = \\cot ax$ tuần hoàn với chu kì $\\dfrac{\\pi}{|a|}$.',
        },
      ],
    },
    {
      heading: 'Đồ thị và tính chất của hàm số y = sin x, y = cos x',
      blocks: [
        {
          type: 'p',
          text: 'Khi $x$ tăng, điểm biểu diễn $M$ chạy trên đường tròn lượng giác; tung độ của $M$ là $\\sin x$. Ghi lại tung độ ấy theo $x$, ta "trải" đường tròn thành đồ thị hình sin. Phần Khám phá dưới đây vẽ đúng quá trình này.',
        },
        {
          type: 'table',
          caption: 'Tính chất của hai hàm số sin và côsin',
          head: ['Tính chất', '$y = \\sin x$', '$y = \\cos x$'],
          rows: [
            ['Tập xác định', '$\\mathbb{R}$', '$\\mathbb{R}$'],
            ['Tập giá trị', '$[-1; 1]$', '$[-1; 1]$'],
            ['Chẵn, lẻ', 'Hàm số lẻ', 'Hàm số chẵn'],
            ['Chu kì', '$2\\pi$', '$2\\pi$'],
            [
              'Đồng biến trên mỗi khoảng',
              '$\\left(-\\dfrac{\\pi}{2} + k2\\pi; \\dfrac{\\pi}{2} + k2\\pi\\right)$',
              '$(-\\pi + k2\\pi; k2\\pi)$',
            ],
            [
              'Nghịch biến trên mỗi khoảng',
              '$\\left(\\dfrac{\\pi}{2} + k2\\pi; \\dfrac{3\\pi}{2} + k2\\pi\\right)$',
              '$(k2\\pi; \\pi + k2\\pi)$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Vì $\\cos x = \\sin\\left(x + \\dfrac{\\pi}{2}\\right)$, đồ thị của $y = \\cos x$ có được khi tịnh tiến đồ thị $y = \\sin x$ sang trái một đoạn $\\dfrac{\\pi}{2}$. Cả hai đồ thị đều nằm giữa hai đường thẳng $y = -1$ và $y = 1$.',
        },
      ],
    },
    {
      heading: 'Đồ thị và tính chất của hàm số y = tan x, y = cot x',
      blocks: [
        {
          type: 'table',
          caption: 'Tính chất của hai hàm số tang và côtang',
          head: ['Tính chất', '$y = \\tan x$', '$y = \\cot x$'],
          rows: [
            [
              'Tập xác định',
              '$\\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$',
              '$\\mathbb{R} \\setminus \\{k\\pi \\mid k \\in \\mathbb{Z}\\}$',
            ],
            ['Tập giá trị', '$\\mathbb{R}$', '$\\mathbb{R}$'],
            ['Chẵn, lẻ', 'Hàm số lẻ', 'Hàm số lẻ'],
            ['Chu kì', '$\\pi$', '$\\pi$'],
            [
              'Tính đơn điệu',
              'Đồng biến trên mỗi khoảng $\\left(-\\dfrac{\\pi}{2} + k\\pi; \\dfrac{\\pi}{2} + k\\pi\\right)$',
              'Nghịch biến trên mỗi khoảng $(k\\pi; \\pi + k\\pi)$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Đồ thị $y = \\tan x$ gồm vô số nhánh giống nhau, cách nhau $\\pi$; mỗi nhánh tiến sát các đường thẳng $x = \\dfrac{\\pi}{2} + k\\pi$ mà không cắt chúng. Trên đường tròn lượng giác, $\\tan x$ là tung độ giao điểm $T$ của đường thẳng $OM$ với trục tang $x = 1$. Đồ thị $y = \\cot x$ cũng gồm các nhánh cách nhau $\\pi$, tiến sát các đường thẳng $x = k\\pi$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trải đường tròn thành đồ thị',
    instruction:
      'Chọn hàm số rồi bấm "Chạy": điểm M chạy trên đường tròn lượng giác và giá trị lượng giác của nó được mang sang phải, vẽ dần đồ thị trên đoạn $[-2\\pi; 2\\pi]$. Kéo thanh trượt để dừng ở một giá trị $x$. Chọn "Điểm −x" để xem tính chẵn lẻ, "Cách một chu kì" để xem tính tuần hoàn.',
  },
  examples: [
    {
      problem:
        'Xét tính chẵn, lẻ của các hàm số a) $f(x) = x\\sin x$; b) $g(x) = \\sin x + \\tan x$.',
      steps: [
        'a) Tập xác định $D = \\mathbb{R}$, nên $x \\in D$ thì $-x \\in D$.',
        '$f(-x) = (-x)\\sin(-x) = (-x)(-\\sin x) = x\\sin x = f(x)$. Vậy $f$ là hàm số chẵn.',
        'b) Tập xác định $D = \\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$; nếu $x \\in D$ thì $-x \\in D$.',
        '$g(-x) = \\sin(-x) + \\tan(-x) = -\\sin x - \\tan x = -g(x)$. Vậy $g$ là hàm số lẻ.',
      ],
      answer: '$f(x) = x\\sin x$ là hàm số chẵn, $g(x) = \\sin x + \\tan x$ là hàm số lẻ.',
    },
    {
      problem: 'Tìm tập giá trị của hàm số $y = 2\\sin x - 1$.',
      steps: [
        'Với mọi $x$: $-1 \\le \\sin x \\le 1$.',
        'Nhân với $2$ rồi trừ $1$: $-3 \\le 2\\sin x - 1 \\le 1$.',
        '$y = -3$ khi $\\sin x = -1$, chẳng hạn $x = -\\dfrac{\\pi}{2}$; $y = 1$ khi $\\sin x = 1$, chẳng hạn $x = \\dfrac{\\pi}{2}$. Vì $\\sin x$ nhận mọi giá trị thuộc $[-1; 1]$ nên $y$ nhận mọi giá trị thuộc $[-3; 1]$.',
      ],
      answer: 'Tập giá trị là $[-3; 1]$.',
    },
    {
      problem: 'Chứng minh hàm số $y = \\sin 2x$ tuần hoàn với chu kì $\\pi$.',
      steps: [
        'Với mọi $x$: $\\sin 2(x + \\pi) = \\sin(2x + 2\\pi) = \\sin 2x$, nên $T = \\pi$ thoả mãn định nghĩa.',
        'Nếu có $0 < T < \\pi$ với $\\sin 2(x + T) = \\sin 2x$ mọi $x$ thì thay $x = \\dfrac{\\pi}{4}$: $\\sin\\left(\\dfrac{\\pi}{2} + 2T\\right) = 1$, tức là $\\dfrac{\\pi}{2} + 2T = \\dfrac{\\pi}{2} + k2\\pi$, $T = k\\pi$, vô lí với $0 < T < \\pi$.',
      ],
      answer: 'Hàm số $y = \\sin 2x$ tuần hoàn với chu kì $\\pi$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây là hàm số chẵn?',
      options: ['$y = \\cos x$', '$y = \\sin x$', '$y = \\tan x$', '$y = \\cot x$'],
      answer: 0,
      hints: ['Tìm hàm số có $f(-x) = f(x)$; đồ thị của nó đối xứng qua trục tung.'],
      solution: '$\\cos(-x) = \\cos x$ nên $y = \\cos x$ là hàm số chẵn; ba hàm số còn lại đều lẻ.',
    },
    {
      type: 'multi',
      prompt: 'Những hàm số nào là hàm số lẻ?',
      options: [
        '$y = \\sin x$',
        '$y = \\tan x$',
        '$y = x\\cos x$',
        '$y = \\cos x + x^2$',
        '$y = \\sin x + \\cos x$',
      ],
      answers: [0, 1, 2],
      hints: ['Với mỗi hàm số, tính $f(-x)$ và so sánh với $-f(x)$.'],
      solution:
        '$\\sin(-x) = -\\sin x$, $\\tan(-x) = -\\tan x$ và $(-x)\\cos(-x) = -x\\cos x$: ba hàm số lẻ. $\\cos(-x) + (-x)^2 = \\cos x + x^2$: hàm số chẵn. Với $y = \\sin x + \\cos x$: $f\\left(\\dfrac{\\pi}{4}\\right) = \\sqrt{2}$ còn $f\\left(-\\dfrac{\\pi}{4}\\right) = 0$, không bằng $\\pm\\sqrt{2}$, nên hàm số này không chẵn, không lẻ.',
    },
    {
      type: 'fraction',
      prompt: 'Chu kì của hàm số $y = \\cos 3x$ là $k\\pi$. Tìm $k$.',
      answer: [2, 3],
      hints: ['Hàm số $y = \\cos ax$ có chu kì $\\dfrac{2\\pi}{|a|}$.'],
      solution: 'Chu kì là $\\dfrac{2\\pi}{3}$, nên $k = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị lớn nhất của hàm số $y = 3 - 2\\cos x$.',
      answer: 5,
      hints: ['$-1 \\le \\cos x \\le 1$.', '$y$ lớn nhất khi $\\cos x$ nhỏ nhất.'],
      solution:
        'Từ $-1 \\le \\cos x \\le 1$ suy ra $1 \\le 3 - 2\\cos x \\le 5$. Giá trị lớn nhất bằng $5$, đạt khi $\\cos x = -1$, chẳng hạn $x = \\pi$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị nhỏ nhất của hàm số $y = 2\\sin x + 1$.',
      answer: -1,
      hints: ['$y$ nhỏ nhất khi $\\sin x = -1$.'],
      solution:
        '$y \\ge 2 \\cdot (-1) + 1 = -1$, dấu bằng khi $\\sin x = -1$, chẳng hạn $x = -\\dfrac{\\pi}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\tan 2x$ là',
      options: [
        '$\\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}$',
        '$\\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{2} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$',
        '$\\mathbb{R} \\setminus \\left\\{\\dfrac{k\\pi}{2} \\mid k \\in \\mathbb{Z}\\right\\}$',
        '$\\mathbb{R} \\setminus \\left\\{\\dfrac{\\pi}{4} + k\\pi \\mid k \\in \\mathbb{Z}\\right\\}$',
      ],
      answer: 0,
      hints: [
        '$\\tan 2x$ xác định khi $\\cos 2x \\ne 0$, tức là $2x \\ne \\dfrac{\\pi}{2} + k\\pi$.',
      ],
      solution:
        'Điều kiện: $2x \\ne \\dfrac{\\pi}{2} + k\\pi \\Leftrightarrow x \\ne \\dfrac{\\pi}{4} + \\dfrac{k\\pi}{2}$ $(k \\in \\mathbb{Z})$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = \\sin x$ đồng biến trên khoảng nào sau đây?',
      options: [
        '$\\left(-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right)$',
        '$(0; \\pi)$',
        '$\\left(\\dfrac{\\pi}{2}; \\dfrac{3\\pi}{2}\\right)$',
        '$(-\\pi; 0)$',
      ],
      answer: 0,
      hints: [
        "Trên đường tròn lượng giác, tung độ của $M$ tăng khi $M$ đi từ $B'$ lên $B$ qua $A$.",
      ],
      solution:
        '$y = \\sin x$ đồng biến trên mỗi khoảng $\\left(-\\dfrac{\\pi}{2} + k2\\pi; \\dfrac{\\pi}{2} + k2\\pi\\right)$; với $k = 0$ là khoảng $\\left(-\\dfrac{\\pi}{2}; \\dfrac{\\pi}{2}\\right)$. Các khoảng còn lại đều chứa một đoạn hàm số nghịch biến.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị hàm số $y = \\sin x$ cắt trục hoành tại bao nhiêu điểm có hoành độ thuộc đoạn $[0; 4\\pi]$?',
      answer: 5,
      hints: [
        '$\\sin x = 0$ khi $x = k\\pi$ $(k \\in \\mathbb{Z})$.',
        'Đếm các bội của $\\pi$ từ $0$ đến $4\\pi$.',
      ],
      solution: 'Các điểm có hoành độ $0$, $\\pi$, $2\\pi$, $3\\pi$, $4\\pi$: có $5$ điểm.',
    },
    {
      type: 'choice',
      prompt: 'Chu kì của hàm số $y = \\tan x$ là',
      options: ['$\\pi$', '$2\\pi$', '$\\dfrac{\\pi}{2}$', '$4\\pi$'],
      answer: 0,
      hints: ['$\\tan(x + \\pi) = \\tan x$ với mọi $x$ thuộc tập xác định.'],
      solution:
        '$\\tan(x + \\pi) = \\dfrac{\\sin(x + \\pi)}{\\cos(x + \\pi)} = \\dfrac{-\\sin x}{-\\cos x} = \\tan x$, và không có số dương nhỏ hơn $\\pi$ thoả mãn. Chu kì là $\\pi$.',
    },
  ],
  takeaways: [
    '$y = \\sin x$, $y = \\cos x$: xác định trên $\\mathbb{R}$, tập giá trị $[-1; 1]$, chu kì $2\\pi$; sin lẻ, côsin chẵn.',
    '$y = \\tan x$, $y = \\cot x$: tập giá trị $\\mathbb{R}$, chu kì $\\pi$, đều là hàm số lẻ.',
    'Hàm số chẵn: đồ thị đối xứng qua trục tung; hàm số lẻ: đối xứng qua gốc toạ độ.',
    '$y = \\sin ax$, $y = \\cos ax$ có chu kì $\\dfrac{2\\pi}{|a|}$; $y = \\tan ax$, $y = \\cot ax$ có chu kì $\\dfrac{\\pi}{|a|}$.',
  ],
};
