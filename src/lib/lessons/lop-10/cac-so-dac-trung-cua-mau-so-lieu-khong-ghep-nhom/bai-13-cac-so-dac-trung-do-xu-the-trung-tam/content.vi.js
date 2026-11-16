/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các số đặc trưng đo xu thế trung tâm của mẫu số liệu không ghép nhóm: số trung bình, trung vị, tứ phân vị và mốt; cách tính và ý nghĩa của từng số.',
  intro:
    'Lớp em vừa làm bài kiểm tra. Muốn dùng một con số để nói "lớp làm bài thế nào", ta lấy điểm trung bình, điểm ở chính giữa hay điểm nhiều bạn đạt nhất? Mỗi con số ấy đo "trung tâm" của mẫu số liệu theo một cách, và mỗi cách hợp với một tình huống.',
  objectives: [
    'Tính được số trung bình, trung vị, tứ phân vị và mốt của mẫu số liệu không ghép nhóm.',
    'Hiểu ý nghĩa của các số đặc trưng đo xu thế trung tâm.',
    'Chọn được số đặc trưng phù hợp để đại diện cho mẫu số liệu, nhất là khi mẫu có giá trị quá lớn hoặc quá nhỏ.',
  ],
  sections: [
    {
      heading: 'Số trung bình',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số trung bình',
          text: 'Số trung bình (số trung bình cộng) của mẫu số liệu $x_1, x_2, \\ldots, x_n$ là $$\\overline{x} = \\dfrac{x_1 + x_2 + \\cdots + x_n}{n}.$$',
        },
        {
          type: 'p',
          text: 'Nếu mẫu được cho dưới dạng bảng tần số, giá trị $x_1, x_2, \\ldots, x_k$ có tần số $m_1, m_2, \\ldots, m_k$ ($n = m_1 + m_2 + \\cdots + m_k$), thì $$\\overline{x} = \\dfrac{m_1x_1 + m_2x_2 + \\cdots + m_kx_k}{n}.$$',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Số trung bình là giá trị trung bình cộng của các số trong mẫu, cho biết vị trí trung tâm của mẫu và dùng để đại diện cho mẫu số liệu. Nhưng nó bị ảnh hưởng mạnh bởi các giá trị quá lớn hoặc quá nhỏ.',
        },
      ],
    },
    {
      heading: 'Trung vị',
      blocks: [
        {
          type: 'p',
          text: 'Để tìm trung vị, trước hết sắp xếp mẫu theo thứ tự không giảm: $x_1 \\le x_2 \\le \\cdots \\le x_n$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trung vị',
          text: 'Trung vị $M_e$ là giá trị chính giữa của mẫu đã sắp xếp: nếu $n$ lẻ thì $M_e = x_{\\frac{n+1}{2}}$; nếu $n$ chẵn thì $M_e = \\dfrac{x_{\\frac{n}{2}} + x_{\\frac{n}{2}+1}}{2}$ (trung bình cộng của hai giá trị chính giữa).',
        },
        {
          type: 'p',
          text: 'Trung vị chia mẫu thành hai phần, mỗi phần chứa $50\\%$ giá trị. Trung vị không bị ảnh hưởng bởi giá trị quá lớn hoặc quá nhỏ, nên khi mẫu có những giá trị như thế ta dùng trung vị để đại diện thay cho số trung bình. Khi các số liệu không chênh lệch quá lớn thì số trung bình và trung vị xấp xỉ nhau.',
        },
      ],
    },
    {
      heading: 'Tứ phân vị',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tứ phân vị',
          text: 'Sắp xếp mẫu theo thứ tự không giảm. Tứ phân vị thứ hai $Q_2$ là trung vị $M_e$. Tứ phân vị thứ nhất $Q_1$ là trung vị của nửa số liệu bên trái $Q_2$, tứ phân vị thứ ba $Q_3$ là trung vị của nửa số liệu bên phải $Q_2$. Khi $n$ lẻ, hai nửa này không chứa $Q_2$.',
        },
        {
          type: 'p',
          text: 'Ba giá trị $Q_1$, $Q_2$, $Q_3$ chia mẫu đã sắp xếp thành bốn phần, mỗi phần chứa khoảng $25\\%$ số giá trị. Chẳng hạn khoảng $25\\%$ số giá trị nhỏ hơn $Q_1$ và khoảng $75\\%$ số giá trị nhỏ hơn $Q_3$.',
        },
        {
          type: 'table',
          head: ['Mẫu đã sắp xếp', '$Q_1$', '$Q_2$', '$Q_3$'],
          rows: [
            [
              '$0;\\ 3;\\ 5;\\ 7;\\ \\mathbf{9};\\ 11;\\ 16;\\ 19;\\ 20$ ($n = 9$)',
              '$\\dfrac{3 + 5}{2} = 4$',
              '$9$',
              '$\\dfrac{16 + 19}{2} = 17{,}5$',
            ],
            ['$2;\\ 4;\\ 5;\\ 7;\\ 8;\\ 9$ ($n = 6$)', '$4$', '$\\dfrac{5 + 7}{2} = 6$', '$8$'],
          ],
        },
      ],
    },
    {
      heading: 'Mốt',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mốt',
          text: 'Mốt $M_o$ của mẫu số liệu là giá trị xuất hiện với tần số lớn nhất.',
        },
        {
          type: 'p',
          text: 'Một mẫu có thể có nhiều mốt, chẳng hạn mẫu $1;\\ 1;\\ 2;\\ 3;\\ 3$ có hai mốt là $1$ và $3$. Khi mọi giá trị xuất hiện với tần số như nhau thì mẫu không có mốt. Mốt dùng được cả với dữ liệu không phải là số (màu áo, loại nước uống) và thường dùng để chọn mặt hàng bán chạy nhất, như cỡ giày nên nhập nhiều.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ chấm và các số đo trung tâm',
    instruction:
      'Kéo các chấm (hoặc chọn một chấm và dùng phím mũi tên) để đổi thời gian đi học của từng bạn. Quan sát số trung bình, trung vị, tứ phân vị và mốt thay đổi. Bấm "Một bạn đi 60 phút" để xem giá trị quá lớn ảnh hưởng đến số nào nhiều hơn; thêm hoặc bớt một bạn để thấy cách tính trung vị khi $n$ chẵn và $n$ lẻ.',
  },
  examples: [
    {
      problem:
        'Điểm kiểm tra môn Toán của $20$ học sinh được cho trong bảng: điểm $5$, $6$, $7$, $8$, $9$, $10$ lần lượt có tần số $2$, $3$, $6$, $5$, $3$, $1$. Tính điểm trung bình.',
      steps: [
        'Cỡ mẫu $n = 2 + 3 + 6 + 5 + 3 + 1 = 20$.',
        'Tổng điểm: $2 \\cdot 5 + 3 \\cdot 6 + 6 \\cdot 7 + 5 \\cdot 8 + 3 \\cdot 9 + 1 \\cdot 10 = 10 + 18 + 42 + 40 + 27 + 10 = 147$.',
        '$\\overline{x} = \\dfrac{147}{20} = 7{,}35$.',
      ],
      answer: 'Điểm trung bình là $7{,}35$.',
    },
    {
      problem:
        'Số ghế trống của một rạp chiếu phim trong $9$ ngày là: $7;\\ 9;\\ 16;\\ 0;\\ 11;\\ 19;\\ 3;\\ 20;\\ 5$. Tìm trung vị và tứ phân vị.',
      steps: [
        'Sắp xếp theo thứ tự không giảm: $0;\\ 3;\\ 5;\\ 7;\\ 9;\\ 11;\\ 16;\\ 19;\\ 20$.',
        '$n = 9$ lẻ nên $Q_2 = M_e = x_5 = 9$.',
        'Nửa bên trái $Q_2$ là $0;\\ 3;\\ 5;\\ 7$, nên $Q_1 = \\dfrac{3 + 5}{2} = 4$.',
        'Nửa bên phải $Q_2$ là $11;\\ 16;\\ 19;\\ 20$, nên $Q_3 = \\dfrac{16 + 19}{2} = 17{,}5$.',
      ],
      answer: '$M_e = Q_2 = 9$, $Q_1 = 4$, $Q_3 = 17{,}5$.',
    },
    {
      problem:
        'Một cửa hàng bán được $10$ đôi giày với các cỡ: $40;\\ 38;\\ 41;\\ 44;\\ 41;\\ 39;\\ 42;\\ 41;\\ 43;\\ 40$. Tìm trung vị, tứ phân vị và mốt. Cửa hàng nên nhập thêm cỡ giày nào nhiều nhất?',
      steps: [
        'Sắp xếp: $38;\\ 39;\\ 40;\\ 40;\\ 41;\\ 41;\\ 41;\\ 42;\\ 43;\\ 44$.',
        '$n = 10$ chẵn nên $M_e = \\dfrac{x_5 + x_6}{2} = \\dfrac{41 + 41}{2} = 41$.',
        'Nửa trái $38;\\ 39;\\ 40;\\ 40;\\ 41$ cho $Q_1 = 40$; nửa phải $41;\\ 41;\\ 42;\\ 43;\\ 44$ cho $Q_3 = 42$.',
        'Cỡ $41$ xuất hiện $3$ lần, nhiều nhất, nên $M_o = 41$.',
      ],
      answer:
        '$M_e = 41$, $Q_1 = 40$, $Q_3 = 42$, $M_o = 41$. Cửa hàng nên nhập nhiều giày cỡ $41$ (mốt).',
    },
    {
      problem:
        'Thu nhập một tháng (triệu đồng) của $7$ nhân viên một công ty nhỏ là: $5;\\ 6;\\ 6;\\ 7;\\ 7;\\ 8;\\ 50$ (người cuối là giám đốc). Nên dùng số trung bình hay trung vị để đại diện cho thu nhập của các nhân viên?',
      steps: [
        '$\\overline{x} = \\dfrac{5 + 6 + 6 + 7 + 7 + 8 + 50}{7} = \\dfrac{89}{7} \\approx 12{,}71$.',
        'Mẫu đã sắp xếp, $n = 7$, nên $M_e = x_4 = 7$.',
        'Sáu trong bảy người có thu nhập dưới $12{,}71$ triệu: giá trị $50$ quá lớn kéo số trung bình lên.',
      ],
      answer: 'Nên dùng trung vị $M_e = 7$ triệu đồng, vì nó không bị giá trị $50$ ảnh hưởng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính số trung bình của mẫu số liệu: $12;\\ 15;\\ 14;\\ 18;\\ 16;\\ 15$.',
      answer: 15,
      hints: ['Cộng tất cả các giá trị rồi chia cho cỡ mẫu.', 'Tổng là $90$, cỡ mẫu là $6$.'],
      solution: '$\\overline{x} = \\dfrac{12 + 15 + 14 + 18 + 16 + 15}{6} = \\dfrac{90}{6} = 15$.',
    },
    {
      type: 'number',
      prompt: 'Tìm trung vị của mẫu số liệu: $23;\\ 17;\\ 30;\\ 25;\\ 19;\\ 28;\\ 21$.',
      answer: 23,
      hints: [
        'Sắp xếp mẫu theo thứ tự không giảm trước.',
        '$n = 7$ lẻ: trung vị là giá trị thứ $4$.',
      ],
      solution:
        'Sắp xếp: $17;\\ 19;\\ 21;\\ 23;\\ 25;\\ 28;\\ 30$. Vì $n = 7$ nên $M_e = x_4 = 23$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm tứ phân vị thứ nhất $Q_1$ của mẫu số liệu: $23;\\ 17;\\ 30;\\ 25;\\ 19;\\ 28;\\ 21$.',
      answer: 19,
      hints: [
        'Sắp xếp mẫu rồi tìm $Q_2 = M_e$.',
        '$n$ lẻ: nửa bên trái $Q_2$ gồm $3$ giá trị, không tính $Q_2$.',
      ],
      solution:
        'Mẫu đã sắp xếp $17;\\ 19;\\ 21;\\ 23;\\ 25;\\ 28;\\ 30$ có $Q_2 = 23$. Nửa bên trái là $17;\\ 19;\\ 21$, nên $Q_1 = 19$.',
    },
    {
      type: 'number',
      prompt: 'Tìm trung vị của mẫu số liệu: $4;\\ 9;\\ 2;\\ 7;\\ 5;\\ 8$.',
      answer: 6,
      hints: [
        'Sắp xếp: $2;\\ 4;\\ 5;\\ 7;\\ 8;\\ 9$.',
        '$n = 6$ chẵn: lấy trung bình cộng của hai giá trị chính giữa.',
      ],
      solution:
        'Sắp xếp: $2;\\ 4;\\ 5;\\ 7;\\ 8;\\ 9$. $M_e = \\dfrac{x_3 + x_4}{2} = \\dfrac{5 + 7}{2} = 6$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm tứ phân vị thứ ba $Q_3$ của mẫu số liệu: $1;\\ 3;\\ 4;\\ 6;\\ 7;\\ 9;\\ 10;\\ 12$.',
      answer: 9.5,
      hints: [
        'Mẫu đã sắp xếp, $n = 8$ chẵn: chia thành hai nửa, mỗi nửa $4$ giá trị.',
        'Nửa bên phải là $7;\\ 9;\\ 10;\\ 12$.',
      ],
      solution:
        '$Q_2 = \\dfrac{6 + 7}{2} = 6{,}5$. Nửa bên phải $7;\\ 9;\\ 10;\\ 12$ có trung vị $Q_3 = \\dfrac{9 + 10}{2} = 9{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Điều tra số con của $40$ hộ gia đình: có $6$ hộ không có con, $12$ hộ có $1$ con, $15$ hộ có $2$ con, $5$ hộ có $3$ con và $2$ hộ có $4$ con. Tính số con trung bình của mỗi hộ.',
      answer: 1.625,
      hints: [
        'Dùng công thức $\\overline{x} = \\dfrac{m_1x_1 + \\cdots + m_kx_k}{n}$ với $n = 40$.',
        'Tổng số con là $0 \\cdot 6 + 1 \\cdot 12 + 2 \\cdot 15 + 3 \\cdot 5 + 4 \\cdot 2$.',
      ],
      solution:
        'Tổng số con: $0 + 12 + 30 + 15 + 8 = 65$. $\\overline{x} = \\dfrac{65}{40} = 1{,}625$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng thống kê số áo bán được theo cỡ: cỡ $37$ bán $5$ chiếc, cỡ $38$ bán $12$ chiếc, cỡ $39$ bán $18$ chiếc, cỡ $40$ bán $9$ chiếc, cỡ $41$ bán $4$ chiếc. Tìm mốt của mẫu số liệu.',
      answer: 39,
      hints: ['Mốt là giá trị có tần số lớn nhất, không phải tần số lớn nhất.'],
      solution: 'Cỡ $39$ có tần số lớn nhất ($18$ chiếc), nên $M_o = 39$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm trung bình $5$ bài kiểm tra của Hà là $7$. Bài thứ sáu Hà phải được bao nhiêu điểm để điểm trung bình của $6$ bài là $7{,}5$?',
      answer: 10,
      hints: ['Tổng điểm $5$ bài là $5 \\cdot 7$.', 'Tổng điểm $6$ bài phải là $6 \\cdot 7{,}5$.'],
      solution:
        'Tổng $5$ bài: $35$. Tổng $6$ bài cần: $6 \\cdot 7{,}5 = 45$. Bài thứ sáu: $45 - 35 = 10$ điểm.',
    },
    {
      type: 'choice',
      prompt:
        'Giá (triệu đồng) của các căn nhà bán trong một khu phố gồm nhiều căn bình thường và vài biệt thự rất đắt. Số đặc trưng nào đại diện tốt nhất cho giá nhà ở khu phố này?',
      options: ['Trung vị', 'Số trung bình', 'Giá cao nhất', 'Giá thấp nhất'],
      answer: 0,
      hints: ['Vài giá trị rất lớn ảnh hưởng mạnh đến số đặc trưng nào?'],
      solution:
        'Các biệt thự rất đắt kéo số trung bình lên cao, còn trung vị không bị ảnh hưởng bởi giá trị quá lớn. Vì vậy trung vị đại diện tốt hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Một mẫu số liệu có $Q_1 = 20$, $Q_2 = 25$, $Q_3 = 31$. Khoảng bao nhiêu phần trăm số giá trị của mẫu lớn hơn $31$?',
      options: ['Khoảng $25\\%$', 'Khoảng $50\\%$', 'Khoảng $75\\%$', 'Khoảng $31\\%$'],
      answer: 0,
      hints: ['Ba tứ phân vị chia mẫu thành bốn phần gần bằng nhau.'],
      solution:
        'Khoảng $75\\%$ số giá trị nhỏ hơn $Q_3 = 31$, nên khoảng $25\\%$ số giá trị lớn hơn $31$.',
    },
  ],
  takeaways: [
    'Số trung bình $\\overline{x} = \\dfrac{x_1 + \\cdots + x_n}{n}$, với bảng tần số $\\overline{x} = \\dfrac{m_1x_1 + \\cdots + m_kx_k}{n}$; bị ảnh hưởng bởi giá trị quá lớn hoặc quá nhỏ.',
    'Trung vị $M_e$ là giá trị chính giữa của mẫu đã sắp xếp ($n$ chẵn: trung bình hai giá trị giữa); không bị ảnh hưởng bởi giá trị quá lớn, quá nhỏ.',
    '$Q_2 = M_e$; $Q_1$, $Q_3$ là trung vị của nửa trái, nửa phải (không tính $Q_2$ khi $n$ lẻ); ba tứ phân vị chia mẫu thành bốn phần.',
    'Mốt $M_o$ là giá trị có tần số lớn nhất; một mẫu có thể có nhiều mốt.',
  ],
};
