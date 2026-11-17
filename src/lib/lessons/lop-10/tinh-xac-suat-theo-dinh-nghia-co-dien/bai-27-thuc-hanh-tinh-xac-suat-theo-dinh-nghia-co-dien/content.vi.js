/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính xác suất theo định nghĩa cổ điển bằng tổ hợp, sơ đồ hình cây và bảng, công thức P(Ē) = 1 − P(E), và nguyên lí xác suất bé.',
  intro:
    'Lấy $3$ viên bi từ một hộp $12$ viên thì có tới $220$ kết quả, không thể liệt kê từng cái. Muốn tính xác suất theo định nghĩa cổ điển, ta cần đếm $n(\\Omega)$ và $n(E)$ thật nhanh: dùng các công thức tổ hợp của chương VIII, sơ đồ hình cây, bảng, và đôi khi đếm biến cố đối dễ hơn.',
  objectives: [
    'Dùng hoán vị, chỉnh hợp, tổ hợp và quy tắc nhân để tính $n(\\Omega)$, $n(E)$.',
    'Dùng sơ đồ hình cây hoặc bảng để mô tả không gian mẫu của phép thử nhiều bước.',
    'Vận dụng công thức $P(\\overline{E}) = 1 - P(E)$ khi biến cố đối dễ đếm hơn.',
    'Vận dụng nguyên lí xác suất bé trong tình huống thực tế.',
  ],
  sections: [
    {
      heading: 'Sử dụng các phương pháp tổ hợp',
      blocks: [
        {
          type: 'p',
          text: 'Khi không gian mẫu lớn, ta không liệt kê mà đếm số phần tử bằng quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp và tổ hợp. Lấy ra đồng thời $k$ phần tử (không xét thứ tự) thì mỗi kết quả là một tổ hợp; xếp thứ tự thì mỗi kết quả là một hoán vị hoặc chỉnh hợp.',
        },
        {
          type: 'table',
          caption: 'Đếm số kết quả',
          head: ['Phép thử', '$n(\\Omega)$'],
          rows: [
            ['Lấy đồng thời $k$ viên bi từ hộp có $n$ viên', '$C_n^k$'],
            ['Xếp $n$ người thành một hàng', '$P_n = n!$'],
            ['Chọn $k$ người trong $n$ người vào $k$ vị trí khác nhau', '$A_n^k$'],
            ['Gieo $m$ con xúc xắc', '$6^m$'],
          ],
        },
        {
          type: 'p',
          text: 'Khi biến cố gồm nhiều loại phần tử (chẳng hạn $2$ bi trắng và $1$ bi đen), đếm số cách chọn từng loại rồi dùng quy tắc nhân; khi biến cố gồm nhiều trường hợp rời nhau, đếm từng trường hợp rồi dùng quy tắc cộng.',
        },
      ],
    },
    {
      heading: 'Sử dụng sơ đồ hình cây và bảng',
      blocks: [
        {
          type: 'p',
          text: 'Phép thử gồm nhiều bước (tung đồng xu rồi gieo xúc xắc, tung đồng xu nhiều lần, chọn hai lần liên tiếp) có thể mô tả bằng sơ đồ hình cây: mỗi bước là một tầng, mỗi nhánh là một kết quả của bước đó, mỗi đường đi từ gốc đến ngọn là một kết quả của phép thử.',
        },
        {
          type: 'p',
          text: 'Ví dụ, tung một đồng xu rồi gieo một con xúc xắc: tầng thứ nhất có $2$ nhánh $S$, $N$; từ mỗi nhánh mọc ra $6$ nhánh $1; 2; \\ldots; 6$. Cây có $2 \\cdot 6 = 12$ ngọn, nên $n(\\Omega) = 12$: $\\Omega = \\{S1; S2; \\ldots; S6; N1; N2; \\ldots; N6\\}$.',
        },
        {
          type: 'p',
          text: 'Với phép thử hai bước, ta cũng có thể lập bảng: các hàng là kết quả bước thứ nhất, các cột là kết quả bước thứ hai, mỗi ô là một kết quả. Gieo hai con xúc xắc cho bảng $6 \\times 6$ gồm $36$ ô.',
        },
        {
          type: 'table',
          caption: 'Tung một đồng xu rồi gieo một con xúc xắc: mỗi ô là một kết quả',
          head: ['Đồng xu / Xúc xắc', '$1$', '$2$', '$3$', '$4$', '$5$', '$6$'],
          rows: [
            ['$S$', '$S1$', '$S2$', '$S3$', '$S4$', '$S5$', '$S6$'],
            ['$N$', '$N1$', '$N2$', '$N3$', '$N4$', '$N5$', '$N6$'],
          ],
        },
      ],
    },
    {
      heading: 'Xác suất của biến cố đối',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: 'Cho $E$ là một biến cố. Xác suất của biến cố đối $\\overline{E}$ là $$P(\\overline{E}) = 1 - P(E).$$',
        },
        {
          type: 'p',
          text: 'Thật vậy, $n(\\overline{E}) = n(\\Omega) - n(E)$, chia hai vế cho $n(\\Omega)$ được $P(\\overline{E}) = 1 - P(E)$. Khi tính trực tiếp $P(E)$ phải chia nhiều trường hợp (thường gặp với "ít nhất một", "có cả"), ta tính $P(\\overline{E})$ rồi suy ra $P(E) = 1 - P(\\overline{E})$.',
        },
      ],
    },
    {
      heading: 'Tần suất và nguyên lí xác suất bé',
      blocks: [
        {
          type: 'p',
          text: 'Khi thực hiện một phép thử rất nhiều lần, tần suất xuất hiện của biến cố $E$ (số lần $E$ xảy ra chia cho số lần thử) dần ổn định quanh $P(E)$. Mô phỏng trong phần khám phá cho thấy điều đó và giúp kiểm tra lại kết quả tính bằng tổ hợp.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nguyên lí xác suất bé',
          text: 'Biến cố có xác suất rất bé thì trong một phép thử coi như không xảy ra. Chọn $6$ số trong $45$ số, xác suất trúng đúng $6$ số cho trước là $\\dfrac{1}{8\\,145\\,060}$: dù thử hàng chục nghìn lần, biến cố này gần như không bao giờ xuất hiện.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mô phỏng hàng nghìn lần thử',
    instruction:
      'Chọn một phép thử, đọc cách tính $P(E)$ bằng tổ hợp rồi bấm "Thử 1 lần" hoặc "+1 000 lần". Theo dõi đường tần suất (màu xanh) tiến dần về đường nét đứt $P(E)$. Thử cả phép thử "Trúng cả 6 số" để thấy nguyên lí xác suất bé.',
  },
  examples: [
    {
      problem:
        'Một túi có $6$ viên bi trắng và $3$ viên bi đen. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất của biến cố $E$: "Lấy được đúng $1$ viên bi trắng".',
      steps: [
        'Mỗi kết quả là một tổ hợp chập $2$ của $9$ viên bi: $n(\\Omega) = C_9^2 = 36$.',
        'Chọn $1$ bi trắng trong $6$ bi trắng có $C_6^1 = 6$ cách, chọn $1$ bi đen trong $3$ bi đen có $C_3^1 = 3$ cách.',
        'Theo quy tắc nhân, $n(E) = 6 \\cdot 3 = 18$.',
        '$P(E) = \\dfrac{18}{36} = \\dfrac{1}{2}$.',
      ],
      answer: '$P(E) = \\dfrac{1}{2}$.',
    },
    {
      problem:
        'Tung một đồng xu cân đối rồi gieo một con xúc xắc cân đối. Tính xác suất của biến cố $F$: "Đồng xu xuất hiện mặt sấp và xúc xắc xuất hiện mặt có số chấm lớn hơn $4$".',
      steps: [
        'Vẽ sơ đồ hình cây: tầng đầu $S$, $N$; mỗi nhánh mọc ra $6$ nhánh. $n(\\Omega) = 2 \\cdot 6 = 12$.',
        '$F = \\{S5; S6\\}$, $n(F) = 2$.',
        '$P(F) = \\dfrac{2}{12} = \\dfrac{1}{6}$.',
      ],
      answer: '$P(F) = \\dfrac{1}{6}$.',
    },
    {
      problem:
        'Một hộp có $4$ viên bi xanh, $3$ viên bi đỏ và $5$ viên bi vàng. Lấy ngẫu nhiên đồng thời $3$ viên bi. Tính xác suất của biến cố $E$: "Có ít nhất $1$ viên bi xanh".',
      steps: [
        '$n(\\Omega) = C_{12}^3 = 220$.',
        'Biến cố đối $\\overline{E}$: "Không có viên bi xanh nào", tức là $3$ viên lấy từ $8$ viên đỏ và vàng: $n(\\overline{E}) = C_8^3 = 56$.',
        '$P(\\overline{E}) = \\dfrac{56}{220} = \\dfrac{14}{55}$.',
        '$P(E) = 1 - \\dfrac{14}{55} = \\dfrac{41}{55}$.',
      ],
      answer: '$P(E) = \\dfrac{41}{55}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Một hộp có $5$ viên bi đỏ và $4$ viên bi xanh. Lấy ngẫu nhiên đồng thời $2$ viên bi. Tính xác suất để cả hai viên bi đều màu đỏ.',
      answer: [5, 18],
      hints: ['$n(\\Omega) = C_9^2$.', 'Số cách lấy $2$ bi đỏ là $C_5^2$.'],
      solution:
        '$n(\\Omega) = C_9^2 = 36$, $n(E) = C_5^2 = 10$, nên $P(E) = \\dfrac{10}{36} = \\dfrac{5}{18}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung ba đồng xu cân đối. Tính xác suất của biến cố "Có ít nhất một đồng xu xuất hiện mặt ngửa".',
      answer: [7, 8],
      hints: ['Vẽ sơ đồ hình cây: $n(\\Omega) = 8$.', 'Biến cố đối là "Cả ba đồng xu đều sấp".'],
      solution:
        '$n(\\Omega) = 2^3 = 8$. Biến cố đối chỉ có kết quả $SSS$, nên $P(\\overline{E}) = \\dfrac{1}{8}$ và $P(E) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $4$ viên bi xanh, $3$ viên bi đỏ và $5$ viên bi vàng. Lấy ngẫu nhiên đồng thời $3$ viên bi. Tính xác suất của biến cố "Có ít nhất $2$ viên bi đỏ".',
      answer: [7, 55],
      hints: [
        '$n(\\Omega) = C_{12}^3 = 220$.',
        'Chia hai trường hợp: đúng $2$ bi đỏ, hoặc cả $3$ bi đỏ.',
      ],
      solution:
        'Đúng $2$ bi đỏ: $C_3^2 \\cdot C_9^1 = 27$ cách; $3$ bi đỏ: $C_3^3 = 1$ cách. $n(E) = 28$, nên $P(E) = \\dfrac{28}{220} = \\dfrac{7}{55}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một thùng có $3$ hộp thịt, $2$ hộp cá và $3$ hộp sữa (các hộp khác nhau). Chọn ngẫu nhiên $3$ hộp. Tính xác suất để chọn được mỗi loại một hộp.',
      answer: [9, 28],
      hints: ['$n(\\Omega) = C_8^3$.', 'Chọn $1$ hộp thịt, $1$ hộp cá, $1$ hộp sữa rồi nhân.'],
      solution:
        '$n(\\Omega) = C_8^3 = 56$, $n(E) = 3 \\cdot 2 \\cdot 3 = 18$, nên $P(E) = \\dfrac{18}{56} = \\dfrac{9}{28}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối rồi tung một đồng xu cân đối. Tính xác suất của biến cố "Xúc xắc xuất hiện mặt có số chấm chẵn và đồng xu xuất hiện mặt ngửa".',
      answer: [1, 4],
      hints: ['Sơ đồ hình cây có $6 \\cdot 2 = 12$ ngọn.'],
      solution:
        '$n(\\Omega) = 12$, các kết quả thuận lợi là $2N; 4N; 6N$, nên $P = \\dfrac{3}{12} = \\dfrac{1}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Từ hộp có $9$ tấm thẻ đánh số từ $1$ đến $9$, rút ngẫu nhiên đồng thời $2$ tấm thẻ. Tính xác suất để tổng hai số ghi trên hai thẻ là số chẵn.',
      answer: [4, 9],
      hints: [
        'Tổng hai số là chẵn khi hai số cùng chẵn hoặc cùng lẻ.',
        'Có $5$ thẻ lẻ và $4$ thẻ chẵn.',
      ],
      solution:
        '$n(\\Omega) = C_9^2 = 36$. Hai thẻ lẻ: $C_5^2 = 10$ cách; hai thẻ chẵn: $C_4^2 = 6$ cách. $n(E) = 16$, nên $P(E) = \\dfrac{16}{36} = \\dfrac{4}{9}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Xếp ngẫu nhiên $3$ bạn nam và $2$ bạn nữ thành một hàng ngang. Tính xác suất để hai bạn nữ đứng cạnh nhau.',
      answer: [2, 5],
      hints: [
        '$n(\\Omega) = 5!$.',
        'Coi hai bạn nữ là một "khối", rồi nhân với số cách đổi chỗ trong khối.',
      ],
      solution:
        '$n(\\Omega) = 5! = 120$. Xếp khối hai bạn nữ cùng $3$ bạn nam: $4! = 24$ cách, trong khối có $2! = 2$ cách, nên $n(E) = 48$ và $P(E) = \\dfrac{48}{120} = \\dfrac{2}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Lấy ngẫu nhiên hai viên bi từ một hộp. Biết xác suất để hai viên bi cùng màu là $0{,}4$. Tính xác suất để hai viên bi khác màu.',
      answer: 0.6,
      hints: ['"Hai viên bi khác màu" là biến cố đối của "Hai viên bi cùng màu".'],
      solution: '$P(\\overline{E}) = 1 - P(E) = 1 - 0{,}4 = 0{,}6$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một lớp có $20$ học sinh nam và $15$ học sinh nữ. Chọn ngẫu nhiên $3$ học sinh. Tính xác suất để trong $3$ học sinh được chọn có ít nhất $1$ học sinh nữ.',
      answer: [1081, 1309],
      hints: [
        'Biến cố đối là "Cả $3$ học sinh đều là nam".',
        '$n(\\Omega) = C_{35}^3 = 6\\,545$ và $C_{20}^3 = 1\\,140$.',
      ],
      solution:
        '$P(\\overline{E}) = \\dfrac{C_{20}^3}{C_{35}^3} = \\dfrac{1\\,140}{6\\,545} = \\dfrac{228}{1\\,309}$, nên $P(E) = 1 - \\dfrac{228}{1\\,309} = \\dfrac{1\\,081}{1\\,309}$.',
    },
    {
      type: 'choice',
      prompt:
        'Chọn $6$ số trong $45$ số, xác suất trúng đúng $6$ số cho trước là $\\dfrac{1}{8\\,145\\,060}$. Theo nguyên lí xác suất bé, khi chọn một lần ta có thể nói gì?',
      options: [
        'Coi như biến cố trúng cả $6$ số không xảy ra',
        'Biến cố trúng cả $6$ số là biến cố không thể',
        'Chọn đủ $8\\,145\\,060$ lần thì chắc chắn trúng',
        'Xác suất trúng bằng xác suất không trúng',
      ],
      answer: 0,
      hints: ['Xác suất rất bé nhưng vẫn lớn hơn $0$.'],
      solution:
        'Xác suất rất bé nên trong một lần chọn coi như không trúng. Đó không phải biến cố không thể (xác suất khác $0$), và chọn ngẫu nhiên $8\\,145\\,060$ lần cũng không chắc trúng vì các lần chọn có thể trùng nhau.',
    },
  ],
  takeaways: [
    'Đếm $n(\\Omega)$ và $n(E)$ bằng quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp, tổ hợp.',
    'Phép thử nhiều bước: mô tả bằng sơ đồ hình cây (mỗi đường đi là một kết quả) hoặc bảng.',
    '$P(\\overline{E}) = 1 - P(E)$: dùng khi biến cố đối dễ đếm hơn, như với "ít nhất một".',
    'Tần suất qua nhiều lần thử ổn định quanh xác suất; biến cố có xác suất rất bé coi như không xảy ra trong một phép thử.',
  ],
};
