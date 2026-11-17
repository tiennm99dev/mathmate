/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: ước tính số cá thể của một quần thể bằng phương pháp đánh dấu và bắt lại, N ≈ M·n/k; thực hành với túi hạt lạc, tính sai số tuyệt đối, sai số tương đối của ước lượng và nhận xét về cỡ mẫu.',
  intro:
    'Trong hồ có bao nhiêu con cá? Trên đảo có bao nhiêu con chim? Không thể bắt hết để đếm, nhưng các nhà sinh học vẫn ước tính được bằng một ý rất đơn giản: đánh dấu một ít cá thể, thả lại, rồi xem trong một lần bắt sau có bao nhiêu con mang dấu. Trong bài này, em thực hành phương pháp đó với một túi hạt lạc và một hồ cá ảo.',
  objectives: [
    'Mô tả hai bước của phương pháp đánh dấu và bắt lại.',
    'Ước tính số cá thể bằng tỉ lệ: $\\dfrac{k}{n} \\approx \\dfrac{M}{N}$, nên $N \\approx \\dfrac{M \\cdot n}{k}$.',
    'Tính sai số tuyệt đối, sai số tương đối của ước lượng và nhận xét ảnh hưởng của cỡ mẫu.',
  ],
  sections: [
    {
      heading: 'Phương pháp đánh dấu và bắt lại',
      blocks: [
        {
          type: 'p',
          text: 'Gọi $N$ là số cá thể của quần thể (chưa biết). Phương pháp đánh dấu và bắt lại gồm hai bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Bắt $M$ cá thể từ quần thể, đánh dấu chúng rồi thả trở lại quần thể.',
            'Sau một thời gian để các cá thể trộn đều, bắt ngẫu nhiên $n$ cá thể và đếm số cá thể có đánh dấu, kí hiệu là $k$.',
          ],
        },
        {
          type: 'p',
          text: 'Nếu các cá thể đã trộn đều thì tỉ lệ cá thể có dấu trong mẫu xấp xỉ tỉ lệ cá thể có dấu trong cả quần thể:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ước lượng bằng tỉ lệ',
          text: '$$\\frac{k}{n} \\approx \\frac{M}{N} \\quad\\Rightarrow\\quad N \\approx \\hat{N} = \\frac{M \\cdot n}{k}.$$ Giá trị $\\hat{N}$ được làm tròn đến hàng đơn vị.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Điều kiện để ước lượng tin cậy',
          text: 'Trong thời gian giữa hai lần bắt, quần thể coi như không đổi (không sinh thêm, chết đi, di cư); dấu không bị mất; cá thể có dấu trộn đều và có khả năng bị bắt như cá thể không có dấu. Nếu $k = 0$ thì không ước lượng được, cần bắt mẫu lớn hơn.',
        },
      ],
    },
    {
      heading: 'Hoạt động 1: Ước tính số hạt lạc trong túi',
      blocks: [
        {
          type: 'p',
          text: 'Chuẩn bị: một túi hạt lạc, một cái cốc, giấy, bút. Gọi $N$ là số hạt lạc ban đầu trong túi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xúc một cốc lạc, đếm số hạt và đánh dấu tất cả các hạt đó.',
            'Trả các hạt đã đánh dấu vào túi, trộn đều.',
            'Xúc nửa cốc lạc, đếm tổng số hạt và số hạt có đánh dấu.',
          ],
        },
        {
          type: 'p',
          text: 'Một nhóm đánh dấu $M = 105$ hạt; nửa cốc xúc lần sau có $n = 54$ hạt, trong đó $k = 9$ hạt có đánh dấu. Ước tính: $N \\approx \\dfrac{105 \\cdot 54}{9} = 630$ hạt.',
        },
      ],
    },
    {
      heading: 'Hoạt động 2: Đánh giá sai số của ước lượng',
      blocks: [
        {
          type: 'p',
          text: 'Để thấy ước lượng tốt đến đâu, ta làm thí nghiệm với một túi đã biết trước $N = 1\\,000$ hạt, trong đó đánh dấu $M = 100$ hạt, rồi lặp lại bước 3 với nửa cốc, một cốc và một cốc rưỡi. Với mỗi lần, tính:',
        },
        {
          type: 'list',
          items: [
            'ước lượng $\\hat{N} = \\dfrac{M \\cdot n}{k}$, làm tròn đến hàng đơn vị;',
            'sai số tuyệt đối $\\Delta_N = |\\hat{N} - N|$;',
            'sai số tương đối $\\delta_N = \\dfrac{\\Delta_N}{\\hat{N}}$.',
          ],
        },
        {
          type: 'table',
          head: ['Lần', '$n$', '$k$', '$\\hat{N}$', '$\\Delta_N$', '$\\delta_N$'],
          rows: [
            ['Nửa cốc', '$51$', '$4$', '$1\\,275$', '$275$', '$\\approx 21{,}57\\%$'],
            ['Một cốc', '$103$', '$11$', '$936$', '$64$', '$\\approx 6{,}84\\%$'],
            ['Một cốc rưỡi', '$155$', '$16$', '$969$', '$31$', '$\\approx 3{,}20\\%$'],
          ],
          caption: 'Kết quả của một nhóm với $N = 1\\,000$, $M = 100$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Cỡ mẫu $n$ càng lớn thì ước lượng thường càng chính xác, sai số càng nhỏ. Mỗi lần bắt cho một kết quả khác nhau vì mẫu là ngẫu nhiên; lặp lại nhiều lần và lấy trung bình cũng giúp ước lượng ổn định hơn.',
        },
      ],
    },
    {
      heading: 'Dự án: Ước tính số cá thể bằng đánh dấu và bắt lại',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh dùng phương pháp đánh dấu và bắt lại để ước tính số hạt trong một túi (lạc, đậu, ngô), đánh giá sai số và nêu cách áp dụng cho một quần thể sinh vật thật.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: một túi hạt (đã được giáo viên đếm trước số hạt nhưng không cho học sinh biết), bút dạ để đánh dấu, cốc, giấy, máy tính cầm tay hoặc phần mềm bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xúc một cốc hạt, đếm và đánh dấu được $M$ hạt; trả lại túi và trộn đều.',
            'Lần lượt xúc nửa cốc, một cốc, một cốc rưỡi; mỗi lần đếm $n$ và $k$, tính $\\hat{N}$, rồi trả hạt lại túi và trộn đều.',
            'Nhận số $N$ thật từ giáo viên; lập bảng $n$, $k$, $\\hat{N}$, $\\Delta_N$, $\\delta_N$.',
            'Nhận xét: cỡ mẫu ảnh hưởng thế nào đến sai số? Trung bình các ước lượng có gần $N$ hơn từng ước lượng không?',
            'Thảo luận: muốn ước tính số cá trong một cái ao, cần làm gì để các điều kiện của phương pháp được thoả mãn?',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng kết quả, các phép tính ước lượng và sai số, nhận xét của nhóm về cỡ mẫu và một kế hoạch ngắn để ước tính một quần thể sinh vật thật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hồ cá ảo',
    instruction:
      'Chọn số cá $M$ cần đánh dấu rồi thả lại hồ. Sau đó chọn cỡ mẫu $n$ và bắt mẫu nhiều lần, đọc số cá có dấu $k$ và ước lượng $\\hat{N}$. Bấm "Hiện số cá thật" để xem sai số; thử với cỡ mẫu nhỏ và lớn rồi so sánh.',
  },
  examples: [
    {
      problem:
        'Một nhóm đánh dấu $105$ hạt lạc rồi trả lại túi, trộn đều. Lần xúc sau được $54$ hạt, trong đó có $9$ hạt có đánh dấu. Ước tính số hạt lạc trong túi.',
      steps: [
        '$M = 105$, $n = 54$, $k = 9$.',
        'Tỉ lệ hạt có dấu trong mẫu $\\dfrac{9}{54} = \\dfrac{1}{6}$ xấp xỉ tỉ lệ trong túi $\\dfrac{105}{N}$.',
        '$N \\approx \\dfrac{105 \\cdot 54}{9} = 630$.',
      ],
      answer: 'Túi có khoảng $630$ hạt lạc.',
    },
    {
      problem:
        'Túi có $N = 1\\,000$ hạt, trong đó $M = 100$ hạt có đánh dấu. Một cốc xúc ra có $n = 103$ hạt, $k = 11$ hạt có dấu. Tính ước lượng $\\hat{N}$, sai số tuyệt đối và sai số tương đối.',
      steps: [
        '$\\hat{N} = \\dfrac{100 \\cdot 103}{11} \\approx 936{,}36$, làm tròn $\\hat{N} = 936$.',
        '$\\Delta_N = |936 - 1\\,000| = 64$.',
        '$\\delta_N = \\dfrac{64}{936} \\approx 6{,}84\\%$.',
      ],
      answer: '$\\hat{N} = 936$, $\\Delta_N = 64$, $\\delta_N \\approx 6{,}84\\%$.',
    },
    {
      problem:
        'Để ước tính số cá trong một hồ, người ta bắt $200$ con, đánh dấu rồi thả lại. Một tuần sau bắt $150$ con, thấy $12$ con có dấu. Ước tính số cá trong hồ.',
      steps: [
        '$M = 200$, $n = 150$, $k = 12$.',
        '$N \\approx \\dfrac{200 \\cdot 150}{12} = \\dfrac{30\\,000}{12} = 2\\,500$.',
      ],
      answer: 'Hồ có khoảng $2\\,500$ con cá.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Người ta bắt $80$ con chim trên một hòn đảo, đeo vòng đánh dấu rồi thả. Một tháng sau bắt $60$ con, có $5$ con đeo vòng. Ước tính số chim trên đảo.',
      answer: 960,
      unit: 'con',
      hints: [
        '$\\dfrac{k}{n} \\approx \\dfrac{M}{N}$.',
        'Tính $\\dfrac{M \\cdot n}{k}$ với $M = 80$, $n = 60$, $k = 5$.',
      ],
      solution: '$N \\approx \\dfrac{80 \\cdot 60}{5} = \\dfrac{4\\,800}{5} = 960$ con.',
    },
    {
      type: 'fraction',
      prompt:
        'Đánh dấu $60$ hạt đậu trong túi. Lần xúc sau được $50$ hạt, có $10$ hạt có dấu. Tỉ lệ hạt có dấu trong cả túi được ước lượng bằng bao nhiêu (viết dưới dạng phân số tối giản)?',
      answer: [1, 5],
      simplest: true,
      hints: ['Tỉ lệ trong túi xấp xỉ tỉ lệ trong mẫu $\\dfrac{k}{n}$.'],
      solution:
        '$\\dfrac{k}{n} = \\dfrac{10}{50} = \\dfrac{1}{5}$. Từ đó $N \\approx 60 \\cdot 5 = 300$ hạt.',
    },
    {
      type: 'number',
      prompt:
        'Một ao có khoảng $1\\,000$ con cá, trong đó $100$ con đã được đánh dấu và trộn đều. Bắt ngẫu nhiên $200$ con, em dự đoán có khoảng bao nhiêu con có dấu?',
      answer: 20,
      unit: 'con',
      hints: [
        'Tỉ lệ cá có dấu trong ao là $\\dfrac{100}{1\\,000}$; trong mẫu cũng xấp xỉ như vậy.',
      ],
      solution: '$k \\approx n \\cdot \\dfrac{M}{N} = 200 \\cdot \\dfrac{100}{1\\,000} = 20$ con.',
    },
    {
      type: 'number',
      prompt:
        'Túi có $N = 800$ hạt. Một nhóm ước lượng được $\\hat{N} = 850$. Tính sai số tương đối $\\delta_N = \\dfrac{\\Delta_N}{\\hat{N}}$ theo phần trăm (làm tròn đến hàng phần trăm).',
      answer: 5.88,
      tolerance: 0.01,
      unit: '%',
      hints: ['Trước hết tính $\\Delta_N = |\\hat{N} - N|$.'],
      solution:
        '$\\Delta_N = |850 - 800| = 50$; $\\delta_N = \\dfrac{50}{850} \\approx 5{,}88\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Với $N = 1\\,000$ và $M = 100$, một mẫu một cốc rưỡi có $n = 155$ hạt, $k = 16$ hạt có dấu. Ước lượng $\\hat{N}$ (làm tròn đến hàng đơn vị) bằng bao nhiêu?',
      answer: 969,
      hints: ['$\\hat{N} = \\dfrac{M \\cdot n}{k}$ rồi làm tròn.'],
      solution:
        '$\\hat{N} = \\dfrac{100 \\cdot 155}{16} = 968{,}75 \\approx 969$. Sai số tuyệt đối chỉ còn $31$.',
    },
    {
      type: 'choice',
      prompt: 'Điều nào sau đây làm ước lượng bằng phương pháp đánh dấu và bắt lại kém tin cậy?',
      options: [
        'Cá có dấu bị thương nên dễ bị bắt lại hơn cá không có dấu.',
        'Để vài ngày cho cá có dấu bơi trộn đều trong hồ rồi mới bắt lần hai.',
        'Dấu được làm bằng vật liệu bền, không bong ra.',
        'Bắt lần hai với cỡ mẫu lớn.',
      ],
      answer: 0,
      hints: ['Phương pháp cần cá có dấu và cá không có dấu có khả năng bị bắt như nhau.'],
      solution:
        'Nếu cá có dấu dễ bị bắt hơn thì $k$ lớn hơn thực tế, nên $\\dfrac{M \\cdot n}{k}$ nhỏ hơn số cá thật. Các lựa chọn còn lại đều giúp ước lượng tốt hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những nhận xét nào đúng?',
      options: [
        'Cỡ mẫu $n$ càng lớn thì ước lượng thường càng chính xác.',
        'Nếu trong mẫu không có cá thể nào có dấu ($k = 0$) thì không ước lượng được $N$ bằng công thức $\\dfrac{M \\cdot n}{k}$.',
        'Hai lần bắt mẫu cùng cỡ luôn cho cùng một ước lượng.',
        'Sai số tương đối $\\delta_N = \\dfrac{|\\hat{N} - N|}{\\hat{N}}$.',
      ],
      answers: [0, 1, 3],
      hints: [
        'Mẫu được bắt ngẫu nhiên: số cá thể có dấu trong hai lần bắt có nhất thiết bằng nhau không?',
      ],
      solution:
        'Mẫu lớn thường cho sai số nhỏ (đúng). Với $k = 0$ phép chia không thực hiện được (đúng). Mẫu ngẫu nhiên nên $k$ thay đổi giữa các lần, ước lượng cũng thay đổi: nhận xét "luôn cho cùng một ước lượng" sai. Công thức sai số tương đối là đúng.',
    },
    {
      type: 'number',
      prompt:
        'Một nhóm làm ba lần với cùng $M = 100$ và được các ước lượng $1\\,275$, $936$, $969$. Trung bình cộng của ba ước lượng (làm tròn đến hàng đơn vị) là bao nhiêu?',
      answer: 1060,
      hints: ['Cộng ba ước lượng rồi chia cho $3$.'],
      solution: '$\\dfrac{1\\,275 + 936 + 969}{3} = \\dfrac{3\\,180}{3} = 1\\,060$.',
    },
  ],
  takeaways: [
    'Đánh dấu $M$ cá thể, thả lại, bắt ngẫu nhiên $n$ cá thể và đếm $k$ cá thể có dấu.',
    'Ước lượng bằng tỉ lệ: $\\dfrac{k}{n} \\approx \\dfrac{M}{N}$, nên $N \\approx \\dfrac{M \\cdot n}{k}$, làm tròn đến hàng đơn vị.',
    'Sai số tuyệt đối $\\Delta_N = |\\hat{N} - N|$, sai số tương đối $\\delta_N = \\dfrac{\\Delta_N}{\\hat{N}}$.',
    'Cỡ mẫu lớn, cá thể trộn đều và dấu không mất giúp ước lượng chính xác hơn.',
  ],
};
