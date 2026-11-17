/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    "Phép đồng dạng tỉ số k (k > 0) biến hai điểm M, N thành M', N' với M'N' = k.MN; phép dời hình và phép vị tự là những phép đồng dạng; hai hình đồng dạng khi có một phép đồng dạng biến hình này thành hình kia.",
  intro:
    'Hai bức ảnh Dinh Thống Nhất, một nhỏ một lớn, có cùng hình dạng nhưng khác kích thước. Bức lớn có thể không đặt "thẳng hàng" với bức nhỏ như trong phép vị tự: nó có thể bị dịch đi, xoay đi. Phép biến hình mô tả chung các trường hợp đó là phép đồng dạng.',
  objectives: [
    'Phát biểu định nghĩa phép đồng dạng tỉ số $k$ và nhận biết các phép đồng dạng đã học.',
    'Biết rằng thực hiện liên tiếp hai phép đồng dạng được một phép đồng dạng, với tỉ số là tích hai tỉ số.',
    'Nắm các tính chất của phép đồng dạng.',
    'Hiểu khái niệm hai hình đồng dạng và chỉ ra phép đồng dạng biến hình này thành hình kia.',
  ],
  sections: [
    {
      heading: 'Phép đồng dạng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: "Phép biến hình $F$ được gọi là phép đồng dạng tỉ số $k$ ($k > 0$) nếu với hai điểm $M$, $N$ bất kì và ảnh $M'$, $N'$ tương ứng của chúng, ta luôn có $M'N' = k \\cdot MN$.",
        },
        {
          type: 'list',
          items: [
            'Phép dời hình là phép đồng dạng tỉ số $1$.',
            'Phép vị tự tỉ số $k$ là phép đồng dạng tỉ số $|k|$.',
            'Thực hiện liên tiếp phép đồng dạng tỉ số $k$ và phép đồng dạng tỉ số $p$ ta được phép đồng dạng tỉ số $pk$.',
          ],
        },
        {
          type: 'p',
          text: "Chẳng hạn, thực hiện liên tiếp phép vị tự $V_{(O,\\ 3)}$ và phép đối xứng trục $Ox$ ta được phép đồng dạng tỉ số $3$, biến $M(x;\\ y)$ thành $M'(3x;\\ -3y)$.",
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
          text: 'Phép đồng dạng tỉ số $k$ biến ba điểm thẳng hàng thành ba điểm thẳng hàng và không làm thay đổi thứ tự giữa chúng; biến đường thẳng thành đường thẳng, tia thành tia, đoạn thẳng thành đoạn thẳng có độ dài gấp $k$ lần; biến tam giác thành tam giác đồng dạng với nó theo tỉ số $k$; biến góc thành góc bằng nó; biến đường tròn bán kính $R$ thành đường tròn bán kính $kR$.',
        },
        {
          type: 'p',
          text: 'Mọi phép đồng dạng tỉ số $k$ đều là kết quả của việc thực hiện liên tiếp một phép vị tự tỉ số $k$ và một phép dời hình. Vì vậy, để biến một hình thành một hình đồng dạng với nó, ta phóng to hoặc thu nhỏ bằng một phép vị tự, rồi đặt hình vào đúng chỗ bằng các phép tịnh tiến, đối xứng, quay.',
        },
        {
          type: 'p',
          text: 'Chu vi của một đa giác được nhân với $k$, diện tích được nhân với $k^2$.',
        },
      ],
    },
    {
      heading: 'Hai hình đồng dạng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai hình được gọi là đồng dạng với nhau nếu có một phép đồng dạng biến hình này thành hình kia.',
        },
        {
          type: 'list',
          items: [
            'Hai tam giác đồng dạng theo nghĩa đã học (các góc tương ứng bằng nhau, các cạnh tương ứng tỉ lệ) là hai hình đồng dạng.',
            'Hai đường tròn bất kì luôn đồng dạng; hai hình vuông bất kì luôn đồng dạng.',
            'Hai hình bằng nhau là hai hình đồng dạng (tỉ số $1$).',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Hình tự đồng dạng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dựng tam giác Sierpiński, một hình gồm ba phần, mỗi phần đồng dạng với cả hình theo tỉ số $\\dfrac{1}{2}$, và tìm các phép đồng dạng biến cả hình thành từng phần.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô vuông hoặc giấy trắng khổ lớn, thước, bút màu; có thể dùng phần mềm vẽ hình như GeoGebra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ một tam giác đều cạnh $16$ cm. Nối trung điểm ba cạnh và bỏ (tô trắng) tam giác ở giữa.',
            'Lặp lại bước trên với mỗi tam giác còn lại, ít nhất bốn lần.',
            'Chỉ ra ba phép vị tự tỉ số $\\dfrac{1}{2}$ (tâm là ba đỉnh) biến cả hình thành ba phần của nó.',
            'Lập bảng: sau mỗi bước, số tam giác được tô, cạnh của mỗi tam giác và tổng diện tích phần được tô (theo diện tích ban đầu).',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: hình vẽ hoàn chỉnh, bảng số liệu, nhận xét về tổng diện tích phần được tô khi số bước tăng lên (mỗi bước nhân với $\\dfrac{3}{4}$), và một ví dụ khác về hình tự đồng dạng trong tự nhiên (lá dương xỉ, súp lơ romanesco).',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép vị tự và dời hình',
    instruction:
      'Bấm các nút để thực hiện liên tiếp phép vị tự tâm $O$, phép đối xứng trục, phép quay và phép tịnh tiến (chọn $a$, $b$ cho $\\vec u = (a;\\ b)$). Mục tiêu: đưa tam giác $ABC$ chồng khít lên tam giác đích. Theo dõi tỉ số đồng dạng: chỉ phép vị tự làm nó thay đổi.',
  },
  examples: [
    {
      problem:
        "Trong mặt phẳng $Oxy$, cho phép biến hình $f$ biến mỗi điểm $M(x;\\ y)$ thành $M'(3x;\\ -3y)$. Chứng minh $f$ là phép đồng dạng và tìm tỉ số của nó. Tìm ảnh của $A(1;\\ 2)$.",
      steps: [
        "Với $M(x_1;\\ y_1)$, $N(x_2;\\ y_2)$: $M'(3x_1;\\ -3y_1)$, $N'(3x_2;\\ -3y_2)$.",
        "$M'N'^2 = 9(x_2 - x_1)^2 + 9(y_2 - y_1)^2 = 9MN^2$, nên $M'N' = 3MN$.",
        '$f$ là thực hiện liên tiếp $V_{(O,\\ 3)}$ và $\\text{Đ}_{Ox}$.',
        '$f(A) = (3;\\ -6)$.',
      ],
      answer: "$f$ là phép đồng dạng tỉ số $3$; $A'(3;\\ -6)$.",
    },
    {
      problem:
        'Tìm ảnh của $M(1;\\ 3)$ qua phép đồng dạng có được bằng cách thực hiện liên tiếp phép vị tự $V_{(O,\\ -2)}$ và phép quay $Q_{(O,\\ 90^\\circ)}$. Phép đồng dạng đó có tỉ số bao nhiêu?',
      steps: [
        '$V_{(O,\\ -2)}$ biến $M$ thành $M_1(-2;\\ -6)$.',
        "$Q_{(O,\\ 90^\\circ)}$ biến $(x;\\ y)$ thành $(-y;\\ x)$, nên biến $M_1$ thành $M'(6;\\ -2)$.",
        'Tỉ số: $|-2| \\cdot 1 = 2$.',
      ],
      answer: "$M'(6;\\ -2)$, phép đồng dạng tỉ số $2$.",
    },
    {
      problem: 'Chứng minh hai đường tròn bất kì $(I_1;\\ R_1)$ và $(I_2;\\ R_2)$ luôn đồng dạng.',
      steps: [
        'Phép tịnh tiến theo $\\overrightarrow{I_1I_2}$ biến $(I_1;\\ R_1)$ thành $(I_2;\\ R_1)$.',
        'Phép vị tự $V_{\\left(I_2,\\ \\frac{R_2}{R_1}\\right)}$ biến $(I_2;\\ R_1)$ thành $(I_2;\\ R_2)$.',
        'Thực hiện liên tiếp hai phép trên được một phép đồng dạng tỉ số $\\dfrac{R_2}{R_1}$.',
      ],
      answer: 'Hai đường tròn bất kì đồng dạng, với tỉ số $\\dfrac{R_2}{R_1}$.',
    },
    {
      problem:
        "Tam giác $ABC$ có $AB = 3$, $BC = 4$, $CA = 5$. Một phép đồng dạng tỉ số $2$ biến nó thành tam giác $A'B'C'$. Tính chu vi và diện tích tam giác $A'B'C'$.",
      steps: [
        "Các cạnh nhân với $2$: $A'B' = 6$, $B'C' = 8$, $C'A' = 10$, chu vi $24$.",
        "$6^2 + 8^2 = 10^2$ nên $A'B'C'$ vuông tại $B'$, diện tích $\\dfrac{1}{2} \\cdot 6 \\cdot 8 = 24$.",
        'Kiểm tra: diện tích $ABC$ là $6$, nhân với $k^2 = 4$ được $24$.',
      ],
      answer: 'Chu vi $24$, diện tích $24$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Phép biến hình $f$ biến mỗi điểm $M(x;\\ y)$ thành $M'(2x;\\ 2y + 1)$. Biết $f$ là một phép đồng dạng, tìm tỉ số của nó.",
      answer: 2,
      hints: ['$f$ là $V_{(O,\\ 2)}$ rồi tịnh tiến theo $(0;\\ 1)$.'],
      solution:
        "Thực hiện liên tiếp $V_{(O,\\ 2)}$ (tỉ số $2$) và phép tịnh tiến (tỉ số $1$) được phép đồng dạng tỉ số $2$. Kiểm tra: $M'N'^2 = 4(x_2 - x_1)^2 + 4(y_2 - y_1)^2 = 4MN^2$.",
    },
    {
      type: 'fraction',
      prompt:
        'Thực hiện liên tiếp phép vị tự $V_{(O,\\ -3)}$ và một phép đồng dạng tỉ số $\\dfrac{1}{2}$, ta được phép đồng dạng tỉ số bao nhiêu?',
      answer: [3, 2],
      hints: ['Phép vị tự tỉ số $-3$ là phép đồng dạng tỉ số $|-3| = 3$.', 'Nhân hai tỉ số.'],
      solution: 'Tỉ số là $3 \\cdot \\dfrac{1}{2} = \\dfrac{3}{2}$.',
    },
    {
      type: 'number',
      prompt:
        "Một phép đồng dạng biến đoạn thẳng $AB = 4$ cm thành đoạn thẳng $A'B' = 10$ cm. Tìm tỉ số đồng dạng $k$.",
      answer: 2.5,
      hints: ["$A'B' = k \\cdot AB$."],
      solution: '$k = \\dfrac{10}{4} = 2{,}5$.',
    },
    {
      type: 'number',
      prompt:
        "Tam giác $ABC$ có chu vi $12$ cm. Một phép đồng dạng tỉ số $3$ biến nó thành tam giác $A'B'C'$. Tính chu vi tam giác $A'B'C'$.",
      answer: 36,
      unit: 'cm',
      hints: ['Mỗi cạnh được nhân với $3$.'],
      solution: 'Chu vi mới $3 \\cdot 12 = 36$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Tam giác $ABC$ có diện tích $10$. Một phép đồng dạng tỉ số $3$ biến nó thành tam giác $A'B'C'$. Tính diện tích tam giác $A'B'C'$.",
      answer: 90,
      hints: ['Cạnh đáy và đường cao đều được nhân với $3$.'],
      solution: 'Diện tích được nhân với $k^2 = 9$: $9 \\cdot 10 = 90$.',
    },
    {
      type: 'choice',
      prompt:
        'Thực hiện liên tiếp phép vị tự $V_{(O,\\ 2)}$ và phép đối xứng trục $Oy$, điểm $M(1;\\ -2)$ biến thành',
      options: ['$(-2;\\ -4)$', '$(2;\\ 4)$', '$(-2;\\ 4)$', '$(-1;\\ -4)$'],
      answer: 0,
      hints: ['Làm lần lượt: vị tự trước, rồi đổi dấu hoành độ.'],
      solution: '$V_{(O,\\ 2)}(M) = (2;\\ -4)$, rồi $\\text{Đ}_{Oy}$ cho $(-2;\\ -4)$.',
    },
    {
      type: 'choice',
      prompt:
        "Phép đồng dạng $f$ biến $M(x;\\ y)$ thành $M'(3x;\\ -3y)$. Ảnh của đường tròn $x^2 + y^2 = 4$ qua $f$ là",
      options: [
        '$x^2 + y^2 = 36$',
        '$x^2 + y^2 = 12$',
        '$x^2 + y^2 = 4$',
        '$(x - 3)^2 + (y + 3)^2 = 4$',
      ],
      answer: 0,
      hints: [
        'Đường tròn có tâm $O$, bán kính $2$. Tâm biến thành đâu, bán kính được nhân với mấy?',
      ],
      solution:
        '$f$ là phép đồng dạng tỉ số $3$ giữ nguyên $O$, nên ảnh là đường tròn tâm $O$, bán kính $3 \\cdot 2 = 6$: $x^2 + y^2 = 36$.',
    },
    {
      type: 'choice',
      prompt: 'Hai hình nào sau đây luôn đồng dạng với nhau?',
      options: [
        'Hai hình vuông bất kì',
        'Hai hình chữ nhật bất kì',
        'Hai tam giác cân bất kì',
        'Hai hình thoi bất kì',
      ],
      answer: 0,
      hints: [
        'Hai hình đồng dạng phải có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.',
      ],
      solution:
        'Hai hình vuông cạnh $a$ và $b$: tịnh tiến, quay để chúng chung tâm và cùng hướng, rồi dùng phép vị tự tỉ số $\\dfrac{b}{a}$. Hai hình chữ nhật có thể khác tỉ lệ dài–rộng, hai tam giác cân hay hai hình thoi có thể khác góc, nên không luôn đồng dạng.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: [
        'Phép đồng dạng tỉ số $k$ biến góc thành góc có số đo gấp $k$ lần.',
        'Phép dời hình là phép đồng dạng tỉ số $1$.',
        'Phép vị tự tỉ số $-2$ là phép đồng dạng tỉ số $2$.',
        'Hai đường tròn bất kì luôn đồng dạng.',
      ],
      answer: 0,
      hints: ['Phép đồng dạng thay đổi độ dài; còn góc thì sao?'],
      solution:
        'Phép đồng dạng biến góc thành góc bằng nó, không thay đổi số đo góc. Ba khẳng định còn lại đều đúng.',
    },
  ],
  takeaways: [
    "Phép đồng dạng tỉ số $k > 0$: $M'N' = k \\cdot MN$ với mọi $M$, $N$.",
    'Phép dời hình có tỉ số $1$, phép vị tự tỉ số $k$ có tỉ số $|k|$; ghép hai phép đồng dạng thì nhân các tỉ số.',
    'Phép đồng dạng giữ thẳng hàng và góc; độ dài nhân $k$, diện tích nhân $k^2$.',
    'Hai hình đồng dạng khi có một phép đồng dạng (một phép vị tự rồi một phép dời hình) biến hình này thành hình kia.',
  ],
};
