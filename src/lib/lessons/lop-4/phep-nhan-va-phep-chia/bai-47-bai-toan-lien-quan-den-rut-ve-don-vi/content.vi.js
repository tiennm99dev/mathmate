/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán liên quan đến rút về đơn vị: bước 1 chia để tìm giá trị một phần (rút về đơn vị), bước 2 nhân để tìm giá trị nhiều phần.',
  intro:
    'Có 3 đĩa như nhau đựng 24 quả cam. Hỏi 5 đĩa như thế có bao nhiêu quả cam? Em tìm một đĩa trước, rồi tìm năm đĩa nhé!',
  objectives: [
    'Nhận biết bài toán liên quan đến rút về đơn vị.',
    'Giải bài toán bằng hai bước: tìm giá trị một phần, rồi tìm giá trị nhiều phần.',
    'Trình bày bài giải có lời giải, phép tính và đáp số.',
  ],
  sections: [
    {
      heading: 'Hai bước giải',
      blocks: [
        {
          type: 'p',
          text: 'Có 3 đĩa như nhau đựng 24 quả cam. Hỏi 5 đĩa như thế có bao nhiêu quả cam?',
        },
        { type: 'p', text: 'Bước 1: Mỗi đĩa có số quả cam là: 24 : 3 = 8 (quả).' },
        { type: 'p', text: 'Bước 2: 5 đĩa có số quả cam là: 8 × 5 = 40 (quả).' },
        { type: 'p', text: 'Đáp số: 40 quả cam.' },
        {
          type: 'table',
          head: ['Số đĩa', 'Số quả cam', 'Cách tìm'],
          rows: [
            ['3', '24', 'Đề bài cho'],
            ['1', '8', '24 : 3'],
            ['5', '40', '8 × 5'],
          ],
        },
      ],
    },
    {
      heading: 'Rút về đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Bước 1 tìm số quả cam của một đĩa. Đó là rút về đơn vị.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Giải bài toán liên quan đến rút về đơn vị: Bước 1, tìm giá trị một phần (làm phép chia). Bước 2, tìm giá trị nhiều phần (làm phép nhân).',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các phần phải bằng nhau: các đĩa như nhau, các bao như nhau. Không có "như nhau" thì không rút về đơn vị được.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng hai bước',
    instruction:
      'Bước 1: em chọn số đồ vật trong một phần (phép chia). Bước 2: em chọn số đồ vật trong nhiều phần (phép nhân). Bảng điền dần từng dòng.',
  },
  examples: [
    {
      problem:
        'Có 8 bao gạo như nhau cân nặng 232 kg. Hỏi 9 bao gạo như thế cân nặng bao nhiêu ki-lô-gam?',
      steps: [
        'Mỗi bao gạo cân nặng là: 232 : 8 = 29 (kg).',
        '9 bao gạo cân nặng là: 29 × 9 = 261 (kg).',
      ],
      answer: 'Đáp số: 261 kg.',
    },
    {
      problem: 'Mua 6 quyển vở hết 54 000 đồng. Hỏi mua 9 quyển vở như thế hết bao nhiêu tiền?',
      steps: [
        'Giá tiền một quyển vở là: 54 000 : 6 = 9 000 (đồng).',
        'Mua 9 quyển vở hết số tiền là: 9 000 × 9 = 81 000 (đồng).',
      ],
      answer: 'Đáp số: 81 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một người xếp đều 72 viên thuốc vào 9 vỉ. Hỏi 5 vỉ thuốc như thế có bao nhiêu viên?',
      answer: 40,
      unit: 'viên',
      hints: ['Bước 1: tìm số viên thuốc trong một vỉ.', 'Một vỉ có 72 : 9 viên.'],
      solution: 'Mỗi vỉ có: 72 : 9 = 8 (viên). 5 vỉ có: 8 × 5 = 40 (viên).',
    },
    {
      type: 'choice',
      prompt:
        'Có 4 lọ hoa như nhau cắm 28 bông hoa. Hỏi 6 lọ như thế có bao nhiêu bông? Phép tính rút về đơn vị là phép tính nào?',
      options: ['28 : 4 = 7', '28 × 4 = 112', '6 × 4 = 24', '28 + 6 = 34'],
      answer: 0,
      hints: ['Rút về đơn vị là tìm số bông hoa của một lọ.'],
      solution: 'Một lọ có: 28 : 4 = 7 (bông). Sau đó 6 lọ có: 7 × 6 = 42 (bông).',
    },
    {
      type: 'number',
      prompt: 'Có 4 lọ hoa như nhau cắm 28 bông hoa. Hỏi 6 lọ như thế có bao nhiêu bông hoa?',
      answer: 42,
      unit: 'bông',
      hints: ['Một lọ có 28 : 4 bông.', 'Nhân số bông của một lọ với 6.'],
      solution: 'Mỗi lọ có: 28 : 4 = 7 (bông). 6 lọ có: 7 × 6 = 42 (bông).',
    },
    {
      type: 'number',
      prompt: 'Chia đều 7 641 g bột mì vào 3 túi. Hỏi 2 túi như thế có bao nhiêu gam bột mì?',
      answer: 5094,
      unit: 'g',
      hints: ['Bước 1: tìm số gam bột mì của một túi.', 'Bước 2: nhân với 2.'],
      solution: 'Mỗi túi có: 7 641 : 3 = 2 547 (g). 2 túi có: 2 547 × 2 = 5 094 (g).',
    },
    {
      type: 'number',
      prompt:
        'Một đội công nhân sửa được 1 576 m đường trong 8 ngày, mỗi ngày sửa được như nhau. Hỏi trong 6 ngày đội sửa được bao nhiêu mét đường?',
      answer: 1182,
      unit: 'm',
      hints: ['Tìm số mét đường sửa được trong một ngày.', 'Một ngày sửa được 1 576 : 8 mét.'],
      solution: 'Mỗi ngày sửa được: 1 576 : 8 = 197 (m). 6 ngày sửa được: 197 × 6 = 1 182 (m).',
    },
    {
      type: 'choice',
      prompt:
        'Mai có 5 hộp kẹo như nhau, tất cả 125 cái kẹo. Mai cho bạn 3 hộp. Hỏi Mai còn lại bao nhiêu cái kẹo?',
      options: ['50', '75', '25', '122'],
      answer: 0,
      hints: ['Mỗi hộp có 125 : 5 cái kẹo.', 'Mai còn lại 5 − 3 = 2 hộp.'],
      solution:
        'Mỗi hộp có: 125 : 5 = 25 (cái). Mai còn 5 − 3 = 2 (hộp), tức là 25 × 2 = 50 (cái kẹo).',
    },
    {
      type: 'order',
      prompt:
        'Mua 6 quyển vở hết 54 000 đồng. Hỏi mua 9 quyển vở như thế hết bao nhiêu tiền? Em xếp các bước giải theo đúng thứ tự.',
      items: [
        'Mua 9 quyển vở hết: 9 000 × 9 = 81 000 (đồng)',
        'Giá một quyển vở: 54 000 : 6 = 9 000 (đồng)',
        'Đáp số: 81 000 đồng',
      ],
      answer: [1, 0, 2],
      hints: ['Bước 1 là rút về đơn vị: tìm giá một quyển vở.'],
      solution:
        'Bước 1: 54 000 : 6 = 9 000 (đồng). Bước 2: 9 000 × 9 = 81 000 (đồng). Đáp số: 81 000 đồng.',
    },
    {
      type: 'number',
      prompt:
        'Có 3 xe ô tô như nhau chở 27 bao xi măng. Hỏi 7 xe như thế chở bao nhiêu bao xi măng?',
      answer: 63,
      unit: 'bao',
      hints: ['Một xe chở 27 : 3 bao.'],
      solution: 'Mỗi xe chở: 27 : 3 = 9 (bao). 7 xe chở: 9 × 7 = 63 (bao).',
    },
  ],
  takeaways: [
    'Bước 1: chia để tìm giá trị một phần (rút về đơn vị).',
    'Bước 2: nhân để tìm giá trị nhiều phần.',
  ],
};
