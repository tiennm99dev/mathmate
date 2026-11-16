/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học: góc nhọn, góc vuông, góc tù, góc bẹt, đo góc bằng thước đo góc, hai đường thẳng vuông góc, hai đường thẳng song song, hình bình hành và hình thoi.',
  intro:
    'Em đã học về góc, đường thẳng vuông góc, đường thẳng song song, hình bình hành và hình thoi. Hôm nay em ôn lại tất cả. Bài ôn tập sẽ hỏi thêm phần nào em còn sai nhé!',
  objectives: [
    'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt.',
    'Đọc số đo của góc trên thước đo góc.',
    'Nhận biết hai cạnh vuông góc, hai cạnh song song.',
    'Nhận biết hình bình hành, hình thoi và độ dài các cạnh của chúng.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Các loại góc',
      blocks: [
        {
          type: 'table',
          head: ['Góc', 'Số đo'],
          rows: [
            ['Góc nhọn', 'bé hơn 90°'],
            ['Góc vuông', 'bằng 90°'],
            ['Góc tù', 'lớn hơn 90°, bé hơn 180°'],
            ['Góc bẹt', 'bằng 180°'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo góc',
          text: 'Em đặt tâm của thước đo góc trùng với đỉnh góc, một cạnh đi qua vạch 0. Em đọc số ở chỗ cạnh kia đi qua, trên vòng số có vạch 0 nằm trên cạnh thứ nhất.',
        },
      ],
    },
    {
      heading: 'Đường thẳng vuông góc, đường thẳng song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh. Em kiểm tra bằng ê ke.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hai đường thẳng song song với nhau thì không bao giờ cắt nhau.',
        },
        {
          type: 'p',
          text: 'Trong hình chữ nhật ABCD: AB vuông góc với AD; AB song song với DC.',
        },
      ],
    },
    {
      heading: 'Hình bình hành, hình thoi',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em nhìn hình rồi chạm đáp án đúng. Mỗi phần được hỏi một lần, sau đó phần nào em còn sai sẽ được hỏi lại nhiều hơn. Sai lần đầu sẽ có gợi ý. Bảng màu ở cuối cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem: 'Lúc 5 giờ, kim giờ và kim phút tạo thành góc gì?',
      steps: [
        'Kim phút chỉ số 12, kim giờ chỉ số 5.',
        'Lúc 3 giờ hai kim tạo thành góc vuông, lúc 6 giờ tạo thành góc bẹt.',
        'Lúc 5 giờ, góc giữa hai kim lớn hơn góc vuông và bé hơn góc bẹt.',
      ],
      answer: 'Lúc 5 giờ, hai kim tạo thành góc tù.',
    },
    {
      problem: 'Hình bình hành ABCD có AB = 5 cm, BC = 3 cm. Tính độ dài cạnh DC và cạnh AD.',
      steps: [
        'Hình bình hành có hai cặp cạnh đối diện bằng nhau.',
        'DC đối diện với AB, nên DC = AB = 5 cm.',
        'AD đối diện với BC, nên AD = BC = 3 cm.',
      ],
      answer: 'DC = 5 cm, AD = 3 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lúc mấy giờ thì kim giờ và kim phút tạo thành góc tù?',
      options: ['4 giờ', '3 giờ', '2 giờ', '6 giờ'],
      answer: 0,
      hints: ['Lúc 3 giờ hai kim tạo thành góc vuông, lúc 6 giờ tạo thành góc bẹt.'],
      solution:
        'Lúc 2 giờ: góc nhọn. Lúc 3 giờ: góc vuông. Lúc 4 giờ: góc tù. Lúc 6 giờ: góc bẹt. Vậy chọn 4 giờ.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi góc với tên của nó.',
      left: ['Góc 35°', 'Góc 90°', 'Góc 130°', 'Góc 180°'],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['So sánh số đo với 90° và 180°.'],
      solution: '35° < 90°: góc nhọn. 90°: góc vuông. 90° < 130° < 180°: góc tù. 180°: góc bẹt.',
    },
    {
      type: 'choice',
      prompt:
        'Thước đo góc đặt lên góc đỉnh O; cạnh OA, OB. Cạnh OA đi qua vạch 0 của vòng số trong. Cạnh OB đi qua vạch 65 của vòng số trong và vạch 115 của vòng số ngoài. Góc đỉnh O bằng bao nhiêu độ?',
      options: ['65°', '115°', '50°', '180°'],
      answer: 0,
      hints: ['Vạch 0 nằm trên cạnh OA thuộc vòng số nào? Em đọc số trên vòng số đó.'],
      solution:
        'Vạch 0 của vòng số trong nằm trên OA, nên em đọc ở vòng số trong: góc đỉnh O bằng 65°.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác MNPQ có góc đỉnh M và góc đỉnh N đều bằng 115°, góc đỉnh P và góc đỉnh Q đều bằng 65°. Góc đỉnh M là góc gì?',
      options: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'],
      answer: 0,
      hints: ['So sánh 115° với 90° và 180°.'],
      solution: '115° lớn hơn 90° và bé hơn 180°, nên góc đỉnh M là góc tù.',
    },
    {
      type: 'multi',
      prompt:
        'Tứ giác ABCD chỉ có hai góc vuông là góc đỉnh A và góc đỉnh C. Những cặp cạnh nào vuông góc với nhau?',
      options: ['AB và AD', 'CB và CD', 'BA và BC', 'DA và DC'],
      answers: [0, 1],
      hints: ['Hai cạnh vuông góc tạo thành góc vuông. Góc vuông ở những đỉnh nào?'],
      solution:
        'Góc đỉnh A vuông nên AB vuông góc với AD. Góc đỉnh C vuông nên CB vuông góc với CD. Góc đỉnh B và góc đỉnh D không vuông.',
    },
    {
      type: 'choice',
      prompt: 'Trong hình chữ nhật ABCD, cạnh AB song song với cạnh nào?',
      options: ['DC', 'AD', 'BC'],
      answer: 0,
      hints: ['Cạnh song song với AB là cạnh đối diện, không có đỉnh chung với AB.'],
      solution: 'AB và DC là hai cạnh đối diện của hình chữ nhật, nên AB song song với DC.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?',
      options: ['4 góc vuông', '2 góc vuông', '1 góc vuông'],
      answer: 0,
      hints: ['Hai đường thẳng cắt nhau tạo thành bốn góc có chung đỉnh.'],
      solution: 'Hai đường thẳng vuông góc tạo thành bốn góc vuông có chung đỉnh.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành ABCD có AB = 5 cm, AD = 3 cm. Cạnh DC dài bao nhiêu xăng-ti-mét?',
      answer: 5,
      unit: 'cm',
      hints: ['DC là cạnh đối diện với cạnh nào?'],
      solution:
        'DC đối diện với AB. Hình bình hành có các cạnh đối diện bằng nhau, nên DC = AB = 5 cm.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành ABCD có AB = 5 cm, AD = 3 cm. Cạnh BC dài bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['BC là cạnh đối diện với cạnh nào?'],
      solution: 'BC đối diện với AD, nên BC = AD = 3 cm.',
    },
    {
      type: 'number',
      prompt: 'Hình thoi MNPQ có cạnh MN = 4 cm. Cạnh PQ dài bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['Hình thoi có bốn cạnh như thế nào với nhau?'],
      solution: 'Hình thoi có bốn cạnh bằng nhau, nên PQ = MN = 4 cm.',
    },
    {
      type: 'multi',
      prompt: 'Những câu nào đúng?',
      options: [
        'Hình bình hành có hai cặp cạnh đối diện song song.',
        'Hình thoi có bốn cạnh bằng nhau.',
        'Hình bình hành nào cũng có bốn góc vuông.',
        'Hình thoi có hai cặp cạnh đối diện song song.',
      ],
      answers: [0, 1, 3],
      hints: [
        'Em nhớ lại đặc điểm của hình bình hành và hình thoi. Có hình bình hành nào không có góc vuông không?',
      ],
      solution:
        'Hình bình hành và hình thoi đều có hai cặp cạnh đối diện song song; hình thoi có bốn cạnh bằng nhau. Nhiều hình bình hành không có góc vuông nào, nên câu "Hình bình hành nào cũng có bốn góc vuông" sai.',
    },
    {
      type: 'choice',
      prompt: 'Em dùng dụng cụ nào để kiểm tra một góc có phải góc vuông không?',
      options: ['Ê ke', 'Compa', 'Bút chì'],
      answer: 0,
      hints: ['Dụng cụ này có một góc vuông.'],
      solution:
        'Em đặt góc vuông của ê ke vào góc cần kiểm tra. Hai cạnh khớp nhau thì đó là góc vuông.',
    },
  ],
  takeaways: [
    'Góc nhọn bé hơn 90°, góc vuông bằng 90°, góc tù lớn hơn 90° và bé hơn 180°, góc bẹt bằng 180°.',
    'Hai đường thẳng vuông góc tạo thành bốn góc vuông; hai đường thẳng song song không bao giờ cắt nhau.',
    'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau; hình thoi có thêm bốn cạnh bằng nhau.',
  ],
};
