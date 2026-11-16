/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Ôn tập và bổ sung: số tự nhiên, tính thuận tiện, phân số, phân số thập phân, các phép tính với phân số, hỗn số, đơn vị đo và bài toán thực tế.',
  intro:
    'Em đã ôn lại số tự nhiên, phân số, hỗn số, hình học và đo lường. Bây giờ em cùng luyện tập tất cả các kiến thức đó nhé!',
  objectives: [
    'Củng cố số tự nhiên, phân số, phân số thập phân và hỗn số.',
    'Thực hiện được các phép tính với phân số.',
    'Vận dụng giải bài toán thực tế có phân số và đơn vị đo.',
  ],
  sections: [
    {
      heading: 'Nhớ lại về phân số',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Cách làm'],
          rows: [
            ['Rút gọn phân số', 'Chia cả tử số và mẫu số cho cùng một số lớn hơn 1.'],
            ['Cộng, trừ khác mẫu số', 'Quy đồng mẫu số rồi cộng, trừ hai phân số đã quy đồng.'],
            ['Nhân hai phân số', 'Tử số nhân tử số, mẫu số nhân mẫu số.'],
            ['Chia hai phân số', 'Nhân với phân số thứ hai đảo ngược.'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Chuyển hỗn số thành phân số: tử số bằng phần nguyên nhân với mẫu số rồi cộng với tử số; mẫu số giữ nguyên.',
        },
      ],
    },
    {
      heading: 'Tìm phân số của một số',
      blocks: [
        {
          type: 'p',
          text: 'Muốn tìm $\\dfrac{3}{5}$ của 40 kg, em lấy 40 × $\\dfrac{3}{5}$ = 24 (kg).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu số đo có hai đơn vị, như 1 tấn 250 kg, em đổi ra một đơn vị (1 250 kg) rồi mới tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập trộn',
    instruction:
      'Mỗi bộ có một câu cho mỗi phần của chủ đề. Chọn sai lần đầu, em được xem gợi ý và chọn lại. Hết bộ, em xem điểm và các phần cần ôn rồi làm bộ khác.',
  },
  examples: [
    {
      problem:
        'Một vòi nước giờ đầu chảy được $\\dfrac{1}{4}$ bể, giờ thứ hai chảy được $\\dfrac{2}{5}$ bể. Hỏi còn mấy phần bể chưa có nước?',
      steps: [
        'Hai giờ chảy được: $\\dfrac{1}{4} + \\dfrac{2}{5} = \\dfrac{5}{20} + \\dfrac{8}{20} = \\dfrac{13}{20}$ (bể).',
        'Cả bể là $\\dfrac{20}{20}$. Phần chưa có nước: $\\dfrac{20}{20} - \\dfrac{13}{20} = \\dfrac{7}{20}$ (bể).',
      ],
      answer: 'Còn $\\dfrac{7}{20}$ bể chưa có nước.',
    },
    {
      problem:
        'Bác An thu hoạch được 2 tấn thóc và đã bán $\\dfrac{3}{8}$ số thóc. Bác An còn lại bao nhiêu ki-lô-gam thóc?',
      steps: [
        'Đổi: 2 tấn = 2 000 kg.',
        'Số thóc đã bán: 2 000 × $\\dfrac{3}{8}$ = 750 (kg).',
        'Số thóc còn lại: 2 000 − 750 = 1 250 (kg).',
      ],
      answer: 'Bác An còn lại 1 250 kg thóc.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong số 2 573 104, chữ số 5 có giá trị là:',
      options: ['500 000', '50 000', '5 000 000', '5'],
      answer: 0,
      hints: ['Đếm hàng từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn.'],
      solution: 'Chữ số 5 ở hàng trăm nghìn, nên có giá trị là 500 000.',
    },
    {
      type: 'number',
      prompt: 'Tính bằng cách thuận tiện: 125 × 36 × 8',
      answer: 36000,
      hints: ['Nhân 125 × 8 trước.'],
      solution: '125 × 36 × 8 = 36 × (125 × 8) = 36 × 1 000 = 36 000.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{24}{36}$ thành phân số tối giản.',
      answer: [2, 3],
      simplest: true,
      hints: ['24 và 36 cùng chia hết cho 12.'],
      solution: '$\\dfrac{24}{36} = \\dfrac{24 : 12}{36 : 12} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Viết số thích hợp vào chỗ trống: $\\dfrac{7}{25} = \\dfrac{?}{100}$',
      answer: 28,
      hints: ['25 × 4 = 100.'],
      solution: '$\\dfrac{7}{25} = \\dfrac{7 \\times 4}{25 \\times 4} = \\dfrac{28}{100}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{3}{4} + \\dfrac{1}{6}$',
      answer: [11, 12],
      simplest: true,
      hints: ['12 chia hết cho cả 4 và 6, nên lấy 12 làm mẫu số chung.'],
      solution:
        '$\\dfrac{3}{4} + \\dfrac{1}{6} = \\dfrac{9}{12} + \\dfrac{2}{12} = \\dfrac{11}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{5}{6} - \\dfrac{2}{9}$',
      answer: [11, 18],
      simplest: true,
      hints: ['18 chia hết cho cả 6 và 9.'],
      solution:
        '$\\dfrac{5}{6} - \\dfrac{2}{9} = \\dfrac{15}{18} - \\dfrac{4}{18} = \\dfrac{11}{18}$.',
    },
    {
      type: 'fraction',
      prompt: 'Chuyển hỗn số $2\\,\\dfrac{3}{5}$ thành phân số.',
      answer: [13, 5],
      hints: ['Tử số: 2 × 5 + 3.'],
      solution: '$2\\,\\dfrac{3}{5} = \\dfrac{2 \\times 5 + 3}{5} = \\dfrac{13}{5}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{4}{5} \\times \\dfrac{15}{8}$',
      answer: [3, 2],
      simplest: true,
      hints: ['Tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.'],
      solution: '$\\dfrac{4}{5} \\times \\dfrac{15}{8} = \\dfrac{60}{40} = \\dfrac{3}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: $\\dfrac{3}{7} : \\dfrac{9}{14}$',
      answer: [2, 3],
      simplest: true,
      hints: ['Nhân với phân số đảo ngược của $\\dfrac{9}{14}$.'],
      solution:
        '$\\dfrac{3}{7} : \\dfrac{9}{14} = \\dfrac{3}{7} \\times \\dfrac{14}{9} = \\dfrac{42}{63} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: '3 tấn 50 kg = ? kg',
      answer: 3050,
      unit: 'kg',
      hints: ['1 tấn = 1 000 kg.'],
      solution: '3 tấn = 3 000 kg, nên 3 tấn 50 kg = 3 000 + 50 = 3 050 kg.',
    },
    {
      type: 'number',
      prompt:
        'Bác An thu hoạch được 2 tấn thóc và đã bán $\\dfrac{3}{8}$ số thóc. Bác An còn lại bao nhiêu ki-lô-gam thóc?',
      answer: 1250,
      unit: 'kg',
      hints: ['Đổi 2 tấn ra ki-lô-gam.', 'Tìm số thóc đã bán: 2 000 × $\\dfrac{3}{8}$.'],
      solution:
        '2 tấn = 2 000 kg. Đã bán: 2 000 × $\\dfrac{3}{8}$ = 750 (kg). Còn lại: 2 000 − 750 = 1 250 (kg).',
    },
    {
      type: 'fraction',
      prompt:
        'Một vòi nước giờ đầu chảy được $\\dfrac{1}{4}$ bể, giờ thứ hai chảy được $\\dfrac{2}{5}$ bể. Còn mấy phần bể chưa có nước?',
      answer: [7, 20],
      simplest: true,
      hints: ['Tính phần bể đã có nước: $\\dfrac{1}{4} + \\dfrac{2}{5}$.', 'Cả bể là 1.'],
      solution:
        '$\\dfrac{1}{4} + \\dfrac{2}{5} = \\dfrac{5}{20} + \\dfrac{8}{20} = \\dfrac{13}{20}$. Còn lại: $1 - \\dfrac{13}{20} = \\dfrac{7}{20}$ (bể).',
    },
  ],
  takeaways: [
    'Cộng, trừ phân số khác mẫu số: quy đồng mẫu số trước.',
    'Nhân phân số: tử nhân tử, mẫu nhân mẫu; chia phân số: nhân với phân số đảo ngược.',
    'Hỗn số đổi ra phân số: phần nguyên × mẫu số + tử số.',
    'Đổi số đo về cùng một đơn vị trước khi tính.',
  ],
};
