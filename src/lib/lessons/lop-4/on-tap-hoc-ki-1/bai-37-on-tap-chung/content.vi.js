/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung học kì 1: số đến lớp triệu, số chẵn và số lẻ, cộng, trừ, nhân, chia, số đo khối lượng và diện tích, hình học, bài toán tổng và hiệu, chu vi hình chữ nhật.',
  intro:
    'Sắp hết học kì 1 rồi! Hôm nay em ôn lại tất cả: số, phép tính, đo lường và hình học. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết, so sánh, sắp xếp các số đến lớp triệu; nhận biết số chẵn, số lẻ.',
    'Cộng, trừ các số có nhiều chữ số; nhân, chia với số có một chữ số.',
    'Đổi, so sánh các số đo khối lượng và diện tích.',
    'Nhận biết hai cạnh vuông góc, hình bình hành, hình thoi.',
    'Giải bài toán tổng và hiệu, bài toán chu vi.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số và phép tính',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Em nhớ'],
          rows: [
            ['Đọc số', 'Tách lớp từ phải sang trái, đọc từng lớp kèm tên lớp.'],
            ['So sánh số', 'Đếm chữ số trước, rồi so sánh từng hàng từ trái sang phải.'],
            ['Số chẵn, số lẻ', 'Số chẵn có chữ số tận cùng 0, 2, 4, 6, 8.'],
            ['Cộng, trừ, nhân', 'Tính từ hàng đơn vị, sang trái.'],
            ['Chia', 'Chia từ trái sang phải.'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có cộng, trừ, nhân, chia: em nhân, chia trước; cộng, trừ sau.',
        },
      ],
    },
    {
      heading: 'Đo lường và hình học',
      blocks: [
        {
          type: 'list',
          items: [
            '1 tấn = 10 tạ = 1 000 kg; 1 tạ = 10 yến = 100 kg.',
            '1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².',
            'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.',
            'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
          ],
        },
      ],
    },
    {
      heading: 'Bài toán tổng và hiệu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số bé = (Tổng − Hiệu) : 2. Số lớn = (Tổng + Hiệu) : 2.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Tổng và hiệu phải cùng đơn vị. Ví dụ: tổng 5 tấn, hiệu 4 tạ thì em đổi 5 tấn = 50 tạ trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Bài trộn đủ các phần của học kì 1. Mỗi phần được hỏi một lần, sau đó phần nào em còn sai sẽ được hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức: 78 060 : 3 + 300 045.',
      steps: ['Em chia trước: 78 060 : 3 = 26 020.', 'Rồi em cộng: 26 020 + 300 045 = 326 065.'],
      answer: '78 060 : 3 + 300 045 = 326 065.',
    },
    {
      problem:
        'Một vườn cây ăn quả có tất cả 760 cây ổi và cây chuối. Số cây ổi nhiều hơn số cây chuối 40 cây. Hỏi vườn có bao nhiêu cây ổi, bao nhiêu cây chuối?',
      steps: [
        'Tổng là 760, hiệu là 40.',
        'Số cây chuối (số bé): (760 − 40) : 2 = 360 (cây).',
        'Số cây ổi (số lớn): 360 + 40 = 400 (cây).',
      ],
      answer: 'Vườn có 400 cây ổi và 360 cây chuối.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết số gồm: 2 triệu, 7 trăm nghìn, 6 chục nghìn, 5 chục và 3 đơn vị.',
      answer: 2760053,
      hints: ['Hàng nghìn và hàng trăm không có, em viết chữ số 0 ở hai hàng đó.'],
      solution: '2 000 000 + 700 000 + 60 000 + 50 + 3 = 2 760 053.',
    },
    {
      type: 'choice',
      prompt: 'Số 381 005 đọc là gì?',
      options: [
        'Ba trăm tám mươi mốt nghìn không trăm linh năm',
        'Ba trăm tám mươi mốt nghìn năm trăm',
        'Ba mươi tám nghìn một trăm linh năm',
        'Ba trăm tám mươi mốt nghìn không trăm năm mươi',
      ],
      answer: 0,
      hints: ['Lớp nghìn là 381, lớp đơn vị là 005.'],
      solution: 'Số 381 005 đọc là: ba trăm tám mươi mốt nghìn không trăm linh năm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chữ số 6 với giá trị của nó.',
      left: [
        'Chữ số 6 trong 12 631',
        'Chữ số 6 trong 1 263 015',
        'Chữ số 6 trong 41 263',
        'Chữ số 6 trong 6 314 508',
      ],
      right: ['600', '60 000', '60', '6 000 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tìm hàng của chữ số 6 trong từng số, kể từ hàng đơn vị bên phải.'],
      solution:
        '12 631: hàng trăm, 600. 1 263 015: hàng chục nghìn, 60 000. 41 263: hàng chục, 60. 6 314 508: hàng triệu, 6 000 000.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ lớn đến bé.',
      items: ['12 509', '9 999', '21 025', '20 152'],
      answer: [2, 3, 0, 1],
      hints: ['Số có bốn chữ số bé hơn số có năm chữ số.'],
      solution: 'Xếp theo thứ tự từ lớn đến bé: 21 025; 20 152; 12 509; 9 999.',
    },
    {
      type: 'choice',
      prompt: 'Trong các số 13; 14; 21; 1 001; 1 002, có bao nhiêu số chẵn?',
      options: ['2', '1', '3', '4'],
      answer: 0,
      hints: ['Số chẵn có chữ số hàng đơn vị là 0, 2, 4, 6, 8.'],
      solution: 'Các số chẵn là 14 và 1 002. Có 2 số chẵn.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 40 613 + 47 519 = ?',
      answer: 88132,
      hints: ['3 cộng 9 bằng 12, viết 2, nhớ 1.'],
      solution:
        '3 cộng 9 bằng 12, viết 2, nhớ 1. 1 cộng 1 bằng 2, thêm 1 bằng 3, viết 3. 6 cộng 5 bằng 11, viết 1, nhớ 1. 0 cộng 7 bằng 7, thêm 1 bằng 8, viết 8. 4 cộng 4 bằng 8, viết 8. Kết quả: 88 132.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 62 748 − 35 261 = ?',
      answer: 27487,
      hints: ['4 không trừ được 6, lấy 14 trừ 6.'],
      solution:
        '8 trừ 1 bằng 7, viết 7. 4 không trừ được 6, lấy 14 trừ 6 bằng 8, viết 8, nhớ 1. 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4. 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2. Kết quả: 27 487.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 23 152 × 4 = ?',
      answer: 92608,
      hints: ['4 nhân 2 bằng 8, viết 8. Em nhân tiếp sang trái.'],
      solution:
        '4 nhân 2 bằng 8, viết 8. 4 nhân 5 bằng 20, viết 0, nhớ 2. 4 nhân 1 bằng 4, thêm 2 bằng 6, viết 6. 4 nhân 3 bằng 12, viết 2, nhớ 1. 4 nhân 2 bằng 8, thêm 1 bằng 9, viết 9. Kết quả: 92 608.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 24 185 : 5 = ?',
      answer: 4837,
      hints: ['2 không chia được cho 5, em lấy 24 chia 5.'],
      solution:
        '24 chia 5 được 4, dư 4. Hạ 1, được 41; 41 chia 5 được 8, dư 1. Hạ 8, được 18; 18 chia 5 được 3, dư 3. Hạ 5, được 35; 35 chia 5 được 7. Kết quả: 4 837. Thử lại: 4 837 × 5 = 24 185.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 1 m² 56 dm² ? 27 dm² + 89 dm²',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đổi vế trái ra đề-xi-mét vuông, tính vế phải, rồi so sánh.'],
      solution: '1 m² 56 dm² = 156 dm². 27 dm² + 89 dm² = 116 dm². 156 > 116.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 6 tạ + 2 tạ ? 75 yến',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['6 tạ + 2 tạ = 8 tạ. Em đổi 8 tạ ra yến.'],
      solution: '6 tạ + 2 tạ = 8 tạ = 80 yến. 80 yến > 75 yến.',
    },
    {
      type: 'number',
      prompt:
        'Một khu vườn hình chữ nhật có chiều rộng 45 m, chiều dài gấp đôi chiều rộng. Người ta rào xung quanh vườn và để một cổng rộng 4 m. Hàng rào dài bao nhiêu mét?',
      answer: 266,
      unit: 'm',
      hints: ['Em tìm chiều dài, rồi tính chu vi. Phần cổng không rào.'],
      solution:
        'Chiều dài: 45 × 2 = 90 (m). Chu vi: (90 + 45) × 2 = 270 (m). Hàng rào dài: 270 − 4 = 266 (m).',
    },
    {
      type: 'number',
      prompt:
        'Hai xe chở tất cả 5 tấn muối. Xe thứ nhất chở nhiều hơn xe thứ hai 4 tạ muối. Hỏi xe thứ nhất chở bao nhiêu tạ muối?',
      answer: 27,
      hints: ['Em đổi 5 tấn ra tạ trước. Xe thứ nhất chở số lớn.'],
      solution:
        '5 tấn = 50 tạ. Xe thứ hai chở: (50 − 4) : 2 = 23 (tạ). Xe thứ nhất chở: 23 + 4 = 27 (tạ).',
    },
  ],
  takeaways: [
    'Số: tách lớp để đọc, so sánh từ hàng cao nhất; số chẵn tận cùng là 0, 2, 4, 6, 8.',
    'Tính: cộng, trừ, nhân từ phải sang trái; chia từ trái sang phải; nhân, chia trước, cộng, trừ sau.',
    'Đo lường: đổi về cùng một đơn vị rồi mới so sánh hoặc tính.',
    'Tổng và hiệu: Số bé = (Tổng − Hiệu) : 2.',
  ],
};
