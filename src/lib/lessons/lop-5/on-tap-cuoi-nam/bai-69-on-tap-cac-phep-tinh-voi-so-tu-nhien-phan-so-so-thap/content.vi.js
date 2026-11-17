/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về các phép tính: cộng, trừ, nhân, chia số tự nhiên, phân số và số thập phân, nhân chia nhẩm với 10; 100; 0,1; …, tính giá trị biểu thức, tìm thành phần chưa biết, tính bằng cách thuận tiện và giải bài toán trung bình cộng.',
  intro:
    'Em đã học cộng, trừ, nhân, chia với số tự nhiên, phân số và số thập phân. Hôm nay em ôn lại tất cả các phép tính đó. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Cộng, trừ, nhân, chia được số tự nhiên, phân số, số thập phân.',
    'Nhân, chia nhẩm được với 10; 100; 1 000 và với 0,1; 0,01; 0,001.',
    'Tính được giá trị biểu thức, tìm được thành phần chưa biết.',
    'Tính được bằng cách thuận tiện; giải được bài toán thực tế.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Phép tính với số tự nhiên và phân số',
      blocks: [
        {
          type: 'p',
          text: 'Với số tự nhiên, em đặt tính sao cho các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ hai phân số khác mẫu số: em quy đồng mẫu số, rồi cộng hoặc trừ hai tử số, giữ nguyên mẫu số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số. Chia hai phân số: nhân phân số thứ nhất với phân số thứ hai đảo ngược.',
        },
        {
          type: 'p',
          text: 'Ví dụ: 2/3 × 4/5 = 8/15; 3/7 : 9/14 = 3/7 × 14/9 = 42/63 = 2/3.',
        },
      ],
    },
    {
      heading: 'Phép tính với số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cộng, trừ số thập phân: em đặt tính sao cho các dấu phẩy thẳng cột, tính như số tự nhiên, rồi đặt dấu phẩy ở kết quả thẳng cột với các dấu phẩy.',
        },
        {
          type: 'p',
          text: 'Nhân số thập phân: em nhân như số tự nhiên, rồi đếm số chữ số ở phần thập phân của các thừa số để tách ở tích.',
        },
        {
          type: 'p',
          text: 'Chia cho số thập phân: phần thập phân của số chia có bao nhiêu chữ số thì em chuyển dấu phẩy của số bị chia sang phải bấy nhiêu chữ số, bỏ dấu phẩy ở số chia, rồi chia như chia cho số tự nhiên.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Dấu phẩy chuyển', 'Ví dụ'],
          rows: [
            ['× 10; 100; 1 000', 'sang phải 1, 2, 3 chữ số', '2,35 × 100 = 235'],
            [': 10; 100; 1 000', 'sang trái 1, 2, 3 chữ số', '2,35 : 10 = 0,235'],
            ['× 0,1; 0,01; 0,001', 'sang trái 1, 2, 3 chữ số', '23,5 × 0,1 = 2,35'],
            [': 0,1; 0,01; 0,001', 'sang phải 1, 2, 3 chữ số', '0,235 : 0,01 = 23,5'],
          ],
        },
      ],
    },
    {
      heading: 'Biểu thức và tính thuận tiện',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Trong biểu thức không có dấu ngoặc: em làm phép nhân, chia trước, phép cộng, trừ sau. Có dấu ngoặc thì em tính trong ngoặc trước.',
        },
        {
          type: 'p',
          text: 'Tính thuận tiện: em đổi chỗ hoặc nhóm các số để được số tròn, hoặc dùng tính chất một số nhân với một tổng: a × b + a × c = a × (b + c).',
        },
        {
          type: 'p',
          text: 'Tìm thành phần chưa biết: số hạng = tổng − số hạng kia; thừa số = tích : thừa số kia.',
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
      problem: 'Tính: 3/4 + 5/6 − 1/3.',
      steps: [
        'Quy đồng mẫu số ba phân số với mẫu số chung là 12.',
        '3/4 = 9/12; 5/6 = 10/12; 1/3 = 4/12.',
        '9/12 + 10/12 − 4/12 = 15/12.',
        'Rút gọn: 15/12 = 5/4.',
      ],
      answer: '3/4 + 5/6 − 1/3 = 5/4.',
    },
    {
      problem: 'Tính bằng cách thuận tiện: 0,25 × 7,8 × 4.',
      steps: [
        'Đổi chỗ các thừa số để nhóm 0,25 với 4.',
        '0,25 × 7,8 × 4 = (0,25 × 4) × 7,8.',
        '0,25 × 4 = 1, nên kết quả là 1 × 7,8 = 7,8.',
      ],
      answer: '0,25 × 7,8 × 4 = 7,8.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '1 362 × 27 = ?',
      answer: 36774,
      hints: [
        'Em nhân 1 362 với 7, rồi với 2 chục. Tích riêng thứ hai viết lùi sang trái một cột.',
      ],
      solution: '1 362 × 27 = 1 362 × 7 + 1 362 × 20 = 9 534 + 27 240 = 36 774.',
    },
    {
      type: 'number',
      prompt: '8 568 : 24 = ?',
      answer: 357,
      hints: ['Em chia lần lượt từ trái sang phải: 85 chia 24 trước.'],
      solution: '8 568 : 24 = 357. Thử lại: 357 × 24 = 8 568.',
    },
    {
      type: 'fraction',
      prompt: '2/3 + 3/4 = ?',
      answer: [17, 12],
      hints: ['Quy đồng mẫu số, chọn mẫu số chung là 12.'],
      solution: '2/3 + 3/4 = 8/12 + 9/12 = 17/12.',
    },
    {
      type: 'fraction',
      prompt: '5/6 − 1/4 = ?',
      answer: [7, 12],
      hints: ['Quy đồng mẫu số, chọn mẫu số chung là 12.'],
      solution: '5/6 − 1/4 = 10/12 − 3/12 = 7/12.',
    },
    {
      type: 'fraction',
      prompt: '4/5 × 15/8 = ? (viết kết quả là phân số tối giản)',
      answer: [3, 2],
      simplest: true,
      hints: ['Tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.'],
      solution: '4/5 × 15/8 = 60/40 = 3/2.',
    },
    {
      type: 'fraction',
      prompt: '3/7 : 9/14 = ? (viết kết quả là phân số tối giản)',
      answer: [2, 3],
      simplest: true,
      hints: ['Lấy 3/7 nhân với phân số đảo ngược của 9/14.'],
      solution: '3/7 : 9/14 = 3/7 × 14/9 = 42/63 = 2/3.',
    },
    {
      type: 'number',
      prompt: '23,5 + 7,86 = ?',
      answer: 31.36,
      hints: ['Đặt tính sao cho hai dấu phẩy thẳng cột. Có thể viết 23,5 thành 23,50.'],
      solution: '23,50 + 7,86 = 31,36.',
    },
    {
      type: 'number',
      prompt: '3,25 × 4,2 = ?',
      answer: 13.65,
      hints: [
        'Nhân 325 × 42 như số tự nhiên, rồi tách ở tích số chữ số ở phần thập phân của cả hai thừa số.',
      ],
      solution:
        '325 × 42 = 13 650. Hai thừa số có tất cả 3 chữ số ở phần thập phân, nên 3,25 × 4,2 = 13,650 = 13,65.',
    },
    {
      type: 'number',
      prompt: '19,38 : 3,4 = ?',
      answer: 5.7,
      hints: ['Chuyển dấu phẩy của cả hai số sang phải một chữ số: 193,8 : 34.'],
      solution: '19,38 : 3,4 = 193,8 : 34 = 5,7. Thử lại: 5,7 × 3,4 = 19,38.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['2,35 × 100', '2,35 : 10', '23,5 × 0,1', '0,235 : 0,01'],
      right: ['235', '0,235', '2,35', '23,5', '2 350'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Nhân với 100 hoặc chia cho 0,01: dấu phẩy sang phải 2 chữ số. Chia cho 10 hoặc nhân với 0,1: dấu phẩy sang trái 1 chữ số.',
      ],
      solution: '2,35 × 100 = 235. 2,35 : 10 = 0,235. 23,5 × 0,1 = 2,35. 0,235 : 0,01 = 23,5.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị biểu thức: 12,5 + 4,5 × 3',
      answer: 26,
      hints: ['Em làm phép nhân trước, phép cộng sau.'],
      solution: '12,5 + 4,5 × 3 = 12,5 + 13,5 = 26.',
    },
    {
      type: 'number',
      prompt:
        'Ba bạn Nam, Việt, Hùng cân nặng lần lượt 31,5 kg; 34 kg; 36,5 kg. Trung bình mỗi bạn cân nặng bao nhiêu ki-lô-gam?',
      answer: 34,
      unit: 'kg',
      hints: ['Em tính tổng cân nặng của ba bạn, rồi chia cho 3.'],
      solution:
        'Tổng cân nặng: 31,5 + 34 + 36,5 = 102 (kg). Trung bình mỗi bạn: 102 : 3 = 34 (kg).',
    },
  ],
  takeaways: [
    'Cộng, trừ phân số khác mẫu số: quy đồng mẫu số trước.',
    'Chia phân số: nhân với phân số thứ hai đảo ngược.',
    'Cộng, trừ số thập phân: các dấu phẩy thẳng cột.',
    'Nhân với 10; 100; 1 000 thì dấu phẩy sang phải; nhân với 0,1; 0,01; 0,001 thì dấu phẩy sang trái.',
    'Trong biểu thức: nhân, chia trước; cộng, trừ sau.',
  ],
};
