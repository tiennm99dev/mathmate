/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kéo dài hai cạnh đối diện của hình chữ nhật, ta được hai đường thẳng song song. Hai đường thẳng song song với nhau không bao giờ cắt nhau.',
  intro:
    'Hai thanh ray đường tàu chạy mãi mà không bao giờ gặp nhau. Hôm nay em học hai đường thẳng song song nhé!',
  objectives: [
    'Nhận biết hai đường thẳng song song với nhau.',
    'Biết hai đường thẳng song song không bao giờ cắt nhau.',
    'Tìm được các cặp cạnh song song trong hình chữ nhật, hình vuông và quanh em.',
  ],
  sections: [
    {
      heading: 'Hai đường thẳng song song',
      blocks: [
        {
          type: 'p',
          text: 'Em vẽ hình chữ nhật ABCD. Kéo dài hai cạnh AB và DC về cả hai phía, ta được hai đường thẳng AB và DC.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường thẳng song song',
          text: 'Hai đường thẳng AB và DC song song với nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai đường thẳng song song với nhau không bao giờ cắt nhau.',
        },
        {
          type: 'p',
          text: 'Kéo dài hai cạnh AD và BC, ta cũng được hai đường thẳng song song với nhau.',
        },
      ],
    },
    {
      heading: 'Song song hay cắt nhau?',
      blocks: [
        {
          type: 'p',
          text: 'Có hai đường thẳng trông như không gặp nhau. Em kéo dài chúng ra thật xa. Nếu chúng gặp nhau ở một điểm, chúng cắt nhau, không song song.',
        },
        {
          type: 'table',
          head: ['Hai đường thẳng', 'Kéo dài ra thì'],
          rows: [
            ['Song song', 'không bao giờ cắt nhau'],
            ['Vuông góc', 'cắt nhau, tạo thành bốn góc vuông'],
            ['Cắt nhau, không vuông góc', 'cắt nhau, không tạo thành góc vuông'],
          ],
        },
      ],
    },
    {
      heading: 'Quanh em',
      blocks: [
        {
          type: 'p',
          text: 'Hai thanh ray đường tàu, các vạch kẻ trên đường, các song sắt của lan can, hai mép đối diện của quyển vở là hình ảnh hai đường thẳng song song.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo dài để kiểm tra',
    instruction:
      'Em kéo các điểm A, B, C, D (hoặc bấm phím mũi tên). Bấm "Kéo dài hai đường thẳng" và "Nhìn ra xa" để xem hai đường thẳng có cắt nhau không. Sau đó em chọn "Xếp hình vào nhóm".',
  },
  examples: [
    {
      problem: 'Hình chữ nhật ABCD. Nêu các cặp cạnh song song với nhau.',
      steps: [
        'Hai cạnh đối diện AB và DC: kéo dài ra, chúng không bao giờ cắt nhau.',
        'Hai cạnh đối diện AD và BC: kéo dài ra, chúng cũng không bao giờ cắt nhau.',
      ],
      answer: 'AB song song với DC, AD song song với BC.',
    },
    {
      problem:
        'Hình chữ nhật ABCD được chia thành hai hình chữ nhật AMND và MBCN (M nằm trên AB, N nằm trên DC). Cạnh MN song song với những cạnh nào?',
      steps: [
        'Trong hình chữ nhật AMND, MN và AD là hai cạnh đối diện, nên MN song song với AD.',
        'Trong hình chữ nhật MBCN, MN và BC là hai cạnh đối diện, nên MN song song với BC.',
      ],
      answer: 'MN song song với AD và BC.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai đường thẳng song song với nhau thì thế nào?',
      options: ['Không bao giờ cắt nhau', 'Cắt nhau tại một điểm', 'Tạo thành bốn góc vuông'],
      answer: 0,
      hints: ['Nhớ hai thanh ray đường tàu.'],
      solution: 'Hai đường thẳng song song với nhau không bao giờ cắt nhau.',
    },
    {
      type: 'multi',
      prompt: 'Hình chữ nhật ABCD. Em chọn tất cả các cặp cạnh song song với nhau.',
      options: ['AB và DC', 'AD và BC', 'AB và AD', 'BC và CD'],
      answers: [0, 1],
      hints: ['Hai cạnh đối diện của hình chữ nhật song song với nhau.'],
      solution:
        'AB và DC, AD và BC là các cặp cạnh đối diện: chúng song song. AB và AD, BC và CD gặp nhau ở góc vuông: chúng vuông góc.',
    },
    {
      type: 'multi',
      prompt: 'Hình vuông MNPQ. Em chọn tất cả các cặp cạnh song song với nhau.',
      options: ['MN và QP', 'MQ và NP', 'MN và NP', 'QP và PN'],
      answers: [0, 1],
      hints: ['Hình vuông cũng có hai cặp cạnh đối diện.'],
      solution:
        'MN song song với QP, MQ song song với NP. MN và NP, QP và PN gặp nhau ở góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Hình chữ nhật ABCD được chia thành hai hình chữ nhật AMND và MBCN. Cạnh MN song song với những cạnh nào?',
      options: ['AD và BC', 'AB và DC', 'AM và DN', 'MB và NC'],
      answer: 0,
      hints: ['Trong hình chữ nhật AMND, cạnh nào đối diện với MN?'],
      solution:
        'MN đối diện AD trong hình chữ nhật AMND, đối diện BC trong hình chữ nhật MBCN. Vậy MN song song với AD và BC.',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có mấy cặp cạnh song song với nhau?',
      options: ['2 cặp', '1 cặp', '4 cặp', 'Không có cặp nào'],
      answer: 0,
      hints: ['Em đếm các cặp cạnh đối diện.'],
      solution: 'Hình chữ nhật ABCD có 2 cặp cạnh song song: AB và DC, AD và BC.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các hình ảnh hai đường thẳng song song.',
      options: [
        'Hai thanh ray đường tàu',
        'Hai mép đối diện của quyển vở',
        'Các song sắt của lan can',
        'Hai kim đồng hồ lúc 3 giờ',
        'Hai mép cạnh nhau của mặt bàn',
      ],
      answers: [0, 1, 2],
      hints: ['Song song là kéo dài mãi cũng không gặp nhau.'],
      solution:
        'Thanh ray, mép đối diện của vở, song sắt lan can không bao giờ gặp nhau: song song. Hai kim lúc 3 giờ và hai mép cạnh nhau của bàn gặp nhau ở góc vuông: vuông góc.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Mai xếp que diêm thành các chữ cái. Chữ cái nào có cả các que song song với nhau và các que vuông góc với nhau?',
      options: ['Chữ E', 'Chữ L', 'Chữ V', 'Chữ X'],
      answer: 0,
      hints: ['Chữ E có một que đứng và ba que nằm ngang.'],
      solution:
        'Chữ E: ba que nằm ngang song song với nhau, mỗi que nằm ngang vuông góc với que đứng. Chữ L chỉ có hai que vuông góc, chữ V và chữ X không có que song song.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng a và đường thẳng b song song với nhau. Em kéo dài cả hai thật dài. Điều gì xảy ra?',
      options: ['Chúng vẫn không cắt nhau', 'Chúng sẽ cắt nhau', 'Chúng vuông góc với nhau'],
      answer: 0,
      hints: ['Hai đường thẳng song song có bao giờ gặp nhau không?'],
      solution: 'Hai đường thẳng song song kéo dài bao nhiêu cũng không bao giờ cắt nhau.',
    },
  ],
  takeaways: [
    'Kéo dài hai cạnh đối diện của hình chữ nhật, ta được hai đường thẳng song song.',
    'Hai đường thẳng song song với nhau không bao giờ cắt nhau.',
  ],
};
