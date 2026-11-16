/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân một số thập phân với 10; 100; 1 000;... hoặc chia cho 0,1; 0,01; 0,001;... thì chuyển dấu phẩy sang phải; nhân với 0,1; 0,01; 0,001;... hoặc chia cho 10; 100; 1 000;... thì chuyển dấu phẩy sang trái.',
  intro:
    'Một gói kẹo nặng 0,25 kg. 100 gói như thế nặng bao nhiêu? Em không cần đặt tính: chỉ cần dời dấu phẩy. Em cùng tìm hiểu nhé.',
  objectives: [
    'Nhân, chia nhẩm được một số thập phân với 10; 100; 1 000;...',
    'Nhân, chia nhẩm được một số thập phân với 0,1; 0,01; 0,001;...',
    'Vận dụng để đổi đơn vị đo và giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhân, chia với 10; 100; 1 000;...',
      blocks: [
        {
          type: 'p',
          text: 'Tính 5,73 × 10. Nhân như số tự nhiên: 573 × 10 = 5 730, tách hai chữ số được 57,30 = 57,3. Dấu phẩy của 5,73 đã chuyển sang phải một chữ số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân một số thập phân với 10; 100; 1 000;... em chỉ việc chuyển dấu phẩy của số đó lần lượt sang bên phải một, hai, ba,... chữ số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia một số thập phân cho 10; 100; 1 000;... em chỉ việc chuyển dấu phẩy của số đó lần lượt sang bên trái một, hai, ba,... chữ số.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Dấu phẩy', 'Kết quả'],
          rows: [
            ['5,73 × 10', 'sang phải 1 chữ số', '57,3'],
            ['4,321 × 100', 'sang phải 2 chữ số', '432,1'],
            ['86,5 : 10', 'sang trái 1 chữ số', '8,65'],
            ['31,4 : 100', 'sang trái 2 chữ số', '0,314'],
          ],
        },
      ],
    },
    {
      heading: 'Nhân, chia với 0,1; 0,01; 0,001;...',
      blocks: [
        {
          type: 'p',
          text: 'Tính 4,3 × 0,01. Nhân như số tự nhiên: 43 × 1 = 43, tách ba chữ số được 0,043. Dấu phẩy của 4,3 đã chuyển sang trái hai chữ số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân một số thập phân với 0,1; 0,01; 0,001;... em chỉ việc chuyển dấu phẩy của số đó lần lượt sang bên trái một, hai, ba,... chữ số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn chia một số thập phân cho 0,1; 0,01; 0,001;... em chỉ việc chuyển dấu phẩy của số đó lần lượt sang bên phải một, hai, ba,... chữ số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Thiếu chữ số thì em viết thêm chữ số 0: 4,3 × 0,01 = 0,043; 6,3 : 0,01 = 630.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Dấu phẩy', 'Kết quả'],
          rows: [
            ['4,3 × 0,01', 'sang trái 2 chữ số', '0,043'],
            ['12,56 × 0,1', 'sang trái 1 chữ số', '1,256'],
            ['6,3 : 0,01', 'sang phải 2 chữ số', '630'],
            ['0,3 : 0,1', 'sang phải 1 chữ số', '3'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Dấu phẩy trượt',
    instruction:
      'Chọn nhân hoặc chia và một số trong 10; 100; 1 000; 0,1; 0,01; 0,001. Bấm "Thực hiện" để xem dấu phẩy trượt. Ở chế độ "Đố em", em tự dời dấu phẩy rồi bấm "Kiểm tra".',
  },
  examples: [
    {
      problem: 'Tính nhẩm 4,321 × 100.',
      steps: ['Nhân với 100: chuyển dấu phẩy sang bên phải hai chữ số.', '4,321 → 432,1.'],
      answer: '4,321 × 100 = 432,1.',
    },
    {
      problem: 'Tính nhẩm 4,3 × 0,01.',
      steps: [
        'Nhân với 0,01: chuyển dấu phẩy sang bên trái hai chữ số.',
        'Phần nguyên của 4,3 chỉ có một chữ số, em viết thêm chữ số 0 vào bên trái: 4,3 → 0,043.',
      ],
      answer: '4,3 × 0,01 = 0,043.',
    },
    {
      problem: 'Tính nhẩm 6,3 : 0,01.',
      steps: [
        'Chia cho 0,01: chuyển dấu phẩy sang bên phải hai chữ số.',
        'Sau chữ số 3 không còn chữ số nào, em viết thêm một chữ số 0: 6,3 → 630.',
      ],
      answer: '6,3 : 0,01 = 630.',
    },
    {
      problem: 'Một gói kẹo nặng 0,25 kg. 100 gói như thế nặng bao nhiêu ki-lô-gam?',
      steps: ['Tính 0,25 × 100.', 'Chuyển dấu phẩy sang phải hai chữ số: 0,25 → 25.'],
      answer: '100 gói kẹo nặng 25 kg.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhẩm: 0,94 × 100 = ?',
      answer: 94,
      hints: ['Nhân với 100: dấu phẩy sang phải mấy chữ số?'],
      solution: 'Chuyển dấu phẩy sang bên phải hai chữ số: 0,94 × 100 = 94.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 86,5 : 10 = ?',
      answer: 8.65,
      hints: ['Chia cho 10: dấu phẩy sang trái một chữ số.'],
      solution: '86,5 : 10 = 8,65.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 4,3 × 0,01 = ?',
      answer: 0.043,
      hints: ['Nhân với 0,01: dấu phẩy sang trái hai chữ số. Thiếu chữ số thì viết thêm chữ số 0.'],
      solution: 'Chuyển dấu phẩy sang bên trái hai chữ số: 4,3 × 0,01 = 0,043.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: 6,3 : 0,01 = ?',
      answer: 630,
      hints: ['Chia cho 0,01: dấu phẩy sang phải hai chữ số.'],
      solution:
        'Chuyển dấu phẩy sang bên phải hai chữ số, viết thêm một chữ số 0: 6,3 : 0,01 = 630.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép tính với kết quả của nó.',
      left: ['2,7 × 1 000', '31,4 : 100', '0,3 : 0,1', '12,56 × 0,1'],
      right: ['2 700', '0,314', '3', '1,256', '27'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['× 1 000 và : 0,1 dời dấu phẩy sang phải; : 100 và × 0,1 dời sang trái.'],
      solution: '2,7 × 1 000 = 2 700; 31,4 : 100 = 0,314; 0,3 : 0,1 = 3; 12,56 × 0,1 = 1,256.',
    },
    {
      type: 'choice',
      prompt: 'Khi nhân một số thập phân với 0,01, em làm thế nào?',
      options: [
        'Chuyển dấu phẩy sang bên trái hai chữ số',
        'Chuyển dấu phẩy sang bên phải hai chữ số',
        'Chuyển dấu phẩy sang bên trái một chữ số',
      ],
      answer: 0,
      hints: ['Nhân với 0,01 thì số bé đi hay lớn lên?'],
      solution: 'Nhân với 0,01 làm số bé đi 100 lần: chuyển dấu phẩy sang bên trái hai chữ số.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả bằng 3,5 × 10?',
      options: ['3,5 : 0,1', '3,5 × 0,1', '3,5 : 10', '3,5 : 0,01'],
      answer: 0,
      hints: ['3,5 × 10: dấu phẩy sang phải một chữ số. Phép tính nào cũng vậy?'],
      solution: '3,5 × 10 = 35 và 3,5 : 0,1 = 35: cả hai đều chuyển dấu phẩy sang phải một chữ số.',
    },
    {
      type: 'number',
      prompt: '10,4 mm = ... cm',
      answer: 1.04,
      hints: ['1 cm = 10 mm, nên em chia cho 10.'],
      solution: '10,4 : 10 = 1,04. Vậy 10,4 mm = 1,04 cm.',
    },
    {
      type: 'number',
      prompt: '3,7 m = ... cm',
      answer: 370,
      hints: ['1 m = 100 cm, nên em nhân với 100.'],
      solution: '3,7 × 100 = 370. Vậy 3,7 m = 370 cm.',
    },
    {
      type: 'number',
      prompt: 'Mỗi gói kẹo nặng 0,25 kg. Hỏi 1 000 gói như thế nặng bao nhiêu ki-lô-gam?',
      answer: 250,
      unit: 'kg',
      hints: ['Tính 0,25 × 1 000: dấu phẩy sang phải ba chữ số.'],
      solution: '0,25 × 1 000 = 250. 1 000 gói kẹo nặng 250 kg.',
    },
  ],
  takeaways: [
    'Nhân với 10; 100; 1 000 hoặc chia cho 0,1; 0,01; 0,001: dấu phẩy sang phải 1, 2, 3 chữ số.',
    'Chia cho 10; 100; 1 000 hoặc nhân với 0,1; 0,01; 0,001: dấu phẩy sang trái 1, 2, 3 chữ số.',
    'Thiếu chữ số thì viết thêm chữ số 0.',
  ],
};
