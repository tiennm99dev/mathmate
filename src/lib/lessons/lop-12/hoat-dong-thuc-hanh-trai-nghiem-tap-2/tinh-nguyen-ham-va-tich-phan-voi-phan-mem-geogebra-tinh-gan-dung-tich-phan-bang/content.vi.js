/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra để tìm nguyên hàm và tính tích phân, rồi tính gần đúng tích phân bằng phương pháp hình thang với độ chính xác cho trước.',
  intro:
    'Có những tích phân rất dễ viết nhưng không tính được bằng nguyên hàm quen thuộc, chẳng hạn $\\displaystyle\\int_1^2 \\dfrac{e^x}{x}\\,\\mathrm{d}x$. Cũng có khi ta không biết công thức của hàm số mà chỉ có một bảng số đo. Khi đó, phần mềm GeoGebra và phương pháp hình thang giúp ta tính gần đúng tích phân, và còn cho biết sai số lớn nhất có thể là bao nhiêu.',
  objectives: [
    'Dùng các lệnh của GeoGebra để tìm nguyên hàm, tính tích phân chính xác và tính gần đúng tích phân.',
    'Tính gần đúng tích phân bằng công thức hình thang.',
    'Ước lượng sai số của phương pháp hình thang và chọn số đoạn chia $n$ để đạt độ chính xác cho trước.',
    'Vận dụng phương pháp hình thang khi chỉ biết giá trị của hàm số tại một số điểm (bảng số đo).',
  ],
  sections: [
    {
      heading: 'Tính nguyên hàm và tích phân với GeoGebra',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic (trực tuyến tại geogebra.org hoặc phần mềm cài trên máy) và chọn cửa sổ CAS (tính toán kí hiệu). Mỗi dòng của cửa sổ CAS là một lệnh; gõ lệnh rồi nhấn Enter để nhận kết quả chính xác, hoặc nhấn nút $\\approx$ để nhận kết quả gần đúng.',
        },
        {
          type: 'table',
          head: ['Lệnh', 'Kết quả'],
          rows: [
            ['Integral(f(x))', 'Họ nguyên hàm của $f(x)$; hằng số tuỳ ý được viết là $c_1$'],
            ['Integral(f(x), a, b)', 'Tích phân $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$'],
            ['NIntegral(f(x), a, b)', 'Giá trị gần đúng của tích phân, tính bằng phương pháp số'],
            [
              'TrapezoidalSum(f, a, b, n)',
              'Tổng diện tích $n$ hình thang của phương pháp hình thang, vẽ luôn các hình thang',
            ],
          ],
          caption:
            'Một số lệnh của GeoGebra. Lệnh gõ bằng tiếng Anh dùng được với mọi ngôn ngữ giao diện.',
        },
        {
          type: 'p',
          text: 'Khi gõ lệnh, $e^x$ viết là exp(x), $\\sqrt{x}$ là sqrt(x), $\\ln x$ là ln(x), $\\pi$ là pi; phép nhân viết bằng dấu * và số thập phân viết bằng dấu chấm, chẳng hạn 0.5 thay cho $0{,}5$. Trong cửa sổ Đồ hoạ, lệnh Integral(f, a, b) còn tô màu hình phẳng giới hạn bởi đồ thị, trục hoành và hai đường thẳng $x = a$, $x = b$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra lại kết quả',
          text: "Kết quả của phần mềm có thể viết khác dạng trong sách (chẳng hạn $\\ln|x + 1|$ viết thành $\\ln(|x + 1|)$). Để kiểm tra một nguyên hàm $F(x)$ của $f(x)$, ta tính $F'(x)$ và so sánh với $f(x)$. Với những hàm số như $\\dfrac{e^x}{x}$ hay $e^{-x^2}$, nguyên hàm không viết được qua các hàm số sơ cấp đã học, nên chỉ có thể tính tích phân gần đúng.",
        },
      ],
    },
    {
      heading: 'Phương pháp hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Cho hàm số $f$ liên tục trên đoạn $[a; b]$. Chia đoạn $[a; b]$ thành $n$ đoạn con bằng nhau bởi các điểm $a = x_0 < x_1 < \\dots < x_n = b$, mỗi đoạn có độ dài $h = \\dfrac{b - a}{n}$. Trên mỗi đoạn $[x_{i-1}; x_i]$, ta thay phần đồ thị bằng đoạn thẳng nối hai điểm $(x_{i-1}; f(x_{i-1}))$ và $(x_i; f(x_i))$; tích phân trên đoạn đó xấp xỉ bằng diện tích hình thang $\\dfrac{h}{2}\\left[f(x_{i-1}) + f(x_i)\\right]$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức hình thang',
          text: 'Cộng diện tích $n$ hình thang, ta được công thức dưới đây. Hai đầu mút được tính một lần, mỗi điểm chia bên trong được tính hai lần vì là cạnh chung của hai hình thang.',
        },
        {
          type: 'tex',
          tex: '\\int_a^b f(x)\\,\\mathrm{d}x \\approx \\dfrac{b - a}{2n}\\left[f(x_0) + 2f(x_1) + 2f(x_2) + \\dots + 2f(x_{n-1}) + f(x_n)\\right]',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ước lượng sai số',
          text: "Nếu $f$ có đạo hàm cấp hai liên tục trên $[a; b]$ và $M$ là giá trị lớn nhất của $|f''(x)|$ trên $[a; b]$, thì sai số $E$ của công thức hình thang thoả mãn $$|E| \\le \\dfrac{(b - a)^3 M}{12n^2}.$$",
        },
        {
          type: 'p',
          text: 'Để tính gần đúng $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$ với độ chính xác $\\varepsilon$ cho trước, ta làm như sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "Tính $f''(x)$ và tìm $M$ là giá trị lớn nhất của $|f''(x)|$ trên $[a; b]$ (hoặc một số lớn hơn nó, khi khó tìm chính xác).",
            'Tìm số tự nhiên $n$ nhỏ nhất sao cho $\\dfrac{(b - a)^3 M}{12n^2} < \\varepsilon$.',
            'Chia $[a; b]$ thành $n$ đoạn bằng nhau và áp dụng công thức hình thang.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình thang nằm trên hay dưới đồ thị?',
          text: "Nếu $f''(x) > 0$ trên $[a; b]$ (đồ thị lõm lên, như $y = x^2$) thì mỗi cạnh trên của hình thang nằm phía trên đồ thị, nên công thức hình thang cho giá trị lớn hơn tích phân. Nếu $f''(x) < 0$ (như $y = \\sin x$ trên $[0; \\pi]$) thì ngược lại. Với hàm số bậc nhất, công thức hình thang cho đúng giá trị của tích phân.",
        },
      ],
    },
    {
      heading: 'Dự án: Đo diện tích và thể tích bằng phương pháp hình thang',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng phương pháp hình thang để tính gần đúng diện tích một hình phẳng có biên cong hoặc thể tích một vật thể từ số đo thực tế, rồi dùng GeoGebra để kiểm tra. Làm theo nhóm $3$ đến $4$ học sinh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy kẻ ô li, thước kẻ, một chiếc lá to hoặc bản đồ một hồ nước (có tỉ lệ xích); hoặc một vật tròn xoay như chai nước, quả bí; máy tính hoặc điện thoại có GeoGebra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt chiếc lá lên giấy kẻ ô, vẽ theo viền lá. Kẻ một trục dọc theo chiều dài lá và chia nó thành $n = 8$ đến $10$ đoạn bằng nhau, mỗi đoạn dài $h$.',
            'Tại mỗi điểm chia, đo bề rộng $d_i$ của lá theo phương vuông góc với trục. Hai đầu lá có bề rộng $0$.',
            'Tính diện tích gần đúng $S \\approx \\dfrac{h}{2}\\left(d_0 + 2d_1 + \\dots + 2d_{n-1} + d_n\\right)$.',
            'Kiểm tra bằng cách đếm số ô vuông nằm trong viền lá, hoặc nhập các điểm đo vào GeoGebra rồi so sánh.',
            'Làm lại với số đoạn chia gấp đôi. Nhận xét kết quả thay đổi thế nào.',
            'Mở rộng: với chai nước, đo chu vi $C_i$ tại các mặt cắt cách đều nhau, tính diện tích mặt cắt $S_i = \\dfrac{C_i^2}{4\\pi}$ rồi tính thể tích $V \\approx \\dfrac{h}{2}\\left(S_0 + 2S_1 + \\dots + S_n\\right)$. So sánh với dung tích ghi trên nhãn chai.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số đo, các bước tính, kết quả với hai cách chia, kết quả kiểm tra bằng cách đếm ô (hoặc dung tích trên nhãn) và nhận xét về nguồn gốc sai số: sai số của phép đo và sai số của phương pháp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tổng hình thang và tích phân',
    instruction:
      'Chọn hàm số rồi kéo thanh trượt $n$. Các hình thang màu xanh phủ lên phần diện tích cần tính; cửa sổ Đại số cho kết quả của lệnh Integral và TrapezoidalSum. Chọn độ chính xác $\\varepsilon$ và bấm "Chọn n nhỏ nhất" để xem số đoạn chia mà ước lượng sai số bảo đảm.',
  },
  examples: [
    {
      problem:
        'Dùng GeoGebra tìm $\\displaystyle\\int \\dfrac{x^2 - 2x + 2}{x + 1}\\,\\mathrm{d}x$, rồi kiểm tra lại bằng tính toán.',
      steps: [
        'Trong cửa sổ CAS, gõ Integral((x^2 - 2x + 2)/(x + 1)) rồi nhấn Enter: GeoGebra cho $\\dfrac{1}{2}x^2 - 3x + 5\\ln|x + 1| + c_1$.',
        'Chia đa thức: $x^2 - 2x + 2 = (x + 1)(x - 3) + 5$, nên $\\dfrac{x^2 - 2x + 2}{x + 1} = x - 3 + \\dfrac{5}{x + 1}$.',
        'Do đó $\\displaystyle\\int \\left(x - 3 + \\dfrac{5}{x + 1}\\right)\\mathrm{d}x = \\dfrac{x^2}{2} - 3x + 5\\ln|x + 1| + C$, trùng với kết quả của phần mềm.',
      ],
      answer:
        '$\\displaystyle\\int \\dfrac{x^2 - 2x + 2}{x + 1}\\,\\mathrm{d}x = \\dfrac{x^2}{2} - 3x + 5\\ln|x + 1| + C$.',
    },
    {
      problem:
        'Dùng GeoGebra tính $\\displaystyle\\int_0^{\\frac{\\pi}{2}} e^x \\cos 2x\\,\\mathrm{d}x$ (làm tròn kết quả đến hàng phần trăm).',
      steps: [
        'Gõ NIntegral(exp(x) cos(2x), 0, pi/2): GeoGebra cho $-1{,}16$.',
        "Kiểm tra: lệnh Integral(exp(x) cos(2x)) cho một nguyên hàm, viết gọn là $F(x) = \\dfrac{e^x(\\cos 2x + 2\\sin 2x)}{5}$; thật vậy $F'(x) = \\dfrac{e^x(\\cos 2x + 2\\sin 2x) + e^x(-2\\sin 2x + 4\\cos 2x)}{5} = e^x\\cos 2x$.",
        '$F\\left(\\dfrac{\\pi}{2}\\right) - F(0) = \\dfrac{-e^{\\frac{\\pi}{2}}}{5} - \\dfrac{1}{5} = -\\dfrac{e^{\\frac{\\pi}{2}} + 1}{5} \\approx -1{,}16$.',
      ],
      answer:
        '$\\displaystyle\\int_0^{\\frac{\\pi}{2}} e^x \\cos 2x\\,\\mathrm{d}x = -\\dfrac{e^{\\frac{\\pi}{2}} + 1}{5} \\approx -1{,}16$.',
    },
    {
      problem:
        'Sử dụng phương pháp hình thang, tính gần đúng $\\displaystyle\\int_1^2 \\dfrac{e^x}{x}\\,\\mathrm{d}x$ với độ chính xác $0{,}01$.',
      steps: [
        "Với $f(x) = \\dfrac{e^x}{x}$, ta có $f''(x) = \\dfrac{e^x(x^2 - 2x + 2)}{x^3} > 0$ trên $[1; 2]$. Giá trị lớn nhất của $f''$ trên $[1; 2]$ đạt tại $x = 1$, nên $M = f''(1) = e$.",
        'Cần $\\dfrac{(2 - 1)^3 e}{12n^2} < 0{,}01 \\Leftrightarrow n^2 > \\dfrac{e}{0{,}12} \\approx 22{,}65 \\Leftrightarrow n > 4{,}76$. Chọn $n = 5$, $h = 0{,}2$.',
        'Các điểm chia $1$; $1{,}2$; $1{,}4$; $1{,}6$; $1{,}8$; $2$ cho $f \\approx 2{,}7183$; $2{,}7668$; $2{,}8966$; $3{,}0956$; $3{,}3609$; $3{,}6945$.',
        '$\\displaystyle\\int_1^2 \\dfrac{e^x}{x}\\,\\mathrm{d}x \\approx \\dfrac{0{,}2}{2}\\left[2{,}7183 + 2(2{,}7668 + 2{,}8966 + 3{,}0956 + 3{,}3609) + 3{,}6945\\right] \\approx 3{,}065$.',
        'Kiểm tra: NIntegral(exp(x)/x, 1, 2) cho $3{,}059$, sai số thực sự khoảng $0{,}006 < 0{,}01$.',
      ],
      answer:
        '$\\displaystyle\\int_1^2 \\dfrac{e^x}{x}\\,\\mathrm{d}x \\approx 3{,}065$ (với $n = 5$).',
    },
    {
      problem:
        'Một thân cây dài $4{,}8$ m được cắt thành các khúc dài $60$ cm. Tại mỗi vết cắt, người ta đo diện tích mặt cắt $S$; $x$ là khoảng cách (cm) từ ngọn cây đến vết cắt. Ước lượng thể tích thân cây.',
      steps: [
        'Bảng số đo: $x = 0; 60; 120; \\dots; 480$ cho $S = 240; 248; 256; 260; 264; 272; 298; 316; 320$ (cm²).',
        'Thể tích $V = \\displaystyle\\int_0^{480} S(x)\\,\\mathrm{d}x$. Ta chỉ biết $S(x)$ tại $9$ điểm cách đều, nên dùng công thức hình thang với $n = 8$, $h = 60$.',
        'Tổng các giá trị bên trong: $248 + 256 + 260 + 264 + 272 + 298 + 316 = 1\\,914$.',
        '$V \\approx \\dfrac{60}{2}\\left(240 + 2 \\cdot 1\\,914 + 320\\right) = 30 \\cdot 4\\,388 = 131\\,640$ (cm³).',
      ],
      answer: 'Thể tích thân cây khoảng $131\\,640$ cm³, tức khoảng $0{,}13$ m³.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong cửa sổ CAS của GeoGebra, lệnh nào cho họ nguyên hàm của $f(x) = x\\sin x$?',
      options: [
        'Integral(x sin(x))',
        'Derivative(x sin(x))',
        'NIntegral(x sin(x), 0, 1)',
        'TrapezoidalSum(x sin(x), 0, 1, 4)',
      ],
      answer: 0,
      hints: ['Nguyên hàm trong tiếng Anh là antiderivative hay indefinite integral.'],
      solution:
        'Lệnh Integral với một đối số cho họ nguyên hàm (GeoGebra cho $\\sin x - x\\cos x + c_1$). Derivative tính đạo hàm, còn NIntegral và TrapezoidalSum cho một số: giá trị gần đúng của tích phân trên một đoạn.',
    },
    {
      type: 'choice',
      prompt:
        'GeoGebra cho $\\displaystyle\\int \\dfrac{x^2 + 1}{x}\\,\\mathrm{d}x$ bằng biểu thức nào sau đây (với $x > 0$)?',
      options: [
        '$\\dfrac{x^2}{2} + \\ln x + C$',
        '$\\dfrac{x^2}{2} - \\dfrac{1}{x^2} + C$',
        '$x^2 + \\ln x + C$',
        '$\\left(\\dfrac{x^3}{3} + x\\right)\\ln x + C$',
      ],
      answer: 0,
      hints: ['Tách $\\dfrac{x^2 + 1}{x} = x + \\dfrac{1}{x}$.'],
      solution:
        "$\\displaystyle\\int \\left(x + \\dfrac{1}{x}\\right)\\mathrm{d}x = \\dfrac{x^2}{2} + \\ln x + C$ với $x > 0$. Kiểm tra: $\\left(\\dfrac{x^2}{2} + \\ln x\\right)' = x + \\dfrac{1}{x}$.",
    },
    {
      type: 'number',
      prompt:
        'Dùng công thức hình thang với $n = 2$ để tính gần đúng $\\displaystyle\\int_0^2 x^2\\,\\mathrm{d}x$.',
      answer: 3,
      hints: [
        'Với $n = 2$, $h = 1$ và các điểm chia là $0$, $1$, $2$.',
        'Tính $\\dfrac{h}{2}\\left[f(0) + 2f(1) + f(2)\\right]$.',
      ],
      solution:
        "$\\dfrac{1}{2}\\left[0 + 2 \\cdot 1 + 4\\right] = 3$. Giá trị đúng là $\\dfrac{8}{3} \\approx 2{,}67$: vì $f''(x) = 2 > 0$, công thức hình thang cho giá trị lớn hơn.",
    },
    {
      type: 'number',
      prompt:
        'Dùng công thức hình thang với $n = 4$ để tính gần đúng $\\displaystyle\\int_1^2 \\dfrac{1}{x}\\,\\mathrm{d}x$ (làm tròn đến hàng phần nghìn).',
      answer: 0.697,
      tolerance: 0.0005,
      hints: [
        '$h = 0{,}25$; các điểm chia $1$; $1{,}25$; $1{,}5$; $1{,}75$; $2$.',
        '$f = 1$; $0{,}8$; $\\dfrac{2}{3}$; $\\dfrac{4}{7}$; $0{,}5$.',
      ],
      solution:
        '$\\dfrac{0{,}25}{2}\\left[1 + 2\\left(0{,}8 + \\dfrac{2}{3} + \\dfrac{4}{7}\\right) + 0{,}5\\right] \\approx 0{,}125 \\cdot 5{,}5762 \\approx 0{,}697$. Giá trị đúng là $\\ln 2 \\approx 0{,}693$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn tính gần đúng $\\displaystyle\\int_0^2 x^2\\,\\mathrm{d}x$ bằng phương pháp hình thang với độ chính xác $0{,}01$, theo ước lượng sai số cần chia đoạn $[0; 2]$ thành ít nhất bao nhiêu đoạn?',
      answer: 12,
      hints: [
        "$f''(x) = 2$, nên $M = 2$.",
        'Giải $\\dfrac{2^3 \\cdot 2}{12n^2} < 0{,}01$, tức $n^2 > \\dfrac{400}{3}$.',
      ],
      solution:
        '$\\dfrac{16}{12n^2} < 0{,}01 \\Leftrightarrow n^2 > \\dfrac{400}{3} \\approx 133{,}3 \\Leftrightarrow n > 11{,}5$. Số tự nhiên nhỏ nhất là $n = 12$.',
    },
    {
      type: 'choice',
      prompt:
        "Hàm số $f$ có $f''(x) > 0$ với mọi $x \\in [a; b]$. So với $I = \\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$, kết quả $T_n$ của công thức hình thang thế nào?",
      options: ['$T_n > I$', '$T_n < I$', '$T_n = I$', 'Không so sánh được'],
      answer: 0,
      hints: [
        "Khi $f''(x) > 0$, đồ thị lõm lên (như $y = x^2$). Đoạn thẳng nối hai điểm của đồ thị nằm trên hay dưới đồ thị?",
      ],
      solution:
        'Đồ thị lõm lên nên trên mỗi đoạn con, cạnh trên của hình thang (dây cung) nằm phía trên đồ thị. Mỗi hình thang có diện tích lớn hơn phần tích phân tương ứng, nên $T_n > I$.',
    },
    {
      type: 'number',
      prompt:
        'Một cái ao dài $60$ m. Đo bề rộng của ao tại các điểm cách đều nhau $10$ m dọc theo chiều dài, được $0$; $18$; $24$; $26$; $22$; $15$; $0$ (m). Dùng phương pháp hình thang ước lượng diện tích mặt ao (m²).',
      answer: 1050,
      unit: 'm²',
      hints: [
        'Có $7$ số đo nên $n = 6$, $h = 10$.',
        'Tính $\\dfrac{10}{2}\\left[0 + 2(18 + 24 + 26 + 22 + 15) + 0\\right]$.',
      ],
      solution: '$S \\approx 5\\left[0 + 2 \\cdot 105 + 0\\right] = 1\\,050$ (m²).',
    },
    {
      type: 'number',
      prompt:
        'Với $\\displaystyle\\int_1^2 \\dfrac{e^x}{x}\\,\\mathrm{d}x$ và $n = 4$, ước lượng sai số $\\dfrac{(b - a)^3 M}{12n^2}$ (với $M = e$) bằng bao nhiêu? Làm tròn đến hàng phần nghìn.',
      answer: 0.014,
      tolerance: 0.0005,
      hints: ['Thay $b - a = 1$, $M = e \\approx 2{,}718$, $n = 4$.'],
      solution:
        '$\\dfrac{e}{12 \\cdot 16} = \\dfrac{e}{192} \\approx 0{,}014 > 0{,}01$. Vì vậy $n = 4$ chưa đủ bảo đảm độ chính xác $0{,}01$, phải chọn $n = 5$.',
    },
    {
      type: 'text',
      prompt:
        'Gõ lệnh GeoGebra để tính tổng hình thang với $5$ đoạn chia cho hàm số $f$ trên đoạn $[1; 2]$.',
      accept: [
        'TrapezoidalSum(f, 1, 2, 5)',
        'TrapezoidalSum(f,1,2,5)',
        'TrapezoidalSum(f(x), 1, 2, 5)',
        'TrapezoidalSum(f(x),1,2,5)',
      ],
      hints: ['Lệnh có dạng TrapezoidalSum(hàm số, a, b, n).'],
      solution:
        'TrapezoidalSum(f, 1, 2, 5). Với $f(x) = \\dfrac{e^x}{x}$, phần mềm cho khoảng $3{,}07$ và vẽ năm hình thang.',
    },
  ],
  takeaways: [
    'GeoGebra: Integral(f(x)) cho họ nguyên hàm, Integral(f(x), a, b) cho tích phân, NIntegral cho giá trị gần đúng, TrapezoidalSum cho tổng hình thang.',
    'Công thức hình thang: $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x \\approx \\dfrac{b - a}{2n}[f(x_0) + 2f(x_1) + \\dots + 2f(x_{n-1}) + f(x_n)]$.',
    "Sai số: $|E| \\le \\dfrac{(b - a)^3 M}{12n^2}$, với $M$ là giá trị lớn nhất của $|f''(x)|$ trên $[a; b]$; chọn $n$ nhỏ nhất làm vế phải nhỏ hơn $\\varepsilon$.",
    'Phương pháp hình thang dùng được cả khi chỉ có bảng số đo cách đều, như diện tích mặt cắt của một thân cây.',
  ],
};
