/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương VIII: biến cố hợp, giao, xung khắc, độc lập; công thức cộng, công thức nhân và sơ đồ cây; kiểm tra kết quả bằng mô phỏng và luyện tập với bộ đề tự sinh có bản đồ kĩ năng.',
  intro:
    'Chương VIII cho hai quy tắc cơ bản để tính xác suất của một biến cố phức tạp từ các biến cố đơn giản hơn: công thức cộng cho biến cố hợp và công thức nhân cho hai biến cố độc lập. Bài ôn tập này hệ thống lại các quy tắc, cho em tự giải một số bài toán rồi kiểm tra bằng mô phỏng hàng nghìn lần thử, và một bộ đề tự sinh chỉ ra phần nào em cần ôn thêm.',
  objectives: [
    'Hệ thống hoá các khái niệm biến cố hợp, biến cố giao, biến cố xung khắc, biến cố độc lập.',
    'Chọn đúng công thức cộng hay công thức nhân, và dùng biến cố đối khi thuận tiện.',
    'Giải bài toán xác suất thực tế bằng sơ đồ cây và kiểm tra kết quả bằng mô phỏng.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Khái niệm, quy tắc', 'Nội dung'],
          rows: [
            ['Biến cố hợp $A \\cup B$', '$A$ hoặc $B$ xảy ra; tập hợp là hợp của $A$ và $B$'],
            ['Biến cố giao $AB$', 'cả $A$ và $B$ cùng xảy ra; tập hợp là giao của $A$ và $B$'],
            ['$A$, $B$ xung khắc', '$A$ và $B$ không đồng thời xảy ra: $A \\cap B = \\varnothing$'],
            [
              '$A$, $B$ độc lập',
              'việc xảy ra hay không của biến cố này không ảnh hưởng tới xác suất của biến cố kia',
            ],
            ['Công thức cộng (xung khắc)', '$P(A \\cup B) = P(A) + P(B)$'],
            ['Công thức cộng (tổng quát)', '$P(A \\cup B) = P(A) + P(B) - P(AB)$'],
            ['Công thức nhân (độc lập)', '$P(AB) = P(A) \\cdot P(B)$'],
            ['Biến cố đối', '$P(\\overline{A}) = 1 - P(A)$'],
          ],
        },
        {
          type: 'list',
          items: [
            'Nếu $A$, $B$ độc lập thì $A$ và $\\overline{B}$, $\\overline{A}$ và $B$, $\\overline{A}$ và $\\overline{B}$ cũng độc lập.',
            'Nếu $P(AB) \\ne P(A) \\cdot P(B)$ thì $A$, $B$ không độc lập.',
            'Sơ đồ cây: nhân xác suất dọc nhánh, cộng xác suất các lá thuộc biến cố cần tính.',
            'Câu hỏi "ít nhất một" thường giải nhanh qua biến cố đối "không có ... nào".',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Cộng $P(A) + P(B)$ khi $A$, $B$ không xung khắc; nhân $P(A) \\cdot P(B)$ khi $A$, $B$ không độc lập (chẳng hạn lấy bi lần lượt không hoàn lại); nhầm "xung khắc" với "độc lập"; quên rằng mọi xác suất nằm trong đoạn $[0; 1]$.',
        },
      ],
    },
    {
      heading: 'Bộ đề tự luyện',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lượt có $12$ câu sinh ngẫu nhiên, ba câu cho mỗi kĩ năng. Nhập số tự nhiên khi được hỏi số kết quả, nhập xác suất dạng số thập phân (dấu phẩy) hoặc phân số $a/b$. Trả lời sai lần đầu em được gợi ý và thử lại; bản đồ kĩ năng tô màu theo lần trả lời đầu tiên.',
        },
        { type: 'widget', name: 'drill' },
      ],
    },
  ],
  explore: {
    title: 'Tự giải rồi kiểm tra bằng mô phỏng',
    instruction:
      'Chọn một bài toán, tự tính xác suất rồi nhập kết quả và bấm "Kiểm tra". Sau đó bấm "Thử $10\\,000$ lần" để máy lặp lại phép thử ngẫu nhiên: tần số tương đối của biến cố sẽ gần với xác suất em đã tính. Nếu bí, mô phỏng cho em biết đáp số gần đúng, và "Xem lời giải" cho em lời giải đầy đủ.',
  },
  examples: [
    {
      problem:
        'Hai bạn An và Bình cùng dự thi một kì thi, kết quả của hai bạn độc lập với nhau. Xác suất An đỗ là $0{,}9$, xác suất Bình đỗ là $0{,}8$. Tính xác suất: a) có đúng một bạn đỗ; b) có ít nhất một bạn đỗ.',
      steps: [
        'Gọi $A$: "An đỗ", $B$: "Bình đỗ"; $A$, $B$ độc lập, $P(\\overline{A}) = 0{,}1$, $P(\\overline{B}) = 0{,}2$.',
        'a) "Đúng một bạn đỗ" là $A\\overline{B} \\cup \\overline{A}B$, hai biến cố xung khắc. Theo công thức cộng và công thức nhân: $P = 0{,}9 \\cdot 0{,}2 + 0{,}1 \\cdot 0{,}8 = 0{,}18 + 0{,}08 = 0{,}26$.',
        'b) Biến cố đối của "ít nhất một bạn đỗ" là $\\overline{A}\\,\\overline{B}$: $P(\\overline{A}\\,\\overline{B}) = 0{,}1 \\cdot 0{,}2 = 0{,}02$. Vậy $P(A \\cup B) = 1 - 0{,}02 = 0{,}98$.',
      ],
      answer: 'a) $0{,}26$; b) $0{,}98$.',
    },
    {
      problem:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có $20$ tấm thẻ đánh số từ $1$ đến $20$. $A$: "Số trên thẻ chia hết cho $2$", $B$: "Số trên thẻ chia hết cho $5$". Hai biến cố $A$ và $B$ có độc lập không? Tính $P(A \\cup B)$.',
      steps: [
        '$n(A) = 10$, $n(B) = 4$; $AB$ gồm các số chia hết cho $10$: $\\{10; 20\\}$, $n(AB) = 2$.',
        '$P(A) = \\dfrac{1}{2}$, $P(B) = \\dfrac{4}{20} = \\dfrac{1}{5}$, $P(AB) = \\dfrac{2}{20} = \\dfrac{1}{10} = P(A) \\cdot P(B)$. Vậy $A$ và $B$ độc lập.',
        '$P(A \\cup B) = \\dfrac{10}{20} + \\dfrac{4}{20} - \\dfrac{2}{20} = \\dfrac{12}{20} = \\dfrac{3}{5}$.',
      ],
      answer: '$A$ và $B$ độc lập; $P(A \\cup B) = \\dfrac{3}{5}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cho hai biến cố xung khắc $A$, $B$ với $P(A) = 0{,}2$ và $P(B) = 0{,}5$. Giá trị của $P(A \\cup B)$ là',
      options: ['$0{,}7$', '$0{,}1$', '$0{,}6$', '$0{,}8$'],
      answer: 0,
      hints: ['Hai biến cố xung khắc: $P(AB) = 0$.'],
      solution: '$P(A \\cup B) = P(A) + P(B) = 0{,}2 + 0{,}5 = 0{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai biến cố độc lập $A$, $B$ với $P(A) = 0{,}5$ và $P(B) = 0{,}4$. Tính $P(A \\cup B)$.',
      answer: 0.7,
      tolerance: 0.0001,
      hints: ['Tính $P(AB)$ bằng công thức nhân, rồi dùng công thức cộng.'],
      solution:
        '$P(AB) = 0{,}5 \\cdot 0{,}4 = 0{,}2$, nên $P(A \\cup B) = 0{,}5 + 0{,}4 - 0{,}2 = 0{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai biến cố độc lập $A$, $B$ với $P(A) = 0{,}3$ và $P(B) = 0{,}6$. Tính $P(A\\overline{B})$.',
      answer: 0.12,
      tolerance: 0.0001,
      hints: ['$A$ và $\\overline{B}$ cũng độc lập, $P(\\overline{B}) = 1 - P(B)$.'],
      solution: '$P(A\\overline{B}) = P(A) \\cdot P(\\overline{B}) = 0{,}3 \\cdot 0{,}4 = 0{,}12$.',
    },
    {
      type: 'number',
      prompt: 'Gieo hai đồng xu cân đối. Tính xác suất có ít nhất một đồng xu xuất hiện mặt sấp.',
      answer: 0.75,
      tolerance: 0.0001,
      hints: ['Biến cố đối: cả hai đồng xu đều xuất hiện mặt ngửa.'],
      solution:
        '$P(\\text{cả hai ngửa}) = 0{,}5 \\cdot 0{,}5 = 0{,}25$, nên xác suất cần tìm là $1 - 0{,}25 = 0{,}75$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một lớp có $35$ học sinh, trong đó $15$ bạn học giỏi Toán, $12$ bạn học giỏi Ngữ văn và $6$ bạn học giỏi cả hai môn. Chọn ngẫu nhiên một học sinh. Tính xác suất học sinh đó học giỏi ít nhất một trong hai môn (viết dạng phân số).',
      answer: [3, 5],
      hints: ['Dùng công thức cộng; $6$ bạn giỏi cả hai môn được đếm trong cả $15$ và $12$.'],
      solution:
        '$P = \\dfrac{15}{35} + \\dfrac{12}{35} - \\dfrac{6}{35} = \\dfrac{21}{35} = \\dfrac{3}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với lớp học ở câu trên, tính xác suất học sinh được chọn không học giỏi môn nào trong hai môn (viết dạng phân số).',
      answer: [2, 5],
      hints: ['Đây là biến cố đối của biến cố ở câu trên.'],
      solution: '$P = 1 - \\dfrac{3}{5} = \\dfrac{2}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $6$ bi đỏ và $4$ bi trắng. Lấy ngẫu nhiên một viên, ghi màu, trả lại hộp rồi lấy tiếp một viên. Tính xác suất cả hai lần đều lấy được bi đỏ.',
      answer: 0.36,
      tolerance: 0.0001,
      hints: ['Bi được trả lại nên hai lần lấy độc lập.'],
      solution:
        'Mỗi lần, xác suất lấy được bi đỏ là $0{,}6$. Hai lần độc lập: $P = 0{,}6 \\cdot 0{,}6 = 0{,}36$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cũng hộp $6$ bi đỏ, $4$ bi trắng ấy, nhưng lấy ngẫu nhiên đồng thời $2$ viên. Tính xác suất cả hai viên đều màu đỏ (viết dạng phân số).',
      answer: [1, 3],
      hints: [
        'Hai viên lấy cùng lúc, không trả lại: không dùng được công thức nhân với $0{,}6 \\cdot 0{,}6$.',
        'Đếm: $n(\\Omega) = \\mathrm{C}_{10}^2$, số cách chọn $2$ bi đỏ là $\\mathrm{C}_6^2$.',
      ],
      solution:
        '$P = \\dfrac{\\mathrm{C}_6^2}{\\mathrm{C}_{10}^2} = \\dfrac{15}{45} = \\dfrac{1}{3}$, khác với $0{,}36$ ở câu trước vì các lần lấy không còn độc lập.',
    },
    {
      type: 'number',
      prompt:
        'An và Bình thi độc lập, xác suất đỗ lần lượt là $0{,}9$ và $0{,}8$. Tính xác suất chỉ có An đỗ.',
      answer: 0.18,
      tolerance: 0.0001,
      hints: ['"Chỉ có An đỗ" là biến cố $A\\overline{B}$.'],
      solution: '$P(A\\overline{B}) = 0{,}9 \\cdot (1 - 0{,}8) = 0{,}9 \\cdot 0{,}2 = 0{,}18$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo hai con xúc xắc cân đối. Tính xác suất tổng số chấm bằng $8$ hoặc hai con xúc xắc ra cùng số chấm (viết dạng phân số).',
      answer: [5, 18],
      hints: [
        'Tổng bằng $8$ có $5$ kết quả, cùng số chấm có $6$ kết quả.',
        'Kết quả $(4, 4)$ thuộc cả hai biến cố.',
      ],
      solution:
        'Tổng $8$: $(2, 6); (3, 5); (4, 4); (5, 3); (6, 2)$. Cùng số chấm: $6$ kết quả. Chung: $(4, 4)$. $P = \\dfrac{5}{36} + \\dfrac{6}{36} - \\dfrac{1}{36} = \\dfrac{10}{36} = \\dfrac{5}{18}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng với hai biến cố bất kì $A$, $B$.',
      options: [
        '$A$ và $\\overline{A}$ xung khắc',
        'Nếu $A$, $B$ độc lập thì $P(AB) = P(A) \\cdot P(B)$',
        '$P(A \\cup B) \\le P(A) + P(B)$',
        'Hai biến cố xung khắc thì độc lập',
        '$P(AB) \\ge P(A) + P(B)$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Dùng công thức cộng: $P(A \\cup B) = P(A) + P(B) - P(AB)$ với $P(AB) \\ge 0$.',
        'Hai biến cố xung khắc có $P(AB) = 0$; so với $P(A) \\cdot P(B)$.',
      ],
      solution:
        '$A$ và $\\overline{A}$ không cùng xảy ra nên xung khắc. Công thức nhân đúng cho hai biến cố độc lập. Vì $P(AB) \\ge 0$ nên $P(A \\cup B) \\le P(A) + P(B)$. Hai biến cố xung khắc có $P(AB) = 0$, thường khác $P(A) \\cdot P(B)$, nên nói chung không độc lập. Cuối cùng $P(AB) \\le P(A)$, nên $P(AB) \\ge P(A) + P(B)$ sai nói chung.',
    },
    {
      type: 'choice',
      prompt:
        'Một hộp có $5$ bi xanh, $3$ bi đỏ. Lấy ngẫu nhiên lần lượt hai viên, không trả lại. $A$: "Lần một lấy được bi đỏ", $B$: "Lần hai lấy được bi đỏ". Khẳng định nào đúng?',
      options: [
        '$A$ và $B$ không độc lập',
        '$A$ và $B$ độc lập',
        '$A$ và $B$ xung khắc',
        '$P(AB) = \\dfrac{3}{8} \\cdot \\dfrac{3}{8}$',
      ],
      answer: 0,
      hints: ['Nếu biết lần một lấy được bi đỏ, trong hộp còn bao nhiêu bi đỏ?'],
      solution:
        'Nếu $A$ xảy ra, lần hai còn $2$ đỏ trong $7$ viên; nếu không, còn $3$ đỏ trong $7$ viên. $A$ ảnh hưởng đến xác suất của $B$ nên không độc lập. Chúng không xung khắc (có thể cả hai lần đều đỏ), và $P(AB) = \\dfrac{3 \\cdot 2}{8 \\cdot 7} = \\dfrac{3}{28}$.',
    },
  ],
  takeaways: [
    'Biến cố hợp, giao, đối mô tả bằng phép hợp, giao, phần bù của các tập con của $\\Omega$.',
    'Công thức cộng: $P(A \\cup B) = P(A) + P(B) - P(AB)$, với $P(AB) = 0$ khi $A$, $B$ xung khắc.',
    'Công thức nhân: $P(AB) = P(A) \\cdot P(B)$ khi $A$, $B$ độc lập.',
    'Mô phỏng nhiều lần thử cho tần số tương đối gần với xác suất, là cách kiểm tra nhanh một kết quả tính toán.',
  ],
};
