/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình khai triển của hình lập phương (6 hình vuông bằng nhau), hình hộp chữ nhật (6 hình chữ nhật) và hình trụ (1 hình chữ nhật và 2 hình tròn); nhận biết hình gấp được thành hình lập phương.',
  intro:
    'Mai cắt một hộp giấy theo các cạnh rồi trải phẳng ra. Hộp giấy thành một hình phẳng gồm nhiều mặt nối liền nhau. Hình đó gọi là gì? Gấp lại có thành cái hộp không?',
  objectives: [
    'Nhận biết hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ.',
    'Nhận biết hình nào gấp được thành hình lập phương.',
  ],
  sections: [
    {
      heading: 'Hình khai triển là gì?',
      blocks: [
        {
          type: 'p',
          text: 'Em cắt một hình khối bằng giấy theo một số cạnh rồi trải phẳng các mặt ra. Các mặt vẫn nối liền nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hình phẳng có được khi trải các mặt của một hình khối ra gọi là hình khai triển của hình khối đó.',
        },
        {
          type: 'p',
          text: 'Gấp hình khai triển lại theo các nếp gấp, em lại được hình khối ban đầu.',
        },
      ],
    },
    {
      heading: 'Hình khai triển của ba hình khối',
      blocks: [
        {
          type: 'table',
          head: ['Hình khối', 'Hình khai triển gồm'],
          rows: [
            ['Hình lập phương', '6 hình vuông bằng nhau'],
            ['Hình hộp chữ nhật', '6 hình chữ nhật: 4 mặt xung quanh và 2 mặt đáy'],
            ['Hình trụ', '1 hình chữ nhật và 2 hình tròn bằng nhau'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình lập phương có 6 mặt là 6 hình vuông bằng nhau. Hình hộp chữ nhật có 6 mặt là 6 hình chữ nhật, hai mặt đối diện thì bằng nhau.',
        },
        {
          type: 'p',
          text: 'Hình trụ: hình chữ nhật cuộn tròn lại thành mặt xung quanh, hai hình tròn là hai mặt đáy.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bóc nhãn của một hộp sữa hình trụ ra, em được một hình chữ nhật.',
        },
      ],
    },
    {
      heading: 'Hình nào gấp được thành hình lập phương?',
      blocks: [
        {
          type: 'p',
          text: 'Không phải cứ có 6 hình vuông nối liền nhau là gấp được thành hình lập phương. Em chọn một hình, đoán trước, rồi gấp để kiểm tra.',
        },
        { type: 'widget', name: 'nets' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Gấp lại mà có hai mặt chồng lên nhau, còn một mặt bị hở, thì hình đó không phải hình khai triển của hình lập phương.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mở ra và gấp lại',
    instruction:
      'Em chọn một hình khối. Bấm "Gấp lại" để gấp hình khai triển, bấm "Mở ra" để trải phẳng. Kéo hình để xoay.',
  },
  examples: [
    {
      problem:
        'Mai cắt một hộp giấy hình lập phương theo một số cạnh rồi trải phẳng. Hình khai triển Mai có gồm những hình gì?',
      steps: [
        'Hình lập phương có 6 mặt.',
        'Mỗi mặt là một hình vuông, các mặt bằng nhau.',
        'Trải phẳng ra, 6 mặt đó nằm liền nhau trên mặt bàn.',
      ],
      answer: 'Hình khai triển gồm 6 hình vuông bằng nhau.',
    },
    {
      problem:
        'Nam bóc nhãn của một hộp sữa hình trụ, rồi vẽ lại nắp hộp và đáy hộp lên giấy. Nam được hình khai triển của hình trụ gồm những hình gì?',
      steps: [
        'Nhãn hộp sữa bọc mặt xung quanh. Bóc ra, nhãn là một hình chữ nhật.',
        'Nắp hộp và đáy hộp là hai hình tròn bằng nhau.',
      ],
      answer: 'Hình khai triển của hình trụ gồm 1 hình chữ nhật và 2 hình tròn bằng nhau.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hình khai triển của hình lập phương có bao nhiêu hình vuông?',
      answer: 6,
      hints: ['Em đếm số mặt của hình lập phương.'],
      solution: 'Hình lập phương có 6 mặt, nên hình khai triển có 6 hình vuông bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Hình khai triển của hình trụ gồm những hình nào?',
      options: [
        '1 hình chữ nhật và 2 hình tròn',
        '2 hình chữ nhật và 1 hình tròn',
        '6 hình chữ nhật',
      ],
      answer: 0,
      hints: [
        'Hình trụ có một mặt xung quanh và hai mặt đáy.',
        'Mặt đáy của hình trụ là hình tròn.',
      ],
      solution:
        'Mặt xung quanh trải phẳng là 1 hình chữ nhật, hai mặt đáy là 2 hình tròn bằng nhau.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình khối với hình khai triển của nó.',
      left: ['Hình lập phương', 'Hình hộp chữ nhật', 'Hình trụ'],
      right: [
        '6 hình vuông bằng nhau',
        '6 hình chữ nhật',
        '1 hình chữ nhật và 2 hình tròn',
        '4 hình tam giác',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em nhớ lại mặt của mỗi hình khối là hình gì.'],
      solution:
        'Hình lập phương: 6 hình vuông bằng nhau. Hình hộp chữ nhật: 6 hình chữ nhật. Hình trụ: 1 hình chữ nhật và 2 hình tròn.',
    },
    {
      type: 'choice',
      prompt:
        'Sáu hình vuông bằng nhau xếp thành 2 hàng, mỗi hàng 3 hình vuông, thẳng cột với nhau. Hình đó có gấp được thành hình lập phương không?',
      options: ['Không gấp được', 'Gấp được'],
      answer: 0,
      hints: [
        'Em thử gấp Hình B ở phần "Hình nào gấp được".',
        'Có bốn hình vuông xếp thành một hình vuông to.',
      ],
      solution:
        'Gấp lại thì có hai mặt chồng lên nhau và một mặt bị hở, nên hình đó không gấp được thành hình lập phương.',
    },
    {
      type: 'choice',
      prompt:
        'Bốn hình vuông xếp thành một hàng. Một hình vuông nằm trên hình vuông thứ hai, một hình vuông nằm dưới hình vuông thứ hai. Hình đó có gấp được thành hình lập phương không?',
      options: ['Gấp được', 'Không gấp được'],
      answer: 0,
      hints: [
        'Bốn hình vuông một hàng gấp thành bốn mặt xung quanh.',
        'Hai hình vuông còn lại ở hai phía khác nhau.',
      ],
      solution:
        'Bốn hình vuông một hàng thành bốn mặt xung quanh, hình vuông ở trên thành mặt đáy trên, hình vuông ở dưới thành mặt đáy dưới. Hình đó gấp được thành hình lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Gấp hình khai triển của hình trụ, hình chữ nhật trở thành mặt nào?',
      options: ['Mặt xung quanh', 'Mặt đáy', 'Không thành mặt nào'],
      answer: 0,
      hints: ['Hình chữ nhật cuộn tròn lại.'],
      solution: 'Hình chữ nhật cuộn tròn thành mặt xung quanh, hai hình tròn là hai mặt đáy.',
    },
    {
      type: 'number',
      prompt:
        'Hình khai triển của hình hộp chữ nhật có 6 hình chữ nhật. Trong đó có mấy mặt xung quanh?',
      answer: 4,
      hints: ['Hình hộp chữ nhật có 2 mặt đáy.', 'Em tính 6 − 2.'],
      solution: '6 − 2 = 4. Hình hộp chữ nhật có 4 mặt xung quanh và 2 mặt đáy.',
    },
    {
      type: 'choice',
      prompt: 'Câu nào đúng?',
      options: [
        'Có 6 hình vuông nối liền nhau chưa chắc đã gấp được thành hình lập phương',
        'Cứ có 6 hình vuông nối liền nhau là gấp được thành hình lập phương',
        'Hình khai triển của hình lập phương có 4 hình vuông',
      ],
      answer: 0,
      hints: ['Em nhớ lại Hình B và Hình D.'],
      solution:
        'Hình B và Hình D đều có 6 hình vuông nối liền nhau nhưng gấp lại có hai mặt chồng lên nhau. Vậy có 6 hình vuông nối liền nhau chưa chắc đã gấp được thành hình lập phương.',
    },
  ],
  takeaways: [
    'Trải phẳng các mặt của một hình khối, ta được hình khai triển của hình đó.',
    'Hình khai triển của hình lập phương gồm 6 hình vuông bằng nhau.',
    'Hình khai triển của hình hộp chữ nhật gồm 6 hình chữ nhật.',
    'Hình khai triển của hình trụ gồm 1 hình chữ nhật và 2 hình tròn bằng nhau.',
    'Có 6 hình vuông chưa chắc đã gấp được thành hình lập phương: em gấp thử để kiểm tra.',
  ],
};
