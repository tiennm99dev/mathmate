/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bản vẽ kĩ thuật: khổ giấy, khung bản vẽ và khung tên, tỉ lệ, nét vẽ, chữ viết và cách ghi kích thước; nguyên tắc cơ bản và nguyên tắc đầy đủ; trình tự đọc và lập một bản vẽ kĩ thuật đơn giản.',
  intro:
    'Một kĩ sư ở Hà Nội vẽ một chi tiết máy, một xưởng ở Đồng Nai đọc bản vẽ và làm ra đúng chi tiết đó mà không cần gọi điện hỏi lại. Điều này làm được vì mọi người vẽ và đọc bản vẽ theo cùng một bộ tiêu chuẩn: cùng khổ giấy, cùng loại nét, cùng cách ghi kích thước.',
  objectives: [
    'Biết các khổ giấy, khung bản vẽ, khung tên, tỉ lệ, các loại nét vẽ, chữ viết và cách ghi kích thước trên bản vẽ kĩ thuật.',
    'Hiểu các nguyên tắc cơ bản của bản vẽ kĩ thuật, đặc biệt là nguyên tắc đầy đủ.',
    'Đọc được một bản vẽ kĩ thuật đơn giản và biết trình tự lập bản vẽ gồm hình chiếu vuông góc và hình chiếu trục đo.',
  ],
  sections: [
    {
      heading: 'Một số tiêu chuẩn của bản vẽ kĩ thuật',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bản vẽ kĩ thuật',
          text: 'Bản vẽ kĩ thuật của một vật thể là tài liệu mô tả chính xác hình dạng, kết cấu và kích thước của vật thể đó. Bản vẽ được trình bày theo các tiêu chuẩn chung (ở Việt Nam là các Tiêu chuẩn Việt Nam, TCVN, phù hợp với tiêu chuẩn quốc tế ISO).',
        },
        {
          type: 'p',
          text: 'Khổ giấy. Các khổ giấy chính được tạo ra bằng cách chia đôi liên tiếp khổ $A0$ (diện tích khoảng $1\\ \\text{m}^2$):',
        },
        {
          type: 'table',
          head: ['Khổ giấy', '$A0$', '$A1$', '$A2$', '$A3$', '$A4$'],
          rows: [
            [
              'Kích thước (mm)',
              '$1\\,189 \\times 841$',
              '$841 \\times 594$',
              '$594 \\times 420$',
              '$420 \\times 297$',
              '$297 \\times 210$',
            ],
          ],
          caption: 'Các khổ giấy chính của bản vẽ kĩ thuật.',
        },
        {
          type: 'p',
          text: 'Mỗi bản vẽ có khung bản vẽ kẻ bằng nét liền đậm, cách mép trái tờ giấy $20$ mm và cách các mép còn lại $10$ mm; khung tên đặt ở góc phải phía dưới, ghi tên vật thể, vật liệu, tỉ lệ, người vẽ, người kiểm tra, cơ sở thiết kế.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ lệ',
          text: 'Tỉ lệ là tỉ số giữa kích thước đo được trên hình biểu diễn và kích thước thật tương ứng của vật thể. Tỉ lệ thu nhỏ: $1 : 2$; $1 : 5$; $1 : 10$; $1 : 20$; … Tỉ lệ nguyên hình: $1 : 1$. Tỉ lệ phóng to: $2 : 1$; $5 : 1$; $10 : 1$; …',
        },
        {
          type: 'table',
          head: ['Tên nét', 'Ứng dụng'],
          rows: [
            ['Nét liền đậm', 'Đường bao thấy, cạnh thấy'],
            ['Nét liền mảnh', 'Đường kích thước, đường gióng, đường gạch gạch trên mặt cắt'],
            ['Nét đứt mảnh', 'Đường bao khuất, cạnh khuất'],
            ['Nét gạch dài – chấm – mảnh', 'Đường tâm, trục đối xứng'],
            ['Nét lượn sóng', 'Đường giới hạn một phần hình cắt'],
          ],
          caption:
            'Các loại nét vẽ. Chiều rộng nét đậm thường lấy $0{,}5$ mm, nét mảnh bằng khoảng một nửa ($0{,}25$ mm).',
        },
        {
          type: 'p',
          text: 'Chữ viết trên bản vẽ phải rõ ràng, thống nhất, dễ đọc. Khổ chữ (chiều cao chữ hoa, tính bằng mm) chọn trong dãy $1{,}8$; $2{,}5$; $3{,}5$; $5$; $7$; $10$; $14$; $20$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi kích thước',
          text: 'Một kích thước gồm đường kích thước, đường gióng và chữ số kích thước. Đường kích thước vẽ bằng nét liền mảnh, song song với phần tử được ghi, hai đầu có mũi tên. Đường gióng vẽ bằng nét liền mảnh, vuông góc với đường kích thước và vượt quá nó khoảng $2$ đến $4$ mm.',
        },
        {
          type: 'list',
          items: [
            'Chữ số kích thước chỉ trị số thật của kích thước, không phụ thuộc tỉ lệ bản vẽ; đơn vị là milimét và không ghi đơn vị.',
            'Với đường kích thước nằm ngang, chữ số đặt phía trên; với đường kích thước thẳng đứng, chữ số đặt bên trái và viết dọc theo đường kích thước.',
            'Trước chữ số kích thước của đường kính ghi kí hiệu $\\varnothing$ (ví dụ $\\varnothing 20$); của bán kính ghi kí hiệu $R$ (ví dụ $R15$).',
          ],
        },
      ],
    },
    {
      heading: 'Nguyên tắc cơ bản trong bản vẽ kĩ thuật',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên tắc cơ bản',
          text: 'Bản vẽ kĩ thuật phải thể hiện duy nhất vật thể cần biểu diễn: người đọc chỉ hình dung ra đúng một vật thể. Theo nguyên tắc đầy đủ, hình dạng và mọi kích thước của vật thể phải xác định được đầy đủ từ bản vẽ.',
        },
        {
          type: 'list',
          items: [
            'Chọn số hình chiếu vừa đủ: hình chiếu đứng và hình chiếu cạnh của hình hộp chữ nhật và của hình trụ nằm đứng đều là hình chữ nhật, nên phải có thêm hình chiếu bằng (hình chữ nhật hay hình tròn) mới phân biệt được hai vật.',
            'Ghi đủ kích thước để chế tạo được vật thể; mỗi kích thước chỉ ghi một lần, không ghi kích thước suy ra được từ các kích thước khác.',
            'Đường tâm và trục đối xứng cho biết các phần tử nằm đối xứng, chẳng hạn một lỗ nằm chính giữa.',
          ],
        },
      ],
    },
    {
      heading: 'Đọc và vẽ bản vẽ kĩ thuật đơn giản',
      blocks: [
        {
          type: 'p',
          text: 'Đọc bản vẽ là từ bản vẽ hình dung ra hình dạng, kích thước và các yêu cầu của vật thể. Trình tự đọc:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Khung tên: tên vật thể, vật liệu, tỉ lệ bản vẽ.',
            'Hình biểu diễn: tên các hình chiếu, từ đó hình dung hình dạng vật thể (hình chiếu trục đo, nếu có, giúp hình dung nhanh hơn).',
            'Kích thước: kích thước chung (dài, rộng, cao) và kích thước các phần (rãnh, lỗ, …).',
            'Yêu cầu kĩ thuật (nếu có): gia công, xử lí bề mặt.',
          ],
        },
        {
          type: 'p',
          text: 'Để lập bản vẽ kĩ thuật gồm các hình chiếu vuông góc và hình chiếu trục đo vuông góc đều của một vật thể, ta làm theo trình tự:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Phân tích vật thể thành các hình khối đơn giản.',
            'Chọn hướng chiếu phù hợp.',
            'Vẽ hình chiếu vuông góc của mỗi hình khối cấu tạo nên vật thể.',
            'Chỉnh sửa các nét vẽ và ghi kích thước.',
            'Từ các hình chiếu vuông góc và hình biểu diễn của vật thể, dựng hình chiếu trục đo.',
            'Kẻ khung bản vẽ, khung tên để hoàn thành bản vẽ.',
          ],
        },
        {
          type: 'p',
          text: 'Bảng vẽ bên dưới là bản vẽ ba hình chiếu của một gối đỡ chữ U có lỗ. Ở lớp "Nét vẽ", hãy vẽ mỗi nét bằng đúng loại nét; ở lớp "Kích thước", chọn các kích thước sao cho bản vẽ vừa đủ.',
        },
      ],
    },
    {
      heading: 'Dự án: Lập bản vẽ kĩ thuật của một đồ vật',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chọn một đồ vật đơn giản (giá đỡ điện thoại, hộp bút, khối gỗ có rãnh hoặc lỗ) và lập bản vẽ kĩ thuật của nó trên khổ giấy $A4$, đúng các tiêu chuẩn đã học.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: đồ vật, thước kẹp hoặc thước kẻ, compa, ê ke, bút chì cứng và mềm, giấy $A4$, giấy kẻ ô tam giác đều.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo vật thể, phân tích nó thành các khối đơn giản và chọn tỉ lệ để hình vẽ nằm gọn trong khung.',
            'Kẻ khung bản vẽ cách mép trái $20$ mm, các mép khác $10$ mm; tính kích thước khung ($A4$ đặt đứng: $180 \\times 277$ mm).',
            'Vẽ ba hình chiếu vuông góc đúng vị trí, dùng đúng loại nét; ghi đủ kích thước, mỗi kích thước một lần.',
            'Vẽ hình chiếu trục đo vuông góc đều trên giấy kẻ ô tam giác đều; điền khung tên.',
            'Đổi bản vẽ với một nhóm khác: nhóm bạn có làm (hoặc mô tả) lại được đúng vật thể chỉ từ bản vẽ không?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bản vẽ hoàn chỉnh, bảng tự kiểm tra (khổ giấy, khung, tỉ lệ, nét vẽ, kích thước, nguyên tắc đầy đủ) và nhận xét của nhóm đọc bản vẽ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ kĩ thuật',
    instruction:
      'Lớp "Nét vẽ": chọn từng nét theo số, rồi chọn loại nét; bảng vẽ kiểm tra ngay theo quy ước và giải thích khi chọn sai. Lớp "Kích thước": bật, tắt các kích thước cho đến khi bảng báo bản vẽ đáp ứng nguyên tắc đầy đủ, không ghi lặp, không ghi thừa.',
  },
  examples: [
    {
      problem:
        'Một bản vẽ kĩ thuật có khung bản vẽ kích thước $564\\ \\text{mm} \\times 400\\ \\text{mm}$. Bản vẽ đó được vẽ trên khổ giấy nào?',
      steps: [
        'Khung cách mép trái $20$ mm, cách các mép khác $10$ mm.',
        'Chiều dài tờ giấy: $564 + 20 + 10 = 594$ mm.',
        'Chiều rộng tờ giấy: $400 + 10 + 10 = 420$ mm.',
      ],
      answer: 'Khổ giấy $A2$ ($594 \\times 420$ mm).',
    },
    {
      problem:
        'Trên một bản vẽ tỉ lệ $1 : 2$, chiều dài của một chi tiết đo được $35$ mm. Chiều dài thật của chi tiết là bao nhiêu, và chữ số kích thước ghi trên bản vẽ là gì?',
      steps: [
        'Tỉ lệ $1 : 2$ nghĩa là kích thước trên hình bằng một nửa kích thước thật.',
        'Chiều dài thật: $35 \\cdot 2 = 70$ mm.',
        'Chữ số kích thước luôn ghi trị số thật, không phụ thuộc tỉ lệ.',
      ],
      answer: 'Chiều dài thật $70$ mm; trên bản vẽ ghi $70$.',
    },
    {
      problem:
        'Đọc bản vẽ gối đỡ chữ U ở bảng vẽ bên dưới: gối dài $50$, rộng $30$, cao $40$; rãnh rộng $30$, sâu $20$ nằm giữa; lỗ $\\varnothing 10$ xuyên qua đáy ở giữa rãnh (đơn vị mm). Tính thể tích của gối (làm tròn đến $\\text{cm}^3$, lấy $\\pi \\approx 3{,}14$).',
      steps: [
        'Khối hộp bao ngoài: $50 \\cdot 30 \\cdot 40 = 60\\,000\\ \\text{mm}^3$.',
        'Rãnh: $30 \\cdot 30 \\cdot 20 = 18\\,000\\ \\text{mm}^3$.',
        'Đáy dày $40 - 20 = 20$ mm, nên lỗ là hình trụ bán kính $5$ mm, cao $20$ mm: $3{,}14 \\cdot 5^2 \\cdot 20 = 1\\,570\\ \\text{mm}^3$.',
        'Thể tích gối: $60\\,000 - 18\\,000 - 1\\,570 = 40\\,430\\ \\text{mm}^3 \\approx 40\\ \\text{cm}^3$.',
      ],
      answer: 'Khoảng $40\\ \\text{cm}^3$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Khổ giấy $A3$ có kích thước $420 \\times 297$ mm, đặt nằm ngang. Khung bản vẽ trên khổ giấy này dài bao nhiêu milimét?',
      answer: 390,
      unit: 'mm',
      hints: ['Khung cách mép trái $20$ mm và cách mép phải $10$ mm.'],
      solution:
        'Chiều dài khung: $420 - 20 - 10 = 390$ mm (chiều rộng khung $297 - 10 - 10 = 277$ mm).',
    },
    {
      type: 'choice',
      prompt:
        'Một bản vẽ có khung kích thước $811 \\times 574$ mm. Bản vẽ được vẽ trên khổ giấy nào?',
      options: ['$A1$', '$A0$', '$A2$', '$A3$'],
      answer: 0,
      hints: ['Cộng thêm phần lề: $20 + 10$ mm theo chiều dài, $10 + 10$ mm theo chiều rộng.'],
      solution:
        'Tờ giấy có kích thước $(811 + 30) \\times (574 + 20) = 841 \\times 594$ mm, đó là khổ $A1$.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản vẽ tỉ lệ $1 : 5$, một cạnh của chi tiết đo được $18$ mm. Cạnh đó dài thật bao nhiêu milimét?',
      answer: 90,
      unit: 'mm',
      hints: ['Tỉ lệ $1 : 5$: kích thước thật gấp $5$ lần kích thước trên hình.'],
      solution: 'Kích thước thật: $18 \\cdot 5 = 90$ mm.',
    },
    {
      type: 'number',
      prompt:
        'Một chi tiết nhỏ có cạnh dài thật $15$ mm được vẽ phóng to theo tỉ lệ $2 : 1$. Trên hình vẽ, cạnh đó dài bao nhiêu milimét?',
      answer: 30,
      unit: 'mm',
      hints: ['Tỉ lệ $2 : 1$: kích thước trên hình gấp đôi kích thước thật.'],
      solution: 'Trên hình: $15 \\cdot 2 = 30$ mm (nhưng chữ số kích thước vẫn ghi $15$).',
    },
    {
      type: 'choice',
      prompt:
        'Trên bản vẽ tỉ lệ $1 : 2$, một cạnh dài thật $80$ mm. Chữ số kích thước ghi cho cạnh đó là',
      options: ['$80$', '$40$', '$160$', '$80 : 2$'],
      answer: 0,
      hints: ['Chữ số kích thước có phụ thuộc tỉ lệ bản vẽ không?'],
      solution:
        'Chữ số kích thước ghi trị số thật, không phụ thuộc tỉ lệ: ghi $80$ (dù trên hình cạnh chỉ dài $40$ mm).',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi loại nét với ứng dụng của nó.',
      left: ['Nét liền đậm', 'Nét đứt mảnh', 'Nét gạch dài – chấm – mảnh', 'Nét liền mảnh'],
      right: [
        'Đường bao thấy, cạnh thấy',
        'Đường bao khuất, cạnh khuất',
        'Đường tâm, trục đối xứng',
        'Đường kích thước, đường gióng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['"Khuất" là bị che; "tâm" là tâm của đường tròn hay trục của hình tròn xoay.'],
      solution:
        'Nét liền đậm: đường bao thấy, cạnh thấy. Nét đứt mảnh: đường bao khuất, cạnh khuất. Nét gạch dài – chấm – mảnh: đường tâm, trục đối xứng. Nét liền mảnh: đường kích thước, đường gióng.',
    },
    {
      type: 'choice',
      prompt: 'Với đường kích thước nằm ngang, chữ số kích thước được đặt ở đâu?',
      options: [
        'Phía trên đường kích thước',
        'Phía dưới đường kích thước',
        'Bên trái đường gióng',
        'Ở đầu mũi tên',
      ],
      answer: 0,
      hints: ['Với đường kích thước thẳng đứng, chữ số đặt bên trái.'],
      solution:
        'Chữ số đặt phía trên đường kích thước nằm ngang; với đường kích thước thẳng đứng, chữ số đặt bên trái và viết dọc theo đường kích thước.',
    },
    {
      type: 'choice',
      prompt: 'Trên bản vẽ, kí hiệu $\\varnothing 20$ cho biết điều gì?',
      options: [
        'Đường kính của phần tử tròn là $20$ mm',
        'Bán kính của phần tử tròn là $20$ mm',
        'Chu vi của phần tử tròn là $20$ mm',
        'Phần tử có $20$ lỗ',
      ],
      answer: 0,
      hints: ['Bán kính được kí hiệu bằng chữ $R$.'],
      solution:
        '$\\varnothing$ là kí hiệu đường kính: $\\varnothing 20$ là đường kính $20$ mm; bán kính $10$ mm sẽ ghi $R10$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước lập bản vẽ kĩ thuật gồm các hình chiếu vuông góc và hình chiếu trục đo vuông góc đều của một vật thể theo đúng trình tự.',
      items: [
        'Chọn hướng chiếu phù hợp.',
        'Chỉnh sửa các nét vẽ và ghi kích thước.',
        'Vẽ hình chiếu vuông góc của mỗi hình khối cấu tạo nên vật thể.',
        'Phân tích vật thể thành các hình khối đơn giản.',
        'Từ các hình chiếu vuông góc và hình biểu diễn của vật thể, dựng hình chiếu trục đo.',
        'Kẻ khung bản vẽ, khung tên để hoàn thành bản vẽ.',
      ],
      answer: [3, 0, 2, 1, 4, 5],
      hints: [
        'Trước khi chiếu phải biết vật gồm những khối nào.',
        'Hình chiếu trục đo được dựng từ các hình chiếu vuông góc đã hoàn chỉnh; khung tên làm sau cùng.',
      ],
      solution:
        'Phân tích vật thể thành các khối đơn giản → chọn hướng chiếu → vẽ hình chiếu vuông góc của mỗi khối → chỉnh sửa nét vẽ và ghi kích thước → dựng hình chiếu trục đo → kẻ khung bản vẽ, khung tên.',
    },
    {
      type: 'number',
      prompt:
        'Bản vẽ một khối đỡ cho biết: khối hộp dài $60$, rộng $40$, cao $30$, phía trên khoét một rãnh rộng $20$, sâu $15$ chạy suốt chiều rộng (đơn vị mm). Thể tích khối đỡ là bao nhiêu $\\text{cm}^3$?',
      answer: 60,
      unit: 'cm³',
      hints: [
        'Thể tích khối = thể tích hộp bao ngoài trừ thể tích rãnh.',
        'Rãnh là một hình hộp $20 \\times 40 \\times 15$ mm; nhớ đổi $1\\ \\text{cm}^3 = 1\\,000\\ \\text{mm}^3$.',
      ],
      solution:
        'Hộp: $60 \\cdot 40 \\cdot 30 = 72\\,000\\ \\text{mm}^3$; rãnh: $20 \\cdot 40 \\cdot 15 = 12\\,000\\ \\text{mm}^3$. Thể tích: $72\\,000 - 12\\,000 = 60\\,000\\ \\text{mm}^3 = 60\\ \\text{cm}^3$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các việc làm đúng khi ghi kích thước theo nguyên tắc đầy đủ.',
      options: [
        'Ghi đủ các kích thước để xác định được hình dạng và độ lớn của vật thể.',
        'Mỗi kích thước chỉ ghi một lần trên bản vẽ.',
        'Ghi lại chiều cao trên cả hình chiếu đứng và hình chiếu cạnh cho chắc chắn.',
        'Ghi thêm đơn vị mm sau mỗi chữ số kích thước.',
        'Ghi chữ số kích thước theo kích thước đo trên hình khi vẽ thu nhỏ.',
      ],
      answers: [0, 1],
      hints: ['Đơn vị trên bản vẽ là mm và không ghi; chữ số luôn là trị số thật.'],
      solution:
        'Đúng: ghi đủ kích thước, mỗi kích thước một lần. Sai: ghi lặp chiều cao; ghi đơn vị (bản vẽ dùng mm và không ghi đơn vị); ghi kích thước đo trên hình (phải ghi trị số thật).',
    },
  ],
  takeaways: [
    'Khổ giấy $A0$ đến $A4$; khung bản vẽ cách mép trái $20$ mm, các mép khác $10$ mm; khung tên ở góc phải phía dưới.',
    'Tỉ lệ = kích thước trên hình : kích thước thật; thu nhỏ $1 : n$, nguyên hình $1 : 1$, phóng to $n : 1$.',
    'Nét liền đậm: thấy; nét đứt mảnh: khuất; nét gạch dài – chấm – mảnh: đường tâm, trục đối xứng; nét liền mảnh: kích thước, gióng.',
    'Chữ số kích thước ghi trị số thật theo mm, không ghi đơn vị; $\\varnothing$ là đường kính, $R$ là bán kính.',
    'Nguyên tắc đầy đủ: đọc được hình dạng và mọi kích thước; mỗi kích thước ghi một lần.',
  ],
};
