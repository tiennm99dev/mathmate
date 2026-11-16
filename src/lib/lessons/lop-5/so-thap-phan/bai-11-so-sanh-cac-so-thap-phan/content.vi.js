/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số thập phân: so sánh phần nguyên trước, rồi lần lượt hàng phần mười, phần trăm, phần nghìn; thêm hay bỏ chữ số 0 ở tận cùng bên phải phần thập phân không làm số thay đổi.',
  intro:
    'Sợi dây đỏ dài 8,7 m, sợi dây xanh dài 8,65 m. Số 8,65 có nhiều chữ số hơn, nhưng sợi nào dài hơn? Em cùng học cách so sánh hai số thập phân nhé.',
  objectives: [
    'Biết thêm hoặc bỏ chữ số 0 ở tận cùng bên phải phần thập phân.',
    'So sánh được hai số thập phân.',
    'Sắp xếp được các số thập phân theo thứ tự.',
  ],
  sections: [
    {
      heading: 'Số thập phân bằng nhau',
      blocks: [
        {
          type: 'p',
          text: '0,9 m = 9 dm = 90 cm. Mà 90 cm = 0,90 m. Vậy 0,9 m = 0,90 m, nên 0,9 = 0,90.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Viết thêm chữ số 0 vào bên phải phần thập phân, em được một số thập phân bằng nó. Bỏ chữ số 0 ở tận cùng bên phải phần thập phân, em cũng được một số thập phân bằng nó.',
        },
        {
          type: 'table',
          head: ['Thêm chữ số 0', 'Bỏ chữ số 0'],
          rows: [
            ['0,9 = 0,90 = 0,900', '8,75000 = 8,7500 = 8,75'],
            ['12 = 12,0 = 12,00', '2,0010 = 2,001'],
          ],
        },
      ],
    },
    {
      heading: 'So sánh hai số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'So sánh phần nguyên trước. Số nào có phần nguyên lớn hơn thì số đó lớn hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu phần nguyên bằng nhau, em so sánh lần lượt hàng phần mười, hàng phần trăm, hàng phần nghìn, ... Ở hàng đầu tiên có hai chữ số khác nhau, số nào có chữ số lớn hơn thì số đó lớn hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nếu phần nguyên và phần thập phân của hai số đều bằng nhau thì hai số đó bằng nhau.',
        },
        {
          type: 'table',
          head: ['So sánh', 'Vì sao'],
          rows: [
            ['2001,2 > 1999,7', 'Phần nguyên 2001 > 1999.'],
            ['78,469 < 78,5', 'Phần nguyên bằng nhau. Hàng phần mười: 4 < 5.'],
            ['630,72 > 630,70', 'Phần nguyên và hàng phần mười bằng nhau. Hàng phần trăm: 2 > 0.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Số có nhiều chữ số hơn ở phần thập phân chưa chắc đã lớn hơn: 8,7 > 8,65 vì hàng phần mười 7 > 6.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thẳng dấu phẩy',
    instruction:
      'Hai số được xếp thẳng hàng theo dấu phẩy. Em chạm vào cột đầu tiên từ trái sang mà hai chữ số khác nhau, rồi chọn dấu >, < hoặc =.',
  },
  examples: [
    {
      problem: 'So sánh 8,7 và 8,65.',
      steps: [
        'Phần nguyên bằng nhau: 8 = 8.',
        'Hàng phần mười: 7 > 6.',
        'Không cần xem hàng phần trăm nữa.',
      ],
      answer: '8,7 > 8,65. Sợi dây đỏ dài hơn.',
    },
    {
      problem: 'So sánh 0,5 và 0,50.',
      steps: ['Viết thêm chữ số 0: 0,5 = 0,50.', 'Phần nguyên và phần thập phân đều bằng nhau.'],
      answer: '0,5 = 0,50.',
    },
    {
      problem: 'Sắp xếp các số 5,7; 5,07; 5,17; 4,9 theo thứ tự từ bé đến lớn.',
      steps: [
        '4,9 có phần nguyên 4, bé nhất.',
        'Ba số còn lại có phần nguyên 5. So sánh hàng phần mười: 0 < 1 < 7.',
        'Nên 5,07 < 5,17 < 5,7.',
      ],
      answer: '4,9; 5,07; 5,17; 5,7.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 8,7 ? 8,65',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Phần nguyên bằng nhau. Em so sánh hàng phần mười.'],
      solution: 'Phần nguyên 8 = 8. Hàng phần mười: 7 > 6. Vậy 8,7 > 8,65.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 12,304 ? 12,31',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Phần nguyên và hàng phần mười bằng nhau. Em xem hàng phần trăm.'],
      solution:
        'Phần nguyên 12 = 12, hàng phần mười 3 = 3. Hàng phần trăm: 0 < 1. Vậy 12,304 < 12,31.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 0,5 ? 0,50',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Thêm chữ số 0 vào bên phải phần thập phân thì số có thay đổi không?'],
      solution: '0,5 = 0,50 vì thêm chữ số 0 vào bên phải phần thập phân, số không thay đổi.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số bằng 0,9.',
      options: ['0,90', '0,900', '0,09', '9,0', '0,9000'],
      answers: [0, 1, 4],
      hints: ['Chỉ được thêm chữ số 0 vào tận cùng bên phải phần thập phân.'],
      solution:
        '0,90; 0,900; 0,9000 đều bằng 0,9. Còn 0,09 là 9 phần trăm, 9,0 là 9: không bằng 0,9.',
    },
    {
      type: 'choice',
      prompt: 'Bỏ các chữ số 0 ở tận cùng bên phải phần thập phân: 8,7500 = ?',
      options: ['8,75', '8,7', '875', '8,075'],
      answer: 0,
      hints: ['Chỉ bỏ các chữ số 0 ở cuối, sau chữ số 5.'],
      solution: '8,7500 = 8,750 = 8,75.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp theo thứ tự từ bé đến lớn.',
      items: ['5,7', '5,07', '5,17', '4,9'],
      answer: [3, 1, 2, 0],
      hints: ['Tìm số có phần nguyên bé nhất trước, rồi so sánh hàng phần mười.'],
      solution: '4,9 < 5,07 < 5,17 < 5,7.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp theo thứ tự từ lớn đến bé.',
      items: ['0,32', '0,197', '0,4', '0,321'],
      answer: [2, 3, 0, 1],
      hints: ['Phần nguyên đều là 0. So sánh hàng phần mười, rồi hàng phần trăm, phần nghìn.'],
      solution:
        'Hàng phần mười: 4 > 3 > 1, nên 0,4 lớn nhất và 0,197 bé nhất. 0,321 > 0,32 vì hàng phần nghìn 1 > 0. Vậy 0,4 > 0,321 > 0,32 > 0,197.',
    },
    {
      type: 'choice',
      prompt: 'Số nào lớn nhất?',
      options: ['9,01', '6,375', '8,72', '6,735'],
      answer: 0,
      hints: ['So sánh phần nguyên trước.'],
      solution: 'Phần nguyên: 9 > 8 > 6. Vậy 9,01 lớn nhất.',
    },
    {
      type: 'number',
      prompt: 'Tìm chữ số x, biết 3,x5 < 3,15.',
      answer: 0,
      hints: ['Phần nguyên bằng nhau. Hàng phần mười của 3,15 là 1.'],
      solution:
        'Nếu x = 1 thì 3,15 = 3,15, không bé hơn. Nếu x lớn hơn 1 thì số lớn hơn. Vậy x = 0: 3,05 < 3,15.',
    },
    {
      type: 'choice',
      prompt: 'Mai cao 1,35 m. Hà cao 1,4 m. Bạn nào cao hơn?',
      options: ['Hà', 'Mai', 'Hai bạn cao bằng nhau'],
      answer: 0,
      hints: ['So sánh 1,35 và 1,4: phần nguyên bằng nhau, em xem hàng phần mười.'],
      solution: 'Hàng phần mười: 4 > 3, nên 1,4 > 1,35. Hà cao hơn.',
    },
  ],
  takeaways: [
    'Thêm hay bỏ chữ số 0 ở tận cùng bên phải phần thập phân, số không đổi: 0,9 = 0,90.',
    'So sánh phần nguyên trước; nếu bằng nhau thì so sánh lần lượt hàng phần mười, phần trăm, phần nghìn.',
    'Xếp thẳng hai số theo dấu phẩy để so sánh từng hàng.',
  ],
};
