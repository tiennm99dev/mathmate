/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép quay tâm O góc α biến M khác O thành M' với OM' = OM và góc lượng giác (OM, OM') = α; phép đối xứng tâm I là phép quay tâm I góc 180°, biểu thức toạ độ x' = 2a − x, y' = 2b − y; tâm đối xứng của một hình.",
  intro:
    'Mặt kính giữa bàn tròn trong nhà hàng quay quanh tâm của nó: mỗi đĩa thức ăn đi trên một đường tròn, khoảng cách từ đĩa tới tâm bàn không đổi, và mọi đĩa cùng quay một góc như nhau. Đó là hình ảnh của phép quay.',
  objectives: [
    'Phát biểu định nghĩa phép quay $Q_{(O,\\ \\alpha)}$ và xác định ảnh của một điểm, một hình qua phép quay.',
    'Nắm các tính chất của phép quay.',
    'Phát biểu định nghĩa phép đối xứng tâm $\\text{Đ}_I$, dùng biểu thức toạ độ của nó.',
    'Nhận biết tâm đối xứng của một hình.',
  ],
  sections: [
    {
      heading: 'Phép quay',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho điểm $O$ và góc lượng giác $\\alpha$. Phép biến hình biến điểm $O$ thành chính nó, biến mỗi điểm $M$ khác $O$ thành điểm $M'$ sao cho $OM' = OM$ và góc lượng giác $(OM,\\ OM')$ bằng $\\alpha$ được gọi là phép quay tâm $O$ góc quay $\\alpha$, kí hiệu $Q_{(O,\\ \\alpha)}$.",
        },
        {
          type: 'list',
          items: [
            'Góc $\\alpha > 0$: hình quay ngược chiều kim đồng hồ (chiều dương); góc $\\alpha < 0$: hình quay cùng chiều kim đồng hồ (chiều âm).',
            'Phép quay góc $\\alpha = k \\cdot 360^\\circ$ ($k \\in \\mathbb{Z}$) là phép đồng nhất.',
            "Phép quay góc $\\alpha = 180^\\circ + k \\cdot 360^\\circ$ biến $M$ thành $M'$ sao cho $O$ là trung điểm của $MM'$.",
          ],
        },
        {
          type: 'p',
          text: "Trong mặt phẳng $Oxy$, phép quay tâm $O$ góc $90^\\circ$ biến $M(x;\\ y)$ thành $M'(-y;\\ x)$, phép quay tâm $O$ góc $-90^\\circ$ biến $M(x;\\ y)$ thành $M'(y;\\ -x)$. Chẳng hạn $Q_{(O,\\ 90^\\circ)}$ biến $A(1;\\ 0)$ thành $A'(0;\\ 1)$.",
        },
      ],
    },
    {
      heading: 'Tính chất của phép quay',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: "Phép quay bảo toàn khoảng cách giữa hai điểm bất kì: nếu $Q_{(O,\\ \\alpha)}$ biến $M$, $N$ lần lượt thành $M'$, $N'$ thì $M'N' = MN$. Phép quay biến đường thẳng thành đường thẳng, đoạn thẳng thành đoạn thẳng bằng nó, tam giác thành tam giác bằng nó, đường tròn thành đường tròn có cùng bán kính (tâm biến thành tâm).",
        },
        {
          type: 'p',
          text: 'Vì vậy muốn tìm ảnh của một đa giác qua phép quay, ta quay từng đỉnh; muốn tìm ảnh của đường tròn $(K;\\ R)$, ta quay tâm $K$ và giữ nguyên bán kính $R$.',
        },
      ],
    },
    {
      heading: 'Phép đối xứng tâm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho điểm $I$. Phép biến hình biến điểm $I$ thành chính nó, biến mỗi điểm $M$ khác $I$ thành điểm $M'$ sao cho $I$ là trung điểm của đoạn thẳng $MM'$ được gọi là phép đối xứng tâm $I$, kí hiệu $\\text{Đ}_I$. Điểm $I$ gọi là tâm đối xứng.",
        },
        {
          type: 'tex',
          tex: "\\text{Đ}_I(M) = M' \\Leftrightarrow \\overrightarrow{IM'} = -\\overrightarrow{IM}, \\qquad \\text{Đ}_I = Q_{(I,\\ 180^\\circ)}",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức toạ độ',
          text: "Trong mặt phẳng $Oxy$, cho $I(a;\\ b)$. Phép đối xứng tâm $I$ biến $M(x;\\ y)$ thành $M'(x';\\ y')$ với $$x' = 2a - x, \\qquad y' = 2b - y.$$ Riêng phép đối xứng qua gốc toạ độ: $x' = -x$, $y' = -y$.",
        },
        {
          type: 'p',
          text: 'Là một phép quay, phép đối xứng tâm có mọi tính chất của phép quay. Ngoài ra, nó biến mỗi đường thẳng thành một đường thẳng song song hoặc trùng với nó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tâm đối xứng của một hình',
          text: 'Điểm $I$ được gọi là tâm đối xứng của hình $\\mathcal{H}$ nếu phép đối xứng tâm $\\text{Đ}_I$ biến $\\mathcal{H}$ thành chính nó. Khi đó ta nói $\\mathcal{H}$ là hình có tâm đối xứng. Hình bình hành (giao điểm hai đường chéo), đường tròn (tâm của nó), lục giác đều có tâm đối xứng; tam giác thì không.',
        },
      ],
    },
    {
      heading: 'Dự án: Chong chóng và hoa văn xoay',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế một hoa văn (logo, chong chóng, bông hoa) biến thành chính nó qua một phép quay, và xác định tất cả các góc quay như vậy.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: compa, thước đo góc, giấy bìa, kéo, một chiếc ghim để làm trục quay.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ một đường tròn tâm $O$ và chia nó thành $n$ phần bằng nhau ($n = 3, 4, 5$ hoặc $6$) bằng thước đo góc, mỗi phần $\\dfrac{360^\\circ}{n}$.',
            'Vẽ một "cánh" trong một phần, rồi lặp lại cánh đó bằng phép quay tâm $O$ góc $\\dfrac{360^\\circ}{n}$ cho đến khi kín vòng.',
            'Cắt hình ra, ghim qua $O$ vào tấm bìa và quay thử để tìm mọi góc quay trong khoảng $(0^\\circ;\\ 360^\\circ)$ làm hình trùng khít với vị trí cũ.',
            'Kiểm tra xem hình có tâm đối xứng không (tức là quay $180^\\circ$ có trùng khít không) và giải thích theo $n$.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: hình đã thiết kế, danh sách các góc quay tìm được, và nhận xét: với $n$ nào thì hình có tâm đối xứng?',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay hình quanh tâm',
    instruction:
      "Kéo thanh trượt để đổi góc quay $\\alpha$ và kéo tâm $O$ (hoặc dùng phím mũi tên). Quan sát các cung tròn: $OA' = OA$ và tam giác $A'B'C'$ luôn bằng tam giác $ABC$. Đặt $\\alpha = 180^\\circ$ để được phép đối xứng tâm.",
  },
  examples: [
    {
      problem:
        'Trong mặt phẳng $Oxy$, tìm ảnh của điểm $A(2;\\ 3)$ qua phép quay $Q_{(O,\\ -90^\\circ)}$ và qua phép đối xứng tâm $I(1;\\ -2)$.',
      steps: [
        "$Q_{(O,\\ -90^\\circ)}$ biến $M(x;\\ y)$ thành $M'(y;\\ -x)$, nên $A' = (3;\\ -2)$. Kiểm tra: $OA' = OA = \\sqrt{13}$ và $\\overrightarrow{OA} \\cdot \\overrightarrow{OA'} = 6 - 6 = 0$.",
        "$\\text{Đ}_I$: $x' = 2 \\cdot 1 - 2 = 0$, $y' = 2 \\cdot (-2) - 3 = -7$, nên $A'' = (0;\\ -7)$.",
      ],
      answer: '$Q_{(O,\\ -90^\\circ)}(A) = (3;\\ -2)$ và $\\text{Đ}_I(A) = (0;\\ -7)$.',
    },
    {
      problem:
        "Cho đường thẳng $d: x + y - 3 = 0$ và điểm $I(2;\\ -1)$. Viết phương trình đường thẳng $d'$ là ảnh của $d$ qua $\\text{Đ}_I$.",
      steps: [
        "Phép đối xứng tâm biến $d$ thành đường thẳng song song hoặc trùng với $d$, nên $d': x + y + c = 0$.",
        "Lấy $M(3;\\ 0)$ thuộc $d$. Ảnh: $M' = (2 \\cdot 2 - 3;\\ 2 \\cdot (-1) - 0) = (1;\\ -2)$.",
        "$M'$ thuộc $d'$: $1 - 2 + c = 0$, nên $c = 1$.",
      ],
      answer: "$d': x + y + 1 = 0$.",
    },
    {
      problem:
        'Cho lục giác đều $ABCDEF$ tâm $O$ (các đỉnh theo chiều dương). Tìm ảnh của tam giác $ACE$ qua phép quay tâm $O$ góc $120^\\circ$.',
      steps: [
        'Các tam giác $OAB$, $OBC$, ... là tam giác đều nên mỗi góc $(OA,\\ OB)$, $(OB,\\ OC)$, ... bằng $60^\\circ$.',
        'Phép quay $Q_{(O,\\ 120^\\circ)}$ biến $A \\mapsto C$, $C \\mapsto E$, $E \\mapsto A$.',
      ],
      answer: 'Ảnh của tam giác $ACE$ là tam giác $CEA$, tức là chính tam giác $ACE$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(3;\\ 1)$ qua phép quay $Q_{(O,\\ 90^\\circ)}$ là',
      options: ["$M'(-1;\\ 3)$", "$M'(1;\\ -3)$", "$M'(-3;\\ -1)$", "$M'(1;\\ 3)$"],
      answer: 0,
      hints: ['$Q_{(O,\\ 90^\\circ)}$ biến $(x;\\ y)$ thành $(-y;\\ x)$.'],
      solution:
        "$M'(-1;\\ 3)$. Kiểm tra: $OM' = OM = \\sqrt{10}$ và $3 \\cdot (-1) + 1 \\cdot 3 = 0$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(4;\\ 3)$ qua phép đối xứng tâm $I(1;\\ -2)$ là',
      options: ["$M'(-2;\\ -7)$", "$M'(-4;\\ -3)$", "$M'(2{,}5;\\ 0{,}5)$", "$M'(2;\\ 7)$"],
      answer: 0,
      hints: ["$x' = 2a - x$, $y' = 2b - y$ với $I(a;\\ b)$."],
      solution: "$x' = 2 - 4 = -2$, $y' = -4 - 3 = -7$, nên $M'(-2;\\ -7)$.",
    },
    {
      type: 'choice',
      prompt:
        'Cho đường tròn $(C): (x - 2)^2 + y^2 = 1$. Ảnh của $(C)$ qua phép quay $Q_{(O,\\ 90^\\circ)}$ là',
      options: [
        '$x^2 + (y - 2)^2 = 1$',
        '$(x + 2)^2 + y^2 = 1$',
        '$x^2 + (y + 2)^2 = 1$',
        '$(x - 2)^2 + y^2 = 1$',
      ],
      answer: 0,
      hints: ['Quay tâm $K(2;\\ 0)$, giữ nguyên bán kính.'],
      solution: "$K(2;\\ 0)$ biến thành $K'(0;\\ 2)$, bán kính $1$: ảnh là $x^2 + (y - 2)^2 = 1$.",
    },
    {
      type: 'number',
      prompt:
        'Cho tam giác đều $ABC$ tâm $O$. Tìm góc dương $\\alpha$ nhỏ nhất (theo độ) sao cho phép quay $Q_{(O,\\ \\alpha)}$ biến tam giác $ABC$ thành chính nó.',
      answer: 120,
      unit: '°',
      hints: ['Ba đỉnh chia đường tròn ngoại tiếp thành ba cung bằng nhau.'],
      solution:
        'Các góc $(OA,\\ OB)$, $(OB,\\ OC)$, $(OC,\\ OA)$ đều bằng $120^\\circ$ (theo chiều dương thích hợp), nên góc dương nhỏ nhất là $120^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Sau $15$ phút, kim phút của đồng hồ quay một góc lượng giác bao nhiêu độ (tính cả dấu)?',
      answer: -90,
      unit: '°',
      hints: ['Mỗi phút kim phút quay $6^\\circ$.', 'Kim đồng hồ quay theo chiều âm.'],
      solution:
        '$15$ phút kim phút quay $15 \\cdot 6^\\circ = 90^\\circ$ theo chiều kim đồng hồ, tức là chiều âm. Góc quay là $-90^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$. Ảnh của đường thẳng $AB$ qua phép đối xứng tâm $O$ là',
      options: [
        'đường thẳng $CD$',
        'đường thẳng $AD$',
        'đường thẳng $BC$',
        'chính đường thẳng $AB$',
      ],
      answer: 0,
      hints: ['$O$ là trung điểm của $AC$ và của $BD$.'],
      solution:
        '$\\text{Đ}_O(A) = C$ và $\\text{Đ}_O(B) = D$, nên ảnh của đường thẳng $AB$ là đường thẳng $CD$ (song song với $AB$).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình có tâm đối xứng.',
      options: ['Hình bình hành', 'Đường tròn', 'Lục giác đều', 'Tam giác đều', 'Hình thang cân'],
      answers: [0, 1, 2],
      hints: ['Thử quay mỗi hình $180^\\circ$ quanh một điểm thích hợp.'],
      solution:
        'Hình bình hành có tâm đối xứng là giao điểm hai đường chéo, đường tròn là tâm của nó, lục giác đều là tâm của nó. Tam giác đều quay $180^\\circ$ thì đỉnh hướng ngược lại, hình thang cân có hai đáy khác nhau, nên hai hình này không có tâm đối xứng.',
    },
    {
      type: 'choice',
      prompt: 'Phép quay $Q_{(O,\\ 180^\\circ)}$ trùng với phép biến hình nào?',
      options: [
        'Phép đối xứng tâm $O$',
        'Phép đồng nhất',
        'Phép đối xứng trục $Ox$',
        'Phép quay $Q_{(O,\\ 90^\\circ)}$',
      ],
      answer: 0,
      hints: ["Quay $M$ một nửa vòng quanh $O$: $O$ nằm ở đâu trên đoạn $MM'$?"],
      solution:
        "Với $\\alpha = 180^\\circ$, $OM' = OM$ và $M'$ nằm trên tia đối của tia $OM$, nên $O$ là trung điểm của $MM'$: đó là phép đối xứng tâm $O$.",
    },
  ],
  takeaways: [
    "$Q_{(O,\\ \\alpha)}$: $OM' = OM$ và $(OM,\\ OM') = \\alpha$; $\\alpha > 0$ là chiều ngược kim đồng hồ.",
    'Phép quay bảo toàn khoảng cách; đường tròn biến thành đường tròn cùng bán kính.',
    "$\\text{Đ}_I = Q_{(I,\\ 180^\\circ)}$: $I$ là trung điểm của $MM'$; với $I(a;\\ b)$, $x' = 2a - x$, $y' = 2b - y$.",
    '$I$ là tâm đối xứng của $\\mathcal{H}$ khi $\\text{Đ}_I(\\mathcal{H}) = \\mathcal{H}$.',
  ],
};
