/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau. Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
  intro:
    'Mắt lưới hàng rào, hoa văn trên viên gạch lát sân có nhiều hình đẹp. Hôm nay em làm quen với hình bình hành và hình thoi nhé!',
  objectives: [
    'Nhận biết hình bình hành và đặc điểm của nó.',
    'Nhận biết hình thoi và đặc điểm của nó.',
    'Vận dụng đặc điểm các cạnh để tìm độ dài cạnh, cạnh song song.',
  ],
  sections: [
    {
      heading: 'Hình bình hành',
      blocks: [
        {
          type: 'p',
          text: 'Hình bình hành ABCD có AB và DC là hai cạnh đối diện, AD và BC là hai cạnh đối diện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình bình hành',
          text: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.',
        },
        {
          type: 'table',
          head: ['Cặp cạnh đối diện', 'Song song', 'Bằng nhau'],
          rows: [
            ['AB và DC', 'AB song song với DC', 'AB = DC'],
            ['AD và BC', 'AD song song với BC', 'AD = BC'],
          ],
        },
      ],
    },
    {
      heading: 'Hình thoi',
      blocks: [
        {
          type: 'p',
          text: 'Hình thoi ABCD có AB song song với DC, AD song song với BC.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thoi',
          text: 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Ví dụ: hình thoi ABCD có AB = BC = CD = DA.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thử xem',
          text: 'Vẽ hai đường chéo AC và BD của hình thoi, rồi dùng ê ke kiểm tra: hai đường chéo của hình thoi vuông góc với nhau.',
        },
      ],
    },
    {
      heading: 'Quanh em',
      blocks: [
        {
          type: 'p',
          text: 'Mắt lưới hàng rào, hoa văn trên gạch lát thường có dạng hình thoi.',
        },
        {
          type: 'p',
          text: 'Em gấp đôi tờ giấy, gấp đôi thêm lần nữa. Ở góc có hai nếp gấp, em cắt một nhát chéo rồi mở ra: em được một hình thoi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh, tìm cạnh song song',
    instruction:
      'Em kéo các đỉnh A, B, C, D (hoặc bấm phím mũi tên). Cặp cạnh đối diện song song được tô cùng màu, các cạnh bằng nhau có cùng số vạch. Bấm "Vẽ hai đường chéo" để xem đường chéo.',
  },
  examples: [
    {
      problem: 'Hình bình hành ABCD có AB = 3 dm, AD = 2 dm. Tính độ dài cạnh DC và cạnh BC.',
      steps: [
        'Hình bình hành có hai cặp cạnh đối diện bằng nhau.',
        'DC đối diện AB, nên DC = AB = 3 dm.',
        'BC đối diện AD, nên BC = AD = 2 dm.',
      ],
      answer: 'DC = 3 dm, BC = 2 dm.',
    },
    {
      problem: 'Hình thoi MNPQ có cạnh MN = 4 cm. Tính độ dài các cạnh còn lại.',
      steps: ['Hình thoi có bốn cạnh bằng nhau.', 'NP = PQ = QM = MN = 4 cm.'],
      answer: 'Ba cạnh còn lại đều dài 4 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình bình hành có đặc điểm gì?',
      options: [
        'Hai cặp cạnh đối diện song song và bằng nhau',
        'Chỉ có một cặp cạnh đối diện song song',
        'Không có cạnh nào song song',
      ],
      answer: 0,
      hints: ['Em nhớ lại các cặp cạnh đối diện của hình bình hành ABCD.'],
      solution: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Hình thoi có đặc điểm gì?',
      options: [
        'Hai cặp cạnh đối diện song song và bốn cạnh bằng nhau',
        'Hai cặp cạnh đối diện song song, hai cạnh kề nhau không bằng nhau',
        'Chỉ có một cặp cạnh đối diện song song',
      ],
      answer: 0,
      hints: ['Hình thoi có các cạnh dài bằng nhau.'],
      solution: 'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
    },
    {
      type: 'multi',
      prompt: 'Hình bình hành ABCD. Em chọn tất cả các cặp cạnh song song với nhau.',
      options: ['AB và DC', 'AD và BC', 'AB và BC', 'AD và DC'],
      answers: [0, 1],
      hints: ['Cạnh song song là hai cạnh đối diện.'],
      solution: 'AB song song với DC, AD song song với BC. AB và BC, AD và DC là hai cạnh kề nhau.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành ABCD có AB = 3 dm. Cạnh DC dài bao nhiêu đề-xi-mét?',
      answer: 3,
      unit: 'dm',
      hints: ['DC là cạnh đối diện với AB.'],
      solution: 'Hai cạnh đối diện của hình bình hành bằng nhau: DC = AB = 3 dm.',
    },
    {
      type: 'number',
      prompt:
        'ABCD và CDEG là hai hình bình hành có chung cạnh CD. Biết AB = 3 dm. Cạnh EG dài bao nhiêu đề-xi-mét?',
      answer: 3,
      unit: 'dm',
      hints: [
        'Trong hình bình hành ABCD, cạnh CD bằng cạnh nào?',
        'Trong hình bình hành CDEG, cạnh EG đối diện với cạnh CD.',
      ],
      solution:
        'Trong hình bình hành ABCD: CD = AB = 3 dm. Trong hình bình hành CDEG: EG = CD = 3 dm.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành ABCD có AB = 6 cm, BC = 4 cm. Cạnh AD dài bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['AD là cạnh đối diện với cạnh nào?'],
      solution: 'AD đối diện BC, nên AD = BC = 4 cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi MNPQ có cạnh MN = 5 cm. Tổng độ dài bốn cạnh của hình thoi là bao nhiêu xăng-ti-mét?',
      answer: 20,
      unit: 'cm',
      hints: ['Bốn cạnh của hình thoi bằng nhau.', 'Em tính 5 + 5 + 5 + 5.'],
      solution: 'Bốn cạnh đều dài 5 cm: 5 + 5 + 5 + 5 = 20 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Hai đường chéo của hình thoi thế nào với nhau?',
      options: ['Vuông góc với nhau', 'Song song với nhau', 'Không cắt nhau'],
      answer: 0,
      hints: ['Em vẽ hai đường chéo trong bảng vẽ rồi đặt ê ke kiểm tra.'],
      solution: 'Hai đường chéo của hình thoi cắt nhau và vuông góc với nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Các hình được xếp theo quy luật: hình thoi, hình bình hành, hình thoi, hình bình hành, … Hình thứ năm là hình gì?',
      options: ['Hình thoi', 'Hình bình hành', 'Hình vuông'],
      answer: 0,
      hints: [
        'Hai hình lặp lại: hình thoi rồi hình bình hành. Hình thứ nhất, thứ ba là hình thoi.',
      ],
      solution: 'Các hình thứ nhất, thứ ba, thứ năm là hình thoi. Hình thứ năm là hình thoi.',
    },
    {
      type: 'choice',
      prompt:
        'Em gấp đôi tờ giấy, gấp đôi thêm lần nữa. Ở góc có hai nếp gấp, em cắt một nhát chéo rồi mở ra. Em được hình gì?',
      options: ['Hình thoi', 'Hình tam giác', 'Hình tròn'],
      answer: 0,
      hints: ['Hai nếp gấp vuông góc với nhau, nhát cắt chéo tạo ra bốn cạnh bằng nhau.'],
      solution:
        'Mở ra, em được một hình có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song: hình thoi.',
    },
  ],
  takeaways: [
    'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.',
    'Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
  ],
};
