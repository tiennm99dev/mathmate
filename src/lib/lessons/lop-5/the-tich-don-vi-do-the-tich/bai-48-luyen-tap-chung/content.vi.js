/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về thể tích: thể tích hình xếp từ khối 1 cm³, so sánh thể tích, đổi giữa m³, dm³, cm³ và giải bài toán thực tế.',
  intro:
    'Em ôn lại thể tích của một hình và ba đơn vị m³, dm³, cm³. Em đếm khối, đổi đơn vị và giải bài toán về thùng hàng, bể nước nhé!',
  objectives: [
    'Tính thể tích hình xếp từ các khối 1 cm³ và so sánh thể tích hai hình.',
    'Đọc, viết các số đo thể tích.',
    'Đổi được các số đo thể tích giữa m³, dm³ và cm³, kể cả số thập phân.',
    'Giải được bài toán thực tế có số đo thể tích.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 m³', '1 000 dm³ = 1 000 000 cm³'],
            ['1 dm³', '1 000 cm³'],
            ['1 l', '1 dm³'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi đơn vị đo thể tích gấp 1 000 lần đơn vị bé hơn liền sau. Đổi ra đơn vị bé thì nhân với 1 000, đổi ra đơn vị lớn thì chia cho 1 000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm khối',
          text: 'Hình hộp xếp từ các khối nhỏ: em đếm số khối ở một lớp rồi nhân với số lớp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ câu hỏi trộn',
    instruction:
      'Mỗi câu một dạng bài của chủ đề. Sai lần đầu, em có gợi ý và được thử lại. Làm xong, em xem phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Một thùng dạng hình hộp chữ nhật dài 6 dm, rộng 4 dm, cao 3 dm. Xếp được bao nhiêu hộp hình lập phương 1 dm³ vào thùng?',
      steps: [
        'Mỗi lớp dưới đáy xếp được 6 × 4 = 24 (hộp).',
        'Thùng cao 3 dm nên xếp được 3 lớp: 24 × 3 = 72 (hộp).',
      ],
      answer: 'Xếp được 72 hộp.',
    },
    {
      problem:
        'Hộp vàng có thể tích 25,75 dm³, hộp xanh 25 cm³, hộp đỏ 24,5 cm³. Hộp nào có thể tích lớn nhất?',
      steps: ['Đổi về cùng đơn vị: 25,75 dm³ = 25 750 cm³.', '25 750 > 25 > 24,5.'],
      answer: 'Hộp vàng có thể tích lớn nhất.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết số đo: mười ba phẩy không năm mét khối.',
      answer: 13.05,
      unit: 'm³',
      hints: ['Phần nguyên là 13.', 'Sau dấu phẩy là "không năm": chữ số 0 rồi chữ số 5.'],
      solution: 'Mười ba phẩy không năm mét khối viết là 13,05 m³.',
    },
    {
      type: 'choice',
      prompt: 'Số đo 0,857 m³ đọc là gì?',
      options: [
        'Không phẩy tám trăm năm mươi bảy mét khối',
        'Không phẩy tám trăm năm mươi bảy đề-xi-mét khối',
        'Tám trăm năm mươi bảy mét khối',
      ],
      answer: 0,
      hints: ['Đọc phần nguyên, đọc "phẩy", đọc phần thập phân rồi đọc tên đơn vị.'],
      solution: '0,857 m³ đọc là: không phẩy tám trăm năm mươi bảy mét khối.',
    },
    {
      type: 'choice',
      prompt:
        'Một khối băng hình lập phương có cạnh khoảng 1 m. Thể tích khối băng khoảng bao nhiêu?',
      options: ['1 m³', '1 dm³', '1 cm³'],
      answer: 0,
      hints: ['Mét khối là thể tích hình lập phương cạnh 1 m.'],
      solution: 'Khối băng là hình lập phương cạnh khoảng 1 m, nên thể tích khoảng 1 m³.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt xếp các khối 1 cm³ thành một hình gồm 4 lớp, mỗi lớp 11 khối. Hình đó có thể tích bao nhiêu?',
      answer: 44,
      unit: 'cm³',
      hints: ['Mỗi khối là 1 cm³.', 'Em tính 11 × 4.'],
      solution: '11 × 4 = 44 khối. Thể tích hình là 44 cm³.',
    },
    {
      type: 'number',
      prompt: '5 m³ = ? dm³',
      answer: 5000,
      unit: 'dm³',
      hints: ['1 m³ = 1 000 dm³.'],
      solution: '5 × 1 000 = 5 000. Vậy 5 m³ = 5 000 dm³.',
    },
    {
      type: 'number',
      prompt: '480 dm³ = ? m³',
      answer: 0.48,
      unit: 'm³',
      hints: ['Chia 480 cho 1 000.'],
      solution: '480 : 1 000 = 0,48. Vậy 480 dm³ = 0,48 m³.',
    },
    {
      type: 'number',
      prompt: '0,25 m³ = ? cm³',
      answer: 250000,
      unit: 'cm³',
      hints: ['1 m³ = 1 000 000 cm³.'],
      solution: '0,25 × 1 000 000 = 250 000. Vậy 0,25 m³ = 250 000 cm³.',
    },
    {
      type: 'number',
      prompt: '5 000 cm³ = ? m³',
      answer: 0.005,
      unit: 'm³',
      hints: ['5 000 cm³ = 5 dm³.', 'Đổi tiếp 5 dm³ ra mét khối: chia cho 1 000.'],
      solution: '5 000 cm³ = 5 dm³. 5 : 1 000 = 0,005. Vậy 5 000 cm³ = 0,005 m³.',
    },
    {
      type: 'number',
      prompt: '2 650 cm³ = ? dm³',
      answer: 2.65,
      unit: 'dm³',
      hints: ['Chia 2 650 cho 1 000.'],
      solution: '2 650 : 1 000 = 2,65. Vậy 2 650 cm³ = 2,65 dm³.',
    },
    {
      type: 'number',
      prompt:
        'Một thùng dạng hình hộp chữ nhật dài 5 dm, rộng 4 dm, cao 2 dm. Xếp được bao nhiêu hộp hình lập phương 1 dm³ vào thùng?',
      answer: 40,
      unit: 'hộp',
      hints: ['Mỗi lớp xếp được 5 × 4 hộp.', 'Thùng cao 2 dm nên có 2 lớp.'],
      solution: 'Mỗi lớp: 5 × 4 = 20 (hộp). 2 lớp: 20 × 2 = 40 (hộp).',
    },
    {
      type: 'choice',
      prompt:
        'Hình A có thể tích 24 cm³, hình B 27 cm³, hình C 20 cm³, hình D 24 cm³. Hình nào có thể tích lớn nhất?',
      options: ['Hình B', 'Hình A', 'Hình C', 'Hình D'],
      answer: 0,
      hints: ['So sánh 24, 27, 20 và 24.'],
      solution: '27 là số lớn nhất, nên hình B có thể tích lớn nhất.',
    },
    {
      type: 'order',
      prompt: 'Xếp các hộp theo thể tích từ lớn đến bé.',
      items: ['Hộp xanh: 25 cm³', 'Hộp vàng: 25,75 dm³', 'Hộp đỏ: 24,5 cm³'],
      answer: [1, 0, 2],
      hints: ['Đổi 25,75 dm³ ra xăng-ti-mét khối trước.'],
      solution: '25,75 dm³ = 25 750 cm³. 25 750 > 25 > 24,5. Thứ tự: hộp vàng, hộp xanh, hộp đỏ.',
    },
    {
      type: 'number',
      prompt:
        'Một năm nhà Nam dùng hết 174 m³ nước. Trung bình mỗi tháng nhà Nam dùng bao nhiêu mét khối nước?',
      answer: 14.5,
      unit: 'm³',
      hints: ['Một năm có 12 tháng.', 'Em tính 174 : 12.'],
      solution: '174 : 12 = 14,5. Trung bình mỗi tháng nhà Nam dùng 14,5 m³ nước.',
    },
    {
      type: 'number',
      prompt:
        'Một bể chứa 240 m³ nước. Người ta dùng hết 15% lượng nước đó. Trong bể còn lại bao nhiêu mét khối nước?',
      answer: 204,
      unit: 'm³',
      hints: ['Tìm 15% của 240 m³.', 'Lấy 240 trừ đi lượng nước đã dùng.'],
      solution: 'Đã dùng: 240 × 15 : 100 = 36 (m³). Còn lại: 240 − 36 = 204 (m³).',
    },
  ],
  takeaways: [
    'Hình xếp từ các khối 1 cm³: thể tích bằng số khối, tính theo cm³.',
    '1 m³ = 1 000 dm³; 1 dm³ = 1 000 cm³; 1 l = 1 dm³.',
    'Muốn so sánh hai số đo thể tích khác đơn vị, em đổi về cùng một đơn vị.',
  ],
};
