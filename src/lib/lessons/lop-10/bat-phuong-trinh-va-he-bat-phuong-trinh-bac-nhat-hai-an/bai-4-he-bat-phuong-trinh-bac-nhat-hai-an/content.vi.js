/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ bất phương trình bậc nhất hai ẩn, miền nghiệm là giao các nửa mặt phẳng, và cách tìm giá trị lớn nhất, nhỏ nhất của F = ax + by trên một miền đa giác để giải bài toán thực tiễn.',
  intro:
    'Một cửa hàng định nhập hai loại máy A và B, giá mỗi máy lần lượt là $10$ triệu đồng và $20$ triệu đồng, với số vốn không quá $4$ tỉ đồng; cửa hàng ước tính bán được không quá $250$ máy mỗi tháng. Mỗi máy A lãi $2{,}5$ triệu đồng, mỗi máy B lãi $4$ triệu đồng. Nên nhập mỗi loại bao nhiêu máy để lãi nhiều nhất? Các điều kiện ở đây tạo thành một hệ bất phương trình bậc nhất hai ẩn.',
  objectives: [
    'Nhận biết hệ bất phương trình bậc nhất hai ẩn và nghiệm của nó.',
    'Biểu diễn miền nghiệm của hệ là giao các nửa mặt phẳng trên mặt phẳng toạ độ.',
    'Tìm giá trị lớn nhất, nhỏ nhất của biểu thức $F = ax + by$ trên một miền đa giác.',
    'Giải một số bài toán thực tiễn đưa về hệ bất phương trình bậc nhất hai ẩn.',
  ],
  sections: [
    {
      heading: 'Hệ bất phương trình bậc nhất hai ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hệ bất phương trình bậc nhất hai ẩn là một hệ gồm một số bất phương trình bậc nhất hai ẩn. Cặp số $(x_0; y_0)$ là một nghiệm của hệ nếu nó là nghiệm chung của tất cả các bất phương trình trong hệ.',
        },
        {
          type: 'p',
          text: 'Với bài toán của cửa hàng, gọi $x$, $y$ là số máy A và máy B nhập về. Ta có hệ',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} x \\ge 0 \\\\ y \\ge 0 \\\\ x + y \\le 250 \\\\ 10x + 20y \\le 4\\,000. \\end{cases}',
        },
        {
          type: 'p',
          text: 'Cặp $(100; 150)$ là một nghiệm vì $100 + 150 = 250 \\le 250$ và $10 \\cdot 100 + 20 \\cdot 150 = 4\\,000 \\le 4\\,000$; cặp $(200; 100)$ không là nghiệm vì $200 + 100 = 300 > 250$.',
        },
      ],
    },
    {
      heading: 'Biểu diễn miền nghiệm của hệ',
      blocks: [
        {
          type: 'p',
          text: 'Trong mặt phẳng toạ độ, tập hợp các điểm có toạ độ là nghiệm của hệ gọi là miền nghiệm của hệ. Miền nghiệm của hệ là giao các miền nghiệm của các bất phương trình trong hệ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách biểu diễn',
          text: 'Trên cùng một mặt phẳng toạ độ, biểu diễn miền nghiệm của từng bất phương trình trong hệ và gạch bỏ phần còn lại. Phần không bị gạch là miền nghiệm của hệ.',
        },
        {
          type: 'p',
          text: 'Với hệ của cửa hàng, miền nghiệm là tứ giác $OABC$ (kể cả các cạnh) với $O(0; 0)$, $A(250; 0)$, $B(100; 150)$, $C(0; 200)$: $A$ là giao của $x + y = 250$ với trục $Ox$, $C$ là giao của $10x + 20y = 4\\,000$ với trục $Oy$, còn $B$ là giao của hai đường thẳng đó.',
        },
      ],
    },
    {
      heading: 'Giá trị lớn nhất, nhỏ nhất của F = ax + by',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Giá trị lớn nhất (hay nhỏ nhất) của biểu thức $F(x; y) = ax + by$, với $(x; y)$ là toạ độ các điểm thuộc miền đa giác $A_1A_2 \\ldots A_n$ (các điểm nằm bên trong hoặc trên các cạnh của đa giác), đạt được tại một trong các đỉnh của đa giác đó.',
        },
        {
          type: 'p',
          text: 'Có thể hình dung bằng đường mức $ax + by = k$: khi $k$ thay đổi, các đường mức song song với nhau và trượt trên mặt phẳng. Đường mức cắt miền đa giác khi $k$ nằm giữa giá trị nhỏ nhất và lớn nhất; vị trí cuối cùng nó còn chạm miền là một đỉnh (hoặc cả một cạnh song song với đường mức).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gọi ẩn, viết hệ bất phương trình mô tả các điều kiện và biểu thức $F = ax + by$ cần tìm giá trị lớn nhất (nhỏ nhất).',
            'Biểu diễn miền nghiệm của hệ, xác định toạ độ các đỉnh của miền đa giác.',
            'Tính giá trị của $F$ tại các đỉnh rồi so sánh để kết luận.',
          ],
        },
        {
          type: 'table',
          head: ['Đỉnh', '$F = 2{,}5x + 4y$ (triệu đồng)'],
          rows: [
            ['$O(0; 0)$', '$0$'],
            ['$A(250; 0)$', '$625$'],
            ['$B(100; 150)$', '$850$'],
            ['$C(0; 200)$', '$800$'],
          ],
          caption: 'Lãi của cửa hàng tại các đỉnh của tứ giác OABC: lớn nhất tại B.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chồng nửa mặt phẳng và kéo đường mức',
    instruction:
      'Bấm từng bất phương trình để chồng các nửa mặt phẳng: phần không bị gạch (tô xanh nhạt) là miền nghiệm của hệ. Chọn hai hệ số $p$ và $q$ của $F = px + qy$ rồi kéo $k$ để đường mức $F = k$ trượt qua miền. Quan sát: khi sắp rời miền, đường mức chỉ còn chạm miền tại một đỉnh. Bấm “Tính F tại các đỉnh” để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Cặp số nào trong $(2; 3)$ và $(3; 3)$ là nghiệm của hệ $\\begin{cases} x \\ge 0,\\ y \\ge 0 \\\\ x + y \\le 5 \\\\ x + 2y \\le 8 \\end{cases}$?',
      steps: [
        '$(2; 3)$: $x, y \\ge 0$; $2 + 3 = 5 \\le 5$; $2 + 2 \\cdot 3 = 8 \\le 8$. Cả bốn bất phương trình đều đúng.',
        '$(3; 3)$: $3 + 3 = 6$, mà $6 \\le 5$ sai, nên không cần thử tiếp.',
      ],
      answer: '$(2; 3)$ là nghiệm của hệ; $(3; 3)$ không là nghiệm.',
    },
    {
      problem:
        'Biểu diễn miền nghiệm của hệ $\\begin{cases} y \\ge 0 \\\\ x \\le 4 \\\\ x - 2y \\ge -2. \\end{cases}$',
      steps: [
        'Miền nghiệm của $y \\ge 0$ là nửa mặt phẳng phía trên trục $Ox$, kể cả trục $Ox$; gạch bỏ phần dưới.',
        'Miền nghiệm của $x \\le 4$ là nửa mặt phẳng bên trái đường thẳng $x = 4$, kể cả bờ; gạch bỏ phần bên phải.',
        'Đường thẳng $x - 2y = -2$ đi qua $(-2; 0)$ và $(0; 1)$. Thay $O$: $0 \\ge -2$ đúng, nên giữ nửa mặt phẳng chứa $O$, kể cả bờ.',
        'Phần không bị gạch là tam giác có các đỉnh $A(-2; 0)$, $B(4; 0)$ và $C(4; 3)$ ($C$ là giao của $x = 4$ và $x - 2y = -2$: $4 - 2y = -2 \\Rightarrow y = 3$).',
      ],
      answer: 'Miền nghiệm là tam giác $ABC$ với $A(-2; 0)$, $B(4; 0)$, $C(4; 3)$, kể cả các cạnh.',
    },
    {
      problem:
        'Tìm giá trị lớn nhất và nhỏ nhất của $F = x + 2y$ với $(x; y)$ thuộc miền nghiệm của hệ ở ví dụ trên.',
      steps: [
        'Miền nghiệm là tam giác $ABC$, $A(-2; 0)$, $B(4; 0)$, $C(4; 3)$.',
        '$F(A) = -2 + 0 = -2$; $F(B) = 4 + 0 = 4$; $F(C) = 4 + 2 \\cdot 3 = 10$.',
        'So sánh ba giá trị: lớn nhất là $10$, nhỏ nhất là $-2$.',
      ],
      answer:
        '$F$ lớn nhất bằng $10$ tại $x = 4$, $y = 3$; $F$ nhỏ nhất bằng $-2$ tại $x = -2$, $y = 0$.',
    },
    {
      problem:
        'Giải bài toán của cửa hàng: nhập $x$ máy A và $y$ máy B với $x + y \\le 250$, $10x + 20y \\le 4\\,000$, $x \\ge 0$, $y \\ge 0$. Lãi $F = 2{,}5x + 4y$ (triệu đồng) lớn nhất khi nào?',
      steps: [
        'Miền nghiệm là tứ giác $OABC$ với $O(0; 0)$, $A(250; 0)$, $B(100; 150)$, $C(0; 200)$.',
        'Toạ độ $B$: giải $x + y = 250$ và $x + 2y = 400$ được $y = 150$, $x = 100$.',
        '$F(O) = 0$, $F(A) = 625$, $F(B) = 250 + 600 = 850$, $F(C) = 800$.',
      ],
      answer: 'Lãi lớn nhất là $850$ triệu đồng khi nhập $100$ máy A và $150$ máy B.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hệ nào sau đây là hệ bất phương trình bậc nhất hai ẩn?',
      options: [
        '$\\begin{cases} x + y > 2 \\\\ x - y \\le 1 \\end{cases}$',
        '$\\begin{cases} x^2 + y > 2 \\\\ x \\le 1 \\end{cases}$',
        '$\\begin{cases} xy \\le 3 \\\\ x + y \\ge 0 \\end{cases}$',
        '$\\begin{cases} x + y = 2 \\\\ x - y = 0 \\end{cases}$',
      ],
      answer: 0,
      hints: [
        'Mỗi bất phương trình trong hệ phải có dạng $ax + by < c$ (hoặc $>$, $\\le$, $\\ge$).',
        'Một hệ toàn dấu bằng là hệ phương trình, không phải hệ bất phương trình.',
      ],
      solution:
        'Chỉ hệ gồm $x + y > 2$ và $x - y \\le 1$ thoả mãn. Hệ có $x^2$ hoặc $xy$ không bậc nhất; hệ gồm $x + y = 2$, $x - y = 0$ là hệ phương trình.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các cặp số là nghiệm của hệ $\\begin{cases} x + y \\le 4 \\\\ x - y \\ge -2 \\\\ y \\ge 0. \\end{cases}$',
      options: ['$(0; 0)$', '$(1; 3)$', '$(3; 2)$', '$(-1; 2)$', '$(2; -1)$', '$(4; 0)$'],
      answers: [0, 1, 5],
      hints: [
        'Một cặp là nghiệm của hệ khi thoả mãn cả ba bất phương trình.',
        'Chỉ cần một bất phương trình sai là cặp đó bị loại; nhớ rằng dấu $\\le$, $\\ge$ cho phép dấu bằng.',
      ],
      solution:
        '$(0; 0)$: $0 \\le 4$, $0 \\ge -2$, $0 \\ge 0$, nhận. $(1; 3)$: $4 \\le 4$, $-2 \\ge -2$, $3 \\ge 0$, nhận. $(3; 2)$: $5 \\le 4$ sai. $(-1; 2)$: $-3 \\ge -2$ sai. $(2; -1)$: $-1 \\ge 0$ sai. $(4; 0)$: $4 \\le 4$, $4 \\ge -2$, $0 \\ge 0$, nhận.',
    },
    {
      type: 'choice',
      prompt:
        'Miền nghiệm của hệ $\\begin{cases} x \\ge 0,\\ y \\ge 0 \\\\ x + y \\le 5 \\\\ x + 2y \\le 8 \\end{cases}$ là một tứ giác. Điểm nào sau đây không là đỉnh của tứ giác đó?',
      options: ['$(0; 5)$', '$(0; 4)$', '$(5; 0)$', '$(2; 3)$'],
      answer: 0,
      hints: [
        'Mỗi đỉnh phải là một nghiệm của hệ.',
        'Thử $(0; 5)$ vào bất phương trình $x + 2y \\le 8$.',
      ],
      solution:
        'Các đỉnh là $O(0; 0)$, $(5; 0)$, $(2; 3)$ (giao của $x + y = 5$ và $x + 2y = 8$) và $(0; 4)$. Điểm $(0; 5)$ cho $0 + 2 \\cdot 5 = 10 > 8$ nên không thuộc miền nghiệm.',
    },
    {
      type: 'choice',
      prompt:
        'Với miền nghiệm là tứ giác $OABC$, $O(0; 0)$, $A(5; 0)$, $B(2; 3)$, $C(0; 4)$, biểu thức $F = 3x + 4y$ đạt giá trị lớn nhất tại đỉnh nào?',
      options: ['$B(2; 3)$', '$A(5; 0)$', '$C(0; 4)$', '$O(0; 0)$'],
      answer: 0,
      hints: ['Tính $F$ tại cả bốn đỉnh rồi so sánh.'],
      solution:
        '$F(O) = 0$, $F(A) = 15$, $F(B) = 6 + 12 = 18$, $F(C) = 16$. Lớn nhất là $18$ tại $B(2; 3)$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị lớn nhất của $F = 2x + 3y$ trên miền tam giác $OAB$ với $O(0; 0)$, $A(150; 0)$, $B(0; 150)$ (miền nghiệm của hệ $x \\ge 0$, $y \\ge 0$, $x + y \\le 150$).',
      answer: 450,
      hints: ['Giá trị lớn nhất đạt tại một đỉnh của tam giác.', 'Tính $F(O)$, $F(A)$, $F(B)$.'],
      solution:
        '$F(O) = 0$, $F(A) = 300$, $F(B) = 450$. Giá trị lớn nhất là $450$, đạt tại $B(0; 150)$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm giá trị nhỏ nhất của $F = x - y$ trên miền nghiệm của hệ $\\begin{cases} x \\ge 1,\\ y \\ge 1 \\\\ x + y \\le 6 \\\\ 2x - y \\le 6. \\end{cases}$',
      answer: -4,
      hints: [
        'Miền nghiệm là một tứ giác. Tìm các đỉnh bằng cách giải từng cặp phương trình đường bờ cạnh nhau.',
        'Các đỉnh là $(1; 1)$, $(3{,}5; 1)$, $(4; 2)$, $(1; 5)$.',
      ],
      solution:
        'Các đỉnh: $(1; 1)$; $(3{,}5; 1)$ (giao của $y = 1$ và $2x - y = 6$); $(4; 2)$ (giao của $x + y = 6$ và $2x - y = 6$); $(1; 5)$ (giao của $x = 1$ và $x + y = 6$). $F$ tại các đỉnh: $0$; $2{,}5$; $2$; $-4$. Giá trị nhỏ nhất là $-4$ tại $(1; 5)$.',
    },
    {
      type: 'number',
      prompt: 'Với hệ ở câu trên, giá trị lớn nhất của $F = x - y$ bằng bao nhiêu?',
      answer: 2.5,
      hints: ['Dùng lại giá trị của $F$ tại bốn đỉnh $(1; 1)$, $(3{,}5; 1)$, $(4; 2)$, $(1; 5)$.'],
      solution:
        '$F(1; 1) = 0$, $F(3{,}5; 1) = 2{,}5$, $F(4; 2) = 2$, $F(1; 5) = -4$. Giá trị lớn nhất là $2{,}5$ tại $(3{,}5; 1)$.',
    },
    {
      type: 'choice',
      prompt:
        'Giá trị lớn nhất của $F = ax + by$ trên một miền đa giác (kể cả các cạnh) đạt được tại',
      options: [
        'một trong các đỉnh của đa giác',
        'trung điểm của một cạnh của đa giác',
        'gốc toạ độ',
        'một điểm nằm bên trong đa giác',
      ],
      answer: 0,
      hints: ['Hình dung đường mức $ax + by = k$ trượt dần cho đến khi sắp rời khỏi miền.'],
      solution:
        'Theo tính chất đã học, giá trị lớn nhất (nhỏ nhất) của $F$ trên miền đa giác đạt tại một trong các đỉnh của đa giác.',
    },
    {
      type: 'number',
      prompt:
        'Một xưởng sản xuất hai loại sản phẩm I và II. Mỗi kilôgam sản phẩm I cần $2$ kg nguyên liệu và $30$ giờ làm, lãi $40$ nghìn đồng; mỗi kilôgam sản phẩm II cần $4$ kg nguyên liệu và $15$ giờ làm, lãi $30$ nghìn đồng. Xưởng có $200$ kg nguyên liệu và $1\\,200$ giờ làm. Tiền lãi lớn nhất xưởng có thể thu được là bao nhiêu nghìn đồng?',
      answer: 2000,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$, $y$ là số kilôgam sản phẩm I, II: $2x + 4y \\le 200$, $30x + 15y \\le 1\\,200$, $x, y \\ge 0$; lãi $F = 40x + 30y$.',
        'Rút gọn: $x + 2y \\le 100$, $2x + y \\le 80$. Các đỉnh của miền nghiệm là $O(0; 0)$, $A(40; 0)$, $B(20; 40)$, $C(0; 50)$.',
      ],
      solution:
        'Hệ: $x \\ge 0$, $y \\ge 0$, $x + 2y \\le 100$, $2x + y \\le 80$. Đỉnh $B$ là giao của $x + 2y = 100$ và $2x + y = 80$: $x = 20$, $y = 40$. $F(O) = 0$, $F(A) = 1\\,600$, $F(B) = 800 + 1\\,200 = 2\\,000$, $F(C) = 1\\,500$. Lãi lớn nhất là $2\\,000$ nghìn đồng khi sản xuất $20$ kg sản phẩm I và $40$ kg sản phẩm II.',
    },
  ],
  takeaways: [
    'Nghiệm của hệ bất phương trình bậc nhất hai ẩn là nghiệm chung của mọi bất phương trình trong hệ.',
    'Miền nghiệm của hệ là giao các nửa mặt phẳng nghiệm: biểu diễn từng bất phương trình, gạch bỏ phần không thoả mãn, phần không bị gạch là miền nghiệm.',
    'Trên một miền đa giác, $F = ax + by$ đạt giá trị lớn nhất, nhỏ nhất tại các đỉnh: tính $F$ tại mọi đỉnh rồi so sánh.',
  ],
};
