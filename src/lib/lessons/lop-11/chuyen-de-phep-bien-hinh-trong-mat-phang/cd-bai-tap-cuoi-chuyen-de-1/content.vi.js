/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề phép biến hình: phép tịnh tiến, phép đối xứng trục, phép quay, phép đối xứng tâm, phép dời hình, phép vị tự và phép đồng dạng, với biểu thức toạ độ, tính chất và cách nhận ra phép biến hình biến hình này thành hình kia.',
  intro:
    'Cả chuyên đề xoay quanh một câu hỏi: cho hai hình, có phép biến hình nào biến hình này thành hình kia không? Nếu có một phép dời hình thì hai hình bằng nhau; nếu có một phép đồng dạng thì hai hình đồng dạng. Bài này ôn lại các phép biến hình đã học và luyện cách nhận ra chúng.',
  objectives: [
    'Nhớ định nghĩa, kí hiệu và biểu thức toạ độ của các phép biến hình đã học.',
    'Tìm ảnh của điểm, đường thẳng, đường tròn qua một phép biến hình hoặc một chuỗi phép biến hình.',
    'Nhận ra phép biến hình biến một hình thành một hình cho trước, phân biệt phép dời hình và phép đồng dạng.',
  ],
  sections: [
    {
      heading: 'Các phép biến hình đã học',
      blocks: [
        {
          type: 'table',
          head: ['Phép biến hình', 'Kí hiệu', 'Ảnh của $M(x;\\ y)$', 'Bảo toàn'],
          rows: [
            [
              'Tịnh tiến theo $\\vec u = (a;\\ b)$',
              '$T_{\\vec u}$',
              '$(x + a;\\ y + b)$',
              'Khoảng cách',
            ],
            ['Đối xứng trục $Ox$', '$\\text{Đ}_{Ox}$', '$(x;\\ -y)$', 'Khoảng cách'],
            ['Đối xứng trục $Oy$', '$\\text{Đ}_{Oy}$', '$(-x;\\ y)$', 'Khoảng cách'],
            [
              'Quay tâm $O$ góc $90^\\circ$',
              '$Q_{(O,\\ 90^\\circ)}$',
              '$(-y;\\ x)$',
              'Khoảng cách',
            ],
            [
              'Quay tâm $O$ góc $-90^\\circ$',
              '$Q_{(O,\\ -90^\\circ)}$',
              '$(y;\\ -x)$',
              'Khoảng cách',
            ],
            ['Đối xứng tâm $I(a;\\ b)$', '$\\text{Đ}_I$', '$(2a - x;\\ 2b - y)$', 'Khoảng cách'],
            [
              'Vị tự tâm $I(a;\\ b)$ tỉ số $k$',
              '$V_{(I,\\ k)}$',
              '$(a + k(x - a);\\ b + k(y - b))$',
              'Góc; độ dài nhân $|k|$',
            ],
          ],
          caption: 'Biểu thức toạ độ của các phép biến hình trong chuyên đề.',
        },
        {
          type: 'list',
          items: [
            'Phép dời hình là phép biến hình bảo toàn khoảng cách; tịnh tiến, đối xứng trục, quay, đối xứng tâm đều là phép dời hình. Hai hình bằng nhau khi có một phép dời hình biến hình này thành hình kia.',
            'Phép đồng dạng tỉ số $k > 0$ nhân mọi khoảng cách với $k$; phép dời hình là phép đồng dạng tỉ số $1$, phép vị tự tỉ số $k$ là phép đồng dạng tỉ số $|k|$. Hai hình đồng dạng khi có một phép đồng dạng biến hình này thành hình kia.',
            'Thực hiện liên tiếp hai phép dời hình được một phép dời hình; thực hiện liên tiếp hai phép đồng dạng tỉ số $k$ và $p$ được một phép đồng dạng tỉ số $kp$.',
          ],
        },
      ],
    },
    {
      heading: 'Nhận ra một phép biến hình',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'So sánh kích thước: nếu các đoạn tương ứng bằng nhau thì tìm một phép dời hình; nếu chúng tỉ lệ với $k \\ne 1$ thì cần một phép vị tự hoặc phép đồng dạng tỉ số $k$.',
            'So sánh hướng: hai hình cùng hướng, các cạnh tương ứng song song và cùng chiều gợi ý phép tịnh tiến (hoặc vị tự $k > 0$); các cạnh song song nhưng ngược chiều gợi ý phép đối xứng tâm (hoặc vị tự $k < 0$); hình bị "lật" gợi ý phép đối xứng trục; cạnh nằm ngang thành cạnh thẳng đứng gợi ý phép quay $\\pm 90^\\circ$.',
            'Kiểm tra bằng toạ độ: áp phép biến hình vào từng đỉnh và so với hình đích.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ảnh của đường thẳng, đường tròn',
          text: "Để tìm ảnh của đường thẳng, lấy hai điểm của nó (hoặc một điểm và dùng tính song song khi đó là phép tịnh tiến, đối xứng tâm, vị tự). Để tìm ảnh của đường tròn $(K;\\ R)$, tìm ảnh $K'$ của tâm và bán kính mới: $R$ với phép dời hình, $|k|R$ với phép vị tự tỉ số $k$.",
        },
      ],
    },
    {
      heading: 'Dự án: Thiết kế một logo bằng phép biến hình',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế một logo hoặc một hoa văn cho lớp, trong đó mỗi phần được tạo ra từ một hình cơ bản bằng các phép biến hình đã học.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô vuông (hoặc phần mềm GeoGebra), thước, compa, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một hình cơ bản không có trục đối xứng (chẳng hạn một chiếc lá, một lá cờ) và đặt nó trên hệ trục $Oxy$, ghi toạ độ các đỉnh.',
            'Tạo ít nhất bốn bản sao bằng bốn phép biến hình khác nhau, trong đó có ít nhất một phép quay và một phép vị tự.',
            'Ghi biểu thức toạ độ của từng phép và toạ độ các đỉnh của từng bản sao.',
            'Chỉ ra trong logo một cặp hình bằng nhau và một cặp hình đồng dạng nhưng không bằng nhau, nêu phép biến hình tương ứng.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bản vẽ logo hoàn chỉnh, bảng các phép biến hình đã dùng (kí hiệu, biểu thức toạ độ, là phép dời hình hay phép đồng dạng tỉ số bao nhiêu) và ý nghĩa của logo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phép biến hình nào?',
    instruction:
      "Mỗi câu đố cho hình $H$ và hình $H'$. Chọn phép biến hình biến $H$ thành $H'$; nếu chọn sai, ảnh của $H$ qua phép đã chọn hiện ra bằng nét đứt đỏ để em so sánh.",
  },
  examples: [
    {
      problem:
        'Tìm ảnh của $A(2;\\ 1)$ khi thực hiện liên tiếp $\\text{Đ}_{Oy}$, phép tịnh tiến theo $\\vec u = (3;\\ -2)$ và $V_{(O,\\ 2)}$. Phép biến hình có được là phép đồng dạng tỉ số bao nhiêu?',
      steps: [
        '$\\text{Đ}_{Oy}$: $A \\mapsto A_1(-2;\\ 1)$.',
        '$T_{\\vec u}$: $A_1 \\mapsto A_2(1;\\ -1)$.',
        "$V_{(O,\\ 2)}$: $A_2 \\mapsto A'(2;\\ -2)$.",
        'Hai phép đầu là phép dời hình (tỉ số $1$), phép vị tự có tỉ số $2$, nên tỉ số đồng dạng là $1 \\cdot 1 \\cdot 2 = 2$.',
      ],
      answer: "$A'(2;\\ -2)$; phép đồng dạng tỉ số $2$.",
    },
    {
      problem: 'Tìm ảnh của đường thẳng $d: x + y - 2 = 0$ qua phép quay $Q_{(O,\\ 90^\\circ)}$.',
      steps: [
        'Lấy hai điểm của $d$: $M(2;\\ 0)$ và $N(0;\\ 2)$.',
        "$Q_{(O,\\ 90^\\circ)}$ biến $(x;\\ y)$ thành $(-y;\\ x)$: $M'(0;\\ 2)$, $N'(-2;\\ 0)$.",
        "Đường thẳng $M'N'$ có vectơ chỉ phương $(-2;\\ -2)$, cùng phương $(1;\\ 1)$, đi qua $(0;\\ 2)$: $x - y + 2 = 0$.",
      ],
      answer: "$d': x - y + 2 = 0$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(-3;\\ 4)$ qua phép tịnh tiến theo $\\vec u = (2;\\ -1)$ là',
      options: ["$M'(-1;\\ 3)$", "$M'(-5;\\ 5)$", "$M'(-1;\\ 5)$", "$M'(-6;\\ -4)$"],
      answer: 0,
      hints: ["$x' = x + a$, $y' = y + b$."],
      solution: "$M'(-3 + 2;\\ 4 - 1) = (-1;\\ 3)$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của đường thẳng $d: x - 2y + 3 = 0$ qua phép đối xứng trục $Ox$ là',
      options: ['$x + 2y + 3 = 0$', '$-x - 2y + 3 = 0$', '$x - 2y - 3 = 0$', '$2x - y + 3 = 0$'],
      answer: 0,
      hints: [
        "$\\text{Đ}_{Ox}$: $x' = x$, $y' = -y$. Thay $x = x'$, $y = -y'$ vào phương trình của $d$.",
      ],
      solution: "Thay $x = x'$, $y = -y'$: $x' - 2(-y') + 3 = 0$, tức là $x + 2y + 3 = 0$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(3;\\ 1)$ qua phép đối xứng tâm $I(1;\\ -2)$ là',
      options: ["$M'(-1;\\ -5)$", "$M'(-3;\\ -1)$", "$M'(2;\\ -0{,}5)$", "$M'(5;\\ 3)$"],
      answer: 0,
      hints: ["$I$ là trung điểm của $MM'$: $x' = 2a - x$, $y' = 2b - y$."],
      solution: "$x' = 2 \\cdot 1 - 3 = -1$, $y' = 2 \\cdot (-2) - 1 = -5$.",
    },
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(2;\\ 5)$ qua phép quay $Q_{(O,\\ -90^\\circ)}$ là',
      options: ["$M'(5;\\ -2)$", "$M'(-5;\\ 2)$", "$M'(-2;\\ -5)$", "$M'(5;\\ 2)$"],
      answer: 0,
      hints: [
        'Góc âm: quay cùng chiều kim đồng hồ.',
        '$Q_{(O,\\ -90^\\circ)}$: $(x;\\ y) \\mapsto (y;\\ -x)$.',
      ],
      solution:
        "$M'(5;\\ -2)$. Phương án $(-5;\\ 2)$ là ảnh qua $Q_{(O,\\ 90^\\circ)}$, quay ngược chiều.",
    },
    {
      type: 'number',
      prompt: 'Hình vuông có bao nhiêu trục đối xứng?',
      answer: 4,
      hints: ['Kể cả các đường chéo.'],
      solution:
        'Hai đường thẳng nối trung điểm các cặp cạnh đối và hai đường chéo: hình vuông có $4$ trục đối xứng.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào sau đây có tâm đối xứng?',
      options: ['Hình bình hành', 'Tam giác đều', 'Hình thang cân', 'Ngũ giác đều'],
      answer: 0,
      hints: ['Phép đối xứng tâm $I$ phải biến hình thành chính nó.'],
      solution:
        'Giao điểm hai đường chéo của hình bình hành là tâm đối xứng của nó. Tam giác đều, hình thang cân, ngũ giác đều có trục đối xứng nhưng không có tâm đối xứng.',
    },
    {
      type: 'choice',
      prompt:
        'Ảnh của đường tròn $(C): (x - 2)^2 + (y + 1)^2 = 9$ qua phép vị tự $V_{(O,\\ -3)}$ là',
      options: [
        '$(x + 6)^2 + (y - 3)^2 = 81$',
        '$(x + 6)^2 + (y - 3)^2 = 9$',
        '$(x - 6)^2 + (y + 3)^2 = 81$',
        '$(x + 6)^2 + (y - 3)^2 = 27$',
      ],
      answer: 0,
      hints: [
        'Tâm $K(2;\\ -1)$ biến thành $(-3 \\cdot 2;\\ -3 \\cdot (-1))$.',
        'Bán kính mới $|k| \\cdot 3$.',
      ],
      solution: "Tâm $K'(-6;\\ 3)$, bán kính $3 \\cdot 3 = 9$: $(x + 6)^2 + (y - 3)^2 = 81$.",
    },
    {
      type: 'number',
      prompt:
        'Thực hiện liên tiếp phép vị tự $V_{\\left(O,\\ -\\frac{1}{3}\\right)}$ và phép vị tự $V_{(O,\\ 6)}$ ta được một phép đồng dạng. Tìm tỉ số của phép đồng dạng đó.',
      answer: 2,
      hints: ['Mỗi phép vị tự tỉ số $k$ là phép đồng dạng tỉ số $|k|$; nhân các tỉ số.'],
      solution:
        'Tỉ số là $\\dfrac{1}{3} \\cdot 6 = 2$. (Thật ra đó chính là phép vị tự $V_{(O,\\ -2)}$.)',
    },
    {
      type: 'choice',
      prompt: "Phép biến hình biến mỗi điểm $M(x;\\ y)$ thành $M'(x + 1;\\ -y)$ là",
      options: [
        'một phép dời hình',
        'phép vị tự tâm $O$ tỉ số $-1$',
        'một phép đồng dạng tỉ số $2$',
        'không phải phép đồng dạng',
      ],
      answer: 0,
      hints: ['Đó là $\\text{Đ}_{Ox}$ rồi tịnh tiến theo $(1;\\ 0)$.'],
      solution:
        "Thực hiện liên tiếp $\\text{Đ}_{Ox}$ và $T_{\\vec u}$, $\\vec u = (1;\\ 0)$, được một phép dời hình. Kiểm tra: $M'N'^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 = MN^2$.",
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép biến hình với ảnh của điểm $M(x;\\ y)$ qua nó.',
      left: [
        '$T_{\\vec u}$, $\\vec u = (1;\\ 2)$',
        '$\\text{Đ}_{Oy}$',
        '$Q_{(O,\\ 90^\\circ)}$',
        '$V_{(O,\\ 2)}$',
      ],
      right: ['$(x + 1;\\ y + 2)$', '$(-x;\\ y)$', '$(-y;\\ x)$', '$(2x;\\ 2y)$', '$(y;\\ -x)$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Một biểu thức thừa: đó là ảnh qua $Q_{(O,\\ -90^\\circ)}$.'],
      solution:
        '$T_{\\vec u}$: $(x + 1;\\ y + 2)$; $\\text{Đ}_{Oy}$: $(-x;\\ y)$; $Q_{(O,\\ 90^\\circ)}$: $(-y;\\ x)$; $V_{(O,\\ 2)}$: $(2x;\\ 2y)$.',
    },
    {
      type: 'number',
      prompt:
        "Hình vuông $ABCD$ cạnh $3$ cm. Một phép đồng dạng tỉ số $2$ biến nó thành hình vuông $A'B'C'D'$. Tính diện tích của $A'B'C'D'$.",
      answer: 36,
      unit: 'cm²',
      hints: ['Cạnh mới bằng $2 \\cdot 3$.'],
      solution: 'Cạnh mới $6$ cm, diện tích $6^2 = 36$ cm² (bằng $k^2 = 4$ lần diện tích $9$ cm²).',
    },
    {
      type: 'multi',
      prompt: 'Những phép biến hình nào sau đây là phép dời hình?',
      options: [
        'Phép tịnh tiến theo $\\vec u = (3;\\ -1)$',
        'Phép đối xứng trục $Ox$',
        'Phép quay $Q_{(O,\\ 60^\\circ)}$',
        'Phép vị tự $V_{(O,\\ 2)}$',
        'Phép vị tự $V_{(O,\\ -1)}$',
      ],
      answers: [0, 1, 2, 4],
      hints: ['Phép vị tự tỉ số $k$ nhân khoảng cách với $|k|$. Khi nào $|k| = 1$?'],
      solution:
        'Tịnh tiến, đối xứng trục, quay đều là phép dời hình; $V_{(O,\\ -1)}$ là phép đối xứng tâm $O$, cũng là phép dời hình. $V_{(O,\\ 2)}$ nhân khoảng cách với $2$ nên không phải phép dời hình.',
    },
  ],
  takeaways: [
    'Tịnh tiến, đối xứng trục, quay, đối xứng tâm là phép dời hình: chúng giữ khoảng cách, biến hình thành hình bằng nó.',
    'Phép vị tự tỉ số $k$ nhân độ dài với $|k|$; phép đồng dạng tỉ số $k$ là một phép vị tự rồi một phép dời hình.',
    'Muốn tìm ảnh của một hình, áp biểu thức toạ độ vào các điểm đặc trưng: đỉnh của đa giác, hai điểm của đường thẳng, tâm của đường tròn.',
    'Nhận ra phép biến hình bằng cách so sánh kích thước và hướng của hai hình, rồi kiểm tra bằng toạ độ.',
  ],
};
