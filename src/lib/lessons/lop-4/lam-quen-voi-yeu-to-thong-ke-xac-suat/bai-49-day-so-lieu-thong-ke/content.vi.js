/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dãy số liệu thống kê: các số liệu ghi lại theo thứ tự. Đọc dãy số liệu (có bao nhiêu số, số thứ mấy là số nào, số lớn nhất, bé nhất) và sắp xếp dãy từ bé đến lớn, từ lớn đến bé.',
  intro:
    'Mỗi sáng từ thứ Hai đến thứ Sáu, Rô-bốt đạp xe quanh công viên rồi ghi lại quãng đường đã đi: 1, 2, 2, 2, 3 (km). Các số đó cho em biết điều gì? Cùng tìm hiểu dãy số liệu nhé!',
  objectives: [
    'Nhận biết dãy số liệu thống kê.',
    'Đọc dãy số liệu: có bao nhiêu số, số thứ mấy là số nào, số lớn nhất, số bé nhất.',
    'Sắp xếp dãy số liệu theo thứ tự từ bé đến lớn, từ lớn đến bé.',
  ],
  sections: [
    {
      heading: 'Dãy số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Rô-bốt ghi quãng đường đạp xe (km) từ thứ Hai đến thứ Sáu thành một dãy: 1, 2, 2, 2, 3.',
        },
        {
          type: 'table',
          caption: 'Quãng đường Rô-bốt đạp xe mỗi buổi sáng (km)',
          head: ['Ngày', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
          rows: [['Quãng đường', '1', '2', '2', '2', '3']],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Các số liệu được ghi lại lần lượt như 1, 2, 2, 2, 3 tạo thành một dãy số liệu thống kê.',
        },
        {
          type: 'p',
          text: 'Số thứ nhất là 1, số thứ hai là 2, số thứ ba là 2, số thứ tư là 2, số thứ năm là 3. Dãy có 5 số.',
        },
      ],
    },
    {
      heading: 'Đọc dãy số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Thứ Hai Rô-bốt đi 1 km. Thứ Ba, thứ Tư, thứ Năm mỗi ngày đi 2 km. Thứ Sáu đi 3 km.',
        },
        {
          type: 'p',
          text: 'Quãng đường dài nhất trong một buổi là 3 km, ngắn nhất là 1 km.',
        },
        {
          type: 'p',
          text: 'Trung bình mỗi buổi Rô-bốt đi: (1 + 2 + 2 + 2 + 3) : 5 = 2 (km).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc dãy số liệu: đếm xem dãy có bao nhiêu số, tìm số thứ nhất, thứ hai, …, so sánh để tìm số lớn nhất, số bé nhất.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số giống nhau vẫn đếm đủ. Dãy 1, 2, 2, 2, 3 có 5 số, không phải 3 số.',
        },
      ],
    },
    {
      heading: 'Sắp xếp dãy số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Năm bạn ghi số cuốn sách đã đọc trong tháng: 5, 13, 1, 8, 4.',
        },
        {
          type: 'table',
          caption: 'Sắp xếp dãy 5, 13, 1, 8, 4',
          head: ['Thứ tự', 'Dãy số liệu'],
          rows: [
            ['Từ bé đến lớn', '1, 4, 5, 8, 13'],
            ['Từ lớn đến bé', '13, 8, 5, 4, 1'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Xếp từ bé đến lớn thì số bé nhất đứng đầu, số lớn nhất đứng cuối. Nhờ vậy em tìm nhanh số lớn nhất, số bé nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sắp xếp dãy số liệu',
    instruction:
      'Em chọn một dãy số liệu, hoặc tự nhập dãy của em. Kéo các số đổi chỗ, hoặc chạm hai số để đổi chỗ chúng, cho đến khi dãy đúng thứ tự. Rồi em trả lời câu hỏi về dãy.',
  },
  examples: [
    {
      problem:
        'Trong giải bóng đá khối Bốn, Nam, Việt, Rô-bốt và Dũng lần lượt ghi được số bàn thắng: 7, 6, 2, 4. Dũng ghi được bao nhiêu bàn? Số bàn nhiều nhất một bạn ghi được là bao nhiêu? Có bao nhiêu bạn ghi được nhiều hơn 5 bàn?',
      steps: [
        'Dũng đứng thứ tư, số thứ tư của dãy là 4. Dũng ghi được 4 bàn.',
        'So sánh 7, 6, 2, 4: số lớn nhất là 7. Số bàn nhiều nhất là 7 bàn.',
        'Các số lớn hơn 5 là 7 và 6. Có 2 bạn.',
      ],
      answer: 'Dũng ghi 4 bàn. Nhiều nhất là 7 bàn. Có 2 bạn ghi nhiều hơn 5 bàn.',
    },
    {
      problem:
        'Rô-bốt ghi số chữ cái trong tên các bạn tổ 1: 4, 3, 2, 3, 4, 5, 3, 5. Dãy có bao nhiêu số? Tên dài nhất có mấy chữ cái? Tổ 1 có bạn nào tên Nguyệt không?',
      steps: [
        'Đếm các số trong dãy: có 8 số, số đầu tiên là 4.',
        'Số lớn nhất là 5, số bé nhất là 2. Tên dài nhất có 5 chữ cái.',
        'Tên Nguyệt có 6 chữ cái: N, g, u, y, ệ, t. Dãy không có số 6.',
      ],
      answer: 'Dãy có 8 số. Tên dài nhất có 5 chữ cái. Tổ 1 không có bạn nào tên Nguyệt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Nam, Việt, Rô-bốt và Dũng lần lượt ghi được số bàn thắng: 7, 6, 2, 4. Rô-bốt ghi được mấy bàn?',
      options: ['2', '7', '6', '4'],
      answer: 0,
      hints: ['Rô-bốt đứng thứ ba trong danh sách.', 'Em tìm số thứ ba của dãy.'],
      solution: 'Số thứ ba của dãy 7, 6, 2, 4 là 2. Rô-bốt ghi được 2 bàn.',
    },
    {
      type: 'number',
      prompt: 'Dãy số bàn thắng: 7, 6, 2, 4. Có bao nhiêu bạn ghi được nhiều hơn 5 bàn?',
      answer: 2,
      unit: 'bạn',
      hints: ['Em tìm các số lớn hơn 5 trong dãy rồi đếm.'],
      solution: 'Các số lớn hơn 5 là 7 và 6. Có 2 bạn ghi được nhiều hơn 5 bàn.',
    },
    {
      type: 'order',
      prompt: 'Số cuốn sách năm bạn đã đọc: 5, 13, 1, 8, 4. Sắp xếp dãy theo thứ tự từ bé đến lớn.',
      items: ['5', '13', '1', '8', '4'],
      answer: [2, 4, 0, 3, 1],
      hints: ['Em tìm số bé nhất, đặt lên đầu.', 'Số bé nhất là 1, tiếp theo là 4.'],
      solution: 'Từ bé đến lớn: 1, 4, 5, 8, 13.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp dãy 5, 13, 1, 8, 4 theo thứ tự từ lớn đến bé.',
      items: ['5', '13', '1', '8', '4'],
      answer: [1, 3, 0, 4, 2],
      hints: ['Em tìm số lớn nhất, đặt lên đầu.'],
      solution: 'Từ lớn đến bé: 13, 8, 5, 4, 1.',
    },
    {
      type: 'number',
      prompt:
        'Việt ghi số quả dâu tây hái được mỗi ngày: 2, 3, 4, 5, 7, 8, 10, 13. Việt đã hái dâu tây trong bao nhiêu ngày?',
      answer: 8,
      unit: 'ngày',
      hints: ['Mỗi ngày Việt ghi một số. Em đếm xem dãy có bao nhiêu số.'],
      solution: 'Dãy 2, 3, 4, 5, 7, 8, 10, 13 có 8 số. Việt hái dâu tây trong 8 ngày.',
    },
    {
      type: 'choice',
      prompt:
        'Dãy số quả dâu tây hái mỗi ngày: 2, 3, 4, 5, 7, 8, 10, 13. Số quả hái được thay đổi thế nào sau mỗi ngày?',
      options: ['Tăng sau mỗi ngày', 'Giảm sau mỗi ngày', 'Không thay đổi'],
      answer: 0,
      hints: ['Em so sánh mỗi số với số đứng ngay trước nó.'],
      solution: '2 < 3 < 4 < 5 < 7 < 8 < 10 < 13. Số quả hái được tăng sau mỗi ngày.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian tập thể dục mỗi ngày của các thành viên gia đình Mai: 20 phút, 40 phút, 10 phút, 50 phút, 30 phút. Trung bình mỗi người tập bao nhiêu phút?',
      answer: 30,
      unit: 'phút',
      hints: ['Dãy có 5 số, tức là gia đình Mai có 5 người.', 'Em cộng 5 số rồi chia cho 5.'],
      solution: '(20 + 40 + 10 + 50 + 30) : 5 = 150 : 5 = 30 (phút).',
    },
    {
      type: 'choice',
      prompt:
        'Nam khảo sát số giờ ngủ mỗi ngày của 7 bạn: 9, 12, 7, 10, 9, 8, 8. Trẻ từ 6 đến 12 tuổi cần ngủ từ 9 giờ đến 12 giờ. Có bao nhiêu bạn ngủ đủ giờ?',
      options: ['4 bạn', '2 bạn', '3 bạn', '7 bạn'],
      answer: 0,
      hints: ['Ngủ đủ giờ là ngủ từ 9 giờ đến 12 giờ: số 9 và số 12 cũng tính.'],
      solution: 'Các số từ 9 đến 12 là 9, 12, 10, 9. Có 4 bạn ngủ đủ giờ.',
    },
    {
      type: 'choice',
      prompt:
        'Số chữ cái trong tên các bạn tổ 1: 4, 3, 2, 3, 4, 5, 3, 5. Tổ 1 có bạn nào tên Nguyệt (6 chữ cái) không?',
      options: ['Không, vì dãy không có số 6', 'Có, vì dãy có 8 số', 'Có, vì dãy có số 5'],
      answer: 0,
      hints: ['Nếu có bạn tên Nguyệt thì trong dãy phải có số nào?'],
      solution: 'Tên Nguyệt có 6 chữ cái, mà dãy không có số 6. Tổ 1 không có bạn nào tên Nguyệt.',
    },
    {
      type: 'number',
      prompt: 'Trong dãy số liệu 4, 3, 2, 3, 4, 5, 3, 5, số 3 xuất hiện mấy lần?',
      answer: 3,
      unit: 'lần',
      hints: ['Em đi qua từng số của dãy, gặp số 3 thì đếm.'],
      solution: 'Số 3 đứng ở vị trí thứ hai, thứ tư và thứ bảy. Số 3 xuất hiện 3 lần.',
    },
  ],
  takeaways: [
    'Các số liệu ghi lại lần lượt tạo thành dãy số liệu thống kê.',
    'Đọc dãy: có bao nhiêu số, số thứ mấy là số nào, số lớn nhất, số bé nhất.',
    'Sắp xếp dãy từ bé đến lớn hoặc từ lớn đến bé để so sánh dễ hơn.',
  ],
};
