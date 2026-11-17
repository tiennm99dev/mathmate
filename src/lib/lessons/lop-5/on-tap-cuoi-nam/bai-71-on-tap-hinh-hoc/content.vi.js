/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm về hình học: nhận dạng hình tam giác, hình thang, hình tròn, hình hộp chữ nhật, hình lập phương; diện tích hình tam giác, hình thang; chu vi, diện tích hình tròn; diện tích xung quanh, diện tích toàn phần và thể tích của hình hộp chữ nhật, hình lập phương.',
  intro:
    'Em đã học nhiều hình: hình tam giác, hình thang, hình tròn, hình hộp chữ nhật, hình lập phương. Hôm nay em ôn lại cách nhận ra chúng và cách tính chu vi, diện tích, thể tích nhé!',
  objectives: [
    'Nhận dạng được hình tam giác nhọn, vuông, tù; hình thang, hình bình hành, hình thoi.',
    'Tính được diện tích hình tam giác, hình thang; chu vi và diện tích hình tròn.',
    'Tính được diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật, hình lập phương.',
    'Tính được thể tích hình hộp chữ nhật, hình lập phương.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hình tam giác và hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Hình tam giác có ba góc nhọn là tam giác nhọn, có một góc vuông là tam giác vuông, có một góc tù là tam giác tù.',
        },
        {
          type: 'p',
          text: 'Hình thang có một cặp cạnh đối diện song song, gọi là hai đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Diện tích hình tam giác bằng độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Diện tích hình thang bằng tổng độ dài hai đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2.',
        },
      ],
    },
    {
      heading: 'Hình tròn',
      blocks: [
        {
          type: 'p',
          text: 'Đường kính dài gấp 2 lần bán kính. Khi tính, em lấy số 3,14 thay cho số pi.',
        },
        {
          type: 'table',
          head: ['Cần tính', 'Cách tính'],
          rows: [
            ['Chu vi hình tròn', 'đường kính × 3,14 hoặc bán kính × 2 × 3,14'],
            ['Diện tích hình tròn', 'bán kính × bán kính × 3,14'],
          ],
        },
      ],
    },
    {
      heading: 'Hình hộp chữ nhật và hình lập phương',
      blocks: [
        {
          type: 'p',
          text: 'Hình hộp chữ nhật có 6 mặt là các hình chữ nhật. Hình lập phương có 6 mặt là các hình vuông bằng nhau.',
        },
        {
          type: 'table',
          head: ['Cần tính', 'Hình hộp chữ nhật', 'Hình lập phương'],
          rows: [
            ['Diện tích xung quanh', 'chu vi đáy × chiều cao', 'cạnh × cạnh × 4'],
            ['Diện tích toàn phần', 'diện tích xung quanh + diện tích hai đáy', 'cạnh × cạnh × 6'],
            ['Thể tích', 'chiều dài × chiều rộng × chiều cao', 'cạnh × cạnh × cạnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các kích thước phải cùng một đơn vị đo trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Mỗi phần của bài được hỏi một lần, có hình vẽ kèm số đo. Sau đó, phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Hình thang có đáy lớn 12 cm, đáy bé 8 cm, chiều cao 5 cm. Tính diện tích hình thang.',
      steps: [
        'Tổng độ dài hai đáy: 12 + 8 = 20 (cm).',
        'Nhân với chiều cao: 20 × 5 = 100.',
        'Chia cho 2: 100 : 2 = 50.',
      ],
      answer: 'Diện tích hình thang là 50 cm².',
    },
    {
      problem:
        'Một bể cá dạng hình hộp chữ nhật dài 2 m, rộng 1,5 m, cao 1 m. Tính thể tích bể cá.',
      steps: [
        'Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao.',
        '2 × 1,5 × 1 = 3.',
      ],
      answer: 'Thể tích bể cá là 3 m³.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình tam giác có một góc tù gọi là hình gì?',
      options: ['Hình tam giác tù', 'Hình tam giác nhọn', 'Hình tam giác vuông', 'Hình thang'],
      answer: 0,
      hints: ['Tên của hình tam giác gọi theo loại góc lớn nhất của nó.'],
      solution: 'Hình tam giác có một góc tù là hình tam giác tù.',
    },
    {
      type: 'choice',
      prompt: 'Hình thang có mấy cặp cạnh đối diện song song?',
      options: ['Một cặp', 'Hai cặp', 'Không có cặp nào', 'Ba cặp'],
      answer: 0,
      hints: ['Hai cạnh song song của hình thang được gọi là hai đáy.'],
      solution: 'Hình thang có một cặp cạnh đối diện song song, đó là hai đáy.',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác có độ dài đáy 15 cm, chiều cao 8 cm. Tính diện tích hình tam giác.',
      answer: 60,
      unit: 'cm²',
      hints: ['Lấy độ dài đáy nhân với chiều cao rồi chia cho 2.'],
      solution: 'S = 15 × 8 : 2 = 60 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình tam giác vuông có hai cạnh góc vuông dài 6 cm và 9 cm. Tính diện tích hình tam giác.',
      answer: 27,
      unit: 'cm²',
      hints: [
        'Trong tam giác vuông, một cạnh góc vuông là đáy thì cạnh góc vuông kia là chiều cao.',
      ],
      solution: 'S = 6 × 9 : 2 = 27 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình thang có đáy lớn 14 m, đáy bé 10 m, chiều cao 7 m. Tính diện tích hình thang.',
      answer: 84,
      unit: 'm²',
      hints: ['Cộng hai đáy, nhân với chiều cao, rồi chia cho 2.'],
      solution: 'S = (14 + 10) × 7 : 2 = 84 (m²).',
    },
    {
      type: 'number',
      prompt: 'Tính chu vi hình tròn có bán kính 5 cm.',
      answer: 31.4,
      unit: 'cm',
      hints: ['Chu vi = bán kính × 2 × 3,14.'],
      solution: 'C = 5 × 2 × 3,14 = 31,4 (cm).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình tròn có đường kính 6 dm.',
      answer: 28.26,
      unit: 'dm²',
      hints: ['Đề cho đường kính. Em tìm bán kính trước.'],
      solution: 'Bán kính: 6 : 2 = 3 (dm). S = 3 × 3 × 3,14 = 28,26 (dm²).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với cách tính của nó.',
      left: [
        'Diện tích hình tam giác',
        'Chu vi hình tròn',
        'Thể tích hình lập phương',
        'Diện tích xung quanh hình hộp chữ nhật',
      ],
      right: [
        'đáy × chiều cao : 2',
        'đường kính × 3,14',
        'cạnh × cạnh × cạnh',
        'chu vi đáy × chiều cao',
        'cạnh × cạnh × 6',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Diện tích là số đo hai chiều, thể tích là số đo ba chiều.'],
      solution:
        'Diện tích hình tam giác = đáy × chiều cao : 2. Chu vi hình tròn = đường kính × 3,14. Thể tích hình lập phương = cạnh × cạnh × cạnh. Diện tích xung quanh hình hộp chữ nhật = chu vi đáy × chiều cao.',
    },
    {
      type: 'number',
      prompt:
        'Hình hộp chữ nhật có chiều dài 8 dm, chiều rộng 5 dm, chiều cao 4 dm. Tính diện tích xung quanh.',
      answer: 104,
      unit: 'dm²',
      hints: ['Tìm chu vi mặt đáy trước, rồi nhân với chiều cao.'],
      solution: 'Chu vi đáy: (8 + 5) × 2 = 26 (dm). Diện tích xung quanh: 26 × 4 = 104 (dm²).',
    },
    {
      type: 'number',
      prompt: 'Hình lập phương có cạnh 5 cm. Tính diện tích toàn phần.',
      answer: 150,
      unit: 'cm²',
      hints: ['Hình lập phương có 6 mặt là hình vuông bằng nhau.'],
      solution: 'Diện tích một mặt: 5 × 5 = 25 (cm²). Diện tích toàn phần: 25 × 6 = 150 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một thùng hàng dạng hình hộp chữ nhật dài 1,5 m, rộng 1,2 m, cao 0,8 m. Tính thể tích thùng hàng.',
      answer: 1.44,
      unit: 'm³',
      hints: ['Thể tích = chiều dài × chiều rộng × chiều cao.'],
      solution: 'V = 1,5 × 1,2 × 0,8 = 1,8 × 0,8 = 1,44 (m³).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình lập phương có cạnh 0,4 m.',
      answer: 0.064,
      unit: 'm³',
      hints: ['Thể tích = cạnh × cạnh × cạnh.'],
      solution: 'V = 0,4 × 0,4 × 0,4 = 0,16 × 0,4 = 0,064 (m³).',
    },
  ],
  takeaways: [
    'Diện tích hình tam giác = đáy × chiều cao : 2.',
    'Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2.',
    'Chu vi hình tròn = đường kính × 3,14; diện tích hình tròn = bán kính × bán kính × 3,14.',
    'Hình hộp chữ nhật: thể tích = dài × rộng × cao. Hình lập phương: thể tích = cạnh × cạnh × cạnh.',
  ],
};
