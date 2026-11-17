/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép tịnh tiến theo vectơ u biến mỗi điểm M thành M' sao cho vectơ MM' bằng u; biểu thức toạ độ x' = x + a, y' = y + b; phép tịnh tiến bảo toàn khoảng cách và biến đường thẳng thành đường thẳng song song hoặc trùng với nó.",
  intro:
    'Trong một buổi diễu hành, cả khối người cùng bước lên phía trước những bước bằng nhau, nên đội hình vẫn giữ nguyên. Mỗi người đều dời đi theo cùng một vectơ: đó chính là hình ảnh của phép tịnh tiến.',
  objectives: [
    'Phát biểu định nghĩa phép tịnh tiến theo vectơ $\\vec u$ và dùng kí hiệu $T_{\\vec u}$.',
    "Dùng biểu thức toạ độ $x' = x + a$, $y' = y + b$ để tìm ảnh và tạo ảnh của một điểm.",
    'Nắm các tính chất của phép tịnh tiến và tìm ảnh của đường thẳng, đường tròn.',
  ],
  sections: [
    {
      heading: 'Phép tịnh tiến',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Trong mặt phẳng, cho vectơ $\\vec u$. Phép biến hình biến mỗi điểm $M$ thành điểm $M'$ sao cho $\\overrightarrow{MM'} = \\vec u$ được gọi là phép tịnh tiến theo vectơ $\\vec u$, kí hiệu $T_{\\vec u}$.",
        },
        {
          type: 'tex',
          tex: "T_{\\vec u}(M) = M' \\Leftrightarrow \\overrightarrow{MM'} = \\vec u",
        },
        {
          type: 'list',
          items: [
            'Phép tịnh tiến theo vectơ-không là phép đồng nhất.',
            "Nếu $T_{\\vec u}$ biến $M$ thành $M'$ thì $T_{-\\vec u}$ biến $M'$ thành $M$, vì $\\overrightarrow{M'M} = -\\vec u$.",
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức toạ độ',
          text: "Trong mặt phẳng $Oxy$, cho $\\vec u = (a;\\ b)$. Phép tịnh tiến $T_{\\vec u}$ biến điểm $M(x;\\ y)$ thành điểm $M'(x';\\ y')$ với $$x' = x + a, \\qquad y' = y + b.$$",
        },
        {
          type: 'p',
          text: "Thật vậy, $\\overrightarrow{MM'} = (x' - x;\\ y' - y)$ bằng $\\vec u = (a;\\ b)$ khi và chỉ khi $x' - x = a$ và $y' - y = b$.",
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
          text: "Nếu phép tịnh tiến biến hai điểm $M$, $N$ lần lượt thành $M'$, $N'$ thì $\\overrightarrow{M'N'} = \\overrightarrow{MN}$, từ đó $M'N' = MN$. Nói cách khác, phép tịnh tiến bảo toàn khoảng cách giữa hai điểm bất kì.",
        },
        {
          type: 'p',
          text: "Chứng minh: $\\overrightarrow{M'N'} = \\overrightarrow{M'M} + \\overrightarrow{MN} + \\overrightarrow{NN'} = -\\vec u + \\overrightarrow{MN} + \\vec u = \\overrightarrow{MN}$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 2',
          text: 'Phép tịnh tiến biến đường thẳng thành đường thẳng song song hoặc trùng với nó, biến đoạn thẳng thành đoạn thẳng bằng nó, biến tam giác thành tam giác bằng nó, biến đường tròn thành đường tròn có cùng bán kính.',
        },
        {
          type: 'list',
          items: [
            'Ảnh của đường thẳng $d$ trùng với $d$ khi $\\vec u$ là vectơ-không hoặc là một vectơ chỉ phương của $d$; trong các trường hợp khác, ảnh song song với $d$.',
            "Ảnh của đường tròn $(K;\\ R)$ là đường tròn $(K';\\ R)$ với $K' = T_{\\vec u}(K)$.",
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm ảnh của đường thẳng',
          text: "Ảnh của $d: ax + by + c = 0$ qua $T_{\\vec u}$ có dạng $ax + by + c' = 0$. Để tìm $c'$, lấy một điểm $M$ thuộc $d$, tìm ảnh $M'$ rồi thay toạ độ $M'$ vào phương trình. Cũng có thể thay $x = x' - a$, $y = y' - b$ vào phương trình của $d$.",
        },
      ],
    },
    {
      heading: 'Dự án: Lát nền bằng phép tịnh tiến',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế một mẫu lát nền (hoặc hoa văn giấy dán tường) trong đó mọi viên gạch đều là ảnh của một viên gạch mẫu qua các phép tịnh tiến, và tìm vị trí của một viên gạch bất kì.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô vuông, kéo, bìa cứng, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ và cắt một viên gạch mẫu trên bìa: có thể là hình bình hành, lục giác, hoặc một hình vuông được khoét một phần ở cạnh trái rồi dán phần đó sang cạnh phải.',
            'Chọn hai vectơ $\\vec u$ (dọc theo hàng) và $\\vec v$ (từ hàng này sang hàng kế tiếp). Đặt viên mẫu ở góc giấy, lần lượt tịnh tiến nó theo $\\vec u$ và $\\vec v$ để lát kín tờ giấy.',
            'Gắn hệ trục $Oxy$ với gốc tại một đỉnh của viên mẫu. Viết toạ độ của $\\vec u$, $\\vec v$ và của đỉnh tương ứng trên viên gạch ở hàng $i$, cột $j$ dưới dạng $(j - 1)\\vec u + (i - 1)\\vec v$.',
            'Đổi màu những viên gạch ở các cột chẵn để thấy rõ quy luật.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: mẫu lát nền hoàn chỉnh, toạ độ của $\\vec u$ và $\\vec v$, công thức vị trí của viên gạch ở hàng $i$, cột $j$ và kết quả kiểm tra với một viên gạch cụ thể.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo vectơ tịnh tiến',
    instruction:
      'Kéo ngọn của vectơ $\\vec u$ (hoặc chọn nó rồi dùng phím mũi tên). Toàn bộ hình trượt theo $\\vec u$; đọc biểu thức toạ độ và phương trình của ảnh ở bên dưới. Với đường thẳng, thử tìm một vectơ $\\vec u$ khác $\\vec 0$ làm ảnh trùng với $d$.',
  },
  examples: [
    {
      problem:
        'Trong mặt phẳng $Oxy$, cho $\\vec u = (2;\\ -3)$ và điểm $M(1;\\ 4)$. Tìm ảnh của $M$ qua $T_{\\vec u}$ và tìm điểm $N$ sao cho $T_{\\vec u}(N) = M$.',
      steps: [
        "Biểu thức toạ độ: $x' = x + 2$, $y' = y - 3$.",
        "$M' = T_{\\vec u}(M) = (1 + 2;\\ 4 - 3) = (3;\\ 1)$.",
        '$T_{\\vec u}(N) = M$ nghĩa là $N = T_{-\\vec u}(M) = (1 - 2;\\ 4 + 3) = (-1;\\ 7)$.',
      ],
      answer: "$M'(3;\\ 1)$ và $N(-1;\\ 7)$.",
    },
    {
      problem:
        "Cho đường tròn $(C): (x - 1)^2 + (y + 2)^2 = 25$ và $\\vec u = (2;\\ 3)$. Viết phương trình đường tròn $(C')$ là ảnh của $(C)$ qua $T_{\\vec u}$.",
      steps: [
        '$(C)$ có tâm $K(1;\\ -2)$ và bán kính $R = 5$.',
        "Ảnh của tâm: $K' = (1 + 2;\\ -2 + 3) = (3;\\ 1)$.",
        "Phép tịnh tiến biến đường tròn thành đường tròn cùng bán kính, nên $(C')$ có tâm $K'(3;\\ 1)$, bán kính $5$.",
      ],
      answer: "$(C'): (x - 3)^2 + (y - 1)^2 = 25$.",
    },
    {
      problem:
        "Cho đường thẳng $d: 3x - y + 2 = 0$ và $\\vec u = (1;\\ 2)$. Viết phương trình đường thẳng $d'$ là ảnh của $d$ qua $T_{\\vec u}$.",
      steps: [
        "$d'$ song song hoặc trùng với $d$ nên có dạng $3x - y + c = 0$.",
        "Lấy $M(0;\\ 2)$ thuộc $d$. Ảnh của nó là $M'(1;\\ 4)$, thuộc $d'$.",
        'Thay vào: $3 \\cdot 1 - 4 + c = 0$, nên $c = 1$.',
      ],
      answer: "$d': 3x - y + 1 = 0$.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho $\\vec u = (2;\\ -3)$. Ảnh của điểm $A(-1;\\ 2)$ qua $T_{\\vec u}$ là',
      options: ["$A'(1;\\ -1)$", "$A'(-3;\\ 5)$", "$A'(1;\\ 5)$", "$A'(-2;\\ -6)$"],
      answer: 0,
      hints: ["$x' = x + 2$, $y' = y - 3$."],
      solution: "$A' = (-1 + 2;\\ 2 - 3) = (1;\\ -1)$.",
    },
    {
      type: 'choice',
      prompt:
        'Phép tịnh tiến $T_{\\vec u}$ biến điểm $A(1;\\ 2)$ thành điểm $B(4;\\ -1)$. Toạ độ của $\\vec u$ là',
      options: ['$(3;\\ -3)$', '$(-3;\\ 3)$', '$(5;\\ 1)$', '$(3;\\ 1)$'],
      answer: 0,
      hints: ['$\\vec u = \\overrightarrow{AB}$: lấy toạ độ điểm cuối trừ toạ độ điểm đầu.'],
      solution: '$\\vec u = \\overrightarrow{AB} = (4 - 1;\\ -1 - 2) = (3;\\ -3)$.',
    },
    {
      type: 'number',
      prompt:
        "Cho $\\vec u = (2;\\ 3)$. Điểm $M$ có ảnh qua $T_{\\vec u}$ là $M'(-1;\\ 5)$. Tìm hoành độ của $M$.",
      answer: -3,
      hints: ["$M$ là ảnh của $M'$ qua $T_{-\\vec u}$."],
      solution: "$M = T_{-\\vec u}(M') = (-1 - 2;\\ 5 - 3) = (-3;\\ 2)$. Hoành độ của $M$ là $-3$.",
    },
    {
      type: 'choice',
      prompt:
        'Ảnh của đường tròn $(C): (x - 1)^2 + (y + 2)^2 = 25$ qua phép tịnh tiến theo $\\vec u = (3;\\ -1)$ là',
      options: [
        '$(x - 4)^2 + (y + 3)^2 = 25$',
        '$(x + 2)^2 + (y + 1)^2 = 25$',
        '$(x - 4)^2 + (y + 1)^2 = 25$',
        '$(x - 4)^2 + (y + 3)^2 = 5$',
      ],
      answer: 0,
      hints: ['Tìm ảnh của tâm $K(1;\\ -2)$; bán kính giữ nguyên.'],
      solution:
        "$K' = (1 + 3;\\ -2 - 1) = (4;\\ -3)$, $R = 5$. Vậy $(C'): (x - 4)^2 + (y + 3)^2 = 25$.",
    },
    {
      type: 'number',
      prompt:
        'Ảnh của đường thẳng $d: 2x - y + 1 = 0$ qua phép tịnh tiến theo $\\vec u = (1;\\ 0)$ có phương trình $2x - y + c = 0$. Tìm $c$.',
      answer: -1,
      hints: [
        'Lấy điểm $M(0;\\ 1)$ thuộc $d$ và tìm ảnh của nó.',
        "Thay toạ độ của $M'$ vào $2x - y + c = 0$.",
      ],
      solution: "$M'(1;\\ 1)$ thuộc $d'$ nên $2 \\cdot 1 - 1 + c = 0$, tức là $c = -1$.",
    },
    {
      type: 'choice',
      prompt:
        "Cho đường thẳng $d: 2x - y + 1 = 0$ và $\\vec u = (1;\\ 2)$. Ảnh $d'$ của $d$ qua $T_{\\vec u}$",
      options: [
        'trùng với $d$',
        'song song với $d$ và khác $d$',
        'vuông góc với $d$',
        'cắt $d$ nhưng không vuông góc',
      ],
      answer: 0,
      hints: ['Kiểm tra xem $\\vec u$ có phải là một vectơ chỉ phương của $d$ hay không.'],
      solution:
        "$d$ có vectơ pháp tuyến $\\vec n = (2;\\ -1)$ và $\\vec n \\cdot \\vec u = 2 \\cdot 1 + (-1) \\cdot 2 = 0$, nên $\\vec u$ là một vectơ chỉ phương của $d$. Mỗi điểm của $d$ trượt dọc theo chính $d$, vậy $d'$ trùng với $d$. (Kiểm tra: $M(0;\\ 1)$ có ảnh $(1;\\ 3)$ và $2 - 3 + 1 = 0$.)",
    },
    {
      type: 'number',
      prompt:
        'Trong đội diễu hành, mỗi bước của Hùng là một phép tịnh tiến theo vectơ hướng về phía đông, độ dài $30$ cm. Sau $20$ bước, vị trí của Hùng là ảnh của vị trí ban đầu qua phép tịnh tiến theo một vectơ có độ dài bao nhiêu mét?',
      answer: 6,
      unit: 'm',
      hints: [
        'Thực hiện liên tiếp $20$ phép tịnh tiến theo $\\vec u$ là phép tịnh tiến theo $20\\vec u$.',
      ],
      solution:
        'Hai mươi bước liền nhau là phép tịnh tiến theo $20\\vec u$, có độ dài $20 \\cdot 30 = 600$ cm $= 6$ m, hướng về phía đông.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các khẳng định đúng về phép tịnh tiến $T_{\\vec u}$ với $\\vec u \\ne \\vec 0$.',
      options: [
        'Biến đoạn thẳng thành đoạn thẳng bằng nó.',
        'Biến đường tròn thành đường tròn có cùng bán kính.',
        'Có ít nhất một điểm biến thành chính nó.',
        'Biến một đường thẳng bất kì thành đường thẳng song song với nó và khác nó.',
      ],
      answers: [0, 1],
      hints: [
        'Nếu $M$ biến thành chính nó thì $\\overrightarrow{MM} = \\vec u$.',
        'Xét đường thẳng nhận $\\vec u$ làm vectơ chỉ phương.',
      ],
      solution:
        'Hai khẳng định về đoạn thẳng và đường tròn đúng theo tính chất. Không điểm nào đứng yên vì $\\overrightarrow{MM} = \\vec 0 \\ne \\vec u$. Đường thẳng nhận $\\vec u$ làm vectơ chỉ phương biến thành chính nó, nên khẳng định cuối sai.',
    },
  ],
  takeaways: [
    "$T_{\\vec u}(M) = M' \\Leftrightarrow \\overrightarrow{MM'} = \\vec u$; $T_{\\vec 0}$ là phép đồng nhất.",
    "Với $\\vec u = (a;\\ b)$: $x' = x + a$, $y' = y + b$.",
    "Phép tịnh tiến bảo toàn khoảng cách: $\\overrightarrow{M'N'} = \\overrightarrow{MN}$.",
    "Đường thẳng biến thành đường thẳng song song hoặc trùng với nó; đường tròn $(K;\\ R)$ biến thành $(K';\\ R)$.",
  ],
};
