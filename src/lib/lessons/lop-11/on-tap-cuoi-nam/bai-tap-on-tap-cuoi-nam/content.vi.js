/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 11: hàm số lượng giác và phương trình lượng giác, dãy số, cấp số cộng, cấp số nhân, giới hạn và hàm số liên tục, hàm số mũ và logarit, đạo hàm; quan hệ song song, quan hệ vuông góc trong không gian; mẫu số liệu ghép nhóm và các quy tắc tính xác suất, kèm đề ôn thích ứng có bản đồ chủ đề.',
  intro:
    'Năm lớp 11, em đã học hàm số lượng giác và phương trình lượng giác, dãy số và hai loại cấp số, giới hạn và hàm số liên tục, hàm số mũ và hàm số logarit, đạo hàm; về hình học là quan hệ song song và quan hệ vuông góc trong không gian; cuối cùng là các số đặc trưng của mẫu số liệu ghép nhóm và các quy tắc tính xác suất. Bài ôn tập này hệ thống lại các kiến thức đó theo ba mạch: Đại số và Giải tích, Hình học và đo lường, Thống kê và xác suất. Đề ôn thích ứng ở dưới có bản đồ chủ đề: chủ đề nào em còn làm sai, đề hỏi thêm chủ đề đó và cuối đề chỉ ra phần cần ôn lại.',
  objectives: [
    'Đổi đơn vị đo góc, tính giá trị lượng giác bằng các công thức lượng giác và giải phương trình lượng giác cơ bản.',
    'Tính số hạng và tổng các số hạng đầu của cấp số cộng, cấp số nhân.',
    'Tính giới hạn của dãy số, của hàm số, tổng của cấp số nhân lùi vô hạn và xét tính liên tục của hàm số.',
    'Vận dụng tính chất của luỹ thừa, logarit để tính toán và giải phương trình, bất phương trình mũ và logarit.',
    'Tính đạo hàm, đạo hàm cấp hai, viết phương trình tiếp tuyến và tính vận tốc, gia tốc tức thời.',
    'Chứng minh quan hệ song song, vuông góc; tính góc, khoảng cách và thể tích trong không gian.',
    'Tính số trung bình, trung vị, mốt của mẫu số liệu ghép nhóm và tính xác suất bằng công thức cộng, công thức nhân.',
  ],
  sections: [
    {
      heading: 'Đại số và Giải tích',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Góc lượng giác và công thức lượng giác',
              '$\\pi \\text{ rad} = 180^\\circ$. $\\sin^2\\alpha + \\cos^2\\alpha = 1$, $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$. Công thức nhân đôi: $\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$, $\\cos 2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha = 2\\cos^2\\alpha - 1 = 1 - 2\\sin^2\\alpha$.',
            ],
            [
              'Phương trình lượng giác cơ bản',
              '$\\sin x = \\sin\\alpha \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = \\pi - \\alpha + k2\\pi$; $\\cos x = \\cos\\alpha \\Leftrightarrow x = \\pm\\alpha + k2\\pi$; $\\tan x = \\tan\\alpha \\Leftrightarrow x = \\alpha + k\\pi$ ($k \\in \\mathbb{Z}$). Hàm số $y = \\sin x$, $y = \\cos x$ có tập giá trị $[-1; 1]$, tuần hoàn chu kì $2\\pi$.',
            ],
            [
              'Cấp số cộng, cấp số nhân',
              'Cấp số cộng: $u_n = u_1 + (n - 1)d$, $S_n = \\dfrac{n(u_1 + u_n)}{2} = \\dfrac{n[2u_1 + (n - 1)d]}{2}$. Cấp số nhân: $u_n = u_1 q^{n-1}$, $S_n = \\dfrac{u_1(1 - q^n)}{1 - q}$ với $q \\ne 1$.',
            ],
            [
              'Giới hạn',
              '$\\lim \\dfrac{1}{n^k} = 0$, $\\lim q^n = 0$ khi $|q| < 1$. Cấp số nhân lùi vô hạn ($|q| < 1$) có tổng $S = \\dfrac{u_1}{1 - q}$. Dạng $\\dfrac{0}{0}$ tại $x_0$: phân tích tử và mẫu thành nhân tử rồi rút gọn $x - x_0$. Hàm số $f(x)$ liên tục tại $x_0$ khi $\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$.',
            ],
            [
              'Luỹ thừa và logarit',
              'Với $0 < a \\ne 1$, $b, c > 0$: $\\log_a(bc) = \\log_a b + \\log_a c$, $\\log_a \\dfrac{b}{c} = \\log_a b - \\log_a c$, $\\log_a b^\\alpha = \\alpha\\log_a b$, $\\log_a b = \\dfrac{\\log_c b}{\\log_c a}$ ($0 < c \\ne 1$). $a^{u} = a^{v} \\Leftrightarrow u = v$. Với $a > 1$: $\\log_a u < \\log_a v \\Leftrightarrow 0 < u < v$; với $0 < a < 1$ thì đổi chiều.',
            ],
            [
              'Đạo hàm',
              "$(x^n)' = nx^{n-1}$, $(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$, $(\\sin x)' = \\cos x$, $(\\cos x)' = -\\sin x$, $(e^x)' = e^x$, $(\\ln x)' = \\dfrac{1}{x}$. Tiếp tuyến tại $M(x_0; y_0)$: $y = f'(x_0)(x - x_0) + y_0$. Chuyển động $s = s(t)$: vận tốc $v(t) = s'(t)$, gia tốc $a(t) = v'(t) = s''(t)$.",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Tính $\\cos\\alpha$ từ $\\sin\\alpha$ (hoặc ngược lại) luôn cho hai giá trị trái dấu: chọn dấu theo khoảng chứa $\\alpha$. Khi giải phương trình, bất phương trình logarit, nhớ đặt điều kiện để biểu thức dưới dấu logarit dương rồi đối chiếu nghiệm.',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Quan hệ song song',
              'Đường thẳng $a$ không nằm trong $(P)$ và song song với một đường thẳng nằm trong $(P)$ thì $a \\parallel (P)$. Mặt phẳng $(P)$ chứa hai đường thẳng cắt nhau cùng song song với $(Q)$ thì $(P) \\parallel (Q)$. Hai mặt phẳng song song bị mặt phẳng thứ ba cắt theo hai giao tuyến song song. Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng song song hoặc cùng nằm trên một đường thẳng.',
            ],
            [
              'Đường thẳng vuông góc với mặt phẳng',
              "$d$ vuông góc với hai đường thẳng cắt nhau nằm trong $(P)$ thì $d \\perp (P)$, khi đó $d$ vuông góc với mọi đường thẳng nằm trong $(P)$. Định lí ba đường vuông góc: cho $a \\subset (P)$ và đường thẳng $b$ không nằm trong $(P)$, không vuông góc với $(P)$, có hình chiếu vuông góc trên $(P)$ là $b'$; khi đó $a \\perp b \\Leftrightarrow a \\perp b'$.",
            ],
            [
              'Góc',
              'Góc giữa đường thẳng $d$ và mặt phẳng $(P)$ là góc giữa $d$ và hình chiếu vuông góc của nó trên $(P)$. Góc phẳng nhị diện $[S, d, A]$: lấy $O \\in d$, $OS$ và $OA$ cùng vuông góc với $d$, góc $SOA$ là góc phẳng nhị diện.',
            ],
            [
              'Khoảng cách',
              'Khoảng cách từ $M$ đến $(P)$ là $MH$ với $H$ là hình chiếu vuông góc của $M$ trên $(P)$. Trong tam giác $SAB$ vuông tại $A$, đường cao $AH$ thoả mãn $\\dfrac{1}{AH^2} = \\dfrac{1}{SA^2} + \\dfrac{1}{AB^2}$.',
            ],
            [
              'Thể tích',
              "Khối chóp: $V = \\dfrac{1}{3}Sh$. Khối lăng trụ: $V = Sh$. Khối chóp cụt đều: $V = \\dfrac{1}{3}h\\left(S + \\sqrt{SS'} + S'\\right)$, với $S$, $S'$ là diện tích hai đáy, $h$ là chiều cao.",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình chóp có cạnh bên vuông góc với đáy',
          text: 'Nếu $SA \\perp (ABCD)$ thì hình chiếu của $SB$, $SC$, $SD$ trên đáy là $AB$, $AC$, $AD$; góc giữa $SC$ và đáy là góc $SCA$. Nếu đáy là hình vuông thì $BC \\perp (SAB)$, nên khoảng cách từ $A$ đến $(SBC)$ là đường cao $AH$ của tam giác $SAB$.',
        },
      ],
    },
    {
      heading: 'Thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Mẫu số liệu ghép nhóm gồm các nhóm $[a_1; a_2), [a_2; a_3), \\dots$ với tần số $m_1, m_2, \\dots$; giá trị đại diện của nhóm là trung điểm $c_i = \\dfrac{a_i + a_{i+1}}{2}$. Số trung bình: $\\overline{x} = \\dfrac{m_1c_1 + m_2c_2 + \\dots + m_kc_k}{n}$.',
            'Trung vị: nếu nhóm $[a_p; a_{p+1})$ chứa trung vị, $m_p$ là tần số của nhóm đó và $C$ là tổng tần số các nhóm đứng trước thì $M_e = a_p + \\dfrac{\\frac{n}{2} - C}{m_p} \\cdot (a_{p+1} - a_p)$. Tứ phân vị $Q_1$, $Q_3$ tính tương tự với $\\dfrac{n}{4}$ và $\\dfrac{3n}{4}$.',
            'Mốt: nếu nhóm $[a_j; a_{j+1})$ có tần số $m_j$ lớn nhất thì $M_o = a_j + \\dfrac{m_j - m_{j-1}}{(m_j - m_{j-1}) + (m_j - m_{j+1})} \\cdot h$, với $h$ là độ dài nhóm.',
            'Công thức cộng xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB)$; nếu $A$ và $B$ xung khắc thì $P(A \\cup B) = P(A) + P(B)$.',
            'Công thức nhân xác suất: nếu $A$ và $B$ độc lập thì $P(AB) = P(A) \\cdot P(B)$; khi đó $\\overline{A}$ và $B$, $A$ và $\\overline{B}$, $\\overline{A}$ và $\\overline{B}$ cũng độc lập.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ít nhất một',
          text: 'Biến cố "có ít nhất một lần xảy ra" có biến cố đối là "không lần nào xảy ra". Với hai biến cố độc lập: $P(A \\cup B) = 1 - P(\\overline{A}) \\cdot P(\\overline{B})$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tổng hợp với bản đồ chủ đề',
    instruction:
      'Đề có $18$ câu. Chín câu đầu lấy mỗi chương một câu theo thứ tự ngẫu nhiên; từ câu thứ mười, đề ưu tiên chủ đề em đã làm sai (dòng chữ phía trên câu hỏi ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $-1{,}5$) hoặc phân số dạng $26/3$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ chủ đề chấm theo lần làm đầu và cuối đề chỉ ra phần cần ôn lại.',
  },
  examples: [
    {
      problem: 'Giải phương trình $2\\sin x - \\sqrt{3} = 0$.',
      steps: [
        'Phương trình tương đương $\\sin x = \\dfrac{\\sqrt{3}}{2} = \\sin\\dfrac{\\pi}{3}$.',
        '$x = \\dfrac{\\pi}{3} + k2\\pi$ hoặc $x = \\pi - \\dfrac{\\pi}{3} + k2\\pi = \\dfrac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
      ],
      answer:
        '$x = \\dfrac{\\pi}{3} + k2\\pi$, $x = \\dfrac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$).',
    },
    {
      problem: 'Cấp số cộng $(u_n)$ có $u_2 = 5$ và $u_6 = 17$. Tìm $u_1$, $d$ và $S_{10}$.',
      steps: [
        '$u_6 - u_2 = 4d = 17 - 5 = 12$, nên $d = 3$.',
        '$u_1 = u_2 - d = 5 - 3 = 2$.',
        '$S_{10} = \\dfrac{10[2 \\cdot 2 + 9 \\cdot 3]}{2} = 5 \\cdot 31 = 155$.',
      ],
      answer: '$u_1 = 2$, $d = 3$, $S_{10} = 155$.',
    },
    {
      problem:
        'Cho hàm số $f(x) = \\dfrac{x^2 - 4}{x - 2}$ khi $x \\ne 2$ và $f(2) = a$. Tìm $a$ để hàm số liên tục tại $x = 2$.',
      steps: [
        'Với $x \\ne 2$: $f(x) = \\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$.',
        '$\\lim\\limits_{x \\to 2} f(x) = \\lim\\limits_{x \\to 2}(x + 2) = 4$.',
        'Hàm số liên tục tại $x = 2$ khi $\\lim\\limits_{x \\to 2} f(x) = f(2)$, tức là $a = 4$.',
      ],
      answer: '$a = 4$.',
    },
    {
      problem: 'Giải phương trình $\\log_2(x - 1) + \\log_2(x + 1) = 3$.',
      steps: [
        'Điều kiện: $x - 1 > 0$ và $x + 1 > 0$, tức là $x > 1$.',
        'Phương trình tương đương $\\log_2\\left[(x - 1)(x + 1)\\right] = 3$, tức là $x^2 - 1 = 2^3 = 8$, nên $x^2 = 9$.',
        '$x = 3$ thoả mãn điều kiện, $x = -3$ không thoả mãn.',
      ],
      answer: 'Tập nghiệm $S = \\{3\\}$.',
    },
    {
      problem:
        'Viết phương trình tiếp tuyến của đồ thị hàm số $y = x^3 - 3x^2 + 2$ tại điểm $M(1; 0)$.',
      steps: [
        "$y' = 3x^2 - 6x$, nên hệ số góc của tiếp tuyến là $y'(1) = 3 - 6 = -3$.",
        'Tiếp tuyến tại $M(1; 0)$: $y = -3(x - 1) + 0$.',
      ],
      answer: '$y = -3x + 3$.',
    },
    {
      problem:
        'Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a$. Tính khoảng cách từ $A$ đến mặt phẳng $(SBC)$.',
      steps: [
        '$BC \\perp AB$ và $BC \\perp SA$ nên $BC \\perp (SAB)$. Kẻ $AH \\perp SB$ tại $H$; vì $AH \\subset (SAB)$ nên $AH \\perp BC$, do đó $AH \\perp (SBC)$.',
        'Vậy $d(A, (SBC)) = AH$. Tam giác $SAB$ vuông cân tại $A$ có $SB = a\\sqrt{2}$.',
        '$AH = \\dfrac{SA \\cdot AB}{SB} = \\dfrac{a \\cdot a}{a\\sqrt{2}} = \\dfrac{a\\sqrt{2}}{2}$.',
      ],
      answer: '$d(A, (SBC)) = \\dfrac{a\\sqrt{2}}{2}$.',
    },
    {
      problem:
        'Thời gian (phút) $40$ học sinh hoàn thành một bài tập được ghép thành các nhóm $[0; 10)$, $[10; 20)$, $[20; 30)$, $[30; 40)$ với tần số lần lượt là $4$; $10$; $16$; $10$. Tìm trung vị của mẫu số liệu.',
      steps: [
        '$n = 40$, $\\dfrac{n}{2} = 20$. Tần số tích luỹ: $4$; $14$; $30$; $40$.',
        'Nhóm đầu tiên có tần số tích luỹ không nhỏ hơn $20$ là $[20; 30)$, với $m_p = 16$ và $C = 14$.',
        '$M_e = 20 + \\dfrac{20 - 14}{16} \\cdot 10 = 20 + 3{,}75 = 23{,}75$.',
      ],
      answer: '$M_e = 23{,}75$ phút.',
    },
    {
      problem:
        'Hai xạ thủ bắn độc lập vào một bia, mỗi người một viên, với xác suất bắn trúng lần lượt là $0{,}8$ và $0{,}7$. Tính xác suất để bia bị trúng ít nhất một viên.',
      steps: [
        'Gọi $A$, $B$ là biến cố người thứ nhất, người thứ hai bắn trúng; $A$ và $B$ độc lập nên $\\overline{A}$ và $\\overline{B}$ độc lập.',
        'Biến cố đối "cả hai đều trượt" có xác suất $P(\\overline{A}) \\cdot P(\\overline{B}) = 0{,}2 \\cdot 0{,}3 = 0{,}06$.',
        '$P(A \\cup B) = 1 - 0{,}06 = 0{,}94$.',
      ],
      answer: '$0{,}94$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $\\sin x = \\dfrac{1}{2}$ là',
      options: [
        '$x = \\dfrac{\\pi}{6} + k2\\pi$ và $x = \\dfrac{5\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
        '$x = \\dfrac{\\pi}{6} + k\\pi$ ($k \\in \\mathbb{Z}$)',
        '$x = \\pm\\dfrac{\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
        '$x = \\dfrac{\\pi}{3} + k2\\pi$ và $x = \\dfrac{2\\pi}{3} + k2\\pi$ ($k \\in \\mathbb{Z}$)',
      ],
      answer: 0,
      hints: [
        'Viết $\\dfrac{1}{2} = \\sin\\dfrac{\\pi}{6}$.',
        '$\\sin x = \\sin\\alpha \\Leftrightarrow x = \\alpha + k2\\pi$ hoặc $x = \\pi - \\alpha + k2\\pi$.',
      ],
      solution:
        '$\\sin x = \\sin\\dfrac{\\pi}{6} \\Leftrightarrow x = \\dfrac{\\pi}{6} + k2\\pi$ hoặc $x = \\pi - \\dfrac{\\pi}{6} + k2\\pi = \\dfrac{5\\pi}{6} + k2\\pi$ ($k \\in \\mathbb{Z}$). Công thức $\\pm\\alpha$ là của phương trình $\\cos x = \\cos\\alpha$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\cos\\alpha = -\\dfrac{4}{5}$ với $\\dfrac{\\pi}{2} < \\alpha < \\pi$. Tính $\\sin 2\\alpha$ (viết dưới dạng số thập phân).',
      answer: -0.96,
      hints: [
        'Tính $\\sin\\alpha$ từ $\\sin^2\\alpha + \\cos^2\\alpha = 1$; trong khoảng $\\left(\\dfrac{\\pi}{2}; \\pi\\right)$ thì $\\sin\\alpha > 0$.',
        '$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha$.',
      ],
      solution:
        '$\\sin^2\\alpha = 1 - \\dfrac{16}{25} = \\dfrac{9}{25}$ và $\\sin\\alpha > 0$ nên $\\sin\\alpha = \\dfrac{3}{5}$. $\\sin 2\\alpha = 2 \\cdot \\dfrac{3}{5} \\cdot \\left(-\\dfrac{4}{5}\\right) = -\\dfrac{24}{25} = -0{,}96$.',
    },
    {
      type: 'number',
      prompt:
        'Cấp số cộng $(u_n)$ có $u_1 = 2$ và công sai $d = 3$. Tính tổng $20$ số hạng đầu $S_{20}$.',
      answer: 610,
      hints: ['$S_n = \\dfrac{n[2u_1 + (n - 1)d]}{2}$.'],
      solution: '$S_{20} = \\dfrac{20[2 \\cdot 2 + 19 \\cdot 3]}{2} = 10 \\cdot 61 = 610$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\lim \\dfrac{3n^2 + n}{6n^2 - 1}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [1, 2],
      simplest: true,
      hints: ['Chia cả tử và mẫu cho $n^2$.', '$\\lim \\dfrac{1}{n} = \\lim \\dfrac{1}{n^2} = 0$.'],
      solution:
        '$\\lim \\dfrac{3n^2 + n}{6n^2 - 1} = \\lim \\dfrac{3 + \\frac{1}{n}}{6 - \\frac{1}{n^2}} = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\lim\\limits_{x \\to 2} \\dfrac{x^2 - 5x + 6}{x - 2}$.',
      answer: -1,
      hints: [
        'Thay $x = 2$ thì tử và mẫu đều bằng $0$: phân tích tử thành nhân tử.',
        '$x^2 - 5x + 6 = (x - 2)(x - 3)$.',
      ],
      solution:
        '$\\lim\\limits_{x \\to 2} \\dfrac{(x - 2)(x - 3)}{x - 2} = \\lim\\limits_{x \\to 2}(x - 3) = 2 - 3 = -1$.',
    },
    {
      type: 'number',
      prompt:
        'Tính tổng $S = 1 + \\dfrac{1}{3} + \\dfrac{1}{9} + \\dots + \\dfrac{1}{3^{n-1}} + \\dots$',
      answer: 1.5,
      hints: [
        'Đây là tổng của một cấp số nhân lùi vô hạn. Tìm $u_1$ và $q$.',
        '$S = \\dfrac{u_1}{1 - q}$.',
      ],
      solution:
        'Cấp số nhân lùi vô hạn có $u_1 = 1$, $q = \\dfrac{1}{3}$, nên $S = \\dfrac{1}{1 - \\frac{1}{3}} = \\dfrac{3}{2} = 1{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $3^{2x - 1} = 27$.',
      answer: 2,
      hints: ['Viết $27$ thành luỹ thừa của $3$.', '$3^u = 3^v \\Leftrightarrow u = v$.'],
      solution: '$3^{2x - 1} = 3^3 \\Leftrightarrow 2x - 1 = 3 \\Leftrightarrow x = 2$.',
    },
    {
      type: 'number',
      prompt: 'Bất phương trình $\\log_3(x - 1) < 2$ có bao nhiêu nghiệm nguyên?',
      answer: 8,
      hints: [
        'Điều kiện: $x - 1 > 0$.',
        'Cơ số $3 > 1$ nên bất phương trình tương đương $0 < x - 1 < 3^2$.',
      ],
      solution:
        '$0 < x - 1 < 9 \\Leftrightarrow 1 < x < 10$. Các nghiệm nguyên là $2, 3, \\dots, 9$: có $8$ nghiệm nguyên.',
    },
    {
      type: 'choice',
      prompt:
        'Phương trình tiếp tuyến của đồ thị hàm số $y = x^3 - 3x^2 + 2$ tại điểm có hoành độ $x_0 = 3$ là',
      options: ['$y = 9x - 25$', '$y = 9x + 25$', '$y = 9x - 29$', '$y = 2x - 4$'],
      answer: 0,
      hints: [
        "Tính $y_0 = y(3)$ và hệ số góc $k = y'(3)$.",
        "Tiếp tuyến: $y = y'(x_0)(x - x_0) + y_0$.",
      ],
      solution:
        "$y_0 = 27 - 27 + 2 = 2$; $y' = 3x^2 - 6x$, $y'(3) = 27 - 18 = 9$. Tiếp tuyến: $y = 9(x - 3) + 2 = 9x - 25$.",
    },
    {
      type: 'number',
      prompt:
        'Một chất điểm chuyển động có phương trình $s(t) = t^3 - 3t^2 + 4t$ ($t$ tính bằng giây, $s$ tính bằng mét). Tính gia tốc của chất điểm tại thời điểm $t = 2$ s (theo $\\text{m/s}^2$).',
      answer: 6,
      unit: 'm/s²',
      hints: ["Gia tốc $a(t) = s''(t)$.", "$s'(t) = 3t^2 - 6t + 4$."],
      solution: "$s''(t) = 6t - 6$, nên $a(2) = 6 \\cdot 2 - 6 = 6$ ($\\text{m/s}^2$).",
    },
    {
      type: 'choice',
      prompt:
        'Cho tứ diện $ABCD$. Gọi $M$, $N$ lần lượt là trung điểm của $AB$ và $AC$. Đường thẳng $MN$ song song với mặt phẳng nào?',
      options: ['$(BCD)$', '$(ABD)$', '$(ACD)$', '$(ABC)$'],
      answer: 0,
      hints: [
        '$MN$ là đường trung bình của tam giác $ABC$.',
        'Một đường thẳng không nằm trong mặt phẳng và song song với một đường thẳng của mặt phẳng đó thì song song với mặt phẳng.',
      ],
      solution:
        '$MN \\parallel BC$ (đường trung bình của tam giác $ABC$) và $BC \\subset (BCD)$, $MN$ không nằm trong $(BCD)$, nên $MN \\parallel (BCD)$. $MN$ nằm trong $(ABC)$ và cắt $(ABD)$ tại $M$, cắt $(ACD)$ tại $N$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{2}$. Tính góc giữa đường thẳng $SC$ và mặt phẳng $(ABCD)$ (theo độ).',
      answer: 45,
      unit: '°',
      hints: [
        'Hình chiếu vuông góc của $SC$ trên $(ABCD)$ là $AC$.',
        'Tính $\\tan\\widehat{SCA}$ trong tam giác $SAC$ vuông tại $A$, với $AC = a\\sqrt{2}$.',
      ],
      solution:
        'Góc cần tìm là $\\widehat{SCA}$. $\\tan\\widehat{SCA} = \\dfrac{SA}{AC} = \\dfrac{a\\sqrt{2}}{a\\sqrt{2}} = 1$, nên $\\widehat{SCA} = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Khối chóp có đáy là hình vuông cạnh $6$ cm và chiều cao $5$ cm. Tính thể tích khối chóp (theo $\\text{cm}^3$).',
      answer: 60,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3}Sh$.'],
      solution:
        '$S = 6^2 = 36$ ($\\text{cm}^2$), $V = \\dfrac{1}{3} \\cdot 36 \\cdot 5 = 60$ ($\\text{cm}^3$).',
    },
    {
      type: 'number',
      prompt:
        'Mẫu số liệu ghép nhóm có các nhóm $[0; 10)$, $[10; 20)$, $[20; 30)$, $[30; 40)$ với tần số lần lượt là $4$; $10$; $16$; $10$. Tính số trung bình của mẫu số liệu.',
      answer: 23,
      hints: [
        'Giá trị đại diện của các nhóm là $5$; $15$; $25$; $35$.',
        '$\\overline{x} = \\dfrac{m_1c_1 + \\dots + m_kc_k}{n}$.',
      ],
      solution:
        '$n = 40$, $\\overline{x} = \\dfrac{4 \\cdot 5 + 10 \\cdot 15 + 16 \\cdot 25 + 10 \\cdot 35}{40} = \\dfrac{920}{40} = 23$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai biến cố độc lập $A$ và $B$ với $P(A) = 0{,}4$ và $P(B) = 0{,}5$. Tính $P(A \\cup B)$.',
      answer: 0.7,
      hints: [
        '$A$, $B$ độc lập nên $P(AB) = P(A) \\cdot P(B)$.',
        'Công thức cộng: $P(A \\cup B) = P(A) + P(B) - P(AB)$.',
      ],
      solution:
        '$P(AB) = 0{,}4 \\cdot 0{,}5 = 0{,}2$, nên $P(A \\cup B) = 0{,}4 + 0{,}5 - 0{,}2 = 0{,}7$.',
    },
  ],
  takeaways: [
    'Từ một giá trị lượng giác, dùng $\\sin^2\\alpha + \\cos^2\\alpha = 1$ và chọn dấu theo khoảng chứa $\\alpha$.',
    'Cấp số cộng: $u_n = u_1 + (n - 1)d$; cấp số nhân: $u_n = u_1q^{n-1}$; cấp số nhân lùi vô hạn có tổng $\\dfrac{u_1}{1 - q}$.',
    'Giới hạn dạng $\\dfrac{0}{0}$: phân tích thành nhân tử và rút gọn; liên tục tại $x_0$ khi $\\lim\\limits_{x \\to x_0} f(x) = f(x_0)$.',
    'Phương trình, bất phương trình mũ và logarit: đưa về cùng cơ số, đặt điều kiện, chú ý chiều bất đẳng thức theo cơ số.',
    "Tiếp tuyến tại $M(x_0; y_0)$: $y = f'(x_0)(x - x_0) + y_0$; vận tốc $v = s'$, gia tốc $a = s''$.",
    'Góc giữa đường thẳng và mặt phẳng đo qua hình chiếu; thể tích khối chóp $\\dfrac{1}{3}Sh$, khối lăng trụ $Sh$.',
    'Ghép nhóm: số trung bình dùng giá trị đại diện; trung vị và mốt có công thức riêng. Xác suất: $P(A \\cup B) = P(A) + P(B) - P(AB)$, độc lập thì $P(AB) = P(A)P(B)$.',
  ],
};
