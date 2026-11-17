/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khái niệm hàm số, tập xác định và tập giá trị; đồ thị của hàm số; hàm số đồng biến, nghịch biến trên một khoảng và cách nhận ra điều đó trên đồ thị.',
  intro:
    'Nhiệt độ ngoài trời thay đổi theo giờ trong ngày, tiền điện phải trả thay đổi theo số kWh đã dùng, quãng đường xe đi được thay đổi theo thời gian. Mỗi lần ta biết giá trị của đại lượng thứ nhất là biết đúng một giá trị của đại lượng thứ hai. Đó là ý tưởng của hàm số, công cụ để mô tả sự phụ thuộc giữa hai đại lượng.',
  objectives: [
    'Nhận biết hàm số, tìm tập xác định và tập giá trị của hàm số.',
    'Nhận biết đồ thị của hàm số; kiểm tra một điểm có thuộc đồ thị hay không.',
    'Nhận biết hàm số đồng biến, nghịch biến trên một khoảng bằng định nghĩa và bằng đồ thị.',
  ],
  sections: [
    {
      heading: 'Khái niệm hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số',
          text: 'Nếu với mỗi giá trị của $x$ thuộc tập hợp số $D$ có một và chỉ một giá trị tương ứng của $y$ thuộc tập số thực $\\mathbb{R}$ thì ta có một hàm số. Ta gọi $x$ là biến số và $y$ là hàm số của $x$. Tập hợp $D$ gọi là tập xác định của hàm số. Tập tất cả các giá trị $y$ nhận được gọi là tập giá trị của hàm số.',
        },
        {
          type: 'p',
          text: 'Ta thường viết $y = f(x)$; giá trị của hàm số tại $x = x_0$ là $f(x_0)$. Một hàm số có thể được cho bằng bảng, bằng biểu đồ hoặc bằng công thức.',
        },
        {
          type: 'table',
          head: ['Thời điểm (giờ)', '$6$', '$9$', '$12$', '$15$', '$18$'],
          rows: [['Nhiệt độ (°C)', '$24$', '$28$', '$33$', '$31$', '$27$']],
          caption:
            'Hàm số cho bằng bảng: mỗi thời điểm ứng với đúng một nhiệt độ. Tập xác định $D = \\{6; 9; 12; 15; 18\\}$, tập giá trị $\\{24; 27; 28; 31; 33\\}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi cho hàm số bằng công thức $y = f(x)$ mà không chỉ rõ tập xác định của nó thì ta quy ước: tập xác định của hàm số là tập hợp tất cả các số thực $x$ sao cho biểu thức $f(x)$ có nghĩa.',
        },
        {
          type: 'list',
          items: [
            '$y = \\dfrac{1}{x - 1}$ có nghĩa khi $x - 1 \\ne 0$, nên $D = \\mathbb{R} \\setminus \\{1\\}$.',
            '$y = \\sqrt{x + 1}$ có nghĩa khi $x + 1 \\ge 0$, nên $D = [-1; +\\infty)$.',
            '$y = x^2 - 3$ có nghĩa với mọi $x$, nên $D = \\mathbb{R}$; vì $x^2 \\ge 0$ nên $y \\ge -3$, tập giá trị là $[-3; +\\infty)$.',
          ],
        },
        {
          type: 'p',
          text: 'Một hàm số có thể được cho bởi nhiều công thức trên những phần khác nhau của tập xác định, chẳng hạn $f(x) = \\begin{cases} -x & \\text{nếu } x < 0 \\\\ x & \\text{nếu } x \\ge 0 \\end{cases}$ (đó chính là $f(x) = |x|$). Muốn tính $f(x_0)$, ta xem $x_0$ thuộc phần nào rồi dùng công thức của phần đó: $f(-3) = 3$, $f(2) = 2$.',
        },
      ],
    },
    {
      heading: 'Đồ thị của hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồ thị',
          text: 'Đồ thị của hàm số $y = f(x)$ xác định trên tập $D$ là tập hợp tất cả các điểm $M(x; f(x))$ trên mặt phẳng toạ độ với mọi $x$ thuộc $D$.',
        },
        {
          type: 'p',
          text: 'Như vậy điểm $M(x_0; y_0)$ thuộc đồ thị của hàm số $y = f(x)$ khi và chỉ khi $x_0 \\in D$ và $y_0 = f(x_0)$. Đồ thị của hàm số bậc nhất $y = ax + b$ $(a \\ne 0)$ là một đường thẳng; đồ thị của $y = ax^2$ $(a \\ne 0)$ là một parabol, như đã học ở lớp 9.',
        },
        {
          type: 'p',
          text: 'Ví dụ: với $f(x) = x^2 - 3$, ta có $f(2) = 1$ nên điểm $A(2; 1)$ thuộc đồ thị; còn $f(-1) = -2 \\ne 2$ nên điểm $B(-1; 2)$ không thuộc đồ thị.',
        },
      ],
    },
    {
      heading: 'Sự đồng biến, nghịch biến của hàm số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồng biến, nghịch biến',
          text: 'Hàm số $y = f(x)$ được gọi là đồng biến (tăng) trên khoảng $(a; b)$ nếu $\\forall x_1, x_2 \\in (a; b)$, $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$. Hàm số $y = f(x)$ được gọi là nghịch biến (giảm) trên khoảng $(a; b)$ nếu $\\forall x_1, x_2 \\in (a; b)$, $x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Trên khoảng hàm số đồng biến, đồ thị "đi lên" từ trái sang phải; trên khoảng hàm số nghịch biến, đồ thị "đi xuống" từ trái sang phải.',
        },
        {
          type: 'table',
          head: ['Hàm số', 'Đồng biến trên', 'Nghịch biến trên'],
          rows: [
            ['$y = 2x - 1$', '$\\mathbb{R}$', 'Không có'],
            ['$y = x^2 - 3$', '$(0; +\\infty)$', '$(-\\infty; 0)$'],
            ['$y = \\sqrt{x + 1}$', '$(-1; +\\infty)$', 'Không có'],
            ['$y = \\dfrac{2}{x}$', 'Không có', '$(-\\infty; 0)$ và $(0; +\\infty)$'],
          ],
          caption: 'Các hàm số có trong máy hàm số ở phần khám phá.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Hàm số $y = \\dfrac{2}{x}$ nghịch biến trên từng khoảng $(-\\infty; 0)$ và $(0; +\\infty)$, nhưng không nghịch biến trên tập $\\mathbb{R} \\setminus \\{0\\}$: lấy $x_1 = -1 < x_2 = 1$ thì $f(-1) = -2 < f(1) = 2$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy hàm số',
    instruction:
      'Chọn một hàm số rồi kéo điểm $x$ trên trục hoành (hoặc dùng phím mũi tên). Máy tính $f(x)$, vẽ điểm $M(x; f(x))$ và để lại vết: đi hết tập xác định, các vết tạo thành đồ thị. Thử đưa $x$ ra ngoài tập xác định, rồi bấm "Tô khoảng đồng biến, nghịch biến" để thấy đồ thị đi lên, đi xuống ở đâu.',
  },
  examples: [
    {
      problem:
        'Tìm tập xác định của các hàm số: a) $y = \\sqrt{2x - 4}$; b) $y = \\dfrac{x + 3}{x^2 - 1}$.',
      steps: [
        'a) Biểu thức $\\sqrt{2x - 4}$ có nghĩa khi $2x - 4 \\ge 0$, tức là $x \\ge 2$.',
        'Vậy tập xác định của hàm số là $D = [2; +\\infty)$.',
        'b) Biểu thức $\\dfrac{x + 3}{x^2 - 1}$ có nghĩa khi $x^2 - 1 \\ne 0$, tức là $x \\ne 1$ và $x \\ne -1$.',
        'Vậy tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{-1; 1\\}$.',
      ],
      answer: 'a) $D = [2; +\\infty)$; b) $D = \\mathbb{R} \\setminus \\{-1; 1\\}$.',
    },
    {
      problem:
        'Cho hàm số $f(x) = \\begin{cases} 2x + 1 & \\text{nếu } x \\ge 0 \\\\ x^2 & \\text{nếu } x < 0 \\end{cases}$. Tính $f(3)$, $f(-2)$ và cho biết điểm $C(-1; -1)$ có thuộc đồ thị của hàm số không.',
      steps: [
        '$3 \\ge 0$ nên dùng công thức thứ nhất: $f(3) = 2 \\cdot 3 + 1 = 7$.',
        '$-2 < 0$ nên dùng công thức thứ hai: $f(-2) = (-2)^2 = 4$.',
        'Với $x = -1 < 0$: $f(-1) = (-1)^2 = 1 \\ne -1$, nên $C$ không thuộc đồ thị.',
      ],
      answer: '$f(3) = 7$, $f(-2) = 4$; điểm $C(-1; -1)$ không thuộc đồ thị.',
    },
    {
      problem:
        'Chứng minh hàm số $y = 2x - 1$ đồng biến trên $\\mathbb{R}$ và hàm số $y = \\dfrac{2}{x}$ nghịch biến trên khoảng $(0; +\\infty)$.',
      steps: [
        'Lấy $x_1, x_2 \\in \\mathbb{R}$ với $x_1 < x_2$. Khi đó $2x_1 < 2x_2$, nên $2x_1 - 1 < 2x_2 - 1$, tức là $f(x_1) < f(x_2)$: hàm số $y = 2x - 1$ đồng biến trên $\\mathbb{R}$.',
        'Lấy $x_1, x_2 \\in (0; +\\infty)$ với $x_1 < x_2$. Khi đó $f(x_1) - f(x_2) = \\dfrac{2}{x_1} - \\dfrac{2}{x_2} = \\dfrac{2(x_2 - x_1)}{x_1 x_2}$.',
        'Vì $x_2 - x_1 > 0$ và $x_1 x_2 > 0$ nên $f(x_1) - f(x_2) > 0$, tức là $f(x_1) > f(x_2)$: hàm số $y = \\dfrac{2}{x}$ nghịch biến trên $(0; +\\infty)$.',
      ],
      answer: 'Cả hai khẳng định đều đúng theo định nghĩa.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Quan hệ nào sau đây không cho ta một hàm số $y$ của $x$ (với $x$ thuộc tập $\\{1; 2; 3\\}$)?',
      options: [
        '$x = 1$ ứng với $y = 5$; $x = 2$ ứng với $y = 5$; $x = 3$ ứng với $y = 7$',
        '$x = 1$ ứng với $y = 2$ và $y = 4$; $x = 2$ ứng với $y = 3$; $x = 3$ ứng với $y = 6$',
        '$y = x^2$',
        '$y = 2$ với mọi $x$',
      ],
      answer: 1,
      hints: ['Mỗi giá trị của $x$ phải ứng với một và chỉ một giá trị của $y$.'],
      solution:
        'Trong quan hệ "$x = 1$ ứng với $y = 2$ và $y = 4$", giá trị $x = 1$ ứng với hai giá trị của $y$, nên đó không phải hàm số. Hai giá trị $x$ khác nhau có cùng một $y$ (như $y = 5$) thì vẫn là hàm số; hàm hằng $y = 2$ cũng là hàm số.',
    },
    {
      type: 'choice',
      prompt: 'Tập xác định của hàm số $y = \\dfrac{\\sqrt{x + 3}}{x - 2}$ là',
      options: [
        '$[-3; +\\infty) \\setminus \\{2\\}$',
        '$(-3; +\\infty) \\setminus \\{2\\}$',
        '$[-3; +\\infty)$',
        '$\\mathbb{R} \\setminus \\{2\\}$',
      ],
      answer: 0,
      hints: [
        'Cần đồng thời: biểu thức dưới dấu căn không âm và mẫu khác $0$.',
        '$x + 3 \\ge 0$ và $x - 2 \\ne 0$.',
      ],
      solution:
        'Hàm số xác định khi $x + 3 \\ge 0$ và $x - 2 \\ne 0$, tức là $x \\ge -3$ và $x \\ne 2$. Vậy $D = [-3; +\\infty) \\setminus \\{2\\}$.',
    },
    {
      type: 'number',
      prompt: 'Tập xác định của hàm số $y = \\sqrt{6 - 2x}$ có dạng $(-\\infty; a]$. Tìm $a$.',
      answer: 3,
      hints: ['Giải bất phương trình $6 - 2x \\ge 0$.'],
      solution:
        '$6 - 2x \\ge 0 \\Leftrightarrow 2x \\le 6 \\Leftrightarrow x \\le 3$. Vậy $D = (-\\infty; 3]$ và $a = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hàm số $f(x) = \\begin{cases} 2x + 1 & \\text{nếu } x \\ge 0 \\\\ x^2 & \\text{nếu } x < 0 \\end{cases}$. Tính $f(-3) + f(2)$.',
      answer: 14,
      hints: [
        'Với mỗi giá trị, xem nó thuộc phần $x \\ge 0$ hay $x < 0$.',
        '$f(-3)$ dùng công thức $x^2$, $f(2)$ dùng công thức $2x + 1$.',
      ],
      solution: '$f(-3) = (-3)^2 = 9$ và $f(2) = 2 \\cdot 2 + 1 = 5$, nên $f(-3) + f(2) = 14$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các điểm thuộc đồ thị của hàm số $y = x^2 - 3$.',
      options: ['$(1; -2)$', '$(-2; 1)$', '$(0; 3)$', '$(3; 6)$', '$(-1; -4)$'],
      answers: [0, 1, 3],
      hints: ['Với mỗi điểm $(x_0; y_0)$, kiểm tra $y_0 = x_0^2 - 3$.'],
      solution:
        '$1^2 - 3 = -2$ ✓; $(-2)^2 - 3 = 1$ ✓; $0^2 - 3 = -3 \\ne 3$; $3^2 - 3 = 6$ ✓; $(-1)^2 - 3 = -2 \\ne -4$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = -3x + 5$',
      options: [
        'đồng biến trên $\\mathbb{R}$',
        'nghịch biến trên $\\mathbb{R}$',
        'đồng biến trên $(0; +\\infty)$, nghịch biến trên $(-\\infty; 0)$',
        'không đồng biến, không nghịch biến trên khoảng nào',
      ],
      answer: 1,
      hints: ['Lấy $x_1 < x_2$ rồi so sánh $-3x_1 + 5$ với $-3x_2 + 5$.'],
      solution:
        'Với $x_1 < x_2$ thì $-3x_1 > -3x_2$ (nhân với số âm đổi chiều), nên $-3x_1 + 5 > -3x_2 + 5$, tức là $f(x_1) > f(x_2)$. Hàm số nghịch biến trên $\\mathbb{R}$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = -x^2$ đồng biến trên khoảng nào?',
      options: ['$(-\\infty; 0)$', '$(0; +\\infty)$', '$\\mathbb{R}$', '$(-1; 1)$'],
      answer: 0,
      hints: [
        'Đồ thị $y = -x^2$ là parabol đỉnh $O$, quay xuống dưới.',
        'Đi từ trái sang phải, đồ thị đi lên cho tới đỉnh rồi đi xuống.',
      ],
      solution:
        'Với $x_1 < x_2 < 0$ thì $x_1^2 > x_2^2$, nên $-x_1^2 < -x_2^2$: hàm số đồng biến trên $(-\\infty; 0)$. Trên $(0; +\\infty)$ nó nghịch biến, nên không đồng biến trên $\\mathbb{R}$ hay $(-1; 1)$.',
    },
    {
      type: 'choice',
      prompt: 'Tập giá trị của hàm số $y = x^2 + 1$ là',
      options: ['$\\mathbb{R}$', '$[0; +\\infty)$', '$[1; +\\infty)$', '$(1; +\\infty)$'],
      answer: 2,
      hints: ['Với mọi $x$ thì $x^2 \\ge 0$. Giá trị nhỏ nhất của $y$ đạt được khi nào?'],
      solution:
        'Vì $x^2 \\ge 0$ nên $y = x^2 + 1 \\ge 1$, dấu bằng khi $x = 0$. Mỗi $y_0 \\ge 1$ đều đạt được tại $x = \\sqrt{y_0 - 1}$. Tập giá trị là $[1; +\\infty)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hãng taxi tính giá cước $12\\,000$ đồng cho km đầu tiên và $10\\,000$ đồng cho mỗi km tiếp theo. Số tiền $f(x)$ (đồng) phải trả cho quãng đường $x$ km $(x > 1)$ là $f(x) = 12\\,000 + 10\\,000(x - 1)$. Tính $f(5)$.',
      answer: 52000,
      unit: 'đồng',
      hints: ['Thay $x = 5$: có $1$ km đầu và $4$ km tiếp theo.'],
      solution:
        '$f(5) = 12\\,000 + 10\\,000 \\cdot (5 - 1) = 12\\,000 + 40\\,000 = 52\\,000$ (đồng).',
    },
  ],
  takeaways: [
    'Hàm số: mỗi $x \\in D$ ứng với một và chỉ một $y$; $D$ là tập xác định, các giá trị $y$ nhận được tạo thành tập giá trị.',
    'Hàm số cho bằng công thức không nói rõ $D$: $D$ gồm mọi $x$ làm biểu thức có nghĩa (mẫu khác $0$, biểu thức dưới căn bậc hai không âm).',
    'Đồ thị là tập hợp các điểm $M(x; f(x))$ với $x \\in D$; $M(x_0; y_0)$ thuộc đồ thị khi $x_0 \\in D$ và $y_0 = f(x_0)$.',
    'Đồng biến trên $(a; b)$: $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$, đồ thị đi lên; nghịch biến: $x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$, đồ thị đi xuống.',
  ],
};
