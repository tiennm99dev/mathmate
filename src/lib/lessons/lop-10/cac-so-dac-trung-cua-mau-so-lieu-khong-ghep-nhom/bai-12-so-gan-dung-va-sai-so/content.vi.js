/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số gần đúng, sai số tuyệt đối, độ chính xác và sai số tương đối của một số gần đúng; quy tắc làm tròn và cách quy tròn một số gần đúng khi biết độ chính xác của nó.',
  intro:
    'Đo chiều dài chiếc bút chì bằng thước kẻ, em đọc được $13{,}7$ cm. Nhưng độ dài thật của chiếc bút có đúng là $13{,}7$ cm không? Hầu hết các số đo, số liệu thống kê hay kết quả tính với $\\pi$, $\\sqrt{2}$ đều chỉ là số gần đúng. Bài này cho em cách đánh giá một số gần đúng sai lệch bao nhiêu và viết nó gọn gàng, hợp lí.',
  objectives: [
    'Hiểu khái niệm số gần đúng, sai số tuyệt đối, độ chính xác và sai số tương đối.',
    'Đánh giá được sai số tuyệt đối, sai số tương đối của một số gần đúng; so sánh độ chính xác của hai phép đo.',
    'Quy tròn được một số gần đúng theo quy tắc làm tròn và khi biết độ chính xác của nó.',
  ],
  sections: [
    {
      heading: 'Số gần đúng',
      blocks: [
        {
          type: 'p',
          text: 'Khi đo đạc hay tính toán, ta thường không biết giá trị đúng của đại lượng mà chỉ có một giá trị xấp xỉ nó. Chẳng hạn, đo chiều dài chiếc bút được $13{,}7$ cm; lấy $\\pi \\approx 3{,}14$ để tính chu vi hình tròn; dân số một tỉnh là khoảng $1{,}3$ triệu người.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số gần đúng',
          text: 'Số $a$ biểu thị giá trị của một đại lượng, xấp xỉ với giá trị thực (số đúng) $\\overline{a}$ của đại lượng ấy, được gọi là một số gần đúng của $\\overline{a}$.',
        },
      ],
    },
    {
      heading: 'Sai số tuyệt đối và sai số tương đối',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sai số tuyệt đối',
          text: 'Nếu $a$ là số gần đúng của số đúng $\\overline{a}$ thì $\\Delta_a = |\\overline{a} - a|$ được gọi là sai số tuyệt đối của số gần đúng $a$.',
        },
        {
          type: 'p',
          text: 'Ta thường không biết $\\overline{a}$ nên không tính được chính xác $\\Delta_a$, nhưng có thể đánh giá nó không vượt quá một số dương $d$ nào đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ chính xác',
          text: 'Nếu $\\Delta_a \\le d$ thì $a - d \\le \\overline{a} \\le a + d$. Khi đó ta nói $a$ là số gần đúng của $\\overline{a}$ với độ chính xác $d$, và quy ước viết gọn là $\\overline{a} = a \\pm d$.',
        },
        {
          type: 'p',
          text: 'Khi đo bằng một dụng cụ và đọc kết quả ở vạch chia gần nhất, độ dài đúng lệch khỏi số đọc được không quá nửa độ chia. Chẳng hạn thước chia đến milimét ($0{,}1$ cm) cho độ chính xác $d = 0{,}05$ cm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sai số tương đối',
          text: 'Sai số tương đối của số gần đúng $a$ là $\\delta_a = \\dfrac{\\Delta_a}{|a|}$. Nếu $\\overline{a} = a \\pm d$ thì $\\delta_a \\le \\dfrac{d}{|a|}$.',
        },
        {
          type: 'p',
          text: 'Sai số tương đối thường được viết dưới dạng phần trăm. Tỉ số $\\dfrac{d}{|a|}$ càng nhỏ thì phép đo càng chính xác. Sai số tuyệt đối chưa đủ để so sánh hai phép đo: sai $1$ cm khi đo một sân bóng dài $105$ m là rất nhỏ, nhưng sai $1$ cm khi đo một cục tẩy dài $4$ cm là rất lớn.',
        },
      ],
    },
    {
      heading: 'Số quy tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc làm tròn',
          text: 'Nếu chữ số ngay sau hàng quy tròn nhỏ hơn $5$ thì ta thay chữ số đó và các chữ số bên phải nó bởi chữ số $0$ (bỏ đi nếu ở phần thập phân). Nếu chữ số ngay sau hàng quy tròn lớn hơn hoặc bằng $5$ thì ta làm như trên nhưng cộng thêm $1$ vào chữ số của hàng quy tròn.',
        },
        {
          type: 'p',
          text: 'Số nhận được gọi là số quy tròn. Khi thay một số bằng số quy tròn của nó đến một hàng nào đó thì sai số tuyệt đối của số quy tròn không vượt quá nửa đơn vị của hàng làm tròn. Ví dụ, quy tròn $3{,}1463$ đến hàng phần trăm được $3{,}15$, sai lệch không quá $0{,}005$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tròn số gần đúng khi biết độ chính xác',
          text: 'Cho số gần đúng $a$ với độ chính xác $d$. Khi được yêu cầu quy tròn $a$ mà không nói rõ quy tròn đến hàng nào, ta quy tròn $a$ đến hàng thấp nhất mà $d$ nhỏ hơn một đơn vị của hàng đó. Nói cách khác: tìm hàng của chữ số khác $0$ đầu tiên (từ trái sang) của $d$, rồi quy tròn $a$ đến hàng ngay trên nó.',
        },
        {
          type: 'table',
          head: ['Số gần đúng', 'Hàng cao nhất của $d$', 'Quy tròn đến', 'Số quy tròn'],
          rows: [
            ['$2\\,841\\,675 \\pm 300$', 'hàng trăm', 'hàng nghìn', '$2\\,842\\,000$'],
            ['$3{,}1463 \\pm 0{,}001$', 'hàng phần nghìn', 'hàng phần trăm', '$3{,}15$'],
            ['$9{,}78 \\pm 0{,}2$', 'hàng phần mười', 'hàng đơn vị', '$10$'],
          ],
        },
        { type: 'widget', name: 'quy-tron' },
      ],
    },
  ],
  explore: {
    title: 'Thước ảo và sai số của phép đo',
    instruction:
      'Chọn vật và độ chia của thước, kéo vạch đọc (hoặc dùng phím mũi tên) tới vạch chia sát đầu vật nhất. Đọc kết quả $a$ và độ chính xác $d$, rồi bấm "Xem độ dài đúng" để tính sai số tuyệt đối và sai số tương đối. So sánh ba loại thước.',
  },
  examples: [
    {
      problem:
        'Biết $3{,}14 < \\pi < 3{,}15$. Bạn An tính diện tích hình tròn bán kính $2$ cm là $S = 4 \\cdot 3{,}14 = 12{,}56$ (cm²). Hãy đánh giá sai số tuyệt đối của kết quả này.',
      steps: [
        'Diện tích đúng là $\\overline{S} = \\pi \\cdot 2^2 = 4\\pi$.',
        'Từ $3{,}14 < \\pi < 3{,}15$ nhân với $4$: $12{,}56 < 4\\pi < 12{,}6$.',
        'Do đó $\\Delta_S = |4\\pi - 12{,}56| < 12{,}6 - 12{,}56 = 0{,}04$.',
      ],
      answer:
        'Sai số tuyệt đối không vượt quá $0{,}04$ cm², tức là $\\overline{S} = 12{,}56 \\pm 0{,}04$ (cm²).',
    },
    {
      problem:
        'Chiều cao một toà nhà đo được $h = 15{,}4 \\pm 0{,}1$ (m), chiều dài một sân bóng đá đo được $l = 105{,}5 \\pm 0{,}2$ (m). Phép đo nào chính xác hơn?',
      steps: [
        'Sai số tuyệt đối của phép đo sân bóng ($0{,}2$ m) lớn hơn của phép đo toà nhà ($0{,}1$ m), nhưng hai đại lượng có độ lớn rất khác nhau, nên phải so sánh sai số tương đối.',
        'Toà nhà: $\\delta_h \\le \\dfrac{0{,}1}{15{,}4} \\approx 0{,}65\\%$.',
        'Sân bóng: $\\delta_l \\le \\dfrac{0{,}2}{105{,}5} \\approx 0{,}19\\%$.',
      ],
      answer:
        'Sai số tương đối của phép đo sân bóng nhỏ hơn, nên phép đo chiều dài sân bóng chính xác hơn.',
    },
    {
      problem:
        'Quy tròn các số gần đúng: a) $a = 2\\,841\\,675 \\pm 300$; b) $b = 3{,}1463 \\pm 0{,}001$.',
      steps: [
        'a) Độ chính xác $d = 300$ có chữ số khác $0$ đầu tiên ở hàng trăm, nên quy tròn $a$ đến hàng nghìn. Chữ số ngay sau hàng nghìn là $6 \\ge 5$, ta cộng $1$ vào chữ số hàng nghìn: $2\\,842\\,000$.',
        'b) $d = 0{,}001$ có chữ số khác $0$ ở hàng phần nghìn, nên quy tròn $b$ đến hàng phần trăm. Chữ số ngay sau là $6 \\ge 5$, nên được $3{,}15$.',
      ],
      answer: 'a) $2\\,842\\,000$; b) $3{,}15$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Biết $1{,}41 < \\sqrt{2} < 1{,}42$. Lấy $a = 1{,}41$ làm giá trị gần đúng của $\\sqrt{2}$ thì sai số tuyệt đối của $a$ không vượt quá bao nhiêu?',
      answer: 0.01,
      hints: [
        'Sai số tuyệt đối là $|\\sqrt{2} - 1{,}41|$.',
        'Số đúng nằm giữa $1{,}41$ và $1{,}42$; khoảng cách lớn nhất từ $1{,}41$ đến một số trong khoảng đó là bao nhiêu?',
      ],
      solution:
        'Vì $1{,}41 < \\sqrt{2} < 1{,}42$ nên $\\Delta_a = \\sqrt{2} - 1{,}41 < 1{,}42 - 1{,}41 = 0{,}01$. Sai số tuyệt đối không vượt quá $0{,}01$.',
    },
    {
      type: 'number',
      prompt:
        'Dùng thước chia đến milimét, đọc kết quả ở vạch gần nhất, bạn Minh đo được chiều rộng quyển vở là $18{,}3$ cm. Độ chính xác $d$ của phép đo là bao nhiêu xăng-ti-mét?',
      answer: 0.05,
      unit: 'cm',
      hints: [
        'Độ chia của thước là $1$ mm $= 0{,}1$ cm.',
        'Đọc ở vạch gần nhất thì độ dài đúng lệch không quá nửa độ chia.',
      ],
      solution:
        'Độ chia là $0{,}1$ cm, nên $d = \\dfrac{0{,}1}{2} = 0{,}05$ cm, tức là chiều rộng đúng bằng $18{,}3 \\pm 0{,}05$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có chiều dài $l = 25{,}6 \\pm 0{,}05$ (cm). Sai số tương đối của phép đo không vượt quá bao nhiêu phần trăm? (Làm tròn đến hàng phần trăm.)',
      answer: 0.2,
      tolerance: 0.005,
      unit: '%',
      hints: [
        'Dùng $\\delta_l \\le \\dfrac{d}{|l|}$.',
        'Tính $\\dfrac{0{,}05}{25{,}6}$ rồi nhân với $100\\%$.',
      ],
      solution:
        '$\\delta_l \\le \\dfrac{0{,}05}{25{,}6} \\approx 0{,}00195 = 0{,}195\\% \\approx 0{,}20\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Phép đo nào chính xác hơn: chiều dài một cây cầu $1\\,523 \\pm 2$ (m) hay chiều dài một chiếc bàn $120 \\pm 0{,}5$ (cm)?',
      options: ['Phép đo cây cầu', 'Phép đo chiếc bàn', 'Hai phép đo chính xác như nhau'],
      answer: 0,
      hints: [
        'Không so sánh trực tiếp $2$ m với $0{,}5$ cm: hai đại lượng có độ lớn khác nhau.',
        'So sánh hai tỉ số $\\dfrac{d}{|a|}$.',
      ],
      solution:
        'Cây cầu: $\\dfrac{2}{1\\,523} \\approx 0{,}13\\%$. Chiếc bàn: $\\dfrac{0{,}5}{120} \\approx 0{,}42\\%$. Sai số tương đối của phép đo cây cầu nhỏ hơn, nên phép đo cây cầu chính xác hơn.',
    },
    {
      type: 'number',
      prompt: 'Quy tròn số $2{,}71828$ đến hàng phần trăm.',
      answer: 2.72,
      hints: [
        'Chữ số hàng phần trăm là $1$; xét chữ số ngay sau nó.',
        'Chữ số ngay sau là $8 \\ge 5$.',
      ],
      solution:
        'Chữ số ngay sau hàng phần trăm là $8 \\ge 5$, nên cộng $1$ vào chữ số hàng phần trăm: $2{,}71828 \\approx 2{,}72$.',
    },
    {
      type: 'choice',
      prompt: 'Số quy tròn của số gần đúng $a = 1\\,754\\,123 \\pm 400$ là',
      options: ['$1\\,754\\,000$', '$1\\,750\\,000$', '$1\\,754\\,100$', '$1\\,800\\,000$'],
      answer: 0,
      hints: [
        'Chữ số khác $0$ đầu tiên của $d = 400$ ở hàng trăm.',
        'Quy tròn $a$ đến hàng ngay trên hàng trăm, tức hàng nghìn.',
      ],
      solution:
        '$d = 400$ có hàng cao nhất là hàng trăm, nên quy tròn $a$ đến hàng nghìn. Chữ số ngay sau hàng nghìn là $1 < 5$, nên số quy tròn là $1\\,754\\,000$.',
    },
    {
      type: 'number',
      prompt: 'Viết số quy tròn của số gần đúng $a = 37\\,975\\,421 \\pm 150$.',
      answer: 37975000,
      hints: [
        'Tìm hàng thấp nhất mà $d = 150$ nhỏ hơn một đơn vị của hàng đó.',
        '$150 < 1\\,000$ nhưng $150 \\ge 100$: quy tròn đến hàng nghìn.',
      ],
      solution:
        'Hàng cao nhất của $d = 150$ là hàng trăm, nên quy tròn $a$ đến hàng nghìn. Chữ số ngay sau hàng nghìn là $4 < 5$: số quy tròn là $37\\,975\\,000$.',
    },
    {
      type: 'number',
      prompt: 'Viết số quy tròn của số gần đúng $b = 4{,}1356 \\pm 0{,}002$.',
      answer: 4.14,
      hints: [
        'Chữ số khác $0$ đầu tiên của $d = 0{,}002$ ở hàng phần nghìn.',
        'Quy tròn $b$ đến hàng phần trăm.',
      ],
      solution:
        'Hàng cao nhất của $d = 0{,}002$ là hàng phần nghìn, nên quy tròn $b$ đến hàng phần trăm. Chữ số ngay sau hàng phần trăm là $5 \\ge 5$, nên $b \\approx 4{,}14$.',
    },
    {
      type: 'choice',
      prompt:
        'Quy tròn một số đến một hàng nào đó thì sai số tuyệt đối của số quy tròn không vượt quá',
      options: [
        'nửa đơn vị của hàng làm tròn',
        'một đơn vị của hàng làm tròn',
        'một đơn vị của hàng ngay sau hàng làm tròn',
        'chữ số ngay sau hàng làm tròn',
      ],
      answer: 0,
      hints: [
        'Thử quy tròn $3{,}14$ và $3{,}16$ đến hàng phần mười rồi xem mỗi số bị lệch bao nhiêu.',
      ],
      solution:
        'Số quy tròn là bội của đơn vị hàng làm tròn gần số ban đầu nhất, nên lệch không quá nửa đơn vị của hàng đó. Ví dụ quy tròn đến hàng phần mười thì sai lệch không quá $0{,}05$.',
    },
  ],
  takeaways: [
    'Sai số tuyệt đối $\\Delta_a = |\\overline{a} - a|$; viết $\\overline{a} = a \\pm d$ khi $\\Delta_a \\le d$ ($d$ là độ chính xác).',
    'Sai số tương đối $\\delta_a = \\dfrac{\\Delta_a}{|a|} \\le \\dfrac{d}{|a|}$, thường viết dạng phần trăm; dùng nó để so sánh độ chính xác của các phép đo.',
    'Quy tắc làm tròn: chữ số ngay sau hàng quy tròn từ $5$ trở lên thì cộng $1$ vào hàng quy tròn; sai số của số quy tròn không quá nửa đơn vị hàng làm tròn.',
    'Biết độ chính xác $d$: quy tròn đến hàng thấp nhất mà $d$ nhỏ hơn một đơn vị của hàng đó.',
  ],
};
