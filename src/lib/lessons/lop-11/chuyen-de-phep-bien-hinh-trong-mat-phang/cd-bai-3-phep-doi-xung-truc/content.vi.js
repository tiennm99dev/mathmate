/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép đối xứng trục d giữ nguyên mỗi điểm thuộc d và biến điểm M không thuộc d thành M' sao cho d là đường trung trực của MM'; biểu thức toạ độ qua Ox, Oy; tính chất bảo toàn khoảng cách và trục đối xứng của một hình.",
  intro:
    'Cây cầu đá in bóng xuống mặt sông phẳng lặng: mỗi điểm trên cầu có một điểm "phản chiếu" ở dưới nước, cách mặt nước một khoảng đúng bằng nó. Mặt nước đóng vai trò một trục đối xứng, và quy tắc phản chiếu ấy là phép đối xứng trục.',
  objectives: [
    'Phát biểu định nghĩa phép đối xứng trục và dùng kí hiệu $\\text{Đ}_d$.',
    'Dùng biểu thức toạ độ của phép đối xứng qua $Ox$, $Oy$ để tìm ảnh của điểm, đường thẳng, đường tròn.',
    'Nắm các tính chất của phép đối xứng trục.',
    'Nhận biết trục đối xứng của một hình và hình có trục đối xứng.',
  ],
  sections: [
    {
      heading: 'Phép đối xứng trục',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Cho đường thẳng $d$. Phép biến hình biến mỗi điểm $M$ thuộc $d$ thành chính nó, biến mỗi điểm $M$ không thuộc $d$ thành điểm $M'$ sao cho $d$ là đường trung trực của đoạn thẳng $MM'$ được gọi là phép đối xứng qua đường thẳng $d$ hay phép đối xứng trục $d$, kí hiệu $\\text{Đ}_d$. Đường thẳng $d$ gọi là trục đối xứng.",
        },
        {
          type: 'list',
          items: [
            "Gọi $H$ là hình chiếu vuông góc của $M$ trên $d$. Khi đó $\\text{Đ}_d(M) = M' \\Leftrightarrow \\overrightarrow{HM'} = -\\overrightarrow{HM}$.",
            "Nếu $\\text{Đ}_d(M) = M'$ thì $\\text{Đ}_d(M') = M$.",
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức toạ độ',
          text: "Trong mặt phẳng $Oxy$, với $M(x;\\ y)$ và $M'(x';\\ y')$: $$\\text{Đ}_{Ox}(M) = M' \\Leftrightarrow \\begin{cases} x' = x \\\\ y' = -y \\end{cases}$$ $$\\text{Đ}_{Oy}(M) = M' \\Leftrightarrow \\begin{cases} x' = -x \\\\ y' = y \\end{cases}$$",
        },
        {
          type: 'p',
          text: "Tương tự, phép đối xứng qua đường phân giác $y = x$ đổi chỗ hai toạ độ: $M(x;\\ y) \\mapsto M'(y;\\ x)$.",
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
          text: "Phép đối xứng trục bảo toàn khoảng cách giữa hai điểm bất kì: nếu $\\text{Đ}_d$ biến $M$, $N$ lần lượt thành $M'$, $N'$ thì $M'N' = MN$. Nó biến đường thẳng thành đường thẳng, đoạn thẳng thành đoạn thẳng bằng nó, tam giác thành tam giác bằng nó, đường tròn thành đường tròn có cùng bán kính.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ảnh của một đường qua trục toạ độ',
          text: 'Để tìm ảnh của đường có phương trình $F(x;\\ y) = 0$ qua $\\text{Đ}_{Ox}$, ta thay $y$ bởi $-y$; qua $\\text{Đ}_{Oy}$, ta thay $x$ bởi $-x$. Chẳng hạn ảnh của $x + 2y - 1 = 0$ qua $\\text{Đ}_{Ox}$ là $x - 2y - 1 = 0$.',
        },
      ],
    },
    {
      heading: 'Trục đối xứng của một hình',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường thẳng $d$ được gọi là trục đối xứng của hình $\\mathcal{H}$ nếu phép đối xứng trục $\\text{Đ}_d$ biến hình $\\mathcal{H}$ thành chính nó. Khi đó ta nói $\\mathcal{H}$ là hình có trục đối xứng.',
        },
        {
          type: 'table',
          head: ['Hình', 'Số trục đối xứng'],
          rows: [
            ['Tam giác đều', '$3$'],
            ['Tam giác cân (không đều)', '$1$'],
            ['Hình vuông', '$4$'],
            ['Hình chữ nhật (không vuông)', '$2$'],
            ['Hình thoi (không vuông)', '$2$'],
            ['Hình thang cân', '$1$'],
            ['Hình bình hành (không là hình chữ nhật, không là hình thoi)', '$0$'],
            ['Đường tròn', 'vô số (mọi đường thẳng qua tâm)'],
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Hoa văn đối xứng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: vẽ lại một hoa văn (hoặc logo) có trục đối xứng chỉ bằng thước kẻ và compa, và giải thích cách dựng mỗi điểm đối xứng.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: compa, thước kẻ, ê ke, bút chì, giấy trắng; ảnh một hoa văn trên gạch, vải hay đồ gốm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Kẻ trục $d$ và vẽ một nửa hoa văn ở một bên trục, gồm các nét thẳng và các cung tròn.',
            'Với mỗi đầu mút của nét thẳng, dựng điểm đối xứng qua $d$: kẻ đường vuông góc với $d$ bằng ê ke, rồi dùng compa đặt đoạn bằng nhau ở phía bên kia.',
            'Với mỗi cung tròn, dựng điểm đối xứng của tâm và giữ nguyên bán kính.',
            'Gấp tờ giấy theo $d$ và soi lên đèn để kiểm tra hai nửa chồng khít.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: hình vẽ hoàn chỉnh, các bước dựng một điểm đối xứng, kết quả kiểm tra bằng cách gấp giấy, và cho biết hoa văn có bao nhiêu trục đối xứng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gương ảo',
    instruction:
      'Ở "Gương ảo", kéo bút $M$ (hoặc dùng phím mũi tên) rồi bấm "Thêm điểm" để vẽ: phần đối xứng qua trục $d$ tự hiện ra. Đổi trục để xem hình phản chiếu thay đổi. Ở "Tìm trục đối xứng", chọn một hình rồi thử từng trục: trục nào làm ảnh trùng khít với hình?',
  },
  examples: [
    {
      problem:
        'Trong mặt phẳng $Oxy$, cho điểm $M(3;\\ -5)$ và đường thẳng $d: 3x - y - 1 = 0$. Tìm ảnh của $M$ qua $\\text{Đ}_{Ox}$ và viết phương trình ảnh của $d$ qua $\\text{Đ}_{Oy}$.',
      steps: [
        "$\\text{Đ}_{Ox}$: $x' = x$, $y' = -y$, nên $M' = (3;\\ 5)$.",
        "Qua $\\text{Đ}_{Oy}$, điểm $N(x;\\ y)$ thuộc ảnh $d'$ khi và chỉ khi $(-x;\\ y)$ thuộc $d$, tức là $3(-x) - y - 1 = 0$.",
        "Vậy $d': -3x - y - 1 = 0$, hay $3x + y + 1 = 0$.",
      ],
      answer: "$M'(3;\\ 5)$ và $d': 3x + y + 1 = 0$.",
    },
    {
      problem:
        'Cho hai điểm $A(1;\\ 2)$, $B(5;\\ 4)$. Tìm điểm $M$ trên trục $Ox$ sao cho $MA + MB$ nhỏ nhất.',
      steps: [
        "$A$ và $B$ nằm cùng phía đối với $Ox$. Gọi $A' = \\text{Đ}_{Ox}(A) = (1;\\ -2)$. Với mọi $M$ thuộc $Ox$, $MA = MA'$.",
        "Do đó $MA + MB = MA' + MB \\ge A'B$, dấu bằng xảy ra khi $M$ là giao điểm của đoạn $A'B$ với $Ox$.",
        "Đường thẳng $A'B$ có vectơ chỉ phương $\\overrightarrow{A'B} = (4;\\ 6)$, phương trình $y + 2 = \\dfrac{3}{2}(x - 1)$. Cho $y = 0$ được $x = \\dfrac{7}{3}$.",
        "Giá trị nhỏ nhất là $A'B = \\sqrt{4^2 + 6^2} = 2\\sqrt{13}$.",
      ],
      answer: '$M\\left(\\dfrac{7}{3};\\ 0\\right)$, khi đó $MA + MB = 2\\sqrt{13}$.',
    },
    {
      problem: 'Cho hai điểm phân biệt $A$, $B$. Xác định phép đối xứng trục biến $A$ thành $B$.',
      steps: [
        'Nếu $\\text{Đ}_d(A) = B$ với $A \\ne B$ thì theo định nghĩa, $d$ là đường trung trực của đoạn $AB$.',
        'Ngược lại, phép đối xứng qua đường trung trực của $AB$ biến $A$ thành $B$.',
      ],
      answer: 'Có đúng một phép đối xứng trục như vậy: trục là đường trung trực của $AB$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ảnh của điểm $M(3;\\ -5)$ qua phép đối xứng trục $Oy$ là',
      options: ["$M'(-3;\\ -5)$", "$M'(3;\\ 5)$", "$M'(-3;\\ 5)$", "$M'(-5;\\ 3)$"],
      answer: 0,
      hints: ["$\\text{Đ}_{Oy}$: $x' = -x$, $y' = y$."],
      solution: "Đổi dấu hoành độ, giữ nguyên tung độ: $M'(-3;\\ -5)$.",
    },
    {
      type: 'choice',
      prompt:
        'Ảnh của đường thẳng $\\Delta: x + 2y - 1 = 0$ qua phép đối xứng trục $Ox$ là đường thẳng',
      options: ['$x - 2y - 1 = 0$', '$-x + 2y - 1 = 0$', '$x + 2y + 1 = 0$', '$2x + y - 1 = 0$'],
      answer: 0,
      hints: ['Qua $\\text{Đ}_{Ox}$, thay $y$ bởi $-y$ trong phương trình.'],
      solution:
        'Điểm $(x;\\ y)$ thuộc ảnh khi $(x;\\ -y)$ thuộc $\\Delta$: $x + 2(-y) - 1 = 0$, tức là $x - 2y - 1 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Ảnh của đường tròn $(x - 2)^2 + (y + 1)^2 = 4$ qua phép đối xứng trục $Oy$ là',
      options: [
        '$(x + 2)^2 + (y + 1)^2 = 4$',
        '$(x - 2)^2 + (y - 1)^2 = 4$',
        '$(x + 2)^2 + (y - 1)^2 = 4$',
        '$(x + 2)^2 + (y + 1)^2 = 2$',
      ],
      answer: 0,
      hints: ['Tìm ảnh của tâm $(2;\\ -1)$; bán kính giữ nguyên.'],
      solution:
        'Tâm $(2;\\ -1)$ biến thành $(-2;\\ -1)$, bán kính $2$. Ảnh là $(x + 2)^2 + (y + 1)^2 = 4$.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có bao nhiêu trục đối xứng?',
      answer: 4,
      hints: ['Kể cả các đường chéo.'],
      solution:
        'Hình vuông có $4$ trục đối xứng: hai đường thẳng nối trung điểm hai cạnh đối và hai đường chéo.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình có trục đối xứng.',
      options: [
        'Hình thang cân',
        'Tam giác đều',
        'Đường tròn',
        'Hình bình hành có hai cạnh kề dài $3$ cm và $5$ cm, một góc $60^\\circ$',
      ],
      answers: [0, 1, 2],
      hints: ['Một hình bình hành có trục đối xứng khi nó là hình chữ nhật hoặc hình thoi.'],
      solution:
        'Hình thang cân có $1$ trục, tam giác đều có $3$ trục, đường tròn có vô số trục. Hình bình hành có hai cạnh kề khác nhau và một góc $60^\\circ$ không là hình chữ nhật cũng không là hình thoi, nên không có trục đối xứng.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai điểm $A(1;\\ 1)$ và $B(4;\\ 2)$. Điểm $M$ trên trục $Ox$ làm cho $MA + MB$ nhỏ nhất có hoành độ bằng bao nhiêu?',
      answer: 2,
      hints: [
        "Lấy $A'$ đối xứng với $A$ qua $Ox$; khi đó $MA = MA'$.",
        "$M$ là giao điểm của đường thẳng $A'B$ với $Ox$.",
      ],
      solution:
        "$A'(1;\\ -1)$. Đường thẳng $A'B$ có vectơ chỉ phương $(3;\\ 3)$ nên có phương trình $y = x - 2$. Cho $y = 0$ được $x = 2$. Vậy $M(2;\\ 0)$ và giá trị nhỏ nhất là $A'B = 3\\sqrt{2}$.",
    },
    {
      type: 'choice',
      prompt:
        "Phép đối xứng qua đường thẳng $y = x$ biến $M(x;\\ y)$ thành $M'(y;\\ x)$. Ảnh của $N(2;\\ -3)$ là",
      options: ["$N'(-3;\\ 2)$", "$N'(3;\\ -2)$", "$N'(-2;\\ 3)$", "$N'(2;\\ 3)$"],
      answer: 0,
      hints: ['Đổi chỗ hoành độ và tung độ.'],
      solution:
        "$N'(-3;\\ 2)$. Kiểm tra: trung điểm $\\left(-\\dfrac12;\\ -\\dfrac12\\right)$ của $NN'$ nằm trên $y = x$ và $\\overrightarrow{NN'} = (-5;\\ 5)$ vuông góc với vectơ chỉ phương $(1;\\ 1)$ của $y = x$.",
    },
    {
      type: 'choice',
      prompt:
        "Phép đối xứng trục $\\text{Đ}_d$ biến đoạn thẳng $AB$ dài $7$ cm thành đoạn $A'B'$. Khẳng định nào đúng?",
      options: [
        "$A'B' = 7$ cm",
        "$A'B'$ luôn song song với $AB$",
        "$A'B' = 14$ cm",
        "$A'B'$ luôn vuông góc với $d$",
      ],
      answer: 0,
      hints: ['Phép đối xứng trục bảo toàn khoảng cách.'],
      solution:
        "Phép đối xứng trục bảo toàn khoảng cách nên $A'B' = AB = 7$ cm. Nói chung $A'B'$ không song song với $AB$ (chẳng hạn khi $AB$ cắt $d$ mà không vuông góc với $d$), và $A'B'$ chỉ vuông góc với $d$ khi $AB$ vuông góc với $d$.",
    },
  ],
  takeaways: [
    "$\\text{Đ}_d$: điểm thuộc $d$ đứng yên; điểm $M$ ngoài $d$ biến thành $M'$ với $d$ là trung trực của $MM'$.",
    '$\\text{Đ}_{Ox}: (x;\\ y) \\mapsto (x;\\ -y)$; $\\text{Đ}_{Oy}: (x;\\ y) \\mapsto (-x;\\ y)$.',
    'Phép đối xứng trục bảo toàn khoảng cách, biến đường tròn thành đường tròn cùng bán kính.',
    '$d$ là trục đối xứng của $\\mathcal{H}$ khi $\\text{Đ}_d(\\mathcal{H}) = \\mathcal{H}$.',
  ],
};
