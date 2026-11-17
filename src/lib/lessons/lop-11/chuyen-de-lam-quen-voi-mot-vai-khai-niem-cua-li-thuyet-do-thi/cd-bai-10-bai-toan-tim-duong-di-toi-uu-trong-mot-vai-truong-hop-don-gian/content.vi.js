/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đồ thị có trọng số gán cho mỗi cạnh một số không âm; độ dài đường đi là tổng trọng số các cạnh. Thuật toán gắn nhãn (thuật toán Dijkstra) tìm đường đi ngắn nhất từ một đỉnh; bài toán người đưa thư tìm chu trình ngắn nhất đi qua mọi cạnh.',
  intro:
    'Ứng dụng bản đồ trên điện thoại chỉ trong nháy mắt đã tìm được đường ngắn nhất giữa hai địa điểm, dù có hàng nghìn ngã rẽ. Bí quyết nằm ở một thuật toán rất gọn: lần lượt "chốt" khoảng cách ngắn nhất tới từng địa điểm, bắt đầu từ những nơi gần nhất.',
  objectives: [
    'Nhận biết đồ thị có trọng số và tính độ dài của một đường đi.',
    'Dùng thuật toán gắn nhãn (Dijkstra) để tìm đường đi ngắn nhất giữa hai đỉnh.',
    'Giải bài toán người đưa thư khi đồ thị có không quá hai đỉnh bậc lẻ.',
  ],
  sections: [
    {
      heading: 'Bài toán tìm đường đi ngắn nhất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồ thị có trọng số',
          text: 'Đồ thị có trọng số là đồ thị mà mỗi cạnh $e$ được gán một số không âm $w(e)$, gọi là trọng số (hay độ dài) của cạnh. Độ dài của một đường đi là tổng trọng số các cạnh của nó. Đường đi ngắn nhất từ $u$ đến $v$ là đường đi từ $u$ đến $v$ có độ dài nhỏ nhất.',
        },
        {
          type: 'p',
          text: 'Trọng số có thể là quãng đường, thời gian hay chi phí đi lại. Với đồ thị nhỏ ta có thể liệt kê mọi đường đi rồi so sánh, nhưng số đường đi tăng rất nhanh; thuật toán gắn nhãn dưới đây làm việc đó có hệ thống.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thuật toán gắn nhãn (Dijkstra)',
          text: 'Tìm đường đi ngắn nhất từ đỉnh $s$ tới các đỉnh khác của một đồ thị có trọng số không âm. Mỗi đỉnh mang một nhãn: nhãn tạm thời có thể còn giảm, nhãn vĩnh viễn $l(v)$ thì không đổi nữa.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gán cho $s$ nhãn vĩnh viễn $l(s) = 0$. Mỗi đỉnh $u$ kề $s$ nhận nhãn tạm thời $w(su)$; các đỉnh còn lại nhận nhãn $\\infty$.',
            'Trong các đỉnh chưa có nhãn vĩnh viễn, chọn đỉnh $v$ có nhãn tạm thời nhỏ nhất và biến nhãn đó thành nhãn vĩnh viễn $l(v)$.',
            'Với mỗi đỉnh $u$ kề $v$ chưa có nhãn vĩnh viễn: nếu $l(v) + w(vu)$ nhỏ hơn nhãn tạm thời của $u$ thì thay nhãn của $u$ bằng $l(v) + w(vu)$ và ghi lại rằng nhãn này đến từ $v$.',
            'Lặp lại bước 2 và bước 3 cho đến khi đỉnh đích (hoặc mọi đỉnh) có nhãn vĩnh viễn.',
          ],
        },
        {
          type: 'p',
          text: 'Khi thuật toán dừng, nhãn vĩnh viễn $l(v)$ là độ dài đường đi ngắn nhất từ $s$ đến $v$. Để tìm chính đường đi, xuất phát từ $v$ và đi ngược lại theo đỉnh đã cho mỗi nhãn, cho đến khi về $s$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao nhãn vĩnh viễn là đúng?',
          text: 'Mọi trọng số đều không âm. Đỉnh $v$ có nhãn tạm thời nhỏ nhất không thể được nối tới bằng một đường ngắn hơn đi qua một đỉnh chưa chốt khác, vì riêng đoạn tới đỉnh đó đã dài ít nhất bằng nhãn của $v$.',
        },
      ],
    },
    {
      heading: 'Bài toán người đưa thư',
      blocks: [
        {
          type: 'p',
          text: 'Một người đưa thư xuất phát từ bưu điện, phải đi qua mọi con phố trong khu vực của mình (mỗi phố ít nhất một lần) rồi quay về bưu điện. Hỏi nên đi theo lộ trình nào để tổng quãng đường ngắn nhất? Trên đồ thị có trọng số, ta cần tìm một chu trình đi qua mọi cạnh, có tổng độ dài nhỏ nhất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách giải trong hai trường hợp đơn giản',
          text: 'Cho đồ thị liên thông có trọng số. Nếu mọi đỉnh đều có bậc chẵn thì mọi chu trình Euler là lộ trình cần tìm; độ dài của nó bằng tổng trọng số các cạnh. Nếu đồ thị có đúng hai đỉnh bậc lẻ $u$ và $v$ thì lộ trình ngắn nhất gồm một đường đi Euler từ $u$ đến $v$ và một đường đi ngắn nhất từ $v$ trở về $u$; độ dài của nó bằng tổng trọng số các cạnh cộng với độ dài đường đi ngắn nhất giữa $u$ và $v$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Người đưa thư và người giao hàng',
          text: 'Người đưa thư cần đi qua mọi cạnh (mọi con phố), nên bài toán gắn với đường đi Euler. Một người giao hàng chỉ cần ghé mọi đỉnh (mọi khách hàng) rồi trở về thì lại cần một chu trình Hamilton ngắn nhất; với đồ thị ít đỉnh, có thể liệt kê các chu trình Hamilton rồi chọn chu trình ngắn nhất.',
        },
      ],
    },
    {
      heading: 'Dự án: Lộ trình giao báo buổi sáng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập lộ trình ngắn nhất cho một bạn giao báo phải đi qua mọi con đường trong một khu dân cư nhỏ rồi trở về điểm xuất phát, và tìm đường ngắn nhất từ nhà tới trường.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bản đồ khu dân cư quanh nhà hoặc trường (bản đồ giấy hay bản đồ trực tuyến có thước đo khoảng cách), giấy, bút màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn khoảng $6$ đến $8$ ngã tư làm đỉnh và các đoạn đường nối chúng làm cạnh. Đo độ dài mỗi đoạn đường (làm tròn đến $10$ m) và ghi lên cạnh.',
            'Dùng thuật toán gắn nhãn để tìm đường đi ngắn nhất từ ngã tư gần nhà em tới ngã tư gần trường. Trình bày bảng nhãn qua từng bước.',
            'Đếm các đỉnh bậc lẻ. Nếu có không quá hai đỉnh bậc lẻ, giải bài toán người đưa thư; nếu nhiều hơn, thử ghép các đỉnh bậc lẻ thành từng cặp và đi lặp lại đường ngắn nhất giữa mỗi cặp.',
            'So sánh tổng độ dài lộ trình tìm được với tổng độ dài các đoạn đường.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: đồ thị có trọng số, bảng nhãn của thuật toán, đường đi ngắn nhất tới trường, lộ trình của người giao báo và độ dài của nó, những đoạn đường phải đi lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chạy thuật toán gắn nhãn',
    instruction:
      'Chọn điểm xuất phát rồi nhấn "Bước tiếp": mỗi bước một đỉnh nhận nhãn vĩnh viễn (nền xanh) và các nhãn tạm thời (nền vàng) có thể giảm xuống. Theo dõi bảng nhãn bên dưới. Khi đích đã có nhãn vĩnh viễn, đường đi ngắn nhất được tô đậm.',
  },
  examples: [
    {
      problem:
        'Đồ thị có trọng số gồm các đỉnh $A, B, C, D, E$ và các cạnh $AB = 3$, $AC = 1$, $BC = 1$, $BD = 4$, $CD = 6$, $CE = 7$, $DE = 1$. Tìm đường đi ngắn nhất từ $A$ đến $E$.',
      steps: [
        '$l(A) = 0$. Nhãn tạm thời: $B: 3$, $C: 1$, các đỉnh khác $\\infty$.',
        'Nhãn tạm thời nhỏ nhất là của $C$: $l(C) = 1$. Cập nhật qua $C$: $B: 1 + 1 = 2 < 3$; $D: 1 + 6 = 7$; $E: 1 + 7 = 8$.',
        'Nhỏ nhất là $B$: $l(B) = 2$. Cập nhật qua $B$: $D: 2 + 4 = 6 < 7$.',
        'Nhỏ nhất là $D$: $l(D) = 6$. Cập nhật qua $D$: $E: 6 + 1 = 7 < 8$.',
        'Chỉ còn $E$: $l(E) = 7$. Đi ngược: $E$ nhận nhãn từ $D$, $D$ từ $B$, $B$ từ $C$, $C$ từ $A$.',
      ],
      answer: 'Đường đi ngắn nhất là $ACBDE$, có độ dài $1 + 1 + 4 + 1 = 7$.',
    },
    {
      problem:
        'Khu vực của một người đưa thư có các ngã tư $A, B, C, D$ với các con phố $AB = 3$, $AC = 4$, $BC = 2$, $BD = 5$, $CD = 6$ (đơn vị: trăm mét). Bưu điện ở $B$. Tìm lộ trình ngắn nhất đi qua mọi con phố rồi về bưu điện.',
      steps: [
        'Bậc các đỉnh: $\\deg(A) = 2$, $\\deg(B) = 3$, $\\deg(C) = 3$, $\\deg(D) = 2$. Có đúng hai đỉnh bậc lẻ $B$ và $C$.',
        'Một đường đi Euler từ $B$ đến $C$: $BACBDC$, dài $3 + 4 + 2 + 5 + 6 = 20$.',
        'Đường đi ngắn nhất từ $C$ về $B$ là cạnh $CB$, dài $2$ (các đường khác: $CAB$ dài $7$, $CDB$ dài $11$).',
        'Ghép lại: lộ trình $BACBDCB$, dài $20 + 2 = 22$; phố $BC$ được đi hai lần.',
      ],
      answer: 'Lộ trình $BACBDCB$, dài $22$ trăm mét, tức là $2{,}2$ km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong thuật toán gắn nhãn, ở mỗi bước đỉnh nào được gán nhãn vĩnh viễn?',
      options: [
        'Đỉnh chưa chốt có nhãn tạm thời nhỏ nhất.',
        'Đỉnh nối với đỉnh vừa chốt bằng cạnh ngắn nhất.',
        'Đỉnh có bậc lớn nhất.',
        'Đỉnh đích.',
      ],
      answer: 0,
      hints: ['Nhãn vĩnh viễn phải chắc chắn là khoảng cách ngắn nhất.'],
      solution:
        'Đỉnh chưa chốt có nhãn tạm thời nhỏ nhất được chốt, vì mọi đường khác tới nó phải đi qua một đỉnh chưa chốt có nhãn không nhỏ hơn. Cạnh ngắn nhất từ đỉnh vừa chốt chưa chắc cho khoảng cách nhỏ nhất tính từ $s$.',
    },
    {
      type: 'number',
      prompt:
        'Đỉnh $v$ vừa nhận nhãn vĩnh viễn $l(v) = 7$. Đỉnh $u$ kề $v$, cạnh $vu$ dài $4$, và $u$ đang có nhãn tạm thời $13$. Sau khi cập nhật, nhãn tạm thời của $u$ bằng bao nhiêu?',
      answer: 11,
      hints: ['So sánh $l(v) + w(vu)$ với nhãn hiện tại của $u$.'],
      solution: '$l(v) + w(vu) = 7 + 4 = 11 < 13$, nên nhãn của $u$ đổi thành $11$ (đến từ $v$).',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị có trọng số gồm các đỉnh $A, B, C, D, E$ và các cạnh $AB = 3$, $AC = 1$, $BC = 1$, $BD = 4$, $CD = 6$, $CE = 7$, $DE = 1$. Tìm độ dài đường đi ngắn nhất từ $A$ đến $D$.',
      answer: 6,
      hints: ['Chạy thuật toán gắn nhãn từ $A$ cho đến khi $D$ được chốt.'],
      solution:
        '$l(A) = 0$, $l(C) = 1$, $l(B) = 2$ (qua $C$), rồi $D$ có nhãn $\\min(2 + 4,\\ 1 + 6) = 6$. Đường đi ngắn nhất $ACBD$ dài $6$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị có trọng số gồm các đỉnh $A, B, C, D, E, F$ và các cạnh $AB = 7$, $AC = 9$, $AF = 14$, $BC = 10$, $BD = 15$, $CD = 11$, $CF = 2$, $DE = 6$, $EF = 9$. Tìm độ dài đường đi ngắn nhất từ $A$ đến $E$.',
      answer: 20,
      hints: [
        'Chốt lần lượt $A$, rồi $B$ ($7$), rồi $C$ ($9$).',
        'Qua $C$, nhãn của $F$ giảm từ $14$ xuống $9 + 2$.',
      ],
      solution:
        '$l(A) = 0$; $l(B) = 7$; $l(C) = 9$, qua $C$: $F$ giảm còn $11$, $D$ giảm còn $20$ (trước đó $22$ qua $B$); $l(F) = 11$, qua $F$: $E = 11 + 9 = 20$; $l(D) = 20$ và $l(E) = 20$ (qua $D$ chỉ cho $26$). Độ dài ngắn nhất từ $A$ đến $E$ là $20$.',
    },
    {
      type: 'choice',
      prompt:
        'Trong đồ thị có trọng số với các cạnh $AB = 7$, $AC = 9$, $AF = 14$, $BC = 10$, $BD = 15$, $CD = 11$, $CF = 2$, $DE = 6$, $EF = 9$, đường đi ngắn nhất từ $A$ đến $E$ là',
      options: ['$ACFE$', '$AFE$', '$ACDE$', '$ABDE$'],
      answer: 0,
      hints: ['Tính độ dài từng đường đi.'],
      solution:
        '$ACFE$: $9 + 2 + 9 = 20$; $AFE$: $14 + 9 = 23$; $ACDE$: $9 + 11 + 6 = 26$; $ABDE$: $7 + 15 + 6 = 28$. Ngắn nhất là $ACFE$.',
    },
    {
      type: 'number',
      prompt:
        'Các con phố $AB = 5$, $BC = 3$, $CD = 4$, $DA = 7$ (đơn vị: trăm mét) tạo thành một vòng khép kín. Người đưa thư xuất phát ở $A$ phải đi qua mọi con phố rồi về $A$. Lộ trình ngắn nhất dài bao nhiêu trăm mét?',
      answer: 19,
      hints: ['Mọi đỉnh có bậc chẵn: có chu trình Euler.'],
      solution:
        'Mọi đỉnh có bậc $2$, nên chu trình Euler $ABCDA$ đi qua mỗi phố đúng một lần; độ dài $5 + 3 + 4 + 7 = 19$ trăm mét.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị gồm các con phố $AB = 2$, $BC = 3$, $CD = 2$, $DA = 3$ và $AC = 4$. Người đưa thư xuất phát ở $A$. Lộ trình ngắn nhất đi qua mọi con phố rồi về $A$ dài bao nhiêu?',
      answer: 18,
      hints: [
        'Hai đỉnh bậc lẻ là $A$ và $C$.',
        'Cộng tổng các cạnh với đường đi ngắn nhất giữa $A$ và $C$.',
      ],
      solution:
        'Tổng các cạnh: $2 + 3 + 2 + 3 + 4 = 14$. Đỉnh bậc lẻ là $A$ và $C$; đường ngắn nhất giữa chúng là cạnh $AC = 4$ (các đường $ABC$, $ADC$ đều dài $5$). Lộ trình, chẳng hạn $ABCDACA$, dài $14 + 4 = 18$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị gồm các con phố $AB = 1$, $BC = 1$, $CD = 1$, $DA = 1$ và $AC = 5$. Người đưa thư xuất phát ở $A$. Lộ trình ngắn nhất đi qua mọi con phố rồi về $A$ dài bao nhiêu?',
      answer: 11,
      hints: [
        'Hai đỉnh bậc lẻ là $A$ và $C$.',
        'Đường ngắn nhất từ $C$ về $A$ không nhất thiết là cạnh $CA$.',
      ],
      solution:
        'Tổng các cạnh là $9$. Đường đi Euler từ $A$ đến $C$, chẳng hạn $ABCDAC$, dài $9$. Đường ngắn nhất từ $C$ về $A$ là $CBA$ (hoặc $CDA$), dài $2 < 5$. Lộ trình $ABCDACBA$ dài $9 + 2 = 11$.',
    },
  ],
  takeaways: [
    'Độ dài đường đi trong đồ thị có trọng số là tổng trọng số các cạnh.',
    'Thuật toán gắn nhãn: mỗi bước chốt đỉnh có nhãn tạm thời nhỏ nhất rồi cập nhật $l(v) + w(vu)$ cho các đỉnh kề.',
    'Lần ngược theo đỉnh đã cho nhãn để đọc ra đường đi ngắn nhất.',
    'Người đưa thư: mọi đỉnh bậc chẵn thì đi một chu trình Euler; có hai đỉnh bậc lẻ $u$, $v$ thì cộng thêm đường ngắn nhất giữa $u$ và $v$.',
  ],
};
