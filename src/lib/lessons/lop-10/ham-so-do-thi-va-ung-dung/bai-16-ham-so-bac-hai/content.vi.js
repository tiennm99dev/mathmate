/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàm số bậc hai y = ax² + bx + c: đồ thị là parabol với đỉnh, trục đối xứng và bề lõm; cách vẽ parabol, bảng biến thiên và ứng dụng tìm giá trị lớn nhất, nhỏ nhất trong thực tiễn.',
  intro:
    'Một quả bóng được đá lên rồi rơi xuống, dây cáp của cầu treo, mái vòm của một cổng chào: những đường cong ấy đều có dạng parabol, đồ thị của hàm số bậc hai. Hiểu hàm số bậc hai giúp ta biết quả bóng lên cao nhất bao nhiêu, hay rào mảnh vườn thế nào để được diện tích lớn nhất.',
  objectives: [
    'Nhận biết hàm số bậc hai, tính toạ độ đỉnh và viết phương trình trục đối xứng của parabol.',
    'Vẽ parabol $y = ax^2 + bx + c$ và lập bảng biến thiên của hàm số bậc hai.',
    'Vận dụng hàm số bậc hai để giải bài toán thực tiễn: độ cao lớn nhất, diện tích lớn nhất.',
  ],
  sections: [
    {
      heading: 'Khái niệm hàm số bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số bậc hai',
          text: 'Hàm số bậc hai là hàm số cho bởi công thức $y = ax^2 + bx + c$, trong đó $x$ là biến số, $a$, $b$, $c$ là các hằng số và $a \\ne 0$. Tập xác định của hàm số bậc hai là $\\mathbb{R}$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $y = 2x^2 - 3x + 1$ $(a = 2, b = -3, c = 1)$, $y = -x^2 + 4$ $(b = 0)$ và $y = x^2$ đều là hàm số bậc hai; $y = 3x - 1$ thì không vì không có $x^2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Với $\\Delta = b^2 - 4ac$, ta biến đổi được $y = ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{\\Delta}{4a}$. Nếu $a > 0$ thì $y \\ge -\\dfrac{\\Delta}{4a}$ với mọi $x$, dấu bằng khi $x = -\\dfrac{b}{2a}$; nếu $a < 0$ thì $y \\le -\\dfrac{\\Delta}{4a}$ với mọi $x$.',
        },
      ],
    },
    {
      heading: 'Đồ thị của hàm số bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đồ thị',
          text: 'Đồ thị của hàm số $y = ax^2 + bx + c$ $(a \\ne 0)$ là một parabol có: đỉnh $S\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$; trục đối xứng là đường thẳng $x = -\\dfrac{b}{2a}$; bề lõm quay lên trên nếu $a > 0$, quay xuống dưới nếu $a < 0$; cắt trục tung tại điểm $(0; c)$.',
        },
        {
          type: 'p',
          text: 'Tung độ đỉnh cũng tính được bằng cách thay hoành độ đỉnh vào công thức: $y_S = a x_S^2 + b x_S + c$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định toạ độ đỉnh $S\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$.',
            'Vẽ trục đối xứng $x = -\\dfrac{b}{2a}$.',
            'Xác định giao điểm của parabol với trục tung $(0; c)$ và với trục hoành (nếu có); xác định thêm điểm đối xứng với $(0; c)$ qua trục đối xứng.',
            'Vẽ parabol đi qua các điểm đó, bề lõm quay lên nếu $a > 0$, quay xuống nếu $a < 0$.',
          ],
        },
      ],
    },
    {
      heading: 'Sự biến thiên của hàm số bậc hai',
      blocks: [
        {
          type: 'table',
          head: ['Khoảng, điểm', '$a > 0$', '$a < 0$'],
          rows: [
            ['Trên $\\left(-\\infty; -\\dfrac{b}{2a}\\right)$', 'Nghịch biến', 'Đồng biến'],
            ['Trên $\\left(-\\dfrac{b}{2a}; +\\infty\\right)$', 'Đồng biến', 'Nghịch biến'],
            [
              'Tại $x = -\\dfrac{b}{2a}$',
              'Giá trị nhỏ nhất $-\\dfrac{\\Delta}{4a}$',
              'Giá trị lớn nhất $-\\dfrac{\\Delta}{4a}$',
            ],
          ],
          caption: 'Sự biến thiên của hàm số bậc hai $y = ax^2 + bx + c$ $(a \\ne 0)$.',
        },
        {
          type: 'p',
          text: 'Bảng biến thiên ghi tóm tắt điều đó: hàng trên là $x$ từ $-\\infty$ qua $-\\dfrac{b}{2a}$ tới $+\\infty$; hàng dưới là $y$, mũi tên đi xuống ở khoảng nghịch biến, đi lên ở khoảng đồng biến, giá trị $-\\dfrac{\\Delta}{4a}$ ghi ở đáy (khi $a > 0$) hoặc ở đỉnh (khi $a < 0$).',
        },
      ],
    },
    {
      heading: 'Ứng dụng của hàm số bậc hai',
      blocks: [
        {
          type: 'p',
          text: 'Một vật được ném thẳng lên từ độ cao $h_0$ (m) với vận tốc ban đầu $v_0$ (m/s) có độ cao $h(t) = -4{,}9t^2 + v_0 t + h_0$ sau $t$ giây (bỏ qua sức cản không khí). Đồ thị của $h$ theo $t$ là một cung parabol quay xuống: đỉnh cho độ cao lớn nhất, nghiệm dương của $h(t) = 0$ cho thời điểm chạm đất.',
        },
        { type: 'widget', name: 'ball' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bài toán tối ưu',
          text: 'Khi một đại lượng được biểu diễn bởi hàm số bậc hai $y = ax^2 + bx + c$, giá trị lớn nhất (khi $a < 0$) hay nhỏ nhất (khi $a > 0$) của nó chính là tung độ đỉnh, đạt tại $x = -\\dfrac{b}{2a}$. Nhớ kiểm tra $x$ đó thoả mãn điều kiện của bài toán.',
        },
      ],
    },
  ],
  explore: {
    title: 'Parabol y = ax² + bx + c',
    instruction:
      'Kéo các thanh trượt $a$, $b$, $c$ và quan sát: dấu của $a$ quyết định bề lõm, đỉnh $S$ và trục đối xứng di chuyển khi $b$ thay đổi, còn $c$ là tung độ giao điểm với trục tung. Bảng biến thiên đổi theo. Thử thách: chỉnh $a$, $b$, $c$ để được parabol có đỉnh và đi qua điểm cho trước.',
  },
  examples: [
    {
      problem:
        'Vẽ đồ thị của hàm số $y = x^2 - 4x + 3$. Từ đồ thị, chỉ ra khoảng đồng biến, nghịch biến của hàm số.',
      steps: [
        '$a = 1$, $b = -4$, $c = 3$, $\\Delta = 16 - 12 = 4$. Đỉnh $S\\left(\\dfrac{4}{2}; -\\dfrac{4}{4}\\right) = S(2; -1)$.',
        'Trục đối xứng là đường thẳng $x = 2$.',
        'Giao với trục tung: $(0; 3)$; điểm đối xứng với nó qua $x = 2$ là $(4; 3)$. Giao với trục hoành: $x^2 - 4x + 3 = 0 \\Leftrightarrow x = 1$ hoặc $x = 3$, được $(1; 0)$ và $(3; 0)$.',
        '$a = 1 > 0$ nên vẽ parabol bề lõm quay lên đi qua $(0; 3)$, $(1; 0)$, $S(2; -1)$, $(3; 0)$, $(4; 3)$.',
        'Đồ thị đi xuống trên $(-\\infty; 2)$ và đi lên trên $(2; +\\infty)$.',
      ],
      answer:
        'Hàm số nghịch biến trên $(-\\infty; 2)$, đồng biến trên $(2; +\\infty)$, giá trị nhỏ nhất là $-1$ tại $x = 2$.',
    },
    {
      problem: 'Lập bảng biến thiên của hàm số $y = -2x^2 + 4x + 1$.',
      steps: [
        'Hoành độ đỉnh $x_S = -\\dfrac{4}{2 \\cdot (-2)} = 1$, tung độ đỉnh $y_S = -2 + 4 + 1 = 3$.',
        '$a = -2 < 0$: hàm số đồng biến trên $(-\\infty; 1)$, nghịch biến trên $(1; +\\infty)$.',
        'Bảng biến thiên: $x$ đi từ $-\\infty$ qua $1$ tới $+\\infty$; $y$ đi lên từ $-\\infty$ tới $3$ rồi đi xuống tới $-\\infty$.',
      ],
      answer:
        'Hàm số đạt giá trị lớn nhất bằng $3$ tại $x = 1$; đồng biến trên $(-\\infty; 1)$, nghịch biến trên $(1; +\\infty)$.',
    },
    {
      problem:
        'Một quả bóng được đá lên từ độ cao $1{,}2$ m; sau $1$ giây nó ở độ cao $8{,}5$ m, sau $2$ giây ở độ cao $6$ m. Biết độ cao $h$ (m) là hàm số bậc hai $h = at^2 + bt + c$ của thời gian $t$ (s). Tìm hàm số đó và độ cao lớn nhất của quả bóng.',
      steps: [
        'Tại $t = 0$: $c = 1{,}2$.',
        'Tại $t = 1$: $a + b + 1{,}2 = 8{,}5$, tức là $a + b = 7{,}3$. Tại $t = 2$: $4a + 2b + 1{,}2 = 6$, tức là $2a + b = 2{,}4$.',
        'Trừ hai phương trình: $a = 2{,}4 - 7{,}3 = -4{,}9$, suy ra $b = 12{,}2$. Vậy $h = -4{,}9t^2 + 12{,}2t + 1{,}2$.',
        'Đỉnh có hoành độ $t = \\dfrac{12{,}2}{2 \\cdot 4{,}9} \\approx 1{,}24$ (s) và tung độ $h = 1{,}2 + \\dfrac{12{,}2^2}{4 \\cdot 4{,}9} \\approx 8{,}79$ (m).',
      ],
      answer:
        '$h = -4{,}9t^2 + 12{,}2t + 1{,}2$; quả bóng lên cao nhất khoảng $8{,}79$ m, sau khoảng $1{,}24$ giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hàm số nào sau đây là hàm số bậc hai?',
      options: ['$y = 3x - 1$', '$y = (x - 1)^2 - x^2$', '$y = 1 - 2x^2$', '$y = \\dfrac{1}{x^2}$'],
      answer: 2,
      hints: ['Rút gọn từng công thức; cần dạng $ax^2 + bx + c$ với $a \\ne 0$.'],
      solution:
        '$y = 1 - 2x^2$ có dạng $ax^2 + bx + c$ với $a = -2$, $b = 0$, $c = 1$. Còn $(x - 1)^2 - x^2 = -2x + 1$ là hàm số bậc nhất, $y = 3x - 1$ là hàm số bậc nhất, $\\dfrac{1}{x^2}$ không có dạng đa thức.',
    },
    {
      type: 'number',
      prompt: 'Tìm hoành độ đỉnh của parabol $y = 2x^2 - 8x + 1$.',
      answer: 2,
      hints: ['Hoành độ đỉnh là $-\\dfrac{b}{2a}$.'],
      solution: '$x_S = -\\dfrac{-8}{2 \\cdot 2} = 2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm tung độ đỉnh của parabol $y = -x^2 + 6x - 5$.',
      answer: 4,
      hints: ['Tính hoành độ đỉnh trước.', 'Thay $x_S = 3$ vào công thức.'],
      solution: '$x_S = -\\dfrac{6}{2 \\cdot (-1)} = 3$, $y_S = -9 + 18 - 5 = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Trục đối xứng của parabol $y = 3x^2 + 6x - 1$ là đường thẳng',
      options: ['$x = 1$', '$x = -1$', '$x = -2$', '$y = -1$'],
      answer: 1,
      hints: ['Trục đối xứng là đường thẳng $x = -\\dfrac{b}{2a}$.'],
      solution: '$-\\dfrac{b}{2a} = -\\dfrac{6}{6} = -1$, nên trục đối xứng là $x = -1$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số $y = x^2 - 2x - 3$ đồng biến trên khoảng nào?',
      options: ['$(-\\infty; 1)$', '$(1; +\\infty)$', '$(-\\infty; -4)$', '$(-1; 3)$'],
      answer: 1,
      hints: [
        'Tìm hoành độ đỉnh và xét dấu của $a$.',
        '$a = 1 > 0$: hàm số đồng biến ở bên phải đỉnh.',
      ],
      solution:
        '$x_S = 1$ và $a = 1 > 0$, nên hàm số nghịch biến trên $(-\\infty; 1)$ và đồng biến trên $(1; +\\infty)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị nhỏ nhất của hàm số $y = 2x^2 + 4x + 5$.',
      answer: 3,
      hints: ['$a > 0$ nên giá trị nhỏ nhất là tung độ đỉnh.'],
      solution:
        '$x_S = -\\dfrac{4}{4} = -1$, $y_S = 2 - 4 + 5 = 3$. Giá trị nhỏ nhất là $3$, đạt tại $x = -1$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về đồ thị của hàm số $y = -x^2 + 2x + 3$.',
      options: [
        'Đỉnh là $S(1; 4)$',
        'Bề lõm quay lên trên',
        'Cắt trục tung tại $(0; 3)$',
        'Cắt trục hoành tại $(1; 0)$ và $(-3; 0)$',
        'Hàm số nghịch biến trên $(1; +\\infty)$',
      ],
      answers: [0, 2, 4],
      hints: ['Tính đỉnh, xét dấu $a$, thay $x = 0$, giải $-x^2 + 2x + 3 = 0$.'],
      solution:
        '$x_S = 1$, $y_S = -1 + 2 + 3 = 4$ nên đỉnh $S(1; 4)$. $a = -1 < 0$: bề lõm quay xuống và hàm số nghịch biến trên $(1; +\\infty)$. Tại $x = 0$, $y = 3$. Phương trình $-x^2 + 2x + 3 = 0$ có nghiệm $x = -1$, $x = 3$, nên parabol cắt trục hoành tại $(-1; 0)$ và $(3; 0)$, không phải $(1; 0)$ và $(-3; 0)$.',
    },
    {
      type: 'number',
      prompt: 'Parabol $y = ax^2 + bx + 2$ có đỉnh $I(2; -2)$. Tìm $b$.',
      answer: -4,
      hints: [
        'Từ hoành độ đỉnh: $-\\dfrac{b}{2a} = 2$, tức là $b = -4a$.',
        'Thay toạ độ đỉnh vào: $4a + 2b + 2 = -2$.',
      ],
      solution:
        '$-\\dfrac{b}{2a} = 2 \\Rightarrow b = -4a$. Đỉnh thuộc parabol: $4a + 2b + 2 = -2 \\Rightarrow 4a - 8a = -4 \\Rightarrow a = 1$, nên $b = -4$. Kiểm tra: $y = x^2 - 4x + 2$ có đỉnh $(2; -2)$.',
    },
    {
      type: 'number',
      prompt:
        'Bác Hùng dùng $40$ m lưới thép rào thành một mảnh vườn hình chữ nhật. Diện tích lớn nhất của mảnh vườn là bao nhiêu mét vuông?',
      answer: 100,
      unit: 'm²',
      hints: [
        'Gọi chiều rộng là $x$ (m), nửa chu vi là $20$ m nên chiều dài là $20 - x$.',
        'Diện tích $S(x) = x(20 - x) = -x^2 + 20x$; tìm giá trị lớn nhất.',
      ],
      solution:
        '$S(x) = -x^2 + 20x$ với $0 < x < 20$. Đây là hàm số bậc hai có $a = -1 < 0$, đạt giá trị lớn nhất tại $x = -\\dfrac{20}{-2} = 10$: $S(10) = 100$. Mảnh vườn là hình vuông cạnh $10$ m, diện tích $100\\ \\text{m}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc cổng hình parabol, chọn hệ trục với gốc $O$ tại đỉnh cổng thì cổng có phương trình $y = -\\dfrac{1}{2}x^2$. Chân cổng rộng $8$ m. Cổng cao bao nhiêu mét?',
      answer: 8,
      unit: 'm',
      hints: [
        'Hai chân cổng đối xứng qua trục $Oy$, có hoành độ $x = \\pm 4$.',
        'Chiều cao cổng là $|y|$ tại chân cổng.',
      ],
      solution:
        'Chân cổng ứng với $x = \\pm 4$, khi đó $y = -\\dfrac{1}{2} \\cdot 16 = -8$. Đỉnh cổng ở độ cao $0$, chân cổng ở $-8$, nên cổng cao $8$ m.',
    },
  ],
  takeaways: [
    'Hàm số bậc hai $y = ax^2 + bx + c$ $(a \\ne 0)$ có tập xác định $\\mathbb{R}$.',
    'Đồ thị là parabol đỉnh $S\\left(-\\dfrac{b}{2a}; -\\dfrac{\\Delta}{4a}\\right)$, trục đối xứng $x = -\\dfrac{b}{2a}$, cắt trục tung tại $(0; c)$.',
    '$a > 0$: bề lõm quay lên, nghịch biến rồi đồng biến, giá trị nhỏ nhất tại đỉnh; $a < 0$: quay xuống, đồng biến rồi nghịch biến, giá trị lớn nhất tại đỉnh.',
    'Bài toán thực tiễn về độ cao lớn nhất, diện tích lớn nhất quy về tìm đỉnh của parabol.',
  ],
};
