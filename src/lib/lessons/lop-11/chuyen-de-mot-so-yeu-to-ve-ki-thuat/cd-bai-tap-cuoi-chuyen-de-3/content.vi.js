/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chuyên đề Một số yếu tố vẽ kĩ thuật: ba hình chiếu vuông góc và mối liên hệ giữa chúng, hình chiếu trục đo và hệ số biến dạng, tiêu chuẩn và nguyên tắc của bản vẽ kĩ thuật; luyện đọc hình chiếu và tính toán từ bản vẽ.',
  intro:
    'Một người thợ nhận ba hình chiếu của một chi tiết và phải hình dung ra đúng chi tiết đó. Bài ôn tập này luyện kĩ năng ấy theo cả hai chiều: từ vật thể vẽ ra hình chiếu, và từ hình chiếu đọc ra vật thể, kích thước, thể tích.',
  objectives: [
    'Hệ thống lại hình chiếu đứng, bằng, cạnh, vị trí của chúng và mối liên hệ về chiều dài, chiều rộng, chiều cao.',
    'Tính hệ số biến dạng, kích thước thật và độ dài hình chiếu trong hình chiếu trục đo.',
    'Vận dụng tiêu chuẩn bản vẽ (khổ giấy, tỉ lệ, nét vẽ, kích thước) để đọc bản vẽ và tính thể tích vật thể.',
  ],
  sections: [
    {
      heading: 'Ôn tập: hình chiếu vuông góc và hình chiếu trục đo',
      blocks: [
        {
          type: 'table',
          head: ['Hình chiếu', 'Hướng chiếu', 'Vị trí trên bản vẽ', 'Thể hiện'],
          rows: [
            ['Đứng', 'Từ trước ra sau', 'Phía trên, bên trái', 'Chiều dài và chiều cao'],
            ['Bằng', 'Từ trên xuống', 'Ngay dưới hình chiếu đứng', 'Chiều dài và chiều rộng'],
            [
              'Cạnh',
              'Từ trái sang phải',
              'Ngay bên phải hình chiếu đứng',
              'Chiều rộng và chiều cao',
            ],
          ],
          caption: 'Ba hình chiếu vuông góc theo phương pháp chiếu góc thứ nhất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cần nhớ',
          text: "Cạnh thấy vẽ nét liền đậm, cạnh khuất vẽ nét đứt. Hình chiếu trục đo có hệ số biến dạng $p = \\dfrac{O'A'}{OA}$, $q = \\dfrac{O'B'}{OB}$, $r = \\dfrac{O'C'}{OC}$; hình chiếu trục đo vuông góc đều có ba góc trục đo $120^\\circ$ và $p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$ (quy ước vẽ với $p = q = r = 1$).",
        },
        {
          type: 'p',
          text: 'Để đọc ba hình chiếu, hãy đối chiếu từng cặp theo đường dóng: một nét trên hình chiếu đứng ứng với nét nào trên hình chiếu bằng (cùng chiều dài) và trên hình chiếu cạnh (cùng chiều cao). Nét đứt cho biết có một phần bị che phía sau hoặc bên trong.',
        },
      ],
    },
    {
      heading: 'Ôn tập: bản vẽ kĩ thuật',
      blocks: [
        {
          type: 'list',
          items: [
            'Khổ giấy $A0$ ($1\\,189 \\times 841$), $A1$ ($841 \\times 594$), $A2$ ($594 \\times 420$), $A3$ ($420 \\times 297$), $A4$ ($297 \\times 210$), đơn vị mm; khung bản vẽ cách mép trái $20$ mm, các mép khác $10$ mm.',
            'Tỉ lệ = kích thước trên hình : kích thước thật. Chữ số kích thước luôn ghi trị số thật, đơn vị mm, không ghi đơn vị.',
            'Nét liền đậm: đường bao thấy; nét đứt mảnh: đường bao khuất; nét gạch dài – chấm – mảnh: đường tâm, trục đối xứng; nét liền mảnh: đường kích thước, đường gióng.',
            'Nguyên tắc đầy đủ: từ bản vẽ xác định được hình dạng và mọi kích thước của vật thể; mỗi kích thước chỉ ghi một lần.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Thiết kế và lập bản vẽ một giá đỡ điện thoại',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thiết kế một giá đỡ điện thoại ghép từ các khối hộp (đế, thành tựa, gờ chặn), lập bản vẽ kĩ thuật đầy đủ và tính lượng vật liệu cần dùng.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: điện thoại để đo, thước, bút chì, giấy $A4$, giấy kẻ ô tam giác đều; có thể dùng bìa cứng để làm mô hình.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo điện thoại và chọn kích thước các khối của giá (theo mm) sao cho điện thoại đứng vững.',
            'Phân tích giá thành các khối hộp; vẽ ba hình chiếu vuông góc đúng vị trí, đúng nét và ghi đủ kích thước.',
            'Vẽ hình chiếu trục đo vuông góc đều trên giấy kẻ ô tam giác đều; kẻ khung bản vẽ và khung tên.',
            'Tính thể tích giá; nếu làm bằng gỗ có khối lượng riêng khoảng $0{,}6\\ \\text{g/cm}^3$, ước lượng khối lượng của giá.',
            'Đổi bản vẽ với nhóm khác để họ làm mô hình bằng bìa theo bản vẽ; so sánh mô hình với thiết kế.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bản vẽ hoàn chỉnh, bảng tính thể tích và khối lượng, ảnh mô hình của nhóm bạn và những chỗ bản vẽ cần sửa để đáp ứng nguyên tắc đầy đủ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép hình chiếu với vật thể',
    instruction:
      'Mỗi lượt cho ba hình chiếu của một vật thể ghép từ các khối lập phương. Chọn vật thể đúng trong bốn vật thể; khi chọn sai, bảng cho biết hình chiếu nào giống, hình chiếu nào chỉ khác ở nét khuất và hình chiếu nào có nét khác.',
  },
  examples: [
    {
      problem:
        'Một giá chữ U được vẽ trên giấy kẻ ô tam giác đều (mỗi cạnh ô dài $1$ cm): khối hộp bao ngoài dài $5$ cm, rộng $3$ cm, cao $4$ cm, khoét một rãnh rộng $3$ cm, sâu $2$ cm chạy suốt chiều rộng. Tính thể tích của giá.',
      steps: [
        'Thể tích khối hộp bao ngoài: $5 \\cdot 3 \\cdot 4 = 60\\ \\text{cm}^3$.',
        'Rãnh là một khối hộp $3 \\times 3 \\times 2$: thể tích $18\\ \\text{cm}^3$.',
        'Thể tích giá: $60 - 18 = 42\\ \\text{cm}^3$.',
      ],
      answer: '$42\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Hình chiếu đứng của một vật thể là hình chữ nhật $60 \\times 40$ mm (dài $\\times$ cao), hình chiếu cạnh là hình chữ nhật $25 \\times 40$ mm (rộng $\\times$ cao). Hình chiếu bằng của nó nằm trong hình chữ nhật nào?',
      steps: [
        'Hình chiếu bằng có cùng chiều dài với hình chiếu đứng: $60$ mm.',
        'Hình chiếu bằng có cùng chiều rộng với hình chiếu cạnh: $25$ mm.',
      ],
      answer: 'Hình chữ nhật $60 \\times 25$ mm, đặt ngay dưới hình chiếu đứng.',
    },
    {
      problem:
        'Trong phép chiếu trục đo vuông góc đều, lấy $OA = OB = OC = a$ trên ba trục và gọi $I$ là tâm tam giác đều $ABC$. Chứng minh $p = q = r = \\dfrac{\\sqrt 6}{3}$.',
      steps: [
        'Tam giác $OAB$ vuông cân tại $O$ nên $AB = a\\sqrt 2$; tam giác $ABC$ đều cạnh $a\\sqrt 2$.',
        'Bán kính đường tròn ngoại tiếp tam giác đều cạnh $b$ là $\\dfrac{b}{\\sqrt 3}$, nên $IA = \\dfrac{a\\sqrt 2}{\\sqrt 3} = \\dfrac{a\\sqrt 6}{3}$.',
        "Mặt phẳng $(ABC)$ song song với mặt phẳng chiếu và $AIO'A'$ là hình bình hành, nên $O'A' = IA$.",
        "Vậy $p = \\dfrac{O'A'}{OA} = \\dfrac{\\sqrt 6}{3}$; tương tự $q = r = \\dfrac{\\sqrt 6}{3}$.",
      ],
      answer: '$p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Theo phương pháp chiếu góc thứ nhất, hình chiếu nào được đặt ngay bên phải hình chiếu đứng?',
      options: [
        'Hình chiếu cạnh',
        'Hình chiếu bằng',
        'Hình chiếu trục đo',
        'Không có hình chiếu nào',
      ],
      answer: 0,
      hints: ['Mặt phẳng hình chiếu cạnh nằm bên phải vật và được xoay sang phải.'],
      solution:
        'Hình chiếu cạnh đặt bên phải hình chiếu đứng; hình chiếu bằng đặt dưới hình chiếu đứng.',
    },
    {
      type: 'choice',
      prompt:
        'Một vật thể có hình chiếu đứng và hình chiếu cạnh là hai tam giác cân bằng nhau, hình chiếu bằng là hình tròn có đánh dấu tâm. Vật thể đó là',
      options: [
        'Hình nón đặt đáy nằm ngang',
        'Hình trụ đặt đáy nằm ngang',
        'Hình chóp tứ giác đều',
        'Hình cầu',
      ],
      answer: 0,
      hints: ['Khối nào nhìn từ trên thấy hình tròn, nhìn ngang thấy tam giác?'],
      solution:
        'Hình nón: nhìn từ trên thấy đáy là hình tròn (đỉnh chiếu vào tâm), nhìn từ trước và từ trái thấy tam giác cân. Hình chóp tứ giác đều có hình chiếu bằng là hình vuông; hình trụ cho hình chữ nhật.',
    },
    {
      type: 'number',
      prompt:
        'Hình chiếu đứng của một khối hộp chữ nhật là hình chữ nhật $60 \\times 40$ mm (dài $\\times$ cao), hình chiếu cạnh là hình chữ nhật $25 \\times 40$ mm (rộng $\\times$ cao). Diện tích hình chiếu bằng là bao nhiêu $\\text{mm}^2$?',
      answer: 1500,
      unit: 'mm²',
      hints: [
        'Hình chiếu bằng có cùng chiều dài với hình chiếu đứng và cùng chiều rộng với hình chiếu cạnh.',
      ],
      solution:
        'Hình chiếu bằng là hình chữ nhật $60 \\times 25$ mm, diện tích $60 \\cdot 25 = 1\\,500\\ \\text{mm}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Một giá chữ U có khối hộp bao ngoài dài $6$ cm, rộng $4$ cm, cao $5$ cm; ở giữa phía trên khoét một rãnh rộng $2$ cm, sâu $3$ cm chạy suốt chiều rộng. Tính thể tích của giá (theo $\\text{cm}^3$).',
      answer: 96,
      unit: 'cm³',
      hints: [
        'Lấy thể tích khối hộp bao ngoài trừ thể tích rãnh.',
        'Rãnh là khối hộp $2 \\times 4 \\times 3$.',
      ],
      solution:
        'Khối hộp: $6 \\cdot 4 \\cdot 5 = 120\\ \\text{cm}^3$; rãnh: $2 \\cdot 4 \\cdot 3 = 24\\ \\text{cm}^3$. Thể tích giá: $120 - 24 = 96\\ \\text{cm}^3$.',
    },
    {
      type: 'fraction',
      prompt:
        "Trên hình chiếu trục đo của hình hộp chữ nhật, cạnh $OB = 6$ cm có hình chiếu $O'B' = 4$ cm. Tính hệ số biến dạng $q$ (dạng phân số tối giản).",
      answer: [2, 3],
      simplest: true,
      hints: ["$q = \\dfrac{O'B'}{OB}$, rồi rút gọn."],
      solution: '$q = \\dfrac{4}{6} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối lập phương cạnh $9$ cm được chiếu theo phép chiếu trục đo vuông góc đều, không dùng quy ước. Mỗi cạnh của hình chiếu dài bao nhiêu xentimét? (Làm tròn đến hàng phần trăm.)',
      answer: 7.35,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Hệ số biến dạng là $\\dfrac{\\sqrt 6}{3}$.'],
      solution: '$9 \\cdot \\dfrac{\\sqrt 6}{3} = 3\\sqrt 6 \\approx 7{,}35$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Tứ diện vuông $OABC$ có $OA = OB = OC = 3$ cm được chiếu vuông góc lên mặt phẳng $(P)$ song song với $(ABC)$ (phép chiếu trục đo vuông góc đều). Tính $A'B'$ (làm tròn đến hàng phần trăm).",
      answer: 4.24,
      tolerance: 0.01,
      unit: 'cm',
      hints: [
        '$AB$ song song với $(P)$, nên hình chiếu của nó có độ dài bằng $AB$.',
        'Tam giác $OAB$ vuông cân tại $O$.',
      ],
      solution: "$AB$ song song với $(P)$ nên $A'B' = AB = 3\\sqrt 2 \\approx 4{,}24$ cm.",
    },
    {
      type: 'choice',
      prompt:
        'Khung của một bản vẽ có kích thước $267 \\times 190$ mm. Bản vẽ dùng khổ giấy nào (đặt nằm ngang)?',
      options: ['$A4$', '$A3$', '$A2$', '$A1$'],
      answer: 0,
      hints: ['Cộng $30$ mm vào chiều dài và $20$ mm vào chiều rộng của khung.'],
      solution:
        'Tờ giấy có kích thước $(267 + 30) \\times (190 + 20) = 297 \\times 210$ mm: khổ $A4$.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản vẽ tỉ lệ $1 : 10$, chiều dài một chiếc bàn đo được $45$ mm. Chữ số kích thước ghi cho chiều dài đó là bao nhiêu?',
      answer: 450,
      hints: ['Chữ số kích thước ghi trị số thật theo mm.'],
      solution: 'Chiều dài thật: $45 \\cdot 10 = 450$ mm, nên chữ số kích thước là $450$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Đường tâm của một lỗ tròn vẽ bằng nét gạch dài – chấm – mảnh.',
        'Một cạnh bị che khuất vẽ bằng nét đứt mảnh.',
        'Hình chiếu đứng và hình chiếu cạnh có cùng chiều cao.',
        'Trên bản vẽ tỉ lệ $1 : 2$, chữ số kích thước ghi bằng một nửa kích thước thật.',
        'Hình chiếu trục đo vuông góc đều có $p = q = r = 0{,}5$.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Chữ số kích thước có phụ thuộc tỉ lệ không? Hệ số của trục đo vuông góc đều là $\\dfrac{\\sqrt 6}{3}$.',
      ],
      solution:
        'Ba khẳng định đầu đúng. Chữ số kích thước luôn ghi trị số thật; hình chiếu trục đo vuông góc đều có $p = q = r = \\dfrac{\\sqrt 6}{3} \\approx 0{,}82$ (quy ước lấy bằng $1$).',
    },
    {
      type: 'text',
      prompt: 'Trước chữ số kích thước của bán kính một cung tròn ta ghi kí hiệu gì?',
      accept: ['R', 'chữ R'],
      hints: ['Đường kính ghi $\\varnothing$; bán kính ghi một chữ cái in hoa.'],
      solution: 'Ghi kí hiệu $R$, chẳng hạn $R15$ là bán kính $15$ mm.',
    },
  ],
  takeaways: [
    'Đứng – bằng cùng chiều dài; đứng – cạnh cùng chiều cao; bằng – cạnh cùng chiều rộng.',
    'Đọc ba hình chiếu bằng đường dóng; nét đứt cho biết phần bị che.',
    'Kích thước thật = kích thước trên hình chiếu trục đo chia cho hệ số biến dạng.',
    'Bản vẽ đúng tiêu chuẩn và đầy đủ thì đọc được duy nhất một vật thể với mọi kích thước của nó.',
  ],
};
