/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành khảo sát thực tế: thu thập số liệu bằng phiếu khảo sát, kiểm đếm, lập bảng số liệu, vẽ biểu đồ cột và biểu đồ hình quạt tròn, rồi phân tích kết quả.',
  intro:
    'Sắp hết năm cuối cấp Tiểu học rồi! Điều gì khiến các bạn nhớ nhất ở trường? Em cùng làm một cuộc khảo sát, ghi số liệu vào bảng và vẽ biểu đồ nhé.',
  objectives: [
    'Thu thập số liệu bằng phiếu khảo sát và bảng kiểm đếm.',
    'Lập bảng số liệu, vẽ biểu đồ cột và đọc biểu đồ hình quạt tròn.',
    'Phân tích số liệu: tìm câu trả lời được chọn nhiều nhất, tỉ số, điểm trung bình.',
  ],
  sections: [
    {
      heading: 'Thu thập và phân loại số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Cả lớp dọn dẹp phòng học. Mỗi bạn gieo xúc xắc 1 lần, mặt xúc xắc cho biết bạn vào nhóm nào. Lớp ghi lại số bạn mỗi nhóm vào bảng.',
        },
        {
          type: 'p',
          text: 'Lớp làm dự án "Đổi đồ cũ lấy cây xanh". Các đồ vật được đổi như sau.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Đổi được'],
          rows: [
            ['2 chiếc áo', '1 cây cà chua'],
            ['1 chiếc quần dài', '1 cây chà là'],
            ['2 quyển lịch cũ', '1 cây bơ'],
          ],
        },
        {
          type: 'p',
          text: 'Lớp quyên góp được 24 chiếc áo, 10 chiếc quần dài và 12 quyển lịch. Số cây đổi được: cà chua 24 : 2 = 12 (cây), chà là 10 : 1 = 10 (cây), bơ 12 : 2 = 6 (cây).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khảo sát gồm các bước: đặt câu hỏi, thu thập số liệu, phân loại và ghi vào bảng, biểu diễn bằng biểu đồ, rồi phân tích kết quả.',
        },
      ],
    },
    {
      heading: 'Phân tích và biểu diễn số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Nhóm em chấm điểm mức độ hài lòng với trường: 5 điểm là rất hài lòng, 1 điểm là hoàn toàn không hài lòng.',
        },
        {
          type: 'table',
          caption: 'Bảng số liệu về mức độ hài lòng',
          head: ['Số điểm', '1', '2', '3', '4', '5'],
          rows: [['Số bạn', '0', '1', '2', '8', '5']],
        },
        {
          type: 'p',
          text: 'Số bạn trong nhóm: 0 + 1 + 2 + 8 + 5 = 16 (bạn). Điểm 4 xuất hiện nhiều nhất.',
        },
        {
          type: 'p',
          text: 'Điểm trung bình: (2 × 1 + 3 × 2 + 4 × 8 + 5 × 5) : 16 = 65 : 16 = 4,0625 (điểm).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn biểu đồ',
          text: 'Biểu đồ cột giúp so sánh số lượng của các phần. Biểu đồ hình quạt tròn cho thấy mỗi phần chiếm bao nhiêu phần trăm của tổng số.',
        },
      ],
    },
    {
      heading: 'Dự án: Khảo sát lớp em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu điều các bạn trong lớp nhớ nhất ở trường tiểu học (hoặc một câu hỏi em chọn).',
        },
        {
          type: 'list',
          items: [
            'Phiếu khảo sát (mỗi bạn một phiếu).',
            'Giấy kẻ ô, bút chì, bút màu.',
            'Thước kẻ.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết câu hỏi và các câu trả lời để chọn: thầy cô, bạn bè, sân trường, thư viện, các buổi dã ngoại.',
            'Phát phiếu cho các bạn, thu lại và kiểm đếm số phiếu của mỗi câu trả lời.',
            'Lập bảng số liệu. Kiểm tra: tổng số phiếu bằng số bạn được hỏi.',
            'Vẽ biểu đồ cột. Dùng phiếu khảo sát ở trên trang để xem biểu đồ hình quạt tròn.',
            'Tìm câu trả lời được chọn nhiều nhất và viết tỉ số của số phiếu đó so với tổng số phiếu.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: trình bày bảng số liệu, biểu đồ và một câu nhận xét, ví dụ: "Thầy cô được chọn nhiều nhất, 9 trong 25 phiếu, chiếm 36%."',
        },
      ],
    },
  ],
  explore: {
    title: 'Phiếu khảo sát',
    instruction:
      'Em chọn một cuộc khảo sát. Mỗi khi một bạn trả lời, em bấm nút + ở câu trả lời đó (bấm − nếu ghi nhầm). Bảng kiểm đếm, biểu đồ cột và biểu đồ hình quạt tròn tự vẽ lại. Bấm "Xoá hết để tự khảo sát" để ghi số liệu của lớp em.',
  },
  examples: [
    {
      problem:
        'Lớp 5A hỏi 25 bạn điều nhớ nhất ở trường: thầy cô 9 phiếu, bạn bè 7, sân trường 3, thư viện 2, các buổi dã ngoại 4. Điều gì được nhiều bạn nhớ nhất? Chiếm bao nhiêu phần trăm?',
      steps: [
        'Kiểm tra: 9 + 7 + 3 + 2 + 4 = 25 (phiếu).',
        'So sánh: 9 lớn nhất, nên thầy cô được nhớ nhất.',
        'Tỉ số phần trăm: 9 : 25 = 0,36 = 36%.',
      ],
      answer: 'Thầy cô được nhiều bạn nhớ nhất, chiếm 36% số phiếu.',
    },
    {
      problem:
        'Lớp quyên góp được 24 chiếc áo và 12 quyển lịch cũ. Cứ 2 chiếc áo đổi được 1 cây cà chua, 2 quyển lịch đổi được 1 cây bơ. Lớp đổi được bao nhiêu cây mỗi loại?',
      steps: ['Số cây cà chua: 24 : 2 = 12 (cây).', 'Số cây bơ: 12 : 2 = 6 (cây).'],
      answer: 'Lớp đổi được 12 cây cà chua và 6 cây bơ.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Cứ 2 chiếc áo đổi được 1 cây cà chua. Lớp có 24 chiếc áo thì đổi được bao nhiêu cây cà chua?',
      answer: 12,
      unit: 'cây',
      hints: ['Chia số áo cho 2.'],
      solution: '24 : 2 = 12 (cây).',
    },
    {
      type: 'choice',
      prompt:
        'Kết quả khảo sát: thầy cô 9 phiếu, bạn bè 7, sân trường 3, thư viện 2, dã ngoại 4. Điều gì được nhiều bạn nhớ nhất?',
      options: ['Thầy cô', 'Bạn bè', 'Các buổi dã ngoại', 'Thư viện'],
      answer: 0,
      hints: ['Tìm số phiếu lớn nhất.'],
      solution: '9 là số phiếu lớn nhất, của thầy cô.',
    },
    {
      type: 'number',
      prompt: 'Với kết quả khảo sát ở trên (25 phiếu), thầy cô chiếm bao nhiêu phần trăm số phiếu?',
      answer: 36,
      unit: '%',
      hints: ['Tính 9 : 25 rồi nhân với 100.'],
      solution: '9 : 25 = 0,36 = 36%.',
    },
    {
      type: 'number',
      prompt:
        'Nhóm em chấm điểm hài lòng: 2 điểm có 1 bạn, 3 điểm có 2 bạn, 4 điểm có 8 bạn, 5 điểm có 5 bạn. Tính điểm trung bình của nhóm.',
      answer: 4.0625,
      unit: 'điểm',
      hints: [
        'Tổng số bạn: 1 + 2 + 8 + 5.',
        'Tổng số điểm: 2 × 1 + 3 × 2 + 4 × 8 + 5 × 5. Chia cho số bạn.',
      ],
      solution:
        'Số bạn: 16. Tổng điểm: 2 + 6 + 32 + 25 = 65. Điểm trung bình: 65 : 16 = 4,0625 (điểm).',
    },
    {
      type: 'fraction',
      prompt:
        'Cả lớp 28 bạn, mỗi bạn gieo xúc xắc 1 lần. Có 5 bạn gieo được mặt 1 chấm. Viết tỉ số mô tả số lần xuất hiện mặt 1 chấm so với tổng số lần gieo.',
      answer: [5, 28],
      hints: ['Mỗi bạn gieo 1 lần, nên có 28 lần gieo.'],
      solution: 'Tỉ số là 5 : 28 hay $\\dfrac{5}{28}$.',
    },
    {
      type: 'choice',
      prompt:
        'Em muốn cho thấy mỗi câu trả lời chiếm bao nhiêu phần trăm số phiếu. Em nên dùng biểu đồ nào?',
      options: ['Biểu đồ hình quạt tròn', 'Bảng kiểm đếm', 'Dãy số liệu'],
      answer: 0,
      hints: ['Biểu đồ nào ghi tỉ số phần trăm của từng phần?'],
      solution: 'Biểu đồ hình quạt tròn cho thấy mỗi phần chiếm bao nhiêu phần trăm của tổng số.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước làm một cuộc khảo sát.',
      items: [
        'Thu thập số liệu',
        'Đặt câu hỏi khảo sát',
        'Phân tích, nhận xét',
        'Lập bảng, vẽ biểu đồ',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Bước đầu tiên là biết mình muốn hỏi gì.'],
      solution:
        'Đặt câu hỏi khảo sát → thu thập số liệu → lập bảng, vẽ biểu đồ → phân tích, nhận xét.',
    },
  ],
  takeaways: [
    'Khảo sát: đặt câu hỏi, thu thập, phân loại, lập bảng, vẽ biểu đồ, phân tích.',
    'Kiểm tra tổng số phiếu bằng số bạn được hỏi.',
    'Biểu đồ cột để so sánh số lượng, biểu đồ hình quạt tròn để xem tỉ số phần trăm.',
  ],
};
