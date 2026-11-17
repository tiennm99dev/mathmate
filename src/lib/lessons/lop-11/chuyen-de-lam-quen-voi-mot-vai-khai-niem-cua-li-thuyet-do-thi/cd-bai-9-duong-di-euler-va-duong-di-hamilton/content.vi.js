/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường đi Euler đi qua mỗi cạnh đúng một lần; đồ thị liên thông có chu trình Euler khi mọi đỉnh bậc chẵn, có đường đi Euler mà không có chu trình Euler khi có đúng hai đỉnh bậc lẻ. Đường đi Hamilton đi qua mỗi đỉnh đúng một lần; định lí Dirac và định lí Ore cho điều kiện đủ để có chu trình Hamilton.',
  intro:
    'Thành phố Königsberg có một con sông chảy qua, chia thành phố thành bốn vùng đất nối với nhau bởi bảy cây cầu. Người dân thắc mắc: có thể đi dạo qua mỗi cây cầu đúng một lần rồi trở về chỗ cũ không? Năm 1736, Euler trả lời câu hỏi đó, và lời giải của ông được xem là khởi đầu của lí thuyết đồ thị.',
  objectives: [
    'Nhận biết đường đi Euler, chu trình Euler và dùng định lí Euler để kiểm tra sự tồn tại của chúng.',
    'Tìm một đường đi hoặc chu trình Euler trong các đồ thị đơn giản.',
    'Nhận biết đường đi Hamilton, chu trình Hamilton và dùng định lí Dirac, định lí Ore.',
  ],
  sections: [
    {
      heading: 'Đường đi Euler',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường đi Euler trong đồ thị $G$ là đường đi qua tất cả các cạnh của $G$, mỗi cạnh đúng một lần. Chu trình Euler là đường đi Euler có đỉnh đầu trùng với đỉnh cuối.',
        },
        {
          type: 'p',
          text: 'Vẽ mỗi vùng đất của Königsberg là một đỉnh và mỗi cây cầu là một cạnh, ta được một đồ thị có $4$ đỉnh, $7$ cạnh (có cạnh bội). Đi qua mỗi cây cầu đúng một lần chính là tìm một đường đi Euler.',
        },
        {
          type: 'p',
          text: 'Mỗi lần đường đi đi qua một đỉnh (không phải đỉnh đầu hay đỉnh cuối), nó dùng một cạnh để vào và một cạnh khác để ra. Vì thế các đỉnh ở giữa phải có bậc chẵn; chỉ đỉnh đầu và đỉnh cuối có thể có bậc lẻ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Euler',
          text: 'Cho $G$ là một đồ thị liên thông. Khi đó $G$ có chu trình Euler khi và chỉ khi mọi đỉnh của $G$ đều có bậc chẵn; $G$ có đường đi Euler nhưng không có chu trình Euler khi và chỉ khi $G$ có đúng hai đỉnh bậc lẻ. Khi đó, mỗi đường đi Euler bắt đầu ở một đỉnh bậc lẻ và kết thúc ở đỉnh bậc lẻ còn lại.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tìm một đường đi Euler',
          text: 'Xuất phát từ một đỉnh bậc lẻ (nếu có), mỗi bước đi theo một cạnh chưa đi. Chỉ đi qua một cạnh mà khi bỏ nó, phần cạnh chưa đi bị tách làm hai phần không nối được với nhau, khi không còn lựa chọn nào khác. Cứ thế cho đến khi đi hết các cạnh.',
        },
      ],
    },
    {
      heading: 'Đường đi Hamilton',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường đi Hamilton trong đồ thị $G$ là đường đi qua tất cả các đỉnh của $G$, mỗi đỉnh đúng một lần. Chu trình Hamilton là chu trình đi qua tất cả các đỉnh, mỗi đỉnh đúng một lần (trừ đỉnh đầu trùng với đỉnh cuối).',
        },
        {
          type: 'p',
          text: 'Khác với đường đi Euler, chưa có một điều kiện cần và đủ đơn giản để nhận biết đồ thị có chu trình Hamilton. Hai định lí dưới đây chỉ cho các điều kiện đủ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Dirac',
          text: 'Nếu $G$ là đơn đồ thị có $n \\ge 3$ đỉnh và mọi đỉnh của $G$ đều có bậc không nhỏ hơn $\\dfrac{n}{2}$ thì $G$ có chu trình Hamilton.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Ore',
          text: 'Nếu $G$ là đơn đồ thị có $n \\ge 3$ đỉnh và $\\deg(u) + \\deg(v) \\ge n$ với mọi cặp đỉnh không kề nhau $u$, $v$ thì $G$ có chu trình Hamilton.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đây là các điều kiện đủ, không phải điều kiện cần. Chẳng hạn chu trình $ABCDEFA$ gồm $6$ đỉnh, mỗi đỉnh bậc $2 < 3$, không thoả mãn điều kiện của hai định lí nhưng bản thân nó là một chu trình Hamilton.',
        },
      ],
    },
    {
      heading: 'Dự án: Lộ trình quanh trường',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: vẽ đồ thị các lối đi quanh trường (hoặc khu phố) rồi trả lời hai câu hỏi: người quét dọn có thể đi qua mỗi lối đi đúng một lần không (đường đi Euler)? Bác bảo vệ có thể ghé mỗi điểm cần kiểm tra đúng một lần rồi về phòng trực không (chu trình Hamilton)?',
        },
        { type: 'p', text: 'Chuẩn bị: sơ đồ trường (tự vẽ hoặc in từ bản đồ), giấy, bút màu.' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn khoảng $6$ đến $8$ điểm (cổng, sân, nhà xe, thư viện, các dãy lớp...) làm đỉnh; mỗi lối đi nối hai điểm là một cạnh.',
            'Lập bảng bậc các đỉnh. Dùng định lí Euler để kết luận có chu trình Euler, đường đi Euler hay không có. Nếu có, vẽ nó bằng bút màu và đánh số thứ tự các cạnh.',
            'Nếu không có, tìm cách thêm ít lối đi nhất (hoặc cho phép đi lại một lối đi) để có chu trình Euler.',
            'Tìm một chu trình Hamilton xuất phát từ phòng trực. Kiểm tra xem đồ thị có thoả mãn định lí Dirac hoặc Ore không.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: sơ đồ đồ thị, bảng bậc, kết luận theo định lí Euler kèm đường đi tìm được, đề xuất thêm lối đi (nếu cần) và chu trình Hamilton của bác bảo vệ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ bằng một nét',
    instruction:
      'Chọn một đồ thị và một yêu cầu. Chạm lần lượt các đỉnh để đi: với Euler, mỗi cạnh chỉ đi một lần (các cạnh đã đi được tô đậm); với Hamilton, mỗi đỉnh chỉ qua một lần. Bị kẹt thì lùi lại hoặc làm lại; bật gợi ý để xem bậc các đỉnh và điều mà các định lí khẳng định.',
  },
  examples: [
    {
      problem:
        'Bài toán bảy cây cầu: đồ thị Königsberg có các đỉnh $A$ (hòn đảo giữa), $B$ (bờ bắc), $C$ (bờ nam), $D$ (vùng đất phía đông) và các cạnh $AB, AB, AC, AC, AD, BD, CD$. Có thể đi qua mỗi cây cầu đúng một lần không?',
      steps: [
        'Bậc các đỉnh: $\\deg(A) = 5$, $\\deg(B) = 3$, $\\deg(C) = 3$, $\\deg(D) = 3$.',
        'Đồ thị liên thông và có $4$ đỉnh bậc lẻ, nhiều hơn hai.',
        'Theo định lí Euler, đồ thị không có đường đi Euler, càng không có chu trình Euler.',
      ],
      answer: 'Không thể đi qua mỗi cây cầu đúng một lần.',
    },
    {
      problem:
        'Hình "phong bì" là đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, AC, BC, BD, CE, DE, BE, CD$. Có thể vẽ hình này bằng một nét (không nhấc bút, không tô lại nét nào) không? Nếu được, hãy chỉ ra một cách vẽ.',
      steps: [
        'Bậc các đỉnh: $\\deg(A) = 2$, $\\deg(B) = 4$, $\\deg(C) = 4$, $\\deg(D) = 3$, $\\deg(E) = 3$.',
        'Đồ thị liên thông, có đúng hai đỉnh bậc lẻ là $D$ và $E$, nên có đường đi Euler từ $D$ đến $E$ nhưng không có chu trình Euler.',
        'Xuất phát từ $D$: $D \\to B \\to A \\to C \\to B \\to E \\to C \\to D \\to E$, đi qua đủ $8$ cạnh, mỗi cạnh một lần.',
      ],
      answer: 'Vẽ được, bắt đầu ở $D$ và kết thúc ở $E$ (hoặc ngược lại), chẳng hạn $DBACBECDE$.',
    },
    {
      problem:
        'Ba nhà $A, C, E$ và ba trạm $B, D, F$; mỗi nhà có đường nối với cả ba trạm và không có đường nào khác. Chứng tỏ đồ thị này có chu trình Hamilton và chỉ ra một chu trình. Đồ thị có chu trình Euler không?',
      steps: [
        'Đây là đơn đồ thị có $n = 6$ đỉnh, mỗi đỉnh có bậc $3 = \\dfrac{6}{2}$.',
        'Theo định lí Dirac, đồ thị có chu trình Hamilton, chẳng hạn $ABCDEFA$ (các cạnh $AB, BC, CD, DE, EF, FA$ đều nối một nhà với một trạm).',
        'Cả $6$ đỉnh đều có bậc lẻ, nên theo định lí Euler đồ thị không có chu trình Euler (cũng không có đường đi Euler).',
      ],
      answer: 'Có chu trình Hamilton $ABCDEFA$; không có chu trình Euler.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Một đồ thị liên thông có $5$ đỉnh với bậc lần lượt là $2, 4, 4, 2, 6$. Khẳng định nào đúng?',
      options: [
        'Đồ thị có chu trình Euler.',
        'Đồ thị có đường đi Euler nhưng không có chu trình Euler.',
        'Đồ thị không có đường đi Euler.',
        'Chưa đủ thông tin để kết luận.',
      ],
      answer: 0,
      hints: ['Đếm số đỉnh bậc lẻ.'],
      solution:
        'Đồ thị liên thông và mọi đỉnh đều có bậc chẵn, nên theo định lí Euler nó có chu trình Euler.',
    },
    {
      type: 'multi',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, BC, CD, DA, AC, CE, DE$. Một đường đi Euler của đồ thị có thể bắt đầu ở những đỉnh nào?',
      options: ['$A$', '$B$', '$C$', '$D$', '$E$'],
      answers: [0, 3],
      hints: [
        'Tính bậc của từng đỉnh.',
        'Khi có đúng hai đỉnh bậc lẻ, đường đi Euler bắt đầu và kết thúc ở hai đỉnh đó.',
      ],
      solution:
        '$\\deg(A) = 3$, $\\deg(B) = 2$, $\\deg(C) = 4$, $\\deg(D) = 3$, $\\deg(E) = 2$. Đồ thị liên thông có đúng hai đỉnh bậc lẻ $A$ và $D$, nên đường đi Euler phải bắt đầu ở $A$ hoặc $D$, chẳng hạn $ABCADCED$.',
    },
    {
      type: 'number',
      prompt:
        'Ở Königsberg (bậc các vùng đất là $5, 3, 3, 3$), cần xây thêm ít nhất bao nhiêu cây cầu để có thể đi qua mỗi cây cầu đúng một lần rồi trở về chỗ cũ?',
      answer: 2,
      unit: 'cầu',
      hints: [
        'Mỗi cây cầu mới làm bậc của hai vùng đất ở hai đầu tăng thêm $1$.',
        'Cần mọi đỉnh có bậc chẵn; hiện có $4$ đỉnh bậc lẻ.',
      ],
      solution:
        'Mỗi cây cầu mới đổi tính chẵn lẻ của đúng hai đỉnh, nên một cây cầu chỉ làm bớt nhiều nhất hai đỉnh bậc lẻ; cần ít nhất $2$ cầu. Hai cầu là đủ: thêm cầu $AD$ và cầu $BC$, khi đó bậc là $6, 4, 4, 4$, đồ thị có chu trình Euler.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị đầy đủ nào dưới đây có chu trình Euler?',
      options: ['$K_5$', '$K_4$', '$K_6$', '$K_8$'],
      answer: 0,
      hints: ['Mỗi đỉnh của $K_n$ có bậc $n - 1$.'],
      solution:
        'Mỗi đỉnh của $K_n$ có bậc $n - 1$, chẵn khi $n$ lẻ. Trong các đồ thị đã cho, chỉ $K_5$ có mọi đỉnh bậc chẵn ($4$), nên chỉ $K_5$ có chu trình Euler.',
    },
    {
      type: 'choice',
      prompt:
        'Hình nơ gồm hai tam giác $ABC$ và $ADE$ có chung đỉnh $A$ (các cạnh $AB, AC, BC, AD, AE, DE$). Khẳng định nào đúng?',
      options: [
        'Có chu trình Euler nhưng không có chu trình Hamilton.',
        'Có cả chu trình Euler và chu trình Hamilton.',
        'Có chu trình Hamilton nhưng không có chu trình Euler.',
        'Không có chu trình Euler, cũng không có chu trình Hamilton.',
      ],
      answer: 0,
      hints: [
        'Tính bậc các đỉnh để xét chu trình Euler.',
        'Một chu trình Hamilton phải đi qua $A$ đúng một lần; nó đi từ tam giác này sang tam giác kia rồi quay về bằng cách nào?',
      ],
      solution:
        'Bậc các đỉnh là $4, 2, 2, 2, 2$, đều chẵn, đồ thị liên thông nên có chu trình Euler, chẳng hạn $ABCADEA$. Một chu trình qua cả $B$ và $D$ phải đi qua $A$ hai lần (mọi đường từ $\\{B, C\\}$ sang $\\{D, E\\}$ đều qua $A$), nên không có chu trình Hamilton.',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị có các đỉnh $A, B, C, D, E$ và các cạnh $AB, BC, CD, DE, EA, AC$. Dãy nào là một chu trình Hamilton?',
      options: ['$ABCDEA$', '$ACDEA$', '$ABCA$', '$ACBDEA$'],
      answer: 0,
      hints: [
        'Chu trình Hamilton qua đủ $5$ đỉnh, mỗi đỉnh một lần, và hai đỉnh liên tiếp phải kề nhau.',
      ],
      solution:
        '$ABCDEA$ đi qua các cạnh $AB, BC, CD, DE, EA$, qua mỗi đỉnh đúng một lần. $ACDEA$ và $ABCA$ bỏ sót đỉnh; $ACBDEA$ cần cạnh $BD$, không có.',
    },
    {
      type: 'number',
      prompt:
        'Theo định lí Dirac, một đơn đồ thị có $10$ đỉnh chắc chắn có chu trình Hamilton nếu mọi đỉnh có bậc ít nhất là bao nhiêu?',
      answer: 5,
      hints: ['Điều kiện của định lí Dirac là $\\deg(v) \\ge \\dfrac{n}{2}$.'],
      solution: 'Với $n = 10$, điều kiện là $\\deg(v) \\ge \\dfrac{10}{2} = 5$ với mọi đỉnh $v$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một đơn đồ thị có $7$ đỉnh, hai đỉnh $u$, $v$ không kề nhau và $\\deg(u) = 3$. Để cặp này thoả mãn điều kiện của định lí Ore, $\\deg(v)$ nhỏ nhất bằng bao nhiêu?',
      answer: 4,
      hints: ['Điều kiện của định lí Ore là $\\deg(u) + \\deg(v) \\ge n$.'],
      solution: 'Cần $3 + \\deg(v) \\ge 7$, tức là $\\deg(v) \\ge 4$.',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị gồm $8$ đỉnh và $12$ cạnh của một hình lập phương (mỗi đỉnh nối với $3$ đỉnh kề trên hình lập phương). Khẳng định nào đúng?',
      options: [
        'Có chu trình Hamilton nhưng không có đường đi Euler.',
        'Có chu trình Euler.',
        'Có đường đi Euler nhưng không có chu trình Euler.',
        'Không có chu trình Hamilton.',
      ],
      answer: 0,
      hints: [
        'Mọi đỉnh có bậc $3$: có bao nhiêu đỉnh bậc lẻ?',
        'Thử đi vòng quanh mặt trên, xuống mặt dưới, đi vòng mặt dưới rồi quay lên.',
      ],
      solution:
        'Cả $8$ đỉnh có bậc lẻ nên không có đường đi Euler. Gọi mặt trên là $ABCD$, mặt dưới là $EFGH$ ($A$ trên $E$, $B$ trên $F$...), chu trình $ABCDHGFEA$ qua mỗi đỉnh đúng một lần, là chu trình Hamilton.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Đường đi Euler đi qua mỗi cạnh của đồ thị đúng một lần.',
        'Chu trình Hamilton đi qua mỗi đỉnh đúng một lần (trừ đỉnh đầu trùng đỉnh cuối).',
        'Đồ thị liên thông có đúng một đỉnh bậc lẻ thì có đường đi Euler.',
        'Đơn đồ thị không thoả mãn điều kiện của định lí Dirac thì không có chu trình Hamilton.',
      ],
      answers: [0, 1],
      hints: [
        'Số đỉnh bậc lẻ của một đồ thị luôn là số chẵn.',
        'Định lí Dirac chỉ là điều kiện đủ.',
      ],
      solution:
        'Hai khẳng định đầu là định nghĩa. Không có đồ thị nào có đúng một đỉnh bậc lẻ (số đỉnh bậc lẻ luôn chẵn). Chu trình $ABCDEFA$ không thoả điều kiện Dirac nhưng vẫn là chu trình Hamilton.',
    },
  ],
  takeaways: [
    'Euler: qua mỗi cạnh đúng một lần; Hamilton: qua mỗi đỉnh đúng một lần.',
    'Đồ thị liên thông có chu trình Euler khi và chỉ khi mọi đỉnh bậc chẵn.',
    'Đồ thị liên thông có đường đi Euler mà không có chu trình Euler khi và chỉ khi có đúng hai đỉnh bậc lẻ; đường đi nối hai đỉnh đó.',
    'Dirac: đơn đồ thị $n \\ge 3$ đỉnh, mọi bậc $\\ge \\dfrac{n}{2}$ thì có chu trình Hamilton.',
    'Ore: đơn đồ thị $n \\ge 3$ đỉnh, $\\deg(u) + \\deg(v) \\ge n$ với mọi cặp không kề nhau thì có chu trình Hamilton.',
  ],
};
