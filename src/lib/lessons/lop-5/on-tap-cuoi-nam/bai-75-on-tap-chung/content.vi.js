/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung cuối năm lớp 5: số thập phân và phân số, các phép tính, tỉ số phần trăm, hình học, đo lường, chuyển động đều, thống kê và xác suất, qua các bài toán tổng hợp.',
  intro:
    'Năm học sắp kết thúc! Bài ôn tập chung giúp em nhìn lại tất cả những gì đã học ở lớp 5 và biết phần nào em cần luyện thêm trước khi lên lớp 6.',
  objectives: [
    'Tính được với phân số và số thập phân; so sánh được các số thập phân.',
    'Giải được bài toán về tỉ số và tỉ số phần trăm.',
    'Tính được diện tích, thể tích của các hình đã học.',
    'Đổi được đơn vị đo; giải được bài toán chuyển động đều.',
    'Đọc được biểu đồ hình quạt tròn; nhận biết được khả năng xảy ra của một sự kiện.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số và phép tính',
      blocks: [
        {
          type: 'list',
          items: [
            'So sánh số thập phân: so sánh phần nguyên, rồi lần lượt từng hàng của phần thập phân.',
            'Cộng, trừ hai phân số khác mẫu số: quy đồng mẫu số rồi cộng, trừ các tử số.',
            'Trong biểu thức: nhân, chia trước; cộng, trừ sau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm a% của một số, em lấy số đó chia cho 100 rồi nhân với a.',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Công thức'],
          rows: [
            ['Hình tam giác', 'S = a × h : 2'],
            ['Hình thang', 'S = (a + b) × h : 2'],
            ['Hình tròn', 'C = d × 3,14; S = r × r × 3,14'],
            ['Hình hộp chữ nhật', 'V = a × b × c'],
            ['Hình lập phương', 'V = a × a × a'],
          ],
        },
        {
          type: 'p',
          text: '1 dm³ = 1 l. Một bể chứa 226 800 cm³ nước thì chứa 226,8 l nước.',
        },
      ],
    },
    {
      heading: 'Chuyển động, thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Chuyển động đều: v = s : t; s = v × t; t = s : v.',
            'Biểu đồ hình quạt tròn: số lượng một phần = Tổng số × Tỉ số phần trăm : 100.',
            'Một sự kiện có thể chắc chắn, có thể hoặc không thể xảy ra.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Bài có câu hỏi về mọi phần đã học. Mỗi phần được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Một bể cá dạng hình hộp chữ nhật có chu vi đáy 300 cm, chiều dài hơn chiều rộng 30 cm, chiều cao 60 cm. Mực nước trong bể cao 42 cm. Tính chiều dài, chiều rộng của đáy bể và cho biết lượng nước chiếm bao nhiêu phần trăm thể tích bể.',
      steps: [
        'Nửa chu vi đáy: 300 : 2 = 150 (cm).',
        'Chiều dài: (150 + 30) : 2 = 90 (cm). Chiều rộng: 150 − 90 = 60 (cm).',
        'Đáy bể không đổi, nên tỉ số giữa lượng nước và thể tích bể bằng tỉ số giữa mực nước và chiều cao bể: 42 : 60 = 0,7 = 70%.',
      ],
      answer: 'Đáy bể dài 90 cm, rộng 60 cm. Lượng nước chiếm 70% thể tích bể.',
    },
    {
      problem:
        'Một tỉnh có diện tích 10 000 km², mật độ dân số là 80 người/km². Tỉnh muốn mật độ dân số tăng lên 92 người/km². Số dân phải tăng thêm bao nhiêu người? Số đó bằng bao nhiêu phần trăm số dân hiện nay?',
      steps: [
        'Mỗi ki-lô-mét vuông tăng thêm: 92 − 80 = 12 (người).',
        'Số dân tăng thêm: 12 × 10 000 = 120 000 (người).',
        'Số dân hiện nay: 80 × 10 000 = 800 000 (người).',
        'Tỉ số phần trăm: 120 000 : 800 000 = 0,15 = 15%.',
      ],
      answer: 'Phải tăng thêm 120 000 người, bằng 15% số dân hiện nay.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 3,45 ? 3,405',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số có cùng phần nguyên và cùng hàng phần mười. Em so sánh hàng phần trăm.'],
      solution: 'Hàng phần trăm: 5 > 0, nên 3,45 > 3,405.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 25,6 + 4,75 × 2',
      answer: 35.1,
      hints: ['Em tính phép nhân trước.'],
      solution: '4,75 × 2 = 9,5. 25,6 + 9,5 = 35,1.',
    },
    {
      type: 'fraction',
      prompt: 'Tính: 3/4 + 5/6 (viết kết quả dưới dạng phân số tối giản).',
      answer: [19, 12],
      simplest: true,
      hints: ['Quy đồng mẫu số: mẫu số chung là 12.'],
      solution: '3/4 + 5/6 = 9/12 + 10/12 = 19/12.',
    },
    {
      type: 'number',
      prompt: 'Tìm 15% của 360.',
      answer: 54,
      hints: ['Lấy 360 chia cho 100 rồi nhân với 15.'],
      solution: '360 : 100 × 15 = 54.',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 96. Tỉ số của số bé và số lớn là 3/5. Tìm số bé.',
      answer: 36,
      hints: ['Vẽ sơ đồ: số bé 3 phần, số lớn 5 phần bằng nhau.', 'Tìm giá trị một phần: 96 : 8.'],
      solution: 'Tổng số phần: 3 + 5 = 8. Một phần: 96 : 8 = 12. Số bé: 12 × 3 = 36.',
    },
    {
      type: 'number',
      prompt: 'Hình thang có hai đáy dài 12 cm và 8 cm, chiều cao 5 cm. Tính diện tích hình thang.',
      answer: 50,
      unit: 'cm²',
      hints: ['S = (a + b) × h : 2.'],
      solution: '(12 + 8) × 5 : 2 = 50 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có bán kính 5 cm. Tính diện tích hình tròn.',
      answer: 78.5,
      unit: 'cm²',
      hints: ['S = r × r × 3,14.'],
      solution: '5 × 5 × 3,14 = 78,5 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Bể cá dạng hình hộp chữ nhật, đáy dài 90 cm, rộng 60 cm. Mực nước trong bể cao 42 cm. Trong bể có bao nhiêu lít nước?',
      answer: 226.8,
      unit: 'l',
      hints: ['Thể tích nước = 90 × 60 × 42 (cm³).', '1 000 cm³ = 1 dm³ = 1 l.'],
      solution: '90 × 60 × 42 = 226 800 (cm³) = 226,8 dm³ = 226,8 l.',
    },
    {
      type: 'number',
      prompt:
        'Bể cá cao 60 cm, mực nước trong bể cao 42 cm. Lượng nước chiếm bao nhiêu phần trăm thể tích bể?',
      answer: 70,
      unit: '%',
      hints: ['Đáy bể không đổi, nên em so sánh mực nước với chiều cao bể.'],
      solution: '42 : 60 = 0,7 = 70%.',
    },
    {
      type: 'number',
      prompt: 'Một ô tô đi 90 km hết 1 giờ 30 phút. Tính vận tốc của ô tô.',
      answer: 60,
      unit: 'km/giờ',
      hints: ['1 giờ 30 phút = 1,5 giờ.', 'Vận tốc = quãng đường : thời gian.'],
      solution: '1 giờ 30 phút = 1,5 giờ. Vận tốc: 90 : 1,5 = 60 (km/giờ).',
    },
    {
      type: 'number',
      prompt:
        'Một tỉnh có diện tích 10 000 km², mật độ dân số 80 người/km². Muốn mật độ dân số là 92 người/km² thì số dân phải tăng thêm bao nhiêu người?',
      answer: 120000,
      unit: 'người',
      hints: ['Mỗi ki-lô-mét vuông phải thêm 92 − 80 người.'],
      solution: '(92 − 80) × 10 000 = 12 × 10 000 = 120 000 (người).',
    },
    {
      type: 'number',
      prompt: '3,5 tấn = ? kg',
      answer: 3500,
      unit: 'kg',
      hints: ['1 tấn = 1 000 kg.'],
      solution: '3,5 tấn = 3,5 × 1 000 kg = 3 500 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có 5 quả bóng xanh và 1 quả bóng đỏ. Lấy ra cùng lúc 2 quả. Sự kiện "có ít nhất 1 quả bóng xanh" xảy ra như thế nào?',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 0,
      hints: ['Hộp chỉ có 1 quả đỏ. Lấy 2 quả thì có thể cả 2 quả đều đỏ không?'],
      solution:
        'Hộp chỉ có 1 quả đỏ, nên trong 2 quả lấy ra luôn có quả xanh. Sự kiện chắc chắn xảy ra.',
    },
  ],
  takeaways: [
    'Trong biểu thức: nhân, chia trước; cộng, trừ sau.',
    'Muốn tìm a% của một số: lấy số đó chia cho 100 rồi nhân với a.',
    'Diện tích hình tròn: S = r × r × 3,14; thể tích hình hộp chữ nhật: V = a × b × c.',
    'Chuyển động đều: v = s : t; s = v × t; t = s : v.',
  ],
};
