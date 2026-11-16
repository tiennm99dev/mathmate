/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành ước lượng và đo diện tích mặt bàn, cửa, nền lớp, sân trường; chọn đơn vị đo phù hợp và tính chi phí lát nền lớp học.',
  intro:
    'Mặt bàn của em rộng bao nhiêu? Còn sân trường thì sao? Hôm nay em ước lượng trước, rồi đo và tính để kiểm tra. Em cũng giúp Rô-bốt tính tiền lát nền lớp học nhé!',
  objectives: [
    'Chọn được đơn vị đo diện tích phù hợp với từng vật, từng nơi.',
    'Ước lượng được diện tích rồi kiểm tra bằng số đo thật.',
    'Đo, tính diện tích và đổi đơn vị để giải quyết việc thực tế.',
  ],
  sections: [
    {
      heading: 'Chọn đơn vị và ước lượng',
      blocks: [
        {
          type: 'table',
          head: ['Em muốn đo', 'Đơn vị phù hợp'],
          rows: [
            ['Con tem, cúc áo', 'mm², cm²'],
            ['Quyển sách, mặt bàn', 'cm², dm²'],
            ['Cửa, nền lớp học, sân trường', 'm²'],
            ['Ruộng, vườn, hồ', 'ha'],
            ['Thành phố, tỉnh', 'km²'],
          ],
        },
        {
          type: 'p',
          text: 'Muốn ước lượng diện tích hình chữ nhật, em ước lượng chiều dài và chiều rộng, rồi nhân hai số đó.',
        },
        {
          type: 'p',
          text: 'Ví dụ: nền lớp học dài khoảng 8 m, rộng khoảng 6 m. Diện tích khoảng 8 × 6 = 48 (m²), tức là khoảng 50 m².',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Một bước chân của em dài khoảng nửa mét. Hai bước chân là khoảng 1 m.',
        },
      ],
    },
    {
      heading: 'Dự án: Đo và lát nền lớp học',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em ước lượng, đo và tính diện tích cửa lớp và nền lớp học của em, rồi tính số viên gạch cần để lát nền.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: thước dây hoặc thước mét, giấy, bút, một bảng ghi kết quả.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng chiều dài, chiều rộng của cửa lớp và nền lớp học. Ghi số ước lượng vào bảng.',
            'Cùng bạn đo bằng thước dây. Làm tròn số đo đến mét hoặc đề-xi-mét.',
            'Tính diện tích cửa lớp và nền lớp học. Đổi ra đơn vị phù hợp.',
            'So sánh số đo với số ước lượng: em ước lượng sát chưa?',
            'Đếm hoặc đo một viên gạch lát nền. Tính xem nền lớp cần khoảng bao nhiêu viên gạch.',
          ],
        },
        {
          type: 'table',
          head: ['Em đo', 'Chiều dài', 'Chiều rộng', 'Diện tích'],
          rows: [
            ['Cửa lớp', '… m', '… m', '… m²'],
            ['Nền lớp học', '… m', '… m', '… m²'],
          ],
          caption: 'Bảng ghi kết quả đo',
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: số ước lượng, số đo thật, diện tích tính được và số viên gạch cần. Nhóm nào ước lượng sát nhất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử thách ước lượng diện tích',
    instruction:
      'Em chọn một ước lượng cho từng vật, từng nơi. Sau đó em xem chiều dài, chiều rộng thật và phép tính để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Nền lớp học của Rô-bốt là hình chữ nhật dài 650 cm, rộng 400 cm. Người ta lát nền bằng gạch hình vuông cạnh 50 cm. Cần bao nhiêu viên gạch?',
      steps: [
        'Diện tích nền lớp: 650 × 400 = 260 000 (cm²).',
        'Diện tích một viên gạch: 50 × 50 = 2 500 (cm²).',
        'Số viên gạch: 260 000 : 2 500 = 104 (viên).',
      ],
      answer: 'Cần 104 viên gạch.',
    },
    {
      problem:
        'Gạch được bán theo hộp, mỗi hộp 4 viên, giá 120 000 đồng. Mua đủ 104 viên hết bao nhiêu tiền?',
      steps: ['Số hộp gạch: 104 : 4 = 26 (hộp).', 'Số tiền: 120 000 × 26 = 3 120 000 (đồng).'],
      answer: 'Hết 3 120 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi vật, mỗi nơi với diện tích phù hợp.',
      left: ['Con tem', 'Mặt bàn học', 'Nền lớp học', 'Sân trường'],
      right: ['6 cm²', '60 dm²', '50 m²', '2 000 m²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Vật càng to thì số đo càng lớn hoặc đơn vị càng lớn.'],
      solution: 'Con tem 6 cm². Mặt bàn học 60 dm². Nền lớp học 50 m². Sân trường 2 000 m².',
    },
    {
      type: 'choice',
      prompt: 'Một vườn cà phê rộng 3 … Em chọn đơn vị phù hợp.',
      options: ['ha', 'm²', 'dm²', 'cm²'],
      answer: 0,
      hints: ['Vườn cà phê rất rộng, đo ruộng vườn người ta hay dùng đơn vị nào?'],
      solution: 'Vườn cà phê rộng 3 ha, tức là 30 000 m².',
    },
    {
      type: 'number',
      prompt:
        'Nền lớp học dài 650 cm, rộng 400 cm. Diện tích nền lớp là bao nhiêu xăng-ti-mét vuông?',
      answer: 260000,
      unit: 'cm²',
      hints: ['Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.'],
      solution: '650 × 400 = 260 000. Diện tích nền lớp là 260 000 cm².',
    },
    {
      type: 'number',
      prompt: '260 000 cm² = ? m²',
      answer: 26,
      unit: 'm²',
      hints: ['1 m² = 100 dm² = 10 000 cm².'],
      solution: '260 000 : 10 000 = 26. Vậy 260 000 cm² = 26 m².',
    },
    {
      type: 'number',
      prompt:
        'Viên gạch hình vuông cạnh 50 cm. Diện tích viên gạch là bao nhiêu xăng-ti-mét vuông?',
      answer: 2500,
      unit: 'cm²',
      hints: ['Diện tích hình vuông bằng cạnh nhân cạnh.'],
      solution: '50 × 50 = 2 500. Diện tích viên gạch là 2 500 cm².',
    },
    {
      type: 'number',
      prompt:
        'Lát nền rộng 260 000 cm² bằng gạch 2 500 cm² một viên. Mỗi hộp có 4 viên. Cần mua bao nhiêu hộp gạch?',
      answer: 26,
      unit: 'hộp',
      hints: ['Tìm số viên gạch trước: 260 000 : 2 500.', 'Rồi chia số viên cho 4.'],
      solution: '260 000 : 2 500 = 104 (viên). 104 : 4 = 26 (hộp).',
    },
    {
      type: 'number',
      prompt:
        'Lát một phòng học hết 3 120 000 đồng. Trường còn 24 phòng học khác rộng bằng thế. Lát cả 24 phòng đó hết bao nhiêu đồng?',
      answer: 74880000,
      unit: 'đồng',
      hints: ['Mỗi phòng hết 3 120 000 đồng, có 24 phòng.'],
      solution: '3 120 000 × 24 = 74 880 000. Lát 24 phòng hết 74 880 000 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Nam ước lượng sân trường dài 50 m, rộng 40 m. Diện tích sân khoảng bao nhiêu?',
      options: ['2 000 m²', '200 m²', '90 m²', '20 000 m²'],
      answer: 0,
      hints: ['Nhân chiều dài với chiều rộng, đừng cộng.'],
      solution: '50 × 40 = 2 000. Sân trường rộng khoảng 2 000 m².',
    },
  ],
  takeaways: [
    'Vật nhỏ đo bằng mm², cm²; nền nhà, sân đo bằng m²; ruộng vườn đo bằng ha; thành phố đo bằng km².',
    'Ước lượng chiều dài, chiều rộng rồi nhân để ước lượng diện tích; đo và tính để kiểm tra.',
  ],
};
