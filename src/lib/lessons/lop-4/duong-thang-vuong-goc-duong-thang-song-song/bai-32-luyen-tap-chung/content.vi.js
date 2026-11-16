/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Đường thẳng vuông góc, đường thẳng song song: nhận biết và vẽ hai đường thẳng vuông góc, song song bằng ê ke và thước, đặc điểm các cạnh của hình bình hành, hình thoi, hai kim đồng hồ vuông góc.',
  intro:
    'Em đã biết hai đường thẳng vuông góc, hai đường thẳng song song, hình bình hành và hình thoi. Giờ em luyện tập tất cả nhé!',
  objectives: [
    'Nhận biết hai đường thẳng, hai cạnh vuông góc hoặc song song với nhau.',
    'Nhớ cách vẽ đường thẳng vuông góc, song song bằng ê ke và thước.',
    'Dùng đặc điểm các cạnh của hình bình hành, hình thoi để tìm độ dài cạnh.',
  ],
  sections: [
    {
      heading: 'Nhắc lại: vuông góc và song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hai đường thẳng cắt nhau tạo thành bốn góc vuông là hai đường thẳng vuông góc với nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hai đường thẳng kéo dài mãi về hai phía mà không bao giờ cắt nhau là hai đường thẳng song song với nhau.',
        },
        {
          type: 'p',
          text: 'Em dùng góc vuông của ê ke để kiểm tra hai đường thẳng có vuông góc với nhau không.',
        },
      ],
    },
    {
      heading: 'Nhắc lại cách vẽ',
      blocks: [
        {
          type: 'p',
          text: 'Vẽ đường thẳng qua điểm H, vuông góc với AB: đặt một cạnh góc vuông của ê ke trên AB, trượt ê ke cho cạnh góc vuông kia gặp H, rồi vẽ theo cạnh đó.',
        },
        {
          type: 'p',
          text: 'Vẽ đường thẳng CD qua điểm H, song song với AB: em làm hai bước.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng MN qua H, vuông góc với AB.',
            'Vẽ đường thẳng CD qua H, vuông góc với MN.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đường thẳng CD đi qua H và song song với AB.',
        },
      ],
    },
    {
      heading: 'Nhắc lại: hình bình hành, hình thoi',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Đặc điểm'],
          rows: [
            ['Hình bình hành', 'Hai cặp cạnh đối diện song song và bằng nhau'],
            ['Hình thoi', 'Hai cặp cạnh đối diện song song và bốn cạnh bằng nhau'],
          ],
        },
        {
          type: 'p',
          text: 'Lúc 3 giờ và lúc 9 giờ, kim giờ và kim phút vuông góc với nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em đọc câu hỏi, nhìn hình rồi bấm vào đáp án. Nếu chưa đúng, em xem gợi ý và thử lại. Làm xong, em bấm "Làm bộ bài khác" để luyện thêm.',
  },
  examples: [
    {
      problem:
        'Hình chữ nhật ABCD có AB là cạnh dài ở dưới, DC là cạnh dài ở trên. Tìm một cặp cạnh song song và một cặp cạnh vuông góc.',
      steps: [
        'AB và DC là hai cạnh đối diện. Kéo dài mãi, chúng không cắt nhau.',
        'AB và AD gặp nhau ở đỉnh A, tạo thành góc vuông.',
      ],
      answer: 'AB song song với DC. AB vuông góc với AD.',
    },
    {
      problem: 'Hình bình hành MNPQ có MN = 7 cm, NP = 4 cm. Tính độ dài cạnh PQ và cạnh QM.',
      steps: [
        'Hình bình hành có hai cặp cạnh đối diện bằng nhau.',
        'PQ đối diện MN, nên PQ = MN = 7 cm.',
        'QM đối diện NP, nên QM = NP = 4 cm.',
      ],
      answer: 'PQ = 7 cm, QM = 4 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai đường thẳng kéo dài mãi mà không bao giờ cắt nhau. Hai đường thẳng đó thế nào?',
      options: ['Song song với nhau', 'Vuông góc với nhau', 'Cắt nhau'],
      answer: 0,
      hints: ['Em nhớ lại hai làn đường chạy hay hai mép bảng đối diện.'],
      solution: 'Hai đường thẳng không bao giờ cắt nhau là hai đường thẳng song song với nhau.',
    },
    {
      type: 'choice',
      prompt: 'Em dùng dụng cụ nào để kiểm tra hai đường thẳng có vuông góc với nhau không?',
      options: ['Ê ke', 'Compa', 'Cân đĩa'],
      answer: 0,
      hints: ['Dụng cụ đó có một góc vuông.'],
      solution: 'Em đặt góc vuông của ê ke vào chỗ hai đường thẳng cắt nhau để kiểm tra.',
    },
    {
      type: 'multi',
      prompt: 'Hình chữ nhật ABCD. Em chọn tất cả các câu đúng.',
      options: [
        'AB song song với DC',
        'AD vuông góc với DC',
        'AB song song với BC',
        'AD vuông góc với BC',
      ],
      answers: [0, 1],
      hints: [
        'Hai cạnh đối diện của hình chữ nhật song song. Hai cạnh chung một đỉnh tạo thành góc vuông.',
      ],
      solution:
        'AB song song với DC (cạnh đối diện). AD vuông góc với DC (góc vuông ở đỉnh D). AB và BC vuông góc, không song song. AD và BC song song, không vuông góc.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành ABCD có AB = 8 cm, AD = 5 cm. Cạnh DC dài bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['DC là cạnh đối diện với cạnh nào?'],
      solution: 'DC đối diện AB. Hình bình hành có hai cạnh đối diện bằng nhau: DC = AB = 8 cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi EGHK có cạnh EG = 6 cm. Tổng độ dài bốn cạnh của hình thoi là bao nhiêu xăng-ti-mét?',
      answer: 24,
      unit: 'cm',
      hints: ['Bốn cạnh của hình thoi bằng nhau.', 'Em tính 6 + 6 + 6 + 6.'],
      solution: 'Bốn cạnh đều dài 6 cm: 6 + 6 + 6 + 6 = 24 (cm).',
    },
    {
      type: 'multi',
      prompt:
        'Đồng hồ chỉ giờ đúng. Em chọn tất cả các giờ mà kim giờ và kim phút vuông góc với nhau.',
      options: ['3 giờ', '6 giờ', '9 giờ', '12 giờ', '2 giờ'],
      answers: [0, 2],
      hints: ['Lúc giờ đúng, kim phút chỉ số 12. Kim giờ chỉ số nào thì tạo thành góc vuông?'],
      solution:
        'Lúc 3 giờ và lúc 9 giờ, hai kim tạo thành góc vuông. Lúc 6 giờ hai kim nằm trên một đường thẳng, lúc 12 giờ hai kim trùng nhau, lúc 2 giờ hai kim tạo thành góc nhọn.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các bước vẽ đường thẳng CD đi qua điểm H và song song với AB.',
      items: [
        'Vẽ đường thẳng CD qua H, vuông góc với MN.',
        'Vẽ đường thẳng MN qua H, vuông góc với AB.',
        'Dùng ê ke kiểm tra: AB và CD cùng vuông góc với MN.',
      ],
      answer: [1, 0, 2],
      hints: ['Trước hết em vẽ một đường thẳng vuông góc với AB.'],
      solution:
        'Vẽ MN qua H vuông góc với AB, rồi vẽ CD qua H vuông góc với MN. AB và CD cùng vuông góc với MN nên song song với nhau.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi hình với đặc điểm của nó.',
      left: ['Hình thoi', 'Hình bình hành có hai cạnh kề không bằng nhau'],
      right: [
        'Hai cặp cạnh đối diện song song, bốn cạnh bằng nhau',
        'Hai cặp cạnh đối diện song song và bằng nhau, hai cạnh kề dài ngắn khác nhau',
        'Chỉ có một cặp cạnh đối diện song song',
      ],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Hình thoi có tất cả các cạnh dài bằng nhau.'],
      solution:
        'Hình thoi: hai cặp cạnh đối diện song song, bốn cạnh bằng nhau. Hình bình hành: hai cặp cạnh đối diện song song và bằng nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Việt dán ba miếng dán thành một hàng: hình bình hành ở sau hình vuông và ở trước hình tam giác. Hàng dán nào đúng?',
      options: [
        'Hình vuông, hình bình hành, hình tam giác',
        'Hình bình hành, hình vuông, hình tam giác',
        'Hình vuông, hình tam giác, hình bình hành',
      ],
      answer: 0,
      hints: ['Hình bình hành nằm giữa hình vuông và hình tam giác.'],
      solution:
        'Hình bình hành ở sau hình vuông và ở trước hình tam giác, nên thứ tự là: hình vuông, hình bình hành, hình tam giác.',
    },
    {
      type: 'choice',
      prompt:
        'Mỗi hàng có đủ ba hình: hình tròn, hình thoi, hình bình hành. Hàng cuối đã có hình tròn và hình bình hành. Ô còn trống là hình gì?',
      options: ['Hình thoi', 'Hình tròn', 'Hình bình hành'],
      answer: 0,
      hints: ['Hình nào trong ba hình chưa có ở hàng cuối?'],
      solution: 'Hàng cuối còn thiếu hình thoi, nên ô trống là hình thoi.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác ABCD có AB song song với DC, cạnh AD vuông góc với AB. Cạnh AD thế nào với cạnh DC?',
      options: ['Vuông góc với DC', 'Song song với DC', 'Không cắt DC'],
      answer: 0,
      hints: ['AB và DC song song. Một đường thẳng vuông góc với AB thì thế nào với DC?'],
      solution:
        'AB song song với DC, AD vuông góc với AB nên AD cũng vuông góc với DC: hai góc ở đỉnh A và đỉnh D đều là góc vuông.',
    },
    {
      type: 'choice',
      prompt: 'Em cắt hình vuông ABCD theo đường chéo AC, được hai mảnh. Mỗi mảnh là hình gì?',
      options: ['Hình tam giác', 'Hình thoi', 'Hình bình hành'],
      answer: 0,
      hints: ['Mỗi mảnh có mấy đỉnh?'],
      solution:
        'Mỗi mảnh có ba đỉnh (A, B, C hoặc A, D, C): đó là hình tam giác. Ghép hai mảnh lại, em được hình bình hành hoặc hình tam giác lớn.',
    },
  ],
  takeaways: [
    'Hai đường thẳng vuông góc tạo thành bốn góc vuông; kiểm tra bằng ê ke.',
    'Hai đường thẳng song song kéo dài mãi không cắt nhau.',
    'Hình bình hành: hai cặp cạnh đối diện song song và bằng nhau. Hình thoi: thêm bốn cạnh bằng nhau.',
  ],
};
