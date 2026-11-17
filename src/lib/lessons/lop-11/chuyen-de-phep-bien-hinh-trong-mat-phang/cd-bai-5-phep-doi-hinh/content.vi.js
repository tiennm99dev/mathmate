/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép dời hình là phép biến hình bảo toàn khoảng cách giữa hai điểm bất kì; nó biến đường thẳng, đoạn thẳng, tam giác, góc, đường tròn thành hình bằng nó; hai hình bằng nhau khi có một phép dời hình biến hình này thành hình kia.',
  intro:
    'Nhìn ba con cá trên một bức tranh hoa văn, ta "cảm thấy" chúng bằng nhau dù một con bị lật, một con bị xoay. Làm thế nào để nói chính xác điều đó? Câu trả lời: tìm một chuỗi phép tịnh tiến, đối xứng trục, quay đưa con cá này chồng khít lên con cá kia.',
  objectives: [
    'Phát biểu định nghĩa phép dời hình và nhận biết các phép dời hình đã học.',
    'Biết rằng thực hiện liên tiếp các phép dời hình được một phép dời hình.',
    'Nắm các tính chất của phép dời hình.',
    'Hiểu khái niệm hai hình bằng nhau và chỉ ra phép dời hình biến hình này thành hình kia.',
  ],
  sections: [
    {
      heading: 'Phép dời hình',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Phép dời hình là phép biến hình bảo toàn khoảng cách giữa hai điểm bất kì: nếu $F$ biến $M$, $N$ lần lượt thành $M'$, $N'$ thì $M'N' = MN$.",
        },
        {
          type: 'list',
          items: [
            'Phép đồng nhất, phép tịnh tiến, phép đối xứng trục, phép quay và phép đối xứng tâm đều là phép dời hình.',
            "Thực hiện liên tiếp hai phép dời hình thì được một phép dời hình. Chẳng hạn thực hiện liên tiếp phép đối xứng trục $Oy$ và phép tịnh tiến theo $\\vec u = (0;\\ 1)$ được phép dời hình $M(x;\\ y) \\mapsto M'(-x;\\ y + 1)$.",
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra một phép dời hình bằng toạ độ',
          text: "Lấy hai điểm bất kì $M(x_1;\\ y_1)$, $N(x_2;\\ y_2)$, tính $M'N'^2$ theo $x_1, y_1, x_2, y_2$ và so sánh với $MN^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$. Để chứng tỏ một phép biến hình không là phép dời hình, chỉ cần một cặp điểm có $M'N' \\ne MN$.",
        },
      ],
    },
    {
      heading: 'Tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Phép dời hình biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự giữa chúng; biến đường thẳng thành đường thẳng, tia thành tia, đoạn thẳng thành đoạn thẳng bằng nó; biến tam giác thành tam giác bằng nó, góc thành góc bằng nó; biến đường tròn thành đường tròn có cùng bán kính.',
        },
        {
          type: 'p',
          text: "Chẳng hạn nếu $B$ nằm giữa $A$ và $C$ thì $AB + BC = AC$; vì khoảng cách được bảo toàn nên $A'B' + B'C' = A'C'$, tức là $B'$ nằm giữa $A'$ và $C'$.",
        },
        {
          type: 'p',
          text: 'Hệ quả: phép dời hình biến một đa giác thành một đa giác có các cạnh và các góc tương ứng bằng nhau, nên chu vi và diện tích được giữ nguyên.',
        },
      ],
    },
    {
      heading: 'Hai hình bằng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai hình được gọi là bằng nhau nếu có một phép dời hình biến hình này thành hình kia.',
        },
        {
          type: 'p',
          text: 'Định nghĩa này mở rộng khái niệm hai tam giác bằng nhau đã học: hai tam giác có ba cạnh tương ứng bằng nhau thì luôn có một phép dời hình biến tam giác này thành tam giác kia, và ngược lại.',
        },
        {
          type: 'p',
          text: 'Để chứng tỏ hai hình bằng nhau, ta thường chỉ ra một chuỗi các phép dời hình quen thuộc (tịnh tiến, đối xứng trục, quay) biến hình thứ nhất thành hình thứ hai.',
        },
      ],
    },
    {
      heading: 'Dự án: Kị binh của Escher',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu bức tranh "Kị binh" của M. C. Escher (các kị binh bằng nhau lát kín mặt phẳng) và tự thiết kế một mẫu lát kín mặt phẳng bằng các hình bằng nhau.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: ảnh bức tranh "Kị binh" (hoặc một tranh lát kín khác của Escher), giấy kẻ ô vuông, giấy can, kéo, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Can hình một kị binh, đặt tờ can lên một kị binh khác và tìm phép dời hình (tịnh tiến, đối xứng trục, quay hay một chuỗi các phép đó) đưa hình này chồng khít lên hình kia.',
            'Bắt đầu từ một hình vuông trên giấy kẻ ô: cắt một mảnh ở cạnh trái và dán nó sang cạnh phải (phép tịnh tiến), cắt một mảnh ở cạnh dưới và dán lên cạnh trên.',
            'Dùng hình mới làm khuôn, vẽ lặp lại để lát kín tờ giấy; tô màu xen kẽ.',
            'Chọn hai viên bất kì trong mẫu và chỉ ra phép dời hình biến viên này thành viên kia.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: mẫu lát hoàn chỉnh, các phép dời hình đã tìm được trong tranh của Escher và trong mẫu của nhóm, giải thích vì sao các viên là những hình bằng nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép các phép biến hình',
    instruction:
      "Bấm các nút để thực hiện liên tiếp các phép đối xứng trục, quay, đối xứng tâm và tịnh tiến (chọn $a$, $b$ cho $\\vec u = (a;\\ b)$). Mục tiêu: đưa tam giác $ABC$ chồng khít lên tam giác đích $A'B'C'$. Để ý độ dài các cạnh không bao giờ thay đổi.",
  },
  examples: [
    {
      problem:
        "Trong mặt phẳng $Oxy$, cho phép biến hình $f$ biến mỗi điểm $M(x;\\ y)$ thành $M'(-x;\\ y + 1)$. Chứng minh $f$ là một phép dời hình và tìm ảnh của $A(1;\\ 2)$.",
      steps: [
        "Với $M(x_1;\\ y_1)$, $N(x_2;\\ y_2)$: $M'(-x_1;\\ y_1 + 1)$, $N'(-x_2;\\ y_2 + 1)$.",
        "$M'N'^2 = (-x_2 + x_1)^2 + (y_2 - y_1)^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 = MN^2$, nên $M'N' = MN$: $f$ là phép dời hình.",
        'Có thể thấy $f$ là thực hiện liên tiếp $\\text{Đ}_{Oy}$ rồi $T_{\\vec u}$ với $\\vec u = (0;\\ 1)$.',
        '$f(A) = (-1;\\ 3)$.',
      ],
      answer: '$f$ là phép dời hình và $f(A) = (-1;\\ 3)$.',
    },
    {
      problem:
        "Phép biến hình $g$ biến mỗi điểm $M(x;\\ y)$ thành $M'(x + y;\\ y)$ có phải là phép dời hình không?",
      steps: [
        'Lấy $A(0;\\ 0)$ và $B(0;\\ 1)$, có $AB = 1$.',
        "$g(A) = (0;\\ 0)$, $g(B) = (1;\\ 1)$, nên $A'B' = \\sqrt{2} \\ne AB$.",
      ],
      answer: '$g$ không phải là phép dời hình.',
    },
    {
      problem:
        'Tìm ảnh của đường tròn $(C): (x - 1)^2 + (y - 2)^2 = 4$ qua phép dời hình có được bằng cách thực hiện liên tiếp $Q_{(O,\\ 90^\\circ)}$ và phép tịnh tiến theo $\\vec u = (3;\\ 0)$.',
      steps: [
        '$(C)$ có tâm $K(1;\\ 2)$, bán kính $2$.',
        "$Q_{(O,\\ 90^\\circ)}$ biến $K$ thành $K_1(-2;\\ 1)$; $T_{\\vec u}$ biến $K_1$ thành $K'(1;\\ 1)$.",
        'Phép dời hình biến đường tròn thành đường tròn cùng bán kính.',
      ],
      answer: "$(C'): (x - 1)^2 + (y - 1)^2 = 4$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Phép biến hình $f$ biến mỗi điểm $M(x;\\ y)$ thành $M'(-x;\\ y + 1)$. Ảnh của $A(2;\\ 3)$ là",
      options: ["$A'(-2;\\ 4)$", "$A'(2;\\ 4)$", "$A'(-2;\\ 2)$", "$A'(-3;\\ 3)$"],
      answer: 0,
      hints: ['Đổi dấu hoành độ, cộng $1$ vào tung độ.'],
      solution: "$A'(-2;\\ 3 + 1) = (-2;\\ 4)$.",
    },
    {
      type: 'choice',
      prompt: 'Phép biến hình nào sau đây không phải là phép dời hình?',
      options: [
        "$M(x;\\ y) \\mapsto M'(2x;\\ y)$",
        "$M(x;\\ y) \\mapsto M'(y;\\ x)$",
        "$M(x;\\ y) \\mapsto M'(x - 3;\\ y + 5)$",
        "$M(x;\\ y) \\mapsto M'(-x;\\ -y)$",
      ],
      answer: 0,
      hints: ['Thử với $A(0;\\ 0)$ và $B(1;\\ 0)$.'],
      solution:
        "Với $M'(2x;\\ y)$: $A(0;\\ 0) \\mapsto (0;\\ 0)$, $B(1;\\ 0) \\mapsto (2;\\ 0)$, nên $A'B' = 2 \\ne AB = 1$. Ba phép còn lại lần lượt là phép đối xứng qua $y = x$, phép tịnh tiến và phép đối xứng tâm $O$, đều là phép dời hình.",
    },
    {
      type: 'choice',
      prompt:
        'Thực hiện liên tiếp phép đối xứng trục $Ox$ và phép tịnh tiến theo $\\vec u = (2;\\ 0)$, điểm $M(1;\\ 3)$ biến thành',
      options: ['$(3;\\ -3)$', '$(-1;\\ 3)$', '$(3;\\ 3)$', '$(-1;\\ -3)$'],
      answer: 0,
      hints: ['Làm lần lượt: đối xứng qua $Ox$ trước, rồi tịnh tiến.'],
      solution: '$\\text{Đ}_{Ox}(M) = (1;\\ -3)$, rồi tịnh tiến theo $(2;\\ 0)$ được $(3;\\ -3)$.',
    },
    {
      type: 'choice',
      prompt: 'Thực hiện liên tiếp hai phép quay $Q_{(O,\\ 90^\\circ)}$ ta được phép dời hình nào?',
      options: [
        'Phép đối xứng tâm $O$',
        'Phép đồng nhất',
        'Phép đối xứng trục $Ox$',
        'Phép quay $Q_{(O,\\ -90^\\circ)}$',
      ],
      answer: 0,
      hints: ['Hai lần quay $90^\\circ$ là quay bao nhiêu độ?'],
      solution:
        'Ta được $Q_{(O,\\ 180^\\circ)}$, chính là phép đối xứng tâm $O$. Bằng toạ độ: $(x;\\ y) \\mapsto (-y;\\ x) \\mapsto (-x;\\ -y)$.',
    },
    {
      type: 'choice',
      prompt:
        'Thực hiện liên tiếp phép đối xứng trục $Ox$ rồi phép quay $Q_{(O,\\ 90^\\circ)}$, điểm $M(2;\\ 5)$ biến thành',
      options: ['$(5;\\ 2)$', '$(-5;\\ -2)$', '$(-5;\\ 2)$', '$(2;\\ -5)$'],
      answer: 0,
      hints: [
        '$\\text{Đ}_{Ox}$: $(x;\\ y) \\mapsto (x;\\ -y)$; $Q_{(O,\\ 90^\\circ)}$: $(x;\\ y) \\mapsto (-y;\\ x)$.',
      ],
      solution:
        '$M \\mapsto (2;\\ -5) \\mapsto (5;\\ 2)$. Phép dời hình này đổi chỗ hai toạ độ: đó là phép đối xứng qua đường thẳng $y = x$.',
    },
    {
      type: 'number',
      prompt:
        "Tam giác $ABC$ có $AB = 3$, $BC = 4$, $CA = 5$. Một phép dời hình biến tam giác $ABC$ thành tam giác $A'B'C'$. Tính diện tích tam giác $A'B'C'$.",
      answer: 6,
      hints: [
        'Phép dời hình biến tam giác thành tam giác bằng nó.',
        'Tam giác $ABC$ vuông tại $B$ vì $3^2 + 4^2 = 5^2$.',
      ],
      solution:
        "$A'B'C'$ bằng $ABC$, vuông tại $B'$ với hai cạnh góc vuông $3$ và $4$, nên diện tích là $\\dfrac{1}{2} \\cdot 3 \\cdot 4 = 6$.",
    },
    {
      type: 'choice',
      prompt:
        "Ba điểm $A$, $B$, $C$ thẳng hàng, $B$ nằm giữa $A$ và $C$. Một phép dời hình biến chúng thành $A'$, $B'$, $C'$. Khẳng định nào đúng?",
      options: [
        "$A'$, $B'$, $C'$ thẳng hàng và $B'$ nằm giữa $A'$ và $C'$",
        "$A'$, $B'$, $C'$ thẳng hàng nhưng $A'$ có thể nằm giữa $B'$ và $C'$",
        "$A'$, $B'$, $C'$ có thể tạo thành một tam giác",
        "$A'$, $B'$, $C'$ trùng nhau",
      ],
      answer: 0,
      hints: ['$AB + BC = AC$ và các khoảng cách được giữ nguyên.'],
      solution:
        "Ta có $A'B' + B'C' = AB + BC = AC = A'C'$, nên $B'$ thuộc đoạn $A'C'$: ba điểm thẳng hàng và thứ tự được giữ nguyên.",
    },
    {
      type: 'choice',
      prompt:
        "Trong mặt phẳng $Oxy$, tam giác $ABC$ với $A(1;\\ 1)$, $B(4;\\ 1)$, $C(1;\\ 3)$ và tam giác $A'B'C'$ với $A'(-1;\\ -3)$, $B'(-4;\\ -3)$, $C'(-1;\\ -1)$. Phép dời hình nào biến tam giác $ABC$ thành tam giác $A'B'C'$?",
      options: [
        'Đối xứng trục $Oy$, rồi tịnh tiến theo $\\vec u = (0;\\ -4)$',
        'Đối xứng trục $Ox$, rồi tịnh tiến theo $\\vec u = (0;\\ -4)$',
        'Tịnh tiến theo $\\vec u = (-2;\\ -4)$',
        'Đối xứng tâm $O$',
      ],
      answer: 0,
      hints: ['Thử từng phương án với đỉnh $B(4;\\ 1)$.'],
      solution:
        "$\\text{Đ}_{Oy}$ biến $A, B, C$ thành $(-1;\\ 1)$, $(-4;\\ 1)$, $(-1;\\ 3)$; tịnh tiến theo $(0;\\ -4)$ được đúng $A'$, $B'$, $C'$. Phương án tịnh tiến theo $(-2;\\ -4)$ đưa $B$ tới $(2;\\ -3)$, không phải đỉnh nào của tam giác $A'B'C'$; đối xứng tâm $O$ đưa $B$ tới $(-4;\\ -1)$, không phải đỉnh nào của tam giác $A'B'C'$; đối xứng trục $Ox$ rồi tịnh tiến đưa $B$ tới $(4;\\ -5)$, cũng không phải một đỉnh.",
    },
  ],
  takeaways: [
    'Phép dời hình bảo toàn khoảng cách giữa hai điểm bất kì; tịnh tiến, đối xứng trục, quay, đối xứng tâm đều là phép dời hình.',
    'Thực hiện liên tiếp hai phép dời hình được một phép dời hình.',
    'Phép dời hình giữ thẳng hàng và thứ tự; biến đoạn thẳng, tam giác, góc, đường tròn thành hình bằng nó.',
    'Hai hình bằng nhau khi có một phép dời hình biến hình này thành hình kia.',
  ],
};
