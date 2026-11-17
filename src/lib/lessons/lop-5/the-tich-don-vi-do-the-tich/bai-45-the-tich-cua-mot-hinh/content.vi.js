/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thể tích của một hình: hình xếp từ các khối lập phương nhỏ như nhau, hình nào có nhiều khối hơn thì có thể tích lớn hơn; tách một hình thành hai hình thì thể tích hình đó bằng tổng thể tích hai hình.',
  intro:
    'Rô-bốt xếp hai hình bằng các khối lập phương nhỏ giống nhau. Hình nào chiếm nhiều chỗ hơn? Hôm nay em học về thể tích của một hình.',
  objectives: [
    'Nhận biết thể tích của một hình.',
    'So sánh thể tích hai hình bằng cách đếm các khối lập phương nhỏ.',
    'Biết khi tách một hình thành hai hình thì thể tích hình đó bằng tổng thể tích hai hình.',
  ],
  sections: [
    {
      heading: 'So sánh thể tích hai hình',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi đồ vật, mỗi hình đều chiếm một phần không gian. Ta nói mỗi hình có một thể tích.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình được xếp từ các khối lập phương nhỏ giống nhau. Em đếm số khối để so sánh thể tích.',
        },
        {
          type: 'table',
          head: ['Hình', 'Số khối nhỏ', 'Kết luận'],
          rows: [
            ['A và B', '4 và 4', 'Thể tích hình A bằng thể tích hình B'],
            ['C và D', '5 và 4', 'Thể tích hình C lớn hơn thể tích hình D'],
            ['D và C', '4 và 5', 'Thể tích hình D bé hơn thể tích hình C'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình nào có nhiều khối lập phương nhỏ hơn thì có thể tích lớn hơn. Hai hình có cùng số khối thì thể tích bằng nhau, dù xếp khác dạng.',
        },
      ],
    },
    {
      heading: 'Tách một hình thành hai hình',
      blocks: [
        {
          type: 'p',
          text: 'Hình P gồm 6 khối lập phương nhỏ. Em tách hình P thành hình M gồm 4 khối và hình N gồm 2 khối.',
        },
        {
          type: 'p',
          text: '4 + 2 = 6. Không khối nào mất đi, không khối nào thêm vào.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Thể tích hình P bằng tổng thể tích hình M và hình N.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Ghép lại 6 khối đó thành một hình khác, thể tích vẫn không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp hình để so sánh thể tích',
    instruction:
      'Em chạm vào các ô của mặt bằng để đặt khối lập phương. Xếp một hình có thể tích như đề bài yêu cầu so với hình mẫu.',
  },
  examples: [
    {
      problem:
        'Hình hộp chữ nhật A gồm 16 khối lập phương nhỏ. Hình hộp chữ nhật B gồm 18 khối lập phương nhỏ như thế. Hình nào có thể tích lớn hơn?',
      steps: ['Hình A có 16 khối, hình B có 18 khối.', '16 < 18.'],
      answer: 'Thể tích hình B lớn hơn thể tích hình A.',
    },
    {
      problem:
        'Rô-bốt có một hình lập phương gồm 8 khối lập phương nhỏ. Rô-bốt tháo ra, xếp thành hình A gồm 6 khối và hình B gồm 2 khối. So sánh thể tích hình lập phương ban đầu với tổng thể tích hai hình A và B.',
      steps: [
        'Hai hình A và B có tất cả 6 + 2 = 8 khối.',
        'Hình lập phương ban đầu cũng có 8 khối.',
      ],
      answer: 'Thể tích hình lập phương ban đầu bằng tổng thể tích hai hình A và B.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Mai xếp một hình bằng các khối lập phương nhỏ như dưới đây. Hình đó gồm bao nhiêu khối?',
      picture: 'cube',
      answer: 7,
      choices: [6, 7, 8],
      hints: ['Em chạm vào từng khối để đếm.'],
      solution: 'Hình gồm 7 khối lập phương nhỏ.',
    },
    {
      type: 'choice',
      prompt:
        'Hình A gồm 16 khối lập phương nhỏ, hình B gồm 18 khối như thế. Hình nào có thể tích lớn hơn?',
      options: ['Hình B', 'Hình A', 'Hai hình có thể tích bằng nhau'],
      answer: 0,
      hints: ['Hình nào có nhiều khối hơn thì có thể tích lớn hơn.'],
      solution: '16 < 18, nên thể tích hình B lớn hơn thể tích hình A.',
    },
    {
      type: 'choice',
      prompt: 'Hình C gồm 8 khối lập phương nhỏ, hình D gồm 7 khối như thế. Câu nào đúng?',
      options: [
        'Thể tích hình C lớn hơn thể tích hình D',
        'Thể tích hình C bằng thể tích hình D',
        'Thể tích hình C bé hơn thể tích hình D',
      ],
      answer: 0,
      hints: ['So sánh 8 và 7.'],
      solution: '8 > 7, nên thể tích hình C lớn hơn thể tích hình D.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương gồm 8 khối nhỏ được tách thành hình A và hình B. Hình A gồm 6 khối. Hình B gồm bao nhiêu khối?',
      answer: 2,
      hints: ['Tách hình thì không mất khối nào.', 'Em tính 8 − 6.'],
      solution: '8 − 6 = 2. Hình B gồm 2 khối.',
    },
    {
      type: 'choice',
      prompt: 'Hình P được tách thành hai hình M và N. Câu nào đúng?',
      options: [
        'Thể tích hình P bằng tổng thể tích hình M và hình N',
        'Thể tích hình P bé hơn thể tích hình M',
        'Thể tích hình P bằng thể tích hình N',
      ],
      answer: 0,
      hints: ['Các khối của hình P chia ra cho hai hình M và N.'],
      solution:
        'Số khối của P bằng số khối của M cộng số khối của N, nên thể tích hình P bằng tổng thể tích hình M và hình N.',
    },
    {
      type: 'order',
      prompt: 'Xếp các hình theo thể tích từ bé đến lớn.',
      items: ['Hình A: 9 khối', 'Hình B: 5 khối', 'Hình C: 12 khối', 'Hình D: 7 khối'],
      answer: [1, 3, 0, 2],
      hints: ['Hình có ít khối nhất có thể tích bé nhất.'],
      solution: '5 < 7 < 9 < 12, nên thứ tự là hình B, hình D, hình A, hình C.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với hình có cùng thể tích. Các khối nhỏ đều như nhau.',
      left: ['6 khối xếp thành 1 hàng', '2 lớp, mỗi lớp 4 khối', '3 lớp, mỗi lớp 3 khối'],
      right: [
        '2 hàng, mỗi hàng 3 khối',
        '8 khối xếp thành 1 hàng',
        '9 khối xếp thành 1 hàng',
        '10 khối',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em tính số khối của mỗi hình.', '2 lớp, mỗi lớp 4 khối là 2 × 4 khối.'],
      solution:
        '2 × 3 = 6 khối; 2 × 4 = 8 khối; 3 × 3 = 9 khối. Hai hình cùng số khối thì thể tích bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt xếp 8 khối lập phương cạnh 1 cm thành một hàng thẳng, được một hình hộp chữ nhật. Hình hộp đó dài bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['Mỗi khối dài 1 cm. Có 8 khối nối tiếp nhau.'],
      solution: '8 khối, mỗi khối dài 1 cm, nên hình hộp dài 8 cm, rộng 1 cm, cao 1 cm.',
    },
    {
      type: 'choice',
      prompt:
        'Hai hình có cùng số khối lập phương nhỏ nhưng xếp khác dạng. Thể tích hai hình thế nào?',
      options: [
        'Bằng nhau',
        'Hình cao hơn có thể tích lớn hơn',
        'Hình dài hơn có thể tích lớn hơn',
      ],
      answer: 0,
      hints: ['Thể tích tính bằng số khối, không phụ thuộc cách xếp.'],
      solution: 'Hai hình có cùng số khối nên thể tích bằng nhau.',
    },
  ],
  takeaways: [
    'Mỗi hình có một thể tích.',
    'Hình xếp từ các khối lập phương nhỏ như nhau: hình nào có nhiều khối hơn thì thể tích lớn hơn.',
    'Tách một hình thành hai hình thì thể tích hình đó bằng tổng thể tích hai hình.',
  ],
};
