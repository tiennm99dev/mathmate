/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số đến lớp triệu: đọc, viết số, hàng và lớp, viết số thành tổng, giá trị của chữ số, so sánh, sắp xếp và làm tròn số.',
  intro:
    'Em đã học các số có nhiều chữ số, đến lớp triệu. Hôm nay em ôn lại cách đọc, viết, so sánh và làm tròn các số đó. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết các số đến lớp triệu.',
    'Nêu được các chữ số thuộc từng lớp, giá trị của mỗi chữ số.',
    'Viết số thành tổng các hàng.',
    'So sánh, sắp xếp các số; tìm số lớn nhất, số bé nhất.',
    'Làm tròn số đến hàng trăm, hàng nghìn, hàng chục nghìn, hàng trăm nghìn.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hàng và lớp',
      blocks: [
        {
          type: 'table',
          head: ['Lớp', 'Các hàng', 'Chữ số của 517 906 384'],
          rows: [
            ['Lớp triệu', 'trăm triệu, chục triệu, triệu', '5, 1, 7'],
            ['Lớp nghìn', 'trăm nghìn, chục nghìn, nghìn', '9, 0, 6'],
            ['Lớp đơn vị', 'trăm, chục, đơn vị', '3, 8, 4'],
          ],
        },
        {
          type: 'p',
          text: 'Số 517 906 384 đọc là: năm trăm mười bảy triệu chín trăm linh sáu nghìn ba trăm tám mươi tư.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đọc số: em tách số thành từng lớp, kể từ phải sang trái. Rồi em đọc từng lớp từ trái sang phải, kèm tên lớp.',
        },
      ],
    },
    {
      heading: 'Giá trị của chữ số',
      blocks: [
        {
          type: 'p',
          text: 'Giá trị của một chữ số phụ thuộc vào hàng của nó.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số 4 ở hàng', 'Giá trị của chữ số 4'],
          rows: [
            ['9 724', 'đơn vị', '4'],
            ['703 410', 'trăm', '400'],
            ['46 875', 'chục nghìn', '40 000'],
            ['4 297 603', 'triệu', '4 000 000'],
          ],
        },
        {
          type: 'p',
          text: 'Viết số thành tổng: 5 240 601 = 5 000 000 + 200 000 + 40 000 + 600 + 1.',
        },
      ],
    },
    {
      heading: 'So sánh và làm tròn số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào có nhiều chữ số hơn thì lớn hơn. Hai số có cùng số chữ số: em so sánh từng cặp chữ số ở cùng hàng, kể từ trái sang phải.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn số đến một hàng: em nhìn chữ số ở hàng ngay bên phải. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Làm tròn 8 891 344 đến', 'Được số'],
          rows: [
            ['hàng trăm', '8 891 300'],
            ['hàng nghìn', '8 891 000'],
            ['hàng chục nghìn', '8 890 000'],
            ['hàng trăm nghìn', '8 900 000'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Viết số 5 240 601 thành tổng các hàng.',
      steps: [
        'Chữ số 5 ở hàng triệu: 5 000 000.',
        'Chữ số 2 ở hàng trăm nghìn: 200 000. Chữ số 4 ở hàng chục nghìn: 40 000.',
        'Hàng nghìn và hàng chục là chữ số 0, em bỏ qua.',
        'Chữ số 6 ở hàng trăm: 600. Chữ số 1 ở hàng đơn vị: 1.',
      ],
      answer: '5 240 601 = 5 000 000 + 200 000 + 40 000 + 600 + 1.',
    },
    {
      problem: 'Làm tròn số 8 891 344 đến hàng trăm nghìn.',
      steps: [
        'Hàng ngay bên phải hàng trăm nghìn là hàng chục nghìn. Chữ số hàng chục nghìn là 9.',
        '9 > 5 nên làm tròn lên: chữ số 8 ở hàng trăm nghìn thành 9, các chữ số bên phải thành 0.',
      ],
      answer: 'Làm tròn 8 891 344 đến hàng trăm nghìn được 8 900 000.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 8 053 663 đọc là gì?',
      options: [
        'Tám triệu không trăm năm mươi ba nghìn sáu trăm sáu mươi ba',
        'Tám triệu năm trăm linh ba nghìn sáu trăm sáu mươi ba',
        'Tám trăm linh năm triệu ba nghìn sáu trăm sáu mươi ba',
        'Tám triệu không trăm năm mươi ba nghìn sáu trăm ba mươi sáu',
      ],
      answer: 0,
      hints: ['Em tách số thành ba lớp: 8 | 053 | 663.'],
      solution:
        'Lớp triệu là 8, lớp nghìn là 053, lớp đơn vị là 663. Số 8 053 663 đọc là: tám triệu không trăm năm mươi ba nghìn sáu trăm sáu mươi ba.',
    },
    {
      type: 'number',
      prompt: 'Viết số: Một triệu hai trăm chín mươi sáu nghìn chín trăm linh sáu.',
      answer: 1296906,
      hints: ['Lớp triệu: 1. Lớp nghìn: 296. Lớp đơn vị: 906.'],
      solution: 'Viết lần lượt lớp triệu, lớp nghìn, lớp đơn vị: 1 296 906.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 517 906 384, các chữ số thuộc lớp nghìn là những chữ số nào?',
      options: ['9, 0, 6', '5, 1, 7', '3, 8, 4', '6, 0, 9'],
      answer: 0,
      hints: [
        'Kể từ phải sang trái: ba chữ số đầu là lớp đơn vị, ba chữ số tiếp theo là lớp nghìn.',
      ],
      solution:
        'Lớp triệu gồm 5, 1, 7; lớp nghìn gồm 9, 0, 6; lớp đơn vị gồm 3, 8, 4. Các chữ số thuộc lớp nghìn là 9, 0, 6.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chữ số 7 với giá trị của nó.',
      left: [
        'Chữ số 7 trong 5 343 627',
        'Chữ số 7 trong 1 571 210',
        'Chữ số 7 trong 2 180 764',
        'Chữ số 7 trong 7 042 500',
      ],
      right: ['7', '70 000', '700', '7 000 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tìm hàng của chữ số 7 trong từng số, kể từ hàng đơn vị bên phải.'],
      solution:
        'Trong 5 343 627, chữ số 7 ở hàng đơn vị: 7. Trong 1 571 210, ở hàng chục nghìn: 70 000. Trong 2 180 764, ở hàng trăm: 700. Trong 7 042 500, ở hàng triệu: 7 000 000.',
    },
    {
      type: 'choice',
      prompt: '608 292 = 600 000 + 8 000 + ? + 90 + 2. Số nào thay cho dấu "?"',
      options: ['200', '2 000', '20', '2'],
      answer: 0,
      hints: ['Chữ số 2 còn thiếu đứng ở hàng nào của số 608 292?'],
      solution:
        'Chữ số 2 ở hàng trăm có giá trị 200. Vậy 608 292 = 600 000 + 8 000 + 200 + 90 + 2.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 651 410 ? 639 837',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số đều có sáu chữ số. Hàng trăm nghìn giống nhau, em so sánh hàng chục nghìn.'],
      solution: 'Hàng trăm nghìn đều là 6. Ở hàng chục nghìn: 5 > 3. Vậy 651 410 > 639 837.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: 200 895 ? 200 000 + 900 + 5',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Em tính tổng ở vế phải trước.'],
      solution:
        '200 000 + 900 + 5 = 200 905. Ở hàng trăm: 8 < 9. Vậy 200 895 < 200 905, tức là 200 895 < 200 000 + 900 + 5.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự từ bé đến lớn.',
      items: ['6 251', '5 216', '6 521', '5 612'],
      answer: [1, 3, 0, 2],
      hints: ['Em so sánh chữ số hàng nghìn trước, rồi đến hàng trăm.'],
      solution: 'Xếp theo thứ tự từ bé đến lớn: 5 216; 5 612; 6 251; 6 521.',
    },
    {
      type: 'choice',
      prompt:
        'Số dân năm 2019: Hà Giang có 854 679 người; Quảng Trị có 632 375 người; Cà Mau có 1 194 476 người. Nơi nào có số dân ít nhất?',
      options: ['Quảng Trị', 'Hà Giang', 'Cà Mau'],
      answer: 0,
      hints: [
        'Số có ít chữ số hơn thì bé hơn. Hai số có sáu chữ số thì em so sánh hàng trăm nghìn.',
      ],
      solution:
        '1 194 476 có bảy chữ số nên lớn nhất. 632 375 < 854 679 vì 6 < 8 ở hàng trăm nghìn. Quảng Trị có số dân ít nhất.',
    },
    {
      type: 'choice',
      prompt: 'Số học sinh tiểu học là 8 891 344. Làm tròn số đó đến hàng chục nghìn được số nào?',
      options: ['8 890 000', '8 900 000', '8 891 000', '8 880 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng nghìn.'],
      solution:
        'Chữ số hàng nghìn của 8 891 344 là 1, 1 < 5 nên làm tròn xuống. Làm tròn đến hàng chục nghìn được 8 890 000.',
    },
    {
      type: 'choice',
      prompt:
        'Giá bốn chiếc máy tính là 18 700 000 đồng; 21 900 000 đồng; 17 800 000 đồng; 22 300 000 đồng. Chiếc rẻ nhất giá bao nhiêu?',
      options: ['17 800 000 đồng', '18 700 000 đồng', '21 900 000 đồng', '22 300 000 đồng'],
      answer: 0,
      hints: ['Các số đều có tám chữ số. Em so sánh hàng chục triệu, rồi hàng triệu.'],
      solution:
        'Hàng chục triệu: 1 < 2, nên rẻ nhất là một trong hai số 18 700 000 và 17 800 000. Hàng triệu: 7 < 8. Chiếc rẻ nhất giá 17 800 000 đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Đố em: Viết thêm chữ số 2 vào bên trái một số có ba chữ số. Số mới lớn hơn số cũ bao nhiêu đơn vị?',
      options: ['2 000', '200', '2', '20 000'],
      answer: 0,
      hints: ['Thử với số 345: viết thêm 2 vào bên trái được số nào?'],
      solution:
        'Chữ số 2 đứng ở hàng nghìn của số mới, nên số mới hơn số cũ 2 000 đơn vị. Ví dụ: 2 345 − 345 = 2 000.',
    },
  ],
  takeaways: [
    'Mỗi lớp có ba hàng: lớp đơn vị, lớp nghìn, lớp triệu.',
    'Giá trị của chữ số phụ thuộc vào hàng của nó.',
    'So sánh số: đếm chữ số trước, rồi so sánh từng hàng từ trái sang phải.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
  ],
};
