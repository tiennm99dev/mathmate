/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân số thập phân: nhân như nhân các số tự nhiên, rồi đếm các chữ số ở phần thập phân của các thừa số và dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái.',
  intro:
    'Hình tam giác có ba cạnh bằng nhau, mỗi cạnh dài 1,2 m. Chu vi hình tam giác là 1,2 × 3. Em tính thế nào? Em cùng học phép nhân số thập phân nhé.',
  objectives: [
    'Nhân được một số thập phân với một số tự nhiên.',
    'Nhân được hai số thập phân, đặt đúng dấu phẩy ở tích.',
    'Giải được bài toán thực tế có phép nhân số thập phân.',
  ],
  sections: [
    {
      heading: 'Nhân một số thập phân với một số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Tính 1,2 × 3. Đổi 1,2 m = 12 dm. 12 dm × 3 = 36 dm = 3,6 m. Vậy 1,2 × 3 = 3,6.',
        },
        {
          type: 'p',
          text: 'Em thấy: nhân như số tự nhiên 12 × 3 = 36. Thừa số 1,2 có một chữ số ở phần thập phân, nên em tách ở tích một chữ số: 3,6.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân một số thập phân với một số tự nhiên, em làm như sau: nhân như nhân các số tự nhiên; đếm xem phần thập phân của số thập phân có bao nhiêu chữ số rồi dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái.',
        },
      ],
    },
    {
      heading: 'Nhân hai số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Hình vuông cạnh 1 m chia thành 100 ô nhỏ, mỗi ô là 0,01 m². Hình chữ nhật 0,3 m × 0,7 m phủ 3 × 7 = 21 ô nhỏ. Vậy 0,3 × 0,7 = 0,21.',
        },
        { type: 'widget', name: 'comma' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn nhân một số thập phân với một số thập phân, em làm như sau: nhân như nhân các số tự nhiên; đếm xem phần thập phân của cả hai thừa số có bao nhiêu chữ số rồi dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái.',
        },
        {
          type: 'table',
          head: ['Phép nhân', 'Như số tự nhiên', 'Tách', 'Tích'],
          rows: [
            ['1,2 × 3', '12 × 3 = 36', '1', '3,6'],
            ['6,4 × 4,8', '64 × 48 = 3 072', '1 + 1 = 2', '30,72'],
            ['0,3 × 0,7', '3 × 7 = 21', '1 + 1 = 2', '0,21'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi tích không đủ chữ số để tách, em viết thêm chữ số 0 vào bên trái: 21 tách hai chữ số được 0,21.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phép nhân các số thập phân có tính chất giao hoán: đổi chỗ hai thừa số thì tích không thay đổi, a × b = b × a.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mô hình lưới 10 × 10',
    instruction:
      'Kéo góc hình chữ nhật trong hình vuông cạnh 1 m. Mỗi cột rộng 0,1 m, mỗi hàng cao 0,1 m. Đếm số ô nhỏ được tô để biết tích. Ở chế độ "Đố em", em tạo đúng hình rồi chọn kết quả.',
  },
  examples: [
    {
      problem: 'Một mảnh vườn hình chữ nhật dài 6,4 m, rộng 4,8 m. Tính diện tích mảnh vườn.',
      steps: [
        'Diện tích là 6,4 × 4,8.',
        'Nhân như số tự nhiên: 64 × 48 = 3 072.',
        'Hai thừa số có 1 + 1 = 2 chữ số ở phần thập phân. Tách hai chữ số kể từ phải sang trái: 30,72.',
      ],
      answer: 'Diện tích mảnh vườn là 30,72 m².',
    },
    {
      problem: 'Đặt tính rồi tính 12,6 × 3.',
      steps: [
        'Nhân như số tự nhiên: 126 × 3 = 378.',
        '12,6 có một chữ số ở phần thập phân. Tách một chữ số ở tích: 37,8.',
      ],
      answer: '12,6 × 3 = 37,8.',
    },
    {
      problem: 'Tính 0,36 × 4.',
      steps: ['36 × 4 = 144.', '0,36 có hai chữ số ở phần thập phân, tách hai chữ số: 1,44.'],
      answer: '0,36 × 4 = 1,44.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 2,5 × 1,3 = ?',
      answer: 3.25,
      hints: [
        'Nhân như số tự nhiên: 25 × 13.',
        'Hai thừa số có tất cả hai chữ số ở phần thập phân.',
      ],
      solution: '25 × 13 = 325. Tách hai chữ số kể từ phải sang trái: 2,5 × 1,3 = 3,25.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 4,26 × 5 = ?',
      answer: 21.3,
      hints: ['426 × 5 bằng mấy? Rồi tách hai chữ số.'],
      solution: '426 × 5 = 2 130. Tách hai chữ số: 21,30, viết gọn là 21,3.',
    },
    {
      type: 'choice',
      prompt: '6,8 × 0,7 = ?',
      options: ['4,76', '47,6', '0,476', '476'],
      answer: 0,
      hints: ['68 × 7 = 476. Cả hai thừa số có mấy chữ số ở phần thập phân?'],
      solution:
        '68 × 7 = 476. Hai thừa số có 1 + 1 = 2 chữ số ở phần thập phân, nên 6,8 × 0,7 = 4,76.',
    },
    {
      type: 'choice',
      prompt: 'Biết 47 × 12 = 564. Vậy 4,7 × 1,2 bằng bao nhiêu?',
      options: ['5,64', '56,4', '0,564', '564'],
      answer: 0,
      hints: ['Đếm chữ số ở phần thập phân của 4,7 và của 1,2.'],
      solution: '4,7 và 1,2 có tất cả 2 chữ số ở phần thập phân. Tách hai chữ số ở 564: 5,64.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép nhân với tích của nó.',
      left: ['0,2 × 0,4', '0,5 × 0,3', '0,9 × 0,9', '1 × 0,7'],
      right: ['0,08', '0,15', '0,81', '0,7', '0,8'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['2 × 4 = 8. Tách hai chữ số: viết thêm chữ số 0 bên trái.'],
      solution: '0,2 × 0,4 = 0,08; 0,5 × 0,3 = 0,15; 0,9 × 0,9 = 0,81; 1 × 0,7 = 0,7.',
    },
    {
      type: 'number',
      prompt:
        'Hình vuông cạnh 1 m chia thành 100 ô nhỏ. Hình chữ nhật 0,4 m × 0,6 m phủ bao nhiêu ô nhỏ?',
      answer: 24,
      hints: ['Hình chữ nhật có 4 cột và 6 hàng ô nhỏ.'],
      solution: '4 × 6 = 24 ô nhỏ. Vậy 0,4 × 0,6 = 0,24.',
    },
    {
      type: 'choice',
      prompt: '2,36 × 4 = 4 × ...',
      options: ['2,36', '4', '9,44', '0,236'],
      answer: 0,
      hints: ['Đổi chỗ hai thừa số thì tích không thay đổi.'],
      solution: 'Tính chất giao hoán: 2,36 × 4 = 4 × 2,36.',
    },
    {
      type: 'number',
      prompt: 'Mỗi chai nước chứa 1,5 l. Hỏi 6 chai như thế chứa bao nhiêu lít nước?',
      answer: 9,
      unit: 'l',
      hints: ['Tính 1,5 × 6.'],
      solution: '1,5 × 6 = 9,0 = 9. Sáu chai chứa 9 l nước.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm kính hình chữ nhật dài 1,25 m, rộng 0,8 m. Diện tích tấm kính là bao nhiêu mét vuông?',
      answer: 1,
      hints: ['Tính 1,25 × 0,8: nhân 125 × 8 rồi tách ba chữ số.'],
      solution: '125 × 8 = 1 000. Tách ba chữ số: 1,000 = 1. Diện tích tấm kính là 1 m².',
    },
  ],
  takeaways: [
    'Nhân như nhân các số tự nhiên.',
    'Đếm chữ số ở phần thập phân của các thừa số, rồi tách ở tích bấy nhiêu chữ số kể từ phải sang trái.',
    'Thiếu chữ số để tách thì viết thêm chữ số 0 vào bên trái: 0,3 × 0,7 = 0,21.',
  ],
};
