/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm tròn số thập phân đến số tự nhiên gần nhất, đến hàng phần mười, hàng phần trăm: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  intro:
    'Bạn Nam cao 1,47 m. Mẹ nói: "Con cao khoảng 1,5 m." Mẹ đã làm tròn số 1,47 đến hàng phần mười. Em cùng học cách làm tròn số thập phân nhé.',
  objectives: [
    'Làm tròn được số thập phân đến số tự nhiên gần nhất.',
    'Làm tròn được số thập phân đến hàng phần mười, hàng phần trăm.',
    'Vận dụng làm tròn số trong tình huống thực tế.',
  ],
  sections: [
    {
      heading: 'Làm tròn đến số tự nhiên gần nhất',
      blocks: [
        {
          type: 'p',
          text: 'Trên tia số, 3,7 nằm giữa 3 và 4, gần 4 hơn. Làm tròn 3,7 đến số tự nhiên gần nhất được 4.',
        },
        {
          type: 'p',
          text: '3,2 nằm giữa 3 và 4, gần 3 hơn. Làm tròn 3,2 đến số tự nhiên gần nhất được 3.',
        },
        {
          type: 'p',
          text: '3,5 nằm chính giữa 3 và 4. Khi đó em làm tròn lên: được 4.',
        },
      ],
    },
    {
      heading: 'Quy tắc làm tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khi làm tròn số thập phân đến một hàng, em nhìn chữ số ở hàng ngay bên phải hàng đó. Nếu chữ số đó bé hơn 5 thì làm tròn xuống. Nếu chữ số đó lớn hơn hoặc bằng 5 thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Làm tròn đến', 'Nhìn chữ số hàng', 'Ví dụ'],
          rows: [
            ['Số tự nhiên gần nhất', 'Phần mười', '12,6 → 13'],
            ['Hàng phần mười', 'Phần trăm', '2,46 → 2,5'],
            ['Hàng phần trăm', 'Phần nghìn', '4,183 → 4,18'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Làm tròn xuống: giữ nguyên chữ số ở hàng làm tròn, bỏ các chữ số bên phải. Làm tròn lên: thêm 1 vào chữ số ở hàng làm tròn, bỏ các chữ số bên phải.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Làm tròn 2,96 đến hàng phần mười: 9 thêm 1 thành 10, nên được 3,0. Em giữ chữ số 0 để biết đã làm tròn đến hàng phần mười.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia số có mốc làm tròn',
    instruction:
      'Chọn làm tròn đến số tự nhiên, phần mười hoặc phần trăm. Kéo số trên tia số và xem nó được làm tròn về mốc nào. Ở chế độ "Đố em", chạm vào mốc đúng.',
  },
  examples: [
    {
      problem: 'Làm tròn 2,46 đến hàng phần mười.',
      steps: [
        'Hàng phần mười là 4. Chữ số ngay bên phải, hàng phần trăm, là 6.',
        '6 > 5 nên làm tròn lên: 4 thêm 1 thành 5, bỏ chữ số 6.',
      ],
      answer: 'Làm tròn 2,46 đến hàng phần mười được 2,5.',
    },
    {
      problem: 'Làm tròn 4,183 đến hàng phần trăm.',
      steps: [
        'Hàng phần trăm là 8. Chữ số ngay bên phải, hàng phần nghìn, là 3.',
        '3 < 5 nên làm tròn xuống: giữ 8, bỏ chữ số 3.',
      ],
      answer: 'Làm tròn 4,183 đến hàng phần trăm được 4,18.',
    },
    {
      problem:
        'Bạn An cân nặng 32,6 kg. Làm tròn đến số tự nhiên gần nhất, An nặng khoảng bao nhiêu ki-lô-gam?',
      steps: ['Chữ số hàng phần mười là 6.', '6 > 5 nên làm tròn lên: 32 thành 33.'],
      answer: 'An nặng khoảng 33 kg.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Làm tròn 12,6 đến số tự nhiên gần nhất.',
      options: ['13', '12', '12,6', '10'],
      answer: 0,
      hints: ['Nhìn chữ số hàng phần mười rồi so sánh với 5.'],
      solution: 'Chữ số hàng phần mười là 6, 6 > 5 nên làm tròn lên. Được 13.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn 3,49 đến số tự nhiên gần nhất.',
      options: ['3', '4', '3,5', '3,4'],
      answer: 0,
      hints: ['Chỉ nhìn chữ số hàng phần mười, không nhìn hàng phần trăm.'],
      solution: 'Chữ số hàng phần mười là 4, 4 < 5 nên làm tròn xuống. Được 3.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 7,5 đến số tự nhiên gần nhất.',
      answer: 8,
      hints: ['7,5 nằm chính giữa 7 và 8. Chữ số 5 thì làm tròn lên hay xuống?'],
      solution: 'Chữ số hàng phần mười là 5, nên làm tròn lên. Được 8.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 3,47 đến hàng phần mười.',
      answer: 3.5,
      hints: ['Nhìn chữ số hàng phần trăm.'],
      solution: 'Chữ số hàng phần trăm là 7, 7 > 5 nên làm tròn lên: 4 thành 5. Được 3,5.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn 12,94 đến hàng phần mười.',
      options: ['12,9', '13,0', '12,94', '12,95'],
      answer: 0,
      hints: ['Chữ số hàng phần trăm là bao nhiêu?'],
      solution: 'Chữ số hàng phần trăm là 4, 4 < 5 nên làm tròn xuống. Được 12,9.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn 2,96 đến hàng phần mười.',
      options: ['3,0', '2,9', '2,97', '2,1'],
      answer: 0,
      hints: ['Hàng phần trăm là 6, nên làm tròn lên. 9 thêm 1 là bao nhiêu?'],
      solution: '6 > 5 nên làm tròn lên: 2,9 thêm 1 phần mười thành 3,0. Được 3,0.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 4,135 đến hàng phần trăm.',
      answer: 4.14,
      hints: ['Nhìn chữ số hàng phần nghìn.'],
      solution: 'Chữ số hàng phần nghìn là 5, nên làm tròn lên: 3 thành 4. Được 4,14.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn 0,128 đến hàng phần trăm.',
      answer: 0.13,
      hints: ['Chữ số hàng phần nghìn là 8.'],
      solution: '8 > 5 nên làm tròn lên: 2 thành 3. Được 0,13.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi số với số làm tròn đến hàng phần mười của nó.',
      left: ['5,23', '5,28', '5,96', '5,05'],
      right: ['5,2', '5,3', '6,0', '5,1', '5,9'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi số, nhìn chữ số hàng phần trăm rồi so sánh với 5.'],
      solution: '5,23 → 5,2 (3 < 5); 5,28 → 5,3 (8 > 5); 5,96 → 6,0 (6 > 5); 5,05 → 5,1 (5 = 5).',
    },
    {
      type: 'choice',
      prompt: 'Số nào khi làm tròn đến hàng phần mười thì được 6,4?',
      options: ['6,35', '6,46', '6,33', '6,5'],
      answer: 0,
      hints: ['Làm tròn từng số đến hàng phần mười rồi so sánh với 6,4.'],
      solution:
        '6,35 → 6,4 (5 làm tròn lên). 6,46 → 6,5. 6,33 → 6,3. 6,5 giữ nguyên 6,5. Vậy số cần tìm là 6,35.',
    },
    {
      type: 'choice',
      prompt:
        'Quãng đường từ nhà Mai đến trường dài 2,38 km. Làm tròn đến số tự nhiên gần nhất, quãng đường đó khoảng bao nhiêu ki-lô-mét?',
      options: ['2 km', '3 km', '2,4 km', '24 km'],
      answer: 0,
      hints: ['Làm tròn đến số tự nhiên: nhìn chữ số hàng phần mười.'],
      solution: 'Chữ số hàng phần mười là 3, 3 < 5 nên làm tròn xuống. Quãng đường khoảng 2 km.',
    },
  ],
  takeaways: [
    'Muốn làm tròn đến hàng nào, em nhìn chữ số ở hàng ngay bên phải hàng đó.',
    'Bé hơn 5: làm tròn xuống. Từ 5 trở lên: làm tròn lên.',
    'Làm tròn đến hàng phần mười thì kết quả có một chữ số sau dấu phẩy, kể cả chữ số 0 (3,0).',
  ],
};
