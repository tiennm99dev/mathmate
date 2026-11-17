/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép biến hình trong mặt phẳng là quy tắc đặt tương ứng mỗi điểm M với một điểm M' xác định duy nhất; ảnh của một hình là tập hợp ảnh của mọi điểm thuộc hình đó.",
  intro:
    'Đặt một đồng xu lên tờ giấy rồi đẩy nó sang chỗ khác: mỗi điểm của đồng xu đi tới đúng một vị trí mới. Nhìn hình qua gương, phóng to một bức ảnh hay chiếu một vật lên mặt đất cũng vậy. Toán học gọi những quy tắc "mỗi điểm đi tới đúng một điểm" như thế là phép biến hình.',
  objectives: [
    'Nhận biết một quy tắc có phải là phép biến hình hay không.',
    "Tìm ảnh $M' = F(M)$ của một điểm qua một phép biến hình cho bằng lời hoặc bằng toạ độ.",
    'Xác định ảnh của một hình qua một phép biến hình.',
  ],
  sections: [
    {
      heading: 'Phép biến hình',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Quy tắc đặt tương ứng mỗi điểm $M$ của mặt phẳng với một điểm xác định duy nhất $M'$ của mặt phẳng đó được gọi là một phép biến hình trong mặt phẳng.",
        },
        {
          type: 'p',
          text: "Nếu kí hiệu phép biến hình là $F$ thì ta viết $F(M) = M'$ hay $M' = F(M)$ và gọi $M'$ là ảnh của điểm $M$ qua phép biến hình $F$.",
        },
        {
          type: 'list',
          items: [
            'Mỗi điểm $M$ phải có ảnh, và chỉ có đúng một ảnh. Một quy tắc cho một điểm hai ảnh, hoặc để một điểm không có ảnh, thì không phải là phép biến hình.',
            'Hai điểm khác nhau có thể có cùng một ảnh. Chẳng hạn quy tắc biến mỗi điểm thành hình chiếu vuông góc của nó trên một đường thẳng $d$ là một phép biến hình, và mọi điểm trên một đường vuông góc với $d$ có chung một ảnh.',
            'Phép biến hình biến mỗi điểm $M$ thành chính nó được gọi là phép đồng nhất.',
          ],
        },
        {
          type: 'p',
          text: "Trong mặt phẳng toạ độ $Oxy$, một phép biến hình thường được cho bằng biểu thức toạ độ: điểm $M(x;\\ y)$ biến thành điểm $M'(x';\\ y')$ với $x'$, $y'$ tính được từ $x$, $y$. Ví dụ quy tắc $M(x;\\ y) \\mapsto M'(x + 1;\\ y + 2)$ là một phép biến hình, vì mỗi cặp $(x;\\ y)$ cho đúng một cặp $(x + 1;\\ y + 2)$.",
        },
      ],
    },
    {
      heading: 'Ảnh của một hình qua một phép biến hình',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ảnh của một hình',
          text: "Cho phép biến hình $F$ và hình $\\mathcal{H}$. Tập hợp các điểm $M' = F(M)$, với $M$ thuộc $\\mathcal{H}$, tạo thành một hình $\\mathcal{H}'$, gọi là ảnh của hình $\\mathcal{H}$ qua phép biến hình $F$. Kí hiệu $\\mathcal{H}' = F(\\mathcal{H})$.",
        },
        {
          type: 'p',
          text: 'Ảnh của một hình có thể giữ nguyên hình dạng và kích thước (khi hình chỉ trượt, lật hay xoay), có thể giữ hình dạng nhưng đổi kích thước (phóng to, thu nhỏ), cũng có thể bị "bẹp" thành một hình khác hẳn, như tam giác bị chiếu thành một đoạn thẳng.',
        },
        {
          type: 'table',
          head: ['Quy tắc', 'Ảnh của $A(1;\\ 1)$', 'Ảnh của tam giác $ABC$'],
          rows: [
            ["$M'(x + 2;\\ y + 1)$", '$(3;\\ 2)$', 'tam giác bằng tam giác $ABC$, trượt đi'],
            ["$M'(-x;\\ y)$", '$(-1;\\ 1)$', 'tam giác bằng tam giác $ABC$, bị lật'],
            ["$M'(2x;\\ 2y)$", '$(2;\\ 2)$', 'tam giác có các cạnh dài gấp đôi'],
            ["$M'(x;\\ 0)$", '$(1;\\ 0)$', 'một đoạn thẳng trên trục $Ox$'],
          ],
          caption:
            'Ảnh của tam giác $ABC$ với $A(1;\\ 1)$, $B(3;\\ 1)$, $C(1;\\ 2)$ qua bốn quy tắc.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm ảnh của một đa giác',
          text: 'Với các phép biến hình biến đoạn thẳng thành đoạn thẳng (sẽ gặp trong các bài sau), muốn tìm ảnh của một đa giác ta chỉ cần tìm ảnh của các đỉnh rồi nối lại theo đúng thứ tự.',
        },
      ],
    },
    {
      heading: 'Dự án: Phép biến hình quanh ta',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm trong đời sống những hình được tạo ra từ một hình khác bằng một quy tắc biến hình, và mô tả quy tắc đó bằng toạ độ.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: điện thoại để chụp ảnh, giấy kẻ ô vuông, thước kẻ, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chụp ba hình ảnh có các phần "giống nhau": hoa văn gạch lát, hình phản chiếu dưới nước, bông hoa nhiều cánh, ảnh phóng to của một bức ảnh nhỏ...',
            'Với mỗi ảnh, chọn hai phần giống nhau, vẽ lại lên giấy kẻ ô và gắn một hệ trục $Oxy$.',
            "Ghi toạ độ của ba điểm đặc biệt trên phần thứ nhất và của ba điểm tương ứng trên phần thứ hai, rồi đoán quy tắc $M(x;\\ y) \\mapsto M'(x';\\ y')$.",
            'Kiểm tra quy tắc đã đoán với một điểm thứ tư.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: ba bức ảnh, hình vẽ trên giấy kẻ ô, bảng toạ độ các cặp điểm tương ứng và quy tắc biến hình tìm được; nêu quy tắc nào giữ nguyên kích thước của hình, quy tắc nào không.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ biến hình',
    instruction:
      "Chọn một quy tắc rồi kéo điểm $M$ (hoặc dùng phím mũi tên). Quan sát ảnh $M'$ và ảnh của tam giác $ABC$: quy tắc nào giữ nguyên hình dạng, quy tắc nào làm hình bẹp đi?",
  },
  examples: [
    {
      problem:
        "Trong mặt phẳng $Oxy$, cho phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành điểm $M'(x + 1;\\ y + 2)$. Tìm ảnh của các điểm $A(1;\\ -1)$ và $B(-2;\\ 3)$.",
      steps: [
        "Theo quy tắc, $x' = x + 1$ và $y' = y + 2$.",
        "Với $A(1;\\ -1)$: $x' = 1 + 1 = 2$, $y' = -1 + 2 = 1$, nên $A' = F(A) = (2;\\ 1)$.",
        "Với $B(-2;\\ 3)$: $x' = -2 + 1 = -1$, $y' = 3 + 2 = 5$, nên $B' = F(B) = (-1;\\ 5)$.",
      ],
      answer: "$A'(2;\\ 1)$ và $B'(-1;\\ 5)$.",
    },
    {
      problem:
        "Trong mặt phẳng $Oxy$, phép biến hình $f$ biến điểm $I(1;\\ 2)$ thành chính nó và biến mỗi điểm $M$ khác $I$ thành điểm $M'$ sao cho $I$ là trung điểm của $MM'$. Tìm ảnh của điểm $A(3;\\ -2)$.",
      steps: [
        "Gọi $A'(x';\\ y')$. Vì $I$ là trung điểm của $AA'$ nên $\\dfrac{3 + x'}{2} = 1$ và $\\dfrac{-2 + y'}{2} = 2$.",
        "Suy ra $x' = 2 - 3 = -1$ và $y' = 4 + 2 = 6$.",
      ],
      answer: "$A' = f(A) = (-1;\\ 6)$.",
    },
    {
      problem:
        "Cho phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(x;\\ 0)$. Tìm ảnh của đoạn thẳng $AB$ với $A(1;\\ 2)$, $B(4;\\ -1)$. Hai điểm $A$ và $C(1;\\ -5)$ có ảnh như thế nào?",
      steps: [
        '$F$ biến mỗi điểm thành hình chiếu của nó trên trục $Ox$, nên $F(A) = (1;\\ 0)$, $F(B) = (4;\\ 0)$.',
        'Mỗi điểm của đoạn $AB$ có hoành độ từ $1$ đến $4$ và mỗi hoành độ đó đều xuất hiện, nên ảnh của đoạn $AB$ là đoạn thẳng nối $(1;\\ 0)$ và $(4;\\ 0)$ trên $Ox$.',
        '$F(C) = (1;\\ 0) = F(A)$: hai điểm khác nhau có cùng một ảnh.',
      ],
      answer:
        'Ảnh của $AB$ là đoạn thẳng nối $(1;\\ 0)$ và $(4;\\ 0)$; $A$ và $C$ có chung ảnh $(1;\\ 0)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(x + 1;\\ y + 2)$. Ảnh của điểm $A(2;\\ -3)$ là",
      options: ["$A'(3;\\ -1)$", "$A'(1;\\ -5)$", "$A'(3;\\ -5)$", "$A'(2;\\ -1)$"],
      answer: 0,
      hints: ['Cộng $1$ vào hoành độ và cộng $2$ vào tung độ của $A$.'],
      solution: "$x' = 2 + 1 = 3$, $y' = -3 + 2 = -1$, nên $A'(3;\\ -1)$.",
    },
    {
      type: 'choice',
      prompt:
        "Phép biến hình $f$ giữ nguyên điểm $I(1;\\ 2)$ và biến mỗi điểm $M$ khác $I$ thành $M'$ sao cho $I$ là trung điểm của $MM'$. Ảnh của $B(-3;\\ 5)$ là",
      options: ["$B'(5;\\ -1)$", "$B'(-1;\\ 3{,}5)$", "$B'(4;\\ -3)$", "$B'(3;\\ -5)$"],
      answer: 0,
      hints: ["$I$ là trung điểm của $BB'$ nên $x' = 2x_I - x_B$ và $y' = 2y_I - y_B$."],
      solution: "$x' = 2 \\cdot 1 - (-3) = 5$, $y' = 2 \\cdot 2 - 5 = -1$, nên $B'(5;\\ -1)$.",
    },
    {
      type: 'choice',
      prompt: 'Quy tắc nào sau đây không phải là một phép biến hình trong mặt phẳng?',
      options: [
        "Mỗi điểm $M$ ứng với mọi điểm $M'$ sao cho $MM' = 1$.",
        "Mỗi điểm $M(x;\\ y)$ ứng với điểm $M'(x;\\ 0)$.",
        'Mỗi điểm $M$ ứng với chính nó.',
        "Mỗi điểm $M(x;\\ y)$ ứng với điểm $M'(-y;\\ x)$.",
      ],
      answer: 0,
      hints: ['Một phép biến hình cho mỗi điểm đúng một ảnh.'],
      solution:
        "Các điểm $M'$ với $MM' = 1$ tạo thành cả một đường tròn tâm $M$ bán kính $1$: mỗi điểm $M$ ứng với vô số điểm, nên quy tắc này không phải là phép biến hình. Ba quy tắc còn lại đều cho mỗi điểm đúng một ảnh.",
    },
    {
      type: 'choice',
      prompt:
        "Phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(x;\\ 0)$. Có bao nhiêu điểm có ảnh là điểm $(2;\\ 0)$?",
      options: ['Vô số', 'Đúng một', 'Đúng hai', 'Không có điểm nào'],
      answer: 0,
      hints: ['Điểm $M(x;\\ y)$ có ảnh $(2;\\ 0)$ khi nào?'],
      solution:
        'Ảnh của $M(x;\\ y)$ là $(2;\\ 0)$ khi và chỉ khi $x = 2$, còn $y$ tuỳ ý. Mọi điểm của đường thẳng $x = 2$ đều có ảnh $(2;\\ 0)$, nên có vô số điểm như vậy.',
    },
    {
      type: 'choice',
      prompt:
        "Phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(-x;\\ y)$. Điểm nào sau đây biến thành chính nó?",
      options: ['$(0;\\ 5)$', '$(5;\\ 0)$', '$(1;\\ 1)$', '$(-2;\\ 2)$'],
      answer: 0,
      hints: ['$M$ biến thành chính nó khi $-x = x$.'],
      solution:
        '$-x = x \\Leftrightarrow x = 0$: các điểm biến thành chính nó là các điểm trên trục $Oy$. Trong bốn điểm, chỉ có $(0;\\ 5)$ nằm trên $Oy$.',
    },
    {
      type: 'number',
      prompt:
        "Phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(x + 1;\\ y + 2)$. Điểm $N$ có ảnh là $N'(4;\\ 1)$. Tìm hoành độ của $N$.",
      answer: 3,
      hints: ['Giải $x + 1 = 4$.'],
      solution:
        'Từ $x + 1 = 4$ và $y + 2 = 1$ ta có $x = 3$, $y = -1$. Vậy $N(3;\\ -1)$, hoành độ của $N$ là $3$.',
    },
    {
      type: 'number',
      prompt:
        "Phép biến hình $F$ biến mỗi điểm $M(x;\\ y)$ thành $M'(2x;\\ 2y)$. Cho $A(1;\\ 1)$ và $B(4;\\ 5)$. Tính độ dài đoạn $A'B'$ nối ảnh của $A$ và $B$.",
      answer: 10,
      hints: ["Tìm $A'$ và $B'$ rồi dùng công thức khoảng cách.", '$AB = 5$.'],
      solution:
        "$A'(2;\\ 2)$, $B'(8;\\ 10)$, nên $A'B' = \\sqrt{6^2 + 8^2} = 10$, gấp đôi $AB = \\sqrt{3^2 + 4^2} = 5$.",
    },
    {
      type: 'choice',
      prompt: 'Phép đồng nhất biến tam giác $ABC$ thành',
      options: [
        'chính tam giác $ABC$',
        'một tam giác bằng tam giác $ABC$ nằm ở chỗ khác',
        'một điểm',
        'một đoạn thẳng',
      ],
      answer: 0,
      hints: ['Phép đồng nhất biến mỗi điểm thành chính nó.'],
      solution:
        'Phép đồng nhất biến mỗi điểm của tam giác thành chính nó, nên ảnh của tam giác $ABC$ là chính nó.',
    },
  ],
  takeaways: [
    "Phép biến hình: mỗi điểm $M$ ứng với đúng một điểm $M' = F(M)$, gọi là ảnh của $M$.",
    'Hai điểm khác nhau có thể có chung một ảnh; phép đồng nhất biến mỗi điểm thành chính nó.',
    "Ảnh của hình $\\mathcal{H}$ là tập hợp ảnh của mọi điểm thuộc $\\mathcal{H}$: $\\mathcal{H}' = F(\\mathcal{H})$.",
    "Trong mặt phẳng $Oxy$, phép biến hình thường được cho bằng biểu thức toạ độ $M(x;\\ y) \\mapsto M'(x';\\ y')$.",
  ],
};
