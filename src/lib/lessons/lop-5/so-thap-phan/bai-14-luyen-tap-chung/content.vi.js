/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Số thập phân: đọc, viết, các hàng của số thập phân, so sánh và sắp xếp, viết số đo đại lượng dưới dạng số thập phân, làm tròn và bài toán thực tế.',
  intro:
    'Em đã biết số thập phân, cách so sánh, cách viết số đo và cách làm tròn. Bây giờ em cùng luyện tập tất cả các kiến thức đó nhé!',
  objectives: [
    'Củng cố cách đọc, viết và các hàng của số thập phân.',
    'So sánh, sắp xếp được các số thập phân.',
    'Viết được số đo đại lượng dưới dạng số thập phân và làm tròn số thập phân.',
    'Vận dụng giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại về số thập phân',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Cách làm'],
          rows: [
            ['Đọc số thập phân', 'Đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân.'],
            [
              'So sánh hai số thập phân',
              'So sánh phần nguyên, rồi lần lượt hàng phần mười, phần trăm, phần nghìn.',
            ],
            [
              'Viết số đo dưới dạng số thập phân',
              'Đổi phần lẻ thành phân số thập phân của đơn vị lớn.',
            ],
            [
              'Làm tròn',
              'Nhìn chữ số ở hàng ngay bên phải: bé hơn 5 thì làm tròn xuống, còn lại làm tròn lên.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Thêm hay bỏ chữ số 0 ở tận cùng bên phải phần thập phân, số thập phân không thay đổi.',
        },
      ],
    },
    {
      heading: 'Số thập phân trong cuộc sống',
      blocks: [
        {
          type: 'p',
          text: 'Chạy cùng một quãng đường, bạn nào hết ít thời gian hơn thì chạy nhanh hơn: em tìm số bé nhất.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn so sánh hai số đo có đơn vị khác nhau, em viết chúng về cùng một đơn vị rồi mới so sánh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập trộn',
    instruction:
      'Mỗi bộ có một câu cho mỗi phần của chủ đề. Chọn sai lần đầu, em được xem gợi ý và chọn lại. Hết bộ, em xem điểm và các phần cần ôn rồi làm bộ khác.',
  },
  examples: [
    {
      problem: 'Sắp xếp các số đo 1,125 l; 950 ml; 1 l 85 ml; 1,3 l theo thứ tự từ bé đến lớn.',
      steps: [
        'Viết về cùng đơn vị lít: 950 ml = 0,95 l; 1 l 85 ml = 1,085 l.',
        'Phần nguyên: 0,95 có phần nguyên 0, bé nhất.',
        'Ba số còn lại có phần nguyên 1. Hàng phần mười: 0 < 1 < 3, nên 1,085 < 1,125 < 1,3.',
      ],
      answer: '950 ml; 1 l 85 ml; 1,125 l; 1,3 l.',
    },
    {
      problem:
        'Một bức tranh có diện tích 4 m² 18 dm². Viết diện tích đó theo mét vuông rồi làm tròn đến hàng phần mười.',
      steps: [
        '18 dm² = $\\dfrac{18}{100}$ m², nên 4 m² 18 dm² = 4,18 m².',
        'Làm tròn đến hàng phần mười: chữ số hàng phần trăm là 8, 8 > 5 nên làm tròn lên.',
      ],
      answer: '4 m² 18 dm² = 4,18 m², làm tròn được 4,2 m².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số "bốn mươi lăm phẩy không sáu" viết là:',
      options: ['45,06', '45,6', '45,006', '4,506'],
      answer: 0,
      hints: ['"không sáu" là hai chữ số sau dấu phẩy: 0 và 6.'],
      solution: 'Phần nguyên 45, phần thập phân 06: viết là 45,06.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 72,384, chữ số 8 có giá trị là bao nhiêu?',
      options: ['$\\dfrac{8}{100}$', '$\\dfrac{8}{10}$', '$\\dfrac{8}{1000}$', '80'],
      answer: 0,
      hints: ['Chữ số 8 ở hàng nào sau dấu phẩy?'],
      solution: 'Chữ số 8 ở hàng phần trăm, nên có giá trị là $\\dfrac{8}{100}$.',
    },
    {
      type: 'number',
      prompt: 'Viết $\\dfrac{125}{1000}$ thành số thập phân.',
      answer: 0.125,
      hints: ['Mẫu số 1 000 có ba chữ số 0: số thập phân có ba chữ số sau dấu phẩy.'],
      solution: '$\\dfrac{125}{1000}$ là 125 phần nghìn, viết là 0,125.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 0,7 ? 0,65',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Phần nguyên bằng nhau. So sánh hàng phần mười.'],
      solution: 'Hàng phần mười: 7 > 6. Vậy 0,7 > 0,65.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp theo thứ tự từ bé đến lớn.',
      items: ['6,2', '5,95', '6,195', '5,9'],
      answer: [3, 1, 2, 0],
      hints: ['Hai số có phần nguyên 5, hai số có phần nguyên 6. So sánh từng nhóm.'],
      solution:
        '5,9 < 5,95 (hàng phần trăm 0 < 5). 6,195 < 6,2 (hàng phần mười 1 < 2). Vậy 5,9; 5,95; 6,195; 6,2.',
    },
    {
      type: 'number',
      prompt: '10 m 5 dm = ? m',
      answer: 10.5,
      unit: 'm',
      hints: ['5 dm = $\\dfrac{5}{10}$ m.'],
      solution: '10 m 5 dm = $10\\dfrac{5}{10}$ m = 10,5 m.',
    },
    {
      type: 'number',
      prompt: '1 305 ml = ? l',
      answer: 1.305,
      unit: 'l',
      hints: ['1 305 ml = 1 l 305 ml. 1 l = 1 000 ml.'],
      solution: '1 305 ml = 1 l 305 ml = $1\\dfrac{305}{1000}$ l = 1,305 l.',
    },
    {
      type: 'choice',
      prompt: '6 kg 195 g = ? kg',
      options: ['6,195', '6,95', '61,95', '6,0195'],
      answer: 0,
      hints: ['195 g là mấy phần nghìn ki-lô-gam?'],
      solution: '195 g = $\\dfrac{195}{1000}$ kg, nên 6 kg 195 g = 6,195 kg.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 8,46 đến số tự nhiên gần nhất.',
      answer: 8,
      hints: ['Chỉ nhìn chữ số hàng phần mười.'],
      solution: 'Chữ số hàng phần mười là 4, 4 < 5 nên làm tròn xuống. Được 8.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 15,372 đến hàng phần trăm.',
      answer: 15.37,
      hints: ['Nhìn chữ số hàng phần nghìn.'],
      solution: 'Chữ số hàng phần nghìn là 2, 2 < 5 nên làm tròn xuống. Được 15,37.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn chạy 60 m. An hết 10,2 giây, Bình hết 9,85 giây, Chi hết 9,9 giây. Bạn nào chạy nhanh nhất?',
      options: ['Bình', 'Chi', 'An'],
      answer: 0,
      hints: ['Chạy nhanh nhất là hết ít thời gian nhất: tìm số bé nhất.'],
      solution:
        '9,85 < 9,9 < 10,2 (hàng phần mười 8 < 9). Bình hết ít thời gian nhất nên chạy nhanh nhất.',
    },
    {
      type: 'choice',
      prompt: 'Con thỏ nặng 2,5 kg, con mèo nặng 2 kg 500 g. So sánh cân nặng của hai con vật.',
      options: ['Hai con nặng bằng nhau', 'Con thỏ nặng hơn', 'Con mèo nặng hơn'],
      answer: 0,
      hints: ['Viết 2 kg 500 g theo ki-lô-gam.'],
      solution: '2 kg 500 g = 2,500 kg = 2,5 kg. Vậy hai con nặng bằng nhau.',
    },
  ],
  takeaways: [
    'Đọc, viết số thập phân: phần nguyên, dấu phẩy, phần thập phân.',
    'So sánh: phần nguyên trước, rồi từng hàng sau dấu phẩy từ trái sang phải.',
    'Viết số đo về cùng một đơn vị trước khi so sánh hay tính.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải và so sánh với 5.',
  ],
};
