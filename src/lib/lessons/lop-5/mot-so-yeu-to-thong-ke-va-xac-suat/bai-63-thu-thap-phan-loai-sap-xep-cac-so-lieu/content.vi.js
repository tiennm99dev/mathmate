/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thu thập số liệu rồi ghi thành dãy số liệu, phân loại các số liệu theo nhóm vào bảng số liệu và sắp xếp dãy số liệu theo thứ tự từ bé đến lớn hoặc từ lớn đến bé.',
  intro:
    'Mai hỏi các bạn nữ trong lớp: "Bạn chấm chuyến cắm trại mấy điểm?" rồi ghi lại các câu trả lời. Làm sao để biết nhanh có bao nhiêu bạn rất hài lòng? Em cùng phân loại và sắp xếp số liệu nhé!',
  objectives: [
    'Thu thập số liệu và ghi lại thành dãy số liệu.',
    'Phân loại số liệu theo nhóm và lập bảng số liệu.',
    'Sắp xếp dãy số liệu theo thứ tự rồi trả lời câu hỏi.',
  ],
  sections: [
    {
      heading: 'Thu thập số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Mai khảo sát mức độ hài lòng của các bạn nữ trong lớp với chuyến đi cắm trại. Mỗi bạn cho một số điểm theo quy ước sau.',
        },
        {
          type: 'table',
          head: ['Mức độ hài lòng', 'Số điểm'],
          rows: [
            ['Rất hài lòng', '5'],
            ['Hài lòng', '4'],
            ['Bình thường', '3'],
            ['Không hài lòng một số mặt', '2'],
            ['Hoàn toàn không hài lòng', '1'],
          ],
        },
        {
          type: 'p',
          text: 'Mai ghi lại kết quả thành dãy số liệu (đơn vị: điểm): 3; 5; 5; 4; 4; 3; 5; 4; 3; 5; 5; 4; 3; 3; 4; 4; 4.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hỏi, đếm, đo rồi ghi lại kết quả là thu thập số liệu. Các kết quả ghi lần lượt tạo thành một dãy số liệu.',
        },
      ],
    },
    {
      heading: 'Phân loại số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Em xếp mỗi số liệu vào đúng nhóm của nó, rồi đếm số số liệu trong mỗi nhóm.',
        },
        {
          type: 'table',
          caption: 'Bảng số liệu về mức độ hài lòng',
          head: ['Số điểm', '5', '4', '3', '2', '1'],
          rows: [['Số bạn', '5', '7', '5', '0', '0']],
        },
        {
          type: 'p',
          text: 'Kiểm tra: 5 + 7 + 5 + 0 + 0 = 17, đúng bằng số bạn được hỏi.',
        },
        {
          type: 'p',
          text: 'Nhìn bảng, em thấy ngay: có 5 bạn rất hài lòng, số điểm 4 xuất hiện nhiều nhất và không có bạn nào hoàn toàn không hài lòng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phân loại số liệu theo nhóm và ghi vào bảng số liệu giúp em đọc và so sánh số liệu nhanh hơn.',
        },
      ],
    },
    {
      heading: 'Sắp xếp số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Thành tích nhảy xa của một nhóm học viên: 2,45 m; 3 m; 3,05 m; 2,3 m; 2,75 m; 2,5 m; 2,05 m; 2,2 m; 3 m; 2,8 m.',
        },
        {
          type: 'p',
          text: 'Sắp xếp theo thứ tự từ bé đến lớn: 2,05 m; 2,2 m; 2,3 m; 2,45 m; 2,5 m; 2,75 m; 2,8 m; 3 m; 3 m; 3,05 m.',
        },
        {
          type: 'table',
          caption: 'Bảng số liệu về thành tích nhảy xa',
          head: ['Thành tích', 'Số học viên'],
          rows: [
            ['Dưới 2,4 m', '3'],
            ['Từ 2,4 m đến dưới 2,8 m', '3'],
            ['Từ 2,8 m trở lên', '4'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Sắp xếp dãy số liệu trước thì các số cùng nhóm đứng cạnh nhau. Em phân loại nhanh hơn và thấy ngay số bé nhất, số lớn nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phân loại và sắp xếp số liệu',
    instruction:
      'Em chọn một dãy số liệu. Bấm "Từ bé đến lớn" hoặc "Từ lớn đến bé" để sắp xếp dãy. Số có khung xanh là số đang xét: em chạm vào nhóm của số đó trong bảng. Bảng tự đếm số liệu của mỗi nhóm.',
  },
  examples: [
    {
      problem:
        'Dãy số liệu (đơn vị: điểm): 3; 5; 5; 4; 4; 3; 5; 4; 3; 5; 5; 4; 3; 3; 4; 4; 4. Có bao nhiêu bạn rất hài lòng? Số điểm nào xuất hiện nhiều nhất?',
      steps: [
        'Rất hài lòng là 5 điểm. Đếm các số 5 trong dãy: có 5 số.',
        'Đếm các số 4: có 7 số. Đếm các số 3: có 5 số.',
        'So sánh 5, 7 và 5: số 7 lớn nhất, ứng với 4 điểm.',
      ],
      answer: 'Có 5 bạn rất hài lòng. Số điểm 4 xuất hiện nhiều nhất.',
    },
    {
      problem:
        'Học viên nhảy dưới 2 m 40 cm phải nhảy thêm một lần nữa. Với thành tích ở trên, có bao nhiêu học viên phải nhảy lần thứ hai?',
      steps: [
        'Đổi: 2 m 40 cm = 2,4 m.',
        'Sắp xếp dãy từ bé đến lớn: 2,05 m; 2,2 m; 2,3 m; 2,45 m; …',
        'Các số bé hơn 2,4 m là 2,05 m; 2,2 m; 2,3 m: có 3 số.',
      ],
      answer: 'Có 3 học viên phải nhảy lần thứ hai.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Dãy điểm hài lòng: 3; 5; 5; 4; 4; 3; 5; 4; 3; 5; 5; 4; 3; 3; 4; 4; 4. Có bao nhiêu bạn cho 3 điểm?',
      answer: 5,
      unit: 'bạn',
      hints: ['Em đếm các số 3 trong dãy.', 'Gạch một vạch cho mỗi số 3 em gặp.'],
      solution: 'Các số 3 đứng ở vị trí thứ 1, 6, 9, 13 và 14. Có 5 bạn cho 3 điểm.',
    },
    {
      type: 'choice',
      prompt:
        'Bảng số liệu: 5 điểm có 5 bạn, 4 điểm có 7 bạn, 3 điểm có 5 bạn, 2 điểm và 1 điểm không có bạn nào. Có bạn nào hoàn toàn không hài lòng không?',
      options: ['Có 1 bạn', 'Không có bạn nào', 'Có 5 bạn'],
      answer: 1,
      hints: ['Hoàn toàn không hài lòng là 1 điểm.'],
      solution: 'Hoàn toàn không hài lòng là 1 điểm. Số bạn cho 1 điểm là 0, nên không có bạn nào.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp độ dài bàn chân theo thứ tự từ bé đến lớn.',
      items: ['21 cm', '20 cm', '22 cm', '21,5 cm'],
      answer: [1, 0, 3, 2],
      hints: ['So sánh phần nguyên trước: 20 < 21 < 22.', '21 cm và 21,5 cm: số nào lớn hơn?'],
      solution: '20 cm < 21 cm < 21,5 cm < 22 cm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi thành tích nhảy xa với nhóm của nó.',
      left: ['2,05 m', '2,5 m', '3,05 m'],
      right: ['Dưới 2,4 m', 'Từ 2,4 m đến dưới 2,8 m', 'Từ 2,8 m trở lên'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['So sánh mỗi số với 2,4 m và 2,8 m.'],
      solution: '2,05 m < 2,4 m. 2,4 m < 2,5 m < 2,8 m. 3,05 m > 2,8 m.',
    },
    {
      type: 'number',
      prompt:
        'Thành tích nhảy xa: 2,45 m; 3 m; 3,05 m; 2,3 m; 2,75 m; 2,5 m; 2,05 m; 2,2 m; 3 m; 2,8 m. Có bao nhiêu học viên nhảy được từ 3 m trở lên?',
      answer: 3,
      unit: 'học viên',
      hints: ['Tìm các số lớn hơn hoặc bằng 3 m.'],
      solution: 'Các số từ 3 m trở lên là 3 m; 3,05 m; 3 m. Có 3 học viên.',
    },
    {
      type: 'number',
      prompt:
        'Với dãy thành tích nhảy xa ở trên, thành tích cao nhất hơn thành tích thấp nhất bao nhiêu mét?',
      answer: 1,
      unit: 'm',
      hints: ['Sắp xếp dãy để tìm số lớn nhất và số bé nhất.', 'Lấy số lớn nhất trừ số bé nhất.'],
      solution: 'Cao nhất là 3,05 m, thấp nhất là 2,05 m. 3,05 − 2,05 = 1 (m).',
    },
    {
      type: 'choice',
      prompt: 'Dãy nào đã được sắp xếp theo thứ tự từ lớn đến bé?',
      options: [
        '3,05; 3; 2,8; 2,75',
        '2,75; 2,8; 3; 3,05',
        '3; 3,05; 2,8; 2,75',
        '3,05; 2,8; 3; 2,75',
      ],
      answer: 0,
      hints: ['Số đứng đầu phải là số lớn nhất.', 'Mỗi số đứng sau phải bé hơn số đứng trước.'],
      solution: 'Dãy 3,05; 3; 2,8; 2,75 có mỗi số bé hơn số đứng trước nó.',
    },
    {
      type: 'number',
      prompt:
        'Độ dài bàn chân các bạn tổ 1: 21 cm; 20 cm; 21 cm; 22 cm; 21 cm; 21,5 cm; 20 cm; 21,5 cm. Tổ 1 có bao nhiêu bạn có bàn chân dài 21 cm?',
      answer: 3,
      unit: 'bạn',
      hints: ['Đếm các số 21 cm. Cẩn thận: 21,5 cm khác 21 cm.'],
      solution: 'Các số 21 cm đứng ở vị trí thứ 1, 3 và 5. Có 3 bạn.',
    },
  ],
  takeaways: [
    'Thu thập số liệu: hỏi, đếm, đo rồi ghi lại thành dãy số liệu.',
    'Phân loại: xếp mỗi số liệu vào đúng nhóm, đếm rồi ghi vào bảng số liệu.',
    'Sắp xếp dãy số liệu từ bé đến lớn hoặc từ lớn đến bé để so sánh nhanh.',
  ],
};
