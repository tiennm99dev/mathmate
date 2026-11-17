/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng cửa sổ Đồ hoạ 3D của GeoGebra để vẽ mặt phẳng, đường thẳng và mặt cầu từ phương trình, tìm giao điểm, giao tuyến, rồi kiểm tra bằng các công thức toạ độ trong không gian.',
  intro:
    'Ở Chương V, ta viết được phương trình của mặt phẳng, đường thẳng và mặt cầu, nhưng vẽ chúng trên giấy cho đúng thì không dễ. Với GeoGebra 3D, chỉ cần gõ phương trình là có hình, xoay được để nhìn từ mọi phía; phần mềm còn tìm giao điểm và đo khoảng cách. Trong hoạt động này, em vẽ các đối tượng trong không gian $Oxyz$ và dùng kiến thức đã học để kiểm tra những gì nhìn thấy.',
  objectives: [
    'Mở cửa sổ Đồ hoạ 3D của GeoGebra, xoay và quan sát hệ trục $Oxyz$.',
    'Vẽ mặt phẳng, đường thẳng, mặt cầu bằng phương trình hoặc bằng lệnh.',
    'Dùng các lệnh Intersect, IntersectPath, Distance để tìm giao điểm, giao tuyến và khoảng cách.',
    'Kiểm tra kết quả của phần mềm bằng các công thức toạ độ trong không gian.',
  ],
  sections: [
    {
      heading: 'Làm quen với GeoGebra 3D',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic rồi chọn Xem → Đồ hoạ 3D (hoặc dùng ứng dụng Máy tính đồ hoạ 3D tại geogebra.org/3d). Cửa sổ Đồ hoạ 3D vẽ hệ trục $Oxyz$ với mặt phẳng nền $(Oxy)$; cửa sổ Đại số ghi các đối tượng đã tạo; ô Nhập lệnh để gõ phương trình hoặc lệnh.',
        },
        {
          type: 'list',
          items: [
            'Kéo chuột (hoặc vuốt) trên cửa sổ Đồ hoạ 3D để xoay hình, cuộn chuột để phóng to, thu nhỏ.',
            'Bấm vào chấm tròn cạnh một đối tượng trong cửa sổ Đại số để ẩn hoặc hiện nó.',
            'Nháy chuột phải vào đối tượng, chọn Thiết đặt để đổi màu, độ trong suốt, nét vẽ.',
            'Số thập phân viết bằng dấu chấm (0.5 thay cho $0{,}5$); toạ độ điểm viết bằng dấu phẩy, chẳng hạn (1, -2, 3) là điểm $(1; -2; 3)$.',
          ],
        },
      ],
    },
    {
      heading: 'Vẽ mặt phẳng, đường thẳng, mặt cầu',
      blocks: [
        {
          type: 'table',
          head: ['Đối tượng', 'Gõ vào ô Nhập lệnh'],
          rows: [
            ['Mặt phẳng $2x - y + 3z - 5 = 0$', 'p: 2x - y + 3z - 5 = 0'],
            ['Mặt phẳng qua ba điểm $A$, $B$, $C$', 'Plane(A, B, C)'],
            [
              'Mặt phẳng qua $A$, vuông góc với vectơ $\\vec{n}$',
              'PerpendicularPlane(A, Vector((2, -1, 3)))',
            ],
            ['Đường thẳng qua hai điểm $A$, $B$', 'Line(A, B)'],
            [
              'Đường thẳng qua $M(1; -2; 3)$, vectơ chỉ phương $\\vec{u} = (2; 1; -1)$',
              'd: Line((1, -2, 3), Vector((2, 1, -1))) hoặc d: X = (1, -2, 3) + t*(2, 1, -1)',
            ],
            [
              'Mặt cầu $(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9$',
              's: (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9',
            ],
            ['Mặt cầu tâm $I$, bán kính $R$', 'Sphere(I, 3)'],
          ],
          caption:
            'Một số cách tạo đối tượng trong không gian. Phần p:, d:, s: đặt tên cho đối tượng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phương trình nào cho hình nào?',
          text: 'Một phương trình bậc nhất của $x, y, z$ (có ít nhất một hệ số của $x, y, z$ khác $0$) cho một mặt phẳng. Phương trình $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ cho mặt cầu tâm $I(a; b; c)$, bán kính $R$. Một đường thẳng không có phương trình dạng $F(x, y, z) = 0$ như vậy: ta tạo nó từ một điểm và một vectơ chỉ phương, ứng với phương trình tham số $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$.',
        },
      ],
    },
    {
      heading: 'Quan sát vị trí tương đối',
      blocks: [
        {
          type: 'table',
          head: ['Lệnh', 'Kết quả'],
          rows: [
            ['Intersect(p, d)', 'Giao điểm của mặt phẳng $p$ và đường thẳng $d$'],
            ['Intersect(s, d)', 'Các giao điểm của mặt cầu $s$ và đường thẳng $d$'],
            ['IntersectPath(p, s)', 'Đường tròn giao tuyến của mặt phẳng $p$ và mặt cầu $s$'],
            ['Distance(I, p)', 'Khoảng cách từ điểm $I$ đến mặt phẳng $p$'],
            ['Angle(d, p)', 'Góc giữa đường thẳng $d$ và mặt phẳng $p$'],
          ],
          caption: 'Các lệnh tìm giao điểm, giao tuyến và đo đạc trong không gian.',
        },
        {
          type: 'p',
          text: 'Kết quả của phần mềm cần được kiểm tra bằng các công thức của Chương V:',
        },
        {
          type: 'list',
          items: [
            'Đường thẳng $d$ (qua $M$, vectơ chỉ phương $\\vec{u}$) và mặt phẳng $(P)$ (vectơ pháp tuyến $\\vec{n}$): nếu $\\vec{n} \\cdot \\vec{u} \\ne 0$ thì $d$ cắt $(P)$; nếu $\\vec{n} \\cdot \\vec{u} = 0$ thì $d$ song song với $(P)$ hoặc nằm trong $(P)$ (khi $M \\in (P)$).',
            'Mặt phẳng $(P)$ và mặt cầu $(S)$ tâm $I$, bán kính $R$: so sánh $d = d(I, (P))$ với $R$. Nếu $d < R$, $(P)$ cắt $(S)$ theo đường tròn bán kính $r = \\sqrt{R^2 - d^2}$, tâm là hình chiếu của $I$ trên $(P)$; nếu $d = R$, $(P)$ tiếp xúc với $(S)$; nếu $d > R$, chúng không có điểm chung.',
            'Đường thẳng và mặt cầu: thay phương trình tham số của đường thẳng vào phương trình mặt cầu, được phương trình bậc hai ẩn $t$; số nghiệm của nó là số điểm chung.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Kết quả của phần mềm là gần đúng',
          text: 'GeoGebra làm tròn toạ độ (mặc định đến hai chữ số thập phân). Một mặt phẳng tiếp xúc với mặt cầu có thể hiện ra như "cắt theo một đường tròn rất nhỏ" hoặc "không cắt" chỉ vì làm tròn. Vì vậy, khi cần kết luận chính xác, hãy tính bằng công thức.',
        },
      ],
    },
    {
      heading: 'Dự án: Dựng mô hình không gian bằng GeoGebra 3D',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chọn một tình huống thực tế, mô tả nó bằng mặt phẳng, đường thẳng và mặt cầu trong hệ toạ độ $Oxyz$, vẽ bằng GeoGebra 3D, rồi trả lời câu hỏi của tình huống bằng cả phần mềm và tính toán. Làm theo nhóm $3$ đến $4$ học sinh.',
        },
        {
          type: 'p',
          text: 'Gợi ý tình huống: một trạm phát sóng có vùng phủ sóng là hình cầu, mặt đất là mặt phẳng $z = 0$ (vùng phủ trên mặt đất là hình tròn nào?); một tia sáng chiếu từ đèn xuống mặt bàn nghiêng (tia sáng gặp mặt bàn ở đâu?); một quả bóng đặt trên một mái dốc (quả bóng chạm mái tại điểm nào?).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn đơn vị và đặt hệ trục $Oxyz$ phù hợp với tình huống; ghi toạ độ các điểm quan trọng.',
            'Viết phương trình các mặt phẳng, đường thẳng, mặt cầu cần dùng.',
            'Nhập chúng vào GeoGebra 3D, đặt tên, tô màu cho dễ nhìn; dùng Intersect, IntersectPath, Distance để trả lời câu hỏi.',
            'Tạo một thanh trượt (chẳng hạn bán kính phủ sóng hay độ cao của đèn) và quan sát mô hình thay đổi.',
            'Tính lại các kết quả bằng công thức của Chương V và so sánh với phần mềm.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: mô tả tình huống và hệ trục đã chọn, các phương trình, ảnh chụp mô hình từ ít nhất hai góc nhìn, bảng so sánh kết quả của phần mềm với kết quả tính tay, và nhận xét về những chỗ phần mềm chỉ cho kết quả gần đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cảnh GeoGebra 3D',
    instruction:
      'Chọn đối tượng cần nhập rồi đổi các hệ số: mặt phẳng $(P)$, đường thẳng $d$ và mặt cầu $(S)$ được vẽ ngay, cửa sổ Đại số ghi lệnh tương ứng của GeoGebra. Kéo hoặc dùng phím mũi tên để xoay cảnh. Các điểm chung được đánh dấu màu xanh lá; hãy hoàn thành ba nhiệm vụ bên dưới.',
  },
  examples: [
    {
      problem:
        'Vẽ mặt phẳng $(P): 2x + y - 2z - 4 = 0$ bằng GeoGebra 3D và tìm giao điểm của $(P)$ với ba trục toạ độ.',
      steps: [
        'Gõ p: 2x + y - 2z - 4 = 0. Mặt phẳng hiện ra trong cửa sổ Đồ hoạ 3D.',
        'Gõ Intersect(p, xAxis), Intersect(p, yAxis), Intersect(p, zAxis): GeoGebra cho ba điểm $(2; 0; 0)$, $(0; 4; 0)$, $(0; 0; -2)$.',
        'Kiểm tra: trên trục $Ox$ có $y = z = 0$, nên $2x - 4 = 0$, $x = 2$. Tương tự, trên $Oy$: $y = 4$; trên $Oz$: $-2z - 4 = 0$, $z = -2$.',
      ],
      answer: '$(P)$ cắt $Ox$, $Oy$, $Oz$ lần lượt tại $(2; 0; 0)$, $(0; 4; 0)$, $(0; 0; -2)$.',
    },
    {
      problem:
        'Vẽ đường thẳng $d$ đi qua $A(1; -2; 3)$, có vectơ chỉ phương $\\vec{u} = (2; 1; -1)$ và mặt phẳng $(Q): x + y + z - 6 = 0$. Tìm giao điểm của $d$ và $(Q)$.',
      steps: [
        'Gõ A = (1, -2, 3), rồi d: Line(A, Vector((2, 1, -1))) và q: x + y + z - 6 = 0.',
        'Gõ Intersect(q, d): GeoGebra cho điểm $(5; 0; 1)$.',
        'Kiểm tra: $\\vec{n} \\cdot \\vec{u} = 2 + 1 - 1 = 2 \\ne 0$ nên $d$ cắt $(Q)$. Điểm của $d$ là $(1 + 2t; -2 + t; 3 - t)$; thay vào $(Q)$: $(1 + 2t) + (-2 + t) + (3 - t) - 6 = 0 \\Leftrightarrow 2t - 4 = 0 \\Leftrightarrow t = 2$.',
        'Với $t = 2$, ta được điểm $(5; 0; 1)$.',
      ],
      answer: '$d$ cắt $(Q)$ tại điểm $(5; 0; 1)$.',
    },
    {
      problem:
        'Vẽ mặt cầu $(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9$ và mặt phẳng $(P): 2x - y + 2z - 1 = 0$. Quan sát vị trí tương đối của chúng rồi kiểm tra bằng tính toán.',
      steps: [
        'Gõ phương trình mặt cầu và mặt phẳng. Xoay hình: mặt phẳng dường như chỉ chạm mặt cầu tại một điểm.',
        'Gõ I = (1, -2, 3) và Distance(I, p): GeoGebra cho $3$.',
        'Kiểm tra: $d(I, (P)) = \\dfrac{|2 \\cdot 1 - (-2) + 2 \\cdot 3 - 1|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\dfrac{9}{3} = 3 = R$, nên $(P)$ tiếp xúc với $(S)$.',
        'Tiếp điểm là hình chiếu $H$ của $I$ trên $(P)$: $H = I - \\dfrac{9}{9}\\vec{n} = (1 - 2; -2 + 1; 3 - 2) = (-1; -1; 1)$. Thử lại: $-2 + 1 + 2 - 1 = 0$ và $(-2)^2 + 1^2 + (-2)^2 = 9$.',
      ],
      answer: '$(P)$ tiếp xúc với $(S)$ tại điểm $H(-1; -1; 1)$.',
    },
    {
      problem:
        'Vẽ mặt cầu $(S): x^2 + y^2 + z^2 = 25$ và mặt phẳng $(P): z = 3$. Xác định giao tuyến của chúng.',
      steps: [
        'Gõ s: x^2 + y^2 + z^2 = 25 và p: z = 3, rồi IntersectPath(p, s): GeoGebra vẽ một đường tròn nằm trong $(P)$.',
        'Tâm mặt cầu $O(0; 0; 0)$, $R = 5$; $d(O, (P)) = 3 < 5$ nên $(P)$ cắt $(S)$ theo một đường tròn.',
        'Bán kính đường tròn $r = \\sqrt{R^2 - d^2} = \\sqrt{25 - 9} = 4$; tâm là hình chiếu của $O$ trên $(P)$, tức $(0; 0; 3)$.',
      ],
      answer:
        'Giao tuyến là đường tròn tâm $(0; 0; 3)$, bán kính $4$, nằm trong mặt phẳng $z = 3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lệnh nào vẽ mặt cầu tâm $I(1; 2; 3)$, bán kính $2$ trong GeoGebra?',
      options: [
        'Sphere((1, 2, 3), 2)',
        'Sphere((1, 2, 3), 4)',
        '(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 2',
        'Circle((1, 2, 3), 2)',
      ],
      answer: 0,
      hints: ['Lệnh Sphere nhận tâm và bán kính. Trong phương trình, vế phải là $R^2$.'],
      solution:
        'Sphere((1, 2, 3), 2) là mặt cầu tâm $(1; 2; 3)$, bán kính $2$. Lệnh với số $4$ cho bán kính $4$; phương trình với vế phải $2$ cho bán kính $\\sqrt{2}$; Circle vẽ đường tròn, không phải mặt cầu.',
    },
    {
      type: 'choice',
      prompt: 'Trong cửa sổ Đồ hoạ 3D, gõ x + 2y - z = 3. GeoGebra vẽ đối tượng nào?',
      options: ['Một mặt phẳng', 'Một đường thẳng', 'Một mặt cầu', 'Một điểm'],
      answer: 0,
      hints: ['Đây là phương trình bậc nhất của $x$, $y$, $z$.'],
      solution:
        'Phương trình $x + 2y - z - 3 = 0$ có dạng $Ax + By + Cz + D = 0$ với $(A; B; C) = (1; 2; -1) \\ne \\vec{0}$, nên là phương trình một mặt phẳng.',
    },
    {
      type: 'number',
      prompt: 'Distance(I, p) với $I(1; -2; 3)$ và $p: 2x - y + 2z - 1 = 0$ cho kết quả bao nhiêu?',
      answer: 3,
      hints: ['$d(I, (P)) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$.'],
      solution: '$\\dfrac{|2 + 2 + 6 - 1|}{\\sqrt{4 + 1 + 4}} = \\dfrac{9}{3} = 3$.',
    },
    {
      type: 'number',
      prompt:
        'IntersectPath(p, s) với $p: z = 3$ và $s: x^2 + y^2 + z^2 = 25$ vẽ một đường tròn. Bán kính đường tròn đó bằng bao nhiêu?',
      answer: 4,
      hints: ['Tính $d(O, (P))$ rồi dùng $r = \\sqrt{R^2 - d^2}$.'],
      solution: '$R = 5$, $d = 3$, nên $r = \\sqrt{25 - 9} = 4$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $d: x = 1 + t$, $y = 2 - t$, $z = 3 + 2t$ cắt mặt phẳng $(P): x + y + z - 12 = 0$ tại điểm $K$. Tìm cao độ $z$ của $K$.',
      answer: 9,
      hints: [
        'Thay $x, y, z$ theo $t$ vào phương trình $(P)$.',
        '$(1 + t) + (2 - t) + (3 + 2t) - 12 = 0$.',
      ],
      solution:
        '$6 + 2t - 12 = 0 \\Leftrightarrow t = 3$, nên $K(4; -1; 9)$. Thử lại: $4 - 1 + 9 = 12$. Cao độ của $K$ là $9$.',
    },
    {
      type: 'choice',
      prompt:
        'Vẽ đường thẳng $d: x = 1 + 2t$, $y = t$, $z = -1 + t$ và mặt phẳng $(P): x - y - z = 0$. Vị trí tương đối của $d$ và $(P)$ là gì?',
      options: [
        '$d$ song song với $(P)$',
        '$d$ nằm trong $(P)$',
        '$d$ cắt $(P)$',
        '$d$ vuông góc với $(P)$',
      ],
      answer: 0,
      hints: [
        'Tính $\\vec{n} \\cdot \\vec{u}$ với $\\vec{n} = (1; -1; -1)$, $\\vec{u} = (2; 1; 1)$.',
        'Nếu tích vô hướng bằng $0$, kiểm tra điểm $M(1; 0; -1)$ có thuộc $(P)$ không.',
      ],
      solution:
        '$\\vec{n} \\cdot \\vec{u} = 2 - 1 - 1 = 0$, nên $d$ song song với $(P)$ hoặc nằm trong $(P)$. Điểm $M(1; 0; -1)$ của $d$ cho $1 - 0 - (-1) = 2 \\ne 0$, nên $M \\notin (P)$: $d$ song song với $(P)$.',
    },
    {
      type: 'number',
      prompt:
        'Với giá trị dương nào của $m$ thì mặt phẳng $x + 2y + 2z + m = 0$ tiếp xúc với mặt cầu $x^2 + y^2 + z^2 = 9$? (Dùng thanh trượt $m$ trong GeoGebra để dự đoán, rồi tính.)',
      answer: 9,
      hints: [
        'Tiếp xúc khi $d(O, (P)) = R = 3$.',
        '$d(O, (P)) = \\dfrac{|m|}{\\sqrt{1 + 4 + 4}} = \\dfrac{|m|}{3}$.',
      ],
      solution: '$\\dfrac{|m|}{3} = 3 \\Leftrightarrow |m| = 9$; với $m > 0$ ta có $m = 9$.',
    },
    {
      type: 'number',
      prompt:
        'Intersect(s, xAxis) với $s: (x - 2)^2 + (y - 1)^2 + z^2 = 4$ cho bao nhiêu giao điểm?',
      answer: 2,
      hints: ['Trên trục $Ox$, điểm có dạng $(t; 0; 0)$.', 'Giải $(t - 2)^2 + 1 = 4$.'],
      solution:
        '$(t - 2)^2 + (0 - 1)^2 + 0^2 = 4 \\Leftrightarrow (t - 2)^2 = 3 \\Leftrightarrow t = 2 \\pm \\sqrt{3}$. Có hai giao điểm $(2 - \\sqrt{3}; 0; 0)$ và $(2 + \\sqrt{3}; 0; 0)$.',
    },
  ],
  takeaways: [
    'Gõ phương trình $Ax + By + Cz + D = 0$ để vẽ mặt phẳng, $(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$ hoặc Sphere(I, R) để vẽ mặt cầu, Line(M, Vector(u)) để vẽ đường thẳng.',
    'Intersect cho giao điểm, IntersectPath cho đường tròn giao tuyến của mặt phẳng và mặt cầu, Distance cho khoảng cách.',
    'Vị trí của mặt phẳng và mặt cầu do việc so sánh $d(I, (P))$ với $R$ quyết định; vị trí của đường thẳng và mặt phẳng do $\\vec{n} \\cdot \\vec{u}$ quyết định.',
    'Kết quả của phần mềm là gần đúng: luôn kiểm tra bằng công thức trước khi kết luận.',
  ],
};
