/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải các bài toán thực tiễn bằng cách lập hệ phương trình bậc nhất ba ẩn: mua hàng và phân bổ chi phí, pha trộn, mạch điện trong Vật lí, cân bằng phương trình phản ứng trong Hoá học, phối trộn thức ăn trong Sinh học và cân bằng cung – cầu trong kinh tế.',
  intro:
    'Một kĩ sư điện tính cường độ dòng điện trong từng nhánh, một người pha chế tính lượng mỗi loại dung dịch cần lấy, một nhà kinh tế tìm giá cân bằng của ba mặt hàng. Họ có chung một công cụ: khi bài toán có ba đại lượng chưa biết và ba mối liên hệ bậc nhất giữa chúng, ta lập và giải một hệ phương trình bậc nhất ba ẩn.',
  objectives: [
    'Đặt ẩn, nêu điều kiện của ẩn và lập hệ phương trình bậc nhất ba ẩn từ một tình huống thực tiễn.',
    'Vận dụng định luật Ohm và tính chất đoạn mạch song song để lập hệ cho bài toán mạch điện.',
    'Cân bằng phương trình phản ứng hoá học bằng hệ phương trình (bảo toàn số nguyên tử mỗi nguyên tố).',
    'Tìm giá cân bằng của thị trường bằng điều kiện lượng cung bằng lượng cầu.',
    'Giải hệ, đối chiếu nghiệm với điều kiện của ẩn và trả lời bài toán.',
  ],
  sections: [
    {
      heading: 'Giải bài toán bằng cách lập hệ phương trình',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt ẩn: chọn ba đại lượng chưa biết làm ẩn $x$, $y$, $z$, ghi đơn vị và điều kiện của ẩn (chẳng hạn số xe là số tự nhiên, khối lượng không âm).',
            'Lập hệ: biểu diễn ba mối liên hệ của đề bài thành ba phương trình bậc nhất.',
            'Giải hệ bằng phương pháp Gauss hoặc máy tính cầm tay.',
            'Đối chiếu nghiệm với điều kiện của ẩn, thử lại với đề bài rồi kết luận.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bài toán mua hàng, chia tiền hay phân bổ chi phí cho ba khoản là dạng quen thuộc nhất: mỗi người mua (hoặc mỗi khoản chi) cho một phương trình "tổng số tiền". Hãy dùng phần khám phá để lập hệ và kéo thanh trượt kiểm tra nghiệm.',
        },
      ],
    },
    {
      heading: 'Ứng dụng trong Vật lí: mạch điện',
      blocks: [
        {
          type: 'p',
          text: 'Với đoạn mạch gồm hai điện trở $R_1$, $R_2$ mắc song song: hiệu điện thế $U$ giữa hai đầu mỗi điện trở như nhau, cường độ dòng điện trong mạch chính bằng tổng cường độ dòng điện trong các mạch rẽ, và theo định luật Ohm $U = R_1I_1 = R_2I_2$.',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} I_1 + I_2 = I \\\\ R_1I_1 - U = 0 \\\\ R_2I_2 - U = 0 \\end{cases}',
        },
        {
          type: 'p',
          text: 'Đây là hệ bậc nhất ba ẩn $I_1$, $I_2$, $U$ khi biết $R_1$, $R_2$ và $I$.',
        },
      ],
    },
    {
      heading: 'Ứng dụng trong Hoá học: cân bằng phương trình phản ứng',
      blocks: [
        {
          type: 'p',
          text: 'Trong phản ứng hoá học, số nguyên tử của mỗi nguyên tố ở hai vế bằng nhau. Đặt các hệ số chưa biết là ẩn, mỗi nguyên tố cho một phương trình. Phản ứng có bốn chất thì có bốn hệ số; chọn trước một hệ số (thường bằng $1$) để còn ba ẩn.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\mathrm{C_3H_8} + y\\,\\mathrm{O_2} \\to z\\,\\mathrm{CO_2} + t\\,\\mathrm{H_2O}$: nguyên tố C cho $z = 3$, nguyên tố H cho $2t = 8$, nguyên tố O cho $2y = 2z + t$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu nghiệm có phân số, nhân tất cả các hệ số với mẫu số chung để được các hệ số nguyên nhỏ nhất.',
        },
      ],
    },
    {
      heading: 'Ứng dụng trong Sinh học và kinh tế',
      blocks: [
        {
          type: 'p',
          text: 'Trong chăn nuôi và trồng trọt, người ta phối trộn thức ăn hay phân bón từ nhiều loại để hỗn hợp có đủ lượng chất dinh dưỡng cần thiết (đạm, chất béo; hay đạm, lân, kali). Mỗi chất dinh dưỡng cho một phương trình.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá cân bằng',
          text: 'Lượng cung $Q_S$ là lượng hàng người bán muốn bán, lượng cầu $Q_D$ là lượng hàng người mua muốn mua ở một mức giá. Thị trường cân bằng khi $Q_S = Q_D$; giá khi đó gọi là giá cân bằng.',
        },
        {
          type: 'p',
          text: 'Khi ba mặt hàng liên quan với nhau, lượng cung và lượng cầu của mỗi mặt hàng có thể phụ thuộc vào giá $x$, $y$, $z$ của cả ba. Điều kiện cân bằng cho từng mặt hàng cho ta một hệ ba phương trình.',
        },
      ],
    },
    {
      heading: 'Dự án: Bài toán ba ẩn quanh em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm tìm một tình huống thực tế ở gia đình, trường học hay địa phương dẫn đến hệ phương trình bậc nhất ba ẩn, thu thập số liệu thật, lập hệ, giải và trình bày.',
        },
        {
          type: 'p',
          text: 'Gợi ý tình huống: chia tiền mua sắm cho ba loại hàng ở chợ; pha nước giải khát từ ba loại nước có độ ngọt khác nhau; trộn ba loại thức ăn cho vật nuôi theo thành phần ghi trên bao bì; cân bằng một phương trình phản ứng trong sách Hoá học.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ghi lại số liệu (hoá đơn, nhãn bao bì, công thức hoá học) và nguồn của chúng.',
            'Đặt ẩn, nêu điều kiện của ẩn và lập hệ ba phương trình.',
            'Giải hệ bằng phương pháp Gauss và kiểm tra lại bằng máy tính cầm tay.',
            'Đối chiếu nghiệm với điều kiện và với thực tế: nghiệm có hợp lí không? Nếu không, số liệu hay cách lập hệ sai ở đâu?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một trang trình bày tình huống, bảng số liệu, hệ phương trình, lời giải và nhận xét về tính hợp lí của kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lập hệ và kiểm tra nghiệm',
    instruction:
      'Chọn một tình huống, đọc hệ phương trình lập được và nghĩa của từng phương trình. Kéo các thanh trượt để chọn giá trị của ba ẩn: mỗi phương trình cho biết vế trái sau khi thay số và đã đúng hay chưa. Hãy giải hệ trên giấy rồi kéo đến nghiệm để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Cho đoạn mạch gồm hai điện trở $R_1 = 6\\ \\Omega$ và $R_2 = 12\\ \\Omega$ mắc song song, cường độ dòng điện trong mạch chính là $I = 3$ A. Tính $I_1$, $I_2$ và hiệu điện thế $U$ giữa hai đầu đoạn mạch.',
      steps: [
        'Ẩn: $I_1$, $I_2$ (A) và $U$ (V), đều dương. Ta có hệ $\\begin{cases} I_1 + I_2 = 3 \\\\ 6I_1 - U = 0 \\\\ 12I_2 - U = 0. \\end{cases}$',
        'Từ hai phương trình sau: $6I_1 = 12I_2$, nên $I_1 = 2I_2$.',
        'Thay vào phương trình đầu: $3I_2 = 3$, nên $I_2 = 1$, $I_1 = 2$, $U = 6 \\cdot 2 = 12$.',
      ],
      answer: '$I_1 = 2$ A, $I_2 = 1$ A, $U = 12$ V.',
    },
    {
      problem:
        'Cân bằng phương trình phản ứng đốt cháy octane: $\\mathrm{C_8H_{18}} + \\mathrm{O_2} \\to \\mathrm{CO_2} + \\mathrm{H_2O}$.',
      steps: [
        'Chọn hệ số của $\\mathrm{C_8H_{18}}$ bằng $1$ và gọi $y$, $z$, $t$ là hệ số của $\\mathrm{O_2}$, $\\mathrm{CO_2}$, $\\mathrm{H_2O}$.',
        'Bảo toàn nguyên tố: C cho $z = 8$; H cho $2t = 18$; O cho $2y = 2z + t$.',
        'Giải: $z = 8$, $t = 9$, $2y = 16 + 9 = 25$, nên $y = \\dfrac{25}{2}$.',
        'Nhân mọi hệ số với $2$ để được số nguyên: $2$, $25$, $16$, $18$.',
      ],
      answer: '$2\\mathrm{C_8H_{18}} + 25\\mathrm{O_2} \\to 16\\mathrm{CO_2} + 18\\mathrm{H_2O}$.',
    },
    {
      problem:
        'Một người nuôi cá cần trộn $10$ kg thức ăn từ ba loại I, II, III. Mỗi kg loại I có $0{,}4$ kg chất đạm và $0{,}1$ kg chất béo; loại II có $0{,}2$ kg chất đạm và $0{,}2$ kg chất béo; loại III có $0{,}1$ kg chất đạm và $0{,}05$ kg chất béo. Hỗn hợp cần có $2{,}3$ kg chất đạm và $1{,}25$ kg chất béo. Mỗi loại cần bao nhiêu ki-lô-gam?',
      steps: [
        'Gọi $x$, $y$, $z$ (kg) là khối lượng loại I, II, III ($x, y, z \\ge 0$).',
        'Khối lượng: $x + y + z = 10$. Chất đạm: $0{,}4x + 0{,}2y + 0{,}1z = 2{,}3$, nhân $10$: $4x + 2y + z = 23$. Chất béo: $0{,}1x + 0{,}2y + 0{,}05z = 1{,}25$, nhân $20$: $2x + 4y + z = 25$.',
        'Trừ phương trình thứ nhất khỏi hai phương trình sau: $3x + y = 13$ và $x + 3y = 15$.',
        'Từ $y = 13 - 3x$: $x + 39 - 9x = 15$, nên $x = 3$, $y = 4$, $z = 10 - 3 - 4 = 3$. Cả ba đều không âm.',
      ],
      answer: 'Cần $3$ kg loại I, $4$ kg loại II và $3$ kg loại III.',
    },
    {
      problem:
        'Ba mặt hàng có giá $x$, $y$, $z$ (nghìn đồng) với lượng cung và lượng cầu: $Q_{S1} = 3x - 20$, $Q_{D1} = 35 - x + y - z$; $Q_{S2} = 2y - 5$, $Q_{D2} = 20 + x - 2y$; $Q_{S3} = 4z - 8$, $Q_{D3} = 27 - x + y - 2z$. Tìm giá cân bằng của ba mặt hàng.',
      steps: [
        'Cân bằng: $Q_{S1} = Q_{D1}$, $Q_{S2} = Q_{D2}$, $Q_{S3} = Q_{D3}$, tức là $\\begin{cases} 4x - y + z = 55 \\\\ -x + 4y = 25 \\\\ x - y + 6z = 35. \\end{cases}$',
        'Đưa $x - y + 6z = 35$ lên đầu. Cộng $-x + 4y = 25$ với nó: $3y + 6z = 60$, tức $y + 2z = 20$. Cộng $4x - y + z = 55$ với $(-4)$ lần nó: $3y - 23z = -85$.',
        'Cộng $3y - 23z = -85$ với $(-3)$ lần $y + 2z = 20$: $-29z = -145$, nên $z = 5$.',
        'Suy ra $y = 20 - 10 = 10$ và $x = 35 + 10 - 30 = 15$.',
      ],
      answer: 'Giá cân bằng: $x = 15$, $y = 10$, $z = 5$ (nghìn đồng).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hà mua $2$ kg thịt lợn, $1$ kg thịt bò, $1$ kg thịt gà hết $580$ nghìn đồng; Lan mua $1$ kg thịt lợn, $2$ kg thịt bò, $1$ kg thịt gà hết $710$ nghìn đồng; Minh mua $1$ kg thịt lợn, $1$ kg thịt bò, $3$ kg thịt gà hết $640$ nghìn đồng. Giá $1$ kg thịt bò là bao nhiêu nghìn đồng?',
      answer: 250,
      unit: 'nghìn đồng',
      hints: [
        'Hệ $\\begin{cases} 2x + y + z = 580 \\\\ x + 2y + z = 710 \\\\ x + y + 3z = 640 \\end{cases}$ với $x$, $y$, $z$ là giá thịt lợn, bò, gà.',
        'Trừ phương trình thứ hai cho phương trình thứ nhất: $y - x = 130$.',
      ],
      solution:
        'Đưa $x + 2y + z = 710$ lên đầu. Khử $x$: $-3y - z = -840$ và $-y + 2z = -70$. Khử $y$: lấy phương trình đầu trừ $3$ lần phương trình sau được $-7z = -630$, $z = 90$; $y = 70 + 2 \\cdot 90 = 250$; $x = 710 - 500 - 90 = 120$. Thịt bò $250$ nghìn đồng/kg.',
    },
    {
      type: 'number',
      prompt:
        'Mai pha $100$ ml dung dịch chứa $32$ ml acid nguyên chất từ ba lọ nồng độ $10\\%$, $30\\%$, $50\\%$, trong đó lượng lấy từ lọ $50\\%$ gấp đôi lượng lấy từ lọ $10\\%$. Mai lấy bao nhiêu mililít từ lọ $30\\%$?',
      answer: 70,
      unit: 'ml',
      hints: [
        'Hệ: $x + y + z = 100$, $0{,}1x + 0{,}3y + 0{,}5z = 32$, $z = 2x$.',
        'Thay $z = 2x$: $3x + y = 100$ và $1{,}1x + 0{,}3y = 32$.',
      ],
      solution:
        'Thay $z = 2x$: $y = 100 - 3x$ và $1{,}1x + 0{,}3(100 - 3x) = 32$, tức $0{,}2x = 2$, $x = 10$. Vậy $y = 70$, $z = 20$. Thử lại: $1 + 21 + 10 = 32$ ml acid.',
    },
    {
      type: 'number',
      prompt:
        'Cân bằng phản ứng $\\mathrm{CH_4} + y\\,\\mathrm{O_2} \\to z\\,\\mathrm{CO_2} + t\\,\\mathrm{H_2O}$ (hệ số của $\\mathrm{CH_4}$ là $1$). Hệ số $y$ của $\\mathrm{O_2}$ bằng bao nhiêu?',
      answer: 2,
      hints: ['Bảo toàn nguyên tố: C cho $z = 1$, H cho $2t = 4$, O cho $2y = 2z + t$.'],
      solution:
        '$z = 1$, $t = 2$, $2y = 2 + 2 = 4$, nên $y = 2$: $\\mathrm{CH_4} + 2\\mathrm{O_2} \\to \\mathrm{CO_2} + 2\\mathrm{H_2O}$.',
    },
    {
      type: 'number',
      prompt:
        'Cân bằng phương trình $\\mathrm{C_8H_{18}} + \\mathrm{O_2} \\to \\mathrm{CO_2} + \\mathrm{H_2O}$ với các hệ số nguyên dương nhỏ nhất. Hệ số của $\\mathrm{O_2}$ là bao nhiêu?',
      answer: 25,
      hints: [
        'Chọn hệ số của $\\mathrm{C_8H_{18}}$ là $1$ rồi bảo toàn C, H, O.',
        'Được hệ số của $\\mathrm{O_2}$ là $\\dfrac{25}{2}$: nhân tất cả với $2$.',
      ],
      solution:
        'Với hệ số $\\mathrm{C_8H_{18}}$ bằng $1$: $z = 8$, $t = 9$, $y = \\dfrac{2 \\cdot 8 + 9}{2} = \\dfrac{25}{2}$. Nhân với $2$: $2\\mathrm{C_8H_{18}} + 25\\mathrm{O_2} \\to 16\\mathrm{CO_2} + 18\\mathrm{H_2O}$.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện trở $R_1 = 4\\ \\Omega$ và $R_2 = 6\\ \\Omega$ mắc song song, cường độ dòng điện mạch chính là $5$ A. Hiệu điện thế $U$ giữa hai đầu đoạn mạch là bao nhiêu vôn?',
      answer: 12,
      unit: 'V',
      hints: ['Lập hệ $I_1 + I_2 = 5$, $4I_1 = U$, $6I_2 = U$.'],
      solution:
        'Từ $4I_1 = 6I_2$: $I_1 = 1{,}5I_2$. Thay vào: $2{,}5I_2 = 5$, $I_2 = 2$, $I_1 = 3$, $U = 4 \\cdot 3 = 12$ V.',
    },
    {
      type: 'number',
      prompt:
        'Tổng số tuổi của Hà, chị Mai và anh Nam là $46$. Tuổi anh Nam gấp ba lần tuổi Hà, chị Mai hơn Hà $6$ tuổi. Chị Mai bao nhiêu tuổi?',
      answer: 14,
      unit: 'tuổi',
      hints: [
        'Gọi tuổi Hà, chị Mai, anh Nam là $x$, $y$, $z$: $x + y + z = 46$, $z = 3x$, $y = x + 6$.',
      ],
      solution:
        'Thay vào: $x + (x + 6) + 3x = 46$, $5x = 40$, $x = 8$. Chị Mai $8 + 6 = 14$ tuổi, anh Nam $24$ tuổi.',
    },
    {
      type: 'number',
      prompt:
        'Ba lớp 10A, 10B, 10C có tổng cộng $128$ học sinh cùng trồng cây: mỗi em lớp 10A trồng $3$ cây, lớp 10B trồng $4$ cây, lớp 10C trồng $5$ cây, cả ba lớp trồng được $517$ cây. Lớp 10C nhiều hơn lớp 10B $2$ học sinh. Lớp 10B có bao nhiêu học sinh?',
      answer: 43,
      unit: 'học sinh',
      hints: [
        'Hệ: $x + y + z = 128$, $3x + 4y + 5z = 517$, $z - y = 2$.',
        'Thay $z = y + 2$ vào hai phương trình đầu.',
      ],
      solution:
        'Thay $z = y + 2$: $x + 2y = 126$ và $3x + 9y = 507$, tức $x + 3y = 169$. Trừ: $y = 43$, $x = 40$, $z = 45$. Thử lại: $120 + 172 + 225 = 517$.',
    },
    {
      type: 'number',
      prompt:
        'Bác Việt chia $1\\,200$ triệu đồng thành ba phần: gửi tiết kiệm lãi suất $4\\%$/năm, mua trái phiếu lãi suất $6\\%$/năm và góp vốn kinh doanh lãi $5\\%$/năm. Sau một năm bác được $60{,}4$ triệu đồng tiền lãi. Số tiền góp vốn bằng tổng hai phần kia. Bác mua trái phiếu bao nhiêu triệu đồng?',
      answer: 320,
      unit: 'triệu đồng',
      hints: [
        'Hệ: $x + y + z = 1\\,200$, $0{,}04x + 0{,}06y + 0{,}05z = 60{,}4$, $z = x + y$.',
        'Từ phương trình thứ nhất và thứ ba: $z = 600$, $x + y = 600$.',
      ],
      solution:
        '$z = 600$, $x + y = 600$. Tiền lãi: $0{,}04x + 0{,}06y = 60{,}4 - 30 = 30{,}4$. Thay $x = 600 - y$: $24 + 0{,}02y = 30{,}4$, $y = 320$, $x = 280$. Bác mua trái phiếu $320$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt: 'Giá cân bằng của một mặt hàng là mức giá tại đó',
      options: [
        'lượng cung bằng lượng cầu',
        'lượng cung lớn nhất',
        'lượng cầu bằng $0$',
        'giá bán bằng giá mua của người bán',
      ],
      answer: 0,
      hints: [
        'Thị trường "cân bằng" khi lượng hàng người bán muốn bán đúng bằng lượng người mua muốn mua.',
      ],
      solution: 'Thị trường cân bằng khi $Q_S = Q_D$; mức giá khi đó là giá cân bằng.',
    },
  ],
  takeaways: [
    'Các bước: đặt ẩn và điều kiện, lập hệ ba phương trình, giải hệ, đối chiếu điều kiện rồi kết luận.',
    'Mạch song song: $I = I_1 + I_2$ và $U = R_1I_1 = R_2I_2$.',
    'Cân bằng phản ứng: mỗi nguyên tố cho một phương trình; chọn trước một hệ số rồi đưa về hệ số nguyên nhỏ nhất.',
    'Phối trộn: mỗi thành phần (thể tích, chất dinh dưỡng, acid) cho một phương trình.',
    'Giá cân bằng thoả mãn $Q_S = Q_D$ cho từng mặt hàng.',
  ],
};
