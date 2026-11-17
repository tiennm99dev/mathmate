/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu đồ hình quạt tròn: cả hình tròn biểu diễn 100%, mỗi hình quạt biểu diễn tỉ số phần trăm của một phần so với tổng số. Đọc tỉ số phần trăm trên biểu đồ và tính số lượng của từng phần.',
  intro:
    '100 bạn chọn hoạt động dã ngoại mình thích. Kết quả được vẽ thành một hình tròn chia nhiều phần. Phần nào to nhất? Mỗi phần có bao nhiêu bạn? Em cùng đọc biểu đồ hình quạt tròn nhé!',
  objectives: [
    'Đọc được tỉ số phần trăm của từng phần trên biểu đồ hình quạt tròn.',
    'So sánh các phần và tìm phần lớn nhất, phần bé nhất.',
    'Tính được số lượng của một phần khi biết tổng số và tỉ số phần trăm.',
  ],
  sections: [
    {
      heading: 'Đọc biểu đồ hình quạt tròn',
      blocks: [
        {
          type: 'p',
          text: 'Biểu đồ dưới đây cho biết kết quả khảo sát hoạt động dã ngoại yêu thích của 100 học sinh.',
        },
        { type: 'widget', name: 'da-ngoai' },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Biểu đồ hình quạt tròn: cả hình tròn biểu diễn tổng số, tức là 100%. Mỗi hình quạt biểu diễn tỉ số phần trăm của một phần so với tổng số.',
        },
        {
          type: 'p',
          text: 'Hình quạt "Leo núi" ghi 30%: có 30% số học sinh thích leo núi.',
        },
        {
          type: 'p',
          text: 'Hình quạt "Thăm trang trại" to nhất, ghi 45%: thăm trang trại được nhiều bạn thích nhất.',
        },
        {
          type: 'p',
          text: 'Cộng các phần: 45% + 30% + 25% = 100%.',
        },
      ],
    },
    {
      heading: 'Tính số lượng của từng phần',
      blocks: [
        {
          type: 'p',
          text: 'Có 100 học sinh, 45% thích thăm trang trại. Số bạn thích thăm trang trại là: 100 × 45 : 100 = 45 (bạn).',
        },
        {
          type: 'p',
          text: 'Có 30 học sinh, 20% thích giải câu đố. Số bạn thích giải câu đố là: 30 × 20 : 100 = 6 (bạn).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số lượng của một phần = Tổng số × Tỉ số phần trăm : 100.',
        },
      ],
    },
    {
      heading: 'Từ bảng số liệu đến biểu đồ',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi bạn trong 20 học sinh mang theo một đồ vật khi đến vườn quốc gia.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Số học sinh', 'Tỉ số phần trăm'],
          rows: [
            ['Kính lúp', '13', '13 : 20 = 0,65 = 65%'],
            ['Đèn pin', '2', '2 : 20 = 0,1 = 10%'],
            ['Thuốc xịt côn trùng', '5', '5 : 20 = 0,25 = 25%'],
          ],
        },
        {
          type: 'p',
          text: 'Phần nào có nhiều học sinh hơn thì hình quạt của phần đó to hơn. Hình quạt kính lúp chiếm hơn nửa hình tròn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Nửa hình tròn là 50%. Một phần tư hình tròn là 25%. Em dựa vào đó để ước lượng các phần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ biểu đồ hình quạt tròn',
    instruction:
      'Em chọn một bảng số liệu. Kéo các chấm đen trên vòng tròn (hoặc dùng phím mũi tên) để đổi độ rộng các hình quạt. Mỗi lần kéo, phần trăm của các phần thay đổi. Em kéo cho đến khi biểu đồ khớp với bảng.',
  },
  examples: [
    {
      problem:
        'Có 30 học sinh chọn hoạt động cuối tuần yêu thích: đọc sách 40%, chơi thể thao 30%, giải câu đố 20%, chăm sóc cây 10%. Hoạt động nào được thích nhất? Có bao nhiêu bạn thích đọc sách?',
      steps: [
        'So sánh: 40% > 30% > 20% > 10%. Đọc sách có tỉ số phần trăm lớn nhất.',
        'Số bạn thích đọc sách là: 30 × 40 : 100 = 12 (bạn).',
      ],
      answer: 'Đọc sách được thích nhất, có 12 bạn thích đọc sách.',
    },
    {
      problem:
        'Một cửa hàng bán được 1 000 chiếc áo cỡ S, M, L. Biểu đồ cho biết: cỡ L 50%, cỡ M 30%, cỡ S 20%. Cửa hàng bán được bao nhiêu chiếc áo cỡ M?',
      steps: [
        'Áo cỡ M chiếm 30% số áo.',
        'Số áo cỡ M là: 1 000 × 30 : 100 = 300 (chiếc).',
        'Kiểm tra: 50% + 30% + 20% = 100%.',
      ],
      answer: 'Cửa hàng bán được 300 chiếc áo cỡ M.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Biểu đồ dã ngoại: thăm trang trại 45%, leo núi 30%, cắm trại 25%. Có bao nhiêu phần trăm số học sinh thích leo núi?',
      options: ['30%', '45%', '25%', '70%'],
      answer: 0,
      hints: ['Tìm hình quạt có tên "Leo núi".'],
      solution: 'Hình quạt "Leo núi" ghi 30%.',
    },
    {
      type: 'number',
      prompt:
        'Có 100 học sinh được hỏi, 45% thích thăm trang trại. Có bao nhiêu học sinh thích thăm trang trại?',
      answer: 45,
      unit: 'học sinh',
      hints: ['Số lượng = Tổng số × Tỉ số phần trăm : 100.'],
      solution: '100 × 45 : 100 = 45 (học sinh).',
    },
    {
      type: 'choice',
      prompt: 'Cả hình tròn của biểu đồ hình quạt tròn biểu diễn bao nhiêu phần trăm?',
      options: ['100%', '50%', '10%', '360%'],
      answer: 0,
      hints: ['Cả hình tròn là tổng số.'],
      solution: 'Cả hình tròn biểu diễn tổng số, tức là 100%.',
    },
    {
      type: 'number',
      prompt:
        'Trong một nhóm học sinh, 65% mang kính lúp, 10% mang đèn pin, còn lại mang thuốc xịt côn trùng. Bao nhiêu phần trăm số học sinh mang thuốc xịt côn trùng?',
      answer: 25,
      unit: '%',
      hints: ['Các phần cộng lại bằng 100%.', 'Lấy 100% trừ đi 65% và 10%.'],
      solution: '100% − 65% − 10% = 25%.',
    },
    {
      type: 'number',
      prompt:
        'Có 30 học sinh tham gia khảo sát, 20% thích giải câu đố. Có bao nhiêu học sinh thích giải câu đố?',
      answer: 6,
      unit: 'học sinh',
      hints: ['Tính 30 × 20 : 100.'],
      solution: '30 × 20 : 100 = 6 (học sinh).',
    },
    {
      type: 'choice',
      prompt:
        '20 học sinh mang đồ vật: kính lúp 13 bạn, đèn pin 2 bạn, thuốc xịt côn trùng 5 bạn. Biểu đồ nào đúng?',
      options: [
        'Kính lúp 65%, đèn pin 10%, thuốc xịt 25%',
        'Kính lúp 13%, đèn pin 2%, thuốc xịt 5%',
        'Kính lúp 60%, đèn pin 15%, thuốc xịt 25%',
        'Kính lúp 65%, đèn pin 25%, thuốc xịt 10%',
      ],
      answer: 0,
      hints: ['Tỉ số phần trăm = Số học sinh : 20 × 100.', 'Ví dụ: 13 : 20 = 0,65.'],
      solution: '13 : 20 = 0,65 = 65%; 2 : 20 = 0,1 = 10%; 5 : 20 = 0,25 = 25%.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 5A có 40 học sinh. Biểu đồ cho biết 50% số học sinh thích bóng đá. Có bao nhiêu học sinh thích bóng đá?',
      answer: 20,
      unit: 'học sinh',
      hints: ['50% là một nửa.', 'Tính 40 × 50 : 100.'],
      solution: '40 × 50 : 100 = 20 (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng bán được 1 000 chiếc áo: cỡ L chiếm 50%, cỡ S chiếm 20%, còn lại là cỡ M. Cửa hàng bán được bao nhiêu chiếc áo cỡ M?',
      answer: 300,
      unit: 'chiếc',
      hints: [
        'Tìm tỉ số phần trăm của áo cỡ M trước: 100% − 50% − 20%.',
        'Rồi tính 1 000 × 30 : 100.',
      ],
      solution:
        'Áo cỡ M chiếm: 100% − 50% − 20% = 30%. Số áo cỡ M: 1 000 × 30 : 100 = 300 (chiếc).',
    },
  ],
  takeaways: [
    'Cả hình tròn biểu diễn tổng số, là 100%.',
    'Mỗi hình quạt cho biết tỉ số phần trăm của một phần. Hình quạt to hơn thì phần đó nhiều hơn.',
    'Số lượng của một phần = Tổng số × Tỉ số phần trăm : 100.',
  ],
};
