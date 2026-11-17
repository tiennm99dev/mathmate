/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép vị tự tâm O tỉ số k (k ≠ 0) biến M thành M' với vectơ OM' bằng k lần vectơ OM; nó biến đoạn thẳng thành đoạn thẳng dài gấp |k| lần, đường thẳng thành đường thẳng song song hoặc trùng, góc thành góc bằng nó, đường tròn bán kính R thành đường tròn bán kính |k|R.",
  intro:
    'Một bức tranh nhỏ được phóng to thành một bức tranh lớn có cùng hình dạng: các cạnh tương ứng song song, và mọi đường nối hai điểm tương ứng đều đi qua một điểm chung. Phép biến hình mô tả việc "phóng to, thu nhỏ từ một điểm" như vậy là phép vị tự.',
  objectives: [
    'Phát biểu định nghĩa phép vị tự $V_{(O,\\ k)}$ và xác định ảnh của một điểm, một hình qua phép vị tự.',
    'Dùng biểu thức toạ độ của phép vị tự.',
    "Nắm và vận dụng các tính chất của phép vị tự: $\\overrightarrow{M'N'} = k\\overrightarrow{MN}$, $M'N' = |k|MN$.",
    'Tìm ảnh của đường thẳng, đường tròn qua phép vị tự.',
  ],
  sections: [
    {
      heading: 'Phép vị tự',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho điểm $O$ và số thực $k \\ne 0$. Phép biến hình biến mỗi điểm $M$ thành điểm $M'$ sao cho $\\overrightarrow{OM'} = k\\overrightarrow{OM}$ được gọi là phép vị tự tâm $O$ tỉ số $k$, kí hiệu $V_{(O,\\ k)}$. Điểm $O$ gọi là tâm vị tự, $k$ gọi là tỉ số vị tự.",
        },
        {
          type: 'list',
          items: [
            'Phép vị tự $V_{(O,\\ k)}$ biến tâm $O$ thành chính nó.',
            "$O$, $M$, $M'$ luôn thẳng hàng. Khi $k > 0$, $M'$ nằm trên tia $OM$; khi $k < 0$, $M'$ nằm trên tia đối của tia $OM$.",
            'Phép vị tự $V_{(O,\\ 1)}$ là phép đồng nhất; phép vị tự $V_{(O,\\ -1)}$ là phép đối xứng tâm $O$.',
            "Nếu $V_{(O,\\ k)}$ biến $M$ thành $M'$ thì $V_{\\left(O,\\ \\frac{1}{k}\\right)}$ biến $M'$ thành $M$.",
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biểu thức toạ độ',
          text: "Trong mặt phẳng $Oxy$, phép vị tự tâm $I(a;\\ b)$ tỉ số $k$ biến $M(x;\\ y)$ thành $M'(x';\\ y')$ với $x' = a + k(x - a)$, $y' = b + k(y - b)$. Riêng với tâm là gốc toạ độ $O$: $x' = kx$, $y' = ky$.",
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 1',
          text: "Nếu phép vị tự tỉ số $k$ biến hai điểm $M$, $N$ lần lượt thành $M'$, $N'$ thì $\\overrightarrow{M'N'} = k\\overrightarrow{MN}$ và $M'N' = |k| \\cdot MN$.",
        },
        {
          type: 'p',
          text: "Thật vậy, $\\overrightarrow{M'N'} = \\overrightarrow{ON'} - \\overrightarrow{OM'} = k\\overrightarrow{ON} - k\\overrightarrow{OM} = k\\overrightarrow{MN}$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 2',
          text: 'Phép vị tự tỉ số $k$ biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự giữa chúng; biến đường thẳng thành đường thẳng song song hoặc trùng với nó; biến tia thành tia; biến đoạn thẳng thành đoạn thẳng có độ dài gấp $|k|$ lần; biến tam giác thành tam giác đồng dạng với nó theo tỉ số $|k|$; biến góc thành góc bằng nó; biến đường tròn bán kính $R$ thành đường tròn bán kính $|k|R$ (tâm biến thành tâm).',
        },
        {
          type: 'p',
          text: 'Vì phép vị tự nhân mọi độ dài với $|k|$, diện tích của một đa giác được nhân với $k^2$. Phép vị tự với $|k| \\ne 1$ không phải là phép dời hình.',
        },
      ],
    },
    {
      heading: 'Dự án: Thước vẽ truyền',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: làm một thước vẽ truyền (pantograph), dụng cụ phóng to hình vẽ theo một tỉ số cho trước, và giải thích vì sao nó là một phép vị tự.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bốn thanh bìa cứng hoặc thanh gỗ mỏng, đinh ghim hoặc ốc vít nhỏ làm khớp, một đinh cố định, một bút chì, giấy vẽ, thước đo.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ghép bốn thanh thành một hình bình hành có khớp xoay, hai thanh kéo dài ra ngoài hình bình hành theo sơ đồ thước vẽ truyền mà nhóm tìm hiểu; đóng một đầu cố định $O$ xuống bàn.',
            "Đặt mũi dò tại điểm $M$ và bút chì tại điểm $M'$ sao cho $O$, $M$, $M'$ thẳng hàng và $OM' = 2OM$.",
            'Cho mũi dò đi theo một hình vẽ nhỏ, bút chì sẽ vẽ ra hình lớn. Đo vài cặp đoạn thẳng tương ứng và tính tỉ số.',
            'Đổi vị trí các khớp để được tỉ số khác (chẳng hạn $3$) và lặp lại.',
          ],
        },
        {
          type: 'p',
          text: "Báo cáo: hình gốc và hình phóng to, bảng các tỉ số đo được, giải thích bằng tính chất của hình bình hành vì sao luôn có $\\overrightarrow{OM'} = k\\overrightarrow{OM}$, tức là thước vẽ truyền thực hiện phép vị tự $V_{(O,\\ k)}$.",
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng to, thu nhỏ qua tâm vị tự',
    instruction:
      "Kéo thanh trượt để đổi tỉ số $k$, kể cả $k$ âm, và kéo tâm vị tự $I$ (hoặc dùng phím mũi tên). Quan sát: $I$, $A$, $A'$ luôn thẳng hàng, các cạnh tương ứng song song, độ dài nhân với $|k|$.",
  },
  examples: [
    {
      problem:
        'Trong mặt phẳng $Oxy$, cho điểm $A(1;\\ -3)$ và đường thẳng $d: x + 2y - 3 = 0$. Tìm ảnh của $A$ và của $d$ qua phép vị tự $V_{(O,\\ -2)}$.',
      steps: [
        "Biểu thức toạ độ: $x' = -2x$, $y' = -2y$. Ảnh của $A$ là $A'(-2;\\ 6)$.",
        "Từ $x = -\\dfrac{x'}{2}$, $y = -\\dfrac{y'}{2}$, thay vào phương trình của $d$: $-\\dfrac{x'}{2} - y' - 3 = 0$, tức là $x' + 2y' + 6 = 0$.",
        "Kiểm tra: $M(3;\\ 0) \\in d$ có ảnh $M'(-6;\\ 0)$, và $-6 + 2 \\cdot 0 + 6 = 0$. Ảnh $d'$ song song với $d$, đúng với tính chất.",
      ],
      answer: "$A'(-2;\\ 6)$ và $d': x + 2y + 6 = 0$.",
    },
    {
      problem:
        'Tìm ảnh của đường tròn $(C): (x - 1)^2 + (y - 2)^2 = 25$ qua phép vị tự $V_{(O,\\ -2)}$.',
      steps: [
        '$(C)$ có tâm $K(1;\\ 2)$ và bán kính $R = 5$.',
        "Phép vị tự biến tâm thành tâm: $K'(-2;\\ -4)$.",
        "Bán kính mới $R' = |k| R = 2 \\cdot 5 = 10$.",
      ],
      answer: "$(C'): (x + 2)^2 + (y + 4)^2 = 100$.",
    },
    {
      problem:
        'Cho hình thang $ABCD$ có hai đáy $AB$, $CD$ với $CD = 2AB$. Gọi $O$ là giao điểm của hai cạnh bên $AD$, $BC$ và $I$ là giao điểm của hai đường chéo. Tìm phép vị tự biến $A$, $B$ lần lượt thành $D$, $C$ và phép vị tự biến $A$, $B$ lần lượt thành $C$, $D$.',
      steps: [
        'Vì $AB \\parallel CD$, theo định lí Thalès: $\\dfrac{OA}{OD} = \\dfrac{OB}{OC} = \\dfrac{AB}{DC} = \\dfrac{1}{2}$, và $A$, $D$ cùng phía với $O$.',
        'Do đó $\\overrightarrow{OD} = 2\\overrightarrow{OA}$, $\\overrightarrow{OC} = 2\\overrightarrow{OB}$: phép vị tự $V_{(O,\\ 2)}$ biến $A$, $B$ thành $D$, $C$.',
        'Tương tự $\\dfrac{IA}{IC} = \\dfrac{IB}{ID} = \\dfrac{1}{2}$ nhưng $I$ nằm giữa $A$ và $C$, nên $\\overrightarrow{IC} = -2\\overrightarrow{IA}$, $\\overrightarrow{ID} = -2\\overrightarrow{IB}$.',
      ],
      answer: '$V_{(O,\\ 2)}$ biến $A, B$ thành $D, C$; $V_{(I,\\ -2)}$ biến $A, B$ thành $C, D$.',
    },
    {
      problem: 'Tìm ảnh của điểm $M(2;\\ -1)$ qua phép vị tự tâm $I(1;\\ 2)$ tỉ số $k = 3$.',
      steps: [
        "$x' = 1 + 3(2 - 1) = 4$.",
        "$y' = 2 + 3(-1 - 2) = -7$.",
        "Kiểm tra: $\\overrightarrow{IM} = (1;\\ -3)$, $\\overrightarrow{IM'} = (3;\\ -9) = 3\\overrightarrow{IM}$.",
      ],
      answer: "$M'(4;\\ -7)$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(-1;\\ 2)$ qua phép vị tự $V_{(O,\\ 3)}$ là',
      options: ["$M'(-3;\\ 6)$", "$M'(3;\\ -6)$", "$M'(2;\\ 5)$", "$M'(-3;\\ 2)$"],
      answer: 0,
      hints: ["Tâm là gốc toạ độ: $x' = kx$, $y' = ky$."],
      solution: "$M'(3 \\cdot (-1);\\ 3 \\cdot 2) = (-3;\\ 6)$.",
    },
    {
      type: 'number',
      prompt:
        "Phép vị tự tâm $O$ tỉ số $k$ biến điểm $A(2;\\ 1)$ thành điểm $A'(-4;\\ -2)$. Tìm $k$.",
      answer: -2,
      hints: ["So sánh $\\overrightarrow{OA'}$ với $\\overrightarrow{OA}$.", 'Chú ý dấu của $k$.'],
      solution:
        "$\\overrightarrow{OA'} = (-4;\\ -2) = -2 \\cdot (2;\\ 1) = -2\\overrightarrow{OA}$, nên $k = -2$.",
    },
    {
      type: 'number',
      prompt:
        "Đoạn thẳng $AB$ dài $6$ cm. Phép vị tự $V_{(O,\\ -3)}$ biến nó thành đoạn thẳng $A'B'$. Tính $A'B'$.",
      answer: 18,
      unit: 'cm',
      hints: ["$A'B' = |k| \\cdot AB$."],
      solution: "$A'B' = |-3| \\cdot 6 = 18$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Đường tròn $(C)$ có bán kính $4$. Tính bán kính của ảnh của $(C)$ qua phép vị tự tâm $I$ tỉ số $-\\dfrac{1}{2}$.',
      answer: 2,
      hints: ['Bán kính được nhân với $|k|$, không phải với $k$.'],
      solution: "$R' = \\left|-\\dfrac{1}{2}\\right| \\cdot 4 = 2$.",
    },
    {
      type: 'number',
      prompt:
        "Tam giác $ABC$ có diện tích $5$. Phép vị tự $V_{(O,\\ -2)}$ biến nó thành tam giác $A'B'C'$. Tính diện tích tam giác $A'B'C'$.",
      answer: 20,
      hints: [
        'Mỗi cạnh dài gấp $|k| = 2$ lần, mỗi đường cao cũng vậy.',
        'Diện tích được nhân với $k^2$.',
      ],
      solution: "$S' = k^2 S = 4 \\cdot 5 = 20$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của đường thẳng $d: 2x - y + 4 = 0$ qua phép vị tự $V_{(O,\\ 3)}$ là',
      options: ['$2x - y + 12 = 0$', '$2x - y - 12 = 0$', '$6x - 3y + 4 = 0$', '$x + 2y + 12 = 0$'],
      answer: 0,
      hints: [
        'Ảnh song song hoặc trùng với $d$, nên có dạng $2x - y + c = 0$.',
        'Lấy một điểm của $d$, chẳng hạn $(0;\\ 4)$, và tìm ảnh của nó.',
      ],
      solution:
        "$M(0;\\ 4) \\in d$ có ảnh $M'(0;\\ 12)$. Ảnh $d'$ có dạng $2x - y + c = 0$ và đi qua $M'$: $-12 + c = 0$, $c = 12$. Vậy $d': 2x - y + 12 = 0$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(3;\\ 0)$ qua phép vị tự tâm $I(1;\\ 1)$ tỉ số $2$ là',
      options: ["$M'(5;\\ -1)$", "$M'(6;\\ 0)$", "$M'(4;\\ -2)$", "$M'(5;\\ 1)$"],
      answer: 0,
      hints: ["$x' = a + k(x - a)$, $y' = b + k(y - b)$ với $I(a;\\ b)$."],
      solution:
        "$x' = 1 + 2(3 - 1) = 5$, $y' = 1 + 2(0 - 1) = -1$. Phương án $(6;\\ 0)$ là ảnh qua $V_{(O,\\ 2)}$, không phải tâm $I$.",
    },
    {
      type: 'fraction',
      prompt:
        "Cho ngũ giác $ABCDE$ và điểm $I$. Gọi $A'$, $B'$, $C'$, $D'$, $E'$ lần lượt là trung điểm của $IA$, $IB$, $IC$, $ID$, $IE$. Phép vị tự tâm $I$ tỉ số $k$ biến ngũ giác $ABCDE$ thành ngũ giác $A'B'C'D'E'$. Tìm $k$.",
      answer: [1, 2],
      hints: [
        "$A'$ là trung điểm của $IA$, nên $\\overrightarrow{IA'}$ bằng mấy lần $\\overrightarrow{IA}$?",
      ],
      solution:
        "$\\overrightarrow{IA'} = \\dfrac{1}{2}\\overrightarrow{IA}$, tương tự với các đỉnh khác, nên $k = \\dfrac{1}{2}$.",
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: [
        'Phép vị tự tỉ số $k$ biến tam giác thành tam giác bằng nó.',
        'Phép vị tự biến góc thành góc bằng nó.',
        'Phép vị tự $V_{(O,\\ -1)}$ là phép đối xứng tâm $O$.',
        'Phép vị tự biến đường thẳng thành đường thẳng song song hoặc trùng với nó.',
      ],
      answer: 0,
      hints: ['Độ dài các cạnh của tam giác thay đổi thế nào?'],
      solution:
        'Phép vị tự tỉ số $k$ biến tam giác thành tam giác đồng dạng với nó theo tỉ số $|k|$; hai tam giác chỉ bằng nhau khi $|k| = 1$. Ba khẳng định còn lại đều đúng.',
    },
  ],
  takeaways: [
    "$V_{(O,\\ k)}$: $\\overrightarrow{OM'} = k\\overrightarrow{OM}$ ($k \\ne 0$); toạ độ với tâm $I(a;\\ b)$: $x' = a + k(x - a)$, $y' = b + k(y - b)$.",
    '$k > 0$: ảnh cùng phía với tâm; $k < 0$: ảnh ở phía bên kia tâm; $k = -1$ là phép đối xứng tâm.',
    "$\\overrightarrow{M'N'} = k\\overrightarrow{MN}$, $M'N' = |k| MN$; diện tích nhân với $k^2$.",
    'Đường thẳng biến thành đường thẳng song song hoặc trùng; đường tròn bán kính $R$ biến thành đường tròn bán kính $|k|R$.',
  ],
};
